"use strict";
(function (root) {
  var D = root.LIANG_DATA;
  var E = root.LIANG_ENGINE;

  function $(id) { return document.getElementById(id); }

  function setImg(el, file) {
    if (el) el.setAttribute("src", "jpeg/" + file);
  }

  function unloadTitle() {
    var t = $("title-layer");
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }

  function hasF(state, id) {
    return state.flags && state.flags.indexOf(id) !== -1;
  }

  function countListen(state, id) {
    var n = 0;
    var i;
    var log = state.archive || [];
    for (i = 0; i < log.length; i++) {
      if (log[i] && log[i].listen === id) n += 1;
    }
    return n;
  }

  function lastListen(state) {
    var i;
    var log = state.archive || [];
    for (i = log.length - 1; i >= 0; i--) {
      if (log[i] && log[i].listen) return log[i];
    }
    return null;
  }

  function endCopy(id, state) {
    var last = lastListen(state);
    if (id === "ji") {
      var howJi = countListen(state, "jianli") >= 7
        ? "All seven days you heard the supervisor. Foreman Cheng came back. You answered: hearing the supervisor today."
        : "On day seven you heard the supervisor. Foreman Cheng came back. You answered: hearing the supervisor today.";
      return { t: "Send-the-Beam", w: "¥36", p: [howJi, "Noted send-the-beam (jiliang). Without filing, do not raise the beam. Valid days filed."] };
    }
    if (id === "sheng") {
      var howSheng = countListen(state, "red") >= 5
        ? "The later days you heard the owner. Foreman Cheng came back. You answered: hearing the owner today."
        : "On day seven you heard the owner’s hour. Foreman Cheng came back. You answered.";
      return { t: "Raise-the-Beam", w: "¥36", p: [howSheng, "Raise at the auspicious hour. Homeowner present. Noted raise-the-beam (shengliang)."] };
    }
    if (id === "qing") {
      var howQing = countListen(state, "safe") >= 4
        ? "The later days you heard the safety slip. Foreman Cheng came back. You answered: hearing the safety slip today."
        : "On day seven you heard the safety slip. Foreman Cheng came back. You answered.";
      return { t: "Clear the Yard", w: "¥36", p: [howQing, "Outsiders off the yard. Homeowner Fang Shoucheng circled as an outsider."] };
    }
    if (id === "dual") {
      var howDual = state.dims.mind <= 0
        ? "Mind is empty. You heard two papers past the edge."
        : "Two papers bounced and you still forced the file. Not a valid day.";
      return { t: "Dual Hearing", w: "¥0", p: [howDual, "The file is still here. Refresh returns to the title."] };
    }
    if (id === "trust-red") {
      var howTrust = hasF(state, "trustRedAll")
        ? "On day seven you heard the owner, and you took the red paper as the whole truth."
        : "You took the red paper as the whole truth.";
      return { t: "Trust the Red Paper", w: "¥0", p: [howTrust, "The stop-work date is still there. This page cannot cover the filing."] };
    }
    if (id === "late") {
      var howLate;
      if (state.dims.wage <= 0 && !hasF(state, "validDay")) {
        howLate = "Pay cells are empty. Empty shifts stacked up.";
      } else if (hasF(state, "late") && !hasF(state, "validDay")) {
        howLate = "The slip was not filed. Sunset. No new slip in the slot.";
      } else if (hasF(state, "emptyDay") && (!last || last.night !== 7)) {
        howLate = "Day seven’s main cell is empty. An empty slip is not a valid day.";
      } else if (state.clockSunset || hasF(state, "late")) {
        howLate = "Sunset. No slip in the slot.";
      } else {
        howLate = "Main cell empty, or filed after sunset. Empty shift.";
      }
      return { t: "Too Late", w: "¥0", p: [howLate, "Refresh returns to the title."] };
    }
    return { t: "Day closed", w: "¥" + (state.wage || 0), p: [state.lastMessage || ""] };
  }

  function stillFor(state) {
    if (state.ending === "late") return "09-late.jpg";
    if (state.ending === "dual") return "06-dual.jpg";
    if (state.ending && state.wage === 36) return "08-valid.jpg";
    if (state.ending) return "08-valid.jpg";
    if (state.dualHit) return "06-dual.jpg";
    if (state.slipSubmitted && state.listenSource) return "08-valid.jpg";
    if (state.settleSlip.main) return "05-listen.jpg";
    if (state.openPaper === "pencil") return "07-pencil.jpg";
    if (state.openPaper === "beam") return "10-beam.jpg";
    if (state.openPaper === "jianli") return "01-jianli.jpg";
    if (state.openPaper === "red") return "02-red.jpg";
    if (state.openPaper === "safe") return "03-safe.jpg";
    if (state.pending) return "04-slip.jpg";
    return "00-open.jpg";
  }

  function render(state) {
    root.__LIANG__.state = state;
    var lock = $("lock-line");
    if (lock) lock.textContent = D.LOCK;
    var who = $("who");
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · 27 · Huaixi Town self-built site";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var night = $("night-mark");
    if (night) night.textContent = "Day " + state.night;
    var layer = $("night-line");
    if (layer) layer.textContent = D.NIGHT_LINE[state.night] || "";
    var sun = $("sun");
    if (sun) sun.textContent = state.clockSunset ? "Sunset in" : "Before sunset";
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || "File which paper you heard today before sunset. Opening a paper only holds it. Write one cell, then file.";
    function fillDim(numId, barId, n) {
      var num = $(numId);
      if (num) num.textContent = String(n);
      var bar = $(barId);
      if (bar) bar.style.setProperty("--n", String(n));
    }
    fillDim("dim-wage", "meter-wage", state.dims.wage);
    fillDim("dim-mind", "meter-mind", state.dims.mind);
    fillDim("dim-rep", "meter-rep", state.dims.rep);
    fillDim("dim-mirror", "meter-mirror", state.dims.mirror);
    var bag = $("pocket");
    if (bag) bag.textContent = state.pocket.length ? state.pocket.join(" · ") : "empty";
    var main = $("slip-main");
    if (main) main.textContent = state.settleSlip.main || "empty";
    var rec = $("slip-rec");
    if (rec) rec.textContent = state.settleSlip.rec || "empty";
    var pend = $("pending-mark");
    if (pend) {
      if (state.pending === "pencil") pend.textContent = "On hold: pencil (cannot enter the main cell)";
      else if (state.pending === "kouxin") pend.textContent = "On hold: message (cannot enter the main cell)";
      else if (state.pending) pend.textContent = "On hold: " + (D.PAPER[state.pending] ? D.PAPER[state.pending].bag : "");
      else pend.textContent = "Nothing on hold. Open a paper first.";
    }
    var hint = $("group-hint");
    if (hint) {
      hint.textContent = E.canGroup()
        ? "Filed today. Which paper burns you — still too early to say."
        : "Opening a paper only holds it. Write one cell, file before sunset.";
    }
    var lim = $("limit-line");
    if (lim) {
      var lid = state.openPaper;
      lim.textContent = (lid && D.LIMITS && D.LIMITS[lid]) ? D.LIMITS[lid] : "";
    }
    var paperPencil = $("paper-pencil");
    if (paperPencil) paperPencil.style.display = state.night >= 2 ? "block" : "none";
    var redBlock = $("paper-red-block");
    if (redBlock) redBlock.style.display = state.night >= 3 ? "block" : "none";
    var paperRed = $("paper-red-extra");
    if (paperRed) paperRed.style.display = state.night >= 3 ? "block" : "none";
    var safeBlock = $("paper-safe-block");
    if (safeBlock) safeBlock.style.display = state.night >= 4 ? "block" : "none";
    var paperSafe = $("paper-safe-extra");
    if (paperSafe) paperSafe.style.display = state.night >= 4 ? "block" : "none";
    var paperPrint = $("paper-print");
    if (paperPrint) paperPrint.style.display = state.night >= 5 ? "block" : "none";
    var paperKouxin = $("paper-kouxin");
    if (paperKouxin) paperKouxin.style.display = state.night >= 6 ? "block" : "none";
    var paperVisit = $("paper-visit");
    if (paperVisit) paperVisit.style.display = state.night >= 7 ? "block" : "none";
    var trustBtn = $("btn-trust-red");
    if (trustBtn) trustBtn.style.display = state.night >= 3 ? "block" : "none";
    var split = document.querySelector(".split");
    if (split) {
      if (state.ending) split.classList.add("ended");
      else split.classList.remove("ended");
    }
    var sunBtn = $("btn-sunset");
    if (sunBtn) {
      sunBtn.className = state.sunsetArmed && !state.slipSubmitted ? "armed" : "";
    }
    var nxt = $("btn-next");
    if (nxt) {
      var canNext = !state.ending && state.slipSubmitted && state.night < 7;
      nxt.disabled = !canNext;
      nxt.style.display = (!state.ending && state.night < 7) ? "inline-block" : "none";
    }
    var still = $("still");
    setImg(still, stillFor(state));
    var endEl = $("ending-layer");
    if (endEl) {
      if (state.ending) {
        var c = endCopy(state.ending, state);
        var wasHidden = endEl.className.indexOf("show") === -1;
        endEl.className = "ending show";
        var paras = Array.isArray(c.p) ? c.p : [c.p];
        endEl.innerHTML = "<p class=\"lock-line\">" + c.t + " " + c.w + "</p>" +
          paras.map(function (para) { return "<p>" + para + "</p>"; }).join("");
        if (wasHidden) {
          try { endEl.scrollIntoView({ block: "start" }); } catch (err) {}
        }
      } else {
        endEl.className = "ending";
        endEl.textContent = "";
      }
    }
  }

  function boot() {
    if (!root.__LIANG__) root.__LIANG__ = {};
    root.__LIANG__.state = E.state;
    root.__LIANG__.enter = function () {
      E.enter();
      unloadTitle();
      var desk = $("desk");
      if (desk) desk.className = "show";
    };
    root.__LIANG__.clickPaper = function (id) { return E.clickPaper(id); };
    root.__LIANG__.writeMain = function () { return E.writeMain(); };
    root.__LIANG__.submitSlip = function () { return E.submitSlip(); };
    root.__LIANG__.sunset = function () { return E.sunset(); };
    root.__LIANG__.nextNight = function () { return E.nextNight(); };
    root.__LIANG__.setNight = function (n) { return E.setNight(n); };
    root.__LIANG__.replay = function () { return E.replay(); };
    E.setUi(render);
    render(E.state);

    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.onclick = function () { root.__LIANG__.enter(); };
    var bj = $("btn-jianli-line");
    if (bj) bj.onclick = function () { E.clickPaper("jianli"); };
    var br = $("btn-red");
    if (br) br.onclick = function () { E.clickPaper("red"); };
    var bs = $("btn-safe");
    if (bs) bs.onclick = function () { E.clickPaper("safe"); };
    var bp = $("btn-pencil");
    if (bp) bp.onclick = function () { E.clickPaper("pencil"); };
    var bk = $("btn-kouxin");
    if (bk) bk.onclick = function () { E.clickPaper("kouxin"); };
    var bv = $("btn-visit");
    if (bv) bv.onclick = function () { E.answerVisit(); };
    var bg = $("btn-gossip");
    if (bg) bg.onclick = function () { E.clickPaper("gossip"); };
    var bw = $("btn-write");
    if (bw) bw.onclick = function () { E.writeMain(); };
    var bsub = $("btn-submit");
    if (bsub) bsub.onclick = function () { E.submitSlip(); };
    var bsun = $("btn-sunset");
    if (bsun) bsun.onclick = function () { E.sunset(); };
    var bn = $("btn-next");
    if (bn) bn.onclick = function () { E.nextNight(); };
    var bb = $("btn-beam");
    if (bb) bb.onclick = function () { E.touchBeam(); };
    var bc = $("btn-crack");
    if (bc) bc.onclick = function () { E.pickCrack(); };
    var bt = $("btn-trust-red");
    if (bt) bt.onclick = function () { E.markTrustRed(); };
    var rc = $("refuse-contract");
    if (rc) rc.onclick = function () { E.refuseContract(); };
    var rs = $("refuse-sign");
    if (rs) rs.onclick = function () { E.refuseSign(); };
  }

  if (root.document) {
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : global);
