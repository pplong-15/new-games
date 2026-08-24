#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pathlib import Path
ROOT = Path(__file__).resolve().parent

def pin(cid, label="记进交班本"):
    return f'<p><button type="button" class="pin" data-claim="{cid}">{label}</button></p>'

def still(kind, label, extra=""):
    cls = f"still still-{kind} {extra}".strip()
    return f'<figure class="{cls}" role="img" aria-label="{label}"></figure>'

def foot(n):
    return f'<footer class="pg">{n}/36</footer>'

def assets(depth, skins):
    p = "../" * depth
    links = "\n  ".join(f'<link rel="stylesheet" href="{p}css/{s}.css">' for s in skins)
    return f'''  {links}
  <link rel="stylesheet" href="{p}css/shouqi.css">
  <script src="{p}js/keywords.js"></script>
  <script src="{p}js/keyword-search.js"></script>
  <script src="{p}js/data.js"></script>
  <script src="{p}js/engine.js"></script>'''

def doc(cls, title, body, n, depth, skins):
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="{cls}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
{assets(depth, skins)}
</head>
<body data-page="{n}">
{body}
{foot(n)}
</body>
</html>
'''

def shop_nav(depth):
    p = "../" * depth
    return f'''    <header>
      <a class="logo" href="{p}index.html">白塔殡仪服务中心</a>
      <form id="search-form" action="{p}search-results.html" method="get">
        <input id="search-input" name="q" placeholder="搜本站">
        <button type="submit">搜索</button>
      </form>
    </header>
    <nav id="menubar"><ul>
      <li><a href="{p}index.html">首页</a></li>
      <li><a href="{p}pages/p02-halls.html">告别厅</a></li>
      <li><a href="{p}pages/p03-park.html">停车场</a></li>
      <li><a href="{p}pages/p04-paused.html">夜间守灵</a></li>
      <li><a href="{p}pages/p05-desk.html">守七台账</a></li>
    </ul></nav>'''

def desk_head(depth, title="守七台账"):
    p = "../" * depth
    return f'''<div id="wrap">
<header>
  <strong>{title}</strong>
  <div>
    <a class="ghost-btn" href="p07-login.html">登录</a>
    <form id="search-form" action="{p}search-results.html" method="get" style="display:inline">
      <input id="search-input" name="q" placeholder="搜索内容...">
      <button type="submit">搜索</button>
    </form>
  </div>
</header>
<nav class="desk-nav" aria-label="台账分区">
  <a href="p05-desk.html">值班台</a>
  <a href="p06-doors.html">原件柜</a>
  <a href="p07-login.html">登录袋</a>
  <a href="p28-handover.html">交班</a>
</nav>'''

PAGES = []

INTRO = '''<!DOCTYPE html>
<html lang="zh-CN" class="skin-intro-manual">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>守七台账</title>
  <link rel="stylesheet" href="css/intro-manual.css">
  <link rel="stylesheet" href="css/shouqi.css">
  <script src="js/data.js"></script>
  <script src="js/engine.js"></script>
</head>
<body>
  <header class="intro-hero">
    <div class="image-area"><figure class="still still-stairs intro-still" role="img" aria-label="馆内楼梯"></figure></div>
    <h1>守七台账</h1>
  </header>
  <main>
    <section>
      <h2>今晚</h2>
      <p>你是岑书。白塔殡仪服务中心守七台账，工号 SQ-19。子时前要交一条：今晚证实了什么。你不批准开厅，只写建议。</p>
      <p>郝家要在告别厅做头七。厅已经挂了幡。原件柜每班只准调三份。交班还柜，桌上的纸会空，钉进交班本的才留下。</p>
    </section>
    <section>
      <h2>手怎么动</h2>
      <p>进中心先看公告。讣告栏改过，字在首页上。然后去值班台，点本班先调的那扇门。</p>
      <p>页上的字段要钉进交班本，打开过不算。顶栏搜索只能碰到公开页。原件柜里的条，搜索打不开。</p>
      <p class="boot-actions">
        <a class="enter-link" href="index.html">去白塔殡仪服务中心。公告里有「讣告栏」。</a>
      </p>
      <div id="boot-extra"></div>
    </section>
    <section>
      <h2>卡了</h2>
      <p>值班台上有指点，一档一档给。前几档只指路，不把该不该开厅写死。</p>
      <p>津西县、白塔镇、郝家，都是写出来的地方和人。别拿去对门外的门牌。门外没有这家馆，也没有这本台账。今晚只写建议，不批开厅。</p>
      <p>正职请了假，假条写家里有事。事是什么没人问。没人问的班，最容易把主家的日子抄进厅里。日子能抄，抄了走开厅。开厅听过的那夜，回执上会有你的工号。工号是 SQ-19，写在抽屉里那张工牌上。</p>
<p>白塔这地方把治丧叫一条龙。一条龙是报价单上的词，报价单白天看。夜里没有报价，夜里只有柜和份数。份数用完要还。还了才能再要。</p>
      <p>你若看见接运的时刻和讣告上的终期不在同一天，就不要用接龙里的腔去糊。糊是人情。人情子时之后再讲。子时之前只对已证实的条。条要成组交。不成组不判。判了哪一条闪一下，人就会去碰格子。碰格子不是今晚的写法。今晚的写法是选哪三份，还柜，把钉过的带走。</p>
    </section>
  </main>
</body>
</html>
'''
PAGES.append(("introduction.html", INTRO))

PAGES.append(("index.html", doc(
    "skin-shop-local-2010s", "白塔殡仪服务中心",
    f'''<div id="container">
{shop_nav(0)}
<main>
{still("gate", "门口", "hero")}
<section>
<p>白塔镇这条路上，夜里还亮灯的就这一处。接运车停在侧门，雨布没解开。大厅玻璃上贴着价目，价目是前年的，胶布揭过两次。揭的时候胶布带起漆，漆底下是更旧的绿。</p>
<p>公告栏第三行被新纸盖住。新纸写：郝家头七改在今晚，<b>讣告栏</b>日期已换。要看那张纸，走值班台原件柜，本页只通知，不附原文。原文在柜里，柜要占本班的份数。</p>
<p>职工栏用铅笔注了一笔：守七台账夜班见岑书。口令写在工牌背面，背面三个字，馆里的人叫「守七」。工牌挂在值班台抽屉里，抽屉不锁，锁坏了没人修。</p>
<p>前台的叫号机白天用。夜里关掉，关掉之后仍会偶尔嘀一声，门房用纸条堵住出音孔。纸条是从价目上撕的，撕口不齐。</p>
<ul>
<li>地址：津西县白塔镇白塔路北</li>
<li>告别厅预约走台账，不在前台加塞</li>
<li>电话本那行让人用指甲划掉了</li>
</ul>
<p>友情：<a href="pages/p20-news.html">津西晚报地方版</a>　<a href="pages/p19-board.html">白塔镇事</a>　<a href="pages/p24-baike.html">做七词条</a>　<a href="pages/p22-find.html">白塔分类</a></p>
<p>侧门风铃是铁的，风一来就响。响过之后门房骂一句，骂完继续看手机。手机亮度打到最低，最低仍能看见他在刷黄历，黄历不是本馆底册。</p>
</section>
</main>
</div>''', 1, 0, ["shop-local-2010s"])))

PAGES.append(("pages/p02-halls.html", doc(
    "skin-shop-local-2010s", "告别厅价目",
    f'''<div id="container">
{shop_nav(1)}
<main>
{still("chairs", "椅", "hero")}
<section>
<p>一号厅按半日计，含音响和两条横幅。二号厅小，只放遗像和一口桌。今夜郝家订的是一号厅，订场单不在这页，在台账的预约夹。</p>
<p>价目表印于二零一一年，茶渍盖住「加时」那栏。加时要值班员签字。签字是建议，不是批准遗体移动。</p>
<p>厅里现在空着。幡还没从库房提出来。提出来的手续在原件柜，首页搜不到。</p>
<p>椅背有一圈汗渍。下午有人坐过，把矿泉水瓶子拧开又拧上，瓶子扔在第三排脚下，没人捡。保洁说夜班的垃圾早班才收，早班六点来。</p>
<p>音响柜钥匙在门房第二抽屉。抽屉卡住过一次，门房用改锥撬，撬痕还在。今夜郝家有没有用音响，价目管不着，预约单才管。管不着的东西写在这页，是因为价目页本来就写这些闲的。</p>
<p>横幅仓库在二号厅后头。后头那盏灯坏了两年。坏了的灯不要当异常，当省电。</p>
</section>
</main>
</div>''', 2, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p03-park.html", doc(
    "skin-shop-local-2010s", "停车场",
    f'''<div id="container">
{shop_nav(1)}
<main>
{still("yard", "院子", "hero")}
{still("trough", "水槽", "inline")}
<section>
<p>侧门空地能停四辆。今夜停了接运车和一辆没牌的面的。面的司机在驾驶室睡觉，窗开一条缝，烟味出来。</p>
<p>排水沟有黄纸边，被车轮压进泥里。门房说不是馆里烧的，馆里烧纸走后炉，后炉白天用。后炉的灰早上清，清完倒进镇里指定的坑，坑不对外看。</p>
<p>监控只对着大门。空地那角是盲区。盲区里今晚没有人报告异常，门房把这一句写在交接本上，字很淡。淡的字第二天有人问，门房就说没看见。</p>
<p>接运车雨布绳子松了半扣。孟昆白天说过要补，夜里没补。绳子是尼龙的，磨白了，不是新的。</p>
</section>
</main>
</div>''', 3, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p04-paused.html", doc(
    "skin-shop-local-2010s", "夜间守灵预约",
    f'''<div id="container">
{shop_nav(1)}
<main>
<section>
<p>栏目暂停。二零一八年小区禁止楼道守夜之后，这栏就没人维护。点进来不会进后台。后台那台机器搬去信息科当备用，备用机的风扇响，信息科用胶带缠过。</p>
<p>要订厅，走守七台账。不要在这页留言。留言箱是死的，死的箱子以前装过锦旗，锦旗发霉，扔了。扔的时候门房说可惜，可惜两个字没有写进任何回执。</p>
<p>有人把「暂停」读成「今夜有事瞒着」。读错了。暂停是旧政策。今夜的日期在原件柜里，不在这行灰字上。</p>
<p>旧政策复印过一页钉在门房：楼道不烧纸、不搭棚、不留人过夜。复印页角缺一块，缺的地方以前有镇里的章，章连纸一起撕了。</p>
</section>
</main>
</div>''', 4, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p05-desk.html", doc(
    "skin-service-cyan-desk", "守七台账",
    f'''{desk_head(1)}
<div class="notice">
<h2>使用须知</h2>
<div id="shift-panel"></div>
<p>接运终期算第一日。头七设奠在第七日夜。第六日夜只备厅，不开厅。口述、地方号、旅游文，写不进终期栏。写进去的人以前有过，后来被馆里把工号记在红单上。红单在白班的抽屉，夜班看不见，看不见不等于没有。</p>
<p>馆内日历：己亥年六月初七。子时铃在值班钟上，铃响没交的条，按主家走。钟是石英的，电池换过，换电池的人把旧电池扔在杯托里，杯托有一圈锈。</p>
{pin("v_tonight_chu7", "把「今晚是六月初七」记进交班本")}
<p>本班先调的门在原件柜。柜里的纸，搜索打不开。打开搜索只会碰到中心、告别厅、词条这种公开页。公开页逛熟了，替不了三份原件。</p>
<p><a href="p06-doors.html">去原件柜</a>　<a href="p30-form.html">写证实条</a>　<a href="p26-rule.html">计日口诀全文</a>　<a href="p29-phone.html">镇值班电话</a></p>
<p><button type="button" id="btn-handover">交班还柜</button></p>
<p class="feedback" id="handover-fb"></p>
<p><button type="button" id="btn-reset">清档重开</button></p>
</div>
<div class="hint-box">
<button type="button" id="hint-next">下一档指点</button>
<div id="hint-log"></div>
</div>
</div>''', 5, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p06-doors.html", doc(
    "skin-service-cyan-desk", "原件柜",
    f'''{desk_head(1, "原件柜")}
<div class="notice">
<h2>本班可调</h2>
<p>每班三份。已调的可以再看。交班后还柜。还柜的纸，本班名单上没有就抽不出来。名单每班换。换了不是跟你作对，是柜里的原件要给白班清点。</p>
<div id="door-list"></div>
<p>柜门上有人用指甲划过「先看讣告」。划痕是旧的，今晚还在。旧的划痕不是命令，是以前顶班的人留下的习惯。习惯可以跟，跟了仍要钉进本子。</p>
<p>柜是铁皮的，下层有潮。潮过的纸边会翘。翘的纸仍是原件，仍占一份。</p>
<p><a href="p05-desk.html">回值班台</a></p>
</div>
</div>''', 6, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p07-login.html", doc(
    "skin-service-cyan-desk", "登录袋",
    f'''{desk_head(1, "登录袋")}
<div class="notice">
<h2>这一袋不给夜班开</h2>
<p>管理员账号不写在导航里。岑书的工牌只能进值班台和原件柜。往这里填名字，会退回来。退回的句子每次一样，像录音。</p>
<form onsubmit="return false">
<p>工号 <input disabled placeholder="夜班无后台号"></p>
<p>口令 <input disabled placeholder="空"></p>
<p><button type="button">进不去</button></p>
</form>
<p>有人试过把郝连城填进用户名。袋口弹一句：亡者不是登录名。别再试。试了也不会开原件。</p>
<p>信息科把这袋留给改价目、改栏目的人。改栏目的人上白班。白班的钥匙不交给夜班，交接本上写过三次，三次都没人理。</p>
<p><a href="p05-desk.html">回值班台</a></p>
</div>
</div>''', 7, 1, ["service-cyan-desk"])))

PAGES.append(("search-results.html", '''<!DOCTYPE html>
<html lang="zh-CN" class="skin-search-results">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>站内结果</title>
  <link rel="stylesheet" href="css/search-and-forbidden.css">
  <link rel="stylesheet" href="css/shouqi.css">
  <script src="js/keywords.js"></script>
  <script src="js/keyword-search.js"></script>
  <script src="js/data.js"></script>
  <script src="js/engine.js"></script>
</head>
<body data-page="8">
  <div class="box"></div>
  <footer class="pg" data-page-no data-total="36">8/36</footer>
</body>
</html>
'''))

PAGES.append(("pages/p09-forbidden.html", doc(
    "skin-forbidden", "禁止",
    '''<div class="forbid-panel">
<h2>此文件已被禁止访问</h2>
<p>台账目录不给外网。夜班今晚用不到这份。回值班台写你的那一条。这一页是黑底，黑底不是吓唬人，是旧系统对没有权限的人只肯给这一张脸。</p>
<p>有人把禁止当成里面藏着日子。日子不在禁止里。日子在接运条和底册里。底册要调，调要占份。</p>
<p><a href="p05-desk.html" style="color:#f88">回值班台</a></p>
</div>''', 9, 1, ["search-and-forbidden"])))

PAGES.append(("pages/p10-obit.html", doc(
    "skin-news-portal-163", "郝连城先生讣告",
    f'''<div class="top"><div class="top-inner clearfix">
<span class="logo">津西晚报</span>
<form id="search-form" action="../search-results.html" method="get">
<input id="search-input" name="q"><button type="submit">搜索</button>
</form></div></div>
<div class="nav"><div class="nav-inner clearfix">
<a href="p20-news.html">本地</a><a href="#">社会</a>
</div></div>
<div class="wrap"><div class="main">
<h1>郝连城先生讣告</h1>
<p class="meta">来源：白塔地方号　2019-08-16 09:07:00</p>
{still("road", "镇口路", "inline")}
<p>郝连城，白塔镇郝家庄人，享年七十三。终期署六月初一。头七定于六月初七夜，在白塔殡仪服务中心一号厅设奠。丧主郝启明。遗像用的是前年春节那张，春联还在背景里，春联只露出半个福。</p>
<p>通稿是地方号代发。代发费写在发票上，发票不在这页。终期两个字旁边有改痕，改痕在电子稿里变成干净的初一。干净不是核对过，是排版的人嫌手写难看。</p>
<p>这页能证明地方号发出去的日期。不能证明接运那天是哪一天。也不能证明魂回不回。</p>
<p>通稿末尾照例有一句「特此讣告」。照例的句子每个丧户都有。每个丧户都有的句子，不能拿来当这家的终期。</p>
{pin("v_obit_chu1")}
{pin("v_tonight_chu7", "讣告把今晚当成头七，先记下今晚是初七")}
<p>钉完回原件柜。终期要跟接运条对，不要在这页搜下一份。</p>
<p><a href="p20-news.html">同版其他</a></p>
</div>
<div class="side"><h3>新闻排行</h3>
<ul class="hot">
<li><span class="n">1</span><a href="p20-news.html">镇里补签窗口又提前</a></li>
<li><span class="n">2</span><a href="#">白塔路积水</a></li>
</ul></div></div>''', 10, 1, ["news-portal-163"])))

PAGES.append(("pages/p11-ice.html", doc(
    "skin-corp-table-2005", "接运条",
    f'''<table class="site" cellspacing="0" cellpadding="0">
<tr><td colspan="2" class="banner">白塔殡仪接运科
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">搜索</button></form>
</td></tr>
<tr><td colspan="2" class="nav">
<a href="#">首页</a>|<a href="#">接运</a>|<a href="#">冰柜</a>
</td></tr>
<tr><td class="left"><h4>栏目</h4>
<p><a href="p27-reprint.html">条的复写联</a></p>
<p><a href="p25-wap.html">孟昆的手机网</a></p>
</td>
<td class="main">
<p class="scroll">夜班只登记，不改终期。</p>
{still("shed", "车棚", "inline")}
<h3>接运条 · 夜字〇四</h3>
<p>亡者郝连城。接运地点郝家庄北屋。时刻 2019-08-14 20:12，农历己亥六月初二戌时。冰柜号 B-07。经办孟昆。北屋的灯是邻居开的，邻居不愿留名，名栏划了。</p>
<p>终期按接运时刻写。条是复写纸，上面这联给台账，下面一联给家属。家属那联有人说看不清，孟昆不补写，只让人来看这一联。看这一联要占本班份数。</p>
<p>此条能证明接运时刻和冰柜号。不能证明葬礼该哪天开。不能证明地方号为什么写成初一。</p>
<p>车上的担架布洗过，洗得发硬。发硬的布上没有血迹。没有血迹不能写成「没事」，只能写成「这趟没弄脏布」。</p>
{pin("v_end_chu2")}
<p>钉完回原件柜。主家怎么说，在郝家接龙里。接龙也占一份。</p>
<p>编号用圆珠笔，弯钩很重。有人嫌难看，要打印。打印的模板还在信息科，信息科夜里不上班。</p>
</td></tr></table>''', 11, 1, ["corp-table-2005"])))

PAGES.append(("pages/p12-chain.html", doc(
    "skin-wechat-mp-article", "郝家接龙",
    f'''<article class="article">
<h1>今晚头七，人齐一下</h1>
<p class="meta"><span class="acct">郝启明</span>2019-08-19<span class="orig">接龙</span></p>
<p>爸的事今晚就办。地方号那篇你们看了吧，初七夜，白塔一号厅。别问我医院，医院我没让秀芬去，她在厂里。厂里的班她不敢甩，甩了扣钱。</p>
<div class="ph">接龙截图　字挤</div>
<p>二婶：今晚？不是还有几天。启明：今晚。窗口就这几天，别误。三叔：那我把份子带来。启明：份子以后算，人先到。二婶又问窗口是啥，启明没回。</p>
<p>群名还是「郝家庄买化肥」。化肥群拿来排日子，排完也没人改群名。不改群名不是秘密，是懒。</p>
<p class="quote">都是为了办事方便。日子是人定的。</p>
<p>秀芬没在接龙里说话。有人@她，她已读。</p>
<p>接龙能证明主家要今晚开厅。不能证明终期。不能把「方便」写进计日栏。</p>
{pin("v_family_open")}
<p>主张钉进本子以后，交班还柜。下班的门里才会出现厅的预约单。</p>
<p class="tail">阅读 86　<span class="like">赞 2</span><br>此页是家族聊天的镜像　不是公众号商标</p>
</article>''', 12, 1, ["wechat-mp-article"])))

PAGES.append(("pages/p13-libu.html", doc(
    "skin-archive-simsun", "礼簿",
    f'''<article class="record">
<h1>郝连城治丧礼簿（抄件）</h1>
<div class="meta"><span>编号：LB-19-07</span><span>抄于今晚</span></div>
<p>一七孝男主。六七出嫁女。四七亲友。簿上这一行是馆里老规矩，不是今晚新写的。新写的只有郝启明那栏预约金，预约金不能把六七的债提前到头七。</p>
<table>
<tr><th>期</th><th>承担</th><th>份子</th></tr>
<tr><td>头七</td><td>郝启明</td><td>已收预约金，厅费未结</td></tr>
<tr><td>四七</td><td>亲友</td><td>未到</td></tr>
<tr><td>六七</td><td>郝秀芬</td><td>未交。备注：人在厂</td></tr>
</table>
<p>出嫁女的债在六七。头七不是她的名分。有人要把她未交当理由停今晚的厅，簿上没有这一栏。</p>
<p>此簿能证明房份怎么分。不能证明终期。不能证明魂回。</p>
{pin("v_xiu_unpaid")}
<p><a href="p14-schedule.html">七七日程在同一夹</a></p>
<span class="stamp">内部</span>
</article>''', 13, 1, ["archive-simsun"])))

PAGES.append(("pages/p14-schedule.html", doc(
    "skin-archive-simsun", "七七日程草稿",
    '''<article class="record">
<h1>七七日程（主家填的草稿）</h1>
<div class="meta"><span>夹号：同一夹</span><span>未盖章</span></div>
<p>郝启明用铅笔排过一版：头七初七夜，二七空着，六七问秀芬。铅笔旁边有人用钢笔写「按接运再算」，没署名，像孟昆的弯钩。弯钩和接运条上的编号是同一类。</p>
<p>草稿不是底册。底册在计日那一本。这一页只能说明主家想把头七提前到今晚，以及馆里有人不同意。不同意没有写成正式意见，正式意见要走建议条。</p>
<p>日程空着的格子比写满的多。空着不是神秘，是没排。没排的日子不能拿来当成「已经做过」。</p>
<p>夹子上的橡皮筋老化，一拉就断。断了的筋扔在抽屉角落，角落还有两枚没写完的号码牌。</p>
<span class="stamp">未核</span>
</article>''', 14, 1, ["archive-simsun"])))

PAGES.append(("pages/p15-book.html", doc(
    "skin-service-cyan-desk", "告别厅预约",
    f'''{desk_head(1, "一号厅预约")}
<div class="notice">
<h2>预约单 · 郝</h2>
{still("hall", "空厅", "inline")}
<p>厅：一号。日期：2019-08-19 夜。丧主郝启明。幡面已写「郝公连城 头七」。小字：计日按初一终期。小字是铅笔，铅笔能擦，今晚没人擦。</p>
<p>幡还在库房，库房钥匙在门房。你调的是预约单，不是幡本身。单上的小字能说明他们按哪一天在计。按哪一天在计，不等于哪一天真。</p>
<p>此单能证明今晚厅被订走、幡按初一。不能证明初一是接运日。不能批准你去库房搬幡。搬幡要另开一页，那一页今夜没有。</p>
<p>预约金收据钉在单背面，金额写着「暂收」。暂收不是结清。结清要开厅之后。开不开厅，不由收据决定。</p>
{pin("v_flag_chu1")}
<p>幡按哪一天在计，已经能留下。头七落在哪一夜，要拿接运终期去套底册。</p>
<p><a href="p05-desk.html">回值班台</a></p>
</div>
</div>''', 15, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p16-jiri.html", doc(
    "skin-archive-simsun", "计日底册",
    f'''<article class="record">
<h1>白塔馆计日底册 · 己亥摘抄</h1>
<div class="meta"><span>编号：JR-07</span><span>只读</span></div>
<p>口诀：接运终期为第一日。头七设奠在第七日夜。第六日夜只备厅，不开厅。口述不得写入终期栏。地方号不得写入终期栏。黄历宜忌同样不得写入。</p>
<p>郝连城一条：接运 六月初二。第一日初二，第二日初三，第三日初四，第四日初五，第五日初六，第六日初七，第七日初八。头七夜应在六月初八。这一行是套口诀套出来的，不是主家口述。</p>
<p>今晚是初七，落在第六日。备厅可以。开厅与底册不符。不符就要走建议，不走改条。改条是接运科的权，接运科今夜不开这权。</p>
<p>底册用钢笔。钢笔在「初八」下面点过一个点，点是核对时戳的，不是改期。</p>
<p>此册能证明本馆怎么算。不能证明民间各地都这样算。不能证明魂在哪一夜到门口。</p>
{pin("v_touqi_chu8")}
<p>四条齐了去证实条成组交。不要在这页勾选，勾选在值班台那张单上。</p>
<p><a href="p36-limits.html">底册附注</a></p>
<span class="stamp">内部</span>
</article>''', 16, 1, ["archive-simsun"])))

PAGES.append(("pages/p17-debt.html", doc(
    "skin-classified-yellow", "房份欠条",
    f'''<div class="top"><div class="top-inner">
<b>白塔分类信息</b>
<form class="search" id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input" type="text"><button type="submit">搜本地</button>
</form>
<span class="city">白塔站</span>
</div></div>
<div class="layout">
<h1>寻：六七份子</h1>
<p>郝秀芬名下六七那一期未入账。条子是郝启明让人贴的，电话空号。分类站管理员说这类条子不审，烂了自己撕。</p>
<p>条子把「未交份子」写得很重，像今晚就能拿来挡厅。礼簿不这么分。礼簿把她的债放在六七。</p>
<p>此条能证明有人在催份子。不能证明今晚该停厅。</p>
<p>旁边还贴着转缝纫机、寻鸡。寻鸡那条写了三天，右爪缺一趾。</p>
</div>''', 17, 1, ["classified-yellow"])))

PAGES.append(("pages/p18-civil.html", doc(
    "skin-gov-redbar", "镇办公示",
    f'''<div class="red">
<h1>白塔镇综合治理公示栏</h1>
<p>虚构地方栏 / 不要国徽</p>
</div>
<div class="links">
<a href="#">通知</a><a href="#">名录</a><a href="p23-mail.html">转来的函</a>
</div>
<div class="wrap">
<table cellspacing="0" cellpadding="0"><tr><td class="box">
<h3>补签窗口</h3>
<ol>
<li>郝家庄拆迁补签，2019-08-20 上午截止。<span class="date">08-15 发</span></li>
<li>逾期须重新排队。<span class="date">同日</span></li>
<li>材料自备，窗口不代开回执。<span class="date">08-16</span></li>
</ol>
<p>公示不写谁是丧主。丧主要自己带材料来。材料里有没有头七回执，公示不管。不管不是禁止，是镇里不想替馆里的日子负责。</p>
<p>此栏能证明二十日上午有一个窗口。不能证明头七必须提前到十九日夜。不能证明郝连城同意。</p>
<p>公示栏玻璃有裂。裂是小孩用石子打的，打完跑了。裂了仍能读字。能读不等于被馆里采用。</p>
</td></tr></table>
</div>''', 18, 1, ["gov-redbar"])))

PAGES.append(("pages/p19-board.html", doc(
    "skin-discuz-board", "白塔镇事",
    '''<div class="wp">
<div class="hd">
<a class="logo" href="#">白塔镇事</a>
<span class="y"><a href="#">登录</a></span>
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">搜索</button>
</form>
</div>
<div class="nv"><a href="#">论坛</a><a href="#">导读</a></div>
<table class="forum">
<tr><th></th><th>版块</th><th>主题 / 帖数</th><th>最后发表</th></tr>
<tr><td></td><td><a href="p20-news.html">本地</a><p>路、水、窗口</p></td><td class="num">41 / 900</td><td>今天</td></tr>
</table>
<p>主机在网吧后头。版主半年不上线。别在这儿求证哪一天是头七。求证的人会把听来的日子写成帖，帖比接运条传得快，快的东西最容易进接龙。</p>
<p>置顶过一条井盖丢失。井盖后来找到了，在河沟里。找到的人要赏，赏没人出，帖沉了。</p>
<p>注册要邮箱。邮箱认证早坏了，坏了之后新号注册不了，老号还在说话。说话的人互相认识，认识也不互相担日子。</p>
</div>''', 19, 1, ["discuz-board"])))

PAGES.append(("pages/p20-news.html", doc(
    "skin-news-portal-163", "津西晚报地方版",
    '''<div class="top"><div class="top-inner clearfix">
<span class="logo">津西晚报</span>
<form id="search-form" action="../search-results.html" method="get">
<input id="search-input" name="q"><button type="submit">搜索</button>
</form></div></div>
<div class="nav"><div class="nav-inner clearfix"><a href="#">本地</a></div></div>
<div class="wrap"><div class="main">
<h1>白塔殡仪中心仍代办治丧　镇里未禁止</h1>
<p class="meta">来源：地方记者　2019-08-12 11:02:00</p>
<p>记者路过白塔路，见中心侧门停接运车。馆方称夜班只留台账，不对外加塞。综合治理办公室一名不愿署名的人说，没接到投诉就不进门。不愿署名的那句，编辑删过一次，删完版面空，又加回去。</p>
<p>同版还登了郝家庄秤斗纠纷，当事人只写姓。编辑说名对不上户口本，不敢登。不敢登的名和今夜那户是不是一家，报纸不管。</p>
<p>晚报不能证明今夜那张讣告真假。它只能证明这地方还允许有人在夜里写台账。允许不是表扬，是没人来禁。</p>
<p>报脚印着发行量和广告热线。热线晚上没人接。没人接的热线白天卖过种子和水泥。</p>
<p><a href="../index.html">回中心</a></p>
</div></div>''', 20, 1, ["news-portal-163"])))

PAGES.append(("pages/p21-qzone.html", doc(
    "skin-qzone-modules", "秀芬的空间",
    f'''<div class="topbar"><div class="topbar-inner">
<span class="logo">个人空间</span>
<a href="#">日志</a><a href="#">相册</a>
</div></div>
<div class="wrap" style="padding:16px">
<h2>小芬不改名</h2>
{still("stools", "厂里的凳", "inline")}
<p>十四号晚上厂里加班。舅打电话来，说爸的事。我说我请假，他说不用，你六七再回来。六七是哪天他没说清楚。我说十四号，他说你记错了。我没记错。厂里打卡机还在，卡上有那天的点。</p>
<p>接龙我已读。已读不是同意。同意两个字我不会在群里发。发了就会变成份子。份子我认六七那一期，不认今晚。</p>
<p>鞋还是那双，没有浆，没有泥。我没去纸扎铺，也没去厅。厅里的日子是他们填的。填日子的人要窗口，窗口跟我的班不是一天。</p>
<p>空间背景还是那年拍的河。河跟治丧无关。无关的背景我懒得换。</p>
<p>空间是出嫁女的嘴。嘴能记下十四号晚上的电话，不能替你填终期。终期在接运条上。</p>
<p><a href="p32-letter.html">她给台账的一封</a></p>
</div>''', 21, 1, ["qzone-modules"])))

PAGES.append(("pages/p22-find.html", doc(
    "skin-classified-yellow", "本地分类",
    '''<div class="top"><div class="top-inner">
<b>白塔分类信息</b>
<span class="city">白塔站</span>
</div></div>
<div class="layout">
<h1>今日新帖</h1>
<p>转一手缝纫机，能用。联系巷口烟摊。</p>
<p>寻鸡：芦花，右爪缺一趾。别跟我说成了红烧。</p>
<p>雇人抄日子：要工整，不要美术字。此条三天前贴的，电话空号。</p>
<p>这些条子跟今晚该不该开厅挨不着。贴在这儿是因为这站本来就有这些条子。站长按月收钱，钱不够就把顶栏卖给治痔广告。</p>
<p>雇人抄日子那条，三天里来过两个电话，都是空号回拨。空号不能当主家。主家有姓有厅。</p>
<p>寻鸡那条跟了一句「在河边看见过」。看见过的人没留联系。河边和殡仪中心中间隔着菜市场，菜场夜里关门，门上挂锁。</p>
</div>''', 22, 1, ["classified-yellow"])))

PAGES.append(("pages/p23-mail.html", doc(
    "skin-mail-web-2010", "馆办收件",
    f'''<div class="top"><b>网页邮箱</b><span class="unread-n">未读 <b>1</b></span></div>
<div class="panes">
<div class="folders">
<a class="write" href="#">写邮件</a>
<a class="on" href="#">收件箱</a>
</div>
<div class="mails">
<h4>郝启明 → 白塔馆办</h4>
<p>初一那种写法方便。二十号上午我要去窗口，窗口要丧主。头七回执你们今晚给一份就行。秀芬那边我去说。她要是不来，也别等她。</p>
<p>这封信能证明他赶签字。不能证明初一是接运日。方便两个字写不进底册。写进底册的只有接运时刻套出来的日子。</p>
<p>发件时间 08-18 22:11。馆办白班第二天才看。夜班能看见是因为有人把这封转进了台账夹。转进夹要占一份，占不占看你调不调镇公示。</p>
<p>邮件没有附件。没有附件不等于没有窗口。窗口在镇公示那一栏，栏上写着截止上午。</p>
{pin("v_reloc")}
</div></div>''', 23, 1, ["mail-web-2010"])))

PAGES.append(("pages/p24-baike.html", doc(
    "skin-baidu-baike", "做七",
    '''<div class="top"><div class="top-inner clearfix">
<span class="logo">百科</span>
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">进入词条</button>
</form>
</div></div>
<div class="wrap">
<h1>做七</h1>
<p class="lemma">本词条由网友编辑</p>
<p>丧期按七日分期。有的地方从头七前一晚做起，叫法很多。词条把好听的抄在前头，把馆里的算法抄在后头，后头常年没人点。没人点的段落仍在，在不等于被本馆采用。</p>
<p>有人把「第六夜」写成全国都这样。那是旅游文口气。白塔馆的底册不认这一句。不认的原因写在口诀里：终期从接运起算，不算网上顺口的那种。</p>
<p>词条里没有郝家的名。今夜那一条不要从这里采。参见链点了也是空的，空链是词条没做完，不是暗门。</p>
<p>编辑记录显示去年有人改过「敲六头儿」四个字，改完又改回去。来回改的痕迹不能当郝家的证据。</p>
<p><a href="../index.html">回中心</a></p>
</div>''', 24, 1, ["baidu-baike"])))

PAGES.append(("pages/p25-wap.html", doc(
    "skin-wap-phone-2007", "孟昆手机网",
    '''<div class="phone">
<div class="hd">手机上网</div>
<div class="sub">已发送</div>
<div class="menu">
<p>发件人：孟昆<br>时间：08-14 20:31</p>
<p>B-07 接到了。初二戌时。条我写了。家属说看不清，让他们白天来看正联。我补打印不了，信息科下班了。下班两个字他打过一遍，删了，又打上。</p>
<p>这条停在已发送。没有第二句。没有已读回执。手机网当年不给回执。</p>
<p>活人夜里还能嫌字难看。这条不能证明葬礼该哪天，只能把接运时刻又说一遍。说一遍不是重复废话，是正联之外的嘴。</p>
<p>WAP 页底下还有列车时刻和天气。天气写多云。多云跟冰柜无关。</p>
<p><a href="p11-ice.html">回接运条</a></p>
</div></div>''', 25, 1, ["wap-phone-2007"])))

PAGES.append(("pages/p26-rule.html", doc(
    "skin-archive-simsun", "计日口诀",
    '''<article class="record">
<h1>守七岗口诀（张贴件）</h1>
<div class="meta"><span>钉在值班台侧</span><span>复印发黄</span></div>
<p>接运终期为第一日。头七设奠在第七日夜。第六日夜只备厅，不开厅。口诀是给顶班的人念的。念熟了仍要拿条来套，套完才是某一户的夜。</p>
<p>口述不能写入终期栏。地方号不能写入终期栏。黄历宜忌不能写入终期栏。接龙里的「方便」同样不能写入。</p>
<p>口诀不写某户的日子。某户的日子要拿接运条来套。套完的那一页在底册，底册不常年摊在桌上。摊出来要占本班份数。</p>
<p>此件能证明本岗怎么教人算。不能单独指出郝家头七在哪一夜。指出那一夜的是底册里套出来的一行。</p>
<p>张贴件的图钉生锈。锈蹭在墙上，墙上有一圈印。印比这张纸旧。</p>
<span class="stamp">张贴</span>
</article>''', 26, 1, ["archive-simsun"])))

PAGES.append(("pages/p27-reprint.html", doc(
    "skin-corp-table-2005", "接运条复写联",
    '''<table class="site" cellspacing="0" cellpadding="0">
<tr><td colspan="2" class="banner">接运科复写</td></tr>
<tr><td class="main">
<p>复写联字更淡。初二、20:12、B-07 仍在。淡不是改过，是复写纸用到第三张。第三张下面还有齿孔，齿孔齐，没有撕过重写的痕迹。</p>
<p>家属说看不清的就是这一张。看不清不能拿去改成初一。改终期要接运科重开条。重开条今夜没有。今夜只有台账建议。</p>
<p>此联和正联互相限制：两联都是初二。地方号那张初一，对不上这两联。对不上就要留下冲突，不要帮人圆。</p>
<p>复写纸的蓝印沾在手指上。沾上的蓝印洗得掉。洗得掉的印不能当改过的证据。</p>
<p><a href="p11-ice.html">回正联</a></p>
</td></tr></table>''', 27, 1, ["corp-table-2005"])))

PAGES.append(("pages/p28-handover.html", doc(
    "skin-service-cyan-desk", "交班",
    f'''{desk_head(1, "交班记录")}
<div class="notice">
<h2>还柜了</h2>
<p>本班调过的原件已还。桌上的纸空了。交班本上钉过的还在。还柜的声音是铁皮磕铁皮，门房听过，不进来问。</p>
{still("meeting", "空会议室", "inline")}
<p>下一班的门在原件柜里，跟这一班不一定相同。没有钉过的主张，柜门上抽不出来。抽不出来不是坏了，是还回去了。</p>
<p>交接格子里要填工号。工号填了不等于条交了。条在另一页。另一页不成组，格子只是格子。</p>
<p>钟还没到子时。子时之前仍可以再调三份。三份用完再还，还完再算下一班。</p>
<p><a href="p06-doors.html">看下一班的门</a>　<a href="p30-form.html">去写条</a></p>
</div>
</div>''', 28, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p29-phone.html", doc(
    "skin-gov-redbar", "值班电话",
    '''<div class="red"><h1>镇值班电话</h1><p>夜间只记来电</p></div>
{still("tea", "值班室茶台", "inline")}
<div class="wrap">
<p>08-19 19:06 男声，问头七回执今晚能不能出。值班说问殡仪中心。没留姓。口音像镇里，不像郝家庄。</p>
<p>08-19 19:22 女声，问份子是不是今晚交。值班说不知道。女声把电话挂了。挂得很快，像怕被问姓名。</p>
<p>电话本不能当终期。不能当开厅依据。记在这儿是因为这页本来就记这些。记下的来电第二天交给综治，综治很少回。</p>
<p>值班室的热水瓶是铁的，塞子上有牙印。牙印不是狗，是有人用牙咬开过塞子。塞子现在仍紧。</p>
</div>''', 29, 1, ["gov-redbar"])))

PAGES.append(("pages/p30-form.html", doc(
    "skin-service-cyan-desk", "今晚证实条",
    f'''{desk_head(1, "今晚证实条")}
<div class="notice">
<h2>成组交</h2>
<p>只出现你钉过的。勾上再交。不对的组合不标哪一条。你不批准开厅，只建议。建议两个字印在纸眉上，印色发灰。</p>
<p>空条不收。看见过但没钉的，不会出现在这张纸上。交班还柜之后更不会出现。</p>
<div id="claim-form"></div>
</div>
</div>''', 30, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p31-almanac.html", doc(
    "skin-blog-personal-2008", "黄历宜忌摘抄",
    '''<div class="top"><h1>晚窗摘抄</h1><p>路过的日子</p></div>
<div class="nav"><a href="#">日志</a></div>
<div class="wrap">
<h2>六月初七宜祭祀</h2>
<p>博客作者自称看过杭俗。文里把第六夜写成头七正日，写得很顺。顺的句子好抄进接龙。抄进接龙仍是口述，口述写不进终期栏。</p>
<p>文末有一句：各地算法不同，仅供参考。参考两个字很小。很小的字常常被人略过，略过之后只记得宜祭祀。</p>
<p>此页能证明网上有人这么算。不能写入白塔馆终期栏。把宜祭祀当成开厅许可，是读错栏。读错栏会占掉本班一份原件，占掉就少看真正的条。</p>
<p>作者去年还写过寒食和列车时刻，点击差不多。列车时刻那篇下面有人问票，作者没回。</p>
<p>侧栏广告是治痔和种子。广告跟六月初七没有关系。没有关系的东西摆在这儿，是因为博客皮肤自带。</p>
</div>''', 31, 1, ["blog-personal-2008"])))

PAGES.append(("pages/p32-letter.html", doc(
    "skin-mail-web-2010", "秀芬来信",
    '''<div class="top"><b>网页邮箱</b></div>
<div class="panes">
<div class="folders"><a class="on" href="#">收件箱</a></div>
<div class="mails">
<h4>郝秀芬 → 守七台账</h4>
<p>我是郝秀芬。十四号晚上的事我在厂里知道的。接运那天不是初一。初一我还跟他说过菜钱。菜钱他嫌贵。嫌贵的那句话还在，在不等于能当终期。</p>
<p>份子我六七交。今晚不要把我写成挡厅的人。我挡的是日子，不是厅费。厅费是启明订的，订了就让他按馆里的算法走。</p>
<p>这封信能证明她主张接运不是初一。不能单独定头七在哪一夜。她人在厂里，没看见冰柜号。没看见的人只能作证电话，不能作证柜门。</p>
<p>发信用的是厂里夜班电脑。电脑桌面还开着产量表。产量表跟治丧无关，她没关。</p>
<p><a href="p21-qzone.html">回空间</a></p>
</div></div>''', 32, 1, ["mail-web-2010"])))

PAGES.append(("pages/p33-stop.html", doc(
    "skin-archive-simsun", "回执 · 停厅",
    '''<article class="record">
<h1>守七建议回执</h1>
<div class="meta"><span>SQ-19</span><span>停开厅</span></div>
<p>证实条四栏对得上：接运终期六月初二，今晚六月初七，幡按初一计，头七应在初八夜。建议一号厅今夜只备，不设奠。备厅的灯可以开，幡可以不挂。</p>
<p>档期改到初八夜。郝启明的窗口是他自己的事。回执不替他去镇里。镇里的截止上午，馆里的计日不让路。</p>
<p>你没有批准移动遗体。你没有替家属签字。工号写在建议栏，不写在开厅栏。不写在开厅栏的工号，第二天较少被追问。</p>
<p>魂回不回，这些纸仍不说。不说也好。说了就会圆。圆了就不是今晚该交的那一条了。</p>
<p>孟昆白天会看到这份建议。他不签字。他只看终期还是不是初二。还是，他就把条放回去。</p>
<span class="stamp">建议</span>
</article>''', 33, 1, ["archive-simsun"])))

PAGES.append(("pages/p34-open.html", doc(
    "skin-archive-simsun", "回执 · 开厅",
    '''<article class="record">
<h1>守七建议回执</h1>
<div class="meta"><span>SQ-19</span><span>按主家</span></div>
<p>条按主家走了。一号厅今夜设奠。幡面那行小字没有人改。接运条还在夹里，夹没有被打开到足以挡住开厅。挡住要成组的条。不成组的看见过，还柜以后当没看见。</p>
<p>工号写在开厅回执上。初八上午的窗口，馆里不管。礼簿上的六七仍空着。空着的份子不会因为今晚开过厅就自动填上。</p>
<p>你没有看见魂。你看见的是一份被采用的建议。采用之后，纸还是那些纸，对不上的地方还对不上。对不上的地方会有人来问，问到工号为止。</p>
<p>门房会把一号厅的灯打开。灯开了像平常办过的那些夜。平常办过的夜，不一定日子对。</p>
<span class="stamp">已建议开厅</span>
</article>''', 34, 1, ["archive-simsun"])))

PAGES.append(("pages/p35-late.html", doc(
    "skin-archive-simsun", "回执 · 未交",
    '''<article class="record">
<h1>守七缺省回执</h1>
<div class="meta"><span>SQ-19</span><span>子时</span></div>
<p>三班走完，证实条没有成组交上来。系统按主家开厅。这不是另写的一条路，是空条的默认。默认跟点过「按主家」同一栏，不另开名字。</p>
<p>已证实的还在本子上，没人撕。没人撕不等于用过。用过要交。交了才会进建议栏。没交的条，子时之后只当草稿纸。</p>
<p>工号仍在开厅那一栏。缺省也算写过。写过的人第二天仍要面对门房问灯为什么开。</p>
<p>钟已经过了。过了的钟不能倒拨。倒拨不是本岗的权。</p>
<span class="stamp">缺省</span>
</article>''', 35, 1, ["archive-simsun"])))

PAGES.append(("pages/p36-limits.html", doc(
    "skin-archive-simsun", "底册附注",
    '''<article class="record">
<h1>计日底册附注</h1>
<div class="meta"><span>JR-07 背页</span><span>限</span></div>
<p>底册能证明本馆把接运终期算作第一日。不能证明亡者是否同意提前。不能证明魂在哪一夜到门口。不能证明拆迁窗口的合法性。不能证明郝秀芬欠的份子跟今晚有关。</p>
<p>空白不要替郝连城补遗言。空白不要写成无罪，也不要写成有罪。写「这些来源不能确定」即可。不能确定不是放过，是不许发明。</p>
<p>旅游文、接龙、黄历，与底册冲突时，冲突本身留下。不要把冲突圆成一句好话。好话会进回执，回执会带工号。</p>
<p>附注用的纸比底册薄。薄纸容易皱。皱了仍要按这一页读，不能改口。</p>
<span class="stamp">限</span>
</article>''', 36, 1, ["archive-simsun"])))


def main():
    for path, html in PAGES:
        fp = ROOT / path
        fp.parent.mkdir(parents=True, exist_ok=True)
        fp.write_text(html, encoding="utf-8")
        print("wrote", path)

if __name__ == "__main__":
    main()
