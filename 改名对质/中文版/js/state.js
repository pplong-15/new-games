/* 埠南夜窗对质。只建议。键 gaiming-duizhi-v1 */
(function (global) {
  var KEY = "gaiming-duizhi-v1";

  var SENTENCES = {
    "shu-weijiechu": { text: "青瓦庵寄名疏抄件仍写屈氏禾禾法名净禾状态未解除", from: "附属柜" },
    "shu-tingxiang": { text: "停香停的是接待不是把旧疏作废", from: "保管条" },
    "pu-chengji": { text: "屈氏西支谱名仍作屈承稷", from: "谱局" },
    "pu-weijie": { text: "谱局未接派出所更名知会", from: "一口" },
    "hukou-yigai": { text: "户口名已由屈小禾改为屈晚禾", from: "变更摘页" },
    "zhi-mingqi": { text: "结婚材料要户口名谱名寄名解除三栏齐", from: "班长条" },
    "zhi-ye": { text: "夜窗只出建议不发结婚材料原件", from: "权限页" },
    "lin-buning": { text: "临浦那户屈晚禾是另一人不能并案", from: "抄送" },
    "kou-wushu": { text: "旧页里的跳墙场面没有文书号", from: "旧博客" }
  };

  var CLAIMS = [
    {
      id: "claim-tiaogiang",
      text: "跳墙去年就办完了，寄名早解除了。",
      need: ["shu-weijiechu"],
      crack: "shu",
      ok: "他嘴停了一下。早解除三个字说不下去了。柜里那栏他还没见过。",
      miss: "你还没把对得上的那句从页上收下。"
    },
    {
      id: "claim-pu",
      text: "谱上也跟着改成屈晚禾了。",
      need: ["pu-chengji"],
      crack: "pu",
      ok: "他改口说谱他没去南街看。承稷两个字他不提了。",
      miss: "你还没把谱上那句收下。"
    },
    {
      id: "claim-hun",
      text: "班长说过名齐了，夜窗就能发结婚材料。",
      need: ["zhi-mingqi", "zhi-ye"],
      crack: "hun",
      ok: "他把名齐听成已经齐了。条子上写的是条件。",
      miss: "须知或条子上那句，你还没收。"
    },
    {
      id: "claim-attitude",
      text: "我都来排队了，你们还卡我。",
      need: [],
      push: "急不代表疏撤了。明天排队是明天的事，栏上对不上还是对不上。"
    },
    {
      id: "claim-tingxiang",
      text: "庵都停了，疏还能算数？",
      need: [],
      push: "停香是庵的事。我办没办是另一回事——他这么顶。停和解除不是一栏。"
    },
    {
      id: "claim-lin",
      text: "邻县不是也有同名回执吗，拿来就能用。",
      need: ["lin-buning"],
      crack: "lin",
      ok: "他把临浦那户从嘴里拿下去了。同名不能焊。",
      miss: "邻县那封抄送你还没打开，或者那句还没收下。"
    }
  ];

  function blank() {
    return {
      saved: {},
      cracks: {},
      seen: {},
      hint: 0,
      ending: "",
      pick: ""
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
      return s;
    } catch (e) {
      return blank();
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function toast(msg) {
    var old = document.querySelector(".gm-toast");
    if (old) old.parentNode.removeChild(old);
    var d = document.createElement("div");
    d.className = "gm-toast";
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function () {
      if (d.parentNode) d.parentNode.removeChild(d);
    }, 3200);
  }

  function hasSaved(s, ids) {
    for (var i = 0; i < ids.length; i++) {
      if (s.saved[ids[i]]) return true;
    }
    return false;
  }

  function markSeen(id) {
    if (!id) return;
    var s = load();
    s.seen[id] = true;
    save(s);
  }

  function doSave(sid) {
    if (!SENTENCES[sid]) return;
    var s = load();
    s.saved[sid] = true;
    save(s);
    toast("收下了。对质窗那边能用。");
    renderSaved();
    renderStatus();
    var btns = document.querySelectorAll('[data-save="' + sid + '"]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = "已经在袋子里";
      btns[i].disabled = true;
    }
  }

  function confront(cid) {
    var claim = null;
    for (var i = 0; i < CLAIMS.length; i++) {
      if (CLAIMS[i].id === cid) claim = CLAIMS[i];
    }
    if (!claim) return;
    var s = load();
    var box = document.getElementById("gm-feedback");
    if (claim.push) {
      if (box) box.textContent = claim.push;
      toast("对方把理由顶回来了。");
      return;
    }
    if (!hasSaved(s, claim.need)) {
      if (box) box.textContent = claim.miss;
      toast(claim.miss);
      return;
    }
    s.cracks[claim.crack] = true;
    save(s);
    if (box) box.textContent = claim.ok;
    toast("这句对不上。他顶不回来。");
    renderStatus();
    var b = document.querySelector('[data-claim="' + cid + '"]');
    if (b) {
      b.className = (b.className || "") + " gm-cracked";
    }
  }

  function pickEnding(s) {
    if (s.pick === "overreach") return "overreach";
    if (s.pick === "release") return "release";
    return "hold";
  }

  function reasonLines(s) {
    var lines = [];
    if (s.pick === "overreach") {
      lines.push("你在单上勾了代办跳墙，或者勾了代改谱。夜窗没有这两项权。");
    } else if (s.pick === "release") {
      lines.push("你按他嘴里的话写了可发。回执会当名齐。");
    } else {
      lines.push("你写了今晚不发。蓝槐收的是建议，章不在这盏灯下。");
    }
    if (s.cracks.shu) {
      lines.push("口头那句早解除，对不上柜里未解除。");
    } else if (s.pick === "hold") {
      lines.push("疏那一栏你还没在对质里点实，不发是先挡住，栏还虚着。");
    }
    if (s.cracks.pu) {
      lines.push("谱上还是屈承稷。户口本上的晚禾带不走谱。");
    } else if (s.pick === "hold" || s.pick === "release") {
      lines.push("谱那一层你没点。公证处认的是名齐，不是口头还俗。");
    }
    if (s.cracks.hun) {
      lines.push("名齐是三栏条件，不是他已经齐了。");
    }
    if (s.cracks.lin) {
      lines.push("临浦那户你拆开了，没有并进来。");
    } else if (s.seen["you-lin"] || s.seen["you-xi"]) {
      lines.push("邻县抄送打开过。那是另一户，不能当本户解除。");
    }
    if (s.saved["kou-wushu"]) {
      lines.push("旧页上的跳墙没有文书号，当不了解除。");
    }
    return lines;
  }

  function submitPick(pick) {
    var s = load();
    s.pick = pick;
    s.ending = pickEnding(s);
    save(s);
    var map = {
      hold: "result-hold.html",
      release: "result-release.html",
      overreach: "result-overreach.html"
    };
    location.href = map[s.ending] || "result-hold.html";
  }

  function wipe() {
    localStorage.removeItem(KEY);
  }

  function renderSaved() {
    var ul = document.getElementById("gm-saved");
    if (!ul) return;
    var s = load();
    ul.innerHTML = "";
    var ids = Object.keys(SENTENCES);
    var n = 0;
    ids.forEach(function (id) {
      if (!s.saved[id]) return;
      n += 1;
      var li = document.createElement("li");
      li.textContent = SENTENCES[id].text + "（" + SENTENCES[id].from + "）";
      ul.appendChild(li);
    });
    if (!n) {
      var empty = document.createElement("li");
      empty.textContent = "袋子是空的。页上有钮的句子才能收。";
      ul.appendChild(empty);
    }
  }

  function renderStatus() {
    var el = document.getElementById("gm-status");
    if (!el) return;
    var s = load();
    var a = 0;
    var b = 0;
    Object.keys(s.saved).forEach(function (k) {
      if (s.saved[k]) a += 1;
    });
    Object.keys(s.cracks).forEach(function (k) {
      if (s.cracks[k]) b += 1;
    });
    el.textContent = "袋 " + a + "　指 " + b;
  }

  function renderClaims() {
    var box = document.getElementById("gm-claims");
    if (!box) return;
    var s = load();
    box.innerHTML = "";
    CLAIMS.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gm-claim" + (s.cracks[c.crack] ? " gm-cracked" : "");
      btn.setAttribute("data-claim", c.id);
      btn.textContent = c.text;
      btn.onclick = function () {
        confront(c.id);
      };
      box.appendChild(btn);
    });
  }

  function renderHints() {
    var box = document.getElementById("gm-hint");
    if (!box) return;
    var s = load();
    var lines = [
      "口头要拿柜里的栏对，别跟态度吵。",
      "停香和解除不是一栏。谱和户口也不是一栏。",
      "先收未解除再点早解除。谱页上的承稷拿去点谱上也改了。",
      "口头已跳墙对不上未解除。户口名改了谱名未改。处置选今晚不发。不要代办。"
    ];
    var n = s.hint || 0;
    if (n < 1) {
      box.textContent = "抽屉里还有纸。一次只多翻一张。";
      return;
    }
    box.textContent = lines[Math.min(n, 4) - 1];
  }

  function renderResult() {
    var box = document.getElementById("gm-reason");
    if (!box) return;
    var s = load();
    box.innerHTML = "";
    reasonLines(s).forEach(function (t) {
      var p = document.createElement("p");
      p.textContent = t;
      box.appendChild(p);
    });
  }

  function boot() {
    var page = document.body.getAttribute("data-page");
    if (page) markSeen(page);
    renderStatus();
    renderSaved();
    renderClaims();
    renderHints();
    renderResult();
    var saves = document.querySelectorAll("[data-save]");
    var s = load();
    for (var i = 0; i < saves.length; i++) {
      (function (btn) {
        var sid = btn.getAttribute("data-save");
        if (s.saved[sid]) {
          btn.textContent = "已经在袋子里";
          btn.disabled = true;
        }
        btn.onclick = function () {
          doSave(sid);
        };
      })(saves[i]);
    }
    var wipeBtn = document.getElementById("gm-wipe");
    if (wipeBtn) {
      wipeBtn.onclick = function () {
        wipe();
        wipeBtn.textContent = "本机草稿清了，从班前纸再进";
      };
    }
    var hintBtn = document.getElementById("gm-hint-next");
    if (hintBtn) {
      hintBtn.onclick = function () {
        var st = load();
        if (st.hint < 4) st.hint += 1;
        save(st);
        renderHints();
        if (st.hint >= 4) hintBtn.textContent = "纸翻完了";
      };
    }
    var form = document.getElementById("gm-submit");
    if (form) {
      form.onsubmit = function (ev) {
        ev.preventDefault();
        var picked = form.querySelector("input[name=pick]:checked");
        if (!picked) {
          toast("先勾一项建议。");
          return;
        }
        submitPick(picked.value);
      };
    }
  }

  global.GM = {
    KEY: KEY,
    SENTENCES: SENTENCES,
    CLAIMS: CLAIMS,
    load: load,
    save: save,
    wipe: wipe,
    boot: boot,
    pickEnding: pickEnding,
    reasonLines: reasonLines
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(this);
