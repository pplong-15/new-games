const fs = require("fs");
const path = require("path");
const { chromium } = require("playwright-core");

const root = __dirname;
const out = path.join(root, "screenshots");
const browserPath = process.env.ZHENSHAN_CHROMIUM || "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-head-shell";
const fallbackBrowserPath = "/Users/Zhuanz/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell";

const pages = [
  {
    id: "01-xici-2000",
    label: "西祠胡同 2000 年入口快照",
    kind: "年代真样本",
    url: "https://web.archive.org/web/20000407114312/http://xici.net/",
  },
  {
    id: "02-xys-2002",
    label: "新语丝 2002 年首页快照",
    kind: "年代真样本",
    url: "https://web.archive.org/web/20020122171433/http://www.xys.org/",
  },
  {
    id: "03-folklore-2004",
    label: "中国民俗学网 2004 年首页快照",
    kind: "年代真样本",
    url: "https://web.archive.org/web/20040603193701/http://www.chinesefolklore.org.cn/index1.htm",
  },
  {
    id: "04-cn-dos-forum",
    label: "中国 DOS 联盟论坛真实主题页",
    kind: "业务真样本，布局沿用旧论坛语法",
    url: "https://www.cn-dos.net/forum/viewthread.php?tid=71161",
  },
  {
    id: "05-zhejiang-republic-archive",
    label: "浙江档案数据库民国档案页",
    kind: "业务真样本",
    url: "https://zjdy.zjdafw.gov.cn/col/col8/index.html",
  },
  {
    id: "06-ngac-catalog-search",
    label: "全国地质资料馆目录检索",
    kind: "业务真样本",
    url: "https://www.ngac.cn/125cms/c/qggnew/zljs.htm",
  },
  {
    id: "07-zbook-geology-system",
    label: "全国地质资料馆业务系统案例页",
    kind: "真实业务软件公开案例",
    url: "https://www.zbooksoft.com/2022/03/21/ngacarchivesystem/",
  },
  {
    id: "08-national-library-newspaper-guide",
    label: "国家图书馆全国报刊索引介绍页",
    kind: "官方业务说明与真实界面截图来源",
    url: "https://www.nlc.cn/web/ziyuanfuwu/ziyuantuijian/sjksx/20260327_2652221.shtml",
  },
  {
    id: "09-beijing-archive-announcement",
    label: "北京数字档案馆开放档案查询系统公告",
    kind: "官方业务说明与真实界面截图来源",
    url: "https://www.bjhr.gov.cn/zt/hrqdag/sjjs/202511/t20251121_4291901.html",
  },
  {
    id: "10-newsmth-section",
    label: "水木社区真实分区页",
    kind: "业务真样本，保留BBS兼容层",
    url: "https://att.newsmth.net/nForum/section/0",
  },
  {
    id: "11-chinese-folklore-sitemap",
    label: "中国民俗学网真实网站地图",
    kind: "业务真样本，栏目与运营生态",
    url: "https://www.chinesefolklore.org.cn/web/index.php?act=show_website_map",
  },
  {
    id: "12-xinyusi-current",
    label: "新语丝长期存活的旧架构",
    kind: "业务真样本，旧站连续性",
    url: "https://www.xinyusi.org/",
  },
  {
    id: "13-peoples-daily-paper",
    label: "人民日报电子报真实版面入口",
    kind: "业务真样本，版次与整版语法",
    url: "https://paper.people.com.cn/rmrb/paperindex.htm",
  },
  {
    id: "14-geology-map-portal",
    label: "全国地质资料馆地图门户",
    kind: "业务真样本，专业工具与空结果",
    url: "https://www.webmap.cn/ddGeoportal/geoportalMap.html?t=1&typeId=2",
  },
  {
    id: "15-geology-library",
    label: "中国地质图书馆真实机构门户",
    kind: "业务真样本，机构资源膨胀与外链",
    url: "https://www.cgl.org.cn/index.asp",
  },
];

async function main() {
  fs.mkdirSync(out, { recursive: true });
  const executablePath = fs.existsSync(browserPath) ? browserPath : fallbackBrowserPath;
  const browser = await chromium.launch({ headless: true, executablePath });
  const results = [];
  for (const item of pages) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
      ignoreHTTPSErrors: true,
      locale: "zh-CN",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/127 Safari/537.36",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(`pageerror:${String(error)}`));
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(`console:${message.text()}`);
    });
    let status = null;
    let captureError = null;
    try {
      const response = await page.goto(item.url, { waitUntil: "domcontentloaded", timeout: 45000 });
      status = response ? response.status() : null;
      await page.waitForTimeout(5000);
      await page.screenshot({ path: path.join(out, `${item.id}.png`), fullPage: false });
    } catch (error) {
      captureError = String(error);
      try {
        await page.screenshot({ path: path.join(out, `${item.id}-error.png`), fullPage: false });
      } catch {}
    }
    const snapshot = await page.evaluate(() => ({
      title: document.title,
      finalUrl: location.href,
      text: document.body ? document.body.innerText.replace(/\s+/g, " ").slice(0, 240) : "",
    })).catch(() => ({ title: "", finalUrl: page.url(), text: "" }));
    results.push({ ...item, ...snapshot, httpStatus: status, captureError, runtimeErrors: errors.slice(0, 10) });
    await context.close();
  }
  await browser.close();
  fs.writeFileSync(path.join(root, "capture-results.json"), JSON.stringify({ capturedAt: new Date().toISOString(), results }, null, 2));
  console.log(JSON.stringify({ captures: results.length, failures: results.filter((x) => x.captureError).map((x) => x.id) }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
