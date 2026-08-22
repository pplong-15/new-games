# English Localization Contract — Stele Jump

Full spoilers. Gate L transcreation for 碑纹跳切. The Chinese runtime remains the source of truth. This edition does not invent plot, teach a recarving or grinding method, approve a rename, merge two steles, or treat a later face name as a legal name-change.

## Positioning

Working title: **Stele Jump** (碑纹跳切).

The edition must read as an English-language night shift *inside* a Chinese county cultural-relics office. The player is night lookup clerk **Weng Tai**. Tonight, before 09:00 projection, she must file one **lookup remark** (recommend only) on box **Shipu-Zhi-117** / stele **Shipu-Bei-117**. She is not an approver, not a carver, and not the household head.

The player solves provenance / identity / chronology / rule-meaning: whether the name now visible on the **stele face (obverse)** is the name written on the **buried epitaph stone**, whether those layers are one rename, and how far a night clerk’s staff id may go. Jumps are by **objects on the scan**, not by name-glyph puzzles. It is not a Chinese literacy test and not a tourist stele tour.

Registers stay split:

- **Night slip / introduction**: Weng Tai, cold restatement; person, slip, first scan, the already-drawn smear. No lyric.
- **Digitization desk / queue / handoff / method / returns**: desk short lines. Weng Tai restates fields and self-corrects. Lu Zhi is text-length, 09:00 only. Empty name-search stays desk talk.
- **Rubbing / epitaph holdings (`rub/*` `zhi/*`)**: catalog voice. What a page can prove / cannot prove. A cut is not a ghost.
- **Shipu Office public station (`gov/*`)**: dry notice. Night rules, blank slip, same-shape old remark. No mood.
- **Chitu Stoneworks (`shop/*`)**: receipt voice. Trade, pigment, “this shop does not take grinding.” Shi Man writes ugly and does not explain the cut.
- **Ji household head pages (`family/*`)**: ramble, self-correction, Qingming fear. Ask not to project the old name. Not a request for office approval.
- **He Zhiting blog (`he/*`)**: slow recall. Damp paper, margin ink, a cut he did not dare touch. Time folds.
- **Classified / Puyin (`yellow/*` `nei/*`)**: short posts, price flips, neighbor-county brake. Not the 117 finding.

## Evidence limits (do not inflate)

- A **stele face (obverse)** is the public name. A **buried epitaph stone** is the buried name. Face and buried stone are not one object. **Stele reverse** has no name tonight.
- **Recarving** is later people grinding old graphs shallow and cutting a new name. **Red-tracing** is Qingming paint over graphs already there. **Abrasion / grind smear** is the shared tool-mark. Do not merge the three. Red-tracing over a recarve does not turn the recarve into a rename procedure.
- **Ji Adu** is the buried name on Shipu-Zhi-117. **Ji Dusheng** is the name still on the 1986 Grain Rain rubbing. **Ji Wenshan** is the name now on the face. Three layers are not one completed rename.
- The 1986 rubbing (He Zhiting; Bingyin pack) can prove the smear was already there and the graphs still read Dusheng. It cannot prove who later cut, and it cannot prove the buried hui.
- The 2011-04 Chitu receipt can prove the job was billed as red-tracing, pigment filled Wenshan, and Shi Man wrote “old mark, this job does not repair.” It cannot prove Wenshan is the box name, and it cannot prove the smear was made that day.
- Ji Bozhou’s household note can explain why the family wants Wenshan on the wall. A genealogy stroke is **not established by these sources** as a legal rename. The face name is not a rename proof and not an approval to grind the old graphs off.
- The 2018 reburial opening can prove the holdings copy wrote hui as Adu, and that Dusheng and Wenshan were not written on that stone. It cannot prove the original stone still lies in the grave tonight — the box was opened. The public pages cannot determine legal force of a genealogy stroke that is not in this box.
- **Broken chi-head** same-shape (Shipu-Bei-117 left-missing; Puyin-Bei-031 / You Shiquan right-missing) proves nearby cutter habit only. **This specific connection is ruled out**: same-shape is not one stele, not one box, not one smear, not one household. Shipu ≠ Puyin.
- A yellow-page wood mold can prove someone ordered a matching chi-head. It cannot prove two steles should share a catalog number. The mold seller said the smear is later; the mold does not cut the stop-wheel mark.
- Night permission is **recommend only**. Approve a rename or approve grinding and the slip bounces. The office has no such stamp. Filing recarve is a flag for day shift, not a carve order.
- Top-bar search on the desk is a decoy. Names do not pull pages. Filling **Ji Wenshan**, **Ji Dusheng**, or **He Zhiting** returns empty. Jumps stay on image objects.
- Missing a page is not innocence. Use: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

## Retained-Chinese allowlist

Prefer **zero player-visible Han**. Play does not require reading Chinese.

This edition targets **0 Han** in playable `*.html` and `js/*.js`. Catalog IDs are romanized in place:

| Chinese source ID | English runtime ID |
|---|---|
| 石浦-碑-117 / 084 / 102 | Shipu-Bei-117 / 084 / 102 |
| 石浦-志-117 | Shipu-Zhi-117 |
| 浦阴-碑-031 | Puyin-Bei-031 |
| 浦阴-志-031 | Puyin-Zhi-031 |

If a later pass restores visible Han, wrap it:

| Tag | Where it would be | Bridge |
|---|---|---|
| ZH-NAME | Personal names on a scan or margin | `.zh-artifact[lang="zh-Hans"]` + `.artifact-translation` |
| ZH-FRONT | Glyphs inside still JPEGs (face, rubbing, epitaph, chi-head) | English caption / empty `alt` as in source; pixels only |
| ZH-TERM | Catalog syllables Bei / Zhi kept as romanization | Already bridged in holdings copy |

Still JPEGs may contain unreadable graphs. Those pixels are not required to proceed.

## Names and terms

Surname-first romanization in prose. Submit **choice values** and **ending filenames** stay: `recarve` / `same` / `approve` → `desk/result-recarve.html` `result-same.html` `result-approve.html`.

`BW.mark("…")` token strings stay: `intro` `desk` `find` `task` `queue` `shift` `howto` `submit` `end-recarve` `end-same` `end-approve` `night` `nomerge` `gov` `form` `zhi-rec` `zhi` `mold` `yellow` `qingming` `family-note` `family` `trace` `shop` `receipt` `red` `box` `smear1986` `chi` `yin` `smear3` `sign` `catalog` `now` `nei-rec` `nei-chi` `nei` `he` `he1986`.

| Source | English (bounded) | Do not merge with |
|---|---|---|
| 翁苔 | Weng Tai | — |
| 路值 | Lu Zhi | Weng Tai |
| 贺纸庭 | He Zhiting | — |
| 石满 | Shi Man | — |
| 纪柏舟 | Ji Bozhou | Ji Adu / Ji Dusheng / Ji Wenshan |
| 纪阿渡 | Ji Adu (buried hui) | Ji Dusheng; Ji Wenshan |
| 纪渡生 | Ji Dusheng (1986 rubbing) | Ji Adu; Ji Wenshan |
| 纪闻山 | Ji Wenshan (face now) | Ji Adu; Ji Dusheng |
| 游石泉 | You Shiquan | Ji household |
| 石浦县 | Shipu County (fictional) | Puyin County |
| 浦阴县 | Puyin County (fictional) | Shipu County |
| 碑阳 | stele face / obverse | buried epitaph stone; stele reverse |
| 碑阴 | stele reverse | stele face |
| 志石 | buried epitaph stone | stele face |
| 改刻 | recarving | red-tracing; grind smear |
| 描红 | red-tracing of existing characters | recarving; new cut billed as new work |
| 抹痕 | abrasion / grind smear | red-tracing; recarving as a legal act |
| 螭首残 | broken chi-head | proof two steles are one |
| 查阅备注 | lookup remark (recommend only) | approval / grind order |
| 讳 | hui (buried personal name on the stone) | household nickname; face name |
| 赤土石作 | Chitu Stoneworks | the county office |
| 丙寅那包 | Bingyin pack (1986 rubbing bundle) | Puyin 031 pack |
| 谷雨 | Grain Rain (solar term; 1986 session) | Qingming red-tracing |

Intended path is **recarve**: face later recarved; buried stone still carries the earlier name (Adu / Dusheng line). **same** wrongly treats face and buried name as one renamed person. **approve** is overreach.

## Serious allegations

- A later face name is a **catalog conflict**, not a curse established by these sources.
- Ji Bozhou believes the genealogy stroke finished the matter in the house. That does not give the office a stamp, and it does not make Adu into Wenshan.
- Shi Man billed red-tracing. The public pages cannot determine who cut the new graphs.
- Same-shape chi-heads are cutter noise. They are not a merge, and they are not a Ji–You kinship finding.
- He Zhiting’s margin ink proves he handled the Bingyin pack. It is not a seal, and it is not consent to later recarving.

## Technical contract

- Work only in `/Users/Zhuanz/Desktop/英文版游戏4/碑纹跳切/`. Do not edit `/Users/Zhuanz/Desktop/新游戏4/` or `chenghuang-yeshi`.
- Playable pages: 39 `*.html`. Entry: `introduction.html`.
- `html lang="en"` on every playable page.
- Routes, file names, image paths, CSS layout, form field names, radio values, and ending filenames unchanged.
- Dates in investigative prose: `YYYY-MM-DD` (or clock times already used: 09:00).
- Independent save key:

| Chinese | English |
|---|---|
| `beiwen-tiaqie-v1` | `beiwen-tiaqie-v1-en` |

- Desk top-bar lookup stays a decoy. English copy states that Ji Wenshan / Ji Dusheng / He Zhiting return empty. No Chinese input is required.
- Submit still routes to `result-` + `recarve|same|approve` + `.html`.
- No CDN fonts. No new plot pages.
