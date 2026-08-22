const fs = require("fs");
const path = require("path");
const vm = require("vm");
const root = __dirname;

const code = ["js/data.js", "js/pages-a.js", "js/pages-b.js"]
  .map((f) => fs.readFileSync(path.join(root, f), "utf8"))
  .join("\n");
const sandbox = { window: {}, console };
sandbox.window = sandbox;
vm.runInNewContext(code, sandbox);
const GAME = sandbox.GAME || sandbox.window.GAME;

const cssVer = "4";
const css = fs.readdirSync(path.join(root, "css")).filter((f) => f.endsWith(".css"));
const cssOrdered = css.filter((f) => f !== "common.css").sort().concat("common.css");
const links = cssOrdered.map((f) => `  <link rel="stylesheet" href="css/${f}?v=${cssVer}">`).join("\n");

function stub(key) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Classmates Online</title>
${links}
</head>
<body>
  <noscript><p>This local archive-investigation game needs JavaScript. Allow scripts and open the page again.</p></noscript>
  <script>window.PAGE_KEY = ${JSON.stringify(key)};</script>
  <script src="js/data.js?v=${cssVer}"></script>
  <script src="js/pages-a.js?v=${cssVer}"></script>
  <script src="js/pages-b.js?v=${cssVer}"></script>
  <script src="js/engine.js?v=${cssVer}"></script>
</body>
</html>
`;
}

Object.keys(GAME.pages).forEach((key) => {
  const page = GAME.pages[key];
  const file = page.file || key + ".html";
  fs.writeFileSync(path.join(root, file), stub(key));
});

const h = {
  esc: (s) => String(s),
  has: () => true,
  searchForm: () => "",
  flash: () => "",
  state: { large: false, reduce: false, unlocked: Object.keys(GAME.pages), hintLevel: 0, hintKey: "" },
  a: (id, label) => label
};

let han = 0;
const per = [];
Object.keys(GAME.pages).forEach((key) => {
  const page = GAME.pages[key];
  let html = "";
  try {
    html = typeof page.html === "function" ? page.html(h) : page.html || "";
  } catch (e) {
    per.push({ key, error: String(e) });
    return;
  }
  const text = html.replace(/<[^>]+>/g, "");
  const n = (text.match(/[\u4e00-\u9fff]/g) || []).length;
  han += n;
  per.push({ key, no: page.no || "-", han: n, skin: page.skin });
});

const footer = "已打开编号页本站为虚构调查游戏勿对照现实机构或个人说明";
const footerHan = (footer.match(/[\u4e00-\u9fff]/g) || []).length;
han += footerHan * Object.keys(GAME.pages).length;
const numbered = Object.values(GAME.pages).filter((p) => p.no).length;
const kq = GAME.keywords.filter((k) => !k.forbidden).reduce((n, k) => n + k.queries.length, 0);
const have = {};
GAME.meta.publicPages.forEach((id) => { have["page:" + id] = true; });
let remaining = GAME.puzzles.slice();
let guard = 0;
let progressed = true;
const reachable = [];
while (progressed && guard++ < 80) {
  progressed = false;
  remaining = remaining.filter((p) => {
    const ok = (p.inputs || []).every((t) => have[t]);
    if (!ok) return true;
    (p.outputs || []).forEach((o) => { have[o] = true; });
    (p.unlocks || []).forEach((u) => { have["page:" + u] = true; });
    reachable.push(p.id);
    progressed = true;
    return false;
  });
}
const blocked = remaining.map((p) => p.id);
const over300 = per.filter((p) => p.no !== "-" && p.han >= 300).length;
const short = per.filter((p) => p.no !== "-" && p.han < 200).length;
fs.writeFileSync(
  path.join(root, "volume-report.json"),
  JSON.stringify({ numbered, keywords: kq, han, over300, short, blocked, reachable, per }, null, 2)
);
console.log(JSON.stringify({ files: Object.keys(GAME.pages).length, numbered, keywords: kq, han, over300, short, blocked }, null, 2));
