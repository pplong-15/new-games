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
    if (s.shift > 1 && !hasV(s, "v_obit_chu1")) add("p10-obit.html", "讣告栏（还柜后再调）", []);
    if (s.shift > 1 && !hasV(s, "v_end_chu2")) add("p11-ice.html", "接运条（还柜后再调）", []);
    if (s.shift > 1 && !hasV(s, "v_family_open")) add("p12-chain.html", "郝家接龙（还柜后再调）", []);
    if (s.shift > 2 && !hasV(s, "v_flag_chu1")) add("p15-book.html", "告别厅预约（还柜后再调）", ["v_family_open"]);
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
    if (D.endings[file]) return { ok: false, msg: "这份回执还没开。先去交证实条。" };
    var door = findDoor(s, file);
    if (!door) return { ok: false, msg: "原件已还柜。本班未调这份。" };
    if (!needOk(s, door)) return { ok: false, msg: "这份本班还抽不出来。交班本上缺相应的已证实条。" };
    if (s.opensLeft <= 0) return { ok: false, msg: "本班三份已经调满。要再看，先交班还柜。" };
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
    var bar = document.createElement("div");
    bar.id = "shouqi-bar";
    var chips = s.verified.map(function (id) {
      return "<span class=\"chip\">" + D.claims[id].text + "</span>";
    }).join("");
    bar.innerHTML =
      "<strong>" + (D.shiftName[s.shift] || ("第" + s.shift + "班")) + "</strong>" +
      "<span>本班还可调 " + s.opensLeft + " 份</span>" +
      "<span class=\"chips\">" + (chips || "交班本还空着") + "</span>" +
      "<a href=\"" + p + "pages/p05-desk.html\">值班台</a>" +
      "<a href=\"" + p + "pages/p06-doors.html\">原件柜</a>" +
      "<a href=\"" + p + "pages/p30-form.html\">证实条</a>" +
      "<a href=\"" + p + "index.html\">中心</a>";
    document.body.appendChild(bar);
  }

  function wirePins(s) {
    document.querySelectorAll("button.pin[data-claim]").forEach(function (btn) {
      var id = btn.getAttribute("data-claim");
      if (hasV(s, id)) {
        btn.classList.add("have");
        btn.textContent = "已在交班本";
      }
      btn.onclick = function () {
        if (!D.claims[id]) return;
        if (!canStay(s, fileName()) && !isPublic(fileName())) return;
        if (!hasV(s, id)) s.verified.push(id);
        save(s);
        btn.classList.add("have");
        btn.textContent = "已在交班本";
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
      var extra = locked ? "（交班本不够，抽不出来）" : opened ? "（本班已调，可再看）" : d.sent ? "（本班先调）" : "";
      if (locked) return "<div class=\"" + cls + "\">" + d.label + extra + "</div>";
      return "<a class=\"" + cls + "\" href=\"" + d.file + "\">" + d.label + extra + "</a>";
    }).join("");
  }

  function fillShiftPanel(s) {
    var el = document.getElementById("shift-panel");
    if (!el) return;
    var last = s.shift >= 3 ? "这是末班，不能再还柜。条子写在证实条页。" : "交班会还柜，已证实留在本子上。";
    el.innerHTML =
      "<p>现在是 " + (D.shiftName[s.shift] || "") + "。本班还可调 <b>" + s.opensLeft + "</b> 份原件。" + last + "</p>" +
      "<p>馆内日历写着六月初七。子时铃一响，没交的条按主家走。</p>";
  }

  function fillForm(s) {
    var mount = document.getElementById("claim-form");
    if (!mount) return;
    var rows = s.verified.map(function (id) {
      return "<label class=\"row\"><input type=\"checkbox\" name=\"c\" value=\"" + id + "\"> " + D.claims[id].text + "</label>";
    }).join("");
    if (!rows) rows = "<p>交班本还空着。空条不收。</p>";
    mount.innerHTML =
      rows +
      "<p class=\"feedback\" id=\"form-fb\"></p>" +
      "<p><button type=\"button\" id=\"btn-stop\">建议停开厅</button>" +
      "<button type=\"button\" id=\"btn-open\">建议按主家开厅</button>" +
      "<button type=\"button\" id=\"btn-late\">空条下班</button></p>";
    var fb = document.getElementById("form-fb");
    function picked() {
      return Array.prototype.map.call(mount.querySelectorAll("input:checked"), function (i) { return i.value; });
    }
    function hasAll(need, got) {
      return need.every(function (id) { return got.indexOf(id) !== -1; });
    }
    document.getElementById("btn-stop").onclick = function () {
      var got = picked();
      if (!got.length) { fb.textContent = "空条不收。"; return; }
      if (got.indexOf("v_xiu_unpaid") !== -1 && !hasAll(D.correct, got)) {
        fb.textContent = "礼簿上出嫁女担的是六七。份子对不上今晚该不该开厅。";
        return;
      }
      if (got.indexOf("v_family_open") !== -1 && got.indexOf("v_touqi_chu8") === -1 && !hasAll(D.correct, got)) {
        fb.textContent = "接龙是主张，写不进终期栏。";
        return;
      }
      if (got.indexOf("v_obit_chu1") !== -1 && got.indexOf("v_end_chu2") === -1) {
        fb.textContent = "讣告上的终期，跟接运时刻对不上。";
        return;
      }
      if (!hasAll(D.correct, got)) {
        fb.textContent = "这几条凑在一起还撑不住停厅。缺的是计日，不标哪一条。";
        return;
      }
      s.ending = "stop";
      save(s);
      location.href = "p33-stop.html";
    };
    document.getElementById("btn-open").onclick = function () {
      if (!s.verified.length) { fb.textContent = "空条不收。"; return; }
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
      btn.textContent = "末班不能还柜";
      btn.setAttribute("aria-disabled", "true");
    }
    btn.onclick = function () {
      if (s.shift >= 3) {
        if (fb) fb.textContent = "末班不能还柜。去写证实条，或空条下班。";
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
      el.textContent = "交班本上有：" + chips.join("；") + "。条按主家走了。一号厅今夜设奠。幡面那行小字没人改。接运条还在夹里。";
    }
    if (s.ending === "late") {
      el.textContent = "本子上留着：" + chips.join("；") + "。没成组交，子时按主家开厅。空条的默认跟点过「按主家」同一栏。";
    }
  }

  function fillIntro() {
    var el = document.getElementById("boot-extra");
    if (!el) return;
    if (hasSave()) {
      el.innerHTML =
        "<p><a class=\"enter-link\" href=\"pages/p05-desk.html\">接着上一次</a> " +
        "<button type=\"button\" id=\"btn-reset\">清档重开</button></p>";
    }
  }

  function bounce(msg) {
    var p = rootPrefix();
    document.body.innerHTML =
      "<p class=\"gate-wait\">" + msg + "</p><p><a href=\"" + p + "pages/p06-doors.html\">回原件柜</a>　<a href=\"" + p + "pages/p05-desk.html\">回值班台</a></p>";
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
