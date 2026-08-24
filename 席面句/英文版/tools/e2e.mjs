import puppeteer from "puppeteer-core";

const BASE = process.env.BASE || "http://127.0.0.1:8794";
const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

const fails = [];
function ok(name, cond, extra) {
  if (cond) console.log("PASS", name);
  else {
    console.log("FAIL", name, extra || "");
    fails.push(name + (extra ? " " + extra : ""));
  }
}

const errors = [];
const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"]
});
const page = await browser.newPage();
page.on("pageerror", (e) => errors.push(String(e)));
await page.setViewport({ width: 1280, height: 800 });

async function text() {
  return page.evaluate(() => document.body.innerText);
}
async function click(sel) {
  await page.waitForSelector(sel, { timeout: 8000 });
  await page.click(sel);
}

try {
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => localStorage.removeItem("ximian-state-en"));
  await page.reload({ waitUntil: "domcontentloaded" });

  let t = await text();
  ok("title-who", t.indexOf("Tong Wanhe") !== -1);
  ok("title-no-pei", t.indexOf("Pei Wan") === -1);
  ok("title-lock", t.indexOf("this one sentence") !== -1 && t.indexOf("recommend") !== -1);
  ok("title-ban",
    t.indexOf("main quest") === -1 && t.indexOf("level") === -1 && t.indexOf("walkthrough") === -1 &&
    t.indexOf("unlock") === -1 && t.indexOf("clue") === -1 && t.indexOf("source code") === -1 &&
    t.indexOf("this game") === -1 && t.indexOf("unique solution") === -1 && t.indexOf("progress bar") === -1 &&
    t.indexOf("hidden page") === -1);
  ok("favicon", await page.$eval("link[rel='icon']", (el) => !!el.href));

  await click("#btn-enter");
  t = await text();
  ok("boot-who", t.indexOf("Tong Wanhe") !== -1 && t.indexOf("Tongxi Danglin 08") !== -1);
  ok("boot-banner", t.indexOf("Han Chengzhi") !== -1 && t.indexOf("Lin Qiutang") !== -1);
  ok("boot-slots", t.indexOf("Who") !== -1 && t.indexOf("To whom") !== -1 && t.indexOf("Does what") !== -1);
  ok("boot-submit", t.indexOf("Incomplete") !== -1);
  ok("boot-approve", t.indexOf("Approve the banquet") !== -1);

  const submitH = await page.$eval("#btn-submit", (el) => el.getBoundingClientRect().height);
  ok("submit-44", submitH >= 44, String(submitH));

  await page.click("#desk-hits [data-word='w-hcz']");
  t = await text();
  ok("pick-hcz", t.indexOf("Han Chengzhi") !== -1);

  await click("#btn-submit");
  t = await text();
  ok("incomplete", t.indexOf("Incomplete. No judge") !== -1);

  await click("[data-go='att-hetong']");
  t = await text();
  ok("hetong", t.indexOf("Han Shoushan") !== -1 && t.indexOf("Zhao Pusheng") !== -1);
  await page.click("[data-word='w-hss']");
  await page.click("[data-word='w-yuandang']");
  await page.click("[data-word='w-zps']");

  await page.evaluate(() => {
    const X = window.__XIMIAN__;
    X.fillSlot("who", "w-hcz");
    X.fillSlot("whom", "w-zps");
    X.fillSlot("did", "w-yuandang");
  });
  await click("#btn-submit");
  t = await text();
  ok("near-reject", t.indexOf("does not match") !== -1);
  ok("near-no-which", t.indexOf("who is wrong") === -1 && t.indexOf("to whom is wrong") === -1 && t.indexOf("this slot") === -1);

  await click("#btn-approve");
  t = await text();
  ok("approve-bounce", t.indexOf("Cannot approve") !== -1 || t.indexOf("Authority stops at recommend") !== -1);

  await page.evaluate(() => {
    const X = window.__XIMIAN__;
    X.fillSlot("whom", null);
    X.fillSlot("whom", "w-hss");
    X.fillSlot("did", "w-yuandang");
  });
  await click("#btn-submit");
  t = await text();
  ok("correct-receipt", t.indexOf("recommend field") !== -1 || t.indexOf("Sent") !== -1);
  ok("wage-36", t.indexOf("¥36") !== -1);
  ok("no-sign", t.indexOf("not in the signature field") !== -1 || t.indexOf("Cannot approve") !== -1);

  const foot = await page.$eval("#page-foot", (el) => el.textContent);
  ok("foot-num", /\d+\/36/.test(foot), foot);

  await page.reload({ waitUntil: "domcontentloaded" });
  t = await text();
  ok("refresh-keeps", t.indexOf("¥36") !== -1 && t.indexOf("Clock in") === -1);

  await click("#replay");
  await page.evaluate(() => {
    const X = window.__XIMIAN__;
    X.openRoute("att-weiji");
    X.pick("w-hcz");
    X.openRoute("att-hetong");
    X.pick("w-fuqin");
    X.pick("w-anqi");
    X.fillSlot("who", "w-hcz");
    X.fillSlot("whom", "w-fuqin");
    X.fillSlot("did", "w-anqi");
    X.submit();
  });
  t = await text();
  ok("alt-fuqin", t.indexOf("¥36") !== -1);

  await click("#replay");
  await page.evaluate(() => window.__XIMIAN__.jumpClock(0));
  t = await text();
  ok("timeout", t.indexOf("Deposit returned") !== -1 && t.indexOf("¥0") !== -1);

  await page.setViewport({ width: 375, height: 812 });
  await click("#replay");
  const heights = await page.evaluate(() => {
    const ids = ["btn-submit", "btn-approve", "replay"];
    const o = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      o[id] = el ? el.getBoundingClientRect().height : 0;
    });
    o.scroll = document.documentElement.scrollWidth;
    return o;
  });
  ok("narrow-submit", heights["btn-submit"] >= 44, JSON.stringify(heights));
  ok("narrow-approve", heights["btn-approve"] >= 44);
  ok("narrow-replay", heights.replay >= 44);
  ok("narrow-no-huge-x", heights.scroll <= 400, String(heights.scroll));

  ok("no-pageerror", errors.length === 0, errors.join(" | "));
} catch (e) {
  ok("e2e-throw", false, String(e && e.stack ? e.stack : e));
}

await browser.close();
if (fails.length) {
  console.log("FAILED", fails.length);
  fails.forEach((f) => console.log(" -", f));
  process.exit(1);
}
console.log("E2E_OK");
