# Localization QA — The Seven-Day Ledger

Source snapshot: HTML + JS under `/Users/Zhuanz/Desktop/新游戏3/守七台账/英文版/` after Gate L transcreation. Chinese originals under `守七台账/中文版/` were not written.

L0 (from GATE_L.md): text is packaging. No mechanic-glyph board. No L0 glyph pack.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on this snapshot:

- `python3 generate.py` was run from this directory. Pages were rebuilt from English strings. `lang="en"` on all playable HTML.
- Save key is `shouqi-taizhang-v1-en`. Chinese edition still uses `shouqi-taizhang-v1`.
- Full-text CJK scan `[\u4e00-\u9fff]` on `*.html` + `pages/*.html` + `js/*.js` = **0**.
- `node --check` on `js/data.js`, `js/engine.js`, `js/keywords.js`, `js/keyword-search.js` — all pass.
- Search accepts one Latin token (`[A-Za-z][A-Za-z0-9]*`), case-insensitive lookup, no spaces. Empty / CJK / mixed strings fail with the one-English-word miss.
- Live queries appear on their target pages after regenerate: `baita`/`funeral` → `index.html`; `farewell` → `p02-halls.html`; `obituary` → `index.html` (public notice, not the original); `shouqi` → `p05-desk.html`; `zuoqi` → `p24-baike.html`; `vigil` → `p04-paused.html`. Same hrefs as the Chinese table.
- Forbidden bait `admin` / `backend` stays English. Hidden line: "The ledger directory is not public. The original-file cabinet is not in search."
- Terms kept with bounds: keeping the seven (shouqi); first seven days (touqi); performing the seven (zuoqi). No operable soul-return. Receipts still say these papers cannot determine whether a soul returns.
- Still JPEGs kept. Same-page `.photo-note.artifact-translation` bridges sit under/near images (desk scan / center photo / wire photo). No walkthrough voice.
- Browser smoke on local `http.server`: introduction, home, search `obituary` (public hit, not `p10-obit`), search `admin` (forbidden + English hidden), search `shouqi` (desk), duty-desk pin → "Already in the shift book", cabinet doors labeled in English, obituary original opens with evidence limits intact.

## Remaining Han policy

- CSS comments in `css/*.css` still carry Chinese production notes. They are not rendered into DOM text. Not counted in the html+js CJK gate.
- JPEG pixels were not OCR-scanned. Visible stills checked by description show no required search glyphs; English bridges are on the page anyway.
- `generate.py` source is English (0 CJK). Do not hand-edit generated HTML; change the Python strings and regenerate.

## Unproven gates (do not mix with PASS)

Not claimed:

- Full English-only human playthrough of stop / open / late.
- Full `tools/e2e.mjs` robot walk (harness updated to English strings; not run to ALL_E2E_PASS on this pass).
- Screen-reader pass.
- `file://` versus http.server quirks.
- OCR of every still JPEG for leftover signage.

## Blockers

None for copy + search-gate + save-key + regenerate + html+js CJK=0. Live robot / human English-only full loop is still unproven.
