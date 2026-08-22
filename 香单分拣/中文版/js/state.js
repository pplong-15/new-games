/* 福泽网单夜班。申请弹入，附件推送。只建议，不批牌位。 */
(function (global) {
  var KEY = "mewan-fuzhe-xiangdan-v1";
  var START = 22 * 60 + 8;
  var DEADLINE = 24 * 60 + 5 * 60 + 30;

  var ORDER = ["he", "burn", "yulan", "ji", "guest", "lamp", "wed"];

  var TICKETS = {
    he: { no: "FZ-0714-03", title: "何培年　七月半家祭", href: "ticket-he.html" },
    burn: { no: "FZ-0714-11", title: "严秋禾　巷口烧衣", href: "ticket-burn.html" },
    yulan: { no: "FZ-0714-18", title: "童霜　广慈寺续灯", href: "ticket-yulan.html" },
    ji: { no: "FZ-0714-22", title: "纪晚秋　祖龛正祀", href: "ticket-ji.html" },
    guest: { no: "FZ-0714-27", title: "同乡会　孤衣代办", href: "ticket-guest.html" },
    lamp: { no: "FZ-0714-31", title: "童霜　河堤放灯", href: "ticket-lamp.html" },
    wed: { no: "FZ-0714-08", title: "巢晚晴　酒席问询", href: "ticket-wed.html" }
  };

  var PUSH = {
    he: [
      { href: "ticket-he-old.html", label: "何家去年回执抄件" },
      { href: "shop-rule.html", label: "本店三桌分法" }
    ],
    burn: [
      { href: "ban-burn.html", label: "南门巷禁烧通告" },
      { href: "ban-faq.html", label: "指定点问答" },
      { href: "ban-alley.html", label: "巷口点位说明" }
    ],
    yulan: [
      { href: "gongde.html", label: "广慈寺网上功德" },
      { href: "gongde-zheng.html", label: "正祀芳名摘页" },
      { href: "temple-hours.html", label: "供灯须知" }
    ],
    ji: [
      { href: "gongde-solitary.html", label: "无主位芳名" },
      { href: "ledger.html", label: "本店牌位底账目录" },
      { href: "ledger-ji.html", label: "纪家宅底账条" },
      { href: "tongxiang.html", label: "潮籍同乡会首页" },
      { href: "tongxiang-list.html", label: "客死名录" },
      { href: "tongxiang-notice.html", label: "盂兰会务通知" },
      { href: "handover.html", label: "霍麦停更日志" },
      { href: "handover-old.html", label: "霍麦更早一篇" },
      { href: "im-kai.html", label: "开平来电摘记" },
      { href: "folk-archive.html", label: "民俗馆分桌摘抄" },
      { href: "paper-list.html", label: "南门纸扎对账" }
    ],
    guest: [],
    lamp: [
      { href: "ban-river.html", label: "河堤禁放段" },
      { href: "folklore-lamp.html", label: "夜读河灯稿" }
    ],
    wed: [{ href: "folklore-july.html", label: "夜读七月札记" }]
  };

  var EXTRA = {
    "folk-archive": [{ href: "folk-yuan.html", label: "馆藏中元条目" }],
    "paper-list": [
      { href: "paper-cancel.html", label: "孤衣取消一笔" },
      { href: "paper-note.html", label: "蓝铺算料" }
    ]
  };

  var HINTS = [
    "先看弹进来的第一封。附件不会自己去搜，打开该单以后栏里会多几条。",
    "何家那封附件齐，按家祭走就行。烧衣那封要对照街上还能不能烧。",
    "纪家那封别只盯申请人勾的桌。芳名、会里的名、本店底账会跟过来。",
    "守成走孤魂席。正祀那格仍是伯元，六月十九。晚秋那封扣住，桌改过去。"
  ];

  function blank() {
    return {
      min: START,
      opened: {},
      sorted: {},
      pages: {},
      hint: 0,
      closed: false,
      ending: ""
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      var b = blank();
      Object.keys(b).forEach(function (k) {
        if (s[k] == null) s[k] = b[k];
      });
      return s;
    } catch (e) {
      return blank();
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function fmt(min) {
    var day = min >= 24 * 60 ? 1 : 0;
    var t = min % (24 * 60);
    var h = Math.floor(t / 60);
    var m = t % 60;
    return (day ? "十五 " : "十四 ") + pad(h) + ":" + pad(m);
  }

  function toast(msg) {
    var old = document.querySelector(".fz-toast");
    if (old) old.parentNode.removeChild(old);
    var el = document.createElement("div");
    el.className = "fz-toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2400);
  }

  function sortedCount(s) {
    var n = 0;
    for (var i = 0; i < ORDER.length; i++) {
      if (s.sorted[ORDER[i]]) n++;
      else break;
    }
    return n;
  }

  function visibleIds(s) {
    var n = sortedCount(s);
    var out = [];
    for (var i = 0; i < ORDER.length; i++) {
      if (i <= n) out.push(ORDER[i]);
    }
    return out;
  }

  function canOpen(id) {
    var s = load();
    var vis = visibleIds(s);
    return vis.indexOf(id) >= 0;
  }

  function visit(page, cost) {
    var s = load();
    if (!s.pages[page]) {
      s.pages[page] = true;
      if (!s.closed) s.min += cost || 3;
    } else if (!s.closed) {
      s.min += 1;
    }
    if (EXTRA[page]) {
      /* 打开目录页才把下层推送挂上，用 pages 本身作门 */
    }
    save(s);
    return s;
  }

  function openTicket(id) {
    var s = load();
    if (!canOpen(id)) {
      toast("上一封还没写入建议，这封不会弹出来。");
      return s;
    }
    if (!s.opened[id]) {
      s.opened[id] = true;
      if (!s.closed) s.min += 4;
    }
    save(s);
    return s;
  }

  function pushedList(s) {
    var items = [];
    var seen = {};
    function add(arr) {
      (arr || []).forEach(function (it) {
        if (seen[it.href]) return;
        seen[it.href] = true;
        items.push(it);
      });
    }
    ORDER.forEach(function (id) {
      if (s.opened[id]) add(PUSH[id]);
    });
    if (s.pages["folk-archive"]) add(EXTRA["folk-archive"]);
    if (s.pages["paper-list"]) add(EXTRA["paper-list"]);
    return items;
  }

  function submitTicket(id, action, desk, note) {
    var s = load();
    if (s.closed) {
      toast("回执已经交了，栏不再改。");
      return false;
    }
    if (s.min >= DEADLINE && id !== "ji" && !s.sorted.ji) {
      toast("天亮了。纪家那封还空着，先别填后面的。");
      return false;
    }
    if (!canOpen(id)) {
      toast("这封还不在队列里。");
      return false;
    }
    if (s.sorted[id]) {
      toast("这封已经写过，不能改。");
      return false;
    }
    s.sorted[id] = { action: action, desk: desk, note: (note || "").slice(0, 180) };
    s.min += 6;
    save(s);
    toast("建议已写入。下一封若有，会自己弹进队列。");
    return true;
  }

  function isLate(s) {
    return s.min >= DEADLINE;
  }

  function queueEmpty(s) {
    return ORDER.every(function (id) {
      return !!s.sorted[id];
    });
  }

  function noteHas(s, keys) {
    var ji = s.sorted.ji;
    if (!ji || !ji.note) return false;
    return keys.some(function (k) {
      return ji.note.indexOf(k) >= 0;
    });
  }

  function pickEnding(s) {
    if (!s.sorted.ji) return "late";
    var ji = s.sorted.ji;
    if (ji.action === "pass" && ji.desk === "zheng") return "pass";
    if (ji.action === "hold" && ji.desk === "gu") return "reroute";
    if (ji.action === "pass" && ji.desk === "gu") return "soft";
    if (ji.action === "hold") return "hold";
    return "hold";
  }

  function canClose(s) {
    if (s.closed) return true;
    if (!s.sorted.ji && isLate(s)) return true;
    return queueEmpty(s);
  }

  function closeShift() {
    var s = load();
    if (s.closed) return s;
    if (!canClose(s)) {
      toast("队列还没清完，回执交不出去。");
      return s;
    }
    s.closed = true;
    s.ending = pickEnding(s);
    save(s);
    return s;
  }

  function hintNext() {
    var s = load();
    if (s.hint < HINTS.length) s.hint += 1;
    save(s);
    return s.hint;
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function gateOrDesk(id) {
    if (canOpen(id)) return TICKETS[id].href;
    toast("上一封还没写完，这封不会开门。");
    return "desk.html";
  }

  var ALWAYS = {
    "desk.html": 1,
    "shift-note.html": 1,
    "desk-help.html": 1,
    "im-mi.html": 1,
    "night-log.html": 1,
    "introduction.html": 1,
    "search-closed.html": 1,
    "ticket-he.html": 1
  };

  function mayRead(href) {
    var s = load();
    if (ALWAYS[href]) return true;
    if (href === "result.html") return canClose(s) || s.closed;
    for (var id in TICKETS) {
      if (TICKETS[id].href === href) return visibleIds(s).indexOf(id) >= 0;
    }
    var list = pushedList(s);
    for (var i = 0; i < list.length; i++) {
      if (list[i].href === href) return true;
    }
    return false;
  }

  function guard(href) {
    if (mayRead(href)) return true;
    toast("这条还没推到栏里。");
    location.href = "desk.html";
    return false;
  }

  global.FZ = {
    TICKETS: TICKETS,
    ORDER: ORDER,
    HINTS: HINTS,
    load: load,
    save: save,
    fmt: fmt,
    toast: toast,
    visit: visit,
    openTicket: openTicket,
    canOpen: canOpen,
    visibleIds: function () {
      return visibleIds(load());
    },
    pushedList: function () {
      return pushedList(load());
    },
    submitTicket: submitTicket,
    isLate: function () {
      return isLate(load());
    },
    canClose: function () {
      return canClose(load());
    },
    closeShift: closeShift,
    pickEnding: pickEnding,
    noteHas: noteHas,
    hintNext: hintNext,
    reset: reset,
    clock: function () {
      return fmt(load().min);
    },
    gateOrDesk: gateOrDesk,
    mayRead: mayRead,
    guard: guard,
    DEADLINE: DEADLINE
  };
})(window);
