#!/usr/bin/env python3
"""HTTP screenshot capture for 更衣柜手机 visual polish. phase=before|after"""
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
CDP_PORT = 9336
PROFILE = "/tmp/gys-phone-cdp-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "html-game-puzzle")

ZH = "http://127.0.0.1:8816"
EN = "http://127.0.0.1:8817"


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


def navigate(page: CDP, url: str):
    page.call("Page.navigate", {"url": url})
    deadline = time.time() + 12
    while time.time() < deadline:
        ready = page.call("Runtime.evaluate", {"expression": "document.readyState", "returnByValue": True})
        if (ready.get("result") or {}).get("value") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.2)


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


def measure_hots(page: CDP):
    return eval_js(
        page,
        """
        (() => {
          const sel = '.pad button, a.ic, .sk a, .boot-actions a, html.backroom a, .thumbs a, .row, .enter-link, .ghost';
          const els = [...document.querySelectorAll(sel)];
          return els.map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              cls: (el.className || '').toString().slice(0, 80),
              title: (el.getAttribute('aria-label') || el.textContent || '').trim().slice(0, 48),
              w: Math.round(r.width),
              h: Math.round(r.height),
              x: Math.round(r.x),
              y: Math.round(r.y)
            };
          });
        })()
        """,
    )


SAVE_ZH = "gys_"
SAVE_EN = "gys_en_"


def save_js(lang: str, flags: dict) -> str:
    p = SAVE_ZH if lang == "zh" else SAVE_EN
    parts = [f"localStorage.setItem({(p + k)!r}, {v!r});" for k, v in flags.items()]
    return "".join(parts)


def click_pin(seq: str, submit: bool, lang: str) -> str:
    ok = "开" if lang == "zh" else "OK"
    clicks = []
    for ch in seq:
        clicks.append(
            f"[...document.querySelectorAll('.pad button')].find(b=>b.textContent==={ch!r})?.click();"
        )
    if submit:
        clicks.append(
            f"[...document.querySelectorAll('.pad button')].find(b=>b.textContent==={ok!r})?.click();"
        )
    return "".join(clicks)


def shots_for(base: str, lang: str):
    intro = f"{base}/introduction.html"
    lock = f"{base}/lock.html"
    home = f"{base}/home.html"
    album = f"{base}/album.html"
    zheng = f"{base}/photo-zheng.html"
    fu = f"{base}/photo-fu.html"
    back = f"{base}/backroom.html"
    end_old = f"{base}/end-old.html"
    end_new = f"{base}/end-new.html"
    sms = f"{base}/sms.html"
    sms_k = f"{base}/sms-kuang.html"
    memo = f"{base}/memo.html"
    memo_c = f"{base}/memo-compare.html"
    blocked = f"{base}/blocked.html"
    calls = f"{base}/calls.html"
    cal = f"{base}/calendar.html"
    locker = f"{base}/photo-locker.html"
    flags_all = {
        "seen0314": "1",
        "seen0812": "1",
        "seenmemo": "1",
        "seencalls": "1",
        "seencal": "1",
        "seenlocker": "1",
    }
    return [
        dict(nn="01", slug="boot-first-screen", url=intro, w=1280, h=900),
        dict(nn="02", slug="core-verb", url=album, w=1280, h=900),
        dict(
            nn="03",
            slug="success-feedback",
            url=end_old,
            w=1280,
            h=800,
            js=save_js(lang, {"seen0314": "1"}),
            reload=True,
        ),
        dict(
            nn="04",
            slug="near-fail",
            url=end_new,
            w=1280,
            h=800,
            js=save_js(lang, {"seen0812": "1"}),
            reload=True,
        ),
        dict(nn="05", slug="recovery", url=back, w=1280, h=800),
        dict(nn="06", slug="narrow-320", url=album, w=320, h=720, measure=True),
        dict(nn="07", slug="keyboard-focus", url=intro, w=1280, h=900, focus=".enter-link"),
        dict(nn="08", slug="touch-targets", url=lock, w=390, h=844, measure=True),
        dict(nn="09", slug="muted-or-reduced-motion", url=album, w=1280, h=900, reduced=True),
        dict(nn="10", slug="non-color-state", url=calls, w=1280, h=800),
        dict(nn="11", slug="empty-or-loading", url=lock, w=1280, h=800),
        dict(
            nn="12",
            slug="error-or-pause",
            url=lock,
            w=1280,
            h=800,
            js=click_pin("0000", True, lang),
        ),
        dict(nn="13", slug="intro-no-search", url=intro, w=1280, h=900),
        dict(nn="14", slug="two-source-id-a", url=zheng, w=1280, h=900),
        dict(nn="15", slug="two-source-id-b", url=fu, w=1280, h=900),
        dict(nn="16", slug="gallery-thumbs", url=album, w=1280, h=900),
        dict(nn="17", slug="embedded-sms-holo", url=sms_k, w=1280, h=800),
        dict(nn="18", slug="archive-memo", url=memo_c, w=1280, h=800),
        dict(nn="19", slug="blocked-nonmodal", url=blocked, w=1280, h=800),
        dict(nn="20", slug="backroom-other-skin", url=back, w=1280, h=900, measure=True),
        dict(nn="21", slug="home-launcher", url=home, w=1280, h=900),
        dict(nn="22", slug="lock-kitkat", url=lock, w=1280, h=800),
        dict(nn="23", slug="sms-list", url=sms, w=1280, h=800),
        dict(nn="24", slug="memo-list", url=memo, w=1280, h=800),
        dict(nn="25", slug="photo-locker", url=locker, w=1280, h=800),
        dict(nn="26", slug="calendar-dates", url=cal, w=1280, h=800),
        dict(
            nn="27",
            slug="old-save-restore",
            url=back,
            w=1280,
            h=800,
            js=save_js(lang, flags_all),
            reload=True,
        ),
        dict(nn="28", slug="narrow-320-lock", url=lock, w=320, h=720, measure=True),
        dict(nn="29", slug="touch-390-home", url=home, w=390, h=844, measure=True),
        dict(nn="30", slug="touch-390-backroom", url=back, w=390, h=844, measure=True),
        dict(nn="31", slug="narrow-320-intro", url=intro, w=320, h=720, measure=True),
        dict(nn="32", slug="end-old-detail", url=end_old, w=1280, h=800, js=save_js(lang, {"seen0314": "1"}), reload=True),
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
                        {"features": [{"name": "prefers-reduced-motion", "value": ""}]},
                    )
                navigate(page, job["url"])
                if job.get("js"):
                    eval_js(page, job["js"])
                if job.get("reload"):
                    navigate(page, job["url"])
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
            eval_js(page, "localStorage.clear();")
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
