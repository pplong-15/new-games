#!/usr/bin/env python3
"""HTTP screenshot capture for 门坎试法. phase=before|after"""
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
CDP_PORT = 9346
PROFILE = "/tmp/menkan-shifa-cdp-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "撞法留证建议")

ZH = "http://127.0.0.1:9006"
EN = "http://127.0.0.1:9007"
KEY_ZH = "menkan-shifa-v1"
KEY_EN = "menkan-shifa-v1-en"

SAVE_FULL = {
    "verified.broke": True,
    "seen.record": True,
    "seen.sms": True,
    "seen.key": True,
    "seen.borrow": True,
    "token-in": True,
    "last-try": "step",
    "seen.board": True,
    "seen.law": True,
}
SAVE_TRY = {"token-in": True, "seen.law": True, "last-try": "step"}
SAVE_OLD = {"verified.broke": True, "token-in": True, "seen.law": True}


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
    time.sleep(0.28)


def eval_js(page: CDP, expression: str, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {
            "expression": expression,
            "returnByValue": True,
            "awaitPromise": await_promise,
        },
    )
    if "exceptionDetails" in r:
        raise RuntimeError(r["exceptionDetails"])
    return (r.get("result") or {}).get("value")


def screenshot(page: CDP, path: str):
    data = page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    raw = base64.b64decode(data["data"])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "wb") as f:
        f.write(raw)
    return len(raw)


def set_save(page: CDP, key: str, obj: dict):
    payload = json.dumps(obj, ensure_ascii=False)
    eval_js(page, f"localStorage.setItem({key!r}, {payload!r});")


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
          const els = [...document.querySelectorAll(
            'button, .ghost-btn, .enter-link, .boot-actions a, fieldset label, select, .tabs a, .ft a, .menu a, nav a, .bar a'
          )];
          return els.map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              cls: String(el.className||'').slice(0,40),
              title: (el.getAttribute('title') || el.textContent || '').trim().slice(0,40),
              w: Math.round(r.width),
              h: Math.round(r.height),
              x: Math.round(r.x),
              y: Math.round(r.y)
            };
          });
        })()
        """,
    )


def overflow_x(page: CDP):
    return eval_js(
        page,
        """
        (() => {
          const de = document.documentElement;
          return { client: de.clientWidth, scroll: de.scrollWidth, overflow: de.scrollWidth > de.clientWidth + 1 };
        })()
        """,
    )


def shots_for(base: str, lang: str, key: str):
    intro = f"{base}/introduction.html"
    login = f"{base}/desk/login.html"
    home = f"{base}/desk/home.html"
    tryu = f"{base}/desk/try.html"
    trej = f"{base}/desk/try-reject.html"
    tok = f"{base}/desk/try-ok.html"
    rec = f"{base}/desk/record.html"
    adv = f"{base}/desk/advise.html"
    hold = f"{base}/desk/result-hold.html"
    letin = f"{base}/desk/result-letin.html"
    rew = f"{base}/desk/result-rewrite.html"
    pub = f"{base}/index.html"
    keylog = f"{base}/key/log.html"
    phone = f"{base}/phone/inbox.html"
    mu = f"{base}/phone/mu.html"
    team = f"{base}/team/index.html"
    forum = f"{base}/forum/list.html"
    mail = f"{base}/mail/inbox.html"
    folk = f"{base}/folk/index.html"
    check_step = "document.querySelector('input[value=step]').checked = true;"
    bounce_js = """
      document.querySelector('select[name=nature]').value = 'funeral';
      document.querySelector('select[name=record]').value = 'clean';
      document.querySelector('select[name=act]').value = 'hold';
      document.querySelector('select[name=auth]').value = 'recommend';
      document.getElementById('adv').requestSubmit
        ? document.getElementById('adv').requestSubmit()
        : document.querySelector('#adv button[type=submit]').click();
    """
    empty_js = """
      document.querySelector('#adv button[type=submit]').click();
    """
    bad_login = """
      document.getElementById('user').value = 'xxxx';
      document.getElementById('lg').requestSubmit
        ? document.getElementById('lg').requestSubmit()
        : document.querySelector('#lg button[type=submit]').click();
    """
    return [
        dict(nn="01", slug="boot-first-screen", url=intro, w=1280, h=900),
        dict(nn="02", slug="core-verb", url=tryu, w=1280, h=800, save=SAVE_TRY, key=key, js=check_step),
        dict(nn="03", slug="success-feedback", url=hold, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="04", slug="near-fail", url=letin, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="05", slug="recovery", url=tok, w=1280, h=800, save=SAVE_TRY, key=key),
        dict(nn="06", slug="narrow-320", url=tryu, w=320, h=720, save=SAVE_TRY, key=key, measure=True),
        dict(nn="07", slug="keyboard-focus", url=tryu, w=1280, h=800, save=SAVE_TRY, key=key, focus="input[name=kind]"),
        dict(nn="08", slug="touch-targets", url=tryu, w=390, h=844, save=SAVE_TRY, key=key, measure=True),
        dict(nn="09", slug="muted-or-reduced-motion", url=keylog, w=1280, h=800, save=SAVE_FULL, key=key, reduced=True),
        dict(nn="10", slug="non-color-state", url=tryu, w=1280, h=800, save=SAVE_TRY, key=key, js=check_step),
        dict(nn="11", slug="empty-or-loading", url=adv, w=1280, h=800, save={"token-in": True}, key=key),
        dict(nn="12", slug="error-or-pause", url=login, w=1280, h=800, js=bad_login),
        dict(nn="13", slug="intro-no-search", url=intro, w=1280, h=900),
        dict(nn="14", slug="duty-board", url=home, w=1280, h=900, save=SAVE_TRY, key=key),
        dict(nn="15", slug="embedded-phone", url=phone, w=1280, h=800, save=SAVE_TRY, key=key),
        dict(nn="16", slug="archive-dossier", url=keylog, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="17", slug="try-reject", url=trej, w=1280, h=800, save=SAVE_TRY, key=key),
        dict(nn="18", slug="advise-four", url=adv, w=1280, h=900, save=SAVE_FULL, key=key),
        dict(nn="19", slug="two-source-public", url=pub, w=1280, h=800),
        dict(nn="20", slug="two-source-forum", url=forum, w=1280, h=800),
        dict(nn="21", slug="yellow-pages", url=team, w=1280, h=800),
        dict(nn="22", slug="mail-skin", url=mail, w=1280, h=800),
        dict(nn="23", slug="folk-baike", url=folk, w=1280, h=800),
        dict(nn="24", slug="sms-mu", url=mu, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="25", slug="record-grid", url=rec, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="26", slug="result-rewrite", url=rew, w=1280, h=800, save=SAVE_FULL, key=key),
        dict(nn="27", slug="bounce-advise", url=adv, w=1280, h=900, save=SAVE_FULL, key=key, js=bounce_js),
        dict(nn="28", slug="empty-submit", url=adv, w=1280, h=800, save=SAVE_FULL, key=key, js=empty_js),
        dict(nn="29", slug="old-save-restore", url=home, w=1280, h=800, save=SAVE_OLD, key=key),
        dict(nn="30", slug="narrow-320-home", url=home, w=320, h=720, save=SAVE_OLD, key=key, measure=True),
        dict(nn="31", slug="narrow-320-advise", url=adv, w=320, h=720, save=SAVE_FULL, key=key, measure=True),
        dict(nn="32", slug="touch-390-advise", url=adv, w=390, h=844, save=SAVE_FULL, key=key, measure=True),
        dict(nn="33", slug="login-box", url=login, w=1280, h=800),
        dict(nn="34", slug="narrow-320-intro", url=intro, w=320, h=720, measure=True),
    ]


def run_phase(phase: str):
    suffix = "-before" if phase == "before" else ""
    proc, page = start_chrome()
    measures = {}
    try:
        for lang, base, folder, key in (
            ("zh", ZH, "polish-20260823-zh", KEY_ZH),
            ("en", EN, "polish-20260823-en", KEY_EN),
        ):
            outdir = os.path.join(VISUAL, folder)
            os.makedirs(outdir, exist_ok=True)
            for job in shots_for(base, lang, key):
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
                origin = base + "/introduction.html"
                navigate(page, origin)
                eval_js(page, f"localStorage.removeItem({key!r});")
                if job.get("save") is not None:
                    set_save(page, key, job["save"])
                navigate(page, job["url"])
                if job.get("js"):
                    eval_js(page, job["js"])
                    time.sleep(0.15)
                if job.get("focus"):
                    force_focus_visible(page, job["focus"])
                    time.sleep(0.08)
                path = os.path.join(outdir, f"{job['nn']}-{job['slug']}{suffix}.png")
                n = screenshot(page, path)
                rec = {"path": path, "bytes": n, "url": job["url"], "w": job["w"], "h": job["h"]}
                rec["overflow"] = overflow_x(page)
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
