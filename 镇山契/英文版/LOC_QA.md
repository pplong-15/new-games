# Localization QA — Mountain-Garrison Compact: Ninth Visitor

Source snapshot: `相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html` after Gate L apply (2026-08-21). Chinese original was copied read-only from `/Users/Zhuanz/Desktop/新游戏/镇山契/` into this English work folder; the Chinese tree was not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on this file after skipping `data:` SVG payloads, the hidden `searchKeywords` alias block, and `.zh-artifact` spans.

| Gate | Result | Notes |
|---|---|---|
| Player-visible Han outside allowlist | **PASS** | Python scan: **0** Han (`\u4e00`–`\u9fff`) outside SVG / aliases / artifacts |
| `html lang` / title | **PASS** | `lang="en"`; title `Mountain-Garrison Compact: Ninth Visitor \| fictional playable prototype` |
| Save-key isolation | **PASS** | `zhenshan_webgame_v0_3_en_state_v1` only; Chinese `…_cn_state_v1` absent |
| `classifyHanWord` | **PASS** | Accepts `[\u4e00-\u9fff]+` **or** `[A-Za-z][A-Za-z0-9]*`; whitespace / `\u3000` = multi-word reject |
| Search lookup | **PASS** | Case-insensitive `queries` match |
| Search inputs | **PASS** | Five site `<input type="search">` have `maxlength="32"` (two extra `input[type="search"]` hits are CSS selectors) |
| First word **AShan** | **PASS** | On handover brief (`First word: AShan`) and workbench instruction; `阿山` only inside `.zh-artifact` |
| English tokens on pages | **PASS** | AShan / Huaishu / Ninth / IceBlock / SoleActor / NegBag / Migration / MainHall / WheelLamp / NightWatch / Overwrite / Negatives / ThreeNights / Landslide / NorthSlope / OldTemple present as extractable single tokens |
| Chinese aliases kept | **PASS** | Hidden `searchKeywords` still list 阿山 / 槐树村 / 第九个 / 冰块 / 源码 / 管理员密码 / 唯一行为人 / 底片袋 / 迁移 / 正殿 / 轮灯 / 守更 / 覆写 / 底片 / 三宿 / 滑坡 / 北坡 / 旧庙 |
| Option / correct values | **PASS** | ZhaoChenghai … PatrolClerk / FangXiaohe / DengMei / XuYousheng / LinWen; `eastName=FangXiaohe` |
| JS parse | **PASS** | `node --check` on all three `<script>` blocks after `data:` strip |
| Evidence hedges | **PASS** (source spot-check) | SoleActor link “ruled out” ≠ legal no-responsibility; third-night coincidence stays conditional; QC-447 submits advice only |
| How-to / stub | **PASS** | `怎么玩.txt` and `上线版/index.html` are English; stub `lang="en"`; same relative redirect |

## Unproven gates (do not mix with PASS)

These were **not** run on this snapshot.

- **English-only live playthrough** (browser-robot or human): not walked. Search gate and first word are machine-visible; B01–B18 panels, false paths F01–F05, and endings A/B were not clicked through.
- **file:// vs http host**: not compared.
- **Screen reader / a11y**: chrome `aria-label`s are English; no NVDA/VoiceOver pass.
- **Register read-aloud**: forum / archive / geology voices were spot-checked in source, not by a second reader.
- **SVG scan pixels**: embedded SVG `data:` titles/desc may still encode Chinese as image evidence. Not DOM text. English `alt` / caption are the operable layer.
- **Chinese save import**: English key must not read `zhenshan_webgame_v0_3_cn_state_v1`. Not tested in a browser with both editions open.
- **Hyphen tokens**: engine still maps `-` / `—` to spaces; `Ice-Block` should miss. Not live-tested.

## Allowlisted remaining Han

| Location | Glyph | Role |
|---|---|---|
| Workbench handover instruction | 阿山 | ZH-NAME artifact beside **AShan** |
| Forum avatar | 槐 | ZH-BRAND |
| Archive seal | 槐档 | ZH-BRAND (`HX Archives`) |
| `searchKeywords` | listed aliases | hidden compatibility only |
| SVG `data:` payloads | scan titles / paper glyphs | image evidence |

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only search-chain pass (AShan → forum thread → later sites → workbench advice) is marked separately.

Inventory helpers under `_loc/` are working files, not a second playable.
