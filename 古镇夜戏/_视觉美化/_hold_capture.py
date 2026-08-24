#!/usr/bin/env python3
"""HOLD evidence: live HTTP crawl + Chrome screenshots. Does not modify game files."""
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
from collections import deque
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse
from urllib.request import Request, urlopen

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
GAME = Path("/Users/jianglong/Desktop/github游戏/游戏库/古镇夜戏")
VISUAL = GAME / "visual" / "html-game-puzzle"
AUDIT_DIR = GAME / "_视觉美化"

ZH = "http://127.0.0.1:8910/"
EN = "http://127.0.0.1:8911/"

UA = "GXZ-hold-gate/1.0"


class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.hrefs = []
        self.actions = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == "a" and "href" in d:
            self.hrefs.append(d["href"])
        if tag == "form" and "action" in d:
            self.actions.append(d["action"])


def fetch(url, timeout=20):
    req = Request(url, headers={"User-Agent": UA})
    with urlopen(req, timeout=timeout) as r:
        return r.status, r.geturl(), r.read()


def html_links(base_url, html):
    p = LinkParser()
    p.feed(html.decode("utf-8", "replace"))
    out = []
    for raw in p.hrefs + p.actions:
        if not raw or raw.startswith(("javascript:", "mailto:", "tel:", "#", "data:")):
            continue
        absu = urljoin(base_url, raw)
        if urlparse(absu).netloc != urlparse(base_url).netloc:
            continue
        out.append(absu.split("#")[0])
    return out


def page_key(url):
    path = urlparse(url).path.lstrip("/")
    return path or "index.html"


def live_bfs(origin):
    start = urljoin(origin, "introduction.html")
    q = deque([start])
    parent = {start: None}
    status = {}
    href_map = {}
    while q:
        url = q.popleft()
        try:
            code, final, body = fetch(url)
        except Exception as e:
            status[url] = {"error": str(e)}
            continue
        status[url] = {"http": code, "final": final}
        links = html_links(final, body)
        href_map[page_key(final)] = sorted(
            {page_key(u) for u in links if u.endswith(".html") or ".html?" in u}
        )
        for u in links:
            clean = u.split("?")[0]
            if not clean.endswith(".html"):
                continue
            if clean not in parent:
                parent[clean] = url
                q.append(clean)
    reachable = sorted({page_key(u) for u in parent})
    ending_hits = [
        page_key(u)
        for u in parent
        if page_key(u) in {
            "pages/ending.html",
            "pages/end-appeal.html",
            "pages/end-strike.html",
            "pages/end-enter.html",
            "pages/end-day.html",
        }
    ]
    return {
        "origin": origin,
        "start": start,
        "reachable": reachable,
        "ending_in_bfs": ending_hits,
        "n_reachable": len(reachable),
        "href_map_sample_intro": href_map.get("introduction.html"),
        "pages_with_ending_href": [
            k for k, v in href_map.items() if any("ending" in x or x.startswith("pages/end-") for x in v)
        ],
        "http_ending": None,
        "parent_count": len(parent),
    }


def chrome_dump(url, udd):
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={udd}",
        "--virtual-time-budget=4000",
        "--dump-dom",
        url,
    ]
    p = subprocess.run(cmd, capture_output=True, timeout=60)
    return p.stdout.decode("utf-8", "replace")


def chrome_shot(url, dest, udd, w=1280, h=800):
    dest = Path(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(".tmp.png")
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--no-first-run",
        "--no-default-browser-check",
        f"--user-data-dir={udd}",
        f"--window-size={w},{h}",
        f"--screenshot={tmp}",
        "--virtual-time-budget=4000",
        url,
    ]
    p = subprocess.run(cmd, capture_output=True, timeout=60)
    if not tmp.exists():
        raise RuntimeError(f"screenshot failed {url}\n{p.stderr.decode('utf-8','replace')[-800:]}")
    shutil.move(str(tmp), str(dest))
    return dest.stat().st_size


def extract_result_hrefs(dom):
    hrefs = re.findall(r'<a[^>]+href="([^"]+)"', dom, re.I)
    miss = bool(re.search(r"没有找到|no results|sorry", dom, re.I))
    forbidden = "forbidden" in dom or "禁止访问" in dom or "been forbidden" in dom.lower()
    title = ""
    m = re.search(r"<h2>(.*?)</h2>", dom, re.S)
    if m:
        title = re.sub(r"<[^>]+>", "", m.group(1)).strip()
    return {"title": title, "hrefs": hrefs, "looks_miss": miss, "forbidden": forbidden}


def main():
    udd = Path(tempfile.mkdtemp(prefix="gxz-hold-8910-"))
    out = {"chrome_profile": str(udd), "shots": [], "searches": {}}
    try:
        zh_live = live_bfs(ZH)
        en_live = live_bfs(EN)
        for origin, blob in ((ZH, zh_live), (EN, en_live)):
            end_url = urljoin(origin, "pages/ending.html")
            try:
                code, final, body = fetch(end_url)
                blob["http_ending"] = {
                    "url": end_url,
                    "http": code,
                    "bytes": len(body),
                    "has_end_buttons": all(
                        x.encode() in body for x in (b"end-appeal", b"end-strike", b"end-enter", b"end-day")
                    ),
                    "note": "address-bar GET only; not part of BFS from introduction",
                }
            except Exception as e:
                blob["http_ending"] = {"error": str(e)}
        out["live_zh"] = zh_live
        out["live_en"] = en_live

        searches = [
            ("zh", ZH, "交割"),
            ("zh", ZH, "龙套"),
            ("zh", ZH, "今晚"),
            ("zh", ZH, "ending"),
            ("en", EN, "Settlement"),
            ("en", EN, "settlement"),
            ("en", EN, "Extra"),
            ("en", EN, "Tonight"),
        ]
        for lang, origin, q in searches:
            url = urljoin(origin, "search-results.html?q=" + quote(q))
            dom = chrome_dump(url, str(udd))
            info = extract_result_hrefs(dom)
            info["url"] = url
            info["q"] = q
            out["searches"][f"{lang}:{q}"] = info

        shots = [
            ("hold-20260823-zh", "01-boot-first-screen.png", urljoin(ZH, "introduction.html"), 1280),
            ("hold-20260823-zh", "02-core-verb-index.png", urljoin(ZH, "index.html"), 1280),
            ("hold-20260823-zh", "03-ticket.png", urljoin(ZH, "ticket.html"), 1280),
            ("hold-20260823-zh", "04-visit.png", urljoin(ZH, "pages/visit.html"), 1280),
            ("hold-20260823-zh", "05-search-jiaoge-miss.png", urljoin(ZH, "search-results.html?q=") + quote("交割"), 1280),
            ("hold-20260823-zh", "06-search-longtao-hit.png", urljoin(ZH, "search-results.html?q=") + quote("龙套"), 1280),
            ("hold-20260823-zh", "07-login.png", urljoin(ZH, "pages/login.html"), 1280),
            ("hold-20260823-zh", "08-order.png", urljoin(ZH, "pages/order.html"), 1280),
            ("hold-20260823-zh", "09-narrow-320-intro.png", urljoin(ZH, "introduction.html"), 320),
            ("hold-20260823-zh", "10-typed-url-orphan-ending.png", urljoin(ZH, "pages/ending.html"), 1280),
            ("hold-20260823-en", "01-boot-first-screen.png", urljoin(EN, "introduction.html"), 1280),
            ("hold-20260823-en", "02-core-verb-index.png", urljoin(EN, "index.html"), 1280),
            ("hold-20260823-en", "05-search-settlement-miss.png", urljoin(EN, "search-results.html?q=Settlement"), 1280),
            ("hold-20260823-en", "06-search-extra-hit.png", urljoin(EN, "search-results.html?q=Extra"), 1280),
            ("hold-20260823-en", "10-typed-url-orphan-ending.png", urljoin(EN, "pages/ending.html"), 1280),
        ]
        for folder, name, url, w in shots:
            dest = VISUAL / folder / name
            size = chrome_shot(url, dest, str(udd), w=w, h=800 if w >= 800 else 640)
            out["shots"].append({"path": str(dest.relative_to(GAME)), "url": url, "bytes": size, "width": w})
            print("SHOT", dest, size, url)

        (AUDIT_DIR / "live-walk.json").write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
        print("WROTE", AUDIT_DIR / "live-walk.json")
        print("ZH reachable", zh_live["n_reachable"], "ending_in_bfs", zh_live["ending_in_bfs"])
        print("EN reachable", en_live["n_reachable"], "ending_in_bfs", en_live["ending_in_bfs"])
        print("ZH ending http", zh_live["http_ending"])
        print("SEARCHES")
        for k, v in out["searches"].items():
            print(" ", k, "title=", v.get("title"), "hrefs=", v.get("hrefs"), "miss=", v.get("looks_miss"))
    finally:
        shutil.rmtree(udd, ignore_errors=True)
        print("cleaned profile", udd)


if __name__ == "__main__":
    main()
