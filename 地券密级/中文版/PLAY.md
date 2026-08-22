# PLAY　专章 A

梯度：A 类沉浸模拟（Need to Know）。权威恒为 recommend。无搜索开隐藏页。无上传台。

一句话循环：用页上已写的工牌进不同密级目录 → 对同一档号的时间、钱主、四至、中保、亡者 → 交查阅备注。

开局三十秒：引言交代岑禾、明早例会、抽屉两张牌；公开目录无需登入，首个可点目标是档号 047。内部、限制的工号口令写在交接本和邮件里，不写在灰栏目，不靠搜第一词。

## 站点地图

| 页 | 所有者 | 皮 | 暴露 |
|---|---|---|---|
| introduction.html | 班前说明书 | intro-manual | 身份、047、祖父南岭冬月、进公开网 |
| public/index.html | 安浦县档案馆信息公开 | archive-simsun | 馆讯、链到目录/须知 |
| public/catalog.html | 同上 | archive-simsun | 047 / 012 两条 |
| public/deed-047.html | 同上 | archive-simsun | 公开五字段，可写入草稿 |
| public/deed-012.html | 同上 | archive-simsun | 另一张券。limits：不能写入 047 |
| public/rules.html | 同上 | archive-simsun | 开放查阅，不外借原件 |
| public/hours.html | 同上 | archive-simsun | 夜班只开电子目录 |
| public/exhibit.html | 同上 | archive-simsun | 2016 展陈用公开层 |
| public/faq.html | 同上 | archive-simsun | 噪声问答复印 |
| desk/login.html | 数字化室 | service-cyan-desk | 内部登入 QP-夜-04 / nanshan047 |
| desk/lock.html | 同上 | service-cyan-desk | 限制登入 QT-密-07 / jiaojie083 |
| desk/home.html | 同上 | service-cyan-desk | 工单、三层入口、备注入口 |
| desk/shift.html | 同上 | service-cyan-desk | 交接本：两套口令、祖父一句 |
| desk/internal-047.html | 同上 | service-cyan-desk | 内部五字段 |
| desk/memo.html | 同上 | service-cyan-desk | 2019 分拣、亡者栏后改 |
| desk/restricted-047.html | 同上 | service-cyan-desk | 限制五字段（须密级会话） |
| desk/log.html | 同上 | service-cyan-desk | 申敬之 2018 分柜 |
| desk/note.html | 同上 | service-cyan-desk | 五栏备注、提交 |
| desk/hint.html | 同上 | service-cyan-desk | 四级便笺，不替填写 |
| desk/denied.html | 同上 | service-cyan-desk | 未登入拦截 |
| desk/result.html | 同上 | service-cyan-desk | 回执随备注变 |
| gov/index.html | 安浦县文保所 | gov-redbar | 办事入口 |
| gov/request.html | 同上 | gov-redbar | 今晚申请、五栏、档号 |
| gov/view-rule.html | 同上 | gov-redbar | 不得对原件唯一认定 |
| gov/house.html | 同上 | gov-redbar | 1991 宅基地东至石阶 |
| gov/cemetery.html | 同上 | gov-redbar | 公墓证西坡，不写侯宅 |
| mail/login.html | 县政务邮箱 | mail-web-2010 | ye-anpu / chouti0819 |
| mail/inbox.html | 同上 | mail-web-2010 | 四封列表 |
| mail/qu.html | 同上 | mail-web-2010 | 密级牌与口令 |
| mail/zhai.html | 同上 | mail-web-2010 | 别只看公开层 |
| mail/spam.html | 同上 | mail-web-2010 | 扫描仪保养。不产块 |
| forum/list.html | 南岭乡谈 | tieba-floors | 帖列表 |
| forum/hou.html | 同上 | tieba-floors | 侯家说西坡旧界 |
| forum/ge.html | 同上 | tieba-floors | 葛秋萍问父亲（暗线） |
| forum/idle.html | 同上 | tieba-floors | 找羊。不产块 |
| news/index.html | 安浦晚报 | news-portal-163 | 旧闻入口 |
| news/expand.html | 同上 | news-portal-163 | 1991 公墓扩建 |
| news/show.html | 同上 | news-portal-163 | 2016 墓券展 |
| news/retire.html | 同上 | news-portal-163 | 申敬之退休 |
| baike/maidiquan.html | 安浦县百科 | baidu-baike | 五要项、干支或为套语 |
| baike/cen.html | 同上 | baidu-baike | 东溪岑守山 1962 |
| blog/shen.html | 申敬之旧博客 | sina-blog-orange | 柜外能挂、柜里不见人 |
| classified/hou.html | 安浦本地黄页 | classified-yellow | 侯启明寻人看旧界 |
| public/west.html | 信息公开 | archive-simsun | 西库无钥匙。不产块 |
| desk/scanlog.html | 数字化室 | service-cyan-desk | 稿台流水。不裁决字段 |
| baike/nanshan.html | 县百科 | baidu-baike | 西坡东岗分梁，东溪另乡 |
| news/canal.html | 晚报 | news-portal-163 | 渠浅噪声。不产块 |
| gov/meeting.html | 文保所 | gov-redbar | 例会只念交来的表 |

搜索框若出现在皮上，只作死控件（夜班未开通 / 只扫标题），不开启隐藏页。

## Token DAG（无环）

初始：`token-brief`（引言已读）。

```
token-brief → public/* 、 gov/* 、 desk/shift 、 desk/login 、 desk/home（备注台可见）
public/catalog → public/deed-047 → field-public-*
public/deed-012 → （死路，不产 047 块）
desk/shift → cred-internal 、 cred-mail 、 token-grandpa-nanling
gov/request → token-five-fields 、 token-047-id
gov/view-rule → token-no-unique
gov/house → token-house-east-step
baike/maidiquan → token-ganzhi-formula
baike/cen → token-cen-dongxi-1962
cred-internal + login QP-夜-04/nanshan047 → sess-internal
sess-internal → desk/internal-047 → field-internal-*
sess-internal → desk/memo → token-hou-east-hill 、 token-split-2019
mail/login ye-anpu/chouti0819 → sess-mail
sess-mail → mail/qu → cred-restrict
sess-mail → mail/zhai → token-dont-public-only
cred-restrict + login QT-密-07/jiaojie083 → sess-restrict
sess-restrict → desk/restricted-047 → field-restrict-*
sess-restrict → desk/log → token-shen-split
news/retire + blog/shen → 加固 token-shen-zhongbao（中保人选仍以券文为准）
classified/hou 、 forum/hou → 加固 token-house-worry
forum/ge → 暗线 token-ge-ask（不挡提交）
已见版本 → desk/note 勾选 → 提交
五栏齐 → ending
亡者唯一认定 → overclaim 退回（可改写）
```

无环。012、spam、idle、faq、hours 不产 047 块。邮箱口令写在交接本，不靠搜索。

## 逐题五步

### P1 读公开 047
看到：宋体目录与公开券文。能做：把五字段写入草稿。映射：展陈口径。触发：备注台出现公开版。错：把 012 写进 047。

### P2 读申请与宅基地
看到：红头申请要五栏；宅基地东至石阶。能做：对上公开东至。映射：侯启明要的是能住的那一版。错：把公墓证西坡当成侯宅后墙。

### P3 交接本登入内部
看到：工号 QP-夜-04、口令 nanshan047 写在本子上。能做：在数字化室登录页原样填。映射：凭证，不是搜词。触发：内部目录。错：猜口令、搜灰栏目。

### P4 对内部字段
看到：钱主侯万川、东至侯宅后墙、中保申敬之、亡者栏后改。能做：写入内部版。映射：第一层推翻。错：把备忘当成已迁葬批准。

### P5 邮件取密级牌
看到：值班邮箱账号口令在交接本；曲晚棠信写 QT-密-07 / jiaojie083。能做：先登邮箱再登限制层。映射：第二套凭证。错：未读信就盲填。

### P6 对限制字段与同名
看到：甲子、葛万川、岑守山、现住屋后墙。能做：对照百科套语、东溪 1962、祖父南岭 1983。映射：第二层推翻 + 误认排除。错：把东溪岑守山填进备注。

### P7 填备注
看到：五栏，只出现你到过的版本。能做：每栏选一版或选冲突另核。映射：你决定明早投影哪一句。错：空栏提交。

### P8 提交
看到：回执。能做：读系统收了哪一层。映射：建议不是批准。错：亡者唯一认定被退回。

## 解锁

不靠刷新楼层，不靠搜隐藏页。靠：到过的页、已写入的版本、两套登录会话。限制页无会话则进 denied。备注页始终可打开，但没看见的版本不出现选项。

## 四级提示（便笺，不写出具体口令）

1. 公开目录能先看。内部和限制都要牌，牌在抽屉和信里，不在检索框。
2. 先对钱主和四至。公开跟内部已经不是同一句。宅基地只对得上其中一版东至。
3. 限制层的牌在白班那封信。进了之后对亡者和时间写法。同名要另看村和年。
4. 备注只能建议。五栏都要有字。把亡者写成唯一认定会被退。

第 4 档仍不替勾选，不把口令抄进便笺。

## 烟雾弹 / 死路

- 安档-地券-1979-012：另一亡者，字段禁入 047。
- 邮箱扫描仪保养：无工号。
- 乡帖找羊、水渠：与四至无关。
- 公开 faq 复印收费：无字段。
- 东溪岑守山：同名排除。
- 百科钱数九千九百：套语，不能当价。

## limits（写进页脚或正文，不上元语言）

- 公开层只能证明展陈目录如此写，不能证明下葬现场。
- 内部备忘是馆员分拣，不能当迁葬批准。
- 限制层是原钞件转写，不能当唯一真券。
- 宅基地公告管住的是在世房屋，不管阴宅名分。
- 干支或为套语，不能在备注里改公历。
- 同名须按村、年排除。
- 查阅备注不能批准原件、不能开柜、不能教人重写券文。

## 新手不迷路

1. 同屏：岑禾、明早交备注、047、公开网链接。
2. 链状：公开 047 → 申请五栏 → 交接本工号 → 内部 → 邮件密级牌 → 限制 → 备注。
3. 登对进目录，登错留在登录页给一句「工号或口令不对」。
4. 进度用备注草稿「已写 N 项」，不写关卡比。
5. 前步送：档号、公开层、交接本口令都写在纸上。中段才要对三层。

## 匹配度自检

- [x] 民俗五要项都是可提取字段
- [x] 每步对应故事哪一句
- [x] DAG 无环、无悬空、047 与 012 不混
- [x] 离线闭环
- [x] 开局能答我是谁 / 现在干嘛 / 做了有啥用
