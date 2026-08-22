# English Localization Contract (Qingshi Town Post Office)

## Positioning

Working title: **Qingshi Town Post Office · Registry Dispatch System**.

The edition must read as an English-language night shift inside a Chinese township postal MIS. The player sorts mail, reads status conflicts, and decides what to cancel. They are not sitting a Chinese literacy exam.

Horror stays in data anomalies: cancelled villages that still accept mail, reused courier IDs, returns whose sender-address initials assemble a string, a household file marked Active for someone the public record cannot place. The drowned-village plot is not rewritten and is not given supernatural proof.

## Non-negotiable evidence limits

- Qingshi Village is revoked in 1998 for reservoir construction. Lianhua Village is merged into Qingshi Village on 1998-04-12 under code `07-03-01`. Those are database facts, not a reconstructed drowning.
- Wu Guifang’s status remains Active in the system. That does not establish that she is alive, underwater, or corresponding from the inundation zone. The sources show a status field, parcels signed by Zhao Deming, and a petitions-office paper trail. They do not establish cause of disappearance.
- Zhou Hai died on duty in 2019-07. The Qingshi Route was never deleted; his staff ID was never formally cancelled. A later signature on that ID is a consistency repair, not established haunting.
- Chen Guodong’s originally registered name is Chen Siyuan. That is a personnel-file fact. Motive for the name change is not established by these sources.
- The night-2 sender-address string assembling `THERE ARE PEOPLE UNDER THE DAM` is a system output leaking into address fields. It is not independent proof of persons under the water.
- Zhao Deming’s verbal account (Wu Guifang came to him; he did not look up a file; the next day she was gone) is his statement. The public pages cannot determine what happened to her.
- Memory loss in endings A and C is a consequence the source already gives. The English edition does not add ritual causation.

Use `not established by these sources`, `the public pages cannot determine`, and `this specific connection is ruled out` if later copy expands these hedges. Do not convert a blank cancel-operator field into innocence.

## Retained-Chinese allowlist

No player-visible Han is retained as material evidence in this edition.

Hidden source aliases (not rendered) remain in the historical-playback comparator so a Chinese date or name still resolves:

- `1998年4月12`
- `吴桂芳`

English-only input is sufficient: `1998-04-12`, `BIND-1998-03`, `HIST-ARCHIVE`, `FF-ARCHIVE`, `WGF`, `WuGuifang`.

Night shift still has no full-text search module. Do not add one.

## Names and terms

Surname-first romanization in running prose.

| Chinese | English |
|---|---|
| 林远 | Lin Yuan (staff ID 0918) |
| 赵德明 | Zhao Deming (staff ID 0412) |
| 陈国栋 | Chen Guodong (staff ID 0821) |
| 陈思源 | Chen Siyuan |
| 周海 | Zhou Hai (staff ID 0947) |
| 沈秀兰 | Shen Xiulan |
| 吴桂芳 | Wu Guifang |
| 刘成海 / 刘成河 / 刘小梅 | Liu Chenghai / Liu Chenghe / Liu Xiaomei |
| 林建国 | Lin Jianguo |
| 青石镇 | Qingshi Town |
| 青石村 | Qingshi Village |
| 莲花村 | Lianhua Village |
| 东河村 / 西岗村 / 南湾村 / 北岭村 | Donghe / Xigang / Nanwan / Beiling Village |
| 中心街 | Center Street |
| 城关镇 | Chengguan Town |
| 一组 / 二组 / 三组 / 四组 | Group 1 / 2 / 3 / 4 |
| 工号 | Staff ID |
| 待核验 | Pending review |
| 已注销 | Cancelled |
| 正常 | Active |
| 所长 | Postmaster |
| 操作员 | Operator |
| 邮递员 | Courier |
| 退件 | Return |
| 信访办 | County Petitions Office |
| 移民办 | Resettlement Office |

Keep unchanged: mail ids, village codes (`07-03-01` and siblings), operator id `0918`, clocks, anomaly type ids (`ANOMALY-RETURN-001`, `ACRO-1`, …), choice radio values (`none`, `split`, `redirect`, `mix`, `archive`, `batch`, `keep`, `cancel`, `confirm`, `skip`, `ok`), opcodes `BIND-1998-03`, `HIST-ARCHIVE`, `FF-ARCHIVE`.

The night-2 acrostic is transcreated, not left as 水库下面有人. Six return sender addresses begin with `THERE` / `ARE` / `PEOPLE` / `UNDER` / `THE` / `DAM`. Same slot count, same repair-mail mechanic, same 4/5/6-word toast milestones.

## Registers

| Source | English voice |
|---|---|
| UI / forms / lamps | Clean standard English |
| Address-book CRT | Dry MIS: `NAME=`, `WARN:`, `HIST PLAYBACK ON　NO FULL-TEXT SEARCH` |
| Zhao Deming | Township postmaster. Short. Defensive. “Don’t go inventing explanations.” |
| Chen Guodong duty log | First-person tech notes. Tired. He is watching the system watch him. |
| System dialogs | Passive bureaucracy. Recommend. Detect. Confirm. |
| Night-break / ending copy | Plain narrative. No poster-line endings. |

## Technical contract

- Runtime truth is Chinese v2.40 in this folder’s source snapshot. This English file is the Gate L build of that snapshot.
- No `localStorage` / `sessionStorage` keys exist. State is in-memory. If keys are added later, append `-en`.
- `html lang="en"`. Title is English.
- Historical playback `maxlength` is 32. Tokens have no spaces (`WuGuifang`, not `Wu Guifang` as a required query; spaces are stripped).
- IDs, dates, routes, barcodes, image data URLs, and ending graph are unchanged.
- Do not invent a search minigame. Address book remains date/opcode playback.
