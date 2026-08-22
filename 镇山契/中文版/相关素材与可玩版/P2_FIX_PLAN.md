# 镇山契 P2 打磨精确改法

目标文件（只改这一份，不改其它游戏文件）：

`镇山契_第九位到访者_v0_3_真实网页与可视证据版.html`

本方案按 `P2_BRIEF.md` 九条给出 **old → new**。行号以当前文件为准，实施时仍以关键词锚定。  
实施约定：主线程用 Python 做精确字符串替换；SVG 先解码 `data:image/svg+xml;base64,...`，改可见 `<text>`，再重新编码写回。

---

## 1. C5 终局 QA 清单腔

**关键词：** `最窄`、`不得推出`  
**核验：** 不需截图。改完后打开 B14、B18 第二屏、B10 回单、结局页，确认口头变成「经办人在下笔」，不是质检表头。

### 现状

施工单写的是终局面板。当前「最窄／不得推出」不只在 B18，玩家会在这几处看见同一套公文腔：

| 约行 | 位置 | 原文 |
|---|---|---|
| 8439 | B14 问题 `effect` 的 prompt | `最窄结论` |
| 8567 | B18 预览勾选项 `limits` | `现实结果与不得推出的民俗意义` |
| 8250 | B10 `resultLines` 第三条 label | `不得推出` |
| 8204 | B08 问题 `meaning` 的 prompt | `差值的最窄含义` |
| 11079 | 结局可选排除列表 | `：最窄连接已排除` |
| 8680 | F01 `conclusionPrompt` | `时间、材质和账务三类字段合起来，能排除哪一个最窄连接？` |
| 8699 | F02 `conclusionPrompt` | `这些形成与封存时间能排除哪一个最窄说法？` |
| 9564 | 假路径结论报错 | `这个结论超过了来源能排除的范围；请只关闭最窄连接。` |
| 10447 | B10 回单区块标题 | `完成态字段`（和「不得推出」同一张表） |

B08 提示句「不得从差值直接推出使用者或用途。」在提示抽屉里，玩家较少当表头读，本轮不改。

### 精确改法

**1a. B14 问题标题（终局前最后一次「最窄」表头）**

```
old: q("effect", "radio", "最窄结论",
new: q("effect", "radio", "眼下只能写到哪一步",
```

选项正文已是人话，不动。

**1b. B18 第二屏勾选项（终局面板本体）**

```
old: option("limits", "现实结果与不得推出的民俗意义")
new: option("limits", "这回实际能动什么、材料还说不清什么")
```

**1c. B10 回单第三条（玩家会当结论栏读）**

```
old: { status: "unsupported", label: "不得推出", text: "林文造成三名成人死亡。" },
new: { status: "unsupported", label: "材料撑不住", text: "林文造成三名成人死亡。" },
```

同函数里区块标题：

```
old: <h2 id="result-lines-title">完成态字段</h2>
new: <h2 id="result-lines-title">这一项核对完了什么</h2>
```

**1d. B08 问题标题（同一套 QA 腔，会在中段先露脸）**

```
old: q("meaning", "radio", "差值的最窄含义",
new: q("meaning", "radio", "这个差值眼下能说明什么",
```

**1e. 结局页可选排除**

```
old: return `<li>${escapeHtml(path ? path.title : "一条相关记录连接")}：最窄连接已排除</li>`;
new: return `<li>${escapeHtml(path ? path.title : "一条相关记录连接")}：这条说法已经对不上</li>`;
```

**1f. 假路径结论问句与报错（和终局同一声口）**

```
old: conclusionPrompt: "时间、材质和账务三类字段合起来，能排除哪一个最窄连接？",
new: conclusionPrompt: "时间、材质和账务合在一起，能先拿掉哪一条？",
```

```
old: conclusionPrompt: "这些形成与封存时间能排除哪一个最窄说法？",
new: conclusionPrompt: "这些形成和封存时间，能先拿掉哪一种说法？",
```

```
old: message: "这个结论超过了来源能排除的范围；请只关闭最窄连接。"
new: message: "这个结论比材料能排除的更远。先只关掉对得上的那一条。"
```

**不要动：** `WORLD.unresolved`、B18 第三屏「儿童死亡责任与额外超自然因果仍未决」、权限句「建议≠批准」。那些是边界，不是清单腔。

---

## 2. C6 「镜像未保留」机械重复

**关键词：** `FORUM_UI_META`、`镜像未保留`  
**核验：** 不需截图。打开论坛首页与 T4098／T4612 帖页，确认列表不再八行同一句，帖页作者只出现一次。

### 现状

约 L9737–9747。8 条帖的 `author` / `lastReply` 全是「镜像未保留」；7 条 `editState` 也是同一句。`FORUM_UI_FALLBACK` 五个字段全是「镜像未保留」。

上屏次数：

- 列表 `renderForumList`（约 L10570）：每行作者 + 最后回复
- 帖页 `renderForumRecord`（约 L10902–10911）：主楼作者、编辑记录、系统镜像员 `<dl>` 再写一遍作者／最后回复、页脚再写最后回复

T4098 的 `editState` 已是「镜像含编辑记录」，不要改回空话。侧栏已有一句总说明：「原站账号、附件与部分最后回复时间未保留。」（约 L10597）——保留，当作系统级解释。

另：`meta.replies === "镜像未保留"` 出现在 L10570、L10904。改 fallback 后必须改判断，否则「未计」会被拼成「未计回复」。

### 精确改法（采用 a：分字段变化措辞 + 减少帖页重复）

**2a. 整表替换 `FORUM_UI_META` / `FORUM_UI_FALLBACK`**

```
old:
  const FORUM_UI_META = Object.freeze({
    "FORUM-T4098": Object.freeze({ author: "镜像未保留", replies: "1", board: "旧事闲谈", lastReply: "镜像未保留", editState: "镜像含编辑记录" }),
    "FORUM-T4612": Object.freeze({ author: "镜像未保留", replies: "9", board: "转帖区", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-T5220": Object.freeze({ author: "镜像未保留", replies: "24", board: "木工杂谈", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-N-VEG": Object.freeze({ author: "镜像未保留", replies: "11", board: "街坊互助", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-N-BIKE": Object.freeze({ author: "镜像未保留", replies: "7", board: "问路", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-N-POWER": Object.freeze({ author: "镜像未保留", replies: "31", board: "生活", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-N-REUNION": Object.freeze({ author: "镜像未保留", replies: "46", board: "校友", lastReply: "镜像未保留", editState: "镜像未保留" }),
    "FORUM-N-FISH": Object.freeze({ author: "镜像未保留", replies: "14", board: "钓友", lastReply: "镜像未保留", editState: "镜像未保留" }),
  });
  const FORUM_UI_FALLBACK = Object.freeze({ author: "镜像未保留", replies: "镜像未保留", board: "镜像未保留", lastReply: "镜像未保留", editState: "镜像未保留" });

new:
  const FORUM_UI_META = Object.freeze({
    "FORUM-T4098": Object.freeze({ author: "旧帖无署名", replies: "1", board: "旧事闲谈", lastReply: "回复时间未收录", editState: "镜像含编辑记录" }),
    "FORUM-T4612": Object.freeze({ author: "转帖人佚名", replies: "9", board: "转帖区", lastReply: "末帖时间未存", editState: "未见改帖记录" }),
    "FORUM-T5220": Object.freeze({ author: "原ID未保留", replies: "24", board: "木工杂谈", lastReply: "最后一帖时间佚失", editState: "是否编辑未标明" }),
    "FORUM-N-VEG": Object.freeze({ author: "街坊号佚失", replies: "11", board: "街坊互助", lastReply: "互助帖时间未存", editState: "未见编辑痕" }),
    "FORUM-N-BIKE": Object.freeze({ author: "问路帖佚名", replies: "7", board: "问路", lastReply: "末层时间未收录", editState: "编辑记录未存" }),
    "FORUM-N-POWER": Object.freeze({ author: "生活区佚名", replies: "31", board: "生活", lastReply: "回复钟点未存", editState: "未见改帖" }),
    "FORUM-N-REUNION": Object.freeze({ author: "校友ID未留", replies: "46", board: "校友", lastReply: "聚会帖时间佚失", editState: "编辑记录缺失" }),
    "FORUM-N-FISH": Object.freeze({ author: "钓友署名未留", replies: "14", board: "钓友", lastReply: "末帖钟点未存", editState: "未见改帖记录" }),
  });
  const FORUM_UI_FALLBACK = Object.freeze({ author: "佚名", replies: "未计", board: "未分类", lastReply: "时间未存", editState: "未见编辑记录" });
```

**2b. 列表／帖页回复数判断（两处相同 old）**

```
old: const replyLabel = meta.replies === "镜像未保留" ? meta.replies : `${meta.replies}回复`;
new: const replyLabel = /^\d+$/.test(meta.replies) ? `${meta.replies}回复` : meta.replies;
```

**2c. 帖页减少重复：系统镜像员 `<dl>` 不再重写作者**

在 `renderForumRecord` 内：

```
old: <div><dt>版面</dt><dd>${escapeHtml(meta.board)}</dd></div><div><dt>作者</dt><dd>${escapeHtml(meta.author)}</dd></div><div><dt>回复数</dt><dd>${escapeHtml(meta.replies)}</dd></div><div><dt>最后回复时间</dt><dd>${escapeHtml(meta.lastReply)}</dd></div>
new: <div><dt>版面</dt><dd>${escapeHtml(meta.board)}</dd></div><div><dt>回复数</dt><dd>${escapeHtml(meta.replies)}</dd></div><div><dt>最后回复</dt><dd>${escapeHtml(meta.lastReply)}</dd></div>
```

主楼 `<b>${escapeHtml(meta.author)}</b>` 保留一次。页脚 `最后回复：${...}` 保留一次（措辞已按帖变化）。

**2d. 字段缺省（约 L10960–10962，新闻校正页，不是论坛，但同一占位句）**

```
old: const before = Object.prototype.hasOwnProperty.call(record.fields, "before") ? record.fields.before : "镜像未保留";
     const after = Object.prototype.hasOwnProperty.call(record.fields, "after") ? record.fields.after : "镜像未保留";
     const imageChanged = Object.prototype.hasOwnProperty.call(record.fields, "imageChanged") ? record.fields.imageChanged : "镜像未保留";
new: const before = Object.prototype.hasOwnProperty.call(record.fields, "before") ? record.fields.before : "原字段未著录";
     const after = Object.prototype.hasOwnProperty.call(record.fields, "after") ? record.fields.after : "原字段未著录";
     const imageChanged = Object.prototype.hasOwnProperty.call(record.fields, "imageChanged") ? record.fields.imageChanged : "未著录";
```

改完后文件内不应再出现「镜像未保留」。

---

## 3. C8 工作台已结束仍写「先搜阿山」

**关键词：** `先搜阿山再回单`、`先搜「阿山」`  
**核验：** 不需截图也能从代码确认。建议顺手打开结束态工作台看站点列表。

### 现状

页脚（约 L10288）上一轮已经按 `searchedMain || state.ending` 分支，**结束态不会再写「先搜阿山再回单」**。

仍死写的是公开站点列表（约 L10279）：

```
<li><a href="#/forum">槐水人家</a><span>先搜「阿山」</span></li>
```

试玩截图 `90_33_mobile_workbench.png` 标的就是这一行。任务轨标题（L10251）结束态已是「本轮明确回执」，不用动。

### 精确改法

**3a. 站点列表随状态变**

```
old: <li><a href="#/forum">槐水人家</a><span>先搜「阿山」</span></li>
new: <li><a href="#/forum">槐水人家</a><span>${state.ending ? "工单已结束，站点可复查" : searchedMain ? "可复查旧帖" : "先搜「阿山」"}</span></li>
```

**3b. 页脚结束态改中性（现有分支把结束态也叫「继续办理当前项」，和已办结不符）**

页脚同一行里的链接文案：

```
old: ${searchedMain || state.ending ? "继续办理当前项" : "先搜阿山再回单"}
new: ${state.ending ? "查看本轮回执" : searchedMain ? "继续办理当前项" : "先搜阿山再回单"}
```

href 现有 `searchedMain || state.ending ? currentHref : "#/forum"` 已正确：结束态 `currentHref` 指向 `#/end/...`。不要改 href。

---

## 4. C9 drawingSet 字段值仍是英文

**关键词：** `drawingSet`  
**核验：** 打开地质库记录 `GEO-PLAN-OLD`（`#/geology/record/TEMPLE-SURVEY-1998`），看「图纸套」右侧。字段值本身不需截图；若仍看见英文，那是图内图层代码，归第 9 条 I3。

### 现状（本轮复读结果）

| 约行 | 内容 | 现状 |
|---|---|---|
| 10764 | `SITE_FIELD_LABELS.geology.drawingSet` | 已是中文标签「图纸套」 |
| 7787 | `GEO-PLAN-OLD.fields.drawingSet` | **已是中文值**「外轮廓／内墙线／墙厚／已编号房间」 |

文件里没有第二处 `drawingSet` 字段值，也没有英文代码可替换。施工单写的「字段值还是英文代码」，与当前文件不符——P1 补标签时值已经中文化。同页 SVG 图例仍有 `OUTLINE-98` / `INNER-BASE-98` / `TEMPLE-SURVEY-1998`，那是 I3，不是这个字段。

### 精确改法

**本项对字段值：无需替换。**

实施脚本若按英文 old 去搜，会找不到。不要为了交差改已经正确的中文值。

可选、非必须：同条 `coordinate: "HX-54/本地校正"` 斜杠不统一，可顺手：

```
old: coordinate: "HX-54/本地校正"
new: coordinate: "HX-54／本地校正"
```

这不是 C9 阻塞项。

---

## 5. C7 「滑坡」vs「坡移」叫法不一致

**关键词：** `滑坡`、`坡移`  
**核验：** 不需截图。搜「滑坡」仍必须打开 `GEO-SLIDE-1998`。地质报告标题与工单 B01「滑坡卷」必须是同一个词。

### 现状

同一件事两套叫法：

- **滑坡**（玩家入口）：落地 `caseLine` L7274「挂在滑坡卷下」；B01「1998滑坡原始卷号」「滑坡卷」；`searchKeywords` L8869 `["滑坡", "北坡"]`
- **坡移**（报告／后段）：`GEO-SLIDE-1998` 题名／摘要／正文；B17 选项；R5；F03／F05；`unresolved` L8844

统一为 **「滑坡」**。理由：交接单和搜词已经教会玩家这个词；地质页另造「坡移」会让人以为不是同一份卷。机制仍可写「页岩软化、坡脚冲刷」，不必再给事件第二个名字。

`searchKeywords` 的「滑坡」保留。不要改成「坡移」，否则落地词搜不中。

### 精确改法（全部「坡移」→「滑坡」）

```
old: title: "北坡局部坡移首次报送与自然条件",
new: title: "北坡局部滑坡首次报送与自然条件",
```

```
old: summary: "北坡旧界段局部坡移首报，报送时间1998-07-19 23:41。",
new: summary: "北坡旧界段局部滑坡首报，报送时间1998-07-19 23:41。",
```

```
old: "报告范围：坡移时间、位置、变形量及工程地质条件。未设民俗或人员身份调查栏。",
new: "报告范围：滑坡时间、位置、变形量及工程地质条件。未设民俗或人员身份调查栏。",
```

```
old: option("cause", "时间相合证明超自然导致坡移")
new: option("cause", "时间相合证明超自然导致滑坡")
```

```
old: text: "BP-1998-0719的累计降雨、页岩软化、渗水和坡脚冲刷已足以解释局部坡移。
new: text: "BP-1998-0719的累计降雨、页岩软化、渗水和坡脚冲刷已足以解释局部滑坡。
```

```
old: option("slope", "北坡会发生自然坡移")
new: option("slope", "北坡会发生自然滑坡")
```

```
old: boundary: "只确认案前文本，不证明它会造成坡移。",
new: boundary: "只确认案前文本，不证明它会造成滑坡。",
```

```
old: option("slope-cause", "残句造成1998坡移")
new: option("slope-cause", "残句造成1998滑坡")
```

```
old: "1998及A分支坡移是否含额外超自然作用",
new: "1998及A分支滑坡是否含额外超自然作用",
```

改完后全文搜「坡移」应为 0。B01／落地／搜词里的「滑坡」不动。

---

## 6. T1 窄屏论坛检索框不在首屏

**关键词：** `forum-search-row`、`forum-ops-sidebar`、`forum-operations-shell`  
**核验：需要 Chrome headless 390px 截图。** 打开 `#/forum`，检索框必须落在首屏（masthead／工具条之下立刻可见），登录盒不得再把搜框顶到折叠之后。

### 现状

DOM 顺序（约 L10596–10598）：

1. `aside.forum-ops-sidebar`：登录盒 + 版面树 + 镜像限制  
2. `section.forum-board-main`：里面才是 `<form class="forum-search-row">`

桌面是 212px 侧栏，搜框在右栏顶部，没问题。  
`@media (max-width: 900px)`（约 L2884）把 `.forum-operations-shell` 收成单列，侧栏因此**整块叠在搜框上面**。  
`@media (max-width: 620px)` 侧栏再收成一列，登录盒单独就很高。  
`@media (max-width: 680px)` 里 `.forum-search-row { grid-template-columns: 1fr; }`（约 L6607）只改表单内部栅格，**不改变它在页面上的位置**。

根因是 DOM 顺序 + 窄屏单列，不是搜框自己的宽高。

### 精确改法（只改 CSS 规则，不改 HTML）

**6a. 已有 `@media (max-width: 900px)` 块（约 L2884，已包含 `.forum-operations-shell`）末尾追加：**

```
old: （该媒体查询内目前没有 .forum-board-main { order: ... }）
new:   .forum-board-main {
    order: -1;
  }
```

`.forum-operations-shell` 本身已是 `display: grid`，`order: -1` 会把带搜框的主栏排到登录盒前面。桌面双列不受影响（order 只改变源序，两列时主栏仍在第二列）。

**6b. 已有 `@media (max-width: 390px)` 块（约 L2976）追加，去掉首屏占位最大、且禁用的登录盒：**

```
old: （该媒体查询内目前没有 .forum-login-box 规则）
new:   .forum-login-box {
    display: none;
  }
```

登录盒按钮本来就是 `disabled`「镜像站不可登录」，窄屏不提供可玩信息。版面树和镜像限制说明仍留在搜框下面。

不要改 `.forum-search-row` 自己的 `grid-template-columns` 来「解决问题」——那解决不了首屏。

---

## 7. T2 落地按钮 aria 不一致

**关键词：** `start-session`、`签收工单`、`继续建立复核会话`  
**核验：需要 Chrome headless。** 落地页可见按钮是「签收工单」；无障碍名（`aria-label` 或可访问名称）必须同文。工作台保存按钮同样核一次。

### 现状（不一致处）

| 约行 | 控件 | 可见文案 | aria-label |
|---|---|---|---|
| 7277 + 10180 | 落地主按钮 `data-action="start-session"` | `entryCopy.startLabel` = **签收工单** | **继续建立复核会话** |
| 10392 | 面板保存主按钮 `type="submit"` | `保存本项回单`（或 `beat.actionLabel`） | **核对并保存本面板** |

模板还把缺省可见文案写成「继续建立复核会话」，和 `entryCopy.startLabel` 打架。

其它 `aria-label`（工具栏、栏目、日历）是区域名，不是按钮可见文案，不改。

### 精确改法

**7a. 落地主按钮（L10180）—— aria 跟可见字走**

```
old: <button class="primary-action" type="button" data-action="start-session" aria-label="继续建立复核会话">${escapeHtml(entry.startLabel || "继续建立复核会话")}</button>
new: <button class="primary-action" type="button" data-action="start-session" aria-label="${escapeAttr(entry.startLabel || "签收工单")}">${escapeHtml(entry.startLabel || "签收工单")}</button>
```

`entryCopy.startLabel` 保持 `"签收工单"`，不要改回「继续建立复核会话」。

**7b. 面板保存主按钮（L10392）**

```
old: <button class="primary-action" type="submit" aria-label="核对并保存本面板">${escapeHtml(beat.actionLabel || workbenchCopyValue("saveLabel", "保存本项回单"))}</button>
new: <button class="primary-action" type="submit" aria-label="${escapeAttr(beat.actionLabel || workbenchCopyValue("saveLabel", "保存本项回单"))}">${escapeHtml(beat.actionLabel || workbenchCopyValue("saveLabel", "保存本项回单"))}</button>
```

原则：有可见字的按钮，`aria-label` 必须等于可见字；不要另写一套系统动词。

---

## 8. I2 证据图「同件另挂」未标注

**关键词：** `renderEvidenceVisual`、`visualPresentationByRecord`、`additionalVisualAssetsByRecord`  
**核验：需要视觉核验。** 至少打开：民俗 1964／1974／2026 勘误、`SRC-COV-HUMAN`、`SRC-AV04-TRANSCRIPT`、`SRC-LIB-BOUND-1982`、`SRC-FIBER-LEDGER`。原件页无「同件另挂」；另挂页 caption 下必须有一行。

### 现状

16 条记录有主图，6 条另有附图，加 fallback，一共 **32 次引用、12 张独特 SVG**。重复使用没有「同件另挂」。

原件判定：以该图第一次作为 **primary** 出现的记录为准（fallback 同 id 不算另挂）。

| 图（内容） | 原件（不标） | 另挂（要标） |
|---|---|---|
| 1964 轮灯整页 | `FOLK-1964-LAMP` 主图 | `SRC-COV-HUMAN` 主图 |
| 1974 覆写整页 | `FOLK-1974-LATE` 主图 | `FOLK-VERSION-2026` 附图、`SRC-COV-HUMAN` 附图 |
| 三处细部对照 | `FOLK-VERSION-2026` 主图 | `FOLK-1964-LAMP` 附图、`FOLK-1974-LATE` 附图 |
| 1982 整版 | `NEWS-1982-NIGHT` 主图 | `SRC-LIB-BOUND-1982` 主图 |
| AV-04 波形 | `SRC-AV04-WAVE` 主图 | `SRC-AV04-TRANSCRIPT` 主图 |
| 门痕迹记录页 | `SRC-DOOR-TRACES` 主图 | `SRC-FIBER-LEDGER` 主图 |
| 配准叠图 | `SRC-EXIT-2326` 主图 | `SRC-BOUNDARY-MAP` 附图 |
| F-02 离场路线 | `SRC-U1-FOOTPRINT` 主图 | `SRC-EXIT-2326` 附图（fallback `SRC-EXIT-2326` 与此同图，同记录不标） |

独有主图不标：`NEWS-BF11`、`GEO-PLAN-OLD`、`SRC-BOUNDARY-MAP` 主图、`SRC-DOOR-PARTS`。

### 精确改法

**8a. 在 `normalizeVisualAsset` 旁增加家族表（约 L9967 前）**

```
old: （无此常量）
new:
  const EVIDENCE_SAME_OBJECT = Object.freeze({
    "SRC-COV-HUMAN": Object.freeze({ of: "FOLK-1964-LAMP", note: "同件另挂 · 原件见民俗站《北坡三户轮灯簿与守更例》" }),
    "SRC-AV04-TRANSCRIPT": Object.freeze({ of: "SRC-AV04-WAVE", note: "同件另挂 · 原件见附件《AV-04波形与双报时标记》" }),
    "SRC-LIB-BOUND-1982": Object.freeze({ of: "NEWS-1982-NIGHT", note: "同件另挂 · 原件见旧报《地方材料拾零：三宿交牌残句》" }),
    "SRC-FIBER-LEDGER": Object.freeze({ of: "SRC-DOOR-TRACES", note: "同件另挂 · 原件见附件《门闩纤维、划痕与清单摘录》" }),
  });
  const EVIDENCE_SAME_OBJECT_ADDITIONAL = Object.freeze({
    "FOLK-VERSION-2026": Object.freeze({ of: "FOLK-1974-LATE", note: "同件另挂 · 原件见民俗站《三基一守条目（来源层待核的后出文本）》" }),
    "SRC-COV-HUMAN": Object.freeze({ of: "FOLK-1974-LATE", note: "同件另挂 · 原件见民俗站《三基一守条目（来源层待核的后出文本）》" }),
    "FOLK-1964-LAMP": Object.freeze({ of: "FOLK-VERSION-2026", note: "同件另挂 · 原件见民俗站《版本记录：1974条目来源层勘误》" }),
    "FOLK-1974-LATE": Object.freeze({ of: "FOLK-VERSION-2026", note: "同件另挂 · 原件见民俗站《版本记录：1974条目来源层勘误》" }),
    "SRC-BOUNDARY-MAP": Object.freeze({ of: "SRC-EXIT-2326", note: "同件另挂 · 原件见附件《1998救援平面与23:26离场线》" }),
    "SRC-EXIT-2326": Object.freeze({ of: "SRC-U1-FOOTPRINT", note: "同件另挂 · 原件见附件《F-02连续足迹与缺趾字段》" }),
  });
```

**8b. 改 `renderEvidenceVisual` 的 figure 输出（约 L10000–10003）**

现在每张图只输出 caption／alt。改为：主图看 `EVIDENCE_SAME_OBJECT[record.id]`，`index > 0` 的附图看 `EVIDENCE_SAME_OBJECT_ADDITIONAL[record.id]`。

在 `<figcaption>` 内 `</strong>` 之后追加（有 note 才写）：

```
old: <figcaption><strong>${escapeHtml(asset.caption)}</strong>${asset.alt !== asset.caption ? `<span class="evidence-alt-equivalent">图像等价说明：${escapeHtml(asset.alt)}</span>` : ""}</figcaption>
new: <figcaption><strong>${escapeHtml(asset.caption)}</strong>${sameNote ? `<span class="evidence-same-object">${escapeHtml(sameNote)}</span>` : ""}${asset.alt !== asset.caption ? `<span class="evidence-alt-equivalent">图像等价说明：${escapeHtml(asset.alt)}</span>` : ""}</figcaption>
```

其中 `sameNote`：

```
const sameNote = index === 0
  ? (EVIDENCE_SAME_OBJECT[record.id] && EVIDENCE_SAME_OBJECT[record.id].note)
  : (EVIDENCE_SAME_OBJECT_ADDITIONAL[record.id] && EVIDENCE_SAME_OBJECT_ADDITIONAL[record.id].note);
```

**8c. CSS（`.evidence-alt-equivalent` 旁，约 L2465）**

```
old: （无）
new:
.evidence-same-object {
  color: #4a524e;
  font-weight: 700;
}
```

不要为另挂页再复制一份 SVG。本项只加标注。

---

## 9. I3 图内英文图层代码 + 过精像素

**关键词：** `TEMPLE-SURVEY-1998`、`AV-04`、`OUTLINE-98`、`px`  
**核验：需要视觉核验。** 打开 `GEO-PLAN-OLD`、`SRC-AV04-WAVE`、`SRC-DOOR-PARTS`、`SRC-DOOR-TRACES`、`FOLK-VERSION-2026` 细部对照、`SRC-EXIT-2326`。图面不应再出现 CAD 式英文层名和「704 px」「0.5888889 px/s」这类制作痕迹。档号（AV-04、BF-11、F-02、HX-54）可保留，但必须跟中文。

实施：对 `visualPresentationByRecord` / `additionalVisualAssetsByRecord` / `FALLBACK_VISUAL_ASSETS` 里对应 base64 **解码 → 改 `<text>` → 再编码**。三处若共用同一份 SVG，改一份、三处同步写回。SVG 注释里的 px 公式玩家看不见，可不动。

保留的在世档号：`AV-04`、`BF-11`、`F-02`、`HX-54`、`E98-P-017`、`E1`–`E6`（事件段代号，正文已用）。

### 9a. GEO-PLAN-OLD 测绘图（hash `6c69e7976a`，主图 + fallback）

可见 `<text>` old → new：

| old | new |
|---|---|
| `旧庙建筑复测平面 TEMPLE-SURVEY-1998` | `旧庙建筑复测平面 测图号：旧庙复测-1998` |
| `测绘日期 1998-08-04 坐标 HX-54／本地校正 统一比例 40 px/m 单位：米` | `测绘日期 1998-08-04 坐标 HX-54／本地校正 图上40格＝1米 单位：米` |
| `17.60 m / 704 px` | `外宽 17.60米` |
| `15.24 m / 609.6 px` | `内宽 15.24米` |
| `6.80 m / 272 px` | `北墙段长 6.80米` |
| `12.40 m / 496 px` | `外深 12.40米` |
| `1.18 m / 47.2 px` | `北墙段厚 1.18米` |
| `SCALE 40 px/m` | `比例 40格／米` |
| `OUT-W 17.60 m` | `外宽 17.60米` |
| `OUT-H 12.40 m` | `外深 12.40米` |
| `IN-W 15.24 m` | `内宽 15.24米` |
| `IN-H 10.04 m` | `内深 10.04米` |
| `N-03-L 6.80 m` | `北-03 长 6.80米` |
| `N-03-D 1.18 m` | `北-03 厚 1.18米` |
| `图层：OUTLINE-98 / INNER-BASE-98 / N-03 比例复算：长度像素÷40=米 坐标表与草图页同批归档` | `图层：外轮廓-98／内墙底线-98／北-03　读数以米为准，勿按预览宽度量取　坐标表与草图页同批归档` |

图内测点短标 `N-03` → `北-03`（仅这一处可见短标）。

### 9b. SRC-AV04-WAVE／SRC-AV04-TRANSCRIPT 波形（hash `79212d04f1`）

| old | new |
|---|---|
| `AV-04 走带波形复核图` | `录音带AV-04 走带波形复核图` |
| `记录日 1998-07-16 介质副本 AV-04-D1 主轴校准：22:30→23:00 线性` | `记录日 1998-07-16 介质副本 录音带AV-04正本 主轴校准：22:30→23:00` |
| `主轴比例：1060 px / 1800 s = 0.5888889 px/s E5 x=1133.333333 E6 x=1135.688889 Δx=2.355556 px` | `主轴按两处报时点对齐。E5、E6只标相对先后，不标像素坐标。` |
| `事件标记表 / AV04-T` | `事件标记表` |
| `Z1局部放大窗 E5—E6 独立标尺 60 px/s` | `局部放大窗 E5—E6 独立时间尺` |

`22:30` `23:00` `E1`–`E6` 保留。不要把 AV-04 从附件题名里删掉，只改图内图层／像素行。

### 9c. SRC-DOOR-PARTS（hash `d2325ece4d`）

| old | new |
|---|---|
| `DOOR-98-A 构件检尺与剖面` | `门体检尺98甲 构件检尺与剖面` |
| `暂托销 Ø8 mm` | `暂托销 直径8毫米` |
| `Ø8.0 mm` | `直径8.0毫米` |
| `导向环／2.6 mm绳` | `导向环／绳径2.6毫米` |
| `门缝净宽 3.1 mm` | `门缝净宽 3.1毫米` |
| `绳径 2.6 mm / 销径 8.0 mm` | `绳径 2.6毫米／销径 8.0毫米` |
| `槽口 42 mm` | `槽口 42毫米` |
| `木杠146 cm／5.9 kg；暂托销Ø8 mm；绳Ø2.6 mm；门扇向内开启；东侧承槽带止退背板。` | `木杠146厘米／5.9千克；暂托销直径8毫米；绳径2.6毫米；门扇向内开启；东侧承槽带止退背板。` |

`146 cm` 单独尺寸字可改为 `146厘米`。检尺数字保留，去掉 Ø 和英文图名。

### 9d. SRC-DOOR-TRACES／SRC-FIBER-LEDGER（hash `9e74d1b4b1`）

| old | new |
|---|---|
| `DOOR-98-A 痕迹观察表` | `门体检尺98甲 痕迹观察表` |
| `来源 SRC-DOOR-TRACES 1998-07-17 观察项：销颈／导向环／销体／门缝与地面` | `来源 门闩痕迹记录页 1998-07-17 观察项：销颈／导向环／销体／门缝与地面` |
| `比对组：D03-NECK / RING-IN` | `比对组：销颈D03／内侧环` |
| `样点：D03-NECK-A／D03-NECK-B 封片序号 17-04。` | `样点：销颈甲／销颈乙 封片序号 17-04。` |
| `样点：RING-IN-A／RING-IN-B 封片序号 17-05。` | `样点：内侧环甲／内侧环乙 封片序号 17-05。` |
| `观察号：PIN-SCR-03 斜射光方向与销轴平行。` | `观察号：销体擦痕-03 斜射光方向与销轴平行。` |
| `观察号：GAP-FLOOR-02 门缝与地面连续拍摄。` | `观察号：门缝地面-02 门缝与地面连续拍摄。` |
| `收取批次：1998-07-17 / DOOR-98-A 复核图层：2026-DIG-03` | `收取批次：1998-07-17／门体检尺98甲 复核图层：2026数字化-03` |
| `样点链：D03-NECK → RING-IN → PIN-SCR → GAP-FLOOR 原图与文字观察分层保存` | `样点链：销颈 → 内侧环 → 销体擦痕 → 门缝地面 原图与文字观察分层保存` |

`5 mm` → `5毫米`。

### 9e. FOLK-VERSION-2026 细部对照（hash `4b5518a97f`，也作 1964／1974 附图）

| old | new |
|---|---|
| `相对尺度 20 mm` | `相对尺度 20毫米` |
| `L0 / CR-64-A` | `底本层／1964-甲` |
| `L1 / OW-74-A` | `覆写层／1974-甲` |
| `L0 / CR-64-B` | `底本层／1964-乙` |
| `L1 / OW-74-B` | `覆写层／1974-乙` |
| `L0 / CR-64-C` | `底本层／1964-丙` |
| `L2 / PATCH-74-C` | `贴补层／1974-丙` |
| `采样号：CROP-A / CROP-B / CROP-C 成像：斜射光＋同尺度数字摹绘` | `采样号：细部甲／细部乙／细部丙 成像：斜射光＋同尺度数字摹绘` |

### 9f. SRC-EXIT-2326 主图＝配准叠图（hash `3603b511ee`，也是 BOUNDARY 附图）

| old | new |
|---|---|
| `L1 BOUND-64` | `甲线 1964旧界` |
| `GRID HX-54` | `格网 HX-54` |
| `FILM OFF` | `底片未参与` |
| `叠合参数：HX-54 / LOCAL-CORR L1基点3处 L2门槛基线1条 FILM=OFF` | `叠合参数：HX-54／本地校正 甲线基点3处 乙线门槛基线1条 底片未参与` |

`L1：1964北坡旧界 L2：1998救援F-02` 已是中文，保留。`P07`／`P17` 测点号可保留。

### 9g. SRC-U1-FOOTPRINT 主图＝离场路线（hash `4d50d60463`，也是 EXIT 附图）

| old | new |
|---|---|
| `附件 SRC-EXIT-2326 测量编号 F-02 单位：米 图上为北` | `附件 离场路线图 测量编号 F-02 单位：米 图上为北` |
| `AV04-T：相对计时` | `录音带时序：相对计时` |
| `PORCH-02：门廊痕迹` | `门廊-02：门廊痕迹` |
| `BASE-S：南门槛基线` | `南门槛基线` |
| `F-02路径含显式顶点P17=(435,560) 时间字段23:26 图层：足迹／门槛基线／门廊痕迹／AV04-T` | `F-02路径过门槛测点P17 时间字段23:26 图层：足迹／门槛基线／门廊痕迹／录音带时序` |

去掉 `(435,560)` 这种制图坐标。

### 9h. 1974 覆写整页页脚（hash `e18ba371ad`）

| old | new |
|---|---|
| `数字化记录：E98-P-017／覆写层摹绘／显微层位编号 OBS-LAYER-74／来源层另表登记。` | `数字化记录：E98-P-017／覆写层摹绘／显微层位编号 观测层-74／来源层另表登记。` |

`NEWS-BF11` 的「条号 BF-11」是袋号，保留。`HXRB-1982-06 / FRAME 118` 可改为 `槐县报1982-06／第118帧`（`NEWS-1982-NIGHT`／`SRC-LIB-BOUND-1982` 同图）。

改完后图内不应再出现：`TEMPLE-SURVEY-1998`、`OUTLINE-98`、`INNER-BASE-98`、`OUT-W`、`SCALE`、`px/s`、`px/m`、`LOCAL-CORR`、`FILM=OFF`、`CROP-A`、`D03-NECK`、`PORCH-02`、过精小数像素。

---

## 实施顺序与回归

1. C5 文案（纯字符串，先做）  
2. C6 论坛 meta + 判断 + 帖页 dl  
3. C7 坡移→滑坡  
4. C8 工作台两处条件文案  
5. C9 **跳过字段值**（已中文）  
6. T2 aria  
7. T1 CSS `order` + 390px 藏登录盒  
8. I2 同件另挂常量表 + `renderEvidenceVisual` + 一行 CSS  
9. I3 解码改 SVG 再编码（最后做，避免和 I2 抢同一段 caption）

回归（实施线程执行，本方案不改游戏）：

- 搜「阿山」「滑坡」仍打开原隐藏页  
- B18 勾选 `limits` 的 value 仍是 `"limits"`，只改 label  
- 论坛回复数「1回复」仍正常；T4098 编辑记录仍在  
- 结束态工作台站点列表不再出现「先搜「阿山」」  
- 390px 论坛首屏能看见搜框  
- 落地按钮可访问名称＝「签收工单」

### 核验分工

| 项 | 实玩／截图 |
|---|---|
| C5 C6 C7 C8 C9 | 代码对读即可；C8 建议看一眼结束态工作台 |
| **T1** | **必须** Chrome headless 390×844，`#/forum` 首屏截图 |
| **T2** | **必须** 落地页截图 + 读按钮 computed name（可见「签收工单」，aria 同文） |
| **I2** | **必须** 视觉：原件无标、另挂有「同件另挂」 |
| **I3** | **必须** 视觉：测绘图／波形／门图不再露出英文层名和 px 公式 |
