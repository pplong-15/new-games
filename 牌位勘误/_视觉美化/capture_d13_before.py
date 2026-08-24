#!/usr/bin/env python3
"""D13 before-only capture from backup zip. Never overwrites after. Never edits the live game."""
from __future__ import annotations

import hashlib
import json
import os
import shutil
import socket
import subprocess
import time
import urllib.request
import zipfile
from pathlib import Path

ZIP = "/Users/jianglong/Desktop/游戏美化-视觉美化前备份-20260823.zip"
BASELINE = "/Users/jianglong/Desktop/游戏美化/_视觉美化工作/基线清单.sha256"
LIVE = Path("/Users/jianglong/Desktop/游戏美化/牌位勘误")
OUT_ROOT = LIVE / "_视觉美化" / "visual" / "多源著录建议"
EXTRACT = Path("/tmp/paiwei-kanwu-before-origin")
PROFILE = "/tmp/paiwei-kanwu-chrome-profile"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
PORT_ZH, PORT_EN, PORT_DBG = 9000, 9001, 9333
LOG = LIVE / "_视觉美化" / "D13-before-log.json"

# Same slugs / URLs / viewports as after 01–38
SHOTS = [
    ("01-boot-first-screen", "/introduction.html", 1280, 800, None),
    ("02-core-verb", "/desk/card.html", 1280, 800, None),
    ("03-success-feedback", "/desk/result-hold.html", 1280, 800, None),
    ("04-near-fail", "/desk/result-half.html", 1280, 800, None),
    ("05-recovery", "/desk/result-half.html", 1280, 800, None),
    ("06-narrow-320", "/desk/card.html", 320, 640, None),
    ("07-keyboard-focus", "/introduction.html", 1280, 800, "focus-enter"),
    ("08-touch-targets", "/desk/home.html", 390, 844, None),
    ("09-muted-or-reduced-motion", "/desk/card.html", 1280, 800, "reduced"),
    ("10-non-color-state", "/desk/login.html", 1280, 800, "login-err"),
    ("11-empty-or-loading", "/mail/inbox.html", 1280, 800, None),
    ("12-error-or-pause", "/desk/login.html", 1280, 800, "login-err"),
    ("13-intro-no-search", "/introduction.html", 1280, 800, None),
    ("14-public-shell", "/index.html", 1280, 800, None),
    ("15-forum-floors", "/forum/list.html", 1280, 800, None),
    ("16-mail-threecol", "/mail/inbox.html", 1280, 800, None),
    ("17-archive-volume", "/archive/index.html", 1280, 800, None),
    ("18-clan-table", "/clan/index.html", 1280, 800, None),
    ("19-gov-redhead", "/gov/index.html", 1280, 800, None),
    ("20-card-six-fields", "/desk/card.html", 1280, 800, None),
    ("21-card-selected", "/desk/card.html", 1280, 800, "card-focus"),
    ("22-card-overreach", "/desk/card.html", 1280, 800, "card-over"),
    ("23-result-over", "/desk/result-over.html", 1280, 800, None),
    ("24-result-print", "/desk/result-print.html", 1280, 800, None),
    ("25-news-portal", "/paper/index.html", 1280, 800, None),
    ("26-desk-home-sources", "/desk/home.html", 1280, 800, None),
    ("27-public-package", "/public/package.html", 1280, 800, None),
    ("28-narrow-320-public", "/index.html", 320, 640, None),
    ("29-login", "/desk/login.html", 1280, 800, None),
    ("30-result-hold", "/desk/result-hold.html", 1280, 800, None),
    ("31-login-320", "/desk/login.html", 320, 640, None),
    ("32-home-1280", "/desk/home.html", 1280, 800, None),
    ("33-card-390", "/desk/card.html", 390, 844, None),
    ("34-result-hold-390", "/desk/result-hold.html", 390, 844, None),
    ("35-result-over-320", "/desk/result-over.html", 320, 640, None),
    ("36-result-half-390", "/desk/result-half.html", 390, 844, None),
    ("37-result-print-320", "/desk/result-print.html", 320, 640, None),
    ("38-intro-320", "/introduction.html", 320, 640, None),
]


def sha256_file(p: Path) -> str:
    h = hashlib.sha256()
    with open(p, "rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            h.update(chunk)
    return h.hexdigest()


def load_baseline() -> dict[str, str]:
    out = {}
    with open(BASELINE, encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if not line or "  " not in line:
                continue
            digest, rel = line.split("  ", 1)
            if "牌位勘误/" in rel:
                out[rel] = digest
    return out


def zip_decode(name: str) -> str:
    """macOS zip often stores UTF-8 names without the UTF-8 flag; zipfile then decodes as CP437."""
    try:
        return name.encode("cp437").decode("utf-8")
    except (UnicodeEncodeError, UnicodeDecodeError):
        return name


def find_zip_prefix(zf: zipfile.ZipFile) -> tuple[str, str]:
    zh = en = None
    for n in zf.namelist():
        d = zip_decode(n)
        if "牌位勘误" in d and "中文版/" in d and d.endswith("introduction.html"):
            zh = d[: d.index("中文版/") + len("中文版/")]
        if "牌位勘误" in d and "英文版/" in d and d.endswith("introduction.html"):
            en = d[: d.index("英文版/") + len("英文版/")]
    if not zh or not en:
        raise SystemExit(f"zip missing 牌位勘误 中英 introduction.html zh={zh} en={en}")
    return zh, en


def extract_backup() -> tuple[Path, Path]:
    if EXTRACT.exists():
        shutil.rmtree(EXTRACT)
    EXTRACT.mkdir(parents=True)
    extract_root = EXTRACT.resolve()
    with zipfile.ZipFile(ZIP) as zf:
        zh_pref, en_pref = find_zip_prefix(zf)
        kept = 0
        for info in zf.infolist():
            decoded = zip_decode(info.filename)
            if not (decoded.startswith(zh_pref) or decoded.startswith(en_pref)):
                continue
            dest = (EXTRACT / decoded).resolve()
            if dest != extract_root and extract_root not in dest.parents:
                raise SystemExit(f"zip path escapes extract dir: {decoded}")
            if info.is_dir() or decoded.endswith("/"):
                dest.mkdir(parents=True, exist_ok=True)
                kept += 1
                continue
            dest.parent.mkdir(parents=True, exist_ok=True)
            with zf.open(info) as src, open(dest, "wb") as out:
                shutil.copyfileobj(src, out)
            kept += 1
        print("extracted", kept, "members", "zh_pref", zh_pref, "en_pref", en_pref)
    # locate roots
    zh_root = en_root = None
    for p in EXTRACT.rglob("introduction.html"):
        if p.parent.name == "中文版":
            zh_root = p.parent
        if p.parent.name == "英文版":
            en_root = p.parent
    if not zh_root or not en_root:
        raise SystemExit(f"extract roots missing zh={zh_root} en={en_root}")
    return zh_root, en_root


def verify_baseline(zh_root: Path, en_root: Path) -> dict:
    baseline = load_baseline()
    checked = 0
    mismatches = []
    missing_in_extract = []
    for rel, digest in baseline.items():
        # rel like 牌位勘误/中文版/js/engine.js
        if rel.startswith("牌位勘误/中文版/"):
            local = zh_root / rel.split("牌位勘误/中文版/", 1)[1]
        elif rel.startswith("牌位勘误/英文版/"):
            local = en_root / rel.split("牌位勘误/英文版/", 1)[1]
        else:
            continue
        if not local.is_file():
            missing_in_extract.append(rel)
            continue
        got = sha256_file(local)
        checked += 1
        if got != digest:
            mismatches.append({"rel": rel, "baseline": digest, "extract": got})
    live_engine_zh = sha256_file(LIVE / "中文版" / "js" / "engine.js")
    live_engine_en = sha256_file(LIVE / "英文版" / "js" / "engine.js")
    ext_engine_zh = sha256_file(zh_root / "js" / "engine.js")
    ext_engine_en = sha256_file(en_root / "js" / "engine.js")
    return {
        "baseline_entries": len(baseline),
        "checked_files": checked,
        "mismatches": mismatches[:20],
        "mismatch_count": len(mismatches),
        "missing_in_extract": missing_in_extract[:20],
        "missing_count": len(missing_in_extract),
        "engine_zh_extract": ext_engine_zh,
        "engine_en_extract": ext_engine_en,
        "engine_zh_live": live_engine_zh,
        "engine_en_live": live_engine_en,
        "engine_zh_match_live": ext_engine_zh == live_engine_zh,
        "engine_en_match_live": ext_engine_en == live_engine_en,
    }


def start_http(root: Path, port: int) -> subprocess.Popen:
    return subprocess.Popen(
        ["python3", "-m", "http.server", str(port), "--bind", "127.0.0.1"],
        cwd=str(root),
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def wait_http(port: int, path: str = "/introduction.html") -> int:
    url = f"http://127.0.0.1:{port}{path}"
    for _ in range(40):
        try:
            with urllib.request.urlopen(url, timeout=2) as r:
                return r.status
        except Exception:
            time.sleep(0.25)
    raise SystemExit(f"http not up {url}")


# --- minimal CDP ---
def _recv_exact(sock, n):
    buf = b""
    while len(buf) < n:
        chunk = sock.recv(n - len(buf))
        if not chunk:
            raise ConnectionError("cdp closed")
        buf += chunk
    return buf


def ws_connect(ws_url: str):
    # ws://127.0.0.1:9333/devtools/page/ID
    assert ws_url.startswith("ws://")
    rest = ws_url[5:]
    hostport, _, path = rest.partition("/")
    host, _, port = hostport.partition(":")
    port = int(port or 80)
    path = "/" + path
    sock = socket.create_connection((host, port), timeout=20)
    key = "dGhlIHNhbXBsZSBub25jZQ=="
    req = (
        f"GET {path} HTTP/1.1\r\n"
        f"Host: {hostport}\r\n"
        "Upgrade: websocket\r\n"
        "Connection: Upgrade\r\n"
        f"Sec-WebSocket-Key: {key}\r\n"
        "Sec-WebSocket-Version: 13\r\n\r\n"
    )
    sock.sendall(req.encode())
    hdr = b""
    while b"\r\n\r\n" not in hdr:
        hdr += sock.recv(4096)
    if b"101" not in hdr.split(b"\r\n", 1)[0]:
        raise ConnectionError(hdr[:200])
    return sock


def ws_send(sock, payload: dict):
    data = json.dumps(payload, ensure_ascii=False).encode()
    header = bytearray()
    header.append(0x81)
    ln = len(data)
    mask = b"\x01\x02\x03\x04"
    if ln < 126:
        header.append(0x80 | ln)
    elif ln < 65536:
        header.append(0x80 | 126)
        header.extend(ln.to_bytes(2, "big"))
    else:
        header.append(0x80 | 127)
        header.extend(ln.to_bytes(8, "big"))
    header.extend(mask)
    masked = bytes(b ^ mask[i % 4] for i, b in enumerate(data))
    sock.sendall(header + masked)


def ws_recv(sock) -> dict:
    b0 = _recv_exact(sock, 2)
    ln = b0[1] & 0x7F
    if ln == 126:
        ln = int.from_bytes(_recv_exact(sock, 2), "big")
    elif ln == 127:
        ln = int.from_bytes(_recv_exact(sock, 8), "big")
    raw = _recv_exact(sock, ln)
    return json.loads(raw.decode())


class CDP:
    def __init__(self, sock):
        self.sock = sock
        self.i = 0

    def call(self, method, params=None, timeout=30, optional=False):
        self.i += 1
        mid = self.i
        ws_send(self.sock, {"id": mid, "method": method, "params": params or {}})
        end = time.time() + timeout
        while time.time() < end:
            msg = ws_recv(self.sock)
            if msg.get("id") == mid:
                if "error" in msg:
                    if optional:
                        return {}
                    raise RuntimeError(msg["error"])
                return msg.get("result") or {}
        raise TimeoutError(method)


def start_chrome():
    if os.path.exists(PROFILE):
        shutil.rmtree(PROFILE, ignore_errors=True)
    cmd = [
        CHROME, "--headless=new", "--disable-gpu", "--hide-scrollbars",
        "--ignore-certificate-errors", "--no-first-run", "--disable-extensions",
        f"--user-data-dir={PROFILE}",
        f"--remote-debugging-port={PORT_DBG}",
        "about:blank",
    ]
    proc = subprocess.Popen(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    ws = None
    for _ in range(50):
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{PORT_DBG}/json/list", timeout=1) as r:
                tabs = json.loads(r.read().decode())
            page = next((t for t in tabs if t.get("type") == "page" and t.get("webSocketDebuggerUrl")), None)
            if page:
                ws = page["webSocketDebuggerUrl"]
                break
        except Exception:
            time.sleep(0.25)
    if not ws:
        # last resort: open a real page target
        try:
            req = urllib.request.Request(f"http://127.0.0.1:{PORT_DBG}/json/new?about:blank", method="PUT")
            with urllib.request.urlopen(req, timeout=2) as r:
                created = json.loads(r.read().decode())
            ws = created.get("webSocketDebuggerUrl")
        except Exception:
            ws = None
    if not ws:
        proc.kill()
        raise SystemExit("chrome debug not ready")
    return proc, ws


def apply_action(cdp: CDP, action: str | None, lang: str) -> str:
    if action is None:
        return "none"
    if action == "reduced":
        cdp.call("Emulation.setEmulatedMedia", {
            "features": [{"name": "prefers-reduced-motion", "value": "reduce"}]
        })
        return "Emulation.setEmulatedMedia prefers-reduced-motion=reduce"
    if action == "login-err":
        cdp.call("Runtime.evaluate", {
            "expression": """
(() => {
  const u = document.getElementById('user');
  if (!u) return 'no #user';
  u.value = 'WRONG-0000';
  const form = document.getElementById('in');
  if (form) {
    form.dispatchEvent(new Event('submit', {bubbles:true,cancelable:true}));
    if (typeof form.onsubmit === 'function') form.onsubmit(new Event('submit'));
  }
  const hint = document.getElementById('hint');
  return (hint && hint.className) + '|' + (hint && hint.textContent || '').slice(0,40);
})()
""",
            "returnByValue": True,
        })
        time.sleep(0.2)
        return "type WRONG-0000 + submit #in (real wrong id)"
    if action == "card-focus":
        cdp.call("Runtime.evaluate", {
            "expression": """
(() => {
  const s = document.getElementById('hui');
  if (!s) return 'no #hui';
  s.focus();
  return document.activeElement && document.activeElement.id;
})()
""",
            "returnByValue": True,
        })
        time.sleep(0.15)
        return "focus #hui (first field)"
    if action == "card-over":
        cdp.call("Runtime.evaluate", {
            "expression": """
(() => {
  const s = document.getElementById('auth');
  if (!s) return 'no #auth';
  s.value = 'approve';
  s.dispatchEvent(new Event('input', {bubbles:true}));
  s.dispatchEvent(new Event('change', {bubbles:true}));
  return s.value;
})()
""",
            "returnByValue": True,
        })
        time.sleep(0.15)
        return "set #auth=approve + change"
    if action == "focus-enter":
        cdp.call("Runtime.evaluate", {
            "expression": """
(() => {
  const a = document.querySelector('.enter-link, .boot-actions a, a[href*="login"]');
  if (!a) return 'no enter link';
  a.focus();
  return a.className + '|' + a.getAttribute('href');
})()
""",
            "returnByValue": True,
        })
        # also send Tab for "real Tab" requirement
        cdp.call("Input.dispatchKeyEvent", {"type": "keyDown", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9})
        cdp.call("Input.dispatchKeyEvent", {"type": "keyUp", "key": "Tab", "code": "Tab", "windowsVirtualKeyCode": 9})
        time.sleep(0.15)
        return "Tab key + focus enter-link"
    return action


def shot_one(cdp: CDP, url: str, dest: Path, w: int, h: int, action: str | None, lang: str) -> dict:
    cdp.call("Emulation.setDeviceMetricsOverride", {
        "width": w, "height": h, "deviceScaleFactor": 1, "mobile": w < 400,
    })
    # Chrome 151 has no clearEmulatedMedia; empty setEmulatedMedia resets prefers-reduced-motion.
    cdp.call("Emulation.clearEmulatedMedia", {}, optional=True)
    cdp.call("Emulation.setEmulatedMedia", {"media": "", "features": []}, optional=True)
    cdp.call("Page.navigate", {"url": url})
    # wait load
    time.sleep(0.6)
    for _ in range(20):
        ready = cdp.call("Runtime.evaluate", {
            "expression": "document.readyState", "returnByValue": True
        }).get("result", {}).get("value")
        if ready == "complete":
            break
        time.sleep(0.1)
    title = cdp.call("Runtime.evaluate", {
        "expression": "document.title", "returnByValue": True
    }).get("result", {}).get("value")
    body_len = cdp.call("Runtime.evaluate", {
        "expression": "(document.body && document.body.innerText || '').length",
        "returnByValue": True
    }).get("result", {}).get("value")
    note = apply_action(cdp, action, lang)
    png_b64 = cdp.call("Page.captureScreenshot", {"format": "png", "fromSurface": True}).get("data")
    dest.parent.mkdir(parents=True, exist_ok=True)
    raw = __import__("base64").b64decode(png_b64)
    if dest.name.endswith(".png") and not dest.name.endswith("-before.png"):
        raise SystemExit(f"refusing to write non-before {dest}")
    if dest.exists() and dest.name.endswith(".png") and "-before" not in dest.name:
        raise SystemExit(f"refusing overwrite after {dest}")
    dest.write_bytes(raw)
    digest = hashlib.sha256(raw).hexdigest()
    # connection-error / blank guard
    ok = True
    reasons = []
    if not title or title.lower() in ("", "about:blank"):
        ok = False
        reasons.append("empty title")
    if isinstance(body_len, int) and body_len < 20:
        ok = False
        reasons.append(f"short body {body_len}")
    if dest.stat().st_size < 8000:
        ok = False
        reasons.append(f"tiny png {dest.stat().st_size}")
    return {
        "slug_file": dest.name,
        "url": url,
        "viewport": f"{w}x{h}",
        "input": note,
        "title": title,
        "body_chars": body_len,
        "sha256": digest,
        "bytes": dest.stat().st_size,
        "ok_not_error_page": ok,
        "fail_reasons": reasons,
    }


def kill_port(port: int):
    subprocess.run(
        ["sh", "-c", f"pids=$(lsof -nP -iTCP:{port} -sTCP:LISTEN -t 2>/dev/null); [ -n \"$pids\" ] && kill $pids || true"],
        check=False,
    )


def main():
    assert os.path.getsize(ZIP) > 300_000_000, "zip too small"
    # never touch live css/html/js
    zh_root, en_root = extract_backup()
    baseline_rep = verify_baseline(zh_root, en_root)
    print("baseline", json.dumps({k: baseline_rep[k] for k in (
        "baseline_entries", "checked_files", "mismatch_count", "missing_count",
        "engine_zh_match_live", "engine_en_match_live"
    )}, ensure_ascii=False))

    for p in (PORT_ZH, PORT_EN, PORT_DBG):
        kill_port(p)
        time.sleep(0.2)

    pzh = start_http(zh_root, PORT_ZH)
    pen = start_http(en_root, PORT_EN)
    try:
        st_zh = wait_http(PORT_ZH)
        st_en = wait_http(PORT_EN)
        print("http", st_zh, st_en, "from", zh_root, en_root)
        chrome, ws = start_chrome()
        try:
            sock = ws_connect(ws)
            cdp = CDP(sock)
            cdp.call("Page.enable")
            cdp.call("Runtime.enable")
            records = []
            after_ok = {"zh": 0, "en": 0}
            for lang, port in (("zh", PORT_ZH), ("en", PORT_EN)):
                folder = OUT_ROOT / f"polish-20260823-{lang}"
                for slug, path, w, h, action in SHOTS:
                    after = folder / f"{slug}.png"
                    if after.exists():
                        after_ok[lang] += 1
                    dest = folder / f"{slug}-before.png"
                    url = f"http://127.0.0.1:{port}{path}"
                    rec = shot_one(cdp, url, dest, w, h, action, lang)
                    rec["lang"] = lang
                    rec["after_present"] = after.exists()
                    rec["origin"] = "backup-zip-http"
                    records.append(rec)
                    print("before", dest.name, rec["bytes"], rec["ok_not_error_page"], rec["input"])
            sock.close()
        finally:
            chrome.kill()
            chrome.wait(timeout=5)
    finally:
        pzh.kill()
        pen.kill()
        kill_port(PORT_ZH)
        kill_port(PORT_EN)
        kill_port(PORT_DBG)
        shutil.rmtree(PROFILE, ignore_errors=True)
        # keep extract for audit? user said 清/tmp/profile — profile only. extract can stay or go.
        # user: 停服务、清/tmp/profile. Clear profile. Optionally keep extract until we verify then remove.
        shutil.rmtree(EXTRACT, ignore_errors=True)

    before_zh = list((OUT_ROOT / "polish-20260823-zh").glob("*-before.png"))
    before_en = list((OUT_ROOT / "polish-20260823-en").glob("*-before.png"))
    after_zh = [p for p in (OUT_ROOT / "polish-20260823-zh").glob("*.png") if "-before" not in p.name]
    after_en = [p for p in (OUT_ROOT / "polish-20260823-en").glob("*.png") if "-before" not in p.name]
    report = {
        "zip_bytes": os.path.getsize(ZIP),
        "baseline": baseline_rep,
        "http_status": {"zh": st_zh, "en": st_en},
        "counts": {
            "before_zh": len(before_zh),
            "before_en": len(before_en),
            "after_zh": len(after_zh),
            "after_en": len(after_en),
        },
        "shots": records,
        "bad": [r for r in records if not r["ok_not_error_page"]],
    }
    LOG.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print("LOG", LOG)
    print("COUNTS", report["counts"], "BAD", len(report["bad"]))


if __name__ == "__main__":
    main()
