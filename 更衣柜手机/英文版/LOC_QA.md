# Localization QA — Locker Phone

Source snapshot: dest `/Users/Zhuanz/Desktop/新版游戏英文版2/更衣柜手机/` after Gate L transcreation (2026-08-21). Chinese runtime left untouched at `/Users/Zhuanz/Desktop/新游戏2/更衣柜手机/`.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on playable `*.html`, `js/phone.js`, `css/*.css`. Full-file regex `[\u4e00-\u9fff]` includes `<script>` (no `data:` payloads in this game).

| Gate | Result | Notes |
|---|---|---|
| Playable HTML count | **37** | All `lang="en"`. No `zh-CN` leftover. |
| Full-file Han in HTML + JS + CSS | **PASS** | **0**. Title / placeholder / noscript Han **0**. |
| PIN | **PASS** | `lock.html` still `pin === "3716"`. Duty slip still prints employee number 3716. Pad labels `CLR` / `OK`. |
| Ending files | **PASS** | `end-return.html` / `end-new.html` / `end-old.html` / `end-off.html` still the four routes from `backroom.html`. |
| Save-key isolation | **PASS** | Prefix `gys_` → `gys_en_`. Flag names unchanged (`seen0314`, `seen0812`, `seenmemo`, `seencalls`, `seencal`, `seenlocker`). |
| JS parse | **PASS** | `node --check` on `js/phone.js` and 13 inline script blocks. |
| Contract present | **PASS** | `LOCALIZATION_CONTRACT.md` written before HTML/JS edits. |
| Batch scanner | **PASS** | `loc_qa_scan.py` on dest root: this folder **37 / en / 0 / 0**. |

Register spot-check (source read, not a second reader): Kuang stays short and store-first; Mi Tang stays long and repeating; Fang stays dates/drawer/money; Aunt Rong stays vest-gossip; Wei stays clipped ticket-talk. Memos still leak private matter from stock lists.

## Unproven gates (do not mix with PASS)

These were **not** run on this snapshot.

- **English-only live playthrough** (browser-robot or human): not played. Tap path has no Han input gate; four endings and flag-dependent back-room lines were not walked in a browser.
- **file:// vs http host**: not compared.
- **Screen reader / a11y**: `aria-label`s are English; no VoiceOver pass.
- **Register read-aloud**: five SMS mouths spot-checked in source, not by a second reader.
- **Chinese save import**: English prefix must not read `gys_*` Chinese saves. Not tested with both editions open.
- **Design markdown** (`STORY.md`, `PLAY.md`, gate notes, `COPY_NOTES.md`, etc.): left as Chinese design leftovers. Not player chrome. Out of playable Han count.

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only lock → SMS/gallery/memo/calls → back-room four-ending pass is marked separately.

## World facts kept

- Title: Locker Phone.
- Names: Shen Suo, Bu Tiansui (Sui), Kuang Shouye, Mi Tang, Fang Jing, Aunt Rong, Wei Du.
- Terms: health certificate, later attachment, white-bg A/B, Alley Huilin Mart, Alley Snapshot.
- Dates: 2023-03-14 certificate sitting; 2026-08-12 later attachment; 2026-08-20 01:22 / 11:08 call.
