/* Huaiyin stability upload desk. Authority is upload and a suggested huifang script. */
(function (global) {
  var KEY = "hyjd-guoji-upload-v1-en";
  var START = 20 * 60 + 4;
  var DEADLINE = 22 * 60;

  var FIELDS = [
    { id: "heir", title: "Heir on record" },
    { id: "when", title: "Guoji date" },
    { id: "consent", title: "Birth-branch intent" },
    { id: "kind", title: "Dispute class" },
    { id: "live", title: "Current residence" }
  ];

  var BLOCKS = {
    "heir-sishu": { field: "heir", title: "Heir written as Geng Xiaoman", from: "red-paper copy" },
    "heir-hukou": { field: "heir", title: "This hukou lists no heir", from: "hukou roll" },
    "heir-live": { field: "heir", title: "Neighbors name Geng Wanhe as the one living there", from: "alley board" },
    "heir-zupu": { field: "heir", title: "Genealogy already writes Xiaoman", from: "Kuang Shan's note" },
    "when-sishu": { field: "when", title: "Mingji on 2026-05-19", from: "red-paper date" },
    "when-hukou": { field: "when", title: "No inbound move in three years", from: "hukou inbound column" },
    "when-zupu": { field: "when", title: "Genealogy backfill on 2026-07-28", from: "Jiangzuo extract" },
    "consent-sishu": { field: "consent", title: "Shouli marked the paper as agreeing", from: "red-paper witnesses" },
    "consent-letter": { field: "consent", title: "Suqiu stamped it as a receipt", from: "grid letter" },
    "consent-neighbor": { field: "consent", title: "Bochuan pressed her finger; she did not nod", from: "Auntie Tan" },
    "kind-order": { field: "kind", title: "Ticket written as guoji and raising", from: "stability dispatch" },
    "kind-share": { field: "kind", title: "Share in that back-yard room", from: "Suqiu's letter" },
    "kind-care": { field: "kind", title: "Care not on any roll", from: "Wanhe's old page" },
    "kind-measure": { field: "kind", title: "The tape measured that back-yard room", from: "Tan follow-up" },
    "live-sishu": { field: "live", title: "Red paper says Xiaoman should enter the heir house", from: "sishu text" },
    "live-hukou": { field: "live", title: "Xiaoman still on 9 Quyuan Road", from: "hukou check" },
    "live-neighbor": { field: "live", title: "At night No. 17 is still Wanhe who opens", from: "neighbors" },
    "live-wanhe": { field: "live", title: "Wanhe says she still lives here", from: "old-space posts" }
  };

  function blank() {
    return {
      min: START,
      visited: {},
      extracted: {},
      uploaded: {},
      wanhe: false,
      closed: false,
      ending: "",
      hint: 0
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

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function fmt(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return pad(h) + ":" + pad(m);
  }

  function toast(msg) {
    var old = document.querySelector(".hy-toast");
    if (old) old.parentNode.removeChild(old);
    var el = document.createElement("div");
    el.className = "hy-toast";
    el.textContent = msg;
    document.body.appendChild(el);
    setTimeout(function () {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 2400);
  }

  function uploadedCount(s) {
    return Object.keys(s.uploaded).length;
  }

  function visit(page, cost) {
    var s = load();
    if (!s.visited[page]) {
      s.visited[page] = true;
      if (!s.closed) s.min += cost;
    } else if (!s.closed) {
      s.min += 1;
    }
    if (page === "letter") s.wanhe = true;
    save(s);
    return s;
  }

  function extract(id) {
    var s = load();
    if (!BLOCKS[id]) return;
    if (s.closed) {
      toast("Ticket already issued. New extracts stay off the desk.");
      return;
    }
    if (s.min >= DEADLINE) {
      toast("Past 22:00. System refuses new extracts.");
      return;
    }
    if (s.extracted[id]) {
      toast("This line is already on the upload desk.");
      return;
    }
    s.extracted[id] = true;
    s.min += 2;
    save(s);
    toast("Parked on the upload desk. Tick it from the night desk.");
    var btn = document.querySelector('[data-block="' + id + '"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "On the desk";
    }
    if (typeof document !== "undefined" && document.dispatchEvent) {
      document.dispatchEvent(new CustomEvent("hy-extract"));
    }
  }

  function bindPicks() {
    var s = load();
    var list = document.querySelectorAll("[data-block]");
    for (var i = 0; i < list.length; i++) {
      (function (btn) {
        var id = btn.getAttribute("data-block");
        if (s.extracted[id] || s.closed) {
          btn.disabled = true;
          btn.textContent = s.extracted[id] ? "On the desk" : "Extract window closed";
        }
        btn.addEventListener("click", function () {
          extract(id);
        });
      })(list[i]);
    }
  }

  function paintClock(el) {
    if (!el) return;
    var s = load();
    el.textContent = "System time " + fmt(s.min) + "  Upload cutoff 22:00";
    el.className = "desk-clock" + (s.min >= 21 * 60 + 40 ? " late" : "");
  }

  function paperHeir(heir) {
    return heir === "heir-sishu" || heir === "heir-zupu";
  }

  function liveStay(live) {
    return live === "live-neighbor" || live === "live-wanhe";
  }

  function shareKind(kind) {
    return kind === "kind-share" || kind === "kind-measure";
  }

  function pickEnding(s) {
    var u = s.uploaded;
    var heir = u.heir || "";
    var when = u.when || "";
    var live = u.live || "";
    var kind = u.kind || "";
    if (paperHeir(heir) && (when === "when-hukou" || liveStay(live))) return "clash";
    if (paperHeir(heir) && (when === "when-sishu" || when === "when-zupu")) return "paper";
    if (!paperHeir(heir) && (liveStay(live) || heir === "heir-live" || kind === "kind-care")) return "care";
    if (shareKind(kind) && !paperHeir(heir)) return "share";
    if (heir === "heir-hukou" || live === "live-hukou" || when === "when-hukou") return "hukou";
    return "clash";
  }

  function uploadField(field, blockId) {
    var s = load();
    if (s.closed) {
      toast("Already issued. Fields cannot change.");
      return false;
    }
    if (s.min >= DEADLINE) {
      toast("Past 22:00. Fields take nothing new.");
      return false;
    }
    if (s.uploaded[field]) {
      toast("This field is already up. Cannot pull it back.");
      return false;
    }
    if (!s.extracted[blockId]) {
      toast("Extract it from a source page first, then tick.");
      return false;
    }
    var b = BLOCKS[blockId];
    if (!b || b.field !== field) {
      toast("This line does not match this field.");
      return false;
    }
    s.uploaded[field] = blockId;
    s.min += 7;
    save(s);
    toast("This field is uploaded. Locked.");
    return true;
  }

  function issue() {
    var s = load();
    var n = uploadedCount(s);
    if (n < 3) {
      if (s.min >= DEADLINE) {
        s.ending = "timeout";
        s.closed = true;
        save(s);
        location.href = "result.html";
        return;
      }
      toast("System takes issue only when three fields are up.");
      return;
    }
    s.ending = pickEnding(s);
    s.closed = true;
    save(s);
    location.href = "huifang.html";
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function radioName(field) {
    return "up-" + field;
  }

  function renderDesk() {
    var s = load();
    paintClock(document.getElementById("clock"));
    var box = document.getElementById("trays");
    if (!box) return;
    box.innerHTML = "";
    FIELDS.forEach(function (f) {
      var fs = document.createElement("fieldset");
      fs.className = "tray" + (s.uploaded[f.id] ? " locked" : "");
      var lg = document.createElement("legend");
      lg.textContent = f.title;
      fs.appendChild(lg);
      var hits = Object.keys(BLOCKS).filter(function (id) {
        return BLOCKS[id].field === f.id && s.extracted[id];
      });
      if (!hits.length) {
        var p = document.createElement("p");
        p.textContent = s.uploaded[f.id]
          ? "This field is locked."
          : "Nothing extracted yet. Open the collect list and come back.";
        fs.appendChild(p);
      } else {
        hits.forEach(function (id) {
          var lab = document.createElement("label");
          var inp = document.createElement("input");
          inp.type = "radio";
          inp.name = radioName(f.id);
          inp.value = id;
          if (s.uploaded[f.id] === id) inp.checked = true;
          if (s.uploaded[f.id] || s.closed) inp.disabled = true;
          lab.appendChild(inp);
          lab.appendChild(document.createTextNode(" " + BLOCKS[id].title + " (" + BLOCKS[id].from + ")"));
          fs.appendChild(lab);
        });
        if (!s.uploaded[f.id] && !s.closed) {
          var btn = document.createElement("button");
          btn.type = "button";
          btn.textContent = "Upload this field";
          btn.addEventListener("click", function () {
            var chosen = box.querySelector('input[name="' + radioName(f.id) + '"]:checked');
            if (!chosen) {
              toast("Tick one version first.");
              return;
            }
            if (uploadField(f.id, chosen.value)) renderDesk();
          });
          fs.appendChild(btn);
        } else if (s.uploaded[f.id]) {
          var done = document.createElement("p");
          done.textContent = "Uploaded. Cannot withdraw.";
          fs.appendChild(done);
        }
      }
      box.appendChild(fs);
    });
    var n = uploadedCount(s);
    var cnt = document.getElementById("upcount");
    if (cnt) {
      cnt.textContent = n >= 3
        ? "Three fields up. You can issue a huifang script."
        : "Empty tickets bounce at the hour. Issue needs at least three fields.";
    }
    var go = document.getElementById("issue");
    if (go) {
      go.disabled = false;
      go.onclick = issue;
    }
    var draft = document.getElementById("draft");
    if (draft) {
      draft.innerHTML = "";
      if (n) {
        var lines = previewLines(s);
        lines.forEach(function (t) {
          var li = document.createElement("li");
          li.textContent = t;
          draft.appendChild(li);
        });
      }
    }
    var wanheLink = document.getElementById("wanhe-slot");
    if (wanheLink) wanheLink.style.display = s.wanhe ? "list-item" : "none";
  }

  function previewLines(s) {
    var out = [];
    var u = s.uploaded;
    if (u.heir === "heir-sishu") out.push("Script draft: Ask the Shouli household when Geng Xiaoman moved into No. 17.");
    if (u.heir === "heir-hukou") out.push("Script draft: Ask first why the red paper and the hukou do not match.");
    if (u.heir === "heir-live") out.push("Script draft: Book Geng Wanhe as the person living there.");
    if (u.heir === "heir-zupu") out.push("Script draft: Ask, from the genealogy extract, who told them to write Xiaoman in.");
    if (u.when === "when-sishu") out.push("Script draft: Check whether the 2026-05-19 mingji still counts.");
    if (u.when === "when-hukou") out.push("Script draft: Inbound column is empty. Ask if anything was kept off the books.");
    if (u.when === "when-zupu") out.push("Script draft: Ask who signed when they backfilled the book in July.");
    if (u.consent === "consent-sishu") out.push("Script draft: Ask Shouli to confirm his mark still holds.");
    if (u.consent === "consent-letter") out.push("Script draft: Ask Suqiu which sheet she thought she was stamping.");
    if (u.consent === "consent-neighbor") out.push("Script draft: Ask whether Bochuan pressed the stamp for her.");
    if (u.kind === "kind-order") out.push("Script draft: Dispatch as a guoji-and-raising dispute.");
    if (u.kind === "kind-share") out.push("Script draft: Book a share mediator instead.");
    if (u.kind === "kind-care") out.push("Script draft: Ask who did the care, and who is on the roll.");
    if (u.kind === "kind-measure") out.push("Script draft: Ask first who that measured room belongs to.");
    if (u.live === "live-sishu") out.push("Script draft: Tell Xiaoman to bring the hukou book and the inbound form.");
    if (u.live === "live-hukou") out.push("Script draft: Check the person at 9 Quyuan Road.");
    if (u.live === "live-neighbor") out.push("Script draft: Knock No. 17 at night. See who opens.");
    if (u.live === "live-wanhe") out.push("Script draft: Use her own words. Check first whether she still lives there.");
    if (!out.length) out.push("No field uploaded. Draft is blank.");
    return out;
  }

  function renderHuifang() {
    var s = load();
    var host = document.getElementById("script-box");
    if (!host) return;
    if (!s.closed || !s.ending || s.ending === "timeout") {
      host.innerHTML = "<p>Script not issued. Go back to the night desk and upload the fields.</p>";
      return;
    }
    var ul = document.createElement("ul");
    previewLines(s).forEach(function (t) {
      var li = document.createElement("li");
      li.textContent = t.replace("Script draft: ", "");
      ul.appendChild(li);
    });
    host.appendChild(ul);
    var extra = document.getElementById("script-extra");
    if (extra) extra.setAttribute("data-end", s.ending);
  }

  function renderResult() {
    var s = load();
    if (!s.ending) {
      if (uploadedCount(s) >= 3) {
        s.ending = pickEnding(s);
        s.closed = true;
        save(s);
      } else if (s.min >= DEADLINE) {
        s.ending = "timeout";
        s.closed = true;
        save(s);
      } else {
        location.href = "desk.html";
        return;
      }
    }
    var nodes = document.querySelectorAll("[data-ending]");
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].hidden = nodes[i].getAttribute("data-ending") !== s.ending;
    }
    var why = document.getElementById("why");
    if (why) why.textContent = whyText(s);
  }

  function whyText(s) {
    var bits = [];
    Object.keys(s.uploaded).forEach(function (f) {
      var id = s.uploaded[f];
      if (BLOCKS[id]) bits.push(BLOCKS[id].title);
    });
    if (!bits.length) return "You uploaded nothing.";
    return "You uploaded: " + bits.join("; ") + ".";
  }

  function nextHint() {
    var s = load();
    if (s.hint < 4) s.hint += 1;
    save(s);
    showHints();
  }

  function showHints() {
    var s = load();
    for (var i = 1; i <= 4; i++) {
      var el = document.getElementById("hint-" + i);
      if (el) el.hidden = i > s.hint;
    }
  }

  global.HY = {
    load: load,
    save: save,
    visit: visit,
    extract: extract,
    bindPicks: bindPicks,
    paintClock: paintClock,
    renderDesk: renderDesk,
    renderHuifang: renderHuifang,
    renderResult: renderResult,
    reset: reset,
    nextHint: nextHint,
    showHints: showHints,
    issue: issue,
    DEADLINE: DEADLINE,
    fmt: fmt,
    uploadedCount: uploadedCount,
    pickEnding: pickEnding,
    BLOCKS: BLOCKS
  };
})(this);
