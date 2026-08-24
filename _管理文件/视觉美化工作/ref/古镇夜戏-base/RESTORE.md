# 恢复 assets/base 到玩家语言目录

这两份是美化前从玩家包完整移出的原目录，不是删除。

## 核对

中英 16 张文件名与 SHA256 见 `SHA256.txt`。本局核对为字节相同，仍分语种保存。

## 恢复（可逆）

在仓库根 `/Users/jianglong/Desktop/github游戏` 执行：

```bash
REF="_视觉美化工作/ref/古镇夜戏-base"
GAME="游戏库/古镇夜戏"
mkdir -p "$GAME/中文版/assets" "$GAME/英文版/assets"
mv "$REF/中文版/assets/base" "$GAME/中文版/assets/base"
mv "$REF/英文版/assets/base" "$GAME/英文版/assets/base"
```

恢复后用 `SHA256.txt` 对玩家目录再哈希一次。不要把本 `ref/` 目录算进玩家发布包。

静帧 `assets/stills/` 从未移动。
