(function () {
  var KEY = "kc_marks-en";
  var END = "kc_end-en";
  var PEOPLE = [
    { id: "huo", name: "Huo Chengshan", draft: "in-shaft", truth: "down" },
    { id: "weng", name: "Weng Erhai", draft: "in-shaft", truth: "down" },
    { id: "shang", name: "Shang Xiaoman", draft: "in-shaft", truth: "down" },
    { id: "ning", name: "Ning Guangfu", draft: "in-shaft", truth: "wrong" },
    { id: "qu", name: "Qu Peiyi", draft: "in-shaft", truth: "surface" },
    { id: "xing", name: "Xing Guilin", draft: "in-shaft", truth: "surface" },
    { id: "tan", name: "Tan Qiusheng", draft: "on surface", truth: "surface" },
    { id: "lan", name: "Lan Shoutian", draft: "in-shaft", truth: "moved" },
    { id: "yin", name: "Yin Fulai", draft: "in-shaft", truth: "moved" },
    { id: "ge", name: "Ge Wancai", draft: "in-shaft", truth: "wrong" }
  ];
  var LABELS = [
    { v: "down", t: "in-shaft" },
    { v: "surface", t: "on surface" },
    { v: "moved", t: "already relocated" },
    { v: "wrong", t: "wrongly entered" }
  ];
  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }
  function save(o) {
    localStorage.setItem(KEY, JSON.stringify(o));
  }
  function filled(m) {
    return PEOPLE.every(function (p) {
      return m[p.id];
    });
  }
  function pick(m) {
    var downOk = m.huo === "down" && m.weng === "down" && m.shang === "down";
    if (!downOk) return "erase";
    var exact = PEOPLE.every(function (p) {
      return m[p.id] === p.truth;
    });
    if (exact) return "adopt";
    if (m.ning === "down" || m.ge === "down") return "legend";
    return "chaos";
  }
  window.kcReg = {
    PEOPLE: PEOPLE,
    LABELS: LABELS,
    load: load,
    save: save,
    filled: filled,
    pick: pick,
    END: END
  };

  function mountTable() {
    var tb = document.getElementById("reg-body");
    if (!tb) return;
    var marks = load();
    tb.innerHTML = PEOPLE.map(function (p) {
      var radios = LABELS.map(function (lb) {
        var chk = marks[p.id] === lb.v ? " checked" : "";
        return (
          "<label><input type='radio' name='r-" +
          p.id +
          "' value='" +
          lb.v +
          "'" +
          chk +
          "> " +
          lb.t +
          "</label>"
        );
      }).join(" ");
      return (
        "<tr><td>" +
        p.name +
        "</td><td>" +
        p.draft +
        "</td><td class='goes'>" +
        radios +
        "</td></tr>"
      );
    }).join("");
    tb.addEventListener("change", function (e) {
      var el = e.target;
      if (!el.name || el.name.indexOf("r-") !== 0) return;
      var cur = load();
      cur[el.name.slice(2)] = el.value;
      save(cur);
    });
  }

  function mountSubmit() {
    var btn = document.getElementById("send-btn");
    var warn = document.getElementById("send-warn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var m = load();
      if (!filled(m)) {
        if (warn) warn.hidden = false;
        return;
      }
      localStorage.setItem(END, pick(m));
      location.href = "result.html";
    });
  }

  function boot() {
    mountTable();
    mountSubmit();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
