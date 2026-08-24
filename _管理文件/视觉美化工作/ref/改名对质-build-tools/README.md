# 改名对质　离线构建辅助（非玩家包）

本目录只收中英 `_build.py`。它们是基线已有的离线页面生成脚本，运行 HTML/CSS/JS **无引用**，**不是玩家包、未作为发布素材**，不随玩家包分发。

不要把本目录打进 itch/ZIP/玩家包。不要把本脚本写成第三方开源许可（未核发、未声明 SPDX）。脚本内含历史本机绝对路径，仅供归档与按需恢复。

## 清单

| 项 | 中文 | 英文 |
|---|---|---|
| 原路径 | `游戏库/改名对质/中文版/_build.py` | `游戏库/改名对质/英文版/_build.py` |
| 现路径 | `_视觉美化工作/ref/改名对质-build-tools/zh/_build.py` | `_视觉美化工作/ref/改名对质-build-tools/en/_build.py` |
| 字节 | 59557 | 59557 |
| SHA-256 | `68ac64c687f5a9670e71bf6acad2e9b8a5f747b111fde0fd8c9916b47efe3857` | 同左（与中文版字节相同） |
| 基线清单 | 行内同一哈希，路径 `游戏库/改名对质/中文版/_build.py` | 行内同一哈希，路径 `游戏库/改名对质/英文版/_build.py` |

两份脚本与 `/Users/jianglong/Desktop/github游戏/_视觉美化工作/基线清单.sha256` 中对应行 **MATCH**。移动后哈希未变。

性质：局内离线构建辅助（用 PIL 写静帧/页）。不是运行时资源。LOC_QA 原文已写明不要从英文版目录执行。

## 恢复命令（仅维护需要时）

在仓库根 `/Users/jianglong/Desktop/github游戏` 执行：

```bash
cp "_视觉美化工作/ref/改名对质-build-tools/zh/_build.py" "游戏库/改名对质/中文版/_build.py"
cp "_视觉美化工作/ref/改名对质-build-tools/en/_build.py" "游戏库/改名对质/英文版/_build.py"
```

恢复后仍 **不得** 当作玩家包或发布素材。玩家包边界见本局 `licenses.md`。
