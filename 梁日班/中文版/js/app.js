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
        ? "七日你都听监理。程匠头回访，你应了今日听监理。"
        : "第七日你听监理。程匠头回访，你应了今日听监理。";
      return { t: "《寄梁》", w: "¥36", p: [howJi, "记下寄梁。未报建不得升梁。有效日已交。"] };
    }
    if (id === "sheng") {
      var howSheng = countListen(state, "red") >= 5
        ? "后几日你听东家。程匠头回访，你应了今日听东家。"
        : "第七日你听东家吉时。程匠头回访，你应了。";
      return { t: "《升梁》", w: "¥36", p: [howSheng, "吉时必须升，宅主须在场。记下升梁。"] };
    }
    if (id === "qing") {
      var howQing = countListen(state, "safe") >= 4
        ? "后几日你听安全单。程匠头回访，你应了今日听安全单。"
        : "第七日你听安全单。程匠头回访，你应了。";
      return { t: "《清场》", w: "¥36", p: [howQing, "外人离场。宅主方守成被圈成外人。"] };
    }
    if (id === "dual") {
      var howDual = state.dims.mind <= 0
        ? "神智空了。两份听过了头。"
        : "两份打回后仍硬交。不得当有效日。";
      return { t: "《双听》", w: "¥0", p: [howDual, "档还在。刷新回标题。"] };
    }
    if (id === "trust-red") {
      var howTrust = hasF(state, "trustRedAll")
        ? "第七日你听东家，还点了把红纸当全真。"
        : "你把红纸当全真。";
      return { t: "《信红纸》", w: "¥0", p: [howTrust, "停工令日期还在。这页盖不住报建。"] };
    }
    if (id === "late") {
      var howLate;
      if (state.dims.wage <= 0 && !hasF(state, "validDay")) {
        howLate = "工钱格空了。空班叠满。";
      } else if (hasF(state, "late") && !hasF(state, "validDay")) {
        howLate = "条还没交，日落到了。缝里没有新条。";
      } else if (hasF(state, "emptyDay") && (!last || last.night !== 7)) {
        howLate = "第七日主栏是空的。空条不能冒充有效日。";
      } else if (state.clockSunset || hasF(state, "late")) {
        howLate = "日落到了。缝里没有条。";
      } else {
        howLate = "主栏空，或日落后才交。空班。";
      }
      return { t: "《来不及》", w: "¥0", p: [howLate, "刷新回标题。"] };
    }
    return { t: "本日过完", w: "¥" + (state.wage || 0), p: [state.lastMessage || ""] };
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
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · 二十七 · 槐溪镇自建房工地";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var night = $("night-mark");
    if (night) night.textContent = "第" + state.night + "日";
    var layer = $("night-line");
    if (layer) layer.textContent = D.NIGHT_LINE[state.night] || "";
    var sun = $("sun");
    if (sun) sun.textContent = state.clockSunset ? "日落已到" : "日落前";
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || "日落前交本日听哪份。点纸只是待听。写入主栏一格再交。";
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
    if (bag) bag.textContent = state.pocket.length ? state.pocket.join(" · ") : "袋空";
    var main = $("slip-main");
    if (main) main.textContent = state.settleSlip.main || "空";
    var rec = $("slip-rec");
    if (rec) rec.textContent = state.settleSlip.rec || "空";
    var pend = $("pending-mark");
    if (pend) {
      if (state.pending === "pencil") pend.textContent = "待听：铅笔（不能进主栏）";
      else if (state.pending === "kouxin") pend.textContent = "待听：口信（不能进主栏）";
      else if (state.pending) pend.textContent = "待听：" + (D.PAPER[state.pending] ? D.PAPER[state.pending].bag : "");
      else pend.textContent = "待听空。点文件先进待听。";
    }
    var hint = $("group-hint");
    if (hint) {
      hint.textContent = E.canGroup()
        ? "本日已交。哪份坑人，这会儿还说不清。"
        : "点纸只是待听。写入主栏一格，日落前交，才算交差。";
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
