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
    transfer: "过户袋还没齐。须知改过没有、今晚帖是不是你的地址、吴秋把名甩出来没有，三样都要落袋。",
    refund: "退款单还没齐。冷静期条款和办公地址都要落在袋里。",
    empty: "改地址被拒。拆迁公示和迁出抄件对不上，何小满那栏还空着。差一块就还算有人住。",
    unbind: "回滚还亮不了。旧须知原稿、没发出去的草稿、祭桥日子要对上。"
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
