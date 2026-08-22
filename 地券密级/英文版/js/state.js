/* Anpu digitization desk. Accepts a viewing note only. */
(function (global) {
  var KEY = "anpu-diquan-miji-v1-en";

  var FIELDS = [
    { id: "time", title: "Time" },
    { id: "money", title: "Qianzhu (payer)" },
    { id: "bound", title: "Sizhi (four boundaries)" },
    { id: "guar", title: "Zhongbao (guarantor)" },
    { id: "dead", title: "Wangzhe (the deceased)" }
  ];

  var BLOCKS = {
    "time-public": { field: "time", layer: "public", title: "1983, winter month (dongyue), day 16", from: "public catalog" },
    "time-internal": { field: "time", layer: "internal", title: "1983, winter month (dongyue), day 16; internal year left unchanged", from: "internal catalog" },
    "time-restrict": { field: "time", layer: "restrict", title: "jiazi-year, winter month (dongyue), day 16", from: "restricted catalog" },
    "time-conflict": { field: "time", layer: "mix", title: "Gregorian and ganzhi lines both present; recommend the office recheck", from: "cross-check" },
    "money-public": { field: "money", layer: "public", title: "Hou Wanshi", from: "public catalog" },
    "money-internal": { field: "money", layer: "internal", title: "Hou Wanchuan; memo says the public layer used the elder brother's name", from: "internal catalog" },
    "money-restrict": { field: "money", layer: "restrict", title: "Ge Wanchuan", from: "restricted catalog" },
    "money-conflict": { field: "money", layer: "mix", title: "qianzhu does not match across three layers; recommend the office recheck", from: "cross-check" },
    "bound-public": { field: "bound", layer: "public", title: "east to the stone steps, west to the ditch, south to the old locust, north to the ridge spine", from: "public catalog" },
    "bound-internal": { field: "bound", layer: "internal", title: "east to the Hou house back wall, west to the ditch, south to the old locust, north to the ridge spine", from: "internal catalog" },
    "bound-restrict": { field: "bound", layer: "restrict", title: "east to the back wall of the house now lived in, west to the old canal, south to the locust roots, north to the ridge spine", from: "restricted catalog" },
    "bound-conflict": { field: "bound", layer: "mix", title: "east bound matches only one 1991 notice version; recommend recheck", from: "cross-check" },
    "guar-public": { field: "guar", layer: "public", title: "Houtu deities", from: "public catalog" },
    "guar-internal": { field: "guar", layer: "internal", title: "Shen Jingzhi, then clerk at the Nanling Township office", from: "internal catalog" },
    "guar-restrict": { field: "guar", layer: "restrict", title: "Shen Jingzhi", from: "restricted catalog" },
    "dead-public": { field: "dead", layer: "public", title: "Hou Chengshan", from: "public catalog" },
    "dead-internal": { field: "dead", layer: "internal", title: "Hou Chengshan; memo says buried separately at East Ridge, this field altered later", from: "internal catalog" },
    "dead-restrict": { field: "dead", layer: "restrict", title: "Cen Shoushan", from: "restricted catalog" },
    "dead-conflict": { field: "dead", layer: "mix", title: "public Hou Chengshan, restricted Cen Shoushan; recommend recheck", from: "cross-check" },
    "dead-unique": { field: "dead", layer: "over", title: "on this basis, determine the deceased is Cen Shoushan", from: "overreach" }
  };

  var CRED = {
    internal: { user: "QP-NIGHT-04", pass: "nanshan047" },
    restrict: { user: "QT-RES-07", pass: "jiaojie083" },
    mail: { user: "ye-anpu", pass: "chouti0819" }
  };

  /* Hidden aliases only. Not printed as UI. Login accepts these plus the English typed forms. */
  var USER_ALIAS = {
    internal: ["QP-NIGHT-04", "QP-夜-04"],
    restrict: ["QT-RES-07", "QT-密-07"],
    mail: ["ye-anpu"]
  };

  var FILE_ALIAS = {
    "Anpu-Deed-1983-047": "安档-地券-1983-047",
    "Anpu-Deed-1979-012": "安档-地券-1979-012"
  };

  var HINTS = [
    "The public catalog does not need a badge tonight. Internal and restricted both do. Badges are in the drawer book and in mail. The search box is dead on night shift.",
    "Line up qianzhu and sizhi first. Public and internal are already not the same sentence. The house-plot notice matches only one of the east-bound versions.",
    "The restricted badge is in the day-shift letter. After you get in, line up wangzhe and how time is written. Same names need village and year. Do not merge them.",
    "A viewing note can only recommend. All five boxes need text. If you write the deceased as a unique determination, the system sends it back for a rewrite."
  ];

  function blank() {
    return {
      visited: {},
      extracted: {},
      sess: { internal: false, restrict: false, mail: false },
      picks: { time: "", money: "", bound: "", guar: "", dead: "" },
      hint: 0,
      ending: "",
      closed: false
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      var b = blank();
      Object.keys(b).forEach(function (k) {
        if (s[k] == null) s[k] = b[k];
      });
      if (!s.sess) s.sess = b.sess;
      if (!s.picks) s.picks = b.picks;
      if (!s.extracted) s.extracted = b.extracted;
      if (!s.visited) s.visited = b.visited;
      return s;
    } catch (e) {
      return blank();
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function toast(msg) {
    var old = document.querySelector(".dq-toast");
    if (old) old.parentNode.removeChild(old);
    var el = document.createElement("div");
    el.className = "dq-toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2200);
  }

  function visit(id) {
    var s = load();
    s.visited[id] = true;
    save(s);
    return s;
  }

  function extract(id) {
    if (!BLOCKS[id]) return;
    var s = load();
    s.extracted[id] = true;
    save(s);
    toast("Copied into the duty draft: " + BLOCKS[id].title);
    var n = document.getElementById("dq-draft-n");
    if (n) n.textContent = String(noteCount(s));
    return s;
  }

  function seenField(s, field) {
    var layers = {};
    Object.keys(s.extracted).forEach(function (id) {
      var b = BLOCKS[id];
      if (b && b.field === field && b.layer !== "mix" && b.layer !== "over") layers[b.layer] = true;
    });
    return layers;
  }

  function optionsFor(s, field) {
    var out = [];
    Object.keys(BLOCKS).forEach(function (id) {
      var b = BLOCKS[id];
      if (b.field !== field) return;
      if (b.layer === "mix") {
        if (Object.keys(seenField(s, field)).length >= 2) out.push(id);
        return;
      }
      if (b.layer === "over") {
        if (s.extracted["dead-restrict"]) out.push(id);
        return;
      }
      if (s.extracted[id]) out.push(id);
    });
    return out;
  }

  function noteCount(s) {
    s = s || load();
    var n = 0;
    FIELDS.forEach(function (f) {
      if (s.picks[f.id]) n += 1;
    });
    return n;
  }

  function pickEnding(s) {
    var p = s.picks;
    if (!p.time || !p.money || !p.bound || !p.guar || !p.dead) return "empty";
    if (p.dead === "dead-unique") return "overclaim";
    var guarShen = p.guar === "guar-internal" || p.guar === "guar-restrict";
    if (p.dead === "dead-conflict" && guarShen && s.visited["restricted-047"]) return "three";
    var deepMoney = /internal|restrict|conflict/.test(p.money);
    var deepBound = /internal|restrict|conflict/.test(p.bound);
    if (deepMoney || deepBound) return "internal";
    return "public";
  }

  function submitNote() {
    var s = load();
    var miss = [];
    FIELDS.forEach(function (f) {
      if (!s.picks[f.id]) miss.push(f.title);
    });
    if (miss.length) {
      toast("Still blank: " + miss.join(", "));
      return "";
    }
    s.ending = pickEnding(s);
    s.closed = s.ending !== "overclaim";
    save(s);
    return s.ending;
  }

  function requireSess(kind, deniedHref) {
    var s = load();
    if (s.sess[kind]) return true;
    location.href = deniedHref;
    return false;
  }

  function normUser(kind, user) {
    var u = String(user || "").replace(/^\s+|\s+$/g, "");
    var aliases = USER_ALIAS[kind] || [];
    var i;
    for (i = 0; i < aliases.length; i++) {
      if (u === aliases[i]) return true;
    }
    if (kind === "internal" && u.toUpperCase() === "QP-NIGHT-04") return true;
    if (kind === "restrict" && u.toUpperCase() === "QT-RES-07") return true;
    if (kind === "mail" && u.toLowerCase() === "ye-anpu") return true;
    return false;
  }

  function tryLogin(kind, user, pass) {
    var c = CRED[kind];
    if (!c) return false;
    var p = String(pass || "").replace(/^\s+|\s+$/g, "");
    if (normUser(kind, user) && p === c.pass) {
      var s = load();
      s.sess[kind] = true;
      save(s);
      return true;
    }
    return false;
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function bindLogin(kind, okHref) {
    var form = document.getElementById("dq-login");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var u = document.getElementById("user");
      var p = document.getElementById("pass");
      if (tryLogin(kind, u && u.value, p && p.value)) {
        location.href = okHref;
      } else {
        var err = document.getElementById("dq-err");
        if (err) err.textContent = "Badge ID or password does not match. Type it as written on the paper. Do not change case on the password.";
        toast("Badge ID or password does not match");
      }
    });
  }

  function bindExtract() {
    var nodes = document.querySelectorAll("[data-extract]");
    for (var i = 0; i < nodes.length; i++) {
      (function (btn) {
        btn.addEventListener("click", function () {
          extract(btn.getAttribute("data-extract"));
        });
      })(nodes[i]);
    }
  }

  function bindNote() {
    var box = document.getElementById("dq-note");
    if (!box) return;
    var s = load();
    var html = "";
    FIELDS.forEach(function (f) {
      var opts = optionsFor(s, f.id);
      html += "<fieldset class='dq-fs'><legend>" + f.title + "</legend>";
      if (!opts.length) {
        html += "<p class='dq-empty'>This box has no sentence you can file yet. Read a catalog first, then use Copy into draft on that page.</p>";
      } else {
        opts.forEach(function (id) {
          var b = BLOCKS[id];
          var ck = s.picks[f.id] === id ? " checked" : "";
          html += "<label class='dq-opt'><input type='radio' name='" + f.id + "' value='" + id + "'" + ck + "> " + b.title + " <i>(" + b.from + ")</i></label>";
        });
      }
      html += "</fieldset>";
    });
    html += "<p class='dq-count'>Draft has <b id='dq-draft-n'>" + noteCount(s) + "</b> boxes filled. An empty submit gets sent back.</p>";
    html += "<p><button type='button' class='dq-go' id='dq-submit'>Submit viewing note</button></p>";
    box.innerHTML = html;
    box.addEventListener("change", function (e) {
      var t = e.target;
      if (!t || t.type !== "radio") return;
      var st = load();
      st.picks[t.name] = t.value;
      save(st);
      var n = document.getElementById("dq-draft-n");
      if (n) n.textContent = String(noteCount(st));
    });
    var go = document.getElementById("dq-submit");
    if (go) {
      go.addEventListener("click", function () {
        var end = submitNote();
        if (end) location.href = "result.html";
      });
    }
  }

  function hintText() {
    var s = load();
    var n = s.hint || 0;
    if (n < 1) return "No slip turned yet. One more each time.";
    return HINTS[Math.min(n, HINTS.length) - 1];
  }

  function hintNext() {
    var s = load();
    if (s.hint < HINTS.length) s.hint += 1;
    save(s);
    return hintText();
  }

  global.DQ = {
    FIELDS: FIELDS,
    BLOCKS: BLOCKS,
    FILE_ALIAS: FILE_ALIAS,
    load: load,
    save: save,
    visit: visit,
    extract: extract,
    toast: toast,
    reset: reset,
    requireSess: requireSess,
    tryLogin: tryLogin,
    bindLogin: bindLogin,
    bindExtract: bindExtract,
    bindNote: bindNote,
    noteCount: noteCount,
    pickEnding: pickEnding,
    hintText: hintText,
    hintNext: hintNext,
    optionsFor: optionsFor
  };

  document.addEventListener("DOMContentLoaded", function () {
    bindExtract();
    bindNote();
  });
})(this);
