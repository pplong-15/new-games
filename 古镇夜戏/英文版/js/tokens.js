(function (g) {
  var KEY = "guxz-v1-en";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function save(s) { localStorage.setItem(KEY, JSON.stringify(s)); }
  g.GXZ = {
    grant: function (id) {
      var s = load();
      s[id] = 1;
      save(s);
    },
    has: function (id) { return !!load()[id]; },
    hasAll: function (ids) {
      var s = load();
      for (var i = 0; i < ids.length; i++) if (!s[ids[i]]) return false;
      return true;
    },
    lock: function (k) {
      var s = load();
      s.lock = k;
      save(s);
    },
    locked: function () { return load().lock || ""; },
    reset: function () { localStorage.removeItem(KEY); }
  };
})(window);
