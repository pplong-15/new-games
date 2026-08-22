# 夜台听写　皮肤合同

只用 `html-game-puzzle/references/web-skins` 的 skin_id。一所有者一皮。假站点不用 intro-manual。

| source_id | 所有者 | skin_id | 文件 |
|---|---|---|---|
| src-intro | 霜桥广播站班组（班前纸） | `intro-manual` | `introduction.html` |
| src-desk | 夜班机 Win7 | `win7-aero` | `desk/*.html` |
| src-mail | 翟台生站内信 | `mail-web-2010` | `mail/*.html` |
| src-libu | 盛麦礼簿抄件 | `archive-simsun` | `libu/*.html` |
| src-obit | 霜桥晚报地方版 | `news-portal-163` | `obit/*.html` |
| src-gov | 东埠村务栏 | `gov-redbar` | `gov/*.html` |
| src-hosp | 县中医院夜诊科 | `corp-table-2005` | `hosp/*.html` |
| src-shop | 槐记五金 | `classified-yellow` | `shop/*.html` |
| src-bus | 柳浦班线小站 | `shop-local-2010s` | `bus/*.html` |
| src-tape | 米秋葵私人目录 | `blog-personal-2008` | `tape/*.html` |
| src-lock | 调谐器锁频 | `search-and-forbidden` | `locked.html` |

十一套皮。班前纸不进站内导航。值班机是深蓝桌面浅色窗口，不要和引言灰底白卡撞脸。

## 色与结构（不得串皮）

- 班前纸：灰底白卡片，无时间轴。  
- 值班机：Win7 深蓝桌、深色任务栏、浅标题条，窗口内才是听写。  
- 站内信：三栏邮箱。  
- 礼簿：灰底白卷、宋体、点线元数据、红戳。  
- 讣告：红头条、960 float、右栏排行。  
- 村委：红头、表格双栏。  
- 医院：778 表格居中企业壳。  
- 槐记：黄页分类。  
- 客运：米色灰 Tab 小店壳。  
- 磁带柜：二〇〇八双栏博客。  
- 锁频：黑底红字。

顶栏 Logo 色不走完全程。不做全站圆角白卡片、紫渐变、Inter 正文。

## 图（无字、无门牌、无日期台标、无人脸遗容）

生图后压 JPEG。冲突的开页手写账丢掉，改用合上的簿。

| 文件 | 用在 | 内容 |
|---|---|---|
| `img/intro-console.jpg` | 班前纸头图 | 夜班调音台 |
| `img/desk-wave.jpg` | 时间轴窗 | 波形屏，无界面字 |
| `img/hall-empty.jpg` | 听写/讣告氛围 | 空奠厅 |
| `img/libu-closed.jpg` | 礼簿 | 合上的账本 |
| `img/iron-box.jpg` | 钱箱页 | 铁盒与空白信封 |
| `img/gov-board.jpg` | 村委 | 空白红栏 |
| `img/hosp-corridor.jpg` | 医院 | 空走廊，门牌不可读 |
| `img/cassette.jpg` | 磁带柜 | 空白标签盒带 |
| `img/shop-night.jpg` | 槐记 | 半落闸门面 |
| `img/bus-stop.jpg` | 客运 | 雾里招呼站 |
| `img/tuner-glow.jpg` | 频点 | 虚焦刻度 |

## 反 AI 感

页脚各站自写一句，互不粘贴。共享导航只用极短字，避免连续二十四字进三页。win7 皮补滚动，避免 `overflow:hidden` 吃正文。
