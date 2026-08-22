(function (P) {
  function sns(h, main, rail) {
    return (
      GAME.ui.snsTop(h) +
      "{{FLASH}}" +
      '<div class="layout">' +
      GAME.ui.snsSide(h) +
      '<div class="feed">' + main + "</div>" +
      (rail || GAME.ui.snsRail()) +
      "</div>"
    );
  }

  P.intro = {
    id: "intro",
    file: "index.html",
    skin: "skin-intro-manual",
    title: "同窗在线 · 说明",
    searchable: false,
    html: function (h) {
      return (
        '<div class="intro-hero"><h1>同窗在线</h1></div><main>' +
        "<section><h2>◯ 引言</h2>" +
        "<p>你是八十年代生人。大学前后那几年，你几乎天天泡在校园实名站里：顶上一根蓝条，左边一列功能，中间是新鲜事，右边是最近来访。后来站点关了，账号作废，同学散进别的软件。你以为那截青春已经死了。</p>" +
        "<p>这个月，一个多年未见的同学把网址发了过来。链接很短，也不像钓鱼商城。你犹豫了一下，还是点了进去。蓝条还在。状态框还在。时间却是错的：有的新鲜事停在二零一一年，有的评论写着今年。</p>" +
        "<p>站名不叫你记忆里的那个商标。它把自己写成「同窗在线」。可版式、用词、甚至那个会把人按学校和入学年份找出来的习惯，都像你当年日夜刷新的地方。你以游客身份走进去，要弄清三件事：这个址为什么还活着；发链接的人是不是还活着；以及——它为什么认得你。</p>" +
        "<p>你还记得那种刷新：晚自习回宿舍先看谁来访，再看谁改了状态，再把相册翻到最后一页。礼物、抢车位、农场后来都关了，可蓝条的记忆比那些应用更顽固。同学把链接发来时，你甚至先怀疑是谁盗了号。盗号的人通常要钱。这条链接什么也不要，只要你点进去。</p>" +
        "</section><section><h2>◯ 你要做什么</h2>" +
        "<p>这是一份说明。进去以后，请把它当成一个停更又不肯死的真站点：读公告、读新鲜事、读页脚。顶栏有搜索框，<strong>一次只搜一个汉字词</strong>。词须在你已经打开的页面上出现过。空串、带空格的两词、纯英文，都搜不出新页。</p>" +
        "<p>导航里至少有一条点进去是暂停页。应用中心会告诉你它停了。能往下走的入口写在正文的专名里。搜中以后，页面会换成日志、作坊旧站、地方志或卷宗，不只换标题颜色。</p>" +
        "<p>几乎不会搜错的第一个词，写在首页新鲜事里，帮助页也重复了一遍：有人把一门旧选修课的名字又置顶了。那四个字是<strong>纸马课</strong>。</p>" +
        "</section><section><h2>◯ 卡住的时候</h2>" +
        "<p>说明书不跟着你进站。站内「帮助」还留着已停运客服的自动回复，可以要四档提示。前三档不写最终词，第四档会写出推理，仍要你自己去搜、去登录、去表态。</p>" +
        "<p>页脚数字点不动。全站虚构。不要拿里面的县名和人名去查现实。</p>" +
        "<p>事发生在虚构的桐溪县。三代人的账，只在这个镜像里结算。页里的站名、人名、地名都不要拿去对照现实。</p>" +
        "<p>点「进入同窗」之后，这份说明会收起来。提示只留在帮助中心的停运客服里。第一词记住：纸马课。</p>" +
        "<p>请用本地网页服务打开本目录。把文件夹直接拖进浏览器的话，跨页搜索和存档会丢。</p>" +
        "<p>本机存档。清除存档会忘掉已经打开过的页面。大字和减少动画可以随时勾。键盘按 / 能聚焦搜索框。</p>" +
        (typeof location !== "undefined" && location.protocol === "file:"
          ? '<p class="paused">当前是 file://。请改用 python3 -m http.server 打开「工程」目录后再进站。</p>'
          : "") +
        '<div class="boot-actions">' +
        '<button type="button" data-act="new">进入同窗</button>' +
        '<button type="button" class="ghost" data-act="continue">继续上次</button>' +
        '<button type="button" class="ghost" data-act="wipe">清除存档</button>' +
        "</div>" +
        "<p><label><input type=\"checkbox\" data-opt=\"large\"" + (h.state.large ? " checked" : "") + "> 大字</label>　" +
        "<label><input type=\"checkbox\" data-opt=\"reduce\"" + (h.state.reduce ? " checked" : "") + "> 减少动画</label></p>" +
        "</section></main>"
      );
    }
  };

  P.home = {
    id: "home",
    file: "home.html",
    no: "01",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 首页",
    searchable: true,
    searchBody: "新鲜事 陈小北 吴启明 纸马课 港港 04计 游客 应用中心已关闭 班级公共主页 置顶日志",
    excerpt: "陈小北把链接发来，问起纸马课。吴启明把那篇日志又置顶了。",
    grants: ["lead_home"],
    html: function (h) {
      return sns(
        h,
        "<h2>新鲜事</h2>" +
          '<div class="status-box"><div class="lab">你正在想什么？</div><textarea disabled placeholder="未登录不能发状态"></textarea><button class="pub" type="button" disabled>发布</button><p class="disabled-note">发布按钮是灰的。系统提示：游客只能看缓存。</p></div>' +
          '<div class="item"><span class="name">陈小北</span> <span class="time">2026-08-12 02:17</span><p>港港，我把链接发到你现在用的号了。你还记得<strong>纸马课</strong>吗。班级那页还在，管理员不在。</p><div class="acts"><span>回复</span><span>分享</span><span>赞 0</span></div></div>' +
          '<div class="item"><span class="name">吴启明</span> <span class="time">2011-11-07 23:04</span><p>把《纸马课》那篇日志又置顶了。谁还看得到？实习那次以后，班里就有人夜里不睡觉刷最近来访。</p><div class="acts"><span>回复(12)</span><span>分享</span></div></div>' +
          '<div class="item"><span class="name">系统消息</span> <span class="time">2018-03-01</span><p>同窗在线已停止运营。你现在看到的是镜像缓存。应用中心、充值、礼物商城均不可用。班级公共主页需管理员登录。</p></div>' +
          '<div class="item"><span class="name">陈小北</span> <span class="time">2014-06-02 19:41</span><p>我下周回埠头一趟。周棠相册里那张灰衣服，你们谁敢说不是人。</p></div>' +
          '<div class="item"><span class="name">新鲜事</span> <span class="time">2011-09-18</span><p>有人分享了日志，标题被系统打成「已删除」。分享者栏目是空的。评论里只剩一句：先别搜管理员真名，他不喜欢被找。</p></div>' +
          '<div class="item"><span class="name">吴启明</span> <span class="time">2009-11-03 21:16</span><p>选修课从沈湾回来，手上全是印泥。有人说那叫考勤。我写进日志了。要看就搜标题，别在找人里填课名，找人已经停了。</p></div>' +
          '<p class="muted">服务器时间：2011-12-31 23:59，与评论时间不一致。新鲜事停在不同年份，像被人续过的缓存。</p>' +
          '<p class="muted">状态框是灰的。游客不能发，只能看缓存。</p>'
      );
    }
  };

  P.find = {
    id: "find",
    file: "find.html",
    no: "02",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 找人",
    searchable: true,
    searchBody: "找人 按姓名 学校 入学年 桐溪二职 功能已停 请用顶栏搜索 一次一个词",
    html: function (h) {
      return sns(
        h,
        "<h2>找人</h2><p>按姓名、学校、入学年份查找同学。这是当年实名站最常用的功能。</p>" +
          '<p>学校：<select disabled><option>桐溪县第二职业中学</option></select> 入学年：<select disabled><option>2004</option></select></p>' +
          '<p><button type="button" disabled>查找</button> <span class="muted">该接口在 2016 年关闭。班级名册不会从这里弹出来。</span></p>' +
          "<p>系统提示：查找接口已关闭。请改用顶栏搜索。顶栏一次只接受一个词，不会把姓名和学校拼在一起搜。</p>" +
          "<p>找人曾经按姓名、学校、入学年把同学捞回来。接口 2016 年关了。顶栏搜索还在，一次只认一个词，不把姓名和学校拼在一起搜。</p>" +
          "<p>目前可公开索引的只有校园简介、帮助中心和已缓存的新鲜事。个人主页、相册、公共主页不在找人列表里。</p>" +
          "<p>班级名册、日志和个人主页不在这个下拉框里。下拉框已经停了。</p>" +
          '<div class="paused"><p>你输入过的姓名不会出现在这里。本页不是搜索结果页。</p></div>'
      );
    }
  };

  P.school = {
    id: "school",
    file: "school.html",
    no: "03",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 校园",
    searchable: true,
    searchBody: "桐溪县第二职业中学 04计1班 公共主页 民间工艺 沈湾 实习 埠头镇 计算机班",
    html: function (h) {
      return sns(
        h,
        "<h2>桐溪县第二职业中学</h2>" +
          "<p>学校位于埠头镇旧汽车站旁，2000 年后以计算机、机电、幼师三个方向招生。同窗在线在 2006 年把本校设为可检索学校。2004 级计算机一班曾开通班级公共主页，现显示为「整修」。</p>" +
          "<p><strong>04计1班</strong>公共主页曾用于发通知、收作业截图和班级费。2011 年冬季之后不再由在校生维护。下面这条导航已停，点不开。</p>" +
          '<p><a>04计1班公共主页（整修中）</a></p>' +
          "<p>选修课「民间工艺」长期把学生带到沈湾村作坊参观。校方材料只写「民间工艺实践」，不写店名。有学生在日志里把课叫成别的名字。实习通讯稿已从校园网撤下。</p>" +
          "<p>学校官方声明：本镜像不代表学校仍在运营该社交站。校友事务请走现用渠道。本页仅保留 2010 年前后的简介缓存。</p>" +
          "<p>民间工艺实践把学生带去沈湾。店名不在本页。</p>" +
          "<p>2004 级计算机一班是学校里最早集体实名注册的班级之一。公共主页后来显示为整修。</p>" +
          "<p>机电班和幼师班没有公共主页缓存。本页不写店名，只写沈湾实习。</p>" +
          "<p>地址栏还写着旧的校园域名风格。地图、招生电话、校长信箱全部打码。</p>"
      );
    }
  };

  P.help = {
    id: "help",
    file: "help.html",
    no: "04",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 帮助",
    searchable: true,
    searchBody: "帮助 关站 2018 镜像 搜索 一次一个词 纸马课 客服 应用中心暂停 班级管理员",
    excerpt: "同窗在线于 2018 年关站。一次只搜一个汉字词。有人问纸马课那篇日志为什么还能打开。",
    html: function (h) {
      return sns(
        h,
        "<h2>帮助中心</h2>" +
          "<p>同窗在线于 2018 年<strong>关站</strong>。你看见的页面来自一份不肯标明托管人的镜像。新鲜事可能被继续写入。官方客服邮箱已退信。</p>" +
          "<p>如何搜索：在蓝条右侧输入<strong>一个</strong>汉字词。不要加空格，不要用英文命令，不要尝试查看源码或改地址。搜到的结果会列出标题。点开后若权限不够，会提示没有权限。</p>" +
          "<p>常见问题：有人问《纸马课》那篇日志为什么还能打开。答：缓存未清。有人问应用中心什么时候恢复。答：不恢复。有人问班级管理员是谁。答：本页不公布真名，请在已打开的日志或作坊页里自己读。</p>" +
          "<p>顶栏「应用」点进去是暂停页。班级页不在应用列表里。</p>" +
        "<p>镜像不提供找回密码。自动回复按你已经打开的位置给提示，不会替你搜索，也不会替你登录。</p>" +
        "<p>帮助中心沿用关站公告的口气。托管人没有署名。一次只搜一个词。客服还在自动回复。</p>" +
        "<p>《纸马课》那四个字不要拆开搜。拆开成两个词，本站不认。</p>" +
          '<div class="paused"><p>已停运客服 · 自动回复仍在。发送一条只按你目前读到的位置给提示，不替你提交搜索或登录。</p>' +
          '<p><button type="button" data-act="hint">向客服发送一条</button></p>' +
          "<p class=\"muted\">自动回复最多四档。第四档会写出推理过程，仍要你自己提交搜索或登录。</p></div>"
      );
    }
  };

  P.apps = {
    id: "apps",
    file: "apps.html",
    no: "05",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 应用中心",
    searchable: true,
    searchBody: "应用中心 暂停 农场 车位 好友买卖 礼物 充值 2012关闭",
    html: function (h) {
      return sns(
        h,
        "<h2>应用中心</h2>" +
          '<div class="paused"><p>应用中心已于 2012 年关闭。以下名称仅作目录残留，点击无效。</p></div>' +
          "<p>开心农场（下线）　抢车位（下线）　好友买卖（下线）　测试占卜（下线）　礼物商城（下线）</p>" +
          "<p>系统说明：关闭应用中心是为了停止虚拟货币。班级公共主页、日志、相册不属于应用，不会出现在本目录。</p>" +
          "<p>本目录已关闭，不是页面丢失。</p>" +
        "<p>目录还在，点击无效。</p>"
      );
    }
  };

  P.search = {
    id: "search",
    file: "search.html",
    no: "06",
    skin: "skin-search-results",
    title: "同窗搜索",
    searchable: false,
    html: function () {
      return (
        "<p>同窗搜索只索引本镜像里已经存在的页面。一次一个汉字词。命中会列出标题；未命中会留下一句说明；没有权限会提示没有权限。</p>" +
        "<p>普通词只会打到首页、找人、校园、帮助、暂停的应用中心。专名才会打开日志、作坊、空间、卷宗。不要把两个词用空格拼起来，本站没有组合检索。</p>"
      );
    }
  };

  P["blog-paperhorse"] = {
    id: "blog-paperhorse",
    file: "blog-paperhorse.html",
    no: "07",
    skin: "skin-blog-personal-2008",
    title: "吴启明的博客 - 纸马课",
    searchable: true,
    searchBody: "纸马课 沈记纸扎 沈亦舟 按手印 选修 民间工艺 冬至 吴启明 日志 沈湾",
    excerpt: "选修课把我们拉到沈湾。那堂课后来被叫做纸马课。",
    grants: ["fact_paperhorse"],
    html: function (h) {
      return (
        '<div class="top"><h1>启明的备份站</h1><p>转载自同窗日志 · 已停止评论</p></div>' +
        '<div class="nav">' + h.a("home", "回同窗") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>纸马课</h2>" +
        '<p class="meta">2009-11-03 · 阅读 1847 · 标签：选修 / 沈湾</p>' +
        "<p>民间工艺本来该在教室里剪窗花。周老师把我们拉上中巴，开到沈湾。车停在一扇刷着金漆的门前，招牌四个字，我后来在同学空间里又看见过：<strong>沈记纸扎</strong>。</p>" +
        "<p>店里全是给死人用的东西。马、衣、楼、手机，全是纸的。沈亦舟在店里像回自己家，他让每个人在一本黄纸册上按手印，说是「参观登记」。周棠问为什么要按手印，沈亦舟说：选修课要考勤。</p>" +
        "<p>我按了。油印很浅，像一层灰。出来以后有人开玩笑，说这是把名字借给纸人。当时当笑话。今晚把这篇置顶，是因为我发现同窗还在收「来访」。死人的头像也会亮。</p>" +
        "<p>管理员真名在上面。店名也在上面。我不会再写得更直。</p>" +
        "<p>课是这样上的。中巴在沈湾土路上下客，门上贴着金纸，风一吹就响。店里先给活人泡茶，茶喝完才让看后院。后院晾着纸马的骨头，竹蔑扎成架子，白纸还没糊上。沈亦舟让我们排队，黄册摊开，每人按一个指印，印泥是干的，要哈一口气才显。周棠问能不能按假名，沈亦舟说选修课要跟学号对得上，假名不算考勤。</p>" +
        "<p>我当时信了。回到学校我把这篇写成纪实，还觉得自己懂民俗。后来才知道，黄册上的指印是把名字借给纸人用的手续。店里只说登记。同窗后来把登记收成来访。</p>" +
        "<p>课结束那天下小雨。中巴玻璃上全是手印，分不清哪些是刚按过黄册的。沈亦舟坐最后一排，不跟我们说话，像把一车人送回学校只是店里的配送。有人起哄让他开空间给我们看最近来访，他没开。他说来访是给家里人看的。当时以为他在装神。今晚把这篇置顶，是想让还活着的人先看见店名。</p>" +
        "<p>置顶以后有人私信骂我吓人。吓人的是同窗还在收来访。收来访的站不该在关站之后还活着。这篇把店名和学徒的真名摊开就停。</p>" +
        "<p>评论已关闭。转载时标题未改。旁边还有一篇《回村那晚》，是同一天的草稿。</p></article>" +
        "<aside><h3>上一篇</h3><ul><li>回村那晚</li></ul><h3>博客声明</h3><p>私人转载。模板还是 2008 年的橙色头。</p></aside></div>"
      );
    }
  };

  P["blog-night"] = {
    id: "blog-night",
    file: "blog-night.html",
    no: "16",
    skin: "skin-blog-personal-2008",
    title: "吴启明的博客 - 回村那晚",
    searchable: true,
    searchBody: "回村那晚 吴启明 沈湾 香 不敢写店名 附带 纸马课",
    excerpt: "回村那晚看见电脑开着班级页。本篇原是未公开草稿。",
    grants: ["lead_night"],
    html: function (h) {
      return (
        '<div class="top"><h1>启明的备份站</h1><p>未公开草稿 · 2011</p></div>' +
        '<div class="nav">' + h.a("home", "回同窗") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>回村那晚</h2>" +
        '<p class="meta">2011-11-08 · 草稿 · 未设权限仍被镜像收走</p>' +
        "<p>这篇本来不该发。纸马课那篇是给活人看的。这篇是给我自己看的。</p>" +
        "<p>冬至前我回沈湾一趟，想问清楚手印的事。店里只亮一盏灯。柜台后一个女人不抬头，沈亦舟不在。她说学徒去续香了。我问香续在哪里，她指了指电脑。电脑里开着同窗的班级页。</p>" +
        "<p>我没有写店名。店名在上一篇。我只写：他们把来访当成香。谁点进主页，谁就是上了一炷。我当晚没敢搜管理员，怕被写成来访。</p>" +
        "<p>店里那台电脑屏幕很亮。班级公共主页停在一条未发出的状态，光标还在跳。女人说儿子去续香，续在页面上。她不让我碰鼠标，说生人点一次也算一炷。我把手缩回来，当晚写了这篇草稿，设成仅自己可见。镜像不管权限，把草稿也收走了。</p>" +
        "<p>我没有点开最近来访。我怕看见自己的头像出现在死人后面。回家后把同窗卸载了，卸载解决不了镜像。首页的时间是坏的，有人把香续在缓存上。</p>" +
        "<p>草稿里还有一句我删掉又被镜像救回来的话：续香的人如果一去不回，店里会启用附录。附录里有谁，我当时不知道。我只知道黄册比班级名册厚。</p></article>" +
        "<aside><h3>上一篇</h3><ul><li>纸马课</li></ul></aside></div>"
      );
    }
  };

  P.shenji = {
    id: "shenji",
    file: "shenji.html",
    no: "08",
    skin: "skin-corp-table-2005",
    title: "沈记纸扎 - 欢迎光临",
    searchable: true,
    searchBody: "沈记纸扎 沈连山 沈秀兰 沈亦舟 学徒 埠头 纸马 花圈 企业站 冬至",
    grants: ["fact_shop"],
    html: function (h) {
      return (
        '<table class="site"><tr><td class="banner" colspan="2">沈记纸扎　　传承 · 定制 · 送货入宅</td></tr>' +
        '<tr><td class="nav" colspan="2">' + h.a("home", "离开本站") +
        '　简介　产品　联系　{{SEARCH}}</td></tr>' +
        '<tr><td class="left"><h4>站内栏目</h4><p>本站由 Frontpage 生成<br>最后更新 2005-12-09<br>访问人数 000184</p><h4>业务</h4><p>纸马　纸衣　纸宅　花圈　阴婚全套　寿材裱糊</p></td>' +
        '<td class="main">{{FLASH}}' +
        '<div class="scroll">公告：学徒沈亦舟即日起兼任外联。班级参观请提前预约。管理员不在店时，勿翻柜台后的黄册。</div>' +
        "<p>本号祖上在沈湾做纸活。第一代招牌写的是<strong>沈连山</strong>。现事由女儿<strong>沈秀兰</strong>照应。孙儿沈亦舟在县城读书，寒暑假回店。</p>" +
        "<p>我们承接丧仪、周年、以及「把数字补齐」一类的旧活。旧活不在价目表上。埠头那边若问水利上的事，一概说善后完毕，店里只做纸，不做解释。</p>" +
        "<p>学生来参观，常把选修课叫成别的名字。请不要在互联网上发店内黄册照片。</p>" +
        "<p>联系人：沈秀兰　镇内可送货　不做线上支付　本页不会改版</p>" +
        "<p>友情链接已全部失效。</p>" +
        "<p>本站用表格排版。左边价目，中间公告，底下备案号涂黑。第一代沈连山开的号。第二代沈秀兰管黄册。第三代沈亦舟把黄册和班级页接上了线。</p>" +
        "<p>产品说明写着纸马可烧、纸衣可叠、纸宅可拆。账号的事请回同窗。本站导航多为失效链接。</p>" +
        "<p>来过店里的学生常把选修课叫成纸马课。校方课名是民间工艺实践。店号：沈记纸扎。</p>" +
        "<p>价目：纸马按尺寸，纸宅按进深，阴婚全套面议。面议不开发票，只给一张黄纸写到达。埠头那边若问水利上的事，一概说善后完毕。</p>" +
        "<p>页脚访问人数停在 000184。后来的人改走同窗。</p>" +
        "</td></tr><tr><td class=\"ft\" colspan=\"2\">沈湾村沈记　ICP 备案号已涂掉　本站与任何实名社交平台无官方关系</td></tr></table>"
      );
    }
  };

  P["space-syz"] = {
    id: "space-syz",
    file: "space-syz.html",
    no: "09",
    skin: "skin-qzone-modules",
    title: "沈亦舟的空间",
    searchable: true,
    searchBody: "沈亦舟 最近来访 先上香 班级管理员 登录 口令 模块 音乐盒",
    grants: ["fact_syz"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>空间</span>　' + h.a("home", "回同窗") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">沈亦舟　04计1班　管理员不在线</div>' +
        "{{FLASH}}<div class=\"cols\"><div>" +
        '<div class="mod"><h3>主人</h3><div class="bd"><img class="ph sq" src="assets/img-avatar-syz.jpg" alt="沈亦舟"><p>桐溪二职<br>状态：去把香续上</p></div></div>' +
        '<div class="music">正在播放：本地文件（无法解码）</div>' +
        "</div><div>" +
        '<div class="mod"><h3>主页留言</h3><div class="bd"><p>进班级公共主页的人，登录名用我真名。进门口令不要用生日，用店里那句：<strong>先上香</strong>。</p><p>不要把口令写进新鲜事。你们已经把课名写得太显。</p><p>空间还是 2009 年的模块墙：绿条、音乐盒、留言板各占一块。我把背景换成湖，来访栏还是挡不住。</p><p>我若是很久不说话，不要当我去打工。店里那句话比班级公约管用。公约第三条有两个字，班级里不该用。口令记住了，再进浅青底的后台。</p></div></div>' +
        '<div class="mod"><h3>日志</h3><div class="bd"><p>2011-12-21 我去把香续上。若来访还在跳，说明镜像没断。</p><p>空间装扮还停在那年冬天。口令写在留言板，不写生日，不写学号。</p></div></div>' +
        "</div><div>" +
        '<div class="mod"><h3>最近来访</h3><div class="bd"><p>本栏有单独存档。灰影子在名单里。</p></div></div>' +
        '<div class="mod"><h3>礼物</h3><div class="bd"><p>有人给我寄过纸马。纪录另存。</p></div></div>' +
        "</div></div>"
      );
    }
  };

  P.gift = {
    id: "gift",
    file: "gift.html",
    no: "34",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 礼物纪录",
    searchable: true,
    searchBody: "礼物 纸马 先上香 沈亦舟 陈小北 附带",
    grants: ["lead_gift"],
    html: function (h) {
      return sns(
        h,
        "<h2>礼物纪录</h2><p>应用下线后，礼物只剩文本。</p>" +
          '<div class="item"><span class="name">陈小北</span> 送给 <span class="name">沈亦舟</span> 一匹纸马　2011-12-20<p>附言：进门别说话，先上香。你教我的。</p></div>' +
          '<div class="item"><span class="name">沈亦舟</span> 送给 <span class="name">江晚晴</span> 一张空白帖　2009-11-03<p>附言：选修课考勤。不是礼物。</p></div>' +
          "<p>进门口令以沈亦舟空间留言为准。</p>" +
          "<p>纸马是他们私下传的。空白帖那条把江晚晴写进 2009 年。</p>" +
          "<p>纪录按时间排。2011 年那条附言里有先上香。</p>",
        '<div class="rail"><h3>礼物商城</h3><p class="muted">已关闭。不能再送。</p></div>'
      );
    }
  };

  P.visitors = {
    id: "visitors",
    file: "visitors.html",
    no: "10",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 最近来访",
    searchable: true,
    searchBody: "最近来访 陈小北 江晚晴 周棠 死人 2014 2026 灰影子",
    grants: ["fact_visitors"],
    html: function (h) {
      return sns(
        h,
        "<h2>最近来访 · 沈亦舟的主页</h2>" +
          "<p>系统按「谁点开过这份个人主页」记账。时间戳两套并存。</p>" +
          '<div class="visit"><img class="ph" src="assets/img-avatar-cxb.jpg" alt="陈小北"><span><strong>陈小北</strong>　2026-08-12 02:16　来访 1847 次</span></div>' +
          '<div class="visit"><img class="ph" src="assets/img-avatar-cxb.jpg" alt="陈小北"><span><strong>陈小北</strong>　2014-06-03 00:11　来访 1 次（此后户籍侧标记死亡）</span></div>' +
          '<div class="visit"><img class="ph" src="assets/img-avatar-zt.jpg" alt="周棠"><span>周棠　2011-12-22　来访 9 次</span></div>' +
          '<div class="visit"><div class="ph sq">空</div><span><strong>江晚晴</strong>　尚未到访　头像位是空的　系统已预留</span></div>' +
          '<div class="visit"><div class="ph">?</div><span>无法解析的纸人编号　来访时间显示为冬至</span></div>' +
          "<p>陈小北户籍已标死亡，名字仍在跳。江晚晴是预留的旧账号真名。头像位空着。</p>" +
          "<p>次数写在右边。时间戳两套：一套停在 2014，一套写着今年。系统没有红字。</p>" +
          "<p>无法解析的纸人编号也记了来访。江晚晴一格尚未到访。</p>" +
          "<p>名单按时间倒排。2014 年那一套和今年这一套对不上。</p>",
        '<div class="rail"><h3>说明</h3><p>次数会被别处写成祭仪用语。本页只记账，不写那个词。</p></div>'
      );
    }
  };

  P["profile-cxb"] = {
    id: "profile-cxb",
    file: "profile-cxb.html",
    no: "11",
    skin: "skin-campus-sns-2010",
    title: "陈小北的个人主页",
    searchable: true,
    searchBody: "陈小北 04计1班 车祸 2014 状态 港港 班级公共主页 周棠",
    grants: ["fact_cxb"],
    html: function (h) {
      return sns(
        h,
        '<div class="profile-head"><img class="ph sq" src="assets/img-avatar-cxb.jpg" alt="陈小北"><div><h2>陈小北</h2><p>桐溪二职 04计1班　星级：好友已散</p>' +
          '<div class="tabs-inline"><span aria-current="page">主页</span> ' +
          (h.state.unlocked.indexOf("album-cxb") >= 0 ? h.a("album-cxb", "相册") : "相册") +
          "</div></div></div>" +
          '<div class="item"><span class="time">资料</span><p>最后登录：2026-08-12。户籍备注（转载在相册评论）：2014 年 6 月车祸。两行字在同一页，系统没有红字警告。</p></div>' +
          '<div class="item"><span class="name">陈小北</span> <span class="time">2026-08-12</span><p>港港你还没来。班级公共主页还认 04计1班 这个检索词。我把链接发给你，不是叙旧。</p></div>' +
          '<div class="item"><span class="name">陈小北</span> <span class="time">2014-06-02</span><p>明天回埠头。如果我没回来，别给沈家再按手印。</p></div>' +
          "<p>状态从 2014 跳到 2026。班号 04计1班 仍写在资料里。</p>" +
          "<p>星级已经没有好友可点。资料里的死亡转载是有人把讣告评论复制进来的，不是系统字段。</p>" +
          "<p>中间没有旅行照片，没有工作。信很短：港港，来。</p>" +
          "<p>最下方一条被折叠的分享：班级公共主页，标题 04计1班，分享时间 2011 年。</p>",
        '<div class="rail"><h3>好友</h3><p>沈亦舟（管理员）　周棠　吴启明　江晚晴（未确认）</p></div>'
      );
    }
  };

  P["album-cxb"] = {
    id: "album-cxb",
    file: "album-cxb.html",
    no: "12",
    skin: "skin-campus-sns-2010",
    title: "陈小北的相册",
    searchable: true,
    searchBody: "陈小北 相册 周棠 灰衣服 车祸 讣告 班级",
    grants: ["lead_album_cxb"],
    html: function (h) {
      return sns(
        h,
        "<h2>相册 · 04计那些年</h2>" +
          '<div class="album-grid"><img class="ph wide" src="assets/img-album-grad2007.jpg" alt="2007毕业合影，后排多出没脸的影子">' +
          '<img class="ph wide" src="assets/img-album-obituary.jpg" alt="陈小北讣告照片"></div>' +
          "<p>合影评论：<span class=\"name\">周棠</span>：左边灰衣服那张不是拍照时的人。我自己的相册里也有。</p>" +
          "<p>讣告评论被系统保留了一句：请勿在同窗发送花圈。花圈应送到沈记。这句话把死亡写死了，把账号没写死。</p>" +
          "<p>合影后排多一个没脸的影子。讣告把死亡写在评论里。</p>" +
          "<p>两张图还在：毕业合影，讣告照片。评论没关。</p>" +
          "<p>周棠说灰衣服那张不是拍照时的人。</p>"
      );
    }
  };

  P.class = {
    id: "class",
    file: "class.html",
    no: "13",
    skin: "skin-service-cyan-desk",
    title: "04计1班公共主页",
    searchable: true,
    searchBody: "04计1班 公共主页 须知 登录 管理员 班级公约 暂停",
    grants: ["fact_class"],
    unlocks: ["login"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div><strong>04计1班</strong> 公共主页</div>" +
        h.a("home", "离开") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="notice"><h2>使用须知</h2>' +
        "<p>底色、按钮和导航都换了。班级公共主页当年是另一套后台。</p>" +
        "<p>游客可以读须知。班级公约、共享文件夹和未删除的新鲜事，需要管理员登录。登录名用管理员真名，不用邮箱。</p>" +
        "<p>本班于 2011 年冬季停止更新。镜像仍接受登录。你没有发布权，也没有删除权。</p>" +
        "<p>须知沿用咨询台的浅青底和黑按钮。游客只能读到：要登录，不要走找回密码邮件。</p>" +
        "<p>登录名用管理员真名，不用邮箱，不用学号。口令在他空间留言里。空串和英文口令无效。</p></div>" +
        '<div class="tabs">' + h.a("login", "登录") +
        (h.has("access_class") ? h.a("class-rules", "班级公约") + h.a("class-feed", "新鲜事") : '<a>班级公约（需登录）</a><a>新鲜事（需登录）</a>') +
        "</div>" +
        "<table><tr><th>发言人</th><th>摘要</th></tr>" +
        "<tr><td>系统</td><td>管理员账号长期占用。请勿尝试找回密码邮件。</td></tr>" +
        "<tr><td>游客</td><td>公约入口不对游客开放。搜班号只能到这里。</td></tr></table></div>"
      );
    }
  };

  P.login = {
    id: "login",
    file: "login.html",
    no: "14",
    skin: "skin-service-cyan-desk",
    title: "04计1班 - 登录",
    searchable: false,
    searchBody: "登录 管理员 口令",
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>班级公共主页登录</div>" +
        h.a("class", "返回") + " {{SEARCH}}</header>{{FLASH}}" +
        '<form class="login-box" data-act="login"><p>使用管理员真名与进门口令。空串无效。</p>' +
        '<label for="user">登录名</label><input id="user" name="user" autocomplete="off">' +
        '<label for="pass">口令</label><input id="pass" name="pass" type="password" autocomplete="off">' +
        '<p><button type="submit">登录</button></p></form></div>'
      );
    }
  };

  P["class-rules"] = {
    id: "class-rules",
    file: "class-rules.html",
    no: "15",
    skin: "skin-service-cyan-desk",
    title: "04计1班 - 班级公约",
    searchable: true,
    searchBody: "班级公约 阴册 按手印 来访 管理员 共享 不得外传",
    grants: ["fact_rules"],
    need: ["access_class"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>班级公约</div>" +
        h.a("class-feed", "新鲜事") + h.a("class", "须知") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="notice"><h2>04计1班公约（2011 修订）</h2>' +
        "<p>一、本公共主页只用于通知。二、选修课按手印的名录不上传。三、若必须备份，只许放进名为「<strong>阴册</strong>」的共享，不对游客开放。</p>" +
        "<p>四、来访次数不得写成积分。五、管理员离职后，口令不得写进新鲜事。六、发现已故同学账号仍在发言，先不要点赞，先核对公约第三条。</p>" +
        "<p>附：名为「阴册」的共享已被发布到镜像可索引处。不对游客开放。</p>" +
        "<p>修订于 2011 年冬季。签名栏空着。</p>" +
        "<p>第三条把共享文件夹的名字写死了：阴册。丧葬里用过，班级里不该用。</p>" +
        "<p>第六条写已故同学仍发言。登录后先读公约，再去新鲜事。</p>" +
        "<p>签名栏空着。公约修订于 2011 年冬季。</p>" +
        "<p>浅青底是咨询台的颜色。第三条里有阴册两个字。</p></div></div>"
      );
    }
  };

  P["class-feed"] = {
    id: "class-feed",
    file: "class-feed.html",
    no: "28",
    skin: "skin-service-cyan-desk",
    title: "04计1班 - 新鲜事",
    searchable: true,
    searchBody: "班级新鲜事 沈亦舟 续香 周棠 江晚晴 阴册 登录后",
    grants: ["lead_class_feed"],
    need: ["access_class"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>班级新鲜事</div>" +
        h.a("class-rules", "公约") + h.a("inbox", "站内信") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="post"><div class="post-info"><span>沈亦舟</span> 2011-12-21</div><p>我去把香续上。阴册不要给外人看。若来访停了，就说明镜像断了。</p></div>' +
        '<div class="post"><div class="post-info"><span>周棠</span> 2011-12-22</div><p>我相册里多的那个人今晚又出现了。别说来访是香，我听了会吐。</p></div>' +
        '<div class="post"><div class="post-info"><span>系统</span> 2026-08-12</div><p>预留账号江晚晴尚未签到。备用行仍为未启用。</p></div>' +
        "<p>登录后你只能读。不能删。系统已经把你的旧名写进了预留。</p>" +
        "<p>沈亦舟把续香和阴册写在同一条。周棠拒绝把来访叫成香。系统把江晚晴写进了预留通知。</p>" +
        "<p>口令不得写在新鲜事里。公约第五条禁止。</p>" +
        "<p>预留通知把江晚晴写得很端正。备用行仍为未启用。</p></div>"
      );
    }
  };

  P.gazetteer = {
    id: "gazetteer",
    file: "gazetteer.html",
    no: "17",
    skin: "skin-gov-redbar",
    title: "桐溪县情网 - 沈湾村",
    searchable: true,
    searchBody: "过继 沈湾 地方志 埠头水库 沈氏 林昭弟 水利 善后",
    grants: ["fact_adoption"],
    html: function (h) {
      return (
        '<div class="red"><h1>桐溪县情网</h1><p>地方资料　非政务大厅　请勿对照现实区划</p></div>' +
        '<div class="links">' + h.a("home", "离开") + "　概况　乡镇　名录　{{SEARCH}}</div>" +
        '{{FLASH}}<div class="wrap"><div class="grid"><div class="box"><h3>沈湾村简介</h3>' +
        "<p>沈湾属埠头镇。居民多沈姓。旧时以纸活、竹器为副业。村志称 1959 年冬埠头水库有过「数字善后」，详情见水利条目，本栏只写「已处理」。</p>" +
        "<p>1987 年村内出现一例跨姓<strong>过继</strong>：邻村林姓幼童入沈氏旁支。县情网不公布私家原因，只登记户口变更。过继书扫描不在本站，在族谱与丧仪文书里。</p>" +
        "<p>一九八七年有一份过继登记，林姓改成沈姓旁支。承办人栏：沈秀兰。证明人栏涂掉。</p>" +
        "<p>水利与过继写在同一乡镇栏目下。沈湾有纸扎业；沈湾经历过埠头水库善后；沈湾有过继。</p>" +
        "<p>机关抬头已删。红头只是颜色。</p>" +
        "<p>竹器、年画和冬至祭条目在 2012 年被删，理由是「与纸扎重复」。户口变更栏仍保留过继。水利栏仍保留埠头水库。</p>" +
        "<p>检索框是后来加的，和红头不配套。</p>" +
        '</div><div class="box"><h3>条目</h3><ol>' +
        "<li>水利：埠头水库 <span class=\"date\">1959</span></li>" +
        "<li>民俗：纸扎业 <span class=\"date\">在册</span></li>" +
        "<li>户口：过继登记 <span class=\"date\">1987</span></li></ol>" +
        "<p>水利条目标题含埠头水库。民俗条目不写店名全称。</p></div></div>" +
        "<p>过继书扫描不在本站。善后详情见水利条目。</p>" +
        "</div>"
      );
    }
  };
})(GAME.pages);
