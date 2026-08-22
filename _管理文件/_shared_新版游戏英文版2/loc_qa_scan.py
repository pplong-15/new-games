#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Gate L 零中文盲测扫描器（html-game-localization）

用法:
    python3 loc_qa_scan.py <本地化目录> [界面中文告警阈值, 默认 0]

对目录下每个游戏子目录：
  - 全文汉字数（含 <script>，单文件游戏正文在 JS 对象里注入 DOM）
  - lang 属性（回退到任一 html，不强制 index.html 命名）
  - 契约文件存在性（LOCALIZATION_CONTRACT.md / LOC_QA.md，含 工程/ 等子目录）
  - 界面可见中文计数（<title> / placeholder / <noscript>）= 缺陷档

注意：
  - 英文词数会被 base64 data URI / 压缩 JS 污染到上百万，不可用作指标；
    唯一可靠量是全文汉字数。
  - 汉字归三档，只有「界面可见中文」算缺陷：①输入兼容层(人名/日期供搜索校验)
    ②JS 字段标识符(数据结构 key，不渲染) ③界面可见中文(<title>/placeholder/noscript)。
  - 质检前先认对目录：英文版常有「桌面工作区」与「git 快照」两份，
    认 agent 最新那份，别拿旧快照误报「未英化」。
"""
import re, os, sys, glob

CJK = re.compile(r'[\u4e00-\u9fff]')
CONTRACT = ('LOCALIZATION_CONTRACT.md', 'LOC_QA.md')


def full_hanzi(t):
    return len(CJK.findall(t))


def lang_attr(t):
    m = re.search(r'<html[^>]*lang=["\']([^"\']+)', t, re.I)
    return m.group(1) if m else '-'


def visible_ui_hanzi(t):
    """缺陷档：玩家直接可见的界面中文（标题/占位符/noscript）。"""
    hits = 0
    for pat in (r'<title[^>]*>([^<]*)</title>',
                r'placeholder=["\']([^"\']*)',
                r'<noscript[^>]*>(.*?)</noscript>'):
        for m in re.finditer(pat, t, re.I | re.S):
            hits += len(CJK.findall(m.group(1)))
    return hits


def find_contracts(d, root):
    out = []
    for c in CONTRACT:
        for pat in (d + '/' + c, d + '/*/' + c, d + '/*/*/' + c):
            out += [os.path.relpath(p, root) for p in glob.glob(pat)]
    return sorted(set(out))


def main():
    root = os.path.abspath(os.path.expanduser(sys.argv[1] if len(sys.argv) > 1 else '.'))
    warn = int(sys.argv[2]) if len(sys.argv) > 2 else 0
    games = sorted(d for d in os.listdir(root)
                   if os.path.isdir(os.path.join(root, d)) and not d.startswith('.'))
    print(f"{'游戏':<18}{'html':>5}{'lang':>7}{'全文汉字':>8}{'界面中文':>8}  契约")
    print('=' * 74)
    for g in games:
        d = os.path.join(root, g)
        hs = glob.glob(d + '/**/*.html', recursive=True)
        th = ui = 0
        langs = {}
        for h in hs:
            try:
                t = open(h, encoding='utf-8', errors='replace').read()
            except Exception:
                continue
            th += full_hanzi(t)
            ui += visible_ui_hanzi(t)
            langs[lang_attr(t)] = langs.get(lang_attr(t), 0) + 1
        main_lang = max(langs, key=langs.get) if langs else '-'
        contracts = find_contracts(d, root)
        flag = '  <-- 界面中文缺陷' if ui > warn else ''
        print(f"{g:<18}{len(hs):>5}{main_lang:>7}{th:>8}{ui:>8}  {'✓' if contracts else '无'}{flag}")
        for c in contracts:
            print(f"        {c}")


if __name__ == '__main__':
    main()