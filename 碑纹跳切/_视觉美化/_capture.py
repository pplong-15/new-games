#!/usr/bin/env python3
"""HTTP screenshot capture for 碑纹跳切 visual polish. phase=before|after"""
from __future__ import annotations

import base64
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 9333
PROFILE = "/tmp/beiwen-tiaqie-cdp-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "物件跳切网页档案")

ZH = "http://127.0.0.1:8812"
EN = "http://127.0.0.1:8813"


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


def wait_port(port: int, tries: int = 40):
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
    page.call("Emulation.setDefaultBackgroundColorOverride", {"color": {"r": 255, "g": 255, "b": 255, "a": 1}})
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


def navigate(page: CDP, url: str):
    page.call("Page.navigate", {"url": url})
    # wait load
    deadline = time.time() + 12
    while time.time() < deadline:
        ready = page.call("Runtime.evaluate", {"expression": "document.readyState", "returnByValue": True})
        if (ready.get("result") or {}).get("value") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.25)


def eval_js(page: CDP, expression: str, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": await_promise,
        },
    )
    return (r.get("result") or {}).get("value")


def screenshot(page: CDP, path: str):
    data = page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    raw = base64.b64decode(data["data"])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(raw)
    return len(raw)


def force_focus_visible(page: CDP, selector: str):
    eval_js(page, f"""
      (() => {{
        const el = document.querySelector({selector!r});
        if (el) el.focus();
        return !!el;
      }})()
    """)
    doc = page.call("DOM.getDocument", {"depth": 1})
    root = doc["root"]["nodeId"]
    q = page.call("DOM.querySelector", {"nodeId": root, "selector": selector})
    nid = q.get("nodeId")
    if nid:
        page.call("CSS.forcePseudoState", {"nodeId": nid, "forcedPseudoClasses": ["focus-visible", "focus"]})


def measure_hots(page: CDP):
    return eval_js(
        page,
        """
        (() => {
          const els = [...document.querySelectorAll('.hot, .boot-actions a, .choice, #go, .tabs a, button, #search-form button')];
          return els.map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              cls: el.className,
              title: el.getAttribute('title') || el.textContent.trim().slice(0,40),
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
    """Ordered capture jobs. js runs after navigate. scroll selector optional."""
    intro = f"{base}/introduction.html"
    now = f"{base}/rub/now.html"
    y1986 = f"{base}/rub/y1986.html"
    submit = f"{base}/desk/submit.html"
    home = f"{base}/desk/home.html"
    find = f"{base}/desk/find.html"
    find_q = f"{base}/desk/find.html?q=" + ("纪闻山" if lang == "zh" else "Wenshan")
    recarve = f"{base}/desk/result-recarve.html"
    same = f"{base}/desk/result-same.html"
    approve = f"{base}/desk/result-approve.html"
    gov = f"{base}/gov/index.html"
    shop = f"{base}/shop/index.html"
    family = f"{base}/family/index.html"
    he = f"{base}/he/index.html"
    yellow = f"{base}/yellow/index.html"
    key = "beiwen-tiaqie-v1" if lang == "zh" else "beiwen-tiaqie-v1-en"
    check_same = (
        "document.querySelector('input[value=same]').checked = true;"
        if True
        else ""
    )
    return [
        dict(nn="01", slug="boot-first-screen", url=intro, w=1280, h=900, scroll=".shot"),
        dict(nn="02", slug="core-verb", url=now, w=1280, h=900, scroll=".shot"),
        dict(nn="03", slug="success-feedback", url=recarve, w=1280, h=800),
        dict(
            nn="04",
            slug="near-fail",
            url=submit,
            w=1280,
            h=800,
            js="document.querySelector('input[value=same]').checked = true;",
        ),
        dict(nn="05", slug="recovery", url=same, w=1280, h=800),
        dict(nn="06", slug="narrow-320", url=intro, w=320, h=720, scroll=".shot"),
        dict(
            nn="07",
            slug="keyboard-focus",
            url=intro,
            w=1280,
            h=900,
            scroll=".shot",
            focus=".hot",
        ),
        dict(nn="08", slug="touch-targets", url=now, w=390, h=844, scroll=".shot", measure=True),
        dict(
            nn="09",
            slug="muted-or-reduced-motion",
            url=intro,
            w=1280,
            h=900,
            scroll=".shot",
            reduced=True,
        ),
        dict(
            nn="10",
            slug="non-color-state",
            url=submit,
            w=1280,
            h=800,
            js="document.querySelector('input[value=recarve]').checked = true;",
        ),
        dict(nn="11", slug="empty-or-loading", url=find, w=1280, h=800),
        dict(
            nn="12",
            slug="error-or-pause",
            url=submit,
            w=1280,
            h=800,
            js="document.getElementById('go').click();",
        ),
        dict(nn="13", slug="intro-no-search", url=intro, w=1280, h=900),
        dict(nn="14", slug="public-nav-search", url=home, w=1280, h=800),
        dict(nn="15", slug="embedded-other-skin", url=family, w=1280, h=800),
        dict(nn="17", slug="search-miss", url=find_q, w=1280, h=800),
        dict(nn="18", slug="archive-dossier", url=now, w=1280, h=900),
        dict(nn="19", slug="two-source-gov", url=gov, w=1280, h=800),
        dict(nn="20", slug="two-source-shop", url=shop, w=1280, h=800),
        dict(nn="21", slug="hidden-page-blog", url=he, w=1280, h=800),
        dict(nn="22", slug="quiet-hotspots-no-hover", url=now, w=1280, h=900, scroll=".shot"),
        dict(nn="23", slug="jump-after-contour", url=y1986, w=1280, h=900, scroll=".shot"),
        dict(nn="24", slug="submit-group", url=submit, w=1280, h=800),
        dict(nn="25", slug="five-skin-yellow", url=yellow, w=1280, h=800),
        dict(nn="26", slug="narrow-320-now", url=now, w=320, h=720, scroll=".shot", measure=True),
        dict(
            nn="27",
            slug="old-save-restore",
            url=home,
            w=1280,
            h=800,
            js=f"localStorage.setItem({key!r}, JSON.stringify({{seen:{{intro:1,smear1986:1,zhi:1}}, last: location.href}}));",
            reload=True,
        ),
        dict(nn="28", slug="result-approve", url=approve, w=1280, h=800),
        dict(nn="29", slug="touch-390-submit", url=submit, w=390, h=844, measure=True),
        dict(nn="30", slug="core-verb-y1986", url=y1986, w=1280, h=900, scroll=".shot"),
    ]


def run_phase(phase: str):
    suffix = "-before" if phase == "before" else ""
    proc, page = start_chrome()
    measures = {}
    try:
        for lang, base, folder in (
            ("zh", ZH, "polish-20260823-zh"),
            ("en", EN, "polish-20260823-en"),
        ):
            outdir = os.path.join(VISUAL, folder)
            os.makedirs(outdir, exist_ok=True)
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
                        {"features": [{"name": "prefers-reduced-motion", "value": ""}]},
                    )
                navigate(page, job["url"])
                if job.get("js"):
                    eval_js(page, job["js"])
                if job.get("reload"):
                    navigate(page, job["url"])
                    eval_js(page, "void (window.BW && BW.all())")
                if job.get("scroll"):
                    eval_js(
                        page,
                        f"document.querySelector({job['scroll']!r}) && document.querySelector({job['scroll']!r}).scrollIntoView({{block:'center'}});",
                    )
                    time.sleep(0.12)
                if job.get("focus"):
                    force_focus_visible(page, job["focus"])
                    time.sleep(0.08)
                path = os.path.join(outdir, f"{job['nn']}-{job['slug']}{suffix}.png")
                n = screenshot(page, path)
                rec = {"path": path, "bytes": n, "url": job["url"], "w": job["w"], "h": job["h"]}
                if job.get("measure"):
                    rec["boxes"] = measure_hots(page)
                measures[f"{lang}-{job['nn']}-{job['slug']}{suffix}"] = rec
                print(f"wrote {path} ({n} bytes)")
    finally:
        try:
            page.close()
        except Exception:
            pass
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
    man = os.path.join(ROOT, "_视觉美化", f"measures-{phase}.json")
    with open(man, "w", encoding="utf-8") as f:
        json.dump(measures, f, ensure_ascii=False, indent=2)
    print("measures", man)


if __name__ == "__main__":
    phase = sys.argv[1] if len(sys.argv) > 1 else "before"
    if phase not in ("before", "after"):
        sys.exit("usage: _capture.py before|after")
    run_phase(phase)
