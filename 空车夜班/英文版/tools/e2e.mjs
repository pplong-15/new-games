import puppeteer from "puppeteer-core";

const BASE = process.env.BASE || "http://127.0.0.1:8771";
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

async function clickText(page, contains) {
  const handle = await page.evaluateHandle((t) => {
    const nodes = Array.from(document.querySelectorAll("button"));
    return nodes.find((n) => (n.textContent || "").indexOf(t) !== -1) || null;
  }, contains);
  const el = handle.asElement();
  if (!el) {
    const t = await text(page);
    throw new Error("missing button " + contains + " in " + t.slice(0, 400));
  }
  await el.click();
}

async function closeRules(page) {
  const vis = await page.evaluate(() => {
    const n = document.getElementById("rules");
    return n && !n.classList.contains("hidden");
  });
  if (vis) await clickText(page, "Close");
}

async function skipShop(page) {
  await page.waitForFunction(() => {
    const n = document.getElementById("shop");
    return n && !n.classList.contains("hidden");
  });
  await clickText(page, "Skip, hand over");
}

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"]
});
const page = await browser.newPage();
await page.setViewport({ width: 1280, height: 800 });

try {
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  let t = await text(page);
  ok("title-who", t.indexOf("Qi Yan") !== -1 || t.indexOf("YE-08") !== -1);
  ok("title-task", t.indexOf("fenzi") !== -1 && t.indexOf("keys") !== -1);
  ok("title-no-hud-words", t.indexOf("main quest") === -1 && t.indexOf("ending route") === -1);

  await clickText(page, "Take the shift");
  t = await text(page);
  ok("boot-geng", t.indexOf("Geng") !== -1);
  ok("boot-who", t.indexOf("Qi Yan") !== -1);
  ok("boot-cash", t.indexOf("Cash") !== -1);

  await clickText(page, "Open the glovebox rules");
  t = await text(page);
  ok("rules-one", t.indexOf("Collect the number written") !== -1);
  await clickText(page, "Close");
  await clickText(page, "Take the first fare");
  await clickText(page, "Mirror");
  await clickText(page, "Take");
  t = await text(page);
  ok("n1-ma", t.indexOf("Master Ma") !== -1);
  await clickText(page, "Pass him the helmet");
  await clickText(page, "Take both as written");
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Flip the visor and finish it");
  await clickText(page, "Take");
  await clickText(page, "Mirror");
  await clickText(page, "Visor");
  await clickText(page, "Refuse");
  await clickText(page, "Press this fare");
  t = await text(page);
  ok("n2-fb", t.indexOf("visor") !== -1 || t.indexOf("Refuse") !== -1 || t.indexOf("refuse") !== -1);
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Hold it to the light");
  await closeRules(page);
  await clickText(page, "Mirror");
  await clickText(page, "Step out");
  t = await text(page);
  ok("n3-out-dry", t.indexOf("mat") !== -1 || t.indexOf("Mat") !== -1);
  await clickText(page, "Visor");
  await clickText(page, "Refuse");
  await clickText(page, "Press this fare");
  t = await text(page);
  ok("n3-judge-ok", t.indexOf("refuse") !== -1 || t.indexOf("Refuse") !== -1);
  await clickText(page, "Take");
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Unfold it");
  await clickText(page, "Mirror");
  await clickText(page, "Driver rules");
  await clickText(page, "Refuse");
  await clickText(page, "Press this fare");
  await clickText(page, "Note: Hebu lights are out");
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Copy the order onto the rules page");
  await clickText(page, "Hear him out");
  await clickText(page, "Mirror");
  await clickText(page, "Driver rules");
  await clickText(page, "Refuse");
  await clickText(page, "Press this fare");
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Finish this page");
  await clickText(page, "Ask how far he got");
  await clickText(page, "Take");
  await clickText(page, "Pay fenzi at the window");
  await skipShop(page);

  await clickText(page, "Leave the pencil line");
  await clickText(page, "Take");
  await clickText(page, "Go hand over the keys");
  await clickText(page, "Keys at the Hexikou window");
  t = await text(page);
  ok("ending-dawn", t.indexOf("Hand Over the Keys") !== -1, t.slice(0, 200));

  const saved = await page.evaluate(() => localStorage.getItem("kongche-yeban-v1-en"));
  ok("save-ending", !!saved && saved.indexOf("dawn") !== -1);

  await page.reload({ waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("reload-ending-or-continue", t.indexOf("Hand Over the Keys") !== -1 || t.indexOf("Continue last") !== -1);

  await page.evaluate(() => window.__kb.resetAll());
  await page.waitForFunction(() => document.body.innerText.indexOf("Take the shift") !== -1);

  await page.setViewport({ width: 320, height: 640 });
  await clickText(page, "Take the shift");
  const minH = await page.evaluate(() => {
    const b = document.querySelector(".choices button, .boot button, .looks button");
    if (!b) return 0;
    return Math.round(b.getBoundingClientRect().height);
  });
  ok("320-btn", minH >= 36, "h=" + minH);
  t = await text(page);
  ok("320-readable", t.indexOf("Cash") !== -1 && t.indexOf("Rules") !== -1);

  const endings = ["dawn", "ferry", "mirror", "joss", "fired", "void"];
  for (const id of endings) {
    const got = await page.evaluate((eid) => {
      const kb = window.__kb;
      const s = kb.empty();
      s.overlay = "";
      s.night = 7;
      s.beat = 0;
      s.sanity = eid === "void" ? 0 : 50;
      if (eid === "fired") s.flags.lampOff = true;
      if (eid === "joss") s.flags.tookWet = true;
      if (eid === "mirror") s.flags.gaveToMirror = true;
      if (eid === "ferry") s.flags.doorstopLiu = true;
      if (eid === "dawn") s.flags.refusedWet = true;
      s.ending = kb.pickEnding(s);
      kb.setState(s);
      kb.finish(s);
      return { ending: kb.getState().ending, text: document.body.innerText };
    }, id);
    ok("ending-" + id, got.ending === id && got.text.length > 20, JSON.stringify({ e: got.ending, t: got.text.slice(0, 80) }));
  }

  const blocked = await page.evaluate(() => {
    const kb = window.__kb;
    kb.resetAll();
    kb.startNew();
    const beat = {
      id: "n3-wet",
      needLooks: ["mirror", "out"],
      correct: { action: "refuse", source: "visor" }
    };
    return kb.validateJudge(kb.getState(), beat, "refuse", "visor");
  });
  ok("judge-block-no-look", blocked.blocked === true);

  const cons = [];
  page.on("pageerror", (e) => cons.push(String(e)));
  page.on("console", (msg) => {
    if (msg.type() === "error") cons.push(msg.text());
  });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  ok("no-pageerror", cons.length === 0, cons.join(" | "));

  await page.evaluate(() => window.__kb.resetAll());
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(BASE + "/index.html", { waitUntil: "domcontentloaded" });
  await page.waitForSelector("button");
  await page.focus("button");
  for (let i = 0; i < 6; i++) {
    const label = await page.evaluate(() => (document.activeElement && document.activeElement.textContent) || "");
    if (label.indexOf("Take the shift") !== -1) break;
    await page.keyboard.press("Tab");
  }
  await page.keyboard.press("Enter");
  t = await text(page);
  ok("keyboard-boot", t.indexOf("Qi Yan") !== -1 || t.indexOf("Geng") !== -1, t.slice(0, 160));
} catch (e) {
  ok("e2e-throw", false, String(e && e.stack ? e.stack : e));
} finally {
  await browser.close();
}

if (fails.length) {
  console.log("E2E_FAIL", fails.length);
  fails.forEach((f) => console.log(" ", f));
  process.exit(1);
}
console.log("ALL_E2E_PASS");
