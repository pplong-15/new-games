#!/usr/bin/env python3
"""Running screenshot matrix for 三份柜. Does not import or edit engine.js/app.js/data.js."""
import os
import sys
import time
from playwright.sync_api import sync_playwright

ROOT = "/Users/jianglong/Desktop/新游戏3/三份柜"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
STORE = {"zh": "sanfen-cabinet-state", "en": "sanfen-cabinet-state-en"}
URL = {
    "zh": "http://127.0.0.1:8860/index.html",
    "en": "http://127.0.0.1:8861/index.html",
}


def outdir(lang):
    return os.path.join(ROOT, "visual/html-game-puzzle", "polish-20260824-" + lang)


def shot(page, lang, name, full=True):
    path = os.path.join(outdir(lang), name + ".png")
    os.makedirs(os.path.dirname(path), exist_ok=True)
    page.screenshot(path=path, full_page=full)
    print("SHOT", lang, name, os.path.getsize(path))
    return path


def js(page, src):
    return page.evaluate(src)


def fresh(page, lang):
    page.goto(URL[lang], wait_until="domcontentloaded")
    key = STORE[lang]
    js(page, "() => { try { localStorage.removeItem(%r) } catch (e) {} }" % key)
    page.reload(wait_until="domcontentloaded")
    page.wait_for_selector("#btn-enter")


def enter(page):
    page.click("#btn-enter")
    page.wait_for_selector("#desk")
    page.wait_for_function("() => window.__SANFEN__ && window.__SANFEN__.state && window.__SANFEN__.state.entered")


def api(page, fn, *args):
    if args:
        return page.evaluate("(a) => window.__SANFEN__[%s](...a)" % repr(fn), args)
    return page.evaluate("() => window.__SANFEN__[%s]()" % repr(fn))


def wait_route(page, rid):
    page.wait_for_function(
        "(rid) => window.__SANFEN__ && window.__SANFEN__.state && window.__SANFEN__.state.route === rid",
        arg=rid,
    )


def play_to_gui_ready(page):
    """Night 0: fang write, handoff. Night 1 can open gui/zhang."""
    api(page, "openDoor", "fang")
    wait_route(page, "fang-today")
    api(page, "writeClaim", "claim-same-column")
    api(page, "handoff")
    wait_route(page, "desk-handoff")


def play_to_ending_a(page):
    play_to_gui_ready(page)
    api(page, "openDoor", "gui")
    api(page, "openRoute", "gui-batch")
    wait_route(page, "gui-batch")
    api(page, "writeClaim", "claim-batch-yuanjin")
    api(page, "openRoute", "zhang-l2")
    wait_route(page, "zhang-l2")
    api(page, "writeClaim", "claim-three-align")
    api(page, "openRoute", "desk-claims")
    api(page, "toggleClaim", "claim-same-column")
    api(page, "toggleClaim", "claim-batch-yuanjin")
    api(page, "toggleClaim", "claim-three-align")
    api(page, "submitClaims")
    page.wait_for_function("() => window.__SANFEN__.state.ending === 'A'")


def capture(page, lang, suffix):
    # 01 boot
    fresh(page, lang)
    shot(page, lang, "01-boot-first-screen" + suffix)

    enter(page)
    shot(page, lang, "01b-desk-three-doors" + suffix)
    shot(page, lang, "11-empty-or-loading" + suffix)

    # 02 core verb: pick tonight's file (fang)
    api(page, "openDoor", "fang")
    wait_route(page, "fang-today")
    shot(page, lang, "02-core-verb" + suffix)
    shot(page, lang, "17-fang-owner-paper" + suffix)
    shot(page, lang, "14-two-sources-side-by-side" + suffix)

    # 03 success: write verified
    api(page, "writeClaim", "claim-same-column")
    time.sleep(0.15)
    shot(page, lang, "03-success-feedback" + suffix)
    shot(page, lang, "10-non-color-state" + suffix)

    # 04 near-fail: drag seen into proven
    api(page, "tryDragSeen")
    time.sleep(0.15)
    shot(page, lang, "04-near-fail" + suffix)
    shot(page, lang, "05-recovery" + suffix)

    # 07 keyboard focus on handoff
    page.focus("#btn-handoff")
    shot(page, lang, "07-keyboard-focus" + suffix, full=False)

    # 13 intro
    api(page, "openRoute", "intro")
    wait_route(page, "intro")
    shot(page, lang, "13-intro-no-search" + suffix)

    # 16 public chrome
    api(page, "openRoute", "home")
    wait_route(page, "home")
    shot(page, lang, "16-public-chrome" + suffix)

    # 15 search miss / remnant
    api(page, "openRoute", "search-closed")
    wait_route(page, "search-closed")
    shot(page, lang, "15-search-miss" + suffix)
    shot(page, lang, "20-book-his-remnant" + suffix)

    # 23 scenic near-fail
    api(page, "openRoute", "scenic")
    wait_route(page, "scenic")
    api(page, "tryReject", "scenic-blurb")
    shot(page, lang, "23-scenic-blurb" + suffix)

    # 12 / 21 error reject (approve)
    api(page, "approveStock")
    wait_route(page, "ex-approve")
    shot(page, lang, "12-error-or-pause" + suffix)
    shot(page, lang, "21-ex-reject-nonmodal" + suffix)

    # first-night gui door only
    api(page, "openDoor", "gui")
    shot(page, lang, "18-gui-owner-paper" + suffix)

    # 22 handoff
    api(page, "handoff")
    wait_route(page, "desk-handoff")
    shot(page, lang, "22-handoff-clear-seen" + suffix)

    # night 1 zhang + gui batch
    api(page, "openDoor", "gui")
    api(page, "openRoute", "gui-batch")
    wait_route(page, "gui-batch")
    shot(page, lang, "18b-gui-batch-paper" + suffix)
    api(page, "writeClaim", "claim-batch-yuanjin")
    api(page, "openDoor", "zhang")
    api(page, "openRoute", "zhang-l1")
    wait_route(page, "zhang-l1")
    shot(page, lang, "19-zhang-owner-paper" + suffix)

    # 09 reduced motion via css emulate
    page.emulate_media(reduced_motion="reduce")
    shot(page, lang, "09-muted-or-reduced-motion" + suffix)
    page.emulate_media(reduced_motion="no-preference")

    # 24 ending A
    api(page, "openRoute", "zhang-l2")
    wait_route(page, "zhang-l2")
    api(page, "writeClaim", "claim-three-align")
    api(page, "openRoute", "desk-claims")
    api(page, "toggleClaim", "claim-same-column")
    api(page, "toggleClaim", "claim-batch-yuanjin")
    api(page, "toggleClaim", "claim-three-align")
    api(page, "submitClaims")
    page.wait_for_function("() => window.__SANFEN__.state.ending === 'A'")
    shot(page, lang, "24-ending-a" + suffix)

    # 06 / 08 narrow
    fresh(page, lang)
    page.set_viewport_size({"width": 320, "height": 640})
    enter(page)
    shot(page, lang, "06-narrow-320" + suffix)
    page.set_viewport_size({"width": 390, "height": 700})
    shot(page, lang, "08-touch-targets" + suffix)
    page.set_viewport_size({"width": 1280, "height": 800})

    # required named extras
    fresh(page, lang)
    enter(page)
    shot(page, lang, "desk-open-shift" + suffix)
    api(page, "openDoor", "fang")
    shot(page, lang, "skin-fang" + suffix)
    api(page, "openRoute", "home")
    shot(page, lang, "skin-public" + suffix)


def main():
    phase = sys.argv[1] if len(sys.argv) > 1 else "before"
    langs = sys.argv[2:] or ["zh", "en"]
    suffix = "-before" if phase == "before" else ""
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME,
            headless=True,
            args=["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"],
        )
        for lang in langs:
            page = browser.new_page(viewport={"width": 1280, "height": 800})
            page.set_default_timeout(15000)
            capture(page, lang, suffix)
            page.close()
        browser.close()
    print("DONE", phase, langs)


if __name__ == "__main__":
    main()
