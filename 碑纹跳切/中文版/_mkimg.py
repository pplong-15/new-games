# -*- coding: utf-8 -*-
"""Wordless unique JPEGs. No glyphs, no logos, no dates."""
from pathlib import Path
import random
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance

OUT = Path(__file__).resolve().parent / "img"


def noise(w, h, rng, base):
    im = Image.new("RGB", (w, h), base)
    px = im.load()
    for y in range(h):
        for x in range(w):
            j = rng.randint(-18, 18)
            r = max(0, min(255, base[0] + j + rng.randint(-6, 6)))
            g = max(0, min(255, base[1] + j + rng.randint(-6, 6)))
            b = max(0, min(255, base[2] + j + rng.randint(-8, 8)))
            px[x, y] = (r, g, b)
    return im


def smear_band(draw, rng, box, color, n=14):
    x0, y0, x1, y1 = box
    for _ in range(n):
        xa = rng.randint(x0, x1)
        ya = rng.randint(y0, y1)
        xb = xa + rng.randint(40, 160)
        yb = ya + rng.randint(-8, 8)
        draw.line((xa, ya, xb, yb), fill=color, width=rng.randint(2, 5))


def save(im, name, q=82):
    p = OUT / name
    im = ImageEnhance.Contrast(im).enhance(1.05)
    im.save(p, "JPEG", quality=q, optimize=True)
    print(p.name, p.stat().st_size)


def make_smear_now():
    rng = random.Random(11701)
    im = noise(920, 620, rng, (118, 112, 98))
    d = ImageDraw.Draw(im, "RGBA")
    # stele rectangle
    d.rounded_rectangle((210, 40, 710, 580), radius=8, outline=(70, 64, 52, 220), width=6)
    d.ellipse((330, 48, 590, 150), outline=(62, 56, 44, 200), width=5)
    # broken chi notch
    d.polygon([(360, 70), (400, 52), (430, 88), (390, 110)], fill=(90, 84, 70, 180))
    smear_band(d, rng, (300, 280, 640, 360), (200, 188, 160, 210), 22)
    smear_band(d, rng, (320, 300, 620, 340), (80, 72, 60, 160), 10)
    # red in new cut
    for _ in range(18):
        x = rng.randint(360, 560)
        y = rng.randint(300, 348)
        d.line((x, y, x + rng.randint(8, 28), y + rng.randint(-2, 2)), fill=(150, 32, 28, 190), width=2)
    im = im.filter(ImageFilter.SMOOTH)
    save(im, "smear-now.jpg", 80)


def make_smear_1986():
    rng = random.Random(19860)
    im = noise(880, 640, rng, (36, 34, 32))
    d = ImageDraw.Draw(im, "RGBA")
    # ink rubbing: pale raised
    for y in range(40, 600, 3):
        for x in range(180, 700, 4):
            if rng.random() < 0.08:
                im.putpixel((x, y), (210, 204, 190))
    d.rectangle((200, 50, 680, 600), outline=(220, 214, 200, 160), width=4)
    d.ellipse((310, 60, 570, 170), outline=(200, 194, 180, 140), width=3)
    smear_band(d, rng, (280, 300, 620, 380), (230, 224, 210, 200), 20)
    smear_band(d, rng, (300, 320, 600, 360), (48, 44, 40, 180), 8)
    # margin ink blot (no glyphs)
    d.ellipse((40, 520, 150, 590), fill=(18, 16, 14, 230))
    d.line((70, 540, 130, 575), fill=(12, 10, 8, 200), width=3)
    im = im.filter(ImageFilter.GaussianBlur(0.4))
    save(im, "smear-1986.jpg", 78)


def make_smear_close():
    rng = random.Random(33011)
    im = noise(800, 520, rng, (140, 132, 116))
    d = ImageDraw.Draw(im, "RGBA")
    for i in range(26):
        y = 180 + i * 6
        d.line((40, y + rng.randint(-4, 4), 760, y + rng.randint(-6, 6)), fill=(90, 82, 68, 90 + i), width=3)
    smear_band(d, rng, (80, 200, 720, 340), (210, 200, 170, 220), 30)
    for _ in range(12):
        x = rng.randint(200, 580)
        y = rng.randint(230, 300)
        d.arc((x, y, x + 40, y + 18), 0, 180, fill=(60, 52, 40, 160), width=2)
    im = im.filter(ImageFilter.SHARPEN)
    save(im, "smear-close.jpg", 83)


def make_chi_local():
    rng = random.Random(44117)
    im = noise(860, 560, rng, (102, 98, 88))
    d = ImageDraw.Draw(im, "RGBA")
    d.ellipse((180, 80, 680, 420), outline=(50, 46, 38, 220), width=8)
    d.arc((200, 100, 660, 400), 200, 40, fill=(40, 36, 30, 200), width=10)
    # missing left horn
    d.polygon([(220, 140), (300, 90), (280, 200)], fill=(78, 74, 64, 210))
    d.ellipse((360, 220, 500, 320), outline=(44, 40, 32, 180), width=5)
    for _ in range(40):
        x, y = rng.randint(200, 640), rng.randint(100, 400)
        d.point((x, y), fill=(60, 56, 48))
    save(im, "chi-local.jpg", 81)


def make_chi_neighbor():
    rng = random.Random(55208)
    im = noise(860, 560, rng, (88, 92, 96))
    d = ImageDraw.Draw(im, "RGBA")
    d.ellipse((160, 70, 700, 440), outline=(30, 40, 52, 220), width=7)
    d.arc((190, 100, 670, 410), 190, 50, fill=(24, 34, 46, 200), width=9)
    # horn intact-ish, different break
    d.polygon([(620, 120), (690, 80), (660, 190)], fill=(70, 78, 86, 200))
    d.ellipse((340, 210, 500, 330), outline=(28, 36, 48, 180), width=4)
    im = ImageEnhance.Color(im).enhance(0.7)
    save(im, "chi-neighbor.jpg", 79)


def make_red():
    rng = random.Random(66319)
    im = noise(840, 540, rng, (128, 110, 96))
    d = ImageDraw.Draw(im, "RGBA")
    for i in range(16):
        y = 160 + i * 12
        d.line((120, y, 720, y + rng.randint(-3, 3)), fill=(70, 58, 48, 100), width=4)
        d.line((140, y + 3, 700, y + 2), fill=(160, 36, 30, 170), width=2)
    smear_band(d, rng, (160, 200, 680, 360), (180, 40, 32, 140), 16)
    save(im, "red-trace.jpg", 84)


def make_margin():
    rng = random.Random(77420)
    im = noise(720, 480, rng, (214, 206, 188))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle((0, 0, 90, 480), fill=(198, 188, 168, 255))
    d.ellipse((28, 340, 120, 430), fill=(22, 18, 14, 230))
    d.line((44, 360, 108, 410), fill=(12, 10, 8, 220), width=4)
    d.line((50, 400, 96, 368), fill=(16, 14, 12, 200), width=2)
    for _ in range(30):
        x, y = rng.randint(200, 680), rng.randint(40, 440)
        d.ellipse((x, y, x + rng.randint(2, 6), y + rng.randint(2, 6)), fill=(180, 170, 150, 80))
    save(im, "margin-ink.jpg", 85)


def make_zhi():
    rng = random.Random(88521)
    im = noise(800, 560, rng, (86, 80, 70))
    d = ImageDraw.Draw(im, "RGBA")
    d.rectangle((140, 60, 660, 500), outline=(40, 36, 28, 220), width=5)
    # buried stone speckles, no grid of glyphs
    for _ in range(220):
        x, y = rng.randint(160, 640), rng.randint(80, 480)
        c = rng.randint(50, 90)
        d.ellipse((x, y, x + 3, y + 2), fill=(c, c - 6, c - 12, 160))
    d.arc((200, 180, 600, 380), 10, 200, fill=(48, 42, 34, 140), width=6)
    im = im.filter(ImageFilter.SMOOTH_MORE)
    save(im, "zhi-stone.jpg", 77)


def make_desk():
    rng = random.Random(99632)
    im = noise(1100, 360, rng, (28, 26, 24))
    d = ImageDraw.Draw(im, "RGBA")
    d.ellipse((720, -40, 980, 180), fill=(210, 170, 90, 40))
    d.rectangle((80, 160, 640, 340), fill=(48, 42, 34, 180))
    d.rectangle((120, 190, 520, 320), fill=(190, 182, 164, 200))
    smear_band(d, rng, (180, 220, 480, 280), (80, 70, 58, 120), 8)
    d.rectangle((700, 200, 980, 340), fill=(36, 40, 44, 200))
    save(im, "desk-lamp.jpg", 80)


def main():
    OUT.mkdir(exist_ok=True)
    make_smear_now()
    make_smear_1986()
    make_smear_close()
    make_chi_local()
    make_chi_neighbor()
    make_red()
    make_margin()
    make_zhi()
    make_desk()


if __name__ == "__main__":
    main()
