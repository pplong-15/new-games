# Gate L batch — 新游戏4 → 英文版游戏4

Skill: `~/.hermes/skills/software-development/html-game-localization/SKILL.md`  
Source: `/Users/Zhuanz/Desktop/新游戏4/<folder>/` — **do not edit source**  
Work only in: `/Users/Zhuanz/Desktop/英文版游戏4/<folder>/`

This is **transcreation**, not translation. English investigation inside a Chinese workplace. Zero required Han. Player solves provenance / identity / chronology / rule-meaning.

## Iron rules

1. World facts stay: routes, file names, IDs, ending keys, CSS, images, token graph shape.
2. Register stays layered. Forum ≠ gov memo ≠ news ≠ diary ≠ UI.
3. English-only play must finish the core path. Search/pick/forms accept English / romanization. Chinese may remain as hidden aliases only.
4. Prefer **zero visible Han**. If any Han is kept as evidence: `.zh-artifact[lang="zh-Hans"]` + same-stage `.artifact-translation`.
5. Evidence: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.
6. Do not invent plot. If Chinese is wrong, stop and report.
7. `html lang="en"` on every playable page.
8. Save keys must be `*-en`.
9. Dates in prose: `YYYY-MM-DD`.
10. Names: surname-first in prose (`Sheng Mai`). Search/pick tokens: one CamelCase unit if the engine needs a single token (`ShengMai`).
11. Use each Chinese `STORY.md` glossary. Do not merge near-objects (festival paper ≠ funeral paper; recarve ≠ red-tracing; jump-the-wall ≠ household rename).
12. Write `LOCALIZATION_CONTRACT.md` first. Then edit HTML/JS. Then `LOC_QA.md`.
13. `LOC_QA.md` uses `PASS_FOR_SOURCE_SNAPSHOT` for machine checks. List unproven: human play, screen reader, file://. Do not claim full PASS.

## Scan

```
python3 "/Users/Zhuanz/Desktop/英文版游戏4/_shared/loc_qa_scan.py" "/Users/Zhuanz/Desktop/英文版游戏4"
```

Title / placeholder / noscript = 0 Han. Full-file Han = 0, or only hidden aliases classified in LOC_QA.

## Working titles

| Folder | Title |
|---|---|
| 纸扎组句 | One Line for the Paper Figures |
| 清明三门 | Three Doors at Qingming |
| 改名对质 | Name-Change Confront |
| 碑纹跳切 | Stele Jump |
| 门坎试法 | Threshold Trial |

## Parent QC (2026-08-22)

Machine-only. Status: `PASS_FOR_SOURCE_SNAPSHOT`. Human English play, screen reader, `file://`, and JPEG OCR are **unproven**. Do not ship as full Gate L.

Chinese source `/Users/Zhuanz/Desktop/新游戏4/` was not edited. Entry for every game: `introduction.html`.

| Folder | Pages | lang | HTML+JS Han | UI Han | Save key | Contract |
|---|---:|---|---:|---:|---|---|
| 纸扎组句 | 38 | en | 0 | 0 | `zhizha-juzi-v1-en` | ✓ |
| 清明三门 | 47 | en | 0 | 0 | `qingming-sanmen-v1-en` | ✓ |
| 改名对质 | 42 | en | 0 | 0 | `gaiming-duizhi-v1-en` | ✓ |
| 碑纹跳切 | 39 | en | 0 | 0 | `beiwen-tiaqie-v1-en` | ✓ |
| 门坎试法 | 44 | en | 0 | 0 | `menkan-shifa-v1-en` | ✓ |

Official scan on this folder: five games `en / 0 / 0 / ✓`.

Correct cores unchanged:

- 纸扎组句 filed: ShaoPu + FestivalPaper + MixedIn + ShaoTingFuneral + Unburned + ShaoPuAlive + recommend
- 清明三门 note: cross + martyr + plot12 + note, plus ash-neighbor / code-martyr / deliver-12 / cross-hexiao; MAX=3
- 改名对质 hold: oral already-released vs cabinet not released; cracks `shu` `pu` `hun` `lin`
- 碑纹跳切 recarve: face recarved, buried stone not the same name
- 门坎试法 hold-funeral: recommend + funeral + stepped + broken-crossing proof + funeral-not-wedding source; login `Chai-0821`

