(function (global) {
  var KEY = "menkan-shifa-v1-en";

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
    "bounce-auth": "This desk takes recommendations only. Approving a key-open, or rewriting the original board, is not in the night-duty cells.",
    "bounce-nature": "The rite field and the action you ticked are at odds. Line up wedding and funeral before you submit.",
    "bounce-record": "The crossing field is ticked clean. If this desk's cells or a trial entry already show dirt, that field does not match.",
    "bounce-proof-step": "This desk has not seen a verified broken crossing, and has not seen the stepping cell on the record page. Try a crossing first, or open the threshold record.",
    "bounce-proof-funer": "The rite is ticked funeral, but this desk has no matching source yet. SMS, key log, or alley post — open at least one.",
    "bounce-form": "The four fields are not complete, or this desk does not recognize an option."
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
      if (s["verified.broke"]) bits.push("Verified: the rule was broken once");
      if (s["seen.record"]) bits.push("Opened: threshold record");
      if (s["seen.sms"] || s["seen.key"] || s["seen.borrow"]) bits.push("Opened: a source that this is funeral, not wedding");
      if (!bits.length) return "";
      return '<p class="mk-chips">' + bits.join(" · ") + "</p>";
    },
    KEY: KEY
  };

  global.MK = MK;
})(window);
