(function () {
  var KEY = "yt_en_seen";
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); }
    catch (e) { return {}; }
  }
  function save(o) {
    localStorage.setItem(KEY, JSON.stringify(o));
  }
  var id = document.documentElement.getAttribute("data-seen");
  if (id) {
    var o = load();
    o[id] = 1;
    save(o);
  }
  window.ytSeen = load;
})();
