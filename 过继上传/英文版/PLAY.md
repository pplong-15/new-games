# PLAY　专章 A

梯度：A 类沉浸模拟（Orwell）。权威恒为 upload / recommend。无搜索开隐藏页。

一句话循环：打开来源 → 把字段摘进上传台 → 每栏只勾一版上传 → 回访提纲按你传的拼。

开局三十秒：引言交代卞梁与二十二点；值班台同屏给工单、钟、上传台、采集目录。首个可点目标写在工单里：先打开户政查阅。

签发仍要至少三栏。截止仍是 22:00。五栏 id 未改。

## 站点地图

| 页 | 所有者 | 皮 | 暴露 |
|---|---|---|---|
| introduction.html | 说明书（唯一） | intro-manual | 身份、截止、进值班台 |
| desk.html | 槐荫街道综治平台 | service-cyan-desk | 工单、钟、上传台、分组目录、签发 |
| hukou.html | 浦阳县户政查阅 | gov-redbar | 在册、无嗣子、无迁入、协查摘要、拒变更摘要 |
| hukou-refuse.html | 同上 | gov-redbar | 五月二十日对照拒件全文；可摘 when-hukou |
| hukou-channel.html | 同上 | gov-redbar | 渠沿路九号仍在该户；可摘 live-hukou |
| hukou-death.html | 同上 | gov-redbar | 五月二十二注销、改主、在册女儿；可摘 heir-hukou |
| office.html | 同上 | gov-redbar | 叫号 0520-14、告知单；不产块 |
| sishu.html | 耿氏文书托管 | archive-simsun | 小满、命继、画押、应入嗣房 |
| sishu-zhongren.html | 同上 | archive-simsun | 中人=伯川+守礼，代书叠中人；可摘 consent-sishu |
| sishu-ink.html | 同上 | archive-simsun | 指上烟灰混墨、烧纸桌；不产块 |
| zupu.html | 江左谱牒数字化 | corp-table-2005 | 七月二十八补录、待核、兼祧未立约 |
| zupu-catalog.html | 同上 | corp-table-2005 | 守仁条待核、女口凡例链；不产块 |
| zupu-nvkou.html | 同上 | corp-table-2005 | 女口不录=合同≠户籍；不产块 |
| zupu-pending.html | 同上 | corp-table-2005 | 铅笔反拿、待核；可产 heir-zupu / when-zupu |
| neighbor.html | 槐荫民情通 | classified-yellow | 晚禾开门、代按、量院子摘要 |
| neighbor-tape.html | 同上 | classified-yellow | 卷尺量后院那间；可产 kind-measure |
| neighbor-cat.html | 同上 | classified-yellow | 找猫噪声。limits：不能证十七号 |
| neighbor-water.html | 同上 | classified-yellow | 南埠停水噪声。limits：另一加压泵 |
| neighbor-cover.html | 同上 | classified-yellow | 三号井盖。limits：铁响≠卷尺 |
| letter-list.html | 网格网页信箱 | mail-web-2010 | 四封列表。读素秋才开旧址 |
| letter.html | 同上 | mail-web-2010 | 按成收据、后院份额、绿色主页；visit=letter |
| letter-receipt.html | 同上 | mail-web-2010 | 自动回执。不产块 |
| letter-spam.html | 同上 | mail-web-2010 | 保健品垃圾。不产块 |
| letter-youguang.html | 同上 | mail-web-2010 | 只看栏齐，不看你信谁。不产块 |
| wanhe.html | 晚禾旧空间 | qzone-modules | 侍奉未入册（须先读来信） |
| wanhe-msg.html | 同上 | qzone-modules | 「在。别转发。」须先读信 |
| wanhe-photo.html | 同上 | qzone-modules | 七月空镜头，无五官。须先读信 |
| wanhe-mood.html | 同上 | qzone-modules | 女的不算／药罐／电费；可产 live-wanhe、加固 kind-care |
| policy.html | 槐荫政务公开栏 | gov-redbar | 只收摘要，不改户口、不裁份额 |
| help-fields.html | 综治平台帮助 | service-cyan-desk | 一栏一版、不可逆 |
| log.html | 综治平台 | service-cyan-desk | 八月上门被拒、听见卷尺。不产块 |
| phone-bochuan.html | 综治平台 | service-cyan-desk | 把人说成房。兼祧仍无钮 |
| subsidy.html | 浦阳县民生查阅 | gov-redbar | 照料补贴驳回，指向未入册。不产块 |
| history.html | 综治平台 | service-cyan-desk | 柳条巷姚户旧单。无摘钮，禁止串户 |
| jiedao-share.html | 综治平台 | service-cyan-desk | 本台不批产；可加固 kind-share |
| huifang.html | 综治平台 | service-cyan-desk | 提纲（签发后，跟勾选对齐） |
| result.html | 综治平台 | service-cyan-desk | 回执（随上传块变） |

## Token DAG（无环）

初始：`token-wo`（工单在屏上）。

```
token-wo → desk 目录 → hukou / sishu / zupu / neighbor / letter-list / policy / help / log / phone / subsidy / history / office / jiedao-share
hukou → hukou-refuse / hukou-channel / hukou-death / office
hukou-refuse → when-hukou
hukou-channel → live-hukou
hukou-death → heir-hukou
sishu → sishu-zhongren / sishu-ink
sishu-zhongren → consent-sishu
zupu → zupu-catalog / zupu-nvkou / zupu-pending
zupu-pending → heir-zupu / when-zupu
neighbor → neighbor-tape / cat / water / cover
neighbor-tape → kind-measure
token-wo 或 neighbor → letter-list → letter → consent-letter / kind-share / wanhe-link
desk 工单标题 → kind-order
jiedao-share → kind-share（加固）
wanhe-link → wanhe / wanhe-msg / wanhe-photo / wanhe-mood
wanhe → kind-care
wanhe-mood → live-wanhe / kind-care
任一栏：已摘版本 → 勾选上传（不可逆）→ uploaded-field
三栏已传 → 签发 → ending
钟 ≥ 二十二点 且 未齐三栏 → timeout
```

无悬空输入。兼祧、自动回执、垃圾信、旧工单、叫号存根不产块。邻巷姚户字段不能写入本单。

新块进入旧结局键：

- heir-zupu 视同纸面嗣子（与 heir-sishu 一样可走 paper / clash）
- kind-measure 视同份额归类（与 kind-share 一样可走 share）
- live-wanhe 视同仍住十七号（与 live-neighbor 一样可走 care / clash）

## 逐题五步

### H1 读户政
看到：红头查阅页，十七号在册表。能做：把「无嗣子／无迁入／渠沿路」摘走；下到拒件、协查、注销全文。映射：孩子没进这户。触发：上传台出现户政块。错：不摘就走，台子仍空，但别页仍开。

### H2 读红纸
看到：宋体抄件，命继、小满、中人。能做：摘嗣子、时点、画押、应入嗣房；下到中人栏、指墨旁注。映射：纸面手续。触发：与户政对打。错：把抄件当成已迁户。

### H3 读谱摘
看到：企业站表格，七月补录、待核。能做：摘谱上补录；下到目录、凡例、匡缮手记（可另摘「谱上已写小满」）。映射：名字是修谱年补的。错：把兼祧当可传项（没有钮）；把公司凡例当户籍。

### H4 读民情通
看到：黄页里谭婶长帖与续帖。能做：摘晚禾开门、代按；续帖摘卷尺量的是后院。映射：住的人、按印的人、争的是屋。找猫／停水／井盖是噪声。

### H5 读来信
看到：信箱列表与素秋一封。能做：摘按成收据、后院份额；得到旧空间地址。映射：她以为自己签的是丧事回单。触发：打开 wanhe。回执／垃圾／尤广不产块。

### H6 旧空间（非必走）
看到：绿条模块墙。能做：摘侍奉未入册；说说可摘「仍住这边」。映射：女口空白、人还在。错：没读信就来，各子页挡着。

### H7 勾选上传
看到：值班台五栏。能做：每栏选一版，上传此栏。映射：你替街道选定今晚的事实。触发：该栏锁死，提纲预览变。错：栏未摘就想传，系统拒收。

### H8 签发
看到：三栏齐或已过二十二点。能做：建议回访口径并签发。映射：车按提纲走。触发：huifang → result。错：未齐且未到点，钮不走。

## 解锁

不靠刷新楼层。靠：到过的页、已摘的块、已锁的栏。晚禾主页与子页都靠来信（`visit("letter")`）。提纲页靠签发。旧工单无摘钮。

## 四级提示（便笺，不替勾选）

1. 先把户政和红纸对着看，别急着把工单标题直接传上去。
2. 一栏只能留一版。户口没有的人，红纸上可能写着。
3. 素秋不在公开栏，在网格信箱。女儿那页要信里点到才打得开。
4. 三栏齐才能签发。嗣子填了小满，又写从未迁入，提纲会自己顶牛。

## limits（证据能证明什么）

| 源 | 能 | 不能 |
|---|---|---|
| 户政／拒件／协查／注销／叫号 | 当时在册、迁入空、拒变更、人在渠沿、改主 | 不能证明红纸伪造；叫号存根姓名栏空 |
| 嗣书抄件／中人／指墨 | 纸上写过谁、哪一天、指上有墨、烧纸桌同案 | 不能证明迁户完成；不能鉴定按的是哪一张 |
| 谱摘／目录／凡例／手记 | 七月补过一行、女口按合同不录 | 公司规则≠户籍；不能证明委托人说实话 |
| 民情通正帖／续帖 | 谭婶愿意写下的隔墙见闻、尺子量哪间 | 不能当目击笔录 |
| 找猫／停水／井盖 | 近答案噪声、教人别串巷 | 不能证明十七号谁住、谁量 |
| 来信 | 素秋此刻的说法 | 不能还原灵堂每一分钟 |
| 回执／垃圾／尤广 | 栏数规则、机器无立场 | 不能当本户陈述 |
| 旧空间／留言／相册／说说 | 她自己留下的牢骚与空镜 | 不能证明补贴程序合法或非法 |
| 补贴驳回 | 去年同住关系写不清 | 不能单独证明她现在仍住 |
| 上门日志／来电转写 | 被拒、听见收齿、把人说成房 | 不能当迁户证明 |
| 旧工单枣-083 | 邻巷滴水已结、禁止串户 | 不能把檐长带进本单 |
| 受理须知／栏位说明／份额说明 | 本岗只收摘要、一栏一版、不批产 | 不能代替任何一户陈述 |
| 工单 | 系统派了什么标题 | 不能证明标题等于事实 |

## 烟雾弹

- 兼祧口头备注：无钮。
- 民情通找猫、停水、井盖：不产块，limits 写在页上。
- 信箱回执、垃圾、尤广内部：不产块。
- 柳条巷姚户旧单：无摘钮。
- 工单默认「过继抚养」：可传，但是先信解释。

## 新手五原则对照

1. 人+任务+工具+首目标同屏：desk。
2. 链状：户政拒件 → 嗣书中人／指墨 → 谱摘凡例／手记 → 民情续帖／信箱 → 旧空间子页。
3. 摘中有提示条；上传锁栏；错有拒收句。
4. 进度用「已上传 n 栏／截止前建议至少三栏」，不写关卡分数。
5. 前步：工单写明先开户政；中段才要对打五栏。

## 匹配度自检

- 民俗核嗣书／核谱／核继承都变成可摘块或 limits。
- 每步能说清对应时间线哪一句。
- DAG 无环、无悬空。
- 离线闭环。
- 开局能答：我是卞梁；二十二点前上传；传出去回访按这个问。
