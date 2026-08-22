# Localization QA — Mine Roster Fates

Source snapshot: dest `/Users/Zhuanz/Desktop/新版游戏英文版2/矿册定性/` after Gate L transcreation (2026-08-21). Chinese runtime left untouched at `/Users/Zhuanz/Desktop/新游戏2/矿册定性/`.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on playable `*.html` and `js/*.js`. Full-file regex `[\u4e00-\u9fff]` includes `<script>` (no `data:` payloads in this game).

| Gate | Result | Notes |
|---|---|---|
| Playable HTML count | **39** | All `lang="en"`. No `zh-CN` leftover. |
| Full-file Han in HTML + JS | **PASS** | **0**. Title / placeholder / noscript Han **0**. No hidden Han aliases in `keywords.js`. |
| Ten-row truth map | **PASS** | JS ids unchanged. Display names romanized. `huo`/`weng`/`shang` = `down` (in-shaft); `qu`/`xing`/`tan` = `surface` (on surface); `lan`/`yin` = `moved` (already relocated); `ning`/`ge` = `wrong` (wrongly entered). |
| Ending keys | **PASS** | `pick()` still `erase` → `adopt` → `legend` → `chaos`. Legend is adopted Quota wording, not a closed finding. |
| Save-key isolation | **PASS** | `kc_marks` → `kc_marks-en`; `kc_end` → `kc_end-en`; `kc_seen` → `kc_seen-en`. Receipt void clears the `-en` keys only. |
| Search gate | **PASS** | `normalizeQuery` accepts one Latin token or one Han run; lookup case-insensitive. Live tokens English/romanized CamelCase (`Xiwa`, `YaoGod`, `Quota`, `HuoChengshan`, `NingGuangfu`, …). Digits-only queries are invalid (no year rows). Intro no longer says years are searchable. Blocked: `OpenCoffin` / `ReSacrifice` / `DivinePenalty` / `ShaftChant`. |
| JS parse | **PASS** | `node --check` on `register.js`, `seen.js`, `keywords.js`, `keyword-search.js`, and `office/result.html` inline script. |
| Contract present | **PASS** | `LOCALIZATION_CONTRACT.md` written before HTML/JS edits. |
| Batch scanner | **PASS** | `loc_qa_scan.py` on dest root: this folder **39 / en / 0 / 0**. |

Register spot-check (source read, not a second reader): hire sheet stays cold HR; Mou SMS stays short; Dai slips fragment and only slip four writes the ten rows dead; Qian Buqi stays excerpt-dry; Mi Wanqing welds roll to shaft; Zhu Changhe repeats Lunar18; Fang Aju issues three households; Qu Peiyi swears then takes a line back; mine-history lemma yellow-bars lore. Legend pages state they cannot close the case.

## Unproven gates (do not mix with PASS)

These were **not** run on this snapshot.

- **English-only live playthrough** (browser-robot or human): not played. Cross-check has no Han-only gate; four endings and `kc_seen-en` reason branches were not walked in a browser.
- **file:// vs http host**: not compared.
- **Screen reader / a11y**: chrome is English; no VoiceOver pass.
- **Register read-aloud**: nine site mouths spot-checked in source, not by a second reader.
- **Chinese save import**: English keys must not read `kc_marks` / `kc_end` / `kc_seen`. Not tested with both editions open.
- **Design markdown** (`STORY.md`, `PLAY.md`, gate notes, `COPY_NOTES.md`, etc.): left as Chinese design leftovers. Not player chrome. Out of playable Han count.

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only hire-sheet → desk → safety/union/leave contrast → ten-row send → four-receipt pass is marked separately.

## World facts kept

- Title: Mine Roster Fates.
- Place: Shiling County, Xiwa Coal Mine (fictional). No real disaster names.
- Fates: in-shaft / on surface / already relocated / wrongly entered.
- In-shaft: Huo Chengshan, Weng Erhai, Shang Xiaoman.
- On surface: Qu Peiyi, Xing Guilin, Tan Qiusheng.
- Already relocated: Lan Shoutian, Yin Fulai.
- Wrongly entered: Ning Guangfu, Ge Wancai.
- Legend cannot close the case.
