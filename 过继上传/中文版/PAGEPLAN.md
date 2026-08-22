# 过继上传　加厚页表（10→≥37）

对标 Orwell。玩家卞梁。权威只有 upload / recommend。三栏齐才能签发。**不要改截止 22:00，不要改五栏 id。**
可给现有栏增加新版本块（新 `BLOCKS`），回访提纲跟着变。禁止增加「批准」钮。

先读 `js/state.js`、全部 html、`STORY.md`、`PLAY.md`、`EXPAND.md`。

## 必做新页（27）

每页 ≥220 汉字。从值班台目录或旧页链过去。`HY.visit("新id", 分钟)` 要接上。晚禾子页仍要求先读信。

### 户政（B）

1. `hukou-refuse.html` — 五月二十日持红纸对照、不予变更的窗口记录全文。
2. `hukou-channel.html` — 渠沿路九号守礼户协查：小满仍在该户。
3. `hukou-death.html` — 五月二十二日守仁死亡注销、户主改素秋、在册女儿晚禾。

### 红纸（C）

4. `sishu-zhongren.html` — 中人栏：伯川、守礼。谁执笔、谁在场。
5. `sishu-ink.html` — 托管员旁注：素秋指上有墨，当时在烧纸桌。

### 谱（企业套话）

6. `zupu-catalog.html` — 槐荫支目录。守仁条待核，女口凡例链出去。
7. `zupu-nvkou.html` — 女口不录凡例。晚禾不进表。limits：公司规则≠户籍。
8. `zupu-pending.html` — 匡缮手记：七月二十八补录、铅笔反拿、待核。可产块 `heir-zupu`（谱上已写小满）或只加固阅读。

### 民情通（A 絮叨）

9. `neighbor-tape.html` — 谭婶第二帖：八月卷尺天天响，说的是后院那间。可产 `kind-measure`。
10. `neighbor-cat.html` — 找猫帖。噪声。有人抱怨上门车。
11. `neighbor-water.html` — 停水帖。噪声。
12. `neighbor-cover.html` — 井盖帖。噪声。

### 信箱（改口 / 系统）

13. `letter-list.html` — 信箱列表（素秋、综治回执、垃圾、尤广）。`letter.html` 仍是素秋正文。
14. `letter-receipt.html` — 综治自动回执。不产块。
15. `letter-spam.html` — 保健品垃圾信。噪声。
16. `letter-youguang.html` — 尤广内部：只看栏齐不齐，不看你信谁。

### 晚禾空间（懒句）

17. `wanhe-msg.html` — 留言墙。同学问还住这边，她回「在。别转发。」
18. `wanhe-photo.html` — 相册：七月退出拍照那张空镜头说明（无五官）。
19. `wanhe-mood.html` — 说说：女的不算、药罐子、电费。可产 `live-wanhe` 或 `kind-care` 加固。

### 街道其它

20. `policy.html` — 槐荫过继纠纷受理须知。只收摘要，不改户口。gov-redbar 皮。
21. `help-fields.html` — 上传台字段说明（系统帮助）。一栏一版、不可逆。service-cyan。
22. `log.html` — 卞梁网格日志：八月上门被拒、听见卷尺。
23. `phone-bochuan.html` — 伯川来电摘要（系统转写）。把人说成「房」。
24. `subsidy.html` — 照料补贴驳回：同住关系写不清。指向晚禾未入册。
25. `history.html` — 邻巷另一户旧工单。**不能把那户字段传进本单**。教玩家别串户。
26. `office.html` — 五月二十日窗口叫号/窗口告知单。
27. `jiedao-share.html` — 街道存余/后院份额说明：本台不批产，只上传争议归类。

## 必须改的旧页

- `desk.html` 采集目录加上上述入口（可分组：户政附件、文书、谱、巷、信箱、须知）。
- `hukou.html` `sishu.html` `zupu.html` `neighbor.html` `letter.html` `wanhe.html` 链到子页。
- `js/state.js`：visit 识别新 page id；若加新 BLOCKS，desk 托盘与 result/huifang 拼句必须跟勾选对齐。
- `letter.html` 继续负责打开 wanhe。

## 闸门

PLAY 重画站点地图。VOLUME 诚实。新噪声帖不得互相粘贴换标题。

自检：`python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/过继上传"`
