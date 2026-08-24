# LOC_QA　Banquet Sentence

Status: **PASS_FOR_SOURCE_SNAPSHOT**

Producer must not self-sign ship PASS.

## Machine (this snapshot)

- `lang="en"`
- html+js CJK Unified Ideographs: 0
- `node --check` on `js/data.js`, `js/engine.js`, `js/app.js`: pass
- Save: `ximian-state-en`
- Word IDs (`w-hcz` and the rest), slot keys who / whom / did, `CORRECT` IDs, flags, button IDs unchanged
- `WORDS[].surface` and source-page HTML replaced in the same batch; chips and pages show the same English
- Stills kept as JPEG ZH-FRONT; English caption bridges under banquet / contract / critical / card stills

## Untested (do not mix)

- Human English-only blind playtest
- Screen reader
- `file://` offline
- Browser e2e (tool updated; not run in this snapshot)
