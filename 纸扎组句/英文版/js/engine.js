(function (w) {
  var KEY = "zhizha-juzi-v1-en";

  var SLOTS = {
    who: ["ShaoPu", "ShaoTing", "JingQiubai", "LouShi"],
    what: ["FestivalPaper", "PaperAttendant", "PaperMansion", "LionHead"],
    act: ["MixedIn", "AlreadyBurned", "MissingPiece", "BurnApproved"],
    where: ["ShaoTingFuneral", "Furnace", "StationeryShop"],
    night: ["Unburned", "AlreadyBurned"],
    life: ["ShaoPuAlive", "ShaoPuDead", "AttendantBurned"]
  };

  var CORRECT = {
    who: "ShaoPu",
    what: "FestivalPaper",
    act: "MixedIn",
    where: "ShaoTingFuneral",
    night: "Unburned",
    life: "ShaoPuAlive",
    auth: "recommend"
  };

  // Hidden compatibility only. Playable pages must ship English data-w.
  var ALIAS = {
    "\u90b5\u6d66": "ShaoPu",
    "\u90b5\u5ead": "ShaoTing",
    "\u4e95\u79cb\u767d": "JingQiubai",
    "\u5a04\u77f3": "LouShi",
    "\u5f00\u4e1a\u5f69\u624e": "FestivalPaper",
    "\u7ae5\u5973": "PaperAttendant",
    "\u697c\u5e93": "PaperMansion",
    "\u72ee\u5934": "LionHead",
    "\u6df7\u8fdb": "MixedIn",
    "\u5df2\u711a": "AlreadyBurned",
    "\u7f3a\u4ef6": "MissingPiece",
    "\u6279\u51c6\u711a\u5316": "BurnApproved",
    "\u90b5\u5ead\u4e27\u624e": "ShaoTingFuneral",
    "\u711a\u5316\u7089": "Furnace",
    "\u6587\u5177\u5e97": "StationeryShop",
    "\u672a\u711a": "Unburned",
    "\u90b5\u6d66\u5728\u4e16": "ShaoPuAlive",
    "\u90b5\u6d66\u5df2\u6545": "ShaoPuDead",
    "\u7ae5\u5973\u5df2\u711a": "AttendantBurned",
    "\u559c\u4e27\u6df7\u7089": "MixedFurnace"
  };

  function canon(word) {
    return ALIAS[word] || word;
  }

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
    word = canon(word);
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
    return bag().indexOf(canon(word)) >= 0;
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
    if (form.life === "AttendantBurned") return "burned";
    if (form.life === "ShaoPuDead") return "burned";
    if (form.what === "PaperAttendant" && (form.act === "AlreadyBurned" || form.night === "AlreadyBurned")) return "burned";
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
    if (!allFilled(form)) return "The blanks are not all filled. This line cannot be filed yet.";
    if (form.who === "LouShi") return "The person who took the photo is not the goods owner.";
    if (form.who === "JingQiubai") return "The person chasing the order is not this lot's account name.";
    if (form.who === "ShaoTing" && form.what === "FestivalPaper" && form.where === "StationeryShop") {
      return "Owner and landing point are swapped.";
    }
    if (form.what === "PaperAttendant" && form.who === "ShaoPu" && form.act === "MixedIn") {
      return "The invoice item name is not this.";
    }
    if (form.act === "MissingPiece") return "There is something on the stack. It is not empty.";
    if (form.where === "StationeryShop" && form.what === "FestivalPaper") {
      return "The landing point does not match that yard pile.";
    }
    if (form.act === "AlreadyBurned" || form.night === "AlreadyBurned") {
      return "The furnace mouth is not open tonight. Someone in the group is still asking for goods.";
    }
    if (form.life === "ShaoPuDead") return "Someone in the group is still asking for goods.";
    return "The whole line does not match. Words in the blanks must come from pages already opened.";
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
      ? "Tonight's bag: " + b.join(", ")
      : "Tonight's bag is empty. Click a dotted word on the page to add it.";
  }

  function markPicks() {
    var nodes = document.querySelectorAll(".pick");
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      var word = canon(n.getAttribute("data-w"));
      n.setAttribute("data-w", word);
      if (inBag(word)) n.className = "pick inbag";
      n.onclick = (function (wd, node) {
        return function (e) {
          e.preventDefault();
          pickWord(wd);
          node.className = "pick inbag";
          renderBag();
          var st = document.getElementById("bagflash");
          if (st) st.textContent = "Written into the bag: " + wd;
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
    blank.textContent = "(blank)";
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
    if (a && has("w-PaperAttendant")) {
      a.hidden = false;
      a.textContent = "Don't stare at this one word. The yard still has another color.";
    }
    if (b && has("v-order") && has("v-invoice")) {
      b.hidden = false;
      b.textContent = "The two account names already compare. Don't read them as one mouth.";
    }
    if (c && has("v-group")) {
      c.hidden = false;
      c.textContent = "The shop group is still jumping tonight. Someone is asking for goods.";
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
