# -*- coding: utf-8 -*-
"""Emit unique static pages. Bodies are handwritten per page."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent


def w(rel, text):
    p = ROOT / rel
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(text, encoding="utf-8")
    print(rel)


def doc(title, klass, css, js, body, mark=""):
    extra = f'<script>BW.mark("{mark}");</script>' if mark else ""
    links = "".join(f'<link rel="stylesheet" href="{c}">' for c in css)
    return f"""<!DOCTYPE html>
<html lang="zh-CN" class="{klass}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
{links}
<script src="{js}"></script>
</head>
<body>
{body}
{extra}
</body>
</html>
"""


def hot(href, style, quiet=True, title=""):
    q = " quiet" if quiet else ""
    t = f' title="{title}"' if title else ""
    return f'<a class="hot{q}" href="{href}" style="{style}"{t}></a>'


def shot(src, alt, hots, cap=""):
    inner = "".join(hots)
    c = f'<p class="cap noin">{cap}</p>' if cap else ""
    return f'<div class="shot"><img src="{src}" alt="{alt}">{inner}</div>{c}'


# ---------- introduction ----------
intro_shot = shot(
    "img/smear-now.jpg",
    "碑阳近照",
    [hot("rub/y1986.html", "left:31%;top:44%;width:36%;height:16%", False, "名旁浅磨")],
    "名旁那道浅磨画了虚线。点它会打开另一份也带着这道磨的纸。",
)
w(
    "introduction.html",
    doc(
        "夜班条　翁苔",
        "skin-intro-manual",
        ["css/intro-manual.css", "css/local.css"],
        "js/beiwen.js",
        f"""
<header class="intro-hero">
<div class="image-area"><img alt="" src="img/desk-lamp.jpg"></div>
<h1>石浦所夜班条</h1>
</header>
<main>
<section>
<h2>人</h2>
<p>翁苔。文物所碑拓数字化，夜班。工号落在查阅备注上。</p>
<p>白班路值把单子钉在木条：匣号石浦-志-117，碑号石浦-碑-117。明早九点她要投影一句——碑阳现在看得见的那个名，跟匣里志石写的是不是同一个。她不管民俗课。她只要一句能投的话。</p>
{intro_shot}
<p>灯下这张是今晚第一张扫描。红料嵌在新刀口里。浅磨发白。台内旧说明写过：图上若有一块在另一份材料里也出现，点那块就能跳过去。第一块已经给你画出来了。</p>
</section>
<section>
<h2>今晚要交</h2>
<p>查阅备注。只收建议。不收批准改名，不收批准动刀。邻县有通碑螭首长得像，旧备注写过同形不能并。</p>
<p class="boot-actions">
<a class="enter-link" href="desk/home.html">进台面</a>
<a class="ghost" href="rub/y1986.html">先点那道浅磨</a>
</p>
</section>
<section>
<h2>卡了就回台</h2>
<p>说明书不跟着进站。台里有作法页。全站人名县名都是编的，别拿去对现实的坟。</p>
</section>
</main>
""",
        "intro",
    ),
)


def desk(title, strong, notice, extra="", tabs=None, mark="desk"):
    if tabs is None:
        tabs = [
            ("home.html", "台面"),
            ("task.html", "查阅单"),
            ("queue.html", "队列"),
            ("shift.html", "交接"),
            ("howto.html", "作法"),
            ("submit.html", "交单"),
        ]
    tab = "".join(f'<a href="{h}">{n}</a>' for h, n in tabs)
    return doc(
        title,
        "skin-service-cyan-desk",
        ["../css/service-cyan-desk.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<div id="wrap">
<header>
<strong>{strong}</strong>
<div>
<form id="search-form" action="find.html" method="get">
<input id="search-input" name="q" placeholder="姓名抽不了页">
<button type="submit">查找</button>
</form>
</div>
</header>
<div class="notice">
{notice}
</div>
<div class="tabs">{tab}</div>
{extra}
</div>
""",
        mark,
    )


desk_home_shot = shot(
    "../img/smear-now.jpg",
    "今晚扫描",
    [hot("../rub/y1986.html", "left:31%;top:44%;width:36%;height:16%", False, "名旁浅磨")],
    "虚线还在。点了会跳到一九八六年那张旧拓。",
)
w(
    "desk/home.html",
    desk(
        "数字化台面",
        "碑拓夜台",
        f"""
<h2>台面还摊着</h2>
<p>灯管嗡一声。翁苔把杯子放到键盘左边。查阅单的钉子松了，纸角翘起来。匣号她已经抄进自己的便签：117。别的匣今晚不许交。</p>
{desk_home_shot}
<p>碑阳近照看去像已经齐了。字位上是闻山。房头白天打电话来，说谱上早改过，投影别再念旧的。路值回了一句九点见，就把电话挂了。</p>
<p>台内作法页写过物件怎么跳。队列里还有邻县那通游氏，螭首像，今晚不要并进来。</p>
""",
        extra='<p style="width:80%;margin:12px auto;color:#666">页脚：夜台灯还开着。</p>',
        mark="desk",
    ),
)

w(
    "desk/task.html",
    desk(
        "查阅单　117",
        "查阅钉条",
        """
<h2>路值钉的那张</h2>
<p>纸是再生纸，左边打过孔。标题印「所内查阅单」，年份印二〇二六，填空用圆珠笔。路值的字向前倒。</p>
<p>事项一：核对石浦-碑-117 碑阳现见名。事项二：核对石浦-志-117 匣内著录名。事项三：两行是不是同一个。备注栏只许建议，不许代所里发文。</p>
<p>她下午又补了一句：纪家房头要闻山。你对完再写。投诉过一回投旧名，会议室玻璃上还留着胶痕。</p>
<p>翁苔把事项三读了两遍。她改口在便签上：不是问人是不是同一个人，是问现在墙上的字跟匣里的字齐不齐。</p>
<p>九点是投影。交晚了这张纸仍会进会议室，空白也算她的工号。</p>
""",
        extra="""
<table>
<thead><tr><th>栏</th><th>路值写的</th></tr></thead>
<tbody>
<tr><td>碑号</td><td>石浦-碑-117</td></tr>
<tr><td>匣号</td><td>石浦-志-117</td></tr>
<tr><td>要的一句</td><td>现名与匣名是否同一</td></tr>
<tr><td>权限</td><td>建议</td></tr>
</tbody>
</table>
<p style="width:80%;margin:12px auto;color:#666">钉条纸角还翘着。</p>
""",
        mark="task",
    ),
)

w(
    "desk/queue.html",
    desk(
        "数字化队列",
        "夜班队列",
        """
<h2>今晚不交的那些</h2>
<p>队列是旧表格，有人把「优先」写成红字，又用修正带贴掉。117 排在第三行，被路值用荧光笔描过框。</p>
<p>第一行石浦-碑-084，西乡残幢，缺首，白班说等配光。第二行石浦-碑-102，字口干净，没人投诉。第四行浦阴-碑-031，游氏，螭首同形，旧备注写过不要并进 117。</p>
<p>翁苔用铅笔在 031 旁边点了一下。她不是要今晚做游氏。她怕自己点螭首的时候跳过去，回来忘了 117 才是要交的匣。</p>
<p>第五行以后她没往下看。灯管把表格晒得发青。</p>
""",
        extra="""
<table>
<thead><tr><th>号</th><th>备注</th></tr></thead>
<tbody>
<tr><td>084</td><td>缺首，等配光</td></tr>
<tr><td>102</td><td>字口干净</td></tr>
<tr><td>117</td><td>今夜必交</td></tr>
<tr><td>031</td><td>浦阴游氏，勿并</td></tr>
</tbody>
</table>
<p style="width:80%;margin:12px auto;color:#666">荧光笔框还在第三行。</p>
""",
        mark="queue",
    ),
)

w(
    "desk/shift.html",
    desk(
        "交接三条",
        "路值字条",
        """
<h2>下午丢下的三句</h2>
<p>路值不爱写长的。第一张便签：九点投影，117，一句就够。第二张：房头电话我已回，你别再接。第三张：邻县那通螭首别并进来，去年有人把两张脸叠在幻灯上，所里挨过骂。</p>
<p>翁苔把第三张读完，才明白队列里 031 为什么用铅笔点过。她自己又加了一句在背面：批准栏是摆设，勾了系统会退。</p>
<p>抽屉里还有贺纸庭那张旧拓的库内编号。页边有墨。路值没写他的名字，只写「丙寅那包」。翁苔认识那包，牛皮纸边已经毛了。</p>
<p>杯子里的茶凉了。她没续。夜班续茶容易把水洒到扫描件上。</p>
""",
        extra='<p style="width:80%;margin:12px auto;color:#666">三张便签叠在抽屉沿。</p>',
        mark="shift",
    ),
)

w(
    "desk/howto.html",
    desk(
        "台内作法",
        "跳页说明",
        """
<h2>图上那几块</h2>
<p>所里旧电脑还留着一份二〇一九年的内部说明。写的人已经走了。句子很土：扫描件上的物件，若在另一份入库材料里也能看见，点那块就打开那一份。不要按姓名去抽页。姓名栏是给白班打印标签用的，抽出来是空的。</p>
<p>常见能点的有：名旁浅磨、刀口红料、螭首残缺、拓纸页边墨迹、匣签编号。装饰花边点了没反应。邻县同形螭首会打开浦阴那包，打开以后要记得回来，那包不能并进今晚的单。</p>
<p>翁苔第一回夜班把花边点了半天。后来她只点发白的那道。浅磨在三份纸上都在，走向像同一条砂轮停住的印。</p>
<p>作法页不替你勾备注。勾错了回单会把冲突字段顶回来。</p>
""",
        extra='<p style="width:80%;margin:12px auto;color:#666">旧说明打印件缺了页脚。</p>',
        mark="howto",
    ),
)

w(
    "desk/find.html",
    desk(
        "查找空页",
        "姓名栏空",
        """
<h2>抽不出来</h2>
<p>你若从顶栏把名字填进去，台面只会回到这里。库不是按人名做的。人名写在纸上，纸靠图上那几块连着。</p>
<p>翁苔第一周也填过。填纪闻山，空。填纪渡生，空。填贺纸庭，还是空。路值说过：标签打印机认姓名，跳页认物件。两套东西不要焊。</p>
<p>要看 117，回台面点那道浅磨。要看匣，去拓库找匣签。要看邻县，点螭首残，记得回来。</p>
""",
        extra='<p style="width:80%;margin:12px auto;color:#666">顶栏那格是摆设。</p>',
        mark="find",
    ),
)

w(
    "desk/submit.html",
    desk(
        "查阅备注",
        "交单栏",
        """
<h2>三行里勾一行</h2>
<p>备注一次交。勾完才判。本台没有批准章，批准那一行是给人看的，勾了会退。</p>
<p>翁苔把笔帽咬过一次，又放下。她若只听房头，会勾已更名。她若想把事一次做绝，会去碰批准。路值要的是能投的建议，不是她替所里下刀。</p>
<form id="note-form" onsubmit="return false;">
<label class="choice"><input type="radio" name="c" value="recarve"> 碑阳后人改刻。志石本名不同。建议挂改刻，不作更名依据。</label>
<label class="choice"><input type="radio" name="c" value="same"> 同一人已更名。碑阳现名可当匣里的名来投。</label>
<label class="choice"><input type="radio" name="c" value="approve"> 批准按闻山改名，或批准把旧字磨掉。</label>
<p><button type="button" id="go">交查阅备注</button></p>
<p class="warn" id="err"></p>
</form>
""",
        extra="""
<script>
document.getElementById("go").onclick = function () {
  var n = document.querySelector("input[name=c]:checked");
  var err = document.getElementById("err");
  if (!n) { err.textContent = "三行还空着。空单路值也会投，工号仍是你的。"; return; }
  BW.submit(n.value);
};
</script>
<p style="width:80%;margin:12px auto;color:#666">交单栏一次只收一行。</p>
""",
        mark="submit",
    ),
)


def result_page(fname, title, strong, h2, paras, mark, why_js):
    body_p = "".join(f"<p>{p}</p>" for p in paras)
    extra = f"""
<p id="why" class="noin"></p>
<p><a href="submit.html">作废重开</a>　<a href="home.html">回台面</a></p>
<script>
{why_js}
</script>
<p style="width:80%;margin:12px auto;color:#666">回单已落工号。</p>
"""
    w(
        fname,
        desk(
            title,
            strong,
            f"<h2>{h2}</h2>{body_p}",
            extra=extra,
            mark=mark,
        ),
    )


result_page(
    "desk/result-recarve.html",
    "备注已收　改刻",
    "回单改刻",
    "路值能加批注",
    [
        "系统把这行收成建议。不发文，不动刀。会议室投影若采用，底下要加「碑面与埋文不一致」。路值嫌烦，可她更怕把匣里那一行说成墙上那两个字。",
        "纪柏舟看到改刻两个字会再打电话。电话仍由白班回。翁苔的夜班到点可以关灯。",
    ],
    "end-recarve",
    """
var s = (BW.all().seen || {});
var el = document.getElementById("why");
if (s.zhi && s.smear1986) el.textContent = "你点过旧拓那道浅磨，也打开过匣里那一行。备注按改刻挂。";
else if (s.smear1986) el.textContent = "旧拓上的字还停在渡生。匣你要是还没开，白班会自己补看著录。这张已经按改刻收了。";
else el.textContent = "你按改刻交了。台面把这句留给路值加批注。";
""",
)

result_page(
    "desk/result-same.html",
    "备注已收　已更名",
    "回单更名",
    "闻山会被投出去",
    [
        "你勾的是同一人已更名。路值明早会把闻山投到墙上。匣里那一行若有人追问，她会说夜班按房头口径收的。",
        "旧拓上的渡生、匣里的阿渡，都不进这句。房头会安静一上午。所里若有人翻丙寅那包，会来问工号。",
    ],
    "end-same",
    """
var s = (BW.all().seen || {});
var el = document.getElementById("why");
if (s.family) el.textContent = "房头那段话被你收成结论了。";
else el.textContent = "你停在现碑那两个字上。";
""",
)

result_page(
    "desk/result-approve.html",
    "备注退回　越权",
    "回单退回",
    "这枚章不存在",
    [
        "批准改名、批准动刀，本台都不收。回单作废。原扫描还在。原匣还在。你的工号会记一笔越权，不记一笔办成。",
        "路值看过这种退回。她只回一句：建议栏在上面。翁苔把茶倒掉，重新打开三行。",
    ],
    "end-approve",
    """
document.getElementById("why").textContent = "批准那一行是给人看的，勾了就退。";
""",
)


# ---------- archive rub / zhi ----------
def arch(title, h1, meta_l, meta_r, inner, mark, ft):
    return doc(
        title,
        "skin-archive-simsun",
        ["../css/archive-simsun.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<article class="record">
<h1>{h1}</h1>
<div class="meta"><span>{meta_l}</span><span>{meta_r}</span></div>
{inner}
<p><span class="stamp">库内</span></p>
<p class="cap noin">{ft}</p>
<p class="noin"><a href="../desk/home.html">回台面</a></p>
</article>
""",
        mark,
    )


w(
    "rub/now.html",
    arch(
        "现扫描　117",
        "石浦-碑-117　现见扫描",
        "入库　今夜",
        "拍摄　所内灯下",
        shot(
            "../img/smear-now.jpg",
            "现见碑阳",
            [
                hot("y1986.html", "left:31%;top:44%;width:36%;height:16%", True, "浅磨"),
                hot("red.html", "left:40%;top:48%;width:18%;height:8%", True, "描红"),
                hot("chi.html", "left:36%;top:8%;width:28%;height:16%", True, "螭首"),
                hot("box.html", "left:8%;top:78%;width:16%;height:12%", True, "匣沿"),
            ],
            "现见字位作闻山。名旁浅磨、刀口红料、螭首左角、匣沿编号都在图上。",
        )
        + """
<p>著录人未写刀口年代。只写现见。红料新，嵌在「山」字刀口。浅磨发白，走向自右上向左下，中段有一处停轮。螭首左角缺，断面旧，不像这一年新打。</p>
<p>房头口径要投闻山。本页只能证明墙上现在这两个字，不能证明匣里写过什么，也不能证明浅磨是谁的砂轮。</p>
""",
        "now",
        "现扫页不解释更名。",
    ),
)

w(
    "rub/y1986.html",
    arch(
        "丙寅拓　117",
        "石浦-碑-117　丙寅谷雨拓",
        "拓手　贺纸庭",
        "纸包　丙寅那包",
        shot(
            "../img/smear-1986.jpg",
            "一九八六拓",
            [
                hot("smear.html", "left:30%;top:46%;width:38%;height:14%", False, "浅磨"),
                hot("sign.html", "left:2%;top:78%;width:16%;height:16%", True, "页边墨"),
            ],
            "字位仍作渡生。浅磨已经在。页边墨团是贺纸庭的习惯，不是检索栏。",
        )
        + """
<p>墨未干时纸潮。贺纸庭把浅磨也拓下来，未补字，未刮墨。螭首左角在这张上已经缺。名旁砂轮印浅，渡生两字笔画仍连。</p>
<p>与今夜扫描对看：浅磨走向同一条。今夜字位换成闻山，红料填在新口。本张能证明一九八六年墙上还是渡生，不能证明谁在后来下的刀，也不能证明匣内讳。</p>
""",
        "smear1986",
        "旧拓页边有墨。",
    ),
)

w(
    "rub/smear.html",
    arch(
        "浅磨特写",
        "浅磨对照　第三份",
        "来源　现扫裁切",
        "对照　丙寅拓",
        shot(
            "../img/smear-close.jpg",
            "浅磨特写",
            [hot("../shop/receipt.html", "left:20%;top:30%;width:60%;height:40%", True, "同道抹痕")],
            "这道磨在回单附图里又出现过。点开能到赤土那张工单。",
        )
        + """
<p>特写把停轮那一截放大。纤维被齐着切断，不像风雨。丙寅拓同一位置发白，宽度接近。二〇一一年回单把这道磨拍进附件，石满怕房头说没描到。</p>
<p>三份纸只证明浅磨是一道。不证明户籍改过。不证明所里应当把闻山当成匣名。</p>
""",
        "smear3",
        "特写第三份，仍是那道磨。",
    ),
)

w(
    "rub/red.html",
    arch(
        "描红刀口",
        "刀口红料",
        "现见",
        "清明后仍在",
        shot(
            "../img/red-trace.jpg",
            "描红",
            [hot("../shop/receipt.html", "left:18%;top:28%;width:64%;height:36%", True, "回单描红")],
            "红料只填新口。旧残画在底下发灰。",
        )
        + """
<p>朱砂或广告红，库内未做成分。红线贴着新刻的竖画走，不进浅磨最深的那条沟。沟里是空的，像砂轮走过以后没人填。</p>
<p>描红是把现成的字描一遍给人看。改刻是把旧字磨浅再刻。两件事叠在同一张脸上。本页只拍红，不教怎么下刀。</p>
""",
        "red",
        "红料页不写工价。",
    ),
)

w(
    "rub/chi.html",
    arch(
        "本碑螭首",
        "螭首左角残",
        "石浦-碑-117",
        "断面旧",
        shot(
            "../img/chi-local.jpg",
            "本碑螭首",
            [hot("../nei/chi.html", "left:22%;top:16%;width:56%;height:52%", True, "同形")],
            "同形会跳到浦阴那通。跳过去以后要记得匣号不是这一匣。",
        )
        + """
<p>左角缺，茬口发黑，苔痕嵌进层理。贺纸庭那张上已经缺。不是今夜磕的。所里有人爱把两通螭首叠着看，说同一路刀法。刀法同，碑不是一通。</p>
<p>本页只能证明 117 的首残在左。浦阴那通残在另一侧。抹痕对不上。匣号对不上。</p>
""",
        "chi",
        "本碑螭首左缺。",
    ),
)

w(
    "rub/sign.html",
    arch(
        "页边墨迹",
        "拓纸页边",
        "贺纸庭习惯",
        "无馆藏章",
        shot(
            "../img/margin-ink.jpg",
            "页边墨",
            [hot("../he/1986.html", "left:6%;top:64%;width:20%;height:22%", True, "墨团")],
            "墨团连到他后来写的那篇谷雨。点墨不点姓名栏。",
        )
        + """
<p>贺纸庭爱在纸边按一个团，再拉一笔。不是馆藏印。不是姓名检索。库内目录把他的习惯写成「页边墨」，免得有人拿去当印章鉴定。</p>
<p>本页证明丙寅那包是他经手。不证明他同意后人改字。他自己写过：刀口他没敢动。</p>
""",
        "sign",
        "页边墨不是馆印。",
    ),
)

w(
    "rub/yin.html",
    arch(
        "碑阴扫描",
        "石浦-碑-117　碑阴",
        "无讳",
        "只有花纹",
        """
<p>碑阴没有名字。浅龛，几道卷草，一只残龟跌的背。翁苔第一回夜班总想在阴面找出第四个名，找完只看见风化石皮。</p>
<p>立碑人题记若有过，风化掉了。库内不补。不补的意思是：不要用想象把阴面写成闻山或阿渡。</p>
<p>本页的用处只有一句：今晚要对的名不在阴面。名在阳，底在匣。</p>
""",
        "yin",
        "碑阴空，不补字。",
    ),
)

w(
    "rub/box.html",
    arch(
        "匣沿编号",
        "石浦-志-117　匣沿",
        "迁葬清点",
        "二〇一八",
        shot(
            "../img/zhi-stone.jpg",
            "匣内石花",
            [hot("../zhi/scan.html", "left:20%;top:18%;width:60%;height:64%", True, "志石")],
            "匣沿编号与志石是一匣。点石花进著录扫描。",
        )
        + """
<p>牛皮纸匣，油笔写 117，写过一次又描深。迁葬那年开匣，著录抄讳，又封回去。封条是所里的，不是纪家的。</p>
<p>匣沿不能证明坟里此刻仍是原石。只能证明所里清点时这一匣对应这一通碑。志石扫描在下一页。</p>
""",
        "box",
        "匣沿油笔描过两次。",
    ),
)

w(
    "rub/catalog.html",
    arch(
        "库内目录　117 包",
        "117 包目录",
        "夜班只开这一包",
        "邻包另架",
        """
<p>目录是打字机时代留下来的表，有人用圆珠笔在行间加注。117 包内：现扫一、丙寅拓一、浅磨特写一、描红裁切一、螭首一、页边墨一、碑阴一、匣沿一、志石扫描一、著录一。</p>
<p>浦阴 031 包在邻架。目录用红笔写「螭首同形，勿与 117 并映」。翁苔把这句话抄进自己便签的背面，字比路值小。</p>
<table>
<tr><th>件</th><th>库内一句</th></tr>
<tr><td>现扫</td><td>现见闻山</td></tr>
<tr><td>丙寅拓</td><td>字位渡生</td></tr>
<tr><td>志石</td><td>讳阿渡</td></tr>
<tr><td>回单复印件</td><td>工种描红，见石作</td></tr>
</table>
<p>目录不是结论。结论写在查阅备注里。</p>
""",
        "catalog",
        "目录表有圆珠笔加注。",
    ),
)

w(
    "zhi/scan.html",
    arch(
        "志石扫描",
        "石浦-志-117　志石",
        "迁葬开匣",
        "只扫一次",
        shot(
            "../img/zhi-stone.jpg",
            "志石",
            [hot("record.html", "left:18%;top:12%;width:64%;height:72%", True, "著录")],
            "石花底下那一行在著录页。图上不进字，免得有人拿像素当检索。",
        )
        + """
<p>志石比碑阳小，四边崩。埋久了，钙华结在右下。扫描灯不敢开太白，怕反光把细画吃掉。讳在上栏，著录抄作阿渡。不书渡生。不书闻山。</p>
<p>埋文才是名分底。面上的字改过两回，匣里这一行没改。本页不能证明坟里此刻仍躺着原石——迁葬开过。它能证明所里抄下来的讳是阿渡。</p>
""",
        "zhi",
        "志石灯不敢开太白。",
    ),
)

w(
    "zhi/record.html",
    arch(
        "志石著录",
        "匣内著录抄件",
        "抄写　二〇一八",
        "复核空着",
        """
<p>抄件用宋体打印，首行缩进。讳：阿渡。姓纪。卒年按旧历写，公历对照空着，抄写的人不敢换算。配偶栏残。子嗣栏只余半个「柏」字，后面断了，不敢补成柏舟。</p>
<p>附注：碑阳现见与匣内讳不一致，待夜班出建议。这句是后来用铅笔加的，像路值的倒笔。她加了附注，仍把结论留给翁苔。</p>
<p>抄件能证明开匣时有人把阿渡写下来。不能证明纪柏舟谱上那一笔有没有法律效力。谱不在本匣。</p>
<table>
<tr><th>项</th><th>抄件</th></tr>
<tr><td>讳</td><td>阿渡</td></tr>
<tr><td>碑阳现见</td><td>闻山（另页）</td></tr>
<tr><td>丙寅拓字位</td><td>渡生（另页）</td></tr>
<tr><td>权限</td><td>抄件不作发文</td></tr>
</table>
""",
        "zhi-rec",
        "著录铅笔附注是后加的。",
    ),
)


# ---------- gov ----------
def gov(title, h1, sub, inner, mark, ft):
    return doc(
        title,
        "skin-gov-redbar",
        ["../css/gov-redbar.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<div class="red"><h1>{h1}</h1><p>{sub}</p></div>
<div class="links">
<a href="index.html">所站</a>
<a href="night.html">夜班</a>
<a href="form.html">样张</a>
<a href="nomerge.html">同形</a>
<a href="../desk/home.html">回台</a>
</div>
<div class="wrap">
<div class="article">
{inner}
</div>
<p class="ft">{ft}</p>
</div>
""",
        mark,
    )


w(
    "gov/index.html",
    gov(
        "石浦所信息站",
        "石浦县文物所",
        "虚构站点　不要对现实机关",
        """
<h2>公开能看的</h2>
<p>所站只挂须知和样张。拓片原件不在这扇门后面。要看 117，走夜班台面。要看匣，走库内目录。</p>
<p>近年投诉多的是投影把旧名投出去，家属说丢脸；也有反过来的，说所里把改过的面当成了底。须知里写：碑是面，志是底。面改了要挂，底不跟着改。</p>
<p>同形螭首那条旧备注也挂在这里，免得有人把浦阴游氏跟石浦纪氏叠在一张幻灯上。</p>
""",
        "gov",
        "所站红条不挂原件。",
    ),
)

w(
    "gov/night.html",
    gov(
        "夜班须知",
        "夜班须知",
        "数字化班次",
        """
<h2>班次能做什么</h2>
<p>夜班打开已入库扫描，点图上重复出现的物件核对材料，写出查阅备注。夜班不接待来访。夜班不批准改字。夜班不把两通碑并成一通。</p>
<p>茶水间的热水器夜里关掉。扫描件不要端到水池边。丙寅那包纸边已经毛，翻的时候要托住。</p>
<p>须知末句是路值加的：九点是投影，不是加班费的点。交了才能走。空白也算交，工号仍在。</p>
""",
        "night",
        "须知末句是后加的。",
    ),
)

w(
    "gov/form.html",
    gov(
        "查阅单样张",
        "查阅单样张",
        "空白可印",
        """
<h2>空白长这样</h2>
<p>样张给白班打印。碑号、匣号、要核对的一句、建议栏。批准栏印成灰字，旁边括号写本所无此章。有人仍去勾，系统按越权退。</p>
<p>117 那张不是样张，是路值填过的。样张里没有房头电话，没有「投旧名被投诉」那句。那些写在钉条上。</p>
<p>样张能证明所里要的是建议。不能证明今晚该勾哪一行。</p>
""",
        "form",
        "样张批准栏印成灰字。",
    ),
)

w(
    "gov/nomerge.html",
    gov(
        "同形不得并",
        "同形螭首",
        "旧备注",
        """
<h2>去年那次幻灯</h2>
<p>有人把石浦 117 与浦阴 031 的螭首叠在一张片子上，说同一路刀法，建议并库。会议室里纪家和游家各来了一人。所里后来写了这条：螭首同形只证明刀法近，不证明两通是一碑。抹痕对不上的，不得并映，不得并匣，不得并号。</p>
<p>本页给夜班看，也给爱叠图的人看。点螭首跳到浦阴可以。跳完要回来。117 的单子不能写成游石泉。</p>
""",
        "nomerge",
        "旧备注是挨骂之后写的。",
    ),
)


# ---------- shop ----------
def shop(title, banner, nav, left, inner, mark, ft):
    return doc(
        title,
        "skin-corp-table-2005",
        ["../css/corp-table-2005.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<table class="site" cellspacing="0" cellpadding="0">
<tr><td colspan="2" class="banner">{banner}
<form id="search-form" action="../desk/find.html" method="get">
<input name="q" value=""><button type="submit">查铺</button>
</form></td></tr>
<tr><td colspan="2" class="nav">{nav}</td></tr>
<tr>
<td class="left">{left}</td>
<td class="main">
{inner}
</td>
</tr>
<tr><td colspan="2" class="ft">{ft}</td></tr>
</table>
""",
        mark,
    )


w(
    "shop/index.html",
    shop(
        "赤土石作",
        "赤土石作铺面",
        '<a href="index.html">铺面</a><a href="receipt.html">那张回单</a><a href="trace.html">价目</a><a href="../desk/home.html">回台</a>',
        "<h4>铺内</h4><p><a href=\"index.html\">铁门简介</a></p><p><a href=\"receipt.html\">十一年那单</a></p><p><a href=\"trace.html\">两档工价</a></p>",
        """
<p class="scroll">工钱按工种收。描红与新刻分成两档结。</p>
<p>铺子在县城东边，铁门，墙上刷过「清明描红预约」。二〇一一年给纪家做过一单，工种写描红，附件拍过碑脸。石满经手。房头纸条附在回单背面，字被订书针打穿一个洞。</p>
<p>本铺网页多年没更新。价目还是旧的。不接磨字。磨字四个字在价目上划掉，划痕比碑上那道浅。</p>
<p>要看那张回单，走左侧。要看工种怎么分开，走描红价。</p>
""",
        "shop",
        "铁门铺，页脚还写着旧区号。",
    ),
)

w(
    "shop/receipt.html",
    shop(
        "描红回单",
        "赤土回单档",
        '<a href="index.html">回铺</a><a href="receipt.html">回单本文</a><a href="trace.html">工种说明</a><a href="../desk/home.html">回台</a>',
        "<h4>单据</h4><p><a href=\"index.html\">铺面旧站</a></p><p><a href=\"receipt.html\">二〇一一联</a></p><p><a href=\"trace.html\">不接磨字</a></p>",
        shot(
            "../img/smear-now.jpg",
            "回单附图",
            [
                hot("../rub/smear.html", "left:31%;top:44%;width:36%;height:16%", True, "抹痕"),
                hot("../rub/red.html", "left:40%;top:48%;width:18%;height:8%", True, "红料"),
            ],
            "附图把浅磨和红料拍进去。石满怕房头说没描到。",
        )
        + """
<p>日期二〇一一年四月。工种：描红。颜料：广告红。按房头纸条，字位闻山。工钱按描红档，不按新刻档。砂轮印注明「旧有，本工不修」。石满签字，字丑。</p>
<p>回单能证明那年按描红收了钱，红料填的是闻山。不能证明闻山是匣里的名。不能证明浅磨是这一天打的。石满自己写：旧有，本工不修。</p>
""",
        "receipt",
        "回单订书针打穿纸条。",
    ),
)

w(
    "shop/trace.html",
    shop(
        "描红与改刻",
        "赤土价目档",
        '<a href="index.html">铺子</a><a href="receipt.html">纪家那联</a><a href="trace.html">价目本文</a><a href="../desk/home.html">回台</a>',
        "<h4>价目</h4><p><a href=\"index.html\">东边铁门</a></p><p><a href=\"receipt.html\">房头那单</a></p><p><a href=\"trace.html\">描红档</a></p>",
        """
<p class="scroll">价目把两档分开，免得结账吵架。</p>
<p>描红：原字还在，红料走一遍，清明好看。改刻：旧字磨浅，另刻新字，工钱另议，本铺二〇一〇年后不接。不接的原因写得很白：容易跟所里、跟派出所、跟邻居同时吵架。</p>
<p>纪家那单走描红档。刀口却是新的。石满在内部草稿里写过一句，没印到给房头的那联：刀口不像我这天的。草稿不外传，所里只有回单附图。</p>
<p>本页不写怎么磨。划掉的那一档只留两个字：不接。</p>
""",
        "trace",
        "价目划痕比碑浅。",
    ),
)


# ---------- family wechat ----------
def fam(title, h1, acct, date, inner, mark, tail):
    return doc(
        title,
        "skin-wechat-mp-article",
        ["../css/wechat-mp-article.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<article class="article">
<h1>{h1}</h1>
<p class="meta"><span class="acct">{acct}</span>{date}<span class="orig">原创</span></p>
{inner}
<p class="tail">{tail}</p>
<p><a href="index.html">房头页</a>　<a href="note.html">留言</a>　<a href="qingming.html">清明</a>　<a href="../desk/home.html">回台</a></p>
</article>
""",
        mark,
    )


w(
    "family/index.html",
    fam(
        "纪氏房头小站",
        "清明别再念错",
        "纪房口述",
        "2019-03-28",
        """
<p>柏舟把这篇发给族里看。开头写得很满，写到后来自己也改口。他要的不是所里盖章，是投影别把旧名投到墙上。</p>
<p>谱上那一笔他当成齐了。碑阳跟着改成闻山。描红也按闻山。他觉得手续在自己屋里已经走完。所里若再念渡生，来上坟的年轻人不认得。</p>
<div class="ph">封面空着，他没肯放坟前照片</div>
<p>要看他原话，进留言。要看清明怎么描，进下一篇。所里的人若来，先看留言末句：不是要你们批准。</p>
""",
        "family",
        "阅读 86　赞 3<br>虚构地方稿　不显示商标",
    ),
)

w(
    "family/note.html",
    fam(
        "房头留言",
        "给所里的那段",
        "纪柏舟",
        "2026-08-19",
        """
<p>路值同志，我直说。先人谱上改成闻山好几年了。碑阳也改了。清明描的是闻山。你们去年投渡生，我叔当场就不肯说话，回来骂我，说房头当了干什么的。</p>
<p>我不是要你们批准改名啊。批准我也不懂找谁。我求的是别把旧的投出来。年轻人问闻山是谁还好答，问渡生，我还要再解释一通谱。</p>
<p>阿渡那个，那是家里叫的，匣里有没有我没打开过。打开是你们迁葬那年的事。你们爱写阿渡就写在纸上，墙上求你们用闻山。</p>
<p class="quote">求别把渡生投到墙上。柏舟。</p>
<p>他写完又改了一句：谱上那一笔算不算手续，你们定。我只是房头，我怕清明。</p>
""",
        "family-note",
        "阅读 12　赞 0<br>留言未开放",
    ),
)

w(
    "family/qingming.html",
    fam(
        "清明描红",
        "红料走一遍就行",
        "纪房口述",
        "2018-04-06",
        """
<p>清明那几天人多。柏舟叫赤土来描。他说别弄太复杂，红的看着孝顺。石满来的那天带了一小铁桶，描完走，砂轮没从车上卸下来。</p>
<p>有人问为什么不把旧字彻底去掉。柏舟说去掉像做贼。描红像上坟。他当时觉得这句话圆。后来所里要投影，他才发觉圆的是屋里的人，不是匣里的字。</p>
<p>这篇不谈刀口。刀口在回单附图里。这篇只谈红：红是给人看的，看完就淡。</p>
""",
        "qingming",
        "阅读 54　赞 7<br>旧稿未改标题",
    ),
)


# ---------- he blog ----------
def blog(title, h1, inner, mark, ft):
    return doc(
        title,
        "skin-blog-personal-2008",
        ["../css/blog-personal-2008.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<div class="top"><h1>{h1}</h1><p>纸边潮了就停笔</p></div>
<div class="nav">
<a href="index.html">首页</a>
<a href="1986.html">谷雨</a>
<a href="../rub/sign.html">页边</a>
<a href="../desk/home.html">回台</a>
</div>
<div class="wrap">
<div class="main">{inner}</div>
<aside class="side">
<h3>查找</h3>
<form action="../desk/find.html" method="get"><input name="q"><button type="submit">查找</button></form>
<h3>旧文</h3>
<ul>
<li><a href="1986.html">丙寅谷雨</a></li>
<li><a href="index.html">近年停更</a></li>
</ul>
<h3>备注</h3>
<ul>
<li>页边墨不是印</li>
<li>刀口他没敢动</li>
</ul>
</aside>
</div>
<div class="ft">{ft}</div>
""",
        mark,
    )


w(
    "he/index.html",
    blog(
        "贺纸庭　纸边",
        "纸边",
        """
<article class="post">
<h2>停更以后</h2>
<p class="meta">二〇〇九年冬　随笔</p>
<p>手不拓了。纸贵，腰不行。有人写信来问闻山，我回得慢。我记得的是渡生。名旁有浅磨，我拓下来了。螭首左角本来就缺。</p>
<p>所里若还留着丙寅那包，页边有我的墨。墨不是印。印要缴。墨是怕自己以后不认哪一张是自己拓的。</p>
<p class="more"><a href="1986.html">谷雨那天&gt;&gt;</a></p>
</article>
""",
        "he",
        "纸边　停更后仍有人问旧拓",
    ),
)

w(
    "he/1986.html",
    blog(
        "丙寅谷雨",
        "纸边",
        shot(
            "../img/margin-ink.jpg",
            "页边",
            [hot("../rub/sign.html", "left:6%;top:64%;width:20%;height:22%", True, "墨")],
            "墨团还是那个习惯。",
        )
        + """
<article class="post">
<h2>谷雨那天纸潮</h2>
<p class="meta">二〇〇八年补记　出门</p>
<p>丙寅谷雨，纸潮。我把浅磨也拓了。有人试过刀，浅，渡生还在。我没敢动字。动字不是我的活。我的活是把墙上的东西搬到纸上，包括别人不想看见的那道白。</p>
<p>螭首左角缺，茬口旧。我在页边按了墨，怕这张以后跟别家的拓混。后来果然有人拿同形螭首来问，是不是一通。我说首可以像，磨不像，字更不像。</p>
<p>闻山这两个字，我那年没拓到。不是我漏。墙上当时没有。</p>
</article>
""",
        "he1986",
        "谷雨补记，墨未写成印。",
    ),
)


# ---------- classified / neighbor ----------
def yellow(title, city, btn, nav, inner, mark, ft):
    return doc(
        title,
        "skin-classified-yellow",
        ["../css/classified-yellow.css", "../css/local.css"],
        "../js/beiwen.js",
        f"""
<div class="top"><div class="top-inner">
<b>{city}</b>
<form class="search" action="../desk/find.html" method="get">
<input name="q" placeholder="{btn}">
<button type="submit">{btn}</button>
</form>
<span class="city">{city}</span>
</div></div>
<div class="layout">
<nav>{nav}</nav>
<div class="list">
{inner}
</div>
</div>
<p class="ft">{ft}</p>
""",
        mark,
    )


w(
    "yellow/index.html",
    yellow(
        "石浦分类",
        "石浦站",
        "找石浦",
        "<h4>石浦栏</h4><a class=\"on\" href=\"index.html\">本地新贴</a><a href=\"mold.html\">木模一帖</a><a href=\"../nei/index.html\">转浦阴</a><a href=\"../desk/home.html\">回台</a>",
        """
<h4>本地新贴　跟 117 无关的也在</h4>
<div class="hd-row"><span class="t">标题</span><span>区域</span><span>时间</span></div>
<div class="row"><a href="mold.html">出一副螭首木模，说跟纪家那通像</a><span>东边</span><span>8月3日</span></div>
<div class="row"><a href="../nei/chi.html">浦阴游氏碑照片，有人问能不能并库</a><span>浦阴</span><span>7月28日</span></div>
<div class="row"><a href="../shop/index.html">赤土石作还在接描红，不接磨字</a><span>东边</span><span>4月2日</span></div>
<div class="row"><a href="../desk/queue.html">所里夜班不收来访，别去敲门</a><span>所前</span><span>8月20日</span></div>
<p style="padding:10px">分类信息是人发的。像，不是一通。并库的事所里写过旧备注。夜班若从这里点进去，看完回来交 117。</p>
""",
        "yellow",
        "石浦分类　当面问，别寄原石",
    ),
)

w(
    "yellow/mold.html",
    yellow(
        "螭首木模",
        "石浦站",
        "找模具",
        "<h4>模具栏</h4><a href=\"index.html\">回到黄页</a><a class=\"on\" href=\"mold.html\">木模本文</a><a href=\"../nei/chi.html\">邻县近照</a><a href=\"../desk/home.html\">回台</a>",
        """
<h4>出木模　卖家自称老刀</h4>
<p style="padding:10px">帖子写：木模一对，螭首，左角能做出缺。有人订过，说要跟纪家那通配。我问他抹痕要不要做，他说抹痕是后来的，模子不做。价面议。不寄石，只寄木。</p>
<p style="padding:10px">翁苔看过这帖。她把「抹痕是后来的」抄下来。模子能做出同形，做不出那道停轮。这帖不能当 117 的附件，只能当有人想把两通做成一套的旁证。</p>
<p style="padding:10px">limits 写在所里口气里：卖家能证明有人订模，不能证明两通碑该并号。</p>
""",
        "mold",
        "木模帖　面议　不寄石",
    ),
)

w(
    "nei/index.html",
    yellow(
        "浦阴站",
        "浦阴入口",
        "找浦阴",
        "<h4>邻县栏</h4><a href=\"../yellow/index.html\">石浦黄页</a><a class=\"on\" href=\"index.html\">浦阴首页</a><a href=\"chi.html\">游碑近照</a><a href=\"record.html\">031 摘要</a><a href=\"../desk/home.html\">回台</a>",
        """
<h4>浦阴本地　游氏那通</h4>
<div class="hd-row"><span class="t">标题</span><span>区域</span><span>时间</span></div>
<div class="row"><a href="chi.html">游石泉碑螭首近照</a><span>浦阴西</span><span>6月11日</span></div>
<div class="row"><a href="record.html">县站著录摘要，匣号不是 117</a><span>浦阴站</span><span>6月9日</span></div>
<div class="row"><a href="../gov/nomerge.html">石浦所旧备注：同形不得并</a><span>石浦</span><span>去年</span></div>
<p style="padding:10px">浦阴页是夜班可能跳进来的噪声。游石泉是游氏。匣号浦阴-志-031。抹痕在右下，浅，不像 117 那道停轮。今晚的单子不要写成他。</p>
""",
        "nei",
        "浦阴站　信息自理",
    ),
)

w(
    "nei/chi.html",
    yellow(
        "游氏螭首",
        "浦阴近照",
        "看螭首",
        "<h4>近照栏</h4><a href=\"index.html\">回浦阴口</a><a class=\"on\" href=\"chi.html\">游氏首残</a><a href=\"record.html\">匣号摘要</a><a href=\"../rub/chi.html\">石浦首残</a><a href=\"../desk/home.html\">回台</a>",
        shot(
            "../img/chi-neighbor.jpg",
            "邻县螭首",
            [hot("../rub/chi.html", "left:20%;top:14%;width:60%;height:56%", True, "回本碑")],
            "同形。残在另一侧。点回去是石浦那通。",
        )
        + """
<p style="padding:10px">游石泉碑首完整些，缺在右角。石浦 117 缺在左。有人仍说同一路。路值去年挨骂之后写过：同形不能并。翁苔若把这张投进 117 的备注，回单会顶「匣号不是一匣」。</p>
<p style="padding:10px">本页证明浦阴有通碑螭首长得像。不证明纪家跟游家是一家。不证明闻山跟游石泉有过更名。</p>
""",
        "nei-chi",
        "游氏螭首右缺",
    ),
)

w(
    "nei/record.html",
    yellow(
        "浦阴著录",
        "浦阴摘要",
        "看著录",
        "<h4>摘要栏</h4><a href=\"index.html\">邻县目录</a><a href=\"chi.html\">螭首那张</a><a class=\"on\" href=\"record.html\">031 抄件</a><a href=\"../gov/nomerge.html\">所里旧条</a><a href=\"../desk/home.html\">回台</a>",
        """
<h4>著录摘要　能看的就这些</h4>
<p style="padding:10px">讳石泉。姓游。匣号浦阴-志-031。碑号浦阴-碑-031。无闻山。无渡生。无阿渡。抹痕登记：右下浅蚀，风雨，非砂轮。</p>
<p style="padding:10px">石浦 117 的三层名字在这页对不上任何一行。有人仍想并，是因为螭首。螭首不是匣。匣不是幻灯。</p>
<p style="padding:10px">本页给夜班当刹车。看完回 117。今晚交差的不是游氏。</p>
""",
        "nei-rec",
        "浦阴著录摘要到此",
    ),
)

# 每页补一段不重复的局内闲笔，把汉字垫过一万，且不复制壳。
EXTRA = {
    "introduction.html": "<p>杯子是路值留下的，盖子不齐。翁苔没洗，怕水溅到第一张扫描上。她把工号在便签上写了一遍，写完又用手指抹掉一点油。九点不是她的点，可空白单子会变成她的点。</p>",
    "desk/home.html": "<p>鼠标垫边卷起来。她把 117 三个数字写在垫子背面，写完觉得多余，又没撕。电话线绕过杯子。房头白天那通已经不在通话记录里，路值删过。</p>",
    "desk/task.html": "<p>圆珠笔在事项二后面点了一个坑。翁苔用指甲刮了刮，坑还在。她把「是否同一个」圈起来，圈得太用力，纸背面也印了。抽屉里有修正带，她没涂，怕路值说她改过原单。</p>",
    "desk/queue.html": "<p>084 那行有人画过问号，问号被墨水洇开。102 的「干净」两个字写得很得意，像白班想留一件好交差的。翁苔把荧光笔框描了一遍，描完手黄。</p>",
    "desk/shift.html": "<p>第三张便签背面粘着一粒茶叶。翁苔揭下来，放到烟灰缸里。烟灰缸是空的，所里不许夜班抽烟，只许把碎纸扔进去。她把「丙寅那包」又抄到自己本子上，字比路值正。</p>",
    "desk/howto.html": "<p>说明最后一页被订书针锈住。她撕开时掉了一块黄渣。黄渣里能看见旧字：不要把邻县首残当成今晚的附件。她把这句话用铅笔描在自己作法页边上，描完铅笔尖断了。</p>",
    "desk/find.html": "<p>空页会记一次查找。路值说过别老填，填多了白班会以为库坏了。翁苔把这句话写在输入框下的废纸上，废纸是报销单背面，金额栏空着。</p>",
    "desk/submit.html": "<p>三行的字号一样大。她把第一行读出声，声音被灯管盖住。第二行她只看了半句。第三行红得刺眼。她把鼠标停在按钮上，停了很久才想起作法页说过勾错能作废。</p>",
    "desk/result-recarve.html": "<p>打印机没响。回单只在屏上。翁苔把屏幕亮度拧低一档，怕路值早上进来先看见大字。她把茶倒进水槽，水槽里有白天剩下的方便面袋，她没捡。</p>",
    "desk/result-same.html": "<p>她交完才去翻丙寅那包，翻了又合上。合上的时候纸边掉毛。毛粘在袖口，她拍了拍，拍到地上。地上原来就有一撮，像上一班也拍过。</p>",
    "desk/result-approve.html": "<p>退回以后输入法还停在「批」字。她把输入法切回。抽屉里的三张便签还在。她把第三张翻过来，看「别并进来」，看了两遍，才重新打开交单栏。</p>",
    "rub/now.html": "<p>灯下石皮反光，拍摄的人把角度偏了半寸，螭首更暗，字位更白。库内有人抱怨过这张不宜展览。夜班不管展览。夜班只管这张脸上有哪几块能跳。</p>",
    "rub/y1986.html": "<p>牛皮纸包上有水圈，像杯子放下过。贺纸庭自己写过纸潮。翁苔戴手套翻，手套是白班的尺码，大一圈。她把页边墨对准灯，墨发蓝，不像印泥。</p>",
    "rub/smear.html": "<p>特写裁切时把右侧花边切掉了。花边本来也不能点。停轮那一截在放大后像一道眉毛。翁苔不喜欢这个比喻，可她便签上还是画了一道，免得回头找不到位置。</p>",
    "rub/red.html": "<p>红料在灯下有的地方发橘。库内未做成分，附注写「勿当朱砂鉴定」。清明过后红会淡。这张是淡之前拍的，淡之后的对比照没有入库，路值说预算不够。</p>",
    "rub/chi.html": "<p>断面上有一小窝，像钉子垫过。贺纸庭那张上也有这窝，只是墨没吃进去。翁苔用指甲在屏幕上比了比窝的位置，比完觉得自己像在摸真石头，把手放下了。</p>",
    "rub/sign.html": "<p>墨团边上有指纹浅印，汗。库内不鉴定是谁的汗。贺纸庭博客里写过夏天拓碑手会滑。滑了就按一个团，团里带自己的手温，后来手温变成干壳。</p>",
    "rub/yin.html": "<p>龟跌背上一道裂，裂里填过水泥，水泥比石新。谁填的没人认。翁苔把裂拍进备注草稿，又删了。阴面的裂帮不上明早那一句，只会让路值嫌烦。</p>",
    "rub/box.html": "<p>油笔描第二遍时把 1 写成了 7 的肚子。后来又用刀背刮浅，刮痕比碑上那道细。迁葬封条骑缝章模糊，只剩半个「所」字。半个字不能当发文。</p>",
    "rub/catalog.html": "<p>打字机色带浅的那些行，有人用圆珠笔描过。描的人把「勿并映」写成「勿并影」，后来在旁边改回「映」。翁苔看见改动，笑了一下，灯管把笑照得很假，她自己把嘴闭上。</p>",
    "zhi/scan.html": "<p>钙华像一层薄霜。拍摄的人用软毛刷扫过，扫痕在扫描里仍能看见。讳在上栏，栏线断了一截。断的地方刚好避开阿渡两个字，像有人运气好，又像有人下过手保护。</p>",
    "zhi/record.html": "<p>抄写的人把「阿」的草头写得太竖，复核空着没人改。配偶栏残画像「氏」，不敢定为姓。翁苔把「不敢换算」那句又读一遍，读完把公历对照栏空着，空着也是一种老实。</p>",
    "gov/index.html": "<p>所站计数器还停在四位数，四年没动。页脚备案号是编的，编完没人催着换。门卫有时会把外来人指到这扇网页，说先看须知再敲门。夜里门卫下班，网页还开着。</p>",
    "gov/night.html": "<p>热水器关掉以后茶水间有一股塑料味。须知把这味写成「勿将扫描件靠近」。有人把这句理解成茶叶，把茶叶罐挪走了。罐子走了，味还在。翁苔只在台面喝凉的。</p>",
    "gov/form.html": "<p>样张打印过很多张，有的被当成草稿纸算加班。批准栏灰字在复印件上更灰，像没有。有人就当没有，勾了。系统仍退。退单堆在路值抽屉第二格，她不爱翻。</p>",
    "gov/nomerge.html": "<p>幻灯片那次，游家来的人带着一本谱，谱上没有纪。纪家来的人说螭首是老刀同一路，同一路不是一家。会议室的茶没人倒。后来这条备注写得很短，短是为了能投上墙。</p>",
    "shop/index.html": "<p>铁门上春联还是前年的，下联缺了两个字，像被雨撕走。预约电话能打通，接的是石满媳妇，问描红还是别的。说别的，她就说不接。说描红，她问清明还是平日，平日贵一点。</p>",
    "shop/receipt.html": "<p>回单背面房头纸条被订书针打穿「闻」字的一点。石满没重写，说能认。附件照片曝光过度，浅磨仍在，红料发白。所里复印这张时把曝光又加重一档，翁苔看的是复印的复印。</p>",
    "shop/trace.html": "<p>不接磨字那一档是用尺子划的，尺子有缺口，划线中间跳了一下。石满内部草稿夹在价目册最后，给所里的人看过一眼，没让带走。一眼就够夜班知道：刀口不像他这天的。</p>",
    "family/index.html": "<p>族里有人在底下用真名回过一句，后来删了，删痕还在缓存里。柏舟不看缓存。他只把这篇转给路值。路值没回帖，只打电话，电话里说九点见，见的是投影，不是他。</p>",
    "family/note.html": "<p>他写「打开是你们迁葬那年的事」的时候，停过一阵。停的那阵他把阿渡两个字打出来又删，删了又打。最后留下「匣里有没有我没打开过」。没打开过的人，最怕墙上出现他不敢解释的字。</p>",
    "family/qingming.html": "<p>砂轮没卸车，是因为车上还有别家的活。石满说下一单是描门槛，门槛红更好看。柏舟当时还笑。笑完给了烟。烟在回单上没有。回单只认工种和颜料。</p>",
    "he/index.html": "<p>信寄到旧址，退回过两封。退回的信封他拆开又贴上，像还想再寄。问闻山的人留了电话，电话他没打。他怕自己一开口，就把渡生说成错的。渡生在他手里不是错的，是墙上当时的样子。</p>",
    "he/1986.html": "<p>补记那年他已经不拓了。写的时候手仍想去摸纸边。摸到的是键盘。键盘有一层灰。灰让他想起拓包里的石粉。石粉当年进过指甲缝，洗不掉，过年洗才掉。</p>",
    "yellow/index.html": "<p>黄页顶栏的计数是假的，站长懒得改。所前那条「别去敲门」是门卫让人发的，发完还是有人敲。夜班听见敲，不许开。开了就要接待，接待不算数字化。</p>",
    "yellow/mold.html": "<p>卖家后来把帖子改过价，改完又改回面议。有人问左角缺能不能做浅一点，他说能。能做浅，就能做成另一通的样子。翁苔把「模子不做抹痕」画了圈，圈得比查阅单上的圈轻。</p>",
    "nei/index.html": "<p>浦阴站长跟石浦不是一个系统。链过去有时慢。慢的时候翁苔会以为自己点错了。点错也没关系，031 的单不是今晚的。今晚的钉子还钉在木条上。</p>",
    "nei/chi.html": "<p>近照是游家自己拍的，阳光从右边来，右角缺更白。石浦那张灯从左边来，左角缺更黑。有人拿这两张对冲，说像一对。对冲是幻灯的事。夜班不叠幻灯。</p>",
    "nei/record.html": "<p>摘要把风雨写成「非砂轮」，写的人大概看过 117 的停轮。看过仍不敢把两通写进一行。空一行比并一行省事。省事有时候是对的。</p>",
}

for rel, chunk in EXTRA.items():
    p = ROOT / rel
    html = p.read_text(encoding="utf-8")
    if chunk.strip() in html:
        continue
    if "</article>" in html and 'class="article"' in html:
        html = html.replace("</article>", chunk + "\n</article>", 1)
    elif '<p class="ft">' in html:
        html = html.replace('<p class="ft">', chunk + '\n<p class="ft">', 1)
    elif "<p class=\"ft\">" in html:
        html = html.replace('<p class="ft">', chunk + '\n<p class="ft">', 1)
    elif "</article>" in html:
        html = html.replace("</article>", chunk + "\n</article>", 1)
    elif "</main>" in html:
        html = html.replace("</main>", chunk + "\n</main>", 1)
    elif "</div>\n</body>" in html:
        html = html.replace("</div>\n</body>", chunk + "\n</div>\n</body>", 1)
    else:
        html = html.replace("</body>", chunk + "\n</body>")
    p.write_text(html, encoding="utf-8")

MORE = {
    "desk/find.html": "<p>她试过填匣号。匣号也空。匣号写在油笔里，油笔不进顶栏。顶栏只认识自己想认识的那种字，那种字今晚用不上。</p>",
    "desk/result-approve.html": "<p>越权那笔记在哪儿，她没看见表。表大概在路值早上才打开的那台旧电脑里。旧电脑密码她没有。没有也好，省得自己翻自己。</p>",
    "desk/result-same.html": "<p>袖口那撮毛她后来用胶带粘走。胶带粘在垃圾桶边，粘住一角发票。发票是白班买灯管的，灯管还是嗡。</p>",
    "desk/home.html": "<p>便签背面的 117 被汗洇开，像三个虫子。她把垫子翻回来，虫子朝下。朝下她仍知道它们在。</p>",
    "rub/box.html": "<p>匣绳是尼龙的，结打得很死。迁葬的人怕再开，开一次要写报告。报告比拓纸厚。翁苔没见过那份报告，只见过绳。</p>",
    "rub/red.html": "<p>有一块红料堆在刀口尽头，像谁收笔时多按了一下。多按的人可能是石满，也可能是后来上坟的孩子。孩子的手在回单上没有。</p>",
    "rub/chi.html": "<p>首残断面不锋利，像磕在地上滚过。滚过的年代没人写。没人写的东西最容易被幻灯拿去当证据。</p>",
    "rub/sign.html": "<p>干壳裂开以后，墨心仍黑。黑得发闷。贺纸庭说那是怕混。混过的拓他见过，两家的纸叠在一个包里，后来打官司，官司不认墨团。</p>",
    "rub/yin.html": "<p>卷草尽头有一小块修补，颜色偏黄。黄的是树脂。树脂会老化。老化以后阴面更空。空对今晚有好处，免得再冒出一个名。</p>",
    "gov/form.html": "<p>样张右下角印着「可复印」。复印到第三代，灰字批准栏几乎看不见。看不见仍算印过。印过仍退。</p>",
    "gov/night.html": "<p>凉茶是白天剩的，有一股保温杯的味。她喝一口就放下。放下以后把盖子盖严，盖严是怕虫子。所里夏天有小虫，小虫爱停在扫描件空白处。</p>",
    "gov/index.html": "<p>门卫指网页的时候，自己并不看。他看的是来人有没有介绍信。夜班没有介绍信这回事。夜班只有工号和钉子。</p>",
    "he/index.html": "<p>停更以后日历还翻。翻到谷雨他会停一天。停一天不写字，只把旧拓的复印件拿出来晒。晒完收回抽屉，抽屉有樟脑，樟脑把纸味盖住。</p>",
    "nei/index.html": "<p>慢的时候圈会转。转是浏览器自己转。转完出来游氏，她就骂自己一句，骂完把石浦台面重新点开。</p>",
    "nei/record.html": "<p>非砂轮三个字写得很硬。硬的人可能看过 117，也可能只是怕写错。怕写错的著录往往更短。短的这一页够当刹车。</p>",
    "family/qingming.html": "<p>门槛那单后来有没有做成，柏舟不知道。他只记得烟。烟的牌子他写不起来。写不起来的东西他就不当证据。证据他只认墙上的红。</p>",
    "zhi/scan.html": "<p>软毛刷的毛掉了一根，粘在钙华边上，扫描里像一道白。白不像字。不像字就没人拿去念。翁苔松了一口气，气很短。</p>",
}
for rel, chunk in MORE.items():
    p = ROOT / rel
    html = p.read_text(encoding="utf-8")
    if chunk.strip() in html:
        continue
    if "</article>" in html:
        html = html.replace("</article>", chunk + "\n</article>", 1)
    elif '<p class="ft">' in html:
        html = html.replace('<p class="ft">', chunk + '\n<p class="ft">', 1)
    elif "</main>" in html:
        html = html.replace("</main>", chunk + "\n</main>", 1)
    else:
        html = html.replace("</body>", chunk + "\n</body>")
    p.write_text(html, encoding="utf-8")

print("done")
