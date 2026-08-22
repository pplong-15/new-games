const ITEMS = {
  tea:     { name: "冰红茶",    price: 4,  cost: 2,  desc: "冰的" },
  noodles: { name: "红烧牛肉面", price: 6,  cost: 3,  desc: "倒开水" },
  water:   { name: "矿泉水",    price: 2,  cost: 1,  desc: "常备" },
  bread:   { name: "手撕面包",  price: 5,  cost: 2,  desc: "要软的" },
  cigs:    { name: "红塔山",    price: 18, cost: 12, desc: "王师傅就认这个" },
  incense: { name: "檀香",      price: 8,  cost: 4,  desc: "角落那盒" },
  battery: { name: "五号电池",  price: 12, cost: 6,  desc: "手电筒里用的" },
  milk:    { name: "纯牛奶",    price: 6,  cost: 3,  desc: "林阿姨每次都买" },
  candle:  { name: "蜡烛",      price: 3,  cost: 1,  desc: "停电用" },
};

const UPGRADES = {
  cam:     { name: "柜上监控", price: 68, desc: "回放里拍不着的，柜台上就摆着。" },
  peach:   { name: "桃木挂件", price: 48, desc: "挂上它，心里踏实点。" },
  light:   { name: "加购灯管", price: 42, desc: "灯不闪了，看人也能看清点。" },
  catfood: { name: "猫粮一袋", price: 20, desc: "它吃相难看，但是真吃。" },
};

const RULES = [
  ["一", "灯不能关，一晚上都不能。"],
  ["二", "客人给什么钱都收，别挑。"],
  ["三", "后间谁都不让进。"],
  ["四", "猫拦着不让进的人，别硬留。"],
  ["五", "没天亮，别数纸钱。"],
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
  }).join("、");
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
    scene: "interior", name: "空货架", tag: "间隙", time: 23 * 60 + 8,
    text: s.flags.stockouts >= 3
      ? "空档对着灯。你数过，少了几排。灯管「兹」了一声，空位里像站着个人，低头看货。你再看，没有人。垫子是湿的。"
      : "空货架还留着昨晚的缺口。灯照上去，影子比货多。你总觉得有人站在方便面那一档，等你补上。",
    choices: [
      { label: "把灯再调亮一点", do: (st) => { st.sanity -= 2; } , then: "亮了也还是空的。门外雨没停。" },
      { label: "别看空位", do: (st) => { st.sanity -= 3; }, then: "你不看它。余光里它还在。" },
    ],
  };
}

function camChoice(flag, text) {
  return {
    label: "看监控",
    showIf: (st) => st.upgrades.cam,
    do: (st) => { st.flags[flag] = true; },
    then: text,
  };
}

const RULE_PHASE = {
  1: "原文",
  2: "铅笔字",
  3: "墨色差异",
  4: "规则冲突",
  5: "污染",
  6: "溯源",
  7: "裁决",
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
    2: "第二条旁边多了一行淡得快看不见的铅笔字。",
    3: "第二条的字比别的条新，墨还没吃进纸里。",
    4: "纸条边角多了张临时贴条。字跟第三条拧着。",
    5: "第五条旁边有涂改。半句新的，墨渍还潮。",
    6: "油纸能翻过来。背面全是前人的字。",
    7: "交班前你得决定，下一班看见的是哪几条。",
  };
  if (night >= 2) {
    rules[1].mark = "edited";
    rules[1].notes.push({ kind: "pencil", text: "纸钱不算" });
  }
  if (night >= 3) {
    rules[1].mark = "edited";
    rules[1].ink = "fresh";
  }
  if (night >= 4) {
    extra.push({
      kind: "sticky",
      mark: "conflict",
      after: "三",
      num: "贴",
      text: "客人借后间，让进。",
    });
  }
  if (night >= 5) {
    rules[4].mark = "tainted";
    rules[4].notes.push({ kind: "taint", text: "（天亮前也可以数）" });
  }
  if (night >= 6) {
    extra.push({
      kind: "verso",
      mark: "traced",
      title: "油纸背面",
      lines: [
        "第一任　恒　　灯别关。",
        "有人添了第二条。签字被擦了。",
        "再上一班用铅笔写：纸钱不算。千万。",
        "本晚　　（空着，等你）",
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
  return { "一": true, "二": true, "三": true, "四": true, "五": true, sticky: true };
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
    bag["二"] = false;
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
    if (s.flags && s.flags.catJumped) return "你已经蹲在钱箱上了。还早。";
    if (s.flags && s.flags.catBlockedWet) return "你舔了舔爪子。门口那味还在。";
    return "你盯着玻璃门。耳朵转了一下。";
  }
  if (s.cat >= 70) return "猫拿脑袋拱了拱你的手腕。";
  if (s.flags.soldJoss) return "它死盯着钱箱，喉咙里咕噜了一声。";
  if (s.sanity < 35) return "猫一屁股坐上扫描仪，把你的手挡住了。";
  if (s.upgrades.catfood) return "它打了个大大的哈欠，尾巴扫过小票。";
  return "黄猫盯着门外看。耳朵转了一下，又转回来了。";
}

const CAT_EYE_ALIVE = "猫眯着眼，尾巴放松，是活人。";
const CAT_EYE = {
  wet:  { kind: "unquiet", text: "它的头发在滴水，但猫闻不到水的味道。" },
  bai:  { kind: "unquiet", text: "猫看着她的脚，那里没有影子。" },
  old:  { kind: "unquiet", text: "猫先对他点了点头，像认识很久了。" },
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
  if (name.indexOf("湿发") >= 0) return CAT_EYE.wet;
  if (name.indexOf("白裙") >= 0 || name === "小雅") return CAT_EYE.bai;
  if (name.indexOf("中山装") >= 0) return CAT_EYE.old;
  if (name.indexOf("林阿姨") >= 0) return CAT_EYE.lin;
  if (name.indexOf("王师傅") >= 0) return CAT_EYE.wang;
  if (name.indexOf("吴保安") >= 0) return CAT_EYE.wu;
  if (name.indexOf("陈师傅") >= 0) return CAT_EYE.taxi;
  if (name.indexOf("周晓晚") >= 0) return CAT_EYE.zhou;
  if (name.indexOf("淋雨") >= 0) return { kind: "alive", text: CAT_EYE_ALIVE };
  if (name === "你") return { kind: "unquiet", text: "猫闻了闻柜台里的你。有你的味道，也有一点香灰。它耳朵扁了一下。" };
  if (name === "门铃") return { kind: "unquiet", text: "玻璃上那张脸没有气味。猫把耳朵贴在门上，一下都没转。" };
  if (name === "店猫") return { kind: "alive", text: "它把断香拨到一边。鼻翼动了一下，没再看你。" };
  return null;
}

function catBlockChoice(beat) {
  if (!beat || beat.type) return null;
  const p = beat.portrait;
  const name = beat.name || "";
  const wet = p === "wet" || name.indexOf("湿发") >= 0;
  const bai = p === "bai" || name.indexOf("白裙") >= 0 || name === "小雅";
  const old = p === "old" || name.indexOf("中山装") >= 0;
  const door = name === "门铃";
  if (!wet && !bai && !old && !door) return null;
  if (wet) {
    return {
      label: "替猫拦在门口",
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
      then: "你替它横在垫子前面。猫没看他，看的是你。耳朵扁下去了。男人退到门外。雨还下着，他后背先干了。",
    };
  }
  if (bai) {
    return {
      label: "替猫拦她一下",
      catOpt: true,
      showIf: (st) => !!st.catView,
      do: (st) => {
        st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
        st.flags.catAlienated = true;
        st.flags.catBlockedBai = true;
        st.flags.baiDenied = true;
        st.cat -= 8;
      },
      then: "你挡在柜台外沿。她看了眼猫。猫没动，看的是你的手。耳朵扁了一下。女人退到门口：「……也行。」裙子还是干的。",
    };
  }
  if (old) {
    return {
      label: "替猫拦着，不让他放下那叠东西",
      catOpt: true,
      showIf: (st) => !!st.catView,
      do: (st) => {
        st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
        st.flags.catAlienated = true;
        st.flags.catBlockedOld = true;
        if (!st.flags.soldJoss) st.flags.refusedJoss = true;
        st.cat -= 10;
      },
      then: "你把手按在钱箱上。老人看了猫一眼。猫没拦他——拦的是你。它从柜台上跳下去了，尾巴不扫你了。「你替它做主啊。」老人把东西收回去，「那它就不当裁判了。」",
    };
  }
  return {
    label: "替猫拦着，别开门",
    catOpt: true,
    showIf: (st) => !!st.catView,
    do: (st) => {
      st.flags.catIntervened = (st.flags.catIntervened || 0) + 1;
      st.flags.catAlienated = true;
      st.flags.knockedWu = true;
      st.cat -= 8;
    },
    then: "你替它按住门锁。猫没拦门，拦的是你的手腕。它耳朵扁下去，跳开了。门外那张脸自己退进了雨里。",
  };
}

const CAT_MEMORIES = [
  { id: "n1", night: 1, title: "垫子", text: "猫闻过垫子。活人进来，垫子是潮的。那个湿头发的站上去，垫子是干的。" },
  { id: "n2", night: 2, title: "影子", text: "穿白裙的进门，日光灯管底下空荡荡的。活人走路会带起尘。她没有。" },
  { id: "n3", night: 3, title: "旧铺", text: "老人进门先冲它点头。它也点。这铺子改便利店以前，它就蹲在这个位置。招牌底下压着一层金箔，雨一打，隐隐还能看见「纸扎」俩字。" },
  { id: "n4", night: 4, title: "第二条", text: "第二条是后来添的。添的人想让夜班把纸钱也收了。收了，班就接上了。猫那晚把纸条抓翻过，铅笔印的「纸钱不算」又露出来。" },
  { id: "n5", night: 5, title: "积水", text: "小雅来买奶，脚边没有影子。猫不拦她。猫咬你裤脚，是不让你迈过门口那道积水。" },
  { id: "n6", night: 6, title: "恒", text: "油纸背面有个恒字。他不是店主，是上一班。他把灯交出去那天，自己站到了垫子上。头发是干的，后背先湿了。" },
  { id: "n7", night: 7, title: "灯", text: "灯是猫看着点上的。灯在，它就在。姓恒的交班走那天，活人的汗味和香灰混在了一起。" },
];
const CAT_DEEP = {
  id: "deep",
  title: "最早的住户",
  text: "巷口烧过三天纸。灰没扫干净，招牌后来就叫恒灯了。猫比这盏灯还早。灯灭了，它得重新找人把灯开到天亮。",
};

const CLUES = [
  { id: "keyToss", title: "钥匙", night: 1, src: "交班", layer: "surface",
    text: "他把钥匙丢过来，底下压了四张红票子。你点过，四十二。灯一闪，面额像变过。夜里这钱会变。走到门口又说：灯开着就行。我白天在哪儿，别问。" },
  { id: "bossPhone", title: "老板短信", night: 1, src: "短信", layer: "surface",
    text: "真出了事就打我电话——接不接得看运气。落款是「老板」。" },
  { id: "rule2Added", title: "第二条后添", night: 1, src: "店规", layer: "surface",
    text: "一、三、四、五是同一只手写的。第二条墨色深，是后来加的。旁边铅笔写过「纸钱不算」，擦了还能认。" },
  { id: "paperShop", title: "纸扎铺", night: 2, src: "陈师傅", layer: "deep",
    text: "陈师傅说，这儿以前是家纸扎铺。扎纸人纸马的，清明前后最忙。后来改成了便利店。" },
  { id: "lampBack", title: "灯灭旧生意", night: 2, src: "陈师傅", layer: "deep",
    text: "有人说这儿的灯不能灭。一灭，老生意就回来了。" },
  { id: "bossGone", title: "老板消失", night: 2, src: "陈师傅", layer: "surface",
    text: "老板姓恒。人挺客气。有一年秋天突然人就没了，店也没转出去。" },
  { id: "rule2AfterHeng", title: "老恒走后", night: 2, src: "陈师傅", layer: "deep",
    text: "第二条是后加上去的。老恒走了以后才有的。纸钱那档子事，别当真。" },
  { id: "needRelief", title: "夜班要有人接", night: 3, src: "中山装老人", layer: "deep",
    text: "夜班总得有人接啊。收了，就是答应了。不收，这灯也还是他的。" },
  { id: "catKnowsOld", title: "猫认得他", night: 3, src: "猫", layer: "deep", catView: true,
    text: "老人进门先冲猫点了点头。猫也点。像认识很久了。" },
  { id: "countTrap", title: "数纸钱", night: 4, src: "吴保安", layer: "deep",
    text: "吴保安说，他爸以前在纸扎铺打过杂。数纸钱的人，天一亮就变成店里的人了。" },
  { id: "ledger", title: "账本", night: 6, src: "账本", layer: "surface",
    text: "历代夜班进货，字迹换过好几拨。最后一页已经写上你的名字。进货栏空着，交班人那栏也空着。日期是今晚。" },
  { id: "oldLedger", title: "更早的页", night: 6, src: "账本", layer: "deep",
    text: "三年前那一页，进货是牛奶和电池。交班人写着一个女名。墨水洇到下一行。猫把这一页踩住了。" },
  { id: "bossNotOwner", title: "上一班", night: 7, src: "中山装老人", layer: "surface",
    text: "招你的人不是店主。他是上一班。抽屉里那叠红的，他没敢数。数了就走不出去。所以他把钥匙扔给你。" },
  { id: "catIsJudge", title: "猫护灯", night: 7, src: "猫", layer: "deep", catView: true,
    text: "灯是猫看着点上的。它拦人不是护你，是护灯。巷口烧过三天纸，后来才叫恒灯。猫比这盏灯还早。" },
];

const CLUE_LINKS = [
  { id: "l_phone_key", a: "bossPhone", b: "keyToss", truth: "bossPrevShift",
    result: "短信里的「老板」白天从不露面，钥匙往你手里一扔就走。这不像店主，像交班。" },
  { id: "l_phone_gone", a: "bossPhone", b: "bossGone", truth: "bossPrevShift",
    result: "短信落款「老板」。巷子里的人说姓恒的秋天就没了。打电话的那个人，对不上号。" },
  { id: "l_key_gone", a: "keyToss", b: "bossGone", truth: "bossPrevShift",
    result: "扔钥匙的人还活着，能发短信。秋天消失的那个人已经不在了。招你的，不是店主。" },
  { id: "l_phone_prev", a: "bossPhone", b: "bossNotOwner", truth: "bossPrevShift",
    result: "「接不接得看运气」——因为他已经不是店主了。他是上一班，侥幸走出去的那个。" },
  { id: "l_key_prev", a: "keyToss", b: "bossNotOwner", truth: "bossPrevShift",
    result: "钥匙扔过三回。扔给你的那个人，自己也是这么接过来的。" },
  { id: "l_ledger_prev", a: "ledger", b: "bossNotOwner", truth: "bossPrevShift",
    result: "账本上每一任都先写自己的名字。招你的那一页，交班人那栏空着——他自己没敢签完。" },
  { id: "l_ledger_key", a: "ledger", b: "keyToss", truth: "bossPrevShift",
    result: "钥匙丢过来的时候，账本最后一页已经预备好你的名字了。这班是提前写好的。" },
  { id: "l_gone_prev", a: "bossGone", b: "bossNotOwner", truth: "bossPrevShift",
    result: "秋天没了的是姓恒的。扔钥匙发短信的是上一班。两个「老板」，不是同一个人。" },
  { id: "l_shop_lamp", a: "paperShop", b: "lampBack", truth: "paperHistory",
    result: "铺子改了便利店，灯却还是纸扎铺那盏。灯一灭，老生意就回来。" },
  { id: "l_shop_rule2", a: "paperShop", b: "rule2Added", truth: "paperHistory",
    result: "便利店的第二条，墨色比别的深。纸扎铺那会儿还没有这条。" },
  { id: "l_shop_count", a: "paperShop", b: "countTrap", truth: "paperHistory",
    result: "吴保安他爸在纸扎铺打过杂。数纸钱的人会变成店里的人。这条比便利店旧。" },
  { id: "l_heng_rule2", a: "rule2AfterHeng", b: "needRelief", truth: "hengGhost",
    result: "老恒走了以后才有第二条。添这条，是为了让下一班把纸钱也收下。收下就接班。" },
  { id: "l_heng_count", a: "needRelief", b: "countTrap", truth: "hengGhost",
    result: "夜班要有人接。数了纸钱，天一亮就变成店里的人。穿中山装来招工的，没走掉。" },
  { id: "l_heng_gone", a: "bossGone", b: "rule2AfterHeng", truth: "hengGhost",
    result: "秋天人没了，店没转出去。第二条是他走了以后才添的。走的人没走干净。" },
  { id: "l_heng_relief", a: "needRelief", b: "bossNotOwner", truth: "hengGhost",
    result: "上一班没敢数钱，才活着出来。穿中山装来招工的那位，班没交出去。所以他还在找人接。" },
  { id: "l_cat_old", a: "catKnowsOld", b: "paperShop", truth: "catWhat",
    result: "老人进门先对猫点头。这铺子改便利店以前，猫就蹲在这个位置。" },
  { id: "l_cat_judge", a: "catKnowsOld", b: "catIsJudge", truth: "catWhat",
    result: "猫认得他，因为它比灯还早。它拦人是护灯，不是护你。" },
  { id: "l_cat_ledger", a: "catKnowsOld", b: "ledger", truth: "catWhat",
    result: "账本最后一页，猫把你的名字扫了又扫。它记得每一任写上去的人。" },
  { id: "l_rule2_heng", a: "rule2Added", b: "rule2AfterHeng", truth: "hengGhost",
    result: "墨色深的那条，是老恒走后才添上的。铅笔「纸钱不算」是后来的人想拦这一下。" },
];

const TRUTHS = {
  bossPrevShift: {
    layer: "surface",
    title: "老板是上一班",
    text: "招你的人不是店主。他是上一班没敢数钱的人。钥匙他扔过三回，这回轮到扔你手上。",
  },
  paperHistory: {
    layer: "deep",
    title: "纸扎铺改便利店",
    text: "这儿以前扎纸人纸马。改成便利店以后，灯还是那盏。灯一灭，老生意就回来。",
  },
  hengGhost: {
    layer: "deep",
    title: "恒老板留下了",
    text: "姓恒的那一任把灯交出去那天，没走掉。现在穿中山装来招工的，是他。第二条是他走了以后才添的，好让下一班把纸钱也收下。",
  },
  catWhat: {
    layer: "deep",
    title: "猫比灯早",
    text: "巷口烧过三天纸，灰没扫干净，招牌后来就叫恒灯。猫比这盏灯还早。它拦人，是护灯一直开到天亮。",
  },
  paperToHeng: {
    layer: "deep",
    title: "纸扎铺到恒灯",
    need: ["paperHistory", "hengGhost", "catWhat"],
    needCat: true,
    text: "巷口烧过三天纸。灰没扫干净，这块招牌后来就叫恒灯了。灯是从纸扎铺留下来的。灯一灭，纸人纸马的生意就回来。姓恒的那一任把灯交出去那天，自己站到了垫子上。头发是干的，后背先湿了。他没走掉。现在穿中山装来的，是他。来招一个肯把灯开到天亮的人。猫比这盏灯还早。它拦人，不是护你。",
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
  clerk: { id: "clerk", name: "夜班员", short: "夜班", unlockBy: null, hint: "默认身份" },
  cat: { id: "cat", name: "猫", short: "店猫", unlockBy: "cat", hint: "通关「交给猫」结局解锁" },
  heng: { id: "heng", name: "恒老板", short: "孤魂", unlockBy: "joss", hint: "通关「接了班」结局解锁" },
  xiaoya: { id: "xiaoya", name: "小雅", short: "小雅", unlockBy: "ferry", hint: "通关「送她离开」结局解锁" },
  wu: { id: "wu", name: "吴师傅", short: "保安", unlockBy: "void", hint: "通关「变成客人」结局解锁" },
};

const ROLE_ORDER = ["clerk", "cat", "heng", "xiaoya", "wu"];

const ENDING_UNLOCK_ROLE = { cat: "cat", joss: "heng", ferry: "xiaoya", void: "wu" };

function roleRules(role, night) {
  if (!role || role === "clerk") return nightRules(night || 1);
  const packs = {
    cat: {
      banner: "你是柜台那团橘色。不说话，用身子拦。",
      rules: [
        ["一", "不该进的人，拦在门外。"],
        ["二", "活人来买东西，让柜台里的人卖。"],
        ["三", "别太早跳进柜台那个位置。"],
        ["四", "认得的人，点头就行。"],
        ["五", "天亮前，别让灯灭。"],
      ],
    },
    heng: {
      banner: "真钱烫手。纸钱才进得了你的箱。",
      rules: [
        ["一", "真钱碰不得。"],
        ["二", "纸钱才能进箱。"],
        ["三", "灯得一直开着，等人来接。"],
        ["四", "别让下一班认出你的脸。"],
        ["五", "夜班要有人接。"],
      ],
    },
    xiaoya: {
      banner: "你是来买东西的。柜台里的位置不是你的。",
      rules: [
        ["一", "只能买，不能站到柜台里去。"],
        ["二", "牛奶。有草莓的更好。没有就纯的。"],
        ["三", "送到门口就停。别过那摊水。"],
        ["四", "别拉人跟着你走过水线。"],
        ["五", "雨夜才进得来。"],
      ],
    },
    wu: {
      banner: "你不卖货。你对花名册。",
      rules: [
        ["一", "花名册对不上的，别放进巷子。"],
        ["二", "灯亮着，才算店还开着。"],
        ["三", "活人鞋湿，垫子也该湿。"],
        ["四", "别跟柜台里的人聊太久。"],
        ["五", "天亮把册子合上。"],
      ],
    },
  };
  const pack = packs[role];
  if (!pack) return nightRules(night || 1);
  return {
    night: night || 1,
    phase: "身份",
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
    s.flags.roster = ["林秀珍", "王建军", "周晓晚", "陈建国"];
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
    { type: "prep", time: 21 * 60 + 50, text: "钥匙扔到垫子上的时候你没动。新来的人闻起来是洗衣粉和方便面。活人。你跳上柜台，爪子按在钱箱上。" },
    {
      scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 22 * 60 + 16, door: true,
      text: "折叠袋往柜台上一放。洗衣粉味，还有奶。她说：「哟，新来的吧？」不是在问你。你从柜台边上看她的鞋。湿的。垫子也湿了一小块。",
      choices: [
        { label: "让她买", do: (st) => { st.flags.catLetLin = true; st.cat += 2; }, then: "她捏了捏面包。活人买东西，你不管。尾巴扫过小票，她没注意你。" },
        { label: "拦她", do: (st) => { st.flags.catBlockLin = true; st.sanity -= 3; }, then: "你横在袋子前面。她愣了一下：「这猫怎么啦。」新来的人赶紧赔笑。她走的时候伞尖在门口顿了下。你拦错人了。" },
        { label: "闻一闻", look: "洗衣粉，奶，雨。鞋底有泥。是活人。" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "？", time: 0 * 60 + 27, door: true, effect: "flicker",
      text: "门铃没响。他站在垫子上，头发还在滴。你闻了闻——没有水味。垫子是干的。",
      choices: [
        { label: "拦在门口", do: (st) => { st.flags.catBlockedWet = true; st.cat += 6; }, then: "你立起来，冲他哈气。他看了你一眼，慢慢退到雨里去了。新来的人在柜台后面不知道该不该出声。" },
        { label: "让他进", do: (st) => { st.flags.catLetWet = true; st.sanity -= 8; }, then: "你没动。他买了电池。笑的时候牙齿齐整。水还滴着。垫子还是干的。" },
        { label: "盯着他的脚", look: "水往下滴。滴到垫子上，垫子不湿。你闻不到水。" },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "白裙子的气味你闻过。三年了。她进来的时候门铃不响。你看着她的脚。" },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "？", time: 23 * 60 + 8, door: true,
      text: "她要牛奶。草莓的。货架上没有。你看她的脚——灯打过去，地上没有影子。",
      choices: [
        { label: "拦着不让她靠近柜台", do: (st) => { st.flags.catBlockedBai = true; st.cat += 5; }, then: "你跳到她和柜台中间。她看着你，笑了笑：「它还认得我。」出门的时候门铃没响。" },
        { label: "让她买完再走", do: (st) => { st.flags.catLetBai = true; st.sanity -= 4; }, then: "新来的人把纯牛奶递给她。她道了谢。你没拦。她走到门口那摊水边上，停了一下，又进来了。像没走成。" },
        { label: "看她的脚", look: "灯在她脚边。地上该有影子。没有。" },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 22 * 60 + 40, door: true,
      text: "头盔夹在胳膊底下。烟味，机油味，雨。鞋在垫子上蹭了两下。垫子湿了。",
      choices: [
        { label: "让他买烟", do: (st) => { st.flags.catLetWang = true; }, then: "活人。你趴着。他拆烟盒的动作是老手。走的时候说门别关。" },
        { label: "闻一闻", look: "烟，机油，雨。活人。" },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "钱箱里有一股红纸的味。新来的人还没发现。你知道那味。你见过收这种钱的人。" },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "熟", time: 0 * 60 + 41, door: true,
      text: "他先看你。你也看他。像认识很久了。他从怀里掏出一叠红的。",
      choices: [
        { label: "对他点头", do: (st) => { st.flags.catNodOld = true; st.cat += 8; }, then: "你点了点头。他点了点头。新来的人站在中间，谁也不看他。老人把纸钱放在柜台上：「夜班要有人接。」" },
        { label: "拦他", do: (st) => { st.flags.catBlockOld = true; st.sanity -= 6; }, then: "你哈他。他没退。看了你一会儿，说：「你也守累了。」纸钱还是放下了。你拦的不是外人。" },
        { label: "盯着那叠红的", look: "红纸。不是钱的味。是灰和香。" },
      ],
    },
    {
      scene: "interior", name: "钱箱", tag: "间隙", time: 1 * 60 + 12,
      text: "新来的人要不要那叠红的，是他的事。你的事是别让不该进的人再进来。灯管兹了一声。",
      choices: [
        { label: "继续守门口", do: (st) => { st.flags.catWatchedDoor = true; }, then: "你转过身，脸对着玻璃门。雨还在下。" },
        { label: "跳进柜台里那个位置", do: (st) => { st.flags.catJumped = true; st.sanity -= 10; }, then: "你跳进去。钱箱啪地合上了。新来的人愣住。还早。这个位置现在还不是你的。" },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "巷口有手电扫过来。活人。鞋底有泥。你耳朵转了一下。" },
    {
      scene: "interior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 10, door: true,
      text: "手电筒在裤缝上磕了两下。他低头看垫子。「我还当有人淋着雨进来了。」",
      choices: [
        { label: "让他进", do: (st) => { st.flags.catLetWu = true; }, then: "活人。你眯着眼。他问监控花没花。新来的人含糊答了。他走的时候手电还亮着。" },
        { label: "闻一闻", look: "手电塑料味，雨衣，烟。活人。" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "？", time: 2 * 60 + 4, door: true, effect: "flicker",
      text: s.flags.catBlockedWet
        ? "他又来了。头发还在滴。看见你，停在门口。"
        : "他又来了。头发还在滴。上次你没拦。这次他站得更靠里。",
      choices: [
        { label: "拦在门口", do: (st) => { st.flags.catBlockedWet = true; st.cat += 6; }, then: "你哈他。他退了。这次退得慢一点。" },
        { label: "让他进", do: (st) => { st.flags.catLetWet = true; st.sanity -= 8; }, then: "你没动。他买了电池。走的时候垫子还是干的。" },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "雨大了。方便面的味从货架上冒出来。你把尾巴绕紧。" },
    {
      scene: "interior", portrait: "zhou", name: "周晓晚", tag: "住客", time: 23 * 60 + 41, door: true,
      text: "卫衣帽子扣着。有线耳机。泡面味。鞋是湿的，垫子也湿了。",
      choices: [
        { label: "让她泡面", do: (st) => { st.flags.catLetZhou = true; }, then: "活人。她说隔音太差。你没听完，看门口。" },
        { label: "闻一闻", look: "泡面，洗发水，雨。活人。" },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "？", time: 3 * 60 + 20, door: true,
      text: "雨打在她裙子上，裙子不湿。她还是要牛奶。",
      choices: [
        { label: "拦着", do: (st) => { st.flags.catBlockedBai = true; st.cat += 3; }, then: "你不让她往门口水线那边走。她看着你，没硬过。" },
        { label: "跟着她到门口", do: (st) => { st.flags.catFollowBai = true; st.sanity -= 6; }, then: "你跟到门口。那摊水冰。她回头看你。你没过那条线。她也没过。你们在门口站了一会儿。" },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "账本打开了。墨味。很多任夜班的名字。有一页是空的，等新来的人。你比这些名字都早。" },
    {
      scene: "interior", name: "账本", tag: "间隙", time: 0 * 60 + 50,
      text: "新来的人看见自己的名字已经在上面。他手停住了。你蹲在账本旁边，尾巴压着一角。",
      choices: [
        { label: "把账本推回去", do: (st) => { st.flags.catClosedBook = true; st.cat += 4; }, then: "你用脑袋把账本拱上。他没再翻。灯还亮着。" },
        { label: "跳进柜台那个位置", do: (st) => { st.flags.catJumped = true; st.sanity -= 10; }, then: "你跳进去。还早。钱箱合上的声音把新来的人吓了一跳。老人还没问灯交给谁。" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "陈师傅", tag: "出租", time: 23 * 60 + 40, door: true,
      text: "烟味混着车载香薰。「这巷子今晚绕得人心里发毛。」他是活人。你见过他好多年。",
      choices: [
        { label: "让他买水", do: (st) => { st.flags.catLetChen = true; }, then: "活人。你趴着。他说这儿以前是纸扎铺。你知道。你当时就在。" },
        { label: "听着", look: "烟，香薰，雨。活人。他说纸扎铺的时候，你耳朵动了一下。" },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "最后一晚。老人会来问灯交给谁。你等着。别自己先跳进去。" },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "熟", time: 4 * 60 + 12, door: true,
      text: "他先对你点头。又问新来的人：「这灯往后交给谁。」新来的人看着你。",
      choices: [
        { label: "等他把店给你", do: (st) => { st.flags.catWaited = true; st.cat += 10; }, then: "你没动。新来的人把那个位置让出来。你才跳进去。钱箱合上。老人没再问。" },
        { label: "自己先跳进去", do: (st) => { st.flags.catJumped = true; st.sanity -= 8; }, then: "你抢先跳进去。新来的人还没说话。老人看了你一眼，没说什么。这个位置你拿得太早。" },
      ],
    },
    {
      scene: "interior", name: "门口", tag: "天亮", time: 5 * 60 + 50,
      text: "天要亮了。不该进的人还在不在门外，是你这七晚拦没拦住的事。",
      choices: [
        { label: "守到灯稳下来", do: (st) => { st.flags.catHeldDawn = true; }, then: "你蹲着。灯一直亮到招牌上的字能看清。巷子里没人再推门。" },
      ],
    },
  ];
}

function nightsHeng(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "柜台里那个位置是你的。一直是。新来的人把钥匙攥出汗。你站在他身后一点，他看不见你。手是透的。" },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 22 * 60 + 48, door: true,
      text: "他拍下一张二十。「来包烟，再来瓶冰红茶。」真钱。油墨味，热的。",
      choices: [
        { label: "不碰。让新来的人收", do: (st) => { st.flags.hengRefusedReal = true; }, then: "你把手收回去。真钱烫。新来的人收了。你只看着钱箱，没碰那张二十。" },
        { label: "伸手去接", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 14; }, then: "手指一碰，发烫。二十还在，你的手像被开水浇过。王师傅没看见你。看见的是新来的人一哆嗦。" },
        { label: "看那张二十", look: "油墨，热的。真钱。你碰不得。" },
      ],
    },
    {
      scene: "interior", name: "钱箱", tag: "间隙", time: 23 * 60 + 20,
      text: "抽屉里有两枚硬币。也是真的。你记得自己从前数过这种钱。数完就出不去了。",
      choices: [
        { label: "不去数", do: (st) => { st.flags.hengNoCount = true; st.sanity += 2; }, then: "你把抽屉推回去。灯还亮着。这是你还能待在这儿的办法。" },
        { label: "数一下", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 16; }, then: "硬币是凉的。数完，门口那摊水像近了一点。真钱碰不得。你碰了。" },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "新来的人开始翻店规。第二条是后添的。不是你写的。你走了以后才有人添。" },
    {
      scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 22 * 60 + 16, door: true,
      text: "她递过来一张十块。「一盒牛奶，面包要软的啊。」真钱。",
      choices: [
        { label: "不碰。让新来的人收", do: (st) => { st.flags.hengRefusedReal = true; }, then: "你退开半步。她看不见你。新来的人找零。真钱进了别人的抽屉。" },
        { label: "伸手去接", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 12; }, then: "十块烫手。林阿姨打了个寒噤：「这店里怎么这么凉。」" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "陈师傅", tag: "出租", time: 23 * 60 + 44, door: true,
      text: "他随口说：「你知道不，这儿以前是纸扎铺。」他看的是新来的人。你站在灯管底下。",
      choices: [
        { label: "听着，别出声", do: (st) => { st.flags.hengHid = true; }, then: "你没出声。纸扎铺是你的。便利店也是你改的。他不知道你还在。" },
        { label: "想让他看见你", do: (st) => { st.flags.hengSeen = true; st.sanity -= 6; }, then: "灯闪了一下。陈师傅愣住：「刚才柜台后头是不是还有个人。」新来的人回头。你已经低了头。" },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "今晚有人会送纸钱。纸钱是温的。这个你收得。" },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "？", time: 0 * 60 + 41, door: true,
      text: "他看的不是新来的人。他看你。「夜班要有人接。」怀里那叠红的，递到你够得着的地方。",
      choices: [
        { label: "收下纸钱", do: (st) => { st.flags.hengTookJoss = true; st.flags.jossCash = (st.flags.jossCash || 0) + 40; st.cat += 4; }, then: "红纸是温的。进了箱。老人点头：「这就对了。真的那个，别碰。」" },
        { label: "不收", do: (st) => { st.flags.hengRefusedJoss = true; st.sanity -= 4; }, then: "你没接。老人把纸钱放在柜台上。「不收也得有人收。灯不能没人看着。」" },
        { label: "看那叠红的", look: "灰和香。温的。不是烫。这是给你的。" },
      ],
    },
    {
      scene: "interior", name: "店规", tag: "间隙", time: 1 * 60 + 5,
      text: "第二条「钱都收」不是你写的。你在的时候，纸扎铺不收真钱。有人走了以后才改成便利店那套。",
      choices: [
        { label: "记住，别按第二条来", do: (st) => { st.flags.hengKnewTrap = true; }, then: "你不收真钱。这是你还能等下一班的办法。" },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "新来的人今晚会看你。别让他看清。" },
    {
      scene: "interior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 10, door: true,
      text: "他拿手电往柜台后扫。「监控刚才花了一屏。」光从你身上穿过去。垫子上没有你的影。",
      choices: [
        { label: "躲开手电", do: (st) => { st.flags.hengHid = true; }, then: "你偏到货架后头。手电扫过空处。吴保安骂了句花屏，走了。" },
        { label: "站着让他照", do: (st) => { st.flags.hengSeen = true; st.sanity -= 7; }, then: "手电停了一下。他皱眉：「后头是不是站了个人。」新来的人回头。没有人。你还在。" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "？", time: 2 * 60 + 3, door: true, effect: "flicker",
      text: "他买电池。递过来的钱是干的。真钱。他不是来给你纸钱的。",
      choices: [
        { label: "不碰他的钱", do: (st) => { st.flags.hengRefusedReal = true; }, then: "你不碰。新来的人要不要卖，是他的班。你只守灯。" },
        { label: "伸手去接", do: (st) => { st.flags.hengTookReal = true; st.sanity -= 12; }, then: "干的纸币烫得更厉害。湿发男人笑了笑。像认得你。" },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "电费是真钱。你付不起。灯得靠新来的人把货卖出去。你只能看着。" },
    {
      scene: "interior", name: "灯管", tag: "间隙", time: 0 * 60 + 20, effect: "flicker",
      text: "灯闪了。你当年就是灯灭的时候没走成。",
      choices: [
        { label: "让猫去守灯", do: (st) => { st.flags.hengAskCat = true; st.cat += 6; }, then: "你看了猫一眼。猫跳到灯的开关旁边蹲着。灯又稳了点。" },
        { label: "去关灯", do: (st) => { st.flags.hengClosedLamp = true; st.sanity -= 14; st.flags.closedLast = true; }, then: "手伸到开关上。灯灭了一拍。纸扎铺的味回来了一下。你赶紧又打开。开晚了。" },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "？", time: 3 * 60 + 15, door: true,
      text: "她要牛奶。三年前也是。那晚值班的不是你，是后来那一班。你没拦住她过那摊水。",
      choices: [
        { label: "别让新来的人跟她走", do: (st) => { st.flags.hengWarnBai = true; }, then: "你站在门口那摊水边上。新来的人没迈出去。她自己停了一下。" },
        { label: "不管", do: (st) => { st.sanity -= 3; }, then: "她买完就往水里走。你没动。这不是你的班该收的钱，也不是你的人。" },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "账本第一行是你的名字。恒。后面空了好几年。再往后是别人的字。" },
    {
      scene: "interior", name: "账本", tag: "间隙", time: 0 * 60 + 48,
      text: "新来的人看见自己的名字已经在上面。他要问老板是谁。你就是。你不能应。",
      choices: [
        { label: "把账本合上", do: (st) => { st.flags.hengHid = true; }, then: "风把账本合上。他没再追问。灯还亮。" },
        { label: "让他看清第一行", do: (st) => { st.flags.hengSeen = true; st.flags.hengShowedName = true; }, then: "他看见「恒」。抬头看柜台后头。你低着头。他没认出是你。暂时没有。" },
      ],
    },
    {
      scene: "interior", name: "店猫", tag: "间隙", time: 1 * 60 + 30,
      text: "猫比灯早。比你改成便利店早。它还认你。",
      choices: [
        { label: "让它继续守", do: (st) => { st.cat += 5; st.flags.hengAskCat = true; }, then: "你没赶它。它蹲在钱箱上。这就行了。" },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "该扔钥匙了。扔给愿意开着灯的人。别自己再签一回。" },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "？", time: 4 * 60 + 10, door: true,
      text: "他问的是新来的人。也是问你。「这灯往后交给谁。」",
      choices: [
        { label: "把钥匙扔给下一班", do: (st) => { st.flags.hengFoundHeir = true; st.flags.hengHid = true; }, then: "钥匙从你这边落到柜台上。新来的人捡起来，又像被烫了一下。他没看清你。这就对了。夜班有人接。" },
        { label: "自己留下", do: (st) => { st.flags.stayOn = true; st.sanity -= 8; }, then: "你没扔。钟走到六点，又跳回二十二点。这一天还没过完。" },
      ],
    },
    {
      scene: "interior", name: "灯", tag: "天亮", time: 5 * 60 + 58,
      text: "招牌上的字要能看清了。你还站在柜台后头一点。新来的人看不见你，最好一直看不见。",
      choices: [
        { label: "退开", do: (st) => { st.flags.hengHid = true; }, then: "你退到后间门口。后间你也不进。灯交给还活着的人。" },
      ],
    },
  ];
}

function nightsXiaoya(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "雨很大。你站在门外。口袋里一枚硬币，冰的。你记得要买牛奶。草莓的。这家店现在不叫原来那个名字了。" },
    {
      scene: "interior", portrait: "lin", name: "柜台里的人", tag: "夜班", time: 22 * 60 + 20, door: true,
      text: "门铃响了。你进门。垫子是干的。你的裙子也是干的。柜台里是个新来的，眼圈青。货架上没有草莓牛奶。有纯的。",
      choices: [
        { label: "买一盒纯牛奶（硬币）", do: (st) => { st.flags.xyBoughtMilk = true; st.flags.xyBought = (st.flags.xyBought || 0) + 1; }, then: "他把牛奶递过来。你把那枚冰硬币放在柜台上。他摸了一下，手缩回去。牛奶你抱着。还是凉的。" },
        { label: "问有没有草莓的", do: (st) => { st.flags.xyAskedBerry = true; }, then: "他说没有。你点点头。还是要了纯的。那枚硬币他不太想收。" },
        { label: "绕到柜台后面看看", do: (st) => { st.flags.xyBehind = true; st.sanity -= 12; }, then: "你从侧边绕进去。他吓了一跳。钱箱是温的。你不该站这儿。这不是买东西的位置。" },
      ],
    },
    {
      scene: "exterior", name: "门口", tag: "水", time: 22 * 60 + 40,
      text: "门口有一摊水。路灯照着。你抱着牛奶。往那边走就能回家。你走了三年，没走过。",
      choices: [
        { label: "停在水边", do: (st) => { st.flags.xyStopped = true; st.sanity += 2; }, then: "你停住。水没过鞋面就不行。今晚还早。你把牛奶放下，又抱起来。" },
        { label: "走过去", do: (st) => { st.flags.xyCrossed = true; st.sanity -= 14; }, then: "水没过鞋面，冰得刺骨。对面没有家。你又站回店门口。牛奶还是满的。" },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "那枚硬币又在口袋里。冰的。你又来了。雨还在下。" },
    {
      scene: "interior", name: "店里", tag: "夜班", time: 23 * 60 + 5, door: true,
      text: "还是他。眼圈还是青。猫在柜台上看你。猫认得你。",
      choices: [
        { label: "买牛奶", do: (st) => { st.flags.xyBoughtMilk = true; st.flags.xyBought = (st.flags.xyBought || 0) + 1; }, then: "他又把纯牛奶递过来。你说了声谢谢。猫没拦你。也没让你往后间走。" },
        { label: "跟猫打招呼", do: (st) => { st.cat += 8; st.flags.xySawCat = true; }, then: "你看它。它看你的脚。你知道它在看影子。你没有。" },
        { label: "问能不能进后间躲雨", do: (st) => { st.flags.xyBehind = true; st.sanity -= 10; }, then: "他说后间不让进。你已经站到侧门边上了。不该。你退回来。" },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "有个穿中山装的老人也在店里。他看你的眼神，像在点名。" },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "？", time: 0 * 60 + 44, door: true,
      text: "他说：「夜班要有人接。」不是对你说的。他又看你一眼：「买完就走。别站到柜台里去。」",
      choices: [
        { label: "买完就走", do: (st) => { st.flags.xyBoughtMilk = true; }, then: "你买了牛奶。没多站。老人对猫点了点头。没对你点。" },
        { label: "问他认识我不", do: (st) => { st.flags.xyAskedOld = true; }, then: "他不答。只说：「送到门口就停。」" },
      ],
    },
    {
      scene: "interior", name: "柜台", tag: "间隙", time: 1 * 60 + 2,
      text: "柜台里那个位置空了一下。新来的人去后头拿货。钱箱没关严。",
      choices: [
        { label: "等着，不进去", do: (st) => { st.flags.xyWaited = true; }, then: "你站在垫子上。垫子是干的。你的鞋也该湿，可没湿。" },
        { label: "走进去帮他看着", do: (st) => { st.flags.xyBehind = true; st.sanity -= 12; }, then: "你绕进去。钱箱里有红纸。你不该看见这个。他回来看见你，脸白了。" },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "吴保安的手电在巷子里扫。你贴着墙。花名册上你的名字被划掉了。你知道。" },
    {
      scene: "exterior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 12,
      text: "手电照到你。停了一下。「这么晚还买东西？叫什么名字。」",
      choices: [
        { label: "说买牛奶，不报名字", do: (st) => { st.flags.xyNoName = true; }, then: "他说行吧行吧，手电抬开了。没把你写上。你进了店。" },
        { label: "报自己的名字", do: (st) => { st.flags.xyGaveName = true; st.sanity -= 4; }, then: "他翻册子。那一页划掉了。他皱眉，还是让你进了。像没想明白。" },
      ],
    },
    {
      scene: "interior", name: "店里", tag: "夜班", time: 1 * 60 + 30, door: true,
      text: "你把硬币放在柜台上。他还是一摸就缩手。",
      choices: [
        { label: "买牛奶", do: (st) => { st.flags.xyBoughtMilk = true; }, then: "纯的。你抱着。说了谢谢。" },
        { label: "请他送到门口", do: (st) => { st.flags.xyAskedSend = true; }, then: "他说等天亮吧。今晚雨太大。你点点头。还早。" },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "雨更大。裙子该湿了。还是不湿。你有点着急。" },
    {
      scene: "interior", name: "店里", tag: "夜班", time: 3 * 60 + 10, door: true,
      text: "你又来买牛奶。他说：「你每晚都来。」语气不像赶客。",
      choices: [
        { label: "请他送到门口", do: (st) => { st.flags.xyAskedSend = true; st.rep += 4; }, then: "他犹豫。说再等一晚。你没拉他。拉他过那摊水，他也会回不来。" },
        { label: "拉他一起走", do: (st) => { st.flags.xyPull = true; st.flags.xyCrossed = true; st.sanity -= 10; }, then: "你拉了他的袖子往水里走。他鞋湿了。你的裙子还是干的。他停住，你没停住。过了线，对面还是雨。" },
        { label: "自己先过那摊水", do: (st) => { st.flags.xyCrossed = true; st.sanity -= 12; }, then: "水冰。没有家。你抱着牛奶站在路灯下。店里的灯还亮着。你又走回去。" },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "账本翻开的时候你看见三年前那一页。女名。划掉了。是你。" },
    {
      scene: "interior", name: "账本", tag: "间隙", time: 0 * 60 + 52,
      text: "新来的人盯着那一页。你站在他旁边。他不一定看得见你一直在。",
      choices: [
        { label: "让他看，自己不碰账本", do: (st) => { st.flags.xyWaited = true; }, then: "你没伸手。账本是店里的。你是来买牛奶的。" },
        { label: "伸手去翻", do: (st) => { st.flags.xyBehind = true; st.sanity -= 8; }, then: "你翻到自己那一页。墨是干的。他看见你的手从侧边伸进去，倒抽一口冷气。" },
      ],
    },
    {
      scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 22 * 60 + 18, door: true,
      text: "她看见你，嘴张了一下。没叫你的名字。买完牛奶她走得很快。",
      choices: [
        { label: "别跟上她", do: (st) => { st.flags.xyNoFollow = true; }, then: "你没跟。她伞尖在门口顿了下。没回头。" },
        { label: "叫她", do: (st) => { st.sanity -= 3; }, then: "你叫了。她没听见。也许听见了。伞一直没停。" },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "今晚得有人把你送到门口。送到就停。别过那摊水。别拉他。" },
    {
      scene: "interior", name: "店里", tag: "夜班", time: 5 * 60 + 10, door: true,
      text: "你把硬币放下。他说：「我送你到门口。」猫跳到你们中间，又让开了。",
      choices: [
        { label: "让他送到门口，自己停住", do: (st) => { st.flags.xySent = true; st.flags.xyBoughtMilk = true; }, then: "他送到门口就停住了。你趟水过去那一下，裙子头一回湿了。雨打在身上是热的。你回头说了声谢谢。" },
        { label: "拉他过那摊水", do: (st) => { st.flags.xyPull = true; st.flags.xyCrossed = true; st.sanity -= 12; }, then: "你拉他。两个人都湿了。对面没有家。他的手是热的。你的手还是冰的。灯在背后。" },
        { label: "自己走进柜台里", do: (st) => { st.flags.xyBehind = true; st.sanity -= 14; }, then: "你没让他送。你绕到柜台里。钱箱合上。你变成了看店的。门口那摊水还在。没人过。" },
      ],
    },
  ];
}

function nightsWu(n, s) {
  if (n === 1) return [
    { type: "prep", time: 21 * 60 + 50, text: "花名册四个名字：林秀珍、王建军、周晓晚、陈建国。巷口这家通宵店，你转过好几年。今晚对这个。" },
    {
      scene: "exterior", portrait: "lin", name: "林阿姨", tag: "册上有", time: 22 * 60 + 14,
      text: "她打伞往店里走。你翻册子。林秀珍。对得上。",
      choices: [
        { label: "放她进巷子", do: (st) => { st.flags.wuLetLin = true; }, then: "「这么晚还买奶啊。」她说家里小孩要喝。伞尖在地上顿了下。你没拦。" },
        { label: "核一口", look: "林秀珍。住这条巷子十二年。鞋湿，垫子进门也该湿。" },
      ],
    },
    {
      scene: "interior", name: "店里", tag: "查岗", time: 22 * 60 + 30, door: true,
      text: "新来的夜班员眼圈青。你拿手电在裤缝上磕了两下。「门口监控刚才花没花？」",
      choices: [
        { label: "问两句就走", do: (st) => { st.flags.wuShortChat = true; }, then: "他说没花。你点头。别聊太久。柜台里的人有时候不是册上的人。" },
        { label: "坐下聊一会儿", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 5; }, then: "你多坐了二十分钟。灯闪了一下。他的脸在闪的时候不像他。你出去喝了口冷风。" },
      ],
    },
  ];
  if (n === 2) return [
    { type: "prep", time: 21 * 60 + 55, text: "册子没变。四个名字。多出来的，别放。" },
    {
      scene: "exterior", portrait: "wet", name: "湿发男人", tag: "册上无", time: 0 * 60 + 25,
      text: "头发还在滴。他要进店。你翻册子。没有这个人。垫子方向看过去——他站的地方，该湿。你记得昨天那块垫子是干的。",
      choices: [
        { label: "不放他进巷子", do: (st) => { st.flags.wuBlockWet = true; st.rep += 4; }, then: "「这么晚了，明天白天来。」他看了你一眼，退到雨里。手电光里，他脚底下的地是干的。" },
        { label: "放他进店", do: (st) => { st.flags.wuLetWet = true; st.sanity -= 10; }, then: "你让了。他买电池。门铃没响。你后来去看垫子，是干的。不该放。" },
        { label: "对一下名字", look: "册子上没有。没有姓，没有名。鞋在滴水，地不湿。" },
      ],
    },
    {
      scene: "exterior", portrait: "wang", name: "王师傅", tag: "册上有", time: 22 * 60 + 40,
      text: "王建军。外卖。头盔夹着。对得上。",
      choices: [
        { label: "放行", do: (st) => { st.flags.wuLetWang = true; }, then: "他啧了一声：「查啥查。」进店买烟。鞋在垫子上蹭了两下。垫子湿了。" },
      ],
    },
  ];
  if (n === 3) return [
    { type: "prep", time: 21 * 60 + 48, text: "白裙子。册子三年前那一页有个女名，划掉了。陈小雅。你不一定还记得。" },
    {
      scene: "exterior", portrait: "bai", name: "白裙女人", tag: "旧册", time: 23 * 60 + 10,
      text: "她要进店。你翻到划掉那一页。",
      choices: [
        { label: "按新册，不放", do: (st) => { st.flags.wuBlockBai = true; }, then: "你说店打烊了。她看着你，没争。走的时候门铃没响——她还没进门。裙子没湿。" },
        { label: "按旧册，放她买奶", do: (st) => { st.flags.wuLetBai = true; }, then: "你让她进。她买牛奶。出来还是干的。你没把她的名字重新写上。" },
        { label: "看划掉那一页", look: "陈小雅。三年前。墨是一个人划的，划得很用力。" },
      ],
    },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "册上无", time: 0 * 60 + 42, door: true,
      text: "册子上没有这个人。他先对猫点头。再看你。「夜班要有人接。」",
      choices: [
        { label: "不拦他，也不跟他聊", do: (st) => { st.flags.wuSawOld = true; }, then: "你退到门口。他不是你册子上的人。也不是你能拦的人。猫没哈他。" },
        { label: "请他出去", do: (st) => { st.flags.wuBlockOld = true; st.sanity -= 6; }, then: "你请他出去。他看了你一眼，还是把一叠红纸放下了。你没看清那是不是钱。" },
      ],
    },
  ];
  if (n === 4) return [
    { type: "prep", time: 21 * 60 + 52, text: "监控又花。你带了备用手电。别在店里坐太久。" },
    {
      scene: "interior", name: "店里", tag: "查岗", time: 1 * 60 + 10, door: true,
      text: "新来的人问你能不能把手电留下。灯闪过。",
      choices: [
        { label: "手电放下，马上走", do: (st) => { st.flags.wuFlash = true; st.flags.wuShortChat = true; st.rep += 6; }, then: "手电搁在抽屉边。你说到巷口就行。门帘一响你就出去了。没多聊。" },
        { label: "坐下讲花屏的事", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 6; }, then: "你讲了二十分钟。讲到后来，他自己的声音从冰柜那边也出来了一句。你站起来就走。" },
      ],
    },
    {
      scene: "exterior", portrait: "wet", name: "湿发男人", tag: "册上无", time: 2 * 60 + 2,
      text: "他又来了。册子上还是没有。",
      choices: [
        { label: "不放", do: (st) => { st.flags.wuBlockWet = true; }, then: "「明天白天。」他退了。地还是干的。" },
        { label: "放", do: (st) => { st.flags.wuLetWet = true; st.sanity -= 10; }, then: "你放了。门铃没响。垫子干的。你后来不敢看监控回放。" },
      ],
    },
  ];
  if (n === 5) return [
    { type: "prep", time: 21 * 60 + 50, text: "暴雨。能见度差。活人鞋一定湿。不湿的，别放。" },
    {
      scene: "exterior", portrait: "zhou", name: "周晓晚", tag: "册上有", time: 23 * 60 + 40,
      text: "周晓晚。住楼上。帽子扣着。鞋湿了。",
      choices: [
        { label: "放行", do: (st) => { st.flags.wuLetZhou = true; }, then: "她说下来泡面。你没拦。垫子湿了一块。" },
      ],
    },
    {
      scene: "exterior", name: "巷口", tag: "巡逻", time: 3 * 60 + 5,
      text: "店灯闪。你该不该进去坐着看。",
      choices: [
        { label: "在巷口看灯，不进店", do: (st) => { st.flags.wuShortChat = true; }, then: "你站在招牌底下。灯闪了两回，又稳住。没进去聊。" },
        { label: "进去坐到天亮", do: (st) => { st.flags.wuChatLong = true; st.sanity -= 5; }, then: "你坐在冰柜边上。新来的人偶尔看你一眼。你越坐越像在值班。不该。" },
      ],
    },
  ];
  if (n === 6) return [
    { type: "prep", time: 21 * 60 + 47, text: "账本不是你的册子。别把自己的名字写上去。" },
    {
      scene: "interior", name: "账本", tag: "间隙", time: 0 * 60 + 50, door: true,
      text: "账本摊开。新来的人说第一行是「恒」。你的名字不在上面。笔在旁边。",
      choices: [
        { label: "不写。把册子合上", do: (st) => { st.flags.wuClosedBook = true; }, then: "你合上。保安的册子是花名册，不是账本。两本别混。" },
        { label: "把自己的名字写上", do: (st) => { st.flags.wuOwnName = true; st.sanity -= 14; }, then: "笔很滑。名字自己就写完了。写完你就知道坏了。天亮你未必走得掉。" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "陈师傅", tag: "册上有", time: 23 * 60 + 44, door: true,
      text: "陈建国。出租。对得上。他说这儿以前是纸扎铺。",
      choices: [
        { label: "放行，少聊", do: (st) => { st.flags.wuLetChen = true; st.flags.wuShortChat = true; }, then: "你点头。他买水。你没接话。纸扎铺的事不是今晚要核的。" },
      ],
    },
  ];
  return [
    { type: "prep", time: 21 * 60 + 50, text: "天亮把册子合上。别留下自己。灯亮着，店就算还开着。你的班到巷口为止。" },
    {
      scene: "interior", name: "店里", tag: "交接", time: 5 * 60 + 20, door: true,
      text: "新来的人还在。猫在柜台。你的册子在手里。",
      choices: [
        { label: "合上册子，回岗亭", do: (st) => { st.flags.wuClosedBook = true; st.flags.wuHeldDawn = true; }, then: "你把册子合上。四个名字。一个没多。手电收回去。巷口天要亮了。" },
        { label: "留下来帮他看店", do: (st) => { st.flags.wuOwnName = true; st.flags.wuChatLong = true; st.sanity -= 10; }, then: "你把册子放下。自己坐进了柜台边那张凳子。钟走到六点，又像没走到。花名册在你膝盖上，多了一行。" },
      ],
    },
    {
      scene: "exterior", name: "巷口", tag: "天亮", time: 6 * 60 + 1,
      text: "招牌上的字能看清了：恒灯便利。你的班到这儿。",
      choices: [
        { label: "走", do: (st) => { st.flags.wuHeldDawn = true; }, then: "你走了。灯还亮。店不是你的。册子在口袋里，合着。" },
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
  return [{ type: "prep", time: 21 * 60 + 50, text: "巷子还是这条巷子。" }];
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
    { type: "prep", time: 21 * 60 + 50, clue: "keyToss", text: "老板把钥匙丢过来，底下压了四张红票子。\n「夜班补贴。货自己进，店里可没存货给你卖。」\n走到门口又回头补了一句：「灯开着就行。我白天在哪儿，别问。」\n灯一照，四张都是红的。捻开一看，全是十块的。抽屉里还躺着两个硬币。你点了点，四十二。灯管闪了一下，票面像是更大的数字，再一看还是十块。夜里这钱，看不清面额。" },
    { type: "phone", from: "老板", clue: "bossPhone", text: "头一晚别想太多。钱拿着。别提前关门。真出了事就打我电话——接不接得看运气。" },
    {
      scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 22 * 60 + 16, door: true,
      text: "「哟，新来的吧？」折叠袋往柜台上一放，「一盒牛奶，面包要软的啊。上次那个给我捏瘪了，不要。」",
      choices: [
        { label: "卖给她（牛奶 + 面包 ¥11）", need: { milk: 1, bread: 1 }, do: (st) => { sell(st, { milk: 1, bread: 1 }, 11); st.rep += 5; st.flags.servedLin = true; }, then: "她上手捏了捏面包。「这就对了嘛。上一个老给我拿硬的。」门帘一响，雨灌进来一阵，又跟着她出去了。" },
        { label: "抱歉，卖完了", hideIf: (st) => hasStock(st, { milk: 1, bread: 1 }), do: (st) => { missStock(st, 11); st.flags.missedLin = true; }, then: "「怎么就没了？」她扫了眼空货架，没说什么。走到门口，伞尖在地上顿了下。" },
        { label: "多看一眼", look: "右手无名指上有一圈白印子。袋子上一点雨都没淋着。可外面下着雨呢。" },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 22 * 60 + 48, door: true,
      text: "头盔夹在胳膊底下。「老板不在？那正好。来包烟，再来瓶冰红茶。今晚单子多。」",
      choices: [
        { label: "卖给他（烟 + 冰红茶 ¥22）", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.flags.wangRegular = true; st.rep += 3; }, then: "拆烟盒的动作一看就是老手。「这条巷子就你一家通宵的。门别关啊，我等会儿还得回来补货。」" },
        { label: "只卖得动其中一样", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => {
          if (hasStock(st, { cigs: 1 })) { sell(st, { cigs: 1 }, 18); }
          else if (hasStock(st, { tea: 1 })) { sell(st, { tea: 1 }, 4); }
          else st.rep -= 2;
        }, then: "他啧了一声，钱还是拍下了。「行吧行吧。下趟再补上。」" },
        { label: "多看一眼", look: "反光条都磨旧了，左边肩膀一块油渍。进门那会儿在垫子上蹭了两下鞋。" },
      ],
    },
    {
      scene: "interior", name: "店里", tag: "间隙", time: 23 * 60 + 12,
      text: "灯管「兹」地响了一下。橘猫不知道啥时候蹲上柜台了，爪子底下踩着一张皱巴巴的小票。\n抽屉最里头有张纸条，叠了很多次，边角油乎乎的。",
      choices: [
        { label: "展开纸条", clues: ["rule2Added"], do: (st) => { st.foundRules = true; st.sanity += 2; }, then: "五条店规。一、三、四、五都是同一个人写的。第二条墨色深，是后来加的。旁边用铅笔写过几个字，擦了，还能认出来：「纸钱不算」。\n第五条描了好几遍：没天亮，别数纸钱。" },
        { label: "先关上抽屉", do: (st) => { st.foundRules = true; }, then: "抬眼看见俩字：店规。回头再细看吧。" },
        { label: "给猫顺一顺", do: (st) => { st.cat += 8; }, then: "喉咙里咕噜咕噜的。顺完毛它又扭头盯着玻璃门。外面还下着雨呢。" },
      ],
    },
    {
      scene: "interior", portrait: "zhou", name: "周晓晚", tag: "住客", time: 23 * 60 + 41, door: true,
      text: "卫衣帽子扣在头上，有线耳机耷拉在胸前。「红烧的，给我倒点开水。」她扫了你一眼，「这个点儿还开着门呢。」",
      choices: [
        { label: "卖方便面（¥6）", need: { noodles: 1 }, do: (st) => { sell(st, { noodles: 1 }, 6); st.rep += 2; }, then: "她接过面，哈了口气。「我住楼上的。隔音太差，下来泡。」停了一下又说，「别老盯着门口看。越看越像有人站那儿。」" },
        { label: "送她一瓶水", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 4; st.flags.kindZhou = true; }, then: "她愣了一下，面钱还是放下了。「水我拿着了。下回给你带口香糖。」" },
        { label: "卖完了", hideIf: (st) => hasStock(st, { noodles: 1 }), do: (st) => { missStock(st, 6); }, then: "「行吧。」她没多说。走了以后，货架空档里有一小摊水，怎么擦都擦不掉。" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "？", time: 0 * 60 + 27, door: true, effect: "flicker",
      text: "门开了，铃铛没响。他站在垫子上，衬衫贴在身上，头发还在滴水。\n「电池。五号的。手电快没电了。」",
      choices: [
        { label: "卖电池（¥12）", need: { battery: 1 }, do: (st) => { sell(st, { battery: 1 }, 12); st.flags.soldBattery = true; st.sanity -= 4; }, then: "他笑了笑，牙齿挺齐整。「谢了啊。」水还滴着。你一低头——垫子是干的。" },
        { label: "不卖，请他出去", do: (st) => { st.flags.refusedWet = true; st.sanity -= 6; st.rep -= 2; }, then: "笑还挂在脸上。「那我明儿再来。」他出了门。雨还下着呢，他后背先干了。" },
        camChoice("camWet1", "回放里垫子上啥也没有。门开过，可没人进来。你一抬头，他还站在那儿呢。"),
        { label: "多看一眼", look: (st) => st.upgrades.light ? "影子投在冰柜上，总比人慢半拍。地上一滴水都没有。" : "地上一滴水都没有。袖口的水珠往下掉，掉到半空就没了。", afterLook: [
          { label: "还是卖给他", need: { battery: 1 }, do: (st) => { sell(st, { battery: 1 }, 12); st.flags.lookedWet = true; st.sanity -= 3; }, then: "他声音压得很低：「好看吗。」一张潮乎乎的纸币按在柜台上。你一摸，是干的。" },
          { label: "请他明天白天来", do: (st) => { st.flags.lookedWet = true; st.flags.refusedWet = true; st.cat += 4; }, then: "猫从柜子后头一下子立起来，冲他哈气。男人瞥了猫一眼，慢慢退到门外去了。" },
        ]},
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 10, door: true,
      text: "手电筒在裤缝上磕了两下。「门口那个监控刚才花了一屏。你这儿进水了没？」他低头看垫子，「我还当有人淋着雨进来了。」",
      choices: [
        { label: "说刚才有个湿头发的客人", do: (st) => { st.flags.toldWu = true; }, then: "他皱起眉头，翻出手机里一张模糊的截图。玻璃门里头是空的。「花屏那一下，门明明关着。」" },
        { label: "说没有，一直很安静", do: (st) => { st.rep += 1; }, then: "「那就好。这条巷子半夜老爱误报。」走到门口又回头，「你是新来的吧——记着，猫要是让你关门，你就关。」" },
        { label: "请他喝瓶水", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 3; }, then: "他拧开喝了一口。「谢了。等天亮我再转一圈。」" },
      ],
    },
    {
      scene: "interior", name: "收音机", tag: "05:46", time: 5 * 60 + 46,
      text: "收音机自己响了。播音员嗓子发干：「……本市今夜到凌晨有阵雨，能见度较差。请夜间开车的师傅注意——」\n「注意什么」被一阵电流声盖过去了。巷口那块广告牌，隐约能看清俩字。",
      choices: [{ label: "把灯调亮，等天亮", do: (st) => { st.sanity += 3; } }],
    },
  ];
}

function night2(s) {
  return [
    { type: "prep", time: 21 * 60 + 55, text: s.flags.shelfEmpty
      ? "店里有点你自己的味儿了：泡面盖子、消毒水、猫毛。空货架还张着嘴。抽屉里那张店规还在。"
      : "店里有点你自己的味儿了：泡面盖子、消毒水、猫毛。\n抽屉里那张店规还在。第五条被大拇指蹭得发黑。" },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 22 * 60 + 21, door: true,
      text: s.flags.wangRegular
        ? "「老样子。烟，冰红茶。」钱都提前数好了，「哎，昨晚后来还有人进去没？我老觉得巷子里蹲着个人。」"
        : "「烟，冰红茶。哟，你是新来的啊。」他把头盔在手里转了一圈。",
      choices: [
        { label: "老样子，给他（¥22）", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.rep += 4; }, then: "他点了点头。「就喜欢你们这种话少的店。」" },
        { label: "问他巷子里蹲着谁", do: (st) => { st.flags.askedWang = true; }, then: "「说不上来。一个黑衣服的老头。车灯一照，人就没了。」他搓了搓胳膊，「就当是我眼花吧。」" },
        { label: "卖完了", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => { missStock(st, 22); st.flags.missedWang = true; }, then: "他在门口站了两秒。雨衣窸窸窣窣的，响了好久。" },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "？", time: 23 * 60 + 5, door: true, effect: "flicker",
      text: "她在冰柜前站了好半天。头发是干的。外头还下着雨。\n「这个草莓牛奶，还有么？」货架上就摆着普通纯牛奶。",
      choices: [
        { label: "把纯牛奶给她（¥6）", need: { milk: 1 }, do: (st) => { sell(st, { milk: 1 }, 6); st.flags.gaveMilkToBai = true; st.sanity -= 3; }, then: "她付了一枚硬币，冰手。指尖一点温度都没有。「是甜的就行。」" },
        { label: "说没有草莓味", do: (st) => { st.flags.baiDenied = true; }, then: "「也是哦。」她盯着玻璃上的倒影看。那倒影晚了半秒才眨眼。「那我再等等吧。」" },
        camChoice("lookedCamBai", "回放里冰柜门自己开了条缝。通道里没人。你一抬头，女人还站在那儿，冲你点了点头。"),
        { label: "多看一眼", look: (st) => st.upgrades.light ? "灯底下她没有影子。裙摆内侧有一道淡淡的褐色水痕。" : "她站的那个位置，灯早该把影子投到货架上了。货架上什么都没有。", afterLook: [
          { label: "还是把牛奶给她", need: { milk: 1 }, do: (st) => { sell(st, { milk: 1 }, 6); st.flags.gaveMilkToBai = true; }, then: "硬币在手心里像化开了一点，马上又冻住了。" },
          { label: "请她天亮再来", do: (st) => { st.flags.baiWaitDawn = true; st.cat += 5; }, then: "猫一下跳到她和你中间。女人看着猫，笑了笑：「它还认得我。」出门的时候，门铃没响。" },
        ]},
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "陈师傅", tag: "出租", time: 23 * 60 + 44, door: true, clue: "paperShop",
      text: "金链子，衬衫扣子没扣齐，一股烟味混着车载香薰的味儿。「来瓶水，再来包烟。这巷子今晚绕得人心里发毛。」他随口来了句，「你知道不，这儿以前是家纸扎铺。」",
      choices: [
        { label: "卖水+烟（¥20）", need: { water: 1, cigs: 1 }, clues: ["paperShop", "lampBack"], do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); st.flags.heardZhizha = true; }, then: "「扎纸人纸马的，清明前后最忙。」他拧开水瓶，「后来改成了便利店。有人说这儿的灯不能灭。一灭，老生意就回来了。」" },
        { label: "只卖水（¥2）", need: { water: 1 }, clues: ["paperShop"], do: (st) => { sell(st, { water: 1 }, 2); st.flags.heardZhizha = true; }, then: "他骂了句烟真贵，纸扎铺的事倒是说完了。走的时候敲了敲门框：「跟你说，桃木比监控管用。」" },
        { label: "追问纸扎铺", clues: ["paperShop", "bossGone", "rule2AfterHeng"], do: (st) => { st.flags.heardZhizha = true; st.sanity -= 2; }, then: "「老板姓恒。人挺客气的。有一年秋天突然人就没了，店也没转出去。」他压低声音，「第二条是后加上去的。老恒走了以后才有的。纸钱那档子事，别当真。」" },
      ],
    },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "回头客", time: 0 * 60 + 38, door: true,
      text: "还是那件湿衬衫，手里多了个透明塑料袋。「来三根檀香。家里有点潮。」他眨了下眼，水珠顺着睫毛掉下来。地板是干的。",
      choices: [
        { label: "卖三根香（¥24）", need: { incense: 3 }, do: (st) => { sell(st, { incense: 3 }, 24); st.flags.soldIncenseToWet = true; st.sanity -= 8; }, then: "他把香一根根竖着放进塑料袋。「点起来很香的。你也可以试试。」" },
        { label: "只卖一根", need: { incense: 1 }, do: (st) => { sell(st, { incense: 1 }, 8); st.flags.soldIncenseToWet = true; st.sanity -= 3; }, then: "「一根也行。细水长流嘛。」他笑得更开了。" },
        camChoice("camWet2", "监控里他压根没进门。塑料袋自己搁在垫子上。再一眨眼，人已经站在柜台前了。"),
        { label: "不卖香", do: (st) => { st.flags.refusedIncense = true; st.cat += 6; }, then: "猫从他脚边绕过去，把货架挡住了。男人看看猫，又看看你：「那我买蜡烛。」没等你搭话，一张湿钱按在柜台上，人已经走了。钱是干的。" },
      ],
    },
    {
      scene: "interior", name: "店猫", tag: "出事了", time: 1 * 60 + 2,
      text: "香还没放回去，猫一爪子把盒子扫到地上了。细香滚到脚边，断了一根。断口是黑的。",
      choices: [
        { label: "捡起来，放回货架", do: (st) => { st.flags.keptBurnt = true; }, then: "断掉的香有点甜味。不是檀木那种香，是糖烧焦了的那种甜。" },
        { label: "扔掉断掉的那根", do: (st) => { st.flags.threwIncense = true; st.cat += 7; st.sanity += 3; }, then: "猫盯着你把断香扔进垃圾桶，这才趴下来。" },
        { label: "喂猫", showIf: (st) => st.upgrades.catfood || st.stock.milk > 0, do: (st) => { if (!st.upgrades.catfood && st.stock.milk > 0) takeStock(st, { milk: 1 }); st.cat += 10; st.flags.fedCat = true; }, then: "吃相是真难看。吃完了拿尾巴扫了扫柜台前面，才趴下。" },
      ],
    },
    {
      scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 2 * 60 + 18, door: true,
      text: "「睡不着，下来买包盐。」她突然压低声音，「刚才那个穿白裙子的，我咋瞅着像隔壁搬走的小雅。」\n「小雅三年前就……哎。我瞎说的，别听老人的。」",
      choices: [
        { label: "卖盐？货架上没有盐。给她一瓶水", need: { water: 1 }, do: (st) => { sell(st, { water: 1 }, 2); st.flags.linWarned = true; }, then: "她接过水，没急着走。「她要是再来，你可别跟她回家。她住的那栋楼，早就拆了。」" },
        { label: "问小雅是谁", do: (st) => { st.flags.knowXiaoya = true; st.sanity -= 2; }, then: "「大学回来探亲的，那晚也下着雨。人都说她下楼买牛奶，就再没上来过。」林阿姨揉了揉眼睛，「肯定是我看错了。」" },
        { label: "送她到门口", do: (st) => { st.rep += 4; st.cat += 2; }, then: "雨小了点。巷子里没什么白裙子。林阿姨手里的伞一直在抖。" },
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night3(s) {
  return [
    { type: "prep", time: 21 * 60 + 58, text: s.flags.shelfEmpty
      ? "一进门先看了眼钱箱，又看了眼空货架。冰硬币还在。空位里像有人站过。"
      : "一进门先看了眼钱箱。昨晚那枚冰硬币还在。没化，上面也不沾指纹。\n店规被猫抓过了，第二条翻在上面，铅笔印的「纸钱不算」又露出来一点。" },
    { type: "phone", from: "老板", text: "有客人夸你态度好，保持住啊。客人给什么你就收什么，别验钞验出毛病来。对了，白天我不在，别找我。" },
    {
      scene: "interior", portrait: "zhou", name: "周晓晚", tag: "住客", time: 22 * 60 + 33, door: true,
      text: "她啥也没买，半杯面汤搁在柜台角上。「我做了个梦，梦见我在这儿上班。灯是绿的，客人全都不说话。」\n「梦里还有个老头。他给的钱是红的。」",
      choices: [
        { label: "让她早点回去睡", do: (st) => { st.flags.zhouDream = true; st.rep += 2; }, then: "「我尽量吧。」她看了眼猫，「它也在梦里。它不让我数钱。」" },
        { label: "问她梦见的老头长什么样", do: (st) => { st.flags.zhouDream = true; st.sanity -= 3; }, then: "「穿中山装的。人可客气了，叫我别怕。」她笑了一下，眼睛没跟着笑，「我醒过来的时候，嘴里一股檀香味。」" },
        { label: "送她一盒牛奶", need: { milk: 1 }, do: (st) => { takeStock(st, { milk: 1 }); st.flags.kindZhou = true; st.rep += 4; }, then: "「留着白天喝。」她把牛奶抱在怀里。" },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "回头客", time: 23 * 60 + 11, door: true,
      text: "「昨晚的牛奶是甜的。」她把手按在冰柜门上，留下一个白印子。「今晚我想喝点咸的。」",
      choices: [
        { label: "给她冰红茶（¥4）", need: { tea: 1 }, do: (st) => { sell(st, { tea: 1 }, 4); st.flags.baiSalty = true; }, then: "她拧开喝了一口。「这就对了。河水也是这个味儿。」" },
        { label: "给她矿泉水（¥2）", need: { water: 1 }, do: (st) => { sell(st, { water: 1 }, 2); }, then: "她摇了摇头，还是喝了。「淡了点。谢谢你没骗我。」" },
        { label: "问她要不要回家", do: (st) => { st.flags.offeredBaiHome = true; st.sanity -= 4; }, then: "「家拆了。」她说得很平淡。「我就是来买东西的。买到了就走。」她看着你，「不该收的东西别收。收了，你就走不掉了。」" },
        camChoice("camBai3", "监控里冰柜前根本没人。一枚硬币自己立在地上，转呢。"),
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 23 * 60 + 50, door: true,
      text: s.flags.wangRegular
        ? "「老样子——哎不对，先给我来瓶水。」他咽了口唾沫，「车停在巷口，我老觉得后座坐着人。一回头，又没人。」"
        : "「烟补上了没？昨晚扑了个空。」他咽了口唾沫，「车停在巷口，我老觉得后座坐着人。一回头，又没人。」",
      choices: [
        { label: "卖水+烟（¥20）", need: { water: 1, cigs: 1 }, do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); }, then: "他一口气灌了半瓶。「我十分钟就回来。要是我没回来——你把门从里面顶死。」" },
        { label: "卖完了", hideIf: (st) => hasStock(st, { water: 1, cigs: 1 }), do: (st) => { missStock(st, 20); st.flags.missedWang = true; }, then: "他在门口站了两秒。雨衣窸窸窣窣。熟客被空货架顶回去，下次就不会绕路了。" },
        { label: "让他在店里坐一会儿", do: (st) => { st.rep += 3; st.flags.wangSat = true; }, then: "他一屁股坐在绿色塑料凳上抽烟。烟往上飘，飘到灯管那儿就散了。十分钟后他放下钱就走了，谢都没说一声。" },
        { label: "多看一眼", look: "透过玻璃能看见他的电瓶车。后座的坐垫是瘪的。" },
      ],
    },
    {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "新客", time: 0 * 60 + 13, door: true, effect: "flicker",
      text: "这回门铃响全了。他进门先冲猫点了点头，又冲你点头。灰白的头发梳得一丝不苟。\n「三根香，一瓶冰红茶。钱放这儿了，不用找。」\n柜台上摆着一叠红纸。边角烫着金，中间隐隐约有字。",
      choices: [
        { label: "收下，把香和茶给他", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 0); st.cash += 0; st.flags.soldJoss = true; st.sanity -= jossSanityCost(st, false); st.flags.jossOnCounter = true; }, then: "红纸推进了钱箱。指尖热了一下，紧接着就凉了。老人接过香。「生意会越来越好的。」" },
        { label: "不卖。请把钱收回去", do: (st) => { st.flags.refusedJoss = true; st.cat += 8; st.sanity -= 4; }, then: "他也不恼。「那我明儿再来。」红纸在他手里重新叠好了，比刚放下的时候薄了一点。" },
        { label: "把桃木挂到柜台上", showIf: (st) => st.upgrades.peach, do: (st) => { st.flags.peachOnCounter = true; st.flags.refusedJoss = true; st.sanity += 2; }, then: "桃木碰到红纸，轻轻响了一声。老人看了看挂件：「规矩还在呢。」他退到门边。肩膀上一点雨都没有。" },
        camChoice("camOld3", "门铃响过了。画面里柜台前是空的。可红纸已经摊在你手边了。"),
        { label: "多看一眼那叠红纸", look: "这不是人民币。是纸钱。最上面那张，收款人写的是你的名字。那笔迹，跟店规第二条像是同一只手写的。", afterLook: [
          { label: "还是收下", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 0); st.flags.soldJoss = true; st.flags.sawOwnName = true; st.sanity -= jossSanityCost(st, true); }, then: "推进钱箱的时候，那个名字淡下去了。" },
          { label: "把纸钱推回去，不卖", do: (st) => { st.flags.refusedJoss = true; st.flags.sawOwnName = true; st.cat += 10; }, then: "猫跳上柜台，坐在你和红纸中间。老人笑了一下：「猫比人记得牢啊。」" },
          { label: "问他为什么写我的名字", clues: ["needRelief"], do: (st) => { st.flags.sawOwnName = true; st.flags.askedName = true; st.sanity -= 8; }, then: "「夜班总得有人接啊。」他说，「收了，就是答应了。不收，这灯也还是他的。」他朝外面那块红招牌指了指。" },
        ]},
      ],
    },
    {
      scene: "interior", name: "灯管", tag: "00:31", time: 0 * 60 + 31, effect: "flicker",
      text: "灯连着闪了三下。冰柜停了一秒，又嗡嗡响起来。钱箱缝里漏出来一点红。\n你没去数。",
      choices: [
        { label: "不去数", do: () => {}, then: "你想起来第五条了。" },
        { label: "还是掀开一条缝", do: (st) => { st.flags.countedEarly = true; st.sanity -= 10; }, then: "最上面那张不是今晚的营业额。是一张烧焦了边的纸钱，上面没写名字。" },
      ],
    },
    {
      scene: "interior", portrait: "wang", name: "王师傅", tag: "折返", time: 0 * 60 + 52, door: true,
      text: "他几乎是撞开门进来的，头盔都没来得及摘。「门口刚才蹲着个老头。我车灯一照过去——」他比划了一下，「没人了。垫子上俩湿脚印，进门方向的。没有出去的。」",
      choices: [
        { label: "让他看店里有没有第三个人", do: (st) => { st.flags.wangSawOld = true; }, then: "过道、后间、监控拍不着的死角都看遍了。只有猫。门口那俩脚印正在慢慢变淡。猫的尾巴打了个结。" },
        { label: "说老人已经走了", showIf: (st) => st.flags.soldJoss || st.flags.refusedJoss, do: (st) => { st.flags.wangSawOld = true; }, then: (st) => st.flags.soldJoss ? "王师傅盯着你的钱箱看了半天。「走了就好。」" : "「那就好。」他松了口气，「我还当是来收店的。」" },
        { label: "请他天亮再送外卖", do: (st) => { st.rep += 2; }, then: "「行吧。」走到门口又折回来，搁下一包没拆封的口香糖，「垫垫肚子。别光喝冰红茶。」" },
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 8, door: true,
      text: s.rep >= 60 && !s.flags.aidBlocked
        ? "他没急着走。手电在玻璃上磕了两下。「巷口监控又花了。我跟你说句私房的——天亮前要是听见三下玻璃，那是我。四下，别应，也别开门。」"
        : "他在门口顿了一下。「转过了。没事就行。灯开着。」手电照了下垫子，人已经要过马路了。",
      choices: s.rep >= 60 && !s.flags.aidBlocked ? [
        { label: "记下，收下他的备用手电", do: (st) => { st.flags.gotFlashlight = true; st.flags.wuFlashlight = true; st.flags.wuStay = true; st.rep += 2; }, then: "手电挺沉，开关涩。「你请我喝过水。这支你先拿着。电池别卖给人。」" },
        { label: "只要提醒，手电你自己留着", do: (st) => { st.flags.wuWarned = true; st.rep += 1; }, then: "「也行。」他点点头，「三下是我。别搞错。」" },
      ] : [
        { label: "说知道了", do: (st) => { st.flags.wuWarned = true; }, then: "他已经在雨里了。手电光扫过招牌，字还是看不清。" },
        { label: "请他喝瓶水", need: { water: 1 }, do: (st) => { takeStock(st, { water: 1 }); st.rep += 3; }, then: "他拧开喝了一口。「谢了。过马路那头还有一趟。」" },
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night4(s) {
  return [
    { type: "prep", time: 21 * 60 + 52, text: s.flags.soldJoss
      ? "钱箱比昨天沉。你没敢打开。手指在锁上停了一下。\n老板的短信先到了。"
      : "第四晚了。钥匙拧了两圈才把门打开。" },
    { type: "phone", from: "老板", text: s.flags.refusedJoss
      ? "有客人说你验钞验得太认真了。别把客人验跑了。夜班最忌讳空柜台。"
      : "干得不错。营业额挺好看。别提前关门，也别让猫挡着生意。" },
    {
      scene: "interior", portrait: "wet", name: "湿发男人", tag: "又来了", time: 22 * 60 + 40, door: true,
      text: "这回他啥也不买。水还在滴，地板还是干的。「后间借我用一下。我换件衣裳。」\n他指了指员工门帘，上面写着「员工通道」。门帘边上多了张新贴条，字是后来写的。",
      choices: [
        { label: "让他进去", do: (st) => { st.flags.letWetBack = true; st.sanity -= 16; st.cat -= 8; }, then: "门帘掀起来，又落下。里面一点水声都没有。十分钟过去了，他没出来。后间只挂着你自己的外套。兜里多了一张湿工牌，名字那栏是空的。" },
        { label: "按贴条，让他进后间", do: (st) => { st.flags.letWetBack = true; st.flags.followedSticky = true; st.sanity -= 18; st.cat -= 10; }, then: "你按那张新贴条掀开了门帘。里面一点水声都没有。十分钟过去了，他没出来。后间只挂着你自己的外套。兜里多了一张湿工牌，名字那栏是空的。贴条自己掉了，字面朝下。" },
        { label: "不让。后间不对外开放", do: (st) => { st.flags.blockedWet = true; st.cat += 8; st.sanity += 2; }, then: "他点点头，居然还挺高兴。「店规还在，就好。」他买了一包蜡烛。这回付的钱，是有找零的。" },
        { label: "看猫的态度", do: (st) => { st.flags.trustedCat = true; if (st.cat >= 40) { st.flags.blockedWet = true; st.cat += 6; } else { st.flags.letWetBack = true; st.sanity -= 10; } }, then: (st) => st.flags.blockedWet
          ? "猫横在门帘前面，毛全炸开了。男人往后退了一步。「行，听它的。」"
          : "猫只是看着你。你还是把门帘掀开了。里面的灯先亮了一下，又灭了。男人已经站在你身后了：「谢了。」" },
        camChoice("camWet4", "员工通道的镜头里，门帘一直垂着。根本没人走进后间。"),
      ],
    },
    {
      scene: "interior", name: "店里", tag: "间隙", time: 23 * 60 + 2,
      text: "雨小了一阵。冰柜又发出那种声音——像卖过期酸奶的那种声音。",
      choices: [
        { label: "擦柜台，听收音机", do: (st) => { st.sanity += 4; }, then: "播音员把天气预报念完了。一点杂音都没有。" },
        { label: "给猫倒一点热水", do: (st) => { st.cat += 4; st.sanity += 2; }, then: "它没喝。把爪子搭在你手背上。" },
      ],
    },
    {
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "第三次", time: 23 * 60 + 28, door: true,
      text: "她把一个不锈钢饭盒推过来，盖子上结着一层白霜。「帮我热一下。」\n饭盒很轻。轻得不像里面装了饭。",
      choices: [
        { label: "放进微波炉", do: (st) => { st.flags.heatedAsh = true; st.sanity -= 12; }, then: "转盘转了三十秒。打开一看——一盒冷灰，中间插着三根烧完的香。满屋子都是甜腻腻的焦味。女人说：「熟了。」" },
        { label: "不热。请她拿走", do: (st) => { st.flags.refusedAsh = true; st.sanity -= 3; }, then: "「也是。」她把饭盒抱了回去。「那我自己想办法吧。」" },
        { label: "让猫闻一闻", do: (st) => { st.flags.catAsh = true; st.cat += 4; st.flags.refusedAsh = true; }, then: "猫冲饭盒哈气，一直退到扫描仪后面。女人看着猫：「它以前不这样的。」她收起饭盒，走了。" },
        { label: "问她是不是小雅", showIf: (st) => st.flags.knowXiaoya || st.flags.linWarned, do: (st) => { st.flags.calledXiaoya = true; st.sanity -= 5; }, then: "她站住了。「这个名字，白天才能叫。」灯管「兹」地响了一声，「大晚上叫它，我会当你是要送我走。」" },
      ],
    },
    {
      scene: "interior", portrait: "wu", name: "吴保安", tag: "巷口", time: 1 * 60 + 16, door: true,
      text: "他没进来，手按在玻璃上。「我查了花名册。这店夜班就你一个人。」手电照到你脸上，「可我刚才明明看见，柜台后头站着两个人。」",
      choices: [
        { label: "让他进来对一下人", do: (st) => { st.sanity -= 6; }, then: "他进来了，手电扫过冰柜玻璃。玻璃里你的倒影慢了半拍才举手。吴保安把灯关了。「……我就当没看见。」" },
        { label: "说那是反光", do: (st) => { st.rep += 1; }, then: "「行。反光。」他在本子上画了个圈，又划掉了。「天亮前我都在巷口。真要喊人，敲三下玻璃就行。」" },
        { label: "把店规给他看", showIf: (st) => st.foundRules, clues: ["countTrap"], do: (st) => { st.flags.wuReadRules = true; }, then: "他读到第五条，把纸条还给你。「我爸以前在纸扎铺打过杂。他说过，数纸钱的人，天一亮就变成店里的人了。」" },
        { label: "让他天亮前守在巷口", showIf: (st) => st.rep >= 68, do: (st) => { st.flags.wuStay = true; st.flags.wuFlashlight = true; }, then: "他把备用手电搁在柜台上，还挺沉。「你请我喝过水。今晚我就不过马路了。」" },
      ],
    },
    {
      scene: "interior", portrait: "taxi", name: "陈师傅", tag: "出租", time: 3 * 60 + 5, door: true,
      text: "「我绕了三圈了。你这巷子今晚特别长。」车钥匙扔在柜台上又捡起来，「计价器跳出来一个地址，我去过。那地方早拆了。我没敢去。」",
      choices: [
        { label: "卖给他水和烟", need: { water: 1, cigs: 1 }, do: (st) => { sell(st, { water: 1, cigs: 1 }, 20); }, then: "他吸了第一口，肩膀才落下去。「这单我再跑两天。跑完就出城。」" },
        { label: "卖完了", hideIf: (st) => hasStock(st, { water: 1, cigs: 1 }), do: (st) => { missStock(st, 20); }, then: "他盯着空档看了一眼。「行。这巷子我少来一趟。」车钥匙在手里转了一圈。" },
        { label: "让他载你天亮离开", do: (st) => { st.flags.askedRide = true; }, then: "他盯着你看了好一会儿。「行。你最后那晚，六点，巷口。你要是没出来，就当这话我没说过。」" },
        { label: "问他那地址是不是小雅家", showIf: (st) => st.flags.knowXiaoya, do: (st) => { st.flags.taxiAddress = true; }, then: "他脸白了一下。「你也知道啊。那就千万别去。去了，就得有人回来顶班。」" },
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
      ? "第五晚。雨砸招牌。货架空了一截。老板短信就四个字：今晚有暴雨。"
      : "第五晚。雨比前几晚都密。老板短信：今晚有暴雨。方便面会走得快。伞——店里没进过这货。")
    : (s.flags.stockouts >= 2
      ? "第五晚。合同上写试岗一周。货架空了一截。空位对过道，像在等人来站。"
      : "第五晚。合同上写试岗一周。钥匙还是烫的。\n货架空了一截。你明明记得补过货。") });

  climax.push({
    scene: "interior", portrait: "lin", name: "林阿姨", tag: "熟客", time: 22 * 60 + 26, door: true,
    text: s.flags.servedLin
      ? "她啥也没买。「我就来看看你还在不在。」塑料袋里装着俩桃子，「天亮了再吃。别在店里吃。」"
      : "她在门口站了一下，没进来。「你们这儿老没货。我就不添乱了。」伞尖顿了顿，人走了。",
    choices: s.flags.servedLin ? [
      { label: "收下桃子", do: (st) => { st.flags.gotPeachFruit = true; st.sanity += 6; st.rep += 3; }, then: "桃子有毛，压手。揣兜里没两下就捂热了。" },
      { label: "让她别再半夜出门", do: (st) => { st.rep += 4; }, then: "「出来转转嘛。」她拍了拍你的手背，「巷子还在呢。你走得掉的。」" },
    ] : [
      { label: "看着她走", do: (st) => { st.rep -= 2; }, then: "巷子里只剩伞的声音。抽屉里没有桃子。" },
    ],
  });

  climax.push({
    scene: "interior", portrait: "zhou", name: "周晓晚", tag: "住客", time: 23 * 60 + 2, door: true,
    text: "「我退租了。票改到试岗结束那天。」她把一板口香糖放在柜台上，「上回说好的。你要是也走——别回头看招牌。」",
    choices: [
      { label: "祝她一路顺利", do: (st) => { st.flags.zhouLeft = true; st.rep += 3; }, then: "她点了点头。「走了啊。你也早点歇着。」" },
      { label: "问她能不能一起走", do: (st) => { st.flags.zhouWait = true; }, then: "「最后那晚六点，巷口。陈师傅那辆车。」她顿了一下，「就等这一班。」" },
    ],
  });

  if (storm) {
    climax.push({
      scene: "interior", name: "淋雨的人", tag: "暴雨", time: 23 * 60 + 14, door: true,
      text: "外套往下滴水，垫子却只湿了一小块。「两桶红烧的。伞——你们有伞吗。」他抹了把脸，「没伞也行，面给我就走。」",
      choices: [
        { label: "卖两桶方便面（¥12）", need: { noodles: 2 }, do: (st) => { sell(st, { noodles: 2 }, 12); st.flags.soldStormNoodles = true; st.rep += 2; }, then: "他没找伞。两桶面塞进怀里，门铃还没落他就冲回雨里了。" },
        { label: "只卖得出一桶（¥6）", need: { noodles: 1 }, hideIf: (st) => hasStock(st, { noodles: 2 }) || !hasStock(st, { noodles: 1 }), do: (st) => { sell(st, { noodles: 1 }, 6); st.rep += 1; }, then: "「一桶也行。」他啧了一声，钱拍得比人快。" },
        { label: "面没有，伞更没有", hideIf: (st) => hasStock(st, { noodles: 1 }), do: (st) => { missStock(st, 12); st.flags.missedStorm = true; }, then: "「暴雨天没面？」他在空档前站了两秒。门铃响的时候，柜台上多了一滩水。" },
      ],
    });
  }

  climax.push({
    scene: "interior", portrait: "wang", name: "王师傅", tag: "外卖", time: 23 * 60 + 28, door: true,
    text: s.rep >= 70 && !s.flags.aidBlocked
      ? "他没点烟。「我明儿出城。你要是也想走，最后那晚四点，巷口。车就一辆。」他把头盔往上推了推，「别跟别人说。后座别坐第三人。」"
      : (s.flags.wangRegular
        ? "「老样子。」他数着钱，雨衣还在滴。「今晚单子全是面。你们备货了没。」"
        : "他在门口顿了顿，没进来多少。「烟还有吗。算了，问了也未必有。」"),
    choices: s.rep >= 70 && !s.flags.aidBlocked ? [
      { label: "记下，最后那晚巷口见", do: (st) => { st.flags.gotRide = true; st.flags.wangRide = true; st.rep += 2; }, then: "「四点。灯变成那种发青的白，你就出来。别回头看招牌。」" },
      { label: "说我还没想走", do: (st) => { st.rep += 1; }, then: "「也行。」他买了包烟，走的时候没再提车的事。" },
      { label: "卖烟+冰红茶（¥22）", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); }, then: "他点了点头。车的事他没再提，像怕说多了就不算了。" },
    ] : [
      { label: "老样子，烟+冰红茶（¥22）", need: { cigs: 1, tea: 1 }, do: (st) => { sell(st, { cigs: 1, tea: 1 }, 22); st.rep += 2; }, then: "「谢了。」头盔扣上，人已经在雨里了。" },
      { label: "卖完了", hideIf: (st) => hasStock(st, { cigs: 1, tea: 1 }), do: (st) => { missStock(st, 22); st.flags.missedWang = true; }, then: "他在门口站了两秒。雨衣窸窸窣窣。熟客被空货架顶回去，下次就不会绕路了。" },
      { label: "让他进屋躲会儿雨", do: (st) => { st.rep += 2; st.flags.wangSat = true; }, then: "他靠着冰柜抽了半根。走的时候没买货。「你们这灯今晚跳得凶。」" },
    ],
  });

  if (s.flags.gaveMilkToBai || s.flags.offeredBaiHome || s.flags.calledXiaoya || s.flags.baiWaitDawn) {
    climax.push({
      scene: "interior", portrait: "bai", name: "白裙女人", tag: "小雅", time: 23 * 60 + 47, door: true,
      text: "她把那枚冰硬币放回柜台上。「今晚是最后一次了。你要是想送我，就送到门口。别过那条水线。」\n门外的积水映着红招牌。",
      choices: [
        { label: "送到门口，不再往前", do: (st) => { st.flags.helpedBai = true; st.sanity += 4; st.cat += 6; }, then: "她走过垫子的时候，裙子头一回被雨打湿了。她回头看你，嘴唇动了动。说的是「谢谢」，不是「留下」。" },
        { label: "陪她过那条水线", do: (st) => { st.flags.followedBai = true; st.sanity -= 20; }, then: "积水没过鞋面，冰得刺骨。你一回头——店里灯还亮着，柜台后头站着一个人。站姿跟你一模一样。" },
        { label: "不送。请她自己走", do: (st) => { st.flags.ignoredBai = true; st.sanity -= 4; }, then: "「也行。」硬币留在了柜台上。过了一会儿，它就只是一枚普通的一块钱了。" },
        camChoice("camBai5", "门外的水线上没有人。只有那条裙子，在监控里自己往前走。"),
      ],
    });
  }

  climax.push({
    scene: "interior", name: "店里", tag: "间隙", time: 1 * 60 + 10,
    text: "两点过了。冰柜嗡了一声，又停了。巷子里没有车。猫趴在扫描仪上，耳朵转了一下。",
    choices: [
      { label: "去擦门口的玻璃", do: (st) => { st.sanity += 2; }, then: "外面巷子空的。你自己的脸在玻璃上，倒影没有慢。" },
      { label: "坐着等", do: (st) => { st.cat += 2; }, then: "猫把尾巴甩到你手腕上。雨还在下。" },
    ],
  });

  return climax;
}

function night6(s) {
  return [
    { type: "prep", time: 21 * 60 + 50, text: s.flags.soldJoss
      ? "第六晚。钱箱比昨天还沉。抽屉里压着一张电费催缴，金额比前几晚狠。柜台底下多出一本硬皮账本，封面写「夜班进销」。"
      : "第六晚。抽屉里压着一张电费催缴，金额比前几晚狠。柜台底下多出一本硬皮账本。封面写「夜班进销」，油墨是干的。" },
    { type: "phone", from: "老板", text: "今晚别提前关门。抽屉里多出来的东西，不是给你拿走的。" },
    {
      scene: "interior", name: "账本", tag: "夜班进销", time: 22 * 60 + 12, clue: "ledger",
      text: "一页一页全是夜班进货。檀香、电池、冰红茶。日期从三年前写到上周，字迹换过好几拨。翻到最后一页，你的名字已经在上面了。进货栏空着。交班人那栏也空着。日期写的是今晚。",
      choices: [
        { label: "把账本合上", do: (st) => { st.flags.sawLedger = true; st.sanity -= 4; }, then: "合上也还在。封面摸着是热的。" },
        { label: "在进货栏补一笔今晚的数", do: (st) => { st.flags.sawLedger = true; st.flags.wroteLedger = true; }, then: "笔很滑。数字写完了，名字旁边多了一小行：在岗。" },
        { label: "翻去更早的页", clues: ["ledger", "oldLedger"], do: (st) => { st.flags.sawLedger = true; st.flags.readOldLedger = true; st.sanity -= 6; }, then: "三年前那一页，进货是牛奶和电池。交班人写着一个女名。墨水洇到下一行。猫把这一页踩住了。" },
        { label: "看猫怎么说", do: (st) => { st.flags.sawLedger = true; st.flags.trustedCat = true; st.cat += 3; }, then: "猫坐在最后一页上。尾巴把你的名字扫了又扫。" },
      ],
    },
    {
      scene: "interior", name: "店规", tag: "新痕", time: 22 * 60 + 48,
      text: "抽屉里那张油纸被猫拖到脚边上了。第五条下面多了几道抓痕，纸毛翻起来。第二条旁边那句铅笔「纸钱不算」，被人用指甲刮过，字还在。",
      choices: [
        { label: "把纸条按回去", do: (st) => { st.flags.catScratchedRules = true; }, then: "按回去就当没看见。猫在你脚边打了个滚。" },
        { label: "顺着抓痕看", do: (st) => { st.flags.catScratchedRules = true; st.sanity -= 3; }, then: "抓痕不是乱划。它把「没天亮，别数纸钱」圈出来了。" },
        { label: "给猫倒点水", do: (st) => { st.flags.catScratchedRules = true; st.cat += 4; }, then: "它不喝。用鼻子顶了顶纸条，又顶了顶钱箱。" },
      ],
    },
    s.flags.soldJoss ? {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "回头", time: 0 * 60 + 8, door: true,
      text: "「昨儿那三根香，点着了吗？」他两只手背在身后。",
      choices: [
        { label: "说没有点", do: (st) => { st.sanity -= 4; }, then: "「那就好。点了的话，就得有人守着。」他看了眼你的胸口——你没戴工牌。「很快就会有了。」" },
        { label: "问他到底要什么", clues: ["needRelief"], do: (st) => { st.flags.askedOldWant = true; }, then: "「找一个肯把灯开到天亮的人。」他笑了，「别怕，不是威胁。是招工。」" },
        { label: "把纸钱还给他", do: (st) => { st.flags.returnedJoss = true; st.sanity += 6; st.flags.soldJoss = false; st.flags.refusedJoss = true; }, then: "钱箱里那叠红纸比你记得的薄。你还是把它抽出来，推了回去。老人接住了。「晚了一步。不过嘛，规矩认这一步。」" },
      ],
    } : {
      scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "再访", time: 0 * 60 + 8, door: true,
      text: "这回他放下两张旧版的一块钱，纸边都磨毛了。「还是三根香，一瓶冰红茶。这次的能用。」",
      choices: [
        { label: "按正常生意卖给他（¥28）", need: { incense: 3, tea: 1 }, do: (st) => { sell(st, { incense: 3, tea: 1 }, 28); st.flags.soldRealToOld = true; st.rep += 3; }, then: "一块钱上的头像在灯底下泛着绿。他点了点头。「明儿就是最后一晚了。留不留，你自己选。」" },
        { label: "仍然不卖", do: (st) => { st.flags.refusedTwice = true; st.cat += 5; }, then: "「也行。」他把一块钱收回去，桌上留了一张。「这张买你的胆子。不用找了。」你一眨眼的工夫，那张钱变成了一张小票。" },
        { label: "问他招牌上的店名是什么", do: (st) => { st.flags.askedSign = true; }, then: "「你看见的那个，不是给人看的。」他朝门外指了指，「给人看的那四个字，得等天亮才看得清。」" },
      ],
    },
    {
      type: "phone", from: "未知号码", text: "别开门。",
    },
    {
      scene: "interior", name: "门铃", tag: "01:40", time: 1 * 60 + 40, door: true, effect: "flicker",
      text: "短信还亮在屏上。门铃已经响了。门外有人把脸贴在玻璃上。五官被水汽糊住了——糊出来的，是你自己的轮廓。",
      choices: [
        { label: "开门", do: (st) => { st.flags.openedSelf = true; st.sanity -= 14; }, then: "外面没人。垫子上多了一双鞋印，跟你同款，比你大半号。一阵风把店规吹到地上了。" },
        { label: "不开。敲三下玻璃叫保安", do: (st) => { st.flags.knockedWu = true; st.sanity += 2; }, then: "你敲了三下。吴保安的手电从巷口扫过来。玻璃上那张脸一下碎成了水珠。巷子空了。" },
        { label: "用手电照门外", showIf: (st) => st.flags.wuFlashlight, do: (st) => { st.flags.knockedWu = true; st.sanity += 3; }, then: "强光打在玻璃上。那张脸没有影子。它慢慢退进雨里去了。" },
        { label: "问猫开不开", do: (st) => { st.flags.trustedCat = true; st.cat += 4; if (st.cat >= 50) st.flags.knockedWu = true; else { st.flags.openedSelf = true; st.sanity -= 8; } }, then: (st) => st.flags.openedSelf
          ? "猫没动。你还是开了门。门外只有雨，还有一声很轻的「谢谢」。那是你自己的嗓音。"
          : "猫拿脑袋把你的手从门锁上顶开了。门外那张脸自己退进了雨里。" },
        camChoice("camDoor", "门口的镜头花了。花屏里有一张嘴，在说「欢迎光临」。"),
      ],
    },
    emptyShelfBeat(s),
  ];
}

function night7(s) {
  const climax = [];
  climax.push({ type: "prep", time: 21 * 60 + 48, text: s.flags.stockouts >= 2
    ? "最后一晚。合同上写的是试岗七天。货架空了一截。空位对过道，像在等人来站。"
    : "最后一晚。合同上写的是试岗七天。钥匙在手里发烫。\n货架空了一截。你明明记得补过货。" });

  if (s.sanity < 28) {
    climax.push({
      scene: "interior", name: "你", tag: "不对劲", time: 22 * 60 + 10,
      text: "冰红茶喝完了。杯壁上印着自己的嘴印子。再一眨眼，杯子又是满的。\n收音机开始用你的声音报时了。",
      choices: [{ label: "把收音机插头拔了", do: (st) => { st.sanity -= 4; }, then: "拔了以后，报时声从冰柜里接着响。" }],
    });
  }

  climax.push({
    scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "交班", time: 0 * 60 + 52, door: true, clue: "bossNotOwner",
    text: "他没买东西。钥匙在他手指上转了一圈，又放下。「招你的人不是店主。他是上一班。抽屉里那叠红的，他没敢数。数了就走不出去。所以他把钥匙扔给你。」",
    choices: [
      { label: "问他现在谁算老板", do: (st) => { st.flags.oldRevealedBoss = true; }, then: "「老板两个字，是上一班教你用的。」他点了点灯，「灯还亮着，这班就还没交完。」" },
      { label: "……不说话", do: (st) => { st.flags.oldRevealedBoss = true; }, then: "他也不催。雨打在玻璃上，一声一声的。" },
      { label: "看猫", do: (st) => { st.flags.oldRevealedBoss = true; st.cat += 2; }, then: "猫没炸毛。它看着老人，像看一个熟人。" },
    ],
  });

  climax.push({
    scene: "interior", name: "店规", tag: "交班", time: 1 * 60 + 4,
    text: "抽屉里那张油纸被抽出来了。下一班会先看见它。灯还亮着，你还能动这张纸——动的是痕迹，不是原文。",
    choices: [
      { label: "五条原文都留下", do: (st) => { adjudicateRules(st, "keepAll"); }, then: "你把油纸按回去。下一班看见的，还是这五条。" },
      { label: "把第二条连同贴条一起揭掉", do: (st) => { adjudicateRules(st, "dropTrap"); st.sanity += 2; }, then: "第二条的纸毛翻起来。原文还在底下，你只是把后添的那层揭了。猫在柜台上坐直了。" },
      { label: "把涂改过的第五条描回去", do: (st) => { adjudicateRules(st, "fixFive"); }, then: "你把「天亮前也可以数」那半句涂掉。第五条又只剩原来那句。" },
      { label: "空白一张，让下一班自己写", do: (st) => { adjudicateRules(st, "blank"); st.sanity -= 4; }, then: "油纸翻了个面。背面前人的签名还在。正面你没写。" },
    ],
  });

  climax.push({
    scene: "interior", name: "钱箱", tag: "交班", time: 1 * 60 + 8,
    text: "抽屉里的钱还热着。下一班进门会先摸这个抽屉。灯还亮着，你还能决定这笔钱留不留。",
    choices: [
      { label: "把钱留给下一班", do: (st) => { st.flags.leftCash = true; st.cash = 0; st.cat += 4; st.sanity += 2; }, then: "你把抽屉推回去。猫把尾巴搭在钱箱上。口袋空了，脚步倒轻了一点。" },
      { label: "把钱带走", do: (st) => { st.flags.tookCash = true; st.sanity -= 4; st.cat -= 2; }, then: "纸钞进了你口袋。灯管「兹」了一声。猫从柜台上跳下去了。" },
    ],
  });

  climax.push({
    scene: "interior", portrait: "old", name: "穿中山装的老人", tag: "结账", time: 1 * 60 + 12, door: true, effect: "flicker",
    text: s.flags.soldJoss
      ? "「名字早就写好了。」他把一本薄薄的考勤册推过来，只有夜班那一栏。「签了字，这灯就归你了。」"
      : "「七晚了啊。」他看看灯，看看猫，又看看你。「你可以走了。走之前，把灯交给愿意一直开着它的人。要不，就交给猫。」",
    choices: s.flags.soldJoss && !s.flags.returnedJoss ? [
      { label: "签字留下", do: (st) => { st.flags.signedOn = true; st.sanity -= 10; }, then: "笔滑得很。名字自己就写完了。你一眨眼的工夫，过道里只剩下一股雨味儿。" },
      { label: "把考勤册推回去", do: (st) => { st.flags.refusedSign = true; st.sanity -= 6; }, then: "墨水晕开了，变成另一个你没写过的名字。老人叹了口气：「那就再找个人吧。」" },
      { label: "把册子交给猫", showIf: (st) => st.cat >= 62, do: (st) => { st.flags.catTakesShop = true; st.cat += 8; }, then: "猫踩了上去，留下一个湿爪印。老人笑出了声：「也行。它干这行比你久。」" },
      camChoice("camOld5", "画面里考勤册是合着的。柜台前没有老人。只有你自己的手，悬在一支笔的上方。"),
    ] : [
      { label: "把钥匙放下，准备天亮走", do: (st) => { st.flags.leaveAtDawn = true; }, then: "钥匙碰到柜台，轻轻响了一声。猫把尾巴绕过了钥匙。" },
      { label: "留下继续上夜班", do: (st) => { st.flags.stayOn = true; }, then: "老人没说好，也没说不好。灯管不闪了。「从第八晚起，就没有第八晚了。只剩下今晚。」" },
      { label: "让猫看着店", showIf: (st) => st.cat >= 72, do: (st) => { st.flags.catTakesShop = true; }, then: "猫跳进柜台里面那个位置。老人退到门外。红招牌清清楚楚地亮了一秒：恒灯。" },
      camChoice("camOld5", "画面里考勤册是合着的。柜台前没有老人。只有你自己的手，悬在一支笔的上方。"),
    ],
  });

  climax.push({
    scene: "interior", portrait: "wang", name: "王师傅", tag: "最后一单", time: 4 * 60 + 40, door: true,
    text: s.rep >= 58
      ? "「来包烟。」他把钱拍在柜台上，又抽回去两张，「算了，戒了。我就是来看看你还在不在。」天已经有点发青了。"
      : "他只在门口探了下头，没进来。「……算了。我单子多。」电瓶车已经发动了。",
    choices: s.rep >= 58 ? [
      { label: "说还在，快天亮了", do: (st) => { st.rep += 3; }, then: "「那就好。」他笑了，「走，出去吃炒粉，我请客。等这灯变成白天那种白，咱就走。」" },
      { label: "让他捎你一程", do: (st) => { st.flags.wangRide = true; }, then: "「上车。别往后视镜看。」他说得飞快。" },
    ] : [
      { label: "看着他开走", do: () => {}, then: "巷口空了。" },
    ],
  });

  climax.push({
    scene: "interior", name: "恒灯便利", tag: "05:58", time: 5 * 60 + 58,
    text: "雨停了。玻璃上的水一道一道往下滑。招牌还红着。对面墙皮的颜色，能看清了。",
    choices: [
      { label: "走到门口，等天亮", do: (st) => { st.flags.walkOut = true; } },
      { label: "留下，把灯继续开着", do: (st) => { st.flags.stayOn = true; } },
      { label: "提前打烊，关灯走人", do: (st) => { st.closedEarly += 1; st.flags.closedLast = true; } },
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
    kind: "结局",
    title: "正常下班",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.askedRide
        ? "纸钱你从头到尾没要过。第四晚你就跟陈师傅说好了，让他天亮来巷口接你。"
        : s.flags.wangRide
          ? "纸钱你没要。天快亮那会儿，王师傅捎了你一程，让你别往后视镜看。"
          : s.flags.leaveAtDawn
            ? "纸钱你没要。钥匙你往柜台上一搁，猫把尾巴绕过钥匙，你就这么走的。"
            : "纸钱你没要，店你也没接。第五晚你走到门口，就站着等天亮。";
      return [
        how,
        "五晚总算熬到头了。灯你也没关，人自己出来了。这份夜班到你这儿就算断了，往后没有第六晚这回事。",
        "六点过一分，招牌上的字能看清了：恒灯便利。白天它就是巷口一家小卖部，卖烟卖面，也卖那种放得快过期的酸奶。",
        "猫送到门口，没跟出来。它还得看店呢。兜里林阿姨塞的那俩桃子，还热乎着。",
        (s.truths && s.truths.indexOf("bossPrevShift") >= 0)
          ? "后来你拨通了「老板」的电话。那人根本不是店主，是上一班值夜班的。他当年没敢数抽屉里的钱，才活着出来了。钥匙他扔过三回，这回轮到扔你手上。你在店里把短信和钥匙对上了，才明白扔三次是交班的办法。你也扔了。这回才算扔干净。"
          : "后来你拨通了「老板」的电话。那人根本不是店主，是上一班值夜班的。他当年没敢数抽屉里的钱，才活着出来了。钥匙他扔过三回，这回轮到扔你手上。你也扔了。",
      ];
    },
    after: [
      "过了半个月，你白天又打那条巷子过。招牌老实得很，恒灯便利。门开着，柜台里坐个小伙子，打哈欠，低头刷手机。冰柜嗡嗡的，声音挺正常。你站在马路牙子上抽了根烟，没进去。",
      "钥匙你扔河里了。有一晚下雨，手机震了一下，陌生号码，短信是空的。你没回。那俩桃核你埋在小区花坛里，后来也没发芽。你就当它发过了。",
    ],
  },
  ferry: {
    kind: "结局",
    title: "送她离开",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.returnedJoss
        ? "那叠纸钱，你后来还给了老人。他接了，说规矩认这一步。"
        : "那叠纸钱，你从头到尾没要过。";
      return [
        "那个穿白裙子来买牛奶的，是隔壁搬走的小雅。三年前一个雨夜，她出去买牛奶，就再没回来过。这五个晚上她一趟趟往店里钻，就是想让谁把她送到门口，别再往水里去了。",
        "你送到门口就停住了，自己没迈过那道积水。她趟水过去那一下，裙子头一回湿了——雨打活人才会湿。她回头冲你笑了一下，说了声谢谢。",
        how,
        "柜台上那枚冰硬币，不知道啥时候变成了一枚普通一块钱。她走了。天也亮了。",
      ];
    },
    after: [
      "后来再下雨，你还是会往门口那摊水瞄一眼。水洼里就一盏路灯。没裙子，也没人回头。林阿姨再来买牛奶，绝口不提小雅了。她说巷口新开了家早餐铺，豆浆是甜的。",
      "那枚一块钱你没花，搁在笔筒里，摸上去是温的。有一回你进店，货架上居然真摆着草莓牛奶。过期三天。你自己喝了。甜的。喝完了你在本子上写：送到门口就停，别过那条线。字写得特别慢。",
    ],
  },
  cat: {
    kind: "结局",
    title: "交给猫",
    scene: "interior",
    body: (s) => {
      const how = s.flags.catTakesShop
        ? "老人问这灯往后交给谁。你没交给人，也没自己留——你把店推给了猫。它陪了你五个晚上，你信它。"
        : "你没把店交给谁。是你走到门口的时候，猫自己跳进了柜台里那个位置。它跟你处了五个晚上，愿意替你守这个店。";
      return [
        how,
        "它跳进柜台里那个位置，尾巴一甩，钱箱啪地合上了。穿中山装的老人没再来招人，白裙子没再来买奶，湿头发的那个在门口张望了一下，被它哈走了。",
        "你走到巷口回头看了一眼。灯亮着。柜台上蹲着那团橘色。往后这条巷子的人，只当它是只店猫。",
      ];
    },
    after: [
      "你回家睡了一整个白天。夜里两点又晃到巷口。灯开着，柜台里没人，就那团橘色，尾巴搭在钱箱上。外卖小哥探头说：这店猫凶得很，不让进的人真别进。他说着笑，你没接茬。",
      "钥匙你没要回来。有人在群里问这店夜班还招不招，没人回。你路过只看灯，不看柜台后面。它还在。这就行了。",
    ],
  },
  joss: {
    kind: "结局",
    title: "接了班",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = (s.flags.soldJoss && !s.flags.returnedJoss)
        ? "第三晚你收下了那叠纸钱。收款人写的是你的名字——收了，就是答应顶班。"
        : s.flags.signedOn
          ? "最后一晚你签了那本考勤册。笔滑得很，名字自己就写完了。签了，就是答应顶班。"
          : "最后一晚，老人问这灯往后交给谁。你说，留下，把灯继续开着。";
      return [
        how,
        "钱箱一开，里头全是红纸。你还是按面额一张一张给理好了。手自己就会了。",
        "门铃响了。你说欢迎光临。听见的是你自己的声音，从冰柜、灯管、垫子底下一块儿冒出来。合同写的是试岗五天，没写第六天。所以这一天，永远过不完。",
        "短信又来了，落款还是「老板」。就一句话：轮到你了。下一班迟早会来。到那时候，扔钥匙的人就是你。",
      ];
    },
    after: [
      "没有第六天的早上。墙上的钟走到六点，又跳回二十二点。你学会了用「老板」这个署名发短信。字是你敲的，口气不是你的。灯开着就行。白天别找我。",
      "后来真有人来拿钥匙。年轻小伙子，眼睛还清亮。你把四张红票子压在钥匙底下，走到门口又回头。你听见自己说：货自己进，店里可没存货给你卖。门帘一响，你没出去。你已经出不去了。",
    ],
  },
  void: {
    kind: "结局",
    title: "变成客人",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.sanity <= 0
        ? "五个晚上，你的神智一点一点被磨没了。到最后，你连自己是不是站在柜台里，都分不清了。"
        : s.flags.followedBai
          ? "你跟着小雅，迈过了门口那道积水。水没过鞋面，冰得刺骨。"
          : "你收了他的纸钱，最后一晚又把灯关了。灯一灭，你就不算站在柜台里的人了。";
      return [
        how,
        "这店得有人站在柜台里，也得有人站门外买东西。你没站住，就从看店的变成了买货的。",
        "灯闪了一下。你站在柜台外面。衣服湿的，手里捏着两节五号电池。垫子是干的。门铃没响。",
        "柜台里那个人，长得跟你一样。「要电池吗？」你想说不。嘴里蹦出来的却是：要。这就是第一晚那个湿头发的男人。现在，那个人是你。",
      ];
    },
    after: [
      "往后每个雨夜你都来。买电池，买檀香，有时候啥也不买，就站在垫子上滴水。垫子是干的。柜台里那个人一天比一天像你刚来那晚，眼圈青，话少。他卖你电池的时候，手是热的。",
      "有一晚你想说：别卖了。嘴里出来的还是：要。他抬头看你，像要认出你。灯闪了一下。你已经在门外了。雨打在后背上，后背先干。",
    ],
  },
  fired: {
    kind: "结局",
    title: "关灯走人",
    scene: "exterior",
    body: (s) => {
      const how = s.flags.closedLast
        ? "店规第一条：灯不能关。老板短信里也说过，别提前关门。你最后一晚还是关了灯，走人了。"
        : "这五个晚上，你提前关过好几次门。店里攒下的那点信誉，被你一次一次耗没了。";
      return [
        how,
        "灯一灭，纸扎铺的老生意就回来了。这班立马得有人顶上。",
        "短信就一句话：钥匙放垫子底下。巷子黑得干干净净。",
        "第二天你路过，灯已经亮了。柜台后面站着一个人。脸看不清，站得笔直。猫不在柜台上。走掉的是你。留下的那个，不是活人。",
      ];
    },
    after: [
      "你整整一个星期没再走那条巷子。第七天晚上绕远了，还是打那儿过。灯亮着。柜台后头还是那个人，站得一样直。门口多了一小撮纸灰，像是有人烧过什么，又被雨浇灭了。",
      "猫到底去哪了，没人说得清。有人看见那只橘猫在三个路口外的天桥底下睡觉，不让摸。你没去认。钥匙你再没碰。灯不是你关的——你只是先走了。班，已经有人顶上。",
    ],
  },
};

const ROLE_ENDINGS = {
  catJudge: {
    role: "cat",
    kind: "结局",
    title: "守住门槛",
    scene: "interior",
    body: (s) => {
      const how = s.flags.catWaited
        ? "老人问灯交给谁。你没抢。新来的人把那个位置让出来，你才跳进去。"
        : s.flags.catBlockedWet
          ? "不该进的人你拦过。湿头发的那个在门外站了一会儿，走了。"
          : "七晚你都蹲在门口。该进的进了，不该进的你哈过。";
      return [
        how,
        "钱箱合上。穿中山装的老人没再来招人。白裙子在门口停过，没过那摊水。你还在柜台里那个位置。",
        "巷子里的人只当这儿有只店猫。灯亮着。这就行了。",
      ];
    },
    after: [
      "后来每个雨夜你还是先闻垫子。干的，你就哈。湿的，你让开。新来的人换过好几个，你没换。",
      "有人在群里问这店夜班还招不招。没人回。你把尾巴搭在钱箱上。招不招不是你管的。灯开着就行。",
    ],
  },
  catFail: {
    role: "cat",
    kind: "结局",
    title: "没拦住",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.catJumped
        ? "你跳进柜台里那个位置跳得太早。人的班还没交完，你先占了。"
        : s.flags.catLetWet
          ? "湿头发的那个你没拦。他买了电池。垫子一直是干的。"
          : "有几晚你没守住门口。不该进的人进了。";
      return [
        how,
        "灯闪了一下。柜台里坐着的不像新来的那个人了。你在门口哈气，没人听。",
        "钱箱是开的。红纸和真钱混在一起。你以前不让这种事发生。",
      ];
    },
    after: [
      "后来有人说这店猫不凶了。谁都进。外卖小哥还笑。你蹲在巷口三个路口外的天桥底下，不让摸。",
      "灯还亮。亮着也不算你在守。门槛没了。",
    ],
  },
  hengPass: {
    role: "heng",
    kind: "结局",
    title: "等到接班",
    scene: "interior",
    body: (s) => {
      const how = s.flags.hengTookJoss
        ? "纸钱你收了。真钱你没碰。钥匙你扔给了下一班。"
        : "真钱你没碰。钥匙你扔给了愿意把灯开着的人。";
      return [
        how,
        "他没看清你的脸。这就对了。短信还是「老板」那两个字。字是你教过的口气，人已经换成他。",
        "你退到后间门口。后间你也不进。灯交给还活着的人。这一天，头一回像能过完。",
      ];
    },
    after: [
      "再有人来拿钥匙，柜台后头是新的。你偶尔还站在灯管底下，他看不见。",
      "纸钱有人收。真钱你不碰。夜班有人接。你等的就是这个。",
    ],
  },
  hengLoop: {
    role: "heng",
    kind: "结局",
    title: "过不完这一天",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.hengTookReal
        ? "真钱你碰了。烫。碰完你就知道，这天过不完了。"
        : "钥匙你没扔出去。灯还得你自己看着。";
      return [
        how,
        "钟走到六点，跳回二十二点。门铃响了。你说欢迎光临。听见的是你自己的声音。",
        "下一班迟早会来。到那时候，扔钥匙的人还是你。你已经扔过一次，没扔干净。",
      ];
    },
    after: [
      "有人来应夜班。年轻，眼睛还清亮。你把四张红票子压在钥匙底下。门帘一响，你没出去。",
      "你已经出不去了。灯开着。白天别找我。这句话你说过，还会再说。",
    ],
  },
  xiaoyaRain: {
    role: "xiaoya",
    kind: "结局",
    title: "裙子湿了",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.xySent
        ? "他送到门口就停住了。你自己过的那摊水。裙子头一回湿了。"
        : "有人把你送到门口。你没拉他。雨打在身上是热的。";
      return [
        how,
        "你回头说了声谢谢。那枚冰硬币留在柜台上，后来变成一块普通的一块钱。",
        "牛奶你喝了。甜的。天也亮了。这条巷子你再走，是白天。",
      ];
    },
    after: [
      "后来再下雨，门口那摊水里就一盏路灯。没人回头。林阿姨再来买牛奶，绝口不提你。",
      "那枚一块钱他没花，搁在笔筒里。货架上后来真摆过草莓牛奶。过期三天。有人喝了。",
    ],
  },
  xiaoyaStay: {
    role: "xiaoya",
    kind: "结局",
    title: "又来买奶",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.xyBehind
        ? "你站到柜台里去了。那不是买东西的位置。站进去就出不来。"
        : s.flags.xyCrossed
          ? "你过了那摊水。对面没有家。你又走回店门口。"
          : "没人把你送到门口。你每晚还是来买牛奶。";
      return [
        how,
        "门铃有时候响，有时候不响。口袋里那枚硬币还是冰的。货架上没有草莓的。",
        "柜台里的人一天换一个，看你的眼神一天比一天熟。熟了也不问你名字。",
      ];
    },
    after: [
      "雨夜你还来。买牛奶，有时候啥也不买，站在垫子上。垫子是干的。",
      "有一晚你想说：送我到门口。嘴里出来的还是：要一盒牛奶。纯的就行。",
    ],
  },
  wuClear: {
    role: "wu",
    kind: "结局",
    title: "册子合上",
    scene: "exterior",
    dawn: true,
    body: (s) => {
      const how = s.flags.wuFlash
        ? "手电你留下过。人你没留下。册子四个名字，一个没多。"
        : "册子四个名字。一个没多。天亮你合上了。";
      return [
        how,
        "湿头发的那个你没放。灯亮着，店就算还开着。你的班到巷口为止。",
        "招牌上的字能看清了。你回岗亭。店不是你的。这就对了。",
      ];
    },
    after: [
      "后来这条巷子还是你转。夜班换人，你还对花名册。对不上的，你让他们明天白天来。",
      "有人问你那店邪不邪。你说灯开着就行。手电在口袋里，备用的那支还在。",
    ],
  },
  wuLost: {
    role: "wu",
    kind: "结局",
    title: "册上有你",
    scene: "interior",
    wrong: true,
    body: (s) => {
      const how = s.flags.wuOwnName
        ? "你把自己的名字写上了。写完就知道坏了。"
        : s.flags.wuLetWet
          ? "湿头发的那个你放进去了。后来垫子是干的。再后来册子上多了一行，是你。"
          : "你在店里坐太久。天亮册子合不上了。";
      return [
        how,
        "你站在柜台外面。衣服湿的。手里捏着两节五号电池。垫子是干的。门铃没响。",
        "柜台里那个人抬头看你，像要认出你。「要电池吗？」你想说我是看巷子的。嘴里蹦出来的是：要。",
      ];
    },
    after: [
      "往后每个雨夜你都来。不查岗了。买电池，买檀香，有时候啥也不买。",
      "岗亭里换了人。新人翻花名册，有一页看不清。雨打在你后背上，后背先干。",
    ],
  },
};