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
    appeal: "Appeal packet is not complete. Ticket page, visit notice, and your order. All three have to be on file.",
    strike: "Strike-through still does not line up. DutyBook, Playbill margin, IncenseAccount. Same number.",
    enter: "Admission slip is not complete. Ticket, visit notice, and the Extra thread. All read before they let you through.",
    day: "WhitePlay rider is not yet matched to DutyBook."
  };
  function ready() {
    var box = document.getElementById("ending-box");
    if (!box || !window.GXZ) return;
    if (GXZ.locked()) {
      var el = document.getElementById("end-msg");
      if (el) el.textContent = "One slip already filed tonight.";
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
