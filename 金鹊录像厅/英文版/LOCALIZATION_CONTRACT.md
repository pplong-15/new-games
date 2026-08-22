# Jinque Video Hall — localization contract

English build of 金鹊录像厅. Transcreation, not a tourist rewrite. The player is inside a Chinese county-town video hall's leftover website, reading English the way a bilingual relative might keep using the old skins.

## 1. Positioning

This is a closed-world fake-site investigation. The player is **Fang Nanxing**. Older female cousin (**biaojie**) **Lu Xiaotang** texts them to pick up a reserved ticket from a shop homepage that will not admit it has closed.

The English build must read like an investigation that happens **in that Chinese hall**, not like a guidebook to "mysterious Oriental cinema." Registers stay split:

| Source | English voice |
|---|---|
| Cream shop (2010s free template) | Dry small-business web English. Prices, hours, "coming soon." |
| Xiaotang's 2008 backup blog | Personal, slightly long, corrections in public. |
| Frontpage Points desk | Stiff table HTML. Charter voice. |
| Tianmai's 2009 space | Awkward module-wall English. Repeats himself. |
| Discuz film board | 2000s forum English. Short lines. Sig jokes. |
| Qingshi ContinuityDesk | Service-desk UI. Buttons, notices, "login required." |
| County Facts Net / local account | Officialese and local-news lead. Dates, no lyric. |
| Internal Song-style files | Dry procedure. Stamps. Seat numbers. |
| Yellow classifieds | Ad English. Free listing that should not be free. |
| Guide / Help / search chrome | Plain UI English. No folklore styling. |

Do not flatten all of the above into one polished narrator.

## 2. Evidence limits

World facts, IDs, dates, routes, token graph, and ending graph are unchanged.

Required ending facts stay `fact_stub`, `fact_hou`, `fact_lu`, `fact_empty`, `fact_tian`.

Hedges (do not upgrade):

- Gazetteer: owner **OldHou** is **unaccounted for**; **no fire finding**. Absence of a body is not a confirmed death on the public pages.
- Station visit (local account): no blood, no leaving note. Someone *said* they saw him in the last row. That sighting is not established by these sources.
- Oral page: **oral is not testimony**. "He sat down into Credits" is a retelling, not a signed finding.
- Grey coat in the album: Tianmai said exposure. The public pages cannot determine who, or whether, that pixel is a person.
- Ending B: whether Lu Xiaotang comes back, **this site does not guarantee**. The site only guarantees someone was sitting before the lamp went out.
- Ending A: she does not walk out of Credits in that ending; she also stops texting. That is the hall's filing, not a police close.
- LampDebt is house talk on a thin forum thread, not a proven supernatural law.

Do not add ghosts, curses, or a solved fire. Do not exonerate anyone because a page is missing.

## 3. Allowlist (remaining Chinese)

Player-visible **DOM text in generated HTML is English** (build Han count 0).

Chinese that remains is evidence or hidden alias, not a literacy gate:

| Kind | Where | Bridge |
|---|---|---|
| ZH-BRAND in pixels | `img-home-marquee.jpg` (Jinque strokes, one missing) | Home caption: remaining strokes still read Jinque. |
| ZH-FRONT in pixels | `img-ticket-stub.jpg` (hall / ExtraShow / 14-7) | Ticket caption transcribes the face. |
| ZH-FRONT in pixels | `img-handbook-cover.jpg` (old house title) | Handbook caption: inside the desk it is just Handbook. |
| ZH-FRONT in pixels | `img-films-board.jpg` (chalk titles + untitled line) | Showtimes caption: two titles and a line with no name. |
| Hidden aliases | `js/keywords.js` queries | Not rendered as page copy. English tokens are on the pages. |
| Hidden login aliases | `js/engine.js` still accepts 田麦 / 坐到完 | Visible passphrase on Tianmai's space is **SitThrough**. |

No other player-facing Han. CSS comments and Chinese playtest briefs are developer files, not the play path.

## 4. Names and terms

Surname-first in prose (`Fang Nanxing`). Search tokens are single CamelCase tokens with **no spaces**.

| Chinese | Prose | Search / login token |
|---|---|---|
| 方南星 | Fang Nanxing | FangNanxing (near-login only) |
| 陆小棠 | Lu Xiaotang, older female cousin (biaojie) | LuXiaotang |
| 南南 | Nannan | — |
| 田麦 | Tianmai | Tianmai |
| 老侯 / 侯长河 | Old Hou / Hou Changhe | OldHou |
| 金鹊录像厅 | Jinque Video Hall | — |
| 梨河县 / 金鹊镇 / 金鹊西路 | Lihe County / Jinque Town / Jinque West Road | — |
| 加映场 / 末场灯 | extra late showing / last-lamp nickname | ExtraShow / LastLamp |
| 金鹊积分 / 积分 | house points | Points (also JinquePoints) |
| 留座 | name printed on a chair — not a normal reservation | HoldSeat |
| 场记 / 场记台 / 青石场记 | continuity clerk / Qingshi desk | ContinuityDesk |
| 场记手册 | desk manual | Handbook |
| 空座 | empty chair while Credits run | EmptySeat |
| 文娱志 | county entertainment excerpt | Gazetteer |
| 胶片仓 | print store | FilmVault |
| 票根 | ticket stub | Stub |
| 放映日志 | booth log | ProjectionLog |
| 字幕 | end roll that registers the sitter | Credits |
| 还灯债 | house talk: sit until the lamp is paid | LampDebt |
| 洗片间 | processing room | Darkroom |
| 寻场记 | classified standing-in notice | WantedClerk |
| 关站 | auditorium closed, site not | ClosedHall |
| 来访 | space visitor module | Visitors |
| 包厢 | fake nav | PrivateRoom |
| 末班票 | refund or sit through | LastTicket |
| 坐到完 | sit until Credits end | SitThrough (passphrase) |

Do not merge HoldSeat with ordinary booking. Do not merge ExtraShow with overtime (the shop copy itself says people mix those up). Do not translate 场记 as "script supervisor" in a Hollywood sense; here it is the person whose name the lamp keeps on a seat.

## 5. Tech contract

- Runtime truth for copy: `gen-pages.js`. Do not hand-edit generated HTML.
- After copy edits: `node gen-pages.js` from this folder.
- `html lang="en"`.
- Save key: `jinque-hall-v1-en` (Chinese build stays `jinque-hall-v1`).
- Search: one token, no whitespace; Han **or** Latin `[A-Za-z][A-Za-z0-9]*`; lookup case-insensitive; `maxlength` 32.
- Chinese queries remain as aliases. English-only input must complete the chain.
- Login: **Tianmai** / **SitThrough** (aliases 田麦 / 坐到完). Near-misses have English aliases. Case-insensitive.
- Do not change page IDs, `PAGE_NO`, hrefs, fact IDs, skins, CSS layout, or image paths.
- Dates stay `YYYY-MM-DD` or the shop's `2012/08/19` style where the skin already used it.
