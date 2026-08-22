/* 安浦数字化室。只收查阅备注。 */
(function (global) {
  var KEY = "anpu-diquan-miji-v1";

  var FIELDS = [
    { id: "time", title: "时间" },
    { id: "money", title: "钱主" },
    { id: "bound", title: "四至" },
    { id: "guar", title: "中保" },
    { id: "dead", title: "亡者" }
  ];

  var BLOCKS = {
    "time-public": { field: "time", layer: "public", title: "一九八三年冬月十六", from: "公开目录" },
    "time-internal": { field: "time", layer: "internal", title: "一九八三年冬月十六，内部未改年", from: "内部目录" },
    "time-restrict": { field: "time", layer: "restrict", title: "甲子年冬月十六", from: "限制目录" },
    "time-conflict": { field: "time", layer: "mix", title: "公历与干支两行并存，建议所里另核", from: "对照" },
    "money-public": { field: "money", layer: "public", title: "侯万石", from: "公开目录" },
    "money-internal": { field: "money", layer: "internal", title: "侯万川，备忘称公开写了兄名", from: "内部目录" },
    "money-restrict": { field: "money", layer: "restrict", title: "葛万川", from: "限制目录" },
    "money-conflict": { field: "money", layer: "mix", title: "钱主三层对不上，建议所里另核", from: "对照" },
    "bound-public": { field: "bound", layer: "public", title: "东至石阶，西至水沟，南至老槐，北至岗脊", from: "公开目录" },
    "bound-internal": { field: "bound", layer: "internal", title: "东至侯宅后墙，西至水沟，南至老槐，北至岗脊", from: "内部目录" },
    "bound-restrict": { field: "bound", layer: "restrict", title: "东至现住屋后墙，西至旧渠，南至槐根，北至岗脊", from: "限制目录" },
    "bound-conflict": { field: "bound", layer: "mix", title: "东至只与一九九一年公告的一版重合，建议另核", from: "对照" },
    "guar-public": { field: "guar", layer: "public", title: "后土神祇", from: "公开目录" },
    "guar-internal": { field: "guar", layer: "internal", title: "申敬之，当时在南岭乡文书室", from: "内部目录" },
    "guar-restrict": { field: "guar", layer: "restrict", title: "申敬之", from: "限制目录" },
    "dead-public": { field: "dead", layer: "public", title: "侯成山", from: "公开目录" },
    "dead-internal": { field: "dead", layer: "internal", title: "侯成山，备忘称另葬东岗、此栏后改", from: "内部目录" },
    "dead-restrict": { field: "dead", layer: "restrict", title: "岑守山", from: "限制目录" },
    "dead-conflict": { field: "dead", layer: "mix", title: "公开侯成山、限制岑守山，建议另核", from: "对照" },
    "dead-unique": { field: "dead", layer: "over", title: "据此认定亡者即岑守山", from: "越权" }
  };

  var CRED = {
    internal: { user: "QP-夜-04", pass: "nanshan047" },
    restrict: { user: "QT-密-07", pass: "jiaojie083" },
    mail: { user: "ye-anpu", pass: "chouti0819" }
  };

  var HINTS = [
    "公开目录今晚不用牌。内部和限制都要牌，牌在抽屉本子和信里，检索框夜班是死的。",
    "先把钱主和四至对着看。公开跟内部已经不是同一句。宅基地那张公告只对得上其中一版东至。",
    "限制层的牌在白班那封信。进了之后对亡者和时间怎么写。同名的人要另看村和年，别并成一个。",
    "备注只能建议。五栏都要有字。把亡者写成唯一认定，系统会退回来让你改。"
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
    toast("已写入值班草稿：" + BLOCKS[id].title);
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
      toast("还空着：" + miss.join("、"));
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

  function tryLogin(kind, user, pass) {
    var c = CRED[kind];
    if (!c) return false;
    var u = String(user || "").replace(/^\s+|\s+$/g, "");
    var p = String(pass || "").replace(/^\s+|\s+$/g, "");
    if (u === c.user && p === c.pass) {
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
        if (err) err.textContent = "工号或口令不对。按纸面原样填，别改大小写。";
        toast("工号或口令不对");
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
        html += "<p class='dq-empty'>这一栏还没有可写的句子。先去目录里看过，再用页上的写入草稿。</p>";
      } else {
        opts.forEach(function (id) {
          var b = BLOCKS[id];
          var ck = s.picks[f.id] === id ? " checked" : "";
          html += "<label class='dq-opt'><input type='radio' name='" + f.id + "' value='" + id + "'" + ck + "> " + b.title + " <i>（" + b.from + "）</i></label>";
        });
      }
      html += "</fieldset>";
    });
    html += "<p class='dq-count'>草稿已选 <b id='dq-draft-n'>" + noteCount(s) + "</b> 项。空着交会被所里退。</p>";
    html += "<p><button type='button' class='dq-go' id='dq-submit'>提交查阅备注</button></p>";
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
    if (n < 1) return "便笺还没揭。一次只多看一张。";
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
