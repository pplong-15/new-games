const fs = require("fs");
const path = require("path");
const root = __dirname;

function searchForm(p) {
  return (
    '<form id="search-form" action="' + p + 'search-results.html" method="get">' +
    '<label class="sr-only" for="search-input">站内搜索</label>' +
    '<input id="search-input" name="q" maxlength="16" autocomplete="off" placeholder="搜索内容...">' +
    '<button type="submit">搜索</button></form>'
  );
}
function shopNav(p, cur) {
  function a(href, label, key) {
    return '<li><a href="' + href + '"' + (cur === key ? ' aria-current="page"' : "") + ">" + label + "</a></li>";
  }
  return (
    '<div id="container"><header><a class="logo" href="' + p + 'index.html">金鹊录像厅</a>' + searchForm(p) +
    "</header><nav><ul>" +
    a(p + "index.html", "首页", "home") +
    a(p + "films.html", "排片", "films") +
    a(p + "hall.html", "环境", "hall") +
    a(p + "snacks.html", "小卖", "snacks") +
    '<li><a class="dead" href="javascript:void(0)">包厢</a></li>' +
    a(p + "help.html", "帮助", "help") +
    "</ul></nav>"
  );
}
function page(opts) {
  const p = opts.dir === "pages" ? "../" : "";
  return (
    "<!DOCTYPE html>\n<html lang=\"zh-CN\" class=\"" + opts.skin + "\">\n<head>\n" +
    "  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n" +
    "  <title>" + opts.title + "</title>\n" +
    "  <link rel=\"stylesheet\" href=\"" + p + "css/" + opts.css + "\">\n" +
    "  <link rel=\"stylesheet\" href=\"" + p + "css/common.css\">\n</head>\n<body>\n" +
    opts.body + "\n" +
    "<script>window.PAGE_ID=" + JSON.stringify(opts.id) + ";window.PAGE_NO=" + JSON.stringify(opts.no || "") +
    ";window.PAGE_DIR=" + JSON.stringify(opts.dir || "") + ";</script>\n" +
    "<script src=\"" + p + "js/keywords.js\"></script>\n" +
    "<script src=\"" + p + "js/keyword-search.js\"></script>\n" +
    "<script src=\"" + p + "js/engine.js\"></script>\n</body>\n</html>\n"
  );
}

const pages = [];

pages.push({
  file: "introduction.html",
  id: "intro",
  no: "",
  skin: "skin-intro-manual",
  css: "intro-manual.css",
  title: "金鹊录像厅 · 说明",
  body:
    '<header class="intro-hero"><div class="image-area"><img class="game-photo" src="assets/img-intro-hero.jpg" alt="金鹊镇夜色，灯箱只亮一半"></div><h1>金鹊录像厅</h1></header><main>' +
    "<section><h2>◯ 引言</h2>" +
    "<p>你姓方，名南星。表亲里有个叫陆小棠的人，比你大四岁，中学时最爱占录像厅最后一排。后来她去镇上帮工，你们很少见面。这个月她发来一条很短的短信：金鹊西路那家厅还开着网页，帮我取一张留座票。链接不像商城，也不要验证码。</p>" +
    "<p>你点进去。米色底，灰色圆角导航，顶上还有一个橙色搜索钮。排片停在二零一二年。小卖部的价还是三块五一袋瓜子。时间却是错的：有的公告写着今年，有的评论停在机房起火那晚。</p>" +
    "<p>站名就叫金鹊录像厅。它不像游戏。它像一个不肯承认自己已经停业的小店官网。你要弄清三件事：票还在不在；发链接的人还在不在；以及——它为什么已经认得你的名字。</p>" +
    "</section><section><h2>◯ 你要做什么</h2>" +
    "<p>进去以后请把它当成真站点。读公告、读排片、读页脚。顶栏搜索<strong>一次只搜一个汉字词</strong>。词必须在你已经打开的页面上出现过。空串、带空格的两词、英文和数字，都不会打开隐藏页。</p>" +
    "<p>导航里至少有一条是假的。包厢预订是假的，点导航不会开页，要搜「包厢」才看得见那句暂停。真的入口在正文里的专名。搜中以后，页面会换成另一套皮：日志、积分站、空间、卷宗、地方号，不会只换个标题颜色。</p>" +
    "<p>几乎不会搜错的第一个词，写在首页黄色公告里，帮助页也重复了一遍：有人把一场没有片名的夜场又置顶了。那三个字是<strong>加映场</strong>。</p>" +
    "</section><section><h2>◯ 卡关</h2>" +
    "<p>说明书不跟着你进店。站内帮助还留着停运客服，可以要四档提示。前三档不写最终决定，第四档会写出推理，仍要你自己去搜、去登录、去表态。</p>" +
    "<p>页脚的数字只表示你更接近真相，不是进度条，也点不动。全站虚构。不要拿里面的县名、路名、人名去对照现实。</p>" +
    "<p>点「进入录像厅」之后，说明书这层皮会消失。假站点不再提醒你这是游戏。请把第一词记住：加映场。</p>" +
    "<p>本机存档。清除存档会忘掉你已经打开的隐藏页。大字和减少动画可以随时勾。</p>" +
    '<div class="boot-actions"><button type="button" data-act="new">进入录像厅</button>' +
    '<button type="button" class="ghost" data-act="wipe">清除存档</button></div>' +
    "<p><label><input type=\"checkbox\" data-opt=\"large\"> 大字</label>　<label><input type=\"checkbox\" data-opt=\"reduce\"> 减少动画</label></p>" +
    "</section></main>"
});

pages.push({
  file: "index.html", id: "home", no: "01", dir: "", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "金鹊录像厅",
  body: shopNav("", "home") + "<main><section><p>金鹊录像厅　梨河县金鹊镇金鹊西路18号　个体放映　每晚两场　周末加早场　电话已涂黑　本站由店内电脑生成</p></section>" +
    '<img class="game-photo" src="assets/img-home-marquee.jpg" alt="门头灯箱，金鹊二字缺了一笔">' +
    '<section class="menu-section"><h2>最新公告</h2><dl class="notice"><dt>2012/08/19</dt><dd>本周<strong>加映场</strong>仍按内部留座。无片名、无海报、无退票窗口。票在前台铁盒，写着场记代取。</dd>' +
    "<dt>2012/08/12</dt><dd>机房风扇更换。放映员田麦值班。会员积分只能留座，不能兑汽水。</dd>" +
    "<dt>2008/11/03</dt><dd>因设备故障暂停营业一日。后排座位请勿自行移动。</dd></dl></section>" +
    "<p>本厅开业于一九八七年，改过两次门头，没改过最后一排的木椅。木椅会响。响的时候不要回头。老板说那是椅子老了。老板后来不说话了。</p>" +
    "<p>网站还在收留言。留言栏在会员台后面，导航里看不见。你要找的第一个词在置顶公告里，帮助页还重复了一遍。一次只搜那一个词。</p>" +
    "<p class=\"muted\">包厢预订从未开放。点它不会进入任何隐藏页。真入口不在灰色导航里。</p></main></div>"
});

pages.push({
  file: "films.html", id: "films", no: "02", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "金鹊录像厅 - 排片",
  body: shopNav("", "films") + "<main><section class=\"menu-section\"><h2>本周排片</h2><img class=\"game-photo portrait\" src=\"assets/img-films-board.jpg\" alt=\"手写排片表\">" +
    "<p>晚场 19:30　《河对岸》　拷贝磨损　可能跳片</p>" +
    "<p>夜场 21:40　《末班路》　字幕不全　最后三分钟黑场</p>" +
    "<p class=\"price\">加映　时间未写　片名未写　票价未写</p>" +
    "<p>加映不对外售票。对外只写：有留座的人请准时。不准时的座位会改写成下一个名字。</p></section>" +
    "<p>排片表是给人看的。加映场是给座位看的。座位要有人。人要坐到字幕结束。字幕结束以前起身，灯不会灭，人会少一个。</p>" +
    "<p>有人把加映写成<strong>末场灯</strong>。两个叫法进同一页。不要拆开搜。</p>" +
    "<p>早场已经三年没开。早场的椅子堆在洗片间门口。洗片间的门从里面反锁过一次。那一次写进地方资料，不写在这张排片表上。</p></main></div>"
});

pages.push({
  file: "hall.html", id: "hall", no: "03", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "金鹊录像厅 - 环境",
  body: shopNav("", "hall") + "<main><h2>店内环境</h2>" +
    '<img class="game-photo" src="assets/img-hall-main.jpg" alt="大厅，一百二十座，最后一排缺椅脚">' +
    '<img class="game-photo" src="assets/img-hall-window.jpg" alt="放映窗，玻璃发黄像有人哈过气">' +
    "<p>一楼售票，二楼机房。客人不得上楼。楼上有胶片仓和洗片间。仓门写着内部，没有锁，只有一句：票根对得上才进。</p>" +
    "<p>墙上海报都停在二零零八年以前。有一张被撕去标题，只剩一排小人名。小人名被圆珠笔改过。改成谁，要进内部名单才看得到。</p>" +
    "<p>空调是窗机。窗机滴水。水滴在第十四排过道。过道永远湿。保洁说不要铺地毯，地毯会记住脚印。</p>" +
    "<p>合影在会员空间里。大厅这页只放两张空图。空图不是坏了，是有人把脸涂掉了。</p></main></div>"
});

pages.push({
  file: "snacks.html", id: "snacks", no: "04", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "金鹊录像厅 - 小卖",
  body: shopNav("", "snacks") + "<main><h2>小卖部</h2><img class=\"game-photo\" src=\"assets/img-snacks-shelf.jpg\" alt=\"小卖部货架\">" +
    "<p>瓜子 3.5　话梅 2　汽水 4　已经不进货。货架上的生产日期停在二零一一年。</p>" +
    "<p>会员积分<strong>不能</strong>兑小卖。有人问过。田麦在柜台贴过纸条：积分只留座。纸条被撕了，规矩还在。</p>" +
    "<p>小卖不是主线。你在这里浪费时间，加映照样开。开的时候不会等你买完瓜子。</p>" +
    "<p>收银台抽屉里有铁盒。铁盒不卖零食。铁盒装未取的票根。票根这一页不在小卖导航里。</p></main></div>"
});

pages.push({
  file: "help.html", id: "help", no: "06", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "金鹊录像厅 - 帮助",
  body: shopNav("", "help") + "<main><h2>停运客服</h2>" +
    "<p>人工已撤。自动回复还在。有人问<strong>加映场</strong>那一场为什么还能打开。回复只有一句：搜标题，不要搜管理员。</p>" +
    "<p>一次只搜一个汉字词。有人把两个词用空格拼起来，系统会当成拆开，本站没有组合检索。</p>" +
    "<p>包厢、充值、在线选座均不可用。真的入口在已经打开的正文里。</p>" +
    "<p>提示分四档。前三档不写你最后要按哪一颗钮。</p>" +
    '<p><button type="button" data-act="hint">向停运客服要提示</button></p>' +
    '<p data-hint-slot class="muted"></p></main></div>'
});

pages.push({
  file: "search-results.html", id: "search", no: "05", skin: "skin-search-results", css: "search-and-forbidden.css", title: "搜索结果",
  body: '<div class="mini"><div class="mini-inner"><a href="index.html">金鹊录像厅</a>' + searchForm("") + "</div></div>" +
    '<div class="box"><h2>搜索结果</h2><p class="muted">金鹊镜像只索引已经存在的页面。一次一个汉字词。</p></div>'
});

function blog(title, sub, article, aside) {
  const p = "../";
  return '<div class="top"><h1>小棠的备份站</h1><p>' + sub + "</p></div>" +
    '<div class="nav"><a href="' + p + 'index.html">回录像厅</a>' + searchForm(p) + "</div>" +
    '<div class="wrap"><article>' + article + "</article><aside>" + aside + "</aside></div>";
}

pages.push({
  file: "pages/blog-jiaoying.html", id: "blog-jiaoying", no: "07", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "小棠的备份日志 - 加映场",
  body: blog("加映场", "转载自厅内黑板 · 已停止评论",
    "<h2>加映场</h2><p class=\"meta\">2009-11-03 · 阅读 1847 · 标签：夜场 / 金鹊</p>" +
    "<p>民间放映本来该在十点收摊。老侯把我们留到字幕结束。字幕结束以后还有一场，海报上不印，只在黑板写三个字：加映场。</p>" +
    "<p>加映不是多放一部片子。没有拷贝编号。机房只亮一盏工作灯。田麦让每个人在纸片上写座号，说是考勤。周姐问为什么要写座号，田麦说：会员要<strong>金鹊积分</strong>。积分只能留座。</p>" +
    "<p>我写了。铅笔很浅，像一层灰。出来以后有人开玩笑，说这是把名字借给椅子。当时当笑话。今晚把这篇置顶，是因为我发现网站还在收「来访」。死人的头像也会亮。</p>" +
    "<p>谁要找管理员，别在包厢里找。他真名就在这篇后面的积分说明里。谁要找厅，厅名也在这篇里。我不会再写得更直。</p>" +
    "<p>课是这样上的。中巴没有。人是自己走进来的。进门先给活人一包瓜子，瓜子嗑完才让看机房。机房晾的不是胶片，是写过名字的纸椅套。田麦让我们排队，纸片摊开，每人写一个座号，笔是干的，要哈一口气才显。</p>" +
    "<p>我当时信了。回到宿舍我把这篇写成纪实，还觉得自己懂放映。后来才知道，纸片上的座号不是考勤，是把名字借给空座用的手续。厅里不说借，只说留座。网站后来把留座收成来访。</p>" +
    "<p>评论已关闭。若下一篇《机房那晚》也被打开，那是场次名把附带页一并带出来，不是第二道锁。</p>",
    "<h3>上一篇</h3><ul><li>机房那晚（若你是搜场次进来的，可能一并解锁）</li></ul><h3>声明</h3><p>私人转载，不是学校站点。模板还是 2008 年的橙色头。</p>")
});

pages.push({
  file: "pages/blog-night.html", id: "blog-night", no: "21", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "小棠的备份日志 - 机房那晚",
  body: blog("机房那晚", "未公开草稿 · 2011",
    "<h2>机房那晚</h2><p class=\"meta\">2011-12-21 · 草稿</p>" +
    "<p>加映散场以后我上楼送水杯。机房门从里面反锁。玻璃上有哈气，哈气里有人影，人影不转身。</p>" +
    "<p>田麦在楼下数椅子。椅子是十四把。人是十三。他说差的那一把是留座。留座不算人，算灯。</p>" +
    "<p>我把链接发给表弟。他网名南南。真名我不敢写在这篇。真名会进票根。票根进铁盒。铁盒不认亲属，只认场记。</p>" +
    "<p>这是附带草稿。主线不靠它开门。它只把机房和反锁放在一句里。你要是已经搜过场次，会连着看见。</p>" +
    "<p>草稿停在这里。我没有保存。镜像自己保存了。镜像比我勤快。</p>",
    "<h3>归档</h3><ul><li>2011年12月</li></ul>")
});

pages.push({
  file: "pages/points.html", id: "points", no: "08", dir: "pages", skin: "skin-corp-table-2005", css: "corp-table-2005.css", title: "金鹊会员积分说明",
  body: '<table class="site"><tr><td class="banner" colspan="2">金鹊会员服务中心　　积分 · 留座 · 不兑物</td></tr>' +
    '<tr><td class="nav" colspan="2"><a href="../index.html">离开本站</a>　简介　章程　' + searchForm("../") + "</td></tr>" +
    '<tr><td class="left"><h4>栏目</h4><p>积分规则</p><p>留座须知</p><p>失效会员</p></td><td class="main">' +
    '<div class="scroll">公告：学徒<strong>田麦</strong>即日起兼任外联。管理员不在机房时，勿翻柜台后的黄纸名单。</div>' +
    "<p>本积分由金鹊录像厅内部发放。消费不累积。到场才累积。到场以写座号为准。</p>" +
    "<p>积分用途只有一项：<strong>留座</strong>。留座不是占位置，是允许一场没有片名的加映把你的名字印在椅背上。</p>" +
    "<p>积分不能转让。转让过的人，来访里会变成灰影子。灰影子不是皮肤。</p>" +
    "<p>失效会员仍占名额。名额满了才会找替班。替班不写在章程里。章程只写：场记缺席时，由亲属或同学顶上。</p>" +
    "<p>本站用表格排版，因为当年只会 Frontpage。左边栏目，中间公告，底下备案号涂黑。不要把本页看成关卡选择。它只做一件事：把放映员的真名写进一家还在营业的积分站。</p>" +
    "<p>友情链接已全部失效。若你是从日志点来的，请自己决定要不要把学徒的名字送进搜索框。</p>" +
    "</td></tr><tr><td class=\"ft\" colspan=\"2\">金鹊镇金鹊西路　与任何院线无官方关系</td></tr></table>"
});

pages.push({
  file: "pages/space-tianmai.html", id: "space-tianmai", no: "09", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "田麦的空间",
  body: '<div class="topbar"><div class="topbar-inner"><span>空间</span>　<a href="../index.html">回录像厅</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">田麦　金鹊录像厅放映员　不在线</div>' +
    '<div class="cols"><div><div class="mod"><h3>主人</h3><div class="bd"><img class="avatar-photo" src="../assets/img-avatar-tianmai.jpg" alt="田麦"><p>梨河县<br>状态：去把场灯续上</p></div></div>' +
    '<div class="music">正在播放：本地文件 reel.mp3（无法解码）</div></div><div>' +
    '<div class="mod"><h3>主页留言</h3><div class="bd">' +
    "<p>进<strong>场记台</strong>的人，登录名用我真名。进门口令不要用生日，用加映散场那句：<strong>坐到完</strong>。</p>" +
    "<p>不要把口令写进排片表。你们已经把场次写得太显。</p>" +
    "<p>空间还是 2009 年的模块墙。我把背景换成绿，也遮不住来访。来访有单独存档，搜栏目名才能看见谁来过。</p>" +
    "<p>我若是很久不说话，不要当我去进货。厅里那句话比会员公约管用。公约里会有不该出现的两个字，那是后话。先把口令记住，再决定要不要进浅青底的那套后台。</p>" +
    "</div></div>" +
    '<div class="mod"><h3>日志</h3><div class="bd"><p>2011-12-21 我去把灯续上。若来访还在跳，说明镜像没断。</p></div></div></div><div>' +
    '<div class="mod"><h3>最近来访</h3><div class="bd"><p>本栏有单独存档。搜栏目名才能看见名单。灰影子不是装饰。</p></div></div>' +
    '<div class="mod"><h3>礼物</h3><div class="bd"><p>有人给我寄过空白片头。纪录可能被一并打开。</p></div></div></div></div>'
});

pages.push({
  file: "pages/seats.html", id: "seats", no: "10", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "留座名单（内部）",
  body: '<article class="record"><h1>留座名单</h1><div class="meta"><span>编号：JQ-10</span><span>日期：2012-08-19</span>' + searchForm("../") + "</div>" +
    "<p>本名单不对外张贴。对外只说满座。满座是假的。真的是：每一场加映必须有一个名字印在最后一排。</p>" +
    "<p>2008-11-03　侯长河　机房　未散场</p>" +
    "<p>2009-11-03　（空）　已改写成积分名额</p>" +
    "<p>2011-12-21　陆小棠　场记　未取票</p>" +
    "<p>2012-08-19　（待填）　特邀　铁盒里有票根</p>" +
    "<p>空着的座位也要写名字。不写的话，灯会一直亮。灯一直亮，人会从字幕里走回来。走回来的人不买票。</p>" +
    "<p>陆小棠的名字还在第三行。第三行没有划掉。没有划掉的人，系统认为她还在座位上。她发链接，是因为她想下来。</p>" +
    "<p><span class=\"stamp\">内部</span></p></article>"
});

pages.push({
  file: "pages/post-lu.html", id: "post-lu", no: "11", dir: "pages", skin: "skin-discuz-board", css: "discuz-board.css", title: "梨河影迷楼 - 谁还在看字幕",
  body: '<div class="wp"><div class="hd"><strong>梨河影迷楼</strong><span><a href="../index.html">离开</a>' + searchForm("../") + "</span></div>" +
    '<div class="nv"><a href="#">论坛</a><a href="#">家园</a><a href="#">导读</a></div>' +
    '<div class="floor"><div class="u">陆小棠<br>积分 0</div><div class="t">' +
    "<p>谁还在看字幕。看完的人请回一个座号。我回不了。我在最后一排。最后一排没有过道。</p>" +
    "<p>港港——不对，南南。我把链接发到你现在用的号了。金鹊西路还在。管理员不在。</p>" +
    "<p>不要报警。警察进不了加映。加映只认场记。场记缺了，就认亲属。你是我表弟。票根可能已经印了你。</p>" +
    "<p>进<strong>场记台</strong>不要用我的名字。我不是管理员。管理员是放映员。放映员把口令写在空间里。</p>" +
    "<p>这楼不是主线门。主线门在须知和登录。我把须知的名字写出来，是怕你去点包厢。</p>" +
    '<div class="sig">签名档：坐到完再说话</div></div></div>' +
    '<div class="floor"><div class="u">匿名<br>积分 --</div><div class="t"><p>匿名：你还差一个到场的人。备用还空着。</p><p>陆小棠：匿名请出去。这里不是祠堂。这里是录像厅。</p></div></div>' +
    '<p class="pages">1 / 1 页</p></div>'
});

pages.push({
  file: "pages/desk.html", id: "desk", no: "12", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "青石场记台 · 须知",
  body: '<div id="wrap"><header><strong>青石场记台</strong><div><a class="ghost-btn" href="javascript:void(0)">注册</a><a class="ghost-btn" href="login.html">登录</a>' +
    searchForm("../") + "</div></header>" +
    '<div class="notice"><h2>使用须知</h2>' +
    "<p>注册已关闭。已结束的场次会存档。管理员账号不写在导航里。</p>" +
    "<p>本台是金鹊录像厅的内部留言板。皮肤是浅青底、黑钮、橙搜索。不要和米色小店搞混。搞混了你会以为还在看排片。</p>" +
    "<p>登录名用放映员真名。口令是空间留言里那句完整的话。近义词会得到近义的拒绝。</p>" +
    "<p>登录之后才能打开<strong>场记手册</strong>和<strong>放映日志</strong>。没登录去搜，会把你送回这扇门。</p>" +
    "</div><div class=\"tabs\"><a href=\"login.html\">登录</a><a href=\"javascript:void(0)\">线下记录</a></div>" +
    "<table><thead><tr><th>标题</th><th>更新</th></tr></thead><tbody>" +
    "<tr><td>加映场须知（已结束）</td><td>2012/08/19</td></tr>" +
    "<tr><td>场记缺席处理（需登录）</td><td>2011/12/21</td></tr>" +
    "</tbody></table></div>"
});

pages.push({
  file: "pages/login.html", id: "login", no: "13", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "场记台登录",
  body: '<div id="wrap"><header><strong>青石场记台</strong>' + searchForm("../") + "</header>" +
    '<form class="login-box" action="#" method="post"><p>账号</p><p><input name="user" autocomplete="off"></p>' +
    "<p>密码</p><p><input name=\"pass\" type=\"password\" autocomplete=\"off\"></p>" +
    "<p><button type=\"submit\">登录</button></p>" +
    "<p>凭据必须先在别的页读到，不要写在导航里。</p></form></div>"
});

pages.push({
  file: "pages/handbook.html", id: "handbook", no: "14", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "场记手册",
  body: '<div id="wrap"><header><strong>青石场记台 · 手册</strong>' + searchForm("../") + "</header>" +
    '<div class="notice"><h2>场记手册</h2><img class="game-photo portrait" src="../assets/img-handbook-cover.jpg" alt="场记手册封面">' +
    "<p>第一条：字幕未完，座位上必须有人。这叫<strong>空座</strong>禁忌。空座比满座危险。</p>" +
    "<p>第二条：场记缺席，由留座名单上的特邀顶上。特邀不自愿也算自愿。点开链接等于签到。</p>" +
    "<p>第三条：退票必须在字幕出现以前。字幕一旦跳出场记的名字，退票窗口关闭。</p>" +
    "<p>第四条：不要把手册抄到排片表。排片表是给人看的。手册是给灯看的。</p>" +
    "<p>附件目录：梨河县<strong>文娱志</strong>摘录、胶片仓清点、<strong>放映日志</strong>。日志与手册一样，要先登录。</p>" +
    "<p>你能打开这篇，说明镜像还认场记这两个字加一个手册。不要得意。得意的人会在字幕里看见自己。</p>" +
    "</div></div>"
});

pages.push({
  file: "pages/gazetteer.html", id: "gazetteer", no: "15", dir: "pages", skin: "skin-gov-redbar", css: "gov-redbar.css", title: "梨河县文娱资料摘录",
  body: '<div class="red"><h1>梨河县情网</h1><p>文娱资料摘录　数字已涂改　请勿当作公文</p></div>' +
    '<div class="links"><a href="../index.html">离开</a><a href="#">通知</a><a href="#">名录</a>' + searchForm("../") + "</div>" +
    '<div class="wrap"><img class="game-photo" src="../assets/img-gazetteer-arch.jpg" alt="梨河电影院旧照"><div class="grid"><div class="box"><h3>文化场所</h3><ol>' +
    "<li>金鹊录像厅　1987 年开业　个体　金鹊西路18号</li>" +
    "<li>梨河电影院　1994 年改建　已撤</li></ol></div>" +
    '<div class="box"><h3>事故摘录</h3><ol>' +
    "<li>2008 年 11 月　金鹊录像厅机房过热　业主<strong>老侯</strong>下落不明　不作火灾结论</li>" +
    "<li>此后该厅以会员留座维持夜场　未再办理停业</li></ol></div></div>" +
    "<p style=\"padding:12px\">本页不是政务大厅。红头只是旧模板。不要对照真实区划。摘录只证明一件事：厅还在，业主不在，维持的办法叫留座。</p>" +
    "<p style=\"padding:12px\">名录里没有场记。场记不是工种，是座位上的手续。手续写进内部名单，不写进县情网。</p>" +
    '<p class="ft">虚拟站点　仅供作品使用</p></div>'
});

pages.push({
  file: "pages/obit-hou.html", id: "obit-hou", no: "16", dir: "pages", skin: "skin-wechat-mp-article", css: "wechat-mp-article.css", title: "金鹊镇地方号 - 侯长河",
  body: '<article class="article"><h1>金鹊西路那盏灯</h1><img class="game-photo" src="../assets/img-obit-hou.jpg" alt="金鹊西路灯箱"><p class="meta"><span class="acct">金鹊观察</span>　2008-11-08　' + searchForm("../") + "</p>" +
    "<p>金鹊录像厅老板侯长河，镇上叫他老侯。十一月三日夜场之后，机房的灯没灭。第二天门开着，人没有。</p>" +
    "<p>派出所来过。没有血迹，没有出走信。只在放映窗玻璃上留下哈气。哈气里有人说看见他坐在最后一排。最后一排那天没有卖票。</p>" +
    "<p>家属不同意火化。厅里不同意撤座。两边僵着。僵的结果是：夜场继续，积分继续，加映继续。继续的人换成了田麦。</p>" +
    "<p>老侯不是失踪文案里的大学生。他是把椅子当成香火的店主。椅子要有人。人可以换。</p>" +
    "<p>本号后来写过停业说明。说明里有两个字：<strong>关站</strong>。关的是大厅。网站没关。</p>" +
    "<p class=\"tail\">阅读 1024　不显示真实公众号商标</p></article>"
});

pages.push({
  file: "pages/vault.html", id: "vault", no: "17", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "胶片仓清点",
  body: '<article class="record"><h1>胶片仓清点</h1><img class="game-photo" src="../assets/img-vault-film.jpg" alt="胶片仓，盒脊14-7"><div class="meta"><span>编号：JQ-17</span><span>清点人：田麦</span>' + searchForm("../") + "</div>" +
    "<p>仓内拷贝八十七本。有片名的八十六。没有片名的一本，盒脊只写座号：14-7。十四排七座。那是最后一排靠墙。</p>" +
    "<p>无名片头冲出来是白的。白片放进机，银幕仍会跳出人名。人名来自留座名单，不来自乳剂。</p>" +
    "<p>仓门对<strong>票根</strong>。票根在铁盒。铁盒在小卖收银台。小卖不卖这张票。</p>" +
    "<p>清点表有一行被墨涂掉。涂掉的下面仍能看见「特邀」。特邀没有工号。特邀只有亲属关系。</p>" +
    "<p>本仓不是彩蛋。它把座位和胶片接在同一条线上。线的另一头是未取的那张纸。</p>" +
    "<p><span class=\"stamp\">内部</span></p></article>"
});

pages.push({
  file: "pages/ticket.html", id: "ticket", no: "18", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "未取票根",
  body: '<article class="record"><h1>未取票根</h1><img class="game-photo portrait" src="../assets/img-ticket-stub.jpg" alt="未取票根，座号14-7"><div class="meta"><span>铁盒</span><span>打印 2011-12-21</span>' + searchForm("../") + "</div>" +
    "<p>金鹊录像厅　加映场　座号 14-7</p>" +
    "<p>特邀场记：<strong>方南星</strong></p>" +
    "<p>代取人：陆小棠（未取）</p>" +
    "<p>备注：亲属顶班。点开链接视为签到。签到后可在字幕出现前办理<strong>末班票</strong>手续：退票，或坐到完。</p>" +
    "<p>票根比短信早。短信是今年。票根是二零一一年。你还没来，名字已经印上。印上不是预言，是缺额。</p>" +
    "<p>缺额要补。补的人以为自己来取票。取票的人会变成票。</p>" +
    "<p>请到选择页提交。选择页不在导航里。词在本页备注里。</p>" +
    "<p><span class=\"stamp\">未取</span></p></article>"
});

pages.push({
  file: "pages/credits.html", id: "credits", no: "19", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "字幕人员表",
  body: '<article class="record"><h1>字幕人员表</h1><div class="meta"><span>加映专用</span><span>每次覆盖</span>' + searchForm("../") + "</div>" +
    "<p>导演：无　摄影：无　剪辑：无</p>" +
    "<p>场记：陆小棠　（系统拟改为方南星）</p>" +
    "<p>放映：田麦　出品：侯长河</p>" +
    "<p>场记一栏会改写成还活着的人。改写发生在字幕跳出的那一秒。那一秒以前，你还可以提交<strong>末班票</strong>。</p>" +
    "<p>字幕不是演职人员表。字幕是把座位上的人登记成已经看完的人。看完的人可以走。没看完的人留在银幕里。</p>" +
    "<p>陆小棠想走。她把你请来。请你来，不是请你陪她。请你来，是请你换她。</p>" +
    "<p>换或不换，都要你按。按之前把票根、老侯、空座、田麦读齐。</p></article>"
});

pages.push({
  file: "pages/choice.html", id: "choice", no: "20", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "未取的末班票",
  body: '<article class="record"><h1>末班票</h1><div class="meta"><span>提交后不可撤回</span><span>选择</span>' + searchForm("../") + "</div>" +
    "<p>两条路都在这张纸上。退票：名字从椅背抹掉，灯灭，陆小棠未必回得来，但不会再拉下一个人。坐到完：你成为场记，她的座号空出来，你留下。</p>" +
    "<p>没有第三句。没有「报警」。没有「把网站关掉」。镜像不认这些动词。</p>" +
    "<p>请确认你已经读过票根上的名字、老侯的结局、陆小棠的帖、空座规程、田麦的空间。缺一条，按钮会拒绝你。</p>" +
    '<p class="choice-row"><button type="button" data-end="a">退票</button><button type="button" data-end="b">坐到完</button></p>' +
    '<p data-choice-miss class="muted"></p></article>'
});

pages.push({
  file: "pages/mail-lu.html", id: "mail-lu", no: "22", dir: "pages", skin: "skin-mail-web-2010", css: "mail-web-2010.css", title: "场记邮箱",
  body: '<div class="top">场记邮箱　未读 1　<a href="../index.html">离开</a>　' + searchForm("../") + "</div>" +
    '<div class="panes"><div class="folders"><a class="on" href="#">收件箱 (1)</a><a href="#">已发送</a><a href="#">草稿</a></div>' +
    '<div class="mails"><div class="m unread">替我坐到完　2011-12-21</div><div class="m">排片表　2011-11-07</div></div>' +
    '<div class="read"><h3>替我坐到完</h3><p class="meta">发件人：陆小棠　时间：2011-12-21 02:17</p>' +
    "<p>南南：我把录像厅的网址发给你。不是叙旧。我在加映里出不去。出不去的人可以找替班。替班是亲属。</p>" +
    "<p>你若进来，先读黑板，再搜场次。不要点包厢。包厢是假的。</p>" +
    "<p>我不知道你现在用哪个号。系统说会把信送到还活着的邮箱。这封信是附带。主线不靠邮箱开门。</p>" +
    "<p>若你看到票根上是自己的名字，别骂我。名字是缺额填的。填之前没有问过你。加映不问人。</p>" +
    "</div></div>"
});

pages.push({
  file: "pages/album.html", id: "album", no: "23", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "大厅合影",
  body: '<div class="topbar"><div class="topbar-inner"><span>空间</span>　<a href="space-tianmai.html">田麦</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">田麦　相册：谁多出来了</div>' +
    '<div class="cols"><div></div><div><div class="mod"><h3>相册</h3><div class="bd">' +
    '<img class="game-photo" src="../assets/img-album-2009.jpg" alt="2009 加映合影，后排灰衣无面">' +
    '<img class="game-photo" src="../assets/img-album-2010.jpg" alt="2010 春节场，同一位置又是灰衣">' +
    "<p>我数过。按座号那次，相机里就多一个。田麦说那是曝光。曝光不会连着两年站在同一块砖上。</p>" +
    "<p>灰衣服不占好友栏，只占像素。名册上没有这个人。名册是活人的。</p>" +
    "<p>本页附带。主线不靠合影开门。它只说明来访不是装饰。</p></div></div></div><div></div></div>"
});

pages.push({
  file: "pages/mp-close.html", id: "mp-close", no: "24", dir: "pages", skin: "skin-wechat-mp-article", css: "wechat-mp-article.css", title: "录像厅停业说明",
  body: '<article class="article"><h1>关于金鹊录像厅暂停接待的说明</h1><p class="meta"><span class="acct">金鹊观察</span>　2018-03-01　' + searchForm("../") + "</p>" +
    "<p>大厅已锁。网站未关。锁大厅是为了不让陌生人买早场。不关网站，是因为加映还在收来访。</p>" +
    "<p>有人问能不能拆除灯箱。灯箱拆了，椅背上的名字还在。名字不在灯箱上。</p>" +
    "<p>本说明不是主线门。搜<strong>关站</strong>会落到这里。这里只告诉你：停业和停更是两件事。</p>" +
    "<p class=\"tail\">阅读 88</p></article>"
});

pages.push({
  file: "pages/forum.html", id: "forum", no: "25", dir: "pages", skin: "skin-discuz-board", css: "discuz-board.css", title: "梨河影迷楼 - 还灯债",
  body: '<div class="wp"><div class="hd"><strong>梨河影迷楼</strong><span><a href="../index.html">离开</a>' + searchForm("../") + "</span></div>" +
    '<div class="nv"><a href="#">论坛</a></div>' +
    '<div class="floor"><div class="u">老观众<br>积分 9</div><div class="t">' +
    "<p>金鹊西路那盏灯欠过火。欠火的人要用坐来还。这叫<strong>还灯债</strong>。不是迷信帖。是厅里的口头禅。</p>" +
    "<p>老侯还过一次，没还完。田麦在还。陆小棠在还。还完的标志是字幕里的场记栏不再改名。</p>" +
    "<p>有人说去洗片间看看药液。药液见过血，也见过名字。那是另一页。</p>" +
    "</div></div></div>"
});

pages.push({
  file: "pages/classified.html", id: "classified", no: "26", dir: "pages", skin: "skin-classified-yellow", css: "classified-yellow.css", title: "梨河分类信息 - 寻场记",
  body: '<div class="top"><b>梨河分类信息</b>' + searchForm("../") + "</div>" +
    '<div class="layout"><nav><h4>分类</h4><a href="#">寻人 / 启事</a><a href="#">二手物品</a><a href="#">本地服务</a></nav>' +
    '<div class="list"><div class="row"><a href="#">寻场记　金鹊录像厅　不找警察</a><span>金鹊镇</span><span>2011-12</span></div>' +
    "<p>找替班，不找警察。替班要求：认识陆小棠，能坐到字幕结束。报酬：一张未取的票。票不能卖。</p>" +
    "<p>本启事是附带。它把「寻场记」四个字写在黄页上，方便你搜到。搜到不等于你必须应征。</p>" +
    "<p>二手栏目里有人卖拷贝。拷贝是假的。真的拷贝在胶片仓，仓不对黄页开放。</p></div></div>"
});

pages.push({
  file: "pages/visitors.html", id: "visitors", no: "27", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "最近来访（灰影）",
  body: '<div class="topbar"><div class="topbar-inner"><span>来访</span>　<a href="../index.html">回录像厅</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">最近来访　登录后才能看清名字</div>' +
    '<div class="cols"><div></div><div><div class="mod"><h3>灰影子</h3><div class="bd">' +
    "<p>??? 刚刚　??? 昨天　??? 2008-11-03</p>" +
    "<p>死人的头像也会亮。亮不是复活。亮是座位还认这个人。</p>" +
    "<p>来访不认删除。删空间的人仍会跳。跳的是灯，不是人。</p>" +
    "<p>本栏有单独存档。搜栏目名才能看见。它不是装饰。</p></div></div></div><div></div></div>"
});

pages.push({
  file: "pages/paused.html", id: "paused", no: "28", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "包厢预订（暂停）",
  body: shopNav("../", "") + "<main><h2>包厢预订</h2>" +
    "<p>本栏目从未开放。二零零五年写过「即将推出」，一直写到停更。</p>" +
    "<p>你能搜到这一页，是因为有人把「包厢」写进公告。写进去是为了让你点假入口。假入口会告诉你：真入口在正文专名里。</p>" +
    "<p>这里没有隐藏票。没有管理员密码。没有源码彩蛋。请回到已经打开的页面，抽出一个汉字词。</p></main></div>"
});

pages.push({
  file: "pages/oral.html", id: "oral", no: "29", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "老放映员口述",
  body: blog("口述", "录音已佚　文字不可当作证词",
    "<h2>关于老侯</h2><p class=\"meta\">转述 · 金鹊镇</p>" +
    "<p>他不是被火烧死的。火很小。小到只烫了一卷片头。人是自己坐下去的。坐到字幕里去的。</p>" +
    "<p>我们后来把这件事叫留座。留座比烧香便宜。烧香要进庙。留座只要一把椅子。</p>" +
    "<p>口述不是证词。证词要签名。签名会变成票根。票根会变成下一个人。</p>" +
    "<p>你若是来找老侯，他不在机房。他在最后一排。最后一排不卖票。</p>",
    "<h3>声明</h3><p>私人转载。不要当作公文。</p>")
});

pages.push({
  file: "pages/log.html", id: "log", no: "30", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "放映日志 2008–2012",
  body: '<article class="record"><h1>放映日志</h1><div class="meta"><span>须登录</span><span>田麦抄录</span>' + searchForm("../") + "</div>" +
    "<p>2008-11-03　夜场正常　加映无拷贝　业主未下楼</p>" +
    "<p>2009-11-03　加映　留座空缺　积分名额启动</p>" +
    "<p>2011-12-21　场记陆小棠　未散场　特邀票根已打印</p>" +
    "<p>2012-08-19　网站仍收来访　大厅钥匙在铁盒</p>" +
    "<p>加映场没有拷贝编号。没有编号的场次不进院线报表。报表上的金鹊录像厅早已停业。日志上的金鹊录像厅还在开。</p>" +
    "<p>本日志与手册一样，要先登录。你能读到，说明口令对了。对了不等于结束。结束在末班票那一页。</p></article>"
});

pages.push({
  file: "pages/darkroom.html", id: "darkroom", no: "31", dir: "pages", skin: "skin-corp-table-2005", css: "corp-table-2005.css", title: "洗片间（已停用）",
  body: '<table class="site"><tr><td class="banner" colspan="2">金鹊洗印　　已停用 · 勿入</td></tr>' +
    '<tr><td class="nav" colspan="2"><a href="../index.html">离开</a>　' + searchForm("../") + "</td></tr>" +
    '<tr><td class="left"><h4>设备</h4><p>显影罐</p><p>晾片绳</p></td><td class="main"><img class="game-photo" src="../assets/img-darkroom-tank.jpg" alt="洗片间显影罐">' +
    "<p>药液见过血，也见过名字。血是机房起火那年烫出来的。名字是后来泡进去的。</p>" +
    "<p>洗片间从里面反锁过。反锁的人不是为了自杀。是为了不让字幕提前结束。字幕提前结束，座位上的手续作废。</p>" +
    "<p>本页不是主线唯一解。它解释为什么环境页说门从里面反锁。反锁是手续，不是彩蛋。</p>" +
    "</td></tr></table>"
});

pages.push({
  file: "pages/empty-seat.html", id: "empty-seat", no: "32", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "空座规程",
  body: '<article class="record"><h1>空座规程</h1><div class="meta"><span>JQ-32</span><span>内部</span>' + searchForm("../") + "</div>" +
    "<p>字幕未完，座位上必须有人。空座会使灯无法冷却。灯无法冷却，机房会再次过热。过热不是事故，是催促。</p>" +
    "<p>催促的对象是下一个名字。下一个名字从亲属里找。找不到亲属，就从会员积分里找。积分里都是写过座号的人。实在补不上，黄页上会挂一条<strong>寻场记</strong>的启事，找的是替班，不是警察。</p>" +
    "<p>方南星尚未写过座号。方南星出现在票根上，是因为陆小棠把亲属填进了缺额。缺额比积分优先。</p>" +
    "<p>处理空座的合法手续只有两种，都叫<strong>末班票</strong>：退票，或坐到完。两种都要在选择页提交。</p>" +
    "<p><span class=\"stamp\">内部</span></p></article>"
});

pages.push({
  file: "pages/forbidden.html", id: "forbidden", no: "33", dir: "pages", skin: "skin-forbidden", css: "search-and-forbidden.css", title: "此文件已被禁止访问",
  body: '<div class="box"><h2>此文件已被禁止访问</h2>' +
    "<p>隐藏页不会因为改地址、看源码或搜「管理员密码」而打开。</p>" +
    "<p>禁止页是黑底红字，故意难看。难看是为了让你停下来，回到已经读过的正文里抽词。</p>" +
    '<p><span class="hidden-ink">选中这段也不会得到主线词。主线不靠黑条。</span></p>' +
    '<p><a href="../index.html">回首页</a>　<a href="../help.html">帮助</a></p></div>'
});

pages.push({
  file: "pages/gift.html", id: "gift", no: "34", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "会员赠片记录",
  body: shopNav("../", "") + "<main><h2>赠片</h2>" +
    "<p>陆小棠 送给 田麦 一盒空白片头　2011-12-20</p>" +
    "<p>附言：进门别说话，坐到完。你教我的。</p>" +
    "<p>田麦 送给 特邀 一张空白帖　2011-12-21</p>" +
    "<p>附言：不是礼物。名字在铁盒，不在这一栏。</p>" +
    "<p>本页附带。搜放映员真名可能一并打开。它印证口令，不另设一扇门。</p></main></div>"
});

pages.push({
  file: "pages/ending-a.html", id: "ending-a", no: "35", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "退票",
  body: '<article class="record"><h1>退票</h1><div class="meta"><span>35/36</span><span>已提交</span></div>' +
    "<p>铁盒空了。椅背上的方南星被墨涂掉。灯灭。机房第一次真正冷下来。</p>" +
    "<p>陆小棠没有从字幕里走出来。她也不再发短信。缺额没有补上。缺额变成空。空在规程里是危险的，在这一次里是你拒绝把危险转给自己。</p>" +
    "<p>金鹊西路的灯箱后来被人摘走。网站还在。网站不再收来访。来访需要座位。座位上没有名字。</p>" +
    "<p>你没有当场记。你只是一个点开链接又把票退掉的人。镜像把这件事记成：不应到。</p>" +
    '<p style="text-indent:0"><a href="../introduction.html">回说明</a></p></article>'
});

pages.push({
  file: "pages/ending-b.html", id: "ending-b", no: "36", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "坐到完",
  body: shopNav("../", "") + "<main><h2>坐到完</h2>" +
    "<p>字幕跳出：场记 方南星。陆小棠的座号空了。她是否回来，本站不保证。本站只保证灯灭以前有人坐着。坐着的人是你。</p>" +
    "<p>田麦在来访里亮了一下，又暗了。老侯不再跳。厅把账记到第四代场记头上。第四代没有工号，只有一张已经取走的票。</p>" +
    "<p>排片表多了一行：加映　场记值班　谢绝退票。你现在是管理员。管理员不能把自己的名字搜出去。</p>" +
    "<p>镜像还活着。活着是因为你还坐着。请不要关闭这个窗口。关闭等于起身。起身等于空座。</p>" +
    '<p><a href="../introduction.html">回说明</a></p></main></div>'
});

function inject(body, extra) {
  if (!extra) return body;
  var marks = ["</main>", "</article>", "</table>", "</div></div>"];
  for (var i = 0; i < marks.length; i++) {
    var idx = body.lastIndexOf(marks[i]);
    if (idx >= 0) return body.slice(0, idx) + extra + body.slice(idx);
  }
  return body + extra;
}

const MORE = {
  intro: "<p>你不是侦探，也不是记者。你只是被一条短信叫去取票的人。取票这种事普通到不像圈套。圈套往往普通。普通到你不好意思问她为什么不自己去。</p>",
  home: "<p>金鹊镇没有院线。要看电影的人坐中巴去县城，回来时车上全是瓜子壳。本厅活下来，靠的不是片源，是有人愿意把夜场当成习惯。习惯比票房坚硬。坚硬的东西停更以后还会发光，像坏掉的灯箱。</p><p>公告栏的黄色标签是模板自带的。模板买来时叫「安心小站」。安心两个字后来被老板用油漆盖掉。盖掉的位置现在空着，空着也比写「暂停」诚实。暂停的栏目在导航最右侧那一格，点了不会开新页。</p><p>来过的人常把加映说成加班。加班还有工钱。加映只有座号。座号写在纸上，纸放进铁盒，铁盒不进排片表。排片表给人看。铁盒给灯看。</p>",
  films: "<p>拷贝从县城邮局托运。托运单上的片名和银幕上的对不上是常事。对不上就手写一张纸贴在玻璃上。玻璃上的胶水印叠了十几年，像一层不肯掉的皮。</p><p>夜场散场时会有人问还有没有。问的人其实知道没有。没有的意思是：对外没有。对内还有一场。对内的那场不印在这张表的上半，印在下半那行没有时间的加映里。你要是只看上半，会以为这家厅很普通。</p><p>普通的厅不会把「不准时的座位改写成下一个名字」写进排片说明。写进去的人后来不写了。镜像把那一句留着。留着不是为了吓人，是为了让后来的人知道规矩从哪一天开始变硬。</p>",
  hall: "<p>一百二十座从来没有满过。满过的是最后一排。最后一排只有七个位置，靠墙那个椅脚缺了，用砖垫着。砖是金鹊西路修路剩的。修路的人把砖搬进来，说你们厅的椅子比路面还难伺候。</p><p>二楼的楼梯很陡。陡到客人抬头能看见放映窗，却走不上去。走上去要钥匙。钥匙在铁盒。铁盒在一楼。一楼的人不知道自己手里捏着上楼的手续。</p><p>墙纸发潮。潮的位置刚好对着窗机。窗机滴水，水把海报边泡皱。皱了的海报仍能认出面孔。认不出的是被撕去标题的那一张。那一张只剩一排小人名，小人名被圆珠笔改过。改过的名字要进内部名单才对得上。</p>",
  snacks: "<p>小卖部的灯是应急灯。应急灯常年开着，开着也不亮多少。货架第三层空了，空了还贴着价签。价签是给习惯看的。习惯让人以为还能买到话梅。</p><p>有人把积分券塞进收银台，想兑一瓶汽水。田麦把券退回去，说积分不是钱。不是钱的东西更不好用。不好用的规矩偏偏写得短，短到你以为自己看懂了。</p><p>铁盒不在货架上。铁盒在抽屉夹层。夹层是后来钉的。钉夹层的人说，别让小卖和票根睡在一起。睡在一起会搞混：一个是给嘴的，一个是给座位的。</p>",
  help: "<p>停运客服的句子是田麦当年存进电脑的。电脑没换，句子也没换。换的是来问的人。来问的人越来越少，少到自动回复都显得殷勤。</p><p>殷勤不是服务。殷勤是怕你去搜错的地方。搜错的地方包括包厢、源码、管理员密码。那些词会把你送进一张难看的黑页。难看是故意的。故意让你回来抽正文里的专名。</p><p>四档提示可以连点。连点到第四档会把推理摊开，仍要你自己去搜、去登录、去表态。客服不能替你按那两颗钮。钮在更里面的纸上。</p>",
  "blog-jiaoying": "<p>置顶以后有人私信骂我吓人。吓人的不是文章，是厅还在收来访。收来访的站不该在关厅之后还活着。活着的理由不在这篇里写完。这篇只负责把场次名和积分规矩摊开。</p><p>中巴那一段是我写错了。金鹊没有中巴停在门口。人是自己走进来的。自己走进来的人更像自愿。自愿的人不好退。不好退的手续后来被叫成考勤，考勤后来被叫成积分，积分后来被叫成留座。叫法换了三次，椅子没换。</p>",
  "blog-night": "<p>草稿里我不敢写表弟的真名。真名会进铁盒。铁盒不认称呼，只认印刷体。印刷体比称呼冷。冷的东西适合当票。</p><p>机房反锁那天，楼下还在扫地。扫帚声很稳，稳得像什么都没发生。发生的事情往往没有声。有声的是椅子。椅子一响，田麦就数。数出来的数字和人数对不上时，他对我说：差的那一把是灯的。</p><p>灯的椅子不能搬。搬了会让加映找不到地方落。找不到地方落的加映会改去找人。找人从亲属开始。亲属不在名单上，也会被印上去。印上去的那一行，我后来在铁盒里见过。</p>",
  points: "<p>Frontpage 的滚动条还在动。动的内容三年没换。没换不是忘了，是没有人敢改。改积分规则等于改座位上的名字。名字一改，来访会乱跳。乱跳的来访让田麦害怕。害怕的人把公告写成黄色一条，条里只敢点学徒的真名。</p><p>真名写在滚动条里，是因为导航里不能写。导航是给人点的。滚动条是给人瞥的。瞥见的人如果肯搜，就能进空间。不肯搜的人会在积分页空转，空转也比去包厢强。</p><p>失效会员仍占名额这一句，是老侯留下的。老侯不在以后，名额变成缺额。缺额要找替班。替班写在章程夹层，夹层不对外。对外只写：场记缺席时，由亲属或同学顶上。亲属两个字比会员两个字硬。</p>",
  "space-tianmai": "<p>绿背景是我从别的空间存的。存的时候还觉得好看。好看遮不住来访。来访有单独存档，搜栏目两个字才能看见。看见了也不要打招呼。打招呼等于承认你也是座位上的人。</p><p>音乐盒坏了。坏了还显示正在播放。播放的文件名是 reel。reel 不是歌。reel 是片盘。片盘转完以前，人不要起身。起身的口令我写在留言第一句。第一句要写全。写不全会近义失败。</p><p>我把场记台的名字也写了。写了是怕你们去点包厢。包厢从来没有座位。没有座位的栏目最像游戏。我们厅最怕被当成游戏。</p>",
  seats: "<p>名单用宋体打印，因为宋体看起来像还没作废。作废的名单会改用黑体。黑体太醒目。醒目的东西不好放在内部。</p><p>第三行陆小棠没有划掉。没有划掉的人，系统认为她还占着座。占着座的人可以发链接。发链接不是求救，是找人来换。换是规程允许的。规程允许的事，看起来就特别像自愿。</p><p>待填的那一行对着铁盒。铁盒里的票根早于短信。早于短信的印刷体，会让后来的人觉得自己被算计。算计这个词不准确。准确的是缺额。缺额要有名字。名字从亲属里挑。挑中的人以为自己来取票。</p>",
  "post-lu": "<p>影迷楼的积分显示为零。零不是被封。零是我把分都换成了留座。留座不显示在论坛。论坛只显示还能不能回帖。我还能回。回的内容越来越短。短是因为字幕占地方。</p><p>南南若是看见这楼，先别回。回帖改变不了座号。座号在铁盒。铁盒在一楼。一楼你进得去。进去之后请按日志里的词搜，不要按我的名字登录。我的名字只能把你带进这楼和一封邮件。邮件是附带。附带不能当唯一的门。</p>",
  desk: "<p>浅青底是后来套的。套的人想让内部看起来像正规咨询台。正规的东西能让人放松。放松的人比较肯填账号。账号不是邮箱。账号是放映员真名。真名在积分站滚动条里出现过，在空间主人栏也出现过。</p><p>线下记录那颗黑钮是假的。假的黑钮和包厢一样，点了没有隐藏页。真的线下记录在放映日志里。日志要登录。登录要口令。口令要写全那四个字，少一个都不算散场。</p>",
  login: "<p>登录页很短。短是标本里就有的。短不等于没有用。没有用的是把密码写在这页。密码不在这页。密码在已经打开的空间留言里。</p>",
  handbook: "<p>手册用须知那张皮，是为了让你知道你还在咨询台里。咨询台和米色小店不是同一个地方。同一个地方不会突然出现空座两个字。空座是禁忌，也是可搜的词。搜到的规程会把退和留写成同一种手续的两个方向。</p><p>附件目录里的文娱志是红头。红头不是公文。红头只是地方资料的旧皮。旧皮下面有老侯。老侯两个字可以搜。搜到的不是悼词那么简单，也不是破案。破案的人不会来坐加映。</p>",
  gazetteer: "<p>县情网的数字涂过。涂过的位置看起来像保密，其实是没人敢填准确死亡。准确死亡需要尸体。尸体没有。没有尸体的事故在摘录里写成下落不明。下落不明的业主，厅里仍把他写在出品人那一栏。</p><p>名录不收场记。场记不是编制。不是编制的人最适合被换成另一个名字。换成另一个名字时，红头网不会更新。更新发生在字幕和铁盒。铁盒比红头勤快。</p>",
  "obit-hou": "<p>地方号写这篇的时候还在用真名。后来改成观察。观察两个字比较安全。安全的文章不会提加映。加映要读者自己从厅里搜出来。搜出来的人已经进门。进门的人不需要被这篇动员。</p><p>家属不同意火化，厅里不同意撤座。僵的那些天，金鹊西路晚上特别亮。亮是因为灯没人关。没人关的灯后来变成规矩：灯要等人坐着才肯灭。等人的灯不是照明，是催促。</p>",
  vault: "<p>八十七本拷贝里有三本发霉。发霉的仍有片名。没有片名的那本反而干燥。干燥得像从未被放映。未被放映的胶片却能在银幕上跳人名。人名来自名单。名单来自缺额。缺额来自一场没有散场的加映。</p><p>14-7 这个座号在清点表上出现两次。一次在盒脊，一次在备注。备注被墨涂掉。涂掉的人可能是田麦。田麦怕你先看见特邀。怕也没用。特邀会从票根里长出来。</p>",
  ticket: "<p>铁盒的锈印到纸边上。纸边比中间旧。中间是印刷体。印刷体比手写冷。冷的名字看起来像官方。官方没有签发过这张票。签发的是缺额。缺额盖了一个未取的章。章是红的。红的东西在内部档案里出现，通常表示还没完。</p><p>你若骂陆小棠，她听不见。听得见的是座位。座位不管骂。座位只管有没有人。有人就冷却。冷却就过关。过关的人可以走。走的人不再叫场记。还坐着的人才叫。</p>",
  credits: "<p>人员表每次覆盖。覆盖不是删除。删除会留空白。空白是空座。空座危险。所以系统选择改名。改名看起来像更新演职。更新演职看起来像一部还在制作的片子。片子其实没有。没有的片子最耗人。</p><p>田麦的名字不改。放映可以换人，却很少换。很少换的位置叫岗位。常换的位置叫场记。场记像耗材。耗材有亲属可以续。续的那一次，就是你现在读到的这张表。</p>",
  choice: "<p>提交之前可以再搜一次。搜不会把钮按掉。钮只认你有没有读过那五条。五条分别在票根、老侯、陆小棠、空座、田麦。读过不等于同意。同意发生在按下去的时候。</p><p>按下去不能撤回。不能撤回不是为了制造刺激。是因为座位上的手续一旦改写，来访会跟着改。来访改了，人未必改得回来。改不回来的账，厅里叫还灯债。债在论坛里有人谈过。谈过也不影响你选。</p>",
  "mail-lu": "<p>已发送里有一封给田麦的。标题是空白片头。空白片头不是礼物。礼物在另一页。那一页可能随真名一并打开。一并打开的东西不另设门。不另设门的意思是：你就算不读邮件，也能走完主线。读了只会把替班说得更难听，也更清楚。</p>",
  album: "<p>相册权限本来是仅好友。镜像把权限打开。打开不是为了让你欣赏。欣赏不了。灰衣没有五官。没有五官的像素仍占格子。占格子的东西会让人去数名册。名册不够数的时候，人会去搜来访。来访两个字是栏目名。栏目名可以搜。</p>",
  "mp-close": "<p>停业说明发出去那年，镇里有人鼓掌。鼓掌的人以为终于安静了。安静的是马路。马路对面的网站还在跳。跳的是来访。来访不需要大厅开门。来访只需要座位上还有名字。名字在铁盒里。铁盒不随卷帘门一起落锁。</p>",
  forum: "<p>还灯债三个字不要拆。拆开搜会变成未命中。未命中会给你一句话。一句话不够还债。债在口头禅里，口头禅在这楼里。这楼不是唯一的门。门在空座规程和选择页。这楼只负责把口头禅变成可搜的专名。</p><p>洗片间有人提过。提过不等于你必须去。必须去的是你已经在正文里见过的词。见过再搜。没见过而乱搜，会浪费在包厢和源码上。</p>",
  classified: "<p>黄页还在收信息费的年代，这条启事免费。免费的启事最可疑。可疑的东西往往诚实：它明说不找警察。警察进不了加映。加映只认场记和亲属。亲属若是你，你已经在短信里被叫过一次。叫过一次还不够，还要你自己把词送进顶栏。</p>",
  visitors: "<p>三个问号不是加载失败。失败会转圈。问号是名字被权限挡住。权限说：没登录不能看清。登录了也未必看清。看清的名字有的已经不在名册。不在名册仍会亮。亮的是座位记忆。座位记忆比相册久。</p>",
  paused: "<p>即将推出写了七年。七年里没有一张包厢平面图。没有平面图的栏目最适合当假入口。假入口的任务是失败。失败要有句子。句子在这一页。读完请离开。离开以后去首页公告里抽那个三个字的场次。</p>",
  oral: "<p>录音机在洗片间受潮。受潮的磁带拉出来是空的。空的磁带逼人口述。口述的人要求不署名。不署名的内容不能当证词。不能当证词的内容仍能当线索。线索指向最后一排。最后一排不卖票。不卖票的位置最贵。贵在要用人填。</p>",
  log: "<p>日志用内部皮。内部皮和手册一样，怕你还以为自己在小店里闲逛。闲逛到这里，说明口令对了。对了之后请把日期对着留座名单看。对着看会发现：业主未下楼的那一夜，加映仍然写了。写了的场次没有散场。没有散场的场次把缺额留给后来。</p>",
  darkroom: "<p>显影罐的盖子用铁丝捆着。捆着是怕人打开闻。闻过的人说是醋酸。醋酸掩盖不了烫过的气味。烫过的气味来自二零零八年。二零零八年以后，药液里开始泡纸片。纸片上是座号。座号泡久了，字会浮起来。浮起来的字像人名。人名不该出现在洗片间。出现了，就说明加映已经把化学和手续搅在一起。</p>",
  "empty-seat": "<p>规程写得很干。干的文章适合内部。内部不怕你害怕。内部怕你起身。起身制造空座。空座制造过热。过热制造下一次缺额。缺额制造下一张票根。票根制造下一个亲属。亲属制造你。你现在读到规程，说明链条已经绕到选择页门口。门口的词叫末班票。</p>",
  forbidden: "<p>黑底红字不是主线。主线在已经打开的米色、浅青、橙头和宋体里。请回去。</p>",
  gift: "<p>空白片头不能放映。不能放映的礼物最像手续。手续通过礼物的样子送到田麦桌上。桌上的附言把口令又写了一遍。写两遍不是因为怕你忘。是因为厅里的人说话重复。重复的人比较像还活着。</p>",
  "ending-a": "<p>退票的章盖得又歪又清楚。清楚的是名字被涂掉。歪的是你的手在抖。抖不影响手续。手续认章，不认勇气。勇气这种词不要写进档案。档案只写：缺额未补，灯已灭，来访已停。</p><p>你走出金鹊西路的时候，灯箱已经被摘。摘灯箱的人以为自己做了好事。好事发生在座位上。座位上没有你。没有你的座位终于可以空着。空着在这一次里不等于催促。催促被你按掉了。</p>",
  "ending-b": "<p>坐到完的人会得到管理员权限。权限不是光荣。权限是不能把自己的名字搜出去。搜出去会让后来的亲属看见你。看见你就等于看见下一张特邀。你不会发短信。你会改排片表。排片表多一行加映。加映谢绝退票。谢绝两个字是你现在的工作。</p><p>陆小棠的座号空了。空了的座号会不会再亮，本站不保证。本站只保证灯灭以前有人坐着。坐着的人请保持这个窗口打开。窗口是座位的另一种写法。</p>"
};

function han(html) {
  const text = html.replace(/<[^>]+>/g, "");
  return (text.match(/[\u4e00-\u9fff]/g) || []).length;
}

let total = 0;
const per = [];
const MORE2 = {
  intro: "<p>键盘按 / 不能在说明书里聚焦搜索，因为说明书没有搜索框。进了假官网以后，搜索在顶栏。顶栏常驻。常驻不是任务条。任务条我们故意不做。</p>",
  films: "<p>周末早场的位子堆在过道。堆着的椅子仍占座号。占座号的椅子不能卖。不能卖的东西最像内部。内部的早场其实已经三年没开。没开仍写在习惯里。习惯比排片表顽固。</p><p>末场灯是加映场的别称。别称和正名进同一页，不要拆开搜。</p>",
  hall: "<p>有人把口香糖粘在十四排椅背。粘着的糖比海报久。久的东西会记住谁坐过。坐过的人走了，糖还在。厅里的人把这叫痕迹。痕迹不够当证据。证据在铁盒和名单。名单不在这一页的空图里。</p><p>环境页没有搜索以外的暗门。暗门在专名里。</p>",
  snacks: "<p>汽水箱子当凳子。凳子上坐过送拷贝的人。送拷贝的人问加映卖不卖。卖不卖这种问题，小卖部不能答。不能答的问题请到公告里看。公告里有三个字。三个字请拿去顶栏。</p><p>过期价签不要撕。撕了会让后来的人以为小卖还活着。活着的是座位，不是话梅。话梅只负责让大厅闻起来像还在营业。</p>",
  help: "<p>客服不接电话。电话在首页涂黑。涂黑不是故障。故障会响。不响的东西比较像已经停运。停运的人仍留下四档字。字比人可靠。可靠的字仍要你自己去搜。</p><p>提示可以连点到第四档。第四档会把五条核对说全，仍要你去选择页自己按。</p>",
  "blog-night": "<p>我把电脑开着班级页——不对，开着排片页。排片页跳到加映。加映没有海报。没有海报的场次最费电。费电的夜里，风扇声像有人在楼上走。走的人是田麦。田麦数椅子。数椅子的人最不像凶手。不像凶手的人最适合当管理员。</p>",
  "space-tianmai": "<p>好友栏是空的。空的好友栏比满的干净。干净的空间仍有来访。来访不走好友协议。协议是给人加的。来访是给座位加的。座位不加好友。座位只加名字。名字在留言里被我写成口令的一部分。口令请写全。</p>",
  seats: "<p>打印名单的油墨会沾手。沾手的人不要去摸拷贝。拷贝怕油。油怕名字。名字怕空。空怕灯。灯怕没有人坐。没有人坐的加映会去找亲属。亲属这一行写在待填旁边。旁边有一支干了的笔。笔不是给你在这页签名的。签名发生在选择页。</p><p>待填不是空白。待填是已经印在铁盒里、还没被承认的那一行。</p>",
  "post-lu": "<p>匿名那一层像纸人。纸人这个词不要搜。搜了未必有页。没有页的词会浪费你。浪费在未命中的句子上。句子会说没有相关结果。没有相关结果时请回来读我写过的专名：场记台、留座、加映场。专名在蓝色标题和黑色正文里，不在签名档的俏皮话里。俏皮话不能开门。</p>",
  desk: "<p>须知会把登录两个字放在黑钮旁边。旁边还有注册。注册是灰的。灰的表示关闭。关闭的注册逼你用已有账号。已有账号只有一个。一个账号的真名在别的页。别的页你应该已经打开。没有打开就回去打开。不要在这页猜生日。</p><p>浅青底和米色小店必须一眼分开。分开了你才知道自己已经进了内嵌后台。</p>",
  handbook: "<p>手册第四条写不要抄到排片表。抄过的人把空座写成了早场优惠。优惠两个字让客人以为能占便宜。占便宜的客人进了加映。进了就不好退。不好退的事后来被写成内部。内部现在给你看。看完请去搜空座。空座两个字是禁忌，也是门。</p><p>放映日志与手册同一把锁。锁是登录。登录过才能把日期对着名单看。</p>",
  gazetteer: "<p>梨河县这三个字是虚构的。虚构的县仍要有一条路。路叫金鹊西路。西路十八号在摘录里出现一次。一次就够。够你把厅和事故放在同一张红头上。红头下面还有电影院已撤。已撤的院线不管个体厅。不管的地方最适合留座这种土办法活下去。</p><p>老侯两个字在事故摘录里。人名可以搜。搜到的不是公文。</p>",
  "obit-hou": "<p>有人把这篇转去论坛。论坛把标题改成灵异。灵异两个字会引来看热闹的人。看热闹的人坐不住。坐不住的人最不适合加映。加映要坐到完。坐到完是后来田麦教的口令。口令不在这篇里。这篇只负责把老侯两个字变成可搜的人名。</p>",
  vault: "<p>仓里的湿度表停在某一格。停了的表仍挂着。挂着是为了看起来专业。专业的清点却把特邀写进备注。备注被墨涂。涂了仍透字。透字的人会去找票根。票根两个字可以搜。搜到的纸比仓里的胶片更像结局的钥匙。</p>",
  ticket: "<p>方南星三个字印得很端正。端正得不像临时手写。不像临时的东西会让人觉得早有预谋。预谋这个词太大。太大的词不适合铁盒。铁盒只装缺额。缺额要填。填的时候用亲属。亲属是陆小棠填的。她填完才发短信。短信比印刷晚。晚的东西看起来像请求。请求盖不住已经印好的名字。</p><p>备注里的末班票三个字是选择页的检索词。不要拆开。</p>",
  credits: "<p>覆盖发生在一秒。一秒里场记栏闪两下。两下之后是新名字。新名字如果是你，你就还坐着。还坐着的人会得到权限。权限在另一个结局里。另一个结局也要你先按。按之前这篇把末班票又写了一遍。写两遍是厅里的口癖。口癖比新词好记。</p><p>出品人那一栏仍写侯长河。人不在，名字还在出品。</p>",
  choice: "<p>两颗钮都冷。冷的钮适合不可撤回。不可撤回的选择仍要证据。证据不是勇气。证据是你读过的五页。五页缺一，拒绝会写在钮下面。写在下面的句子没有恶意。恶意的是座位。座位不管你准备好没有。</p><p>退票抹掉你。坐到完留下你。两条都是手续，不是道德打分。</p>",
  "mail-lu": "<p>垃圾箱是空的。空的垃圾箱表示没有人把这封信扔掉。没扔掉不等于重要到能开门。开门的是场记台和手册。邮件只是把替班说得很难听。难听的话有时更清楚。清楚的话仍是附带。附带可以不读。不读也能走到铁盒。</p>",
  album: "<p>灰衣站在同一块砖上。砖缝里有瓜子壳。瓜子壳证明那是大厅，不是合成。合成不会这么脏。脏的像素让田麦用曝光来解释。解释失败以后，他把相册留着。留着给后来的人自己数。数完请去搜来访。来访比相册更不讲究五官。</p>",
  "mp-close": "<p>说明的末尾有人要求拆除网站。拆除网站要密码。密码不在这篇。密码也不该被搜。搜管理员密码会进黑页。黑页不是关站。关站两个字只把你带到这篇说明。说明承认大厅锁了。锁了的大厅仍把座位租给镜像。镜像比卷帘门便宜。</p>",
  forum: "<p>这楼的回帖很稀。稀的楼像没人信。没人信的口头禅偏偏还在厅里用。用的人是田麦。田麦不发帖。发帖的是老观众。老观众可能已经不在名册。不在名册仍能说话。说话的权限来自还过灯。还过灯的人有资格把三个字写全。写全才能搜中。</p>",
  classified: "<p>本地服务栏有人收代取票。代取票三个字很像你的短信。很像的东西不一定是同一件事。同一件事在铁盒。铁盒不打广告。打广告的是缺场记。缺场记的启事把寻人写成寻场记。寻场记四个字不要拆。拆开会未命中。</p>",
  visitors: "<p>灰影子会动。动不是动画。动画被减少以后仍会动。动的是刷新。刷新一次，问号换位置。换位置的问号像排队。排队的人没有五官。没有五官仍占来访格。占格的规则写在空间里：搜栏目名。栏目名就是来访两个字。</p>",
  paused: "<p>你若是从导航点进来，点不进来。导航是空的。空的导航逼你搜。搜包厢会打开这一页。打开这一页的意义是失败。失败要被看见。看见以后请去搜加映场。加映场三个字在首页黄色标签旁边。旁边才是真的门。</p>",
  oral: "<p>口述的人把老侯说成自己坐下去。自己坐下去比被烧死难听。难听的版本更接近厅里的规矩。规矩要人填椅子。填椅子的人后来被叫场记。场记这个工种在编制里没有。没有编制的工种最容易换人。换人的故事从老侯开始。开始的人名可以搜。</p>",
  log: "<p>抄录用的是圆珠笔。圆珠笔会透过下一页。透过的日期叠在一起，像两场加映同时发生。同时发生是错觉。错觉下面仍能读出未散场。未散场是日志里最硬的三个字。硬的字对着名单第三行。第三行是陆小棠。陆小棠四个字你应该已经搜过。</p><p>特邀票根已打印那一行，对着你现在的名字。名字在铁盒，不在这本日志的封面。</p>",
  darkroom: "<p>晾片绳上现在没有片。没有片仍挂着夹子。夹子像等什么回来。回来的不会是拷贝。拷贝在仓里。仓里的无名本对着14-7。14-7对着铁盒。铁盒对着你。你若是已经看见票根，洗片间只是把化学气味补上。补上不等于新的门。门还是那些专名。</p>",
  "empty-seat": "<p>催促不是鬼叫。催促是机房过热。过热会跳闸。跳闸会让字幕停在一半。停在一半的字幕最危险。危险在于场记栏还没改完。没改完就不能散场。不能散场就要人坐着。坐着的人如果是你，请去选择页按。按之前把五条读齐。读齐的标志是末班票能搜到。</p><p>五条是票根、老侯、陆小棠、空座、田麦。缺一条，选择页会拒绝。</p>",
  gift: "<p>赠片记录像旧社交站里的礼物。本厅没有那家站的商标。没有商标仍有赠送这一栏。这一栏附带打开。附带打开的附言把坐到完又写了一遍。写给田麦的那一句，是陆小棠在教自己。教自己的人后来出不去。出不去才找替班。替班的名字不在这一页。名字在铁盒。</p>",
  "ending-a": "<p>镜像把不应到三个字写进日志。日志不再更新。不再更新的站点仍能打开。打开以后没有来访。没有来访的大厅像真正停业。真正停业是你按出来的。按出来的停业比县情网的下落不明干净。干净不等于没有代价。代价是陆小棠未必回来。未必回来的人把选择权留给你。你用了。</p>",
  "ending-b": "<p>谢绝退票写进排片以后，帮助页的客服还会响。响也没有用。用处在座位上。座位上的人不能给自己退票。不能退的权限叫管理员。管理员会看见下一次缺额。缺额若再出现亲属，你会不会发短信，本结局不写。不写的东西归你在灯灭以前慢慢想。想的时候请坐着。</p>"
};

pages.forEach(function (p) {
  p.body = inject(p.body, MORE[p.id] || "");
  p.body = inject(p.body, MORE2[p.id] || "");
  const html = page(p);
  fs.writeFileSync(path.join(root, p.file), html);
  const n = han(p.body);
  total += n;
  per.push({ id: p.id, no: p.no || "-", han: n, file: p.file });
});
const footer = "已打开编号页本站为虚构调查游戏勿对照现实机构或个人说明";
const fh = han(footer);
total += fh * pages.length;
const kq = 24;
const numbered = pages.filter((p) => p.no).length;
const over300 = per.filter((p) => p.no !== "-" && p.han >= 300).length;
const short = per.filter((p) => p.no !== "-" && p.han < 200).length;
const over700 = per.filter((p) => p.no !== "-" && p.han > 700);
fs.writeFileSync(path.join(root, "volume-report.json"), JSON.stringify({ numbered, keywords: kq, han: total, over300, short, over700, per }, null, 2));
console.log(JSON.stringify({ files: pages.length, numbered, keywords: kq, han: total, over300, short, over700: over700.map((x) => x.id + ":" + x.han) }, null, 2));
