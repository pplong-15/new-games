# Localization Contract — Qiaotou Info Port

## Positioning

Working title: **Qiaotou Info Port**.

English edition of 桥头信息港. Reads as an English-language investigation inside a Chinese expired-domain / old classifieds environment. The player bought an expired domain. They are not a detective, not a relative, not an inspector. The loop is: read a page → extract one word → site search.

The player solves provenance, identity, chronology, and what the rule means. They do not sit a Chinese literacy exam. RideAlong is one word for both the board name and the handle — not a pun split.

## Evidence limits

- Closing the site does not unbind the name. The Suspended log records DNS down and the bind still there. Auto-restore during the seven days is on the copy. Whether anyone was driving in front of the board, this copy cannot determine.
- Four endings stay four. They do not collapse into one culprit.
  - Transfer: the name leaves Chen Mai's hands; 18-2 West County Road drops off tonight's destination.
  - CoolingOff refund: money returns; DNS falls back to the Nameship Office address; tonight's post rewrites to the Office.
  - Empty plate: filing moves to demolished No. 12 after MoveOut and He Xiaoman's field check; the name stays; Zhang Xiu is not there.
  - Rollback: 2009 sentence hangs again; the name stays; delivery follows the post, not the domain.
- There is no option that rewrites the slip back to a house Zhang Xiu still lives in.
- BridgeRite is a dark line. It does not block transfer.
- Shunzi on the tonight post is not a person. The misID page states this. The pork seller in Hedong is at his stall; that specific connection is ruled out.
- Same name is not the same person. Electrician LiuShiqiao is not the webmaster.
- PendingDelivery is not a house number. Whether anyone reached the Qiaoxi resettlement site, the MoveOut copy cannot determine.
- Oral notes record a SubRoad burial (a stand-in for the road). That is recorded speech, not established supernatural fact.
- Absence is not exoneration. Use the three hedges: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

## Retained-Chinese allowlist

Player-visible DOM copy is English. Chinese remains only as hidden search/login aliases and as pixels in user-uploaded snapshots (shop signs painted over in source).

If a later pass keeps on-screen Han as evidence, wrap it:

`span.zh-artifact[lang="zh-Hans"]` plus a same-stage `span.artifact-translation`.

Functional UI, titles, controls, validation, and alts contain no required Chinese.

## Names and terms

Prose names (spaces): Liu Shiqiao, Wu Qiu, Zhang Xiu, He Xiaoman, Chen Mai, Gong Zhu.

Search tokens (no spaces). Chinese aliases stay in the table.

| Token | Chinese | On-page role |
|---|---|---|
| RideAlong | 顺路 | Board name and handle — same word |
| LiuShiqiao | 刘石桥 | Webmaster registered name; electrician same string, different person |
| DontAsk | 勿问 | Shop sign / passphrase. Prose shop name: Don't-Ask Hardware |
| HeXiaoman | 何小满 | Registered name; handle is RideAlong |
| ZhangXiu | 章绣 | Desk poster; repeats 12 QiaotouLane |
| QiaotouLane | 桥头巷 | Lane name. Address: 12 Qiaotou Lane |
| WuQiu | 吴秋 | Prior holder; shut the site; transferred |
| Suspended | 停用 | DNS kill-switch log. Board status stays "paused", not this token |
| WestCounty | 县西路 | District tag. Address: 18-2 West County Road |
| GongZhu | 龚助 | Nameship agent 8821 |
| CoolingOff | 冷静期 | Three-day refund window |
| Office | 办公室 | Nameship filing office, Hedong Venture Building 3-11 |
| Demolish | 拆迁 | Local notice for 12 QiaotouLane |
| MoveOut | 迁出 | Household copy |
| BridgeRite | 祭桥 | Dark line; Info Port live date |
| OldNotice | 旧须知 | 2009 RideAlong original |
| Rollback | 回滚 | Unsent draft |
| Shunzi | 顺子 | Poster handle, not a person; pork-seller misID ruled out |
| BackPouch | 后台 | Night / back-office pouch |
| SubRoad | 替路 | Substitute buried for the road (oral record) |
| Nameship | 名市 | Domain marketplace |
| PendingDelivery | 待送达 | Registry destination, not a plate |

Site: Qiaotou Info Port. Desk: Qiaotou Desk. Domain bought: qiaotougang.net.

Login (English-only): account `LiuShiqiao`, passphrase `DontAsk`. Chinese aliases `刘石桥` / `勿问` still work. Rejected: electrician LiuShiqiao, Shunzi, WuQiu.

## Technical contract

- Work only under `/Users/Zhuanz/Desktop/新游戏英文版/桥头信息港/`. Chinese original is not edited.
- Save key: `qiaotou-v1` → `qiaotou-v1-en`.
- `html lang="en"` on every page.
- Search: Latin or Han one-token; no whitespace; case-insensitive lookup; `maxlength="32"`.
- UI chrome: placeholder `Keyword`, button `Search local`.
- Token IDs, dates, routes, hrefs, ending graph, CSS layout, image paths unchanged.
- English-only input must clear the core paths. Chinese queries remain hidden aliases.
