#!/usr/bin/env python3
"""HTTP Chrome CDP screenshots for 地券密级. phase=before|after"""
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
CDP_PORT = 9357
PROFILE = "/tmp/dq-miji-cdp-profile-9357"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VISUAL = os.path.join(ROOT, "visual", "三密级字段对照")
ZH = "http://127.0.0.1:8824"
EN = "http://127.0.0.1:8825"
KEY_ZH = "anpu-diquan-miji-v1"
KEY_EN = "anpu-diquan-miji-v1-en"


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


def wait_port(port: int, tries: int = 80):
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
    page_tab = next(
        (t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl")),
        None,
    )
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


def set_view(page: CDP, w: int, h: int):
    page.call(
        "Emulation.setDeviceMetricsOverride",
        {
            "width": w,
            "height": h,
            "deviceScaleFactor": 1,
            "mobile": w <= 430,
        },
    )


def navigate(page: CDP, url: str, expect_contains=None):
    last = ""
    want = expect_contains or url.split("#")[0]
    for _ in range(4):
        page.call("Page.navigate", {"url": url})
        deadline = time.time() + 12
        while time.time() < deadline:
            ready = page.call(
                "Runtime.evaluate",
                {"expression": "document.readyState", "returnByValue": True},
            )
            if (ready.get("result") or {}).get("value") == "complete":
                break
            time.sleep(0.05)
        time.sleep(0.35)
        href = eval_js(page, "location.href")
        last = href
        if href and want in href:
            title = eval_js(page, "document.title") or ""
            if "金鹊" in title or "Jinque" in title:
                raise RuntimeError(f"wrong title {title} at {href}")
            return
        time.sleep(0.2)
    raise RuntimeError(f"navigate failed: {last} != {url} (want {want})")


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
        raise RuntimeError(r["exceptionDetails"])
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
        if (el) el.focus({{preventScroll: true}});
        const box = document.querySelector('.boot-actions') || el;
        if (box && box.scrollIntoView) box.scrollIntoView({{block: 'center'}});
        return !!el;
      }})()
    """,
    )
    doc = page.call("DOM.getDocument", {"depth": 1})
    root = doc["root"]["nodeId"]
    q = page.call("DOM.querySelector", {"nodeId": root, "selector": selector})
    nid = q.get("nodeId")
    if nid:
        page.call(
            "CSS.forcePseudoState",
            {"nodeId": nid, "forcedPseudoClasses": ["focus-visible", "focus"]},
        )


def measure(page: CDP):
    return eval_js(
        page,
        """
        (() => {
          const sel = [
            'a', 'button', 'input', 'label.dq-opt',
            '.enter-link', '.ghost', '.dq-write', '.dq-go',
            '.ghost-btn', '.tabs a', '.login-box button',
            'form.dq-dead button', 'form.dq-dead input'
          ].join(',');
          const els = [...document.querySelectorAll(sel)].filter(el => {
            const r = el.getBoundingClientRect();
            const st = getComputedStyle(el);
            return r.width > 0 && r.height > 0 && st.visibility !== 'hidden';
          });
          const small = els.filter(el => {
            const r = el.getBoundingClientRect();
            const tag = el.tagName;
            if (tag === 'INPUT' && el.type === 'hidden') return false;
            if (tag === 'A' && r.height < 20 && r.width < 20) return false;
            const interactive = tag === 'A' || tag === 'BUTTON' || (tag === 'INPUT' && el.type !== 'hidden') || el.classList.contains('dq-opt');
            return interactive && (r.height < 44 || (tag === 'BUTTON' && r.width < 44 && r.height < 44));
          }).map(el => {
            const r = el.getBoundingClientRect();
            return {
              tag: el.tagName,
              cls: (el.className || '').toString().slice(0, 60),
              t: (el.textContent || el.getAttribute('placeholder') || '').trim().slice(0, 40),
              w: Math.round(r.width),
              h: Math.round(r.height)
            };
          });
          return {
            overflowX: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
            scrollW: document.documentElement.scrollWidth,
            clientW: document.documentElement.clientWidth,
            small: small.slice(0, 24),
            smallN: small.length
          };
        })()
        """,
    )


def extracted_all():
    out = {}
    for field in ("time", "money", "bound", "guar", "dead"):
        for layer in ("public", "internal", "restrict"):
            out[f"{field}-{layer}"] = True
    return out


def blank():
    return {
        "visited": {},
        "extracted": {},
        "sess": {"internal": False, "restrict": False, "mail": False},
        "picks": {"time": "", "money": "", "bound": "", "guar": "", "dead": ""},
        "hint": 0,
        "ending": "",
        "closed": False,
    }


def merge(base, **kw):
    s = json.loads(json.dumps(base))
    for k, v in kw.items():
        if isinstance(v, dict) and isinstance(s.get(k), dict):
            s[k].update(v)
        else:
            s[k] = v
    return s


def seed_js(lang: str, state: dict) -> str:
    key = KEY_EN if lang == "en" else KEY_ZH
    raw = json.dumps(state, ensure_ascii=False)
    return f"localStorage.setItem({json.dumps(key)}, {json.dumps(raw)});"


def clear_js(lang: str) -> str:
    key = KEY_EN if lang == "en" else KEY_ZH
    return f"localStorage.removeItem({json.dumps(key)});"


THREE = merge(
    blank(),
    visited={"intro": True, "deed-047": True, "internal-047": True, "restricted-047": True, "note": True},
    extracted=extracted_all(),
    sess={"internal": True, "restrict": True, "mail": True},
    picks={
        "time": "time-conflict",
        "money": "money-conflict",
        "bound": "bound-conflict",
        "guar": "guar-internal",
        "dead": "dead-conflict",
    },
    ending="three",
    closed=True,
)
OVER = merge(
    THREE,
    picks={
        "time": "time-restrict",
        "money": "money-restrict",
        "bound": "bound-restrict",
        "guar": "guar-restrict",
        "dead": "dead-unique",
    },
    ending="overclaim",
    closed=False,
)
INTERNAL_VIEW = merge(
    blank(),
    visited={"internal-047": True},
    sess={"internal": True, "restrict": False, "mail": False},
    extracted={"time-internal": True},
)
RESTRICT_VIEW = merge(
    blank(),
    visited={"restricted-047": True},
    sess={"internal": True, "restrict": True, "mail": True},
    extracted={"time-restrict": True},
)
NOTE_OPTS = merge(
    blank(),
    visited={"note": True, "deed-047": True, "internal-047": True, "restricted-047": True},
    extracted=extracted_all(),
    sess={"internal": True, "restrict": True, "mail": True},
)
OLD_PARTIAL = merge(
    blank(),
    visited={"deed-047": True, "intro": True},
    extracted={"time-public": True, "money-public": True},
    picks={"time": "time-public", "money": "money-public"},
    sess={"internal": False, "restrict": False, "mail": False},
)


LOGIN_FAIL = """
(() => {
  const u = document.getElementById('user');
  const p = document.getElementById('pass');
  const f = document.getElementById('dq-login');
  if (u) u.value = 'xx';
  if (p) p.value = 'yy';
  if (f && f.requestSubmit) f.requestSubmit();
  else if (f) f.dispatchEvent(new Event('submit', {cancelable:true, bubbles:true}));
  return true;
})()
"""


def shots_for(base: str, lang: str):
    return [
        dict(nn="01", slug="boot-first-screen", url=f"{base}/introduction.html", w=1280, h=900, clear=True),
        dict(nn="02", slug="core-verb", url=f"{base}/public/deed-047.html", w=1280, h=900, clear=True, scroll=".dq-extract-row"),
        dict(nn="03", slug="success-feedback", url=f"{base}/desk/result.html", w=1280, h=900, state=THREE),
        dict(nn="04", slug="near-fail", url=f"{base}/desk/result.html", w=1280, h=900, state=OVER),
        dict(nn="05", slug="recovery", url=f"{base}/desk/note.html", w=1280, h=900, state=OVER),
        dict(nn="06", slug="narrow-320", url=f"{base}/public/deed-047.html", w=320, h=720, clear=True, measure=True),
        dict(nn="07", slug="keyboard-focus", url=f"{base}/introduction.html", w=1280, h=900, clear=True, focus=".enter-link"),
        dict(nn="08", slug="touch-targets", url=f"{base}/desk/login.html", w=390, h=844, clear=True, measure=True),
        dict(nn="09", slug="muted-or-reduced-motion", url=f"{base}/public/deed-047.html", w=1280, h=900, clear=True, reduced=True),
        dict(nn="10", slug="non-color-state", url=f"{base}/desk/note.html", w=1280, h=900, state=NOTE_OPTS),
        dict(nn="11", slug="empty-or-loading", url=f"{base}/desk/note.html", w=1280, h=900, clear=True),
        dict(nn="12", slug="error-or-pause", url=f"{base}/desk/login.html", w=1280, h=900, clear=True, js=LOGIN_FAIL, wait=0.4),
        dict(nn="13", slug="intro-no-search", url=f"{base}/introduction.html", w=1280, h=900, clear=True),
        dict(nn="14", slug="public-catalog", url=f"{base}/public/catalog.html", w=1280, h=800, clear=True),
        dict(nn="15", slug="desk-dead-search", url=f"{base}/desk/home.html", w=1280, h=900, clear=True),
        dict(nn="16", slug="denied-gate", url=f"{base}/desk/restricted-047.html", w=1280, h=800, clear=True, expect="denied.html"),
        dict(nn="17", slug="archive-public-047", url=f"{base}/public/deed-047.html", w=1280, h=900, clear=True),
        dict(nn="18", slug="layer-internal-047", url=f"{base}/desk/internal-047.html", w=1280, h=900, state=INTERNAL_VIEW),
        dict(nn="19", slug="layer-restrict-047", url=f"{base}/desk/restricted-047.html", w=1280, h=900, state=RESTRICT_VIEW),
        dict(nn="20", slug="two-source-gov", url=f"{base}/gov/index.html", w=1280, h=800, clear=True),
        dict(nn="21", slug="embedded-forum", url=f"{base}/forum/list.html", w=1280, h=900, clear=True),
        dict(nn="22", slug="mail-skin", url=f"{base}/mail/login.html", w=1280, h=800, clear=True),
        dict(nn="23", slug="baike-skin", url=f"{base}/baike/maidiquan.html", w=1280, h=900, clear=True),
        dict(nn="24", slug="still-no-token", url=f"{base}/public/deed-047.html", w=1280, h=700, clear=True),
        dict(nn="25", slug="deed-012-dead", url=f"{base}/public/deed-012.html", w=1280, h=800, clear=True),
        dict(nn="26", slug="login-internal", url=f"{base}/desk/login.html", w=1280, h=800, clear=True),
        dict(nn="27", slug="login-restrict", url=f"{base}/desk/lock.html", w=1280, h=800, clear=True),
        dict(nn="28", slug="news-portal", url=f"{base}/news/index.html", w=1280, h=800, clear=True),
        dict(nn="29", slug="classified-yellow", url=f"{base}/classified/hou.html", w=1280, h=800, clear=True),
        dict(nn="30", slug="old-save-restore", url=f"{base}/desk/note.html", w=1280, h=800, state=OLD_PARTIAL),
        dict(nn="31", slug="blog-orange", url=f"{base}/blog/shen.html", w=1280, h=800, clear=True),
        dict(nn="32", slug="narrow-320-login", url=f"{base}/desk/login.html", w=320, h=720, clear=True, measure=True),
        dict(nn="33", slug="touch-390-note", url=f"{base}/desk/note.html", w=390, h=844, state=NOTE_OPTS, measure=True),
        dict(nn="34", slug="shift-badge-still", url=f"{base}/desk/shift.html", w=1280, h=900, clear=True),
        dict(nn="35", slug="exhibit-brick-still", url=f"{base}/public/exhibit.html", w=1280, h=800, clear=True),
    ]


def origin_boot(page: CDP, base: str):
    navigate(page, f"{base}/introduction.html")


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
            origin_boot(page, base)
            eval_js(page, "localStorage.clear();")
            for job in shots_for(base, lang):
                for attempt in range(3):
                    try:
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
                        origin_boot(page, base)
                        if job.get("clear"):
                            eval_js(page, clear_js(lang))
                        if job.get("state"):
                            eval_js(page, seed_js(lang, job["state"]))
                        navigate(page, job["url"], job.get("expect"))
                        href = eval_js(page, "location.href")
                        want = job.get("expect") or job["url"].split("#")[0]
                        if want not in href:
                            raise RuntimeError("href " + str(href))
                        if job.get("js"):
                            eval_js(page, job["js"])
                        if job.get("wait"):
                            time.sleep(job["wait"])
                        if job.get("scroll"):
                            eval_js(
                                page,
                                f"var el=document.querySelector({job['scroll']!r}); if(el) el.scrollIntoView({{block:'center'}});",
                            )
                            time.sleep(0.12)
                        if job.get("focus"):
                            force_focus_visible(page, job["focus"])
                            time.sleep(0.08)
                        path = os.path.join(outdir, f"{job['nn']}-{job['slug']}{suffix}.png")
                        n = screenshot(page, path)
                        rec = {"path": path, "bytes": n, "url": job["url"], "href": href, "w": job["w"], "h": job["h"]}
                        if job.get("measure"):
                            rec["boxes"] = measure(page)
                        measures[f"{lang}-{job['nn']}-{job['slug']}{suffix}"] = rec
                        print(f"wrote {path} ({n} bytes) {href}", flush=True)
                        break
                    except Exception as e:
                        print("retry", job["nn"], attempt, e, flush=True)
                        try:
                            page.close()
                        except Exception:
                            pass
                        try:
                            proc.terminate()
                            proc.wait(timeout=3)
                        except Exception:
                            try:
                                proc.kill()
                            except Exception:
                                pass
                        time.sleep(0.6)
                        proc, page = start_chrome()
                        origin_boot(page, base)
                else:
                    raise RuntimeError("failed " + job["nn"] + " " + job["slug"])
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
