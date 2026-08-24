"use strict";
(function (root) {
  var LOCK_LINE = "The three copies cannot still be the same person. Lock only if right. Wrong does not tell you which.";
  var NAMES = [
    { id: "zhou-ahai", label: "Zhou Ahai" },
    { id: "zhou-shigen", label: "Zhou Shigen" },
    { id: "paper-shu", label: "paper-effigy memorial (shu)" }
  ];
  var FATES = [
    { id: "fate-left-unreturned", label: "left as a monk, not returned" },
    { id: "fate-unreleased", label: "substitute passage (tidu) not released" },
    { id: "fate-filed-paper", label: "paper-effigy filed" }
  ];
  var SLOTS = [
    { id: "slot-before-shu", label: "person before the shu", hit: "hit-before" },
    { id: "slot-absent", label: "person not present", hit: "hit-absent" },
    { id: "slot-shu", label: "the shu itself", hit: "hit-shu" }
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
  var DOC_CAPTIONS = {
    "02-hukou.jpg": "Typed copy of the household-register still: Zhou Ahai, man, born 1985, forty-one, workplace a quarry. Window oral: still working, drove out today.",
    "03-dudie.jpg": "Typed copy of the monastic-certificate still: dharma name Jingche, lay name Zhou Ahai, birth year 1968. Insert: ordained in place of Zhou Shigen.",
    "04-shu.jpg": "Typed copy of the paper-effigy memorial (shu): heading Zhou Ahai. Body one character: dai, in place of. Note: not a living person. No fingerprint. Hanging period not finished.",
    "05-register.jpg": "Typed copy of the venue register: a registered monastery in Andu County. Abbot Shi Kuanning. Monastic count 12. The abbot is not in this group.",
    "06-notes.jpg": "Typed copy of the notebook still: one court substitute-passage (tidu) line. Vermilion: literature, not an operating guide. Not in this group.",
    "07-form-blank.jpg": "Typed copy of the blank piece-rate slip: empty rows. Only a locked group has pay. Same person, tonight zero. Wrong fill not marked red.",
    "07-form-white.jpg": "Typed copy of a filled near-answer slip kept off the unlocked desk.",
    "08-form-locked.jpg": "Typed copy of the locked sheet: frost on the table. The group is received. Pay arrived.",
    "10-ending-a.jpg": "Typed copy of the locked ending: morning will not chase this sheet. Ahai’s substitute passage (tidu) is still hanging. You have no authority to release it."
  };
  var DOCS = {
    "doc-hukou": {
      title: "Resident registration card",
      img: "02-hukou.jpg",
      lines: [
        "County: Andu County",
        "Name: Zhou Ahai",
        "Sex: male",
        "Born: 1985 · forty-one",
        "Workplace: quarry"
      ],
      extra: "Window oral slip: still working. Drove out today.",
      limits: "This card can show this household is still on the books and the person can still drive out. It cannot show he took tonsure. It cannot take the name on the memorial slip (shu) as him present."
    },
    "doc-dudie": {
      title: "Buddhist monastic registration",
      img: "03-dudie.jpg",
      lines: [
        "Dharma name: Jingche",
        "Lay name: Zhou Ahai",
        "Birth year: 1968",
        "Lineage / abbot’s monastery: blank"
      ],
      extra: "A dharma name does not enter a household-register field.",
      limits: "This certificate can match a lay name written Zhou Ahai and a birth year written 1968. It cannot prove Zhou Ahai himself took tonsure."
    },
    "doc-dudie-fuye": {
      title: "Certificate insert",
      img: "03-dudie.jpg",
      lines: [
        "Ordained in place of: Zhou Shigen",
        "Note: adult"
      ],
      extra: "The front page lay name is still Zhou Ahai. The insert writes another person.",
      limits: "This can prove the certificate was issued in place of Zhou Shigen. It cannot prove Zhou Shigen stands in the courtyard tonight."
    },
    "doc-shu": {
      title: "Paper-effigy memorial (shu)",
      img: "04-shu.jpg",
      lines: [
        "Heading: Zhou Ahai",
        "Body one character: dai (in place of)",
        "Side note: paper-effigy memorial (shu) · not a living person",
        "No fingerprint. Hanging period not finished."
      ],
      extra: "What hangs on the rope is paper.",
      limits: "This can prove a paper in the courtyard writes Zhou Ahai. It cannot prove paper walks. It cannot take the heading as a living person present."
    },
    "doc-register": {
      title: "Religious venue registration",
      img: "05-register.jpg",
      lines: [
        "Seat: a registered monastery, Andu County",
        "Abbot: Shi Kuanning",
        "Monastic count: 12"
      ],
      extra: "The abbot does not enter these three rows.",
      limits: "This sheet only registers the venue and the abbot. Headcount cannot say whose paper is hanging. The abbot cannot enter a name-status slot."
    },
    "doc-note": {
      title: "Notebook photocopy",
      img: "06-notes.jpg",
      lines: [
        "One court substitute-passage (tidu) line.",
        "Vermilion: literature, not an operating guide.",
        "Not in this group."
      ],
      extra: "A history-book wording. Tonight’s sheet is not filled that way.",
      limits: "This can show substitute passage (tidu) was once written that way. It cannot tell you how to fill tonight. It cannot be a basis for a deliverance rite or a release."
    },
    "doc-pay": {
      title: "Piece-rate slip",
      img: "07-form-blank.jpg",
      lines: [
        "Only a locked group has pay.",
        "Three copies written as one person, tonight zero.",
        "A wrong fill is not marked red.",
        "Do not approve a deliverance rite. Do not approve a release."
      ],
      extra: "Hold to file. Let go and it does not count.",
      limits: "Piece-rate only takes a locked group. A blank sheet has no pay."
    }
  };
  var NEAR = [
    {
      id: "near-three-same",
      label: "All three rows written Zhou Ahai, left as a monk, not returned",
      exclude: "The three copies cannot still be the same person; household oral says still working; the paper-effigy memorial (shu) is not a living person"
    },
    {
      id: "near-shigen-front",
      label: "Person before the shu written Zhou Shigen (a real monastic should stand before the shu)",
      exclude: "The still shows a quarry jacket before the shu; the insert writes ordained in place of; that person was never present"
    },
    {
      id: "near-shu-is-ahai",
      label: "The shu itself written Zhou Ahai (the heading is him)",
      exclude: "Paper-effigy side note: not a living person; no fingerprint; what hangs is paper"
    }
  ];
  root.TIDU_DATA = {
    LOCK_LINE: LOCK_LINE,
    STAFF_ID: "Anmin Lulin 6",
    PLAYER: "Qiu Xiaoting",
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
    DOC_CAPTIONS: DOC_CAPTIONS,
    DOCS: DOCS,
    NEAR: NEAR,
    SAVE_KEY: "tidu-sanming-v2-en",
    SAVE_VERSION: 2
  };
})(typeof window !== "undefined" ? window : global);
