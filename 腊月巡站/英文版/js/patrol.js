(function () {
  var STORE = "lazue_xunzhan_v1-en";
  var CORRECT = ["fushun", "cuiji", "jingxuan"];
  var ALL = ["portal", "fushun", "jiedao", "cuiji", "jingxuan", "forum", "chunni", "baike", "tanggua", "jingua", "stock"];
  var NAMES = {
    portal: "Star Glow Site Directory",
    fushun: "Fushun New Year Goods",
    jiedao: "West Gate Subdistrict Page",
    cuiji: "Cuiji Kitchen God Prints",
    jingxuan: "Jingxuan Housekeeping",
    forum: "West Gate Life Forum",
    chunni: "Chunni Year-End Sweeping",
    baike: "Little New Year entry",
    tanggua: "West Gate Malt-Sugar Stall",
    jingua: "Jingua Window Cleaning",
    stock: "Anjin Quotes"
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
        line = "The slip’s three boxes were Fushun New Year Goods, Cuiji Kitchen God Prints, Jingxuan Housekeeping. Lu Guifen only hmmed on the phone.";
      } else if (kind === "bounce") {
        if (extra.indexOf("chunni") >= 0) {
          line = "You ticked Chunni too. Lu Guifen sent it back: the sweeping site did not write incense ash as trash. Recheck.";
        } else if (extra.indexOf("jiedao") >= 0) {
          line = "You filed the subdistrict’s own notices for takedown. Duty room bounced the slip this morning. Margin note: wrong object.";
        } else if (extra.indexOf("baike") >= 0) {
          line = "An encyclopedia entry is not a stall. The bounce had a yellow scrap: you cannot take an encyclopedia page down. Do not pad the list.";
        } else if (extra.indexOf("forum") >= 0) {
          line = "A forum is where people talk, not a stall. Lu Guifen told Fang Zhengping to pass on: closing threads counts as you starting trouble.";
        } else if (extra.indexOf("portal") >= 0) {
          line = "Star Glow Site Directory is this cafe’s own homepage. Fang Zhengping saw the carbon and took the night meal tickets back on the spot.";
        } else if (extra.indexOf("tanggua") >= 0) {
          line = "The malt-sugar stall opens on this street’s date. The page did not write the wrong day. Lu Guifen bounced it: do not put a clean stall in the box.";
        } else if (extra.indexOf("jingua") >= 0) {
          line = "Jingua only wrote window-wiping. Bounce note: a near name is not Jingxuan. Do not mix them up.";
        } else if (extra.indexOf("stock") >= 0) {
          line = "A quotes page cannot take goods down. Duty room: do not pad a takedown with an index site.";
        } else {
          line = "The slip included sites that should not be closed: " + extra.map(function (id) { return NAMES[id] || id; }).join(", ") + ". It came back.";
        }
        if (hit.length) {
          line += " The ones that matched were only " + hit.map(function (id) { return NAMES[id]; }).join(", ") + ".";
        }
      } else if (kind === "miss") {
        var bits = [];
        if (missed.indexOf("fushun") >= 0) bits.push("Fushun is still up; on the 24th she will sell the paper horses");
        if (missed.indexOf("cuiji") >= 0) bits.push("Cuiji’s red paper is still up; the first seven days are not over and the Kitchen God prints are still on the counter");
        if (missed.indexOf("jingxuan") >= 0) bits.push("Jingxuan’s trash-bag line is still there; if the compound posts a slip that one is on you");
        line = bits.length ? bits.join(". ") + "." : "You sent three empty boxes. Lu Guifen did not even stamp.";
      }
      el.textContent = line;
    }
  };
})();
