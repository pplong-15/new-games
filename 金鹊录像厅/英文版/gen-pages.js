const fs = require("fs");
const path = require("path");
const root = __dirname;

function searchForm(p) {
  return (
    '<form id="search-form" action="' + p + 'search-results.html" method="get">' +
    '<label class="sr-only" for="search-input">Site search</label>' +
    '<input id="search-input" name="q" maxlength="32" autocomplete="off" placeholder="Search...">' +
    '<button type="submit">Search</button></form>'
  );
}
function shopNav(p, cur) {
  function a(href, label, key) {
    return '<li><a href="' + href + '"' + (cur === key ? ' aria-current="page"' : "") + ">" + label + "</a></li>";
  }
  return (
    '<div id="container"><header><a class="logo" href="' + p + 'index.html">Jinque Video Hall</a>' + searchForm(p) +
    "</header><nav><ul>" +
    a(p + "index.html", "Home", "home") +
    a(p + "films.html", "Showtimes", "films") +
    a(p + "hall.html", "House", "hall") +
    a(p + "snacks.html", "Snacks", "snacks") +
    '<li><a class="dead" href="javascript:void(0)">PrivateRoom</a></li>' +
    a(p + "help.html", "Help", "help") +
    "</ul></nav>"
  );
}
function page(opts) {
  const p = opts.dir === "pages" ? "../" : "";
  return (
    "<!DOCTYPE html>\n<html lang=\"en\" class=\"" + opts.skin + "\">\n<head>\n" +
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
  title: "Jinque Video Hall · Guide",
  body:
    '<header class="intro-hero"><div class="image-area"><img class="game-photo" src="assets/img-intro-hero.jpg" alt="Jinque Town at night, lightbox only half lit"></div><h1>Jinque Video Hall</h1></header><main>' +
    "<section><h2>◯ Intro</h2>" +
    "<p>You are Fang Nanxing. Among the cousins is Lu Xiaotang, four years older — biaojie, an older female cousin. In middle school she always took the last row of the video hall. Later she went into town for work. You barely met. This month she sent a short text: the hall on Jinque West Road still has a webpage. Pick up a HoldSeat ticket for me. The link does not look like a shop. It does not ask for a code.</p>" +
    "<p>You open it. Cream background, grey rounded tabs, an orange search button on top. Showtimes stopped in 2012. The snack counter still prices sunflower seeds at 3.50 a bag. The dates are wrong: some notices say this year, some comments freeze on the night the booth overheated.</p>" +
    "<p>The site is called Jinque Video Hall. It does not look like a game. It looks like a small-shop homepage that will not admit it has closed. Three things to settle: whether the ticket is still there; whether the person who sent the link is still there; and why the site already knows your name.</p>" +
    "</section><section><h2>◯ What you do</h2>" +
    "<p>Once you are in, treat it as a real site. Read notices, showtimes, the footer. Top search: <strong>one word at a time</strong>, a word that already appeared on a page you opened. Empty queries and two words split by a space will not open a hidden page.</p>" +
    "<p>At least one nav item is fake. PrivateRoom booking is fake. Clicking it will not open a page. Search <strong>PrivateRoom</strong> to see the pause line. Real doors are proper names in the body. After a hit, the page changes skin: logs, a Points desk, a space, a dossier, a local account — not just a new title color.</p>" +
    "<p>The first word you will almost not miss is on the home yellow notice. Help repeats it. Someone pinned a night showing with no title. That word is <strong>ExtraShow</strong>.</p>" +
    "</section><section><h2>◯ If you stall</h2>" +
    "<p>This manual does not follow you into the shop. In-site Help still has a closed-hall desk, four hint ranks. The first three will not name the last buttons. Rank four will spell the reasoning. You still have to search, log in, and take a side.</p>" +
    "<p>Footer numbers mean you are closer to the facts. They are not a progress bar, and they do not click. The whole site is fiction. Do not match county names, road names, or people to the real world.</p>" +
    "<p>After you press Enter the hall, this manual skin goes away. The fake site will not remind you this is a game. Remember the first word: ExtraShow.</p>" +
    "<p>Saved on this machine. Wiping the save forgets hidden pages you already opened. Large type and reduce motion can be checked any time.</p>" +
    '<div class="boot-actions"><button type="button" data-act="new">Enter the hall</button>' +
    '<button type="button" class="ghost" data-act="wipe">Wipe save</button></div>' +
    "<p><label><input type=\"checkbox\" data-opt=\"large\"> Large type</label>　<label><input type=\"checkbox\" data-opt=\"reduce\"> Reduce motion</label></p>" +
    "</section></main>"
});

pages.push({
  file: "index.html", id: "home", no: "01", dir: "", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Jinque Video Hall",
  body: shopNav("", "home") + "<main><section><p>Jinque Video Hall　Lihe County, Jinque Town, 18 Jinque West Road　independent screenings　two shows a night　weekend matinee　phone blacked out　this site is generated on the shop PC</p></section>" +
    '<img class="game-photo" src="assets/img-home-marquee.jpg" alt="Shop marquee lightbox, one stroke missing from the Jinque characters">' +
    '<p class="muted">Scan of the box. The remaining strokes still read Jinque. One stroke is gone.</p>' +
    '<section class="menu-section"><h2>Latest notices</h2><dl class="notice"><dt>2012/08/19</dt><dd>This week\'s <strong>ExtraShow</strong> still uses internal HoldSeat. No title, no poster, no refund window. Tickets in the front-desk tin. Marked for the continuity clerk to pick up.</dd>' +
    "<dt>2012/08/12</dt><dd>Booth fan replaced. Projectionist Tianmai on duty. Member Points can only HoldSeat. Cannot redeem soda.</dd>" +
    "<dt>2008/11/03</dt><dd>Closed one day for equipment fault. Do not move the back-row seats yourself.</dd></dl></section>" +
    "<p>The hall opened in 1987. The marquee changed twice. The last-row wood chairs never did. The chairs creak. When they creak, do not look back. The boss said that was the chairs getting old. The boss stopped talking later.</p>" +
    "<p>The site still takes comments. The comment box is behind the member counter. You will not see it in the nav. The first word you want is in the pinned notice. Help repeats it. Search that one word.</p>" +
    "<p class=\"muted\">PrivateRoom booking was never opened. Clicking it will not enter any hidden page. The real door is not in the grey nav.</p></main></div>"
});

pages.push({
  file: "films.html", id: "films", no: "02", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Jinque Video Hall - Showtimes",
  body: shopNav("", "films") + "<main><section class=\"menu-section\"><h2>This week's showtimes</h2><img class=\"game-photo portrait\" src=\"assets/img-films-board.jpg\" alt=\"Handwritten showtimes board\">" +
    '<p class="muted">Chalk still has two titles and a line with no name and no time.</p>' +
    "<p>Evening 19:30　Across the River　copy worn　may skip</p>" +
    "<p>Late 21:40　Last Road Out　Credits incomplete　last three minutes black</p>" +
    "<p class=\"price\">Extra showing　time unwritten　title unwritten　price unwritten</p>" +
    "<p>Extra showing is not sold to the public. Public line only: people with HoldSeat, be on time. A seat that is late gets rewritten to the next name.</p></section>" +
    "<p>The schedule is for people to read. ExtraShow is for the seats to read. A seat wants a person. A person sits until Credits end. Stand up before Credits end, the lamp will not go out, and there will be one fewer person.</p>" +
    "<p>Someone writes ExtraShow as <strong>LastLamp</strong>. Both names open the same page. Do not split them.</p>" +
    "<p>Matinees have been dark for three years. Matinee chairs are stacked at the Darkroom door. That door was locked from inside once. That once went into the local file. It is not on this schedule.</p></main></div>"
});

pages.push({
  file: "hall.html", id: "hall", no: "03", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Jinque Video Hall - House",
  body: shopNav("", "hall") + "<main><h2>Inside the house</h2>" +
    '<img class="game-photo" src="assets/img-hall-main.jpg" alt="Auditorium, one hundred twenty seats, last row missing a chair foot">' +
    '<img class="game-photo" src="assets/img-hall-window.jpg" alt="Projection window, glass yellowed as if someone breathed on it">' +
    "<p>Tickets on the first floor. Booth on the second. Guests stay downstairs. Upstairs are the FilmVault and the Darkroom. The vault door says internal. No lock. Only a line: Stub has to match before you go in.</p>" +
    "<p>Posters on the wall all stop before 2008. One had its title torn off. A row of small names left. The small names were changed in ballpoint. Changed to whom — you only see that on the internal list.</p>" +
    "<p>The AC is a window unit. It drips. Water hits the aisle at row fourteen. The aisle is always wet. Cleaning said do not lay carpet. Carpet remembers footprints.</p>" +
    "<p>Group photos live in the member space. This hall page only puts up two empty shots. Empty is not a broken file. Someone painted the faces out.</p></main></div>"
});

pages.push({
  file: "snacks.html", id: "snacks", no: "04", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Jinque Video Hall - Snacks",
  body: shopNav("", "snacks") + "<main><h2>Snack counter</h2><img class=\"game-photo\" src=\"assets/img-snacks-shelf.jpg\" alt=\"Snack-counter shelves\">" +
    "<p>Sunflower seeds 3.5　dried plum 2　soda 4　no restock. Dates on the shelf stop in 2011.</p>" +
    "<p>Member Points <strong>cannot</strong> redeem snacks. Someone asked. Tianmai taped a note on the counter: Points only HoldSeat. The note got torn. The rule stayed.</p>" +
    "<p>Snacks are not the main line. Waste time here and ExtraShow still starts. When it starts it will not wait for you to finish a bag of seeds.</p>" +
    "<p>There is a tin in the till drawer. The tin does not sell snacks. The tin holds unclaimed Stub slips. That page is not in the snack nav.</p></main></div>"
});

pages.push({
  file: "help.html", id: "help", no: "06", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Jinque Video Hall - Help",
  body: shopNav("", "help") + "<main><h2>Closed-hall desk</h2>" +
    "<p>Staff pulled out. Auto-reply is still here. Someone asked why that <strong>ExtraShow</strong> can still open. Reply is one line: search the title. Do not search the admin.</p>" +
    "<p>Search one word at a time. Someone joined two words with a space. The system treats that as a split. This site has no combined search.</p>" +
    "<p>PrivateRoom, top-up, and online seating are all dead. Real doors are in body copy you already opened.</p>" +
    "<p>Hints come in four ranks. The first three will not tell you which last button to press.</p>" +
    '<p><button type="button" data-act="hint">Ask the closed-hall desk for a hint</button></p>' +
    '<p data-hint-slot class="muted"></p></main></div>'
});

pages.push({
  file: "search-results.html", id: "search", no: "05", skin: "skin-search-results", css: "search-and-forbidden.css", title: "Search results",
  body: '<div class="mini"><div class="mini-inner"><a href="index.html">Jinque Video Hall</a>' + searchForm("") + "</div></div>" +
    '<div class="box"><h2>Search results</h2><p class="muted">Jinque mirror only indexes pages that already exist. One word at a time.</p></div>'
});

function blog(title, sub, article, aside) {
  const p = "../";
  return '<div class="top"><h1>Xiaotang\'s backup site</h1><p>' + sub + "</p></div>" +
    '<div class="nav"><a href="' + p + 'index.html">Back to the hall</a>' + searchForm(p) + "</div>" +
    '<div class="wrap"><article>' + article + "</article><aside>" + aside + "</aside></div>";
}

pages.push({
  file: "pages/blog-jiaoying.html", id: "blog-jiaoying", no: "07", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "Xiaotang's backup log - ExtraShow",
  body: blog("ExtraShow", "Copied off the house blackboard · comments closed",
    "<h2>ExtraShow</h2><p class=\"meta\">2009-11-03 · reads 1847 · tags: late show / Jinque</p>" +
    "<p>Folk screenings were supposed to pack up at ten. OldHou kept us until Credits ended. After Credits there was another showing. Posters did not print it. Blackboard only had the word: ExtraShow.</p>" +
    "<p>ExtraShow is not one more film. No copy number. The booth only lights a work lamp. Tianmai had everyone write a seat number on a slip. Said it was attendance. Sister Zhou asked why a seat number. Tianmai said members need <strong>JinquePoints</strong>. Points can only HoldSeat.</p>" +
    "<p>I wrote it. Pencil was faint, like a film of dust. Outside, someone joked we were lending our names to the chairs. We took it as a joke. I pinned this tonight because I found the site still taking Visitors. A dead person's icon will still light up.</p>" +
    "<p>If you want the admin, do not look in PrivateRoom. His real name is in the Points note after this post. If you want the hall, the hall name is in this post too. I will not write it straighter.</p>" +
    "<p>That was the lesson. No minibus. People walked in themselves. At the door they gave the living a bag of seeds. Seeds finished, then you could see the booth. What hung in the booth was not film. It was paper chair covers with names. Tianmai lined us up, slips spread out, each person one seat number. Pen was dry. You had to breathe on it before it showed.</p>" +
    "<p>I believed it then. Back in the dorm I wrote this as reportage and thought I understood projection. Later I learned the seat number on the slip was not attendance. It was the paperwork for lending a name to EmptySeat. The house does not say lend. It says HoldSeat. The site later filed HoldSeat under Visitors.</p>" +
    "<p>Comments closed. If the next post, That Night in the Booth, also opens, the showing name brought the side page with it. Not a second lock.</p>",
    "<h3>Previous</h3><ul><li>That night in the booth (if you came in on the showing name, this may unlock with it)</li></ul><h3>Note</h3><p>Private copy. Not a school site. Template is still the 2008 orange head.</p>")
});

pages.push({
  file: "pages/blog-night.html", id: "blog-night", no: "21", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "Xiaotang's backup log - that night in the booth",
  body: blog("That night in the booth", "Unpublished draft · 2011",
    "<h2>That night in the booth</h2><p class=\"meta\">2011-12-21 · draft</p>" +
    "<p>After ExtraShow let out I went upstairs with a cup of water. The booth door was locked from inside. Breath on the glass. A figure in the breath. The figure did not turn.</p>" +
    "<p>Tianmai was downstairs counting chairs. Chairs: fourteen. People: thirteen. He said the missing one was HoldSeat. HoldSeat does not count as a person. It counts as lamp.</p>" +
    "<p>I sent the link to my younger cousin. Screen name Nannan. I will not put the real name in this draft. A real name goes on a Stub. Stub goes in the tin. The tin does not know kin. It only knows the clerk.</p>" +
    "<p>This is a side draft. The main line does not open on it. It only puts the booth and the inside lock in one sentence. If you already searched the showing, you see this with it.</p>" +
    "<p>Draft stops here. I did not save. The mirror saved it anyway. The mirror is more diligent than I am.</p>",
    "<h3>Archive</h3><ul><li>December 2011</li></ul>")
});

pages.push({
  file: "pages/points.html", id: "points", no: "08", dir: "pages", skin: "skin-corp-table-2005", css: "corp-table-2005.css", title: "Jinque member Points",
  body: '<table class="site"><tr><td class="banner" colspan="2">Jinque Member Service Center　　Points · HoldSeat · no merchandise</td></tr>' +
    '<tr><td class="nav" colspan="2"><a href="../index.html">Leave this site</a>　About　Charter　' + searchForm("../") + "</td></tr>" +
    '<tr><td class="left"><h4>Columns</h4><p>Points rules</p><p>HoldSeat notice</p><p>Lapsed members</p></td><td class="main">' +
    '<div class="scroll">Notice: apprentice <strong>Tianmai</strong> concurrently handles outside contact as of today. When admin is not in the booth, do not flip the yellow paper list behind the counter.</div>' +
    "<p>These Points are issued inside Jinque Video Hall. Spending does not accrue. Showing up accrues. Showing up means writing a seat number.</p>" +
    "<p>Points have one use: <strong>HoldSeat</strong>. HoldSeat is not hogging a chair. It lets a showing with no title print your name on the chair back.</p>" +
    "<p>Points cannot transfer. People who transferred become a grey shadow in Visitors. Grey shadow is not a skin.</p>" +
    "<p>Lapsed members still occupy a slot. Only when slots are full do they look for a stand-in. Stand-in is not in the charter. Charter only says: if the clerk is absent, a relative or classmate fills in.</p>" +
    "<p>This site is laid out in tables because that year we only knew Frontpage. Left column, middle notice, filing number blacked out at the bottom. Do not read this page as a stage select. It does one thing: write the projectionist's real name into a Points desk that still pretends to be open.</p>" +
    "<p>Friendly links are all dead. If you came from the log, decide for yourself whether to put the apprentice's name in the search box.</p>" +
    "</td></tr><tr><td class=\"ft\" colspan=\"2\">Jinque Town, Jinque West Road　no official tie to any cinema chain</td></tr></table>"
});

pages.push({
  file: "pages/space-tianmai.html", id: "space-tianmai", no: "09", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "Tianmai's space",
  body: '<div class="topbar"><div class="topbar-inner"><span>Space</span>　<a href="../index.html">Back to the hall</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">Tianmai　Jinque Video Hall projectionist　offline</div>' +
    '<div class="cols"><div><div class="mod"><h3>Owner</h3><div class="bd"><img class="avatar-photo" src="../assets/img-avatar-tianmai.jpg" alt="Tianmai"><p>Lihe County<br>status: go keep the house lamp on</p></div></div>' +
    '<div class="music">Now playing: local file reel.mp3 (cannot decode)</div></div><div>' +
    '<div class="mod"><h3>Profile comments</h3><div class="bd">' +
    "<p>People going into <strong>ContinuityDesk</strong>, login name is my real name. Door passphrase is not a birthday. Use the line from ExtraShow letting out: <strong>SitThrough</strong>.</p>" +
    "<p>Do not write the passphrase on the showtimes board. You already made the showing too obvious.</p>" +
    "<p>Space is still the 2009 module wall. I switched the background to green. Still does not cover Visitors. Visitors has its own save. Search the module name if you want to see who came.</p>" +
    "<p>If I go quiet a long time, do not assume I went for stock. The house line beats the member charter. The charter will have two words that should not be there. Later. First remember the passphrase, then decide whether to enter that pale-cyan back office.</p>" +
    "</div></div>" +
    '<div class="mod"><h3>Log</h3><div class="bd"><p>2011-12-21 I went to keep the lamp on. If Visitors is still blinking, the mirror did not drop.</p></div></div></div><div>' +
    '<div class="mod"><h3>Recent Visitors</h3><div class="bd"><p>This column has its own save. Search the module name to see the list. Grey shadows are not decoration.</p></div></div>' +
    '<div class="mod"><h3>Gifts</h3><div class="bd"><p>Someone mailed me a blank leader. The record may open with this.</p></div></div></div></div>'
});

pages.push({
  file: "pages/seats.html", id: "seats", no: "10", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "HoldSeat list (internal)",
  body: '<article class="record"><h1>HoldSeat list</h1><div class="meta"><span>No.: JQ-10</span><span>Date: 2012-08-19</span>' + searchForm("../") + "</div>" +
    "<p>This list is not posted outside. Outside we say full house. Full house is false. The truth: every ExtraShow must have a name printed on the last row.</p>" +
    "<p>2008-11-03　Hou Changhe　booth　did not let out</p>" +
    "<p>2009-11-03　(empty)　rewritten as a Points slot</p>" +
    "<p>2011-12-21　LuXiaotang　clerk　ticket unclaimed</p>" +
    "<p>2012-08-19　(to fill)　guest　Stub in the tin</p>" +
    "<p>An empty chair still needs a name. If you do not write one, the lamp stays on. Lamp stays on, people walk back out of Credits. People who walk back do not buy tickets.</p>" +
    "<p>LuXiaotang is still on line three. Line three is not struck. A name not struck means the system thinks she is still in the seat. She sent the link because she wants to get down.</p>" +
    "<p><span class=\"stamp\">INTERNAL</span></p></article>"
});

pages.push({
  file: "pages/post-lu.html", id: "post-lu", no: "11", dir: "pages", skin: "skin-discuz-board", css: "discuz-board.css", title: "Lihe Film Fans - who is still watching Credits",
  body: '<div class="wp"><div class="hd"><strong>Lihe Film Fans</strong><span><a href="../index.html">Leave</a>' + searchForm("../") + "</span></div>" +
    '<div class="nv"><a href="#">Board</a><a href="#">Home</a><a href="#">Guide</a></div>' +
    '<div class="floor"><div class="u">LuXiaotang<br>Points 0</div><div class="t">' +
    "<p>Who is still watching Credits. People who finished, reply with a seat number. I cannot reply. I am in the last row. Last row has no aisle.</p>" +
    "<p>Ganggang — no. Nannan. I sent the link to the account you use now. Jinque West Road is still there. Admin is not.</p>" +
    "<p>Do not call the police. Police cannot enter ExtraShow. ExtraShow only knows the clerk. Clerk missing, it knows kin. You are my younger cousin. The Stub may already have printed you.</p>" +
    "<p>Do not go into <strong>ContinuityDesk</strong> under my name. I am not admin. Admin is the projectionist. Projectionist wrote the passphrase in the space.</p>" +
    "<p>This thread is not a main-line door. Main-line doors are the notice and the login. I wrote the notice's name so you would not click PrivateRoom.</p>" +
    '<div class="sig">sig: talk after SitThrough</div></div></div>' +
    '<div class="floor"><div class="u">anon<br>Points --</div><div class="t"><p>anon: you are still short one person who showed up. Backup is empty.</p><p>LuXiaotang: anon out. This is not a shrine. This is a video hall.</p></div></div>' +
    '<p class="pages">1 / 1 page</p></div>'
});

pages.push({
  file: "pages/desk.html", id: "desk", no: "12", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "Qingshi ContinuityDesk · notice",
  body: '<div id="wrap"><header><strong>Qingshi ContinuityDesk</strong><div><a class="ghost-btn" href="javascript:void(0)">Register</a><a class="ghost-btn" href="login.html">Log in</a>' +
    searchForm("../") + "</div></header>" +
    '<div class="notice"><h2>Use notice</h2>' +
    "<p>Registration is closed. Finished showings are archived. The admin account is not in the nav.</p>" +
    "<p>This desk is Jinque Video Hall's internal board. Skin is pale cyan, black buttons, orange search. Do not mix it with the cream shop. Mix them and you will think you are still reading showtimes.</p>" +
    "<p>Login name is the projectionist's real name. Passphrase is the whole line in the space comments. A near word gets a near refusal.</p>" +
    "<p>After login you can open <strong>Handbook</strong> and <strong>ProjectionLog</strong>. Search them without login and you get sent back to this door.</p>" +
    "</div><div class=\"tabs\"><a href=\"login.html\">Log in</a><a href=\"javascript:void(0)\">Offline records</a></div>" +
    "<table><thead><tr><th>Title</th><th>Updated</th></tr></thead><tbody>" +
    "<tr><td>ExtraShow notice (ended)</td><td>2012/08/19</td></tr>" +
    "<tr><td>Clerk absence handling (login required)</td><td>2011/12/21</td></tr>" +
    "</tbody></table></div>"
});

pages.push({
  file: "pages/login.html", id: "login", no: "13", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "ContinuityDesk login",
  body: '<div id="wrap"><header><strong>Qingshi ContinuityDesk</strong>' + searchForm("../") + "</header>" +
    '<form class="login-box" action="#" method="post"><p>Account</p><p><input name="user" autocomplete="off"></p>' +
    "<p>Password</p><p><input name=\"pass\" type=\"password\" autocomplete=\"off\"></p>" +
    "<p><button type=\"submit\">Log in</button></p>" +
    "<p>Credentials must be read on another page first. Do not put them in the nav.</p></form></div>"
});

pages.push({
  file: "pages/handbook.html", id: "handbook", no: "14", dir: "pages", skin: "skin-service-cyan-desk", css: "service-cyan-desk.css", title: "Handbook",
  body: '<div id="wrap"><header><strong>Qingshi ContinuityDesk · Handbook</strong>' + searchForm("../") + "</header>" +
    '<div class="notice"><h2>Handbook</h2><img class="game-photo portrait" src="../assets/img-handbook-cover.jpg" alt="Handbook cover">' +
    '<p class="muted">Cover still carries the old house title. Inside the desk it is just Handbook.</p>' +
    "<p>Rule one: until Credits end, someone must be in the seat. That is the <strong>EmptySeat</strong> taboo. EmptySeat is more dangerous than a full house.</p>" +
    "<p>Rule two: if the clerk is absent, the guest on the HoldSeat list fills in. Guest does not have to volunteer. Opening the link counts as clocking in.</p>" +
    "<p>Rule three: a refund must happen before Credits appear. Once Credits spit the clerk's name, the refund window closes.</p>" +
    "<p>Rule four: do not copy the Handbook onto the showtimes board. Showtimes are for people. The Handbook is for the lamp.</p>" +
    "<p>Attachment index: Lihe County <strong>Gazetteer</strong> excerpt, FilmVault inventory, <strong>ProjectionLog</strong>. Log and Handbook share a lock. Login first.</p>" +
    "<p>You can open this, which means the mirror still knows the two words clerk plus a Handbook. Do not get pleased. Pleased people see themselves in Credits.</p>" +
    "</div></div>"
});

pages.push({
  file: "pages/gazetteer.html", id: "gazetteer", no: "15", dir: "pages", skin: "skin-gov-redbar", css: "gov-redbar.css", title: "Lihe County entertainment Gazetteer excerpt",
  body: '<div class="red"><h1>Lihe County Facts Net</h1><p>Entertainment Gazetteer excerpt　figures altered　do not treat as an official paper</p></div>' +
    '<div class="links"><a href="../index.html">Leave</a><a href="#">Notices</a><a href="#">Directory</a>' + searchForm("../") + "</div>" +
    '<div class="wrap"><img class="game-photo" src="../assets/img-gazetteer-arch.jpg" alt="Old photo of a Lihe cinema"><div class="grid"><div class="box"><h3>Cultural venues</h3><ol>' +
    "<li>Jinque Video Hall　opened 1987　independent　18 Jinque West Road</li>" +
    "<li>Lihe Cinema　rebuilt 1994　withdrawn</li></ol></div>" +
    '<div class="box"><h3>Incident excerpt</h3><ol>' +
    "<li>2008-11　Jinque Video Hall booth overheat　owner <strong>OldHou</strong> unaccounted for　no fire finding</li>" +
    "<li>Thereafter the hall kept late shows on member HoldSeat　closure was not filed</li></ol></div></div>" +
    "<p style=\"padding:12px\">This page is not a civic hall. The red head is an old template. Do not match it to real districts. The excerpt only establishes one thing: the hall is still there, the owner is not, and the method of keeping it going is called HoldSeat.</p>" +
    "<p style=\"padding:12px\">The directory has no clerk. Clerk is not a job title. It is paperwork on a seat. Paperwork goes on the internal list. It does not go on County Facts Net.</p>" +
    '<p class="ft">Fictional site　for the work only</p></div>'
});

pages.push({
  file: "pages/obit-hou.html", id: "obit-hou", no: "16", dir: "pages", skin: "skin-wechat-mp-article", css: "wechat-mp-article.css", title: "Jinque Town local account - Hou Changhe",
  body: '<article class="article"><h1>That lamp on Jinque West Road</h1><img class="game-photo" src="../assets/img-obit-hou.jpg" alt="Jinque West Road lightbox"><p class="meta"><span class="acct">Jinque Watch</span>　2008-11-08　' + searchForm("../") + "</p>" +
    "<p>Jinque Video Hall boss Hou Changhe. Town called him OldHou. After the late show on November 3, the booth lamp did not go out. Next day the door was open. The man was not.</p>" +
    "<p>The station came. No blood. No leaving note. Only breath on the projection-window glass. Someone said they saw him in the last row. Last row sold no tickets that day.</p>" +
    "<p>Family would not agree to cremation. The hall would not pull the seat. Both sides stuck. What stuck produced: late shows continued, Points continued, ExtraShow continued. The person continuing became Tianmai.</p>" +
    "<p>OldHou is not a missing-college-student copy. He is a shopkeeper who treated chairs like incense. A chair wants a person. The person can change.</p>" +
    "<p>This account later wrote a closed note. The note has two words: <strong>ClosedHall</strong>. What closed is the auditorium. The site did not close.</p>" +
    "<p class=\"tail\">Reads 1024　no real official-account marks</p></article>"
});

pages.push({
  file: "pages/vault.html", id: "vault", no: "17", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "FilmVault inventory",
  body: '<article class="record"><h1>FilmVault inventory</h1><img class="game-photo" src="../assets/img-vault-film.jpg" alt="FilmVault, can spine 14-7"><div class="meta"><span>No.: JQ-17</span><span>Counted by: Tianmai</span>' + searchForm("../") + "</div>" +
    "<p>Eighty-seven copies in the vault. Eighty-six have titles. One has no title. Spine only has a seat number: 14-7. Row fourteen, seat seven. Last row, against the wall.</p>" +
    "<p>The nameless leader develops white. White film in the machine and the screen still throws names. Names come from the HoldSeat list, not from the emulsion.</p>" +
    "<p>Vault door answers to a <strong>Stub</strong>. Stub in the tin. Tin in the snack-counter till. Snacks do not sell this ticket.</p>" +
    "<p>One line on the count sheet is inked out. Under the ink you can still see guest. Guest has no staff number. Guest only has kin.</p>" +
    "<p>This vault is not an easter egg. It puts seats and film on the same line. Other end of the line is the unclaimed paper.</p>" +
    "<p><span class=\"stamp\">INTERNAL</span></p></article>"
});

pages.push({
  file: "pages/ticket.html", id: "ticket", no: "18", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "Unclaimed Stub",
  body: '<article class="record"><h1>Unclaimed Stub</h1><img class="game-photo portrait" src="../assets/img-ticket-stub.jpg" alt="Unclaimed Stub, seat 14-7"><div class="meta"><span>Tin</span><span>Printed 2011-12-21</span>' + searchForm("../") + "</div>" +
    '<p class="muted">Tin-box scan. Face still prints the hall name, ExtraShow, seat 14-7.</p>' +
    "<p>Jinque Video Hall　ExtraShow　seat 14-7</p>" +
    "<p>Guest clerk: <strong>Fang Nanxing</strong></p>" +
    "<p>Pickup: LuXiaotang (unclaimed)</p>" +
    "<p>Note: kin covering the shift. Opening the link counts as clocking in. After clock-in, before Credits appear, you may file <strong>LastTicket</strong> paperwork: refund, or sit through.</p>" +
    "<p>The Stub is earlier than the text. The text is this year. The Stub is 2011. You have not come yet. The name is already printed. Print is not prophecy. It is a vacancy.</p>" +
    "<p>A vacancy has to be filled. The person filling it thinks they came to pick up a ticket. The person picking up becomes the ticket.</p>" +
    "<p>Submit on the choice page. Choice page is not in the nav. The word is in the note on this page.</p>" +
    "<p><span class=\"stamp\">UNCLAIMED</span></p></article>"
});

pages.push({
  file: "pages/credits.html", id: "credits", no: "19", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "Credits roll",
  body: '<article class="record"><h1>Credits roll</h1><div class="meta"><span>ExtraShow only</span><span>overwritten each time</span>' + searchForm("../") + "</div>" +
    "<p>Director: none　camera: none　cut: none</p>" +
    "<p>Clerk: LuXiaotang　(system proposes Fang Nanxing)</p>" +
    "<p>Projection: Tianmai　presented by: Hou Changhe</p>" +
    "<p>The clerk line gets rewritten to someone still alive. Rewrite happens in the second Credits spit the name. Before that second you can still file <strong>LastTicket</strong>.</p>" +
    "<p>Credits are not a crew list. Credits register the person in the seat as someone who already finished watching. People who finished may leave. People who did not finish stay in the screen.</p>" +
    "<p>LuXiaotang wants to leave. She asked you here. Not to sit with her. To replace her.</p>" +
    "<p>Replace or not, you press. Before you press, read Stub, OldHou, EmptySeat, Tianmai.</p></article>"
});

pages.push({
  file: "pages/choice.html", id: "choice", no: "20", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "Unclaimed LastTicket",
  body: '<article class="record"><h1>LastTicket</h1><div class="meta"><span>Cannot withdraw after submit</span><span>Choice</span>' + searchForm("../") + "</div>" +
    "<p>Both roads are on this paper. Refund: the name is inked off the chair back, the lamp goes out, LuXiaotang may not come back, but she will not pull down one more person. Sit through: you become clerk, her seat number empties, you stay.</p>" +
    "<p>There is no third sentence. No call the police. No shut the site. The mirror does not know those verbs.</p>" +
    "<p>Confirm you have read the name on the Stub, what became of OldHou, LuXiaotang's post, EmptySeat rules, Tianmai's space. Miss one and the buttons will refuse you.</p>" +
    '<p class="choice-row"><button type="button" data-end="a">Refund</button><button type="button" data-end="b">Sit through</button></p>' +
    '<p data-choice-miss class="muted"></p></article>'
});

pages.push({
  file: "pages/mail-lu.html", id: "mail-lu", no: "22", dir: "pages", skin: "skin-mail-web-2010", css: "mail-web-2010.css", title: "Clerk mailbox",
  body: '<div class="top">Clerk mailbox　unread 1　<a href="../index.html">Leave</a>　' + searchForm("../") + "</div>" +
    '<div class="panes"><div class="folders"><a class="on" href="#">Inbox (1)</a><a href="#">Sent</a><a href="#">Drafts</a></div>' +
    '<div class="mails"><div class="m unread">Sit through for me　2011-12-21</div><div class="m">Showtimes board　2011-11-07</div></div>' +
    '<div class="read"><h3>Sit through for me</h3><p class="meta">From: LuXiaotang　Time: 2011-12-21 02:17</p>' +
    "<p>Nannan: I sent you the video hall URL. Not catching up. I cannot get out of ExtraShow. People who cannot get out can find a stand-in. Stand-in is kin.</p>" +
    "<p>If you come in, read the blackboard first, then search the showing. Do not click PrivateRoom. PrivateRoom is fake.</p>" +
    "<p>I do not know which account you use now. The system said it would deliver to a mailbox that is still alive. This letter is a side item. The main line does not open on mail.</p>" +
    "<p>If you see your own name on the Stub, do not curse me. The name filled a vacancy. Nobody asked you before filling it. ExtraShow does not ask people.</p>" +
    "</div></div>"
});

pages.push({
  file: "pages/album.html", id: "album", no: "23", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "Hall group photo",
  body: '<div class="topbar"><div class="topbar-inner"><span>Space</span>　<a href="space-tianmai.html">Tianmai</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">Tianmai　album: who is extra</div>' +
    '<div class="cols"><div></div><div><div class="mod"><h3>Album</h3><div class="bd">' +
    '<img class="game-photo" src="../assets/img-album-2009.jpg" alt="2009 ExtraShow group photo, grey coat with no face in the back row">' +
    '<img class="game-photo" src="../assets/img-album-2010.jpg" alt="2010 New Year showing, same place, grey coat again">' +
    "<p>I counted. The time we went by seat number, the camera already had one extra. Tianmai said that was exposure. Exposure does not stand on the same brick two years running.</p>" +
    "<p>Grey coat does not take a friend slot. It only takes pixels. The roster has no such person. The roster is for the living.</p>" +
    "<p>This page is a side item. The main line does not open on a group photo. It only shows that Visitors is not decoration.</p></div></div></div><div></div></div>"
});

pages.push({
  file: "pages/mp-close.html", id: "mp-close", no: "24", dir: "pages", skin: "skin-wechat-mp-article", css: "wechat-mp-article.css", title: "Hall closed note",
  body: '<article class="article"><h1>On Jinque Video Hall pausing reception</h1><p class="meta"><span class="acct">Jinque Watch</span>　2018-03-01　' + searchForm("../") + "</p>" +
    "<p>Auditorium locked. Site not closed. Lock the hall so strangers cannot buy a matinee. Leave the site because ExtraShow is still taking Visitors.</p>" +
    "<p>Someone asked if the lightbox could come down. Take the box down and the names on the chair backs stay. The names are not on the box.</p>" +
    "<p>This note is not a main-line door. Search <strong>ClosedHall</strong> and you land here. Here only tells you: closed for business and stopped updating are two different things.</p>" +
    "<p class=\"tail\">Reads 88</p></article>"
});

pages.push({
  file: "pages/forum.html", id: "forum", no: "25", dir: "pages", skin: "skin-discuz-board", css: "discuz-board.css", title: "Lihe Film Fans - LampDebt",
  body: '<div class="wp"><div class="hd"><strong>Lihe Film Fans</strong><span><a href="../index.html">Leave</a>' + searchForm("../") + "</span></div>" +
    '<div class="nv"><a href="#">Board</a></div>' +
    '<div class="floor"><div class="u">old audience<br>Points 9</div><div class="t">' +
    "<p>That lamp on Jinque West Road owed a fire. People who owe fire pay it back by sitting. That is called <strong>LampDebt</strong>. Not a superstition thread. House talk.</p>" +
    "<p>OldHou paid once. Did not finish. Tianmai is paying. LuXiaotang is paying. Finished looks like this: the clerk line in Credits stops changing names.</p>" +
    "<p>Someone said go look at the bath in the Darkroom. The bath has seen blood. It has also seen names. That is another page.</p>" +
    "</div></div></div>"
});

pages.push({
  file: "pages/classified.html", id: "classified", no: "26", dir: "pages", skin: "skin-classified-yellow", css: "classified-yellow.css", title: "Lihe classifieds - WantedClerk",
  body: '<div class="top"><b>Lihe classifieds</b>' + searchForm("../") + "</div>" +
    '<div class="layout"><nav><h4>Classifieds</h4><a href="#">Missing / notices</a><a href="#">Used goods</a><a href="#">Local services</a></nav>' +
    '<div class="list"><div class="row"><a href="#">WantedClerk　Jinque Video Hall　not the police</a><span>Jinque Town</span><span>2011-12</span></div>' +
    "<p>Looking for a stand-in. Not the police. Stand-in needs: knows LuXiaotang, can sit until Credits end. Pay: one unclaimed ticket. Ticket cannot be sold.</p>" +
    "<p>This notice is a side item. It puts WantedClerk on a yellow page so you can search it. Finding it does not mean you have to apply.</p>" +
    "<p>Used column has someone selling copies. Those copies are fake. Real copies are in the FilmVault. Vault is not open to yellow pages.</p></div></div>"
});

pages.push({
  file: "pages/visitors.html", id: "visitors", no: "27", dir: "pages", skin: "skin-qzone-modules", css: "qzone-modules.css", title: "Recent Visitors (grey)",
  body: '<div class="topbar"><div class="topbar-inner"><span>Visitors</span>　<a href="../index.html">Back to the hall</a>　' + searchForm("../") + "</div></div>" +
    '<div class="banner">Recent Visitors　names clear only after login</div>' +
    '<div class="cols"><div></div><div><div class="mod"><h3>Grey shadows</h3><div class="bd">' +
    "<p>??? just now　??? yesterday　??? 2008-11-03</p>" +
    "<p>A dead person's icon will still light up. Light is not coming back. Light means the seat still knows this person.</p>" +
    "<p>Visitors does not honor delete. People who deleted the space still blink. What blinks is the lamp, not the person.</p>" +
    "<p>This column has its own save. Search the module name to see it. It is not decoration.</p></div></div></div><div></div></div>"
});

pages.push({
  file: "pages/paused.html", id: "paused", no: "28", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "PrivateRoom booking (paused)",
  body: shopNav("../", "") + "<main><h2>PrivateRoom booking</h2>" +
    "<p>This column was never opened. In 2005 they wrote coming soon. They wrote it until the site stopped updating.</p>" +
    "<p>You can search this page because someone put PrivateRoom in a notice. They put it there so you would click a fake door. The fake door will tell you: real doors are proper names in the body.</p>" +
    "<p>No hidden ticket here. No admin password. No source easter egg. Go back to a page you already opened and pull one word.</p></main></div>"
});

pages.push({
  file: "pages/oral.html", id: "oral", no: "29", dir: "pages", skin: "skin-blog-personal-2008", css: "blog-personal-2008.css", title: "Old projectionist, oral",
  body: blog("Oral", "Tape lost　do not treat the text as testimony",
    "<h2>On OldHou</h2><p class=\"meta\">Retold · Jinque Town</p>" +
    "<p>He was not burned. The fire was small. Small enough to scorch one leader. The man sat down himself. Sat down into Credits.</p>" +
    "<p>Later we called it HoldSeat. HoldSeat is cheaper than incense. Incense wants a temple. HoldSeat wants a chair.</p>" +
    "<p>Oral is not testimony. Testimony wants a signature. A signature becomes a Stub. A Stub becomes the next person.</p>" +
    "<p>If you came looking for OldHou, he is not in the booth. He is in the last row. Last row does not sell tickets.</p>",
    "<h3>Note</h3><p>Private copy. Do not treat as an official paper.</p>")
});

pages.push({
  file: "pages/log.html", id: "log", no: "30", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "ProjectionLog 2008–2012",
  body: '<article class="record"><h1>ProjectionLog</h1><div class="meta"><span>Login required</span><span>Copied by Tianmai</span>' + searchForm("../") + "</div>" +
    "<p>2008-11-03　late show normal　ExtraShow no copy　owner did not come downstairs</p>" +
    "<p>2009-11-03　ExtraShow　HoldSeat vacant　Points slot started</p>" +
    "<p>2011-12-21　clerk LuXiaotang　did not let out　guest Stub printed</p>" +
    "<p>2012-08-19　site still taking Visitors　auditorium key in the tin</p>" +
    "<p>ExtraShow has no copy number. A showing with no number does not enter chain reports. On the reports, Jinque Video Hall already closed. On the log, Jinque Video Hall is still running.</p>" +
    "<p>This log shares a lock with the Handbook. Login first. You can read it, which means the passphrase was right. Right is not the end. The end is the LastTicket page.</p></article>"
});

pages.push({
  file: "pages/darkroom.html", id: "darkroom", no: "31", dir: "pages", skin: "skin-corp-table-2005", css: "corp-table-2005.css", title: "Darkroom (out of service)",
  body: '<table class="site"><tr><td class="banner" colspan="2">Jinque processing　　out of service · do not enter</td></tr>' +
    '<tr><td class="nav" colspan="2"><a href="../index.html">Leave</a>　' + searchForm("../") + "</td></tr>" +
    '<tr><td class="left"><h4>Gear</h4><p>Developing tank</p><p>Drying line</p></td><td class="main"><img class="game-photo" src="../assets/img-darkroom-tank.jpg" alt="Darkroom developing tank">' +
    "<p>The bath has seen blood. It has also seen names. Blood is what scalded the year the booth overheated. Names were soaked later.</p>" +
    "<p>The Darkroom was locked from inside once. The person who locked it was not trying to die. They were trying to keep Credits from ending early. Credits end early, the paperwork on the seat is void.</p>" +
    "<p>This page is not the only main-line answer. It explains why the House page says the door was locked from inside. The lock is paperwork, not an easter egg.</p>" +
    "</td></tr></table>"
});

pages.push({
  file: "pages/empty-seat.html", id: "empty-seat", no: "32", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "EmptySeat rules",
  body: '<article class="record"><h1>EmptySeat rules</h1><div class="meta"><span>JQ-32</span><span>Internal</span>' + searchForm("../") + "</div>" +
    "<p>Until Credits end, someone must be in the seat. EmptySeat keeps the lamp from cooling. Lamp cannot cool, the booth overheats again. Overheat is not an accident. It is a nudge.</p>" +
    "<p>What gets nudged is the next name. Next name is taken from kin. No kin, then from member Points. Points are people who wrote a seat number. If that still cannot fill, yellow pages hang a <strong>WantedClerk</strong> notice. Looking for a stand-in. Not the police.</p>" +
    "<p>Fang Nanxing has not written a seat number. Fang Nanxing appears on the Stub because LuXiaotang filled kin into a vacancy. Vacancy outranks Points.</p>" +
    "<p>Lawful paperwork for EmptySeat has two kinds, both called <strong>LastTicket</strong>: refund, or sit through. Both submit on the choice page.</p>" +
    "<p><span class=\"stamp\">INTERNAL</span></p></article>"
});

pages.push({
  file: "pages/forbidden.html", id: "forbidden", no: "33", dir: "pages", skin: "skin-forbidden", css: "search-and-forbidden.css", title: "This file has been forbidden",
  body: '<div class="box"><h2>This file has been forbidden</h2>' +
    "<p>A hidden page will not open because you changed the address, read the source, or searched AdminPassword.</p>" +
    "<p>The forbid page is black with red type, ugly on purpose. Ugly is to make you stop and go back to body copy you already read and pull a word.</p>" +
    '<p><span class="hidden-ink">Selecting this block will not give you a main-line word. The main line does not run on a black bar.</span></p>' +
    '<p><a href="../index.html">Home</a>　<a href="../help.html">Help</a></p></div>'
});

pages.push({
  file: "pages/gift.html", id: "gift", no: "34", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Member gift record",
  body: shopNav("../", "") + "<main><h2>Gifts</h2>" +
    "<p>LuXiaotang sent Tianmai a can of blank leader　2011-12-20</p>" +
    "<p>Note: don't talk at the door. SitThrough. You taught me that.</p>" +
    "<p>Tianmai sent guest a blank post　2011-12-21</p>" +
    "<p>Note: not a gift. The name is in the tin, not in this column.</p>" +
    "<p>This page is a side item. Searching the projectionist's real name may open it with the rest. It confirms the passphrase. It does not add a door.</p></main></div>"
});

pages.push({
  file: "pages/ending-a.html", id: "ending-a", no: "35", dir: "pages", skin: "skin-archive-simsun", css: "archive-simsun.css", title: "Refund",
  body: '<article class="record"><h1>Refund</h1><div class="meta"><span>35/36</span><span>Submitted</span></div>' +
    "<p>The tin is empty. Fang Nanxing on the chair back is inked out. The lamp goes out. The booth goes truly cold for the first time.</p>" +
    "<p>LuXiaotang did not walk out of Credits. She also stops sending texts. The vacancy was not filled. The vacancy became empty. Empty is dangerous in the rules. This time it is you refusing to move the danger onto yourself.</p>" +
    "<p>The lightbox on Jinque West Road was taken down later. The site is still here. The site no longer takes Visitors. Visitors need a seat. The seat has no name.</p>" +
    "<p>You were not the clerk. You were someone who opened a link and refunded the ticket. The mirror filed it as: should not have arrived.</p>" +
    '<p style="text-indent:0"><a href="../introduction.html">Back to the guide</a></p></article>'
});

pages.push({
  file: "pages/ending-b.html", id: "ending-b", no: "36", dir: "pages", skin: "skin-shop-local-2010s", css: "shop-local-2010s.css", title: "Sit through",
  body: shopNav("../", "") + "<main><h2>Sit through</h2>" +
    "<p>Credits spit: clerk Fang Nanxing. LuXiaotang's seat number is empty. Whether she comes back, this site does not guarantee. This site only guarantees that someone was sitting before the lamp went out. The person sitting is you.</p>" +
    "<p>Tianmai lit once in Visitors, then went dark. OldHou no longer blinks. The hall writes the account onto a fourth-generation clerk. Fourth generation has no staff number. Only a ticket already taken.</p>" +
    "<p>Showtimes gain a line: ExtraShow　clerk on duty　no refunds. You are admin now. Admin cannot search their own name out.</p>" +
    "<p>The mirror is still alive. Alive because you are still sitting. Do not close this window. Closing equals standing up. Standing up equals EmptySeat.</p>" +
    '<p><a href="../introduction.html">Back to the guide</a></p></main></div>'
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
  intro: "<p>You are not a detective, and you are not a reporter. You are someone a text asked to pick up a ticket. Picking up a ticket is ordinary enough that it does not look like a trap. Traps are often ordinary. Ordinary enough that you would feel rude asking why she did not go herself.</p>",
  home: "<p>Jinque Town has no cinema chain. People who want a film take the minibus to the county seat and come back with the floor full of seed shells. This hall survived not on prints but on people treating the late show as a habit. Habit is harder than box office. Hard things still glow after they stop updating, like a broken lightbox.</p><p>The yellow tags on the notice board came with the template. Template was sold as Easy Little Station. Easy was later painted over by the boss. The painted spot is blank now. Blank is more honest than writing paused. The paused column is the far-right nav cell. Click it and no new page opens.</p><p>People who came often called ExtraShow overtime. Overtime still pays. ExtraShow only has a seat number. Seat number on paper, paper in the tin, tin not on the showtimes board. Showtimes are for people. The tin is for the lamp.</p>",
  films: "<p>Prints come by county post. Title on the waybill and title on the screen not matching is ordinary. When they do not match, someone writes a paper and sticks it on the glass. Glue shadows on the glass have stacked for a dozen years, like a skin that will not peel.</p><p>When the late show lets out someone always asks if there is more. The person asking already knows there is not. Not means: not for the public. Inside there is still one more. The inside showing is not on the top of this board. It is on the bottom line with no time. Read only the top and you will think this hall is ordinary.</p><p>An ordinary hall would not put a late seat gets rewritten to the next name into the schedule notes. The person who wrote that later stopped writing. The mirror kept the sentence. Kept it not to scare. Kept it so later people would know which day the rule went hard.</p>",
  hall: "<p>One hundred twenty seats never filled. What filled was the last row. Last row has seven places. The one against the wall is missing a foot, brick under it. Brick left from Jinque West Road repairs. The road crew carried it in and said your chairs are harder to please than the pavement.</p><p>The upstairs stair is steep. Steep enough that a guest can look up and see the projection window and still not walk it. Walking it wants a key. Key in the tin. Tin on the first floor. First-floor people do not know they are holding the upstairs paperwork.</p><p>Wallpaper is damp. Damp sits right under the window unit. Unit drips. Water wrinkles poster edges. Wrinkled posters still show faces. What you cannot read is the one with the title torn off. That one is only a row of small names, small names changed in ballpoint. Changed names only match on the internal list.</p>",
  snacks: "<p>The snack lamp is an emergency lamp. Emergency lamp stays on all year and still does not throw much light. Third shelf is empty and still has a price tag. Price tags are for habit. Habit lets people think they can still buy dried plum.</p><p>Someone stuffed a Points slip in the till, wanting a soda. Tianmai pushed the slip back. Points are not money. Things that are not money are harder to use. Hard rules get written short, short enough you think you understood.</p><p>The tin is not on the shelf. The tin is in a drawer sandwich. Sandwich was nailed later. The person who nailed it said do not let snacks and Stub sleep together. Sleep together and you mix them: one is for the mouth, one is for the seat.</p>",
  help: "<p>Closed-hall desk lines were saved onto the PC by Tianmai years ago. PC did not change. Lines did not change. What changed is who asks. Askers got fewer, few enough that auto-reply looks eager.</p><p>Eager is not service. Eager is fear you will search the wrong place. Wrong places include PrivateRoom, Source, AdminPassword. Those words send you to an ugly black page. Ugly is on purpose. On purpose so you come back and pull a proper name from the body.</p><p>Four hint ranks can be clicked in a row. Click to four and the reasoning is laid out. You still have to search, log in, and take a side. The desk cannot press those two buttons for you. The buttons are on paper further in.</p>",
  "blog-jiaoying": "<p>After I pinned this, someone DMed me for scaring people. What scares is not the post. It is the hall still taking Visitors. A site that takes Visitors should not be alive after the hall closed. Why it is alive is not finished in this post. This post only spreads the showing name and the Points rule.</p><p>The minibus bit I wrote wrong. Jinque has no minibus at the door. People walked in themselves. People who walk in themselves look more like volunteers. Volunteers are hard to refund. Hard paperwork later got called attendance, attendance later got called Points, Points later got called HoldSeat. The name changed three times. The chairs did not.</p>",
  "blog-night": "<p>In the draft I would not write my cousin's real name. A real name goes in the tin. The tin does not know nicknames. It only knows print. Print is colder than a nickname. Cold things make good tickets.</p><p>The day the booth locked from inside, downstairs was still sweeping. Broom sounded steady, steady like nothing had happened. Things that happen often have no sound. What has sound is the chairs. Chairs creak, Tianmai counts. When the number and the headcount do not match he told me: the missing one belongs to the lamp.</p><p>The lamp's chair cannot be moved. Move it and ExtraShow cannot find a place to land. ExtraShow that cannot land goes looking for a person. Looking starts with kin. Kin not on the list still get printed on. That printed line I later saw in the tin.</p>",
  points: "<p>The Frontpage marquee is still scrolling. The copy has not changed in three years. Not forgotten. Nobody dares change it. Change Points rules and you change names on seats. Names change, Visitors jump. Jumping Visitors scare Tianmai. Scared people write the notice as one yellow strip, and in the strip they only dare point at the apprentice's real name.</p><p>The real name is in the marquee because it cannot be in the nav. Nav is for clicking. Marquee is for a glance. People who glance and will search can enter the space. People who will not search idle on the Points page. Idling beats going to PrivateRoom.</p><p>Lapsed members still occupy a slot — that line is OldHou's leftover. After OldHou was gone, slots became vacancies. Vacancies look for a stand-in. Stand-in is in a charter sandwich, sandwich not public. Public only says: if the clerk is absent, a relative or classmate fills in. Kin is harder than member.</p>",
  "space-tianmai": "<p>Green background I saved off someone else's space. Saved it thinking it looked good. Good does not cover Visitors. Visitors has its own save. Search the module name if you want to see. Seeing it, do not say hi. Saying hi admits you are also a person on a seat.</p><p>The music box is broken. Broken still says now playing. File name is reel. Reel is not a song. Reel is a reel. Until the reel finishes, people do not stand up. The stand-up passphrase I wrote in comment one. Comment one has to be complete. Incomplete gets a near fail.</p><p>I wrote ContinuityDesk's name too. Wrote it so you would not click PrivateRoom. PrivateRoom never had seats. A column with no seats looks most like a game. This hall is most afraid of being taken for a game.</p>",
  seats: "<p>The list is printed in Song-style because Song-style still looks unvoided. Voided lists switch to heavy black. Heavy black is too loud. Loud things are bad to keep internal.</p><p>Line three LuXiaotang is not struck. A name not struck means the system thinks she still occupies the seat. Occupying the seat, she can send a link. Sending a link is not a cry for help. It is finding someone to swap. Swap is allowed by the rules. Things the rules allow look a lot like volunteering.</p><p>The to-fill line faces the tin. Stub in the tin is earlier than the text. Print earlier than a text makes later people feel schemed. Schemed is the wrong word. Accurate is vacancy. Vacancy wants a name. Name picked from kin. The picked person thinks they came to pick up a ticket.</p>",
  "post-lu": "<p>Film Fans Points show zero. Zero is not a ban. Zero is I converted the points into HoldSeat. HoldSeat does not show on the board. The board only shows whether you can still reply. I can still reply. Replies get shorter. Short because Credits take the space.</p><p>Nannan, if you see this thread, do not reply first. A reply does not change the seat number. Seat number is in the tin. Tin is on the first floor. You can walk the first floor. After you walk in, search a word from the log. Do not log in under my name. My name only brings you this thread and one mail. Mail is a side item. A side item cannot be the only door.</p>",
  desk: "<p>Pale cyan was put on later. The person who put it on wanted internal to look like a proper service desk. Proper things let people relax. Relaxed people are more willing to fill an account. Account is not an email. Account is the projectionist's real name. Real name showed in the Points desk marquee, and in the space owner bar.</p><p>The black Offline records button is fake. Fake black button is like PrivateRoom. Click it and no hidden page. Real offline records are in ProjectionLog. Log wants login. Login wants a passphrase. Passphrase wants the whole line. Short counts as not letting out.</p>",
  login: "<p>The login page is short. Short came with the specimen. Short does not mean useless. Useless is putting the password on this page. The password is not on this page. The password is in space comments you already opened.</p>",
  handbook: "<p>Handbook uses the notice skin so you know you are still inside the service desk. Service desk and cream shop are not the same place. The same place would not suddenly grow the word EmptySeat. EmptySeat is taboo, and also a searchable word. The rules you find will write refund and stay as two directions of the same paperwork.</p><p>Gazetteer in the attachment index wears a red head. Red head is not an official paper. Red head is old skin on local files. Under the old skin is OldHou. OldHou can be searched. What you find is not as simple as a eulogy, and it is not a case. People solving a case do not come to sit ExtraShow.</p>",
  gazetteer: "<p>Figures on County Facts Net were painted over. Painted spots look like secrecy. They are nobody daring to fill an accurate death. Accurate death wants a body. There is no body. An incident with no body is written unaccounted for in the excerpt. Unaccounted-for owner, the hall still writes him in the presented-by line.</p><p>The directory does not take clerks. Clerk is not a post. People who are not a post are easiest to swap for another name. When the name swaps, the red-head net will not update. Updates happen in Credits and the tin. The tin is more diligent than the red head.</p>",
  "obit-hou": "<p>When the local account wrote this it still used a real name. Later it became Watch. Watch is safer. Safe copy will not mention ExtraShow. ExtraShow wants readers to search it out of the hall. People who search it out are already in the door. People in the door do not need this piece to recruit them.</p><p>Family would not agree to cremation. The hall would not pull the seat. Those stuck days, Jinque West Road was especially bright at night. Bright because nobody turned the lamp off. A lamp nobody turns off later became a rule: the lamp waits for someone sitting before it will go out. A waiting lamp is not lighting. It is a nudge.</p>",
  vault: "<p>Three of the eighty-seven copies are moldy. Moldy ones still have titles. The one with no title is dry instead. Dry as if it was never projected. Film that was never projected can still throw names on the screen. Names from the list. List from a vacancy. Vacancy from an ExtraShow that did not let out.</p><p>Seat 14-7 shows twice on the count sheet. Once on the spine, once in the note. Note inked out. Person who inked it may have been Tianmai. Tianmai was afraid you would see guest first. Fear does not help. Guest will grow out of the Stub.</p>",
  ticket: "<p>Rust from the tin printed the paper edge. Edge is older than the middle. Middle is print. Print is colder than handwriting. A cold name looks official. No office issued this ticket. What issued it is a vacancy. Vacancy stamped UNCLAIMED. Stamp is red. Red things in internal files usually mean not finished.</p><p>If you curse LuXiaotang, she cannot hear. What hears is the seat. The seat does not care about cursing. The seat only cares whether someone is there. Someone there, it cools. Cool, you pass. People who pass may leave. People who leave are no longer called clerk. People still sitting are.</p>",
  credits: "<p>The roll is overwritten each time. Overwrite is not delete. Delete leaves a blank. Blank is EmptySeat. EmptySeat is dangerous. So the system chooses rename. Rename looks like updating a crew. Updating a crew looks like a picture still in production. There is no picture. A picture that is not there costs people the most.</p><p>Tianmai's name does not change. Projection can change people, and rarely does. A rarely changed seat is a post. A often changed seat is clerk. Clerk is like a consumable. Consumable can be continued by kin. That continue is the roll you are reading now.</p>",
  choice: "<p>You can search once more before you submit. Searching will not press the buttons. Buttons only know whether you read those five. Five sit on Stub, OldHou, LuXiaotang, EmptySeat, Tianmai. Read is not agree. Agree happens when you press.</p><p>Press cannot be withdrawn. Cannot withdraw is not for a thrill. It is because once paperwork on a seat is rewritten, Visitors rewrite with it. Visitors rewrite, the person may not rewrite back. An account that cannot rewrite back, the house calls LampDebt. Debt got talked on the board. Talk does not stop you choosing.</p>",
  "mail-lu": "<p>Sent has one to Tianmai. Title is blank leader. Blank leader is not a gift. Gift is on another page. That page may open with the real name. Things that open together do not add a door. No extra door means: even if you skip the mail, you can still walk the main line. Reading it only makes the stand-in uglier, and clearer.</p>",
  album: "<p>Album permission used to be friends only. The mirror opened it. Opened it not for you to admire. You cannot admire. Grey coat has no face. Pixels with no face still take a cell. Things that take a cell make people count the roster. When the roster is short, people search Visitors. Visitors is a module name. Module names can be searched.</p>",
  "mp-close": "<p>The year the closed note went out, some people in town clapped. People who clapped thought it was finally quiet. What went quiet is the road. Across the road the site still blinks. What blinks is Visitors. Visitors do not need the auditorium door open. Visitors only need a name still on a seat. Names are in the tin. The tin does not drop with the shutter.</p>",
  forum: "<p>Do not split LampDebt. Split search becomes a miss. A miss gives you one sentence. One sentence does not pay a debt. Debt is in the house talk. House talk is in this thread. This thread is not the only door. Doors are EmptySeat rules and the choice page. This thread only turns house talk into a searchable name.</p><p>Someone mentioned Darkroom. Mentioned does not mean you must go. What you must go to is a word you already saw in body copy. See it, then search. Search wild without seeing and you waste it on PrivateRoom and Source.</p>",
  classified: "<p>In the years yellow pages still charged a listing fee, this notice was free. Free notices are the most suspicious. Suspicious things are often honest: it says plainly not the police. Police cannot enter ExtraShow. ExtraShow only knows clerk and kin. If the kin is you, you were already called once in a text. Called once is not enough. You still have to put the word in the top bar yourself.</p>",
  visitors: "<p>Three question marks are not a load fail. Fail would spin. Question marks are names blocked by permission. Permission says: no login, not clear. Login and you still may not see clear. Some clear names are already off the roster. Off the roster and they still light. Light is seat memory. Seat memory outlasts an album.</p>",
  paused: "<p>Coming soon was written for seven years. Seven years, no PrivateRoom floor plan. A column with no floor plan is the best fake door. A fake door's job is to fail. Fail needs a sentence. Sentence is on this page. Read it and leave. After you leave, pull that showing word off the home notice.</p>",
  oral: "<p>The recorder went damp in the Darkroom. Damp tape pulled out empty. Empty tape forces oral. The oral person asked not to be named. Unnamed copy cannot be testimony. Copy that cannot be testimony can still be a lead. Lead points at the last row. Last row does not sell tickets. A place that does not sell tickets is the most expensive. Expensive because it wants a person to fill it.</p>",
  log: "<p>The log wears internal skin. Internal skin, like the Handbook, is afraid you still think you are browsing the little shop. Browsing this far means the passphrase was right. After it is right, set the dates against the HoldSeat list. Set them and you will see: the night the owner did not come downstairs, ExtraShow was still written. A showing that was written did not let out. A showing that did not let out left the vacancy for later.</p>",
  darkroom: "<p>The tank lid is wired shut. Wired shut so people will not open it to smell. People who smelled said vinegar. Vinegar does not cover a scorch smell. Scorch smell is from 2008. After 2008 the bath started soaking slips. Slips have seat numbers. Soak a seat number long enough and the writing floats. Floating writing looks like a name. Names should not appear in a Darkroom. Appear, and ExtraShow has already mixed chemistry with paperwork.</p>",
  "empty-seat": "<p>The rules are written dry. Dry copy fits internal. Internal is not afraid of you being afraid. Internal is afraid of you standing up. Standing up makes EmptySeat. EmptySeat makes overheat. Overheat makes the next vacancy. Vacancy makes the next Stub. Stub makes the next kin. Kin makes you. You are reading the rules, which means the chain has already wound to the choice-page door. The word on that door is LastTicket.</p>",
  forbidden: "<p>Black with red type is not the main line. The main line is in the cream, pale cyan, orange head, and Song-style you already opened. Go back.</p>",
  gift: "<p>A blank leader cannot be projected. A gift that cannot be projected looks most like paperwork. Paperwork arrived on Tianmai's desk wearing a gift. The note on the desk wrote the passphrase again. Twice is not because they fear you forget. It is because people in the hall repeat themselves. Repeating people look more like they are still alive.</p>",
  "ending-a": "<p>The refund stamp is crooked and clear. Clear is the name inked out. Crooked is your hand shaking. Shake does not affect paperwork. Paperwork knows a stamp, not courage. Do not write courage into a file. The file only writes: vacancy not filled, lamp out, Visitors stopped.</p><p>When you walk off Jinque West Road, the lightbox is already down. The person who took the box down thought they did a good thing. The good thing happens on the seat. You are not on the seat. A seat without you can finally be empty. Empty this time is not a nudge. You pressed the nudge off.</p>",
  "ending-b": "<p>People who SitThrough get admin rights. Rights are not glory. Rights are you cannot search your own name out. Search it out and later kin see you. Seeing you equals seeing the next guest slip. You will not send a text. You will change the showtimes board. Showtimes gain a line of ExtraShow. ExtraShow refuses refunds. Refuse is your job now.</p><p>LuXiaotang's seat number is empty. Whether an empty seat number lights again, these sources do not establish. These sources only establish that someone was sitting before the lamp went out. Person sitting, keep this window open. A window is another way of writing a seat.</p>"
};

const MORE2 = {
  intro: "<p>Keyboard / will not focus search in this manual, because the manual has no search box. After you enter the fake site, search is in the top bar. Top bar stays. Staying is not a quest bar. We do not make a quest bar on purpose.</p>",
  films: "<p>Weekend matinee chairs are stacked in the aisle. Stacked chairs still occupy a seat number. A seat number that occupies cannot be sold. Things that cannot be sold look most internal. Internal matinees have been dark for three years. Dark still sits in habit. Habit is more stubborn than a showtimes board.</p><p>LastLamp is ExtraShow's other name. Other name and true name open the same page. Do not split them.</p>",
  hall: "<p>Someone stuck gum on a row-fourteen chair back. Stuck gum outlasts posters. Long-lived things remember who sat. The person who sat left. The gum stayed. House people call that a trace. A trace is not enough for evidence. Evidence is in the tin and the list. The list is not in the empty shots on this page.</p><p>The House page has no dark door besides search. Dark doors are in proper names.</p>",
  snacks: "<p>Soda crates are stools. People who delivered prints sat on the stools. People who delivered prints asked if ExtraShow sells. Sell or not, the snack counter cannot answer. Questions it cannot answer, read the notice. The notice has a word. Take that word to the top bar.</p><p>Do not peel expired price tags. Peel them and later people will think the counter is still alive. What is alive is the seat, not the dried plum. Dried plum only makes the hall smell like it is still open.</p>",
  help: "<p>The desk does not take calls. The phone is blacked out on home. Blacked out is not a fault. A fault would ring. Things that do not ring look more like already closed. Closed people still left four ranks of words. Words are more reliable than people. Reliable words still want you to search yourself.</p><p>Hints can be clicked to rank four. Rank four will say the five checks in full. You still press on the choice page yourself.</p>",
  "blog-night": "<p>I left the computer on the class page — no, on the showtimes page. Showtimes jumped to ExtraShow. ExtraShow has no poster. A showing with no poster burns the most power. Power-hungry nights, the fan sounds like someone walking upstairs. The walker is Tianmai. Tianmai counts chairs. A person who counts chairs looks least like a killer. A person who does not look like a killer is the best admin.</p>",
  "space-tianmai": "<p>Friend column is empty. An empty friend column is cleaner than a full one. A clean space still has Visitors. Visitors do not walk the friend protocol. Protocol is for adding people. Visitors are for adding seats. Seats do not add friends. Seats only add names. In the comments I wrote a name as part of the passphrase. Write the passphrase complete.</p>",
  seats: "<p>Print ink comes off on your hands. People with ink on their hands should not touch copies. Copies fear oil. Oil fears names. Names fear empty. Empty fears the lamp. The lamp fears nobody sitting. ExtraShow with nobody sitting goes looking for kin. Kin is written next to to-fill. Next to it is a dried-out pen. The pen is not for signing this page. Signing happens on the choice page.</p><p>To-fill is not blank. To-fill is the line already printed in the tin and not yet admitted.</p>",
  "post-lu": "<p>That anon floor looks like paper people. Do not search paper people. Search it and you may get no page. Words with no page waste you. Waste you on a miss sentence. The sentence will say no matching results. No matching results, come back and read proper names I already wrote: ContinuityDesk, HoldSeat, ExtraShow. Proper names are in the blue titles and the black body, not in the cute sig. Cute sigs do not open doors.</p>",
  desk: "<p>The notice puts Log in next to a black button. Next to that is Register. Register is grey. Grey means closed. Closed register forces you to use an existing account. There is only one existing account. That account's real name is on another page. You should already have opened that page. If you have not, go open it. Do not guess a birthday on this page.</p><p>Pale cyan and the cream shop must split at a glance. Split, and you know you have entered the nested back office.</p>",
  handbook: "<p>Handbook rule four says do not copy onto the showtimes board. Someone who copied wrote EmptySeat as a matinee discount. Discount made guests think they could get a deal. Guests who got a deal entered ExtraShow. Entered, hard to refund. Hard-to-refund later got written internal. Internal is showing you now. After you read it, search EmptySeat. EmptySeat is taboo, and also a door.</p><p>ProjectionLog shares a lock with the Handbook. The lock is login. After login you can set dates against the list.</p>",
  gazetteer: "<p>Lihe County is fiction. A fictional county still wants a road. The road is Jinque West Road. Number 18 appears once in the excerpt. Once is enough. Enough to put the hall and the incident on the same red head. Under the red head the cinema is already withdrawn. A withdrawn chain does not govern an independent hall. Ungoverned places are where a dirt method like HoldSeat can live.</p><p>OldHou is in the incident excerpt. A person's name can be searched. What you find is not an official paper.</p>",
  "obit-hou": "<p>Someone forwarded this to the board. The board changed the title to haunt. Haunt pulls people who came to watch. People who came to watch cannot sit still. People who cannot sit still are the worst for ExtraShow. ExtraShow wants SitThrough. SitThrough is the passphrase Tianmai taught later. The passphrase is not in this piece. This piece only turns OldHou into a searchable name.</p>",
  vault: "<p>The humidity card in the vault stopped on a mark. A stopped card still hangs. Hangs to look professional. A professional count still wrote guest in the note. Note inked. Inked and the writing still shows. People who see the writing go looking for a Stub. Stub can be searched. The paper you find looks more like an ending key than the film in the vault.</p>",
  ticket: "<p>Fang Nanxing is printed very square. Square unlike a last-minute hand. Things that do not look last-minute make people feel it was planned. Planned is too big a word. Too big for a tin. The tin only holds a vacancy. Vacancy has to be filled. Filling used kin. Kin was filled by LuXiaotang. She filled it, then sent the text. The text is later than the print. Later things look like a request. A request cannot cover a name already printed.</p><p>LastTicket in the note is the choice-page search word. Do not split it.</p>",
  credits: "<p>Overwrite happens in one second. In that second the clerk line flashes twice. After twice, a new name. If the new name is you, you are still sitting. People still sitting get rights. Rights are in the other ending. The other ending also wants you to press first. Before you press, this roll writes LastTicket again. Twice is a house tic. A tic is easier to remember than a new word.</p><p>Presented-by still writes Hou Changhe. The man is not there. The name is still in presented-by.</p>",
  choice: "<p>Both buttons are cold. Cold buttons fit cannot withdraw. A cannot-withdraw choice still wants evidence. Evidence is not courage. Evidence is five pages you read. Miss one, refusal writes under the buttons. The sentence under them has no malice. Malice is the seat. The seat does not care whether you are ready.</p><p>Refund erases you. Sit through leaves you. Both are paperwork, not a moral score.</p>",
  "mail-lu": "<p>Trash is empty. Empty trash means nobody threw this letter away. Not thrown away does not mean important enough to open a door. Doors are ContinuityDesk and Handbook. Mail only makes the stand-in sound ugly. Ugly talk is sometimes clearer. Clear talk is still a side item. A side item can be skipped. Skip it and you can still walk to the tin.</p>",
  album: "<p>Grey coat stands on the same brick. Seed shells in the grout. Seed shells prove this is the hall, not a composite. A composite would not be this dirty. Dirty pixels made Tianmai explain it as exposure. After the explain failed he left the album. Left it for later people to count themselves. After you count, search Visitors. Visitors care even less about a face than an album does.</p>",
  "mp-close": "<p>At the end of the note someone asked to take the site down. Taking the site down wants a password. Password is not in this piece. Password also should not be searched. Search AdminPassword and you enter the black page. The black page is not ClosedHall. ClosedHall only brings you this note. The note admits the auditorium is locked. A locked auditorium still rents seats to the mirror. The mirror is cheaper than a shutter.</p>",
  forum: "<p>Replies in this thread are thin. A thin thread looks like nobody believed it. Unbelieved house talk is still used in the hall. The person using it is Tianmai. Tianmai does not post. The poster is old audience. Old audience may already be off the roster. Off the roster and they can still talk. Talk permission comes from having paid the lamp. People who paid the lamp have the right to write the word complete. Complete, then it hits.</p>",
  classified: "<p>Local services has someone taking ticket pickup. Ticket pickup looks a lot like your text. Looking alike is not the same thing. The same thing is in the tin. The tin does not advertise. What advertises is a missing clerk. The missing-clerk notice writes a missing person as WantedClerk. Do not split WantedClerk. Split and you miss.</p>",
  visitors: "<p>Grey shadows move. Move is not animation. Reduce motion and they still move. What moves is refresh. Refresh once, question marks change place. Question marks that change place look like a queue. People in the queue have no face. No face and they still take a Visitors cell. The rule for taking a cell is written in the space: search the module name. Module name is Visitors.</p>",
  paused: "<p>If you came from the nav, you cannot come in. The nav is empty. Empty nav forces you to search. Search PrivateRoom and this page opens. Opening this page means fail. Fail has to be seen. After you see it, go search ExtraShow. ExtraShow sits beside the yellow tag on home. Beside it is the real door.</p>",
  oral: "<p>The oral person said OldHou sat down himself. Sitting down himself is uglier than being burned. The ugly version is closer to the house rule. The rule wants a person to fill a chair. People who fill chairs later got called clerk. Clerk as a job is not in any post list. A job not in a post list is easiest to swap. The swap story starts with OldHou. The starting name can be searched.</p>",
  log: "<p>The copy is ballpoint. Ballpoint bleeds through the next page. Dates stack like two ExtraShow happening at once. At once is an illusion. Under the illusion you can still read did not let out. Did not let out is the hardest line in the log. Hard line faces list line three. Line three is LuXiaotang. LuXiaotang you should already have searched.</p><p>Guest Stub printed faces the name you have now. The name is in the tin, not on this log's cover.</p>",
  darkroom: "<p>No film on the drying line now. No film and the clips still hang. Clips look like they are waiting for something to come back. What comes back will not be a copy. Copies are in the vault. The nameless can in the vault faces 14-7. 14-7 faces the tin. The tin faces you. If you already saw the Stub, the Darkroom only adds the chemical smell. Adding a smell is not a new door. Doors are still those proper names.</p>",
  "empty-seat": "<p>A nudge is not a ghost cry. A nudge is the booth overheating. Overheat trips a breaker. A breaker stops Credits halfway. Credits stopped halfway are the most dangerous. Danger is the clerk line not finished rewriting. Not finished, cannot let out. Cannot let out, someone has to sit. If the person sitting is you, go press on the choice page. Before you press, read the five. Sign you read them: LastTicket can be searched.</p><p>The five are Stub, OldHou, LuXiaotang, EmptySeat, Tianmai. Miss one, the choice page refuses.</p>",
  gift: "<p>The gift record looks like gifts on an old social site. This hall does not carry that site's mark. No mark and there is still a send column. This column opens as a side item. The side-item note writes SitThrough again. The line to Tianmai is LuXiaotang teaching herself. People who teach themselves later cannot get out. Cannot get out, then they find a stand-in. The stand-in's name is not on this page. The name is in the tin.</p>",
  "ending-a": "<p>The mirror wrote should not have arrived into the log. The log does not update again. A site that does not update can still open. Open it and there are no Visitors. A hall with no Visitors looks truly closed. Truly closed is what you pressed. Pressed closed is cleaner than County Facts Net's unaccounted for. Clean does not mean no cost. Cost is LuXiaotang may not come back. A person who may not come back left the choice with you. You used it.</p>",
  "ending-b": "<p>After no refunds is written into showtimes, Help's desk will still ping. Ping is useless. Use is on the seat. The person on the seat cannot refund themselves. Rights you cannot refund are called admin. Admin will see the next vacancy. If the vacancy shows kin again, whether you send a text, this ending does not write. What it does not write is yours to think about before the lamp goes out. While you think, sit.</p>"
};

function han(html) {
  const text = html.replace(/<[^>]+>/g, "");
  return (text.match(/[\u4e00-\u9fff]/g) || []).length;
}

let total = 0;
const per = [];
pages.forEach(function (p) {
  p.body = inject(p.body, MORE[p.id] || "");
  p.body = inject(p.body, MORE2[p.id] || "");
  const html = page(p);
  fs.writeFileSync(path.join(root, p.file), html);
  const n = han(p.body);
  total += n;
  per.push({ id: p.id, no: p.no || "-", han: n, file: p.file });
});
const footer = "numbered pages opened This site is a fictional investigation Do not match it to real offices or people Guide";
const fh = han(footer);
total += fh * pages.length;
const kq = 24;
const numbered = pages.filter((p) => p.no).length;
const over300 = per.filter((p) => p.no !== "-" && p.han >= 300).length;
const short = per.filter((p) => p.no !== "-" && p.han < 200).length;
const over700 = per.filter((p) => p.no !== "-" && p.han > 700);
fs.writeFileSync(path.join(root, "volume-report.json"), JSON.stringify({ numbered, keywords: kq, han: total, over300, short, over700, per }, null, 2));
console.log(JSON.stringify({ files: pages.length, numbered, keywords: kq, han: total, over300, short, over700: over700.map((x) => x.id + ":" + x.han) }, null, 2));
