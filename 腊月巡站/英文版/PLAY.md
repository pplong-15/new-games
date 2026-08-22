# PLAY　专章 A

梯度：A 类沉浸模拟（Hypnospace 式旧网桌面巡查）。不是登山式单站搜隐藏页，不是片库，不是旅游帖拼村秘，不是质检六站。

核心循环：接工单 → 在 XP 桌面打开多家 2008 小站 → 按局内写死的三条写法核对 → 在回执上勾站 → 对了才能走。

## 站点地图

| source_id | 文件 | 所有者 | skin_id | 暴露 token | 维护状态 |
|---|---|---|---|---|---|
| src-intro | introduction.html | 西关街道纸质单 | intro-manual | token-workorder, token-named-fushun, token-three-rules | 油印件，只此一份 |
| src-desk | desktop.html | 星辉夜班机 | winxp-luna | token-desk-open | 浮窗缩短，长文拆出 |
| src-notepad | notepad.html | 尤石摘抄 | winxp-luna | token-three-rules（复述） | 桌面记事本全文 |
| src-fang | fang-note.html | 方正平 | winxp-luna | token-fang-note | 别勾本店、饭票 |
| src-fav | favorites.html | 星辉夜班机 | winxp-luna | 链到各站 | IE 收藏 |
| src-hist | history.html | 方正平下午 | winxp-luna | token-fang-saw-chunni | 点过春泥和福顺 |
| src-mail | mail.html | 路桂芬→尤石 | mail-web-2010 | 催回执 | 夜班信箱 |
| src-portal | sites/portal.html | 方正平（本店主页） | portal-2006 | 链到各站 | 夜班收藏，2008 仍在用 |
| src-fushun | sites/fushun.html | 马秀兰 | shop-local-2010s | token-fushun-24 | 请人套免费模板 |
| src-fushun-pack | sites/fushun-pack.html | 马秀兰 | shop-local-2010s | token-fushun-24（加固） | 礼包细目，不单独进回执 |
| src-jiedao | sites/jiedao.html | 西关街道信息站 | gov-redbar | 三则入口 | 摘要，全文拆页 |
| src-jiedao-date | sites/jiedao-date.html | 西关值班室 | gov-redbar | token-local-23 | 核定一全文 |
| src-jiedao-mourn | sites/jiedao-mourn.html | 西关值班室 | gov-redbar | token-rule-mourn | 核定二全文 |
| src-jiedao-ash | sites/jiedao-ash.html | 西关值班室 | gov-redbar | token-rule-ash | 核定三全文 |
| src-cuiji | sites/cuiji.html | 崔建国 | shop-detail-2008 | token-cui-selling, token-cui-funeral | 小孩代打 |
| src-cuiji-item | sites/cuiji-item.html | 崔建国 | shop-detail-2008 | token-cui-selling（加固） | 细看，红键仍在 |
| src-jingxuan | sites/jingxuan.html | 齐小满 | classified-yellow | token-ash-trash | 黄页置顶 |
| src-jingxuan-combo | sites/jingxuan-combo.html | 齐小满 | classified-yellow | token-ash-trash（加固） | 一袋清细目 |
| src-forum | sites/forum.html | 义务斑竹 | discuz-board | 主题表 + 年货/垃圾袋两楼 | 四楼拆出 |
| src-forum-cui | sites/forum-cui.html | 巷口剃头等 | discuz-board | token-cui-head7 | 五层，回复四 |
| src-forum-lu | sites/forum-lu.html | 西关老李等 | discuz-board | token-side-lu | 一面之词 |
| src-forum-sugar | sites/forum-sugar.html | 糖瓜贩子 | discuz-board | 只聊价钱 | 噪声 |
| src-forum-mother | sites/forum-mother.html | 夜班汽水 | discuz-board | token-side-mother | 暗线，不改核对 |
| src-chunni | sites/chunni.html | 章树生 | corp-table-2005 | token-chunni-clean | 规矩写死 |
| src-chunni-price | sites/chunni-price.html | 章树生 | corp-table-2005 | token-chunni-clean（加固） | 报价，瓷盏 |
| src-baike | sites/baike.html | 文化馆实习编辑 | baidu-baike | token-north-south | 小年条 |
| src-baike-sao | sites/baike-saocheng.html | 同上 | baidu-baike | 空窗才扫，不是铺子 | 扫尘专条 |
| src-baike-jie | sites/baike-jiezao.html | 同上 | baidu-baike | 除夕接灶，不是关站依据 | 接灶专条 |
| src-tanggua | sites/tanggua.html | 甘老三 | shop-local-2010s | 干净反例（按廿三卖） | 勾了 bounce |
| src-jingua | sites/jingua.html | 侯秋生 | classified-yellow | 近名反例（只擦窗） | 勾了 bounce |
| src-stock | sites/stock.html | 阙三 | corp-table-2005 | 噪声 | 勾了 bounce |
| src-receipt | receipt.html | 星辉夜班机上的回执窗 | winxp-luna | 提交 marks | 十一行，子页不进 |
| src-os-my | mycomp.html | 星辉夜班机 | winxp-luna | 烟雾 | 电费与交接 |
| src-os-bin | recycle.html | 星辉夜班机 | winxp-luna | 烟雾 | 删过的弹窗 |

回执只按站勾：福顺、崔记、净轩、春泥、街道、词条、论坛、本店导航、糖瓜、净瓜、行情。子页（礼包、细看、套餐、报价、核定全文、论坛楼、词条专条）不单独进回执。

## Token DAG（无环）

```
token-workorder
  └─ token-named-fushun + token-three-rules
        ├─ open fushun / fushun-pack → token-fushun-24
        ├─ open jiedao-date / jiedao-mourn / jiedao-ash
        │     → token-local-23 + token-rule-mourn + token-rule-ash
        │     └─ (fushun-24 ∧ local-23) → token-fushun-violate
        ├─ open cuiji / cuiji-item → token-cui-selling + token-cui-funeral
        │     └─ forum-cui 可选补 token-cui-head7
        │     └─ (cui-selling ∧ (cui-funeral ∨ cui-head7) ∧ rule-mourn) → token-cui-violate
        ├─ open jingxuan / jingxuan-combo → token-ash-trash
        │     └─ (ash-trash ∧ rule-ash) → token-jingxuan-violate
        └─ chunni / baike* / tanggua / jingua / stock / side posts 可选，不作为提交前置
提交回执
  ├─ {fushun, cuiji, jingxuan} 恰好 → ending-off
  ├─ 含任何非此三站（含糖瓜、净瓜、行情） → ending-bounce
  └─ 子集且无额外 → ending-miss
```

无悬空输入：三条规矩来自工单+街道全文；三家原文来自各自站及细目。论坛只加强，不卡死。新站不能证明第三条违规。

## 逐题五步

### 题1　福顺日期（送）

1. 看到：工单点名福顺年货；桌面有同名图标。  
2. 做：打开福顺及礼包细目，读念四/廿四；打开街道核定一，读二十三日黄昏。  
3. 映射：邻省/娘家日 ≠ 本县公布日。  
4. 触发：持有 token-fushun-violate，回执可勾福顺。  
5. 错：把词条或糖瓜铺当铺子关 → 回单；只看福顺不看通知也能勾，但另两家仍要找。

### 题2　崔记丧期卖码（中）

1. 看到：崔记红码仍售，「办后事」；论坛白事楼写腊月十八、头七未满；街道核定二写丧期不得售红货。  
2. 做：店页/细看与通知对照，论坛补日子。  
3. 映射：丧期 + 仍卖灶码。  
4. 触发：token-cui-violate。  
5. 错：只听论坛骂就关春泥；或同情崔伯而漏勾。

### 题3　净轩香灰（中）

1. 看到：净轩及一袋清写灰进袋扔桶；街道核定三写另碗、倒桶查处；春泥/报价写瓷盏交还。  
2. 做：黄页正文对照通知。  
3. 映射：香灰写成可扫进垃圾。  
4. 触发：token-jingxuan-violate。  
5. 错：把春泥「扎眼」或近名净瓜当成违规。

### 题4　回执（收口）

1. 看到：桌面「协查回执」。  
2. 做：勾站并提交。  
3. 映射：玩家选择站哪一边——条文、路桂芬的脸色、或偷懒。  
4. 触发：三结局之一。  
5. 错：空交=漏关；多勾（含糖瓜/净瓜/行情）=回单。

## 解锁

不靠「第几步」。工具一开始就在桌面：浏览器链、回执、工单摘抄、收藏夹、历史、邮箱。论坛新帖已在，不刷新出新楼。提交后进结局页，不再改勾。

## 四级提示（只指方向，不替勾选）

| 级 | 福顺 | 崔记 | 净轩 |
|---|---|---|---|
| 1 方向 | 工单已写出第一家店名 | 三种写法里有丧期卖码 | 三种写法里有香灰进垃圾 |
| 2 范围 | 方正平便条：另两家对街道通知 | 店页或白事楼会提到后事 | 黄页家政栏，不是净瓜擦窗 |
| 3 操作点 | 福顺自写廿四/念四，核定一写廿三 | 崔记红键仍在，核定二禁红货 | 净轩套餐句对核定三 |
| 4 答案 | 只写在本文件，不上屏：勾福顺 | 勾崔记 | 勾净轩 |

屏上不出现「第4级」。回执空交时，路桂芬不代填。三种写法仍只对三家店。

## 烟雾弹 / 死路

- 春泥及报价：干净反例 + 路桂芬私怨。  
- 词条及扫尘/接灶专条：解释空窗与除夕，不是铺子。  
- 街道页、论坛、本店导航：勾了即回单。  
- 糖瓜铺：按廿三卖，写法干净；勾了 bounce。  
- 净瓜家政：近名，只擦玻璃；勾了 bounce。  
- 安津行情：噪声；勾了 bounce。  
- 论坛糖价楼：只聊价钱。  
- 论坛闲话楼：一面之词，不能证明春泥违规。  
- 论坛印码楼：尤桂芝与崔记，不改核对。  
- 我的电脑 / 回收站：交接与删掉的弹窗。  
- 历史：方正平下午点过春泥和福顺，不能当名单。

## limits（证据能证明什么）

- 街道核定一/二/三：能证明本县写下的日子与两条禁忌，不能证明灶君真的上天。  
- 福顺及礼包细目：能证明她按念四/廿四售卖，不能证明她存心骗乡里。  
- 崔记及细看：能证明红货仍售且自言后事，白事楼补头七；不能证明丧事细节目击。  
- 净轩及一袋清：能证明广告写法，不能证明她已经倒过谁家的灰。  
- 春泥及报价：能证明她的写法干净，不能证明路桂芬是否真的要过年货（闲话楼是一面之词）。  
- 糖瓜铺：能证明按本街日子出摊、不卖码，不能当第三条违规。  
- 净瓜：能证明只擦窗、近名不是净轩，不能证明齐小满跟侯是一家。  
- 行情站：不能证明任何一家铺子该关。  
- 历史记录：能证明老板下午点过春泥和福顺，不能证明谁该关。  
- 接灶专条：能证明除夕接回，不能当关站依据。

## 新手不迷路

- 30 秒：引言是工单（人=尤石，事=小年前关三家，首目标=福顺年货）；进桌面同屏可见短浮窗、福顺图标、回执；长文在记事本/留言。  
- 链：工单→福顺→核定一日期→论坛/店页找另外两类。  
- 反馈：提交立刻进回单/漏项/放行，不静默。  
- 进度：回执十一行待勾，是表格不是分数。  
- 梯度：第一家点名；中段要读通知全文和店页。

## 匹配度自检

- 民俗三项都变成可提取原文 + 对照。  
- DAG 无环、无悬空。  
- 离线闭环。  
- 开局能答我是谁 / 干什么 / 回执有什么用。  
- 正确收口仍且仅是福顺、崔记、净轩。
