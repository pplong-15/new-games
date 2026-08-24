window.SHOUQI = {
  total: 36,
  saveKey: "shouqi-taizhang-v1",
  shiftName: {
    1: "头七夜 · 十八至二十时",
    2: "头七夜 · 二十至二十二时",
    3: "头七夜 · 二十二时至子时"
  },
  claims: {
    v_end_chu2: { text: "接运终期是六月初二" },
    v_obit_chu1: { text: "讣告把终期写成初一" },
    v_tonight_chu7: { text: "今晚馆内日历是六月初七" },
    v_touqi_chu8: { text: "按本馆算法头七在初八夜" },
    v_flag_chu1: { text: "厅里的幡按初一在计" },
    v_family_open: { text: "主家要今晚开厅" },
    v_xiu_unpaid: { text: "郝秀芬六七份子未交" },
    v_reloc: { text: "郝启明赶初八上午签字" }
  },
  correct: ["v_end_chu2", "v_tonight_chu7", "v_flag_chu1", "v_touqi_chu8"],
  publicFiles: [
    "introduction.html", "index.html", "search-results.html",
    "p02-halls.html", "p03-park.html", "p04-paused.html",
    "p05-desk.html", "p06-doors.html", "p07-login.html",
    "p09-forbidden.html", "p19-board.html", "p20-news.html",
    "p22-find.html", "p24-baike.html", "p26-rule.html",
    "p28-handover.html", "p29-phone.html", "p30-form.html",
    "p36-limits.html"
  ],
  doors: {
    1: [
      { file: "p10-obit.html", label: "讣告栏", sent: true, need: [] },
      { file: "p11-ice.html", label: "接运条", sent: false, need: [] },
      { file: "p12-chain.html", label: "郝家接龙", sent: false, need: [] },
      { file: "p31-almanac.html", label: "黄历宜忌", sent: false, need: [] }
    ],
    2: [
      { file: "p13-libu.html", label: "礼簿", sent: false, need: ["v_obit_chu1"] },
      { file: "p15-book.html", label: "告别厅预约", sent: false, need: ["v_family_open"] },
      { file: "p21-qzone.html", label: "秀芬空间", sent: false, need: ["v_end_chu2"] }
    ],
    3: [
      { file: "p16-jiri.html", label: "计日底册", sent: false, need: ["v_end_chu2"] },
      { file: "p17-debt.html", label: "房份欠条", sent: false, need: ["v_xiu_unpaid"] },
      { file: "p18-civil.html", label: "镇公示", sent: false, need: ["v_flag_chu1"] }
    ]
  },
  children: {
    "p11-ice.html": ["p27-reprint.html", "p25-wap.html"],
    "p13-libu.html": ["p14-schedule.html"],
    "p21-qzone.html": ["p32-letter.html"],
    "p18-civil.html": ["p23-mail.html"],
    "p16-jiri.html": ["p36-limits.html"]
  },
  endings: {
    "p33-stop.html": "stop",
    "p34-open.html": "open",
    "p35-late.html": "late"
  },
  hints: [
    "本班先调讣告栏。点门，不要用顶栏去开原件。",
    "接运条上的终期和讣告上的终期，对不上。打开过的页，交班就会还柜。要留下，得钉进交班本。",
    "交班本只收已证实。旅游文里的第六夜不是本馆算法。出嫁女的份子是六七的债。",
    "停厅要接运终期、今晚、幡面计日、本馆第七日夜，四条齐了成组交。数字在你钉过的条上，这里不代填。"
  ]
};
