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
        root.localStorage.setItem("touqi-state", JSON.stringify(state));
      }
    } catch (e) {}
  }

  function clearPersist() {
    try {
      if (root.localStorage) root.localStorage.removeItem("touqi-state");
    } catch (e) {}
  }

  function loadPersist() {
    try {
      if (!root.localStorage) return false;
      var raw = root.localStorage.getItem("touqi-state");
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
      state.lastMessage = "格尽了。成组的这一单还能裁。";
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
    state.lastMessage = "天亮前没交钥匙。柯班那一叠变成催条。名单还夹在钩上。";
  }

  function enter() {
    state.entered = true;
    state.lastMessage = "柯班对讲里就一句：钥匙天亮前交。名单齐了才算班。";
    emit();
    persist();
    return true;
  }

  function clickFlow() {
    if (state.ending) return { ok: false };
    if (state.pocket.indexOf("听本期") === -1) state.pocket.push("听本期");
    grant("heardBenqi");
    state.lastMessage = "印发就两行。不接外人。本期那两个字他改过，墨还新。";
    emit();
    persist();
    return { ok: true };
  }

  function readOmen() {
    if (state.ending) return false;
    if (!needsOmen(state.night)) {
      state.lastMessage = "广播位空。本层未轮到征兆。";
      emit();
      return true;
    }
    state.omenRead = true;
    state.omenTonight = D.OMEN[state.night];
    state.lastMessage = "馆内广播：" + state.omenTonight;
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
      state.lastMessage = "这一格还没纸。";
      emit();
      return { ok: false, energy: state.energy };
    }
    state.openDoc = id;
    if (id === "pencil") grant("heardPencil");
    if (!state.current) {
      state.lastMessage = "人没到。纸能看，不成组。";
      emit();
      persist();
      return { ok: true, energy: state.energy, grouped: false };
    }
    var key = state.current + ":" + id;
    var already = state.checkedTonight.indexOf(key) !== -1;
    if (!already) {
      if (state.energy <= 0) {
        state.lastMessage = "格尽了。未成组的人走来不及。";
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
    var note = "对照过" + D.DOCS[id].name + "。";
    if (id === "pencil" && state.checkedTonight.join(",").indexOf(":flow") !== -1) {
      note = "流程写不接外人。铅笔写这一夜都放。这两张对着干。";
    } else if (id === "flow" && state.checkedTonight.join(",").indexOf(":pencil") !== -1) {
      note = "印发不接外人。铅笔要全放。我对着看过。";
    } else if (id === "fang") {
      note = "房份要一七孝男、六七出嫁女。流程只写本期。本期含不含六七，印发没写死。";
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
      state.lastMessage = "不成组不判。征兆和公文都要对过。";
      emit();
      return { ok: false, judged: false };
    }
    var id = state.current;
    setListed(id, admit);
    afterJudge(id, admit);
    var line = (admit ? "放进" : "拒之") + "：" + personName(id) + "。";
    if (id === "hs" && admit) line = "黄叔进了厅。灯底下那张脸我不敢多看。";
    if (id === "hs" && !admit) line = "黄叔没进。礼簿上没有他。";
    if (id === "wgx" && !admit) line = "桂香没进。房份单还压在抽屉里。";
    if (id === "wgx" && admit) line = "桂香进了。六七那一行我按房份裁的。";
    if (id === "extra" && admit) line = "门外那人进了。印发还写着不接外人。";
    if (id === "extra" && !admit) line = "外人不进。本期两个字我不敢放宽。";
    if (id === "wcs" && admit) line = "成山进了。礼簿上有他这一笔。";
    if (id === "wcs" && !admit) line = "成山没进。一七那一格空着。";
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
      state.lastMessage = "门缝黑了。走廊那一口看不清。";
      emit();
      persist();
      return false;
    }
    if (state.dims.mind <= 0) {
      state.lastMessage = "手不稳。门缝那一口我免了。";
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
    state.lastMessage = "门缝里有人念回魂冲煞。柯班上次直接骂：走廊那套别当流程。";
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
    state.lastMessage = "夹缝四七份子。墨淡。我还记得那一笔，问不问都能收下。";
    emit();
    persist();
    return true;
  }

  function refuseObit() {
    state.lastMessage = "讣告原文不改。亡者栏吴伯川，只读。";
    emit();
    persist();
    return false;
  }

  function refusePrint(who) {
    state.lastMessage = "手印不代按。" + who + "自己的指位空着。";
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
      state.lastMessage = "柯班：本班有效。钥匙已交。";
    } else if (state.ending === "partial") {
      state.lastMessage = "钥匙已交。名单未齐。不是《本期》。不是有效班。";
    } else {
      state.lastMessage = "钥匙已交。名单还在钩上。";
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
      state.lastMessage = "门外还有人。先裁这一单。";
      emit();
      return false;
    }
    if (state.night >= 7) {
      state.lastMessage = "七晚到头。交钥匙。";
      emit();
      return false;
    }
    applyNight(state.night + 1);
    state.lastMessage = "第" + state.night + "晚。门外空过就点下一晚。";
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
