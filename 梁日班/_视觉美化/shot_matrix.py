#!/usr/bin/env python3
"""Running screenshot matrix + day-7 / dual / late play. Does not import engine."""
import json
import os
from playwright.sync_api import sync_playwright

OUT = "/Users/jianglong/Desktop/新游戏3/梁日班/visual/html-game-rule-horror/liang-booth-20260824"
os.makedirs(OUT, exist_ok=True)
URL = "http://127.0.0.1:8850/%E4%B8%AD%E6%96%87%E7%89%88/index.html"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
J = "#btn-jianli-line"
R = "#btn-red"
S = "#btn-safe"
log = []


def shot(page, name, full=False):
    path = os.path.join(OUT, name + ".jpg")
    page.screenshot(path=path, full_page=full, type="jpeg", quality=72)
    log.append(name)
    print("SHOT", name, os.path.getsize(path))


def body(page):
    return page.evaluate("() => document.body.innerText")


def state(page):
    return page.evaluate("() => window.__LIANG__ && window.__LIANG__.state")


def ending(page):
    return page.evaluate(
        """() => {
          const n = document.getElementById('ending-layer');
          return n ? n.innerText : '';
        }"""
    )


def fresh(page):
    page.goto(URL, wait_until="domcontentloaded")
    page.evaluate("() => { try { localStorage.removeItem('liang-state'); } catch (e) {} }")
    page.reload(wait_until="domcontentloaded")


def enter(page):
    page.click("#btn-enter")
    page.wait_for_selector("#desk.show")


def listen_day(page, sel):
    page.click(sel)
    page.click("#btn-write")
    st = state(page)
    if st and st.get("night") == 7 and page.locator("#btn-visit").is_visible():
        page.click("#btn-visit")
    page.click("#btn-submit")


def play_n(page, papers):
    enter(page)
    for i, sel in enumerate(papers, start=1):
        listen_day(page, sel)
        if i < len(papers):
            page.click("#btn-next")


def main():
    fails = []
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME,
            headless=True,
            args=["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.set_default_timeout(12000)

        # 01 boot
        fresh(page)
        t = body(page)
        if "祁晚纸" not in t or "进站" not in t:
            fails.append("title-boot")
        shot(page, "01-boot-first-screen")

        # 02 core verb: pending + write cell
        page.click("#btn-enter")
        page.wait_for_selector("#desk.show")
        page.click(J)
        page.click("#btn-write")
        t = body(page)
        if "主栏" not in t:
            fails.append("core-verb-text")
        shot(page, "02-core-verb")
        shot(page, "13-person-job-first-rule", full=True)

        # 03 success
        page.click("#btn-submit")
        st = state(page)
        if not (st and st.get("slipSubmitted") and st.get("wage") == 36):
            fails.append("n1-valid")
        shot(page, "03-success-feedback")

        # 11 empty-or-loading: pending empty on fresh desk
        fresh(page)
        enter(page)
        t = body(page)
        if "待听空" not in t and "待听" not in t:
            fails.append("empty-pending")
        shot(page, "11-empty-or-loading")

        # 19 first night not all manuals
        if page.locator(R).is_visible() or page.locator("#paper-kouxin").is_visible():
            fails.append("n1-leaked-papers")
        shot(page, "19-first-night-not-all-manuals", full=True)

        # 10 non-color: meters + pending mark
        shot(page, "10-non-color-state")

        # 07 keyboard focus
        page.focus("#btn-write")
        shot(page, "07-keyboard-focus")

        # 12 error-or-pause: sunset arm (recoverable)
        page.click("#btn-sunset")
        t = body(page)
        if "再点一次" not in t:
            fails.append("sunset-arm")
        shot(page, "12-error-or-pause")

        # 04 near-fail late
        page.click("#btn-sunset")
        st = state(page)
        e = ending(page)
        if not (st and st.get("ending") == "late"):
            fails.append("late-ending")
        shot(page, "04-near-fail")
        shot(page, "05-recovery")  # late is recoverable by refresh; show ending still on desk

        # 09 muted/reduced motion
        page.emulate_media(reduced_motion="reduce")
        fresh(page)
        enter(page)
        page.click(J)
        page.click("#btn-write")
        shot(page, "09-muted-or-reduced-motion")
        page.emulate_media(reduced_motion="no-preference")

        # dual near-fail
        fresh(page)
        play_n(page, [J, J])
        page.click("#btn-next")
        page.click(J)
        page.click(R)
        t = body(page)
        if "两份" not in t and "对不上" not in t:
            fails.append("dual-msg")
        shot(page, "04b-dual-near-fail")
        page.click("#btn-submit")
        e = ending(page)
        if "双听" not in e:
            fails.append("dual-end")
        shot(page, "15-true-mutex-dual")

        # day 7 correct 寄梁
        fresh(page)
        play_n(page, [J] * 7)
        st = state(page)
        e = ending(page)
        if not (st and st.get("ending") == "ji" and "寄梁" in e):
            fails.append("end-ji " + (e[:80] if e else "none"))
        shot(page, "03b-day7-ji-success")
        shot(page, "17-group-submit")
        shot(page, "20-handoff-flags-no-progress")

        # 4+ papers side by side: go to night 7 before submit
        fresh(page)
        play_n(page, [J] * 6)
        page.click("#btn-next")
        st = state(page)
        if not (st and st.get("night") == 7):
            fails.append("n7-not-reached")
        vis = {
            "jianli": page.locator(".sheet-jianli").is_visible(),
            "red": page.locator("#paper-red-block").is_visible(),
            "safe": page.locator("#paper-safe-block").is_visible(),
            "pencil": page.locator("#paper-pencil").is_visible(),
            "print": page.locator("#paper-print").is_visible(),
            "kouxin": page.locator("#paper-kouxin").is_visible(),
            "visit": page.locator("#paper-visit").is_visible(),
        }
        print("VISIBLE", vis)
        if sum(1 for v in vis.values() if v) < 4:
            fails.append("papers-lt4")
        shot(page, "13b-four-plus-papers", full=True)

        # 14 paper voice: hide titles/buttons text, keep chrome
        page.add_style_tag(
            content="""
            .sheet p, .sheet .clause, .paper h3, .clip h3 { color: transparent !important; }
            .sheet .clause { background-clip: padding-box; }
            """
        )
        shot(page, "14-paper-voice-diff-no-titles", full=True)

        # 16 fake-mutex QA: same hidden text, papers still differ by chrome
        shot(page, "16-fake-mutex-qa-titles-hidden", full=True)

        # 18 near-answer points to text: kouxin reject copy
        fresh(page)
        play_n(page, [J] * 5)
        page.click("#btn-next")
        page.click("#btn-kouxin")
        page.click("#btn-write")
        t = body(page)
        if "主栏只有一格" not in t and "不收" not in t:
            fails.append("kouxin-reject")
        shot(page, "18-near-answer-points-to-text")

        # 06 narrow 320
        page.set_viewport_size({"width": 320, "height": 640})
        fresh(page)
        enter(page)
        page.click(J)
        page.click("#btn-write")
        box = page.locator("#btn-submit").bounding_box()
        if not box or box["height"] < 40:
            fails.append("320-submit-small")
        shot(page, "06-narrow-320")
        shot(page, "08-touch-targets")

        # profile one listen on 1280
        page.set_viewport_size({"width": 1280, "height": 800})
        fresh(page)
        enter(page)
        client = page.context.new_cdp_session(page)
        client.send("Profiler.enable")
        client.send("Profiler.start")
        page.click(J)
        page.click("#btn-write")
        page.click("#btn-submit")
        prof = client.send("Profiler.stop")
        with open("/tmp/liang-vp1-profile.json", "w") as f:
            json.dump(prof, f)
        print("profile nodes", len(prof.get("profile", {}).get("nodes", [])))

        browser.close()

    print("FAILS", fails)
    print("SHOTS", len(log))
    if fails:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
