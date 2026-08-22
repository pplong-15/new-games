# 腊月巡站　加厚页表（16→≥37）

对标 Hypnospace。玩家尤石。**CORRECT 仍是且仅是** `fushun` `cuiji` `jingxuan`。
可把新站加入回执；勾新站 = bounce。不要把春泥、糖瓜、近名站写成第三条违规。

先读 `js/patrol.js`、全部 html、`STORY.md`、`PLAY.md`、`EXPAND.md`。

## 必做新页（21）

每页 ≥220 汉字。2008 语体，各站各皮。

### 把总站拆成可点的子页

1. `sites/forum-cui.html` — 论坛楼：崔二宝腊月十八、头七未满。楼层连续。
2. `sites/forum-lu.html` — 论坛楼：路桂芬到春泥要年货没给。一面之词。
3. `sites/forum-sugar.html` — 糖瓜价帖。只聊价钱。
4. `sites/forum-mother.html` — 夜班汽水：尤石他娘的灶码是崔记印的。暗线，不改核对。
5. `sites/jiedao-date.html` — 街道通知一：本县廿三黄昏，邻省廿四不许照搬。
6. `sites/jiedao-mourn.html` — 通知二：丧期不得零售开年红货。
7. `sites/jiedao-ash.html` — 通知三：香灰另碗，倒桶查处。
8. `sites/fushun-pack.html` — 福顺廿四礼包详情。重复娘家日子，禁止复制首页 40 字。
9. `sites/cuiji-item.html` — 崔记木版灶码商品页。红键仍在，后事一句。
10. `sites/jingxuan-combo.html` — 净轩「一袋清」套餐页。灰进垃圾袋写死。
11. `sites/chunni-price.html` — 春泥报价。瓷碗交还，扫帚不进神龛。干净。
12. `sites/baike-saocheng.html` — 扫尘词条。空窗才扫，不是铺子。
13. `sites/baike-jiezao.html` — 接灶词条。除夕，不是关站依据。

### 新的 2008 小站（干净或近名）

14. `sites/tanggua.html` — 西关糖瓜铺。按廿三卖，写法干净。勾了回单。skin: shop-local-2010s。
15. `sites/jingua.html` — 「净瓜家政」近名黄页。只擦玻璃，不写香灰。勾了回单。skin: classified-yellow。

### 桌面容器

16. `notepad.html` — 独立记事本页（从桌面浮窗拆出加厚）。路婶三种写法。勿与 desktop 浮窗 40 字重复：桌面浮窗改短，长文放本页。
17. `favorites.html` — IE 收藏夹。链到各站，含糖瓜、净瓜。
18. `history.html` — IE 历史。方正平下午点过春泥和福顺。
19. `mail.html` — 2008 网页邮箱。路桂芬催回执、广告垃圾。mail-web-2010 皮。
20. `fang-note.html` — 方正平留言加厚：别勾本店主页、饭票。
21. `sites/stock.html` — 门户股票链落地成伪财经小站。噪声，勾了回单。corp-table-2005。

## 必须改的旧页

- `desktop.html`：图标加收藏夹、历史、邮箱、记事本、糖瓜；浮窗缩短并链到 notepad / fang-note。
- `sites/portal.html`：导航补新站。
- `sites/forum.html`：主题列表链到四楼，楼层/回复数自洽。
- `sites/jiedao.html`：三则通知改成可点标题，正文可留摘要但不得与子页 40 字重复。
- `sites/fushun.html` `cuiji.html` `jingxuan.html` `chunni.html` `baike.html`：链详情。
- `js/patrol.js`：
  - `CORRECT` 不变
  - `ALL` 与 `NAMES` 加上 `tanggua` `jingua` `stock`（以及你若让子页可勾——**子页不要单独进回执**，回执仍按站）
- `receipt.html`：勾选项加上糖瓜、净瓜、股票站。春泥等旧项保留。

## 闸门

PLAY 地图更新。三种写法仍只对三家店。新站是干净反例或噪声。

自检：`python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/腊月巡站"`
