(function () {
  var key = document.documentElement.getAttribute("data-seen");
  if (!key) return;
  try {
    var o = JSON.parse(localStorage.getItem("jy_seen-en") || "{}");
    o[key] = 1;
    localStorage.setItem("jy_seen-en", JSON.stringify(o));
  } catch (e) {}
})();
