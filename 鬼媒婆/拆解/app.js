(function startV10Application() {
  "use strict";

  const Core = window.GameCore;
  const Content = window.WorldContent;
  const appRoot = document.getElementById("app");
  const notebookRoot = document.getElementById("notebook-root");
  const visualLayerRoot = document.getElementById("visual-layer-root");
  const announcer = document.getElementById("announcer");

  if (!Core || !Content || !appRoot || !notebookRoot || !visualLayerRoot) {
    throw new Error("v10 runtime could not start: required modules or roots are missing.");
  }

  const E = (value) => String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

  const A = (label, route, className = "") => (
    `<a href="#${E(route)}" data-nav="${E(route)}"${className ? ` class="${E(className)}"` : ""}>${E(label)}</a>`
  );

  const HAN = /[\u3400-\u9fff]/;

  function englishDocumentTitle(value, fallback = "Archived Web Investigation") {
    const title = String(value || "").trim();
    return title && !HAN.test(title) ? title : fallback;
  }

  function artifactValue(value) {
    if (Array.isArray(value)) return value.join("\n");
    if (value && typeof value === "object") {
      if (Array.isArray(value.lines)) return value.lines.join("\n");
      return String(value.text || value.value || "");
    }
    return String(value || "");
  }

  function artifactDomId(block, original) {
    const supplied = String(block?.id || "").trim().replace(/[^a-zA-Z0-9_-]+/g, "-").replace(/^-+|-+$/g, "");
    if (supplied) return `artifact-${supplied}`;
    let hash = 2166136261;
    for (const character of original) {
      hash ^= character.codePointAt(0);
      hash = Math.imul(hash, 16777619);
    }
    return `artifact-${(hash >>> 0).toString(36)}`;
  }

  function artifactPair(artifact, translation, label = "Original Chinese artifact") {
    const block = artifact && typeof artifact === "object" && !Array.isArray(artifact) ? artifact : null;
    const original = artifactValue(block?.han ?? block?.artifact ?? artifact).trim();
    const bridge = artifactValue(block?.translation ?? block?.artifactTranslation ?? translation).trim();
    if (!original) return "";
    const domId = artifactDomId(block, original);
    return `<figure class="artifact-evidence artifact-bridge" aria-labelledby="${E(domId)}-caption" aria-describedby="${E(domId)}-translation">
      <figcaption id="${E(domId)}-caption">${E(label)}</figcaption>
      <pre class="zh-artifact" lang="zh-Hans" aria-describedby="${E(domId)}-translation">${E(original)}</pre>
      <div class="artifact-translation" lang="en" id="${E(domId)}-translation"><strong>English transcript</strong><p>${E(bridge || "No additional text survives in this copy.")}</p></div>
    </figure>`;
  }

  function structuredArtifact(item, label) {
    if (!item) return "";
    const blocks = [];
    if (Array.isArray(item.artifacts)) blocks.push(...item.artifacts);
    if (Array.isArray(item.artifactBlocks)) blocks.push(...item.artifactBlocks);
    if (item.han || item.translation) blocks.push(item);
    else if (item.artifact) {
      if (item.artifact && typeof item.artifact === "object" && !Array.isArray(item.artifact)) blocks.push(item.artifact);
      else blocks.push({ han: item.artifact, translation: item.artifactTranslation });
    }
    const seen = new Set();
    return blocks.map((block) => {
      const key = `${artifactValue(block?.han ?? block?.artifact ?? block)}\u0000${artifactValue(block?.translation ?? block?.artifactTranslation)}`;
      if (seen.has(key)) return "";
      seen.add(key);
      return artifactPair(block, undefined, label);
    }).join("");
  }

  function openingArtifact(id) {
    return (Content.entry?.openingThread?.artifacts || []).find((item) => item.id === id) || null;
  }

  function itemArtifacts(item) {
    return [
      ...(Array.isArray(item?.artifacts) ? item.artifacts : []),
      ...(Array.isArray(item?.artifactBlocks) ? item.artifactBlocks : []),
      ...(item?.artifact && typeof item.artifact === "object" && !Array.isArray(item.artifact) ? [item.artifact] : []),
    ];
  }

  function hasArtifactId(item, ids) {
    const wanted = new Set(Array.isArray(ids) ? ids : [ids]);
    return itemArtifacts(item).some((artifact) => wanted.has(artifact?.id));
  }

  const VISUAL_ASSET_BY_ID = new Map((Content.visualAssets || []).map((asset) => [asset.id, asset]));
  let visualOpener = null;

  function visualAsset(assetId) {
    return VISUAL_ASSET_BY_ID.get(assetId) || null;
  }

  function visualAssetIdsForRoute(route) {
    const path = String(route || "").split("?", 1)[0];
    return Content.visualAssetRoutes?.[path] || [];
  }

  function visualFigure(assetId, options = {}) {
    const asset = visualAsset(assetId);
    if (!asset) return "";
    const compact = options.compact === true;
    const contextClass = asset.kind === "context" ? " context-reconstruction" : "";
    const className = options.className ? ` ${E(options.className)}` : "";
    return `<figure class="visual-asset visual-asset--${E(asset.kind)}${compact ? " visual-asset--compact" : ""}${contextClass}${className}" data-visual-id="${E(asset.id)}">
      <button type="button" class="visual-asset__open" data-action="open-visual" data-visual-id="${E(asset.id)}" aria-label="Enlarge: ${E(asset.alt)}">
        <img class="visual-asset__image" src="${E(asset.src)}" alt="${E(asset.alt)}" width="${E(asset.width)}" height="${E(asset.height)}" loading="${options.eager ? "eager" : "lazy"}" decoding="async">
        <span class="visual-asset__zoom" aria-hidden="true">Open full image</span>
      </button>
      <figcaption class="visual-asset__caption">${E(asset.caption)}</figcaption>
      ${asset.kind === "reconstruction" || asset.kind === "context" ? `<p class="visual-asset__boundary">${E(asset.boundary)}</p>` : ""}
    </figure>`;
  }

  function visualGallery(assetIds, options = {}) {
    const ids = [...new Set((assetIds || []).filter((id) => VISUAL_ASSET_BY_ID.has(id)))];
    if (!ids.length) return "";
    const variant = options.variant || (ids.length > 1 ? "grid" : "single");
    return `<div class="visual-asset-gallery visual-asset-gallery--${E(variant)}" data-visual-count="${ids.length}">${ids.map((id, index) => visualFigure(id, { ...options, eager: options.eager === true && index === 0 })).join("")}</div>`;
  }

  function routeVisualGallery(route, options = {}) {
    return visualGallery(visualAssetIdsForRoute(route), options);
  }

  function renderVisualLayer() {
    const asset = visualAsset(ui.visualAssetId);
    if (!asset) {
      visualLayerRoot.innerHTML = "";
      return;
    }
    visualLayerRoot.innerHTML = `<dialog class="visual-lightbox" aria-labelledby="visual-lightbox-title">
      <div class="visual-lightbox__bar"><div><strong id="visual-lightbox-title">Evidence image</strong><span>${E(asset.caption)}</span></div><button type="button" data-action="close-visual" autofocus>Close</button></div>
      <div class="visual-lightbox__stage"><img class="visual-lightbox__image" src="${E(asset.src)}" alt="${E(asset.alt)}" width="${E(asset.width)}" height="${E(asset.height)}"></div>
      <p class="visual-lightbox__boundary"><strong>Source boundary:</strong> ${E(asset.boundary)}</p>
    </dialog>`;
    const dialog = visualLayerRoot.querySelector("dialog");
    dialog?.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeVisualAsset();
    }, { once: true });
    dialog?.showModal?.();
  }

  function openVisualAsset(assetId, opener) {
    if (!visualAsset(assetId)) return;
    visualOpener = opener || document.activeElement;
    ui.visualAssetId = assetId;
    renderVisualLayer();
    visualLayerRoot.querySelector('[data-action="close-visual"]')?.focus?.();
  }

  function closeVisualAsset({ restoreFocus = true } = {}) {
    const dialog = visualLayerRoot.querySelector("dialog");
    if (dialog?.open) dialog.close();
    visualLayerRoot.innerHTML = "";
    ui.visualAssetId = "";
    const returnTarget = visualOpener;
    visualOpener = null;
    if (restoreFocus && returnTarget?.isConnected) returnTarget.focus?.();
  }

  function attachmentEvidence(item, options = {}) {
    const artifact = item?.artifact && typeof item.artifact === "object" && !Array.isArray(item.artifact)
      ? item.artifact
      : { han: item?.artifact, translation: item?.artifactTranslation || item?.translation };
    const brand = openingArtifact("opening-brand");
    const original = artifactValue(artifact?.han).trim();
    const translation = artifactValue(artifact?.translation).trim();
    const wordmark = artifactValue(brand?.han).trim();
    const wordmarkTranslation = artifactValue(brand?.translation).trim();
    const domId = artifactDomId(artifact, original || String(item?.fileName || "attachment"));
    return `<section class="attachment-evidence" aria-label="IMG_1842 reconstructed image set">
      ${visualGallery(["GM-V103-A01-FRONT", "GM-V103-A01-BACK", "GM-V103-A01-SLIP"], { variant: "attachment", compact: options.compact !== false, eager: true })}
      <details class="visual-asset-transcript artifact-bridge"><summary>Open accessible Chinese transcription and English reading aid</summary>
      <figure aria-labelledby="${E(domId)}-caption" aria-describedby="${E(domId)}-translation">
      <div class="attachment-original-sheet" role="img" aria-label="Reconstruction of the surviving Chinese printout lines">
        <div class="attachment-original-heading"><span class="zh-artifact" lang="zh-Hans">${E(wordmark)}</span><b>${E(item?.fileName || "ATTACHMENT")}</b></div>
        <pre class="zh-artifact attachment-original-lines" lang="zh-Hans" aria-describedby="${E(domId)}-translation">${E(original)}</pre>
        <i aria-hidden="true"></i>
      </div>
      <figcaption id="${E(domId)}-caption">Reconstruction from the surviving Chinese lines; this is not the recovered original photograph.</figcaption>
      <div class="artifact-translation attachment-english-transcript" lang="en" id="${E(domId)}-translation"><strong>English transcript</strong><pre>${E([wordmarkTranslation, translation || "No additional text survives in this copy."].filter(Boolean).join("\n\n"))}</pre></div>
      </figure></details>
    </section>`;
  }

  function ritualStatusSheet(item, modifier = "") {
    const original = String(Core.RECORDS.ritualStatus.bodyCanonical || "").trim();
    const translation = (item?.fields || []).map(([label, value]) => `${label}=${value}`).join("\n");
    const domId = `artifact-ritual-status${modifier ? `-${String(modifier).replace(/[^a-zA-Z0-9_-]+/g, "-")}` : ""}`;
    return `<section class="ritual-status-sheet${modifier ? ` ritual-status-sheet--${E(modifier)}` : ""}">
      ${visualGallery(["GM-V103-A03-STATUS"], { variant: "status", compact: modifier.includes("workspace") || modifier.includes("archive-bag") || modifier.includes("sedan") || modifier.includes("seven-day") })}
      <details class="visual-asset-transcript artifact-bridge"><summary>Open captured Chinese text and English field transcript</summary>
      <figure aria-labelledby="${E(domId)}-caption" aria-describedby="${E(domId)}-translation">
      <figcaption id="${E(domId)}-caption">Captured Chinese status body</figcaption>
      <div class="ritual-status-original">
        <div class="ritual-status-stamp" aria-hidden="true">GH-170419-01</div>
        <pre class="zh-artifact" lang="zh-Hans" aria-describedby="${E(domId)}-translation">${E(original)}</pre>
      </div>
      <div class="artifact-translation ritual-status-translation" lang="en" id="${E(domId)}-translation"><strong>English field transcript</strong><pre>${E(translation)}</pre></div>
      </figure></details>
    </section>`;
  }

  function collageEvidence(item) {
    const labels = (item?.blocks || []).map(([label]) => label);
    const fragments = itemArtifacts(item).map((artifact, index) => {
      const original = artifactValue(artifact?.han).trim();
      const translation = artifactValue(artifact?.translation).trim();
      const domId = artifactDomId(artifact, original);
      return `<article class="collage-fragment collage-fragment--${index + 1} artifact-bridge" aria-labelledby="${E(domId)}-caption" aria-describedby="${E(domId)}-translation">
        <h2 id="${E(domId)}-caption">${E(labels[index] || `Fragment ${index + 1}`)}</h2>
        <pre class="zh-artifact" lang="zh-Hans" aria-describedby="${E(domId)}-translation">${E(original)}</pre>
        <div class="artifact-translation" lang="en" id="${E(domId)}-translation"><strong>English transcript</strong><p>${E(translation)}</p></div>
      </article>`;
    }).join("");
    return `<section class="collage-evidence">${visualGallery(["GM-V103-A02-COLLAGE"], { variant: "document", eager: true })}<details class="visual-asset-transcript"><summary>Open the four source transcripts</summary><div class="collage-original-grid">${fragments}</div><p>Layout reconstruction only. The four original filenames, creation times, and order were not retained.</p></details></section>`;
  }

  function obituaryEvidence(item) {
    const artifact = itemArtifacts(item).find((entry) => ["heling-obituary", "chen-obituary"].includes(entry?.id));
    if (!artifact) return "";
    const original = artifactValue(artifact.han).trim();
    const translation = artifactValue(artifact.translation).trim();
    const domId = artifactDomId(artifact, original);
    const imageId = artifact.id === "heling-obituary" ? "GM-V103-A09-HELING-OBITUARY" : "GM-V103-A13-CHEN-OBITUARY";
    return `<section class="obituary-evidence">
      ${visualGallery([imageId], { variant: "obituary", compact: true })}
      <details class="visual-asset-transcript artifact-bridge"><summary>Open notice transcription and English reading aid</summary><figure aria-labelledby="${E(domId)}-caption" aria-describedby="${E(domId)}-translation">
      <figcaption id="${E(domId)}-caption">Chinese notice retained in the archive copy</figcaption>
      <div class="obituary-original-sheet"><pre class="zh-artifact" lang="zh-Hans" aria-describedby="${E(domId)}-translation">${E(original)}</pre><span aria-hidden="true"></span></div>
      <div class="artifact-translation obituary-translation" lang="en" id="${E(domId)}-translation"><strong>English transcript</strong><p>${E(translation)}</p></div>
      </figure></details>
    </section>`;
  }

  const FORUM_SECTIONS = Object.freeze([
    Object.freeze({ key: "Source Help", label: "Source Help", route: "/forum" }),
    Object.freeze({ key: "Chengnan Life", label: "Chengnan Life", route: "/forum/board/life" }),
    Object.freeze({ key: "Old City Memories", label: "Old City Memories", route: "/forum/board/memory" }),
    Object.freeze({ key: "Family Customs", label: "Family Customs", route: "/forum/board/customs" }),
    Object.freeze({ key: "Board Rules", label: "Board Rules", route: "/forum/board/rules" }),
    Object.freeze({ key: "Site Search", label: "Site Search", route: "/forum/search?keyword=bookmark" }),
  ]);

  function forumNavigation(currentSection = "") {
    const items = FORUM_SECTIONS.map((item) => currentSection === item.key
      ? `<span class="forum-nav-current" aria-current="page">${E(item.label)}</span>`
      : A(item.label, item.route));
    return `<nav aria-label="Chengnan Q&amp;A sections"><div class="site-width">${items.join("")}</div></nav>`;
  }

  function forumContextBar(section, keyword = "") {
    return `<div class="forum-brand-row site-width"><span>Chengnan Q&amp;A &gt; ${E(section)}</span><form data-site-search="forum"><label>Site search <input name="keyword" value="${E(keyword)}" autocomplete="off"></label><button>Search</button></form></div>`;
  }

  let storageAvailable = true;
  let memoryFallback = "";
  let state = loadState();
  let activeRoute = "";
  let ui = freshSessionUI();

  function freshSessionUI() {
    return {
      drawer: "",
      resetPending: false,
      directHintPending: "",
      errors: {},
      successBeat: "",
      successText: "",
      queryFeedback: "",
      queryFeedbackState: "",
      pendingFocusReaction: "",
      correctionPreview: false,
      visualAssetId: "",
    };
  }

  function loadState() {
    let raw = null;
    try {
      raw = window.localStorage.getItem(Core.STORAGE_KEY);
    } catch (_error) {
      storageAvailable = false;
      raw = memoryFallback || null;
    }
    if (!raw) return Core.createInitialState();
    try {
      return Core.sanitizeState(JSON.parse(raw));
    } catch (_error) {
      return Core.createInitialState();
    }
  }

  function saveState(nextState = state) {
    state = Core.sanitizeState(nextState);
    const serialized = JSON.stringify(state);
    memoryFallback = serialized;
    if (!storageAvailable) return;
    try {
      window.localStorage.setItem(Core.STORAGE_KEY, serialized);
    } catch (_error) {
      storageAvailable = false;
    }
  }

  function updateDraft(key, value) {
    saveState({ ...state, drafts: { ...state.drafts, [key]: value } });
  }

  function updateHint(beatId, changes) {
    const current = state.hints[beatId] || { rung: 0, attempts: 0, returns: 0, answerShown: false };
    saveState({
      ...state,
      hints: { ...state.hints, [beatId]: { ...current, ...changes } },
    });
  }

  function progress() {
    return Core.deriveProgress(state);
  }

  function routeParts(route) {
    const [path, rawQuery = ""] = String(route || "").split("?", 2);
    let params;
    try {
      params = new URLSearchParams(rawQuery);
    } catch (_error) {
      params = new URLSearchParams();
    }
    return { path, params };
  }

  function currentRoute() {
    if (!window.location.hash) return "/start";
    const raw = window.location.hash.slice(1);
    return Core.normalizeRoute(raw) || `/404?bad=${encodeURIComponent(raw.slice(0, 120))}`;
  }

  function announce(text) {
    if (!announcer) return;
    announcer.textContent = "";
    window.requestAnimationFrame(() => { announcer.textContent = String(text || ""); });
  }

  function go(route) {
    const normalized = Core.normalizeRoute(route) || "/404";
    const nextHash = `#${normalized}`;
    if (window.location.hash === nextHash) {
      enterRoute(normalized);
      return;
    }
    window.location.hash = normalized;
  }

  function recordPublicHistory(route) {
    if (!Core.isPublicRoute(route)) return;
    const prior = Array.isArray(state.evidenceHistory) ? state.evidenceHistory : [];
    const last = prior[prior.length - 1];
    const lastRoute = typeof last === "string" ? last : last?.route;
    if (lastRoute === route) return;
    saveState({
      ...state,
      evidenceHistory: [...prior, { route, at: new Date().toISOString() }].slice(-120),
    });
  }

  function enterRoute(route) {
    const routeChanged = activeRoute !== route;
    if (routeChanged && ui.visualAssetId) closeVisualAsset({ restoreFocus: false });
    activeRoute = route;
    ui.errors = {};
    ui.queryFeedback = "";
    ui.queryFeedbackState = "";

    const { path } = routeParts(route);
    if (path === "/forum/latest") {
      const before = progress();
      if (before.unreadReactionId) {
        ui.pendingFocusReaction = before.unreadReactionId;
      } else {
        const posted = Core.postNextReaction(state);
        if (posted.ok) {
          saveState(posted.state);
          ui.pendingFocusReaction = posted.reactionId;
          if (posted.reactionId === "reaction-archive-bag") {
            const ended = Core.completeEnding(state);
            if (ended.ok) saveState(ended.state);
          }
        }
      }
    }

    recordPublicHistory(route);
    if (routeChanged && !(path === "/forum/latest" && ui.pendingFocusReaction)) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    render();
  }

  function mainShell(route, theme, title, content, className = "site-page") {
    const themeMap = {
      "site-chengnan-wenda": "forum",
      "site-page-time": "archive",
      "site-helishu": "snapshot",
      "site-chengnan-records": "records",
      "site-chengnan-oldstories": "chengnanli",
      "site-oldnews": "oldnews",
      "site-nanqiao-forum": "nanqiao",
      "site-nanqiao-successor": "nanqiao",
    };
    document.body.dataset.theme = themeMap[theme] || theme;
    document.title = englishDocumentTitle(title);
    return `<main id="main-content" data-route="${E(route)}" tabindex="-1" class="${E(className)}">${content}</main>`;
  }

  function siteHeader(site, extra = "") {
    const classMap = {
      "site-chengnan-wenda": "forum-header",
      "site-page-time": "archive-header",
      "site-helishu": "old-site-header",
      "site-chengnan-records": "records-header",
      "site-chengnan-oldstories": "chengnanli-header",
      "site-oldnews": "oldnews-header",
      "site-nanqiao-forum": "nanqiao-header",
      "site-nanqiao-successor": "nanqiao-header",
    };
    const brand = site.id === "site-helishu" ? openingArtifact("opening-brand") : null;
    const brandTranslation = artifactValue(brand?.translation).trim();
    const brandSubtitle = brandTranslation.includes("—") ? brandTranslation.split("—").slice(1).join("—").trim() : site.browserTitle;
    const identity = brand
      ? `<span class="site-wordmark artifact-bridge"><strong class="zh-artifact" lang="zh-Hans">${E(artifactValue(brand.han))}</strong><span class="artifact-translation" lang="en"><b>${E(site.label)}</b><small>${E(brandSubtitle)}</small></span></span>`
      : `<strong>${E(site.label)}</strong><small>${E(site.browserTitle)}</small>`;
    return `<header class="${E(site.id)}-header ${E(classMap[site.id] || "site-header")}">
      <div class="site-width">
        ${identity}
      </div>
      ${extra}
    </header>`;
  }

  function paragraphs(items) {
    return (items || []).map((text) => `<p>${E(text)}</p>`).join("");
  }

  function fieldsList(fields) {
    if (!Array.isArray(fields) || !fields.length) return "";
    return `<dl class="field-list">${fields.map(([label, value]) => (
      `<div><dt>${E(label)}</dt><dd>${E(value)}</dd></div>`
    )).join("")}</dl>`;
  }

  const OBJECT_LABELS = Object.freeze({
    datetime: "Time", purpose: "Purpose", item: "Matter", source: "Source", result: "Result", handler: "Handled by",
    id: "ID", title: "Title", text: "Description", date: "Date", time: "Time", status: "Status", mime: "Type",
    size: "Size", code: "Code", name: "Display name", subject: "Subject", publicAt: "Published", route: "Path",
    reason: "Reason code", field: "Affected field", result: "Action",
  });

  function dataTable(rows, headers = []) {
    if (!Array.isArray(rows) || !rows.length) return `<p class="empty-state">No records are available.</p>`;
    const first = rows[0];
    const keys = Array.isArray(first) ? first.map((_value, index) => index) : Object.keys(first).filter((key) => !["conflict", "allowedPickup", "readable", "duplicateOf", "note", "phase"].includes(key));
    const labels = headers.length ? headers : keys.map((key, index) => OBJECT_LABELS[key] || `Field ${index + 1}`);
    return `<div class="records-table-wrap" role="region" aria-label="Scrollable data table" tabindex="0"><table class="data-table--scroll">
      <thead><tr>${labels.map((label) => `<th scope="col">${E(label)}</th>`).join("")}</tr></thead>
      <tbody>${rows.map((row) => `<tr>${keys.map((key, index) => {
        const value = Array.isArray(row) ? row[key] : row[key];
        const cell = key === "route" && String(value || "").startsWith("/") ? A("Open", String(value)) : E(value);
        return `<td data-label="${E(labels[index])}">${cell}</td>`;
      }).join("")}</tr>`).join("")}</tbody>
    </table></div>`;
  }

  function genericWorldItem(item, site, route) {
    const body = item.body || item.summary ? `<p>${E(item.body || item.summary)}</p>` : "";
    const intro = item.intro ? `<p>${E(item.intro)}</p>` : "";
    const meta = item.meta ? `<p class="page-meta">${E(item.meta)}</p>` : "";
    const question = item.question ? `<section><h2>Public question</h2><p>${E(item.question)}</p></section>` : "";
    const reply = item.reply || item.publicReply;
    const replyBlock = reply ? `<section><h2>Public reply</h2><p>${E(reply)}</p></section>` : "";
    const note = item.note ? `<p class="status-line">${E(item.note)}</p>` : "";
    const scope = item.scopeNote || item.sourceBoundary;
    const scopeBlock = scope ? `<aside class="records-notice"><strong>Scope</strong><p>${E(scope)}</p></aside>` : "";
    const blocks = Array.isArray(item.blocks) ? `<div class="document-blocks">${item.blocks.map(([label, text]) => `<section><h2>${E(label)}</h2><p>${E(text)}</p></section>`).join("")}</div>` : "";
    const rows = item.rows ? dataTable(item.rows, item.rowHeaders || []) : "";
    const itemLinks = Array.isArray(item.links) ? `<nav class="button-row">${item.links.map((link) => A(link.label, link.route)).join(" ")}</nav>` : "";
    const hasObituaryArtifact = hasArtifactId(item, ["heling-obituary", "chen-obituary"]);
    const artifactPresentation = hasObituaryArtifact
      ? obituaryEvidence(item)
      : structuredArtifact(item);
    const visualPresentation = hasObituaryArtifact ? "" : routeVisualGallery(route, { variant: "document" });
    const homeRoute = site.id === "site-chengnan-records" ? "/records"
      : site.id === "site-oldnews" ? "/oldnews/home"
      : site.id === "site-nanqiao-successor" ? "/nanqiao2"
      : site.id === "site-chengnan-oldstories" ? "/chengnanli"
      : site.id === "site-page-time" ? "/archive"
      : "/forum";
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Site home", homeRoute)}</nav>`)}
      <div class="site-width world-content" data-world-content>
        <article class="world-article">
          <p class="eyebrow">${E(item.eyebrow || site.label)}</p>
          <h1>${E(item.title || "Public page")}</h1>
          ${meta}${visualPresentation}${intro}${paragraphs(item.paragraphs)}${body}${artifactPresentation}${fieldsList(item.fields)}${question}${replyBlock}${blocks}${rows}${itemLinks}${note}${scopeBlock}
          ${item.footer ? `<footer>${E(item.footer)}</footer>` : ""}
          ${item.sourceLine ? `<p class="source-line">${E(item.sourceLine)}</p>` : ""}
        </article>
      </div>
    `);
  }

  function renderContentNote(note, gated = false) {
    return `<aside class="content-note" id="${E(note.id)}" role="note">
      <b>${E(note.label)}</b>
      <p>${E(note.text)}</p>
      ${gated ? `<div class="button-row">
        <button type="button" data-action="accept-rumor-note">${E(note.continueLabel)}</button>
        ${A(note.leaveLabel, "/forum")}
      </div>` : ""}
    </aside>`;
  }

  function errorBox(beatId) {
    const errors = ui.errors[beatId] || [];
    return `<div class="field-error" id="errors-${E(beatId)}" data-form-errors role="alert">${errors.map((text) => `<p>${E(text)}</p>`).join("")}</div>`;
  }

  function successBox(beatId, fallback = "Saved to the case notes.") {
    const done = progress().completedBeatIdSet.has(beatId);
    if (!done) return `<div class="status-line" data-beat-success></div>`;
    const text = ui.successBeat === beatId && ui.successText ? ui.successText : fallback;
    const continuation = {
      "puzzle-compare-nanqiao": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-compare-posthumous-relation": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-inspect-hls07-midnight": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-trace-ghost-matchmaker-tradition": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-triangulate-ghost-sedan": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-compare-seven-day-rule": ["Return to the thread for the OP's response", "/forum/latest"],
      "puzzle-submit-archive-bag": ["Return to the thread and finish the note", "/forum/latest"],
    }[beatId] || ["Return to the thread for new replies", "/forum/latest"];
    return `<div class="status-line" data-state="success" data-beat-success><p>${E(text)}</p>${A(continuation[0], continuation[1], "session-return")}</div>`;
  }

  function hintPanel(beatId) {
    const texts = Core.HINT_TEXT[beatId] || [];
    const saved = state.hints[beatId] || { rung: 0, answerShown: false };
    const visibleRung = Math.max(0, Number(saved.rung) || 0);
    const shownThrough = saved.answerShown ? Math.min(4, visibleRung) : Math.min(3, visibleRung);
    const nextRung = shownThrough < texts.length ? shownThrough + 1 : 0;
    return `<section class="hint-panel" aria-labelledby="hint-${E(beatId)}">
      <h2 id="hint-${E(beatId)}">A note from the desk</h2>
      <p>Hints are stored only for this session. They never complete a comparison for you.</p>
      <div class="hint-rungs">
        ${texts.slice(0, shownThrough).map((text, index) => `<div class="hint-rung"><b>Hint ${index + 1}</b><p>${E(text)}</p></div>`).join("")}
        ${nextRung ? `<button type="button" data-action="request-hint" data-hint-beat="${E(beatId)}" data-hint-rung="${nextRung}">${nextRung === 4 ? "Prepare to reveal the direct hint" : `Show hint ${nextRung}`}</button>` : ""}
      </div>
      ${ui.directHintPending === beatId ? `<div class="query-feedback" data-state="warning">
        <p>The last note spells out the inference, but it still will not submit anything. Open it?</p>
        <button type="button" data-action="confirm-direct-hint" data-hint-beat="${E(beatId)}" data-hint-rung="4">Reveal direct hint</button>
        <button type="button" data-action="cancel-direct-hint">Not yet</button>
      </div>` : ""}
    </section>`;
  }

  function workspaceShell(route, title, intro, sourceHTML, formHTML, beatId, locked = false) {
    return mainShell(route, "workspace", `${title} | Review note`, `
      <div class="workspace-shell">
        <header class="workspace-header">
          <div><p>Review note</p><h1>${E(title)}</h1><p>${E(intro)}</p></div>
          ${A("Back to the thread", "/forum", "secondary")}
        </header>
        <div class="workspace-grid">
          <section class="workspace-source" data-world-content><header><h2>Reference pages</h2><p>The entries below are copied from the pages listed for this note.</p></header>${sourceHTML}</section>
          <section class="workspace-form"><header><h2>Record what you found</h2><p>Use the wording, names, and dates shown in those pages.</p></header>${formHTML}${locked ? "" : `${errorBox(beatId)}${successBox(beatId)}${hintPanel(beatId)}`}</section>
        </div>
      </div>
    `, "workspace-page");
  }

  function workspaceReady(beatId) {
    const earned = progress().earnedTokenIdSet;
    return Core.requiredProducedInputTokenIds(beatId).every((tokenId) => earned.has(tokenId));
  }

  function lockedWorkspace(route, title, beatId) {
    return workspaceShell(
      route,
      title,
      "This tool needs verified fields carried over from another public interface.",
      `<p>This session has not produced that input yet. You may still open any public page directly, but browsing history never becomes a completed comparison.</p>`,
      `<p>This tool opens after the required verifiable fields have been produced.</p>`,
      beatId,
      true,
    );
  }

  const WORKSPACE_LINKS = Object.freeze([
    { label: "Review the capture dates", route: "/workspace/source", beatId: "puzzle-compare-helishu-versions", visibleAfter: "token-helishu-capture-set" },
    { label: "Check the press identity", route: "/workspace/river", beatId: "puzzle-classify-river", visibleAfter: "token-oldnews-result-set" },
    { label: "Put the relationship dates in order", route: "/workspace/posthumous-relation", beatId: "puzzle-compare-posthumous-relation", visibleAfter: "token-oldnews-result-set" },
    { label: "Compare the two Nanqiao copies", route: "/workspace/nanqiao", beatId: "puzzle-compare-nanqiao", visibleAfter: "token-nanqiao-capture-set" },
    { label: "Line up the midnight captures", route: "/workspace/hls07-midnight", beatId: "puzzle-inspect-hls07-midnight", visibleAfter: "token-posthumous-relation" },
    { label: "Trace the phrase", route: "/workspace/ghost-matchmaker-tradition", beatId: "puzzle-trace-ghost-matchmaker-tradition", visibleAfter: "token-hls07-midnight" },
    { label: "Match the same-night records", route: "/workspace/ghost-sedan", beatId: "puzzle-triangulate-ghost-sedan", visibleAfter: "token-folklore-rule" },
    { label: "Count the days", route: "/workspace/seven-day-rule", beatId: "puzzle-compare-seven-day-rule", visibleAfter: "token-ghost-sedan-cluster" },
    { label: "Finish the archive note", route: "/workspace/archive-bag", beatId: "puzzle-submit-archive-bag", visibleAfter: "token-seven-day-rule-match" },
  ]);

  function renderSessionLayer() {
    const drawerOpen = Boolean(ui.drawer);
    const history = [...(state.evidenceHistory || [])].reverse();
    const uniqueHistory = [];
    const seen = new Set();
    for (const item of history) {
      const route = typeof item === "string" ? item : item.route;
      if (!route || seen.has(route)) continue;
      seen.add(route);
      uniqueHistory.push(route);
      if (uniqueHistory.length >= 24) break;
    }

    let drawerTitle = "Browser notes";
    let drawerBody = "";
    if (ui.drawer === "sources") {
      drawerTitle = "Opened pages and notes";
      drawerBody = uniqueHistory.length
        ? `<ol class="history-list">${uniqueHistory.map((route) => `<li data-history-route="${E(route)}">${A(route, route)}</li>`).join("")}</ol>`
        : `<p class="empty-state">Pages you open from the public sites will be listed here. Opening a page does not fill in a note.</p>`;
    } else if (ui.drawer === "workspace") {
      drawerTitle = "Review notes";
      const p = progress();
      const visibleTools = WORKSPACE_LINKS.filter((item) => !item.visibleAfter || p.earnedTokenIdSet.has(item.visibleAfter));
      drawerBody = `<p>These notes appear when the earlier page check has been saved. The public pages remain open to everyone.</p><nav class="workspace-list">${visibleTools.map((item) => A(`${item.label}${p.completedBeatIdSet.has(item.beatId) ? " ✓" : ""}`, item.route)).join("")}</nav>`;
    } else if (ui.drawer === "help") {
      drawerTitle = "A few things to keep in mind";
      drawerBody = `<ul>
        <li>A capture date is not necessarily the date when a page's text was written.</li>
        <li>A similar name, pronunciation, or shared plastic sleeve does not establish identity.</li>
        <li>Each note has four optional prompts. The last one still leaves the entry for you to submit.</li>
        <li>Public pages can be opened directly. Browser Back never changes their facts.</li>
      </ul><button type="button" data-action="toggle-drawer" data-drawer="menu">Session menu and reset</button>`;
    } else if (ui.drawer === "menu") {
      drawerTitle = "Session Menu";
      drawerBody = `<p>${storageAvailable ? "Progress is stored in this device's browser." : "Browser storage is unavailable; progress lasts only while this page remains open."}</p>
        ${ui.resetPending ? `<div class="query-feedback" data-state="warning"><p>Clearing will restart every comparison, hint, and source-history entry. Continue?</p>
          <button type="button" data-action="confirm-reset">Clear session</button>
          <button type="button" data-action="cancel-reset">Keep this session</button></div>`
          : `<button type="button" data-action="request-reset">Clear this web session</button>`}`;
    }

    const actions = `<div class="session-actions">
      ${A("Return to forum", "/forum")}
      <button type="button" data-action="toggle-drawer" data-drawer="sources" aria-pressed="${ui.drawer === "sources"}">Extracts / Sources</button>
      <button type="button" data-action="toggle-drawer" data-drawer="workspace" aria-pressed="${ui.drawer === "workspace"}">Compare</button>
      <button type="button" data-action="toggle-drawer" data-drawer="help" aria-pressed="${ui.drawer === "help"}">Help</button>
      <button type="button" data-action="toggle-drawer" data-drawer="menu" aria-pressed="${ui.drawer === "menu"}">Menu</button>
    </div>`;

    notebookRoot.innerHTML = `
      <aside class="session-strip" aria-label="Browser notes and session tools">
        <div><strong>Browser notes</strong><small>Pages opened from the public sites</small></div>${A("Back to thread", "/forum", "session-mobile-return")}${actions}
      </aside>
      <nav class="session-dock" aria-label="Mobile web session tools">
        <button type="button" data-action="toggle-drawer" data-drawer="sources" aria-pressed="${ui.drawer === "sources"}">Sources</button>
        <button type="button" data-action="toggle-drawer" data-drawer="workspace" aria-pressed="${ui.drawer === "workspace"}">Compare</button>
        <button type="button" data-action="toggle-drawer" data-drawer="help" aria-pressed="${ui.drawer === "help"}">Hints</button>
      </nav>
      <aside class="session-drawer${drawerOpen ? " open" : ""}" aria-hidden="${!drawerOpen}" ${drawerOpen ? "" : "inert"} aria-label="${E(drawerTitle)}">
        <header><div><h2>${E(drawerTitle)}</h2><p>These notes belong to this browser session. The pages underneath keep their own dates and wording.</p></div><button type="button" data-action="close-drawer" data-return-drawer="${E(ui.drawer)}" aria-label="Close session drawer">Close</button></header>
        <div>${drawerBody}</div>
        <footer><p>Page facts do not change with viewing order.</p></footer>
      </aside>`;
  }

  function renderStart(route) {
    const note = Content.contentNotes.entry;
    return mainShell(route, "entry", "Chengnan Q&A | Source Help", `
      <div class="entry-page">
        <article class="entry-card">
          <p class="eyebrow">A locally preserved web session</p>
          <h1>An old printout still has no verified source</h1>
          <p>You are an ordinary visitor who happened upon a public help thread. You can verify only records that remain visible online; you are not the person who posted or decides what happens to the material.</p>
          <p>You will move among sites that once served ordinary visitors: a forum, a web-capture index, a public-record catalogue, and an old-news archive. Everything runs inside this HTML file and never contacts a real website.</p>
          <details class="entry-guide">
            <summary>How the pages connect</summary>
            <ol>
              <li>Read the page you are on before opening another search box.</li>
              <li>When a page gives you a name, date, or phrase, carry that exact wording to the same site's search.</li>
              <li>Keep the page open when a detail feels uncertain; the note pages only record what the linked sources actually show.</li>
            </ol>
          </details>
          ${renderContentNote(note)}
          <button type="button" data-action="accept-entry-note">${E(note.continueLabel)}</button>
          <p class="entry-fineprint">There is no timer and no need to inspect source code. Keep your browser's Back button available.</p>
        </article>
      </div>
    `, "entry-page-shell");
  }

  function renderForumPost(reply, index) {
    return `<article class="forum-post">
      <aside class="forum-user"><div class="forum-avatar" aria-hidden="true">${E(reply.name.slice(0, 1))}</div><strong>${E(reply.name)}</strong><small>${E(reply.role || "Member")}</small><p>${E(reply.signature || "")}</p></aside>
      <div class="forum-post-body"><header><span>${E(reply.postedAt)}</span><b>#${E(reply.floor || index + 2)}</b></header>
        ${paragraphs(reply.paragraphs)}
        ${(reply.links || []).map((item) => A(item.label, item.route)).join(" ")}
      </div>
    </article>`;
  }

  function renderOwnerReaction(reaction, index, rumorAccepted) {
    let body = "";
    if (reaction.paragraphsBeforeSensitiveCopy) {
      body += paragraphs(reaction.paragraphsBeforeSensitiveCopy);
      if (rumorAccepted) {
        body += paragraphs(reaction.paragraphsAfterContentNote);
        body += (reaction.links || []).map((item) => A(item.label, item.route)).join(" ");
        if (reaction.sourceBoundary) body += `<aside class="records-notice"><strong>Source boundary</strong><p>${E(reaction.sourceBoundary)}</p></aside>`;
      } else {
        body += renderContentNote(Content.contentNotes.rumorEvidence, true);
      }
    } else {
      body += paragraphs(reaction.paragraphs);
      body += (reaction.links || []).map((item) => A(item.label, item.route)).join(" ");
    }
    if (reaction.completion) {
      body += `${visualGallery(Content.visualEndingAssetIds, { variant: "ending", eager: true })}<section class="completion-panel" data-story-complete><p>${E(reaction.completion.badge)}</p><h2>${E(reaction.completion.title)}</h2><p>${E(reaction.completion.text)}</p><button type="button" data-action="request-reset">${E(reaction.completion.resetLabel)}</button></section>`;
    }
    return `<article class="forum-post reaction-card" data-reaction-id="${E(reaction.id)}" tabindex="-1">
      <aside class="forum-user"><div class="forum-avatar" aria-hidden="true">P</div><strong>${E(reaction.author)}</strong><small>Original poster</small></aside>
      <div class="forum-post-body"><header><span>${E(reaction.postedAt)}</span><b>#${index + 11}</b></header>${body}</div>
    </article>`;
  }

  function renderForum(route) {
    const site = Content.sites.chengnanWenda;
    const opening = Content.entry.openingThread;
    const p = progress();
    const rumorAccepted = state.drafts.rumorAccepted === true;
    const reactions = p.postedReactionIds.map((id) => Content.ownerReactionByCoreId?.[id]).filter(Boolean);
    const complete = p.storyComplete;
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, forumNavigation("Source Help"))}
      ${forumContextBar("Source Help")}
      <div class="forum-layout site-width world-content" data-world-content>
        <section class="forum-thread" aria-label="Thread content">
          <header class="forum-thread-title"><span>${E(complete ? "Solved" : opening.badge)}</span><h1>${E(opening.title)}</h1><p>OP ${E(opening.author)} · ${E(opening.postedAt)} · edited ${E(opening.editedAt)}</p></header>
          <article class="forum-post forum-opening">
            <aside class="forum-user"><div class="forum-avatar" aria-hidden="true">P</div><strong>${E(opening.author)}</strong><small>Registered member</small></aside>
            <div class="forum-post-body"><header><span>${E(opening.postedAt)}</span><b>#1</b></header>
              ${paragraphs(opening.paragraphs)}${structuredArtifact(opening)}
              <section class="forum-attachment"><div class="attachment-preview-column">${attachmentEvidence(opening.attachment)}</div><div class="attachment-details"><strong>${E(opening.attachment.fileName)}</strong><small>${E(opening.attachment.caption)}</small><p>The image set preserves the Chinese sheets. The English transcript is a reading aid, not a replacement image.</p>${A("Open complete attachment", opening.attachment.route)}</div></section>
              <p><strong>${E(opening.savedLink.label)}:</strong> ${A(opening.savedLink.value, opening.savedLink.route)}</p>
            </div>
          </article>
          ${Content.entry.initialForumReplies.map(renderForumPost).join("")}
          ${reactions.map((reaction, index) => renderOwnerReaction(reaction, index, rumorAccepted)).join("")}
          ${!complete ? `<div class="forum-latest">${A("Refresh thread for latest replies", "/forum/latest")}</div>` : ""}
        </section>
        <aside class="forum-side"><h2>Popular on this board</h2><ol>${Content.entry.forumHotTopics.map((topic) => `<li>${A(topic.title, `/forum/topic/${topic.id}`)}<small>${E(topic.author)} · ${E(topic.replies)} replies</small></li>`).join("")}</ol></aside>
      </div>
    `);
  }

  function renderForumAux(route, path, params) {
    const site = Content.sites.chengnanWenda;
    if (path === "/forum/board/rules") {
      const rules = site.adjacent[0];
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, forumNavigation("Board Rules"))}${forumContextBar("Board Rules")}<div class="site-width world-content" data-world-content><article class="world-article"><p class="eyebrow">Chengnan Q&amp;A</p><h1>${E(rules.title)}</h1>${paragraphs(rules.paragraphs)}</article></div>`);
    }
    const boardName = {
      "/forum/board/life": "Chengnan Life",
      "/forum/board/memory": "Old City Memories",
      "/forum/board/customs": "Family Customs",
    }[path];
    if (boardName) {
      const topics = Content.entry.forumHotTopics.filter((topic) => topic.board === boardName);
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, forumNavigation(boardName))}${forumContextBar(boardName)}<div class="site-width world-content" data-world-content><h1>${E(boardName)}</h1><table class="forum-board-list"><tbody>${topics.map((topic) => `<tr><td><strong>${A(topic.title, `/forum/topic/${topic.id}`)}</strong><small>${E(topic.author)} · ${E(topic.replies)} replies</small></td></tr>`).join("")}</tbody></table></div>`);
    }
    if (path === "/forum/search") {
      const keyword = (params.get("keyword") || "").trim();
      const folded = keyword.normalize("NFKC").toLowerCase().replace(/[^a-z0-9]+/g, "");
      const matches = Content.entry.forumHotTopics.filter((topic) => !keyword || `${topic.board} ${topic.title} ${topic.body}`.toLowerCase().includes(keyword.toLowerCase()));
      const identityMatches = ["xiaoling", "xiaoling"].includes(folded) ? [
        { name: "He Ling (factory nickname: Xiao Ling)", detail: "West Market and historical press records", route: "/oldnews/search?keyword=Xiaoling&page=1" },
        { name: "Zhao Ling (display name: Xiao Ling)", detail: "Public volunteer directory", route: `/records/staff/${Core.CANONICAL.ids.zhaoStaff}` },
        { name: "Lin Xiaoling", detail: "A separate person in a 2004 press report", route: "/oldnews/article/20040919-04" },
      ] : [];
      const identityHTML = identityMatches.map((item) => `<li>${A(item.name, item.route)}<p>${E(item.detail)}</p></li>`).join("");
      const topicHTML = matches.map((item) => `<li>${A(item.title, `/forum/topic/${item.id}`)}<p>${E(item.board)} · ${E(item.body)}</p></li>`).join("");
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, forumNavigation("Site Search"))}${forumContextBar("Site Search", keyword)}<div class="site-width world-content" data-world-content><h1>Site search</h1><p>Keyword: ${E(keyword || "(empty)")}</p>${identityMatches.length ? `<aside class="records-notice"><strong>Multiple identities match this romanization</strong><p>Use dates, roles, and stable record fields before joining any two pages.</p></aside>` : ""}<ol>${identityHTML}${topicHTML || (!identityHTML ? "<li>No matching topics.</li>" : "")}</ol></div>`);
    }
    const topicId = path.match(/^\/forum\/topic\/([a-z0-9-]+)$/)?.[1];
    const topic = Content.entry.forumHotTopics.find((item) => item.id === topicId);
    if (topic) {
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, forumNavigation(topic.board))}${forumContextBar(topic.board)}<div class="site-width world-content" data-world-content><article class="world-article"><p class="eyebrow">${E(topic.board)}</p><h1>${E(topic.title)}</h1><p class="page-meta">${E(topic.author)} | ${E(topic.replies)} replies</p><p>${E(topic.body)}</p></article></div>`);
    }
    return "";
  }

  function renderRetired(route) {
    const site = Content.sites.helishu;
    return mainShell(route, "retired", "Page Retired | Helishu", `
      ${siteHeader(site)}
      <div class="site-width world-content" data-world-content>
        <article class="retired-page">
          <p class="eyebrow">410 · Page no longer available</p>
          <h1>The old bookmark has been retired</h1>
          <p>This short address once redirected inside the site. It was not maintained after the section moved, and the bookmark does not forward automatically.</p>
          <dl class="field-list"><div><dt>Bookmark</dt><dd>${E(Core.CANONICAL.urls.helishuSaved)}</dd></div><div><dt>Original path</dt><dd><code>${E(Core.CANONICAL.urls.helishuOriginal)}</code></dd></div></dl>
          <p>To inspect historical content, copy the complete original path into the public web-capture search.</p>
          ${A("Open PageTime", "/archive")}
        </article>
      </div>
    `);
  }

  function renderArchiveHome(route, params = new URLSearchParams()) {
    const site = Content.sites.pageTime;
    const archiveBeat = params.get("lookup") === "nanqiao" ? "puzzle-archive-nanqiao" : "puzzle-archive-helishu";
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Search", "/archive")} ${A("Complete URL help", "/archive/help/url")} ${A("Status help", "/archive/help/status")}</nav>`)}
      <div class="archive-layout site-width">
        <section class="archive-search-panel">
          <div data-world-content><h1>Web-capture search</h1><p>Search public captures by complete URL. Protocol, hostname, and path all participate in matching.</p></div>
          <form data-beat-form="${E(archiveBeat)}" novalidate>
            <label for="archive-url">Complete URL</label>
            <input id="archive-url" name="url" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="https://example.org/path/page.html" required>
            <button type="submit">Search captures</button>
          </form>
          ${errorBox(archiveBeat)}
          <div class="query-feedback" data-state="${E(ui.queryFeedbackState)}">${ui.queryFeedback ? `<p>${E(ui.queryFeedback)}</p>` : ""}</div>
          ${hintPanel(archiveBeat)}
        </section>
        <aside class="archive-directory" data-world-content><h2>Search help</h2>${site.ordinary.slice(0, 2).map((item) => `<article><h3>${A(item.title, item.route)}</h3><p>${E(item.body)}</p></article>`).join("")}<h2>Recent jobs</h2>${site.ordinary.slice(2).map((item) => `<article><h3>${A(item.title, item.route)}</h3><p>${E(item.body)}</p></article>`).join("")}</aside>
      </div>
    `);
  }

  function captureTable(captures, kind) {
    return `<div class="archive-directory">${dataTable(captures.map((capture) => ({
      date: `${capture.date} ${capture.time}`,
      status: capture.status,
      title: capture.title,
      size: capture.size,
      route: capture.readable ? (kind === "nanqiao" ? `/rumor-snapshot/${capture.key}` : `/snapshot/${capture.key}`) : (kind === "nanqiao" ? `/rumor-capture/${capture.key}` : `/capture/${capture.key}`),
    })), ["Captured at", "HTTP", "Page title", "Body size", "Replay path"])}</div>`;
  }

  function renderArchiveResults(route, kind) {
    const site = Content.sites.pageTime;
    const captures = kind === "nanqiao" ? Core.RUMOR_CAPTURES : Core.CAPTURES;
    const searched = kind === "nanqiao" ? Core.CANONICAL.urls.nanqiaoThread : Core.CANONICAL.urls.helishuOriginal;
    const beat = kind === "nanqiao" ? "puzzle-archive-nanqiao" : "puzzle-archive-helishu";
    const statusCounts = captures.reduce((counts, capture) => {
      const bucket = capture.readable ? "replayable" : capture.status === 410 ? "gone" : "metadata";
      counts[bucket] = (counts[bucket] || 0) + 1;
      return counts;
    }, {});
    const statusStrip = `<section class="archive-status-strip" aria-label="Capture status summary">
      <span><b>${statusCounts.replayable || 0}</b> replayable body</span>
      <span><b>${statusCounts.metadata || 0}</b> metadata-only capture</span>
      <span><b>${statusCounts.gone || 0}</b> unavailable capture</span>
    </section>`;
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("New search", "/archive")} ${A("Capture-time help", "/archive/help/time")}</nav>`)}
      <div class="site-width world-content" data-world-content>
        <p class="eyebrow">Public capture index</p><h1>${E(kind === "nanqiao" ? "Nanqiao thread captures" : "Helishu page captures")}</h1>
        <p>Query URL: <code>${E(searched)}</code></p>
        ${statusStrip}
        ${captureTable(captures, kind)}
        <p class="archive-negative-note">A capture records only what one request saved. Uncaptured intervals cannot be reconstructed automatically.</p>
      </div>
    `);
  }

  function renderHelishuCapture(route, path) {
    const site = Content.sites.helishu;
    const match = path.match(/^\/(?:snapshot|capture)\/([^/]+)(?:\/revision)?$/);
    if (!match) return "";
    const key = match[1];
    if (key === "ordinary") return "";
    const capture = Core.CAPTURES.find((item) => item.key === key);
    if (!capture) return "";
    const sourcePage = Content.sites.helishu.main.find((item) => item.route === `/snapshot/${Core.FORUM_SOURCE_RULE.contentRoot}`);
    const migration = Content.sites.helishu.adjacent.find((item) => item.route === `/snapshot/${key}`);
    const readableContent = capture.readable && (key === Core.FORUM_SOURCE_RULE.contentRoot || capture.duplicateOf === Core.FORUM_SOURCE_RULE.contentRoot)
      ? `<article class="hls-article"><p class="eyebrow">Web replay</p><h1>${E(sourcePage.title)}</h1><p class="page-meta">${E(sourcePage.meta)}</p>${routeVisualGallery(route, { variant: "document", eager: true })}${paragraphs(sourcePage.paragraphs)}${structuredArtifact(sourcePage)}<footer>${E(sourcePage.footer)}</footer></article>`
      : migration
        ? `<article class="hls-article"><h1>${E(migration.title)}</h1>${paragraphs(migration.paragraphs)}${(migration.links || []).map((item) => A(item.label, item.route)).join(" ")}</article>`
        : capture.readable
          ? `<article class="hls-article"><h1>${E(capture.title)}</h1><p>This capture has replayable body text; the current public copy retains only the catalogue summary.</p></article>`
          : `<article class="archive-error"><p class="eyebrow">HTTP ${E(capture.status)}</p><h1>${E(capture.title)}</h1><p>${E(capture.note || "This capture has no replayable body.")}</p></article>`;
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Return to capture list", "/archive/results/helishu")}</nav>`)}
      <div class="archive-replay-bar site-width"><span>Captured: ${E(capture.date)} ${E(capture.time)}</span><span>HTTP ${E(capture.status)} · ${E(capture.size)}</span></div>
      <div class="site-width world-content" data-world-content>${readableContent}</div>
    `);
  }

  function renderPersonCapture(route, path) {
    const match = path.match(/^\/(?:person-snapshot|person-capture)\/([^/]+)$/);
    if (!match) return "";
    const capture = Core.PERSON_CAPTURES.find((item) => item.key === match[1]);
    if (!capture) return "";
    const site = Content.sites.helishu;
    const item = Content.sites.helishu.main.find((entry) => entry.route.startsWith("/person-snapshot/"));
    return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, `<nav>${A("Return to PageTime", "/archive")}</nav>`)}<div class="archive-replay-bar site-width"><span>Captured: ${E(capture.date)} ${E(capture.time)}</span><span>HTTP ${E(capture.status)}</span></div><div class="site-width world-content" data-world-content>${capture.readable ? `<article><h1>${E(item.title)}</h1><p class="page-meta">${E(item.meta)}</p>${paragraphs(item.paragraphs)}${structuredArtifact(item)}</article>` : `<article><h1>${E(capture.title)}</h1><p>${E(capture.note || "No replayable body is available.")}</p></article>`}</div>`);
  }

  function renderRitualCapture(route, path) {
    if (path !== Core.RITUAL_CAPTURE_ROUTE) return "";
    const site = Content.sites.helishu;
    const item = findSiteItem(site, path);
    if (!item) return "";
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Return to PageTime", "/archive")}</nav>`)}
      <div class="archive-replay-bar site-width"><span>Captured: ${E(Core.RECORDS.ritualStatus.capturedAt)}</span><span>HTTP 200 · text/html</span></div>
      <div class="site-width world-content ritual-capture" data-world-content>
        <article class="world-article"><p class="eyebrow">Old-site status page | redacted public capture</p><h1>${E(item.title)}</h1>${ritualStatusSheet(item, "public-capture")}<details><summary>Body-field hash check</summary><p>SHA-256: <code>${E(Core.RECORDS.ritualStatus.bodySha256)}</code></p><p>The hash covers the Chinese body shown above. It does not recover the unavailable Q&amp;A text or identify an operator.</p></details><p>${A("Open the full capture index for this URL", "/archive/results/heqi-20170419")}</p><aside class="records-notice"><strong>Capture scope</strong><p>${E(item.scopeNote)}</p></aside><footer>${E(item.meta)}</footer></article>
      </div>
    `);
  }

  function renderArchiveMeta(route, path) {
    const page = Content.falsePaths.mayRecapture.pages.find((item) => item.route === path);
    if (!page) return "";
    return genericWorldItem(page, Content.sites.pageTime, route);
  }

  function renderRecordsHome(route) {
    const site = Content.sites.chengnanRecords;
    const directoryRows = site.ordinary.map((item) => {
      const hasStandalonePage = Boolean(item.note || item.body || item.fields || item.paragraphs);
      const title = hasStandalonePage ? A(item.title, item.route) : E(item.title);
      const summary = `${item.code || "Matter record"} · ${item.displayName || ""} · ${item.state || ""}${hasStandalonePage ? "" : " · catalogue summary only"}`;
      return `<article class="records-directory-row"><h3>${title}</h3><p>${E(summary)}</p></article>`;
    }).join("");
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Historical Q&A", "/records")} ${A("Registration rules", "/records/rules/v3.1")} ${A("Public-message policy", "/records/policy/public-message-v2")}</nav>`)}
      <div class="records-layout site-width">
        <aside class="records-side-menu" data-world-content><strong>Public lookup</strong>${A("Q&A code search", "/records/search")} ${A("Registration rules", "/records/rules/v3.1")} ${A("Monthly duty roster", "/records/duty/2017-04")}</aside>
        <section class="records-home-panel"><div data-world-content><h1>Historical records search</h1><p>This system shows only anonymous codes, matter status, and necessary handling fields. Public display names may repeat and do not establish identity.</p></div>
          <form data-beat-form="puzzle-lookup-hls06" novalidate><label for="record-code">Complete Q&amp;A code</label><input id="record-code" name="code" autocomplete="off" spellcheck="false" placeholder="HLS-YYMMDD-NN"><button>Search</button></form>
          ${errorBox("puzzle-lookup-hls06")}${hintPanel("puzzle-lookup-hls06")}
          <div data-world-content><h2>Recent public Q&amp;A entries</h2><div>${directoryRows}</div></div>
        </section>
      </div>
    `);
  }

  function findSiteItem(site, path) {
    return [...(site.main || []), ...(site.adjacent || []), ...(site.ordinary || [])].find((item) => item.route === path) || null;
  }

  function renderRecordsRoute(route, path) {
    const site = Content.sites.chengnanRecords;
    if (path === "/records" || path === "/records/search") return renderRecordsHome(route);
    if (path === "/records/index-actions/2017-04") {
      const rows = Core.PRIVACY_ACTIONS.map(([code, time, reason, field, result]) => ({ code, time, reason, field, result, route: code === Core.CANONICAL.ids.withdrawnAnswer ? `/records/index-actions/${code}` : "—" }));
      return genericWorldItem({ title: "April 2017 public-index status changes", paragraphs: ["This page lists anonymisation, merge, and withdrawal actions by operation time."], rows }, site, route);
    }
    if (path === "/records/duty/2017-04") {
      return genericWorldItem({ title: "April 2017 public volunteer roster", rows: Core.DUTY_ROWS, scopeNote: "The roster shows only public work hours and assignments; it does not preserve Q&A text." }, site, route);
    }
    let item = findSiteItem(site, path);
    if (!item) {
      for (const falsePath of Object.values(Content.falsePaths)) {
        item = falsePath.pages.find((page) => page.route === path);
        if (item) break;
      }
    }
    if (item) return genericWorldItem(item, site, route);
    const ordinaryCode = path.match(/^\/records\/dayi\/(HLS-[0-9]{6}-[0-9]{2})$/)?.[1];
    if (ordinaryCode) {
      const known = [...Core.RECENT_ANSWERS, ...Core.OLD_ANSWERS].find((entry) => entry.code === ordinaryCode);
      if (known) return genericWorldItem({ title: `Public Q&A ${ordinaryCode}`, fields: [["Display name", known.name], ["Title", known.subject], ["Status", known.state || "Historical index"]], paragraphs: ["This code exists in the public index. The offline copy retains only its title, display name, and status summary."], scopeNote: "A summary cannot replace the original Q&A body." }, site, route);
      return genericWorldItem({ title: "No public Q&A found", fields: [["Query code", ordinaryCode], ["Result", "No such code in the current public index"]], scopeNote: "A valid code format does not prove that a record exists. Return to the historical search page to check it again." }, site, route);
    }
    return "";
  }

  function renderOldStoriesHome(route) {
    const site = Content.sites.chengnanOldStories;
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Street Stories", "/chengnanli")} ${A("About", "/chengnanli/about")} ${A("Source notes", "/chengnanli/editorial/source-log")}</nav>`)}
      <div class="oldstories-layout site-width world-content" data-world-content>
        <section><h1>Streets, old stories, and the people we remember</h1><p>User posts are not fact-checked records. When restoring old images, preserve the source, date, and anything that cannot be read.</p>
          ${site.ordinary.map((item) => `<article><p class="page-meta">${E(item.date)} · ${E(item.author)}</p><h2>${A(item.title, `/chengnanli/topic/${item.id}`)}</h2><p>${E(item.body)}</p></article>`).join("")}
        </section>
        <aside><h2>Editorial notes</h2>${site.adjacent.map((item) => `<article><h3>${A(item.title, item.route)}</h3><p>${E(item.body)}</p></article>`).join("")}</aside>
      </div>
    `);
  }

  function renderOldStoriesRoute(route, path) {
    const site = Content.sites.chengnanOldStories;
    if (path === "/chengnanli") return renderOldStoriesHome(route);
    const sensitive = site.main.find((item) => item.route === path);
    const needsRumorNote = sensitive && path !== Core.FOLKLORE_ROUTE;
    if (sensitive) {
      const sourceHeading = path === Core.FOLKLORE_ROUTE ? "Oral-history source" : "Source fields retained in the repost";
      const extra = sensitive.sourceBox ? `<section class="source-box"><h2>${E(sourceHeading)}</h2>${fieldsList(sensitive.sourceBox)}</section>` : "";
      const comments = sensitive.comments ? `<section class="comments"><h2>Replies</h2>${sensitive.comments.map(([name, text]) => `<article><strong>${E(name)}</strong><p>${E(text)}</p></article>`).join("")}</section>` : "";
      const isCollage = path === "/files/cn-63192-collage";
      const blocks = isCollage ? collageEvidence(sensitive) : sensitive.blocks ? `<section class="collage-blocks">${sensitive.blocks.map(([label, text]) => `<article><h2>${E(label)}</h2><p>${E(text)}</p></article>`).join("")}</section>` : "";
      const scope = sensitive.sourceBoundary ? `<aside class="records-notice"><strong>Scope</strong><p>${E(sensitive.sourceBoundary)}</p></aside>` : "";
      const contentNote = needsRumorNote
        ? `<div class="site-width session-content-note">${renderContentNote(Content.contentNotes.rumorEvidence, state.drafts.rumorAccepted !== true)}</div>`
        : "";
      const oldNewsStep = path === "/chengnanli/topic/63192"
        ? `<p>The newspaper masthead was cropped from the repost. Check the complete title in the catalogue: ${A("Open the Chengnan Old News Archive", "/oldnews/home")}</p>`
        : "";
      const finalLinks = path === "/chengnanli/topic/63192"
        ? `${A("Open the collage transcript", "/files/cn-63192-collage")} ${A("Search the footer URL in PageTime", "/archive?lookup=nanqiao")}`
        : "";
      const artifacts = isCollage ? "" : structuredArtifact(sensitive);
      const visuals = isCollage ? "" : routeVisualGallery(route, { variant: path === "/chengnanli/topic/63192" ? "preview" : "document" });
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, `<nav>${A("Return to list", "/chengnanli")}</nav>`)}${contentNote}<div class="site-width world-content oldstories-reading" data-world-content><article class="oldstories-article"><p class="page-meta">${E(sensitive.postedAt || sensitive.metadata || "Old-image material")}</p><h1>${E(sensitive.title)}</h1>${visuals}${paragraphs(sensitive.paragraphs)}${artifacts}${oldNewsStep}${blocks}${extra}${comments}${scope}${finalLinks}</article></div>`);
    }
    let item = findSiteItem(site, path);
    if (!item) {
      for (const falsePath of Object.values(Content.falsePaths)) {
        item = falsePath.pages.find((page) => page.route === path);
        if (item) break;
      }
    }
    if (item) return genericWorldItem(item, site, route);
    const topicId = path.match(/^\/chengnanli\/topic\/([0-9]+)$/)?.[1];
    const ordinary = site.ordinary.find((entry) => entry.id === topicId);
    if (ordinary) return genericWorldItem({ title: ordinary.title, meta: `${ordinary.date}｜${ordinary.author}`, paragraphs: [ordinary.body] }, site, route);
    return "";
  }

  function oldNewsResultItem(item) {
    return `<li>
      <p class="page-meta">${E(item.date)} · ${E(item.region)} · actual match: ${E(item.hit || item.actualTerm)}</p>
      <h2>${A(item.title, item.route)}</h2>
      <p>${E(item.summary || "Catalogue summary pending.")}</p>
    </li>`;
  }

  function renderOldNewsHome(route) {
    const site = Content.sites.oldNews;
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Home", "/oldnews/home")} ${A("Name search", "/oldnews/search")} ${A("OCR help", "/oldnews/help/ocr")}</nav>`)}
      <div class="oldnews-main site-width">
        <section><div data-world-content><p class="eyebrow">Local newspapers and public community records</p><h1>Chengnan Old News Archive</h1><p>The catalogue preserves title, page, and actual match by publication date. Phonetic expansion helps find candidates; it does not merge identities.</p></div>
          <form data-beat-form="puzzle-search-oldnews" class="oldnews-search" novalidate><label for="oldnews-keyword">Name or catalogue term</label><input id="oldnews-keyword" name="keyword" autocomplete="off"><button>Search</button></form>
          ${errorBox("puzzle-search-oldnews")}${hintPanel("puzzle-search-oldnews")}
        </section>
        <aside data-world-content><h2>How to search</h2>${site.adjacent.map((item) => `<article><h3>${A(item.title, item.route)}</h3><p>${E(item.body)}</p></article>`).join("")}</aside>
      </div>
    `);
  }

  function renderOldNewsSearch(route, params) {
    const site = Content.sites.oldNews;
    const keyword = (params.get("keyword") || "").trim();
    const page = Math.max(1, Math.min(2, Number.parseInt(params.get("page"), 10) || 1));
    const valid = Core.validateOldNewsSearch({ keyword });
    const all = valid.ok ? site.ordinary : [];
    const start = (page - 1) * 10;
    const shown = all.slice(start, start + 10);
    const feedback = keyword
      ? valid.ok ? `Found ${all.length} catalogue results. Name expansion retains each actual match; open the full record before joining identities.` : "This term does not produce a stable name result set. Check the romanization, spacing, or catalogue scope."
      : "Enter a name or catalogue term to search.";
    return mainShell(route, site.id, site.browserTitle, `
      ${siteHeader(site, `<nav>${A("Archive home", "/oldnews/home")} ${A("OCR help", "/oldnews/help/ocr")}</nav>`)}
      <div class="oldnews-search-layout site-width">
        <section><h1>Name search</h1>
          <form data-beat-form="puzzle-search-oldnews" novalidate><label for="oldnews-keyword-results">Name or catalogue term</label><input id="oldnews-keyword-results" name="keyword" value="${E(keyword)}" autocomplete="off"><button>Search</button></form>
          ${errorBox("puzzle-search-oldnews")}<div class="query-feedback" data-state="${valid.ok ? "success" : keyword ? "empty" : ""}"><p>${E(feedback)}</p></div>
          <div data-world-content><ol class="oldnews-results" start="${start + 1}">${shown.map(oldNewsResultItem).join("")}</ol>
          ${valid.ok ? `<nav class="pagination" aria-label="Search-result pages">
            ${page > 1 ? A("Previous page", `/oldnews/search?keyword=${encodeURIComponent(keyword)}&page=${page - 1}`) : `<span aria-disabled="true">Previous page</span>`}
            <span>Page ${page} of 2</span>
            ${page < 2 ? A("Next page", `/oldnews/search?keyword=${encodeURIComponent(keyword)}&page=${page + 1}`) : `<span aria-disabled="true">Next page</span>`}
          </nav>` : ""}</div>
          ${hintPanel("puzzle-search-oldnews")}
        </section>
        <aside data-world-content><h2>Search scope</h2><p>This fixed result set is paginated as ten items on page one and two on page two. Returning preserves the term and page.</p></aside>
      </div>
    `);
  }

  function renderOldNewsRoute(route, path, params) {
    const site = Content.sites.oldNews;
    if (path === "/oldnews/home") return renderOldNewsHome(route);
    if (path === "/oldnews/search") return renderOldNewsSearch(route, params);
    let item = findSiteItem(site, path);
    if (!item) {
      for (const falsePath of Object.values(Content.falsePaths)) {
        item = falsePath.pages.find((page) => page.route === path);
        if (item) break;
      }
    }
    if (item) {
      const rendered = genericWorldItem(item, site, route);
      if (!path.includes("20161104")) return rendered;
      const contentNote = `<div class="site-width session-content-note">${renderContentNote(Content.contentNotes.rumorEvidence, state.drafts.rumorAccepted !== true)}</div>`;
      return rendered.replace('<div class="site-width world-content" data-world-content>', `${contentNote}<div class="site-width world-content" data-world-content>`);
    }
    const result = site.ordinary.find((entry) => entry.route === path);
    if (result) return genericWorldItem({ title: result.title, meta: `${result.date} | ${result.region} | actual match: ${result.hit}`, paragraphs: [result.summary], fields: [["Catalogue name", result.fullName], ["Region", result.region], ["Date", result.date]], scopeNote: "The offline copy retains only the catalogue summary; a summary cannot join people who share a name." }, site, route);
    return "";
  }

  function renderNanqiaoCapture(route, path) {
    const match = path.match(/^\/(?:rumor-snapshot|rumor-capture)\/([^/]+)$/);
    if (!match) return "";
    const capture = Core.RUMOR_CAPTURES.find((item) => item.key === match[1]);
    if (!capture) return "";
    const site = Content.sites.nanqiaoForum;
    const item = site.main.find((entry) => entry.route === `/rumor-snapshot/${capture.key}`)
      || (capture.duplicateOf ? site.main.find((entry) => entry.route === `/rumor-snapshot/${capture.duplicateOf}`) : null);
    const content = item ? `<article class="nanqiao-thread"><h1>${E(item.title)}</h1>${routeVisualGallery(route, { variant: "capture", eager: true })}<p class="original-post">${E(item.originalPost)}</p>${structuredArtifact(item)}${(item.replies || []).map(([name, time, text]) => `<section><aside><strong>${E(name)}</strong><span>${E(time)}</span></aside><p>${E(text)}</p></section>`).join("")}${item.sourceBoundary ? `<aside class="records-notice"><p>${E(item.sourceBoundary)}</p></aside>` : ""}</article>` : `<article><p class="eyebrow">HTTP ${E(capture.status)}</p><h1>${E(capture.title)}</h1><p>${E(capture.note || "This capture has no replayable body.")}</p></article>`;
    return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, `<nav>${A("Return to capture list", "/archive/results/nanqiao")}</nav>`)}<div class="archive-replay-bar site-width"><span>${E(capture.date)} ${E(capture.time)}</span><span>HTTP ${E(capture.status)}</span></div><div class="nanqiao-single site-width world-content" data-world-content>${content}</div>`);
  }

  function renderNanqiaoAux(route, path) {
    const site = Content.sites.nanqiaoForum;
    const item = findSiteItem(site, path);
    if (item) return genericWorldItem(item, site, route);
    return "";
  }

  function renderNanqiaoSuccessorRoute(route, path) {
    const site = Content.sites.nanqiaoSuccessor;
    if (path === "/nanqiao2") {
      const topics = [...site.ordinary, ...site.main];
      return mainShell(route, site.id, site.browserTitle, `${siteHeader(site)}<div class="nanqiao-single site-width world-content" data-world-content><section><h1>Nanqiao Neighbourhood Message Board</h1><p>A temporary mutual-aid site opened after the old forum closed. Sublets, water outages, lost property, and night sightings all appear here; do not turn an unphotographed sighting into an official notice.</p><ol>${topics.map((topic) => `<li><p class="page-meta">${E(topic.postedAt)} · ${E(topic.author)}</p><h2>${A(topic.title, topic.route)}</h2><p>${E(topic.body || topic.originalPost || "")}</p></li>`).join("")}</ol></section></div>`);
    }
    const item = findSiteItem(site, path);
    if (!item) return "";
    if (!item.originalPost) return genericWorldItem({ title: item.title, meta: `${item.author} | ${item.postedAt}`, paragraphs: [item.body] }, site, route);
    const content = `<article class="nanqiao-thread successor-thread"><header><p class="page-meta">${E(item.author)} | ${E(item.postedAt)}</p><h1>${E(item.title)}</h1></header><p class="original-post">${E(item.originalPost)}</p>${structuredArtifact(item)}${item.replies.map(([name, time, text]) => `<section><aside><strong>${E(name)}</strong><span>${E(time)}</span></aside><p>${E(text)}</p></section>`).join("")}<aside class="records-notice"><strong>What this page can establish</strong><p>${E(item.sourceBoundary)}</p></aside>${routeVisualGallery(route, { variant: "context" })}</article>`;
    return mainShell(route, site.id, site.browserTitle, `${siteHeader(site, `<nav>${A("Temporary-site home", "/nanqiao2")}</nav>`)}<div class="nanqiao-single site-width world-content" data-world-content>${content}</div>`);
  }

  function renderFalsePath(route, path) {
    for (const falsePath of Object.values(Content.falsePaths)) {
      const item = falsePath.pages.find((page) => page.route === path);
      if (!item) continue;
      const site = Object.values(Content.sites).find((entry) => entry.id === falsePath.siteId) || Content.sites.chengnanOldStories;
      let html = genericWorldItem(item, site, route);
      const index = falsePath.pages.findIndex((page) => page.route === path);
      const isLast = index === falsePath.pages.length - 1;
      const trail = `<nav class="false-path-trail" aria-label="Source trail">${index > 0 ? A("Previous page", falsePath.pages[index - 1].route) : ""}${index < falsePath.pages.length - 1 ? A("Continue checking the source", falsePath.pages[index + 1].route) : ""}</nav>`;
      html = html.replace("</article>", `${trail}</article>`);
      if (isLast) {
        html = html.replace("</article>", `<aside class="records-notice"><strong>Source check</strong><p>${E(falsePath.closure)}</p>${falsePath.boundary ? `<p>${E(falsePath.boundary)}</p>` : ""}</aside></article>`);
      }
      return html;
    }
    return "";
  }

  function sourceCard(title, body, links = []) {
    return `<article class="source-card"><h3>${E(title)}</h3>${body}<p>${links.map(([label, route]) => A(label, route)).join(" ")}</p></article>`;
  }

  function checkbox(name, value, label, extra = "") {
    return `<label><input type="checkbox" name="${E(name)}" value="${E(value)}" ${extra}> <span>${E(label)}</span></label>`;
  }

  function radio(name, value, label) {
    return `<label><input type="radio" name="${E(name)}" value="${E(value)}"> <span>${E(label)}</span></label>`;
  }

  function renderSourceWorkspace(route) {
    const beatId = "puzzle-compare-helishu-versions";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Compare Page Versions", beatId);
    const source = Core.CAPTURES.find((item) => item.key === Core.FORUM_SOURCE_RULE.contentRoot);
    const repeat = Core.CAPTURES.find((item) => item.duplicateOf === Core.FORUM_SOURCE_RULE.contentRoot);
    const attachment = Content.entry.openingThread.attachment;
    const sourceHTML = `
      <section class="capture-timestamp-ledger" aria-label="Capture comparison ledger">
        <header><span>Capture</span><span>Body / response date</span><span>Replay state</span></header>
        <div><strong>${E(source.date)}</strong><span>Body amended ${E(source.date)}</span><em>Replayable</em></div>
        <div><strong>${E(repeat.date)}</strong><span>Last-Modified ${E(source.date)}</span><em>Metadata comparison</em></div>
        <div><strong>${E(attachment.fileName)}</strong><span>Collection slip; name redacted</span><em>Attachment transcript</em></div>
      </section>
      <div class="source-card-stack">
        ${sourceCard(`${source.date} capture`, `${visualFigure("GM-V103-A06-HELISHU", { compact: true })}<p>HTTP ${E(source.status)} · ${E(source.size)}</p><p>Title: ${E(source.title)}</p><p>Page metadata: body amended ${E(source.date)} · compiled by Xiao Ling</p><blockquote>${E(Core.COMPLETE_QUOTE)}</blockquote>`, [["Open replay", `/snapshot/${source.key}`]])}
        ${sourceCard(`${repeat.date} capture`, `<p>HTTP ${E(repeat.status)} · ${E(repeat.size)}</p><p>Title: ${E(repeat.title)}</p><p>Response summary: body matches the prior capture; Last-Modified ${E(source.date)}</p>`, [["Open replay", `/snapshot/${repeat.key}`], ["View response metadata", `/archive/meta/${repeat.key}`]])}
        ${sourceCard(attachment.fileName, `<p>${E(attachment.caption)}</p>${attachmentEvidence(attachment)}`, [["Open full attachment", attachment.route]])}
      </div>`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which two captures are being compared?</legend>${checkbox("captures", source.key, `${source.date} ${source.title}`)}${checkbox("captures", repeat.key, `${repeat.date} ${repeat.title}`)}${checkbox("captures", "20170328", "2017-03-28 spring revision")}</fieldset>
      <label>Comparison layer<select name="mode" required><option value="">Choose one</option><option value="title-only">Titles only</option><option value="body-meta">Body and response metadata</option><option value="capture-date-only">Capture dates only</option></select></label>
      <label>Date stated by the page body<input name="pageDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
      <label>Compiler credited on the page<input name="editor" autocomplete="off" placeholder="Romanized name"></label>
      <label>Relationship between the two captures<select name="interpretation"><option value="">Choose one</option><option value="new-revision">Revised again in May</option><option value="same-body-recapture">Same body captured again</option><option value="unknown">Cannot compare</option></select></label>
      <fieldset><legend>Which complete sentence matches the printout fragment?</legend>${Core.QUOTE_CHOICES.map((text) => radio("quote", text, text)).join("")}</fieldset>
      <label>Complete Q&amp;A code formed from the page date and the fragment on the reverse<input name="code" autocomplete="off" spellcheck="false"></label>
      <button type="submit">Save version comparison</button>
    </form>`;
    return workspaceShell(route, "Compare Page Versions", "Compare capture time, the date stated by the body, and response metadata before checking the partial code on the reverse.", sourceHTML, formHTML, beatId);
  }

  function renderProcedureWorkspace(route) {
    const beatId = "puzzle-classify-procedure";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Visits, Matter, and Rules", beatId);
    const rules = Core.RULES.filter((rule) => ["10", "12", "13", "14", "16", "19"].includes(rule.id));
    const visits = Core.RECORDS.visits.filter((row) => row.item === Core.CANONICAL.ids.item);
    const sourceHTML = `
      ${sourceCard(`Matter ${Core.CANONICAL.ids.item}`, fieldsList([["Registered", Core.RECORDS.item.registered], ["Closed", Core.RECORDS.item.closed], ["Paper collected", Core.RECORDS.item.paperReturned], ["Status", Core.RECORDS.item.state]]), [["Open matter page", `/records/status/${Core.CANONICAL.ids.item}`]])}
      ${sourceCard(`Visit register ${Core.CANONICAL.ids.visitor}`, dataTable(visits, ["Time", "Purpose", "Matter", "Source", "Result", "Handled by"]), [["Open complete visit register", `/records/visits/${Core.CANONICAL.ids.visitor}`]])}
      ${sourceCard("Registration Rules v3.1", dataTable(rules, ["Clause", "Title", "Text"]), [["Open complete rules", "/records/rules/v3.1"]])}
      ${sourceCard(`Monthly review ${Core.RECORDS.monthlyReview.id}`, fieldsList([["Dates", Core.RECORDS.monthlyReview.dates.join(", ")], ["Observed facts", Core.RECORDS.monthlyReview.facts.join("; ")], ["Finding", Core.RECORDS.monthlyReview.finding], ["Scope", Core.RECORDS.monthlyReview.limit]]), [["Open review", `/records/reviews/${Core.CANONICAL.ids.item}`]])}`;
    const dateOptions = visits.filter((row) => row.datetime >= "2017-02-09").map((row) => checkbox("dates", row.datetime.slice(0, 10), `${row.datetime.slice(0, 10)} · ${row.purpose}`)).join("");
    const clauseOptions = rules.map((rule) => checkbox("clauses", rule.id, `Clause ${rule.id}: ${rule.title}`)).join("");
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which dates show a closed matter number still being reused?</legend>${dateOptions}</fieldset>
      <label>Registration issue<select name="issue"><option value="">Choose one</option><option value="closed-item-reused">Closed matter number continued to be reused</option><option value="paper-reopened">Paper file was accepted again</option><option value="new-case-normal">New matter registered normally</option></select></label>
      <fieldset><legend>Clauses used for classification</legend>${clauseOptions}</fieldset>
      <fieldset><legend>Which “no record found in this system” boundaries does the review support?</legend>
        ${checkbox("boundaries", "no-new-paper", "No new paper received")}
        ${checkbox("boundaries", "no-scan", "No scan recorded")}
        ${checkbox("boundaries", "no-revision", "No revised draft generated")}
        ${checkbox("boundaries", "no-private-contact", "No contact of any kind outside the website")}
      </fieldset>
      <label>Comparison note (optional)<textarea name="note" rows="3"></textarea></label>
      <button type="submit">Submit procedure classification</button>
    </form>`;
    return workspaceShell(route, "Visits, Matter, and Rules", "Separate a registration error from accepting material again. Record only fields the review actually covers.", sourceHTML, formHTML, beatId);
  }

  function renderZhaoWorkspace(route) {
    const beatId = "puzzle-triangulate-zhao";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Account, Identity, and Shift Cross-check", beatId);
    const site = Content.sites.chengnanRecords;
    const action = findSiteItem(site, `/records/index-actions/${Core.CANONICAL.ids.withdrawnAnswer}`);
    const staff = findSiteItem(site, `/records/staff/${Core.CANONICAL.ids.zhaoStaff}`);
    const duty = findSiteItem(site, "/records/duty/2017-04/changes");
    const sourceHTML = `
      ${sourceCard(action.title, `${fieldsList(action.fields)}${structuredArtifact(action)}`, [["Open index-status page", action.route]])}
      ${sourceCard(staff.title, `${fieldsList(staff.fields)}${structuredArtifact(staff)}`, [["Open volunteer profile", staff.route]])}
      ${sourceCard(duty.title, `${fieldsList(duty.fields)}${dataTable(duty.rows, ["Time slot", "Volunteer ID", "Display name", "Assignment"])}${structuredArtifact(duty)}`, [["Open shift-change record", duty.route]])}
      ${sourceCard("Public Message Handling Notes", dataTable(Core.PRIVACY_ACTIONS, ["Answer ID", "Time", "Reason code", "Public field", "Action"]), [["Open handling notes", "/records/policy/public-message-v2"]])}`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <div class="classification-grid">
        <label>Operator account<input name="account" autocomplete="off"></label>
        <label>Page display name (Romanized)<input name="displayName" autocomplete="off"></label>
        <label>Volunteer ID<input name="staffId" autocomplete="off"></label>
        <label>Public name (Romanized)<input name="realName" autocomplete="off"></label>
        <label>Action time<input name="actionTime" autocomplete="off" placeholder="YYYY-MM-DD HH:MM"></label>
        <label>Shift-change ID<input name="shiftId" autocomplete="off"></label>
        <label>Reason code<input name="privacyCode" autocomplete="off"></label>
      </div>
      <label>What did this public index action mean?<select name="privacyMeaning"><option value="">Choose one</option><option value="hide-and-offline">Stop public display and move the matter to offline review</option><option value="destroy-document">Destroy the original document</option><option value="prove-harmless">Prove that the hidden text was harmless</option></select></label>
      <fieldset><legend>What can these public fields not prove?</legend>
        ${checkbox("privacyLimits", "not-harmless-proof", "They do not certify that the hidden text was harmless")}
        ${checkbox("privacyLimits", "not-collusion-proof", "They do not rule out private coordination outside the website")}
        ${checkbox("privacyLimits", "not-on-duty", "They do not show whether the operator was on duty")}
      </fieldset>
      <button type="submit">Submit identity and shift cross-check</button>
    </form>`;
    return workspaceShell(route, "Account, Identity, and Shift Cross-check", "The account, volunteer ID, shift slot, and action time must align. Interpret the privacy code separately.", sourceHTML, formHTML, beatId);
  }

  function renderNicknameWorkspace(route) {
    const beatId = "puzzle-trace-ghost-name";
    if (!progress().earnedTokenIdSet.has("token-zhao-identity")) {
      return workspaceShell(route, "Nickname Provenance", "This check needs a verified volunteer identity before the handover note can be tied to a person.", `<p>No verified identity mapping is available in this session yet. Public pages remain open, but this tool will not substitute browsing history for a completed check.</p>`, `<p>Establish the identity mapping from public records, then return here.</p>`, beatId, true);
    }
    const site = Content.sites.chengnanRecords;
    const notice = findSiteItem(site, "/records/notices/2017-06-volunteers");
    const staff = findSiteItem(site, `/records/staff/${Core.CANONICAL.ids.zhaoStaff}`);
    const sourceHTML = `
      ${sourceCard(notice.title, `${paragraphs(notice.paragraphs)}${structuredArtifact(notice)}`, [["Open handover addendum", notice.route]])}
      ${sourceCard(staff.title, `${fieldsList(staff.fields)}${structuredArtifact(staff)}`, [["Open volunteer profile", staff.route]])}`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <label>Who used the nickname?<select name="speaker"><option value="">Choose one</option><option value="Old Zhou">Old Zhou</option><option value="Xiao Ling">Xiao Ling</option><option value="Lin Cheng">Lin Cheng</option></select></label>
      <label>Who did the handover note refer to?<select name="referent"><option value="">Choose one</option><option value="Zhao Ling">Zhao Ling</option><option value="He Ling">He Ling</option><option value="Chen Yuan">Chen Yuan</option></select></label>
      <label>How did that person respond?<select name="response"><option value="">Choose one</option><option value="not-liked">She explicitly disliked the nickname</option><option value="accepted">She accepted it as a site title</option><option value="unknown">The note did not say</option></select></label>
      <label>How should its origin be classified?<select name="classification"><option value="">Choose one</option><option value="unwanted-colleague-nickname">An intrusive colleague nickname that its subject disliked</option><option value="family-title">A family form of address</option><option value="supernatural-role">A supernatural identity</option></select></label>
      <button type="submit">Save nickname provenance</button>
    </form>`;
    return workspaceShell(route, "Nickname Provenance", "Do not decide by the sound of a name. Check who spoke, whom they meant, and how that person responded.", sourceHTML, formHTML, beatId);
  }

  function renderRiverWorkspace(route) {
    const beatId = "puzzle-classify-river";
    if (state.drafts.rumorAccepted !== true) {
      const gate = `${renderContentNote(Content.contentNotes.rumorEvidence, true)}<p>This worksheet includes options about a missing-person rumor and a misread death report. Confirm the notice before opening the identity fields.</p>`;
      return workspaceShell(route, "Newspaper Identity Check", "Put the similar-sounding name from the headline back into the full report.", gate, `<p>The field comparison is not open yet.</p>`, beatId, true);
    }
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Newspaper Identity Check", beatId);
    const river = Content.falsePaths.riverReport;
    const [first, followup] = river.pages;
    const sourceHTML = `
      ${sourceCard(first.title, `${visualFigure("GM-V103-A07A-RIVER", { compact: true })}<p class="page-meta">${E(first.meta)}</p>${paragraphs(first.paragraphs)}${fieldsList(first.fields)}${structuredArtifact(first)}`, [["Open full newspaper report", first.route]])}
      ${sourceCard(followup.title, `${visualFigure("GM-V103-A07B-RIVER-FOLLOWUP", { compact: true })}<p class="page-meta">${E(followup.meta)}</p>${paragraphs(followup.paragraphs)}${structuredArtifact(followup)}`, [["Open next-day follow-up", followup.route]])}`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <label>Full name in the report (Romanized)<input name="fullName" autocomplete="off"></label>
      <label>Age<input name="age" inputmode="numeric" autocomplete="off"></label>
      <label>Region<input name="region" autocomplete="off"></label>
      <label>Object actually found by the river<input name="foundObject" autocomplete="off"></label>
      <label>Outcome in the next-day report<select name="followup"><option value="">Choose one</option><option value="person-safe">She contacted her family and was physically safe</option><option value="body-found">Her body was found by the river</option><option value="still-missing">She remained missing</option></select></label>
      <button type="submit">Submit identity check</button>
    </form>`;
    return workspaceShell(route, "Newspaper Identity Check", "Compare the full name, age, region, found object, and follow-up before linking the report to anyone.", sourceHTML, formHTML, beatId);
  }

  function renderNanqiaoWorkspace(route) {
    const beatId = "puzzle-compare-nanqiao";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Two Versions of the Nanqiao Thread", beatId);
    const early = Core.RUMOR_CAPTURES.find((item) => item.phase === "initial");
    const resolved = Core.RUMOR_CAPTURES.find((item) => item.phase === "resolved");
    const earlyPage = Content.sites.nanqiaoForum.main.find((item) => item.route === `/rumor-snapshot/${early.key}`);
    const resolvedPage = Content.sites.nanqiaoForum.main.find((item) => item.route === `/rumor-snapshot/${resolved.key}`);
    const replies = resolvedPage.replies.map(([name, time, text]) => `<p><strong>${E(name)} ${E(time)}</strong> ${E(text)}</p>`).join("");
    const sourceHTML = `<div class="compare-columns">
      <article class="compare-pane"><h3>${E(early.date)} ${E(early.time)}</h3><h4>${E(earlyPage.title)}</h4>${visualFigure("GM-V103-A10A-NANQIAO-EARLY", { compact: true })}<p>${E(earlyPage.originalPost)}</p>${structuredArtifact(earlyPage)}${A("Open pre-dawn capture", earlyPage.route)}</article>
      <article class="compare-pane"><h3>${E(resolved.date)} ${E(resolved.time)}</h3><h4>${E(resolvedPage.title)}</h4>${visualFigure("GM-V103-A10B-NANQIAO-MORNING", { compact: true })}<p>${E(resolvedPage.originalPost)}</p>${replies}<aside class="records-notice"><p>${E(resolvedPage.sourceBoundary)}</p></aside>${structuredArtifact(resolvedPage)}${A("Open morning capture", resolvedPage.route)}</article>
    </div>`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which two body-text versions are being compared?</legend>${checkbox("captures", early.key, `${early.date} ${early.time}`)}${checkbox("captures", resolved.key, `${resolved.date} ${resolved.time}`)}${checkbox("captures", "20050302", "2005-03-02 duplicate-era capture")}</fieldset>
      <fieldset><legend>Which checkable details appear in the morning version?</legend>
        ${checkbox("findings", "at-sister", "She was at her older sister's home")}
        ${checkbox("findings", "close-thread", "The original poster asked people to stop reposting and close the thread")}
        ${checkbox("findings", "not-divorced", "A reply says she had only then learned that Chen Yuan was not divorced")}
        ${checkbox("findings", "refused-discussion", "The full reply says she did not want to discuss it further")}
        ${checkbox("findings", "waited-at-factory-gate", "The same sentence says Chen Yuan still waited at the factory gate")}
        ${checkbox("findings", "proves-no-prior-harm", "Contact that morning rules out every kind of earlier harm")}
      </fieldset>
      <button type="submit">Save body-text differences</button>
    </form>`;
    return workspaceShell(route, "Two Versions of the Nanqiao Thread", "Compare the body text saved from the same URL before dawn and in the morning. Keep only the narrow facts the thread actually supports.", sourceHTML, formHTML, beatId);
  }

  function renderPosthumousRelationWorkspace(route) {
    const beatId = "puzzle-compare-posthumous-relation";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Dates of a Posthumous Relationship Label", beatId);
    const answerItem = findSiteItem(Content.sites.chengnanRecords, `/records/dayi/${Core.CANONICAL.ids.answer}`);
    const heLingObituary = findSiteItem(Content.sites.oldNews, "/oldnews/notices/20161104-08");
    const sourceHTML = `
      ${sourceCard("2016 · He Ling Obituary", `${obituaryEvidence(heLingObituary)}<p>The public obituary gives a date of death but no cause.</p>`, [["Open obituary", "/oldnews/notices/20161104-08"]])}
      ${sourceCard("2017 · Chen Yuan's Public Answer", `${visualFigure("GM-V103-A01-BACK", { compact: true })}<p class="page-meta">${E(Core.RECORDS.answer.publicAt)}</p><p>${E(Core.RECORDS.answer.question)}</p>${structuredArtifact(answerItem, "Original handwritten line")}`, [["Open public answer", `/records/dayi/${Core.CANONICAL.ids.answer}`]])}
      <aside class="horror-pause"><p>Neither page explains anyone's motive. For now, determine only which event came first.</p></aside>`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which two public pages are shown side by side?</legend>
        ${checkbox("sources", "heling-obituary", "He Ling's obituary")}
        ${checkbox("sources", "hls06-answer", "Public answer HLS-170418-06")}
        ${checkbox("sources", "river-report", "Dongjiang County river report")}
      </fieldset>
      <label>Date of the earlier event<select name="firstDate"><option value="">Choose one</option><option value="2016-10-28">2016-10-28 · He Ling died</option><option value="2017-02-11">2017-02-11 · Paper file collected</option><option value="2017-04-18">2017-04-18 · Public answer posted</option></select></label>
      <label>Date when the relationship label was still being handled<select name="secondDate"><option value="">Choose one</option><option value="2017-02-11">2017-02-11</option><option value="2017-04-18">2017-04-18</option><option value="2017-05-07">2017-05-07</option></select></label>
      <label>Relationship label used for outsiders in the original<select name="relation"><option value="">Choose one</option><option value="younger-female-cousin">Younger female cousin</option><option value="friend">Friend</option><option value="verified-relative">Verified relative</option></select></label>
      <button type="submit">Save posthumous-label comparison</button>
    </form>`;
    return workspaceShell(route, "Dates of a Posthumous Relationship Label", "First separate the rumor. Then notice when an ordinary relationship label was written after the person it described could no longer answer.", sourceHTML, formHTML, beatId);
  }

  function renderHls07MidnightWorkspace(route) {
    const beatId = "puzzle-inspect-hls07-midnight";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Midnight Status-Generation Check", beatId);
    const action = findSiteItem(Content.sites.chengnanRecords, `/records/index-actions/${Core.CANONICAL.ids.withdrawnAnswer}`);
    const rule = findSiteItem(Content.sites.chengnanRecords, Core.STATUS_RULE_ROUTE);
    const samples = findSiteItem(Content.sites.chengnanRecords, Core.STATUS_SAMPLES_ROUTE);
    const ritual = findSiteItem(Content.sites.helishu, Core.RITUAL_CAPTURE_ROUTE);
    const captureIndex = findSiteItem(Content.sites.pageTime, "/archive/results/heqi-20170419");
    const orderOptions = [
      ["", "Choose one"],
      ["2017-04-18 23:46", "2017-04-18 23:46 · HLS07 content submitted"],
      ["2017-04-19 00:12:08", "2017-04-19 00:12:08 · Contract page first readable"],
      ["2017-04-19 00:12:31", "2017-04-19 00:12:31 · HLS07 moved offline"],
      ["2017-04-19 00:19:08", "2017-04-19 00:19:08 · Contract page first returned 410"],
    ];
    const orderSelect = (label) => `<label>${E(label)}<select name="order">${orderOptions.map(([value, text]) => `<option value="${E(value)}">${E(text)}</option>`).join("")}</select></label>`;
    const sourceHTML = `
      ${sourceCard("Ordinary Rule · generator v2.1", `${paragraphs(rule.paragraphs)}${fieldsList(rule.fields)}${structuredArtifact(rule)}`, [["Open generation notes", rule.route]])}
      ${sourceCard("Ordinary Status Sample · 8 records", `${dataTable(samples.rows, samples.rowHeaders)}<p class="source-boundary">${E(samples.scopeNote)}</p>${structuredArtifact(samples)}`, [["Open independent sample page", samples.route]])}
      ${sourceCard("Target Page · Chinese Status Body", `${ritualStatusSheet(ritual, "midnight-workspace")}<p class="source-boundary">${E(ritual.scopeNote)}</p>`, [["Open target capture", ritual.route]])}
      ${sourceCard("One URL · Four Capture Points", `${visualFigure("GM-V103-A11-CAPTURE-STRIP", { compact: true })}${fieldsList(captureIndex.fields)}${dataTable(captureIndex.rows, captureIndex.rowHeaders)}<p class="source-boundary">${E(captureIndex.scopeNote)}</p>${structuredArtifact(captureIndex)}`, [["Open full capture index", captureIndex.route]])}
      ${sourceCard("HLS07 · Public Index Action", `${fieldsList(action.fields)}${dataTable(action.rows, action.rowHeaders)}${structuredArtifact(action)}`, [["Open index action", action.route]])}
      <aside class="horror-pause midnight-impossible"><p>The rule says a pending relationship can only be held. The target page's manual-override field is blank as well. Do not explain it yet; place the two timelines beside each other.</p></aside>`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Choose one ordinary example of each relevant state</legend>
        ${checkbox("samples", "ZT-170414-06", "Pending relationship → held: ZT-170414-06")}
        ${checkbox("samples", "GH-170417-03", "Verified relationship + completed offline review + named reviewer → contract formed: GH-170417-03")}
        ${checkbox("samples", "JC-170418-04", "Memorial booklet generated: JC-170418-04")}
      </fieldset>
      <label>Normal page state when relationship verification is pending<select name="pendingState"><option value="">Choose one</option><option value="pending">Held</option><option value="contract-formed">Contract formed</option><option value="generated">Generated</option></select></label>
      <fieldset><legend>Fields required for an ordinary record to become “contract formed”</legend>
        ${checkbox("completeRequirements", "relationship-verified", "Relationship verification: verified")}
        ${checkbox("completeRequirements", "offline-review-complete", "Offline review: completed")}
        ${checkbox("completeRequirements", "reviewer-nonempty", "Reviewer field: not blank")}
        ${checkbox("completeRequirements", "manual-override-blank", "Manual override: blank")}
      </fieldset>
      <fieldset><legend>Place the four events in chronological order</legend><div class="classification-grid">
        ${orderSelect("Position 1")}${orderSelect("Position 2")}${orderSelect("Position 3")}${orderSelect("Position 4")}
      </div></fieldset>
      <fieldset><legend>Which two fields conflict on the target page?</legend>
        ${checkbox("anomalousFields", "relationship-pending", "Relationship verification: pending")}
        ${checkbox("anomalousFields", "contract-formed", "Rite status: contract formed")}
        ${checkbox("anomalousFields", "manual-override-authorized", "Manual override: authorized")}
      </fieldset>
      <div class="classification-grid">
        <label>Seconds from the page becoming readable to HLS07 moving offline<input name="leadSeconds" type="number" min="0" max="120" inputmode="numeric"></label>
        <label>Minutes from the first readable capture to the first 410<input name="windowMinutes" type="number" min="0" max="30" inputmode="numeric"></label>
      </div>
      <label>Public body-text status for HLS07<select name="bodyState"><option value="">Choose one</option><option value="unavailable">The public index did not retain the body text</option><option value="restored">The complete body text has been restored</option><option value="harmless">The body text has been confirmed harmless</option></select></label>
      <button type="submit">Save rule and timeline comparison</button>
    </form>`;
    return workspaceShell(route, "Midnight Status-Generation Check", "Infer the system rule from ordinary samples, then compare it with the target fields and four capture points.", sourceHTML, formHTML, beatId);
  }

  function renderGhostMatchmakerTraditionWorkspace(route) {
    const beatId = "puzzle-trace-ghost-matchmaker-tradition";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Dating Two Folklore Pages", beatId);
    const folk = findSiteItem(Content.sites.chengnanOldStories, Core.FOLKLORE_ROUTE);
    const note = findSiteItem(Content.sites.chengnanOldStories, Core.FOLKLORE_NOTE_ROUTE);
    const capture = findSiteItem(Content.sites.pageTime, Core.FOLKLORE_CAPTURE_ROUTE);
    const notice = findSiteItem(Content.sites.chengnanRecords, "/records/notices/2017-06-volunteers");
    const sourceHTML = `
      ${sourceCard("2009-03-14 · Edited Interview", `${paragraphs(folk.paragraphs)}${fieldsList(folk.sourceBox)}<p class="source-boundary">${E(folk.sourceBoundary)}</p>${structuredArtifact(folk)}`, [["Open interview page", folk.route]])}
      ${sourceCard("2009-03-21 · Reader Addendum", `${visualFigure("GM-V103-A04-FOLKLORE", { compact: true })}${paragraphs(note.paragraphs)}${fieldsList(note.sourceBox)}<p class="source-boundary">${E(note.sourceBoundary)}</p>${structuredArtifact(note)}`, [["Open addendum page", note.route]])}
      ${sourceCard("2009-04-02 · Independent Capture Index", `${fieldsList(capture.fields)}${dataTable(capture.rows, capture.rowHeaders)}<p class="source-boundary">${E(capture.scopeNote)}</p>${structuredArtifact(capture)}`, [["Open capture index", capture.route]])}
      ${sourceCard("2017-06-28 · Ordinary Handover Note", `${paragraphs(notice.paragraphs)}${structuredArtifact(notice)}`, [["Open handover page", notice.route]])}`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which pages prove that the material existed before 2017?</legend>
        ${checkbox("pages", "interview", "2009 edited interview")}
        ${checkbox("pages", "reader-note", "2009 reader addendum")}
        ${checkbox("pages", "archive-proof", "2009 independent capture index")}
        ${checkbox("pages", "reprint", "2020 reprint")}
      </fieldset>
      <div class="classification-grid">
        <label>Interview-page date<input name="pageDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
        <label>Addendum-page date<input name="noteDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
        <label>Date the two pages were captured together<input name="captureDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
        <label>Date of Old Zhou's later handover note<input name="laterUse" placeholder="YYYY-MM-DD" autocomplete="off"></label>
        <label>Term used by the old pages<input name="term" autocomplete="off"></label>
        <label>Oral source<input name="oralSource" autocomplete="off" placeholder="Name (local form of address)"></label>
        <label>Local branch<input name="scope" autocomplete="off"></label>
      </div>
      <label>Line preserved by the addendum<select name="rule"><option value="">Choose one</option><option value="livingnamesevendayrule">If a living name falls into the deceased field and remains for seven days, that living name belongs to the white affair.</option><option value="dead-return-seventh-day">On the seventh day, a dead person must return home.</option><option value="universal-rite-rule">Every red and white affair across the country follows this rule.</option></select></label>
      <button type="submit">Save page and capture dates</button>
    </form>`;
    return workspaceShell(route, "Dating Two Folklore Pages", "Place the interview, addendum, independent capture, and later handover in their own years.", sourceHTML, formHTML, beatId);
  }

  function renderGhostSedanWorkspace(route) {
    const beatId = "puzzle-triangulate-ghost-sedan";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Four Pages from the Same Night", beatId);
    const sedan = findSiteItem(Content.sites.nanqiaoSuccessor, Core.SEDAN_ROUTE);
    const cleanup = findSiteItem(Content.sites.chengnanRecords, Core.CLEANUP_ROUTE);
    const note = findSiteItem(Content.sites.chengnanOldStories, Core.FOLKLORE_NOTE_ROUTE);
    const ritual = findSiteItem(Content.sites.helishu, Core.RITUAL_CAPTURE_ROUTE);
    const sourceHTML = `
      ${sourceCard("01:37 · Nanqiao Eyewitness Thread", `<p>${E(sedan.originalPost)}</p><p class="source-boundary">${E(sedan.sourceBoundary)}</p>${structuredArtifact(sedan)}`, [["Open thread", sedan.route]])}
      ${sourceCard("06:40 · Lane-Cleaning Log", `${visualFigure("GM-V103-A05-CLEANUP", { compact: true })}${fieldsList(cleanup.fields)}<p class="source-boundary">Three charred bamboo slivers are not four incense sticks. The damp human-shaped paper and red cotton cord have no verifiable provenance either.</p>${structuredArtifact(cleanup)}`, [["Open public log", cleanup.route]])}
      ${sourceCard("2009 · Nanqiao Reader Addendum", `${visualFigure("GM-V103-A04-FOLKLORE", { compact: true })}${paragraphs(note.paragraphs)}${fieldsList(note.sourceBox)}${structuredArtifact(note)}`, [["Open addendum", note.route]])}
      ${sourceCard("00:12:08 · Chinese Status Body", `${ritualStatusSheet(ritual, "sedan-workspace")}<p class="source-boundary">This page has no road, sedan, or physical-remains fields.</p>`, [["Open target capture", ritual.route]])}`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <fieldset><legend>Which four sources are compared here?</legend>
        ${checkbox("sources", "forum-sedan", "Nanqiao eyewitness thread")}
        ${checkbox("sources", "cleanup-log", "Next-morning cleaning log")}
        ${checkbox("sources", "folklore-page", "2009 Nanqiao reader addendum")}
        ${checkbox("sources", "hls07-midnight", "00:12:08 redacted status summary")}
        ${checkbox("sources", "river-report", "Dongjiang County river report")}
      </fieldset>
      <fieldset><legend>Which fields can be matched directly across pages?</legend>
        ${checkbox("matches", "same-night", "The status capture, eyewitness post, and cleaning job fall on the same night")}
        ${checkbox("matches", "same-lane", "Both the eyewitness post and cleaning log name the east-lane entrance in Nanqiao")}
        ${checkbox("matches", "paper-figure", "The addendum's cut-paper figure resembles the damp human-shaped paper in the cleaning log")}
        ${checkbox("matches", "red-cord", "The addendum's red cotton thread resembles the red cotton cord in the cleaning log")}
        ${checkbox("matches", "exact-four-sticks", "The cleaning log records exactly four intact incense sticks")}
        ${checkbox("matches", "proves-ghost", "Together the four pages prove a supernatural ghost sedan")}
      </fieldset>
      <button type="submit">Save four-page field pairing</button>
    </form>`;
    return workspaceShell(route, "Four Pages from the Same Night", "Connect only the times, location, and ambiguous remains actually written on the pages. Do not supply the missing incense stick or a spirit tablet.", sourceHTML, formHTML, beatId);
  }

  function renderSevenDayRuleWorkspace(route) {
    const beatId = "puzzle-compare-seven-day-rule";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "Seven-Day Date Comparison", beatId);
    const ritual = findSiteItem(Content.sites.helishu, Core.RITUAL_CAPTURE_ROUTE);
    const obituary = findSiteItem(Content.sites.oldNews, Core.CHEN_OBITUARY_ROUTE);
    const note = findSiteItem(Content.sites.chengnanOldStories, Core.FOLKLORE_NOTE_ROUTE);
    const sourceHTML = `
      ${sourceCard("April 19 · Chinese Status Page First Readable", `${ritualStatusSheet(ritual, "seven-day-workspace")}`, [["Open redacted capture", ritual.route]])}
      ${sourceCard("2009 Addendum · Auntie Liu's Nanqiao Branch", `${paragraphs(note.paragraphs)}${fieldsList(note.sourceBox)}${structuredArtifact(note)}`, [["Open reader addendum", note.route]])}
      ${sourceCard("Published April 27 · Chen Yuan Obituary", `${obituaryEvidence(obituary)}${fieldsList(obituary.fields)}`, [["Open obituary", obituary.route]])}
      <ol class="seven-day-strip" aria-label="Calendar-day comparison to complete"><li>April 19 · Status page first readable</li><li>April 26 · Chen Yuan died</li><li>April 27 · Obituary published</li></ol>`;
    const formHTML = `<form data-beat-form="${beatId}" novalidate>
      <label>Date the status page first became readable<input name="ritualDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
      <label>Date Chen Yuan died<input name="deathDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
      <label>Calendar days between those dates<input name="interval" type="number" min="0" max="30" inputmode="numeric"></label>
      <label>Date the obituary was published<input name="noticeDate" placeholder="YYYY-MM-DD" autocomplete="off"></label>
      <button type="submit">Save three-date calculation</button>
    </form>`;
    return workspaceShell(route, "Seven-Day Date Comparison", "Calculate the calendar-day gap between the first readable status capture and the death date. Record the obituary publication date separately.", sourceHTML, formHTML, beatId);
  }

  function renderArchiveBagWorkspace(route) {
    const beatId = "puzzle-submit-archive-bag";
    if (!workspaceReady(beatId)) return lockedWorkspace(route, "The Last Field in the Archive Bag", beatId);
    const ritual = findSiteItem(Content.sites.helishu, Core.RITUAL_CAPTURE_ROUTE);
    const sourceHTML = `
      <article class="archive-bag-preview"><p class="eyebrow">GH-170419-01 · Source Capture</p><h2>Chinese status body to catalogue</h2>${ritualStatusSheet(ritual, "archive-bag")}<p>The form below is a separate English catalogue decision. It does not rewrite the captured Chinese page.</p></article>
      <aside class="records-notice"><strong>What the public web can support</strong>
        <p>The forum retelling, two obituaries, HLS07 index, and status-generation rule answer different questions. None can substitute for another.</p>
        <p>For each field, choose only the catalogue value supported by public sources. A choice beyond a source boundary will send you back to the relevant page.</p>
      </aside>`;
    const formHTML = `<form class="ritual-form-mirror" data-beat-form="${beatId}" novalidate>
      <p class="eyebrow">Catalogue from public sources only. A blank is also a field value.</p>
      <label>Relationship label in the original<select name="originalRelation"><option value="">Choose one</option><option value="younger-female-cousin">Younger female cousin (the wording used for outsiders in 2017)</option><option value="spouses">Spouses</option><option value="no-relationship">No relationship</option></select></label>
      <label>Actual relationship<select name="realRelation"><option value="">Choose one</option><option value="unverified">Unverified</option><option value="cousin">Confirmed younger female cousin</option><option value="spouse">Confirmed spouse</option></select></label>
      <label>Public HLS07 body text<select name="hls07Body"><option value="">Choose one</option><option value="unavailable">Not retained by the public index</option><option value="ritual-confession">Confirmed ghost-marriage document</option><option value="harmless">Confirmed harmless</option></select></label>
      <label>Cause of He Ling's death<select name="heLingDeathCause"><option value="">Choose one</option><option value="unconfirmed">Cannot be confirmed from the public web</option><option value="suicide">Suicide</option><option value="illness">Illness</option></select></label>
      <label>Cause of Chen Yuan's death<select name="chenDeathCause"><option value="">Choose one</option><option value="unconfirmed">Cannot be confirmed from the public web</option><option value="ritual">Caused by the alleged seven-day rule</option><option value="natural">Natural causes</option></select></label>
      <label>Catalogue meaning of the 00:12 anomaly<select name="anomalyMeaning"><option value="">Choose one</option><option value="documented-rule-conflict">The public rule conflicts with the captured fields</option><option value="ritual-proved">An offline rite has been confirmed</option><option value="operator-proved">A specific operator's override has been confirmed</option></select></label>
      <label>Supernatural cause<select name="supernaturalCause"><option value="">Choose one</option><option value="unresolved">Unresolved</option><option value="confirmed">Confirmed</option><option value="disproved">Disproved</option></select></label>
      <fieldset><legend>Actual relationship field</legend>${radio("relationAction", "leave-blank", "Leave it blank; do not write a status for He Ling")}${radio("relationAction", "copy-cousin", "Copy “younger female cousin” as the actual relationship")}${radio("relationAction", "complete-marriage", "Write “spouses” and complete the relationship")}</fieldset>
      <button type="submit">Seal the archive bag</button>
    </form>`;
    return workspaceShell(route, "The Last Field in the Archive Bag", "This form mirrors the midnight contract page, but records only what the sources allow. Catalogue every field, then return to the thread.", sourceHTML, formHTML, beatId);
  }

  function renderWorkspace(route, path) {
    if (path === "/workspace/source") return renderSourceWorkspace(route);
    if (path === "/workspace/river") return renderRiverWorkspace(route);
    if (path === "/workspace/nanqiao") return renderNanqiaoWorkspace(route);
    if (path === "/workspace/posthumous-relation") return renderPosthumousRelationWorkspace(route);
    if (path === "/workspace/hls07-midnight") return renderHls07MidnightWorkspace(route);
    if (path === "/workspace/ghost-matchmaker-tradition") return renderGhostMatchmakerTraditionWorkspace(route);
    if (path === "/workspace/ghost-sedan") return renderGhostSedanWorkspace(route);
    if (path === "/workspace/seven-day-rule") return renderSevenDayRuleWorkspace(route);
    if (path === "/workspace/archive-bag") return renderArchiveBagWorkspace(route);
    return "";
  }

  function renderAttachment(route) {
    const attachment = Content.entry.openingThread.attachment;
    const site = Content.sites.chengnanWenda;
    return mainShell(route, site.id, site.browserTitle, `${siteHeader(site)}<div class="site-width world-content" data-world-content><article class="world-article attachment-page"><p class="eyebrow">Attachment reconstruction</p><h1>${E(attachment.fileName)}</h1><p>${E(attachment.caption)}</p>${attachmentEvidence(attachment, { compact: false })}<p>The original poster redacted real names and contact details. Only the surviving Chinese lines have been reconstructed; spacing, typeface, paper, and crop are not authenticated.</p>${A("Return to thread", "/forum")}</article></div>`);
  }

  function renderNotFound(route) {
    return mainShell(route, "not-found", "Page Not Found", `<div class="not-found-page"><article><p class="eyebrow">404</p><h1>No page matches this path</h1><p>The address may be incomplete, its parameters may be unreadable, or the offline copy may not include that page.</p><div class="button-row">${A("Return to Chengnan Q&A", "/forum")} ${A("Open PageTime", "/archive")}</div></article></div>`, "not-found-shell");
  }

  function resolvePage(route) {
    const { path, params } = routeParts(route);
    if (path === "/start") return renderStart(route);
    if (path === "/forum" || path === "/forum/latest") return renderForum(route);
    if (path.startsWith("/forum/")) {
      const forum = renderForumAux(route, path, params);
      if (forum) return forum;
    }
    if (path === "/files/img-1842") return renderAttachment(route);
    if (path === "/retired") return renderRetired(route);
    if (path === "/archive") return renderArchiveHome(route, params);
    if (path === "/archive/results/helishu") return renderArchiveResults(route, "helishu");
    if (path === "/archive/results/nanqiao") return renderArchiveResults(route, "nanqiao");

    const falsePath = renderFalsePath(route, path);
    if (falsePath) return falsePath;

    const archiveItem = findSiteItem(Content.sites.pageTime, path);
    if (archiveItem && path !== "/archive") return genericWorldItem(archiveItem, Content.sites.pageTime, route);
    const archiveMeta = renderArchiveMeta(route, path);
    if (archiveMeta) return archiveMeta;

    const ritualCapture = renderRitualCapture(route, path);
    if (ritualCapture) return ritualCapture;
    const helishuItem = findSiteItem(Content.sites.helishu, path);
    if (helishuItem && !/^\/(?:snapshot|person-snapshot)\/[0-9]+$/.test(path)) return genericWorldItem(helishuItem, Content.sites.helishu, route);
    const personCapture = renderPersonCapture(route, path);
    if (personCapture) return personCapture;
    const helishuCapture = renderHelishuCapture(route, path);
    if (helishuCapture) return helishuCapture;

    if (path.startsWith("/records")) {
      const records = renderRecordsRoute(route, path);
      if (records) return records;
    }
    if (path.startsWith("/chengnanli") || path === "/files/cn-63192-collage") {
      const oldStories = renderOldStoriesRoute(route, path);
      if (oldStories) return oldStories;
    }
    if (path.startsWith("/oldnews")) {
      const oldNews = renderOldNewsRoute(route, path, params);
      if (oldNews) return oldNews;
    }
    const nanqiaoCapture = renderNanqiaoCapture(route, path);
    if (nanqiaoCapture) return nanqiaoCapture;
    if (path.startsWith("/nanqiao")) {
      const nanqiao = renderNanqiaoAux(route, path);
      if (nanqiao) return nanqiao;
    }
    if (path.startsWith("/nanqiao2")) {
      const successor = renderNanqiaoSuccessorRoute(route, path);
      if (successor) return successor;
    }
    if (path.startsWith("/workspace/")) {
      const workspace = renderWorkspace(route, path);
      if (workspace) return workspace;
    }
    return renderNotFound(route);
  }

  function revealCurrentForumSection() {
    const current = appRoot.querySelector('.forum-header nav [aria-current="page"]');
    const scroller = current?.parentElement;
    if (!current || !scroller || scroller.scrollWidth <= scroller.clientWidth) return;
    const currentRect = current.getBoundingClientRect();
    const scrollerRect = scroller.getBoundingClientRect();
    if (currentRect.left < scrollerRect.left) {
      scroller.scrollLeft -= scrollerRect.left - currentRect.left;
    } else if (currentRect.right > scrollerRect.right) {
      scroller.scrollLeft += currentRect.right - scrollerRect.right;
    }
  }

  function render() {
    renderSessionLayer();
    appRoot.innerHTML = resolvePage(activeRoute || currentRoute());
    revealCurrentForumSection();
    const main = document.getElementById("main-content");
    const reactionId = ui.pendingFocusReaction;
    if (!reactionId && main) main.focus({ preventScroll: true });
    if (reactionId) {
      window.requestAnimationFrame(() => {
        const target = document.querySelector(`[data-reaction-id="${window.CSS?.escape ? window.CSS.escape(reactionId) : reactionId}"]`);
        if (!target) {
          if (main) main.focus({ preventScroll: true });
          return;
        }
        target.focus({ preventScroll: false });
        const read = Core.markReactionRead(state, reactionId);
        if (read.ok) saveState(read.state);
        ui.pendingFocusReaction = "";
        announce("The original poster added a new reply.");
      });
    }
  }

  const ERROR_COPY = Object.freeze({
    "empty-url": "Enter the complete URL.",
    "malformed-url": "This address format is not recognized. Keep the protocol, host, and full path.",
    "redirect-url": "This is an internal redirect, not the saved original-page path.",
    "wrong-url": "That full URL has no result on the current capture timeline.",
    "capture-pair": "Choose exactly two captures to compare.",
    "comparison-mode": "Specify whether you are comparing body text or capture metadata.",
    "page-date": "The date claimed by the page has not been matched.",
    editor: "The credited page editor does not match.",
    "capture-meaning": "The response fields do not support that relationship between the captures.",
    "complete-quote": "The selected sentence still does not complete the printed fragment.",
    "hls-code": "The date and reverse-side suffix do not yet form a complete searchable ID.",
    "empty-code": "Enter the complete answer ID.",
    "wrong-code": "That ID did not return a public answer matching the surviving suffix.",
    "visit-dates": "The selected dates do not match exactly the three rows that reused the matter number after closure.",
    "allowed-pickup": "Collecting the paper file was allowed after closure; do not mix it with later improper reuse.",
    issue: "Classify the registration problem separately from whether new material was received.",
    "required-clauses": "The selected clauses do not yet establish whether a closed number could still be reused.",
    "unrelated-clauses": "One selected clause is unrelated to this classification.",
    "proof-boundary": "The review's receipt, scan, and revision boundaries are incomplete.",
    account: "The operator account does not match the public record.",
    "display-name": "The display name does not match the volunteer profile.",
    "staff-id": "The volunteer ID does not match.",
    "real-name": "The public name does not match.",
    "action-time": "The time does not match the public index action.",
    shift: "The shift-change record does not support that time slot.",
    "privacy-code": "The reason code does not match the public handling notes.",
    "privacy-meaning": "The selected meaning of the public index action is too broad or incorrect.",
    "privacy-limits": "One evidence boundary of the privacy process is still missing.",
    speaker: "The person who used the nickname does not match.",
    referent: "The person referred to in the note does not match.",
    response: "The subject's response does not match.",
    classification: "The nickname's provenance is not classified correctly.",
    "empty-keyword": "Enter a name or catalogue term.",
    "no-matching-name-set": "That term does not produce this expanded set of names.",
    "full-name": "The full name has not been matched from the complete article.",
    age: "The age does not match.",
    region: "The region does not match.",
    "found-object": "The object found by the river does not match.",
    followup: "The next-day outcome does not match.",
    conclusion: "That identity conclusion goes beyond the stable fields.",
    "continuation-fields": "The morning version's added body-text details are not fully selected.",
    "posthumous-sources": "Choose the page that directly records the death date and the page that preserves the relationship question. Do not add a same-name report.",
    "posthumous-first-date": "The obituary's date for He Ling's death is not selected correctly.",
    "posthumous-second-date": "The date when the relationship label was still being handled does not match.",
    "posthumous-relation": "Keep the original relationship label without upgrading its certainty.",
    "midnight-samples": "Choose one ordinary pending record and one fully verified record from the sample table.",
    "midnight-order": "One event is out of order. Check submission, first readable capture, move offline, and first 410.",
    "midnight-pending-state": "Return to the generation rule and check which state is allowed when a relationship is pending.",
    "midnight-complete-requirements": "Check which fields must coexist for a formed contract and exclude unrelated fields.",
    "midnight-anomalous-fields": "The two incompatible target fields have not both been selected. Compare the ordinary samples column by column.",
    "midnight-lead-seconds": "Subtract the first readable time from the HLS07 offline time at second precision.",
    "midnight-window-minutes": "Subtract the first readable capture from the first 410. Capture points do not prove continuous availability.",
    "midnight-body": "Check what the public HLS07 index actually retains; do not fill a blank with a guess.",
    "folklore-pages": "Choose the original pages and contemporary independent capture that establish their date, not a later reprint.",
    "folklore-page-date": "The interview-page date does not match.",
    "folklore-note-date": "The Nanqiao reader-addendum date does not match.",
    "folklore-capture-date": "The independent capture date for the two pages does not match.",
    "folklore-later-date": "The later volunteer handover date does not match.",
    "folklore-term": "The term shared by the two pages does not match.",
    "folklore-oral-source": "Return to the interview's source field and enter the oral source as identified there.",
    "folklore-scope": "Use the local branch explicitly named by the pages; do not expand it into a universal custom.",
    "folklore-rule": "Keep the local rule as preserved by the addendum. Do not add a death method or universal force.",
    "sedan-sources": "Choose the four sources covering the sighting, cleanup, folklore, and midnight status. Exclude the unrelated identity report.",
    "sedan-matches": "Connect only times, location, and ambiguous remains directly present on the four pages. Do not supply missing objects.",
    "seven-day-start": "The capture date for the formed-contract status page does not match.",
    "seven-day-end": "The death date recorded by Chen Yuan's obituary does not match.",
    "seven-day-interval": "Recalculate the calendar-day gap between the two fixed dates.",
    "seven-day-notice-date": "Separate the death date from the obituary publication date, then check the old-paper metadata.",
    "archive-original-relation": "Return to the 2017 original and distinguish its written term from whether it proves the actual relationship.",
    "archive-real-relation": "Do not upgrade wording for outsiders into a verified actual relationship.",
    "archive-hls-body": "Check what remains in the HLS07 public body field. Do not invent missing content.",
    "archive-heling-cause": "Check whether He Ling's obituary actually records a cause of death.",
    "archive-chen-cause": "Check whether Chen Yuan's obituary actually records a cause of death.",
    "archive-anomaly-meaning": "Catalogue only the scope directly supported by the public rule and captured fields.",
    "archive-supernatural-cause": "Separate the observable anomaly from a cause these pages cannot answer.",
    "archive-relationship-action": "Choose a catalogue action based on the source status of the actual relationship; do not let the original label replace an unverified fact.",
    "archive-confirmation": "Confirm the archive-bag label and blank-field treatment.",
    "timeline-order": "The four source groups are not in a unique formation/publication order.",
    "source-groups": "Not all four source groups are included.",
    "preview-confirmation": "Review the three-column preview first.",
    "publish-confirmation": "Publication has not been explicitly confirmed.",
    "free-text-length": "The note may be blank. If used, write a complete sentence.",
    "free-text-repetition": "The note contains too many repeated characters.",
  });

  const AGGREGATE_ERROR_COPY = Object.freeze({
    "puzzle-inspect-hls07-midnight": "Several fields still do not match the five sources. Infer the generation rule from ordinary samples, then order the target page and index action.",
    "puzzle-trace-ghost-matchmaker-tradition": "The interview, addendum, independent capture, and later handover are not yet placed with the correct source and year.",
    "puzzle-triangulate-ghost-sedan": "Separate the four sources from the fields that can actually be paired. Connect only times, location, and remains written in the sources.",
    "puzzle-compare-seven-day-rule": "The three dates have not been separated by source. Distinguish first readable, death, and obituary publication before calculating the gap.",
    "puzzle-submit-archive-bag": "Several archive fields exceed or omit the public sources. Separate original wording, unverified fact, documented anomaly, and unresolved cause.",
  });

  function messagesFor(errors, beatId = "") {
    const uniqueErrors = [...new Set(errors || [])];
    if (uniqueErrors.length > 1) {
      return [AGGREGATE_ERROR_COPY[beatId] || "Several submitted fields do not match their pages. Recheck the sources and method, then open a hint if needed."];
    }
    return [...new Set(uniqueErrors.map((code) => {
      if (String(code).startsWith("missing-input-token:")) return "This tool still needs an earlier verified observation. Return to the public pages and complete it first.";
      if (String(code).startsWith("claim:") || String(code).startsWith("unexpected-claim:")) return "At least one confirmed, disproved, or unresolved classification exceeds its source boundary.";
      if (String(code).startsWith("missing-token:")) return "A required source classification is still missing.";
      return ERROR_COPY[code] || "The submission is missing a field that can be observed directly from the page.";
    }))];
  }

  function showErrors(form, beatId, errors) {
    const messages = messagesFor(errors, beatId);
    ui.errors[beatId] = messages;
    const scope = form.closest(".workspace-form, .archive-search-panel, .records-home-panel, .oldnews-search-layout, .oldnews-main") || form.parentElement;
    const box = scope?.querySelector("[data-form-errors]");
    if (box) box.innerHTML = messages.map((text) => `<p>${E(text)}</p>`).join("");
    form.querySelectorAll("[aria-invalid]").forEach((control) => control.removeAttribute("aria-invalid"));
    form.setAttribute("aria-describedby", box?.id || "");
    const saved = state.hints[beatId] || { rung: 0, attempts: 0, returns: 0, answerShown: false };
    updateHint(beatId, { attempts: Math.min(99, (saved.attempts || 0) + 1) });
    const first = form.querySelector("input, select, textarea, button");
    if (first) {
      first.setAttribute("aria-invalid", "true");
      if (box?.id) first.setAttribute("aria-describedby", box.id);
      first.focus();
    }
    announce(messages[0] || "The submission did not pass verification.");
  }

  function values(formData, key) {
    return formData.getAll(key).map(String);
  }

  function payloadForBeat(beatId, formData) {
    if (beatId === "puzzle-archive-helishu" || beatId === "puzzle-archive-nanqiao") return { url: formData.get("url") };
    if (beatId === "puzzle-compare-helishu-versions") return {
      captures: values(formData, "captures"), mode: formData.get("mode"), pageDate: formData.get("pageDate"), editor: formData.get("editor"),
      interpretation: formData.get("interpretation"), quote: formData.get("quote"), code: formData.get("code"),
    };
    if (beatId === "puzzle-lookup-hls06") return { code: formData.get("code") };
    if (beatId === "puzzle-classify-procedure") return {
      dates: values(formData, "dates"), issue: formData.get("issue"), clauses: values(formData, "clauses"), boundaries: values(formData, "boundaries"), note: formData.get("note"),
    };
    if (beatId === "puzzle-triangulate-zhao") return {
      account: formData.get("account"), displayName: formData.get("displayName"), staffId: formData.get("staffId"), realName: formData.get("realName"),
      actionTime: formData.get("actionTime"), shiftId: formData.get("shiftId"), privacyCode: formData.get("privacyCode"), privacyMeaning: formData.get("privacyMeaning"), privacyLimits: values(formData, "privacyLimits"),
    };
    if (beatId === "puzzle-trace-ghost-name") return { speaker: formData.get("speaker"), referent: formData.get("referent"), response: formData.get("response"), classification: formData.get("classification") };
    if (beatId === "puzzle-search-oldnews") return { keyword: formData.get("keyword") };
    if (beatId === "puzzle-classify-river") return {
      fullName: formData.get("fullName"), age: formData.get("age"), region: formData.get("region"), foundObject: formData.get("foundObject"), followup: formData.get("followup"),
    };
    if (beatId === "puzzle-compare-nanqiao") return { captures: values(formData, "captures"), findings: values(formData, "findings") };
    if (beatId === "puzzle-compare-posthumous-relation") return {
      sources: values(formData, "sources"), firstDate: formData.get("firstDate"), secondDate: formData.get("secondDate"), relation: formData.get("relation"),
    };
    if (beatId === "puzzle-inspect-hls07-midnight") return {
      samples: values(formData, "samples"), order: values(formData, "order"), pendingState: formData.get("pendingState"),
      completeRequirements: values(formData, "completeRequirements"), anomalousFields: values(formData, "anomalousFields"),
      leadSeconds: formData.get("leadSeconds"), windowMinutes: formData.get("windowMinutes"), bodyState: formData.get("bodyState"),
    };
    if (beatId === "puzzle-trace-ghost-matchmaker-tradition") return {
      pages: values(formData, "pages"), pageDate: formData.get("pageDate"), noteDate: formData.get("noteDate"), captureDate: formData.get("captureDate"),
      laterUse: formData.get("laterUse"), term: formData.get("term"), oralSource: formData.get("oralSource"), scope: formData.get("scope"), rule: formData.get("rule"),
    };
    if (beatId === "puzzle-triangulate-ghost-sedan") return {
      sources: values(formData, "sources"), matches: values(formData, "matches"),
    };
    if (beatId === "puzzle-compare-seven-day-rule") return {
      ritualDate: formData.get("ritualDate"), deathDate: formData.get("deathDate"), interval: formData.get("interval"), noticeDate: formData.get("noticeDate"),
    };
    if (beatId === "puzzle-submit-archive-bag") return {
      originalRelation: formData.get("originalRelation"), realRelation: formData.get("realRelation"), hls07Body: formData.get("hls07Body"),
      heLingDeathCause: formData.get("heLingDeathCause"), chenDeathCause: formData.get("chenDeathCause"),
      anomalyMeaning: formData.get("anomalyMeaning"), supernaturalCause: formData.get("supernaturalCause"), relationAction: formData.get("relationAction"),
    };
    if (beatId === "puzzle-classify-timeline") {
      const statuses = {};
      for (const claimId of Object.keys(Core.TIMELINE_EXPECTED)) statuses[claimId] = formData.get(`status:${claimId}`);
      return { order: [0, 1, 2, 3].map((index) => formData.get(`order-${index}`)), statuses };
    }
    return {};
  }

  function successCopy(beatId) {
    if (beatId === "puzzle-triangulate-zhao") return Content.workspaceSuccess.zhaoIdentity.summary;
    if (beatId === "puzzle-compare-nanqiao") return `${Content.workspaceSuccess.nanqiaoComparison.summary} ${Content.workspaceSuccess.nanqiaoComparison.sourceBoundary}`;
    const copy = {
      "puzzle-archive-helishu": "The public capture timeline for the original path is now listed.",
      "puzzle-compare-helishu-versions": "The page date, repeat capture, and surviving reverse-side suffix have been separated.",
      "puzzle-lookup-hls06": "The public answer ID returned a matching record.",
      "puzzle-classify-procedure": "Improper reuse is now separated from the limits of the receipt, scan, and revision review.",
      "puzzle-triangulate-zhao": "The account, volunteer identity, shift, and privacy action now align.",
      "puzzle-trace-ghost-name": "The nickname's speaker, referent, and subject response now align.",
      "puzzle-search-oldnews": "The expanded name search returned 12 results across 2 pages.",
      "puzzle-classify-river": "The river report's identity fields now match its next-day follow-up.",
      "puzzle-archive-nanqiao": "The public capture timeline for the Nanqiao thread is now listed.",
      "puzzle-compare-nanqiao": "The differences between the pre-dawn and morning body text are recorded.",
      "puzzle-compare-posthumous-relation": "The two pages and their date order are recorded.",
      "puzzle-inspect-hls07-midnight": "The ordinary rule, target fields, and four capture times are now side by side.",
      "puzzle-trace-ghost-matchmaker-tradition": "The two folklore pages now align with their contemporary independent capture.",
      "puzzle-triangulate-ghost-sedan": "The four pages and their observable fields are now side by side.",
      "puzzle-compare-seven-day-rule": "The death date, publication date, and calendar-day gap are recorded separately.",
      "puzzle-submit-archive-bag": "The archive bag is sealed. The relationship field was left blank.",
    };
    return copy[beatId] || "This verification has been recorded.";
  }

  function handleCorrectionSubmit(form, formData, intent) {
    const beatId = "puzzle-submit-correction";
    const sourceGroups = values(formData, "sourceGroups");
    const freeText = String(formData.get("freeText") || "");
    if (intent === "preview") {
      const required = new Set(Core.ENDING_SOURCE_GROUPS);
      const selected = new Set(sourceGroups);
      const preview = Core.buildEndingPreview(state);
      if (selected.size !== required.size || [...required].some((item) => !selected.has(item))) {
        showErrors(form, beatId, ["source-groups"]);
        return;
      }
      if (!preview.ready) {
        showErrors(form, beatId, preview.missingTokenIds.map((id) => `missing-token:${id}`));
        return;
      }
      updateDraft("correction", { sourceGroups, freeText, previewed: true });
      ui.correctionPreview = true;
      ui.errors[beatId] = [];
      render();
      document.querySelector("[data-ending-preview]")?.focus?.();
      announce("The three-column preview is ready and has not been published.");
      return;
    }
    const result = Core.completeBeat(state, beatId, {
      sourceGroups,
      freeText,
      previewConfirmed: formData.get("previewConfirmed") === "yes" && (ui.correctionPreview || state.drafts.correction?.previewed === true),
      publishConfirmed: formData.get("publishConfirmed") === "yes",
    });
    if (!result.ok) {
      showErrors(form, beatId, result.errors);
      return;
    }
    saveState(result.state);
    ui.successBeat = beatId;
    ui.successText = successCopy(beatId);
    announce("The three-column correction has been published. Return to the thread to read the update.");
    go("/forum/latest");
  }

  function handleBeatSubmit(form, event) {
    const beatId = form.dataset.beatForm;
    const formData = new FormData(form);
    const intent = event.submitter?.value || "";
    if (beatId === "puzzle-submit-correction") {
      handleCorrectionSubmit(form, formData, intent);
      return;
    }
    const payload = payloadForBeat(beatId, formData);
    const result = Core.completeBeat(state, beatId, payload);

    if (beatId === "puzzle-search-oldnews") {
      const keyword = String(formData.get("keyword") || "").trim();
      const queryContext = { term: keyword, page: 1, focusId: "" };
      if (result.ok) {
        saveState({ ...result.state, queryContexts: { ...result.state.queryContexts, "search-oldnews": queryContext } });
        ui.successBeat = beatId;
        ui.successText = successCopy(beatId);
      } else {
        saveState({ ...state, queryContexts: { ...state.queryContexts, "search-oldnews": queryContext } });
        ui.successBeat = "";
      }
      go(`/oldnews/search?keyword=${encodeURIComponent(keyword)}&page=1`);
      return;
    }

    if (!result.ok) {
      ui.successBeat = "";
      if (beatId === "puzzle-archive-helishu" || beatId === "puzzle-archive-nanqiao") {
        ui.queryFeedback = "The previous result was cleared; this URL did not produce a usable timeline.";
        ui.queryFeedbackState = "error";
        const feedback = form.closest(".archive-search-panel")?.querySelector(".query-feedback");
        if (feedback) { feedback.dataset.state = "error"; feedback.innerHTML = `<p>${E(ui.queryFeedback)}</p>`; }
      }
      showErrors(form, beatId, result.errors);
      return;
    }

    saveState(result.state);
    ui.successBeat = beatId;
    ui.successText = successCopy(beatId);
    ui.errors[beatId] = [];

    if (beatId === "puzzle-archive-helishu") go("/archive/results/helishu");
    else if (beatId === "puzzle-archive-nanqiao") go("/archive/results/nanqiao");
    else if (beatId === "puzzle-lookup-hls06") go(`/records/dayi/${Core.CANONICAL.ids.answer}`);
    else if (["puzzle-compare-posthumous-relation", "puzzle-inspect-hls07-midnight", "puzzle-trace-ghost-matchmaker-tradition", "puzzle-triangulate-ghost-sedan", "puzzle-compare-seven-day-rule", "puzzle-submit-archive-bag"].includes(beatId)) go("/forum/latest");
    else {
      render();
      document.querySelector("[data-beat-success]")?.focus?.();
      announce(ui.successText);
    }
  }

  function resetSession() {
    try {
      window.localStorage.removeItem(Core.STORAGE_KEY);
    } catch (_error) {
      storageAvailable = false;
    }
    memoryFallback = "";
    state = Core.createInitialState();
    ui = freshSessionUI();
    announce("This web session has been cleared.");
    go("/start");
  }

  document.addEventListener("click", (event) => {
    const skip = event.target.closest("[data-skip-link]");
    if (skip) {
      event.preventDefault();
      document.getElementById("main-content")?.focus({ preventScroll: false });
      return;
    }
    const nav = event.target.closest("[data-nav]");
    if (nav) {
      event.preventDefault();
      ui.drawer = "";
      ui.resetPending = false;
      go(nav.dataset.nav);
      return;
    }
    const button = event.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    if (action === "open-visual") {
      openVisualAsset(button.dataset.visualId, button);
    } else if (action === "close-visual") {
      closeVisualAsset();
    } else if (action === "toggle-drawer") {
      ui.drawer = ui.drawer === button.dataset.drawer ? "" : button.dataset.drawer;
      ui.resetPending = false;
      renderSessionLayer();
    } else if (action === "close-drawer") {
      const returnDrawer = button.dataset.returnDrawer;
      ui.drawer = "";
      ui.resetPending = false;
      renderSessionLayer();
      document.querySelector(`[data-drawer="${returnDrawer}"]`)?.focus?.();
    } else if (action === "accept-entry-note") {
      updateDraft("entryAccepted", true);
      go("/forum");
    } else if (action === "accept-rumor-note") {
      updateDraft("rumorAccepted", true);
      render();
      announce("Content notice confirmed. The body text is now open.");
    } else if (action === "request-reset") {
      ui.drawer = "menu";
      ui.resetPending = true;
      renderSessionLayer();
    } else if (action === "cancel-reset") {
      ui.resetPending = false;
      renderSessionLayer();
    } else if (action === "confirm-reset") {
      resetSession();
    } else if (action === "request-hint") {
      const beatId = button.dataset.hintBeat;
      const rung = Number.parseInt(button.dataset.hintRung, 10);
      if (rung === 4) {
        ui.directHintPending = beatId;
      } else {
        const saved = state.hints[beatId] || { rung: 0, attempts: 0, returns: 0, answerShown: false };
        updateHint(beatId, { rung: Math.max(saved.rung || 0, rung) });
      }
      render();
    } else if (action === "confirm-direct-hint") {
      const beatId = button.dataset.hintBeat;
      updateHint(beatId, { rung: 4, answerShown: true });
      ui.directHintPending = "";
      render();
    } else if (action === "cancel-direct-hint") {
      ui.directHintPending = "";
      render();
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    event.preventDefault();
    if (Element.prototype.matches.call(form, "[data-beat-form]")) {
      handleBeatSubmit(form, event);
      return;
    }
    if (Element.prototype.matches.call(form, '[data-site-search="forum"]')) {
      const data = new FormData(form);
      go(`/forum/search?keyword=${encodeURIComponent(String(data.get("keyword") || ""))}`);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && ui.drawer) {
      const returnDrawer = ui.drawer;
      ui.drawer = "";
      ui.resetPending = false;
      renderSessionLayer();
      document.querySelector(`[data-action="toggle-drawer"][data-drawer="${returnDrawer}"]`)?.focus?.();
    }
  });

  window.addEventListener("hashchange", () => enterRoute(currentRoute()));

  enterRoute(window.location.hash ? currentRoute() : "/start");
})();