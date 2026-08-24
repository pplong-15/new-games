"use strict";
(function (root) {
  var D = root.SANFEN_DATA;

  function claimById(id) {
    var i;
    for (i = 0; i < D.CLAIMS.length; i++) {
      if (D.CLAIMS[i].id === id) return D.CLAIMS[i];
    }
    return null;
  }

  function routeById(id) {
    var i;
    for (i = 0; i < D.ROUTES.length; i++) {
      if (D.ROUTES[i].id === id) return D.ROUTES[i];
    }
    return null;
  }

  function sourceByRoute(routeId) {
    var i;
    for (i = 0; i < D.SOURCES.length; i++) {
      if (D.SOURCES[i].route === routeId) return D.SOURCES[i];
    }
    return null;
  }

  function newState() {
    return {
      seen: [],
      verified: [],
      openDoor: "fang",
      shiftIndex: 0,
      clock: D.CLOCK_MAX,
      claimsTonight: [],
      ended: false,
      ending: null,
      route: "desk",
      openedL2: false,
      lastMessage: "",
      wage: 0,
      entered: false,
      rejected: []
    };
  }

  var state = newState();
  var uiHook = null;

  function setUi(fn) { uiHook = fn; }
  function emit() { if (uiHook) uiHook(state); }

  function persist() {
    try {
      if (root.localStorage) {
        root.localStorage.setItem(D.STORE_KEY, JSON.stringify(state));
      }
    } catch (e) {}
  }

  function load() {
    try {
      if (root.localStorage) {
        var raw = root.localStorage.getItem(D.STORE_KEY);
        if (raw) {
          var s = JSON.parse(raw);
          if (s && Array.isArray(s.seen) && Array.isArray(s.verified)) {
            var fresh = newState();
            var k;
            for (k in fresh) {
              if (Object.prototype.hasOwnProperty.call(fresh, k) && s[k] === undefined) {
                s[k] = fresh[k];
              }
            }
            if (!Array.isArray(s.claimsTonight)) s.claimsTonight = [];
            if (!Array.isArray(s.rejected)) s.rejected = [];
            state = s;
            return true;
          }
        }
      }
    } catch (e) {}
    return false;
  }

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function hasVerified(id) {
    return state.verified.indexOf(id) !== -1;
  }

  function markSeen(routeId) {
    var r = routeById(routeId);
    if (!r) return;
    if (state.seen.indexOf(routeId) === -1) state.seen.push(routeId);
  }

  function firstNightDeepOk(door) {
    if (state.shiftIndex === 0) {
      if (door === "gui" || door === "zhang") return false;
    }
    return true;
  }

  function openRoute(id) {
    if (state.ended && id !== "desk-end-a" && id !== "desk-end-b" && id !== "desk-late" && id !== "desk-pay") {
      return false;
    }
    var r = routeById(id);
    if (!r) {
      state.route = "notfound";
      state.lastMessage = "这条路径没有对应值班页。";
      emit();
      persist();
      return false;
    }
    if (id === "zhang-l2") {
      if (!hasVerified("claim-batch-yuanjin")) {
        state.route = "zhang-lock";
        state.lastMessage = D.LOCK_L2_SEEN;
        markSeen("zhang-lock");
        emit();
        persist();
        return false;
      }
      state.openedL2 = true;
    }
    if (r.skin === "fang") {
      if (state.shiftIndex === 0) state.openDoor = "fang";
      else if (state.openDoor && state.openDoor !== "fang" && state.openDoor !== null) {
        /* 后班已选另一扇仍可读方作温习 */
      } else {
        state.openDoor = "fang";
      }
    }
    if (r.skin === "gui") {
      if (!firstNightDeepOk("gui") && id !== "gui-door") {
        state.route = "gui-door";
        state.lastMessage = "今晚先看送开的份。";
        emit();
        persist();
        return false;
      }
      if (state.shiftIndex >= 1) state.openDoor = "gui";
    }
    if (r.skin === "zhang") {
      if (!firstNightDeepOk("zhang") && id !== "zhang-door") {
        state.route = "zhang-door";
        state.lastMessage = "今晚先看送开的份。";
        emit();
        persist();
        return false;
      }
      if (state.shiftIndex >= 1) state.openDoor = "zhang";
    }
    state.route = id;
    markSeen(id);
    emit();
    persist();
    return true;
  }

  function openDoor(door) {
    if (state.ended) return false;
    if (state.shiftIndex === 0 && door !== "fang") {
      state.lastMessage = "今晚先看送开的份。";
      if (door === "gui") openRoute("gui-door");
      else if (door === "zhang") openRoute("zhang-door");
      return false;
    }
    state.openDoor = door;
    if (door === "fang") return openRoute("fang-today");
    if (door === "gui") return openRoute("gui-door");
    if (door === "zhang") return openRoute("zhang-door");
    return false;
  }

  function canWrite(claimId) {
    var c = claimById(claimId);
    if (!c || state.ended) return false;
    if (hasVerified(claimId)) return false;
    if (claimId === "claim-same-column") {
      return state.seen.indexOf("fang-today") !== -1 || state.seen.indexOf("fang-head") !== -1 || state.openDoor === "fang";
    }
    if (claimId === "claim-batch-yuanjin") {
      if (state.shiftIndex < 1) return false;
      return state.seen.indexOf("gui-batch") !== -1;
    }
    if (claimId === "claim-three-align") {
      return state.openedL2 === true && hasVerified("claim-batch-yuanjin");
    }
    return false;
  }

  function writeClaim(claimId) {
    if (!canWrite(claimId)) {
      if (claimId === "claim-batch-yuanjin" && state.shiftIndex < 1) {
        state.lastMessage = "今晚先看送开的份。";
      } else if (claimId === "claim-three-align" && !state.openedL2) {
        state.lastMessage = D.LOCK_L2;
      } else {
        state.lastMessage = D.REJECT_SEEN;
      }
      emit();
      persist();
      return false;
    }
    state.verified.push(claimId);
    state.lastMessage = "已写入：" + D.claimLabel(claimId);
    emit();
    persist();
    return true;
  }

  function handoff() {
    if (state.ended) return false;
    state.seen = [];
    state.openDoor = null;
    state.shiftIndex += 1;
    state.clock = D.CLOCK_MAX;
    state.route = "desk-handoff";
    state.lastMessage = "桌面清空了。已证实栏" + (state.verified.length ? "还在。" : "没有条。");
    emit();
    persist();
    return true;
  }

  function tryDragSeen() {
    state.lastMessage = D.REJECT_SEEN;
    emit();
    persist();
    return false;
  }

  function tryReject(kind) {
    if (state.rejected.indexOf(kind) === -1) state.rejected.push(kind);
    if (kind === "scenic-blurb") state.lastMessage = D.REJECT_SCENIC;
    else if (kind === "ledger-flat") state.lastMessage = D.REJECT_FLAT;
    else if (kind === "book-empty") state.lastMessage = "挂号空日历不能当值班工作。";
    else state.lastMessage = D.REJECT_SEEN;
    emit();
    persist();
    return false;
  }

  function exportOut() {
    state.lastMessage = D.REJECT_EXPORT;
    state.route = "ex-export";
    emit();
    persist();
    return false;
  }

  function approveStock() {
    state.lastMessage = D.REJECT_APPROVE;
    state.route = "ex-approve";
    emit();
    persist();
    return false;
  }

  function payNow() {
    return D.PAY_EACH * state.verified.length;
  }

  function chainReady() {
    return hasVerified("claim-same-column") &&
      hasVerified("claim-batch-yuanjin") &&
      hasVerified("claim-three-align");
  }

  function endingParagraphs(st) {
    var s = st || state;
    if (s.ending === "A") return D.endingA(s);
    return D.endingB(s);
  }

  function finish(ending) {
    state.ended = true;
    state.ending = ending;
    state.wage = payNow();
    if (ending === "A") state.route = "desk-end-a";
    else if (state.clock <= 0) state.route = "desk-late";
    else state.route = "desk-end-b";
    emit();
    persist();
  }

  function submitClaims() {
    if (state.ended) return { ok: false, ending: state.ending, pay: state.wage };
    var i;
    var picked = [];
    for (i = 0; i < state.claimsTonight.length && picked.length < D.CLAIM_CAP; i++) {
      if (hasVerified(state.claimsTonight[i]) && picked.indexOf(state.claimsTonight[i]) === -1) {
        picked.push(state.claimsTonight[i]);
      }
    }
    state.claimsTonight = picked;
    if (chainReady() && picked.indexOf("claim-three-align") !== -1) {
      finish("A");
      return { ok: true, ending: "A", pay: state.wage };
    }
    finish("B");
    return { ok: false, ending: "B", pay: state.wage };
  }

  function toggleClaim(id) {
    if (state.ended) return false;
    if (!hasVerified(id)) {
      state.lastMessage = D.REJECT_SEEN;
      emit();
      return false;
    }
    var i = state.claimsTonight.indexOf(id);
    if (i !== -1) {
      state.claimsTonight.splice(i, 1);
      emit();
      persist();
      return true;
    }
    if (state.claimsTonight.length >= D.CLAIM_CAP) {
      state.lastMessage = "今晚三条以内。";
      emit();
      return false;
    }
    state.claimsTonight.push(id);
    emit();
    persist();
    return true;
  }

  function tickClock(n) {
    if (state.ended) return state.clock;
    var step = typeof n === "number" ? n : 1;
    state.clock -= step;
    if (state.clock < 0) state.clock = 0;
    if (state.clock === 0 && state.ending !== "A" && !chainReady()) {
      finish("B");
      state.route = "desk-late";
      state.lastMessage = D.LATE;
    }
    emit();
    persist();
    return state.clock;
  }

  function jumpClock(v) {
    state.clock = v;
    if (state.clock <= 0 && state.ending !== "A" && !chainReady()) {
      state.clock = 0;
      finish("B");
      state.route = "desk-late";
      state.lastMessage = D.LATE;
    }
    emit();
    persist();
    return state.clock;
  }

  function enter() {
    state.entered = true;
    if (!state.route) state.route = "desk";
    if (state.shiftIndex === 0 && state.openDoor === null) state.openDoor = "fang";
    emit();
    persist();
  }

  function replay() {
    try {
      if (root.localStorage) root.localStorage.removeItem(D.STORE_KEY);
    } catch (e) {}
    state = newState();
    emit();
    return state;
  }

  function canOpenL2() {
    return hasVerified("claim-batch-yuanjin");
  }

  var api = {
    newState: newState,
    setUi: setUi,
    snapshot: snapshot,
    persist: persist,
    load: load,
    openRoute: openRoute,
    openDoor: openDoor,
    writeClaim: writeClaim,
    canWrite: canWrite,
    handoff: handoff,
    tryDragSeen: tryDragSeen,
    tryReject: tryReject,
    exportOut: exportOut,
    approveStock: approveStock,
    submitClaims: submitClaims,
    toggleClaim: toggleClaim,
    tickClock: tickClock,
    jumpClock: jumpClock,
    enter: enter,
    replay: replay,
    canOpenL2: canOpenL2,
    payNow: payNow,
    chainReady: chainReady,
    endingParagraphs: endingParagraphs,
    claimById: claimById,
    routeById: routeById,
    sourceByRoute: sourceByRoute,
    refreshState: function () { return state; }
  };

  Object.defineProperty(api, "state", {
    get: function () { return state; },
    set: function (s) { state = s; }
  });

  root.SANFEN_ENGINE = api;
})(typeof window !== "undefined" ? window : global);
