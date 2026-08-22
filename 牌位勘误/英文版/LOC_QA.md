# Localization QA — Tablet Catalog Slip

Source snapshot: playable HTML + `js/engine.js` under `/Users/Zhuanz/Desktop/新版游戏英文版2/牌位勘误/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏2/牌位勘误/` were not edited.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **46**. Every playable page uses `html lang="en"`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 46 HTML files: **0**. The old login alias `卫-0821` was removed so the desk does not keep a Han string in playable HTML. Login is `Wei-0821` only.
- Save key is `paiwei-kanwu-v1-en` in `js/engine.js`. Bare `paiwei-kanwu-v1` is gone from that file.
- Scheme-card option values unchanged: `hesheng` `shouchun` `yao` `jiang` `qiuping_dead` `qiuping_note` `blank_hold` `east_sheng` `east_dead` `west` `hesheng_dead` `hesheng_alive` `unknown` `print` `fax` `weituo_obit` `forum` `recommend` `approve` `dianzhu` `edit`.
- Ending keys and filenames unchanged: `hold` / `print` / `half` / `over` → `desk/result-*.html`.
- Locker note and archive register write English staff id **Wei-0821**. Login fill writes `Wei-0821`. Chinese alias `卫-0821` is not accepted.
- Routes, image paths, CSS layout, emails, and clock times unchanged. Investigative dates in prose are `YYYY-MM-DD`.
- dianzhu pages name the rite and the print-only limit. They do not teach a tablet-dotting method.

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML Han left. Staff id is `Wei-0821` only.
- CSS comments in `css/*.css` still contain Chinese production notes. They are not rendered into DOM text. Official `loc_qa_scan.py` counts HTML only.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, and other Chinese pipeline docs were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared print or empty objects. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of all four returns (hold / print / half / over).
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 46 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + login alias + save-key + ending graph. Playable English-only cataloging is implemented; live robot playthrough is still unproven.
