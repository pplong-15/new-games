# 许可表　同窗在线视觉美化　20260823-d4

制作人填写。未列文件不得作为过闸条件。

| 文件 | 来源 | 许可证 | 可否再分发 | 是否 AI 辅助 | 实测 |
|---|---|---|---|---|---|
| 中文版/工程/css/common.css | 本局手写补丁（44px / focus-visible / 命中未命中禁页非唯色） | 与游戏包一并分发 | 是 | 否 | 壳补丁 |
| 英文版/工程/css/common.css | 同局补丁（与中文同规则，不宣称逐字节相同） | 与游戏包一并分发 | 是 | 否 | 壳补丁 |
| 中文版/工程/assets/img-avatar-syz.jpg | 离线 Pillow，人物字典 seed=200704 | 与游戏包一并分发 | 是 | 否（程序生成，无远程、无逐张提示词） | 24784B d34146b1e0d2db6f |
| 中文版/工程/assets/img-avatar-cxb.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 25593B 983b84972a970eb1 |
| 中文版/工程/assets/img-avatar-zt.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 25675B 309aa487cfe250ce |
| 中文版/工程/assets/img-album-grad2007.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 76003B 8089c3e4ffd43ac7 |
| 中文版/工程/assets/img-album-obituary.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 83518B 97da635ad977c77e |
| 中文版/工程/assets/img-album-paperhorse2009.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 78797B 961736418175ed21 |
| 中文版/工程/assets/img-album-spring2010.jpg | 同上 | 与游戏包一并分发 | 是 | 否 | 75067B f0cd181de4d46e93 |
| 英文版/工程/assets/*.jpg | 中文 7 张逐字节复制（stills-hash match=true） | 与游戏包一并分发 | 是 | 否 | 媒体合计 389437B |
| _视觉美化/tools/gen_campus_stills.py | 本局离线出图脚本 | 仅制作工具，不进玩家包 | 是 | 否 | — |
| 既有 skin CSS（除 common.css）/ HTML / js/data / js/pages / js/engine | 原作保留，本局未改 | 原作许可 | 是 | 否 | 对照基线清单路径未改写 |

禁止项核对：无商标切图、无品牌字体当主视觉、无远程字库、图内无可读字。
当前玩家包静帧是 generated-img 几何图，不是 rollback-before-img 写实头像。
