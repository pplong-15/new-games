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
    title: "Classmates Online · Notes",
    searchable: false,
    html: function (h) {
      return (
        '<div class="intro-hero"><h1>Classmates Online</h1></div><main>' +
        "<section><h2>◯ Intro</h2>" +
        "<p>You were born in the 1980s. Around college you lived on a campus real-name site: a blue bar on top, functions on the left, a feed in the middle, RecentVisits on the right. Later the site closed. Accounts went dead. Classmates scattered into other apps. You thought that slice of youth had already died.</p>" +
        "<p>This month a classmate you had not seen in years sent a URL. Short. Not a shopping scam. You hesitated, then opened it. The blue bar is still there. The status box is still there. The clocks are wrong: some posts freeze in 2011, some comments are dated this year.</p>" +
        "<p>The site is not the trademark you remember. It calls itself Classmates Online. The layout, the wording, even the habit of finding people by school and enrollment year, all feel like the place you refreshed every night. You walk in as a guest. Three things to settle: why this address is still alive; whether the person who sent the link is still alive; and why it knows you.</p>" +
        "<p>You still remember that refresh: back from evening study, check who visited, then who changed a status, then flip the album to the last page. Gifts, parking, the farm all closed later. The blue bar stuck harder than those apps. When the classmate sent the link, you first wondered whose account had been stolen. Stolen accounts usually want money. This link wants nothing except that you click it.</p>" +
        "</section><section><h2>◯ What you do</h2>" +
        "<p>This is a note. Once you are inside, treat it as a real site that stopped updating and refused to die: read notices, read the feed, read the footer. The top bar has search. <strong>One token per search</strong>, copied as printed, no spaces. Tokens appear on pages you have already opened. Empty input, two words with a space, and punctuation do not open new pages. CamelCase counts as one token.</p>" +
        "<p>At least one nav item opens a paused page. App Center will tell you it stopped. Ways forward are written as proper names in the body. After a hit, the page becomes a log, an old workshop site, a gazetteer, or a dossier — not just a new title color.</p>" +
        "<p>The first token that almost nobody misses is on the home feed, and Help repeats it. Someone pinned an old elective's nickname again. That token is <strong>PaperHorse</strong>.</p>" +
        "</section><section><h2>◯ If you get stuck</h2>" +
        "<p>This note does not follow you in. On-site Help still has auto-replies from retired support: four notes. The first three do not print the last token. The fourth writes the reasoning. You still search, log in, and take a position yourself.</p>" +
        "<p>Footer numbers do not click. The whole mirror is fiction. Do not match county names or personal names to the living world.</p>" +
        "<p>It happens in fictional Tongxi County. The three generations' accounts are settled only inside this mirror. Site names, personal names, and place names here are not for matching against real institutions.</p>" +
        "<p>After you press Enter Classmates, this note is put away. Hints stay in Help, with retired support. First token to remember: PaperHorse.</p>" +
        "<p>Open this folder through a local web server. If you drag the folder into the browser, cross-page search and saves will drop.</p>" +
        "<p>Saves stay on this machine. Clear save forgets pages you already opened. Large type and reduce motion can be ticked any time. Press / to focus search.</p>" +
        (typeof location !== "undefined" && location.protocol === "file:"
          ? '<p class="paused">This is file://. Start python3 -m http.server in the project folder, then come in.</p>'
          : "") +
        '<div class="boot-actions">' +
        '<button type="button" data-act="new">Enter Classmates</button>' +
        '<button type="button" class="ghost" data-act="continue">Continue</button>' +
        '<button type="button" class="ghost" data-act="wipe">Clear save</button>' +
        "</div>" +
        "<p><label><input type=\"checkbox\" data-opt=\"large\"" + (h.state.large ? " checked" : "") + "> Large type</label>　" +
        "<label><input type=\"checkbox\" data-opt=\"reduce\"" + (h.state.reduce ? " checked" : "") + "> Reduce motion</label></p>" +
        "</section></main>"
      );
    }
  };

  P.home = {
    id: "home",
    file: "home.html",
    no: "01",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Home",
    searchable: true,
    searchBody: "Feed ChenXiaobei WuQiming PaperHorse Ganggang Class04 guest App Center closed class public page pinned log RecentVisits",
    excerpt: "ChenXiaobei sent the link and asked about PaperHorse. WuQiming pinned that log again.",
    grants: ["lead_home"],
    html: function (h) {
      return sns(
        h,
        "<h2>Feed</h2>" +
          '<div class="status-box"><div class="lab">What are you thinking?</div><textarea disabled placeholder="Guests cannot post"></textarea><button class="pub" type="button" disabled>Publish</button><p class="disabled-note">Publish is grey. System note: guests can only read cache.</p></div>' +
          '<div class="item"><span class="name">ChenXiaobei</span> <span class="time">2026-08-12 02:17</span><p>Ganggang, I sent the link to the account you use now. You still remember <strong>PaperHorse</strong>. The class page is still there. The admin is not.</p><div class="acts"><span>Reply</span><span>Share</span><span>Like 0</span></div></div>' +
          '<div class="item"><span class="name">WuQiming</span> <span class="time">2011-11-07 23:04</span><p>Pinned the log titled PaperHorse again. Who can still see it? After that internship, people in class started staying up to refresh RecentVisits.</p><div class="acts"><span>Reply(12)</span><span>Share</span></div></div>' +
          '<div class="item"><span class="name">System</span> <span class="time">2018-03-01</span><p>Classmates Online has stopped operations. What you are seeing is a mirror cache. App Center, top-ups, and the gift shop are all unavailable. The class public page needs an admin login.</p></div>' +
          '<div class="item"><span class="name">ChenXiaobei</span> <span class="time">2014-06-02 19:41</span><p>I am going back to Butou next week. That grey coat in ZhouTang\'s album — which of you dares say it is not a person.</p></div>' +
          '<div class="item"><span class="name">Feed</span> <span class="time">2011-09-18</span><p>Someone shared a log. The title was stamped Deleted. The sharer field is empty. One comment left: do not search the admin\'s true name first. He does not like being found.</p></div>' +
          '<div class="item"><span class="name">WuQiming</span> <span class="time">2009-11-03 21:16</span><p>Back from Shenwan after the elective, hands full of ink paste. Someone called it attendance. I put it in the log. If you want it, search the title. Do not type a course name into Find. Find already stopped.</p></div>' +
          '<p class="muted">Server time: 2011-12-31 23:59, which does not match comment times. The feed stalls in different years, like a cache someone kept feeding.</p>' +
          '<p class="muted">The status box is grey. Guests cannot post. Guests can only read cache.</p>'
      );
    }
  };

  P.find = {
    id: "find",
    file: "find.html",
    no: "02",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Find",
    searchable: true,
    searchBody: "Find by name school enrollment year Tongxi Voc-2 interface stopped use top search one token",
    html: function (h) {
      return sns(
        h,
        "<h2>Find</h2><p>Look up classmates by name, school, and enrollment year. This used to be the real-name site's most-used function.</p>" +
          '<p>School: <select disabled><option>Tongxi County No. 2 Vocational School</option></select> Year: <select disabled><option>2004</option></select></p>' +
          '<p><button type="button" disabled>Look up</button> <span class="muted">This interface closed in 2016. Class rosters will not pop from here.</span></p>' +
          "<p>System note: lookup is closed. Use the top search. The top bar takes one token at a time. It will not join a name and a school.</p>" +
          "<p>Find used to pull classmates back by name, school, and year. The interface shut in 2016. Top search is still here. One token. It does not stitch name and school together.</p>" +
          "<p>What is still publicly indexed: the campus brief, Help, and cached feed items. Profiles, albums, and the public class page are not on this list.</p>" +
          "<p>Class rosters, logs, and profiles are not in this dropdown. The dropdown has already stopped.</p>" +
          '<div class="paused"><p>Names you have typed will not appear here. This is not a search-results page.</p></div>'
      );
    }
  };

  P.school = {
    id: "school",
    file: "school.html",
    no: "03",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Campus",
    searchable: true,
    searchBody: "Tongxi County No. 2 Vocational School Class04 ClassCS public page folk craft Shenwan internship Butou Town computer class",
    html: function (h) {
      return sns(
        h,
        "<h2>Tongxi County No. 2 Vocational School</h2>" +
          "<p>The school sits by the old bus station in Butou Town. After 2000 it enrolled in computing, electromechanics, and preschool teaching. Classmates Online listed this school as searchable in 2006. The 2004 computing class, ClassCS track 1, once opened a class public page. It now reads as under repair.</p>" +
          "<p><strong>Class04</strong> public page used to send notices, collect homework screenshots, and take class fees. After winter 2011 it was no longer kept by students still in school. The nav line below has stopped. It does not open.</p>" +
          '<p><a>Class04 public page (under repair)</a></p>' +
          "<p>The elective Folk Craft long took students to a workshop in Shenwan village. School materials only say Folk Craft Practice. They do not print a shop name. Some students called the class something else in their logs. The internship newsletter was pulled from the campus net.</p>" +
          "<p>School statement: this mirror does not mean the school still runs that social site. Alumni business should use current channels. This page only keeps a brief cached around 2010.</p>" +
          "<p>Folk Craft Practice took students to Shenwan. The shop name is not on this page.</p>" +
          "<p>The 2004 computing class was among the first to register under real names as a group. The public page later displayed as under repair. Index tag: Class04. Department short tag: ClassCS.</p>" +
          "<p>The electromechanics class and the preschool class have no public-page cache. This page does not print a shop name. It only records the Shenwan internship.</p>" +
          "<p>The address bar still looks like an old campus domain. Maps, admissions phones, and the principal's mailbox are all masked.</p>"
      );
    }
  };

  P.help = {
    id: "help",
    file: "help.html",
    no: "04",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Help",
    searchable: true,
    searchBody: "Help SiteClosed 2018 mirror search one token PaperHorse support App Center paused class admin",
    excerpt: "Classmates Online marked SiteClosed in 2018. One token per search. People asked why the PaperHorse log still opens.",
    html: function (h) {
      return sns(
        h,
        "<h2>Help Center</h2>" +
          "<p>Classmates Online marked <strong>SiteClosed</strong> in 2018. The pages you see come from a mirror that will not name its host. Feed items may still be written. The official support mailbox bounces.</p>" +
          "<p>How to search: type <strong>one</strong> token in the right side of the blue bar. No spaces. No command lines. Do not try to view source or rewrite the address. Hits list titles. If you lack permission after opening, you will be told you do not have permission.</p>" +
          "<p>Common questions: people ask why the log titled PaperHorse still opens. Answer: cache not cleared. People ask when App Center comes back. Answer: it does not. People ask who the class admin is. Answer: this page does not publish a true name. Read it yourself in a log or workshop page you already opened.</p>" +
          "<p>Top-bar Apps opens a paused page. The class page is not in the app list.</p>" +
        "<p>The mirror does not recover passwords. Auto-replies follow where you have already read. They will not search for you and will not log in for you.</p>" +
        "<p>Help keeps the voice of the closedown notice. No host signed a name. One token per search. Support still auto-replies.</p>" +
        "<p>Do not split PaperHorse. Split into two words and this site will not take it.</p>" +
          '<div class="paused"><p>Retired support · auto-reply still on. One send follows only where you have already read. It will not submit search or login for you.</p>' +
          '<p><button type="button" data-act="hint">Send a line to support</button></p>' +
          "<p class=\"muted\">Auto-reply has four notes at most. The fourth writes the reasoning. You still submit search or login yourself.</p></div>"
      );
    }
  };

  P.apps = {
    id: "apps",
    file: "apps.html",
    no: "05",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - App Center",
    searchable: true,
    searchBody: "App Center paused farm parking friend trade gifts top-up closed 2012",
    html: function (h) {
      return sns(
        h,
        "<h2>App Center</h2>" +
          '<div class="paused"><p>App Center closed in 2012. The names below are leftover directory lines. Clicks do nothing.</p></div>' +
          "<p>Happy Farm (offline)　Grab a Space (offline)　Friend Trade (offline)　Test Fortune (offline)　Gift Shop (offline)</p>" +
          "<p>System note: App Center closed to stop virtual currency. The class public page, logs, and albums are not apps. They will not appear in this directory.</p>" +
          "<p>This directory is closed. The page is not missing.</p>" +
        "<p>The directory is still here. Clicks do nothing.</p>"
      );
    }
  };

  P.search = {
    id: "search",
    file: "search.html",
    no: "06",
    skin: "skin-search-results",
    title: "Classmates Search",
    searchable: false,
    html: function () {
      return (
        "<p>Classmates Search only indexes pages that already exist in this mirror. One token. A hit lists titles. A miss leaves one line. No permission is told as no permission.</p>" +
        "<p>Ordinary words only hit Home, Find, Campus, Help, and the paused App Center. Proper names open logs, the workshop, spaces, dossiers. Do not join two tokens with a space. This site has no combined search.</p>"
      );
    }
  };

  P["blog-paperhorse"] = {
    id: "blog-paperhorse",
    file: "blog-paperhorse.html",
    no: "07",
    skin: "skin-blog-personal-2008",
    title: "WuQiming's blog - PaperHorse",
    searchable: true,
    searchBody: "PaperHorse ShenjiPaper ShenYizhou fingerprint elective folk craft Dongzhi WuQiming log Shenwan",
    excerpt: "The elective took us to Shenwan. That class later got called PaperHorse.",
    grants: ["fact_paperhorse"],
    html: function (h) {
      return (
        '<div class="top"><h1>Qiming backup site</h1><p>Reprinted from a Classmates log · comments stopped</p></div>' +
        '<div class="nav">' + h.a("home", "Back to Classmates") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>PaperHorse</h2>" +
        '<p class="meta">2009-11-03 · reads 1847 · tags: elective / Shenwan</p>' +
        "<p>Folk craft was supposed to be window cuttings in a classroom. Teacher Zhou put us on a minibus to Shenwan. The bus stopped at a door painted gold. Four characters on the sign. I later saw the same shop name on a classmate's space: <strong>ShenjiPaper</strong>.</p>" +
        "<p>The shop was full of things for the dead. Horses, clothes, houses, phones, all paper. ShenYizhou moved through the shop as if it were his own house. He had everyone press a fingerprint in a yellow paper book and called it a visit register. ZhouTang asked why a fingerprint. ShenYizhou said: the elective takes attendance.</p>" +
        "<p>I pressed. The paste was thin, like a layer of ash. After we came out someone joked that we had lent our names to paper figures. We treated it as a joke. I pinned this tonight because I found Classmates is still taking visits. Dead people's avatars light up too.</p>" +
        "<p>The admin's true name is above. The shop name is above. I will not write it straighter.</p>" +
        "<p>That is how the class ran. The minibus dropped us on a dirt road in Shenwan. Gold paper on the door, loud when the wind hit. Inside they poured tea for the living first. Tea finished, then the back court. Paper-horse bones drying there, bamboo frames, white paper not yet pasted. ShenYizhou lined us up. Yellow book open. One fingerprint each. The paste was dry. You had to breathe on it before it showed. ZhouTang asked if a fake name counted. ShenYizhou said the elective has to match student numbers. Fake names are not attendance.</p>" +
        "<p>I believed him then. Back at school I wrote this as reportage and thought I understood folk custom. Later I learned the fingerprints on the yellow book were a procedure for lending a name to a paper figure. The shop only said register. Classmates later took registration in as visits.</p>" +
        "<p>It rained a little when class ended. The minibus glass was all fingerprints. You could not tell which ones had just come off the yellow book. ShenYizhou sat in the last row and did not talk to us, as if delivering a bus of people back to school was just another shop drop. Someone heckled him to open his space and show RecentVisits. He did not. He said visits were for family. We thought he was putting on a show. I pinned this tonight so people still alive would see the shop name first.</p>" +
        "<p>After the pin, someone messaged me for scaring people. What is scary is Classmates still taking visits. A site that takes visits should not be alive after closedown. This piece puts the shop name and the apprentice's true name on the table and then stops.</p>" +
        "<p>Comments closed. Title unchanged on reprint. There is another piece beside it, That Night Back in the Village, a draft from the same day.</p></article>" +
        "<aside><h3>Previous</h3><ul><li>That Night Back in the Village</li></ul><h3>Blog notice</h3><p>Private reprint. The template is still the 2008 orange header.</p></aside></div>"
      );
    }
  };

  P["blog-night"] = {
    id: "blog-night",
    file: "blog-night.html",
    no: "16",
    skin: "skin-blog-personal-2008",
    title: "WuQiming's blog - That Night Back in the Village",
    searchable: true,
    searchBody: "That Night Back in the Village WuQiming Shenwan incense dare not write shop name attached PaperHorse",
    excerpt: "That night back in the village the computer was open on the class page. This piece was an unpublished draft.",
    grants: ["lead_night"],
    html: function (h) {
      return (
        '<div class="top"><h1>Qiming backup site</h1><p>Unpublished draft · 2011</p></div>' +
        '<div class="nav">' + h.a("home", "Back to Classmates") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>That Night Back in the Village</h2>" +
        '<p class="meta">2011-11-08 · draft · no permission set, still taken by the mirror</p>' +
        "<p>This was not supposed to go out. The PaperHorse piece was for the living. This one was for me.</p>" +
        "<p>Before Dongzhi I went back to Shenwan to ask about the fingerprints. Only one lamp in the shop. A woman behind the counter did not look up. ShenYizhou was not there. She said the apprentice had gone to keep the incense. I asked where the incense was kept. She pointed at the computer. The computer had the Classmates class page open.</p>" +
        "<p>I did not write the shop name. The shop name is in the previous piece. I only wrote: they treat a visit as incense. Whoever opens a homepage has offered a stick. That night I did not dare search the admin. I was afraid of being written as a visit.</p>" +
        "<p>The shop computer was very bright. The class public page sat on an unsent status. The cursor was still blinking. The woman said her son had gone to keep the incense, keep it on the page. She would not let me touch the mouse. She said a stranger's click also counts as a stick. I pulled my hand back. That night I wrote this draft and set it to only me. The mirror does not care about permission. It took the draft too.</p>" +
        "<p>I did not open RecentVisits. I was afraid of seeing my own avatar behind the dead. After I got home I uninstalled Classmates. Uninstalling does not solve a mirror. Home's clocks are broken. Someone is keeping incense on the cache.</p>" +
        "<p>The draft still has a line I deleted and the mirror rescued: if the person keeping incense does not come back, the shop will switch on an appendix. Who is in the appendix, I did not know then. I only knew the yellow book was thicker than the class roster.</p></article>" +
        "<aside><h3>Previous</h3><ul><li>PaperHorse</li></ul></aside></div>"
      );
    }
  };

  P.shenji = {
    id: "shenji",
    file: "shenji.html",
    no: "08",
    skin: "skin-corp-table-2005",
    title: "ShenjiPaper - Welcome",
    searchable: true,
    searchBody: "ShenjiPaper ShenLianshan ShenXiulan ShenYizhou apprentice Butou paper horse wreath company site Dongzhi Shenji",
    grants: ["fact_shop"],
    html: function (h) {
      return (
        '<table class="site"><tr><td class="banner" colspan="2">ShenjiPaper　　heritage · custom · delivered to the house</td></tr>' +
        '<tr><td class="nav" colspan="2">' + h.a("home", "Leave this site") +
        '　About　Products　Contact　{{SEARCH}}</td></tr>' +
        '<tr><td class="left"><h4>On this site</h4><p>Generated by Frontpage<br>Last update 2005-12-09<br>Visitors 000184</p><h4>Business</h4><p>paper horses　paper clothes　paper houses　wreaths　full yin-marriage sets　coffin paste-work</p></td>' +
        '<td class="main">{{FLASH}}' +
        '<div class="scroll">Notice: apprentice ShenYizhou also handles outside contact as of today. Class visits by appointment. When the admin is not in the shop, do not open the yellow book behind the counter.</div>' +
        "<p>This house has done paper work in Shenwan since the ancestors. The first-generation sign writes <strong>ShenLianshan</strong>. Present affairs are kept by the daughter <strong>ShenXiulan</strong>. Grandson ShenYizhou studies in the county seat and returns on breaks.</p>" +
        "<p>We take funerals, anniversaries, and old jobs of the kind called making the numbers complete. Old jobs are not on the price list. If Butou asks about water-works matters, the answer is aftercare finished. The shop only does paper. The shop does not explain.</p>" +
        "<p>Students who visit often call the elective by another name. Please do not post photos of the in-shop yellow book on the internet.</p>" +
        "<p>Contact: ShenXiulan　delivery inside the town　no online payment　this page will not be redesigned</p>" +
        "<p>Friendly links have all failed.</p>" +
        "<p>This site is laid out in tables. Prices on the left, notices in the middle, filing number blacked out at the bottom. First generation: ShenLianshan opened the house. Second: ShenXiulan keeps the yellow book. Third: ShenYizhou wired the yellow book to the class page.</p>" +
        "<p>Product copy says paper horses may be burned, paper clothes folded, paper houses taken apart. Account matters belong on Classmates. Most nav here is dead links.</p>" +
        "<p>Students who came through often called the elective PaperHorse. The school course name is Folk Craft Practice. Shop name: ShenjiPaper. Short name on the village line: Shenji.</p>" +
        "<p>Prices: paper horses by size, paper houses by depth, yin-marriage sets by talk. Talk does not make an invoice. Only a yellow slip with an arrival written. If Butou asks about water-works, the answer is aftercare finished.</p>" +
        "<p>Footer visitor count stuck at 000184. Later people went over to Classmates.</p>" +
        "</td></tr><tr><td class=\"ft\" colspan=\"2\">Shenwan village Shenji　ICP filing number painted out　this site has no official relation to any real-name social platform</td></tr></table>"
      );
    }
  };

  P["space-syz"] = {
    id: "space-syz",
    file: "space-syz.html",
    no: "09",
    skin: "skin-qzone-modules",
    title: "ShenYizhou's space",
    searchable: true,
    searchBody: "ShenYizhou RecentVisits IncenseFirst class admin login passphrase module music box",
    grants: ["fact_syz"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>Space</span>　' + h.a("home", "Back to Classmates") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">ShenYizhou　Class04　admin not online</div>' +
        "{{FLASH}}<div class=\"cols\"><div>" +
        '<div class="mod"><h3>Owner</h3><div class="bd"><img class="ph sq" src="assets/img-avatar-syz.jpg" alt="ShenYizhou"><p>Tongxi Voc-2<br>status: gone to keep the incense</p></div></div>' +
        '<div class="music">Now playing: local file (cannot decode)</div>' +
        "</div><div>" +
        '<div class="mod"><h3>Wall</h3><div class="bd"><p>People who enter the class public page: login name is my true name. Door phrase is not a birthday. Use the shop line: <strong>IncenseFirst</strong>.</p><p>Do not put the passphrase in the feed. You already made the course name too obvious.</p><p>The space is still a 2009 module wall: green bars, a music box, a guestbook, each in its block. I changed the background to a lake. The visit column still will not stay hidden.</p><p>If I go quiet for a long time, do not assume I went for work. The shop line works better than ClassRules. Article three has two words a class should not use. Remember the passphrase, then go into the pale-cyan back room.</p></div></div>' +
        '<div class="mod"><h3>Logs</h3><div class="bd"><p>2011-12-21 I am going to keep the incense. If visits still tick, the mirror has not broken.</p><p>The skin is still that winter. Passphrase on the wall. Not a birthday. Not a student number.</p></div></div>' +
        "</div><div>" +
        '<div class="mod"><h3>RecentVisits</h3><div class="bd"><p>This column has its own archive. Grey shadows are on the list.</p></div></div>' +
        '<div class="mod"><h3>Gifts</h3><div class="bd"><p>Someone sent me a paper horse. Record stored separately.</p></div></div>' +
        "</div></div>"
      );
    }
  };

  P.gift = {
    id: "gift",
    file: "gift.html",
    no: "34",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Gift record",
    searchable: true,
    searchBody: "gifts paper horse IncenseFirst ShenYizhou ChenXiaobei attached",
    grants: ["lead_gift"],
    html: function (h) {
      return sns(
        h,
        "<h2>Gift record</h2><p>After the app went offline, gifts are only text.</p>" +
          '<div class="item"><span class="name">ChenXiaobei</span> sent <span class="name">ShenYizhou</span> a paper horse　2011-12-20<p>Note: do not speak at the door. IncenseFirst. You taught me that.</p></div>' +
          '<div class="item"><span class="name">ShenYizhou</span> sent <span class="name">JiangWanqing</span> a blank card　2009-11-03<p>Note: elective attendance. Not a gift.</p></div>' +
          "<p>Door phrase follows the wall on ShenYizhou's space.</p>" +
          "<p>The paper horse was passed between them in private. The blank-card line writes JiangWanqing into 2009.</p>" +
          "<p>Records run by time. The 2011 note has IncenseFirst in it.</p>",
        '<div class="rail"><h3>Gift shop</h3><p class="muted">Closed. Cannot send more.</p></div>'
      );
    }
  };

  P.visitors = {
    id: "visitors",
    file: "visitors.html",
    no: "10",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - RecentVisits",
    searchable: true,
    searchBody: "RecentVisits ChenXiaobei JiangWanqing ZhouTang dead 2014 2026 grey shadow",
    grants: ["fact_visitors"],
    html: function (h) {
      return sns(
        h,
        "<h2>RecentVisits · ShenYizhou's homepage</h2>" +
          "<p>The system bills by who opened this profile. Two timestamp sets sit together.</p>" +
          '<div class="visit"><img class="ph" src="assets/img-avatar-cxb.jpg" alt="ChenXiaobei"><span><strong>ChenXiaobei</strong>　2026-08-12 02:16　visits 1847</span></div>' +
          '<div class="visit"><img class="ph" src="assets/img-avatar-cxb.jpg" alt="ChenXiaobei"><span><strong>ChenXiaobei</strong>　2014-06-03 00:11　visits 1 (household side marked deceased after this)</span></div>' +
          '<div class="visit"><img class="ph" src="assets/img-avatar-zt.jpg" alt="ZhouTang"><span>ZhouTang　2011-12-22　visits 9</span></div>' +
          '<div class="visit"><div class="ph sq">empty</div><span><strong>JiangWanqing</strong>　not yet visited　avatar slot empty　system reserved</span></div>' +
          '<div class="visit"><div class="ph">?</div><span>unparsed PaperFigure number　visit time shows as Dongzhi</span></div>' +
          "<p>ChenXiaobei's household file is marked deceased. The name still ticks. JiangWanqing is a reserved old-account true name. The avatar slot is empty.</p>" +
          "<p>Counts sit on the right. Two timestamp sets: one stops in 2014, one writes this year. The system has no red warning.</p>" +
          "<p>An unparsed PaperFigure number also logged a visit. JiangWanqing's cell has not yet visited.</p>" +
          "<p>The list runs newest first. The 2014 set and this year's set do not line up.</p>",
        '<div class="rail"><h3>Note</h3><p>Counts get written as ritual language elsewhere. This page only bills. It does not print that word.</p></div>'
      );
    }
  };

  P["profile-cxb"] = {
    id: "profile-cxb",
    file: "profile-cxb.html",
    no: "11",
    skin: "skin-campus-sns-2010",
    title: "ChenXiaobei's profile",
    searchable: true,
    searchBody: "ChenXiaobei Class04 crash 2014 status Ganggang class public page ZhouTang",
    grants: ["fact_cxb"],
    html: function (h) {
      return sns(
        h,
        '<div class="profile-head"><img class="ph sq" src="assets/img-avatar-cxb.jpg" alt="ChenXiaobei"><div><h2>ChenXiaobei</h2><p>Tongxi Voc-2 Class04　stars: friends already scattered</p>' +
          '<div class="tabs-inline"><span aria-current="page">Profile</span> ' +
          (h.state.unlocked.indexOf("album-cxb") >= 0 ? h.a("album-cxb", "Album") : "Album") +
          "</div></div></div>" +
          '<div class="item"><span class="time">Info</span><p>Last login: 2026-08-12. Household note (reposted in album comments): crash, 2014-06. Two lines on the same page. The system has no red warning.</p></div>' +
          '<div class="item"><span class="name">ChenXiaobei</span> <span class="time">2026-08-12</span><p>Ganggang you still have not come. The class public page still takes Class04 as a lookup token. I sent you the link. This is not a reunion.</p></div>' +
          '<div class="item"><span class="name">ChenXiaobei</span> <span class="time">2014-06-02</span><p>Back to Butou tomorrow. If I do not come back, do not press another fingerprint for the Shen house.</p></div>' +
          "<p>Status jumps from 2014 to 2026. Class id Class04 is still in the info.</p>" +
          "<p>Stars have no friends left to click. The death repost in info is someone copying an obituary comment in. It is not a system field.</p>" +
          "<p>No travel photos in the middle. No job. The message is short: Ganggang, come.</p>" +
          "<p>A folded share at the bottom: class public page, title Class04, shared 2011.</p>",
        '<div class="rail"><h3>Friends</h3><p>ShenYizhou (admin)　ZhouTang　WuQiming　JiangWanqing (unconfirmed)</p></div>'
      );
    }
  };

  P["album-cxb"] = {
    id: "album-cxb",
    file: "album-cxb.html",
    no: "12",
    skin: "skin-campus-sns-2010",
    title: "ChenXiaobei's album",
    searchable: true,
    searchBody: "ChenXiaobei album ZhouTang grey coat crash obituary class",
    grants: ["lead_album_cxb"],
    html: function (h) {
      return sns(
        h,
        "<h2>Album · Class04 those years</h2>" +
          '<div class="album-grid"><img class="ph wide" src="assets/img-album-grad2007.jpg" alt="2007 graduation group, extra faceless shadow in the back row">' +
          '<img class="ph wide" src="assets/img-album-obituary.jpg" alt="ChenXiaobei obituary photo"></div>' +
          "<p>Group comment: <span class=\"name\">ZhouTang</span>: the grey coat on the left was not a person at the time of the photo. I have one in my own album too.</p>" +
          "<p>The system kept one obituary comment: do not send wreaths on Classmates. Wreaths should go to Shenji. That line wrote the death dead. It did not write the account dead.</p>" +
          "<p>An extra faceless shadow in the back row of the group. The obituary puts the death in a comment.</p>" +
          "<p>Two pictures still here: graduation group, obituary photo. Comments were not closed.</p>" +
          "<p>ZhouTang said the grey coat was not a person at the time of the photo.</p>"
      );
    }
  };

  P.class = {
    id: "class",
    file: "class.html",
    no: "13",
    skin: "skin-service-cyan-desk",
    title: "Class04 public page",
    searchable: true,
    searchBody: "Class04 public page notice login admin ClassRules paused ClassCS",
    grants: ["fact_class"],
    unlocks: ["login"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div><strong>Class04</strong> public page</div>" +
        h.a("home", "Leave") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="notice"><h2>Notice of use</h2>' +
        "<p>The ground color, the buttons, and the nav all changed. The class public page used to be another back room.</p>" +
        "<p>Guests may read this notice. ClassRules, the shared folder, and undeleted feed items need an admin login. Login name is the admin's true name, not an email.</p>" +
        "<p>This class stopped updating in winter 2011. The mirror still accepts login. You have no publish rights and no delete rights.</p>" +
        "<p>The notice keeps the service desk's pale cyan and black buttons. Guests can only read this: you need to log in. Do not use a password-recovery mail.</p>" +
        "<p>Login name is the admin's true name. Not an email. Not a student number. The passphrase is on the wall of that space. Empty strings do not work. Birthday and student-number guesses do not work.</p></div>" +
        '<div class="tabs">' + h.a("login", "Log in") +
        (h.has("access_class") ? h.a("class-rules", "ClassRules") + h.a("class-feed", "Feed") : '<a>ClassRules (login required)</a><a>Feed (login required)</a>') +
        "</div>" +
        "<table><tr><th>Speaker</th><th>Summary</th></tr>" +
        "<tr><td>System</td><td>Admin account occupied long-term. Do not try password-recovery mail.</td></tr>" +
        "<tr><td>Guest</td><td>The rules door is not open to guests. Searching the class id only reaches here.</td></tr></table></div>"
      );
    }
  };

  P.login = {
    id: "login",
    file: "login.html",
    no: "14",
    skin: "skin-service-cyan-desk",
    title: "Class04 - Log in",
    searchable: false,
    searchBody: "login admin passphrase",
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>Class public page login</div>" +
        h.a("class", "Back") + " {{SEARCH}}</header>{{FLASH}}" +
        '<form class="login-box" data-act="login"><p>Use the admin true name and the door phrase. Empty strings do not work.</p>' +
        '<label for="user">Login name</label><input id="user" name="user" autocomplete="off">' +
        '<label for="pass">Passphrase</label><input id="pass" name="pass" type="password" autocomplete="off">' +
        '<p><button type="submit">Log in</button></p></form></div>'
      );
    }
  };

  P["class-rules"] = {
    id: "class-rules",
    file: "class-rules.html",
    no: "15",
    skin: "skin-service-cyan-desk",
    title: "Class04 - ClassRules",
    searchable: true,
    searchBody: "ClassRules YinRegister fingerprint visits admin shared not for outside",
    grants: ["fact_rules"],
    need: ["access_class"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>ClassRules</div>" +
        h.a("class-feed", "Feed") + h.a("class", "Notice") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="notice"><h2>Class04 rules (revised 2011)</h2>' +
        "<p>1. This public page is for notices only. 2. The fingerprint roll from the elective is not to be uploaded. 3. If a backup must be made, it may only go into the share named <strong>YinRegister</strong>, not open to guests.</p>" +
        "<p>4. Visit counts shall not be written as points. 5. After an admin leaves, the passphrase shall not be written into the feed. 6. If a deceased classmate's account is still posting, do not like first. Check article 3 of these rules first.</p>" +
        "<p>Note: the share named YinRegister has been published to a place the mirror can index. Not open to guests.</p>" +
        "<p>Revised winter 2011. Signature line empty.</p>" +
        "<p>Article 3 locked the shared folder's name: YinRegister. Funerals have used it. A class should not.</p>" +
        "<p>Article 6 writes that deceased classmates still post. After login, read the rules, then the feed.</p>" +
        "<p>Signature line empty. Rules revised winter 2011.</p>" +
        "<p>Pale cyan is the service-desk color. Article 3 has the token YinRegister in it.</p></div></div>"
      );
    }
  };

  P["class-feed"] = {
    id: "class-feed",
    file: "class-feed.html",
    no: "28",
    skin: "skin-service-cyan-desk",
    title: "Class04 - Feed",
    searchable: true,
    searchBody: "class feed ShenYizhou keep incense ZhouTang JiangWanqing YinRegister after login Spare",
    grants: ["lead_class_feed"],
    need: ["access_class"],
    html: function (h) {
      return (
        "<div id=\"wrap\"><header><div>Class feed</div>" +
        h.a("class-rules", "Rules") + h.a("inbox", "Inbox") + " {{SEARCH}}</header>{{FLASH}}" +
        '<div class="post"><div class="post-info"><span>ShenYizhou</span> 2011-12-21</div><p>I am going to keep the incense. Do not show YinRegister to outsiders. If visits stop, the mirror has broken.</p></div>' +
        '<div class="post"><div class="post-info"><span>ZhouTang</span> 2011-12-22</div><p>The extra person in my album showed up again tonight. Do not tell me a visit is incense. I will throw up.</p></div>' +
        '<div class="post"><div class="post-info"><span>System</span> 2026-08-12</div><p>Reserved account JiangWanqing has not signed in. Spare line still unused.</p></div>' +
        "<p>After login you can only read. You cannot delete. The system has already written your old name into a reservation.</p>" +
        "<p>ShenYizhou put keeping incense and YinRegister in the same post. ZhouTang refused to call a visit incense. The system wrote JiangWanqing into a reservation notice.</p>" +
        "<p>The passphrase shall not be written in the feed. Article 5 of the rules forbids it.</p>" +
        "<p>The reservation notice writes JiangWanqing very neatly. Spare line still unused.</p></div>"
      );
    }
  };

  P.gazetteer = {
    id: "gazetteer",
    file: "gazetteer.html",
    no: "17",
    skin: "skin-gov-redbar",
    title: "Tongxi County Gazetteer - Shenwan village",
    searchable: true,
    searchBody: "Adoption Shenwan gazetteer ButouReservoir Shen clan LinZhaodi water works aftercare Reservoir",
    grants: ["fact_adoption"],
    html: function (h) {
      return (
        '<div class="red"><h1>Tongxi County Gazetteer</h1><p>Local materials　not a government hall　do not match to real divisions</p></div>' +
        '<div class="links">' + h.a("home", "Leave") + "　Overview　Towns　Directory　{{SEARCH}}</div>" +
        '{{FLASH}}<div class="wrap"><div class="grid"><div class="box"><h3>Shenwan village brief</h3>' +
        "<p>Shenwan belongs to Butou Town. Most residents are surnamed Shen. Paper work and bamboo were recorded as sidelines. Village notes state that in winter 1959 ButouReservoir underwent numerical aftercare. Details are under Water Conservancy. This column records only: handled.</p>" +
        "<p>In 1987 the village recorded one cross-surname <strong>Adoption</strong>: a young child of the Lin surname from a neighboring village entered a Shen side branch. The gazetteer does not publish private reasons. It only registers the household change. The adoption deed scan is not on this site. It is in the genealogy and in funeral papers.</p>" +
        "<p>1987 has an Adoption registration. Lin surname changed into a Shen side branch. Handler column: ShenXiulan. Witness column painted out.</p>" +
        "<p>Water works and Adoption sit under the same township column. Shenwan has paper-figure trade. Shenwan went through ButouReservoir aftercare. Shenwan has Adoption.</p>" +
        "<p>The agency letterhead was removed. The red bar is only a color.</p>" +
        "<p>Bamboo, new-year pictures, and Dongzhi offering entries were deleted in 2012, reason: overlap with paper figures. The household-change column still keeps Adoption. The water column still keeps ButouReservoir. Short index also used: Reservoir.</p>" +
        "<p>The search box was added later. It does not match the red bar.</p>" +
        '</div><div class="box"><h3>Entries</h3><ol>' +
        "<li>Water: ButouReservoir <span class=\"date\">1959</span></li>" +
        "<li>Custom: paper-figure trade <span class=\"date\">on file</span></li>" +
        "<li>Household: Adoption registration <span class=\"date\">1987</span></li></ol>" +
        "<p>The water entry title contains ButouReservoir. The custom entry does not print the shop's full name.</p></div></div>" +
        "<p>The Adoption deed scan is not on this site. Aftercare details are under the water entry.</p>" +
        "</div>"
      );
    }
  };
})(GAME.pages);
