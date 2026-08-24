# LOC_QA　Three Names for Passage

Status: **PASS_FOR_SOURCE_SNAPSHOT**

Producer must not self-sign ship PASS.

## Machine (this snapshot)

- `lang="en"`
- html+js CJK Unified Ideographs: 0
- `node --check` on `js/data.js`, `js/engine.js`, `js/app.js`: pass
- Save: `tidu-sanming-v2-en`
- Option IDs, slot IDs, lock keys, flag names, button IDs, numbers unchanged
- Option labels and page / form text replaced in the same batch
- 替度 carried as substitute passage (tidu), not respawn / reclass
- 疏 carried as memorial slip (shu)
- Stills kept as JPEG ZH-FRONT; English caption bridges under courtyard still and document stills

## Untested (do not mix)

- Human English-only blind playtest
- Screen reader
- `file://` offline
- Browser e2e (tool updated; not run in this snapshot)
