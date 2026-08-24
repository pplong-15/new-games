"use strict";
(function (root) {
  var D = root.LIANG_DATA;

  function newState() {
    return {
      night: 1,
      pending: null,
      listenSource: null,
      flags: [],
      dims: { wage: 4, mind: 4, rep: 4, mirror: 4 },
      settleSlip: { main: "", rec: "", note: "" },
      clockSunset: false,
      sunsetArmed: false,
      slipSubmitted: false,
      pocket: [],
      lastMessage: "",
      ending: null,
      wage: 0,
      entered: false,
      dayLog: [],
      dualHit: false,
      archive: [],
      openPaper: null,
      trustRed: false
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

  function persist() {
    try {
      if (root.localStorage) {
        root.localStorage.setItem("liang-state", JSON.stringify(state));
      }
    } catch (e) {}
  }

  function paperLabel(id) {
    return (D.PAPER[id] && D.PAPER[id].name) || id;
  }

  function bagLine(id) {
    return (D.PAPER[id] && D.PAPER[id].bag) || "";
  }

  function listenLabel(id) {
    return (D.PAPER[id] && D.PAPER[id].listen) || "";
  }

  function recFor(id) {
    return (D.PAPER[id] && D.PAPER[id].rec) || "";
  }

  function paperUnlocked(id) {
    var n = (D.UNLOCK_NIGHT && D.UNLOCK_NIGHT[id]) || 1;
    return state.night >= n;
  }

  function limitLine(id) {
    return (D.LIMITS && D.LIMITS[id]) || "";
  }

  function clampDim(v) {
    if (v < 0) return 0;
    if (v > 4) return 4;
    return v;
  }

  function lastListenRec() {
    var i;
    for (i = state.archive.length - 1; i >= 0; i--) {
      if (state.archive[i] && state.archive[i].listen) return state.archive[i];
    }
    return null;
  }

  function resetDayKeepArchive() {
    state.pending = null;
    state.listenSource = null;
    state.settleSlip = { main: "", rec: "", note: "" };
    state.clockSunset = false;
    state.sunsetArmed = false;
    state.slipSubmitted = false;
    state.pocket = [];
    state.dualHit = false;
    state.openPaper = null;
    state.trustRed = false;
  }

  function applyNight(n) {
    state.night = n;
    resetDayKeepArchive();
    if (n >= 2) grant("pencilLit");
    if (n >= 3) grant("redLit");
    if (n >= 4) grant("safeLit");
    if (n >= 5) grant("printTrace");
    if (n >= 6) grant("kouxinLit");
    if (n >= 7) grant("visitCheng");
  }

  function dimEndIfBroken() {
    if (state.dims.mind <= 0) {
      grant("dualHard");
      state.ending = "dual";
      state.wage = D.PAY_LATE;
      state.lastMessage = "神智空了。两份听过了头。《双听》。工钱 ¥0。";
      return "dual";
    }
    if (state.dims.wage <= 0) {
      grant("late");
      state.ending = "late";
      state.wage = D.PAY_LATE;
      state.lastMessage = "工钱格空了。空班叠满。《来不及》。工钱 ¥0。";
      return "late";
    }
    return null;
  }

  function rejectDual(a, b) {
    state.dualHit = true;
    grant("dualReject");
    state.dims.mind = clampDim(state.dims.mind - 1);
    state.lastMessage = "两份都听了。" + (a || "") + " 和 " + (b || "") + " 对不上。今天只能听一份。条退回。";
    state.pocket = [];
    state.pending = null;
    state.listenSource = null;
    state.settleSlip.main = "";
    state.settleSlip.rec = "";
    dimEndIfBroken();
    emit();
    persist();
    return { ok: false, dual: true };
  }

  function enter() {
    state.entered = true;
    state.lastMessage = "程匠头：日落前交本日听哪份。工钱按有效日。合同原件别动。宅主签字别替。";
    emit();
    persist();
    return true;
  }

  function clickPaper(id) {
    if (state.ending) return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "本日已交。点下一日。";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      state.lastMessage = "日落到了。缝里没有新条。";
      emit();
      return { ok: false };
    }
    if (id === "gossip") {
      state.lastMessage = "邻家挡光。闲话。不是听份。";
      emit();
      return { ok: true, pending: false };
    }
    if (id === "visit") {
      return answerVisit();
    }
    if ((id === "red" || id === "safe" || id === "pencil" || id === "jianli" || id === "kouxin") && !paperUnlocked(id)) {
      state.lastMessage = "这一格还没纸。";
      emit();
      return { ok: false };
    }
    if (id === "pencil") {
      grant("heardPencil");
      state.openPaper = "pencil";
      state.pending = "pencil";
      state.lastMessage = "上一班铅笔。老荀改过吉时，特例写成全周。不能当本日听份。" + (limitLine("pencil") ? " " + limitLine("pencil") : "");
      emit();
      persist();
      return { ok: true, pending: true, main: false };
    }
    if (id === "kouxin") {
      grant("heardKouxin");
      state.openPaper = "kouxin";
      state.pending = "kouxin";
      state.lastMessage = "方守成让人带话：停工令和红纸都要写上。主栏只有一格。" + (limitLine("kouxin") ? " " + limitLine("kouxin") : "");
      emit();
      persist();
      return { ok: true, pending: true, main: false };
    }
    if (!D.PAPER[id]) {
      state.lastMessage = "这一格还没纸。";
      emit();
      return { ok: false };
    }
    if (id === "jianli") grant("heardJianli");
    if (id === "red") grant("heardRed");
    if (id === "safe") grant("heardSafe");
    state.openPaper = id;
    var line = bagLine(id);
    var other = null;
    var i;
    for (i = 0; i < state.pocket.length; i++) {
      if (state.pocket[i] !== line) other = state.pocket[i];
    }
    if (other) {
      return rejectDual(other, line);
    }
    state.pending = id;
    if (state.pocket.indexOf(line) === -1) state.pocket.push(line);
    var lim = limitLine(id);
    state.lastMessage = "待听：" + line + "。还没写入主栏。" + (lim ? " " + lim : "");
    emit();
    persist();
    return { ok: true, pending: true, grouped: false };
  }

  function writeMain() {
    if (state.ending) return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "本日已交。";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      state.lastMessage = "日落后主栏锁定。";
      emit();
      return { ok: false };
    }
    if (!state.pending) {
      state.lastMessage = "先点一份文件进待听。";
      emit();
      return { ok: false, grouped: false };
    }
    if (state.pending === "pencil") {
      state.lastMessage = "老荀的铅笔不能当本日听份。主栏不收。";
      emit();
      persist();
      return { ok: false, pencil: true };
    }
    if (state.pending === "kouxin") {
      state.lastMessage = "口信要你两份都写。主栏只有一格。不收。";
      emit();
      persist();
      return { ok: false, kouxin: true };
    }
    if (state.pending === "gossip") {
      state.lastMessage = "闲话不是本日听份。";
      emit();
      return { ok: false };
    }
    var id = state.pending;
    if (!paperUnlocked(id)) {
      state.lastMessage = "这一格还没纸。";
      emit();
      return { ok: false };
    }
    if (state.settleSlip.main && state.listenSource && state.listenSource !== id) {
      return rejectDual(listenLabel(state.listenSource), listenLabel(id));
    }
    state.listenSource = id;
    state.settleSlip.main = listenLabel(id);
    state.settleSlip.rec = recFor(id);
    if (id === "jianli") grant("wroteJianli");
    if (id === "red") grant("wroteRed");
    if (id === "safe") grant("wroteSafe");
    state.lastMessage = "主栏一格写了：" + state.settleSlip.main + "。日落前交。";
    emit();
    persist();
    return { ok: true, written: true, grouped: false };
  }

  function canGroup() {
    if (state.ending) return false;
    if (state.clockSunset && !state.slipSubmitted) return false;
    if (!state.slipSubmitted) return false;
    if (!state.listenSource) return false;
    if (state.listenSource === "pencil") return false;
    if (!state.settleSlip.main) return false;
    return true;
  }

  function applyListenDims(id) {
    if (id === "red") state.dims.rep = clampDim(state.dims.rep - 1);
    if (id === "safe") state.dims.mirror = clampDim(state.dims.mirror - 1);
  }

  function markListenFlags() {
    var id = state.listenSource;
    if (id === "jianli") {
      grant("listenJianli");
      grant("recJiLiang");
    }
    if (id === "red") {
      grant("listenRed");
      grant("recShengLiang");
      if (state.trustRed) grant("trustRedAll");
    }
    if (id === "safe") {
      grant("listenSafe");
      grant("recQingChang");
    }
    applyListenDims(id);
    state.archive.push({
      night: state.night,
      listen: state.listenSource,
      rec: state.settleSlip.rec,
      trust: !!state.trustRed
    });
    state.dayLog.push(state.night);
  }

  function resolveEnding() {
    if (state.dims.mind <= 0) return "dual";
    if (state.dims.wage <= 0 && !hasFlag("validDay")) return "late";
    if (hasFlag("late") && !hasFlag("validDay")) return "late";
    if (hasFlag("emptyDay") && !hasFlag("validDay")) return "late";
    if (hasFlag("dualHard")) return "dual";
    var last = lastListenRec();
    if (state.night >= 7 && (!last || last.night !== 7)) return "late";
    if (state.night >= 7 && !hasFlag("visitAnswered")) return "late";
    if (last && last.listen === "red" && last.trust) return "trust-red";
    if (last && last.listen === "jianli") return "ji";
    if (last && last.listen === "red") return "sheng";
    if (last && last.listen === "safe") return "qing";
    return "late";
  }

  function answerVisit() {
    if (state.ending) return { ok: false };
    if (state.night < 7) {
      state.lastMessage = "程匠头这日还没来。";
      emit();
      return { ok: false };
    }
    grant("visitCheng");
    grant("visitAnswered");
    if (state.listenSource) {
      state.lastMessage = "程匠头问今日听哪份。你应了：" + bagLine(state.listenSource) + "。";
    } else {
      state.lastMessage = "程匠头问今日听哪份。你点了头。主栏还空，写入后再交。";
    }
    emit();
    persist();
    return { ok: true, visit: true };
  }

  function submitSlip() {
    if (state.ending && state.ending !== "late") return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "本日已交。";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      grant("late");
      state.dims.wage = clampDim(state.dims.wage - 1);
      state.ending = "late";
      state.wage = D.PAY_LATE;
      state.lastMessage = "日落到了。缝里没有条。来不及。工钱 ¥0。";
      emit();
      persist();
      return { ok: false, late: true };
    }
    if (state.dualHit && !state.listenSource) {
      grant("dualHard");
      state.slipSubmitted = true;
      state.ending = "dual";
      state.wage = D.PAY_LATE;
      state.lastMessage = "两份打回后仍硬交。不得当有效日。《双听》。工钱 ¥0。";
      emit();
      persist();
      return { ok: true, valid: false, dual: true };
    }
    if (state.night >= 7 && !hasFlag("visitAnswered")) {
      state.lastMessage = "程匠头回访。先应他今日听哪份，再交条。";
      emit();
      persist();
      return { ok: false, visit: true };
    }
    if (!state.settleSlip.main || !state.listenSource) {
      grant("emptyDay");
      state.slipSubmitted = true;
      state.wage = D.PAY_LATE;
      state.dims.wage = clampDim(state.dims.wage - 1);
      state.lastMessage = "主栏是空的。空条不能冒充有效日。本日必须交差。空班。工钱 ¥0。";
      if (!dimEndIfBroken() && state.night >= 7) {
        state.ending = resolveEnding();
      }
      emit();
      persist();
      return { ok: true, valid: false, empty: true, grouped: false };
    }
    if (state.listenSource === "pencil") {
      state.lastMessage = "老荀的铅笔不能当本日听份。";
      emit();
      return { ok: false };
    }
    markListenFlags();
    grant("validDay");
    state.slipSubmitted = true;
    state.wage = D.PAY_VALID;
    if (state.listenSource === "jianli") {
      state.lastMessage = "本日交差。听监理，记下寄梁。未报建不得升梁。有效日，工钱 ¥36。";
    } else if (state.listenSource === "red") {
      state.lastMessage = "本日交差。听东家吉时。吉时必须升，宅主须在场。记下升梁。有效日，工钱 ¥36。";
    } else {
      state.lastMessage = "本日交差。听安全单。外人离场，宅主被圈成外人。空场。有效日，工钱 ¥36。";
    }
    if (state.night >= 7) {
      state.ending = resolveEnding();
      if (state.ending === "ji") state.lastMessage += " 程匠头回访，记下寄梁。《寄梁》。";
      if (state.ending === "sheng") state.lastMessage += " 程匠头回访，记下升梁。《升梁》。";
      if (state.ending === "qing") state.lastMessage += " 程匠头回访，看见空场。《清场》。";
      if (state.ending === "trust-red") state.lastMessage += " 你把红纸当全真。《信红纸》。";
    }
    emit();
    persist();
    return { ok: true, valid: true, grouped: true };
  }

  function sunset() {
    if (state.ending && state.ending !== "late") return false;
    if (state.slipSubmitted) {
      state.clockSunset = true;
      state.sunsetArmed = false;
      state.lastMessage = "日落。本日已交。";
      emit();
      persist();
      return true;
    }
    if (!state.sunsetArmed) {
      state.sunsetArmed = true;
      state.lastMessage = "条还没交。日落后缝里没有条。再点一次「日落到了」，才记来不及。";
      emit();
      persist();
      return false;
    }
    state.clockSunset = true;
    grant("late");
    state.dims.wage = clampDim(state.dims.wage - 1);
    state.ending = "late";
    state.wage = D.PAY_LATE;
    state.lastMessage = "日落到了。缝里没有条。《来不及》。工钱 ¥0。";
    emit();
    persist();
    return true;
  }

  function nextNight() {
    if (state.ending) {
      state.lastMessage = "这班到头。刷新回标题。";
      emit();
      return false;
    }
    if (!state.slipSubmitted) {
      state.lastMessage = "当日还没交。日落前先交条，再点下一日。";
      emit();
      return false;
    }
    if (state.night >= 7) {
      state.ending = resolveEnding();
      state.lastMessage = "七日到头。";
      emit();
      return false;
    }
    applyNight(state.night + 1);
    state.lastMessage = "第" + state.night + "日。" + (D.NIGHT_LINE[state.night] || "") + " 当日交完再点下一日。";
    emit();
    persist();
    return true;
  }

  function setNight(n) {
    if (n < 1 || n > 7) return false;
    if (state.ending) return false;
    applyNight(n);
    emit();
    return true;
  }

  function touchBeam() {
    if (state.ending) return false;
    state.openPaper = "beam";
    if (state.listenSource === "jianli") {
      state.lastMessage = "窗外寄梁绳位。听监理才建议寄梁。别爬梁。";
    } else {
      state.lastMessage = "窗外寄梁绳位。影子比人先到。碰影子不交听份。";
    }
    emit();
    return true;
  }

  function pickCrack() {
    state.lastMessage = "夹缝里梁题草稿写错过一个旧宅主名。不是方守成。";
    emit();
    return true;
  }

  function markTrustRed() {
    if (state.night < 3) {
      state.lastMessage = "红纸这日还没亮。";
      emit();
      return false;
    }
    state.trustRed = true;
    grant("sawTrustRed");
    state.lastMessage = "你把红纸当全真。停工令日期还在。";
    emit();
    return true;
  }

  function refuseContract() {
    state.lastMessage = "不改合同原件。";
    emit();
    return false;
  }

  function refuseSign() {
    state.lastMessage = "不替宅主签字。";
    emit();
    return false;
  }

  function replay() {
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
    clickPaper: clickPaper,
    writeMain: writeMain,
    canGroup: canGroup,
    submitSlip: submitSlip,
    sunset: sunset,
    nextNight: nextNight,
    answerVisit: answerVisit,
    setNight: setNight,
    touchBeam: touchBeam,
    pickCrack: pickCrack,
    markTrustRed: markTrustRed,
    refuseContract: refuseContract,
    refuseSign: refuseSign,
    replay: replay,
    persist: persist,
    paperLabel: paperLabel,
    paperUnlocked: paperUnlocked,
    get state() { return state; }
  };

  root.LIANG_ENGINE = api;
})(typeof window !== "undefined" ? window : global);
