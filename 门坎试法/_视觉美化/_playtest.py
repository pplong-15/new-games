#!/usr/bin/env python3
"""Walk hold-funeral, let-in near-fail, bounce, old save. CN+EN."""
from __future__ import annotations

import json
import os
import sys
import time

sys.path.insert(0, os.path.dirname(__file__))
from _capture import CDP, start_chrome, navigate, eval_js, set_view

OUT = os.path.join(os.path.dirname(__file__), "playtest-run.json")
ZH = "http://127.0.0.1:9006"
EN = "http://127.0.0.1:9007"


def loc(page):
    return eval_js(page, "location.href")


def wait_href(page, needle, timeout=4):
    deadline = time.time() + timeout
    while time.time() < deadline:
        h = loc(page)
        if needle in h:
            return h
        time.sleep(0.08)
    return loc(page)


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


def run_lang(page, base, key, staff, log, prefix):
    navigate(page, f"{base}/introduction.html")
    eval_js(page, f"localStorage.removeItem({key!r});")
    navigate(page, f"{base}/introduction.html")
    log.append({"step": f"{prefix}-intro", "url": loc(page), "save": eval_js(page, f"localStorage.getItem({key!r})")})

    click_sel(page, "a.enter-link")
    h = wait_href(page, "login.html")
    log.append({"step": f"{prefix}-login-page", "url": h, "clicked": "login" in h})
    assert "login.html" in h, h

    eval_js(page, f"document.getElementById('user').value = {staff!r};")
    click_sel(page, "#lg button[type=submit]")
    h = wait_href(page, "home.html")
    save = eval_js(page, f"JSON.parse(localStorage.getItem({key!r})||'{{}}')")
    log.append({"step": f"{prefix}-login-ok", "url": h, "save": save})
    assert "home.html" in h, h
    assert save.get("token-in") is True

    navigate(page, f"{base}/desk/try.html")
    eval_js(page, "document.querySelector('input[value=step]').checked = true;")
    click_sel(page, "#tryf button[type=submit]")
    h = wait_href(page, "try-reject.html")
    save = eval_js(page, f"JSON.parse(localStorage.getItem({key!r})||'{{}}')")
    why = eval_js(page, "document.getElementById('why') && document.getElementById('why').textContent")
    log.append({"step": f"{prefix}-try-step", "url": h, "broke": save.get("verified.broke"), "why": why})
    assert "try-reject.html" in h, h
    assert save.get("verified.broke") is True

    navigate(page, f"{base}/phone/mu.html")
    save = eval_js(page, f"JSON.parse(localStorage.getItem({key!r})||'{{}}')")
    log.append({"step": f"{prefix}-sms", "save": save, "url": loc(page)})
    assert save.get("seen.sms") is True

    navigate(page, f"{base}/desk/advise.html")
    eval_js(
        page,
        """
        document.querySelector('select[name=nature]').value = 'funeral';
        document.querySelector('select[name=record]').value = 'stepped';
        document.querySelector('select[name=act]').value = 'hold';
        document.querySelector('select[name=auth]').value = 'recommend';
        document.querySelector('#adv button[type=submit]').click();
        """,
    )
    h = wait_href(page, "result-hold.html")
    log.append({"step": f"{prefix}-hold-funeral", "url": h})
    assert "result-hold.html" in h, h

    navigate(page, f"{base}/desk/advise.html")
    eval_js(
        page,
        """
        document.querySelector('select[name=nature]').value = 'wedding';
        document.querySelector('select[name=record]').value = 'stepped';
        document.querySelector('select[name=act]').value = 'letin';
        document.querySelector('select[name=auth]').value = 'recommend';
        document.querySelector('#adv button[type=submit]').click();
        """,
    )
    h = wait_href(page, "result-letin.html")
    log.append({"step": f"{prefix}-let-in", "url": h})
    assert "result-letin.html" in h, h
    recov = eval_js(page, "!!document.querySelector('a[href=\"advise.html\"]')")
    log.append({"step": f"{prefix}-letin-recovery", "present": recov})
    assert recov

    navigate(page, f"{base}/desk/advise.html")
    eval_js(
        page,
        """
        document.querySelector('select[name=nature]').value = 'funeral';
        document.querySelector('select[name=record]').value = 'clean';
        document.querySelector('select[name=act]').value = 'hold';
        document.querySelector('select[name=auth]').value = 'recommend';
        document.querySelector('#adv button[type=submit]').click();
        """,
    )
    time.sleep(0.2)
    bounce = eval_js(
        page,
        """
        (() => {
          const box = document.getElementById('err');
          const cs = getComputedStyle(box);
          return { display: cs.display, text: box.textContent, stillAdvise: location.href.indexOf('advise.html')>=0 };
        })()
        """,
    )
    log.append({"step": f"{prefix}-bounce-record", "bounce": bounce})
    assert bounce["stillAdvise"]
    assert bounce["display"] != "none"
    assert bounce["text"]

    # old save: only verified.broke + token-in
    eval_js(
        page,
        f"localStorage.setItem({key!r}, JSON.stringify({{'verified.broke': true, 'token-in': true, 'seen.law': true}}));",
    )
    navigate(page, f"{base}/desk/home.html")
    chips = eval_js(page, "document.getElementById('chips').innerHTML")
    save = eval_js(page, f"JSON.parse(localStorage.getItem({key!r})||'{{}}')")
    log.append({"step": f"{prefix}-old-save", "chips": chips, "save": save})
    assert save.get("verified.broke") is True
    assert "mk-chips" in chips

    hrefs = eval_js(
        page,
        """
        [...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).slice(0,8)
        """,
    )
    log.append({"step": f"{prefix}-hrefs-sample", "hrefs": hrefs})


def run():
    proc, page = start_chrome()
    log = []
    result = {"ok": False, "log": log}
    try:
        set_view(page, 1280, 900)
        run_lang(page, ZH, "menkan-shifa-v1", "柴-0821", log, "zh")
        run_lang(page, EN, "menkan-shifa-v1-en", "Chai-0821", log, "en")
        result["ok"] = True
    except Exception as e:
        result["error"] = str(e)
        log.append({"error": str(e), "url": loc(page) if page else None})
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
        print("playtest", OUT, "ok" if result.get("ok") else result)


if __name__ == "__main__":
    run()
