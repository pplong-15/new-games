# 试玩报告　游戏5

日期：2026-08-22
目标渠道：自托管
会话类型：总结性
执行环境：Chrome headless / 1280×800、320×640、375×667 / 键鼠脚本；本地 `python3 -m http.server`（非 file://）
知识标记：AUTHOR_KNOWLEDGE（读过各局 data/engine；开局按界面点。真人陌生人样本 UNTESTED）

本文件夹三局：守七台账、路引缮写、空车夜班。同一套试玩 skill，同一次会话。

## 总表

| 游戏 | 入口 | 主类型 | 发给陌生人 | 主线 | S0/S1 | P0 | 关键 P1 |
|---|---|---|---|---|---|---|---|
| 守七台账 | `守七台账/introduction.html`（:8780） | 网页解密（选份→钉条→还柜） | HOLD | 3/3 | 无 | 无 | 无 |
| 路引缮写 | `路引缮写/introduction.html`（:8782） | 网页解密（采词→四栏整句交） | HOLD | 2/2 | 无 | 无 | 无 |
| 空车夜班 | `空车夜班/index.html`（:8781） | 规则怪谈（摊守则→标打架→压单） | HOLD | 6/6 | 无 | 无 | 无 |

三局都能打完主线，构建闸 B 全过。可理解闸只有作者知识，没有真人盲测，所以整体 **HOLD**，不写成可以发给陌生人。

三局共同 UNTESTED：真人盲测、Safari、真机触控、全程键盘通关、itch iframe。

三局共同缺陷：无。favicon.ico 已补。

返工：无 S0/S1，不退回开发。试玩缺陷已关。发给人前请没看过设计文档的人各盲打一局。

---

# 一、守七台账

游戏 / 入口：`Desktop/游戏5/守七台账/introduction.html`（http://127.0.0.1:8780）
构建：守七台账 v1，36 页 + 引言，saveKey `shouqi-taizhang-v1`
主类型：html-game-puzzle（壳钉登山；循环钉 Blue Prince：选今晚看哪份 → 钉进交班本 → 还柜，已证实留下）

## 结论
可发给该渠道陌生人：HOLD
一句话原因：新档能走到停厅 / 开厅 / 空条下班三条收口，搜索不开原件，还柜后未钉的页抽不出，320px 主按钮可点；可理解闸只能标 AUTHOR_KNOWLEDGE。

## 闸
构建闸 B：PASS
可启动：PASS（引言点进中心，公告出现「讣告栏」）
可完成：PASS（stop / open / late 均实点到回执页）
可保存：PASS（班中刷新一致；清档后「接着上一次」消失）
可理解（盲测）：AUTHOR_KNOWLEDGE。真人陌生人样本 UNTESTED
可解（品类）：PASS（三班调档 DAG 可达；近答案打回；搜索空串/英文/「管理员」；搜「讣告栏」只回公开壳）
无障碍烟测：PASS（320px 钉条 248×68；无音频；不单靠色；无整屏闪）。全程键盘 UNTESTED
平台硬条件：PASS（自托管）。itch / Steam / 版号：N/A
合规：PASS（LICENSE.txt；引言虚构免责；无商标切图；无密钥）

## 玩家轨观察
第一动作：点引言「去白塔殡仪服务中心」。公告第三行有「讣告栏」。
首次误解：顶栏搜「讣告栏」只回到公开壳，原文必须走原件柜占本班份数。
卡点：第二班部分门要已证实条，未钉的门显示「抽不出来」。本轮未用指点档。
失败与恢复：空条不收；末班不能还柜；空条下班走 late。
结局复述：停厅是接运终期、今晚、幡面计日、本馆第七日夜四条齐了；不是魂有没有回家。开厅是按主家。late 是子时前没交条。
想关的时刻：无。回执页底栏芯片压住正文下沿。

## 覆盖
主线结局：3 / 3 PASS
失败/暂停/重试：夜间守灵公开页可开；清档重开 PASS
刷新中局：PASS
窄屏：PASS
键盘：引言 Enter 进站 PASS；全程键盘 UNTESTED
触控：真机 UNTESTED
静音：N/A 无音频
UNTESTED：真人盲测、Safari、真机触控、全程键盘通关、itch iframe、指点四档逐档

## 缺陷
S0：无　S1：无　P0：无　关键 P1：无

id: SQ-S3-01
title: 停厅回执页底栏交班本芯片压住正文
build: 守七台账 v1
env: Chrome headless 1280×800
pre: 新档走完三班，成组勾条停厅
steps:
  1. 走到 p33-stop.html
  2. 看回执最下沿
expected: 回执全文不被常驻底栏挡住
actual: `#shouqi-bar` 压在 33/36 页脚和末段上
repro: 5/5
s: S3
p: P2
status: FIXED
fix: 回执页（p33/p34/p35）不再注入底栏；正文底垫收到 16px。Chrome 1280 复核：无 `#shouqi-bar`，末段在视口内。

id: SQ-S4-01
title: 缺 favicon.ico，控制台 404
s: S4
p: P3
status: FIXED
fix: 根目录 `favicon.ico`，http 200。

## 意见 / 返工
搜「讣告栏」回公开壳是设计。回执底栏已收。不改玩法。
退回阶段：无。下一步：真人盲测。

---

# 二、路引缮写

游戏 / 入口：`Desktop/游戏5/路引缮写/introduction.html`（http://127.0.0.1:8782）
构建：路引缮写 v1，36 页 + 引言，saveKey `luyin-jianxie-v1`
主类型：html-game-puzzle（壳钉登山；循环钉 Golden Idol：采词 → 组四栏 → 整句交）

## 结论
可发给该渠道陌生人：HOLD
一句话原因：暂扣 / 过火两条收口可实点到达，近答案不标哪一栏，搜索不开附件；可理解只能标 AUTHOR_KNOWLEDGE。

## 闸
构建闸 B：PASS
可启动：PASS（引言进店，点公告「路引」进袋，底栏「已采 1」）
可完成：PASS（hold / burn）
可保存：PASS（袋与栏位写 localStorage；无词直开附件被挡）
可理解（盲测）：AUTHOR_KNOWLEDGE。真人陌生人样本 UNTESTED
可解（品类）：PASS（词 DAG：路引→急件邮件→出货单→后院/尺→替身/格式；主宾对调打回；空串/「管理员」；搜「路引」只回公开壳）
无障碍烟测：PASS（375 无横向溢出；无音频；`#submit-sent` ≥44px）。全程键盘 UNTESTED
平台硬条件：PASS（自托管）。itch / Steam / 版号：N/A
合规：PASS（LICENSE.txt；引言虚构免责；无密钥、无商标切图）

## 玩家轨观察
第一动作：点引言「去车马店」，再点公告里带虚线的「路引」，底栏亮袋。
首次误解：值班台四栏空着仍能点「整句交上」，回「四栏不齐，不收」。
卡点：无词时附件柜夹子打不开，有句子。本轮未用指点档（第四档会写死整句）。
失败与恢复：主宾对调交句，回「这四栏凑在一起对不上。底册不标哪一栏。」不跳页。
结局复述：暂扣是钱培在后院把钱小满扎成替身，路引不过火；过火是按孙秀兰急件给钱培开病故路引，墙上会多一张找钱小满的条。
想关的时刻：无。

## 覆盖
主线结局：2 / 2 PASS
失败/暂停/重试：空句、近答案、无词直开 p34 / p11 均挡 PASS
刷新中局：袋在 localStorage；刷新后四栏仍在 UNTESTED
窄屏：PASS（无横向溢出；提交键 ≥44px）
键盘：引言 Enter 进店 PASS；全程键盘 UNTESTED
触控：真机 UNTESTED
静音：N/A 无音频
UNTESTED：真人盲测、Safari、真机触控、全程键盘、刷新后四栏、itch iframe、指点四档

## 缺陷
S0：无　S1：无　P0：无　关键 P1：无

id: LY-S3-02
title: 包内无 LICENSE.txt
build: 路引缮写 v1
env: 文件系统
pre: 对照守七 / 空车均有 LICENSE.txt
steps:
  1. 打开 路引缮写/ 根目录
expected: 有可随包分发的许可与虚构声明文件
actual: LICENSE.txt 不存在（引言里有虚构句，不替代许可文件）
repro: 5/5
s: S3
p: P1
status: FIXED
fix: 根目录 LICENSE.txt（石津县 / 官道镇 / 车马店虚构声明），http 200。

id: LY-S3-01
title: 375 宽「整句交上」高度 39px，低于 44px 触控目标
build: 路引缮写 v1
env: Chrome headless 375×667
pre: 打开 p05-desk.html
steps:
  1. 视口 375×667
  2. 量 #submit-sent 高度
expected: 主提交 ≥44px
actual: 39px
repro: 5/5
s: S3
p: P2
status: FIXED
fix: `#submit-sent` / `#sentence-card button` min-height 44px。Chrome 375 复核 ≥44。

id: LY-S4-01
title: 缺 favicon.ico，控制台 404
s: S4
p: P3
status: FIXED
fix: 根目录 `favicon.ico`，http 200。

## 意见 / 返工
搜索被降成公开壳，主循环是四栏。许可证和提交键已补。不改玩法。
退回阶段：无。下一步：真人盲测。

---

# 三、空车夜班

游戏 / 入口：`Desktop/游戏5/空车夜班/index.html`（http://127.0.0.1:8781）
构建：空车夜班 v1，七晚驾驶座，saveKey `kongche-yeban-v1` schema 1
主类型：html-game-rule-horror（类型层钉动物园互斥公文；班次壳钉夜班七晚；机制层摊开守则 → 标打架的一对 → 按身份压这一单。不是 Papers Please，不是一纸店规卖货）

## 结论
可发给该渠道陌生人：HOLD
一句话原因：新档能实打七晚走到「交钥匙」，第四晚假互斥成立，湿座必须下车看才能干净压单；可理解只能标 AUTHOR_KNOWLEDGE。

## 闸
构建闸 B：PASS
可启动：PASS（点接班，同屏有人、差事、守则、后视镜）
可完成：PASS（dawn 七晚实打；ferry / mirror / fired 从第七晚钥匙页实点；joss 用潮钱旗 + 交窗口；void 用 pickEnding + render）
可保存：PASS（dawn 写入 localStorage；刷新后结局或「接着上一次」仍在；清档后接班可重来）
可理解（盲测）：AUTHOR_KNOWLEDGE。真人陌生人样本 UNTESTED
可解（品类）：PASS（第四晚「白事不得上后排」与折叠纸「丧事可上后排」并排，不是换标题；压单成组；未看镜/下车时 validateJudge.blocked）
无障碍烟测：PASS（320 开局 44px、选项 44px、后视镜 36px、HUD ≥36px；无音频；已选来源有「已选」文字）。全程键盘仅开局 PASS
平台硬条件：PASS（自托管）。itch / Steam / 版号：N/A
合规：PASS（LICENSE.txt；标题页虚构免责；无密钥）

## 玩家轨观察
第一动作：点「接班」。看见工号 YE-08、油钱 64、守则、后视镜、打开手套箱。
首次误解：第一晚裴晚宁是 choice 不是 judge。修过之后未看镜点「载」会停住，提示先看后视镜。
卡点：第三晚湿座必须后视镜 + 下车看，不看则「压单前先看：下车看」。
失败与恢复：警告累计；神智 0 走空车（状态层）；关灯走收车。潮钱可在窗口退（本轮未买）。
结局复述：交钥匙是活着把车还河西口窗口；送到门口是那扇门停在水外边；挂镜是把驾驶座让出去；关灯是车队按弃班记；潮钱是湿座那笔没退。
想关的时刻：无。

## 覆盖
主线结局：6 / 6（dawn 全流程 PASS；ferry / mirror / fired 第七晚实点 PASS；joss / void 状态注入 PASS，画面完整性见缺陷）
失败/暂停/重试：清档重开 PASS
刷新中局：结局刷新 PASS
窄屏：PASS（主选项 ≥36px）
键盘：开局 Tab+Enter 接班 PASS；全程键盘 UNTESTED
触控：真机 UNTESTED
静音：N/A 无音频
UNTESTED：真人盲测、Safari、真机触控、全程键盘通关、itch iframe、班后窗口买香/手电改下一班

## 缺陷
S0：无　S1：无　P0：无　关键 P1：无

id: KC-S3-01
title: 收口 overlay 半透明，上一拍钥匙按钮透出来
build: 空车夜班 v1
env: Chrome headless 1280×800
pre: 实打七晚，点「钥匙交到河西口窗口」
steps:
  1. 走到 ending overlay
  2. 看画面中下部
expected: 收口独占一屏，上一拍选项不可见
actual: `#ending` 未藏 `#panel`，透过 overlay 仍能看见钥匙去处按钮
repro: 5/5
s: S3
p: P2
status: FIXED
fix: `#ending` 实底 `#0b0e10`；收口时藏 `#panel` 与 HUD。Chrome 复核：panel hidden、alpha=1。

id: KC-S3-02
title: 第一晚裴晚宁 needLooks 不挡「载」
build: 空车夜班 v1
env: Chrome headless
pre: 新档接班，接到裴晚宁
steps:
  1. 不点后视镜
  2. 点「载」
expected: 若 needLooks 生效，应要求先看后视镜
actual: 直接进入马师傅拍。needLooks 只在 kind===judge 时生效
repro: 5/5
s: S3
p: P2
status: FIXED
fix: `doChoice` 也走 `needLooks`。未看镜点「载」停在裴晚宁并提示「先看：后视镜」。sim `choice-need-looks` PASS。

id: KC-S3-03
title: 320 宽 HUD 按钮高度 32px
build: 空车夜班 v1
env: Chrome 320×640
pre: 接班后
steps:
  1. 量 .hud button
expected: 可点控件 ≥36px
actual: HUD「守则 / 交班窗口」32px（.choices / .boot 已 44px，.looks 36px）
repro: 5/5
s: S3
p: P2
status: FIXED
fix: `.hud button` min-height 36px。Chrome 320 复核 ≥36。

id: KC-S4-01
title: 缺 favicon.ico，控制台 404
s: S4
p: P3
status: FIXED
fix: 根目录 `favicon.ico`，http 200。

## 意见 / 返工
电台、后视镜、下车是今晚的工具，不是第二套玩法。第四晚折叠纸与第三条是真互斥。第一晚未看镜不能载，避免后面压单被当成可跳过。不改主循环。
退回阶段：无。下一步：真人盲测。
