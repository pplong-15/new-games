import fs from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const sandbox = { console };
sandbox.global = sandbox;
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(path.join(root, "js/data.js"), "utf8"), sandbox);
vm.runInContext(fs.readFileSync(path.join(root, "js/engine.js"), "utf8"), sandbox);

const D = sandbox.XIMIAN_DATA;
const E = sandbox.XIMIAN_ENGINE;
const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra == null ? "" : extra);
    fails.push(name);
  }
}

const pageIds = {};
D.PAGES.forEach((p) => { pageIds[p.id] = p; });
ok("player-tong", D.PLAYER === "桐晚禾");
ok("no-pei", D.PLAYER.indexOf("裴晚") === -1);
ok("authority", D.AUTHORITY === "recommend");

D.WORDS.forEach((w) => {
  ok("source-" + w.id, !!pageIds[w.source], w.source);
});

const missingGo = [];
D.PAGES.forEach((p) => {
  const re = /data-go="([^"]+)"/g;
  let m;
  while ((m = re.exec(p.html))) {
    if (!pageIds[m[1]]) missingGo.push(p.id + "->" + m[1]);
  }
});
ok("go-targets", missingGo.length === 0, missingGo.join(","));

ok("pick-hcz-boot", E.pick("w-hcz") === true);
ok("bag-hcz", E.state.bag.indexOf("w-hcz") !== -1);
ok("no-hss-yet", E.pick("w-hss") === false);

E.openRoute("att-hetong");
ok("pick-hss", E.pick("w-hss") === true);
ok("pick-anqi", E.pick("w-anqi") === true);
ok("pick-yuan", E.pick("w-yuandang") === true);
ok("pick-zps", E.pick("w-zps") === true);

const inc = E.submit();
ok("incomplete", inc.ok === false && inc.reason === "incomplete");
ok("incomplete-msg", E.state.lastMessage.indexOf("不成组") !== -1);
ok("no-verdict", E.state.lastVerdict == null);

E.fillSlot("who", "w-hcz");
E.fillSlot("whom", "w-zps");
E.fillSlot("did", "w-yuandang");
const near = E.submit();
ok("near-zps", near.ok === false && near.ending === "B");
ok("near-msg", E.state.lastMessage === "整句对不上。");
ok("near-no-slot-color", E.state.flash === false);

E.fillSlot("whom", null);
ok("pick-lqt", E.pick("w-lqt") === true);
ok("locked-block", E.fillSlot("who", "w-lqt") === false);
ok("locked-msg", E.state.lastMessage.indexOf("拖回袋") !== -1);

E.openRoute("att-weiji");
ok("pick-fuqin", E.pick("w-fuqin") === true);
E.fillSlot("whom", "w-zps");
E.fillSlot("whom", null);
E.fillSlot("whom", "w-hss");
E.fillSlot("did", "w-yuandang");
const good = E.submit();
ok("correct-A", good.ok === true && good.ending === "A" && good.wage === 36);
ok("wage", E.state.wage === 36);
ok("approve-after", E.tryApprove() === false);
ok("approve-msg", E.state.lastMessage.indexOf("批不了") !== -1);

E.replay();
ok("replay-clears", E.state.bag.length === 0 && E.state.flags.ending == null);
E.enter();
E.openRoute("ledger");
ok("ledger-yuan-without-hetong-page", E.canPick("w-yuandang") === true);
E.pick("w-hcz");
E.openRoute("att-hetong");
E.pick("w-hss");
E.pick("w-anqi");
E.openRoute("att-weiji");
E.pick("w-fuqin");
E.fillSlot("who", "w-hcz");
E.fillSlot("whom", "w-fuqin");
E.fillSlot("did", "w-anqi");
const alt = E.submit();
ok("fuqin-anqi-A", alt.ok === true && alt.ending === "A");

E.replay();
E.enter();
E.jumpClock(0);
ok("timeout-B", E.state.flags.timeout === true && E.state.flags.ending === "B" && E.state.wage === 0);

const ban = ["主线", "搜词", "关卡", "通关", "解锁", "线索", "结局", "源码", "本游戏", "隐藏页", "唯一解", "进度条", "裴晚"];
const blob = JSON.stringify(D) + fs.readFileSync(path.join(root, "index.html"), "utf8");
ban.forEach((w) => ok("ban-" + w, blob.indexOf(w) === -1));

if (fails.length) {
  console.log("FAILED", fails.length, fails.join(", "));
  process.exit(1);
}
console.log("SIM_OK", D.PAGES.length, "pages", D.WORDS.length, "words");
