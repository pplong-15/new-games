"use strict";
(function (root) {
  root.LIANG_DATA = {
    SAVE_VERSION: 3,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "今天只能听一份。哪份坑人，交差那天再说。",
    PLAYER: "祁晚纸",
    STAFF: "临聘文员",
    NIGHT_LINE: {
      1: "袁检那页摊着。未报建写成全天。点第一行进待听。",
      2: "老荀人不在，铅笔亮了。吉时改过，特例写成全周。不能当本日听份。",
      3: "红纸亮了。停工令写不得升，红纸写必须升。今日仍只交一份。",
      4: "安全单摊开。外人离场。外人栏圈着方守成。",
      5: "印发对过一遍：袁检、方守成、田安，各管各的纸。",
      6: "口信到了。要你把停工令和红纸都写上。主栏仍只一格。",
      7: "程匠头回访。先应他今日听哪份，再交条。"
    },
    PAPER: {
      jianli: { name: "监理夹", listen: "听监理", bag: "今天听监理", rec: "寄梁" },
      red: { name: "东家红纸", listen: "听东家吉时", bag: "今天听东家", rec: "升梁" },
      safe: { name: "安全单", listen: "听安全单", bag: "今天听安全单", rec: "空场" }
    },
    LIMITS: {
      jianli: "监理夹写的是报建。不能证明吉时门外是谁，梁压不压人也没写。",
      red: "红纸写他要吉时升、要自己在场。报建齐没齐，这页盖不住。寄梁那一行空着。",
      safe: "安全单写队里要外人离场。宅主是不是外人，田安这页定不了。",
      pencil: "老荀改过吉时，特例写成全周。不能当本日听份。",
      kouxin: "口信是让你两份都写。不能证明主栏能收两格，不能当本日听份。"
    },
    UNLOCK_NIGHT: { jianli: 1, pencil: 2, red: 3, safe: 4, kouxin: 6, visit: 7 }
  };
})(typeof window !== "undefined" ? window : global);
