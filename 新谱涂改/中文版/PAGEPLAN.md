# 新谱涂改　加厚页表（15→≥37）

对标鬼媒婆。玩家芮秋。正确挂条：按附件涂 / 外迁务工 / 迁出底册 / 只核世系 → hung。
正确结局键、对照勾选、`js/engine.js` 的 `pickEnding` **不许改**。

先读：`STORY.md` `PLAY.md` `COPY_NOTES.md` `EXPAND.md` 和全部现有 html。

## 必做新页（22）

每页 ≥220 汉字，独特，从现有站链过去。

### 衡谱堂（B 冷陈述）

1. `hengpu/contract.html` — 西房八号合同摘：二十三时上传、只建议、产业另簿。露出委托号与葛汀工位。
2. `hengpu/pricelist.html` — 价目。两头都付过钱的痕迹（西房电子页、东房附件加收）。
3. `hengpu/upload-rule.html` — 入库规则：最后进库附件覆盖行。附件号格式 `HP-补-`。
4. `hengpu/east-receipt.html` — 东房交件回执。怀川、HP-补-19-07、一九六二年出嗣扫描、进库时刻晚于西房页。
5. `hengpu/ge-note.html` — 葛汀抽屉撕纸。不解释，只写「两头钱齐了按后进的做」「产业退」。
6. `hengpu/xifang-toc.html` — 西房卷二目录：第十四行伯岑被涂，邻行延木、旁支还在。证明不是整卷脏。
7. `hengpu/old-bounce.html` — 去年别人写丁口岁修被退的旧单（样例，不是玩家结局页）。

### 县图（C 讲古立规）

8. `library/catalog.html` — 特藏目录。续修一九九八、未定稿一九八三、东房支另卷。链到扫描/稿。
9. `library/borrow.html` — 一九八三年三月借阅条：借走一九九八续修的人是怀川。加深暗线。
10. `library/repair1986.html` — 厅堂修缮记：祖父借过八百，人走未还。limits：账不是出嗣证明。
11. `library/scan-east.html` — 东房扫描真有「出嗣某氏」的别人。用来对比：西房伯岑旧行没有这两个字。

### 户政（D 史笔半文）

12. `hukou/factory.html` — 一九九六年厂方死亡注销函全文。无认尸、无火化号。limits 写在页脚站内说法。
13. `hukou/miss.html` — 查「芮怀川」或错名：不在本卷。教玩家户主是怀山。
14. `hukou/tongbu.html` — 铜埠新桥厂集体户说明。务工迁入集体户，不是出嗣销户。
15. `hukou/mirror-about.html` — 镜像停更说明（二〇一一年）。只能对旧簿，不能当活人证明。

### 镇事（E 群嘴）

16. `forum/fang.html` — 房头楼主题列表。主题数、最后发表必须和真实帖数对得上。
17. `forum/thread-2014.html` — 二〇一四年延木问「还在谱上吗」（可从原 thread 抽出加厚，原文 thread.html 改成只留怀川二〇一九那楼，两边汉字不得 40 字重复）。
18. `forum/thread-ink.html` — 楼下印色发蓝、不像朱砂。
19. `forum/thread-dong.html` — 东房有人坚称六二年出嗣（烟雾，limits：帖不是公证书）。
20. `forum/thread-ding.html` — 岁修按在谱丁口分的闲话。指向产业诱惑，不是挂条权限。
21. `forum/user-huaichuan.html` — 怀川用户页：注册年、回帖数、签名「迁走的不算」。
22. `forum/board-idle.html` — 菜场闲话一帖（猪肉/停电）。噪声。有人随口提「东房又在搞谱」。

## 必须改的旧页

- `hengpu/desk.html`：目录加上合同、价目、回执、卷二目录。
- `library/rules.html`：链到目录、借阅、修缮、东房扫描。
- `hukou/index.html`：链到厂函、集体户、镜像说明；查错名可去 miss。
- `forum/list.html`：房头楼改链 `fang.html`；主题/帖数改到与新帖一致；菜场可链 idle。
- `hengpu/compare.html`：若下拉源只有四项，可加「东房扫描 / 厂函 / 借阅条」作可选对照，**不要改 hung 所需勾选**。
- `introduction.html`：可加一句「合同和旧退单在委托台侧栏」，不要写成说明书机制词。

## 闸门

更新 PLAY 站点地图与 DAG（新页多是加固 token，可不加强制门）。VOLUME 诚实计数。GATE_C 有漏 HOLD。

自检：`python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/新谱涂改"`
