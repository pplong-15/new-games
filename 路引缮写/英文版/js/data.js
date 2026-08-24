window.LUYIN = {
  total: 36,
  saveKey: "luyin-jianxie-v1-en",
  words: {
    luyin: { text: "road pass", slots: [] },
    jijian: { text: "rush slip", slots: [] },
    qianpei: { text: "Qian Pei", slots: ["who", "whom"] },
    qianxiaoman: { text: "Qian Xiaoman", slots: ["who", "whom"] },
    sunxiulan: { text: "Sun Xiulan", slots: ["who", "whom"] },
    houyuan: { text: "paper-horse shop backyard", slots: ["where"] },
    yiyuan: { text: "county hospital ER", slots: ["where"] },
    luyinfang: { text: "road-pass room", slots: ["where"] },
    zati: { text: "tied as a stand-in", slots: ["did"] },
    kaibing: { text: "issued a death-illness road pass", slots: ["did"] },
    xiechi: { text: "wrote as deceased pass-holder", slots: ["did"] },
    shenliang: { text: "body-measure ruler", slots: [] },
    shengchen: { text: "birth hour", slots: [] },
    guohuo: { text: "passed through fire", slots: [] },
    xinxing: { text: "heart attack", slots: [] },
    guoji: { text: "guoji", slots: [] }
  },
  slotOrder: ["who", "where", "whom", "did"],
  slotLabel: { who: "Who", where: "Where", whom: "Toward whom", did: "Did what" },
  correct: { who: "qianpei", where: "houyuan", whom: "qianxiaoman", did: "zati" },
  burn: { who: "sunxiulan", where: "luyinfang", whom: "qianpei", did: "kaibing" },
  unlocks: {
    "p23-mail.html": ["luyin"],
    "p11-chuhuo.html": ["qianpei"],
    "p25-wap.html": ["qianpei"],
    "p12-houyuan.html": ["shenliang"],
    "p26-ruler.html": ["shenliang"],
    "p27-materials.html": ["shenliang"],
    "p21-qzone.html": ["qianxiaoman"],
    "p31-bazi.html": ["qianxiaoman"],
    "p32-adopt.html": ["qianxiaoman"],
    "p17-sulu.html": ["houyuan"],
    "p18-tishen.html": ["houyuan"],
    "p30-form.html": ["zati"],
    "p33-zao.html": ["zati"],
    "p34-hold.html": ["_hold"],
    "p35-burn.html": ["_burn"]
  },
  hints: [
    "The rush slip is what they brought. It is not the line you copy. Pick words already on the paper.",
    "The person on the order and the person on the birth-hour slip are often not the same. Read the two slips apart.",
    "Subject from the order-slip customer line. Object from the birth-hour copy. Place from the yard where the paste is still wet.",
    "The four fields that match: Qian Pei, paper-horse shop backyard, Qian Xiaoman, tied as a stand-in. You still have to click them on and submit."
  ]
};
