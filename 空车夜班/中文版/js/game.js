(function (root) {
  var D = root.KB_DATA;
  if (!D) return;

  var ACTIONS = [
    { id: "take", label: "载" },
    { id: "refuse", label: "拒载" },
    { id: "doorstop", label: "送到门口停" }
  ];

  function empty() {
    return {
      schema: D.schema,
      night: 1,
      beat: 0,
      cash: D.startCash,
      sanity: D.startSanity,
      rep: D.startRep,
      mirror: 0,
      warnings: 0,
      fuel: 0,
      mins: 20 * 60 + 50,
      flags: {},
      items: [],
      sources: ["fleet"],
      looks: {},
      log: [],
      selectedSource: "",
      selectedAction: "",
      overlay: "title",
      ending: "",
      restNext: false,
      busy: false
    };
  }

  function clone(o) {
    return JSON.parse(JSON.stringify(o));
  }

  function load() {
    try {
      var raw = localStorage.getItem(D.saveKey);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || s.schema !== D.schema) return null;
      s.flags = s.flags || {};
      s.items = s.items || [];
      s.sources = s.sources || ["fleet"];
      s.looks = s.looks || {};
      s.log = s.log || [];
      return s;
    } catch (e) {
      return null;
    }
  }

  function save(s) {
    try {
      var dump = clone(s);
      dump.busy = false;
      dump.selectedSource = "";
      dump.selectedAction = "";
      localStorage.setItem(D.saveKey, JSON.stringify(dump));
    } catch (e) {}
  }

  function clearSave() {
    try {
      localStorage.removeItem(D.saveKey);
    } catch (e) {}
  }

  function hasSave() {
    return !!load();
  }

  function clamp(s) {
    if (s.cash < 0) s.cash = 0;
    if (s.cash > 999) s.cash = 999;
    if (s.sanity < 0) s.sanity = 0;
    if (s.sanity > 100) s.sanity = 100;
    if (s.rep < 0) s.rep = 0;
    if (s.rep > 100) s.rep = 100;
    if (s.mirror < 0) s.mirror = 0;
    if (s.mirror > 100) s.mirror = 100;
    if (s.warnings < 0) s.warnings = 0;
  }

  function nightData(n) {
    return D.NIGHTS[n];
  }

  function currentBeat(s) {
    var n = nightData(s.night);
    if (!n) return null;
    return n.beats[s.beat] || null;
  }

  function sourceUnlocked(s, id) {
    return s.sources.indexOf(id) >= 0;
  }

  function unlockSource(s, id) {
    if (id && s.sources.indexOf(id) < 0) s.sources.push(id);
  }

  function applyFx(s, fx) {
    if (!fx) return;
    if (fx.cash) s.cash += fx.cash;
    if (fx.sanity) s.sanity += fx.sanity;
    if (fx.rep) s.rep += fx.rep;
    if (fx.mirror) s.mirror += fx.mirror;
    if (fx.warn) s.warnings += fx.warn;
    if (fx.unlock) unlockSource(s, fx.unlock);
    if (fx.flags) {
      Object.keys(fx.flags).forEach(function (k) {
        s.flags[k] = fx.flags[k];
      });
    }
    if (fx.item && s.items.indexOf(fx.item) < 0) s.items.push(fx.item);
    clamp(s);
  }

  function looked(s, beatId, kind) {
    var bag = s.looks[beatId] || [];
    return bag.indexOf(kind) >= 0;
  }

  function lookName(k) {
    return k === "out" ? "下车看" : k === "mirror" ? "后视镜" : k === "waybill" ? "路单" : k;
  }

  function missingLooks(s, beat) {
    var need = (beat && beat.needLooks) || [];
    var missing = [];
    for (var i = 0; i < need.length; i++) {
      if (!looked(s, beat.id, need[i])) missing.push(need[i]);
    }
    return missing;
  }

  function markLook(s, beatId, kind) {
    if (!s.looks[beatId]) s.looks[beatId] = [];
    if (s.looks[beatId].indexOf(kind) < 0) s.looks[beatId].push(kind);
  }

  function beatBody(beat, s) {
    if (beat.bodyIf) {
      if (s.flags.tookWet && beat.bodyIf.tookWet) return beat.bodyIf.tookWet;
      if (s.flags.refusedWet && beat.bodyIf.refusedWet) return beat.bodyIf.refusedWet;
      if (beat.bodyIf._) return beat.bodyIf._;
    }
    return beat.body || [];
  }

  function validateJudge(s, beat, action, source) {
    var missing = missingLooks(s, beat);
    if (missing.length) return { blocked: true, missing: missing };
    if (!sourceUnlocked(s, source)) return { blocked: true, locked: source };
    if (!action || !source) return { blocked: true, needPick: true };
    var exact = beat.correct && beat.correct.action === action && beat.correct.source === source;
    var ethical = beat.ethical && beat.ethical.action === action && beat.ethical.source === source;
    var company = beat.company && beat.company.action === action && beat.company.source === source;
    var pair = beat.conflictPair || [];
    var partial = !exact && (action === (beat.correct && beat.correct.action) || pair.indexOf(source) >= 0);
    return {
      blocked: false,
      exact: !!exact,
      ethical: !!ethical,
      company: !!company,
      partial: !!partial,
      action: action,
      source: source,
      reasonId: beat.reasonId || ""
    };
  }

  function tableRow(beat, action, source) {
    var key = action + "|" + source;
    if (beat.table && beat.table[key]) return beat.table[key];
    if (beat.table && beat.table.default) return beat.table.default;
    return { fb: "这一单过去了。" };
  }

  function lookCost(s, beat, kind) {
    var first = !looked(s, beat.id, kind);
    if (first) return 0;
    if (kind === "out") return s.items.indexOf("light") >= 0 ? -2 : -6;
    if (kind === "mirror") {
      var text = (beat.looks && beat.looks.mirror && beat.looks.mirror.text) || "";
      if (/空|像两|像多|对不上/.test(text)) return -6;
    }
    return 0;
  }

  function quotaOf(s) {
    var q = D.QUOTA[s.night] || 16;
    q -= (s.fuel || 0) * 6;
    if (q < 8) q = 8;
    return q;
  }

  function clockStr(s) {
    var m = s.mins % (24 * 60);
    if (m < 0) m += 24 * 60;
    var h = Math.floor(m / 60);
    var mm = m % 60;
    return (h < 10 ? "0" : "") + h + ":" + (mm < 10 ? "0" : "") + mm;
  }

  function tick(s, add) {
    s.mins += add || 8;
  }

  function endNight(s) {
    var q = quotaOf(s);
    if (s.cash >= q) {
      s.cash -= q;
      s.flags["paid" + s.night] = true;
    } else {
      s.cash = 0;
      s.warnings += 1;
      s.sanity -= 8;
      s.flags["owed" + s.night] = true;
    }
    if (!s.restNext) s.sanity -= 6;
    s.restNext = false;
    s.fuel = 0;
    tick(s, 12);
    clamp(s);
    if (s.sanity <= 0) {
      finish(s);
      return;
    }
    s.night += 1;
    s.beat = 0;
    s.mins = 20 * 60 + 50;
    s.selectedAction = "";
    s.selectedSource = "";
    if (s.night > 7) {
      finish(s);
      return;
    }
    s.overlay = "shop";
  }

  function finish(s, forced) {
    if (forced) s.ending = forced;
    else s.ending = D.pickEnding(s);
    s.overlay = "ending";
    save(s);
  }

  function advance(s) {
    var n = nightData(s.night);
    if (!n) {
      finish(s);
      return;
    }
    s.beat += 1;
    s.selectedAction = "";
    s.selectedSource = "";
    s.lookKind = "";
    s.lookImg = "";
    s.lookText = "";
    tick(s, 10);
    if (s.beat >= n.beats.length) {
      if (s.night >= 7) finish(s);
      else endNight(s);
    }
  }

  function doLook(s, kind) {
    var beat = currentBeat(s);
    if (!beat) return { ok: false };
    if (kind === "out" && s.night < 3) return { ok: false, fb: "这一晚还不用下车。" };
    if (kind === "rules") {
      s.overlay = "rules";
      if (s.night >= 2) s.flags.sawPencil = true;
      if (s.night >= 3) s.flags.sawInk = true;
      if (s.night >= 4) s.flags.sawConflict = true;
      if (s.night >= 5) s.flags.sawTaint = true;
      if (s.night >= 6) s.flags.sawBookish = true;
      save(s);
      return { ok: true };
    }
    if (!beat.looks || !beat.looks[kind]) {
      if (kind === "waybill" && beat.fare) {
        markLook(s, beat.id, "waybill");
        s.lookKind = "waybill";
        s.lookText = beat.fare;
        s.lookImg = "";
        save(s);
        return { ok: true };
      }
      return { ok: false };
    }
    var spec = beat.looks[kind];
    var cost = lookCost(s, beat, kind);
    markLook(s, beat.id, kind);
    if (kind === "mirror" && s.night >= 2) unlockSource(s, "visor");
    if (cost) {
      s.sanity += cost;
      clamp(s);
    }
    s.lookKind = kind;
    s.lookText = spec.text;
    s.lookImg = spec.img || "";
    if (s.sanity <= 0) {
      finish(s);
      return { ok: true };
    }
    save(s);
    return { ok: true };
  }

  function doChoice(s, id) {
    var beat = currentBeat(s);
    if (!beat || s.busy || s.ending || s.overlay === "ending") return { ok: false };
    var miss = missingLooks(s, beat);
    if (miss.length) return { ok: false, missing: miss };
    var ch = (beat.choices || []).filter(function (c) { return c.id === id; })[0];
    if (!ch) return { ok: false };
    s.busy = true;
    applyFx(s, ch.fx);
    if (ch.fb) s.lastFb = ch.fb;
    if (s.sanity <= 0) {
      s.busy = false;
      finish(s);
      return { ok: true };
    }
    if (ch.open === "rules") {
      s.overlay = "rules";
      s.busy = false;
      if (ch.next) {
        /* stay for reading, next after close if already applied — apply next only when next and not open-only */
      }
      save(s);
      if (ch.next) {
        advance(s);
      }
      s.busy = false;
      save(s);
      return { ok: true };
    }
    if (ch.shop) {
      s.busy = false;
      endNight(s);
      save(s);
      return { ok: true };
    }
    if (ch.end) {
      s.busy = false;
      if (ch.end === "keysWindow") {
        /* dawn unless other flags win */
      }
      finish(s);
      return { ok: true };
    }
    if (ch.next) advance(s);
    s.busy = false;
    save(s);
    return { ok: true };
  }

  function doJudge(s, action, source) {
    var beat = currentBeat(s);
    if (!beat || beat.kind !== "judge" || s.busy || s.ending || s.overlay === "ending") return { ok: false };
    var v = validateJudge(s, beat, action, source);
    if (v.blocked) return { ok: false, v: v };
    s.busy = true;
    var row = tableRow(beat, action, source);
    applyFx(s, row);
    s.lastFb = row.fb || "";
    s.log.push({ night: s.night, id: beat.id, action: action, source: source, exact: v.exact });
    if (v.exact) s.flags["ok_" + beat.id] = true;
    if (s.sanity <= 0) {
      s.busy = false;
      finish(s);
      return { ok: true, v: v };
    }
    advance(s);
    s.busy = false;
    save(s);
    return { ok: true, v: v };
  }

  function shopVisible(s) {
    return D.SHOP.filter(function (it) {
      if (it.needFlag && !s.flags[it.needFlag]) return false;
      if (it.hideFlag && s.flags[it.hideFlag]) return false;
      if (it.item && s.items.indexOf(it.item) >= 0) return false;
      return true;
    });
  }

  function buy(s, id) {
    if (id === "skip") {
      s.overlay = "";
      save(s);
      return { ok: true };
    }
    var it = D.SHOP.filter(function (x) { return x.id === id; })[0];
    if (!it) return { ok: false };
    if (s.cash < it.cost) return { ok: false, fb: "油钱不够。" };
    s.cash -= it.cost;
    if (it.sanity) s.sanity += it.sanity;
    if (it.restNext) s.restNext = true;
    if (it.fuel) s.fuel = (s.fuel || 0) + it.fuel;
    if (it.item && s.items.indexOf(it.item) < 0) s.items.push(it.item);
    if (it.flags) applyFx(s, { flags: it.flags });
    clamp(s);
    save(s);
    return { ok: true };
  }

  var state = empty();

  function startNew() {
    state = empty();
    state.overlay = "";
    save(state);
    render();
    return state;
  }

  function continueSave() {
    var s = load();
    if (!s) return startNew();
    if (s.ending) s.overlay = "ending";
    else if (s.overlay === "title") s.overlay = "";
    state = s;
    save(state);
    render();
    return state;
  }

  function resetAll() {
    clearSave();
    state = empty();
    state.overlay = "title";
    render();
    return state;
  }

  function esc(t) {
    return String(t == null ? "" : t)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(id) {
    return root.document ? root.document.getElementById(id) : null;
  }

  function setHidden(node, yes) {
    if (!node) return;
    if (yes) node.classList.add("hidden");
    else node.classList.remove("hidden");
  }

  function hudHtml(s) {
    var n = s.night > 7 ? 7 : s.night;
    var phase = D.PHASE[n] || "";
    var extra = s.items.indexOf("cloth") >= 0 ? "　镜 " + s.mirror : "";
    return (
      "<span>第" + n + "晚 · " + esc(phase) + "</span>" +
      "<span>油钱 <b>" + s.cash + "</b></span>" +
      "<span>神智 <b>" + s.sanity + "</b></span>" +
      "<span>车誉 <b>" + s.rep + "</b></span>" +
      "<span class=\"warn\">警告 <b>" + s.warnings + "</b></span>" +
      "<span class=\"clock\">" + clockStr(s) + extra + "</span>" +
      "<button type=\"button\" data-nav=\"rules\">守则</button>" +
      "<button type=\"button\" data-nav=\"title\">交班窗口</button>"
    );
  }

  function lookButtons(s, beat) {
    var html = "<div class=\"looks\">";
    html += "<button type=\"button\" data-look=\"waybill\">路单</button>";
    html += "<button type=\"button\" data-look=\"mirror\">后视镜</button>";
    if (s.night >= 3) html += "<button type=\"button\" data-look=\"out\">下车看</button>";
    html += "<button type=\"button\" data-look=\"rules\">守则</button>";
    html += "</div>";
    if (s.lookText) {
      html += "<p class=\"look-note\">" + esc(s.lookKind === "out" ? "车下　" : s.lookKind === "mirror" ? "后视镜　" : s.lookKind === "waybill" ? "路单　" : "") + esc(s.lookText) + "</p>";
    }
    return html;
  }

  function choicesHtml(beat, s) {
    var html = "<div class=\"choices\">";
    (beat.choices || []).forEach(function (c) {
      html += "<button type=\"button\" data-choice=\"" + esc(c.id) + "\">" + esc(c.label) + "</button>";
    });
    html += "</div>";
    var miss = missingLooks(s, beat);
    if (miss.length) {
      html += "<p class=\"look-note\">先看：" + esc(miss.map(lookName).join("、")) + "</p>";
    }
    return html;
  }

  function judgeHtml(s, beat) {
    var html = "<div class=\"src-row\">";
    ["fleet", "visor", "paper", "radio"].forEach(function (id) {
      var src = D.SOURCES[id];
      var on = s.selectedSource === id ? " on" : "";
      var locked = !sourceUnlocked(s, id);
      html += "<button type=\"button\" class=\"" + on + "\" data-src=\"" + id + "\"" + (locked ? " disabled" : "") + ">";
      html += esc(src.label) + (locked ? "（还没有）" : "");
      html += "</button>";
    });
    html += "</div><div class=\"choices\">";
    ACTIONS.forEach(function (a) {
      var on = s.selectedAction === a.id ? " on" : "";
      html += "<button type=\"button\" class=\"" + on + "\" data-act=\"" + a.id + "\">" + esc(a.label) + "</button>";
    });
    html += "<button type=\"button\" data-submit=\"1\">压这一单</button>";
    html += "</div>";
    var miss = missingLooks(s, beat);
    if (miss.length) {
      html += "<p class=\"look-note\">压单前先看：" + esc(miss.map(lookName).join("、")) + "</p>";
    }
    return html;
  }

  function rulesHtml(s) {
    var pack = D.rulePack(s.night);
    var html = "<h2>河西客运夜班驾驶员守则</h2>";
    html += "<p class=\"rule\">" + esc(pack.banner) + "</p>";
    pack.rules.forEach(function (r) {
      html += "<div class=\"rule ink-" + esc(r.ink || "normal") + " mark-" + esc(r.mark || "normal") + "\"><b>" + esc(r.num) + "</b>　" + esc(r.text);
      if (r.ink === "fresh") html += " <span class=\"mark\">墨是新的</span>";
      r.notes.forEach(function (n) {
        html += "<div class=\"mark\">" + (n.kind === "pencil" ? "铅笔：" : "") + esc(n.text) + "</div>";
      });
      html += "</div>";
    });
    pack.extra.forEach(function (e) {
      if (e.kind === "sticky") {
        html += "<div class=\"src-block src-sticky\"><b>折叠纸</b><p class=\"rule\">" + esc(e.text) + "</p></div>";
      }
      if (e.kind === "verso") {
        html += "<div class=\"src-block src-verso\"><b>" + esc(e.title) + "</b>";
        e.lines.forEach(function (ln) { html += "<p class=\"rule\">" + esc(ln) + "</p>"; });
        html += "</div>";
      }
    });
    if (sourceUnlocked(s, "visor")) {
      html += "<div class=\"src-block src-visor\"><b>遮阳板</b>";
      pack.visor.forEach(function (ln) { html += "<p class=\"rule\">" + esc(ln) + "</p>"; });
      html += "</div>";
    } else {
      html += "<div class=\"src-block src-visor\"><b>遮阳板</b><p class=\"rule\">还没掀开。</p></div>";
    }
    if (sourceUnlocked(s, "paper")) {
      html += "<div class=\"src-block src-paper\"><b>折叠纸全文</b>";
      pack.paper.forEach(function (ln) { html += "<p class=\"rule\">" + esc(ln) + "</p>"; });
      html += "</div>";
    }
    if (sourceUnlocked(s, "radio")) {
      html += "<div class=\"src-block src-radio\"><b>电台口令</b>";
      pack.radio.forEach(function (ln) { html += "<p class=\"rule\">" + esc(ln) + "</p>"; });
      html += "</div>";
    } else if (s.night >= 5) {
      html += "<div class=\"src-block src-radio-pending\"><b>电台</b><p class=\"rule\">有口令，还没记进页。</p></div>";
    }
    html += "<button type=\"button\" data-nav=\"close\">合上</button>";
    return html;
  }

  function shopHtml(s) {
    var html = "<h2>窗口</h2><p>份子已经扣过。油钱 " + s.cash + "。下一晚灯还开着。</p>";
    shopVisible(s).forEach(function (it) {
      html += "<div class=\"item\"><b>" + esc(it.name) + "</b>　" + it.cost + "<p>" + esc(it.text) + "</p>";
      html += "<button type=\"button\" data-buy=\"" + it.id + "\">买</button></div>";
    });
    html += "<button type=\"button\" data-buy=\"skip\">不买，交班</button>";
    return html;
  }

  function titleHtml() {
    var html = "<h1>空车夜班</h1>";
    html += "<p>河西客运 · YE-08 顶班</p>";
    html += "<p>子时前交份子和钥匙。守则不止一份。</p>";
    html += "<div class=\"boot\">";
    html += "<button type=\"button\" data-nav=\"start\">接班</button>";
    if (hasSave()) html += "<button type=\"button\" data-nav=\"continue\">接着上一次</button>";
    html += "<button type=\"button\" data-nav=\"reset\">清档重开</button>";
    html += "</div>";
    html += "<p class=\"fine\">虚构。溧河县河西客运无此建制。禁止对照现实车牌、路牌和车队手续。</p>";
    return html;
  }

  function endingHtml(s) {
    var pack = D.endingPack(s.ending || "dawn", s);
    var html = "<p class=\"tag\">交班</p><h1>" + esc(pack.title) + "</h1>";
    pack.body.forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
    pack.after.forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
    html += "<button type=\"button\" data-nav=\"reset\">清档重开</button>";
    html += "<button type=\"button\" data-nav=\"title\">回窗口</button>";
    return html;
  }

  function render() {
    if (!root.document) return;
    var s = state;
    var hud = el("hud");
    var bg = el("bg");
    var portrait = el("portrait");
    var panel = el("panel");
    var rules = el("rules");
    var shop = el("shop");
    var title = el("title");
    var ending = el("ending");
    if (hud) hud.innerHTML = hudHtml(s);

    setHidden(title, s.overlay !== "title");
    setHidden(ending, s.overlay !== "ending");
    setHidden(shop, s.overlay !== "shop");
    setHidden(rules, s.overlay !== "rules");
    setHidden(panel, s.overlay === "ending" || s.overlay === "title" || s.overlay === "shop");
    setHidden(hud, s.overlay === "ending");

    if (s.overlay === "title") {
      if (title) title.innerHTML = titleHtml();
      if (bg) bg.src = "img/dash.jpg";
      if (portrait) portrait.classList.add("hidden");
      if (panel) panel.innerHTML = "";
      return;
    }
    if (s.overlay === "ending") {
      if (ending) ending.innerHTML = endingHtml(s);
      var pack = D.endingPack(s.ending || "dawn", s);
      if (bg) bg.src = "img/" + (pack.img || "street.jpg");
      if (portrait) portrait.classList.add("hidden");
      if (panel) panel.innerHTML = "";
      return;
    }
    if (s.overlay === "shop") {
      if (shop) shop.innerHTML = shopHtml(s);
      if (bg) bg.src = "img/street.jpg";
      if (portrait) portrait.classList.add("hidden");
      if (panel) panel.innerHTML = "";
      return;
    }
    if (s.overlay === "rules") {
      if (rules) rules.innerHTML = rulesHtml(s);
    }

    var beat = currentBeat(s);
    if (!beat) return;
    var imgBg = "img/" + (s.lookImg || beat.bg || "dash.jpg");
    if (bg) bg.src = imgBg;
    if (portrait) {
      if (beat.img && s.lookKind !== "out" && s.lookKind !== "mirror") {
        portrait.src = "img/" + beat.img;
        portrait.classList.remove("hidden");
      } else {
        portrait.classList.add("hidden");
      }
    }
    var html = "";
    html += "<div class=\"tag\">" + esc(beat.tag || "") + "</div>";
    html += "<div class=\"name\">" + esc(beat.name || "") + "</div>";
    if (beat.fare) html += "<div class=\"fare\">" + esc(beat.fare) + "</div>";
    html += "<div class=\"body\">";
    beatBody(beat, s).forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
    html += "</div>";
    html += lookButtons(s, beat);
    if (beat.kind === "judge") html += judgeHtml(s, beat);
    else html += choicesHtml(beat, s);
    if (s.lastFb) html += "<div class=\"fb\" aria-live=\"polite\">" + esc(s.lastFb) + "</div>";
    if (panel) panel.innerHTML = html;
  }

  function onClick(e) {
    var t = e.target;
    if (!t || !t.getAttribute) return;
    var nav = t.getAttribute("data-nav");
    var choice = t.getAttribute("data-choice");
    var look = t.getAttribute("data-look");
    var src = t.getAttribute("data-src");
    var act = t.getAttribute("data-act");
    var submit = t.getAttribute("data-submit");
    var buyId = t.getAttribute("data-buy");

    if (nav === "start") {
      startNew();
      return;
    }
    if (nav === "continue") {
      continueSave();
      return;
    }
    if (nav === "reset") {
      resetAll();
      return;
    }
    if (nav === "title") {
      state.overlay = "title";
      save(state);
      render();
      return;
    }
    if (nav === "rules") {
      doLook(state, "rules");
      render();
      return;
    }
    if (nav === "close") {
      if (state.overlay === "rules") state.overlay = "";
      save(state);
      render();
      return;
    }
    if (choice) {
      var cr = doChoice(state, choice);
      if (!cr.ok && cr.missing) {
        state.lastFb = "先看：" + cr.missing.map(lookName).join("、");
      }
      render();
      return;
    }
    if (look) {
      var r = doLook(state, look);
      if (r && r.fb) state.lastFb = r.fb;
      render();
      return;
    }
    if (src) {
      state.selectedSource = src;
      render();
      return;
    }
    if (act) {
      state.selectedAction = act;
      render();
      return;
    }
    if (submit) {
      var v = doJudge(state, state.selectedAction, state.selectedSource);
      if (!v.ok && v.v && v.v.missing) {
        state.lastFb = "压单前先看：" + v.v.missing.map(lookName).join("、");
      } else if (!v.ok && v.v && v.v.needPick) {
        state.lastFb = "先选一份守则，再选载、拒载或送到门口停。";
      } else if (!v.ok && v.v && v.v.locked) {
        state.lastFb = "这份还没有。";
      }
      render();
      return;
    }
    if (buyId) {
      var b = buy(state, buyId);
      if (!b.ok && b.fb) state.lastFb = b.fb;
      render();
      return;
    }
  }

  function boot() {
    var app = el("app");
    if (app && !app._wired) {
      app.addEventListener("click", onClick);
      app._wired = true;
    }
    var loaded = load();
    if (loaded && loaded.ending) {
      state = loaded;
      state.overlay = "ending";
    } else if (loaded && loaded.night >= 1 && (loaded.beat > 0 || loaded.night > 1 || loaded.overlay === "shop")) {
      state = loaded;
      if (!state.overlay) state.overlay = "title";
    } else {
      state = empty();
      state.overlay = "title";
    }
    render();
  }

  root.__kb = {
    empty: empty,
    load: load,
    save: save,
    clearSave: clearSave,
    hasSave: hasSave,
    startNew: startNew,
    continueSave: continueSave,
    resetAll: resetAll,
    getState: function () { return state; },
    setState: function (s) { state = s; save(state); render(); },
    currentBeat: currentBeat,
    validateJudge: validateJudge,
    doLook: doLook,
    doChoice: doChoice,
    doJudge: doJudge,
    buy: buy,
    applyFx: applyFx,
    pickEnding: D.pickEnding,
    rulePack: D.rulePack,
    endNight: endNight,
    finish: finish,
    render: render,
    quotaOf: quotaOf,
    shopVisible: shopVisible,
    advance: advance,
    closeOverlay: function () {
      if (state.overlay === "rules") state.overlay = "";
      save(state);
      render();
    }
  };

  if (root.document) {
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
