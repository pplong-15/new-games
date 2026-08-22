# VISUAL　皮肤合同

一所有者一皮。CSS 从 `html-game-puzzle/references/web-skins/css` 整文件复制。先抄 `html/` 骨架再填文。假官网页不用 `intro-manual`。

| source / 所有者 | skin_id | html_class | 用在 |
|---|---|---|---|
| 盛麦今夜字条 | intro-manual | skin-intro-manual | `introduction.html` |
| 麦记扎作夜班台 | service-cyan-desk | skin-service-cyan-desk | `maiji/*` |
| 浦页文具 | shop-local-2010s | skin-shop-local-2010s | `pu/*` |
| 娄石焚化点相册 | blog-personal-2008 | skin-blog-personal-2008 | `lou/*` |
| 井秋白转文 | wechat-mp-article | skin-wechat-mp-article | `jing/*` |
| 桐溪街坊 | discuz-board | skin-discuz-board | `bbs/*` |
| 桐溪文献摘 | gov-redbar | skin-gov-redbar | `xian/*` |

七套皮，顶栏色撞开：灰说明书 / 浅青后台 / 米色小店 / 个人博客 / 公众号长文 / 蓝论坛 / 红头。

## 不用的皮

- `search-and-forbidden`：本局循环是采词组句，不是灰栏目搜隐藏页。站内查找框留在骨架上，`action="#"`，不得开新页。  
- `archive-simsun`：回单落在麦记皮内，不另开宋体档案站。

## 图（无字、无台标、无人脸）

| 文件 | 拍什么 |
|---|---|
| `img/cover-yard.jpg` | 夜班后院，白纸楼库与篾骨，无招牌字 |
| `img/mix-stack.jpg` | 白纸丧扎压着红金彩扎，混堆 |
| `img/paper-maiden.jpg` | 纸扎童女，面部空白纸面，无五官 |
| `img/burn-ash.jpg` | 砖砌炉口与灰，夜，无人 |
| `img/bamboo-frame.jpg` | 未糊完的楼库篾骨 |
| `img/lion-craft.jpg` | 开业狮头纸扎，无店名 |
| `img/desk-papers.jpg` | 桌上复写纸与印泥，字迹不可读 |
| `img/shop-glass.jpg` | 文具店夜窗，货影，无招牌字 |

## 词袋与句卡

落在字条下半与麦记皮内。词袋是「今夜词袋」便签，不是悬浮任务条。句卡是夜班表单，1px 线，不另做现代大卡，不做成全屏 HUD。一格不闪绿。

## 反 AI 感

禁止全站圆角白卡走完。引言的白卡只许留在 `introduction.html`。站内禁止 Inter 当中文正文。红头禁用 flex/grid（皮肤合同）。论坛保持 960 蓝头楼层。公众号栏宽按皮 677。
