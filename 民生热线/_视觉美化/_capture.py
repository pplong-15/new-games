#!/usr/bin/env python3
"""HTTP screenshots via Chrome CDP. phase=before|after"""
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
CDP_PORT = 9410
PROFILE = "/tmp/minsheng-hotline-cdp-profile"
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VIS = os.path.join(ROOT, "_视觉美化", "screenshots")
ZH = "http://127.0.0.1:9004"
EN = "http://127.0.0.1:9005"
SAVE_ZH = "minsheng-v1"
SAVE_EN = "minsheng-v1-en"


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
            time.sleep(0.1)
    raise RuntimeError("cdp port not up")


def js(cdp: CDP, expr: str):
    r = cdp.call(
        "Runtime.evaluate",
        {
            "expression": expr,
            "awaitPromise": True,
            "returnByValue": True,
        },
    )
    if r.get("exceptionDetails"):
        raise RuntimeError(r["exceptionDetails"])
    return (r.get("result") or {}).get("value")


def shot(cdp: CDP, path: str):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    data = cdp.call("Page.captureScreenshot", {"format": "png", "fromSurface": True})
    with open(path, "wb") as f:
        f.write(base64.b64decode(data["data"]))


def viewport(cdp: CDP, w: int, h: int):
    cdp.call(
        "Emulation.setDeviceMetricsOverride",
        {
            "width": w,
            "height": h,
            "deviceScaleFactor": 1,
            "mobile": w <= 400,
        },
    )


def goto(cdp: CDP, url: str):
    cdp.call("Page.navigate", {"url": url})
    cdp.call("Page.enable")
    time.sleep(0.45)
    js(cdp, "Promise.resolve(document.readyState)")
    time.sleep(0.25)


def boot_chrome():
    shutil.rmtree(PROFILE, ignore_errors=True)
    os.makedirs(PROFILE, exist_ok=True)
    proc = subprocess.Popen(
        [
            CHROME,
            "--headless=new",
            "--disable-gpu",
            f"--remote-debugging-port={CDP_PORT}",
            "--remote-allow-origins=*",
            f"--user-data-dir={PROFILE}",
            "--no-first-run",
            "--no-default-browser-check",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    wait_port(CDP_PORT)
    ws = None
    for _ in range(50):
        try:
            pages = json.load(urllib.request.urlopen(f"http://127.0.0.1:{CDP_PORT}/json/list"))
            page = next(
                (x for x in pages if x.get("type") == "page" and x.get("webSocketDebuggerUrl")),
                None,
            )
            if page:
                ws = page["webSocketDebuggerUrl"]
                break
        except Exception:
            pass
        time.sleep(0.1)
    if not ws:
        raise RuntimeError("no cdp page target")
    return proc, CDP(ws)


def set_win(cdp: CDP, wid: str, show: bool):
    cls = "window show" if show else "window"
    js(cdp, f"document.getElementById({json.dumps(wid)}).className = {json.dumps(cls)}; true")


def close_view(cdp: CDP):
    set_win(cdp, "win-view", False)


def close_ending(cdp: CDP):
    js(cdp, "document.getElementById('ending').className = ''; true")


def search(cdp: CDP, q: str):
    js(
        cdp,
        f"""
(() => {{
  const i = document.getElementById('q');
  i.value = {json.dumps(q)};
  document.getElementById('go').click();
  return document.getElementById('results').children.length;
}})()
""",
    )
    time.sleep(0.25)


def open_all_rows(cdp: CDP):
    js(
        cdp,
        """
(() => {
  const rows = [...document.querySelectorAll('#results .clip-row')];
  rows.forEach((r) => r.click());
  return rows.length;
})()
""",
    )
    time.sleep(0.2)


def open_first(cdp: CDP):
    js(
        cdp,
        """
(() => {
  const row = document.querySelector('#results .clip-row');
  if (row) row.click();
  return !!row;
})()
""",
    )
    time.sleep(0.25)


def set_save(cdp: CDP, key: str, obj: dict):
    js(
        cdp,
        f"localStorage.setItem({json.dumps(key)}, {json.dumps(json.dumps(obj))}); true",
    )


def fresh_desk(cdp: CDP, origin: str, save_key: str):
    goto(cdp, f"{origin}/index.html")
    js(cdp, "localStorage.removeItem(" + json.dumps(save_key) + "); location.reload();")
    time.sleep(0.55)
    close_ending(cdp)
    close_view(cdp)


def open_cut(cdp: CDP):
    js(cdp, "document.querySelector('[data-open=\"win-cut\"]').click(); true")
    time.sleep(0.2)
    js(
        cdp,
        """
(() => {
  const el = document.getElementById('win-cut');
  if (el && el.scrollIntoView) el.scrollIntoView({block:'start'});
  return el && el.className;
})()
""",
    )
    time.sleep(0.15)


def capture_lang(cdp: CDP, lang: str, origin: str, save_key: str, suffix: str, out: str):
    desk = 1280, 800
    q5 = "应声" if lang == "zh" else "Answer"
    q_empty = "喹啉" if lang == "zh" else "zzzznotaword"
    q_short = "一" if lang == "zh" else "A"
    q_paper = "辟谣" if lang == "zh" else "circular"
    milk_qs = ("应声", "招招", "刘所长") if lang == "zh" else ("Answer", "Zhaozhao", "Liu")

    viewport(cdp, *desk)
    goto(cdp, f"{origin}/introduction.html")
    shot(cdp, os.path.join(out, f"01-intro{suffix}.png"))

    fresh_desk(cdp, origin, save_key)
    shot(cdp, os.path.join(out, f"02-desk-search{suffix}.png"))

    search(cdp, q5)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"03-five-results{suffix}.png"))

    open_first(cdp)
    shot(cdp, os.path.join(out, f"04-monitor{suffix}.png"))

    close_view(cdp)
    open_cut(cdp)
    shot(cdp, os.path.join(out, f"05-four-keys-disabled{suffix}.png"))

    set_win(cdp, "win-cut", False)
    search(cdp, q_empty)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"06-empty-results{suffix}.png"))

    search(cdp, q_short)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"07-error-short{suffix}.png"))

    search(cdp, q5)
    close_view(cdp)
    js(cdp, "document.getElementById('q').focus(); true")
    time.sleep(0.1)
    shot(cdp, os.path.join(out, f"08-focus-search{suffix}.png"))

    viewport(cdp, 320, 640)
    fresh_desk(cdp, origin, save_key)
    search(cdp, q5)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"09-320-search{suffix}.png"))

    viewport(cdp, 390, 880)
    fresh_desk(cdp, origin, save_key)
    close_view(cdp)
    open_cut(cdp)
    shot(cdp, os.path.join(out, f"10-390-keys{suffix}.png"))

    viewport(cdp, *desk)
    fresh_desk(cdp, origin, save_key)
    search(cdp, q_paper)
    open_all_rows(cdp)
    close_view(cdp)
    open_cut(cdp)
    shot(cdp, os.path.join(out, f"11-paper-keys{suffix}.png"))
    js(cdp, "document.getElementById('end-paper').click(); true")
    time.sleep(0.3)
    shot(cdp, os.path.join(out, f"12-paper-ending{suffix}.png"))

    fresh_desk(cdp, origin, save_key)
    for qq in milk_qs:
        search(cdp, qq)
        open_all_rows(cdp)
        close_view(cdp)
    open_cut(cdp)
    shot(cdp, os.path.join(out, f"13-milk-keys-ready{suffix}.png"))
    js(cdp, "document.getElementById('end-milk').click(); true")
    time.sleep(0.3)
    shot(cdp, os.path.join(out, f"14-milk-ending{suffix}.png"))

    goto(cdp, f"{origin}/index.html")
    set_save(
        cdp,
        save_key,
        {
            "yingsheng": 1,
            "zhaozhao": 1,
            "liusuochang": 1,
            "piyao": 1,
            "seen": {"C001": 1, "C019": 1},
            "lock": "paper",
        },
    )
    js(cdp, "location.reload();")
    time.sleep(0.55)
    shot(cdp, os.path.join(out, f"15-lock{suffix}.png"))
    shot(cdp, os.path.join(out, f"16-old-save{suffix}.png"))

    viewport(cdp, *desk)
    fresh_desk(cdp, origin, save_key)
    js(
        cdp,
        """
document.documentElement.classList.add('reduce');
document.getElementById('q').focus();
true
""",
    )
    search(cdp, q5)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"17-reduced-motion{suffix}.png"))

    js(cdp, "document.querySelector('[data-open=\"win-note\"]').click(); true")
    time.sleep(0.15)
    close_view(cdp)
    shot(cdp, os.path.join(out, f"18-note-layer{suffix}.png"))
    js(cdp, "document.querySelector('[data-open=\"win-help\"]').click(); true")
    time.sleep(0.15)
    shot(cdp, os.path.join(out, f"19-help-layer{suffix}.png"))


def main():
    phase = sys.argv[1] if len(sys.argv) > 1 else "after"
    suffix = "-before" if phase == "before" else ""
    out = os.path.join(VIS, "before" if phase == "before" else "after")
    os.makedirs(out, exist_ok=True)
    proc, cdp = boot_chrome()
    try:
        cdp.call("Page.enable")
        out_en = os.path.join(out, "en")
        os.makedirs(out_en, exist_ok=True)
        capture_lang(cdp, "zh", ZH, SAVE_ZH, suffix, out)
        capture_lang(cdp, "en", EN, SAVE_EN, suffix, out_en)
    finally:
        cdp.close()
        proc.terminate()
        try:
            proc.wait(timeout=3)
        except Exception:
            proc.kill()
        shutil.rmtree(PROFILE, ignore_errors=True)
    print("wrote", out)


if __name__ == "__main__":
    main()
