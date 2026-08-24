#!/usr/bin/env python3
"""HTTP screenshot capture for 金鹊录像厅 visual polish. phase=before|after"""
from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.parse
import urllib.request

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 9341
PROFILE = "/tmp/jinque-hall-cdp-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "停更录像厅搜词调查")

ZH = "http://127.0.0.1:8928"
EN = "http://127.0.0.1:8929"

UNLOCK_IDS = [
    "blog-jiaoying", "blog-night", "points", "space-tianmai", "seats",
    "post-lu", "desk", "login", "handbook", "gazetteer", "obit-hou",
    "vault", "ticket", "credits", "choice", "mail-lu", "album", "mp-close",
    "forum", "classified", "visitors", "paused", "oral", "log", "darkroom",
    "empty-seat", "forbidden", "gift", "ending-a", "ending-b",
]
FACTS_ALL = ["fact_stub", "fact_hou", "fact_lu", "fact_empty", "fact_tian"]
SAVE_ZH = "jinque-hall-v1"
SAVE_EN = "jinque-hall-v1-en"


def save_state(logged=True, facts=None, unlocked=None, visited=None, reduce=False, hint=0):
    return {
        "v": 1,
        "unlocked": UNLOCK_IDS if unlocked is None else unlocked,
        "visited": visited if visited is not None else ["home", "films", "help"],
        "facts": FACTS_ALL if facts is None else facts,
        "query": "",
        "logged": logged,
        "hint": hint,
        "large": False,
        "reduce": reduce,
    }


class CDP:
    def __init__(self, url: str):
        self.ws = create_connection(url, timeout=60)
        self._id = 0

    def call(self, method: str, params=None):
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


def wait_port(port: int, tries: int = 50):
    for _ in range(tries):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1)
            return
        except Exception:
            time.sleep(0.15)
    raise RuntimeError("CDP port not ready")


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
            "--force-color-profile=srgb",
            "--disable-extensions",
            "--remote-allow-origins=*",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    wait_port(CDP_PORT)
    tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json/list"))
    page_tab = next((t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl")), None)
    if page_tab is None:
        raise RuntimeError(f"no page target in {tabs!r}")
    page = CDP(page_tab["webSocketDebuggerUrl"])
    page.call("Page.enable")
    page.call("Runtime.enable")
    page.call("DOM.enable")
    page.call("CSS.enable")
    page.call("Network.enable")
    page.call("Network.setCacheDisabled", {"cacheDisabled": True})
    page.call(
        "Emulation.setDefaultBackgroundColorOverride",
        {"color": {"r": 255, "g": 255, "b": 255, "a": 1}},
    )
    return proc, page


def set_view(page: CDP, w: int, h: int, dpr: float = 1.0):
    page.call(
        "Emulation.setDeviceMetricsOverride",
        {
            "width": w,
            "height": h,
            "deviceScaleFactor": dpr,
            "mobile": w <= 430,
        },
    )


def eval_js(page: CDP, expression: str, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": await_promise,
        },
    )
    if r.get("exceptionDetails"):
        raise RuntimeError(str(r["exceptionDetails"]))
    return (r.get("result") or {}).get("value")


def navigate(page: CDP, url: str):
    page.call("Page.navigate", {"url": url})
    deadline = time.time() + 12
    while time.time() < deadline:
        ready = eval_js(page, "document.readyState")
        if ready == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.25)


def screenshot(page: CDP, path: str):
    data = page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    raw = base64.b64decode(data["data"])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(raw)
    return len(raw)


def force_focus_visible(page: CDP, selector: str):
    eval_js(
        page,
        f"""
      (() => {{
        const el = document.querySelector({selector!r});
        if (el) el.focus();
        return !!el;
      }})()
    """,
    )
    doc = page.call("DOM.getDocument", {"depth": 1})
    root = doc["root"]["nodeId"]
    q = page.call("DOM.querySelector", {"nodeId": root, "selector": selector})
    nid = q.get("nodeId")
    if nid:
        page.call("CSS.forcePseudoState", {"nodeId": nid, "forcedPseudoClasses": ["focus-visible", "focus"]})


def seed(page: CDP, key: str, state: dict):
    eval_js(
        page,
        f"localStorage.setItem({key!r}, {json.dumps(json.dumps(state))}); localStorage.getItem({key!r});",
    )


def measure_search(page: CDP):
    return eval_js(
        page,
        """
        (() => {
          const sel = '#search-input, #search-form button, #search-form input, .boot-actions button, .choice-row button, .login-box input, .login-box button, [data-act=hint], [data-act=new], [data-act=wipe], nav a, .tabs a';
          const els = [...document.querySelectorAll(sel)];
          return els.map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              id: el.id || '',
              cls: (el.className || '').toString().slice(0, 60),
              title: (el.getAttribute('aria-label') || el.textContent || el.placeholder || '').trim().slice(0, 40),
              w: Math.round(r.width),
              h: Math.round(r.height),
              x: Math.round(r.x),
              y: Math.round(r.y)
            };
          });
        })()
        """,
    )


def shots_for(base: str, lang: str):
    hit_q = urllib.parse.quote("加映场" if lang == "zh" else "ExtraShow")
    miss_q = urllib.parse.quote("西瓜" if lang == "zh" else "NoSuchWord")
    forb_q = urllib.parse.quote("源码" if lang == "zh" else "Source")
    return [
        dict(nn="01", slug="boot-first-screen", url=f"{base}/introduction.html", w=1280, h=900),
        dict(nn="02", slug="core-verb", url=f"{base}/index.html", w=1280, h=900, measure=True),
        dict(nn="03", slug="success-feedback", url=f"{base}/search-results.html?q={hit_q}", w=1280, h=800, state=save_state()),
        dict(nn="04", slug="near-fail", url=f"{base}/pages/choice.html", w=1280, h=800,
             state=save_state(facts=["fact_stub", "fact_hou"], unlocked=UNLOCK_IDS),
             after="document.querySelector('[data-end=a]') && document.querySelector('[data-end=a]').click();",
             measure=True),
        dict(nn="05", slug="recovery", url=f"{base}/search-results.html?q={miss_q}", w=1280, h=800),
        dict(nn="06", slug="narrow-320", url=f"{base}/index.html", w=320, h=720, measure=True),
        dict(nn="07", slug="keyboard-focus", url=f"{base}/index.html", w=1280, h=900, focus="#search-input"),
        dict(nn="08", slug="touch-targets", url=f"{base}/pages/forum.html", w=390, h=844,
             state=save_state(), measure=True),
        dict(nn="09", slug="muted-or-reduced-motion", url=f"{base}/introduction.html", w=1280, h=900,
             state=save_state(reduce=True), reduced=True),
        dict(nn="10", slug="non-color-state", url=f"{base}/search-results.html?q={miss_q}", w=1280, h=800),
        dict(nn="11", slug="empty-or-loading", url=f"{base}/search-results.html?q=", w=1280, h=800),
        dict(nn="12", slug="error-or-pause", url=f"{base}/pages/paused.html", w=1280, h=800, state=save_state()),
        dict(nn="13", slug="intro-no-search", url=f"{base}/introduction.html", w=1280, h=900),
        dict(nn="14", slug="public-shop-nav", url=f"{base}/index.html", w=1280, h=900),
        dict(nn="15", slug="embedded-cyan-desk", url=f"{base}/pages/desk.html", w=1280, h=800, state=save_state()),
        dict(nn="16", slug="search-hit-newpage", url=f"{base}/search-results.html?q={hit_q}", w=1280, h=800, state=save_state()),
        dict(nn="17", slug="search-miss-sentence", url=f"{base}/search-results.html?q={miss_q}", w=1280, h=800),
        dict(nn="18", slug="forbidden-black-red", url=f"{base}/search-results.html?q={forb_q}", w=1280, h=800),
        dict(nn="19", slug="archive-dossier", url=f"{base}/pages/ticket.html", w=1280, h=900, state=save_state()),
        dict(nn="20", slug="hidden-qzone", url=f"{base}/pages/space-tianmai.html", w=1280, h=900, state=save_state()),
        dict(nn="21", slug="two-source-forum", url=f"{base}/pages/post-lu.html", w=1280, h=800, state=save_state()),
        dict(nn="22", slug="local-mp-account", url=f"{base}/pages/obit-hou.html", w=1280, h=900, state=save_state()),
        dict(nn="23", slug="still-no-token-home", url=f"{base}/index.html", w=1280, h=900),
        dict(nn="24", slug="login-desk", url=f"{base}/pages/login.html", w=1280, h=800, state=save_state(logged=False), measure=True),
        dict(nn="25", slug="ending-refund", url=f"{base}/pages/ending-a.html", w=1280, h=800, state=save_state(), measure=True),
        dict(nn="26", slug="classified-yellow", url=f"{base}/pages/classified.html", w=1280, h=800, state=save_state()),
        dict(nn="27", slug="mail-web", url=f"{base}/pages/mail-lu.html", w=1280, h=800, state=save_state()),
        dict(nn="28", slug="gov-redbar", url=f"{base}/pages/gazetteer.html", w=1280, h=800, state=save_state()),
        dict(nn="29", slug="blog-2008", url=f"{base}/pages/blog-jiaoying.html", w=1280, h=800, state=save_state()),
        dict(nn="30", slug="lock-handbook-login", url=f"{base}/pages/handbook.html", w=1280, h=800,
             state=save_state(logged=False, unlocked=["handbook", "login"])),
        dict(nn="31", slug="unlocked-handbook", url=f"{base}/pages/handbook.html", w=1280, h=800, state=save_state(logged=True)),
        dict(nn="32", slug="narrow-320-forum", url=f"{base}/pages/forum.html", w=320, h=720, state=save_state(), measure=True),
        dict(nn="33", slug="touch-390-shop", url=f"{base}/index.html", w=390, h=844, measure=True),
        dict(nn="34", slug="corp-points", url=f"{base}/pages/points.html", w=1280, h=800, state=save_state()),
        dict(nn="35", slug="forbidden-static", url=f"{base}/pages/forbidden.html", w=1280, h=800, state=save_state()),
    ]


def run_phase(phase: str):
    suffix = "-before" if phase == "before" else ""
    proc, page = start_chrome()
    measures = {}
    try:
        for lang, base, folder in (
            ("zh", ZH, "20260823-d9-zh"),
            ("en", EN, "20260823-d9-en"),
        ):
            key = SAVE_ZH if lang == "zh" else SAVE_EN
            outdir = os.path.join(VISUAL, folder)
            os.makedirs(outdir, exist_ok=True)
            # origin for this language
            navigate(page, f"{base}/introduction.html")
            eval_js(page, "localStorage.clear();")
            for job in shots_for(base, lang):
                set_view(page, job["w"], job["h"])
                if job.get("reduced"):
                    page.call(
                        "Emulation.setEmulatedMedia",
                        {"features": [{"name": "prefers-reduced-motion", "value": "reduce"}]},
                    )
                else:
                    page.call(
                        "Emulation.setEmulatedMedia",
                        {"features": [{"name": "prefers-reduced-motion", "value": "no-preference"}]},
                    )
                navigate(page, f"{base}/introduction.html")
                if job.get("state") is not None:
                    seed(page, key, job["state"])
                else:
                    eval_js(page, "localStorage.clear();")
                navigate(page, job["url"])
                time.sleep(0.15)
                if job.get("after"):
                    eval_js(page, job["after"])
                    time.sleep(0.2)
                if job.get("focus"):
                    force_focus_visible(page, job["focus"])
                    time.sleep(0.08)
                path = os.path.join(outdir, f"{job['nn']}-{job['slug']}{suffix}.png")
                n = screenshot(page, path)
                rec = {"path": path, "bytes": n, "url": job["url"], "w": job["w"], "h": job["h"]}
                if job.get("measure"):
                    rec["boxes"] = measure_search(page)
                measures[f"{lang}-{job['nn']}-{job['slug']}{suffix}"] = rec
                print(f"wrote {path} ({n} bytes)")
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
    out_json = os.path.join(os.path.dirname(__file__), f"measures-{phase}.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(measures, f, ensure_ascii=False, indent=2)
    print("measures", out_json)


if __name__ == "__main__":
    phase = sys.argv[1] if len(sys.argv) > 1 else "before"
    if phase not in ("before", "after"):
        raise SystemExit("usage: _capture.py before|after")
    run_phase(phase)
