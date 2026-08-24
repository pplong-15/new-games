#!/usr/bin/env python3
"""Real-browser playtest: one ending, near-fail, old save. Evidence is not publish media."""
from __future__ import annotations

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
CDP_PORT = 9342
PROFILE = "/tmp/jinque-hall-playtest-cdp"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "_视觉美化", "playtest-evidence")
ZH = "http://127.0.0.1:8928"
EN = "http://127.0.0.1:8929"
SAVE_ZH = "jinque-hall-v1"
SAVE_EN = "jinque-hall-v1-en"

os.makedirs(OUT, exist_ok=True)


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


def wait_port(port, tries=50):
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
    return proc, page


def js(page, expression, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {"expression": expression, "returnByValue": True, "awaitPromise": await_promise},
    )
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
    time.sleep(0.2)


def shot(page, name):
    import base64
    data = page.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    path = os.path.join(OUT, name)
    with open(path, "wb") as f:
        f.write(base64.b64decode(data["data"]))
    return path


def set_view(page, w=1280, h=900):
    page.call(
        "Emulation.setDeviceMetricsOverride",
        {"width": w, "height": h, "deviceScaleFactor": 1, "mobile": w <= 430},
    )


def search(page, word):
    js(
        page,
        f"""
        (() => {{
          const i = document.querySelector('#search-input');
          const f = document.querySelector('#search-form');
          if (!i || !f) return false;
          i.value = {word!r};
          f.submit();
          return true;
        }})()
        """,
    )
    time.sleep(0.45)
    deadline = time.time() + 8
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.2)
    return js(page, "location.href")


def click_sel(page, selector):
    ok = js(
        page,
        f"""
        (() => {{
          const el = document.querySelector({selector!r});
          if (!el) return false;
          el.click();
          return true;
        }})()
        """,
    )
    time.sleep(0.4)
    deadline = time.time() + 8
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.2)
    return ok


def save(page, key):
    raw = js(page, f"localStorage.getItem({key!r})")
    try:
        return json.loads(raw) if raw else None
    except Exception:
        return raw


def log(events, **kw):
    events.append(kw)
    print(json.dumps(kw, ensure_ascii=False))


OLD_SAVE = {
    "v": 1,
    "unlocked": ["blog-jiaoying"],
    "visited": ["home", "blog-jiaoying"],
    "facts": ["lead_home", "fact_show"],
    "query": "加映场",
    "logged": False,
    "hint": 0,
    "large": False,
    "reduce": False,
}

MEASURE_JS = """
(() => {
  const sel = '#search-input, #search-form button, .boot-actions button, .choice-row button, .login-box input, .login-box button, [data-act=hint], [data-act=new], [data-act=wipe]';
  return [...document.querySelectorAll(sel)].map(el => {
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName,
      id: el.id || '',
      title: (el.getAttribute('aria-label') || el.textContent || el.placeholder || '').trim().slice(0, 40),
      w: Math.round(r.width),
      h: Math.round(r.height)
    };
  });
})()
"""


def undersize(boxes, min_h=44):
    bad = []
    for b in boxes or []:
        if b.get("h", 0) < min_h or b.get("w", 0) < min_h:
            bad.append(b)
    return bad


def visit_word(page, word):
    search(page, word)
    js(
        page,
        """
        (() => {
          const as = document.querySelectorAll('.box a');
          if (as[0]) as[0].click();
        })()
        """,
    )
    time.sleep(0.5)
    return js(page, "location.href")


def run_lang_path(page, events, *, base, save_key, words, miss_word, miss_needle, end_title, shot_prefix):
    set_view(page, 390, 844)
    go(page, f"{base}/introduction.html")
    js(page, "localStorage.clear()")
    go(page, f"{base}/introduction.html")
    log(events, step=f"{shot_prefix}-intro", href=js(page, "location.href"),
        has_search=js(page, "!!document.querySelector('#search-form')"))
    shot(page, f"{shot_prefix}-01-intro.png")
    if js(page, "!!document.querySelector('#search-form')"):
        events.append({"fail": f"{shot_prefix} intro has search"})
    click_sel(page, "[data-act=new]")
    log(events, step=f"{shot_prefix}-enter-hall", href=js(page, "location.href"),
        title=js(page, "document.title"))
    shot(page, f"{shot_prefix}-02-home-390.png")

    href = search(page, words["hit"])
    log(events, step=f"{shot_prefix}-search-hit", href=href,
        box=js(page, "document.querySelector('.box') && document.querySelector('.box').innerText.slice(0,180)"))
    shot(page, f"{shot_prefix}-03-hit.png")
    click_sel(page, ".box a")
    log(events, step=f"{shot_prefix}-open-blog", href=js(page, "location.href"),
        skin=js(page, "document.documentElement.className"))

    go(page, f"{base}/hall.html")
    search(page, words["stub"])
    click_sel(page, ".box a")
    log(events, step=f"{shot_prefix}-ticket", href=js(page, "location.href"),
        facts=(save(page, save_key) or {}).get("facts"))
    search(page, words["choice"])
    click_sel(page, ".box a")
    click_sel(page, "[data-end=a]")
    miss = js(page, "document.querySelector('[data-choice-miss]') && document.querySelector('[data-choice-miss]').textContent")
    log(events, step=f"{shot_prefix}-near-fail", miss=miss, facts=(save(page, save_key) or {}).get("facts"))
    shot(page, f"{shot_prefix}-04-near-fail.png")
    if miss_needle not in (miss or ""):
        events.append({"fail": f"{shot_prefix} near-fail sentence missing", "miss": miss})

    for word in words["five"]:
        href = visit_word(page, word)
        log(events, step=f"{shot_prefix}-visit", word=word, href=href,
            facts=(save(page, save_key) or {}).get("facts"))

    search(page, words["choice"])
    click_sel(page, ".box a")
    st = save(page, save_key) or {}
    log(events, step=f"{shot_prefix}-choice-ready", facts=st.get("facts"), href=js(page, "location.href"))
    click_sel(page, "[data-end=a]")
    href = js(page, "location.href")
    title = js(page, "document.title")
    log(events, step=f"{shot_prefix}-ending-a", href=href, title=title)
    shot(page, f"{shot_prefix}-05-ending-a.png")
    if "ending-a" not in href:
        events.append({"fail": f"{shot_prefix} did not reach ending-a", "href": href, "facts": st.get("facts")})
    if end_title and end_title not in (title or "") and end_title not in (js(page, "document.body.innerText") or ""):
        events.append({"fail": f"{shot_prefix} ending title missing", "title": title})

    go(page, f"{base}/index.html")
    search(page, miss_word)
    miss_text = js(page, "document.querySelector('.miss') && document.querySelector('.miss').innerText")
    log(events, step=f"{shot_prefix}-search-miss", text=miss_text)
    if not miss_text:
        events.append({"fail": f"{shot_prefix} miss sentence missing"})

    go(page, f"{base}/introduction.html")
    js(page, f"localStorage.setItem({save_key!r}, {json.dumps(json.dumps(OLD_SAVE))});")
    go(page, f"{base}/pages/blog-jiaoying.html")
    old_ok = "blog-jiaoying" in js(page, "location.href") and "skin-blog-personal-2008" in js(page, "document.documentElement.className")
    log(events, step=f"{shot_prefix}-old-save-blog", ok=old_ok, href=js(page, "location.href"),
        skin=js(page, "document.documentElement.className"))
    shot(page, f"{shot_prefix}-06-old-save.png")
    if not old_ok:
        events.append({"fail": f"{shot_prefix} old save blog not readable"})
    go(page, f"{base}/pages/ticket.html")
    locked = "forbidden" in js(page, "location.href")
    log(events, step=f"{shot_prefix}-old-save-locked-ticket", redirected_forbidden=locked, href=js(page, "location.href"))
    if not locked:
        events.append({"fail": f"{shot_prefix} old save ticket should stay locked"})


def smoke_seven(page, events):
    pages_320 = [
        ("shop", f"{ZH}/index.html", True),
        ("forum", f"{ZH}/pages/forum.html", True),
        ("intro", f"{ZH}/introduction.html", False),
        ("login", f"{ZH}/pages/login.html", True),
        ("choice", f"{ZH}/pages/choice.html", True),
        ("classified", f"{ZH}/pages/classified.html", True),
        ("gazetteer", f"{ZH}/pages/gazetteer.html", True),
        ("blog", f"{ZH}/pages/blog-jiaoying.html", True),
        ("mp", f"{ZH}/pages/obit-hou.html", True),
        ("mail", f"{ZH}/pages/mail-lu.html", True),
        ("desk", f"{ZH}/pages/desk.html", True),
        ("points", f"{ZH}/pages/points.html", True),
        ("qzone", f"{ZH}/pages/space-tianmai.html", True),
    ]
    unlocked = {
        "v": 1,
        "unlocked": [
            "blog-jiaoying", "points", "space-tianmai", "post-lu", "desk", "login",
            "handbook", "gazetteer", "obit-hou", "ticket", "choice", "mail-lu",
            "forum", "classified", "empty-seat", "ending-a",
        ],
        "visited": ["home"],
        "facts": ["fact_stub", "fact_hou", "fact_lu", "fact_empty", "fact_tian"],
        "query": "",
        "logged": True,
        "hint": 0,
        "large": False,
        "reduce": False,
    }
    unders = []
    for w, h, tag in ((320, 720, "320"), (390, 844, "390")):
        set_view(page, w, h)
        for name, url, need_state in pages_320:
            go(page, f"{ZH}/introduction.html")
            if need_state:
                js(page, f"localStorage.setItem({SAVE_ZH!r}, {json.dumps(json.dumps(unlocked))});")
            else:
                js(page, "localStorage.clear()")
            go(page, url)
            boxes = js(page, MEASURE_JS)
            bad = undersize(boxes)
            rec = {"step": f"smoke-size-{tag}-{name}", "url": url, "boxes": boxes, "undersize": bad}
            log(events, **rec)
            if bad:
                unders.append(rec)
    if unders:
        events.append({"fail": "controls under 44px", "count": len(unders)})

    set_view(page, 1280, 900)
    go(page, f"{ZH}/introduction.html")
    js(page, "localStorage.clear()")
    go(page, f"{ZH}/introduction.html")
    focused = js(
        page,
        """
        (() => {
          const el = document.querySelector('[data-act=new]');
          if (el) el.focus();
          const cs = el ? getComputedStyle(el) : null;
          return {
            focused: document.activeElement && document.activeElement.getAttribute('data-act'),
            outline: cs ? cs.outline : ''
          };
        })()
        """,
    )
    log(events, step="smoke-keyboard-intro-new", **(focused or {}))
    shot(page, "smoke-07-keyboard-intro.png")
    go(page, f"{ZH}/index.html")
    focused2 = js(
        page,
        """
        (() => {
          const el = document.querySelector('#search-input');
          if (el) el.focus();
          const cs = el ? getComputedStyle(el) : null;
          return {
            focused: document.activeElement && document.activeElement.id,
            outline: cs ? (cs.outline + ' ' + cs.outlineColor) : ''
          };
        })()
        """,
    )
    log(events, step="smoke-keyboard-search", **(focused2 or {}))

    set_view(page, 390, 844)
    go(page, f"{ZH}/index.html")
    search(page, "加映场")
    log(events, step="smoke-touch-search", href=js(page, "location.href"))
    if "search-results" not in js(page, "location.href"):
        events.append({"fail": "touch/search did not open results"})

    log(events, step="smoke-mute", note="N/A no audio track")

    go(page, f"{ZH}/introduction.html")
    js(page, f"localStorage.setItem({SAVE_ZH!r}, {json.dumps(json.dumps({**unlocked, 'reduce': True}))});")
    go(page, f"{ZH}/search-results.html?q=%E8%A5%BF%E7%93%9C")
    miss = js(page, "!!document.querySelector('.miss') && getComputedStyle(document.querySelector('.miss')).borderStyle")
    log(events, step="smoke-reduced-motion-miss", miss_border=miss)
    shot(page, "smoke-09-reduced-miss.png")

    go(page, f"{ZH}/search-results.html?q=%E6%BA%90%E7%A0%81")
    forb = js(
        page,
        """
        (() => {
          const root = document.documentElement.className;
          const before = getComputedStyle(document.querySelector('.box'), '::before').content;
          return {root, before};
        })()
        """,
    )
    log(events, step="smoke-forbidden-shape", **(forb or {}))
    if "skin-forbidden" not in (forb or {}).get("root", ""):
        events.append({"fail": "forbidden chrome missing"})

    log(events, step="smoke-no-flash", note="no looping animation; html.reduce kills transition")


def main():
    proc, page = start_chrome()
    events = []
    try:
        run_lang_path(
            page, events,
            base=ZH, save_key=SAVE_ZH,
            words={
                "hit": "加映场",
                "stub": "票根",
                "choice": "末班票",
                "five": ["田麦", "陆小棠", "空座", "老侯"],
            },
            miss_word="西瓜",
            miss_needle="还没核对完",
            end_title="退票",
            shot_prefix="zh",
        )
        run_lang_path(
            page, events,
            base=EN, save_key=SAVE_EN,
            words={
                "hit": "ExtraShow",
                "stub": "Stub",
                "choice": "LastTicket",
                "five": ["Tianmai", "LuXiaotang", "EmptySeat", "OldHou"],
            },
            miss_word="NoSuchWord",
            miss_needle="Not checked off yet",
            end_title="Refund",
            shot_prefix="en",
        )
        smoke_seven(page, events)
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

    path = os.path.join(os.path.dirname(__file__), "playtest-run.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(events, f, ensure_ascii=False, indent=2)
    fails = [e for e in events if e.get("fail")]
    print("WROTE", path, "fails", fails)
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main())
