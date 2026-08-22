# 矿册定性　皮肤合同

只用 `html-game-puzzle/references/web-skins` 的 skin_id。一所有者一皮。假官网不用 intro-manual。

| source_id | 所有者 | skin_id | 文件 |
|---|---|---|---|
| src-intro | 县志办人事（临聘纸，唯一说明书脸） | `intro-manual` | `introduction.html` |
| src-desk | 工矿志复核台 | `service-cyan-desk` | `office/*.html` |
| src-anjian | 石岭县安监旧站 | `gov-redbar` | `anjian/*.html` |
| src-news | 石岭晚报资料间 | `news-portal-163` | `news/*.html` |
| src-temple | 西洼窑神庙管委会 | `corp-table-2005` | `temple/*.html` |
| src-union | 县总工会抚恤室 | `archive-simsun` | `union/*.html` |
| src-forum | 西洼矿工帖 | `discuz-board` | `forum/*.html` |
| src-museum | 石岭矿史馆词条 | `baidu-baike` | `museum/*.html` |
| src-mail | 矿办旧邮箱镜像 | `mail-web-2010` | `mail/*.html` |
| src-search | 复核台联查中转 | `search-and-forbidden` | `search-results.html` |

十套皮。引言 / 青台 / 红头 / 旧报 / 企业表 / 宋体卷 / 论坛 / 百科 / 邮箱 / 中转，互不撞色。

## 色与结构（不得串皮）

- 临聘纸：灰底白卡片，无联查框。  
- 复核台：浅青底、青标题、黑分区钮、顶栏联查。名册是后台表，不是关卡条。  
- 安监：红头、宋体 12px、双栏 table，不用 Grid。  
- 晚报：红头条、960 float、右栏排行。  
- 庙站：778 表格居中、宋体 12、左栏栏目。  
- 工会：灰底白卷、宋体缩进、点线元数据、红戳。  
- 论坛：蓝头表格、楼层。  
- 词条：信息框 + 目录。  
- 邮箱：顶栏 + 三栏文件夹。  
- 中转：灰结果盒；未开放档黑底红字。

顶栏 Logo 色不走完全程。联查框可常驻，按钮体系随皮。

## 静帧合同

三色锚：冷荧光青（复核台夜） / 煤灰褐（井口、灯房） / 香火脏红（庙，不作喜庆）。  
材质：2010 年左右县级站 JPEG，略糊，不追求干净。

| 文件 | 媒介 | 嵌在 | 状态 |
|---|---|---|---|
| `img/intro-desk.jpg` | 夜办公室空桌 | 临聘纸头图 | 缺席：人已走，灯还在 |
| `img/pithead.jpg` | 井口黄昏 | 安监 | 越界：架子在，牌子糊掉 |
| `img/incense.jpg` | 香炉烟 | 庙 | 名分：祭在，字不可读 |
| `img/lamps.jpg` | 矿灯架 | 论坛灯房帖 | 缺席：灯在架上或空位 |
| `img/radio.jpg` | 调度机 | 邮箱/地面 | 地面岗位的物件 |
| `img/folded.jpg` | 折起的假条 | 工会/邮箱 | 字朝里，不让图承担字段 |
| `img/booklet.jpg` | 合上的户口本 | 迁出卷 | 已迁的物件 |
| `img/papers.jpg` | 糊掉的旧报堆 | 晚报 | 口述流通，台标不可读 |
| `img/vent.jpg` | 巷道风机 | 安监通风 | 技术原因，无字 |

图内不要可读拉丁文、门牌、日期台标、人脸写实遗容。名单和日期用 HTML 表格写，不放进图。

## 反 AI 感

不做全站圆角白卡片、紫渐变、Inter 正文、统一页脚署名条。页脚各站自写一句，互不粘贴。
