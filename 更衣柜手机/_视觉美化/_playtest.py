#!/usr/bin/env python3
"""Real Chromium walk: PIN 3716, gallery IDs, ending-old, ethical near-fail, old save."""
from __future__ import annotations

import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from _capture import (
    EN,
    SAVE_EN,
    SAVE_ZH,
    ZH,
    eval_js,
    navigate,
    screenshot,
    set_view,
    start_chrome,
)

OUT = os.path.join(os.path.dirname(__file__), "playtest-run.json")
SHOT = os.path.join(
    os.path.dirname(__file__), "..", "visual", "html-game-puzzle"
)


def loc(page):
    return eval_js(page, "location.href")


def click_sel(page, sel):
    return eval_js(
        page,
        f"""
        (() => {{
          const el = document.querySelector({sel!r});
          if (!el) return false;
          el.click();
          return true;
        }})()
        """,
    )


def click_text(page, text):
    return eval_js(
        page,
        f"""
        (() => {{
          const t = {text!r};
          const els = [...document.querySelectorAll('a,button')];
          const el = els.find(e => (e.textContent || '').trim() === t)
            || els.find(e => (e.textContent || '').includes(t));
          if (!el) return false;
          el.click();
          return el.textContent.trim().slice(0, 80);
        }})()
        """,
    )


def click_pin_keys(page, seq, ok_label):
    js = """
    (() => {
      const seq = %s;
      const ok = %s;
      const btns = [...document.querySelectorAll('.pad button')];
      const log = [];
      for (const ch of seq) {
        const b = btns.find(x => x.textContent === String(ch));
        if (!b) return {ok:false, missing: ch};
        b.click();
        log.push(ch);
      }
      const go = btns.find(x => x.textContent === ok);
      if (!go) return {ok:false, missing: ok};
      go.click();
      return {ok:true, log};
    })()
    """ % (json.dumps(list(seq)), json.dumps(ok_label))
    return eval_js(page, js)


def wait_href(page, needle, timeout=4):
    deadline = time.time() + timeout
    while time.time() < deadline:
        href = loc(page) or ""
        if needle in href:
            return href
        time.sleep(0.08)
    return loc(page)


def run_lang(page, base, lang, prefix, pin_ok, pick_up, id_a, id_b, old_link, new_link, how_a, how_b, end_old_needle, end_new_needle):
    log = []
    eval_js(page, "localStorage.clear()")
    set_view(page, 1280, 900)

    navigate(page, f"{base}/introduction.html")
    clicked = click_sel(page, "a.enter-link") or click_text(page, pick_up)
    time.sleep(0.35)
    href = wait_href(page, "lock.html")
    log.append({"step": f"{lang}-pick-up", "clicked": clicked, "url": href})
    assert "lock.html" in href, href

    pin = click_pin_keys(page, "3716", pin_ok)
    time.sleep(0.4)
    href = wait_href(page, "home.html")
    log.append({"step": f"{lang}-pin-3716", "pin": pin, "url": href})
    assert pin and pin.get("ok"), pin
    assert "home.html" in href, href

    clicked = click_sel(page, 'a.ic[href="album.html"]') or click_text(page, "图库" if lang == "zh" else "Gallery")
    time.sleep(0.35)
    href = wait_href(page, "album.html")
    log.append({"step": f"{lang}-open-gallery", "clicked": clicked, "url": href})
    assert "album.html" in href, href

    clicked = click_sel(page, 'a[href="photo-zheng.html"]')
    time.sleep(0.35)
    href = wait_href(page, "photo-zheng.html")
    seen_a = eval_js(page, f"localStorage.getItem({(prefix + 'seen0314')!r})")
    log.append({"step": f"{lang}-id-a", "clicked": clicked, "url": href, "flag": seen_a})
    assert "photo-zheng.html" in href, href
    assert seen_a == "1", seen_a

    navigate(page, f"{base}/album.html")
    clicked = click_sel(page, 'a[href="photo-fu.html"]')
    time.sleep(0.35)
    href = wait_href(page, "photo-fu.html")
    seen_b = eval_js(page, f"localStorage.getItem({(prefix + 'seen0812')!r})")
    log.append({"step": f"{lang}-id-b", "clicked": clicked, "url": href, "flag": seen_b})
    assert "photo-fu.html" in href, href
    assert seen_b == "1", seen_b

    navigate(page, f"{base}/backroom.html")
    how = eval_js(page, "document.getElementById('how') && document.getElementById('how').textContent")
    log.append({"step": f"{lang}-backroom-how", "how": how})
    assert how_a in (how or ""), how
    assert how_b in (how or ""), how

    clicked = click_text(page, old_link)
    time.sleep(0.45)
    href = wait_href(page, "end-old.html")
    body = eval_js(page, "document.body.innerText")
    p1 = eval_js(page, "document.getElementById('p1') && document.getElementById('p1').textContent")
    folder = "polish-20260823-zh" if lang == "zh" else "polish-20260823-en"
    shot_old = os.path.join(SHOT, folder, "playtest-end-old.png")
    screenshot(page, shot_old)
    log.append({"step": f"{lang}-end-old", "clicked": clicked, "url": href, "p1": p1, "shot": shot_old})
    assert "end-old.html" in href, href
    assert end_old_needle in (p1 or body or ""), (p1, body[:200] if body else None)

    navigate(page, f"{base}/backroom.html")
    clicked = click_text(page, new_link)
    time.sleep(0.45)
    href = wait_href(page, "end-new.html")
    p1 = eval_js(page, "document.getElementById('p1') && document.getElementById('p1').textContent")
    shot_new = os.path.join(SHOT, folder, "playtest-end-new.png")
    screenshot(page, shot_new)
    log.append({"step": f"{lang}-end-new-ethical-near-fail", "clicked": clicked, "url": href, "p1": p1, "shot": shot_new})
    assert "end-new.html" in href, href
    assert end_new_needle in (p1 or ""), p1

    eval_js(
        page,
        "".join(
            f"localStorage.setItem({(prefix + k)!r}, '1');"
            for k in ("seen0314", "seen0812", "seenmemo", "seencalls", "seencal", "seenlocker")
        ),
    )
    navigate(page, f"{base}/backroom.html")
    how2 = eval_js(page, "document.getElementById('how') && document.getElementById('how').textContent")
    keys = eval_js(page, "Object.keys(localStorage).sort()")
    shot_save = os.path.join(SHOT, folder, "playtest-old-save.png")
    screenshot(page, shot_save)
    log.append({"step": f"{lang}-old-save", "how": how2, "keys": keys, "shot": shot_save})
    assert how_a in (how2 or ""), how2
    assert how_b in (how2 or ""), how2
    assert any(str(k).startswith(prefix) for k in (keys or [])), keys

    return log


def run():
    proc, page = start_chrome()
    result = {"ok": False, "log": []}
    try:
        zh = run_lang(
            page,
            ZH,
            "zh",
            SAVE_ZH,
            "开",
            "拿起这部机子",
            "photo-zheng.html",
            "photo-fu.html",
            "三月十四那张我交给你",
            "八月十二那张我交给你",
            "白底甲",
            "白底乙",
            "三月十四",
            "八月十二",
        )
        result["log"].extend(zh)

        navigate(page, f"{ZH}/lock.html")
        eval_js(page, "localStorage.clear()")
        bad = click_pin_keys(page, "0000", "开")
        time.sleep(0.2)
        err = eval_js(page, "document.getElementById('err') && document.getElementById('err').textContent")
        still_lock = loc(page)
        result["log"].append({"step": "zh-wrong-pin-recovery", "pin": bad, "err": err, "url": still_lock})
        assert "lock.html" in still_lock
        assert err and len(err) > 0

        en = run_lang(
            page,
            EN,
            "en",
            SAVE_EN,
            "OK",
            "Pick up the handset",
            "photo-zheng.html",
            "photo-fu.html",
            "The 2023-03-14 one I hand to you",
            "The 2026-08-12 one I hand to you",
            "White-bg A",
            "White-bg B",
            "2023-03-14",
            "2026-08-12",
        )
        result["log"].extend(en)
        result["ok"] = True
    except Exception as e:
        result["error"] = repr(e)
        result["url"] = loc(page)
        raise
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
        with open(OUT, "w", encoding="utf-8") as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        print("wrote", OUT, "ok=", result.get("ok"))


if __name__ == "__main__":
    run()
