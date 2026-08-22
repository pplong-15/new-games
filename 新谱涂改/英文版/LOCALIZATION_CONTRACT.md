# English Localization Contract — Painted Line in the New Book

Full spoilers. Gate L transcreation for `新谱涂改`. Chinese runtime remains the source of truth; this edition does not invent plot, add a death finding, or “fix” the Chinese story.

Work only in this English folder. Do not edit `/Users/Zhuanz/Desktop/新游戏2/新谱涂改/`.

## Positioning

Working title: **Painted Line in the New Book**.

The edition must read as an English-language night at a Chinese genealogy shop: Rui Qiu, west-branch head who paid for the book, has until 23:00 to hang a correction slip that can only recommend. The player solves provenance (who sent the overlay), identity (adopted-out vs moved away for work), chronology (1962 claim vs 1987 move vs 2019 supplement), and authority (lineage suggestion vs property). This is not a Chinese literacy test.

Registers stay split (do not flatten):

| Source | English mouth |
|---|---|
| Rui Qiu intro (`introduction.html`) | Ramble: repeats, self-corrections, heat mixed with fear. Facts leak from complaint. No manual voice, no punch-line close. |
| Hengpu Hall desk, pages, receipts, endings | Cold, short, procedural. Ge Ting does not explain. “As a rule / still / we do not take that.” |
| County library special collections | Rule-voice first, then the copy. Semi-formal house style. Do not lyricize a scan. |
| Hukou 2011 mirror | Gazetteer clerk: origin of the book, then fields, then one clipped close. Not real-agency letterhead. |
| Wankou town board | 2000s net English: fragments, typos allowed, people talk past each other. Rui Qiu almost never posts. |

On-screen bans (do not use as chrome): main quest, search-word, Chinese-character puzzle, progress bar, level, ending, source code, this game.

## Evidence limits (do not inflate)

- The electronic page shows what the shop library holds **tonight**. It does not establish that a 1962 original paper ever existed.
- The 1998 continuation scan is a holdings copy. It cannot prove a person is alive now.
- The 1987 move register can match reason and year. It is not a death certificate. Return-move is blank.
- The 1996 works letter asks for a death close-out. It has no body identification and no cremation number. Missing proof is not a finding of death, and not a finding that the man is alive.
- Town-board floors are speech, not notarized instruments.
- The 1983 unissued draft can only show an earlier wording (“moved away, details unknown”). It is not a published book.
- A painted line is not a typesetting miss and not a scanner smudge once the side note is read. That still does not prove the 1962 adoption claim.
- Adopted-out (claimed) ≠ moved away for work. Do not merge.
- Annual hall-upkeep shares (dingkou) sit on a different hall book. This desk never approves property. Writing share or “stop yuanpu” bounces the slip.
- Use hedges: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

## Retained-Chinese allowlist

Prefer **zero visible Han**. After this pass, player-facing title / placeholder / body / noscript must be 0 Han.

No `.zh-artifact` wrappers are required if no operable Han remains.

Source IDs that contained Han are **displayed in Latin** so the page is English-only. Search accepts the Latin form. Chinese source strings are not required to play.

| Source ID | English display | Bound |
|---|---|---|
| RQ-西-08 | `RQ-Xi-08` | West-branch commission 8. |
| GT-夜 | `GT-Ye` | Ge Ting night-desk work number. |
| HP-补-19-07 | `HP-Bu-19-07` | East-branch supplement scan. Prefix Bu = supplement (补). |

File names, routes, token IDs, and ending keys stay as in the Chinese build.

## Names and terms

Surname-first romanization in prose. Search tokens: CamelCase unit when the engine needs one word (`RuiQiu`, `Huaishan`, `Bocen`).

| English | Source | Bound |
|---|---|---|
| Rui Qiu | 芮秋 | Player; west-branch head who paid. Also “Qiu of the west branch.” |
| Rui Huaishan | 芮怀山 | Grandfather line; courtesy name **Bocen** (伯岑). Does not appear in person. |
| Rui Huaichuan | 芮怀川 | East-branch steward; upload mouth for the supplement. |
| Rui Yanmu | 芮延木 | Previous west mouth; 2014 thread starter; dead winter 2023. |
| Ge Ting | 葛汀 | Hengpu night editor. Cold. Short. |
| You Shuang | 尤霜 | Special-collection clerk. Rules before volumes. |
| Rui Huaibai / Rui Huaishi | 芮怀柏 / 芮怀石 | Neighbor lines on Vol. II; still in the village. |
| yuanpu | 圆谱 | Entering-the-hall of the new book. Not a tourist rite. |
| correction slip | 勘误挂条 | Recommend only. Hung = accepted as pending check. |
| adopted-out (claimed) | 出嗣 | Must have an original paper in house rules. A supplement scan is not that paper. |
| moved away for work | 外迁 / 务工 | 1987 hukou reason. Not adopted-out, not household-cancelled. |
| Hengpu Hall | 衡谱堂 | County-seat commercial genealogy shop. Not a clan hall. |
| Wankou | 湾口镇 | Town name. |
| Tongbu New Bridge Works | 铜埠新桥厂 | Collective-household destination, 1987-07. |
| west branch / east branch | 西房 / 东房 | Hall wings. Not “west room” furniture. |
| Vol. II | 西房卷二 | West-branch volume two; row 14 is the painted line. |
| dingkou / annual hall upkeep | 丁口岁修 | Mouths on the book vs. a separate share book. This desk does not award shares. |
| continuation (1998) | 续修 | Holdings copy that still names Bocen. |
| 1983 unissued draft | 一九八三年未定稿 | Dark line. “Moved away, details unknown.” |
| comparison desk | 对照台 | Left / right spread. Writes a difference slip. |
| hang the slip | 挂条 | Submit the four-box recommendation. |

Do not merge: adopted-out ≠ moved away; scanner smudge ≠ painted overlay; hung ≠ painted ≠ bounced.

## Serious allegations

- Huaichuan “sent a fake 1962 paper” — **not established by these sources**. Board users say the seal looks blue, not 1962 cinnabar. That is speech.
- Huaishan “died at the works” — **the public pages cannot determine**. The 1996 letter lacks identification materials.
- “The west branch was robbed of a share” — property is **outside this desk**. A hung slip restores a pending move-away note. It does not restore dingkou pay.

## Technical contract

- Playable HTML: `html lang="en"` on every playable page.
- Title: `Painted Line in the New Book` on the intro; inner pages use English site titles.
- Save key: `xinpugai-20260821` → `xinpugai-20260821-en`. Do not read the Chinese save.
- Ending keys stay: `hung` / `painted` / `bounced`. Token IDs stay (`v-new`, `cmp-erase`, …). Form values stay (`paint`, `move`, `hukou`, `lineonly`, `share`, `stop`, …).
- Comparison desk pair rules and required fields stay. English labels only.
- Search / alerts: English and romanization complete. Han queries are not required.
- Dates in prose: `YYYY-MM-DD` where a day exists; year-month already used as a field may stay (`1987-07`). Do not invent dates.
- How to hang (win): comparison writes “painted from the attachment” + lineage “moved away for work” + main paper “move register” + extra “lineage only” → `hung.html`.
- CSS, images, routes, file names unchanged.
- Markdown design docs (`STORY.md`, `PLAY.md`, …) stay Chinese; out of playable scope.
