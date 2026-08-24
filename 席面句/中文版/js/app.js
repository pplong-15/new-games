"use strict";
(function (root) {
  var E = root.XIMIAN_ENGINE;
  var D = root.XIMIAN_DATA;
  var doc = root.document;

  function $(id) { return doc.getElementById(id); }

  function pageById(id) {
    var i;
    for (i = 0; i < D.PAGES.length; i++) {
      if (D.PAGES[i].id === id) return D.PAGES[i];
    }
    return D.PAGES[0];
  }

  function renderPage() {
    var p = pageById(E.state.route);
    var view = $("view");
    if (!view) return;
    view.className = p.skin || "";
    view.innerHTML = "<h2>" + p.title + "</h2>" + p.html;
    var foot = $("page-foot");
    foot.textContent = p.foot ? (p.foot + "/36") : "";
    bindView();
    markTabs();
  }

  function markTabs() {
    var tabs = doc.querySelectorAll(".tab");
    var i, t, r = E.state.route;
    for (i = 0; i < tabs.length; i++) {
      t = tabs[i];
      t.className = "tab" + (t.getAttribute("data-go") === r ? " on" : "");
    }
  }

  function bindView() {
    var words = $("view").querySelectorAll("[data-word]");
    var i;
    for (i = 0; i < words.length; i++) {
      words[i].addEventListener("click", onPickClick);
      if (E.state.bag.indexOf(words[i].getAttribute("data-word")) !== -1) {
        words[i].className += " picked";
      }
    }
    var gos = $("view").querySelectorAll("[data-go]");
    for (i = 0; i < gos.length; i++) {
      gos[i].addEventListener("click", onGo);
    }
  }

  function onPickClick(ev) {
    var id = ev.currentTarget.getAttribute("data-word");
    E.pick(id);
  }

  function onGo(ev) {
    E.openRoute(ev.currentTarget.getAttribute("data-go"));
  }

  function chipHtml(id) {
    var w = E.wordById(id);
    return '<button type="button" class="chip" data-fill="' + id + '">' + (w ? w.surface : id) + "</button>";
  }

  function renderDesk() {
    var bag = $("bag");
    var i, html = "";
    for (i = 0; i < E.state.bag.length; i++) html += chipHtml(E.state.bag[i]);
    if (!html) html = "<span class=\"empty-bag\">袋空</span>";
    bag.innerHTML = html;
    var chips = bag.querySelectorAll("[data-fill]");
    for (i = 0; i < chips.length; i++) chips[i].addEventListener("click", onChip);
    ["who", "whom", "did"].forEach(function (slot) {
      var el = $("slot-" + slot);
      var id = E.state.slots[slot];
      var lab = { who: "谁", whom: "对谁", did: "做什么" }[slot];
      if (slot === "who" && !E.state.flags.whoLabel && !id) {
        el.innerHTML = '<span class="lab">' + lab + "</span>";
      } else {
        el.innerHTML = '<span class="lab">' + lab + "</span> " + (id ? chipHtml(id) : "");
      }
      el.setAttribute("data-slot", slot);
      var inner = el.querySelector("[data-fill]");
      if (inner) {
        inner.addEventListener("click", function () {
          E.fillSlot(slot, null);
        });
      }
    });
    var btn = $("btn-submit");
    var full = !!(E.state.slots.who && E.state.slots.whom && E.state.slots.did);
    if (full && E.state.flags.ending !== "A" && !E.state.flags.timeout) {
      btn.className = "ready";
      btn.textContent = "回传台账";
      btn.disabled = false;
    } else {
      btn.className = "";
      btn.textContent = full ? "回传台账" : "不成组";
      btn.disabled = E.state.flags.ending === "A" || E.state.flags.timeout;
    }
    $("msg").textContent = E.state.lastMessage;
    $("wage").textContent = "¥" + E.state.wage;
    $("clock").textContent = "距十八点 " + E.state.clock + " 秒";
    var still = $("desk-still");
    if (still) still.setAttribute("src", E.state.stillSrc);
    var hits = $("desk-hits");
    if (hits) {
      hits.style.display = /01-xian|02-who/.test(E.state.stillSrc) ? "block" : "none";
    }
    var whoLab = $("who-flag");
    if (whoLab) whoLab.style.display = E.state.flags.whoLabel ? "inline" : "none";
    var pn = $("player-name");
    if (pn) pn.textContent = D.PLAYER;
  }

  var pendingSlot = null;

  function onChip(ev) {
    var id = ev.currentTarget.getAttribute("data-fill");
    if (!pendingSlot) {
      if (!E.state.slots.who) pendingSlot = "who";
      else if (!E.state.slots.whom) pendingSlot = "whom";
      else if (!E.state.slots.did) pendingSlot = "did";
      else pendingSlot = "who";
    }
    E.fillSlot(pendingSlot, id);
    pendingSlot = null;
  }

  function bindDeskHits() {
    var hits = doc.querySelectorAll("#desk-hits [data-word]");
    var i;
    for (i = 0; i < hits.length; i++) {
      hits[i].onclick = onPickClick;
    }
  }

  var clockTimer = null;
  function stopClock() {
    if (clockTimer) { clearInterval(clockTimer); clockTimer = null; }
  }
  function startClock() {
    stopClock();
    clockTimer = setInterval(function () {
      var st = E.state;
      if (!st.entered || st.flags.ending === "A" || st.flags.timeout) {
        stopClock();
        return;
      }
      E.tickClock(1);
    }, 1000);
  }

  function bindSlots() {
    ["who", "whom", "did"].forEach(function (slot) {
      $("slot-" + slot).addEventListener("click", function () {
        pendingSlot = slot;
      });
    });
  }

  function render(state) {
    if (!state.entered) return;
    renderPage();
    renderDesk();
  }

  function enter() {
    var layer = $("title-layer");
    if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
    var app = $("app");
    app.style.display = "block";
    app.className = "show";
    E.enter();
    bindDeskHits();
    startClock();
  }

  function bindChrome() {
    $("btn-submit").addEventListener("click", function () { E.submit(); });
    $("btn-approve").addEventListener("click", function () { E.tryApprove(); });
    bindSlots();
    bindDeskHits();
    var tabs = doc.querySelectorAll("[data-go]");
    var i;
    for (i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener("click", onGo);
    }
    $("replay").addEventListener("click", function () {
      stopClock();
      E.replay();
      if (!$("title-layer")) {
        E.enter();
        bindDeskHits();
        startClock();
      }
    });
  }

  function resumeIfSaved() {
    if (!E.loadPersist || !E.loadPersist()) return false;
    var layer = $("title-layer");
    if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
    var app = $("app");
    app.style.display = "block";
    app.className = "show";
    bindDeskHits();
    if (E.state.entered && E.state.flags.ending !== "A" && !E.state.flags.timeout) startClock();
    render(E.state);
    return true;
  }

  function boot() {
    E.setUi(render);
    bindChrome();
    if (!resumeIfSaved()) {
      $("btn-enter").addEventListener("click", enter);
    }
    var pn = $("player-name");
    if (pn) pn.textContent = D.PLAYER;
    root.__XIMIAN__ = {
      enter: enter,
      pick: function (id) { return E.pick(id); },
      fillSlot: function (a, b) { return E.fillSlot(a, b); },
      submit: function () { return E.submit(); },
      jumpClock: function (n) { return E.jumpClock(n); },
      tickClock: function (n) { return E.tickClock(n); },
      replay: function () { return E.replay(); },
      openRoute: function (id) { return E.openRoute(id); },
      get state() { return E.state; }
    };
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();
})(window);
