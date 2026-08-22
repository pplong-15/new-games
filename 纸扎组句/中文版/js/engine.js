(function (w) {
  var KEY = "zhizha-juzi-v1";

  var SLOTS = {
    who: ["邵浦", "邵庭", "井秋白", "娄石"],
    what: ["开业彩扎", "童女", "楼库", "狮头"],
    act: ["混进", "已焚", "缺件", "批准焚化"],
    where: ["邵庭丧扎", "焚化炉", "文具店"],
    night: ["未焚", "已焚"],
    life: ["邵浦在世", "邵浦已故", "童女已焚"]
  };

  var CORRECT = {
    who: "邵浦",
    what: "开业彩扎",
    act: "混进",
    where: "邵庭丧扎",
    night: "未焚",
    life: "邵浦在世",
    auth: "recommend"
  };

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function write(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function add(id) {
    var s = read();
    s.tokens = s.tokens || [];
    if (s.tokens.indexOf(id) < 0) s.tokens.push(id);
    write(s);
    return s;
  }

  function has(id) {
    return (read().tokens || []).indexOf(id) >= 0;
  }

  function bag() {
    return read().bag || [];
  }

  function pickWord(word) {
    var s = read();
    s.bag = s.bag || [];
    s.tokens = s.tokens || [];
    if (s.bag.indexOf(word) < 0) s.bag.push(word);
    var tid = "w-" + word;
    if (s.tokens.indexOf(tid) < 0) s.tokens.push(tid);
    write(s);
    return s;
  }

  function inBag(word) {
    return bag().indexOf(word) >= 0;
  }

  function setFlag(k, v) {
    var s = read();
    s[k] = v;
    write(s);
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function allFilled(form) {
    return !!(form.who && form.what && form.act && form.where && form.night && form.life && form.auth);
  }

  function pickEnding(form) {
    if (!allFilled(form)) return null;
    if (form.auth === "approve" || form.auth === "teach") return "bounced";
    if (form.life === "童女已焚") return "burned";
    if (form.life === "邵浦已故") return "burned";
    if (form.what === "童女" && (form.act === "已焚" || form.night === "已焚")) return "burned";
    if (
      form.who === CORRECT.who &&
      form.what === CORRECT.what &&
      form.act === CORRECT.act &&
      form.where === CORRECT.where &&
      form.night === CORRECT.night &&
      form.life === CORRECT.life &&
      form.auth === CORRECT.auth
    ) {
      return "filed";
    }
    return null;
  }

  function nearMsg(form) {
    if (!allFilled(form)) return "空格没收齐，这句还不能交。";
    if (form.who === "娄石") return "拍照的人不是货主。";
    if (form.who === "井秋白") return "催单的人不是这批货的户名。";
    if (form.who === "邵庭" && form.what === "开业彩扎" && form.where === "文具店") {
      return "货主和落点对调了。";
    }
    if (form.what === "童女" && form.who === "邵浦" && form.act === "混进") {
      return "发票上的品名不是这个。";
    }
    if (form.act === "缺件") return "堆上有东西，不是空着。";
    if (form.where === "文具店" && form.what === "开业彩扎") {
      return "落点跟后院那一叠对不上。";
    }
    if (form.act === "已焚" || form.night === "已焚") {
      return "炉口今夜没开。群里还有人在问货。";
    }
    if (form.life === "邵浦已故") return "群里还有人在问货。";
    return "整句对不上。空格里的词须来自已打开的页。";
  }

  function ensureStyle() {
    if (document.getElementById("zj-style")) return;
    var s = document.createElement("style");
    s.id = "zj-style";
    s.textContent =
      ".pick{border-bottom:1px dotted currentColor;text-decoration:none;cursor:pointer}" +
      ".pick.inbag{border-bottom-style:solid}" +
      ".bagbox{border:1px solid #bbb;padding:8px 10px;margin:12px 0;font-size:13px;line-height:1.7}" +
      ".sent-row{margin:10px 0;line-height:2.1}" +
      ".sent-row select{margin:0 4px}";
    document.head.appendChild(s);
  }

  function renderBag() {
    var el = document.getElementById("wordbag");
    if (!el) return;
    var b = bag();
    el.innerHTML = b.length
      ? "今夜词袋：" + b.join("、")
      : "今夜词袋空着。页上带点线的词，点一下才进袋。";
  }

  function markPicks() {
    var nodes = document.querySelectorAll(".pick");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var word = n.getAttribute("data-w");
      if (inBag(word)) n.className = "pick inbag";
      n.onclick = (function (wd, node) {
        return function (e) {
          e.preventDefault();
          pickWord(wd);
          node.className = "pick inbag";
          renderBag();
          var st = document.getElementById("bagflash");
          if (st) st.textContent = "已写入词袋：" + wd;
        };
      })(word, n);
    }
  }

  function fillSelect(sel, key) {
    var opts = SLOTS[key] || [];
    var cur = (read().form || {})[key] || "";
    sel.innerHTML = "";
    var blank = document.createElement("option");
    blank.value = "";
    blank.textContent = "（空）";
    sel.appendChild(blank);
    for (var i = 0; i < opts.length; i++) {
      var w = opts[i];
      if (!inBag(w)) continue;
      var o = document.createElement("option");
      o.value = w;
      o.textContent = w;
      if (w === cur) o.selected = true;
      sel.appendChild(o);
    }
  }

  function gatherForm() {
    function v(id) {
      var el = document.getElementById(id);
      return el ? el.value : "";
    }
    var authEl = document.querySelector("input[name=auth]:checked");
    return {
      who: v("slot-who"),
      what: v("slot-what"),
      act: v("slot-act"),
      where: v("slot-where"),
      night: v("slot-night"),
      life: v("slot-life"),
      auth: authEl ? authEl.value : ""
    };
  }

  function bootPage(tokenId) {
    ensureStyle();
    if (tokenId) add(tokenId);
    renderBag();
    markPicks();
  }

  function bootSentence() {
    bootPage("v-sentence");
    ["who", "what", "act", "where", "night", "life"].forEach(function (k) {
      var sel = document.getElementById("slot-" + k);
      if (sel) fillSelect(sel, k);
    });
    var form = document.getElementById("sent");
    if (!form) return;
    form.onsubmit = function (e) {
      e.preventDefault();
      var f = gatherForm();
      setFlag("form", f);
      var end = pickEnding(f);
      if (end === "filed") {
        location.href = "filed.html";
        return;
      }
      if (end === "burned") {
        location.href = "burned.html";
        return;
      }
      if (end === "bounced") {
        location.href = "bounced.html";
        return;
      }
      var msg = document.getElementById("sent-msg");
      if (msg) msg.textContent = nearMsg(f);
    };
  }

  function bootDesk() {
    bootPage("v-desk");
    var a = document.getElementById("mai-2");
    var b = document.getElementById("mai-3");
    var c = document.getElementById("mai-4");
    if (a && has("w-童女")) {
      a.hidden = false;
      a.textContent = "别只盯这一个词。后院还有别的颜色。";
    }
    if (b && has("v-order") && has("v-invoice")) {
      b.hidden = false;
      b.textContent = "两份户名已经能对。别用同一张嘴读。";
    }
    if (c && has("v-group")) {
      c.hidden = false;
      c.textContent = "店群今晚还在跳。人在问货。";
    }
  }

  function endingWhy() {
    var f = read().form || {};
    return f;
  }

  w.ZJ = {
    KEY: KEY,
    SLOTS: SLOTS,
    CORRECT: CORRECT,
    add: add,
    has: has,
    read: read,
    bag: bag,
    pickWord: pickWord,
    inBag: inBag,
    setFlag: setFlag,
    reset: reset,
    allFilled: allFilled,
    pickEnding: pickEnding,
    nearMsg: nearMsg,
    bootPage: bootPage,
    bootSentence: bootSentence,
    bootDesk: bootDesk,
    endingWhy: endingWhy
  };
})(window);
