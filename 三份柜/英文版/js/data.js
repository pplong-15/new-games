"use strict";
(function (root) {
  var LOCK = "Opened is not proven. Handoff clears the desk. Proven stays.";
  var REJECT_SEEN = "Opened is not proven.";
  var REJECT_EXPORT = "Originals do not leave the shift. Authority stops at recommend.";
  var REJECT_APPROVE = "Temps cannot approve. The books can balance. Balancing is not yours to approve.";
  var REJECT_SCENIC = "A blurb cannot enter a slip.";
  var REJECT_FLAT = "Layer-one totals balancing cannot enter a slip.";
  var LOCK_L2 = "Must already record: cabinet batch does not match yuanjin.";
  var LOCK_L2_SEEN = "Qian Subai does not take “I looked.”";
  var LATE = "Too late tonight. The proven column is still here.";

  var CLAIMS = [
    { id: "claim-same-column", text: "Clinic name and filing name share one field", door: "fang", night: 0 },
    { id: "claim-batch-yuanjin", text: "Cabinet batch does not match yuanjin", door: "gui", night: 1 },
    { id: "claim-three-align", text: "Three copies name the same medicine and the same yuanjin", door: "zhang", night: 1, needL2: true }
  ];

  var REJECT_IDS = ["seen-record", "scenic-blurb", "ledger-flat", "book-empty"];

  var LIMITS = {
    fang: "That field on the prescription squeezes two names. Both are An Huaiyuan. yuanjin (the named gold on the prescription and the empty gold on the cabinet) is there too. Do not clip the original. Do not copy the pairing out.",
    gui: "If the cabinet tag and the purchase order do not match, they do not match. Huo Cheng will sit on it until handoff. Do not try the medicine in the cabinet.",
    zhang1: "Layer-one totals look even. Even is even. Batch is another matter.",
    zhang2: "Layer two needs the cabinet slip written first. Qian Subai does not take “looked.” Temps cannot approve the books.",
    scenic: "The scenic page is busy. Do not copy it onto a slip.",
    book: "Booking is empty. Do not spend the night on numbers.",
    miaoli: "The temple calendar is stuck in the footer. Look if you want.",
    notice: "Pay is by slip. How many copies you opened does not count. Handoff clears the desk. What you wrote stays. Three slips tonight. Cap.",
    public: "Those sheets at the door are busy. Busy does not enter a slip.",
    fees: "The consult-fee detail is clinic flow. It cannot prove a decoction-piece batch."
  };

  var STILL_CAPTIONS = {
    "jpeg/00-open.jpg": "Typed copy of the night desk still: three cabinet doors — prescription, cabinet, ledger. A warm-reminder card: speak softly; close the pages at handoff; originals do not leave the shift.",
    "jpeg/01-fang.jpg": "Typed copy of the prescription still: sitting-hall physician An Huaiyuan, filing name An Huaiyuan, same field. Rp. yuanjin, three qian. Valid today.",
    "jpeg/02-verified.jpg": "Typed copy of the glass notice: sitting-hall name and filing name share one field. Looking is not writing.",
    "jpeg/03-handoff.jpg": "Typed copy of the handoff desk: left column empty. Proven, if written, stays on the right.",
    "jpeg/04-gui.jpg": "Typed copy of the cabinet still: yuanjin row, name neat, production batch blank. Purchase order CGDD-240228, same row empty.",
    "jpeg/05-zhang1.jpg": "Typed copy of ledger layer one: income, outgo, remainder. Cells blank. The blank totals look even.",
    "jpeg/06-zhang2.jpg": "Typed copy of ledger layer two: medicine yuanjin; on the prescription, three qian; cabinet batch empty; destination short.",
    "jpeg/07-submit.jpg": "Typed copy of the hand-over tray: tick proven slips. No tick means not handed over. Cap three.",
    "jpeg/08-ending-a.jpg": "Typed copy of the morning desk: slips taken to check the medicine. Stock in/out was not approved. Originals still in the cabinet.",
    "jpeg/09-ending-b.jpg": "Typed copy of a night that only looked: opened copies do not count. The proven column is what morning will read.",
    "jpeg/10-clock.jpg": "Typed copy of the booking clock: number range 0000–0000. No hour to book. Not duty work."
  };

  function claimLabel(id) {
    var i;
    for (i = 0; i < CLAIMS.length; i++) {
      if (CLAIMS[i].id === id) return CLAIMS[i].text;
    }
    return id;
  }

  function joinLabels(ids) {
    if (!ids || !ids.length) return "";
    var out = [];
    var i;
    for (i = 0; i < ids.length; i++) out.push(claimLabel(ids[i]));
    return out.join("; ");
  }

  function endingA(state) {
    var picked = joinLabels(state.claimsTonight);
    var how = picked
      ? "You ticked out: " + picked + "."
      : "You ticked the closing slip.";
    return [
      how,
      "Morning takes the slips to check the medicine. How many copies you opened they do not count. You hit stock in/out. It did not approve. Originals still in the cabinet.",
      "Pay is by proven slip count. Authority is still recommend."
    ];
  }

  function endingB(state) {
    var verified = joinLabels(state.verified);
    var picked = joinLabels(state.claimsTonight);
    if (state.clock <= 0 && !(state.claimsTonight && state.claimsTonight.length)) {
      return [
        LATE,
        verified ? "The column still holds: " + verified + "." : "The column is empty.",
        "The clock ran out. The slips did not go out. Refresh wipes the night."
      ];
    }
    if (!state.verified.length) {
      return [
        "You wrote nothing. Zero slips is also a hand-over. Pay is zero.",
        "Morning sees an empty column. You did not approve stock in/out. You did not clip an original.",
        "The column is still here. Next night starts from this desk."
      ];
    }
    return [
      "You wrote: " + verified + ". What went out: " + (picked || "empty") + ".",
      "The closing slip was not ticked. Qian Subai will not take tonight as done. Pay is still by what you wrote.",
      "What you did not tick, morning treats as not handed over. Originals still in the cabinet."
    ];
  }

  var SOURCES = [
    { id: "src-fang-today", route: "fang-today", limits: LIMITS.fang, claim: "claim-same-column" },
    { id: "src-fang-head", route: "fang-head", limits: LIMITS.fang, claim: "claim-same-column" },
    { id: "src-fang-body", route: "fang-body", limits: LIMITS.fang, claim: null },
    { id: "src-fang-note", route: "fang-note", limits: LIMITS.fang, claim: null },
    { id: "src-glass", route: "public-glass", limits: LIMITS.fang, claim: null },
    { id: "src-gui-door", route: "gui-door", limits: LIMITS.gui, claim: null },
    { id: "src-gui-tag", route: "gui-tag", limits: LIMITS.gui, claim: null },
    { id: "src-gui-batch", route: "gui-batch", limits: LIMITS.gui, claim: "claim-batch-yuanjin" },
    { id: "src-gui-note", route: "gui-note", limits: LIMITS.gui, claim: null },
    { id: "src-zhang-door", route: "zhang-door", limits: LIMITS.zhang1, claim: null },
    { id: "src-zhang-l1", route: "zhang-l1", limits: LIMITS.zhang1, claim: null, reject: "ledger-flat" },
    { id: "src-zhang-fees", route: "zhang-fees", limits: LIMITS.fees, claim: null, reject: "ledger-flat" },
    { id: "src-zhang-lock", route: "zhang-lock", limits: LIMITS.zhang2, claim: null },
    { id: "src-zhang-l2", route: "zhang-l2", limits: LIMITS.zhang2, claim: "claim-three-align" },
    { id: "src-scenic", route: "scenic", limits: LIMITS.scenic, claim: null, reject: "scenic-blurb" },
    { id: "src-book", route: "book", limits: LIMITS.book, claim: null, reject: "book-empty" },
    { id: "src-book-cal", route: "book-cal", limits: LIMITS.book, claim: null, reject: "book-empty" }
  ];

  var ROUTES = [
    { id: "intro", path: "/intro", foot: "", skin: "intro", title: "Shift instructions", still: "jpeg/00-open.jpg",
      body: "Pick which copy you look at tonight. Read, then handoff. Do not pile the desk. Tick the slips. No tick means not handed over. Refresh wipes the night.",
      html:
        "<p>Anhuaitang, Chengchuan County. Temp week three. Staff ID Cheng-An Beilin 3. Authority stops at recommend.</p>" +
        "<p>Three doors on the wall: prescription, cabinet, ledger. Tonight the prescription lights first. Cabinet and ledger, first night, you only reach the door. After handoff, opened pages go back. Written slips stay on the right.</p>" +
        "<p>Hand-over needs a tick. No tick means zero slips. Zero slips is also a hand-over. Originals do not leave the shift. Hit stock in/out. It will not approve.</p>" +
        "<p>Filing home, booking, scenic — that is the door skin. The search box on the skin is dead. It will not open a new file.</p>"
    },
    { id: "home", path: "/", foot: "", skin: "public", title: "Anhuaitang filing home", still: "jpeg/00-open.jpg",
      body: "Anhuaitang, Chengchuan County. Filing name An Huaiyuan. Booking is the brightest. Tonight’s work is not on the numbers.",
      html:
        "<p class=\"mast-sub\">West Street, Chengchuan County · TCM clinic filing public page</p>" +
        "<p>Filing name of this house: <strong>An Huaiyuan</strong>. Sitting-hall name is the same. Two-bay shopfront. Back cabinet is dry roots and paper boxes.</p>" +
        "<ul class=\"pub-list\">" +
        "<li>Night clinic · please keep your voice down</li>" +
        "<li>Book a number · range starts at zero. You cannot book the desk</li>" +
        "<li>Year-check notice · the plaque is not expired. The window is</li>" +
        "</ul>" +
        "<p class=\"limits\">The public page is busy. It will not enter a slip.</p>"
    },
    { id: "about", path: "/about", foot: "", skin: "public", title: "Clinic brief", still: "jpeg/00-open.jpg",
      body: "Two-bay shopfront on West Street. The sign was painted twice. This page cannot prove a manifestation.",
      html:
        "<p>Two-bay shopfront on West Street. The sign was painted twice. The second time they darkened the character Huai.</p>" +
        "<p>Sitting-hall: An Huaiyuan. Filing also writes An Huaiyuan. He likes to tell inspectors: look. Same field.</p>" +
        "<p>That is the brief. This page does not write “manifestation.”</p>"
    },
    { id: "book", path: "/book", foot: "", skin: "book", title: "Book a number", still: "jpeg/10-clock.jpg",
      body: "Number range starts at zero. You cannot book the desk.", reject: "book-empty",
      html:
        "<p>System notice: no bookable hours now.</p>" +
        "<p>Range 0000–0000. List empty. Dates do not respond.</p>" +
        "<p class=\"limits\">An empty booking calendar is not duty work.</p>"
    },
    { id: "book-cal", path: "/book/cal", foot: "", skin: "book", title: "Empty calendar", still: "jpeg/10-clock.jpg",
      body: "Every date is grey. You cannot hit a day.", reject: "book-empty",
      html: "<p>This month’s cells are all grey. No numbers. No people. No door into the desk.</p>"
    },
    { id: "book-seg", path: "/book/seg", foot: "", skin: "book", title: "Number-range note", still: "jpeg/10-clock.jpg",
      body: "The range is neat. You cannot book the desk.",
      html: "<p>The range is cut by day. Cut neat. It will not reach prescription, cabinet, or ledger.</p>"
    },
    { id: "notice", path: "/notice", foot: "", skin: "desk", title: "Shift notice", still: "jpeg/00-open.jpg",
      body: LOCK + " Tonight hand over three proven slips or fewer. Hand-over needs a tick. Pay is by slip count. Do not take originals off the shift. Do not approve stock in/out.",
      html:
        "<ol>" +
        "<li>Opened is not proven.</li>" +
        "<li>Handoff clears the desk. Proven stays.</li>" +
        "<li>Three slips tonight. The fourth is not taken.</li>" +
        "<li>Pay only takes proven. Zero slips is also a hand-over.</li>" +
        "<li>Originals do not leave the shift. Temps cannot approve stock in/out.</li>" +
        "</ol>" +
        "<p>Rong Mai’s last-shift scrap is still clipped behind the badge.</p>"
    },
    { id: "desk", path: "/desk", foot: "", skin: "desk", title: "Desk", still: "jpeg/00-open.jpg",
      body: "Three doors. Prescription is An Huaiyuan. Cabinet is Huo Cheng. Ledger is Qian Subai. The clock is running. The columns wait for writing.",
      html: "<p>Three doors sit on the still below. Prescription lights first. The clock is running. Left is opened. Right is proven.</p>"
    },
    { id: "desk-payrule", path: "/desk/payrule", foot: "", skin: "desk", title: "Piece-rate terms", still: "jpeg/07-submit.jpg",
      body: "Three slips or fewer. The fourth is not taken. Pay only takes proven. Zero slips is also a hand-over.",
      html: "<p>One slip ¥12. Three-slip cap ¥36. How many copies you opened does not count. Unticked slips, morning treats as not handed over.</p>"
    },
    { id: "desk-badge", path: "/desk/badge", foot: "", skin: "desk", title: "Badge", still: "jpeg/00-open.jpg",
      body: "Wei Xiaotang. Woman. Twenty-seven. Anhuaitang filing temp, Chengchuan County, week three. Staff ID Cheng-An Beilin 3. Authority: recommend.",
      html:
        "<table class=\"badge-table\"><tbody>" +
        "<tr><th>Name</th><td>Wei Xiaotang</td></tr>" +
        "<tr><th>Staff ID</th><td>Cheng-An Beilin 3</td></tr>" +
        "<tr><th>Authority</th><td>recommend</td></tr>" +
        "<tr><th>Note</th><td>Do not approve stock in/out. Do not take originals out the door.</td></tr>" +
        "</tbody></table>"
    },
    { id: "desk-last", path: "/desk/last", foot: "", skin: "note", title: "Last-shift scrap", still: "jpeg/00-open.jpg",
      body: "Rong Mai’s hand. Opened copies go back at handoff. Only what you wrote stays.",
      html:
        "<p>Wei Xiaotang you take it you look at the prescription. Cabinet and ledger tonight don’t force. You open them you still only get the door.</p>" +
        "<p>Opened copies go back at handoff. Only what you wrote stays. I handed over zero once. Pay was zero. Morning didn’t yell I approved the books myself. That’s enough.</p>" +
        "<p class=\"sign\">— Rong Mai. The character dropped. She added one more line: looking does not count.</p>"
    },
    { id: "fang-today", path: "/fang/today", foot: "", skin: "fang", title: "Today's sitting-hall prescription", still: "jpeg/01-fang.jpg",
      body: "The prescription is open. The header field squeezes filing name and sitting-hall name. Both An Huaiyuan. You looked. You did not write. The right column is still empty.",
      claim: "claim-same-column",
      html:
        "<p>Prescription NO 0006812. Valid today.</p>" +
        "<table class=\"rx\"><tbody>" +
        "<tr><th>Sitting-hall physician</th><td>An Huaiyuan</td></tr>" +
        "<tr><th>Filing name</th><td>An Huaiyuan</td></tr>" +
        "<tr><th>Rp.</th><td>yuanjin · three qian</td></tr>" +
        "</tbody></table>" +
        "<p>Two names in one field. Dose column empty. Do not clip the original.</p>"
    },
    { id: "fang-head", path: "/fang/head", foot: "", skin: "fang", title: "Prescription header", still: "jpeg/01-fang.jpg",
      body: "One cell, two names. Both An Huaiyuan. Writing is what enters proven.", claim: "claim-same-column",
      html: "<p>Sitting-hall physician and filing name, printed in the same cell. An Huaiyuan thinks it looks neat. You looked. You did not write. The right column is still empty.</p>"
    },
    { id: "fang-body", path: "/fang/body", foot: "", skin: "fang", title: "Prescription mid-page", still: "jpeg/01-fang.jpg",
      body: "yuanjin, short write. Dose column is there. Originals do not leave the shift.",
      html: "<p>The herbal line is one line: yuanjin, three qian. The pairing was not copied down. This page can prove those two characters sit on the prescription. It cannot prove the cabinet holds this medicine.</p>"
    },
    { id: "fang-note", path: "/fang/note", foot: "", skin: "fang", title: "An Huaiyuan sidebar", still: "jpeg/01-fang.jpg",
      body: "Filing has to look good, he says. Same field, he treats that as enough. He put it in front of you. You still have to write it yourself.",
      html: "<p>“An empty filing field looks ugly, right. I had them put the sitting-hall name in. Same cell. Looks tidy. Write it or don’t. I already put it in front of you.”</p>"
    },
    { id: "public-glass", path: "/public/glass", foot: "", skin: "public", title: "Glass notice", still: "jpeg/02-verified.jpg",
      body: "Same field under the glass. It cannot stand in for writing.",
      html: "<p>A print under the glass. Sitting-hall name and filing name, same field. It shows clear. It cannot write for you.</p>"
    },
    { id: "gui-door", path: "/gui/door", foot: "", skin: "gui", title: "Cabinet door", still: "jpeg/04-gui.jpg",
      body: "Old wood grid. Huo Cheng. First night the cabinet is dark.",
      html: "<p>Old wood grid. Pencil on the door: Huo Cheng. First night this door only lights to the door. After handoff you can turn the tag and the photocopy.</p>"
    },
    { id: "gui-tag", path: "/gui/tag", foot: "", skin: "gui", title: "Cabinet tag", still: "jpeg/04-gui.jpg",
      body: "yuanjin, neat. Batch field penciled darker. Lot number still empty.",
      html:
        "<p>Decoction-piece stock. Cabinet A-2-3.</p>" +
        "<p>The yuanjin row: name neat, production lot blank. The neighbors all have numbers. The cell was darkened. The lot is still empty.</p>"
    },
    { id: "gui-batch", path: "/gui/batch", foot: "", skin: "gui", title: "Purchase-order photocopy", still: "jpeg/04-gui.jpg",
      body: "Photocopy clipped inside the door. Lot numbers gone grey. A mismatch has to become a slip.", claim: "claim-batch-yuanjin",
      html:
        "<p>Purchase order CGDD-240228. The yuanjin row: quantity empty, amount empty. Stock list, same medicine, lot also empty.</p>" +
        "<p>Two sheets side by side. A mismatch is a mismatch. Oral is not a slip.</p>"
    },
    { id: "gui-note", path: "/gui/note", foot: "", skin: "gui", title: "Huo Cheng’s note", still: "jpeg/04-gui.jpg",
      body: "Batch is a mess. He sits on it until after handoff. Oral is not a slip.",
      html: "<p>“I didn’t fill the yuanjin row. Purchase order’s empty too. Don’t ask me where the medicine is. You ask I sit on it till handoff. You write, write it doesn’t match. Don’t write what I said.”</p>"
    },
    { id: "zhang-door", path: "/zhang/door", foot: "", skin: "zhang", title: "Ledger door", still: "jpeg/05-zhang1.jpg",
      body: "White lamp. Ledger desk. Qian Subai. Layer two locked first.",
      html: "<p>White lamp. Ledger desk. Qian Subai is not here. The lock is. Layer one you can turn. Layer two needs the cabinet slip written first.</p>"
    },
    { id: "zhang-l1", path: "/zhang/l1", foot: "", skin: "zhang", title: "Ledger layer one", still: "jpeg/05-zhang1.jpg",
      body: "Totals look even. yuanjin is in the column. Even cannot prove a batch.", reject: "ledger-flat",
      html:
        "<p>Clinic income, outgo, remainder. Cells blank. Totals blank. The blank totals look even.</p>" +
        "<p>Even is even. Batch is another matter. This page cannot enter a slip.</p>"
    },
    { id: "zhang-fees", path: "/zhang/fees", foot: "", skin: "zhang", title: "Consult-fee detail", still: "jpeg/06-zhang2.jpg",
      body: "Clinic flow. It cannot prove a decoction-piece batch.", reject: "ledger-flat",
      html: "<p>Consult-fee detail in the drawer. Names, departments, amounts. No lot number. No yuanjin destination. The flow looks even. The cabinet does not match.</p>"
    },
    { id: "zhang-lock", path: "/zhang/lock", foot: "", skin: "zhang", title: "Layer-two lock", still: "jpeg/05-zhang1.jpg",
      body: LOCK_L2 + " Without that slip, layer two will not open.",
      html: "<p>Must already record: cabinet batch does not match yuanjin. She looked. She still will not take it. Temps cannot approve the books.</p>"
    },
    { id: "zhang-l2", path: "/zhang/l2", foot: "", skin: "zhang", title: "Ledger layer two", still: "jpeg/06-zhang2.jpg",
      body: "Lot number split. Destination short. Medicine still yuanjin. Only after three copies can you write the close.", claim: "claim-three-align",
      html:
        "<table class=\"rx\"><tbody>" +
        "<tr><th>Medicine</th><td>yuanjin</td></tr>" +
        "<tr><th>On the prescription</th><td>three qian</td></tr>" +
        "<tr><th>Cabinet lot</th><td>(empty)</td></tr>" +
        "<tr><th>Destination</th><td>Short write. Not finished</td></tr>" +
        "</tbody></table>" +
        "<p>Three copies, the same two characters: yuanjin. Medicine names match. Batches do not. This page is where you can write the close.</p>"
    },
    { id: "scenic", path: "/scenic", foot: "", skin: "scenic", title: "Scenic brief", still: "jpeg/00-open.jpg",
      body: "Medicine King (Yaowang) birthday, written busy. The cabinet has its season, they say. Qian Subai will not let this enter a slip.", reject: "scenic-blurb",
      html:
        "<p>Medicine King (Yaowang) birthday, west suburb of Chengchuan. Every year the cabinet has its season. Visitors, please give as you wish at the temple.</p>" +
        "<p>County culture-and-tourism copy. Not a basis for clinic stock in/out.</p>"
    },
    { id: "scenic-more", path: "/scenic/more", foot: "", skin: "scenic", title: "Friend-link expand", still: "jpeg/00-open.jpg",
      body: "Season boilerplate. Qian Subai struck half a line. A blurb cannot enter the books.", reject: "scenic-blurb",
      html: "<p>“Season” is a template. Last time Accountant Qian struck “the cabinet keeps yuanjin for offering” halfway and left “the cabinet has its season.” She will not let this page enter a slip.</p>"
    },
    { id: "footer-miaoli", path: "/footer/miaoli", foot: "", skin: "public", title: "Footer temple calendar", still: "jpeg/00-open.jpg",
      body: "The dates in the footer. Look if you want.",
      html: "<p>Medicine King (Yaowang) birthday is written in the fourth month. Those dates are scenic. They do not match tonight’s three slips.</p>"
    },
    { id: "desk-handoff", path: "/desk/handoff", foot: "", skin: "desk", title: "Handoff desk", still: "jpeg/03-handoff.jpg",
      body: "Handoff. Opened clears. Proven stays. Refresh wipes the night.",
      html: "<p>Left is empty. Right, if there are slips, they stay. Cabinet and ledger can be entered now. The clock starts again.</p>"
    },
    { id: "desk-cols", path: "/desk/cols", foot: "", skin: "desk", title: "Columns", still: "jpeg/02-verified.jpg",
      body: "Left: opened. Right: proven. Handoff only clears the left.",
      html: "<p>Hit the sheets on the left. They will not drag into the right. Opened is not proven.</p>"
    },
    { id: "desk-claims", path: "/desk/claims", foot: "", skin: "desk", title: "End-of-shift hand-over", still: "jpeg/07-submit.jpg",
      body: "Tick proven. No tick means not handed over. Cap three. Opened will not drag in.",
      html: "<p>Ticked is what goes out. No tick is zero slips. Zero slips is also a hand-over. Cap three.</p>"
    },
    { id: "desk-pay", path: "/desk/pay", foot: "", skin: "desk", title: "Pay settle", still: "jpeg/07-submit.jpg",
      body: "By proven slip count. One slip ¥12. Three slips ¥36. Stock in/out not approved."
    },
    { id: "public-yujian", path: "/public/yujian", foot: "", skin: "public", title: "Year-check notice print", still: "jpeg/02-verified.jpg",
      body: "Under the glass. Same field reflected. It cannot stand in for the prescription header.",
      html: "<p>The year-check notice prints the filing name large. The same-field shadow sits on the glass. It cannot stand in for the prescription header.</p>"
    },
    { id: "public-year", path: "/public/year", foot: "", skin: "public", title: "Year-check window note", still: "jpeg/00-open.jpg",
      body: "The plaque is not expired. The window is. An Huaiyuan wants filing to look good.",
      html: "<p>The plaque is still up. The window expired last year. An Huaiyuan says tidy the field first. The window can wait for daylight.</p>"
    },
    { id: "public-addr", path: "/public/addr", foot: "", skin: "public", title: "West Street address", still: "jpeg/00-open.jpg",
      body: "Two-bay shopfront. Back cabinet is dry roots and paper boxes.",
      html: "<p>West Street. Two-bay shopfront. Back cabinet is not open to the public. Writing the address onto a slip does nothing.</p>"
    },
    { id: "public-beian", path: "/public/beian", foot: "", skin: "public", title: "About filing", still: "jpeg/00-open.jpg",
      body: "Anhuaitang is this one skin.",
      html: "<p>The filing public page is this one skin. The search box is for show. The box will not open a new file.</p>"
    },
    { id: "search-closed", path: "/search", foot: "", skin: "book", title: "Night search", still: "jpeg/10-clock.jpg",
      body: "The box is dead. It will not open a new file.",
      html: "<p>Night search is closed. The box is still there. Looks good at the door. Go back to the desk and work.</p>"
    },
    { id: "desk-late", path: "/desk/late", foot: "", skin: "desk", title: "Too late", still: "jpeg/10-clock.jpg",
      bodyFn: "late"
    },
    { id: "desk-end-a", path: "/desk/end-a", foot: "", skin: "desk", title: "The door that stays", still: "jpeg/08-ending-a.jpg",
      bodyFn: "A"
    },
    { id: "desk-end-b", path: "/desk/end-b", foot: "", skin: "desk", title: "Only looked", still: "jpeg/09-ending-b.jpg",
      bodyFn: "B"
    }
  ];

  root.SANFEN_DATA = {
    LOCK: LOCK,
    REJECT_SEEN: REJECT_SEEN,
    REJECT_EXPORT: REJECT_EXPORT,
    REJECT_APPROVE: REJECT_APPROVE,
    REJECT_SCENIC: REJECT_SCENIC,
    REJECT_FLAT: REJECT_FLAT,
    LOCK_L2: LOCK_L2,
    LOCK_L2_SEEN: LOCK_L2_SEEN,
    LATE: LATE,
    CLAIMS: CLAIMS,
    REJECT_IDS: REJECT_IDS,
    LIMITS: LIMITS,
    STILL_CAPTIONS: STILL_CAPTIONS,
    SOURCES: SOURCES,
    ROUTES: ROUTES,
    endingA: endingA,
    endingB: endingB,
    joinLabels: joinLabels,
    claimLabel: claimLabel,
    CLOCK_MAX: 1800,
    PAY_EACH: 12,
    CLAIM_CAP: 3,
    PLAYER: "Wei Xiaotang",
    STAFF: "Cheng-An Beilin 3",
    STORE_KEY: "sanfen-cabinet-state-en"
  };
})(typeof window !== "undefined" ? window : global);
