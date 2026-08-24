(function () {
  var CAP = 5;
  var lastHits = [];
  var SAVE = "minsheng-v1-en";

  function $(id) {
    return document.getElementById(id);
  }

  function openWin(id) {
    $(id).className = "window show";
  }
  function closeWin(id) {
    $(id).className = "window";
  }

  function compact(s) {
    return String(s == null ? "" : s).replace(/\s+/g, "").toLowerCase();
  }

  function letterOrHanLen(s) {
    var n = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      var isLetter = (c >= 65 && c <= 90) || (c >= 97 && c <= 122);
      var isHan = c >= 0x4e00 && c <= 0x9fff;
      if (isLetter || isHan) n++;
    }
    return n;
  }

  function search(q) {
    q = (q || "").replace(/\s+/g, "");
    if (!q) return { err: "Empty.", total: 0, rows: [] };
    if (letterOrHanLen(q) < 2) return { err: "Too short. At least two letters.", total: 0, rows: [] };
    var needle = q.toLowerCase();
    var hits = [];
    for (var i = 0; i < CLIPS.length; i++) {
      var c = CLIPS[i];
      var hay = compact(c.text) + compact(c.who);
      if (hay.indexOf(needle) >= 0) hits.push(c);
    }
    hits.sort(function (a, b) {
      return a.date === b.date ? (a.id < b.id ? -1 : 1) : a.date < b.date ? -1 : 1;
    });
    return { err: "", total: hits.length, rows: hits.slice(0, CAP), all: hits };
  }

  function renderList(res) {
    var box = $("results");
    box.innerHTML = "";
    if (res.err) {
      $("meta").textContent = res.err;
      return;
    }
    if (!res.total) {
      $("meta").textContent = "0 hits. Try another word.";
      return;
    }
    $("meta").textContent =
      res.total + " hits, listing first " + res.rows.length + "." +
      (res.total > CAP ? " The rest stay dark. Narrow the word." : "");
    lastHits = res.rows;
    for (var i = 0; i < res.rows.length; i++) {
      (function (c) {
        var row = document.createElement("div");
        row.className = "clip-row";
        row.tabIndex = 0;
        row.innerHTML =
          "<img alt=\"\" src=\"" + c.img + "\">" +
          "<div><b>" + c.date + "　" + c.code + "</b>" +
          (MS.isSeen(c.id) ? "　pulled" : "") +
          "<div class=\"who\">" + c.who + "</div>" +
          "<div>" + c.text.slice(0, 72) + "…</div></div>";
        row.onclick = function () { openClip(c); };
        row.onkeydown = function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openClip(c);
          }
        };
        box.appendChild(row);
      })(res.rows[i]);
    }
  }

  function openClip(c) {
    MS.seen(c.id);
    if (c.tokens) {
      for (var i = 0; i < c.tokens.length; i++) MS.grant(c.tokens[i]);
    }
    $("view-osd").textContent = c.date + "　" + c.code + "　" + c.who;
    $("view-img").src = c.img;
    $("view-said").textContent = c.text;
    openWin("win-view");
    refreshCut();
  }

  function refreshCut() {
    var map = {
      milk: ["yingsheng", "zhaozhao", "liusuochang"],
      qitou: ["zhaozhao", "zhouyindi", "touqi"],
      paper: ["piyao"],
      cui: ["laocui", "touqi", "wuyong"]
    };
    Object.keys(map).forEach(function (k) {
      var btn = $("end-" + k);
      if (!btn) return;
      btn.disabled = MS.locked() || !MS.hasAll(map[k]);
    });
  }

  var ENDS = {
    milk: {
      t: "Cut cleared",
      b: "Min Ke cut the Zhaozhao stretch into the ninety seconds. Register name mosaicked. Next day the station said the night-terror debunking was done. That line on the Nanba Zhou register, later, nobody took it."
    },
    qitou: {
      t: "Cut held",
      b: "You spliced the two SeventhDay name-change stretches. Review said it cannot air. Pei Wan was moved to logistics. Zhou Gui later sent word: at least the names got written clear."
    },
    paper: {
      t: "Circular cut",
      b: "You used only the April circular. No talent, no milk name. Director said safe. Those two Zhou-family interviews, as if nobody saw them."
    },
    cui: {
      t: "Kill request filed",
      b: "You used the tape Old Cui marked DoNotUse and wrote a kill slip. Director pulled a backup from the drawer and aired the March 2 Zhaozhao Answer anyway."
    }
  };

  function submit(k) {
    if (MS.locked()) return;
    var spec = ENDS[k];
    if (!spec) return;
    MS.lock(k);
    $("ending-title").textContent = spec.t;
    $("ending-body").textContent = spec.b;
    $("ending").className = "show";
  }

  function boot() {
    $("go").onclick = function () {
      renderList(search($("q").value));
    };
    $("q").onkeydown = function (e) {
      if (e.key === "Enter") renderList(search($("q").value));
    };
    document.querySelectorAll("[data-open]").forEach(function (el) {
      el.onclick = function () { openWin(el.getAttribute("data-open")); };
    });
    document.querySelectorAll("[data-close]").forEach(function (el) {
      el.onclick = function () { closeWin(el.getAttribute("data-close")); };
    });
    $("end-milk").onclick = function () { submit("milk"); };
    $("end-qitou").onclick = function () { submit("qitou"); };
    $("end-paper").onclick = function () { submit("paper"); };
    $("end-cui").onclick = function () { submit("cui"); };
    if (MS.locked()) {
      var spec = ENDS[localStorage.getItem(SAVE) && JSON.parse(localStorage.getItem(SAVE)).lock];
      if (spec) {
        $("ending-title").textContent = spec.t;
        $("ending-body").textContent = spec.b;
        $("ending").className = "show";
      }
    }
    refreshCut();
    $("q").value = "";
    $("q").focus();
  }

  window.MSEngine = { boot: boot, search: search, openClip: openClip };
  document.addEventListener("DOMContentLoaded", boot);
})();
