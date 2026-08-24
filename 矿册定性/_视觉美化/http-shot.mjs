#!/usr/bin/env node
/**
 * Local-http Chrome CDP screenshots. Origin only 127.0.0.1.
 * Usage: node http-shot.mjs <phase>
 *   phase = before | after
 */
import { spawn } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import http from "node:http";

const PHASE = process.argv[2] === "after" ? "" : "-before";
const CHROME =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const DEBUG_PORT = 9339;
const ROOT = "/Users/jianglong/Desktop/github游戏/游戏库/矿册定性";
const USER_DIR = `/tmp/kc-polish-chrome-${Date.now()}`;

const ZH = "http://127.0.0.1:8826";
const EN = "http://127.0.0.1:8827";
const OUT_ZH = join(ROOT, "visual/名册定性网页调查/polish-20260823-zh");
const OUT_EN = join(ROOT, "visual/名册定性网页调查/polish-20260823-en");

const TRUTH = {
  huo: "down",
  weng: "down",
  shang: "down",
  ning: "wrong",
  qu: "surface",
  xing: "surface",
  tan: "surface",
  lan: "moved",
  yin: "moved",
  ge: "wrong",
};
const LEGEND = { ...TRUTH, ning: "down" };
const ERASE = { ...TRUTH, huo: "surface" };
const PARTIAL = { huo: "down", weng: "down", shang: "down" };

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

function getJson(url) {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        let d = "";
        res.on("data", (c) => (d += c));
        res.on("end", () => {
          try {
            resolve(JSON.parse(d));
          } catch (e) {
            reject(new Error(d.slice(0, 200)));
          }
        });
      })
      .on("error", reject);
  });
}

async function cdpSend(ws, id, method, params) {
  const msg = { id, method, params: params || {} };
  ws.send(JSON.stringify(msg));
  return new Promise((resolve, reject) => {
    const onMsg = (ev) => {
      const data = JSON.parse(typeof ev.data === "string" ? ev.data : ev.data.toString());
      if (data.id === id) {
        ws.removeEventListener("message", onMsg);
        if (data.error) reject(new Error(method + " " + JSON.stringify(data.error)));
        else resolve(data.result || {});
      }
    };
    ws.addEventListener("message", onMsg);
  });
}

async function withTarget(fn) {
  const list = await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/list`);
  const page = list.find((t) => t.type === "page") || list[0];
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  let id = 1;
  const send = (method, params) => cdpSend(ws, id++, method, params);
  await send("Page.enable");
  await send("Runtime.enable");
  await send("DOM.enable");
  try {
    return await fn(send);
  } finally {
    ws.close();
  }
}

async function setViewport(send, width, height, mobile) {
  await send("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: mobile ? 2 : 1,
    mobile: !!mobile,
  });
}

async function nav(send, url) {
  const navResult = await send("Page.navigate", { url });
  for (let i = 0; i < 40; i++) {
    const ready = await send("Runtime.evaluate", {
      expression: "document.readyState",
      returnByValue: true,
    });
    if (ready.result && ready.result.value === "complete") break;
    await sleep(50);
  }
  await sleep(180);
  return navResult;
}

async function shot(send, dest, fullPage) {
  mkdirSync(dirname(dest), { recursive: true });
  const clip = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: !!fullPage,
    fromSurface: true,
  });
  writeFileSync(dest, Buffer.from(clip.data, "base64"));
}

async function evalJs(send, expression) {
  const r = await send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (r.exceptionDetails) {
    throw new Error(JSON.stringify(r.exceptionDetails));
  }
  return r.result && r.result.value;
}

async function setStorage(send, origin, items) {
  await nav(send, origin + "/introduction.html");
  const js =
    "(() => {" +
    Object.entries(items)
      .map(([k, v]) => {
        if (v === null) return `localStorage.removeItem(${JSON.stringify(k)});`;
        return `localStorage.setItem(${JSON.stringify(k)}, ${JSON.stringify(v)});`;
      })
      .join("") +
    " return true; })()";
  await evalJs(send, js);
}

async function measureRoster(send) {
  return evalJs(
    send,
    `(() => {
      const labels = [...document.querySelectorAll(".goes label")];
      const rows = [...document.querySelectorAll("#reg-body tr")];
      const form = document.querySelector("#search-form");
      const input = document.querySelector("#search-input, #search-form input[name='q']");
      const btn = document.querySelector("#search-form button");
      const ghost = document.querySelector(".ghost-btn");
      const box = (el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
      };
      return {
        rowCount: rows.length,
        labelCount: labels.length,
        labelMinH: labels.length ? Math.min(...labels.map((l) => l.getBoundingClientRect().height)) : 0,
        labelMinW: labels.length ? Math.min(...labels.map((l) => l.getBoundingClientRect().width)) : 0,
        overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        scrollW: document.documentElement.scrollWidth,
        clientW: document.documentElement.clientWidth,
        viewport: { w: innerWidth, h: innerHeight },
        searchForm: box(form),
        searchInput: box(input),
        searchBtn: box(btn),
        ghost: box(ghost),
        firstLabel: box(labels[0]),
        lastLabel: box(labels[labels.length - 1]),
      };
    })()`
  );
}

function out(lang, slug) {
  const dir = lang === "zh" ? OUT_ZH : OUT_EN;
  return join(dir, slug + PHASE + ".png");
}

async function runLang(send, lang) {
  const origin = lang === "zh" ? ZH : EN;
  const marksKey = lang === "zh" ? "kc_marks" : "kc_marks-en";
  const endKey = lang === "zh" ? "kc_end" : "kc_end-en";
  const seenKey = lang === "zh" ? "kc_seen" : "kc_seen-en";
  const hitQ = lang === "zh" ? "霍成山" : "HuoChengshan";
  const missQ = lang === "zh" ? "不存在的词" : "NoSuchToken";
  const forbQ = lang === "zh" ? "开棺" : "OpenCoffin";
  const measures = {};

  await send("Emulation.setEmulatedMedia", { media: "screen", features: [] });
  await setViewport(send, 1280, 800, false);

  await setStorage(send, origin, {
    [marksKey]: null,
    [endKey]: null,
    [seenKey]: "{}",
  });

  await nav(send, origin + "/introduction.html");
  await shot(send, out(lang, "01-boot-first-screen"), false);
  await shot(send, out(lang, "13-intro-no-search"), false);

  await nav(send, origin + "/office/index.html");
  await shot(send, out(lang, "14-public-nav-search"), false);

  await nav(send, origin + "/office/register.html");
  await shot(send, out(lang, "02-core-verb"), false);
  await shot(send, out(lang, "25-roster-ten-four"), true);

  await evalJs(
    send,
    `document.querySelector("input[name='r-huo'][value='down']")?.click(); true`
  );
  await shot(send, out(lang, "10-non-color-state"), false);

  for (let t = 0; t < 6; t++) {
    await send("Input.dispatchKeyEvent", {
      type: "keyDown",
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
      nativeVirtualKeyCode: 9,
    });
    await send("Input.dispatchKeyEvent", {
      type: "keyUp",
      key: "Tab",
      code: "Tab",
      windowsVirtualKeyCode: 9,
      nativeVirtualKeyCode: 9,
    });
  }
  await sleep(80);
  await shot(send, out(lang, "07-keyboard-focus"), false);

  await nav(send, origin + "/search-results.html?q=" + encodeURIComponent(hitQ));
  await shot(send, out(lang, "16-search-hit-newpage"), false);

  await nav(send, origin + "/search-results.html?q=" + encodeURIComponent(missQ));
  await shot(send, out(lang, "17-search-miss"), false);

  await nav(send, origin + "/search-results.html?q=");
  await shot(send, out(lang, "11-empty-or-loading"), false);

  await nav(send, origin + "/search-results.html?q=" + encodeURIComponent(forbQ));
  await shot(send, out(lang, "18-forbidden"), false);

  await nav(send, origin + "/anjian/index.html");
  await shot(send, out(lang, "20-two-source-gov"), false);

  await nav(send, origin + "/news/index.html");
  await shot(send, out(lang, "21-two-source-news"), false);

  await nav(send, origin + "/forum/index.html");
  await shot(send, out(lang, "15-embedded-forum"), false);

  await nav(send, origin + "/union/fuxu.html");
  await shot(send, out(lang, "19-archive-dossier"), false);

  await nav(send, origin + "/mail/index.html");
  await shot(send, out(lang, "22-mail-skin"), false);

  await nav(send, origin + "/temple/index.html");
  await shot(send, out(lang, "23-temple-corp"), false);

  await nav(send, origin + "/museum/index.html");
  await shot(send, out(lang, "24-museum-baike"), false);

  await nav(send, origin + "/office/memo.html");
  await shot(send, out(lang, "31-memo-four-slips"), true);

  await nav(send, origin + "/anjian/shift.html");
  await shot(send, out(lang, "32-still-no-token"), false);

  await setStorage(send, origin, {
    [marksKey]: JSON.stringify(PARTIAL),
    [endKey]: null,
  });
  await nav(send, origin + "/office/submit.html");
  await evalJs(send, `document.getElementById("send-btn")?.click(); true`);
  await sleep(80);
  await shot(send, out(lang, "12-error-or-pause"), false);
  await shot(send, out(lang, "26-submit-empty-warn"), false);
  await nav(send, origin + "/office/register.html");
  await shot(send, out(lang, "05-recovery"), false);

  await setStorage(send, origin, {
    [marksKey]: JSON.stringify(TRUTH),
    [endKey]: "adopt",
    [seenKey]: JSON.stringify({ leave: 1, shift: 1, fuxu: 1 }),
  });
  await nav(send, origin + "/office/result.html");
  await shot(send, out(lang, "03-success-feedback"), false);
  await shot(send, out(lang, "27-adopt-receipt"), false);

  await setStorage(send, origin, {
    [marksKey]: JSON.stringify(LEGEND),
    [endKey]: "legend",
    [seenKey]: JSON.stringify({ legend: 1, stele: 1 }),
  });
  await nav(send, origin + "/office/result.html");
  await shot(send, out(lang, "04-near-fail"), false);
  await shot(send, out(lang, "28-legend-receipt"), false);

  await setStorage(send, origin, {
    [marksKey]: JSON.stringify(ERASE),
    [endKey]: "erase",
    [seenKey]: JSON.stringify({ shift: 1, fuxu: 1 }),
  });
  await nav(send, origin + "/office/result.html");
  await shot(send, out(lang, "29-erase-receipt"), false);

  await setStorage(send, origin, {
    [marksKey]: JSON.stringify(PARTIAL),
    [endKey]: null,
  });
  await nav(send, origin + "/office/register.html");
  await shot(send, out(lang, "30-old-save-restore"), false);

  await send("Emulation.setEmulatedMedia", {
    media: "screen",
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
  await nav(send, origin + "/union/index.html");
  await shot(send, out(lang, "09-muted-or-reduced-motion"), false);
  await send("Emulation.setEmulatedMedia", { media: "screen", features: [] });

  await setViewport(send, 320, 640, true);
  await setStorage(send, origin, { [marksKey]: JSON.stringify(PARTIAL) });
  await nav(send, origin + "/office/register.html");
  await shot(send, out(lang, "06-narrow-320"), true);
  measures.roster320 = await measureRoster(send);

  await nav(send, origin + "/office/index.html");
  await shot(send, out(lang, "06b-desk-320"), false);

  await setViewport(send, 390, 844, true);
  await nav(send, origin + "/office/register.html");
  await shot(send, out(lang, "08-touch-targets"), true);
  measures.roster390 = await measureRoster(send);

  await nav(send, origin + "/introduction.html");
  await shot(send, out(lang, "08b-intro-390"), false);

  await setViewport(send, 1280, 800, false);
  return measures;
}

async function main() {
  const chrome = spawn(
    CHROME,
    [
      `--remote-debugging-port=${DEBUG_PORT}`,
      `--user-data-dir=${USER_DIR}`,
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--hide-scrollbars",
      "--window-size=1280,800",
      "about:blank",
    ],
    { stdio: "ignore" }
  );
  try {
    for (let i = 0; i < 40; i++) {
      try {
        await getJson(`http://127.0.0.1:${DEBUG_PORT}/json/version`);
        break;
      } catch {
        if (i === 39) throw new Error("chrome debug port not up");
        await sleep(100);
      }
    }
    const report = await withTarget(async (send) => {
      const zh = await runLang(send, "zh");
      const en = await runLang(send, "en");
      return { zh, en };
    });
    const reportPath = join(
      ROOT,
      "_视觉美化",
      PHASE ? "measure-before.json" : "measure-after.json"
    );
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log("wrote", reportPath);
    console.log(JSON.stringify(report, null, 2));
  } finally {
    chrome.kill("SIGKILL");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
