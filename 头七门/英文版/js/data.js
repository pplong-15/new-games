"use strict";
(function (root) {
  root.TOUQI_DATA = {
    SAVE_VERSION: 1,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "Tonight's omen governs tonight only. A wrong admission returns.",
    PLAYER: "Shen Wanzha",
    STAFF: "temp door",
    ENERGY: { 1: 4, 2: 4, 3: 5, 4: 5, 5: 5, 6: 4, 7: 5 },
    OMEN: {
      1: "",
      2: "",
      3: "Those not on the gift ledger do not enter",
      4: "Do not answer voices outside this period",
      5: "Anyone marked filial (xiao) must be checked",
      6: "Anyone asking for paper, ask for the stamp first",
      7: "Before dawn the name list is the standard"
    },
    PEOPLE: {
      wcs: { id: "wcs", name: "Wu Chengshan" },
      wgx: { id: "wgx", name: "Wu Guixiang" },
      hs: { id: "hs", name: "Uncle Huang" },
      extra: { id: "extra", name: "outsider" }
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
      flow: { name: "process page", night: 1 },
      fang: { name: "household-share sheet", night: 4 },
      ledger: { name: "gift ledger", night: 1 },
      pencil: { name: "pencil", night: 2 }
    },
    LIMITS_OFFSCREEN: {
      flow: "The hall process page can show that the printer then wanted the door to receive only people doing the seven for this period, no outsiders, and that this period is written loose. It cannot show whether this period holds night 6 of the seven, cannot show the other person is a returning soul, and cannot stand as the whole truth.",
      fang: "The clan household-share (fangfen) sheet can show that a filial son must enter on night 1 of the seven, a married-out daughter must enter on night 6, and that Wu Guixiang is on the sheet; outside surnames get left off. It cannot show an outside surname is idle help, and cannot show a face is the signed name.",
      omen: "The omen can show the hall broadcast said this tonight, and that it holds tonight. It cannot show the other person is a returning soul, cannot govern other nights, and cannot lock every name alone.",
      pencil: "Last shift's pencil can show Lao Que wrote a whole-night exception, and that his mouth turns once into night-after-night. It cannot show the exception holds all night, cannot show help equals household share, and cannot stand as the whole truth.",
      ledger: "The gift ledger can show who paid. It cannot show who a person is. Gift money cannot be raised into household share. Seam money can be taken without asking, and it does not change the name you hand in."
    }
  };
})(typeof window !== "undefined" ? window : global);
