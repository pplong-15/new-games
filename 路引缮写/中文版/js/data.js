window.LUYIN = {
  total: 36,
  saveKey: "luyin-jianxie-v1",
  words: {
    luyin: { text: "路引", slots: [] },
    jijian: { text: "急件", slots: [] },
    qianpei: { text: "钱培", slots: ["who", "whom"] },
    qianxiaoman: { text: "钱小满", slots: ["who", "whom"] },
    sunxiulan: { text: "孙秀兰", slots: ["who", "whom"] },
    houyuan: { text: "纸马铺后院", slots: ["where"] },
    yiyuan: { text: "县医院急诊", slots: ["where"] },
    luyinfang: { text: "路引房", slots: ["where"] },
    zati: { text: "扎成替身", slots: ["did"] },
    kaibing: { text: "开病故路引", slots: ["did"] },
    xiechi: { text: "写成已故持证人", slots: ["did"] },
    shenliang: { text: "身量尺", slots: [] },
    shengchen: { text: "生辰", slots: [] },
    guohuo: { text: "过火", slots: [] },
    xinxing: { text: "心梗", slots: [] },
    guoji: { text: "过继", slots: [] }
  },
  slotOrder: ["who", "where", "whom", "did"],
  slotLabel: { who: "谁", where: "在哪", whom: "对谁", did: "做了什么" },
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
    "急件是送来的说法，不是你要照抄的那一句。先点已经写在纸面上的词。",
    "下单的人和生辰栏里的人，经常不是同一个。两张单子分开看。",
    "主语看出货单客户栏。宾语看生辰抄件。地点看浆还没干的那块空地。",
    "四栏要对的是：钱培，纸马铺后院，钱小满，扎成替身。仍需你自己点上去交。"
  ]
};
