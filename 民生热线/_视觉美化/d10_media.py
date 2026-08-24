#!/usr/bin/env python3
"""D10: migrate unused assets/base to ref; recompress 280 stills. Never touch clips.js."""
from __future__ import annotations

import hashlib
import json
import shutil
from io import BytesIO
from pathlib import Path

from PIL import Image

GAME = Path("/Users/jianglong/Desktop/游戏美化/民生热线")
REF = Path("/Users/jianglong/Desktop/游戏美化/_视觉美化工作/ref/民生热线-base")
ZH = GAME / "中文版"
EN = GAME / "英文版"
BUDGET = 8 * 1024 * 1024
EVID = GAME / "_视觉美化"


def sha256(p: Path) -> str:
    h = hashlib.sha256()
    with p.open("rb") as f:
        for chunk in iter(lambda: f.read(1 << 16), b""):
            h.update(chunk)
    return h.hexdigest()


def file_list(d: Path) -> list[Path]:
    return sorted(p for p in d.rglob("*") if p.is_file() and p.name != ".DS_Store")


def copy_tree(src: Path, dst: Path) -> None:
    dst.mkdir(parents=True, exist_ok=True)
    for p in file_list(src):
        q = dst / p.relative_to(src)
        q.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(p, q)


def clips_meta(js: Path) -> dict:
    raw = js.read_text(encoding="utf-8")
    arr = json.loads(raw.split("=", 1)[1].strip().rstrip(";"))
    ids = [c["id"] for c in arr]
    imgs = [c["img"] for c in arr]
    tok = [c["id"] for c in arr if c.get("tokens")]
    return {
        "n": len(arr),
        "ids": ids,
        "id_set": set(ids),
        "imgs": imgs,
        "token_ids": tok,
        "sha256": hashlib.sha256(raw.encode("utf-8")).hexdigest(),
        "bytes": js.stat().st_size,
    }


def recompress_dir(src_dir: Path, quality: int, width: int) -> dict[str, bytes]:
    out: dict[str, bytes] = {}
    for p in sorted(src_dir.glob("*.jpg")):
        im = Image.open(p).convert("RGB")
        w, h = im.size
        if w > width:
            nh = max(1, round(h * width / w))
            im = im.resize((width, nh), Image.Resampling.LANCZOS)
        buf = BytesIO()
        im.save(buf, "JPEG", quality=quality, optimize=True, progressive=True, subsampling=2)
        out[p.name] = buf.getvalue()
    return out


def media_bytes(lang: Path) -> int:
    n = 0
    assets = lang / "assets"
    if not assets.exists():
        return 0
    for p in assets.rglob("*"):
        if p.is_file() and p.suffix.lower() in {
            ".jpg", ".jpeg", ".png", ".webp", ".gif", ".mp3", ".mp4", ".ogg", ".wav",
        }:
            n += p.stat().st_size
    return n


def main() -> None:
    EVID.mkdir(parents=True, exist_ok=True)
    zh_clips_before = clips_meta(ZH / "js" / "clips.js")
    en_clips_before = clips_meta(EN / "js" / "clips.js")
    assert zh_clips_before["n"] == 280
    assert en_clips_before["n"] == 280
    assert zh_clips_before["id_set"] == en_clips_before["id_set"]
    assert zh_clips_before["token_ids"] == en_clips_before["token_ids"]
    assert zh_clips_before["token_ids"]

    zh_base = ZH / "assets" / "base"
    en_base = EN / "assets" / "base"
    zh_stills = ZH / "assets" / "stills"
    en_stills = EN / "assets" / "stills"
    assert zh_base.is_dir() and en_base.is_dir()
    zh_base_files = file_list(zh_base)
    en_base_files = file_list(en_base)
    assert len(zh_base_files) == 16
    assert {p.name for p in zh_base_files} == {p.name for p in en_base_files}
    zh_hashes = {p.name: sha256(p) for p in zh_base_files}
    en_hashes = {p.name: sha256(p) for p in en_base_files}
    assert zh_hashes == en_hashes, "CN/EN base hashes differ"

    copy_tree(zh_base, REF / "中文版" / "assets" / "base")
    copy_tree(en_base, REF / "英文版" / "assets" / "base")
    sha_lines = []
    for lang in ("中文版", "英文版"):
        for p in file_list(REF / lang / "assets" / "base"):
            sha_lines.append(f"{sha256(p)}  {lang}/assets/base/{p.name}")
    REF.mkdir(parents=True, exist_ok=True)
    (REF / "SHA256.txt").write_text("\n".join(sha_lines) + "\n", encoding="utf-8")
    (REF / "SOURCE.txt").write_text(
        "Migrated unused runtime-zero assets/base from 民生热线 中文版+英文版.\n"
        "Hashes matched 1:1 before copy.\n"
        f"Origin: {GAME}\n",
        encoding="utf-8",
    )
    (REF / "RESTORE.md").write_text(
        "# Restore assets/base into player language folders\n\n"
        "These trees were moved out of the player package before visual polish. Not a deletion.\n\n"
        "## Check\n\n"
        "16 JPG names and SHA-256 are in `SHA256.txt`. This pass matched byte-for-byte across languages.\n\n"
        "## Restore\n\n"
        "```bash\n"
        "REF=\"/Users/jianglong/Desktop/游戏美化/_视觉美化工作/ref/民生热线-base\"\n"
        "GAME=\"/Users/jianglong/Desktop/游戏美化/民生热线\"\n"
        "mkdir -p \"$GAME/中文版/assets\" \"$GAME/英文版/assets\"\n"
        "cp -R \"$REF/中文版/assets/base\" \"$GAME/中文版/assets/base\"\n"
        "cp -R \"$REF/英文版/assets/base\" \"$GAME/英文版/assets/base\"\n"
        "```\n\n"
        "Do not count this `ref/` tree as player media.\n"
        "Stills `assets/stills/` were never moved.\n",
        encoding="utf-8",
    )
    for name, h in zh_hashes.items():
        assert sha256(REF / "中文版" / "assets" / "base" / name) == h
        assert sha256(REF / "英文版" / "assets" / "base" / name) == h
    shutil.rmtree(zh_base)
    shutil.rmtree(en_base)

    still_names_zh = sorted(p.name for p in zh_stills.glob("*.jpg"))
    still_names_en = sorted(p.name for p in en_stills.glob("*.jpg"))
    assert still_names_zh == still_names_en
    assert len(still_names_zh) == 280
    zh_img_names = sorted(Path(i).name for i in zh_clips_before["imgs"])
    assert zh_img_names == still_names_zh
    token_files = [f"{i}.jpg" for i in zh_clips_before["token_ids"]]
    for fn in token_files:
        assert (zh_stills / fn).exists()

    chosen = None
    for width, qmin in ((480, 38), (480, 32), (400, 32)):
        lo, hi = qmin, 72
        best = None
        while lo <= hi:
            q = (lo + hi) // 2
            blobs = recompress_dir(zh_stills, q, width)
            total = sum(len(v) for v in blobs.values())
            print(f"try width={width} q={q} stills={total} ({total / 1048576:.3f} MiB)")
            if total <= BUDGET:
                best = (width, q, blobs, total)
                lo = q + 1
            else:
                hi = q - 1
        if best:
            chosen = best
            break
    if not chosen:
        raise SystemExit("HOLD: stills cannot fit 8MB without deleting clips")

    width, q, blobs, total = chosen
    for name, data in blobs.items():
        (zh_stills / name).write_bytes(data)
        (en_stills / name).write_bytes(data)

    zh_clips_after = clips_meta(ZH / "js" / "clips.js")
    en_clips_after = clips_meta(EN / "js" / "clips.js")
    assert zh_clips_after["sha256"] == zh_clips_before["sha256"]
    assert en_clips_after["sha256"] == en_clips_before["sha256"]
    assert zh_clips_after["ids"] == zh_clips_before["ids"]
    assert en_clips_after["ids"] == en_clips_before["ids"]
    assert sorted(p.name for p in zh_stills.glob("*.jpg")) == still_names_zh
    assert all((zh_stills / f).exists() for f in token_files)

    zh_media = media_bytes(ZH)
    en_media = media_bytes(EN)
    report = {
        "base_migrated": True,
        "base_files": 16,
        "base_hashes_matched": True,
        "stills": 280,
        "recompress_width": width,
        "recompress_quality": q,
        "zh_stills_bytes": sum(p.stat().st_size for p in zh_stills.glob("*.jpg")),
        "en_stills_bytes": sum(p.stat().st_size for p in en_stills.glob("*.jpg")),
        "zh_player_media": zh_media,
        "en_player_media": en_media,
        "budget": BUDGET,
        "zh_ok": zh_media <= BUDGET,
        "en_ok": en_media <= BUDGET,
        "zh_clips_js_sha256": zh_clips_after["sha256"],
        "en_clips_js_sha256": en_clips_after["sha256"],
        "token_clip_ids": zh_clips_before["token_ids"],
        "clip_id_unchanged": True,
        "stills_zh_en_identical": True,
    }
    (EVID / "d10-measure.json").write_text(
        json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(json.dumps(report, ensure_ascii=False, indent=2))
    if not (report["zh_ok"] and report["en_ok"]):
        raise SystemExit("HOLD: player media still over 8MB")


if __name__ == "__main__":
    main()
