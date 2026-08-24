"use strict";
(function (root) {
  var D = root.TOUQI_DATA;

  function newState() {
    return {
      night: 1,
      energy: D.ENERGY[1],
      omenTonight: "",
      omenRead: true,
      admitList: [],
      denyList: [],
      queue: ["wcs"],
      revisitQueue: [],
      checkedTonight: [],
      flags: [],
      dims: { wage: 4, mind: 4, rep: 4, slit: 4 },
      keyHanded: false,
      current: "wcs",
      openDoc: null,
      lastMessage: "",
      ending: null,
      wage: 0,
      entered: false,
      pocket: [],
      optionalLedger: false,
      dimmed: {}
    };
  }

  var state = newState();
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

  function dropFlag(id) {
    var i = state.flags.indexOf(id);
    if (i !== -1) state.flags.splice(i, 1);
  }

  function persist() {
    try {
      if (root.localStorage) {
        root.localStorage.setItem("touqi-state-en", JSON.stringify(state));
      }
    } catch (e) {}
  }

  function clearPersist() {
    try {
      if (root.localStorage) root.localStorage.removeItem("touqi-state-en");
    } catch (e) {}
  }

  function loadPersist() {
    try {
      if (!root.localStorage) return false;
      var raw = root.localStorage.getItem("touqi-state-en");
      if (!raw) return false;
      var s = JSON.parse(raw);
      if (!s || !s.entered) return false;
      if (s.ending) {
        clearPersist();
        return false;
      }
      if (!s.dims) s.dims = { wage: 4, mind: 4, rep: 4, slit: 4 };
      if (!s.dimmed) s.dimmed = {};
      if (!s.flags) s.flags = [];
      if (!s.admitList) s.admitList = [];
      if (!s.denyList) s.denyList = [];
      if (!s.revisitQueue) s.revisitQueue = [];
      if (!s.checkedTonight) s.checkedTonight = [];
      if (!s.pocket) s.pocket = [];
      if (!s.queue) s.queue = [];
      state = s;
      return true;
    } catch (e) {
      return false;
    }
  }

  function personName(id) {
    return (D.PEOPLE[id] && D.PEOPLE[id].name) || id;
  }

  function needsOmen(n) {
    return n >= 3;
  }

  function alreadyListed(id) {
    return state.admitList.indexOf(id) !== -1 || state.denyList.indexOf(id) !== -1;
  }

  function rmArr(arr, id) {
    var i = arr.indexOf(id);
    if (i !== -1) arr.splice(i, 1);
  }

  function setListed(id, admitted) {
    if (admitted) {
      rmArr(state.denyList, id);
      if (state.admitList.indexOf(id) === -1) state.admitList.push(id);
    } else {
      rmArr(state.admitList, id);
      if (state.denyList.indexOf(id) === -1) state.denyList.push(id);
    }
  }

  function bump(dim, delta) {
    if (!state.dims[dim] && state.dims[dim] !== 0) return;
    state.dims[dim] += delta;
    if (state.dims[dim] < 0) state.dims[dim] = 0;
    if (state.dims[dim] > 6) state.dims[dim] = 6;
  }

  function applyNight(n) {
    state.night = n;
    state.energy = D.ENERGY[n] || 4;
    state.omenTonight = D.OMEN[n] || "";
    state.omenRead = !needsOmen(n);
    state.checkedTonight = [];
    state.keyHanded = false;
    state.openDoc = null;
    state.queue = (D.NIGHT_QUEUE[n] || []).slice();
    if (n !== 6) {
      state.queue = state.queue.filter(function (id) { return !alreadyListed(id); });
    }
    if (n === 6) {
      var i;
      for (i = 0; i < state.revisitQueue.length; i++) {
        if (state.queue.indexOf(state.revisitQueue[i]) === -1) {
          state.queue.push(state.revisitQueue[i]);
        }
      }
      if (state.revisitQueue.length) grant("hadRevisit");
    }
    state.current = state.queue.length ? state.queue[0] : null;
    if (n >= 2) grant("heardPencilReady");
  }

  function onEnergyZero() {
    if (state.keyHanded || state.ending) return;
    if (canDecide()) {
      state.lastMessage = "Cells are spent. This grouped bill can still be ruled.";
      return;
    }
    triggerLate();
  }

  function spend(n) {
    if (state.energy <= 0) return false;
    state.energy -= n;
    if (state.energy <= 0) {
      state.energy = 0;
      onEnergyZero();
    }
    return true;
  }

  function triggerLate() {
    grant("late");
    state.ending = "late";
    state.wage = D.PAY_LATE;
    bump("wage", -state.dims.wage);
    state.lastMessage = "Keys not handed before dawn. Foreman Ke's stack turned into a hurry slip. Name list still on the hook.";
  }

  function enter() {
    state.entered = true;
    state.lastMessage = "Foreman Ke on the radio, one line: keys before dawn. Complete list counts as a shift.";
    emit();
    persist();
    return true;
  }

  function clickFlow() {
    if (state.ending) return { ok: false };
    if (state.pocket.indexOf("Hearing this period") === -1) state.pocket.push("Hearing this period");
    grant("heardBenqi");
    state.lastMessage = "Print is two lines. No outsiders. He changed two characters on this period. Ink still wet.";
    emit();
    persist();
    return { ok: true };
  }

  function readOmen() {
    if (state.ending) return false;
    if (!needsOmen(state.night)) {
      state.lastMessage = "Broadcast slot empty. No omen on this layer.";
      emit();
      return true;
    }
    state.omenRead = true;
    state.omenTonight = D.OMEN[state.night];
    state.lastMessage = "Hall broadcast: " + state.omenTonight;
    emit();
    persist();
    return true;
  }

  function docOpen(night, id) {
    var d = D.DOCS[id];
    if (!d) return false;
    return night >= d.night;
  }

  function checkDoc(id) {
    if (state.ending) return { ok: false, energy: state.energy };
    if (!docOpen(state.night, id)) {
      state.lastMessage = "This slot has no paper yet.";
      emit();
      return { ok: false, energy: state.energy };
    }
    state.openDoc = id;
    if (id === "pencil") grant("heardPencil");
    if (!state.current) {
      state.lastMessage = "No one here. Paper can be read. Not a group.";
      emit();
      persist();
      return { ok: true, energy: state.energy, grouped: false };
    }
    var key = state.current + ":" + id;
    var already = state.checkedTonight.indexOf(key) !== -1;
    if (!already) {
      if (state.energy <= 0) {
        state.lastMessage = "Cells are spent. Ungrouped people will not make it.";
        onEnergyZero();
        emit();
        return { ok: false, energy: 0 };
      }
      spend(1);
      if (state.ending) {
        emit();
        persist();
        return { ok: false, energy: 0 };
      }
      state.checkedTonight.push(key);
      if (id === "ledger" && state.night === 3) grant("checkedLedgerFirst");
    }
    var note = "Checked against " + D.DOCS[id].name + ".";
    if (id === "pencil" && state.checkedTonight.join(",").indexOf(":flow") !== -1) {
      note = "Process writes no outsiders. Pencil writes let everyone in this night. The two pages fight.";
    } else if (id === "flow" && state.checkedTonight.join(",").indexOf(":pencil") !== -1) {
      note = "Print says no outsiders. Pencil wants all in. I checked them against each other.";
    } else if (id === "fang") {
      note = "Household share (fangfen) wants filial son on night 1, married-out daughter on night 6. Process only writes this period. Whether this period holds night 6, the print does not lock.";
    }
    state.lastMessage = note;
    emit();
    persist();
    return { ok: true, energy: state.energy, grouped: canDecide() };
  }

  function hasDocForCurrent() {
    if (!state.current) return false;
    var i;
    var prefix = state.current + ":";
    for (i = 0; i < state.checkedTonight.length; i++) {
      if (state.checkedTonight[i].indexOf(prefix) === 0) return true;
    }
    return false;
  }

  function canDecide() {
    if (state.ending) return false;
    if (!state.current) return false;
    if (needsOmen(state.night) && !state.omenRead) return false;
    return hasDocForCurrent();
  }

  function dimFirst(id) {
    if (state.dimmed[id]) return false;
    state.dimmed[id] = true;
    return true;
  }

  function afterJudge(id, admitted) {
    if (id === "wcs") {
      if (admitted) { grant("admitWcs"); dropFlag("denyWcs"); }
      else { grant("denyWcs"); dropFlag("admitWcs"); }
      if (dimFirst(id) && !admitted) {
        bump("wage", -1);
        bump("rep", -1);
      }
    }
    if (id === "wgx") {
      if (admitted) { grant("admitWgx"); dropFlag("denyWgx"); }
      else {
        grant("denyWgx");
        dropFlag("admitWgx");
        if (state.revisitQueue.indexOf("wgx") === -1) state.revisitQueue.push("wgx");
      }
      if (dimFirst(id) && !admitted) bump("rep", -1);
    }
    if (id === "hs") {
      if (admitted) {
        grant("admitHs");
        dropFlag("denyHs");
        if (state.revisitQueue.indexOf("hs") === -1) state.revisitQueue.push("hs");
      } else {
        grant("denyHs");
        dropFlag("admitHs");
      }
      if (dimFirst(id) && admitted) {
        bump("mind", -1);
        bump("wage", -1);
      }
    }
    if (id === "extra") {
      if (admitted) {
        grant("admitExtra");
        dropFlag("denyExtra");
      } else {
        grant("denyExtra");
        dropFlag("admitExtra");
      }
      if (dimFirst(id) && admitted) {
        bump("mind", -1);
        bump("wage", -1);
      }
    }
  }

  function advanceQueue() {
    if (state.current && state.queue.length && state.queue[0] === state.current) {
      state.queue.shift();
    } else if (state.current) {
      var ix = state.queue.indexOf(state.current);
      if (ix !== -1) state.queue.splice(ix, 1);
    }
    state.current = state.queue.length ? state.queue[0] : null;
    state.checkedTonight = [];
    state.openDoc = null;
  }

  function listed(id, admit) {
    var arr = admit ? state.admitList : state.denyList;
    return arr.indexOf(id) !== -1;
  }

  function judge(admit) {
    if (!canDecide()) {
      state.lastMessage = "No group, no ruling. Omen and paper both have to be checked.";
      emit();
      return { ok: false, judged: false };
    }
    var id = state.current;
    setListed(id, admit);
    afterJudge(id, admit);
    var line = (admit ? "Let in" : "Refuse") + ": " + personName(id) + ".";
    if (id === "hs" && admit) line = "Uncle Huang went in. Under the light I didn't look long at that face.";
    if (id === "hs" && !admit) line = "Uncle Huang stayed out. Gift ledger has no line for him.";
    if (id === "wgx" && !admit) line = "Guixiang stayed out. Household-share sheet still in the drawer.";
    if (id === "wgx" && admit) line = "Guixiang went in. Night 6 line I ruled by household share.";
    if (id === "extra" && admit) line = "The person at the door went in. Print still says no outsiders.";
    if (id === "extra" && !admit) line = "Outsider stays out. I won't widen those two characters on this period.";
    if (id === "wcs" && admit) line = "Chengshan went in. Gift ledger has his line.";
    if (id === "wcs" && !admit) line = "Chengshan stayed out. Night 1 cell is empty.";
    state.lastMessage = line;
    advanceQueue();
    if (state.energy <= 0 && !state.keyHanded && !canDecide()) {
      triggerLate();
    }
    emit();
    persist();
    return { ok: true, judged: true };
  }

  function admit() { return judge(true); }
  function deny() { return judge(false); }

  function arrive(id) {
    if (!D.PEOPLE[id]) return false;
    if (state.queue.indexOf(id) === -1) state.queue.push(id);
    if (!state.current) state.current = id;
    emit();
    persist();
    return true;
  }

  function slit() {
    if (state.ending) return false;
    if (state.dims.slit <= 0) {
      state.lastMessage = "Slit went dark. Can't see that mouth of corridor.";
      emit();
      persist();
      return false;
    }
    if (state.dims.mind <= 0) {
      state.lastMessage = "Hands unsteady. I'll skip the slit tonight.";
      emit();
      persist();
      return false;
    }
    if (state.energy <= 0) {
      onEnergyZero();
      emit();
      persist();
      return false;
    }
    spend(1);
    if (state.ending) {
      emit();
      persist();
      return false;
    }
    bump("slit", -1);
    grant("usedSlit");
    state.lastMessage = "Someone in the slit reciting returning-soul rusha. Last time Foreman Ke swore: corridor talk is not process.";
    emit();
    persist();
    return true;
  }

  function pickCrack() {
    if (state.ending) return false;
    state.optionalLedger = true;
    grant("crack");
    if (!state.dimmed.crack) {
      state.dimmed.crack = true;
      bump("wage", 1);
    }
    state.lastMessage = "Seam money, night 4 of the seven. Ink faint. I remember that line. Ask or don't, it can still be taken.";
    emit();
    persist();
    return true;
  }

  function refuseObit() {
    state.lastMessage = "Obituary text is not rewritten. Deceased line Wu Bochuan. Read only.";
    emit();
    persist();
    return false;
  }

  function refusePrint(who) {
    state.lastMessage = "No stamp by proxy. " + who + "'s finger-place is empty.";
    emit();
    persist();
    return false;
  }

  function resolveEnding() {
    if (hasFlag("late") && !state.keyHanded) return "late";
    var aWcs = listed("wcs", true);
    var aWgx = listed("wgx", true);
    var aHs = listed("hs", true);
    var aEx = listed("extra", true);
    var dHs = listed("hs", false);
    var dWgx = listed("wgx", false);
    if (aWcs && aWgx && dHs && !aHs && !aEx && hasFlag("keyOk")) return "benqi";
    if (!aWcs && !aWgx && !aHs && !aEx && state.denyList.length >= 2) return "deny-all";
    if (aHs || aEx) {
      if (aWcs && aWgx && aHs) return "admit-all";
      return "idle";
    }
    if (dWgx && !aWgx) return "deny-woman";
    return "partial";
  }

  function payFor(ending) {
    if (ending === "benqi") return D.PAY_VALID;
    if (ending === "late" || ending === "partial") return 0;
    var base = ending === "deny-all" ? 12 : 24;
    var n = base + (state.dims.wage - 4) * 3;
    if (n < 0) n = 0;
    return n;
  }

  function handKey() {
    if (state.ending && state.ending !== "late") return false;
    if (state.ending === "late") {
      emit();
      return false;
    }
    state.keyHanded = true;
    grant("keyOk");
    state.ending = resolveEnding();
    state.wage = payFor(state.ending);
    if (state.ending === "benqi") {
      state.lastMessage = "Foreman Ke: this shift is valid. Keys handed.";
    } else if (state.ending === "partial") {
      state.lastMessage = "Keys handed. List incomplete. Not This Period. Not a valid shift.";
    } else {
      state.lastMessage = "Keys handed. Name list still on the hook.";
    }
    emit();
    persist();
    return true;
  }

  function setNight(n) {
    if (n < 1 || n > 7) return false;
    if (state.ending) return false;
    applyNight(n);
    emit();
    persist();
    return true;
  }

  function nextNight() {
    if (state.ending) return false;
    if (state.current) {
      state.lastMessage = "Someone still at the door. Rule this bill first.";
      emit();
      return false;
    }
    if (state.night >= 7) {
      state.lastMessage = "Seven nights are up. Hand the keys.";
      emit();
      return false;
    }
    applyNight(state.night + 1);
    state.lastMessage = "Night " + state.night + ". Door went empty, hit next night.";
    emit();
    persist();
    return true;
  }

  function setEnergy(n) {
    state.energy = n;
    if (n <= 0) {
      state.energy = 0;
      onEnergyZero();
    }
    emit();
    persist();
    return state.energy;
  }

  function replay() {
    clearPersist();
    state = newState();
    emit();
    return true;
  }

  var api = {
    newState: newState,
    setUi: setUi,
    snapshot: snapshot,
    hasFlag: hasFlag,
    grant: grant,
    enter: enter,
    clickFlow: clickFlow,
    readOmen: readOmen,
    checkDoc: checkDoc,
    canDecide: canDecide,
    admit: admit,
    deny: deny,
    arrive: arrive,
    slit: slit,
    pickCrack: pickCrack,
    refuseObit: refuseObit,
    refusePrint: refusePrint,
    handKey: handKey,
    setNight: setNight,
    nextNight: nextNight,
    setEnergy: setEnergy,
    replay: replay,
    persist: persist,
    loadPersist: loadPersist,
    clearPersist: clearPersist,
    personName: personName,
    resolveEnding: resolveEnding,
    get state() { return state; }
  };

  root.TOUQI_ENGINE = api;
})(typeof window !== "undefined" ? window : global);
