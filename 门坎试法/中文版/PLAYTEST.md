# PLAYTEST　专章 C

## 死锁　P0　过（代码轨）

从引言出发，登录、台面、试记、记录、九站书签、建议表都能走到。无 token 环。暗线不挡 hold-funeral。登录失败只留在登录页。缺丧证或缺踩踏证明，建议退回，不毁档。

## 歧义　P0　过（代码轨）

试记近答案：正常跨走演练页，不给 broke。  
建议近答案各有回单或退回句：放行 → let-in；改板 → rewrite；批准 → bounce-auth；喜+不放行 → bounce-nature；丧+干净 → bounce-record；无踩踏证明 → bounce-proof-step；无丧证 → bounce-proof-funer。不笼统通过。

## 提示不泄底　P1　过（第4折除外）

`desk/hint.html` 一至三折只指方向。第四折写出四栏，标明「能不看就不看」。不替玩家按提交。

## 解锁节奏　P1　过

不靠「第几次打开」。试记打回即留下 verified。刷新模拟：`verified.broke` 仍在 localStorage。回单只在提交后出现。

## 新手三问　P1　过（文本层）

引言同屏：我是柴渡；今夜交放行建议；工具是试记；先看板上的法与待记行。进台第一屏法、待记、试记钮同在。前步送试记打回，中段才对钥匙/短信/帖。无进度条，进度靠已证实黄条。

## 自己点过

- 文件链：相对地址缺页 0。
- 结局矩阵：hold-funeral（试记路径 / 记录页路径）、let-in、rewrite、四条退回，代码轨各至少一条。
- 浏览器（作者轨，http.server + Chrome headless，非盲测）：
  - 登录工号 `柴-0821` → `desk/home.html`。
  - 试记勾踩踏 → `desk/try-reject.html`。刷新后 `verified.broke=true`，黄条「已证实：法被撞过一次」仍在。
  - 打开 `phone/mu.html` 留下 `seen.sms`。
  - 回单 A：仪礼丧 / 过门已有踩踏 / 不放行 / 建议 → `desk/result-hold.html` 标题「回单·不放行」。
  - 回单 B：喜 / 干净 / 放行 / 建议 → `desk/result-letin.html` 标题「回单·放行」。
  - 回单 C：改板 → `desk/result-rewrite.html` 标题「回单·改板」。
- 窄屏 375 作者轨：黄页折行、百科词条收栏、功能机 240 居中。真机触控未测。
- 岔道仍未手点：姜篾投诉详读、黄页假按钮、邮箱上月灰信、四级提示第四折展开。标 still-untested。

## 信息层

先信喜可进，再被钥匙簿/短讯/帖推翻。记录里已有踩踏是第二层。阙禾的怕是暗线。limits 挡住把网页互对写成堂屋铁证。

## 结论

代码轨可走通。作者轨已连点三条回单并刷新留证。真人盲测 UNTESTED。不把作者轨写成盲测。
