window.GAME_META = {
  saveKey: "jinque-hall-v1",
  totalPages: 36,
  publicPages: ["intro", "home", "films", "hall", "snacks", "help", "search", "forbidden"],
  endingNeed: ["fact_stub", "fact_hou", "fact_lu", "fact_empty", "fact_tian"]
};

window.KEYWORD_TABLE = [
  { queries: ["加映场", "末场灯"], hrefs: ["pages/blog-jiaoying.html", "pages/blog-night.html"], titles: ["小棠的备份日志 - 加映场", "小棠的备份日志 - 机房那晚"], excerpts: ["加映不是多放一部片子。", "机房门从里面反锁。这是附带草稿。"], opens: ["blog-jiaoying", "blog-night"] },
  { queries: ["金鹊积分", "积分"], hrefs: ["pages/points.html"], titles: ["金鹊会员积分说明"], excerpts: ["积分只能留座，不能兑饮料。"], opens: ["points"] },
  { queries: ["田麦"], hrefs: ["pages/space-tianmai.html", "pages/gift.html", "pages/album.html"], titles: ["田麦的空间", "会员赠片记录", "大厅合影"], excerpts: ["放映员不在线。去把场灯续上。", "有人给场记寄过空白片头。", "后排多一个没五官的人。"], opens: ["space-tianmai", "gift", "album"] },
  { queries: ["留座"], hrefs: ["pages/seats.html"], titles: ["留座名单（内部）"], excerpts: ["空着的座位也要写名字。"], opens: ["seats"] },
  { queries: ["陆小棠"], hrefs: ["pages/post-lu.html", "pages/mail-lu.html"], titles: ["梨河影迷楼 - 谁还在看字幕", "场记邮箱"], excerpts: ["我把链接发给南南。", "未读一封：替我坐到完。"], opens: ["post-lu", "mail-lu"] },
  { queries: ["场记台", "青石场记"], hrefs: ["pages/desk.html", "pages/login.html"], titles: ["青石场记台 · 须知", "场记台登录"], excerpts: ["注册已关闭。管理员用真名进。", "口令不写在导航里。"], opens: ["desk", "login"] },
  { queries: ["场记手册"], hrefs: ["pages/handbook.html"], titles: ["场记手册（须登录）"], excerpts: ["空座比满座危险。"], opens: ["handbook"] },
  { queries: ["空座"], hrefs: ["pages/empty-seat.html"], titles: ["空座规程"], excerpts: ["字幕未完，座位上必须有人。"], opens: ["empty-seat"] },
  { queries: ["文娱志"], hrefs: ["pages/gazetteer.html"], titles: ["梨河县文娱资料摘录"], excerpts: ["金鹊录像厅 1987 年开业。"], opens: ["gazetteer"] },
  { queries: ["老侯"], hrefs: ["pages/obit-hou.html", "pages/oral.html"], titles: ["金鹊镇地方号 - 侯长河", "老放映员口述"], excerpts: ["机房起火那年，老板没有出来。", "口述不是证词。"], opens: ["obit-hou", "oral"] },
  { queries: ["胶片仓"], hrefs: ["pages/vault.html"], titles: ["胶片仓清点"], excerpts: ["有一盒片没有片名，只有座号。"], opens: ["vault"] },
  { queries: ["票根"], hrefs: ["pages/ticket.html"], titles: ["未取票根"], excerpts: ["特邀场记：方南星。"], opens: ["ticket"] },
  { queries: ["放映日志"], hrefs: ["pages/log.html"], titles: ["放映日志 2008–2012"], excerpts: ["加映场没有拷贝编号。"], opens: ["log"] },
  { queries: ["字幕"], hrefs: ["pages/credits.html"], titles: ["字幕人员表"], excerpts: ["场记一栏会改写成还活着的人。"], opens: ["credits"] },
  { queries: ["还灯债"], hrefs: ["pages/forum.html"], titles: ["梨河影迷楼 - 还灯债"], excerpts: ["灯灭之前要有人坐着。"], opens: ["forum"] },
  { queries: ["洗片间"], hrefs: ["pages/darkroom.html"], titles: ["洗片间（已停用）"], excerpts: ["药液见过血，也见过名字。"], opens: ["darkroom"] },
  { queries: ["寻场记"], hrefs: ["pages/classified.html"], titles: ["梨河分类信息 - 寻场记"], excerpts: ["找替班，不找警察。"], opens: ["classified"] },
  { queries: ["关站"], hrefs: ["pages/mp-close.html"], titles: ["金鹊镇地方号 - 录像厅停业说明"], excerpts: ["网站还在，大厅已锁。"], opens: ["mp-close"] },
  { queries: ["来访"], hrefs: ["pages/visitors.html"], titles: ["最近来访（灰影）"], excerpts: ["死人的头像也会亮。"], opens: ["visitors"] },
  { queries: ["包厢"], hrefs: ["pages/paused.html"], titles: ["包厢预订（暂停）"], excerpts: ["这一栏从来没开过。"], opens: ["paused"] },
  { queries: ["末班票"], hrefs: ["pages/choice.html"], titles: ["未取的末班票"], excerpts: ["退票或坐到完。两条路都要你先核对完。"], opens: ["choice"] },
  { queries: ["源码", "管理员密码"], forbidden: true, hidden: "主线不在源码里。回到已经打开的页面抽一个汉字词。" }
];

window.HINTS = [
  { lv: 1, text: "第一词写在录像厅首页的黄色公告里，帮助页也重复了一遍。一次只搜那一个词。" },
  { lv: 2, text: "日志会把店里的积分规矩摊开。积分页再把放映员的真名写出来。真名可以搜，不要去「找人」。" },
  { lv: 3, text: "场记台要登录。账号是放映员真名。口令是他空间留言里那句完整的话，不是片名单词。" },
  { lv: 4, text: "推理：加映场要留座；老侯死在机房；陆小棠把你写成替班；空座是禁忌；田麦是放映员。五条分别是票根、老侯、陆小棠、空座、田麦，读齐后在选择页决定退票还是坐到完。" }
];

window.NEAR_LOGIN = [
  { user: "陆小棠", feedback: "这是发链接的人，不是场记台管理员。" },
  { user: "方南星", feedback: "这是你的名字。公共后台要用放映员登录。" },
  { user: "老侯", feedback: "老板已经不在。账号还在用学徒的名字。" },
  { pass: "末场灯", feedback: "那是加映的别称，不是进门的口令。" },
  { pass: "留座", feedback: "接近。他说过字幕没完不要起身，要怎样才算完。" },
  { pass: "加映", feedback: "场次名不是口令。把空间里那句话写全。" }
];
