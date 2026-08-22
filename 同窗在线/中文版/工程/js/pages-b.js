(function (P) {
  P.reservoir = {
    id: "reservoir",
    file: "reservoir.html",
    no: "18",
    skin: "skin-gov-redbar",
    title: "桐溪县情网 - 埠头水库善后",
    searchable: true,
    searchBody: "埠头水库 替身 1959 沈连山 数字 善后 纸 失踪 冬至",
    grants: ["fact_standin"],
    html: function (h) {
      return (
        '<div class="red"><h1>桐溪县情网</h1><p>水利资料摘录　数字已涂改　请勿当作公文</p></div>' +
        '<div class="links">' + h.a("gazetteer", "村情") + "　" + h.a("home", "离开") + "　{{SEARCH}}</div>" +
        '{{FLASH}}<div class="wrap"><div class="box"><h3>埠头水库 · 一九五九年冬</h3>' +
        "<p>漫坝后上报失踪二十三人。复查户口时，数字对不上。县里要求「名册闭合」。村内纸扎匠被叫去连夜做活。地方资料只写：善后用了「<strong>替身</strong>」手续，于冬至送入库区。活人户口簿上，那二十三人仍是失踪，不是死亡。</p>" +
        "<p>替身在本条目里指纸扎名册上的对应行，不指戏剧演员。资料未写纸人是否用了在世人的生辰。沈湾后来把这类活叫成补数字，不叫救人。</p>" +
        "<p>漫坝那夜的材料互相打架。水利栏要数字闭合，民政栏要失踪继续存在。村内纸扎匠连夜做活，冬至把纸送入库区。手续栏写：替身。更长的说法在口述里。</p>" +
        "<p>一九五九年补的是二十三个空位。一九八七年缺的是阴婚的应声。两本账分开记。</p>" +
        "<p>本条是虚构县份的摘录。条目标题：埠头水库。手续名：替身。</p>" +
        "<p>善后材料里有一句被涂掉的话，隐约是「以纸足数」。足数的是上报的失踪。纸便宜。手续写成替身以后，后来缺员时还会再拿出来。</p>" +
        "<p>编辑备注：勿与现行防汛材料混排。本页只是红头颜色的资料站。</p>" +
        "<p>1987 年阴婚缺员时，同一词出现在私家文书里。县情网不收私家文书。</p>" +
        "<p>活人户口簿上，那二十三人仍是失踪。善后用了替身手续，与纸活有关。</p>" +
        "</div></div>"
      );
    }
  };

  P.yince = {
    id: "yince",
    file: "yince.html",
    no: "19",
    skin: "skin-archive-simsun",
    title: "阴册 · 摘录卷",
    searchable: true,
    searchBody: "阴册 过继 替身 备用 江晚晴 林昭弟 沈昭弟 沈亦舟 纸人编号",
    grants: ["fact_yince"],
    html: function (h) {
      return (
        '<div class="record">{{FLASH}}<h1>阴　册</h1>' +
        '<div class="meta"><span>沈湾沈记抄件</span><span>不得外传</span>{{SEARCH}}</div>' +
        '<p>此册不是班级花名册。按手印者写入「在册」，未按者写入「附录」。来访一次，记香一炷。香尽则纸人坠。</p>' +
        "<table><tr><th>编号</th><th>姓名</th><th>世代</th><th>备注</th></tr>" +
        "<tr><td>01</td><td>沈连山</td><td>一</td><td>开册。已故。香由店续。</td></tr>" +
        "<tr><td>19</td><td>林昭弟</td><td>二</td><td>1987 阴婚到场。后过继，改口称沈昭弟。</td></tr>" +
        "<tr><td>20</td><td>沈秀兰</td><td>二</td><td>现管黄册。不入纸人列。</td></tr>" +
        "<tr><td>33</td><td>沈亦舟</td><td>三</td><td>班级管理员。2011 续香后未归。</td></tr>" +
        "<tr><td>34</td><td>陈小北</td><td>三</td><td>2014 户籍死亡。账号仍计来访。</td></tr>" +
        "<tr><td>35</td><td>周棠</td><td>三</td><td>相册多一人。未核。</td></tr>" +
        "<tr><td>36</td><td>江晚晴</td><td>三</td><td><strong>备用</strong>。1986 收下。未启用。等待到访。</td></tr>" +
        "</table>" +
        '<p>附录写明：第三代续不上，则启用备用行。启用方式：本人点开同窗，应一声到。备注栏另有「替身」手续，与过继分列。</p>' +
        "<p>抄件用宋体，点线分隔。开册人、过继的孩子、管理员、已死仍来访的同学、相册多一个人的人、备用行，排在一张表上。</p>" +
        "<p>登记写着江晚晴为备用。应到或不应到，抄件不代填。</p>" +
        "<p>编号从一到三十六，中间有空号。三十六行是附录。</p>" +
        "<p>陈小北、周棠、沈亦舟在表上并排。口令不在这张表上。</p>" +
        '<p>镜像把共享公开了。尚未应到。</p>' +
        '<p><span class="stamp">抄件</span></p></div>'
      );
    }
  };

  P["album-zt"] = {
    id: "album-zt",
    file: "album-zt.html",
    no: "20",
    skin: "skin-qzone-modules",
    title: "周棠的空间 · 相册",
    searchable: true,
    searchBody: "周棠 相册 灰衣服 多一个人 沈湾 模块墙",
    grants: ["fact_zhou"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>空间</span>　' + h.a("home", "回同窗") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">周棠　把背景换成浅绿就不会被找　失败了</div>' +
        "{{FLASH}}<div class=\"cols\"><div><div class=\"mod\"><h3>主人</h3><div class=\"bd\"><img class=\"ph sq\" src=\"assets/img-avatar-zt.jpg\" alt=\"周棠\"><p>04计1班</p></div></div></div>" +
        "<div><div class=\"mod\"><h3>相册：谁多出来了</h3><div class=\"bd\">" +
        '<img class="ph wide" src="assets/img-album-paperhorse2009.jpg" alt="2009纸马课合影，后排灰衣无面">' +
        '<img class="ph wide" src="assets/img-album-spring2010.jpg" alt="2010春游合影，同一位置灰衣">' +
        "<p>我数过。按手印那次，相机里就多一个。沈亦舟说那是曝光。曝光不会连着两年站在同一块砖上。</p>" +
        "<p>空间是浅绿模块墙，音乐盒坏了，相册却还在。灰衣服不占好友栏，只占像素。我把照片对比过班级名册，名册上没有这个人。名册是活人的。活人里不该有一张没有五官的后排。</p>" +
        "<p>留言板被我关过。镜像又打开。匿名用纸人口气说话，点我的名字，也点一个还没来访的名字。</p></div></div></div>" +
        "<div><div class=\"mod\"><h3>留言板</h3><div class=\"bd\"><p>单独存档。留言板曾关闭，镜像又打开。</p></div></div></div></div>"
      );
    }
  };

  P["wall-zt"] = {
    id: "wall-zt",
    file: "wall-zt.html",
    no: "21",
    skin: "skin-qzone-modules",
    title: "周棠的空间 · 留言板",
    searchable: true,
    searchBody: "周棠 留言板 纸人 到场 江晚晴 附带",
    grants: ["lead_wall"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>空间</span>　' + h.a("album-zt", "相册") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">周棠　留言板</div>{{FLASH}}' +
        '<div class="cols"><div></div><div><div class="mod"><h3>留言</h3><div class="bd">' +
        "<p>匿名：你还差一个到场的人。备用还空着。</p>" +
        "<p>周棠：匿名请出去。这里不是祠堂。</p>" +
        "<p>匿名：同窗就是祠堂。江晚晴若点进来，灰衣服就有脸。</p>" +
        "<p>周棠：我要删空间。删不掉。绿色的墙比蓝条还难关。</p>" +
        "<p>匿名：删了也会在来访里。来访不认删除。</p>" +
        "<p>匿名把备用和江晚晴写在一句里。署名都是匿名。</p>" +
        "<p>周棠要删空间。匿名说删了也会在来访里。</p>" +
        "</div></div></div><div></div></div>"
      );
    }
  };

  P.forum = {
    id: "forum",
    file: "forum.html",
    no: "22",
    skin: "skin-discuz-board",
    title: "埠头茶馆 - 还阴债",
    searchable: true,
    searchBody: "还阴债 埠头 茶馆 论坛 沈湾 纸扎 香 活人气",
    grants: ["fact_debt"],
    html: function (h) {
      return (
        '<div class="wp"><div class="hd"><strong>埠头茶馆</strong><span>' + h.a("home", "离开") + " {{SEARCH}}</span></div>" +
        '<div class="nv"><a>茶馆</a><a>地方</a><a>民俗</a><a>灌水</a></div>{{FLASH}}' +
        '<div class="floor"><div class="u"><p>楼主</p><p>老埠头</p></div><div class="t">' +
        "<h3>沈湾那家还在替人还阴债吗</h3>" +
        "<p>小时候听过：欠阴间的数字，可以用活人气数去还。拿「被看见」去抵。以前靠上坟，后来靠名册，再后来有人把名册搬到网上，说来访就是上香。</p>" +
        "<p>词就叫<strong>还阴债</strong>。沈湾纸扎铺不认这个词，他们只说补数字。可老一辈都这么叫。</p>" +
        "<p>茶馆论坛还是蓝头表格，楼层从左到右。这种站从来不负责核实。别混在一帖里吵水利和阴婚。</p>" +
        "<p>锁定后不能回，能读。标题还阴债三个字还在。</p>" +
        "<p>被看见，在坟前是跪，在网上是来访。来访便宜，债也容易转给还没答应的人。</p>" +
        "<p>帖子锁定于 2013 年。不能回，能读。沈湾纸扎铺只说补数字，老一辈叫还阴债。</p>" +
        '<p class="sig">发帖 2013-09 · 已锁定 · 本论坛与同窗无关系</p></div></div>' +
        '<div class="floor"><div class="u"><p>2楼</p><p>过路</p></div><div class="t">' +
        "<p>别把水利那事和阴债混在一帖。水库是数字，阴婚是另一笔。两笔都经沈家手，不代表是同一本账。</p></div></div>" +
        '<div class="floor"><div class="u"><p>3楼</p><p>已注销</p></div><div class="t">' +
        "<p>林家那个过继的孩子后来改姓了。族谱写得比论坛清楚。别在茶馆人肉。</p></div></div></div>"
      );
    }
  };

  P["mp-sxl"] = {
    id: "mp-sxl",
    file: "mp-sxl.html",
    no: "23",
    skin: "skin-wechat-mp-article",
    title: "埠头地方号 - 沈秀兰访谈",
    searchable: true,
    searchBody: "沈秀兰 访谈 纸扎 沈连山 沈亦舟 地方号 关站 手艺 香火",
    grants: ["fact_sxl"],
    html: function (h) {
      return (
        '<div class="article"><h1>沈湾还有人做纸马：访沈秀兰</h1>' +
        '<div class="meta"><span class="acct">埠头地方号</span>　2016-04-02　{{SEARCH}}</div>{{FLASH}}' +
        "<p>沈秀兰不愿意拍照。她说纸扎拍出来不吉利。店里电脑开着一个已经关站的校园网页，她说那是儿子留下的，不要关。</p>" +
        "<p>问起第一代，她只重复店招上的名字：<strong>沈连山</strong>。她说父亲不识字，可会写黄册。问起儿子沈亦舟，她说人在外面续香，续完就回来。采访时是 2016 年。儿子 2011 年冬天离开。</p>" +
        "<p>记者问还阴债、替身、过继，她一律答：那是老话，店里做的是手艺。记者问班级公共主页为什么还在跳，她看着屏幕说：有人来，<strong>香火</strong>就还在。</p>" +
        "<p>访谈在镇里小馆进行，录音里有碗碰桌子的声音。沈秀兰把儿子说成「去续」，把父亲说成「开号的人」，把电脑说成「不要关」。地方号把这段放在中后。</p>" +
        "<p>她不承认还阴债。她把屏幕上的来访和香火说成一件事。父亲的名字她只肯念店招上那三个字：沈连山。她说自己不看评论。</p>" +
        "<p>记者离开时看了一眼屏幕。班级页停在一条未发出的状态，光标还在。沈秀兰说不要关。店里会把回不来的人改做成纸人。她没把这句话说完。</p>" +
        "<p>地方号把标题写成手艺传承。配图没有放出来。正文中间那句：有人来，香火就还在。</p>" +
        '<div class="tail">阅读 128　赞 0　留言已关闭　' + h.a("home", "离开") + "</div></div>"
      );
    }
  };

  P.inbox = {
    id: "inbox",
    file: "inbox.html",
    no: "24",
    skin: "skin-campus-sns-2010",
    title: "同窗在线 - 站内信",
    searchable: true,
    searchBody: "站内信 陈小北 江晚晴 备用 到场 链接",
    grants: ["lead_inbox"],
    need: ["access_class"],
    html: function (h) {
      return GAME.ui.snsTop(h) + "{{FLASH}}<div class=\"layout\">" + GAME.ui.snsSide(h, "江晚晴") +
        '<div class="feed"><h2>站内信</h2>' +
        '<div class="msg"><span class="name">陈小北</span> → 江晚晴　2026-08-12<p>你点进来就算看见了。看见还不是到场。到场要在名录上应。你要是想走，就去把备用那行划掉。</p></div>' +
        '<div class="msg"><span class="name">陈小北</span> → 江晚晴　2014-06-02<p>我怕回埠头以后回不来。若我的号还在说话，不要信那是我。信阴册。</p></div>' +
        '<div class="msg"><span class="name">系统</span><p>发信人状态：户籍死亡 / 账号活跃。本站不提供举报入口。</p></div>' +
        "<p>站内信没有已读，没有撤回。点进来只是看见；名录上应才是到场。2014 年那封要你信阴册。</p>" +
        "<p>没有外发权限。镜像只摊开寄给江晚晴的两封。</p>" +
        "<p>两封信隔了十二年。平时的陈小北爱起哄。这两封写得很短。</p>" +
        "</div><div class=\"rail\"><h3>收件箱</h3><p>只有管理员登录后，镜像才把寄给你旧账号的信摊开。你没有外发权限。</p></div></div>";
    }
  };

  P["profile-jwq"] = {
    id: "profile-jwq",
    file: "profile-jwq.html",
    no: "25",
    skin: "skin-campus-sns-2010",
    title: "江晚晴的个人主页",
    searchable: true,
    searchBody: "江晚晴 备用 1986 未启用 港港 资料 到场 注销",
    grants: ["fact_spare"],
    html: function (h) {
      var extra = h.has("inference_three_layers") || h.has("fact_papers")
        ? '<p>' + h.a("choice", "打开附录") + "</p>"
        : "<p>附录尚未对当前账号开放。</p>";
      return GAME.ui.snsTop(h) + "{{FLASH}}<div class=\"layout\">" + GAME.ui.snsSide(h, "江晚晴") +
        '<div class="feed"><div class="profile-head"><div class="ph sq">空</div><div><h2>江晚晴</h2><p>网名：港港　状态：<strong>备用 / 未启用</strong></p></div></div>' +
        "<p>资料页隐藏栏被镜像摊开了。出生年 1986。入学 2004。班级 04计1班。备注：阴册附录第 36 行。头像位空着。</p>" +
        "<p>状态栏写着备用 / 未启用。头像位空着。</p>" +
        "<p>爱好一项写的是附录行号。没有父母留言。只有系统。</p>" +
        "<p>备用是阴册附录的状态。资料页改不了。要改，去账号处理：应到，或不应到。</p>" +
        extra +
        "</div><div class=\"rail\"><h3>最近来访</h3><p>还没有你自己。系统在等。</p></div></div>";
    }
  };

  P.forbidden = {
    id: "forbidden",
    file: "forbidden.html",
    no: "26",
    skin: "skin-forbidden",
    title: "没有权限",
    searchable: false,
    html: function (h) {
      return (
        '<div class="box"><h2>你没有权限查看该内容</h2>' +
        "<p>可能因为：你不是主人好友，或该内容已删除。</p>" +
        "<p>请回首页。</p>" +
        "<p>本页不提供权限申请。</p>" +
        '<p><span class="hidden-ink">（无）</span></p>' +
        "{{SEARCH}}" +
        "<p>" + h.a("home", "回首页") + "　" + h.a("help", "帮助") + "</p></div>"
      );
    }
  };

  P["paper-list"] = {
    id: "paper-list",
    file: "paper-list.html",
    no: "27",
    skin: "skin-archive-simsun",
    title: "纸人名录 · 香火",
    searchable: true,
    searchBody: "香火 纸人 来访 计数 江晚晴 陈小北 沈亦舟 名录",
    grants: ["fact_papers"],
    unlocks: ["choice"],
    html: function (h) {
      var gate = h.has("fact_spare") && h.has("fact_sls") && h.has("fact_cxb") && h.has("fact_lin")
        ? '<div class="choice-row"><p>' + h.a("choice", "打开附录") + "</p></div>"
        : "<p>名录已打开。附录暂不对当前账号开放。</p>";
      return (
        '<div class="record">{{FLASH}}<h1>纸人名录</h1>' +
        '<div class="meta"><span>以香火计</span><span>来访即续</span>{{SEARCH}}</div>' +
        "<p>纸人无肉身。同窗的来访次数被沈记写成<strong>香火</strong>。香火断则纸人坠，镜像里的新鲜事也停。</p>" +
        "<table><tr><th>纸人</th><th>对应账号</th><th>香火</th></tr>" +
        "<tr><td>第三十三</td><td>沈亦舟</td><td>将尽</td></tr>" +
        "<tr><td>第三十四</td><td>陈小北</td><td>靠你点开才跳了一下</td></tr>" +
        "<tr><td>第三十六</td><td>江晚晴（备用）</td><td>零。待应到</td></tr></table>" +
        "<p>同学还在找你叙旧。已故账号靠来访续。江晚晴这一行香火为零，待应到。</p>" +
        "<p>香火是记账单位。陈小北的纸人跳了一下。江晚晴仍是零。</p>" +
        "<p>纸人编号与阴册行号对齐。本页用宋体。</p>" +
        "<p>表下若有附录入口，可以提交账号处理。没有的话，当前账号还不能交。</p>" +
        "<p>祠堂管委会还有一份旧企业页。班级主页在那边叫做数字祠堂。</p>" +
        gate + "</div>"
      );
    }
  };

  P["oral-sls"] = {
    id: "oral-sls",
    file: "oral-sls.html",
    no: "29",
    skin: "skin-blog-personal-2008",
    title: "口述转载 - 沈连山",
    searchable: true,
    searchBody: "沈连山 口述 还阴债 水库 黄册 第一代 纸 冬至 香火",
    grants: ["fact_sls"],
    html: function (h) {
      return (
        '<div class="top"><h1>埠头口述档案（私人转载）</h1><p>录音已佚　文字不可当作证词</p></div>' +
        '<div class="nav">' + h.a("home", "离开") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>沈连山口述摘</h2>" +
        '<p class="meta">据称 1998 年　转载者已注销</p>' +
        "<p>水库那年来叫我补数字。我扎了二十三个，冬至送进去。我说这是手艺。救人要还阳，我们做的是<strong>还阴债</strong>：欠的是名册上的空，还的是纸上的满。</p>" +
        "<p>后来女儿办阴婚，缺一个应声的。我没让她用纸人应，用了邻村一个没上册的孩子。那是第二笔账。第三笔账不该轮到网上。网上的来访太便宜，香会假。</p>" +
        "<p>谁要是把活人写成备用，那是怕第三笔断了。债压到还没答应的人身上。</p>" +
        "<p>录音里全是纸响。他说还阴债是把「被看见」借给名册。坟前上香贵，点一次主页便宜，所以后来的人把香火搬到网上。他骂这个便宜。骂完又说，便宜才会有人肯续。</p>" +
        "<p>他说第三代把同窗接去店里，不是他教的。江晚晴有没有应声，这份摘里没有。</p>" +
        "<p>转载者写：录音搬家时丢了，只剩这份摘。还阴债三个字是他反复说的。</p>" +
        "<p>摘末尾半句：备用若启用，第三笔才算接上。半句没有主词。</p></article>" +
        "<aside><h3>转载说明</h3><p>橙色头的博客只是转载壳。录音已佚。</p></aside></div>"
      );
    }
  };

  P["mp-local"] = {
    id: "mp-local",
    file: "mp-local.html",
    no: "30",
    skin: "skin-wechat-mp-article",
    title: "埠头地方号 - 关站之后",
    searchable: true,
    searchBody: "关站 2018 镜像 同窗 地方号 怀旧",
    grants: ["lead_close"],
    html: function (h) {
      return (
        '<div class="article"><h1>校园站关了，沈湾那台电脑没关</h1>' +
        '<div class="meta"><span class="acct">埠头地方号</span>　2019-01-15　{{SEARCH}}</div>{{FLASH}}' +
        "<p>同窗在线<strong>关站</strong>那年，城里人都当笑话。沈湾有人说，店里那台电脑还登着班级页，夜里自己刷新。</p>" +
        "<p>关站那年城里当笑话。沈湾不当笑话：店里电脑夜里自己刷新。</p>" +
        "<p>2018 年城里都当笑话：哪个站还在用蓝条。店里电脑登着班级页，夜里自己刷新。地方号把这写成怀旧。</p>" +
        "<p>关的是公司，没关的是沈湾那台电脑。</p>" +
        "<p>缓存能把已死的状态栏重新点亮。关站公告关不掉沈湾那台电脑。</p>" +
        '<div class="tail">' + h.a("help", "回帮助") + "</div></div>"
      );
    }
  };

  P.genealogy = {
    id: "genealogy",
    file: "genealogy.html",
    no: "31",
    skin: "skin-archive-simsun",
    title: "沈氏族谱摘",
    searchable: true,
    searchBody: "林昭弟 沈昭弟 过继 族谱 1987 阴婚 沈秀兰",
    grants: ["fact_lin"],
    html: function (h) {
      return (
        '<div class="record">{{FLASH}}<h1>沈氏旁支谱摘</h1>' +
        '<div class="meta"><span>1987 增页</span><span>抄件</span>{{SEARCH}}</div>' +
        "<p>林昭弟，邻村林氏幼子，未入林氏族籍。是年沈秀兰阴婚缺伴，昭弟应声「到」。事后以<strong>过继</strong>入沈氏旁支，改称沈昭弟。谱上不写替身，写过继。黄册上不写过继，写到场。</p>" +
        "<p>昭弟成年后离开沈湾，谱上无下落。第三代不把此人写入班级名册。班级名册是另一本。</p>" +
        "<p>林昭弟，沈昭弟，谱上是同一个人的两种登记。</p>" +
        "<p>谱摘只复印了半页。孩子有两个名字。过继写在谱上，到场写在黄册。灰衣服是不是他，谱上没有。</p>" +
        "<p>旁支谱不进正祠。正祠后来改记在网上。网上那份旧企业页，会把香火两个字写在公告里。</p>" +
        "<p>谱上还有一行被后来的人用墨涂了。涂掉的位置在昭弟之下，像还准备写一个名字。没有写成。一九八六年前后沈湾收过一笔「备用」，这笔不进正谱，进黄册附录。谱不管附录。不管不等于没有。你要看附录，已经看过阴册。</p>" +
        "<p>旁支谱不进正祠。昭弟之下有一行被墨涂了。一九八六年前后的备用不进正谱，进黄册附录。</p></div>"
      );
    }
  };

  P.shrine = {
    id: "shrine",
    file: "shrine.html",
    no: "32",
    skin: "skin-corp-table-2005",
    title: "沈湾祠堂管委会",
    searchable: true,
    searchBody: "祠堂 管委会 香火 同窗 班级 数字祠堂 旧站",
    grants: ["lead_shrine"],
    html: function (h) {
      var gate = h.has("fact_papers") && h.has("fact_spare")
        ? "<p>" + h.a("choice", "打开附录") + "</p>"
        : "<p>附录尚未开放。</p>";
      return (
        '<table class="site"><tr><td class="banner" colspan="2">沈湾祠堂管委会（已停）</td></tr>' +
        '<tr><td class="nav" colspan="2">' + h.a("home", "离开") + "　{{SEARCH}}</td></tr>" +
        '<tr><td class="left"><h4>公告</h4><p>实体祠堂年久失修<br>香火改记在网上</p></td>' +
        '<td class="main">{{FLASH}}<p>2009 年起，班级公共主页被本会默认为「数字祠堂」。来访作香，状态作祝文。本会不承认还阴债的说法，只承认计数。</p>' +
        "<p>管委会没有政务职能，也没有国徽。这是一份 2005 年风格的表格站。公告：香火改记在网上。</p>" +
        "<p>公告写于 2009 年，比关站早九年。那时班级页还活着，他们已经把来访当作香火。实体祠堂漏雨，牌位受潮，有人提议把牌位做成账号。提议没有会议纪要，只有这一页还挂着。</p>" +
        "<p>附录入口在名录末尾，也在本页。</p>" +
        "<p>实体祠堂漏雨。班级页被默认为数字祠堂。来访作香火。</p>" +
        gate + "</td></tr></table>"
      );
    }
  };

  P.choice = {
    id: "choice",
    file: "choice.html",
    no: "33",
    skin: "skin-archive-simsun",
    title: "到场与否",
    searchable: false,
    searchBody: "选择 注销 接香 到场",
    html: function (h) {
      var ready = GAME.meta.endingNeed.every(function (t) { return h.has(t); });
      var body = ready
        ? "<p>可以提交了。注销账号，拒绝到场，纸人按名录坠落，班里不再回音。接过值班，你就成为第四代续香的人，站点继续把来访写成香火。</p>" +
          '<div class="choice-row"><button type="button" data-choice="logout">注销账号</button>' +
          '<button type="button" data-choice="keep">我来值班</button></div>'
        : "<p>账号处理未开放。备用、香火、陈小北、沈连山、林昭弟、沈昭弟的登记还未齐。</p>";
      return (
        '<div class="record">{{FLASH}}<h1>到场与否</h1>' +
        '<div class="meta"><span>账号处理</span><span>附录</span>{{SEARCH}}</div>' +
        "<p>本页不公布新材料。只问要不要应那一声「到」。</p>" +
        "<p>不应到：划掉备用，计数归零。接香：把管理员改成自己，镜像继续开着。</p>" +
        "<p>提交前可以回去再读。提交后不能用搜索撤销。</p>" +
        body + "</div>"
      );
    }
  };

  P["ending-a"] = {
    id: "ending-a",
    file: "ending-a.html",
    no: "35",
    skin: "skin-archive-simsun",
    title: "不应到",
    searchable: false,
    html: function (h) {
      return (
        '<div class="record"><h1>不应到</h1>' +
        '<div class="meta"><span>已提交</span><span>不应到</span></div>' +
        "<p>你在资料页把备用行划掉。来访计数归零。陈小北最后一条状态停在发送失败。沈亦舟的空间灰掉。周棠相册里的灰衣服还在，只是不再刷新。</p>" +
        "<p>沈记店里的电脑若还开着，现在应当是黑的。债没有还清，只是不再记在你的名下。班群不会再来信。你活在关站之后的年份里，不再给纸人当香。</p>" +
        "<p>叙旧停了。祠堂停香。备用行没有启用。你拒绝到场。</p>" +
        "<p>蓝条不会跟着你。班群沉默。沈湾那台电脑若还亮着，也只是亮着。债还在世上，不再记在江晚晴这一行。</p>" +
        "<p>一九五九年的数字、一九八七年的应声、二零零九年的手印还在别的页里。镜像把你的行写成划掉。</p>" +
        "<p>" + h.a("intro", "回说明") + "</p></div>"
      );
    }
  };

  P["ending-b"] = {
    id: "ending-b",
    file: "ending-b.html",
    no: "36",
    skin: "skin-campus-sns-2010",
    title: "接香",
    searchable: false,
    html: function (h) {
      return GAME.ui.snsTop(h) + "<div class=\"layout\">" + GAME.ui.snsSide(h, "江晚晴") +
        '<div class="feed"><h2>你已接班</h2>' +
        "<p>班级公共主页把管理员改成江晚晴。新鲜事开始按你的来访往下跳。陈小北的头像亮着。沈亦舟的状态仍是「去把香续上」，像一句交给你的交接。</p>" +
        "<p>你成为第四代。站点还是 2010 年那样蓝着。备用行被改成「在册」。纸人还在收来访。</p>" +
        "<p>新鲜事仍像同学在说话。来访仍在记。管理员换成江晚晴。</p>" +
        "<p>你会看见死人的头像亮着，自己的来访变成香。应用中心仍暂停。</p>" +
        "<p>账在班级页里，由你值班。值班没有工资，只有来访。来访会把纸人喂饱。纸人会继续叫你同学。</p>" +
        "<p>" + h.a("intro", "回说明") + "</p></div>" +
        '<div class="rail"><h3>最近来访</h3><p>江晚晴 刚刚</p><p>陈小北 刚刚</p></div></div>';
    }
  };
})(GAME.pages);
