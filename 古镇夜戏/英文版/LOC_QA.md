# Localization QA — Night Play in an Old Town

Source snapshot: HTML + JS under `/Users/Zhuanz/Desktop/新游戏英文版/古镇夜戏/` after Gate L transcreation. Chinese originals were not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder:

- All playable `*.html` use `html lang="en"`.
- 42 pages carry unique English `.supp` transcreated from the current Chinese volume fill (no recycled Old Teahouse / clinic-nurse padding; no `N/42` footers). Introduction and search-results have no `.supp`, matching Chinese.
- Save key is `guxz-v1-en` in `js/tokens.js` and the introduction wipe. Bare `guxz-v1` is gone from those files.
- Search gate accepts one Latin token or one Han word; lookup is case-insensitive; Chinese aliases remain in `js/keywords.js`.
- Search inputs have `maxlength="32"`. Intro / miss copy does not say "Chinese characters only".
- Home and ticket first main-paragraph word: **NightPlay**.
- Required CamelCase tokens are visible on the keyword landing pages (Extra, DutyBook, DiHou, ShenNan, IncenseAccount, Laolang, Mulian, NightPlay, WhitePlay, ChengShi, MaJu, DouPi, Stagehand, CurtainUp, Backstage, Playbill, QiaoGan, WuChuang).
- Zero Han in HTML body text (scripts stripped). Grants, element IDs, hrefs, dates, ticket `YX-0821-19`, phone `13972810834`, and ending keys unchanged.
- Login still accepts `YX-0821-19` or `13972810834`. Ending `NEED` / `GO` maps unchanged.

## Remaining Han policy

Allowed / leftover, not treated as play-blocking:

- `js/keywords.js` Chinese strings are **hidden aliases** (plus the original forbidden pair `源码` / `管理员密码`). They are not page copy.
- Still JPEGs under `assets/stills/` may show shop signs, lanterns, or printed playbills. Pixels cannot be wrapped as `.zh-artifact`. Those glyphs are not required search tokens.
- CSS comments in `css/*.css` still contain Chinese production notes. They are not rendered into DOM text.
- `GATE_A.md`, `STORY.md`, `VOLUME.md` left in Chinese per brief.
- `tools/build_site.py` still generates Chinese HTML; do not run it over this edition.

No player-visible Han remains in HTML chrome, titles, buttons, or body copy.

## Unproven gates (do not mix with PASS)

Not run on this pass:

- Full English-only browser playthrough of all four endings (appeal / strike / enter / day).
- Screen-reader pass.
- `file://` versus http.server quirks.
- Human register read-through of all 42 pages plus `.supp` clerks' notes.
- OCR of still JPEGs for leftover signage.

## Blockers

None for copy + search-gate + save-key. Playable English-only investigation is implemented; live robot playthrough is still unproven.
