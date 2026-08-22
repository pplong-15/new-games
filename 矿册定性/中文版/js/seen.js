(function () {
  var KEY = "kc_seen";
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function save(o) {
    localStorage.setItem(KEY, JSON.stringify(o));
  }
  var page = document.documentElement.getAttribute("data-seen");
  if (page) {
    var o = load();
    o[page] = 1;
    save(o);
  }
  window.kcSeen = load;
})();
