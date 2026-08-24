#!/usr/bin/env python3
"""Real Chromium walk: recarve, near-fail same, old save. Writes playtest-run.json."""
from __future__ import annotations

import json
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from _capture import CDP, start_chrome, navigate, eval_js, set_view

OUT = os.path.join(os.path.dirname(__file__), "playtest-run.json")


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


def loc(page):
    return eval_js(page, "location.href")


def run():
    proc, page = start_chrome()
    log = []
    result = {"ok": False, "log": log}
    try:
        set_view(page, 1280, 900)

        navigate(page, "http://127.0.0.1:8812/introduction.html")
        eval_js(page, "BW.clear && BW.clear()")
        navigate(page, "http://127.0.0.1:8812/introduction.html")
        log.append({"step": "zh-intro", "url": loc(page), "seen": eval_js(page, "BW.all()")})

        ok = click_sel(page, "a.hot")
        # click may navigate; wait
        import time
        time.sleep(0.4)
        log.append({"step": "zh-click-first-smear", "clicked": ok, "url": loc(page)})
        assert "y1986" in loc(page), loc(page)

        ok = click_sel(page, "a.hot:not(.quiet)")
        time.sleep(0.4)
        log.append({"step": "zh-click-1986-smear", "clicked": ok, "url": loc(page)})
        assert "smear.html" in loc(page), loc(page)

        navigate(page, "http://127.0.0.1:8812/rub/box.html")
        click_sel(page, "a.hot")
        time.sleep(0.35)
        log.append({"step": "zh-box-to-zhi", "url": loc(page)})

        navigate(page, "http://127.0.0.1:8812/zhi/scan.html")
        click_sel(page, "a.hot")
        time.sleep(0.35)
        log.append({"step": "zh-zhi-scan", "url": loc(page), "seen": eval_js(page, "BW.all()")})

        navigate(page, "http://127.0.0.1:8812/desk/submit.html")
        eval_js(page, "document.querySelector('input[value=recarve]').checked = true;")
        click_sel(page, "#go")
        time.sleep(0.45)
        recarve_url = loc(page)
        recarve_choice = eval_js(page, "BW.all().choice")
        log.append({"step": "zh-submit-recarve", "url": recarve_url, "choice": recarve_choice})
        assert "result-recarve" in recarve_url, recarve_url
        assert recarve_choice == "recarve"

        navigate(page, "http://127.0.0.1:8812/desk/submit.html")
        eval_js(page, "document.querySelector('input[value=same]').checked = true;")
        click_sel(page, "#go")
        time.sleep(0.45)
        same_url = loc(page)
        same_choice = eval_js(page, "BW.all().choice")
        log.append({"step": "zh-submit-same-nearfail", "url": same_url, "choice": same_choice})
        assert "result-same" in same_url, same_url
        assert same_choice == "same"
        # recovery link present
        has_void = eval_js(page, "!!document.querySelector('a[href=\"submit.html\"]')")
        log.append({"step": "zh-same-recovery-link", "present": has_void})

        # old save restore
        eval_js(
            page,
            """localStorage.setItem('beiwen-tiaqie-v1', JSON.stringify({seen:{intro:1,smear1986:1,zhi:1},last:location.href}));""",
        )
        navigate(page, "http://127.0.0.1:8812/desk/home.html")
        restored = eval_js(page, "BW.all()")
        log.append({"step": "zh-old-save", "restored": restored})
        assert restored.get("seen", {}).get("smear1986") == 1
        assert restored.get("seen", {}).get("zhi") == 1

        # find empty still a sentence
        navigate(page, "http://127.0.0.1:8812/desk/find.html?q=纪闻山")
        miss = eval_js(page, "document.body.innerText.includes('抽不出来')")
        log.append({"step": "zh-find-empty", "has_sentence": miss, "url": loc(page)})
        assert miss

        # English recarve + key
        navigate(page, "http://127.0.0.1:8813/introduction.html")
        eval_js(page, "BW.clear && BW.clear()")
        navigate(page, "http://127.0.0.1:8813/introduction.html")
        click_sel(page, "a.hot")
        time.sleep(0.4)
        log.append({"step": "en-first-jump", "url": loc(page)})
        assert "y1986" in loc(page)

        navigate(page, "http://127.0.0.1:8813/desk/submit.html")
        eval_js(page, "document.querySelector('input[value=recarve]').checked = true;")
        click_sel(page, "#go")
        time.sleep(0.45)
        en_url = loc(page)
        en_choice = eval_js(page, "BW.all().choice")
        en_key = eval_js(page, "localStorage.getItem('beiwen-tiaqie-v1-en') && 'beiwen-tiaqie-v1-en'")
        zh_pollute = eval_js(page, "localStorage.getItem('beiwen-tiaqie-v1')")
        log.append({"step": "en-submit-recarve", "url": en_url, "choice": en_choice, "en_key": en_key})
        assert "result-recarve" in en_url
        assert en_choice == "recarve"

        # radio values locked
        navigate(page, "http://127.0.0.1:8812/desk/submit.html")
        vals = eval_js(
            page,
            "[...document.querySelectorAll('input[name=c]')].map(i=>i.value)",
        )
        log.append({"step": "radio-values", "values": vals})
        assert vals == ["recarve", "same", "approve"]

        result = {"ok": True, "log": log}
    except Exception as e:
        result = {"ok": False, "error": str(e), "log": log}
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
        print(json.dumps(result, ensure_ascii=False, indent=2))
        print("wrote", OUT)


if __name__ == "__main__":
    run()
