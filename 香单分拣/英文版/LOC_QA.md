# Incense Queue — localization QA

Gate L snapshot for `/Users/Zhuanz/Desktop/新版游戏英文版2/香单分拣/` only. Chinese originals under `/Users/Zhuanz/Desktop/新游戏2/香单分拣/` were not written.

## PASS_FOR_SOURCE_SNAPSHOT

Machine-checked against this folder after the HTML/JS transcreation:

| Check | Result |
|---|---|
| Playable HTML files | 40 |
| `html lang="en"` | 40 / 40 |
| Document title / placeholder / noscript Han | 0 |
| Full-file Han in `*.html` (includes `<script>`) | 0 |
| Full-file Han in `js/state.js` | 0 |
| Save key | `mewan-fuzhe-xiangdan-v1-en` (does not share `mewan-fuzhe-xiangdan-v1`) |
| Ticket nos | Unchanged: `FZ-0714-03` / `11` / `18` / `22` / `27` / `31` / `08`; stub `FZ-0628-19` |
| Desk codes | Unchanged: `zheng` / `gu` / `deng` / `none` |
| Ending keys | Unchanged: `reroute` / `pass` / `hold` / `late` / `soft` |
| Queue engine | Push, not search. Residual boxes POST to `search-closed.html` |
| `noteHas` English keys | `Boyuan` / `June 19` / `not entered` / `Kaiping` |
| `LOCALIZATION_CONTRACT.md` | Present |
| `loc_qa_scan.py` on dest root | `香单分拣  html 40  lang en  全文汉字 0  界面中文 0` |

Source of truth remains the Chinese folder. English HTML was hand-transcreated page by page.

## Correct sort (English)

Off-screen path for QA. Not printed in-game as a walkthrough.

1. Pre-shift sheet → Fuzhe desk. Queue already holds the He ticket.
2. **He family FZ-0714-03: release / ancestral seat.**
3. Alley clothing-burn FZ-0714-11: hold / no table.
4. Guangci lamp renewal FZ-0714-18: release / lamp offering.
5. **Ji Wanqiu FZ-0714-22: hold / solitary-soul table.** Note reaches Boyuan, June 19, Shoucheng not entered in the niche (and/or Kaiping).
6. Association clothing offering FZ-0714-27: release / solitary-soul table.
7. East-embankment lamps FZ-0714-31: hold.
8. Banquet inquiry FZ-0714-08: hold / no table.
9. File the shift receipt.

Ji hold + solitary-soul table is ending `reroute`. He release + ancestral seat is the teaching complete ticket. Attachments follow the open ticket; they are not searched out.

Locked terms used in play: Qiu Shi, Zhongyuan, ancestral seat vs solitary-soul table, release / hold / change table. Ghost-gate how-to was not written.

## Unproven gates (do not mix with PASS above)

Not run in this pass:

- Full English-only playthrough in a real browser (desk → seven tickets → pushed attachments → receipt).
- Screen reader / keyboard-only beyond existing link structure.
- `file://` quirks on a given OS.
- Isolation test: Chinese save `mewan-fuzhe-xiangdan-v1` vs English `mewan-fuzhe-xiangdan-v1-en` on one origin.
- Human register read of all 40 pages against the contract table.
- OCR of remaining Chinese **in image pixels** if any. Players are not asked to OCR. Pixel Han is not a DOM defect.

Chinese `STORY.md` / `PLAY.md` / gate notes in this folder are source-side documents, not player-facing. CSS comments may still contain Han; the scanner only reads `*.html`.
