# English Localization Contract — Little New Year Patrol (腊月巡站)

Full spoilers. Gate L transcreation. Chinese runtime under `/Users/Zhuanz/Desktop/新游戏2/腊月巡站/` remains the source of truth. This edition does not invent plot, add a Kitchen God appearance, teach a send-off, or “fix” the Chinese story.

## Positioning

Working title: **Little New Year Patrol**.

The edition must read as an English-language night shift *inside* a Chinese county internet cafe. The player is You Shi, night attendant at Star Glow Cafe in West Gate, Anjin County, on 2008-01-29 (dinghai year, 12th lunar month, 22nd, after 19:00). Lu Guifen of the subdistrict dumped a joint-inspection slip on the counter: take down three still-live shop pages that match three already-posted wordings. Only one shop is named. The player solves provenance (which page wrote which wording), identity (which shop is which, including near-names), chronology (this street’s send-off date vs. a Jiangnan 24th), and rule-meaning (mourning retail, incense-ash copy) — not a Chinese literacy test.

Registers stay split:

- **Work-order / return-slip / subdistrict notices**: dry municipal English. Dates, bans, “do not treat X as this item.” No literature.
- **You Shi notepad**: short, annoyed, revises himself. Counter talk, not a manual.
- **Fang Zhengping notes**: spoken under the counter. Meal tickets, do not tick this cafe’s own portal.
- **Lu Guifen mail / handwritten addendum**: official short clauses with a private aside in the same breath.
- **Ma Xiulan (Fushun)**: sales chatter, repeats the natal home, leaks the 24th from the pitch.
- **Cui Jianguo (Cuiji)**: bald dictated sentences, kid-typed. Price, funeral, still open. No apology.
- **Qi Xiaoman (Jingxuan)**: classified-ad short. Quote, “One-Bag Clean,” trash bag. Convenience, not piety.
- **Zhang Shusheng (Chunni)**: rules first, then price and booking. Clean counter-example.
- **Forum handles**: 2000s board English. Fragments, shrugs, one-sided gossip. Signatures stay short and fixed.
- **Anjin encyclopedia intern**: half-bookish catalog. Refuses to name shops. Not a stall.
- **Gan Laosan / Hou Qiusheng / Que San**: stall talk, near-name disclaimer, amateur quotes. Noise.
- **XP chrome / forms / buttons**: clean UI English (`Start`, `File`, `Inbox`). No stylized slang.

## Evidence limits (do not inflate)

- Subdistrict rulings 1 / 2 / 3 prove what this street *wrote down* (dusk of the 12th lunar month, 23rd; no New Year red goods during a mourning period; incense ash in a separate bowl, not the bin). They do **not** prove the Kitchen God went to Heaven.
- Fushun and its bundle page prove Ma Xiulan sells on the 24th / nian-si and writes Jiangnan practice on the shop page. They do **not** prove she meant to cheat the street.
- Cuiji and the item page prove red Kitchen God prints are still for sale and the shop says a funeral is on. The white-affair thread supplies the 18th and that the first seven days are not up by alley count. These pages do **not** establish an eyewitness inventory of the mourning hall.
- Jingxuan and “One-Bag Clean” prove advertisement wording (ash into a trash bag, into the compound bin). They do **not** prove she has already dumped anyone’s ash.
- Chunni and its price page prove clean wording (porcelain bowl returned; broom stays outside the shrine). Forum talk that Lu Guifen asked for New Year goods and was refused is one-sided. That request is **not established by these sources**.
- West Gate Malt-Sugar Stall proves it sells on this street’s 23rd and does not sell prints. Ticking it is a bounce, not a third violation.
- Jingua proves window-only copy and a near-name to Jingxuan. **This specific connection** (same firm as Qi Xiaoman) **is ruled out** by the public pages.
- Anjin Quotes cannot prove any stall should close. Index pages do not take goods down.
- IE history proves Fang Zhengping opened Chunni and Fushun in the afternoon. **The public pages cannot determine** a close-list from that log.
- The Kitchen God welcome-back entry proves this county writes New Year’s Eve for the return. It is not a close-site ground.
- Night-Shift Soda’s line about You Guizhi and Cuiji prints is a side thread. It does not change the check.
- Missing a tick is not innocence of the still-live page. Extra ticks are not proof those extra sites violated the three wordings.

Use hedges when the public pages do not close a claim: `not established by these sources` / `the public pages cannot determine` / `this specific connection is ruled out`.

**Do not write ritual how-to.** No send-off steps, no sugar-as-bribe, no “how to receive the Kitchen God.” Encyclopedia cards may name catalog actions already on the Chinese card (change print, offer sugar, burn paper horses) as *fields*, not instructions.

## Retained-Chinese allowlist

Player-visible Han outside this list is a defect. This pass targets **zero operable Han** in HTML/JS (including strings injected by `patrol.js`).

No `.zh-artifact` wrappers are required: there is no operable Han left to wrap. Shop IDs (`fushun`, `cuiji`, `jingxuan`, …) stay Latin. English-only click-through is enough to finish.

CSS file comments may still contain Chinese (author notes, not rendered). That is not player-visible UI.

## Names and terms

Surname-first romanization in running prose. Shop IDs stay the Chinese-source Latin slugs.

| English | Source | Bound |
|---|---|---|
| You Shi | 尤石 | Night attendant; player. |
| Lu Guifen | 路桂芬 | Subdistrict; year-end “clear the web before Little New Year” box. |
| Fang Zhengping | 方正平 | Star Glow owner. Meal tickets. Do not tick the house portal. |
| Ma Xiulan | 马秀兰 | Fushun; Jiangnan natal home; writes the 24th. |
| Cui Jianguo | 崔建国 | Cuiji; funeral still on; red prints still hung. |
| Cui Erbao | 崔二宝 | Second son; carried out on the 12th lunar month, 18th. |
| Qi Xiaoman | 齐小满 | Jingxuan; “One-Bag Clean.” |
| Zhang Shusheng | 章树生 | Chunni; clean counter-example; refused official sugar. |
| Gan Laosan | 甘老三 | Malt-sugar stall; sells on the 23rd. |
| Hou Qiusheng | 侯秋生 | Jingua; windows only. |
| Que San | 阙三 | Amateur quotes page. |
| You Guizhi | 尤桂芝 | You Shi’s mother; recognized a Cuiji plate. Side thread. |
| Anjin County / West Gate | 安津县 / 西关 | Setting. East Gate is the other side of town. |
| Star Glow Cafe | 星辉网吧 | Workplace. |
| Star Glow Site Directory | 星辉网址之家 | House portal. Ticking it bounces. |
| Kitchen God send-off / Little New Year | 送灶 / 小年 | This street: dusk of the 12th lunar month, 23rd. Jiangnan households often use the 24th night (nian-si). Do not merge with New Year’s Eve welcome-back. |
| Kitchen God print | 灶码 / 灶王码 | Woodblock red print. Not incense ash. Not couplets. |
| Kitchen God welcome-back | 接灶 | This county: New Year’s Eve night. Not a close-site ground. |
| year-end sweeping | 扫尘 | After send-off, before welcome-back. Empty-kitchen window. |
| incense ash | 香灰 | Separate bowl. Not household trash. Not “dirt.” |
| mourning period | 丧期 | White affair still open. No retail of New Year red goods. |
| first seven days | 头七 | Alley count from the death date. Coal Stove: 18th is day one; seven lands on the 24th. |
| joint-inspection return slip | 协查回执 | One submit. Empty = miss; extra site = bounce. |
| malt-sugar candy (tanggua) | 糖瓜 | Stall good. Not a Kitchen God print. |
| paper horses | 纸马 | Fushun bundle item. Not a print. |
| New Year couplets / window flowers | 春联 / 窗花 | Red New Year goods. Same mourning ban as prints. |
| household shrine | 神龛 | Brooms stay out (Chunni). Qi wipes it and does not set ash aside. |
| nian-si | 念四 | Ma’s Jiangnan speech for the 24th night. Keep beside official “23rd, dusk.” Do not flatten to one date. |
| One-Bag Clean | 一袋清 | Qi’s package name. Ash + dirt in one bag. |
| Fushun New Year Goods | 福顺年货 | CORRECT. |
| Cuiji Kitchen God Prints | 崔记灶码 | CORRECT. |
| Jingxuan Housekeeping | 净轩家政 | CORRECT. |
| Chunni Year-End Sweeping | 春泥扫尘 | Clean. Tick = bounce. |
| West Gate Information Station | 西关街道信息站 | Notices. Tick = bounce. |
| Anjin Little New Year entry | 小年词条 | Encyclopedia. Tick = bounce. |
| West Gate Life Forum | 西关生活论坛 | Talk. Tick = bounce. |
| West Gate Malt-Sugar Stall | 西关糖瓜铺 | Clean date. Tick = bounce. |
| Jingua Window Cleaning | 净瓜家政 | Near-name. Tick = bounce. |
| Anjin Quotes | 安津行情 | Noise. Tick = bounce. |

Forum handles (fixed signatures, not legal names): Alley Barber, West Gate Lao Li, Sugar Hawker, Not Going Home, Second-Floor Window, Manhole Watcher, Coal Stove, Night-Shift Soda.

Do not merge: Kitchen God print ≠ incense ash; Chunni (clean ash wording) ≠ Jingxuan (bag); Jingua (windows) ≠ Jingxuan (sweeping); adopted-out is not in this game; in-shaft is not in this game.

## Technical contract

- Work only under `/Users/Zhuanz/Desktop/新版游戏英文版2/腊月巡站/`. Do not edit `/Users/Zhuanz/Desktop/新游戏2/腊月巡站/`.
- Every playable HTML: `html lang="en"`.
- Document title may read `Little New Year Patrol` on chrome pages; in-world page titles keep their site voice (slip, shop, notice, thread).
- `CORRECT` remains exactly `["fushun", "cuiji", "jingxuan"]`. Extra IDs still bounce. Subpages do not join the slip.
- `ALL` / checkbox `value` IDs unchanged: `portal` `fushun` `jiedao` `cuiji` `jingxuan` `forum` `chunni` `baike` `tanggua` `jingua` `stock`.
- Routes, filenames, CSS class skins, layout, and ending files (`ending-off.html` / `ending-bounce.html` / `ending-miss.html`) unchanged.
- Save key: `lazue_xunzhan_v1-en` (must not read or write `lazue_xunzhan_v1`).
- Investigative dates in prose: `YYYY-MM-DD` for Gregorian stamps already on the pages. Lunar field values stay lunar (12th month, 23rd dusk; 24th / nian-si; 18th; New Year’s Eve). Do not invent dates.
- No Han-only search gate. Forms that only `return false` stay inert.
- No ritual how-to copy. No new supernatural proof.
- After HTML/JS: `LOC_QA.md` with `PASS_FOR_SOURCE_SNAPSHOT` for machine checks and a separate unproven-gates list.
