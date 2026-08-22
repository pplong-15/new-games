(function () {
  const G = window.GAME;
  const SAVE_KEY = G.meta.saveKey;
  const app = document.createElement("div");
  app.id = "app";

  const initial = function () {
    return {
      schemaVersion: G.meta.schemaVersion,
      started: false,
      unlocked: G.meta.publicPages.slice(),
      visited: [],
      verified: [],
      searchHistory: [],
      query: "",
      ending: null,
      hintLevel: 0,
      large: false,
      reduce: false,
      flash: null
    };
  };

  let state = load() || initial();

  function load() {
    try {
      var raw = localStorage.getItem(SAVE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || typeof data !== "object") return null;
      var base = initial();
      var next = Object.assign({}, base, data);
      next.schemaVersion = G.meta.schemaVersion;
      ["unlocked", "visited", "verified", "searchHistory"].forEach(function (k) {
        if (!Array.isArray(next[k])) next[k] = base[k];
      });
      G.meta.publicPages.forEach(function (id) {
        if (next.unlocked.indexOf(id) < 0) next.unlocked.push(id);
      });
      return next;
    } catch (e) {
      return null;
    }
  }

  function save() {
    var dump = Object.assign({}, state, { flash: null });
    localStorage.setItem(SAVE_KEY, JSON.stringify(dump));
  }

  function has(id) {
    return state.verified.indexOf(id) >= 0 || state.unlocked.indexOf(id) >= 0;
  }

  function hasFact(id) {
    return state.verified.indexOf(id) >= 0;
  }

  function addVerified(id) {
    if (id && state.verified.indexOf(id) < 0) state.verified.push(id);
  }

  function unlockPage(id) {
    if (id && state.unlocked.indexOf(id) < 0) state.unlocked.push(id);
  }

  function visit(id) {
    if (state.visited.indexOf(id) < 0) state.visited.push(id);
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function normalize(s) {
    return String(s || "")
      .normalize("NFKC")
      .replace(/[\s\u3000]+/g, "")
      .replace(/[“”"']/g, "")
      .replace(/[，。、；：！？,.!?:;]/g, "")
      .toLowerCase();
  }

  function applyCombos() {
    var changed = true;
    while (changed) {
      changed = false;
      (G.combos || []).forEach(function (c) {
        if (c.need.every(hasFact) && !hasFact(c.give[0])) {
          c.give.forEach(addVerified);
          changed = true;
        }
      });
    }
  }

  function pageFile(id) {
    var p = G.pages[id];
    return p && p.file ? p.file : id + ".html";
  }

  function numberedCount() {
    var n = 0;
    state.visited.forEach(function (id) {
      if (G.pages[id] && G.pages[id].no) n += 1;
    });
    return n;
  }

  function footerHtml(page) {
    var no = page && page.no ? page.no + "/" + G.meta.totalPages : "—/" + G.meta.totalPages;
    return (
      '<footer class="game-ft">' +
      (page && page.no ? no : "Intro") +
      " · Mirror cache. Do not match to real institutions or persons." +
      "</footer>"
    );
  }

  function flashBox() {
    if (!state.flash) return "";
    return (
      '<div class="flash flash-' + esc(state.flash.type) + '" role="status">' +
      esc(state.flash.text) +
      "</div>"
    );
  }

  function searchForm(placeholder) {
    var q = esc(state.query || "");
    return (
      '<form class="site-search" data-act="search">' +
      '<label class="sr-only" for="q">On-site search</label>' +
      '<input id="q" name="q" value="' + q + '" maxlength="32" autocomplete="off" placeholder="' +
      esc(placeholder || "one token, no spaces") + '">' +
      "<button type=\"submit\">Search</button></form>"
    );
  }

  function validateQuery(raw) {
    var trimmed = String(raw || "").trim();
    if (!trimmed) return { ok: false, type: "empty", msg: "Enter one token." };
    if (/[\s\u3000]/.test(trimmed)) {
      return { ok: false, type: "multi", msg: "Search one token at a time. Spaces count as a split. This mirror has no combined search." };
    }
    var n = normalize(trimmed);
    if (!n) return { ok: false, type: "empty", msg: "Enter one token. Punctuation is stripped." };
    if (!/^([\u4e00-\u9fff]+|[A-Za-z][A-Za-z0-9]*)$/.test(trimmed)) {
      return { ok: false, type: "invalid", msg: "Use one token as it appears on a page you already opened. No spaces, no punctuation." };
    }
    return { ok: true, q: n, raw: trimmed };
  }

  function snippetOf(page, q) {
    var text = page.excerpt || "";
    var nq = normalize(q);
    if (!text) return page.title || "";
    if (!nq) return text.slice(0, 48);
    var idx = normalize(text).indexOf(nq);
    if (idx < 0) return text.slice(0, 42);
    return text.slice(Math.max(0, idx - 10), idx + 28);
  }

  function search(raw) {
    var v = validateQuery(raw);
    if (!v.ok) return { type: v.type, msg: v.msg, items: [] };
    var nq = v.q;
    var items = [];
    var seen = {};

    function push(id, viaKeyword) {
      var page = G.pages[id];
      if (!page || seen[id]) return;
      seen[id] = true;
      items.push({
        id: id,
        title: page.resultTitle || page.title,
        href: pageFile(id),
        snippet: snippetOf(page, raw),
        visited: state.visited.indexOf(id) >= 0,
        viaKeyword: !!viaKeyword
      });
    }

    G.keywords.forEach(function (k) {
      var hit = k.queries.some(function (q) { return normalize(q) === nq; });
      if (!hit) return;
      if (k.forbidden) {
        k.opens.forEach(function (id) { unlockPage(id); });
        items.forbidden = true;
        items.forbidTo = k.opens[0];
        return;
      }
      (k.opens || []).forEach(function (id) {
        unlockPage(id);
        push(id, true);
      });
      (k.alsoOpens || []).forEach(function (id) {
        unlockPage(id);
        push(id, true);
      });
    });

    if (items.forbidden) {
      return { type: "forbidden", msg: "You do not have permission to view this content.", items: [], to: items.forbidTo };
    }

    Object.keys(G.pages).forEach(function (id) {
      var page = G.pages[id];
      if (!page.searchable) return;
      var open = state.unlocked.indexOf(id) >= 0 || G.meta.publicPages.indexOf(id) >= 0;
      if (!open) return;
      var blob = normalize((page.title || "") + (page.aliases || []).join("") + (page.searchBody || ""));
      if (blob.indexOf(nq) >= 0) push(id, false);
    });

    items.sort(function (a, b) {
      if (a.viaKeyword !== b.viaKeyword) return a.viaKeyword ? -1 : 1;
      return 0;
    });

    if (!items.length) {
      return { type: "miss", msg: "No matching results. Try a token that already appears on a page you opened.", items: [] };
    }
    return { type: "hit", msg: items.length + " result(s)", items: items };
  }

  function currentHintKey() {
    var order = G.hintOrder;
    for (var i = 0; i < order.length; i++) {
      if (!hasFact(order[i].need)) return order[i].id;
    }
    return "end";
  }

  function bindOnce() {
    if (window.__TONGCHUANG_BOUND) return;
    window.__TONGCHUANG_BOUND = true;
    document.addEventListener("click", onClick);
    document.addEventListener("submit", onSubmit);
    document.addEventListener("change", onChange);
  }

  function bind(_root) {
    bindOnce();
  }

  function onClick(ev) {
    var t = ev.target.closest("[data-act], [data-nav], [data-choice]");
    if (!t) return;
    if (t.dataset.nav) {
      ev.preventDefault();
      go(t.dataset.nav);
      return;
    }
    if (t.dataset.choice) {
      ev.preventDefault();
      chooseEnding(t.dataset.choice);
      return;
    }
    var act = t.dataset.act;
    if (act === "new") startNew();
    if (act === "continue") {
      state.started = true;
      save();
      var last = null;
      for (var i = state.visited.length - 1; i >= 0; i--) {
        if (G.pages[state.visited[i]] && G.pages[state.visited[i]].file && state.visited[i] !== "intro") {
          last = state.visited[i];
          break;
        }
      }
      go(pageFile(last || "home"));
    }
    if (act === "wipe") {
      localStorage.removeItem(SAVE_KEY);
      state = initial();
      save();
      render();
    }
    if (act === "hint") useHint();
  }

  function onChange(ev) {
    if (ev.target.dataset.opt === "large") {
      state.large = ev.target.checked;
      save();
      document.documentElement.classList.toggle("large", !!state.large);
    }
    if (ev.target.dataset.opt === "reduce") {
      state.reduce = ev.target.checked;
      save();
      document.documentElement.classList.toggle("reduce", !!state.reduce);
    }
  }

  function onSubmit(ev) {
    var form = ev.target;
    if (!(form instanceof HTMLFormElement)) return;
    ev.preventDefault();
    if (form.dataset.act === "search") {
      var q = (form.q.value || "").trim();
      state.query = q;
      if (q && state.searchHistory[state.searchHistory.length - 1] !== q) {
        state.searchHistory.push(q);
      }
      save();
      go("search.html?q=" + encodeURIComponent(q));
      return;
    }
    if (form.dataset.act === "login") handleLogin(form);
  }

  function go(href) {
    save();
    location.href = href;
  }

  function startNew() {
    var prefs = { large: state.large, reduce: state.reduce };
    state = initial();
    state.started = true;
    state.large = prefs.large;
    state.reduce = prefs.reduce;
    save();
    go(pageFile("home"));
  }

  function useHint() {
    var key = currentHintKey();
    var pack = G.hints[key];
    if (!pack) return;
    state.hintLevel = Math.min(4, (state.hintLevel && key === state.hintKey ? state.hintLevel : 0) + 1);
    state.hintKey = key;
    var text = pack[state.hintLevel - 1];
    state.flash = { type: "ok", text: "Reply " + state.hintLevel + ": " + text };
    save();
    render();
  }

  function handleLogin(form) {
    var user = normalize(form.user.value);
    var pass = normalize(form.pass.value);
    var p = G.login;
    if (!user || !pass) {
      state.flash = { type: "bad", text: "Enter a login name and a passphrase." };
      save();
      render();
      return;
    }
    var userOk = p.users.some(function (u) { return normalize(u) === user; });
    var passOk = p.passwords.some(function (x) { return normalize(x) === pass; });
    if (userOk && passOk) {
      addVerified("access_class");
      unlockPage("class-rules");
      unlockPage("class-feed");
      unlockPage("inbox");
      state.flash = { type: "ok", text: "Signed in. You have no delete rights. You can only read what the class page has not yet cleared." };
      save();
      go(pageFile("class-feed"));
      return;
    }
    var msg = "Login name or passphrase is wrong.";
    p.near.forEach(function (n) {
      if (n.user && normalize(n.user) === user) msg = n.feedback;
      if (n.pass && normalize(n.pass) === pass) msg = n.feedback;
    });
    state.flash = { type: "bad", text: msg };
    save();
    render();
  }

  function chooseEnding(which) {
    var need = G.meta.endingNeed;
    if (!need.every(hasFact)) {
      state.flash = { type: "bad", text: "You cannot submit yet. Match the three generations to your own line first." };
      save();
      render();
      return;
    }
    if (which === "logout") {
      state.ending = "logout";
      addVerified("choice_logout");
      addVerified("ending_logout");
      unlockPage("ending-a");
      save();
      go(pageFile("ending-a"));
      return;
    }
    if (which === "keep") {
      state.ending = "keep";
      addVerified("choice_keep");
      addVerified("ending_keep");
      unlockPage("ending-b");
      save();
      go(pageFile("ending-b"));
      return;
    }
  }

  function renderSearch(params) {
    var q = params.get("q") || state.query || "";
    state.query = q;
    var result = search(q);
    if (result.type === "forbidden") {
      unlockPage("forbidden");
      go(pageFile("forbidden"));
      return;
    }
    var list = "";
    if (result.type === "hit") {
      list = result.items.map(function (it) {
        var cls = it.visited ? " visited" : "";
        return (
          '<div class="hit"><a class="' + cls + '" href="' + esc(it.href) + '">' + esc(it.title) + "</a>" +
          "<p>" + esc(it.snippet) + "</p></div>"
        );
      }).join("");
    } else {
      list = '<p class="miss">' + esc(result.msg) + "</p>";
    }
    var page = G.pages.search;
    document.documentElement.className = page.skin + (state.large ? " large" : "") + (state.reduce ? " reduce" : "");
    document.title = page.title;
    document.body.innerHTML =
      '<div class="mini-bar"><div class="top-inner"><span class="logo">Classmates</span><a href="home.html">Home</a>' +
      searchForm("one token, no spaces") +
      "</div></div>" +
      '<div class="box">' +
      flashBox() +
      "<h2>Classmates Search</h2>" +
      "<p>" + (result.type === "hit" ? esc(result.msg) : "") + "</p>" +
      list +
      (typeof page.html === "function" ? page.html() : "") +
      '<p class="muted"><a href="home.html">Back to home</a></p>' +
      "</div>" +
      footerHtml(page);
    visit("search");
    bind(document.body);
    save();
  }

  function renderPage(id) {
    var page = G.pages[id];
    if (!page) {
      document.body.innerHTML = "<p>This page is not in the mirror.</p>";
      return;
    }
    if (page.need && page.need.length && !page.need.every(function (t) {
      return t.indexOf("page:") === 0 ? state.unlocked.indexOf(t.slice(5)) >= 0 : hasFact(t) || has(t);
    })) {
      go(pageFile("forbidden"));
      return;
    }
    if (G.meta.publicPages.indexOf(id) < 0 && state.unlocked.indexOf(id) < 0 && id !== "search" && id !== "intro") {
      go(pageFile("forbidden"));
      return;
    }
    visit(id);
    if (page.grants) page.grants.forEach(addVerified);
    applyCombos();
    if (page.unlocks) page.unlocks.forEach(unlockPage);

    document.documentElement.className = page.skin + (state.large ? " large" : "") + (state.reduce ? " reduce" : "");
    document.title = page.title;
    var html = typeof page.html === "function" ? page.html({
      esc: esc,
      has: hasFact,
      searchForm: searchForm,
      flash: flashBox,
      state: state,
      a: function (id, label) {
        var p = G.pages[id];
        if (!p) return esc(label);
        var open = state.unlocked.indexOf(id) >= 0 || G.meta.publicPages.indexOf(id) >= 0;
        if (!open) return "<span>" + esc(label) + "</span>";
        return '<a href="' + esc(pageFile(id)) + '">' + label + "</a>";
      }
    }) : page.html;
    html = html.replace(/\{\{SEARCH\}\}/g, searchForm());
    html = html.replace(/\{\{FLASH\}\}/g, flashBox());
    document.body.innerHTML = html + footerHtml(page);
    bind(document.body);
    save();
  }

  function selfTest() {
    var saved = JSON.stringify(state);
    var report = {
      emptySearch: search("").items.length,
      spaceSearchType: search("纸马 课").type,
      enSearchType: search("renren").type,
      paperhorse: search("纸马课").items.some(function (i) { return i.id === "blog-paperhorse"; }),
      paperhorseEn: search("PaperHorse").items.some(function (i) { return i.id === "blog-paperhorse"; }),
      aliasShop: search("沈记").items.some(function (i) { return i.id === "shenji"; }),
      aliasShopEn: search("Shenji").items.some(function (i) { return i.id === "shenji"; }),
      orphanInputs: [],
      blocked: [],
      reachable: [],
      endings: {}
    };

    var have = {};
    G.meta.publicPages.forEach(function (id) { have["page:" + id] = true; });
    var remaining = G.puzzles.slice();
    var guard = 0;
    var progressed = true;
    while (progressed && guard++ < 80) {
      progressed = false;
      remaining = remaining.filter(function (p) {
        var ok = (p.inputs || []).every(function (t) { return have[t]; });
        if (!ok) return true;
        (p.outputs || []).forEach(function (o) { have[o] = true; });
        (p.unlocks || []).forEach(function (u) { have["page:" + u] = true; });
        report.reachable.push(p.id);
        progressed = true;
        return false;
      });
    }
    report.blocked = remaining.map(function (p) { return p.id; });
    G.puzzles.forEach(function (p) {
      (p.inputs || []).forEach(function (t) {
        var produced = G.puzzles.some(function (x) { return (x.outputs || []).indexOf(t) >= 0; });
        var initial = G.meta.publicPages.indexOf(t.replace(/^page:/, "")) >= 0 || t.indexOf("page:") === 0 && G.meta.publicPages.indexOf(t.slice(5)) >= 0;
        if (!produced && !initial && report.orphanInputs.indexOf(t) < 0) report.orphanInputs.push(t);
      });
    });
    report.endings.logoutNeed = G.meta.endingNeed.every(function (t) { return have[t]; });
    report.endings.keepNeed = report.endings.logoutNeed;
    report.keywordCount = G.keywords.filter(function (k) { return !k.forbidden; }).reduce(function (n, k) {
      return n + k.queries.length;
    }, 0);
    report.numberedPages = Object.keys(G.pages).filter(function (id) { return G.pages[id].no; }).length;
    report.saveKey = G.meta.saveKey;

    try { state = JSON.parse(saved); } catch (e) {}
    return report;
  }

  function render() {
    if (window.PAGE_KEY === "search") {
      renderSearch(new URLSearchParams(location.search));
      return;
    }
    renderPage(window.PAGE_KEY);
  }

  function boot() {
    bindOnce();
    document.documentElement.classList.toggle("large", !!state.large);
    document.documentElement.classList.toggle("reduce", !!state.reduce);
    var params = new URLSearchParams(location.search);
    if (params.get("test") === "1") {
      document.documentElement.className = "skin-intro-manual";
      document.body.innerHTML = "<pre>" + esc(JSON.stringify(selfTest(), null, 2)) + "</pre>";
      window.TONGCHUANG_TEST = selfTest;
      return;
    }
    var id = window.PAGE_KEY;
    if (id === "search") {
      document.body.innerHTML = "";
      document.body.appendChild(app);
      renderSearch(params);
      return;
    }
    if (id !== "intro" && !state.started) {
      state.started = true;
    }
    renderPage(id);
  }

  window.TONGCHUANG_TEST = selfTest;
  document.addEventListener("keydown", function (ev) {
    if (ev.key === "/" && ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
      ev.preventDefault();
      var box = document.getElementById("q");
      if (box) box.focus();
    }
  });
  boot();
})();
