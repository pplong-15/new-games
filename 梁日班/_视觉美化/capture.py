#!/usr/bin/env python3
"""http screenshot matrix. Clicks only. Does not import engine."""
import json, os, sys, time
from pathlib import Path
from playwright.sync_api import sync_playwright

import subprocess, time, urllib.request, re, signal

ZH_DIR = "/Users/jianglong/Desktop/新游戏3/梁日班/中文版"
EN_DIR = "/Users/jianglong/Desktop/新游戏3/梁日班/英文版"
SERVERS = []

def _kill_port(port):
    try:
        out = subprocess.check_output(["lsof", "-t", f"-iTCP:{port}", "-sTCP:LISTEN"], text=True)
    except subprocess.CalledProcessError:
        return
    for pid in out.strip().split():
        try:
            os.kill(int(pid), signal.SIGTERM)
        except Exception:
            pass

def ensure_servers():
    for port in (8854, 8855):
        _kill_port(port)
    time.sleep(0.4)
    for port, d in ((8854, ZH_DIR), (8855, EN_DIR)):
        log = open(f"/tmp/liang-http-{port}.log", "a")
        proc = subprocess.Popen(
            ["python3", "-m", "http.server", str(port), "--bind", "127.0.0.1", "--directory", d],
            stdout=log, stderr=log, start_new_session=True,
        )
        SERVERS.append(proc)
    time.sleep(0.5)
    zh = urllib.request.urlopen("http://127.0.0.1:8854/index.html").read().decode("utf-8", "replace")
    en = urllib.request.urlopen("http://127.0.0.1:8855/index.html").read().decode("utf-8", "replace")
    zt = re.search(r"<title>(.*?)</title>", zh).group(1)
    et = re.search(r"<title>(.*?)</title>", en).group(1)
    print("SERVERS", zt, et)
    if "梁日班" not in zt or "Huaixi" not in et:
        raise SystemExit("ports serving wrong game: %s / %s" % (zt, et))



ROOT = Path("/Users/jianglong/Desktop/新游戏3/梁日班")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PHASE = sys.argv[1] if len(sys.argv) > 1 else "before"
LANGS = sys.argv[2:] or ["zh", "en"]
SUF = "-before" if PHASE == "before" else ""

J = "#btn-jianli-line"
R = "#btn-red"
S = "#btn-safe"
PENCIL = "#btn-pencil"
KOUXIN = "#btn-kouxin"
VISIT = "#btn-visit"

CFG = {
    "zh": {
        "url": "http://127.0.0.1:8854/index.html",
        "key": "liang-state",
        "out": ROOT / "visual/html-game-rule-horror/polish-20260824-zh",
    },
    "en": {
        "url": "http://127.0.0.1:8855/index.html",
        "key": "liang-state-en",
        "out": ROOT / "visual/html-game-rule-horror/polish-20260824-en",
    },
}

log = []
sizes = {}


def shot(page, out, nn, slug, full=False):
    out.mkdir(parents=True, exist_ok=True)
    name = f"{nn:02d}-{slug}{SUF}.png"
    path = out / name
    page.screenshot(path=str(path), full_page=full, type="png")
    log.append(str(path))
    print("SHOT", path.name, path.stat().st_size)


def body(page):
    return page.evaluate("() => document.body.innerText")


def st(page):
    return page.evaluate(
        """() => (window.__LIANG__ && window.__LIANG__.state)
                 || (window.LIANG_ENGINE && window.LIANG_ENGINE.state)
                 || null"""
    )


def fresh(page, url, key):
    page.goto(url, wait_until="domcontentloaded")
    page.evaluate(f"() => {{ try {{ localStorage.removeItem({key!r}); }} catch (e) {{}} }}")
    page.reload(wait_until="domcontentloaded")
    page.wait_for_selector("#btn-enter")
    title = page.title()
    print("TITLE", title)
    if "梁" not in title and "Huaixi" not in title and "Beam" not in title:
        raise RuntimeError("wrong page "+title)


def enter(page):
    page.click("#btn-enter")
    page.wait_for_selector("#desk.show")


def listen_day(page, sel):
    page.click(sel)
    page.click("#btn-write")
    s = st(page)
    if s and s.get("night") == 7 and page.locator(VISIT).is_visible():
        page.click(VISIT)
    page.click("#btn-submit")


def play_n(page, papers):
    enter(page)
    for i, sel in enumerate(papers, start=1):
        listen_day(page, sel)
        if i < len(papers):
            page.click("#btn-next")


def measure_320(page, lang):
    data = page.evaluate(
        """() => {
          const ids = ['btn-enter','btn-write','btn-submit','btn-sunset','btn-next','btn-jianli-line'];
          const o = {};
          ids.forEach(id => {
            const el = document.getElementById(id);
            if (!el) { o[id] = null; return; }
            const r = el.getBoundingClientRect();
            o[id] = {w: Math.round(r.width), h: Math.round(r.height), visible: !!(r.width && r.height)};
          });
          return o;
        }"""
    )
    sizes[f"{PHASE}-{lang}"] = data
    print("SIZES", PHASE, lang, data)


def run_lang(page, lang):
    cfg = CFG[lang]
    url, key, out = cfg["url"], cfg["key"], cfg["out"]
    page.set_viewport_size({"width": 1280, "height": 800})

    fresh(page, url, key)
    shot(page, out, 1, "boot-first-screen")

    enter(page)
    shot(page, out, 11, "empty-or-loading")
    shot(page, out, 16, "person-job-first-rule", full=True)
    shot(page, out, 20, "night1-not-all-manuals", full=True)
    vis_n1 = page.evaluate(
        """() => ({
          red: !!(document.getElementById('paper-red-block') && document.getElementById('paper-red-block').offsetParent),
          safe: !!(document.getElementById('paper-safe-block') && document.getElementById('paper-safe-block').offsetParent),
          pencil: !!(document.getElementById('paper-pencil') && document.getElementById('paper-pencil').offsetParent),
          kouxin: !!(document.getElementById('paper-kouxin') && document.getElementById('paper-kouxin').offsetParent),
          visit: !!(document.getElementById('paper-visit') && document.getElementById('paper-visit').offsetParent)
        })"""
    )
    print("N1_HIDDEN", vis_n1)

    page.click(J)
    shot(page, out, 2, "core-verb")
    page.click("#btn-write")
    shot(page, out, 2, "core-verb-written")  # extra
    page.click("#btn-submit")
    shot(page, out, 3, "success-feedback")
    shot(page, out, 15, "group-submit")

    page.focus("#btn-next")
    shot(page, out, 7, "keyboard-focus")

    page.click("#btn-next")
    # night 2 pencil reject = near-answer text + recovery path later
    page.click(PENCIL)
    page.click("#btn-write")
    shot(page, out, 19, "near-answer-text")
    page.click("#refuse-contract")
    shot(page, out, 12, "error-or-pause")

    # continue n2 valid then n3 dual
    page.click(J)
    page.click("#btn-write")
    page.click("#btn-submit")
    page.click("#btn-next")
    page.click(J)
    page.click(R)
    shot(page, out, 4, "near-fail")
    shot(page, out, 18, "true-mutex")
    # recovery: pick jianli again and write
    page.click(J)
    page.click("#btn-write")
    shot(page, out, 5, "recovery")
    page.click("#btn-submit")

    # reduced motion: emulate then one verb
    page.emulate_media(reduced_motion="reduce")
    fresh(page, url, key)
    enter(page)
    page.click(J)
    page.click("#btn-write")
    shot(page, out, 9, "muted-or-reduced-motion")
    page.emulate_media(reduced_motion="no-preference")

    # four+ papers and six skins: play to night 7 desk before submit
    fresh(page, url, key)
    play_n(page, [J] * 6)
    page.click("#btn-next")
    shot(page, out, 13, "two-plus-rules-side", full=True)
    shot(page, out, 17, "four-plus-papers", full=True)
    shot(page, out, 22, "six-skins", full=True)
    shot(page, out, 21, "handover-flags-no-progress")
    page.add_style_tag(content=".sheet p, .paper h3, .clip h3 { color: transparent !important; }")
    shot(page, out, 14, "paper-voice-diff", full=True)

    # finish ji ending
    fresh(page, url, key)
    play_n(page, [J] * 7)
    s = st(page)
    print("ENDING", lang, s.get("ending") if s else None)
    shot(page, out, 3, "success-day7-ji")

    # late near-fail
    fresh(page, url, key)
    enter(page)
    page.click("#btn-sunset")
    page.click("#btn-sunset")
    shot(page, out, 4, "near-fail-late")

    # 320
    page.set_viewport_size({"width": 320, "height": 640})
    fresh(page, url, key)
    shot(page, out, 6, "narrow-320-cover")
    enter(page)
    page.click(J)
    page.click("#btn-write")
    shot(page, out, 6, "narrow-320")
    shot(page, out, 8, "touch-targets")
    measure_320(page, lang)
    page.set_viewport_size({"width": 390, "height": 700})
    shot(page, out, 8, "touch-targets-390")

    # non-color: meters + pending dashed
    page.set_viewport_size({"width": 1280, "height": 800})
    fresh(page, url, key)
    enter(page)
    page.click(J)
    shot(page, out, 10, "non-color-state")


def main():
    ensure_servers()
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME,
            headless=True,
            args=["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.set_default_timeout(15000)
        for lang in LANGS:
            print("===", PHASE, lang, "===")
            run_lang(page, lang)
        browser.close()
    meta = ROOT / "_视觉美化" / f"capture-{PHASE}.json"
    meta.write_text(json.dumps({"phase": PHASE, "shots": log, "sizes": sizes}, ensure_ascii=False, indent=2), encoding="utf-8")
    print("WROTE", meta, "n=", len(log))


if __name__ == "__main__":
    main()
