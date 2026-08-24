# 夜班 · 截图对照 · 20260823（D13 重拍 after）

before = D10/D12 后、工作台 CSS 前（**保留未动**）。
after = D13 无 `?debug` 的 http 七晚公开路径重拍。

根目录：`visual/html-game-rule-horror/20260823-{zh|en}/`

污染旧 after 在 `_视觉美化/rejected-evidence/d13-debug-contaminated/`，不计矩阵。

| nn | slug | 中文 after | 英文 after | before |
|---|---|---|---|---|
| 01 | 01-boot-title · 标题 390 | 有 | 有 | `01-boot-title-before.png` |
| 01 | 01-boot-title-320 · 标题 320 | 有 | 有 | `01-boot-title-320-before.png` |
| 02 | 02-core-verb · 值班对话/选项 | 有 | 有 | — |
| 03 | 03-success-slip · 卖出小票 | 有 | 有 | — |
| 04 | 04-near-fail · 湿发「还是卖给他」后的 then+小票 | 有 | 有 | — |
| 05 | 05-recover · 吴保安仍在值班 | 有 | 有 | — |
| 06 | 06-narrow-320-in-shift · 320 值班 | 有 | 有 | — |
| 07 | 07-keyboard-focus · Tab 焦点 | 有 | 有 | — |
| 08 | 08-touch-targets · 390 触控 | 有 | 有 | — |
| 09 | 09-muted · 静 / ✕ | 有 | 有 | — |
| 10 | 10-non-color-state · 第1晚规页文字+编号 | 有 | 有 | — |
| 11 | 11-empty-or-loading · 无存档标题 | 有 | 有 | — |
| 12 | 12-error-or-pause · 锁定猫视角 | 有 | 有 | — |
| 13 | 13-person-job-rule · 人+身份+规钮 | 有 | 有 | — |
| 14 | 14-rules-listed · 展开后 ≥4 条 | 有 | 有 | — |
| 15 | 15-ink-fresh-pencil · 第3晚规 墨+铅笔 | 有 | 有 | — |
| 16 | 16-fake-mutex-qa · N/A 说明帧 | 有 | 有 | — |
| 17 | 17-group-submit-prep · 进货 | 有 | 有 | — |
| 18 | 18-near-answer-text · 规正文可回指 | 有 | 有 | — |
| 19 | 19-night1-rules · 第1晚省略 | 有 | 有 | — |
| 20 | 20-shift-flags-hud · 时间/晚/神智 | 有 | 有 | — |
| 21 | 21-clerk-ending-dawn · 七晚后 dawn | 有 | 有 | — |
| 22 | 22-role-line · 通关后标题选角 | 有 | 有 | — |

中英矩阵各 25 张（含 2 张 before）+ 辅助 `04-near-fail-options.png`（湿发三选项，无 warn class，不计 12+8 槽位）。

## 拍摄说明（D13）

- 设备像素比 2；视口 390×844 / 320×640。
- URL 仅 `http://127.0.0.1:9216/夜班.html` 与 `9217`，无 `?debug`。
- 01/11 清空存储后的标题。12 点锁定猫视角。
- 17 进货后未点开始值班。02/13/20/08/07/09 林阿姨屏。19 展开纸条前的规。
- 14/18/10 第1晚点「展开纸条」后打开规（`foundRules` 由选项写入，非 getState）。
- 15/16 第3晚打开规。16 = N/A 假互斥未做。
- 04 点真实选项「还是卖给他」，禁止临时 `.choice.warn`。
- 21 七晚手点到 `pickEnding` → 正常下班 / Clock out。禁止 `__ns.finish`。
- 22 通关后返回标题的真实解锁（dawn 不写其他身份；猫视角因任意结局解锁）。
- 每张输入/变化见 `D13返工记录.md`。
