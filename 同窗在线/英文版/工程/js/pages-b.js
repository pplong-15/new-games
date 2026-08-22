(function (P) {
  P.reservoir = {
    id: "reservoir",
    file: "reservoir.html",
    no: "18",
    skin: "skin-gov-redbar",
    title: "Tongxi County Gazetteer - ButouReservoir aftercare",
    searchable: true,
    searchBody: "ButouReservoir StandIn 1959 ShenLianshan numbers aftercare paper missing Dongzhi Reservoir",
    grants: ["fact_standin"],
    html: function (h) {
      return (
        '<div class="red"><h1>Tongxi County Gazetteer</h1><p>Water materials extract　figures overpainted　do not treat as official papers</p></div>' +
        '<div class="links">' + h.a("gazetteer", "Village") + "　" + h.a("home", "Leave") + "　{{SEARCH}}</div>" +
        '{{FLASH}}<div class="wrap"><div class="box"><h3>ButouReservoir · winter 1959</h3>' +
        "<p>After the overtopping, twenty-three missing persons were reported. On household recheck the numbers did not close. The county required the name list to close. Village paper craftsmen were called to work through the night. Local materials only write: aftercare used a <strong>StandIn</strong> procedure, sent into the reservoir area at Dongzhi. On living household books those twenty-three remain missing, not deceased.</p>" +
        "<p>StandIn in this entry means the matching row on a paper-figure roll. It does not mean a stage actor. The materials do not write whether paper figures used living people's birth times. Shenwan later called this kind of job filling the numbers, not saving people.</p>" +
        "<p>Materials from the overtopping night contradict each other. Water wants the numbers closed. Civil affairs wants missing to remain missing. Village paper craftsmen worked the night. At Dongzhi the paper was sent into the reservoir area. Procedure column: StandIn. The longer telling is in the oral history.</p>" +
        "<p>1959 filled twenty-three empty places. 1987 lacked an answering voice for a yin marriage. The two books are kept apart.</p>" +
        "<p>This is an extract from a fictional county. Entry title: ButouReservoir. Procedure name: StandIn. Short index also used: Reservoir.</p>" +
        "<p>Aftercare papers have one painted-out line, faintly: make the count with paper. The count that was made was the reported missing. Paper is cheap. After the procedure was written as StandIn, later shortfalls would bring it out again.</p>" +
        "<p>Editor note: do not mix with current flood materials. This page is only a data site in red-bar color.</p>" +
        "<p>When the 1987 yin marriage was short a person, the same word appeared in private papers. The gazetteer does not take private papers.</p>" +
        "<p>On living household books those twenty-three remain missing. Aftercare used a StandIn procedure, related to paper work.</p>" +
        "</div></div>"
      );
    }
  };

  P.yince = {
    id: "yince",
    file: "yince.html",
    no: "19",
    skin: "skin-archive-simsun",
    title: "YinRegister · extract volume",
    searchable: true,
    searchBody: "YinRegister Adoption StandIn Spare JiangWanqing LinZhaodi ShenZhaodi ShenYizhou PaperFigure number",
    grants: ["fact_yince"],
    html: function (h) {
      return (
        '<div class="record">{{FLASH}}<h1>YinRegister</h1>' +
        '<div class="meta"><span>Shenwan Shenji copy</span><span>not for outside</span>{{SEARCH}}</div>' +
        '<p>This book is not a class roster. Those who pressed a fingerprint are written as on roll. Those who did not are written as appendix. One visit, one stick of incense. When incense ends, the paper figure falls.</p>' +
        "<table><tr><th>No.</th><th>Name</th><th>Gen.</th><th>Note</th></tr>" +
        "<tr><td>01</td><td>ShenLianshan</td><td>I</td><td>Opened the book. Deceased. Incense kept by the shop.</td></tr>" +
        "<tr><td>19</td><td>LinZhaodi</td><td>II</td><td>1987 yin-marriage attendance. Later Adoption. Then called ShenZhaodi.</td></tr>" +
        "<tr><td>20</td><td>ShenXiulan</td><td>II</td><td>Now keeps the yellow book. Not in the paper-figure column.</td></tr>" +
        "<tr><td>33</td><td>ShenYizhou</td><td>III</td><td>Class admin. Did not return after keeping incense in 2011.</td></tr>" +
        "<tr><td>34</td><td>ChenXiaobei</td><td>III</td><td>Household death 2014. Account still counts visits.</td></tr>" +
        "<tr><td>35</td><td>ZhouTang</td><td>III</td><td>Extra person in album. Unverified.</td></tr>" +
        "<tr><td>36</td><td>JiangWanqing</td><td>III</td><td><strong>Spare</strong>. Taken in 1986. Unused. Waiting for a visit.</td></tr>" +
        "</table>" +
        '<p>The appendix writes: if the third generation cannot keep the line, switch on the Spare row. How it switches on: the person opens Classmates and answers present. The note column also has a StandIn procedure, listed apart from Adoption.</p>' +
        "<p>The copy uses a serif face, ruled in dots. The person who opened the book, the adopted child, the admin, the classmate who is dead and still visiting, the person with an extra in the album, the Spare row: one table.</p>" +
        "<p>The register writes JiangWanqing as Spare. Whether to answer or not, the copy will not fill it in for you.</p>" +
        "<p>Numbers run from 1 to 36. Empty numbers in the middle. Row 36 is appendix.</p>" +
        "<p>ChenXiaobei, ZhouTang, ShenYizhou sit side by side on the table. The passphrase is not on this table.</p>" +
        '<p>The mirror published the share. Not yet answered.</p>' +
        '<p><span class="stamp">copy</span></p></div>'
      );
    }
  };

  P["album-zt"] = {
    id: "album-zt",
    file: "album-zt.html",
    no: "20",
    skin: "skin-qzone-modules",
    title: "ZhouTang's space · album",
    searchable: true,
    searchBody: "ZhouTang album grey coat extra person Shenwan module wall",
    grants: ["fact_zhou"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>Space</span>　' + h.a("home", "Back to Classmates") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">ZhouTang　thought a pale-green background would stop people finding this　failed</div>' +
        "{{FLASH}}<div class=\"cols\"><div><div class=\"mod\"><h3>Owner</h3><div class=\"bd\"><img class=\"ph sq\" src=\"assets/img-avatar-zt.jpg\" alt=\"ZhouTang\"><p>Class04</p></div></div></div>" +
        "<div><div class=\"mod\"><h3>Album: who is extra</h3><div class=\"bd\">" +
        '<img class="ph wide" src="assets/img-album-paperhorse2009.jpg" alt="2009 PaperHorse group, grey coat no face in the back row">' +
        '<img class="ph wide" src="assets/img-album-spring2010.jpg" alt="2010 spring outing group, grey coat in the same place">' +
        "<p>I counted. The extra one was already in the camera the day we pressed fingerprints. ShenYizhou said it was exposure. Exposure does not stand on the same brick two years running.</p>" +
        "<p>The space is a pale-green module wall. The music box is broken. The album is still here. The grey coat does not take a friend slot. It only takes pixels. I compared the photos to the class roster. The roster does not have this person. The roster is for the living. The living should not have a back row with no face.</p>" +
        "<p>I closed the wall once. The mirror opened it again. Anonymous talks in a paper-figure voice, names me, and names someone who has not visited yet.</p></div></div></div>" +
        "<div><div class=\"mod\"><h3>Wall</h3><div class=\"bd\"><p>Stored separately. The wall was closed. The mirror opened it again.</p></div></div></div></div>"
      );
    }
  };

  P["wall-zt"] = {
    id: "wall-zt",
    file: "wall-zt.html",
    no: "21",
    skin: "skin-qzone-modules",
    title: "ZhouTang's space · wall",
    searchable: true,
    searchBody: "ZhouTang wall PaperFigure present JiangWanqing attached Spare",
    grants: ["lead_wall"],
    html: function (h) {
      return (
        '<div class="topbar"><div class="topbar-inner"><span>Space</span>　' + h.a("album-zt", "Album") + "　{{SEARCH}}</div></div>" +
        '<div class="banner">ZhouTang　wall</div>{{FLASH}}' +
        '<div class="cols"><div></div><div><div class="mod"><h3>Comments</h3><div class="bd">' +
        "<p>Anonymous: you are still short one person to answer present. Spare is still empty.</p>" +
        "<p>ZhouTang: anonymous get out. This is not a shrine.</p>" +
        "<p>Anonymous: Classmates is the shrine. If JiangWanqing clicks in, the grey coat will have a face.</p>" +
        "<p>ZhouTang: I want this space deleted. Cannot delete it. The green wall is harder to close than the blue bar.</p>" +
        "<p>Anonymous: delete it and it will still be in the visits. Visits do not take deletion.</p>" +
        "<p>Anonymous put Spare and JiangWanqing in one sentence. Every byline is Anonymous.</p>" +
        "<p>ZhouTang wants the space gone. Anonymous says gone still sits in the visits.</p>" +
        "</div></div></div><div></div></div>"
      );
    }
  };

  P.forum = {
    id: "forum",
    file: "forum.html",
    no: "22",
    skin: "skin-discuz-board",
    title: "Butou Teahouse - YinDebt",
    searchable: true,
    searchBody: "YinDebt Butou teahouse forum Shenwan paper figures incense living luck",
    grants: ["fact_debt"],
    html: function (h) {
      return (
        '<div class="wp"><div class="hd"><strong>Butou Teahouse</strong><span>' + h.a("home", "Leave") + " {{SEARCH}}</span></div>" +
        '<div class="nv"><a>Teahouse</a><a>Local</a><a>Custom</a><a>Off-topic</a></div>{{FLASH}}' +
        '<div class="floor"><div class="u"><p>OP</p><p>OldButou</p></div><div class="t">' +
        "<h3>does that Shenwan house still do YinDebt for people</h3>" +
        "<p>when i was a kid they said if you owe the dead a number you can pay with a living person's luck. with being seen. used to be graves. then name lists. then somebody put the list online and said a visit is offering incense.</p>" +
        "<p>the word is <strong>YinDebt</strong>. shenwan paper shop wont use it they only say fill the numbers. old people all call it that tho</p>" +
        "<p>teahouse board is still blue-head tables, floors left to right. this kind of site never verifies anything. dont mix water works and yin marriage in one thread</p>" +
        "<p>locked so you cant reply, can still read. title still has YinDebt in it</p>" +
        "<p>being seen at a grave is kneeling. being seen online is a visit. visits are cheap so the debt moves easy onto someone who never said yes</p>" +
        "<p>thread locked 2013. no replies. can read. shenwan paper shop only says fill the numbers. old people say YinDebt</p>" +
        '<p class="sig">posted 2013-09 · locked · this board has no relation to Classmates</p></div></div>' +
        '<div class="floor"><div class="u"><p>#2</p><p>Passing</p></div><div class="t">' +
        "<p>dont mix the reservoir thing and yin debt in one post. reservoir is numbers. yin marriage is another bill. both went through the Shen house. that does not mean it is the same book.</p></div></div>" +
        '<div class="floor"><div class="u"><p>#3</p><p>deleted</p></div><div class="t">' +
        "<p>that lin kid who got adopted changed surname later. genealogy is clearer than this board. dont doxx people in a teahouse.</p></div></div></div>"
      );
    }
  };

  P["mp-sxl"] = {
    id: "mp-sxl",
    file: "mp-sxl.html",
    no: "23",
    skin: "skin-wechat-mp-article",
    title: "Butou Local - ShenXiulan interview",
    searchable: true,
    searchBody: "ShenXiulan interview paper figures ShenLianshan ShenYizhou local account SiteClosed craft IncenseList",
    grants: ["fact_sxl"],
    html: function (h) {
      return (
        '<div class="article"><h1>Shenwan still makes paper horses: a visit with ShenXiulan</h1>' +
        '<div class="meta"><span class="acct">Butou Local</span>　2016-04-02　{{SEARCH}}</div>{{FLASH}}' +
        "<p>ShenXiulan would not be photographed. She said paper figures come out unlucky on camera. A shop computer sat open on a campus page already marked SiteClosed. She said her son left it. Do not close it.</p>" +
        "<p>Asked about the first generation, she only repeated the name on the shop sign: <strong>ShenLianshan</strong>. She said her father could not read, but he could write a yellow book. Asked about her son ShenYizhou, she said he was outside keeping incense and would come back when it was kept. The interview was 2016. The son left in winter 2011.</p>" +
        "<p>The reporter asked about YinDebt, StandIn, Adoption. She answered all of them: old talk. The shop does craft. The reporter asked why the class public page still ticks. She looked at the screen and said: if people come, <strong>IncenseList</strong> is still there.</p>" +
        "<p>The interview was in a small town eatery. The recording has bowls hitting the table. ShenXiulan called her son gone to keep, called her father the one who opened the house, called the computer do not close. The local account put that stretch in the middle-back.</p>" +
        "<p>She would not admit YinDebt. She spoke of visits on the screen and IncenseList as one thing. Her father's name she would only speak as the three characters on the sign: ShenLianshan. She said she does not read comments.</p>" +
        "<p>When the reporter left, they glanced at the screen. The class page sat on an unsent status. The cursor was still there. ShenXiulan said do not close it. The shop would remake people who did not come back into paper figures. She did not finish that sentence.</p>" +
        "<p>The local account titled it craft inheritance. No photo was released. Mid-body line: if people come, IncenseList is still there.</p>" +
        '<div class="tail">reads 128　likes 0　comments closed　' + h.a("home", "Leave") + "</div></div>"
      );
    }
  };

  P.inbox = {
    id: "inbox",
    file: "inbox.html",
    no: "24",
    skin: "skin-campus-sns-2010",
    title: "Classmates Online - Inbox",
    searchable: true,
    searchBody: "Inbox ChenXiaobei JiangWanqing Spare present link",
    grants: ["lead_inbox"],
    need: ["access_class"],
    html: function (h) {
      return GAME.ui.snsTop(h) + "{{FLASH}}<div class=\"layout\">" + GAME.ui.snsSide(h, "JiangWanqing") +
        '<div class="feed"><h2>Inbox</h2>' +
        '<div class="msg"><span class="name">ChenXiaobei</span> → JiangWanqing　2026-08-12<p>Clicking in means you have seen it. Seeing is not answering present. Present is answering on the roster. If you want to leave, go strike the Spare line.</p></div>' +
        '<div class="msg"><span class="name">ChenXiaobei</span> → JiangWanqing　2014-06-02<p>I am afraid I will not come back from Butou. If my account is still talking, do not believe that is me. Believe YinRegister.</p></div>' +
        '<div class="msg"><span class="name">System</span><p>Sender status: household deceased / account active. This site offers no report button.</p></div>' +
        "<p>Inbox has no read marks and no recall. Clicking in is only seeing. Answering on the roster is present. The 2014 letter tells you to believe YinRegister.</p>" +
        "<p>No outbound permission. The mirror only opens the two letters sent to JiangWanqing.</p>" +
        "<p>Twelve years between the two letters. Day-to-day ChenXiaobei liked to heckle. These two are short.</p>" +
        "</div><div class=\"rail\"><h3>Inbox</h3><p>Only after admin login does the mirror open letters sent to your old account. You have no outbound permission.</p></div></div>";
    }
  };

  P["profile-jwq"] = {
    id: "profile-jwq",
    file: "profile-jwq.html",
    no: "25",
    skin: "skin-campus-sns-2010",
    title: "JiangWanqing's profile",
    searchable: true,
    searchBody: "JiangWanqing Spare 1986 unused Ganggang info present log out",
    grants: ["fact_spare"],
    html: function (h) {
      var extra = h.has("inference_three_layers") || h.has("fact_papers")
        ? '<p>' + h.a("choice", "Open the appendix") + "</p>"
        : "<p>The appendix is not yet open to the current account.</p>";
      return GAME.ui.snsTop(h) + "{{FLASH}}<div class=\"layout\">" + GAME.ui.snsSide(h, "JiangWanqing") +
        '<div class="feed"><div class="profile-head"><div class="ph sq">empty</div><div><h2>JiangWanqing</h2><p>handle: Ganggang　status: <strong>Spare / unused</strong></p></div></div>' +
        "<p>A hidden info field was opened by the mirror. Birth year 1986. Enrolled 2004. Class Class04. Note: YinRegister appendix row 36. Avatar slot empty.</p>" +
        "<p>Status writes Spare / unused. Avatar slot empty.</p>" +
        "<p>Hobbies is an appendix row number. No parent comments. Only the system.</p>" +
        "<p>Spare is the YinRegister appendix status. The profile cannot change it. To change it, go to account handling: answer, or do not answer.</p>" +
        extra +
        "</div><div class=\"rail\"><h3>RecentVisits</h3><p>Not you yet. The system is waiting.</p></div></div>";
    }
  };

  P.forbidden = {
    id: "forbidden",
    file: "forbidden.html",
    no: "26",
    skin: "skin-forbidden",
    title: "No permission",
    searchable: false,
    html: function (h) {
      return (
        '<div class="box"><h2>You do not have permission to view this content</h2>' +
        "<p>Possible reasons: you are not a friend of the owner, or the content was deleted.</p>" +
        "<p>Please go back to home.</p>" +
        "<p>This page does not take permission requests.</p>" +
        '<p><span class="hidden-ink">(none)</span></p>' +
        "{{SEARCH}}" +
        "<p>" + h.a("home", "Back to home") + "　" + h.a("help", "Help") + "</p></div>"
      );
    }
  };

  P["paper-list"] = {
    id: "paper-list",
    file: "paper-list.html",
    no: "27",
    skin: "skin-archive-simsun",
    title: "PaperFigure roster · IncenseList",
    searchable: true,
    searchBody: "IncenseList PaperFigure visits count JiangWanqing ChenXiaobei ShenYizhou roster",
    grants: ["fact_papers"],
    unlocks: ["choice"],
    html: function (h) {
      var gate = h.has("fact_spare") && h.has("fact_sls") && h.has("fact_cxb") && h.has("fact_lin")
        ? '<div class="choice-row"><p>' + h.a("choice", "Open the appendix") + "</p></div>"
        : "<p>The roster is open. The appendix is not yet open to the current account.</p>";
      return (
        '<div class="record">{{FLASH}}<h1>PaperFigure roster</h1>' +
        '<div class="meta"><span>counted as IncenseList</span><span>a visit keeps it</span>{{SEARCH}}</div>' +
        "<p>A PaperFigure has no flesh. Visit counts on Classmates were written by Shenji as <strong>IncenseList</strong>. When IncenseList breaks, the paper figure falls, and the feed in the mirror stops too.</p>" +
        "<table><tr><th>PaperFigure</th><th>Matching account</th><th>IncenseList</th></tr>" +
        "<tr><td>Thirty-third</td><td>ShenYizhou</td><td>nearly gone</td></tr>" +
        "<tr><td>Thirty-fourth</td><td>ChenXiaobei</td><td>ticked once because you opened it</td></tr>" +
        "<tr><td>Thirty-sixth</td><td>JiangWanqing (Spare)</td><td>zero. waiting to answer</td></tr></table>" +
        "<p>Classmates are still looking for you to catch up. Deceased accounts are kept by visits. JiangWanqing's IncenseList is zero, waiting to answer.</p>" +
        "<p>IncenseList is a billing unit. ChenXiaobei's paper figure ticked once. JiangWanqing is still zero.</p>" +
        "<p>PaperFigure numbers line up with YinRegister row numbers. This page uses a serif face.</p>" +
        "<p>If there is an appendix door under the table, you can submit account handling. If there is not, the current account cannot submit yet.</p>" +
        "<p>The shrine committee still has an old company page. Over there the class page is called a digital shrine.</p>" +
        gate + "</div>"
      );
    }
  };

  P["oral-sls"] = {
    id: "oral-sls",
    file: "oral-sls.html",
    no: "29",
    skin: "skin-blog-personal-2008",
    title: "Oral reprint - ShenLianshan",
    searchable: true,
    searchBody: "ShenLianshan oral YinDebt reservoir yellow book first generation paper Dongzhi IncenseList",
    grants: ["fact_sls"],
    html: function (h) {
      return (
        '<div class="top"><h1>Butou oral archive (private reprint)</h1><p>recording lost　text is not testimony</p></div>' +
        '<div class="nav">' + h.a("home", "Leave") + " {{SEARCH}}</div>" +
        "{{FLASH}}<div class=\"wrap\"><article><h2>ShenLianshan oral extract</h2>" +
        '<p class="meta">said to be 1998　reprinter account deleted</p>' +
        "<p>The reservoir year they called me to fill the numbers. I tied twenty-three and sent them in at Dongzhi. I said this is craft. Saving people would be bringing them back to yang. What we do is <strong>YinDebt</strong>: what is owed is an empty on the name list. What is paid is a full on the paper.</p>" +
        "<p>Later my daughter held a yin marriage and was short one answering voice. I did not let her answer with a paper figure. Used a neighboring-village child who was not on any roll. That was the second bill. The third bill should not have gone onto the net. Visits on the net are too cheap. The incense will be fake.</p>" +
        "<p>Whoever writes a living person as Spare is afraid the third bill will break. The debt sits on someone who has not said yes.</p>" +
        "<p>The recording is all paper noise. He said YinDebt is lending being-seen to a name list. Incense at a grave is expensive. Opening a homepage once is cheap, so later people moved IncenseList onto the net. He cursed that cheapness. Then he said cheap is why anyone is willing to keep it.</p>" +
        "<p>He said the third generation taking Classmates into the shop was not something he taught. Whether JiangWanqing answered, this extract does not have.</p>" +
        "<p>Reprinter note: the tape was lost in a move. Only this extract left. YinDebt is the word he kept saying.</p>" +
        "<p>Last half-line of the extract: if Spare switches on, the third bill is connected. The half-line has no subject.</p></article>" +
        "<aside><h3>Reprint note</h3><p>The orange-header blog is only a reprint shell. Recording lost.</p></aside></div>"
      );
    }
  };

  P["mp-local"] = {
    id: "mp-local",
    file: "mp-local.html",
    no: "30",
    skin: "skin-wechat-mp-article",
    title: "Butou Local - after SiteClosed",
    searchable: true,
    searchBody: "SiteClosed 2018 mirror Classmates local account nostalgia",
    grants: ["lead_close"],
    html: function (h) {
      return (
        '<div class="article"><h1>The campus site closed. The Shenwan computer did not</h1>' +
        '<div class="meta"><span class="acct">Butou Local</span>　2019-01-15　{{SEARCH}}</div>{{FLASH}}' +
        "<p>The year Classmates Online went <strong>SiteClosed</strong>, people in the city treated it as a joke. Someone in Shenwan said the shop computer was still logged into the class page, refreshing itself at night.</p>" +
        "<p>The closedown year, the city treated it as a joke. Shenwan did not: the shop computer refreshed itself at night.</p>" +
        "<p>In 2018 the city all treated it as a joke: which site still uses a blue bar. The shop computer was logged into the class page, refreshing itself at night. The local account wrote this as nostalgia.</p>" +
        "<p>The company closed. The Shenwan computer did not.</p>" +
        "<p>Cache can light a dead status bar again. A SiteClosed notice cannot shut the Shenwan computer.</p>" +
        '<div class="tail">' + h.a("help", "Back to Help") + "</div></div>"
      );
    }
  };

  P.genealogy = {
    id: "genealogy",
    file: "genealogy.html",
    no: "31",
    skin: "skin-archive-simsun",
    title: "Shen clan genealogy extract",
    searchable: true,
    searchBody: "LinZhaodi ShenZhaodi Adoption genealogy 1987 yin marriage ShenXiulan",
    grants: ["fact_lin"],
    html: function (h) {
      return (
        '<div class="record">{{FLASH}}<h1>Shen side-branch extract</h1>' +
        '<div class="meta"><span>1987 added page</span><span>copy</span>{{SEARCH}}</div>' +
        "<p>LinZhaodi, young son of the Lin house in a neighboring village, not entered in Lin clan membership. That year ShenXiulan's yin marriage was short a companion. Zhaodi answered present. Afterward, by <strong>Adoption</strong>, entered a Shen side branch, then called ShenZhaodi. The genealogy does not write StandIn. It writes Adoption. The yellow book does not write Adoption. It writes present.</p>" +
        "<p>After coming of age, Zhaodi left Shenwan. The genealogy has no later whereabouts. The third generation does not write this person into the class roster. The class roster is another book.</p>" +
        "<p>LinZhaodi, ShenZhaodi: two registrations for the same person on the genealogy.</p>" +
        "<p>The extract only photocopied half a page. The child has two names. Adoption is on the genealogy. Present is on the yellow book. Whether the grey coat is this person, the genealogy does not have.</p>" +
        "<p>A side branch does not enter the main shrine. The main shrine later kept its record on the net. That old company page on the net writes IncenseList in a notice.</p>" +
        "<p>The genealogy still has a line later people inked out. The inked place is under Zhaodi, as if they meant to write another name. It was not written. Around 1986 Shenwan took in a Spare. That bill does not enter the main genealogy. It enters the yellow-book appendix. The genealogy does not govern the appendix. Not governing is not the same as it never existed. If you want the appendix, you have already seen YinRegister.</p>" +
        "<p>A side branch does not enter the main shrine. Under Zhaodi a line was inked out. The Spare from around 1986 does not enter the main genealogy. It enters the yellow-book appendix.</p></div>"
      );
    }
  };

  P.shrine = {
    id: "shrine",
    file: "shrine.html",
    no: "32",
    skin: "skin-corp-table-2005",
    title: "Shenwan shrine committee",
    searchable: true,
    searchBody: "shrine committee IncenseList Classmates class digital shrine old site",
    grants: ["lead_shrine"],
    html: function (h) {
      var gate = h.has("fact_papers") && h.has("fact_spare")
        ? "<p>" + h.a("choice", "Open the appendix") + "</p>"
        : "<p>The appendix is not yet open.</p>";
      return (
        '<table class="site"><tr><td class="banner" colspan="2">Shenwan shrine committee (stopped)</td></tr>' +
        '<tr><td class="nav" colspan="2">' + h.a("home", "Leave") + "　{{SEARCH}}</td></tr>" +
        '<tr><td class="left"><h4>Notice</h4><p>Physical shrine long unrepaired<br>IncenseList moved onto the net</p></td>' +
        '<td class="main">{{FLASH}}<p>From 2009, the class public page was treated by this committee as a digital shrine. Visits as incense. Status as a prayer text. This committee does not accept the YinDebt telling. It only accepts counts.</p>' +
        "<p>The committee has no government function and no national emblem. This is a 2005-style table site. Notice: IncenseList moved onto the net.</p>" +
        "<p>The notice was written in 2009, nine years before closedown. The class page was still alive then, and they already treated visits as IncenseList. The physical shrine leaked. Tablets went damp. Someone proposed making tablets into accounts. The proposal has no minutes. Only this page is still hanging.</p>" +
        "<p>The appendix door is at the end of the roster, and also on this page.</p>" +
        "<p>The physical shrine leaked. The class page was treated as a digital shrine. Visits as IncenseList.</p>" +
        gate + "</td></tr></table>"
      );
    }
  };

  P.choice = {
    id: "choice",
    file: "choice.html",
    no: "33",
    skin: "skin-archive-simsun",
    title: "Whether to answer",
    searchable: false,
    searchBody: "choice log out take incense present",
    html: function (h) {
      var ready = GAME.meta.endingNeed.every(function (t) { return h.has(t); });
      var body = ready
        ? "<p>You may submit. Log out the account, refuse to answer: paper figures fall by the roster, the class does not write back. Take the incense, take the watch: you become the fourth generation keeping it, and the site keeps writing visits as IncenseList.</p>" +
          '<div class="choice-row"><button type="button" data-choice="logout">Don\'t answer</button>' +
          '<button type="button" data-choice="keep">Take the incense</button></div>'
        : "<p>Account handling is not open. Spare, IncenseList, ChenXiaobei, ShenLianshan, LinZhaodi, ShenZhaodi registrations are not yet complete.</p>";
      return (
        '<div class="record">{{FLASH}}<h1>Whether to answer</h1>' +
        '<div class="meta"><span>account handling</span><span>appendix</span>{{SEARCH}}</div>' +
        "<p>This page publishes no new material. It only asks whether you will answer present.</p>" +
        "<p>Don't answer: strike the Spare, counts to zero. Take the incense: put yourself as admin, leave the mirror open.</p>" +
        "<p>You may go back and read before submitting. After submit, search cannot undo it.</p>" +
        body + "</div>"
      );
    }
  };

  P["ending-a"] = {
    id: "ending-a",
    file: "ending-a.html",
    no: "35",
    skin: "skin-archive-simsun",
    title: "No answer",
    searchable: false,
    html: function (h) {
      return (
        '<div class="record"><h1>No answer</h1>' +
        '<div class="meta"><span>submitted</span><span>no answer</span></div>' +
        "<p>On the profile you struck the Spare line. Visit counts went to zero. ChenXiaobei's last status stopped at send failed. ShenYizhou's space greys out. The grey coat in ZhouTang's album is still there. It no longer refreshes.</p>" +
        "<p>If the computer in the Shenji shop is still on, it should be dark now. The debt is not paid off. It is only no longer under your name. The class group will not write again. You live in the years after SiteClosed, and you are no longer incense for a paper figure.</p>" +
        "<p>The reunion stopped. The shrine stopped incense. The Spare line did not switch on. You refused to answer.</p>" +
        "<p>The blue bar will not follow you. The class group is silent. If the Shenwan computer is still lit, it is only lit. The debt is still in the world. It is no longer on JiangWanqing's row.</p>" +
        "<p>The 1959 numbers, the 1987 answering voice, the 2009 fingerprints are still on other pages. The mirror wrote your row as struck.</p>" +
        "<p>" + h.a("intro", "Back to notes") + "</p></div>"
      );
    }
  };

  P["ending-b"] = {
    id: "ending-b",
    file: "ending-b.html",
    no: "36",
    skin: "skin-campus-sns-2010",
    title: "Take the incense",
    searchable: false,
    html: function (h) {
      return GAME.ui.snsTop(h) + "<div class=\"layout\">" + GAME.ui.snsSide(h, "JiangWanqing") +
        '<div class="feed"><h2>You have taken the watch</h2>' +
        "<p>The class public page changed the admin to JiangWanqing. The feed starts ticking down by your visits. ChenXiaobei's avatar is lit. ShenYizhou's status is still gone to keep the incense, like a handover left for you.</p>" +
        "<p>You are the fourth generation. The site is still blue the way 2010 was blue. The Spare line was changed to on roll. Paper figures still take visits.</p>" +
        "<p>The feed still sounds like classmates talking. Visits still bill. Admin is now JiangWanqing.</p>" +
        "<p>You will see dead avatars light up, and your own visits become incense. App Center is still paused.</p>" +
        "<p>The books sit in the class page, and you keep the watch. The watch has no wage, only visits. Visits feed the paper figures. The paper figures will keep calling you classmate.</p>" +
        "<p>" + h.a("intro", "Back to notes") + "</p></div>" +
        '<div class="rail"><h3>RecentVisits</h3><p>JiangWanqing just now</p><p>ChenXiaobei just now</p></div></div>';
    }
  };
})(GAME.pages);
