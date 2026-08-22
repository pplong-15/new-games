window.GAME = {
  meta: {
    saveKey: "tongchuang-online-v1",
    schemaVersion: 1,
    totalPages: 36,
    publicPages: ["intro", "home", "find", "school", "help", "apps", "search", "forbidden"],
    endingNeed: ["fact_spare", "fact_papers", "fact_cxb", "fact_sls", "fact_lin"]
  },
  keywords: [
    { id: "k01", queries: ["纸马课", "吴启明"], opens: ["blog-paperhorse"], alsoOpens: ["blog-night"] },
    { id: "k02", queries: ["沈记纸扎", "沈记"], opens: ["shenji"] },
    { id: "k03", queries: ["沈亦舟"], opens: ["space-syz"], alsoOpens: ["gift"] },
    { id: "k04", queries: ["最近来访"], opens: ["visitors"] },
    { id: "k05", queries: ["陈小北"], opens: ["profile-cxb"], alsoOpens: ["album-cxb"] },
    { id: "k06", queries: ["04计1班", "计1班"], opens: ["class"], alsoOpens: ["login"] },
    { id: "k07", queries: ["班级公约"], opens: ["class-rules"] },
    { id: "k08", queries: ["阴册"], opens: ["yince"] },
    { id: "k09", queries: ["过继"], opens: ["gazetteer"] },
    { id: "k10", queries: ["替身"], opens: ["reservoir"] },
    { id: "k11", queries: ["埠头水库", "水库"], opens: ["reservoir"] },
    { id: "k12", queries: ["周棠"], opens: ["album-zt"], alsoOpens: ["wall-zt"] },
    { id: "k13", queries: ["江晚晴"], opens: ["profile-jwq"] },
    { id: "k14", queries: ["沈秀兰"], opens: ["mp-sxl"] },
    { id: "k15", queries: ["沈连山"], opens: ["oral-sls"] },
    { id: "k16", queries: ["还阴债"], opens: ["forum"] },
    { id: "k17", queries: ["林昭弟", "沈昭弟"], opens: ["genealogy"] },
    { id: "k18", queries: ["香火"], opens: ["paper-list"], alsoOpens: ["shrine"] },
    { id: "k19", queries: ["纸人"], opens: ["paper-list"] },
    { id: "k20", queries: ["备用"], opens: ["profile-jwq"] },
    { id: "k21", queries: ["关站"], opens: ["mp-local"] },
    { id: "k22", queries: ["源码", "管理员密码"], opens: ["forbidden"], forbidden: true }
  ],
  login: {
    users: ["沈亦舟", "shenyz"],
    passwords: ["先上香"],
    near: [
      { user: "陈小北", feedback: "这是发链接的人，不是班级公共主页的管理员。" },
      { user: "江晚晴", feedback: "这是你的旧账号。公共主页要用管理员登录。" },
      { pass: "纸马", feedback: "那是选修课的名字，不是进门的口令。" },
      { pass: "冬至", feedback: "日子接近。店里进门要先做的那件事，才是口令。" },
      { pass: "续香", feedback: "接近。他说过进门不要先说话，要先做什么。" },
      { pass: "上香", feedback: "少了一个字。口令是店里那句完整的话。" }
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
      "先把首页当一份还没关的站点来读，不要找任务栏。",
      "新鲜事和帮助里反复出现同一门选修课的名字。",
      "把那四个字原样送进顶栏搜索，一次只搜一个词。",
      "搜索「纸马课」，打开吴启明的日志。"
    ],
    p02: [
      "日志里的实习地点不是学校教室。",
      "作坊有店号，写在日志后段。",
      "用店号去搜，会离开蓝条站，进到一份旧企业页。",
      "搜索「沈记纸扎」。"
    ],
    p03: [
      "纸扎铺会写学徒和班级管理员。",
      "管理员是沈家的孩子，名字在企业页正文里。",
      "搜他的真名，会进入带模块墙的个人空间。",
      "搜索「沈亦舟」。"
    ],
    p04: [
      "个人空间右侧常有一块别人来看过的记录。",
      "沈亦舟空间把那块写成了可搜的栏目名。",
      "栏目名四个字，和当年校园站一样。",
      "搜索「最近来访」。"
    ],
    p05: [
      "来访名单里有一个不该还能走动的同学。",
      "发链接给你的人，首页也出现过。",
      "用他的真名搜个人主页和相册。",
      "搜索「陈小北」。"
    ],
    p06: [
      "陈小北和校园页都提到一个班的公共主页。",
      "班号写成数字加专业简称。",
      "搜班号会进入浅青底的另一套页面，那不是同窗首页。",
      "搜索「04计1班」。"
    ],
    p07: [
      "公共主页要管理员才能进里面。",
      "登录名是沈亦舟的真名，口令在他的空间或礼物页。",
      "先看空间里进门那句话，不要猜英文密码。",
      "账号填「沈亦舟」，口令填「先上香」。"
    ],
    p08: [
      "登录后先读班规，不要急着点新鲜事。",
      "班规把一份不该公开的册子写进了条文。",
      "那两个字是丧葬和登记用的。",
      "搜索「班级公约」，再搜公约里的「阴册」。"
    ],
    p09: [
      "阴册是卷宗，不是社交页。",
      "用这两个字搜即可打开。",
      "不要改地址栏去猜文件名。",
      "搜索「阴册」。"
    ],
    p10: [
      "阴册里有改姓记录，地方志会用另一个词。",
      "那是把孩子写入旁支的手续名。",
      "词在阴册备注和地方志都能看见。",
      "搜索「过继」。"
    ],
    p11: [
      "过继页会把你推向一次水利事故。",
      "事故页和阴册都出现“替代到场的人”。",
      "两个词都能进同一份通报：事故地名，或替代本身。",
      "搜索「替身」或「埠头水库」。"
    ],
    p12: [
      "相册比名录更早露出多出来的人。",
      "陈小北相册评论里点过一个女同学的名字。",
      "搜她会打开另一套绿头模块墙。",
      "搜索「周棠」。"
    ],
    p13: [
      "纸扎铺现在的当家人是沈亦舟的母亲。",
      "她的名字在沈记企业页和阴册都能看见。",
      "搜她会打开一篇地方号访谈。",
      "搜索「沈秀兰」。"
    ],
    p14: [
      "访谈会把第一代纸扎匠的名字说出来。",
      "那是沈湾村里写进店招的人。",
      "搜他的名字会打开口述转载。",
      "搜索「沈连山」。"
    ],
    p15: [
      "口述里有一种把活人气数借给死人的说法。",
      "埠头论坛用三个字讨论过同一件事。",
      "词在口述末段和论坛标题里。",
      "搜索「还阴债」。"
    ],
    p16: [
      "1987 年那个被改姓的孩子有两个名字。",
      "阴册写过继前，族谱写过继后。",
      "任意一个都能打开族谱摘录。",
      "搜索「林昭弟」或「沈昭弟」。"
    ],
    p17: [
      "阴册附录有一行未启用。",
      "那行是你的旧账号真名，也写着备用。",
      "来访名单里你的头像是空的。",
      "搜索「江晚晴」或「备用」。"
    ],
    p18: [
      "纸人要靠来访续。名录和祠堂旧站都在用同一个词。",
      "词是香火，或直接搜纸人。",
      "打开名录后再去到场那一页表态。",
      "搜索「香火」或「纸人」，再进入名录末尾的选择。"
    ],
    end: [
      "你已经把三代人对上了。",
      "名录和祠堂里会指向选择页。",
      "注销是不应到，接班是把香接下来。",
      "打开选择页，自己提交。提示不会代你按。"
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
      '<div class="top"><div class="top-inner"><span class="logo">同窗</span>' +
      h.a("home", "首页") +
      h.a("find", "找人") +
      h.a("school", "校园") +
      h.a("apps", "应用") +
      h.a("help", "帮助") +
      (h.has("access_class") ? h.a("inbox", "站内信") : '<a href="' + (h.has("fact_class") || h.state.unlocked.indexOf("login") >= 0 ? "login.html" : "help.html") + '">登录</a>') +
      h.searchForm() +
      "</div></div>"
    );
  },
  snsSide: function (h, who) {
    return (
      '<div class="side"><div class="who"><div class="ph sq face">' + (who || "游客") + "</div><strong>" + (who || "未登录") + '</strong><span class="muted">桐溪二职 · 04计</span></div>' +
      h.a("home", "新鲜事") +
      h.a("find", "找人") +
      h.a("school", "校园") +
      (h.state.unlocked.indexOf("class") >= 0 ? h.a("class", "班级") : '<span class="nav-off">班级</span>') +
      h.a("apps", "应用") +
      h.a("help", "帮助") +
      (h.has("access_class") ? h.a("inbox", "站内信") : '<span class="nav-off">站内信</span>') +
      "</div>"
    );
  },
  snsRail: function () {
    return (
      '<div class="rail"><h3>最近来访</h3><p class="muted">登录后才能看清名字。现在只能看见灰影子。</p>' +
      '<div class="visit"><div class="ph face">?</div><span>??? 刚刚</span></div>' +
      '<div class="visit"><div class="ph face">?</div><span>??? 昨天</span></div>' +
      '<h3>可能认识的人</h3><p class="muted">推荐已停。系统还在用 2011 年的缓存。</p>' +
      '<div class="appad">应用中心已关闭。农场、车位、礼物都不开放充值。</div></div>'
    );
  }
};
