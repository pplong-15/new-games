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
  var seen = load();
  var links = document.querySelectorAll(".tl a[href]");
  for (var i = 0; i < links.length; i++) {
    var href = links[i].getAttribute("href") || "";
    var sid = href.replace(/^.*\//, "").replace(/\.html(?:#.*)?$/, "");
    if (seen[sid]) {
      if ((" " + links[i].className + " ").indexOf(" heard ") < 0) {
        links[i].className += " heard";
      }
    } else if ((" " + links[i].className + " ").indexOf(" unheard ") < 0) {
      links[i].className += " unheard";
    }
  }
})();
