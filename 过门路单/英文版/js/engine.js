"use strict";
(function (root) {
  var D = root.GUOMEN_DATA;

  function newState() {
    return {
      saveVersion: D.SAVE_VERSION,
      night: 1,
      waybill: { role: "xi", dest: D.DEST, guest: "Zhou Qiming", vague: false },
      pocket: { tokens: [] },
      pairMark: [],
      pressSource: null,
      flags: [],
      dims: { oil: 4, mind: 4, rep: 4, mirror: 4 },
      keyHanded: false,
      clock: D.CLOCK_MAX,
      radio: { omen: "bridge" },
      sawedSill: false,
      wage: 0,
      ending: null,
      entered: false,
      holding: false,
      selected: [],
      pressPick: null,
      lastMessage: "",
      roleLocked: false,
      lookedNight: false
    };
  }

  var state = newState();
  var holdTimer = null;
  var uiHook = null;

  function setUi(fn) { uiHook = fn; }
  function emit() { if (uiHook) uiHook(state); }

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function hasFlag(id) {
    return state.flags.indexOf(id) !== -1;
  }

  function grant(id) {
    if (!hasFlag(id)) state.flags.push(id);
  }

  function bumpMind() {
    if (state.dims.mind > 0) state.dims.mind -= 1;
    else state.clock = Math.max(0, state.clock - 12);
  }

  function bumpOil() {
    if (state.dims.oil > 0) state.dims.oil -= 1;
  }

  function bumpRep() {
    if (state.dims.rep > 0) state.dims.rep -= 1;
  }

  function bumpMirror() {
    if (state.dims.mirror > 0) state.dims.mirror -= 1;
  }

  function persistable() {
    var s = snapshot();
    s.holding = false;
    s.saveVersion = D.SAVE_VERSION;
    return s;
  }

  function persist() {
    try {
      if (root.localStorage) {
        root.localStorage.setItem(D.SAVE_KEY, JSON.stringify(persistable()));
      }
    } catch (e) {}
  }

  function wipeSave() {
    try {
      if (root.localStorage) root.localStorage.removeItem(D.SAVE_KEY);
    } catch (e) {}
  }

  function hydrate() {
    try {
      if (!root.localStorage) return false;
      var raw = root.localStorage.getItem(D.SAVE_KEY);
      if (!raw) return false;
      var s = JSON.parse(raw);
      if (!s || typeof s !== "object") return false;
      if (s.saveVersion && s.saveVersion !== D.SAVE_VERSION) return false;
      var base = newState();
      var k;
      for (k in base) {
        if (!Object.prototype.hasOwnProperty.call(base, k)) continue;
        if (k === "holding") continue;
        if (Object.prototype.hasOwnProperty.call(s, k)) base[k] = s[k];
      }
      if (!base.dims || typeof base.dims !== "object") {
        base.dims = { oil: 4, mind: 4, rep: 4, mirror: 4 };
      }
      ["oil", "mind", "rep", "mirror"].forEach(function (d) {
        if (typeof base.dims[d] !== "number") base.dims[d] = 4;
      });
      if (!base.waybill || typeof base.waybill !== "object") {
        base.waybill = { role: "xi", dest: D.DEST, guest: "Zhou Qiming", vague: false };
      }
      if (!base.pocket || !Array.isArray(base.pocket.tokens)) {
        base.pocket = { tokens: [] };
      }
      if (!Array.isArray(base.pairMark)) base.pairMark = [];
      if (!Array.isArray(base.flags)) base.flags = [];
      if (!Array.isArray(base.selected)) base.selected = [];
      if (typeof base.clock !== "number" || base.clock < 0) base.clock = D.CLOCK_MAX;
      base.holding = false;
      base.saveVersion = D.SAVE_VERSION;
      state = base;
      return true;
    } catch (e) {
      return false;
    }
  }

  function clauseOpen(id) {
    var c = D.CLAUSES[id];
    if (!c) return false;
    return state.night >= c.night;
  }

  function pairIds(x, y) {
    return (x < y) ? x + "|" + y : y + "|" + x;
  }

  function isPair(id, left, right) {
    var p = D.PAIRS[id];
    if (!p) return false;
    return pairIds(left, right) === pairIds(p.a, p.b);
  }

  function hasPair(id) {
    var i;
    for (i = 0; i < state.pairMark.length; i++) {
      if (state.pairMark[i].id === id) return true;
    }
    return false;
  }

  function addToken(tok) {
    if (state.pocket.tokens.indexOf(tok) === -1) state.pocket.tokens.push(tok);
  }

  function needLookNow() {
    return D.NEED_LOOK_NIGHTS.indexOf(state.night) !== -1;
  }

  function blockLooks(verb) {
    if (!needLookNow() || state.lookedNight) return false;
    state.lastMessage = "Look in the rear glass first. That cut on the threshold edge hasn't been checked.";
    if (verb) state.lastMessage = "Look in the rear glass first.";
    emit();
    persist();
    return true;
  }

  function enter() {
    state.entered = true;
    emit();
    persist();
    return true;
  }

  function setNight(n) {
    if (n < 1 || n > 7) return false;
    state.night = n;
    state.clock = D.CLOCK_MAX;
    state.keyHanded = false;
    state.pressSource = null;
    state.pressPick = null;
    state.selected = [];
    state.holding = false;
    state.lastMessage = "";
    state.lookedNight = false;
    applyNightUnlock();
    emit();
    persist();
    return true;
  }

  function applyNightUnlock() {
    var n = state.night;
    var omens = { 1: "bridge", 2: "dont_idle", 3: "return", 4: "xi_sang", 5: "construction", 6: "laoshen", 7: "time_signal" };
    state.radio.omen = omens[n] || "bridge";
    if (n >= 2) grant("n2_layer");
    if (n >= 4) grant("n4_A_lit");
    if (n >= 5) grant("n5_B_lit");
    if (n === 7) {
      state.roleLocked = true;
      grant("n7_role_locked");
      if (state.waybill.role === "blank") {
        state.waybill.role = "xi";
        state.waybill.guest = "Zhou Qiming";
        state.waybill.vague = false;
      }
    }
  }

  function setRole(role) {
    if (state.ending) return false;
    if (state.roleLocked && state.night === 7) {
      state.lastMessage = "Identity column is locked. Night 7 will not change it.";
      emit();
      persist();
      return false;
    }
    if (role !== "xi" && role !== "sang" && role !== "blank") return false;
    state.waybill.role = role;
    state.waybill.vague = role === "blank";
    if (role === "xi") state.waybill.guest = "Zhou Qiming";
    if (role === "sang") state.waybill.guest = "Zhou Qiping";
    if (role === "blank") state.waybill.guest = "";
    emit();
    persist();
    return true;
  }

  function clickClause(id) {
    if (state.ending) return { ok: false };
    if (!clauseOpen(id)) {
      state.lastMessage = "This slot has no paper yet.";
      emit();
      persist();
      return { ok: false, judged: false };
    }
    var c = D.CLAUSES[id];
    addToken(c.token);
    if (id === "fleet-listen") grant("n1_heard_guest");
    if (id === "pencil-zishi") grant("n2_saw_pencil");
    if (id === "slip-sang" || id === "slip-xi") grant("n4_A_lit");
    if (id === "sms-night") grant("n5_B_lit");

    if (state.selected.indexOf(id) !== -1) {
      emit();
      persist();
      return { ok: true, judged: false };
    }
    state.selected.push(id);
    if (state.selected.length < 2) {
      state.lastMessage = "A pair holds. Hit the other paper.";
      emit();
      persist();
      return { ok: true, judged: false };
    }
    return judgePair(state.selected[0], state.selected[1]);
  }

  function judgePair(left, right) {
    var archive = state.flags.slice();
    var pairs = state.pairMark.slice();
    var pocket = state.pocket.tokens.slice();
    var judged = true;

    if (isPair("A", left, right) && state.night >= 4) {
      if (!hasPair("A")) state.pairMark.push({ id: "A", left: left, right: right });
      grant("n4_marked_A");
      state.lastMessage = "Ink bit this pair. Fleet page against the funeral slip.";
      state.selected = [];
      emit();
      persist();
      return { ok: true, judged: judged, pair: "A" };
    }
    if (isPair("B", left, right) && state.night >= 5) {
      if (!hasPair("B")) state.pairMark.push({ id: "B", left: left, right: right });
      grant("n5_marked_B");
      state.lastMessage = "Ink bit this pair. Gate SMS against the pencil.";
      state.selected = [];
      emit();
      persist();
      return { ok: true, judged: judged, pair: "B" };
    }

    var srcs = [D.CLAUSES[left].source, D.CLAUSES[right].source];
    var touchB = srcs.indexOf("gate_sms") !== -1 || srcs.indexOf("pencil") !== -1;
    var touchA = srcs.indexOf("fleet") !== -1 || srcs.indexOf("sang_slip") !== -1 || srcs.indexOf("xi_slip") !== -1;
    if (state.night >= 5 && touchB && !isPair("B", left, right)) {
      state.lastMessage = "Gate SMS only matches last shift's pencil. These two don't bite now.";
    } else if (state.night >= 4 && touchA) {
      state.lastMessage = "Hall door is still on the waybill. The fight is fleet page and process slips.";
    } else {
      state.lastMessage = "These two are not a fighting pair tonight.";
    }
    bumpMind();
    state.clock = Math.max(0, state.clock - 8);
    state.selected = [];
    if (state.flags.length < archive.length) state.flags = archive;
    if (state.pairMark.length < pairs.length) state.pairMark = pairs;
    state.pocket.tokens = pocket;
    emit();
    persist();
    return { ok: false, judged: true, revert: true };
  }

  function markWaste() {
    if (state.ending) return false;
    var archiveFlags = state.flags.slice();
    var archivePair = state.pairMark.slice();
    var archivePocket = state.pocket.tokens.slice();
    grant("n4_waste_paper");
    grant("n3_waste_paper_idea");
    state.lastMessage = "Hall door is still on the waybill. The fight is fleet page and process slips. The threshold did not leave the paper.";
    bumpMind();
    state.selected = [];
    archiveFlags.forEach(function (f) { grant(f); });
    state.pairMark = archivePair;
    state.pocket.tokens = archivePocket;
    emit();
    persist();
    return { ok: false, revert: true };
  }

  function holdStart() {
    if (state.ending) return false;
    if (blockLooks("hold")) {
      state.holding = false;
      return false;
    }
    if (state.waybill.role === "blank" || state.waybill.vague) {
      state.lastMessage = "Identity column not locked. This bill waits.";
      state.holding = false;
      emit();
      persist();
      return false;
    }
    if ((state.pressPick || "fleet") === "pencil" && state.dims.oil <= 0) {
      state.lastMessage = "Not enough oil to force it. The zishi cut won't go.";
      state.holding = false;
      emit();
      persist();
      return false;
    }
    state.holding = true;
    emit();
    if (holdTimer) clearTimeout(holdTimer);
    holdTimer = setTimeout(function () {
      holdTimer = null;
      holdComplete();
    }, D.HOLD_MS);
    return true;
  }

  function cancelHold() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    if (state.holding) {
      state.holding = false;
      emit();
    }
    return true;
  }

  function pickPress(src) {
    if (D.PRESS.indexOf(src) === -1) return false;
    if (src === "pencil" && state.night < 2) {
      state.lastMessage = "This slot has no paper yet. Pencil lights later.";
      emit();
      return false;
    }
    if ((src === "xi_slip" || src === "sang_slip") && state.night < 4) {
      state.lastMessage = "This slot has no paper yet. Process slips light later.";
      emit();
      return false;
    }
    if (src === "gate_sms" && state.night < 5) {
      state.lastMessage = "This slot has no paper yet. Gate SMS lights later.";
      emit();
      return false;
    }
    state.pressPick = src;
    emit();
    persist();
    return true;
  }

  function holdComplete() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    if (!state.holding) return false;
    state.holding = false;
    if (blockLooks("hold")) return false;
    if (state.waybill.role === "blank" || state.waybill.vague) {
      state.lastMessage = "Identity column not locked. This bill waits.";
      emit();
      persist();
      return false;
    }
    var src = state.pressPick || "fleet";
    if (src === "pencil" && state.dims.oil <= 0) {
      state.lastMessage = "Not enough oil to force it. The zishi cut won't go.";
      emit();
      persist();
      return false;
    }
    state.pressSource = src;
    if (src === "fleet") {
      grant("n1_fleet_as_truth");
      if (state.night >= 5) grant("n5_press_fleet");
    }
    if (src === "xi_slip") grant("n4_press_xi");
    if (src === "gate_sms" || src === "sang_slip") grant("n5_press_gate");
    if (src === "pencil") {
      grant("n5_press_pencil");
      if (!hasPair("B")) grant("n5_pencil_alltrue");
      bumpOil();
      bumpRep();
    }
    state.lastMessage = "Marked, then pressed. This bill hears this paper. Key still in the ignition.";
    emit();
    persist();
    return true;
  }

  function refuse(kind) {
    if (kind === "sms") state.lastMessage = "The Jin Gui Yuan gate SMS is not rewritten.";
    else if (kind === "xi-sign") state.lastMessage = "No stamp for Zhou Qiming.";
    else if (kind === "sang-sign") state.lastMessage = "No stamp for Zhou Qiping.";
    else if (kind === "ghost") state.lastMessage = "No such column on the waybill. Calling ghosts is mouth talk.";
    else state.lastMessage = "Permission does not reach approve.";
    emit();
    persist();
    return false;
  }

  function resolveEnding() {
    if (state.ending) return state.ending;
    if (!state.keyHanded && state.clock <= 0) {
      state.ending = "late";
      state.wage = D.PAY_LATE;
      state.lastMessage = D.DISPATCHER + ": hurry. Keys. zishi.";
      return state.ending;
    }
    if (!state.keyHanded) return null;
    var role = state.waybill.role;
    var press = state.pressSource;
    var a = hasPair("A") || hasFlag("n4_marked_A");
    var b = hasPair("B") || hasFlag("n5_marked_B");
    if (role === "xi" && a && press === "xi_slip") {
      state.ending = "xi-pass";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    if (role === "sang" && b && (press === "gate_sms" || press === "sang_slip")) {
      state.ending = "sang-stop";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    if (role === "sang" && press === "pencil" && b && !hasFlag("n5_pencil_alltrue")) {
      state.ending = "sang-go";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    if (press === "pencil" && (hasFlag("n5_pencil_alltrue") || hasFlag("n2_pencil_as_nightlong") || !b)) {
      state.ending = "trust-pencil";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    if (press === "fleet") {
      state.ending = "listen-guest";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    if (role === "sang" && press === "pencil") {
      state.ending = "sang-go";
      state.wage = D.PAY_VALID;
      return state.ending;
    }
    return null;
  }

  function handKey() {
    if (state.ending) return false;
    if (blockLooks("key")) return false;
    if (!state.pressSource) {
      state.lastMessage = D.DISPATCHER + ": mark, then press. Key still in the ignition.";
      emit();
      persist();
      return false;
    }
    state.keyHanded = true;
    if (state.clock <= 0) {
      resolveEnding();
      emit();
      persist();
      return true;
    }
    if (state.night < 7) {
      grant("n" + state.night + "_valid");
      state.night += 1;
      state.clock = D.CLOCK_MAX;
      state.keyHanded = false;
      state.pressSource = null;
      state.pressPick = null;
      state.selected = [];
      state.lookedNight = false;
      applyNightUnlock();
      state.lastMessage = D.DISPATCHER + ": this bill is noted. Hand the keys before the next night.";
      emit();
      persist();
      return true;
    }
    grant("n7_role_locked");
    var end = resolveEnding();
    if (!end) {
      state.ending = "listen-guest";
      state.wage = D.PAY_VALID;
    }
    emit();
    persist();
    return true;
  }

  function jumpClock() {
    state.clock = 0;
    if (!state.keyHanded && !state.ending) {
      resolveEnding();
    }
    emit();
    persist();
    return true;
  }

  function tickClock(n) {
    if (state.ending) return;
    if (state.keyHanded) return;
    state.clock -= n == null ? 1 : n;
    if (state.clock <= 0) {
      state.clock = 0;
      resolveEnding();
    }
    emit();
    persist();
  }

  function lookMirror() {
    if (state.ending) return false;
    if (state.lookedNight) {
      state.lastMessage = state.night >= 3
        ? "That cut on the threshold edge is still there. Return-visit car still at the gate."
        : "Rear glass still shows the hall threshold edge.";
      emit();
      persist();
      return true;
    }
    if (state.dims.mirror <= 0) {
      state.lastMessage = "Glass is fogged. Cloth is on the passenger seat. Not tonight.";
      emit();
      persist();
      return false;
    }
    state.lookedNight = true;
    if (needLookNow()) bumpMirror();
    if (state.night >= 3) {
      state.sawedSill = true;
      grant("n3_saw_sawed");
      state.lastMessage = "Threshold edge missing a cut. Return-visit car still at Jin Gui Yuan gate.";
    } else {
      state.lastMessage = "Rear glass: hall threshold edge. Lights still far.";
    }
    emit();
    persist();
    return true;
  }

  function noteOrder() {
    if (state.night < 6) return false;
    grant("n6_order_known");
    grant("n6_fleet_first_not_alltrue");
    grant("n6_reject_first_is_true");
    state.lastMessage = "Footer line: fleet printed first. Du Heng said on the radio, first print is not scripture.";
    emit();
    persist();
    return true;
  }

  function noteInk() {
    if (state.night < 3) return false;
    if (blockLooks("ink")) return false;
    grant("n3_ink_xi_slip");
    grant("n3_door_hardened");
    state.lastMessage = "What was changed is the door character on the joy slip. The ink matches that cut on the threshold edge.";
    emit();
    persist();
    return true;
  }

  function replay() {
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    wipeSave();
    state = newState();
    emit();
    return true;
  }

  function getState() { return state; }

  root.GUOMEN_ENGINE = {
    newState: newState,
    enter: enter,
    setNight: setNight,
    setRole: setRole,
    clickClause: clickClause,
    markWaste: markWaste,
    holdStart: holdStart,
    holdComplete: holdComplete,
    cancelHold: cancelHold,
    pickPress: pickPress,
    handKey: handKey,
    jumpClock: jumpClock,
    tickClock: tickClock,
    lookMirror: lookMirror,
    noteOrder: noteOrder,
    noteInk: noteInk,
    refuse: refuse,
    snapshot: snapshot,
    setUi: setUi,
    getState: getState,
    replay: replay,
    hydrate: hydrate,
    hasPair: hasPair,
    hasFlag: hasFlag
  };
})(typeof window !== "undefined" ? window : global);
