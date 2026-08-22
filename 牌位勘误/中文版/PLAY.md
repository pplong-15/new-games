# PLAY　牌位勘误

对标镇山契：多源核对 + 方案卡六栏 + 只提交建议。循环不是搜隐藏页，不是并排对照台。

开局 30 秒同屏：人=卫棠；事=今晚交临时纸位著录建议；工具=文书室台面与方案卡；首目标=进台面看灵位单第三行。

---

## 专章 A1　站点地图

| 所有者 | 皮 | 路径 | 暴露 | 界面 |
|---|---|---|---|---|
| 卫棠字条 | intro-manual | `introduction.html` | 工号卫-0821、今晚交卡、首目标台面 | 灰说明书，无站内检索 |
| 文书室系统 | service-cyan-desk | `desk/*` | 灵位单、交接、留条、方案卡、回单 | 浅青后台 |
| 沥江殡仪馆对外 | shop-local-2010s | `index.html` `public/*` | 套餐、安位、生位另窗、只印不点 | 米色小站 |
| 沥江晚报 | news-portal-163 | `paper/*` | 守椿讣告、禾生领奖、江纫更正、姚宅短讣 | 红头门户 |
| 翟氏宗亲会 | corp-table-2005 | `clan/*` | 名录、昭穆、生位、传真、冬至纪要 | 表格企业站 |
| 县图家礼 | archive-simsun | `archive/*` | 神主、点主、配氏 | 宋体卷宗 |
| 沥江地方帖 | tieba-floors | `forum/*` | 晚香楼、祁蔓回、纸扎店噪 | 楼层帖 |
| 文书室邮箱 | mail-web-2010 | `mail/*` | 蒲函、霍勉旧草稿 | 三栏邮箱 |
| 县殡葬公示 | gov-redbar | `gov/*` | 委托单摘要、一九九九通报 | 红头信息站 |

站内查找只在本所有者页里跳转（台面点灵位号、晚报点标题）。不设灰栏目搜隐藏页，不用 `search-and-forbidden`。

---

## 专章 A2　token DAG

```
token-job-id (引言)
    └─► P-login → token-in
token-task / token-first (引言) ─► 打开 desk/home
token-in ─► P-list → token-face-hesheng, token-face-yao, token-face-tong, token-face-tan
token-face-hesheng ─► P-slip-zhai
desk/handoff → token-huo-print
desk/note → token-wanxiang-note
gov/weituo → token-dead-shouchun, token-host-hesheng
paper/obit-zhai → token-obit-shouchun
paper/live-hesheng → token-hesheng-award
paper/corr-jiang → token-jiang-corr
clan/minglu → token-minglu-alive
clan/zhaomu → token-east-zhao
clan/shengwei → token-shengwei-rule
clan/fax → token-fax-occupy
archive/* → token-dianzh-limit, token-peishi-rule
forum/* → token-wanxiang-post, token-qiman-template
mail/from-pu → token-mail-fax（加固 fax，非新条件）
mail/from-huo, gov/tongbao1999 → token-huo-1999（暗线，非必持）

方案卡六栏提交（choice）
  输入：上列主线 token 已能在页上读到（不强制本地标记，卡页可随时开；错选走对应回单）
  产出：end-hold | end-print | end-half | end-over
```

无环。无悬空输入。暗线不挡 hold。登录工号写在引言，不藏。

---

## 专章 A3　逐题五步

### P-login　credential（送）

- 看到：登录箱，工号栏。
- 能做：填卫-0821 或点「条子上的工号」。
- 映射：临工今晚能进台。
- 触发：进 `desk/home.html`。
- 错：空提交留在登录，红字「工号在更衣柜纸条」。

### P-list　browse（送）

- 看到：六行灵位表，第三行翟禾生。
- 能做：点各行详页。
- 映射：钩子在第三行。
- 触发：持有牌面 token。
- 错：无。表上每行都进得去。

### P-slip-zhai　field-match

- 看到：先考翟公禾生，配江纫氏，东昭。
- 能做：对照姚/佟/谭、交接、留条。
- 映射：牌面≠委托单。
- 触发：知道冲突在讳与配氏。
- 错：把佟三喜当主案（limits：外姓另一户）。

### P-sources　provenance / field-match（中段）

- 看到：讣告亡者守椿、领奖稿禾生在世、名录在世、传真生位占东昭、家礼未点主不成主。
- 能做：沿台面书签打开，回卡。
- 映射：第二层——不是手滑，是生位进错窗。
- 触发：六栏有唯一近答案可排。
- 错：主件勾传真（承认生位能定丧期牌）。

### P-card　choice（硬）

- 看到：六栏下拉。
- 能做：交建议。
- 映射：抉择一讳、抉择二权限。
- 触发：四回单之一。
- 错：见结局表。近答案均有独立回单，不笼统通过。

---

## 专章 A4　方案卡六栏

| 栏 | 正确 | 近答案干扰 |
|---|---|---|
| 讳 | 翟守椿 | 翟禾生（打印件）；姚炳川（干净户并案） |
| 配氏 | 孟秋萍·注在世　或　今晚不写入 | 江纫；孟秋萍写成双亡 |
| 龛位 | 东昭属亡者，生位不得占 | 生位继续占东昭；改去西穆了事 |
| 在世或已故 | 牌面翟禾生为在世 | 按打印件勾已故；存疑空着 |
| 主件 | 委托单与讣告 | 打印件本身；宗亲会生位传真；地方帖 |
| 权限限度 | 只建议著录，不挪牌，不代点主 | 批准撤牌；代点主；直接改打印件 |

判定（与 `js/engine.js` 对齐）：

- `over`：权限 ≠ recommend
- `hold`：六栏皆正
- `half`：权限为建议，且（讳正而在世栏仍勾已故）或（讳仍禾生而配氏已改）
- `print`：其余（含主件勾打印件/传真）

---

## 专章 A5　四级提示（`desk/memo.html` 夜班备忘）

只指方向，不替提交。第 4 档才写齐六栏。

1. 方向：第三块牌上的人和委托单上的亡者，先对是不是同一个。
2. 范围：晚报地方版、名录「在世」栏，能对人还在不在；配氏看热线更正。
3. 操作：宗亲会传真和生位页说明这张纸从哪条窗口进来；主件不要勾那张传真。
4. 全答：讳翟守椿；配氏孟秋萍注在世或今晚不写；龛东昭属亡者；禾生在世；主件委托单+讣告；只建议。

---

## 专章 A6　limits（页上用站内说法）

| source | 能对上 | 不能推出 |
|---|---|---|
| 灵位单 | 今晚打印件写了谁 | 人是否已故 |
| 委托单摘要 | 馆方受理的亡者/丧主 | 坟里躺着谁 |
| 讣告 | 见报写法 | 现场目击 |
| 领奖稿 | 十八日稿把禾生写成在职 | 今夜人是否仍在粮库 |
| 名录 | 会内登记在世 | 户口法定状态 |
| 生位页/传真 | 蒲敬山要预留东昭 | 预留有没有法律效力 |
| 家礼影印 | 馆藏抄件怎么写 | 成主、法令 |
| 地方帖 | 晚香、祁蔓怎么说 | 谁说谎 |
| 一九九九通报 | 馆里出过生位混排 | 霍勉今夜的动机铁证（暗线） |

---

## 专章 A7　烟雾弹

- 佟三喜外姓入东昭旁格：真错，不是本钩。
- 谭淑慈超期纸位：人故，只是该换木主。
- 姚炳川：干净对照，勿并案。
- 「按打印件著录」：霍勉的怕，不是正确主件。
- 生位传真：真相来源之一，不能当丧期牌主件。

---

## 新手不迷路

1. 引言同屏给人、事、工具、进台面。
2. 每站页脚或正文末埋下一处可点（讣告→领奖稿→名录→传真→卡）。
3. 登录对/错有红字；交卡进对应回单。
4. 进度用六行灵位和一张卡，不用仪表盘。
5. 前步送工号与第三行，中段才对生位窗口。

---

## 匹配度自检

- [x] 点主/安位/昭穆/生位都落成可提取字段或规则页
- [x] 每步能说对应故事哪一句
- [x] DAG 无环、无悬空
- [x] 离线闭环
- [x] 开局三问能答
