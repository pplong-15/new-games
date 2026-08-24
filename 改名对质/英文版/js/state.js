/* Bunan night-window confront. Recommend only. Key gaiming-duizhi-v1-en */
(function (global) {
  var KEY = "gaiming-duizhi-v1-en";

  var SENTENCES = {
    "shu-weijiechu": { text: "Qingwa Nunnery courtesy-lodging slip copy still lists Qu-clan Hehe, dharma name Jinghe, status not released", from: "annex cabinet" },
    "shu-tingxiang": { text: "Stop-incense stopped reception; it did not void the old lodging slip", from: "keeper note" },
    "pu-chengji": { text: "Qu west-branch genealogy name is still Qu Chengji", from: "genealogy office" },
    "pu-weijie": { text: "Genealogy office never received a police rename notice", from: "one-mouth desk" },
    "hukou-yigai": { text: "Household-register name already changed from Qu Xiaohe to Qu Wanhe", from: "change extract" },
    "zhi-mingqi": { text: "Marriage papers need three columns aligned: household name, genealogy name, lodging-release", from: "lead slip" },
    "zhi-ye": { text: "Night window only issues a recommendation; it does not issue marriage-file originals", from: "permission page" },
    "lin-buning": { text: "The Linpu Qu Wanhe is another person; this specific merge is ruled out", from: "cc mail" },
    "kou-wushu": { text: "The old-page jump-the-wall scene has no document number", from: "old blog" }
  };

  var CLAIMS = [
    {
      id: "claim-tiaogiang",
      text: "Jump-the-wall was already done last year. Courtesy lodging was released long ago.",
      need: ["shu-weijiechu"],
      crack: "shu",
      ok: "His mouth stopped. He could not finish “released long ago.” He has not seen that cabinet column.",
      miss: "You have not taken in the matching line from a page yet."
    },
    {
      id: "claim-pu",
      text: "The genealogy followed. It is Qu Wanhe now too.",
      need: ["pu-chengji"],
      crack: "pu",
      ok: "He changed his story: he never went to South Street to look. He dropped Chengji.",
      miss: "You have not taken in the genealogy line yet."
    },
    {
      id: "claim-hun",
      text: "The shift lead said names are aligned, so night window can issue the marriage papers.",
      need: ["zhi-mingqi", "zhi-ye"],
      crack: "hun",
      ok: "He heard “names aligned” as already aligned. The slip writes a condition.",
      miss: "The notice line or the lead slip — you have not taken it in."
    },
    {
      id: "claim-attitude",
      text: "I already queued. You are still holding me.",
      need: [],
      push: "Rushing does not take the slip down. Tomorrow’s queue is tomorrow. If the columns do not match, they do not match."
    },
    {
      id: "claim-tingxiang",
      text: "The nunnery already stopped. How can the slip still count?",
      need: [],
      push: "Stop-incense is the nunnery’s business. Whether I did the release is another thing — that is how he pushes back. Stopped and released are not one column."
    },
    {
      id: "claim-lin",
      text: "The next county has a same-name receipt. Just use that.",
      need: ["lin-buning"],
      crack: "lin",
      ok: "He took the Linpu household out of his mouth. Same name does not weld.",
      miss: "You have not opened the next-county cc, or you have not taken that line in."
    }
  ];

  function blank() {
    return {
      saved: {},
      cracks: {},
      seen: {},
      hint: 0,
      ending: "",
      pick: ""
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return blank();
      var s = JSON.parse(raw);
      var b = blank();
      Object.keys(b).forEach(function (k) {
        if (s[k] == null) s[k] = b[k];
      });
      return s;
    } catch (e) {
      return blank();
    }
  }

  function save(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function toast(msg) {
    var old = document.querySelector(".gm-toast");
    if (old) old.parentNode.removeChild(old);
    var d = document.createElement("div");
    d.className = "gm-toast";
    d.textContent = msg;
    document.body.appendChild(d);
    setTimeout(function () {
      if (d.parentNode) d.parentNode.removeChild(d);
    }, 3200);
  }

  function hasSaved(s, ids) {
    for (var i = 0; i < ids.length; i++) {
      if (s.saved[ids[i]]) return true;
    }
    return false;
  }

  function markSeen(id) {
    if (!id) return;
    var s = load();
    s.seen[id] = true;
    save(s);
  }

  function doSave(sid) {
    if (!SENTENCES[sid]) return;
    var s = load();
    s.saved[sid] = true;
    save(s);
    toast("Took it in. The confront window can use it.");
    renderSaved();
    renderStatus();
    var btns = document.querySelectorAll('[data-save="' + sid + '"]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].textContent = "Already in the bag";
      btns[i].disabled = true;
    }
  }

  function confront(cid) {
    var claim = null;
    for (var i = 0; i < CLAIMS.length; i++) {
      if (CLAIMS[i].id === cid) claim = CLAIMS[i];
    }
    if (!claim) return;
    var s = load();
    var box = document.getElementById("gm-feedback");
    var b = document.querySelector('[data-claim="' + cid + '"]');
    if (claim.push) {
      if (box) {
        box.textContent = claim.push;
        box.setAttribute("data-fb", "push");
      }
      if (b && (b.className || "").indexOf("gm-pushed") < 0) {
        b.className = (b.className || "") + " gm-pushed";
      }
      toast("He pushed the reason back.");
      return;
    }
    if (!hasSaved(s, claim.need)) {
      if (box) {
        box.textContent = claim.miss;
        box.setAttribute("data-fb", "miss");
      }
      toast(claim.miss);
      return;
    }
    s.cracks[claim.crack] = true;
    save(s);
    if (box) {
      box.textContent = claim.ok;
      box.setAttribute("data-fb", "ok");
    }
    toast("This line does not match. He cannot push it back.");
    renderStatus();
    if (b && (b.className || "").indexOf("gm-cracked") < 0) {
      b.className = (b.className || "") + " gm-cracked";
    }
  }

  function pickEnding(s) {
    if (s.pick === "overreach") return "overreach";
    if (s.pick === "release") return "release";
    return "hold";
  }

  function reasonLines(s) {
    var lines = [];
    if (s.pick === "overreach") {
      lines.push("You ticked proxy jump-the-wall on the slip, or you ticked a night edit of the genealogy. Night window has neither power.");
    } else if (s.pick === "release") {
      lines.push("You wrote issuable from his mouth. The receipt will treat names as aligned.");
    } else {
      lines.push("You wrote withhold tonight. Lan Huai takes a recommendation. The stamp is not under this lamp.");
    }
    if (s.cracks.shu) {
      lines.push("His oral “released long ago” does not match the cabinet “not released.”");
    } else if (s.pick === "hold") {
      lines.push("You have not pinned the lodging column in confront. Withhold is a first block. The column is still thin.");
    }
    if (s.cracks.pu) {
      lines.push("The genealogy still says Qu Chengji. Wanhe on the household book does not take the genealogy with it.");
    } else if (s.pick === "hold" || s.pick === "release") {
      lines.push("You did not point the genealogy layer. Notary looks at names aligned, not at an oral return to lay life.");
    }
    if (s.cracks.hun) {
      lines.push("Names aligned is a three-column condition, not that he is already aligned.");
    }
    if (s.cracks.lin) {
      lines.push("You split the Linpu household off. You did not merge it in.");
    } else if (s.seen["you-lin"] || s.seen["you-xi"]) {
      lines.push("You opened the next-county cc. That is another household. It cannot stand as this household’s release.");
    }
    if (s.saved["kou-wushu"]) {
      lines.push("The old-page jump-the-wall has no document number. It cannot stand as a release.");
    }
    return lines;
  }

  function submitPick(pick) {
    var s = load();
    s.pick = pick;
    s.ending = pickEnding(s);
    save(s);
    var map = {
      hold: "result-hold.html",
      release: "result-release.html",
      overreach: "result-overreach.html"
    };
    location.href = map[s.ending] || "result-hold.html";
  }

  function wipe() {
    localStorage.removeItem(KEY);
  }

  function renderSaved() {
    var ul = document.getElementById("gm-saved");
    if (!ul) return;
    var s = load();
    ul.innerHTML = "";
    var ids = Object.keys(SENTENCES);
    var n = 0;
    ids.forEach(function (id) {
      if (!s.saved[id]) return;
      n += 1;
      var li = document.createElement("li");
      li.textContent = SENTENCES[id].text + " (" + SENTENCES[id].from + ")";
      ul.appendChild(li);
    });
    if (!n) {
      var empty = document.createElement("li");
      empty.className = "gm-empty";
      empty.textContent = "The bag is empty. Only lines with a button on the page can be taken in.";
      ul.appendChild(empty);
    }
  }

  function renderStatus() {
    var el = document.getElementById("gm-status");
    if (!el) return;
    var s = load();
    var a = 0;
    var b = 0;
    Object.keys(s.saved).forEach(function (k) {
      if (s.saved[k]) a += 1;
    });
    Object.keys(s.cracks).forEach(function (k) {
      if (s.cracks[k]) b += 1;
    });
    el.textContent = "Bag " + a + "  Pointed " + b;
  }

  function renderClaims() {
    var box = document.getElementById("gm-claims");
    if (!box) return;
    var s = load();
    box.innerHTML = "";
    CLAIMS.forEach(function (c) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gm-claim" + (c.push ? " gm-pushable" : "") + (s.cracks[c.crack] ? " gm-cracked" : "");
      btn.setAttribute("data-claim", c.id);
      btn.textContent = c.text;
      btn.onclick = function () {
        confront(c.id);
      };
      box.appendChild(btn);
    });
  }

  function renderHints() {
    var box = document.getElementById("gm-hint");
    if (!box) return;
    var s = load();
    var lines = [
      "Match oral talk against a cabinet column. Do not fight the attitude.",
      "Stop-incense and release are not one column. Genealogy and household register are not one column either.",
      "Take in “not released” first, then point at “released long ago.” Take Chengji from the genealogy page and point at “the genealogy followed.”",
      "Oral “already jumped the wall” does not match “not released.” Household name changed; genealogy name did not. Recommend withhold tonight. Do not proxy."
    ];
    var n = s.hint || 0;
    if (n < 1) {
      box.textContent = "There is still paper in the drawer. Flip only one extra sheet at a time.";
      return;
    }
    box.textContent = lines[Math.min(n, 4) - 1];
  }

  function renderResult() {
    var box = document.getElementById("gm-reason");
    if (!box) return;
    var s = load();
    box.innerHTML = "";
    reasonLines(s).forEach(function (t) {
      var p = document.createElement("p");
      p.textContent = t;
      box.appendChild(p);
    });
  }

  function boot() {
    var page = document.body.getAttribute("data-page");
    if (page) markSeen(page);
    renderStatus();
    renderSaved();
    renderClaims();
    renderHints();
    renderResult();
    var saves = document.querySelectorAll("[data-save]");
    var s = load();
    for (var i = 0; i < saves.length; i++) {
      (function (btn) {
        var sid = btn.getAttribute("data-save");
        if (s.saved[sid]) {
          btn.textContent = "Already in the bag";
          btn.disabled = true;
        }
        btn.onclick = function () {
          doSave(sid);
        };
      })(saves[i]);
    }
    var wipeBtn = document.getElementById("gm-wipe");
    if (wipeBtn) {
      wipeBtn.onclick = function () {
        wipe();
        wipeBtn.textContent = "Local draft cleared. Come in from the pre-shift sheet again";
      };
    }
    var hintBtn = document.getElementById("gm-hint-next");
    if (hintBtn) {
      hintBtn.onclick = function () {
        var st = load();
        if (st.hint < 4) st.hint += 1;
        save(st);
        renderHints();
        if (st.hint >= 4) hintBtn.textContent = "The paper is flipped through";
      };
    }
    var form = document.getElementById("gm-submit");
    if (form) {
      form.onsubmit = function (ev) {
        ev.preventDefault();
        var picked = form.querySelector("input[name=pick]:checked");
        if (!picked) {
          toast("Check one recommendation first.");
          return;
        }
        submitPick(picked.value);
      };
    }
  }

  global.GM = {
    KEY: KEY,
    SENTENCES: SENTENCES,
    CLAIMS: CLAIMS,
    load: load,
    save: save,
    wipe: wipe,
    boot: boot,
    pickEnding: pickEnding,
    reasonLines: reasonLines
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})(this);
