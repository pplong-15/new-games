(function () {
  var NEED = {
    appeal: ["t_ticket", "t_visit", "t_order"],
    strike: ["t_yinggong", "t_xidan", "t_xianghuo"],
    enter: ["t_ticket", "t_visit", "t_forum"],
    day: ["t_baixi", "t_yinggong"]
  };
  var GO = {
    appeal: "end-appeal.html",
    strike: "end-strike.html",
    enter: "end-enter.html",
    day: "end-day.html"
  };
  var MISS = {
    appeal: "申诉袋不齐。购票页、参观须知、你的订单，三张都要在。",
    strike: "划名还对不上。应工簿、戏单边注、香火账要同一号。",
    enter: "入场条不齐。票、须知、龙套那帖都看过才放行。",
    day: "白戏附则还没对上应工簿。"
  };
  function ready() {
    var box = document.getElementById("ending-box");
    if (!box || !window.GXZ) return;
    if (GXZ.locked()) {
      var el = document.getElementById("end-msg");
      if (el) el.textContent = "今晚已经交过一条。";
    }
    var ids = Object.keys(NEED);
    for (var i = 0; i < ids.length; i++) {
      var k = ids[i];
      var btn = document.getElementById("end-" + k);
      if (!btn) continue;
      btn.onclick = (function (kind) {
        return function () {
          if (GXZ.locked()) return;
          if (GXZ.hasAll(NEED[kind])) {
            GXZ.lock(kind);
            location.href = GO[kind];
          } else {
            var el = document.getElementById("end-msg");
            if (el) el.textContent = MISS[kind];
          }
        };
      })(k);
    }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
