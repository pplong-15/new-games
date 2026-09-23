# 北段V2 美术修复与核验

已修复新增卡资源被模式兜底吞掉的问题，将164张新增卡按最终名称逐项映射。新增6张图集、60个可裁显格，另纠正42张旧卡，共206个明确映射，实际改变204张卡的图片键。仅写入art-map.js、art-overrides.js和6个独立新增资源。

764张最终图片路径全部存在；最终使用127个主题键、63个实际文件。路径存在不等于764张全部重新做了逐项语义验收。

## 修复方法

- 显式卡片映射优先；真实存在的designArtKey或sprite key直接保留，未知键才走模式兜底。
- 所有新格带normalized bounds={x,y,width,height}及aspect；保留原图、不裁图重排。
- D.Art.faces只导出6对实际主图/face文件。
- artSubject按实际画面描述。tool-warmstone实际为三炷香炉，card-new24实际为油灯，已纠正标签。
- 用户最终美术验收标记仍为false。

## 验证

- 764_card_paths_exist: PASS
- 164_new_cards_explicit: PASS
- 60_new_tiles_bounds: PASS
- face_manifest_actual_files: PASS
- no_non_art_card_changes: PASS
- remap_idempotent: PASS
- known_real_design_key_preserved: PASS
- known_sprite_design_key_preserved: PASS
- unknown_design_key_safe_fallback: PASS

非美术字段比较使用相同当前规则源，只替换修复前两份美术模块作为基线，避免将其他代理同步修复误算为本美术改动。

浏览器实际加载60/60格，6张整组截图逐张查看，无邻格混入，主体完整可辨。

## 实图检查证据

- 原图及单格已看。牌位有立式神主底座，纸马为四足纸马，石磬悬挂且有木槌；油灯、琉璃灯、烛台、灯檠、方桌、香案、香几、食案可区分。第三格炉盖只属一般镂空锥形，未用作博山炉。 [截图](./v3-ritual-props-a-inspection.png)
- 原图及单格已看。纸钱、魂帛、寿衣、合棺、倒头饭、孝幔、炉瓶三事、香篆、净水柳枝、朝简、法印、拜垫、空椅、疏文清楚。第10格像竖立牌位，第13格为高足双柄杯，未拿来冒充令牌和羽觞；另行补绘替换。 [截图](./v3-ritual-props-b-inspection.png)
- 原图及单格已看。点主是笔点牌位；抬棺有多名送葬者；掩口、呼唤、三炷香、柳枝洒水、举疏、星斗步位、覆棺和焚纸都有可见动作。方相四目面具具辨识度。 [截图](./v3-ritual-actions-inspection.png)
- 原图及单格已看。姨母与女医均为女性；抬担架是两人共同抬担架；举板可见双手及坠落物，纠正旧站姿单人、木门图。 [截图](./v3-people-actions-inspection.png)
- 原图及单格已看。博山炉有多峰山形镂空盖；羽觞浅腹两侧平耳；哀杖白布、麻绳白结清楚。 [截图](./v3-ritual-corrections-inspection.png)
- 原图及单格已看。筊杯一平一凸、朱砂粉瓷碟、净巾折叠白布、令牌手持木片无神主底座，均与最终映射对应。 [截图](./v3-ritual-details-inspection.png)

## 边界

- 逐项语义复核范围为164张新增卡和42张已确认旧卡纠偏；764张全部完成最终路径验证，不据此声称其余旧卡均已重新做独立语义验收。
- 共享图代表同一器物、行动或场景主题。收灯、灯花、长明灯共用油灯；钉棺、封棺共用合盖棺木，未表现每个动作瞬间；主位、客位、虚位共用空椅；疏文类文书共用卷轴。
- 6张图集保留原始布局，仅转WebP；不均匀格子通过bounds渲染裁切。首次生成不符的博山炉、羽觞、令牌格子未启用，补绘后使用准确轮廓。
- 这是AI视觉检查与结构验证，未经用户最终美术验收。完整游戏详情、手机、特效交互由主审另行核验；主审已接手full-art容器遮挡返回按钮的问题。

## 新增卡逐项映射

|卡ID|最终名称|图片键|实图主题|
|---|---|---|---|
|c5x01|引魂幡|v3-soul-banner|白引魂幡：竿顶横幅与垂幡|
|c5x02|买路钱|v3-joss-paper|圆形方孔纸钱|
|c5x03|牌位|v3-tablet|祖先牌位：黑红木制立式神主|
|c5x04|神主|v3-tablet|祖先牌位：黑红木制立式神主|
|c5x05|替身|v3-paper-boy|纸扎金童：金色衣装的童子|
|c5x06|纸扎|v3-paper-boy|纸扎金童：金色衣装的童子|
|c5x07|头七|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x08|判官笔|tool-notebook|手持朱笔书写名簿|
|c5x09|勾牒|v3-petition|展开的疏文纸卷、毛笔与朱砂|
|c5x10|度亡|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c5x11|破狱|wall|雾中的高台门楼|
|c5x12|长明灯|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|c5x13|守灵|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x14|绕棺|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x15|喊惊|v3-call-soul|戴白头巾的人向门外拢手呼唤|
|c5x16|灯花|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|c5x17|三炷香|v3-offer-incense|双手捧三炷香向香炉进献|
|c5x18|掩镜|mirror|铜镜与半覆镜面的布|
|c5x19|不应|v3-keep-silent|人以手掩口，保持不应声|
|c5x20|回头|backward|执灯回首的异样人影|
|c5x21|叫魂|v3-call-soul|戴白头巾的人向门外拢手呼唤|
|c5x22|收魂|v3-call-soul|戴白头巾的人向门外拢手呼唤|
|c5x23|点主|v3-dot-tablet|朱笔点在木制神主牌位上|
|c5x24|辞灵|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c5x25|勾魂|v3-soul-rope|拘魂索：粗麻绳盘与白布结|
|c5x26|纸钱|v3-joss-paper|圆形方孔纸钱|
|c5x27|报丧|v3-call-soul|戴白头巾的人向门外拢手呼唤|
|c5x28|执绋|v3-coffin-procession|数名送葬者以绳杠抬棺|
|c5x29|压胜|card-new12|朱色木尺、符纸与铜钱|
|c5x30|收灯|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|c5x31|盖棺|v3-cover-coffin|双手将白布覆在合盖棺木上|
|c5x32|钉棺|v3-closed-coffin|合盖木棺与棺钉|
|c5x33|望乡台|wall|雾中的高台门楼|
|c5x34|出殡|v3-coffin-procession|数名送葬者以绳杠抬棺|
|c5x35|发引|v3-coffin-procession|数名送葬者以绳杠抬棺|
|c5x36|方相|v3-fangxiang|戴四目面具、持杖的方相驱傩者|
|c5x37|开路神君|v3-fangxiang|戴四目面具、持杖的方相驱傩者|
|c5x38|香炉|tool-warmstone|青铜香炉与三炷线香|
|c5x39|引魂灯|v3-glass-lantern|琉璃灯：透光灯壁与内部火光|
|c5x40|魂帛|v3-soul-cloth|横杆悬挂的白色魂帛|
|c5x41|哀杖|v3-mourning-staff|哀杖：缠系白布的竹杖|
|c5x42|棺罩|v3-cover-coffin|双手将白布覆在合盖棺木上|
|c5x43|路引|v3-petition|展开的疏文纸卷、毛笔与朱砂|
|c5x44|生死簿|tool-notebook|手持朱笔书写名簿|
|c5x45|铭旌|v3-soul-banner|白引魂幡：竿顶横幅与垂幡|
|c5x46|纸马|v3-paper-horse|白纸扎马：四足纸制马形|
|c5x47|倒头灯|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|c5x48|金童|v3-paper-boy|纸扎金童：金色衣装的童子|
|c5x49|玉女|v3-paper-girl|纸扎玉女：青衣童女|
|c5x50|寿衣|v3-burial-robe|叠放的白色寿衣|
|c5x51|拘魂索|v3-soul-rope|拘魂索：粗麻绳盘与白布结|
|c5x52|香案|v3-altar-table|长香案：香炉与烛台|
|c5x53|白幡|v3-soul-banner|白引魂幡：竿顶横幅与垂幡|
|c5x54|停灵|v3-closed-coffin|合盖木棺与棺钉|
|c5x55|坐夜|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x56|灵堂|v3-mourning-hall|白孝幔覆盖的灵堂|
|c5x57|倒头饭|v3-funeral-rice|白饭碗与竖插筷子|
|c5x58|孝幔|v3-mourning-hall|白孝幔覆盖的灵堂|
|c5x59|魂轿|v3-paper-sedan|纸扎魂轿：轿厢、纸帘与抬杆|
|c5x60|路祭|v3-food-table|食案：矮供桌与饭碗|
|c5x61|大殓|v3-cover-coffin|双手将白布覆在合盖棺木上|
|c5x62|小殓|v3-burial-robe|叠放的白色寿衣|
|c5x63|封棺|v3-closed-coffin|合盖木棺与棺钉|
|c5x64|做七|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x65|殃榜|v3-petition|展开的疏文纸卷、毛笔与朱砂|
|c5x66|寿材|v3-closed-coffin|合盖木棺与棺钉|
|c5x67|避煞|card-new12|朱色木尺、符纸与铜钱|
|c5x68|回煞|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x69|鬼门关|wall|雾中的高台门楼|
|c5x70|孟婆汤|warm|手捧汤碗的人|
|c5x71|断七|v3-burn-paper|手持纸钱在火盆中焚化|
|c5x72|哭灵|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x73|入殓|v3-cover-coffin|双手将白布覆在合盖棺木上|
|c5x74|暖棺|v3-coffin-vigil|烛光下两人守在木棺旁|
|c5x75|纸人|v3-paper-boy|纸扎金童：金色衣装的童子|
|c5x76|招魂幡|v3-soul-banner|白引魂幡：竿顶横幅与垂幡|
|c5x77|过桥|v3-bridge-procession|执白幡者走过石桥|
|c6x01|设醮|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x02|献食|v3-food-table|食案：矮供桌与饭碗|
|c6x03|辞神|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x04|空位|v3-empty-seats|坛前的两张空木椅|
|c6x05|香几|v3-incense-stand|小香几：高脚圆面与香炉|
|c6x06|羹饭|v3-food-table|食案：矮供桌与饭碗|
|c6x07|琉璃灯|v3-glass-lantern|琉璃灯：透光灯壁与内部火光|
|c6x08|线香|tool-warmstone|青铜香炉与三炷线香|
|c6x09|接神|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x10|还愿|v3-offer-incense|双手捧三炷香向香炉进献|
|c6x11|不应声|v3-keep-silent|人以手掩口，保持不应声|
|c6x12|覆镜|mirror|铜镜与半覆镜面的布|
|c6x13|喊魂|v3-call-soul|戴白头巾的人向门外拢手呼唤|
|c6x14|送客|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x15|香篆|v3-incense-pattern|香篆：盘中回纹香粉|
|c6x16|序宾|v3-empty-seats|坛前的两张空木椅|
|c6x17|灯花结|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|c6x18|宣疏|v3-present-petition|俯身举疏文向坛前呈送|
|c6x19|上香|v3-offer-incense|双手捧三炷香向香炉进献|
|c6x20|秉烛|v3-candle|白蜡烛与铜烛台|
|c6x21|巡香|v3-offer-incense|双手捧三炷香向香炉进献|
|c6x22|禹步|v3-ritual-steps|布鞋踏过石地星斗形步位|
|c6x23|绕坛|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x24|延客|v3-empty-seats|坛前的两张空木椅|
|c6x25|踏斗|v3-ritual-steps|布鞋踏过石地星斗形步位|
|c6x26|奠酒|v3-wine-offering|双手向礼器中斟酒|
|c6x27|侑食|v3-food-table|食案：矮供桌与饭碗|
|c6x28|剑诀|v3-hand-seal|手指结成剑诀|
|c6x29|素词|v3-petition|展开的疏文纸卷、毛笔与朱砂|
|c6x30|拜表|v3-present-petition|俯身举疏文向坛前呈送|
|c6x31|存思|v3-prayer-cushion|圆形编织拜垫|
|c6x32|许愿|v3-offer-incense|双手捧三炷香向香炉进献|
|c6x33|镇宅|tool-board|贴符封闭的木门|
|c6x34|解厄|v3-sprinkle-water|柳枝从净水盂蘸水洒出|
|c6x35|敕令|v3-wood-command|平放的手持木令牌：刻纹木片与红绳，无牌位底座|
|c6x36|超度|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x37|禁声|v3-keep-silent|人以手掩口，保持不应声|
|c6x38|博山炉|v3-boshan-censer|博山炉：多峰山形镂空炉盖、铜炉腹与底座|
|c6x39|净水盂|v3-water-willow|净水盂与柳枝|
|c6x40|柳枝|v3-water-willow|净水盂与柳枝|
|c6x41|令牌|v3-wood-command|平放的手持木令牌：刻纹木片与红绳，无牌位底座|
|c6x42|朝简|v3-chaojian|朝简：长条弧形礼仪笏板|
|c6x43|烛台|v3-candle|白蜡烛与铜烛台|
|c6x44|净巾|v3-clean-cloth|折叠的净白巾，后方为水盂|
|c6x45|木令牌|v3-wood-command|平放的手持木令牌：刻纹木片与红绳，无牌位底座|
|c6x46|雷印|v3-ritual-seal|方形铜法印与印泥|
|c6x47|压坛木|tool-wedge|短木杠与门楔|
|c6x48|羽觞|v3-ear-cup|羽觞：红黑漆浅腹椭圆杯与两侧平耳|
|c6x49|食案|v3-food-table|食案：矮供桌与饭碗|
|c6x50|磬|v3-qing|悬挂曲尺形石磬与木槌|
|c6x51|炉瓶三事|v3-incense-set|炉瓶三事：香炉、箸瓶与香盒|
|c6x52|虚位|v3-empty-seats|坛前的两张空木椅|
|c6x53|主位|v3-empty-seats|坛前的两张空木椅|
|c6x54|醮坛|v3-altar-table|长香案：香炉与烛台|
|c6x55|供桌|v3-altar-table|长香案：香炉与烛台|
|c6x56|神筵|v3-food-table|食案：矮供桌与饭碗|
|c6x57|客位|v3-empty-seats|坛前的两张空木椅|
|c6x58|八仙桌|v3-square-table|空八仙桌：方桌面与四条木腿|
|c6x59|香坛|v3-altar-table|长香案：香炉与烛台|
|c6x60|清坛|v3-sprinkle-water|柳枝从净水盂蘸水洒出|
|c6x61|开坛|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x62|散福|v3-food-table|食案：矮供桌与饭碗|
|c6x63|撤供|v3-square-table|空八仙桌：方桌面与四条木腿|
|c6x64|安席|v3-empty-seats|坛前的两张空木椅|
|c6x65|留座|v3-empty-seats|坛前的两张空木椅|
|c6x66|灯檠|v3-lampstand|高脚灯檠|
|c6x67|拜垫|v3-prayer-cushion|圆形编织拜垫|
|c6x68|黄箓醮|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x69|莫应|v3-keep-silent|人以手掩口，保持不应声|
|c6x70|禁语|v3-keep-silent|人以手掩口，保持不应声|
|c6x71|背灯|v3-glass-lantern|琉璃灯：透光灯壁与内部火光|
|c6x72|压席|v3-empty-seats|坛前的两张空木椅|
|c6x73|守坛|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|c6x74|留供|v3-food-table|食案：矮供桌与饭碗|
|c6x75|拒客|v3-keep-silent|人以手掩口，保持不应声|
|c6x76|安座|v3-empty-seats|坛前的两张空木椅|
|c6x77|洒净|v3-sprinkle-water|柳枝从净水盂蘸水洒出|
|c6x78|散席|v3-square-table|空八仙桌：方桌面与四条木腿|
|c6x79|落灯|v3-oil-lamp|青铜油灯：浅盏、灯芯与火焰|
|ritual01|净坛|v3-sprinkle-water|柳枝从净水盂蘸水洒出|
|ritual02|掐诀|v3-hand-seal|手指结成剑诀|
|ritual03|召将|v3-wood-command|平放的手持木令牌：刻纹木片与红绳，无牌位底座|
|ritual04|上表|v3-present-petition|俯身举疏文向坛前呈送|
|ritual05|送神|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|ritual06|启坛|v3-altar-rite|法师背对观者，在香坛前举手行仪|
|ritual07|青词|v3-petition|展开的疏文纸卷、毛笔与朱砂|
|ritual08|急急如律令|v3-wood-command|平放的手持木令牌：刻纹木片与红绳，无牌位底座|

## 可复查文件

- art-verification.json：764条最终路径及校验结果。
- art-semantic-map.json：206条显式映射、60格坐标、subjects、faces。
- art-provenance.json：生成工具返回的真实原图及WebP路径。
- art-preview.html和art-preview.py：浏览器预览及截图。
- art-frozen-sources.json：冻结文件SHA-256。
- art-verify.cjs：结构验证脚本。
