#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pathlib import Path
ROOT = Path(__file__).resolve().parent

def W(i, t):
    return f'<span class="word" data-word="{i}">{t}</span>'

def gate(file, href, label):
    return f'<a class="gate" data-file="{file}" href="{href}">{label}</a>'

def foot(n):
    return f'<footer class="pg">{n}/36</footer>'

def still(src, alt, bridge, cls="", width=None, extra=""):
    attrs = f' alt="{alt}" src="{src}"'
    if cls:
        attrs = f' class="{cls}"' + attrs
    if width:
        attrs += f' width="{width}"'
    if extra:
        attrs += " " + extra
    return f'<img{attrs}>\n<p class="artifact-translation">{bridge}</p>'

def assets(depth, skins):
    p = "../" * depth
    links = "\n  ".join(f'<link rel="stylesheet" href="{p}css/{s}.css">' for s in skins)
    return f'''  {links}
  <link rel="stylesheet" href="{p}css/luyin.css">
  <script src="{p}js/keywords.js"></script>
  <script src="{p}js/keyword-search.js"></script>
  <script src="{p}js/data.js"></script>
  <script src="{p}js/engine.js"></script>'''

def doc(cls, title, body, n, depth, skins, extra_js=""):
    p = "../" * depth
    js = extra_js
    return f'''<!DOCTYPE html>
<html lang="en" class="{cls}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
{assets(depth, skins)}
{js}
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
      <a class="logo" href="{p}index.html">Official-Road Inn</a>
      <form id="search-form" action="{p}search-results.html" method="get">
        <input id="search-input" name="q" placeholder="Search this inn">
        <button type="submit">Search</button>
      </form>
    </header>
    <nav id="menubar"><ul>
      <li><a href="{p}index.html">Home</a></li>
      <li><a href="{p}pages/p02-rooms.html">Rooms</a></li>
      <li><a href="{p}pages/p03-env.html">Yard</a></li>
      <li><a href="javascript:void(0)">Road-pass desk</a></li>
      <li><a href="{p}pages/p05-desk.html">Duty desk</a></li>
    </ul></nav>'''

PAGES = []

# 01
PAGES.append(("index.html", 0, doc(
    "skin-shop-local-2010s", "Official-Road Inn",
    f'''<div id="container">
{shop_nav(0)}
<main>
{still("img/alley-dusk.jpg", "Porch light after dusk", "Still on file: porch light after dusk. Shop-front glyphs on the JPEG stay; this line is the desk copy.", cls="hero-photo")}
<section>
<p>On Official-Road Street this inn is the one still lit after midnight. The livestock market has packed up. Two tables left, drinking tea. The east-wing door has a scrap that used to say we copy papers. Half the ink is gone. The inn does not handle yin or yang. It leaves the lamp for people who write.</p>
<p>Tonight the counter has a yellow slip Sun Xiulan pressed there herself, letters jammed together. It asks the inn to tell the east wing: the Qian house has a {W("jijian","rush slip")}, and the person has already been walked to the {W("luyinfang","road-pass room")} door. The inn did not take it. They said the east wing has its own desk.</p>
<p>Notice board, third line, still has this inn copying a {W("luyin","road pass")} — the old word is luyin. Paper from two years ago. The edge curls. Those two words go in the bag. The bag is an east-wing rule, not a menu.</p>
<p>Rooms are full. No extra cots for walk-ins. Someone sat at the yard stone table. Cups not collected. The fourth nav item, Road-pass desk, opens no page. The owner says that column stopped last year. Business goes to the duty desk.</p>
<ul>
<li>Address: north of Official-Road Street mouth, Official-Road Town, Shijin County</li>
<li>One porch light after dark</li>
<li>The phone-book line was scraped out with a fingernail</li>
</ul>
<p>Links: <a href="pages/p10-zhima.html">Taian paper-horse shop</a>　<a href="pages/p13-er.html">county hospital ER</a>　<a href="pages/p20-news.html">Shijin Evening local</a></p>
</section>
</main>
</div>''', 1, 0, ["shop-local-2010s"])))

# 02
PAGES.append(("pages/p02-rooms.html", 1, doc(
    "skin-shop-local-2010s", "Room rates",
    f'''<div id="container">
{shop_nav(1)}
<main>
<section>
<p>Single twenty-eight, one kettle of water. Extra quilt is the blue-print one under the counter. Do not pull a guest pillowcase. Room 2 is empty tonight. Room 3 had someone roll the bedding early, said they would make the livestock market at dawn. They did not come back to sleep.</p>
<p>The rate sheet is from 2011. Grease covers the extra-quilt line. The inn does not put outside guests in the east-wing bed. That table is for writing. People who slept there have strange dreams — the firewood old man said that. Do not take it as fact. Nobody checked.</p>
<p>Guest note four: if you hear sawing in the back yard at night, do not go down to look. The sawing is paper-horse shop work, not this inn. This inn stacks coal out back.</p>
<p>Room 5 used to have a road-slip looking paper nailed to the wall. A guest tore it. The counter did not replace it. If you want the form, go to the duty desk. Do not hunt it in the rooms.</p>
<p>The tea stove boiled dry once this morning. Nobody claimed the shift. The handover book is under the counter. The hand is not the same pen as the rate sheet.</p>
</section>
</main>
</div>''', 2, 1, ["shop-local-2010s"])))

# 03
PAGES.append(("pages/p03-env.html", 1, doc(
    "skin-shop-local-2010s", "Yard",
    f'''<div id="container">
{shop_nav(1)}
<main>
{still("../img/empty-hall.jpg", "Yard stone table", "Still on file: the yard table. Cups were not collected. The photograph does not name who sat.", cls="hero-photo")}
<section>
<p>Stone table sits north. Old tea stain in the crack. Someone sat here tonight. Lip on the rim. Water cold. Red lacquer on the posts was done last year. Old green still shows under it.</p>
<p>East-wing window paper torn at one corner. Light leaks out in a square. West wing stacks bedding. The south door goes to the paper-horse shop alley. Locked in daylight. Key is with Lao Hou, not this inn.</p>
<p>A scrap of yellow ritual paper on the ground. Wind pushed it under the step. Staff kicked it aside. Did not pick it up. Pick it up and you have to walk it to the east wing. Nobody wants those extra steps.</p>
</section>
</main>
</div>''', 3, 1, ["shop-local-2010s"])))

# 04
PAGES.append(("pages/p04-paused.html", 1, doc(
    "skin-shop-local-2010s", "Road-pass desk",
    f'''<div id="container">
{shop_nav(1)}
<main>
<section>
<p>This column is stopped. Not tonight. Last August. Someone wrote the errand as inn business. The station came once. The owner left the nav item as a face. Click it and you still get this sentence.</p>
<p>To write, go to the duty desk. To buy a paper figure, go down the alley to the Taian paper-horse shop. This page takes no order and takes no money.</p>
<p>People treat this page as a joke about being closed. They click it again. Same lines. Do not add numbers after the address. You still get these lines.</p>
</section>
</main>
</div>''', 4, 1, ["shop-local-2010s"])))

# 05 desk
PAGES.append(("pages/p05-desk.html", 1, doc(
    "skin-service-cyan-desk", "Road-pass room duty desk",
    f'''<div id="wrap">
<header>
<strong>Road-pass room · relief shift</strong>
<div>
<a class="ghost-btn" href="p07-login.html">Login bag</a>
<form id="search-form" action="../search-results.html" method="get" style="display:inline">
<input id="search-input" name="q" placeholder="This desk does not run on search">
<button type="submit">Search</button>
</form>
</div>
</header>
<div class="notice">
<h2>On duty tonight</h2>
<p>You are Rui Qiu. Relief copyist. One catalog line before 22:00. You do not approve. You write. Whether the stove mouth listens is later.</p>
<p>Words come off paper already open. Bag is below. Four fields: Who, Where, Toward whom, Did what. All four before the whole line goes in. What you turn in is a recommend.</p>
<p>There is a {W("jijian","rush slip")} on the desk. Someone brought it. You did not go looking. It wants a death-by-illness line. Read it. You do not have to believe it.</p>
<p>This {W("luyinfang","road-pass room")} has one lamp. The shade was burned. There is a scar.</p>
</div>
<div id="sentence-card">
<p>Put bag words on the four fields. Fields short, no take. Taken, it still will not tell you which field is right.</p>
<div class="slots">
<div class="slot" data-slot="who"><b>Who</b><span class="val"></span></div>
<div class="slot" data-slot="where"><b>Where</b><span class="val"></span></div>
<div class="slot" data-slot="whom"><b>Toward whom</b><span class="val"></span></div>
<div class="slot" data-slot="did"><b>Did what</b><span class="val"></span></div>
</div>
<button type="button" id="submit-sent">Submit the line</button>
<p class="feedback" id="sent-fb"></p>
<div class="hint-box">
<button type="button" id="hint-next">Next hint</button>
<div id="hint-log"></div>
</div>
</div>
<div class="tabs">
<a href="p06-cabinet.html">Attachment cabinet</a>
<a href="../index.html">Back to the inn</a>
</div>
<p>The rush-slip original is on the mail page. {gate("p23-mail.html","p23-mail.html","Open the one Sun Xiulan brought")}</p>
</div>''', 5, 1, ["service-cyan-desk"])))

# 06
PAGES.append(("pages/p06-cabinet.html", 1, doc(
    "skin-service-cyan-desk", "Attachment cabinet",
    f'''<div id="wrap">
<header><strong>Attachment cabinet</strong></header>
<div class="notice">
<h2>Paper that can come out tonight</h2>
<p>Door rusted. Labels in pencil. Some rubbed pale. No word in the bag, you pull a blank sleeve.</p>
</div>
<table>
<thead><tr><th>Name</th><th>Note</th></tr></thead>
<tbody>
<tr><td>{gate("p23-mail.html","p23-mail.html","Rush-slip mail")}</td><td>The one Sun Xiulan pressed on the counter</td></tr>
<tr><td>{gate("p11-chuhuo.html","p11-chuhuo.html","Paper-horse shop order slip")}</td><td>You have to know the name that placed the order</td></tr>
<tr><td>{gate("p12-houyuan.html","p12-houyuan.html","Backyard note")}</td><td>Opens when the body-measure ruler lines up</td></tr>
<tr><td>{gate("p26-ruler.html","p26-ruler.html","Size chart")}</td><td>Same ruler</td></tr>
<tr><td>{gate("p31-bazi.html","p31-bazi.html","Birth-hour copy")}</td><td>The name is the child's</td></tr>
<tr><td>{gate("p18-tishen.html","p18-tishen.html","Old stand-in custom")}</td><td>After the backyard page</td></tr>
<tr><td>{gate("p30-form.html","p30-form.html","Catalog form")}</td><td>How the line you turn in is written</td></tr>
<tr><td>{gate("p33-zao.html","p33-zao.html","Stove-mouth fire log")}</td><td>Means something after you turn in a line</td></tr>
</tbody>
</table>
<p><a href="p05-desk.html">Back to the line card</a></p>
</div>''', 6, 1, ["service-cyan-desk"])))

# 07
PAGES.append(("pages/p07-login.html", 1, doc(
    "skin-service-cyan-desk", "Login bag",
    f'''<div id="wrap">
<header><strong>Login bag</strong></header>
<div class="notice">
<h2>This bag does not open for relief</h2>
<p>Admin account is not in the nav. Rui Qiu's badge only gets the duty desk and the cabinet. Put a name here and it comes back.</p>
<p>Someone tried Qian Pei in the user field. The mouth spat: the pass-holder is not a login name. Do not try again.</p>
<form onsubmit="return false">
<p>Staff no. <input disabled placeholder="Relief has no number"></p>
<p>Password <input disabled placeholder="blank"></p>
<p><button type="button">Will not open</button></p>
</form>
<p><a href="p05-desk.html">Back to the duty desk</a></p>
</div>
</div>''', 7, 1, ["service-cyan-desk"])))

# 08 search - special
SEARCH = '''<!DOCTYPE html>
<html lang="en" class="skin-search-results">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Site results</title>
  <link rel="stylesheet" href="css/search-and-forbidden.css">
  <link rel="stylesheet" href="css/luyin.css">
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
'''
PAGES.append(("search-results.html", 0, SEARCH))

# 09
PAGES.append(("pages/p09-forbidden.html", 1, doc(
    "skin-forbidden", "Forbidden",
    '''<div class="box">
<h2>This file is forbidden</h2>
<p>The stove-mouth log is not on the public net. Relief does not need it tonight. Go back to the duty desk and write your line.</p>
<p><a href="p05-desk.html" style="color:#f88">Duty desk</a></p>
</div>''', 9, 1, ["search-and-forbidden"])))

# 10 zhima
PAGES.append(("pages/p10-zhima.html", 1, doc(
    "skin-shop-detail-2008", "Taian paper-horse shop",
    f'''<div id="wrap">
<h1>Taian paper-horse shop</h1>
<p>End of the alley. By day: gold ingots, tin foil, paper boy and girl. At night someone knocks, Lao Hou still opens. Opens and does not chat. The board says paper horse (zhima). The sign just says Taian.</p>
{still("../img/copy-shop.jpg", "Shop front", "Still on file: the paper-horse shop front. Signage on the JPEG is a shop still, not a menu.", width=480)}
<p>On the shelf today: yellow paper, paste, thin bamboo bone. Wholesale list never finished. Click it and it is empty. To see a slip you have to know who placed today's order.</p>
<p>Lao Hou dozes behind the counter. Breath heavy. A leather tape nailed to the wall. Oil on it is hand oil, not machine oil.</p>
<p>{gate("p11-chuhuo.html","p11-chuhuo.html","Today's order slip")}　{gate("p12-houyuan.html","p12-houyuan.html","Backyard")}　<a href="../index.html">Back to the inn</a></p>
<p>Shop rule on the board: the name the payer writes is the shoulder the paper figure is tied to. Birth hour is copied on another sheet. Copy it wrong, no refund.</p>
</div>''', 10, 1, ["shop-detail-2008"])))

# 11
PAGES.append(("pages/p11-chuhuo.html", 1, doc(
    "skin-shop-detail-2008", "Order slip",
    f'''<div id="wrap">
<h1>Order slip · night mark 17</h1>
<p>Customer: {W("qianpei","Qian Pei")}</p>
<p>Goods: one adult paper figure, shoulder on notch three of the {W("shenliang","body-measure ruler")}. Bamboo split fresh. Paste mixed this afternoon, still tacky at night.</p>
<p>Pencil in the note: birth hour on another sheet, not this one. Lao Hou's hand. Short downstroke.</p>
<p>This slip can establish who placed the order and whose shoulder the frame was tied to. It cannot establish whether that person has already stopped breathing tonight. No hospital stamp. The word death is not on it.</p>
<p>Money: forty. Old-issue notes, corners soft. Lao Hou put the cash under the tea jar. Not in the box.</p>
<p>{gate("p12-houyuan.html","p12-houyuan.html","Backyard still lit")}　{gate("p26-ruler.html","p26-ruler.html","Size chart on the counter PC")}</p>
</div>''', 11, 1, ["shop-detail-2008"])))

# 12
PAGES.append(("pages/p12-houyuan.html", 1, doc(
    "skin-shop-detail-2008", "Backyard",
    f'''<div id="wrap">
<h1>Backyard</h1>
{still("../img/peeling-hallway.jpg", "Backyard", "Still on file: the backyard. Paste on the bricks is not a name.", width=480)}
<p>The {W("houyuan","paper-horse shop backyard")} has a ring of paste not dry. Two pairs of shoe prints. One large, one small. The small pair only went halfway and turned back. The large pair turned inside the ring.</p>
<p>Splitting knife on the brick. No blood on the edge. Bamboo green. Paper-figure frame against the wall. Head not pasted with a face yet. Shoulder width matches notch three on the order slip.</p>
<p>A crumpled yellow sheet at the wall. Open it and you get half a character that looks like Man. The lower half dissolved in the paste. Lao Hou later said he did not throw that paper.</p>
<p>This page can only say the backyard used knife and paste tonight. It cannot say who the knife was for, and it cannot say where the small prints are now.</p>
<p>{gate("p18-tishen.html","p18-tishen.html","What the old custom called this")}　{gate("p17-sulu.html","p17-sulu.html","Old road-pass page")}</p>
</div>''', 12, 1, ["shop-detail-2008"])))

# 13 hospital
PAGES.append(("pages/p13-er.html", 1, doc(
    "skin-gov-redbar", "ER notice",
    f'''<div class="page">
<h1>Shijin County People's Hospital ER notice</h1>
<p>Night window closes at 23:00. The {W("yiyuan","county hospital ER")} took eleven people tonight, mostly falls and stomach pain. No death certificate was issued. No hearse was called. The header says Shijin. The desk says ER.</p>
<p>Someone phoned about a {W("xinxing","heart attack")} bed. The night nurse said cardiology is not in this building, gave the number, the other end hung up. The visitor book has no Qian.</p>
<p>The public death-register column is closed. Closed not because something happened tonight. The system has thrown errors since last year. Nobody fixed it. This page is not a death certificate and not a proof of life. It can only say: tonight this window did not write that name.</p>
<p>Visiting rules and registration steps omitted. People treat this page as the source for "the hospital said he died." That is a bad read.</p>
<p><a href="p14-nodeath.html">Death-register column note</a>　<a href="../index.html">Back to the inn</a></p>
</div>''', 13, 1, ["gov-redbar"])))

# 14
PAGES.append(("pages/p14-nodeath.html", 1, doc(
    "skin-gov-redbar", "Death register",
    f'''<div class="page">
<h1>Death register (public net)</h1>
<p>Column closed. The prompt is two years old, from IT: bring your ID to the archive room in Building 1. The archive room does not work at night.</p>
<p>Someone saved an old screenshot of this page. It had a line starting with Qian. Later check: it was the money kind of qian, not a person. The old image is not on this site.</p>
<p>Relief copyists should not read a closed column as "something is being hidden." Closed is a rotten system. The line you need is not in this empty form.</p>
<p><a href="p13-er.html">Back to the ER notice</a></p>
</div>''', 14, 1, ["gov-redbar"])))

# 15 board
PAGES.append(("pages/p15-board.html", 1, doc(
    "skin-discuz-board", "Guandao board",
    f'''<div id="wp">
<div class="header">Official-Road Town stuff</div>
<table>
<tr><th>Forum</th><th>Thread</th><th>Last</th></tr>
<tr><td>Chat</td><td><a href="p16-thread.html">Who got someone to write papers in the night</a></td><td>today</td></tr>
<tr><td>Buy/sell</td><td>One unplated tricycle (closed)</td><td>last week</td></tr>
<tr><td>Notice</td><td>Manhole cover gone again</td><td>day before</td></tr>
</table>
<p>Private board. Host behind the internet cafe. Mod has not been on in a year. Do not come here to prove life or death.</p>
</div>''', 15, 1, ["discuz-board"])))

# 16 thread
PAGES.append(("pages/p16-thread.html", 1, doc(
    "skin-discuz-board", "Thread",
    f'''<div id="wp">
<div class="header">Who got someone to write papers in the night</div>
<div class="post"><b>1  Laobai, south road</b>
<p>just walked past the inn. sun xiulan squatting, paper in her fist. asked her. she said qian pei was gone. i saw him this afternoon at the livestock market yelling about the scale. maybe my eyes.</p></div>
<div class="post"><b>2  alley mouth</b>
<p>paper-horse shop backyard light is on. not the first time lao hou takes a night order. ask less.</p></div>
<div class="post"><b>3  Laobai, south road</b>
<p>im not asking to settle it. im saying the guy this afternoon still walked crooked and could carry a sack. not like someone who needs a road opened.</p></div>
<div class="post"><b>4  anon</b>
<p>anon says nothing. anon left a teacup ring on the stone table and went.</p></div>
<p>These floors are mouths. Mouths can be weather. They cannot be words in the fields. Words still come off paper with a stamp, a ruler, a birth hour.</p>
</div>''', 16, 1, ["discuz-board"])))

# 17
PAGES.append(("pages/p17-sulu.html", 1, doc(
    "skin-archive-simsun", "Old road-pass custom",
    f'''<div class="doc">
<h1>Old page on copying a road pass</h1>
<p>The pass-holder line is the person the birth hour belongs to. Body measure is the paper figure's business. Birth hour is the road's business. If the two lines belong to two people, you have put a living name on the road.</p>
<p>The old page's wording: a living person must not be {W("xiechi","wrote as deceased pass-holder")}. If you do, what goes through the fire is not the paper. It is the birth hour in that line.</p>
<p>This page is a rule. A rule can teach you how to fill. It cannot tell you which of those two people is alive tonight. Alive or not, you put the hospital's empty window against the order-slip ruler.</p>
<p>Wormholes in the edge. They ate the "not" in "do not." Someone thought that line was void. It is not void. Eaten, still that line.</p>
<p><a href="p18-tishen.html">Next page</a></p>
</div>''', 17, 1, ["archive-simsun"])))

# 18
PAGES.append(("pages/p18-tishen.html", 1, doc(
    "skin-archive-simsun", "Stand-in",
    f'''<div class="doc">
<h1>Stand-in</h1>
<p>Paper figure tied to A's shoulder, road pass written to B's birth hour: that is {W("zati","tied as a stand-in")} B. A walks the night road. B answers the name.</p>
<p>Old use: war, plague. Official-Road Town used it for debt, hiding sickness, hiding from a person. The register does not write motive. It only writes whether the two lines face the same person.</p>
<p>This page is still a rule. It cannot name who is using it tonight. The paste ring in the backyard, notch three on the size chart, the name on the birth-hour copy — those three line up, then this sentence gets a turn.</p>
<p>People hear stand-in and think the paper figure looks like someone. Look-alike does not matter. What matters is whether shoulder and birth hour were split.</p>
<p>{gate("p30-form.html","p30-form.html","Catalog form")}　{gate("p33-zao.html","p33-zao.html","Stove mouth")}</p>
</div>''', 18, 1, ["archive-simsun"])))

# 19
PAGES.append(("pages/p19-ceding.html", 1, doc(
    "skin-archive-simsun", "Register fragment",
    f'''<div class="doc">
<h1>Register fragment</h1>
<p>2009 to 2014, rain got into the register. Names smeared into patches. The lines you can still read were copied after a fire-pass. The copyists liked to round the sentences.</p>
<p>One line left: "Shoulder and birth hour in two houses — hold that night." It does not say where the person went after the hold. It does not say what happened to the ones not held.</p>
<p>This page cannot be tonight's answer. It can only say this room has held a line like this before. The line you turn in still has to come from tonight's paper.</p>
</div>''', 19, 1, ["archive-simsun"])))

# 20 news
PAGES.append(("pages/p20-news.html", 1, doc(
    "skin-news-portal-163", "Shijin Evening local",
    f'''<div id="wrap">
<div class="top">Shijin Evening</div>
<h1>Official-Road Town inn still copies papers; township has not banned it</h1>
<p>A reporter passed Official-Road Street yesterday. East-wing lamp on. The owner said they only leave the light. They do not take part. A township comprehensive-management officer who would not give a name said copying a road pass is not a business. No complaint, they do not go in.</p>
<p>Same page: a livestock-market scale fight. A party surnamed Qian. Surname only, no given name. The editor said the name did not match a household book. They would not print it.</p>
<p>The evening paper cannot establish whether tonight's rush slip is true. It can only establish that this place still lets someone write in the east wing until after midnight.</p>
<p><a href="../index.html">Back to the inn</a></p>
</div>''', 20, 1, ["news-portal-163"])))

# 21 qzone
PAGES.append(("pages/p21-qzone.html", 1, doc(
    "skin-qzone-modules", "Qian Xiaoman's space",
    f'''<div id="wrap">
<div class="top">Xiaoman will not change the name</div>
{still("../img/avatar-square.jpg", "Square avatar", "Still on file: a square avatar. The face is a child's upload.", width=80, extra='height="80"')}
<p>uncle took me into the alley today. said look at the paper figure. no face. i asked who for. he said dont ask. white stuff on my shoe. wont wash off.</p>
<p>homework not done. chinese was dictation. i wrote Man as Pan. teacher wants a parent. uncle not here. aunt on the phone at the hospital door. she crouched down while she was talking.</p>
<p>A space is a child's mouth. A mouth can keep the paste on a shoe. It cannot fill your four fields. The names in the fields come off the birth-hour copy.</p>
<p>{gate("p31-bazi.html","p31-bazi.html","Birth-hour copy")}　{gate("p32-adopt.html","p32-adopt.html","Guoji note")}</p>
</div>''', 21, 1, ["qzone-modules"])))

# 22 classified
PAGES.append(("pages/p22-find.html", 1, doc(
    "skin-classified-yellow", "Local classifieds",
    f'''<div id="wrap">
<h1>Official-Road classifieds</h1>
<p>Secondhand sewing machine, works. Ask the cigarette stall at the alley mouth.</p>
<p>Lost hen: speckled, right claw missing a toe. Do not tell me it became red-braise.</p>
<p>Hire someone to copy a birth hour: neat, no fancy script. Posted three days ago. Number is dead.</p>
<p>These slips do not touch tonight's line. They sit here because this site already had these slips. Do not look for a pass-holder in a sewing machine.</p>
</div>''', 22, 1, ["classified-yellow"])))

# 23 mail
PAGES.append(("pages/p23-mail.html", 1, doc(
    "skin-mail-web-2010", "Rush slip",
    f'''<div id="layout">
<div class="side">Inbox<br>One tonight</div>
<div class="main">
<h2>Sun Xiulan → road-pass room</h2>
<p>I am {W("sunxiulan","Sun Xiulan")}. My man {W("qianpei","Qian Pei")} was still at the market this afternoon. Tonight they say he's gone. I didn't go into the hospital. The person at the door told me not to wait. I pressed the {W("jijian","rush slip")} on your cabinet. Write it as death by illness. Don't hold up the stove.</p>
<p>I didn't bring the child. The child went out with him this afternoon. Not home now. I don't dare think.</p>
<p>The writing is a mess. I am not a person who writes letters. Just write heart attack. Don't ask me if I saw. I saw nothing. I only heard the neighbor say the paper-horse shop backyard was lit.</p>
<p>This letter can establish what she wants you to write. It cannot establish that a person has already stopped. She wrote it herself: she did not go into the hospital.</p>
<p>{gate("p11-chuhuo.html","p11-chuhuo.html","Paper-horse shop order slip")}　{gate("p25-wap.html","p25-wap.html","The one he sent this afternoon")}</p>
</div>
</div>''', 23, 1, ["mail-web-2010"])))

# 24 baike
PAGES.append(("pages/p24-baike.html", 1, doc(
    "skin-baidu-baike", "Road pass",
    f'''<div id="content">
<h1>Road pass</h1>
<div class="infobox">Folk paper　wording differs by place</div>
<p>A road pass (luyin) is an exit slip written for the dead. The lines want a name, a birth hour, a destination. In the Shijin area it also wants a fire-pass. No fire, it only counts as written, not sent.</p>
<p>The entry is encyclopedia voice. It copied a county gazetteer and it copied a tourist desk. Where they fight, the entry picks the nicer one. Do not pick tonight's line out of an entry. The entry has no Qian name.</p>
<p>See also: paper figures, funeral rite, pass-holder. Those see-also links are empty. This site did not finish them.</p>
<p><a href="../index.html">Back to the inn</a></p>
</div>''', 24, 1, ["baidu-baike"])))

# 25 wap
PAGES.append(("pages/p25-wap.html", 1, doc(
    "skin-wap-phone-2007", "Text",
    f'''<p>From: {W("qianpei","Qian Pei")}<br>Time: today 16:41</p>
<p>Scale at the market is wrong. Going to the alley. Don't wait dinner. I have Man with me.</p>
<p>This one is still in the outbox as sent. No recall. No second line.</p>
<p>A living man can still complain about a scale in the afternoon. This text cannot establish that he is alive at night. It can only squeeze "already dead in the afternoon" into a narrower place.</p>
<p><a href="p23-mail.html">Back to that rush slip</a></p>
''', 25, 1, ["wap-phone-2007"])))

# 26 ruler
PAGES.append(("pages/p26-ruler.html", 1, doc(
    "skin-winxp-luna", "Size chart",
    f'''<div class="window">
<div class="title">sizes.xls　read only</div>
<div class="body">
<p>Notch three: shoulder 1 chi 6. Note: adult, male. Matches tonight's order slip.</p>
<p>Notch one: shoulder 1 chi 1. Note: child. Tonight no notch-one goods went out.</p>
<p>Other sheet: {W("qianxiaoman","Qian Xiaoman")}, {W("shengchen","birth hour")} Jiazi year, 8th month. This row is not in the size chart. A later sticky note. Not Lao Hou's hand.</p>
<p>The counter PC. Screen flickers. File date is tonight. Lao Hou says he can open it. He cannot edit it.</p>
<p>The chart can establish the frame was tied to an adult. The sticky note can split the child's birth hour off the sizes. Two facts on one screen. Not one field.</p>
<p>{gate("p31-bazi.html","p31-bazi.html","Birth-hour copy, original")}</p>
</div>
</div>''', 26, 1, ["winxp-luna"])))

# 27 materials
PAGES.append(("pages/p27-materials.html", 1, doc(
    "skin-shop-detail-2008", "Materials",
    f'''<div id="wrap">
<h1>Tonight's stock</h1>
<p>Thin bamboo, eleven sticks. Yellow paper, four quires. Paste, one bowl, half left. Paint unopened. Face not pasted.</p>
<p>Stock says the paper figure is half done. A half-done job does not look like goods for someone already in a coffin. Coffin goods get a face the same night. Lao Hou has taken those. He pastes the face before he sleeps.</p>
<p>This page is stock. Stock is not life or death. It only makes "paste a dead face in the same night" a hard sentence to use.</p>
<p><a href="p10-zhima.html">Back to the shop</a></p>
</div>''', 27, 1, ["shop-detail-2008"])))

# 28 handover
PAGES.append(("pages/p28-handover.html", 1, doc(
    "skin-shop-local-2010s", "Night handover",
    f'''<div id="container">
{shop_nav(1)}
<main>
<section>
<p>The outgoing shift topped the porch-light oil. Did not fill it. Would not touch the east-wing lamp. Said hot. Saw the yellow slip on the counter. Did not lift it. Lift it and Sun Xiulan comes back looking.</p>
<p>The boiled-dry stove he put in parentheses. Said not him. Parentheses very small.</p>
<p>A handover book is not a road-pass register. Do not pick "yellow slip" into the four fields. The fields want who did what toward whom. Not who left a slip stuck.</p>
</section>
</main>
</div>''', 28, 1, ["shop-local-2010s"])))

# 29 police
PAGES.append(("pages/p29-police.html", 1, doc(
    "skin-gov-redbar", "Police blotter extract",
    f'''<div class="page">
<h1>Official-Road station blotter extract (public board)</h1>
<p>This week: missing manhole cover, drunk smashed a bowl, scale fight. A Qian in the fight. No case filed. Both sides left.</p>
<p>No death report. No missing-person report. Extract stops at 18:00 tonight. After 18:00 is not on this paper.</p>
<p>This page cannot establish that Qian Pei is dead or not dead. It can only establish that, up to 18:00, nobody came here to report those two things.</p>
<p>People want to read "no case filed" as "nothing happened." A station paper does not make that promise.</p>
</div>''', 29, 1, ["gov-redbar"])))

# 30 form
PAGES.append(("pages/p30-form.html", 1, doc(
    "skin-archive-simsun", "Catalog form",
    f'''<div class="doc">
<h1>Catalog form</h1>
<p>One line, four fields. Who, where, toward whom, did what. Do not write obituary voice. Obituary voice is what the family wants. That kind is {W("kaibing","issued a death-illness road pass")}. Another line. You can still turn it in. Turn it in and it goes to the stove mouth.</p>
<p>If you see shoulder and birth hour split, do not use obituary voice. Obituary voice pastes the two split fields back together.</p>
<p>The form page shows what a line looks like. It does not pick which line. Which line is the card on the duty desk.</p>
<p><a href="p05-desk.html">Back to the duty desk</a></p>
</div>''', 30, 1, ["archive-simsun"])))

# 31 bazi
PAGES.append(("pages/p31-bazi.html", 1, doc(
    "skin-archive-simsun", "Birth-hour copy",
    f'''<div class="doc">
<h1>Birth-hour copy</h1>
<p>Name: {W("qianxiaoman","Qian Xiaoman")}</p>
<p>{W("shengchen","birth hour")}: Jiazi year, 8th month, 14th day, haishi. Copied from the red paper at the old guoji. The red paper is in Sun Xiulan's dressing box. Not in the cabinet tonight. The cabinet only has this copy.</p>
<p>Paste on the edge. Same color as the ring in the backyard.</p>
<p>This page can establish that if a road pass is written to this birth hour, the name that goes in is the child's. It cannot establish that the child has already gone. It cannot establish that the uncle has already gone.</p>
<p>{gate("p32-adopt.html","p32-adopt.html","Guoji note")}</p>
</div>''', 31, 1, ["archive-simsun"])))

# 32 adopt
PAGES.append(("pages/p32-adopt.html", 1, doc(
    "skin-mail-web-2010", "Guoji note",
    f'''<div id="layout">
<div class="main">
<h2>Guoji</h2>
<p>Qian Xiaoman was {W("guoji","guoji")} onto Qian Pei's register the year before last. Village-committee mimeograph. Stamp faint. Household book is not in the attachments.</p>
<p>Guoji means: outside, the child's name walks with the uncle's surname. The birth hour is still the child's. People hear guoji and think the birth hour moved too. What moved is the name, not the day.</p>
<p>The note can explain why the order slip has the uncle's name and the copy has the child's day. It cannot merge two people into one dead person.</p>
</div>
</div>''', 32, 1, ["mail-web-2010"])))

# 33 zao
PAGES.append(("pages/p33-zao.html", 1, doc(
    "skin-archive-simsun", "Stove mouth",
    f'''<div class="doc">
<h1>Stove-mouth fire log</h1>
<p>You do not light the fire. You only turn in a line. Line matches, tonight's {W("guohuo","passed through fire")} field stays empty. Line written as the rush slip asked, the stove mouth sends the paper in.</p>
<p>Last row in the log is still blank. Blank not because someone forgot. 22:00 has not come. No line in.</p>
<p>Before you turn in a line, this page can only say how the stove mouth works. After, the receipt fills the empty row, or leaves it empty.</p>
<p><a href="p05-desk.html">Back to the duty desk to turn in a line</a></p>
</div>''', 33, 1, ["archive-simsun"])))

# 34 hold
PAGES.append(("pages/p34-hold.html", 1, doc(
    "skin-archive-simsun", "Held",
    f'''<div class="doc">
<h1>Held</h1>
<p>Four fields lined up: Qian Pei, in the paper-horse shop backyard, toward Qian Xiaoman, tied as a stand-in. The road pass does not go through fire. Paper stays in the cabinet. The stove-mouth row stays empty.</p>
<p>If Sun Xiulan comes asking, you show her the receipt. The receipt does not explain whether her man is alive or dead. It only says: these two fields do not face the same person. Cannot send.</p>
<p>These sources still cannot pin Qian Pei's place at this hour. They can only block the line "open a road for death by illness."</p>
<p><a href="p36-limits.html">What these papers cannot establish</a>　<a href="p05-desk.html">Duty desk</a></p>
</div>''', 34, 1, ["archive-simsun"])))

# 35 burn
PAGES.append(("pages/p35-burn.html", 1, doc(
    "skin-archive-simsun", "Fire-pass receipt",
    f'''<div class="doc">
<h1>Fire-pass receipt</h1>
<p>You turned in the rush-slip line: Sun Xiulan, in the road-pass room, toward Qian Pei, issued a death-illness road pass. The stove mouth took the paper. The ash is ordinary ash.</p>
<p>After dawn a handwritten slip went up on the inn wall. Looking for Qian Xiaoman. The slip does not look for Qian Pei.</p>
<p>The receipt does not celebrate. It does not scold. It only records which line you turned in.</p>
<p><a href="p36-limits.html">What these papers cannot establish</a></p>
</div>''', 35, 1, ["archive-simsun"])))

# 36 limits
PAGES.append(("pages/p36-limits.html", 1, doc(
    "skin-archive-simsun", "What these papers cannot establish",
    f'''<div class="doc">
<h1>What these papers cannot establish</h1>
<p>An order slip cannot establish a death. A hospital notice cannot establish a life. Old custom cannot establish which rule was used tonight. Sun Xiulan's letter cannot establish that she saw a body. A space post cannot establish who stepped in the paste.</p>
<p>What they can line up is only whether shoulder and birth hour were split. Split, you should not paste them with obituary voice.</p>
<p>Rui Qiu finishes this shift, the lamp can go off. Emptying the bag before the lamp goes off is the next shift's job. If you want to change the line, the duty desk will still take it, except the sheet the stove mouth already heard.</p>
<p><a href="p05-desk.html">Duty desk</a></p>
</div>''', 36, 1, ["archive-simsun"])))

INTRO = '''<!DOCTYPE html>
<html lang="en" class="skin-intro-manual">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Copying the Road Pass</title>
  <link rel="stylesheet" href="css/intro-manual.css">
  <link rel="stylesheet" href="css/luyin.css">
</head>
<body>
  <header class="intro-hero">
    <div class="image-area">''' + still("img/night-corridor.jpg", "Night corridor", "Still on file: the night corridor to the east wing. Glyphs on the JPEG stay; this line is the desk copy.") + '''</div>
    <h1>Copying the Road Pass</h1>
  </header>
  <main>
    <section>
      <h2>Tonight</h2>
      <p>You are Rui Qiu. Relief copyist, road-pass room, east wing of the Official-Road Inn. One catalog line before 22:00: who, where, toward whom, did what. You do not approve a road pass (luyin). You write a recommend.</p>
      <p>The Qian house sent a rush slip. They say the person is gone. They want a death-by-illness line. The slip is already on the desk. You did not go looking.</p>
    </section>
    <section>
      <h2>Hands</h2>
      <p>Words sit on paper already open. Click once, into the bag. Bag under every page. Four fields full, submit the line. A wrong line will not tell you which field is wrong.</p>
      <p>The top search only hits public pages. Slips in the attachment cabinet do not open from search.</p>
      <p class="boot-actions">
        <a class="enter-link" href="index.html">Go to the inn. The notice has the word luyin. Click the road pass first.</a>
      </p>
    </section>
    <section>
      <h2>Stuck</h2>
      <p>Hints sit on the duty desk, one grade at a time. Early grades point. They do not lock the whole line.</p>
      <p>Shijin County, Official-Road Town, the Qian house: written places and people. Do not match them to a plate outside this door. The east-wing lamp is hot. A hot lamp has burned someone else's paper. After the paper curled that person did not come back. You are here because the regular called out. The reason on the slip is family business. What business, nobody asked. The shift nobody asks about is the one that copies a family's wish into the fields. A wish can be turned in. Turned in, it goes to the stove mouth. The sheet the stove mouth heard does not come back.</p>
      <p>If you see shoulder and day on two people, do not paste them with obituary voice. Paste is manners. Manners after 22:00. Before 22:00, only the four fields. Fields full, submit the line. A wrong line will not point at a field. Pointing turns into tapping cells. Tapping cells is not tonight's way of writing.</p>
      <p>Once you are in the inn, click those two words on the notice. Into the bag, the bag lights under the page. Then the duty desk. Some sleeves in the cabinet are empty. Empty sleeves still have a rubber band, like something is in them. Open them and there is nothing. Nothing is not a reason to panic. Words sit on paper already open, not in empty sleeves. Words on the paper have a dashed underline. The dashes are not decoration. They take a click.</p>
      <p>Top search hits the inn, the paper-horse shop, the ER, those public pages. Learn those pages cold, they still cannot stand in for the four fields. The words the fields want sit on an order slip, a birth-hour copy, a backyard. The backyard door does not open from search. Search admin and you hit a black face. Search backend, same face. The face has nothing to do with tonight's line. Turn around.</p>
      <p>Hints on the duty desk, one grade at a time. Early grades point. They do not lock the whole line. The grade that writes it out still needs you to click it on and submit. Before you click, put shoulder against day. They do not match, do not use the voice in Sun Xiulan's letter. That voice is urgent. Urgent voice is the roundest. Round, the stove mouth listens. The ash after it listens is ordinary ash. Ordinary ash has no explanation. The wall may grow a handwritten slip looking for a child. You did not write the slip. You turned in the four fields.</p>
      <p>The lamp can go off. If you still want to change the line before it goes off, go back to the duty desk. Except the sheet the stove mouth already heard. Heard sheets are not relief's. The alley is not this room's. Someone may still be walking in the alley. Who, these papers still will not say. Better they don't. Say it and it goes round. Round is not the line tonight should turn in. That line wants hard. Not round. Not nice.</p>
    </section>
  </main>
</body>
</html>
'''

EXTRA = {
1: "<p>The inn calendar is still on March. Someone dug a nail-mark on the twenty-second. Said don't forget to turn it in tonight. Not Rui Qiu. Rui Qiu only covers today. The firewood old man dragged the coal basket to the west wing, sniffed at the east wing, said the paper smell comes from the alley, not the stove. The lodging book on the counter stops at afternoon. The afternoon line is blank. Blank means nobody checked in, not that someone stayed and was not written. Porch-light oil is cut with peanut oil. Smoke heavy. The owner likes cheap. One tea guest flipped a cup on the stone table and left it. The ring is still there. Rui Qiu has to pass that table to reach the east wing. Wet melon-seed shells at the edge, like just spit. She did not stop. Tonight is not about melon seeds.</p><p>The owner has a radio in the inner room. An out-of-town opera. Words unclear. Through the door he said he does not mind the east-wing lamp. Oil gone, you add it. Rui Qiu answered. Then she remembered she does not know where the oil pot is. Under the east-wing table. Last shift left it. Spout black.</p>",
2: "<p>Room 2 window faces the alley. Tonight someone is dragging bamboo bone. Sounds like sweeping. One, one, not in a hurry. A peddler who slept here said once that sound starts he cannot sleep. Not fear. Annoyance. Room 3 used to have an unfinished letter under the pillow. Only the two characters for Man. Rest blank. Staff gave it to the counter. Counter said not inn property, stuffed it back. Pillow changed later. Letter gone. Room 3 is empty tonight. Clean in a way that does not look like someone means to come back. The grease on the extra-quilt line looks like old soy. Someone wiped it with a sleeve. Worse.</p>",
3: "<p>A cat used to live under the stone table. Cat gone. Fur still in the brick crack. Wind tonight from the south-door seam. That door goes to the paper-horse shop. Locked. Lock rusted. Dust in the keyhole. Someone pushed half a yellow sheet through the seam, pulled it back halfway. The edge stayed in the door like a tongue. Rui Qiu could see that edge if she squatted. She did not squat. The yard photo is from two years ago. Leaves on the tree. Tree is bald now. The photo cannot be tonight's yard. Tonight's yard is darker. Sweet paste in the dark. Paste smell should not be in an inn.</p>",
4: "<p>The township came about the stopped column. The one who asked drank tea and called the errand superstitious business. The owner kept the column as a shield: look, click it, nothing. Shield used long enough, people think the east wing stopped too. The east wing did not stop. The east wing just does not enter from this column. After last August's questions the owner told the firewood old man about a recorder. The old man said recorders are for scaring country people. Whether there was a recorder, nobody saw. This page is still these lines. More writing will not make it a door.</p>",
5: "<p>The lamp scar is from two years ago. Someone held road-pass paper too close. Edge curled, hit the shade. That person did not come back. Under the glass, a voided form. Three fields, not four. Older years. Missing Where. Rui Qiu was told before the shift: a line with no place comes back. She asked back to whom. The person who told her had already left. Half an eraser in the drawer. It has eaten ink. Black. Window on the alley. Sometimes a cough. No second cough. 22:00 is the stove mouth's hour, not the hospital's. Hospital night shift to 23:00. The stove mouth does not wait for the hospital.</p>",
6: "<p>Paper in the cabinet is by sleeve. Some labels in running hand. Some in that one-stroke school style. The school style is a sleeve Qian Xiaoman's teacher used — no. Last shift wrote a character that looks like student. Rui Qiu should not make a case out of handwriting on a sleeve. She should see if tonight's paste, ruler, day are in it. Sleeves with no word pull as empty skins. Empty skins still take a slot. The slots are there so you know tonight could have had this many papers. Not your turn to pull them yet.</p>",
7: "<p>The login bag is for the owner and the regular. The regular called out tonight. Reason: family business. What business, not written. Iron ring at the mouth is cold. Qian Pei bounces. Rui Qiu bounces. Relief does not exist in the system. The system is a notepad file named login. Two lines of asterisks. Not a password. Someone who cannot use notepad hammered keys. Do not spend time here before 22:00.</p>",
9: "<p>The forbidden page is for people who like to add to the address bar. Add a number, add English, add stove mouth, the black face catches it. The red type is a borrowed face, not written tonight. Tonight's stove-mouth book is still in the east-wing drawer. Not on the public net. The public net has no right to log a fire-pass. See red type, turn around. Go write your four fields.</p>",
10: "<p>Lao Hou's shop used to have a couplet. Upper line burned. Lower line left, two characters that used to mean paper is dear. One stroke missing. A coin corner under the counter glass. Some child pressed it in, year unknown. Cannot get it out. Tonight's bamboo came from backyard to front. Not Lao Hou carrying it. A wide-shouldered man. Set the bone down and left. No talk. Lao Hou later only said: the name the payer writes is the shoulder the paper figure is tied to. He says that to other customers in daylight. Not special for tonight. Special for tonight is the customer name on the order slip. That line goes in the bag before the backyard door will open from the cabinet.</p>",
11: "<p>The order-slip paper is the cheap kind. Light shows through. Through it you can see an unfinished Man on the back, like someone wrote another sheet on top of this one. Lao Hou denies it. The denial is short, like his downstroke. The forty under the tea jar is still there late. Nobody steals from this kind of shop. People who steal money do not come in. Adult is written heavy. Heavy enough to nick the paper. Paste seeped from the back at the nick, a pin point. Hold this slip to the lamp and you can see the seep. Seep means this slip was close to the backyard bowl.</p>",
12: "<p>The backyard has no name. Not a garden. Not a courtyard well. Bricks from an old wall. Some still have wall-brick marks, half pasted over. The paper-figure frame has an empty head. Empty head against the wall, waiting for a face. Goods waiting for a face are usually made before a living person has been written as deceased — Lao Hou will not say that. Lao Hou only says wait for the face to dry. Wind tonight skinned a film on the paste. A large fingerprint on the film. The small prints stay outside the film. They did not step in the ring. If the child walked himself, he walked outside the ring. The large pair inside turned, like measuring a shoulder.</p>",
13: "<p>ER hall lights are white. White enough to turn people into paper. The desk nurse is nodding. Badge flipped. Notices on the wall torn and restuck. Top layer is registration steps. The word death is not in the steps. The cardiology arrow has lost half. The half points at the toilet. The person who phoned about a heart-attack bed had an Official-Road Town mouth. The nurse passed the call to another building. The other building said no such number tonight. No such number can mean did not come, or came and was not logged. The notice will not write the second. The notice will only write the window did not write that name.</p>",
14: "<p>The archive room has people in daylight. Few enough that a morning can die looking for a stamp. At night the iron door comes down. The sound reaches the ER. The ER is used to it. The county cursed the closed public query. Cursed and left it closed. The cursing posts are not on this site. This site only keeps bring your ID. An ID will not help Rui Qiu tonight. Rui Qiu does not need an archive stamp. She needs the four fields not to grow a source that does not exist: the hospital said he died.</p>",
15: "<p>The board is a cafe kid's private host. Domain changes once a year. Posts lose a chunk when it changes. The lost chunk, people say, had someone cursing the paper-horse shop, and Lao Hou's nephew hit him — chat-forum legend. Legend does not go in the bag. The notice forum's manhole thread has thirty-odd replies, all cursing. The cover is still gone. Tonight's thread, who got someone to write papers, has few replies. Few because people see Sun Xiulan's name and do not want to take it. A name comes out, chat becomes a funeral. Funerals are not liked on this board.</p>",
16: "<p>Laobai on the south road is a butcher. He trusts his afternoon eye on a scale. He saw Qian Pei carry a sack. Feed, not a person. Alley-mouth only reports the light, not a person. Anon wrote the teacup ring like he was afraid nobody knew he was there. All these mouths together are a talk with many witnesses and nobody signing. The talk can let Rui Qiu know someone still saw him in the afternoon. It cannot let her write saw-in-the-afternoon as a verb in the four fields. Verbs come off the backyard and the ruler.</p>",
17: "<p>The worms on the old page eat the word not, like a grudge. Last shift taped that character. Tape yellowed. Character still there. Pass-holder line and body-measure line belonging to two people means a living name put on the road — Shijin funerals do not say that in public. In public they say a road pass should be neat. Neat is for the family. What actually governs is whether the two lines are the same person. Same person, fire-pass is only sending. Not the same person, fire-pass is borrowing a road.</p>",
18: "<p>People who came through here in a war year used a stand-in. Plague year too. The register does not write whether they got well. Only hold or no hold. The ones not held showed up the next year on a missing-person board. That board is not on this site. Tonight, if shoulder and birth hour are split, Rui Qiu should write tied as a stand-in, not issued a death-illness road pass. Death by illness is the family's wish. A wish can be turned in. Turned in, you get the other receipt. The receipt does not scold. It records which line you picked.</p>",
19: "<p>Rain-soaked register smells sweet. Sweet like paste. Also like mold. Copyists liked to round sentences. Rounded sentences read like stories. Stories have no hold. Rui Qiu should not learn from those copyists. Her four fields want hard, hard enough a family will not like to read them. The fragment's only usable bone: shoulder and birth hour in two houses, hold that night. The bone is not tonight's evidence. It is this room's temper. Temper can remind her: this place has held before. Held is not a legend.</p>",
20: "<p>The reporter was from the next county. One night and gone. Wrote the inn as still copies papers. Papers sounds nicer than road pass. Nicer gets past the desk. The township person who would not give a name turned a teacup three times before talking, and still said no complaint received. A complaint counts when it is on paper. What Sun Xiulan is holding tonight is not a complaint. It is a rush slip. The evening paper ran the Qian scale fight as filler. Filler has no given name. A nameless Qian cannot be merged with tonight's Qian Pei. If Rui Qiu picks the evening paper into the four fields, the fields go empty.</p>",
21: "<p>Xiaoman's space background is default blue. He does not change backgrounds. Posts from a phone. Typos. Uncle written as old. The white on the shoe is paste. He thought lime. Lime is on the school yard. Paste is in the paper-horse shop backyard. He cannot tell. He only knows it will not wash. Aunt crouched at the hospital door on the phone. He wrote that picture short. Short because he is afraid. Afraid sentences cannot be four fields. They can pin the child went out with Qian Pei in the afternoon onto paper. Once it is on paper, the birth-hour copy has a place to hang.</p>",
22: "<p>Classifieds are the cement-wall kind. Someone photographed them onto the net. The net kept the cement edge. The lost-hen post is real. The hen came back on its own. Nobody took the post down. The hire-to-copy-a-birth-hour number is dead. Dead number means someone thought about farming a birth hour out. That someone is not tonight's Qian Pei — Qian Pei's birth-hour copy is from a red paper at home. The hand is Sun Xiulan's. You can match that hand on the rush slip. Matching hands is later. Do not write later into the four fields early.</p>",
23: "<p>Sun Xiulan does not use a greeting. She wrote my man twice. Second time wrong, circled out. Ink spread at the circle, like cry-blur. It is hand sweat. She says the person at the hospital door told her not to wait. Who, the letter does not say. Neighbor said the backyard was lit. Which neighbor, also not. The letter is urgent. Urgent letters love to fill blanks for other people. Rui Qiu's job is not to fill those blanks. It is to see whether the line she wants written is the same fact as the ruler and the birth hour. Not the same fact, do not use her obituary voice.</p>",
24: "<p>The entry cites a Shijin Local Customs that does not exist. A book that does not exist got into the references, plus tourist-desk copy that calls a road pass a cultural experience. Nobody in Official-Road Town says cultural experience. People print the entry and use it as a form. The form is wrong. The entry writes pass-holder as optional. Optional is a tourist-desk invention. The duty desk's form wants all four fields. There is no optional. If Rui Qiu picks words from the entry she will pick a set of empty talk that cannot go through fire and cannot be held.</p>",
25: "<p>Old phone. Scratched screen. No reply under sent. I have Man with me — those words pin the child's place at 16:41, next to Qian Pei. Once pinned, the child not being home at night has weight. Weight is not all of the evidence. Taken in the afternoon, can be sent back at night, or not. The not-sent-back possibles get squeezed onto the small prints in the backyard. Small prints outside the ring. Outside means the child came close. Did not step in the paste.</p>",
26: "<p>The counter PC fan sounds like teeth grinding inside. xls opens slow. When it is slow the desktop flashes that XP blue once. Sticky-note hand is fountain pen. Lao Hou uses ballpoint, so not him. Fountain pen could be Qian Pei, or someone copying for him. Copying does not change that the birth hour is the child's. The original copy will write the day in full. Notch three nails the frame to an adult shoulder. Adult shoulder plus a child's day is the split. The split is the bone of tonight's four fields.</p>",
27: "<p>Paint unopened. Dust on the lid is old dust. Old dust means tonight never meant to paste a face. Face jobs, Lao Hou warms the paint by the stove. The stove edge is cold tonight. Eleven bamboo sticks will tie an adult chest. For a child there would be leftover. Leftover bone still in the basket, not split. Not split means no second frame tonight. No second frame, you cannot read it as one frame each for two people. One adult frame, one child's birth hour. That is the split.</p>",
28: "<p>The outgoing name on the book is only Liu. Liu wrote porch-light oil as topped, not filled, like he was afraid of a wage cut. Would not touch the east-wing lamp. Wrote hot. Hot is true. The scar is still there. Did not lift the yellow slip. Wrote afraid Sun Xiulan comes back looking. That sentence pins Sun Xiulan to the slip. Pinned is not four fields. It is handover. Handover can let Rui Qiu know the slip is not the inn's own writing. Inn writing, Liu will touch.</p>",
29: "<p>Public-board glass has a key scratch, a white slash. Extract to 18:00. After 18:00 the world does not exist on this paper. The drunk who smashed a bowl paid eight. Eight is written clear because it was easy. The scale fight broke up, so no names. Rui Qiu should not read no death report as good news. No report can mean not dead, or dead and nobody reported, or still walking in the alley, not yet a matter for a report. The public board only covers a few small things up to 18:00.</p>",
30: "<p>The form page is for people with new hands. New hands love hereby so-and-so died of illness. Died of illness is an obituary. An obituary can be turned in. Turned in, that is issued a death-illness road pass. Used hands split the four fields. Split, the seam between shoulder and birth hour shows. Seam shows, the stove-mouth row stays empty. Empty is better than rounded. Rounded lines, the ash is ordinary ash, and a missing-person slip grows on the wall. The name on the slip is often not the person you thought.</p>",
31: "<p>The red paper is in the dressing box. The cabinet only has the copy. Paste on the copy edge means this copy went to the backyard, or someone from the backyard touched this copy. Jiazi year, 8th month, 14th day, haishi. The day is the child's. After guoji the day did not change. An unchanged day written into the pass-holder line, the road collects under the child's name. The uncle's shoulder is on another slip. Do not merge the two sheets. Merge them and you get the round the family wants.</p>",
32: "<p>Mimeograph stamp so faint it is almost not there. The village paper was folded. The fold put guoji in the middle. People who fold there often miss those two words. Miss them and you think the child only lives with the uncle, so the day can merge too. The note is earthy. One earthy sentence is useful: birth hour still follows the birth. Follows the birth means the day does not walk with the shoulder. Day not with the shoulder, tonight you can write the object as Qian Xiaoman and the subject as Qian Pei.</p>",
33: "<p>The stove mouth is outside the east-wing back wall. A small hole. Usually boils water. For a fire-pass they add yellow paper. Smoke comes through the wall seam into the duty desk. When it comes in Rui Qiu coughs. The cough is not a rite. It is smoke. The empty row waits for 22:00. While it waits do not write already passed or not passed early. Last shift had someone write early. Got shouted at. The shouting is not on this page. This page only tells you: you turn in a line, the stove mouth works. The result is on the receipt, not in what you imagine.</p>",
34: "<p>A hold receipt is not pretty. Paper yellow. Stamp faint. If Sun Xiulan comes she will stand a long time. Standing a long time still cannot merge two fields into one dead person. When Rui Qiu pushes the receipt across she does not have to talk. Talk goes round. Round, the stove-mouth row gets itchy fingers. Itchy fingers are not what tonight should have. Tonight should have an empty row. Empty row keeps the child's birth hour off the road for now. For now is not forever. Forever is not in relief's permission.</p>",
35: "<p>Fire-pass ash is not cold until dawn. After it is cold someone will paste a slip on the wall. The person who pastes it may not be Sun Xiulan. It may be someone from the school looking for a student. If the name on the slip is Qian Xiaoman, the object in the four fields comes back for you. When it comes back the duty desk has already changed shift. The new shift cannot see why you picked obituary voice tonight. The reason for obituary voice is in the rush slip. The rush slip has sweat, circled-out words. No body.</p>",
36: "<p>The list of what cannot be established can run longer. Longer does tonight no good. The good is the short sentence: shoulder and birth hour were split, do not paste. Paste is manners. Manners after 22:00. Before 22:00 Rui Qiu only faces the four fields. Fields match, the lamp can go off. When the lamp goes off someone may still be walking in the alley. Who, these papers still will not say. Not saying is not to scare you. They truly did not see.</p>",
}

MORE = {
1: "<p>The dog at the inn door does not bark. Tonight it lies under the step with its eyes open. Someone came back from the alley. The dog did not lift its head. The firewood old man did. He asked Rui Qiu if she had eaten. She said yes. She had not. Not eaten, she still has to go into the east wing. The hinge complains. After it complains the lamp inside shows two wet patches on her shoes.</p>",
2: "<p>Room quilts are coarse cloth, washed pale. A long hair in the pale, not a peddler's crop. Rui Qiu does not handle hair. From room 2 she looks at the alley. Alley is dark. A drag in the dark, one then one. Bamboo, not a person. People do not walk that tight.</p>",
3: "<p>The yard table goes cold fast. A cup ring dries white. Before white it is brown. Brown, you can still smell tea. Tonight it is already white. White means the person has been gone a while. A while is enough for Qian Pei to walk to the paper-horse shop. Enough for him to walk back, the paper does not say.</p>",
4: "<p>Someone bookmarked the stopped column. The bookmark still says errand door. Open it and it is not a door. Not a door, people keep the bookmark, like it might become a door. It will not. What changes is the east-wing lamp. Oil gone, add oil.</p>",
5: "<p>Rui Qiu rolls her sleeves or she cannot write. Ink on the cuff from last shift, not hers. She tried the pen on the glass. Ink comes slow. A slow pen is right for four fields, not for a letter. Letters are Sun Xiulan's. Hers is not copying a wish from a letter into the fields.</p>",
6: "<p>Cabinet rust comes off on your hand. Then the rust goes onto the paper when you write. A few brown dots. Not blood. Tea. Tea dots are not rare here. Rare is empty sleeves still bound with a rubber band, like something is in them. Open them and there is nothing.</p>",
7: "<p>Login is stamped next to the iron ring. Mimeograph, smeared. Smeared, it looks like a wrong word for account. Someone asked the bookkeeper about that wrong word. The bookkeeper said not my bag. The bookkeeper is right. This bag is no use tonight.</p>",
9: "<p>Black ground, red type, a face borrowed from another site. The borrowed face does not know Shijin County. Better it doesn't. Saves it writing the stove-mouth address. Write the address and someone will go turn ash at midnight. Turned ash still will not show four fields.</p>",
10: "<p>Tin foil on the floor makes a small sound, like rain. None dropped tonight. Tonight is not foil work. It is frames. Frames do not sound. Frames lean on the wall. While they lean Lao Hou dozes in front. A dozing man is the least trouble. Least trouble walks by the slip.</p>",
11: "<p>The customer line is three characters, dead center, like someone was afraid to write them crooked. Lao Hou's hand is already crooked. Centered letters look more like Qian Pei wrote them himself. Write your own name, then let someone else copy the birth hour onto another sheet. That is the first step of a split.</p>",
12: "<p>The knife handle is wrapped in cloth. Blue cloth, thread coming. Paste on the thread. Dry paste goes white. Tonight it is not dry, so white with yellow in it. Yellow will not last till dawn. Things that will not last till dawn, look while the lamp is still on.</p>",
13: "<p>The desk clock runs three minutes fast. Fast clock moves the night-shift end forward. Forward still does not change did not write that name. Name not written, three minutes either way does nothing. Someone in the hall made a call, tore the number, two halves in two bins. The bins are the hospital's. The number is not.</p>",
14: "<p>Someone stuck a pile-ad on the iron door. Piles ads stay up more often than a death register. More often is not evidence. Evidence has to point at who this window wrote tonight. The window wrote nobody. More ads are still ads.</p>",
15: "<p>The host behind the cafe runs hot in summer and dies. When it dies a thread freezes on a floor. People screenshot frozen floors. Screenshots are not on this site. While this site is up, the live thread still will not give tonight many replies. Sometimes no reply is clearer than a reply.</p>",
16: "<p>A butcher's eye trusts a scale and a shoulder. He says tomorrow he will still see Qian Pei buy feed. A man who buys feed will not have a road opened tonight. That sounds like comfort. Comfort does not go in the bag. The bag wants a ruler and a day, not a neighbor's guess.</p>",
17: "<p>When they taped the word not, they cursed the worms. Worms still came. Still coming means someone is turning this page. Fingers with a sweet smell. Sweet is paste. Paste should not be on an old page unless someone with new paste on their hands came to turn an old rule tonight.</p>",
18: "<p>The missing-person board is not on this site. People here still remember what it looks like: red paper, ink, names written large. Large names are often children. Children's names written large so passersby can read them. When you are afraid they cannot read, the object in the four fields has already gone far.</p>",
19: "<p>Mold and paste mixed, you cannot tell which year's rain. Better you cannot. Rui Qiu should not fight over years. Fight over years and tonight becomes a story. Stories love round. Round is what you watch for.</p>",
20: "<p>The reporter left a receipt on the counter. A next-county restaurant. The restaurant does not touch the road-pass room. The firewood old man used that receipt to wrap melon seeds. Wrapping paper is closer to the days of this place than the evening paper.</p>",
21: "<p>An earlier post on the space: uncle taught him to read a scale. A child who can read a scale was taken into the alley in the afternoon to look at a paper figure with no face. What a no-face paper figure has to do with a scale, the child does not know. By the time he does not know, the shoe is already white.</p>",
22: "<p>Paste on a cement wall and paste in the paper-horse shop backyard are not the same. Wall is rain plus lime. Backyard is flour plus alum. Alum hits harder. That hit is in the alley tonight. It is not in the classifieds photo. The photo is daylight.</p>",
23: "<p>The letter has no header, like she did not know what to call it. Rush slip was added later in pencil on the counter. Liu added it. Liu was afraid Sun Xiulan would come back looking. After the add, the letter went into the cabinet. Before the cabinet it was only paper soaked with sweat.</p>",
24: "<p>The tourist desk writes fire-pass as an experience. Experience turns smoke into incense. Incense is what shops sell. Smoke comes out of the stove mouth and chokes. Choke does not go into an entry. Entries want to look good. A good-looking entry is no use tonight.</p>",
25: "<p>Only this one in the outbox. Only this one means he is not a man who likes to text. A man who does not like to text suddenly texts, and the text is taking a child, direction the alley. The alley ends at the paper-horse shop. End is not in the text. It is the road's.</p>",
26: "<p>Read-only xls cannot be changed. Better it cannot. Saves someone changing notch three to notch one, and the frame becoming a child's shoulder. Tonight it did not become. It did not become because the person who can edit is not in front of this PC.</p>",
27: "<p>Unsplit bone in the basket is whole. You can see the joints. Old bamboo, joints tight. Tight bone is right for an adult rib. For a child it would be too hard to paste. Too hard, Lao Hou would complain. Tonight he did not complain. He only dozed.</p>",
28: "<p>Liu's parentheses are very small, like he did not want the next shift to see. Seeing them does nothing. A boiled-dry tea stove is not tonight's four fields. The fields will not take a stove. A stove can only establish someone was on duty. The person on duty would not touch the east-wing lamp.</p>",
29: "<p>The white key-scratch looks like a road not finished. The road ends at the glass edge. Outside the edge is the station hall. Someone on duty at night, radio on. The radio does not have Official-Road Town. A radio without Official-Road Town cannot reach the east-wing lamp.</p>",
30: "<p>New hands love to write recommend as approved. Approved shows up, the permission tilts. This page crossed approved out. The cross is still there. Still there so relief can see: you can only recommend. A recommend can be held. It can also go through fire. Through fire, it is still a recommend the stove mouth heard.</p>",
31: "<p>The dressing box is not in the cabinet tonight. Not in the cabinet, the copy still works. It still works because paste is on the copy's edge, and that paste sticks the copy to the backyard in the same night. Two sheets, same night. One is a day. One is a shoulder. Do not merge.</p>",
32: "<p>Mimeograph faded, you can still feel the dent. The dent is the stamp. Village-committee stamp. The village committee does not govern tonight's stove mouth. The stamp only governs that guoji was pressed down once. Pressed down, the child's name walks with the uncle. The day still follows the birth.</p>",
33: "<p>The small stove usually boils water. Water boiling makes a sound. Tonight no water. The stove is cold. A cold stove waits for yellow paper. Yellow paper is still in the cabinet. It will not walk in before you turn in a line. The only thing that walks in by itself is smoke, and smoke waits for someone to light it. The person who lights it is not Rui Qiu.</p>",
34: "<p>The faint stamp on the receipt, you cannot tell Held from Held. The one with a period looks more like last shift carved it. The carver is gone. Gone, they left permission to relief, and all relief has is this yellow sheet. The yellow sheet does not explain where a living person is.</p>",
35: "<p>A handwritten slip on the wall wants paste. That paste is not the same bowl as the backyard. Not the same bowl, you can still smell sweet. On a sweet morning the duty desk has already changed. When it changes the ash is cold. Cold ash has no four fields. The four fields are on the sheet turned in last night.</p>",
36: "<p>Paper has edges. Outside the edge, paper does not write. In the unwritten maybe someone is still walking, maybe not. The maybe-not, relief has no right to write into a field. What you have no right to write, leave it in the alley. The alley is not this room's.</p>",
}

WAVE3 = {
1: "<p>Two street lamps on Official-Road Street have been dead two years. Two years, nobody fixed them. At night you walk by the inn's porch light. The porch light reaches the stone table. Past the table is the alley. In the alley people cannot see each other's faces. They can hear bamboo dragging. Some hear wind. Some hear work. The ones who hear work will take a shoulder to Lao Hou tonight. The ones who hear wind sleep. Rui Qiu hears neither. She is on shift.</p><p>The yellow slip on the counter has a dent from a finger. The depth of the dent shows Sun Xiulan's hand was shaking when she pressed it. A shaking hand writes a round rush slip. Round rush slips are the ones to watch.</p>",
5: "<p>Relief's drawer still has half a pack of hard candy stuck to a voided three-field form. Last shift left the candy. That person liked sweet. Sweet and tonight's paste are the same smell. Rui Qiu threw the candy out. Then she could write. When she cannot write she looks at the window. The one cough outside never had a second. Like someone swallowed it.</p><p>The four fields on the line card were added later. Cut into the wood of the table edge with a knife. Ink in the cuts. Black on the fingers. Black fingers on yellow paper leave a mark. The mark is not a stamp. No stamp tonight.</p>",
11: "<p>The order slip was folded once. The fold cuts the downstroke in Pei. The stroke is broken. You can still read it. After you can read it, do not take this slip as a death notice. A death notice has hospital red. This slip has no stamp, only a circle from the tea jar. In the circle, the edge of forty. Soft edge. Soft money is common in this shop. Common things cannot put a person on the road.</p>",
12: "<p>The empty-head frame leans on the wall. A flake of plaster came off. Old red on the flake. New-year red, never torn down. Old red and tonight's paste sit together, two things that should not meet. They met. Still do not write it as a story. Write it as a story and someone asks whose face the empty head got later. No face tonight. Goods with no face are not for someone already gone.</p>",
13: "<p>ER chairs are linked. People give each other elbow room. In the gap you can see the tile crack. Hair in the crack. Hair has nothing to do with tonight's name. The hospital has the most nothing. The most nothing can drown did not write that name. Before it drowns, the notice puts that sentence in a short place. Short so the night nurse explains less.</p>",
18: "<p>Stand-in does not come to the drinking table in Official-Road Town. Drinking tables like whose paper figures look good. Looking good is face. Under the face is the split. After the split, the road. The road collects by birth hour. The shoulder is tied to the payer. Two rules on one paper figure, the figure is not for one person. Not for one person, the verb in the four fields cannot still be death by illness.</p>",
23: "<p>Sun Xiulan uses almost no periods. A letter with almost no periods ties the ask into one rope. The rope cuts. In the cutting ask: don't ask me if I saw. The person who did not see most wants someone else to write that they saw. If someone else writes it, the stove mouth listens. The ash after it listens is ordinary ash. Ordinary ash has no explanation.</p>",
26: "<p>Notch three is 1 chi 6. In Official-Road Town, 1 chi 6 will cut a grown man's coat. A coat and a frame are not the same job. The shoulder is the same job. Shoulder matches adult. Day matches child. The child's name still walks with the uncle. A name that walks with the uncle makes people merge the day too. Merge it and the four fields become one person's death by illness. One person's death by illness is not enough tonight.</p>",
31: "<p>A haishi child, born at night. A night-born day written into the pass-holder line, the road also collects at night. If what it collects at night is a stand-in, it is not collecting the uncle. The uncle's shoulder is on the order slip. The order slip has no haishi. A slip with no haishi cannot go through fire alone. To go through fire you first paste the day on. Paste the day on and that is what someone wanted tonight that you should not help.</p>",
}

WAVE4 = {
2: "<p>Extra quilt means the blue-print one under the counter. Nobody folded the blue-print this year. Fold it and it goes damp. A damp quilt is not for walk-ins. Walk-ins are few tonight anyway. On a thin night it is easy to take the east-wing lamp for the inn still doing business. The inn does not do that business. That business is in the east wing. The east wing does not sell beds.</p>",
3: "<p>After the cat left, mice came out of the coal. Came out and still would not cross the stone table. The table was sat on and went warm. Mice remember warm. Remembered things have nothing to do with a road pass. Nothing to do, still part of this yard. What you cannot pick, leave in the brick crack.</p>",
4: "<p>Bookmarks will not save a stopped column. What they cannot save, the more you bookmark it the more it looks like a door. A page that looks like a door wastes 22:00. 22:00 is the stove mouth's. Not the bookmark's. The bookmark can close tonight.</p>",
6: "<p>A rubber band on an empty sleeve, left long enough, bites a white ring. The ring looks like a stamp was used. An empty that looks stamped makes people want to pull it more than no sleeve at all. Pull it, still empty. Empty, pull once anyway. Pull once, then you give up and pull the ones with words.</p>",
7: "<p>Those two asterisk lines were hammered. Maybe the owner's nephew. The nephew played on the PC. A PC someone played on is not permission. Tonight permission is only the line card. The line card works without a login.</p>",
10: "<p>The couplet's lower line, paper is dear, missing a stroke. The missing stroke looks smoked off. You cannot patch a smoked stroke. You can still read the word. The shop rule you can still read: name walks with shoulder. Birth hour copied apart. Copied apart is tonight's seam.</p>",
14: "<p>The piles ad falls and goes back up. The person who sticks it is more diligent than the person who fixes the death register. Diligent in the wrong direction. Wrong diligence will not help Rui Qiu. Rui Qiu does not go into the archive room. At night the iron door is down.</p>",
15: "<p>A board that changes domain once a year, old friends get lost. Lost people cannot find tonight's thread. Better they cannot. The ones who can find it still will not reply. A board that will not reply is cleaner than a busy one.</p>",
16: "<p>Feed sacks smell like bean cake. Bean cake stays on a butcher all afternoon. The man who still smells of it says Qian Pei can still carry. Can still carry is not four fields. Four fields wait for the ruler.</p>",
17: "<p>Worms eat not. They do not eat may. May is still there. The may that is still there is not the tourist-desk optional. The old page's may is you may hold. Hold depends on tonight's split, not on worms being kind.</p>",
19: "<p>Rain-soaked paper waves. On the waves the characters crowd. In the crowd, two houses can still be read. Can still be read is enough. Enough, do not take the fragment as tonight's order slip. The order slip is another sheet. Dry. Light shows through.</p>",
20: "<p>The next-county restaurant receipt wrapped melon seeds. The shells are under the stone table now. The shells under the table are wet. Wet is tonight's spit. The people who spit melon seeds tonight are not the reporter's lot. Do not merge lot after lot into one local story.</p>",
21: "<p>The default-blue space has an autoplay song. He did not change the title. An unchanged song has nothing to do with a paper figure. Autoplay with nothing to do makes the post look shorter. In the shorter post, the white on the shoe is the only hard thing.</p>",
22: "<p>After the speckled hen came back the post is still up. A post still up means nobody runs this site. A site nobody runs can still be true. What is true is the hen, not a pass-holder. The pass-holder is on the copy.</p>",
24: "<p>The reference book does not exist. A book that does not exist was cited three times. Three times, still does not exist. A customs that does not exist cannot teach you to fill four fields. The four fields are cut into the wood of the table edge. The cuts are harder than an entry.</p>",
25: "<p>The scratch on the screen looks like a key. The person who scratched it may not be Qian Pei. Qian Pei does not like to text. A man who does not like to text leaves fewer scratches. The fewer one, marked sent, looks like him.</p>",
27: "<p>Stove edge cold. Cold edge means the paint was not warmed. Unwarmed paint, old dust on the lid. Last month's dust. Last month's dust sitting on tonight's job, tonight's job is not a face. Not a face, still early.</p>",
28: "<p>Liu is afraid of a wage cut. That fear writes a very full handover. In the very full handover the useful sentence is still he would not touch the east-wing lamp. The lamp he would not touch is Rui Qiu's tonight. Rui Qiu's lamp is hot.</p>",
29: "<p>The radio sings out-of-town news. Out-of-town news sings the duty officer to sleep. A sleepy person cannot hear Official-Road Town's alley. Better they cannot. Hear it and it still will not go into an extract that stops at 18:00.</p>",
30: "<p>The crossed-out approved is still in the wood grain. Words in wood grain are harder to erase than words on paper. Hard to erase so every relief shift sees: you cannot approve. You can only turn in a line. After the line, the stove mouth decides whether to listen.</p>",
32: "<p>The fold put guoji in the middle. People in the middle miss it. Miss it and they merge the day into the uncle's name. Merge it into the uncle's name, the object is gone. Object gone, stand-in does not hold. Hold needs still follows the birth.</p>",
33: "<p>Smoke comes through the wall seam. When it comes, the duty desk opens a crack of window. The crack lets alley wind in. Paste smell in the wind. Paste smell and smoke smell do not arrive together. Tonight paste first. Paste first means the backyard moved first.</p>",
34: "<p>A yellow-paper receipt has no stamp. No stamp, in Sun Xiulan's eyes, looks like nothing was done. Nothing done is still done. Done means no fire-pass. Paper that did not go through fire stays in the cabinet. Cabinet rust will slowly come onto it.</p>",
35: "<p>If the school comes looking for a student they ask the inn first. The inn points at the east wing. The east wing has changed shift. The new shift only sees cold ash. Cold ash cannot say where a child went. Where a child went, ask whether last night's line was obituary voice.</p>",
36: "<p>The alley outside the edge has its own length. Length enough for a person to walk back to the livestock market. Enough for a child to walk back to school. Enough road, paper still will not write. An unwritten road is not one you can approve tonight.</p>",
}

def inject(html):
    import re
    m = re.search(r'data-page="(\d+)"', html)
    if not m:
        return html
    n = int(m.group(1))
    extra = (EXTRA.get(n) or "") + (MORE.get(n) or "") + (WAVE3.get(n) or "") + (WAVE4.get(n) or "")
    if not extra:
        return html
    mark = f'<footer class="pg">{n}/36</footer>'
    return html.replace(mark, f'<section class="thick">{extra}</section>\n{mark}', 1)

def main():
    intro = INTRO.replace(
        "Shijin County, Official-Road Town, the Qian house: written places and people. Do not match them to a plate outside this door.",
        "Shijin County, Official-Road Town, the Qian house: written places and people. Do not match them to a plate outside this door."
        "</p><p>Relief used to copy notices in town. Notices want neat. Neat is not tonight's job. Tonight's papers fight each other. When they fight you only pick words already on the face. You do not invent a fourth verb. After you enter, this manual page does not follow. The bag follows. The bag sits under every page."
    )
    (ROOT / "introduction.html").write_text(intro, encoding="utf-8")
    for rel, _d, html in PAGES:
        path = ROOT / rel
        path.parent.mkdir(parents=True, exist_ok=True)
        path.write_text(inject(html), encoding="utf-8")
    print("wrote", 1 + len(PAGES), "html")

if __name__ == "__main__":
    main()

