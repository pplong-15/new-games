const path = require("path");
const { pathToFileURL } = require("url");
const { chromium } = require("playwright-core");

const root = __dirname;
const html = path.join(root, "00_先打开_真实网页素材审核板.html");
const primary = "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-head-shell";
const fallback = "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell";

async function inspect(browser, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, acceptDownloads: true });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(`pageerror:${String(error)}`));
  page.on("console", (message) => { if (message.type() === "error") errors.push(`console:${message.text()}`); });
  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  const metrics = await page.evaluate(() => ({
    title: document.title,
    cards: document.querySelectorAll("[data-id]").length,
    images: document.images.length,
    brokenImages: [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.getAttribute("src")),
    externalLinks: [...document.querySelectorAll('a[href^="http"]')].length,
    overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
    decisions: document.querySelectorAll("[data-decision]").length,
    notes: document.querySelectorAll("[data-note]").length,
  }));
  await context.close();
  return { width, height, ...metrics, errors };
}

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: require("fs").existsSync(primary) ? primary : fallback });
  const results = [await inspect(browser, 1440, 1000), await inspect(browser, 390, 844)];
  await browser.close();
  const failures = results.flatMap((r) => [
    ...(r.brokenImages.length ? [`${r.width}:broken-images:${r.brokenImages.join(",")}`] : []),
    ...(r.errors.length ? [`${r.width}:errors:${r.errors.join("|")}`] : []),
    ...(r.overflow > 1 ? [`${r.width}:overflow:${r.overflow}`] : []),
    ...(r.cards !== r.decisions || r.cards !== r.notes ? [`${r.width}:review-control-count`] : []),
  ]);
  console.log(JSON.stringify({ status: failures.length ? "REWORK" : "PASS", failures, results }, null, 2));
  if (failures.length) process.exitCode = 1;
})().catch((error) => { console.error(error); process.exitCode = 1; });
