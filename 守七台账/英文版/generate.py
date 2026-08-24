#!/usr/bin/env python3
# -*- coding: utf-8 -*-
from pathlib import Path
ROOT = Path(__file__).resolve().parent

def pin(cid, label="Pin to the shift book"):
    return f'<p><button type="button" class="pin" data-claim="{cid}">{label}</button></p>'

def foot(n):
    return f'<footer class="pg">{n}/36</footer>'

def still(kind, label, note, extra=""):
    cls = f"still still-{kind} {extra}".strip()
    return (
        f'<figure class="{cls}" role="img" aria-label="{label}"></figure>\n'
        f'<p class="photo-note artifact-translation">{note}</p>'
    )

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
<html lang="en" class="{cls}">
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
      <a class="logo" href="{p}index.html">Baita Funeral Service Center</a>
      <form id="search-form" action="{p}search-results.html" method="get">
        <input id="search-input" name="q" placeholder="Search this site">
        <button type="submit">Search</button>
      </form>
    </header>
    <nav id="menubar"><ul>
      <li><a href="{p}index.html">Home</a></li>
      <li><a href="{p}pages/p02-halls.html">Farewell halls</a></li>
      <li><a href="{p}pages/p03-park.html">Parking</a></li>
      <li><a href="{p}pages/p04-paused.html">Overnight vigil</a></li>
      <li><a href="{p}pages/p05-desk.html">Seven-day ledger</a></li>
    </ul></nav>'''

def desk_head(depth, title="The Seven-Day Ledger"):
    p = "../" * depth
    return f'''<div id="wrap">
<header>
  <strong>{title}</strong>
  <div>
    <a class="ghost-btn" href="p07-login.html">Log in</a>
    <form id="search-form" action="{p}search-results.html" method="get" style="display:inline">
      <input id="search-input" name="q" placeholder="Search...">
      <button type="submit">Search</button>
    </form>
  </div>
</header>
<nav class="desk-nav" aria-label="Ledger modules">
  <a href="p05-desk.html">Night desk</a>
  <a href="p06-doors.html">Originals cabinet</a>
  <a href="p07-login.html">Login pouch</a>
  <a href="p28-handover.html">Handover</a>
</nav>'''

PAGES = []

INTRO = '''<!DOCTYPE html>
<html lang="en" class="skin-intro-manual">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>The Seven-Day Ledger</title>
  <link rel="stylesheet" href="css/intro-manual.css">
  <link rel="stylesheet" href="css/shouqi.css">
  <script src="js/data.js"></script>
  <script src="js/engine.js"></script>
</head>
<body>
  <header class="intro-hero">
    <div class="image-area">''' + still("stairs", "Indoor stairs", "Desk scan: stairwell to the night post. Paint peeling. The tube light is still on.", "intro-still") + '''</div>
    <h1>The Seven-Day Ledger</h1>
  </header>
  <main>
    <section>
      <h2>Tonight</h2>
      <p>You are Cen Shu. Seven-day ledger at Baita Funeral Service Center, staff number SQ-19. Before zi hour you hand in one line: what tonight proved. You do not approve opening a hall. You write a recommendation.</p>
      <p>The Hao family wants touqi — the first seven days — in the farewell hall. Banners are already hung. The original-file cabinet lets a shift pull three files. Handover returns the cabinet. Paper on the desk goes empty. What you pinned to the shift book stays.</p>
    </section>
    <section>
      <h2>How the hands move</h2>
      <p>Enter the center. Read the notice. The obituary board was changed. The words sit on the home page. Then go to the duty desk and click the door this shift pulls first.</p>
      <p>Fields on a page have to be pinned to the shift book. Opening a page is not enough. The top-bar search only hits public pages. Slips in the original-file cabinet cannot be opened by search.</p>
      <p class="boot-actions">
        <a class="enter-link" href="index.html">Go to Baita Funeral Service Center. The notice names the obituary board.</a>
      </p>
      <div id="boot-extra"></div>
    </section>
    <section>
      <h2>If you are stuck</h2>
      <p>The duty desk hands out pointers, one grade at a time. Early grades only point. They do not lock whether the hall should open.</p>
      <p>Jinxi County, Baita Town, the Hao family — written places and people. Do not match them to a door plate outside. There is no such house outside, and no such ledger. Tonight is recommendation only. No approval to open a hall.</p>
      <p>The regular clerk took leave. The slip says family business. Nobody asked what the business was. A shift nobody asks about is the shift that copies the family's day into the hall. A day can be copied. Copied, it walks toward opening. The night an opening is heard, the receipt will carry your number. The number is SQ-19. It is on the badge in the drawer.</p>
<p>Baita calls a funeral package one-stop. One-stop is a word on the daytime quote sheet. Night has no quote. Night has a cabinet and a count. Use up the count, return it. Return it before you ask again.</p>
      <p>If the transfer time and the end-date on the obituary are not the same day, do not paste over it with the chain's voice. Paste is courtesy. Courtesy waits until after zi hour. Before zi hour you only match proven slips. Slips go in as a set. No set, no judgment. If one line flashes, people poke the boxes. Poking boxes is not tonight's writing. Tonight's writing is which three you pull, return the cabinet, and take what you pinned.</p>
    </section>
  </main>
</body>
</html>
'''
PAGES.append(("introduction.html", INTRO))

PAGES.append(("index.html", doc(
    "skin-shop-local-2010s", "Baita Funeral Service Center",
    f'''<div id="container">
{shop_nav(0)}
<main>
{still("gate", "Front gate", "Center photo: side gate, metal. The transfer van stays behind this. Rain cloth still tied.", "hero")}
<section>
<p>On this road in Baita Town, this is the place that still keeps a light at night. The transfer van sits at the side door. The rain cloth is still tied. Price lists are glued on the lobby glass — last year's prices. The tape has been peeled twice. Peel took paint. Under the paint is older green.</p>
<p>A new sheet covers the third line of the notice board. The new sheet says: Hao family touqi, the first seven days, moved to tonight. The <b>obituary</b> board date has already been swapped. To see that paper, go to the duty desk original-file cabinet. This page only notifies. It does not attach the original. The original is in the cabinet. The cabinet costs this shift a pull.</p>
<p>Staff column, pencil: night shift on the seven-day ledger, see Cen Shu. The pass phrase is on the back of the badge. Three characters. People in the house call it <b>shouqi</b> — keeping the seven. The badge hangs in the duty-desk drawer. The drawer does not lock. The lock broke. Nobody fixed it.</p>
<p>The ticket machine at reception is a daytime thing. At night it is switched off. After it is off it still clicks once in a while. The doorman stuffed the speaker hole with a scrap of paper. The scrap was torn from a price list. The tear is uneven.</p>
<ul>
<li>Address: north of Baita Road, Baita Town, Jinxi County</li>
<li>Farewell hall bookings go through the ledger. No cutting the line at reception</li>
<li>Someone scratched out that line in the phone book with a fingernail</li>
</ul>
<p>Friends: <a href="pages/p20-news.html">Jinxi Evening News local</a>　<a href="pages/p19-board.html">Baita Town Board</a>　<a href="pages/p24-baike.html">zuoqi entry</a>　<a href="pages/p22-find.html">Baita classifieds</a></p>
<p>The side-door wind bell is iron. Wind comes, it rings. After it rings the doorman swears once and goes back to his phone. Brightness at the lowest setting. Lowest still shows him scrolling an almanac. That almanac is not this house's register.</p>
</section>
</main>
</div>''', 1, 0, ["shop-local-2010s"])))

PAGES.append(("pages/p02-halls.html", doc(
    "skin-shop-local-2010s", "Farewell hall rates",
    f'''<div id="container">
{shop_nav(1)}
<main>
{still("chairs", "Chairs", "Hall photo: waiting chairs. Afternoon sweat on the backs. Night shift does not collect the bottles.", "hero")}
<section>
<p>Hall 1 is billed by the half day. Sound system and two banners included. Hall 2 is small. Portrait and one table only. Tonight the Hao family booked farewell hall 1. The booking slip is not on this page. It is in the ledger's reservation folder.</p>
<p>The rate sheet was printed in 2011. Tea stained the overtime column. Overtime needs a duty clerk's signature. A signature is a recommendation. It is not approval to move a body.</p>
<p>The hall is empty now. The banners have not been brought out of storage. The paperwork for bringing them out is in the original-file cabinet. Home-page search will not find it.</p>
<p>A ring of sweat on the chair backs. Someone sat this afternoon, unscrewed a water bottle, screwed it back, left it under the third row. Nobody picked it up. Cleaning says night-shift trash waits for the morning shift. Morning shift comes at six.</p>
<p>The sound-cabinet key is in the doorman's second drawer. The drawer jammed once. He pried it with a screwdriver. The pry mark is still there. Whether the Hao family uses sound tonight is not this page's job. The booking slip's job. This page writes the leftover stuff because a rate page has always written leftover stuff.</p>
<p>The banner store is behind hall 2. That lamp has been dead two years. A dead lamp is not an anomaly. Call it saving power.</p>
</section>
</main>
</div>''', 2, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p03-park.html", doc(
    "skin-shop-local-2010s", "Parking",
    f'''<div id="container">
{shop_nav(1)}
<main>
{still("yard", "Yard", "Yard photo: side lot. Weeds at the drain. The camera does not cover this corner.", "hero")}
{still("trough", "Trough", "Yard photo: trough. Yellow-paper edges get pressed into the mud by tires.", "inline")}
<section>
<p>The side lot fits four vehicles. Tonight: the transfer van and an unplated van. The van driver is asleep in the cab. Window cracked. Smoke coming out.</p>
<p>Yellow-paper edges in the drain, pressed into mud by tires. The doorman says the house did not burn them. House burning goes to the back furnace. Back furnace is daytime. Ash is cleared in the morning and dumped in a town pit. The pit is not for visitors.</p>
<p>The camera only faces the main gate. That corner of the lot is a blind spot. Nobody reported anything in the blind spot tonight. The doorman wrote that sentence in the handover book, very faint. If someone asks tomorrow about the faint words, he says he did not see.</p>
<p>The rain-cloth rope on the transfer van has slipped half a knot. Meng Kun said in daylight he would retie it. At night he did not. Nylon rope, worn white. Not new.</p>
</section>
</main>
</div>''', 3, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p04-paused.html", doc(
    "skin-shop-local-2010s", "Overnight vigil booking",
    f'''<div id="container">
{shop_nav(1)}
<main>
<section>
<p>This column is paused. After 2018, when the compound banned corridor overnight vigils, nobody kept this page. Clicking it does not open a backend. That machine was moved to IT as a spare. The spare's fan rattles. IT wrapped it in tape.</p>
<p>To book a hall, go through the seven-day ledger. Do not leave a message here. The message box is dead. The dead box used to hold pennants. The pennants mildewed and were thrown out. The doorman said a pity when they went. Those two words never made it onto any receipt.</p>
<p>Some people read "paused" as "something is being hidden tonight." Wrong read. Paused is old policy. Tonight's date is in the original-file cabinet, not in this grey line.</p>
<p>A photocopy of the old policy is nailed in the doorman's room: no burning paper in corridors, no sheds, no one staying overnight. A corner of the copy is missing. The missing bit used to have the town stamp. Stamp went with the paper when it tore.</p>
</section>
</main>
</div>''', 4, 1, ["shop-local-2010s"])))

PAGES.append(("pages/p05-desk.html", doc(
    "skin-service-cyan-desk", "The Seven-Day Ledger",
    f'''{desk_head(1)}
<div class="notice">
<h2>How to use this post</h2>
<div id="shift-panel"></div>
<p>This post is keeping the seven (<b>shouqi</b>). The transfer end-date counts as day one. Touqi — the first seven days — holds the offering on the seventh night. The sixth night only prepares the hall. It does not open the hall. Spoken words, a local public account, a travel write-up: none of those go in the end-date field. People have written them in. Later the house put their staff numbers on a red slip. The red slip lives in the day-shift drawer. Night shift cannot see it. Not seeing it is not the same as it not being there.</p>
<p>House calendar: jihai year, 7th of the sixth month. The zi-hour bell is on the duty clock. If the bell rings and the slip is not in, it follows the family. Quartz clock. Battery changed. The person who changed it left the old battery in the cup holder. The holder has a ring of rust.</p>
{pin("v_tonight_chu7", "Pin that tonight is the 7th of the sixth month")}
<p>The door this shift pulls first is in the original-file cabinet. Paper in the cabinet cannot be opened by search. Search only hits public pages: the center, farewell halls, encyclopedia entries. Knowing those pages by heart does not replace three originals.</p>
<p><a href="p06-doors.html">Go to the original-file cabinet</a>　<a href="p30-form.html">Write the proven slip</a>　<a href="p26-rule.html">Full day-count mnemonic</a>　<a href="p29-phone.html">Town duty phone</a></p>
<p><button type="button" id="btn-handover">Hand over and return the cabinet</button></p>
<p class="feedback" id="handover-fb"></p>
<p><button type="button" id="btn-reset">Wipe save and restart</button></p>
</div>
<div class="hint-box">
<button type="button" id="hint-next">Next pointer</button>
<div id="hint-log"></div>
</div>
</div>''', 5, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p06-doors.html", doc(
    "skin-service-cyan-desk", "Original-file cabinet",
    f'''{desk_head(1, "Original-file cabinet")}
<div class="notice">
<h2>This shift can pull</h2>
<p>Three files a shift. Files already pulled can be looked at again. Handover returns the cabinet. After return, if a paper is not on this shift's list, you cannot draw it. The list changes each shift. The change is not aimed at you. Day shift has to count the originals.</p>
<div id="door-list"></div>
<p>Someone scraped "read the obituary first" on the cabinet door with a fingernail. The scratch is old. It is still there tonight. An old scratch is not an order. It is a habit left by people who covered a shift. You can follow a habit. Following it still means pinning it in the book.</p>
<p>The cabinet is tin. The lower shelf is damp. Damp paper lifts at the edge. Lifted paper is still an original. It still costs one pull.</p>
<p><a href="p05-desk.html">Back to the duty desk</a></p>
</div>
</div>''', 6, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p07-login.html", doc(
    "skin-service-cyan-desk", "Login pouch",
    f'''{desk_head(1, "Login pouch")}
<div class="notice">
<h2>This pouch does not open for night shift</h2>
<p>The admin account is not written in the nav. Cen Shu's badge only opens the duty desk and the original-file cabinet. Put a name in here and it comes back. The sentence that comes back is the same every time, like a recording.</p>
<form onsubmit="return false">
<p>Staff number <input disabled placeholder="No backend number on night shift"></p>
<p>Pass phrase <input disabled placeholder="Empty"></p>
<p><button type="button">Cannot enter</button></p>
</form>
<p>Someone tried Hao Liancheng as a username. The pouch snapped: the dead are not a login name. Do not try again. Trying will not open an original.</p>
<p>IT left this pouch for people who change prices and columns. Those people work day shift. Day-shift keys are not handed to night shift. The handover book wrote that three times. Three times, nobody cared.</p>
<p><a href="p05-desk.html">Back to the duty desk</a></p>
</div>
</div>''', 7, 1, ["service-cyan-desk"])))

PAGES.append(("search-results.html", '''<!DOCTYPE html>
<html lang="en" class="skin-search-results">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>On-site results</title>
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
    "skin-forbidden", "Forbidden",
    '''<div class="forbid-panel">
<h2>Access to this file is forbidden</h2>
<p>The ledger directory is not given to the public net. Night shift does not need this file tonight. Go back to the duty desk and write your line. This page is a black face. The black face is not there to scare anyone. The old system only has this face for people with no permission.</p>
<p>Some people treat forbidden as if a date is hidden inside. Dates are not in forbidden. Dates are on the transfer slip and in the register. The register has to be pulled. A pull costs a slot.</p>
<p><a href="p05-desk.html" style="color:#f88">Back to the duty desk</a></p>
</div>''', 9, 1, ["search-and-forbidden"])))

PAGES.append(("pages/p10-obit.html", doc(
    "skin-news-portal-163", "Obituary for Mr. Hao Liancheng",
    f'''<div class="top"><div class="top-inner clearfix">
<span class="logo">Jinxi Evening News</span>
<form id="search-form" action="../search-results.html" method="get">
<input id="search-input" name="q"><button type="submit">Search</button>
</form></div></div>
<div class="nav"><div class="nav-inner clearfix">
<a href="p20-news.html">Local</a><a href="#">Society</a>
</div></div>
<div class="wrap"><div class="main">
<h1>Obituary for Mr. Hao Liancheng</h1>
<p class="meta">Source: Baita local account　2019-08-16 09:07:00</p>
{still("road", "Town road", "Wire photo: road fork at the town mouth. The local account paid for placement. Invoice is not on this page.", "inline")}
<p>Hao Liancheng, of Haojia Village, Baita Town, aged seventy-three. End-date given as the 1st of the sixth month. Touqi, the first seven days, set for the night of the 7th of the sixth month, offering in hall 1 at Baita Funeral Service Center. Chief mourner Hao Qiming. The portrait is last year's Spring Festival shot. Couplets still in the background. Only half a blessing character shows.</p>
<p>The release was filed by a local public account. The filing fee is on an invoice. The invoice is not on this page. Next to the two characters for end-date there was a correction mark. In the digital draft the mark became a clean 1st. Clean is not checked. The layout person thought the handwriting looked ugly.</p>
<p>This page can prove the date the local account sent out. It cannot prove which day the transfer happened. It also cannot prove whether a soul returns.</p>
<p>The release ends, as usual, with "hereby announced." The usual sentence is on every household. A sentence every household has cannot be used as this household's end-date.</p>
{pin("v_obit_chu1")}
{pin("v_tonight_chu7", "The obituary treats tonight as touqi. Pin that tonight is the 7th")}
<p>After pinning, go back to the original-file cabinet. The end-date has to be checked against the transfer slip. Do not search the next file from this page.</p>
<p><a href="p20-news.html">Others on this edition</a></p>
</div>
<div class="side"><h3>Most read</h3>
<ul class="hot">
<li><span class="n">1</span><a href="p20-news.html">Town makeup-signature window moved up again</a></li>
<li><span class="n">2</span><a href="#">Water on Baita Road</a></li>
</ul></div></div>''', 10, 1, ["news-portal-163"])))

PAGES.append(("pages/p11-ice.html", doc(
    "skin-corp-table-2005", "Transfer slip",
    f'''<table class="site" cellspacing="0" cellpadding="0">
<tr><td colspan="2" class="banner">Baita Funeral Transfer Desk
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">Search</button></form>
</td></tr>
<tr><td colspan="2" class="nav">
<a href="#">Home</a>|<a href="#">Transfer</a>|<a href="#">Cold lockers</a>
</td></tr>
<tr><td class="left"><h4>Columns</h4>
<p><a href="p27-reprint.html">Carbon copy of the slip</a></p>
<p><a href="p25-wap.html">Meng Kun's phone web</a></p>
</td>
<td class="main">
<p class="scroll">Night shift only logs. It does not change an end-date.</p>
{still("shed", "Shed", "Transfer desk photo: van shed. Stretcher cloth washed stiff. Stiff is not the same as clean of a story.", "inline")}
<h3>Transfer slip · Night 04</h3>
<p>Deceased Hao Liancheng. Pickup: north room, Haojia Village. Time 2019-08-14 20:12, lunar jihai, 2nd of the sixth month, xu hour. Cold locker B-07. Clerk Meng Kun. The light in the north room was switched on by a neighbor. The neighbor would not leave a name. The name field is struck through.</p>
<p>End-date is written from the transfer time. The slip is carbon paper. The top copy goes to the ledger. The lower copy goes to the family. Someone in the family said they could not read theirs. Meng Kun would not rewrite it. He told them to come look at this copy. Looking at this copy costs this shift a pull.</p>
<p>This slip can prove transfer time and locker number. It cannot prove which day a funeral should open. It cannot prove why the local account wrote the 1st.</p>
<p>The stretcher cloth on the van has been washed. Washed until stiff. No blood on the stiff cloth. No blood cannot be written as "nothing happened." It can only be written as "this run did not dirty the cloth."</p>
{pin("v_end_chu2")}
<p>After pinning, go back to the original-file cabinet. What the family says is in the Hao family chain. The chain also costs one pull.</p>
<p>The number is ballpoint. The hook is heavy. Someone said it looked ugly and wanted it printed. The print template is still in IT. IT does not work nights.</p>
</td></tr></table>''', 11, 1, ["corp-table-2005"])))

PAGES.append(("pages/p12-chain.html", doc(
    "skin-wechat-mp-article", "Hao family chain",
    f'''<article class="article">
<h1>Touqi tonight, show up</h1>
<p class="meta"><span class="acct">Hao Qiming</span>2019-08-19<span class="orig">chain</span></p>
<p>Dad's thing we do tonight. You all saw the local-account piece right. Night of the 7th, Baita hall 1. Don't ask me about the hospital. I didn't let Xiufen go. She's at the plant. She won't drop a shift. Drop a shift they dock pay.</p>
<div class="ph">Chain screenshot　letters jammed</div>
<p>Second aunt: tonight? still a few days left. Qiming: tonight. Window's only these days, don't miss it. Third uncle: I'll bring the share then. Qiming: shares later, people first. Second aunt asked what window. Qiming didn't reply.</p>
<p>The group is still called "Haojia Village fertilizer." They used a fertilizer group to line up a day and nobody renamed it after. Not renaming is not a secret. It's lazy.</p>
<p class="quote">It's all so we can get the thing done. Days are set by people.</p>
<p>Xiufen didn't talk in the chain. Someone @ her. She already-read it.</p>
<p>The chain can prove the family wants the hall opened tonight. It cannot prove an end-date. "Convenient" does not go in the day-count field.</p>
{pin("v_family_open")}
<p>Once the claim is pinned in the book, hand over and return the cabinet. The hall booking only shows up among the next shift's doors.</p>
<p class="tail">Reads 86　<span class="like">Like 2</span><br>This page is a mirror of a family chat　not a public-account mark</p>
</article>''', 12, 1, ["wechat-mp-article"])))

PAGES.append(("pages/p13-libu.html", doc(
    "skin-archive-simsun", "Gift ledger",
    f'''<article class="record">
<h1>Hao Liancheng funeral gift ledger (copy)</h1>
<div class="meta"><span>No.: LB-19-07</span><span>Copied tonight</span></div>
<p>First seven: filial son as host. Sixth seven: married-out daughter. Fourth seven: kin and friends. That line is an old house rule, not something written tonight. The only new writing is Hao Qiming's booking deposit. A deposit cannot pull a sixth-seven debt forward onto touqi.</p>
<table>
<tr><th>Period</th><th>Bearer</th><th>Share</th></tr>
<tr><td>Touqi (first seven)</td><td>Hao Qiming</td><td>Booking deposit received, hall fee not settled</td></tr>
<tr><td>Fourth seven</td><td>Kin and friends</td><td>Not yet</td></tr>
<tr><td>Sixth seven</td><td>Hao Xiufen</td><td>Unpaid. Note: she is at the plant</td></tr>
</table>
<p>A married-out daughter's debt sits on the sixth seven. Touqi is not her name-share. Some people want to use her unpaid line to stop tonight's hall. The ledger has no such column.</p>
<p>This ledger can prove how the household shares split. It cannot prove an end-date. It cannot prove a soul returns.</p>
{pin("v_xiu_unpaid")}
<p><a href="p14-schedule.html">The seven-sevens schedule is in the same folder</a></p>
<span class="stamp">Internal</span>
</article>''', 13, 1, ["archive-simsun"])))

PAGES.append(("pages/p14-schedule.html", doc(
    "skin-archive-simsun", "Seven-sevens schedule draft",
    '''<article class="record">
<h1>Seven-sevens schedule (family draft)</h1>
<div class="meta"><span>Folder: same folder</span><span>No stamp</span></div>
<p>Hao Qiming lined up a version in pencil: touqi night of the 7th, second seven blank, sixth seven ask Xiufen. Next to the pencil someone wrote in pen "count again from the transfer." No name. Looks like Meng Kun's hook. Same kind of hook as the number on the transfer slip.</p>
<p>A draft is not the register. The register is the day-count book. This page can only show that the family wants to pull touqi forward to tonight, and that someone in the house disagrees. Disagreement was not written as a formal opinion. A formal opinion has to go through a recommendation slip.</p>
<p>Empty squares outnumber filled ones. Empty is not a mystery. It was not scheduled. An unscheduled day cannot be treated as "already done."</p>
<p>The rubber band on the clip is old. Pull it and it snaps. The snapped band is in a drawer corner. Two unfinished number tags are in that corner too.</p>
<span class="stamp">Unchecked</span>
</article>''', 14, 1, ["archive-simsun"])))

PAGES.append(("pages/p15-book.html", doc(
    "skin-service-cyan-desk", "Farewell hall booking",
    f'''{desk_head(1, "Hall 1 booking")}
<div class="notice">
<h2>Booking · Hao</h2>
{still("hall", "Empty hall", "Booking photo: hall 1 empty. Banners still in storage. This pull is the slip, not the cloth.", "inline")}
<p>Hall: 1. Date: 2019-08-19 night. Chief mourner Hao Qiming. Banner face already written "Hao Gong Liancheng  touqi." Small hand: day-count from an end-date of the 1st. The small hand is pencil. Pencil can be erased. Nobody erased it tonight.</p>
<p>The banners are still in storage. The storage key is with the doorman. What you pulled is the booking slip, not the banners themselves. The small hand can show which day they are counting from. Counting from a day is not the same as that day being true.</p>
<p>This slip can prove the hall is booked tonight and the banners count from the 1st. It cannot prove the 1st was the transfer day. It cannot approve you going to storage to move banners. Moving banners needs another page. That page does not exist tonight.</p>
<p>The deposit receipt is stapled on the back. Amount says "taken for now." Taken for now is not settled. Settling comes after the hall opens. Whether the hall opens is not decided by a receipt.</p>
{pin("v_flag_chu1")}
<p>Which day the banners are counting from can already be kept. Which night touqi falls on needs the transfer end-date run through the register.</p>
<p><a href="p05-desk.html">Back to the duty desk</a></p>
</div>
</div>''', 15, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p16-jiri.html", doc(
    "skin-archive-simsun", "Day-count register",
    f'''<article class="record">
<h1>Baita house day-count register · jihai extract</h1>
<div class="meta"><span>No.: JR-07</span><span>Read only</span></div>
<p>Mnemonic: the transfer end-date is day one. Touqi, the first seven days, holds the offering on the seventh night. The sixth night only prepares the hall. It does not open the hall. Spoken words do not go in the end-date field. A local public account does not go in the end-date field. Almanac luck and taboo do not go in either.</p>
<p>Hao Liancheng line: transfer on the 2nd of the sixth month. Day one the 2nd, day two the 3rd, day three the 4th, day four the 5th, day five the 6th, day six the 7th, day seven the 8th. Touqi night should fall on the 8th of the sixth month. This line was run from the mnemonic. It is not family dictation.</p>
<p>Tonight is the 7th. That lands on day six. Preparing the hall is allowed. Opening the hall does not match the register. A mismatch goes to a recommendation, not a rewrite of the slip. Rewriting a slip is Transfer Desk power. Transfer Desk does not open that power tonight.</p>
<p>The register is pen. Under "the 8th" the pen dotted once. The dot was a check mark at verification. It is not a date change.</p>
<p>This book can prove how this house counts. It cannot prove every place counts this way. It cannot prove on which night a soul arrives at a door.</p>
{pin("v_touqi_chu8")}
<p>When the four lines are together, take them to the proven slip as a set. Do not tick boxes on this page. Ticking is on the desk form.</p>
<p><a href="p36-limits.html">Register notes</a></p>
<span class="stamp">Internal</span>
</article>''', 16, 1, ["archive-simsun"])))

PAGES.append(("pages/p17-debt.html", doc(
    "skin-classified-yellow", "Household-share IOU",
    f'''<div class="top"><div class="top-inner">
<b>Baita classifieds</b>
<form class="search" id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input" type="text"><button type="submit">Search local</button>
</form>
<span class="city">Baita station</span>
</div></div>
<div class="layout">
<h1>Wanted: sixth-seven share</h1>
<p>The sixth-seven period under Hao Xiufen's name has not been entered. Hao Qiming had someone post the slip. The phone is a dead number. The station admin says slips like this are not reviewed. When they rot, tear them down yourself.</p>
<p>The slip leans hard on "share unpaid," as if that could block the hall tonight. The gift ledger does not split it that way. The ledger puts her debt on the sixth seven.</p>
<p>This slip can prove someone is chasing a share. It cannot prove the hall should stop-open tonight.</p>
<p>Next to it: sewing machine for sale, missing chicken. The chicken slip has been up three days. Right claw short one toe.</p>
</div>''', 17, 1, ["classified-yellow"])))

PAGES.append(("pages/p18-civil.html", doc(
    "skin-gov-redbar", "Township notice",
    f'''<div class="red">
<h1>Baita Town comprehensive-governance notice board</h1>
<p>Fictional local board / no national emblem</p>
</div>
<div class="links">
<a href="#">Notices</a><a href="#">Directory</a><a href="p23-mail.html">Forwarded letter</a>
</div>
<div class="wrap">
<table cellspacing="0" cellpadding="0"><tr><td class="box">
<h3>Makeup-signature window</h3>
<ol>
<li>Haojia Village demolition makeup signatures close on the morning of 2019-08-20.<span class="date">Posted 08-15</span></li>
<li>Late arrivals must queue again.<span class="date">Same day</span></li>
<li>Bring your own papers. The window will not issue a receipt for you.<span class="date">08-16</span></li>
</ol>
<p>The notice does not name a chief mourner. A chief mourner brings papers in person. Whether those papers include a touqi receipt is not this board's business. Not this board's business is not a ban. The town does not want to answer for the house's days.</p>
<p>This column can prove there is a window on the morning of the 20th. It cannot prove touqi must be pulled forward to the night of the 19th. It cannot prove Hao Liancheng agreed.</p>
<p>The notice-board glass is cracked. A child hit it with a stone and ran. Cracked glass can still be read. Readable is not the same as adopted by the house.</p>
</td></tr></table>
</div>''', 18, 1, ["gov-redbar"])))

PAGES.append(("pages/p19-board.html", doc(
    "skin-discuz-board", "Baita Town Board",
    '''<div class="wp">
<div class="hd">
<a class="logo" href="#">Baita Town Board</a>
<span class="y"><a href="#">Log in</a></span>
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">Search</button>
</form>
</div>
<div class="nv"><a href="#">Forum</a><a href="#">Digest</a></div>
<table class="forum">
<tr><th></th><th>Board</th><th>Threads / posts</th><th>Last post</th></tr>
<tr><td></td><td><a href="p20-news.html">Local</a><p>roads, water, windows</p></td><td class="num">41 / 900</td><td>today</td></tr>
</table>
<p>The host sits behind the internet cafe. The mod has not logged on in half a year. Don't come here to prove which night is touqi. People who come here to prove things write overheard days into threads. Threads travel faster than a transfer slip. Fast things walk into a chain first.</p>
<p>There was a sticky about a missing manhole cover. Cover turned up in the ditch. The finder wanted a reward. Nobody paid. Thread sank.</p>
<p>Register needs email. Email verify died a while back. After it died, new IDs can't register. Old IDs still talk. People who talk know each other. Knowing each other is not carrying each other's days.</p>
</div>''', 19, 1, ["discuz-board"])))

PAGES.append(("pages/p20-news.html", doc(
    "skin-news-portal-163", "Jinxi Evening News local",
    '''<div class="top"><div class="top-inner clearfix">
<span class="logo">Jinxi Evening News</span>
<form id="search-form" action="../search-results.html" method="get">
<input id="search-input" name="q"><button type="submit">Search</button>
</form></div></div>
<div class="nav"><div class="nav-inner clearfix"><a href="#">Local</a></div></div>
<div class="wrap"><div class="main">
<h1>Baita funeral house still handles funerals　town has not banned it</h1>
<p class="meta">Source: local reporter　2019-08-12 11:02:00</p>
<p>A reporter passing Baita Road saw a transfer van at the center's side door. The house said night shift only keeps a ledger and does not take walk-ins. A person at the comprehensive-governance office who would not give a name said if there is no complaint they do not go in. That unnamed sentence was cut once by an editor. The hole in the page looked empty, so it went back in.</p>
<p>The same edition ran a scale-weight dispute in Haojia Village. Parties given by surname only. The editor said the names did not match household registers and would not print them. Whether those unnamed people are the same household as tonight's is not the paper's job.</p>
<p>The evening paper cannot prove tonight's obituary true or false. It can only prove this place still lets someone write a ledger at night. Permission is not praise. It is that nobody came to ban it.</p>
<p>The masthead prints circulation and an ad hotline. At night nobody picks up. In daylight that same hotline sold seed and cement.</p>
<p><a href="../index.html">Back to the center</a></p>
</div></div>''', 20, 1, ["news-portal-163"])))

PAGES.append(("pages/p21-qzone.html", doc(
    "skin-qzone-modules", "Xiufen's space",
    f'''<div class="topbar"><div class="topbar-inner">
<span class="logo">Personal space</span>
<a href="#">Journal</a><a href="#">Albums</a>
</div></div>
<div class="wrap" style="padding:16px">
<h2>Xiaofen doesn't change the name</h2>
{still("stools", "Plant stools", "Space photo: stools at the plant. She says the punch clock still has that night's time.", "inline")}
<p>Overtime at the plant on the night of the 14th. Uncle called. Said dad's thing. I said I'd ask for leave. He said don't. Come back for the sixth seven. He didn't say which day the sixth seven is. I said the 14th. He said I remembered wrong. I didn't. The punch clock is still there. The card has that night's time.</p>
<p>I already-read the chain. Already-read is not agree. I will not put the word agree in the group. Put it there and it turns into a share. I own the sixth-seven period. Not tonight.</p>
<p>Same shoes. No paste, no mud. I didn't go to the paper-craft shop. Didn't go to the hall. The day in the hall is a day they filled in. The people filling days need a window. That window is not the same day as my shift.</p>
<p>The space background is still the river from that year. The river has nothing to do with the funeral. I can't be bothered to change a background that has nothing to do with it.</p>
<p>A space is a married-out daughter's mouth. A mouth can keep the phone call on the night of the 14th. It cannot fill an end-date for you. The end-date is on the transfer slip.</p>
<p><a href="p32-letter.html">A letter she sent to the ledger</a></p>
</div>''', 21, 1, ["qzone-modules"])))

PAGES.append(("pages/p22-find.html", doc(
    "skin-classified-yellow", "Local classifieds",
    '''<div class="top"><div class="top-inner">
<b>Baita classifieds</b>
<span class="city">Baita station</span>
</div></div>
<div class="layout">
<h1>New today</h1>
<p>Second-hand sewing machine, works. Ask the cigarette stall at the alley mouth.</p>
<p>Missing chicken: speckled, right claw short one toe. Don't tell me it got braised.</p>
<p>Hire someone to copy dates: neat hand, no fancy script. This slip has been up three days. Phone is a dead number.</p>
<p>None of these slips touch whether the hall should open tonight. They sit here because this station has always had slips like these. The station master collects by the month. When the money is short he sells the top bar to a hemorrhoid ad.</p>
<p>The hire-to-copy-dates slip got two calls in three days. Both dead numbers calling back. A dead number is not a chief mourner. A chief mourner has a surname and a hall.</p>
<p>Under the chicken slip someone wrote "saw it by the river." The person who saw it left no contact. Between the river and the funeral center is the wet market. Market shuts at night. Padlock on the door.</p>
</div>''', 22, 1, ["classified-yellow"])))

PAGES.append(("pages/p23-mail.html", doc(
    "skin-mail-web-2010", "House office inbox",
    f'''<div class="top"><b>Web mail</b><span class="unread-n">Unread <b>1</b></span></div>
<div class="panes">
<div class="folders">
<a class="write" href="#">Compose</a>
<a class="on" href="#">Inbox</a>
</div>
<div class="mails">
<h4>Hao Qiming → Baita house office</h4>
<p>The 1st kind of wording is convenient. Morning of the 20th I have to go to the window. Window wants the chief mourner. A touqi receipt from you tonight will do. I'll talk to Xiufen. If she doesn't come, don't wait on her.</p>
<p>This letter can prove he is rushing a signature. It cannot prove the 1st was the transfer day. The word convenient does not go in the register. What goes in the register is a day run from the transfer time.</p>
<p>Sent 08-18 22:11. House office day shift reads it the next morning. Night shift can see it because someone forwarded it into the ledger folder. Forwarding into the folder costs a pull. Whether it costs one depends on whether you pull the township notice.</p>
<p>No attachment. No attachment is not the same as no window. The window is on the township notice board. The board says it closes in the morning.</p>
{pin("v_reloc")}
</div></div>''', 23, 1, ["mail-web-2010"])))

PAGES.append(("pages/p24-baike.html", doc(
    "skin-baidu-baike", "Performing the seven (zuoqi)",
    '''<div class="top"><div class="top-inner clearfix">
<span class="logo">Encyclopedia</span>
<form id="search-form" action="../search-results.html" method="get">
<input name="q" id="search-input"><button type="submit">Open entry</button>
</form>
</div></div>
<div class="wrap">
<h1>Performing the seven (zuoqi)</h1>
<p class="lemma">This entry was edited by users</p>
<p>A mourning period is split by sevens. Some places start the night before touqi. Names vary. The entry copies the pretty versions first and this house's count later. The later paragraphs go years without a click. Unclicked paragraphs are still here. Being here is not the same as this house adopting them.</p>
<p>Someone wrote "the sixth night" as if the whole country does it that way. That is travel-writing voice. The Baita house register does not take that sentence. Why it does not is in the mnemonic: the end-date counts from the transfer, not from the kind of line that sounds smooth online.</p>
<p>This entry does not name the Hao family. Do not harvest tonight's line from here. The see-also links are empty. Empty links mean the entry was not finished. They are not a hidden door.</p>
<p>The edit log shows someone last year changed four characters about "knocking the sixth." Changed them, then changed them back. A back-and-forth mark cannot stand as Hao-family evidence.</p>
<p><a href="../index.html">Back to the center</a></p>
</div>''', 24, 1, ["baidu-baike"])))

PAGES.append(("pages/p25-wap.html", doc(
    "skin-wap-phone-2007", "Meng Kun phone web",
    '''<div class="phone">
<div class="hd">Mobile web</div>
<div class="sub">Sent</div>
<div class="menu">
<p>From: Meng Kun<br>Time: 08-14 20:31</p>
<p>B-07 received. 2nd, xu hour. I wrote the slip. Family said they can't read it. Tell them come look at the top copy in daylight. I can't print a replacement. IT already off. He typed "already off" once, deleted it, typed it again.</p>
<p>This one stopped at Sent. No second line. No read receipt. Phone web that year did not give receipts.</p>
<p>Living people at night can still complain that the writing looks ugly. This message cannot prove which day a funeral should be. It can only say the transfer time again. Saying it again is not leftover talk. It is a mouth besides the top copy.</p>
<p>Under the WAP page there are still train times and weather. Weather says cloudy. Cloudy has nothing to do with a cold locker.</p>
<p><a href="p11-ice.html">Back to the transfer slip</a></p>
</div></div>''', 25, 1, ["wap-phone-2007"])))

PAGES.append(("pages/p26-rule.html", doc(
    "skin-archive-simsun", "Day-count mnemonic",
    '''<article class="record">
<h1>Shouqi-post mnemonic (posted copy)</h1>
<div class="meta"><span>Nailed beside the duty desk</span><span>Copy gone yellow</span></div>
<p>The transfer end-date is day one. Touqi, the first seven days, holds the offering on the seventh night. The sixth night only prepares the hall. It does not open the hall. The mnemonic is for people covering a shift to say aloud. Saying it cold still means running a slip through it. After the run, that household has a night.</p>
<p>Spoken words do not go in the end-date field. A local public account does not go in the end-date field. Almanac luck and taboo do not go in the end-date field. "Convenient" from a chain does not go in either.</p>
<p>The mnemonic does not write one household's day. A household's day is run from a transfer slip. The page after the run lives in the register. The register is not left open on the desk all year. Spreading it costs this shift a pull.</p>
<p>This sheet can prove how this post teaches people to count. It cannot, by itself, point to which night is Hao-family touqi. The line that points to that night is the one run in the register.</p>
<p>The thumbtack on the posted copy has rusted. Rust rubbed the wall. The wall has a ring. The ring is older than this paper.</p>
<span class="stamp">Posted</span>
</article>''', 26, 1, ["archive-simsun"])))

PAGES.append(("pages/p27-reprint.html", doc(
    "skin-corp-table-2005", "Transfer slip carbon copy",
    '''<table class="site" cellspacing="0" cellpadding="0">
<tr><td colspan="2" class="banner">Transfer Desk carbon</td></tr>
<tr><td class="main">
<p>The carbon copy is fainter. The 2nd, 20:12, B-07 are still there. Faint is not altered. The carbon paper was on its third sheet. Below the third sheet the perforations are still even. No sign of a tear-and-rewrite.</p>
<p>The copy the family said they could not read is this one. Not being able to read it is not a reason to change it to the 1st. Changing an end-date needs Transfer Desk to open a new slip. No new slip tonight. Tonight only has a ledger recommendation.</p>
<p>This copy and the top copy limit each other: both say the 2nd. The local-account 1st does not match these two copies. A mismatch should be left as a conflict. Do not help anyone smooth it.</p>
<p>Blue carbon comes off on the fingers. The blue washes off. A stain that washes off cannot stand as proof of an alteration.</p>
<p><a href="p11-ice.html">Back to the top copy</a></p>
</td></tr></table>''', 27, 1, ["corp-table-2005"])))

PAGES.append(("pages/p28-handover.html", doc(
    "skin-service-cyan-desk", "Handover",
    f'''{desk_head(1, "Handover record")}
<div class="notice">
<h2>Cabinet returned</h2>
<p>Originals pulled this shift are back. Paper on the desk is empty. What was pinned in the shift book is still there. Return sounds like tin hitting tin. The doorman heard it. He did not come in to ask.</p>
{still("meeting", "Empty meeting room", "Handover photo: the room after return. Table cleared. The next shift's doors are not the same list.", "inline")}
<p>The next shift's doors are in the original-file cabinet. They are not always the same as this shift's. A claim that was never pinned cannot be drawn from a cabinet door. Not being able to draw it is not a broken lock. It went back.</p>
<p>The handover grid wants a staff number. Filling a number is not the same as handing in a slip. The slip is on another page. If that page is not a set, the grid is only a grid.</p>
<p>The clock has not reached zi hour. Before zi hour you can still pull three more. Use the three, return them, then count the next shift.</p>
<p><a href="p06-doors.html">See the next shift's doors</a>　<a href="p30-form.html">Go write the slip</a></p>
</div>
</div>''', 28, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p29-phone.html", doc(
    "skin-gov-redbar", "Duty phone",
    f'''<div class="red"><h1>Town duty phone</h1><p>At night we only log incoming calls</p></div>
{still("tea", "Duty-room tea table", "Duty log photo: thermos and cups. The cork has tooth marks. The cork still holds.", "inline")}
<div class="wrap">
<p>08-19 19:06 male voice, asked if a touqi receipt can come out tonight. Duty said ask the funeral center. No surname left. Accent like town, not like Haojia Village.</p>
<p>08-19 19:22 female voice, asked if the share is paid tonight. Duty said don't know. She hung up. Hung up fast, like she was afraid of being asked a name.</p>
<p>A phone book is not an end-date. It is not grounds to open a hall. It is written here because this page has always written these. Logged calls go to comprehensive governance the next day. Comprehensive governance rarely writes back.</p>
<p>The duty-room thermos is iron. Tooth marks on the cork. Not a dog. Someone bit the cork open. The cork is still tight.</p>
</div>''', 29, 1, ["gov-redbar"])))

PAGES.append(("pages/p30-form.html", doc(
    "skin-service-cyan-desk", "Tonight's proven slip",
    f'''{desk_head(1, "Tonight's proven slip")}
<div class="notice">
<h2>Hand in as a set</h2>
<p>Only what you pinned appears. Tick, then hand in. A wrong set does not mark which line. You do not approve opening a hall. You only recommend. The word recommend is printed on the paper head. The ink has gone grey.</p>
<p>Empty slips are not taken. Seen but not pinned will not appear on this sheet. After handover returns the cabinet, even less so.</p>
<div id="claim-form"></div>
</div>
</div>''', 30, 1, ["service-cyan-desk"])))

PAGES.append(("pages/p31-almanac.html", doc(
    "skin-blog-personal-2008", "Almanac extract",
    '''<div class="top"><h1>Evening-window extracts</h1><p>Days that passed by</p></div>
<div class="nav"><a href="#">Journal</a></div>
<div class="wrap">
<h2>7th of the sixth month: suitable for sacrifice</h2>
<p>The blogger claims to have read Hangzhou custom. The piece writes the sixth night as the proper touqi day, very smoothly. Smooth sentences copy well into a chain. Copied into a chain they are still spoken words. Spoken words do not go in the end-date field.</p>
<p>At the end: methods differ by place, for reference only. The two words "for reference" are small. Small words get skipped. After they are skipped, people only remember suitable-for-sacrifice.</p>
<p>This page can prove someone online counts this way. It cannot be written into the Baita house end-date field. Taking suitable-for-sacrifice as a permit to open a hall is reading the wrong column. Reading the wrong column costs this shift one original. That costs you a look at a real slip.</p>
<p>Last year the author also wrote Cold Food and train times. Clicks about the same. Under the train-times piece someone asked about tickets. The author did not reply.</p>
<p>Side-bar ads are hemorrhoids and seed. The ads have nothing to do with the 7th of the sixth month. Unrelated things sit here because the blog skin came with them.</p>
</div>''', 31, 1, ["blog-personal-2008"])))

PAGES.append(("pages/p32-letter.html", doc(
    "skin-mail-web-2010", "Letter from Xiufen",
    '''<div class="top"><b>Web mail</b></div>
<div class="panes">
<div class="folders"><a class="on" href="#">Inbox</a></div>
<div class="mails">
<h4>Hao Xiufen → seven-day ledger</h4>
<p>I am Hao Xiufen. I learned about the 14th at the plant. The transfer day was not the 1st. On the 1st I still talked to him about vegetable money. He said it was too expensive. That sentence is still there. Being there is not the same as being an end-date.</p>
<p>I pay the share on the sixth seven. Tonight do not write me as the person blocking the hall. What I am blocking is the day, not the hall fee. Qiming booked the fee. He booked it, he can walk the house's count.</p>
<p>This letter can prove she claims the transfer was not the 1st. It cannot, by itself, fix which night is touqi. She is at the plant. She did not see a locker number. A person who did not see can witness a phone call. She cannot witness a cabinet door.</p>
<p>Sent from a night-shift computer at the plant. The desktop still had the output sheet open. The output sheet has nothing to do with the funeral. She did not close it.</p>
<p><a href="p21-qzone.html">Back to the space</a></p>
</div></div>''', 32, 1, ["mail-web-2010"])))

PAGES.append(("pages/p33-stop.html", doc(
    "skin-archive-simsun", "Receipt · stop-opening",
    '''<article class="record">
<h1>Shouqi recommendation receipt</h1>
<div class="meta"><span>SQ-19</span><span>Stop-opening</span></div>
<p>The proven slip's four fields match: transfer end-date the 2nd of the sixth month, tonight the 7th of the sixth month, banners counting from the 1st, touqi due the night of the 8th. Recommendation: hall 1 tonight only prepares. No offering. Prep lights may go on. Banners may stay unhung.</p>
<p>The slot moves to the night of the 8th. Hao Qiming's window is his own business. This receipt will not go to town for him. The town's morning cutoff does not make the house's day-count step aside.</p>
<p>You did not approve moving a body. You did not sign for the family. The staff number sits in the recommendation column, not the open-hall column. A number not in the open-hall column gets fewer questions the next day.</p>
<p>Whether a soul returns: these papers still do not say. Better they don't. Say it and people will smooth it. Smoothed, it is no longer the line tonight was supposed to hand in.</p>
<p>Meng Kun will see this recommendation in daylight. He does not sign. He only checks whether the end-date is still the 2nd. If it is, he puts the slip back.</p>
<span class="stamp">Recommendation</span>
</article>''', 33, 1, ["archive-simsun"])))

PAGES.append(("pages/p34-open.html", doc(
    "skin-archive-simsun", "Receipt · open the hall",
    '''<article class="record">
<h1>Shouqi recommendation receipt</h1>
<div class="meta"><span>SQ-19</span><span>As the family asked</span></div>
<p>The slip followed the family. Hall 1 holds the offering tonight. Nobody changed the small line on the banners. The transfer slip is still in the folder. The folder was not opened far enough to block an opening. Blocking takes a set of slips. A set you only saw, after the cabinet went back, counts as not seen.</p>
<p>The staff number sits on the open-hall receipt. The window on the morning of the 8th is not the house's business. The sixth seven on the gift ledger is still empty. An empty share does not fill itself because the hall opened tonight.</p>
<p>You did not see a soul. You saw a recommendation that was taken up. After it was taken up, the papers are still those papers. The places that do not match still do not match. Someone will come ask about the places that do not match. They will ask until they reach the staff number.</p>
<p>The doorman will switch on hall 1's lights. Lights on, it looks like the nights that have been done before. Nights that have been done before are not always the right day.</p>
<span class="stamp">Recommended opening</span>
</article>''', 34, 1, ["archive-simsun"])))

PAGES.append(("pages/p35-late.html", doc(
    "skin-archive-simsun", "Receipt · not handed in",
    '''<article class="record">
<h1>Shouqi default receipt</h1>
<div class="meta"><span>SQ-19</span><span>Zi hour</span></div>
<p>Three shifts gone. No proven slip handed in as a set. The system opens the hall as the family asked. This is not another written road. It is the empty-slip default. Default sits in the same column as clicking open-as-family. It does not open a separate name.</p>
<p>What was proven is still in the book. Nobody tore it out. Not torn out is not the same as used. Used means handed in. Handed in is what enters the recommendation column. A slip not handed in is scrap paper after zi hour.</p>
<p>The staff number is still in the open-hall column. Default still counts as written. A person who wrote will still face the doorman tomorrow asking why the lights were on.</p>
<p>The clock has already passed. A passed clock cannot be turned back. Turning it back is not this post's power.</p>
<span class="stamp">Default</span>
</article>''', 35, 1, ["archive-simsun"])))

PAGES.append(("pages/p36-limits.html", doc(
    "skin-archive-simsun", "Register notes",
    '''<article class="record">
<h1>Day-count register notes</h1>
<div class="meta"><span>JR-07 back</span><span>Limit</span></div>
<p>The register can prove this house counts the transfer end-date as day one. It cannot prove the deceased agreed to pull a date forward. It cannot prove on which night a soul arrives at a door. It cannot prove a demolition window is lawful. It cannot prove Hao Xiufen's unpaid share has anything to do with tonight.</p>
<p>Do not fill a last word for Hao Liancheng in the blanks. Do not write the blanks as innocent. Do not write them as guilty. Write "these sources cannot determine." Cannot determine is not a pass. It is a ban on inventing.</p>
<p>Travel writing, the chain, the almanac: when they conflict with the register, leave the conflict. Do not smooth a conflict into a kind sentence. Kind sentences enter receipts. Receipts carry a staff number.</p>
<p>The note paper is thinner than the register. Thin paper wrinkles. Wrinkled, it is still read from this page. No change of mouth.</p>
<span class="stamp">Limit</span>
</article>''', 36, 1, ["archive-simsun"])))


def main():
    for path, html in PAGES:
        fp = ROOT / path
        fp.parent.mkdir(parents=True, exist_ok=True)
        fp.write_text(html, encoding="utf-8")
        print("wrote", path)

if __name__ == "__main__":
    main()
