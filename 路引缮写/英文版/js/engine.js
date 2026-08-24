(function () {
  var D = window.LUYIN;
  if (!D) return;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(D.saveKey) || "null") || empty();
    } catch (e) {
      return empty();
    }
  }
  function empty() {
    return { bag: [], slots: { who: "", where: "", whom: "", did: "" }, seen: {}, ending: "", hint: 0, pick: "" };
  }
  function save(s) {
    localStorage.setItem(D.saveKey, JSON.stringify(s));
  }
  function has(s, id) {
    return s.bag.indexOf(id) !== -1;
  }
  function flags(s) {
    var f = s.bag.slice();
    if (s.ending === "hold") f.push("_hold");
    if (s.ending === "burn") f.push("_burn");
    return f;
  }
  function canOpen(s, file) {
    var need = D.unlocks[file];
    if (!need || !need.length) return true;
    var f = flags(s);
    return need.every(function (id) { return f.indexOf(id) !== -1; });
  }
  function rootPrefix() {
    var inPages = /\/pages\//.test(location.pathname) || /pages\/[^/]+\.html$/.test(location.href);
    return inPages ? "../" : "";
  }
  function collect(s, id) {
    if (!D.words[id]) return s;
    if (!has(s, id)) s.bag.push(id);
    save(s);
    return s;
  }

  function renderBar(s) {
    var old = document.getElementById("luyin-bar");
    if (old) old.remove();
    var file = (location.pathname.split("/").pop() || "").split("?")[0];
    if (file === "p34-hold.html" || file === "p35-burn.html") return;
    var p = rootPrefix();
    var bar = document.createElement("div");
    bar.id = "luyin-bar";
    var chips = s.bag.map(function (id) {
      var on = s.pick === id ? " on" : "";
      return "<span class=\"chip" + on + "\" data-pick=\"" + id + "\">" + D.words[id].text + "</span>";
    }).join("");
    bar.innerHTML =
      "<strong>Copy bag</strong>" +
      "<span class=\"chips\">" + (chips || "still empty") + "</span>" +
      "<span>picked " + s.bag.length + "</span>" +
      "<a href=\"" + p + "pages/p05-desk.html\">Duty desk</a>" +
      "<a href=\"" + p + "index.html\">Inn</a>";
    document.body.appendChild(bar);
    bar.querySelectorAll("[data-pick]").forEach(function (el) {
      el.onclick = function () {
        s.pick = el.getAttribute("data-pick");
        save(s);
        renderBar(s);
        fillSentence(s);
      };
    });
  }

  function wireWords(s) {
    document.querySelectorAll(".word[data-word]").forEach(function (el) {
      var id = el.getAttribute("data-word");
      if (has(s, id)) el.classList.add("have");
      el.onclick = function (ev) {
        ev.preventDefault();
        collect(s, id);
        el.classList.add("have");
        renderBar(s);
      };
    });
  }

  function wireGates(s) {
    document.querySelectorAll("a.gate[data-file]").forEach(function (a) {
      var file = a.getAttribute("data-file");
      if (canOpen(s, file)) return;
      var span = document.createElement("span");
      span.className = "gate-wait";
      span.textContent = (a.textContent || "attachment") + " (not enough words in the bag)";
      a.parentNode.replaceChild(span, a);
    });
  }

  function same(slots, target) {
    return D.slotOrder.every(function (k) { return slots[k] === target[k]; });
  }

  function fillSentence(s) {
    var mount = document.getElementById("sentence-card");
    if (!mount) return;
    D.slotOrder.forEach(function (k) {
      var cell = mount.querySelector("[data-slot=\"" + k + "\"] .val");
      if (!cell) return;
      var id = s.slots[k];
      cell.textContent = id && D.words[id] ? D.words[id].text : "(pick a bag word, then this field)";
    });
  }

  function wireSentence(s) {
    var mount = document.getElementById("sentence-card");
    if (!mount) return;
    mount.querySelectorAll("[data-slot]").forEach(function (el) {
      el.onclick = function () {
        var k = el.getAttribute("data-slot");
        if (!s.pick) return;
        var w = D.words[s.pick];
        if (!w || w.slots.indexOf(k) === -1) {
          setFb("That word will not go in this field.");
          return;
        }
        s.slots[k] = s.pick;
        save(s);
        fillSentence(s);
      };
    });
    var btn = document.getElementById("submit-sent");
    if (btn) {
      btn.onclick = function () {
        var full = D.slotOrder.every(function (k) { return s.slots[k]; });
        if (!full) {
          setFb("All four fields first.");
          return;
        }
        if (same(s.slots, D.correct)) {
          s.ending = "hold";
          save(s);
          location.href = "p34-hold.html";
          return;
        }
        if (same(s.slots, D.burn)) {
          s.ending = "burn";
          save(s);
          location.href = "p35-burn.html";
          return;
        }
        setFb("These four do not make a line. The register does not mark which field.");
      };
    }
    var hintBtn = document.getElementById("hint-next");
    if (hintBtn) {
      hintBtn.onclick = function () {
        if (s.hint < D.hints.length) s.hint += 1;
        save(s);
        showHints(s);
      };
    }
    fillSentence(s);
    showHints(s);
  }
  function setFb(t) {
    var el = document.getElementById("sent-fb");
    if (el) el.textContent = t;
  }
  function showHints(s) {
    var box = document.getElementById("hint-log");
    if (!box) return;
    box.innerHTML = D.hints.slice(0, s.hint).map(function (h, i) {
      return "<p>" + (i + 1) + ". " + h + "</p>";
    }).join("");
  }

  function boot() {
    var s = load();
    var file = (location.pathname.split("/").pop() || "").split("?")[0];
    if (D.unlocks[file] && !canOpen(s, file)) {
      document.body.innerHTML =
        "<p class=\"gate-wait\">Not enough words in the bag. This file will not come out.</p><p><a href=\"p05-desk.html\">Duty desk</a></p>";
      renderBar(s);
      return;
    }
    var page = document.body.getAttribute("data-page") || "";
    if (page) s.seen[page] = 1;
    save(s);
    renderBar(s);
    wireWords(s);
    wireGates(s);
    wireSentence(s);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
