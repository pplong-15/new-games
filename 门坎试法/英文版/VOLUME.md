# VOLUME　诚实计数

目录：`/Users/Zhuanz/Desktop/新游戏4/门坎试法`

| 项 | 数 | 口径 |
|---|---|---|
| HTML | 44 | `*.html`，每页有用，无 extra_copy、无换名空壳 |
| 全站汉字 | 10005 | 去标签后汉字相加 |
| 独特配图 | 8 | `img/*.jpg`，md5 不重复 |
| dup40 | 0 | 连续 40 汉字全站不二见 |
| trip24 | 0 | 连续 24 汉字不进 3 个 html |

页清单：

- 引言 1：`introduction.html`
- 夜岗台 14：login / home / board / record / try / try-reject / try-ok / advise / result-hold / result-letin / result-rewrite / memo / shift / hint
- 对外 5：`index.html` + public/tonight / threshold / access / noise
- 钥匙室 5：index / log / note / lastyear / limit
- 夜岗机 4：inbox / mu / he / gu
- 黄页 4：index / route / roster / permit
- 巷帖 4：list / borrow / step / idle
- 邮箱 3：inbox / rework / que
- 旧俗 4：index / menkan / xishang / limit

收工命令：

```
python3 "/Users/Zhuanz/Desktop/新游戏4/_shared/dupcheck.py" "/Users/Zhuanz/Desktop/新游戏4/门坎试法" 36 10000
python3 "/Users/Zhuanz/Desktop/新游戏4/_shared/imgcheck.py" "/Users/Zhuanz/Desktop/新游戏4/门坎试法" 8
```

实测：html 44 hanzi 10005 dup40 0 trip24 0 PASS；img 8 unique_md5 8 PASS。
