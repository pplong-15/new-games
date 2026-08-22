# GATE B　开发验收

## 数据与 DAG

存档键 `qingming-sanmen-v1`。`js/sanmen.js`：`opened` 每班最多 3；`handover` 清 opened，保留 seen / verified。串穴采信前置：`code-martyr` ∧ `deliver-12`。备注四栏成组。

判定：
- 处置 change/pass → `overbook`
- 性质 ghost → `ghost`
- 串穴核销 + 烈士园集体 + 十二区私坟 + 只备注，且四枚 verified → `note`
- 其余 → `thin`（回柜，不清白板）

`node --check js/sanmen.js` 通过。内联脚本块 `--check` 通过。代码轨：三户拦住第四户；交班清 opened 留 verified；第二班才能采信串穴；四结局各走一次。

## 可点对照

- 引言同屏：杭疏、三扇门、钟、白板；最左投诉几乎送。
- 第一扇可采信邻界有灰。
- 户档私坟 / 码页烈集-〇四〇五-二粮 / 回执十二区三十七穴 / 流水一码两记。
- 考勤空格与顾晚禾留言抢同一天（第二层，不改收口栏）。
- 传说帖可采信，不能当正确性质。
- 寒食旧单可选，不挡 `note`。
- 装饰检索不承担一词开页。假入口 `javascript:void(0)`。

## 皮肤合同

intro-manual、service-cyan-desk、gov-redbar、corp-table-2005、archive-simsun，另加 mail-web-2010、classified-yellow、wechat-mp-article、discuz-board、shop-local-2010s。CSS 从 web-skins 抄入本局 `css/`。

## 文案与体量

dupcheck：html 47，hanzi ≥10000，dup40 0，trip24 0。屏上机制词 grep 空。图 8 张 unique md5。无 extra_copy。

## 结论　PASS（可进试玩）

红线未动：收口 `note` 四栏；ghost / overbook 分道；seen ≠ verified；每班三户；不写真烈士、不写踏坟步骤；权威 recommend。
