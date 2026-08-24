"use strict";
(function (root) {
  var D = root.TIDU_DATA;

  function emptyRows() {
    return {
      "slot-before-shu": { nameId: null, fateId: null },
      "slot-absent": { nameId: null, fateId: null },
      "slot-shu": { nameId: null, fateId: null }
    };
  }

  function newState() {
    return {
      staffId: D.STAFF_ID,
      clock: D.CLOCK_MAX,
      currentSlot: null,
      rows: emptyRows(),
      locked: false,
      submitCount: 0,
      endingId: null,
      endingVariant: null,
      flags: {
        "flag-seen-three-same-name": true,
        "flag-sms-tonight": true,
        "flag-seen-still": true
      },
      hintLevel: 0,
      wage: 0,
      saveVersion: D.SAVE_VERSION,
      holding: false,
      lastReject: null,
      sms: "今晚交抽查表。",
      formTone: "white",
      entered: false,
      lastDoc: null
    };
  }

  var state = newState();
  var holdTimer = null;
  var uiHook = null;
  var persistTimer = null;

  function setUi(fn) {
    uiHook = fn;
  }

  function persist() {
    if (typeof localStorage === "undefined") return;
    try {
      var snap = snapshot();
      snap.holding = false;
      localStorage.setItem(D.SAVE_KEY, JSON.stringify(snap));
    } catch (e) {}
  }

  function schedulePersist() {
    if (persistTimer) clearTimeout(persistTimer);
    persistTimer = setTimeout(function () {
      persistTimer = null;
      persist();
    }, 80);
  }

  function emit() {
    schedulePersist();
    if (uiHook) uiHook(state);
  }

  function grant(flag) {
    state.flags[flag] = true;
  }

  function isRowCorrect(slot) {
    var r = state.rows[slot];
    var t = D.TRUTH[slot];
    return r && t && r.nameId === t.nameId && r.fateId === t.fateId;
  }

  function isGroupCorrect() {
    var slots = ["slot-before-shu", "slot-absent", "slot-shu"];
    var i;
    var names = {};
    for (i = 0; i < slots.length; i++) {
      if (!isRowCorrect(slots[i])) return false;
      names[state.rows[slots[i]].nameId] = 1;
    }
    return Object.keys(names).length === 3;
  }

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function selectSlot(slotId, silent) {
    if (state.locked || state.endingId) return false;
    var ok = slotId === "slot-before-shu" || slotId === "slot-absent" || slotId === "slot-shu";
    if (!ok) return false;
    state.currentSlot = slotId;
    if (slotId === "slot-absent") grant("flag-seen-absent-card");
    if (!silent) emit();
    return true;
  }

  function fillName(nameId) {
    if (state.locked || state.endingId) return false;
    if (!state.currentSlot) {
      state.lastReject = "no-slot";
      emit();
      return false;
    }
    if (!nameId) {
      state.rows[state.currentSlot].nameId = null;
      state.lastReject = null;
      emit();
      return true;
    }
    if (nameId === "jing-che") {
      state.lastReject = "cannot-name-faname";
      emit();
      return false;
    }
    if (nameId === "shi-kuanning") {
      state.lastReject = "cannot-name-abbot";
      emit();
      return false;
    }
    if (nameId === "court" || nameId === "court-tidu") {
      state.lastReject = "court-not-in-group";
      emit();
      return false;
    }
    if (!D.LEGAL_NAMES[nameId]) {
      state.lastReject = "illegal-name";
      emit();
      return false;
    }
    state.rows[state.currentSlot].nameId = nameId;
    state.lastReject = null;
    emit();
    return true;
  }

  function fillFate(fateId) {
    if (state.locked || state.endingId) return false;
    if (!state.currentSlot) {
      state.lastReject = "no-slot";
      emit();
      return false;
    }
    if (!fateId) {
      state.rows[state.currentSlot].fateId = null;
      state.lastReject = null;
      emit();
      return true;
    }
    if (!D.LEGAL_FATES[fateId]) {
      state.lastReject = "illegal-fate";
      emit();
      return false;
    }
    state.rows[state.currentSlot].fateId = fateId;
    state.lastReject = null;
    emit();
    return true;
  }

  function fillNameFromDoc(docId) {
    if (docId === "doc-register") {
      state.lastReject = "cannot-name-abbot";
      emit();
      return false;
    }
    if (docId === "doc-note") {
      state.lastReject = "court-not-in-group";
      emit();
      return false;
    }
    var nid = D.DOC_FILL[docId];
    if (!nid) return false;
    return fillName(nid);
  }

  function maybeCompare() {
    if (state.flags["flag-read-hukou"] && state.flags["flag-read-dudie"]) {
      grant("flag-year-mismatch");
    }
    if (state.flags["flag-read-shu"] && state.flags["flag-read-register"]) {
      grant("flag-crease-match");
    }
    if (state.flags["flag-read-hukou"] && state.flags["flag-read-dudie"] && state.flags["flag-read-shu"]) {
      grant("flag-read-three-docs");
    }
  }

  function openDoc(docId) {
    var flags = D.DOC_FLAGS[docId];
    var i;
    if (flags) {
      for (i = 0; i < flags.length; i++) grant(flags[i]);
    }
    state.lastDoc = docId;
    maybeCompare();
    if (docId === "doc-register") {
      state.lastReject = "cannot-name-abbot";
    } else if (docId === "doc-note") {
      state.lastReject = "court-not-in-group";
    } else {
      state.lastReject = null;
    }
    emit();
    return true;
  }

  function markNear() {
    var slots = ["slot-before-shu", "slot-absent", "slot-shu"];
    var allAhai = true;
    var allLeft = true;
    var i;
    for (i = 0; i < slots.length; i++) {
      if (state.rows[slots[i]].nameId !== "zhou-ahai") allAhai = false;
      if (state.rows[slots[i]].fateId !== "fate-left-unreturned") allLeft = false;
    }
    if (allAhai || allLeft) grant("flag-merged-submit");
    if (state.rows["slot-before-shu"].nameId === "zhou-shigen") {
      grant("flag-near-shigen-front");
    }
    if (state.rows["slot-shu"].nameId === "zhou-ahai") {
      grant("flag-near-shu-is-ahai");
    }
  }

  function rowsMark() {
    var slots = ["slot-before-shu", "slot-absent", "slot-shu"];
    var i, r, anyRed;
    anyRed = false;
    for (i = 0; i < slots.length; i++) {
      r = state.rows[slots[i]];
      if (r && (r.rowTone === "red" || r.flash === "green")) anyRed = true;
    }
    return anyRed;
  }

  function onSubmit() {
    if (state.locked || state.endingId === "A" || state.endingId === "B") return false;
    state.submitCount += 1;
    state.holding = false;
    markNear();
    if (isGroupCorrect()) {
      state.locked = true;
      state.wage = D.PAY_AMOUNT_LOCKED;
      state.endingId = "A";
      state.endingVariant = state.flags["flag-merged-submit"]
        ? "after-merge"
        : state.flags["flag-wrong-submit"]
          ? "after-wrong"
          : "clean";
      state.formTone = "frost";
      state.sms = "锁定组已收。工钱到了。";
      grant("flag-locked");
      emit();
      return true;
    }
    state.locked = false;
    state.wage = 0;
    state.formTone = "white";
    state.sms = "表还是白的。不标哪一行。今晚仍要交。";
    grant("flag-wrong-submit");
    state.lastReject = "group-white";
    emit();
    return false;
  }

  function holdSubmit() {
    if (state.locked || state.endingId) return false;
    if (state.holding) return true;
    state.holding = true;
    state.lastReject = null;
    emit();
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = setTimeout(function () {
      holdTimer = null;
      holdComplete();
    }, D.HOLD_MS);
    return true;
  }

  function holdComplete() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    state.holding = false;
    return onSubmit();
  }

  function cancelHold() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    if (state.holding) {
      state.holding = false;
      state.lastReject = "hold-cancelled";
      emit();
    }
    return true;
  }

  function jumpClock() {
    state.clock = 0;
    if (!state.locked) {
      state.endingId = "B";
      state.endingVariant = "timeout";
      state.wage = 0;
      state.sms = "截点过了。表没锁。";
      grant("flag-timeout");
    }
    emit();
    return true;
  }

  function tickClock(n) {
    if (state.locked || state.endingId) return;
    state.clock -= n == null ? 1 : n;
    if (state.clock <= 0) jumpClock();
    else emit();
  }

  function enter() {
    state.entered = true;
    emit();
    return true;
  }

  function hearGossip() {
    grant("flag-heard-walk-gossip");
    state.lastReject = "gossip";
    emit();
    return true;
  }

  function clearSave() {
    if (typeof localStorage === "undefined") return;
    try { localStorage.removeItem(D.SAVE_KEY); } catch (e) {}
  }

  function loadSaved() {
    if (typeof localStorage === "undefined") return false;
    try {
      var raw = localStorage.getItem(D.SAVE_KEY);
      if (!raw) return false;
      var s = JSON.parse(raw);
      if (!s || s.saveVersion !== D.SAVE_VERSION) return false;
      if (!s.rows) return false;
      s.holding = false;
      s.lastReject = s.lastReject || null;
      state = s;
      return true;
    } catch (e) {
      return false;
    }
  }

  function replay() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    clearSave();
    state = newState();
    emit();
    return true;
  }

  function getState() {
    return state;
  }

  function endingCopy(st) {
    var s = st || state;
    if (s.endingId === "A") {
      var how;
      if (s.endingVariant === "after-merge" || s.flags["flag-merged-submit"]) {
        how = "头一回你把三行都写成同一个人，表没锁，也没标哪一行。后来才拆开。";
      } else if (s.flags["flag-wrong-submit"]) {
        how = "中间交过一次，表还是白的，哪一行都不标。这一次才锁上。";
      } else if (s.flags["flag-year-mismatch"]) {
        how = "户籍写八五年，度牒写六八年，不是一张生辰。三行这才对上。";
      } else {
        how = "三行对上了，表锁了。";
      }
      return [
        how,
        "三十六打进来了。晨班这张表大概不会再催。阿海的替度还挂着，你没权解，局里也没让你解。",
        "工号还是安民录临6。"
      ];
    }
    if (s.endingId === "B") {
      var why;
      if (s.endingVariant === "timeout" || s.flags["flag-timeout"]) {
        why = s.flags["flag-merged-submit"]
          ? "截点到了。你交过一回，三份还缠在同一个人身上，表没锁。"
          : s.submitCount
            ? "截点到了。交过，表还是白的，工钱零。"
            : "截点到了。三行还敞着，工钱零。";
      } else {
        why = "没锁上，不标对错。工钱零。";
      }
      return [
        why,
        "晨班会看见这张白表，三份上头还是周阿海。超度、解除你本来也批不了，今晚连锁定组都没交上。"
      ];
    }
    return [];
  }

  root.TIDU_ENGINE = {
    newState: newState,
    isRowCorrect: isRowCorrect,
    isGroupCorrect: isGroupCorrect,
    selectSlot: selectSlot,
    fillName: fillName,
    fillFate: fillFate,
    fillNameFromDoc: fillNameFromDoc,
    openDoc: openDoc,
    holdSubmit: holdSubmit,
    holdComplete: holdComplete,
    cancelHold: cancelHold,
    jumpClock: jumpClock,
    tickClock: tickClock,
    enter: enter,
    replay: replay,
    snapshot: snapshot,
    setUi: setUi,
    getState: getState,
    onSubmit: onSubmit,
    hearGossip: hearGossip,
    loadSaved: loadSaved,
    clearSave: clearSave,
    endingCopy: endingCopy,
    rowsMark: rowsMark,
    persist: persist
  };
})(typeof window !== "undefined" ? window : global);
