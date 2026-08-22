# English Localization Contract — Night Shift (Hengdeng Mart)

Full spoilers. Gate L transcreation for `夜班.html`. Chinese runtime remains the source of truth; this edition does not invent plot, add supernatural proof, or “fix” the Chinese story.

## Positioning

Working title: **Night Shift — Hengdeng Mart**.

The edition must read as an English-language night shift *inside* a Chinese alley convenience store. The player solves who hired them, what the lamp is for, whether to take joss paper, and who gets the shop at dawn—not a Chinese literacy test.

Registers stay split:

- **HUD / UI / toasts**: clean English (`Sanity`, `INV`, `RUL`, `CLUE`, `RST`, power-bill numbers).
- **Boss texts**: clipped, evasive, a supervisor who does not want to be found.
- **Regulars** (Auntie Lin, Delivery Wang, Zhou Xiaowan, Taxi Chen, Guard Wu): spoken, local, not literary.
- **Unquiet guests** (Wet-Hair Man, White-Dress Woman / Xiao Ya, Old Man in Zhongshan Suit): too polite, slightly off, no tourist chinoiserie.
- **Cat POV**: sensory, short, no metaphor pile-up.
- **Store rules / oil paper**: command voice. Rule numbers stay `1`–`5` as in-memory keys.

## Evidence limits (do not inflate)

- Heng handed the lamp off and “did not leave” is what alley talk, the oil-paper verso, and the Zhongshan recruiter *suggest*. The public shop does not certify a haunting.
- Two “bosses” (autumn-gone Heng vs. the texter who throws keys) are distinguishable from in-shop evidence. That does not prove cause of death or that Heng “is a ghost” as a legal fact.
- Xiao Ya / Chen Xiaoya: three years ago she went out for milk in the rain and did not come back. Skirt wet only when rain hits the living. The game does not establish a death certificate, a body, or a named killer.
- Counting joss paper / taking the red stack is a *rule trap* in this shop’s practice, not proof of a ritual’s efficacy.
- Camera glitches, dry mats, missing shadows, and delayed reflections are observed in play. They do not, by themselves, prove a single supernatural cause.
- Use hedges when the sources do not close a claim: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`. This game is a shift sim, not an archive mystery; do not add archive-style certainty the Chinese text never had.

## Retained-Chinese allowlist

Player-visible DOM Han outside this list is a defect. After this pass, **DOM Han excluding `data:` payloads is 0**.

Allowed only as *pixels in embedded photos* (shopfront, portraits, interior), not as operable text:

- ZH-BRAND: neon / signage on the Hengdeng storefront still in the exterior image.
- ZH-FRONT: any characters painted on shelves, curtains, or receipts inside photographs.

No `.zh-artifact` wrappers were added: there is no operable Han left to wrap. Image-only glyphs cannot be selected or searched; English-only input is enough to finish.

## Names and terms

Surname-first romanization in running prose. Search tokens (if any later) must be CamelCase without spaces.

| English | Source | Bound |
|---|---|---|
| Heng | 恒 | Surname *and* the lamp/shop root; keep both readings available. |
| Hengdeng Mart | 恒灯便利 | Shop name; dawn-readable four characters. |
| Old Heng / Boss Heng | 老恒 / 恒老板 | Same man as the Zhongshan recruiter is a *deep* reading, not a HUD fact. |
| Xiao Ya / Chen Xiaoya | 小雅 / 陈小雅 | Roster-crossed name. Bare Xiao Ya is this guest in this shop. |
| Auntie Lin / Lin Xiuzhen | 林阿姨 / 林秀珍 | Regular; roster match. |
| Delivery Wang / Wang Jianjun | 王师傅 / 王建军 | Delivery rider. |
| Guard Wu / Watchman Wu | 吴保安 / 吴师傅 | Alley-mouth guard; playable role. |
| Taxi Chen / Chen Jianguo | 陈师傅 / 陈建国 | Taxi; zhizha-shop gossip. |
| Zhou Xiaowan | 周晓晚 | Upstairs tenant. |
| Zhongshan suit | 中山装 | Formal jacket; not “Mao costume” tourism. |
| joss paper | 纸钱 | Red ritual notes. Not RMB. Numeric face value can lie at night. |
| zhizha shop | 纸扎铺 | Paper funeral-goods workshop (paper people, paper horses). First Chen line supplies the gloss. |
| Qingming | 清明 | Calendar peak for that trade. |
| peachwood charm | 桃木挂件 | Folk ward; do not merge with other red cords. |
| Hongtashan | 红塔山 | Cigarette brand, untranslated. |
| sanity | 神智 | HUD meter. Thresholds **35** / **0** unchanged. |
| standing | 店誉 | Hidden `rep`; toast copy only. |
| back room | 后间 | Rule 3. |
| roster | 花名册 | Wu’s book; not the night-shift ledger. |

Numeric rules, night counts (7), cash (¥), power floors, and ending graph IDs (`dawn`, `ferry`, `cat`, `joss`, `void`, `fired`, role endings) are unchanged.

## Technical contract

- Playable file: `夜班.html`. `html lang="en"`. Title: `Night Shift — Hengdeng Mart`.
- Logic, portrait IDs, clue IDs, flag IDs, routes, and prices unchanged. Rule-sheet keys `一`–`五` display and store as `"1"`–`"5"` (English save is independent).
- Name-matching for Cat View uses English needles (`Wet-Hair`, `White-Dress`, `Zhongshan`, `Auntie Lin`, `Delivery Wang`, `Guard Wu`, `Taxi Chen`, `Zhou Xiaowan`, `Rain-Soaked`, `Xiao Ya`, `You`, `Doorbell`, `Shop cat`).
- Independent localStorage keys (do not read Chinese saves):

| Chinese key | English key |
|---|---|
| `hengdeng-nightshift-v2` | `hengdeng-nightshift-v2-en` |
| `hengdeng-cleared` | `hengdeng-cleared-en` |
| `hengdeng-endings` | `hengdeng-endings-en` |
| `hengdeng-unlockedCatView` | `hengdeng-unlockedCatView-en` |
| `hengdeng-catViewOn` | `hengdeng-catViewOn-en` |
| `hengdeng-catMemories` | `hengdeng-catMemories-en` |
| `hengdeng-catMemCleared` | `hengdeng-catMemCleared-en` |
| `hengdeng-unlockedRoles` | `hengdeng-unlockedRoles-en` |
| `hengdeng-selectedRole` | `hengdeng-selectedRole-en` |
| `hengdeng-clues` / `clueLinks` / `truths` | `hengdeng-clues-en` / `hengdeng-clueLinks-en` / `hengdeng-truths-en` |
| `hengdeng-cp-${n}` | `hengdeng-cp-en-${n}` |
| `hengdeng-cp-${role}-${n}` | `hengdeng-cp-en-${role}-${n}` |

- No Han-only search gate in this game. English-only click-through is the intended path.
- Embedded `data:` images and audio were not rewritten.
- JS syntax checked with `node --check` on extracted scripts after stripping `data:` payloads (`PASS_FOR_SOURCE_SNAPSHOT`).
