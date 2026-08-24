import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dir, "..");
const ctx = {
  console,
  global: null,
  setTimeout,
  clearTimeout,
  setInterval,
  clearInterval
};
ctx.global = ctx;
vm.runInNewContext(fs.readFileSync(path.join(root, "js/data.js"), "utf8"), ctx);
vm.runInNewContext(fs.readFileSync(path.join(root, "js/engine.js"), "utf8"), ctx);

const E = ctx.TIDU_ENGINE;
const D = ctx.TIDU_DATA;
const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra || "");
    fails.push(name);
  }
}

function fillAll(spec) {
  const slots = ["slot-before-shu", "slot-absent", "slot-shu"];
  for (const s of slots) {
    E.selectSlot(s, true);
    E.fillName(spec[s].nameId);
    E.selectSlot(s, true);
    E.fillFate(spec[s].fateId);
  }
}

E.replay();
ok("truth-three-names", D.TRUTH["slot-before-shu"].nameId !== D.TRUTH["slot-shu"].nameId);
ok("clock-playable", D.CLOCK_MAX >= 480, D.CLOCK_MAX);
ok("hold-ms", D.HOLD_MS === 1500);

fillAll({
  "slot-before-shu": { nameId: "zhou-ahai", fateId: "fate-left-unreturned" },
  "slot-absent": { nameId: "zhou-ahai", fateId: "fate-left-unreturned" },
  "slot-shu": { nameId: "zhou-ahai", fateId: "fate-left-unreturned" }
});
ok("near1-not-group", E.isGroupCorrect() === false);
E.holdComplete();
let st = E.getState();
ok("near1-white", st.locked === false && st.endingId === null);
ok("near1-no-wage", st.wage === 0);
ok("near1-flag", st.flags["flag-merged-submit"] === true);
ok("near1-sms", String(st.sms).indexOf("白的") !== -1);
ok("near1-no-red", E.rowsMark() === false);

E.replay();
fillAll({
  "slot-before-shu": { nameId: "zhou-shigen", fateId: "fate-left-unreturned" },
  "slot-absent": { nameId: "zhou-ahai", fateId: "fate-unreleased" },
  "slot-shu": { nameId: "paper-shu", fateId: "fate-filed-paper" }
});
E.holdComplete();
st = E.getState();
ok("near2-white", st.locked === false && st.flags["flag-near-shigen-front"] === true);

E.replay();
fillAll({
  "slot-before-shu": { nameId: "zhou-ahai", fateId: "fate-unreleased" },
  "slot-absent": { nameId: "zhou-shigen", fateId: "fate-left-unreturned" },
  "slot-shu": { nameId: "zhou-ahai", fateId: "fate-filed-paper" }
});
E.holdComplete();
st = E.getState();
ok("near3-white", st.locked === false && st.flags["flag-near-shu-is-ahai"] === true);

E.replay();
E.openDoc("doc-hukou");
E.openDoc("doc-dudie");
E.openDoc("doc-dudie-fuye");
E.openDoc("doc-shu");
st = E.getState();
ok("docs-flags", st.flags["flag-year-mismatch"] && st.flags["flag-read-three-docs"]);
ok("docs-no-autofill", st.rows["slot-before-shu"].nameId === null);

E.selectSlot("slot-before-shu");
E.fillName("zhou-ahai");
E.fillName("");
st = E.getState();
ok("clear-name", st.rows["slot-before-shu"].nameId === null);

fillAll(D.TRUTH);
ok("truth-group", E.isGroupCorrect() === true);
E.holdComplete();
st = E.getState();
ok("lock-A", st.locked === true && st.endingId === "A" && st.wage === 36);
const copyA = E.endingCopy(st).join("");
ok("copy-A-flags", copyA.indexOf("同一个人") !== -1 || copyA.indexOf("三十六") !== -1);
ok("copy-A-no-unlock", copyA.indexOf("批准") === -1);

E.replay();
E.jumpClock();
st = E.getState();
ok("timeout-B", st.endingId === "B" && st.endingVariant === "timeout" && st.wage === 0);
const copyB = E.endingCopy(st).join("");
ok("copy-B-timeout", copyB.indexOf("截点") !== -1);

ok("no-approve-keys", !D.NAMES.some((n) => /超度|解除|批准/.test(n.label)));

if (fails.length) {
  console.log("SIM FAILS", fails.length);
  process.exit(1);
}
console.log("SIM OK");
