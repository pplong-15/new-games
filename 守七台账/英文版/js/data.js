window.SHOUQI = {
  total: 36,
  saveKey: "shouqi-taizhang-v1-en",
  shiftName: {
    1: "Touqi night · 18:00–20:00",
    2: "Touqi night · 20:00–22:00",
    3: "Touqi night · 22:00 to zi hour"
  },
  claims: {
    v_end_chu2: { text: "Transfer end-date is the 2nd of the sixth month" },
    v_obit_chu1: { text: "The obituary wrote the end-date as the 1st" },
    v_tonight_chu7: { text: "Tonight the house calendar is the 7th of the sixth month" },
    v_touqi_chu8: { text: "By this house's count, touqi falls on the night of the 8th" },
    v_flag_chu1: { text: "The hall banners are counting from the 1st" },
    v_family_open: { text: "The family wants the hall opened tonight" },
    v_xiu_unpaid: { text: "Hao Xiufen has not paid the sixth-seven share" },
    v_reloc: { text: "Hao Qiming is rushing a signature on the morning of the 8th" }
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
      { file: "p10-obit.html", label: "Obituary board", sent: true, need: [] },
      { file: "p11-ice.html", label: "Transfer slip", sent: false, need: [] },
      { file: "p12-chain.html", label: "Hao family chain", sent: false, need: [] },
      { file: "p31-almanac.html", label: "Almanac notes", sent: false, need: [] }
    ],
    2: [
      { file: "p13-libu.html", label: "Gift ledger", sent: false, need: ["v_obit_chu1"] },
      { file: "p15-book.html", label: "Farewell hall booking", sent: false, need: ["v_family_open"] },
      { file: "p21-qzone.html", label: "Xiufen's space", sent: false, need: ["v_end_chu2"] }
    ],
    3: [
      { file: "p16-jiri.html", label: "Day-count register", sent: false, need: ["v_end_chu2"] },
      { file: "p17-debt.html", label: "Household-share IOU", sent: false, need: ["v_xiu_unpaid"] },
      { file: "p18-civil.html", label: "Township notice", sent: false, need: ["v_flag_chu1"] }
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
    "This shift, pull the obituary board first. Click the door. Do not use the top bar to open an original.",
    "The end-date on the transfer slip and the end-date on the obituary do not match. A page you only opened goes back at handover. To keep it, pin it to the shift book.",
    "The shift book only takes what is proven. The sixth night in the travel write-up is not this house's count. A married-out daughter's share is a sixth-seven debt.",
    "To stop-open the hall you need four together: transfer end-date, tonight, the banner count, and this house's seventh night. The numbers are on the slips you pinned. This box will not fill them in."
  ]
};
