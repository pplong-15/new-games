#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Refuse pasted filler. Run from a game folder: python3 ../_shared/dupcheck.py ."""
from __future__ import annotations

import pathlib
import re
import sys
from collections import defaultdict

HAN = re.compile(r"[\u4e00-\u9fff]")
TAG = re.compile(r"<[^>]+>")


def hanzi_only(html: str) -> str:
    t = TAG.sub("", html)
    return "".join(ch for ch in t if "\u4e00" <= ch <= "\u9fff")


def ngrams(s: str, n: int):
    for i in range(0, max(0, len(s) - n + 1)):
        yield s[i : i + n]


def main() -> int:
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    min_html = int(sys.argv[2]) if len(sys.argv) > 2 else 36
    min_hanzi = int(sys.argv[3]) if len(sys.argv) > 3 else 8000
    files = sorted(root.rglob("*.html"))
    if not files:
        print("FAIL no html")
        return 1
    bodies = {p: hanzi_only(p.read_text(encoding="utf-8", errors="ignore")) for p in files}
    total = sum(len(v) for v in bodies.values())
    # 40-char must be unique globally
    seen40 = {}
    dup40 = []
    for p, s in bodies.items():
        local = set()
        for g in ngrams(s, 40):
            if g in local:
                continue
            local.add(g)
            if g in seen40:
                dup40.append((g, seen40[g], p))
            else:
                seen40[g] = p
    # 24-char in 3+ files
    files24 = defaultdict(set)
    for p, s in bodies.items():
        for g in set(ngrams(s, 24)):
            files24[g].add(str(p))
    trip24 = [(g, ps) for g, ps in files24.items() if len(ps) >= 3]
    print("html", len(files), "hanzi", total)
    print("dup40", len(dup40), "trip24", len(trip24))
    if dup40:
        g, a, b = dup40[0]
        print("example40", g[:40], "\n ", a, "\n ", b)
    if trip24:
        g, ps = trip24[0]
        print("example24", g, "files", len(ps))
    ok = (not dup40) and (not trip24) and total >= min_hanzi and len(files) >= min_html
    print("PASS" if ok else "FAIL")
    if total < min_hanzi:
        print(f"too thin: need unique hanzi >= {min_hanzi}, not clones")
    if len(files) < min_html:
        print(f"too short: need html >= {min_html} unique pages")
    return 0 if ok else 2


if __name__ == "__main__":
    raise SystemExit(main())
