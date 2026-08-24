# 金罂同名　皮肤合同

只用 `html-game-puzzle/references/web-skins` 的 skin_id。一所有者一皮。假官网不用 intro-manual。

| source_id | 所有者 | skin_id | 文件 |
|---|---|---|---|
| src-intro | 金罂堂班组（班前纸，唯一说明书脸） | `intro-manual` | `introduction.html` |
| src-desk | 金罂堂夜班机 | `service-cyan-desk` | `desk/*.html` |
| src-gov | 西河乡迁坟办事栏 | `gov-redbar` | `gov/*.html` |
| src-zupu | 桐溪林氏谱牒扫描室 | `archive-simsun` | `zupu/*.html` |
| src-news | 桐溪晚报资料间 | `news-portal-163` | `news/*.html` |
| src-search | 值班机联查中转 | `search-and-forbidden` | `search-results.html` |

六套皮，内容来源四套：后台青台 / 公告红头 / 宋体谱牒 / 门户旧报。检索中转另脸。班前纸不进站内导航。

## 色与结构（不得串皮）

- 班前纸：灰底白卡片，无查档框。  
- 夜班机：浅青底、青标题、黑分区钮、顶栏查档。  
- 乡栏：红头、宋体 12px、双栏 table，不用 Grid。  
- 谱牒：灰底白卷、宋体缩进、点线元数据、红戳。  
- 旧报：红头条、960 float、右栏排行。  
- 中转：橄榄机壳 + 540 针打米黄纸 + 顶栏机名，离开浅青值班台；未开放档黑底红双线、栏宽 440。

顶栏 Logo 色不走完全程。查档框可常驻，按钮体系随皮。

## 图

- `img/intro-hall-night.png`：班前纸头图，夜厅灯，无可读字、无台标、无日期。  
- 格位抄件、红头、谱页用 CSS 表格与戳，不放名单照片，避免生图写错字。

## 反 AI 感

不做全站圆角白卡片、紫渐变、Inter 正文、统一页脚署名条。页脚各站自写一句，互不粘贴。
