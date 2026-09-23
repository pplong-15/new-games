# 生成源收尾验证

结果：PASS。生成源收尾修改游戏内 `_gen` 的以下 5 个文件，没有运行正式目录的生成器。后续经主审要求追加的 3 张条件分支目标已直接同步 `catalog-case56.js` 并重新冻结；此次往返只校验最新冻结内容，不写正式运行源码。

- `_gen/build-case56.js`：`normalize` 保留 `enemy` / `ally` 两种合法 `target`；非法值报错，避免静默丢失目标要求。
- `_gen/case5-cards.json`
- `_gen/case6-cards.json`
- `_gen/ritual-cards.json`
- `_gen/inject-payload.json`

本轮 8 项使用窗口修复和 11 项目标修复涉及 17 张不同的牌（`c6x35` / `c6x36` 重叠）。除了 `target` / `unlock` / `sourceScene`，对应奖励来源、响应类型、`c6x77` 的 `route` 效果，以及 `text` / `shortText` / `buildRole` / `designEffect` / `catalogRule.effectText` 均同步到冻结运行数据。

首次临时重建还查出 5 处旧生成源的多余目标标记：`c5x36`、`c5x51`、`c5x68`、`c6x73`、`c6x75`。旧生成器一直丢弃这些字段，冻结运行版走群攻或自动威胁选择。本次删除这 5 处源数据的 `target`，保持当前运行语义，避免开启目标透传后意外改变这些牌的可用性或选取流程。

验证使用 `generator-roundtrip.cjs`：复制生成器、3 份牌源、注入数据和只读依赖 `case5-reclass.json` 到审查目录下的临时副本，再启动副本的生成器。随后以忽略对象属性顺序、保留数组顺序的深比较检查：

1. 正式 `_gen/inject-payload.json` 与冻结 `catalog-case56.js` 的 PAYLOAD 完全一致。
2. 副本重建得到的注入数据与冻结 PAYLOAD 完全一致：第五案 77 张、第六案 79 张、法事链 8 张、归类记录 7 条。
3. 副本生成的 `catalog-case56.js` 内嵌 PAYLOAD 同样完全一致。
4. 仅在临时源数据注入非法 `target=not-a-target`，生成器以退出码 1 拒绝，并明确指出 `c5x01`；测试后还原临时数据。
5. 正式 `engine.js`、`catalog-rules.js`、`catalog-case56.js`、`horror-rules.js`、`mechanics.js` 的前后 SHA256 完全不变，也与本轮 `mechanics-frozen-sources.json` 相同。

完整字段变更清单见 `generator-source-changes.json`；命令、临时路径、结果和源文件哈希见 `generator-roundtrip.json`。此次验证只证明生成结果保持已验收机制；没有新增玩法或重新宣称浏览器验收。

追加条件分支目标：`c5x08`、`c5x09`、`c5x33`。最新源与运行 payload 均已包含，目标修复总计 11 张。新增字段无需进一步改 `normalize`；本报告与 JSON 的哈希均基于补修后重新冻结版本。
