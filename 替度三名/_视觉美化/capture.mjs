import puppeteer from "/tmp/tidu-visual-capture/node_modules/puppeteer-core/lib/esm/puppeteer/puppeteer-core.js";
import fs from "node:fs";
import path from "node:path";

const PHASE = process.env.PHASE === "before" ? "before" : "after";
const BASE = process.env.BASE || "http://127.0.0.1:8848";
const OUT = process.env.OUT;
const CHROME =
  process.env.CHROME ||
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const HOLD_MS = Number(process.env.HOLD_MS || 1800);

if (!OUT) {
  console.error("OUT required");
  process.exit(1);
}
fs.mkdirSync(OUT, { recursive: true });

function fname(nn, slug) {
  return PHASE === "before" ? `${nn}-${slug}-before.png` : `${nn}-${slug}.png`;
}

async function shot(page, nn, slug) {
  const dest = path.join(OUT, fname(nn, slug));
  await page.screenshot({ path: dest, fullPage: false });
  console.log("SHOT", dest);
}

async function hold(page, ms) {
  const btn = await page.$("#btn-submit");
  const box = await btn.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await new Promise((r) => setTimeout(r, ms));
  await page.mouse.up();
}

async function setRow(page, slot, nameId, fateId) {
  await page.select('select.slot-name[data-slot="' + slot + '"]', nameId);
  await page.select('select.slot-fate[data-slot="' + slot + '"]', fateId);
}

async function sizes(page, label) {
  const data = await page.evaluate(() => {
    const ids = [
      "btn-enter",
      "btn-submit",
      "hit-before",
      "hit-absent",
      "hit-shu",
      "doc-hukou",
      "doc-dudie",
      "doc-shu",
      "gossip",
      "btn-replay"
    ];
    const out = {};
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const r = el.getBoundingClientRect();
      out[id] = { w: Math.round(r.width), h: Math.round(r.height) };
    });
    const form = document.getElementById("form-img");
    out.formImg = form
      ? {
          hidden: form.hasAttribute("hidden"),
          src: form.getAttribute("src") || "",
          display: getComputedStyle(form).display
        }
      : null;
    const table = document.getElementById("lock-table");
    out.tableClass = table ? table.className : "";
    out.still = (document.getElementById("still-img") || {}).src || "";
    return out;
  });
  fs.writeFileSync(path.join(OUT, label + ".json"), JSON.stringify(data, null, 2));
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"]
});
const page = await browser.newPage();
page.on("pageerror", (e) => console.error("PAGEERROR", String(e)));

try {
  await page.setViewport({ width: 1280, height: 800, deviceScaleFactor: 1 });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 400));

  await shot(page, "01", "boot-first-screen");
  await shot(page, "20", "intro-no-search");

  await page.focus("#btn-enter");
  await shot(page, "07", "keyboard-focus");
  await sizes(page, "control-sizes-title");

  await page.click("#btn-enter");
  await page.waitForSelector("#desk.show", { timeout: 5000 });
  await new Promise((r) => setTimeout(r, 300));

  await shot(page, "02", "core-verb");
  await shot(page, "11", "empty-or-loading");
  await shot(page, "13", "two-sources-papers");
  await shot(page, "16", "still-clean-token");
  await shot(page, "17", "white-table-unlocked");
  await sizes(page, "control-sizes-desk");

  const tokenProbe = await page.evaluate(() => {
    const form = document.getElementById("form-img");
    const still = document.getElementById("still-img");
    const srcF = (form && form.getAttribute("src")) || "";
    const srcS = (still && still.getAttribute("src")) || "";
    const shown = form && !form.hasAttribute("hidden") && getComputedStyle(form).display !== "none";
    return {
      formSrc: srcF,
      stillSrc: srcS,
      formShown: !!shown,
      has07: srcF.indexOf("07-form-white") !== -1 || srcS.indexOf("07-form-white") !== -1,
      has09: srcF.indexOf("09-hold") !== -1 || srcS.indexOf("09-hold") !== -1
    };
  });
  fs.writeFileSync(path.join(OUT, "token-07-09.json"), JSON.stringify(tokenProbe, null, 2));

  await page.click("#hit-before");
  await page.click("#doc-hukou");
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "14", "sheet-hukou");

  await page.click("#doc-dudie");
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "15", "sheet-dudie");

  await page.click("#doc-shu");
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "19", "sheet-shu");

  await setRow(page, "slot-before-shu", "zhou-ahai", "fate-left-unreturned");
  await setRow(page, "slot-absent", "zhou-ahai", "fate-left-unreturned");
  await setRow(page, "slot-shu", "zhou-ahai", "fate-left-unreturned");

  await page.click("#btn-submit");
  await new Promise((r) => setTimeout(r, 200));
  await hold(page, 400);
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "12", "error-or-pause");

  await hold(page, HOLD_MS);
  await new Promise((r) => setTimeout(r, 400));
  await shot(page, "04", "near-fail");
  await shot(page, "05", "recovery");

  await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
  await shot(page, "09", "muted-or-reduced-motion");
  await page.emulateMediaFeatures([]);

  await setRow(page, "slot-before-shu", "zhou-ahai", "fate-unreleased");
  await setRow(page, "slot-absent", "zhou-shigen", "fate-left-unreturned");
  await setRow(page, "slot-shu", "paper-shu", "fate-filed-paper");
  await hold(page, HOLD_MS);
  await page.waitForFunction(() => window.__TIDU__ && window.__TIDU__.state.endingId === "A", {
    timeout: 8000
  });
  await new Promise((r) => setTimeout(r, 400));
  await shot(page, "03", "success-feedback");
  await shot(page, "22", "ending-a-wage");

  await page.evaluate(() => {
    const end = document.getElementById("ending");
    if (end) end.style.setProperty("display", "none", "important");
  });
  await new Promise((r) => setTimeout(r, 150));
  await shot(page, "10", "non-color-state");
  await shot(page, "18", "frost-table-locked");
  await page.evaluate(() => {
    const end = document.getElementById("ending");
    if (end) end.style.removeProperty("display");
  });

  const saveProbe = await page.evaluate(() => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) keys.push(localStorage.key(i));
    return { keys, raw: localStorage.getItem("tidu-sanming-v2") || localStorage.getItem("tidu-sanming-v2-en") };
  });
  fs.writeFileSync(path.join(OUT, "save-key-probe.json"), JSON.stringify({ keys: saveProbe.keys }, null, 2));

  await page.click("#btn-replay");
  await page.waitForSelector("#btn-enter", { timeout: 5000 });
  await page.click("#btn-enter");
  await page.waitForSelector("#desk.show");
  await page.evaluate(() => window.__TIDU__.jumpClock());
  await page.waitForFunction(() => window.__TIDU__.state.endingId === "B", { timeout: 5000 });
  await new Promise((r) => setTimeout(r, 300));
  await shot(page, "21", "ending-b-unpaid");

  await page.click("#btn-replay");
  await page.waitForSelector("#btn-enter", { timeout: 5000 });
  await page.setViewport({ width: 320, height: 640, deviceScaleFactor: 1 });
  await page.click("#btn-enter");
  await page.waitForSelector("#desk.show");
  await new Promise((r) => setTimeout(r, 250));
  await page.evaluate(() => {
    const form = document.getElementById("col-form");
    if (form) form.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "06", "narrow-320");
  await sizes(page, "control-sizes-320");

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => localStorage.clear());
  await page.reload({ waitUntil: "networkidle0" });
  await page.click("#btn-enter");
  await page.waitForSelector("#desk.show");
  await new Promise((r) => setTimeout(r, 250));
  await page.evaluate(() => {
    const form = document.getElementById("col-form");
    if (form) form.scrollIntoView({ block: "start" });
  });
  await new Promise((r) => setTimeout(r, 200));
  await shot(page, "08", "touch-targets");
  await sizes(page, "control-sizes-390");
} finally {
  await browser.close();
}

console.log("CAPTURE OK", PHASE, BASE, OUT);
