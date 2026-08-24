#!/usr/bin/env python3
"""同窗在线 7 张校园静帧：同一几何字典、离线 Pillow、无字无品牌。"""
from __future__ import annotations

import hashlib
import os

import numpy as np
from PIL import Image, ImageDraw, ImageEnhance, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.abspath(os.path.join(HERE, "..", ".."))
ZH = os.path.join(ROOT, "中文版", "工程", "assets")
EN = os.path.join(ROOT, "英文版", "工程", "assets")
SEED = 200704

CHAR = {
    "syz": dict(rx=0.78, skin=(198, 168, 138), hair=(28, 24, 22), shirt=(232, 226, 210),
                bangs="left", smile=0.08, pocket=False, crew=False, faceless=False),
    "cxb": dict(rx=0.94, skin=(206, 174, 142), hair=(32, 26, 22), shirt=(236, 222, 190),
                bangs="straight", smile=0.7, pocket=True, crew=False, faceless=False),
    "zt": dict(rx=0.82, skin=(204, 176, 150), hair=(22, 18, 16), shirt=(240, 232, 214),
               bangs="bob", smile=0.12, pocket=False, crew=True, faceless=False),
    "grey": dict(rx=0.80, skin=(106, 104, 100), hair=(90, 88, 84), shirt=(122, 122, 118),
                 bangs="none", smile=0, pocket=False, crew=False, faceless=True),
}


def ell(d, box, fill, outline=None, w=1):
    d.ellipse(box, fill=fill, outline=outline, width=w if outline else 0)


def mix(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def draw_person(im, cx, foot_y, head, key, smile=None, coat=None):
    c = CHAR[key]
    d = ImageDraw.Draw(im)
    scale = head
    rx = c["rx"] * head * 0.48
    ry = head * 0.50
    # 头心：脚底向上 3.2 头
    tall = 3.55 if c["faceless"] else 3.20
    cy = foot_y - tall * head + ry * 0.92
    sw = head * (1.52 if c["faceless"] else (1.86 if key == "cxb" else 1.68))
    neck_y = int(cy + ry * 0.85)
    hip_y = int(foot_y - head * 0.12)
    shirt = coat or c["shirt"]
    d.polygon(
        [
            (cx - sw * 0.20, neck_y),
            (cx - sw * 0.50, neck_y + head * 0.35),
            (cx - sw * 0.40, hip_y),
            (cx + sw * 0.40, hip_y),
            (cx + sw * 0.50, neck_y + head * 0.35),
            (cx + sw * 0.20, neck_y),
        ],
        fill=shirt,
    )
    pant = (88, 88, 84) if c["faceless"] else (36, 46, 78)
    d.rectangle([cx - sw * 0.26, hip_y - 2, cx - 3, foot_y], fill=pant)
    d.rectangle([cx + 3, hip_y - 2, cx + sw * 0.26, foot_y], fill=pant)
    if c["pocket"] and not c["faceless"]:
        px, py, pw = cx + sw * 0.10, neck_y + head * 0.55, head * 0.22
        d.rectangle([px, py, px + pw, py + pw * 0.85], outline=mix(shirt, (70, 60, 40), 0.4), width=max(1, int(head / 40)))
    # 发（脑后）
    ell(d, [cx - rx * 1.15, cy - ry * 1.22, cx + rx * 1.15, cy + ry * 0.25], c["hair"])
    if c["bangs"] == "bob":
        ell(d, [cx - rx * 1.28, cy - ry * 0.2, cx + rx * 1.28, cy + ry * 1.15], c["hair"])
    if c["bangs"] == "straight":
        ell(d, [cx - rx * 1.08, cy - ry * 1.25, cx + rx * 1.08, cy + ry * 0.05], c["hair"])
        d.rectangle([cx - rx * 0.95, cy - ry * 0.55, cx + rx * 0.95, cy - ry * 0.05], fill=c["hair"])
    if c["bangs"] == "left":
        d.polygon(
            [
                (cx - rx * 1.05, cy + ry * 0.1),
                (cx - rx * 0.9, cy - ry * 0.4),
                (cx - rx * 0.1, cy - ry * 1.05),
                (cx + rx * 0.25, cy - ry * 0.9),
                (cx - rx * 0.25, cy - ry * 0.05),
            ],
            fill=c["hair"],
        )
    # 脸
    outline = mix(c["skin"], (70, 55, 45), 0.35)
    ell(d, [cx - rx, cy - ry, cx + rx, cy + ry], c["skin"], outline, max(1, int(head / 36)))
    if c["bangs"] == "bob":
        # 下颌从发里露出
        ell(d, [cx - rx * 0.78, cy + ry * 0.05, cx + rx * 0.78, cy + ry * 1.05], c["skin"])
    if not c["faceless"]:
        ey = cy - ry * 0.06
        ew, eh, gap = rx * 0.18, ry * 0.09, rx * 0.40
        for s in (-1, 1):
            ex = cx + s * gap
            ell(d, [ex - ew, ey - eh, ex + ew, ey + eh], (248, 246, 240))
            ell(d, [ex - ew * 0.42, ey - eh * 0.7, ex + ew * 0.42, ey + eh * 0.7], (40, 34, 30))
            d.line([(ex - ew, ey - eh * 2.4), (ex + ew, ey - eh * 2.3)], fill=(42, 32, 28), width=max(1, int(head / 32)))
        d.line([(cx, cy), (cx, cy + ry * 0.22)], fill=mix(c["skin"], (90, 70, 55), 0.3), width=max(1, int(head / 40)))
        sm = c["smile"] if smile is None else smile
        my = cy + ry * 0.50
        mw = rx * (0.30 + 0.20 * sm)
        if sm > 0.45:
            d.arc([cx - mw, my - ry * 0.14, cx + mw, my + ry * 0.24], 12, 168, fill=(160, 90, 86), width=max(2, int(head / 28)))
        else:
            d.arc([cx - mw, my - ry * 0.02, cx + mw, my + ry * 0.14], 20, 160, fill=(150, 96, 90), width=max(1, int(head / 34)))
        if c["crew"]:
            d.arc([cx - head * 0.28, neck_y - 2, cx + head * 0.28, neck_y + head * 0.32], 10, 170, fill=mix(shirt, (40, 40, 40), 0.25), width=max(2, int(head / 30)))
        else:
            d.polygon([(cx, neck_y + head * 0.38), (cx - head * 0.16, neck_y), (cx + head * 0.16, neck_y)], fill=c["skin"])
    # 颈
    if not c["faceless"]:
        d.rectangle([cx - head * 0.10, int(cy + ry * 0.75), cx + head * 0.10, neck_y + 4], fill=c["skin"])


def extra(im, cx, foot_y, head, n):
    d = ImageDraw.Draw(im)
    skins = [(190, 160, 132), (210, 180, 150), (186, 154, 128)]
    hairs = [(20, 18, 16), (48, 32, 22), (30, 30, 34)]
    shirts = [(36, 52, 92), (40, 58, 98), (230, 226, 212)]
    skin, hair, shirt = skins[n % 3], hairs[n % 3], shirts[n % 3]
    rx, ry = head * 0.36, head * 0.48
    cy = foot_y - 3.2 * head + ry * 0.9
    d.polygon(
        [
            (cx - head * 0.78, foot_y - head * 2.65),
            (cx - head * 0.62, foot_y),
            (cx + head * 0.62, foot_y),
            (cx + head * 0.78, foot_y - head * 2.65),
            (cx + head * 0.28, foot_y - head * 3.0),
            (cx - head * 0.28, foot_y - head * 3.0),
        ],
        fill=shirt,
    )
    ell(d, [cx - rx * 1.15, cy - ry * 1.2, cx + rx * 1.15, cy + ry * 0.2], hair)
    if n % 3 == 0:
        ell(d, [cx - rx * 1.2, cy - ry * 0.1, cx + rx * 1.2, cy + ry * 1.0], hair)
    ell(d, [cx - rx, cy - ry, cx + rx, cy + ry], skin)
    ey = cy - ry * 0.08
    for s in (-1, 1):
        ex = cx + s * rx * 0.38
        ell(d, [ex - 4, ey - 3, ex + 4, ey + 3], (40, 32, 28))
        if n % 2 == 0:
            d.rectangle([ex - 7, ey - 5, ex + 7, ey + 5], outline=(48, 48, 52), width=1)
    d.arc([cx - rx * 0.3, cy + ry * 0.42, cx + rx * 0.3, cy + ry * 0.68], 20, 160, fill=(140, 90, 86), width=2)
    if shirt[2] > 90:
        d.line([(cx - head * 0.5, foot_y - head * 2.3), (cx - head * 0.5, foot_y - head * 0.5)], fill=(220, 222, 228), width=3)


def finish(im, warmth=1.08, sat=0.7, contrast=0.9, blur=0.7, grain=12, seed=SEED):
    im = im.convert("RGB")
    im = ImageEnhance.Color(im).enhance(sat)
    im = ImageEnhance.Contrast(im).enhance(contrast)
    r, g, b = im.split()
    r = ImageEnhance.Brightness(r).enhance(warmth)
    b = ImageEnhance.Brightness(b).enhance(0.93)
    im = Image.merge("RGB", (r, g, b)).filter(ImageFilter.GaussianBlur(blur))
    arr = np.asarray(im).astype(np.int16)
    noise = np.random.default_rng(seed).integers(-grain, grain + 1, arr.shape, dtype=np.int16)
    arr = np.clip(arr + noise, 0, 255).astype(np.uint8)
    h, w = arr.shape[:2]
    yy, xx = np.ogrid[:h, :w]
    vig = np.clip(1.12 - np.sqrt(((xx - w / 2) / (w * 0.78)) ** 2 + ((yy - h / 2.15) / (h * 0.78)) ** 2) * 0.32, 0.72, 1.0)
    arr = (arr.astype(np.float32) * vig[..., None]).clip(0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def save_both(name, im, q=78):
    os.makedirs(ZH, exist_ok=True)
    os.makedirs(EN, exist_ok=True)
    path = os.path.join(ZH, name)
    im.save(path, "JPEG", quality=q, optimize=True, subsampling=2)
    data = open(path, "rb").read()
    open(os.path.join(EN, name), "wb").write(data)
    print(f"{name:32s} {len(data):7d}  {im.size}  {hashlib.sha256(data).hexdigest()[:16]}")
    return len(data)


def avatar(key, bg):
    im = Image.new("RGB", (512, 512), bg)
    d = ImageDraw.Draw(im)
    for y in range(0, 512, 7):
        d.line([(0, y), (511, y)], fill=mix(bg, (255, 255, 255), 0.07), width=1)
    draw_person(im, 256, 505, 112, key)
    return finish(im, warmth=1.05, sat=0.66, blur=0.5, grain=10, seed=SEED + ord(key[0]))


def backdrop(kind):
    im = Image.new("RGB", (960, 640), (176, 164, 146))
    d = ImageDraw.Draw(im)
    if kind == "grad":
        d.rectangle([0, 0, 960, 355], fill=(174, 160, 136))
        d.rectangle([110, 70, 850, 355], fill=(166, 152, 126))
        d.rectangle([385, 135, 575, 355], fill=(46, 40, 36))
        d.rectangle([70, 60, 130, 355], fill=(148, 130, 106))
        d.rectangle([830, 60, 890, 355], fill=(148, 130, 106))
        d.rectangle([0, 355, 960, 640], fill=(152, 146, 134))
    elif kind == "paper":
        d.rectangle([0, 0, 960, 400], fill=(134, 80, 66))
        d.rectangle([0, 400, 960, 640], fill=(118, 110, 98))
        d.rectangle([405, 155, 555, 400], fill=(34, 28, 26))
        for ox in (70, 710):
            d.polygon(
                [
                    (ox, 392), (ox + 88, 302), (ox + 138, 312), (ox + 168, 248),
                    (ox + 198, 258), (ox + 158, 332), (ox + 218, 392),
                    (ox + 176, 392), (ox + 166, 432), (ox + 146, 432),
                    (ox + 136, 392), (ox + 88, 392), (ox + 78, 432), (ox + 58, 432),
                ],
                fill=(236, 230, 214),
            )
        for ox in (240, 610):
            ell(d, [ox, 138, ox + 92, 232], None, (196, 72, 64), 8)
            ell(d, [ox + 12, 150, ox + 80, 220], None, (210, 170, 70), 6)
    else:
        d.rectangle([0, 0, 960, 295], fill=(166, 174, 176))
        d.rectangle([0, 295, 960, 428], fill=(116, 136, 146))
        d.rectangle([0, 428, 960, 640], fill=(140, 130, 106))
        d.rectangle([36, 248, 924, 295], fill=(148, 156, 158))
        for i, x in enumerate((520, 608, 696, 784)):
            hh = 68 + (i % 3) * 16
            d.rectangle([x, 295 - hh, x + 68, 295], fill=(148, 146, 140))
        d.rectangle([610, 468, 960, 498], fill=(158, 156, 148))
    arr = np.asarray(im).astype(np.int16)
    arr = np.clip(arr + np.random.default_rng(SEED + 3).integers(-5, 6, arr.shape, dtype=np.int16), 0, 255).astype(np.uint8)
    return Image.fromarray(arr, "RGB")


def group_photo(kind):
    im = backdrop(kind)
    front_y, back_y = 602, 472
    hf, hb = 44, 40
    named = {( "back", 0.24): "syz", ("front", 0.46): "cxb", ("front", 0.60): "zt", ("back", 0.82): "grey"}
    n = 0
    for row, xs, fy, hh in (("back", [0.24, 0.38, 0.52, 0.66, 0.82], back_y, hb),
                            ("front", [0.18, 0.32, 0.46, 0.60, 0.74], front_y, hf)):
        for x in xs:
            cx = int(x * 960)
            key = named.get((row, x))
            if key:
                coat = None
                if kind == "grad" and key in ("syz", "zt"):
                    coat = (36, 52, 92)
                if kind == "paper" and key == "syz":
                    coat = (40, 58, 96)
                sm = 0.55 if key == "cxb" else None
                draw_person(im, cx, fy, hh, key, smile=sm, coat=coat)
            else:
                extra(im, cx, fy, hh, n)
                n += 1
    seed = SEED + {"grad": 1, "paper": 2, "spring": 3}[kind]
    return finish(im, warmth=1.1, sat=0.6, contrast=0.88, blur=0.85, grain=14, seed=seed)


def obituary():
    im = Image.new("RGB", (960, 640), (46, 44, 40))
    d = ImageDraw.Draw(im)
    d.rectangle([86, 42, 874, 598], fill=(212, 206, 190))
    d.rectangle([126, 74, 834, 556], fill=(198, 192, 178))
    port = Image.new("RGB", (520, 560), (42, 42, 40))
    draw_person(port, 260, 545, 120, "cxb", smile=0.04)
    port = ImageEnhance.Color(port).enhance(0.04)
    port = ImageEnhance.Contrast(port).enhance(1.08)
    crop = port.crop((80, 30, 440, 510)).resize((400, 460), Image.Resampling.BICUBIC)
    im.paste(crop, (280, 88))
    im = finish(im, warmth=1.0, sat=0.06, contrast=0.96, blur=0.45, grain=16, seed=SEED + 21)
    d = ImageDraw.Draw(im)
    d.line([(86, 322), (874, 330)], fill=(168, 162, 148), width=2)
    d.line([(520, 42), (508, 598)], fill=(178, 172, 158), width=1)
    return im


def main():
    total = 0
    total += save_both("img-avatar-syz.jpg", avatar("syz", (122, 148, 118)))
    total += save_both("img-avatar-cxb.jpg", avatar("cxb", (108, 136, 140)))
    total += save_both("img-avatar-zt.jpg", avatar("zt", (184, 174, 160)))
    total += save_both("img-album-grad2007.jpg", group_photo("grad"))
    total += save_both("img-album-paperhorse2009.jpg", group_photo("paper"))
    total += save_both("img-album-spring2010.jpg", group_photo("spring"))
    total += save_both("img-album-obituary.jpg", obituary())
    print("TOTAL_BYTES", total)


if __name__ == "__main__":
    main()
