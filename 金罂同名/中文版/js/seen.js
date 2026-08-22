(function () {
  var key = document.documentElement.getAttribute("data-seen");
  if (!key) return;
  try {
    var o = JSON.parse(localStorage.getItem("jy_seen") || "{}");
    o[key] = 1;
    localStorage.setItem("jy_seen", JSON.stringify(o));
  } catch (e) {}
})();
