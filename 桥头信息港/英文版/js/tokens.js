(function (g) {
  var KEY = "qiaotou-v1-en";
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
  g.QTG = {
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
    reset: function () {
      localStorage.removeItem(KEY);
    }
  };
})(window);
