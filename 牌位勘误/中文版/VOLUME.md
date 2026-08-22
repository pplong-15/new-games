# VOLUME　诚实计数

目录：`/Users/Zhuanz/Desktop/新游戏2/牌位勘误`

| 项 | 数 | 口径 |
|---|---|---|
| HTML | 46 | `*.html`，每页有用，无 extra_copy、无换名空壳 |
| 全站汉字 | 见收工 dupcheck（≥10000） | 去标签后汉字相加 |
| 独特配图 | 8 | `img/*.jpg`，md5 不重复 |
| dup40 | 0 | 连续 40 汉字全站不二见 |
| trip24 | 0 | 连续 24 汉字不进 3 个 html |

页清单：

- 引言 1：`introduction.html`
- 文书室 15：login / home / list / slip-zhai / slip-yao / slip-tong / slip-tan / handoff / note / card / memo / result-hold / result-print / result-half / result-over
- 馆对外 5：`index.html` + public/package / anwei / shengwei-window / print-only
- 晚报 5：index / obit-zhai / live-hesheng / corr-jiang / obit-yao
- 宗亲会 6：index / minglu / zhaomu / shengwei / fax / winter
- 县图 4：index / zhuzi / dianzhu / peishi
- 地方帖 4：list / wanxiang / qiman / idle
- 邮箱 3：inbox / from-pu / from-huo
- 公示 3：index / weituo / tongbao1999

未灌水：空位两行不另开空壳页；发票/电梯邮件只在收件箱点名，不拆页。

收工命令（本目录）：

```
python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏2/牌位勘误" 36 10000
python3 "/Users/Zhuanz/Desktop/新游戏2/_shared/imgcheck.py" "/Users/Zhuanz/Desktop/新游戏2/牌位勘误" 8
```
