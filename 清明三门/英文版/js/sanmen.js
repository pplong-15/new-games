(function () {
  var KEY = "qingming-sanmen-v1-en";
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
      if (!t.okNeed) return "The board is missing a sentence. Paper you only saw cannot go into the duty remark.";
      if (t.nature === "private") return "The nature field does not match the checkout ledger.";
      if (t.nature !== "cross") return "The nature field still does not match a verified sentence.";
      if (t.codeTo !== "martyr") return "The reservation-code field does not match the batch.";
      if (t.goodsTo !== "plot12") return "The offerings field does not match the delivery receipt.";
      if (t.action !== "note") return "The action field went past this desk's permission.";
      return "These fields are not aligned. The form comes back.";
    },
    labelV: function (token) {
      var map = {
        "ash-neighbor": "New ash on the neighbor line",
        "gu-private": "Gu Songnian is a Plot 12 private grave",
        "code-martyr": "Code went to the martyrs' terrace collective",
        "deliver-12": "Offerings put down at Plot 12, grave 37",
        "cross-hexiao": "One code, two records — cross-plot checkout",
        "same-day": "Qingming day needs people in two places",
        "old-ticket": "Last Cold Food Day, Plot 12 had a burn-ban ticket",
        "lore-ghost": "People tell a ghost-burn-next-grave story (cannot close the case)"
      };
      return map[token] || token;
    },
    paintMini: function (el) {
      if (!el) return;
      var s = load();
      el.textContent = "Shift " + s.round + " · opened " + s.opened.length + "/3 · " + s.verified.length + " sentences kept";
    },
    doorName: function (id) {
      var map = {
        tousu: "Neighbor-ash complaint",
        qu12: "Plot 12 Gu household",
        lie: "Martyrs' terrace collective",
        song: "Offerings delivery",
        xiao: "Checkout ledger",
        kao: "Collective attendance",
        han: "Cold Food Day old ticket",
        shuo: "Lore page"
      };
      return map[id] || id;
    },
    paintBoard: function (seenEl, verEl) {
      var s = load();
      if (seenEl) {
        if (!s.seen.length) seenEl.textContent = "No household door opened yet.";
        else {
          var names = [];
          for (var j = 0; j < s.seen.length; j++) names.push(window.Sanmen.doorName(s.seen[j]));
          seenEl.textContent = names.join(", ") + " (seen is not verified)";
        }
      }
      if (verEl) {
        if (!s.verified.length) verEl.textContent = "Empty. Only verified sentences stay after handover.";
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
          btn.textContent = "Already on the board";
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
