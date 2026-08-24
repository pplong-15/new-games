#!/usr/bin/env python3
"""Connect CN/EN hubs and generate decomposed copies. Originals are never written."""

from __future__ import annotations

import base64
import hashlib
import json
import os
import re
import shutil
import sys
from pathlib import Path
from urllib.parse import unquote_to_bytes

SKIP_TOP = {"_拆解工具", "_管理文件", "_视觉美化工作", "视觉美化工作"}
SKIP_COPY_DIRS = {
    "playtest-evidence",
    "visual",
    "_视觉美化",
    "__pycache__",
    "node_modules",
    ".git",
    "tools",
    "qa",
}
SKIP_COPY_FILES = {".DS_Store", "gen-pages.js", "generate.py"}

ENGINE_JS = {
    "engine.js",
    "keyword-search.js",
    "login.js",
    "game-core.js",
    "app.js",
}
CONTENT_JS = {
    "data.js",
    "tokens.js",
    "clips.js",
    "keywords.js",
    "pages-a.js",
    "pages-b.js",
    "state.js",
    "seen.js",
    "world-content.js",
    "register.js",
    "patrol.js",
    "phone.js",
    "sanmen.js",
    "beiwen.js",
    "ending.js",
}

MIME_EXT = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
    "image/gif": "gif",
    "image/svg+xml": "svg",
    "audio/mpeg": "mp3",
    "audio/mp4": "m4a",
    "audio/wav": "wav",
    "audio/ogg": "ogg",
    "audio/webm": "webm",
    "font/woff2": "woff2",
    "font/woff": "woff",
    "font/ttf": "ttf",
    "font/otf": "otf",
    "application/font-woff2": "woff2",
    "application/font-woff": "woff",
}

STYLE_RE = re.compile(r"<style(\s[^>]*)?>(.*?)</style>", re.I | re.S)
SCRIPT_RE = re.compile(r"<script(\s[^>]*)?>(.*?)</script>", re.I | re.S)
TITLE_RE = re.compile(r"<title>(.*?)</title>", re.I | re.S)


def html_title(path: Path | None, fallback: str) -> str:
    if not path or not path.is_file():
        return fallback
    text = path.read_text(encoding="utf-8", errors="replace")
    m = TITLE_RE.search(text)
    if not m:
        return fallback
    return re.sub(r"\s+", " ", m.group(1)).strip() or fallback


def find_entry(lang_dir: Path, game: str) -> str | None:
    if not lang_dir.is_dir():
        return None
    for rel in (
        "introduction.html",
        "index.html",
        f"{game}.html",
        "工程/index.html",
        "上线版/index.html",
    ):
        if (lang_dir / rel).is_file():
            return rel
    htmls = [
        p
        for p in lang_dir.rglob("*.html")
        if p.is_file()
        and "playtest-evidence" not in p.parts
        and "_视觉美化" not in p.parts
        and "核对" not in p.name
    ]
    if not htmls:
        return None
    htmls.sort(key=lambda p: p.stat().st_size, reverse=True)
    return str(htmls[0].relative_to(lang_dir)).replace("\\", "/")


def hub_html(
    game: str,
    zh_title: str,
    en_title: str,
    zh_href: str | None,
    en_href: str | None,
    note_href: str | None = None,
) -> str:
    zh_card = (
        f'<a class="card" href="{zh_href}"><strong>中文版</strong><span>{zh_title}</span></a>'
        if zh_href
        else '<div class="card missing"><strong>中文版</strong><span>本目录尚未入库</span></div>'
    )
    en_card = (
        f'<a class="card" href="{en_href}"><strong>English</strong><span>{en_title}</span></a>'
        if en_href
        else '<div class="card missing"><strong>English</strong><span>Not in this folder yet</span></div>'
    )
    return f"""<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{game}</title>
  <style>
    :root {{ color-scheme: light; --ink:#1f211d; --muted:#64675f; --paper:#f4f0e6; --line:#c9c3b4; --navy:#24343c; }}
    * {{ box-sizing: border-box; }}
    body {{ margin:0; min-height:100vh; font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Noto Sans SC",sans-serif; background:var(--paper); color:var(--ink); }}
    main {{ max-width:720px; margin:0 auto; padding:48px 20px; }}
    h1 {{ font-size:1.4rem; margin:0 0 8px; }}
    p {{ color:var(--muted); margin:0 0 28px; line-height:1.6; }}
    .row {{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }}
    @media (max-width:560px) {{ .row {{ grid-template-columns:1fr; }} }}
    .card {{ display:block; padding:22px 18px; border:1px solid var(--line); background:#fff; text-decoration:none; color:inherit; min-height:44px; }}
    .card strong {{ display:block; font-size:1.05rem; margin-bottom:8px; color:var(--navy); }}
    .card span {{ display:block; color:var(--muted); font-size:.92rem; line-height:1.45; }}
    .card:hover {{ outline:2px solid var(--navy); }}
    .missing {{ opacity:.65; }}
    .note {{ margin-top:28px; font-size:.92rem; }}
    .note a {{ color:var(--navy); }}
  </style>
</head>
<body>
  <main>
    <h1>{game}</h1>
    <p>中文版与英文版已接入本目录。点选语言进入游戏。存档按语种隔离，互不影响。</p>
    <div class="row">
      {zh_card}
      {en_card}
    </div>
    {f'<p class="note"><a href="{note_href}">拆解版</a>：模块化副本，供 Agent 改故事；不替代上方原版。</p>' if note_href else ""}
  </main>
</body>
</html>
"""


def parse_script_attrs(attr: str) -> dict[str, str]:
    out: dict[str, str] = {}
    for m in re.finditer(r'([:@\w-]+)(?:\s*=\s*(".*?"|\'.*?\'|[^\s>]+))?', attr or "", re.I):
        key = m.group(1).lower()
        val = m.group(2) or ""
        if val.startswith(("\"", "'")):
            val = val[1:-1]
        out[key] = val
    return out


def classify_script(body: str, index: int, total: int) -> str:
    head = body[:1600]
    if "inlined: world-content.js" in body or ("WorldContent" in head and "createWorldContent" in head):
        return "world-content.js"
    if "inlined: game-core.js" in body or "attachGameCore" in head:
        return "game-core.js"
    if "inlined: app.js" in body or "startV10Application" in head:
        return "app.js"
    if re.search(r"\bconst SFX\b", head):
        return "game-core.js"
    if re.search(r"\bconst ITEMS\b", head):
        return "world-content.js"
    if total == 3:
        return ["game-core.js", "world-content.js", "app.js"][index]
    if total == 2:
        return ["world-content.js", "app.js"][index]
    if total == 1:
        return "app.js"
    return f"script-{index + 1}.js"


def split_data_and_app(body: str) -> tuple[str, str] | None:
    for marker in ("/* ========== STATE ========== */", "\nfunction createState("):
        i = body.find(marker)
        if i > 200:
            return body[:i].rstrip() + "\n", body[i:].lstrip() + ("\n" if not body[i:].endswith("\n") else "")
    data_at = body.find("/* ========== DATA ========== */")
    if data_at >= 0:
        m = re.search(r"\nfunction\s+\w+", body[data_at:])
        if m and m.start() > 200:
            cut = data_at + m.start()
            return body[:cut].rstrip() + "\n", body[cut:].lstrip() + "\n"
    return None


def classify_js_file(name: str) -> str:
    low = name.lower()
    if low in ENGINE_JS:
        return "engine"
    if low in CONTENT_JS:
        return "content"
    if any(k in low for k in ("engine", "core", "search", "login")):
        return "engine"
    if any(k in low for k in ("data", "token", "clip", "keyword", "page", "content", "world", "state", "seen")):
        return "content"
    return "engine"


def extract_data_uris(text: str, assets_dir: Path) -> tuple[str, int]:
    assets_dir.mkdir(parents=True, exist_ok=True)
    written: dict[str, str] = {}
    count = 0
    out: list[str] = []
    i = 0
    while True:
        j = text.find("data:", i)
        if j < 0:
            out.append(text[i:])
            break
        out.append(text[i:j])
        rest = text[j + 5 :]
        mime_m = re.match(r"([a-zA-Z0-9.+/-]+)", rest)
        if not mime_m:
            out.append("data:")
            i = j + 5
            continue
        mime = mime_m.group(1).lower()
        k = 5 + mime_m.end()
        chunk = text[j + k :]
        is_b64 = False
        while chunk.startswith(";"):
            sm = re.match(r";([^,;]+)", chunk)
            if not sm:
                break
            token = sm.group(1).strip().lower()
            if token == "base64":
                is_b64 = True
            k += sm.end()
            chunk = text[j + k :]
        if not chunk.startswith(","):
            out.append(text[j : j + k])
            i = j + k
            continue
        k += 1
        payload = text[j + k :]
        mpay = re.match(r"([A-Za-z0-9+/=\s%._~-]+)", payload)
        if not mpay:
            out.append(text[j : j + k])
            i = j + k
            continue
        raw = mpay.group(1).rstrip()
        used = len(raw)
        data_blob = raw.replace("\n", "").replace("\r", "").replace(" ", "")
        if len(data_blob) < 200:
            out.append(text[j : j + k + used])
            i = j + k + used
            continue
        ext = MIME_EXT.get(mime, "bin")
        try:
            if is_b64:
                pad = "=" * ((4 - len(data_blob) % 4) % 4)
                blob = base64.b64decode(data_blob + pad)
            else:
                blob = unquote_to_bytes(data_blob)
        except Exception:
            out.append(text[j : j + k + used])
            i = j + k + used
            continue
        digest = hashlib.sha256(blob).hexdigest()[:12]
        rel = written.get(digest)
        if not rel:
            count += 1
            name = f"{ext}-{count:03d}-{digest}.{ext}"
            (assets_dir / name).write_bytes(blob)
            rel = "assets/" + name
            written[digest] = rel
        out.append(rel)
        i = j + k + used
    return "".join(out), count


def leftover_data_uri_count(root: Path) -> int:
    n = 0
    for p in [root / "index.html", root / "style.css", *root.glob("*.js")]:
        if p.is_file():
            n += len(re.findall(r"data:(?:image|audio|font)/", p.read_text(encoding="utf-8", errors="replace")))
    return n


def write_manifest(
    dest: Path,
    game: str,
    locale: str,
    title: str,
    mode: str,
    entry: str,
    js_files: list[tuple[str, str, int]],
    theme: list[str],
    extra: dict | None = None,
) -> None:
    files = {"engine": [], "content": [], "theme": [], "app": [], "assets": []}
    if mode == "multi-page-modular":
        for p in sorted(dest.rglob("*")):
            if not p.is_file():
                continue
            rel = str(p.relative_to(dest)).replace("\\", "/")
            if rel in {"manifest.json", "README.md"}:
                continue
            suf = p.suffix.lower()
            if suf in {".html", ".md"}:
                files["content"].append({"path": rel, "writable": True})
            elif suf == ".css":
                files["theme"].append({"path": rel, "writable": True})
            elif suf == ".js":
                role = classify_js_file(p.name)
                files[role].append({"path": rel, "writable": role == "content"})
            elif suf in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".woff2", ".mp3", ".m4a"}:
                files["assets"].append({"path": rel, "writable": False})
    else:
        for name, role, lines in js_files:
            files[role if role in files else "engine"].append(
                {"path": name, "writable": role in {"content", "theme"}, "lines": lines}
            )
        for css in theme:
            files["theme"].append({"path": css, "writable": True})
        if (dest / "assets").exists():
            files["assets"].append({"path": "assets/", "writable": False})
    manifest = {
        "id": f"{game}-{locale}",
        "title": title,
        "game": game,
        "locale": locale,
        "entry": entry,
        "mode": mode,
        "boundary": {
            "engine": "readonly — do not edit game logic",
            "content": "writable — names, dialogue, files, clues, page copy",
            "theme": "writable — colors and fonts only",
            "assets": "readonly",
        },
        "files": files,
        "extra": extra or {},
    }
    (dest / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def write_readme(dest: Path, game: str, locale: str, kind: str) -> None:
    if kind == "single":
        body = f"""# {game}（{locale}）拆解版

从单文件 HTML 拆出的模块版，供 Agent 改故事。原版未被修改。

## 先读

1. `manifest.json` — 可改 / 只读边界
2. `world-content.js` — 人名、对白、物品、关卡文本（可改）
3. `style.css` — 配色与字体（可改）
4. `game-core.js` / `app.js` — 引擎与界面（只读）
5. `assets/` — 图片音频字体（只读）

用本地 http 打开 `index.html`。不要改引擎判定和存档键，不要写回原版目录。
"""
    else:
        body = f"""# {game}（{locale}）拆解版

多页游戏的模块副本，供 Agent 改故事。原版 `中文版/` `英文版/` 未被修改。

## 先读

1. `manifest.json` — 可改 / 只读边界
2. 各页 `.html` 与内容 `js` — 文案、线索、档案（可改）
3. `css/` — 配色与字体（可改）
4. 引擎脚本 — 只读

用本地 http 打开入口页（见 manifest `entry`）。不要改引擎判定和存档键。
"""
    (dest / "README.md").write_text(body, encoding="utf-8")


def rewrite_single_html(src: Path, dest: Path, game: str, locale: str, title: str) -> dict:
    dest.mkdir(parents=True, exist_ok=True)
    html = src.read_text(encoding="utf-8", errors="replace")
    source_lines = len(html.splitlines())
    html, asset_n = extract_data_uris(html, dest / "assets")

    styles: list[str] = []

    def style_repl(m: re.Match) -> str:
        styles.append(m.group(2))
        return '<link rel="stylesheet" href="style.css">'

    html = STYLE_RE.sub(style_repl, html, count=1)
    html = STYLE_RE.sub("", html)
    if styles:
        (dest / "style.css").write_text("\n\n".join(s.strip() for s in styles) + "\n", encoding="utf-8")

    bodies: list[str] = []

    def script_repl(m: re.Match) -> str:
        attrs = parse_script_attrs(m.group(1) or "")
        body = m.group(2) or ""
        if attrs.get("src"):
            return m.group(0)
        typ = (attrs.get("type") or "text/javascript").lower()
        if typ in {"text/plain", "application/json"}:
            return m.group(0)
        bodies.append(body)
        return f"___SCRIPT_SLOT_{len(bodies) - 1}___"

    html = SCRIPT_RE.sub(script_repl, html)
    if len(bodies) == 1:
        split = split_data_and_app(bodies[0])
        if split:
            bodies = [split[0], split[1]]
            html = html.replace("___SCRIPT_SLOT_0___", "___SCRIPT_SLOT_0___\n___SCRIPT_SLOT_1___", 1)
    js_files: list[tuple[str, str, int]] = []
    used: set[str] = set()
    for idx, body in enumerate(bodies):
        name = classify_script(body, idx, len(bodies))
        if name in used:
            stem, ext = name.rsplit(".", 1)
            name = f"{stem}-{idx}.{ext}"
        used.add(name)
        text, n2 = extract_data_uris(body, dest / "assets")
        asset_n += n2
        (dest / name).write_text(text.strip() + "\n", encoding="utf-8")
        if name.startswith("world-content"):
            role = "content"
        elif name.startswith("app"):
            role = "app"
        else:
            role = "engine"
        js_files.append((name, role, len(text.splitlines())))
        html = html.replace(f"___SCRIPT_SLOT_{idx}___", f'<script src="{name}"></script>', 1)

    html = re.sub(
        r'http-equiv="Content-Security-Policy" content="[^"]*"',
        'http-equiv="Content-Security-Policy" content="default-src \'self\'; img-src \'self\' data:; media-src \'self\'; font-src \'self\'; style-src \'self\' \'unsafe-inline\'; script-src \'self\'; connect-src \'none\'; object-src \'none\'; frame-src \'none\'; base-uri \'none\'; form-action \'none\'"',
        html,
        count=1,
        flags=re.I,
    )
    (dest / "index.html").write_text(html, encoding="utf-8")
    leftover = leftover_data_uri_count(dest)
    write_manifest(
        dest,
        game=game,
        locale=locale,
        title=title,
        mode="single-file-split",
        entry="index.html",
        js_files=js_files,
        theme=["style.css"] if (dest / "style.css").exists() else [],
        extra={"extracted_assets": asset_n, "leftover_data_uri": leftover, "source_html_lines": source_lines},
    )
    write_readme(dest, game, locale, "single")
    return {"mode": "single", "assets": asset_n, "leftover": leftover, "js": [n for n, _, _ in js_files]}


def copy_player_tree(src: Path, dest: Path) -> None:
    dest.mkdir(parents=True, exist_ok=True)
    for dirpath, dirnames, filenames in os.walk(src):
        rel = Path(dirpath).relative_to(src)
        dirnames[:] = [d for d in dirnames if d not in SKIP_COPY_DIRS and not d.startswith(".")]
        here = dest / rel
        here.mkdir(parents=True, exist_ok=True)
        for name in filenames:
            if name in SKIP_COPY_FILES or name == ".DS_Store":
                continue
            shutil.copy2(Path(dirpath) / name, here / name)


def extract_tree_data_uris(root: Path) -> int:
    total = 0
    for p in root.rglob("*"):
        if not p.is_file() or p.suffix.lower() not in {".html", ".css", ".js"}:
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        if "data:image" not in text and "data:audio" not in text and "data:font" not in text:
            continue
        new, n = extract_data_uris(text, p.parent / "assets")
        if n:
            p.write_text(new, encoding="utf-8")
            total += n
    return total


def is_single_file_game(lang_dir: Path) -> tuple[bool, Path | None]:
    htmls = [
        p
        for p in lang_dir.rglob("*.html")
        if p.is_file() and "playtest-evidence" not in p.parts and "核对" not in p.name
    ]
    if not htmls:
        return False, None
    largest = max(htmls, key=lambda p: p.stat().st_size)
    size = largest.stat().st_size
    if len(htmls) <= 3 and size >= 200_000:
        return True, largest
    if size >= 400_000 and (len(htmls) <= 3 or size >= 1_000_000):
        return True, largest
    return False, None


def decompose_lang(game_dir: Path, game: str, lang_name: str, locale: str) -> dict | None:
    src = game_dir / lang_name
    if not src.is_dir():
        return None
    dest = game_dir / "拆解版" / ("中文" if locale.startswith("zh") else "英文")
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True, exist_ok=True)
    entry_rel = find_entry(src, game)
    single, src_html = is_single_file_game(src)
    title = html_title(src_html or (src / entry_rel if entry_rel else None), game)
    if single and src_html:
        info = rewrite_single_html(src_html, dest, game, locale, title)
        info["src"] = str(src_html.relative_to(src))
        return info

    copy_src = src / "工程" if (src / "工程").is_dir() else src
    copy_player_tree(copy_src, dest)
    extracted = extract_tree_data_uris(dest)
    entry = "introduction.html" if (dest / "introduction.html").is_file() else "index.html"
    if not (dest / entry).is_file():
        htmls = list(dest.rglob("*.html"))
        entry = str(htmls[0].relative_to(dest)).replace("\\", "/") if htmls else "index.html"
    write_manifest(
        dest,
        game=game,
        locale=locale,
        title=title,
        mode="multi-page-modular",
        entry=entry,
        js_files=[],
        theme=[],
        extra={"extracted_assets": extracted, "copied_from": "." if copy_src == src else "工程"},
    )
    write_readme(dest, game, locale, "multi")
    return {"mode": "multi", "entry": entry, "extracted": extracted}


def write_decomp_hub(game_dir: Path, game: str) -> None:
    dest = game_dir / "拆解版"
    dest.mkdir(parents=True, exist_ok=True)
    zh_href = None
    en_href = None
    for loc, folder in (("zh", "中文"), ("en", "英文")):
        man = dest / folder / "manifest.json"
        if man.is_file():
            data = json.loads(man.read_text(encoding="utf-8"))
            href = folder + "/" + data.get("entry", "index.html")
            if loc == "zh":
                zh_href = href
            else:
                en_href = href
    (dest / "index.html").write_text(hub_html(game + " · 拆解版", game, game, zh_href, en_href), encoding="utf-8")


def main() -> None:
    if len(sys.argv) < 2:
        raise SystemExit("usage: connect_and_decompose.py ROOT")
    root = Path(sys.argv[1]).resolve()
    tool_dir = root / "_拆解工具"
    tool_dir.mkdir(parents=True, exist_ok=True)
    report = []
    for game_dir in sorted(
        p for p in root.iterdir() if p.is_dir() and p.name not in SKIP_TOP and not p.name.startswith(".")
    ):
        game = game_dir.name
        zh = game_dir / "中文版"
        en = game_dir / "英文版"
        zh_entry = find_entry(zh, game)
        en_entry = find_entry(en, game)
        zh_title = html_title(zh / zh_entry, game) if zh_entry else game
        en_title = html_title(en / en_entry, game) if en_entry else game
        zh_href = f"中文版/{zh_entry}" if zh_entry else None
        en_href = f"英文版/{en_entry}" if en_entry else None
        (game_dir / "index.html").write_text(
            hub_html(game, zh_title, en_title, zh_href, en_href, note_href="拆解版/index.html"),
            encoding="utf-8",
        )
        zh_info = decompose_lang(game_dir, game, "中文版", "zh-CN")
        en_info = decompose_lang(game_dir, game, "英文版", "en")
        write_decomp_hub(game_dir, game)
        rec = {"game": game, "zh_entry": zh_entry, "en_entry": en_entry, "zh": zh_info, "en": en_info}
        report.append(rec)
        print(json.dumps(rec, ensure_ascii=False))
    (tool_dir / "report.json").write_text(json.dumps(report, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print("done", len(report), "root", str(root))


if __name__ == "__main__":
    main()
