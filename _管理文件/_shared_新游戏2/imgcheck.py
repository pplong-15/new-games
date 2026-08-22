#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Count unique images. Usage: python3 imgcheck.py DIR [min_count]"""
from __future__ import annotations

import hashlib
import pathlib
import sys

EXTS = {".png", ".jpg", ".jpeg", ".webp", ".gif"}


def main() -> int:
    root = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    need = int(sys.argv[2]) if len(sys.argv) > 2 else 8
    files = [p for p in root.rglob("*") if p.suffix.lower() in EXTS and p.is_file()]
    hashes = {}
    for p in files:
        h = hashlib.md5(p.read_bytes()).hexdigest()
        hashes.setdefault(h, []).append(p)
    unique = len(hashes)
    print("img", len(files), "unique_md5", unique)
    if unique < need:
        print("FAIL need unique images >=", need)
        return 2
    print("PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
