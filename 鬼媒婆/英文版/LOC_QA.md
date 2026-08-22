# Localization QA — Ghost Matchmaker: Seven Minutes at Midnight

Snapshot: English standalone `鬼媒婆_webgame_en_v10_3_GrokNew4中式民俗恐怖图像版.html` in `/Users/Zhuanz/Desktop/新游戏英文版/鬼媒婆/`, generated from the verified v10.3.1 modular source (`~/Documents/Codex/2026-08-08/new-chat/outputs/鬼媒婆_webgame_en_v10_3_中式民俗恐怖图像升级开发版/`). Chinese runtime v10.1.1 is the untouched reference; its save key is separate and was not edited.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked (`npm test` exit 0) on this snapshot:

- `html lang="en"`.
- English save key is versioned and isolated: `ghost-matchmaker-en-v10-1-midnight-seven-state`.
- DOM scan: `unscopedVisibleHan = 0` across 114 public-state runs, 38 public routes, 13 private routes, 18 visual assets on 16 target routes, zero runtime errors.
- Han remaining in the single file is confined to data/identifier keys (e.g. `来源答疑=`, `访客校验号=`, `故人姓名=`) and `.zh-artifact` material evidence — not UI copy. An independent full-file scan of the standalone counts 311 Han, all outside player-visible interface text.
- The 13 live beats complete with English-only input (`test-flow.mjs`: 13/13 beats, 11 reactions, 45 invalid + 39 live invalid cases).
- Claims ledger: 42 claims = 23 confirmed / 6 disproved / 13 unresolved.
- Artifacts: 30 records / 30 unique IDs / 27 unique Chinese originals; manifest SHA-256 `cf2229579b6e807fda8607e9fd65e4e15b11ad68544590ad534944a5cb5bcf19`.
- Visual assets: 18 registered = 18 final Grok New4 files (7 hybrid `image_gen+code`, 11 code); path, dimensions, SHA-256 match runtime registry and frozen table. No OpenAI image output.
- Evidence counts frozen: folklore plate = 4 incense sticks + 1 unnamed tablet; cleaning plate = 3 bamboo splinters + no tablet; A12 context-only (no sedan, no original photo); A14 completed-state only.
- Font: 165/165 required Han covered; bundled WOFF2 SHA-256 `8b9487ebd4d2de911c688301c75388c9856e72e0012a7f7c9e92266e3ad2283f`, SIL OFL 1.1, no CDN.
- Single-file: 18 distinct PNG data URIs; 0 local final-image paths; 0 external runtime assets.
- Site wordmark frozen as `合礼书答疑` / `Helishu Registry`.
- The one English-surface leak found during finalization (`scopeNote` unscoped `契成`) was fixed to `qicheng`; the Chinese artifact `ritual-formed` still carries `契成`.

## Unproven gates

Not claimed. Do not mix these into the pass line.

- HUMAN_PLAYTEST: NOT_RUN.
- Native-English human editorial review and subjective horror-intensity feedback: NOT_PROVEN.
- A14 completed-state ending image in a full real-browser playthrough: NOT_RUN (DOM completed-state gate passed only).
- Screen-reader pass, mobile/touch, and `file://`-vs-server quirks: not claimed.
- Production hosting, deployment, payment, and independent-site launch: NOT_PROVEN.

## Blockers

None for this localization snapshot. The only outstanding localization item was this contract/QA pair, now added. Remaining work is the unproven gates above (human playtest, native editorial), not missing tokens, Han-only gates, or a missing save key.