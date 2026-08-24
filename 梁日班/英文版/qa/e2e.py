#!/usr/bin/env python3
"""Browser-click playtest for 梁日班. Buttons only; no engine.act()."""
import os
from playwright.sync_api import sync_playwright

SHOT = "/tmp/liang-gate/shots"
os.makedirs(SHOT, exist_ok=True)

BASE = os.environ.get("LIANG_BASE", "http://127.0.0.1:8766/index.html")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
fails = []
passes = []


def ok(name, cond, extra=""):
    if cond:
        print("PASS", name)
        passes.append(name)
    else:
        print("FAIL", name, extra or "")
        fails.append(name + ((" " + extra) if extra else ""))


def body(page):
    return page.evaluate("() => document.body.innerText")


def ending_text(page):
    return page.evaluate(
        """() => {
          const n = document.getElementById('ending-layer');
          return n ? n.innerText : '';
        }"""
    )


def state(page):
    return page.evaluate("() => window.__LIANG__ && window.__LIANG__.state")


def fresh(page):
    page.goto(BASE, wait_until="domcontentloaded")
    page.evaluate("() => { try { localStorage.removeItem('liang-state'); } catch (e) {} }")
    page.reload(wait_until="domcontentloaded")


def enter(page):
    page.click("#btn-enter")
    page.wait_for_selector("#desk.show")


def listen_day(page, paper_id, extras=None):
    page.click(paper_id)
    page.click("#btn-write")
    if extras:
        extras(page)
    st = state(page)
    if st and st.get("night") == 7 and page.locator("#btn-visit").is_visible():
        page.click("#btn-visit")
    page.click("#btn-submit")


def play_plan(page, papers, extras_on=None):
    enter(page)
    for n, pid in enumerate(papers, start=1):
        listen_day(page, pid, extras_on if n == extras_on else None)
        if n < len(papers):
            page.click("#btn-next")


def banned(text):
    words = ["主线", "关卡", "通关", "解锁", "线索", "结局", "源码", "本游戏", "唯一解", "进度条"]
    hit = [w for w in words if w in text]
    return hit


def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(
            executable_path=CHROME,
            headless=True,
            args=["--no-sandbox", "--disable-gpu", "--no-proxy-server", "--proxy-bypass-list=*"],
        )
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.set_default_timeout(8000)
        console = []
        pageerrors = []
        failed_req = []
        page.on("console", lambda m: console.append(f"{m.type}: {m.text}"))
        page.on("pageerror", lambda e: pageerrors.append(str(e)))
        page.on("requestfailed", lambda r: failed_req.append(f"{r.url} {r.failure}"))

        j = "#btn-jianli-line"
        r = "#btn-red"
        s = "#btn-safe"

        fresh(page)
        t = body(page)
        ok("title-who", "祁晚纸" in t)
        ok("title-task", "日落前" in t)
        ok("title-enter", page.locator("#btn-enter").is_visible())
        ok("title-lock", "今天只能听一份" in t)
        ok("title-fiction", "虚构" in t)
        ok("title-no-banned", not banned(t), str(banned(t)))
        page.screenshot(path=os.path.join(SHOT, "title.png"))

        page.focus("#btn-enter")
        page.keyboard.press("Enter")
        page.wait_for_selector("#desk.show")
        t = body(page)
        ok("keyboard-enter", "待听" in t and "写入主栏" in t)
        ok("boot-who", "祁晚纸" in t and "临聘文员" in t)
        ok("boot-hud-day", "第1日" in t)
        ok("boot-no-night-label", "第1晚" not in t and "下一晚" not in t)
        ok("boot-no-chengzu", "不成组" not in t)
        ok("boot-jianli-clickable", page.locator(j).is_visible())
        ok("boot-red-hidden-n1", not page.locator(r).is_visible())
        ok("boot-safe-hidden-n1", not page.locator(s).is_visible())
        ok("boot-pencil-hidden-n1", not page.locator("#paper-pencil").is_visible())
        ok("boot-kouxin-hidden-n1", not page.locator("#paper-kouxin").is_visible())
        ok("boot-visit-hidden-n1", not page.locator("#paper-visit").is_visible())
        ok("boot-no-banned", not banned(t), str(banned(t)))
        st = state(page)
        ok("boot-dims-4", st and st["dims"] == {"wage": 4, "mind": 4, "rep": 4, "mirror": 4})

        page.evaluate("() => document.getElementById('btn-red').click()")
        t = body(page)
        ok("n1-red-locked", "还没纸" in t)
        page.click(j)
        t = body(page)
        ok("first-pending", "待听" in t and "监理" in t)
        ok("first-limits", "不能证明吉时门外是谁" in t)
        page.click("#btn-write")
        page.click("#btn-submit")
        st = state(page)
        ok("n1-valid", st and st.get("slipSubmitted") and st.get("wage") == 36)
        ok("n1-no-ending", not st.get("ending"))

        page.click("#btn-next")
        st = state(page)
        t = body(page)
        ok("n2-pencil", page.locator("#paper-pencil").is_visible())
        ok("n2-red-still-hidden", not page.locator(r).is_visible())
        page.click("#btn-pencil")
        page.click("#btn-write")
        t = body(page)
        ok("pencil-reject", "不能当本日听份" in t or "主栏不收" in t)
        page.click("#btn-gossip")
        t = body(page)
        ok("gossip-idle", "闲话" in t)
        page.click("#refuse-contract")
        ok("refuse-contract", "不改合同原件" in body(page))
        page.click("#refuse-sign")
        ok("refuse-sign", "不替宅主签字" in body(page))
        page.click(j)
        page.click("#btn-write")
        page.click("#btn-submit")
        st = state(page)
        ok("n2-valid", st and st.get("slipSubmitted") and st.get("night") == 2)

        page.click("#btn-next")
        ok("n3-red-visible", page.locator(r).is_visible())
        ok("n3-safe-hidden", not page.locator(s).is_visible())

        page.reload(wait_until="domcontentloaded")
        ok("refresh-to-title", page.locator("#btn-enter").is_visible())

        # sunset: first click arms, second ends
        fresh(page)
        enter(page)
        page.click("#btn-sunset")
        st = state(page)
        t = body(page)
        ok("sunset-arm", not st.get("ending") and "再点一次" in t)
        page.click("#btn-sunset")
        st = state(page)
        e = ending_text(page)
        ok("end-late-sunset", st and st.get("ending") == "late" and "来不及" in (e + body(page)))
        ok("end-late-sunset-reason", "日落到了" in e or "缝里没有新条" in e)
        ok("end-late-in-view", page.evaluate("() => document.getElementById('ending-layer').getBoundingClientRect().top") < 700)
        page.screenshot(path=os.path.join(SHOT, "end-late.png"))

        # 4 empty → wage 0 → late
        fresh(page)
        enter(page)
        for n in range(4):
            page.click("#btn-submit")
            st = state(page)
            if st.get("ending"):
                break
            page.click("#btn-next")
        st = state(page)
        ok("end-late-wage0", st and st.get("ending") == "late" and st["dims"]["wage"] == 0)
        ok("end-late-wage-reason", "工钱格空了" in ending_text(page))

        # n7 empty after 6 valid → late (visit day no listen)
        fresh(page)
        play_plan(page, [j] * 6)
        page.click("#btn-next")
        page.click("#btn-submit")
        t = body(page)
        st = state(page)
        ok("n7-submit-needs-visit", not st.get("ending") and "先应他" in t)
        page.click("#btn-visit")
        page.click("#btn-submit")
        st = state(page)
        ok("end-late-n7-empty", st and st.get("ending") == "late")
        ok("end-late-n7-reason", "第七日主栏是空的" in ending_text(page))

        # dual on night 3
        fresh(page)
        play_plan(page, [j, j])
        page.click("#btn-next")
        page.click(j)
        page.click(r)
        t = body(page)
        st = state(page)
        ok("dual-reject-msg", "两份都听了" in t or "对不上" in t)
        ok("dual-mind", st and st["dims"]["mind"] == 3)
        page.click("#btn-submit")
        st = state(page)
        e = ending_text(page)
        ok("end-dual", st and st.get("ending") == "dual" and "双听" in e)
        ok("end-dual-reason", "两份打回后仍硬交" in e)
        page.screenshot(path=os.path.join(SHOT, "end-dual.png"))

        # dual recover
        fresh(page)
        play_plan(page, [j, j])
        page.click("#btn-next")
        page.click(j)
        page.click(r)
        page.click(j)
        page.click("#btn-write")
        page.click("#btn-submit")
        st = state(page)
        ok("dual-recover-valid", st and st.get("slipSubmitted") and st.get("wage") == 36 and not st.get("ending"))

        fresh(page)
        enter(page)
        disabled = page.evaluate("() => document.getElementById('btn-next').disabled")
        ok("next-disabled-before-submit", disabled is True)
        page.click("#btn-write")
        ok("write-need-pending", "先点一份" in body(page))

        # ji: 7×监理
        fresh(page)
        play_plan(page, [j] * 7)
        st = state(page)
        e = ending_text(page)
        top = page.evaluate("() => document.getElementById('ending-layer').getBoundingClientRect().top")
        ok("end-ji", st and st.get("ending") == "ji" and "寄梁" in e)
        ok("end-ji-reason", "七日你都听监理" in e)
        ok("end-ji-in-view", top < 700, str(top))
        ok("end-ji-wage36", st and st.get("wage") == 36)
        page.screenshot(path=os.path.join(SHOT, "end-ji.png"))

        # sheng: n1-2 监理, n3-7 红纸
        fresh(page)
        play_plan(page, [j, j, r, r, r, r, r])
        st = state(page)
        e = ending_text(page)
        ok("end-sheng", st and st.get("ending") == "sheng" and "升梁" in e)
        ok("end-sheng-reason", "听东家" in e and "回访" in e)
        ok("end-sheng-rep-down", st and st["dims"]["rep"] < 4)

        # qing: n1-3 监理, n4-7 安全单
        fresh(page)
        play_plan(page, [j, j, j, s, s, s, s])
        st = state(page)
        e = ending_text(page)
        ok("end-qing", st and st.get("ending") == "qing" and "清场" in e)
        ok("end-qing-reason", "听安全单" in e and "回访" in e)
        ok("end-qing-mirror-down", st and st["dims"]["mirror"] < 4)

        # n6 kouxin burden
        fresh(page)
        play_plan(page, [j] * 5)
        page.click("#btn-next")
        st = state(page)
        t = body(page)
        ok("n6-now", st and st.get("night") == 6)
        ok("n6-hud-day", "第6日" in t and "第6晚" not in t)
        ok("n6-kouxin-visible", page.locator("#paper-kouxin").is_visible())
        page.click("#btn-kouxin")
        t = body(page)
        ok("n6-kouxin-limits", "不能当本日听份" in t and "主栏能收两格" in t)
        page.click("#btn-write")
        t = body(page)
        ok("n6-kouxin-not-main", "主栏只有一格" in t and "不收" in t)
        page.click(j)
        page.click("#btn-write")
        page.click("#btn-submit")
        st = state(page)
        ok("n6-after-kouxin-valid", st and st.get("slipSubmitted") and st.get("wage") == 36)

        # trust-red: last night red + 把红纸当全真
        fresh(page)
        enter(page)
        seq = [j, j, r, r, r, r, r]
        for n, pid in enumerate(seq, start=1):
            page.click(pid)
            page.click("#btn-write")
            if n == 7:
                page.click("#btn-trust-red")
                page.click("#btn-visit")
            page.click("#btn-submit")
            if n < 7:
                page.click("#btn-next")
        st = state(page)
        e = ending_text(page)
        ok("end-trust-red", st and st.get("ending") == "trust-red" and "信红纸" in e)
        ok("end-trust-reason", "把红纸当全真" in e)
        page.screenshot(path=os.path.join(SHOT, "end-trust-red.png"))

        # layers
        fresh(page)
        enter(page)
        for n in range(1, 8):
            st = state(page)
            night = st["night"]
            ok(f"layer-red-n{night}", page.locator("#paper-red-block").is_visible() == (night >= 3))
            ok(f"layer-safe-n{night}", page.locator("#paper-safe-block").is_visible() == (night >= 4))
            ok(f"layer-pencil-n{night}", page.locator("#paper-pencil").is_visible() == (night >= 2))
            ok(f"layer-print-n{night}", page.locator("#paper-print").is_visible() == (night >= 5))
            ok(f"layer-kouxin-n{night}", page.locator("#paper-kouxin").is_visible() == (night >= 6))
            ok(f"layer-visit-n{night}", page.locator("#paper-visit").is_visible() == (night >= 7))
            listen_day(page, j)
            if n < 7:
                page.click("#btn-next")

        # beam / crack
        fresh(page)
        enter(page)
        page.click("#btn-beam")
        ok("beam-no-listen", "影子" in body(page) or "寄梁绳位" in body(page))
        listen_day(page, j)
        for _ in range(3):
            page.click("#btn-next")
            listen_day(page, j)
        page.click("#btn-next")
        st = state(page)
        ok("n5-now", st and st["night"] == 5)
        page.click("#btn-crack")
        ok("crack-old-name", "旧宅主名" in body(page) or "不是方守成" in body(page))

        page.set_viewport_size({"width": 320, "height": 640})
        fresh(page)
        enter(page)
        boxes = page.evaluate(
            """() => {
              const ids = ['btn-jianli-line','btn-write','btn-submit','btn-sunset'];
              return ids.map(id => {
                const el = document.getElementById(id);
                const r = el.getBoundingClientRect();
                return {id, w: r.width, h: r.height, vis: r.height>0 && r.width>0};
              });
            }"""
        )
        ok("narrow-btns-visible", all(b["vis"] for b in boxes), str(boxes))
        ok("narrow-tap-height", all(b["h"] >= 32 for b in boxes), str(boxes))
        page.click(j)
        page.click("#btn-write")
        page.click("#btn-submit")
        st = state(page)
        ok("narrow-core-loop", st and st.get("slipSubmitted") and st.get("wage") == 36)

        page.set_viewport_size({"width": 1280, "height": 800})
        fresh(page)
        page.focus("#btn-enter")
        page.keyboard.press("Enter")
        page.wait_for_selector("#desk.show")
        page.focus(j)
        page.keyboard.press("Enter")
        page.focus("#btn-write")
        page.keyboard.press("Enter")
        page.focus("#btn-submit")
        page.keyboard.press("Enter")
        st = state(page)
        ok("keyboard-first-group", st and st.get("slipSubmitted") and st.get("listenSource") == "jianli")

        missing = [u for u in failed_req if "jpeg/" in u or u.endswith(".js") or u.endswith(".css")]
        ok("no-failed-assets", not missing, str(missing)[:400])
        ok("no-pageerror", not pageerrors, str(pageerrors)[:400])
        err_console = [c for c in console if c.startswith("error") and "favicon" not in c]
        ok("no-console-error", not err_console, str(err_console)[:400])

        browser.close()

    print("---")
    print("PASS_COUNT", len(passes))
    print("FAIL_COUNT", len(fails))
    for f in fails:
        print("FAIL_ITEM", f)
    return 0 if not fails else 1


if __name__ == "__main__":
    raise SystemExit(run())
