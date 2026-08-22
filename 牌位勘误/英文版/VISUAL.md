# VISUAL　皮肤合同

一所有者一皮。CSS 从 `html-game-puzzle/references/web-skins/css` 整文件复制。先抄 `html/` 骨架再填文。假官网页不用 `intro-manual`。

| source / 所有者 | skin_id | html_class | 用在 |
|---|---|---|---|
| 卫棠今夜字条 | intro-manual | skin-intro-manual | `introduction.html` |
| 文书室著录台 | service-cyan-desk | skin-service-cyan-desk | `desk/*` |
| 沥江殡仪馆对外 | shop-local-2010s | skin-shop-local-2010s | `index.html` `public/*` |
| 沥江晚报 | news-portal-163 | skin-news-portal-163 | `paper/*` |
| 翟氏宗亲会 | corp-table-2005 | skin-corp-table-2005 | `clan/*` |
| 县图家礼影印 | archive-simsun | skin-archive-simsun | `archive/*` |
| 沥江地方帖 | tieba-floors | skin-tieba-floors | `forum/*` |
| 文书室公共邮箱 | mail-web-2010 | skin-mail-web-2010 | `mail/*` |
| 县殡葬服务公示 | gov-redbar | skin-gov-redbar | `gov/*` |

九套皮顶栏色撞开：灰说明书 / 浅青后台 / 米色馆站 / 红新闻 / 表格商会 / 宋体卷宗 / 楼层帖 / 三栏邮箱 / 红头公示。

## 不用的皮

- `search-and-forbidden`：本局循环是方案卡多源核对，不是灰栏目搜隐藏页。
- 对照台皮：不做左右两栏交挂条。

## 图（JPEG，无字无台标无人脸遗容）

| 文件 | 用在 |
|---|---|
| `img/cover-desk.jpg` | 引言头图，文书室夜 |
| `img/tablet-wood.jpg` | 家礼影印氛围 |
| `img/tablet-red.jpg` | 台面 / 纸位物件 |
| `img/niche-empty.jpg` | 宗亲会昭穆 |
| `img/cinnabar-brush.jpg` | 点主抄件 |
| `img/newspaper-stack.jpg` | 晚报 |
| `img/incense-hall.jpg` | 馆对外 |
| `img/archive-boxes.jpg` | 公示 / 邮箱侧 |

## 方案卡

落在文书室皮内，六栏下拉 + 黑钮提交，1px 线，不另做现代大卡，不做成全屏 HUD。

## 反 AI 感

禁止全站圆角白卡走完。引言白卡只许留在 `introduction.html`。站内禁止 Inter 当中文正文。宗亲会保持表格 778。论坛保持楼层。公示不用国徽。
