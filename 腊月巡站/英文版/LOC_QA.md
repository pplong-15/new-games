# LOC_QA — Little New Year Patrol (腊月巡站)

Work copy: `/Users/Zhuanz/Desktop/新版游戏英文版2/腊月巡站/`  
Chinese source (untouched): `/Users/Zhuanz/Desktop/新游戏2/腊月巡站/`  
Snapshot date: 2026-08-22

## Machine checks — `PASS_FOR_SOURCE_SNAPSHOT`

| Gate | Result | Note |
|---|---|---|
| HTML count | **37** | Same file set as source. No HTML added or removed. |
| `html lang="en"` | PASS | All 37 playable pages. |
| Full-file Han in `*.html` + `js/patrol.js` | **0** | Regex `[\u4e00-\u9fff]`, scripts included. Title / placeholder / noscript: 0. |
| Visible UI Han | **0** | No allowlist wrappers needed. |
| Save key | PASS | `lazue_xunzhan_v1-en`. Source still `lazue_xunzhan_v1`. |
| CORRECT trio | PASS | `["fushun", "cuiji", "jingxuan"]` unchanged. |
| Extra sites bounce | PASS | `ALL` still includes `portal` `jiedao` `forum` `chunni` `baike` `tanggua` `jingua` `stock`. Extra tick → `ending-bounce.html`. Subset miss → `ending-miss.html`. Exact trio → `ending-off.html`. Subpages not on the slip. |
| World facts | PASS | Routes, filenames, checkbox `value` IDs, skins, layout hooks unchanged. |
| `node --check js/patrol.js` | PASS | Syntax only. |
| Ritual how-to | PASS (copy audit) | Encyclopedia cards keep catalog fields already on the Chinese card. No send-off steps, no sugar-as-bribe. |
| Chinese source | PASS | Source `introduction.html` still `lang="zh-CN"`. Source store key unchanged. |

`loc_qa_scan.py` pointed at this folder reports 0 full-file Han and 0 UI Han on `sites/` (24 HTML). Root HTML (13) is in the same folder as the contract files; combined HTML Han is 0.

CSS comments still contain **464** Han (author notes in `css/*.css`). Not rendered. Not player-visible. Not counted as UI defects.

## Register spot-check (3 sources)

- Subdistrict Ruling 1 (`sites/jiedao-date.html`): dry municipal, dusk on the 23rd vs. copied 24th.
- Fushun shopfront (`sites/fushun.html`): sales chatter, natal-home 24th / nian-si leaks from the pitch.
- White-affair thread (`sites/forum-cui.html`): 2000s board mouths; first seven days; red cord at the door.

Voices are not flattened to one brochure English.

## Unproven gates — `NOT_PROVEN`

Do not report these as PASS.

- Human playtest of the English edition (core path + bounce + miss).
- Screen-reader / keyboard pass.
- `file://` live click-through in a browser robot.
- Editorial read of every forum signature vs. Chinese side-by-side beyond the spot-check.

## Blockers

None for machine Gate L on this snapshot. English-only click-through is the intended path; there is no Han search gate.

## Gate L status

**Machine gates: `PASS_FOR_SOURCE_SNAPSHOT`.**  
**Full Gate L (ship): not closed** until a human English-only playtest is run. Ready for that playtest.
