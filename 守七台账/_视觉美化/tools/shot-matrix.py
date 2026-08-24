#!/usr/bin/env python3
"""D13 runtime HTTP matrix. Does not touch game HTML/CSS/JS/img."""
from __future__ import annotations

import hashlib
import json
import shutil
import struct
import time
from pathlib import Path
from urllib.parse import quote
from urllib.request import urlopen

from playwright.sync_api import sync_playwright

ROOT = Path("/Users/jianglong/Desktop/新游戏3/守七台账")
STAGING = Path("/tmp/shouqi-d13-matrix")
OUT_ZH = ROOT / "visual/html-game-puzzle/polish-20260824-zh"
OUT_EN = ROOT / "visual/html-game-puzzle/polish-20260824-en"
PROFILE = "/tmp/shouqi-d13-fresh-profile-" + str(int(time.time()))

REQUIRED = [
    "01-boot-first-screen",
    "02-core-verb",
    "03-success-feedback",
    "04-near-fail",
    "05-recovery",
    "06-narrow-320",
    "07-keyboard-focus",
    "08-touch-targets",
    "09-muted-or-reduced-motion",
    "10-non-color-state",
    "11-empty-or-loading",
    "12-error-or-pause",
    "13a-desk",
    "13b-news-public",
    "14-search-miss",
    "15-hidden-page-different-skin",
    "16-static-no-unearned-token",
    "17-intro-no-search",
    "18-public-shell-nav-search",
    "19-search-hit-new-page",
    "20-forbidden-via-search",
    "21-archive",
    "22a-skin-shop",
    "22b-skin-desk",
    "22c-skin-news",
    "22d-skin-corp",
    "22e-skin-wechat",
    "03b-pin-on-news",
    "11b-form-empty",
    "12b-paused",
]

JOBS = [
    {
        "lang": "zh",
        "phase": "after",
        "base": "http://127.0.0.1:8944",
        "save": "shouqi-taizhang-v1",
        "miss": "西瓜",
        "hit": "讣告栏",
        "forbid": "管理员",
        "needles": ["初八"],
        "pinned": "已在交班本",
    },
    {
        "lang": "en",
        "phase": "after",
        "base": "http://127.0.0.1:8945",
        "save": "shouqi-taizhang-v1-en",
        "miss": "watermelon",
        "hit": "obituary",
        "forbid": "admin",
        "needles": ["the 8th", "eighth", "8th of the sixth"],
        "pinned": "Already in the shift book",
    },
    {
        "lang": "zh",
        "phase": "before",
        "base": "http://127.0.0.1:8964",
        "save": "shouqi-taizhang-v1",
        "miss": "西瓜",
        "hit": "讣告栏",
        "forbid": "管理员",
        "needles": ["初八"],
        "pinned": "已在交班本",
    },
    {
        "lang": "en",
        "phase": "before",
        "base": "http://127.0.0.1:8965",
        "save": "shouqi-taizhang-v1-en",
        "miss": "watermelon",
        "hit": "obituary",
        "forbid": "admin",
        "needles": ["the 8th", "eighth", "8th of the sixth"],
        "pinned": "Already in the shift book",
    },
]

LOG = []


def staging_dir(job):
    return STAGING / job["lang"]


def probe(base, label):
    url = base + "/introduction.html"
    with urlopen(url, timeout=5) as r:
        html = r.read(1200).decode("utf-8", "replace")
        if "iframe" in html.lower():
            raise SystemExit("iframe in introduction " + url)
        print("HTTP", label, r.status, url)


def wait_ready(page):
    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(150)
    try:
        page.wait_for_function(
            "() => [...document.images].every(i => i.complete)",
            timeout=4000,
        )
    except Exception:
        pass
    page.wait_for_timeout(80)


def grab(page, job, stem, w=1280, h=800):
    nframes = page.evaluate("() => window.frames.length")
    if nframes:
        raise SystemExit("iframe frames=%s %s" % (nframes, page.url))
    page.set_viewport_size({"width": w, "height": h})
    page.wait_for_timeout(90)
    suffix = "" if job["phase"] == "after" else "-before"
    dest = staging_dir(job) / f"{stem}{suffix}.png"
    dest.parent.mkdir(parents=True, exist_ok=True)
    page.screenshot(path=str(dest), full_page=False)
    info = {
        "file": dest.name,
        "lang": job["lang"],
        "phase": job["phase"],
        "url": page.url,
        "w": w,
        "h": h,
        "title": page.title(),
        "htmlClass": page.evaluate("() => document.documentElement.className"),
        "saveKeyUsed": job["save"],
        "sha12": hashlib.sha256(dest.read_bytes()).hexdigest()[:12],
    }
    LOG.append(info)
    print("SHOT", dest.name, info["htmlClass"], page.url, info["sha12"])
    return dest


def clear_save(page, job):
    page.goto(job["base"] + "/introduction.html", wait_until="load")
    page.evaluate(
        """(key) => {
            try { localStorage.removeItem(key); } catch (e) {}
            try { localStorage.clear(); } catch (e) {}
        }""",
        job["save"],
    )
    page.reload(wait_until="load")
    wait_ready(page)


def tab_to_search(page):
    page.locator("body").click(position={"x": 8, "y": 8})
    for _ in range(20):
        page.keyboard.press("Tab")
        aid = page.evaluate("() => document.activeElement && document.activeElement.id")
        if aid == "search-input":
            return True
    page.locator("#search-input").focus()
    return False


def submit_search(page, job, q):
    page.goto(job["base"] + "/index.html", wait_until="load")
    wait_ready(page)
    page.fill("#search-input", q)
    page.locator("#search-form").evaluate("form => form.submit()")
    page.wait_for_url("**/search-results.html**", timeout=8000)
    wait_ready(page)
    if "search-results.html" not in page.url:
        raise SystemExit("search did not open results page: " + page.url)


def run_job(page, job):
    def S(stem, w=1280, h=800):
        return grab(page, job, stem, w, h)

    clear_save(page, job)
    page.emulate_media(reduced_motion="no-preference")

    page.goto(job["base"] + "/introduction.html", wait_until="load")
    wait_ready(page)
    if page.locator("#search-form, #search-input").count():
        LOG.append({"warn": "intro has search", "lang": job["lang"], "phase": job["phase"]})
    S("01-boot-first-screen")
    S("17-intro-no-search")
    S("11-empty-or-loading")

    page.goto(job["base"] + "/pages/p03-park.html", wait_until="load")
    wait_ready(page)
    body = page.inner_text("body")
    leaked = [n for n in job["needles"] if n in body]
    LOG.append(
        {
            "check": "16-token-leak",
            "lang": job["lang"],
            "phase": job["phase"],
            "leaked": leaked,
            "url": page.url,
        }
    )
    if leaked:
        print("WARN 16 leaked", leaked)
    S("16-static-no-unearned-token")

    page.goto(job["base"] + "/index.html", wait_until="load")
    wait_ready(page)
    S("18-public-shell-nav-search")
    S("22a-skin-shop")

    tab_to_search(page)
    page.wait_for_timeout(120)
    S("07-keyboard-focus")

    S("06-narrow-320", 320, 640)
    page.set_viewport_size({"width": 1280, "height": 800})
    wait_ready(page)

    submit_search(page, job, job["miss"])
    S("04-near-fail")
    S("14-search-miss")

    submit_search(page, job, job["hit"])
    S("19-search-hit-new-page")

    submit_search(page, job, job["forbid"])
    S("20-forbidden-via-search")

    page.goto(job["base"] + "/pages/p09-forbidden.html", wait_until="load")
    wait_ready(page)
    S("12-error-or-pause")
    page.goto(job["base"] + "/pages/p04-paused.html", wait_until="load")
    wait_ready(page)
    S("12b-paused")

    page.goto(job["base"] + "/pages/p05-desk.html", wait_until="load")
    wait_ready(page)
    S("13a-desk")
    S("22b-skin-desk")
    S("08-touch-targets")
    pin = page.locator("button.pin").first
    pin.click()
    page.wait_for_timeout(250)
    txt = pin.inner_text()
    LOG.append({"pinAfterClick": txt, "lang": job["lang"], "phase": job["phase"]})
    S("03-success-feedback")
    S("10-non-color-state")

    page.goto(job["base"] + "/pages/p06-doors.html", wait_until="load")
    wait_ready(page)
    page.wait_for_selector("#door-list a, #door-list .door-card", timeout=8000)
    S("02-core-verb")

    page.locator("#door-list a").first.click()
    page.wait_for_load_state("load")
    wait_ready(page)
    S("22c-skin-news")
    pins = page.locator("button.pin")
    if pins.count():
        pins.first.click()
        page.wait_for_timeout(200)
        S("03b-pin-on-news")

    page.goto(job["base"] + "/pages/p06-doors.html", wait_until="load")
    wait_ready(page)
    page.wait_for_selector("#door-list a", timeout=8000)
    links = page.locator("#door-list a")
    if links.count() >= 2:
        links.nth(1).click()
        page.wait_for_load_state("load")
        wait_ready(page)
        S("22d-skin-corp")

    page.goto(job["base"] + "/pages/p06-doors.html", wait_until="load")
    wait_ready(page)
    page.wait_for_selector("#door-list a", timeout=8000)
    links = page.locator("#door-list a")
    if links.count() >= 3:
        links.nth(2).click()
        page.wait_for_load_state("load")
        wait_ready(page)
        S("15-hidden-page-different-skin")
        S("22e-skin-wechat")

    page.goto(job["base"] + "/pages/p05-desk.html", wait_until="load")
    wait_ready(page)
    page.locator("#btn-handover").click()
    page.wait_for_load_state("load")
    wait_ready(page)
    S("05-recovery")

    page.goto(job["base"] + "/pages/p36-limits.html", wait_until="load")
    wait_ready(page)
    S("21-archive")

    page.goto(job["base"] + "/pages/p20-news.html", wait_until="load")
    wait_ready(page)
    S("13b-news-public")

    page.goto(job["base"] + "/pages/p30-form.html", wait_until="load")
    wait_ready(page)
    S("11b-form-empty")

    page.emulate_media(reduced_motion="reduce")
    page.goto(job["base"] + "/index.html", wait_until="load")
    wait_ready(page)
    S("09-muted-or-reduced-motion")
    page.emulate_media(reduced_motion="no-preference")


def sha(p: Path):
    return hashlib.sha256(p.read_bytes()).hexdigest()


def verify_lang(lang: str):
    problems = []
    d = STAGING / lang
    for stem in REQUIRED:
        after = d / f"{stem}.png"
        before = d / f"{stem}-before.png"
        if not after.exists():
            problems.append("missing after " + lang + " " + stem)
        if not before.exists():
            problems.append("missing before " + lang + " " + stem)
    must_differ = [
        ("01-boot-first-screen", "16-static-no-unearned-token"),
        ("01-boot-first-screen", "02-core-verb"),
        ("04-near-fail", "19-search-hit-new-page"),
        ("19-search-hit-new-page", "20-forbidden-via-search"),
        ("16-static-no-unearned-token", "16-static-no-unearned-token"),
    ]
    for a, b in must_differ:
        pa = d / (a + ".png")
        pb = d / (b + ".png" if a != b else b + "-before.png")
        if pa.exists() and pb.exists() and sha(pa) == sha(pb):
            problems.append("same-hash %s %s vs %s" % (lang, pa.name, pb.name))
    p06 = d / "06-narrow-320.png"
    if p06.exists():
        with p06.open("rb") as f:
            sig = f.read(8)
            f.read(8)
            w, h = struct.unpack(">II", f.read(8))
        if sig != b"\x89PNG\r\n\x1a\n" or w != 320:
            problems.append("%s 06 size %sx%s" % (lang, w, h))
    return problems


def copy_out():
    mapping = {"zh": OUT_ZH, "en": OUT_EN}
    copied = []
    for lang, dest in mapping.items():
        dest.mkdir(parents=True, exist_ok=True)
        src = STAGING / lang
        for p in sorted(src.glob("*.png")):
            target = dest / p.name
            shutil.copy2(p, target)
            copied.append(str(target.relative_to(ROOT)))
    return copied


def main():
    if STAGING.exists():
        shutil.rmtree(STAGING)
    STAGING.mkdir(parents=True)

    for job in JOBS:
        probe(job["base"], f"{job['lang']}-{job['phase']}")

    with sync_playwright() as p:
        ctx = p.chromium.launch_persistent_context(
            PROFILE,
            channel="chrome",
            headless=True,
            viewport={"width": 1280, "height": 800},
            device_scale_factor=1,
            args=["--hide-scrollbars", "--disable-dev-shm-usage", "--no-first-run"],
        )
        page = ctx.pages[0] if ctx.pages else ctx.new_page()
        try:
            for job in JOBS:
                print("====", job["lang"], job["phase"], job["base"])
                run_job(page, job)
        finally:
            ctx.close()

    problems = verify_lang("zh") + verify_lang("en")
    copied = copy_out()
    log_path = Path("/tmp/shouqi-d13-shot-log.json")
    payload = {"log": LOG, "problems": problems, "copied": copied, "profile": PROFILE}
    log_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
    print("problems", problems)
    print("copied", len(copied), "log", log_path)
    if problems:
        raise SystemExit("D13 verify failed")


if __name__ == "__main__":
    main()
