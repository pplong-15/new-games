import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const store = {};
const localStorage = {
  getItem: (k) => (Object.prototype.hasOwnProperty.call(store, k) ? store[k] : null),
  setItem: (k, v) => {
    store[k] = String(v);
  },
  removeItem: (k) => {
    delete store[k];
  }
};
const ctx = {
  localStorage,
  console,
  window: null,
  document: null,
  globalThis: null
};
ctx.window = ctx;
ctx.globalThis = ctx;
vm.runInNewContext(fs.readFileSync(path.join(dir, "js/data.js"), "utf8"), ctx);
vm.runInNewContext(fs.readFileSync(path.join(dir, "js/game.js"), "utf8"), ctx);
const kb = ctx.__kb;
const D = ctx.KB_DATA;

const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra == null ? "" : extra);
    fails.push(name);
  }
}

function beat() {
  return kb.currentBeat(kb.getState());
}

function choose(id) {
  const b = beat();
  if (b && b.needLooks) {
    b.needLooks.forEach((k) => {
      if (!kb.getState().looks[b.id] || kb.getState().looks[b.id].indexOf(k) < 0) look(k);
    });
  }
  const r = kb.doChoice(kb.getState(), id);
  if (!r || !r.ok) throw new Error("choice fail " + id + " at " + (beat() && beat().id));
}

function look(kind) {
  const r = kb.doLook(kb.getState(), kind);
  if (!r || !r.ok) throw new Error("look fail " + kind + " at " + (beat() && beat().id));
}

function judge(action, source) {
  const b = beat();
  if (b && b.needLooks) {
    b.needLooks.forEach((k) => {
      if (!kb.getState().looks[b.id] || kb.getState().looks[b.id].indexOf(k) < 0) look(k);
    });
  }
  const r = kb.doJudge(kb.getState(), action, source);
  if (!r || !r.ok) throw new Error("judge fail " + action + "/" + source + " " + JSON.stringify(r && r.v));
}

function shopSkip() {
  const s = kb.getState();
  if (s.overlay !== "shop") throw new Error("not shop " + s.overlay + " night " + s.night + " beat " + (beat() && beat().id));
  kb.buy(s, "skip");
}

function shopBuy(id) {
  const r = kb.buy(kb.getState(), id);
  if (!r.ok) throw new Error("buy fail " + id);
  kb.buy(kb.getState(), "skip");
}

function closeRules() {
  kb.closeOverlay();
}

function playDawn() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-open");
  closeRules();
  choose("n1-go");
  look("mirror");
  choose("n1-pei-take");
  choose("n1-helm");
  look("mirror");
  choose("n1-pair-take");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-take");
  judge("refuse", "visor");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("refuse", "visor");
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("refuse", "fleet");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("refuse", "fleet");
  choose("n5-shop");
  shopSkip();
  choose("n6-see");
  choose("n6-geng-ask");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  choose("n7-keep-pencil");
  choose("n7-pei-take");
  choose("n7-sms-go");
  choose("n7-window");
  return kb.getState();
}

function playFerry() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-go");
  look("mirror");
  choose("n1-pei-take");
  choose("n1-helm");
  choose("n1-pair-take");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-take");
  judge("refuse", "visor");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("refuse", "visor");
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("doorstop", "paper");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("refuse", "visor");
  choose("n5-shop");
  shopSkip();
  choose("n6-skip");
  choose("n6-geng-ask");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  choose("n7-keep-pencil");
  choose("n7-pei-take");
  choose("n7-sms-go");
  choose("n7-door");
  return kb.getState();
}

function playJoss() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-go");
  choose("n1-pei-take");
  choose("n1-helm");
  choose("n1-pair-take");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-take");
  judge("refuse", "visor");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("take", "fleet");
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("refuse", "fleet");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("refuse", "fleet");
  choose("n5-shop");
  shopSkip();
  choose("n6-skip");
  choose("n6-geng-ask");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  choose("n7-keep-radio");
  choose("n7-pei-take");
  choose("n7-sms-go");
  choose("n7-window");
  return kb.getState();
}

function playMirror() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-go");
  choose("n1-pei-take");
  choose("n1-helm");
  choose("n1-pair-take");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-take");
  judge("refuse", "visor");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("refuse", "visor");
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("refuse", "fleet");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("refuse", "fleet");
  choose("n5-shop");
  shopSkip();
  choose("n6-skip");
  choose("n6-geng-ask");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  choose("n7-keep-blank");
  choose("n7-pei-take");
  choose("n7-sms-go");
  choose("n7-mirror");
  return kb.getState();
}

function playFired() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-go");
  choose("n1-pei-take");
  choose("n1-helm");
  choose("n1-pair-take");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-take");
  judge("refuse", "visor");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("refuse", "visor");
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("refuse", "fleet");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("refuse", "fleet");
  choose("n5-shop");
  shopSkip();
  choose("n6-skip");
  choose("n6-geng-ask");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  choose("n7-keep-blank");
  choose("n7-pei-take");
  choose("n7-sms-go");
  choose("n7-lamp");
  return kb.getState();
}

function playVoid() {
  Object.keys(store).forEach((k) => delete store[k]);
  kb.startNew();
  choose("n1-go");
  choose("n1-pei-refuse");
  choose("n1-helm-no");
  choose("n1-pair-refuse");
  choose("n1-shop");
  shopSkip();
  choose("n2-read");
  choose("n2-jiang-refuse");
  judge("take", "fleet");
  choose("n2-shop");
  shopSkip();
  choose("n3-seeink");
  closeRules();
  judge("take", "fleet");
  for (var i = 0; i < 12; i++) {
    look("mirror");
    if (kb.getState().ending || kb.getState().sanity <= 0) return kb.getState();
  }
  choose("n3-pei-take");
  choose("n3-shop");
  shopSkip();
  choose("n4-readp");
  look("mirror");
  judge("take", "fleet");
  choose("n4-kan-ok");
  choose("n4-shop");
  shopSkip();
  choose("n5-hear");
  choose("n5-duan-ok");
  judge("take", "radio");
  choose("n5-shop");
  shopSkip();
  choose("n6-see");
  choose("n6-geng-go");
  choose("n6-jiang-take");
  choose("n6-shop");
  shopSkip();
  const s = kb.getState();
  if (s.ending === "void" || s.sanity <= 0) return s;
  choose("n7-keep-radio");
  if (kb.getState().ending) return kb.getState();
  choose("n7-pei-take");
  if (kb.getState().ending) return kb.getState();
  choose("n7-sms-go");
  if (kb.getState().ending) return kb.getState();
  choose("n7-river");
  return kb.getState();
}

ok("data-nights", [1, 2, 3, 4, 5, 6, 7].every((n) => D.NIGHTS[n] && D.NIGHTS[n].beats.length >= 3));
ok("rule-n1-no-fresh", D.rulePack(1).rules[1].ink !== "fresh");
ok("rule-n3-fresh", D.rulePack(3).rules[1].ink === "fresh");
ok("rule-n5-taint", D.rulePack(5).rules[4].mark === "tainted");
ok("pick-void", D.pickEnding({ sanity: 0, flags: {} }) === "void");
ok("pick-fired", D.pickEnding({ sanity: 40, flags: { lampOff: true } }) === "fired");
ok("pick-joss", D.pickEnding({ sanity: 40, flags: { tookWet: true } }) === "joss");
ok("pick-joss-return", D.pickEnding({ sanity: 40, flags: { tookWet: true, returnedWet: true } }) === "dawn");
ok("pick-mirror", D.pickEnding({ sanity: 40, flags: { gaveToMirror: true } }) === "mirror");
ok("pick-ferry", D.pickEnding({ sanity: 40, flags: { doorstopLiu: true } }) === "ferry");
ok("pick-dawn", D.pickEnding({ sanity: 40, flags: { refusedWet: true, keysToGeng: true } }) === "dawn");

let s = playDawn();
ok("path-dawn", s.ending === "dawn", s.ending + " sanity " + s.sanity + " cash " + s.cash);
ok("dawn-refused-wet", !!s.flags.refusedWet);
ok("dawn-no-river", !s.flags.wentRiver);

s = playFerry();
ok("path-ferry", s.ending === "ferry", s.ending + " " + JSON.stringify(s.flags));

s = playJoss();
ok("path-joss", s.ending === "joss", s.ending + " took " + s.flags.tookWet + " ret " + s.flags.returnedWet);

s = playMirror();
ok("path-mirror", s.ending === "mirror", s.ending);

s = playFired();
ok("path-fired", s.ending === "fired", s.ending);

s = playVoid();
ok("path-void", s.ending === "void" || s.sanity <= 0, "ending=" + s.ending + " sanity=" + s.sanity);

Object.keys(store).forEach((k) => delete store[k]);
kb.startNew();
choose("n1-go");
const raw = localStorage.getItem(D.saveKey);
ok("save-writes", !!raw);
const loaded = JSON.parse(raw);
ok("save-schema", loaded.schema === 1 && loaded.night === 1);
kb.resetAll();
ok("reset-clears", !localStorage.getItem(D.saveKey));

kb.startNew();
choose("n1-go");
const peiBlocked = kb.doChoice(kb.getState(), "n1-pei-take");
ok(
  "choice-need-looks",
  peiBlocked && peiBlocked.ok === false && peiBlocked.missing && peiBlocked.missing.indexOf("mirror") >= 0
);
choose("n1-pei-take");
const blocked = kb.validateJudge(
  kb.getState(),
  { id: "x", needLooks: ["mirror", "out"], correct: { action: "refuse", source: "visor" } },
  "refuse",
  "visor"
);
kb.startNew();
choose("n1-go");
choose("n1-pei-take");
choose("n1-helm");
choose("n1-pair-take");
choose("n1-shop");
const sanBefore = kb.getState().sanity;
kb.buy(kb.getState(), "incense");
kb.buy(kb.getState(), "skip");
choose("n2-read");
choose("n2-jiang-take");
judge("refuse", "visor");
choose("n2-shop");
ok("incense-rest", kb.getState().sanity >= sanBefore - 2, "san " + kb.getState().sanity + " vs " + sanBefore);

ok("judge-need-looks", blocked.blocked && blocked.missing.indexOf("mirror") >= 0);

if (fails.length) {
  console.log("SIM_FAIL", fails.length, fails.join(", "));
  process.exit(1);
}
console.log("ALL_SIM_PASS");
