'use strict';
/**
 * Remap 576 non-person cards onto attested Daoist / folk / underworld terms.
 * Reads catalog.js + card-copy-horror.js; writes terms-overlay.json + terms-seeds.json.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const D = require('../catalog.js');

const ROOT = __dirname;
const horrorSrc = fs.readFileSync(path.join(ROOT, '../card-copy-horror.js'), 'utf8');
const start = horrorSrc.indexOf('const COPY=');
const end = horrorSrc.indexOf('\n};', start);
const COPY = vm.runInNewContext('(' + horrorSrc.slice(start + 'const COPY='.length, end + 2) + ')');

const FORBIDDEN = new Set([
  '引魂幢', '引魂幡', '买路钱', '头七', '设醮', '设醌', '献食', '送神', '空位', '招魂幡'
]);
const PERSON_NAMES = new Set(D.playerCards.filter(c => c.mode === 'person').map(c => c.name));

const JIAZI = '甲子乙丑丙寅丁卯戊辰己巳庚午辛未壬申癸酉甲戌乙亥丙子丁丑戊寅己卯庚辰辛巳壬午癸未甲申乙酉丙戌丁亥戊子己丑庚寅辛卯壬辰癸巳甲午乙未丙申丁酉戊戌己亥庚子辛丑壬寅癸卯甲辰乙巳丙午丁未戊申己酉庚戌辛亥壬子癸丑甲寅乙卯丙辰丁巳戊午己未庚申辛酉壬戌癸亥'.match(/../g);
const XIU = ['角', '亢', '氐', '房', '心', '尾', '箕', '斗', '牛', '女', '虚', '危', '室', '壁', '奎', '娄', '胃', '昴', '毕', '觜', '参', '井', '鬼', '柳', '星', '张', '翼', '轸'];

/** Seed / recipe cards get iconic terms first (effect-matched). */
const PREMIUM = {
  card001: '生死簿',
  card002: '叫魂',
  card003: '禹步',
  card004: '金光咒',
  card005: '解厄',
  card006: '桃木剑',
  card007: '敕令',
  card008: '掐诀',
  card011: '化符',
  card012: '度亡',
  card014: '护身符',
  card025: '压胜',
  card027: '镇坛木',
  card048: '镇宅符',
  card049: '法印',
  card058: '桃符',
  card069: '石敢当',
  card070: '朱砂剑',
  card080: '符箓',
  card072: '令牌',
  card073: '杨柳枝',
  card091: '度牒',
  card092: '铜镜',
  card121: '守一',
  card127: '勘合',
  card128: '对簿',
  card136: '移星换斗',
  card148: '勾牒',
  card182: '朝简',
  card250: '七星剑',
  card320: '卫灵咒',
  card390: '掩镜',
  card425: '净坛',
  new05: '判官笔',
  new07: '照验',
  new09: '喊惊',
  new10: '不应',
  new19: '步罡',
  new21: '照妖镜',
  new22: '水盂',
  new23: '存思',
  new24: '踏斗',
  card033: '急急如律令',
  card151: '青词',
  card152: '上表',
  card173: '青词上表',
  card195: '召将',
  card207: '召天将',
  card268: '请将',
  card421: '令旗',
  card469: '召灵官',
  card340: '替身',
  card015: '解秽',
  card022: '洒净',
  card095: '送客',
  card026: '五雷符',
  card013: '雷霆符',
  card056: '霹雳符',
  card063: '都天符',
  card064: '火铃符',
  card237: '天罡剑',
  card054: '遮神符',
  card010: '封口符',
  card016: '度人符',
  card009: '破狱',
  card052: '解结',
  card242: '过关符',
  card225: '路引符',
  card174: '朝笏',
  card216: '木令',
  card215: '喊魂',
  card463: '安神',
  card005_skip: '',
  card423: '拜表',
  card539: '焚表',
  card204: '进表',
  card243: '步罡踏斗',
  card388: '飞章',
  card400: '拜章',
  card270: '天师符',
  card289: '启坛',
  card502: '镇坛',
  card275: '封坛',
  card505: '安镇',
  card271: '镇名符',
  card293: '收惊符',
  card272: '延生符',
  card307: '发符',
  card494: '书符',
  card281: '长明灯',
  card495: '香案',
  card285: '香炉',
  card455: '复炉',
  card468: '掐剑诀',
  card456: '佩符',
  card424: '退神',
  card438: '金光神咒',
  card249: '安镇符',
  card232: '净水',
  card193: '三炷香',
  card437: '解冤符',
  card257: '开路符',
  card208: '朝板',
  card138: '功过格',
  card153: '圆光',
  card120: '玉册',
  card164: '河图步',
  card131: '本命符',
  card449: '斩妖剑',
  card263: '敕剑',
  card248: '灵官剑',
  card142: '勾魂',
  card465: '真武剑',
  card552: '桃木令',
  card324: '五雷令',
  card464: '解厄符',
  card217: '还愿',
  card269: '收灯',
  card519: '符篆',
  card390b: '',
  new18: '玄籍',
  card133: '赤历',
  card162: '丹册',
  card178: '牙笏',
  card373: '灵宝符',
  card413: '正一符',
  card454: '驿马符',
  card457: '上清符',
  card467: '召六丁',
  card291: '召六甲',
  card471: '混元符',
  card085: '天师印',
  card032: '挡煞',
  card038: '七星步',
  card045: '考召',
  card050: '护身咒',
  card068: '八卦镜',
  card134: '净天地咒',
  card135: '祝香咒',
  card129: '净心神咒',
  card426: '子午诀',
  card427: '血符',
  card445: '火铃诀',
  card461: '执笏'
};

// Clean accidental junk keys
delete PREMIUM.card005_skip;
delete PREMIUM.card390b;
delete PREMIUM.card441;
delete PREMIUM.WeakenAll;
if (PREMIUM.card442 === 'WeakenAll-skip') delete PREMIUM.card442;

const POOLS = {
  禹步: [
    '步虚', '步斗', '罡步', '北斗步', '天罡步', '九宫步', '八卦步', '五行步', '飞罡', '踏罡',
    '三步九迹', '步乾', '步兑', '步离', '步震', '步巽', '步坎', '步艮', '步坤',
    '踏贪狼', '踏巨门', '踏禄存', '踏文曲', '踏廉贞', '踏武曲', '踏破军', '踏辅星', '踏弼星',
    '步三台', '踏九灵', '步洛书', '丁字步',
    '神行符', '脚力符', '过关', '开路', '发路', '走桥', '过桥', '渡关',
    '步木', '步火', '步土', '步金', '步水',
    '踏魁', '踏魒', '踏魑', '踏魋', '踏魓', '踏魌',
    '日行符', '夜行符', '起马符', '下马符',
    '步罡咒', '踏斗咒', '禹步咒', '七星罡', '九宫罡', '河图罡', '洛书罡',
    '五雷步', '天师步', '北斗罡', '九天步', '紫微步', '三台步',
    '步虚词', '巡坛', '绕坛', '出坛', '入坛',
    '罡步咒', '踏斗诀', '飞步罡', '禹步罡', '步斗罡',
    '南斗步', '东斗步', '西斗步', '中斗步', '禹步诀', '天罡咒',
    '步罡诀', '踏斗步', '星斗步', '九灵步', '三台北斗'
  ],
  破狱: [
    '破幽', '破酆都', '开关', '开鬼门', '开枷', '开锁', '放赦', '赦书', '赦牒',
    '解缚', '斩绳', '破暗', '破地狱', '九幽赦', '十王赦',
    '解结符', '开枷符', '破狱符', '破幽符', '赦罪符', '解冤结', '解冤咒',
    '斩锁', '开锁符', '解索',
    '桃枝鞭', '柳枝鞭', '神鞭', '法鞭', '开锁咒', '解缚咒', '破狱咒', '开关咒',
    '破幽咒', '开鬼门咒', '放赦符', '解枷', '脱枷', '解绳', '断索'
  ],
  掐诀: [
    '剑诀', '灵官诀', '天罡诀', '北斗诀', '五雷诀', '金光诀', '卯酉诀', '都天诀',
    '天蓬诀', '真武诀', '玄坛诀', '飞罡诀', '三官诀', '上清诀', '灵宝诀', '正一诀',
    '混元诀', '紫微诀', '太乙诀', '九天诀', '北极诀', '南斗诀', '五岳诀', '都功诀'
  ],
  存思: [
    '存神', '存想', '抱一', '内观', '叩齿', '咽津', '鸣天鼓', '存日', '存月', '存斗', '存辰',
    '存青气', '存赤气', '存黄气', '存白气', '存黑气', '存三光', '存日月', '存星斗',
    '握固', '澄神', '入静', '调息', '胎息', '炼气', '存白元', '存无英', '存桃康', '存合景',
    '冥目', '静坐', '打坐', '守神', '存真', '存元', '存一', '存光'
  ],
  上表: [
    '宣疏', '读疏', '上章', '拜疏', '焚疏', '奏章', '飞疏', '玉札', '丹书', '黄表'
  ],
  召将: [
    '召真武', '召玄坛', '召天蓬', '召功曹', '发将', '遣将', '请圣', '请神',
    '召甲子', '召甲戌', '召甲申', '召甲午', '召甲辰', '召甲寅',
    '召丁卯', '召丁巳', '召丁未', '召丁酉', '召丁亥', '召丁丑',
    '召温琼', '召赵公', '召王灵', '召马帅', '请四值', '请功曹'
  ],
  桃木剑: [
    '法剑', '神剑', '木剑', '符剑', '驱邪剑', '镇宅剑', '净坛剑', '北斗剑',
    '玄坛剑', '天蓬剑', '桃剑', '蒲剑', '艾剑', '三尺法剑', '斩邪剑', '断煞剑',
    '雷火符', '斩妖符', '缚鬼符', '驱邪符', '考召符', '破邪符', '轰雷符', '霹雳剑',
    '五雷剑', '灵官符', '天蓬符', '真武符', '玄坛符', '都天剑', '火铃剑', '雷部剑',
    '煞符', '敕符', '斩牒', '捕牒', '拘票', '神檄', '雷檄', '檄雷',
    '召劾', '劾鬼', '缚鬼', '斩鬼', '驱煞', '退煞', '镇煞', '破煞',
    '桃木尺', '法尺', '戒尺', '朱砂尺', '桃梗', '桃茆', '蒲艾剑',
    '雷法', '考鬼', '勘鬼', '审鬼', '拿鬼'
  ],
  七星剑: [
    '七星斩', '七星扫邪', '七星灭煞', '北斗斩', '天罡斩', '七星符'
  ],
  敕令: [
    '敕水', '敕坛', '宣敕', '发敕', '考校', '禁咒', '禁法', '喝令',
    '天师令', '都天令', '灵官令', '真武令', '玄坛令', '天蓬令', '召劾令',
    '火令', '火牌', '火票', '神令', '玉令', '雷令', '瘟令', '太岁令',
    '禁步', '禁声', '禁手', '敕禁', '敕断',
    '如律令', '律令', '神符令', '木敕', '朱敕', '紫敕', '五雷号令'
  ],
  判官: [
    '勾名', '注生', '注死', '削籍', '入籍', '除名', '改注', '复注',
    '过堂', '点卯', '签押', '对案', '对质',
    '黑簿', '鬼录', '黄牒', '关文', '移文', '咨文', '申文', '牒文',
    '牌票', '铁券', '盟书', '誓章', '照证', '验真', '勘真',
    '圆光', '镜听', '求签', '抽签', '杯珓', '掷筊', '问筊', '阴筊', '圣筊', '灯花', '占灯花',
    '金钱卦', '文王卦', '朱笔', '墨笔', '判笔', '勾朱', '敕书',
    '功过格', '仙籍', '玉册', '金册', '丹册', '玄簿', '罪簿', '善簿',
    '禄籍', '丹籍', '检校', '照真', '勘录', '点簿', '启籍', '合籍'
  ],
  叫魂: [
    '收魂', '唤魂', '安魂', '点魂', '叫名', '喊名', '应名', '问名', '对名',
    '上香', '进香', '拈香', '祝香', '求告', '祷祝', '许愿', '问神', '问圣',
    '顶香', '出马', '上身', '附体', '请仙', '问仙',
    '木简', '执简', '朝见', '禀神', '告神', '白神', '通神',
    '喊魂咒', '叫魂咒', '收魂咒', '安魂咒', '收惊咒', '镇惊', '安魄', '定魂',
    '三魂', '七魄', '招三魂', '收七魄'
  ],
  不应: [
    '不回头', '缄口', '封口', '闭口', '掩耳', '覆面', '禁声', '止声',
    '封口咒', '缄口符', '闭口符', '止言',
    '蒙眼', '覆面巾', '止呼', '禁呼', '闭声', '掩口'
  ],
  解厄: [
    '消灾', '禳灾', '解冤', '治病符', '安神咒', '净口神咒', '净身神咒', '解秽咒',
    '回生', '续命', '化太岁', '安太岁', '太岁符', '救苦', '解灾',
    '消灾符', '禳灾符', '治瘟符', '安胎符', '和合符', '平安符', '辟邪符',
    '香汤', '甘露', '涤秽', '点净', '净身', '净心', '净口', '安土', '谢土',
    '续命符', '延寿符', '解冤咒', '消灾咒', '禳灾咒', '救苦符', '解厄咒',
    '出关符', '避灾符', '化灾符'
  ],
  洒净: [
    '敕水咒', '咒水', '浴净', '甘露水', '洒水', '清水盂',
    '洒坛', '涤坛', '洗秽', '净秽', '解秽水', '神水',
    '法水', '咒水符', '敕水符', '杨枝水', '净瓶', '水咒', '洒净咒', '清坛水'
  ],
  安镇: [
    '镇宅', '护坛', '安宅', '镇方', '安方', '镇物',
    '安镇东方', '安镇南方', '安镇西方', '安镇北方', '安镇中央',
    '安镇乾方', '安镇坤方', '安镇震方', '安镇巽方', '安镇坎方', '安镇离方', '安镇艮方', '安镇兑方',
    '泰山石', '瓦将军', '虎头牌', '门神', '钟馗', '五彩缕', '长命缕', '苇索', '椒柏',
    '太极图', '八卦图', '镇宅镜', '镇宅石', '安宅符', '镇房符', '镇门符',
    '镇户符', '镇井符', '镇灶符', '镇仓符', '镇路符', '镇桥符', '镇水符', '镇火符',
    '金光罩', '护体', '护坛符', '卫坛', '守坛', '压坛', '镇场', '安场',
    '位牌', '神主', '牌位', '香烛', '黄纸', '朱砂', '雄黄', '艾虎', '菖蒲',
    '石敢当符', '姜太公符', '泰山符', '东岳符', '城隍符', '土地符', '灶君符',
    '门神符', '钟馗符', '虎符', '龙符', '龟符', '狮符'
  ],
  净坛: [
    '开坛', '清坛', '扫坛', '结坛', '建坛', '祭坛', '法坛', '内坛', '外坛',
    '净坛符', '净坛咒', '清坛符', '扫坛符', '开坛咒', '启坛咒', '退坛', '闭坛',
    '宿启', '发炉', '复炉', '出官', '启师', '早朝', '午朝', '晚朝'
  ],
  镇坛: [
    '压坛木', '坛尺', '镇木', '镇尺', '压尺', '坛板', '镇坛尺', '压坛符', '镇坛符'
  ],
  替身: [
    '纸扎', '纸人', '纸马', '替名', '代身', '替灾', '替病', '草人', '刍灵', '寓人'
  ],
  掩镜: [
    '覆镜', '收镜', '镜袱', '镜盖', '覆面镜', '镜衣', '掩光', '闭镜', '息镜', '镜函'
  ],
  压胜: [
    '镇物符', '桃梗符', '雄黄符', '朱砂符', '艾符', '蒲符', '爆竹', '丹书',
    '赤丸', '米斗', '升斗',
    '五色线', '长命锁', '响铃', '铜铃', '帝钟', '法铃'
  ],
  法器: [
    '拂尘', '玉简', '玉圭', '木鱼', '令箭', '法螺', '宝剑匣', '符袋', '符筒', '印匣'
  ],
  符箓: [
    '符篆', '灵符', '神符', '宝符', '秘符', '丹符', '紫符', '黄符', '朱符', '墨符',
    '太上符', '三官符', '北斗符', '南斗符', '五岳符', '紫微符', '九天符', '北极符',
    '三清符', '玉帝符', '华光符', '温琼符', '赵公符', '王灵符', '功曹符', '四值符',
    '日游符', '夜游符', '城隍印', '土地印', '酆都符', '泰山印', '东岳印',
    '开光符', '痘疹符', '将军箭符', '天狗符', '白虎符',
    '佩符', '戴符', '贴符', '藏符', '埋符', '镇符', '收符', '焚符', '吞符',
    '五雷印', '都功印', '灵宝印', '上清印', '北极印', '玉皇印', '紫微印', '真武印',
    '玄坛印', '灵官印', '天蓬印', '三官印', '九天印', '太上印', '正一印', '混元印',
    '金光印', '雷霆印', '火铃印', '东岳令', '城隍令', '土地令', '酆都令',
    '都天印', '阳平印', '治都功印', '玉印', '神印', '宝印', '木印',
    '符剑诀', '佩剑符', '坛符', '门符', '户符', '灶符', '井符', '仓符'
  ]
};

// 二十八宿步 / 符 overflow
for (const x of XIU) {
  POOLS.禹步.push('步' + x + (x === '斗' || x === '虚' ? '宿' : ''));
  POOLS.符箓.push(x + '宿符');
}
for (const jz of JIAZI) {
  POOLS.符箓.push(jz + '符');
}

const FAMILY_OMEN = {
  禹步: ['步乱则神不来。', '星位走错，路就不认人。'],
  破狱: ['狱门一破，人才能出来。', '锁开了，账还在。'],
  掐诀: ['诀结错了，下一道就不灵。', '手指先对，神才肯来。'],
  存思: ['心不静，神不降。', '存想未成，不要出手。'],
  上表: ['表递上去，这一刻还不报。', '青词入天，回音在下一轮。'],
  召将: ['将未到，坛上先不可空。', '令牌一拍，将才到坛。'],
  桃木剑: ['桃木出鞘，邪不容身。', '剑上有符，不是空砍。'],
  七星剑: ['七星照剑，一剑扫开。', '斗柄所指，邪无所避。'],
  敕令: ['令出如律，回不得口。', '敕到之处，神鬼不得留。'],
  判官: ['册上有名，才算还在。', '朱笔一点，这一行就定了。'],
  叫魂: ['名字要自己应，旁人应不得。', '魂还在门外，先喊它回来。'],
  不应: ['夜里叫你，第三声也不要应。', '不应这一声，它才叫不真。'],
  解厄: ['厄解开了，账还在。', '灾退之后，名还要核一次。'],
  洒净: ['水过之处，秽才退。', '不洒净，坛上留的是脏的。'],
  安镇: ['镇住的这一方，先不要动。', '钉子还在，名才不会被带出去。'],
  净坛: ['坛不净，神不来。', '先清这一圈，再请后面的。'],
  镇坛: ['木一压坛，当场不得动。', '坛上镇住，谁也不得走。'],
  替身: ['替过你的，会把这件事记下。', '名字写到它身上，洗不掉。'],
  掩镜: ['镜一掩，它照不见你。', '镜面朝下，这一侧才安全。'],
  压胜: ['此物一压，邪不敢近。', '压住的不是人，是那一口邪气。'],
  法器: ['器在人在，器离则散。', '法器离手，权柄就不在你这边。'],
  符箓: ['符未化，事未了。', '纸符一贴，这一方先认。']
};

const NAME_FLAVOR = {
  禹步: '按大禹所传星位，先把这一步走正。',
  步罡: '依罡步绕过这一圈。',
  踏斗: '脚踏斗柄，把路踩实。',
  步罡踏斗: '步罡踏斗，按星位把路走通。',
  存思: '闭目存想，神来之前先不要出手。',
  守一: '守住这一息，先不要散。',
  召将: '令牌一拍，将到坛前。',
  召天将: '召请天将下坛。',
  召灵官: '灵官到坛，先把这一侧看住。',
  请将: '请将到坛，替你走这一遭。',
  上表: '把这一纸表文递上去。',
  青词: '青词写罢，先递进天门。',
  青词上表: '青词上表，这一笔先入天庭。',
  拜表: '拜表之后，回音不在此刻。',
  焚表: '表焚上去，这一事才算递出。',
  进表: '进表一通，先把名报上。',
  飞章: '飞章入天，此刻先记下。',
  拜章: '拜章之后，下一轮才回。',
  净坛: '先把坛场洒净。',
  启坛: '启坛之后，才许请后面的。',
  掐诀: '手指一绞，诀先结上。',
  掐剑诀: '掐剑诀，下一道才减力。',
  敕令: '敕到，神鬼不得停留。',
  急急如律令: '急急如律令。立刻照办。',
  安镇: '镇在这一方，先不要动。',
  解厄: '把这一厄解开。',
  解厄符: '解厄符一贴，灾先退一寸。',
  度亡: '超度过的，才许走。',
  破狱: '狱门一破，人才能出来。',
  解结: '把这一结解开。',
  桃木剑: '桃木出鞘，邪不容身。',
  七星剑: '七星照剑，一剑扫开。',
  令牌: '牌上有敕，谁敢不遵。',
  令旗: '令旗一展，将从旗下走。',
  法印: '印落处，名才算数。',
  镇坛木: '木一压坛，当场不得动。',
  水盂: '盂中清水，先洗这一遭。',
  杨柳枝: '柳枝蘸水，点过才净。',
  洒净: '清水洒过，秽气才退。',
  朝简: '执简而前，把话说明白。',
  笏: '笏板一举，该说的才说。',
  生死簿: '册上有名，才算还在。',
  判官笔: '朱笔一点，这一行定了。',
  勾魂: '牒到，这一名就被勾。',
  勾牒: '阴司勾牒一到，名从册上过。',
  叫魂: '名字要自己应，旁人应不得。',
  喊惊: '把吓走的魂喊回来。',
  喊魂: '门外喊三声，魂才肯回来。',
  不应: '这一声，你不要应。',
  掩镜: '镜面一掩，它照不见你。',
  替身: '名字写到它身上，这一下它替。',
  压胜: '此物一压，邪不敢近。',
  护身符: '符贴在身，这一下先挡住。',
  镇宅符: '镇宅符钉上，门户才认得人。',
  五雷符: '五雷符一发，邪避其锋。',
  天师符: '天师符落处，先把邪镇住。',
  净坛符: '净坛符贴上，秽先退。',
  镇名符: '镇名符一压，这一行不得改。',
  封口符: '封口符贴上，这一声不许出。',
  遮神符: '遮神符一掩，反光先挡住。',
  度人符: '度人符开，人先离险。',
  照妖镜: '镜一照，那半边先现形。',
  金光咒: '金光罩体，这一下先挡住。',
  金光神咒: '金光神咒一诵，护住全身。',
  卫灵咒: '卫灵咒起，挡在身前。',
  石敢当: '石敢当在此，邪不得进门。',
  桃符: '桃符钉门，刃口先偏开。',
  照验: '拿来照验，这一段才算数。',
  勘合: '两份勘合，对得上才算真。',
  对簿: '对簿核过，重誊的先剥掉。',
  移星换斗: '移星换斗，把这一步换到能走的地方。',
  朱砂剑: '朱砂书剑，邪避其锋。',
  铜镜: '铜镜对过，错位的那一行才现。',
  度牒: '度牒还在，人的名才走得动。',
  化符: '符一化，手里这件事才换得动。',
  发符: '符发出去，器用才到。',
  书符: '朱笔书符，这一张先到手。',
  收灯: '灯收到这一盏为止。',
  送客: '客要送出门，不要留到夜里。',
  还愿: '借过的力，这一遭先还。',
  长明灯: '长明灯不灭，这一侧先亮着。',
  香案: '香案摆正，散页才收得住。',
  香炉: '炉烟一起，两人才对着核。',
  三炷香: '三炷香燃上，人先站稳。',
  请神: '神请到，力先借这一遭。',
  退神: '神退之后，刚才那一阵才歇。',
  血符: '刺血书符，这一口气先换出来。',
  符箓: '符箓留在桌上，这一方先认。',
  符篆: '符篆一落，纸上才有权柄。',
  木令: '木令一宣，该说的才说。',
  执笏: '执笏而前，把欠的这一口气换出来。',
  开路符: '开路符前导，人先送出去。',
  过关符: '过关符一验，路才让你走。',
  路引符: '路引在手，这一段才过得去。',
  驿马符: '驿马符一发，脚程先到。',
  召六丁: '六丁到坛，人先到你这边。',
  召六甲: '六甲到坛，坛上才有人。',
  子午诀: '子午诀一结，费用先上来。',
  火铃诀: '火铃诀催动，下一剑先加力。',
  本命符: '本命符贴上，这一行才对得上。',
  朝笏: '朝笏一举，该说的才说。',
  复炉: '复炉之后，器用再转一遭。',
  佩符: '佩符在身，器用先到手。',
  丹册: '丹册对过，这一段才抽得出。',
  功过格: '功过格一对，这一行才算。',
  圆光: '圆光一看，换个位置再核。',
  玉册: '从玉册首行核起。',
  收惊符: '收惊符一贴，魂先回来。',
  延生符: '延生符开，人先稳住。',
  安镇符: '安镇符钉上，这一侧先不要动。',
  解冤符: '解冤符一化，压力先卸一寸。',
  天师印: '天师印一落，器用才认你。',
  灵宝符: '灵宝符留案，散页先挡住。',
  正一符: '正一符一镇，抢夺先止。',
  上清符: '上清符两发，布置与器用同到。',
  混元符: '混元符一开，器用先到手。',
  八卦镜: '八卦镜一照，反光先偏开。',
  净天地咒: '净天地神咒一诵，散页先退。',
  祝香咒: '祝香神咒一诵，下一轮才有力。',
  净心神咒: '净心神咒一诵，散页不扰。',
  护身咒: '护身咒起，先挡住这一下。',
  挡煞: '挡煞在前，下一次先让过。',
  七星步: '七星步踏过，脚程先留下。',
  考召: '考召一问，名上的刃先卸。',
  纸扎: '纸人替过，账记在它身上。',
  解秽: '解秽之后，气才匀得下来。',
  净水: '净水过处，水险先退。',
  安神: '安神之后，失态才拦得住。',
  河图步: '按河图走步，图画错了先改路。',
  敕剑: '敕剑出鞘，步也截住。',
  斩妖剑: '斩妖剑带伤也出。',
  灵官剑: '灵官剑架住，路还在。',
  真武剑: '真武剑边退边斩。',
  桃木令: '桃木令一宣，盾后还击。',
  五雷令: '五雷令下，挡完就记。',
  天罡剑: '天罡剑横扫，路从剑下过。',
  雷霆符: '雷霆符劈开所有在场的。',
  霹雳符: '霹雳符一发，锁也断。',
  都天符: '都天符罩下，反光也退。',
  火铃符: '火铃符一震，全场压力先卸。',
  镇坛: '镇坛之后，这一口先压住。',
  封坛: '封坛狭口，回击从这里出。',
  退煞: '退煞符一化，刃口先偏。',
  破酆都: '酆都狱门一破。',
  金光罩: '金光罩下，人先立住。'
};

const NAME_SHORT = {
  禹步: '按星位迈步。',
  步罡: '依罡步绕坛。',
  踏斗: '脚踏斗柄。',
  存思: '闭目存想。',
  召将: '令牌召将。',
  上表: '表文先递上。',
  青词: '青词先递上。',
  净坛: '先把坛洒净。',
  掐诀: '手指先结诀。',
  敕令: '敕到不得留。',
  安镇: '镇住这一方。',
  解厄: '把这一厄解开。',
  度亡: '超度过的才许走。',
  破狱: '狱门一破。',
  桃木剑: '桃木出鞘。',
  七星剑: '七星一剑扫开。',
  叫魂: '名字自己应。',
  不应: '这一声不要应。',
  生死簿: '先核册上的名。',
  判官笔: '朱笔点这一行。',
  急急如律令: '律令一宣，立刻办。',
  金光咒: '金光先罩住。',
  护身符: '符贴在身。',
  照妖镜: '镜先照那半边。',
  掩镜: '镜面先掩上。',
  水盂: '清水先洗过。',
  替身: '它替你挡一次。'
};

function opsList(r) {
  return [...(r.enter || []), ...(r.effects || [])];
}
function hasOp(ops, o) {
  return ops.some(x => x === o || x.startsWith(o + ':'));
}

function firstOp(r) {
  const ops = opsList(r).filter(x => !x.startsWith('if:') && !x.startsWith('pay:'));
  return (ops[0] || '').split(':')[0];
}

function classify(r) {
  const ops = opsList(r).filter(x => !x.startsWith('if:'));
  const has = o => hasOp(ops, o);
  const prim = firstOp(r);
  if (r.mode === 'response') {
    if (r.intent === 'urge') return (has('stun') || has('cover')) ? '不应' : '叫魂';
    if (r.intent === 'water') return '洒净';
    if (r.intent === 'glare') return '掩镜';
    if (r.intent === 'transfer') return '禹步';
    if (r.intent === 'fall') return has('cut') ? '破狱' : '解厄';
    if (r.intent === 'attack') return (has('damage') || has('stun')) ? '敕令' : '不应';
    if (r.intent === 'interrupt') return '敕令';
    if (r.intent === 'grab') return '镇坛';
    if (r.intent === 'disposition') return '判官';
    if (r.intent === 'scatter') return '压胜';
    if (r.intent === 'dog') return '压胜';
  }
  if (hasOp(ops, 'cover:urge')) return '不应';
  if (has('sweep')) return '七星剑';
  if (prim === 'damage') return '桃木剑';
  if (prim === 'stun' || prim === 'weaken' || prim === 'weakenAll') return '敕令';
  if (prim === 'cut') return '破狱';
  if (prim === 'leverage' || prim === 'route') return '禹步';
  if (prim === 'insight' || prim === 'expose') return '判官';
  if (prim === 'courage' || prim === 'resolve') return '叫魂';
  if (prim === 'heal' || prim === 'care' || prim === 'calm') return '解厄';
  if (prim === 'dry') return '洒净';
  if (prim === 'nextProgress') return '上表';
  if (prim === 'focus' || prim === 'nextEnergy' || prim === 'energy') {
    if (has('nextProgress')) return '上表';
    if (r.cost === 0 && r.mode === 'skill') return '掐诀';
    return '存思';
  }
  if (ops.some(o => o.startsWith('drawMode:person'))) return '召将';
  if (prim === 'draw' || prim === 'drawMode') return '召将';
  if (prim === 'hurt') return '替身';
  if (prim === 'refresh' || prim === 'recycle') return '净坛';
  if (prim === 'evacuate') return '禹步';
  if (prim === 'shield' || prim === 'retain' || prim === 'cover' || prim === 'blockNext' || prim === 'counter') return '安镇';
  if (has('cut') && !has('damage')) return '破狱';
  if (has('damage')) return '桃木剑';
  if (has('leverage') || has('route')) return '禹步';
  if (r.cost === 0 && r.mode === 'skill' && (has('nextEnergy') || has('focus'))) return '掐诀';
  if (has('stun') || has('weaken') || has('weakenAll')) return '敕令';
  if (has('heal') || has('care') || has('calm')) return '解厄';
  if (has('insight')) return '判官';
  if (has('courage') || has('resolve')) return '叫魂';
  if (has('shield') || has('retain') || has('cover') || has('blockNext') || has('counter')) return '安镇';
  if (has('refresh') || has('recycle')) return '净坛';
  if (r.mode === 'equipment') return '法器';
  if (r.mode === 'setup') return '安镇';
  if (has('draw') || has('drawMode')) return '召将';
  return '符箓';
}

function hashId(id) {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) >>> 0;
  return h;
}

function genericFlavor(name, family, kind) {
  const short = kind === 'short';
  if (/符$/.test(name)) return short ? `书${name}。` : `朱笔书一通${name}。`;
  if (/诀$/.test(name)) return short ? `结${name}。` : `手指结成${name}。`;
  if (/剑$/.test(name)) return short ? `${name}出鞘。` : `${name}出鞘。`;
  if (/咒$/.test(name)) return short ? `诵${name}。` : `默诵${name}。`;
  if (/印$/.test(name)) return short ? `${name}一落。` : `${name}盖下，这一行才算。`;
  if (/令$/.test(name) || name === '敕令') return short ? `${name}一宣。` : `${name}一宣，当场照办。`;
  if (/^步|^踏|禹步|罡/.test(name) || family === '禹步') return short ? `${name}。` : `按${name}走这一位。`;
  if (family === '召将' || /^召|^请/.test(name)) return short ? `${name}到坛。` : `${name}到坛前。`;
  if (family === '上表') return short ? `${name}先递上。` : `把${name}递上去，回音不在此刻。`;
  if (family === '判官') return short ? `以${name}核过。` : `以${name}核这一行。`;
  if (family === '叫魂') return short ? `${name}。` : `行${name}，名字要自己应。`;
  if (family === '解厄') return short ? `${name}。` : `以${name}把这一灾退开。`;
  if (family === '安镇' || family === '压胜') return short ? `${name}压住。` : `${name}压在这一方。`;
  if (family === '洒净' || family === '净坛') return short ? `${name}。` : `以${name}清过这一遭。`;
  if (family === '敕令') return short ? `${name}。` : `${name}一下，不得停留。`;
  if (family === '破狱') return short ? `${name}。` : `以${name}把锁打开。`;
  if (family === '存思' || family === '掐诀') return short ? `${name}。` : `先${name}，这一口气蓄上。`;
  if (family === '桃木剑' || family === '七星剑') return short ? `${name}。` : `${name}对上这一侧。`;
  if (family === '不应') return short ? `${name}。` : `${name}。这一声先咽回去。`;
  if (family === '替身') return short ? `${name}替过。` : `以${name}替你挡一次。`;
  if (family === '掩镜') return short ? `${name}。` : `${name}，它照不见你。`;
  if (family === '法器' || family === '符箓') return short ? `${name}在手。` : `${name}留在手上。`;
  if (family === '镇坛') return short ? `${name}压坛。` : `${name}一压，当场不得动。`;
  return short ? `${name}。` : `行${name}。`;
}

function flavorOf(name, family, kind) {
  if (kind === 'short' && NAME_SHORT[name]) return NAME_SHORT[name];
  if (NAME_FLAVOR[name]) return NAME_FLAVOR[name];
  return genericFlavor(name, family, kind);
}

function omenOf(name, family, id) {
  if (name === '不应') return '夜里叫你，第三声也不要应。';
  if (name === '叫魂' || name === '喊惊' || name === '喊魂') return '名字要自己应，旁人应不得。';
  if (name === '替身' || name === '纸扎') return '替过你的，会把这件事记下。';
  if (name === '生死簿' || name === '判官笔') return '册上的字，比嘴上的准。';
  const arr = FAMILY_OMEN[family] || FAMILY_OMEN.符箓;
  return arr[hashId(id) % arr.length];
}

function mechStart(s, catalogPiece) {
  if (!s) return 0;
  const needle = (catalogPiece || '').replace(/。$/, '');
  if (needle) {
    const i = s.indexOf(needle);
    if (i >= 0) return i;
  }
  const re = /迅手|入场：|入场挡|每轮|应对|调查\+|通路\+|交涉\+|护身\+|专注\+|信任\+|脚步\+|抽\d|压制|打断|压力|破绽|回复|失去|疲劳|下轮|下幕|费用\+|破防|抽取|耗\d|重置|处理|消除|挡[住催反插水]|干燥|护送|解\d|所有威胁|下次压制|若有|若专|若信|若脚/;
  const m = re.exec(s);
  return m ? m.index : 0;
}

function joinFlavor(flavor, mech) {
  let f = String(flavor || '').trim();
  if (!f) return mech;
  if (!/[。．.]$/.test(f)) f += '。';
  return f + mech;
}

function takeName(family, used) {
  const pool = POOLS[family] || POOLS.符箓;
  while (pool.length) {
    const n = pool.shift();
    if (!n || FORBIDDEN.has(n) || PERSON_NAMES.has(n) || used.has(n) || /vis|skip/i.test(n) || /\s/.test(n)) continue;
    used.add(n);
    return n;
  }
  return null;
}

function overflowName(family, used, i) {
  const prefixes = [
    '五雷', '天师', '安镇', '净坛', '解厄', '镇名', '封口', '遮神', '度人', '护身',
    '镇宅', '辟邪', '平安', '收惊', '北斗', '南斗', '三官', '本命', '太岁', '金光',
    '雷霆', '火铃', '灵官', '天蓬', '真武', '玄坛', '紫微', '上清', '灵宝', '正一',
    '混元', '九天', '太上', '都天', '北极', '七星', '天罡', '八卦', '太极', '东岳',
    '城隍', '土地', '酆都', '泰山', '五岳', '华光', '温琼', '赵公', '王灵', '六丁',
    '六甲', '四值', '功曹', '日游', '夜游', '三清', '玉帝', '太乙', '南极',
    '中斗', '东斗', '西斗', '天猷', '翊圣', '雷部', '火部', '瘟部', '四圣', '九光'
  ];
  const suffixByFamily = {
    禹步: ['步', '罡'],
    破狱: ['赦', '符'],
    掐诀: ['诀'],
    存思: ['存'],
    上表: ['表', '疏'],
    召将: ['将'],
    桃木剑: ['剑', '符'],
    七星剑: ['剑'],
    敕令: ['令', '敕'],
    判官: ['簿', '牒'],
    叫魂: ['魂', '香'],
    不应: ['符'],
    解厄: ['符', '咒'],
    洒净: ['水'],
    安镇: ['符'],
    净坛: ['坛', '咒'],
    镇坛: ['木'],
    替身: ['身'],
    掩镜: ['镜'],
    压胜: ['符'],
    法器: ['铃'],
    符箓: ['符', '印']
  };
  const sufs = suffixByFamily[family] || ['符'];
  for (let k = 0; k < prefixes.length * sufs.length * 3; k++) {
    const p = prefixes[(i + k) % prefixes.length];
    const s = sufs[(i + k) % sufs.length];
    const cand = p + s;
    if (!FORBIDDEN.has(cand) && !PERSON_NAMES.has(cand) && !used.has(cand) && cand.length >= 2 && cand.length <= 6 && cand !== p && !/(.)\1$/.test(cand) && !/镇镇|符符|令令/.test(cand)) {
      used.add(cand);
      return cand;
    }
  }
  for (const jz of JIAZI) {
    for (const s of sufs.concat(['符'])) {
      const cand = jz + s;
      if (!used.has(cand) && !FORBIDDEN.has(cand)) {
        used.add(cand);
        return cand;
      }
    }
  }
  throw new Error('out of names for ' + family);
}

function dumpRows() {
  return D.playerCards.filter(c => c.mode !== 'person').map(c => {
    const r = c.catalogRule || {};
    function opsOf(arr, acc = []) {
      if (!arr) return acc;
      for (const o of arr) {
        if (o.op === 'if') {
          acc.push('if:' + o.condition);
          opsOf(o.effects, acc);
        } else {
          const extra = o.value != null ? ':' + o.value : (o.resource ? ':' + o.resource : '');
          acc.push(o.op + (o.n != null ? ':' + o.n : '') + extra);
        }
      }
      return acc;
    }
    const row = COPY[c.id] || {};
    return {
      id: c.id,
      horror: row.name || c.name,
      type: c.type,
      mode: c.mode,
      cost: c.cost,
      intent: r.intent || null,
      enter: opsOf(r.enter),
      effects: opsOf(r.effects),
      catText: c.text || '',
      catShort: c.shortText || c.text || '',
      horrorText: row.text || c.text || '',
      horrorShort: row.short || c.shortText || '',
      horrorOmen: row.omen || ''
    };
  });
}

function build() {
  const rows = dumpRows();
  const used = new Set();
  const overlay = {};
  const idToName = {};
  const familyOf = {};

  // 1. premium
  for (const r of rows) {
    const n = PREMIUM[r.id];
    if (!n) continue;
    if (FORBIDDEN.has(n) || PERSON_NAMES.has(n)) throw new Error('premium forbidden ' + n);
    if (used.has(n)) throw new Error('premium dup ' + n);
    used.add(n);
    idToName[r.id] = n;
    familyOf[r.id] = classify(r);
  }

  // 2. rest by family
  let i = 0;
  for (const r of rows) {
    if (idToName[r.id]) continue;
    const fam = classify(r);
    familyOf[r.id] = fam;
    let n = takeName(fam, used);
    if (!n) n = overflowName(fam, used, i);
    idToName[r.id] = n;
    i++;
  }

  for (const r of rows) {
    const name = idToName[r.id];
    const fam = familyOf[r.id];
    const t0 = mechStart(r.horrorText, r.catText);
    const s0 = mechStart(r.horrorShort, r.catShort);
    const textMech = r.horrorText.slice(t0);
    const shortMech = r.horrorShort.slice(s0) || r.catShort;
    overlay[r.id] = {
      name,
      text: joinFlavor(flavorOf(name, fam, 'text'), textMech),
      short: joinFlavor(flavorOf(name, fam, 'short'), shortMech),
      omen: omenOf(name, fam, r.id)
    };
  }

  const ids = rows.map(r => r.id).sort();
  const keys = Object.keys(overlay).sort();
  if (keys.length !== 576) throw new Error('overlay size ' + keys.length);
  if (keys.join(',') !== ids.join(',')) throw new Error('key mismatch');
  const names = Object.values(overlay).map(x => x.name);
  const dup = names.filter((n, idx) => names.indexOf(n) !== idx);
  if (new Set(names).size !== names.length) throw new Error('dup names ' + [...new Set(dup)].join(','));
  for (const id of keys) {
    if (D.cards[id].mode === 'person') throw new Error('person id ' + id);
    if (FORBIDDEN.has(overlay[id].name)) throw new Error('forbidden ' + overlay[id].name);
  }

  const horrorToId = {};
  for (const r of rows) horrorToId[r.horror] = r.id;

  function remapList(arr) {
    return arr.map(n => {
      if (PERSON_NAMES.has(n) || n === '宋绮' || n === '值班女医' || n === '巡夜更夫' || n === '温既白' || n === '何巡' || n === '客栈伙计' || n === '顾承安') return n;
      const id = horrorToId[n];
      if (!id) throw new Error('seed name not found: ' + n);
      return overlay[id].name;
    });
  }

  const styleSeeds = {
    balanced: remapList(['温既白', '何巡', '横刀在门口', '当面不许近', '灯下这一页', '把名再问', '灯后那条路', '灯还亮着', '截住近灯步', '数一数少了什么', '灯罩那半边', '药在人未在', '架住劈名', '车辙对录', '各报其名', '誊清和底稿']),
    guard: remapList(['何巡', '横刀在门口', '铁尺拦名刃', '顺势还记', '门户钉名', '架住劈名', '有人挡在灯前', '灯还亮着', '灯下这一页', '把名再问', '灯后那条路', '旧藤记着手', '药在人未在', '当面不许近', '门槛钉灯', '白蜡封巷']),
    insight: remapList(['温既白', '誊清和底稿', '灯下这一页', '对灯核过', '图上对不上', '排除重誊', '从底稿剥', '先不唤名', '横刀在门口', '截住近灯步', '各报其名', '灯后那条路', '灯罩那半边', '拓印多一行', '灯还亮着', '数一数少了什么']),
    tools: remapList(['何巡', '客栈伙计', '顾承安', '灯罩那半边', '药在人未在', '绳尺出灯外', '旧藤记着手', '半截巡夜蜡', '铁尺记手', '就地补进录', '换件再对灯', '数一数少了什么', '横刀在门口', '灯下这一页', '把名再问', '灯后那条路', '当面不许近'])
  };
  const recipeRoles = {
    attack: remapList(['带伤还记', '轮上截步', '挡架拉偏', '浮土下那行', '当面不许近']),
    strike: remapList(['边退边记', '冲开灯圈', '拨开名上刃', '逐名压住']),
    guard: remapList(['立住灯圈', '推车挡灯', '船舷按住', '证人傍灯', '横刀在门口']),
    protect: remapList(['借力卸名', '担架护着走', '辱词拦名', '顺势还记']),
    insight: remapList(['假说另栏', '对灯核过', '灯下这一页']),
    observe: remapList(['换位再核', '自册首行', '誊清和底稿']),
    courage: remapList(['第三人开口', '请她自报', '把名再问']),
    inquire: remapList(['失态拦下来', '原话入册', '先问琐事', '各报其名']),
    route: remapList(['小径改过录', '沿绳离灯', '灯后那条路']),
    escape: remapList(['退到灯下', '送到门灯下', '车辙对录']),
    heal: remapList(['空档还在包', '药在人未在', '灯还亮着']),
    draw: remapList(['赶灯灭前', '袋里少一件', '数一数少了什么']),
    setup: remapList(['观口还不进', '半掩看灯', '门后未唤', '半截巡夜蜡']),
    tool: remapList(['照不见的那半边', '镜中错位', '灯罩那半边']),
    counter: remapList(['盾面撞回名', '挡完还记', '狭口挡名', '铁尺记手', '门户钉名']),
    block: remapList(['架住劈名', '门户钉名', '横刀在门口']),
    shield: remapList(['柱后那半边', '拒马横灯前', '旧藤记着手']),
    study: remapList(['从底稿剥', '排除重誊', '只核这段录']),
    focus: remapList(['图要重画', '图上对不上', '先圈错位', '底稿另栏']),
    evidence: remapList(['分组还对录', '两人核一页', '硬壳里的录', '拓印多一行']),
    gear: remapList(['铁尺记手', '半截巡夜蜡']),
    repair: remapList(['换件再对灯', '就地补进录', '磨损对不上', '数一数少了什么']),
    kit: remapList(['铺位人未在', '灯下先救人', '药在人未在']),
    field: remapList(['架上少一件', '清单不齐', '案头一角灯', '绳尺出灯外'])
  };

  fs.writeFileSync(path.join(ROOT, 'terms-overlay.json'), JSON.stringify(overlay, null, 2), 'utf8');
  fs.writeFileSync(path.join(ROOT, 'terms-seeds.json'), JSON.stringify({ styleSeeds, recipeRoles }, null, 2), 'utf8');

  const sampleIds = ['new05', 'new06', 'new10', 'card001', 'card002', 'card003', 'card004', 'card005', 'card006', 'card007', 'card008', 'card011', 'new21', 'new22', 'new23'];
  const sample = sampleIds.map(id => {
    const r = rows.find(x => x.id === id);
    return { id, old: r.horror, neu: overlay[id].name, fam: familyOf[id], text: overlay[id].text };
  });

  const mismatches = [];
  for (const r of rows) {
    const name = overlay[r.id].name;
    const fam = familyOf[r.id];
    const prim = firstOp(r);
    if (fam === '禹步' && prim === 'damage') mismatches.push([r.id, name, fam, prim]);
    if (fam === '存思' && (prim === 'drawMode' || prim === 'heal' || prim === 'damage')) mismatches.push([r.id, name, fam, prim]);
    if (fam === '召将' && prim === 'heal') mismatches.push([r.id, name, fam, prim]);
    if (fam === '掐诀' && r.cost !== 0) mismatches.push([r.id, name, fam, 'cost' + r.cost]);
  }
  const seedKeys = {
    styleSeeds: Object.fromEntries(Object.entries(styleSeeds).map(([k, v]) => [k, v.length])),
    recipeRoles: Object.keys(recipeRoles)
  };

  const inventedish = names.filter(n => /灯下|誊清|底稿|那半边|未唤|未记|对不上/.test(n));
  const famDist = {};
  for (const id of keys) famDist[familyOf[id]] = (famDist[familyOf[id]] || 0) + 1;

  console.log(JSON.stringify({
    overlay: keys.length,
    unique: new Set(names).size,
    leftoverDups: 0,
    mismatches,
    personIds: keys.filter(id => D.cards[id].mode === 'person').length,
    inventedish,
    sample,
    seedKeys,
    styleSeeds,
    famDist,
    longest: names.reduce((a, b) => a.length >= b.length ? a : b),
    nameLen: names.filter(n => n.length > 6)
  }, null, 2));
}

build();
