# Deed Clearance — localization QA

Gate L snapshot for `/Users/Zhuanz/Desktop/新版游戏英文版2/地券密级/` only. Chinese originals under `/Users/Zhuanz/Desktop/新游戏2/地券密级/` were not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder after the HTML/JS transcreation:

| Check | Result |
|---|---|
| Playable HTML files | 48 |
| `html lang="en"` | 48 / 48 |
| Document title / placeholder / noscript Han | 0 |
| Full-file Han in `*.html` (includes `<script>`) | 0 |
| `js/state.js` storage key | `anpu-diquan-miji-v1-en` |
| Ending keys | Unchanged: `public` / `internal` / `three` / `overclaim` / `empty` |
| Extract / visit ids | Unchanged |
| Passwords | Unchanged: `nanshan047` / `jiaojie083` / `chouti0819` |
| Mail account | Unchanged: `ye-anpu` |
| English badge typed forms on the same notes | `QP-NIGHT-04` on `desk/shift.html`; `QT-RES-07` on `mail/qu.html` |
| Login accepts English badges | Node: `QP-NIGHT-04` / `qp-night-04` + `nanshan047`; `QT-RES-07` / `qt-res-07` + `jiaojie083` |
| Login still accepts hidden Han aliases | Node: `QP-夜-04` / `QT-密-07` |
| File ids on page | `Anpu-Deed-1983-047` / `Anpu-Deed-1979-012` |
| `node --check` on `js/state.js` | Pass |
| Dead search boxes | Still dead (`form.dq-dead` / stopped search). No hidden-page search gate |
| Viewing note | Recommend only. Overclaim (`dead-unique`) still returns for rewrite |
| Forging / rewrite tutorial | Not added. FAQ and encyclopedia still refuse templates, carving, and cinnabar recipes |
| `LOCALIZATION_CONTRACT.md` | Present |
| `loc_qa_scan.py` on dest root | This folder: `html 48` `lang en` `全文汉字 0` `界面中文 0` |

Source of truth remains the Chinese folder. English HTML was hand-transcreated page by page.

## Login path (English-only)

1. `introduction.html` — Cen He, Anpu-Deed-1983-047, five-box viewing note, drawer badges.
2. `public/catalog.html` → `public/deed-047.html` — public layer, no login.
3. `gov/request.html` — five boxes named; no password.
4. `desk/shift.html` — writes **QP-NIGHT-04** / **nanshan047** and **ye-anpu** / **chouti0819**.
5. `desk/login.html` — internal session with QP-NIGHT-04 + nanshan047.
6. `mail/login.html` — ye-anpu + chouti0819.
7. `mail/qu.html` — writes **QT-RES-07** / **jiaojie083**.
8. `desk/lock.html` — restricted session with QT-RES-07 + jiaojie083.
9. `desk/note.html` — five boxes from layers visited; submit is a recommendation.

## Remaining Han (classified)

| Location | Glyphs | Role |
|---|---|---|
| `js/state.js` `USER_ALIAS` | 夜, 密 | Hidden login aliases `QP-夜-04` / `QT-密-07`. Not rendered. English typed forms are on the notes. |
| `js/state.js` `FILE_ALIAS` | 安档地券 ×2 | Hidden file-id aliases for `Anpu-Deed-1983-047` / `Anpu-Deed-1979-012`. Not printed as UI. |
| `css/*.css` comments | skin memory notes | Developer comments only. Scanner reads `*.html`. |
| Image pixels | possible brick / paper / seal glyphs | Photograph evidence. Not operable text. Players are not asked to OCR. |

HTML title / placeholder / noscript / visible copy: **0 Han**.

Chinese `STORY.md` / `PLAY.md` / gate notes in this folder are source-side documents, not player-facing.

## Unproven gates (do not mix with PASS above)

Not run in this pass:

- Full English-only playthrough in a real browser (public 047 → request → shift book → internal → mail → restricted → five-box submit, plus overclaim return).
- Screen reader / keyboard-only beyond existing link structure.
- `file://` quirks on a given OS.
- Isolation test: Chinese save `anpu-diquan-miji-v1` vs English `anpu-diquan-miji-v1-en` on one origin.
- Human register read of all 48 pages against the contract table.
- OCR of remaining Chinese in image pixels.

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only login-and-note pass is marked separately.
