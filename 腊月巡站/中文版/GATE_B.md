# GATE B　开发验收

## 数据与 DAG

回执判定在 `js/patrol.js`：`CORRECT = fushun, cuiji, jingxuan`。`ALL` 增 `tanggua` `jingua` `stock`。多勾干净站或新站 → bounce；只缺不增 → miss；恰好三家 → off。子页不进 `ALL`。无环。论坛、词条、春泥、糖瓜、净瓜、行情不是提交前置。

`node --check js/patrol.js` 通过。代码轨七组：三家→off；三家+春泥/糖瓜/净瓜/行情→bounce；福顺+崔记→miss；空交→miss。

## 可点对照

- 工单点名福顺；桌面同名图标；门户/收藏夹链到新站。  
- 福顺及礼包细目自写念四/廿四；核定一写二十三日黄昏。  
- 崔记及细看红键仍在 + 后事；核定二丧期红货；白事楼头七未满（五层 / 回复四）。  
- 净轩及一袋清；核定三另碗；春泥/报价瓷盏反例。  
- 糖瓜按廿三卖；净瓜只擦窗；行情是噪声。  
- 搜索钮 `onsubmit="return false;"`，不打开隐藏页。  
- 链扫描：html 内相对 href 无断链。

## 语法

HTML 无内联中文脚本块（避免 dupcheck 吃到脚本）。结局理由句在 `fillReason`，不进静态汉字。

## 皮肤合同

原十皮 + `mail-web-2010`（从 skins 库拷入本局 `css/`）。糖瓜复用 shop-local-2010s，净瓜复用 classified-yellow，行情复用 corp-table-2005（页表指定，噪声/近名站）。

## 文案

dupcheck：html 37，hanzi 10218，dup40 0，trip24 0，**PASS**。屏上机制词 grep 空。

## 结论　PASS（可进试玩）

红线未动：不写口诀实操、不以贿赂灶神过关、三条违规可对原文、正确收口仍是福顺崔记净轩。
