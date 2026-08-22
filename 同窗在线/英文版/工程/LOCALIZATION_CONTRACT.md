# Localization Contract — Classmates Online

## Positioning

Working title: **Classmates Online**.

The edition must read as an English-language investigation conducted inside a Chinese 2010 campus real-name archive. The player solves provenance, identity, chronology, and what the site is using people for — not Chinese literacy.

The site is a paper-figure shrine wearing a blue-bar social shell. Three generations: Shen Lianshan → Shen Xiulan / Lin Zhaodi → Shen Yizhou. The player (Jiang Wanqing, handle Ganggang) is written as Spare on the 1986 yin-register appendix. Opening the sent URL is being called to answer present.

## Evidence limits

Use the three hedges. Do not upgrade shop talk, forum talk, or a register row into proof of the supernatural.

- Household books still list the 1959 reservoir missing as missing, not deceased. Aftercare used a StandIn procedure on a paper roll. These sources do not establish that paper figures used living people's birth times.
- Shenwan later called that work "filling the numbers," not saving people. That is a recorded local wording, not a finding that anyone was saved or not saved.
- Chen Xiaobei's household note records a 2014 crash. The account still posts in 2026. The public pages cannot determine whether the later posts are the living classmate.
- Lin Zhaodi / Shen Zhaodi: two registrations for one child after 1987 Adoption. Whether the grey coat in the albums is that person is not established by these sources.
- YinDebt, IncenseList, and "a visit is incense" are wordings used by the shop, the forum, and the shrine committee. Appearance of the words is not certification that a rite worked.
- Jiang Wanqing as Spare (1986, unused) is a register status. It is not proof the player was ritually substituted.
- The two endings are player submissions (don't answer / take the incense). The debt is not shown as paid off in either ending.

## Retained-Chinese allowlist

Player-facing copy is English. Chinese remains only as hidden search/login aliases so Chinese self-tests and bilingual input still work.

No player-visible Han is required to advance. If a later build keeps a shop-sign glyph or a stamped copy mark on an image, wrap it:

`<span class="zh-artifact" lang="zh-Hans">…</span><span class="artifact-translation">…</span>`

Functional UI, titles, validation, hints, and labels contain no required Chinese.

## Names and terms

Surname-first romanization. Search tokens have no spaces (CamelCase). Prose may space the name; the extractable token must also appear as printed.

| Token | Chinese alias | Bounded sense |
|---|---|---|
| PaperHorse | 纸马课 | Student nickname for the folk-craft elective (paper funerary horses). School name remains Folk Craft Practice. |
| WuQiming | 吴启明 | Classmate; blog author. |
| ShenjiPaper / Shenji | 沈记纸扎 / 沈记 | Family paper-figure shop in Shenwan. |
| ShenYizhou | 沈亦舟 | Third generation; class admin; apprentice. |
| RecentVisits | 最近来访 | Site column: who opened a profile. |
| ChenXiaobei | 陈小北 | Classmate who sent the URL. |
| Class04 / ClassCS | 04计1班 / 计1班 | 2004 computing class public page. |
| ClassRules | 班级公约 | Class public-page articles. |
| YinRegister | 阴册 | Yin register / funeral-and-registry roll, not the class roster. |
| Adoption | 过继 | Kinship adoption into a side branch (guoji). |
| StandIn | 替身 | Paper-roll stand-in procedure, not a stage actor. |
| ButouReservoir / Reservoir | 埠头水库 / 水库 | 1959 water-works aftercare site. |
| ZhouTang | 周棠 | Classmate; albums show an extra grey coat. |
| JiangWanqing | 江晚晴 | Player; old account; handle Ganggang. |
| ShenXiulan | 沈秀兰 | Second generation; keeps the yellow book. |
| ShenLianshan | 沈连山 | First generation; opened the shop. |
| YinDebt | 还阴债 | "Repaying a yin debt": filling empty names. Shop prefers "fill the numbers." |
| LinZhaodi / ShenZhaodi | 林昭弟 / 沈昭弟 | Same child, before/after Adoption. |
| IncenseList | 香火 | Visit counts recorded as incense. |
| PaperFigure | 纸人 | Paper person / paper funeral figure. |
| Spare | 备用 | Unused backup line on the register appendix. |
| SiteClosed | 关站 | 2018 closedown mark. |
| IncenseFirst | 先上香 | Shop door phrase; class-page passphrase. |

Other bounded words in running prose, not search tokens: yin marriage (阴婚); yellow book / huangce (黄册); Tongxi County, Butou Town, Shenwan, Tongxi Voc-2.

Bare first names are not used as search keys. Do not silently collapse LinZhaodi and ShenZhaodi into one search miss — both tokens open the genealogy.

## Technical contract

- World facts, page ids, dates, routes, grants, need, unlocks, puzzle graph, and image paths are unchanged from the Chinese source.
- Save key: `tongchuang-online-v1-en` (does not collide with `tongchuang-online-v1`).
- `html lang="en"` on shells and the live stub.
- Search: one token, no whitespace. A single CamelCase/Latin token is valid. Chinese compounds remain valid. Match is case-insensitive (`normalize` lowercases). `maxlength` is 32.
- Keywords keep Chinese aliases. Self-test `search("纸马课")` and `search("沈记")` must still pass. `search("纸马 课").type` remains a space rejection (`multi`).
- Login users include `ShenYizhou` (keep `沈亦舟`, `shenyz`). Passwords include `IncenseFirst` (keep `先上香`). Near-miss copy is transcreated.
- Hints teach English tokens. Every `searchBody` and visible page that yields a token contains that English token.
- English-only input can complete the through-line. Chinese input remains a hidden compatibility path.
