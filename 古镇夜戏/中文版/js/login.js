(function () {
  function go() {
    var el = document.getElementById("pw");
    var err = document.getElementById("err");
    if (!el) return;
    var v = String(el.value || "").replace(/\s+/g, "").toUpperCase();
    var raw = String(el.value || "").replace(/\s+/g, "");
    if (v === "YX-0821-19" || raw === "13972810834") {
      if (window.GXZ) GXZ.grant("t_login");
      location.href = "order.html";
    } else if (err) {
      err.textContent = "票号或手机号对不上。";
    }
  }
  document.addEventListener("DOMContentLoaded", function () {
    var b = document.getElementById("login-go");
    if (b) b.onclick = go;
    var el = document.getElementById("pw");
    if (el) el.addEventListener("keydown", function (e) {
      if (e.key === "Enter") { e.preventDefault(); go(); }
    });
  });
})();
