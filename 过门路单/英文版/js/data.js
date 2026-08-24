"use strict";
(function (root) {
  root.GUOMEN_DATA = {
    SAVE_VERSION: 1,
    SAVE_KEY: "guomen-state-en",
    CLOCK_MAX: 720,
    HOLD_MS: 1500,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "No paper is wholly true. Waybill identity decides which paper you hear.",
    PLAYER: "Jiang Wanlu",
    STAFF: "relief driver",
    DEST: "Hall door",
    DISPATCHER: "Du Heng",
    NEED_LOOK_NIGHTS: [3, 5, 7],
    RADIO: {
      1: "Shortwave. Bridge report. Lights still on at Jin Gui Yuan.",
      2: "Don't idle at the door. Du Heng said it again.",
      3: "Return-visit car still at Jin Gui Yuan gate.",
      4: "Someone reciting: joy and funeral do not share a crossing.",
      5: "No travel around zishi. Estate line still floating.",
      6: "Roll call. Lao Shen's shift. He didn't come back.",
      7: "Time signal. zishi is hard."
    },
    CLAUSES: {
      "fleet-listen": { source: "fleet", night: 1, text: "Guest names a door, go through it", token: "ting-keren", bag: "Hearing the guest" },
      "pencil-zishi": { source: "pencil", night: 2, text: "At zishi this door must be taken", token: "zishi-zou", bag: "Exception" },
      "slip-xi": { source: "xi_slip", night: 4, text: "Hall threshold may be crossed", token: "xi-pass", bag: "Joy slip" },
      "slip-sang": { source: "sang_slip", night: 4, text: "Funeral does not leave a joy threshold", token: "sang-no-xi", bag: "Funeral slip" },
      "sms-night": { source: "gate_sms", night: 5, text: "No coffin out at night", token: "ye-jin", bag: "Gate SMS" }
    },
    PAIRS: {
      A: { a: "fleet-listen", b: "slip-sang", night: 4 },
      B: { a: "sms-night", b: "pencil-zishi", night: 5 }
    },
    PRESS: ["fleet", "pencil", "xi_slip", "sang_slip", "gate_sms"]
  };
})(typeof window !== "undefined" ? window : global);
