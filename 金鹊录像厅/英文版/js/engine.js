(function () {
  var META = window.GAME_META;
  var SAVE = META.saveKey;
  var PUBLIC = {};
  META.publicPages.forEach(function (id) { PUBLIC[id] = true; });

  function load() {
    try {
      var raw = localStorage.getItem(SAVE);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      if (!s || s.v !== 1) return blank();
      return s;
    } catch (e) {
      return blank();
    }
  }
  function blank() {
    return { v: 1, unlocked: [], visited: [], facts: [], query: "", logged: false, hint: 0, large: false, reduce: false };
  }
  var state = load();
  function save() {
    localStorage.setItem(SAVE, JSON.stringify(state));
  }
  function prefix() {
    return window.PAGE_DIR === "pages" ? "../" : "";
  }
  function unlock(id) {
    if (state.unlocked.indexOf(id) < 0) state.unlocked.push(id);
  }
  function visit(id) {
    if (state.visited.indexOf(id) < 0) state.visited.push(id);
  }
  function grant(list) {
    (list || []).forEach(function (f) {
      if (state.facts.indexOf(f) < 0) state.facts.push(f);
    });
  }
  function has(f) { return state.facts.indexOf(f) >= 0; }
  function numberedFound() {
    return state.visited.filter(function (id) {
      return window.PAGE_NO_MAP && window.PAGE_NO_MAP[id];
    }).length;
  }
  function footer() {
    var no = window.PAGE_NO ? window.PAGE_NO + "/" + META.totalPages : "Intro";
    var found = numberedFound();
    var html =
      '<footer class="game-ft">' + no +
      " · numbered pages opened " + found + "/" + META.totalPages +
      " · This site is a fictional investigation. Do not match it to real offices or people." +
      (window.PAGE_ID !== "intro" ? ' <a href="' + prefix() + 'introduction.html">Guide</a>' : "") +
      "</footer>";
    document.body.insertAdjacentHTML("beforeend", html);
  }
  function gate() {
    var id = window.PAGE_ID;
    if (!id || PUBLIC[id]) return true;
    if (id === "handbook" || id === "log") {
      if (!state.logged) {
        location.href = prefix() + "pages/login.html";
        return false;
      }
    }
    if (state.unlocked.indexOf(id) < 0) {
      location.href = prefix() + "pages/forbidden.html";
      return false;
    }
    return true;
  }
  function applyChrome() {
    document.documentElement.classList.toggle("large", !!state.large);
    document.documentElement.classList.toggle("reduce", !!state.reduce);
  }
  function bindSearchUnlock() {
    if (window.PAGE_ID !== "search" || !window.WebSkinSearch) return;
    var params = new URLSearchParams(location.search);
    var checked = window.WebSkinSearch.normalizeQuery(params.get("q"));
    if (!checked.ok) return;
    state.query = checked.q;
    var hit = window.WebSkinSearch.lookup(window.KEYWORD_TABLE, checked.q);
    if (hit && hit.forbidden) {
      unlock("forbidden");
      save();
      return;
    }
    if (hit && hit.opens) {
      hit.opens.forEach(unlock);
      save();
    }
    var box = document.querySelector(".box");
    if (box && hit && !hit.forbidden) {
      var extra = "";
      (hit.excerpts || []).forEach(function (ex, i) {
        extra += '<p class="hit-ex">' + escapeHtml(ex) + "</p>";
      });
      if (extra) box.insertAdjacentHTML("beforeend", extra);
    }
  }
  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function bindLogin() {
    var form = document.querySelector("form.login-box");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var user = (form.querySelector("[name=user]") || {}).value || "";
      var pass = (form.querySelector("[name=pass]") || {}).value || "";
      user = user.trim();
      pass = pass.trim();
      var box = form.querySelector(".flash") || document.createElement("p");
      box.className = "flash flash-bad";
      if (!form.querySelector(".flash")) form.appendChild(box);
      var near = window.NEAR_LOGIN || [];
      var i;
      function sameCred(a, b) {
        a = String(a || "").trim();
        b = String(b || "").trim();
        if (a === b) return true;
        return a.toLowerCase() === b.toLowerCase();
      }
      for (i = 0; i < near.length; i++) {
        if (near[i].user && sameCred(user, near[i].user)) { box.textContent = near[i].feedback; return; }
        if (near[i].pass && sameCred(pass, near[i].pass)) { box.textContent = near[i].feedback; return; }
      }
      if ((sameCred(user, "田麦") || sameCred(user, "Tianmai")) &&
          (sameCred(pass, "坐到完") || sameCred(pass, "SitThrough"))) {
        state.logged = true;
        unlock("handbook");
        unlock("log");
        grant(["access_desk"]);
        save();
        location.href = "handbook.html";
        return;
      }
      box.textContent = "Account or passphrase is wrong. The credentials are on pages you already opened, not in the nav.";
    });
  }
  function bindHints() {
    var btn = document.querySelector("[data-act=hint]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      state.hint = Math.min(4, (state.hint || 0) + 1);
      save();
      renderHint();
    });
    renderHint();
  }
  function renderHint() {
    var slot = document.querySelector("[data-hint-slot]");
    if (!slot) return;
    var n = state.hint || 0;
    if (!n) { slot.textContent = "Closed-hall desk still answers. You can ask for a hint. The first three will not name the last buttons."; return; }
    var h = (window.HINTS || []).filter(function (x) { return x.lv === n; })[0];
    slot.textContent = h ? ("Hint " + n + ": " + h.text) : "";
  }
  function bindChoice() {
    document.querySelectorAll("[data-end]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var need = META.endingNeed;
        var ok = need.every(has);
        if (!ok) {
          var miss = document.querySelector("[data-choice-miss]");
          if (miss) miss.textContent = "Not checked off yet. Stub, OldHou, LuXiaotang, EmptySeat, and Tianmai — read all five first.";
          return;
        }
        var which = btn.getAttribute("data-end");
        unlock(which === "a" ? "ending-a" : "ending-b");
        save();
        location.href = which === "a" ? "ending-a.html" : "ending-b.html";
      });
    });
  }
  function bindIntro() {
    document.querySelectorAll("[data-act=new]").forEach(function (b) {
      b.addEventListener("click", function () { location.href = "index.html"; });
    });
    document.querySelectorAll("[data-act=wipe]").forEach(function (b) {
      b.addEventListener("click", function () {
        localStorage.removeItem(SAVE);
        location.reload();
      });
    });
    document.querySelectorAll("[data-opt]").forEach(function (box) {
      var key = box.getAttribute("data-opt");
      box.checked = !!state[key];
      box.addEventListener("change", function () {
        state[key] = box.checked;
        save();
        applyChrome();
      });
    });
  }
  function grantsForPage(id) {
    var map = {
      home: ["lead_home"],
      "blog-jiaoying": ["fact_show"],
      points: ["fact_points"],
      "space-tianmai": ["fact_tian"],
      seats: ["fact_seats"],
      "post-lu": ["fact_lu"],
      desk: ["fact_desk"],
      handbook: ["fact_book"],
      "empty-seat": ["fact_empty"],
      gazetteer: ["fact_place"],
      "obit-hou": ["fact_hou"],
      vault: ["fact_vault"],
      ticket: ["fact_stub"],
      log: ["fact_log"],
      credits: ["fact_credits"],
      forum: ["fact_debt"],
      darkroom: ["fact_dark"],
      classified: ["lead_find"]
    };
    return map[id] || [];
  }
  function boot() {
    applyChrome();
    if (window.PAGE_ID && window.PAGE_ID !== "intro" && !gate()) return;
    if (window.PAGE_ID) visit(window.PAGE_ID);
    grant(grantsForPage(window.PAGE_ID));
    if (window.PAGE_ID === "choice") {
      META.endingNeed.forEach(function () {});
    }
    bindSearchUnlock();
    bindLogin();
    bindHints();
    bindChoice();
    bindIntro();
    footer();
    save();
  }
  window.PAGE_NO_MAP = {
    home: "01", films: "02", hall: "03", snacks: "04", search: "05", help: "06",
    "blog-jiaoying": "07", points: "08", "space-tianmai": "09", seats: "10",
    "post-lu": "11", desk: "12", login: "13", handbook: "14", gazetteer: "15",
    "obit-hou": "16", vault: "17", ticket: "18", credits: "19", choice: "20",
    "blog-night": "21", "mail-lu": "22", album: "23", "mp-close": "24",
    forum: "25", classified: "26", visitors: "27", paused: "28", oral: "29",
    log: "30", darkroom: "31", "empty-seat": "32", "ending-a": "35", "ending-b": "36",
    gift: "34", forbidden: "33"
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
