# VISUAL　皮肤合同

一所有者一皮。CSS 从 `html-game-puzzle/references/web-skins/css` 整文件复制。先抄 `html/` 骨架再填文。假官网页不用 `intro-manual`。

| source / 所有者 | skin_id | html_class | 用在 |
|---|---|---|---|
| 芮秋今夜字条 | intro-manual | skin-intro-manual | `introduction.html` |
| 衡谱堂委托台 | service-cyan-desk | skin-service-cyan-desk | `hengpu/*` |
| 县图特藏 | archive-simsun | skin-archive-simsun | `library/*` |
| 湾口户政旧镜像 | gov-redbar | skin-gov-redbar | `hukou/*` |
| 湾口镇事 | discuz-board | skin-discuz-board | `forum/*` |

五套皮，顶栏色撞开：灰说明书 / 浅青后台 / 宋体卷宗 / 红头 / 蓝论坛。

## 不用的皮

- `search-and-forbidden`：本局循环是并排对照，不是灰栏目搜隐藏页。站内查找只在本所有者页内跳转（委托台查页号、户政查户主）。  
- `shop-local-2010s`：入口已是后台+馆+楼，不再做文旅小店壳。

## 图

- `img/cover-paper.png`：引言封面。纸、墨污、空格线。无拉丁文、无日期台标、无汉字。  
- 谱页、底册用表格模拟，不再生带字的「扫描图」。

## 对照台

落在衡谱堂皮内，左右下拉+字段表，1px 线，不另做现代卡片壳，不做成全屏 HUD。

## 反 AI 感

禁止全站圆角白卡走完。引言的白卡只许留在 `introduction.html`。站内禁止 Inter 当中文正文。户政禁用 flex/grid（皮肤合同）。论坛保持 960 蓝头楼层。
