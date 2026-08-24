#!/usr/bin/env python3
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
CDP_PORT = 9338
PROFILE = "/tmp/tongchuang-cdp-profile"
TOOL = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(TOOL, ".."))
VISUAL = os.path.join(ROOT, "visual", "校园实名站搜词")
ZH = "http://127.0.0.1:9010"
EN = "http://127.0.0.1:9011"
SAVE_ZH = "tongchuang-online-v1"
SAVE_EN = "tongchuang-online-v1-en"
PUBLIC = ["intro", "home", "find", "school", "help", "apps", "search", "forbidden"]
UNLOCK = PUBLIC + [
    "blog-paperhorse", "blog-night", "shenji", "space-syz", "gift", "visitors",
    "profile-cxb", "album-cxb", "class", "login", "class-rules", "yince",
    "gazetteer", "reservoir", "album-zt", "wall-zt", "forum", "mp-sxl",
    "inbox", "profile-jwq", "paper-list", "oral-sls", "mp-local", "genealogy",
    "shrine", "choice", "ending-a", "ending-b", "class-feed",
]
FACTS = ["fact_spare", "fact_papers", "fact_cxb", "fact_sls", "fact_lin"]


def state(verified=None, unlocked=None, started=True, reduce=False, ending=None, visited=None):
    u = UNLOCK if unlocked is None else unlocked
    v = FACTS if verified is None else verified
    vis = visited or ["intro", "home"]
    # 双写字段：兼容 started/unlocked 与 started/unlocked 两套引擎草稿
    return {
        "schemaVersion": 1,
        "started": started,
        "started": started,
        "unlocked": u,
        "unlocked": u,
        "visited": vis,
        "visited": vis,
        "verified": v,
        "verified": v,
        "searchHistory": ["纸马课"],
        "searchHistory": ["纸马课"],
        "query": "",
        "ending": ending,
        "hintLevel": 0,
        "large": False,
        "reduce": reduce,
        "flash": None,
    }


class CDP:
    def __init__(self, url):
        self.ws = create_connection(url, timeout=60)
        self._id = 0

    def call(self, method, params=None):
        self._id += 1
        self.ws.send(json.dumps({"id": self._id, "method": method, "params": params or {}}))
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


def wait_port(port):
    for _ in range(80):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=1)
            return
        except Exception:
            time.sleep(0.12)
    raise RuntimeError("CDP not ready")


def start_chrome():
    if os.path.isdir(PROFILE):
        shutil.rmtree(PROFILE, ignore_errors=True)
    os.makedirs(PROFILE, exist_ok=True)
    proc = subprocess.Popen(
        [
            CHROME, f"--remote-debugging-port={CDP_PORT}", f"--user-data-dir={PROFILE}",
            "--headless=new", "--disable-gpu", "--no-first-run", "--hide-scrollbars",
            "--force-color-profile=srgb", "--remote-allow-origins=*", "about:blank",
        ],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    wait_port(CDP_PORT)
    tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json/list"))
    tab = next(t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl"))
    page = CDP(tab["webSocketDebuggerUrl"])
    for m in ("Page.enable", "Runtime.enable", "DOM.enable", "CSS.enable", "Network.enable"):
        page.call(m)
    page.call("Network.setCacheDisabled", {"cacheDisabled": True})
    return proc, page


def js(page, expr):
    r = page.call("Runtime.evaluate", {"expression": expr, "returnByValue": True})
    if r.get("exceptionDetails"):
        raise RuntimeError(str(r["exceptionDetails"]))
    return (r.get("result") or {}).get("value")


def set_view(page, w, h):
    page.call("Emulation.setDeviceMetricsOverride", {
        "width": w, "height": h, "deviceScaleFactor": 1, "mobile": w <= 430,
    })


def goto(page, url):
    page.call("Page.navigate", {"url": url})
    t0 = time.time()
    while time.time() - t0 < 12:
        try:
            if js(page, "document.readyState") == "complete":
                break
        except Exception:
            pass
        time.sleep(0.05)
    time.sleep(0.18)


def shot(page, path):
    raw = base64.b64decode(page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})["data"])
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, "wb").write(raw)
    print("wrote", path, len(raw))
    return len(raw)


def seed(page, key, st):
    payload = json.dumps(st, ensure_ascii=False)
    keys = [key, SAVE_ZH, SAVE_EN, "tongchuang-online-v1", "tongchuang-online-v1-en"]
    js(
        page,
        "(function(){ var p="
        + json.dumps(payload)
        + "; "
        + json.dumps(keys)
        + ".forEach(function(k){ try{ localStorage.setItem(k, p); }catch(e){} }); })();",
    )


def measure(page):
    return js(page, """
    (() => {
      const sel = '#q, form[data-act="search"] input, form[data-act="search"] button, .boot-actions a, .boot-actions button, .login-box input, .login-box button, .login-box input, .login-box button, .choice-row button, button[data-choice]';
      return [...document.querySelectorAll(sel)].map(el => {
        const r = el.getBoundingClientRect();
        return {tag: el.tagName, id: el.id, h: Math.round(r.height), w: Math.round(r.width)};
      });
    })()
    """)


def jobs(base, lang):
    hit = urllib.parse.quote("纸马课" if lang == "zh" else "PaperHorse")
    miss = urllib.parse.quote("西瓜" if lang == "zh" else "Watermelon")
    forb = urllib.parse.quote("源码" if lang == "zh" else "SourceCode")
    full = state()
    near = state(verified=["fact_cxb", "fact_spare"])
    fresh = state(unlocked=PUBLIC, verified=[], started=False)
    old = state(
        verified=["fact_cxb"],
        unlocked=PUBLIC + ["profile-cxb", "album-cxb", "blog-paperhorse"],
        visited=["intro", "home", "blog-paperhorse"],
    )
    return [
        dict(nn="01", slug="boot-first-screen", url=f"{base}/index.html", w=1280, h=900, st=fresh),
        dict(nn="02", slug="core-verb", url=f"{base}/home.html", w=1280, h=900, st=full, measure=True),
        dict(nn="03", slug="success-feedback", url=f"{base}/search.html?q={hit}", w=1280, h=800, st=full),
        dict(nn="04", slug="near-fail", url=f"{base}/choice.html", w=1280, h=800, st=near),
        dict(nn="05", slug="recovery", url=f"{base}/search.html?q={miss}", w=1280, h=800, st=full),
        dict(nn="06", slug="narrow-320", url=f"{base}/home.html", w=320, h=720, st=full, measure=True),
        dict(nn="07", slug="keyboard-focus", url=f"{base}/home.html", w=1280, h=900, st=full, focus="#q"),
        dict(nn="08", slug="touch-targets", url=f"{base}/home.html", w=390, h=844, st=full, measure=True),
        dict(nn="09", slug="muted-or-reduced-motion", url=f"{base}/index.html", w=1280, h=900, st=state(reduce=True), reduced=True),
        dict(nn="10", slug="non-color-state", url=f"{base}/search.html?q={miss}", w=1280, h=800, st=full),
        dict(nn="11", slug="empty-or-loading", url=f"{base}/search.html?q=", w=1280, h=800, st=full),
        dict(nn="12", slug="error-or-pause", url=f"{base}/apps.html", w=1280, h=800, st=full),
        dict(nn="13", slug="intro-no-search", url=f"{base}/index.html", w=1280, h=900, st=fresh),
        dict(nn="14", slug="public-sns-search", url=f"{base}/home.html", w=1280, h=900, st=full),
        dict(nn="15", slug="embedded-qzone", url=f"{base}/space-syz.html", w=1280, h=900, st=full),
        dict(nn="16", slug="search-hit-newpage", url=f"{base}/search.html?q={hit}", w=1280, h=800, st=full),
        dict(nn="17", slug="search-miss-sentence", url=f"{base}/search.html?q={miss}", w=1280, h=800, st=full),
        dict(nn="18", slug="forbidden-black-red", url=f"{base}/search.html?q={forb}", w=1280, h=800, st=full),
        dict(nn="19", slug="archive-dossier", url=f"{base}/yince.html", w=1280, h=900, st=full),
        dict(nn="20", slug="album-cxb-identities", url=f"{base}/album-cxb.html", w=1280, h=900, st=full),
        dict(nn="21", slug="album-zt-greycoat", url=f"{base}/album-zt.html", w=1280, h=900, st=full),
        dict(nn="22", slug="avatars-visitors", url=f"{base}/visitors.html", w=1280, h=900, st=full),
        dict(nn="23", slug="profile-cxb-avatar", url=f"{base}/profile-cxb.html", w=1280, h=800, st=full),
        dict(nn="24", slug="ending-a", url=f"{base}/ending-a.html", w=1280, h=800, st=state(ending="logout")),
        dict(nn="25", slug="login-desk", url=f"{base}/login.html", w=1280, h=800, st=full, measure=True),
        dict(nn="26", slug="old-save-home", url=f"{base}/home.html", w=1280, h=800, st=old),
        dict(nn="27", slug="selftest", url=f"{base}/index.html?test=1", w=1280, h=800, st=fresh),
        dict(nn="28", slug="class-cyan", url=f"{base}/class.html", w=1280, h=800, st=full),
        dict(nn="29", slug="narrow-390-album", url=f"{base}/album-cxb.html", w=390, h=844, st=full),
        dict(nn="30", slug="ending-b", url=f"{base}/ending-b.html", w=1280, h=800, st=state(ending="keep")),
        dict(nn="31", slug="forbidden-static", url=f"{base}/forbidden.html", w=1280, h=800, st=full),
        dict(nn="32", slug="space-syz-avatar", url=f"{base}/space-syz.html", w=1280, h=900, st=full),
    ]


def run(phase):
    suffix = "-before" if phase == "before" else ""
    proc, page = start_chrome()
    measures = {}
    try:
        for lang, base, folder in (("zh", ZH, "20260823-d4-zh"), ("en", EN, "20260823-d4-en")):
            key = SAVE_ZH if lang == "zh" else SAVE_EN
            outdir = os.path.join(VISUAL, folder)
            os.makedirs(outdir, exist_ok=True)
            for job in jobs(base, lang):
                set_view(page, job["w"], job["h"])
                page.call("Emulation.setEmulatedMedia", {
                    "features": [{"name": "prefers-reduced-motion",
                                  "value": "reduce" if job.get("reduced") else "no-preference"}]
                })
                goto(page, f"{base}/index.html")
                js(page, "try{localStorage.clear()}catch(e){}")
                if job.get("st") is not None:
                    seed(page, key, job["st"])
                goto(page, job["url"])
                if job.get("focus"):
                    js(page, f"var el=document.querySelector({job['focus']!r}); if(el) el.focus();")
                    time.sleep(0.08)
                path = os.path.join(outdir, f"{job['nn']}-{job['slug']}{suffix}.png")
                n = shot(page, path)
                rec = {"path": path, "bytes": n, "url": job["url"], "w": job["w"], "h": job["h"]}
                if job.get("measure"):
                    rec["boxes"] = measure(page)
                measures[f"{lang}-{job['nn']}{suffix}"] = rec
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
    out = os.path.join(ROOT, f"measures-{phase}.json")
    json.dump(measures, open(out, "w"), ensure_ascii=False, indent=2)
    print("measures", out)


if __name__ == "__main__":
    run(sys.argv[1] if len(sys.argv) > 1 else "before")
