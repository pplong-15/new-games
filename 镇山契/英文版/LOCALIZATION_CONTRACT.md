# English Localization Contract — Mountain-Garrison Compact: Ninth Visitor

Full spoilers. Gate L transcreation for the v0.3 real-web / visual-evidence build. The Chinese runtime remains the source of truth. This edition does not invent plot, add supernatural proof, or “fix” the Chinese story.

## Positioning

Working title: **Mountain-Garrison Compact: Ninth Visitor** (镇山契：第九位到访者).

The edition must read as an English-language records-QC shift *inside* a Chinese county digital-review desk. The player is QC-447 on work order `QA-26-0813-447`. They read a handover sheet, pull **one word**, search public sites (forum / archive / folk / news / geology), and later return to the workbench. They are **not** an approver and **not** the owner of original artifacts.

Registers stay split:

- **Workbench / QC chrome**: bureaucratic, dry, permission-bounded (`Advice only`, `Read-only digital copies`).
- **Huaishui Locals (BBS)**: messy 2000s mirror English; missing timestamps; unsigned floors.
- **Archive catalog**: dry finding-aid voice; open-catalog is not an open body.
- **Folk hobby site**: editor notes, errata, variants copied as found.
- **Old-paper library**: restrained lede; OCR is locator only.
- **Geology desk**: technical; coordinate / elevation / section before any through-cut claim.

The player solves source layers, identity conjunction, and disposition *advice* — not a Chinese literacy test.

## Evidence limits (do not inflate)

- The old-index **SoleActor** hang on AShan is **ruled out**. That is not legal exoneration and not a finding that no one acted.
- Still on scene ≠ able to reach the violence action zones.
- Bridge-head M1 is an unregistered man at 23:44 walking out of the village. These pages cannot join him to U1, MainHall, or the behind-wall space.
- U1 identity conjunction can confirm Lin Wen. Adult-death assignment and the outside bar drop stay unresolved.
- Three children are renamed separately (Fang Xiaohe / Deng Mei / Xu Yousheng). Cause of death, actor, and ritual motive are **not established by these sources**.
- 1964 is adult mutual NightWatch rotation. Later Overwrite damaged household / rotation / withdraw. “Humans rewrote it” is not “so the compact is void.”
- Guard tally and tail voucher can share a number group. That cannot confirm U1 understood, agreed to, or took folk watch.
- Third-night / first-report coincidence is **conditional**: if the 23:26 leaver actually held the tally and there was no next hand. Premises and extra supernatural causation stay unresolved.
- Plan A / Plan B are live disposition *suggestions*. QC-447 has no approval, reception, or original-object handling power. Finishing either plan does not prove the compact was withdrawn or that the children were released.

Use the three hedges: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`. Absence of proof is not exoneration.

## Retained-Chinese allowlist

Player-visible DOM Han outside this list is a defect.

| Tag | Where | Bridge |
|---|---|---|
| ZH-NAME | Handover sheet: `阿山` next to first word **AShan** | `.zh-artifact` + `.artifact-translation` |
| ZH-BRAND | Forum avatar `槐`; archive seal `槐档` | HX / HX Archives |
| ZH-FRONT | Chinese glyphs *inside* embedded SVG scan payloads | pixels only; English `alt` / caption carry the readable layer |

Hidden `searchKeywords` keep Chinese aliases (`阿山`, `槐树村`, `第九个`, `冰块`, `源码`, `管理员密码`, `唯一行为人`, `底片袋`, `迁移`, `正殿`, `轮灯`, `守更`, `覆写`, `底片`, `三宿`, `滑坡`, `北坡`, `旧庙`) for compatibility. They are not the player-facing first words.

## Names and terms

Surname-first romanization in running prose. Search tokens are **single CamelCase tokens with no spaces and no hyphens** (`normalizeQuery` turns hyphens into spaces, and whitespace is a multi-word reject).

| Source | Prose | Search token |
|---|---|---|
| 阿山 | A Shan | **AShan** (first word) |
| 槐树村 | Huaishu village | Huaishu |
| 第九个 | the ninth | Ninth |
| 冰块 | ice block | IceBlock |
| 唯一行为人 | sole actor | SoleActor |
| 底片袋 | negatives bag | NegBag |
| 迁移 | migration (catalog hang) | Migration |
| 正殿 | main hall | MainHall |
| 轮灯 | wheel-lamp | WheelLamp |
| 守更 | night watch | NightWatch |
| 覆写 | overwrite layer | Overwrite |
| 底片 | negatives | Negatives |
| 三宿 | three night-watches (not “three days”) | ThreeNights |
| 滑坡 | landslide | Landslide |
| 北坡 | north slope | NorthSlope |
| 旧庙 | old temple | OldTemple |
| 镇山契 | Mountain-Garrison Compact | — |
| 人间存券 | human voucher | — |
| 告山副券 | mountain-notice counterpart | — |
| 守牌 | guard tally | — |
| 交牌 | tally handover | — |

People (search / option values, no spaces): ZhaoChenghai, LiuQingyu, ZhangDafu, LiYouye, ZhouShouyi, SunGuilan, LinQing, LinWen, FangXiaohe, DengMei, XuYousheng, PatrolClerk.

Do not merge ThreeNights with “three days”. Do not merge WheelLamp with ordinary lamps. Do not merge NegBag with generic “bag.”

## Technical contract

- Playable file: `相关素材与可玩版/镇山契_第九位到访者_v0_3_真实网页与可视证据版.html`. Stub: `上线版/index.html`. How-to: `怎么玩.txt`.
- `html lang="en"`. Title: `Mountain-Garrison Compact: Ninth Visitor | fictional playable prototype`.
- IDs, dates, routes, token/fact IDs, SHA, image paths, CSS layout, and ending graph unchanged.
- Independent save key (do not read the Chinese save):

| Chinese | English |
|---|---|
| `zhenshan_webgame_v0_3_cn_state_v1` | `zhenshan_webgame_v0_3_en_state_v1` |

- `classifyHanWord` accepts Han **or** a single Latin token `[A-Za-z][A-Za-z0-9]*`. Whitespace / ideographic space = multi-word reject.
- `searchRecords` lookup is case-insensitive. Chinese aliases remain.
- All five site search inputs: `maxlength="32"`.
- First word **AShan** is plain text on the handover brief and repeated in the workbench instruction (with `阿山` wrapped as artifact in the unescaped template).
