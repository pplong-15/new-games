"use strict";
(function (root) {
  var D = root.GUOMEN_DATA;
  var E = root.GUOMEN_ENGINE;

  function $(id) { return document.getElementById(id); }

  function setImg(el, file) {
    if (el) el.setAttribute("src", "jpeg/" + file);
  }

  function hasF(state, id) {
    return state.flags && state.flags.indexOf(id) !== -1;
  }

  var TITLE_HTML = "";
  var clockTimer = null;

  function cacheTitle() {
    var t = $("title-layer");
    if (t) TITLE_HTML = t.outerHTML;
  }

  function unloadTitle() {
    var t = $("title-layer");
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }

  function roleLabel(role) {
    if (role === "xi") return "喜车";
    if (role === "sang") return "丧车";
    return "空";
  }

  function endCopy(id, state) {
    if (id === "xi-pass") {
      var howXi = hasF(state, "n3_saw_sawed")
        ? "门槛沿你对过一眼。路单仍是喜车，流程单喜条压下去。"
        : "路单写喜车。你按流程单喜条压的。";
      var extraXi = hasF(state, "n4_marked_A")
        ? "副驾那两页墨还咬着。杜衡对讲只报有效。"
        : "杜衡对讲只报有效。";
      return { img: "08-valid.jpg", t: "喜车过门", w: "¥36", p: [howXi, extraXi, "堂屋那晚按喜记，钥匙你交了。"] };
    }
    if (id === "sang-stop") {
      var howStop = hasF(state, "n5_marked_B")
        ? "路单改成丧。门禁那条和铅笔你对过，棺停在门外。"
        : "路单改成丧。棺停在金桂苑门外。";
      return { img: "08-valid.jpg", t: "丧停门外", w: "¥36", p: [howStop, "物业灯还亮着。杜衡认这单。"] };
    }
    if (id === "sang-go") {
      var howGo = state.dims.oil <= 1
        ? "丧车，铅笔那行你硬听了，油钱差不多见底。"
        : "丧车。铅笔那行你硬听了，子时往门里开。";
      var extraGo = state.dims.rep <= 1
        ? "车誉薄。杜衡仍报有效，口气已经不耐。"
        : "硬闯削过油钱。杜衡仍报有效。";
      return { img: "08-valid.jpg", t: "丧车硬走", w: "¥36", p: [howGo, extraGo] };
    }
    if (id === "listen-guest") {
      var howGuest = hasF(state, "n6_order_known")
        ? "页脚你摊开过。你还是按车队那页压的。"
        : "你按车队印发那页压的。客人点名堂屋门，车头就对着堂屋门。";
      return { img: "08-valid.jpg", t: "听客人", w: "¥36", p: [howGuest, "后几晚那些纸你没对着压。杜衡照收。"] };
    }
    if (id === "trust-pencil") {
      var howPen = hasF(state, "n5_marked_B")
        ? "门禁那条你见过，仍听遮阳板。"
        : "你听遮阳板那行字。子时往门里开。";
      return { img: "08-valid.jpg", t: "信铅笔", w: "¥36", p: [howPen, "油钱削过。夜间那条没压上。"] };
    }
    if (id === "late") {
      return {
        img: "09-late.jpg",
        t: "来不及",
        w: "¥0",
        p: [
          "钟走到头，钥匙还在点火孔里。",
          "杜衡那边公文改成催。纸还摊在副驾。工钱没有。"
        ]
      };
    }
    return null;
  }

  function render(state) {
    root.__GUOMEN__.state = state;
    var lock = $("lock-line");
    if (lock) lock.textContent = D.LOCK;
    var who = $("who");
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · 二十九 · 双河口镇";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var dest = $("dest");
    if (dest) dest.textContent = state.waybill.dest;
    var guest = $("guest");
    if (guest) guest.textContent = state.waybill.guest || "—";
    var role = $("role");
    if (role) role.textContent = roleLabel(state.waybill.role);
    var night = $("night-mark");
    if (night) night.textContent = "第" + state.night + "晚";
    var radio = $("radio");
    if (radio) radio.textContent = D.RADIO[state.night] || "";
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || (D.DISPATCHER + "：今晚标完再压。交钥匙。工钱按有效单。");
    var clock = $("clock");
    if (clock) {
      var sec = Math.max(0, state.clock | 0);
      var mm = Math.floor(sec / 60);
      var ss = sec % 60;
      clock.textContent = (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    }
    var oil = $("dim-oil");
    if (oil) oil.textContent = String(state.dims.oil);
    var mind = $("dim-mind");
    if (mind) mind.textContent = String(state.dims.mind);
    var rep = $("dim-rep");
    if (rep) rep.textContent = String(state.dims.rep);
    var mir = $("dim-mirror");
    if (mir) mir.textContent = String(state.dims.mirror);
    function bagName(tok) {
      var k, c;
      for (k in D.CLAUSES) {
        if (!Object.prototype.hasOwnProperty.call(D.CLAUSES, k)) continue;
        c = D.CLAUSES[k];
        if (c.token === tok) return c.bag;
      }
      return "";
    }
    function pairTalk(id) {
      if (id === "A") return "车队守则和流程单";
      if (id === "B") return "门禁短信和上一班铅笔";
      return "";
    }
    var bag = $("pocket");
    if (bag) {
      var names = [];
      var ti;
      for (ti = 0; ti < state.pocket.tokens.length; ti++) {
        var bn = bagName(state.pocket.tokens[ti]);
        if (bn) names.push(bn);
      }
      bag.textContent = names.length ? names.join(" · ") : "袋空";
    }
    var pair = $("pair-ink");
    if (pair) {
      var bits = [];
      var i;
      for (i = 0; i < state.pairMark.length; i++) {
        var talk = pairTalk(state.pairMark[i].id);
        if (talk) bits.push(talk);
      }
      pair.textContent = bits.length ? "墨水咬住" + bits.join("，") : "点两条成对才判。墨留下。";
    }
    ["fleet-listen", "pencil-zishi", "slip-xi", "slip-sang", "sms-night"].forEach(function (id) {
      var el = $(id);
      if (!el) return;
      var open = state.night >= D.CLAUSES[id].night;
      if (!open) el.classList.add("slot-wait");
      else el.classList.remove("slot-wait");
      if (state.selected.indexOf(id) !== -1) el.classList.add("picked");
      else el.classList.remove("picked");
    });
    var slot = $("slot-empty");
    if (slot) {
      slot.style.display = state.night < 4 ? "block" : "none";
    }
    var pencil = $("paper-pencil");
    if (pencil) pencil.style.display = state.night >= 2 ? "block" : "none";
    var slip = $("paper-slip");
    if (slip) slip.style.display = state.night >= 3 ? "block" : "none";
    var sms = $("paper-sms");
    if (sms) sms.style.display = state.night >= 5 ? "block" : "none";
    var foot = $("paper-foot");
    if (foot) foot.style.display = state.night >= 6 ? "block" : "none";
    var holdBtn = $("btn-hold");
    if (holdBtn) {
      if (state.holding) holdBtn.classList.add("holding");
      else holdBtn.classList.remove("holding");
    }
    var chips = document.querySelectorAll("[data-press]");
    var j;
    for (j = 0; j < chips.length; j++) {
      var src = chips[j].getAttribute("data-press");
      if (state.pressPick === src) chips[j].classList.add("picked");
      else chips[j].classList.remove("picked");
    }
    var rx = $("role-xi");
    var rs = $("role-sang");
    var rb = $("role-blank");
    if (rx) {
      if (state.waybill.role === "xi") rx.classList.add("picked");
      else rx.classList.remove("picked");
    }
    if (rs) {
      if (state.waybill.role === "sang") rs.classList.add("picked");
      else rs.classList.remove("picked");
    }
    if (rb) {
      if (state.waybill.role === "blank") rb.classList.add("picked");
      else rb.classList.remove("picked");
    }
    var still = $("still");
    if (still) {
      if (state.ending === "late") setImg(still, "09-late.jpg");
      else if (state.ending) setImg(still, "08-valid.jpg");
      else if (state.holding) setImg(still, "04-hold.jpg");
      else if (state.pairMark.length) setImg(still, "02-pair.jpg");
      else setImg(still, "00-open.jpg");
    }
    var desk = $("desk");
    if (desk) {
      if (state.entered) {
        desk.classList.add("show");
        desk.style.display = "block";
      } else {
        desk.classList.remove("show");
        desk.style.display = "none";
      }
    }
    var end = $("ending-layer");
    if (end) {
      var copy = endCopy(state.ending, state);
      if (copy) {
        var paras = Array.isArray(copy.p) ? copy.p : [copy.p];
        var html = '<img src="jpeg/' + copy.img + '" alt="">' +
          '<div class="end-copy"><h2>' + copy.t + "</h2>";
        var pi;
        for (pi = 0; pi < paras.length; pi++) {
          html += "<p>" + paras[pi] + "</p>";
        }
        html += "<p>工钱 " + copy.w + "</p>" +
          '<button type="button" id="btn-replay">再开一晚</button></div>';
        end.className = "ending show";
        end.innerHTML = html;
        var rbtn = $("btn-replay");
        if (rbtn) rbtn.onclick = function () { replay(); };
      } else {
        end.className = "ending";
        end.innerHTML = "";
      }
    }
    var key = $("btn-key");
    if (key) {
      if (state.keyHanded) key.textContent = "钥匙已交";
      else key.textContent = "交钥匙";
    }
  }

  function stopClock() {
    if (clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  }

  function startClock() {
    stopClock();
    clockTimer = setInterval(function () {
      var st = E.getState();
      if (!st.entered || st.ending) {
        stopClock();
        return;
      }
      E.tickClock(1);
    }, 1000);
  }

  function enter() {
    E.enter();
    cacheTitle();
    unloadTitle();
    startClock();
    return true;
  }

  function replay() {
    stopClock();
    E.replay();
    var end = $("ending-layer");
    if (end) {
      end.className = "ending";
      end.innerHTML = "";
    }
    if (!$("title-layer") && TITLE_HTML) {
      document.body.insertAdjacentHTML("afterbegin", TITLE_HTML);
      var enterBtn = $("btn-enter");
      if (enterBtn) enterBtn.onclick = function () { enter(); };
    }
    var desk = $("desk");
    if (desk) {
      desk.classList.remove("show");
      desk.style.display = "none";
    }
    return true;
  }

  function bindHold() {
    var btn = $("btn-hold");
    if (!btn) return;
    btn.onpointerdown = function (ev) {
      if (ev.button !== 0) return;
      ev.preventDefault();
      if (typeof btn.setPointerCapture === "function") {
        try { btn.setPointerCapture(ev.pointerId); } catch (e) {}
      }
      E.holdStart();
    };
    btn.onpointerup = function () { E.cancelHold(); };
    btn.onpointercancel = function () { E.cancelHold(); };
    btn.onlostpointercapture = function () {
      if (E.getState().holding) E.cancelHold();
    };
    btn.onmousedown = function (ev) {
      if (ev.button !== 0) return;
      if (ev.pointerType) return;
      E.holdStart();
    };
    btn.onmouseup = function (ev) {
      if (ev.pointerType) return;
      E.cancelHold();
    };
    btn.ontouchstart = function (ev) {
      ev.preventDefault();
      E.holdStart();
    };
    btn.ontouchend = function () { E.cancelHold(); };
    btn.onclick = function (ev) { ev.preventDefault(); };
    btn.onkeydown = function (ev) {
      if (ev.key !== " " && ev.key !== "Enter") return;
      ev.preventDefault();
      if (!E.getState().holding) E.holdStart();
    };
    btn.onkeyup = function (ev) {
      if (ev.key !== " " && ev.key !== "Enter") return;
      ev.preventDefault();
      E.cancelHold();
    };
  }

  function boot() {
    function goClause(id) {
      return function () { E.clickClause(id); };
    }
    cacheTitle();
    E.hydrate();
    if ($("fleet-listen")) $("fleet-listen").onclick = goClause("fleet-listen");
    if ($("pencil-zishi")) $("pencil-zishi").onclick = goClause("pencil-zishi");
    if ($("slip-xi")) $("slip-xi").onclick = goClause("slip-xi");
    if ($("slip-sang")) $("slip-sang").onclick = goClause("slip-sang");
    if ($("sms-night")) $("sms-night").onclick = goClause("sms-night");
    if ($("btn-waste")) $("btn-waste").onclick = function () { E.markWaste(); };
    if ($("btn-key")) $("btn-key").onclick = function () { E.handKey(); };
    if ($("btn-mirror")) $("btn-mirror").onclick = function () { E.lookMirror(); };
    if ($("btn-ink")) $("btn-ink").onclick = function () { E.noteInk(); };
    if ($("btn-order")) $("btn-order").onclick = function () { E.noteOrder(); };
    if ($("role-xi")) $("role-xi").onclick = function () { E.setRole("xi"); };
    if ($("role-sang")) $("role-sang").onclick = function () { E.setRole("sang"); };
    if ($("role-blank")) $("role-blank").onclick = function () { E.setRole("blank"); };
    var chips = document.querySelectorAll("[data-press]");
    var j;
    for (j = 0; j < chips.length; j++) {
      chips[j].onclick = (function (el) {
        return function () { E.pickPress(el.getAttribute("data-press")); };
      })(chips[j]);
    }
    if ($("refuse-sms")) $("refuse-sms").onclick = function () { E.refuse("sms"); };
    if ($("refuse-xi")) $("refuse-xi").onclick = function () { E.refuse("xi-sign"); };
    if ($("refuse-sang")) $("refuse-sang").onclick = function () { E.refuse("sang-sign"); };
    if ($("refuse-ghost")) $("refuse-ghost").onclick = function () { E.refuse("ghost"); };
    bindHold();
    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.onclick = function () { enter(); };
    E.setUi(render);
    var st = E.getState();
    if (st.entered) {
      unloadTitle();
      if (!st.ending) startClock();
    }
    render(st);
  }

  root.__GUOMEN__ = {
    enter: enter,
    clickClause: E.clickClause,
    markWaste: E.markWaste,
    holdStart: E.holdStart,
    holdComplete: E.holdComplete,
    cancelHold: E.cancelHold,
    pickPress: E.pickPress,
    handKey: E.handKey,
    jumpClock: E.jumpClock,
    tickClock: E.tickClock,
    setNight: E.setNight,
    setRole: E.setRole,
    replay: replay,
    state: E.getState()
  };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : global);
