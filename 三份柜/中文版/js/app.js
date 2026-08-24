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
      html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l2\">看第二层</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"zhang-fees\">诊疗费明细</button>";
    }
    if (r.id === "fang-today" || r.id === "fang-head") {
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-head\">抬头大图</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-body\">方笺中部</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"fang-note\">侧栏留言</button>";
      html += "<button type=\"button\" class=\"ghost\" id=\"btn-export\">另存出门</button>";
    }
    if (r.id === "gui-door") {
      if (E.state.shiftIndex >= 1) {
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-tag\">柜签</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-batch\">影印并置</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"gui-note\">霍成留言</button>";
      } else {
        html += "<p>第一晚这扇只亮到门。交班以后再翻里面。</p>";
      }
    }
    if (r.id === "zhang-door") {
      if (E.state.shiftIndex >= 1) {
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l1\">账第一层</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-lock\">二层锁</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-l2\">看第二层</button>";
        html += "<button type=\"button\" class=\"go\" data-go=\"zhang-fees\">诊疗费明细</button>";
      } else {
        html += "<p>第一晚这扇只亮到门。交班以后再翻账。</p>";
      }
    }
    if (r.id === "home") {
      html += "<button type=\"button\" class=\"go\" data-go=\"about\">诊所简介</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-addr\">西街地址</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-beian\">关于备案</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"public-year\">年检窗口</button>";
    }
    if (r.id === "book") {
      html += "<button type=\"button\" class=\"go\" data-go=\"book-cal\">空日历</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"book-seg\">号段说明</button>";
    }
    if (r.id === "scenic") {
      html += "<button type=\"button\" class=\"go\" data-go=\"scenic-more\">友链展开</button>";
    }
    if (r.id === "notice") {
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-last\">上一班便条</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-payrule\">计件条款</button>";
    }
    if (r.id === "desk-claims" || r.id === "desk") {
      html += "<p>班末交条。要勾已证实。不勾等于没交。</p>";
    }
    if (r.claim && E.canWrite(r.claim)) {
      html += "<button type=\"button\" class=\"write\" data-claim=\"" + r.claim + "\">写入已证实 · " + claimText(r.claim) + "</button>";
    } else if (r.claim && E.state.verified.indexOf(r.claim) !== -1) {
      html += "<p class=\"wrote\">已写入：" + claimText(r.claim) + "</p>";
    }
    if (r.reject) {
      html += "<button type=\"button\" class=\"ghost reject\" data-reject=\"" + r.reject + "\">写入已证实</button>";
    }
    if (r.skin === "fang" || r.skin === "gui" || r.skin === "zhang") {
      html += "<button type=\"button\" class=\"go\" data-go=\"desk\">回值班台</button>";
      html += "<button type=\"button\" class=\"go\" data-go=\"desk-claims\">回交条</button>";
    }
    if (r.id === "desk-end-a" || r.id === "desk-end-b" || r.id === "desk-late") {
      html += "<button type=\"button\" class=\"write\" id=\"btn-replay\">再值一晚</button>";
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
        view.innerHTML = "<h1>拒条</h1><p>" + (state.lastMessage || "") + "</p><p>不改班末号。已证实不动。</p><button type=\"button\" class=\"go\" data-go=\"desk\">回值班台</button>";
      }
      if (foot) foot.textContent = "";
    } else if (state.route === "notfound") {
      if (view) {
        view.className = "page skin-ex";
        view.innerHTML = "<h1>无此值班页</h1><p>这条路径没有对应值班页。</p><button type=\"button\" class=\"go\" data-go=\"desk\">回值班台</button>";
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
        }
        view.innerHTML = html;
      }
      if (foot) foot.textContent = r.foot || "";
      if (still) {
        if (r.skin === "desk" && r.still) still.src = r.still;
        else still.src = "jpeg/00-open.jpg";
      }
    }

    if (clock) clock.textContent = "交班钟 " + state.clock + " 秒";
    if (wage) wage.textContent = "¥" + E.payNow();
    if (msg) msg.textContent = state.lastMessage || "";

    function fillCol(el, items, asClaim) {
      if (!el) return;
      el.innerHTML = "";
      var i, p;
      if (!items.length) {
        p = doc.createElement("span");
        p.className = "empty-hint";
        p.textContent = asClaim ? "空。写下才留。" : "空。交班会清。";
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
      claimsBox.innerHTML = state.verified.length ? "<p class=\"claim-hint\">要勾。不勾等于没交。零条也是一种交。</p>" : "<p class=\"claim-hint\">栏空着也能交。</p>";
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
