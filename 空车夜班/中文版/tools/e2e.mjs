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
  if (vis) await clickText(page, "合上");
}

async function skipShop(page) {
  await page.waitForFunction(() => {
    const n = document.getElementById("shop");
    return n && !n.classList.contains("hidden");
  });
  await clickText(page, "不买，交班");
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
  ok("title-who", t.indexOf("祁晏") !== -1 || t.indexOf("YE-08") !== -1);
  ok("title-task", t.indexOf("份子") !== -1 && t.indexOf("钥匙") !== -1);
  ok("title-no-hud-words", t.indexOf("主线") === -1 && t.indexOf("通关") === -1);

  await clickText(page, "接班");
  t = await text(page);
  ok("boot-geng", t.indexOf("耿") !== -1);
  ok("boot-who", t.indexOf("祁晏") !== -1);
  ok("boot-cash", t.indexOf("油钱") !== -1);

  await clickText(page, "打开手套箱里的守则");
  t = await text(page);
  ok("rules-one", t.indexOf("路单写几人") !== -1);
  await clickText(page, "合上");
  await clickText(page, "先去接第一单");
  await clickText(page, "后视镜");
  await clickText(page, "载");
  t = await text(page);
  ok("n1-ma", t.indexOf("马师傅") !== -1);
  await clickText(page, "把头盔递给他");
  await clickText(page, "按路单载两人");
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "掀开遮阳板看完");
  await clickText(page, "载");
  await clickText(page, "后视镜");
  await clickText(page, "遮阳板");
  await clickText(page, "拒载");
  await clickText(page, "压这一单");
  t = await text(page);
  ok("n2-fb", t.indexOf("遮阳板") !== -1 || t.indexOf("拒") !== -1);
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "对着灯看墨");
  await closeRules(page);
  await clickText(page, "后视镜");
  await clickText(page, "下车看");
  t = await text(page);
  ok("n3-out-dry", t.indexOf("脚垫") !== -1 || t.indexOf("垫") !== -1);
  await clickText(page, "遮阳板");
  await clickText(page, "拒载");
  await clickText(page, "压这一单");
  t = await text(page);
  ok("n3-judge-ok", t.indexOf("拒") !== -1);
  await clickText(page, "载");
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "展开看完");
  await clickText(page, "后视镜");
  await clickText(page, "驾驶员守则");
  await clickText(page, "拒载");
  await clickText(page, "压这一单");
  await clickText(page, "记下河埠灯不亮");
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "把口令记进守则页");
  await clickText(page, "听完再走");
  await clickText(page, "后视镜");
  await clickText(page, "驾驶员守则");
  await clickText(page, "拒载");
  await clickText(page, "压这一单");
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "把这一页看完");
  await clickText(page, "问他当年送到哪");
  await clickText(page, "载");
  await clickText(page, "去窗口交份子");
  await skipShop(page);

  await clickText(page, "留下铅笔那行");
  await clickText(page, "载");
  await clickText(page, "去交钥匙");
  await clickText(page, "钥匙交到河西口窗口");
  t = await text(page);
  ok("ending-dawn", t.indexOf("交钥匙") !== -1, t.slice(0, 200));

  const saved = await page.evaluate(() => localStorage.getItem("kongche-yeban-v1"));
  ok("save-ending", !!saved && saved.indexOf("dawn") !== -1);

  await page.reload({ waitUntil: "domcontentloaded" });
  t = await text(page);
  ok("reload-ending-or-continue", t.indexOf("交钥匙") !== -1 || t.indexOf("接着上一次") !== -1);

  await page.evaluate(() => window.__kb.resetAll());
  await page.waitForFunction(() => document.body.innerText.indexOf("接班") !== -1);

  await page.setViewport({ width: 320, height: 640 });
  await clickText(page, "接班");
  const minH = await page.evaluate(() => {
    const b = document.querySelector(".choices button, .boot button, .looks button");
    if (!b) return 0;
    return Math.round(b.getBoundingClientRect().height);
  });
  ok("320-btn", minH >= 36, "h=" + minH);
  t = await text(page);
  ok("320-readable", t.indexOf("油钱") !== -1 && t.indexOf("守则") !== -1);

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
    if (label.indexOf("接班") !== -1) break;
    await page.keyboard.press("Tab");
  }
  await page.keyboard.press("Enter");
  t = await text(page);
  ok("keyboard-boot", t.indexOf("祁晏") !== -1 || t.indexOf("耿") !== -1, t.slice(0, 160));
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
