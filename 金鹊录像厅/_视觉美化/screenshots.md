# 截图矩阵　停更录像厅搜词调查　20260823-d9

运行：http://127.0.0.1:8928/（中）http://127.0.0.1:8929/（英）本地 http，非 file://，非 iframe。
路径：`visual/停更录像厅搜词调查/20260823-d9-{zh|en}/{nn}-{slug}.png` 与成对 `-before.png`。
试玩证据在 `_视觉美化/playtest-evidence/`，**不算发布媒体**。

每张：输入 → 画面变化 → 维。中英同一套 nn。

## 通用 12

| nn | slug | 输入 | 画面变化 | 维 | status |
|---|---|---|---|---|---|
| 01 | boot-first-screen | 打开 introduction.html | 黑条头图说明书，无搜框，进厅钮 | D1 D2 | PRESENT |
| 02 | core-verb | 进店后首页 | 米色灰 Tab + 顶栏搜，公告含加映场 | D6 | PRESENT |
| 03 | success-feedback | 搜 加映场 / ExtraShow | 另开结果页，编号下划线 2 条 | D6 D5 | PRESENT |
| 04 | near-fail | 选择页未齐五条点退票 | 虚线井出现拒绝句，不死档 | D6 | PRESENT |
| 05 | recovery | 搜未命中词 | 虚线井 + 0 项/0 hits + 句子，搜框仍在 | D5 | PRESENT |
| 06 | narrow-320 | 首页 320 | 搜框折行，input/btn 高 44，正文仍可见 | D9 | PRESENT |
| 07 | keyboard-focus | 首页正常加载后真实键盘 Tab×2 至 #search-input（未强制伪类、未脚本加 class、未后期描边） | 搜框 3px 实线 #1a1a1a :focus-visible 大纲；包厢/PrivateRoom 虚线仍是 .dead 常驻形，不是焦点。与 02 并排唯一主差为搜框描边（可见差分约 y=6–61） | D11 | PRESENT |
| 08 | touch-targets | 论坛 390 | 蓝头搜框实测 44×；before 为 22× | D9 D11 | PRESENT |
| 09 | muted-or-reduced-motion | 说明书 + reduce | 无音频；无循环动画，主反馈仍在 | D11 D6 | PRESENT |
| 10 | non-color-state | 未命中页 | 虚线井 + 等宽「0 项」，不只灰字 | D7 D11 | PRESENT |
| 11 | empty-or-loading | 空串搜 | 未命中句「每次只搜索 1 个汉字词」，非白屏 | D5 | PRESENT |
| 12 | error-or-pause | 包厢暂停页 | 小店皮假入口说明，可回导航 | D5 | PRESENT |

## 解密专属 ≥8（第 3 节 + 类型追加）

| nn | slug | 输入 | 画面变化 | 维 | status |
|---|---|---|---|---|---|
| 13 | intro-no-search | 说明书 | 无搜框 | D1 | PRESENT |
| 14 | public-shop-nav | 首页 | 土导航 Tab + 橙搜 | D3 | PRESENT |
| 15 | embedded-cyan-desk | 已解锁场记台 | 浅青后台，蓝搜钮，异于小店橙 Tab | D3 | PRESENT |
| 16 | search-hit-newpage | 命中搜 | 另开页，非模态 | D6 | PRESENT |
| 17 | search-miss-sentence | 搜西瓜 / NoSuchWord | 有句子 | D5 | PRESENT |
| 18 | forbidden-black-red | 搜源码 / Source | 黑红斜纹 + 禁止/DENIED 戳，非模态 | D5 | PRESENT |
| 19 | archive-dossier | 票根卷宗 | 发黄纸 + 票根框 + 红戳 | D3 | PRESENT |
| 20 | hidden-qzone | 田麦空间 | 绿模块墙，异皮 | D3 | PRESENT |
| 21 | two-source-forum | 陆小棠帖 | 蓝头论坛楼层 vs 小店 | D3 | PRESENT |
| 22 | local-mp-account | 老侯地方号 | 677 白文栏 | D3 | PRESENT |
| 23 | still-no-token-home | 未搜票根的首页 | 静帧门头不露未获票根名 | D6 | PRESENT |
| 24 | login-desk | 未登录打开手册 | 落到锁形登录盒 | D5 | PRESENT |
| 25 | ending-refund | 五条齐后退票 | 卷宗「退票」终局 | D6 | PRESENT |
| 26 | classified-yellow | 黄页 | 黄顶栏异皮 | D3 | PRESENT |
| 27 | mail-web | 场记邮箱 | 三栏邮箱 | D3 | PRESENT |
| 28 | gov-redbar | 文娱志 | 红头县情 | D3 | PRESENT |
| 29 | blog-2008 | 加映场日志 | 橙头双栏博客 | D3 | PRESENT |
| 30 | lock-handbook-login | 未登录手册 | 重定向登录（与 24 同构图，证明锁） | D5 | PRESENT |
| 31 | unlocked-handbook | 已登录手册 | 青左边条须知 + 封面图 | D5 | PRESENT |
| 32 | narrow-320-forum | 论坛 320 | 搜框 44，不盖死楼层正文 | D9 | PRESENT |
| 33 | touch-390-shop | 小店 390 | 搜 44，Tab 52，包厢删除线 | D9 | PRESENT |
| 34 | corp-points | 积分站 | Frontpage 表格企业站 | D3 | PRESENT |
| 35 | forbidden-static | 禁止页文件 | 黑红戳，无游戏 HUD | D5 | PRESENT |

五套并排单帧：UNTESTED。用 14/15/21/22/19 序列代替（小店、后台、论坛、地方号、卷宗）。

## before/after

同 nn、同 URL、同宽。before 在编辑前 8828/8829 拍。after 为去后缀文件。本轮 D11 仅重拍 after 的 `07-keyboard-focus.png`（8928/8929，真实 Tab×2）；01–06、08–35 与全部 `-before.png` 未改。
