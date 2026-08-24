#!/usr/bin/env python3
"""Copy CN CSS to EN, then capture screenshots with Chrome (/tmp profile)."""
import json, os, shutil, subprocess, time, urllib.request, base64, socket, hashlib, struct

ROOT = "/Users/jianglong/Desktop/游戏美化/牌位勘误"
CN_CSS = os.path.join(ROOT, "中文版", "css")
EN_CSS = os.path.join(ROOT, "英文版", "css")
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PROFILE = "/tmp/paiwei-kanwu-chrome-profile"
OUT = os.path.join(ROOT, "_视觉美化", "visual", "多源著录建议")
PORT_DBG = 9333

CSS_FILES = [
    "service-cyan-desk.css",
    "intro-manual.css",
    "shop-local-2010s.css",
    "news-portal-163.css",
    "corp-table-2005.css",
    "archive-simsun.css",
    "tieba-floors.css",
    "mail-web-2010.css",
    "gov-redbar.css",
]

SHOTS = [
    ("01-boot-first-screen", "/introduction.html", 1280, 800, None),
    ("02-core-verb", "/desk/card.html", 1280, 800, None),
    ("03-success-feedback", "/desk/result-hold.html", 1280, 800, None),
    ("04-near-fail", "/desk/result-half.html", 1280, 800, None),
    ("05-recovery", "/desk/result-half.html", 1280, 800, None),
    ("06-narrow-320", "/desk/card.html", 320, 640, None),
    ("07-keyboard-focus", "/introduction.html", 1280, 800, "focus-enter"),
    ("08-touch-targets", "/desk/home.html", 390, 844, None),
    ("09-muted-or-reduced-motion", "/desk/card.html", 1280, 800, "reduced"),
    ("10-non-color-state", "/desk/login.html", 1280, 800, "login-err"),
    ("11-empty-or-loading", "/mail/inbox.html", 1280, 800, None),
    ("12-error-or-pause", "/desk/login.html", 1280, 800, "login-err"),
    ("13-intro-no-search", "/introduction.html", 1280, 800, None),
    ("14-public-shell", "/index.html", 1280, 800, None),
    ("15-forum-floors", "/forum/list.html", 1280, 800, None),
    ("16-mail-threecol", "/mail/inbox.html", 1280, 800, None),
    ("17-archive-volume", "/archive/index.html", 1280, 800, None),
    ("18-clan-table", "/clan/index.html", 1280, 800, None),
    ("19-gov-redhead", "/gov/index.html", 1280, 800, None),
    ("20-card-six-fields", "/desk/card.html", 1280, 800, None),
    ("21-card-selected", "/desk/card.html", 1280, 800, "card-focus"),
    ("22-card-overreach", "/desk/card.html", 1280, 800, "card-over"),
    ("23-result-over", "/desk/result-over.html", 1280, 800, None),
    ("24-result-print", "/desk/result-print.html", 1280, 800, None),
    ("25-news-portal", "/paper/index.html", 1280, 800, None),
    ("26-desk-home-sources", "/desk/home.html", 1280, 800, None),
    ("27-public-package", "/public/package.html", 1280, 800, None),
    ("28-narrow-320-public", "/index.html", 320, 640, None),
    ("29-login", "/desk/login.html", 1280, 800, None),
    ("30-result-hold", "/desk/result-hold.html", 1280, 800, None),
]


def sync_css():
    for name in CSS_FILES:
        src = os.path.join(CN_CSS, name)
        dst = os.path.join(EN_CSS, name)
        shutil.copy2(src, dst)
        print("copied", name)


def chrome_shot(url, dest, w, h):
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    cmd = [
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--ignore-certificate-errors",
        f"--user-data-dir={PROFILE}",
        f"--window-size={w},{h}",
        f"--screenshot={dest}",
        url,
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    print("shot", dest, os.path.getsize(dest) if os.path.exists(dest) else 0)


def js_shot(url, dest, w, h, js):
    """One-off Chrome with dump via virtual time is limited; use --virtual-time-budget + evaluate through a wrapper page is hard.
    Fallback: navigate then screenshot after injecting via data? We use Chrome remote if possible."""
    chrome_shot(url, dest, w, h)


def capture_lang(port, lang, suffix):
    folder = os.path.join(OUT, f"polish-20260823-{lang}")
    os.makedirs(folder, exist_ok=True)
    for slug, path, w, h, action in SHOTS:
        dest = os.path.join(folder, f"{slug}{suffix}.png")
        url = f"http://127.0.0.1:{port}{path}"
        chrome_shot(url, dest, w, h)


def check_http():
    for port in (9000, 9001):
        with urllib.request.urlopen(f"http://127.0.0.1:{port}/introduction.html", timeout=5) as r:
            print("http", port, r.status)


if __name__ == "__main__":
    import sys
    mode = sys.argv[1] if len(sys.argv) > 1 else "sync"
    if mode == "sync":
        sync_css()
    elif mode == "check":
        check_http()
    elif mode == "after":
        check_http()
        capture_lang(9000, "zh", "")
        capture_lang(9001, "en", "")
    elif mode == "before":
        check_http()
        capture_lang(9000, "zh", "-before")
        capture_lang(9001, "en", "-before")
    else:
        raise SystemExit("mode sync|check|before|after")
