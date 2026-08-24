"use strict";
(function (root) {
  var D = root.SANFEN_DATA;
  var E = root.SANFEN_ENGINE;
  var doc = root.document;
  var tickTimer = null;

  function $(id) { return doc.getElementById(id); }

  function claimText(id) {
    var c = E.claimById(id);
    return c ? c.text : id;
  }

  function routeTitle(id) {
    var r = E.routeById(id);
    return r ? r.title : id;
  }

  function killTitle() {
    var layer = $("title-layer");
    if (layer && layer.parentNode) layer.parentNode.removeChild(layer);
  }

  function paras(arr) {
    var i, html = "";
    for (i = 0; i < arr.length; i++) html += "<p>" + arr[i] + "</p>";
    return html;
  }

  function extraNav(r) {
    var html = "";
    if (r.id === "zhang-lock" || r.id === "zhang-l1" || r.id === "zhang-fees") {
      html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l2\">Open layer two</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"zhang-fees\">Consult-fee detail</button>";
    }
    if (r.id === "fang-today" || r.id === "fang-head") {
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-head\">Header close-up</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-body\">Prescription mid-page</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-note\">Sidebar note</button>";
      html += "<button type=\"button\" class=\"ghost\" id=\"btn-export\">Save a copy out the door</button>";
    }
    if (r.id === "gui-door") {
      if (E.state.shiftIndex >= 1) {
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-tag\">Cabinet tag</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-batch\">Photocopy side by side</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-note\">Huo Cheng’s note</button>";
      } else {
        html += "<p>First night this door only lights to the door. After handoff you can turn the inside.</p>";
      }
    }
    if (r.id === "zhang-door") {
      if (E.state.shiftIndex >= 1) {
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l1\">Ledger layer one</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-lock\">Layer-two lock</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l2\">Open layer two</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-fees\">Consult-fee detail</button>";
      } else {
        html += "<p>First night this door only lights to the door. After handoff you can turn the ledger.</p>";
      }
    }
    if (r.id === "home") {
      html += "<button type=\"button\" class=\"go\" data-go=\"about\">Clinic brief</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-addr\">West Street address</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-beian\">About filing</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-year\">Year-check window</button>";
    }
    if (r.id === "book") {
      html += "<button type=\"button\" class=\"go\" data-go=\"book-cal\">Empty calendar</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"book-seg\">Number-range note</button>";
    }
    if (r.id === "scenic") {
      html += "<button type=\"button\" class=\"go\" data-go=\"scenic-more\">Friend-link expand</button>";
    }
    if (r.id === "notice") {
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-last\">Last-shift scrap</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-payrule\">Piece-rate terms</button>";
    }
    if (r.id === "desk-claims" || r.id === "desk") {
      html += "<p>End-of-shift hand-over. Tick proven. No tick means not handed over.</p>";
    }
    if (r.claim && E.canWrite(r.claim)) {
      html += "<button type=\"button\" class=\"write\" data-claim=\"" + r.claim + "\">Write to proven · " + claimText(r.claim) + "</button>";
    } else if (r.claim && E.state.verified.indexOf(r.claim) !== -1) {
      html += "<p class=\"wrote\">Already written: " + claimText(r.claim) + "</p>";
    }
    if (r.reject) {
      html += "<button type=\"button\" class=\"ghost reject\" data-reject=\"" + r.reject + "\">Write to proven</button>";
    }
    if (r.skin === "fang" || r.skin === "gui" || r.skin === "zhang") {
      html += "<button type=\"button\" class=\"go\" data-go=\"desk\">Back to desk</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-claims\">Back to hand-over</button>";
    }
    if (r.id === "desk-end-a" || r.id === "desk-end-b" || r.id === "desk-late") {
      html += "<button type=\"button\" class=\"write\" id=\"btn-replay\">Work another night</button>";
    }
    return html;
  }

  function render(state) {
    E.refreshState();
    state = E.state;
    if (!state.entered) return;

    var view = $("view");
    var r = E.routeById(state.route);
    var foot = $("page-foot");
    var still = $("desk-still");
    var msg = $("msg");
    var clock = $("clock");
    var wage = $("wage");
    var seenBox = $("col-seen");
    var verBox = $("col-verified");
    var claimsBox = $("claims-list");
    var appEl = $("app");
    if (appEl) appEl.setAttribute("data-skin", r ? r.skin : "desk");

    if (state.route === "ex-export" || state.route === "ex-approve") {
      if (view) {
        view.className = "page skin-ex";
        view.innerHTML = "<h1>Slip refused</h1><p>" + (state.lastMessage || "") + "</p><p>End-of-shift number unchanged. Proven stays.</p><button type=\"button\" class=\"go\" data-go=\"desk\">Back to desk</button>";
      }
      if (foot) foot.textContent = "";
    } else if (state.route === "notfound") {
      if (view) {
        view.className = "page skin-ex";
        view.innerHTML = "<h1>No such duty page</h1><p>This path has no duty page.</p><button type=\"button\" class=\"go\" data-go=\"desk\">Back to desk</button>";
      }
      if (foot) foot.textContent = "";
    } else if (r) {
      if (view) {
        view.className = "page skin-" + r.skin;
        var html = "<h1>" + r.title + "</h1>";
        if (r.bodyFn === "A") html += paras(D.endingA(state));
        else if (r.bodyFn === "B" || r.bodyFn === "late") html += paras(D.endingB(state));
        else if (r.html) html += "<div class=\"body\">" + r.html + "</div>";
        else html += "<p class=\"body\">" + r.body + "</p>";
        var src = E.sourceByRoute(r.id);
        if (src && src.limits) html += "<p class=\"limits\">" + src.limits + "</p>";
        html += extraNav(r);
        if (r.still && r.skin !== "desk") {
          html += "<p class=\"page-still\"><img src=\"" + r.still + "\" alt=\"" + r.title + "\"></p>";
          if (D.STILL_CAPTIONS && D.STILL_CAPTIONS[r.still]) {
            html += "<p class=\"artifact-translation\">" + D.STILL_CAPTIONS[r.still] + "</p>";
          }
        }
        view.innerHTML = html;
      }
      if (foot) foot.textContent = r.foot || "";
      if (still) {
        if (r.skin === "desk" && r.still) still.src = r.still;
        else still.src = "jpeg/00-open.jpg";
        var capEl = $("desk-still-caption");
        var capSrc = still.getAttribute("src");
        if (capEl && D.STILL_CAPTIONS && D.STILL_CAPTIONS[capSrc]) {
          capEl.textContent = D.STILL_CAPTIONS[capSrc];
        }
      }
    }

    if (clock) clock.textContent = "Handoff clock " + state.clock + " s";
    if (wage) wage.textContent = "¥" + E.payNow();
    if (msg) msg.textContent = state.lastMessage || "";

    function fillCol(el, items, asClaim) {
      if (!el) return;
      el.innerHTML = "";
      var i, p;
      if (!items.length) {
        p = doc.createElement("span");
        p.className = "empty-hint";
        p.textContent = asClaim ? "Empty. Writing is what stays." : "Empty. Handoff will clear it.";
        el.appendChild(p);
        return;
      }
      for (i = 0; i < items.length; i++) {
        p = doc.createElement("button");
        p.type = "button";
        if (asClaim) {
          p.textContent = claimText(items[i]);
          p.setAttribute("data-claim", items[i]);
          p.className = "chip ver";
        } else {
          p.textContent = routeTitle(items[i]);
          p.setAttribute("data-seen", items[i]);
          p.className = "chip open";
        }
        el.appendChild(p);
      }
    }
    fillCol(seenBox, state.seen, false);
    fillCol(verBox, state.verified, true);

    if (claimsBox) {
      claimsBox.innerHTML = state.verified.length ? "<p class=\"claim-hint\">Tick. No tick means not handed over. Zero slips is also a hand-over.</p>" : "<p class=\"claim-hint\">An empty column can still be handed over.</p>";
      var v, lab, cb;
      for (v = 0; v < state.verified.length; v++) {
        lab = doc.createElement("label");
        cb = doc.createElement("input");
        cb.type = "checkbox";
        cb.setAttribute("data-claim", state.verified[v]);
        if (state.claimsTonight.indexOf(state.verified[v]) !== -1) cb.checked = true;
        if (state.claimsTonight.length >= D.CLAIM_CAP && !cb.checked) cb.disabled = true;
        if (state.ended) cb.disabled = true;
        lab.appendChild(cb);
        lab.appendChild(doc.createTextNode(claimText(state.verified[v])));
        claimsBox.appendChild(lab);
      }
    }

    var doorFang = $("door-fang");
    var doorGui = $("door-gui");
    var doorZhang = $("door-zhang");
    if (doorFang) doorFang.className = "door" + (state.shiftIndex === 0 || state.openDoor === "fang" ? " lit" : "");
    if (doorGui) doorGui.className = "door" + (state.shiftIndex === 0 ? " dim" : (state.openDoor === "gui" ? " lit" : ""));
    if (doorZhang) {
      doorZhang.className = "door" + (state.shiftIndex === 0 ? " dimmer" : (state.openDoor === "zhang" ? " lit" : ""));
      if (state.shiftIndex === 0) doorZhang.setAttribute("data-nol2", "1");
      else doorZhang.removeAttribute("data-nol2");
    }

    var hand = $("btn-handoff");
    var sub = $("btn-submit");
    var appr = $("btn-approve");
    if (hand) hand.disabled = !!state.ended;
    if (sub) sub.disabled = !!state.ended;
    if (appr) appr.disabled = !!state.ended;
  }

  function onClick(ev) {
    var t = ev.target;
    if (!t) return;
    if (t.id === "btn-enter") {
      E.enter();
      killTitle();
      render(E.state);
      return;
    }
    if (t.id === "btn-handoff") {
      E.handoff();
      return;
    }
    if (t.id === "btn-submit") {
      E.submitClaims();
      return;
    }
    if (t.id === "btn-approve") {
      E.approveStock();
      return;
    }
    if (t.id === "btn-export") {
      E.exportOut();
      return;
    }
    if (t.id === "btn-replay") {
      E.replay();
      if (root.location && root.location.reload) root.location.reload();
      return;
    }
    if (t.id === "door-fang") { E.openDoor("fang"); return; }
    if (t.id === "door-gui") { E.openDoor("gui"); return; }
    if (t.id === "door-zhang") { E.openDoor("zhang"); return; }
    if (t.classList && t.classList.contains("write") && t.getAttribute("data-claim")) {
      E.writeClaim(t.getAttribute("data-claim"));
      return;
    }
    if (t.classList && t.classList.contains("reject")) {
      E.tryReject(t.getAttribute("data-reject"));
      return;
    }
    if (t.classList && t.classList.contains("go")) {
      E.openRoute(t.getAttribute("data-go"));
      return;
    }
    if (t.classList && t.classList.contains("tab")) {
      E.openRoute(t.getAttribute("data-go"));
      return;
    }
    if (t.getAttribute && t.getAttribute("data-seen")) {
      E.tryDragSeen();
      return;
    }
    if (t.tagName === "INPUT" && t.getAttribute("data-claim")) {
      E.toggleClaim(t.getAttribute("data-claim"));
    }
  }

  function onSearch(ev) {
    if (ev) ev.preventDefault();
    E.openRoute("search-closed");
    return false;
  }

  function boot() {
    E.setUi(render);
    E.load();
    doc.addEventListener("click", onClick);
    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.addEventListener("click", onClick);
    var form = $("site-search");
    if (form) form.addEventListener("submit", onSearch);
    tickTimer = root.setInterval(function () {
      if (E.state.entered && !E.state.ended) E.tickClock(1);
    }, 1000);
    if (E.state.entered) killTitle();
    render(E.state);
  }

  if (doc.readyState === "loading") doc.addEventListener("DOMContentLoaded", boot);
  else boot();

  root.__SANFEN__ = {
    get state() { return E.state; },
    enter: function () { E.enter(); killTitle(); render(E.state); },
    openRoute: E.openRoute,
    openDoor: E.openDoor,
    writeClaim: E.writeClaim,
    handoff: E.handoff,
    submitClaims: E.submitClaims,
    toggleClaim: E.toggleClaim,
    tickClock: E.tickClock,
    jumpClock: E.jumpClock,
    tryDragSeen: E.tryDragSeen,
    tryReject: E.tryReject,
    exportOut: E.exportOut,
    approveStock: E.approveStock,
    canOpenL2: E.canOpenL2,
    endingParagraphs: E.endingParagraphs,
    replay: function () { E.replay(); },
    render: render
  };
})(typeof window !== "undefined" ? window : global);
