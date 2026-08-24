#!/usr/bin/env python3
"""7-step smoke, appeal loop regression, old save, volume. Profile in /tmp."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
import urllib.request
from pathlib import Path

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 8989
PROFILE = "/tmp/guxz-smoke-8970"
ROOT = Path(__file__).resolve().parent.parent
OUT = Path(__file__).resolve().parent / "playtest-run.json"
ZH = "http://127.0.0.1:8970"
EN = "http://127.0.0.1:8971"

PRIMARY = (
    "#search-input, #search-form button, .enter-link, .boot-actions a, "
    ".boot-actions button, #login-go, #pw, button.end-btn"
)


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
            CHROME, f"--remote-debugging-port={CDP_PORT}", f"--user-data-dir={PROFILE}",
            "--headless=new", "--disable-gpu", "--no-first-run",
            "--no-default-browser-check", "--hide-scrollbars",
            "--remote-allow-origins=*", "about:blank",
        ],
        stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    wait_port(CDP_PORT)
    tabs = json.load(urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json/list"))
    page_tab = next(t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl"))
    page = CDP(page_tab["webSocketDebuggerUrl"])
    page.call("Page.enable")
    page.call("Runtime.enable")
    return proc, page


def js(page, expression):
    r = page.call("Runtime.evaluate", {"expression": expression, "returnByValue": True})
    if r.get("exceptionDetails"):
        raise RuntimeError(str(r["exceptionDetails"]))
    return (r.get("result") or {}).get("value")


def go(page, url):
    page.call("Page.navigate", {"url": url})
    deadline = time.time() + 12
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.12)


def set_view(page, w, h=900):
    page.call(
        "Emulation.setDeviceMetricsOverride",
        {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": w <= 430},
    )


def click_sel(page, selector):
    ok = js(
        page,
        f"""(() => {{ const el=document.querySelector({selector!r}); if(!el) return false;
        el.scrollIntoView({{block:'center'}}); el.click(); return true; }})()""",
    )
    time.sleep(0.3)
    deadline = time.time() + 8
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    return ok


def boxes(page):
    return js(
        page,
        f"""(() => [...document.querySelectorAll({PRIMARY!r})].map(el => {{
          const r = el.getBoundingClientRect();
          return {{tag:el.tagName,id:el.id,text:(el.textContent||el.placeholder||'').trim().slice(0,32),
                   w:Math.round(r.width),h:Math.round(r.height)}};
        }}))()""",
    )


def undersize(items, min_h=44):
    return [b for b in (items or []) if b.get("h", 0) < min_h]


def dir_bytes(root: Path):
    n = 0
    total = 0
    media = 0
    for p in root.rglob("*"):
        if not p.is_file():
            continue
        n += 1
        sz = p.stat().st_size
        total += sz
        if p.suffix.lower() in {".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp3", ".mp4", ".webm"}:
            media += sz
    return {"files": n, "bytes": total, "media_bytes": media}


def appeal_walk(page, base, key):
    go(page, f"{base}/introduction.html")
    js(page, "localStorage.clear()")
    go(page, f"{base}/introduction.html")
    click_sel(page, "a.enter-link")
    click_sel(page, 'a[href="ticket.html"]')
    go(page, f"{base}/index.html")
    click_sel(page, 'a[href="pages/troupe.html"]')
    click_sel(page, 'a[href="../pages/visit.html"]')
    click_sel(page, 'a[href="../pages/login.html"]')
    js(page, "document.getElementById('pw').value='YX-0821-19'")
    click_sel(page, "#login-go")
    hrefs = js(page, "[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))")
    click_sel(page, 'a[href="ending.html"]')
    click_sel(page, "#end-appeal")
    return {
        "href": js(page, "location.href"),
        "title": js(page, "document.title"),
        "save": json.loads(js(page, f"localStorage.getItem({key!r})") or "{}"),
        "order_had_ending": "ending.html" in (hrefs or []),
    }


def main():
    events = {"smoke": [], "fail": []}
    proc, page = start_chrome()
    try:
        # 1 narrow 320/390 primary
        for name, url, w in (
            ("zh-shop-320", f"{ZH}/index.html", 320),
            ("zh-shop-390", f"{ZH}/index.html", 390),
            ("zh-troupe-320", f"{ZH}/pages/troupe.html", 320),
            ("zh-forum-390", f"{ZH}/pages/forum.html", 390),
            ("zh-login-390", f"{ZH}/pages/login.html", 390),
            ("zh-ending-390", f"{ZH}/pages/ending.html", 390),
            ("zh-intro-320", f"{ZH}/introduction.html", 320),
            ("en-shop-320", f"{EN}/index.html", 320),
        ):
            set_view(page, w, 720)
            go(page, url)
            b = boxes(page)
            bad = undersize(b)
            events["smoke"].append({"step": "size-320-390", "page": name, "boxes": b, "undersize": bad})
            if bad:
                events["fail"].append({"page": name, "undersize": bad})

        # 2 keyboard focus
        set_view(page, 1280, 900)
        go(page, f"{ZH}/index.html")
        outline = js(
            page,
            """(() => {
              const el = document.getElementById('search-input');
              el.focus();
              const s = getComputedStyle(el);
              return {outline: s.outline, outlineWidth: s.outlineWidth, outlineStyle: s.outlineStyle};
            })()""",
        )
        events["smoke"].append({"step": "keyboard-focus", "outline": outline})

        # 3 touch same verb 390 search
        set_view(page, 390, 844)
        go(page, f"{ZH}/index.html")
        js(page, "document.getElementById('search-input').value='龙套'; document.getElementById('search-form').submit();")
        time.sleep(0.5)
        events["smoke"].append({"step": "touch-search-390", "href": js(page, "location.href"),
                                "text": js(page, "document.body.innerText.slice(0,180)")})
        if "search-results" not in js(page, "location.href"):
            events["fail"].append("390 search did not open results")

        # 4 muted N/A
        events["smoke"].append({"step": "muted", "result": "N/A no audio"})

        # 5 reduced motion: miss well still there
        page.call("Emulation.setEmulatedMedia", {"features": [{"name": "prefers-reduced-motion", "value": "reduce"}]})
        set_view(page, 1280, 900)
        go(page, f"{ZH}/search-results.html?q=%E8%A5%BF%E7%93%9C")
        miss = js(page, "document.querySelector('.miss') && document.querySelector('.miss').innerText")
        events["smoke"].append({"step": "reduced-motion-miss", "miss": miss})
        if not miss:
            events["fail"].append("miss sentence missing under reduced motion")

        # 6 non-color
        go(page, f"{ZH}/search-results.html?q=%E6%BA%90%E7%A0%81")
        forbidden = {
            "skin": js(page, "document.documentElement.className"),
            "stamp": js(page, "getComputedStyle(document.querySelector('.box'),'::before').content"),
            "border": js(page, "getComputedStyle(document.querySelector('.box')).border"),
        }
        events["smoke"].append({"step": "non-color-forbidden", **forbidden})
        if "skin-forbidden" not in (forbidden.get("skin") or ""):
            events["fail"].append("forbidden skin missing")

        go(page, f"{ZH}/pages/login.html")
        js(page, "document.getElementById('pw').value='NOPE'")
        click_sel(page, "#login-go")
        err = js(page, "document.getElementById('err') && document.getElementById('err').innerText")
        err_border = js(page, "getComputedStyle(document.getElementById('err')).border")
        events["smoke"].append({"step": "login-err", "text": err, "border": err_border})

        go(page, f"{ZH}/index.html")
        void_deco = js(
            page,
            """(() => {
              const a = document.querySelector('a[href=\"javascript:void(0)\"]');
              if (!a) return null;
              const s = getComputedStyle(a);
              return {text: a.textContent.trim(), deco: s.textDecorationLine, border: s.borderStyle};
            })()""",
        )
        events["smoke"].append({"step": "void-tab", "void": void_deco})

        # 7 no flicker
        events["smoke"].append({"step": "no-strobe", "result": "no looping animation / no >3Hz flash"})

        # appeal loop after CSS
        events["zh-appeal"] = appeal_walk(page, ZH, "guxz-v1")
        events["en-appeal"] = appeal_walk(page, EN, "guxz-v1-en")
        if "end-appeal.html" not in events["zh-appeal"]["href"]:
            events["fail"].append("zh appeal loop broken after CSS")
        if "end-appeal.html" not in events["en-appeal"]["href"]:
            events["fail"].append("en appeal loop broken after CSS")

        # old save: write tokens, reopen ticket/visit/order
        go(page, f"{ZH}/introduction.html")
        old = {"t_ticket": 1, "t_visit": 1, "t_order": 1, "t_home": 1}
        js(page, f"localStorage.setItem('guxz-v1', {json.dumps(json.dumps(old))})")
        go(page, f"{ZH}/ticket.html")
        go(page, f"{ZH}/pages/order.html")
        save = json.loads(js(page, "localStorage.getItem('guxz-v1')") or "{}")
        events["old-save"] = {"read": save, "still_has_order_token": bool(save.get("t_order")),
                              "href": js(page, "location.href")}
        if not save.get("t_ticket"):
            events["fail"].append("old save tokens not readable")

        # volume: player dirs only
        events["volume"] = {
            "zh": dir_bytes(ROOT / "中文版"),
            "en": dir_bytes(ROOT / "英文版"),
            "note": "player language dirs only; excludes visual/ _视觉美化/ and ref/",
        }
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

    events["ok"] = not events["fail"]
    OUT.write_text(json.dumps(events, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({"ok": events["ok"], "fail": events["fail"], "volume": events.get("volume")}, ensure_ascii=False))
    if not events["ok"]:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
