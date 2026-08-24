"use strict";
(function (root) {
  root.GUOMEN_DATA = {
    SAVE_VERSION: 1,
    SAVE_KEY: "guomen-state",
    CLOCK_MAX: 720,
    HOLD_MS: 1500,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "没有一份全对。路单身份决定听哪一份。",
    PLAYER: "江晚路",
    STAFF: "代班司机",
    DEST: "堂屋门",
    DISPATCHER: "杜衡",
    NEED_LOOK_NIGHTS: [3, 5, 7],
    RADIO: {
      1: "短波报桥。金桂苑那边灯还亮。",
      2: "门前别停太久。杜衡又念了一遍。",
      3: "回访车还停金桂苑门口。",
      4: "有人在念：喜丧不同过。",
      5: "子时前后禁行。物业那条也在飘。",
      6: "点名老申那班。人没回。",
      7: "报时。子时很硬。"
    },
    CLAUSES: {
      "fleet-listen": { source: "fleet", night: 1, text: "客人要去的门就过", token: "ting-keren", bag: "听客人" },
      "pencil-zishi": { source: "pencil", night: 2, text: "子时必须走这道门", token: "zishi-zou", bag: "特例" },
      "slip-xi": { source: "xi_slip", night: 4, text: "可过堂屋门槛", token: "xi-pass", bag: "喜条" },
      "slip-sang": { source: "sang_slip", night: 4, text: "丧不得出喜门槛", token: "sang-no-xi", bag: "丧条" },
      "sms-night": { source: "gate_sms", night: 5, text: "夜间禁出棺", token: "ye-jin", bag: "门禁" }
    },
    PAIRS: {
      A: { a: "fleet-listen", b: "slip-sang", night: 4 },
      B: { a: "sms-night", b: "pencil-zishi", night: 5 }
    },
    PRESS: ["fleet", "pencil", "xi_slip", "sang_slip", "gate_sms"]
  };
})(typeof window !== "undefined" ? window : global);
