(function (g) {
  var KEY = "minsheng-v1-en";
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
  g.MS = {
    grant: function (id) {
      var s = load();
      s[id] = 1;
      save(s);
    },
    has: function (id) {
      return !!load()[id];
    },
    hasAll: function (ids) {
      var s = load();
      for (var i = 0; i < ids.length; i++) {
        if (!s[ids[i]]) return false;
      }
      return true;
    },
    seen: function (clipId) {
      var s = load();
      s.seen = s.seen || {};
      s.seen[clipId] = 1;
      save(s);
    },
    isSeen: function (clipId) {
      var s = load();
      return !!(s.seen && s.seen[clipId]);
    },
    locked: function () {
      return !!load().lock;
    },
    lock: function (ending) {
      var s = load();
      s.lock = ending;
      save(s);
    },
    reset: function () {
      localStorage.removeItem(KEY);
    }
  };
})(window);
