(function () {
  var CAP = 5;
  var lastHits = [];

  function $(id) {
    return document.getElementById(id);
  }

  function openWin(id) {
    $(id).className = "window show";
  }
  function closeWin(id) {
    $(id).className = "window";
  }

  function hanOnly(s) {
    return /^[\u4e00-\u9fff]+$/.test(s);
  }

  function search(q) {
    q = (q || "").replace(/\s+/g, "");
    if (!q) return { err: "空的。", total: 0, rows: [] };
    if (!hanOnly(q)) return { err: "本库逐字稿只有汉字。", total: 0, rows: [] };
    if (q.length < 2) return { err: "太短。至少两个字。", total: 0, rows: [] };
    var hits = [];
    for (var i = 0; i < CLIPS.length; i++) {
      var c = CLIPS[i];
      if ((c.text && c.text.indexOf(q) >= 0) || (c.who && c.who.indexOf(q) >= 0)) {
        hits.push(c);
      }
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
      $("meta").textContent = "0 条。换一个词。";
      return;
    }
    $("meta").textContent =
      "共 " + res.total + " 条，只列出前 " + res.rows.length + " 条。" +
      (res.total > CAP ? "后面的不亮。换更窄的词。" : "");
    lastHits = res.rows;
    for (var i = 0; i < res.rows.length; i++) {
      (function (c) {
        var row = document.createElement("div");
        row.className = "clip-row";
        row.tabIndex = 0;
        row.innerHTML =
          "<img alt=\"\" src=\"" + c.img + "\">" +
          "<div><b>" + c.date + "　" + c.code + "</b>" +
          (MS.isSeen(c.id) ? "　已调" : "") +
          "<div class=\"who\">" + c.who + "</div>" +
          "<div>" + c.text.slice(0, 36) + "…</div></div>";
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
      t: "成片过了",
      b: "闵科把招招那段切进九十秒。谱名打了马赛克。第二天台里说夜惊辟谣完成。南坝周家谱上那行，后来没人应。"
    },
    qitou: {
      t: "成片被扣",
      b: "你把头七换名两段并切。审查说不能播。裴晚被调去后勤。周桂后来托人带话，说至少名分写清了。"
    },
    paper: {
      t: "公文成片",
      b: "你只用四月通稿。没有出镜人，没有乳名。主任说安全。周家这两次采访，等于没被看见。"
    },
    cui: {
      t: "申请停播",
      b: "你采用老崔标了勿用的带子，写了停播条。主任从抽屉里拿出备份，照样播了三月二日应招招那条。"
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
      var spec = ENDS[localStorage.getItem("minsheng-v1") && JSON.parse(localStorage.getItem("minsheng-v1")).lock];
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
