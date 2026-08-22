# LOC_QA — Upload the Heir

Work copy: `/Users/Zhuanz/Desktop/新版游戏英文版2/过继上传/`  
Chinese source (untouched): `/Users/Zhuanz/Desktop/新游戏2/过继上传/`  
Contract: `LOCALIZATION_CONTRACT.md`  
Scan: `python3 "/Users/Zhuanz/Desktop/新版游戏英文版2/_shared/loc_qa_scan.py"` plus a full-file HTML+JS Han pass on this folder (includes `<script>`).

## Machine checks — `PASS_FOR_SOURCE_SNAPSHOT`

| Check | Result |
|---|---|
| Playable HTML count | **37** |
| `html lang` | **en** on all 37 |
| Full-file Han in HTML (incl. `<script>`) | **0** |
| Full-file Han in `js/state.js` | **0** |
| Title / placeholder / noscript Han | **0** |
| Save key | `hyjd-guoji-upload-v1` → `hyjd-guoji-upload-v1-en` |
| Field ids | `heir` / `when` / `consent` / `kind` / `live` unchanged |
| Block ids | all 18 keys unchanged |
| Deadline | `DEADLINE = 22 * 60`; clock copy still **22:00** |
| Issue rule | `if (n < 3)` still blocks issue; toast still requires three fields |
| Ending keys | `paper` / `hukou` / `care` / `share` / `clash` / `timeout` |
| Visit / `data-block` / filenames | unchanged |
| Chinese source | still `lang="zh-CN"`, save still `hyjd-guoji-upload-v1` (not `-en`) |
| `node --check js/state.js` | pass |

CSS developer comments still contain Han (**426** across nine skin files). Not rendered. `loc_qa_scan.py` only reads `*.html`. Not classified as UI Chinese.

No `.zh-artifact` wrappers: no operable Han left to wrap.

## Register spot-check (3 sources)

- **Hukou refuse / death**: dry window codes, “compare is not inbound,” no folklore lecture.
- **Auntie Tan follow-up**: “I did not go into the yard,” tape vs bedroll, no tidy essay.
- **Wanhe posts / guestbook**: “Here. Don’t forward.” Gate copy differs per locked page.

Terms kept apart: guoji / lisi / mingji / sishu / jiantiao; hukou ≠ huifang. Player is Bian Liang.

## Unproven gates — `NOT_PROVEN`

- Human playtest of the English edition (core path, clash path, timeout, Wanhe letter gate).
- Screen-reader pass.
- `file://` open of the full desk.
- Browser-robot English-only click-through (skill gate 2). Machine text is English-only; a robot run was not executed this pass.

Do not treat this file as a human playtest PASS.

## Blockers

None for static Gate L on this snapshot. Preview / deploy still wait on the unproven gates above.
