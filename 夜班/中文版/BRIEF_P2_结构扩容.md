# BRIEF-P2：结构扩容（5晚 → 7晚）

> 本 brief 给 cursor-agent（Grok 4.6）执行。请在动手前通读 `project_state.md` 和 `人物事件节奏表.md`，理解现有代码结构后再改。

## 强制要求（cursor 内部工具选择，务必遵守）

**禁止使用 editToolCall 精确替换**（实测在 stream-json 模式下会因 `\n` 转义失配，6 次全失败）。
**必须改用 shellToolCall + Python 脚本**做文件修改：

```python
# 示例：精确替换 buildNight
import re
p = '夜班.html'
t = open(p, encoding='utf-8').read()
old = '''function buildNight(n, s) {
  if (n === 1) return night1(s);
  if (n === 2) return night2(s);
  if (n === 3) return night3(s);
  if (n === 4) return night4(s);
  return night5(s);
}'''
new = '''function buildNight(n, s) {
  if (n === 1) return night1(s);
  if (n === 2) return night2(s);
  if (n === 3) return night3(s);
  if (n === 4) return night4(s);
  if (n === 5) return night5(s);
  if (n === 6) return night6(s);
  return night7(s);
}'''
assert old in t, 'old 未找到'
open(p, 'w', encoding='utf-8').write(t.replace(old, new, 1))
```

每步修改都用这种「assert 校验 + Python 精确替换」的方式，改完立即用 `node -c` 或重新读文件验证语法。

## 任务目标

把《夜班·恒灯便利》（`夜班.html`）从 5 晚试岗扩容为 7 晚试岗周，并把原来挤在第 4~5 晚的高潮事件摊平到第 4/5/6 晚，恢复「阴冷潜伏感」。

## 现有代码结构（必须遵守的架构）

- 文件：`夜班.html`（12.36MB，单文件，base64 图片占 83%）
- 核心 JS 在文件偏移约 `4655688` 之后
- **数据驱动**：每晚一个函数 `night1()~night5()`，返回事件数组
- 事件类型：`prep`（开场叙述）、`phone`（短信）、`scene`（客人场景）
- scene 结构：`{ scene, portrait, name, tag, time, door, text, choices }`
- choice 结构：`{ label, need, do, then }`（need 是库存要求，do 是状态变更，then 是后续文本）
- 分发函数：`buildNight(n, s)` 目前 `if (n===1) return night1(s)` ... `return night5(s)`
- 状态：`newState()` 返回 `{ night, time, cash, sanity, rep, cat, stock, flags, upgrades, ... }`

## 现有五晚节奏（对照 `人物事件节奏表.md`）

- N1：林阿姨→王师傅→周晓晚→湿发男人→吴保安（教学+店规浮现）
- N2：王师傅→白裙女人→陈师傅→湿发男人→林阿姨（纸扎铺设定）
- N3：周晓晚→白裙女人→王师傅→中山装老人→王师傅折返（纸钱主线摊牌）
- N4：湿发男人→白裙女人→中山装老人→吴保安→陈师傅（防守夜，5事件挤爆）
- N5：林阿姨→周晓晚→白裙女人→中山装老人→王师傅（告别）

## 扩容要求

1. 新增 `night6()` 和 `night7()` 函数，改 `buildNight` 分发：
   ```js
   function buildNight(n, s) {
     if (n === 1) return night1(s);
     if (n === 2) return night2(s);
     if (n === 3) return night3(s);
     if (n === 4) return night4(s);
     if (n === 5) return night5(s);
     if (n === 6) return night6(s);
     return night7(s);
   }
   ```

2. **摊平高潮**：把原 N4 的 5 个密集事件（湿发男人借后间 / 白裙女人热骨灰盒 / 门外水汽倒影 / 「别开门」短信 / 中山装老人查岗）拆散：
   - N4 保留 2~3 个（湿发男人借后间、白裙女人第三次来）
   - N5 保留告别线（林阿姨桃子、周晓晚退租、小雅退硬币）
   - N6 承接：中山装老人查岗 + 「别开门」短信 + 门外水汽倒影
   - N7 收束：中山装老人结账「把灯交给愿意开着的人」+ 最终抉择

3. **新增 N6/N7 内容**（核心设定不变，只延展）：
   - N6「账本之夜」：店里出现一本不属于玩家的账本，记录着历代夜班的进货/盈亏，玩家发现自己的名字已经在账本上。店规被猫抓出新的痕迹。
   - N7「交班之夜」：中山装老人（恒老板）正式现身，揭示「老板=上一班没敢数钱的人」，最终抉择从 N5 移到 N7。

4. **状态字段**：`newState()` 里 `night` 初始仍为 1；`pickEnding` 和结算逻辑要兼容 7 晚（`time` 推进、`nightEarn/nightSell` 累计不变）。

5. **不破坏现有**：
   - 五条店规原文不动
   - 9 种商品、4 道具不动
   - 现有 6 结局判定 `pickEnding(s)` 不动（P4 阶段才扩结局）
   - 存档/读档逻辑 `persist/loadSave` 要能存 7 晚进度

## 验收标准（cursor 完成前自查）

- [ ] `buildNight` 能分发到 night6/night7
- [ ] 7 晚能完整走通（开局→进货→7晚→最终抉择→结局）
- [ ] 原 N4 事件已摊平，不再一晚 5 个灵异事件
- [ ] 存档能存到第 6、7 晚，刷新能读回
- [ ] 语法无错（浏览器能打开，无 console 报错）
- [ ] 五条店规原文、商品、道具、结局判定未变

## 禁止

- 不要改五条店规原文、不要改商品/道具数值、不要动 `pickEnding` 结局逻辑
- 不要动 base64 图片数据
- 不要重写引擎，在现有数据驱动架构上增量加 night6/night7
- 生图/文案/开发都用你当前模型（Grok 4.6）完成
