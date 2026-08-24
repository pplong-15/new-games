import { spawn } from "child_process";
import { writeFileSync, mkdirSync, copyFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const ROOT = "/Users/jianglong/Desktop/新游戏3/过门路单";
const ZH = "http://127.0.0.1:8856/";
const EN = "http://127.0.0.1:8857/";
const OUT_ZH = join(ROOT, "visual/html-game-rule-horror/驾驶座多份公文互斥压单/polish-20260824-zh");
const OUT_EN = join(ROOT, "visual/html-game-rule-horror/驾驶座多份公文互斥压单/polish-20260824-en");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9223;

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

async function getWs() {
  const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
  const j = await res.json();
  return j.webSocketDebuggerUrl;
}

function rpc(ws, id, method, params = {}) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout " + method)), 8000);
    const onmsg = (ev) => {
      const msg = JSON.parse(ev.data.toString());
      if (msg.id === id) {
        clearTimeout(t);
        ws.removeEventListener("message", onmsg);
        if (msg.error) reject(new Error(method + " " + JSON.stringify(msg.error)));
        else resolve(msg.result || {});
      }
    };
    ws.addEventListener("message", onmsg);
    ws.send(JSON.stringify({ id, method, params }));
  });
}

async function evalJs(ws, id, expr) {
  try {
    const r = await rpc(ws, id, "Runtime.evaluate", {
      expression: expr,
      awaitPromise: false,
      returnByValue: true
    });
    if (r.exceptionDetails) {
      var d = r.exceptionDetails;
      console.error("eval exception", (d.exception && d.exception.description) || d.text);
      return null;
    }
    return r.result && r.result.value;
  } catch (e) {
    console.error("evalJs fail", String(expr).slice(0, 80), e.message);
    return null;
  }
}

async function shot(ws, id, file, full = true) {
  mkdirSync(dirname(file), { recursive: true });
  const r = await rpc(ws, id, "Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false
  });
  writeFileSync(file, Buffer.from(r.data, "base64"));
}

const SETUP = {
  boot: `localStorage.removeItem("guomen-state"); location.reload();`,
  enter: `
    localStorage.removeItem("guomen-state");
    location.reload();
  `,
};

function afterLoadEnter() {
  return `
    (function(){
      var G = window.__GUOMEN__;
      if (G && G.replay) G.replay();
      if (G) G.enter();
      return !!(document.getElementById("desk") && document.getElementById("desk").classList.contains("show"));
    })()
  `;
}

function night5() {
  return `
    (function(){
      var G = window.__GUOMEN__;
      var E = window.GUOMEN_ENGINE;
      if (G.replay) G.replay();
      G.enter();
      G.setNight(5);
      if (E.lookMirror) E.lookMirror();
      G.clickClause("fleet-listen");
      G.clickClause("slip-sang");
      G.clickClause("sms-night");
      G.clickClause("pencil-zishi");
      G.setRole("xi");
      G.pickPress("xi_slip");
      var st = E.getState();
      return {night: st.night, ending: st.ending, papers: {
        pencil: document.getElementById("paper-pencil").style.display,
        slip: document.getElementById("paper-slip").style.display,
        sms: document.getElementById("paper-sms").style.display
      }};
    })()
  `;
}

function xiPass() {
  return `
    (function(){
      var G = window.__GUOMEN__;
      var E = window.GUOMEN_ENGINE;
      if (G.replay) G.replay();
      G.enter();
      var n;
      for (n = 1; n <= 7; n++) {
        G.setNight(n);
        if (n === 3 || n === 5 || n === 7) E.lookMirror();
        if (n === 4) { G.clickClause("fleet-listen"); G.clickClause("slip-sang"); }
        if (n === 5) { G.clickClause("sms-night"); G.clickClause("pencil-zishi"); }
        if (n === 6) E.noteOrder();
        if (n === 7) G.setRole("xi");
        G.pickPress(n >= 4 ? "xi_slip" : "fleet");
        E.holdStart();
        E.holdComplete();
        G.handKey();
      }
      return E.getState().ending;
    })()
  `;
}

function listenGuest() {
  return `
    (function(){
      var G = window.__GUOMEN__;
      var E = window.GUOMEN_ENGINE;
      if (G.replay) G.replay();
      G.enter();
      var n;
      for (n = 1; n <= 7; n++) {
        G.setNight(n);
        if (n === 3 || n === 5 || n === 7) E.lookMirror();
        G.pickPress("fleet");
        E.holdStart();
        E.holdComplete();
        G.handKey();
      }
      return E.getState().ending;
    })()
  `;
}

function recovery() {
  return `
    (function(){
      var G = window.__GUOMEN__;
      var E = window.GUOMEN_ENGINE;
      if (G.replay) G.replay();
      G.enter();
      G.setNight(4);
      G.clickClause("fleet-listen");
      G.clickClause("slip-xi");
      var msg1 = document.getElementById("msg").textContent;
      G.clickClause("fleet-listen");
      G.clickClause("slip-sang");
      return {msg1: msg1, msg2: document.getElementById("msg").textContent, pairs: window.GUOMEN_ENGINE.getState().pairMark};
    })()
  `;
}

async function nav(ws, seq, url) {
  await rpc(ws, seq++, "Page.enable");
  await rpc(ws, seq++, "Runtime.enable");
  await rpc(ws, seq++, "Network.enable");
  await rpc(ws, seq++, "Network.setCacheDisabled", { cacheDisabled: true });
  await rpc(ws, seq++, "Page.navigate", { url });
  await sleep(1000);
  await evalJs(ws, seq++, "true");
  return seq;
}

async function setView(ws, seq, w, h) {
  await rpc(ws, seq++, "Emulation.setDeviceMetricsOverride", {
    width: w, height: h, deviceScaleFactor: 1, mobile: w <= 400
  });
  await sleep(150);
  return seq;
}

async function runLocale(ws, seq, url, outDir, suffix) {
  const tag = suffix ? "-" + suffix : "";
  const shots = [];

  async function cap(name, w, h, setup, full) {
    console.log("shot", name + tag, url);
    seq = await nav(ws, seq, url);
    seq = await setView(ws, seq, w, h);
    if (setup) {
      try {
        const v = await evalJs(ws, seq++, setup);
        shots.push({ name, setup: true, v });
      } catch (e) {
        console.error("setup fail", name, e.message);
        shots.push({ name, setup: false, err: e.message });
      }
      await sleep(250);
    }
    const file = join(outDir, name + tag + ".png");
    await shot(ws, seq++, file, full !== false);
    shots.push({ file });
    return seq;
  }

  seq = await cap("01-boot-first-screen", 1280, 800, null, true);

  seq = await cap("02-core-verb", 1280, 900, `
    localStorage.removeItem("guomen-state");
    void 0;
  `, true);
  // enter after reload in same nav - need reload first
  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 900);
  await evalJs(ws, seq++, "localStorage.removeItem('guomen-state'); true");
  await evalJs(ws, seq++, afterLoadEnter());
  await evalJs(ws, seq++, "window.__GUOMEN__.clickClause('fleet-listen'); true");
  await sleep(200);
  await shot(ws, seq++, join(outDir, "02-core-verb" + tag + ".png"), true);

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 1100);
  await evalJs(ws, seq++, "localStorage.removeItem('guomen-state'); true");
  const endXi = await evalJs(ws, seq++, xiPass());
  await sleep(300);
  await shot(ws, seq++, join(outDir, "03-success-feedback" + tag + ".png"), true);
  shots.push({ xi: endXi });

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 1100);
  await evalJs(ws, seq++, "localStorage.removeItem('guomen-state'); true");
  const endG = await evalJs(ws, seq++, listenGuest());
  await sleep(300);
  await shot(ws, seq++, join(outDir, "04-near-fail" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "20-near-answer-points-text" + tag + ".png"), true);
  shots.push({ guest: endG });

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 1000);
  await evalJs(ws, seq++, "localStorage.removeItem('guomen-state'); true");
  const rec = await evalJs(ws, seq++, recovery());
  await sleep(200);
  await shot(ws, seq++, join(outDir, "05-recovery" + tag + ".png"), true);
  shots.push({ rec });

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 320, 720);
  await evalJs(ws, seq++, afterLoadEnter());
  await sleep(200);
  await shot(ws, seq++, join(outDir, "06-narrow-320" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "08-touch-targets" + tag + ".png"), true);

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 900);
  await evalJs(ws, seq++, afterLoadEnter());
  await evalJs(ws, seq++, "document.getElementById('btn-hold').focus(); true");
  await sleep(150);
  await shot(ws, seq++, join(outDir, "07-keyboard-focus" + tag + ".png"), true);

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 900);
  await rpc(ws, seq++, "Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }]
  });
  await evalJs(ws, seq++, afterLoadEnter());
  await evalJs(ws, seq++, "window.__GUOMEN__.pickPress('fleet'); window.GUOMEN_ENGINE.holdStart(); true");
  await sleep(200);
  await shot(ws, seq++, join(outDir, "09-muted-or-reduced-motion" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "10-non-color-state" + tag + ".png"), true);
  await evalJs(ws, seq++, "window.GUOMEN_ENGINE.cancelHold(); true");
  await rpc(ws, seq++, "Emulation.setEmulatedMedia", { features: [] });

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 800);
  await evalJs(ws, seq++, afterLoadEnter());
  await shot(ws, seq++, join(outDir, "11-empty-or-loading" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "21-night1-not-all-manuals" + tag + ".png"), true);
  await evalJs(ws, seq++, "document.getElementById('refuse-sms').click(); true");
  await sleep(150);
  await shot(ws, seq++, join(outDir, "12-error-or-pause" + tag + ".png"), true);

  seq = await nav(ws, seq, url);
  seq = await setView(ws, seq, 1280, 1400);
  await evalJs(ws, seq++, "localStorage.removeItem('guomen-state'); true");
  const n5 = await evalJs(ws, seq++, night5());
  await sleep(250);
  await shot(ws, seq++, join(outDir, "13-rules-side-by-side" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "14-paper-voice-diff" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "16-person-job-first-rule" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "17-four-papers" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "18-true-mutex-pair" + tag + ".png"), true);
  await shot(ws, seq++, join(outDir, "22-handoff-no-progress-bar" + tag + ".png"), true);
  shots.push({ n5 });

  await evalJs(ws, seq++, "window.GUOMEN_ENGINE.holdStart(); true");
  await sleep(200);
  await shot(ws, seq++, join(outDir, "15-group-submit" + tag + ".png"), true);
  await evalJs(ws, seq++, "window.GUOMEN_ENGINE.cancelHold(); true");

  await evalJs(ws, seq++, "document.body.classList.add('redact-copy'); true");
  await sleep(100);
  await shot(ws, seq++, join(outDir, "19-fake-mutex-qa" + tag + ".png"), true);
  await evalJs(ws, seq++, "document.body.classList.remove('redact-copy'); true");

  const sizes = await evalJs(ws, seq++, `
    (function(){
      var ids=["btn-enter","btn-hold","btn-key","fleet-listen","btn-mirror"];
      var o={};
      ids.forEach(function(id){
        var el=document.getElementById(id);
        if(!el){o[id]=null;return;}
        var r=el.getBoundingClientRect();
        o[id]={w:Math.round(r.width),h:Math.round(r.height)};
      });
      return o;
    })()
  `);
  shots.push({ sizes });
  return { seq, shots };
}

async function main() {
  mkdirSync(OUT_ZH, { recursive: true });
  mkdirSync(OUT_EN, { recursive: true });
  const chrome = spawn(CHROME, [
    "--headless=new",
    "--disable-gpu",
    `--remote-debugging-port=${PORT}`,
    "--window-size=1280,800",
    "--hide-scrollbars",
    "--no-first-run",
    "--user-data-dir=/tmp/guomen-chrome"
  ], { stdio: "ignore" });
  await sleep(900);
  try {
    const wsUrl = await getWs();
    const ws = new WebSocket(wsUrl);
    await new Promise((res, rej) => {
      ws.addEventListener("open", res);
      ws.addEventListener("error", rej);
    });
    let seq = 1;
    await rpc(ws, seq++, "Target.createTarget", { url: "about:blank" });
    const pages = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    const page = pages.find((p) => p.type === "page") || pages[0];
    ws.close();
    const pws = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((res) => pws.addEventListener("open", res));

    const afterCss = "/tmp/guomen-after.css";
    const beforeCss = "/tmp/guomen-before.css";
    const zhCss = join(ROOT, "中文版/css/guomen.css");
    const enCss = join(ROOT, "英文版/css/guomen.css");

    copyFileSync(beforeCss, zhCss);
    copyFileSync(beforeCss, enCss);
    const bzh = await runLocale(pws, 10, ZH, OUT_ZH, "before");
    const ben = await runLocale(pws, bzh.seq, EN, OUT_EN, "before");

    copyFileSync(afterCss, zhCss);
    copyFileSync(afterCss, enCss);
    const azh = await runLocale(pws, ben.seq, ZH, OUT_ZH, "");
    const aen = await runLocale(pws, azh.seq, EN, OUT_EN, "");

    writeFileSync("/tmp/guomen-capture-log.json", JSON.stringify({ bzh: bzh.shots, ben: ben.shots, azh: azh.shots, aen: aen.shots }, null, 2));
    console.log("xi", azh.shots.find((s) => s.xi), "guest", azh.shots.find((s) => s.guest));
    console.log("sizes", azh.shots.find((s) => s.sizes));
    pws.close();
  } finally {
    try {
      copyFileSync("/tmp/guomen-after.css", join(ROOT, "中文版/css/guomen.css"));
      copyFileSync("/tmp/guomen-after.css", join(ROOT, "英文版/css/guomen.css"));
    } catch (e) {}
    chrome.kill("SIGKILL");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
