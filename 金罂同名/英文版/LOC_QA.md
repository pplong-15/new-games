# LOC_QA — Two Niches Named Lin

Work copy: `/Users/Zhuanz/Desktop/新版游戏英文版2/金罂同名/`  
Chinese source (untouched): `/Users/Zhuanz/Desktop/新游戏2/金罂同名/`  
Contract: `LOCALIZATION_CONTRACT.md`  
Scan: `python3 "/Users/Zhuanz/Desktop/新版游戏英文版2/_shared/loc_qa_scan.py"` plus a full-file HTML+JS Han pass on this folder (includes `<script>`).

Title: **Two Niches Named Lin**. Player: Chu Ci. Correct recommendation: South Hall or report. Do not claim West Hall.

## Machine checks — `PASS_FOR_SOURCE_SNAPSHOT`

| Check | Result |
|---|---|
| Playable HTML count | **37** |
| `html lang` | **en** on all 37 |
| Full-file Han in HTML (incl. `<script>`) | **0** |
| Title / placeholder / noscript Han | **0** |
| `js/keyword-search.js` / `js/seen.js` Han | **0** |
| `js/keywords.js` Han | **76** — hidden query aliases only (`林阿盛`, `柿树坪`, … plus forbidden `开棺` / `洗骨` / `发财` / `捡骨`). Not rendered as UI. |
| Save keys | `jy_seen` → `jy_seen-en`; `jy_end` → `jy_end-en` |
| Claim ending keys | `west` / `south` / `wait` / `report` unchanged |
| `data-seen` keys | unchanged (`hall`, `certW`, `certS`, `mv2018`, `obit16`, `errata`, …) |
| Routes / filenames | unchanged |
| `node --check` on `js/keywords.js`, `js/keyword-search.js`, `js/seen.js` | pass |
| Lookup accepts printed tokens | `LinAsheng` (14), `PersimmonFlat` (6), `WuWanxiang` (6), `LinBonian` (6); case-insensitive Latin; four-digit years; Chinese aliases still resolve; spaces fail (`Lin Asheng` invalid) |
| Forbidden row | `OpenCoffin` / `WashBones` / `GetRich` / `PickBones` / `Jianjin` and Chinese aliases all return the closed-file page |
| Chinese source | still `lang="zh-CN"`; saves still `jy_seen` / `jy_end` (not `-en`) |

CSS developer comments still contain Han (**153** across seven skin files). Not rendered. `loc_qa_scan.py` only reads `*.html`. Not classified as UI Chinese.

No `.zh-artifact` wrappers: no operable Han left to wrap. Wet-tag remainders are Latin (`Lin`, `sheng`, `West`).

Printed-on-page tokens required for English-only play include `LinAsheng`, `PersimmonFlat`, `WuWanxiang` on the opening book / briefing, and `LinBonian` on the handover book (linked from the desk header), the 2018 filing, and the 2003 death notice.

## Register spot-check (3 sources)

- **Township board / filings**: dry mimeograph, missing-attachment line, no literary weather.
- **Fang Yongshi handover / log**: repeats “first look,” “do not write,” wet-tag fear; not a clean briefing.
- **Lin Qiuhe oral notes**: rushed, self-interrupt, PersimmonFlat first, WuWanxiang last; three cuts not welded.

Terms kept apart: two men named Lin Asheng plus a ruled-out Lime Kiln namesake; posted name ≠ still in the niche; tea stain ≠ rain stain; jianjin is background only.

## Unproven gates — `NOT_PROVEN`

- Human playtest of the English edition (West / South / hold / report; Lime Kiln exclusion).
- Screen-reader pass.
- `file://` open of the full desk.
- Browser-robot English-only click-through (skill gate 2). Machine text is English-only; a robot run was not executed this pass.

Do not treat this file as a human playtest PASS.

## Blockers

None for static Gate L on this snapshot. Preview / deploy still wait on the unproven gates above.
