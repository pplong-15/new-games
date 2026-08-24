"use strict";
(function (root) {
  root.LIANG_DATA = {
    SAVE_VERSION: 3,
    PAY_VALID: 36,
    PAY_LATE: 0,
    LOCK: "Hear one paper today. Which one burns you, say it when you file.",
    PLAYER: "Qi Wanzhi",
    STAFF: "temp clerk",
    NIGHT_LINE: {
      1: "Yuan's page is out. Unfiled is written as all day. Hit the first line to hold it.",
      2: "Lao Xun is gone. The pencil is lit. Auspicious hour changed, the exception written as the whole week. It cannot be today's hearing.",
      3: "The red paper is lit. The stop-work says do not raise. The red paper says you must. Still one filing today.",
      4: "Safety slip is out. Outsiders off the yard. The outsider column circles Fang Shoucheng.",
      5: "Print check: Yuan, Fang Shoucheng, Tian An. Each keeps their own paper.",
      6: "A message arrived. It wants the stop-work and the red paper both written. The main slot is still one cell.",
      7: "Foreman Cheng is back. Answer which paper you heard today, then file."
    },
    PAPER: {
      jianli: { name: "Supervisor clip", listen: "Hear the supervisor", bag: "Hearing the supervisor today", rec: "send-the-beam" },
      red: { name: "Owner's red paper", listen: "Hear the owner's hour", bag: "Hearing the owner today", rec: "raise-the-beam" },
      safe: { name: "Safety slip", listen: "Hear the safety slip", bag: "Hearing the safety slip today", rec: "empty yard" }
    },
    LIMITS: {
      jianli: "The clip writes filing status. It cannot prove who stands outside at the auspicious hour, and it does not say whether the beam will crush anyone.",
      red: "The red paper writes that he wants the beam raised at the auspicious hour, and himself present. Whether filing is complete, this page cannot cover. The send-the-beam (jiliang) line is blank.",
      safe: "The safety slip writes that the crew wants outsiders off the yard. Whether the homeowner is an outsider, Tian An's page cannot decide.",
      pencil: "Lao Xun changed the auspicious hour and wrote the exception as the whole week. It cannot be today's hearing.",
      kouxin: "The message wants both papers written. It cannot prove the main slot holds two cells. It cannot be today's hearing."
    },
    UNLOCK_NIGHT: { jianli: 1, pencil: 2, red: 3, safe: 4, kouxin: 6, visit: 7 }
  };
})(typeof window !== "undefined" ? window : global);
