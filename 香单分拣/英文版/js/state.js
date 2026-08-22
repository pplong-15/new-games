/* Fuzhe night queue. Tickets push in. Attachments follow. Recommend only. */
(function (global) {
  var KEY = "mewan-fuzhe-xiangdan-v1-en";
  var START = 22 * 60 + 8;
  var DEADLINE = 24 * 60 + 5 * 60 + 30;

  var ORDER = ["he", "burn", "yulan", "ji", "guest", "lamp", "wed"];

  var TICKETS = {
    he: { no: "FZ-0714-03", title: "He Peinian  seventh-month home rite", href: "ticket-he.html" },
    burn: { no: "FZ-0714-11", title: "Yan Qiuhe  alley clothing-burn", href: "ticket-burn.html" },
    yulan: { no: "FZ-0714-18", title: "Tong Shuang  Guangci lamp renewal", href: "ticket-yulan.html" },
    ji: { no: "FZ-0714-22", title: "Ji Wanqiu  ancestral-niche ancestral seat", href: "ticket-ji.html" },
    guest: { no: "FZ-0714-27", title: "Hometown assoc.  clothing offering", href: "ticket-guest.html" },
    lamp: { no: "FZ-0714-31", title: "Tong Shuang  embankment lamps", href: "ticket-lamp.html" },
    wed: { no: "FZ-0714-08", title: "Chao Wanqing  banquet inquiry", href: "ticket-wed.html" }
  };

  var PUSH = {
    he: [
      { href: "ticket-he-old.html", label: "He family last-year receipt copy" },
      { href: "shop-rule.html", label: "This shop's three-table split" }
    ],
    burn: [
      { href: "ban-burn.html", label: "Nanmen Alley burn ban" },
      { href: "ban-faq.html", label: "Designated-site Q&A" },
      { href: "ban-alley.html", label: "Alley mouth site note" }
    ],
    yulan: [
      { href: "gongde.html", label: "Guangci online merit desk" },
      { href: "gongde-zheng.html", label: "Ancestral-seat donor extract" },
      { href: "temple-hours.html", label: "Lamp-offering notice" }
    ],
    ji: [
      { href: "gongde-solitary.html", label: "Unclaimed-seat donor list" },
      { href: "ledger.html", label: "Shop tablet-ledger index" },
      { href: "ledger-ji.html", label: "Ji-house ledger slip" },
      { href: "tongxiang.html", label: "Teochew hometown association home" },
      { href: "tongxiang-list.html", label: "Died-away-from-home roster" },
      { href: "tongxiang-notice.html", label: "Ullambana association notice" },
      { href: "handover.html", label: "Huo Mai stopped blog" },
      { href: "handover-old.html", label: "Huo Mai earlier post" },
      { href: "im-kai.html", label: "Kaiping phone extract" },
      { href: "folk-archive.html", label: "Folk-archive table-split card" },
      { href: "paper-list.html", label: "Nanmen paper-craft reconcile" }
    ],
    guest: [],
    lamp: [
      { href: "ban-river.html", label: "Embankment no-release stretch" },
      { href: "folklore-lamp.html", label: "Night Read river-lamp piece" }
    ],
    wed: [{ href: "folklore-july.html", label: "Night Read July notes" }]
  };

  var EXTRA = {
    "folk-archive": [{ href: "folk-yuan.html", label: "Archive Zhongyuan entry" }],
    "paper-list": [
      { href: "paper-cancel.html", label: "One clothing-offering cancel" },
      { href: "paper-note.html", label: "Lan shop material math" }
    ]
  };

  var HINTS = [
    "Look at the first ticket that pushed in. Attachments do not get searched out. Open that ticket and the tray grows.",
    "The He ticket is complete. Walk it as a home rite. The clothing-burn ticket needs a check against whether the street still allows fire.",
    "On the Ji ticket, do not stare only at the table the applicant ticked. The donor list, the association name, and this shop's ledger will follow.",
    "Shoucheng goes to the solitary-soul table. The ancestral-seat slot is still Boyuan, June 19. Hold Wanqiu's ticket and change the table."
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
    return (day ? "15th " : "14th ") + pad(h) + ":" + pad(m);
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
      /* Directory pages hang the next push. pages[] is the gate. */
    }
    save(s);
    return s;
  }

  function openTicket(id) {
    var s = load();
    if (!canOpen(id)) {
      toast("The last ticket still has no note. This one will not push in.");
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
      toast("The receipt is already filed. Fields stay locked.");
      return false;
    }
    if (s.min >= DEADLINE && id !== "ji" && !s.sorted.ji) {
      toast("It is morning. The Ji ticket is still empty. Do not fill the later ones yet.");
      return false;
    }
    if (!canOpen(id)) {
      toast("This ticket is not in the queue yet.");
      return false;
    }
    if (s.sorted[id]) {
      toast("This ticket is already written. It cannot be changed.");
      return false;
    }
    s.sorted[id] = { action: action, desk: desk, note: (note || "").slice(0, 180) };
    s.min += 6;
    save(s);
    toast("Note written. The next ticket, if any, will push itself into the queue.");
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
      toast("The queue is not empty. The receipt cannot go out.");
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
    toast("The last ticket is unfinished. This one will not open.");
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
    toast("This attachment has not been pushed to the tray yet.");
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
