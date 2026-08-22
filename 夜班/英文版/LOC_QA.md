# Localization QA — Night Shift (Hengdeng Mart)

Source snapshot: `夜班.html` after Gate L apply (2026-08-21, reapplied same day from the Chinese original after a folder wipe). Unique-string set is identical to the first English-folder copy.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on this file after skipping `data:` payloads.

| Gate | Result | Notes |
|---|---|---|
| DOM Han outside allowlist (text/JS, no `data:`) | **PASS** | Python scan: **0** Han characters (`\u4e00`–`\u9fff`) in non-`data:` text. |
| Unique quoted-string map applied | **PASS** | **1172** unique quoted Han strings mapped; **1409** occurrence replacements (repeats + HTML-only extras). |
| `html lang` / title | **PASS** | `lang="en"`; title `Night Shift — Hengdeng Mart`. |
| Save-key isolation | **PASS** | All `hengdeng-*` keys versioned `-en` (see contract table). No unversioned `hengdeng-cp-` left. |
| JS parse | **PASS** | `node --check` on three extracted `<script>` blocks after `data:` strip. |
| Name-match sync | **PASS** | `catEyeFor` / `catBlockChoice` needles match English nameplates. |
| Rule keys | **PASS** | `defaultKeptRules` uses `"1"`–`"5"`; `bag["2"]`; sticky `after: "3"`. |
| Numeric rules | **PASS** | ¥ prices, 7 nights, sanity 35 / 0, power floors, ending IDs unchanged. |

## Unproven gates (do not mix with PASS)

These were **not** run on this snapshot.

- **English-only live playthrough** (browser-robot or human): not played. Click path has no Han input gate, but endings / Cat View / role unlocks were not walked.
- **file:// vs http host**: not compared.
- **Screen reader / a11y**: mute `aria-label` is English; no NVDA/VoiceOver pass.
- **Register read-aloud**: three registers (boss SMS, Auntie Lin, HUD) were spot-checked in source, not by a second reader.
- **Photo Han**: shop signs and any glyphs *inside* embedded JPEGs/PNGs still exist as pixels. Not DOM text. Not wrapped as `.zh-artifact` (cannot wrap pixels). English-only play does not need them.
- **Chinese save import**: English keys must not read Chinese `localStorage`. Not tested in a browser with both editions open.
- **BRIEF_*.md / reports**: not translated (out of scope).

## Strings replaced

- Unique quoted Han interiors: **1172**
- Total replacements counted by the apply pass (including HTML nodes `去上夜班`, `线索板`, `猫的记忆`, HUD `货/规/回`, and repeats): **1409**
- Remaining Han excluding `data:` URLs: **0**

## Save keys (English edition)

- `hengdeng-nightshift-v2-en`
- `hengdeng-cleared-en`
- `hengdeng-endings-en`
- `hengdeng-unlockedCatView-en`
- `hengdeng-catViewOn-en`
- `hengdeng-catMemories-en`
- `hengdeng-catMemCleared-en`
- `hengdeng-unlockedRoles-en`
- `hengdeng-selectedRole-en`
- `hengdeng-clues-en` / `hengdeng-clueLinks-en` / `hengdeng-truths-en`
- `hengdeng-cp-en-${n}`
- `hengdeng-cp-en-${role}-${n}`

## Blockers

None for **source-snapshot text**. Do not ship as playtested until an English-only seven-night pass and at least one role loop are marked separately.

Inventory dumps `_han_quoted_strings.txt` and `_han_html_nodes.txt` were deleted after apply (counts recorded above). `BRIEF_*.md` and Chinese reports left as-is.
