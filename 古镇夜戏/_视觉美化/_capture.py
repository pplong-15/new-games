#!/usr/bin/env python3
"""HTTP Chrome CDP screenshots + control measures. Profile lives in /tmp and is deleted."""
from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import time
import urllib.parse
import urllib.request

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 8988
PROFILE = "/tmp/guxz-visual-8970"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "古镇夜戏网页解密")
MEASURES = os.path.join(os.path.dirname(__file__))
ZH = "http://127.0.0.1:8970"
EN = "http://127.0.0.1:8971"

PHASE = os.environ.get("GXZ_PHASE", "after")  # before | after


class CDP:
    def __init__(self, url: str):
        self.ws = create_connection(url, timeout=60)
        self._id = 0

    def call(self, method, params=None):
        self._id += 1
        payload = {"id": self._id, "method": method}
        if params is not None:
            payload["params"] = params
        self.ws.send(json.dumps(payload))
        while True:
            data = json.loads(self.ws.recv())
            if data.get("id") == self._id:
                if "error" in data:
                    raise RuntimeError(f"{method}: {data['error']}")
                return data.get("result") or {}

    def close(self):
        try:
            self.ws.close()
        except Exception:
            pass


def wait_port(port, tries=60):
    for _ in range(tries):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1)
            return
        except Exception:
            time.sleep(0.15)
    raise RuntimeError("CDP not ready")


def start_chrome():
    if os.path.isdir(PROFILE):
        shutil.rmtree(PROFILE, ignore_errors=True)
    os.makedirs(PROFILE, exist_ok=True)
    proc = subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={CDP_PORT}",
            f"--user-data-dir={PROFILE}",
            "--headless=new",
            "--disable-gpu",
            "--no-first-run",
            "--no-default-browser-check",
            "--hide-scrollbars",
            "--remote-allow-origins=*",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    wait_port(CDP_PORT)
    tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json/list"))
    page_tab = next(t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl"))
    page = CDP(page_tab["webSocketDebuggerUrl"])
    page.call("Page.enable")
    page.call("Runtime.enable")
    page.call("DOM.enable")
    page.call("CSS.enable")
    return proc, page


def js(page, expression, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {"expression": expression, "returnByValue": True, "awaitPromise": await_promise},
    )
    if r.get("exceptionDetails"):
        raise RuntimeError(str(r["exceptionDetails"]))
    return (r.get("result") or {}).get("value")


def set_view(page, w=1280, h=900):
    page.call(
        "Emulation.setDeviceMetricsOverride",
        {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": w <= 430},
    )


def go(page, url):
    page.call("Page.navigate", {"url": url})
    deadline = time.time() + 12
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.2)


def shot(page, dest):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    data = page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    with open(dest, "wb") as f:
        f.write(base64.b64decode(data["data"]))
    return dest


def force_focus_visible(page, selector="#search-input"):
    js(page, f"document.querySelector({selector!r}) && document.querySelector({selector!r}).focus()")
    try:
        doc = page.call("DOM.getDocument", {"depth": 0})
        node_id = (doc.get("root") or {}).get("nodeId")
        q = page.call("DOM.querySelector", {"nodeId": node_id, "selector": selector})
        nid = q.get("nodeId")
        if nid:
            page.call("CSS.forcePseudoState", {"nodeId": nid, "forcedPseudoClasses": ["focus", "focus-visible"]})
    except Exception:
        pass
    time.sleep(0.15)


def click_sel(page, selector):
    ok = js(
        page,
        f"""
        (() => {{
          const el = document.querySelector({selector!r});
          if (!el) return false;
          el.scrollIntoView({{block:'center'}});
          el.click();
          return true;
        }})()
        """,
    )
    time.sleep(0.35)
    return ok


MEASURE_JS = """
(() => {
  const sel = '#search-input, #search-form button, .enter-link, .boot-actions button, #login-go, #pw, button.end-btn, .ghost-btn, nav a, #menubar a, .banner button, .hd button, .top button';
  return [...document.querySelectorAll(sel)].map(el => {
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName, id: el.id || '',
      href: (el.getAttribute('href') || '').slice(0, 40),
      text: (el.textContent || el.placeholder || '').trim().slice(0, 36),
      w: Math.round(r.width), h: Math.round(r.height)
    };
  });
})()
"""


def fname(folder, nn, slug, phase):
    if phase == "before":
        return os.path.join(folder, f"{nn}-{slug}-before.png")
    return os.path.join(folder, f"{nn}-{slug}.png")


def capture_lang(page, base, folder, lang, phase, measures):
    os.makedirs(folder, exist_ok=True)
    q_hit = "龙套" if lang == "zh" else "Extra"
    q_miss = "西瓜" if lang == "zh" else "Watermelon"
    q_empty = ""
    q_forb = "源码"
    hit = urllib.parse.quote(q_hit)
    miss = urllib.parse.quote(q_miss)
    forb = urllib.parse.quote(q_forb)

    shots = [
        ("01", "boot-first-screen", f"{base}/introduction.html", 1280, 900, None),
        ("02", "core-verb", f"{base}/index.html", 1280, 900, None),
        ("03", "success-feedback", f"{base}/search-results.html?q={hit}", 1280, 900, None),
        ("04", "near-fail", f"{base}/pages/ending.html", 1280, 1100, "nearfail"),
        ("05", "recovery", f"{base}/search-results.html?q={miss}", 1280, 900, None),
        ("06", "narrow-320", f"{base}/index.html", 320, 720, None),
        ("07", "keyboard-focus", f"{base}/index.html", 1280, 900, "focus"),
        ("08", "touch-targets", f"{base}/index.html", 390, 844, None),
        ("09", "muted-or-reduced-motion", f"{base}/introduction.html", 1280, 900, "reduce"),
        ("10", "non-color-state", f"{base}/search-results.html?q={miss}", 1280, 900, None),
        ("11", "empty-or-loading", f"{base}/search-results.html?q=", 1280, 900, None),
        ("12", "error-or-pause", f"{base}/pages/login.html", 1280, 900, "loginerr"),
        ("13", "intro-no-search", f"{base}/introduction.html", 1280, 900, None),
        ("14", "public-shop-nav", f"{base}/index.html", 1280, 900, None),
        ("15", "embedded-cyan-desk", f"{base}/pages/login.html", 1280, 900, None),
        ("16", "search-hit-newpage", f"{base}/search-results.html?q={hit}", 1280, 900, None),
        ("17", "search-miss-sentence", f"{base}/search-results.html?q={miss}", 1280, 900, None),
        ("18", "forbidden-black-red", f"{base}/search-results.html?q={forb}", 1280, 900, None),
        ("19", "archive-dossier", f"{base}/pages/ending.html", 1280, 1100, None),
        ("20", "two-source-troupe", f"{base}/pages/troupe.html", 1280, 900, None),
        ("21", "hidden-forum", f"{base}/pages/forum.html", 1280, 900, None),
        ("22", "local-mp-account", f"{base}/pages/mp.html", 1280, 900, None),
        ("23", "gov-redbar", f"{base}/pages/incense.html", 1280, 900, None),
        ("24", "blog-2008", f"{base}/pages/blog-doupi.html", 1280, 900, None),
        ("25", "zhidao-qa", f"{base}/pages/zhidao.html", 1280, 900, None),
        ("26", "order-cyan", f"{base}/pages/order.html", 1280, 900, None),
        ("27", "narrow-320-troupe", f"{base}/pages/troupe.html", 320, 720, None),
        ("28", "touch-390-forum", f"{base}/pages/forum.html", 390, 844, None),
        ("29", "ticket-shop", f"{base}/ticket.html", 1280, 900, None),
        ("30", "void-refund-tab", f"{base}/index.html", 1280, 900, None),
    ]

    for nn, slug, url, w, h, extra in shots:
        set_view(page, w, h)
        if extra == "reduce":
            page.call(
                "Emulation.setEmulatedMedia",
                {"features": [{"name": "prefers-reduced-motion", "value": "reduce"}]},
            )
        else:
            page.call("Emulation.setEmulatedMedia", {"features": [{"name": "prefers-reduced-motion", "value": ""}]})
        go(page, url)
        js(page, "document.documentElement.classList.remove('reduce')")
        if extra == "reduce":
            js(page, "document.documentElement.classList.add('reduce')")
        if extra == "nearfail":
            js(page, "localStorage.clear()")
            go(page, url)
            click_sel(page, "#end-strike")
            time.sleep(0.2)
        if extra == "loginerr":
            js(page, "var el=document.getElementById('pw'); if(el) el.value='WRONG';")
            click_sel(page, "#login-go")
            time.sleep(0.2)
        if extra == "focus":
            force_focus_visible(page)
        dest = fname(folder, nn, slug, phase)
        shot(page, dest)
        print("SHOT", dest)

    # measures on key pages
    for key, url, w in (
        ("shop-1280", f"{base}/index.html", 1280),
        ("shop-320", f"{base}/index.html", 320),
        ("shop-390", f"{base}/index.html", 390),
        ("forum-390", f"{base}/pages/forum.html", 390),
        ("troupe-320", f"{base}/pages/troupe.html", 320),
        ("login-1280", f"{base}/pages/login.html", 1280),
        ("ending-1280", f"{base}/pages/ending.html", 1280),
        ("intro-1280", f"{base}/introduction.html", 1280),
        ("zhidao-390", f"{base}/pages/zhidao.html", 390),
        ("search-miss", f"{base}/search-results.html?q={miss}", 1280),
        ("forbidden", f"{base}/search-results.html?q={forb}", 1280),
    ):
        set_view(page, w, 900 if w >= 800 else 720)
        go(page, url)
        boxes = js(page, MEASURE_JS)
        measures[f"{lang}-{key}"] = boxes


def main():
    phase = PHASE
    out = {"phase": phase, "shots": [], "measures": {}}
    proc, page = start_chrome()
    try:
        capture_lang(page, ZH, os.path.join(VISUAL, "20260823-zh"), "zh", phase, out["measures"])
        capture_lang(page, EN, os.path.join(VISUAL, "20260823-en"), "en", phase, out["measures"])
    finally:
        try:
            page.close()
        except Exception:
            pass
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)

    path = os.path.join(MEASURES, f"measures-{phase}.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(out["measures"], f, ensure_ascii=False, indent=2)
    print("WROTE", path, "phase", phase)


if __name__ == "__main__":
    main()
