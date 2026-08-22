# 牌位勘误　第三批交底

只做这一局。对标镇山契方案卡。玩家卫棠。民俗 media-paiwei。

必读：`/Users/Zhuanz/Desktop/新游戏2/BATCH3.md` `LOCK.md` `EXPAND.md`（文案铁律仍适用）
民俗：`~/.cursor/skills/html-game-explorer/references/folklore/entries/media-paiwei.md`
解密 skill：`~/.hermes/skills/software-development/html-game-puzzle/SKILL.md`
故事：`~/.hermes/skills/software-development/html-game-story-writer/SKILL.md`
闸A：`~/.hermes/skills/software-development/html-game-story-qc/SKILL.md`
闸C：`~/.hermes/skills/software-development/html-game-deai-qc/SKILL.md`
文案：`~/.cursor/skills/game-copy-humanize/SKILL.md`
皮肤：`~/.cursor/skills/html-game-puzzle/references/web-skins/`

顺序不许跳：STORY → GATE_A → PLAY → VISUAL → HTML+图 → COPY_NOTES → GATE_B → PLAYTEST → GATE_C → VOLUME。

体量：≥36 html，≥10000 汉字，≥8 张独特无字图。
入口：`introduction.html`。
收工：
```
python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/牌位勘误" 36 10000
python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/imgcheck.py" "/Users/Zhuanz/Desktop/新游戏2/牌位勘误" 8
```
