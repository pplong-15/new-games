/* 槐荫综治上传台。权威只有上传与建议口径。 */
(function (global) {
  var KEY = "hyjd-guoji-upload-v1";
  var START = 20 * 60 + 4;
  var DEADLINE = 22 * 60;

  var FIELDS = [
    { id: "heir", title: "嗣子登记" },
    { id: "when", title: "过继时点" },
    { id: "consent", title: "本生房意思" },
    { id: "kind", title: "争议归类" },
    { id: "live", title: "现居住" }
  ];

  var BLOCKS = {
    "heir-sishu": { field: "heir", title: "嗣子写作耿小满", from: "红纸抄件" },
    "heir-hukou": { field: "heir", title: "本户未登记嗣子", from: "户政在册" },
    "heir-live": { field: "heir", title: "邻里指同住为耿晚禾", from: "民情通" },
    "heir-zupu": { field: "heir", title: "谱上已写小满", from: "匡缮手记" },
    "when-sishu": { field: "when", title: "五月十九日命继", from: "红纸落款" },
    "when-hukou": { field: "when", title: "近三年无迁入", from: "户政迁入栏" },
    "when-zupu": { field: "when", title: "七月二十八日谱上补录", from: "江左摘页" },
    "consent-sishu": { field: "consent", title: "守礼画押称同意", from: "红纸中人" },
    "consent-letter": { field: "consent", title: "素秋当收据按的印", from: "网格来信" },
    "consent-neighbor": { field: "consent", title: "伯川代按，素秋未点头", from: "谭婶口述" },
    "kind-order": { field: "kind", title: "工单写作过继抚养", from: "综治派单" },
    "kind-share": { field: "kind", title: "后院那间份额", from: "素秋来信" },
    "kind-care": { field: "kind", title: "侍奉未入册", from: "晚禾旧页" },
    "kind-measure": { field: "kind", title: "卷尺量的是后院那间", from: "谭婶续帖" },
    "live-sishu": { field: "live", title: "红纸写小满应入嗣房", from: "嗣书正文" },
    "live-hukou": { field: "live", title: "小满仍在渠沿路九号", from: "户政协查" },
    "live-neighbor": { field: "live", title: "十七号夜里仍是晚禾开门", from: "邻里" },
    "live-wanhe": { field: "live", title: "晚禾自称仍住这边", from: "旧空间说说" }
  };

  function blank() {
    return {
      min: START,
      visited: {},
      extracted: {},
      uploaded: {},
      wanhe: false,
      closed: false,
      ending: "",
      hint: 0
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

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function fmt(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return pad(h) + ":" + pad(m);
  }

  function toast(msg) {
    var old = document.querySelector(".hy-toast");
    if (old) old.parentNode.removeChild(old);
    var el = document.createElement("div");
    el.className = "hy-toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2400);
  }

  function uploadedCount(s) {
    return Object.keys(s.uploaded).length;
  }

  function visit(page, cost) {
    var s = load();
    if (!s.visited[page]) {
      s.visited[page] = true;
      if (!s.closed) s.min += cost;
    } else if (!s.closed) {
      s.min += 1;
    }
    if (page === "letter") s.wanhe = true;
    save(s);
    return s;
  }

  function extract(id) {
    var s = load();
    if (!BLOCKS[id]) return;
    if (s.closed) {
      toast("工单已签发，摘录不再进台。");
      return;
    }
    if (s.min >= DEADLINE) {
      toast("已过二十二点，系统拒收新摘录。");
      return;
    }
    if (s.extracted[id]) {
      toast("这条已经躺在上传台里。");
      return;
    }
    s.extracted[id] = true;
    s.min += 2;
    save(s);
    toast("已放到上传台，回值班台再勾。");
    var btn = document.querySelector('[data-block="' + id + '"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "已在台上";
    }
    if (typeof document !== "undefined" && document.dispatchEvent) {
      document.dispatchEvent(new CustomEvent("hy-extract"));
    }
  }

  function bindPicks() {
    var s = load();
    var list = document.querySelectorAll("[data-block]");
    for (var i = 0; i < list.length; i++) {
      (function (btn) {
        var id = btn.getAttribute("data-block");
        if (s.extracted[id] || s.closed) {
          btn.disabled = true;
          btn.textContent = s.extracted[id] ? "已在台上" : "已截止摘录";
        }
        btn.addEventListener("click", function () {
          extract(id);
        });
      })(list[i]);
    }
  }

  function paintClock(el) {
    if (!el) return;
    var s = load();
    el.textContent = "系统时间 " + fmt(s.min) + "　上传截止 22:00";
    el.className = "desk-clock" + (s.min >= 21 * 60 + 40 ? " late" : "");
  }

  function paperHeir(heir) {
    return heir === "heir-sishu" || heir === "heir-zupu";
  }

  function liveStay(live) {
    return live === "live-neighbor" || live === "live-wanhe";
  }

  function shareKind(kind) {
    return kind === "kind-share" || kind === "kind-measure";
  }

  function pickEnding(s) {
    var u = s.uploaded;
    var heir = u.heir || "";
    var when = u.when || "";
    var live = u.live || "";
    var kind = u.kind || "";
    if (paperHeir(heir) && (when === "when-hukou" || liveStay(live))) return "clash";
    if (paperHeir(heir) && (when === "when-sishu" || when === "when-zupu")) return "paper";
    if (!paperHeir(heir) && (liveStay(live) || heir === "heir-live" || kind === "kind-care")) return "care";
    if (shareKind(kind) && !paperHeir(heir)) return "share";
    if (heir === "heir-hukou" || live === "live-hukou" || when === "when-hukou") return "hukou";
    return "clash";
  }

  function uploadField(field, blockId) {
    var s = load();
    if (s.closed) {
      toast("签发过了，栏位不能改。");
      return false;
    }
    if (s.min >= DEADLINE) {
      toast("已过二十二点，栏位不再接收。");
      return false;
    }
    if (s.uploaded[field]) {
      toast("这一栏已经传上去，不能撤。");
      return false;
    }
    if (!s.extracted[blockId]) {
      toast("先从来源页摘进来，再勾。");
      return false;
    }
    var b = BLOCKS[blockId];
    if (!b || b.field !== field) {
      toast("这一条对不上这一栏。");
      return false;
    }
    s.uploaded[field] = blockId;
    s.min += 7;
    save(s);
    toast("本栏已上传，不可改。");
    return true;
  }

  function issue() {
    var s = load();
    var n = uploadedCount(s);
    if (n < 3) {
      if (s.min >= DEADLINE) {
        s.ending = "timeout";
        s.closed = true;
        save(s);
        location.href = "result.html";
        return;
      }
      toast("至少齐三栏，系统才收签发。");
      return;
    }
    s.ending = pickEnding(s);
    s.closed = true;
    save(s);
    location.href = "huifang.html";
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function radioName(field) {
    return "up-" + field;
  }

  function renderDesk() {
    var s = load();
    paintClock(document.getElementById("clock"));
    var box = document.getElementById("trays");
    if (!box) return;
    box.innerHTML = "";
    FIELDS.forEach(function (f) {
      var fs = document.createElement("fieldset");
      fs.className = "tray" + (s.uploaded[f.id] ? " locked" : "");
      var lg = document.createElement("legend");
      lg.textContent = f.title;
      fs.appendChild(lg);
      var hits = Object.keys(BLOCKS).filter(function (id) {
        return BLOCKS[id].field === f.id && s.extracted[id];
      });
      if (!hits.length) {
        var p = document.createElement("p");
        p.textContent = s.uploaded[f.id]
          ? "本栏已锁定。"
          : "还没有摘进来。打开采集目录再回来。";
        fs.appendChild(p);
      } else {
        hits.forEach(function (id) {
          var lab = document.createElement("label");
          var inp = document.createElement("input");
          inp.type = "radio";
          inp.name = radioName(f.id);
          inp.value = id;
          if (s.uploaded[f.id] === id) inp.checked = true;
          if (s.uploaded[f.id] || s.closed) inp.disabled = true;
          lab.appendChild(inp);
          lab.appendChild(document.createTextNode(" " + BLOCKS[id].title + "（" + BLOCKS[id].from + "）"));
          fs.appendChild(lab);
        });
        if (!s.uploaded[f.id] && !s.closed) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = "上传此栏";
          btn.addEventListener("click", function () {
            var chosen = box.querySelector('input[name="' + radioName(f.id) + '"]:checked');
            if (!chosen) {
              toast("先勾一版再传。");
              return;
            }
            if (uploadField(f.id, chosen.value)) renderDesk();
          });
          fs.appendChild(btn);
        } else if (s.uploaded[f.id]) {
          var done = document.createElement("p");
          done.textContent = "已上传，不可撤回。";
          fs.appendChild(done);
        }
      }
      box.appendChild(fs);
    });
    var n = uploadedCount(s);
    var cnt = document.getElementById("upcount");
    if (cnt) {
      cnt.textContent = n >= 3
        ? "三栏已齐，可以签发回访口径。"
        : "空单整点退。至少传满三栏才收签发。";
    }
    var go = document.getElementById("issue");
    if (go) {
      go.disabled = false;
      go.onclick = issue;
    }
    var draft = document.getElementById("draft");
    if (draft) {
      draft.innerHTML = "";
      if (n) {
        var lines = previewLines(s);
        lines.forEach(function (t) {
          var li = document.createElement("li");
          li.textContent = t;
          draft.appendChild(li);
        });
      }
    }
    var wanheLink = document.getElementById("wanhe-slot");
    if (wanheLink) wanheLink.style.display = s.wanhe ? "list-item" : "none";
  }

  function previewLines(s) {
    var out = [];
    var u = s.uploaded;
    if (u.heir === "heir-sishu") out.push("提纲草稿：向守礼户问耿小满何时迁入十七号。");
    if (u.heir === "heir-hukou") out.push("提纲草稿：先问红纸与户口为何对不上。");
    if (u.heir === "heir-live") out.push("提纲草稿：按同住人约耿晚禾谈话。");
    if (u.heir === "heir-zupu") out.push("提纲草稿：按谱摘问小满名字谁让补进去的。");
    if (u.when === "when-sishu") out.push("提纲草稿：核五月十九日那张命继是否仍作数。");
    if (u.when === "when-hukou") out.push("提纲草稿：迁入栏是空的，问有没有瞒报。");
    if (u.when === "when-zupu") out.push("提纲草稿：问七月补谱时谁签的字。");
    if (u.consent === "consent-sishu") out.push("提纲草稿：请守礼确认画押仍有效。");
    if (u.consent === "consent-letter") out.push("提纲草稿：问素秋按印时看见的是哪一张。");
    if (u.consent === "consent-neighbor") out.push("提纲草稿：问伯川是否代按。");
    if (u.kind === "kind-order") out.push("提纲草稿：按过继抚养纠纷派车。");
    if (u.kind === "kind-share") out.push("提纲草稿：改约份额调解员。");
    if (u.kind === "kind-care") out.push("提纲草稿：改问谁在侍奉、谁在册。");
    if (u.kind === "kind-measure") out.push("提纲草稿：先问卷尺量的那一间归谁。");
    if (u.live === "live-sishu") out.push("提纲草稿：要求小满准备户口本和迁入单。");
    if (u.live === "live-hukou") out.push("提纲草稿：到渠沿路九号核人。");
    if (u.live === "live-neighbor") out.push("提纲草稿：夜里先敲十七号，看谁来开门。");
    if (u.live === "live-wanhe") out.push("提纲草稿：按她自己的话说，先核人还住不住。");
    if (!out.length) out.push("尚未上传任何栏，草稿空着。");
    return out;
  }

  function renderHuifang() {
    var s = load();
    var host = document.getElementById("script-box");
    if (!host) return;
    if (!s.closed || !s.ending || s.ending === "timeout") {
      host.innerHTML = "<p>提纲还没签发。回值班台把栏位传齐。</p>";
      return;
    }
    var ul = document.createElement("ul");
    previewLines(s).forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t.replace("提纲草稿：", "");
      ul.appendChild(li);
    });
    host.appendChild(ul);
    var extra = document.getElementById("script-extra");
    if (extra) extra.setAttribute("data-end", s.ending);
  }

  function renderResult() {
    var s = load();
    if (!s.ending) {
      if (uploadedCount(s) >= 3) {
        s.ending = pickEnding(s);
        s.closed = true;
        save(s);
      } else if (s.min >= DEADLINE) {
        s.ending = "timeout";
        s.closed = true;
        save(s);
      } else {
        location.href = "desk.html";
        return;
      }
    }
    var nodes = document.querySelectorAll("[data-ending]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].hidden = nodes[i].getAttribute("data-ending") !== s.ending;
    }
    var why = document.getElementById("why");
    if (why) why.textContent = whyText(s);
  }

  function whyText(s) {
    var bits = [];
    Object.keys(s.uploaded).forEach(function (f) {
      var id = s.uploaded[f];
      if (BLOCKS[id]) bits.push(BLOCKS[id].title);
    });
    if (!bits.length) return "你一栏也没传上去。";
    return "你传上去的是：" + bits.join("；") + "。";
  }

  function nextHint() {
    var s = load();
    if (s.hint < 4) s.hint += 1;
    save(s);
    showHints();
  }

  function showHints() {
    var s = load();
    for (var i = 1; i <= 4; i++) {
      var el = document.getElementById("hint-" + i);
      if (el) el.hidden = i > s.hint;
    }
  }

  global.HY = {
    load: load,
    save: save,
    visit: visit,
    extract: extract,
    bindPicks: bindPicks,
    paintClock: paintClock,
    renderDesk: renderDesk,
    renderHuifang: renderHuifang,
    renderResult: renderResult,
    reset: reset,
    nextHint: nextHint,
    showHints: showHints,
    issue: issue,
    DEADLINE: DEADLINE,
    fmt: fmt,
    uploadedCount: uploadedCount,
    pickEnding: pickEnding,
    BLOCKS: BLOCKS
  };
})(this);
