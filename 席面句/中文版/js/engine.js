"use strict";
(function (root) {
  var D = root.XIMIAN_DATA;

  function wordById(id) {
    var i;
    for (i = 0; i < D.WORDS.length; i++) {
      if (D.WORDS[i].id === id) return D.WORDS[i];
    }
    return null;
  }

  function newState() {
    return {
      entered: false,
      bag: [],
      slots: { who: null, whom: null, did: null },
      submitted: false,
      lastVerdict: null,
      lastMessage: "",
      flash: false,
      wage: 0,
      clock: D.CLOCK_MAX,
      route: "att-xian",
      flags: {
        opened: ["att-xian", "desk"],
        dateOverlap: false,
        bannerHousehold: "xinren",
        managerNotOfficiant: false,
        optionalAlmanac: false,
        herringJiri: false,
        timeout: false,
        ending: null,
        pickedHcz: false,
        pickedHss: false,
        pickedTitle: false,
        pickedAnqi: false,
        whoLabel: false,
        approveTried: false
      },
      stillSrc: "jpeg/01-xian.jpg"
    };
  }

  var SAVE_KEY = "ximian-state";
  var state = newState();
  var uiHook = null;

  function setUi(fn) { uiHook = fn; }

  function persist() {
    try {
      if (typeof root.localStorage === "undefined") return;
      if (!state.entered) return;
      root.localStorage.setItem(SAVE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function clearPersist() {
    try {
      if (typeof root.localStorage !== "undefined") root.localStorage.removeItem(SAVE_KEY);
    } catch (e) {}
  }

  function loadPersist() {
    try {
      if (typeof root.localStorage === "undefined") return false;
      var raw = root.localStorage.getItem(SAVE_KEY);
      if (!raw) return false;
      var s = JSON.parse(raw);
      if (!s || !s.entered || !s.slots || !s.flags) return false;
      if (!s.flags.opened) s.flags.opened = ["att-xian", "desk"];
      if (!s.bag) s.bag = [];
      state = s;
      return true;
    } catch (e) {
      return false;
    }
  }

  function emit() {
    persist();
    if (uiHook) uiHook(state);
  }

  function snapshot() { return JSON.parse(JSON.stringify(state)); }

  function openRoute(id) {
    var p, i;
    for (i = 0; i < D.PAGES.length; i++) {
      if (D.PAGES[i].id === id) p = D.PAGES[i];
    }
    if (!p) return false;
    state.route = id;
    if (state.flags.opened.indexOf(id) === -1) state.flags.opened.push(id);
    if (id === "att-weiji") state.flags.dateOverlap = true;
    if (id === "att-hetong") state.flags.managerNotOfficiant = true;
    if (id === "att-lishu") state.flags.optionalAlmanac = true;
    if (id === "join" || id === "join-jiri") state.flags.herringJiri = true;
    emit();
    return true;
  }

  function pageOpened(id) {
    return state.flags.opened.indexOf(id) !== -1;
  }

  function pageShowsWord(pageId, wordId) {
    var i, p;
    for (i = 0; i < D.PAGES.length; i++) {
      if (D.PAGES[i].id === pageId) p = D.PAGES[i];
    }
    if (!p || !p.html) return false;
    return p.html.indexOf('data-word="' + wordId + '"') !== -1;
  }

  function canPick(id) {
    var w = wordById(id);
    if (!w) return false;
    if (state.flags.ending === "A" || state.flags.timeout) return false;
    if (pageOpened(w.source) || state.route === w.source) return true;
    if (pageShowsWord(state.route, id)) return true;
    if ((id === "w-hcz" || id === "w-lqt") && pageOpened("att-xian")) return true;
    return false;
  }

  function inBag(id) {
    return state.bag.indexOf(id) !== -1;
  }

  function pick(id) {
    if (!canPick(id)) return false;
    var w = wordById(id);
    if (inBag(id)) return true;
    state.bag.push(id);
    if (id === "w-hcz") {
      state.flags.pickedHcz = true;
      state.flags.whoLabel = true;
      state.stillSrc = "jpeg/02-who.jpg";
    }
    if (id === "w-hss") state.flags.pickedHss = true;
    if (id === "w-fuqin") state.flags.pickedTitle = true;
    if (id === "w-anqi" || id === "w-yuandang") state.flags.pickedAnqi = true;
    emit();
    return true;
  }

  function slotOccupiedByLockedOther(slot, id) {
    var cur = state.slots[slot];
    if (!cur || cur === id) return false;
    var w = wordById(cur);
    return !!(w && w.locked);
  }

  function fillSlot(slot, id) {
    if (slot !== "who" && slot !== "whom" && slot !== "did") return false;
    if (state.flags.ending === "A" || state.flags.timeout) return false;
    if (id === null || id === "") {
      state.slots[slot] = null;
      if (state.flags.ending !== "A" && !state.flags.timeout) {
        state.stillSrc = state.flags.pickedHcz ? "jpeg/02-who.jpg" : "jpeg/01-xian.jpg";
      }
      emit();
      return true;
    }
    if (!inBag(id)) return false;
    if (slotOccupiedByLockedOther(slot, id)) {
      state.lastMessage = "格子里那一个先拖回袋。";
      emit();
      return false;
    }
    var w = wordById(id);
    if (w && w.locked) {
      var other;
      if (slot === "who" && state.slots.whom === id) {
        /* same token can only sit one slot; move */
        state.slots.whom = null;
      }
      if (slot === "whom" && state.slots.who === id) {
        state.slots.who = null;
      }
    }
    state.slots[slot] = id;
    state.flash = false;
    if (threeFull() && state.flags.ending !== "A" && !state.flags.timeout) {
      state.stillSrc = "jpeg/06-ready.jpg";
    } else if (state.flags.ending !== "A" && !state.flags.timeout) {
      state.stillSrc = state.flags.pickedHcz ? "jpeg/02-who.jpg" : "jpeg/01-xian.jpg";
    }
    emit();
    return true;
  }

  function threeFull() {
    return !!(state.slots.who && state.slots.whom && state.slots.did);
  }

  function whomOk() {
    var id = state.slots.whom;
    if (id === "w-hss") return true;
    if (id === "w-fuqin") return pageOpened("att-weiji");
    return false;
  }

  function didOk() {
    var id = state.slots.did;
    return id === "w-yuandang" || id === "w-anqi";
  }

  function sentenceOk() {
    return state.slots.who === "w-hcz" && whomOk() && didOk();
  }

  function submit() {
    if (state.flags.ending === "A" || state.flags.timeout) return { ok: false, reason: "locked" };
    if (!threeFull()) {
      state.lastMessage = "不成组不判。";
      state.lastVerdict = null;
      state.flash = false;
      emit();
      return { ok: false, reason: "incomplete" };
    }
    state.submitted = true;
    if (sentenceOk()) {
      state.lastVerdict = "A";
      state.flags.ending = "A";
      state.wage = 36;
      state.lastMessage = "回传了。建议栏有句。工号不在签字栏。";
      state.stillSrc = "jpeg/08-receipt.jpg";
      openRoute("desk-receipt");
      emit();
      return { ok: true, ending: "A", wage: 36 };
    }
    state.lastVerdict = "B";
    state.lastMessage = "整句对不上。";
    state.flash = false;
    state.wage = 0;
    state.stillSrc = "jpeg/07-reject.jpg";
    openRoute("desk-reject");
    emit();
    return { ok: false, ending: "B", wage: 0, resubmit: true };
  }

  function tryApprove() {
    state.flags.approveTried = true;
    state.lastMessage = "权限只到建议。批不了开席。";
    emit();
    return false;
  }

  function tickClock(n) {
    if (!state.entered || state.flags.ending === "A" || state.flags.timeout) return state.clock;
    state.clock -= (n == null ? 1 : n);
    if (state.clock <= 0) {
      jumpClock(0);
    } else {
      emit();
    }
    return state.clock;
  }

  function jumpClock(n) {
    state.clock = n;
    if (n <= 0 && state.flags.ending !== "A") {
      state.flags.timeout = true;
      state.flags.ending = "B";
      state.lastVerdict = "B";
      state.wage = 0;
      state.lastMessage = "十八点。卡是空的。定金退。工钱 ¥0。";
      state.stillSrc = "jpeg/10-empty.jpg";
      state.route = "desk-empty";
      if (state.flags.opened.indexOf("desk-empty") === -1) state.flags.opened.push("desk-empty");
    }
    emit();
    return state.clock;
  }

  function enter() {
    state.entered = true;
    if (state.flags.opened.indexOf("att-xian") === -1) state.flags.opened.push("att-xian");
    state.route = "att-xian";
    emit();
    return true;
  }

  function replay() {
    clearPersist();
    state = newState();
    emit();
    return true;
  }

  function getState() { return state; }

  root.XIMIAN_ENGINE = {
    setUi: setUi,
    enter: enter,
    pick: pick,
    fillSlot: fillSlot,
    submit: submit,
    jumpClock: jumpClock,
    tickClock: tickClock,
    replay: replay,
    openRoute: openRoute,
    tryApprove: tryApprove,
    wordById: wordById,
    threeFull: threeFull,
    canPick: canPick,
    loadPersist: loadPersist,
    clearPersist: clearPersist,
    get state() { return state; },
    snapshot: snapshot
  };
})(typeof window !== "undefined" ? window : global);
