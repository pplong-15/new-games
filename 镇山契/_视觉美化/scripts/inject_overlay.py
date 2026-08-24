#!/usr/bin/env python3
from pathlib import Path

ROOT = Path("/Users/jianglong/Desktop/游戏美化/镇山契")
OVERLAY = (ROOT / "_视觉美化/overlay-20260823.css").read_text(encoding="utf-8")
MARKER = "ZHENSHAN_VISUAL_POLISH_20260823"
FILES = [
    ROOT / "中文版/相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html",
    ROOT / "英文版/相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html",
]

def inject(path: Path) -> None:
    text = path.read_text(encoding="utf-8")
    if MARKER in text:
        print("already injected", path.name, path.stat().st_size)
        return
    idx = text.find("</style>")
    if idx < 0:
        raise SystemExit(f"no </style> in {path}")
    path.write_text(text[:idx] + "\n" + OVERLAY + "\n" + text[idx:], encoding="utf-8")
    print("injected", path, path.stat().st_size)

if __name__ == "__main__":
    for f in FILES:
        inject(f)
