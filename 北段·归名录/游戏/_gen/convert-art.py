#!/usr/bin/env python3
"""Convert docs/art-v2/originals/*.png into 游戏/assets/*.webp at runtime sizes."""
from pathlib import Path
from PIL import Image

ROOT = Path("/Users/Zhuanz/Desktop/北段·归名录V2")
SRC = ROOT / "docs/art-v2/originals"
DST = ROOT / "游戏/assets"
SKIP = {"approved-concept.png"}

def size_for(name: str):
    n = name.lower()
    if n.startswith("v2-portrait") or n.startswith("portrait-") or n.startswith("v2-person") or n.startswith("v2-shenyan") or n.startswith("card-new02"):
        return 768, 960
    if n.startswith("v2-env") or n.startswith("v2-scene") or n.startswith("scene-"):
        return 1600, 900
    return 960, 720

def fit(im: Image.Image, w: int, h: int) -> Image.Image:
    im = im.convert("RGB")
    scale = max(w / im.width, h / im.height)
    nw, nh = max(1, int(im.width * scale)), max(1, int(im.height * scale))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    left, top = (nw - w) // 2, (nh - h) // 2
    return im.crop((left, top, left + w, top + h))

def main():
    DST.mkdir(parents=True, exist_ok=True)
    n = 0
    for p in sorted(SRC.glob("*.png")):
        if p.name in SKIP:
            continue
        w, h = size_for(p.stem)
        out = DST / (p.stem + ".webp")
        fit(Image.open(p), w, h).save(out, "WEBP", quality=82, method=4)
        n += 1
        print(f"{p.name} -> {out.name} {w}x{h} {out.stat().st_size}")
    print("converted", n)

if __name__ == "__main__":
    main()
