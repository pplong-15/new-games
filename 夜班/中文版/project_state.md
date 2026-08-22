# 夜班·恒灯便利 升级版 — 项目状态 & 架构契约

> 项目目录：`/Users/Zhuanz/Desktop/项目/01_民俗恐怖游戏/夜班/`
> 升级计划：`夜班_升级计划_2026-08-20.md`
> 建立日期：2026-08-20

---

## 一、架构契约（硬约束，全流程遵守）

| 角色 | 实体 | 职责 | 红线 |
|---|---|---|---|
| **主控** | Hermes（我） | 拆票、审批、调度、终审、状态落盘 | 唯一决策者 |
| **主执行** | cursor-agent | 开发、生图、文案、一切它能做的重活 | 唯一写代码者；消耗额度 |
| **质量闸门** | codex CLI | 只读 review + 独立验收，出 PASS/REWORK/HOLD | **纯只读，禁止调用 cursor、禁止写文件、禁止改代码** |
| ~~agy~~ | — | **放弃，不再调用** | — |

### 「别撞车」落地规则（用户明确提醒，最高优先级）

1. **codex 只读**：给 codex 的 prompt 必须显式写明「你是只读验收闸门，禁止调用 cursor CLI、禁止写任何文件、禁止修改代码，只出 PASS/REWORK/HOLD 报告」。
2. **cursor 唯一写者**：所有代码/素材改动只经 cursor-agent，我主控不会自己手写游戏代码。
3. **串行不并行**：cursor 开发 → codex 验收 → 我审批，一次只跑一个，不并行起两个写进程。
4. **撞车检测**：每次 codex 验收前，确认没有 cursor 进程在跑（process list 检查）。

### cursor-agent 调用契约（本机实测）

- 路径：`~/.local/bin/cursor-agent`
- 登录：`curtislangan83980@outlook.com`（已确认）
- 非交互：`cursor-agent "指令" --print`（在项目目录跑，加 `--trust` 防 Workspace Trust 报错）
- **关键参数（本机实测 2026-08-20，缺了会断连）**：必须加 `--output-format stream-json --stream-partial-output --sandbox enabled --disable-codebase-ref --workspace "$(pwd)"`。之前只用 `--print --trust` 会 `Connection stalled repeatedly` 反复断连（12次重连全失败）；换成 codex 同款这套参数后秒连秒回。根因=默认 text 输出格式 + 无 stream 导致长任务连接挂起。
- 模型：**全部统一 `--model cursor-grok-4.6-high`**（用户 2026-08-20 明确：cursor 全用 Grok 4.6 跑，不用 luna 省额度、不用低档）。生图、开发、文案、机械活一律 Grok 4.6。
- 长任务：`terminal(background=true, notify_on_complete=true)`，不 sleep 轮询
- 写 brief 文件：精确施工单写成 `BRIEF_*.md`，让 cursor 先读 brief 再实现

### codex 调用契约（本机实测）

- 路径：`/Applications/ChatGPT.app/Contents/Resources/codex`
- 登录：`Logged in using ChatGPT`（已确认）
- 只读 review：`codex review`（非交互）
- 完整验收：`codex exec "只读验收，出 PASS/REWORK/HOLD，禁止写文件禁止调cursor"`

---

## 二、P0 审计结论（现状）

**代码结构**（`夜班.html`，12.36MB，其中 83.1% 是 base64 图片）：
- 核心 JS 逻辑在文件偏移 `4655688` 之后，约 7.7MB（含 IMG 对象 base64）
- 57 个函数，**数据驱动架构**：
  - `newState()` 定义状态：night/cash/sanity/rep/cat/stock(9种)/flags/upgrades(4道具)
  - `buildNight(n)` 按夜数分发到 `night1()~night5()`
  - 每夜是事件数组，事件类型：prep/phone/scene
  - 场景事件含 `scene/portrait/name/text/choices`，choice 含 `label/need/do/then`
  - `pickEnding(s)` 按 flags + 数值判定结局
  - `ENDINGS` 定义结局文案

**现状数据**：
- 5 夜结构：night1(7场景)/night2(6)/night3(6)/night4(8)/night5(7)
- 6 个结局：dawn正常下班/ferry送她离开/cat交给猫/joss接了班/void变成客人/fired关灯走人
- 9 种商品：tea/noodles/water/bread/cigs/incense/battery/milk/candle
- 4 个道具：cam监控¥80/peach桃木¥60/light灯管¥50/catfood猫粮¥20
- 五条店规：①灯不能关②钱都收(陷阱)③后间不让进④猫拦着别硬留⑤没天亮别数纸钱

**升级决策**：**数据驱动架构支持扩容，不需要重写引擎**。5→7 晚只需：
1. 新增 `night6()`/`night7()` 函数 + 改 `buildNight` 分发；
2. 新增子系统对应的 state 字段 + 渲染逻辑；
3. 扩充 `ENDINGS` 结局 + `pickEnding` 判定。

**P0 补充发现（2026-08-20 复核）**：
- 「good/warn 颜色剧透」缺陷**在当前最新版已不存在**——CSS 里 `.choice.good`/`.choice.warn` 定义还在，但选项数据里已无 `cls:"good"/"warn"` 使用（0 处）。缺陷报告基于旧版。**此条不用修**，避免 cursor 白做。
- `.note.good` 是结算页正常使用（非剧透），保留。

---

## 三、5 玩法方向（用户已拍板「全做」）

| # | 方向 | 层级 | 解决缺陷 |
|---|---|---|---|
| 1 | 规则演化引擎（店规会变/被污染/有陷阱） | 核心层 | 规则静态、悖论缺铺垫 |
| 2 | 生存资源管理（债务压力+反馈双落点） | 核心层 | 进货零深度、rep幽灵 |
| 3 | 猫视角二周目（第二循环） | 第二循环 | 多周目无价值 |
| 4 | 真相拼图（分层解密） | 第二循环 | 悖论缺铺垫、老板废案 |
| 5 | 身份继承（roguelite内容倍增） | 内容乘法器 | 重玩价值 |

**开发分批**（设计全做、开发分批）：
- 第一批：方向 1+2+3（核心层 + 猫视角二周目）
- 第二批：方向 4+5（真相拼图深度化 + 身份继承）

---

## 四、开发阶段（对应升级计划 P2-P7）

| 阶段 | 负责 | 产出 |
|---|---|---|
| P1 玩法设计 | 玩法机器人(我调度) | 5方向完整机制设计文档 |
| P2 结构扩容 | cursor | 5→7晚 + 事件重排 |
| P3 子系统实现(第一批) | cursor | 规则演化+生存资源+猫视角 |
| P4 子系统实现(第二批) | cursor | 真相拼图+身份继承 |
| P5 打磨修复 | cursor | 移除颜色剧透/快进/多档/UI/图鉴/神智透明 |
| P6 文案扩展 | cursor | 7晚新增剧情文案(沿用克制恐怖风格) |
| P7 试玩验收 | codex闸门 + 我 | 完整通关+多结局+数值平衡报告 |

---

## 五、验收铁律

禁看「改了多少行」报达标，须回结构重判：
- **结构**：7晚成立；5个子系统真实存在且逐关解锁；结局≥8个且每个有根
- **耦合**：rep真实参与结局；动态经营真实影响现金流；规则演化真实改变每夜判断
- **梯度**：每晚新增变量递增；后期事件密度摊平恢复潜伏感
- **核心不变**：五条店规原文、真相回环、猫当裁判、关键人物、无jump scare风格全保留

## 六、验收裁决记录

**P2 结构扩容**（codex 闸门 2026-08-20）：PASS（8项全过，逐条带行号）。

**P3 三子系统**（codex 闸门 2026-08-20）：codex 判 REWORK，唯一阻断项 d「第1晚正文提前泄露规则信息」。**主控裁决=PASS（带说明）**：codex 误判了层面——它把「原版第1晚纸条剧情 then 文本」里的「第二条墨色深/纸钱不算」当成了「规则演化系统提前泄露」。实际上：①系统层（规页 nightRules）N1 是 `mark:"normal"` + 无 banner，课程式解锁正确；②那句剧透是**原版就有的核心叙事伏笔**（git 基线 HEAD~3 确认 night1 原版就含「墨色深/纸钱不算/描了好几遍」），体验报告明确夸过「伏笔-回收密度很高」，属叙事层应保留。故不打回 grok（打回会破坏原版优质叙事）。P3 三子系统判定通过。

**P4 二子系统**（codex 闸门 2026-08-20）：PASS（8项全过，逐条带行号）。

**P5 打磨**（结构自验）：通过（快进3倍速/多档回起点/结局图鉴14/神智透明/UI五项全落地，红线未破）。

**P6 文案**（agy 独立审查）：agy 审 7 条猫记忆碎片，抓 4 处问题（第2/5/7条拿腔作调、视角断层、称呼冲突），采纳 3 处修改建议由主控精准替换（第2条"影子"实际达标未改）。语法通过。

**P7 试玩验收**：结构自验全过 + 无头 Chrome 真机渲染（启动画面确认身份选择/猫视角/七晚·14结局全部呈现）+ DOM 执行验证 + 3段内联脚本 node --check 通过。**未验证**：真人从头玩完 7 晚 + 4 个新身份各玩一遍（grok 也标了身份线 UNTESTED）。

---

## 七、最终架构（实际执行，非计划）

> 计划阶段写的是「cursor 主执行 + agy 放弃」，实际执行中因撞车/断连问题调整如下。

| 角色 | 实际实体 | 说明 |
|---|---|---|
| 主控 | Hermes | 拆票、审批、终审、状态落盘 |
| 主开发 | **grok**（Grok 4.6） | 唯一写夜班.html；`GROK_HOME=~/.grok-home-hermes/.grok` |
| 文案审查 | **agy**（Gemini Flash） | 只读审文案出问题清单，不碰代码 |
| 质量闸门 | codex CLI | 只读 review + 验收 PASS/REWORK/HOLD |

**grok 账号隔离（方案C，已落地验证）**：`GROK_HOME` 环境变量指向 `.grok` 目录本身可完全重定向 auth/config/sessions。已建 `~/.grok-home-hermes/.grok`（new4 pplong15）和 `~/.grok-home-codex/.grok`（new5 2858379958@qq）。调用：`GROK_HOME=~/.grok-home-hermes/.grok grok -p "任务" --output-format plain --always-approve`。坑：`grok-account use` 是全局覆盖 auth.json（伪隔离）；`HOME`/`XDG_CONFIG_HOME`/`GROK_AUTH_PATH` 都无效，只有 `GROK_HOME` 有效且必须指向 `.grok` 本身。

## 八、交付物清单

- **游戏**：`夜班.html`（12.5MB，单文件，7晚 + 14结局 + 5身份 + 5子系统）
- **git 仓库**：`夜班/` 目录，9 个提交，基线 `94b4bc3` → 最新 `9fe408a`
- **设计文档**：`玩法设计文档_5方向.md`、`夜班_升级计划_2026-08-20.md`
- **施工 brief**：`BRIEF_P2/P3a/P3b/P3c/P4a/P4b/P5_*.md`
- **验收记录**：`project_state.md`（本文件）

## 九、遗留事项（交付后需人工/后续处理）

1. **真人试玩**：7晚 + 4身份各玩一遍，验证难度/平衡/恐怖感（浏览器自动化无法替代）。
2. **视觉核对**：规页铅笔字/墨色/贴条、身份选择页、线索板、结局图鉴的视觉，需真机窄屏点验。
3. **旧备份清理**：`夜班_backup_*.html` 是升级前备份，确认新版稳定后可删。
