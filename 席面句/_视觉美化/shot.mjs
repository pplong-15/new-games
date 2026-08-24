import puppeteer from "puppeteer-core";
import fs from "fs";
import path from "path";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const ROOT = "/Users/jianglong/Desktop/新游戏3/席面句";
const mode = process.argv[2] || "after"; // before | after
const lang = process.argv[3] || "zh"; // zh | en
const port = lang === "en" ? 8847 : 8846;
const build = `polish-20260824-${lang}`;
const outDir = path.join(ROOT, "visual/html-game-puzzle", build);
const suffix = mode === "before" ? "-before" : "";
const url = `http://127.0.0.1:${port}/index.html`;

fs.mkdirSync(outDir, { recursive: true });

const log = [];
function note(nn, slug, input, change, dim) {
  log.push({ nn, slug, input, change, dim, file: `${nn}-${slug}${suffix}.png` });
}

async function shot(page, nn, slug, input, change, dim) {
  const file = path.join(outDir, `${nn}-${slug}${suffix}.png`);
  await page.screenshot({ path: file, fullPage: true, type: "png" });
  note(nn, slug, input, change, dim);
  console.log("WROTE", file);
}

async function evalX(page, fn) {
  return page.evaluate(fn);
}

async function waitUi(page) {
  await page.waitForFunction(() => window.__XIMIAN__ && document.getElementById("app"), { timeout: 8000 });
}

async function enter(page) {
  await waitUi(page);
  await evalX(page, () => {
    if (document.getElementById("title-layer")) window.__XIMIAN__.enter();
  });
  await page.waitForFunction(() => {
    const app = document.getElementById("app");
    return app && (app.classList.contains("show") || app.style.display === "block");
  }, { timeout: 8000 });
  await new Promise((r) => setTimeout(r, 200));
}

async function fresh(browser) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1600, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await page.evaluate(() => {
    try { localStorage.removeItem("ximian-state"); } catch (e) {}
    try { localStorage.removeItem("ximian-state-en"); } catch (e) {}
  });
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 20000 });
  await waitUi(page);
  return page;
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--hide-scrollbars", "--disable-gpu", "--no-first-run"],
  });

  try {
    // 01 boot
    let page = await fresh(browser);
    await shot(page, "01", "boot-first-screen",
      "打开 index.html，未点进站",
      "进站静帧+锁句+进站钮。未见词袋成句。",
      "D1 D2");

    // enter → 席面扫描 + 著录台
    await enter(page);
    await shot(page, "02", "core-verb",
      "点进站。默认席面扫描。横幅人名可点。",
      "上为扫描席面热区，下为词袋/三格/不成组钮。",
      "D1 D6");
    await shot(page, "11", "empty-or-loading",
      "进站后未采词",
      "词袋显示袋空/Bag empty，三格虚线空槽，回传钮不成组。",
      "D5");
    await shot(page, "17", "banquet-pick-words",
      "进站后停在席面",
      "静帧上韩承志/林秋棠是下划线热区，图上读不出韩守山。",
      "D1 D6");
    await shot(page, "18", "three-slots-incomplete",
      "未填三格",
      "回传钮虚线灰，文案不成组/Incomplete，格子无对错色。",
      "D5 D11");
    await shot(page, "21", "footer-number",
      "席面页脚",
      "页脚是编号 23/36 文字，不是进度条。",
      "D2");

    // pick from still
    await evalX(page, () => {
      window.__XIMIAN__.pick("w-hcz");
      window.__XIMIAN__.pick("w-lqt");
    });
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "02b", "core-verb-picked",
      "点横幅韩承志、林秋棠",
      "词入袋成芯片；已采词划掉并标入袋；谁格标签出现。",
      "D6");

    // intro
    await evalX(page, () => window.__XIMIAN__.openRoute("intro"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "13", "intro-no-search",
      "点引言",
      "灰底说明书+白卡。无搜框。顶栏不是酒红婚庆。",
      "D1 D14");

    // public site
    await evalX(page, () => window.__XIMIAN__.openRoute("home"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "14", "public-wine-chrome",
      "点首页",
      "酒红顶栏、仿宋/金线、土导航。无站内搜框。",
      "D1 D3");

    // weiji scan
    await evalX(page, () => window.__XIMIAN__.openRoute("att-weiji"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "15", "scan-weiji",
      "点病危",
      "扫描灰底+SCAN 条+通知书静帧。与酒红壳、米色台可分。",
      "D1");

    // contract scan
    await evalX(page, () => window.__XIMIAN__.openRoute("att-hetong"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "22", "contract-scan",
      "打开合同扫描页",
      "仍是扫描皮；正文可采韩守山/按原档开席。",
      "D1 D6");

    // desk page — empty beige (D13: 16 ≠ 10 ≠ 19)
    await evalX(page, () => window.__XIMIAN__.openRoute("desk"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "16", "desk-beige",
      "进站后点著录台，未采词未填格",
      "米色工位顶栏+句卡；回传钮虚线不成组；袋空。",
      "D1 D2");

    await evalX(page, () => {
      window.__XIMIAN__.pick("w-hcz");
      window.__XIMIAN__.pick("w-lqt");
      window.__XIMIAN__.openRoute("att-hetong");
      window.__XIMIAN__.pick("w-hss");
      window.__XIMIAN__.pick("w-yuandang");
      window.__XIMIAN__.openRoute("cases-01");
      window.__XIMIAN__.pick("w-yuanman");
      window.__XIMIAN__.openRoute("desk");
      window.__XIMIAN__.fillSlot("who", "w-hcz");
      window.__XIMIAN__.fillSlot("whom", "w-hss");
      window.__XIMIAN__.fillSlot("did", "w-yuandang");
    });
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "19", "three-slots-ready",
      "三格填 韩承志/韩守山/按原档开席（未回传）",
      "回传钮双线+下划线+回传台账。三格齐了。",
      "D5 D11");

    await evalX(page, () => {
      window.__XIMIAN__.fillSlot("whom", null);
      window.__XIMIAN__.fillSlot("did", null);
      window.__XIMIAN__.fillSlot("whom", "w-lqt");
      window.__XIMIAN__.fillSlot("did", "w-yuanman");
    });
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "10", "non-color-state",
      "同一相机改填 韩承志/林秋棠/圆满（未回传）",
      "非唯色齐了：双线+下划线+回传台账。独立于虚线不成组和打回页。",
      "D7 D11");

    await evalX(page, () => window.__XIMIAN__.submit());
    await new Promise((r) => setTimeout(r, 200));
    await shot(page, "04", "near-fail",
      "回传错误句 韩承志/林秋棠/圆满",
      "打回页+整句对不上。格子不标对错色。可改。不是批准打回。",
      "D6 D5");

    await evalX(page, () => {
      document.getElementById("btn-approve").click();
    });
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "20", "approve-bounced",
      "在打回页点批准开席",
      "消息为权限只到建议。批不了开席。独立于整句对不上。",
      "D6");

    await evalX(page, () => {
      window.__XIMIAN__.fillSlot("did", null);
    });
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "05", "recovery",
      "打回后清空做什么格",
      "钮回到不成组。词仍在袋。可继续。",
      "D5");

    await page.close();
    page = await fresh(browser);
    await enter(page);
    await evalX(page, () => window.__XIMIAN__.openRoute("desk"));
    await new Promise((r) => setTimeout(r, 150));
    await evalX(page, () => document.getElementById("btn-approve").click());
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "12", "error-or-pause",
      "空著录台点批准开席",
      "权限只到建议。无暂停层。袋空不成组。与20不是同一张。",
      "D5 D6");

    // correct sentence on this fresh session: must pick before fill
    await evalX(page, () => {
      window.__XIMIAN__.pick("w-hcz");
      window.__XIMIAN__.openRoute("att-hetong");
      window.__XIMIAN__.pick("w-hss");
      window.__XIMIAN__.pick("w-yuandang");
      window.__XIMIAN__.openRoute("desk");
      window.__XIMIAN__.fillSlot("who", "w-hcz");
      window.__XIMIAN__.fillSlot("whom", "w-hss");
      window.__XIMIAN__.fillSlot("did", "w-yuandang");
    });
    await new Promise((r) => setTimeout(r, 150));
    await evalX(page, () => window.__XIMIAN__.submit());
    await new Promise((r) => setTimeout(r, 250));
    const afterSubmit = await evalX(page, () => ({
      ending: window.__XIMIAN__.state.flags.ending,
      msg: window.__XIMIAN__.state.lastMessage,
      wage: window.__XIMIAN__.state.wage,
      slots: window.__XIMIAN__.state.slots,
    }));
    console.log("SUBMIT", JSON.stringify(afterSubmit));
    await shot(page, "03", "success-feedback",
      "回传正确句 韩承志/韩守山/按原档开席",
      "回传页+建议栏有句+工钱36。工号不在签字栏。",
      "D6 D5");

    // keyboard focus — new session
    await page.close();
    page = await fresh(browser);
    await enter(page);
    await page.focus("#btn-submit");
    await shot(page, "07", "keyboard-focus",
      "进站后焦点落到不成组钮",
      "焦点描边可见，顺序与屏幕一致。",
      "D11");

    // reduced motion
    await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
    await evalX(page, () => window.__XIMIAN__.pick("w-hcz"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "09", "muted-or-reduced-motion",
      "减弱动效后采韩承志",
      "词仍入袋，无闪烁动画。主反馈是入袋芯片。",
      "D11 D6");

    // 320
    await page.close();
    page = await fresh(browser);
    await page.setViewport({ width: 320, height: 900, deviceScaleFactor: 1 });
    await enter(page);
    await shot(page, "06", "narrow-320",
      "视口 320 CSS px 进站",
      "横幅热区、词袋、三格、回传钮仍可点，无横向丢失。",
      "D9");

    // 390 touch
    await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
    await evalX(page, () => window.__XIMIAN__.pick("w-hcz"));
    await new Promise((r) => setTimeout(r, 150));
    await shot(page, "08", "touch-targets",
      "390 宽点韩承志",
      "热区与芯片高度≥44px，不靠 hover。",
      "D9 D11");

    await page.close();
  } finally {
    await browser.close();
  }

  const logFile = path.join(outDir, `shot-log-${mode}.json`);
  fs.writeFileSync(logFile, JSON.stringify(log, null, 2));
  console.log("LOG", logFile, "count", log.length);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
