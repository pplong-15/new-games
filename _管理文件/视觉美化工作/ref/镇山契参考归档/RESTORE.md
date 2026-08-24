# RESTORE · 把参考归档还原进镇山契游戏树

本步骤**不会**改玩家 HTML。只把内部研究素材放回原相对路径。

```bash
ARCHIVE="/Users/jianglong/Desktop/游戏美化/_视觉美化工作/ref/镇山契参考归档"
GAME="/Users/jianglong/Desktop/游戏美化/镇山契"
cd "$ARCHIVE"
shasum -a 256 -c MANIFEST.sha256
rsync -a payload/ "$GAME/"
```

核验通过后再 rsync。`payload/` 目录结构与迁出前的游戏树相对路径一致。

还原后游戏树会再次包含未授权真实站图；**不要把还原后的整树打成玩家 zip。**
