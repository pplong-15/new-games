# -*- coding: utf-8 -*-
"""Wordless unique JPEGs. No text, no logos, no faces."""
from __future__ import annotations

import math
import pathlib
import struct
import zlib

ROOT = pathlib.Path(__file__).resolve().parent / "img"
ROOT.mkdir(exist_ok=True)


def _chunk(tag: bytes, data: bytes) -> bytes:
    return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF)


def write_png(path: pathlib.Path, w: int, h: int, pix) -> None:
    raw = bytearray()
    for y in range(h):
        raw.append(0)
        for x in range(w):
            r, g, b = pix(x, y)
            raw.extend((r & 255, g & 255, b & 255))
    ihdr = struct.pack(">IIBBBBB", w, h, 8, 2, 0, 0, 0)
    png = b"\x89PNG\r\n\x1a\n" + _chunk(b"IHDR", ihdr) + _chunk(b"IDAT", zlib.compress(bytes(raw), 9)) + _chunk(b"IEND", b"")
    path.write_bytes(png)


def clamp(v: float) -> int:
    return max(0, min(255, int(v)))


def n2(x: float, y: float, s: float) -> float:
    return math.sin(x * 0.017 * s + y * 0.013 * s) * math.cos(y * 0.011 * s - x * 0.009)


SPECS = {
    "cover-alley.jpg": lambda x, y: (
        clamp(18 + 22 * n2(x, y, 1.2) + y * 0.04),
        clamp(16 + 18 * n2(x + 40, y, 0.8) + (400 - y) * 0.02),
        clamp(28 + 36 * n2(x, y + 20, 1.6) + x * 0.01),
    ),
    "threshold-wood.jpg": lambda x, y: (
        clamp(92 + 50 * n2(x, y * 3, 2.4) + (y % 18) * 1.8),
        clamp(58 + 28 * n2(x * 2, y, 1.7)),
        clamp(32 + 16 * n2(x, y, 2.1)),
    ),
    "hall-door.jpg": lambda x, y: (
        clamp(48 + 20 * n2(x, y, 0.7) + (20 if 180 < x < 220 else 0)),
        clamp(28 + 12 * n2(x + 8, y, 0.9)),
        clamp(22 + 10 * n2(x, y + 8, 1.1)),
    ),
    "pole-shadow.jpg": lambda x, y: (
        clamp(70 + 10 * n2(x, y, 0.5) - abs(x - 200) * 0.12),
        clamp(68 + 8 * n2(x, y, 0.6) - abs(x - 200) * 0.10),
        clamp(64 + 8 * n2(x, y, 0.4) - abs(x - 200) * 0.08),
    ),
    "red-cloth.jpg": lambda x, y: (
        clamp(150 + 40 * n2(x, y, 1.3) + math.sin(y * 0.08) * 18),
        clamp(28 + 16 * n2(x + 12, y, 1.8)),
        clamp(32 + 14 * n2(x, y + 12, 1.4)),
    ),
    "hemp-cloth.jpg": lambda x, y: (
        clamp(168 + 22 * n2(x * 3, y * 2, 3.1)),
        clamp(148 + 18 * n2(x * 2, y * 3, 2.6)),
        clamp(110 + 14 * n2(x, y, 2.2)),
    ),
    "key-box.jpg": lambda x, y: (
        clamp(86 + 18 * n2(x, y, 0.9) + (12 if 40 < y < 200 else 0)),
        clamp(82 + 14 * n2(x + 5, y, 1.0)),
        clamp(78 + 12 * n2(x, y + 5, 0.8)),
    ),
    "old-car.jpg": lambda x, y: (
        clamp(36 + 14 * n2(x, y, 0.6) + (y > 220 and 28 or 0)),
        clamp(38 + 10 * n2(x + 30, y, 0.7)),
        clamp(42 + 16 * n2(x, y + 30, 0.5)),
    ),
}

w = h = 400
# bind h for cover-alley
for name, fn in list(SPECS.items()):
    def pix(x, y, f=fn):
        return f(x, y)

    png = ROOT / (name.replace(".jpg", ".png"))
    write_png(png, w, h, pix)
    print("png", png.name, png.stat().st_size)
