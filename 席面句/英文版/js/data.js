"use strict";
(function (root) {
  var WORDS = [
    { id: "w-hcz", surface: "Han Chengzhi", kind: "name", canFill: ["who", "whom"], source: "att-xian", locked: true },
    { id: "w-lqt", surface: "Lin Qiutang", kind: "name", canFill: ["who", "whom"], source: "att-xian", locked: true },
    { id: "w-hss", surface: "Han Shoushan", kind: "name", canFill: ["who", "whom"], source: "att-hetong", locked: true },
    { id: "w-zps", surface: "Zhao Pusheng", kind: "name", canFill: ["who", "whom"], source: "att-hetong", locked: true },
    { id: "w-anqi", surface: "on schedule", kind: "phrase", canFill: ["did"], source: "att-hetong", locked: false },
    { id: "w-yuandang", surface: "open by the original file", kind: "phrase", canFill: ["did"], source: "att-hetong", locked: false },
    { id: "w-fuqin", surface: "father", kind: "duty", canFill: ["whom"], source: "att-weiji", locked: false },
    { id: "w-yuanman", surface: "complete", kind: "phrase", canFill: ["did"], source: "cases-01", locked: false },
    { id: "w-ruqi", surface: "banquet on time", kind: "phrase", canFill: ["did"], source: "cases-02", locked: false },
    { id: "w-dengji", surface: "already registered", kind: "phrase", canFill: ["did"], source: "att-dengji", locked: false },
    { id: "w-jiri", surface: "lucky day must prosper", kind: "herring", canFill: ["did"], source: "join", locked: false },
    { id: "w-yijiaqu", surface: "suitable for marriage", kind: "optional", canFill: ["did"], source: "att-lishu", locked: false },
    { id: "w-xiao", surface: "seeing him once is filial", kind: "phrase", canFill: ["did"], source: "att-qun", locked: false },
    { id: "w-zhengchang", surface: "a normal wedding", kind: "phrase", canFill: ["did"], source: "att-qun", locked: false },
    { id: "w-hunjia", surface: "wedding leave", kind: "phrase", canFill: ["did"], source: "att-jia", locked: false },
    { id: "w-zhuhun", surface: "wedding host", kind: "duty", canFill: [], source: "att-hetong", locked: false },
    { id: "w-banxi", surface: "throw a wedding", kind: "phrase", canFill: ["did"], source: "cases-01", locked: false }
  ];

  function w(id) {
    return '<button type="button" class="word" data-word="' + id + '">' + WORDS.filter(function (x) { return x.id === id; })[0].surface + "</button>";
  }

  var PAGES = [
    { id: "intro", foot: null, skin: "intro", title: "Catalog notice", html:
      '<div class="card"><p>Tong Wanhe, Tongxi Danglin 08. The hall is locked tonight. Before eighteen, one sentence has to go back to the ledger.</p>' +
      '<p>A word on a page is what enters the bag. Who, to whom, does what — three slots full, then send the whole sentence. One slot empty: no judge. The slots will not change color for you.</p>' +
      '<p>The sentence enters the recommend field. Staff ID cannot enter the signature field. Hit approve the banquet. It will not approve.</p>' +
      '<p>Look at the banquet first. Names on the banner can be hit.</p></div>' },
    { id: "home", foot: "01", skin: "site", title: "Tong Jiangxi", html:
      '<h1>Tong Jiangxi</h1><p>Wedding work, Tongjiang County. Banquet, banner, emcee in one chain. Tonight this hall is locked. Past eighteen the contract returns the deposit.</p>' +
      '<p>On duty: Tong Wanhe · Tongxi Danglin 08 · authority recommend. Pay takes a send to the ledger. Oral does not count.</p>' +
      '<p><button type="button" class="go" data-go="menu">Cold plates and drink</button> ' +
      '<button type="button" class="go" data-go="calendar">Menu calendar</button> ' +
      '<button type="button" class="go" data-go="about">About us</button> ' +
      '<button type="button" class="go" data-go="news">Company news</button></p>' },
    { id: "menu", foot: "02", skin: "site", title: "Menu one", html:
      '<h2>Cold plates</h2><p>Braised tongue, sugared lotus root, osmanthus lotus seeds. The banquet is already laid. The menu does not change.</p>' +
      '<p>Kitchen says the tongue has to soak first. Not the sentence card’s business.</p>' +
      '<p><button type="button" class="go" data-go="menu2">Drink</button></p>' },
    { id: "menu2", foot: "03", skin: "site", title: "Menu two", html:
      '<h2>Drink</h2><p>Yellow wine by the jar. Beer by the case. The host house did not change the order.</p>' +
      '<p>Manager Zhao only pushes the hour. He does not ask what they drink.</p>' +
      '<p><button type="button" class="go" data-go="menu3">Schedule note</button></p>' },
    { id: "menu3", foot: "04", skin: "site", title: "Schedule note", html:
      '<p>Hall locked. Banner hung. A date change needs another signing. Another signing has to pass the manager. Tonight there is no time for another signing.</p>' +
      '<p>The original file writes the twenty-second. The ledger prints the same.</p>' +
      '<p><button type="button" class="go" data-go="calendar">Open the month</button></p>' },
    { id: "calendar", foot: "05", skin: "site", title: "Schedule month", html:
      '<p>The twenty-second of the eighth month is circled. A contract is clipped beside the red circle.</p>' +
      '<p><button type="button" class="go" data-go="att-hetong">Open the contract clip</button> ' +
      '<button type="button" class="go" data-go="calendar-aug">August detail</button></p>' },
    { id: "calendar-aug", foot: "06", skin: "site", title: "August detail", html:
      '<p>Banquet date 2026-08-22. Notices that arrive later follow this cell. They do not open another cell.</p>' +
      '<p>The same day has a registration appointment. Civil-affairs paper is clipped behind the detail.</p>' +
      '<p><button type="button" class="go" data-go="att-dengji">Registration appointment</button></p>' },
    { id: "cases", foot: "07", skin: "site", title: "Case list", html:
      '<p>Old cases love on time, complete. That is the invitation voice for outsiders. It cannot drop straight into tonight’s sentence card.</p>' +
      '<p><button type="button" class="go" data-go="cases-01">Case one</button> ' +
      '<button type="button" class="go" data-go="cases-02">Case two</button> ' +
      '<button type="button" class="go" data-go="cases-03">Case three</button> ' +
      '<button type="button" class="go" data-go="cases-04">Case four</button> ' +
      '<button type="button" class="go" data-go="cases-05">Case five</button></p>' },
    { id: "cases-01", foot: "08", skin: "site", title: "Case one", html:
      '<p>The Wang house, year before last. Host house satisfied. The banquet wrote ' + w("w-yuanman") + '. Someone at the emcee desk wrote the noise as ' + w("w-banxi") + '.</p>' +
      '<p>That file had no critical-illness insert. Boilerplate could close a year ago. Tonight the ledger will not take it.</p>' },
    { id: "cases-02", foot: "09", skin: "site", title: "Case two", html:
      '<p>An old file writes ' + w("w-ruqi") + '. The field did not match the hotel letter. They changed the hour once.</p>' +
      '<p>Tonight the contract writes on schedule, not this old-case wording.</p>' },
    { id: "cases-03", foot: "10", skin: "site", title: "Case three", html:
      '<p>Registration belongs to civil affairs. Some people like to write “hence no conflict” on the sentence card. The ledger will not take it.</p>' +
      '<p>The appointment slip is clipped separately. Willing is willing. Whether the hall locks follows the hotel paper.</p>' +
      '<p><button type="button" class="go" data-go="att-dengji">Registration appointment</button></p>' },
    { id: "cases-04", foot: "11", skin: "site", title: "Case four", html:
      '<p>No stacked cells. Red-and-gold boilerplate fills a page. Names match. Dates match.</p>' +
      '<p>No paper corner. No critical-illness notice. Read it as a counter-example.</p>' },
    { id: "cases-05", foot: "12", skin: "site", title: "Case five", html:
      '<p>Cups mouth-down. That night the host house changed the seating. The sentence card grew no new name.</p>' +
      '<p>Not tonight’s Han file.</p>' },
    { id: "join", foot: "13", skin: "site", title: "Franchise", html:
      '<p>Outside slogan: ' + w("w-jiri") + '. That is for pulling agents. Do not write it into the ledger.</p>' +
      '<p><button type="button" class="go" data-go="join-jiri">Open the slogan</button></p>' },
    { id: "join-jiri", foot: "14", skin: "site", title: "lucky day must prosper", html:
      '<p>The poster is this one line. Agent fees are another talk. Not tonight’s Han hall.</p>' },
    { id: "about", foot: "15", skin: "site", title: "About us", html:
      '<p>Tong Jiangxi, east gate of the county seat. Day takes guests. Night locks the hall. The service number is on the front desk. At night it turns to the duty clerk.</p>' +
      '<p>A schedule clerk has no signature right. Manager Zhao Pusheng holds the deposit and the hour.</p>' },
    { id: "desk", foot: "16", skin: "desk", title: "Catalog desk", html:
      '<p>Bag, sentence card, eighteen. Words come from pages already opened. A proper name in a slot: drag it back to the bag before you swap. You cannot cover it.</p>' +
      '<p><button type="button" class="go" data-go="desk-card">Sentence card</button> ' +
      '<button type="button" class="go" data-go="desk-bag">Word bag</button> ' +
      '<button type="button" class="go" data-go="ledger">Ledger</button> ' +
      '<button type="button" class="go" data-go="staff">Training booklet</button> ' +
      '<button type="button" class="go" data-go="desk-lock">Lock-sentence page</button></p>' },
    { id: "desk-card", foot: "17", skin: "desk", title: "Sentence card", html:
      '<p>Who / to whom / does what. One slot empty, the send button stays grey. Fill all three, then send. A wrong sentence will not mark which slot.</p>' +
      '<img src="jpeg/05-card.jpg" alt="Sentence card not full">' +
      '<p class="artifact-translation">Typed copy of the sentence-card still: three slots. Who, to whom, does what. Empty slots. Send stays grey.</p>' },
    { id: "desk-bag", foot: "18", skin: "desk", title: "Word bag", html:
      '<p>Picked words sit in the bag. Han Chengzhi, Lin Qiutang, Han Shoushan, Zhao Pusheng — if they are in a slot, drag them back before you swap.</p>' +
      '<p>Slogans and old-case words can be picked too. They may not be usable.</p>' },
    { id: "desk-reject", foot: "19", skin: "desk", title: "Sent back", html:
      '<p>The whole sentence does not match. You can change it and send again. Pay is still zero. No slot is marked.</p>' +
      '<img src="jpeg/07-reject.jpg" alt="Sent back">' +
      '<p class="artifact-translation">Typed copy of the reject still: the whole sentence does not match. No slot is marked red or green.</p>' +
      '<p><button type="button" class="go" data-go="desk">Back to catalog desk</button></p>' },
    { id: "desk-receipt", foot: "20", skin: "desk", title: "Sent", html:
      '<p>The recommend field is lit. Your staff ID still cannot enter the signature field. The banquet still cannot be approved.</p>' +
      '<img src="jpeg/08-receipt.jpg" alt="Sent to the ledger">' +
      '<p class="artifact-translation">Typed copy of the receipt still: recommend field has a sentence. Signature field has no staff ID.</p>' +
      '<p><button type="button" class="go" data-go="desk-pay">See pay</button></p>' },
    { id: "desk-pay", foot: "21", skin: "desk", title: "Pay", html:
      '<p>Pay ¥36. The text already recorded it. No confirm button. No approve field.</p>' +
      '<img src="jpeg/09-pay.jpg" alt="Pay">' +
      '<p class="artifact-translation">Typed copy of the pay still: ¥36 recorded. No confirm. No approve.</p>' },
    { id: "desk-empty", foot: "22", skin: "desk", title: "Empty card at the hour", html:
      '<p>Eighteen. Card empty. Deposit returned. Pay ¥0.</p>' +
      '<img src="jpeg/10-empty.jpg" alt="Empty card">' +
      '<p class="artifact-translation">Typed copy of the empty-card still: eighteen. Deposit returned. Pay ¥0.</p>' },
    { id: "att-xian", foot: "23", skin: "scan", title: "Banquet still", html:
      '<div class="still-wrap"><img id="still-img" src="jpeg/01-xian.jpg" alt="Banquet">' +
      '<div class="hits">' + w("w-hcz") + w("w-lqt") + '</div></div>' +
      '<p class="artifact-translation">Typed copy of the banquet still: banner Han Chengzhi · newly wed, congratulations · Lin Qiutang. Cups mouth-down. A paper corner under the head table.</p>' +
      '<p>Banner: Han Chengzhi Lin Qiutang newly wed, congratulations. The host house is a pair of newlyweds. Cups mouth-down. Something is under the paper corner of the head table.</p>' +
      '<p>Both names on the banner can be hit. Who you write for the close still has to be checked against the contract and the paper corner. Do not stare only at the double-happiness character.</p>' +
      '<p><button type="button" class="go" data-go="att-xian2">Far view</button> ' +
      '<button type="button" class="go" data-go="att-weiji">Paper corner</button></p>' },
    { id: "att-hetong", foot: "24", skin: "scan", title: "Contract one", html:
      '<img src="jpeg/03-hetong.jpg" alt="Contract">' +
      '<p class="artifact-translation">Typed copy of the contract still: wedding-host field Han Shoushan. Site-confirm stamped. Manager Zhao Pusheng. Mid-page: on schedule. Ledger print: open by the original file.</p>' +
      '<p>' + w("w-zhuhun") + ' field: ' + w("w-hss") + '. Site-confirm field has a stamp. Manager is ' + w("w-zps") + '. He does not sit the wedding-host seat.</p>' +
      '<p>Mid-page: ' + w("w-anqi") + ' to carry out the banquet arrangement. Original file cannot change the date. The ledger prints ' + w("w-yuandang") + '.</p>' +
      '<p>This copy can match household name, wedding host, and the hour. It cannot prove anyone sat the head table tonight.</p>' +
      '<p><button type="button" class="go" data-go="att-hetong2">Next page</button> ' +
      '<button type="button" class="go" data-go="att-lishu">The seam</button> ' +
      '<button type="button" class="go" data-go="ledger">Ledger</button> ' +
      '<button type="button" class="go" data-go="att-han">Hotel letter</button></p>' },
    { id: "att-hetong2", foot: "25", skin: "scan", title: "Contract two", html:
      '<p>Confirm or release before eighteen. Past the hour, deposit returned. Release needs the manager’s sign. A schedule clerk’s sign does not count.</p>' +
      '<p>The insert also has a leave slip. Not the contract body.</p>' +
      '<p><button type="button" class="go" data-go="att-han">Hotel letter</button> ' +
      '<button type="button" class="go" data-go="att-jia">Leave slip</button></p>' },
    { id: "att-jia", foot: "26", skin: "scan", title: "Leave slip", html:
      '<p>The workplace approved ' + w("w-hunjia") + ' as a wedding. Not nursing leave. Leave starts on the twenty-second. No sickbed written.</p>' +
      '<p>The slip can prove Chengzhi took wedding leave. It cannot prove the person in the ward nodded.</p>' +
      '<p><button type="button" class="go" data-go="att-qun">Family group</button></p>' },
    { id: "att-dengji", foot: "27", skin: "scan", title: "Registration appointment", html:
      '<p>Civil affairs only takes two people willing. The appointment slip can be picked as ' + w("w-dengji") + '.</p>' +
      '<p>Registration is not opening the banquet. Whether the hall locks follows the hotel contract.</p>' },
    { id: "att-weiji", foot: "28", skin: "scan", title: "Critical-illness scan", html:
      '<img src="jpeg/04-weiji.jpg" alt="Critical-illness notice">' +
      '<p class="artifact-translation">Typed copy of the critical-illness still: title field father. Date 2026-08-22, same day as the banquet. Patient name blank. No personal nod on the sheet.</p>' +
      '<p>Title field writes ' + w("w-fuqin") + '. Critical 2026-08-22, same day as the banquet.</p>' +
      '<p>Patient name is blank. The field has no personal nod. This paper can prove title and date stacked. It cannot prove the person is already gone.</p>' +
      '<p><button type="button" class="go" data-go="att-qun">Family group</button></p>' },
    { id: "att-qun", foot: "29", skin: "scan", title: "Family group", html:
      '<p>Chengzhi: papers done, hotel on schedule, father ' + w("w-xiao") + '.</p>' +
      '<p>Qiutang: I want ' + w("w-zhengchang") + '. Two minutes later she changed it: fine. I know.</p>' +
      '<p>The group is still talking about tonight’s banquet. These lines cannot stand in for the wedding host’s sign.</p>' +
      '<p><button type="button" class="go" data-go="att-jia">Leave slip</button></p>' },
    { id: "att-lishu", foot: "30", skin: "scan", title: "Almanac", html:
      '<p>Half a page in the contract seam. The yellow calendar prints ' + w("w-yijiaqu") + '. Suitable/avoided is folk belief, not a hotel clause.</p>' +
      '<p>The twenty-second is suitable for marriage. That is not the same book as the critical-illness notice.</p>' },
    { id: "att-han", foot: "31", skin: "scan", title: "Hotel letter", html:
      '<p>Pusheng pushes perform or release. Hour passes, deposit returns. He does not ask about the ward. He does not sit the wedding-host seat.</p>' +
      '<p>The letter has the manager’s name. The wedding host is still that field on the contract.</p>' },
    { id: "ledger", foot: "32", skin: "desk", title: "Ledger", html:
      '<p>Original file cannot change the date. It prints ' + w("w-yuandang") + '.</p>' +
      '<p>Recommend field empty. Tonight’s fill is this one sentence. The ledger does not take an approval.</p>' },
    { id: "staff", foot: "33", skin: "desk", title: "Training booklet", html:
      '<p>Check the date. Check the names. Tonight hand in this one sentence. Recommend field can take it. Signature field cannot.</p>' +
      '<p>The wedding host is not the manager. Two names on the banner. The close sentence has to face the person in the host house who decides to open the banquet. Do not fill it against the double-happiness character.</p>' +
      '<p>Incomplete. No judge. Do not look for right/wrong color on the slots.</p>' },
    { id: "news", foot: "34", skin: "site", title: "Company news", html:
      '<p>East hall changed the curtain. August has no new schedule notice.</p>' +
      '<p>Last year one file changed the date. They fought until the deposit returned. This year’s contract printed “date cannot change” dead.</p>' },
    { id: "desk-lock", foot: "35", skin: "desk", title: "Lock-sentence page", html:
      '<p>Hand in this one sentence tonight. A recommend can be sent. The approve field does not have your staff ID.</p>' +
      '<p>Eighteen passes, an empty card goes as a release. Deposit returned. Pay zero.</p>' },
    { id: "att-xian2", foot: "36", skin: "scan", title: "Banquet far view", html:
      '<p>Head table. Cups mouth-down. Paper corner goes to the critical-illness page. The far view does not show the wedding host’s seat card.</p>' +
      '<p>This frame can show the banquet was laid. It cannot show whether the person in the ward came.</p>' +
      '<p><button type="button" class="go" data-go="att-weiji">Paper corner</button></p>' }
  ];

  root.XIMIAN_DATA = {
    STAFF_ID: "Tongxi Danglin 08",
    PLAYER: "Tong Wanhe",
    LOCK: "Hand in this one sentence tonight. The sentence is a recommend, not an approval.",
    CLOCK_MAX: 600,
    AUTHORITY: "recommend",
    WORDS: WORDS,
    PAGES: PAGES,
    CORRECT: { who: ["w-hcz"], whom: ["w-hss", "w-fuqin"], did: ["w-yuandang", "w-anqi"] }
  };
})(typeof window !== "undefined" ? window : global);
