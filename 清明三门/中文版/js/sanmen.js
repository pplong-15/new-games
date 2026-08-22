(function () {
  var KEY = "qingming-sanmen-v1";
  var MAX = 3;
  var VERIFY_DOOR = {
    "ash-neighbor": "tousu",
    "gu-private": "qu12",
    "code-martyr": "lie",
    "deliver-12": "song",
    "cross-hexiao": "xiao",
    "same-day": "kao",
    "old-ticket": "han",
    "lore-ghost": "shuo"
  };

  function empty() {
    return { round: 1, opened: [], seen: [], verified: [], thin: null, ending: "" };
  }

  function load() {
    try {
      var s = JSON.parse(localStorage.getItem(KEY) || "null");
      if (!s || typeof s !== "object") return empty();
      if (!s.round) s.round = 1;
      if (!s.opened) s.opened = [];
      if (!s.seen) s.seen = [];
      if (!s.verified) s.verified = [];
      return s;
    } catch (e) {
      return empty();
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function has(arr, id) {
    return arr.indexOf(id) >= 0;
  }

  function canVerify(token) {
    var s = load();
    var door = VERIFY_DOOR[token];
    if (door && !has(s.opened, door)) return { ok: false, why: "closed" };
    if (token === "cross-hexiao") {
      if (has(s.verified, "code-martyr") && has(s.verified, "deliver-12")) return { ok: true };
      return { ok: false, why: "need" };
    }
    if (token === "same-day") {
      if (has(s.verified, "code-martyr") || has(s.verified, "gu-private")) return { ok: true };
      return { ok: false, why: "need" };
    }
    return { ok: true };
  }

  window.Sanmen = {
    KEY: KEY,
    load: load,
    save: save,
    reset: function () {
      localStorage.removeItem(KEY);
    },
    bootFresh: function () {
      localStorage.removeItem(KEY);
      save(empty());
    },
    openDoor: function (id) {
      var s = load();
      if (has(s.opened, id)) return { ok: true, already: true, s: s };
      if (s.opened.length >= MAX) return { ok: false, reason: "full", s: s };
      s.opened.push(id);
      if (!has(s.seen, id)) s.seen.push(id);
      save(s);
      return { ok: true, s: s };
    },
    canRead: function (id) {
      return has(load().opened, id);
    },
    handover: function () {
      var s = load();
      s.opened = [];
      s.round = (s.round || 1) + 1;
      save(s);
      return s;
    },
    verify: function (token) {
      var s = load();
      var chk = canVerify(token);
      if (!chk.ok) return { ok: false, why: chk.why, s: s };
      if (!has(s.verified, token)) s.verified.push(token);
      save(s);
      return { ok: true, s: s };
    },
    canVerify: canVerify,
    hasV: function (token) {
      return has(load().verified, token);
    },
    hasSeenDoor: function (id) {
      return has(load().seen, id);
    },
    isOpen: function (id) {
      return has(load().opened, id);
    },
    submitNote: function (nature, codeTo, goodsTo, action) {
      var s = load();
      s.thin = { nature: nature, codeTo: codeTo, goodsTo: goodsTo, action: action };
      if (action === "change" || action === "pass") {
        s.ending = "overbook";
        save(s);
        return "overbook";
      }
      if (nature === "ghost") {
        s.ending = "ghost";
        save(s);
        return "ghost";
      }
      var need = ["ash-neighbor", "code-martyr", "deliver-12", "cross-hexiao"];
      var okNeed = true;
      for (var i = 0; i < need.length; i++) {
        if (!has(s.verified, need[i])) okNeed = false;
      }
      s.thin.okNeed = okNeed;
      if (nature === "cross" && codeTo === "martyr" && goodsTo === "plot12" && action === "note" && okNeed) {
        s.ending = "note";
        save(s);
        return "note";
      }
      s.ending = "thin";
      save(s);
      return "thin";
    },
    thinHint: function () {
      var s = load();
      var t = s.thin || {};
      if (t.action === "change" || t.action === "pass") return "";
      if (t.nature === "ghost") return "";
      if (!t.okNeed) return "白板上缺句。见过的纸页不能直接写进备注。";
      if (t.nature === "private") return "性质这一栏和核销流水对不上。";
      if (t.nature !== "cross") return "性质这一栏还对不上已采信的句子。";
      if (t.codeTo !== "martyr") return "预约码这一栏和批次对不上。";
      if (t.goodsTo !== "plot12") return "供品去向和配送回执对不上。";
      if (t.action !== "note") return "处置栏越了预约台的权。";
      return "这几栏还没齐，单子退回。";
    },
    labelV: function (token) {
      var map = {
        "ash-neighbor": "邻界有新灰",
        "gu-private": "顾松年是十二区私坟",
        "code-martyr": "码走烈士园集体",
        "deliver-12": "供品落到十二区三十七穴",
        "cross-hexiao": "一码两记，串穴核销",
        "same-day": "清明当天两处要人",
        "old-ticket": "去年寒食十二区有禁烧单",
        "lore-ghost": "有人讲鬼烧邻穴（不能结案）"
      };
      return map[token] || token;
    },
    paintMini: function (el) {
      if (!el) return;
      var s = load();
      el.textContent = "第" + s.round + "班　本班已开" + s.opened.length + "/3　已采信" + s.verified.length + "句";
    },
    doorName: function (id) {
      var map = {
        tousu: "邻穴投诉",
        qu12: "十二区顾户",
        lie: "烈士园集体",
        song: "供品配送",
        xiao: "核销流水",
        kao: "集体考勤",
        han: "寒食旧单",
        shuo: "传说页"
      };
      return map[id] || id;
    },
    paintBoard: function (seenEl, verEl) {
      var s = load();
      if (seenEl) {
        if (!s.seen.length) seenEl.textContent = "还没有打开过户档。";
        else {
          var names = [];
          for (var j = 0; j < s.seen.length; j++) names.push(window.Sanmen.doorName(s.seen[j]));
          seenEl.textContent = names.join("、") + "（见过不等于采信）";
        }
      }
      if (verEl) {
        if (!s.verified.length) verEl.textContent = "空。采信过的句子才留到交班以后。";
        else {
          verEl.innerHTML = "";
          for (var i = 0; i < s.verified.length; i++) {
            var li = document.createElement("div");
            li.textContent = "· " + window.Sanmen.labelV(s.verified[i]);
            verEl.appendChild(li);
          }
        }
      }
    },
    bindVerify: function (btn, token, okEl, badEl) {
      if (!btn) return;
      function refresh() {
        if (window.Sanmen.hasV(token)) {
          btn.disabled = true;
          btn.textContent = "已在白板上";
          if (okEl) okEl.style.display = "block";
          if (badEl) badEl.style.display = "none";
          return;
        }
        var chk = window.Sanmen.canVerify(token);
        if (!chk.ok && chk.why === "need") {
          btn.disabled = true;
          if (badEl) badEl.style.display = "block";
        } else {
          btn.disabled = false;
          if (badEl) badEl.style.display = "none";
        }
      }
      refresh();
      btn.addEventListener("click", function () {
        var r = window.Sanmen.verify(token);
        if (r.ok) refresh();
      });
    },
    gate: function (door, closedId, openId) {
      var closed = document.getElementById(closedId);
      var open = document.getElementById(openId);
      if (window.Sanmen.canRead(door)) {
        if (closed) closed.style.display = "none";
        if (open) open.style.display = "block";
      } else {
        if (closed) closed.style.display = "block";
        if (open) open.style.display = "none";
      }
    }
  };
})();
