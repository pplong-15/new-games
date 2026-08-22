# Localization QA — Classmates Online

Snapshot: English edition under `新游戏英文版/同窗在线/`, source graph unchanged from Chinese v1.

## PASS_FOR_SOURCE_SNAPSHOT

Machine checks run against this source snapshot (Node VM + engine `selfTest`):

- Save key is `tongchuang-online-v1-en`.
- `validateQuery` accepts one Latin/CamelCase token and one Chinese compound; rejects whitespace (`search("纸马 课").type === "multi"`).
- Chinese aliases still unlock: `search("纸马课")` → `blog-paperhorse`; `search("沈记")` → `shenji`.
- English tokens unlock the same pages: `search("PaperHorse")`, `search("Shenji")`.
- `search("renren")` is a valid Latin miss (`miss`), not a Latin-blocked `en`.
- Login table contains `ShenYizhou` / `IncenseFirst` and keeps `沈亦舟` / `先上香`.
- Hint pack fourth notes teach English tokens (PaperHorse, ShenjiPaper, ShenYizhou, …).
- Puzzle graph still reaches both ending need-sets; no blocked nodes in `selfTest`.
- Shells and `上线版/index.html` are `lang="en"`.
- Search input `maxlength` is 32.

## Unproven gates (do not mix with the list above)

- Full English-only browser-robot playthrough of all 18 nodes and both endings.
- Human blind playtest.
- Screen-reader pass.
- `file://` behavior (still unsupported; http required).
- DOM scan of every route/state for leftover required Han. Visible copy was transcreated; keyword/login aliases remain in JS data and are not rendered as UI.
- Embedded CJK subset font (not required while no player-visible Han is on the allowlist).

## Playtest status

UNTESTED in a full browser. Use `index.html?test=1` for the source self-test JSON.
