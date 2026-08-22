# Localization QA — Name-Change Confront

Source snapshot: playable HTML + `js/state.js` under `/Users/Zhuanz/Desktop/英文版游戏4/改名对质/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏4/改名对质/` were not edited. `chenghuang-yeshi` was not edited.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **42**. Every playable page uses `html lang="en"`. Entry: `introduction.html`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 42 HTML files + `js/state.js`: **0**.
- Official scan (`_shared/loc_qa_scan.py` on `/Users/Zhuanz/Desktop/英文版游戏4`): **改名对质  42  en  0  0  ✓**.
- Save key is `gaiming-duizhi-v1-en` in `js/state.js`. Bare `gaiming-duizhi-v1` is gone from playable HTML/JS.
- Sentence IDs unchanged: `shu-weijiechu` `shu-tingxiang` `pu-chengji` `pu-weijie` `hukou-yigai` `zhi-mingqi` `zhi-ye` `lin-buning` `kou-wushu`.
- Claim IDs unchanged: `claim-tiaogiang` `claim-pu` `claim-hun` `claim-attitude` `claim-tingxiang` `claim-lin`.
- Crack IDs unchanged: `shu` `pu` `hun` `lin`.
- Ending pick values and filenames unchanged: `hold` / `release` / `overreach` → `chuang/result-*.html`.
- Visible save-line copy matches English `SENTENCES[id].text`. Saved buttons read “Already in the bag”.
- Routes, image paths, CSS layout, `data-save` / `data-claim` / `data-page` unchanged. Investigative dates in prose are `YYYY-MM-DD`.
- Search (`guan.html` / `jin.html`) is a static closed/forbidden face. English / romanization queries hit the same face. No Chinese alias strings kept (zero-Han target).
- Hold remains the intended recommend path in copy: oral already-jumped / already-released vs cabinet **not released**; genealogy still **Qu Chengji**; night window recommends only.

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML or `js/*.js` Han left.
- CSS comments in `css/*.css` may still contain Chinese production notes. They are not rendered into DOM text. Official `loc_qa_scan.py` counts HTML only.
- `_build.py` is a Chinese-source generator. It still points at `/Users/Zhuanz/Desktop/新游戏4/改名对质/`. Do not run it from this folder.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, `BRIEF.md`, `PLAYTEST.md`, `VISUAL.md`, and other Chinese pipeline docs were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared print. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of hold / release / overreach, including bag → confront → file.
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 42 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + IDs + save-key + ending graph. Playable English-only confront is implemented; live robot / human playthrough is still unproven.
