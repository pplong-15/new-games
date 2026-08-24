import fs from "fs";
import path from "path";
import puppeteer from "/tmp/tidu-sanming-visual-profile/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js";

const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PHASE = process.env.PHASE || "before";
const ROOT = "/Users/jianglong/Desktop/新游戏3/替度三名";
const PROFILE = "/tmp/tidu-sanming-visual-profile/chrome-profile";

const JOBS = [
  { loc: "zh", base: "http://127.0.0.1:8852", dir: path.join(ROOT, "visual/html-game-puzzle/polish-20260824-zh") },
  { loc: "en", base: "http://127.0.0.1:8853", dir: path.join(ROOT, "visual/html-game-puzzle/polish-20260824-en") }
];

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function enterDesk(page) {
  await page.evaluate(() => {
    var b = document.getElementById("btn-enter");
    if (b) b.click();
    if (window.__TIDU__ && (!document.getElementById("desk") || !document.getElementById("desk").classList.contains("show"))) {
      window.__TIDU__.enter();
    }
  });
  await page.waitForSelector("#desk.show", { timeout: 10000 });
  await delay(200);
}

async function hold(page, ms) {
  const btn = await page.$("#btn-submit");
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await delay(ms);
  await page.mouse.up();
}

async function setRow(page, slot, nameId, fateId) {
  await page.select('select.slot-name[data-slot="' + slot + '"]', nameId);
  await page.select('select.slot-fate[data-slot="' + slot + '"]', fateId);
}

async function measure(page) {
  return page.evaluate(() => {
    const ids = ["btn-enter", "btn-submit", "doc-hukou", "doc-dudie", "doc-shu", "doc-pay", "hit-before", "hit-absent", "hit-shu", "gossip"];
    const out = {};
    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;
      const r = el.getBoundingClientRect();
      out[id] = { w: Math.round(r.width), h: Math.round(r.height) };
    }
    const img = document.querySelector("#doc-preview img");
    out.payImg = img ? (img.getAttribute("src") || "") : "";
    const form = document.getElementById("form-img");
    out.formImg = form ? (form.getAttribute("src") || "") : "";
    out.formHidden = !!(form && form.hasAttribute("hidden"));
    out.holding = !!(window.__TIDU__ && window.__TIDU__.state && window.__TIDU__.state.holding);
    out.locked = !!(window.__TIDU__ && window.__TIDU__.state && window.__TIDU__.state.locked);
    out.endingId = window.__TIDU__ && window.__TIDU__.state ? window.__TIDU__.state.endingId : null;
    out.lastDoc = window.__TIDU__ && window.__TIDU__.state ? window.__TIDU__.state.lastDoc : null;
    const table = document.getElementById("lock-table");
    out.tableClass = table ? table.className : "";
    const end = document.getElementById("ending");
    out.endingHtml = end ? end.innerHTML.slice(0, 400) : "";
    return out;
  });
}

async function shotPage(page, outDir, slug) {
  const file = path.join(outDir, slug + ".png");
  let last;
  for (let i = 0; i < 4; i++) {
    try {
      await page.screenshot({ path: file, fullPage: false });
      return file;
    } catch (e) {
      last = e;
      await delay(500);
    }
  }
  throw last;
}

async function runLoc(browser, job) {
  const suffix = PHASE === "after" ? "" : "-before";
  const log = [];
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);
  const boot = job.base + "/index.html?fresh=" + Date.now();
  await page.goto(boot, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => {
    try { localStorage.clear(); } catch (e) {}
  });
  await page.goto(job.base + "/index.html?fresh=" + Date.now(), { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForSelector("#btn-enter", { timeout: 15000 });
  const title = await page.title();
  if (job.loc === "zh" && title.indexOf("替度") === -1) throw new Error("wrong game on 8852: " + title);
  if (job.loc === "en" && title.indexOf("Three Names") === -1) throw new Error("wrong game on 8853: " + title);
  await delay(250);

  async function rec(nn, slug, input, change, dim) {
    const file = `${nn}-${slug}${suffix}.png`;
    await shotPage(page, job.dir, `${nn}-${slug}${suffix}`);
    const m = await measure(page);
    log.push({ nn, slug, input, change, dim, file, measure: m });
  }

  await rec("01", "boot-first-screen", "打开 index.html，未点进站", "标题静帧+锁定句+进站钮。无搜框。", "D1 D2");

  await enterDesk(page);
  await rec("02", "core-verb", "点进站", "三栏工作台：静帧热点 / 文书钮 / 白表下拉与按住交。", "D1 D6");
  await rec("18", "three-column-desk", "进站后停在台面", "左静帧、中文书、右锁定组同屏。", "D1 D2");
  await rec("11", "empty-or-loading", "进站后未打开文书、未填行", "预览空、表白、工钱¥0，不是白屏。", "D5");
  await rec("17", "title-no-search", "进站后扫顶栏与文书栏", "无站内搜框。文书是桌上按钮不是隐藏页。", "D1 D14");

  await page.click("#doc-hukou");
  await delay(150);
  await page.evaluate(() => {
    const img = document.querySelector("#doc-preview img");
    if (img) img.scrollIntoView({ block: "center" });
  });
  await delay(150);
  await rec("13", "two-sources-hukou", "打开户籍", "户口卡皮（紫栏/口述条）与夜绿台可分。", "D1 D3");

  await page.click("#doc-dudie");
  await delay(150);
  await page.evaluate(() => {
    const img = document.querySelector("#doc-preview img");
    if (img) img.scrollIntoView({ block: "center" });
  });
  await delay(150);
  await rec("14", "dudie-skin", "打开度牒", "度牒红框空栏+附页条，与户口卡不是同一张皮。", "D1 D3");

  await page.click("#doc-shu");
  await delay(150);
  await page.evaluate(() => {
    const img = document.querySelector("#doc-preview img");
    if (img) img.scrollIntoView({ block: "center" });
  });
  await delay(150);
  await rec("15", "shu-paper-skin", "打开纸人疏", "悬挂疏纸皮。不是搜词隐藏页。", "D1");

  await page.click("#hit-before");
  await page.click("#hit-absent");
  await page.click("#hit-shu");
  await rec("21", "still-three-hits", "点静帧三热点", "疏前/不在场/疏本身可点，当前行可指认。", "D6");

  await page.click("#doc-pay");
  await delay(200);
  await page.evaluate(() => {
    const img = document.querySelector("#doc-preview img");
    if (img) img.scrollIntoView({ block: "center" });
    const pay = document.getElementById("doc-pay");
    if (pay) pay.scrollIntoView({ block: "start" });
  });
  await delay(200);
  // force preview into view for D4 evidence
  await page.evaluate(() => {
    const prev = document.getElementById("doc-preview");
    if (prev) prev.scrollIntoView({ block: "start" });
  });
  await delay(150);
  await rec("16", "pay-slip-unlocked", "未锁点开计件单", "必须能看出图上是否已填近答案。", "D4 D6");
  const payEl = await page.$("#doc-preview img");
  if (payEl) {
    await payEl.screenshot({ path: path.join(job.dir, `16b-pay-slip-preview${suffix}.png`) });
    log.push({
      nn: "16b",
      slug: "pay-slip-preview",
      input: "未锁点开计件单，截预览图",
      change: "计件单 JPEG 是否已填近答案。",
      dim: "D4",
      file: `16b-pay-slip-preview${suffix}.png`
    });
  }

  await setRow(page, "slot-before-shu", "zhou-ahai", "fate-left-unreturned");
  await setRow(page, "slot-absent", "zhou-ahai", "fate-left-unreturned");
  await setRow(page, "slot-shu", "zhou-ahai", "fate-left-unreturned");
  await page.evaluate(() => document.getElementById("btn-submit").scrollIntoView({ block: "center" }));
  await delay(100);

  await page.evaluate(() => window.__TIDU__.holdSubmit());
  await delay(350);
  await rec("19", "hold-in-progress", "三行近答案后按住未满 1.5s", "钮呈按住态。不挂 09-hold.jpg。静帧仍是现场。", "D6 D4");
  const holdSrc = await page.evaluate(() => ({
    form: (document.getElementById("form-img") && document.getElementById("form-img").getAttribute("src")) || "",
    still: (document.getElementById("still-img") && document.getElementById("still-img").getAttribute("src")) || "",
    holding: window.__TIDU__.state.holding
  }));
  log[log.length - 1].holdSrc = holdSrc;
  await page.evaluate(() => window.__TIDU__.cancelHold());
  await delay(150);

  await hold(page, 1800);
  await delay(250);
  await rec("04", "near-fail", "按住交错组（三行周阿海/出家未归）", "表仍白，短信不标哪一行，无红行，工钱0。", "D6 D5");
  await rec("10", "non-color-state", "错组后看表与短信", "白表+「表还是白的」句子，不只靠颜色。", "D7 D11");
  await rec("05", "recovery", "错组后仍停在台面", "下拉可改，可再按住。不是死档。", "D5");

  await page.click("#gossip");
  await delay(100);
  await rec("12", "error-or-pause", "点走廊声", "拒绝句：别填进表。无暂停层。可继续填。", "D5 D6");

  await page.focus("#btn-submit");
  await delay(80);
  await rec("07", "keyboard-focus", "焦点落到提交钮", "可见焦点与屏幕顺序一致。", "D11");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await rec("09", "muted-or-reduced-motion", "减弱动效后看按住提示与白表", "无音频。主反馈仍是白表句/按住字，无闪烁。", "D11 D6");
  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "no-preference" }]);

  await setRow(page, "slot-before-shu", "zhou-ahai", "fate-unreleased");
  await setRow(page, "slot-absent", "zhou-shigen", "fate-left-unreturned");
  await setRow(page, "slot-shu", "paper-shu", "fate-filed-paper");
  await hold(page, 1800);
  await page.waitForFunction(() => window.__TIDU__.state.endingId === "A", { timeout: 5000 });
  await delay(250);
  await rec("03", "success-feedback", "按住成交组正解", "甲锁定、工钱36、霜表。不逐行闪绿。", "D6 D5");
  await rec("20", "ending-a-locked", "锁成后收口甲", "甲屏可挂 10-ending-a。计件霜表允许填好的表。", "D5 D4");

  const lockedPay = await page.evaluate(() => {
    const form = document.getElementById("form-img");
    return {
      src: form ? form.getAttribute("src") : "",
      hidden: !!(form && form.hasAttribute("hidden")),
      endingHas11: (document.getElementById("ending") && document.getElementById("ending").innerHTML || "").indexOf("11-ending-b") !== -1,
      endingHas09: (document.getElementById("ending") && document.getElementById("ending").innerHTML || "").indexOf("09-hold") !== -1
    };
  });
  log[log.length - 1].lockedPay = lockedPay;

  await page.evaluate(() => {
    var rp = document.getElementById("btn-replay");
    if (rp) rp.click();
  });
  await page.waitForSelector("#btn-enter", { timeout: 8000 });
  await enterDesk(page);
  await page.evaluate(() => window.__TIDU__.jumpClock());
  await page.waitForFunction(() => window.__TIDU__.state.endingId === "B", { timeout: 5000 });
  await delay(200);
  await rec("22", "ending-b-no-leak", "截点乙", "乙屏不挂 11-ending-b.jpg。工钱0。", "D4 D5");

  await page.evaluate(() => {
    var rp = document.getElementById("btn-replay");
    if (rp) rp.click();
  });
  await page.waitForSelector("#btn-enter", { timeout: 8000 });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await enterDesk(page);
  await delay(200);
  await rec("08", "touch-targets", "390 宽进站", "进站后主钮/文书/提交/热点仍可点，不靠 hover。", "D9 D11");

  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.setViewport({ width: 320, height: 700, deviceScaleFactor: 1 });
  await page.goto(job.base + "/index.html?w=320&t=" + Date.now(), { waitUntil: "domcontentloaded" });
  await page.evaluate(() => { try { localStorage.clear(); } catch (e) {} });
  await page.goto(job.base + "/index.html?w=320&t=" + Date.now(), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#btn-enter", { timeout: 15000 });
  await delay(200);
  await enterDesk(page);
  await page.waitForSelector("#desk.show");
  await delay(200);
  await page.click("#doc-pay");
  await delay(150);
  await page.evaluate(() => {
    const prev = document.getElementById("doc-preview");
    if (prev) prev.scrollIntoView({ block: "start" });
  });
  await delay(150);
  await rec("06", "narrow-320", "视口 320 进站并打开计件单", "三栏改单列。计件单与提交钮仍可点。", "D9 D4");

  await page.close();
  fs.writeFileSync(path.join(job.dir, `shot-log-${PHASE}.json`), JSON.stringify(log, null, 2));
  fs.writeFileSync(path.join(job.dir, `control-sizes-${PHASE}.json`), JSON.stringify(log.map((x) => ({ file: x.file, measure: x.measure })), null, 2));
  return log;
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: [
    "--no-sandbox",
    "--disable-gpu",
    "--no-proxy-server",
    "--proxy-bypass-list=*",
    "--hide-scrollbars"
  ]
});

try {
  for (const job of JOBS) {
    fs.mkdirSync(job.dir, { recursive: true });
    const log = await runLoc(browser, job);
    console.log(job.loc, "shots", log.length);
    const pay = log.find((x) => x.slug === "pay-slip-unlocked");
    console.log(job.loc, "payImg", pay && pay.measure && pay.measure.payImg);
    const holdRow = log.find((x) => x.slug === "hold-in-progress");
    console.log(job.loc, "hold", holdRow && holdRow.holdSrc);
    const endB = log.find((x) => x.slug === "ending-b-no-leak");
    console.log(job.loc, "endingB", endB && endB.measure && endB.measure.endingHtml.slice(0, 180));
  }
} finally {
  await browser.close();
}
console.log("SHOT MATRIX", PHASE, "OK");
