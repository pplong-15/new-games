# Localization QA — Three Doors at Qingming

Source snapshot: playable HTML + `js/sanmen.js` under `/Users/Zhuanz/Desktop/英文版游戏4/清明三门/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏4/清明三门/` were not edited. `chenghuang-yeshi` was not edited.

Synced from CN second-pass review 2026-08-22: narrow-screen CSS + voice rewrite

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **47**. Every playable page uses `html lang="en"`. Entry remains `introduction.html`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 47 HTML files: **0**.
- Full-file Han in `js/sanmen.js`: **0**.
- Official `loc_qa_scan.py` pointed at `/Users/Zhuanz/Desktop/英文版游戏4` reports this game as `47 / en / 0 / 0` with both contract files present.
- Official `loc_qa_scan.py` pointed at the game folder itself only iterates `css/` `img/` `js/` (0 HTML) because playable pages sit at folder root. Direct scan of `*.html` + `js/*.js` is the count used above.
- Save key is `qingming-sanmen-v1-en` in `js/sanmen.js`. Bare `qingming-sanmen-v1` is gone from that file.
- `MAX` stays 3. Handover still clears `opened`, keeps `verified` / `seen`, increments `round`.
- Verify token IDs unchanged: `ash-neighbor` `gu-private` `code-martyr` `deliver-12` `cross-hexiao` `same-day` `old-ticket` `lore-ghost`.
- Door IDs unchanged: `tousu` `qu12` `lie` `song` `xiao` `kao` `han` `shuo`.
- `submitNote` option values unchanged: nature `cross|ghost|private`, codeTo `martyr|plot12|none`, goodsTo `plot12|martyr|none`, action `note|change|pass`.
- Correct note path still: nature=`cross`, codeTo=`martyr`, goodsTo=`plot12`, action=`note`, plus verified `ash-neighbor` `code-martyr` `deliver-12` `cross-hexiao` → ending `note`.
- `change`/`pass` → `overbook`. nature `ghost` → `ghost`. Otherwise `thin`.
- Ending filenames unchanged: `ending-note.html` `ending-overbook.html` `ending-ghost.html` `ending-thin.html`.
- Routes, image paths, CSS layout, and door/token IDs unchanged. Investigative dates in prose are `YYYY-MM-DD`.
- `thinHint()` / `labelV()` / `paintMini()` / `doorName()` / `paintBoard()` / `bindVerify` button text are English. Mini line: `Shift N · opened X/3 · Y sentences kept`. Verify button: `Already on the board`.
- Write-limit page uses the three evidence phrases. Lore-ghost is named as a sentence people tell and is ruled out as a closing nature. Cold Food Day old ticket is a side line and cannot close tonight.

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML or `js/*.js` Han left.
- CSS comments in `css/*.css` may still contain Chinese production notes. They are not rendered into DOM text. Official `loc_qa_scan.py` counts HTML only.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, and other Chinese pipeline docs were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared print or objects. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of all four returns (note / ghost / overbook / thin).
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 47 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + save-key + token/door IDs + ending graph. Playable English-only duty-remark filing is implemented; live robot playthrough is still unproven.
