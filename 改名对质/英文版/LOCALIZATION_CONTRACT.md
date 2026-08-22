# English Localization Contract — Name-Change Confront

Full spoilers. Gate L transcreation for 改名对质. The Chinese runtime remains the source of truth. This edition does not invent plot, teach a jump-the-wall method, issue a household-register tutorial, proxy a rite, or edit a genealogy.

## Positioning

Working title: **Name-Change Confront** (改名对质).

The edition must read as an English-language night shift *inside* a Chinese county household-register hall. The player is night-window clerk **Qin Shu**. Tonight a man at the glass wants a **name-change receipt** and asks after **marriage papers**. He says jump-the-wall is already done. Qin Shu is not an approver. The stamp is in the day-shift chief’s drawer. Night window only writes whether to **recommend issuing tonight**.

The player solves provenance / identity / chronology / rule-meaning: which name lives on which paper, whether oral “already released” matches the cabinet column, and how far a night clerk’s recommendation may go. It is not a Chinese literacy test and not a tourist rite tour.

Registers stay split:

- **Pre-shift sheet / introduction**: cold staff briefing. Staff id, oral claim, the already-printed “not released” line, and the confront door sit on one page. No lyric.
- **Night-window desk (`chuang/*`)**: Qin Shu restates columns. Short. He will recant a line rather than invent a release that is not in the cabinet.
- **Qu Wanhe at the glass**: rushed. Repeats “already jumped.” Point a field and he pushes back. Point attitude and he pushes harder.
- **Annex cabinet (`shu/*`)**: Miao Shouxia’s file voice. In the box or not. Released or not. Vermilion is a status, not a story. The cabinet does not teach the wall.
- **South Street genealogy office (`pu/*`)**: Ji Puzhou one-mouth, half-literary, earthy. Repeats the Cheng generation. Wants a fee slip. Will not night-edit.
- **Public notices (`zhi/*`)**: short counter memo. Three-column names-aligned. Night window recommends. Not national-emblem pomp.
- **Mailbox (`you/*`)**: Xi Lu is cold cc; numbers written in full; do not merge. Lan Huai scolds her own section in short lines.
- **Old blog (`kou/*`)**: Qu Wanhe rambles and leaves gaps. Jiang Tangzhi only nags 07:00. Qu Qiuchan remembers illness and stop-incense, not the box.
- **Misc-ask (`wen/*`)**: folk Q&A that splits four names. No method. No how-to.
- **Closed / forbidden (`guan.html` / `jin.html`)**: machine face. Lookup does not open a new file at night. Proxy is not a night-window door.

## Evidence limits (do not inflate)

Do not merge these objects:

- **jump-the-wall** (tiaogiang; coming-of-age release from temple lodging) ≠ **household-register rename**
- **stop-incense** (tingxiang; reception stopped) ≠ **voiding the old lodging slip**
- **household-register name** Qu Xiaohe → Qu Wanhe ≠ **genealogy name** still Qu Chengji
- **dharma name** Jinghe / **milk name** Hehe ≠ household-register name
- **Linpu County same-name Qu Wanhe** is another person. **This specific merge is ruled out.**
- **night window recommend** ≠ issuing marriage-file originals; cannot proxy jump-the-wall; cannot edit the genealogy

Bounded claims:

- The annex-cabinet copy (Qu-clan Hehe, dharma name Jinghe, vermilion **not released**) proves the column in the box. It does **not** prove whether anyone at Qingwa Nunnery once watched a person step a low garden wall.
- Stop-incense in 2024-09 stopped **reception**. The stop-board copy says old slips were moved to the county cabinet, not burned. Stopped is not released.
- Household-register extract 2025-11-08 proves police finished Qu Xiaohe → Qu Wanhe (reason: name for use before marriage). It does **not** notify the genealogy office and does **not** release the lodging slip.
- South Street west-branch extract proves the genealogy name is still **Qu Chengji**. A side note “Hehe” is a household shout, not a rename column. “Wanhe” is not a generation character on this branch.
- Ji Puzhou’s one-mouth note proves this office **never received** a police rename notice. No fee record for Qu Chengji means **not established by these sources** that anyone already paid to move the line.
- Lan Huai’s slip writes **names aligned** as three columns: household-register name, genealogy name, lodging-release. A condition is not a finding that he is already aligned.
- Night window **only recommends**. It does not issue marriage-file originals, does not perform jump-the-wall, does not edit a genealogy line.
- Old-blog jump-the-wall scene proves an oral memory with **no document number**. Oral scene cannot stand as release.
- Xi Lu’s cc proves Linpu has a female Qu Wanhe, born 1999-03, receipt **Lin-Hu-Gai-8841**, reason unrelated to marriage. Same three characters are not one household. The public pages cannot determine anything about Bunan lodging-release from that receipt.
- Missing a column is not innocence and not a completed rite. Use: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

Hold is the intended recommend path: oral “already jumped the wall / lodging already released” versus cabinet copy still **not released**; genealogy name still **Qu Chengji**; night window only recommends.

## Retained-Chinese allowlist

Prefer **zero player-visible Han**. Play does not require reading Chinese.

This edition targets **0 Han** in playable `*.html` and `js/*.js`. No `.zh-artifact` wrap is required on this pass.

If a later pass restores visible Han, wrap it:

| Tag | Where it would be | Bridge |
|---|---|---|
| ZH-NAME | A name on a scan or seal | `.zh-artifact[lang="zh-Hans"]` + `.artifact-translation` |
| ZH-FRONT | Glyphs inside still JPEGs | English caption / empty `alt` as in source; pixels only |
| ZH-TERM | A document-number glyph on a scan | Same-stage English receipt id (`Lin-Hu-Gai-8841`, `Wa-Shu-17`) |

Hidden compatibility:

- Search boxes on genealogy / misc-ask pages POST/GET to static `guan.html`. They do **not** filter. English / romanization queries (`QinShu`, `QuWanhe`, `QuXiaohe`, `Jinghe`, `Hehe`, `Qingwa`, `Bunan`, `Linpu`, and spaced forms) already “work”: they hit the same closed face. No Chinese alias strings are kept in playable HTML/JS (zero-Han target).
- Still JPEGs may contain smeared print. Those glyphs are not required to proceed.

## Names and terms

Surname-first romanization in prose. Search/pick tokens may be one CamelCase unit. Sentence IDs, claim IDs, crack IDs, `data-save` / `data-claim` / `data-page`, and ending pick **values** stay.

| Source | English (bounded) | Do not merge with |
|---|---|---|
| 覃书 | Qin Shu | — |
| 屈晚禾 | Qu Wanhe (tonight’s caller; household name after 2025-11-08) | Linpu Qu Wanhe |
| 屈小禾 | Qu Xiaohe (prior household-register name) | Qu Wanhe; Qu Chengji |
| 屈承稷 | Qu Chengji (genealogy name, still on the west branch) | household name |
| 净禾 | Jinghe (courtesy-lodging dharma name) | household name |
| 禾禾 | Hehe (milk name) | household name |
| 江棠枝 | Jiang Tangzhi | — |
| 缪守匣 | Miao Shouxia | — |
| 纪蒲舟 | Ji Puzhou | — |
| 蓝槐 | Lan Huai | — |
| 屈秋蝉 | Qu Qiuchan | — |
| 席芦 | Xi Lu | — |
| 埠南县 | Bunan County (fictional) | any real county |
| 临浦县 | Linpu County (fictional) | Bunan |
| 青瓦庵 | Qingwa Nunnery (fictional) | a police window |
| 寄名 | courtesy lodging (jiming): a child’s name lodged at a temple | household rename |
| 跳墙 | jump-the-wall: coming-of-age release from the lodging | hukou rename; stop-incense |
| 停香 | stop-incense: reception stopped | voiding the old slip |
| 户口名 | household-register name | genealogy name; dharma name |
| 谱名 | genealogy name | household-register name |
| 名齐 | names aligned (mingqi) across the three columns | “already aligned” as a fact |
| 改名回执 | name-change receipt | marriage-file original |
| 夜窗 | night window | day-shift approval |
| 对质 | confront (point the oral line that fails a column) | a courtroom |
| hold | withhold tonight | release / overreach |
| release | issue on the oral claim | hold |
| overreach | attempt the rite or alter the genealogy | recommend |

Document numbers without Han: copy **Wa-Shu-17**; cabinet **Annex 3**; Linpu receipt **Lin-Hu-Gai-8841** (Linpu household-change 8841). Ticket **186**.

## Serious allegations

- Oral “already jumped / already released” against a vermilion **not released** is a **column mismatch**, not proof he never stepped a wall, and not a curse.
- Qu Wanhe welding stop-incense to release is his push-back. Stopped reception is the nunnery’s door. His release is another column.
- Writing issuable from his mouth makes the receipt treat **names aligned**. Marriage-paper window and later notary can still bounce. That bounce is procedural, not established malice.
- Ticking proxy jump-the-wall or a night genealogy edit is **overreach**. Night window has neither power. Enthusiasm on the slip becomes a handle.
- Linpu’s female Qu Wanhe is **another household**. Using that receipt as tonight’s release **is ruled out**.
- Jiang Tangzhi’s 07:00 nag proves someone is hurrying. It does not prove names aligned.

## Technical contract

- Work only in `/Users/Zhuanz/Desktop/英文版游戏4/改名对质/`. Do not edit `/Users/Zhuanz/Desktop/新游戏4/` or `chenghuang-yeshi`.
- Playable pages: every `*.html` in this folder (entry `introduction.html`). No new pages.
- `html lang="en"` on every playable page.
- Routes, file names, image paths, CSS layout, sentence IDs, claim IDs, crack IDs, `data-save` / `data-claim` / `data-page` unchanged.
- Sentence IDs stay: `shu-weijiechu` `shu-tingxiang` `pu-chengji` `pu-weijie` `hukou-yigai` `zhi-mingqi` `zhi-ye` `lin-buning` `kou-wushu`.
- Claim IDs stay: `claim-tiaogiang` `claim-pu` `claim-hun` `claim-attitude` `claim-tingxiang` `claim-lin`.
- Crack IDs stay: `shu` `pu` `hun` `lin`.
- Ending pick values stay: `hold` `release` `overreach`. Filenames stay `result-hold.html` `result-release.html` `result-overreach.html`.
- Visible save-line text matches English `SENTENCES[id].text` (same fact, English wording). Saved buttons read “Already in the bag”.
- Dates in investigative prose: `YYYY-MM-DD`. Clock times already used stay as 22:00, 16:40, 20:40, 07:00.
- Independent save key:

| Chinese | English |
|---|---|
| `gaiming-duizhi-v1` | `gaiming-duizhi-v1-en` |

- Search: static closed face at `guan.html`. English / romanization input is enough. No CDN. No new plot pages.
