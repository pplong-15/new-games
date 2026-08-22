# Localization QA — Qiaotou Info Port

Snapshot: English folder `/Users/Zhuanz/Desktop/新游戏英文版/桥头信息港/` after Gate L copy pass. Chinese original `/Users/Zhuanz/Desktop/新游戏/桥头信息港/` was not edited (save key still `qiaotou-v1`).

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked on this snapshot:

- All 29 HTML pages have `html lang="en"`.
- Save key is `qiaotou-v1-en`.
- Search gate accepts one Latin token or one Han token; whitespace and mixed strings fail.
- Lookup is case-insensitive (`RideAlong` / `ridealong` / `RIDEALONG`).
- Chinese aliases remain on every live row (`顺路` still hits the RideAlong pair).
- Forbidden aliases include `source` / `sourcecode` / `adminpassword` plus `源码` / `管理员密码`.
- Every search input has `placeholder="Keyword"`, button `Search local`, `maxlength="32"`.
- DOM scan of HTML with `<script>` stripped: zero Han.
- Unit checks: empty / space / hyphen / case / EN+ZH alias / miss / forbidden — 15/15 pass.
- First-word token on the homepage: **RideAlong** (nav, paused listing, grey line).
- Four ending buttons and four miss strings remain four. They do not name one culprit.
- Suspended log still says DNS went down and the bind is still there.
- Shunzi misID page states the poster handle is not a person; pork-seller connection is ruled out.
- RideAlong is not split into a "going that way" pun. Board name and handle stay the same word.
- Login accepts `LiuShiqiao` + `DontAsk` (and Chinese aliases). Electrician / Shunzi / WuQiu stay blocked.

## Unproven gates

Not claimed. Do not mix these into the pass line.

- Human English-only playthrough of all four endings.
- Browser-robot walk of the token graph.
- Screen-reader pass.
- `file://` vs local-server quirks.
- Pixel Han inside JPEGs (source painted shop signs over; not re-scanned here).
- GATE_C P2 leftovers (hardware-shop headcount vs night-shift copy; ending cadence) — outside this loc pass.

## Blockers

None for this copy snapshot. Remaining work is playtest, not missing tokens or a Han-only search gate.
