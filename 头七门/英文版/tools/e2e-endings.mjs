import puppeteer from "puppeteer-core";

const BASE = process.env.BASE || "http://127.0.0.1:8793";
const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra || "");
    fails.push(name);
  }
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"]
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));
await page.setViewport({ width: 1280, height: 800 });

async function click(sel) {
  await page.waitForSelector(sel, { timeout: 8000 });
  await page.click(sel);
}
async function T() { return page.evaluate(() => document.body.innerText); }
async function sil() { return page.$eval("#silhouette", (el) => el.textContent); }
async function fresh() {
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state-en"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
}
async function group() {
  const n = await page.$eval("#night-mark", (el) => el.textContent);
  if (/第[3-7]晚/.test(n)) await click("#btn-omen");
  const night = parseInt(n.replace(/[^0-9]/g, ""), 10);
  if (night >= 4) await click("#btn-doc-fang");
  else if (night >= 2) await click("#btn-doc-pencil");
  else await click("#btn-doc-flow");
}
async function decide(admit) {
  await group();
  await click(admit ? "#btn-admit" : "#btn-deny");
}
async function drain(admitName) {
  for (let i = 0; i < 4; i++) {
    const s = await sil();
    if (s.indexOf("无人") !== -1) return;
    const who = s;
    const admit = admitName.some((n) => who.indexOf(n) !== -1);
    await decide(admit);
  }
}
async function toEnd(admitName) {
  await fresh();
  for (let n = 1; n <= 7; n++) {
    const ended = await page.$eval("#ending-layer", (el) => el.classList.contains("show"));
    if (ended) break;
    await drain(admitName);
    const night = await page.$eval("#night-mark", (el) => el.textContent);
    const ended2 = await page.$eval("#ending-layer", (el) => el.classList.contains("show"));
    if (ended2) break;
    if (night.indexOf("7") === -1) {
      const s = await sil();
      if (s.indexOf("无人") !== -1) {
        const vis = await page.$eval("#btn-next", (el) => el.style.display !== "none" && !el.disabled);
        if (vis) await click("#btn-next");
      }
    }
  }
  const ended = await page.$eval("#ending-layer", (el) => el.classList.contains("show"));
  if (!ended) await click("#btn-key");
  return T();
}

try {
  let t = await toEnd(["吴成山", "吴桂香"]);
  ok("end-benqi", t.indexOf("本期") !== -1 && t.indexOf("有效班") !== -1, t.slice(-180));

  t = await toEnd(["吴成山"]);
  ok("end-deny-woman", t.indexOf("拒女") !== -1 || t.indexOf("出嫁") !== -1, t.slice(-180));

  t = await toEnd(["吴成山", "黄叔"]);
  ok("end-idle", t.indexOf("放闲") !== -1 || t.indexOf("帮忙") !== -1, t.slice(-180));

  t = await toEnd([]);
  ok("end-deny-all", t.indexOf("全拒") !== -1 || t.indexOf("墙") !== -1, t.slice(-180));

  t = await toEnd(["吴成山", "吴桂香", "黄叔"]);
  ok("end-admit-all", t.indexOf("全放") !== -1 || t.indexOf("到的都进") !== -1, t.slice(-180));

  await page.evaluate(() => { try { localStorage.removeItem("touqi-state-en"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await page.focus("#btn-enter");
  await page.keyboard.press("Enter");
  t = await T();
  ok("keyboard-enter", t.indexOf("吴成山") !== -1 && t.indexOf("进站") === -1, t.slice(0, 150));

  ok("no-pageerror", errors.length === 0, errors.join(" | "));
} catch (e) {
  console.log("THROW", e && e.stack ? e.stack : e);
  fails.push("throw");
} finally {
  await browser.close();
}
if (fails.length) {
  console.log("END_FAIL", fails.join(", "));
  process.exit(1);
}
console.log("END_OK");
