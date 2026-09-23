/* V3 artwork mapping. Only art fields are written; catalogue rules remain authoritative. */
(function(root){'use strict';
const D=typeof module!=='undefined'?require('./catalog.js'):root.BDData;
const persons={new01:'v2-portrait-wenjibai',new02:'card-new02',new03:'portrait-jiang',new04:'portrait-ado',person05:'portrait-gu',person06:'portrait-liang',person07:'portrait-songsao',person08:'portrait-qian',person09:'portrait-xu',person10:'portrait-meng',person11:'portrait-aunt',person12:'portrait-yunlan',person13:'portrait-yunzheng',person14:'portrait-yan',person15:'portrait-yu',person16:'portrait-bai'};
const subjects={'v2-portrait-wenjibai':'温既白','v2-env-c1':'雨夜客栈','card-new01':'温既白','card-new02':'宋绮','portrait-jiang':'江蘅','portrait-ado':'阿豆','portrait-gu':'顾承安','portrait-liang':'梁福','portrait-songsao':'宋嫂','portrait-qian':'钱映棠','portrait-xu':'许照宁','portrait-meng':'孟秋岚','portrait-aunt':'素秋姨母','portrait-yunlan':'邵云岚','portrait-yunzheng':'邵云筝','portrait-yan':'严鹤生','portrait-yu':'余雪梅','portrait-bai':'柏正','v2-person-he':'何巡','v2-person-doctor':'值班女医','v2-person-patrol':'巡夜更夫','v2-person-innkeeper':'客栈伙计','v2-person-ferryman':'摆渡船工','v2-person-carpenter':'临时工役','v2-person-clerk':'档房抄手','v2-person-porter':'抬担架的协作者','v2-action-strike':'举杖挡棍','v2-action-guard':'举板挡落火','v2-action-rescue':'抓绳拉回落水者','tool-pageclip':'纸页夹具','tool-flask':'随行暖壶','tool-board':'折叠护板','tool-wedge':'木楔与门顶短杠','tool-cardbox':'分格卡匣','tool-warmstone':'握掌温石','tool-hook':'解结钩','tool-cushion':'缓冲棉垫','tool-notebook':'记话簿与校记册','card-new05':'灯下并置纸件','card-new09':'隔席听取口述','card-new10':'安静灯角','card-new21':'遮光提灯','card-new22':'敷料与药箱','card-new24':'标距绳尺','card-new25':'隔声布屏','card-new26':'路线绳扣','scissors':'铁剪','oil':'灯油','salt':'盐与灰','lantern':'提灯','cord':'系绳'};
const semantic={
 'tool-lantern':'card-new21','tool-medicine':'card-new22','tool-rope':'card-new24','tool-blade':'v2-tool-roll','tool-shield':'tool-board','tool-bag':'v2-tool-bag','tool-notebook':'tool-notebook','tool-magnifier':'v2-tool-magnifier','tool-whistle':'v2-tool-whistle','tool-fire':'oil','tool-water':'tool-flask','tool-measuring':'card-new24','tool-map':'v2-tool-map',
 'action-strike':'v2-action-strike','action-guard':'v2-action-guard','action-rescue':'v2-action-rescue','action-counter':'card-new12','action-chase':'card-new24','action-search':'card-new05','action-interview':'card-new09','action-plan':'tool-notebook','action-recover':'tool-warmstone',
 'setup-barricade':'tool-wedge','setup-watch':'card-new21','setup-medical':'card-new22','setup-archive':'tool-pageclip','setup-escape':'card-new26'
};

// Explicit props outrank broad gameplay archetypes. An equipment card is not a rope merely because it assists movement.
const objectArt={
 new05:'v2-card-xiaohao',card014:'v2-card-huming',card077:'v2-hazard-shoebox',
 new23:'tool-cushion',new24:'card-new24',new25:'card-new25',new26:'card-new26',new27:'card-new27',new28:'card-new28',
 card011:'v2-tool-bag',card070:'v2-action-strike',card072:'v2-tool-roll',card074:'v2-prop-bench',card076:'v2-prop-gloves',card077:'v2-prop-shoes',card078:'v2-prop-slippers',card079:'v2-prop-pliers',card080:'tool-wedge',card081:'tool-wedge',card084:'tool-hook',card085:'v2-tool-bag',card087:'v2-prop-hat',card088:'v2-prop-cape',card089:'tool-pageclip',card090:'v2-prop-pen',card091:'tool-notebook',card096:'card-new22',card097:'v2-prop-cape',card099:'tool-flask',card103:'tool-board',card107:'salt',card108:'v2-action-strike',card109:'v2-tool-roll',card110:'v2-tool-bag',card111:'v2-prop-gloves',card112:'v2-prop-fan',card113:'mirror',card114:'tool-cardbox',card115:'v2-prop-watch',card116:'tool-hook',card117:'tool-pageclip',card118:'v2-prop-stretcher',card119:'tool-wedge',
 card372:'umbrella',card373:'tool-pageclip',card375:'tool-cushion',card376:'tool-cushion',card377:'oil',card380:'v2-prop-bench',card381:'v2-tool-bag',card382:'v2-person-porter',card383:'v2-prop-cart',card384:'v2-prop-cape',card385:'v2-prop-gloves',card386:'v2-prop-compass',card388:'v2-tool-map',card390:'lantern',card392:'mirror',card393:'v2-tool-roll',card394:'tool-warmstone',card395:'v2-tool-whistle',card396:'tool-notebook',card397:'v2-prop-tweezers',card398:'tool-flask',card399:'card-new05',card400:'card-new05',card401:'tool-pageclip',card402:'tool-cardbox',card403:'tool-cardbox',card404:'v2-tool-map',card405:'tool-pageclip',card406:'tool-cardbox',card407:'card-new25',card408:'card-new05',card409:'tool-wedge',card410:'v2-tool-map',card411:'tool-cardbox',card412:'v2-prop-bell',card413:'v2-tool-bag',card418:'tool-hook',card419:'v2-tool-bag',card550:'v2-action-strike'
};
const spriteNames=['gloves','shoes','slippers','hat','cape','watch','compass','flashlight','bell','stretcher','cart','bench','fan','pliers','tweezers','pen'];
const spriteLabels=['皮制工作手套','厚底布鞋','软底夜行鞋','竹编斗笠','油布披肩','刻度怀表','指北针','手电','手铃','折叠担架','木轮手推车','折叠长凳','折扇','铁钳','镊子','钢笔'];
const sprites=Object.fromEntries(spriteNames.map((key,i)=>['v2-prop-'+key,{sheet:'v2-prop-sheet',column:i%4,row:Math.floor(i/4)}]));
Object.assign(subjects,{'v2-card-xiaohao':'朱笔涂去名册一行','v2-card-huming':'门楣护名的旧帖','v2-hazard-shoebox':'只剩一只鞋的鞋盒','v2-tool-roll':'刀、剪与木柄工具','v2-tool-whistle':'黄铜哨子','v2-tool-bag':'装有补给的行囊','v2-tool-magnifier':'放大镜','v2-tool-map':'旧镇地图'});
spriteNames.forEach((key,i)=>subjects['v2-prop-'+key]=spriteLabels[i]);

const semanticOverrides=D.artSemanticOverrides||{};
const assetKeys=new Set(D.artAssetKeys||[]);
Object.assign(subjects,D.artSubjects||{});
Object.assign(sprites,D.artSprites||{});
const faces=D.artFaces||{};
function choose(c){if(semanticOverrides[c.id])return semanticOverrides[c.id];if(objectArt[c.id])return objectArt[c.id];if(/行囊|翻袋/.test(c.name))return 'v2-tool-bag';if(/木棍|持杖|举杖/.test(c.name))return 'v2-action-strike';if(c.mode==='person'||String(c.designArtKey||'').startsWith('person-')){if(persons[c.id])return persons[c.id];const k=String(c.designArtKey||'').replace(/^person-/,'');return 'v2-person-'+k;}
 if(semantic[c.designArtKey])return semantic[c.designArtKey];
 if(sprites[c.designArtKey]||assetKeys.has(c.designArtKey))return c.designArtKey;
 if(/^new\d\d$/.test(c.id))return 'card-'+c.id;
 return c.mode==='equipment'?'tool-cardbox':c.mode==='setup'?'tool-wedge':'tool-notebook';}
const sceneKeys=Array.from({length:6},(_,i)=>'v2-env-c'+(i+1));
const encounterScenes={c1s01:'v2-scene01',c1s02:'scene-c1s02',c1s03:'scene-c1s03',c1s04:'scene-case01',c1s05:'scene-c1s05'};
const locations={c1s01:'雨夜客栈',c1s02:'渡口值房',c1s03:'顾宅书房',c1s04:'旧堤',c1s05:'养药屋'};
function scene(enc){if(encounterScenes[enc?.id])return encounterScenes[enc.id];const c=enc?.chapter||1,n=enc?.scene||1;return n>=7&&n<=12?'scene-case'+String(c).padStart(2,'0'):sceneKeys[c-1];}
function enemy(e,chapter,enc){if(e.targetKind==='opponent')return 'v2-action-strike';if(e.targetKind==='hazard'){if(/火|梁|瓦|挡|坠/.test(e.name))return 'v3-raise-board';if(/水|滑|河|困/.test(e.name))return 'v2-action-rescue';}return scene(enc);}
function remap(){const mapped=D.playerCards600||D.playerCards||D.cardList.filter(c=>c.collectible),counts={};for(const c of mapped){c.art=choose(c);c.artExt='webp';c.artPosition=sprites[c.art]?'50% 50%':c.art==='card-new05'?'50% 78%':c.mode==='person'?'50% 25%':/^v2-tool-/.test(c.art)?'50% 50%':/card-new24|tool-hook|tool-warmstone/.test(c.art)?'50% 78%':'50% 65%';c.artCompleted=true;c.artSubject=subjects[c.art]||'调查与行动主题';c.artHumanApproved=false;counts[c.art]=(counts[c.art]||0)+1;}
 for(const c of mapped){c.artShared=counts[c.art]>1;c.artReuseCount=counts[c.art];c.artStatus=c.artShared?'ORIGINAL_SUBJECT_SHARED':'ORIGINAL_DEDICATED';}
 for(const c of D.chapters)c.art=sceneKeys[c.id-1];for(const e of D.encounters)e.art=scene(e);
 Object.assign(api,{cardMappings:mapped.length,cardOriginals:Object.keys(counts).length,sceneOriginals:new Set(D.encounters.map(scene)).size,counts});api.limitations=`${mapped.length} 张可构筑卡共享 ${api.cardOriginals} 个插画主题（含图集单格）；${D.encounters.length} 场共享 ${api.sceneOriginals} 幅场景。V3 新增6张图集共60格，164张新增卡均按最终名称逐项映射，并纠正已确认的旧卡错配。共享图仅代表同一器物、动作或场景主题，不计作独立原画；已做AI实图检查，全部未经用户最终美术验收。`;return api;}
const api={version:4,faces,semanticOverrides,subjects,sceneKeys,encounterScenes,locations,scene,location:e=>locations[e?.id]||e?.place||'',heroKey:'v2-shenyan',choose,enemy,remap,semantic,sprites,objectArt};D.Art=api;root.BDArt=api;remap();if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
