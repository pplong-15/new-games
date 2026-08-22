(function () {
  var STORE = "lazue_xunzhan_v1";
  var CORRECT = ["fushun", "cuiji", "jingxuan"];
  var ALL = ["portal", "fushun", "jiedao", "cuiji", "jingxuan", "forum", "chunni", "baike", "tanggua", "jingua", "stock"];
  var NAMES = {
    portal: "星辉网址之家",
    fushun: "福顺年货",
    jiedao: "西关街道页",
    cuiji: "崔记灶码",
    jingxuan: "净轩家政",
    forum: "西关生活论坛",
    chunni: "春泥扫尘",
    baike: "小年词条",
    tanggua: "西关糖瓜铺",
    jingua: "净瓜家政",
    stock: "安津行情"
  };

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "{}");
    } catch (e) {
      return {};
    }
  }

  function save(s) {
    localStorage.setItem(STORE, JSON.stringify(s));
  }

  function selectedIds() {
    var marks = load().marks || {};
    return ALL.filter(function (id) {
      return !!marks[id];
    });
  }

  window.Patrol = {
    boot: function () {
      localStorage.removeItem(STORE);
    },
    isOn: function (id) {
      return !!(load().marks || {})[id];
    },
    bindForm: function (form) {
      var marks = load().marks || {};
      ALL.forEach(function (id) {
        var box = form.querySelector('input[value="' + id + '"]');
        if (box) box.checked = !!marks[id];
      });
      form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        var next = {};
        ALL.forEach(function (id) {
          var box = form.querySelector('input[value="' + id + '"]');
          if (box && box.checked) next[id] = true;
        });
        var s = load();
        s.marks = next;
        save(s);
        var picked = selectedIds();
        var extra = picked.filter(function (id) {
          return CORRECT.indexOf(id) < 0;
        });
        var missed = CORRECT.filter(function (id) {
          return picked.indexOf(id) < 0;
        });
        s.picked = picked;
        s.extra = extra;
        s.missed = missed;
        if (extra.length === 0 && missed.length === 0) {
          s.result = "off";
          save(s);
          location.href = "ending-off.html";
        } else if (extra.length > 0) {
          s.result = "bounce";
          save(s);
          location.href = "ending-bounce.html";
        } else {
          s.result = "miss";
          save(s);
          location.href = "ending-miss.html";
        }
      });
    },
    fillReason: function (kind, el) {
      if (!el) return;
      var s = load();
      var extra = s.extra || [];
      var missed = s.missed || [];
      var hit = (s.picked || []).filter(function (id) {
        return CORRECT.indexOf(id) >= 0;
      });
      var line = "";
      if (kind === "off") {
        line = "回执上三格填的是福顺年货、崔记灶码、净轩家政。路桂芬电话里只嗯了一声。";
      } else if (kind === "bounce") {
        if (extra.indexOf("chunni") >= 0) {
          line = "春泥那页你也勾了。路桂芬回单写：扫尘站没有把香灰写成垃圾，退回重核。";
        } else if (extra.indexOf("jiedao") >= 0) {
          line = "街道自己的通知你也报关停。值班室上午把回执打回来，边上批了四个字：对象不符。";
        } else if (extra.indexOf("baike") >= 0) {
          line = "词条不是铺子。回单夹了一张黄纸：百科页关不掉，别拿来凑数。";
        } else if (extra.indexOf("forum") >= 0) {
          line = "论坛是人说话的地方，不是铺子。路桂芬让方正平转告：帖子关了算你惹事。";
        } else if (extra.indexOf("portal") >= 0) {
          line = "星辉网址之家是本店主页。方正平看见回执复印件，当场把夜班饭票收回去了。";
        } else if (extra.indexOf("tanggua") >= 0) {
          line = "糖瓜铺按本街日子出摊，页上没写错日。路桂芬退回：干净铺子不要填进格子。";
        } else if (extra.indexOf("jingua") >= 0) {
          line = "净瓜只写擦窗。回单夹字：近名不是净轩，别看花眼。";
        } else if (extra.indexOf("stock") >= 0) {
          line = "行情页关不掉货。值班室批：别拿指数站来凑关停。";
        } else {
          line = "回执里夹了不该关的站：" + extra.map(function (id) { return NAMES[id] || id; }).join("、") + "。单子打回来了。";
        }
        if (hit.length) {
          line += "对上的只有" + hit.map(function (id) { return NAMES[id]; }).join("、") + "。";
        }
      } else if (kind === "miss") {
        var bits = [];
        if (missed.indexOf("fushun") >= 0) bits.push("福顺还挂着，廿四那天她会把纸马卖出去");
        if (missed.indexOf("cuiji") >= 0) bits.push("崔记红纸没揭，头七没过灶码还在柜上");
        if (missed.indexOf("jingxuan") >= 0) bits.push("净轩垃圾袋那句还在，物业要是贴单算你漏的");
        line = bits.length ? bits.join("。") + "。" : "三格空着交上去，路桂芬连章都没盖。";
      }
      el.textContent = line;
    }
  };
})();
