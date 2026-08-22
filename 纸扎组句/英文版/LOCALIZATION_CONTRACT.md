# English Localization Contract — One Line for the Paper Figures

Full spoilers. Gate L transcreation for 纸扎组句. The Chinese runtime remains the source of truth. This edition does not invent plot, teach a zhizha method, approve a burn, or turn paper figures into living persons.

## Positioning

Working title: **One Line for the Paper Figures** (纸扎组句).

The edition must read as an English-language night shift *inside* a Chinese county paper-works. The player is night helper **Sheng Mai** at **Mai's Paper Works** (Tongxi). Tonight, on the eve of fifth-seven, he must file one six-blank **incident line**. He is not family, not a funeral host, not a furnace hand, and not an approver.

The player solves provenance / identity / chronology / rule-meaning: whose goods, which named piece, what was done to the stack, where it landed, whether tonight's furnace ran, whether the invoice owner is living, and how far a night helper's card may go. It is a Golden-Idol-style word bag (click dotted words, assemble one line). It is not a Chinese literacy test and not a tourist rite tour.

Registers stay split:

- **Introduction / Sheng Mai slip**: muttering; self-corrections; fear of writing wrong beats fear of ghosts. Identity, cutoff, bag, empty card, and the first wrong object (**PaperAttendant**) leak from the desk slip, not from a manual.
- **Mai desk / returns / phone slip / permission sheet**: cold, short, permission-bounded. This desk files a recommend-only line. It does not approve a burn and does not attach a method.
- **Puye Stationery storefront / opening notice / goods / receipt**: small-shop local ad voice. Rent, lights, ribbon-cutting. Urgent, not detective.
- **Puye shop group**: WeChat-like mutter. A-Dou types slow and drops punctuation. Shao Pu types fast, one line each. Time-stamped tonight. Not an obituary.
- **Lou Shi burn-site album**: fragmentary, resentful, first declaration is “I did not light.” Frames only. Photos cannot prove a burn. The schedule is cold tonight.
- **Jing Qiubai forwarded posts**: urgent; she repeats PaperAttendant; family talk spills. She does not reconcile Shao Pu's invoice.
- **Tongxi neighborhood board**: messy 2000s floor English; heat; one mouth does not finish the night. MixedFurnace is an old complaint label.
- **Tongxi gazette extracts**: dry copies. Rule first. No national emblem, no real agency name, no ignition steps.

## Evidence limits (do not inflate)

- **FestivalPaper ≠ PaperAttendant ≠ PaperMansion ≠ LionHead.** Opening-day festive crafts are not the funeral attendant Jing Qiubai is chasing. A lion head is a storefront piece, not a mourning figurine. A paper mansion is funeral white-paper, coarse bone.
- **ShaoTingFuneral ≠ StationeryShop ≠ Furnace.** Goods mixed into the funeral pile are not proven delivered to the shop glass. A furnace cell on a schedule is not the yard stack.
- **ShaoPu ≠ ShaoTing ≠ JingQiubai ≠ LouShi.** Invoice owner of the festival paper is living younger brother **Shao Pu** (Puye Stationery), not the funeral host and not the deceased named on the funeral order. Lou Shi photographs; he does not own the goods.
- **Unburned ≠ AlreadyBurned.** Lou Shi's schedule writes Shao Ting's furnace unscheduled tonight. Ash in the brick mouth is the previous household's. A photo cannot stand as a burned return.
- **ShaoPuAlive ≠ ShaoPuDead ≠ AttendantBurned.** The shop group at 21:40 still has Shao Pu asking for goods. This specific “already dead” claim **is ruled out**. Writing him dead, or writing the attendant burned, files as `burned`.
- **MixedIn ≠ MissingPiece ≠ BurnApproved.** The yard has two colors stacked. That is mix, not an empty slot. A night helper cannot approve a burn.
- **MixedFurnace** is a 2019 neighborhood complaint label (festive then funeral in one mouth). It is pickable flavor, not a sentence slot, and **not established by these sources** as tonight mixing the furnace again.
- The funeral order proves account name Shao Ting and ordered classes (PaperAttendant, PaperMansion, gold mountain). It does **not** prove goods are in the furnace, and it does not prove the yard's red-gold pile is that order.
- The invoice proves who paid and the item name FestivalPaper / LionHead / storefront lamps. It does **not** prove delivery to the shop door, and it cannot determine whether anyone opened a pack in the yard.
- The shop group proves someone typed tonight asking for a lion head. It cannot determine that Shao Pu entered the yard.
- Lou Shi's frames prove red and white in that shutter. They cannot prove a burn, and they cannot prove whose hand pushed the mix.
- The schedule proves which mouth is open tonight. It cannot determine tomorrow.
- County extracts state split-furnace and host-application rules. They cannot determine whose goods burned tonight.
- Missing a field is not innocence. Use: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

## Retained-Chinese allowlist

Prefer **zero player-visible Han**. Play does not require reading Chinese.

If a later pass restores visible Han, wrap it:

| Tag | Where it would be | Bridge |
|---|---|---|
| ZH-NAME | Personal names on a scan or seal | `.zh-artifact[lang="zh-Hans"]` + `.artifact-translation` |
| ZH-FRONT | Glyphs inside still JPEGs (yard stack, lion craft, shop glass) | English caption / empty `alt` as in source; pixels only |
| ZH-BRAND | Painted shop mark “Puye” if a later pass restores 浦页 on a scan | Same-stage English gloss |

Hidden compatibility only:

- Optional `pickWord` alias map may canonicalize leftover Chinese bag strings to the English tokens below. Playable pages must not require a Chinese `data-w`. Prefer the map unused.

Still JPEGs may contain unreadable print or signage. Those glyphs are not required to proceed.

## Names and terms

Surname-first romanization in prose (`Sheng Mai`, `Shao Pu`). Word-bag **tokens** are one CamelCase unit: they print as the clickable pick text and as `data-w`. Engine `SLOTS` / `CORRECT` / `pickEnding` / `nearMsg` / `has("w-…")` use these exact strings.

| Chinese pick | Token (`data-w` + bag + select) | Do not merge with |
|---|---|---|
| 邵浦 | ShaoPu | ShaoTing, JingQiubai, LouShi |
| 邵庭 | ShaoTing | ShaoPu |
| 井秋白 | JingQiubai | goods owner |
| 娄石 | LouShi | goods owner |
| 开业彩扎 | FestivalPaper | PaperAttendant, PaperMansion, LionHead |
| 童女 | PaperAttendant | FestivalPaper |
| 楼库 | PaperMansion | StationeryShop |
| 狮头 | LionHead | PaperAttendant |
| 混进 | MixedIn | MissingPiece, AlreadyBurned, BurnApproved |
| 已焚 | AlreadyBurned | Unburned |
| 缺件 | MissingPiece | MixedIn |
| 批准焚化 | BurnApproved | recommend |
| 邵庭丧扎 | ShaoTingFuneral | StationeryShop, Furnace |
| 焚化炉 | Furnace | yard stack |
| 文具店 | StationeryShop | ShaoTingFuneral |
| 未焚 | Unburned | AlreadyBurned |
| 邵浦在世 | ShaoPuAlive | ShaoPuDead, AttendantBurned |
| 邵浦已故 | ShaoPuDead | ShaoPuAlive |
| 童女已焚 | AttendantBurned | Unburned |
| 喜丧混炉 | MixedFurnace | tonight's furnace cell (flavor only; not a sentence slot) |

| Source | English (bounded) | Do not merge with |
|---|---|---|
| 盛麦 | Sheng Mai / night helper | Mai family |
| 麦老 | Mai Lao / shop owner | Sheng Mai |
| 井秋白 | Jing Qiubai / funeral host | invoice owner |
| 邵庭 | Shao Ting / the deceased | Shao Pu |
| 邵浦 | Shao Pu / living younger brother | Shao Ting |
| 娄石 | Lou Shi / burn-site night hand | goods owner |
| 阿豆 | A-Dou / Puye clerk | Lou Shi |
| 麦记扎作 | Mai's Paper Works | Puye Stationery |
| 浦页文具 | Puye Stationery | Mai's Paper Works |
| 桐溪县 | Tongxi (fictional county) | any real county |
| 纸扎 | zhizha / burnable paper offerings | living paper persons |
| 彩扎 | caizha / festive paper crafts | funeral paper set |
| 丧扎 | funeral paper set | FestivalPaper |
| 童女 | paper attendant figurine | a living girl |
| 楼库 | paper mansion | a real building |
| 五七 | fifth-seven / 35th-day rite | AlreadyBurned |
| 开业彩扎 | opening-day festive crafts | PaperAttendant |
| 喜丧混炉 | festive and funeral in one furnace | tonight's mix-in-the-pile |
| 事件著录 | incident line (recommend only) | burn approval |
| 监焚对账 | watch-and-reconcile the burning | lighting the furnace |

Auth **option values** stay: `recommend` / `approve` / `teach`. Correct auth is `recommend`.

Ending **keys** stay: `filed` / `burned` / `bounced`. Filenames stay `filed.html` `burned.html` `bounced.html`.

TRUE filed line (only filed path):

`who=ShaoPu, what=FestivalPaper, act=MixedIn, where=ShaoTingFuneral, night=Unburned, life=ShaoPuAlive, auth=recommend`

## Serious allegations

- Writing Shao Pu dead, or writing the paper attendant burned, is a **paper-line error** that the desk will file as burned. The furnace mouth is still cold. That filing is not proof a burn happened.
- Jing Qiubai's chase proves what the funeral host wants. It is not a burned return, and it cannot determine what the yard actually stacked.
- The 2019 MixedFurnace thread can explain why Lou Shi photographs first. It is a side line. It is **not established by these sources** that tonight's furnace mixed again, and it is not required to file the six blanks.
- A night helper who checks approve or attach-method is overreach. The stack stays at the waiting-burn edge. The system bounces. This edition does not teach a craft method and does not grant burn authority.

## Technical contract

- Work only in `/Users/Zhuanz/Desktop/英文版游戏4/纸扎组句/`. Do not edit `/Users/Zhuanz/Desktop/新游戏4/` or anything under `chenghuang-yeshi`.
- Playable pages: 38 `*.html`. Entry: `introduction.html`.
- `html lang="en"` on every playable page.
- Routes, file names, image paths, CSS layout, token/page IDs (`v-sentence` `v-desk` `v-order` `v-invoice` `v-group` and the rest), form field ids, option values, and ending filenames unchanged.
- Dates in investigative prose: `YYYY-MM-DD` (or clock times already used: 21:40, 21:12, 20:51, 19:02, 18:40, 17:10, 21:55).
- Independent save key:

| Chinese | English |
|---|---|
| `zhizha-juzi-v1` | `zhizha-juzi-v1-en` |

Bare Chinese key must be gone from `js/engine.js`.

- Word-bag UI copy is English (`Tonight's bag is empty.` / `(blank)` / written-into-bag flash).
- Search boxes stay `action="#"`. Fake columns stay on-page. No new plot pages.
- No CDN fonts.
- Pipeline markdown may stay Chinese. CSS comments may stay Chinese. Images stay.
