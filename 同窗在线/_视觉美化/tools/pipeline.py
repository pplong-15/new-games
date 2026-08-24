#!/usr/bin/env python3
"""Align stills, serve, capture before/after, smoke, stop servers."""
from __future__ import annotations

import hashlib
import json
import os
import shutil
import signal
import subprocess
import sys
import time
import urllib.parse
import urllib.request

TOOL = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, TOOL)
import capture as C  # noqa: E402

ROOT = os.path.abspath(os.path.join(TOOL, "..", ".."))
VIS = os.path.abspath(os.path.join(TOOL, ".."))
ZH_ASSETS = os.path.join(ROOT, "中文版", "工程", "assets")
EN_ASSETS = os.path.join(ROOT, "英文版", "工程", "assets")
ZH_ENG = os.path.join(ROOT, "中文版", "工程")
EN_ENG = os.path.join(ROOT, "英文版", "工程")
GEN = os.path.join(VIS, "generated-img")
OLD = os.path.join(VIS, "rollback-before-img")
ALT = {
    "img-avatar-syz.jpg": "img-avatar-syz.jpg",
    "img-avatar-cxb.jpg": "img-avatar-cxb.jpg",
    "img-avatar-zt.jpg": "img-avatar-zt.jpg",
}


def copy_css():
    src = os.path.join(ZH_ENG, "css", "common.css")
    dst = os.path.join(EN_ENG, "css", "common.css")
    shutil.copy2(src, dst)
    print("copied common.css zh->en", os.path.getsize(src))


def sync_names(folder):
    pairs = list(ALT.items()) + [(v, k) for k, v in ALT.items()]
    for a, b in pairs:
        pa, pb = os.path.join(folder, a), os.path.join(folder, b)
        if os.path.isfile(pa) and not os.path.isfile(pb):
            shutil.copy2(pa, pb)
            print("alias", a, "->", b)
        if os.path.isfile(pb) and not os.path.isfile(pa):
            shutil.copy2(pb, pa)
            print("alias", b, "->", a)


def install_stills(src_dir):
    if not os.path.isdir(src_dir):
        print("missing stills dir", src_dir)
        return
    for name in os.listdir(src_dir):
        if name.endswith(".jpg"):
            shutil.copy2(os.path.join(src_dir, name), os.path.join(ZH_ASSETS, name))
            shutil.copy2(os.path.join(src_dir, name), os.path.join(EN_ASSETS, name))
    sync_names(ZH_ASSETS)
    sync_names(EN_ASSETS)


def snapshot_current_to_gen():
    os.makedirs(GEN, exist_ok=True)
    for name in os.listdir(ZH_ASSETS):
        if name.endswith(".jpg"):
            shutil.copy2(os.path.join(ZH_ASSETS, name), os.path.join(GEN, name))
    print("gen snapshot", sorted(os.listdir(GEN)))


def hashes():
    rows = []
    for name in sorted(os.listdir(ZH_ASSETS)):
        if not name.endswith(".jpg"):
            continue
        z = open(os.path.join(ZH_ASSETS, name), "rb").read()
        epath = os.path.join(EN_ASSETS, name)
        e = open(epath, "rb").read() if os.path.isfile(epath) else b""
        rec = {
            "name": name, "zh": len(z), "en": len(e),
            "sha": hashlib.sha256(z).hexdigest()[:16],
            "match": z == e,
        }
        rows.append(rec)
        print(name, len(z), "MATCH" if z == e else "MISMATCH")
    json.dump(rows, open(os.path.join(VIS, "stills-hash.json"), "w"), indent=2)
    return rows


def start_http():
    z = subprocess.Popen(
        [sys.executable, "-m", "http.server", "9010", "--bind", "127.0.0.1"],
        cwd=ZH_ENG, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    e = subprocess.Popen(
        [sys.executable, "-m", "http.server", "9011", "--bind", "127.0.0.1"],
        cwd=EN_ENG, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    for port in (9010, 9011):
        for _ in range(50):
            try:
                urllib.request.urlopen(f"http://127.0.0.1:{port}/index.html", timeout=1)
                break
            except Exception:
                time.sleep(0.1)
        else:
            raise RuntimeError(f"http {port} not up")
    print("http 9010/9011 up", z.pid, e.pid)
    return z, e


def stop_http(procs):
    for p in procs:
        try:
            p.send_signal(signal.SIGTERM)
            p.wait(timeout=5)
        except Exception:
            try:
                p.kill()
            except Exception:
                pass


def capture(phase):
    r = subprocess.run([sys.executable, os.path.join(TOOL, "capture.py"), phase])
    if r.returncode != 0:
        print("capture failed", phase, r.returncode)
    return r.returncode


def smoke():
    proc, page = C.start_chrome()
    report = {}
    try:
        C.goto(page, "http://127.0.0.1:9010/index.html")
        C.js(page, "try{localStorage.clear()}catch(e){}")
        key = C.js(page, "window.GAME && GAME.meta && GAME.meta.saveKey")
        report["saveKey"] = key
        report["htmlClass_intro"] = C.js(page, "document.documentElement.className")
        report["intro_has_search"] = C.js(
            page, "!!document.querySelector('form[data-act=search], #q')"
        )
        C.seed(page, key or C.SAVE_ZH, C.state(started=True))
        C.goto(page, "http://127.0.0.1:9010/home.html")
        report["htmlClass_home"] = C.js(page, "document.documentElement.className")
        report["home_boxes"] = C.measure(page)
        q = urllib.parse.quote("纸马课")
        C.goto(page, f"http://127.0.0.1:9010/search.html?q={q}")
        report["hit_html"] = C.js(page, "document.body.innerText.slice(0, 400)")
        report["hit_class"] = C.js(page, "document.documentElement.className")
        miss = urllib.parse.quote("西瓜")
        C.goto(page, f"http://127.0.0.1:9010/search.html?q={miss}")
        report["miss_html"] = C.js(page, "document.body.innerText.slice(0, 400)")
        forb = urllib.parse.quote("源码")
        C.goto(page, f"http://127.0.0.1:9010/search.html?q={forb}")
        report["forbidden_class"] = C.js(page, "document.documentElement.className")
        report["forbidden_text"] = C.js(page, "document.body.innerText.slice(0, 300)")
        C.goto(page, "http://127.0.0.1:9010/login.html")
        C.js(
            page,
            """
          (function(){
            var u=document.querySelector('[name=user], #user');
            var p=document.querySelector('[name=pass], #pass');
            if(u) u.value='沈亦舟';
            if(p) p.value='先上香';
            var f=document.querySelector('form[data-act=login], form');
            if(f) f.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
          })();
        """,
        )
        time.sleep(0.4)
        report["after_login"] = C.js(
            page, "location.pathname + ' ' + document.body.innerText.slice(0, 240)"
        )
        C.seed(page, key or C.SAVE_ZH, C.state(verified=["fact_cxb", "fact_spare"]))
        C.goto(page, "http://127.0.0.1:9010/choice.html")
        report["near_choice"] = C.js(page, "document.body.innerText.slice(0, 400)")
        C.seed(page, key or C.SAVE_ZH, C.state(ending="logout"))
        C.goto(page, "http://127.0.0.1:9010/ending-a.html")
        report["ending_a"] = C.js(page, "document.body.innerText.slice(0, 240)")
        C.goto(page, "http://127.0.0.1:9010/index.html?test=1")
        report["selftest"] = C.js(page, "document.body.innerText.slice(0, 800)")
        C.goto(page, "http://127.0.0.1:9010/album-cxb.html")
        report["album_imgs"] = C.js(
            page,
            "[...document.images].map(i=>({src:i.getAttribute('src'), w:i.naturalWidth, h:i.naturalHeight, ok:i.complete && i.naturalWidth>0}))",
        )
        C.goto(page, "http://127.0.0.1:9011/index.html")
        report["en_saveKey"] = C.js(page, "window.GAME && GAME.meta && GAME.meta.saveKey")
        C.seed(page, report["en_saveKey"] or C.SAVE_EN, C.state(started=True))
        C.goto(page, "http://127.0.0.1:9011/search.html?q=PaperHorse")
        report["en_hit"] = C.js(page, "document.body.innerText.slice(0, 300)")
        C.goto(page, "http://127.0.0.1:9010/home.html")
        C.set_view(page, 320, 720)
        report["w320_boxes"] = C.measure(page)
        C.set_view(page, 390, 844)
        report["w390_boxes"] = C.measure(page)
        refs = C.js(
            page,
            "JSON.stringify({pages: Object.keys((GAME&&GAME.pages)||{}), saveKey: GAME&&GAME.meta&&GAME.meta.saveKey, public: GAME&&GAME.meta&&GAME.meta.publicPages})",
        )
        report["game_meta"] = refs
    except Exception as ex:
        report["error"] = repr(ex)
        print("SMOKE ERROR", ex)
    finally:
        try:
            page.close()
        except Exception:
            pass
        proc.terminate()
        try:
            proc.wait(timeout=5)
        except Exception:
            proc.kill()
    out = os.path.join(VIS, "smoke.json")
    json.dump(report, open(out, "w"), ensure_ascii=False, indent=2)
    print("smoke", out)
    return report


def volume():
    rows = []
    for label, path in (("zh", ZH_ENG), ("en", EN_ENG)):
        total = 0
        media = 0
        for dp, dns, fns in os.walk(path):
            dns[:] = [d for d in dns if d not in (".git",)]
            for fn in fns:
                fp = os.path.join(dp, fn)
                n = os.path.getsize(fp)
                total += n
                if fn.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp", ".mp3", ".mp4")):
                    media += n
                    rows.append((label, os.path.relpath(fp, path), n))
        print(f"BUNDLE {label} total={total} media={media}")
        rows.append((label, "_TOTAL", total))
        rows.append((label, "_MEDIA", media))
    out = os.path.join(VIS, "volume.tsv")
    with open(out, "w") as f:
        for r in rows:
            f.write("\t".join(map(str, r)) + "\n")
    print("volume", out)


def shots_index():
    vis = os.path.join(VIS, "visual", "校园实名站搜词")
    listing = []
    if os.path.isdir(vis):
        for dp, _, fns in os.walk(vis):
            for fn in sorted(fns):
                if fn.endswith(".png"):
                    fp = os.path.join(dp, fn)
                    listing.append(f"{os.path.relpath(fp, vis)}\t{os.path.getsize(fp)}")
    open(os.path.join(VIS, "screenshots.txt"), "w").write("\n".join(listing) + "\n")
    print("shots", len(listing))


def main():
    copy_css()
    snapshot_current_to_gen()
    os.makedirs(OLD, exist_ok=True)
    procs = start_http()
    try:
        if any(n.endswith(".jpg") for n in os.listdir(OLD)):
            install_stills(OLD)
            print("=== BEFORE stills (old AI) ===")
            capture("before")
        else:
            print("WARN no rollback jpgs; skip before")
        install_stills(GEN)
        print("=== AFTER stills (pillow) ===")
        hashes()
        capture("after")
        smoke()
        volume()
        shots_index()
    finally:
        stop_http(procs)
        print("http stopped")


if __name__ == "__main__":
    main()
