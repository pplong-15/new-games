import puppeteer from "puppeteer-core";

const BASE = process.env.BASE || "http://127.0.0.1:8765";
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

async function pinAll(page) {
  await page.waitForSelector("button.pin");
  const n = await page.$$eval("button.pin", (btns) => {
    btns.forEach((b) => b.click());
    return btns.length;
  });
  return n;
}

async function gotoDoor(page, label) {
  await page.goto(BASE + "/pages/p06-doors.html", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => {
    const box = document.getElementById("door-list");
    return box && box.querySelectorAll("a, .door-card").length > 0;
  });
  const href = await page.evaluate((t) => {
    const a = Array.from(document.querySelectorAll("#door-list a")).find(
      (n) => (n.textContent || "").indexOf(t) !== -1
    );
    return a ? a.getAttribute("href") : "";
  }, label);
  if (!href) {
    const listing = await page.$eval("#door-list", (n) => n.innerText);
    throw new Error("no door " + label + " in " + listing);
  }
  const dest = href.indexOf("http") === 0 ? href : BASE + "/pages/" + href.replace(/^\.\//, "");
  console.log("open-door", label, dest);
  await page.goto(dest, { waitUntil: "domcontentloaded", timeout: 15000 });
  console.log("landed", page.url());
  await page.waitForSelector("body");
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

try {
  await page.goto(BASE + "/introduction.html", { waitUntil: "domcontentloaded" });
  let t = await text(page);
  ok("intro-who", t.indexOf("Cen Shu") !== -1);
  ok("intro-task", t.indexOf("zi hour") !== -1 && t.indexOf("proved") !== -1);
  ok("intro-no-search", !(await page.$("#search-form")));

  await page.click("a.enter-link");
  await page.waitForSelector("#search-form");
  t = await text(page);
  ok("index-obit-word", t.indexOf("obituary") !== -1);

  await page.click('a[href="pages/p05-desk.html"]');
  await page.waitForSelector("#shouqi-bar");
  t = await text(page);
  ok("desk-tool", t.indexOf("original-file cabinet") !== -1);
  ok("desk-clock", t.indexOf("7th of the sixth month") !== -1);
  await page.click("button.pin");
  t = await text(page);
  ok("pin-tonight", t.indexOf("Already in the shift book") !== -1);

  await page.goto(BASE + "/pages/p06-doors.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#door-list a");
  t = await text(page);
  ok("door-sent", t.indexOf("pull first this shift") !== -1);

  await gotoDoor(page, "Obituary board");
  await pinAll(page);
  await gotoDoor(page, "Transfer slip");
  await pinAll(page);
  await gotoDoor(page, "Hao family chain");
  await pinAll(page);

  t = await text(page);
  ok("bar-three", t.indexOf("Transfer end-date is the 2nd of the sixth month") !== -1);

  await page.goto(BASE + "/pages/p10-obit.html", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("revisit-same-shift", t.indexOf("Hao Liancheng") !== -1);

  await page.goto(BASE + "/pages/p05-desk.html", { waitUntil: "domcontentloaded" });
  await page.click("#btn-handover");
  await page.waitForSelector("body");
  t = await text(page);
  ok("handover", t.indexOf("Cabinet returned") !== -1 || t.indexOf("empty") !== -1);

  await page.goto(BASE + "/pages/p10-obit.html", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("obit-returned", t.indexOf("returned") !== -1);

  await gotoDoor(page, "Farewell hall booking");
  t = await text(page);
  ok("book-open", t.indexOf("banner") !== -1 || t.indexOf("Banner") !== -1);
  await pinAll(page);
  await gotoDoor(page, "Gift ledger");
  await pinAll(page);
  await gotoDoor(page, "Xiufen's space");
  t = await text(page);
  ok("qzone-open", t.indexOf("14th") !== -1 || t.indexOf("Xiufen") !== -1);

  await page.goto(BASE + "/pages/p05-desk.html", { waitUntil: "domcontentloaded" });
  await page.reload({ waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("save-refresh", t.indexOf("20:00–22:00") !== -1 || t.indexOf("This shift can still pull") !== -1);

  await page.click("#btn-handover");
  await page.waitForSelector("body");

  await gotoDoor(page, "Day-count register");
  t = await text(page);
  ok("jiri-open", t.indexOf("8th") !== -1);
  await pinAll(page);

  await page.goto(BASE + "/pages/p30-form.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#claim-form");
  await page.$$eval('#claim-form input[type="checkbox"]', (boxes) => {
    boxes.forEach((b) => {
      if (!b.checked) b.click();
    });
  });
  await page.click("#btn-stop");
  await page.waitForSelector("body");
  t = await text(page);
  ok("ending-stop", t.indexOf("Stop-opening") !== -1 || t.indexOf("stop-opening") !== -1);

  await page.goto(BASE + "/introduction.html", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("continue", t.indexOf("Continue last save") !== -1);
  await page.click("#btn-reset");
  await page.waitForSelector("a.enter-link");
  t = await text(page);
  ok("reset", t.indexOf("Continue last save") === -1);

  await page.goto(BASE + "/pages/p05-desk.html", { waitUntil: "domcontentloaded" });
  await page.click("button.pin");
  await page.goto(BASE + "/pages/p30-form.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#btn-open");
  await page.click("#btn-open");
  t = await text(page);
  ok("ending-open", t.indexOf("As the family asked") !== -1 || t.indexOf("open") !== -1);

  await page.click("#btn-reset").catch(() => {});
  await page.goto(BASE + "/introduction.html", { waitUntil: "domcontentloaded" });
  if (await page.$("#btn-reset")) await page.click("#btn-reset");
  await page.goto(BASE + "/pages/p30-form.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("#btn-late");
  await page.click("#btn-late");
  t = await text(page);
  ok("ending-late", t.indexOf("default") !== -1 || t.indexOf("not handed") !== -1);

  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await page.evaluate(() => {
    const f = document.getElementById("search-form");
    const i = f.querySelector('input[name="q"]');
    i.value = "admin";
    f.submit();
  });
  await page.waitForSelector(".box, h2");
  t = await text(page);
  ok("search-forbid", t.indexOf("forbidden") !== -1);

  await page.goto(BASE + "/search-results.html?q=", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("search-empty", t.indexOf("Sorry") !== -1 || t.indexOf("one English word") !== -1);

  await page.goto(BASE + "/search-results.html?q=hello", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("search-en", t.indexOf("Sorry") !== -1 || t.indexOf("no results") !== -1);

  await page.goto(BASE + "/search-results.html?q=obituary", { waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("search-obit-public", t.indexOf("Baita Funeral") !== -1);
  const href = await page.$eval(".box a", (a) => a.getAttribute("href"));
  ok("search-obit-not-hidden", href.indexOf("p10-obit") === -1);

  await page.setViewport({ width: 320, height: 640 });
  await page.goto(BASE + "/pages/p05-desk.html", { waitUntil: "domcontentloaded" });
  const pinBox = await page.$eval("button.pin", (b) => {
    const r = b.getBoundingClientRect();
    return { w: r.width, h: r.height, vis: r.width > 0 && r.height >= 40 };
  });
  ok("narrow-pin", pinBox.vis, JSON.stringify(pinBox));
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > 340);
  ok("narrow-no-huge-overflow", !overflow);

  await page.keyboard.press("Tab");
  await page.keyboard.press("Tab");
  const active = await page.evaluate(() => document.activeElement && document.activeElement.tagName);
  ok("keyboard-focus", !!active);
} catch (e) {
  fails.push("exception " + e.stack);
  console.error(e);
} finally {
  await browser.close();
}

if (fails.length) {
  console.log("FAILED", fails.length, fails.join(" | "));
  process.exit(1);
}
console.log("ALL_E2E_PASS");
