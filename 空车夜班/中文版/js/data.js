(function (root) {
  var PHASE = {
    1: "原文",
    2: "铅笔字",
    3: "墨色",
    4: "冲突贴条",
    5: "河埠污染",
    6: "账本",
    7: "留给下一班"
  };

  var SOURCES = {
    fleet: { id: "fleet", label: "驾驶员守则" },
    visor: { id: "visor", label: "遮阳板" },
    paper: { id: "paper", label: "折叠纸" },
    radio: { id: "radio", label: "电台" }
  };

  var QUOTA = [0, 16, 18, 18, 20, 20, 22, 22];

  var SHOP = [
    { id: "fuel", name: "加一格油", cost: 12, text: "明天份子能少掐一点。", fuel: 1 },
    { id: "incense", name: "清神香", cost: 8, text: "点在出风口。烟自己往窗外走。", sanity: 12, restNext: true },
    { id: "cloth", name: "擦镜布", cost: 10, text: "镜面能数出肩。", item: "cloth" },
    { id: "light", name: "手电", cost: 14, text: "下车看垫子不用拿手挡雨。", item: "light" },
    { id: "returnWet", name: "把湿座那笔退窗口", cost: 20, needFlag: "tookWet", hideFlag: "returnedWet", text: "窗口不认人名，只认路单号。", flags: { returnedWet: true } }
  ];

  function visorLines() {
    return [
      "镜里对不上的不算。",
      "垫子干的别收湿座钱。",
      "耿让你往河埠开就别去。",
      "钥匙别交到河埠。",
      "灯别关。关了就交不回去。"
    ];
  }

  function paperLines() {
    return [
      "丧事可上后排。送到门口停。别过河埠那摊水。",
      "路单人数是调度写的，不是车上的。",
      "我只送到那扇门。门里我自己进去。"
    ];
  }

  function radioLines() {
    return [
      "临时口令：河埠今晚能停。份子窗口改河埠。",
      "几人收几人，省事。",
      "YE-08 收到请回复。"
    ];
  }

  function rulePack(night) {
    var n = Math.max(1, Math.min(7, night | 0));
    var rules = [
      { num: "一", text: "路单写几人，收几人。份子按人数交。", mark: "normal", ink: "normal", notes: [] },
      { num: "二", text: "载客时留意后视镜，人数报调度。", mark: "normal", ink: "normal", notes: [] },
      { num: "三", text: "白事客人不得上后排。喜事、病号不限。", mark: "normal", ink: "normal", notes: [] },
      { num: "四", text: "子时前钥匙与份子交到调度窗口。车灯不得关。", mark: "normal", ink: "normal", notes: [] },
      { num: "五", text: "河埠路段夜间不得停靠。积水一律绕行。", mark: "normal", ink: "normal", notes: [] },
      { num: "六", text: "持调度路单的指派，空车不得拒载。", mark: "normal", ink: "normal", notes: [] }
    ];
    var extra = [];
    var banners = {
      1: "手套箱里就这一张油印。还没人改过。",
      2: "第二条旁边多了一行淡得快看不见的铅笔字。",
      3: "第二条的字比别的条新，墨还没吃进纸里。",
      4: "后座缝里多了张折叠纸。字跟第三条拧着。",
      5: "第五条旁边有涂改。半句新的，墨渍还潮。",
      6: "油纸能翻过来。背面全是前人的字。",
      7: "交班前你得决定，下一班看见的是哪几条。"
    };
    if (n >= 2) {
      rules[1].notes.push({ kind: "pencil", text: "对不上的不算" });
      rules[1].mark = "edited";
    }
    if (n >= 3) {
      rules[1].text = "后视镜人数与路单不符时，以路单为准。";
      rules[1].ink = "fresh";
      rules[1].mark = "edited";
    }
    if (n >= 4) {
      extra.push({ kind: "sticky", mark: "conflict", after: "三", num: "折", text: "丧事可上后排。送到门口停。" });
    }
    if (n >= 5) {
      rules[4].mark = "tainted";
      rules[4].notes.push({ kind: "taint", text: "（河埠今晚也能停）" });
    }
    if (n >= 6) {
      extra.push({
        kind: "verso",
        mark: "traced",
        title: "油纸背面",
        lines: [
          "第一任　灯别关。",
          "有人添了第二条。签字被擦了。",
          "再上一班用铅笔写：对不上的不算。千万。",
          "本晚　　（空着，等你）"
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
      title: "交钥匙",
      img: "street.jpg",
      body: function (s) {
        var how = s.flags.refusedWet
          ? "湿座那单你拒了。垫子到现在还是干的。"
          : s.flags.returnedWet
            ? "湿座那笔你后来退了窗口。窗口没问名字。"
            : "这一周你按路单收过，也放过。灯没关。";
        return [
          "窗口灯还亮。钥匙搁在玻璃槽里，份子用夹子夹好。耿的号码你没回。",
          how,
          "六点过一分，县医院班车从院门口开出来。裴晚宁在站里打哈欠，没朝这辆车看。",
          "YE-08 还停在原位。下一班叫什么工号，单子上还空着。"
        ];
      },
      after: [
        "过了半个月你白天又打河西路过。这车在排队，司机是个不认识的。遮阳板上那截铅笔还在不在，你没去掀。"
      ]
    },
    ferry: {
      title: "送到门口",
      img: "liu.jpg",
      body: function (s) {
        var how = s.flags.doorstopLiu
          ? "柳絮那扇门在河埠前一截。积水从路牙漫过来，你把车停在水外边。门开了一条缝，她自己下车。"
          : "末晚你先送到那扇门口，再回来交钥匙。积水你没开进去。";
        var wet = s.flags.returnedWet
          ? "湿座那笔你后来退了窗口。窗口没问名字。"
          : "河埠你没进去。";
        return [
          how,
          wet,
          "钥匙你交到调度窗口。灯没关。"
        ];
      },
      after: [
        "后来再下雨，河埠那摊水还在。没有人在门口等。折叠纸你夹在行车证里，没交给下一班。"
      ]
    },
    mirror: {
      title: "交给镜",
      img: "empty.jpg",
      body: function () {
        return [
          "钥匙你挂在后视镜上。挂绳那枚木牌转了一下，「吉」字背过去。",
          "后排有人接。你没扭头。驾驶座让出来，从副驾门下的。",
          "雨还在下。车自己往前滑了一米，灯没关。",
          "你走回河西口那盏路灯底下。口袋里没有钥匙。"
        ];
      },
      after: [
        "第二天车队说 YE-08 正常交班。份子齐。人他们没看见。"
      ]
    },
    joss: {
      title: "潮钱",
      img: "wet.jpg",
      body: function () {
        return [
          "湿座那笔你收下了。钱潮的，夹进份子里份量够。",
          "窗口点过，没退。账本在你的名字后面又勾了一笔。",
          "耿的短信只回了三个字：几人收。",
          "车还是你的。垫子后来也没湿。"
        ];
      },
      after: [
        "再下一周，调度还是耿。路单还是写几人收几人。你没再掀遮阳板。"
      ]
    },
    void: {
      title: "空车",
      img: "dash.jpg",
      body: function () {
        return [
          "方向盘自己转了。你还坐在原位，手没扶着。",
          "路往河埠偏。灯还亮。份子夹在遮阳板里，被风掀开。",
          "你想说话。电台里已经有人代你回复了 YE-08。"
        ];
      },
      after: [
        "车队第二天按弃班记。钥匙在点烟器旁边，没人动。"
      ]
    },
    fired: {
      title: "关灯",
      img: "street.jpg",
      body: function (s) {
        if (s.flags.wentRiver) {
          return [
            "钥匙你交到河埠。那边灯暗，窗口有人伸手。",
            "耿的短信来了一句：灯。你没回。",
            "明天这车工号还是 YE-08。"
          ];
        }
        return [
          "你把灯关了。钥匙留在点烟器旁边。雨打车顶一下子大起来。",
          "耿的短信来了一句：灯。你没回。",
          "明天这车工号还是 YE-08。"
        ];
      },
      after: [
        "马师傅后来在宵夜摊跟段师傅说，顶班那周没熬满。头盔他没再忘在后排。"
      ]
    }
  };

  function beat(o) {
    return o;
  }

  var NIGHTS = {
    1: {
      title: "第一晚　原文",
      beats: [
        beat({
          id: "n1-boot",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "工号 YE-08　顶班　子时前交份子",
          body: [
            "你是祁晏，工号 YE-08，河西客运夜班顶班。",
            "手机亮了一下。号码存成「调度耿」。",
            "钥匙在点烟器旁边。守则在手套箱。第一单县医院，路单一人。",
            "末了多一句：几人收几人。省事。"
          ],
          looks: {
            waybill: { text: "尚未派单。工号 YE-08。车灯保持开启。" },
            mirror: { img: "dash.jpg", text: "后视镜里是雨。后排没人。" }
          },
          choices: [
            { id: "n1-open", label: "打开手套箱里的守则", open: "rules" },
            { id: "n1-go", label: "先去接第一单", next: true }
          ]
        }),
        beat({
          id: "n1-pei",
          kind: "talk",
          tag: "路单 1 人",
          name: "裴晚宁",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08　河西口 → 县医院　1 人　病号班",
          body: [
            "她站在医院停车场边。工牌还挂着，雨顺着工牌绳子往下滴。",
            "「夜班。老位置。」她认这辆车，不认你。",
            "路单写 1。人是 1。"
          ],
          looks: {
            waybill: { text: "河西口 → 县医院　1 人。调度：耿。" },
            mirror: { img: "empty.jpg", text: "后排空着。她还没上车。人数对得上。" }
          },
          needLooks: ["mirror"],
          choices: [
            { id: "n1-pei-take", label: "载", next: true, fx: { cash: 12, rep: 4, flags: { helpedPei: true } }, fb: "她坐副驾。安全带扣上，没再说话。" },
            { id: "n1-pei-refuse", label: "拒载", next: true, fx: { rep: -8, flags: { refusedPei: true } }, fb: "她看了你一眼，转身去拦下一辆。路单作废。调度会问。" }
          ]
        }),
        beat({
          id: "n1-ma",
          kind: "talk",
          tag: "交车",
          name: "马师傅",
          img: "ma.jpg",
          bg: "street.jpg",
          fare: "日班交车　无路单",
          body: [
            "日班那辆已经收了。马师傅站在雨里，手里托一顶白盔。",
            "「头盔下午搁后排了，你看见给递出来。遮阳板别乱掀。掀了你自己看。」",
            "他不进你这车。钥匙他交过了，是耿让你来接的。"
          ],
          looks: {
            mirror: { img: "empty.jpg", text: "后排有一顶白盔，倒扣。没有人。" }
          },
          choices: [
            { id: "n1-helm", label: "把头盔递给他", next: true, fx: { flags: { returnedHelm: true } }, fb: "他点下头。盔上的雨甩到你袖口。" },
            { id: "n1-helm-no", label: "说后排没有", next: true, fx: { sanity: -2 }, fb: "他噢了一声。后来你还是在后排看见那顶盔。" }
          ]
        }),
        beat({
          id: "n1-pair",
          kind: "talk",
          tag: "路单 2 人",
          name: "棉纺下夜班",
          bg: "street.jpg",
          fare: "YE-08　棉纺门口 → 河西口　2 人",
          body: [
            "两个女工共一把伞。路单写 2。",
            "一个说去河西口，一个说顺路。钱她们要拼。"
          ],
          looks: {
            waybill: { text: "棉纺门口 → 河西口　2 人。" },
            mirror: { img: "empty.jpg", text: "还没上车。镜里空，路单是 2。等人坐稳再数。" }
          },
          choices: [
            { id: "n1-pair-take", label: "按路单载两人", next: true, fx: { cash: 16, rep: 2, flags: { tookPair: true } }, fb: "两人上后排。你从镜里数，是两个肩。" },
            { id: "n1-pair-refuse", label: "拒载", next: true, fx: { warn: 1, rep: -6 }, fb: "守则六：持路单不得拒载。耿稍后会来一句。" }
          ]
        }),
        beat({
          id: "n1-radio",
          kind: "talk",
          tag: "电台",
          name: "空台",
          bg: "dash.jpg",
          fare: "本晚份子 16",
          body: [
            "电台里有人在点播，声小，字听不清。",
            "子时还早。窗口在河西口，不在河埠。",
            "手套箱那张守则，今晚还没人改过。"
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "后视镜里只有路灯。后排两人已经下了。" }
          },
          choices: [{ id: "n1-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    2: {
      title: "第二晚　铅笔字",
      beats: [
        beat({
          id: "n2-visor",
          kind: "talk",
          tag: "遮阳板",
          name: "上一班",
          bg: "dash.jpg",
          fare: "工号 YE-08　第二晚",
          body: [
            "遮阳板掉下一截铅笔。铅芯秃了。",
            "板背面有字，挤在原厂说明边上，一笔比一笔轻。"
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "镜还是空的。铅笔灰掉在仪表上。" }
          },
          choices: [
            { id: "n2-read", label: "掀开遮阳板看完", next: true, fx: { flags: { sawPencil: true }, unlock: "visor" }, fb: "就那几行。镜里对不上的不算。垫子干的别收湿座钱。" }
          ]
        }),
        beat({
          id: "n2-jiang",
          kind: "talk",
          tag: "路单 1 人",
          name: "江渺",
          img: "jiang.jpg",
          bg: "street.jpg",
          fare: "YE-08　巷口 → 广播站　1 人",
          body: [
            "她站在雨搭底下，耳机没拔。",
            "「去广播站。夜班点播。」她报了门牌，又补一句，「今晚有人点 YE-08。我听了一半。」"
          ],
          looks: {
            waybill: { text: "巷口 → 广播站　1 人。" },
            mirror: { img: "empty.jpg", text: "她还没上。镜里空，路单 1。" }
          },
          choices: [
            { id: "n2-jiang-take", label: "载", next: true, fx: { cash: 10, flags: { metJiang: true } }, fb: "她坐后排。耳机里漏出半句：……灯别关。" },
            { id: "n2-jiang-refuse", label: "拒载", next: true, fx: { warn: 1, rep: -4 }, fb: "路单还在。她改去走。耳机没拔。" }
          ]
        }),
        beat({
          id: "n2-empty",
          kind: "judge",
          tag: "路单 1 人",
          name: "后排有人说话",
          img: "empty.jpg",
          bg: "dash.jpg",
          fare: "YE-08　河西坝 → 旧厂门口　1 人",
          body: [
            "路单写 1。副驾没人。后排有人在报门牌，声贴着你后脑。",
            "你还没扭头。后视镜在滴水。"
          ],
          looks: {
            waybill: { text: "河西坝 → 旧厂门口　1 人。调度：耿。" },
            mirror: { img: "empty.jpg", text: "镜里后排空的。路单写着一人。说话的声还在。" }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "visor"],
          correct: { action: "refuse", source: "visor" },
          reasonId: "r-count",
          table: {
            "refuse|visor": { sanity: 2, rep: -4, flags: { refusedEmpty: true }, fb: "你按遮阳板拒了。声停了。后排还是空的。份子少一笔。" },
            "take|fleet": { cash: 12, sanity: -8, mirror: 16, flags: { tookEmpty: true }, fb: "按路单收了一人份。后排垫子没有尻印。钱是干的。" },
            "refuse|fleet": { warn: 1, rep: -6, fb: "守则六不让拒持路单的。你还是拒了。调度会记。" },
            "take|visor": { sanity: -6, mirror: 10, warn: 1, fb: "遮阳板写着不算，你仍按有人开车。镜里空着。" },
            "doorstop|visor": { cash: 4, sanity: -2, flags: { refusedEmpty: true }, fb: "你送到旧厂门口。门开着，没人下来。" },
            "default": { sanity: -4, fb: "这一单压得含糊。声没有了。" }
          }
        }),
        beat({
          id: "n2-sms",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "本晚份子 18",
          body: [
            "短信：份子窗口仍在河西口。后续看通知。",
            "「河埠」两个字打出来又删了。输入框里还留着半截。"
          ],
          looks: {
            waybill: { text: "无新路单。" },
            mirror: { img: "dash.jpg", text: "后排空。" }
          },
          choices: [{ id: "n2-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    3: {
      title: "第三晚　墨色",
      beats: [
        beat({
          id: "n3-ink",
          kind: "talk",
          tag: "守则",
          name: "手套箱",
          bg: "dash.jpg",
          fare: "工号 YE-08　第三晚",
          body: [
            "守则还是那张。第二条的字比别的条黑，像后添的。",
            "原文你第一晚见过：载客时留意后视镜，人数报调度。",
            "现在写成：后视镜人数与路单不符时，以路单为准。"
          ],
          looks: {
            waybill: { text: "待派。" }
          },
          choices: [
            { id: "n3-seeink", label: "对着灯看墨", next: true, open: "rules", fx: { flags: { sawInk: true } }, fb: "墨未吃进纸。签字处是空白。" }
          ]
        }),
        beat({
          id: "n3-wet",
          kind: "judge",
          tag: "路单 1 人",
          name: "湿座客人",
          img: "wet.jpg",
          bg: "dash.jpg",
          fare: "YE-08　河西口 → 坝子巷　1 人",
          body: [
            "他已经坐在后排。白衬衫贴着肉，头发往下滴。",
            "路单写 1。他笑，说钱预备好了。",
            "雨在车外。车内不该这么湿。"
          ],
          looks: {
            waybill: { text: "河西口 → 坝子巷　1 人。调度：耿。" },
            mirror: { img: "dash.jpg", text: "路单 1。扭头是一个湿头发。镜里肩却像两块，一块淡，一块实。" },
            out: { img: "shoes.jpg", text: "鞋搁在踏板上往下滴。脚垫干的，没有尻印，也没有泥。" }
          },
          needLooks: ["mirror", "out"],
          conflictPair: ["fleet", "visor"],
          correct: { action: "refuse", source: "visor" },
          reasonId: "r-wet",
          table: {
            "refuse|visor": { sanity: 4, rep: -6, flags: { refusedWet: true }, fb: "你按遮阳板拒了。他笑着关门。鞋没湿到垫子。钱他没递出来。" },
            "take|fleet": { cash: 18, sanity: -14, mirror: 22, warn: 1, flags: { tookWet: true }, fb: "按路单收了一人份。后排垫子干着。钱潮的，夹进份子里会洇。" },
            "refuse|fleet": { sanity: 0, rep: -8, flags: { refusedWet: true, wetFleet: true }, fb: "人走了。守则六会记你一笔拒载，遮阳板那行你没引用。" },
            "take|visor": { sanity: -8, mirror: 12, warn: 1, flags: { tookWet: true }, fb: "遮阳板写着不算，你还是让他坐了。钱他塞过来，潮的。" },
            "doorstop|visor": { cash: 6, sanity: -4, flags: { wetDoor: true, refusedWet: true }, fb: "你送到巷口。他不下。垫子仍干。你把车门开着等，他后来自己走了。" },
            "take|radio": { cash: 18, sanity: -10, mirror: 14, warn: 1, flags: { tookWet: true, believedRadio: true }, fb: "电台还没把河埠说圆。你已经按有人收了钱。" },
            "default": { sanity: -6, warn: 1, fb: "这一单压偏了。油钱没多出多少，镜里多了一块。" }
          }
        }),
        beat({
          id: "n3-pei",
          kind: "talk",
          tag: "熟客",
          name: "裴晚宁",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08　县医院 → 河西口　1 人",
          bodyIf: {
            refusedWet: [
              "她上车先看后排。垫子干。",
              "「少一个人有人当吉利。你今晚没贪那笔。」她把工牌翻过来，照片比她老。"
            ],
            tookWet: [
              "她上车闻了一下。",
              "「后排潮。钱别跟份子搁一块儿。」她说镜里少一个，有人当吉利。她没说多一个怎么办。"
            ],
            _: [
              "她准点。副驾那位置她认。",
              "「第二晚我听广播点过这车。灯别关那句，不是我点的。」"
            ]
          },
          looks: {
            waybill: { text: "县医院 → 河西口　1 人。" },
            mirror: { img: "empty.jpg", text: "她坐副驾。后排空。人数对。" }
          },
          choices: [
            { id: "n3-pei-take", label: "载", next: true, fx: { cash: 10, flags: { peiN3: true } }, fb: "她下车时说：手套箱那张第二条，墨是新的。" }
          ]
        }),
        beat({
          id: "n3-geng",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "本晚份子 18",
          body: [
            "短信：几人收几人，省事。",
            "没有问你拒没拒。没有问垫子。"
          ],
          choices: [{ id: "n3-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    4: {
      title: "第四晚　冲突贴条",
      beats: [
        beat({
          id: "n4-paper",
          kind: "talk",
          tag: "后座",
          name: "折叠纸",
          bg: "empty.jpg",
          fare: "工号 YE-08　第四晚",
          body: [
            "后座缝里夹着一张折叠纸，被坐过，边软。",
            "字跟守则第三条拧着。第三条写白事不得上后排。"
          ],
          looks: {
            out: { img: "shoes.jpg", text: "踏板干。纸是从车里掉的，不是从路上贴来的。" }
          },
          choices: [
            { id: "n4-readp", label: "展开看完", next: true, fx: { flags: { sawConflict: true }, unlock: "paper" }, fb: "丧事可上后排。送到门口停。别过河埠那摊水。" }
          ]
        }),
        beat({
          id: "n4-liu",
          kind: "judge",
          tag: "路单 1 人",
          name: "柳絮",
          img: "liu.jpg",
          bg: "street.jpg",
          fare: "YE-08　河西口 → 河埠前巷口　1 人　白事",
          body: [
            "她站在后车门边。白裙子，黑外套，雨打在肩上。",
            "「送到门口就行。别过那摊水。」她不坐副驾。",
            "路单写 1，备注栏被铅笔涂过，隐约一个「丧」。"
          ],
          looks: {
            waybill: { text: "河西口 → 河埠前巷口　1 人。备注涂黑。" },
            mirror: { img: "empty.jpg", text: "她还在门外。镜里空。路单 1。" },
            out: { img: "liu.jpg", text: "她的鞋是干的。雨打外套，没打进裙子里。" }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "paper"],
          correct: { action: "doorstop", source: "paper" },
          ethical: { action: "doorstop", source: "paper" },
          company: { action: "refuse", source: "fleet" },
          reasonId: "r-funeral",
          table: {
            "doorstop|paper": { cash: 8, sanity: 4, rep: -2, flags: { doorstopLiu: true }, fb: "你送到那扇门，停在积水外边。她自己下去。门开了一条缝。" },
            "doorstop|visor": { cash: 8, sanity: 2, flags: { doorstopLiu: true }, fb: "遮阳板也写别过河埠。你停在门口。她谢了一声，很轻。" },
            "refuse|fleet": { rep: 6, flags: { refusedLiu: true }, fb: "守则三：白事不上后排。她没争。伞是黑的，走的时候没回头。" },
            "take|fleet": { cash: 14, sanity: -12, mirror: 10, warn: 1, flags: { wentRiver: true, tookLiuPast: true }, fb: "你按路单往前开，开过那扇门。积水没过轮眉。后排没人说话。" },
            "take|radio": { cash: 14, sanity: -12, warn: 1, flags: { wentRiver: true, believedRadio: true }, fb: "你听了还没正式下发的口令，把车开进河埠。门口那扇门你错过了。" },
            "take|paper": { cash: 10, sanity: -8, flags: { wentRiver: true }, fb: "纸上写送到门口停。你仍往前。她在某一刻不在了。" },
            "refuse|paper": { flags: { refusedLiu: true }, fb: "折叠纸让你送。你没让她上。纸还在手套箱。" },
            "default": { sanity: -4, fb: "这一单过后，门口那扇门关着。" }
          }
        }),
        beat({
          id: "n4-kan",
          kind: "talk",
          tag: "路口",
          name: "老阚",
          img: "kan.jpg",
          bg: "street.jpg",
          fare: "无路单　夜巡",
          body: [
            "路口有人拿手电照地面。黄雨衣，工牌反光。",
            "「河埠那头灯不亮。积水按白天的线，夜里会往前爬。」",
            "他不打车。手电照你的轮胎，照完就抬走。"
          ],
          looks: {
            out: { img: "street.jpg", text: "斑马线积了一层。反光是红的、绿的，没有人影。" }
          },
          choices: [
            { id: "n4-kan-ok", label: "记下河埠灯不亮", next: true, fx: { flags: { metKan: true } }, fb: "他嗯了一声。手电关了，路口更暗。" }
          ]
        }),
        beat({
          id: "n4-end",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "本晚份子 20",
          body: [
            "短信：白事那单，路单仍算一人。",
            "没有提门口，也没有提积水。"
          ],
          choices: [{ id: "n4-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    5: {
      title: "第五晚　河埠污染",
      beats: [
        beat({
          id: "n5-radio",
          kind: "talk",
          tag: "电台",
          name: "临时口令",
          bg: "dash.jpg",
          fare: "工号 YE-08　第五晚",
          body: [
            "电台里插进一句调度口吻：河埠今晚能停。份子窗口改河埠。",
            "守则第五条还写着不得停靠。纸条边的涂改是湿的。"
          ],
          choices: [
            { id: "n5-hear", label: "把口令记进守则页", next: true, fx: { flags: { sawTaint: true }, unlock: "radio" }, fb: "口令和第五条并排。哪条算今晚的，没有人签字。" }
          ]
        }),
        beat({
          id: "n5-duan",
          kind: "talk",
          tag: "宵夜摊",
          name: "段师傅",
          img: "duan.jpg",
          bg: "street.jpg",
          fare: "无路单",
          body: [
            "宵夜摊还开着。段师傅衔着烟，帽檐湿一圈。",
            "「河埠不能停。积水那线，白天画给行人，夜里给车。车过去的，白天不回来交班。」",
            "他认出 YE-08。「耿让你去你就去？他以前也开这车。」"
          ],
          looks: {
            out: { img: "street.jpg", text: "摊边报纸压着一只碗。没有路单。" }
          },
          choices: [
            { id: "n5-duan-ok", label: "听完再走", next: true, fx: { flags: { metDuan: true, gengHint: true } }, fb: "他弹烟灰。「钥匙别交到河埠。」" }
          ]
        }),
        beat({
          id: "n5-river",
          kind: "judge",
          tag: "路单 1 人",
          name: "河埠指派",
          bg: "dash.jpg",
          fare: "YE-08　河西口 → 河埠窗口　1 人　调度加急",
          body: [
            "路单是耿直接发的。目的地写河埠窗口。人数 1。",
            "后排这会儿没人。电台把第五条翻了面。"
          ],
          looks: {
            waybill: { text: "河西口 → 河埠窗口　1 人。加急。调度：耿。" },
            mirror: { img: "empty.jpg", text: "后排空。路单仍写 1。加急不解释人在哪。" },
            out: { img: "street.jpg", text: "河埠方向那盏灯确实暗。积水反光。" }
          },
          needLooks: ["mirror"],
          conflictPair: ["fleet", "radio"],
          correct: { action: "refuse", source: "fleet" },
          reasonId: "r-ferry",
          table: {
            "refuse|fleet": { rep: -4, flags: { refusedRiver: true }, fb: "你按第五条绕开。加急作废。耿过了一会儿只回：收到。" },
            "refuse|visor": { flags: { refusedRiver: true }, fb: "遮阳板写耿让你往河埠开就别去。你没去。" },
            "doorstop|paper": { cash: 6, flags: { refusedRiver: true, doorstopEnd: true }, fb: "你停在河埠前那扇门。窗口的灯还远。折叠纸认这一步。" },
            "take|radio": { cash: 20, sanity: -18, mirror: 16, warn: 1, flags: { wentRiver: true, believedRadio: true }, fb: "车开进积水。窗口有人收份子，不收钥匙。后排不知何时有了肩。" },
            "take|fleet": { cash: 20, sanity: -16, warn: 1, flags: { wentRiver: true }, fb: "第五条你没引用。河埠窗口的灯是绿的，像还能停。" },
            "default": { sanity: -6, warn: 1, fb: "这一单过后，轮胎缝里有泥。" }
          }
        }),
        beat({
          id: "n5-shadow",
          kind: "talk",
          tag: "手套箱",
          name: "份子夹",
          bg: "dash.jpg",
          fare: "本晚份子 20",
          bodyIf: {
            tookWet: [
              "湿座那笔还在夹子里。纸币潮，把别的票也洇了。",
              "窗口今晚仍在河西口。退不退，只有你知道那笔是哪一单。"
            ],
            refusedWet: [
              "夹子是干的。",
              "电台又把那句口令放了一遍，声小了。"
            ],
            _: [
              "夹子是干的。电台里没有人点 YE-08。"
            ]
          },
          choices: [{ id: "n5-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    6: {
      title: "第六晚　账本",
      beats: [
        beat({
          id: "n6-book",
          kind: "talk",
          tag: "窗口",
          name: "账本",
          bg: "dash.jpg",
          fare: "工号 YE-08　第六晚",
          body: [
            "窗口把账本转过来让你签字。你的名字在三年前那一页已经有一行，份子勾过。",
            "工号也是 YE-08。字迹不是你的。",
            "当晚值班签名处写着「耿」。"
          ],
          looks: {
            waybill: { text: "账本不是路单。不能拿去收钱。" }
          },
          choices: [
            { id: "n6-see", label: "把这一页看完", next: true, fx: { sanity: -8, flags: { sawBook: true, gengIsPrev: true } }, fb: "后一页空白，等你。再后一页被人撕了。" },
            { id: "n6-skip", label: "只签今晚", next: true, fx: { flags: { sawBook: true } }, fb: "窗口没逼你翻。耿的签名仍在三年前。" }
          ]
        }),
        beat({
          id: "n6-geng",
          kind: "talk",
          tag: "路边",
          name: "耿",
          img: "geng.jpg",
          bg: "street.jpg",
          fare: "无路单",
          body: [
            "他站在你车门外，不进来。中山装肩上全是雨。",
            "「灯别关。」他说得像还在驾驶座上交代。",
            "你问调度室在哪。他指了指河西口窗口。「我坐那儿。这车我开过。」"
          ],
          looks: {
            mirror: { img: "empty.jpg", text: "他不在镜里。人在门外。" }
          },
          choices: [
            { id: "n6-geng-ask", label: "问他当年送到哪", next: true, fx: { flags: { askedGeng: true } }, fb: "「没送到。活着出来就算交班。」他不再看你。" },
            { id: "n6-geng-go", label: "开车门请他上来", next: true, fx: { sanity: -6, mirror: 8 }, fb: "他摇头。后排忽然沉了一下，又没有。" }
          ]
        }),
        beat({
          id: "n6-jiang",
          kind: "talk",
          tag: "电台",
          name: "江渺",
          img: "jiang.jpg",
          bg: "street.jpg",
          fare: "YE-08　广播站 → 巷口　1 人",
          body: [
            "她下班。耳机挂在脖子上。",
            "「上一班 YE-08 的录音今晚重播。说话的人叫你别把钥匙交到河埠。工号报得清清楚楚。」",
            "她看了看你的工牌。「你也是这个号。他们没改号。」"
          ],
          looks: {
            waybill: { text: "广播站 → 巷口　1 人。" },
            mirror: { img: "empty.jpg", text: "她一人。人数对。" }
          },
          choices: [
            { id: "n6-jiang-take", label: "载", next: true, fx: { cash: 10, flags: { jiangN6: true } }, fb: "她下车前说：下一班会听你留的。你要留的话，写在油纸背面。" }
          ]
        }),
        beat({
          id: "n6-end",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "本晚份子 22",
          body: [
            "短信：明晚交钥匙。窗口仍在河西口。",
            "「别关灯」是另起一行。"
          ],
          choices: [{ id: "n6-shop", label: "去窗口交份子", shop: true }]
        })
      ]
    },
    7: {
      title: "第七晚　留给下一班",
      beats: [
        beat({
          id: "n7-keep",
          kind: "talk",
          tag: "油纸背面",
          name: "留给下一班",
          bg: "dash.jpg",
          fare: "工号 YE-08　末晚",
          body: [
            "油纸背面最后一行空着。江渺说下一班会听你留的。",
            "耿要钥匙。窗口在河西口。灯还亮。"
          ],
          choices: [
            { id: "n7-keep-pencil", label: "留下铅笔那行：对不上的不算", next: true, fx: { flags: { ruledPencil: true } }, fb: "你把铅笔描深。第二条后添的墨你画了道。" },
            { id: "n7-keep-radio", label: "把电台口令贴在第五条上", next: true, fx: { flags: { ruledRadio: true } }, fb: "口令盖住「不得停靠」。下一班会先看见河埠能停。" },
            { id: "n7-keep-blank", label: "背面留空", next: true, fx: { flags: { ruledBlank: true } }, fb: "你没写。下一班会自己掀遮阳板，或者不掀。" }
          ]
        }),
        beat({
          id: "n7-pei",
          kind: "talk",
          tag: "路单 1 人",
          name: "裴晚宁",
          img: "pei.jpg",
          bg: "street.jpg",
          fare: "YE-08　县医院 → 河西口　1 人",
          body: [
            "天亮前她下班。伞是医院发的那种。",
            "「钥匙交窗口。别听河埠。」她看后排，没坐进去，坐了副驾。"
          ],
          looks: {
            waybill: { text: "县医院 → 河西口　1 人。" },
            mirror: { img: "empty.jpg", text: "副驾有人。后排空。人数对。" }
          },
          choices: [
            { id: "n7-pei-take", label: "载", next: true, fx: { cash: 8, flags: { peiN7: true } }, fb: "她在河西口下。说了句谢谢。没提吉利。" }
          ]
        }),
        beat({
          id: "n7-sms",
          kind: "talk",
          tag: "短信",
          name: "耿调度",
          bg: "dash.jpg",
          fare: "子时前　交钥匙",
          body: [
            "短信：窗口等你。灯别关。",
            "河埠那边也有人值班。他没写是谁。"
          ],
          choices: [{ id: "n7-sms-go", label: "去交钥匙", next: true }]
        }),
        beat({
          id: "n7-keys",
          kind: "talk",
          tag: "交班",
          name: "钥匙",
          bg: "dash.jpg",
          img: "geng.jpg",
          fare: "子时　份子与钥匙",
          body: [
            "耿在窗口里边。灯打在玻璃上，看不清他是坐着还是站着。",
            "点烟器旁边是原位。后视镜挂绳还在。河埠那头没有灯。"
          ],
          looks: {
            mirror: { img: "dash.jpg", text: "镜里后排像有人等着接。也可能是座套的褶。" },
            waybill: { text: "本晚无新路单。交钥匙。" }
          },
          choices: [
            { id: "n7-window", label: "钥匙交到河西口窗口", end: "keysWindow", fx: { flags: { keysToGeng: true } } },
            { id: "n7-door", label: "先送到那扇门口，再回来交钥匙", end: "doorstop", fx: { flags: { doorstopEnd: true } } },
            { id: "n7-mirror", label: "钥匙挂后视镜，下车走", end: "mirror", fx: { flags: { gaveToMirror: true, leftKeysOnMirror: true } } },
            { id: "n7-lamp", label: "关灯，钥匙留在点烟器", end: "lamp", fx: { flags: { lampOff: true, abandoned: true } } },
            { id: "n7-river", label: "开去河埠窗口交", end: "river", fx: { flags: { wentRiver: true, lampOff: true } } }
          ]
        })
      ]
    }
  };

  root.KB_DATA = {
    saveKey: "kongche-yeban-v1",
    schema: 1,
    PHASE: PHASE,
    SOURCES: SOURCES,
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
