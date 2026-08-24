#!/usr/bin/env python3
"""Offline: flatten cinematic stills to county-scan / archive-lightbox material."""
from __future__ import annotations

import os
import shutil

import numpy as np
from PIL import Image, ImageFilter

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
ZH_IMG = os.path.join(ROOT, "中文版", "img")
EN_IMG = os.path.join(ROOT, "英文版", "img")
BACKUP = os.path.join(ROOT, "_视觉美化", "stills-before")
NAMES = [
    "drawer.jpg",
    "paper.jpg",
    "cabinet.jpg",
    "badge.jpg",
    "brick.jpg",
    "ink.jpg",
    "seal.jpg",
    "slope.jpg",
    "window.jpg",
]


def flatten(im: Image.Image, seed: int, name: str) -> Image.Image:
    im = im.convert("RGB")
    w, h = im.size
    max_w = 960
    if w > max_w:
        nh = max(1, int(round(h * max_w / w)))
        im = im.resize((max_w, nh), Image.Resampling.LANCZOS)
    arr = np.asarray(im).astype(np.float32)
    if name == "paper.jpg":
        blur = np.asarray(im.filter(ImageFilter.GaussianBlur(radius=3))).astype(np.float32)
        mixed = arr * 0.72 + blur * 0.28
        mixed = mixed * 0.88 + 28.0
        gray = mixed.mean(axis=2, keepdims=True)
        mixed = gray * 0.42 + mixed * 0.58
    else:
        blur = np.asarray(im.filter(ImageFilter.GaussianBlur(radius=10))).astype(np.float32)
        mixed = arr * 0.36 + blur * 0.64
        mixed = mixed * 0.68 + 78.0
        gray = mixed.mean(axis=2, keepdims=True)
        mixed = gray * 0.78 + mixed * 0.22
        col = mixed.mean(axis=0, keepdims=True)
        mixed = mixed - 0.62 * (col - mixed.mean())
    mixed[:, :, 0] = mixed[:, :, 0] * 0.97 + 12
    mixed[:, :, 1] = mixed[:, :, 1] * 0.99 + 14
    mixed[:, :, 2] = mixed[:, :, 2] * 0.94 + 10
    top = np.linspace(18.0, -4.0, mixed.shape[0], dtype=np.float32)[:, None, None]
    mixed = mixed + top
    mixed = np.clip(mixed, 0, 255)
    for i in range(0, mixed.shape[0], 3):
        mixed[i] *= 0.985
    rng = np.random.default_rng(seed)
    noise = rng.normal(0, 2.8, mixed.shape)
    mixed = np.clip(mixed + noise, 0, 255)
    return Image.fromarray(mixed.astype(np.uint8))


def main():
    os.makedirs(BACKUP, exist_ok=True)
    for name in NAMES:
        src = os.path.join(ZH_IMG, name)
        bak = os.path.join(BACKUP, name)
        if not os.path.exists(bak):
            shutil.copy2(src, bak)
        im = Image.open(bak)
        seed = 2010 + sum(ord(c) for c in name)
        out = flatten(im, seed, name)
        dest_zh = os.path.join(ZH_IMG, name)
        dest_en = os.path.join(EN_IMG, name)
        out.save(dest_zh, "JPEG", quality=70, optimize=True, progressive=True, subsampling=2)
        shutil.copy2(dest_zh, dest_en)
        print(
            f"{name}\t{im.size}->{out.size}\t"
            f"{os.path.getsize(bak)}->{os.path.getsize(dest_zh)}"
        )


if __name__ == "__main__":
    main()
