"use strict";
(function (root) {
  var LOCK_LINE = "三份不能再是同一个人。对了才锁。错了不揭晓。";
  var NAMES = [
    { id: "zhou-ahai", label: "周阿海" },
    { id: "zhou-shigen", label: "周石根" },
    { id: "paper-shu", label: "纸人疏" }
  ];
  var FATES = [
    { id: "fate-left-unreturned", label: "出家未归" },
    { id: "fate-unreleased", label: "替度未解除" },
    { id: "fate-filed-paper", label: "纸人入档" }
  ];
  var SLOTS = [
    { id: "slot-before-shu", label: "疏前的人", hit: "hit-before" },
    { id: "slot-absent", label: "不在场的人", hit: "hit-absent" },
    { id: "slot-shu", label: "疏本身", hit: "hit-shu" }
  ];
  var TRUTH = {
    "slot-before-shu": { nameId: "zhou-ahai", fateId: "fate-unreleased" },
    "slot-absent": { nameId: "zhou-shigen", fateId: "fate-left-unreturned" },
    "slot-shu": { nameId: "paper-shu", fateId: "fate-filed-paper" }
  };
  var LEGAL_NAMES = { "zhou-ahai": 1, "zhou-shigen": 1, "paper-shu": 1 };
  var LEGAL_FATES = {
    "fate-left-unreturned": 1,
    "fate-unreleased": 1,
    "fate-filed-paper": 1
  };
  var DOC_FILL = {
    "doc-hukou": "zhou-ahai",
    "doc-dudie": "zhou-ahai",
    "doc-dudie-front": "zhou-ahai",
    "doc-dudie-fuye": "zhou-shigen",
    "doc-shu": "paper-shu",
    "doc-shu-head": "zhou-ahai"
  };
  var DOC_FLAGS = {
    "doc-hukou": ["flag-read-hukou", "flag-read-hukou-oral"],
    "doc-dudie": ["flag-read-dudie", "flag-fa-name"],
    "doc-dudie-front": ["flag-read-dudie", "flag-fa-name"],
    "doc-dudie-fuye": ["flag-read-dudie", "flag-read-dai-shigen"],
    "doc-shu": ["flag-read-shu", "flag-read-shu-dai", "flag-no-print"],
    "doc-register": ["flag-read-register"],
    "doc-still": ["flag-seen-still"],
    "doc-note": ["flag-court-seen"],
    "doc-pay": ["flag-read-pay"],
    "doc-sms": ["flag-sms-tonight"]
  };
  var DOCS = {
    "doc-hukou": {
      title: "常住人口登记卡",
      img: "02-hukou.jpg",
      lines: [
        "县：安渡县",
        "姓名：周阿海",
        "性别：男",
        "出生：1985年　四十一",
        "服务处所：石场"
      ],
      extra: "窗口口述条：人还在干活。今天还出了车。",
      limits: "这张卡只能说明这一户还在册、人还能出车。不能说明他剃度过，也不能拿疏上的名字当他本人到场。"
    },
    "doc-dudie": {
      title: "佛教出家僧人登记证",
      img: "03-dudie.jpg",
      lines: [
        "法名：晶彻",
        "俗名：周阿海",
        "出生年月：1968",
        "师承 / 住持寺院：空着"
      ],
      extra: "法名不进户籍栏。",
      limits: "能对上这张证的俗名写成周阿海、生辰写成一九六八。不能证明周阿海本人剃度过。"
    },
    "doc-dudie-fuye": {
      title: "度牒附页",
      img: "03-dudie.jpg",
      lines: [
        "代出家人：周石根",
        "附注：成年人"
      ],
      extra: "正页俗名仍是周阿海。附页另写一个人。",
      limits: "能证明这张度牒是替周石根出的。不能证明周石根今晚站在院子里。"
    },
    "doc-shu": {
      title: "纸人疏",
      img: "04-shu.jpg",
      lines: [
        "疏首：周阿海",
        "正文一个字：代",
        "旁注：纸人疏 · 不是真人",
        "无指纹。悬挂期未满。"
      ],
      extra: "绳上挂的是纸。",
      limits: "能证明院里挂着一张写了周阿海的纸。不能证明纸会走路，也不能把疏首当成活人到场。"
    },
    "doc-register": {
      title: "宗教活动场所登记",
      img: "05-register.jpg",
      lines: [
        "住所：安渡县某登记寺院",
        "住持：释宽宁",
        "僧籍人数：12"
      ],
      extra: "住持不进本组三行。",
      limits: "这张表只登记场所和住持。人数说明不了悬挂的纸是谁，也不能把住持填进名分槽。"
    },
    "doc-note": {
      title: "笔记影印",
      img: "06-notes.jpg",
      lines: [
        "宫廷替度一条。",
        "朱批：文献，不当操作指南。",
        "未进本组。"
      ],
      extra: "史书里的写法。今晚的表不按这个填。",
      limits: "只能说明从前有过替度这种写法。不能当今晚怎么填表，也不能当作超度或解除的依据。"
    },
    "doc-pay": {
      title: "计件单",
      img: "07-form-blank.jpg",
      lines: [
        "锁定组才有工钱。",
        "三份写成同一个人，今晚零。",
        "填错不标红。",
        "不批准超度。不批准解除。"
      ],
      extra: "按住才交。松手不算。",
      limits: "计件只认锁定组。白表没有工钱。"
    }
  };
  var NEAR = [
    {
      id: "near-three-same",
      label: "三行都写成周阿海、出家未归",
      exclude: "三份不能再是同一个人；户籍口述条人还在干活；纸人疏不是真人"
    },
    {
      id: "near-shigen-front",
      label: "疏前写成周石根（真出家人该站在疏前）",
      exclude: "静帧疏前是石场那件褂；附页写代出家人，人本来就不在场"
    },
    {
      id: "near-shu-is-ahai",
      label: "疏本身写成周阿海（疏首就是他）",
      exclude: "纸人疏旁注不是真人；无指纹；悬挂的是纸"
    }
  ];
  root.TIDU_DATA = {
    LOCK_LINE: LOCK_LINE,
    STAFF_ID: "安民录临6",
    PLAYER: "邱小汀",
    PAY_AMOUNT_LOCKED: 36,
    HOLD_MS: 1500,
    CLOCK_MAX: 600,
    NAMES: NAMES,
    FATES: FATES,
    SLOTS: SLOTS,
    TRUTH: TRUTH,
    LEGAL_NAMES: LEGAL_NAMES,
    LEGAL_FATES: LEGAL_FATES,
    DOC_FILL: DOC_FILL,
    DOC_FLAGS: DOC_FLAGS,
    DOCS: DOCS,
    NEAR: NEAR,
    SAVE_KEY: "tidu-sanming-v2",
    SAVE_VERSION: 2
  };
})(typeof window !== "undefined" ? window : global);
