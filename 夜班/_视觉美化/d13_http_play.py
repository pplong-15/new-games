#!/usr/bin/env python3
"""D13 rework: 7-night clerk path via public UI only. No ?debug, no __ns, no state writes."""
from __future__ import annotations

import json
import os
import re
import shutil
import tempfile
import time
import traceback
from pathlib import Path

from playwright.sync_api import TimeoutError as PWTimeout
from playwright.sync_api import sync_playwright

ROOT = Path("/Users/jianglong/Desktop/游戏美化/夜班/_视觉美化")
VIS = ROOT / "visual" / "html-game-rule-horror"
REJECT = ROOT / "rejected-evidence" / "d13-debug-contaminated"
LOG_PATH = ROOT / "d13-play-log.json"
CHROME = "/Users/jianglong/Library/Caches/ms-playwright/chromium-1234/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing"

ZH = {
    "id": "zh",
    "port": 9216,
    "file": "夜班.html",
    "save": "hengdeng-nightshift-v2",
    "out": VIS / "20260823-zh",
    "new_game": "去上夜班",
    "start_shift": "开始值班",
    "sms": "知道了",
    "next_night": ["先睡到傍晚", "看看后来"],
    "rules_btn": "规",
    "rules_close": "收好",
    "to_title": "返回标题",
    "cat_view": "猫视角",
    "mute_on": "静",
    "continue_hint": ("继续",),
    "items": {
        "tea": "冰红茶",
        "noodles": "红烧牛肉面",
        "water": "矿泉水",
        "bread": "手撕面包",
        "cigs": "红塔山",
        "incense": "檀香",
        "battery": "五号电池",
        "milk": "纯牛奶",
        "candle": "蜡烛",
    },
    "stock_re": r"库存\s+(\d+)",
    "nights": {
        1: [
            ("shot_lin", None),
            ("卖给她（牛奶 + 面包 ¥11）", "03-success-slip"),
            ("卖给他（烟 + 冰红茶 ¥22）", None),
            ("展开纸条", None),
            ("shot_rules_full", None),
            ("卖方便面（¥6）", None),
            ("near_fail_wet", None),
            ("请他喝瓶水", None),
            ("把灯调亮，等天亮", None),
        ],
        2: [
            ("老样子，给他（¥22）", None),
            ("说没有草莓味", None),
            ("卖水+烟（¥20）", None),
            ("不卖香", None),
            ("扔掉断掉的那根", None),
            ("送她到门口", None),
        ],
        3: [
            ("让她早点回去睡", None),
            ("给她矿泉水（¥2）", None),
            ("卖水+烟（¥20）", None),
            ("不卖。请把钱收回去", None),
            ("shot_rules_n3", None),
            ("不去数", None),
            ("请他天亮再送外卖", None),
            ("wu_n3", None),
        ],
        4: [
            ("不让。后间不对外开放", None),
            ("擦柜台，听收音机", None),
            ("不热。请她拿走", None),
            ("说那是反光", None),
            ("卖给他水和烟", None),
        ],
        5: [
            ("收下桃子", None),
            ("祝她一路顺利", None),
            ("storm_or_skip", None),
            ("wang_n5", None),
            ("坐着等", None),
        ],
        6: [
            ("把账本合上", None),
            ("把纸条按回去", None),
            ("仍然不卖", None),
            ("不开。敲三下玻璃叫保安", None),
        ],
        7: [
            ("maybe_radio", None),
            ("……不说话", None),
            ("五条原文都留下", None),
            ("把钱留给下一班", None),
            ("把钥匙放下，准备天亮走", None),
            ("wang_n7", None),
            ("走到门口，等天亮", None),
        ],
    },
    "restock": {
        1: {"milk": 1, "bread": 1, "cigs": 1, "tea": 1, "noodles": 1, "battery": 1},
        2: {"cigs": 2, "tea": 1, "milk": 1, "water": 2},
        3: {"water": 3, "cigs": 1},
        4: {"water": 1, "cigs": 1},
        5: {"noodles": 2, "cigs": 1, "tea": 1},
        6: {},
        7: {},
    },
}

EN = {
    "id": "en",
    "port": 9217,
    "file": "夜班.html",
    "save": "hengdeng-nightshift-v2-en",
    "out": VIS / "20260823-en",
    "new_game": "Take the night shift",
    "start_shift": "Start shift",
    "sms": "Got it",
    "next_night": ["Sleep till evening", "See afterward"],
    "rules_btn": "RUL",
    "rules_close": "Put away",
    "to_title": "Back to title",
    "cat_view": "Cat View",
    "mute_on": "✕",
    "continue_hint": ("continue", "Continue"),
    "items": {
        "tea": "Iced tea",
        "noodles": "Braised-beef noodles",
        "water": "Bottled water",
        "bread": "Tear bread",
        "cigs": "Hongtashan",
        "incense": "Sandalwood incense",
        "battery": "AA batteries",
        "milk": "Plain milk",
        "candle": "Candles",
    },
    "stock_re": r"Stock\s+(\d+)",
    "nights": {
        1: [
            ("shot_lin", None),
            ("Sell to her (milk + bread ¥11)", "03-success-slip"),
            ("Sell to him (smokes + iced tea ¥22)", None),
            ("Unfold the slip", None),
            ("shot_rules_full", None),
            ("Sell noodles (¥6)", None),
            ("near_fail_wet", None),
            ("Offer him a water", None),
            ("Turn the lights up and wait for dawn", None),
        ],
        2: [
            ("The usual (¥22)", None),
            ("Say no strawberry", None),
            ("Sell water + smokes (¥20)", None),
            ("Don't sell incense", None),
            ("Throw the broken one out", None),
            ("Walk her to the door", None),
        ],
        3: [
            ("Tell her to go back to sleep", None),
            ("Give her bottled water (¥2)", None),
            ("Sell water + smokes (¥20)", None),
            ("Don't sell. Take the money back", None),
            ("shot_rules_n3", None),
            ("Don't count", None),
            ("Ask him to deliver after dawn", None),
            ("wu_n3", None),
        ],
        4: [
            ("No. Back room isn't public", None),
            ("Wipe the counter. Listen to the radio", None),
            ("Don't heat it. Take it back", None),
            ("Say it's a reflection", None),
            ("Sell him water and smokes", None),
        ],
        5: [
            ("Take the peaches", None),
            ("Wish her a clean trip", None),
            ("storm_or_skip", None),
            ("wang_n5", None),
            ("Sit and wait", None),
        ],
        6: [
            ("Close the ledger", None),
            ("Press the slip back", None),
            ("Still don't sell", None),
            ("Don't. Three taps, call the guard", None),
        ],
        7: [
            ("maybe_radio", None),
            ("...say nothing", None),
            ("Leave all five original lines", None),
            ("Leave the money for the next shift", None),
            ("Put the keys down. Walk out at dawn", None),
            ("wang_n7", None),
            ("Walk to the door. Wait for dawn", None),
        ],
    },
    "restock": {
        1: {"milk": 1, "bread": 1, "cigs": 1, "tea": 1, "noodles": 1, "battery": 1},
        2: {"cigs": 2, "tea": 1, "milk": 1, "water": 2},
        3: {"water": 3, "cigs": 1},
        4: {"water": 1, "cigs": 1},
        5: {"noodles": 2, "cigs": 1, "tea": 1},
        6: {},
        7: {},
    },
}

LOOK = {"zh": "多看一眼", "en": "Look again"}
SELL_ANYWAY = {"zh": "还是卖给他", "en": "Sell to him anyway"}
WET_SELL = {"zh": "卖电池（¥12）", "en": "Sell batteries (¥12)"}
WET_REFUSE = {"zh": "不卖，请他出去", "en": "Don't sell. Ask him out"}
WU_FLASH = {"zh": "记下，收下他的备用手电", "en": "Note it. Take his spare flashlight"}
WU_WARN = {"zh": "只要提醒，手电你自己留着", "en": "Just the warning. Keep the light"}
WU_OK = {"zh": "说知道了", "en": "Say you got it"}
WU_WATER = {"zh": "请他喝瓶水", "en": "Offer him a water"}
STORM2 = {"zh": "卖两桶方便面（¥12）", "en": "Sell two noodles (¥12)"}
STORM1 = {"zh": "只卖得出一桶（¥6）", "en": "Only got one (¥6)"}
WANG5_USUAL = {"zh": "老样子，烟+冰红茶（¥22）", "en": "The usual, smokes + iced tea (¥22)"}
WANG5_SELL = {"zh": "卖烟+冰红茶（¥22）", "en": "Sell smokes + iced tea (¥22)"}
WANG5_RAIN = {"zh": "让他进屋躲会儿雨", "en": "Let him come in out of the rain"}
WANG7_HERE = {"zh": "说还在，快天亮了", "en": "Say you're still here, almost dawn"}
WANG7_WATCH = {"zh": "看着他开走", "en": "Watch him drive off"}
RADIO = {"zh": "把收音机插头拔了", "en": "Unplug the radio"}
EARLY = {"zh": "提早打烊", "en": "Close early"}


def visible(loc) -> bool:
    try:
        return loc.count() > 0 and loc.first.is_visible()
    except Exception:
        return False


def text_of(loc) -> str:
    try:
        if loc.count() == 0:
            return ""
        return loc.first.inner_text().strip()
    except Exception:
        return ""


class Runner:
    def __init__(self, page, cfg, shots_note):
        self.page = page
        self.cfg = cfg
        self.shots_note = shots_note
        self.clicks = []
        self.nights = []
        self.ending = {}
        self.out = cfg["out"]
        self.out.mkdir(parents=True, exist_ok=True)

    def url_ok(self):
        u = self.page.url
        if "debug" in u.lower():
            raise RuntimeError("URL contains debug: " + u)
        return u

    def debug_hidden(self) -> bool:
        el = self.page.locator("#debug")
        if el.count() == 0:
            return True
        return not el.is_visible()

    def assert_clean(self, shot_name: str):
        self.url_ok()
        if not self.debug_hidden():
            raise RuntimeError(f"{shot_name}: #debug visible")
        if self.page.locator(".choice.warn").count():
            raise RuntimeError(f"{shot_name}: .choice.warn present")

    def shot(self, name: str, note: str):
        self.assert_clean(name)
        path = self.out / f"{name}.png"
        self.page.screenshot(path=str(path), type="png")
        self.shots_note.append(
            {
                "lang": self.cfg["id"],
                "file": name + ".png",
                "url": self.page.url,
                "input": note,
                "hud": {
                    "night": text_of(self.page.locator("#hudNight")),
                    "time": text_of(self.page.locator("#hudTime")),
                    "cash": text_of(self.page.locator("#hudCash")),
                    "who": text_of(self.page.locator("#who")),
                    "tag": text_of(self.page.locator("#tag")),
                },
                "debug_visible": False,
                "choice_warn": 0,
            }
        )
        return path

    def read_save(self):
        key = self.cfg["save"]
        return self.page.evaluate(
            """(k) => {
              try { return JSON.parse(localStorage.getItem(k) || 'null'); }
              catch (e) { return { _error: String(e) }; }
            }""",
            key,
        )

    def log_click(self, label: str):
        self.clicks.append(
            {
                "label": label,
                "who": text_of(self.page.locator("#who")),
                "night_hud": text_of(self.page.locator("#hudNight")),
                "url": self.page.url,
            }
        )

    def skip_type(self):
        """Public skip: click the line; tap Space once. Never hold Space across choices."""
        p = self.page
        if visible(p.locator("#line.typing")):
            p.locator("#line").click(force=True, timeout=2000)
        p.keyboard.press("Space")
        time.sleep(0.05)

    def maybe_continue(self) -> bool:
        hint = text_of(self.page.locator("#tapHint"))
        low = hint.lower()
        if any(h in hint or h.lower() in low for h in self.cfg["continue_hint"]):
            self.page.locator("#line").click(force=True, timeout=2000)
            time.sleep(0.08)
            return True
        return False

    def phase(self) -> str:
        p = self.page
        if visible(p.locator("#ending .ending-card, #ending h2")):
            return "ending"
        if visible(p.locator("#nextNight")):
            return "settle"
        if visible(p.locator("#startShift")):
            return "prep"
        if visible(p.locator("#smsOk")):
            return "phone"
        if visible(p.locator("#rulesClose")):
            return "rules"
        if visible(p.locator("#stockClose")):
            return "stock"
        if visible(p.locator("#title #newGame")):
            return "title"
        if visible(p.locator("#line.typing")):
            return "typing"
        if p.locator("#choices button.choice").count() > 0 and visible(
            p.locator("#choices button.choice").first
        ):
            return "choices"
        hint = text_of(p.locator("#tapHint"))
        if hint:
            return "hint"
        return "other"

    def wait_playable(self, timeout=25000) -> str:
        deadline = time.time() + timeout / 1000
        last = ""
        while time.time() < deadline:
            try:
                ph = self.phase()
            except Exception:
                ph = "err"
            last = ph
            if ph == "typing":
                self.skip_type()
                time.sleep(0.05)
                continue
            if ph == "hint":
                if self.maybe_continue():
                    time.sleep(0.08)
                    continue
                self.skip_type()
                time.sleep(0.05)
                continue
            if ph in (
                "choices",
                "prep",
                "phone",
                "settle",
                "ending",
                "title",
                "rules",
                "stock",
            ):
                return ph
            time.sleep(0.08)
        raise RuntimeError(f"wait_playable timeout last={last} url={self.page.url}")

    def choice_labels(self):
        labs = []
        btns = self.page.locator("#choices button.choice")
        n = btns.count()
        for i in range(n):
            t = btns.nth(i).inner_text().strip().split("\n")[0]
            labs.append(t)
        return labs

    def click_choice(self, label: str, allow_missing=False) -> bool:
        ph = self.wait_playable()
        if ph != "choices":
            if allow_missing:
                return False
            raise RuntimeError(f"want choice {label!r} but phase={ph} labels={self.choice_labels()}")
        labs = self.choice_labels()
        # skip early-close unless requested
        btn = None
        btns = self.page.locator("#choices button.choice")
        for i in range(btns.count()):
            raw = btns.nth(i).inner_text().strip()
            head = raw.split("\n")[0]
            if EARLY["zh"] in head or EARLY["en"] in head:
                if label not in head:
                    continue
            if head == label or raw.startswith(label) or label in head:
                btn = btns.nth(i)
                break
        if btn is None:
            if allow_missing:
                return False
            raise RuntimeError(f"missing choice {label!r} have {labs}")
        self.log_click(label)
        btn.click(timeout=4000)
        time.sleep(0.15)
        return True

    def click_one_of(self, labels, required=True) -> str | None:
        self.wait_playable()
        labs = self.choice_labels()
        for lab in labels:
            if any(lab == h or lab in h or h.startswith(lab) for h in labs):
                self.click_choice(lab)
                return lab
        if required:
            raise RuntimeError(f"none of {labels} in {labs}")
        return None

    def restock(self, night: int):
        ph = self.wait_playable()
        if ph != "prep":
            raise RuntimeError(f"restock expected prep, got {ph}")
        want = self.cfg["restock"].get(night, {})
        items = self.cfg["items"]
        for key, target in want.items():
            name = items[key]
            for _ in range(12):
                row = self.page.locator("#prepLedger .row").filter(has_text=name).first
                if row.count() == 0:
                    raise RuntimeError("no row " + name)
                body = row.inner_text()
                m = re.search(self.cfg["stock_re"], body)
                cur = int(m.group(1)) if m else -1
                if cur >= target:
                    break
                plus = row.locator("button").nth(1)
                plus.click(timeout=3000)
                time.sleep(0.06)
            else:
                raise RuntimeError(f"could not restock {name} to {target}")
        self.log_click(f"[restock n{night} {want}]")

    def start_shift(self):
        self.page.locator("#startShift").click(timeout=4000)
        self.log_click(self.cfg["start_shift"])
        time.sleep(0.1)

    def sms_ok(self):
        ph = self.wait_playable()
        if ph == "phone":
            self.page.locator("#smsOk").click(timeout=4000)
            self.log_click(self.cfg["sms"])
            time.sleep(0.1)

    def settle_next(self):
        ph = self.wait_playable()
        if ph != "settle":
            raise RuntimeError("expected settle got " + ph)
        save = self.read_save() or {}
        self.nights.append(
            {
                "hud": text_of(self.page.locator("#settle h2")),
                "save_night": save.get("night"),
                "sanity": save.get("sanity"),
                "cash": save.get("cash"),
                "rep": save.get("rep"),
                "cat": save.get("cat"),
                "flags": sorted(k for k, v in (save.get("flags") or {}).items() if v),
                "foundRules": save.get("foundRules"),
                "url": self.page.url,
            }
        )
        self.page.locator("#nextNight").click(timeout=4000)
        self.log_click("#nextNight")
        time.sleep(0.15)

    def open_rules_shot(self, name: str, note: str):
        self.wait_playable()
        self.page.locator("#rulesBtn").click(timeout=4000, force=True)
        self.log_click("[rules]")
        self.page.locator("#rulesClose").wait_for(state="visible", timeout=4000)
        time.sleep(0.15)
        self.shot(name, note)
        self.page.locator("#rulesClose").click(timeout=4000)
        time.sleep(0.1)

    def set_viewport(self, w, h):
        self.page.set_viewport_size({"width": w, "height": h})
        time.sleep(0.15)

    def boot_shots(self):
        p = self.page
        p.goto(f"http://127.0.0.1:{self.cfg['port']}/{self.cfg['file']}", wait_until="domcontentloaded")
        p.locator("#newGame").wait_for(state="visible", timeout=15000)
        self.assert_clean("boot")
        # 11 empty title / 01 title 390
        self.shot("11-empty-or-loading", "无存档打开标题；结局图鉴未通关故隐藏")
        self.shot("01-boot-title", "无 query 打开标题 390×844，点前")
        self.set_viewport(320, 640)
        self.shot("01-boot-title-320", "同一标题缩到 320×640")
        self.set_viewport(390, 844)
        # 12 locked cat view
        p.locator("#catViewToggle").click(force=True)
        p.locator("#toast").wait_for(state="visible", timeout=4000)
        time.sleep(0.25)
        self.shot("12-error-or-pause", "点锁定猫视角，toast 真实运行反馈")

    def enter_game(self):
        self.page.locator("#newGame").click(timeout=4000)
        self.log_click(self.cfg["new_game"])
        self.page.locator("#startShift").wait_for(state="visible", timeout=15000)

    def lin_pack(self):
        """Night 1 first customer: generic 12 + type frames."""
        self.wait_playable()
        if self.phase() != "choices":
            raise RuntimeError("lin pack not choices: " + self.phase())
        self.shot("02-core-verb", "第1晚林阿姨选项同屏，主动词：对照接待/售卖")
        self.shot("08-touch-targets", "390 触控，选项与货/规同屏")
        self.shot("13-person-job-rule", "人物+熟客标签+规钮同屏")
        self.shot("20-shift-flags-hud", "HUD 时间/晚/神智，无 XP 条")
        # keyboard focus
        mute = self.page.locator("#muteBtn")
        mute.focus()
        for _ in range(16):
            self.page.keyboard.press("Tab")
            time.sleep(0.05)
            focused = self.page.locator("#choices button.choice:focus")
            if focused.count():
                break
        self.shot("07-keyboard-focus", "Tab 落到 .choice，:focus-visible")
        # mute
        self.page.locator("#muteBtn").dispatch_event("click")
        time.sleep(0.15)
        mute_txt = self.page.locator("#muteBtn").inner_text().strip()
        if mute_txt not in ("静", "✕"):
            raise RuntimeError("mute did not toggle, text=" + mute_txt)
        self.shot("09-muted", "点静音钮后面文变为静/✕（真实 click 事件）")
        # 320 in shift
        self.set_viewport(320, 640)
        self.shot("06-narrow-320-in-shift", "值班中缩到 320，选项仍可点")
        self.set_viewport(390, 844)
        # 19 rules before unfold
        self.open_rules_shot("19-night1-rules", "第1晚尚未展开纸条，规页条目为省略")

    def near_fail_wet(self):
        self.wait_playable()
        labs = self.choice_labels()
        look = LOOK[self.cfg["id"]]
        sell_anyway = SELL_ANYWAY[self.cfg["id"]]
        if not any(look in x or x == look for x in labs):
            raise RuntimeError("wet-hair missing look: " + str(labs))
        # photograph dangerous options as rendered (no .warn)
        self.shot("04-near-fail-options", "湿发男人真实选项（卖电池/不卖/多看一眼），无 .choice.warn")
        self.click_choice(look)
        self.wait_playable()
        self.click_choice(sell_anyway)
        # wait then-text
        deadline = time.time() + 8
        while time.time() < deadline:
            if visible(self.page.locator("#line.typing")):
                self.skip_type()
            line = text_of(self.page.locator("#line"))
            if line and not visible(self.page.locator("#line.typing")):
                break
            time.sleep(0.05)
        time.sleep(0.2)
        self.shot("04-near-fail", "点「还是卖给他/Sell to him anyway」后的 then 文案+HUD，真实反馈")
        # continue to next customer
        self.wait_playable()
        if self.phase() in ("hint", "typing"):
            self.maybe_continue()
            self.skip_type()
        self.wait_playable()
        self.shot("05-recover", "近失败后仍在值班（吴保安或下一拍）")

    def shot_rules_full(self):
        self.open_rules_shot("14-rules-listed", "第1晚展开纸条后打开规，≥4 条全文")
        self.open_rules_shot("18-near-answer-text", "同一张规页，正文可回指「纸钱/灯」")
        self.open_rules_shot("10-non-color-state", "第1晚规页：编号+省略已展开的文字，不唯色")

    def shot_rules_n3(self):
        self.open_rules_shot("15-ink-fresh-pencil", "第3晚真实打开规：后添墨+铅笔旁注")
        self.open_rules_shot("16-fake-mutex-qa", "N/A：未把同一段改成两个标题；本帧为第3晚真实规页")

    def special(self, token: str):
        lang = self.cfg["id"]
        if token == "shot_lin":
            self.lin_pack()
            return
        if token == "shot_rules_full":
            self.shot_rules_full()
            return
        if token == "shot_rules_n3":
            self.shot_rules_n3()
            return
        if token == "near_fail_wet":
            self.near_fail_wet()
            return
        if token == "wu_n3":
            picked = self.click_one_of(
                [WU_FLASH[lang], WU_WARN[lang], WU_WATER[lang], WU_OK[lang]],
                required=True,
            )
            self.log_click("[wu_n3 -> " + str(picked) + "]")
            return
        if token == "storm_or_skip":
            self.wait_playable()
            if self.phase() != "choices":
                return
            labs = self.choice_labels()
            if any(STORM2[lang] in x or x.startswith(STORM2[lang][:6]) for x in labs):
                self.click_one_of([STORM2[lang], STORM1[lang]])
            # else not storm, next token handles wang
            return
        if token == "wang_n5":
            self.wait_playable()
            self.click_one_of(
                [WANG5_USUAL[lang], WANG5_SELL[lang], WANG5_RAIN[lang]],
                required=True,
            )
            return
        if token == "wang_n7":
            self.wait_playable()
            if self.phase() != "choices":
                return
            self.click_one_of([WANG7_HERE[lang], WANG7_WATCH[lang]], required=True)
            return
        if token == "maybe_radio":
            self.wait_playable()
            if self.phase() == "choices":
                labs = self.choice_labels()
                if any(RADIO[lang] in x or x == RADIO[lang] for x in labs):
                    self.click_choice(RADIO[lang])
            return
        raise RuntimeError("unknown token " + token)

    def run_night(self, n: int):
        ph = self.wait_playable()
        if ph != "prep":
            raise RuntimeError(f"night {n} expected prep got {ph}")
        if n == 1:
            self.shot("17-group-submit-prep", "第1晚进货面板，点开始值班前")
        self.restock(n)
        self.start_shift()
        self.sms_ok()
        # night 6 has a second phone later; handled as phase in the loop
        for token, extra_shot in self.cfg["nights"][n]:
            ph = self.wait_playable()
            if ph == "phone":
                self.sms_ok()
                ph = self.wait_playable()
            if ph == "settle":
                # night ended before remaining tokens (optional storm etc.)
                break
            if ph == "ending":
                break
            if token in (
                "shot_lin",
                "shot_rules_full",
                "shot_rules_n3",
                "near_fail_wet",
                "wu_n3",
                "storm_or_skip",
                "wang_n5",
                "wang_n7",
                "maybe_radio",
            ):
                self.special(token)
            else:
                self.click_choice(token, allow_missing=(n == 5 and token in (STORM2[self.cfg["id"]],)))
                if extra_shot == "03-success-slip":
                    time.sleep(0.35)
                    self.shot("03-success-slip", "点卖出后小票/收银反馈")
            # drain continue/phone
            for _ in range(4):
                ph = self.wait_playable()
                if ph == "phone":
                    self.sms_ok()
                    continue
                if ph in ("hint", "typing"):
                    self.skip_type()
                    self.maybe_continue()
                    continue
                break
        ph = self.wait_playable()
        while ph not in ("settle", "ending"):
            if ph == "phone":
                self.sms_ok()
            elif ph == "choices":
                # leftover unexpected beat — do not guess; dump
                raise RuntimeError(f"night {n} leftover choices {self.choice_labels()}")
            elif ph in ("hint", "typing"):
                self.skip_type()
                self.maybe_continue()
            else:
                break
            ph = self.wait_playable()
        if ph == "settle":
            self.settle_next()

    def play(self):
        self.boot_shots()
        self.enter_game()
        for n in range(1, 8):
            self.run_night(n)
        ph = self.wait_playable(timeout=20000)
        if ph != "ending":
            # night 7 settle already clicked See afterward
            ph = self.wait_playable()
        if ph != "ending":
            raise RuntimeError("no ending, phase=" + ph)
        title = text_of(self.page.locator("#ending h2"))
        kind = text_of(self.page.locator("#ending .kind"))
        body = text_of(self.page.locator("#ending"))
        self.ending = {"title": title, "kind": kind, "body_head": body[:240], "url": self.page.url}
        self.page.evaluate(
            """() => {
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
              const e = document.getElementById('ending');
              if (e) e.scrollTop = 0;
              const card = e && e.querySelector('.ending-card');
              if (card) {
                card.scrollTop = 0;
                if (card.parentElement) card.parentElement.scrollTop = 0;
              }
            }"""
        )
        time.sleep(0.2)
        path = self.out / "21-clerk-ending-dawn.png"
        self.page.locator("#ending .ending-card").screenshot(path=str(path), type="png")
        self.assert_clean("21-clerk-ending-dawn")
        self.shots_note.append(
            {
                "lang": self.cfg["id"],
                "file": "21-clerk-ending-dawn.png",
                "url": self.page.url,
                "input": "七晚公开路径后截 .ending-card 全卡（含标题，非 finish API）",
                "hud": {
                    "night": text_of(self.page.locator("#hudNight")),
                    "time": text_of(self.page.locator("#hudTime")),
                    "cash": text_of(self.page.locator("#hudCash")),
                    "who": text_of(self.page.locator("#who")),
                    "tag": text_of(self.page.locator("#tag")),
                },
                "debug_visible": False,
                "choice_warn": 0,
            }
        )
        self.page.locator("#toTitle").click(timeout=4000)
        self.page.locator("#newGame").wait_for(state="visible", timeout=8000)
        self.shot("22-role-line", "dawn 后返回标题：真实解锁态（dawn 不解锁其他身份；猫视角可因通关解锁）")
        save = self.read_save()
        self.ending["save_after"] = save
        self.ending["cleared"] = self.page.evaluate(
            "(k) => localStorage.getItem(k)",
            "hengdeng-cleared" if self.cfg["id"] == "zh" else "hengdeng-cleared-en",
        )


def move_contaminated():
    REJECT.mkdir(parents=True, exist_ok=True)
    if any(REJECT.rglob("*.png")):
        return []
    moved = []
    for lang in ("20260823-zh", "20260823-en"):
        src = VIS / lang
        dest = REJECT / lang
        dest.mkdir(parents=True, exist_ok=True)
        if not src.exists():
            continue
        for p in src.iterdir():
            if not p.suffix == ".png":
                continue
            if p.name.endswith("-before.png"):
                continue
            target = dest / p.name
            if target.exists():
                target.unlink()
            shutil.move(str(p), str(target))
            moved.append(f"{lang}/{p.name}")
    return moved


def play_lang(p, cfg, shots_note):
    last_err = None
    for attempt in (1, 2):
        browser = None
        ctx = None
        profile = tempfile.mkdtemp(prefix=f"d13-{cfg['id']}-a{attempt}-")
        try:
            browser = p.chromium.launch(
                executable_path=CHROME,
                headless=True,
                args=["--disable-dev-shm-usage"],
            )
            ctx = browser.new_context(
                viewport={"width": 390, "height": 844},
                device_scale_factor=2,
                has_touch=True,
                is_mobile=True,
                locale="zh-CN" if cfg["id"] == "zh" else "en-US",
            )
            page = ctx.new_page()
            page.set_default_timeout(12000)
            run = Runner(page, cfg, shots_note)
            run.play()
            ctx.close()
            browser.close()
            shutil.rmtree(profile, ignore_errors=True)
            return run, attempt, None
        except Exception as e:
            last_err = {"attempt": attempt, "error": str(e), "trace": traceback.format_exc()}
            try:
                if ctx and ctx.pages:
                    page = ctx.pages[0]
                    fail = ROOT / f"d13-fail-{cfg['id']}-a{attempt}.png"
                    page.screenshot(path=str(fail))
                    last_err["fail_shot"] = str(fail)
                    last_err["fail_url"] = page.url
                    last_err["fail_choices"] = page.locator("#choices").inner_text() if page.locator("#choices").count() else ""
                    last_err["fail_line"] = page.locator("#line").inner_text() if page.locator("#line").count() else ""
                    last_err["fail_who"] = page.locator("#who").inner_text() if page.locator("#who").count() else ""
            except Exception as e2:
                last_err["fail_extra"] = str(e2)
            try:
                if ctx:
                    ctx.close()
            except Exception:
                pass
            try:
                if browser:
                    browser.close()
            except Exception:
                pass
            shutil.rmtree(profile, ignore_errors=True)
            if attempt == 2:
                return None, attempt, last_err
    return None, 2, last_err


def main():
    moved = move_contaminated()
    shots_note = []
    report = {"moved_to_rejected": moved, "langs": {}}
    with sync_playwright() as p:
        for cfg in (ZH, EN):
            run, attempt, err = play_lang(p, cfg, shots_note)
            if run is None:
                report["langs"][cfg["id"]] = {"status": "HOLD", "attempts": attempt, "error": err}
            else:
                dawn_ok = False
                title = (run.ending or {}).get("title") or ""
                dawn_ok = title in ("正常下班", "Clock out")
                report["langs"][cfg["id"]] = {
                    "status": "OK" if dawn_ok else "HOLD_WRONG_ENDING",
                    "attempts": attempt,
                    "clicks": run.clicks,
                    "nights": run.nights,
                    "ending": run.ending,
                    "dawn_title_ok": dawn_ok,
                }
    report["shots"] = shots_note
    LOG_PATH.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    print(json.dumps({k: report[k] if k != "langs" else {lk: {sk: sv for sk, sv in lv.items() if sk not in ("clicks",)} for lk, lv in report["langs"].items()} for k in report if k != "shots"}, ensure_ascii=False, indent=2))
    # exit code
    bad = any(v.get("status") != "OK" for v in report["langs"].values())
    raise SystemExit(1 if bad else 0)


if __name__ == "__main__":
    main()
