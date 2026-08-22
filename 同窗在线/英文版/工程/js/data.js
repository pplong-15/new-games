window.GAME = {
  meta: {
    saveKey: "tongchuang-online-v1-en",
    schemaVersion: 1,
    totalPages: 36,
    publicPages: ["intro", "home", "find", "school", "help", "apps", "search", "forbidden"],
    endingNeed: ["fact_spare", "fact_papers", "fact_cxb", "fact_sls", "fact_lin"]
  },
  keywords: [
    { id: "k01", queries: ["PaperHorse", "WuQiming", "纸马课", "吴启明"], opens: ["blog-paperhorse"], alsoOpens: ["blog-night"] },
    { id: "k02", queries: ["ShenjiPaper", "Shenji", "沈记纸扎", "沈记"], opens: ["shenji"] },
    { id: "k03", queries: ["ShenYizhou", "沈亦舟"], opens: ["space-syz"], alsoOpens: ["gift"] },
    { id: "k04", queries: ["RecentVisits", "最近来访"], opens: ["visitors"] },
    { id: "k05", queries: ["ChenXiaobei", "陈小北"], opens: ["profile-cxb"], alsoOpens: ["album-cxb"] },
    { id: "k06", queries: ["Class04", "ClassCS", "04计1班", "计1班"], opens: ["class"], alsoOpens: ["login"] },
    { id: "k07", queries: ["ClassRules", "班级公约"], opens: ["class-rules"] },
    { id: "k08", queries: ["YinRegister", "阴册"], opens: ["yince"] },
    { id: "k09", queries: ["Adoption", "过继"], opens: ["gazetteer"] },
    { id: "k10", queries: ["StandIn", "替身"], opens: ["reservoir"] },
    { id: "k11", queries: ["ButouReservoir", "Reservoir", "埠头水库", "水库"], opens: ["reservoir"] },
    { id: "k12", queries: ["ZhouTang", "周棠"], opens: ["album-zt"], alsoOpens: ["wall-zt"] },
    { id: "k13", queries: ["JiangWanqing", "江晚晴"], opens: ["profile-jwq"] },
    { id: "k14", queries: ["ShenXiulan", "沈秀兰"], opens: ["mp-sxl"] },
    { id: "k15", queries: ["ShenLianshan", "沈连山"], opens: ["oral-sls"] },
    { id: "k16", queries: ["YinDebt", "还阴债"], opens: ["forum"] },
    { id: "k17", queries: ["LinZhaodi", "ShenZhaodi", "林昭弟", "沈昭弟"], opens: ["genealogy"] },
    { id: "k18", queries: ["IncenseList", "香火"], opens: ["paper-list"], alsoOpens: ["shrine"] },
    { id: "k19", queries: ["PaperFigure", "纸人"], opens: ["paper-list"] },
    { id: "k20", queries: ["Spare", "备用"], opens: ["profile-jwq"] },
    { id: "k21", queries: ["SiteClosed", "关站"], opens: ["mp-local"] },
    { id: "k22", queries: ["SourceCode", "AdminPassword", "源码", "管理员密码"], opens: ["forbidden"], forbidden: true }
  ],
  login: {
    users: ["ShenYizhou", "沈亦舟", "shenyz"],
    passwords: ["IncenseFirst", "先上香"],
    near: [
      { user: "ChenXiaobei", feedback: "That's the person who sent the link, not the admin of the class public page." },
      { user: "陈小北", feedback: "That's the person who sent the link, not the admin of the class public page." },
      { user: "JiangWanqing", feedback: "That's your old account. The public page wants the admin login." },
      { user: "江晚晴", feedback: "That's your old account. The public page wants the admin login." },
      { pass: "PaperHorse", feedback: "That's the elective's nickname, not the door phrase." },
      { pass: "纸马", feedback: "That's the elective's nickname, not the door phrase." },
      { pass: "Dongzhi", feedback: "The date is close. The first thing you do when you enter the shop is the passphrase." },
      { pass: "冬至", feedback: "The date is close. The first thing you do when you enter the shop is the passphrase." },
      { pass: "KeepIncense", feedback: "Close. He said don't speak first at the door. Do something first." },
      { pass: "续香", feedback: "Close. He said don't speak first at the door. Do something first." },
      { pass: "Incense", feedback: "One word short. The passphrase is the shop's full line." },
      { pass: "上香", feedback: "One word short. The passphrase is the shop's full line." }
    ]
  },
  hintOrder: [
    { id: "p01", need: "fact_paperhorse" },
    { id: "p02", need: "fact_shop" },
    { id: "p03", need: "fact_syz" },
    { id: "p04", need: "fact_visitors" },
    { id: "p05", need: "fact_cxb" },
    { id: "p06", need: "fact_class" },
    { id: "p07", need: "access_class" },
    { id: "p08", need: "fact_rules" },
    { id: "p09", need: "fact_yince" },
    { id: "p10", need: "fact_adoption" },
    { id: "p11", need: "fact_standin" },
    { id: "p12", need: "fact_zhou" },
    { id: "p13", need: "fact_sxl" },
    { id: "p14", need: "fact_sls" },
    { id: "p15", need: "fact_debt" },
    { id: "p16", need: "fact_lin" },
    { id: "p17", need: "fact_spare" },
    { id: "p18", need: "fact_papers" },
    { id: "end", need: "ending_logout" }
  ],
  hints: {
    p01: [
      "Read the home page as a site that never quite shut down. There is no quest bar.",
      "The feed and Help keep repeating the same old elective's nickname.",
      "Put that one token into the top search as printed. One token per search.",
      "Search PaperHorse. That opens WuQiming's log."
    ],
    p02: [
      "The internship in the log is not a classroom.",
      "The workshop has a shop name, written in the later paragraphs.",
      "Search the shop name and you leave the blue-bar site for an old company page.",
      "Search ShenjiPaper."
    ],
    p03: [
      "The paper shop names an apprentice who is also the class admin.",
      "The admin is a Shen child. The name is in the company-page body.",
      "Search the true name and you enter a modular personal space.",
      "Search ShenYizhou."
    ],
    p04: [
      "Personal spaces often keep a column for who looked.",
      "ShenYizhou's space writes that column as a searchable heading.",
      "The heading is one token, the same as on the old campus site.",
      "Search RecentVisits."
    ],
    p05: [
      "The visit list includes a classmate who should not still be moving.",
      "The person who sent you the link also appears on Home.",
      "Search the true name for a profile and an album.",
      "Search ChenXiaobei."
    ],
    p06: [
      "ChenXiaobei and the campus page both mention a class public page.",
      "The class id is written as digits plus a department short tag.",
      "Search the class id and you enter a pale-cyan set of pages. That is not the Classmates home.",
      "Search Class04."
    ],
    p07: [
      "The public page needs the admin before it opens the inside.",
      "The login name is ShenYizhou's true-name token. The passphrase is on the space or the gift page.",
      "Read the door line on the space. Do not guess a birthday or a student id.",
      "Login name ShenYizhou. Passphrase IncenseFirst."
    ],
    p08: [
      "After login, read the class rules before you chase the feed.",
      "The rules put a roll that should not be public into an article.",
      "The token is a funeral and registry word, written as one CamelCase heading.",
      "Search ClassRules, then the YinRegister named in the articles."
    ],
    p09: [
      "YinRegister is a dossier, not a social page.",
      "Search that one token to open it.",
      "Do not edit the address bar to guess filenames.",
      "Search YinRegister."
    ],
    p10: [
      "The register has a surname-change record. The gazetteer uses another word.",
      "It is the procedure for writing a child into a side branch.",
      "The word is visible on the register notes and on the gazetteer.",
      "Search Adoption."
    ],
    p11: [
      "The adoption page pushes you toward a water-works accident.",
      "The accident page and the register both mention a person who stood in.",
      "Either token opens the same bulletin: the place name, or the stand-in itself.",
      "Search StandIn or ButouReservoir."
    ],
    p12: [
      "Albums show the extra person earlier than the roster does.",
      "A comment on ChenXiaobei's album names a girl in the class.",
      "Search her and you open another green-bar module wall.",
      "Search ZhouTang."
    ],
    p13: [
      "The paper shop's present keeper is ShenYizhou's mother.",
      "Her name is on the Shenji company page and on the register.",
      "Search her and you open a local-account interview.",
      "Search ShenXiulan."
    ],
    p14: [
      "The interview says the first-generation paper craftsman's name.",
      "That is the person written on the Shenwan shop sign.",
      "Search the name and you open an oral-history reprint.",
      "Search ShenLianshan."
    ],
    p15: [
      "The oral history describes lending a living person's luck to the dead.",
      "The Butou forum used one token for the same practice.",
      "The word is in the oral excerpt and in the thread title.",
      "Search YinDebt."
    ],
    p16: [
      "The child whose surname was changed in 1987 has two names.",
      "The register writes the name before the transfer. The genealogy writes the name after.",
      "Either token opens the genealogy extract.",
      "Search LinZhaodi or ShenZhaodi."
    ],
    p17: [
      "The register appendix has a line that was never switched on.",
      "That line is your old account's true name, and it is marked Spare.",
      "On the visit list your avatar slot is empty.",
      "Search JiangWanqing or Spare."
    ],
    p18: [
      "Paper figures are kept going by visits. The roster and the old shrine site use the same word.",
      "The word is IncenseList, or search PaperFigure directly.",
      "Open the roster, then take a position on the last page.",
      "Search IncenseList or PaperFigure, then use the choice at the end of the roster."
    ],
    end: [
      "You have already matched the three generations.",
      "The last page is the choice pointed to by the roster or the shrine.",
      "Don't answer means you refuse the call. Take the incense means you continue the watch.",
      "Open the choice page and submit it yourself. Support will not press it for you."
    ]
  },
  puzzles: [
    { id: "p01", inputs: ["page:home"], outputs: ["fact_paperhorse"], unlocks: ["blog-paperhorse", "blog-night"] },
    { id: "p02", inputs: ["fact_paperhorse"], outputs: ["fact_shop"], unlocks: ["shenji"] },
    { id: "p03", inputs: ["fact_shop"], outputs: ["fact_syz"], unlocks: ["space-syz", "gift"] },
    { id: "p04", inputs: ["fact_syz"], outputs: ["fact_visitors"], unlocks: ["visitors"] },
    { id: "p05", inputs: ["page:home"], outputs: ["fact_cxb"], unlocks: ["profile-cxb", "album-cxb"] },
    { id: "p06", inputs: ["page:school"], outputs: ["fact_class"], unlocks: ["class", "login"] },
    { id: "p07", inputs: ["fact_syz"], outputs: ["access_class"], unlocks: ["class-rules", "class-feed", "inbox"] },
    { id: "p08", inputs: ["access_class"], outputs: ["fact_rules"], unlocks: ["class-rules"] },
    { id: "p09", inputs: ["fact_rules"], outputs: ["fact_yince"], unlocks: ["yince"] },
    { id: "p10", inputs: ["fact_yince"], outputs: ["fact_adoption"], unlocks: ["gazetteer"] },
    { id: "p11", inputs: ["fact_adoption"], outputs: ["fact_standin"], unlocks: ["reservoir"] },
    { id: "p12", inputs: ["fact_cxb"], outputs: ["fact_zhou"], unlocks: ["album-zt", "wall-zt"] },
    { id: "p13", inputs: ["fact_shop"], outputs: ["fact_sxl"], unlocks: ["mp-sxl"] },
    { id: "p14", inputs: ["fact_sxl"], outputs: ["fact_sls"], unlocks: ["oral-sls"] },
    { id: "p15", inputs: ["fact_sls"], outputs: ["fact_debt"], unlocks: ["forum"] },
    { id: "p16", inputs: ["fact_yince"], outputs: ["fact_lin"], unlocks: ["genealogy"] },
    { id: "p17", inputs: ["fact_yince"], outputs: ["fact_spare"], unlocks: ["profile-jwq"] },
    { id: "p18", inputs: ["fact_spare", "fact_sls"], outputs: ["fact_papers"], unlocks: ["paper-list", "shrine", "choice"] },
    { id: "p19a", inputs: ["fact_papers", "fact_spare", "fact_cxb", "fact_sls", "fact_lin"], outputs: ["ending_logout"] },
    { id: "p19b", inputs: ["fact_papers", "fact_spare", "fact_cxb", "fact_sls", "fact_lin"], outputs: ["ending_keep"] }
  ],
  combos: [
    { need: ["fact_papers", "fact_spare", "fact_cxb", "fact_sls", "fact_lin"], give: ["inference_three_layers"] }
  ],
  pages: {}
};

GAME.ui = {
  snsTop: function (h) {
    return (
      '<div class="top"><div class="top-inner"><span class="logo">Classmates</span>' +
      h.a("home", "Home") +
      h.a("find", "Find") +
      h.a("school", "Campus") +
      h.a("apps", "Apps") +
      h.a("help", "Help") +
      (h.has("access_class") ? h.a("inbox", "Inbox") : '<a href="' + (h.has("fact_class") || h.state.unlocked.indexOf("login") >= 0 ? "login.html" : "help.html") + '">Log in</a>') +
      h.searchForm() +
      "</div></div>"
    );
  },
  snsSide: function (h, who) {
    return (
      '<div class="side"><div class="who"><div class="ph sq face">' + (who || "Guest") + "</div><strong>" + (who || "Not signed in") + '</strong><span class="muted">Tongxi Voc-2 · Class04</span></div>' +
      h.a("home", "Feed") +
      h.a("find", "Find") +
      h.a("school", "Campus") +
      (h.state.unlocked.indexOf("class") >= 0 ? h.a("class", "Class") : '<span class="nav-off">Class</span>') +
      h.a("apps", "Apps") +
      h.a("help", "Help") +
      (h.has("access_class") ? h.a("inbox", "Inbox") : '<span class="nav-off">Inbox</span>') +
      "</div>"
    );
  },
  snsRail: function () {
    return (
      '<div class="rail"><h3>RecentVisits</h3><p class="muted">Names clear after login. For now you only see grey shadows.</p>' +
      '<div class="visit"><div class="ph face">?</div><span>??? just now</span></div>' +
      '<div class="visit"><div class="ph face">?</div><span>??? yesterday</span></div>' +
      '<h3>People you may know</h3><p class="muted">Recommendations stopped. The system still uses a 2011 cache.</p>' +
      '<div class="appad">App Center is closed. Farm, parking, and gifts do not take top-ups.</div></div>'
    );
  }
};
