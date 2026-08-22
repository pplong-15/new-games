# 金罂同名　加厚页表（18→≥37）

对标 Roottrees。玩家褚慈。正确：南厅对吴晚香；西厅已迁出未销。可认南厅或上报同名。不要认西厅。
认领四路键 **不许改**。检索仍只接受一段连续汉字。

先读 `js/keywords.js`、全部 html、`STORY.md`、`PLAY.md`、`EXPAND.md`。

## 必做新页（19）

每页 ≥220 汉字。词必须先写在已打开页上，再进 `KEYWORD_TABLE`。

### 值班室（service-cyan）

1. `desk/oral.html` — 秋禾口述笔录：柿树坪、九六年、承租人吴晚香，三句分别指向两个人。她自己打断自己。
2. `desk/sms-qiu.html` — 裘晚秋短讯全文。写错格违约，工号褚慈。
3. `desk/wet-tag.html` — 迁坟年西厅标签淋湿重贴。limits：柜面字不能当册。
4. `desk/rules.html` — 班规：对年、对址、对迁出；只出建议。
5. `desk/log.html` — 方永石最后一周值班日志。柏年来电那夜。
6. `desk/phone-bo.html` — 柏年电话摘记：迁出后勿再接待认领。缺回执。
7. `desk/tea.html` — 复印件茶渍。厅号看不见，所以才要查档。

### 乡栏（gov-redbar）

8. `gov/lease.html` — 十年租期预审今夜截止。南厅在租，西厅备注迁出未销。
9. `gov/ordinance.html` — 金罂收堂条例（虚构县）。捡金改安放，夜班不挪柜。
10. `gov/gongren.html` — 工人路筒子楼安置短告。对水泥厂那房迁县后住址。
11. `gov/errata-2019.html` — 乡栏转谱馆：同名两房按出生年拆条。

### 谱（archive-simsun）

12. `zupu/split.html` — 光绪东巷从柿树坪析出。解释秋禾为何串祖屋。
13. `zupu/merge.html` — 二〇一九数字化误合一条、后按生年拆开的工作页。
14. `zupu/qiushi.html` — 德房配邱秀兰专页。与吴晚香不是一人。
15. `zupu/other-lin.html` — 邻乡第三条「林阿盛」（一九四四，石灰窑）。检索会命中，按生年/址排除。**不是今夜两行之一。**

### 旧报（news-portal）

16. `news/flood.html` — 积水短讯。补工人路门牌，不作第三条认领。
17. `news/tongzi.html` — 筒子楼拆迁预告。水泥厂宿舍。
18. `news/obit-lime.html` — 邻县石灰窑林阿盛讣（一九四四–二〇〇九）。享年也像，生年不同。烟雾。
19. `news/qiulan.html` — 邱秀兰晚年短讯或厂家属栏（她不是承租人）。

## 必须改的旧页

- `desk/hall.html`：脚链口述、班规、日志、茶渍、短讯。
- `gov/index.html` `news/index.html` `zupu/index.html`：挂上新页。
- `js/keywords.js`：
  - 「林阿盛」命中加上 other-lin、obit-lime（让同名膨胀）
  - 新词：石灰窑、一九四四、租期、茶渍、邱秀兰已有则补 href
- `search-results.html` 逻辑若写死数量，改成跟词表走。

## 闸门

PLAY 站点地图与烟雾弹表更新。VOLUME 诚实。第三条同名必须能排除，不能让玩家合理认它为南厅或西厅。

自检：`python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/金罂同名"`
