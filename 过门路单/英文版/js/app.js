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
    if (role === "xi") return "Joy car";
    if (role === "sang") return "Funeral car";
    return "blank";
  }

  function stillBridge(file) {
    if (file === "09-late.jpg") return "Clock out. Key still in the hole.";
    if (file === "08-valid.jpg") return "Valid bill noted.";
    if (file === "04-hold.jpg") return "Thumb on the press. This bill hears one paper.";
    if (file === "02-pair.jpg") return "Two pages open on the passenger seat. Ink on the pair.";
    return "Cab seat. Clipboard on the dash. Hand in before zishi.";
  }

  function endCopy(id, state) {
    if (id === "xi-pass") {
      var howXi = hasF(state, "n3_saw_sawed")
        ? "You checked the threshold edge. Waybill still joy car. You pressed the joy slip."
        : "Waybill says joy car. You pressed the joy slip.";
      var extraXi = hasF(state, "n4_marked_A")
        ? "Those two pages on the passenger seat still bite. Du Heng only reports valid."
        : "Du Heng only reports valid.";
      return { img: "08-valid.jpg", t: "Joy car through", w: "¥36", p: [howXi, extraXi, "That night at the hall is down as joy. You handed the keys."] };
    }
    if (id === "sang-stop") {
      var howStop = hasF(state, "n5_marked_B")
        ? "Waybill changed to funeral. You checked gate SMS against the pencil. Coffin stopped outside."
        : "Waybill changed to funeral. Coffin stopped outside Jin Gui Yuan.";
      return { img: "08-valid.jpg", t: "Funeral stopped outside", w: "¥36", p: [howStop, "Estate lights still on. Du Heng takes this bill."] };
    }
    if (id === "sang-go") {
      var howGo = state.dims.oil <= 1
        ? "Funeral car. You forced the pencil line. Oil money almost gone."
        : "Funeral car. You forced the pencil line. At zishi you drove in.";
      var extraGo = state.dims.rep <= 1
        ? "Cab name is thin. Du Heng still reports valid. He's tired of it."
        : "Forcing it cut the oil. Du Heng still reports valid.";
      return { img: "08-valid.jpg", t: "Funeral car forced through", w: "¥36", p: [howGo, extraGo] };
    }
    if (id === "listen-guest") {
      var howGuest = hasF(state, "n6_order_known")
        ? "You opened the footer. You still pressed the fleet page."
        : "You pressed the fleet print. Guest named the hall door. Nose pointed at the hall door.";
      return { img: "08-valid.jpg", t: "Heard the guest", w: "¥36", p: [howGuest, "Later papers you didn't press against. Du Heng took it."] };
    }
    if (id === "trust-pencil") {
      var howPen = hasF(state, "n5_marked_B")
        ? "You saw the gate SMS. You still heard the visor."
        : "You heard the visor line. At zishi you drove in.";
      return { img: "08-valid.jpg", t: "Trusted the pencil", w: "¥36", p: [howPen, "Oil money was cut. Night line didn't get pressed."] };
    }
    if (id === "late") {
      return {
        img: "09-late.jpg",
        t: "Too late",
        w: "¥0",
        p: [
          "Clock ran out. Key still in the ignition.",
          "Du Heng's paper turned into a hurry slip. Papers still on the passenger seat. No pay."
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
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · twenty-nine · Shuanghekou Town";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var dest = $("dest");
    if (dest) dest.textContent = state.waybill.dest;
    var guest = $("guest");
    if (guest) guest.textContent = state.waybill.guest || "—";
    var role = $("role");
    if (role) role.textContent = roleLabel(state.waybill.role);
    var night = $("night-mark");
    if (night) night.textContent = "Night " + state.night;
    var radio = $("radio");
    if (radio) radio.textContent = D.RADIO[state.night] || "";
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || (D.DISPATCHER + ": mark tonight, then press. Hand the keys. Pay is by valid bill.");
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
      if (id === "A") return "fleet rule and process slips";
      if (id === "B") return "gate SMS and last shift's pencil";
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
      bag.textContent = names.length ? names.join(" · ") : "empty";
    }
    var pair = $("pair-ink");
    if (pair) {
      var bits = [];
      var i;
      for (i = 0; i < state.pairMark.length; i++) {
        var talk = pairTalk(state.pairMark[i].id);
        if (talk) bits.push(talk);
      }
      pair.textContent = bits.length ? "Ink bit " + bits.join(", ") : "Mark two that fight. Ink stays.";
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
    var stillFile = "00-open.jpg";
    if (state.ending === "late") stillFile = "09-late.jpg";
    else if (state.ending) stillFile = "08-valid.jpg";
    else if (state.holding) stillFile = "04-hold.jpg";
    else if (state.pairMark.length) stillFile = "02-pair.jpg";
    if (still) setImg(still, stillFile);
    var stillCap = $("still-bridge");
    if (stillCap) stillCap.textContent = stillBridge(stillFile);
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
        html += '<p class="artifact-translation">' + stillBridge(copy.img) + "</p>" +
          "<p>Pay " + copy.w + "</p>" +
          '<button type="button" id="btn-replay">Another night</button></div>';
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
      if (state.keyHanded) key.textContent = "Keys handed";
      else key.textContent = "Hand the keys";
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
