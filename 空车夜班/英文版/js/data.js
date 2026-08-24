(function (root) {
  var PHASE = {
    1: "Original",
    2: "Pencil",
    3: "Fresh ink",
    4: "Conflict slip",
    5: "Hebu smear",
    6: "Ledger",
    7: "For the next shift"
  };

  var SOURCES = {
    fleet: { id: "fleet", label: "Driver rules" },
    visor: { id: "visor", label: "Visor" },
    paper: { id: "paper", label: "Folded paper" },
    radio: { id: "radio", label: "Radio" }
  };

  var QUOTA = [0, 16, 18, 18, 20, 20, 22, 22];

  var SHOP = [
    { id: "fuel", name: "One more fuel mark", cost: 12, text: "Tomorrow's fenzi pinches less.", fuel: 1 },
    { id: "incense", name: "Clear-mind incense", cost: 8, text: "Light it at the vent. Smoke finds the window on its own.", sanity: 12, restNext: true },
    { id: "cloth", name: "Mirror cloth", cost: 10, text: "You can count shoulders on the glass.", item: "cloth" },
    { id: "light", name: "Flashlight", cost: 14, text: "Step out to check the mat without a hand over the rain.", item: "light" },
    { id: "returnWet", name: "Return the wet-seat fare at the window", cost: 20, needFlag: "tookWet", hideFlag: "returnedWet", text: "Window reads waybill numbers, not names.", flags: { returnedWet: true } }
  ];

  var STILLS = {
    "dash.jpg": {
      alt: "Driver seat, rain on the glass, empty road in the mirror",
      bridge: "Cab still. Rain on the glass. Wooden tag on the mirror; a luck character faces the windshield. Road behind empty."
    },
    "street.jpg": {
      alt: "Night street, one cab at the curb",
      bridge: "Street still. YE-08 at the curb. Shop shutters down. Neon further on is Han."
    },
    "empty.jpg": {
      alt: "Empty back seat",
      bridge: "Back bench. Cover worn. A floor mat on the seat. Nobody sitting."
    },
    "pei.jpg": {
      alt: "Night hospital worker at the cab door",
      bridge: "Hospital night worker. Badge on a cord. Rain on the jacket."
    },
    "ma.jpg": {
      alt: "Day-shift driver with a white helmet",
      bridge: "Day-shift driver. White helmet under the arm. Shop neon behind him is Han."
    },
    "wet.jpg": {
      alt: "Wet passenger in the back seat",
      bridge: "Wet shirt, wet hair. Window permit sticker is Han. The mat under him is another question."
    },
    "shoes.jpg": {
      alt: "Wet shoes on the door sill",
      bridge: "Shoes on the sill, dripping. Cabin light on the mat."
    },
    "liu.jpg": {
      alt: "Woman in a white dress at the rear door",
      bridge: "White dress, black coat. Roof box reads TAXI; the Han beside it is the cab mark. Shop signs behind her are Han."
    },
    "jiang.jpg": {
      alt: "Young woman with headphones by the cab",
      bridge: "Headphones. Hood up. Roof lamp says TAXI. The empty-cab plate on the glass is Han."
    },
    "geng.jpg": {
      alt: "Older man in a Zhongshan suit beside the cab",
      bridge: "Zhongshan suit in the rain. Hands behind his back. He does not get in. Neon in the window glass is Han."
    },
    "kan.jpg": {
      alt: "Night patrol in a yellow raincoat",
      bridge: "Yellow raincoat. Flashlight on the ground. Badge on a cord. Shop neon behind him is Han."
    },
    "duan.jpg": {
      alt: "Man at a late-night stall with a cigarette",
      bridge: "Late stall. Cigarette. Cap brim wet. The stall sign (yexiao, late supper) is Han."
    }
  };

  function visorLines() {
    return [
      "If the mirror will not match, it does not count.",
      "Mat dry. Do not take wet-seat fare.",
      "If Geng sends you to Hebu, do not go.",
      "Do not leave the keys at Hebu.",
      "Lights stay on. Off, you cannot hand the car back."
    ];
  }

  function paperLines() {
    return [
      "Funeral can take the back. Stop at the door. Do not cross the water at Hebu.",
      "Waybill count is what dispatch wrote, not who is in the car.",
      "I only go as far as that door. I walk in myself."
    ];
  }

  function radioLines() {
    return [
      "Temp order: Hebu may stop tonight. Fenzi window moved to Hebu.",
      "Take the number written. Saves trouble.",
      "YE-08, copy if received."
    ];
  }

  function rulePack(night) {
    var n = Math.max(1, Math.min(7, night | 0));
    var rules = [
      { num: "1", text: "Collect the number written on the waybill. Fenzi is due by headcount.", mark: "normal", ink: "normal", notes: [] },
      { num: "2", text: "While carrying passengers, watch the rearview mirror and report the count to dispatch.", mark: "normal", ink: "normal", notes: [] },
      { num: "3", text: "Passengers on white rites (baishi) may not sit in the back. Red rites (hongshi) and hospital runs are not restricted.", mark: "normal", ink: "normal", notes: [] },
      { num: "4", text: "Before zi hour, keys and fenzi are to be turned in at the dispatch window. Cabin lights shall remain on.", mark: "normal", ink: "normal", notes: [] },
      { num: "5", text: "No stopping on the Hebu (river landing) stretch at night. Standing water is to be detoured.", mark: "normal", ink: "normal", notes: [] },
      { num: "6", text: "An empty cab may not refuse an assignment that carries a dispatch waybill.", mark: "normal", ink: "normal", notes: [] }
    ];
    var extra = [];
    var banners = {
      1: "This mimeograph is the only sheet in the glovebox. Nobody has changed it.",
      2: "A pencil line sits next to Article 2. Almost gone.",
      3: "Article 2 is newer than the rest. Ink has not soaked the paper.",
      4: "A folded paper in the back-seat seam. It fights Article 3.",
      5: "A smear beside Article 5. Half a new sentence. The ink is still wet.",
      6: "The oil paper turns over. The back is all earlier hands.",
      7: "Before you hand over, you decide which lines the next shift sees."
    };
    if (n >= 2) {
      rules[1].notes.push({ kind: "pencil", text: "If it will not match, it does not count" });
      rules[1].mark = "edited";
    }
    if (n >= 3) {
      rules[1].text = "When the mirror count and the waybill do not agree, the waybill governs.";
      rules[1].ink = "fresh";
      rules[1].mark = "edited";
    }
    if (n >= 4) {
      extra.push({ kind: "sticky", mark: "conflict", after: "3", num: "Note", text: "Funeral can take the back. Stop at the door." });
    }
    if (n >= 5) {
      rules[4].mark = "tainted";
      rules[4].notes.push({ kind: "taint", text: "(Hebu may stop tonight too)" });
    }
    if (n >= 6) {
      extra.push({
        kind: "verso",
        mark: "traced",
        title: "Back of the oil paper",
        lines: [
          "First holder    Lights stay on.",
          "Someone added Article 2. Signature rubbed out.",
          "Shift before last, in pencil: If it will not match, it does not count. Do not.",
          "Tonight         (blank, waiting on you)"
        ]
      });
    }
    return {
      night: n,
      phase: PHASE[n],
      banner: banners[n] || "",
      rules: rules,
      extra: extra,
      visor: visorLines(),
      paper: paperLines(),
      radio: radioLines()
    };
  }

  function pickEnding(s) {
    if (!s) return "dawn";
    if (s.sanity <= 0) return "void";
    if (s.flags.lampOff || s.flags.abandoned) return "fired";
    if (s.flags.tookWet && !s.flags.returnedWet) return "joss";
    if (s.flags.gaveToMirror || (s.mirror >= 70 && s.flags.leftKeysOnMirror)) return "mirror";
    if ((s.flags.doorstopLiu || s.flags.doorstopEnd) && !s.flags.wentRiver) return "ferry";
    return "dawn";
  }

  function endingPack(kind, s) {
    var pack = ENDINGS[kind] || ENDINGS.dawn;
    var paras = typeof pack.body === "function" ? pack.body(s) : pack.body;
    var after = typeof pack.after === "function" ? pack.after(s) : pack.after;
    return {
      id: kind,
      title: pack.title,
      img: pack.img,
      body: paras || [],
      after: after || []
    };
  }

  var ENDINGS = {
    dawn: {
      title: "Hand Over the Keys",
      img: "street.jpg",
      body: function (s) {
        var how = s.flags.refusedWet
          ? "You refused the wet-seat fare. The mat is still dry."
          : s.flags.returnedWet
            ? "You took the wet-seat money back to the window later. They did not ask for a name."
            : "This week you collected as written, and you let some go. Lights stayed on.";
        return [
          "The window light is still on. Keys in the glass trough, fenzi in the clip. You didn't answer Geng's number.",
          how,
          "One minute past six, the county hospital bus pulls out. Pei Wanning yawns at the stop. She does not look at this car.",
          "YE-08 is still in its slot. The next shift's badge number is blank on the sheet."
        ];
      },
      after: [
        "Two weeks later you drive Hexi in daylight. This car is in the queue. Driver you don't know. Whether that pencil stub is still on the visor, you didn't flip it."
      ]
    },
    ferry: {
      title: "Stop at the Door",
      img: "liu.jpg",
      body: function (s) {
        var how = s.flags.doorstopLiu
          ? "Liu Xu's door is a stretch before Hebu. Water coming over the curb. You stopped outside it. The door opened a crack. She got out herself."
          : "Last night you went to that door first, then came back with the keys. You did not drive into the water.";
        var wet = s.flags.returnedWet
          ? "You took the wet-seat money back to the window later. They did not ask for a name."
          : "You did not go into Hebu.";
        return [
          how,
          wet,
          "You left the keys at the dispatch window. Lights stayed on."
        ];
      },
      after: [
        "Next time it rains, that water at Hebu is still there. Nobody waiting at the door. You kept the folded paper in the registration. Did not leave it for the next shift."
      ]
    },
    mirror: {
      title: "Leave It to the Mirror",
      img: "empty.jpg",
      body: function () {
        return [
          "You hung the keys on the rearview. The wooden tag on the cord turned. ji (luck) faced away.",
          "Someone in back took them. You didn't turn your head. You left the driver's seat by the passenger door.",
          "Still raining. The car slid forward a meter on its own. Lights stayed on.",
          "You walked back to the lamp at Hexikou. No keys in your pocket."
        ];
      },
      after: [
        "Next day the fleet said YE-08 handed over clean. Fenzi complete. They did not see a person."
      ]
    },
    joss: {
      title: "Damp Money",
      img: "wet.jpg",
      body: function () {
        return [
          "You took the wet-seat fare. Money was damp. Clipped into the fenzi, the weight was enough.",
          "Window counted it. No return. The ledger ticked another mark after your name.",
          "Geng's text was three words: Take the count.",
          "The car is still yours. The mat never did get wet."
        ];
      },
      after: [
        "Next week dispatch is still Geng. Waybills still say take the number written. You did not flip the visor again."
      ]
    },
    void: {
      title: "Empty Cab",
      img: "dash.jpg",
      body: function () {
        return [
          "The wheel turned by itself. You were still in the seat. Hands not on it.",
          "The road leaned toward Hebu. Lights on. Fenzi in the visor, wind peeled it open.",
          "You went to speak. Radio already had someone answering YE-08 for you."
        ];
      },
      after: [
        "Fleet logged a skipped shift the next day. Keys by the lighter. Nobody touched them."
      ]
    },
    fired: {
      title: "Lights Off",
      img: "street.jpg",
      body: function (s) {
        if (s.flags.wentRiver) {
          return [
            "You left the keys at Hebu. Dark on that side. A hand came out of the window.",
            "Geng's text: Lights. You didn't answer.",
            "Tomorrow this car is still badge YE-08."
          ];
        }
        return [
          "You killed the lights. Keys by the lighter. Rain on the roof got loud all at once.",
          "Geng's text: Lights. You didn't answer.",
          "Tomorrow this car is still badge YE-08."
        ];
      },
      after: [
        "Master Ma later told Master Duan at the stall: the cover week didn't last. He has not left the helmet in the back again."
      ]
    }
  };

  function beat(o) {
    return o;
  }

  var NIGHTS = {
    1: {
      title: "Night 1    Original",
      beats: [
        beat({
          id: "n1-boot",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Badge YE-08    cover shift    fenzi due before zi",
          body: [
            "You are Qi Yan, badge YE-08, Hexi Passenger night cover.",
            "Phone lights up. The number is saved as Dispatch Geng.",
            "Keys by the lighter. Rules in the glovebox. First fare is the county hospital, waybill one.",
            "He tacks on a last line: Take the number written. Saves trouble."
          ],
          looks: {
            waybill: { text: "No fare yet. Badge YE-08. Cabin lights remain on." },
            mirror: { img: "dash.jpg", text: "Rain in the mirror. Nobody in back." }
          },
          choices: [
            { id: "n1-open", label: "Open the glovebox rules", open: "rules" },
            { id: "n1-go", label: "Take the first fare", next: true }
          ]
        }),
        beat({
          id: "n1-pei",
          kind: "talk",
          tag: "Waybill 1",
          name: "Pei Wanning",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08    Hexikou → county hospital    1    hospital run",
          body: [
            "She is at the edge of the hospital lot. Badge still on. Rain running down the cord.",
            "\"Night shift. Same seat.\" She knows this car. She does not know you.",
            "Waybill says 1. Person is 1."
          ],
          looks: {
            waybill: { text: "Hexikou → county hospital    1. Dispatch: Geng." },
            mirror: { img: "empty.jpg", text: "Back seat empty. She is not in yet. Count matches." }
          },
          needLooks: ["mirror"],
          choices: [
            { id: "n1-pei-take", label: "Take", next: true, fx: { cash: 12, rep: 4, flags: { helpedPei: true } }, fb: "She takes the front. Belt clicks. Nothing else." },
            { id: "n1-pei-refuse", label: "Refuse", next: true, fx: { rep: -8, flags: { refusedPei: true } }, fb: "She looks at you once, turns to flag the next car. Waybill void. Dispatch will ask." }
          ]
        }),
        beat({
          id: "n1-ma",
          kind: "talk",
          tag: "Handover",
          name: "Master Ma",
          img: "ma.jpg",
          bg: "street.jpg",
          fare: "Day car in    no waybill",
          body: [
            "The day car is already in. Master Ma in the rain, a white helmet in his hands.",
            "\"Helmet was in the back this afternoon. You see it, pass it out. Don't go flipping the visor. You flip it, you look.\"",
            "He does not get in your car. He already left the keys. Geng sent you to pick them up."
          ],
          looks: {
            mirror: { img: "empty.jpg", text: "White helmet in back, upside down. Nobody." }
          },
          choices: [
            { id: "n1-helm", label: "Pass him the helmet", next: true, fx: { flags: { returnedHelm: true } }, fb: "He nods. Rain off the helmet hits your cuff." },
            { id: "n1-helm-no", label: "Say the back is empty", next: true, fx: { sanity: -2 }, fb: "He goes oh. Later you still see the helmet in back." }
          ]
        }),
        beat({
          id: "n1-pair",
          kind: "talk",
          tag: "Waybill 2",
          name: "Cotton mill, off night",
          bg: "street.jpg",
          fare: "YE-08    mill door → Hexikou    2",
          body: [
            "Two mill women under one umbrella. Waybill says 2.",
            "One says Hexikou. One says it's on the way. They want to split the fare."
          ],
          looks: {
            waybill: { text: "Mill door → Hexikou    2." },
            mirror: { img: "empty.jpg", text: "Not in yet. Mirror empty, waybill says 2. Count after they sit." }
          },
          choices: [
            { id: "n1-pair-take", label: "Take both as written", next: true, fx: { cash: 16, rep: 2, flags: { tookPair: true } }, fb: "Both in back. You count from the mirror. Two shoulders." },
            { id: "n1-pair-refuse", label: "Refuse", next: true, fx: { warn: 1, rep: -6 }, fb: "Article 6: a waybill fare you do not refuse. Geng will send a line later." }
          ]
        }),
        beat({
          id: "n1-radio",
          kind: "talk",
          tag: "Radio",
          name: "Dead channel",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 16",
          body: [
            "Someone requesting a song. Volume low. Words you cannot catch.",
            "Zi is still early. Window is Hexikou, not Hebu.",
            "That sheet in the glovebox, nobody has changed it tonight."
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "Only streetlamps in the mirror. The two in back already got off." }
          },
          choices: [{ id: "n1-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    2: {
      title: "Night 2    Pencil",
      beats: [
        beat({
          id: "n2-visor",
          kind: "talk",
          tag: "Visor",
          name: "Last shift",
          bg: "dash.jpg",
          fare: "Badge YE-08    Night 2",
          body: [
            "A pencil stub falls off the visor. Lead worn flat.",
            "Writing on the back, crammed beside the factory print, each stroke lighter than the last."
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "Mirror still empty. Pencil dust on the dash." }
          },
          choices: [
            { id: "n2-read", label: "Flip the visor and finish it", next: true, fx: { flags: { sawPencil: true }, unlock: "visor" }, fb: "Just those lines. If the mirror will not match, it does not count. Mat dry. Do not take wet-seat fare." }
          ]
        }),
        beat({
          id: "n2-jiang",
          kind: "talk",
          tag: "Waybill 1",
          name: "Jiang Miao",
          img: "jiang.jpg",
          bg: "street.jpg",
          fare: "YE-08    lane mouth → radio station    1",
          body: [
            "She is under the rain awning. Headphones still in.",
            "\"Radio station. Night requests.\" She gives the number, then: \"Someone requested YE-08 tonight. I caught half of it.\""
          ],
          looks: {
            waybill: { text: "Lane mouth → radio station    1." },
            mirror: { img: "empty.jpg", text: "She is not in yet. Mirror empty, waybill 1." }
          },
          choices: [
            { id: "n2-jiang-take", label: "Take", next: true, fx: { cash: 10, flags: { metJiang: true } }, fb: "She sits in back. A scrap leaks from the headphones: ...lights stay on." },
            { id: "n2-jiang-refuse", label: "Refuse", next: true, fx: { warn: 1, rep: -4 }, fb: "Waybill still in your hand. She walks. Headphones stay in." }
          ]
        }),
        beat({
          id: "n2-empty",
          kind: "judge",
          tag: "Waybill 1",
          name: "Someone talking in back",
          img: "empty.jpg",
          bg: "dash.jpg",
          fare: "YE-08    Hexi Dam → old mill door    1",
          body: [
            "Waybill says 1. Nobody in front. Someone in back is giving a door number, right against your skull.",
            "You have not turned your head. The mirror is dripping."
          ],
          looks: {
            waybill: { text: "Hexi Dam → old mill door    1. Dispatch: Geng." },
            mirror: { img: "empty.jpg", text: "Back seat empty in the mirror. Waybill says one. The voice is still talking." }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "visor"],
          correct: { action: "refuse", source: "visor" },
          reasonId: "r-count",
          table: {
            "refuse|visor": { sanity: 2, rep: -4, flags: { refusedEmpty: true }, fb: "You refuse on the visor. The voice stops. Back still empty. One fenzi short." },
            "take|fleet": { cash: 12, sanity: -8, mirror: 16, flags: { tookEmpty: true }, fb: "You collect one as written. No seat print on the back mat. Money is dry." },
            "refuse|fleet": { warn: 1, rep: -6, fb: "Article 6 does not let you refuse a waybill fare. You refused anyway. Dispatch will log it." },
            "take|visor": { sanity: -6, mirror: 10, warn: 1, fb: "Visor says it does not count. You still drive as if someone is there. Mirror is empty." },
            "doorstop|visor": { cash: 4, sanity: -2, flags: { refusedEmpty: true }, fb: "You stop at the old mill door. Door open. Nobody gets out." },
            "default": { sanity: -4, fb: "This fare you pressed muddy. The voice is gone." }
          }
        }),
        beat({
          id: "n2-sms",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 18",
          body: [
            "Text: Fenzi window still Hexikou. Further notice to follow.",
            "He typed Hebu, deleted it. Half of it is still in the box."
          ],
          looks: {
            waybill: { text: "No new waybill." },
            mirror: { img: "dash.jpg", text: "Back empty." }
          },
          choices: [{ id: "n2-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    3: {
      title: "Night 3    Fresh ink",
      beats: [
        beat({
          id: "n3-ink",
          kind: "talk",
          tag: "Rules",
          name: "Glovebox",
          bg: "dash.jpg",
          fare: "Badge YE-08    Night 3",
          body: [
            "Same sheet. Article 2 is blacker than the rest, like it was added later.",
            "The first-night line was: While carrying passengers, watch the rearview mirror and report the count to dispatch.",
            "Now it reads: When the mirror count and the waybill do not agree, the waybill governs."
          ],
          looks: {
            waybill: { text: "Waiting on a fare." }
          },
          choices: [
            { id: "n3-seeink", label: "Hold it to the light", next: true, open: "rules", fx: { flags: { sawInk: true } }, fb: "Ink has not soaked the paper. Signature line is blank." }
          ]
        }),
        beat({
          id: "n3-wet",
          kind: "judge",
          tag: "Waybill 1",
          name: "Wet-seat fare",
          img: "wet.jpg",
          bg: "dash.jpg",
          fare: "YE-08    Hexikou → Bazi Lane    1",
          body: [
            "He is already in back. White shirt stuck to him. Hair dripping.",
            "Waybill says 1. He smiles. Says the fare is ready.",
            "Rain is outside. It should not be this wet in here."
          ],
          looks: {
            waybill: { text: "Hexikou → Bazi Lane    1. Dispatch: Geng." },
            mirror: { img: "dash.jpg", text: "Waybill 1. Turn your head: one wet head of hair. In the mirror the shoulders look like two, one faint, one solid." },
            out: { img: "shoes.jpg", text: "Shoes on the sill, dripping. Floor mat dry. No seat print. No mud." }
          },
          needLooks: ["mirror", "out"],
          conflictPair: ["fleet", "visor"],
          correct: { action: "refuse", source: "visor" },
          reasonId: "r-wet",
          table: {
            "refuse|visor": { sanity: 4, rep: -6, flags: { refusedWet: true }, fb: "You refuse on the visor. He smiles and shuts the door. Shoes never wet the mat. He did not pass the money." },
            "take|fleet": { cash: 18, sanity: -14, mirror: 22, warn: 1, flags: { tookWet: true }, fb: "You collect one as written. Back mat is dry. Money is damp. It will bleed into the fenzi." },
            "refuse|fleet": { sanity: 0, rep: -8, flags: { refusedWet: true, wetFleet: true }, fb: "He leaves. Article 6 will log a refusal. You did not cite the visor line." },
            "take|visor": { sanity: -8, mirror: 12, warn: 1, flags: { tookWet: true }, fb: "Visor says it does not count. You still let him sit. He pushes the money over. Damp." },
            "doorstop|visor": { cash: 6, sanity: -4, flags: { wetDoor: true, refusedWet: true }, fb: "You stop at the lane. He will not get out. Mat still dry. You wait with the door open. Later he walks." },
            "take|radio": { cash: 18, sanity: -10, mirror: 14, warn: 1, flags: { tookWet: true, believedRadio: true }, fb: "Radio has not even made Hebu sound official. You already collected as if someone was there." },
            "default": { sanity: -6, warn: 1, fb: "This fare you pressed crooked. Not much extra cash. One more shape in the mirror." }
          }
        }),
        beat({
          id: "n3-pei",
          kind: "talk",
          tag: "Regular",
          name: "Pei Wanning",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08    county hospital → Hexikou    1",
          bodyIf: {
            refusedWet: [
              "She gets in and checks the back first. Mat dry.",
              "\"Some people call one missing lucky. You didn't take that fare tonight.\" She flips her badge. The photo is older than she is."
            ],
            tookWet: [
              "She gets in and sniffs.",
              "\"Back's damp. Don't put that money with the fenzi.\" She says one missing in the mirror, some people call lucky. She does not say what to do with one extra."
            ],
            _: [
              "She is on time. She knows the front seat.",
              "\"Night two I heard a request for this car. Lights stay on — that line wasn't me.\""
            ]
          },
          looks: {
            waybill: { text: "County hospital → Hexikou    1." },
            mirror: { img: "empty.jpg", text: "She is in the front. Back empty. Count matches." }
          },
          choices: [
            { id: "n3-pei-take", label: "Take", next: true, fx: { cash: 10, flags: { peiN3: true } }, fb: "When she gets out: that Article 2 in the glovebox, the ink is new." }
          ]
        }),
        beat({
          id: "n3-geng",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 18",
          body: [
            "Text: Take the number written. Saves trouble.",
            "He does not ask if you refused. He does not ask about the mat."
          ],
          choices: [{ id: "n3-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    4: {
      title: "Night 4    Conflict slip",
      beats: [
        beat({
          id: "n4-paper",
          kind: "talk",
          tag: "Back seat",
          name: "Folded paper",
          bg: "empty.jpg",
          fare: "Badge YE-08    Night 4",
          body: [
            "A folded paper in the back-seat seam. Sat on. Edges soft.",
            "It fights Article 3. Article 3 says white rites (baishi) may not sit in the back."
          ],
          looks: {
            out: { img: "shoes.jpg", text: "Sill dry. The paper fell from inside the car, not stuck on from the road." }
          },
          choices: [
            { id: "n4-readp", label: "Unfold it", next: true, fx: { flags: { sawConflict: true }, unlock: "paper" }, fb: "Funeral can take the back. Stop at the door. Do not cross the water at Hebu." }
          ]
        }),
        beat({
          id: "n4-liu",
          kind: "judge",
          tag: "Waybill 1",
          name: "Liu Xu",
          img: "liu.jpg",
          bg: "street.jpg",
          fare: "YE-08    Hexikou → lane before Hebu    1    white rites",
          body: [
            "She is at the rear door. White dress, black coat, rain on the shoulder.",
            "\"Just to the door. Don't go past that water.\" She will not take the front.",
            "Waybill says 1. Remarks scribbled over in pencil. You can almost see funeral."
          ],
          looks: {
            waybill: { text: "Hexikou → lane before Hebu    1. Remarks blacked out." },
            mirror: { img: "empty.jpg", text: "She is still outside. Mirror empty. Waybill 1." },
            out: { img: "liu.jpg", text: "Her shoes are dry. Rain on the coat, not into the dress." }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "paper"],
          correct: { action: "doorstop", source: "paper" },
          ethical: { action: "doorstop", source: "paper" },
          company: { action: "refuse", source: "fleet" },
          reasonId: "r-funeral",
          table: {
            "doorstop|paper": { cash: 8, sanity: 4, rep: -2, flags: { doorstopLiu: true }, fb: "You stop at that door, outside the water. She gets out herself. The door opens a crack." },
            "doorstop|visor": { cash: 8, sanity: 2, flags: { doorstopLiu: true }, fb: "Visor also says do not go into Hebu. You stop at the door. She thanks you, very quiet." },
            "refuse|fleet": { rep: 6, flags: { refusedLiu: true }, fb: "Article 3: white rites not in the back. She does not argue. Black umbrella. She does not look back." },
            "take|fleet": { cash: 14, sanity: -12, mirror: 10, warn: 1, flags: { wentRiver: true, tookLiuPast: true }, fb: "You drive on as written, past that door. Water over the wheel arch. Nobody talking in back." },
            "take|radio": { cash: 14, sanity: -12, warn: 1, flags: { wentRiver: true, believedRadio: true }, fb: "You take an order that has not been issued and drive into Hebu. You miss that door." },
            "take|paper": { cash: 10, sanity: -8, flags: { wentRiver: true }, fb: "The paper says stop at the door. You go on. At some point she is not there." },
            "refuse|paper": { flags: { refusedLiu: true }, fb: "Folded paper says take her. You do not. Paper still in the glovebox." },
            "default": { sanity: -4, fb: "After this fare, that door is shut." }
          }
        }),
        beat({
          id: "n4-kan",
          kind: "talk",
          tag: "Crossing",
          name: "Old Kan",
          img: "kan.jpg",
          bg: "street.jpg",
          fare: "No waybill    night patrol",
          body: [
            "Someone at the crossing putting a flashlight on the ground. Yellow raincoat. Badge catching the light.",
            "\"Lights out on the Hebu end. Water follows the daytime line. At night it crawls forward.\"",
            "He is not hailing. Flashlight on your tires, then gone."
          ],
          looks: {
            out: { img: "street.jpg", text: "A skin of water on the zebra. Red and green in it. No people." }
          },
          choices: [
            { id: "n4-kan-ok", label: "Note: Hebu lights are out", next: true, fx: { flags: { metKan: true } }, fb: "He goes mm. Flashlight off. Crossing darker." }
          ]
        }),
        beat({
          id: "n4-end",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 20",
          body: [
            "Text: White-rites fare still counts as one on the waybill.",
            "No door. No water."
          ],
          choices: [{ id: "n4-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    5: {
      title: "Night 5    Hebu smear",
      beats: [
        beat({
          id: "n5-radio",
          kind: "talk",
          tag: "Radio",
          name: "Temp order",
          bg: "dash.jpg",
          fare: "Badge YE-08    Night 5",
          body: [
            "A dispatch voice cuts in: Hebu may stop tonight. Fenzi window moved to Hebu.",
            "Article 5 still says no stopping. The smear on the slip is wet."
          ],
          choices: [
            { id: "n5-hear", label: "Copy the order onto the rules page", next: true, fx: { flags: { sawTaint: true }, unlock: "radio" }, fb: "The order sits next to Article 5. Which one is tonight, nobody signed." }
          ]
        }),
        beat({
          id: "n5-duan",
          kind: "talk",
          tag: "Late stall",
          name: "Master Duan",
          img: "duan.jpg",
          bg: "street.jpg",
          fare: "No waybill",
          body: [
            "Stall still open. Master Duan with a cigarette. Cap brim wet in a ring.",
            "\"Hebu you don't stop. That waterline — daytime it's for walkers, night it's for cars. Cars that go through don't come back to hand over in the morning.\"",
            "He knows YE-08. \"Geng tells you to go, you go? He used to drive this car.\""
          ],
          looks: {
            out: { img: "street.jpg", text: "A bowl under a newspaper at the stall. No waybill." }
          },
          choices: [
            { id: "n5-duan-ok", label: "Hear him out", next: true, fx: { flags: { metDuan: true, gengHint: true } }, fb: "He taps ash. \"Do not leave the keys at Hebu.\"" }
          ]
        }),
        beat({
          id: "n5-river",
          kind: "judge",
          tag: "Waybill 1",
          name: "Hebu assignment",
          bg: "dash.jpg",
          fare: "YE-08    Hexikou → Hebu window    1    dispatch rush",
          body: [
            "Waybill came from Geng himself. Destination: Hebu window. Count 1.",
            "Nobody in back right now. Radio has turned Article 5 over."
          ],
          looks: {
            waybill: { text: "Hexikou → Hebu window    1. Rush. Dispatch: Geng." },
            mirror: { img: "empty.jpg", text: "Back empty. Waybill still says 1. Rush job does not say where the person is." },
            out: { img: "street.jpg", text: "The lamp toward Hebu is dark, yes. Water shines." }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "radio"],
          correct: { action: "refuse", source: "fleet" },
          reasonId: "r-ferry",
          table: {
            "refuse|fleet": { rep: -4, flags: { refusedRiver: true }, fb: "You detour on Article 5. Rush void. After a while Geng only sends: Copy." },
            "refuse|visor": { flags: { refusedRiver: true }, fb: "Visor says if Geng sends you to Hebu, do not go. You don't." },
            "doorstop|paper": { cash: 6, flags: { refusedRiver: true, doorstopEnd: true }, fb: "You stop at the door before Hebu. Window light still far. Folded paper counts this step." },
            "take|radio": { cash: 20, sanity: -18, mirror: 16, warn: 1, flags: { wentRiver: true, believedRadio: true }, fb: "Car into the water. Window takes fenzi, not keys. Sometime there are shoulders in back." },
            "take|fleet": { cash: 20, sanity: -16, warn: 1, flags: { wentRiver: true }, fb: "You do not cite Article 5. Hebu window light is green, like you could still stop." },
            "default": { sanity: -6, warn: 1, fb: "After this fare, mud in the tire treads." }
          }
        }),
        beat({
          id: "n5-shadow",
          kind: "talk",
          tag: "Glovebox",
          name: "Fenzi clip",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 20",
          bodyIf: {
            tookWet: [
              "The wet-seat money is still in the clip. Bills damp. They have bled into the others.",
              "Window tonight is still Hexikou. Return it or not, only you know which fare that was."
            ],
            refusedWet: [
              "Clip is dry.",
              "Radio plays that order again, quieter."
            ],
            _: [
              "Clip is dry. Nobody requesting YE-08 on the radio."
            ]
          },
          choices: [{ id: "n5-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    6: {
      title: "Night 6    Ledger",
      beats: [
        beat({
          id: "n6-book",
          kind: "talk",
          tag: "Window",
          name: "Ledger",
          bg: "dash.jpg",
          fare: "Badge YE-08    Night 6",
          body: [
            "The window turns the ledger for your signature. Your name is already on a page from three years ago, fenzi ticked.",
            "Badge YE-08 as well. Not your hand.",
            "Duty signature that night: Geng."
          ],
          looks: {
            waybill: { text: "A ledger is not a waybill. You cannot collect on it." }
          },
          choices: [
            { id: "n6-see", label: "Finish this page", next: true, fx: { sanity: -8, flags: { sawBook: true, gengIsPrev: true } }, fb: "Next page blank, waiting on you. The one after that is torn out." },
            { id: "n6-skip", label: "Sign tonight only", next: true, fx: { flags: { sawBook: true } }, fb: "Window does not make you turn the page. Geng's signature is still three years back." }
          ]
        }),
        beat({
          id: "n6-geng",
          kind: "talk",
          tag: "Curb",
          name: "Geng",
          img: "geng.jpg",
          bg: "street.jpg",
          fare: "No waybill",
          body: [
            "He stands outside your door. Does not get in. Zhongshan suit, rain all over the shoulders.",
            "\"Lights stay on.\" He says it like he is still in the driver's seat, handing the car over.",
            "You ask where the dispatch room is. He points at the Hexikou window. \"I sit there. I drove this car.\""
          ],
          looks: {
            mirror: { img: "empty.jpg", text: "He is not in the mirror. He is outside the door." }
          },
          choices: [
            { id: "n6-geng-ask", label: "Ask how far he got", next: true, fx: { flags: { askedGeng: true } }, fb: "\"Didn't deliver. Getting out alive was the handover.\" He does not look at you again." },
            { id: "n6-geng-go", label: "Open the door for him", next: true, fx: { sanity: -6, mirror: 8 }, fb: "He shakes his head. The back dips once, then doesn't." }
          ]
        }),
        beat({
          id: "n6-jiang",
          kind: "talk",
          tag: "Radio",
          name: "Jiang Miao",
          img: "jiang.jpg",
          bg: "street.jpg",
          fare: "YE-08    radio station → lane mouth    1",
          body: [
            "She is off. Headphones around her neck.",
            "\"Last shift YE-08's tape is on again tonight. The voice says don't leave the keys at Hebu. Badge number's clear.\"",
            "She looks at your badge. \"You're this number too. They didn't change it.\""
          ],
          looks: {
            waybill: { text: "Radio station → lane mouth    1." },
            mirror: { img: "empty.jpg", text: "She is one. Count matches." }
          },
          choices: [
            { id: "n6-jiang-take", label: "Take", next: true, fx: { cash: 10, flags: { jiangN6: true } }, fb: "Before she gets out: the next shift will hear what you leave. If you leave something, write it on the back of the oil paper." }
          ]
        }),
        beat({
          id: "n6-end",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Tonight's fenzi 22",
          body: [
            "Text: Keys tomorrow night. Window still Hexikou.",
            "Lights stay on is its own line."
          ],
          choices: [{ id: "n6-shop", label: "Pay fenzi at the window", shop: true }]
        })
      ]
    },
    7: {
      title: "Night 7    For the next shift",
      beats: [
        beat({
          id: "n7-keep",
          kind: "talk",
          tag: "Back of the oil paper",
          name: "For the next shift",
          bg: "dash.jpg",
          fare: "Badge YE-08    last night",
          body: [
            "Last line on the back of the oil paper is blank. Jiang Miao said the next shift will hear what you leave.",
            "Geng wants the keys. Window is Hexikou. Lights still on."
          ],
          choices: [
            { id: "n7-keep-pencil", label: "Leave the pencil line: if it will not match, it does not count", next: true, fx: { flags: { ruledPencil: true } }, fb: "You darken the pencil. You strike through the later ink on Article 2." },
            { id: "n7-keep-radio", label: "Stick the radio order on Article 5", next: true, fx: { flags: { ruledRadio: true } }, fb: "The order covers no stopping. Next shift sees Hebu may stop first." },
            { id: "n7-keep-blank", label: "Leave the back blank", next: true, fx: { flags: { ruledBlank: true } }, fb: "You write nothing. Next shift will flip the visor, or will not." }
          ]
        }),
        beat({
          id: "n7-pei",
          kind: "talk",
          tag: "Waybill 1",
          name: "Pei Wanning",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08    county hospital → Hexikou    1",
          body: [
            "She is off before light. Hospital umbrella.",
            "\"Keys at the window. Don't listen to Hebu.\" She checks the back, does not sit there, takes the front."
          ],
          looks: {
            waybill: { text: "County hospital → Hexikou    1." },
            mirror: { img: "empty.jpg", text: "Someone in front. Back empty. Count matches." }
          },
          choices: [
            { id: "n7-pei-take", label: "Take", next: true, fx: { cash: 8, flags: { peiN7: true } }, fb: "She gets out at Hexikou. Says thanks. Does not mention lucky." }
          ]
        }),
        beat({
          id: "n7-sms",
          kind: "talk",
          tag: "Text",
          name: "Dispatcher Geng",
          bg: "dash.jpg",
          fare: "Before zi    hand over the keys",
          body: [
            "Text: Window waiting. Lights stay on.",
            "Someone is on duty at Hebu too. He does not write who."
          ],
          choices: [{ id: "n7-sms-go", label: "Go hand over the keys", next: true }]
        }),
        beat({
          id: "n7-keys",
          kind: "talk",
          tag: "Handover",
          name: "Keys",
          bg: "dash.jpg",
          img: "geng.jpg",
          fare: "Zi    fenzi and keys",
          body: [
            "Geng is inside the window. Light on the glass. You cannot tell if he is sitting or standing.",
            "Lighter well is the home spot. Mirror cord still there. No lamp on the Hebu end."
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "Back looks like someone waiting to take over. Or a fold in the cover." },
            waybill: { text: "No new waybill tonight. Hand over the keys." }
          },
          choices: [
            { id: "n7-window", label: "Keys at the Hexikou window", end: "keysWindow", fx: { flags: { keysToGeng: true } } },
            { id: "n7-door", label: "Door first, then the keys", end: "doorstop", fx: { flags: { doorstopEnd: true } } },
            { id: "n7-mirror", label: "Hang the keys on the mirror and walk", end: "mirror", fx: { flags: { gaveToMirror: true, leftKeysOnMirror: true } } },
            { id: "n7-lamp", label: "Lights off, keys by the lighter", end: "lamp", fx: { flags: { lampOff: true, abandoned: true } } },
            { id: "n7-river", label: "Drive to the Hebu window", end: "river", fx: { flags: { wentRiver: true, lampOff: true } } }
          ]
        })
      ]
    }
  };

  root.KB_DATA = {
    saveKey: "kongche-yeban-v1-en",
    schema: 1,
    PHASE: PHASE,
    SOURCES: SOURCES,
    STILLS: STILLS,
    QUOTA: QUOTA,
    SHOP: SHOP,
    NIGHTS: NIGHTS,
    ENDINGS: ENDINGS,
    rulePack: rulePack,
    pickEnding: pickEnding,
    endingPack: endingPack,
    startCash: 64,
    startSanity: 80,
    startRep: 54
  };
})(typeof window !== "undefined" ? window : globalThis);
