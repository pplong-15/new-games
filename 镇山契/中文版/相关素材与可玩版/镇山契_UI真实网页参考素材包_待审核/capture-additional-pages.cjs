const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const root = __dirname;
const out = path.join(root, "screenshots", "additional");
const primary = "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-head-shell";
const fallback = "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell";

const pages = [
  ["23-xiamen-fish-2005", "厦门小鱼社区 2005", "https://web.archive.org/web/20050924171844/http://www.xmfish.com/"],
  ["24-old-beijing-2005", "老北京网 2005", "https://web.archive.org/web/20051231065753/http://www.oldbeijing.net/"],
  ["25-hakkaonline-2005", "客家风情 2005", "https://web.archive.org/web/20051225014229/http://www.hakkaonline.com/cms/"],
  ["26-yangpu-archive", "杨浦区档案馆目录检索", "https://www.shyp.gov.cn/zwgk/da/da/ggfw/kfdamlzx/"],
  ["27-geology-drilling-database", "全国重要地质钻孔数据库旧版", "https://www.cgsi.cn/cgsibiz/index.aspx"],
  ["28-newspapersg-microfilm", "NewspaperSG 缩微胶片浏览", "https://eresources.nlb.gov.sg/newspapers/browse/f81a4017-bb01-4faf-8b69-ae4cd08ffb17?focus=microfilm&reel=NL547"],
  ["29-trove-ocr", "Trove 报纸 OCR 页面", "https://trove.nla.gov.au/newspaper/article/278846475"],
];

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const executablePath = fs.existsSync(primary) ? primary : fallback;
  const browser = await chromium.launch({ headless: true, executablePath });
  const results = [];
  for (const [id, label, url] of pages) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      ignoreHTTPSErrors: true,
      locale: "zh-CN",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/127 Safari/537.36",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(`pageerror:${String(error)}`));
    page.on("console", (message) => { if (message.type() === "error") errors.push(`console:${message.text()}`); });
    let httpStatus = null;
    let captureError = null;
    try {
      const response = await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      httpStatus = response ? response.status() : null;
      await page.waitForTimeout(6000);
      await page.screenshot({ path: path.join(out, `${id}.png`), fullPage: false });
    } catch (error) {
      captureError = String(error);
      try { await page.screenshot({ path: path.join(out, `${id}-error.png`), fullPage: false }); } catch {}
    }
    const snapshot = await page.evaluate(() => ({ title: document.title, finalUrl: location.href, text: document.body ? document.body.innerText.replace(/\s+/g, " ").slice(0, 240) : "" })).catch(() => ({ title: "", finalUrl: page.url(), text: "" }));
    results.push({ id, label, url, ...snapshot, httpStatus, captureError, runtimeErrors: errors.slice(0, 12) });
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(root, "capture-additional-results.json"), JSON.stringify({ capturedAt: new Date().toISOString(), results }, null, 2));
  console.log(JSON.stringify({ captures: results.length, failures: results.filter((x) => x.captureError).map((x) => x.id) }, null, 2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
