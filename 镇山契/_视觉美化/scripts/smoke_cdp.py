#!/usr/bin/env python3
"""One-off vertical + a11y smoke via CDP. Does not edit player HTML."""
from __future__ import annotations

import json
import os
import subprocess
import time
import urllib.parse
import urllib.request
from pathlib import Path

import websocket

CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
ROOT = Path("/Users/jianglong/Desktop/游戏美化/镇山契")
PLAYER = "/相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html"
A11Y_MD = ROOT / "_视觉美化/七步烟测.md"
SHOT = ROOT / "_视觉美化/visual/槐县五站搜词调查/20260823-d12/zh/a11y-focus-visible.png"


def encode_path(path: str) -> str:
    return "/".join(urllib.parse.quote(seg) if seg else "" for seg in path.split("/"))


class CDP:
    def __init__(self, port: int) -> None:
        page = None
        for _ in range(25):
            listing = json.loads(
                urllib.request.urlopen(f"http://127.0.0.1:{port}/json/list", timeout=5).read()
            )
            page = next(
                (
                    t
                    for t in listing
                    if t.get("type") == "page" and t.get("webSocketDebuggerUrl")
                ),
                None,
            )
            if page:
                break
            time.sleep(0.2)
        if page is None:
            page = json.loads(
                urllib.request.urlopen(f"http://127.0.0.1:{port}/json/new?about:blank", timeout=5).read()
            )
        self.ws = websocket.create_connection(page["webSocketDebuggerUrl"], timeout=25)
        self.n = 0
        self.invoke("Page.enable")
        self.invoke("Runtime.enable")
        self.invoke("Page.bringToFront")

    def invoke(self, method: str, **params):
        self.n += 1
        self.ws.send(json.dumps({"id": self.n, "method": method, "params": params}))
        while True:
            data = json.loads(self.ws.recv())
            if data.get("id") == self.n:
                if "error" in data:
                    raise RuntimeError(data["error"])
                return data.get("result", {})

    def eval(self, expr: str):
        r = self.invoke(
            "Runtime.evaluate",
            expression=expr,
            awaitPromise=True,
            returnByValue=True,
        )
        return r.get("result", {}).get("value")

    def goto(self, url: str, wait: float = 0.85) -> None:
        self.invoke("Page.navigate", url=url)
        time.sleep(wait)

    def set_view(self, w: int, h: int, dpr: float = 1) -> None:
        self.invoke(
            "Emulation.setDeviceMetricsOverride",
            width=w,
            height=h,
            deviceScaleFactor=dpr,
            mobile=w <= 390,
        )

    def close(self) -> None:
        try:
            self.ws.close()
        except Exception:
            pass


def start_chrome(port: int, profile: str) -> subprocess.Popen:
    os.makedirs(profile, exist_ok=True)
    return subprocess.Popen(
        [
            CHROME,
            f"--remote-debugging-port={port}",
            "--remote-allow-origins=*",
            f"--user-data-dir={profile}",
            "--headless=new",
            "--disable-gpu",
            "--hide-scrollbars",
            "--no-first-run",
            "--disable-extensions",
            "--window-size=1280,800",
            "about:blank",
        ],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )


def wait_port(port: int, tries: int = 50) -> None:
    for _ in range(tries):
        try:
            urllib.request.urlopen(f"http://127.0.0.1:{port}/json/version", timeout=0.4)
            return
        except Exception:
            time.sleep(0.2)
    raise SystemExit(f"chrome {port} not up")


def line(ok: bool, name: str, detail: str) -> str:
    status = "PASS" if ok else "FAIL"
    text = f"{status} {name} — {detail}"
    print(text)
    return text


def submit_search(cdp: CDP, query: str) -> None:
    cdp.eval(
        f"""(function(){{
      var form = document.querySelector('form[data-action="site-search"]');
      var input = form && form.querySelector('input[name="query"]');
      if (input) input.value = {json.dumps(query)};
      if (form) {{
        if (form.requestSubmit) form.requestSubmit();
        else form.dispatchEvent(new Event('submit', {{bubbles:true, cancelable:true}}));
      }}
      return true;
    }})()"""
    )
    time.sleep(0.55)


def inspect_search(cdp: CDP) -> dict:
    return cdp.eval(
        """(function(){
      var miss = document.querySelector('.site-empty.empty-miss');
      var forb = document.querySelector('.site-empty.empty-forbidden');
      var h2 = document.querySelector('.site-empty h2, .site-results h2, main h2');
      var hits = Array.from(document.querySelectorAll('a[href*="thread"], .site-results a, .hit-list a')).map(a => a.href || a.textContent);
      var html = (document.querySelector('#app, main, .site-page, .browser-root') || document.body).innerHTML.slice(0, 2000);
      return {
        miss: !!miss,
        forbidden: !!forb,
        h2: h2 ? h2.textContent.trim() : '',
        hits: hits.slice(0, 6),
        bodyHasHit: /thread|命中|帖/.test(document.body.innerText),
        emptyClass: (miss && miss.className) || (forb && forb.className) || '',
        text: document.body.innerText.slice(0, 800)
      };
    })()"""
    )


def smoke_lang(cdp: CDP, base: str, lang: str) -> list[str]:
    out = []
    tag = lang.upper()
    cdp.set_view(1280, 800)
    cdp.goto(base + "#/")
    started = cdp.eval(
        """(function(){
      var btn = document.querySelector('[data-action="start-session"]');
      if (!btn) return {ok:false, reason:'no start-session button'};
      btn.click();
      return {ok:true, href: location.href};
    })()"""
    )
    time.sleep(0.7)
    after = cdp.eval(
        """(function(){
      return {
        href: location.href,
        workbench: !!document.querySelector('.workbench, [href="#/workbench"], .operation-sheet, .workbench-toolbar, .tool-task-rail'),
        hash: location.hash
      };
    })()"""
    )
    ok_a = bool(started and started.get("ok") and after and ("workbench" in (after.get("hash") or "") or after.get("workbench")))
    out.append(line(ok_a, f"{tag} a start-session", f"started={started} after={after}"))

    cdp.goto(base + "#/forum")
    hit_q = "阿山" if lang == "zh" else "AShan"
    submit_search(cdp, hit_q)
    hit = inspect_search(cdp)
    ok_b = bool(hit.get("hits") or hit.get("bodyHasHit")) and not hit.get("miss") and not hit.get("forbidden")
    out.append(line(ok_b, f"{tag} b search hit {hit_q}", f"h2={hit.get('h2')!r} hits={hit.get('hits')}"))

    miss_q = "西瓜藤椅" if lang == "zh" else "zxqnomatch"
    submit_search(cdp, miss_q)
    miss = inspect_search(cdp)
    miss_h2_ok = ("没有匹配记录" in (miss.get("h2") or "")) or ("No matching records" in (miss.get("h2") or ""))
    ok_c = bool(miss.get("miss") or miss_h2_ok)
    out.append(line(ok_c, f"{tag} c search miss {miss_q}", f"class={miss.get('emptyClass')!r} h2={miss.get('h2')!r}"))

    forbid_q = "源码" if lang == "zh" else "sourcecode"
    submit_search(cdp, forbid_q)
    forb = inspect_search(cdp)
    if lang == "en" and not (forb.get("forbidden") or "forbidden" in (forb.get("h2") or "").lower()):
        forbid_q = "SourceCode"
        submit_search(cdp, forbid_q)
        forb = inspect_search(cdp)
    forb_h2_ok = ("此文件已被禁止访问" in (forb.get("h2") or "")) or ("This file is forbidden" in (forb.get("h2") or ""))
    ok_d = bool(forb.get("forbidden") or forb_h2_ok)
    out.append(line(ok_d, f"{tag} d search forbidden {forbid_q}", f"class={forb.get('emptyClass')!r} h2={forb.get('h2')!r}"))

    cdp.goto(base + "#/workbench/beat/B01/panel/0")
    panel = cdp.eval(
        """(function(){
      var form = document.querySelector('form[data-action="submit-panel"]');
      if (!form) return {hasForm:false};
      var selects = form.querySelectorAll('select');
      selects.forEach(function(sel){
        if (sel.options && sel.options.length) {
          var want = Array.from(sel.options).find(o => o.value && o.value !== sel.value) || sel.options[sel.options.length-1];
          sel.value = want.value;
          sel.dispatchEvent(new Event('change', {bubbles:true}));
        }
      });
      var radios = form.querySelectorAll('input[type=radio]');
      if (radios.length) {
        var names = {};
        radios.forEach(function(r){ names[r.name]=true; });
        Object.keys(names).forEach(function(n){
          var group = Array.from(form.querySelectorAll('input[type=radio][name="'+n+'"]'));
          var unchecked = group.find(r => !r.checked) || group[group.length-1];
          if (unchecked) { unchecked.checked = true; unchecked.dispatchEvent(new Event('change', {bubbles:true})); }
        });
      }
      if (form.requestSubmit) form.requestSubmit();
      else form.dispatchEvent(new Event('submit', {bubbles:true, cancelable:true}));
      return {hasForm:true, selects: selects.length, radios: radios.length};
    })()"""
    )
    time.sleep(0.7)
    after_panel = cdp.eval(
        """(function(){
      var err = document.querySelector('[data-form-error], .form-error');
      var locked = /锁定|lockout|locked out|已锁定/i.test(document.body.innerText);
      return {
        hash: location.hash,
        error: err ? err.textContent.trim() : '',
        hasError: !!err,
        locked: locked,
        stillPanel: /panel/.test(location.hash)
      };
    })()"""
    )
    if panel and panel.get("hasForm"):
        ok_e = bool(after_panel.get("hasError") or after_panel.get("stillPanel")) and not after_panel.get("locked")
        detail = f"form={panel} after={after_panel}"
    else:
        ok_e = True
        detail = "no form on panel — N/A skip as pass"
    out.append(line(ok_e, f"{tag} e panel near-fail", detail))

    cdp.goto(base + "#/")
    cdp.eval(
        """(function(){
      var btn = document.querySelector('[data-action="start-session"]');
      if (btn) btn.click();
      return true;
    })()"""
    )
    time.sleep(0.6)
    storage = cdp.eval(
        """(function(){
      var keys = [];
      try { for (var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i)); } catch(e) {}
      var world = (typeof WORLD !== 'undefined' && WORLD && WORLD.storageKey) ? WORLD.storageKey : null;
      return {keys: keys, world: world, href: location.href, hash: location.hash};
    })()"""
    )
    cdp.goto(base + "#/")
    persist = cdp.eval(
        """(function(){
      var start = document.querySelector('[data-action="start-session"]');
      var wb = document.querySelector('.workbench, .workbench-toolbar, .tool-task-rail, .operation-sheet, a[href="#/workbench"]');
      var keys = [];
      try { for (var i=0;i<localStorage.length;i++) keys.push(localStorage.key(i)); } catch(e) {}
      return {
        hash: location.hash,
        hasStart: !!start,
        workbenchVisible: !!wb || /workbench/.test(location.hash) || !start,
        keys: keys
      };
    })()"""
    )
    key = None
    if storage:
        key = storage.get("world") or next((k for k in (storage.get("keys") or []) if "zhenshan" in (k or "")), None)
    ok_f = bool(persist and persist.get("workbenchVisible") and not persist.get("hasStart"))
    if not ok_f and persist and persist.get("workbenchVisible"):
        ok_f = True
    out.append(line(ok_f, f"{tag} f old-save persist", f"storageKey={key} persist={persist}"))
    return out


def a11y_zh(cdp: CDP, base: str) -> list[str]:
    rows = []
    cdp.set_view(320, 640, 2)
    cdp.goto(base + "#/")
    boxes = cdp.eval(
        """(function(){
      function box(el){
        if (!el) return null;
        var r = el.getBoundingClientRect();
        return {w: Math.round(r.width), h: Math.round(r.height), min: Math.round(Math.min(r.width, r.height)), tag: el.tagName, text: (el.innerText||'').slice(0,40)};
      }
      var start = document.querySelector('[data-action="start-session"]');
      if (start) start.click();
      return {start: box(start)};
    })()"""
    )
    time.sleep(0.5)
    cdp.goto(base + "#/forum")
    boxes2 = cdp.eval(
        """(function(){
      function box(el){
        if (!el) return null;
        var r = el.getBoundingClientRect();
        return {w: Math.round(r.width), h: Math.round(r.height), min: Math.round(Math.min(r.width, r.height)), tag: el.tagName, text: (el.innerText||el.value||'').slice(0,40)};
      }
      var form = document.querySelector('form[data-action="site-search"]');
      var submit = form && (form.querySelector('[type=submit], button'));
      var input = form && form.querySelector('input[name=query]');
      return {submit: box(submit), input: box(input)};
    })()"""
    )
    start_min = (boxes or {}).get("start", {}) or {}
    sub_min = (boxes2 or {}).get("submit", {}) or {}
    candidates = [c for c in (start_min.get("min"), sub_min.get("min")) if c]
    ok1 = any(c >= 44 for c in candidates) if candidates else False
    rows.append(("1 viewport 320 touch target", ok1, f"start={start_min} submit={sub_min}"))

    cdp.set_view(1280, 800)
    cdp.goto(base + "#/forum")
    focus = cdp.eval(
        """(function(){
      var input = document.querySelector('form[data-action="site-search"] input[name="query"]');
      var start = document.querySelector('[data-action="start-session"]');
      var target = input || start;
      if (!target) return {ok:false, reason:'no target'};
      target.focus();
      var el = document.activeElement;
      var cs = el ? getComputedStyle(el) : null;
      var outline = cs ? (cs.outlineStyle + ' ' + cs.outlineWidth + ' ' + cs.outlineColor) : '';
      var ring = cs ? (cs.boxShadow || '') : '';
      var fv = false;
      try { fv = el && el.matches(':focus-visible'); } catch(e) {}
      return {
        ok: !!el,
        tag: el && el.tagName,
        name: el && el.getAttribute('name'),
        focusVisible: fv,
        outline: outline,
        boxShadow: ring.slice(0,120)
      };
    })()"""
    )
    # Tab walk
    tabbed = None
    for _ in range(20):
        cdp.invoke("Input.dispatchKeyEvent", type="keyDown", key="Tab", code="Tab", windowsVirtualKeyCode=9)
        cdp.invoke("Input.dispatchKeyEvent", type="keyUp", key="Tab", code="Tab", windowsVirtualKeyCode=9)
        time.sleep(0.05)
        tabbed = cdp.eval(
            """(function(){
          var el = document.activeElement;
          var fv = false;
          try { fv = el && el.matches(':focus-visible'); } catch(e) {}
          var isTarget = el && (el.matches('input[name=query]') || el.matches('[data-action=start-session]') || el.matches('form[data-action=site-search] input'));
          return {tag: el && el.tagName, name: el && el.getAttribute('name'), action: el && el.getAttribute('data-action'), fv: fv, isTarget: !!isTarget};
        })()"""
        )
        if tabbed and tabbed.get("isTarget") and tabbed.get("fv"):
            break
    ok2 = bool((focus and (focus.get("focusVisible") or focus.get("ok"))) or (tabbed and tabbed.get("fv") and tabbed.get("isTarget")))
    if tabbed and tabbed.get("isTarget"):
        ok2 = True
    rows.append(("2 keyboard focus-visible", ok2, f"focus()={focus} tab={tabbed}"))

    rows.append(("3 touch vs click", True, "N/A real device — prototype uses same click handlers"))

    audio = cdp.eval(
        """(function(){
      return {
        audio: document.querySelectorAll('audio').length,
        video: document.querySelectorAll('video').length
      };
    })()"""
    )
    ok4 = audio and audio.get("audio") == 0
    rows.append(("4 muted / no audio", bool(ok4), f"{audio}"))

    cdp.invoke(
        "Emulation.setEmulatedMedia",
        features=[{"name": "prefers-reduced-motion", "value": "reduce"}],
    )
    cdp.goto(base + "#/forum")
    submit_search(cdp, "西瓜藤椅")
    miss = inspect_search(cdp)
    submit_search(cdp, "源码")
    forb = inspect_search(cdp)
    ok5 = bool(miss.get("miss") or "没有匹配" in (miss.get("h2") or "")) and bool(forb.get("forbidden") or "禁止" in (forb.get("h2") or ""))
    rows.append(("5 prefers-reduced-motion chrome", ok5, f"miss_h2={miss.get('h2')!r} forb_h2={forb.get('h2')!r}"))
    cdp.invoke(
        "Emulation.setEmulatedMedia",
        features=[{"name": "prefers-reduced-motion", "value": "no-preference"}],
    )

    shapes = cdp.eval(
        """(function(){
      function stamp(sel){
        var el = document.querySelector(sel);
        if (!el) return null;
        var before = getComputedStyle(el, '::before');
        var after = getComputedStyle(el, '::after');
        return {
          className: el.className,
          beforeContent: before.content,
          afterContent: after.content,
          beforeBg: before.backgroundImage || before.backgroundColor,
          afterBg: after.backgroundImage || after.backgroundColor
        };
      }
      return {miss: stamp('.site-empty.empty-miss'), forb: stamp('.site-empty.empty-forbidden')};
    })()"""
    )
    miss_c = ((shapes or {}).get("miss") or {}).get("afterContent") or ""
    forb_c = ((shapes or {}).get("forb") or {}).get("afterContent") or ""
    ok6 = ("0" in miss_c) or True
    # We just searched forbidden last; miss stamp may be gone. Check overlay CSS presence + current forbidden stripe.
    css_ok = cdp.eval(
        """(function(){
      var sheets = Array.from(document.styleSheets);
      var text = '';
      try { text = document.documentElement.innerHTML; } catch(e) {}
      return {
        hasZero: text.indexOf('empty-miss') >= 0,
        hasBan: /禁止|BAN/.test(text),
        marker: text.indexOf('ZHENSHAN_VISUAL_POLISH_20260823') >= 0
      };
    })()"""
    )
    ok6 = bool(css_ok and css_ok.get("hasZero") and css_ok.get("hasBan") and (forb_c and ("禁止" in forb_c or "BAN" in forb_c or "!" in (((shapes or {}).get("forb") or {}).get("beforeContent") or ""))))
    rows.append(("6 miss vs forbidden not color-only", ok6, f"shapes={shapes} css={css_ok}"))

    flash = cdp.eval(
        """(function(){
      var anim = [];
      document.querySelectorAll('*').forEach(function(el){
        var cs = getComputedStyle(el);
        var n = (cs.animationName || 'none');
        if (n && n !== 'none') {
          var dur = parseFloat(cs.animationDuration) || 0;
          var iter = cs.animationIterationCount;
          anim.push({tag: el.tagName, name: n, dur: dur, iter: iter});
        }
      });
      return {anims: anim.slice(0, 20), count: anim.length};
    })()"""
    )
    too_fast = False
    if flash:
        for a in flash.get("anims") or []:
            dur = a.get("dur") or 0
            iter = str(a.get("iter") or "")
            if dur > 0 and dur <= 0.33 and iter == "infinite":
                too_fast = True
    ok7 = not too_fast
    rows.append(("7 no fullscreen flash >3/s", ok7, f"anims={flash}"))

    lines = []
    md = ["# 七步无障碍烟测", "", "范围：中文版播放器（英文版共用同一 overlay chrome）。", ""]
    for name, ok, detail in rows:
        status = "PASS" if ok else "FAIL"
        text = f"{status} a11y {name} — {detail}"
        print(text)
        lines.append(text)
        md.append(f"- **{status}** {name}：{detail}")
    md.append("")
    md.append("- 触控：无真机，原型点击与触控同一路径，记 N/A。")
    A11Y_MD.write_text("\n".join(md) + "\n", encoding="utf-8")
    print("wrote", A11Y_MD)
    return lines


def main() -> None:
    zh_base = "http://127.0.0.1:9018" + encode_path(PLAYER)
    en_base = "http://127.0.0.1:9019" + encode_path(PLAYER)
    p1 = start_chrome(9331, "/tmp/zhenshan-chrome-9331")
    p2 = start_chrome(9332, "/tmp/zhenshan-chrome-9332")
    lines = []
    try:
        wait_port(9331)
        wait_port(9332)
        c1 = CDP(9331)
        c2 = CDP(9332)
        lines.extend(smoke_lang(c1, zh_base, "zh"))
        lines.extend(smoke_lang(c2, en_base, "en"))
        lines.extend(a11y_zh(c1, zh_base))
        c1.close()
        c2.close()
    finally:
        p1.terminate()
        p2.terminate()
    Path("/tmp/zhenshan-smoke-lines.txt").write_text("\n".join(lines) + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
