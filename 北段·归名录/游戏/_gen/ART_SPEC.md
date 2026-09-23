# 北段 V2 全量生图

用户已明确要求：**把全部生图做完**。使用 Cursor GenerateImage。
参考图（必须带上）：`/Users/Zhuanz/Desktop/北段·归名录V2/docs/art-v2/originals/approved-concept.png`
风格样张：`/Users/Zhuanz/Desktop/北段·归名录V2/docs/art-v2/originals/v2-portrait-wenjibai.png`

只改桌面副本。禁止改 Codex 原版、禁止改 `catalog.js` 数值。

## 工具

GenerateImage 参数：
- `description`：下面「统一前缀」+ 该条画面指令 +「统一限制」
- `filename`：任务表里的 png 名（不要路径）
- `aspect_ratio`：任务表里的比例
- `reference_image_paths`：`[approved-concept.png 的绝对路径]`

生成后把工具返回的 png **复制**到：
`/Users/Zhuanz/Desktop/北段·归名录V2/docs/art-v2/originals/<filename>`

然后运行：
```bash
python3 "/Users/Zhuanz/Desktop/北段·归名录V2/游戏/_gen/convert-art.py"
```

不要把母稿 png 放进 `游戏/assets/`。运行图必须是 webp。

## 统一前缀

为原创中式恐怖悬疑卡牌游戏《北段·归名录》制作一张独立、高精度的游戏原画。架空古代中国民间，成熟半写实数字手绘，可信的人体与表情，细致的布料、旧纸、木材、铜器与潮湿砖石，清晰主体与精确焦点，冷灰月光和少量暖油灯光，克制朱砂色，电影化明暗层次，能在小卡面辨认。本作的恐怖来自名字被人动过、灯照不到那半边、誊清本和底稿对不上，不是血腥或鬼脸。只画此次指定的一个资产，不做游戏截图。民俗器物要有手工痕迹与使用磨损：写名的纸符、长明灯、白幡与牌位、香炉与灰、朱砂与红线、旧册与朱笔、纸扎。

## 统一限制

不要游戏界面、不要牌桌、不要卡框、不要血量费用按钮，不要任何中文或英文文字、数字、商标、水印、字幕、拼贴、九宫格、多张资产合在一张图。不要现代物件（手电筒、塑料、电灯、钢笔、怀表玻璃数字），不要科幻、西式恶魔、吸血鬼、清朝僵尸、发光法阵。不要把活人画成尸体，不用黑雾遮住主物。画面上的册页只许模糊墨痕，不许可辨认汉字。

## 变脸版

与常态构图、机位、光线完全相同，只改一处（灯灭 / 名册多一行 / 纸扎转过身 / 影子多一只手）。用常态图做 `reference_image_paths`。

## 人物必须同一张脸

同一人物的多张卡引用同一文件名。不要随机换脸。
