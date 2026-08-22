# Localization QA — Painted Line in the New Book

Source snapshot: dest `/Users/Zhuanz/Desktop/新版游戏英文版2/新谱涂改/` after Gate L transcreation (2026-08-21). Chinese runtime left untouched at `/Users/Zhuanz/Desktop/新游戏2/新谱涂改/`.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on playable `*.html`, `js/engine.js`, `css/*.css`. Full-file regex `[\u4e00-\u9fff]` includes `<script>` (no `data:` payloads in this game).

| Gate | Result | Notes |
|---|---|---|
| Playable HTML count | **37** | All `lang="en"`. No `zh-CN` leftover. |
| Full-file Han in HTML + JS + CSS | **PASS** | **0**. Title / placeholder / noscript Han **0**. |
| Ending keys | **PASS** | `hung` / `painted` / `bounced` unchanged. `pickEnding` still: extra `share`/`stop` → bounced; dirt `paint` + line `move` + proof `hukou` + extra `lineonly` → hung; else painted. |
| Form / token IDs | **PASS** | Slip values `smudge`/`miss`/`paint`, `chusi`/`move`/`drop`, `scan2019`/`hukou`/`oral`, `share`/`lineonly`/`stop`. Compare tokens `cmp-erase` / `cmp-reason` / `cmp-year` / `cmp-move`. Visit tokens `v-new` `v-old` `v-hk` `v-bbs` `v-draft` `v-east` `v-factory` `v-borrow`. |
| Save-key isolation | **PASS** | `xinpugai-20260821` → `xinpugai-20260821-en`. |
| Search English-only | **PASS** | Desk / page / hukou finders accept Latin and romanization (`Huaishan`, `RuiQiu`/`Qiu`, `compare`, `HP-Bu`, `Bocen` as contents hit). No Han required. Courtesy name Bocen is not a hukou key (miss page). |
| Displayed IDs | **PASS** | `RQ-Xi-08`, `GT-Ye`, `HP-Bu-19-07` (source `RQ-西-08` / `GT-夜` / `HP-补-19-07`). |
| JS parse | **PASS** | `node --check` on `js/engine.js` and **24** inline script blocks. |
| Contract present | **PASS** | `LOCALIZATION_CONTRACT.md` written before HTML/JS edits. |
| Batch scanner | **PASS** | `loc_qa_scan.py` on dest root: this folder **37 / en / 0 / 0**. |

Register spot-check (source read, not a second reader): Rui Qiu intro still rambles and self-corrects; Hengpu desk / Ge Ting stay short and cold; library leads with house rules; hukou copies like a gazetteer leaf; town-board floors stay 2000s net English (fragments, `dont`, `aint`).

## Unproven gates (do not mix with PASS)

These were **not** run on this snapshot.

- **English-only live playthrough** (browser-robot or human): not played. Click path has no Han input gate; comparison ticks and three endings were not walked in a browser.
- **file:// vs http host**: not compared.
- **Screen reader / a11y**: no VoiceOver pass.
- **Register read-aloud**: five mouths spot-checked in source, not by a second reader.
- **Chinese save import**: English key must not read `xinpugai-20260821`. Not tested with both editions open.
- **Design markdown** (`STORY.md`, `PLAY.md`, gate notes, `COPY_NOTES.md`, etc.): left as Chinese design leftovers. Not player chrome. Out of playable Han count.
- **Photo Han**: cover image `img/cover-paper.png` may still hold pixels. Not DOM text.

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only note → desk / library / hukou / board → compare → four-box `hung` pass is marked separately.

## How to hang (English)

1. Open the electronic page (row 14), the 1998 library copy, then either the 1987 move register (search **Huaishan**) or the branch-head floor.
2. Comparison desk: spread 1998 copy ∥ electronic page; tick **this line** and **status note** → writes the paint difference.
3. Spread electronic page ∥ move register; tick **status note** and **leave or stay** (or thread ∥ electronic page and tick **dated year**).
4. Correction slip: **Someone painted from the attachment** / **Moved away for work** / **Move register** / **Lineage only, no property** → `hung.html`.

## World facts kept

- Title: Painted Line in the New Book.
- Names: Rui Qiu, Rui Huaishan (Bocen), Rui Huaichuan, Rui Yanmu, Ge Ting, You Shuang.
- Terms: yuanpu, correction slip, adopted-out (claimed) ≠ moved away for work, Hengpu Hall, dingkou / hall-upkeep.
- Dates: 1987-07 move; 1996 works letter; 1998 continuation; 2019-03-12 20:04 east ingest; tonight 17:12 west save; upload window 23:00.
