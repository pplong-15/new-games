# English Localization Contract — Civic Hotline (民生热线)

## Positioning

Working title: **Civic Hotline 2014**.

The edition must read as an English-language night shift inside a Chinese county TV station. The player is intern editor Pei Wan, searching a dead *Civic Hotline* clip library in DigiCut 2.0. The puzzle is provenance, names, dates, and which tape to submit — not Chinese literacy.

Registers stay distinct: complainants talk rough and local; Director Liu is dry clinic-official; station circulars are bloodless; Min Ke wants something airable; Old Cui is shop-floor blunt; Zhou Shi is short; Zhou Gui runs on; Uncle Fang talks like a book-keeper of the genealogy, not a tourist guide.

## Non-negotiable evidence limits

- 2013 winter: Nanba Zhou genealogy. Sister’s register name Zhou Yindi goes on the book. Younger sister’s milk name Zhaozhao does not.
- 2014-02-26: sister dies. Village PA reads a funeral notice. These tapes do not establish cause of death.
- 2014-03-02: woman on camera Answers “Zhaozhao.”
- 2014-03-09 (SeventhDay): same talent card, she Answers “Zhou Yindi.”
- Father Zhou Shi wants the register name. Mother Zhou Gui wants the milk name.
- Director Liu uses a night-terror / sleep-disorder medical cover. That is official line, not proof that nothing else happened and not proof of a ghost.
- Min Ke wants a ninety-second debunking package.
- Old Cui marked the March 9 tape DoNotUse. The mark is a station hold, not established by these sources as supernatural confirmation.
- Intern Pei Wan must cut ninety seconds tonight. Submit locks the ending.
- First extractable search word: **Answer**.
- Endings transcreate the Chinese lock states. They do not add extra proof of the supernatural.

Use the three hedges when the library cannot carry a claim: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`. Absence of a question track is not exoneration.

## Retained-Chinese allowlist

Player-visible DOM copy has no required Han.

- Stills may still show Chinese in pixels (nameplates, studio chrome). That is photo evidence, not UI.
- Clip objects have no Chinese `alias` field. Search haystack is English `who` + `text` only.
- No `.zh-artifact` bridges are required in this edition because no Han is asked of the player on screen.

Any new player-visible Han outside still pixels is a defect.

## Names and terms

Surname-first romanization. Search compacts whitespace, so `Zhou Yindi` and `ZhouYindi` hit the same haystack.

| Source | English | Search token notes |
|---|---|---|
| 应声 | Answer | first word; keep out of unrelated clips |
| 招招 | Zhaozhao | milk name |
| 周引娣 | Zhou Yindi | register name; compact matches ZhouYindi |
| 头七 | SeventhDay | `seventh` is a substring |
| 替应 | StandInAnswer / substitute-answer | answering a register line in another’s place |
| 除籍 | StrikeOff / strike-off | genealogy strike, not automatically a police hukou act |
| 勿用 | DoNotUse | Old Cui’s tape mark |
| 乳名 | milk name | household call-name |
| 谱名 | register name / genealogy name | name written on the book |
| 辟谣 | debunking package | Min Ke’s airable 90s |
| 民生热线 | Civic Hotline | dead program |
| 裴晚 | Pei Wan | intern |
| 闵科 | Min Ke | editorial director |
| 老崔 | Old Cui | cutter |
| 刘所长 | Director Liu | clinic cover |
| 周石 | Zhou Shi | father, register name |
| 周桂 | Zhou Gui | mother, milk name |
| 房伯 | Uncle Fang | genealogy book-keeper |
| 招弟 | Zhaodi | Hedong red herring; also a common milk-name pattern in C006 |

Token IDs stay: `yingsheng`, `zhaozhao`, `zhouyindi`, `touqi`, `liusuochang`, `piyao`, `laocui`, `wuyong`, `zhoushi`, `zhougui`, `fangbo`, `tiying`, `chuji`, `minke`, `zhaodi`.

Do not write how-to-call-souls, hair-cutting, or real missing-person cases. The police-desk clip that refuses to draft locator notices is source-faithful station talk, not a case file.

## Technical contract

- Work only under this English folder. Chinese originals stay untouched.
- Save key: `minsheng-v1-en` (does not share `minsheng-v1`).
- `html lang="en"`. Search `maxlength` 32.
- Search still strips whitespace from the query, then does case-insensitive `indexOf` on compacted English `text` + `who` only.
- Latin search is the play path. Minimum two letters. Empty / short errors in English. Chinese queries are not stored on clips and return no hits.
- IDs, dates, codes, image paths, token arrays, and ending graph unchanged.
- English clips rebuild from `js/clips.zh.js` via `tools/localize_clips.py`. Do not let `tools/build_library.py` overwrite `js/clips.js`.
