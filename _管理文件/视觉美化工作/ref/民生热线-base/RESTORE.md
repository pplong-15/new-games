# Restore assets/base into player language folders

These trees were moved out of the player package before visual polish. Not a deletion.

## Check

16 JPG names and SHA-256 are in `SHA256.txt`. This pass matched byte-for-byte across languages.

## Restore

```bash
REF="/Users/jianglong/Desktop/游戏美化/_视觉美化工作/ref/民生热线-base"
GAME="/Users/jianglong/Desktop/游戏美化/民生热线"
mkdir -p "$GAME/中文版/assets" "$GAME/英文版/assets"
cp -R "$REF/中文版/assets/base" "$GAME/中文版/assets/base"
cp -R "$REF/英文版/assets/base" "$GAME/英文版/assets/base"
```

Do not count this `ref/` tree as player media.
Stills `assets/stills/` were never moved.
