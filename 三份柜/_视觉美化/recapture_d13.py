#!/usr/bin/env python3
"""D13 recapture only. Does not edit game css/html/js/jpeg."""
import hashlib
import os
import shutil
import subprocess
import time

from PIL import Image
from playwright.sync_api import sync_playwright

ROOT = "/Users/jianglong/Desktop/新游戏3/三份柜"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE = "/tmp/sanfen-d13-chrome-profile"
STORE = {"zh": "sanfen-cabinet-state", "en": "sanfen-cabinet-state-en"}
URL_AFTER = {
    "zh": "http://127.0.0.1:8840/index.html",
    "en": "http://127.0.0.1:8841/index.html",
}
URL_BEFORE = {
    "zh": "http://127.0.0.1:8950/index.html",
    "en": "http://127.0.0.1:8951/index.html",
}
GOLD = (214, 181, 106)


def outdir(lang):
    return os.path.join(ROOT, "visual/html-game-puzzle", "polish-20260824-" + lang)


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest()


def md5(path):
    h = hashlib.md5()
    with open(path, "rb") as f:
        h.update(f.read())
    return h.hexdigest()


def setup_before_trees():
    pairs = [
        (
            "zh",
            os.path.join(ROOT, "_视觉美化/rollback/index-zh.html"),
            os.path.join(ROOT, "_视觉美化/rollback/sanfen-zh.css"),
            os.path.join(ROOT, "中文版/js"),
            os.path.join(ROOT, "_视觉美化/rollback/jpeg"),
            "/tmp/sanfen-d13-before-zh",
        ),
        (
            "en",
            os.path.join(ROOT, "_视觉美化/rollback/index-en.html"),
            os.path.join(ROOT, "_视觉美化/rollback/sanfen-en.css"),
            os.path.join(ROOT, "英文版/js"),
            os.path.join(ROOT, "_视觉美化/rollback/jpeg"),
            "/tmp/sanfen-d13-before-en",
        ),
    ]
    for lang, html, css, js, jpeg, dest in pairs:
        if os.path.exists(dest):
            shutil.rmtree(dest)
        os.makedirs(os.path.join(dest, "css"))
        shutil.copy(html, os.path.join(dest, "index.html"))
        shutil.copy(css, os.path.join(dest, "css/sanfen.css"))
        os.symlink(js, os.path.join(dest, "js"))
        os.symlink(jpeg, os.path.join(dest, "jpeg"))
        print("BEFORE TREE", lang, dest)


def start_before_servers():
    procs = []
    for port, dest in ((8950, "/tmp/sanfen-d13-before-zh"), (8951, "/tmp/sanfen-d13-before-en")):
        procs.append(
            subprocess.Popen(
                ["python3", "-m", "http.server", str(port), "--bind", "127.0.0.1"],
                cwd=dest,
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL,
            )
        )
    time.sleep(0.4)
    return procs


def fresh(page, url, lang):
    page.goto(url, wait_until="domcontentloaded")
    page.evaluate(
        "() => { try { localStorage.removeItem(%r) } catch (e) {} }" % STORE[lang]
    )
    page.reload(wait_until="domcontentloaded")
    page.wait_for_selector("#title-layer #btn-enter")
    page.wait_for_function(
        """() => {
          const el = document.getElementById('title-layer');
          const btn = document.getElementById('btn-enter');
          if (!el || !btn) return false;
          const r = el.getBoundingClientRect();
          return r.width > 100 && r.height > 100 && el.parentNode;
        }"""
    )


def tab_to_enter(page):
    page.locator("#title-layer .lock-line").click()
    landed = False
    for _ in range(16):
        page.keyboard.press("Tab")
        aid = page.evaluate("() => document.activeElement && document.activeElement.id")
        if aid == "btn-enter":
            landed = True
            break
    info = page.evaluate(
        """() => {
          const el = document.activeElement;
          const cs = getComputedStyle(el);
          const layer = document.getElementById('title-layer');
          const r = layer ? layer.getBoundingClientRect() : {width:0,height:0};
          return {
            id: el && el.id,
            text: el && (el.innerText || el.textContent || '').trim(),
            focusVisible: !!(el && el.matches && el.matches(':focus-visible')),
            outline: cs.outline,
            outlineWidth: cs.outlineWidth,
            outlineStyle: cs.outlineStyle,
            outlineColor: cs.outlineColor,
            outlineOffset: cs.outlineOffset,
            titleUp: !!(layer && r.width > 100 && r.height > 100 && layer.parentNode),
            entered: !!(window.__SANFEN__ && window.__SANFEN__.state && window.__SANFEN__.state.entered)
          };
        }"""
    )
    info["landed"] = landed
    return info


def gold_near_button(path, box):
    im = Image.open(path)
    px = im.load()
    w, h = im.size
    x0 = max(0, int(box["x"]) - 10)
    y0 = max(0, int(box["y"]) - 10)
    x1 = min(w - 1, int(box["x"] + box["width"]) + 10)
    y1 = min(h - 1, int(box["y"] + box["height"]) + 10)
    n = 0
    for y in range(y0, y1 + 1):
        for x in range(x0, x1 + 1):
            r, g, b = px[x, y][:3]
            if abs(r - GOLD[0]) < 12 and abs(g - GOLD[1]) < 12 and abs(b - GOLD[2]) < 18:
                n += 1
    return n


def shot(page, lang, name, full=False):
    path = os.path.join(outdir(lang), name + ".png")
    page.screenshot(path=path, full_page=full)
    print("SHOT", lang, name, os.path.getsize(path), "md5", md5(path))
    return path


def capture_07(page, url, lang, name, require_gold):
    fresh(page, url, lang)
    info = tab_to_enter(page)
    print("FOCUS", lang, name, info)
    if info.get("id") != "btn-enter" or not info.get("titleUp") or info.get("entered"):
        raise SystemExit("07 failed identity: %r" % info)
    if not info.get("focusVisible"):
        raise SystemExit("07 failed :focus-visible: %r" % info)
    if require_gold:
        if info.get("outlineColor") != "rgb(214, 181, 106)":
            raise SystemExit("07 gold color fail: %r" % info)
        if info.get("outlineWidth") != "3px" and "3px" not in (info.get("outline") or ""):
            raise SystemExit("07 3px fail: %r" % info)
        if info.get("outlineStyle") != "solid" and "solid" not in (info.get("outline") or ""):
            raise SystemExit("07 solid fail: %r" % info)
    box = page.locator("#btn-enter").bounding_box()
    path = shot(page, lang, name, full=False)
    im = Image.open(path)
    if im.size != (1280, 800):
        raise SystemExit("07 must be viewport 1280x800, got %s" % (im.size,))
    n = gold_near_button(path, box)
    print("GOLD PIXELS", lang, name, n, "box", box)
    if require_gold and n < 80:
        raise SystemExit("07 gold ring not visible in pixels: %s" % n)
    return path, info


def capture_09(page, url, lang, name):
    page.emulate_media(reduced_motion="reduce")
    fresh(page, url, lang)
    page.locator("#btn-enter").click()
    page.wait_for_function("() => window.__SANFEN__ && window.__SANFEN__.state.entered")
    page.locator("#door-fang").click()
    page.wait_for_function("() => window.__SANFEN__.state.route === 'fang-today'")
    page.evaluate("() => window.__SANFEN__.writeClaim('claim-same-column')")
    page.wait_for_function(
        "() => window.__SANFEN__.state.verified.indexOf('claim-same-column') !== -1"
    )
    page.locator("#col-verified .chip.ver").wait_for()
    page.locator("#col-verified").scroll_into_view_if_needed()
    probe = page.evaluate(
        """() => {
          const chip = document.querySelector('#col-verified .chip.ver');
          const wrap = document.createElement('div');
          wrap.className = 'skin-ex';
          const h1 = document.createElement('h1');
          h1.textContent = 'x';
          wrap.appendChild(h1);
          wrap.style.position = 'absolute';
          wrap.style.left = '-9999px';
          document.body.appendChild(wrap);
          const t = getComputedStyle(h1).transform;
          wrap.remove();
          const col = document.getElementById('col-verified');
          return {
            pin: !!(chip && chip.offsetParent !== null),
            pinText: chip ? chip.textContent.trim() : '',
            pinInCol: !!(chip && col && col.contains(chip)),
            reduce: matchMedia('(prefers-reduced-motion: reduce)').matches,
            exTransform: t,
            route: window.__SANFEN__.state.route,
            titleGone: !document.getElementById('title-layer')
          };
        }"""
    )
    print("REDUCE", lang, name, probe)
    if not probe.get("pin") or not probe.get("pinInCol"):
        raise SystemExit("09 no pin in verified: %r" % probe)
    if not probe.get("reduce"):
        raise SystemExit("09 media not reduce: %r" % probe)
    path = shot(page, lang, name, full=True)
    page.emulate_media(reduced_motion="no-preference")
    return path, probe


def main():
    os.makedirs("/tmp", exist_ok=True)
    if os.path.exists(PROFILE):
        shutil.rmtree(PROFILE)
    os.makedirs(PROFILE)
    setup_before_trees()
    procs = start_before_servers()
    try:
        with sync_playwright() as p:
            context = p.chromium.launch_persistent_context(
                PROFILE,
                executable_path=CHROME,
                headless=True,
                viewport={"width": 1280, "height": 800},
                device_scale_factor=1,
                args=[
                    "--no-sandbox",
                    "--disable-gpu",
                    "--no-first-run",
                    "--no-default-browser-check",
                    "--no-proxy-server",
                    "--proxy-bypass-list=*",
                    "--hide-scrollbars",
                ],
            )
            page = context.pages[0] if context.pages else context.new_page()
            page.set_viewport_size({"width": 1280, "height": 800})
            page.set_default_timeout(20000)

            results = {}
            for lang in ("zh", "en"):
                p07b, i07b = capture_07(page, URL_BEFORE[lang], lang, "07-keyboard-focus-before", require_gold=False)
                p07, i07 = capture_07(page, URL_AFTER[lang], lang, "07-keyboard-focus", require_gold=True)
                p09b, r09b = capture_09(page, URL_BEFORE[lang], lang, "09-muted-or-reduced-motion-before")
                p09, r09 = capture_09(page, URL_AFTER[lang], lang, "09-muted-or-reduced-motion")
                results[lang] = {
                    "07": (p07, i07),
                    "07b": (p07b, i07b),
                    "09": (p09, r09),
                    "09b": (p09b, r09b),
                }
            context.close()
    finally:
        for proc in procs:
            proc.terminate()

    print("==== HASH COMPARE ====")
    for lang in ("zh", "en"):
        d = outdir(lang)
        files = {
            "07": os.path.join(d, "07-keyboard-focus.png"),
            "07b": os.path.join(d, "07-keyboard-focus-before.png"),
            "09": os.path.join(d, "09-muted-or-reduced-motion.png"),
            "09b": os.path.join(d, "09-muted-or-reduced-motion-before.png"),
            "19": os.path.join(d, "19-zhang-owner-paper.png"),
            "19b": os.path.join(d, "19-zhang-owner-paper-before.png"),
        }
        for k, path in files.items():
            print(lang, k, os.path.getsize(path), "md5", md5(path), "sha256", sha256(path))
        print(lang, "09==19", md5(files["09"]) == md5(files["19"]))
        print(lang, "09b==19b", md5(files["09b"]) == md5(files["19b"]))
        print(lang, "07 control", results[lang]["07"][1]["text"], "id", results[lang]["07"][1]["id"])
        print(lang, "09 after exTransform", results[lang]["09"][1]["exTransform"])
        if md5(files["09"]) == md5(files["19"]):
            raise SystemExit("09 still equals 19 for " + lang)


if __name__ == "__main__":
    main()
