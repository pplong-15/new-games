# Localization QA — One Line for the Paper Figures

Source snapshot: playable HTML + `js/engine.js` under `/Users/Zhuanz/Desktop/英文版游戏4/纸扎组句/` after Gate L transcreation. Chinese originals at `/Users/Zhuanz/Desktop/新游戏4/纸扎组句/` were not edited.

Synced from CN second-pass review 2026-08-22: narrow-screen CSS + voice rewrite

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- Playable HTML count: **38**. Every playable page uses `html lang="en"`. Entry remains `introduction.html`.
- Title / placeholder / noscript Han: **0**.
- Full-file Han across those 38 HTML files: **0**.
- Full-file Han in `js/engine.js`: **0**. Hidden Chinese→English aliases are stored as `\uXXXX` escapes only (see Remaining Han policy). They are not player-visible and are not required for English-only play.
- Save key is `zhizha-juzi-v1-en` in `js/engine.js`. Bare `zhizha-juzi-v1` is gone from that file.
- Auth option values unchanged: `recommend` / `approve` / `teach`. Correct auth is `recommend`.
- Ending keys and filenames unchanged: `filed` / `burned` / `bounced` → `maiji/filed.html` `maiji/burned.html` `maiji/bounced.html`.
- Word-bag tokens in `SLOTS` / `CORRECT` / `pickEnding` / `nearMsg` / `has("w-…")` are the English CamelCase set. Pages print the same strings as pick text and `data-w`. No Chinese `data-w` remains.
- CORRECT tokens: `ShaoPu` / `FestivalPaper` / `MixedIn` / `ShaoTingFuneral` / `Unburned` / `ShaoPuAlive` / `auth=recommend`.
- Token/page IDs unchanged (`v-sentence` `v-desk` `v-order` `v-invoice` `v-group` and the rest). Routes, image paths, and CSS layout unchanged. Investigative dates in prose are `YYYY-MM-DD` or the source clock times (21:40 and the rest).
- Bag / flash / empty-select copy is English (`Tonight's bag is empty.` / `(blank)` / written-into-bag flash).

## Remaining Han policy

Allowed leftover, not treated as play-blocking:

- No playable HTML Han left. No player-visible Han in titles, buttons, placeholders, or body copy.
- `js/engine.js` has an optional hidden `ALIAS` map that canonicalizes leftover Chinese bag strings to the English tokens. The source file contains no CJK code points; aliases are Unicode escapes. Playable pages do not use Chinese `data-w`.
- CSS comments in `css/*.css` still contain Chinese production notes. They are not rendered into DOM text.
- `STORY.md`, `PLAY.md`, `GATE_*.md`, `COPY_NOTES.md`, `VOLUME.md`, `BRIEF.md`, `VISUAL.md`, `PLAYTEST.md`, and other Chinese pipeline docs were left as copied source notes. They are not playable pages.
- Still JPEGs under `img/` may show smeared print or signage. Pixels cannot be wrapped. Those glyphs are not required to proceed.

No player-visible Han remains in HTML chrome, titles, buttons, placeholders, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of all three returns (filed / burned / bounced), including near-miss whole-line rejects.
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 38 pages.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + save-key + ending graph + token rewrite. Playable English-only incident-line filing is implemented; live robot playthrough is still unproven.
