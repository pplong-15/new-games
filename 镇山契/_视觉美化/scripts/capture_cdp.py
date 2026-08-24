#!/usr/bin/env python3
"""Local CDP screenshots for 镇山契. Requires Chrome + websocket-client."""
from __future__ import annotations

import base64
import json
import os
import sys
import time
import urllib.parse
import urllib.request
import subprocess
from pathlib import Path

import websocket

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT = Path("/Users/jianglong/Desktop/游戏美化/镇山契")
ZH = "/相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html"
EN = "/相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html"
OUT = ROOT / "_视觉美化/visual/槐县五站搜词调查/20260823-d12"


def encode_path(path: str) -> str:
    return "/".join(urllib.parse.quote(seg) if seg else "" for seg in path.split("/"))


class CDP:
    def __init__(self, port: int) -> None:
        page = None
        for _ in range(25):
            listing = json.loads(
                urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list", timeout=5).read()
            )
            page = next(
                (
                    t
                    for t in listing
                    if t.get("type") == "page" and t.get("webSocketDebuggerUrl")
                ),
                None,
            )
            if page:
                break
            time.sleep(0.2)
        if page is None:
            page = json.loads(
                urllib.request.urlopen(f"http://127.0.0.1:{port}/json/new?about:blank", timeout=5).read()
            )
        ws = page["webSocketDebuggerUrl"]
        self.ws = websocket.create_connection(ws, timeout=25)
        self.n = 0
        self.invoke("Page.enable")
        self.invoke("Runtime.enable")
        self.invoke("Page.bringToFront")

    def send(self, method: str, **params):
        self.n += 1
        payload = json.dumps({"id": self.n, "method": method, "params": params})
        self.ws.send(payload)
        while True:
            data = json.loads(self.ws.recv())
            if data.get("id") == self.n:
                if "error" in data:
                    raise RuntimeError(data["error"])
                return data.get("result", {})

    def invoke(self, method: str, **params):
        return self.send(method, **params)

    def eval(self, expr: str):
        r = self.invoke(
            "Runtime.evaluate",
            expression=expr,
            awaitPromise=True,
            returnByValue=True,
        )
        return r.get("result", {}).get("value")

    def goto(self, url: str, wait: float = 0.9) -> None:
        self.invoke("Page.navigate", url=url)
        time.sleep(wait)

    def set_view(self, w: int, h: int, dpr: float = 1) -> None:
        try:
            self.invoke(
                "Emulation.setDeviceMetricsOverride",
                width=w,
                height=h,
                deviceScaleFactor=dpr,
                mobile=w <= 390,
            )
        except RuntimeError as exc:
            print("set_view retry after", exc)
            self.invoke("Page.navigate", url="about:blank")
            time.sleep(0.35)
            self.invoke(
                "Emulation.setDeviceMetricsOverride",
                width=w,
                height=h,
                deviceScaleFactor=dpr,
                mobile=w <= 390,
            )

    def shot(self, dest: Path) -> None:
        dest.parent.mkdir(parents=True, exist_ok=True)
        r = self.invoke("Page.captureScreenshot", format="png", fromSurface=True)
        dest.write_bytes(base64.b64decode(r["data"]))
        print("wrote", dest.name, dest.stat().st_size)

    def click(self, sel: str) -> None:
        self.eval(
            f"(function(){{ var el=document.querySelector({json.dumps(sel)}); if(el) el.click(); return !!el; }})()"
        )
        time.sleep(0.45)

    def close(self) -> None:
        try:
            self.ws.close()
        except Exception:
            pass


def start_chrome(port: int, profile: str) -> subprocess.Popen:
    os.makedirs(profile, exist_ok=True)
    return subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={port}",
            "--remote-allow-origins=*",
            f"--user-data-dir={profile}",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--no-first-run",
            "--disable-extensions",
            "--window-size=1280,800",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def wait_port(port: int, tries: int = 50) -> None:
    for _ in range(tries):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=0.4)
            return
        except Exception:
            time.sleep(0.2)
    raise SystemExit(f"chrome {port} not up")


def submit_search(cdp: CDP, query: str) -> None:
    cdp.eval(
        f"""(function(){{
      var form = document.querySelector('form[data-action="site-search"]');
      var input = form && form.querySelector('input[name="query"]');
      if (input) input.value = {json.dumps(query)};
      if (form) {{
        if (form.requestSubmit) form.requestSubmit();
        else form.dispatchEvent(new Event('submit', {{bubbles:true, cancelable:true}}));
      }}
      return true;
    }})()"""
    )
    time.sleep(0.55)


def capture_lang(cdp: CDP, base: str, folder: Path, lang: str) -> None:
    def url(h: str = "") -> str:
        return base + h

    cdp.set_view(1280, 800)
    cdp.goto(url("#/"))
    cdp.shot(folder / "01-boot-first-screen.png")
    cdp.shot(folder / "13-intro-no-search.png")
    cdp.click('[data-action="start-session"]')
    time.sleep(0.7)
    cdp.shot(folder / "08-touch-targets.png")
    cdp.shot(folder / "workbench-desk.png")

    for site in ("forum", "archive", "folk", "news", "geology"):
        cdp.goto(url(f"#/{site}"))
        cdp.shot(folder / f"site-{site}.png")
        if site == "forum":
            cdp.shot(folder / "14-public-chrome-search.png")
        if site == "archive":
            cdp.shot(folder / "15-embedded-other-skin.png")

    miss_q = "西瓜藤椅" if lang == "zh" else "zxqnomatch"
    hit = "阿山" if lang == "zh" else "AShan"
    forbid = "源码" if lang == "zh" else "sourcecode"

    cdp.goto(url("#/forum"))
    submit_search(cdp, miss_q)
    cdp.shot(folder / "04-near-fail.png")
    cdp.shot(folder / "10-non-color-state.png")
    cdp.shot(folder / "17-miss-has-sentence.png")

    submit_search(cdp, "")
    cdp.shot(folder / "11-empty-or-loading.png")

    submit_search(cdp, hit)
    cdp.shot(folder / "02-core-verb.png")
    cdp.shot(folder / "03-success-feedback.png")
    cdp.eval(
        """(function(){
      var a = document.querySelector('a[href*="thread"]');
      if (a) a.click();
      return true;
    })()"""
    )
    time.sleep(0.6)
    cdp.shot(folder / "16-hit-opens-page.png")

    cdp.goto(url("#/forum"))
    submit_search(cdp, forbid)
    cdp.shot(folder / "18-forbidden-page.png")
    cdp.goto(url("#/forum/thread/no-source"))
    cdp.shot(folder / "18b-forbidden-record.png")

    cdp.goto(url("#/archive/record/IDX-XGA98-ASHAN-2004"))
    cdp.shot(folder / "19-archive-dossier.png")

    cdp.goto(url("#/forum"))
    cdp.eval(
        "(function(){ var i=document.querySelector('input[name=query]'); if(i) i.focus(); return true; })()"
    )
    time.sleep(0.25)
    cdp.shot(folder / "07-keyboard-focus.png")

    cdp.invoke(
        "Emulation.setEmulatedMedia",
        features=[{"name": "prefers-reduced-motion", "value": "reduce"}],
    )
    cdp.goto(url("#/forum"))
    cdp.shot(folder / "09-muted-or-reduced-motion.png")
    cdp.invoke(
        "Emulation.setEmulatedMedia",
        features=[{"name": "prefers-reduced-motion", "value": "no-preference"}],
    )

    cdp.set_view(320, 640, 2)
    cdp.goto(url("#/forum"))
    cdp.shot(folder / "06-narrow-320.png")
    cdp.goto(url("#/workbench"))
    cdp.shot(folder / "06b-workbench-320.png")

    cdp.set_view(390, 720, 2)
    cdp.goto(url("#/news"))
    cdp.shot(folder / "08b-news-390.png")

    cdp.set_view(1280, 800)
    cdp.goto(url("#/forum"))
    submit_search(cdp, hit)
    cdp.shot(folder / "05-recovery.png")

    cdp.goto(url("#/no-such-page"))
    cdp.shot(folder / "12-error-or-pause.png")

    cdp.goto(url("#/workbench/beat/B01/panel/0"))
    cdp.shot(folder / "04b-panel.png")


def collage(folder: Path, dest: Path) -> None:
    from PIL import Image

    names = [
        "site-forum.png",
        "site-archive.png",
        "site-folk.png",
        "site-news.png",
        "site-geology.png",
    ]
    imgs = []
    for n in names:
        p = folder / n
        if p.exists():
            im = Image.open(p).convert("RGB")
            im.thumbnail((420, 320))
            imgs.append(im)
    if len(imgs) < 5:
        print("collage skip", folder, len(imgs))
        return
    w = sum(i.width for i in imgs)
    h = max(i.height for i in imgs)
    canvas = Image.new("RGB", (w, h), (30, 30, 30))
    x = 0
    for im in imgs:
        canvas.paste(im, (x, 0))
        x += im.width
    dest.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(dest)
    print("collage", dest)


def main() -> None:
    tag = sys.argv[1] if len(sys.argv) > 1 else "after"
    zh_base = "http://127.0.0.1:9018" + encode_path(ZH)
    en_base = "http://127.0.0.1:9019" + encode_path(EN)
    zh_dir = OUT / ("zh-before" if tag == "before" else "zh")
    en_dir = OUT / ("en-before" if tag == "before" else "en")
    p1 = start_chrome(9331, "/tmp/zhenshan-chrome-9331")
    p2 = start_chrome(9332, "/tmp/zhenshan-chrome-9332")
    try:
        wait_port(9331)
        wait_port(9332)
        c1 = CDP(9331)
        c2 = CDP(9332)
        capture_lang(c1, zh_base, zh_dir, "zh")
        capture_lang(c2, en_base, en_dir, "en")
        collage(zh_dir, zh_dir / "20-five-skins-side.png")
        collage(en_dir, en_dir / "20-five-skins-side.png")
        c1.close()
        c2.close()
    finally:
        p1.terminate()
        p2.terminate()


if __name__ == "__main__":
    main()
