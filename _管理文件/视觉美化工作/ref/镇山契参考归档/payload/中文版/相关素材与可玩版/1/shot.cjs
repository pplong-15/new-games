#!/usr/bin/env node
// 用 Chrome headless 对游戏 hash 路由做截图
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const GAME = process.argv[2] || path.join(__dirname, "game-v0.3.html");
const OUT = path.join(__dirname, "shots");
fs.mkdirSync(OUT, { recursive: true });

const routes = process.argv.slice(3); // 每行一个: "name|#/route"
const size = process.env.SHOT_SIZE || "1440,900";
const [w, h] = size.split(",").map(Number);

for (const spec of routes) {
  const [name, route] = spec.split("|");
  const url = encodeURI("file://" + GAME) + (route || "");
  const file = path.join(OUT, name + ".png");
  try {
    execFileSync(CHROME, [
      "--headless=new",
      "--disable-gpu",
      "--no-sandbox",
      "--hide-scrollbars",
      "--force-device-scale-factor=1",
      `--window-size=${w},${h}`,
      "--virtual-time-budget=4000",
      "--timeout=8000",
      "--screenshot=" + file,
      url,
    ], { stdio: "pipe" });
    console.log("OK", name);
  } catch (e) {
    console.log("FAIL", name, String(e.message).slice(0, 200));
  }
}
