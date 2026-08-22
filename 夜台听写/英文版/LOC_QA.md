# Night Desk Transcript — localization QA

Gate L snapshot for `/Users/Zhuanz/Desktop/新版游戏英文版2/夜台听写/` only. Chinese originals under `/Users/Zhuanz/Desktop/新游戏2/夜台听写/` were not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder after the HTML/JS transcreation:

| Check | Result |
|---|---|
| Playable HTML files | 42 |
| `html lang="en"` | 42 / 42 |
| Document title / placeholder / noscript Han | 0 |
| Full-file Han in `*.html` (includes `<script>`) | 0 |
| `js/seen.js` storage key | `yt_en_seen` |
| Annotate storage key | `yt_en_end` |
| Ending keys | Unchanged: `true`, `tape`, `erfang`, `hold` |
| Annotate control values | Unchanged: `bochuan` / `wanqiu` / `zhonghuai` / `jiping` / `houshui` / `luan`; `s2214` / `s2231` / `pay` IDs; `chang` / `er` / `san` / `xi` / `blank` / `unsure` |
| Grade order | `true` → `erfang` → `tape` → `hold` |
| Node `grade()` six asserts | `true` path; Bochuan tick → `tape`; pay `er` → `erfang`; pay `xi` → `erfang`; 22:14 `bochuan` → `tape`; unpinned → `hold` |
| `node --check` on `js/seen.js` and extracted annotate script | Pass |
| Clip-search UI | None. Timeline remains click-the-bar |
| `LOCALIZATION_CONTRACT.md` | Present |
| `loc_qa_scan.py` on this folder | `html 42` `lang en` `全文汉字 0` `界面中文 0` |

Source of truth remains the Chinese folder. English HTML was hand-transcreated page by page (this game is not a `gen-pages` build).

## Correct marks (English)

True-path recommendation, key `true`:

- Present on the main stretch: **Zhonghuai, Wanqiu, Houshui, Luan Shouyi**
- Not present: Bochuan, Jiping
- 22:14 speaker: **Zhonghuai**
- 22:31 speaker: **Wanqiu**
- First-seven money: **elder branch by proxy** (`chang`)

Locked terms used in play: Pu Sheng, Gu Zhonghuai, Tang Wanqiu, Gu Bochuan, touqi, gift register, paid by proxy, host of record. West room (spoken / form trap) vs west wing (iron box, fire notice) left split.

## Unproven gates (do not mix with PASS above)

Not run in this pass:

- Full English-only playthrough in a real browser (shift sheet → timeline clicks → papers → four annotate paths).
- Screen reader / keyboard-only beyond existing link structure.
- `file://` quirks on a given OS.
- Isolation test: Chinese saves `yt_seen` / `yt_end` vs English `yt_en_seen` / `yt_en_end` on one origin.
- Human register read of all 42 pages against the contract table.
- OCR of remaining Chinese **in image pixels** (mixer, waveform, hall, iron box, village board, corridor, shopfront, request stop, cassette). Players are not asked to OCR. Pixel Han is not a DOM defect.

Chinese `STORY.md` / `PLAY.md` / gate notes in this folder are source-side documents, not player-facing. CSS comments may still contain Han; the scanner only reads `*.html`.
