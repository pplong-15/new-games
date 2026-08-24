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
        root.localStorage.setItem("liang-state-en", JSON.stringify(state));
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
      state.lastMessage = "Mind is empty. You heard two papers past the edge. Dual Hearing. Pay ¥0.";
      return "dual";
    }
    if (state.dims.wage <= 0) {
      grant("late");
      state.ending = "late";
      state.wage = D.PAY_LATE;
      state.lastMessage = "Pay cells are empty. Empty shifts stacked up. Too Late. Pay ¥0.";
      return "late";
    }
    return null;
  }

  function rejectDual(a, b) {
    state.dualHit = true;
    grant("dualReject");
    state.dims.mind = clampDim(state.dims.mind - 1);
    state.lastMessage = "Heard both. " + (a || "") + " and " + (b || "") + " do not match. One paper today. Slip sent back.";
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
    state.lastMessage = "Foreman Cheng: file which paper you heard today before sunset. Pay is by valid days. Leave the contract. Do not sign for the homeowner.";
    emit();
    persist();
    return true;
  }

  function clickPaper(id) {
    if (state.ending) return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "Filed for today. Take the next day.";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      state.lastMessage = "Sunset. No new slip in the slot.";
      emit();
      return { ok: false };
    }
    if (id === "gossip") {
      state.lastMessage = "Neighbors on the light. Chatter. Not a hearing.";
      emit();
      return { ok: true, pending: false };
    }
    if (id === "visit") {
      return answerVisit();
    }
    if ((id === "red" || id === "safe" || id === "pencil" || id === "jianli" || id === "kouxin") && !paperUnlocked(id)) {
      state.lastMessage = "No paper in this cell yet.";
      emit();
      return { ok: false };
    }
    if (id === "pencil") {
      grant("heardPencil");
      state.openPaper = "pencil";
      state.pending = "pencil";
      state.lastMessage = "Last shift’s pencil. Lao Xun changed the auspicious hour and wrote the exception as the whole week. It cannot be today’s hearing." + (limitLine("pencil") ? " " + limitLine("pencil") : "");
      emit();
      persist();
      return { ok: true, pending: true, main: false };
    }
    if (id === "kouxin") {
      grant("heardKouxin");
      state.openPaper = "kouxin";
      state.pending = "kouxin";
      state.lastMessage = "Fang Shoucheng sent word: write both the stop-work and the red paper. The main slot is one cell." + (limitLine("kouxin") ? " " + limitLine("kouxin") : "");
      emit();
      persist();
      return { ok: true, pending: true, main: false };
    }
    if (!D.PAPER[id]) {
      state.lastMessage = "No paper in this cell yet.";
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
    state.lastMessage = "On hold: " + line + ". Not written into the main cell yet." + (lim ? " " + lim : "");
    emit();
    persist();
    return { ok: true, pending: true, grouped: false };
  }

  function writeMain() {
    if (state.ending) return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "Already filed today.";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      state.lastMessage = "After sunset the main cell locks.";
      emit();
      return { ok: false };
    }
    if (!state.pending) {
      state.lastMessage = "Open a paper onto hold first.";
      emit();
      return { ok: false, grouped: false };
    }
    if (state.pending === "pencil") {
      state.lastMessage = "Lao Xun’s pencil cannot be today’s hearing. The main cell will not take it.";
      emit();
      persist();
      return { ok: false, pencil: true };
    }
    if (state.pending === "kouxin") {
      state.lastMessage = "The message wants both written. The main slot is one cell. It will not take it.";
      emit();
      persist();
      return { ok: false, kouxin: true };
    }
    if (state.pending === "gossip") {
      state.lastMessage = "Chatter is not today’s hearing.";
      emit();
      return { ok: false };
    }
    var id = state.pending;
    if (!paperUnlocked(id)) {
      state.lastMessage = "No paper in this cell yet.";
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
    state.lastMessage = "Main cell written: " + state.settleSlip.main + ". File before sunset.";
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
      state.lastMessage = "Foreman Cheng is not here today.";
      emit();
      return { ok: false };
    }
    grant("visitCheng");
    grant("visitAnswered");
    if (state.listenSource) {
      state.lastMessage = "Foreman Cheng asked which paper today. You answered: " + bagLine(state.listenSource) + ".";
    } else {
      state.lastMessage = "Foreman Cheng asked which paper today. You nodded. The main cell is still empty. Write it, then file.";
    }
    emit();
    persist();
    return { ok: true, visit: true };
  }

  function submitSlip() {
    if (state.ending && state.ending !== "late") return { ok: false };
    if (state.slipSubmitted) {
      state.lastMessage = "Already filed today.";
      emit();
      return { ok: false };
    }
    if (state.clockSunset) {
      grant("late");
      state.dims.wage = clampDim(state.dims.wage - 1);
      state.ending = "late";
      state.wage = D.PAY_LATE;
      state.lastMessage = "Sunset. No slip in the slot. Too late. Pay ¥0.";
      emit();
      persist();
      return { ok: false, late: true };
    }
    if (state.dualHit && !state.listenSource) {
      grant("dualHard");
      state.slipSubmitted = true;
      state.ending = "dual";
      state.wage = D.PAY_LATE;
      state.lastMessage = "Two papers bounced and you still forced the file. Not a valid day. Dual Hearing. Pay ¥0.";
      emit();
      persist();
      return { ok: true, valid: false, dual: true };
    }
    if (state.night >= 7 && !hasFlag("visitAnswered")) {
      state.lastMessage = "Foreman Cheng is back. Answer which paper you heard today, then file.";
      emit();
      persist();
      return { ok: false, visit: true };
    }
    if (!state.settleSlip.main || !state.listenSource) {
      grant("emptyDay");
      state.slipSubmitted = true;
      state.wage = D.PAY_LATE;
      state.dims.wage = clampDim(state.dims.wage - 1);
      state.lastMessage = "The main cell is empty. An empty slip is not a valid day. You still had to file. Empty shift. Pay ¥0.";
      if (!dimEndIfBroken() && state.night >= 7) {
        state.ending = resolveEnding();
      }
      emit();
      persist();
      return { ok: true, valid: false, empty: true, grouped: false };
    }
    if (state.listenSource === "pencil") {
      state.lastMessage = "Lao Xun’s pencil cannot be today’s hearing.";
      emit();
      return { ok: false };
    }
    markListenFlags();
    grant("validDay");
    state.slipSubmitted = true;
    state.wage = D.PAY_VALID;
    if (state.listenSource === "jianli") {
      state.lastMessage = "Filed. Heard the supervisor, noted send-the-beam (jiliang). Without filing, do not raise the beam. Valid day. Pay ¥36.";
    } else if (state.listenSource === "red") {
      state.lastMessage = "Filed. Heard the owner’s hour. Raise at the auspicious hour, homeowner present. Noted raise-the-beam (shengliang). Valid day. Pay ¥36.";
    } else {
      state.lastMessage = "Filed. Heard the safety slip. Outsiders off the yard, homeowner circled as an outsider. Empty yard. Valid day. Pay ¥36.";
    }
    if (state.night >= 7) {
      state.ending = resolveEnding();
      if (state.ending === "ji") state.lastMessage += " Foreman Cheng’s visit, noted send-the-beam. Send-the-Beam.";
      if (state.ending === "sheng") state.lastMessage += " Foreman Cheng’s visit, noted raise-the-beam. Raise-the-Beam.";
      if (state.ending === "qing") state.lastMessage += " Foreman Cheng’s visit, saw the empty yard. Clear the Yard.";
      if (state.ending === "trust-red") state.lastMessage += " You took the red paper as the whole truth. Trust the Red Paper.";
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
      state.lastMessage = "Sunset. Already filed today.";
      emit();
      persist();
      return true;
    }
    if (!state.sunsetArmed) {
      state.sunsetArmed = true;
      state.lastMessage = "The slip is not filed. After sunset there is no slip in the slot. Hit Sunset is here once more to mark Too Late.";
      emit();
      persist();
      return false;
    }
    state.clockSunset = true;
    grant("late");
    state.dims.wage = clampDim(state.dims.wage - 1);
    state.ending = "late";
    state.wage = D.PAY_LATE;
    state.lastMessage = "Sunset. No slip in the slot. Too Late. Pay ¥0.";
    emit();
    persist();
    return true;
  }

  function nextNight() {
    if (state.ending) {
      state.lastMessage = "This shift is over. Refresh returns to the title.";
      emit();
      return false;
    }
    if (!state.slipSubmitted) {
      state.lastMessage = "Today is not filed. File before sunset, then take the next day.";
      emit();
      return false;
    }
    if (state.night >= 7) {
      state.ending = resolveEnding();
      state.lastMessage = "Seven days are up.";
      emit();
      return false;
    }
    applyNight(state.night + 1);
    state.lastMessage = "Day " + state.night + ". " + (D.NIGHT_LINE[state.night] || "") + " File today before the next day.";
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
      state.lastMessage = "Send-the-beam rope outside. Hearing the supervisor is the only recommend for jiliang. Do not climb.";
    } else {
      state.lastMessage = "Send-the-beam rope outside. The shadow arrives before the person. Touching the shadow is not a hearing.";
    }
    emit();
    return true;
  }

  function pickCrack() {
    state.lastMessage = "In the seam, a beam-title draft wrote a wrong old homeowner name. Not Fang Shoucheng.";
    emit();
    return true;
  }

  function markTrustRed() {
    if (state.night < 3) {
      state.lastMessage = "The red paper is not lit today.";
      emit();
      return false;
    }
    state.trustRed = true;
    grant("sawTrustRed");
    state.lastMessage = "You took the red paper as the whole truth. The stop-work date is still there.";
    emit();
    return true;
  }

  function refuseContract() {
    state.lastMessage = "The contract original is not rewritten.";
    emit();
    return false;
  }

  function refuseSign() {
    state.lastMessage = "No signature for the homeowner.";
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
