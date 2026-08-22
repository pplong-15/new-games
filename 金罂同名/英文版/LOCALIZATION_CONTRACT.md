# English Localization Contract — Two Niches Named Lin

Branch: Chinese source snapshot `新游戏2/金罂同名` (do not edit) → English working copy `新版游戏英文版2/金罂同名`. Transcreation, not translation. Runtime truth is the Chinese pages; this edition moves register and lookup, it does not invent plot.

## Positioning

Working title: **Two Niches Named Lin**. Folder: `金罂同名`.

The edition must read as an English-language night shift inside a Chinese county columbarium. The player is Chu Ci. The verbs are open the book, match fields, write a claim recommendation. The player solves two men who share a milk name, a dirty ledger, and a lease clock — not a Chinese literacy test.

No solution requires Chinese input, OCR, or outside cultural homework. Same-name exclusion still runs on birth year, registered address, and move-out year.

## Non-negotiable evidence limits

- Two book rows both print `LinAsheng`. That does not make one person.
- Both obituaries can say aged sixty-five. Age is not a unique key. Birth years stay 1938 and 1951.
- Lin Qiuhe's first words (Persimmon Flat, 1996 factory hire) point at the West Hall row. Her lessee name `WuWanxiang` points at South Hall. Oral speech can weld two houses. It is not a single source.
- West Hall 07 entered in 2011 after a township grave relocation. The 2018 filing shows Lin Bonian applied to move the jinying (bone urn) to an ancestral-mountain holding point. The receipt lacks a cremation-stub photocopy, so the book still posts the old name. Posted name is not "still in the niche."
- The 2018 page and the phone note prove an application and a stop-claim request. They do not establish which vessel sits on the mountain tonight.
- South Hall 22 is a 2016 same-day cremation entry. Lessee is Wu Wanxiang. Address is East Lane 3. Household is recorded as never moved out. Daughter is Lin Qiuhe.
- Photocopies, wet cabinet tags, and tea-stained copies cannot stand in for the lease book or a hall number.
- Genealogy pages are scan-room transcriptions, not household originals, and they do not set hall numbers.
- The Lime Kiln Lin Asheng (born 1944) is a third namesake. Birth year, address, and burial place fail both tonight's rows. Exclusion is not a third claim.
- Night shift may only recommend. It cannot move cabinets, change the original niche, or sign for a family. Missing proof is not innocence and not a cleared niche.

## Retained-Chinese allowlist

Prefer **zero player-visible Han**.

Chinese strings may remain only as hidden search aliases in `js/keywords.js` (compatibility layer). They are not rendered as UI.

If a later pass keeps a glyph as material evidence, wrap it in `.zh-artifact[lang="zh-Hans"]` with a same-stage `.artifact-translation`. This snapshot does not do that.

The wet-tag fragments that were `林 / 盛 / 西` become Latin remainders (`Lin`, `sheng`, `West`). That is not a character puzzle in the source.

## Names and terms

Prose uses surname-first spacing. Lookup tokens are one CamelCase unit, printed on pages before they are searchable.

| Prose | Lookup token | Source |
|---|---|---|
| Chu Ci | ChuCi (badge only; not a required search row) | 褚慈 |
| Lin Asheng | LinAsheng | 林阿盛 — **two men**, plus a third Lime Kiln namesake who is excluded |
| Lin Qiuhe | LinQiuhe | 林秋禾 |
| Lin Bonian | LinBonian | 林柏年 |
| Wu Wanxiang | WuWanxiang | 吴晚香 |
| Qiu Xiulan | QiuXiulan | 邱秀兰 |
| Fang Yongshi | FangYongshi | 方永石 |
| Qiu Wanqiu | QiuWanqiu | 裘晚秋 |
| Persimmon Flat | PersimmonFlat | 柿树坪 |
| East Lane | EastLane | 东巷 |
| West Hall / South Hall | WestHall / SouthHall | 西厅 / 南厅 |
| Jinying Hall | (site name; not a required search row) | 金罂堂 |
| Gongren Road | GongrenRoad | 工人路 |
| Cement Plant | CementPlant | 水泥厂 |
| Lime Kiln | LimeKiln | 石灰窑 |
| Grave relocation | GraveMove | 迁坟 |
| Move-out | MoveOut | 迁出 |
| Errata | Errata | 勘误 |
| Lease term | LeaseTerm | 租期 |
| Tea stain | TeaStain | 茶渍 |
| 1996 / 1938 / 1951 / 2018 / 1944 | same four digits | 汉字年份 |

Bare `Asheng` must not silently pick one man. The book and the lookup row stay multi-hit.

Bounded translations:

- `金罂` — jinying / bone urn (cabinet slang; contracts say placement niche)
- `金罂堂` — Jinying Hall / county columbarium
- `格位` — niche
- `捡金` — jianjin, second-burial bone collection (background only; no steps)
- `认领建议` — claim recommendation (authority stays recommend)
- `挂名` — name still posted (ledger not cleared)
- `在租` — under lease
- `待清理` — pending clearance
- `乳名` — milk name (ruming)
- `德房` — De branch
- `东巷房` — East Lane branch
- `筒子楼` — tongzilou / slab dormitory
- `祖山寄放点` — ancestral-mountain holding point
- `桐溪县` — Tongxi County (fictional)

Do not merge: adopted-out ≠ moved-for-work; West Hall jinying-in ≠ South Hall cremation-direct; posted name ≠ still present; tea stain ≠ rain stain; Lime Kiln 1944 ≠ tonight's two rows.

## Serious allegations

Use `not established by these sources`, `the public pages cannot determine`, and `this specific connection is ruled out` when a page hits those edges.

- The public copies cannot determine whether a jinying is physically in West Hall 07 tonight.
- A missing cremation stub is not proof Lin Bonian never filed, and not proof the mountain holding is empty or occupied.
- Qiuhe mixing ancestral house and household is not established as fraud.
- The Lime Kiln namesake is ruled out of both tonight's niches. That does not speak to any other harm.

Correct recommendation: **South Hall** or **report**. Do not claim West Hall.

## Technical contract

- Routes, file names, `data-seen` keys, and claim ending keys `west` / `south` / `wait` / `report` stay.
- `html lang="en"` on every playable page.
- Save keys: `jy_seen-en`, `jy_end-en`. Do not read or write Chinese `jy_seen` / `jy_end`.
- Investigative dates in prose: `YYYY-MM-DD`.
- Lookup accepts one continuous token: Latin CamelCase, four-digit years, or hidden Chinese aliases. Spaces fail, as in the source machine.
- Tokens written on opening pages include `LinAsheng`, `PersimmonFlat`, `WuWanxiang`. `LinBonian` is written when that line is reached (handover / 2018 filing / 2003 obit).
- Forbidden procedure queries stay blocked; English aliases may join the same forbidden row.
- CSS skins, layout, and image paths stay. No new plot pages.
- Chinese `STORY.md` / `PLAY.md` remain source notes; they are not player-facing.
