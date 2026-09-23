# 北段 V2 加卡规格（子代理必读）

只写 JSON 到本目录。禁止改 `catalog.js`、禁止改 Codex 原版、禁止改 `~/Downloads`。
禁止改材料判断 `materials/options/correct`。禁止改 24 张人物卡的 name。

## 注入约定

父代理会把 JSON 收进 `catalog-case56.js`。你只产出数据。

新卡 id：
- 第五案：`c5x01` … `c5x77`（正好 77 张。现有 person14/15/16 严鹤生/余雪梅/柏正 保留且仍 sourceCase=5，合计 80）
- 第六案：`c6x01` … `c6x79`（正好 79 张。阿豆 new04 保留，合计 80）
不要用 card/new/person 前缀。

## 字段（每张必填）

```
id, name, cost, type, mode, modern:true, legacy:false, collectible:true,
unlock, sourceCase, source, sourceScene, art, artExt:"webp",
text, shortText, conditions, omen, archetype, buildRole, designId, designEffect,
catalogRule: { version:2, mode, trigger, condition:"any", goals:[], case:0,
  enter:[], effects:[], charges, activateCost:0, effectText, intent }
```
不要 signature。不要新 op。不要新 condition key。

## mode / type 对照（必须配对）

| type | mode | charges | conditions | trigger 常见 |
|---|---|---|---|---|
| 人物 | person | 99 | 最多3名协作者 | 不要新增人物卡 |
| 调查技能 | skill | 0 | "" | skill 出牌立刻结算，effects 在 catalogRule.effects |
| 通路技能 | skill | 0 | "" | 同上 |
| 交涉技能 | skill | 0 | "" | 同上 |
| 调度技能 | skill | 0 | "" | 同上 |
| 防护技能 | skill | 0 | "" | 同上 |
| 压制技能 | skill | 0 | "" | 同上 |
| 应对反制 | response | 0 | 本轮出现X时触发，未触发返还费用 | intent 必填 |
| 装备工具 | equipment | 4 | 最多3件装备 | enter + trigger 协作 |
| 现场布置 | setup | 3 | 最多2处布置 | enter + trigger 协作 |

skill：enter=[]，打出时执行 effects，然后进弃牌。
equipment/setup：打出执行 enter，上场；每轮首次 trigger 时执行 effects。
response：intent 必须是已有窗口之一：interrupt, water, scatter, grab, disposition, transfer, attack, fall, glare, urge, dog。
cost 只能 0/1/2。cost=0 会自动变成迅手（每轮同名限1），text 里写「迅手（每轮同名限1）。」

## 允许的 op（禁止其它）

insight 调查, courage 交涉, leverage 通路,
shield 护身, heal 回复心神, hurt 失去心神,
focus 专注, resolve 信任, route 脚步,
damage 压制目标, sweep 压制所有, stun 打断, weaken 压力−, weakenAll, expose 破绽+,
cover {value}, draw, drawMode {value: skill|equipment|person|setup|response},
discardRight, recycle {value: mode}, energy, nextEnergy, nextProgress,
fatigue, vulnerable, strain, calm, attackBonus, counter, retain, blockNext,
cut 解束缚, care 处理轻伤, dry 干燥准备, evacuate 护送离险,
exhaustSelf, refresh {value:mode}, pay {resource:focus|resolve|route,n}

if.condition 只许：killed, stunned, weakened, exposed, wounded, lowHP, guarded, alone,
otherAlone, otherEquipped, people1, people2, equipped, first, afterAction, hand2, enemies2,
focus1, focus2, resolve1, resolve2, route1, route2

cover.value 已见：water, scatter, interrupt, attack, glare, urge 等。灯/名主题用 scatter 或 attack，不要发明 cover 名。

## 桥牌 payoff

约 1/4 的 skill 做成「基础效果 + 若有专注/信任/脚步则追加」。没筹码也能打。
写法：effects 里先写基础 op，再 `{op:"if",condition:"focus1",effects:[{op:"draw",n:1}]}`

## 真实术语（卡名必须来自下列或可查证的同体系词，禁止自造档房长名）

道家技法：符箓, 敕令, 掐诀, 禹步, 步罡, 踏斗, 存思, 召将, 上表, 青词, 净坛, 启坛, 安镇, 解厄, 度亡, 破狱, 送神, 洒净, 掐剑诀, 急急如律令
法器：桃木剑, 七星剑, 令牌, 法印, 镇坛木, 水盂, 杨柳枝, 朝简, 笏, 木令, 令旗
阴司：生死簿, 判官笔, 勾魂, 勾牒, 引魂幡, 买路钱, 牌位, 神主, 替身, 纸扎, 头七, 冥婚, 城隍, 土地, 孟婆, 黑无常, 白无常, 牛头, 马面, 日游神, 夜游神
民俗：叫魂, 喊惊, 收魂, 压胜, 不应, 回头, 掩镜, 收灯, 送客, 设醮, 献食, 空位, 位牌, 长明灯, 引魂灯, 招魂幡, 白幡, 香案, 香炉, 三炷香, 灯花, 筷饭（可用「倒头饭」）
符类可加真实修饰：五雷符, 安镇符, 解厄符, 净坛符, 镇名符, 封口符, 遮神符, 度人符 —— 仍须像真实符名，不要「灯下细核」这种。

同名最多 1 张。三个子代理的名必须不撞车：第五案偏阴司/棺/头七/引魂幡/买路钱/牌位/替身；第六案偏设醮/献食/送神/空位/宴席忌讳；术语覆盖层用道家技法+法器给旧卡。

## 效果必须对上术语

禹步/步罡/踏斗 → leverage/route/cut，禁止 damage
存思 → focus 或 nextEnergy（蓄力），禁止召人
召将 → drawMode person 或 deploy_equipment 类护身，禁止 heal
净坛 → calm + cover 或清 fatigue，可 focus+1
掐诀 → cost 0，nextEnergy 或 focus
上表/青词 → nextProgress 或 nextEnergy（延迟）
送神 → 有收益同时 fatigue 或 discardRight 或 exhaustSelf（结束收回）
安镇 → shield / retain / cover
解厄 → calm / care / heal
度亡 → damage 对已 weaken 的目标，或 stun
破狱 → cut
买路钱 → leverage 或 blockNext，可 hurt 1 作为花费
判官笔/生死簿 → insight/focus，或 weaken（勾名）
叫魂 → courage/resolve；应对 urge
不应 → cover urge 或 stun
替身/纸扎 → shield + 自己 hurt 或 retain
引魂幡 → cut 或 draw
桃木剑 → damage；七星剑 → 高费 damage 或 sweep
敕令 → stun 或 weaken
镇坛木 → stun
水盂/杨柳枝/洒净 → dry 或 care 或 calm
头七 → 不要做「第7回合」新计数器；用 nextProgress / retain 暗示「还没到日子」

## 第五案主题

《归棺旧影》：棺、影、绕行脚印、只出不进、旧物归位、停灵、守夜。
禁止水险主轴（挡住水险/干燥准备/水下牵引留给改判通用的旧 7 张）。
unlock 72–89 均匀分布。sourceScene `c5s01`…`c5s18`。
source：`北段V2 · 归棺旧影 · 完成N场后习得`（N=unlock）。
archetype 可用现有 12 个之一，或写「归棺旧影」。
omen 克制，不要鬼屋。案件真相是人为，文化是氛围。
mode 配比建议（77 张）：skill 32, equipment 16, setup 18, response 11。
cost 配比约 0:12, 1:40, 2:25。

## 第六案主题

《黄灯无客》：空席、备而无人、灯火通明却无客、主位用过的碗筷、等不到的人、设醮、献食、送神。
禁止再写棺木主轴。
unlock：90–107，且 unlock>=90（隐藏案：`discovered` 要求 hiddenOpened）。
sourceScene `c6s01`…`c6s18`。
source：`北段V2 · 黄灯无客 · 完成N场后习得`。
mode 配比（79 张）：skill 34, equipment 16, setup 18, response 11。
阿豆不要复制。不要新增人物卡。

## 旧第五案 7 张布置（父代理改判通用）

card511 并排检视台, card512 逐人护送队列, card513 小巷连环转角,
card514 密闭防潮匣, card515 宽板接力桥, card516 水下牵引绳, card519 查验后的归位架
→ sourceCase 改为 0。不要在新卡里复用这些 id。

## 输出文件

只写指定路径。JSON 必须是数组。UTF-8。用 `JSON.stringify(arr)` 合法 JSON。
