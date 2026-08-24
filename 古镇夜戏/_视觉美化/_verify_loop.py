#!/usr/bin/env python3
"""Step-1 loop proof: intro → order → ending → appeal, plus other three endings."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import time
import urllib.request
from html.parser import HTMLParser
from urllib.parse import urljoin, urlparse

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 8979
PROFILE = "/tmp/guxz-loop-8970"
ZH = "http://127.0.0.1:8970"
EN = "http://127.0.0.1:8971"
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "loop-verify.json")


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


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and "href" in d:
            self.hrefs.append(d["href"])


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
    deadline = time.time() + 8
    while time.time() < deadline:
        if js(page, "document.readyState") == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.15)
    return ok


def href(page):
    return js(page, "location.href")


def title(page):
    return js(page, "document.title")


def save(page, key):
    raw = js(page, f"localStorage.getItem({key!r})")
    try:
        return json.loads(raw) if raw else {}
    except Exception:
        return {"raw": raw}


def live_bfs(origin):
    start = urljoin(origin + "/", "introduction.html")
    q = [start]
    parent = {start: None}
    while q:
        url = q.pop(0)
        try:
            with urllib.request.urlopen(url, timeout=15) as r:
                body = r.read()
        except Exception:
            continue
        p = LinkParser()
        p.feed(body.decode("utf-8", "replace"))
        for raw in p.hrefs:
            if not raw or raw.startswith(("javascript:", "mailto:", "#")):
                continue
            absu = urljoin(url, raw).split("#")[0].split("?")[0]
            if urlparse(absu).netloc != urlparse(origin).netloc:
                continue
            if not absu.endswith(".html"):
                continue
            if absu not in parent:
                parent[absu] = url
                q.append(absu)
    keys = sorted({urlparse(u).path.lstrip("/") or "index.html" for u in parent})
    ending = [k for k in keys if k.endswith("pages/ending.html") or "/end-" in k]
    return {"n": len(keys), "ending": ending, "has_ending": "pages/ending.html" in keys}


def walk_appeal(page, base, save_key, lang):
    log = []
    go(page, f"{base}/introduction.html")
    js(page, "localStorage.clear()")
    go(page, f"{base}/introduction.html")
    log.append({"step": "intro", "href": href(page), "title": title(page)})
    if not click_sel(page, "a.enter-link"):
        return {"ok": False, "fail": "no enter-link", "log": log}
    log.append({"step": "index", "href": href(page)})
    if "index.html" not in href(page):
        return {"ok": False, "fail": "did not reach index", "log": log}
    if not click_sel(page, 'a[href="ticket.html"]'):
        return {"ok": False, "fail": "no ticket link", "log": log}
    log.append({"step": "ticket", "href": href(page), "save": save(page, save_key)})
    go(page, f"{base}/index.html")
    if not click_sel(page, 'a[href="pages/troupe.html"]'):
        return {"ok": False, "fail": "no troupe link", "log": log}
    log.append({"step": "troupe", "href": href(page)})
    visit_sel = 'a[href="../pages/visit.html"], a[href="visit.html"]'
    if not click_sel(page, visit_sel):
        return {"ok": False, "fail": "no visit link", "log": log}
    log.append({"step": "visit", "href": href(page), "save": save(page, save_key)})
    login_sel = 'a[href="../pages/login.html"]'
    if not click_sel(page, login_sel):
        return {"ok": False, "fail": "no login link", "log": log}
    log.append({"step": "login", "href": href(page)})
    js(page, "document.getElementById('pw').value='YX-0821-19'")
    if not click_sel(page, "#login-go"):
        return {"ok": False, "fail": "no login-go", "log": log}
    log.append({"step": "order", "href": href(page), "save": save(page, save_key)})
    if "order.html" not in href(page):
        return {"ok": False, "fail": "login did not open order", "log": log}
    ending_hrefs = js(
        page,
        """[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))""",
    )
    if "ending.html" not in ending_hrefs:
        return {"ok": False, "fail": "order missing ending.html href", "hrefs": ending_hrefs, "log": log}
    if not click_sel(page, 'a[href="ending.html"]'):
        return {"ok": False, "fail": "click ending failed", "log": log}
    log.append({"step": "ending", "href": href(page), "title": title(page), "save": save(page, save_key)})
    if "ending.html" not in href(page):
        return {"ok": False, "fail": "did not reach ending from order", "log": log}
    if not click_sel(page, "#end-appeal"):
        return {"ok": False, "fail": "no appeal button", "log": log}
    log.append({"step": "appeal", "href": href(page), "title": title(page), "save": save(page, save_key)})
    ok = "end-appeal.html" in href(page)
    expected_title = "钱退了" if lang == "zh" else "Money refunded"
    return {
        "ok": ok and expected_title in (title(page) or ""),
        "expected_title": expected_title,
        "log": log,
    }


def ending_from_order_with_tokens(page, base, save_key, grant_paths, btn, dest, dest_title):
    go(page, f"{base}/introduction.html")
    js(page, "localStorage.clear()")
    for path in grant_paths:
        go(page, f"{base}/{path}")
    go(page, f"{base}/pages/order.html")
    hrefs = js(page, """[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))""")
    if "ending.html" not in hrefs:
        return {"ok": False, "fail": "order missing ending link", "hrefs": hrefs}
    if not click_sel(page, 'a[href="ending.html"]'):
        return {"ok": False, "fail": "click ending failed"}
    if "ending.html" not in href(page):
        return {"ok": False, "fail": "not on ending", "href": href(page)}
    if not click_sel(page, btn):
        return {"ok": False, "fail": f"click {btn} failed"}
    got = href(page)
    got_title = title(page)
    return {
        "ok": dest in got and dest_title in (got_title or ""),
        "href": got,
        "title": got_title,
        "save": save(page, save_key),
        "btn": btn,
        "dest": dest,
    }


def main():
    events = {"zh": {}, "en": {}}
    proc, page = start_chrome()
    try:
        events["zh"]["bfs"] = live_bfs(ZH)
        events["en"]["bfs"] = live_bfs(EN)
        events["zh"]["appeal"] = walk_appeal(page, ZH, "guxz-v1", "zh")
        events["en"]["appeal"] = walk_appeal(page, EN, "guxz-v1-en", "en")
        events["zh"]["strike"] = ending_from_order_with_tokens(
            page, ZH, "guxz-v1",
            ["pages/roster.html", "pages/playbill-scan.html", "pages/incense.html"],
            "#end-strike", "end-strike.html", "划掉了",
        )
        events["zh"]["enter"] = ending_from_order_with_tokens(
            page, ZH, "guxz-v1",
            ["ticket.html", "pages/visit.html", "pages/thread-doupi.html"],
            "#end-enter", "end-enter.html", "入场",
        )
        events["zh"]["day"] = ending_from_order_with_tokens(
            page, ZH, "guxz-v1",
            ["pages/baixi.html", "pages/roster.html"],
            "#end-day", "end-day.html", "改挂白戏",
        )
        events["en"]["strike"] = ending_from_order_with_tokens(
            page, EN, "guxz-v1-en",
            ["pages/roster.html", "pages/playbill-scan.html", "pages/incense.html"],
            "#end-strike", "end-strike.html", "Struck through",
        )
        events["en"]["enter"] = ending_from_order_with_tokens(
            page, EN, "guxz-v1-en",
            ["ticket.html", "pages/visit.html", "pages/thread-doupi.html"],
            "#end-enter", "end-enter.html", "Admission",
        )
        events["en"]["day"] = ending_from_order_with_tokens(
            page, EN, "guxz-v1-en",
            ["pages/baixi.html", "pages/roster.html"],
            "#end-day", "end-day.html", "Refiled as WhitePlay",
        )
        checks = []
        for lang in ("zh", "en"):
            checks.append(events[lang]["bfs"].get("has_ending"))
            for k in ("appeal", "strike", "enter", "day"):
                checks.append(bool(events[lang][k].get("ok")))
        events["all_ok"] = all(checks)
        events["checks"] = checks
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

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(events, f, ensure_ascii=False, indent=2)
    print(json.dumps({"all_ok": events.get("all_ok"), "out": OUT}, ensure_ascii=False))
    for lang in ("zh", "en"):
        print(lang, "bfs", events[lang]["bfs"])
        for k in ("appeal", "strike", "enter", "day"):
            blob = events[lang][k]
            print(lang, k, "ok=", blob.get("ok"), "href=", blob.get("href") or (blob.get("log") or [{}])[-1])
    if not events.get("all_ok"):
        raise SystemExit(1)


if __name__ == "__main__":
    main()
