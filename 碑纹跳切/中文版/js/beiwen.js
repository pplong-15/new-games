(function () {
  var KEY = "beiwen-tiaqie-v1";
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
  window.BW = {
    mark: function (t) {
      var s = load();
      s.seen = s.seen || {};
      if (t) s.seen[t] = 1;
      s.last = location.href;
      save(s);
    },
    seen: function (t) {
      return !!(load().seen || {})[t];
    },
    all: function () {
      return load();
    },
    submit: function (choice) {
      var s = load();
      s.choice = choice;
      save(s);
      if (choice === "recarve") location.href = "result-recarve.html";
      else if (choice === "same") location.href = "result-same.html";
      else location.href = "result-approve.html";
    },
    clear: function () {
      localStorage.removeItem(KEY);
    }
  };
})();
