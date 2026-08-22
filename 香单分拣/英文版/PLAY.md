# PLAY　专章 A

梯度：A 类沉浸模拟（The Operator）。信息推送，不搜隐藏页。权威恒为 recommend。

一句话循环：申请弹进队列 → 打开该单 → 附件被推到栏里 → 放行 / 暂扣 / 改桌并写建议。

开局三十秒：引言交代裘石、中元前夜、不见客；值班台同屏给队列、第一封已在、推送栏、系统钟。首个可点目标就是队列里那封何家单。

流水线不许跳号。下一封只在上一封提交之后弹入。

## 站点地图

| 页 | N/40 | 所有者 | 皮 | 暴露 |
|---|---|---|---|---|
| introduction.html | 1 | 班前说明书 | intro-manual | 身份、不见客、进值班台 |
| desk.html | 2 | 福泽代办后台 | service-cyan-desk | 队列、推送栏、钟、便笺 |
| shift-note.html | 3 | 同上 | service-cyan-desk | 屈南白板：三桌分开 |
| desk-help.html | 4 | 同上 | service-cyan-desk | 放行/暂扣/改桌含义，无机制词 |
| im-mi.html | 5 | 同上 | service-cyan-desk | 米穗「别瞎过」 |
| ticket-he.html | 6 | 同上 | service-cyan-desk | 何家家祭；教学放行 |
| ticket-he-old.html | 7 | 同上 | service-cyan-desk | 何家去年回执 |
| shop-rule.html | 8 | 同上 | service-cyan-desk | 正祀/孤魂/供灯分桌 |
| ticket-burn.html | 9 | 同上 | service-cyan-desk | 巷口烧衣 |
| ban-burn.html | 10 | 湄湾城管公示 | gov-redbar | 南门巷禁烧 |
| ban-faq.html | 11 | 同上 | gov-redbar | 指定点，不是香铺能批 |
| ticket-yulan.html | 12 | 福泽代办后台 | service-cyan-desk | 广慈寺供灯 |
| gongde.html | 13 | 广慈寺网上功德 | shop-local-2010s | 灯号、芳名入口 |
| gongde-zheng.html | 14 | 同上 | shop-local-2010s | 正祀芳名无守成 |
| temple-hours.html | 15 | 同上 | shop-local-2010s | 供灯≠入龛 |
| ticket-ji.html | 16 | 福泽代办后台 | service-cyan-desk | 钩子单 |
| gongde-solitary.html | 17 | 广慈寺网上功德 | shop-local-2010s | 守成在无主位 |
| ledger.html | 18 | 福泽代办后台 | service-cyan-desk | 底账目录 |
| ledger-ji.html | 19 | 同上 | service-cyan-desk | 伯元六月十九，守成不入龛 |
| tongxiang.html | 20 | 湄湾潮籍同乡会 | corp-table-2005 | 会务、孤衣 |
| tongxiang-list.html | 21 | 同上 | corp-table-2005 | 守成客死无嗣 |
| tongxiang-notice.html | 22 | 同上 | corp-table-2005 | 盂兰通知，不改祖龛 |
| handover.html | 23 | 霍麦停更日志 | blog-personal-2008 | 去年改桌 |
| handover-old.html | 24 | 同上 | blog-personal-2008 | 更早一篇，提到守成 |
| im-kai.html | 25 | 福泽代办后台 | service-cyan-desk | 开平电话摘记 |
| folk-archive.html | 26 | 湄湾民俗馆摘抄 | archive-simsun | 分桌习惯，limits |
| folk-yuan.html | 27 | 同上 | archive-simsun | 中元/盂兰条目 |
| paper-list.html | 28 | 南门分类信息 | classified-yellow | 纸扎对账入口 |
| paper-cancel.html | 29 | 同上 | classified-yellow | 孤衣取消（暗线） |
| paper-note.html | 30 | 同上 | classified-yellow | 蓝秋荻算料 |
| ticket-guest.html | 31 | 福泽代办后台 | service-cyan-desk | 同乡会孤衣代办 |
| ticket-lamp.html | 32 | 同上 | service-cyan-desk | 河灯 |
| ban-river.html | 33 | 湄湾城管公示 | gov-redbar | 河堤禁放段 |
| ban-alley.html | 34 | 同上 | gov-redbar | 巷口点位说明 |
| folklore-lamp.html | 35 | 湄湾夜读 | wechat-mp-article | 河灯稿，俗信 limits |
| ticket-wed.html | 36 | 福泽代办后台 | service-cyan-desk | 七月办酒咨询 |
| folklore-july.html | 37 | 湄湾夜读 | wechat-mp-article | 七月俗信，不是法律 |
| night-log.html | 38 | 福泽代办后台 | service-cyan-desk | 当班流水 |
| search-closed.html | 39 | 夜间检索残页 | search-and-forbidden | 全文检索已关 |
| result.html | 40 | 福泽代办后台 | service-cyan-desk | 当班回执 |

皮上若残留检索框，一律提交到 search-closed.html，不开启隐藏页。

## Token DAG（无环）

初始：`token-shift`（值班台在屏上，何家单已在队列）。

```
token-shift → desk / shift-note / desk-help / im-mi / night-log / ticket-he
打开 he → ticket-he-old / shop-rule
提交 he → token-he-done → ticket-burn
打开 burn → ban-burn / ban-faq / ban-alley
提交 burn → token-burn-done → ticket-yulan
打开 yulan → gongde / gongde-zheng / temple-hours
提交 yulan → token-yulan-done → ticket-ji
打开 ji → gongde-solitary / ledger / ledger-ji / tongxiang / tongxiang-list / tongxiang-notice / handover / handover-old / im-kai / folk-archive / paper-list
打开 folk-archive → folk-yuan
打开 paper-list → paper-cancel / paper-note
提交 ji → token-ji-done → ticket-guest / ticket-lamp / ticket-wed（仍按序弹：guest→lamp→wed）
打开 guest →（名录已在，可回看）
提交 guest → ticket-lamp
打开 lamp → ban-river / folklore-lamp
提交 lamp → ticket-wed
打开 wed → folklore-july
提交 wed → token-queue-empty → 可交回执
钟 ≥ 05:30 且 ji 未提交 → late
```

无悬空输入。地方号与民俗馆不产处置字段。纸扎暗线不挡交回执。

## 逐题五步

### T1 何家家祭
看到：队列第一封，亡父何立山，桌次正祀，忌日对。能做：放行、桌次正祀。映射：齐整家祭该走正祀。触发：推送去年回执与分桌说明，弹烧衣单。错：暂扣也能过关，回执会记一笔「齐单被扣」。

### T2 巷口烧衣
看到：严秋禾要代办南门巷烧衣。能做：打开推送的禁烧通告，暂扣、不接桌。映射：禁烧路段本店不代。触发：弹供灯单。错：放行则回执记「巷口仍可能被抄」。

### T3 供灯
看到：童霜续灯。能做：对照芳名与须知，放行、桌次供灯。映射：供灯不是入龛。触发：弹纪单。错：改成正祀，回执记混桌。

### T4 纪晚秋（钩子）
看到：先考纪守成、祖龛正祀、七月十二。能做：读推送的孤魂席、客死名录、底账、霍麦日志、开平摘记；暂扣并改桌孤魂席；建议写伯元六月十九或不入龛。映射：孤魂不能进这房祖龛。触发：弹后续三封。错：放行正祀走 pass；只扣不改桌走 hold。

### T5 同乡会孤衣
看到：会里自己来办守成孤衣。能做：放行、孤魂席。映射：会里认他是无嗣。错：改成正祀与底账打架。

### T6 河灯
看到：点位写河堤东段。能做：对照禁放段，暂扣。映射：点位不在允许段。错：放行则回执记河道。

### T7 七月办酒
看到：巢晚晴问能不能办酒席。能做：暂扣、不接桌。映射：不是本店桌次，七月婚嫁是俗信不是法律，本店也不承办。错：放行则屈南早上記「接了不该接的咨询」。

## 正确分拣（给收工报告用，不上屏）

1. 引言进值班台。
2. 何家：放行 / 正祀。
3. 烧衣：暂扣 / 不接桌。
4. 供灯：放行 / 供灯。
5. 纪单：打开读孤魂席、名录、底账、霍麦、开平摘记 → 暂扣 / 孤魂席，建议写守成不入龛、正祀仍是伯元、忌日六月十九。
6. 孤衣：放行 / 孤魂席。
7. 河灯：暂扣 / 不接桌或供灯皆可，以暂扣为准。
8. 办酒：暂扣 / 不接桌。
9. 交当班回执。

## 四级提示（屈南便笺，不替提交）

1. 先看弹进来的第一封，附件自己会跟过来。
2. 何家那封是齐的。烧衣那封要对照街上还能不能烧。
3. 纪家那封别只看申请人填的桌，去看芳名和底账。
4. 守成走孤魂席，正祀那格仍是伯元，六月十九；晚秋那封暂扣并改桌。

前三档不写最终组合。第四档允许完整建议，仍由玩家按栏提交。

## 干扰与 limits

- 地方号七月文：俗信传播，不能当法律，不能当开鬼门步骤。
- 民俗馆摘抄：只能说明分桌习惯，不能代替本店底账。
- 纸扎取消：能证明晚秋不是手滑，不能证明祠堂已同意入龛。
- 全文检索残页：夜间关闭，不是隐藏门。
- 何家齐单：不能推广成「所有正祀都能放」。

## 失败恢复

错选不锁死。纪单提交后仍可在回执前从流水里看见自己写过什么，但不能改已提交栏。刷新保持 localStorage。便笺可翻。天亮未交纪单走 late，可清草稿重来。
