# Gate L batch — 新游戏2 → 新版游戏英文版2

Skill: `~/.hermes/skills/software-development/html-game-localization/SKILL.md`
Source of truth: `/Users/Zhuanz/Desktop/新游戏2/<folder>/` (do not edit source)
Work only in: `/Users/Zhuanz/Desktop/新版游戏英文版2/<folder>/`

This is **transcreation**, not translation. The English edition must read as an English investigation inside a Chinese workplace. The player solves provenance / identity / chronology / rule-meaning, not a Chinese literacy test.

## Iron rules

1. World facts stay: routes, file names, IDs, PIN/passwords that are already Latin/digits, token graph, ending keys, CSS layout, images.
2. Register stays layered. Forum ≠ gov memo ≠ news lead ≠ diary ≠ UI chrome.
3. English-only play must finish the core path. Search and forms accept English / romanization. Chinese queries may remain as hidden aliases only.
4. Same-stage in-world bridge if any Han is kept as evidence (`.zh-artifact[lang="zh-Hans"]` + `.artifact-translation`). Prefer **zero visible Han**.
5. Evidence language: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`. Missing proof is not innocence.
6. Do not invent plot. If the Chinese side is wrong, stop and report; do not patch story in English only.
7. `html lang="en"` on every playable page.
8. localStorage / save keys must be versioned `*-en` so they do not collide with Chinese saves.
9. Investigative dates in prose: `YYYY-MM-DD` (or keep year-month already used if it is a field value; do not invent new dates).
10. Names: surname-first romanization in prose (`Rui Qiu`). Search tokens: one CamelCase unit (`RuiQiu`) if the engine needs a single token.
11. Use the Chinese `STORY.md` glossary. Do not merge near-objects (adopted-out ≠ moved-for-work; Kitchen God print ≠ incense ash; in-shaft ≠ wrongly entered).
12. Write `LOCALIZATION_CONTRACT.md` first (positioning / evidence limits / allowlist / names-terms / technical). Then edit HTML/JS. Then `LOC_QA.md`.
13. `LOC_QA.md` must use `PASS_FOR_SOURCE_SNAPSHOT` for machine checks and list unproven gates (human playtest, screen reader, file://). Do not claim PASS on unrun gates.

## Zero-Han check

After edits, from this dest root:

```
python3 "/Users/Zhuanz/Desktop/新版游戏英文版2/_shared/loc_qa_scan.py" "/Users/Zhuanz/Desktop/新版游戏英文版2"
```

Title / placeholder / noscript must have **0 Han**. Full-file Han should be 0, or only hidden aliases / JS keys classified in LOC_QA.

## Per-game English titles (working)

| Folder | Title |
|---|---|
| 新谱涂改 | Painted Line in the New Book |
| 更衣柜手机 | Locker Phone |
| 过继上传 | Upload the Heir |
| 金罂同名 | Two Niches Named Lin |
| 腊月巡站 | Little New Year Patrol |
| 牌位勘误 | Tablet Catalog Slip |
| 地券密级 | Deed Clearance |
| 夜台听写 | Night Desk Transcript |
| 香单分拣 | Incense Queue |
| 矿册定性 | Mine Roster Fates |
