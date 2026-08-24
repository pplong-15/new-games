# LOC_QA　Copying the Road Pass

Status: **PASS_FOR_SOURCE_SNAPSHOT**

- Type test (Gate L / L0): packaging. Tear the copy and the loop is still pick words / fill four fields / submit the line / search already-visible words. No mechanic-glyph board. No L0 tile pack.
- `html lang="en"` on introduction, index, search-results, and all 36 numbered pages.
- Save key `luyin-jianxie-v1-en`. Bare `luyin-jianxie-v1` is gone from playable JS.
- `python3 generate.py` was run from this folder after the English string pass. Pages are generated, not hand-patched.
- html+js CJK = **0**. CSS comments may still hold Chinese production notes; they are not player-visible.
- `node --check` on `js/data.js`, `js/engine.js`, `js/keywords.js`, `js/keyword-search.js`: PASS.
- Word-chip IDs and judge keys unchanged (`luyin`, `jijian`, `qianpei`, `qianxiaoman`, `sunxiulan`, `houyuan`, `yiyuan`, `luyinfang`, `zati`, `kaibing`, `xiechi`, `shenliang`, `shengchen`, `guohuo`, `xinxing`, `guoji`; slots `who` / `where` / `whom` / `did`; endings `hold` / `burn`; unlock files unchanged). Surfaces and page `W()` text moved in one batch.
- Chip surfaces: `road pass` / `rush slip` / `Qian Pei` / `Qian Xiaoman` / `Sun Xiulan` / `paper-horse shop backyard` / `county hospital ER` / `road-pass room` / `tied as a stand-in` / `issued a death-illness road pass` / `wrote as deceased pass-holder` / `body-measure ruler` / `birth hour` / `passed through fire` / `heart attack` / `guoji`.
- Correct line still `qianpei` + `houyuan` + `qianxiaoman` + `zati`. Burn line still `sunxiulan` + `luyinfang` + `qianpei` + `kaibing`.
- Search queries are English tokens that appear on the target pages. Same hrefs: `luyin` / `inn` → `index.html`; `zhima` / `Taian` → `pages/p10-zhima.html`; `Shijin` / `ER` → `pages/p13-er.html`; `admin` / `backend` forbidden with English hidden text.
- Terms: road pass (luyin), paper horse (zhima). Not ticket. Not summon.
- Stills kept (`alley-dusk`, `empty-hall`, `copy-shop`, `peeling-hallway`, `avatar-square`, `night-corridor`). Same-page `.artifact-translation` bridges sit under each JPEG. Pixels were not OCR-replaced.

## Unproven gates
Human English-only blind play, full hold/burn robot playthrough, file://, screen reader, Safari, real touch. Not claimed.

## Blockers
None for this snapshot.
