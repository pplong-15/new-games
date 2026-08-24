#!/usr/bin/env python3
"""Real Chrome walk: three ending + overclaim near-fail + old save. ZH+EN."""
from __future__ import annotations

import json
import os
import shutil
import subprocess
import sys
import time
import urllib.request

from websocket import create_connection

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
CDP_PORT = 9342
PROFILE = "/tmp/dq-miji-play-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
OUT = os.path.join(ROOT, "visual", "三密级字段对照")
ZH = "http://127.0.0.1:8824"
EN = "http://127.0.0.1:8825"
KEY_ZH = "anpu-diquan-miji-v1"
KEY_EN = "anpu-diquan-miji-v1-en"

CRED = {
    "zh": {
        "internal": ("QP-夜-04", "nanshan047"),
        "restrict": ("QT-密-07", "jiaojie083"),
        "mail": ("ye-anpu", "chouti0819"),
    },
    "en": {
        "internal": ("QP-NIGHT-04", "nanshan047"),
        "restrict": ("QT-RES-07", "jiaojie083"),
        "mail": ("ye-anpu", "chouti0819"),
    },
}


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


def wait_port(port, tries=80):
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
    page_tab = next(t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl"))
    page = CDP(page_tab["webSocketDebuggerUrl"])
    page.call("Page.enable")
    page.call("Runtime.enable")
    return proc, page


def eval_js(page, expression, await_promise=False):
    r = page.call(
        "Runtime.evaluate",
        {"expression": expression, "returnByValue": True, "awaitPromise": await_promise},
    )
    if r.get("exceptionDetails"):
        raise RuntimeError(json.dumps(r["exceptionDetails"])[:400])
    return (r.get("result") or {}).get("value")


def goto(page, url):
    page.call("Page.navigate", {"url": url})
    deadline = time.time() + 12
    while time.time() < deadline:
        ready = eval_js(page, "document.readyState")
        if ready == "complete":
            break
        time.sleep(0.05)
    time.sleep(0.25)


def click_extract_all(page):
    n = eval_js(
        page,
        """
        (() => {
          const btns = [...document.querySelectorAll('[data-extract]')];
          btns.forEach(b => b.click());
          return btns.length;
        })()
        """,
    )
    time.sleep(0.15)
    return n


def login(page, user, password):
    eval_js(
        page,
        f"""
        (() => {{
          const u = document.getElementById('user');
          const p = document.getElementById('pass');
          const f = document.getElementById('dq-login');
          if (u) u.value = {json.dumps(user)};
          if (p) p.value = {json.dumps(password)};
          if (f && f.requestSubmit) f.requestSubmit();
          else if (f) f.dispatchEvent(new Event('submit', {{cancelable:true, bubbles:true}}));
          return true;
        }})()
        """,
    )
    time.sleep(0.45)


def pick_note(page, picks):
    eval_js(
        page,
        f"""
        (() => {{
          const picks = {json.dumps(picks)};
          Object.keys(picks).forEach(name => {{
            const el = document.querySelector('input[name="'+name+'"][value="'+picks[name]+'"]');
            if (el) {{ el.checked = true; el.dispatchEvent(new Event('change', {{bubbles:true}})); }}
          }});
          const go = document.getElementById('dq-submit');
          if (go) go.click();
          return true;
        }})()
        """,
    )
    time.sleep(0.55)


def load_state(page, key):
    raw = eval_js(page, f"localStorage.getItem({json.dumps(key)})")
    return json.loads(raw) if raw else None


def walk_three(page, base, lang, key):
    cred = CRED[lang]
    goto(page, f"{base}/introduction.html")
    eval_js(page, "localStorage.clear(); DQ && DQ.reset && DQ.reset();")
    goto(page, f"{base}/public/deed-047.html")
    n1 = click_extract_all(page)
    goto(page, f"{base}/desk/login.html")
    login(page, *cred["internal"])
    href = eval_js(page, "location.pathname")
    goto(page, f"{base}/desk/internal-047.html")
    n2 = click_extract_all(page)
    denied = eval_js(page, "document.title")
    goto(page, f"{base}/mail/login.html")
    login(page, *cred["mail"])
    goto(page, f"{base}/desk/lock.html")
    login(page, *cred["restrict"])
    goto(page, f"{base}/desk/restricted-047.html")
    n3 = click_extract_all(page)
    goto(page, f"{base}/desk/note.html")
    pick_note(
        page,
        {
            "time": "time-conflict",
            "money": "money-conflict",
            "bound": "bound-conflict",
            "guar": "guar-internal",
            "dead": "dead-conflict",
        },
    )
    path = eval_js(page, "location.pathname")
    title = eval_js(page, "document.getElementById('dq-rt') && document.getElementById('dq-rt').textContent")
    st = load_state(page, key)
    return {
        "extracts": [n1, n2, n3],
        "after_internal_login_path": href,
        "internal_title": denied,
        "result_path": path,
        "result_title": title,
        "ending": (st or {}).get("ending"),
        "closed": (st or {}).get("closed"),
        "visited_restrict": bool((st or {}).get("visited", {}).get("restricted-047")),
    }


def walk_overclaim(page, base, lang, key):
    cred = CRED[lang]
    goto(page, f"{base}/introduction.html")
    eval_js(page, "DQ && DQ.reset && DQ.reset(); localStorage.clear();")
    goto(page, f"{base}/public/deed-047.html")
    click_extract_all(page)
    goto(page, f"{base}/desk/login.html")
    login(page, *cred["internal"])
    goto(page, f"{base}/desk/internal-047.html")
    click_extract_all(page)
    goto(page, f"{base}/mail/login.html")
    login(page, *cred["mail"])
    goto(page, f"{base}/desk/lock.html")
    login(page, *cred["restrict"])
    goto(page, f"{base}/desk/restricted-047.html")
    click_extract_all(page)
    goto(page, f"{base}/desk/note.html")
    pick_note(
        page,
        {
            "time": "time-restrict",
            "money": "money-restrict",
            "bound": "bound-restrict",
            "guar": "guar-restrict",
            "dead": "dead-unique",
        },
    )
    path = eval_js(page, "location.pathname")
    title = eval_js(page, "document.getElementById('dq-rt') && document.getElementById('dq-rt').textContent")
    st = load_state(page, key)
    goto(page, f"{base}/desk/note.html")
    note_ok = eval_js(page, "!!document.getElementById('dq-note')")
    return {
        "result_path": path,
        "result_title": title,
        "ending": (st or {}).get("ending"),
        "closed": (st or {}).get("closed"),
        "note_after_recover": note_ok,
    }


def old_save(page, base, key):
    goto(page, f"{base}/introduction.html")
    eval_js(page, f"localStorage.removeItem({json.dumps(key)});")
    payload = {
        "visited": {"deed-047": True, "intro": True},
        "extracted": {"time-public": True, "money-public": True},
        "sess": {"internal": False, "restrict": False, "mail": False},
        "picks": {"time": "time-public", "money": "money-public", "bound": "", "guar": "", "dead": ""},
        "hint": 0,
        "ending": "",
        "closed": False,
    }
    eval_js(
        page,
        f"localStorage.setItem({json.dumps(key)}, {json.dumps(json.dumps(payload, ensure_ascii=False))});",
    )
    goto(page, f"{base}/desk/note.html")
    st = load_state(page, key)
    checked = eval_js(
        page,
        """
        (() => {
          const t = document.querySelector('input[name="time"]:checked');
          const m = document.querySelector('input[name="money"]:checked');
          return {time: t && t.value, money: m && m.value, n: document.getElementById('dq-draft-n') && document.getElementById('dq-draft-n').textContent};
        })()
        """,
    )
    return {"loaded_picks": (st or {}).get("picks"), "ui": checked, "key_ok": key in eval_js(page, "Object.keys(localStorage)")}


def main():
    proc, page = start_chrome()
    report = {}
    try:
        for lang, base, key in (("zh", ZH, KEY_ZH), ("en", EN, KEY_EN)):
            report[lang] = {
                "three": walk_three(page, base, lang, key),
                "overclaim": walk_overclaim(page, base, lang, key),
                "old_save": old_save(page, base, key),
            }
            print(lang, json.dumps(report[lang], ensure_ascii=False)[:500], flush=True)
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
    path = os.path.join(ROOT, "_视觉美化", "playtest-run.json")
    with open(path, "w", encoding="utf-8") as f:
        json.dump(report, f, ensure_ascii=False, indent=2)
    print("wrote", path)
    bad = []
    for lang, rec in report.items():
        if rec["three"].get("ending") != "three":
            bad.append(f"{lang} three ending={rec['three'].get('ending')}")
        if rec["overclaim"].get("ending") != "overclaim":
            bad.append(f"{lang} overclaim ending={rec['overclaim'].get('ending')}")
        if rec["overclaim"].get("closed") is not False:
            bad.append(f"{lang} overclaim closed")
        picks = (rec["old_save"].get("ui") or {})
        if picks.get("time") != "time-public" or picks.get("money") != "money-public":
            bad.append(f"{lang} old save ui {picks}")
    if bad:
        print("FAIL", bad)
        sys.exit(1)
    print("PLAYTEST_OK")


if __name__ == "__main__":
    main()
