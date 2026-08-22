# LOC_QA_REPORT — 新版游戏英文版2（10 游戏）

复检日期：2026-08-22（第二次过闸）。三副本去重后保留 `新版游戏英文版2/`（内容与 git 快照逐字节一致）。

## 结论

**10/10 通过 Gate L 机器验收。**

| 局 | lang | 全文汉字 | 界面中文 | 契约 | 存档key隔离 | 判定 |
|---|---|---|---|---|---|---|
| 地券密级 | en | 0 | 0 | ✓ | 无 ls | ✅ PASS_FOR_SOURCE_SNAPSHOT |
| 夜台听写 | en | 0 | 0 | ✓ | yt_en_end | ✅ |
| 新谱涂改 | en | 0 | 0 | ✓ | xinpugai-20260821-en | ✅ |
| 更衣柜手机 | en | 0 | 0 | ✓ | gys_en_ | ✅ |
| 牌位勘误 | en | 0 | 0 | ✓ | 无 ls | ✅ |
| 矿册定性 | en | 0 | 0 | ✓ | kc_*-en | ✅ |
| 腊月巡站 | en | 0 | 0 | ✓ | lazue_xunzhan_v1-en | ✅ |
| 过继上传 | en | 0 | 0 | ✓ | 无 ls | ✅ |
| 金罂同名 | en | 0 | 0 | ✓ | jy_*-en | ✅ |
| 香单分拣 | en | 0 | 0 | ✓ | 无 ls | ✅ |

## 验收项逐条

1. **零中文盲测** ✅ — 全库 0 汉字（含 `<script>` 全文统计），title/placeholder/noscript 0 汉字。
2. **lang=en** ✅ — 400 个 html 全覆盖。
3. **契约文件** ✅ — 10/10 `LOCALIZATION_CONTRACT.md` + `LOC_QA.md` 齐全。
4. **存档 key 隔离** ✅ — 版本化 `-en`/`_en` 后缀，与中文版不撞档。
5. **搜索英文-only + CamelCase token** ✅ — 各局 finder 接受拉丁/罗马化；搜索 token 单 CamelCase 单元（`RuiQiu`/`LinASheng`/`DaiHoushan` 等）。
6. **register 分层抽查** ✅ — 夜班日志碎片短句、官方公告被动公文腔、新闻报道导语体，三类声口不质。
7. **证据边界三档措辞** ✅ — `not established by these sources`(5 文件) / `cannot determine`(2) / `ruled out`(6) 分布合理；「Legend cannot close the case」边界守住。

## Unproven gates（未证明，不混报）

全部 10 局单列，机器未跑：
- 真人英文试玩（核心路径/冲突路径/超时）
- 读屏 / 纯键盘
- `file://` 各 OS 怪癖
- 真机触控 / 窄屏手势

样本：`金罂同名/LOC_QA.md` 明标 `NOT_PROVEN`: human playtest of the English edition (West / South / hold / report; Lime Kiln exclusion)。

## 实机验证（2026-08-22 补充，非静态脚本）

金罂同名英文版 playwright 实机走查：
- 入口 `introduction.html` title 全英文、`lang=en`、无 JS 错误、无死链。
- `desk/hall.html` 15 个导航链接全英文（Handover book / Claim form / WestHall 07 / oral notes…）。
- 搜索框 placeholder = `name / place / four-digit year`，纯英文无中文门槛。
- 英文 token 实测：`LinAsheng` 命中 14 条结果（"Machine found 14 titles"），`WuWanxiang`/`CementPlant`/`TeaStain` 均可提交到 `search-results.html` 正常返回。
- JS 零错误：外链 JS `node --check` 全过 + 184 个内联 script 块零语法错误。

结论：机器扫描 + 实机走查双轨，10/10 达到 `PASS_FOR_SOURCE_SNAPSHOT`。真人试玩仍未跑（Unproven）。

## 副本去重记录

`github游戏/` 下原有三个内容完全相同的英文版2 副本（676 文件 md5 全同）：
- `新游戏/英文版2/`（git track，权威，已 push `cbde411`）
- `新游戏英文版2/`（已删除）
- `新版游戏英文版2/`（保留，本轮 QA 工作区）

合计磁盘节省约一个副本体积。