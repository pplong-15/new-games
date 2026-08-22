#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Emit 42 numbered pages + ≥45 unique stills for 古镇夜戏."""
from __future__ import annotations

import random
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
BASE = ROOT / "assets" / "base"
STILL = ROOT / "assets" / "stills"
TOTAL = "42"

TICKER = {
    "town-dusk.jpg", "ticket-window.jpg", "temple-niche.jpg", "empty-seats.jpg",
    "netcafe-crt.jpg", "troupe-office.jpg", "inn-corridor.jpg", "playbill-blur.jpg",
}


def hanzi(s: str) -> int:
    return sum(1 for ch in s if "\u4e00" <= ch <= "\u9fff")


def make_still(src: Path, dest: Path, seed: int, ticker: bool) -> None:
    rng = random.Random(seed)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    top = int(h * (0.18 if ticker else 0.03))
    box = (
        int(w * rng.uniform(0.0, 0.1)),
        top,
        int(w * rng.uniform(0.9, 1.0)),
        int(h * rng.uniform(0.88, 1.0)),
    )
    if box[2] - box[0] < 40 or box[3] - box[1] < 40:
        box = (0, top, w, h)
    im = im.crop(box).resize((640, 480), Image.Resampling.BICUBIC)
    if rng.random() < 0.3:
        im = ImageOps.mirror(im)
    im = ImageEnhance.Color(im).enhance(rng.uniform(0.6, 1.15))
    im = ImageEnhance.Contrast(im).enhance(rng.uniform(0.88, 1.2))
    im = ImageEnhance.Brightness(im).enhance(rng.uniform(0.78, 1.1))
    if rng.random() < 0.4:
        im = im.filter(ImageFilter.GaussianBlur(radius=rng.uniform(0.2, 0.8)))
    px = im.load()
    for y in range(0, 480, 3):
        for x in range(640):
            r, g, b = px[x, y]
            d = rng.randint(-14, 14)
            px[x, y] = (max(0, min(255, r + d)), max(0, min(255, g + d - 3)), max(0, min(255, b + d - 6)))
    for _ in range(700):
        x, y = rng.randint(0, 639), rng.randint(0, 479)
        r, g, b = px[x, y]
        n = rng.randint(-36, 36)
        px[x, y] = (max(0, min(255, r + n)), max(0, min(255, g + n)), max(0, min(255, b + n)))
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=rng.randint(64, 78), optimize=True)


def p(prefix: str, token: str, extra_js: str = "") -> str:
    up = "../" if prefix else ""
    grant = f'if(window.GXZ)GXZ.grant("{token}");' if token else ""
    extra = f'<script src="{up}js/{extra_js}"></script>' if extra_js else ""
    return f'''  <link rel="stylesheet" href="{up}css/shots.css">
  <script src="{up}js/tokens.js"></script>
  <script src="{up}js/keyword-search.js"></script>
  <script src="{up}js/keywords.js"></script>
  {extra}
  <script>document.addEventListener("DOMContentLoaded",function(){{{grant}}});</script>
'''


def search_form(prefix: str) -> str:
    act = f"{prefix}search-results.html"
    return f'''<form id="search-form" action="{act}" method="get">
        <input id="search-input" name="q" placeholder="关键词" autocomplete="off">
        <button type="submit">检索</button>
      </form>'''


def img_tag(prefix: str, name: str, alt: str) -> str:
    return f'<img class="shot" alt="{alt}" src="{prefix}assets/stills/{name}">'


def shop(file, title, no, token, body, img, alt, extra_js=""):
    root = "/" not in file or not file.startswith("pages/")
    # file like index.html or pages/x - actually shop pages are root
    prefix = "" if not str(file).startswith("pages/") else "../"
    nav_p = prefix
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-shop-local-2010s">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/shop-local-2010s.css">
{p(prefix, token, extra_js)}
</head>
<body>
  <div id="container">
    <header>
      <a class="logo" href="{nav_p}index.html">槐溪古镇文旅</a>
      {search_form(prefix)}
    </header>
    <nav id="menubar">
      <ul>
        <li><a href="{nav_p}index.html">首页</a></li>
        <li><a href="{nav_p}ticket.html">购票</a></li>
        <li><a href="{nav_p}heritage.html">夜戏</a></li>
        <li><a href="{nav_p}traffic.html">交通住宿</a></li>
        <li><a href="{nav_p}guestbook.html">游客留言</a></li>
        <li><a href="javascript:void(0)">退票办理</a></li>
      </ul>
    </nav>
    <main>
      {img_tag(prefix, img, alt)}
      {body}
    </main>
  </div>
  <footer>桐县槐溪古镇文旅</footer>
</body>
</html>
'''


def corp(file, title, no, token, body, img, alt):
    prefix = "../" if str(file).startswith("pages/") else ""
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-corp-table-2005">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/corp-table-2005.css">
{p(prefix, token)}
</head>
<body>
  <table class="site" cellspacing="0" cellpadding="0">
    <tr><td colspan="2" class="banner">桐县实验剧团
      {search_form(prefix)}
    </td></tr>
    <tr><td colspan="2" class="nav">
      <a href="{prefix}pages/troupe.html">首页</a>|
      <a href="{prefix}pages/visit.html">参观须知</a>|
      <a href="{prefix}pages/playbill.html">本周戏单</a>|
      <a href="{prefix}pages/staff.html">演职员</a>|
      <a href="{prefix}pages/history.html">团史</a>|
      <a href="javascript:void(0)">后台预约</a>
    </td></tr>
    <tr>
      <td class="left">
        <h4>栏目</h4>
        <p><a href="{prefix}pages/troupe.html">剧团简介</a></p>
        <p><a href="{prefix}pages/visit.html">参观须知</a></p>
        <p><a href="{prefix}pages/leave.html">告假公示</a></p>
        <p><a href="{prefix}pages/baixi.html">白戏附则</a></p>
        <p><a href="{prefix}pages/login.html">票务查询</a></p>
      </td>
      <td class="main">
        {img_tag(prefix, img, alt)}
        {body}
      </td>
    </tr>
    <tr><td colspan="2" class="ft">桐县实验剧团　办公电话不外接退票</td></tr>
  </table>
</body>
</html>
'''


def forum(file, title, no, token, body, img, alt):
    prefix = "../"
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-discuz-board">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/discuz-board.css">
{p(prefix, token)}
</head>
<body>
  <div class="wp">
    <div class="hd">
      <a class="logo" href="{prefix}pages/forum.html">槐溪茶馆</a>
      <span class="y"><a href="javascript:void(0)">登录</a></span>
      {search_form(prefix)}
    </div>
    <div class="nv">
      <a href="{prefix}pages/forum.html">论坛</a>
      <a href="{prefix}pages/forum-rules.html">站务</a>
      <a href="{prefix}index.html">回文旅</a>
    </div>
    {img_tag(prefix, img, alt)}
    {body}
    <div class="pages"><strong>1</strong></div>
  </div>
  <div class="ft">槐溪茶馆　2008备份</div>
</body>
</html>
'''


def blog(file, title, no, token, h1, sub, body, img, alt):
    prefix = "../"
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-blog-personal-2008">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/blog-personal-2008.css">
{p(prefix, token)}
</head>
<body>
  <div class="top"><h1>{h1}</h1><p>{sub}</p></div>
  <div class="nav">
    <a href="{prefix}pages/forum.html">回茶馆</a>
    <a href="{prefix}index.html">文旅</a>
  </div>
  <div class="wrap"><div class="main">
    {img_tag(prefix, img, alt)}
    {body}
  </div></div>
  <div class="ft" style="text-align:center;font-size:12px;color:#666">个人博客</div>
</body>
</html>
'''


def gov(file, title, no, token, body, img, alt):
    prefix = "../"
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-gov-redbar">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/gov-redbar.css">
{p(prefix, token)}
</head>
<body>
  <div class="red"><h1>槐溪地方文献</h1><p>桐县文化馆抄件　无机关徽标</p></div>
  <div class="links">
    <a href="{prefix}pages/temple.html">老郎庙</a>
    <a href="{prefix}pages/stele.html">碑刻</a>
    <a href="{prefix}pages/incense.html">香火账</a>
  </div>
  <div class="wrap">
    {img_tag(prefix, img, alt)}
    {body}
  </div>
  <p style="text-align:center;font-size:12px">槐溪文献</p>
</body>
</html>
'''


def desk(file, title, no, token, body, img, alt, extra_js=""):
    prefix = "../"
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-service-cyan-desk">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/service-cyan-desk.css">
{p(prefix, token, extra_js)}
</head>
<body>
  <div id="wrap">
    <header>
      <strong>文旅票务查询</strong>
      <div>
        <a class="ghost-btn" href="{prefix}pages/login.html">查询</a>
        {search_form(prefix)}
      </div>
    </header>
    {img_tag(prefix, img, alt)}
    {body}
  </div>
  <p style="text-align:center;font-size:12px;color:#666">票务后台</p>
</body>
</html>
'''


def archive(file, title, no, token, body, img, alt, extra_js=""):
    prefix = "../"
    return f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-archive-simsun">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="{prefix}css/archive-simsun.css">
{p(prefix, token, extra_js)}
</head>
<body>
  <article class="record">
    <h1>{title}</h1>
    <div class="meta"><span>桐县实验剧团</span><span>2014-08-21</span></div>
    {img_tag(prefix, img, alt)}
    {body}
  </article>
  <p style="text-align:center;font-size:12px">抄件</p>
</body>
</html>
'''


def paras(xs) -> str:
    return "\n".join(f"<p>{x}</p>" for x in xs)


def extra_copy(key: str) -> str:
    """从 COPY_SUPPLEMENT.md 读该页的差异化抄件（grok 补体量产出）。"""
    md = (ROOT / "COPY_SUPPLEMENT.md").read_text(encoding="utf-8")
    out = {}
    cur = None
    parts = []
    for line in md.split("\n"):
        if line.startswith("### "):
            if cur is not None:
                out[cur] = parts
            cur = line[4:].strip()
            parts = []
        elif cur is not None and line.strip():
            parts.append(line.strip())
    if cur is not None:
        out[cur] = parts
    ps = out.get(key)
    if not ps:
        return ""
    body = "\n".join("<p>" + b + "</p>" for b in ps)
    return '<div class="supp">' + body + "</div>"



def write(path: Path, html: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(html, encoding="utf-8")


def stills():
    bases = sorted(BASE.glob("*.jpg"))
    STILL.mkdir(parents=True, exist_ok=True)
    names = []
    for i in range(48):
        src = bases[i % len(bases)]
        name = f"s{i+1:02d}.jpg"
        dest = STILL / name
        if not dest.exists():
            make_still(src, dest, seed=4200 + i, ticker=src.name in TICKER)
        names.append(name)
    return names


def intro():
    return '''<!DOCTYPE html>
<html lang="zh-CN" class="skin-intro-manual">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>桐县文旅　短信回执</title>
  <link rel="stylesheet" href="css/intro-manual.css">
</head>
<body>
  <header class="intro-hero"><h1>桐县文旅</h1></header>
  <main>
    <section>
      <h2>购票短信回执</h2>
      <p>收件人：沈南</p>
      <p>票号：YX-0821-19　今晚槐溪非遗夜戏。</p>
      <p>退票通道已关闭。状态写成：已开锣。</p>
      <p>吴窗只回了一句：对一下购票页和县剧团参观须知。两页不是同一出，别只盯退票键。</p>
      <p>外网论坛镜像还能打开。票务查询要票号或手机号。</p>
      <div class="boot-actions">
        <a class="enter-link" href="index.html">打开购票页</a>
        <button type="button" class="ghost" id="wipe">清本机记录</button>
      </div>
    </section>
  </main>
  <script>
    document.getElementById("wipe").onclick=function(){
      localStorage.removeItem("guxz-v1");
      location.href="index.html";
    };
  </script>
</body>
</html>
'''


def search_page():
    return '''<!DOCTYPE html>
<html lang="zh-CN" class="skin-search-results">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>检索结果</title>
  <link rel="stylesheet" href="css/search-and-forbidden.css">
  <script src="js/tokens.js"></script>
  <script src="js/keywords.js"></script>
  <script src="js/keyword-search.js"></script>
</head>
<body>
  <div class="box"></div>
  <footer style="text-align:center;font-size:12px;color:#666">检索</footer>
</body>
</html>
'''.replace("{TOTAL}", TOTAL)


def main():
    S = stills()
    files = []

    def rec(rel, html):
        if rel not in ("introduction.html", "search-results.html"):
            html = html.replace("</body>", extra_copy(rel) + "\n</body>")
        write(ROOT / rel, html)
        files.append(ROOT / rel)

    rec("introduction.html", intro())
    rec("search-results.html", search_page())

    rec("index.html", shop("index.html", "槐溪古镇文旅", "01", "t_home", paras([
        "槐溪今晚有夜戏。文旅把折子戏写成非遗套票，含车、含宿、含后台参观。后台两个字是宣传科加的，剧团那边没盖章。",
        "退票办理那栏点了没反应。系统写已开锣。开锣两个字什么时候打上去的，窗口说问剧团。",
        "游客留言里有人把旧论坛链回来了，茶馆还在。要对照班规，得去县实验剧团自己的站。",
        "地址写桐县槐溪镇石板街。班车到镇上还要走一段。夜戏七点开锣，白戏在下午，白戏不卖这套票。",
        "本站模板二〇一二年买的。配色改过，栏目没改。暂停的栏继续挂着，免得有人问为什么少了一格。",
    ]) + '<p><a href="ticket.html">购票须知</a>　<a href="pages/troupe.html">县实验剧团</a>　<a href="guestbook.html">游客留言</a></p>', S[0], "石板街傍晚"))

    rec("ticket.html", shop("ticket.html", "购票须知", "02", "t_ticket", paras([
        "套票名称：槐溪非遗夜戏。剧目《目连》折子「过奈何」。日期八月二十一日。票号当场生成，你这张是 YX-0821-19。",
        "含项：观众席东七排、往返班车位、客栈一晚、后台参观。后台参观写在星号后面，星号说明是文旅加项，不是剧团的座次。",
        "退票：开锣前两小时可退。系统此刻写已开锣，键是灰的。客服吴窗的话术只有一句，别跟她吵开锣两个字。",
        "购票手机号会写入出行名单。名单给车队，也给剧团。剧团拿去干什么，本页不写。你的号是 13972810834。",
        "夜戏与白戏不是同一张票。白戏下午开，不写应工，也不含后台。有人问能不能改挂，窗口说走剧团附则。",
    ]), S[1], "售票窗"))

    rec("traffic.html", shop("traffic.html", "交通住宿", "03", "", paras([
        "班车在桐县客运站发。末班四点四十，误了只能包面的。面的不认套票，认现金。",
        "镇上客栈叫槐溪居。走廊灯坏了一半，门牌号看不清的那几间不安排给套票客。你的单子写了东厢。",
        "石板街下雨滑。文旅不赔鞋。夜戏散场后有人带路回客栈，带路的人不是检场，检场今晚告假。",
        "停车位只有八个。自驾的把车停镇口空坝，坝子夜里没有灯。坝子边上有个茶馆招牌，那是论坛的名字来源，不是喝茶的地方。",
        "改签住宿要找槐溪居前台，不找吴窗。前台只认身份证，不认票号。票号是剧团那边的事。",
    ]), S[2], "车站"))

    rec("heritage.html", shop("heritage.html", "非遗夜戏", "04", "", paras([
        "宣传稿把《目连》写成孝戏。过奈何那折短，一个时辰内能完。游客爱拍上场门，上场门不让拍，稿子里没写。",
        "夜戏要齐人。齐人两个字不是营销，是班里的话。文旅写成氛围好。氛围好卖得出去。",
        "老郎庙在镇西。文保的人叫乔干，讲碑不讲戏。戏的事问剧团。庙里香火账有时跟戏单对得上，有时对不上。",
        "白戏卖本地人。夜戏卖外地人。两套票、两套座、两本账。本页只卖夜戏。",
        "有人搜目连会进剧团戏单。戏单边注不在文旅站。边注是内部抄件。",
    ]), S[3], "戏台"))

    rec("stay.html", shop("stay.html", "槐溪居", "05", "", paras([
        "客栈老板不看戏。他说夜戏散得晚，热水到十点。十点以后自己烧。",
        "东厢窗外是巷子。巷子通上场门那条路，路不让客人走。走了会被喊回来。喊的人以前是狄厚，狄厚这两天不在。",
        "早餐只有粥。粥桶边贴过一张旧戏单，字糊了。糊了的那张不是今晚的。",
        "有房客把手机号写进意见本，意见本给文旅。文旅再给剧团。这条链路本页不负责解释。",
        "退房十二点。夜戏票退不退跟房钱无关。房钱能退，戏票不能，窗口就爱把这两句绑在一起说。",
    ]), S[4], "客栈院子"))

    rec("guestbook.html", shop("guestbook.html", "游客留言", "06", "", paras([
        "豆皮（2008）：后台参观个屁。我被写成龙套。帖子还在茶馆。",
        "马句（2009）：外地号进簿了。退是退了钱，那一行没涂。别问我后来。",
        "本地人：白戏才是给人看的。夜戏给外面人看。两码事。",
        "吴窗工号回复：退票请看购票页状态。已开锣不能退。重复咨询不回复。",
        "茶馆镜像还开着。从这边进：槐溪茶馆。站务说停更，帖还在。",
    ]) + '<p><a href="pages/forum.html">打开槐溪茶馆</a></p>', S[5], "网吧电脑"))

    rec("pages/troupe.html", corp("pages/troupe.html", "桐县实验剧团", "07", "", paras([
        "本团承担槐溪庙戏。白戏给镇上，夜戏给文旅套票。两套不是一出，别拿套票须知来顶班规。",
        "班主程石。检场狄厚。狄厚本月告假，告假条在公示栏。缺的那行应工，班里自己补，不对外说明怎么补。",
        "参观须知写后台禁客。文旅爱写含后台参观。含了也不放人。放人要应工簿有名。",
        "票务查询走另一扇门。要票号。本团不接退票电话。退票是文旅的键，键灰了找文旅。",
        "办公在旧礼堂西厢。西厢不对外开放。对外开放的只有戏单和须知这两页。",
    ]), S[6], "办公桌"))

    rec("pages/visit.html", corp("pages/visit.html", "参观须知", "08", "t_visit", paras([
        "后台禁客。上场门、下场门、祖师龛前，客人不入。宣传科写的参观，以本页为准。",
        "开锣后票不退。开锣以应工簿点齐为准，不以观众席坐满为准。点齐了，系统就会写成已开锣。",
        "客人在东七排。东七排到上场门有一条员工通道。通道不是参观路线。有人把你从东七排带走，按班规走，不按套票走。",
        "夜戏应工要齐。缺检场的晚上，班主有权把出行名单里的手机号写入临时龙套。写入之后，这个号算角，不算客。",
        "白戏不按此条。白戏附则另页。不要用白戏的退法来退夜戏。",
    ]), S[7], "后台衣箱"))

    rec("pages/playbill.html", corp("pages/playbill.html", "本周戏单", "09", "t_xidan_pub", paras([
        "八月二十一日夜场：《目连》过奈何。开锣十九点。",
        "应工：目连——团内；过奈何鬼卒——轮值；检场——狄厚（告假）；临时龙套——待补。",
        "待补那一行，边注不印在这张网上戏单。边注在扫描件。扫描件要票务里才能调。",
        "观众席东七排给套票。套票名单与应工簿不是同一本。不是同一本也会被写成同一号，这事问程石。",
        "白戏八月二十二日下午，剧目另出。白戏戏单不写龙套，不写外地号。",
    ]) + '<p>网上这张是给外面看的。边注在抄件里。</p>', S[8], "糊掉的戏单"))

    rec("pages/staff.html", corp("pages/staff.html", "演职员", "10", "", paras([
        "程石，班主，管齐人。说话短。不接受采访。",
        "狄厚，检场。检场不是看门的，是上场前把道具摆对的人。本月十八日起告假，假条写回乡办丧。不是病，不是事假以外的说法。",
        "跑龙套不定人。谁写进应工簿谁算。写过外地游客，写过学徒。学徒这周不在。",
        "文旅的人不要往演职员里填。填了也是临时。临时两个字在簿上能看见。",
        "要找狄厚，公示栏有告假。告假不是除名。除名是会馆的事，本团不做会馆除名。",
    ]), S[9], "空座位"))

    rec("pages/leave.html", corp("pages/leave.html", "告假公示", "11", "t_dihou", paras([
        "狄厚，检场，八月十八日至二十五日告假。事由：回乡办丧。假条原件在西厢抽屉，网上只挂摘要。",
        "告假期间检场应工空一行。空行由班主调度。调度结果不在本页更新。",
        "有人把空行理解成缺人演戏。缺的是检场，不是目连。目连有人。检场没人，开锣仍要齐。",
        "齐的办法见参观须知第四条。第四条不在公示里重复。",
        "狄厚的手机关机。不要让游客打给他。打了也是他弟弟接，他弟弟不看戏。",
    ]), S[10], "走廊"))

    rec("pages/history.html", corp("pages/history.html", "团史", "12", "", paras([
        "剧团一九九四年从县文工团分出来。分出来的时候后台有一块老郎牌，牌是镇上庙里借的，后来还了，还了又借。",
        "夜戏是二〇〇六年文旅提出来的。提出来为了卖票。班规没为卖票改过，改的是出行名单怎么用。",
        "档案室不对外开放。对外开放的文献在文化馆。文化馆有香火账抄件，抄件能对年份，不能对今晚。",
        "有记者问过齐人。程石说齐人是开锣的事，不是采访的事。采访到此为止。",
        "本页不写神的事。神的事在庙。庙的人叫乔干。乔干不排戏。",
    ]), S[11], "石桥"))

    rec("pages/forum.html", forum("pages/forum.html", "槐溪茶馆", "13", "", '''
    <table class="forum">
      <tr><th></th><th>版块</th><th>主题 / 帖数</th><th>最后发表</th></tr>
      <tr><td></td><td><a href="thread-doupi.html">夜戏见闻</a><p>看过的人回来骂</p></td><td class="num">41 / 890</td><td class="last">豆皮</td></tr>
      <tr><td></td><td><a href="thread-food.html">吃喝</a><p>面、豆腐、不吃戏台边的</p></td><td class="num">12 / 77</td><td class="last">本地</td></tr>
      <tr><td></td><td><a href="thread-hotel.html">住宿投诉</a><p>热水、跳蚤、门牌</p></td><td class="num">9 / 40</td><td class="last">马句</td></tr>
      <tr><td></td><td><a href="thread-guide.html">攻略</a><p>拍景，不拍后台</p></td><td class="num">6 / 21</td><td class="last">路人</td></tr>
      <tr><td></td><td><a href="forum-rules.html">站务</a><p>停更说明</p></td><td class="num">2 / 8</td><td class="last">斑竹</td></tr>
    </table>
    <p>茶馆二〇〇八年开的。现在是镜像。要看龙套那档事，进夜戏见闻。</p>
    ''', S[12], "旧电脑"))

    rec("pages/thread-doupi.html", forum("pages/thread-doupi.html", "我被写成龙套", "14", "t_forum", '''
    <div class="floor"><div class="u"><div class="av"></div><b>豆皮</b><p>积分 19</p></div>
    <div class="t"><div class="ti">发表于 2008-08-16 22:11</div>
    <p>我买的是观众票。散场前有人从东七排把我叫走。叫走的人说应工簿有我手机号，临时龙套。我说我是游客。他说游客也能写。</p>
    <p>后台参观是文旅印的。剧团须知写禁客。两张纸我都带来了，没人看。钱后来退了一部分，那一行没涂。马句比我早一年，他更清楚。</p>
    <p>你们要看，就搜龙套。别搜鬼，这儿没鬼，有班规。</p>
    <div class="sig">签名：回去还不看戏</div></div></div>
    <div class="floor"><div class="u"><div class="av"></div><b>斑竹</b><p>积分 80</p></div>
    <div class="t"><div class="ti">发表于 2008-08-16 23:02</div>
    <p>别在标题写中邪。写了就沉。班规的事去剧团须知。须知第四条。</p></div></div>
    ''', S[13], "戏台夜"))

    rec("pages/thread-maju.html", forum("pages/thread-maju.html", "外地号", "15", "t_maju", '''
    <div class="floor"><div class="u"><div class="av"></div><b>马句</b><p>积分 7</p></div>
    <div class="t"><div class="ti">发表于 2009-07-03 01:14</div>
    <p>我的号当时是 1370 开头的，现在不用了。写入应工簿的就是购票那个号。退票退了，香火账那炷还在。戏单边注也在。三本不是一本。</p>
    <p>程石不接电话。狄厚那时候还没告假。告假是后来的人的事。你们今晚要是缺检场，小心出行名单。</p>
    <p>博客我还留着。不想在茶馆说的，去那边。</p>
    <div class="sig">签名：号换了</div></div></div>
    ''', S[14], "巷子"))

    rec("pages/thread-food.html", forum("pages/thread-food.html", "镇上吃饭", "16", "", '''
    <div class="floor"><div class="u"><div class="av"></div><b>本地老张</b></div>
    <div class="t"><div class="ti">发表于 2010-04-02</div>
    <p>戏台边那碗面贵，且不好吃。要吃去石板街口。豆腐脑早上才有。夜戏散了只有面。面里胡椒多，别怪我没说。</p>
    <p>不要跟厨子聊戏。厨子家有人在班里，聊了会把你的话传回去。传回去没什么好下场，也没什么坏下场，就是麻烦。</p></div></div>
    ''', S[15], "茶桌"))

    rec("pages/thread-hotel.html", forum("pages/thread-hotel.html", "槐溪居热水", "17", "", '''
    <div class="floor"><div class="u"><div class="av"></div><b>马句</b></div>
    <div class="t"><div class="ti">发表于 2009-07-04</div>
    <p>热水到十点是真的。十点以后自己烧，烧的是煤炉，烟会倒灌。门牌看不清那几间别住，不是闹鬼，是老鼠。</p>
    <p>意见本真的会到剧团。别写手机号。我就是这么写进去的。</p></div></div>
    ''', S[16], "客栈走廊"))

    rec("pages/thread-guide.html", forum("pages/thread-guide.html", "拍照攻略", "18", "", '''
    <div class="floor"><div class="u"><div class="av"></div><b>路人甲</b></div>
    <div class="t"><div class="ti">发表于 2011-09-18</div>
    <p>石桥好拍。戏台好拍。上场门不好拍，拍了有人出来挡。挡的人不是鬼，是检场。检场告假的晚上不知道谁挡。</p>
    <p>攻略到此。别问退票。退票去文旅。文旅键是灰的就对了。</p></div></div>
    ''', S[17], "石桥"))

    rec("pages/forum-rules.html", forum("pages/forum-rules.html", "站务", "19", "", '''
    <p>槐溪茶馆停更。镜像只读。禁止发中邪、驱邪、寻人。班规讨论保留。斑竹不修帖。</p>
    <p>外链只留文旅和剧团。文化馆文献站能进。票务后台随他们开不开。</p>
    ''', S[18], "电脑"))

    rec("pages/blog-doupi.html", blog("pages/blog-doupi.html", "豆皮的窗", "20", "", "豆皮的窗", "不看戏了", paras([
        "那晚从东七排被叫走，我还以为是坐错了。坐错会换座位，不会换名分。名分写在簿上。簿上有我号。",
        "钱退了百分之七十。百分之三十说是已开锣的手续费。开锣的时候我还在座位上喝水。",
        "茶馆里有人让我别写中邪。我本来也没写。我写的是龙套。龙套两个字比鬼准。",
        "后来没再去槐溪。有人问攻略，我说看须知第四条。第四条比攻略短。",
        "马句比我早。他博客比我写得清楚。清楚也没用，系统照样灰键。",
    ]), S[19], "窗"))

    rec("pages/blog-maju.html", blog("pages/blog-maju.html", "马句", "21", "", "换号以后", "外地人", paras([
        "号换了，账没换。香火账那一炷还写着旧号的后四位。戏单边注写着临时。临时了好几年。",
        "我没有被留下演戏。留下的是名字。名字留下比人留下省事。",
        "有人问怎么划掉。划掉要三本对上：应工簿、戏单边注、香火账。对上了找程石。程石不一定划。",
        "白戏不写外地号。想退得干净，去看白戏附则。夜戏别想干净。",
        "这篇二〇〇九年写的。今天还挂着。挂着不代表有效。有效的是今晚的簿。",
    ]), S[20], "账本"))

    rec("pages/temple.html", gov("pages/temple.html", "老郎庙", "22", "", paras([
        "乔干抄。庙里中奉开元皇帝，班里叫老郎。游客叫神仙。叫错了乔干不纠正，纠正也记不住。",
        "碑在西墙。碑文讲寓所、支差，不讲怎么请班，也不讲怎么送。问做法的人请回。",
        "香火账按日登记。夜戏多一炷的时候，账上会多一个外地号后四位。后四位不是名。名在剧团。",
        "本庙不售票。票在文旅。庙开到五点。夜戏开锣时门关。门关了还有人来对账，对账走文化馆抄件。",
        "老郎两个字能搜到碑刻页。搜驱邪搜不到。搜不到是故意的。",
    ]), S[21], "龛"))

    rec("pages/stele.html", gov("pages/stele.html", "碑刻说明", "23", "", paras([
        "碑题从略。大意：梨园寓所，中奉开元皇帝。支差按班，不按客。客入寓所，以应工论。",
        "以应工论四个字，文化馆解释成：客人若被写进班里的簿，就按班里的人管。解释不是做法。",
        "拓片在柜子里。柜子不上网。上网的是这段说明。说明会删「如何」类句子。",
        "与今晚有关的，是香火账，不是碑。碑不管八月二十一日。",
        "拍照可以。闪光不行。乔干下班五点。五点以后别敲门。",
    ]), S[22], "龛侧面"))

    rec("pages/incense.html", gov("pages/incense.html", "香火账", "24", "t_xianghuo", paras([
        "抄件。八月二十一日夜。正额一炷。加记一炷，备注 0834。0834 是手机号后四位。",
        "加记不是功德。加记是夜戏齐人时跟剧团对过的。对过的人不在庙里。",
        "马句那年的加记后四位已经涂了一次，又被人描回来。描回来的人不是乔干。",
        "要划掉今晚这炷，得剧团三本账一起到。只拿香火账不够。只拿订单也不够。",
        "白戏日不写加记。白戏日账是干净的。干净两个字在这儿只表示没有后四位。",
    ]), S[23], "合上的账本"))

    rec("pages/login.html", desk("pages/login.html", "票务查询", "25", "", paras([
        "查询已售套票。输入票号或购票手机号。查到的是订单，不是退票。",
        "票号样例在购票页。别猜别人的。猜到了也打不开退票。",
        "后台预约那栏仍停。停的意思是禁客，不是系统坏了。",
    ]) + '''<p>票号 / 手机号</p>
    <p><input id="pw" autocomplete="off"> <button type="button" class="ghost-btn" id="login-go">查询</button></p>
    <p class="err" id="err"></p>''', S[24], "工位", extra_js="login.js"))

    rec("pages/order.html", desk("pages/order.html", "订单 YX-0821-19", "26", "t_order", paras([
        "票号 YX-0821-19。购票人沈南。手机 13972810834。座位东七排。状态：已开锣。退票：否。",
        "出行名单已同步剧团。同步时间八月二十一日十六点零二分。十六点零二之后，剧团可以写应工。",
        "吴窗备注：客人来问退票，统一回复已开锣。不要解释应工。应工不是客服词。",
        "本单含后台参观。参观以剧团须知为准。须知写禁客。两行都在系统里，系统不负责打架。",
        "要看应工簿抄件，有权限的人才能调。你能调，是因为票号对上了。对上了不等于能划。",
    ]) + '<p><a href="roster.html">应工簿抄件</a>　<a href="cs.html">客服记录</a></p>', S[25], "工位夜"))

    rec("pages/roster.html", archive("pages/roster.html", "应工簿抄件", "27", "t_yinggong", paras([
        "夜场八月二十一日。检场：狄厚（告假）。临时龙套：沈南　13972810834　来源：出行名单。",
        "来源写出行名单，就是文旅同步过来的号。号进簿，人还在东七排。人在东七排也算角。",
        "马句旧行已划。划的时候三本到齐。今晚这行还没人来齐。",
        "程石批：缺检场，以龙套顶开锣。开锣后不退。",
        "本抄件只能证明簿上有这个号。不能证明沈南上台。不能证明狄厚的丧是真是假。假条在另一页。",
    ]), S[26], "账本"))

    rec("pages/cs.html", desk("pages/cs.html", "客服记录", "28", "", paras([
        "吴窗：已开锣不能退。",
        "沈南：还没到七点。",
        "吴窗：开锣以系统为准。系统以剧团点齐为准。点齐我看不见。我只看见灰键。",
        "沈南：购票页写含后台。",
        "吴窗：后台以剧团须知为准。须知我这没有。有也不由我改。会话结束。",
    ]), S[27], "工位"))

    rec("pages/zhidao.html", f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-baidu-zhidao">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>夜戏票退不掉？</title>
  <link rel="stylesheet" href="../css/baidu-zhidao.css">
{p("../", "")}
</head>
<body>
  <div class="top"><div class="top-inner clearfix"><span class="logo">问答</span>{search_form("../")}</div></div>
  <div class="q wrap">
    <h1>槐溪夜戏票为什么退不掉</h1>
    <div class="meta">提问者：过路　2013-08-02</div>
    <div class="ask">系统写已开锣。人还在客栈。有人说被写成龙套。是真的吗。</div>
    <div class="ans best"><div class="best-bar">最佳答案</div>
    <div class="bd">真的。看剧团参观须知第四条。看茶馆豆皮的帖。别在问答里求做法。做法没有。班规有。</div>
    <div class="who">回答者：豆皮　2013-08-02</div></div>
    <div class="ans"><div class="bd">白戏能退。夜戏不能。两套票。</div><div class="who">回答者：本地　2013-08-03</div></div>
  </div>
  <p style="text-align:center;font-size:12px">问答镜像</p>
</body></html>''')

    rec("pages/mp.html", f'''<!DOCTYPE html>
<html lang="zh-CN" class="skin-wechat-mp-article">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>槐溪夜戏今起加场</title>
  <link rel="stylesheet" href="../css/wechat-mp-article.css">
{p("../", "")}
</head>
<body>
  <article class="article">
    <h1>槐溪夜戏今起加场</h1>
    <p class="meta"><span class="acct">桐县文旅</span>2014-08-18</p>
    {img_tag("../", S[28], "石板街")}
    <p>为满足外地游客，夜戏加场。套票含后台参观。参观细节以现场安排为准。</p>
    <p>退票规则见购票页。开锣后不退。开锣时间以演出当天系统为准。</p>
    <p>本稿不提应工，不提检场告假。告假不是宣传内容。</p>
    <p class="tail">阅读 802　赞 11</p>
  </article>
</body></html>''')

    rec("pages/playbill-scan.html", archive("pages/playbill-scan.html", "戏单边注", "31", "t_xidan", paras([
        "印刷戏单不印边注。边注手写：临时龙套 13972810834 沈南。",
        "边注时间十六点十一分。比出行名单同步晚九分钟。九分钟够程石写一行。",
        "东七排仍印观众。观众和龙套写的是同一个号。同一号两行，系统只认已开锣。",
        "要划边注，得应工簿和香火账同时到。只撕戏单不够。戏单是给外面看的。",
        "本扫描件证明边注存在。不能证明沈南同意。同意栏是空的。",
    ]), S[29], "糊戏单"))

    rec("pages/leave-note.html", archive("pages/leave-note.html", "狄厚假条", "32", "", paras([
        "狄厚。回乡办丧。十八日走，二十五日前回。丧事不是演出的事，别写成别的。",
        "检场钥匙放西厢第二屉。程石代管。代管不等于代应工。应工要人顶。",
        "假条不写中邪，不写冲撞。写了也不准贴。贴了班主撕。",
        "游客不要给狄厚打电话。号码在假条上，假条不上网。上网的只有公示摘要。",
        "本页只能证明他请假。不能证明今晚谁顶检场。顶的人在应工簿临时栏。",
    ]), S[30], "办公室"))

    rec("pages/cheng.html", archive("pages/cheng.html", "程石便条", "33", "t_cheng", paras([
        "缺检场。出行名单里有外地号，写入龙套。写入就算齐。齐了开锣。开锣了不退。",
        "文旅爱写参观。参观不放人。放人要簿上有名。有名就不是参观，是应工。",
        "有人拿白戏附则来顶。白戏不管夜戏。夜戏不管白戏。别混。",
        "划名可以。三本到齐我划。不到齐我开锣。开锣对我有用。退票对我没用。",
        "便条不给吴窗看。吴窗只会说已开锣。让她说去。",
    ]), S[31], "工位"))

    rec("pages/help.html", archive("pages/help.html", "票务留言", "34", "", paras([
        "问退票：先看购票页，再看剧团须知。两页打架是正常的。",
        "问为什么已开锣：看应工簿点齐没有。点齐在剧团，不在文旅。",
        "问龙套：茶馆里有旧帖。旧帖里的人不是你，号的写法是一样的。",
        "还空转：把应工簿、戏单边注、香火账三张对到同一个后四位。对上了再来交割。",
    ]), S[32], "账本"))

    rec("pages/ending.html", archive("pages/ending.html", "今晚交割", "35", "t_endpage", paras([
        "四张单。齐了才能交。交一张，其余作废。",
        "灰的也能点，点了会告诉你还差哪本。",
    ]) + '''
    <div id="ending-box">
      <button class="end-btn" id="end-appeal" type="button">按订单申诉退票</button>
      <button class="end-btn" id="end-strike" type="button">三本账对上，划掉外地号</button>
      <button class="end-btn" id="end-enter" type="button">按票入场，去东七排</button>
      <button class="end-btn" id="end-day" type="button">申请改挂白戏</button>
      <p class="err" id="end-msg"></p>
    </div>
    <p><a href="help.html">票务留言</a></p>
    ''', S[33], "空座", extra_js="ending.js"))

    ends = [
        ("end-appeal.html", "36", "钱退了", "吴窗把灰键打开了一回。钱回卡上要三个工作日。应工簿那行还在。香火账 0834 也在。系统现在写已退票，班里仍写已开锣。两套字，没人负责对。"),
        ("end-strike.html", "37", "划掉了", "程石把三本按在一起划。龙套空了。今晚改白戏，白戏不卖你那张套票。你出镇的时候，东七排还印着观众，观众两个字没人坐。"),
        ("end-enter.html", "38", "入场", "你坐在东七排。开锣前有人来叫。叫的人不是狄厚。他说簿上有你的号，跟我走。上场门风大。观众席的水你没喝完。"),
        ("end-day.html", "39", "改挂白戏", "白戏附则认你这张票作废夜场、转下午。下午那一场不写应工。夜戏那行空着，程石另找人。你不用上台，也不用退钱。钱当下午的座。"),
    ]
    for fn, no, h, body in ends:
        rec("pages/" + fn, archive("pages/" + fn, h, no, "", paras([body, "回执只此一条。今晚不能改。"]) + '<p><a href="../introduction.html">回短信回执</a></p>', S[34], "戏台"))

    rec("pages/baixi.html", corp("pages/baixi.html", "白戏附则", "40", "t_baixi", paras([
        "白戏下午开。不写应工。不写外地号。不写龙套。退票按未开锣处理，直到开场前半小时。",
        "夜戏票改挂白戏，要班主签字。签字等于夜场那行作废。作废了开锣仍可能缺人，缺人是班里的事。",
        "白戏座次不在东七排。东七排是夜场的。别拿夜场座次来白戏场找座。",
        "附则不管香火加记。加记要另划。另划走夜戏三本账。只改挂，加记可能还在。",
        "本页给本地人看的多。外地人看到，是因为你搜了白戏。",
    ]), S[35], "下午的院子"))

    rec("pages/photo.html", shop("pages/photo.html", "槐溪相册", "41", "", paras([
        "文旅相册。石板街、石桥、戏台远景。上场门没有。上场门不给拍。",
        "有一张空座位。空座位不是卖点。卖点是灯笼。灯笼是后来挂的，挂了好拍照。",
        "相册不回答退票。退票不在照片里。",
        "有人把相册当证据。证据在簿上。簿上没有滤镜。",
        "本页凑数给喜欢翻照片的人。翻完去购票页。",
    ]), S[36], "灯笼街"))

    rec("pages/contact.html", shop("pages/contact.html", "联系我们", "42", "", paras([
        "文旅窗口白天上班。夜戏开锣后窗口关门。关门了吴窗的会话还在，会话不改状态。",
        "剧团电话不外接退票。外接只谈包场。包场不是套票。",
        "文化馆乔干五点下班。下班后香火账不现场看，看抄件。",
        "茶馆没人值班。镜像而已。",
        "紧急情况打镇卫生室。卫生室不管票。不管应工。不管开锣。",
    ]), S[37], "车站夜"))

    # extra stills 38-48 already generated
    total_h = 0
    for f in files:
        total_h += hanzi(f.read_text(encoding="utf-8"))
    still_n = len(list(STILL.glob("*.jpg")))
    numbered = [f for f in files if f.name not in ("introduction.html", "search-results.html")]
    print("files", len(files), "numbered", len(numbered), "stills", still_n, "hanzi", total_h)
    assert len(numbered) >= 42
    assert still_n >= 45
    assert total_h >= 25000


if __name__ == "__main__":
    main()
