#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parent QC for 英文版游戏4. Counts Han in html+js, checks lang/save-key/contract."""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CJK = re.compile(r"[\u4e00-\u9fff]")
GAMES = [
    ("纸扎组句", "zhizha-juzi-v1-en", "zhizha-juzi-v1"),
    ("清明三门", "qingming-sanmen-v1-en", "qingming-sanmen-v1"),
    ("改名对质", "gaiming-duizhi-v1-en", "gaiming-duizhi-v1"),
    ("碑纹跳切", "beiwen-tiaqie-v1-en", "beiwen-tiaqie-v1"),
    ("门坎试法", "menkan-shifa-v1-en", "menkan-shifa-v1"),
]


def files(folder, exts):
    out = []
    for dp, _, fns in os.walk(folder):
        if "/." in dp:
            continue
        for fn in fns:
            if fn.endswith(exts):
                out.append(os.path.join(dp, fn))
    return sorted(out)


def han(path):
    try:
        t = open(path, encoding="utf-8").read()
    except Exception:
        return 0, []
    hits = CJK.findall(t)
    samples = []
    for m in CJK.finditer(t):
        i = max(0, m.start() - 12)
        j = min(len(t), m.end() + 12)
        samples.append(re.sub(r"\s+", " ", t[i:j]))
        if len(samples) >= 6:
            break
    return len(hits), samples


def vis_han(t):
    n = 0
    for pat in (r"<title[^>]*>([^<]*)</title>", r'placeholder="([^"]*)"', r"<noscript[^>]*>(.*?)</noscript>"):
        for m in re.finditer(pat, t, re.I | re.S):
            n += len(CJK.findall(m.group(1)))
    return n


def lang_ok(folder):
    bad = []
    for p in files(folder, (".html",)):
        t = open(p, encoding="utf-8").read()
        m = re.search(r"<html[^>]*lang=[\"']([^\"']+)", t, re.I)
        if not m or not m.group(1).lower().startswith("en"):
            bad.append(os.path.relpath(p, folder))
    return bad


def main():
    print("ROOT", ROOT)
    for name, en_key, zh_key in GAMES:
        folder = os.path.join(ROOT, name)
        print("\n==", name, "==")
        if not os.path.isdir(folder):
            print("MISSING")
            continue
        htmls = files(folder, (".html",))
        jss = [p for p in files(folder, (".js",)) if "/js/" in p.replace("\\", "/")]
        h_html = h_js = v = 0
        samples = []
        for p in htmls:
            t = open(p, encoding="utf-8").read()
            n, s = han(p)
            h_html += n
            v += vis_han(t)
            if n and len(samples) < 4:
                samples.append(os.path.relpath(p, folder) + ": " + (s[0] if s else ""))
        for p in jss:
            n, s = han(p)
            h_js += n
            if n and len(samples) < 8:
                samples.append(os.path.relpath(p, folder) + ": " + (s[0] if s else ""))
        js_txt = "\n".join(open(p, encoding="utf-8").read() for p in jss)
        print("html", len(htmls), "js", len(jss))
        print("han html", h_html, "han js", h_js, "visible", v)
        print("lang_en", "ok" if not lang_ok(folder) else "BAD " + ", ".join(lang_ok(folder)[:6]))
        print("contract", os.path.exists(os.path.join(folder, "LOCALIZATION_CONTRACT.md")))
        print("loc_qa", os.path.exists(os.path.join(folder, "LOC_QA.md")))
        print("key_en", en_key in js_txt)
        print("key_zh_bare", (zh_key in js_txt) and (en_key not in js_txt or zh_key + "-en" not in js_txt and js_txt.count(zh_key) > js_txt.count(en_key)))
        if samples:
            print("samples")
            for s in samples:
                print(" ", s)


if __name__ == "__main__":
    main()
