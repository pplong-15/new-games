# Localization QA — Stele Jump

Source snapshot: playable HTML + `js/beiwen.js` under `/Users/Zhuanz/Desktop/英文版游戏4/碑纹跳切/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏4/碑纹跳切/` were not edited. `chenghuang-yeshi` was not edited.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **39**. Every playable page uses `html lang="en"`. Entry remains `introduction.html`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 39 HTML files + `js/beiwen.js`: **0**.
- Save key is `beiwen-tiaqie-v1-en` in `js/beiwen.js`. Bare `beiwen-tiaqie-v1` is gone from that file.
- Submit choice values unchanged: `recarve` `same` `approve`.
- Ending filenames unchanged: `desk/result-recarve.html` `result-same.html` `result-approve.html`.
- `BW.mark("…")` token strings unchanged (`night` `nomerge` `zhi` `smear1986` `chi` `family` and the rest of the 39 marks).
- Routes, image paths, CSS layout, hotspot coordinates, form field names, and radio values unchanged. Investigative dates in prose are `YYYY-MM-DD`.
- Catalog IDs romanized in place so playable HTML stays 0 Han: `Shipu-Bei-117` / `Shipu-Zhi-117` / `Puyin-Bei-031` / `Puyin-Zhi-031`.
- Desk top-bar lookup remains a decoy. English copy states Ji Wenshan / Ji Dusheng / He Zhiting return empty.
- Result why-lines in `desk/result-*.html` still read `seen.zhi` / `seen.smear1986` / `seen.family` and stay English.

Official `loc_qa_scan.py` pointed at this game folder lists site subdirectories (`desk` `gov` `rub` …) and does not roll up root `introduction.html`. A folder-wide HTML+JS regex scan was used for the 0-Han and 39-page counts.

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML or `js/*.js` Han left.
- CSS comments in `css/*.css` still contain Chinese production notes. They are not rendered into DOM text.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, `_gen.py`, `_mkimg.py`, and other Chinese pipeline files were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared graphs or empty objects. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, script-injected why-lines, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of all three returns (recarve / same / approve), including object-jump DAG and decoy search.
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 39 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + save-key + choice graph + 0-Han HTML/JS. Playable English-only lookup is implemented; live robot playthrough is still unproven.
