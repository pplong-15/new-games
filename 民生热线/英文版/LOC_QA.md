# Localization QA — Civic Hotline 2014

## PASS_FOR_SOURCE_SNAPSHOT

Machine checks against this folder after English loc (2026-08-21).

| Gate | Result |
|---|---|
| Clip count | **280** (45 non-empty `tokens` hand-transcreated; 5 unique empty-token cores hand-transcreated; 230 template noise) |
| Identity freeze | ids / dates / codes / `img` paths / token arrays match Chinese snapshot |
| Visible Han in `who`+`text` | none |
| Visible Han in `index.html`, `introduction.html`, `engine.js`, `tokens.js` | none |
| `html lang` | `en` |
| Save key | `minsheng-v1-en` |
| Search allows Latin | `hanOnly` removed; compact haystack + needle; min 2 letters or Han |
| Empty / short | `Empty.` / `Too short. At least two letters.` |
| First word **Answer** | 17 visible hits (13 original 应声 + 4 StandInAnswer clips whose required token contains `answer`). First five remain C001, C002, C003, C004, C005 |
| Zhaozhao | 17 |
| ZhouYindi / `Zhou Yindi` | 14, same set |
| SeventhDay / `seventh` | 13, same set |
| DoNotUse | 5 |
| StandInAnswer / substitute-answer | 4 |
| StrikeOff / strike-off | 4 |
| Chinese `alias` on clips | **removed** — `clips.js` has 0 Han; engine haystack is `who`+`text` |
| Ending graph | milk / qitou / paper / cui; no added supernatural proof |
| English word count in library | ~16184 (over Her Story ~11300) |

`StandInAnswer` / `substitute-answer` necessarily contain the substring `answer`. That widens English **Answer** from 13 to 17. Date sort keeps the opening five identical to the Chinese 应声 opening.

## Unproven gates

These were **not** run on a human or browser robot for this snapshot. Do not mix them into the pass above.

- English-only human playthrough of all four submit endings
- Screen-reader pass
- `file://` boot
- Browser DOM scan of every clip-open state (280 stills)
- OCR of still pixels (Chinese on photos, if any, is allowlisted evidence, not proven clean)
- Full IT / notepad / submit UX read-aloud with a native editor

## Rebuild

```bash
python3 tools/localize_clips.py
```

Source snapshot: `js/clips.zh.js` (rebuild input only; not loaded by the page). `localize_clips.py` no longer writes Chinese `alias` onto `clips.js`. Do not run `tools/build_library.py` expecting it to refresh English transcripts; it will skip `clips.js` while `localize_clips.py` exists.
