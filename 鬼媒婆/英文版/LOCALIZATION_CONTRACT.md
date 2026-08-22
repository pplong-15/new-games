# English Localization Contract — Ghost Matchmaker: Seven Minutes at Midnight (Full Spoilers)

Branch: verified Chinese runtime v10.1.1 → English visual edition v10.3 (Grok New4 imagery). This contract is retroactive for the already-shipped English build: it records the localization decisions the build implements, so a future pass does not silently flatten or extend them.

## Positioning

Working title: **Ghost Matchmaker: Seven Minutes at Midnight**. Slate name: `ghost-matchmaker`.

The edition must read as an English-language investigation conducted inside a Chinese old-web environment (Chengnan Q&A, an archive-registry site, forum/BBS surfaces, scanned documents). The player solves provenance, identity, chronology, and record meaning — not Chinese literacy. No solution requires Chinese input, OCR, or an external translator.

v10.3 adds 18 image assets produced via Grok New4: 13 deterministic document compositions plus 5 image-generation-plus-code composites. Surviving Chinese originals are the primary evidence surfaces; the English transcript text is an accessibility and reading aid, never a replacement image.

## Non-negotiable evidence limits

- The status page became readable in a captured response 23 seconds before HLS07 was referred offline.
- Seven minutes elapsed between the first readable capture and the first recorded 410 response. This does not prove uninterrupted public availability between samples.
- The first readable capture is dated 2017-04-19. Chen Yuan's obituary records his death on 2017-04-26, the seventh day under the recorded counting rule. The obituary was published on 2017-04-27, the following day.
- The dates align. The public pages do not establish either cause of death or supernatural causation.
- `bond recorded as formed` is a bounded transcription of the source site's status field, not certification that a ritual occurred.
- The HLS07 public body was not retained. Privacy procedure explains why it stopped being public; it neither reconstructs the body nor proves it harmless.
- No surviving public void page was found for GH-170419-01. That does not prove the record was never corrected, cancelled, or handled offline.
- The player, not an NPC or a prefilled stop condition, decides to leave the unverified relationship field blank.

## Retained-Chinese allowlist

Player-visible Han is limited to material evidence:

- old-site marks such as `合礼书` (site wordmark frozen as `合礼书答疑` / `Helishu Registry`);
- canonical names and aliases;
- the pencil note `对外：表妹／以后再改`;
- masked status fields such as `何*`, `表*`, `陈*`, `待补`, and `契成`;
- `鬼媒婆` and the bounded 2009 Nanqiao saying;
- already-cropped scans, collage fragments, notices, and BBS artifacts, including the 18 v10.3 image compositions.

Every visible Han item must sit inside `.zh-artifact[lang="zh-Hans"]` with a same-stage `.artifact-translation`. The bridge preserves cropping, masking, uncertainty, and attribution. Functional UI, document titles, controls, validation messages, hints, and accessibility labels contain no required Chinese.

## Names and terms

- Chen Yuan — `陈远`
- He Ling — `何玲`; factory nickname Xiao Ling — `小玲`
- Zhao Ling — `赵灵`; web byline Xiao Ling — `小灵`
- Lin Xiaoling — `林晓玲`
- Liu Guixiang — `柳桂香`; known locally as Auntie Liu — `柳姑`

Bare `Xiaoling` or `Xiao Ling` is deliberately ambiguous and must return multiple identities.

Required bounded translations:

- `表妹`: younger female cousin (biaomei)
- `鬼媒婆`: guǐ méipó, "ghost matchmaker"; a traditional matchmaker term, not a spirit medium
- `红事`: red rites (hongshi), auspicious family occasions such as weddings
- `白事`: white rites (baishi), funeral and mourning occasions
- `合礼书`: Helishu (site title / registry name); the wordmark is `合礼书答疑` / `Helishu Registry`
- `故人合礼`: Rites for the Deceased
- `契成`: bond recorded as formed (a database-field value, not proof of a rite)
- `红轿`: red sedan chair
- `亡者牌位`: the deceased person's spirit tablet
- `剪纸人`: paper-cut human figure
- `红棉线`: red cotton thread
- cleaning-log `红色棉绳`: red cotton cord; it must not be merged with the ritual thread

## Serious allegations

Use `not established by these sources`, `the public pages cannot determine`, and `this specific connection is ruled out` precisely.

The edition must not convert absence into exoneration. Sexual assault, suicide, both causes of death, Chen Yuan's exact contemporaneous words, why he used `biaomei`, private collusion, the anomaly's cause, the red sedan chair's reality, ritual efficacy, and supernatural causation remain unresolved.

The riverside report's identity connection, the claim that the 2021 collage is one continuous event, and the claim that the later workplace nickname referred to He Ling are specifically disproved connections. That does not prove the underlying harms never occurred.

## Technical contract

- Runtime truth is the Chinese v10.1.1 runtime (this branch's parent); older English v1 is terminology reference only.
- Canonical identifiers, timestamps, routes, token graph, statuses, and fixed body SHA remain unchanged.
- Save key is the versioned English key `ghost-matchmaker-en-v10-1-midnight-seven-state`; the Chinese save key is never touched.
- `html lang="en"`.
- The 13 live beats are completable with English-only input.
- Public record pages remain directly readable and state-independent.
- The standalone `dist/ghost-matchmaker_en_v10_3_visual_optimized.html` is generated from modular source (`app.js` / `game-core.js` / `world-content.js` / `styles.css` via `build-single.mjs`); hand-editing the generated HTML is forbidden.
- 18 PNG assets (7 hybrid `image_gen+code`, 11 code) are Grok New4 output; no OpenAI image output is used. Asset hashes and dimensions are frozen in `qa/test-visual-assets.mjs`.
- Retained Han glyphs use an embedded Noto Sans SC subset (165 Han), SIL OFL 1.1, bundled as a data URL at build; no runtime font or script CDN.
- Evidence counts are frozen: folklore plate = four incense sticks + one unnamed tablet; cleaning plate = three bamboo splinters + no tablet; A12 = context reconstruction only (original red-sedan post has no photograph); A14 = completed-state only.
- Claims ledger: 42 claims = 23 confirmed / 6 disproved / 13 unresolved. Artifacts: 30 records / 27 unique Chinese originals.
- The English surface leaks no unscoped Chinese: DOM scan asserts `unscopedVisibleHan = 0` across public/private routes. (One earlier leak — `scopeNote` carrying unscoped `契成` — was fixed to `qicheng`; the Chinese artifact `ritual-formed` still carries `契成`.)