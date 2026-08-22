(() => {
  const $ = (id) => document.getElementById(id);
  const SAVE = "hengdeng-nightshift-v2-en";

  const ui = {
    desk: $("desk"),
    scene: $("scene"),
    rain: $("rain"),
    flicker: $("flicker"),
    portraitWrap: $("portraitWrap"),
    portrait: $("portrait"),
    counterFx: $("counterFx"),
    hud: $("hud"),
    hudTime: $("hudTime"),
    hudNight: $("hudNight"),
    sanityBar: $("sanityBar"),
    hudCash: $("hudCash"),
    catBtn: $("catBtn"),
    dock: $("dock"),
    who: $("who"),
    tag: $("tag"),
    line: $("line"),
    choices: $("choices"),
    tapHint: $("tapHint"),
    title: $("title"),
    prep: $("prep"),
    settle: $("settle"),
    ending: $("ending"),
    stockSheet: $("stockSheet"),
    rulesSheet: $("rulesSheet"),
    phoneSheet: $("phoneSheet"),
    catMemSheet: $("catMemSheet"),
    catEye: $("catEye"),
    catEyeText: $("catEyeText"),
    catViewToggle: $("catViewToggle"),
    catMemBtn: $("catMemBtn"),
    clueBtn: $("clueBtn"),
    clueSheet: $("clueSheet"),
    clueBoardBtn: $("clueBoardBtn"),
    catViewHint: $("catViewHint"),
    titleRoles: $("titleRoles"),
    toast: $("toast"),
    slip: $("slip"),
    newGame: $("newGame"),
    continueGame: $("continueGame"),
    stockBtn: $("stockBtn"),
    rulesBtn: $("rulesBtn"),
    retryNightBtn: $("retryNightBtn"),
    muteBtn: $("muteBtn"),
    debug: $("debug"),
  };

  let state = null;
  let queue = [];
  let typing = false;
  let typedTimer = 0;
  let typePulse = null;
  let holdAdvanceTimer = 0;
  let fullText = "";
  let typeDone = null;
  let waitingTap = false;
  let afterTap = null;
  let toastTimer = 0;
  let holding = false;
  let choiceBeat = null;
  const CLEARED = "hengdeng-cleared-en";
  const SEEN = "hengdeng-endings-en";
  const CAT_VIEW_UNLOCK = "hengdeng-unlockedCatView-en";
  const CAT_VIEW_ON = "hengdeng-catViewOn-en";
  const CAT_MEM_KEY = "hengdeng-catMemories-en";
  const CAT_MEM_CLEAR = "hengdeng-catMemCleared-en";
  const ROLE_KEY = "hengdeng-unlockedRoles-en";
  const ROLE_SEL = "hengdeng-selectedRole-en";
  const CP = (n) => `hengdeng-cp-en-${n}`;

  function show(el, on = true) { el.hidden = !on; }
  function hideAllOverlays() {
    [ui.title, ui.prep, ui.settle, ui.ending, ui.stockSheet, ui.rulesSheet, ui.phoneSheet, ui.catMemSheet, ui.clueSheet].forEach((e) => { if (e) show(e, false); });
    if (ui.catEye) show(ui.catEye, false);
    if (ui.slip) show(ui.slip, false);
  }

  function fmtTime(m) {
    const x = ((m % (24 * 60)) + 24 * 60) % (24 * 60);
    const h = String(Math.floor(x / 60)).padStart(2, "0");
    const mm = String(x % 60).padStart(2, "0");
    return `${h}:${mm}`;
  }

  function refreshHud() {
    if (!state) return;
    ui.hudTime.textContent = fmtTime(state.time);
    const roleMark = (!isClerk(state) && ROLE_META[state.role]) ? (" · " + ROLE_META[state.role].short) : (state.catView ? " · Cat" : "");
    ui.hudNight.textContent = `Night ${state.night}` + roleMark;
    if (!isClerk(state) && state.role === "cat") ui.hudCash.textContent = "Sitting";
    else if (!isClerk(state) && state.role === "heng") ui.hudCash.textContent = `Joss×${(state.flags && state.flags.jossCash) || 0}`;
    else if (!isClerk(state) && state.role === "wu") ui.hudCash.textContent = "On post";
    else ui.hudCash.textContent = `¥${state.cash}`;
    if (ui.clueBtn) {
      const n = (state.clues && state.clues.length) || 0;
      ui.clueBtn.classList.toggle("on", n > 0);
      ui.clueBtn.classList.toggle("hot", !!state.flags.clueUnread);
    }
    const p = Math.max(0, Math.min(100, state.sanity));
    ui.sanityBar.style.width = p + "%";
    ui.sanityBar.classList.toggle("low", p < 36);
    const lab = document.querySelector(".bar-label");
    if (lab) lab.textContent = p < 36 ? "Sanity low" : "Sanity";
  }

  function clearDesk() {
    choiceBeat = null;
    ui.who.textContent = "—";
    ui.tag.textContent = "";
    ui.line.textContent = "";
    ui.line.classList.remove("typing");
    ui.choices.innerHTML = "";
    ui.tapHint.textContent = "";
    setPortrait(null);
    hideCatEye();
  }

  function setScene(name, opts = {}) {
    const src = IMG[name] || IMG.interior;
    if (ui.scene.getAttribute("src") !== src) ui.scene.src = src;
    ui.scene.classList.toggle("wrong", !!opts.wrong);
    ui.scene.classList.toggle("dawn", !!opts.dawn);
    ui.rain.classList.toggle("off", name === "interior" && !opts.rain);
    if (name === "exterior") ui.rain.classList.remove("off");
    if (ui.counterFx) ui.counterFx.classList.toggle("off", name !== "interior");
  }

  function setPortrait(key) {
    if (!key) {
      ui.portraitWrap.classList.remove("show");
      ui.portrait.removeAttribute("src");
      return;
    }
    ui.portrait.src = IMG[key];
    ui.portraitWrap.classList.add("show");
  }

  function cancelType() {
    clearTimeout(typedTimer);
    typePulse = null;
    typing = false;
    typeDone = null;
    waitingTap = false;
    afterTap = null;
    if (ui.line) ui.line.classList.remove("typing");
  }

  function finishType() {
    if (!typing && !typeDone) return false;
    clearTimeout(typedTimer);
    ui.line.textContent = fullText;
    ui.line.classList.remove("typing");
    typing = false;
    const fn = typeDone;
    typeDone = null;
    if (fn) fn();
    return true;
  }

  function typeTo(text, done) {
    clearTimeout(typedTimer);
    fullText = text || "";
    typeDone = done || null;
    ui.line.textContent = "";
    ui.line.classList.add("typing");
    typing = true;
    waitingTap = false;
    ui.tapHint.textContent = holding ? "Skipping · Space 3×" : "Tap to skip · Space or hold 3×";
    let i = 0;
    const tick = () => {
      i += 1;
      ui.line.textContent = fullText.slice(0, i);
      ui.line.scrollTop = ui.line.scrollHeight;
      if (holding) ui.tapHint.textContent = "Skipping · Space 3×";
      if (i < fullText.length) {
        const slow = fullText[i - 1] === "\n" ? 40 : 18;
        typedTimer = setTimeout(tick, holding ? Math.max(4, Math.floor(slow / 3)) : slow);
      } else finishType();
    };
    typePulse = tick;
    tick();
  }

  function skipType() {
    if (!typing) return false;
    return finishType();
  }

  function sayToast(msg) {
    ui.toast.textContent = msg;
    show(ui.toast, true);
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => show(ui.toast, false), 2400);
  }

  let slipTimer = 0;
  function showSlip(need, money) {
    if (!ui.slip) return;
    const goods = needLabel(need);
    ui.slip.innerHTML = money > 0
      ? `<em>Ticket</em><b>${goods}</b><span>Took ¥${money}</span>`
      : `<em>Out</em><b>${goods}</b><span>Didn't hit the till</span>`;
    show(ui.slip, true);
    clearTimeout(slipTimer);
    slipTimer = setTimeout(() => show(ui.slip, false), 2200);
  }

  function punchCash() {
    if (!ui.hudCash) return;
    ui.hudCash.classList.remove("ping");
    void ui.hudCash.offsetWidth;
    ui.hudCash.classList.add("ping");
  }

  function warnMeters(prevSan, prevRep) {
    if (!state) return;
    if (prevSan > 0 && state.sanity <= 0) return;
    if (prevSan >= 36 && state.sanity < 36 && !state.flags.warnedSan36) {
      state.flags.warnedSan36 = true;
      sayToast("Sanity low. Don't look at reflections. Hit zero and you walk out from behind the counter.");
    } else if (prevSan >= 28 && state.sanity < 28 && !state.flags.warnedSan28) {
      state.flags.warnedSan28 = true;
      sayToast("You're starting to hear your own voice.");
    }
    if (prevRep >= 68 && state.rep < 68 && !state.flags.warnedRep68) {
      state.flags.warnedRep68 = true;
      sayToast("Standing dropped. Wu may not hold the alley mouth.");
    } else if (prevRep >= 58 && state.rep < 58 && !state.flags.warnedRep58) {
      state.flags.warnedRep58 = true;
      sayToast("Standing's thin. Regulars may skip the door last night.");
    }
  }

  function persist() {
    try { localStorage.setItem(SAVE, JSON.stringify(state)); } catch (_) {}
    if (state) saveClueProgress(state);
  }

  function loadSave() {
    try {
      const raw = localStorage.getItem(SAVE);
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function playableHud(on) {
    show(ui.hud, on);
    show(ui.catBtn, on);
    show(ui.dock, on);
    if (!on) hideCatEye();
  }

  function isCatViewUnlocked() {
    try {
      if (localStorage.getItem(CAT_VIEW_UNLOCK) === "1") return true;
      if (localStorage.getItem(CLEARED) === "1") {
        localStorage.setItem(CAT_VIEW_UNLOCK, "1");
        return true;
      }
    } catch (_) {}
    return false;
  }

  function isCatViewOn() {
    if (!isCatViewUnlocked()) return false;
    try { return localStorage.getItem(CAT_VIEW_ON) === "1"; } catch (_) { return false; }
  }

  function setCatViewOn(on) {
    try { localStorage.setItem(CAT_VIEW_ON, on ? "1" : "0"); } catch (_) {}
  }

  function loadCatMem() {
    try {
      const raw = localStorage.getItem(CAT_MEM_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (_) { return []; }
  }

  function saveCatMem(ids) {
    try { localStorage.setItem(CAT_MEM_KEY, JSON.stringify(ids)); } catch (_) {}
  }

  function grantCatMemory(night) {
    const frag = CAT_MEMORIES.find((m) => m.night === night);
    if (!frag) return false;
    const ids = loadCatMem();
    if (ids.indexOf(frag.id) >= 0) return false;
    ids.push(frag.id);
    saveCatMem(ids);
    return true;
  }

  function unlockAllCatMem() {
    const ids = CAT_MEMORIES.map((m) => m.id);
    ids.push(CAT_DEEP.id);
    saveCatMem(ids);
    try { localStorage.setItem(CAT_MEM_CLEAR, "1"); } catch (_) {}
  }

  function hideCatEye() {
    if (ui.catEye) show(ui.catEye, false);
    if (ui.portraitWrap) ui.portraitWrap.classList.remove("cat-unquiet");
  }

  function updateCatEye(beat) {
    if (!ui.catEye) return;
    const on = !!(state && state.catView && beat && !beat.type);
    const eye = on ? catEyeFor(beat) : null;
    if (ui.portraitWrap) ui.portraitWrap.classList.toggle("cat-unquiet", !!(eye && eye.kind === "unquiet"));
    if (!eye) {
      show(ui.catEye, false);
      return;
    }
    if (ui.catEyeText) ui.catEyeText.textContent = eye.text;
    if (state && eye && beat && (beat.portrait === "old" || (beat.name || "").indexOf("Zhongshan") >= 0)) {
      if (grantClue(state, "catKnowsOld")) noteNewClues(["catKnowsOld"]);
    }
    ui.catEye.classList.toggle("unquiet", eye.kind === "unquiet");
    show(ui.catEye, true);
  }

  function openCatMem() {
    const ids = loadCatMem();
    const cleared = (function () { try { return localStorage.getItem(CAT_MEM_CLEAR) === "1"; } catch (_) { return false; } })();
    const cards = CAT_MEMORIES.map((m) => {
      const on = ids.indexOf(m.id) >= 0;
      return on
        ? `<div class="cat-mem-card"><em>${m.title}</em>${m.text}</div>`
        : `<div class="cat-mem-card lock"><em>${m.title}</em>……</div>`;
    }).join("");
    const deep = (ids.indexOf(CAT_DEEP.id) >= 0 || cleared)
      ? `<div class="cat-mem-card"><em>${CAT_DEEP.title}</em>${CAT_DEEP.text}</div>`
      : `<div class="cat-mem-card lock"><em>?</em>Clears on a second-loop run. Then this loosens.</div>`;
    ui.catMemSheet.innerHTML = `
      <h2>Cat Memory</h2>
      <p class="lede">It doesn't talk. These are things it smelled, sat on, blocked.</p>
      <div class="cat-mem-list">${cards}${deep}</div>
      <div class="actions"><button class="primary" id="catMemClose" type="button">Put away</button></div>
    `;
    ui.catMemSheet.querySelector("#catMemClose").addEventListener("click", () => show(ui.catMemSheet, false));
    show(ui.catMemSheet, true);
  }


  const CLUE_SAVE = "hengdeng-clues-en";
  const LINK_SAVE = "hengdeng-clueLinks-en";
  const TRUTH_SAVE = "hengdeng-truths-en";
  let cluePick = [];

  function loadClueProgress() {
    const read = (key) => {
      try {
        const arr = JSON.parse(localStorage.getItem(key) || "[]");
        return Array.isArray(arr) ? arr : [];
      } catch (_) { return []; }
    };
    return { clues: read(CLUE_SAVE), clueLinks: read(LINK_SAVE), truths: read(TRUTH_SAVE) };
  }

  function saveClueProgress(st) {
    if (!st) return;
    const union = (a, b) => {
      const out = [];
      const seen = {};
      [].concat(a || [], b || []).forEach((id) => {
        if (id && !seen[id]) { seen[id] = true; out.push(id); }
      });
      return out;
    };
    try {
      const prev = loadClueProgress();
      localStorage.setItem(CLUE_SAVE, JSON.stringify(union(prev.clues, st.clues)));
      localStorage.setItem(LINK_SAVE, JSON.stringify(union(prev.clueLinks, st.clueLinks)));
      localStorage.setItem(TRUTH_SAVE, JSON.stringify(union(prev.truths, st.truths)));
    } catch (_) {}
  }

  function mergeClueProgress(st) {
    if (!st) return st;
    ensureClueState(st);
    const p = loadClueProgress();
    const union = (a, b) => {
      const out = (a || []).slice();
      (b || []).forEach((id) => { if (id && out.indexOf(id) < 0) out.push(id); });
      return out;
    };
    st.clues = union(st.clues, p.clues);
    st.clueLinks = union(st.clueLinks, p.clueLinks);
    st.truths = union(st.truths, p.truths);
    return st;
  }

  function noteNewClues(got) {
    if (!got || !got.length) return;
    persist();
    refreshHud();
    if (state.clues.length <= got.length) sayToast("Noted. Top-right CLUE. You can flip what you just heard.");
    else sayToast("Another card on the clue board.");
  }

  function boardState() {
    if (state) {
      ensureClueState(state);
      return state;
    }
    const p = loadClueProgress();
    return { clues: p.clues, clueLinks: p.clueLinks, truths: p.truths, flags: {}, night: 7, catView: isCatViewOn() };
  }

  function openClueBoard() {
    const st = boardState();
    const night = st.night || 1;
    const canCmp = night >= 2;
    const ids = st.clues || [];
    if (st.flags) st.flags.clueUnread = false;
    if (state) refreshHud();
    const linked = {};
    (st.clueLinks || []).forEach((lid) => {
      const link = CLUE_LINKS.find((l) => l.id === lid);
      if (link) { linked[link.a] = true; linked[link.b] = true; }
    });
    const cards = ids.length
      ? ids.map((id) => {
          const spec = clueSpec(id);
          if (!spec) return "";
          const on = cluePick.indexOf(id) >= 0;
          const lit = linked[id];
          return `<button type="button" class="clue-card${on ? " sel" : ""}${lit ? " linked" : ""}" data-clue="${id}"><em>${spec.src} · ${spec.title}</em>${spec.text}</button>`;
        }).join("")
      : `<div class="clue-card lock"><em>Empty</em>Nothing noted yet. What customers say, texts, the drawer—after you see it, it lands here.</div>`;
    const truthOrder = ["bossPrevShift", "paperHistory", "hengGhost", "catWhat", "paperToHeng"];
    const truths = truthOrder.map((id) => {
      if (!hasTruth(st, id)) return "";
      const spec = TRUTHS[id];
      return `<div class="clue-truth ${spec.layer}"><em>${spec.layer === "surface" ? "Surface" : "Deep"} · ${spec.title}</em>${spec.text}</div>`;
    }).join("");
    const emptyTruth = truths ? "" : (canCmp ? `<p class="lede">Tap two and compare. A match lights up and makes a sentence.</p>` : `<p class="lede">Note it first. Compare after a night.</p>`);
    let reveal = "";
    if (deepReady(st) && !hasTruth(st, "paperToHeng")) {
      if (night >= 7 || !state) {
        reveal = `<div class="clue-reveal"><p class="lede">These already match. Want the rest of zhizha shop to Hengdeng?</p><button type="button" class="ghost" id="clueReveal">Open it</button></div>`;
      } else {
        reveal = `<p class="lede">The deep ones matched. Last night, decide if you finish reading.</p>`;
      }
    }
    const cmpHint = !canCmp
      ? "Note it first. After a night, two can compare."
      : (cluePick.length === 2 ? "These two. Compare them?" : "Tap two, then Compare.");
    if (!ui.clueSheet) return;
    ui.clueSheet.innerHTML = `
      <h2>Clue Board</h2>
      <p class="lede">Notes go here. Two match, they make a sentence. You can finish the shift without matching.</p>
      <div class="clue-list">${cards}</div>
      <div class="clue-compare">
        <p class="lede">${cmpHint}</p>
        <button type="button" class="primary" id="clueCmp"${canCmp && cluePick.length === 2 ? "" : " disabled"}>Compare</button>
      </div>
      <div class="clue-truths">${emptyTruth}${truths}${reveal}</div>
      <div class="actions"><button class="primary" id="clueClose" type="button">Put away</button></div>
    `;
    ui.clueSheet.querySelectorAll("[data-clue]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-clue");
        const i = cluePick.indexOf(id);
        if (i >= 0) cluePick.splice(i, 1);
        else {
          if (cluePick.length >= 2) cluePick.shift();
          cluePick.push(id);
        }
        openClueBoard();
      });
    });
    const cmp = ui.clueSheet.querySelector("#clueCmp");
    if (cmp) cmp.addEventListener("click", () => {
      if (!canCmp) { sayToast("Note it first. Compare after a night."); return; }
      if (cluePick.length !== 2) { sayToast("Tap two first."); return; }
      const link = findClueLink(cluePick[0], cluePick[1]);
      if (!link) { sayToast("These two don't match. Try another pair."); return; }
      const fresh = applyClueLink(st, link);
      if (state) persist();
      else saveClueProgress(st);
      sayToast(fresh ? link.result : "You already compared these.");
      openClueBoard();
    });
    const rev = ui.clueSheet.querySelector("#clueReveal");
    if (rev) rev.addEventListener("click", () => {
      revealDeepTruth(st);
      if (state) persist();
      else saveClueProgress(st);
      sayToast("You finished this.");
      openClueBoard();
    });
    ui.clueSheet.querySelector("#clueClose").addEventListener("click", () => show(ui.clueSheet, false));
    show(ui.clueSheet, true);
  }

  function refreshCatViewTitle() {
    const unlocked = isCatViewUnlocked();
    const on = isCatViewOn();
    const mem = loadCatMem();
    const memOn = mem.length > 0 || (function () { try { return localStorage.getItem(CAT_MEM_CLEAR) === "1"; } catch (_) { return false; } })();
    if (ui.catViewToggle) {
      ui.catViewToggle.classList.toggle("lock", !unlocked);
      ui.catViewToggle.classList.toggle("on", unlocked && on);
      ui.catViewToggle.textContent = !unlocked ? "Cat View" : (on ? "Cat View · On" : "Cat View · Off");
    }
    if (ui.catViewHint) {
      ui.catViewHint.textContent = !unlocked
        ? "Unlocks after any ending"
        : (on ? "Replay these seven nights through the cat. First-loop flow doesn't change." : "Unlocked. Turn it on and a cat's read sits beside the customer.");
    }
    if (ui.catMemBtn) show(ui.catMemBtn, memOn);
    if (ui.clueBoardBtn) {
      const hasClue = loadClueProgress().clues.length > 0;
      show(ui.clueBoardBtn, hasClue);
    }
  }

  function loadUnlockedRoles() {
    const base = ["clerk"];
    try {
      const raw = localStorage.getItem(ROLE_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      if (Array.isArray(arr)) {
        arr.forEach((id) => {
          if (ROLE_META[id] && base.indexOf(id) < 0) base.push(id);
        });
      }
    } catch (_) {}
    return base;
  }

  function saveUnlockedRoles(arr) {
    try { localStorage.setItem(ROLE_KEY, JSON.stringify(arr)); } catch (_) {}
  }

  function getSelectedRole() {
    try {
      const r = localStorage.getItem(ROLE_SEL) || "clerk";
      if (loadUnlockedRoles().indexOf(r) >= 0) return r;
    } catch (_) {}
    return "clerk";
  }

  function setSelectedRole(role) {
    try { localStorage.setItem(ROLE_SEL, role || "clerk"); } catch (_) {}
  }

  function unlockRoleFromEnding(key) {
    const role = ENDING_UNLOCK_ROLE[key];
    if (!role) return null;
    const arr = loadUnlockedRoles();
    if (arr.indexOf(role) >= 0) return null;
    arr.push(role);
    saveUnlockedRoles(arr);
    return ROLE_META[role] || null;
  }

  function refreshRoleTitle() {
    const box = ui.titleRoles;
    if (!box) return;
    const unlocked = loadUnlockedRoles();
    const sel = getSelectedRole();
    box.innerHTML = "<p class='lede'>Role</p><div class='role-row'></div>";
    const row = box.querySelector(".role-row");
    ROLE_ORDER.forEach((id) => {
      const meta = ROLE_META[id];
      if (!meta) return;
      const on = unlocked.indexOf(id) >= 0;
      const b = document.createElement("button");
      b.type = "button";
      b.className = "ghost" + (on && sel === id ? " on" : "") + (on ? "" : " lock");
      b.textContent = on ? meta.name : meta.name + " (locked)";
      b.addEventListener("click", () => {
        if (!on) {
          sayToast(meta.hint);
          return;
        }
        setSelectedRole(id);
        refreshRoleTitle();
        sayToast(id === "clerk" ? "You take the night shift again." : "Next loop uses this role. Change role, change rules.");
      });
      row.appendChild(b);
    });
    const hint = document.createElement("p");
    hint.className = "lede";
    hint.textContent = unlocked.length <= 1
      ? "Clear different endings to unlock other shifts."
      : ("This loop: " + ((ROLE_META[sel] && ROLE_META[sel].name) || "Night clerk"));
    box.appendChild(hint);
  }

  function roleStockToast(role) {
    if (role === "cat") return "You don't stock. People stock.";
    if (role === "heng") return "You can't touch real money. You don't restock.";
    if (role === "xiaoya") return "You can only buy. The shelf isn't yours.";
    if (role === "wu") return "You don't watch stock. You check the roster.";
    return "This shift doesn't stock.";
  }

  function openRoleRules() {
    const pack = roleRules(state.role, state.night);
    const items = pack.rules.map((r) => `<li><b>${r.num}</b>${r.text}</li>`).join("");
    const banner = pack.banner ? `<div class="rules-banner"><em>Tonight's role</em>${pack.banner}</div>` : "";
    ui.rulesSheet.innerHTML = `
      <h2>Rules for ${(ROLE_META[state.role] && ROLE_META[state.role].name) || "Role"}</h2>
      <p class="lede">Change role, you get this set. Not the same paper as store rules.</p>
      ${banner}
      <ul class="rules">${items}</ul>
      <div class="actions"><button class="primary" id="rulesClose" type="button">Put away</button></div>
    `;
    ui.rulesSheet.querySelector("#rulesClose").addEventListener("click", () => show(ui.rulesSheet, false));
    show(ui.rulesSheet, true);
  }

  function showRolePrep(beat) {
    cancelType();
    hideAllOverlays();
    playableHud(true);
    show(ui.catBtn, true);
    hideCatEye();
    setScene(state.role === "wu" || state.role === "xiaoya" ? "exterior" : "interior");
    setPortrait(null);
    show(ui.dock, false);
    const meta = ROLE_META[state.role] || ROLE_META.clerk;
    const pack = roleRules(state.role, state.night);
    const startLabel = state.role === "cat" ? "Sit and watch" : state.role === "heng" ? "Keep waiting" : state.role === "xiaoya" ? "Walk into the rain" : "Start patrol";
    const extra = state.role === "heng"
      ? `<div class="stat"><b>${(state.flags.jossCash || 0)}</b><span>Joss</span></div>`
      : (state.role === "xiaoya"
        ? `<div class="stat"><b>¥${state.cash}</b><span>Pocket</span></div>`
        : `<div class="stat"><b>${state.cat}</b><span>${state.role === "cat" ? "You" : "Shop cat"}</span></div>`);
    ui.prep.innerHTML = `
      <div class="scroll-body">
        <h2>Night ${state.night} · ${meta.name}</h2>
        <p class="lede">${(beat.text || "").replace(/\n/g, "<br/>")}</p>
        <div class="stats">
          <div class="stat"><b>${state.sanity}</b><span>Sanity</span></div>
          ${extra}
          <div class="stat"><b>${state.night}/7</b><span>Nights</span></div>
        </div>
        <div class="rules-banner"><em>Rules</em>${pack.banner || ""}</div>
        <ul class="rules">${pack.rules.map((r) => `<li><b>${r.num}</b>${r.text}</li>`).join("")}</ul>
      </div>
      <div class="actions">
        <button class="primary" id="startShift" type="button">${startLabel}</button>
      </div>
    `;
    ui.prep.querySelector("#startShift").addEventListener("click", () => {
      show(ui.prep, false);
      playableHud(true);
      persist();
      nextBeat();
    });
    persist();
    show(ui.prep, true);
  }

  function roleSettleNote() {
    const notes = [];
    const add = (html) => { if (notes.length < 3) notes.push(`<div class="note">${html}</div>`); };
    if (state.role === "cat") {
      if (state.flags.catBlockedWet) add("You hissed at wet-hair.");
      if (state.flags.catLetWet && !state.flags.catBlockedWet) add("Wet-hair came in. Mat was dry.");
      if (state.flags.catJumped) add("You jumped into that counter spot too early.");
      if (state.flags.catNodOld) add("You nodded at the Zhongshan one.");
    } else if (state.role === "heng") {
      if (state.flags.hengTookReal) add("You touched real money. Hand still hot.");
      if (state.flags.hengTookJoss) add("Joss paper went in the box. Warm.");
      if (state.flags.hengFoundHeir) add("Keys got thrown.");
      if (state.flags.hengHid) add("Next shift didn't see your face.");
    } else if (state.role === "xiaoya") {
      if (state.flags.xyBoughtMilk) add("Milk bought. Plain.");
      if (state.flags.xyBehind) add("You stood behind the counter. Shouldn't.");
      if (state.flags.xyCrossed) add("You crossed that puddle. No home on the other side.");
      if (state.flags.xySent) add("He stopped at the door.");
    } else if (state.role === "wu") {
      if (state.flags.wuLetWet) add("You let someone not on the book in.");
      if (state.flags.wuBlockWet) add("Wet-hair, you didn't let in.");
      if (state.flags.wuOwnName) add("The book grew a line.");
      if (state.flags.wuFlash) add("Flashlight left. Person didn't.");
    }
    return notes.join("");
  }

  function showRoleSettle() {
    cancelType();
    hideAllOverlays();
    playableHud(false);
    setPortrait(null);
    setScene(state.role === "wu" ? "exterior" : "interior");
    if (state.night < 7) {
      state.sanity += 2;
      clamp(state);
    }
    if (state.role === "xiaoya") state.cash = 6;
    const more = state.night < 7;
    const meta = ROLE_META[state.role] || ROLE_META.clerk;
    ui.settle.innerHTML = `
      <h2>Dawn · Night ${state.night} · ${meta.name}</h2>
      <p class="lede">${more ? "Rain eased. This night's done." : "Seven nights done. Time to see what came after."}</p>
      <p class="lede">Sanity ${state.sanity}. Under 35 it slips; hit zero and this shift is gone.</p>
      ${roleSettleNote()}
      <div class="actions">
        <button class="primary" id="nextNight" type="button">${more ? "One more night" : "See afterward"}</button>
        <button class="ghost" id="retryNight" type="button">Restart tonight</button>
      </div>
    `;
    ui.settle.querySelector("#nextNight").addEventListener("click", () => {
      show(ui.settle, false);
      if (more) {
        state.night += 1;
        persist();
        runNight(state.night);
      } else finish(pickRoleEnding(state));
    });
    const retryBtn = ui.settle.querySelector("#retryNight");
    if (retryBtn) retryBtn.addEventListener("click", restartNight);
    persist();
    show(ui.settle, true);
  }

  function startGame(fromSave) {
    SFX.unlock();
    SFX.startAmbience();
    hideAllOverlays();
    if (fromSave) state = fromSave;
    else {
      state = roleState(getSelectedRole());
      persist();
    }
    if (state && !state.flags) state.flags = {};
    if (state && !state.role) state.role = "clerk";
    if (state && state.powerBill == null) state.powerBill = powerBillFor(state.night || 1);
    if (state && state.powerMissStreak == null) state.powerMissStreak = 0;
    if (state && state.nightMissLoss == null) state.nightMissLoss = 0;
    if (state && !fromSave) state.catView = isClerk(state) ? isCatViewOn() : false;
    if (state && state.catView == null) state.catView = false;
    if (state) mergeClueProgress(state);
    playableHud(true);
    clearDesk();
    refreshHud();
    setScene("interior");
    runNight(state.night);
  }

  function saveCheckpoint(n) {
    try {
      const role = (state && state.role) || "clerk";
      const key = (role && role !== "clerk") ? `hengdeng-cp-en-${role}-${n}` : CP(n);
      localStorage.setItem(key, JSON.stringify(state));
    } catch (_) {}
  }

  function loadCheckpoint(n, role) {
    try {
      const r = role || (state && state.role) || getSelectedRole() || "clerk";
      const key = (r && r !== "clerk") ? `hengdeng-cp-en-${r}-${n}` : CP(n);
      let raw = localStorage.getItem(key);
      if (!raw && r !== "clerk") raw = localStorage.getItem(CP(n));
      return raw ? JSON.parse(raw) : null;
    } catch (_) { return null; }
  }

  function restartNight() {
    if (!state) {
      sayToast("Shift hasn't started.");
      return;
    }
    const n = state.night;
    const cp = loadCheckpoint(n, state.role);
    if (!cp) {
      sayToast("No start-save for tonight yet.");
      return;
    }
    sayToast("Back to before tonight's stock.");
    startGame(cp);
  }

  function endingCatalog() {
    const rows = [];
    Object.keys(ENDINGS).forEach((k) => {
      rows.push({ key: k, title: ENDINGS[k].title, hint: "First loop" });
    });
    Object.keys(ROLE_ENDINGS).forEach((k) => {
      const ed = ROLE_ENDINGS[k];
      const meta = ROLE_META[ed.role] || {};
      rows.push({ key: k, title: ed.title, hint: (meta.name || "Role") + "CLUE" });
    });
    return rows;
  }

  function renderEndingGallery(seen) {
    const rows = endingCatalog();
    const got = rows.filter((r) => seen[r.key]).length;
    const chips = rows.map((r) => seen[r.key]
      ? `<span class="ending-chip on">${r.title}</span>`
      : `<span class="ending-chip lock">Not seen · ${r.hint}</span>`).join("");
    return `<p class="lede">Collected ${got} / ${rows.length}</p>` + chips;
  }

  function runNight(n) {
    cancelType();
    waitingTap = false;
    afterTap = null;
    choiceBeat = null;
    hideAllOverlays();
    clearDesk();
    hideCatEye();
    if (ui.flicker) {
      ui.flicker.classList.remove("on");
      ui.flicker.classList.remove("drain");
    }
    setPortrait(null);
    state.night = n;
    state.time = 21 * 60 + 50;
    state.nightEarn = state.cash;
    state.nightBuy = 0;
    state.nightSell = 0;
    state.nightMissLoss = 0;
    state.powerBill = isClerk(state) ? powerBillFor(n) : 0;
    if (state.role === "xiaoya") state.cash = 6;
    if (state.flags) state.flags.missedTonight = 0;
    if (state.flags) state.flags.cluesTonight = 0;
    if (n === 5) rollNight5Weather(state);
    state.lastSale = 0;
    state.lastSold = null;
    state.nightStartStock = Object.assign({}, state.stock);
    saveCheckpoint(n);
    queue = buildNight(n, state).filter(Boolean);
    persist();
    nextBeat();
  }

  function nextBeat() {
    clamp(state);
    refreshHud();
    if (state.sanity <= 0) return finish(isClerk(state) ? "void" : pickRoleEnding(state));
    if (!queue.length) return showSettle();
    const beat = queue.shift();
    runBeat(beat);
  }

  function runBeat(beat) {
    cancelType();
    choiceBeat = null;
    if (beat.time != null) state.time = beat.time;
    if (beat.door) SFX.chime();
    const uneasy = beat.portrait === "wet" || beat.portrait === "bai" || beat.portrait === "old" || beat.effect === "flicker";
    if (uneasy) {
      const kind = beat.portrait === "bai" ? "far" : (beat.effect === "flicker" && beat.portrait !== "wet" ? "near" : "mid");
      setTimeout(() => SFX.thunder(kind), beat.door ? 280 : 80);
    }
    const drainLamp = !!(state && state.flags && state.flags.lampUnstable);
    if (ui.flicker) ui.flicker.classList.toggle("drain", drainLamp);
    const shouldFlicker = beat.effect === "flicker" || (drainLamp && !beat.type && beat.time && (beat.time % 2 === 1));
    if (shouldFlicker) {
      ui.flicker.classList.remove("on");
      void ui.flicker.offsetWidth;
      ui.flicker.classList.add("on");
      if (state && !state.upgrades.light) {
        const san0 = state.sanity;
        state.sanity -= drainLamp ? (beat.effect === "flicker" ? 5 : 2) : 3;
        clamp(state);
        warnMeters(san0, state.rep);
      } else if (state && drainLamp && state.upgrades.light) {
        const san0 = state.sanity;
        state.sanity -= 1;
        clamp(state);
        warnMeters(san0, state.rep);
      }
    }
    refreshHud();

    if (beat.type === "prep") return showPrep(beat);
    if (beat.type === "phone") return showPhone(beat);
    if (beat.type === "ending") return finish(beat.key);

    hideAllOverlays();
    playableHud(true);
    setScene(beat.scene || "interior", { wrong: beat.wrong, rain: beat.rain });
    setPortrait(beat.portrait);
    ui.who.textContent = beat.name || "—";
    ui.tag.textContent = beat.tag || "";
    ui.choices.innerHTML = "";
    updateCatEye(beat);
    const sceneGot = grantBeatClues(state, beat);
    if (sceneGot.length) noteNewClues(sceneGot);
    const text = typeof beat.text === "function" ? beat.text(state) : beat.text;
    typeTo(text, () => renderChoices(beat));
    if (!beat.choices || !beat.choices.length) {
      waitingTap = true;
      afterTap = () => nextBeat();
      ui.tapHint.textContent = "Tap to continue";
    }
  }

  function visibleChoices(beat) {
    const list = (beat.choices || []).filter((c) => {
      if (c.showIf && !c.showIf(state)) return false;
      if (c.hideIf && c.hideIf(state)) return false;
      return true;
    });
    if (state && state.catView) {
      const extra = catBlockChoice(beat);
      if (extra && (!extra.showIf || extra.showIf(state)) && !list.some((c) => c.label === extra.label)) {
        list.push(extra);
      }
    }
    return list;
  }

  function renderChoices(beat) {
    choiceBeat = beat;
    ui.choices.innerHTML = "";
    const list = visibleChoices(beat);
    if (!list.length && beat.choices) {
      waitingTap = true;
      afterTap = () => nextBeat();
      ui.tapHint.textContent = "Tap to continue";
      return;
    }
    list.forEach((c) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice" + (c.catOpt ? " cat-opt" : "");
      const needTxt = c.need ? Object.entries(c.need).map(([k, n]) => `${ITEMS[k].name}×${n}`).join(", ") : "";
      const locked = c.need && !hasStock(state, c.need) && !c.look;
      btn.innerHTML = c.label + (needTxt && locked ? `<small>Out: ${needTxt} · they'll leave</small>` : "") + (c.catOpt ? "<small>Stepping in makes the cat pull away</small>" : "");
      if (locked) {
        btn.disabled = true;
        btn.style.opacity = 0.45;
      }
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        pickChoice(beat, c);
      });
      ui.choices.appendChild(btn);
    });
    if (isClerk(state) && state.night >= 2 && state.time >= 2 * 60 && state.time < 6 * 60 && !beat.noClose) {
      const close = document.createElement("button");
      close.type = "button";
      close.className = "choice";
      close.textContent = "Close early (kill the lamp and go)";
      close.addEventListener("click", (e) => {
        e.stopPropagation();
        state.closedEarly += 1;
        state.rep -= 12;
        sayToast("You killed the lamp. Alley went black.");
        queue = [];
        showSettle();
      });
      ui.choices.appendChild(close);
    }
    ui.tapHint.textContent = "";
  }

  function refreshLiveChoices() {
    if (!choiceBeat || typing) return;
    renderChoices(choiceBeat);
  }

  function pickChoice(beat, c) {
    if (c.look) {
      const extra = typeof c.look === "function" ? c.look(state) : c.look;
      state.flags["looked_" + (beat.name || "x")] = true;
      ui.choices.innerHTML = "";
      typeTo(extra, () => {
        beat.choices = c.afterLook || beat.choices.filter((x) => x !== c);
        renderChoices(beat);
      });
      return;
    }
    if (c.need && !hasStock(state, c.need)) {
      sayToast("Not enough stock to sell.");
      return;
    }
    const before = state.cash;
    const san0 = state.sanity;
    const rep0 = state.rep;
    const miss0 = (state.flags && state.flags.stockouts) || 0;
    if (c.do) c.do(state);
    const clueGot = grantBeatClues(state, null, [].concat(c.clues || [], c.clue ? [c.clue] : []));
    if (state.sanity < san0) {
      const lost = san0 - state.sanity;
      let keep = lost;
      if (state.upgrades.peach) keep *= 0.7;
      if (state.upgrades.light) keep *= 0.7;
      state.sanity = san0 - Math.max(1, Math.ceil(keep));
    }
    clamp(state);
    warnMeters(san0, rep0);
    if (state.cash > before) {
      SFX.register();
      showSlip(state.lastSold || c.need, state.cash - before);
      punchCash();
    } else if ((state.flags.stockouts || 0) > miss0) {
      sayToast("Customer left empty-handed. Standing dropped. Tonight's books get harder.");
    } else if (c.need) {
      showSlip(c.need, 0);
    }
    persist();
    refreshHud();
    if (typeof clueGot !== "undefined" && clueGot.length) noteNewClues(clueGot);
    const then = typeof c.then === "function" ? c.then(state) : c.then;
    choiceBeat = null;
    ui.choices.innerHTML = "";
    setPortrait(beat.portrait);
    if (then) {
      typeTo(then, () => {
        waitingTap = true;
        afterTap = () => nextBeat();
        ui.tapHint.textContent = "Tap to continue";
      });
    } else nextBeat();
  }

  function showPrep(beat) {
    if (state && !isClerk(state)) return showRolePrep(beat);
    cancelType();
    hideAllOverlays();
    playableHud(true);
    show(ui.catBtn, false);
    hideCatEye();
    setScene("interior");
    setPortrait(null);
    show(ui.dock, false);
    const el = ui.prep;
    const canUpgrade = state.night >= 2;
    const bill = state.powerBill != null ? state.powerBill : powerBillFor(state.night);
    const gap = bill - state.cash;
    const stockHint = state.night === 1
      ? "Shelf's almost empty. Auntie Lin wants milk and bread. Wang wants smokes. Don't restock, you don't open. Money you take tonight, keep for restock, leftover for gear tomorrow."
      : "You don't have to buy it all at once. During the shift, INV restocks too. Spare cash: cam, peachwood, tube, cat food.";
    const weatherHint = state.night === 5 && state.weather === "storm"
      ? "Storm tonight. Noodles will move fast. We never stocked umbrellas."
      : (state.night === 6 ? "Power-bill dunning hit. Tonight's floor doubled. You have to sell." : "");
    el.innerHTML = `
      <div class="scroll-body">
        <h2>Night ${state.night} · Stock</h2>
        <p class="lede">${(beat.text || "").replace(/\n/g, "<br/>")}</p>
        <div class="stats">
          <div class="stat"><b>¥${state.cash}</b><span>Cash</span></div>
          <div class="stat"><b>${state.sanity}</b><span>Sanity</span></div>
          <div class="stat"><b>${state.cat}</b><span>Shop cat</span></div>
        </div>
        <div class="bill-line${state.cash < bill ? " short" : ""}">Tonight's power floor <b>¥${bill}</b> · cash on hand <b>¥${state.cash}</b> · ${state.cash >= bill ? "Cash covers the floor. You still have to sell to clear the books." : "Short ¥" + gap + ". Tonight's sales have to cover it."}</div>
        ${weatherHint ? `<p class="bill-weather">${weatherHint}</p>` : ""}
        <p class="lede prep-hint">${stockHint}</p>
        <div class="ledger" id="prepLedger"></div>
        <h2 style="font-size:18px;margin-top:18px">Gear</h2>
        <p class="scroll-hint">Cam, peachwood, tube, cat food further down. You can scroll.</p>
        <div class="upgrades" id="prepUp"></div>
      </div>
      <div class="actions">
        <button class="primary" id="startShift" type="button">Start shift</button>
      </div>
    `;
    const ledger = el.querySelector("#prepLedger");
    Object.entries(ITEMS).forEach(([k, it]) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<b>${it.name}</b><span>Stock ${state.stock[k]} · cost ¥${it.cost}</span>`;
      const stpr = document.createElement("div");
      stpr.className = "stepper";
      const minus = document.createElement("button"); minus.type = "button"; minus.textContent = "−";
      const plus = document.createElement("button"); plus.type = "button"; plus.textContent = "+";
      plus.addEventListener("click", () => {
        if (state.cash < it.cost) return sayToast("Not enough cash.");
        state.cash -= it.cost;
        state.stock[k] += 1;
        state.nightBuy = (state.nightBuy || 0) + it.cost;
        refreshHud();
        showPrep(beat);
      });
      minus.addEventListener("click", () => {
        const floor = (state.nightStartStock && state.nightStartStock[k]) || 0;
        if (state.stock[k] <= floor) return;
        state.stock[k] -= 1;
        state.cash += it.cost;
        state.nightBuy = Math.max(0, (state.nightBuy || 0) - it.cost);
        refreshHud();
        showPrep(beat);
      });
      stpr.append(minus, plus);
      row.appendChild(stpr);
      ledger.appendChild(row);
    });
    const box = el.querySelector("#prepUp");
    Object.entries(UPGRADES).forEach(([k, up]) => {
      const b = document.createElement("button");
      b.type = "button";
      const locked = !canUpgrade && !state.upgrades[k];
      b.className = "upgrade" + (state.upgrades[k] ? " on" : "") + (locked ? " wait" : "");
      b.innerHTML = `<strong>${up.name}</strong>${up.desc}<em>${state.upgrades[k] ? "In place" : locked ? "Arrives tomorrow · ¥" + up.price : "¥" + up.price}</em>`;
      b.addEventListener("click", () => {
        if (state.upgrades[k]) return;
        if (!canUpgrade) return sayToast("Those arrive tomorrow. Sell tonight first.");
        if (state.cash < up.price) return sayToast("Not enough cash. Sell a few more tickets tonight.");
        state.cash -= up.price;
        state.upgrades[k] = true;
        if (k === "catfood") state.cat += 8;
        if (k === "peach") state.sanity += 3;
        refreshHud();
        showPrep(beat);
      });
      box.appendChild(b);
    });
    const prepGot = grantBeatClues(state, beat);
    if (prepGot.length) noteNewClues(prepGot);
    el.querySelector("#startShift").addEventListener("click", () => {
      persist();
      show(el, false);
      clearDesk();
      show(ui.dock, true);
      nextBeat();
    });
    show(el, true);
  }

  function showPhone(beat) {
    hideAllOverlays();
    playableHud(true);
    show(ui.dock, false);
    clearDesk();
    setScene("interior");
    setPortrait(null);
    SFX.sms();
    ui.phoneSheet.innerHTML = `
      <h2>Text</h2>
      <div class="sms"><div class="from">${beat.from}</div>${beat.text}</div>
      <div class="actions"><button class="primary" id="smsOk" type="button">Got it</button></div>
    `;
    const phoneGot = grantBeatClues(state, beat);
    if (phoneGot.length) noteNewClues(phoneGot);
    ui.phoneSheet.querySelector("#smsOk").addEventListener("click", () => {
      show(ui.phoneSheet, false);
      nextBeat();
    });
    show(ui.phoneSheet, true);
  }

  function showSettle() {
    if (state && !isClerk(state)) return showRoleSettle();
    cancelType();
    hideAllOverlays();
    playableHud(false);
    setPortrait(null);
    setScene("interior");
    const sold = state.nightSell || 0;
    const bought = state.nightBuy || 0;
    const earn = sold - bought;
    const bill = state.powerBill != null ? state.powerBill : powerBillFor(state.night);
    const turn = nightTurnover(state);
    const met = applyPowerBill(state);
    if (state.night < 7) {
      let rest = met ? 4 : 1;
      if (state.upgrades.peach) rest += 2;
      if (state.upgrades.light) rest += 3;
      if (!met) rest = Math.min(rest, 2);
      state.sanity += rest;
    }
    clamp(state);
    if (state.catView) state.flags.catMemJustGot = grantCatMemory(state.night);
    else state.flags.catMemJustGot = false;
    if (state.catView && state.night === 7) grantClue(state, "catIsJudge");
    const more = state.night < 7;
    const left = Object.values(state.stock).reduce((a, b) => a + b, 0);
    const pct = bill > 0 ? Math.max(0, Math.min(100, Math.round(turn / bill * 100))) : 100;
    ui.settle.innerHTML = `
      <h2>Dawn settle · Night ${state.night}</h2>
      <p class="lede">${met ? "Rain eased. Lamp held till dawn. Drawer shut." : "Rain eased. Lamp flickered more than once. Drawer shut."}</p>
      <div class="stats">
        <div class="stat"><b>−¥${bought}</b><span>Stock in</span></div>
        <div class="stat"><b>+¥${sold}</b><span>Sold</span></div>
        <div class="stat"><b>${earn >= 0 ? "+" : ""}¥${earn}</b><span>Tonight</span></div>
      </div>
      <div class="bill-line${met ? "" : " short"}">Take <b>¥${turn}</b> · power floor <b>¥${bill}</b> · ${met ? "Covered. Lamp steady." : "Short. Lamp starting to slip."}</div>
      <div class="bill-meter${met ? "" : " miss"}"><i style="width:${pct}%"></i></div>
      <p class="lede">Cash ¥${state.cash} · ${left} left on the shelf · standing ${state.rep}</p>
      <p class="lede">Sanity ${state.sanity}. Under 35 it slips; hit zero and you become a customer buying things.</p>
      <p class="lede">${more ? "Keep leftover for restock, or gear tomorrow: cam, peachwood, tube, cat food." : (state.flags.leftCash ? "Money left for the next shift. Pockets empty." : "Till shut. You don't take much with you.")}</p>
      ${settleNotes().join("")}
      <div class="actions">
        <button class="primary" id="nextNight" type="button">${more ? "Sleep till evening" : "See afterward"}</button>
        <button class="ghost" id="retryNight" type="button">Restart tonight</button>
      </div>
    `;
    ui.settle.querySelector("#nextNight").addEventListener("click", () => {
      show(ui.settle, false);
      if (more) {
        state.night += 1;
        persist();
        runNight(state.night);
      } else finish(isClerk(state) ? pickEnding(state) : pickRoleEnding(state));
    });
    const retryBtn = ui.settle.querySelector("#retryNight");
    if (retryBtn) retryBtn.addEventListener("click", restartNight);
    persist();
    show(ui.settle, true);
  }

  function settleNotes() {
    const notes = [];
    const add = (html, good) => {
      if (notes.length >= 4) return;
      notes.push(`<div class="note${good ? " good" : ""}">${html}</div>`);
    };
    if (state.flags.soldJoss && !state.flags.returnedJoss) add("Till heavier than yesterday. You didn't dare count.");
    else if (state.flags.refusedJoss || state.flags.returnedJoss) add("The cat walked light today.", true);
    if (state.flags.powerFailedLast) add(state.flags.powerOut ? "Power bill missed again. Lamp keeps flickering like this, this shift won't hold." : "Tonight's take didn't cover power. Lamp starting to slip. Sanity drops faster.");
    else if (state.flags.powerMet) add("Power covered. Lamp held till dawn.", true);
    if (state.flags.missedTonight) add("Someone bought you out tonight. Regulars will come less. Help dries up. Empty slots draw the wrong people.");
    if (state.flags.gotFlashlight) add("Wu's flashlight is still in the drawer.", true);
    if (state.flags.gotRide) add("Wang said alley mouth, last night.", true);
    if (state.flags.catMemJustGot) add("The cat remembers tonight's smell. A memory loosened.", true);
    if (state.flags.cluesTonight) add("What you noted tonight sits in top-right CLUE.", true);
    if (state.flags.catAlienated) add("You blocked someone for it. Later it didn't sit as close.");
    if (state.closedEarly && state.night >= 2) add("You killed the lamp. Alley got darker.");
    if (state.sanity < 35) add("Sanity already under 35. Things start to drift. Hit zero and you walk out from behind the counter as a customer buying batteries.");
    else if (state.sanity < 36) add("Back of the head tight. Skip mirrors. Skip reflections.");
    else if (state.rep < 58) add("Standing's thin. Wang may not come in last night.");
    return notes;
  }

  function endingRecap(s) {
    const bits = [];
    if (s.flags.soldJoss && !s.flags.returnedJoss) bits.push("Red paper went in the till.");
    else if (s.flags.refusedJoss || s.flags.returnedJoss) bits.push("You didn't take the joss paper.");
    if (s.flags.helpedBai) bits.push("Rain wet her skirt.");
    else if (s.flags.followedBai) bits.push("You crossed the waterline.");
    if (s.flags.catTakesShop) bits.push("Keys are with the cat.");
    if (s.flags.closedLast) bits.push("Last night you killed the lamp.");
    return bits.slice(0, 3);
  }

  function loadSeen() {
    try {
      return JSON.parse(localStorage.getItem(SEEN) || "{}") || {};
    } catch (_) { return {}; }
  }

  function markSeen(key) {
    const seen = loadSeen();
    seen[key] = true;
    try { localStorage.setItem(SEEN, JSON.stringify(seen)); } catch (_) {}
    return seen;
  }

  function finish(key) {
    const ed = ROLE_ENDINGS[key] || ENDINGS[key] || ENDINGS.dawn;
    hideAllOverlays();
    playableHud(false);
    setPortrait(null);
    setScene(ed.scene || "exterior", { dawn: ed.dawn, wrong: ed.wrong });
    const recap = endingRecap(state);
    const seen = markSeen(key);
    const catalog = endingCatalog();
    const got = catalog.filter((r) => seen[r.key]).length;
    const unlockedNow = unlockRoleFromEnding(key);
    if (state && state.flags && unlockedNow) state.flags.justUnlockedRole = unlockedNow.name;
    ui.ending.innerHTML = `
      <div class="ending-card">
        <div class="kind">${ed.kind}</div>
        <h2>${ed.title}</h2>
        ${(typeof ed.body === "function" ? ed.body(state) : ed.body).map((p) => `<p>${p}</p>`).join("")}
        ${ed.after && ed.after.length ? `<div class="later"><div class="later-k">Afterward</div>${ed.after.map((p) => `<p>${p}</p>`).join("")}</div>` : ""}
        ${recap.length ? `<div class="note recap">${recap.join(" ")}</div>` : ""}
        <p class="lede">Collected ${got} / ${catalog.length}</p>
        ${state && state.catView ? `<p class="lede">The cat left you an old thing. Open Cat Memory from the title.</p>` : ""}
        ${state && state.flags && state.flags.justUnlockedRole ? `<p class="lede">New role unlocked: ${state.flags.justUnlockedRole}. Switch roles from the title.</p>` : ""}
        <div class="actions">
          <button class="primary" id="again" type="button">Another loop</button>
          <button class="ghost" id="toTitle" type="button">Back to title</button>
        </div>
      </div>
    `;
    ui.ending.querySelector("#again").addEventListener("click", () => {
      localStorage.removeItem(SAVE);
      startGame(null);
    });
    ui.ending.querySelector("#toTitle").addEventListener("click", () => {
      show(ui.ending, false);
      bootTitle();
    });
    try {
      localStorage.removeItem(SAVE);
      localStorage.setItem(CLEARED, "1");
      localStorage.setItem(CAT_VIEW_UNLOCK, "1");
      const newRole = unlockRoleFromEnding(key);
      if (state && state.flags && newRole) state.flags.justUnlockedRole = newRole.name;
      if (state && state.catView) {
        unlockAllCatMem();
        grantClue(state, "catKnowsOld");
        grantClue(state, "catIsJudge");
        saveClueProgress(state);
      }
    } catch (_) {}
    show(ui.ending, true);
  }

  function openStock() {
    if (state && !isClerk(state)) return sayToast(roleStockToast(state.role));
    ui.stockSheet.innerHTML = `
      <h2>Shelf</h2>
      <p class="lede">Sell out, regulars come less, standing drops, power gets harder. Empty shelves stand longer. You can restock one during the shift.</p>
      <div class="ledger" id="liveLedger"></div>
      <div class="actions"><button class="primary" id="stockClose" type="button">Close drawer</button></div>
    `;
    const ledger = ui.stockSheet.querySelector("#liveLedger");
    Object.entries(ITEMS).forEach(([k, it]) => {
      const row = document.createElement("div");
      row.className = "row";
      row.innerHTML = `<b>${it.name}</b><span>${it.desc} · sell ¥${it.price}</span><span>${state.stock[k]} left</span>`;
      const plus = document.createElement("button");
      plus.type = "button";
      plus.className = "mini";
      plus.textContent = `Restock ¥${it.cost}`;
      plus.addEventListener("click", () => {
        if (state.cash < it.cost) return sayToast("Not enough cash.");
        state.cash -= it.cost;
        state.stock[k] += 1;
        state.nightBuy = (state.nightBuy || 0) + it.cost;
        refreshHud();
        persist();
        sayToast(`Restocked ${it.name}. ${state.stock[k]} on the shelf now.`);
        openStock();
        refreshLiveChoices();
      });
      row.appendChild(plus);
      ledger.appendChild(row);
    });
    ui.stockSheet.querySelector("#stockClose").addEventListener("click", () => {
      show(ui.stockSheet, false);
      refreshLiveChoices();
    });
    show(ui.stockSheet, true);
  }

  function openRules() {
    if (state && !isClerk(state)) return openRoleRules();
    const pack = nightRules(state.night);
    const seen = !!state.foundRules;
    if (seen) {
      markRulesSeen(state);
      if (state.flags && (state.flags.sawInkDiff || state.flags.sawPencilNote)) grantClue(state, "rule2Added");
      persist();
    }
    const kept = state.flags.keptRules || defaultKeptRules();
    const judging = seen && pack.night >= 7;
    const banner = seen && pack.banner
      ? `<div class="rules-banner"><em>Tonight's drift</em>${pack.banner}</div>`
      : "";
    const items = pack.rules.map((r) => {
      const cls = [];
      if (seen && r.ink === "fresh") cls.push("ink-fresh");
      if (seen && r.mark === "tainted") cls.push("tainted");
      if (judging && kept[r.num] === false) cls.push("left-off");
      let notes = "";
      if (seen) {
        r.notes.forEach((n) => {
          if (n.kind === "pencil") notes += `<small class="pencil">${n.text}</small>`;
          if (n.kind === "taint" && !(judging && kept.fixFive)) notes += `<small class="taint">${n.text}</small>`;
        });
      }
      const keepBtns = judging
        ? `<div class="rules-keep"><button type="button" data-keep="${r.num}" class="${kept[r.num] !== false ? "on" : ""}">${kept[r.num] !== false ? "Keep" : "Drop"}</button></div>`
        : "";
      return `<li class="${cls.join(" ")}"><b>${r.num}</b>${seen ? r.text : "……"}${notes}${keepBtns}</li>`;
    }).join("");
    const sticky = pack.extra.find((e) => e.kind === "sticky");
    const verso = pack.extra.find((e) => e.kind === "verso");
    let extras = "";
    if (seen && sticky) {
      const off = judging && kept.sticky === false ? " left-off" : "";
      extras += `<div class="rules-sticky${off}"><b>Sticky note</b>${sticky.text}${judging ? `<div class="rules-keep"><button type="button" data-keep="sticky" class="${kept.sticky !== false ? "on" : ""}">${kept.sticky !== false ? "Keep" : "Drop"}</button></div>` : ""}</div>`;
    }
    if (seen && verso) {
      extras += `<div class="rules-verso"><b>${verso.title}</b>${verso.lines.map((ln) => `<div>${ln}</div>`).join("")}</div>`;
    }
    ui.rulesSheet.innerHTML = `
      <h2>Store rules</h2>
      <p class="lede">${seen ? "That greasy slip in the drawer." : "You remember a slip in the drawer. You haven't finished it."}</p>
      ${banner}
      <ul class="rules">${items}</ul>
      ${extras}
      <div class="actions"><button class="primary" id="rulesClose" type="button">Put away</button></div>
    `;
    ui.rulesSheet.querySelector("#rulesClose").addEventListener("click", () => show(ui.rulesSheet, false));
    ui.rulesSheet.querySelectorAll("[data-keep]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-keep");
        const bag = ensureKeptRules(state);
        bag[key] = bag[key] === false;
        state.flags.adjudicatedRules = true;
        persist();
        openRules();
      });
    });
    show(ui.rulesSheet, true);
  }

  function bootTitle() {
    hideAllOverlays();
    playableHud(false);
    setScene("exterior");
    setPortrait(null);
    const save = loadSave();
    show(ui.continueGame, !!save);
    const nights = $("titleNights");
    const book = $("titleEndings");
    const cleared = localStorage.getItem(CLEARED) === "1";
    refreshCatViewTitle();
    refreshRoleTitle();
    const seen = loadSeen();
    if (nights) {
      nights.hidden = !cleared;
      if (cleared) {
        nights.innerHTML = "<p class='lede'>After a clear, you can start from any night</p>";
        for (let i = 1; i <= 7; i++) {
          const b = document.createElement("button");
          b.type = "button";
          b.className = "ghost";
          b.textContent = `Night ${i}`;
          b.addEventListener("click", () => jumpNight(i));
          nights.appendChild(b);
        }
      }
    }
    if (book) {
      book.hidden = !cleared;
      if (cleared) book.innerHTML = renderEndingGallery(seen);
    }
    SFX.startAmbience();
    show(ui.title, true);
  }

  function jumpNight(n) {
    const role = getSelectedRole();
    const cp = loadCheckpoint(n, role);
    if (cp) {
      if (isClerk(cp) || !cp.role) cp.catView = isCatViewOn();
      startGame(cp);
      return;
    }
    if (role && role !== "clerk") {
      const s = roleState(role);
      s.night = n;
      startGame(s);
      return;
    }
    const s = newState();
    s.night = n;
    s.cash = 36 + n * 8;
    s.rep = 48 + n * 4;
    s.cat = 26 + n * 5;
    s.foundRules = n > 1;
    s.powerBill = powerBillFor(n);
    s.catView = isCatViewOn();
    startGame(s);
  }

  ui.newGame.addEventListener("click", () => {
    localStorage.removeItem(SAVE);
    startGame(null);
  });
  if (ui.catViewToggle) {
    ui.catViewToggle.addEventListener("click", () => {
      if (!isCatViewUnlocked()) {
        sayToast("Clear any ending before you can look with the cat's eyes.");
        return;
      }
      setCatViewOn(!isCatViewOn());
      refreshCatViewTitle();
      sayToast(isCatViewOn() ? "Cat View on. This loop gets a read." : "Cat View off. You're watching the shop yourself.");
    });
  }
  if (ui.catMemBtn) {
    ui.catMemBtn.addEventListener("click", openCatMem);
  }
  if (ui.clueBoardBtn) {
    ui.clueBoardBtn.addEventListener("click", () => { cluePick = []; openClueBoard(); });
  }
  if (ui.clueBtn) {
    ui.clueBtn.addEventListener("click", () => { cluePick = []; openClueBoard(); });
  }
  ui.continueGame.addEventListener("click", () => {
    const save = loadSave();
    if (save) startGame(save);
  });
  ui.stockBtn.addEventListener("click", openStock);
  ui.rulesBtn.addEventListener("click", () => {
    if (!state) return;
    if (ui.prep && !ui.prep.hidden) {
      sayToast("Available during the shift");
      return;
    }
    openRules();
  });
  if (ui.retryNightBtn) {
    ui.retryNightBtn.addEventListener("click", restartNight);
  }
  ui.catBtn.addEventListener("click", () => {
    if (!state) return;
    ui.catBtn.classList.toggle("warn", state.flags.soldJoss || state.sanity < 35);
    sayToast(catLine(state));
  });
  ui.muteBtn.addEventListener("click", () => {
    SFX.setMuted(!SFX.muted);
    ui.muteBtn.textContent = SFX.muted ? "✕" : "♪";
    if (!SFX.muted) SFX.startAmbience();
  });

  ui.screen = $("screen");
  const holdOn = () => {
    holding = true;
    if (typing && typePulse) {
      clearTimeout(typedTimer);
      typePulse();
    }
    if (waitingTap && afterTap) {
      clearTimeout(holdAdvanceTimer);
      holdAdvanceTimer = setTimeout(() => {
        if (!holding || !waitingTap || !afterTap) return;
        waitingTap = false;
        const fn = afterTap;
        afterTap = null;
        fn();
      }, 180);
    }
  };
  const holdOff = () => {
    holding = false;
    clearTimeout(holdAdvanceTimer);
  };
  $("screen").addEventListener("pointerdown", (e) => {
    if (!e.target.closest("button, a, input, .panel, .sheet, .title-actions, .cat-eye, .title-catview")) holdOn();
  });
  window.addEventListener("pointerup", holdOff);
  window.addEventListener("pointercancel", holdOff);
  window.addEventListener("keydown", (e) => {
    if (e.code === "Space") { e.preventDefault(); holdOn(); }
  });
  window.addEventListener("keyup", (e) => {
    if (e.code === "Space") holdOff();
  });

  $("screen").addEventListener("click", (e) => {
    if (e.target.closest("button, a, input, .panel, .sheet, .title-actions, .cat-eye, .title-catview")) {
      return;
    }
    if (skipType()) return;
    if (waitingTap && afterTap) {
      waitingTap = false;
      const fn = afterTap;
      afterTap = null;
      fn();
    }
  });

  if (new URLSearchParams(location.search).has("debug")) {
    show(ui.debug, true);
    ui.debug.addEventListener("click", (e) => {
      const k = e.target.dataset.skip;
      if (!state) return;
      if (k === "night") { queue = []; showSettle(); }
      if (k === "dawn") finish(isClerk(state) ? pickEnding(state) : pickRoleEnding(state));
    });
    window.__ns = { finish, pickEnding, pickRoleEnding, roleState, roleRules, getSelectedRole, loadUnlockedRoles, getState: () => state, runNight, startGame, catEyeFor, catBlockChoice, isCatViewOn, isCatViewUnlocked, grantClue, findClueLink, applyClueLink, openClueBoard, CLUES, CLUE_LINKS, TRUTHS, ROLE_META, ROLE_ENDINGS };
  }

  ui.scene.src = IMG.exterior;
  bootTitle();
})();