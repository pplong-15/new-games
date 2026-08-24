(function () {
  var D = window.SHOUQI;
  if (!D) return;

  function load() {
    try {
      return JSON.parse(localStorage.getItem(D.saveKey) || "null") || empty();
    } catch (e) {
      return empty();
    }
  }
  function empty() {
    return {
      shift: 1,
      opensLeft: 3,
      verified: [],
      openedThisShift: [],
      seen: {},
      ending: "",
      hint: 0
    };
  }
  function save(s) {
    localStorage.setItem(D.saveKey, JSON.stringify(s));
  }
  function clearSave() {
    localStorage.removeItem(D.saveKey);
  }
  function fileName() {
    return (location.pathname.split("/").pop() || "").split("?")[0] || "index.html";
  }
  function rootPrefix() {
    var inPages = /\/pages\//.test(location.pathname) || /pages\/[^/]+\.html$/.test(location.href);
    return inPages ? "../" : "";
  }
  function isPublic(file) {
    return D.publicFiles.indexOf(file) !== -1;
  }
  function hasV(s, id) {
    return s.verified.indexOf(id) !== -1;
  }
  function hasSave() {
    try {
      var raw = localStorage.getItem(D.saveKey);
      if (!raw) return false;
      var s = JSON.parse(raw);
      return !!(s && (s.verified.length || s.shift > 1 || s.openedThisShift.length || s.ending || s.hint));
    } catch (e) {
      return false;
    }
  }
  function doorsNow(s) {
    var list = (D.doors[s.shift] || []).slice();
    function add(file, label, need) {
      for (var i = 0; i < list.length; i++) if (list[i].file === file) return;
      list.unshift({ file: file, label: label, sent: false, need: need || [] });
    }
    if (s.shift > 1 && !hasV(s, "v_obit_chu1")) add("p10-obit.html", "Obituary board (pull again after return)", []);
    if (s.shift > 1 && !hasV(s, "v_end_chu2")) add("p11-ice.html", "Transfer slip (pull again after return)", []);
    if (s.shift > 1 && !hasV(s, "v_family_open")) add("p12-chain.html", "Hao family chain (pull again after return)", []);
    if (s.shift > 2 && !hasV(s, "v_flag_chu1")) add("p15-book.html", "Farewell hall booking (pull again after return)", ["v_family_open"]);
    return list;
  }
  function findDoor(s, file) {
    var list = doorsNow(s);
    for (var i = 0; i < list.length; i++) if (list[i].file === file) return list[i];
    return null;
  }
  function parentOpen(s, file) {
    var ch = D.children || {};
    for (var k in ch) {
      if (ch[k].indexOf(file) !== -1 && s.openedThisShift.indexOf(k) !== -1) return true;
    }
    return false;
  }
  function canStay(s, file) {
    if (isPublic(file)) return true;
    if (s.openedThisShift.indexOf(file) !== -1) return true;
    if (parentOpen(s, file)) return true;
    if (D.endings[file] && s.ending === D.endings[file]) return true;
    return false;
  }
  function needOk(s, door) {
    var need = door.need || [];
    for (var i = 0; i < need.length; i++) if (!hasV(s, need[i])) return false;
    return true;
  }
  function tryOpen(s, file) {
    if (canStay(s, file)) return { ok: true, s: s };
    if (D.endings[file]) return { ok: false, msg: "This receipt is not open yet. Hand in the proven slip first." };
    var door = findDoor(s, file);
    if (!door) return { ok: false, msg: "The original has been returned. This shift did not pull this file." };
    if (!needOk(s, door)) return { ok: false, msg: "This shift still cannot pull this file. The shift book is missing the matching proven slip." };
    if (s.opensLeft <= 0) return { ok: false, msg: "This shift already pulled three files. To look again, hand over and return the cabinet first." };
    s.opensLeft -= 1;
    s.openedThisShift.push(file);
    save(s);
    return { ok: true, s: s };
  }

  function renderBar(s) {
    var old = document.getElementById("shouqi-bar");
    if (old) old.remove();
    var file = fileName();
    if (file === "introduction.html") return;
    if (D.endings && D.endings[file]) return;
    var p = rootPrefix();
    var chips = s.verified.map(function (id) {
      return "<span class=\"chip\">" + D.claims[id].text + "</span>";
    }).join("");
    var bar = document.createElement("div");
    bar.id = "shouqi-bar";
    bar.innerHTML =
      "<strong>" + (D.shiftName[s.shift] || ("Shift " + s.shift)) + "</strong>" +
      "<span>This shift can still pull " + s.opensLeft + " files</span>" +
      "<span class=\"chips\">" + (chips || "Shift book is still empty") + "</span>" +
      "<a href=\"" + p + "pages/p05-desk.html\">Duty desk</a>" +
      "<a href=\"" + p + "pages/p06-doors.html\">Originals</a>" +
      "<a href=\"" + p + "pages/p30-form.html\">Proven slip</a>" +
      "<a href=\"" + p + "index.html\">Center</a>";
    document.body.appendChild(bar);
  }

  function wirePins(s) {
    document.querySelectorAll("button.pin[data-claim]").forEach(function (btn) {
      var id = btn.getAttribute("data-claim");
      if (hasV(s, id)) {
        btn.classList.add("have");
        btn.textContent = "Already in the shift book";
      }
      btn.onclick = function () {
        if (!D.claims[id]) return;
        if (!canStay(s, fileName()) && !isPublic(fileName())) return;
        if (!hasV(s, id)) s.verified.push(id);
        save(s);
        btn.classList.add("have");
        btn.textContent = "Already in the shift book";
        renderBar(s);
        fillDoors(s);
        fillForm(s);
      };
    });
  }

  function fillDoors(s) {
    var mount = document.getElementById("door-list");
    if (!mount) return;
    mount.innerHTML = doorsNow(s).map(function (d) {
      var locked = !needOk(s, d);
      var opened = s.openedThisShift.indexOf(d.file) !== -1;
      var cls = "door-card" + (d.sent && s.shift === 1 ? " sent" : "") + (locked ? " wait" : "");
      var extra = locked ? " (shift book is short; cannot pull)" : opened ? " (already pulled this shift; can look again)" : d.sent ? " (pull first this shift)" : "";
      if (locked) return "<div class=\"" + cls + "\">" + d.label + extra + "</div>";
      return "<a class=\"" + cls + "\" href=\"" + d.file + "\">" + d.label + extra + "</a>";
    }).join("");
  }

  function fillShiftPanel(s) {
    var el = document.getElementById("shift-panel");
    if (!el) return;
    var last = s.shift >= 3 ? "This is the last shift. The cabinet cannot be returned again. Write the slip on the proven-slip page." : "Handover returns the cabinet. What is proven stays in the book.";
    el.innerHTML =
      "<p>Now: " + (D.shiftName[s.shift] || "") + ". This shift can still pull <b>" + s.opensLeft + "</b> originals. " + last + "</p>" +
      "<p>The house calendar says the 7th of the sixth month. When the zi-hour bell rings, any slip not handed in follows the family.</p>";
  }

  function fillForm(s) {
    var mount = document.getElementById("claim-form");
    if (!mount) return;
    var rows = s.verified.map(function (id) {
      return "<label class=\"row\"><input type=\"checkbox\" name=\"c\" value=\"" + id + "\"> " + D.claims[id].text + "</label>";
    }).join("");
    if (!rows) rows = "<p>Shift book is still empty. Empty slips are not taken.</p>";
    mount.innerHTML =
      rows +
      "<p class=\"feedback\" id=\"form-fb\"></p>" +
      "<p><button type=\"button\" id=\"btn-stop\">Recommend stop-opening</button>" +
      "<button type=\"button\" id=\"btn-open\">Recommend open as the family asks</button>" +
      "<button type=\"button\" id=\"btn-late\">Clock out on an empty slip</button></p>";
    var fb = document.getElementById("form-fb");
    function picked() {
      return Array.prototype.map.call(mount.querySelectorAll("input:checked"), function (i) { return i.value; });
    }
    function hasAll(need, got) {
      return need.every(function (id) { return got.indexOf(id) !== -1; });
    }
    document.getElementById("btn-stop").onclick = function () {
      var got = picked();
      if (!got.length) { fb.textContent = "Empty slips are not taken."; return; }
      if (got.indexOf("v_xiu_unpaid") !== -1 && !hasAll(D.correct, got)) {
        fb.textContent = "On the gift ledger a married-out daughter carries the sixth seven. The share does not decide whether the hall opens tonight.";
        return;
      }
      if (got.indexOf("v_family_open") !== -1 && got.indexOf("v_touqi_chu8") === -1 && !hasAll(D.correct, got)) {
        fb.textContent = "The chain is a claim. It does not go in the end-date field.";
        return;
      }
      if (got.indexOf("v_obit_chu1") !== -1 && got.indexOf("v_end_chu2") === -1) {
        fb.textContent = "The end-date on the obituary does not match the transfer time.";
        return;
      }
      if (!hasAll(D.correct, got)) {
        fb.textContent = "These slips together still cannot carry a stop-opening. What is missing is the day-count. This form will not mark which line.";
        return;
      }
      s.ending = "stop";
      save(s);
      location.href = "p33-stop.html";
    };
    document.getElementById("btn-open").onclick = function () {
      if (!s.verified.length) { fb.textContent = "Empty slips are not taken."; return; }
      s.ending = "open";
      save(s);
      location.href = "p34-open.html";
    };
    document.getElementById("btn-late").onclick = function () {
      s.ending = "late";
      save(s);
      location.href = "p35-late.html";
    };
  }

  function wireHandover(s) {
    var btn = document.getElementById("btn-handover");
    if (!btn) return;
    var fb = document.getElementById("handover-fb");
    if (s.shift >= 3) {
      btn.textContent = "Last shift cannot return the cabinet";
      btn.setAttribute("aria-disabled", "true");
    }
    btn.onclick = function () {
      if (s.shift >= 3) {
        if (fb) fb.textContent = "Last shift cannot return the cabinet. Go write the proven slip, or clock out on an empty slip.";
        return;
      }
      s.shift += 1;
      s.opensLeft = 3;
      s.openedThisShift = [];
      save(s);
      location.href = "p28-handover.html";
    };
  }

  function showHints(s) {
    var box = document.getElementById("hint-log");
    if (!box) return;
    box.innerHTML = D.hints.slice(0, s.hint).map(function (h, i) {
      return "<p>" + (i + 1) + ". " + h + "</p>";
    }).join("");
    var b = document.getElementById("hint-next");
    if (b) {
      b.onclick = function () {
        if (s.hint < D.hints.length) s.hint += 1;
        save(s);
        showHints(s);
      };
    }
  }

  function wireReset() {
    var p = rootPrefix();
    document.querySelectorAll("#btn-reset").forEach(function (btn) {
      btn.onclick = function () {
        clearSave();
        location.href = p + "introduction.html";
      };
    });
  }

  function fillEndingWhy(s) {
    var el = document.getElementById("ending-why");
    if (!el) return;
    var chips = (s.verified || []).map(function (id) {
      return D.claims[id] ? D.claims[id].text : "";
    }).filter(Boolean);
    if (!chips.length) return;
    if (s.ending === "open") {
      el.textContent = "On the shift book: " + chips.join("; ") + ". The slip followed the family. Hall 1 holds the offering tonight. Nobody changed the small line on the banners. The transfer slip is still in the folder.";
    }
    if (s.ending === "late") {
      el.textContent = "The book still holds: " + chips.join("; ") + ". No set was handed in. At zi hour the hall opens as the family asked. Empty-slip default sits in the same column as clicking open-as-family.";
    }
  }

  function fillIntro() {
    var el = document.getElementById("boot-extra");
    if (!el) return;
    if (hasSave()) {
      el.innerHTML =
        "<p><a class=\"enter-link\" href=\"pages/p05-desk.html\">Continue last save</a> " +
        "<button type=\"button\" id=\"btn-reset\">Wipe save and restart</button></p>";
    }
  }

  function bounce(msg) {
    var p = rootPrefix();
    document.body.innerHTML =
      "<p class=\"gate-wait\">" + msg + "</p><p><a href=\"" + p + "pages/p06-doors.html\">Back to originals</a>　<a href=\"" + p + "pages/p05-desk.html\">Back to the duty desk</a></p>";
  }

  function boot() {
    var s = load();
    var file = fileName();
    if (file === "introduction.html") {
      fillIntro();
      wireReset();
      return;
    }
    var opened = tryOpen(s, file);
    if (!opened.ok) {
      bounce(opened.msg);
      renderBar(s);
      return;
    }
    s = opened.s;
    var page = document.body.getAttribute("data-page") || "";
    if (page) s.seen[page] = 1;
    save(s);
    renderBar(s);
    wirePins(s);
    fillDoors(s);
    fillShiftPanel(s);
    fillForm(s);
    fillEndingWhy(s);
    wireHandover(s);
    showHints(s);
    wireReset();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
