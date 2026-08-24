import fs from "fs";
import vm from "vm";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");
const ctx = { console, global: null };
ctx.global = ctx;
ctx.window = undefined;
vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, "js/data.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(root, "js/engine.js"), "utf8"), ctx);
const E = ctx.TOUQI_ENGINE;
const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra || "");
    fails.push(name);
  }
}

function reset() {
  E.replay();
  E.enter();
}

function groupAnd(fn) {
  if (E.state.night >= 3) E.readOmen();
  if (E.state.night >= 4) E.checkDoc("fang");
  else if (E.state.night >= 2) E.checkDoc("pencil");
  else E.checkDoc("flow");
  return fn();
}

function drainNight(admitIds) {
  while (E.state.current && !E.state.ending) {
    const id = E.state.current;
    groupAnd(() => (admitIds.indexOf(id) >= 0 ? E.admit() : E.deny()));
  }
}

function walk(admitIds, hand) {
  reset();
  for (let n = 1; n <= 7 && !E.state.ending; n++) {
    drainNight(admitIds);
    if (E.state.night < 7 && !E.state.current) E.nextNight();
  }
  if (hand && !E.state.ending) E.handKey();
  return { ending: E.state.ending, wage: E.state.wage, st: E.snapshot() };
}

let r = walk(["wcs", "wgx"], true);
ok("benqi", r.ending === "benqi" && r.wage === 36, r.ending + " " + r.wage);
ok("benqi-dims", r.st.dims.wage >= 4 && r.st.dims.mind === 4, JSON.stringify(r.st.dims));

r = walk(["wcs"], true);
ok("deny-woman", r.ending === "deny-woman", r.ending);

r = walk(["wcs", "extra"], true);
ok("idle", r.ending === "idle", r.ending);

r = walk(["wcs", "wgx", "hs"], true);
ok("admit-all", r.ending === "admit-all", r.ending);

r = walk([], true);
ok("deny-all", r.ending === "deny-all", r.ending);

reset();
E.checkDoc("flow");
E.admit();
E.handKey();
ok("partial-early", E.state.ending === "partial" && E.state.wage === 0, E.state.ending + " " + E.state.wage);

reset();
E.setEnergy(0);
ok("late", E.state.ending === "late" && E.state.wage === 0, E.state.ending);

reset();
E.checkDoc("flow");
E.admit(); // wcs
E.nextNight();
ok("n2-pencil-closed-before", E.state.night === 2);
E.checkDoc("pencil");
ok("n2-pencil", E.state.openDoc === "pencil");
E.checkDoc("flow");
ok("mutex-msg", String(E.state.lastMessage).indexOf("outsiders") !== -1, E.state.lastMessage);
E.admit(); // hs admitted → revisit
ok("hs-mind", E.state.dims.mind === 3, JSON.stringify(E.state.dims));
E.nextNight(); // 3
drainNight(["hs"]);
E.nextNight(); // 4
drainNight([]);
E.nextNight(); // 5
drainNight([]);
E.nextNight(); // 6
ok("revisit-hs", E.state.current === "hs" || (E.state.queue && E.state.queue.indexOf("hs") >= 0), "cur=" + E.state.current + " q=" + JSON.stringify(E.state.queue));

reset();
ok("ghost-obit", E.refuseObit() === false);
ok("ghost-obit-msg", E.state.lastMessage.indexOf("not rewritten") !== -1 || E.state.lastMessage.indexOf("Read only") !== -1, E.state.lastMessage);
ok("ghost-print", E.refusePrint("Wu Chengshan") === false);
ok("ghost-print-msg", E.state.lastMessage.indexOf("stamp") !== -1, E.state.lastMessage);

reset();
E.checkDoc("fang");
ok("fang-n1-closed", E.state.lastMessage.indexOf("no paper") !== -1, E.state.lastMessage);

reset();
E.setEnergy(10);
for (let i = 0; i < 4; i++) E.slit();
ok("slit-empty", E.state.dims.slit === 0, JSON.stringify(E.state.dims));
const slitFail = E.slit();
ok("slit-block", slitFail === false && E.state.lastMessage.indexOf("Can't see") !== -1, E.state.lastMessage);

reset();
E.pickCrack();
ok("crack-wage", E.state.dims.wage === 5, JSON.stringify(E.state.dims));

ok("no-benqi-without-key", walk(["wcs", "wgx"], false).ending !== "benqi");

if (fails.length) {
  console.log("FAILED", fails.length, fails.join(", "));
  process.exit(1);
}
console.log("SIM_OK", 0);
