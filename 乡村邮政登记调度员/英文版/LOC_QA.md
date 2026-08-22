# Localization QA — Qingshi Town Post Office

Source snapshot: English folder `乡村邮政登记调度员/index.html` (v2.40), Gate L pass 2026-08-21.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this file, not a live playthrough.

| Gate | Result | Notes |
|---|---|---|
| `html lang="en"` | PASS | Set on root. |
| English `<title>` | PASS | Qingshi Town Post Office · Registry Dispatch System |
| `node --check` on extracted `<script>` | PASS | Exit 0. |
| Player-visible Han outside allowlist (source scan, data URLs stripped) | PASS | 5 Han remain, all inside hidden hist-query aliases: `1998年4月12`, `吴桂芳`. Not written into DOM. |
| IDs / codes / clocks / anomaly ids / radio values | PASS | Unchanged. |
| No new search minigame | PASS | Night terminal still has no full-text search. Hist box is date/opcode playback. |
| English hist tokens | PASS | `1998-04-12`, `BIND-1998-03` / `BIND199803`, `HIST-ARCHIVE`, `FF-ARCHIVE`, `WGF`, `WuGuifang`. `maxlength=32`. |
| Acrostic English-only | PASS | Six slots: THERE ARE PEOPLE UNDER THE DAM. Repair mails keep the same leading word. Plot not rewritten to burial/exoneration. |
| Save keys | PASS | None. No `localStorage` / `sessionStorage`. In-memory only. |
| Binary assets | PASS | JPEG data URLs and `assets/` untouched. |
| Ending graph | PASS | A / B / C / D still driven by the same choice ids. |

## Unproven gates

Do not mark these PASS. They were not run.

- English-only full playthrough of nights 1–3 and all four endings (browser-robot or human).
- DOM scan of every station, dialog, CRT hist result, Zhao IM step, and ending after live interaction.
- Screen reader / file:// open.
- Visual check that ID-photo JPEGs contain no readable Han shop signs (treated as face placeholders).
- Register read-aloud of Zhao vs Chen vs CRT vs UI by a second reader.

## Remaining Han (source)

| Location | Text | Status |
|---|---|---|
| `runHistQuery` alias | `1998年4月12` | Hidden comparator. English `1998-04-12` already matches the regex. |
| `runHistQuery` alias | `吴桂芳` | Hidden comparator. English `WGF` / `WuGuifang`. |

No `.zh-artifact` wrappers: nothing player-visible was kept as a Chinese glyph.

## Save keys

None. If a later build persists state, append `-en` to every key.
