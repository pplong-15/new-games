#!/usr/bin/env python3
"""D12 original night-store art. Local deterministic Pillow. No network, no models."""
from __future__ import annotations

import hashlib
import json
import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent
OUT = ROOT / "out"
SVG = ROOT / "svg"
P = json.loads((ROOT / "params.json").read_text(encoding="utf-8"))

INK = (4, 6, 5)
PAPER = (217, 199, 161)
STAMP = (196, 92, 24)
LAMP = (62, 224, 125)
WET = (18, 22, 26)
TUBE = (200, 220, 200)
COOL = (158, 196, 200)
SKIN = (210, 180, 140)
SKIN2 = (176, 140, 108)
HAIR = (28, 24, 22)
LINE = (12, 14, 13)
NAVY = (28, 40, 52)
OLIVE = (72, 84, 48)
WHITE = (236, 230, 214)
GREY = (92, 96, 98)

W, H = 720, 1280
VPX, VPY = 360, 392
SS = 2


def lerp(a, b, t):
    return a + (b - a) * t


def mix(c0, c1, t):
    n = min(len(c0), len(c1))
    return tuple(int(lerp(c0[i], c1[i], t)) for i in range(n))


def vgrad(size, c0, c1):
    w, h = size
    g = Image.new("RGB", (1, h))
    px = g.load()
    for y in range(h):
        px[0, y] = mix(c0, c1, y / max(1, h - 1))
    return g.resize((w, h), Image.Resampling.BILINEAR)


def radial(size, cx, cy, r, c_in, c_out, a_in=255, a_out=0):
    w, h = size
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    px = im.load()
    r = max(1.0, float(r))
    y0, y1 = max(0, int(cy - r)), min(h, int(cy + r) + 1)
    x0, x1 = max(0, int(cx - r)), min(w, int(cx + r) + 1)
    for y in range(y0, y1):
        dy = y - cy
        for x in range(x0, x1):
            d = math.hypot(x - cx, dy) / r
            if d >= 1:
                continue
            t = d * d
            col = mix(c_in, c_out, t)
            a = int(lerp(a_in, a_out, t))
            px[x, y] = (*col, a)
    return im


def overlay(base, layer, xy=(0, 0)):
    if base.mode != "RGBA":
        base = base.convert("RGBA")
    if layer.mode != "RGBA":
        layer = layer.convert("RGBA")
    base.alpha_composite(layer, dest=xy)
    return base


def round_box(d, box, r, fill, outline=None, width=2):
    d.rounded_rectangle(box, radius=int(r), fill=fill, outline=outline, width=width)


def write_svg():
    SVG.mkdir(parents=True, exist_ok=True)
    (SVG / "camera-lock.svg").write_text(
        f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280" viewBox="0 0 720 1280">
  <desc>Locked camera for Hengdeng night store. Original geometry. No letters.</desc>
  <rect width="720" height="1280" fill="#040605"/>
  <line x1="0" y1="{VPY}" x2="720" y2="{VPY}" stroke="#c45c18" stroke-width="1" opacity="0.5"/>
  <circle cx="{VPX}" cy="{VPY}" r="6" fill="#3ee07d"/>
  <rect x="96" y="268" width="528" height="740" fill="none" stroke="#d9c7a1" stroke-width="2"/>
  <rect x="276" y="428" width="168" height="572" fill="none" stroke="#3ee07d" stroke-width="2"/>
  <polygon points="36,742 684,742 720,980 0,980" fill="none" stroke="#c45c18" stroke-width="2"/>
</svg>
''',
        encoding="utf-8",
    )


def exterior():
    sw, sh = W * SS, H * SS
    s = SS
    im = vgrad((sw, sh), (8, 12, 18), INK).convert("RGBA")
    im = overlay(im, radial((sw, sh), 360 * s, 300 * s, 420 * s, (24, 32, 40), INK, 80, 0))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle([0, 250 * s, 88 * s, 1008 * s], fill=(16, 20, 24))
    d.rectangle([632 * s, 220 * s, sw, 1008 * s], fill=(14, 18, 22))
    for bx, rows, y0 in ((14, 6, 280), (648, 7, 250)):
        for r in range(rows):
            for c in range(3):
                on = (r + c) % 4 != 1
                col = mix(PAPER, STAMP, 0.25) if on else (22, 24, 26)
                x = (bx + c * 22) * s
                y = (y0 + r * 36) * s
                d.rectangle([x, y, x + 10 * s, y + 16 * s], fill=col)
    d.rectangle([96 * s, 268 * s, 624 * s, 1008 * s], fill=(22, 26, 28), outline=LINE, width=3 * s)
    d.rectangle([96 * s, 900 * s, 624 * s, 1008 * s], fill=(32, 30, 28))
    d.polygon(
        [(80 * s, 360 * s), (640 * s, 360 * s), (612 * s, 430 * s), (108 * s, 430 * s)],
        fill=mix(STAMP, INK, 0.35),
    )
    d.polygon(
        [(108 * s, 430 * s), (612 * s, 430 * s), (600 * s, 448 * s), (120 * s, 448 * s)],
        fill=mix(STAMP, INK, 0.55),
    )
    im = overlay(im, radial((sw, sh), 360 * s, 318 * s, 220 * s, STAMP, INK, 120, 0))
    d = ImageDraw.Draw(im, "RGBA")
    round_box(d, [170 * s, 286 * s, 550 * s, 348 * s], 8 * s, mix(STAMP, PAPER, 0.15), mix(PAPER, STAMP, 0.4), 2 * s)
    round_box(d, [186 * s, 298 * s, 534 * s, 336 * s], 4 * s, mix(INK, STAMP, 0.25))
    d.ellipse([78 * s, 470 * s, 158 * s, 550 * s], fill=mix(INK, LAMP, 0.25), outline=LAMP, width=4 * s)
    d.ellipse([96 * s, 488 * s, 140 * s, 532 * s], fill=mix(LAMP, PAPER, 0.35))
    im = overlay(im, radial((sw, sh), 118 * s, 510 * s, 90 * s, LAMP, INK, 90, 0))
    d = ImageDraw.Draw(im, "RGBA")
    round_box(d, [118 * s, 470 * s, 268 * s, 780 * s], 6 * s, mix(PAPER, TUBE, 0.2), mix(PAPER, INK, 0.5), 3 * s)
    for i, col in enumerate([(196, 80, 60), (210, 180, 70), (70, 120, 90), (80, 90, 140)]):
        y = (500 + i * 58) * s
        d.rectangle([132 * s, y, 254 * s, y + 40 * s], fill=mix(col, PAPER, 0.35))
    round_box(d, [292 * s, 448 * s, 428 * s, 1000 * s], 4 * s, mix(PAPER, TUBE, 0.35), (40, 44, 46), 4 * s)
    d.line([360 * s, 456 * s, 360 * s, 992 * s], fill=(50, 54, 56), width=3 * s)
    d.rectangle([348 * s, 700 * s, 372 * s, 760 * s], fill=mix(PAPER, STAMP, 0.4))
    round_box(d, [452 * s, 470 * s, 602 * s, 780 * s], 6 * s, mix(COOL, INK, 0.35), mix(PAPER, INK, 0.5), 3 * s)
    d.rectangle([468 * s, 520 * s, 586 * s, 740 * s], fill=mix(NAVY, COOL, 0.25))
    d.rectangle([470 * s, 790 * s, 590 * s, 860 * s], fill=(40, 44, 46), outline=LINE, width=2 * s)
    d.polygon([(0, 1008 * s), (sw, 1008 * s), (sw, sh), (0, sh)], fill=(*WET, 255))
    pud = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    pd = ImageDraw.Draw(pud)
    pd.ellipse([160 * s, 1080 * s, 560 * s, 1220 * s], fill=(*STAMP, 70))
    pd.ellipse([90 * s, 1120 * s, 200 * s, 1188 * s], fill=(*LAMP, 50))
    im = overlay(im, pud.filter(ImageFilter.GaussianBlur(12 * s)))
    d = ImageDraw.Draw(im, "RGBA")
    d.polygon([(0, 1000 * s), (sw, 1000 * s), (sw, 1016 * s), (0, 1016 * s)], fill=(28, 30, 32, 255))
    d.ellipse([478 * s, 930 * s, 528 * s, 980 * s], outline=mix(PAPER, INK, 0.5), width=5 * s)
    d.ellipse([560 * s, 930 * s, 610 * s, 980 * s], outline=mix(PAPER, INK, 0.5), width=5 * s)
    d.line([504 * s, 932 * s, 548 * s, 860 * s], fill=mix(PAPER, INK, 0.4), width=4 * s)
    d.line([548 * s, 860 * s, 586 * s, 932 * s], fill=mix(PAPER, INK, 0.4), width=4 * s)
    d.line([548 * s, 860 * s, 548 * s, 820 * s], fill=mix(PAPER, INK, 0.4), width=4 * s)
    rain = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    rd = ImageDraw.Draw(rain)
    for i in range(90):
        x = (17 * i * 13) % sw
        y = (i * 97 + 40) % (sh - 80 * s)
        rd.line([(x, y), (x + 3 * s, y + 46 * s)], fill=(180, 190, 200, 50), width=max(1, s))
    im = overlay(im, rain)
    spill = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    sd = ImageDraw.Draw(spill)
    sd.polygon(
        [(292 * s, 1000 * s), (428 * s, 1000 * s), (500 * s, 1180 * s), (220 * s, 1180 * s)],
        fill=(*mix(PAPER, TUBE, 0.4), 55),
    )
    im = overlay(im, spill.filter(ImageFilter.GaussianBlur(10 * s)))
    return im.convert("RGB").resize((W, H), Image.Resampling.LANCZOS)


def interior():
    sw, sh = W * SS, H * SS
    s = SS
    im = vgrad((sw, sh), (18, 24, 22), INK).convert("RGBA")
    d = ImageDraw.Draw(im, "RGBA")
    d.polygon(
        [(0, 0), (sw, 0), (int(520 * s), 300 * s), (int(200 * s), 300 * s)],
        fill=(28, 34, 32, 255),
    )
    for cx in (240, 480):
        round_box(d, [(cx - 90) * s, 70 * s, (cx + 90) * s, 92 * s], 8 * s, TUBE, mix(TUBE, PAPER, 0.5), s)
        im = overlay(im, radial((sw, sh), cx * s, 110 * s, 220 * s, TUBE, INK, 70, 0))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle([180 * s, 300 * s, 540 * s, 760 * s], fill=(30, 34, 32))
    round_box(d, [292 * s, 360 * s, 428 * s, 760 * s], 4 * s, mix(INK, STAMP, 0.12), (48, 52, 54), 4 * s)
    d.line([360 * s, 368 * s, 360 * s, 752 * s], fill=(60, 64, 66), width=3 * s)
    im = overlay(im, radial((sw, sh), 360 * s, 520 * s, 80 * s, STAMP, INK, 60, 0))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle([0, 300 * s, 210 * s, 900 * s], fill=(36, 48, 52), outline=LINE, width=3 * s)
    for i in range(6):
        y = (320 + i * 88) * s
        d.rectangle([18 * s, y, 192 * s, y + 70 * s], fill=mix(COOL, WHITE, 0.15), outline=(70, 90, 96), width=2 * s)
        for k, col in enumerate(((40, 140, 90), (180, 70, 60), (200, 180, 70))):
            d.rectangle([28 * s + k * 52 * s, y + 10 * s, 68 * s + k * 52 * s, y + 60 * s], fill=col)
    im = overlay(im, radial((sw, sh), 110 * s, 560 * s, 260 * s, COOL, INK, 50, 0))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle([510 * s, 300 * s, sw, 900 * s], fill=(42, 36, 32), outline=LINE, width=3 * s)
    cols = [(160, 50, 48), (196, 150, 60), (70, 90, 70), (90, 70, 110), (180, 90, 50)]
    for r in range(7):
        y = (318 + r * 78) * s
        d.line([518 * s, y + 70 * s, sw - 8 * s, y + 70 * s], fill=(60, 50, 44), width=4 * s)
        for c in range(3):
            col = cols[(r + c) % 5]
            x = (528 + c * 62) * s
            d.rounded_rectangle([x, y + 8 * s, x + 50 * s, y + 62 * s], 4 * s, fill=mix(col, PAPER, 0.12))
    floor = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    fd = ImageDraw.Draw(floor)
    fd.polygon([(0, 760 * s), (sw, 760 * s), (sw, 980 * s), (0, 980 * s)], fill=(*mix(WET, PAPER, 0.08), 255))
    for i in range(1, 8):
        y = int(lerp(760, 980, i / 8) * s)
        fd.line([(int(lerp(0, 80, i / 8) * s), y), (int(sw - lerp(0, 80, i / 8) * s), y)], fill=(40, 44, 42, 90), width=s)
    im = overlay(im, floor)
    d = ImageDraw.Draw(im, "RGBA")
    d.polygon(
        [(40 * s, 980 * s), (680 * s, 980 * s), (720 * s, 1188 * s), (0, 1188 * s)],
        fill=(*mix(PAPER, INK, 0.55), 255),
    )
    d.polygon([(0, 1188 * s), (sw, 1188 * s), (sw, sh), (0, sh)], fill=(*mix(PAPER, INK, 0.72), 255))
    d.line([40 * s, 980 * s, 680 * s, 980 * s], fill=mix(PAPER, STAMP, 0.3), width=3 * s)
    return im.convert("RGB").resize((W, H), Image.Resampling.LANCZOS)


def counter_fx():
    sw, sh = W * SS, H * SS
    s = SS
    im = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    d = ImageDraw.Draw(im, "RGBA")
    d.polygon(
        [(36 * s, 742 * s), (684 * s, 742 * s), (720 * s, 980 * s), (0, 980 * s)],
        fill=(*mix(PAPER, SKIN2, 0.25), 235),
    )
    d.polygon([(0, 980 * s), (sw, 980 * s), (sw, 1188 * s), (0, 1188 * s)], fill=(*mix(PAPER, INK, 0.62), 245))
    d.polygon([(0, 1188 * s), (sw, 1188 * s), (sw, sh), (0, sh)], fill=(*mix(INK, PAPER, 0.18), 230))
    d.line([36 * s, 742 * s, 684 * s, 742 * s], fill=(*mix(PAPER, STAMP, 0.25), 255), width=3 * s)
    d.line([0, 980 * s, sw, 980 * s], fill=(*mix(INK, PAPER, 0.4), 255), width=3 * s)
    round_box(d, [470 * s, 700 * s, 640 * s, 790 * s], 8 * s, mix(NAVY, INK, 0.2), LINE, 2 * s)
    d.rectangle([490 * s, 714 * s, 620 * s, 748 * s], fill=mix(COOL, INK, 0.45))
    d.rectangle([500 * s, 758 * s, 560 * s, 776 * s], fill=mix(STAMP, PAPER, 0.3))
    d.polygon(
        [(80 * s, 760 * s), (210 * s, 754 * s), (218 * s, 800 * s), (86 * s, 808 * s)],
        fill=(*mix(PAPER, WHITE, 0.2), 255),
        outline=mix(PAPER, INK, 0.3),
    )
    d.polygon(
        [(88 * s, 748 * s), (206 * s, 742 * s), (210 * s, 754 * s), (80 * s, 760 * s)],
        fill=(*mix(PAPER, WHITE, 0.05), 255),
    )
    for i, x in enumerate((250, 278, 300)):
        d.ellipse([x * s, (790 + i) * s, (x + 22) * s, (812 + i) * s], fill=mix(PAPER, STAMP, 0.45), outline=STAMP, width=s)
    d.ellipse([360 * s, 768 * s, 430 * s, 820 * s], fill=mix(NAVY, COOL, 0.2), outline=LINE, width=2 * s)
    d.ellipse([378 * s, 780 * s, 412 * s, 808 * s], fill=mix(LAMP, COOL, 0.4))
    d.rectangle([88 * s, 1040 * s, 200 * s, 1180 * s], fill=mix((36, 110, 72), INK, 0.25), outline=LINE, width=2 * s)
    return im.filter(ImageFilter.GaussianBlur(0.35 * s)).resize((W, H), Image.Resampling.LANCZOS)


def draw_head(d, cx, cy, hw, hh, skin, look="front", age=30):
    d.ellipse([cx - hw, cy - hh, cx + hw, cy + hh], fill=skin, outline=LINE, width=3)
    ey = cy - hh * 0.08
    dx = 0 if look == "front" else (-9 if look == "left" else 9)
    for side in (-1, 1):
        ex = cx + side * hw * 0.38 + dx
        d.ellipse([ex - 8, ey - 6, ex + 8, ey + 7], fill=WHITE, outline=LINE, width=2)
        d.ellipse([ex - 4 + dx // 5, ey - 3, ex + 4 + dx // 5, ey + 4], fill=mix(INK, NAVY, 0.2))
    brow = mix(HAIR, GREY, 0.2 if age < 50 else 0.55)
    d.arc([cx - hw * 0.7 + dx, ey - 22, cx - hw * 0.1 + dx, ey + 4], 200, 340, fill=brow, width=3)
    d.arc([cx + hw * 0.1 + dx, ey - 22, cx + hw * 0.7 + dx, ey + 4], 200, 340, fill=brow, width=3)
    d.line([(cx + dx * 0.3, cy - 4), (cx + dx * 0.3 + 4, cy + 10)], fill=mix(skin, INK, 0.25), width=2)
    d.arc([cx - 16 + dx, cy + 14, cx + 16 + dx, cy + 32], 20, 160, fill=mix(STAMP, skin, 0.55), width=3)


def draw_hair(d, cx, cy, hw, hh, kind, color=HAIR):
    if kind == "short":
        d.pieslice([cx - hw - 8, cy - hh - 18, cx + hw + 8, cy + 10], 180, 0, fill=color, outline=LINE)
    elif kind == "bob":
        d.ellipse([cx - hw - 16, cy - hh - 10, cx + hw + 16, cy + hh * 0.55], fill=color, outline=LINE, width=3)
    elif kind == "long":
        d.polygon(
            [
                (cx - hw - 8, cy - hh + 16),
                (cx - hw + 4, cy - hh - 10),
                (cx + hw - 4, cy - hh - 10),
                (cx + hw + 8, cy - hh + 16),
                (cx + hw + 16, cy + hh * 1.7),
                (cx + hw - 10, cy + hh * 0.8),
                (cx - hw + 10, cy + hh * 0.8),
                (cx - hw - 16, cy + hh * 1.7),
            ],
            fill=color,
            outline=LINE,
        )
    elif kind == "wet":
        d.polygon(
            [
                (cx - hw + 4, cy - hh + 8),
                (cx - 20, cy - hh - 6),
                (cx + 8, cy - hh - 14),
                (cx + hw - 8, cy - hh),
                (cx + hw, cy - 10),
                (cx + 20, cy - hh + 20),
            ],
            fill=mix(color, COOL, 0.15),
            outline=LINE,
        )
        for xoff in (-22, -8, 6, 18):
            d.line([(cx + xoff, cy - hh + 4), (cx + xoff + 4, cy + 8)], fill=mix(COOL, WHITE, 0.3), width=2)
    elif kind == "grey_back":
        d.pieslice([cx - hw - 4, cy - hh - 16, cx + hw + 4, cy + 8], 180, 10, fill=mix(HAIR, PAPER, 0.55), outline=LINE)
    elif kind == "recede":
        d.pieslice([cx - hw - 2, cy - hh + 6, cx + hw + 2, cy + 6], 200, 340, fill=color, outline=LINE)
    elif kind == "hood":
        d.polygon(
            [
                (cx - hw - 28, cy + hh * 0.4),
                (cx - hw - 10, cy - hh - 8),
                (cx + hw + 10, cy - hh - 8),
                (cx + hw + 28, cy + hh * 0.4),
                (cx + hw + 8, cy + hh * 0.7),
                (cx - hw - 8, cy + hh * 0.7),
            ],
            fill=mix(NAVY, GREY, 0.35),
            outline=LINE,
        )


def arm(d, x0, y0, x1, y1, thick, skin, sleeve=None, sleeve_t=0.55):
    if sleeve:
        mx, my = lerp(x0, x1, sleeve_t), lerp(y0, y1, sleeve_t)
        d.line([(x0, y0), (mx, my)], fill=sleeve, width=thick)
        d.line([(mx, my), (x1, y1)], fill=skin, width=int(thick * 0.78))
    else:
        d.line([(x0, y0), (x1, y1)], fill=skin, width=thick)
    d.ellipse([x1 - 10, y1 - 10, x1 + 10, y1 + 12], fill=skin, outline=LINE, width=2)


def figure(w, h, spec):
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im, "RGBA")
    cx = w * 0.50 + spec.get("xoff", 0)
    feet = h - 18
    hh = spec.get("head_h", 52)
    fig_h = spec.get("fig_h", min(h * 0.90, 640))
    cy = feet - fig_h + hh + 8
    hw = spec.get("hw", 40)
    skin = spec.get("skin", SKIN)
    fill = spec["torso_fill"]
    d.ellipse([cx - 70, feet - 10, cx + 78, feet + 14], fill=(0, 0, 0, 70))
    waist = cy + hh + spec.get("torso", 118)
    hip_y = waist + 8
    legs = spec.get("legs", mix(NAVY, INK, 0.15))
    d.polygon([(cx - 36, hip_y), (cx - 8, hip_y), (cx - 14, feet - 4), (cx - 40, feet - 4)], fill=legs, outline=LINE)
    d.polygon([(cx + 8, hip_y), (cx + 36, hip_y), (cx + 42, feet - 4), (cx + 16, feet - 4)], fill=legs, outline=LINE)
    d.ellipse([cx - 46, feet - 12, cx - 8, feet + 6], fill=mix(INK, NAVY, 0.2), outline=LINE, width=2)
    d.ellipse([cx + 10, feet - 12, cx + 48, feet + 6], fill=mix(INK, NAVY, 0.2), outline=LINE, width=2)
    flare = spec.get("flare", 1.0)
    tw = spec.get("tw", 118)
    d.polygon(
        [
            (cx - tw * 0.42, cy + hh * 0.7),
            (cx + tw * 0.42, cy + hh * 0.7),
            (cx + tw * 0.55 * flare, waist),
            (cx - tw * 0.55 * flare, waist),
        ],
        fill=fill,
        outline=LINE,
    )
    if spec.get("collar") == "zhongshan":
        d.polygon(
            [
                (cx - 28, cy + hh * 0.55),
                (cx, cy + hh * 0.95),
                (cx + 28, cy + hh * 0.55),
                (cx + 22, cy + hh * 1.35),
                (cx - 22, cy + hh * 1.35),
            ],
            fill=mix(fill, INK, 0.1),
            outline=LINE,
        )
        for by in (cy + hh + 28, cy + hh + 52, cy + hh + 76):
            d.ellipse([cx - 5, by, cx + 5, by + 10], fill=PAPER, outline=LINE, width=1)
    if spec.get("stripe"):
        d.rectangle([cx - 50, cy + hh + 36, cx + 50, cy + hh + 48], fill=spec["stripe"])
    if spec.get("armband"):
        d.rectangle([cx + 40, cy + hh + 40, cx + 70, cy + hh + 62], fill=STAMP, outline=LINE, width=2)
    thick = spec.get("arm_w", 22)
    sleeve = spec.get("sleeve", fill)
    L = spec.get("armL", (cx - 70, cy + hh + 30, cx - 110, waist + 10))
    R = spec.get("armR", (cx + 70, cy + hh + 30, cx + 108, waist + 10))
    arm(d, *L, thick, skin, sleeve)
    arm(d, *R, thick, skin, sleeve)
    d.rectangle([cx - 12, cy + hh * 0.72, cx + 12, cy + hh + 18], fill=skin, outline=LINE, width=2)
    if spec.get("hair_behind"):
        draw_hair(d, cx, cy, hw, hh, spec["hair"], spec.get("hair_c", HAIR))
        draw_head(d, cx, cy, hw, hh, skin, spec.get("look", "front"), spec.get("age", 30))
    else:
        draw_head(d, cx, cy, hw, hh, skin, spec.get("look", "front"), spec.get("age", 30))
        draw_hair(d, cx, cy, hw, hh, spec["hair"], spec.get("hair_c", HAIR))
    light = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(light).ellipse([cx - hw + 6, cy - hh - 4, cx + 8, cy - 8], fill=(255, 250, 230, 28))
    return overlay(im, light), d, cx, cy, hw, hh, waist, feet


def char_wang():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        854,
        dict(
            torso_fill=mix(NAVY, OLIVE, 0.25),
            hair="short",
            age=36,
            look="right",
            stripe=mix(PAPER, LAMP, 0.25),
            legs=mix(NAVY, INK, 0.2),
            armL=(250, 300, 188, 520),
            armR=(470, 310, 560, 430),
            fig_h=620,
        ),
    )
    d.ellipse([150, 470, 230, 548], fill=mix(INK, NAVY, 0.1), outline=LINE, width=3)
    d.arc([158, 478, 222, 530], 200, 340, fill=mix(PAPER, COOL, 0.3), width=4)
    return im


def char_lin():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        900,
        dict(
            torso_fill=mix(PAPER, (180, 120, 140), 0.35),
            hair="bob",
            hair_c=mix(HAIR, GREY, 0.35),
            age=54,
            look="front",
            flare=1.15,
            tw=130,
            legs=mix((80, 70, 90), INK, 0.2),
            armL=(250, 330, 200, 560),
            armR=(470, 330, 560, 540),
            fig_h=660,
            hair_behind=True,
            skin=mix(SKIN, SKIN2, 0.2),
        ),
    )
    for i, (x, y) in enumerate(((cx - 24, cy + 90), (cx + 18, cy + 120), (cx - 8, cy + 150), (cx + 30, cy + 88))):
        d.ellipse([x, y, x + 16, y + 16], fill=mix(STAMP, PAPER, 0.3 if i % 2 == 0 else 0.6))
    d.polygon([(170, 540), (250, 540), (242, 640), (178, 640)], fill=mix(COOL, NAVY, 0.35), outline=LINE)
    d.arc([186, 520, 234, 560], 0, 180, fill=LINE, width=3)
    return im


def char_wet():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        954,
        dict(
            torso_fill=mix(WHITE, COOL, 0.2),
            hair="wet",
            age=38,
            look="front",
            sleeve=mix(WHITE, COOL, 0.2),
            legs=mix(NAVY, COOL, 0.15),
            armL=(250, 340, 190, 600),
            armR=(470, 340, 540, 580),
            fig_h=700,
            skin=mix(SKIN, COOL, 0.12),
        ),
    )
    drips = Image.new("RGBA", im.size, (0, 0, 0, 0))
    dd = ImageDraw.Draw(drips)
    for i, x in enumerate(range(int(cx - 50), int(cx + 56), 14)):
        dd.line([(x, cy + hh - 4), (x + 2, cy + hh + 40 + (i % 3) * 12)], fill=(180, 200, 210, 140), width=2)
    d.polygon([(520, 560), (600, 560), (590, 680), (528, 680)], fill=(230, 235, 238, 180), outline=LINE)
    return overlay(im, drips)


def char_bai():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        409,
        826,
        dict(
            torso_fill=WHITE,
            hair="long",
            hair_behind=True,
            age=24,
            look="left",
            flare=1.25,
            tw=90,
            hw=34,
            head_h=46,
            legs=WHITE,
            armL=(130, 300, 90, 470),
            armR=(280, 300, 330, 470),
            fig_h=640,
            skin=mix(SKIN, WHITE, 0.15),
        ),
    )
    d.line([(cx - 22, cy + hh * 0.7), (cx - 28, cy + hh + 24)], fill=WHITE, width=4)
    d.line([(cx + 22, cy + hh * 0.7), (cx + 28, cy + hh + 24)], fill=WHITE, width=4)
    rim = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(rim).arc([cx - hw - 6, cy - hh - 8, cx + hw + 2, cy + hh], 220, 40, fill=(*COOL, 90), width=4)
    return overlay(im, rim)


def char_old():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        640,
        927,
        dict(
            torso_fill=mix(NAVY, GREY, 0.15),
            hair="grey_back",
            age=72,
            look="right",
            collar="zhongshan",
            tw=124,
            armL=(220, 330, 160, 540),
            armR=(420, 330, 500, 540),
            fig_h=680,
            skin=mix(SKIN2, PAPER, 0.1),
            xoff=8,
        ),
    )
    for i in range(4):
        x = 250 + i * 8
        y = 500 + i * 3
        d.rounded_rectangle([x, y, x + 70, y + 100], 4, fill=mix(STAMP, (160, 30, 28), 0.2), outline=LINE, width=2)
        d.rectangle([x + 22, y + 36, x + 48, y + 62], fill=mix(PAPER, STAMP, 0.35))
    return im


def char_taxi():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        874,
        dict(
            torso_fill=mix(NAVY, (20, 24, 40), 0.1),
            hair="recede",
            age=48,
            look="front",
            sleeve=None,
            armL=(250, 320, 200, 520),
            armR=(470, 310, 560, 480),
            fig_h=640,
            skin=mix(SKIN2, STAMP, 0.08),
        ),
    )
    d.polygon(
        [(cx - 56, cy + hh * 0.8), (cx - 18, cy + hh + 10), (cx - 48, waist), (cx - 70, cy + hh + 40)],
        fill=mix(NAVY, GREY, 0.2),
        outline=LINE,
    )
    d.polygon(
        [(cx + 56, cy + hh * 0.8), (cx + 18, cy + hh + 10), (cx + 48, waist), (cx + 70, cy + hh + 40)],
        fill=mix(NAVY, GREY, 0.2),
        outline=LINE,
    )
    d.rectangle([cx - 22, cy + hh + 8, cx + 22, waist - 10], fill=mix(WHITE, PAPER, 0.1), outline=LINE, width=2)
    for i in range(5):
        x = cx - 20 + i * 10
        d.ellipse([x, cy + hh + 20, x + 10, cy + hh + 30], outline=mix(PAPER, STAMP, 0.5), width=2)
    d.rounded_rectangle([540, 430, 580, 530], 6, fill=mix(COOL, WHITE, 0.25), outline=LINE, width=2)
    d.rectangle([548, 460, 572, 500], fill=mix(COOL, NAVY, 0.2))
    return im


def char_wu():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        808,
        dict(
            torso_fill=mix(NAVY, INK, 0.05),
            hair="short",
            hair_c=mix(HAIR, PAPER, 0.25),
            age=42,
            look="left",
            armband=True,
            armL=(250, 290, 160, 420),
            armR=(470, 300, 580, 380),
            fig_h=600,
            tw=122,
        ),
    )
    d.rectangle([cx - 58, cy + hh * 0.85, cx - 28, cy + hh + 8], fill=mix(PAPER, STAMP, 0.2), outline=LINE, width=2)
    d.rectangle([cx + 28, cy + hh * 0.85, cx + 58, cy + hh + 8], fill=mix(PAPER, STAMP, 0.2), outline=LINE, width=2)
    d.rectangle([cx - 20, cy + hh + 28, cx + 20, cy + hh + 48], fill=mix(PAPER, STAMP, 0.45), outline=LINE, width=2)
    d.rounded_rectangle([120, 390, 210, 418], 6, fill=mix(INK, GREY, 0.3), outline=LINE, width=2)
    d.ellipse([108, 388, 128, 420], fill=mix(LAMP, PAPER, 0.4), outline=LINE, width=2)
    beam = Image.new("RGBA", im.size, (0, 0, 0, 0))
    ImageDraw.Draw(beam).polygon([(110, 392), (20, 300), (40, 500)], fill=(*PAPER, 40))
    return overlay(im, beam)


def char_zhou():
    im, d, cx, cy, hw, hh, waist, feet = figure(
        720,
        927,
        dict(
            torso_fill=mix(GREY, NAVY, 0.35),
            hair="hood",
            age=23,
            look="right",
            flare=1.2,
            tw=140,
            armL=(240, 340, 200, 520),
            armR=(490, 340, 430, 500),
            fig_h=680,
            legs=mix(NAVY, GREY, 0.2),
            skin=mix(SKIN, WHITE, 0.08),
        ),
    )
    d.polygon([(400, 500), (470, 500), (458, 590), (412, 590)], fill=WHITE, outline=LINE)
    d.rectangle([404, 512, 466, 528], fill=mix(STAMP, PAPER, 0.2))
    d.rectangle([408, 560, 462, 574], fill=mix(PAPER, STAMP, 0.15))
    d.polygon([(418, 508), (430, 470), (438, 508)], fill=mix(COOL, WHITE, 0.4))
    d.arc([cx + 20, cy, cx + 90, cy + 80], 270, 20, fill=WHITE, width=2)
    return im


def char_cat():
    w, h = 480, 502
    im = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(im, "RGBA")
    orange = mix(STAMP, PAPER, 0.25)
    stripe = mix(STAMP, INK, 0.25)
    white = mix(WHITE, PAPER, 0.15)
    cx, cy = int(w * 0.48), int(h * 0.58)
    d.ellipse([cx - 90, cy - 40, cx + 110, cy + 130], fill=orange, outline=LINE, width=3)
    d.ellipse([cx - 70, cy + 70, cx + 90, cy + 160], fill=orange, outline=LINE, width=3)
    d.ellipse([cx - 28, cy - 10, cx + 50, cy + 90], fill=white)
    hx, hy = int(w * 0.45), int(h * 0.30)
    d.ellipse([hx - 78, hy - 62, hx + 86, hy + 70], fill=orange, outline=LINE, width=3)
    d.polygon([(hx - 70, hy - 10), (hx - 78, hy - 78), (hx - 28, hy - 48)], fill=orange, outline=LINE)
    d.polygon([(hx + 36, hy - 48), (hx + 88, hy - 80), (hx + 78, hy - 8)], fill=orange, outline=LINE)
    d.polygon([(hx - 62, hy - 18), (hx - 68, hy - 62), (hx - 40, hy - 42)], fill=mix(STAMP, PAPER, 0.5))
    d.polygon([(hx + 44, hy - 42), (hx + 76, hy - 64), (hx + 70, hy - 16)], fill=mix(STAMP, PAPER, 0.5))
    for y in (hy - 20, hy + 8, cy + 20, cy + 60):
        d.arc([cx - 80, y, cx + 90, y + 40], 200, 340, fill=stripe, width=4)
    d.ellipse([hx - 30, hy + 8, hx + 40, hy + 58], fill=white)
    d.polygon([(hx, hy + 22), (hx - 8, hy + 34), (hx + 10, hy + 34)], fill=mix(STAMP, PAPER, 0.45))
    d.ellipse([hx - 36, hy - 8, hx - 10, hy + 12], fill=INK)
    d.ellipse([hx + 18, hy - 8, hx + 44, hy + 12], fill=INK)
    d.line([(hx - 38, hy - 14), (hx - 8, hy - 8)], fill=LINE, width=3)
    d.line([(hx + 16, hy - 8), (hx + 46, hy - 16)], fill=LINE, width=3)
    d.ellipse([hx - 4, hy + 38, hx + 12, hy + 48], fill=mix(STAMP, PAPER, 0.2))
    d.arc([hx - 18, hy + 50, hx + 4, hy + 66], 0, 160, fill=LINE, width=2)
    d.arc([hx + 4, hy + 50, hx + 26, hy + 66], 20, 180, fill=LINE, width=2)
    d.arc([cx + 60, cy + 40, cx + 170, cy + 150], 240, 80, fill=orange, width=18)
    d.ellipse([cx - 50, cy + 110, cx - 10, cy + 150], fill=white, outline=LINE, width=2)
    d.ellipse([cx + 20, cy + 110, cx + 60, cy + 150], fill=white, outline=LINE, width=2)
    return im


def save_jpeg(im, path):
    im.convert("RGB").save(path, "JPEG", quality=P["jpeg_quality"], optimize=True, subsampling=2)
    return path.read_bytes()


def save_webp(im, path):
    im.convert("RGBA").save(path, "WEBP", quality=P["webp_quality"], method=P["webp_method"], exact=True)
    return path.read_bytes()


def sha(b):
    return hashlib.sha256(b).hexdigest()


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    write_svg()
    jobs = [
        ("exterior", "jpeg", exterior),
        ("interior", "jpeg", interior),
        ("counter-fx", "webp", counter_fx),
        ("cat", "webp", char_cat),
        ("wang", "webp", char_wang),
        ("lin", "webp", char_lin),
        ("wet", "webp", char_wet),
        ("bai", "webp", char_bai),
        ("old", "webp", char_old),
        ("taxi", "webp", char_taxi),
        ("wu", "webp", char_wu),
        ("zhou", "webp", char_zhou),
    ]
    manifest = []
    for key, fmt, fn in jobs:
        im = fn()
        want = tuple(P["sizes"][key][:2])
        if im.size != want:
            raise SystemExit(f"{key} size {im.size} != {want}")
        path = OUT / f"{key}.{'jpg' if fmt == 'jpeg' else 'webp'}"
        data = save_jpeg(im, path) if fmt == "jpeg" else save_webp(im, path)
        rec = {
            "key": key,
            "file": path.name,
            "mime": "image/jpeg" if fmt == "jpeg" else "image/webp",
            "pixels": list(im.size),
            "bytes": len(data),
            "sha256": sha(data),
            "mode": im.mode,
        }
        manifest.append(rec)
        print(f"{key:12s} {im.size} {len(data):7d} {rec['sha256'][:16]}")
    (OUT / "asset-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    (ROOT / "asset-manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print("wrote", len(manifest), "assets")


if __name__ == "__main__":
    main()
