(function (global) {
  var KEY = "paiwei-kanwu-v1";

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

  function pickEnding(form) {
    var auth = form.auth;
    var hui = form.hui;
    var pei = form.pei;
    var kan = form.kan;
    var alive = form.alive;
    var proof = form.proof;
    if (auth !== "recommend") return "over";
    var peiOk = pei === "qiuping_note" || pei === "blank_hold";
    var all =
      hui === "shouchun" &&
      peiOk &&
      kan === "east_dead" &&
      alive === "hesheng_alive" &&
      proof === "weituo_obit";
    if (all) return "hold";
    var half =
      (hui === "shouchun" && alive === "hesheng_dead") ||
      (hui === "hesheng" && peiOk);
    if (half) return "half";
    return "print";
  }

  var PW = {
    get: function (k) {
      var s = load();
      return k ? s[k] : s;
    },
    set: function (k, v) {
      var s = load();
      s[k] = v;
      save(s);
    },
    reset: function () {
      localStorage.removeItem(KEY);
    },
    pickEnding: pickEnding
  };

  global.PW = PW;
})(window);
