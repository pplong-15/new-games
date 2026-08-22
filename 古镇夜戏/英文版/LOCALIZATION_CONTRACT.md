# English Localization Contract — Night Play in an Old Town

## Positioning

Working title: **Night Play in an Old Town**.

The edition must read as an English-language investigation conducted inside a Chinese county tourism / troupe / old-forum environment (Tongxian, Huaixi). The player solves provenance, identity, chronology, and record meaning: why the package sells a Backstage tour, why the troupe forbids guests, how a phone number enters DutyBook, why the system writes CurtainUp. It is not a Chinese literacy exam and not a tourist chinoiserie ghost tour.

Do not write exorcism steps. Do not write living actors as possessed. DiHou is on funeral leave. WhitePlay does not bind people. NightPlay does.

## Non-negotiable evidence limits

- Tourism sold an intangible-heritage NightPlay package that prints Backstage tour included. County Experimental Troupe visit notice states Backstage is closed to guests. Both lines exist. The public pages do not assign a single office that resolves the fight.
- NightPlay CurtainUp is determined by DutyBook roll-call, not by a full house. After roll-call the system may write CurtainUp and close refunds. That status is a recorded system field, not proof that a ritual opened.
- Empty DutyBook rows may be filled from the buyer's phone on the travel list as temporary Extra. Ticket YX-0821-19 / phone 13972810834 / ShenNan appear on the order, the DutyBook transcript, and the Playbill margin. Consent by ShenNan is not established by these sources. The consent column on the margin scan is blank.
- The DutyBook transcript establishes that the number is on the book. That ShenNan went on stage is not established by these sources. Whether DiHou's funeral leave is true or false is not established by these sources.
- IncenseAccount 0834 is the last four of a phone. An added stick is logged as checked against the troupe when NightPlay was made full. The public pages cannot determine who checked it in the temple.
- MaJu's earlier out-of-town number was written the same way; that row was later struck when three books matched. That does not prove tonight's row will be struck, and it does not prove supernatural causation.
- WhitePlay does not write DutyBook, Extra, or out-of-town numbers. Using WhitePlay refund practice to refund NightPlay is specifically the connection the visit notice rules out.
- Absence of a method, an exorcism page, or a possession plot is intentional. Search returning nothing for exorcism does not prove the world is harmless; it proves this site does not teach a method.

Use `not established by these sources`, `the public pages cannot determine`, and `this specific connection is ruled out` exactly. Do not convert a missing field into exoneration.

## Retained-Chinese allowlist

Player-visible Han in HTML body copy is not required for play. This edition puts extractable CamelCase tokens on the page and keeps Chinese only as hidden search aliases in `js/keywords.js`.

If a later pass restores visible Han, wrap it:

- names on scans / seals (ZH-NAME)
- shop signs or playbill glyphs inside still photographs (ZH-BRAND / ZH-FRONT)
- leftover collage or stamp fragments (ZH-COLLAGE)

Every restored visible item must sit in `.zh-artifact[lang="zh-Hans"]` with a same-stage `.artifact-translation`. Functional UI contains no required Chinese.

Still JPEGs may contain signs or printed playbills that cannot be wrapped at the pixel level. Those glyphs are not search tokens and are not required to proceed.

## Names and terms

Surname-first romanization in prose (`Shen Nan`). Search tokens are single CamelCase with no spaces.

| Token | Chinese alias | Bounded sense |
|---|---|---|
| NightPlay | 夜戏 | night performance sold as intangible-heritage package; not the same ticket as WhitePlay |
| WhitePlay | 白戏 | afternoon performance for locals; does not write DutyBook and does not bind out-of-town numbers |
| DutyBook | 应工 | troupe duty book / assigned-work row; "treated as DutyBook" is a Cultural Center gloss of a stele phrase, not a method |
| Extra | 龙套 | walk-on / supernumerary row, often filled from a travel-list phone |
| Stagehand | 检场 | prop-and-entrance crew, not a doorman and not a Western stage manager |
| CurtainUp | 开锣 | opening-gong / curtain status; CS recites "curtain already up" |
| Backstage | 后台 | backstage; package prints a tour; troupe forbids guests |
| Playbill | 戏单 | this week's bill; margin notes are internal |
| IncenseAccount | 香火 | incense register; added sticks may carry last-four digits |
| Laolang | 老郎 | troupe name for the Kaiyuan Emperor enshrined at the temple; visitors say "god"; QiaoGan does not correct it |
| Mulian | 目连 | billed as a filial-piety play; excerpt Crossing Naihe |
| ShenNan | 沈南 | player; ticket YX-0821-19; phone 13972810834 |
| ChengShi | 程石 | troupe head; short sentences; needs the company full |
| DiHou | 狄厚 | Stagehand on funeral leave 2014-08-18 to 2014-08-25 |
| DouPi | 豆皮 | 2008 Teahouse poster |
| MaJu | 马句 | earlier out-of-town number; 2009 poster |
| QiaoGan | 乔干 | heritage staff; steles, not methods |
| WuChuang | 吴窗 | Tourism CS; recites curtain already up |

Place names: Tongxian, Huaixi Old Town, Flagstone Street, Huaixi Lodge, Huaixi Teahouse, Tongxian Experimental Troupe, Tongxian Cultural Center.

Pear Garden is the traditional actors' lodging term on the stele. Crossing Naihe is the excerpt title. zhezixi / short excerpt is the package's billed form. Do not merge NightPlay with WhitePlay, Extra with Stagehand, or IncenseAccount with DutyBook.

## Registers

- Huaixi Teahouse / DouPi / MaJu: messy 2000s net English (lowercase, dropped apostrophes, heat).
- Official troupe, Cultural Center, Tourism promo: dry passive, no literary fog.
- WuChuang: recites curtain already up; will not explain DutyBook.
- ChengShi: short sentences.
- UI, forms, search chrome: clean standard English.

## Technical contract

- Runtime truth is the current Chinese source, including the 42 unique `.supp` volume-fill blocks. This pass does not change routes, grants, dates, ticket IDs, phones, ending graph, still paths, or CSS layout. Page-number footers (`N/42`) were already dropped on the Chinese side and stay dropped here.
- Save key: `guxz-v1` → `guxz-v1-en` (`js/tokens.js` and introduction wipe).
- `html lang="en"`. Search `maxlength="32"`.
- Search accepts one Han word **or** one Latin token (`[A-Za-z][A-Za-z0-9]*`), case-insensitive lookup. Chinese queries remain aliases.
- First extractable story word on home and ticket main copy: NightPlay.
- English-only input must be able to complete lookup (YX-0821-19 or 13972810834) and token search.
- `GATE_A.md` / `STORY.md` / `VOLUME.md` left in Chinese. Player start is `HOW_TO_PLAY.txt`.
- Do not run `tools/build_site.py` over this edition; it still emits Chinese HTML.
