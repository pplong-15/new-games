window.GAME_META = {
  saveKey: "jinque-hall-v1-en",
  totalPages: 36,
  publicPages: ["intro", "home", "films", "hall", "snacks", "help", "search", "forbidden"],
  endingNeed: ["fact_stub", "fact_hou", "fact_lu", "fact_empty", "fact_tian"]
};

window.KEYWORD_TABLE = [
  { queries: ["加映场", "末场灯", "ExtraShow", "LastLamp"], hrefs: ["pages/blog-jiaoying.html", "pages/blog-night.html"], titles: ["Xiaotang's backup log - ExtraShow", "Xiaotang's backup log - that night in the booth"], excerpts: ["ExtraShow is not one more film.", "The booth door was locked from inside. This is a side draft."], opens: ["blog-jiaoying", "blog-night"] },
  { queries: ["金鹊积分", "积分", "Points", "JinquePoints"], hrefs: ["pages/points.html"], titles: ["Jinque member Points"], excerpts: ["Points can only HoldSeat. They will not buy a drink."], opens: ["points"] },
  { queries: ["田麦", "Tianmai"], hrefs: ["pages/space-tianmai.html", "pages/gift.html", "pages/album.html"], titles: ["Tianmai's space", "Member gift record", "Hall group photo"], excerpts: ["Projectionist offline. Go keep the house lamp on.", "Someone mailed the clerk a blank leader.", "One extra person in the back row with no face."], opens: ["space-tianmai", "gift", "album"] },
  { queries: ["留座", "HoldSeat"], hrefs: ["pages/seats.html"], titles: ["HoldSeat list (internal)"], excerpts: ["An empty chair still needs a name."], opens: ["seats"] },
  { queries: ["陆小棠", "LuXiaotang"], hrefs: ["pages/post-lu.html", "pages/mail-lu.html"], titles: ["Lihe Film Fans - who is still watching Credits", "Clerk mailbox"], excerpts: ["I sent the link to Nannan.", "Unread: sit through for me."], opens: ["post-lu", "mail-lu"] },
  { queries: ["场记台", "青石场记", "ContinuityDesk"], hrefs: ["pages/desk.html", "pages/login.html"], titles: ["Qingshi ContinuityDesk · notice", "ContinuityDesk login"], excerpts: ["Registration is closed. Admin comes in under a real name.", "The passphrase is not in the nav."], opens: ["desk", "login"] },
  { queries: ["场记手册", "Handbook"], hrefs: ["pages/handbook.html"], titles: ["Handbook (login required)"], excerpts: ["EmptySeat is more dangerous than a full house."], opens: ["handbook"] },
  { queries: ["空座", "EmptySeat"], hrefs: ["pages/empty-seat.html"], titles: ["EmptySeat rules"], excerpts: ["Until Credits end, someone must be in the seat."], opens: ["empty-seat"] },
  { queries: ["文娱志", "Gazetteer"], hrefs: ["pages/gazetteer.html"], titles: ["Lihe County entertainment Gazetteer excerpt"], excerpts: ["Jinque Video Hall opened in 1987."], opens: ["gazetteer"] },
  { queries: ["老侯", "OldHou"], hrefs: ["pages/obit-hou.html", "pages/oral.html"], titles: ["Jinque Town local account - Hou Changhe", "Old projectionist, oral"], excerpts: ["The year the booth overheated, the boss did not come out.", "Oral is not testimony."], opens: ["obit-hou", "oral"] },
  { queries: ["胶片仓", "FilmVault"], hrefs: ["pages/vault.html"], titles: ["FilmVault inventory"], excerpts: ["One can has no title. Only a seat number."], opens: ["vault"] },
  { queries: ["票根", "Stub"], hrefs: ["pages/ticket.html"], titles: ["Unclaimed Stub"], excerpts: ["Guest clerk: Fang Nanxing."], opens: ["ticket"] },
  { queries: ["放映日志", "ProjectionLog"], hrefs: ["pages/log.html"], titles: ["ProjectionLog 2008–2012"], excerpts: ["ExtraShow has no copy number."], opens: ["log"] },
  { queries: ["字幕", "Credits"], hrefs: ["pages/credits.html"], titles: ["Credits roll"], excerpts: ["The clerk line gets rewritten to someone still alive."], opens: ["credits"] },
  { queries: ["还灯债", "LampDebt"], hrefs: ["pages/forum.html"], titles: ["Lihe Film Fans - LampDebt"], excerpts: ["Someone has to be sitting before the lamp goes out."], opens: ["forum"] },
  { queries: ["洗片间", "Darkroom"], hrefs: ["pages/darkroom.html"], titles: ["Darkroom (out of service)"], excerpts: ["The bath has seen blood. It has also seen names."], opens: ["darkroom"] },
  { queries: ["寻场记", "WantedClerk"], hrefs: ["pages/classified.html"], titles: ["Lihe classifieds - WantedClerk"], excerpts: ["Looking for a stand-in. Not the police."], opens: ["classified"] },
  { queries: ["关站", "ClosedHall"], hrefs: ["pages/mp-close.html"], titles: ["Jinque Town local account - hall closed note"], excerpts: ["The site is still up. The auditorium is locked."], opens: ["mp-close"] },
  { queries: ["来访", "Visitors"], hrefs: ["pages/visitors.html"], titles: ["Recent Visitors (grey)"], excerpts: ["A dead person's icon will still light up."], opens: ["visitors"] },
  { queries: ["包厢", "PrivateRoom"], hrefs: ["pages/paused.html"], titles: ["PrivateRoom booking (paused)"], excerpts: ["This column was never opened."], opens: ["paused"] },
  { queries: ["末班票", "LastTicket"], hrefs: ["pages/choice.html"], titles: ["Unclaimed LastTicket"], excerpts: ["Refund or sit through. Both require the five checks first."], opens: ["choice"] },
  { queries: ["源码", "管理员密码", "Source", "AdminPassword"], forbidden: true, hidden: "The main line is not in the source. Go back to a page you already opened and pull one word." }
];

window.HINTS = [
  { lv: 1, text: "The first word is in the hall home yellow notice. Help repeats it. Search that one word." },
  { lv: 2, text: "The log lays out the house Points rule. The Points page then writes the projectionist's real name. You can search the real name. Do not go looking for a person." },
  { lv: 3, text: "ContinuityDesk needs a login. The account is the projectionist's real name. The passphrase is the whole line in his space comments, not a title word." },
  { lv: 4, text: "Reasoning: ExtraShow needs HoldSeat; OldHou died in the booth; LuXiaotang wrote you in as stand-in; EmptySeat is taboo; Tianmai is the projectionist. The five are Stub, OldHou, LuXiaotang, EmptySeat, Tianmai. Read them, then on the choice page pick refund or sit through." }
];

window.NEAR_LOGIN = [
  { user: "陆小棠", feedback: "That's who sent the link, not the ContinuityDesk admin." },
  { user: "LuXiaotang", feedback: "That's who sent the link, not the ContinuityDesk admin." },
  { user: "Lu Xiaotang", feedback: "That's who sent the link, not the ContinuityDesk admin." },
  { user: "方南星", feedback: "That's your name. The public back office wants the projectionist." },
  { user: "FangNanxing", feedback: "That's your name. The public back office wants the projectionist." },
  { user: "Fang Nanxing", feedback: "That's your name. The public back office wants the projectionist." },
  { user: "老侯", feedback: "The boss is gone. The account still uses the apprentice's name." },
  { user: "OldHou", feedback: "The boss is gone. The account still uses the apprentice's name." },
  { user: "Old Hou", feedback: "The boss is gone. The account still uses the apprentice's name." },
  { pass: "末场灯", feedback: "That's ExtraShow's other name, not the door passphrase." },
  { pass: "LastLamp", feedback: "That's ExtraShow's other name, not the door passphrase." },
  { pass: "留座", feedback: "Close. He said don't get up before Credits end. What counts as finished." },
  { pass: "HoldSeat", feedback: "Close. He said don't get up before Credits end. What counts as finished." },
  { pass: "加映", feedback: "The showing's name isn't the passphrase. Write the whole line from the space comments." },
  { pass: "ExtraShow", feedback: "The showing's name isn't the passphrase. Write the whole line from the space comments." }
];
