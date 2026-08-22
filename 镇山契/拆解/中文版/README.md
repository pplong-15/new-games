# 镇山契 — Modular Package（拆解版）

> 从单文件 HTML 拆解出的模块化版本，供 AI Agent 修改。原始单文件保持不变。

## 文件结构

```
  assets
  index.html
  style.css
  world-content-2.js
  world-content-3.js
  world-content.js
```

## Agent 修改规则

1. **先读 `manifest.json`**，了解哪些文件/字段可改、哪些受保护。
2. **只能改** world-content-2.js, world-content-3.js 的文本内容和 style.css 的主题变量。
3. **禁止改**：答案码、谜题答案、校验逻辑、图片引用、引擎逻辑。
4. 修改后需通过自动测试（语法、可启动、核心路径可走通）。

## 如何运行

用 HTTP 服务器打开（不能用 file://）：

```bash
python3 -m http.server 8000
# 访问 http://localhost:8000/
```
