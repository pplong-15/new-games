(function () {
  var NEED = {
    transfer: ["t_notice", "t_tonight", "t_wuqiu"],
    refund: ["t_notice", "t_tonight", "t_wuqiu", "t_gongzhu", "t_office"],
    empty: ["t_notice", "t_tonight", "t_wuqiu", "t_demolish", "t_moveout", "t_xiaoman"],
    unbind: ["t_notice", "t_tonight", "t_wuqiu", "t_oldnotice", "t_rollback", "t_bridge"]
  };
  var GO = {
    transfer: "end-transfer.html",
    refund: "end-refund.html",
    empty: "end-empty.html",
    unbind: "end-unbind.html"
  };
  var MISS = {
    transfer: "The transfer pouch isn't complete. Whether the notice was revised, whether tonight's post is your address, whether Wu Qiu put the name out — all three have to land in the pouch.",
    refund: "The refund slip isn't complete. CoolingOff terms and the Office address both have to land in the pouch.",
    empty: "Address change refused. The Demolish notice and the MoveOut copy don't line up, and He Xiaoman's field is still blank. One piece short and it still counts as occupied.",
    unbind: "Rollback still won't light. The OldNotice original, the unsent draft, and the BridgeRite day have to line up."
  };

  function ready() {
    var box = document.getElementById("ending-box");
    if (!box || !window.QTG) return;
    var ids = Object.keys(NEED);
    for (var i = 0; i < ids.length; i++) {
      var k = ids[i];
      var btn = document.getElementById("end-" + k);
      if (!btn) continue;
      if (window.QTG.hasAll(NEED[k])) {
        btn.disabled = false;
        btn.onclick = (function (kind) {
          return function () {
            location.href = GO[kind];
          };
        })(k);
      } else {
        btn.disabled = true;
        btn.onclick = (function (kind) {
          return function () {
            var el = document.getElementById("end-msg");
            if (el) el.textContent = MISS[kind];
          };
        })(k);
      }
    }
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", ready);
  else ready();
})();
