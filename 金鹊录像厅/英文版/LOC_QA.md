# Jinque Video Hall — localization QA

Gate L snapshot for the English folder only. Chinese originals under `新游戏/` were not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder after `node gen-pages.js`:

| Check | Result |
|---|---|
| Generated HTML files | 37 |
| Numbered pages | 36 |
| `html lang="en"` | 37 / 37 |
| Search `maxlength="32"` | Present on every page that has the search form |
| First word **ExtraShow** in `introduction.html` and `index.html` | Yes |
| Alias **LastLamp** on showtimes | Yes (same dest as ExtraShow) |
| Passphrase **SitThrough** in `pages/space-tianmai.html` | Yes (space comments) |
| Intro does **not** say Chinese-characters-only | Yes. Copy says one word from a page already opened |
| `GAME_META.saveKey` | `jinque-hall-v1-en` |
| Ending facts | Unchanged: `fact_stub`, `fact_hou`, `fact_lu`, `fact_empty`, `fact_tian` |
| DOM Han in generated page bodies | 0 (`volume-report.json` `han: 0`) |
| Lookup ExtraShow / extrashow / 加映场 / LastLamp / 末场灯 | Same opens: `blog-jiaoying`, `blog-night` |
| Lookup Tianmai / tianmai / 田麦 | Same opens: space, gift, album |
| Lookup LastTicket, ContinuityDesk, HoldSeat, LuXiaotang | Hit expected rows |
| Lookup AdminPassword / 源码 | Forbidden row |
| Whitespace query `Extra Show` | Rejected (`invalid`) |
| Login aliases in engine | Tianmai / SitThrough plus 田麦 / 坐到完; NEAR_LOGIN has English twins |
| No in-repo self-test harness | N/A — none existed; Chinese aliases still in the table so any old `search("加映场")` style call would still hit |

Source of truth remains `gen-pages.js`. HTML was regenerated, not hand-patched.

## Unproven gates (do not mix with PASS above)

Not run in this pass:

- Full English-only playthrough in a real browser (home → ExtraShow → Points → Tianmai → ContinuityDesk login → five facts → LastTicket → both endings).
- Screen reader / keyboard-only beyond the existing `/` focus hook.
- `file://` quirks on a given OS.
- Isolation test: Chinese save `jinque-hall-v1` vs English `jinque-hall-v1-en` in one origin.
- Human register read of all 37 pages against the contract table.
- OCR of remaining Chinese **in image pixels** (marquee, Stub scan, Handbook cover, chalkboard). Players are not asked to OCR; captions transcribe those faces. Pixel Han is allowlisted evidence, not a DOM defect.

## Play path (English tokens)

1. Guide → Enter the hall.
2. Home yellow notice → search **ExtraShow** (or **LastLamp**).
3. Log → **Points** / **JinquePoints** → **Tianmai**.
4. Space comments: account **Tianmai**, passphrase **SitThrough**.
5. Search **ContinuityDesk** → log in → **Handbook** / **ProjectionLog**.
6. Read **Stub**, **OldHou**, **LuXiaotang**, **EmptySeat**, **Tianmai** pages (facts).
7. Search **LastTicket** → Refund or Sit through.

Chinese aliases remain valid for the same steps. They are not required.
