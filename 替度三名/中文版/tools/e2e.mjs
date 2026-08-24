import puppeteer from "puppeteer-core";

const BASE = process.env.BASE || "http://127.0.0.1:8792";
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

async function hold(page, ms) {
  const btn = await page.$("#btn-submit");
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await new Promise((r) => setTimeout(r, ms));
  await page.mouse.up();
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"]
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });
const errors = [];
page.on("pageerror", (e) => errors.push(String(e)));

try {
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "domcontentloaded" });

  let t = await text(page);
  ok("title-who", t.indexOf("邱小汀") !== -1);
  ok("title-task", t.indexOf("锁定组") !== -1);
  ok("title-lockline", t.indexOf("三份不能再是同一个人") !== -1);
  ok("title-no-hud", !/主线|搜词|关卡|通关|解锁|线索|结局|源码|本游戏|隐藏页|唯一解|进度条/.test(t));

  const enter = await page.$("#btn-enter");
  ok("enter-btn", !!enter);
  await enter.click();
  await page.waitForSelector("#desk.show", { timeout: 5000 });
  t = await text(page);
  ok("desk-who", t.indexOf("安民录临6") !== -1);
  ok("desk-docs", t.indexOf("本人户籍") !== -1 && t.indexOf("替僧度牒") !== -1 && t.indexOf("纸人疏") !== -1);
  ok("desk-no-approve", t.indexOf("不批准超度") !== -1 && t.indexOf("不批准解除") !== -1);
  ok("no-approve-btn", await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll("button")).map((b) => b.textContent || "");
    return !btns.some((s) => /批准|超度|解除/.test(s) && !/不批准/.test(s));
  }));

  ok("form-img-hidden", await page.evaluate(() => {
    const el = document.getElementById("form-img");
    const src = (el && el.getAttribute("src")) || "";
    return !!el && el.hasAttribute("hidden") && src.indexOf("07-form-white") === -1 && src.indexOf("09-hold") === -1;
  }));

  await page.click("#hit-before");
  ok("hit-before", await page.evaluate(() => document.querySelector('tr[data-slot="slot-before-shu"]').className.indexOf("current") !== -1));
  await page.click("#hit-absent");
  await page.click("#hit-shu");

  const rowsBeforeDoc = await page.evaluate(() => {
    const s = window.__TIDU__.state;
    return JSON.stringify(s.rows);
  });
  await page.click("#doc-hukou");
  t = await text(page);
  ok("read-hukou", t.indexOf("人还在干活") !== -1 && t.indexOf("1985") !== -1);
  ok("open-doc-no-fill", await page.evaluate((before) => JSON.stringify(window.__TIDU__.state.rows) === before, rowsBeforeDoc));
  await page.click("#doc-dudie");
  t = await text(page);
  ok("read-dudie", t.indexOf("晶彻") !== -1 && t.indexOf("1968") !== -1);
  await page.click("#doc-dudie-fuye");
  t = await text(page);
  ok("read-fuye", t.indexOf("周石根") !== -1);
  await page.click("#doc-shu");
  t = await text(page);
  ok("read-shu", t.indexOf("不是真人") !== -1 && t.indexOf("无指纹") !== -1);
  await page.click("#doc-register");
  t = await text(page);
  ok("read-register", t.indexOf("住持不进") !== -1);
  await page.click("#doc-note");
  t = await text(page);
  ok("read-note", t.indexOf("不当操作指南") !== -1);

  async function setRow(slot, nameId, fateId) {
    await page.select('select.slot-name[data-slot="' + slot + '"]', nameId);
    await page.select('select.slot-fate[data-slot="' + slot + '"]', fateId);
  }

  await setRow("slot-before-shu", "zhou-ahai", "fate-left-unreturned");
  await setRow("slot-absent", "zhou-ahai", "fate-left-unreturned");
  await setRow("slot-shu", "zhou-ahai", "fate-left-unreturned");

  await page.click("#btn-submit");
  await new Promise((r) => setTimeout(r, 400));
  let st = await page.evaluate(() => window.__TIDU__.state);
  ok("click-not-submit", st.submitCount === 0 && st.locked === false);

  await hold(page, 400);
  st = await page.evaluate(() => window.__TIDU__.state);
  ok("short-hold-cancel", st.submitCount === 0 && st.holding === false);

  {
    const btn = await page.$("#btn-submit");
    const box = await btn.boundingBox();
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await new Promise((r) => setTimeout(r, 300));
    const mid = await page.evaluate(() => ({
      still: (document.getElementById("still-img") && document.getElementById("still-img").getAttribute("src")) || "",
      form: (document.getElementById("form-img") && document.getElementById("form-img").getAttribute("src")) || "",
      holding: window.__TIDU__.state.holding
    }));
    ok("during-hold-flag", mid.holding === true, JSON.stringify(mid));
    ok("during-hold-no-09", mid.form.indexOf("09-hold") === -1 && mid.still.indexOf("09-hold") === -1, JSON.stringify(mid));
    ok("hold-no-leak-still", mid.still.indexOf("01-still") !== -1, mid.still);
    await page.mouse.up();
    await new Promise((r) => setTimeout(r, 200));
  }

  await hold(page, 1800);
  await new Promise((r) => setTimeout(r, 200));
  st = await page.evaluate(() => window.__TIDU__.state);
  t = await text(page);
  ok("wrong-not-lock", st.locked === false && st.endingId === null);
  ok("wrong-no-reveal", await page.evaluate(() => {
    const end = document.getElementById("ending");
    const shown = end && end.className.indexOf("show") !== -1;
    const frost = document.getElementById("lock-table").className.indexOf("frost") !== -1;
    return !shown && !frost;
  }));
  ok("wrong-white-sms", t.indexOf("表还是白的") !== -1);
  ok("wrong-no-red-row", await page.evaluate(() => {
    const rows = Array.from(document.querySelectorAll("#lock-table tbody tr"));
    return rows.every((r) => !/red|wrong|error/.test(r.className) && r.style.color !== "red");
  }));
  ok("wrong-table-white", await page.evaluate(() => document.getElementById("lock-table").className.indexOf("white") !== -1));
  ok("wrong-wage-zero", st.wage === 0);

  await setRow("slot-before-shu", "zhou-ahai", "fate-unreleased");
  await setRow("slot-absent", "zhou-shigen", "fate-left-unreturned");
  await setRow("slot-shu", "paper-shu", "fate-filed-paper");
  await hold(page, 1800);
  await page.waitForFunction(() => window.__TIDU__.state.endingId === "A", { timeout: 5000 });
  st = await page.evaluate(() => window.__TIDU__.state);
  t = await text(page);
  ok("correct-lock", st.locked === true && st.endingId === "A" && st.wage === 36);
  ok("correct-copy", t.indexOf("三十六") !== -1 || t.indexOf("¥36") !== -1);
  ok("correct-frost", await page.evaluate(() => document.getElementById("lock-table").className.indexOf("frost") !== -1));
  ok("correct-reason-merge", t.indexOf("同一个人") !== -1 || t.indexOf("拆开") !== -1);

  await page.click("#btn-replay");
  await page.waitForSelector("#btn-enter", { timeout: 5000 });
  await page.click("#btn-enter");
  await page.waitForSelector("#desk.show");
  await page.evaluate(() => window.__TIDU__.jumpClock());
  await page.waitForFunction(() => window.__TIDU__.state.endingId === "B", { timeout: 5000 });
  t = await text(page);
  st = await page.evaluate(() => window.__TIDU__.state);
  ok("timeout-B", st.endingId === "B" && st.wage === 0);
  ok("timeout-copy", t.indexOf("截点") !== -1 && t.indexOf("¥0") !== -1);

  ok("no-pageerror", errors.length === 0, errors.join(" | "));
} finally {
  await browser.close();
}

if (fails.length) {
  console.log("E2E FAILS", fails.length);
  process.exit(1);
}
console.log("E2E OK");
