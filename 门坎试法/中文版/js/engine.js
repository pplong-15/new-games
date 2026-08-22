(function (global) {
  var KEY = "menkan-shifa-v1";

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function mark(k) {
    var s = load();
    s[k] = true;
    save(s);
    return s;
  }

  function pickEnding(form, s) {
    s = s || load();
    if (form.act === "rewrite" || form.nature === "rewrite") return "rewrite";
    if (form.auth !== "recommend") return "bounce-auth";
    if (form.act === "letin") return "let-in";
    if (form.act === "hold") {
      if (form.nature !== "funeral") return "bounce-nature";
      if (form.record !== "stepped") return "bounce-record";
      var step = !!(s["verified.broke"] || s["seen.record"]);
      var funeral = !!(s["seen.sms"] || s["seen.key"] || s["seen.borrow"]);
      if (!step) return "bounce-proof-step";
      if (!funeral) return "bounce-proof-funer";
      return "hold-funeral";
    }
    return "bounce-form";
  }

  var BOUNCE = {
    "bounce-auth": "本台只收建议。批准开匙、改原板，都不在夜岗格子里。",
    "bounce-nature": "仪礼栏和你勾的处置拧着。先把红白对上再交。",
    "bounce-record": "过门栏勾了干净。本台格子或试记若已经脏了，这一栏对不上。",
    "bounce-proof-step": "本台未见已证实的违规过门，也未见记录页上的踩踏栏。先试记，或先打开过门记录。",
    "bounce-proof-funer": "仪礼勾了丧，可本台还没有对得上的来源。短信、钥匙簿、巷口帖，至少要打开过一处。",
    "bounce-form": "四栏没收齐，或选项本台不认。"
  };

  var MK = {
    get: function (k) {
      var s = load();
      return k ? s[k] : s;
    },
    set: function (k, v) {
      var s = load();
      s[k] = v;
      save(s);
    },
    mark: mark,
    reset: function () {
      localStorage.removeItem(KEY);
    },
    pickEnding: pickEnding,
    bounceText: function (code) {
      return BOUNCE[code] || BOUNCE["bounce-form"];
    },
    chipsHtml: function () {
      var s = load();
      var bits = [];
      if (s["verified.broke"]) bits.push("已证实：法被撞过一次");
      if (s["seen.record"]) bits.push("已打开：过门记录");
      if (s["seen.sms"] || s["seen.key"] || s["seen.borrow"]) bits.push("已打开：丧不是喜的来源");
      if (!bits.length) return "";
      return '<p class="mk-chips">' + bits.join("　") + "</p>";
    },
    KEY: KEY
  };

  global.MK = MK;
})(window);
