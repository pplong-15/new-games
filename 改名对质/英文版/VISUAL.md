# 改名对质　皮肤合同

只用 `html-game-puzzle/references/web-skins` 的 skin_id。一所有者一皮。假官网不用 intro-manual。

| source_id | 所有者 | skin_id | 文件 |
|---|---|---|---|
| src-intro | 户政人事（班前纸，唯一说明书脸） | `intro-manual` | `introduction.html` |
| src-desk | 埠南县户政夜窗 | `service-cyan-desk` | `chuang/*.html` |
| src-shu | 青瓦庵移交柜 / 缪守匣 | `archive-simsun` | `shu/*.html` |
| src-pu | 南街民间谱局 | `corp-table-2005` | `pu/*.html` |
| src-zhi | 窗口公开须知 | `gov-redbar` | `zhi/*.html` |
| src-mail | 夜窗旧邮箱 | `mail-web-2010` | `you/*.html` |
| src-blog | 屈晚禾旧页 | `blog-personal-2008` | `kou/*.html` |
| src-qa | 埠南问答栏 | `baidu-zhidao` | `wen/*.html` |
| src-closed | 日班机 / 越权 | `search-and-forbidden` | `guan.html` `jin.html` |

九套皮。引言 / 青台 / 宋体卷 / 企业表 / 红头 / 邮箱 / 博客 / 问答 / 关闭，互不撞色。

## 色与结构（不得串皮）

- 班前纸：灰底白卡片，无联查框，无站内导航。  
- 夜窗：浅青底、青标题、黑分区钮。对质台是左右两栏，不是对照整页表。  
- 附属柜：灰底白卷、宋体缩进、点线元数据、红戳。  
- 谱局：778 表格居中、宋体 12、左栏栏目。  
- 须知：红头、宋体、双栏 table。不要国徽。  
- 邮箱：顶栏 + 三栏文件夹。  
- 博客：双栏日志，橙/灰旧个人站。  
- 问答：问/答块，最佳答案条。  
- 关闭：灰结果盒；禁止：黑底红字。

顶栏 Logo 色不走完全程。夜窗不把搜一词当主循环。其它皮上若残留框，提交进关闭页。

## 静帧合同

三色锚：主 #e0f7fa 夜窗页底 / 次 #d7c49a 可收句纸 / 强调 #155e75 待对质左边杠（不绑情绪）。红头脏红只属于须知所有者与禁页。  
材质：2010 年前后县级站 JPEG，略糊。

| 文件 | 媒介 | 嵌在 | 状态 |
|---|---|---|---|
| `img/ye-chuang.jpg` | 夜里空窗玻璃 | 班前纸 | 人在玻璃外，灯在里 |
| `img/dang-he.jpg` | 木档案盒 | 附属柜 | 纸边黄，字不可读 |
| `img/ting-xiang.jpg` | 熄了的香脚 | 停香页 | 接待停了，无牌 |
| `img/pu-ce.jpg` | 合上的谱册 | 谱局 | 布面，无字 |
| `img/hong-tiao.jpg` | 红纸折痕 | 须知 | 印糊掉，不承担字段 |
| `img/you-xiang.jpg` | 旧屏反光 | 邮箱 | 无界面字 |
| `img/tai-deng.jpg` | 台灯和空白纸 | 夜窗 | 班还在 |
| `img/bian-tiao.jpg` | 玻璃上黄纸条 | 班长条 | 字朝里或糊 |

图内不要可读汉字、拉丁文、门牌、日期台标、人脸特写。名单和栏用 HTML 写，不放进图。

## 反 AI 感

不做全站圆角白卡片、紫渐变、Inter 正文、统一页脚署名条。页脚各站自写一句，互不粘贴。对质台不要画成逆转法庭立绘。
