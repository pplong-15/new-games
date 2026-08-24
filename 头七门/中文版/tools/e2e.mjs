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
    fails.push(name + (extra ? " " + extra : ""));
  }
}

async function text(page) {
  return page.evaluate(() => document.body.innerText);
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

async function click(sel) {
  await page.waitForSelector(sel, { timeout: 8000 });
  await page.click(sel);
}

async function disabled(sel) {
  return page.$eval(sel, (el) => el.disabled);
}

try {
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded", timeout: 60000 });
  let t = await text(page);
  ok("title-who", t.indexOf("沈晚闸") !== -1);
  ok("title-task", t.indexOf("钥匙") !== -1 && t.indexOf("有效班") !== -1);
  ok("title-lock", t.indexOf("今晚征兆只能管今晚") !== -1);
  ok("title-no-banned",
    t.indexOf("主线") === -1 && t.indexOf("关卡") === -1 && t.indexOf("通关") === -1 &&
    t.indexOf("解锁") === -1 && t.indexOf("线索") === -1 && t.indexOf("源码") === -1 &&
    t.indexOf("本游戏") === -1 && t.indexOf("唯一解") === -1 && t.indexOf("进度条") === -1);
  ok("title-doc-img", t.indexOf("进站") !== -1);

  await click("#btn-enter");
  t = await text(page);
  ok("boot-who", t.indexOf("沈晚闸") !== -1 && t.indexOf("门岗") !== -1);
  ok("boot-person", t.indexOf("吴成山") !== -1);
  ok("boot-job", t.indexOf("钥匙") !== -1 || t.indexOf("有效班") !== -1);
  ok("boot-doc", t.indexOf("对照流程页") !== -1 && t.indexOf("对照礼簿") !== -1);
  ok("boot-dims", t.indexOf("工钱格") !== -1 && t.indexOf("神智") !== -1 && t.indexOf("馆誉") !== -1 && t.indexOf("门缝") !== -1);
  ok("admit-disabled", await disabled("#btn-admit") === true);
  ok("deny-disabled", await disabled("#btn-deny") === true);
  ok("pencil-hidden", await page.$eval("#paper-pencil", (el) => el.style.display === "none"));
  ok("fang-hidden", await page.$eval("#paper-fang", (el) => el.style.display === "none"));

  const flow = await page.$eval("#btn-benqi", (el) => el.innerText);
  const pencilLater = await page.$eval("#paper-pencil", (el) => el.innerText);
  ok("mutex-not-same", flow.indexOf("只接本期") !== -1);

  await click("#btn-doc-flow");
  ok("grouped", await disabled("#btn-admit") === false);
  t = await text(page);
  ok("grouped-hint", t.indexOf("成组") !== -1);

  await click("#btn-admit");
  t = await text(page);
  ok("n1-admit", t.indexOf("成山") !== -1);
  ok("n1-empty-door", t.indexOf("门外无人") !== -1);

  await click("#btn-next");
  t = await text(page);
  ok("n2", t.indexOf("第2晚") !== -1 && t.indexOf("黄叔") !== -1);
  ok("pencil-shown", await page.$eval("#paper-pencil", (el) => el.style.display !== "none"));

  await click("#btn-doc-pencil");
  await click("#btn-doc-flow");
  t = await text(page);
  ok("true-mutex", t.indexOf("对着") !== -1 || t.indexOf("全放") !== -1 || t.indexOf("外人") !== -1, t.slice(0, 400));
  await click("#btn-deny");
  t = await text(page);
  ok("n2-deny-hs", t.indexOf("黄叔") !== -1);

  await click("#btn-next");
  t = await text(page);
  ok("n3", t.indexOf("第3晚") !== -1);
  ok("omen-need", t.indexOf("广播") !== -1);
  await click("#btn-omen");
  t = await text(page);
  ok("omen-n3", t.indexOf("礼簿") !== -1);
  ok("n3-empty-or-person", t.indexOf("门外无人") !== -1 || t.indexOf("门外") !== -1);
  if ((await page.$eval("#silhouette", (el) => el.textContent)).indexOf("无人") !== -1) {
    await click("#btn-next");
  } else {
    await click("#btn-doc-ledger");
    await click("#btn-deny");
    await click("#btn-next");
  }

  t = await text(page);
  ok("n4", t.indexOf("第4晚") !== -1 && t.indexOf("吴桂香") !== -1);
  ok("fang-shown", await page.$eval("#paper-fang", (el) => el.style.display !== "none"));
  const fangText = await page.$eval("#paper-fang", (el) => el.innerText);
  const flowText = await page.$eval(".paper", (el) => el.innerText);
  ok("fang-not-flow-copy", fangText.indexOf("出嫁女") !== -1 && flowText.indexOf("不接外人") !== -1 && fangText.indexOf("不接外人") === -1);

  await click("#btn-omen");
  await click("#btn-doc-fang");
  await click("#btn-admit");
  t = await text(page);
  ok("n4-admit-wgx", t.indexOf("桂香") !== -1);

  await click("#btn-next");
  t = await text(page);
  ok("n5", t.indexOf("第5晚") !== -1 && t.indexOf("外人") !== -1);
  await click("#btn-omen");
  await click("#btn-doc-flow");
  await click("#btn-deny");

  await click("#btn-next");
  t = await text(page);
  ok("n6", t.indexOf("第6晚") !== -1);
  ok("n6-no-wrong-revisit", t.indexOf("门外无人") !== -1, t.slice(0, 300));
  await click("#btn-next");

  t = await text(page);
  ok("n7", t.indexOf("第7晚") !== -1);
  const sil = await page.$eval("#silhouette", (el) => el.textContent);
  if (sil.indexOf("外人") !== -1) {
    await click("#btn-omen");
    await click("#btn-doc-flow");
    await click("#btn-deny");
  }
  await click("#btn-key");
  t = await text(page);
  ok("benqi", t.indexOf("本期") !== -1 && t.indexOf("¥36") !== -1, t.slice(-400));
  ok("benqi-reason", t.indexOf("放进了") !== -1 || t.indexOf("成山") !== -1, t.slice(-400));

  // 未齐交钥匙
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
  await click("#btn-doc-flow");
  await click("#btn-admit");
  await click("#btn-key");
  t = await text(page);
  ok("partial-key", t.indexOf("未齐") !== -1 && t.indexOf("有效班") !== -1, t.slice(-300));
  ok("partial-not-benqi", t.indexOf("¥36") === -1);

  // ghost 打回
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
  await click("#refuse-obit");
  t = await text(page);
  ok("ghost-obit", t.indexOf("不改") !== -1 || t.indexOf("只读") !== -1, t.slice(-200));
  await click("#refuse-wcs");
  t = await text(page);
  ok("ghost-print-wcs", t.indexOf("手印") !== -1, t.slice(-200));
  await click("#refuse-wgx");
  t = await text(page);
  ok("ghost-print-wgx", t.indexOf("手印") !== -1 && t.indexOf("吴桂香") !== -1, t.slice(-200));

  // 回访：放进黄叔
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
  await click("#btn-doc-flow");
  await click("#btn-admit"); // wcs
  await click("#btn-next");
  await click("#btn-doc-pencil");
  await click("#btn-admit"); // hs
  t = await text(page);
  ok("mind-drop", t.indexOf("神智") !== -1);
  const mind = await page.$eval("#dim-mind", (el) => el.textContent);
  ok("mind-value", mind === "3", mind);
  await click("#btn-next"); // 3
  if ((await page.$eval("#silhouette", (el) => el.textContent)).indexOf("无人") !== -1) await click("#btn-next");
  else {
    await click("#btn-omen");
    await click("#btn-doc-flow");
    await click("#btn-deny");
    await click("#btn-next");
  }
  // 4 桂香 deny → also revisit
  await click("#btn-omen");
  await click("#btn-doc-fang");
  await click("#btn-deny");
  await click("#btn-next"); // 5
  await click("#btn-omen");
  await click("#btn-doc-flow");
  await click("#btn-deny");
  await click("#btn-next"); // 6
  t = await text(page);
  ok("revisit", t.indexOf("第6晚") !== -1 && (t.indexOf("黄叔") !== -1 || t.indexOf("吴桂香") !== -1), t.slice(0, 500));

  // 刷新续班
  const nightBefore = await page.$eval("#night-mark", (el) => el.textContent);
  await page.reload({ waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("refresh-restore", t.indexOf("第6晚") !== -1 && t.indexOf("进站") === -1, t.slice(0, 200) + " / " + nightBefore);

  // 来不及
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state"); } catch (e) {} });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
  await page.evaluate(() => window.__TOUQI__.setEnergy(0));
  t = await text(page);
  ok("late", t.indexOf("来不及") !== -1 || t.indexOf("没交钥匙") !== -1, t.slice(-200));

  // 窄屏按钮高度
  await page.evaluate(() => { try { localStorage.removeItem("touqi-state"); } catch (e) {} });
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await click("#btn-enter");
  const heights = await page.evaluate(() => {
    const ids = ["btn-admit", "btn-deny", "btn-key", "btn-doc-flow", "btn-next", "refuse-obit"];
    const out = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      out[id] = el ? Math.round(el.getBoundingClientRect().height) : 0;
    });
    return out;
  });
  ok("btn-admit-h", heights["btn-admit"] >= 44, JSON.stringify(heights));
  ok("btn-key-h", heights["btn-key"] >= 44, JSON.stringify(heights));
  ok("btn-flow-h", heights["btn-doc-flow"] >= 44, JSON.stringify(heights));
  ok("btn-ghost-h", heights["refuse-obit"] >= 44, JSON.stringify(heights));
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2);
  ok("narrow-no-xscroll", scroll);

  ok("no-pageerror", errors.length === 0, errors.join(" | "));
} catch (e) {
  console.log("THROW", e && e.stack ? e.stack : e);
  fails.push("throw");
} finally {
  await browser.close();
}

if (fails.length) {
  console.log("E2E_FAIL", fails.length, fails.join(" ;; "));
  process.exit(1);
}
console.log("E2E_OK");
