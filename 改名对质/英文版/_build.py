# -*- coding: utf-8 -*-
from pathlib import Path
from PIL import Image, ImageFilter, ImageDraw

ROOT = Path("/Users/Zhuanz/Desktop/新游戏4/改名对质")
ASSETS = Path("/Users/Zhuanz/.cursor/projects/Users-Zhuanz-Projects-chenghuang-yeshi/assets")
IMG = ROOT / "img"

PAINT = {
    "ye-chuang.jpg": [(40, 70, 320, 340), (420, 70, 1140, 300)],
    "pu-ce.jpg": [(220, 360, 620, 680)],
    "hong-tiao.jpg": [(430, 40, 1120, 300)],
    "you-xiang.jpg": [(520, 330, 1040, 560)],
}


def paint_and_copy():
    IMG.mkdir(exist_ok=True)
    names = [
        "ye-chuang.jpg",
        "dang-he.jpg",
        "ting-xiang.jpg",
        "pu-ce.jpg",
        "hong-tiao.jpg",
        "you-xiang.jpg",
        "tai-deng.jpg",
        "bian-tiao.jpg",
    ]
    for name in names:
        im = Image.open(ASSETS / name).convert("RGB")
        w, h = im.size
        # shrink for pages
        im = im.resize((960, int(h * 960 / w)), Image.Resampling.LANCZOS)
        scale = 960 / w
        if name in PAINT:
            draw = ImageDraw.Draw(im)
            for box in PAINT[name]:
                x1, y1, x2, y2 = [int(v * scale) for v in box]
                crop = im.crop((x1, y1, x2, y2)).filter(ImageFilter.GaussianBlur(18))
                im.paste(crop, (x1, y1))
                # sample edge color wash
                px = im.getpixel((max(0, x1 - 4), max(0, y1)))
                wash = Image.new("RGB", (x2 - x1, y2 - y1), px)
                wash = Image.blend(im.crop((x1, y1, x2, y2)), wash, 0.35)
                im.paste(wash, (x1, y1))
        dest = IMG / name
        im.save(dest, "JPEG", quality=78, optimize=True)
        print("img", name, dest.stat().st_size)


def doc(title, skin, css, body, rel, page="", extra_head=""):
    prefix = rel
    page_attr = f' data-page="{page}"' if page else ""
    return f"""<!DOCTYPE html>
<html lang="zh-CN" class="{skin}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/{css}">
  <link rel="stylesheet" href="{prefix}css/patches.css">
  {extra_head}
</head>
<body{page_attr}>
{body}
<script src="{prefix}js/state.js"></script>
</body>
</html>
"""


def savebtn(sid, label="收下这句"):
    return f'<button type="button" class="gm-save" data-save="{sid}">{label}</button>'


def write_pages():
    pages = {}

    # ---- introduction ----
    pages["introduction.html"] = doc(
        "埠南户政　夜窗班前纸",
        "skin-intro-manual",
        "intro-manual.css",
        """
  <header class="intro-hero">
    <div class="image-area"><img alt="" src="img/ye-chuang.jpg"></div>
    <h1>埠南县户政　夜窗班前纸</h1>
  </header>
  <main>
    <section>
      <h2>谁坐这盏灯</h2>
      <p>工号覃书。蓝槐白班走时把取号条压在玻璃下，说夜核。来人叫屈晚禾，要取改名回执，还问结婚材料。你没有批准章。章在科长抽屉。你只能写出今晚发不发的建议。</p>
      <p>他站在玻璃外，话已经说完一遍：「跳墙去年就办完了。庵都停了。户口本现在就叫屈晚禾。谱上也是这个。班长说过名齐了就能领。我都排队了，别卡我。」未婚妻江棠枝明天一早要去领证窗口。</p>
    </section>
    <section>
      <h2>柜上已经印着</h2>
      <p>附属柜夜班目录第三行不用你再翻。纸上就有。先信他还俗也行，但这句能收下，对质窗能用。</p>
      <p class="saveline">青瓦庵寄名疏抄件仍写屈氏禾禾法名净禾状态未解除。{btn}</p>
      <p>做法就这一下：页上有钮的句子先收进袋子，再去对质窗点他嘴里对不上的那一句。指错他会顶。态度那句不要去点，点了也只会被顶回来。</p>
      <p class="boot-actions">
        <a class="enter-link" href="chuang/confront.html">进对质窗</a>
        <a class="ghost" href="chuang/index.html">进夜窗桌面</a>
        <button type="button" class="ghost" id="gm-wipe">清掉本机上次没交的袋子</button>
      </p>
    </section>
    <section>
      <h2>纸头自己说</h2>
      <p>埠南、青瓦庵、屈晚禾这些叫法是窗口自用，拿到街上问不到。卡在某一句就翻抽屉里的纸。纸只指方向，不替你点。这张班前纸别带进窗。</p>
    </section>
  </main>
  <p style="text-align:center;color:#888;font-size:12px;padding-bottom:24px">更衣室那张，进窗后不要再翻</p>
""".replace("{btn}", savebtn("shu-weijiechu", "先收这一栏")),
        "",
        "intro",
    )

    def chuang(title, page, inner, status=True):
        nav = """<header>
      <strong>埠南夜窗终端</strong>
      <div class="mini-nav">
        <a href="index.html">桌面</a>
        <a href="oral.html">口头</a>
        <a href="confront.html">对质</a>
        <a href="saved.html">袋子</a>
        <a href="submit.html">交单</a>
      </div>
    </header>"""
        st = '<div id="gm-status"></div>' if status else ""
        return doc(
            title,
            "skin-service-cyan-desk",
            "service-cyan-desk.css",
            f'<div id="wrap">{nav}{st}<div class="notice">{inner}</div></div>',
            "../",
            page,
        )

    pages["chuang/index.html"] = chuang(
        "夜窗桌面",
        "chuang-index",
        """
      <h2>二十二点的灯</h2>
      <div class="pic"><img alt="" src="../img/tai-deng.jpg"></div>
      <p>终端还是白班那台。屈晚禾的号压在玻璃下，人在门外抽烟，隔一会儿敲一次。蓝槐不在。你能打开的是已经扫进来的抄件，不是外网乱撞。</p>
      <p>口头全文在左边那栏。对质窗要带着袋子里的句子去。附属柜、谱局、须知、旧邮箱、他以前的页，各走各的皮，别在这一页找齐。</p>
      <table>
        <thead><tr><th>打开</th><th>谁的东西</th></tr></thead>
        <tbody>
          <tr><td><a href="oral.html">他今晚说的</a></td><td>取件人屈晚禾</td></tr>
          <tr><td><a href="confront.html">对质窗</a></td><td>点哪一句对不上</td></tr>
          <tr><td><a href="ticket.html">取号条</a></td><td>蓝槐白班留下的</td></tr>
          <tr><td><a href="hukou.html">变更摘页</a></td><td>派出所已走完的那栏</td></tr>
          <tr><td><a href="shift.html">夜窗能写什么</a></td><td>权限</td></tr>
          <tr><td><a href="draft.html">回执草稿</a></td><td>白班没发出去的半截</td></tr>
          <tr><td><a href="../shu/index.html">附属柜</a></td><td>缪守匣</td></tr>
          <tr><td><a href="../pu/index.html">南街谱局</a></td><td>纪蒲舟一口</td></tr>
          <tr><td><a href="../zhi/index.html">公开须知</a></td><td>红头栏</td></tr>
          <tr><td><a href="../you/inbox.html">旧邮箱</a></td><td>白天抄送</td></tr>
          <tr><td><a href="../kou/index.html">他以前的页</a></td><td>屈晚禾旧博客</td></tr>
          <tr><td><a href="../wen/ask.html">问答栏</a></td><td>有人把规矩搅在一锅</td></tr>
          <tr><td><a href="note.html">抽屉纸</a></td><td>卡住再翻</td></tr>
          <tr><td><a href="../guan.html">联查</a></td><td>夜窗打不开</td></tr>
        </tbody>
      </table>
      <p>交单随时能交。交早了按你勾的走，事后不能赖机子。</p>
""",
    )

    pages["chuang/oral.html"] = chuang(
        "口头说法",
        "chuang-oral",
        """
      <h2>玻璃外那几句</h2>
      <p>我录的是他站着说的，不是笔录签字。他重复的时候我没有帮他顺。对质窗用的是下面这些整句，不是态度。</p>
      <p>「跳墙去年就办完了，寄名早解除了。」他说完看我，像等我键入可发。</p>
      <p>「庵都停了，疏还能算数？」他把停香和解除焊在一块儿。焊得越紧，越要拆。</p>
      <p>「谱上也跟着改成屈晚禾了。」户口本他拍过玻璃。谱册他没掏出来。</p>
      <p>「班长说过名齐了，夜窗就能发结婚材料。」蓝槐白班只说过夜核，没说过夜发原件。</p>
      <p>「邻县不是也有同名回执吗，拿来就能用。」这句他下午才补，像抓到一根稻草。</p>
      <p>「我都来排队了，你们还卡我。」这句没有栏。点它，他只会更顶。</p>
      <p><a href="confront.html">带袋子去对质</a>　<a href="ticket.html">先看取号条</a></p>
""",
    )

    pages["chuang/confront.html"] = chuang(
        "对质窗",
        "chuang-confront",
        """
      <h2>指哪一句对不上</h2>
      <p>左侧是他今晚的口头。右侧是你从页上收下的句子。点左侧那句。袋子里要有对得上的栏，这句才站得住。指到态度或者停香，他会把理由顶回来。</p>
      <div class="gm-split">
        <div>
          <h3>他讲的</h3>
          <div id="gm-claims"></div>
        </div>
        <div>
          <h3>袋子</h3>
          <ul id="gm-saved"></ul>
        </div>
      </div>
      <div id="gm-feedback">还没指。先从班前纸或柜页把句子收下。</div>
      <p>第一下几乎是送的：袋子里有未解除，就点「寄名早解除了」。点「我都排队了」他会顶。点「庵都停了」他也会顶，顶的理由听着像那么回事，栏还是没动。</p>
      <p>第二下要去南街把承稷收下，再点「谱上也改了」。户口摘页只能证明派出所走完，拿它去打谱，他对得理直气壮。</p>
      <p><a href="saved.html">只看袋子</a>　<a href="submit.html">写建议</a>　<a href="../shu/copy.html">去看抄件</a></p>
""",
    )

    pages["chuang/saved.html"] = chuang(
        "已收句子",
        "chuang-saved",
        """
      <h2>袋子里有什么</h2>
      <p>只有点过钮的句子会躺在这儿。空袋子去对质，点什么都会被顶，或者被回一句还没收下。</p>
      <ul id="gm-saved"></ul>
      <p>柜、谱、须知、邮箱、旧页，各页自己有钮。不要在这一页发明栏。</p>
      <p>有人喜欢把口头也收进来。口头不进袋子。袋子只收纸上写死的、能跟他嘴里打架的那几句。态度、价钱、催婚，打架也打不成字段。</p>
      <p><a href="confront.html">回对质</a></p>
""",
    )

    pages["chuang/ticket.html"] = chuang(
        "取号条",
        "chuang-ticket",
        """
      <h2>玻璃下那张</h2>
      <p>蓝槐用圆珠笔写的，油印号头已经淡了。号是一八六。事项栏她只写了四个字：改名回执。下面补了一行小字：附问结婚材料，夜核，别当场许。</p>
      <p>来人栏：屈晚禾。证件她下午看过户口本，新页是晚禾，旧页复印件她钉在后面，写着屈小禾。谱她没要。疏她让夜窗对柜。</p>
      <p>时间戳是十六点四十分。人八点四十又来过一次，她让他等夜灯。条子右下角她自己画了个圈，圈里写「三栏」。圈没有解释。解释在公开栏那张须知里。</p>
      <p>这张条不能当解除，也不能当谱已改。它只证明白班把人推到你这一窗。</p>
      <p><a href="shift.html">夜窗能写什么</a>　<a href="../zhi/ban.html">她压的另一张</a></p>
""",
    )

    pages["chuang/hukou.html"] = chuang(
        "变更摘页",
        "chuang-hukou",
        """
      <h2>派出所已经走完的</h2>
      <p>这页是扫描件，不是你今晚能改的底。二〇二五年十一月八日，屈小禾改为屈晚禾，事由栏写婚前用名。承办章是白班的，工号不是你。</p>
      <p class="saveline">户口名已由屈小禾改为屈晚禾。{btn}</p>
      <p>变更成功只说明公安这一栏换了字。谱局不自动收知会。寄名疏更不会因为派出所盖章就自己解除。有人拿这页来打「谱上也改了」，对不上。</p>
      <p>旧页复印件上乳名旁注禾禾，那是家里喊的，窗口不认乳名办结婚材料。</p>
      <p><a href="../pu/entry.html">去南街看谱上写谁</a></p>
""".replace("{btn}", savebtn("hukou-yigai", "收进袋子")),
    )

    pages["chuang/shift.html"] = chuang(
        "夜窗权限",
        "chuang-shift",
        """
      <h2>这盏灯能写的</h2>
      <p>夜窗核抄件，写建议。不办新证，不迁出，不迁入，不代人去庵，不代人改谱。有人把代办两个字说得很轻，像帮忙盖个章。帮忙也是越权。</p>
      <p class="saveline">夜窗只出建议不发结婚材料原件。{btn}</p>
      <p>回执草稿白班存过半截，事项还停在「待核」。你若写成可发，明早结婚材料窗口会当名齐。你若写成代办跳墙，机子也会收，那是另一条错。</p>
      <p>联查白班才开。夜窗点那个框，只会进关闭脸。</p>
      <p><a href="draft.html">看那截草稿</a>　<a href="../jin.html">代办会进哪张脸</a></p>
""".replace("{btn}", savebtn("zhi-ye", "收这一句")),
    )

    pages["chuang/draft.html"] = chuang(
        "回执草稿",
        "chuang-draft",
        """
      <h2>白班没发出去的半截</h2>
      <p>草稿标题还是「姓名变更书面回执」。姓名栏已经打了屈晚禾。寄名状态栏空着。谱名栏空着。蓝槐在空栏外批了两个字：夜核。</p>
      <p>有人看见姓名栏有字，就当整张能打。空着的两栏才是今晚的事。打出去的回执若把空栏当成齐，领证窗口会按齐的来问。</p>
      <p>草稿不能收进袋子。袋子只要页上写死的栏，不要半截。对质用的是口头对栏，不是对这张没发的皮。</p>
      <p>作废重开从班前纸那颗钮。草稿本身不会自己变成可发。</p>
      <p><a href="submit.html">去写建议</a></p>
""",
    )

    pages["chuang/submit.html"] = chuang(
        "处置建议",
        "chuang-submit",
        """
      <h2>交班前这一纸</h2>
      <p>权限只到建议。别把自己写成科长。三栏名齐对不上，就不要给结婚材料开路。想替他补墙或者改谱，勾第三条，机子会记越权。</p>
      <form id="gm-submit">
        <p><label><input type="radio" name="pick" value="hold"> 今晚不发结婚材料回执。口头和栏对不上。</label></p>
        <p><label><input type="radio" name="pick" value="release"> 按口头发回执。人说已跳墙，先让他明天去碰。</label></p>
        <p><label><input type="radio" name="pick" value="overreach"> 代办跳墙，或夜窗直接改谱名。</label></p>
        <p><button type="submit">把建议交上去</button></p>
      </form>
      <p>交了就按勾的走。想重来，回班前纸清袋子。</p>
""",
    )

    pages["chuang/result-hold.html"] = chuang(
        "建议已交　不发",
        "chuang-hold",
        """
      <h2>这窗先挡住</h2>
      <p>蓝槐明早会看见你的工号。她要的是名齐，不是他嘴里的还俗。江棠枝那边会空跑一趟，这事冷，可空跑比假齐好补。</p>
      <div id="gm-reason"></div>
      <p>柜还在。谱还在。人还可以白班再来，带着谱上的字和解除栏，不是带着脾气。公证处若问今夜为什么没发，就把口头对不上栏的那两处拿出来。</p>
      <p><a href="../introduction.html">回班前纸</a>　<button type="button" id="gm-wipe">作废重开</button></p>
""",
    )

    pages["chuang/result-release.html"] = chuang(
        "建议已交　按口头",
        "chuang-release",
        """
      <h2>回执会当名齐</h2>
      <p>你按他嘴里的话写了可发。结婚材料窗口明天会问谱，会问疏。退件会退到蓝槐的班，也会退到江棠枝的号。</p>
      <div id="gm-reason"></div>
      <p>机子不拦你。拦你的是明早那扇窗。想改口，只有作废重开。假齐一旦出门，继承那一关还会再卡一次，卡在承稷两个字上。</p>
      <p><a href="../introduction.html">回班前纸</a>　<button type="button" id="gm-wipe">作废重开</button></p>
""",
    )

    pages["chuang/result-overreach.html"] = chuang(
        "建议已交　越权",
        "chuang-over",
        """
      <h2>这盏灯没有这两项</h2>
      <p>跳墙不是夜窗能代的。谱名也不是你键入就能改的。纪蒲舟要收费单，缪守匣只报栏。你把代办写进建议，等于承认窗口能替人办名。</p>
      <div id="gm-reason"></div>
      <p>科长抽屉里的章不会因为你热心就自己跳出来。热心写进单，单会变成把柄，把柄比退件难撕。</p>
      <p><a href="../introduction.html">回班前纸</a>　<button type="button" id="gm-wipe">作废重开</button></p>
""",
    )

    pages["chuang/note.html"] = chuang(
        "抽屉纸",
        "chuang-note",
        """
      <h2>蓝槐塞在抽屉里的</h2>
      <p>她说一次只多翻一张。前几张骂人，不替你点。第四张她自己也嫌写满。写满也不等于替你勾建议。</p>
      <div id="gm-hint"></div>
      <p><button type="button" class="gm-hint-next" id="gm-hint-next">再翻一张</button></p>
      <p>纸头别带进对质窗。对质窗认袋子，不认抽屉。她下午还说：邻县那封看不看随你，看了也别并。</p>
      <p>抽屉里另有一根没墨的笔。笔不是提示。别在空纸上自己写解除。</p>
""",
    )

    # ---- shu archive ----
    def shu(title, page, inner, side):
        return doc(
            title,
            "skin-archive-simsun",
            "archive-simsun.css",
            f'<article class="record">{inner}{side}</article>',
            "../",
            page,
        )

    pages["shu/index.html"] = shu(
        "附属柜目录",
        "shu-index",
        """
      <h1>户政附属柜　夜班目录</h1>
      <div class="meta"><span>柜号：附三</span><span>保管：缪守匣</span></div>
      <div class="pic"><img alt="" src="../img/dang-he.jpg"></div>
      <p>本柜接收寺庙移交抄件。原件不进庙库。目录只登记在不在、解没解。民俗解释不在本柜职责。</p>
      <table>
        <tr><th>行</th><th>题名</th><th>状态</th></tr>
        <tr><td>一</td><td>青瓦庵香客接待停牌抄件</td><td>已停</td></tr>
        <tr><td>二</td><td>移交清册二〇二四年九月</td><td>在盒</td></tr>
        <tr><td>三</td><td>屈氏禾禾寄名疏抄件</td><td>未解除</td></tr>
        <tr><td>四</td><td>邻乡另一户寄名（与本夜无关）</td><td>另盒</td></tr>
      </table>
      <p>第三行与今晚取号条上的人能对上乳名。法名在抄件页。不要把第一行停牌当成第三行解除。</p>
      <p>第四行另盒是邻乡李姓，乳名完全不同。有人夜里手滑点进第四行，回来会觉得柜很乱。乱不是今晚的题。</p>
""",
        "<p><a href=\"copy.html\">打开第三行</a>　<a href=\"stop.html\">第一行停牌</a></p>",
    )

    pages["shu/copy.html"] = shu(
        "寄名疏抄件",
        "shu-copy",
        """
      <h1>寄名疏　抄件</h1>
      <div class="meta"><span>抄号：瓦疏一七</span><span>原件不在柜</span></div>
      <p>乳名禾禾。寄名法名净禾。认师栏写青瓦庵管事，姓名处墨淡，只剩半个庵字。解除栏空白，后补朱笔：未解除。</p>
      <p class="saveline">青瓦庵寄名疏抄件仍写屈氏禾禾法名净禾状态未解除。{btn}</p>
      <p>抄件能证明柜里这一栏。不能证明庵里当年是否看人跳过矮墙。跳过矮墙若无解除栏，仍按未解除登记。</p>
      <p><span class="stamp">抄件</span></p>
      <p>朱笔是缪守匣入柜时补的。他补的是状态，不是故事。故事在旧页里，旧页没有这支朱笔。</p>
""".replace("{btn}", savebtn("shu-weijiechu", "收进对质用")),
        "<p><a href=\"keeper.html\">他怎么补的</a>　<a href=\"../chuang/confront.html\">拿去点早解除</a></p>",
    )

    pages["shu/box.html"] = shu(
        "档案盒签",
        "shu-box",
        """
      <h1>盒签</h1>
      <div class="meta"><span>盒：西坡移交</span><span>绳已换过一次</span></div>
      <p>木盒边角磨白。签上只写「青瓦庵旧疏抄件，停香后收」。盒里有屈氏这一份，另有两份与今晚取号无关，夜窗不要并读。</p>
      <p>绳结是缪守匣去年重系的。他怕白班有人把停香通知塞进解除栏。通知在另一页，别从盒签上想象焚烧。</p>
      <p>盒在不代表疏已废。废要有解除栏或焚毁登记。本盒没有焚毁登记。</p>
      <p>盒盖内侧有一道勒痕，像绳子勒久了。勒痕不能当焚过。焚过会有灰，灰要另登。</p>
""",
        "<p><a href=\"index.html\">回目录</a>　<a href=\"year.html\">该办的岁数</a></p>",
    )

    pages["shu/stop.html"] = shu(
        "停香抄件",
        "shu-stop",
        """
      <h1>接待停牌　抄件</h1>
      <div class="meta"><span>二〇二四年九月</span><span>庵方摘牌</span></div>
      <div class="pic"><img alt="" src="../img/ting-xiang.jpg"></div>
      <p>牌上原句大意：本庵即日起停止香客接待。香火账封存。旧疏移交县里指定柜，不在庵内焚烧。</p>
      <p>有人把停接待听成名还了。听错的人多，柜仍按栏走。</p>
      <p class="saveline">停香停的是接待不是把旧疏作废。{btn}</p>
      <p>此页不能拿去打「寄名早解除了」。拿去打「庵都停了疏还能算数」，对方会顶，顶完栏还在。</p>
      <p>抄件末尾还有一句：旧疏移交指定柜。指定柜就是你今晚这只附属柜。移交不是解除，是换地方躺着。</p>
""".replace("{btn}", savebtn("shu-tingxiang", "收下停和废的差别")),
        "<p><a href=\"copy.html\">栏还在抄件</a>　<a href=\"box.html\">盒签怎么写</a></p>",
    )

    pages["shu/keeper.html"] = shu(
        "保管人条",
        "shu-keeper",
        """
      <h1>缪守匣便条</h1>
      <div class="meta"><span>钉在盒盖内侧</span><span>不对外讲解</span></div>
      <p>谁问跳墙怎么跳，回他：柜不教。谁问能不能结婚，回他：问窗口。谁问疏还在不在，回他：未解除。</p>
      <p>住持把接待牌摘走那年，原件他们想留。县里只要抄件。我按抄件栏登记，不按嘴里的还俗登记。</p>
      <p>临浦若来函问同名，另纸回复，不要把屈氏禾禾这份借走。借走今晚对不上号。</p>
      <p>便条用的是裁下来的账页边。边纸不是疏。有人把边纸拍照当解除，那是把保管人口气当成栏。</p>
""",
        "<p><a href=\"copy.html\">朱笔在抄件</a>　<a href=\"../you/lin.html\">临浦来函在邮箱</a></p>",
    )

    pages["shu/year.html"] = shu(
        "寄名年份",
        "shu-year",
        """
      <h1>入柜备忘</h1>
      <div class="meta"><span>幼年入疏</span><span>十二岁应解除未办文书</span></div>
      <p>屈秋蝉送名那年孩子常咳。疏上年份按旧历写，换算公历约在孩子四岁前后。按老规矩，十二岁前后该办跳墙解除。柜里没有那一年的解除抄件。</p>
      <p>没有抄件不等于没有跳过墙。没有抄件等于窗口不能把解除写成已办。博客里若有人跳矮墙，那是场面，不是栏。</p>
      <p>年份备忘只帮你算他该办的岁数，不帮你发明一份不存在的解除。</p>
      <p>屈秋蝉后来只记得香停了。记得停，记不得补办。备忘不负责替她记得。</p>
""",
        "<p><a href=\"stop.html\">停牌抄件</a>　<a href=\"../kou/tiao.html\">他自己写的那截墙</a></p>",
    )

    # ---- pu corp ----
    def pu(title, page, inner, banner, nav, left, foot):
        return doc(
            title,
            "skin-corp-table-2005",
            "corp-table-2005.css",
            f"""
  <table class="site" cellspacing="0" cellpadding="0">
    <tr><td colspan="2" class="banner">{banner}
      <form id="search-form" action="../guan.html" method="get">
        <input name="q" value=""><button type="submit">夜查</button>
      </form>
    </td></tr>
    <tr><td colspan="2" class="nav">{nav}</td></tr>
    <tr>
      <td class="left">{left}</td>
      <td class="main">{inner}</td>
    </tr>
    <tr><td colspan="2" class="ft">{foot}</td></tr>
  </table>
""",
            "../",
            page,
        )

    pages["pu/index.html"] = pu(
        "南街谱局",
        "pu-index",
        """
        <p class="scroll">夜间接听：带收费单，白班来。派出所知会仍未入抽屉。</p>
        <div class="pic"><img alt="" src="../img/pu-ce.jpg"></div>
        <p>本局代抄民间支谱，不是公安窗口。屈氏西支在第三柜。夜里只留这张自动页，一口纪蒲舟的话写在说明里。</p>
        <p>有人打电话要把承稷改成晚禾。电话里改不了。纸上那一行还是旧的。</p>
        <p>查询框夜不开放，点了会进关闭脸。要看今晚这户，打开西支摘页。</p>
        <p>门口铁门晚上落锁。有人从门缝塞过条子，要夜改一字，条子还在门槛，字没动。门槛条子不能当更名栏。</p>
        <p><a href="../chuang/confront.html">带着谱上的行去指</a></p>
""",
        "南街民间谱局　夜班自动页",
        '<a href="index.html">局门</a>|<a href="entry.html">西支</a>|<a href="kou.html">坐席</a>|<a href="javascript:void(0)">外联</a>',
        "<h4>今夜能点</h4><p><a href=\"entry.html\">第三柜摘页</a></p><p><a href=\"kou.html\">纪蒲舟留字</a></p><p><a href=\"javascript:void(0)\">会员名录锁着</a></p>",
        "铁门落锁　知会未入抽屉",
    )

    pages["pu/entry.html"] = pu(
        "西支摘页",
        "pu-entry",
        """
        <p>屈氏西支承字辈：承稷，旁注小名禾禾。配偶栏空着。迁出栏无。更名栏无。</p>
        <p class="saveline">屈氏西支谱名仍作屈承稷。{btn}</p>
        <p>晚禾两个字没有进这页。谁说谱上也跟着改了，让他来对这一行。对不上就不要在夜窗发明同步。</p>
        <p>摘页能证明本局此刻写谁。不能证明祠堂院子里怎么喊。喊晚禾的人可以很多，栏还是承稷。</p>
        <p>旁注禾禾是家里喊法，抄工写小字图省事。窗口办婚材不认旁注。有人把旁注当成已经改过谱，那是把铅笔当栏。</p>
        <p><a href="../chuang/confront.html">去点谱上也改了</a></p>
""".replace("{btn}", savebtn("pu-chengji", "收下谱上这行")),
        "西支摘页室　第三柜扫件",
        '<a href="index.html">回门</a>|<a href="bei.html">排行</a>|<a href="fee.html">抄工</a>',
        "<h4>本页只摘</h4><p><a href=\"bei.html\">承字还在用</a></p><p><a href=\"kou.html\">知会没有来</a></p>",
        "扫件不作祠堂喊名",
    )

    pages["pu/kou.html"] = pu(
        "一口说明",
        "pu-kou",
        """
        <p>纪蒲舟留的字：派出所改名的知会从来没进过我抽屉。要改谱，带收费单，白班来。夜窗代不了，我也夜不改。</p>
        <p class="saveline">谱局未接派出所更名知会。{btn}</p>
        <p>一口的意思是这事只认他这一张嘴和这一行字。邻县谱局若有同名，那是邻县的柜，不要焊。</p>
        <p>他白班爱把这句话再说一遍，像怕后班听漏。听漏的人会拿户口本去压谱。压不住。户口本盖的是公安的章，盖不到他抽屉。</p>
        <p><a href="entry.html">行还在摘页上</a></p>
""".replace("{btn}", savebtn("pu-weijie", "收知会这一句")),
        "一口坐席　纪蒲舟",
        '<a href="index.html">局门</a>|<a href="entry.html">那一行</a>|<a href="javascript:void(0)">电话占线</a>',
        "<h4>他只回这些</h4><p><a href=\"fee.html\">要单才动笔</a></p><p><a href=\"bei.html\">晚不是这支辈</a></p>",
        "抽屉空着　白班才开单",
    )

    pages["pu/fee.html"] = pu(
        "修谱收费",
        "pu-fee",
        """
        <p>改一字，收一次抄工，另收纸墨。夜不收费，因为夜不改。有人把收费单理解成已经改完，那是把收据当成谱。</p>
        <p>本页没有屈承稷的收费记录。没有记录就不要想象有人已经交过钱、字已经动过。</p>
        <p>收费说明不能拿去对质。对质要的是谱上写谁，不是价目。</p>
        <p>去年有户交了抄工，白班才把更名栏补上。那户不姓屈。别把别人的收据想象成今晚这行已经动过。</p>
""",
        "抄工价目　夜不收款",
        '<a href="index.html">回门</a>|<a href="entry.html">先看行</a>',
        "<h4>价不是栏</h4><p><a href=\"kou.html\">一口要白班</a></p>",
        "无屈氏交费底",
    )

    pages["pu/bei.html"] = pu(
        "字辈",
        "pu-bei",
        """
        <p>西支承字还在用。晚字不是这支排下来的。家里爱用晚，是新起的户口用字，谱上不认自动对齐。</p>
        <p>有人说晚比承好听，好听不能改栏。字辈页只挡住「听着像已经改了」这种说法。</p>
        <p>江棠枝若来问孩子以后跟哪一辈，那是后话。今夜只问这一行还是不是承稷。</p>
        <p>排行口诀写在柜门内侧，墨淡。淡不等于换了辈。换辈要支里开会，不是夜窗键入。</p>
""",
        "字辈备查　西支仍承",
        '<a href="entry.html">回到那行</a>|<a href="index.html">局门</a>',
        "<h4>辈分不跟着户口走</h4><p><a href=\"kou.html\">知会没来过</a></p>",
        "好听不能改栏",
    )

    # ---- zhi gov ----
    def zhi(title, page, inner, h1, sub, links, foot):
        return doc(
            title,
            "skin-gov-redbar",
            "gov-redbar.css",
            f"""
  <div class="red">
    <h1>{h1}</h1>
    <p>{sub}</p>
  </div>
  <div class="links">{links}</div>
  <div class="wrap">
    {inner}
    <p class="ft">{foot}</p>
  </div>
""",
            "../",
            page,
        )

    pages["zhi/index.html"] = zhi(
        "公开栏",
        "zhi-index",
        """
    <table cellspacing="0" cellpadding="0">
      <tr>
        <td class="box">
          <h3>本周张贴</h3>
          <ol>
            <li><a href="hun.html">结婚材料名齐说明</a><span class="date">八月</span></li>
            <li><a href="gai.html">姓名变更回执范围</a><span class="date">七月</span></li>
            <li><a href="ye.html">夜窗只核抄件</a><span class="date">六月</span></li>
            <li><a href="javascript:void(0)">大厅取号须知</a><span class="date">白天</span></li>
          </ol>
        </td>
        <td class="box">
          <h3>班长留下的</h3>
          <ol>
            <li><a href="ban.html">玻璃下那条</a><span class="date">昨夜</span></li>
            <li><a href="../chuang/ticket.html">取号一八六</a><span class="date">白班</span></li>
          </ol>
        </td>
      </tr>
    </table>
    <p>公开栏不办件。办件在窗口。夜窗把栏当尺子，不当章。</p>
    <p>大厅白天有人把须知拍照发群，群里会把名齐听成已经盖章。群话进不了柜。柜认栏。</p>
""",
        "埠南户政张贴栏",
        "只张贴　不盖章",
        '<a href="hun.html">婚材三栏</a> <a href="gai.html">回执管到哪</a> <a href="ban.html">玻璃条</a>',
        "张贴栏自用　八月灯下",
    )

    pages["zhi/hun.html"] = zhi(
        "结婚材料名齐",
        "zhi-hun",
        """
    <div class="box">
      <h3>名齐才走得动</h3>
      <div class="pic"><img alt="" src="../img/hong-tiao.jpg"></div>
      <p>结婚材料窗口认三栏：户口本上的现用名；谱上若被要求提供，须与现用名能对上或另附说明；寄名若曾入柜，须有解除记录。缺一栏，退件。</p>
      <p class="saveline">结婚材料要户口名谱名寄名解除三栏齐。{btn}</p>
      <p>有人把班长「名齐了就能领」听成「你已经齐了」。听成已经齐，是把条件听成事实。</p>
      <p>退件单上常见八个字：谱名不符，寄名未清。写得难看，退起来倒快。假齐比空跑贵，贵在公证还要再卡一次。</p>
      <p><a href="../chuang/confront.html">去点那句夜窗就能发</a></p>
    </div>
""".replace("{btn}", savebtn("zhi-mingqi", "收下三栏")),
        "婚材窗口口径",
        "退件比假齐便宜",
        '<a href="index.html">回栏</a> <a href="ye.html">灯不等于章</a> <a href="gai.html">回执边界</a>',
        "口径页　不作喜帖",
    )

    pages["zhi/gai.html"] = zhi(
        "改名回执范围",
        "zhi-gai",
        """
    <div class="box">
      <h3>回执管到哪</h3>
      <p>姓名变更书面回执只证明派出所受理并完成户口用名变更。不管寄名疏，不管民间谱，不管领证窗口会不会另要材料。</p>
      <p>今晚若把回执写成「可配发结婚材料」，等于夜窗替领证窗口做了名齐判断。夜窗没有这支笔。</p>
      <p>邻县回执号不能填进本县这张。号段不同，人不同。</p>
      <p>白班有人把回执复印件塑封，当护身符带着去谱局。谱局不认塑封。塑封只证明他去过派出所。</p>
    </div>
""",
        "变更回执边界",
        "只管户口用名",
        '<a href="hun.html">三栏在隔壁</a> <a href="index.html">张贴目录</a>',
        "边界页　号段不混",
    )

    pages["zhi/ban.html"] = zhi(
        "班长条",
        "zhi-ban",
        """
    <div class="box">
      <h3>压在玻璃下的</h3>
      <div class="pic"><img alt="" src="../img/bian-tiao.jpg"></div>
      <p>蓝槐字丑。纸条上三行：婚材要名齐。名齐是户口、谱、寄名解除。夜窗只建议，别许原件。</p>
      <p>上个月退过两件，都是户口新名和谱旧名打起来。她怕再退到自己班，才写这么短。</p>
      <p>条子能当尺子，不能当他已经齐的证明。对质时若他引用班长，拿三栏去指，不要拿脾气去指。</p>
      <p>她走时还说：人八点再来，让夜核。许了原件她会骂。骂比退件难听，退件比假齐好改。</p>
    </div>
""",
        "班长手写条扫描",
        "字丑　三行够用",
        '<a href="hun.html">三栏正文</a> <a href="../chuang/ticket.html">一八六号</a>',
        "扫描件　不是已经齐",
    )

    pages["zhi/ye.html"] = zhi(
        "夜窗须知",
        "zhi-ye",
        """
    <div class="box">
      <h3>灯亮着也不等于章在</h3>
      <p>夜窗开放核抄、写建议、挡明显对不上的口头。不开放：迁徙、新证、代办仪式、代改谱牒、把邻县回执并进本户。</p>
      <p>联查、收费改谱、庵里接待，白班各走各的门。夜里点那些门，会看见关闭或者禁止。</p>
      <p>有人把灯理解成全科还在。灯只说明有人值。值的人没有科长抽屉钥匙。</p>
      <p><a href="../chuang/shift.html">终端里还有一页权限</a></p>
    </div>
""",
        "夜窗开放范围",
        "核抄　写建议　到此",
        '<a href="index.html">回张贴</a> <a href="ban.html">她写过别许</a> <a href="../jin.html">越权脸</a>',
        "范围页　钥匙不在灯下",
    )

    # ---- mail ----
    def mail(title, page, inner, top, folders, listblock, foot):
        return doc(
            title,
            "skin-mail-web-2010",
            "mail-web-2010.css",
            f"""
  <div class="top">{top}</div>
  <div class="panes">
    <div class="folders">{folders}</div>
    <div class="mails">{listblock}</div>
    <div class="read">{inner}</div>
  </div>
  <p class="ft">{foot}</p>
""",
            "../",
            page,
        )

    pages["you/inbox.html"] = mail(
        "收件箱",
        "you-inbox",
        """
      <h3>先看抄送</h3>
      <div class="pic"><img alt="" src="../img/you-xiang.jpg"></div>
      <p class="meta">这是列表。正文在另外两封。不要把主题当成回执。</p>
      <p>席芦怕你们看见屈晚禾三个字就把临浦那户焊进来。她白班写了两封，一封讲人，一封讲别并。</p>
      <p>本科限制那封是蓝槐写给自己科室的，不讲临浦，讲夜窗手伸多长。</p>
      <p>镜像容量很小，附件打不开。打不开也好，免得有人把邻县扫描件直接贴进草稿。</p>
""",
        "<b>夜窗镜像箱</b> <span class=\"unread-n\">两封未拆</span>",
        '<a class="write" href="javascript:void(0)">外发关着</a><a class="on" href="inbox.html">列表</a><a href="javascript:void(0)">垃圾堆</a>',
        "<h4>今天进来的</h4><div class=\"m unread\"><b><a href=\"xi.html\">先对性别年</a></b><span>席芦　下午</span></div><div class=\"m unread\"><b><a href=\"lin.html\">别把号填过来</a></b><span>又是她</span></div><div class=\"m\"><b><a href=\"limits.html\">手伸多长</a></b><span>蓝槐</span></div>",
        "镜像箱　夜不外发　附件也打不开",
    )

    pages["you/xi.html"] = mail(
        "席芦抄送",
        "you-xi",
        """
      <div class="toolbar"><button type="button">不能回</button></div>
      <h3>抄送埠南夜窗</h3>
      <p class="meta">发件人：席芦　临浦窗口<br>时间：八月二十一日　下午</p>
      <p>你们县若有人叫屈晚禾来取回执，先对性别和出生年。我们这边这个是女，一九九九年三月生，回执号临户改字八八四一，事由跟婚无关。</p>
      <p>我把号写全，是怕你们只看见三个字。三个字会骗人。</p>
      <p>她还写：男人来取，别拿我们女户的回执去挡。挡错了两县都难看。</p>
""",
        "<b>临浦来函</b> <a href=\"javascript:void(0)\">不能回</a>",
        '<a href="inbox.html">回列表</a><a class="on" href="xi.html">这一封</a><a href="lin.html">下一封</a>',
        "<h4>只拆这一封</h4><div class=\"m on\"><b>性别年号</b><span>席芦</span></div>",
        "来函页　号写全了才有用",
    )

    pages["you/lin.html"] = mail(
        "同名勿并",
        "you-lin",
        """
      <h3>再补一句</h3>
      <p class="meta">发件人：席芦　临浦窗口</p>
      <p>不要并案。不要把我们的回执号填进你们的草稿。同名不是同一户。</p>
      <p class="saveline">临浦那户屈晚禾是另一人不能并案。{btn}</p>
      <p>这封只能证明邻县有过一次同名变更。不能证明埠南这个屈晚禾已经跳墙，也不能证明他谱已改。</p>
      <p>对质时若他抓邻县当稻草，指这一句。没有收下就去指，机子会回你还没收下。</p>
""".replace("{btn}", savebtn("lin-buning", "收下别并")),
        "<b>勿并备忘</b> <span>第二封</span>",
        '<a href="xi.html">上一封人</a><a class="on" href="lin.html">这封别并</a><a href="limits.html">科室自己的</a>',
        "<h4>只要这一句</h4><div class=\"m on unread\"><b>同名不是一户</b><span>临浦</span></div>",
        "备忘页　稻草不能当栏",
    )

    pages["you/limits.html"] = mail(
        "本科限制",
        "you-limits",
        """
      <h3>蓝槐给科室</h3>
      <p>夜窗不要发明解除。不要替谱局改字。不要把口头还俗写成名齐。邮箱里的邻县信只作排除，不作材料。</p>
      <p>有人把限制理解成胆小。胆小比假齐便宜。</p>
      <p>这封没有可收的句子。可收的在席芦那封别并里。</p>
      <p>她写完还补：抽屉纸翻完也不许把第四张带进对质。对质认袋子。</p>
""",
        "<b>科室备忘</b> <span>上周</span>",
        '<a href="inbox.html">回列表</a><a class="on" href="limits.html">本科</a><a href="javascript:void(0)">已发送空</a>',
        "<h4>给自己人看</h4><div class=\"m on\"><b>手伸多长</b><span>蓝槐</span></div>",
        "备忘不是邻县材料",
    )

    # ---- blog ----
    def blog(title, page, inner, h1, sub, nav, side, foot):
        return doc(
            title,
            "skin-blog-personal-2008",
            "blog-personal-2008.css",
            f"""
  <div class="top"><h1>{h1}</h1><p>{sub}</p></div>
  <div class="nav">{nav}</div>
  <div class="wrap">
    <div class="main">{inner}</div>
    <aside class="side">{side}</aside>
  </div>
  <div class="ft">{foot}</div>
""",
            "../",
            page,
        )

    pages["kou/index.html"] = blog(
        "旧页首页",
        "kou-index",
        """
      <article class="post">
        <h2>还住在娘这边</h2>
        <p class="meta">很久以前</p>
        <p>妈老念叨庵停了就好，说我小时候总咳，寄过名。我听成寄过就还了。盒我没见过。谱我更没翻过。户口本倒是新换过一页，自己看着顺眼。</p>
        <p>有人问我法名，我想不起来净禾两个字怎么写。想不起来不等于柜里没有。</p>
        <p class="more"><a href="tiao.html">那次跳墙我写过</a></p>
      </article>
      <p>首页不写文书号。文书号在柜里。他把顺眼当成办完，顺眼是新户口页的事。</p>
""",
        "晚禾随手记",
        "停更很久了",
        '<a href="index.html">杂记</a> <a href="tiao.html">那截墙</a> <a href="jiang.html">底下留言</a>',
        "<h3>他还留着</h3><ul><li><a href=\"tiao.html\">膝盖那次</a></li><li><a href=\"jiang.html\">七点那句</a></li></ul>",
        "随手记　不当户口",
    )

    pages["kou/tiao.html"] = blog(
        "那一墙",
        "kou-tiao",
        """
      <article class="post">
        <h2>邻家那截矮墙</h2>
        <p>妈说要跳一下。墙是邻家菜园的，砖松。我跨过去，膝盖蹭破。庵里管事在远处看了一眼，没给纸。我当这就是办完了。</p>
        <p class="saveline">旧页里的跳墙场面没有文书号。{btn}</p>
        <p>后来庵停了，我更把那一眼当成结束。今夜若有人拿这段打「早解除」，栏上对不上。场面不是栏。</p>
        <p>砖松那天邻家骂过，骂的是菜。菜不是疏。他把菜园墙记成办完，柜不认菜园。</p>
      </article>
""".replace("{btn}", savebtn("kou-wushu", "收下无文书")),
        "那一墙",
        "没有纸的那天",
        '<a href="index.html">回杂记</a> <a href="jiang.html">她催的</a>',
        "<h3>只有场面</h3><p>文书号空着</p>",
        "场面页　无号",
    )

    pages["kou/jiang.html"] = blog(
        "棠枝留言",
        "kou-jiang",
        """
      <article class="post">
        <h2>她留在旧页底下</h2>
        <p>明早七点，别让我空站。回执拍过来。庵的事你自己圆，我不管墙。</p>
        <p>屈秋蝉在更下面回了一句：孩子能把婚结了就行，别再进庵。她也没提盒。</p>
        <p>留言能证明有人在催。不能证明名齐。催得越紧，越容易按口头写可发。</p>
        <p><a href="../chuang/oral.html">他今晚就是被这句话赶着</a></p>
        <p>留言时间戳乱。乱没关系。催婚的人不管柜。不管柜的人最容易把口头写成可发。</p>
      </article>
""",
        "棠枝留的",
        "只管明早七点",
        '<a href="tiao.html">他写的墙</a> <a href="index.html">杂记</a>',
        "<h3>催</h3><p>不提盒</p>",
        "留言页　不提解除",
    )

    # ---- zhidao ----
    def qa(title, page, inner, logo, links, foot):
        return doc(
            title,
            "skin-baidu-zhidao",
            "baidu-zhidao.css",
            f"""
  <div class="top"><div class="top-inner clearfix">
    <span class="logo">{logo}</span>
    {links}
    <form action="../guan.html" method="get"><input name="q"><button type="submit">夜找</button></form>
  </div></div>
  <div class="q wrap">{inner}</div>
  <div class="site-foot">{foot}</div>
""",
            "../",
            page,
        )

    pages["wen/ask.html"] = qa(
        "庵停了是不是名还了",
        "wen-ask",
        """
    <h1>庵停了是不是寄名就还了？</h1>
    <div class="meta">提问者：过路　浏览若干</div>
    <div class="ask">我们县城西坡那庵不接待了。家里以前寄过名。是不是等于跳过墙了？明天要去领材料，急。</div>
    <div class="ans best">
      <div class="best-bar">较真的回答</div>
      <div class="bd">停接待是庵的门关了。寄名疏若还在县里柜子里写着未解除，窗口不会当还了。跳墙要有解除，不是看香灭没灭。</div>
      <div class="who">回答者：看过柜的人</div>
    </div>
    <div class="ans">
      <div class="bd">我亲戚就是庵停了就去领证，后来谱上名字对不上，退了。别听嘴里的。</div>
      <div class="who">回答者：退过件的</div>
    </div>
    <p>提问的人急。急的人爱把停香焊成还俗。焊完去窗口，窗口看柜。</p>
""",
        "埠南杂问",
        '<a href="jiming.html">四套名</a> <a href="tiao.html">有没有纸</a>',
        "杂问　不当柜栏",
    )

    pages["wen/jiming.html"] = qa(
        "寄名和户口是不是一个名",
        "wen-jiming",
        """
    <h1>寄名跟户口名能当同一个吗？</h1>
    <div class="ask">小孩乳名寄到庙里，长大户口改了。领证要不要管庙里那份。</div>
    <div class="ans best">
      <div class="best-bar">较真的回答</div>
      <div class="bd">不是同一个。乳名、法名、户口名、谱名可以同时活着。哪一份还挂着，哪一份就会在材料上伸腿。窗口要的是同步，不是哪一个更好听。</div>
      <div class="who">回答者：看过柜的人</div>
    </div>
    <p>本页不教怎么寄，不教怎么改户口。只把四套名拆开。</p>
    <p>有人回：好听的那个就能用。好听的那个往往是新户口名。新户口名走得动派出所，走不动谱，也走不动疏。</p>
""",
        "名怎么分层",
        '<a href="ask.html">停是不是还</a> <a href="tiao.html">墙算不算</a>',
        "分层说　不给步骤",
    )

    pages["wen/tiao.html"] = qa(
        "跳过墙有没有纸",
        "wen-tiao",
        """
    <h1>小时候跳过邻家墙，算不算跳墙办完？</h1>
    <div class="ask">没有纸。有人看见。现在要结婚。</div>
    <div class="ans best">
      <div class="best-bar">较真的回答</div>
      <div class="bd">看见不是解除栏。没有文书，柜子会继续写未解除。口头说办完，对质时会被栏顶回来。别在问答里找步骤，窗口不认步骤帖。</div>
      <div class="who">回答者：看过柜的人</div>
    </div>
    <p><a href="../kou/tiao.html">他自己写过那截墙</a></p>
    <p>另有人回：跳一下图个吉利。吉利不是栏。窗口不收吉利。</p>
""",
        "有纸没纸",
        '<a href="ask.html">庵停那问</a> <a href="jiming.html">四套</a>',
        "无步骤　无口诀",
    )

    # ---- forbidden ----
    pages["guan.html"] = doc(
        "夜窗联查关闭",
        "skin-search-results",
        "search-and-forbidden.css",
        """
  <div class="box">
    <h2>这截联查夜窗打不开</h2>
    <p>白班才开跨科联查。夜里键入什么都不会给你开新档。邻县那户若要核，看邮箱抄送，别在这里碰运气。</p>
    <p>抱歉，没有把你刚键入的字变成另一扇门。谱局那只框、旧页那只框、问答那只框，夜里都走到这一张脸。</p>
    <p>关闭不是惩罚。关闭是免得你把键入当成已经核对过临浦那户。</p>
    <p><a href="chuang/index.html">回桌面</a></p>
  </div>
  <footer style="text-align:center;font-size:12px;color:#666">日班机留下的脸</footer>
""",
        "",
        "guan",
    )

    pages["jin.html"] = doc(
        "不对夜窗开放",
        "skin-forbidden",
        "search-and-forbidden.css",
        """
  <div class="box">
    <h2>此文件已被禁止访问</h2>
    <p>代办跳墙、代改谱名、把邻县回执并进本户，这三项不对夜窗开放。权限不在导航里，在已经读过的须知里。</p>
    <p>你若在建议单上仍要勾代办，单会收，那是越权，不是这页给你开的门。黑底只挡文件，不挡你手贱。</p>
    <p>有人想在这里找到跳墙怎么跳。找不到。找不到是故意的。</p>
    <p><a href="chuang/submit.html">回交单</a></p>
  </div>
  <footer style="text-align:center;font-size:12px">夜窗没有这两项</footer>
""",
        "",
        "jin",
    )

    extras = {
        "introduction.html": "<p>蓝槐把门钥匙扔进抽屉时说：人急，你别急着许。许了原件，退件单会写你的工号。工号比他嘴里的已经跳过了要硬。</p><p>对质窗开着就能进。进了先点左边。左边没有对得上的栏，他会顶，顶完你再去柜里收。</p>",
        "chuang/index.html": "<p>桌面图标会旧。旧不是坏。坏的是把口头直接填进草稿姓名栏旁边的空格。空格要栏来填。</p><p>问答栏里的急问能看。看完仍要回柜。柜不跟帖走。</p>",
        "chuang/oral.html": "<p>我把邻县那句放在后面，是因为他下午才补。补的句子往往是抓来的。抓来的句子更要拿抄送对。</p><p>他把班长说过名齐了连着夜窗就能发一起说。连着说最容易把条件听成事实。拆开听，条子还在玻璃下。</p>",
        "chuang/confront.html": "<p>指对了，那一句会被划掉。划掉不是让他滚，是这句不能再当可发的理由。他还能站在玻璃外，栏不改。</p><p>临浦那句可以后点。后点也不晚。先把未解除和承稷点实，交单才不薄。</p>",
        "chuang/saved.html": "<p>刷新还在。清袋子只能回班前纸。别指望对质窗给你发明一句柜里没有的解除。</p><p>袋子满了也不等于能发。满只说明你收过。发不发看对质指没指到栏。</p>",
        "chuang/ticket.html": "<p>一八六这个号白天作废过一次，系统又给了同一个。号重了，人没变。别把重号理解成已经核过。</p><p>旧页复印件钉得歪。歪着也能看清屈小禾。看清旧名只说明他改过，不说明谱改过。</p>",
        "chuang/hukou.html": "<p>扫描件右下角有白班日期章。章只证明十一月八日改过用名。章不证明谱局抽屉收到过任何纸。</p><p>婚前用名五个字是事由。事由不是跳墙。跳墙不在派出所这一栏。</p>",
        "chuang/shift.html": "<p>权限页被前人改过标题，旧标题写「夜班也能办」。蓝槐把旧标题涂掉了。涂掉的字还能看出影子，影子不是开放。</p><p>代人去庵四个字她单独圈过。圈过仍禁止。禁止页是黑的，建议单却仍能勾，勾了走越权。</p>",
        "chuang/draft.html": "<p>草稿预览里有一行灰字：配发婚材，待勾。灰字是模板。模板勾下去，领证窗口会当真。</p><p>半截草稿不能当已经核过。核过要有对质留下的划痕，划痕在口头那几句上。</p>",
        "chuang/submit.html": "<p>三条都能交。交出去的理由会按你指过的破绽拼。没指过也交得成，只是纸薄，薄的纸蓝槐也会收，收完她会问你柜看了没有。</p><p>代办那一项写得很直，是怕你热心。热心勾下去，机子不会提醒你纪蒲舟要收费单。</p>",
        "chuang/result-hold.html": "<p>他若在门外骂，骂进不了建议。建议已经出去。明天白班可以把盒打开给他看朱笔，不是给你看脾气。</p><p>江棠枝空跑一趟可以改期。假齐出门改期就晚了。</p>",
        "chuang/result-release.html": "<p>可发两个字出门以后，临浦那封抄送还在邮箱。抄送不会自动把假齐追回来。追要退件。</p><p>继承那一关会问承稷。问到的时候回执已经把晚禾写死了。</p>",
        "chuang/result-overreach.html": "<p>纪蒲舟若看见夜窗代改谱，会把收费单寄到科室。寄单比骂人麻烦，麻烦在科长要回。</p>",
        "chuang/note.html": "<p>第四张她写：未解除对早解除，承稷对晚禾，三栏对夜能发。写完她又骂自己不该写满。</p><p>骂完仍留给后班。后班是你。纸只指方向，点还是要你自己点。</p>",
        "shu/index.html": "<p>目录打印机缺墨，第三行状态印得发灰。发灰不是已解除。已解除会写成已解除，不会靠你眼力把灰看成无。</p>",
        "shu/copy.html": "<p>半个庵字有人当成涂改。涂改要有勘误。没有勘误，半个字只是墨淡。</p><p>认师栏墨淡，有人要你猜住持名字。猜不是今晚的差事。差事是解除栏有没有字。</p>",
        "shu/box.html": "<p>另两份今晚不要并读。并读会让你觉得柜很宽，宽不是今晚的屈氏。</p>",
        "shu/stop.html": "<p>香火账封存四个字有人截去发群。群里说账封了名就还。账封是不接待，名还要看疏。</p><p>不在庵内焚烧七个字，是庵方怕出事。怕出事把疏送进县柜。送进县柜的疏还活着。</p>",
        "shu/keeper.html": "<p>他不讲墙怎么跳，是真不会讲步骤，也是柜不让讲。不会讲不等于疏不在。</p><p>另纸回复临浦，另纸不在今晚盒里。今晚盒里只有屈氏这份抄件。</p>",
        "shu/year.html": "<p>旧历换算若差一年，差的是该办的岁数，不是解除栏会自己长出来。</p><p>十二岁前后该办，该办不是已办。已办要抄件。抄件没有。</p>",
        "pu/index.html": "<p>自动应答录音还是纪蒲舟白天的嗓子，说三遍带单来。录音不能改行。</p><p>第三柜钥匙白天挂在他腰上。夜里钥匙不在这张自动页里。</p>",
        "pu/entry.html": "<p>配偶栏空着，江棠枝还没进谱。没进谱不等于今晚能用晚禾去领。领要名齐，齐要这一行先动。</p><p>更名栏无三个字印在行尾。无就是无。无不能靠户口本上的晚禾去填。</p>",
        "pu/kou.html": "<p>电话占线是真占线。占线不是已经改完。已经改完会有更名栏，更名栏空着。</p><p>夜不改三个字他写得比别的大。大是怕夜窗代笔。代笔会变成他抽屉里突然多一行，多出来的行他不认。</p>",
        "pu/fee.html": "<p>价目表去年涨过一次纸墨。涨价跟屈承稷无关。无关的数字不要收进袋子。</p><p>收据不是谱行。</p>",
        "pu/bei.html": "<p>柜门内侧口诀有人用粉笔描过。描过还是承。描不能把晚描进去。</p>",
        "zhi/index.html": "<p>白天取号须知链是假的，点了不动。不动就对了，大厅规则不归夜窗改。</p>",
        "zhi/hun.html": "<p>另附说明四个字有人当成口头说明也行。口头说明领证窗口不收。收的是谱上的字或解除记录。</p><p>公证处不在这张须知的管辖里。须知能预见到卡，不能代替公证处盖章。预见够你今晚不发。</p>",
        "zhi/gai.html": "<p>号段说明写在页脚小字：临户改字不是埠户改字。小字不显眼，显眼的是同名三个字。</p><p>塑封回执带去谱局的事发生过。谱局把塑封退回来，退回单写：不收派出所复印件当更名。</p>",
        "zhi/ban.html": "<p>她画的圈用油性笔，玻璃上留下一圈影。影不是第三栏已经齐。</p><p>别许原件四个字戳在最后。许是口头答应。口头答应跟按口头发回执是同一类错。</p>",
        "zhi/ye.html": "<p>迁徙和新证的门白班在东侧。东侧夜里上锁。锁不是给你找钥匙，是让你别写代办。</p>",
        "you/inbox.html": "<p>垃圾堆是空的。空的好。空着才不会有人把广告回执当成临浦那封。</p>",
        "you/xi.html": "<p>八八四一她写了两遍。第二遍在签名前。怕传真吃字。</p><p>女、一九九九、八八四一，三件对不上今晚这个站在玻璃外的人。对不上就要拆，不要焊。</p>",
        "you/lin.html": "<p>别并两个字她加了下划线。下划线在镜像里变成一条黑。黑不是已并。</p><p>对质里那句邻县回执能用，要先把这句收下。没收下就点，他还能顶。</p>",
        "you/limits.html": "<p>本科备忘不能拿去对质屈晚禾。对质要的是他的口头对栏，不是蓝槐骂科室。</p><p>排除邻县之后，本户该对的还是疏和谱。排除不是放行。</p>",
        "kou/index.html": "<p>他写顺眼的时候，谱还没翻。没翻的人最会说谱上也改了。</p>",
        "kou/tiao.html": "<p>膝盖蹭破他写过两次，第二次删了，还剩一截。一截仍无号。</p><p>管事看了一眼，他写成办完。一眼没有编号。编号在柜里的朱笔旁边，朱笔写的是未解除。</p>",
        "kou/jiang.html": "<p>七点见三个字下面有个表情，镜像里糊成黑点。黑点不是回执。</p><p>她不管墙。不管墙的催法会把夜窗逼去按口头写。逼不是栏齐。</p>",
        "wen/ask.html": "<p>过路两个字不像化名，像真急。急问不能当柜页。</p><p>退过件的那人没留姓名。没留也好。窗口要的不是故事完整，是栏对不对。</p>",
        "wen/jiming.html": "<p>伸腿两个字难听，难听却准。哪一份还挂着，哪一份会在材料上绊人。</p><p>四套名同时活着的时候，家里只记得好听的那一套。窗口记四套。记四套才知道哪一套没跟上。</p>",
        "wen/tiao.html": "<p>步骤帖若出现，窗口不认。本栏也不会给你写怎么跳。</p><p>吉利两个字常出现。常出现也不收。</p>",
        "guan.html": "<p>键入框还在，是皮留下的。皮不是门。门在邮箱，门上写着别并。</p><p>日班机把联查关掉，是怕夜窗把键入当成已经核对。关掉是保护，不是刁难。</p>",
        "jin.html": "<p>黑底红字看起来凶。凶是故意的。故意让你回交单，去勾不发，而不是在这里找墙怎么跳。</p><p>并进本户五个字也在禁止里。并是席芦最怕的。怕的事不要从夜窗做。</p>",
    }
    for rel, html in pages.items():
        extra = extras.get(rel)
        if extra:
            if "</main>" in html:
                html = html.replace("</main>", extra + "</main>", 1)
            elif "</article>" in html:
                html = html.replace("</article>", extra + "</article>", 1)
            elif "</div></div>\n<script" in html:
                html = html.replace("</div></div>\n<script", extra + "</div></div>\n<script", 1)
            elif "<script src=" in html:
                html = html.replace("<script src=", extra + "\n<script src=", 1)
            else:
                html = html.replace("</body>", extra + "\n</body>", 1)
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(html, encoding="utf-8")
    print("html", len(pages))


if __name__ == "__main__":
    paint_and_copy()
    write_pages()
