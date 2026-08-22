const ITEMS = {
  tea:     { name: "Iced tea",    price: 4,  cost: 2,  desc: "Cold" },
  noodles: { name: "Braised-beef noodles", price: 6,  cost: 3,  desc: "Add hot water" },
  water:   { name: "Bottled water",    price: 2,  cost: 1,  desc: "Always stock" },
  bread:   { name: "Tear bread",  price: 5,  cost: 2,  desc: "Soft ones" },
  cigs:    { name: "Hongtashan",    price: 18, cost: 12, desc: "Wang only smokes these" },
  incense: { name: "Sandalwood incense",      price: 8,  cost: 4,  desc: "Box in the corner" },
  battery: { name: "AA batteries",  price: 12, cost: 6,  desc: "For the flashlight" },
  milk:    { name: "Plain milk",    price: 6,  cost: 3,  desc: "Auntie Lin every time" },
  candle:  { name: "Candles",      price: 3,  cost: 1,  desc: "For outages" },
};

const UPGRADES = {
  cam:     { name: "Counter cam", price: 68, desc: "Playback misses it. It sits on the counter anyway." },
  peach:   { name: "Peachwood charm", price: 48, desc: "Hang it. You sleep a little." },
  light:   { name: "Better tube", price: 42, desc: "Stops the flicker. You can see faces." },
  catfood: { name: "Bag of cat food", price: 20, desc: "Ugly eater. Still eats." },
};

const RULES = [
  ["1", "Lights stay on. All night."],
  ["2", "Take whatever they pay. Don't pick."],
  ["3", "Nobody goes in the back room."],
  ["4", "If the cat blocks someone, don't make them stay."],
  ["5", "Don't count joss paper before dawn."],
];

const IMG = {
  exterior: "assets/image-13.jpg",
  interior: "assets/image-14.jpg",
  cat: "assets/image-03.png",
  wang: "assets/image-04.png",
  lin: "assets/image-05.png",
  wet: "assets/image-06.png",
  bai: "assets/image-07.png",
  old: "assets/image-08.png",
  taxi: "assets/image-09.png",
  wu: "assets/image-10.png",
  zhou: "assets/image-11.png",
};

function hasStock(s, need) {
  return Object.entries(need || {}).every(([k, n]) => (s.stock[k] || 0) >= n);
}

function takeStock(s, need) {
  Object.entries(need || {}).forEach(([k, n]) => { s.stock[k] -= n; });
}

function needLabel(need) {
  return Object.entries(need || {}).map(([k, n]) => {
    const name = (ITEMS[k] && ITEMS[k].name) || k;
    return n > 1 ? `${name}×${n}` : name;
  }).join(", ");
}

function sell(s, need, money) {
  takeStock(s, need);
  s.cash += money;
  s.lastSale = money;
  s.lastSold = need;
  s.nightSell = (s.nightSell || 0) + money;
}

function clamp(s) {
  s.sanity = Math.max(0, Math.min(100, s.sanity));
  s.rep = Math.max(0, Math.min(100, s.rep));
  s.cat = Math.max(0, Math.min(100, s.cat));
  s.cash = Math.max(0, s.cash);
}

function missStock(s, lostYen) {
  s.flags.stockouts = (s.flags.stockouts || 0) + 1;
  s.flags.missedTonight = (s.flags.missedTonight || 0) + 1;
  s.flags.shelfEmpty = true;
  s.flags.disappointedAid = true;
  const loss = Math.max(8, lostYen | 0);
  s.nightMissLoss = (s.nightMissLoss || 0) + loss;
  s.rep -= 10;
  s.sanity -= 5;
  if ((s.flags.stockouts || 0) >= 2) s.flags.aidBlocked = true;
}

function emptyShelfBeat(s) {
  if (!s.flags.stockouts) return null;
  return {
    scene: "interior", name: "Empty shelf", tag: "Gap", time: 23 * 60 + 8,
    text: s.flags.stockouts >= 3
      ? "The gap faces the light. You counted. Rows missing. The tube popped. Something like a person stood in the hole, looking at stock. You look again. Nobody. The mat is wet."
      : "The empty shelf still has last night's gap. Light hits it. More shadow than goods. You keep thinking someone is standing in the noodle row, waiting for you to fill it.",
    choices: [
      { label: "Turn the lights up", do: (st) => { st.sanity -= 2; } , then: "Brighter. Still empty. Rain hasn't stopped." },
      { label: "Don't look at the gap", do: (st) => { st.sanity -= 3; }, then: "You don't. It's still there in the corner of your eye." },
    ],
  };
}

function camChoice(flag, text) {
  return {
    label: "Check the cam",
    showIf: (st) => st.upgrades.cam,
    do: (st) => { st.flags[flag] = true; },
    then: text,
  };
}

const RULE_PHASE = {
  1: "Original",
  2: "Pencil",
  3: "Ink mismatch",
  4: "Rule clash",
  5: "Taint",
  6: "Lineage",
  7: "Call",
};

function nightRules(n) {
  const night = Math.max(1, Math.min(7, n | 0));
  const rules = RULES.map(([num, text]) => ({
    num,
    text,
    mark: "normal",
    ink: "normal",
    notes: [],
  }));
  const extra = [];
  const banners = {
    1: "",
    2: "A pencil line by Rule 2, faint enough to miss.",
    3: "Rule 2's ink is newer. It hasn't soaked into the paper.",
    4: "A sticky note on the corner. The writing fights Rule 3.",
    5: "A smear beside Rule 5. Half a new sentence. Ink still wet.",
    6: "The oil paper flips. The back is all previous hands.",
    7: "Before you hand off, you decide which lines the next shift sees.",
  };
  if (night >= 2) {
    rules[1].mark = "edited";
    rules[1].notes.push({ kind: "pencil", text: "Joss paper doesn't count" });
  }
  if (night >= 3) {
    rules[1].mark = "edited";
    rules[1].ink = "fresh";
  }
  if (night >= 4) {
    extra.push({
      kind: "sticky",
      mark: "conflict",
      after: "3",
      num: "Note",
      text: "If a customer asks for the back room, let them in.",
    });
  }
  if (night >= 5) {
    rules[4].mark = "tainted";
    rules[4].notes.push({ kind: "taint", text: "(You can count it before dawn)" });
  }
  if (night >= 6) {
    extra.push({
      kind: "verso",
      mark: "traced",
      title: "Back of the oil paper",
      lines: [
        "First shift  Heng     keep the lamp on.",
        "Someone added Rule 2. The signature was rubbed out.",
        "The last shift wrote in pencil: joss paper doesn't count. Don't.",
        "Tonight     (blank, waiting for you)",
      ],
    });
  }
  return {
    night,
    phase: RULE_PHASE[night],
    banner: banners[night] || "",
    rules,
    extra,
  };
}

function jossSanityCost(s, lookedName) {
  const saw = !!(s && s.flags && s.flags.sawPencilNote);
  if (lookedName) return saw ? 8 : 18;
  return saw ? 4 : 14;
}

function defaultKeptRules() {
  return { "1": true, "2": true, "3": true, "4": true, "5": true, sticky: true };
}

function ensureKeptRules(s) {
  if (!s.flags.keptRules) s.flags.keptRules = defaultKeptRules();
  return s.flags.keptRules;
}

function adjudicateRules(s, kind) {
  s.flags.adjudicatedRules = true;
  s.flags.ruledForNext = kind;
  const bag = defaultKeptRules();
  if (kind === "dropTrap") {
    bag["2"] = false;
    bag.sticky = false;
  } else if (kind === "fixFive") {
    bag.fixFive = true;
  } else if (kind === "blank") {
    Object.keys(bag).forEach((k) => { bag[k] = false; });
  }
  s.flags.keptRules = bag;
}

function markRulesSeen(s) {
  if (!s || !s.foundRules) return;
  const pack = nightRules(s.night);
  if (!s.flags) s.flags = {};
  if (pack.rules.some((r) => r.notes.some((n) => n.kind === "pencil"))) s.flags.sawPencilNote = true;
  if (pack.rules.some((r) => r.ink === "fresh")) s.flags.sawInkDiff = true;
  if (pack.rules.some((r) => r.mark === "tainted")) s.flags.sawTaintNote = true;
  if (pack.extra.some((e) => e.kind === "sticky")) s.flags.sawConflictNote = true;
  if (pack.extra.some((e) => e.kind === "verso")) s.flags.sawRuleLineage = true;
}

function powerBillFor(n) {
  const table = { 1: 20, 2: 25, 3: 30, 4: 35, 5: 40, 6: 60, 7: 30 };
  const night = Math.max(1, Math.min(7, n | 0));
  return table[night];
}

function nightTurnover(s) {
  const sold = (s && s.nightSell) || 0;
  const penalty = 8 * ((s && s.flags && s.flags.missedTonight) || 0);
  return Math.max(0, sold - penalty);
}

function applyPowerBill(s) {
  const bill = s.powerBill != null ? s.powerBill : powerBillFor(s.night);
  s.powerBill = bill;
  const turn = nightTurnover(s);
  const met = turn >= bill;
  s.flags.powerMet = met;
  s.flags.powerFailedLast = !met;
  if (met) {
    s.powerMissStreak = 0;
    s.flags.lampUnstable = false;
  } else {
    s.powerMissStreak = (s.powerMissStreak || 0) + 1;
    s.flags.lampUnstable = true;
    let drain = s.powerMissStreak >= 2 ? 12 : 8;
    if (s.upgrades && s.upgrades.light) drain = Math.max(4, drain - 3);
    s.sanity -= drain;
    if (s.powerMissStreak >= 2) s.flags.powerOut = true;
  }
  return met;
}

function rollNight5Weather(s) {
  if (!s || s.night !== 5) return (s && s.weather) || "";
  if (s.weather === "storm" || s.weather === "clear") return s.weather;
  s.weather = Math.random() < 0.7 ? "storm" : "clear";
  s.flags.stormNight = s.weather === "storm";
  return s.weather;
}

function newState() {
  return {
    night: 1,
    time: 22 * 60,
    cash: 42,
    sanity: 82,
    rep: 48,
    cat: 26,
    stock: { tea: 0, noodles: 0, water: 1, bread: 0, cigs: 0, incense: 1, battery: 0, milk: 0, candle: 1 },
    flags: {},
    upgrades: { cam: false, peach: false, light: false, catfood: false },
    closedEarly: 0,
    foundRules: false,
    nightEarn: 0,
    nightBuy: 0,
    nightSell: 0,
    lastSale: 0,
    lastSold: null,
    powerBill: 20,
    powerMissStreak: 0,
    weather: "",
    nightMissLoss: 0,
    clues: [],
    clueLinks: [],
    truths: [],
    role: "clerk",
  };
}

function catLine(s) {
  if (s && s.role === "cat") {
    if (s.flags && s.flags.catJumped) return "You're already on the till. Too soon.";
    if (s.flags && s.flags.catBlockedWet) return "You lick a paw. That smell is still in the doorway.";
    return "You watch the glass door. An ear ticks.";
  }
  if (s.cat >= 70) return "The cat bumps your wrist with its head.";
  if (s.flags.soldJoss) return "It stares at the till and makes a noise in its throat.";
  if (s.sanity < 35) return "The cat sits on the scanner and blocks your hand.";
  if (s.upgrades.catfood) return "It yawns wide. Tail flicks the receipt.";
  return "The yellow cat watches the door. Ear ticks. Ticks back.";
}

const CAT_EYE_ALIVE = "Cat's eyes half-shut, tail loose. Living.";
const CAT_EYE = {
  wet:  { kind: "unquiet", text: "His hair is dripping. The cat can't smell water." },
  bai:  { kind: "unquiet", text: "The cat looks at her feet. No shadow there." },
  old:  { kind: "unquiet", text: "The cat nods at him first, like they go way back." },
  lin:  { kind: "alive", text: CAT_EYE_ALIVE },
  wang: { kind: "alive", text: CAT_EYE_ALIVE },
  wu:   { kind: "alive", text: CAT_EYE_ALIVE },
  taxi: { kind: "alive", text: CAT_EYE_ALIVE },
  zhou: { kind: "alive", text: CAT_EYE_ALIVE },
};

function catEyeFor(beat) {
  if (!beat || beat.type) return null;
  const p = beat.portrait;
  if (p && CAT_EYE[p]) return CAT_EYE[p];
  const name = beat.name || "";
  if (name.indexOf("Wet-Hair") >= 0) return CAT_EYE.wet;
  if (name.indexOf("White-Dress") >= 0 || name === "Xiao Ya") return CAT_EYE.bai;
  if (name.indexOf("Zhongshan") >= 0) return CAT_EYE.old;
  if (name.indexOf("Auntie Lin") >= 0) return CAT_EYE.lin;
  if (name.indexOf("Delivery Wang") >= 0) return CAT_EYE.wang;
  if (name.indexOf("Guard Wu") >= 0) return CAT_EYE.wu;
  if (name.indexOf("Taxi Chen") >= 0) return CAT_EYE.taxi;
  if (name.indexOf("Zhou Xiaowan") >= 0) return CAT_EYE.zhou;
  if (name.indexOf("Rain-Soaked") >= 0) return { kind: "alive", text: CAT_EYE_ALIVE };
  if (name === "You") return { kind: "unquiet", text: "The cat sniffs you behind the counter. Your smell, and a little incense ash. Ears flatten." };
  if (name === "Doorbell") return { kind: "unquiet", text: "The face on the glass has no scent. The cat puts an ear to the door. It doesn't move." };
  if (name === "Shop cat") return { kind: "alive", text: "It pushes the broken incense aside. Nostrils twitch. Doesn't look at you again." };
  return null;
}

function catBlockChoice(beat) {
  if (!beat || beat.type) return null;
  const p = beat.portrait;
  const name = beat.name || "";
  const wet = p === "wet" || name.indexOf("Wet-Hair") >= 0;
  const bai = p === "bai" || name.indexOf("White-Dress") >= 0 || name === "Xiao Ya";
  const old = p === "old" || name.indexOf("Zhongshan") >= 0;
  const door = name === "Doorbell";
  if (!wet && !bai && !old && !door) return null;
  if (wet) {
    return {
      label: "Block the door for the cat",
      catOpt: true,
      showIf: (st) => !!st.catView,
      do: (st) => {
        st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
        st.flags.catAlienated = true;
        st.flags.catBlockedWet = true;
        st.flags.blockedWet = true;
        st.flags.refusedWet = true;
        st.cat -= 8;
      },
      then: "You stand on the mat for it. The cat doesn't look at him. It looks at you. Ears go flat. The man backs into the rain. Rain still falling. His back dries first.",
    };
  }
  if (bai) {
    return {
      label: "Block her for the cat",
      catOpt: true,
      showIf: (st) => !!st.catView,
      do: (st) => {
        st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
        st.flags.catAlienated = true;
        st.flags.catBlockedBai = true;
        st.flags.baiDenied = true;
        st.cat -= 8;
      },
      then: "You stand at the counter edge. She glances at the cat. The cat doesn't move. It watches your hand. Ears flatten. She steps back to the door. '...fine.' Skirt still dry.",
    };
  }
  if (old) {
    return {
      label: "Block him for the cat. Don't let him put that stack down",
      catOpt: true,
      showIf: (st) => !!st.catView,
      do: (st) => {
        st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
        st.flags.catAlienated = true;
        st.flags.catBlockedOld = true;
        if (!st.flags.soldJoss) st.flags.refusedJoss = true;
        st.cat -= 10;
      },
      then: "You put a hand on the till. The old man looks at the cat. The cat didn't stop him—it stopped you. It jumps off the counter. Tail doesn't brush you. 'You're calling it, then.' He takes the stack back. 'Then it won't referee.'",
    };
  }
  return {
    label: "Hold the door for the cat",
    catOpt: true,
    showIf: (st) => !!st.catView,
    do: (st) => {
      st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
      st.flags.catAlienated = true;
      st.flags.knockedWu = true;
      st.cat -= 8;
    },
    then: "You hold the lock for it. The cat doesn't block the door. It blocks your wrist. Ears flatten. It jumps aside. The face outside backs into the rain on its own.",
  };
}

const CAT_MEMORIES = [
  { id: "n1", night: 1, title: "Mat", text: "The cat has smelled the mat. Living people come in: mat goes damp. The wet-hair one stands on it: mat stays dry." },
  { id: "n2", night: 2, title: "Shadow", text: "White dress comes in. Under the tube, nothing. Living people kick up dust. She doesn't." },
  { id: "n3", night: 3, title: "Old shop", text: "The old man nods at it first. It nods back. Before this was a mart, it sat here. Gold foil under the sign. Rain hits it. You can almost see two characters: zhizha." },
  { id: "n4", night: 4, title: "Rule 2", text: "Rule 2 was added later. Whoever added it wanted night shift to take joss paper too. Take it, and you take the shift. That night the cat flipped the slip. The pencil 'joss paper doesn't count' showed again." },
  { id: "n5", night: 5, title: "Puddle", text: "Xiao Ya comes for milk. No shadow at her feet. The cat doesn't stop her. It bites your cuff so you don't step the puddle at the door." },
  { id: "n6", night: 6, title: "Heng", text: "There's a Heng on the back of the oil paper. He isn't the owner. He's the last shift. The day he handed off the lamp, he stood on the mat himself. Hair dry. Back wet first." },
  { id: "n7", night: 7, title: "Lamp", text: "The cat watched the lamp get lit. Lamp's on, it's here. The day Heng handed off, living sweat mixed with ash." },
];
const CAT_DEEP = {
  id: "deep",
  title: "Oldest tenant",
  text: "They burned paper at the alley mouth for three days. Ash never got swept. The sign became Hengdeng. The cat is older than the lamp. Lamp goes out, it has to find someone to keep it on till dawn.",
};

const CLUES = [
  { id: "keyToss", title: "Keys", night: 1, src: "Handoff", layer: "surface",
    text: "He tossed the keys. Four red notes underneath. You counted. Forty-two. Light flickered. The face value seemed to change. Night money does that. At the door he said: keep the lamp on. Don't ask where I am in daylight." },
  { id: "bossPhone", title: "Boss text", night: 1, src: "Text", layer: "surface",
    text: "Something actually happens, call me—whether I pick up is luck. Signed 'Boss.'" },
  { id: "rule2Added", title: "Rule 2 added later", night: 1, src: "Store rules", layer: "surface",
    text: "1, 3, 4, 5 are the same hand. Rule 2 is darker ink, added later. Pencil beside it said 'joss paper doesn't count.' Erased. Still readable." },
  { id: "paperShop", title: "Zhizha shop", night: 2, src: "Taxi Chen", layer: "deep",
    text: "Chen said this used to be a zhizha shop—paper funeral goods. Paper people, paper horses. Busy around Qingming. Then it became a mart." },
  { id: "lampBack", title: "Lamp out, old trade", night: 2, src: "Taxi Chen", layer: "deep",
    text: "People say the lamp here can't go out. It goes out, the old trade comes back." },
  { id: "bossGone", title: "Boss gone", night: 2, src: "Taxi Chen", layer: "surface",
    text: "The boss's surname was Heng. Polite. One autumn he was just gone. Shop never changed hands." },
  { id: "rule2AfterHeng", title: "After Old Heng left", night: 2, src: "Taxi Chen", layer: "deep",
    text: "Rule 2 got added later. After Old Heng left. The joss-paper thing—don't take it serious." },
  { id: "needRelief", title: "Night shift needs a taker", night: 3, src: "Zhongshan old man", layer: "deep",
    text: "Night shift always needs someone to take it. You take the money, you agree. You don't, the lamp's still his." },
  { id: "catKnowsOld", title: "The cat knows him", night: 3, src: "Cat", layer: "deep", catView: true,
    text: "The old man nodded at the cat first. The cat nodded. Like they go way back." },
  { id: "countTrap", title: "Count joss paper", night: 4, src: "Guard Wu", layer: "deep",
    text: "Guard Wu said his dad odd-jobbed at the zhizha shop. People who count joss paper belong to the shop by dawn." },
  { id: "ledger", title: "Ledger", night: 6, src: "Ledger", layer: "surface",
    text: "Night-shift stock, page after page. Hands change. Last page already has your name. Stock column empty. Handoff column empty. Date is tonight." },
  { id: "oldLedger", title: "Earlier page", night: 6, src: "Ledger", layer: "deep",
    text: "Three years back: milk and batteries. Handoff name is a woman's. Ink bled to the next line. The cat sat on that page." },
  { id: "bossNotOwner", title: "Last shift", night: 7, src: "Zhongshan old man", layer: "surface",
    text: "The one who hired you isn't the owner. He's last shift. The red stack in the drawer—he didn't dare count. Count it, you don't walk out. So he threw you the keys." },
  { id: "catIsJudge", title: "Cat guards the lamp", night: 7, src: "Cat", layer: "deep", catView: true,
    text: "The cat watched the lamp get lit. It doesn't block people for you. It blocks for the lamp. They burned paper at the alley mouth three days. Then it was called Hengdeng. The cat is older than the lamp." },
];

const CLUE_LINKS = [
  { id: "l_phone_key", a: "bossPhone", b: "keyToss", truth: "bossPrevShift",
    result: "The text 'Boss' never shows in daylight. Keys hit your hand, he's gone. That's not an owner. That's a handoff." },
  { id: "l_phone_gone", a: "bossPhone", b: "bossGone", truth: "bossPrevShift",
    result: "Texts signed 'Boss.' Alley people say Heng was gone by autumn. The one who calls doesn't match." },
  { id: "l_key_gone", a: "keyToss", b: "bossGone", truth: "bossPrevShift",
    result: "The one who threw the keys is alive. Can text. The one who vanished in autumn is gone. Who hired you isn't the owner." },
  { id: "l_phone_prev", a: "bossPhone", b: "bossNotOwner", truth: "bossPrevShift",
    result: "'Whether I pick up is luck'—because he isn't the owner anymore. He's last shift. The one who got out." },
  { id: "l_key_prev", a: "keyToss", b: "bossNotOwner", truth: "bossPrevShift",
    result: "Keys got thrown three times. The one who threw them to you took them the same way." },
  { id: "l_ledger_prev", a: "ledger", b: "bossNotOwner", truth: "bossPrevShift",
    result: "Every shift writes their name first. On the page that hired you, handoff is blank—he didn't dare finish the signature." },
  { id: "l_ledger_key", a: "ledger", b: "keyToss", truth: "bossPrevShift",
    result: "When the keys landed, the last ledger page already had your name ready. This shift was written in advance." },
  { id: "l_gone_prev", a: "bossGone", b: "bossNotOwner", truth: "bossPrevShift",
    result: "Autumn took Heng. Keys and texts are last shift. Two 'bosses.' Not the same person." },
  { id: "l_shop_lamp", a: "paperShop", b: "lampBack", truth: "paperHistory",
    result: "Shop became a mart. Lamp's still the zhizha lamp. Lamp goes out, old trade comes back." },
  { id: "l_shop_rule2", a: "paperShop", b: "rule2Added", truth: "paperHistory",
    result: "Mart Rule 2 is darker ink. The zhizha shop didn't have that line." },
  { id: "l_shop_count", a: "paperShop", b: "countTrap", truth: "paperHistory",
    result: "Wu's dad odd-jobbed at the zhizha shop. Count joss paper, you become shop people. That rule is older than the mart." },
  { id: "l_heng_rule2", a: "rule2AfterHeng", b: "needRelief", truth: "hengGhost",
    result: "Rule 2 came after Old Heng left. They added it so the next shift would take the joss paper. Take it, you take the shift." },
  { id: "l_heng_count", a: "needRelief", b: "countTrap", truth: "hengGhost",
    result: "Night shift needs a taker. Count the joss paper, by dawn you're shop people. The one in the Zhongshan suit recruiting never left." },
  { id: "l_heng_gone", a: "bossGone", b: "rule2AfterHeng", truth: "hengGhost",
    result: "Autumn he was gone. Shop never sold. Rule 2 was added after he left. The one who left didn't leave clean." },
  { id: "l_heng_relief", a: "needRelief", b: "bossNotOwner", truth: "hengGhost",
    result: "Last shift didn't dare count, so he walked out alive. The Zhongshan recruiter never handed off. That's why he's still looking." },
  { id: "l_cat_old", a: "catKnowsOld", b: "paperShop", truth: "catWhat",
    result: "The old man nods at the cat first. Before this was a mart, the cat sat here." },
  { id: "l_cat_judge", a: "catKnowsOld", b: "catIsJudge", truth: "catWhat",
    result: "The cat knows him because it's older than the lamp. It blocks people for the lamp, not for you." },
  { id: "l_cat_ledger", a: "catKnowsOld", b: "ledger", truth: "catWhat",
    result: "Last ledger page. The cat sweeps your name again and again. It remembers every name that went down." },
  { id: "l_rule2_heng", a: "rule2Added", b: "rule2AfterHeng", truth: "hengGhost",
    result: "The dark-ink line was added after Old Heng left. Pencil 'joss paper doesn't count' is someone later trying to stop that." },
];

const TRUTHS = {
  bossPrevShift: {
    layer: "surface",
    title: "Boss is last shift",
    text: "Who hired you isn't the owner. He's last shift, the one who didn't dare count. He threw the keys three times. This time they landed on you.",
  },
  paperHistory: {
    layer: "deep",
    title: "Zhizha shop to mart",
    text: "They used to make paper people and paper horses here. After it became a mart, same lamp. Lamp goes out, old trade comes back.",
  },
  hengGhost: {
    layer: "deep",
    title: "Boss Heng stayed",
    text: "Heng handed off the lamp that day and didn't leave. The Zhongshan recruiter is him. Rule 2 was added after he 'left,' so the next shift would take the joss paper.",
  },
  catWhat: {
    layer: "deep",
    title: "Cat older than the lamp",
    text: "They burned paper three days at the alley mouth. Ash never got swept. Sign became Hengdeng. The cat is older than this lamp. It blocks people so the lamp stays on till dawn.",
  },
  paperToHeng: {
    layer: "deep",
    title: "Zhizha shop to Hengdeng",
    need: ["paperHistory", "hengGhost", "catWhat"],
    needCat: true,
    text: "They burned paper three days at the alley mouth. Ash never got swept. This sign became Hengdeng. The lamp is leftover from the zhizha shop. Lamp goes out, paper people and horses come back. The day Heng handed the lamp off, he stood on the mat. Hair dry. Back wet first. He didn't leave. The one in the Zhongshan suit is him. He's hiring someone who'll keep the lamp on till dawn. The cat is older than the lamp. It doesn't block people for you.",
  },
};

function ensureClueState(st) {
  if (!st) return st;
  if (!Array.isArray(st.clues)) st.clues = [];
  if (!Array.isArray(st.clueLinks)) st.clueLinks = [];
  if (!Array.isArray(st.truths)) st.truths = [];
  if (!st.flags) st.flags = {};
  return st;
}

function clueSpec(id) {
  for (let i = 0; i < CLUES.length; i++) if (CLUES[i].id === id) return CLUES[i];
  return null;
}

function grantClue(st, id) {
  if (!st || !id) return false;
  ensureClueState(st);
  const spec = clueSpec(id);
  if (!spec) return false;
  if (spec.catView && !st.catView) return false;
  if (st.clues.indexOf(id) >= 0) return false;
  st.clues.push(id);
  st.flags.clueJustGot = id;
  st.flags.clueUnread = true;
  st.flags.cluesTonight = (st.flags.cluesTonight || 0) + 1;
  return true;
}

function grantBeatClues(st, beat, extra) {
  if (!st) return [];
  const bag = [];
  if (beat && beat.clue) bag.push(beat.clue);
  if (beat && beat.clues) for (let i = 0; i < beat.clues.length; i++) bag.push(beat.clues[i]);
  if (extra && extra.length) for (let i = 0; i < extra.length; i++) bag.push(extra[i]);
  const got = [];
  for (let i = 0; i < bag.length; i++) if (grantClue(st, bag[i])) got.push(bag[i]);
  return got;
}

function findClueLink(a, b) {
  if (!a || !b || a === b) return null;
  for (let i = 0; i < CLUE_LINKS.length; i++) {
    const l = CLUE_LINKS[i];
    if ((l.a === a && l.b === b) || (l.a === b && l.b === a)) return l;
  }
  return null;
}

function hasTruth(st, id) {
  return !!(st && st.truths && st.truths.indexOf(id) >= 0);
}

function unlockTruth(st, id) {
  if (!st || !id) return false;
  ensureClueState(st);
  if (st.truths.indexOf(id) >= 0) return false;
  const spec = TRUTHS[id];
  if (!spec) return false;
  if (spec.need) {
    for (let i = 0; i < spec.need.length; i++) {
      if (st.truths.indexOf(spec.need[i]) < 0) return false;
    }
  }
  if (spec.needCat && !(st.catView || st.clues.indexOf("catKnowsOld") >= 0 || st.clues.indexOf("catIsJudge") >= 0)) return false;
  st.truths.push(id);
  return true;
}

function applyClueLink(st, link) {
  ensureClueState(st);
  if (!link) return false;
  if (st.clueLinks.indexOf(link.id) >= 0) {
    unlockTruth(st, link.truth);
    return false;
  }
  st.clueLinks.push(link.id);
  unlockTruth(st, link.truth);
  return true;
}

function deepReady(st) {
  if (!st) return false;
  return hasTruth(st, "paperHistory") && hasTruth(st, "hengGhost") && hasTruth(st, "catWhat");
}

function revealDeepTruth(st) {
  ensureClueState(st);
  st.flags.revealedDeep = true;
  return unlockTruth(st, "paperToHeng");
}


function isClerk(s) {
  return !s || !s.role || s.role === "clerk";
}

const ROLE_META = {
  clerk: { id: "clerk", name: "Night clerk", short: "Night", unlockBy: null, hint: "Default role" },
  cat: { id: "cat", name: "Cat", short: "Shop cat", unlockBy: "cat", hint: "Clear the 'Give it to the cat' ending" },
  heng: { id: "heng", name: "Boss Heng", short: "Stray soul", unlockBy: "joss", hint: "Clear the 'Take the shift' ending" },
  xiaoya: { id: "xiaoya", name: "Xiao Ya", short: "Xiao Ya", unlockBy: "ferry", hint: "Clear the 'Walk her out' ending" },
  wu: { id: "wu", name: "Watchman Wu", short: "Guard", unlockBy: "void", hint: "Clear the 'Become a customer' ending" },
};

const ROLE_ORDER = ["clerk", "cat", "heng", "xiaoya", "wu"];

const ENDING_UNLOCK_ROLE = { cat: "cat", joss: "heng", ferry: "xiaoya", void: "wu" };

function roleRules(role, night) {
  if (!role || role === "clerk") return nightRules(night || 1);
  const packs = {
    cat: {
      banner: "You're the orange lump on the counter. No talk. You block with your body.",
      rules: [
        ["1", "People who shouldn't come in stay outside."],
        ["2", "Living people buying: let the one behind the counter sell."],
        ["3", "Don't jump into that counter spot too early."],
        ["4", "People you know: a nod is enough."],
        ["5", "Before dawn, don't let the lamp die."],
      ],
    },
    heng: {
      banner: "Real money burns. Joss paper can go in your box.",
      rules: [
        ["1", "Don't touch real money."],
        ["2", "Only joss paper goes in the box."],
        ["3", "Lamp stays on until someone takes over."],
        ["4", "Don't let the next shift see your face."],
        ["5", "Night shift needs a taker."],
      ],
    },
    xiaoya: {
      banner: "You're here to buy. The counter spot isn't yours.",
      rules: [
        ["1", "Buy only. Don't stand behind the counter."],
        ["2", "Milk. Strawberry if they have it. Plain if they don't."],
        ["3", "Walk her to the door and stop. Don't cross the water."],
        ["4", "Don't pull anyone across the waterline with you."],
        ["5", "Rain nights are when you can come in."],
      ],
    },
    wu: {
      banner: "You don't sell. You check the roster.",
      rules: [
        ["1", "Name not on the roster: don't let them into the alley."],
        ["2", "Lamp on means the shop is open."],
        ["3", "Living shoes are wet. The mat should be wet too."],
        ["4", "Don't talk too long with whoever's behind the counter."],
        ["5", "At dawn, close the book."],
      ],
    },
  };
  const pack = packs[role];
  if (!pack) return nightRules(night || 1);
  return {
    night: night || 1,
    phase: "Role",
    banner: pack.banner,
    rules: pack.rules.map(([num, text]) => ({ num, text, mark: "normal", ink: "normal", notes: [] })),
    extra: [],
  };
}

function roleState(role) {
  const s = newState();
  if (!role || role === "clerk") {
    s.role = "clerk";
    return s;
  }
  s.role = role;
  s.powerBill = 0;
  if (role === "cat") {
    s.cash = 0;
    s.sanity = 88;
    s.rep = 40;
    s.cat = 72;
    s.stock = { tea: 0, noodles: 0, water: 0, bread: 0, cigs: 0, incense: 0, battery: 0, milk: 0, candle: 0 };
  } else if (role === "heng") {
    s.cash = 0;
    s.sanity = 70;
    s.rep = 22;
    s.cat = 44;
    s.flags.jossCash = 0;
  } else if (role === "xiaoya") {
    s.cash = 6;
    s.sanity = 76;
    s.rep = 50;
    s.cat = 28;
  } else if (role === "wu") {
    s.cash = 0;
    s.sanity = 80;
    s.rep = 62;
    s.cat = 18;
    s.flags.roster = ["Lin Xiuzhen", "Wang Jianjun", "Zhou Xiaowan", "Chen Jianguo"];
  }
  return s;
}

function endingsForRole(role) {
  const o = {};
  Object.keys(ROLE_ENDINGS).forEach((k) => {
    if (ROLE_ENDINGS[k].role === role) o[k] = ROLE_ENDINGS[k];
  });
  return o;
}

function pickRoleEnding(s) {
  const r = s && s.role;
  if (r === "cat") {
    if (s.sanity <= 0) return "catFail";
    if (s.flags.catJumped) return "catFail";
    if (s.flags.catLetWet && !s.flags.catBlockedWet) return "catFail";
    return "catJudge";
  }
  if (r === "heng") {
    if (s.sanity <= 0 || s.flags.hengTookReal || !s.flags.hengFoundHeir) return "hengLoop";
    return "hengPass";
  }
  if (r === "xiaoya") {
    if (s.sanity <= 0 || s.flags.xyBehind || s.flags.xyCrossed || !s.flags.xySent) return "xiaoyaStay";
    return "xiaoyaRain";
  }
  if (r === "wu") {
    if (s.sanity <= 0 || s.flags.wuOwnName || s.flags.wuLetWet) return "wuLost";
    return "wuClear";
  }
  return pickEnding(s);
}

function nightsCat(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "Keys hit the mat. You didn't move. The new one smells like detergent and instant noodles. Living. You jump on the counter. Paw on the till." },
    {
      scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 22 * 60 + 16, door: true,
      text: "Folding bag on the counter. Detergent, milk. She says, 'New, huh?' Not asking you. You look at her shoes from the counter edge. Wet. Mat wet in a patch.",
      choices: [
        { label: "Let her buy", do: (st) => { st.flags.catLetLin = true; st.cat += 2; }, then: "She pinches the bread. Living people buying, you don't care. Tail flicks the receipt. She doesn't notice you." },
        { label: "Block her", do: (st) => { st.flags.catBlockLin = true; st.sanity -= 3; }, then: "You lie across the bag. She blinks. 'What's with the cat.' The new one laughs it off. At the door her umbrella tip taps once. You blocked the wrong person." },
        { label: "Smell", look: "Detergent, milk, rain. Mud on the soles. Living." },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "？", time: 0 * 60 + 27, door: true, effect: "flicker",
      text: "Bell didn't ring. He stands on the mat. Hair still dripping. You sniff—no water smell. Mat is dry.",
      choices: [
        { label: "Block the door", do: (st) => { st.flags.catBlockedWet = true; st.cat += 6; }, then: "You stand up and hiss. He looks at you, backs slowly into the rain. The new one behind the counter doesn't know if they should speak." },
        { label: "Let him in", do: (st) => { st.flags.catLetWet = true; st.sanity -= 8; }, then: "You don't move. He buys batteries. Smile shows even teeth. Water still dripping. Mat still dry." },
        { label: "Watch his feet", look: "Water drips. Hits the mat. Mat doesn't wet. You can't smell water." },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "You've smelled the white dress. Three years. Bell doesn't ring when she comes in. You watch her feet." },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "？", time: 23 * 60 + 8, door: true,
      text: "She wants milk. Strawberry. Shelf doesn't have it. You look at her feet—light hits the floor. No shadow.",
      choices: [
        { label: "Don't let her near the counter", do: (st) => { st.flags.catBlockedBai = true; st.cat += 5; }, then: "You jump between her and the counter. She looks at you, smiles. 'It still knows me.' Bell doesn't ring when she leaves." },
        { label: "Let her buy and go", do: (st) => { st.flags.catLetBai = true; st.sanity -= 4; }, then: "The new one hands her plain milk. She says thanks. You don't block. She stops at the puddle by the door, comes back in. Like she couldn't leave." },
        { label: "Look at her feet", look: "Light at her feet. Should be a shadow. There isn't." },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 22 * 60 + 40, door: true,
      text: "Helmet under one arm. Smoke, oil, rain. Shoes wipe the mat twice. Mat goes wet.",
      choices: [
        { label: "Let him buy smokes", do: (st) => { st.flags.catLetWang = true; }, then: "Living. You stay down. He opens the pack like he's done it a thousand times. Leaving, he says don't lock the door." },
        { label: "Smell", look: "Smoke, oil, rain. Living." },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "The till smells like red paper. The new one hasn't noticed. You know that smell. You've seen people take that money." },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Known", time: 0 * 60 + 41, door: true,
      text: "He looks at you first. You look at him. Like you go way back. He pulls a red stack from his coat.",
      choices: [
        { label: "Nod at him", do: (st) => { st.flags.catNodOld = true; st.cat += 8; }, then: "You nod. He nods. The new one stands in the middle. Neither of you looks at him. The old man puts joss paper on the counter. 'Night shift needs a taker.'" },
        { label: "Block him", do: (st) => { st.flags.catBlockOld = true; st.sanity -= 6; }, then: "You hiss. He doesn't back up. Looks at you a while. 'You're tired of watching too.' The joss paper still goes down. You didn't block a stranger." },
        { label: "Watch the red stack", look: "Red paper. Not money-smell. Ash and incense." },
      ],
    },
    {
      scene: "interior", name: "Till", tag: "Gap", time: 1 * 60 + 12,
      text: "Whether the new one takes the red stack is his problem. Yours is not letting the wrong people in again. The tube pops.",
      choices: [
        { label: "Keep the door", do: (st) => { st.flags.catWatchedDoor = true; }, then: "You turn. Face to the glass. Rain still going." },
        { label: "Jump into that counter spot", do: (st) => { st.flags.catJumped = true; st.sanity -= 10; }, then: "You jump in. Till snaps shut. The new one freezes. Too soon. That spot isn't yours yet." },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "A flashlight sweeps the alley mouth. Living. Mud on the soles. Your ear ticks." },
    {
      scene: "interior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 10, door: true,
      text: "Flashlight taps his pants seam twice. He looks at the mat. 'I thought someone came in out of the rain.'",
      choices: [
        { label: "Let him in", do: (st) => { st.flags.catLetWu = true; }, then: "Living. You slit your eyes. He asks if the cam glitched. The new one mumbles. He leaves with the light still on." },
        { label: "Smell", look: "Plastic flashlight, raincoat, smoke. Living." },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "？", time: 2 * 60 + 4, door: true, effect: "flicker",
      text: s.flags.catBlockedWet
        ? "He's back. Hair still dripping. Sees you. Stops in the doorway."
        : "He's back. Hair still dripping. Last time you didn't block. This time he stands further in.",
      choices: [
        { label: "Block the door", do: (st) => { st.flags.catBlockedWet = true; st.cat += 6; }, then: "You hiss. He backs up. Slower this time." },
        { label: "Let him in", do: (st) => { st.flags.catLetWet = true; st.sanity -= 8; }, then: "You don't move. He buys batteries. Mat still dry when he leaves." },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "Rain gets heavier. Instant-noodle smell off the shelf. You wrap your tail tight." },
    {
      scene: "interior", portrait: "zhou", name: "Zhou Xiaowan", tag: "Upstairs", time: 23 * 60 + 41, door: true,
      text: "Hood up. Wired earbuds. Noodle smell. Shoes wet. Mat wet too.",
      choices: [
        { label: "Let her make noodles", do: (st) => { st.flags.catLetZhou = true; }, then: "Living. She says the walls are thin. You don't finish listening. You watch the door." },
        { label: "Smell", look: "Noodles, shampoo, rain. Living." },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "？", time: 3 * 60 + 20, door: true,
      text: "Rain hits her skirt. Skirt doesn't wet. She still wants milk.",
      choices: [
        { label: "Block", do: (st) => { st.flags.catBlockedBai = true; st.cat += 3; }, then: "You don't let her walk toward the waterline at the door. She looks at you. Doesn't push it." },
        { label: "Follow her to the door", do: (st) => { st.flags.catFollowBai = true; st.sanity -= 6; }, then: "You follow to the door. That puddle is ice. She looks back. You don't cross. She doesn't either. You stand there a while." },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "Ledger's open. Ink smell. Names of a lot of night shifts. One page empty, waiting for the new one. You're older than these names." },
    {
      scene: "interior", name: "Ledger", tag: "Gap", time: 0 * 60 + 50,
      text: "The new one sees his name already on it. Hand stops. You sit by the book. Tail pinning a corner.",
      choices: [
        { label: "Nudge the ledger shut", do: (st) => { st.flags.catClosedBook = true; st.cat += 4; }, then: "You bump it closed with your head. He doesn't flip again. Lamp still on." },
        { label: "Jump into the counter spot", do: (st) => { st.flags.catJumped = true; st.sanity -= 10; }, then: "You jump in. Too soon. Till-shut sound makes the new one jump. The old man hasn't asked who gets the lamp." },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "Taxi Chen", tag: "Taxi", time: 23 * 60 + 40, door: true,
      text: "Smoke mixed with car freshener. 'This alley tonight, gives you the creeps.' He's living. You've seen him for years.",
      choices: [
        { label: "Let him buy water", do: (st) => { st.flags.catLetChen = true; }, then: "Living. You stay down. He says this used to be a zhizha shop. You know. You were here." },
        { label: "Listen", look: "Smoke, freshener, rain. Living. When he says zhizha shop, your ear moves." },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "Last night. The old man will ask who gets the lamp. You wait. Don't jump in first." },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Known", time: 4 * 60 + 12, door: true,
      text: "He nods at you first. Then asks the new one: 'Who's the lamp going to.' The new one looks at you.",
      choices: [
        { label: "Wait till he gives you the shop", do: (st) => { st.flags.catWaited = true; st.cat += 10; }, then: "You don't move. The new one leaves the spot. Then you jump in. Till shuts. The old man doesn't ask again." },
        { label: "Jump in first", do: (st) => { st.flags.catJumped = true; st.sanity -= 8; }, then: "You jump in first. The new one hasn't spoken. The old man glances at you. Says nothing. You took the spot too early." },
      ],
    },
    {
      scene: "interior", name: "Door", tag: "Dawn", time: 5 * 60 + 50,
      text: "Dawn's coming. Whether the wrong people are still outside is seven nights of whether you blocked them.",
      choices: [
        { label: "Hold till the lamp steadies", do: (st) => { st.flags.catHeldDawn = true; }, then: "You sit. Lamp stays on until the sign is readable. Nobody pushes the door in the alley." },
      ],
    },
  ];
}

function nightsHeng(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "That counter spot is yours. Always was. The new one sweats on the keys. You stand a little behind him. He can't see you. Hands are see-through." },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 22 * 60 + 48, door: true,
      text: "He slaps down a twenty. 'Pack of smokes. Bottle of iced tea.' Real money. Ink smell. Hot.",
      choices: [
        { label: "Don't touch. Let the new one take it", do: (st) => { st.flags.hengRefusedReal = true; }, then: "You pull your hand back. Real money burns. The new one takes it. You only watch the till. You don't touch that twenty." },
        { label: "Reach for it", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 14; }, then: "Fingers touch. Burns. Twenty still there. Your hand feels scalded. Wang didn't see you. He saw the new one flinch." },
        { label: "Look at that twenty", look: "Ink, heat. Real money. You can't touch it." },
      ],
    },
    {
      scene: "interior", name: "Till", tag: "Gap", time: 23 * 60 + 20,
      text: "Two coins in the drawer. Real too. You remember counting this kind. After you counted, you couldn't leave.",
      choices: [
        { label: "Don't count", do: (st) => { st.flags.hengNoCount = true; st.sanity += 2; }, then: "You push the drawer shut. Lamp still on. That's how you still get to stay." },
        { label: "Count them", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 16; }, then: "Coins are cold. After you count, the puddle at the door feels closer. You can't touch real money. You did." },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "The new one starts flipping store rules. Rule 2 was added later. You didn't write it. Someone added it after you left." },
    {
      scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 22 * 60 + 16, door: true,
      text: "She holds out a ten. 'One milk. Soft bread.' Real money.",
      choices: [
        { label: "Don't touch. Let the new one take it", do: (st) => { st.flags.hengRefusedReal = true; }, then: "You step back half a pace. She can't see you. The new one makes change. Real money goes in someone else's drawer." },
        { label: "Reach for it", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 12; }, then: "The ten burns. Auntie Lin shivers. 'Why's it so cold in here.'" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "Taxi Chen", tag: "Taxi", time: 23 * 60 + 44, door: true,
      text: "He says, offhand: 'You know this used to be a zhizha shop.' He's talking to the new one. You stand under the tube.",
      choices: [
        { label: "Listen. Don't speak", do: (st) => { st.flags.hengHid = true; }, then: "You don't speak. The zhizha shop was yours. You turned it into a mart. He doesn't know you're still here." },
        { label: "Want him to see you", do: (st) => { st.flags.hengSeen = true; st.sanity -= 6; }, then: "Lamp flickers. Chen freezes. 'Was there someone else behind the counter just now.' The new one turns. You already dropped your head." },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "Tonight someone will bring joss paper. Joss paper is warm. That you can take." },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "？", time: 0 * 60 + 41, door: true,
      text: "He isn't looking at the new one. He's looking at you. 'Night shift needs a taker.' The red stack in his coat, held where you can reach.",
      choices: [
        { label: "Take the joss paper", do: (st) => { st.flags.hengTookJoss = true; st.flags.jossCash = (st.flags.jossCash || 0) + 40; st.cat += 4; }, then: "Red paper is warm. Goes in the box. The old man nods. 'That's it. The real kind—don't touch.'" },
        { label: "Don't take it", do: (st) => { st.flags.hengRefusedJoss = true; st.sanity -= 4; }, then: "You don't take it. He puts the joss paper on the counter. 'Someone has to take it. The lamp can't sit unwatched.'" },
        { label: "Look at the red stack", look: "Ash and incense. Warm. Not hot. This is for you." },
      ],
    },
    {
      scene: "interior", name: "Store rules", tag: "Gap", time: 1 * 60 + 5,
      text: "Rule 2 'take whatever they pay' isn't yours. When you were here, the zhizha shop didn't take real money. After someone left they switched to mart rules.",
      choices: [
        { label: "Remember. Don't follow Rule 2", do: (st) => { st.flags.hengKnewTrap = true; }, then: "You don't take real money. That's how you can still wait for the next shift." },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "The new one will look at you tonight. Don't let him see clear." },
    {
      scene: "interior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 10, door: true,
      text: "He sweeps the flashlight behind the counter. 'Cam glitched a frame.' Light goes through you. No shadow on the mat.",
      choices: [
        { label: "Dodge the light", do: (st) => { st.flags.hengHid = true; }, then: "You lean behind the shelf. Light sweeps empty space. Wu swears at the glitch and leaves." },
        { label: "Stand in it", do: (st) => { st.flags.hengSeen = true; st.sanity -= 7; }, then: "The light pauses. He frowns. 'Somebody standing back there?' The new one turns. Nobody. You're still there." },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "？", time: 2 * 60 + 3, door: true, effect: "flicker",
      text: "He buys batteries. Money he holds out is dry. Real money. He isn't here to give you joss paper.",
      choices: [
        { label: "Don't touch his money", do: (st) => { st.flags.hengRefusedReal = true; }, then: "You don't. Whether the new one sells is his shift. You watch the lamp." },
        { label: "Reach for it", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 12; }, then: "Dry bills burn worse. Wet-Hair Man smiles. Like he knows you." },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "The power bill is real money. You can't pay it. The lamp needs the new one to sell stock. You can only watch." },
    {
      scene: "interior", name: "Tube", tag: "Gap", time: 0 * 60 + 20, effect: "flicker",
      text: "Lamp flickered. The year you didn't get out was the year the lamp died.",
      choices: [
        { label: "Let the cat watch the lamp", do: (st) => { st.flags.hengAskCat = true; st.cat += 6; }, then: "You glance at the cat. It jumps by the switch and sits. Lamp steadies a little." },
        { label: "Turn the lamp off", do: (st) => { st.flags.hengClosedLamp = true; st.sanity -= 14; st.flags.closedLast = true; }, then: "Hand on the switch. Lamp dies for a beat. Zhizha smell comes back. You switch it on again. Too late." },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "？", time: 3 * 60 + 15, door: true,
      text: "She wants milk. Three years ago too. You weren't on that night. Later shift was. You didn't stop her crossing the puddle.",
      choices: [
        { label: "Don't let the new one follow her", do: (st) => { st.flags.hengWarnBai = true; }, then: "You stand at the puddle. The new one doesn't step out. She stops herself." },
        { label: "Leave it", do: (st) => { st.sanity -= 3; }, then: "She buys and walks into the water. You don't move. Not your shift's money. Not your person." },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "First line of the ledger is your name. Heng. Then years of blank. Then other hands." },
    {
      scene: "interior", name: "Ledger", tag: "Gap", time: 0 * 60 + 48,
      text: "The new one sees his name already on it. He'll ask who the boss is. That's you. You can't answer.",
      choices: [
        { label: "Close the ledger", do: (st) => { st.flags.hengHid = true; }, then: "Wind shuts the book. He doesn't push. Lamp still on." },
        { label: "Let him see the first line", do: (st) => { st.flags.hengSeen = true; st.flags.hengShowedName = true; }, then: "He sees 'Heng.' Looks up behind the counter. You keep your head down. He doesn't know it's you. Not yet." },
      ],
    },
    {
      scene: "interior", name: "Shop cat", tag: "Gap", time: 1 * 60 + 30,
      text: "The cat is older than the lamp. Older than you turning this into a mart. It still knows you.",
      choices: [
        { label: "Let it keep watch", do: (st) => { st.cat += 5; st.flags.hengAskCat = true; }, then: "You don't chase it off. It sits on the till. That's enough." },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "Time to throw the keys. Throw them to someone who'll keep the lamp on. Don't sign again." },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "？", time: 4 * 60 + 10, door: true,
      text: "He's asking the new one. He's asking you too. 'Who's the lamp going to.'",
      choices: [
        { label: "Throw the keys to the next shift", do: (st) => { st.flags.hengFoundHeir = true; st.flags.hengHid = true; }, then: "Keys land on the counter from your side. The new one picks them up, flinches like they're hot. He didn't see you clear. That's right. Night shift has a taker." },
        { label: "Stay yourself", do: (st) => { st.flags.stayOn = true; st.sanity -= 8; }, then: "You don't throw. Clock hits six, jumps back to 22:00. This day isn't done." },
      ],
    },
    {
      scene: "interior", name: "Lamp", tag: "Dawn", time: 5 * 60 + 58,
      text: "The sign should be readable soon. You're still a little behind the counter. The new one can't see you. Better if he never does.",
      choices: [
        { label: "Step back", do: (st) => { st.flags.hengHid = true; }, then: "You step back to the back-room door. You don't go in there either. Lamp goes to someone still living." },
      ],
    },
  ];
}

function nightsXiaoya(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "Hard rain. You're outside. A coin in your pocket, ice. You remember: milk. Strawberry. This shop doesn't have its old name anymore." },
    {
      scene: "interior", portrait: "lin", name: "Person behind the counter", tag: "Night", time: 22 * 60 + 20, door: true,
      text: "Bell rings. You go in. Mat is dry. Your skirt is dry. New one behind the counter, dark circles. No strawberry milk on the shelf. Plain, yes.",
      choices: [
        { label: "Buy plain milk (coin)", do: (st) => { st.flags.xyBoughtMilk = true; st.flags.xyBought = (st.flags.xyBought || 0) + 1; }, then: "He hands you the milk. You put the ice coin on the counter. He touches it, pulls back. You hold the milk. Still cold." },
        { label: "Ask if they have strawberry", do: (st) => { st.flags.xyAskedBerry = true; }, then: "He says no. You nod. Take plain anyway. He doesn't really want the coin." },
        { label: "Go around behind the counter", do: (st) => { st.flags.xyBehind = true; st.sanity -= 12; }, then: "You slip in from the side. He jumps. Till is warm. You shouldn't stand here. This isn't a buying spot." },
      ],
    },
    {
      scene: "exterior", name: "Door", tag: "Water", time: 22 * 60 + 40,
      text: "Puddle at the door. Streetlight on it. You're holding milk. Cross it and you go home. You've walked three years. Haven't crossed.",
      choices: [
        { label: "Stop at the water", do: (st) => { st.flags.xyStopped = true; st.sanity += 2; }, then: "You stop. Over the shoe and you're done. Too early tonight. You put the milk down, pick it up again." },
        { label: "Walk across", do: (st) => { st.flags.xyCrossed = true; st.sanity -= 14; }, then: "Water over the shoe, ice to the bone. No home on the other side. You're back at the shop door. Milk still full." },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "The coin's in your pocket again. Ice. You're here again. Rain still going." },
    {
      scene: "interior", name: "Inside", tag: "Night", time: 23 * 60 + 5, door: true,
      text: "Still him. Still dark circles. Cat on the counter watching you. The cat knows you.",
      choices: [
        { label: "Buy milk", do: (st) => { st.flags.xyBoughtMilk = true; st.flags.xyBought = (st.flags.xyBought || 0) + 1; }, then: "He hands you plain milk again. You say thanks. Cat doesn't block you. Doesn't let you toward the back room either." },
        { label: "Greet the cat", do: (st) => { st.cat += 8; st.flags.xySawCat = true; }, then: "You look at it. It looks at your feet. You know it's looking for a shadow. You don't have one." },
        { label: "Ask to wait out the rain in back", do: (st) => { st.flags.xyBehind = true; st.sanity -= 10; }, then: "He says the back room's closed. You're already at the side door. Shouldn't. You step back." },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "An old man in a Zhongshan suit is in the shop too. The way he looks at you is like roll call." },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "？", time: 0 * 60 + 44, door: true,
      text: "He says, 'Night shift needs a taker.' Not to you. He looks at you again. 'Buy and go. Don't stand behind the counter.'",
      choices: [
        { label: "Buy and leave", do: (st) => { st.flags.xyBoughtMilk = true; }, then: "You buy milk. Don't linger. The old man nods at the cat. Not at you." },
        { label: "Ask if he knows me", do: (st) => { st.flags.xyAskedOld = true; }, then: "He doesn't answer. Just: 'Walk to the door and stop.'" },
      ],
    },
    {
      scene: "interior", name: "Counter", tag: "Gap", time: 1 * 60 + 2,
      text: "The counter spot empties a second. New one went in back for stock. Till not fully shut.",
      choices: [
        { label: "Wait. Don't go in", do: (st) => { st.flags.xyWaited = true; }, then: "You stand on the mat. Mat is dry. Your shoes should be wet. They aren't." },
        { label: "Go in and watch it for him", do: (st) => { st.flags.xyBehind = true; st.sanity -= 12; }, then: "You slip in. Red paper in the till. You shouldn't see that. He comes back, sees you, goes white." },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "Wu's flashlight sweeps the alley. You hug the wall. Your name on the roster is crossed out. You know." },
    {
      scene: "exterior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 12,
      text: "Light hits you. Pauses. 'Buying this late? What's your name.'",
      choices: [
        { label: "Say you're buying milk. Don't give a name", do: (st) => { st.flags.xyNoName = true; }, then: "He says fine, fine, light lifts. Doesn't write you down. You go in." },
        { label: "Give your name", do: (st) => { st.flags.xyGaveName = true; st.sanity -= 4; }, then: "He flips the book. That page is crossed out. He frowns, lets you in anyway. Like he can't work it out." },
      ],
    },
    {
      scene: "interior", name: "Inside", tag: "Night", time: 1 * 60 + 30, door: true,
      text: "You put the coin on the counter. He still pulls back at a touch.",
      choices: [
        { label: "Buy milk", do: (st) => { st.flags.xyBoughtMilk = true; }, then: "Plain. You hold it. Say thanks." },
        { label: "Ask him to walk you to the door", do: (st) => { st.flags.xyAskedSend = true; }, then: "He says wait till dawn. Rain's too hard tonight. You nod. Early yet." },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "Rain harder. Skirt should be wet. Still isn't. You're getting impatient." },
    {
      scene: "interior", name: "Inside", tag: "Night", time: 3 * 60 + 10, door: true,
      text: "You come for milk again. He says, 'You come every night.' Doesn't sound like he's kicking you out.",
      choices: [
        { label: "Ask him to walk you to the door", do: (st) => { st.flags.xyAskedSend = true; st.rep += 4; }, then: "He hesitates. Says wait one more night. You don't pull him. Pull him across that puddle, he doesn't come back either." },
        { label: "Pull him along", do: (st) => { st.flags.xyPull = true; st.flags.xyCrossed = true; st.sanity -= 10; }, then: "You pull his sleeve into the water. His shoes wet. Your skirt still dry. He stops. You don't. Across the line, still rain on the other side." },
        { label: "Cross the puddle first", do: (st) => { st.flags.xyCrossed = true; st.sanity -= 12; }, then: "Water's ice. No home. You stand under the streetlight with the milk. Shop lamp still on. You walk back." },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "When the ledger opens you see the page from three years ago. A woman's name. Crossed out. Yours." },
    {
      scene: "interior", name: "Ledger", tag: "Gap", time: 0 * 60 + 52,
      text: "The new one stares at that page. You stand beside him. He may not see that you've been here the whole time.",
      choices: [
        { label: "Let him look. Don't touch the book", do: (st) => { st.flags.xyWaited = true; }, then: "You don't reach. The ledger is the shop's. You're here for milk." },
        { label: "Reach in and flip", do: (st) => { st.flags.xyBehind = true; st.sanity -= 8; }, then: "You flip to your page. Ink is dry. He sees your hand come in from the side and sucks in a breath." },
      ],
    },
    {
      scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 22 * 60 + 18, door: true,
      text: "She sees you. Mouth opens. Doesn't say your name. After the milk she leaves fast.",
      choices: [
        { label: "Don't follow her", do: (st) => { st.flags.xyNoFollow = true; }, then: "You don't. Umbrella tip taps at the door. She doesn't look back." },
        { label: "Call her", do: (st) => { st.sanity -= 3; }, then: "You call. She doesn't hear. Or she does. The umbrella never stops." },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "Tonight someone has to walk you to the door. Walk you and stop. Don't cross the puddle. Don't pull him." },
    {
      scene: "interior", name: "Inside", tag: "Night", time: 5 * 60 + 10, door: true,
      text: "You put the coin down. He says, 'I'll walk you to the door.' The cat jumps between you, then steps aside.",
      choices: [
        { label: "Let him walk you. Stop yourself", do: (st) => { st.flags.xySent = true; st.flags.xyBoughtMilk = true; }, then: "He stops at the door. The step you take through the water, skirt wets for the first time. Rain on you is warm. You look back and say thanks." },
        { label: "Pull him across the puddle", do: (st) => { st.flags.xyPull = true; st.flags.xyCrossed = true; st.sanity -= 12; }, then: "You pull him. Both of you wet. No home on the other side. His hand is hot. Yours is still ice. Lamp behind you." },
        { label: "Walk behind the counter yourself", do: (st) => { st.flags.xyBehind = true; st.sanity -= 14; }, then: "You don't let him walk you. You go around the counter. Till shuts. You become the one watching the shop. The puddle's still there. Nobody crosses." },
      ],
    },
  ];
}

function nightsWu(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "Roster has four names: Lin Xiuzhen, Wang Jianjun, Zhou Xiaowan, Chen Jianguo. You've walked this all-night shop for years. Tonight you check this one." },
    {
      scene: "exterior", portrait: "lin", name: "Auntie Lin", tag: "On the book", time: 22 * 60 + 14,
      text: "She walks to the shop under an umbrella. You flip the book. Lin Xiuzhen. Matches.",
      choices: [
        { label: "Let her into the alley", do: (st) => { st.flags.wuLetLin = true; }, then: "'Buying milk this late.' She says the kid at home needs it. Umbrella tip taps. You don't stop her." },
        { label: "Check once", look: "Lin Xiuzhen. Twelve years on this alley. Shoes wet. Mat should wet when she comes in." },
      ],
    },
    {
      scene: "interior", name: "Inside", tag: "Check-in", time: 22 * 60 + 30, door: true,
      text: "The new night clerk has dark circles. You tap the flashlight on your pants twice. 'Front cam glitch just now?'",
      choices: [
        { label: "Ask two things and go", do: (st) => { st.flags.wuShortChat = true; }, then: "He says no glitch. You nod. Don't talk long. Sometimes the person behind the counter isn't on the book." },
        { label: "Sit and talk a while", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 5; }, then: "You sit twenty extra minutes. Lamp flickers. In the flicker his face isn't his. You go out and take a mouth of cold air." },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "Book hasn't changed. Four names. Extra ones, don't let in." },
    {
      scene: "exterior", portrait: "wet", name: "Wet-Hair Man", tag: "Not on the book", time: 0 * 60 + 25,
      text: "Hair still dripping. He wants in. You flip the book. Nobody like him. From the mat—where he's standing should be wet. You remember yesterday that patch was dry.",
      choices: [
        { label: "Don't let him in the alley", do: (st) => { st.flags.wuBlockWet = true; st.rep += 4; }, then: "'This late. Come in daylight.' He looks at you, backs into the rain. In the flashlight, the ground under his feet is dry." },
        { label: "Let him into the shop", do: (st) => { st.flags.wuLetWet = true; st.sanity -= 10; }, then: "You let him. He buys batteries. Bell didn't ring. You check the mat later. Dry. Shouldn't have let him." },
        { label: "Check the name", look: "Not on the book. No surname, no given name. Shoes dripping. Ground not wet." },
      ],
    },
    {
      scene: "exterior", portrait: "wang", name: "Delivery Wang", tag: "On the book", time: 22 * 60 + 40,
      text: "Wang Jianjun. Delivery. Helmet under the arm. Matches.",
      choices: [
        { label: "Let through", do: (st) => { st.flags.wuLetWang = true; }, then: "He clicks his tongue. 'What's to check.' Goes in for smokes. Shoes wipe the mat twice. Mat wets." },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "White dress. Three years back a woman's name on a page, crossed out. Chen Xiaoya. You may not still remember." },
    {
      scene: "exterior", portrait: "bai", name: "White-Dress Woman", tag: "Old book", time: 23 * 60 + 10,
      text: "She wants in. You flip to the crossed-out page.",
      choices: [
        { label: "Follow the new book. Don't let her", do: (st) => { st.flags.wuBlockBai = true; }, then: "You say the shop's closed. She looks at you, doesn't argue. Bell doesn't ring when she leaves—she never came in. Skirt not wet." },
        { label: "Follow the old book. Let her buy milk", do: (st) => { st.flags.wuLetBai = true; }, then: "You let her in. She buys milk. Comes out still dry. You don't write her name back in." },
        { label: "Look at the crossed-out page", look: "Chen Xiaoya. Three years ago. One person crossed it, hard." },
      ],
    },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Not on the book", time: 0 * 60 + 42, door: true,
      text: "Not on the book. He nods at the cat first. Then looks at you. 'Night shift needs a taker.'",
      choices: [
        { label: "Don't block him. Don't talk", do: (st) => { st.flags.wuSawOld = true; }, then: "You step back to the door. He isn't on your book. Not someone you can stop. The cat doesn't hiss at him." },
        { label: "Ask him to leave", do: (st) => { st.flags.wuBlockOld = true; st.sanity -= 6; }, then: "You ask him out. He looks at you, still puts down a red stack. You don't see if it's money." },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "Cam glitched again. You brought a spare flashlight. Don't sit in the shop too long." },
    {
      scene: "interior", name: "Inside", tag: "Check-in", time: 1 * 60 + 10, door: true,
      text: "The new one asks if you can leave the flashlight. Lamp flickers.",
      choices: [
        { label: "Leave the light. Go now", do: (st) => { st.flags.wuFlash = true; st.flags.wuShortChat = true; st.rep += 6; }, then: "Flashlight on the drawer edge. You say alley mouth is far enough. Curtain sounds, you're out. No extra talk." },
        { label: "Sit and talk about the glitch", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 6; }, then: "You talk twenty minutes. Later, his own voice comes from the freezer too. You stand up and leave." },
      ],
    },
    {
      scene: "exterior", portrait: "wet", name: "Wet-Hair Man", tag: "Not on the book", time: 2 * 60 + 2,
      text: "He's back. Still not on the book.",
      choices: [
        { label: "Don't let in", do: (st) => { st.flags.wuBlockWet = true; }, then: "'Daytime tomorrow.' He backs up. Ground still dry." },
        { label: "Let in", do: (st) => { st.flags.wuLetWet = true; st.sanity -= 10; }, then: "You let him. Bell didn't ring. Mat dry. You don't dare watch playback later." },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "Heavy rain. Bad visibility. Living shoes are always wet. If they aren't, don't let them in." },
    {
      scene: "exterior", portrait: "zhou", name: "Zhou Xiaowan", tag: "On the book", time: 23 * 60 + 40,
      text: "Zhou Xiaowan. Lives upstairs. Hood up. Shoes wet.",
      choices: [
        { label: "Let through", do: (st) => { st.flags.wuLetZhou = true; }, then: "She says she came down for noodles. You don't stop her. Mat wets in a patch." },
      ],
    },
    {
      scene: "exterior", name: "Alley mouth", tag: "Patrol", time: 3 * 60 + 5,
      text: "Shop lamp flickers. Should you go in and sit.",
      choices: [
        { label: "Watch the lamp from the alley. Don't go in", do: (st) => { st.flags.wuShortChat = true; }, then: "You stand under the sign. Lamp flickers twice, steadies. You don't go in to talk." },
        { label: "Sit inside till dawn", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 5; }, then: "You sit by the freezer. The new one glances at you now and then. The longer you sit the more it feels like you're on shift. Shouldn't." },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "The ledger isn't your book. Don't write your name in it." },
    {
      scene: "interior", name: "Ledger", tag: "Gap", time: 0 * 60 + 50, door: true,
      text: "Ledger open. The new one says the first line is 'Heng.' Your name isn't on it. Pen beside it.",
      choices: [
        { label: "Don't write. Close the book", do: (st) => { st.flags.wuClosedBook = true; }, then: "You close it. A guard's book is a roster, not a ledger. Don't mix them." },
        { label: "Write your own name", do: (st) => { st.flags.wuOwnName = true; st.sanity -= 14; }, then: "Pen's slippery. The name writes itself. After it's down you know it's bad. Dawn, you may not leave." },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "Taxi Chen", tag: "On the book", time: 23 * 60 + 44, door: true,
      text: "Chen Jianguo. Taxi. Matches. He says this used to be a zhizha shop.",
      choices: [
        { label: "Let through. Don't talk much", do: (st) => { st.flags.wuLetChen = true; st.flags.wuShortChat = true; }, then: "You nod. He buys water. You don't pick up the thread. Zhizha shop isn't tonight's check." },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "Dawn, close the book. Don't leave yourself in it. Lamp on, shop's open. Your shift ends at the alley mouth." },
    {
      scene: "interior", name: "Inside", tag: "Handoff", time: 5 * 60 + 20, door: true,
      text: "The new one is still here. Cat on the counter. Your book in your hand.",
      choices: [
        { label: "Close the book. Back to the booth", do: (st) => { st.flags.wuClosedBook = true; st.flags.wuHeldDawn = true; }, then: "You close the book. Four names. Not one extra. Flashlight away. Dawn at the alley mouth." },
        { label: "Stay and help him watch the shop", do: (st) => { st.flags.wuOwnName = true; st.flags.wuChatLong = true; st.sanity -= 10; }, then: "You put the book down. Sit on the stool by the counter. Clock hits six, like it didn't. Roster on your knee has an extra line." },
      ],
    },
    {
      scene: "exterior", name: "Alley mouth", tag: "Dawn", time: 6 * 60 + 1,
      text: "The sign is readable: Hengdeng Mart. Your shift ends here.",
      choices: [
        { label: "Leave", do: (st) => { st.flags.wuHeldDawn = true; }, then: "You leave. Lamp still on. Shop isn't yours. Book in your pocket, closed." },
      ],
    },
  ];
}

function buildRoleNight(n, s) {
  const role = s && s.role;
  if (role === "cat") return nightsCat(n, s);
  if (role === "heng") return nightsHeng(n, s);
  if (role === "xiaoya") return nightsXiaoya(n, s);
  if (role === "wu") return nightsWu(n, s);
  return [{ type: "prep", time: 21 * 60 + 50, text: "Alley's still this alley." }];
}

function buildNight(n, s) {
  if (s && s.role && s.role !== "clerk") return buildRoleNight(n, s);
  if (n === 1) return night1(s);
  if (n === 2) return night2(s);
  if (n === 3) return night3(s);
  if (n === 4) return night4(s);
  if (n === 5) return night5(s);
  if (n === 6) return night6(s);
  return night7(s);
}

function night1() {
  return [
    { type: "prep", time: 21 * 60 + 50, clue: "keyToss", text: "The boss tosses the keys. Four red notes underneath.\n'Night-shift bonus. You stock it. Shop's not sitting on inventory for you.'\nAt the door he turns: 'Keep the lamp on. Don't ask where I am in daylight.'\nUnder the light all four are red. You fan them: all tens. Two coins in the drawer. You count. Forty-two. Tube flickers. Faces look like bigger numbers, then they're tens again. Night money. You can't read the value." },
    { type: "phone", from: "Boss", clue: "bossPhone", text: "First night, don't overthink. Take the money. Don't close early. Something actually happens, call me—whether I pick up is luck." },
    {
      scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 22 * 60 + 16, door: true,
      text: "'New, huh?' Folding bag on the counter. 'One milk. Soft bread. Last one gave me a squashed one. Don't want that.'",
      choices: [
        { label: "Sell to her (milk + bread ¥11)", need: { milk: 1, bread: 1 }, do: (st) => { sell(st, { milk: 1, bread: 1 }, 11); st.rep += 5; st.flags.servedLin = true; }, then: "She pinches the bread. 'That's it. Last one always gave me hard.' Curtain sounds, a gulp of rain, then it follows her out." },
        { label: "Sorry, sold out", hideIf: (st) => hasStock(st, { milk: 1, bread: 1 }), do: (st) => { missStock(st, 11); st.flags.missedLin = true; }, then: "'Gone already?' She scans the empty shelf, says nothing. At the door the umbrella tip taps once." },
        { label: "Look again", look: "A pale ring on the right ring finger. Bag hasn't taken a drop. It's raining out there." },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 22 * 60 + 48, door: true,
      text: "Helmet under one arm. 'Boss out? Good. Pack of smokes. Bottle of iced tea. Lots of orders tonight.'",
      choices: [
        { label: "Sell to him (smokes + iced tea ¥22)", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.flags.wangRegular = true; st.rep += 3; }, then: "The way he opens the pack, he's done this. 'Only all-night on this alley. Don't lock up. I'll be back to restock.'" },
        { label: "Only got one of those", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => {
          if (hasStock(st, { cigs: 1 })) { sell(st, { cigs: 1 }, 18); }
          else if (hasStock(st, { tea: 1 })) { sell(st, { tea: 1 }, 4); }
          else st.rep -= 2;
        }, then: "He clicks his tongue, still slaps the money down. 'Fine, fine. Catch it next run.'" },
        { label: "Look again", look: "Reflective strip worn dull. Oil stain on the left shoulder. Coming in he wiped his shoes on the mat twice." },
      ],
    },
    {
      scene: "interior", name: "Inside", tag: "Gap", time: 23 * 60 + 12,
      text: "The tube pops. The orange cat is on the counter somehow, a crumpled receipt under a paw.\nWay back in the drawer, a slip folded too many times, corners greasy.",
      choices: [
        { label: "Unfold the slip", clues: ["rule2Added"], do: (st) => { st.foundRules = true; st.sanity += 2; }, then: "Five store rules. 1, 3, 4, 5 the same hand. Rule 2 darker ink, added later. Pencil beside it, erased, still readable: 'Joss paper doesn't count.'\nRule 5 traced over and over: Don't count joss paper before dawn." },
        { label: "Shut the drawer first", do: (st) => { st.foundRules = true; }, then: "You catch two characters: Store rules. Look closer later." },
        { label: "Scratch the cat", do: (st) => { st.cat += 8; }, then: "A noise in its throat. After the scratch it turns back to the glass. Still raining out there." },
      ],
    },
    {
      scene: "interior", portrait: "zhou", name: "Zhou Xiaowan", tag: "Upstairs", time: 23 * 60 + 41, door: true,
      text: "Hood up, wired earbuds on her chest. 'Braised beef. Pour some hot water.' She glances at you. 'You're open at this hour.'",
      choices: [
        { label: "Sell noodles (¥6)", need: { noodles: 1 }, do: (st) => { sell(st, { noodles: 1 }, 6); st.rep += 2; }, then: "She takes the cup, blows on it. 'I live upstairs. Walls are trash, so I come down.' A pause. 'Don't keep staring at the door. Starts looking like someone's standing there.'" },
        { label: "Give her a water", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 4; st.flags.kindZhou = true; }, then: "She blinks, still puts the noodle money down. 'I'll take the water. Gum next time.'" },
        { label: "Sold out", hideIf: (st) => hasStock(st, { noodles: 1 }), do: (st) => { missStock(st, 6); }, then: "'Fine.' She doesn't say more. After she goes, a little puddle in the shelf gap that won't wipe up." },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "？", time: 0 * 60 + 27, door: true, effect: "flicker",
      text: "Door opens. Bell doesn't ring. He stands on the mat, shirt stuck to him, hair still dripping.\n'Batteries. AA. Flashlight's dying.'",
      choices: [
        { label: "Sell batteries (¥12)", need: { battery: 1 }, do: (st) => { sell(st, { battery: 1 }, 12); st.flags.soldBattery = true; st.sanity -= 4; }, then: "He smiles. Teeth even. 'Thanks.' Water still dripping. You look down—mat is dry." },
        { label: "Don't sell. Ask him out", do: (st) => { st.flags.refusedWet = true; st.sanity -= 6; st.rep -= 2; }, then: "The smile stays. 'I'll come by tomorrow.' He goes. Rain still falling. His back dries first." },
        camChoice("camWet1", "Playback: nothing on the mat. Door opened. Nobody came in. You look up. He's still standing there."),
        { label: "Look again", look: (st) => st.upgrades.light ? "His shadow on the freezer always lags half a beat. Not a drop on the floor." : "Not a drop on the floor. Water beads fall off the cuff and vanish in the air.", afterLook: [
          { label: "Sell to him anyway", need: { battery: 1 }, do: (st) => { sell(st, { battery: 1 }, 12); st.flags.lookedWet = true; st.sanity -= 3; }, then: "Voice low: 'Like the view?' A damp bill pressed on the counter. You touch it. Dry." },
          { label: "Ask him to come in daylight", do: (st) => { st.flags.lookedWet = true; st.flags.refusedWet = true; st.cat += 4; }, then: "The cat stands up behind the cabinet and hisses. He glances at it, backs slowly outside." },
        ]},
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 10, door: true,
      text: "Flashlight taps his pants twice. 'Front cam glitched a frame. Water get in here?' He looks at the mat. 'I thought someone came in out of the rain.'",
      choices: [
        { label: "Say there was a wet-hair customer", do: (st) => { st.flags.toldWu = true; }, then: "He frowns, pulls up a blurry screenshot. Inside the glass door: empty. 'That glitch frame, door was shut.'" },
        { label: "Say no, it's been quiet", do: (st) => { st.rep += 1; }, then: "'Good. This alley loves false alarms after midnight.' At the door he turns. 'You're new—if the cat wants the door shut, shut it.'" },
        { label: "Offer him a water", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 3; }, then: "He cracks it, drinks. 'Thanks. I'll loop again after dawn.'" },
      ],
    },
    {
      scene: "interior", name: "Radio", tag: "05:46", time: 5 * 60 + 46,
      text: "Radio turns itself on. Announcer's throat dry: '...showers tonight into early morning, poor visibility. Drivers on the road—'\n'Watch for what' gets buried in static. On the alley billboard you can almost read two characters.",
      choices: [{ label: "Turn the lights up and wait for dawn", do: (st) => { st.sanity += 3; } }],
    },
  ];
}

function night2(s) {
  return [
    { type: "prep", time: 21 * 60 + 55, text: s.flags.shelfEmpty
      ? "The shop has a bit of your smell now: noodle lids, disinfectant, cat hair. Empty shelf still gapes. The rules slip is still in the drawer."
      : "The shop has a bit of your smell now: noodle lids, disinfectant, cat hair.\nThe rules slip is still in the drawer. Rule 5 blackened by a thumb." },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 22 * 60 + 21, door: true,
      text: s.flags.wangRegular
        ? "'The usual. Smokes, iced tea.' Money already counted. 'Anyone else come in after last night? I keep thinking someone's squatting in the alley.'"
        : "'Smokes, iced tea. Oh—you're new.' He spins the helmet in his hand.",
      choices: [
        { label: "The usual (¥22)", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.rep += 4; }, then: "He nods. 'I like a shop that doesn't talk.'" },
        { label: "Ask who's squatting in the alley", do: (st) => { st.flags.askedWang = true; }, then: "'Can't say. Old guy in black. Headlights hit him, he's gone.' He rubs his arm. 'Maybe my eyes.'" },
        { label: "Sold out", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => { missStock(st, 22); st.flags.missedWang = true; }, then: "He stands in the doorway two seconds. Raincoat rustles a long time." },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "？", time: 23 * 60 + 5, door: true, effect: "flicker",
      text: "She stands at the freezer a long time. Hair is dry. Still raining outside.\n'This strawberry milk. Any left?' Shelf only has plain.",
      choices: [
        { label: "Give her plain milk (¥6)", need: { milk: 1 }, do: (st) => { sell(st, { milk: 1 }, 6); st.flags.gaveMilkToBai = true; st.sanity -= 3; }, then: "She pays with a coin. Ice. No heat in the fingertips. 'Sweet's fine.'" },
        { label: "Say no strawberry", do: (st) => { st.flags.baiDenied = true; }, then: "'Yeah.' She watches her reflection in the glass. The reflection blinks half a second late. 'I'll wait then.'" },
        camChoice("lookedCamBai", "Playback: freezer door opens a crack by itself. Aisle empty. You look up. The woman is still there, nodding at you."),
        { label: "Look again", look: (st) => st.upgrades.light ? "No shadow under the lamp. A faint brown water stain inside the hem." : "Where she's standing, the lamp should have thrown a shadow on the shelf. Shelf has nothing.", afterLook: [
          { label: "Give her the milk anyway", need: { milk: 1 }, do: (st) => { sell(st, { milk: 1 }, 6); st.flags.gaveMilkToBai = true; }, then: "The coin in your palm seems to thaw, then freezes again." },
          { label: "Ask her to come after dawn", do: (st) => { st.flags.baiWaitDawn = true; st.cat += 5; }, then: "The cat jumps between her and you. She looks at it, smiles. 'It still knows me.' Bell doesn't ring when she leaves." },
        ]},
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "Taxi Chen", tag: "Taxi", time: 23 * 60 + 44, door: true, clue: "paperShop",
      text: "Gold chain, shirt buttons uneven, smoke mixed with car freshener. 'Water, and a pack of smokes. This alley tonight, gives you the creeps.' Offhand: 'You know this used to be a zhizha shop.'",
      choices: [
        { label: "Sell water + smokes (¥20)", need: { water: 1, cigs: 1 }, clues: ["paperShop", "lampBack"], do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); st.flags.heardZhizha = true; }, then: "'Paper people, paper horses. Busy around Qingming.' He cracks the bottle. 'Then it became a mart. People say the lamp here can't go out. It goes out, the old trade comes back.'" },
        { label: "Sell water only (¥2)", need: { water: 1 }, clues: ["paperShop"], do: (st) => { sell(st, { water: 1 }, 2); st.flags.heardZhizha = true; }, then: "He swears smokes are expensive, finishes the zhizha story anyway. Leaving, he knocks the frame. 'I'm telling you, peachwood beats a camera.'" },
        { label: "Ask about the zhizha shop", clues: ["paperShop", "bossGone", "rule2AfterHeng"], do: (st) => { st.flags.heardZhizha = true; st.sanity -= 2; }, then: "'Boss's name was Heng. Polite guy. One autumn he was just gone. Shop never sold.' Voice down. 'Rule 2 got added later. After Old Heng left. The joss-paper thing—don't take it serious.'" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "Return customer", time: 0 * 60 + 38, door: true,
      text: "Same wet shirt. Now a clear plastic bag. 'Three sandalwood sticks. House is damp.' He blinks. A drop falls off a lash. Floor is dry.",
      choices: [
        { label: "Sell three sticks (¥24)", need: { incense: 3 }, do: (st) => { sell(st, { incense: 3 }, 24); st.flags.soldIncenseToWet = true; st.sanity -= 8; }, then: "He stands each stick in the bag. 'Smells good lit. You could try.'" },
        { label: "Sell one", need: { incense: 1 }, do: (st) => { sell(st, { incense: 1 }, 8); st.flags.soldIncenseToWet = true; st.sanity -= 3; }, then: "'One's fine. Slow and steady.' The smile gets wider." },
        camChoice("camWet2", "On cam he never came in. The bag sits on the mat by itself. Blink: he's at the counter."),
        { label: "Don't sell incense", do: (st) => { st.flags.refusedIncense = true; st.cat += 6; }, then: "The cat weaves past his feet and blocks the shelf. He looks at the cat, at you: 'Candles then.' Doesn't wait. A wet bill on the counter, and he's gone. Money is dry." },
      ],
    },
    {
      scene: "interior", name: "Shop cat", tag: "Something's wrong", time: 1 * 60 + 2,
      text: "Incense not even back. The cat swipes the box to the floor. Thin sticks roll. One snaps. Break is black.",
      choices: [
        { label: "Pick it up. Back on the shelf", do: (st) => { st.flags.keptBurnt = true; }, then: "The broken stick smells sweet. Not sandalwood. Burnt-sugar sweet." },
        { label: "Throw the broken one out", do: (st) => { st.flags.threwIncense = true; st.cat += 7; st.sanity += 3; }, then: "The cat watches you bin the broken stick, then lies down." },
        { label: "Feed the cat", showIf: (st) => st.upgrades.catfood || st.stock.milk > 0, do: (st) => { if (!st.upgrades.catfood && st.stock.milk > 0) takeStock(st, { milk: 1 }); st.cat += 10; st.flags.fedCat = true; }, then: "Ugly eater. After, tail sweeps the counter front, then it lies down." },
      ],
    },
    {
      scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 2 * 60 + 18, door: true,
      text: "'Can't sleep. Came down for salt.' Voice drops. 'That white dress just now—looked like Xiao Ya from next door who moved.'\n'Xiao Ya, three years ago she... ah. Old people talk. Don't listen.'",
      choices: [
        { label: "Sell salt? No salt on the shelf. Give her water", need: { water: 1 }, do: (st) => { sell(st, { water: 1 }, 2); st.flags.linWarned = true; }, then: "She takes the water, doesn't rush. 'If she comes again, don't walk her home. That building's been torn down.'" },
        { label: "Ask who Xiao Ya is", do: (st) => { st.flags.knowXiaoya = true; st.sanity -= 2; }, then: "'Home from university. Raining that night too. People say she went down for milk and never came back up.' Auntie Lin rubs her eyes. 'I looked wrong, that's all.'" },
        { label: "Walk her to the door", do: (st) => { st.rep += 4; st.cat += 2; }, then: "Rain eases. No white dress in the alley. Auntie Lin's umbrella keeps shaking." },
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night3(s) {
  return [
    { type: "prep", time: 21 * 60 + 58, text: s.flags.shelfEmpty
      ? "First thing you do is check the till, then the empty shelf. Ice coin still there. The gap looks like someone stood in it."
      : "First thing you do is check the till. Last night's ice coin still there. Hasn't melted. No fingerprints.\nThe cat's been at the rules. Rule 2 on top. Pencil 'joss paper doesn't count' showing again." },
    { type: "phone", from: "Boss", text: "Customer said you're polite. Keep it up. Take whatever they give. Don't get picky verifying bills. Daytime I'm not here. Don't look for me." },
    {
      scene: "interior", portrait: "zhou", name: "Zhou Xiaowan", tag: "Upstairs", time: 22 * 60 + 33, door: true,
      text: "She doesn't buy anything. Half a cup of noodle broth on the counter corner. 'I dreamed I worked here. Lights were green. Nobody talked.'\n'Old man in the dream too. Money he gave was red.'",
      choices: [
        { label: "Tell her to go back to sleep", do: (st) => { st.flags.zhouDream = true; st.rep += 2; }, then: "'I'll try.' She looks at the cat. 'It was in the dream. It wouldn't let me count money.'" },
        { label: "Ask what the old man looked like", do: (st) => { st.flags.zhouDream = true; st.sanity -= 3; }, then: "'Zhongshan suit. Very polite. Told me not to be scared.' She smiles. Eyes don't. 'When I woke up my mouth tasted like sandalwood.'" },
        { label: "Give her a milk", need: { milk: 1 }, do: (st) => { takeStock(st, { milk: 1 }); st.flags.kindZhou = true; st.rep += 4; }, then: "'Save it for daytime.' She holds the milk." },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "Return customer", time: 23 * 60 + 11, door: true,
      text: "'Last night's milk was sweet.' She puts a hand on the freezer door. Leaves a white print. 'Tonight I want it salty.'",
      choices: [
        { label: "Give her iced tea (¥4)", need: { tea: 1 }, do: (st) => { sell(st, { tea: 1 }, 4); st.flags.baiSalty = true; }, then: "She cracks it, drinks. 'That's it. River tastes like this too.'" },
        { label: "Give her bottled water (¥2)", need: { water: 1 }, do: (st) => { sell(st, { water: 1 }, 2); }, then: "She shakes her head, drinks anyway. 'A bit thin. Thanks for not lying.'" },
        { label: "Ask if she wants to go home", do: (st) => { st.flags.offeredBaiHome = true; st.sanity -= 4; }, then: "'Home's gone.' Flat. 'I just came to buy. I buy, I go.' She looks at you. 'Don't take what you shouldn't. You take it, you don't leave.'" },
        camChoice("camBai3", "On cam, nobody at the freezer. A coin stands on the floor, spinning."),
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 23 * 60 + 50, door: true,
      text: s.flags.wangRegular
        ? "'The usual—wait, water first.' He swallows. 'Bike's at the alley mouth. I keep thinking someone's in the back seat. I look, nobody.'"
        : "'Smokes restocked? Last night I struck out.' He swallows. 'Bike's at the alley mouth. I keep thinking someone's in the back seat. I look, nobody.'",
      choices: [
        { label: "Sell water + smokes (¥20)", need: { water: 1, cigs: 1 }, do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); }, then: "He drains half the bottle. 'Back in ten. If I'm not—brace the door from inside.'" },
        { label: "Sold out", hideIf: (st) => hasStock(st, { water: 1, cigs: 1 }), do: (st) => { missStock(st, 20); st.flags.missedWang = true; }, then: "He stands in the doorway two seconds. Raincoat rustles. Regulars bounce off an empty shelf. Next time they won't detour." },
        { label: "Let him sit a while", do: (st) => { st.rep += 3; st.flags.wangSat = true; }, then: "He drops onto the green plastic stool and smokes. Smoke goes up, hits the tube, vanishes. Ten minutes later he puts money down and leaves. No thanks." },
        { label: "Look again", look: "Through the glass: his e-bike. Back-seat pad is dented." },
      ],
    },
    {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "New customer", time: 0 * 60 + 13, door: true, effect: "flicker",
      text: "This time the bell rings all the way. He nods at the cat first, then you. Gray hair combed strict.\n'Three incense, one iced tea. Money's here. Keep the change.'\nA stack of red paper on the counter. Gold on the corners. Characters faint in the middle.",
      choices: [
        { label: "Take it. Give him incense and tea", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 0); st.cash += 0; st.flags.soldJoss = true; st.sanity -= jossSanityCost(st, false); st.flags.jossOnCounter = true; }, then: "Red paper into the till. Fingertips warm, then cold. He takes the incense. 'Business will get better.'" },
        { label: "Don't sell. Take the money back", do: (st) => { st.flags.refusedJoss = true; st.cat += 8; st.sanity -= 4; }, then: "He isn't angry. 'I'll come tomorrow.' Red paper folded in his hand again, thinner than when he put it down." },
        { label: "Hang the peachwood on the counter", showIf: (st) => st.upgrades.peach, do: (st) => { st.flags.peachOnCounter = true; st.flags.refusedJoss = true; st.sanity += 2; }, then: "Peachwood touches red paper, a small sound. He looks at the charm. 'Rules still here.' He steps to the door. Not a drop on his shoulder." },
        camChoice("camOld3", "Bell already rang. Picture shows the counter empty. Red paper is already by your hand."),
        { label: "Look at the red stack again", look: "This isn't yuan. It's joss paper. Top sheet: payee is your name. The hand looks like Rule 2.", afterLook: [
          { label: "Take it anyway", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 0); st.flags.soldJoss = true; st.flags.sawOwnName = true; st.sanity -= jossSanityCost(st, true); }, then: "When it goes in the till, the name fades." },
          { label: "Push the joss paper back. Don't sell", do: (st) => { st.flags.refusedJoss = true; st.flags.sawOwnName = true; st.cat += 10; }, then: "The cat jumps on the counter, sits between you and the red paper. The old man smiles. 'Cat remembers better than people.'" },
          { label: "Ask why my name is on it", clues: ["needRelief"], do: (st) => { st.flags.sawOwnName = true; st.flags.askedName = true; st.sanity -= 8; }, then: "'Night shift always needs a taker.' He says, 'You take it, you agree. You don't, the lamp's still his.' He points at the red sign outside." },
        ]},
      ],
    },
    {
      scene: "interior", name: "Tube", tag: "00:31", time: 0 * 60 + 31, effect: "flicker",
      text: "Lamp flickers three times. Freezer stops a second, hums again. A bit of red leaks from the till seam.\nYou don't count.",
      choices: [
        { label: "Don't count", do: () => {}, then: "You remember Rule 5." },
        { label: "Open a crack anyway", do: (st) => { st.flags.countedEarly = true; st.sanity -= 10; }, then: "The top sheet isn't tonight's take. Joss paper with a burnt edge. No name on it." },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Back again", time: 0 * 60 + 52, door: true,
      text: "He almost hits the door coming in, helmet still on. 'Old guy squatting at the door. I hit him with the headlight—' He gestures. 'Gone. Two wet prints on the mat, coming in. None going out.'",
      choices: [
        { label: "Have him check for a third person", do: (st) => { st.flags.wangSawOld = true; }, then: "Aisle, back room, cam blind spots. Only the cat. The two prints at the door are fading. Cat's tail tied itself in a knot." },
        { label: "Say the old man already left", showIf: (st) => st.flags.soldJoss || st.flags.refusedJoss, do: (st) => { st.flags.wangSawOld = true; }, then: (st) => st.flags.soldJoss ? "Wang stares at your till a long time. 'Left is good.'" : "'Good.' He lets out a breath. 'I thought he came to collect the shop.'" },
        { label: "Ask him to deliver after dawn", do: (st) => { st.rep += 2; }, then: "'Fine.' At the door he comes back, leaves an unopened pack of gum. 'Something in the stomach. Don't live on iced tea.'" },
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 8, door: true,
      text: s.rep >= 60 && !s.flags.aidBlocked
        ? "He doesn't rush out. Flashlight taps the glass twice. 'Alley cam glitched again. Between us—before dawn, three taps on the glass, that's me. Four, don't answer. Don't open.'"
        : "He pauses at the door. 'Loop's done. You're fine. Lamp on.' Light on the mat, he's already crossing the street.",
      choices: s.rep >= 60 && !s.flags.aidBlocked ? [
        { label: "Note it. Take his spare flashlight", do: (st) => { st.flags.gotFlashlight = true; st.flags.wuFlashlight = true; st.flags.wuStay = true; st.rep += 2; }, then: "Flashlight's heavy, switch stiff. 'You bought me water. Hold this. Don't sell the batteries.'" },
        { label: "Just the warning. Keep the light", do: (st) => { st.flags.wuWarned = true; st.rep += 1; }, then: "'Fine.' He nods. 'Three is me. Don't mix it up.'" },
      ] : [
        { label: "Say you got it", do: (st) => { st.flags.wuWarned = true; }, then: "He's already in the rain. Light sweeps the sign. Characters still unreadable." },
        { label: "Offer him a water", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 3; }, then: "He cracks it, drinks. 'Thanks. Another run across the street.'" },
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night4(s) {
  return [
    { type: "prep", time: 21 * 60 + 52, text: s.flags.soldJoss
      ? "Till heavier than yesterday. You didn't dare open it. Fingers stop on the lock.\nBoss's text lands first."
      : "Fourth night. Key takes two turns to open the door." },
    { type: "phone", from: "Boss", text: s.flags.refusedJoss
      ? "Customer said you check bills too hard. Don't check them out the door. Night shift hates an empty counter."
      : "Not bad. Numbers look good. Don't close early. Don't let the cat block business." },
    {
      scene: "interior", portrait: "wet", name: "Wet-Hair Man", tag: "He's back", time: 22 * 60 + 40, door: true,
      text: "This time he buys nothing. Water still dripping, floor still dry. 'Borrow the back room. I need to change.'\nHe points at the staff curtain. It says STAFF ONLY. A new sticky note on the edge, written later.",
      choices: [
        { label: "Let him in", do: (st) => { st.flags.letWetBack = true; st.sanity -= 16; st.cat -= 8; }, then: "Curtain up, curtain down. No water sound inside. Ten minutes. He doesn't come out. Back room only has your jacket. A wet badge in the pocket, name field blank." },
        { label: "Follow the sticky note. Let him in back", do: (st) => { st.flags.letWetBack = true; st.flags.followedSticky = true; st.sanity -= 18; st.cat -= 10; }, then: "You lift the curtain per the new note. No water sound. Ten minutes. He doesn't come out. Back room only has your jacket. Wet badge in the pocket, name blank. The note falls by itself, writing down." },
        { label: "No. Back room isn't public", do: (st) => { st.flags.blockedWet = true; st.cat += 8; st.sanity += 2; }, then: "He nods, almost pleased. 'Rules still here. Good.' He buys a pack of candles. This time the money makes change." },
        { label: "See what the cat does", do: (st) => { st.flags.trustedCat = true; if (st.cat >= 40) { st.flags.blockedWet = true; st.cat += 6; } else { st.flags.letWetBack = true; st.sanity -= 10; } }, then: (st) => st.flags.blockedWet
          ? "The cat lies across the curtain, fur out. The man steps back. 'Fine. Listen to it.'"
          : "The cat just looks at you. You lift the curtain anyway. Light inside flashes on, dies. The man is already behind you. 'Thanks.'" },
        camChoice("camWet4", "Staff-cam: curtain hanging the whole time. Nobody walked into the back."),
      ],
    },
    {
      scene: "interior", name: "Inside", tag: "Gap", time: 23 * 60 + 2,
      text: "Rain eases a while. Freezer makes that sound again—like expired yogurt.",
      choices: [
        { label: "Wipe the counter. Listen to the radio", do: (st) => { st.sanity += 4; }, then: "The announcer finishes the weather. No static at all." },
        { label: "Pour the cat some hot water", do: (st) => { st.cat += 4; st.sanity += 2; }, then: "It doesn't drink. Puts a paw on the back of your hand." },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "Third time", time: 23 * 60 + 28, door: true,
      text: "She pushes a steel lunchbox over. White frost on the lid. 'Heat this for me.'\nThe box is light. Too light for food.",
      choices: [
        { label: "Put it in the microwave", do: (st) => { st.flags.heatedAsh = true; st.sanity -= 12; }, then: "Turntable thirty seconds. Open it—cold ash, three spent incense stuck in it. The room fills with sweet burnt smell. She says, 'It's done.'" },
        { label: "Don't heat it. Take it back", do: (st) => { st.flags.refusedAsh = true; st.sanity -= 3; }, then: "'Right.' She takes the box. 'I'll figure it out.'" },
        { label: "Let the cat smell it", do: (st) => { st.flags.catAsh = true; st.cat += 4; st.flags.refusedAsh = true; }, then: "The cat hisses at the box, backs behind the scanner. She looks at the cat. 'It didn't used to do that.' She takes the box and leaves." },
        { label: "Ask if she's Xiao Ya", showIf: (st) => st.flags.knowXiaoya || st.flags.linWarned, do: (st) => { st.flags.calledXiaoya = true; st.sanity -= 5; }, then: "She stops. 'That name's for daylight.' The tube pops. 'You say it at night, I'll think you're walking me out.'" },
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "Guard Wu", tag: "Alley mouth", time: 1 * 60 + 16, door: true,
      text: "He doesn't come in. Hand on the glass. 'I checked the roster. Night shift here's just you.' Light on your face. 'I just saw two people behind the counter.'",
      choices: [
        { label: "Let him in and count heads", do: (st) => { st.sanity -= 6; }, then: "He comes in. Light across the freezer glass. Your reflection in the glass raises a hand half a beat late. Wu kills the light. '...I'll pretend I didn't.'" },
        { label: "Say it's a reflection", do: (st) => { st.rep += 1; }, then: "'Fine. Reflection.' He draws a circle in the notebook, crosses it out. 'I'm at the alley mouth till dawn. Need someone, three taps on the glass.'" },
        { label: "Show him the store rules", showIf: (st) => st.foundRules, clues: ["countTrap"], do: (st) => { st.flags.wuReadRules = true; }, then: "He reads Rule 5, gives the slip back. 'My dad odd-jobbed at the zhizha shop. He said people who count joss paper belong to the shop by dawn.'" },
        { label: "Ask him to hold the alley till dawn", showIf: (st) => st.rep >= 68, do: (st) => { st.flags.wuStay = true; st.flags.wuFlashlight = true; }, then: "He puts the spare flashlight on the counter. Heavy. 'You bought me water. I won't cross the street tonight.'" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "Taxi Chen", tag: "Taxi", time: 3 * 60 + 5, door: true,
      text: "'I looped three times. Your alley got long tonight.' Car keys on the counter, picked up again. 'Meter spat an address I've been to. Place is already torn down. I didn't go.'",
      choices: [
        { label: "Sell him water and smokes", need: { water: 1, cigs: 1 }, do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); }, then: "First drag, his shoulders drop. 'I'll run this job two more days. Then I'm out of the city.'" },
        { label: "Sold out", hideIf: (st) => hasStock(st, { water: 1, cigs: 1 }), do: (st) => { missStock(st, 20); }, then: "He glances at the gap. 'Fine. I'll skip this alley more.' Keys spin in his hand." },
        { label: "Ask him to drive you out at dawn", do: (st) => { st.flags.askedRide = true; }, then: "He looks at you a long time. 'Fine. Last night, six, alley mouth. You don't come out, I never said this.'" },
        { label: "Ask if that address is Xiao Ya's", showIf: (st) => st.flags.knowXiaoya, do: (st) => { st.flags.taxiAddress = true; }, then: "His face goes white. 'You know too. Then don't go. You go, someone has to come back and take the shift.'" },
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night5(s) {
  const climax = [];
  const storm = s.weather === "storm";
  climax.push({ type: "prep", time: 21 * 60 + 48, text: storm
    ? (s.flags.stockouts >= 2
      ? "Fifth night. Rain hitting the sign. A stretch of shelf empty. Boss text is four characters: Storm tonight."
      : "Fifth night. Rain thicker than the ones before. Boss text: Storm tonight. Noodles will move fast. Umbrellas—we never stocked those.")
    : (s.flags.stockouts >= 2
      ? "Fifth night. Contract says a week's trial. A stretch of shelf empty. The gap faces the aisle like it's waiting for someone to stand in it."
      : "Fifth night. Contract says a week's trial. Keys still hot.\nA stretch of shelf empty. You remember restocking.") });

  climax.push({
    scene: "interior", portrait: "lin", name: "Auntie Lin", tag: "Regular", time: 22 * 60 + 26, door: true,
    text: s.flags.servedLin
      ? "She doesn't buy anything. 'I came to see if you're still here.' Two peaches in the bag. 'Eat after dawn. Not in the shop.'"
      : "She stands in the door, doesn't come in. 'You people are always out. I won't add to it.' Umbrella tip taps. She's gone.",
    choices: s.flags.servedLin ? [
      { label: "Take the peaches", do: (st) => { st.flags.gotPeachFruit = true; st.sanity += 6; st.rep += 3; }, then: "Peaches are fuzzy, heavy. In the pocket they warm up fast." },
      { label: "Tell her to stop going out at night", do: (st) => { st.rep += 4; }, then: "'Just walking.' She pats the back of your hand. 'Alley's still here. You can leave.'" },
    ] : [
      { label: "Watch her go", do: (st) => { st.rep -= 2; }, then: "Only umbrella sound in the alley. No peaches in the drawer." },
    ],
  });

  climax.push({
    scene: "interior", portrait: "zhou", name: "Zhou Xiaowan", tag: "Upstairs", time: 23 * 60 + 2, door: true,
    text: "'I broke the lease. Ticket's moved to the day trial ends.' She puts a pack of gum on the counter. 'Like I said. If you go too—don't look back at the sign.'",
    choices: [
      { label: "Wish her a clean trip", do: (st) => { st.flags.zhouLeft = true; st.rep += 3; }, then: "She nods. 'I'm off. You get some rest too.'" },
      { label: "Ask if you can go together", do: (st) => { st.flags.zhouWait = true; }, then: "'Last night, six, alley mouth. Chen's car.' A pause. 'That's the one we wait for.'" },
    ],
  });

  if (storm) {
    climax.push({
      scene: "interior", name: "Rain-Soaked Man", tag: "Storm", time: 23 * 60 + 14, door: true,
      text: "Coat dripping. Mat only wets a little. 'Two braised beef. Umbrella—you got umbrellas.' He wipes his face. 'No umbrella's fine. Just the noodles.'",
      choices: [
        { label: "Sell two noodles (¥12)", need: { noodles: 2 }, do: (st) => { sell(st, { noodles: 2 }, 12); st.flags.soldStormNoodles = true; st.rep += 2; }, then: "He doesn't ask for an umbrella. Two cups into his coat, out in the rain before the bell finishes." },
        { label: "Only got one (¥6)", need: { noodles: 1 }, hideIf: (st) => hasStock(st, { noodles: 2 }) || !hasStock(st, { noodles: 1 }), do: (st) => { sell(st, { noodles: 1 }, 6); st.rep += 1; }, then: "'One's fine.' He clicks his tongue. Money hits faster than he does." },
        { label: "No noodles. No umbrellas either", hideIf: (st) => hasStock(st, { noodles: 1 }), do: (st) => { missStock(st, 12); st.flags.missedStorm = true; }, then: "'No noodles in a storm?' He stands at the gap two seconds. When the bell rings, a puddle is on the counter." },
      ],
    });
  }

  climax.push({
    scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Delivery", time: 23 * 60 + 28, door: true,
    text: s.rep >= 70 && !s.flags.aidBlocked
      ? "He doesn't light up. 'I'm out of the city tomorrow. If you want out too, last night, four, alley mouth. One car.' He pushes the helmet up. 'Don't tell anyone. Nobody in the back seat.'"
      : (s.flags.wangRegular
        ? "'The usual.' He's counting money, raincoat still dripping. 'Tonight's all noodles. You stocked?'"
        : "He pauses at the door, doesn't come in much. 'Smokes left? Forget it. Asking doesn't mean you have them.'"),
    choices: s.rep >= 70 && !s.flags.aidBlocked ? [
      { label: "Note it. Alley mouth, last night", do: (st) => { st.flags.gotRide = true; st.flags.wangRide = true; st.rep += 2; }, then: "'Four. When the lamp goes that blue-white, you come out. Don't look back at the sign.'" },
      { label: "Say you haven't decided to leave", do: (st) => { st.rep += 1; }, then: "'Fine.' He buys smokes. Doesn't mention the car again when he goes." },
      { label: "Sell smokes + iced tea (¥22)", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); }, then: "He nods. Doesn't mention the car, like saying it more would unmake it." },
    ] : [
      { label: "The usual, smokes + iced tea (¥22)", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.rep += 2; }, then: "'Thanks.' Helmet on, already in the rain." },
      { label: "Sold out", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => { missStock(st, 22); st.flags.missedWang = true; }, then: "He stands in the doorway two seconds. Raincoat rustles. Regulars bounce off an empty shelf. Next time they won't detour." },
      { label: "Let him come in out of the rain", do: (st) => { st.rep += 2; st.flags.wangSat = true; }, then: "He leans on the freezer for half a cigarette. Leaves without buying. 'Your lamp's jumping tonight.'" },
    ],
  });

  if (s.flags.gaveMilkToBai || s.flags.offeredBaiHome || s.flags.calledXiaoya || s.flags.baiWaitDawn) {
    climax.push({
      scene: "interior", portrait: "bai", name: "White-Dress Woman", tag: "Xiao Ya", time: 23 * 60 + 47, door: true,
      text: "She puts the ice coin back on the counter. 'Last time tonight. If you walk me, walk me to the door. Don't cross the waterline.'\nPuddle outside holds the red sign.",
      choices: [
        { label: "Walk her to the door. No further", do: (st) => { st.flags.helpedBai = true; st.sanity += 4; st.cat += 6; }, then: "When she crosses the mat, rain wets the skirt for the first time. She looks back, mouth moving. It's 'thanks,' not 'stay.'" },
        { label: "Cross the waterline with her", do: (st) => { st.flags.followedBai = true; st.sanity -= 20; }, then: "Water over the shoe, ice to the bone. You look back—shop lamp still on. Someone behind the counter. Same stance as you." },
        { label: "Don't walk her. Let her go", do: (st) => { st.flags.ignoredBai = true; st.sanity -= 4; }, then: "'Fine.' Coin stays on the counter. After a while it's just an ordinary yuan." },
        camChoice("camBai5", "Nobody on the waterline outside. Only the skirt, walking forward by itself on the cam."),
      ],
    });
  }

  climax.push({
    scene: "interior", name: "Inside", tag: "Gap", time: 1 * 60 + 10,
    text: "Past two. Freezer hums, stops. No cars in the alley. Cat on the scanner, one ear ticks.",
    choices: [
      { label: "Wipe the front glass", do: (st) => { st.sanity += 2; }, then: "Alley empty. Your own face on the glass. The reflection isn't late." },
      { label: "Sit and wait", do: (st) => { st.cat += 2; }, then: "The cat drops its tail on your wrist. Rain still going." },
    ],
  });

  return climax;
}

function night6(s) {
  return [
    { type: "prep", time: 21 * 60 + 50, text: s.flags.soldJoss
      ? "Sixth night. Till heavier than yesterday. A power-bill dunning in the drawer, meaner than the nights before. A hard ledger under the counter. Cover says NIGHT SHIFT IN/OUT."
      : "Sixth night. A power-bill dunning in the drawer, meaner than the nights before. A hard ledger under the counter. Cover says NIGHT SHIFT IN/OUT. Ink is dry." },
    { type: "phone", from: "Boss", text: "Don't close early tonight. What's extra in the drawer isn't for you to take." },
    {
      scene: "interior", name: "Ledger", tag: "Night Shift In/Out", time: 22 * 60 + 12, clue: "ledger",
      text: "Page after page of night-shift stock. Sandalwood, batteries, iced tea. Dates from three years ago to last week. Hands change. Last page already has your name. Stock column empty. Handoff column empty. Date is tonight.",
      choices: [
        { label: "Close the ledger", do: (st) => { st.flags.sawLedger = true; st.sanity -= 4; }, then: "Shut it, it's still there. Cover feels hot." },
        { label: "Write tonight's numbers in the stock column", do: (st) => { st.flags.sawLedger = true; st.flags.wroteLedger = true; }, then: "Pen's slippery. Numbers done, a small line by the name: ON SHIFT." },
        { label: "Flip to earlier pages", clues: ["ledger", "oldLedger"], do: (st) => { st.flags.sawLedger = true; st.flags.readOldLedger = true; st.sanity -= 6; }, then: "Three years back: milk and batteries. Handoff name is a woman's. Ink bled to the next line. The cat sat on that page." },
        { label: "See what the cat says", do: (st) => { st.flags.sawLedger = true; st.flags.trustedCat = true; st.cat += 3; }, then: "The cat sits on the last page. Tail sweeps your name again and again." },
      ],
    },
    {
      scene: "interior", name: "Store rules", tag: "New marks", time: 22 * 60 + 48,
      text: "The cat dragged the oil paper to your feet. Scratch marks under Rule 5, fibers up. The pencil 'joss paper doesn't count' by Rule 2 has been scraped with a nail. The words are still there.",
      choices: [
        { label: "Press the slip back", do: (st) => { st.flags.catScratchedRules = true; }, then: "Press it back like you didn't see. The cat rolls at your feet." },
        { label: "Follow the scratches", do: (st) => { st.flags.catScratchedRules = true; st.sanity -= 3; }, then: "Not random. It circled 'Don't count joss paper before dawn.'" },
        { label: "Pour the cat some water", do: (st) => { st.flags.catScratchedRules = true; st.cat += 4; }, then: "It doesn't drink. Noses the slip, then the till." },
      ],
    },
    s.flags.soldJoss ? {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "He's back", time: 0 * 60 + 8, door: true,
      text: "'Those three sticks yesterday. You light them?' Both hands behind his back.",
      choices: [
        { label: "Say you didn't", do: (st) => { st.sanity -= 4; }, then: "'Good. You light them, someone has to watch.' He looks at your chest—no badge. 'There will be, soon.'" },
        { label: "Ask what he actually wants", clues: ["needRelief"], do: (st) => { st.flags.askedOldWant = true; }, then: "'Someone who'll keep the lamp on till dawn.' He smiles. 'Don't be scared. Not a threat. It's a hire.'" },
        { label: "Give the joss paper back", do: (st) => { st.flags.returnedJoss = true; st.sanity += 6; st.flags.soldJoss = false; st.flags.refusedJoss = true; }, then: "The red stack in the till is thinner than you remember. You still pull it out and push it back. He catches it. 'Late. Still. The rule takes this step.'" },
      ],
    } : {
      scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Second visit", time: 0 * 60 + 8, door: true,
      text: "This time he puts down two old one-yuan notes, edges fuzzy. 'Still three incense, one iced tea. This kind spends.'",
      choices: [
        { label: "Sell it as a normal ticket (¥28)", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 28); st.flags.soldRealToOld = true; st.rep += 3; }, then: "The portrait on the one-yuan goes green under the lamp. He nods. 'Tomorrow's the last night. Stay or go, your call.'" },
        { label: "Still don't sell", do: (st) => { st.flags.refusedTwice = true; st.cat += 5; }, then: "'Fine.' He takes the ones back, leaves one on the counter. 'That one's for your nerve. No change.' You blink, it's a receipt." },
        { label: "Ask what the sign says", do: (st) => { st.flags.askedSign = true; }, then: "'The one you're seeing isn't for people.' He points outside. 'The four characters for people, you wait till dawn.'" },
      ],
    },
    {
      type: "phone", from: "Unknown number", text: "Don't open the door.",
    },
    {
      scene: "interior", name: "Doorbell", tag: "01:40", time: 1 * 60 + 40, door: true, effect: "flicker",
      text: "Text still lit. Bell already ringing. Someone's face on the glass. Features smeared by steam—smeared into your outline.",
      choices: [
        { label: "Open it", do: (st) => { st.flags.openedSelf = true; st.sanity -= 14; }, then: "Nobody outside. A pair of prints on the mat, your shoe, a size bigger. Wind knocks the rules to the floor." },
        { label: "Don't. Three taps, call the guard", do: (st) => { st.flags.knockedWu = true; st.sanity += 2; }, then: "You tap three times. Wu's light sweeps from the alley mouth. The face on the glass breaks into drops. Alley empty." },
        { label: "Shine the flashlight outside", showIf: (st) => st.flags.wuFlashlight, do: (st) => { st.flags.knockedWu = true; st.sanity += 3; }, then: "Hard light on the glass. The face has no shadow. It backs slowly into the rain." },
        { label: "Ask the cat whether to open", do: (st) => { st.flags.trustedCat = true; st.cat += 4; if (st.cat >= 50) st.flags.knockedWu = true; else { st.flags.openedSelf = true; st.sanity -= 8; } }, then: (st) => st.flags.openedSelf
          ? "The cat doesn't move. You open anyway. Outside only rain, and a very small 'thanks.' That's your voice."
          : "The cat butts your hand off the lock. The face outside backs into the rain on its own." },
        camChoice("camDoor", "Front cam glitches. In the glitch, a mouth saying 'Welcome.'"),
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night7(s) {
  const climax = [];
  climax.push({ type: "prep", time: 21 * 60 + 48, text: s.flags.stockouts >= 2
    ? "Last night. Contract says seven days' trial. A stretch of shelf empty. The gap faces the aisle like it's waiting for someone to stand in it."
    : "Last night. Contract says seven days' trial. Keys hot in your hand.\nA stretch of shelf empty. You remember restocking." });

  if (s.sanity < 28) {
    climax.push({
      scene: "interior", name: "You", tag: "Off", time: 22 * 60 + 10,
      text: "Iced tea's gone. Your lip print on the cup. Blink, the cup is full again.\nThe radio starts giving the time in your voice.",
      choices: [{ label: "Unplug the radio", do: (st) => { st.sanity -= 4; }, then: "After you unplug it, the time-call keeps going from the freezer." }],
    });
  }

  climax.push({
    scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Handoff", time: 0 * 60 + 52, door: true, clue: "bossNotOwner",
    text: "He doesn't buy. Keys spin on his finger, then down. 'Who hired you isn't the owner. He's last shift. The red stack in the drawer—he didn't dare count. Count it, you don't walk out. So he threw you the keys.'",
    choices: [
      { label: "Ask who's boss now", do: (st) => { st.flags.oldRevealedBoss = true; }, then: "''Boss' is a word last shift taught you.' He taps the lamp. 'Lamp's on, this shift isn't handed off.'" },
      { label: "...say nothing", do: (st) => { st.flags.oldRevealedBoss = true; }, then: "He doesn't push. Rain on the glass, one hit at a time." },
      { label: "Look at the cat", do: (st) => { st.flags.oldRevealedBoss = true; st.cat += 2; }, then: "Fur not out. It looks at the old man like it looks at someone it knows." },
    ],
  });

  climax.push({
    scene: "interior", name: "Store rules", tag: "Handoff", time: 1 * 60 + 4,
    text: "The oil paper's been pulled from the drawer. Next shift will see it first. Lamp's on, you can still touch this paper—the marks, not the original lines.",
    choices: [
      { label: "Leave all five original lines", do: (st) => { adjudicateRules(st, "keepAll"); }, then: "You press the oil paper back. Next shift still sees these five." },
      { label: "Peel Rule 2 and the sticky note", do: (st) => { adjudicateRules(st, "dropTrap"); st.sanity += 2; }, then: "Rule 2's fibers lift. Original still underneath. You only peeled the layer they added. The cat sits up on the counter." },
      { label: "Trace Rule 5 back", do: (st) => { adjudicateRules(st, "fixFive"); }, then: "You black out 'You can count it before dawn.' Rule 5 is the old sentence again." },
      { label: "Leave it blank for the next shift", do: (st) => { adjudicateRules(st, "blank"); st.sanity -= 4; }, then: "Oil paper flipped. Signatures on the back still there. Front you didn't write." },
    ],
  });

  climax.push({
    scene: "interior", name: "Till", tag: "Handoff", time: 1 * 60 + 8,
    text: "Money in the drawer still warm. Next shift will touch this drawer first. Lamp's on, you can still decide if this money stays.",
    choices: [
      { label: "Leave the money for the next shift", do: (st) => { st.flags.leftCash = true; st.cash = 0; st.cat += 4; st.sanity += 2; }, then: "You push the drawer shut. Cat puts its tail on the till. Pockets empty. Steps a little lighter." },
      { label: "Take the money", do: (st) => { st.flags.tookCash = true; st.sanity -= 4; st.cat -= 2; }, then: "Bills in your pocket. Tube pops. The cat jumps off the counter." },
    ],
  });

  climax.push({
    scene: "interior", portrait: "old", name: "Old Man in Zhongshan Suit", tag: "Settle up", time: 1 * 60 + 12, door: true, effect: "flicker",
    text: s.flags.soldJoss
      ? "'The name was written already.' He pushes over a thin attendance book, night-shift column only. 'You sign, the lamp's yours.'"
      : "'Seven nights.' He looks at the lamp, the cat, you. 'You can go. Before you go, give the lamp to someone who'll keep it on. Or give it to the cat.'",
    choices: s.flags.soldJoss && !s.flags.returnedJoss ? [
      { label: "Sign and stay", do: (st) => { st.flags.signedOn = true; st.sanity -= 10; }, then: "Pen's very slippery. The name writes itself. You blink. Aisle only smells like rain." },
      { label: "Push the book back", do: (st) => { st.flags.refusedSign = true; st.sanity -= 6; }, then: "Ink blooms into a name you didn't write. The old man sighs. 'Then we find someone else.'" },
      { label: "Give the book to the cat", showIf: (st) => st.cat >= 62, do: (st) => { st.flags.catTakesShop = true; st.cat += 8; }, then: "The cat steps on it, leaves a wet paw. The old man laughs. 'Fine. It's been on this job longer than you.'" },
      camChoice("camOld5", "On cam the book is closed. No old man at the counter. Only your own hand, hanging over a pen."),
    ] : [
      { label: "Put the keys down. Walk out at dawn", do: (st) => { st.flags.leaveAtDawn = true; }, then: "Keys hit the counter, a small sound. The cat wraps its tail around them." },
      { label: "Stay on night shift", do: (st) => { st.flags.stayOn = true; }, then: "The old man doesn't say yes or no. Tube stops flickering. 'From the eighth night on, there is no eighth night. There's only tonight.'" },
      { label: "Let the cat watch the shop", showIf: (st) => st.cat >= 72, do: (st) => { st.flags.catTakesShop = true; }, then: "The cat jumps into that counter spot. The old man steps outside. The red sign lights clear for a second: Hengdeng." },
      camChoice("camOld5", "On cam the book is closed. No old man at the counter. Only your own hand, hanging over a pen."),
    ],
  });

  climax.push({
    scene: "interior", portrait: "wang", name: "Delivery Wang", tag: "Last ticket", time: 4 * 60 + 40, door: true,
    text: s.rep >= 58
      ? "'Pack of smokes.' He slaps money down, pulls two notes back. 'Forget it. Quitting. I just came to see if you're still here.' Sky going a little blue."
      : "He only puts his head in the door. '...Forget it. Orders.' E-bike already going.",
    choices: s.rep >= 58 ? [
      { label: "Say you're still here, almost dawn", do: (st) => { st.rep += 3; }, then: "'Good.' He smiles. 'Come on, fried rice noodles, my treat. When this lamp goes daytime-white, we go.'" },
      { label: "Ask him for a ride", do: (st) => { st.flags.wangRide = true; }, then: "'Get in. Don't look in the mirror.' Fast." },
    ] : [
      { label: "Watch him drive off", do: () => {}, then: "Alley mouth empty." },
    ],
  });

  climax.push({
    scene: "interior", name: "Hengdeng Mart", tag: "05:58", time: 5 * 60 + 58,
    text: "Rain stops. Water runs the glass in lines. Sign still red. Wall color across the street, you can see it.",
    choices: [
      { label: "Walk to the door. Wait for dawn", do: (st) => { st.flags.walkOut = true; } },
      { label: "Stay. Keep the lamp on", do: (st) => { st.flags.stayOn = true; } },
      { label: "Close early, kill the lamp, go", do: (st) => { st.closedEarly += 1; st.flags.closedLast = true; } },
    ],
  });

  return climax;
}

function pickEnding(s) {
  if (s.sanity <= 0 || (s.flags.followedBai && s.sanity < 25 && s.rep < 70)) return "void";
  if (s.flags.closedLast && (s.flags.soldJoss && !s.flags.returnedJoss)) return "void";
  if (s.flags.closedLast) return "fired";
  if (s.closedEarly >= 2 && !s.flags.helpedBai && s.rep < 72) return "fired";
  if (s.flags.helpedBai && (s.flags.refusedJoss || s.flags.returnedJoss) && !s.flags.stayOn) return "ferry";
  if (s.flags.catTakesShop && s.cat >= 62) return "cat";
  if (s.cat >= 78 && s.flags.walkOut && (s.flags.refusedJoss || s.flags.returnedJoss)) return "cat";
  if ((s.flags.soldJoss && !s.flags.returnedJoss) || s.flags.signedOn || s.flags.stayOn) return "joss";
  if (s.flags.powerOut && s.flags.gotFlashlight && (s.flags.walkOut || s.flags.leaveAtDawn || s.flags.gotRide)) return "dawn";
  if (s.flags.powerOut && !s.flags.gotFlashlight) return "fired";
  if (s.flags.gotRide && (s.flags.walkOut || s.flags.leaveAtDawn || s.flags.askedRide) && !s.flags.stayOn) return "dawn";
  if (s.flags.walkOut || s.flags.leaveAtDawn || (s.flags.wangRide && s.rep >= 58) || s.flags.askedRide) return "dawn";
  return "dawn";
}

const ENDINGS = {
  dawn: {
    kind: "Ending",
    title: "Clock out",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.askedRide
        ? "You never took the joss paper. Night four you already told Chen to pick you up at the alley mouth at dawn."
        : s.flags.wangRide
          ? "You didn't take the joss paper. Near dawn Wang gave you a ride. Told you not to look in the mirror."
          : s.flags.leaveAtDawn
            ? "You didn't take the joss paper. You put the keys on the counter. The cat wrapped its tail around them. You walked."
            : "You didn't take the joss paper. You didn't take the shop. Night five you walked to the door and waited for dawn.";
      return [
        how,
        "Five nights, you made it. You didn't kill the lamp. You walked out. Night shift ends at you. There is no sixth night after this.",
        "One past six, the sign is readable: Hengdeng Mart. Daytime it's a corner kiosk. Smokes, noodles, yogurt going off too fast.",
        "The cat walks you to the door, doesn't follow. It still has a shop to watch. Auntie Lin's two peaches in your pocket, still warm.",
        (s.truths && s.truths.indexOf("bossPrevShift") >= 0)
          ? "Later you call 'Boss.' He isn't the owner. He's last night shift. He didn't dare count the drawer, so he walked out alive. He threw the keys three times. This time they landed on you. In the shop you matched the texts to the keys and understood: three throws is how you hand off. You threw them too. This time it actually left your hand."
          : "Later you call 'Boss.' He isn't the owner. He's last night shift. He didn't dare count the drawer, so he walked out alive. He threw the keys three times. This time they landed on you. You threw them too.",
      ];
    },
    after: [
      "Half a month later you walk the alley in daylight. Sign behaves: Hengdeng Mart. Door open, a kid behind the counter, yawning, phone. Freezer hums like a freezer. You smoke on the curb. You don't go in.",
      "You threw the keys in the river. One rainy night the phone buzzed. Unknown number, empty text. You didn't reply. You buried the two peach pits in the compound planter. They never sprouted. You tell yourself they did.",
    ],
  },
  ferry: {
    kind: "Ending",
    title: "Walk her out",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.returnedJoss
        ? "That stack of joss paper, you gave back to the old man later. He took it. Said the rule takes this step."
        : "That stack of joss paper, you never took.";
      return [
        "The white dress buying milk was Xiao Ya from next door, the one who moved. A rain night three years ago she went out for milk and didn't come back. These five nights she kept coming in because she needed someone to walk her to the door, not into the water.",
        "You stopped at the door. You didn't step the puddle. The step she took through the water, skirt wet for the first time—rain wets living people. She looked back, smiled, said thanks.",
        how,
        "The ice coin on the counter became an ordinary yuan sometime. She left. Dawn came.",
      ];
    },
    after: [
      "Later, when it rains, you still glance at that puddle. Streetlight in the water. No skirt. Nobody looking back. Auntie Lin comes for milk and never says Xiao Ya. She says a breakfast stall opened at the alley mouth. The soy milk is sweet.",
      "You didn't spend that yuan. It sits in a pen cup, warm to the touch. Once you went in and the shelf actually had strawberry milk. Three days past date. You drank it. Sweet. After, you wrote in a notebook: walk to the door and stop. Don't cross the line. You wrote it very slow.",
    ],
  },
  cat: {
    kind: "Ending",
    title: "Give it to the cat",
    scene: "interior",
    body: (s) => {
      const how = s.flags.catTakesShop
        ? "The old man asked who gets the lamp. You didn't give it to a person, didn't keep it—you pushed the shop to the cat. It stayed five nights with you. You trust it."
        : "You didn't give the shop to anyone. You walked to the door, and the cat jumped into that counter spot itself. Five nights with you. It was willing to watch this shop.";
      return [
        how,
        "It jumps into that counter spot, tail flicks, till snaps shut. The Zhongshan old man doesn't come recruiting. White dress doesn't come for milk. Wet-hair looks in at the door, gets hissed off.",
        "You look back from the alley mouth. Lamp on. That orange lump on the counter. People on this alley just think it's a shop cat.",
      ];
    },
    after: [
      "You slept a whole day. Two at night you drifted to the alley mouth. Lamp on, nobody behind the counter, just that orange lump, tail on the till. Delivery kid peeks in: this shop cat's mean, people it won't let in, don't go in. He laughs. You don't pick it up.",
      "You didn't take the keys back. Someone in the group chat asks if night shift here's hiring. Nobody replies. You pass and only look at the lamp, not behind the counter. It's still there. That's enough.",
    ],
  },
  joss: {
    kind: "Ending",
    title: "Take the shift",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = (s.flags.soldJoss && !s.flags.returnedJoss)
        ? "Night three you took that stack of joss paper. Payee was your name—take it, you agree to cover."
        : s.flags.signedOn
          ? "Last night you signed the attendance book. Pen was slippery. The name wrote itself. Sign, you agree to cover."
          : "Last night the old man asked who gets the lamp. You said stay. Keep it on.";
      return [
        how,
        "Till opens, all red paper. You still sort it by face value, sheet by sheet. Your hands already know.",
        "Bell rings. You say welcome. What you hear is your own voice, coming from the freezer, the tube, under the mat. Contract said five days' trial. Didn't write a sixth. So this day never finishes.",
        "Another text, still signed 'Boss.' One line: your turn. Next shift will come. When it does, the one throwing keys is you.",
      ];
    },
    after: [
      "No sixth-day morning. Clock on the wall hits six, jumps to 22:00. You learn to sign texts 'Boss.' You type the words. The tone isn't yours. Keep the lamp on. Don't look for me in daylight.",
      "Later someone does come for the keys. Young guy, eyes still clear. You put four red notes under the keys, walk to the door, turn. You hear yourself: you stock it. Shop's not sitting on inventory for you. Curtain sounds. You don't go out. You already can't.",
    ],
  },
  void: {
    kind: "Ending",
    title: "Become a customer",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.sanity <= 0
        ? "Five nights, sanity ground down. By the end you can't tell if you're even standing behind the counter."
        : s.flags.followedBai
          ? "You followed Xiao Ya across the puddle at the door. Water over the shoe, ice to the bone."
          : "You took his joss paper, and last night you killed the lamp. Lamp dies, you're not the one behind the counter.";
      return [
        how,
        "This shop needs someone behind the counter and someone outside buying. You didn't hold. You went from watching the shop to buying from it.",
        "Lamp flickers. You're outside the counter. Clothes wet. Two AA batteries in your hand. Mat dry. Bell didn't ring.",
        "The person behind the counter looks like you. 'Batteries?' You want to say no. What comes out is: yes. That's the wet-hair man from night one. Now that person is you.",
      ];
    },
    after: [
      "Every rain night after, you come. Batteries, sandalwood, sometimes nothing, just drip on the mat. Mat is dry. The one behind the counter looks more like you that first night, dark circles, few words. When he sells you batteries, his hand is hot.",
      "One night you want to say: don't sell. What comes out is still: yes. He looks up like he might know you. Lamp flickers. You're already outside. Rain on your back. Back dries first.",
    ],
  },
  fired: {
    kind: "Ending",
    title: "Kill the lamp and go",
    scene: "exterior",
    body: (s) => {
      const how = s.flags.closedLast
        ? "Store rule 1: lights stay on. Boss texts said don't close early. Last night you still killed the lamp and left."
        : "These five nights you closed early more than once. The standing the shop had, you spent it.";
      return [
        how,
        "Lamp dies, the zhizha shop's old trade comes back. Someone has to take the shift right then.",
        "Text is one line: keys under the mat. Alley black, clean.",
        "Next day you pass. Lamp already on. Someone behind the counter. Face unreadable, standing straight. Cat not on the counter. The one who left is you. The one who stayed isn't living.",
      ];
    },
    after: [
      "A whole week you didn't walk that alley. Night seven you went the long way and still passed it. Lamp on. Same person behind the counter, same straight. A pinch of paper ash at the door, like someone burned something the rain put out.",
      "Where the cat went, nobody can say. Someone saw the orange cat sleeping under an overpass three corners out, won't be touched. You didn't go look. You never touched the keys again. You didn't kill the lamp—you just left first. The shift already has a taker.",
    ],
  },
};

const ROLE_ENDINGS = {
  catJudge: {
    role: "cat",
    kind: "Ending",
    title: "Hold the threshold",
    scene: "interior",
    body: (s) => {
      const how = s.flags.catWaited
        ? "The old man asked who gets the lamp. You didn't grab it. The new one left the spot. Then you jumped in."
        : s.flags.catBlockedWet
          ? "You blocked people who shouldn't come in. Wet-hair stood outside a while and left."
          : "Seven nights you sat in the doorway. The ones who should came in. The ones who shouldn't, you hissed.";
      return [
        how,
        "Till shuts. Zhongshan old man doesn't come recruiting. White dress stopped at the door, didn't cross the puddle. You're still in that counter spot.",
        "People in the alley just think there's a shop cat. Lamp on. That's enough.",
      ];
    },
    after: [
      "Every rain night after, you still smell the mat first. Dry, you hiss. Wet, you move. New ones change. You don't.",
      "Someone in the group chat asks if night shift here's hiring. Nobody replies. You put your tail on the till. Hiring isn't yours. Lamp on is enough.",
    ],
  },
  catFail: {
    role: "cat",
    kind: "Ending",
    title: "Didn't hold",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.catJumped
        ? "You jumped into that counter spot too early. Their shift wasn't handed off. You took it first."
        : s.flags.catLetWet
          ? "You didn't block wet-hair. He bought batteries. Mat stayed dry."
          : "Some nights you didn't hold the door. People who shouldn't came in.";
      return [
        how,
        "Lamp flickers. Whoever's behind the counter doesn't look like the new one anymore. You hiss in the doorway. Nobody hears.",
        "Till is open. Red paper mixed with real money. You used to not let that happen.",
      ];
    },
    after: [
      "Later people say this shop cat isn't mean. Anyone comes in. Delivery kid even laughs. You sit under an overpass three corners out. Won't be touched.",
      "Lamp still on. On doesn't mean you're watching. Threshold's gone.",
    ],
  },
  hengPass: {
    role: "heng",
    kind: "Ending",
    title: "Wait for the handoff",
    scene: "interior",
    body: (s) => {
      const how = s.flags.hengTookJoss
        ? "You took the joss paper. You didn't touch real money. You threw the keys to the next shift."
        : "You didn't touch real money. You threw the keys to someone who'll keep the lamp on.";
      return [
        how,
        "He didn't see your face clear. That's right. Texts still say 'Boss.' Words are the tone you taught. The person is already him.",
        "You step back to the back-room door. You don't go in there either. Lamp goes to someone still living. This day, first time, feels like it could end.",
      ];
    },
    after: [
      "Next time someone comes for keys, behind the counter is new. You still stand under the tube sometimes. He can't see you.",
      "Someone takes the joss paper. You don't touch real money. Night shift has a taker. That's what you were waiting for.",
    ],
  },
  hengLoop: {
    role: "heng",
    kind: "Ending",
    title: "This day doesn't end",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.hengTookReal
        ? "You touched real money. Hot. After you touched it you knew: this day doesn't end."
        : "You didn't throw the keys. You still have to watch the lamp yourself.";
      return [
        how,
        "Clock hits six, jumps to 22:00. Bell rings. You say welcome. What you hear is your own voice.",
        "Next shift will come. When it does, the one throwing keys is still you. You threw once. It didn't leave clean.",
      ];
    },
    after: [
      "Someone answers the night-shift job. Young, eyes still clear. You put four red notes under the keys. Curtain sounds. You don't go out.",
      "You already can't leave. Lamp on. Don't look for me in daylight. You've said it. You'll say it again.",
    ],
  },
  xiaoyaRain: {
    role: "xiaoya",
    kind: "Ending",
    title: "Skirt got wet",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.xySent
        ? "He stopped at the door. You crossed the puddle yourself. Skirt wet for the first time."
        : "Someone walked you to the door. You didn't pull him. Rain on you was warm.";
      return [
        how,
        "You looked back and said thanks. The ice coin stayed on the counter, later became an ordinary yuan.",
        "You drank the milk. Sweet. Dawn came. Next time you walk this alley, it's daylight.",
      ];
    },
    after: [
      "Later, when it rains, that puddle only holds a streetlight. Nobody looks back. Auntie Lin comes for milk and never mentions you.",
      "He didn't spend that yuan. It sits in a pen cup. The shelf later actually had strawberry milk. Three days past date. Someone drank it.",
    ],
  },
  xiaoyaStay: {
    role: "xiaoya",
    kind: "Ending",
    title: "Back for milk",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.xyBehind
        ? "You stood behind the counter. That's not a buying spot. You stand there, you don't come out."
        : s.flags.xyCrossed
          ? "You crossed the puddle. No home on the other side. You walked back to the shop door."
          : "Nobody walked you to the door. You still come every night for milk.";
      return [
        how,
        "Bell rings sometimes, sometimes doesn't. Coin in your pocket still ice. No strawberry on the shelf.",
        "The person behind the counter changes every day. The way they look at you gets more familiar. Familiar, and they still don't ask your name.",
      ];
    },
    after: [
      "Rain nights you still come. Milk, sometimes nothing, stand on the mat. Mat is dry.",
      "One night you want to say: walk me to the door. What comes out is still: one milk. Plain is fine.",
    ],
  },
  wuClear: {
    role: "wu",
    kind: "Ending",
    title: "Book closed",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.wuFlash
        ? "You left a flashlight. You didn't leave yourself. Four names on the book. Not one extra."
        : "Four names on the book. Not one extra. Dawn, you closed it.";
      return [
        how,
        "You didn't let wet-hair in. Lamp on, shop's open. Your shift ends at the alley mouth.",
        "The sign is readable. You go back to the booth. Shop isn't yours. That's right.",
      ];
    },
    after: [
      "Later you still walk this alley. Night clerks change. You still check the roster. Don't match, you tell them daytime tomorrow.",
      "People ask if that shop's wrong. You say keep the lamp on. Flashlight in your pocket. The spare's still there.",
    ],
  },
  wuLost: {
    role: "wu",
    kind: "Ending",
    title: "You're on the book",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.wuOwnName
        ? "You wrote your name. After it was down you knew it was bad."
        : s.flags.wuLetWet
          ? "You let wet-hair in. Mat was dry later. Later the book had an extra line. Yours."
          : "You sat in the shop too long. Dawn, the book wouldn't close.";
      return [
        how,
        "You're outside the counter. Clothes wet. Two AA batteries in your hand. Mat dry. Bell didn't ring.",
        "The one behind the counter looks up like he might know you. 'Batteries?' You want to say I watch the alley. What comes out is: yes.",
      ];
    },
    after: [
      "Every rain night after, you come. No more check-ins. Batteries, sandalwood, sometimes nothing.",
      "Someone new in the booth. They flip the roster. One page they can't read. Rain on your back. Back dries first.",
    ],
  },
};