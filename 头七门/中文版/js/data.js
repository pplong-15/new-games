"use strict";
(function (root) {
  root.TOUQI_DATA = {
    SAVE_VERSION: 1,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "今晚征兆只能管今晚。放错了人会回来。",
    PLAYER: "沈晚闸",
    STAFF: "门岗临聘",
    ENERGY: { 1: 4, 2: 4, 3: 5, 4: 5, 5: 5, 6: 4, 7: 5 },
    OMEN: {
      1: "",
      2: "",
      3: "未在礼簿上的不进",
      4: "本期以外的声音不要应",
      5: "有孝字的都要核",
      6: "问纸的人先问章",
      7: "天亮前以名单为准"
    },
    PEOPLE: {
      wcs: { id: "wcs", name: "吴成山" },
      wgx: { id: "wgx", name: "吴桂香" },
      hs: { id: "hs", name: "黄叔" },
      extra: { id: "extra", name: "外人" }
    },
    NIGHT_QUEUE: {
      1: ["wcs"],
      2: ["hs"],
      3: ["wcs", "hs"],
      4: ["wgx"],
      5: ["wcs", "extra"],
      6: [],
      7: ["extra"]
    },
    DOCS: {
      flow: { name: "流程页", night: 1 },
      fang: { name: "房份单", night: 4 },
      ledger: { name: "礼簿", night: 1 },
      pencil: { name: "铅笔", night: 2 }
    },
    LIMITS_OFFSCREEN: {
      flow: "馆方流程页只能证明印发者当时要门岗只接本期做七的人、不接外人、「本期」写得含糊。不能证明本期含不含六七，不能证明对方是回魂，不能当全真。",
      fang: "族规房份单只能证明一七孝男、六七出嫁女必须进，吴桂香在单上；会漏写外姓。不能证明外姓一定是闲人，不能证明人就是签字的那一张脸。",
      omen: "征兆只能证明今晚广播这样说、今晚有效。不能证明对方一定是回魂，不能管到别的夜，不能单独定死所有人。",
      pencil: "上一班铅笔只能证明老阙写过全夜特例、口语会把一次写成夜夜。不能证明特例全夜有效，不能证明帮忙即房份，不能当全真。",
      ledger: "礼簿只能证明谁出过钱，不能证明人是谁。不能把份子抬成房份。夹缝份子不问也能收，不改交差名。"
    }
  };
})(typeof window !== "undefined" ? window : global);
