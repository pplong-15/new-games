# English Localization Contract — Three Doors at Qingming

Full spoilers. Gate L transcreation for 清明三门. The Chinese runtime remains the source of truth. This edition does not invent plot, prove a ghost burn, merge the martyrs' terrace with Plot 12, teach a field-burning method, or let the night desk change a reservation.

## Positioning

Working title: **Three Doors at Qingming** (清明三门).

The edition must read as an English-language night shift *inside* a Chinese county cemetery reservation desk. The player is night clerk **Hang Shu**. Tonight, before 05:00 handover, he must file one **duty remark** on a neighbor-ash complaint. The desk does not approve original offerings, does not change reservation numbers, and does not wave a private grave through on a martyr code.

The loop is Blue-Prince-shaped: one shift opens at most **three household doors**; papers not opened are pulled back at handover; **verified** sentences stay on the whiteboard; **seen** is not the same as verified. The player solves provenance / identity / chronology / rule-meaning: what the ash on the Plot 12 boundary is, where the reservation code went, where the offerings were put down, and how far a night clerk’s remark may go. It is not a Chinese literacy test, not a tourist Qingming tour, and not a ghost-hunt.

Registers stay split:

- **Introduction / oilprint handover**: Hang Shu muttering; late-and-wrong fear; three doors and a clock already on the sheet. Does not explain “knowledge persist” as a mechanic lecture.
- **Desk / clock / board / Tiao Wan slip / duty remark / thin return**: cold, short, permission-bounded. The counter only reports how many doors this shift opened. No score.
- **Qiu Maiqiu note**: stammer / afterthought. Seen is not verified. He left the hard line for Hang Shu.
- **Shen Bai complaint / late addendum**: repeats “not our burn.” Clerk records the boundary. No checkout table.
- **Plot 12 household card / extract / neighbor sketch**: dry tables and a pencil map. Private grave stays private grave.
- **Gu Wanhe memo / message**: fussy, self-correcting; no car; copied a code; heard about the ash late.
- **Martyrs' batch / garden notices / gov pages**: red-header office voice. South steps. No real martyr names. Lore does not close a case.
- **Code slip / checkout ledger / attendance blanks / delivery slip**: needle-print tables. One code, two records. A spoken slip crossed out.
- **Miao Shiqiao mail / attendance chase**: boilerplate. He wants boxes filled. Subject lines visible; body follows the household.
- **Pi Houshan receipt / route**: few words. Grave number present. South steps not entered.
- **Cross-plot definition / write-limit / Cold Food Day ticket**: cold register. Ash on site. Does not name a hand.
- **Gazette extract**: half-literary history voice, stops at tomb-visit. Not enforcement.
- **Qingming notice / custom page**: rule-stating. Arrive at the grave / register / paper-money fire control. Cold Food Day is an older layer.
- **Forum / lore thread**: 2000s floor English. Believers, scoffers, a garden-affairs quote. No grave numbers that close the case.
- **Endings**: consequence shorts. One reason aligned to the flags. No slogan.

## Evidence limits (do not inflate)

- Neighbor-ash on the Plot 12 boundary is **cross-plot checkout** (one reservation code booked in two places). It is **not** a ghost burn as the governing nature, and **not** a Shen-family private burn as the governing nature.
- Reservation code **Lieji-0405-Erliang** went to the **martyrs' terrace collective** (Lian County Second Grain Depot union). Holding the code opens the south-steps gate. It does **not** automatically become a north-slope delivery password.
- Offerings were delivered to **Plot 12, grave 37** (Gu household private grave). Pi Houshan put the box down by the number on the slip and left. South steps were not entered.
- Martyrs' terrace (south steps, collective sign-in) **is not** Plot 12 (north slope, private graves). Do not merge the two plots.
- Gu Songnian is the Plot 12 private-grave deceased. Shen Laoshan is the Plot 12 grave-38 neighbor. Do not merge households.
- Miao Shiqiao wants south-steps attendance boxes filled. Gu Wanhe wants someone at grave 37 the same day. One code, two places, one day. That explains motive. It does **not** authorize changing the booking or waving Plot 12 through on a martyr code.
- The desk may only file a **duty remark**. `change` (rewrite the booking to Plot 12) or `pass` (wave Plot 12 through as martyrs' terrace) is overreach. Tiao Wan locks the permission. Motive is not asked.
- Lore-ghost (“someone burned paper into the next grave”) can be verified as a sentence people tell. Duty rules say lore does **not** close the case. Nature `ghost` returns the form.
- Cold Food Day old ticket (last year, Plot 12, ash on site; stamp looks like a collective number; Ji Nanlou does not name a hand) is a side line. It can sit beside the modern burn-ban notice. It **cannot** close tonight’s remark. Cold Food Day is the day before Qingming; it is not tonight’s code.
- Seen is not verified. Paper seen this shift is pulled at handover. Whiteboard sentences stay. `thin` means the four fields are not aligned or verified sentences are missing. Verified stays.
- Missing a field is not innocence and not a ghost. Use: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.
- No field-burning method, no real martyr roster, no hand coming out of a neighboring grave.

Correct note path (do not change):

- nature=`cross`, codeTo=`martyr`, goodsTo=`plot12`, action=`note`
- plus verified `ash-neighbor` `code-martyr` `deliver-12` `cross-hexiao`
- ending `note`

Other routes stay: `change`/`pass` → `overbook`; nature `ghost` → `ghost`; otherwise `thin`.

## Retained-Chinese allowlist

Prefer **zero player-visible Han**. Play does not require reading Chinese.

If a later pass restores visible Han, wrap it:

| Tag | Where it would be | Bridge |
|---|---|---|
| ZH-NAME | Personal names on a scan or seal | `.zh-artifact[lang="zh-Hans"]` + `.artifact-translation` |
| ZH-FRONT | Glyphs inside still JPEGs (ash line, old ticket, offerings) | English caption / empty `alt` as in source; pixels only |
| ZH-TERM | Reservation-code face if a later scan shows 烈集 | World-in slip transcription: Lieji-0405-Erliang |

Hidden compatibility only:

- No Chinese login alias. No Chinese search token required to proceed.
- Verify token IDs and door IDs stay ASCII as listed below.

Still JPEGs may contain unreadable print. Those glyphs are not required to proceed.

## Names and terms

Surname-first romanization in prose. **Door IDs**, **verify token IDs**, **submitNote option VALUES**, and **ending filenames** stay.

Door IDs: `tousu` `qu12` `lie` `song` `xiao` `kao` `han` `shuo`.

Verify token IDs: `ash-neighbor` `gu-private` `code-martyr` `deliver-12` `cross-hexiao` `same-day` `old-ticket` `lore-ghost`.

submitNote values: nature `cross|ghost|private`, codeTo `martyr|plot12|none`, goodsTo `plot12|martyr|none`, action `note|change|pass`.

| Source | English (bounded) | Do not merge with |
|---|---|---|
| 杭疏 | Hang Shu | — |
| 条皖 | Tiao Wan | — |
| 顾晚禾 | Gu Wanhe | Gu Songnian |
| 顾松年 | Gu Songnian (Plot 12 private grave) | Shen Laoshan; martyrs' terrace |
| 申柏 | Shen Bai | — |
| 申老山 | Shen Laoshan (Plot 12 grave 38) | Gu Songnian |
| 缪石桥 | Miao Shiqiao | Pi Houshan |
| 皮厚山 | Pi Houshan | Miao Shiqiao |
| 仇麦秋 | Qiu Maiqiu | — |
| 纪南楼 | Ji Nanlou | — |
| 涟县东岗园 | Lian County East Ridge Garden | any real garden |
| 烈士园 / 南阶 | Martyrs' terrace / south steps | Plot 12 / north slope |
| 十二区 / 北坡 | Plot 12 / north slope | Martyrs' terrace |
| 串穴核销 | Cross-plot checkout | ghost burn; private unregistered burn |
| 一码两记 | one code, two records | one plot with two names |
| 烈集-〇四〇五-二粮 | Lieji-0405-Erliang | Cold Food Day old ticket; any Plot 12 private code |
| 寒食 | Cold Food Day (day before Qingming; older no-fire layer) | tonight’s Qingming reservation |
| 预约码 | reservation code | attendance box; delivery grave number |
| 备注 | duty remark | booking change; wave-through |
| 见过 / 已采信 | seen / verified (on the board) | interchangeable “knew” |
| 禁烧令 | burn-ban notice (emergency-management wall notice) | Kaiyuan edict; lore-ghost |

County name, garden name, and grave names are fictional. Do not map them onto a real garden.

## Serious allegations

- Cross-plot checkout is a **desk-field error on one code used in two places**, not a curse established by these sources, and not proof that a ghost burned into the next grave.
- Shen Bai can believe a ghost or accept a cross-plot line. He does not write the checkout ledger. His complaint proves ash on the neighbor line. It does not prove who held the flame.
- Gu Wanhe does not treat copying a collective code as “cheating the terrace.” She treats it as “a car that would come that day.” That does not make Plot 12 into martyrs' terrace.
- Miao Shiqiao’s letters ask for south-steps attendance. The public pages cannot determine whether he knew the offerings went north.
- Pi Houshan delivered to the number on the slip. He delivered the right grave number and the wrong plot-meaning. That is not established as theft.
- Last year’s Cold Food Day ticket records ash on site. It cannot, by itself, prove tonight’s hand, and it cannot close the duty remark.
- Lore-ghost is a sentence people tell. Duty rules rule this specific connection out as a closing nature.

## Technical contract

- Work only in `/Users/Zhuanz/Desktop/英文版游戏4/清明三门/`. Do not edit `/Users/Zhuanz/Desktop/新游戏4/` or `chenghuang-yeshi`.
- Playable pages: every `*.html` in this folder. Entry: `introduction.html`.
- `html lang="en"` on every playable page.
- Routes, file names, image paths, CSS layout, door IDs, verify token IDs, form field names, option **values**, and ending filenames unchanged.
- Dates in investigative prose: `YYYY-MM-DD` (shift clock already used: 05:00 handover; complaint addendum after xu-hour may stay as a clock/watch phrase already in source).
- Independent save key:

| Chinese | English |
|---|---|
| `qingming-sanmen-v1` | `qingming-sanmen-v1-en` |

- Bare `qingming-sanmen-v1` must be gone from `js/sanmen.js`.
- `MAX` stays 3. Handover still clears `opened`, keeps `verified` / `seen`, increments `round`.
- `submitNote` still routes to `ending-` + `note|overbook|ghost|thin` + `.html`.
- No CDN fonts. No new plot pages.
- Pipeline markdown may stay Chinese. CSS comments may stay. Images stay.
