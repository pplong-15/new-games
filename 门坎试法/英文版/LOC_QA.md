# Localization QA — Threshold Trial

Source snapshot: playable HTML + `js/engine.js` under `/Users/Zhuanz/Desktop/英文版游戏4/门坎试法/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏4/门坎试法/` were not edited. `chenghuang-yeshi` was not edited.

Synced from CN second-pass review 2026-08-22: narrow-screen CSS + voice rewrite

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **44**. Every playable page uses `html lang="en"`. Entry remains `introduction.html`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 44 HTML files + `js/engine.js`: **0**.
- Official scan (`loc_qa_scan.py` on this folder, then on `英文版游戏4`): this game reports **44** html, lang `en`, full-file Han **0**, UI Han **0**.
- Save key is `menkan-shifa-v1-en` in `js/engine.js`. Bare `menkan-shifa-v1` is gone from that file.
- Login is `Chai-0821` only (doorframe note + fill-link). Chinese alias `柴-0821` is not accepted and is not stored in playable HTML/JS.
- Try-form values unchanged: `step` `pole` `clean`. `step` / `pole` still mark `verified.broke` and route to `try-reject.html`; `clean` → `try-ok.html`.
- Advise-form values unchanged: nature `wedding|funeral|rewrite`; record `clean|stepped`; act `letin|hold|rewrite`; auth `recommend|approve`.
- Mark keys unchanged: `verified.broke` `seen.record` `seen.sms` `seen.key` `seen.borrow`.
- Ending keys and filenames unchanged: `hold-funeral` / `rewrite` / `let-in` / bounce codes → `result-hold.html` `result-rewrite.html` `result-letin.html`.
- Routes, image paths, CSS layout, and clock times unchanged. Investigative dates in prose are `YYYY-MM-DD` (Jiang Mie item: `2026-08-19`).
- `chipsHtml()` uses: `Verified: the rule was broken once` / `Opened: threshold record` / `Opened: a source that this is funeral, not wedding`.
- Folk pages name do-not-step / opposite walks. They do not teach a rite method. Desk does not approve a key or rewrite the board.

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML or `js/*.js` Han left. Staff id is `Chai-0821` only.
- CSS comments in `css/*.css` may still contain Chinese production notes. They are not rendered into DOM text.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, and other Chinese pipeline docs were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared cloth, wood, or a key box. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of hold-funeral / let-in / rewrite and all bounce codes.
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 44 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + login alias + save-key + ending graph. Playable English-only night-duty filing is implemented; live robot playthrough is still unproven.
