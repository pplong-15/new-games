(function(root){'use strict';
const D=typeof module!=='undefined'?require('./catalog.js'):root.BDData;
const R=typeof module!=='undefined'?require('./catalog-rules.js'):root.BDCatalogRules;
const n=id=>D.cards[id]?.name||id, has=(a,x)=>a.includes(x);
const context={
 c1s01:{tags:['lamp','papers'],intents:['glare','scatter','urge']},
 c1s03:{tags:['lamp','papers'],intents:['scatter','urge','glare']},
 c1s06:{tags:['pair','lamp'],pair:['梁福','宋嫂'],intents:['glare','interrupt','urge']},
 c1s08:{tags:['medical','lamp'],injury:1,patient:'梁福的暂时行动受限',intents:['urge','urge','interrupt']},
 c1s10:{tags:['papers','lamp'],intents:['glare','scatter','urge']},
 c1s12:{tags:['cloth'],intents:['urge','interrupt','urge']},
 c1s16:{tags:['cloth','papers'],intents:['scatter','interrupt','urge']},
 c2s02:{tags:['song','lamp'],intents:['glare','urge','interrupt']},
 c2s03:{tags:['pair'],pair:['钱映棠','谢闻舟'],intents:['urge','interrupt','urge']},
 c2s06:{tags:['song','papers'],intents:['scatter','urge','interrupt']},
 c2s12:{tags:['song','papers','lamp'],intents:['glare','scatter','urge']},
 c2s17:{tags:['song','papers','lamp'],intents:['glare','scatter','urge']},
 c3s01:{tags:['song'],intents:['urge','interrupt','urge']},
 c3s03:{tags:['song','papers'],intents:['urge','scatter','interrupt']},
 c3s05:{tags:['car','papers'],intents:['urge','interrupt','scatter']},
 c3s09:{tags:['car'],intents:['interrupt','urge','transfer']},
 c3s10:{tags:['song'],intents:['urge','urge','interrupt']},
 c3s12:{tags:['car','papers'],intents:['scatter','interrupt','urge']},
 c3s15:{tags:['song','papers','lamp'],phaseTags:{2:['versions']},intents:['scatter','glare','interrupt']},
 c3s16:{tags:['versions','papers'],intents:['glare','urge','scatter']},
 c4s01:{tags:['song'],intents:['urge','interrupt','urge']},
 c4s03:{tags:['pair'],pair:['邵云岚','邵云筝'],intents:['interrupt','urge','urge']},
 c4s16:{tags:['versions','papers','lamp'],intents:['glare','interrupt','scatter']},
 c5s04:{tags:['pair'],pair:['余雪梅','柏正'],intents:['interrupt','urge','urge']},
 c5s05:{tags:[],phaseTags:{2:['wet','papers','shelter']},intents:['urge','urge','water']},
 c5s06:{tags:['wet','papers','shelter'],intents:['water','scatter','urge'],dryPhases:[0]},
 c5s09:{tags:['song','papers'],intents:['scatter','glare','interrupt']},
 c5s18:{tags:['song','papers','lamp'],intents:['glare','interrupt','scatter']},
 c6s01:{tags:['song','papers','lamp'],intents:['scatter','urge','glare']},
 c6s02:{tags:['song','papers','lamp'],intents:['scatter','glare','interrupt']},
 c6s04:{tags:['pair'],pair:['赵成','杂役'],intents:['interrupt','urge','urge']},
 c6s05:{tags:['sequence','papers'],intents:['scatter','interrupt','urge']},
 c6s06:{tags:['sequence'],intents:['urge','interrupt','urge']},
 c6s11:{tags:['transfer','papers','leader'],intents:['scatter','transfer','urge']},
 c6s13:{tags:['transfer','leader'],intents:['urge','transfer','interrupt']},
 c6s14:{tags:['transfer','leader'],intents:['urge','transfer','urge']}
};
// These contexts bind rules to actions already present in the six-case script.
Object.assign(context,{
 c1s11:{tags:['lamp'],phaseTags:{1:['jiang','safeRoute'],2:['jiang']},intents:['urge','urge','interrupt']},
 c1s14:{tags:[],phaseTags:{2:['safeRoute']},intents:['urge','urge','urge']},
 c1s15:{tags:['dog','barrier'],phaseTags:{1:['safeRoute']},barrier:2,intents:['dog','dog','dog']},
 c2s09:{tags:[],phaseTags:{0:['sight'],2:['sight']},intents:['interrupt','urge','interrupt']},
 c2s11:{tags:[],phaseTags:{1:['sight'],2:['handoff']},intents:['urge','interrupt','interrupt']},
 c2s13:{tags:['papers'],phaseTags:{1:['pawn']},intents:['urge','scatter','urge']},
 c2s14:{tags:['registeredObject','protector'],intents:['grab','grab','urge']},
 c2s15:{tags:['papers'],phaseTags:{1:['handoff']},intents:['scatter','interrupt','urge']},
 c3s13:{tags:['papers'],phaseTags:{0:['selfVoice']},intents:['interrupt','scatter','urge']},
 c4s11:{tags:['papers'],phaseTags:{0:['timeWindow']},intents:['scatter','urge','interrupt']},
 c5s03:{tags:['measurePath','windowTrace'],intents:['glare','urge','interrupt']}
});
context.c3s09.tags.push('unverifiedRegister');context.c3s09.intents[2]='disposition';
context.c4s16.phaseTags={0:['rubbing']};
context.c6s05.phaseTags={0:['ado','receipt'],2:['ado','receipt']};
context.c6s11.tags.push('twoWatchers','handoffWindow');
context.c6s14.phaseTags={0:['evac','twoHelpers']};
const addedIds=['new03','new04','new06','new07','new11','new12','new14','new16','new18','new20','new23','new24','new26','new28','new30','new31'];
function additions(s){return {mechanicsVersion:2,barrierLeft:context[D.encounters[s.encounter]?.id]?.barrier||0,routeCredit:false,ropeSpent:0,voiceCredit:false,rubbingUsed:false,auxRecords:0,deliveries:0,timeRanges:0,handoffQuestions:0,pawnChecks:0,windowChecks:0,evacuated:false,helpersBusyTurn:0,protectorBusyTurn:0,attackBlockTurn:0,attackBlockSpent:false,handoffChecks:0,reviewCount:0,reviewHoldPhase:-1};}
function upgrade(s){if(!s?.battle?.modern||s.battle.modern.mechanicsVersion!==undefined)return s;const m=s.battle.modern;const ids=[...(s.deckList||[]),...(s.battle.hand||[]),...(s.battle.deck||[]),...(s.battle.discard||[]),...[...(m.people||[]),...(m.equipment||[]),...(m.setups||[]),...(m.response?[m.response]:[])].map(x=>x.id)];if(ids.some(id=>addedIds.includes(id))||Object.keys(additions(s)).some(k=>k in m))return s;const copy=JSON.parse(JSON.stringify(s));Object.assign(copy.battle.modern,additions(s));return copy;}
const labels={attack:'敌袭：对手将在回合末攻击',fall:'落石或失足：本幕首次结算消耗2心神',fire:'火势逼近：本幕首次结算消耗2心神',dog:'犬只冲势：本幕首次结算额外消耗2心神',grab:'伸手夺物：本幕首次结算消耗2护身与1通路准备',disposition:'未核院账再次转院：本幕首次结算消耗2护身',glare:'反光打断：本幕首次结算时察觉准备 −1',scatter:'纸页滑落：本幕首次结算时察觉准备 −1',urge:'催促声：本幕首次结算额外消耗1心神',interrupt:'旁人插话：本幕首次结算时询问准备 −1',water:'纸件受潮：本幕首次结算增加1步干燥准备',transfer:'越过核验的转移：本幕首次结算消耗1通路准备；其他任务消耗2护身'};
function ctx(s,phase){const e=D.encounters[s.encounter],p=phase??s.battle?.phase??0,c=context[e.id]||{},sp=e.phases[p];return {...c,tags:[...(c.tags||[]),...(c.phaseTags?.[p]||[]),...(sp.tags||[])],intent:sp.intent==='none'?null:sp.intent??sp.encounterProfile?.intent??c.intents?.[p]??null,phase:p,goal:sp.goal};}
function discovered(s,c){return !c.modern||s.encounter>=c.unlock&&(c.unlock<90||s.flags.hiddenOpened===true);}
const requirements={new01:['medical'],new02:['song'],new03:['jiang'],new04:['ado','receipt'],new06:['sight'],new07:['timeWindow'],new11:['handoff'],new12:['selfVoice'],new14:['dog','barrier'],new16:['evac','twoHelpers'],new18:['pawn'],new20:['windowTrace'],new23:['rubbing'],new24:['measurePath'],new26:['safeRoute'],new28:['twoWatchers','handoffWindow'],new30:['registeredObject','protector'],new31:['unverifiedRegister'],new05:['versions'],new08:['sequence'],new09:['pair'],new10:[],new13:['lamp'],new15:['wet'],new17:['cloth'],new19:['car'],new21:['lamp'],new22:['medical'],new25:['pair'],new27:['wet','shelter'],new29:['papers'],new32:['transfer','leader']};
const goalsets={new03:['open'],new04:['insight'],new06:['insight'],new07:['insight'],new11:['courage'],new12:['courage'],new16:['guard'],new18:['insight'],new20:['insight'],new23:['insight'],new24:['insight','open'],new26:['open'],new05:['insight'],new08:['insight'],new09:['courage'],new10:['courage'],new17:['insight'],new19:['insight','open']};
function siteReason(s,c,p){if(c.catalogRule)return R.siteReason(s,c,p);if(!discovered(s,c))return '这张牌尚未随剧情解锁。';const x=ctx(s,p);if(c.id==='new01'&&D.encounters[s.encounter].chapter>=6)return '当前无法邀请温协作。';if((requirements[c.id]||[]).some(t=>!has(x.tags,t)))return '现场缺少适用的人物、材料或位置。';if(goalsets[c.id]&&!has(goalsets[c.id],x.goal))return '本幕不是这项技能对应的任务。';return '';}
function viable(s,c){return !c.modern||D.encounters[s.encounter].phases.some((p,i)=>!siteReason(s,c,i));}
function init(s){R.init(s);const c=ctx(s);s.battle.modern={people:[],equipment:[],setups:[],response:null,usedPeople:[],personUsedTurn:{},equipmentUsedTurn:{},refundNext:0,kitSpent:0,injury:c.injury||0,patient:c.patient||'',drying:0,damage:0,intentResolved:false,covers:[],discountTurn:0,bandageUntil:0,recordTurn:0,records:0,...additions(s)};}
function phase(s){const m=s.battle.modern;m.intentResolved=false;m.covers=[];m.response=null;m.reviewHoldPhase=-1;R.phase(s);}
function reason(s,c){if(c.catalogRule)return R.reason(s,c);if(s.view!=='battle')return '进入牌桌后才能使用。';let err=siteReason(s,c);if(err)return err;const m=s.battle.modern;if(s.battle.energy<c.cost)return '费用不足。';const lists={person:['people',2],equipment:['equipment',2],setup:['setups',1]};if(lists[c.mode]){const [k,cap]=lists[c.mode];if(m[k].some(x=>(x.id||x)===c.id))return '这张持续牌已经在场。';if(m[k].length>=cap)return '该区域已满，请先撤下不需要的牌。';}if(c.mode==='response'&&m.response)return '本回合已经预留一张应对牌。';if(c.id==='new14'&&m.barrierLeft<1)return '现场隔栏耐久已耗尽，无法再次硬挡犬冲。';if(c.id==='new16'&&m.evacuated)return '伤员已经移至安全处，不能重复搬运。';if(c.id==='new12'&&m.voiceCredit)return '已经留有一次本人询问机会，请先完成。';if(c.id==='new01'&&!m.injury)return '现场没有可当场处理的暂时受限。';if(c.id==='new15'&&m.drying>=2+m.damage)return '这份纸件已经完成干燥准备。';return '';}
function log(s,t){s.battle.log.unshift(t);s.battle.log=s.battle.log.slice(0,70);}
function cover(s,name){if(!s.battle.modern.covers.includes(name))s.battle.modern.covers.push(name);}
function put(s,c,target){R.recordPlay(s,c);if(c.catalogRule)return R.put(s,c,target);const b=s.battle,m=b.modern,x=ctx(s);b.energy-=c.cost;
 if(c.mode==='person')m.people.push({id:c.id});
 else if(c.mode==='equipment')m.equipment.push({id:c.id,charges:c.id==='new22'?2-m.kitSpent:c.id==='new23'?(m.rubbingUsed?0:1):0});
 else if(c.mode==='setup')m.setups.push({id:c.id});
 else if(c.mode==='response')m.response={id:c.id,cost:c.cost};
 else {b.discard.push(c.id);switch(c.id){
 case'new06':R.gain(s,'insight',1);cover(s,'interrupt');break;
 case'new07':R.gain(s,'insight',2);m.timeRanges++;log(s,'记录约22:10附近的可核验区间；没有将钟表误差变成精确时刻。');break;
 case'new11':b.courage+=2;m.handoffQuestions++;inquire(s);log(s,'只询问眼前这段交付，包内物及后续处理仍须分别核验。');break;
 case'new12':cover(s,'interrupt');m.voiceCredit=true;break;
 case'new14':m.barrierLeft--;cover(s,'dog');blockAttack(s);log(s,'利用已有隔栏护送；本场隔栏剩余耐久 '+m.barrierLeft+'。');break;
 case'new16':m.evacuated=true;m.helpersBusyTurn=b.turn;b.blocked+=3;blockAttack(s);log(s,'两名在场协作者将受伤后勤员移至安全处，本轮专事抬人；伤情没有被治愈。');break;
 case'new18':R.gain(s,'insight',2);m.pawnChecks++;log(s,'依收当编号查本环付款索引，不自动取得其他账目。');break;
 case'new20':R.gain(s,'insight',2);m.windowChecks++;log(s,'记录窗台到遮雨落足区的痕迹缺口；逃窗解释受质疑，留痕者仍待查。');break;
 case'new05':R.gain(s,'insight',2);break;
 case'new08':R.gain(s,'insight',1);cover(s,'interrupt');break;
 case'new09':b.courage+=2;log(s,'分别安排 '+x.pair.join('、')+' 的询问，记录不合并为一份证词。');inquire(s);break;
 case'new10':cover(s,'urge');m.discountTurn=b.turn+1;break;
 case'new13':cover(s,'glare');break;
 case'new15':cover(s,'water');break;
 case'new17':R.gain(s,'insight',2);break;
 case'new19':R.gain(s,x.goal==='open'?'leverage':'insight',1);break;
 }}log(s,'「'+c.name+'」生效：'+c.text);b.fx={id:++b.seq,kind:'card',title:c.name,art:c.art,artExt:c.artExt};}
function inquire(s){if(D.catalogVersion===2)return;const m=s.battle.modern;if(m.people.some(p=>p.id==='new02')&&!siteReason(s,D.cards.new02)&&m.recordTurn!==s.battle.turn){m.recordTurn=s.battle.turn;m.records++;cover(s,'interrupt');log(s,'宋绮保留本轮已发生询问的原话记录，未增加新证言。');}if(m.setups.some(p=>p.id==='new25')&&!siteReason(s,D.cards.new25))cover(s,'interrupt');}
function blockAttack(s){const m=s.battle.modern;m.attackBlockTurn=s.battle.turn;m.attackBlockSpent=false;}
function blockEnemy(s,e){if(R.blockEnemy(s,e))return true;const b=s.battle,m=b.modern;if(m.attackBlockTurn===b.turn&&!m.attackBlockSpent){m.attackBlockSpent=true;log(s,'现场保护挡住「'+e.name+'」这一次敌袭。');b.blocked+=e.atk;return true;}return false;}
function routeDiscount(s){if(D.catalogVersion===2)return false;const m=s.battle.modern;return ctx(s).goal==='open'&&ctx(s).tags.includes('safeRoute')&&(m.routeCredit||m.setups.some(x=>x.id==='new26')&&m.ropeSpent<2);}
function actionCost(s,kind){if(kind==='goal'&&s.battle.catalog.discount)return 0;const m=s.battle.modern;return kind==='goal'&&(ctx(s).goal==='courage'&&(m.voiceCredit||m.discountTurn===s.battle.turn)||routeDiscount(s))?0:1;}
function afterAction(s,kind,target){R.afterAction(s,kind,target);const b=s.battle,m=b.modern,x=ctx(s);if(kind==='goal'){
 if(routeDiscount(s)){if(m.routeCredit){m.routeCredit=false;log(s,'按江蘅亲历的安全路线撤离，本次少耗1费用。');}else {m.ropeSpent++;log(s,'沿已固定引导绳撤离，剩余减费次数 '+(2-m.ropeSpent)+'。');}}
 if(x.tags.includes('evac')&&!m.evacuated){m.evacuated=true;m.helpersBusyTurn=b.turn;log(s,'现场协作者开始将受伤后勤员移至安全处；仍需保护完成本幕。');}
 if(!D.cards.new24.catalogRule&&m.equipment.some(e=>e.id==='new24')&&!siteReason(s,D.cards.new24)&&m.equipmentUsedTurn.new24!==b.turn){m.equipmentUsedTurn.new24=b.turn;R.gain(s,x.goal==='open'?'leverage':'insight',1);log(s,'标距绳尺记录本次实际路线核对，准备额外 +1；不推定人的速度。');}
 }if(kind==='goal'&&x.goal==='courage'){if(m.voiceCredit){m.voiceCredit=false;log(s,'将这次询问机会交还本人，抵扣1费用。');}inquire(s);if(s.battle.modern.discountTurn===s.battle.turn)s.battle.modern.discountTurn=0;}}
function care(s){const b=s.battle,m=b.modern;m.injury--;log(s,'处理 '+m.patient+'：暂时受限剩余 '+m.injury+'。未改变剧情伤情。');const kit=m.equipment.find(x=>x.id==='new22'&&!D.cards[x.id].catalogRule&&x.charges>0);if(kit){kit.charges--;m.kitSpent++;m.bandageUntil=b.turn+1;log(s,'药箱敷料剩余 '+kit.charges+'；敷料在下一轮继续保护伤处。');}}
function useReason(s,id){if(D.cards[id]?.catalogRule)return R.useReason(s,D.cards[id]);if(s.view!=='battle')return '进入牌桌后才能协作。';const b=s.battle,m=b.modern,c=D.cards[id];if(!c?.modern)return '未知能力。';if(![...m.people,...m.equipment].some(x=>x.id===id))return '该人物或装备不在协作区。';const err=siteReason(s,c);if(err)return err;
 if(c.mode==='person'&&m.helpersBusyTurn===b.turn)return '现场协作者本轮正在抬人，不能再承担另一项任务。';
 if(id==='new03'){if(m.usedPeople.includes(id))return '江蘅本场已协助过一次撤离。';if(!xRoute(s))return '本幕没有她亲历的安全撤离路线。';if(m.routeCredit)return '已留有一次撤离减费。';}
 else if(id==='new04'){if(m.personUsedTurn[id]===b.turn)return '阿豆本回合已经递送过一次。';if(b.insight>=2)return '本幕核验已准备完成，无需重复递送。';}
 else if(id==='new23'){if(m.rubbingUsed)return '本场辅助拓样已制作，重新装备不增加次数。';}
 else if(id==='new01'){if(m.usedPeople.includes(id))return '医者本场已经处理过一次。';if(!m.injury)return '没有可当场处理的暂时受限。';}
 else if(id==='new21'){if(m.equipmentUsedTurn[id]===b.turn)return '提灯本回合已经调整过。';}
 else return '此牌在满足条件时自动生效。';if(id!=='new03'&&b.energy<1)return '能力需要1费用。';return '';}
function xRoute(s){return ctx(s).goal==='open'&&ctx(s).tags.includes('safeRoute');}
function use(s,id){if(D.cards[id]?.catalogRule)return R.use(s,D.cards[id]);const err=useReason(s,id);if(err)return {ok:false,msg:err};const b=s.battle,m=b.modern;if(id!=='new03')b.energy--;if(id==='new03'){m.usedPeople.push(id);m.routeCredit=true;log(s,'江蘅指出她亲历的安全撤离段，本场下一次沿此路行动少耗1费用。');}if(id==='new04'){m.personUsedTurn[id]=b.turn;m.deliveries++;R.gain(s,'insight',1);log(s,'阿豆递交已有回单，公开值房核验准备 +1；原有材料未增加。');}if(id==='new23'){m.rubbingUsed=true;m.auxRecords=1;m.equipment.find(x=>x.id===id).charges=0;R.gain(s,'insight',1);log(s,'在获准原件旁留下可见表面的辅助拓样，原件仍在原位；不增加独立证据。');}if(id==='new01'){m.usedPeople.push(id);care(s);}if(id==='new21'){m.equipmentUsedTurn[id]=b.turn;cover(s,'glare');log(s,'遮光提灯已调整，本轮防止一次反光打断。');}return {ok:true};}
function task(s,kind){if(s.view!=='battle')return {ok:false,msg:'当前无法行动。'};const b=s.battle,m=b.modern,x=ctx(s);if(b.actionUsed||b.energy<1)return {ok:false,msg:'基础处理每回合一次，耗1费用。'};
 if(kind==='care'&&(!x.tags.includes('medical')||m.injury<1))return {ok:false,msg:'没有适用的暂时受限。'};
 if(kind==='dry'&&(!x.tags.includes('wet')||m.drying>=2+m.damage))return {ok:false,msg:'没有待干燥的现有纸件。'};
 if(!['care','dry','secure'].includes(kind))return {ok:false,msg:'未知处理。'};
 b.energy--;b.actionUsed=true;if(kind==='care')care(s);if(kind==='dry'){m.drying++;log(s,'在避雨处处理现有纸件，干燥准备 +1。');}if(kind==='secure'){if(x.intent)cover(s,x.intent);R.secureHush(s);b.shield++;log(s,'先护住眼前的人与物，取消本轮已预告的额外干扰，护身 +1。');}return {ok:true};}
function extraGoal(s){const x=ctx(s),m=s.battle.modern;if(x.tags.includes('evac')&&!m.evacuated)return false;if(x.goal==='rescue'&&has(x.tags,'medical')&&m.injury>0)return false;if(x.dryPhases?.includes(x.phase)&&m.drying<2+m.damage)return false;return true;}
function beforeEnd(s){R.beforeEnd(s,ctx(s).intent);const b=s.battle,m=b.modern,x=ctx(s);let blocked=false,waterHit=false;
 if(!m.intentResolved&&x.intent){const r=m.response,match=r&&(r.id==='new29'&&x.intent==='scatter'||r.id==='new32'&&x.intent==='transfer'&&x.tags.includes('leader')||r.id==='new30'&&x.intent==='grab'&&x.tags.includes('protector')||r.id==='new31'&&x.intent==='disposition'&&x.tags.includes('unverifiedRegister'));
 if(match){blocked=true;log(s,'应对触发：「'+n(r.id)+'」，阻止这一次 '+({scatter:'纸页散落',transfer:'未经核验的转移',grab:'抢夺已登记物',disposition:'未核院账再次转院'}[x.intent])+'。');if(r.id==='new30'){m.protectorBusyTurn=b.turn;log(s,'在场保护者本轮专事护物，归属诉求仍保留。');}if(r.id==='new31'){m.reviewCount++;m.reviewHoldPhase=b.phase;log(s,'本次处置暂停至本幕核验结束；院账真伪尚不由暂停决定。');}b.discard.push(r.id);m.response=null;}
 if(!D.cards.new28.catalogRule&&m.setups.some(p=>p.id==='new28')&&x.tags.includes('twoWatchers')&&x.intent==='transfer'){blocked=true;m.handoffChecks++;log(s,'双人交接点先核编号：暂停本次未经核验转移，登记递交者，不认定犯罪。');}
 if(m.covers.includes(x.intent))blocked=true;
 if(m.bandageUntil===b.turn&&x.intent==='urge'){blocked=true;log(s,'药箱敷料仍有效，伤处未因本轮催迫增加负担。');}
 if(!blocked){const snap={insight:b.insight,courage:b.courage,hp:b.hp,shield:b.shield,leverage:b.leverage,damage:m.damage};switch(x.intent){case'glare':case'scatter':b.insight=Math.max(0,b.insight-1);break;case'interrupt':{const stat=x.goal==='insight'?'insight':'courage';b[stat]=Math.max(0,b[stat]-1);break;}case'urge':b.hp--;break;case'dog':b.hp-=2;break;case'fall':b.hp-=2;break;case'fire':b.hp-=2;break;case'water':if(x.tags.includes('wet')){m.damage=Math.min(1,m.damage+1);waterHit=true;}else b.hp-=2;break;case'grab':b.shield=Math.max(0,b.shield-2);b.leverage=Math.max(0,b.leverage-1);break;case'disposition':b.shield=Math.max(0,b.shield-2);break;case'transfer':if(x.goal==='open')b.leverage=Math.max(0,b.leverage-1);else b.shield=Math.max(0,b.shield-2);break;}log(s,intentSettleLog(s,x,snap));}else log(s,'已保护：本轮额外干扰未发生。');m.intentResolved=true;
 }
 const r=m.response;if(r){m.refundNext=r.cost;b.discard.push(r.id);log(s,'「'+n(r.id)+'」本轮未触发，退回预留费用 '+r.cost+'，加入下一回合可用费用。');m.response=null;}
 if(!D.cards.new27.catalogRule&&m.setups.some(x=>x.id==='new27')&&has(x.tags,'wet')&&m.drying<2+m.damage){if(waterHit){log(s,'纸件继续受潮，干燥台本輪暂停。');}else {m.drying++;log(s,'临时干燥台推进干燥准备 +1。');}}
 m.covers=[];
}
function withdraw(s,id){if(s.view!=='battle')return {ok:false,msg:'当前没有部署。'};const m=s.battle.modern;for(const key of ['people','equipment','setups']){const i=m[key].findIndex(x=>x.id===id);if(i>=0){m[key].splice(i,1);s.battle.discard.push(id);log(s,'撤下「'+n(id)+'」。本场次数和耗材不会因重新部署而复原。');return {ok:true};}}return {ok:false,msg:'该牌不在持续区。'};}
function recommended(s,style){return R.recommended(s,style);}
function intentLabel(s,x=ctx(s)){if(x.intent==='water'&&!x.tags.includes('wet'))return '急水冲击：本幕首次结算消耗2心神';return x.intent==='interrupt'?'旁人插话：本幕首次结算时'+(x.goal==='insight'?'察觉':'询问')+'准备 −1':labels[x.intent];}
function intentTitle(s,x=ctx(s)){if(x.intent==='water'&&!x.tags.includes('wet'))return '急水冲击';return (intentLabel(s,x).split('：')[0])||x.intent;}
function intentSettleLog(s,x,snap){const b=s.battle,m=b.modern,tip='下次可先用「先护现场」挡掉。',cuts=[],none=[],lost=(k,label)=>{const n=snap[k]-b[k];if(n>0)cuts.push(label+' −'+n);else none.push(label+'已是 '+snap[k]+'，这次没有再减');};
 if(x.intent==='glare'||x.intent==='scatter')lost('insight','调查');
 else if(x.intent==='interrupt')lost(x.goal==='insight'?'insight':'courage',x.goal==='insight'?'调查':'交涉');
 else if(x.intent==='grab'){lost('shield','护身');lost('leverage','通路');}
 else if(x.intent==='transfer'){if(x.goal==='open')lost('leverage','通路');else lost('shield','护身');}
 else if(x.intent==='disposition')lost('shield','护身');
 else if(x.intent==='urge'||x.intent==='dog'||x.intent==='fall'||x.intent==='fire'||(x.intent==='water'&&!x.tags.includes('wet')))lost('hp','心神');
 else if(x.intent==='water'){const n=m.damage-snap.damage;if(n>0)cuts.push('干燥负担 +'+n);else none.push('干燥负担已满，这次没有再增加');}
 else return '干扰结算：'+intentLabel(s,x);
 if(cuts.length)return intentTitle(s,x)+'：本幕首次结算，'+cuts.join('、')+(none.length?'。'+none.join('。'):'')+'。'+tip;
 return none.join('。')+'。'+tip;}
function preview(s){
 const x=ctx(s),m=s.battle?.modern,hush=R.hasHush(s)?'噤口：可用「先护现场」解除，卡牌仍可化解危险。 ':'';
 if(!x.intent)return hush+'本幕无额外干扰；桌上仍有压力或夜禁时，照常结算。';
 if(m?.intentResolved)return hush+'本幕首次额外干扰已结算，不会再次发生；对手施压和夜禁照常结算。';
 const title=intentTitle(s,x),shieldBypass=['urge','dog','fall','fire'].includes(x.intent)||x.intent==='water'&&!x.tags.includes('wet');
 if(m?.covers.includes(x.intent)||m?.bandageUntil===s.battle.turn&&x.intent==='urge')return hush+'已应对：本轮「'+title+'」不会触发。对手施压和夜禁仍会结算。';
 const response=m?.response&&D.cards[m.response.id];
 if(response?.catalogRule?.intent===x.intent)return hush+'已预留「'+response.name+'」应对'+title+'，将在本轮结算时触发；对手施压和夜禁仍会结算。';
 return hush+intentLabel(s,x)+'。'+(shieldBypass?'这项额外干扰直接扣心神，护身只能抵挡对手施压。':'')+'可用基础「先护现场」应对。';
}
function validate(s){if(!R.validate(s))return false;if(!s.battle||!['battle','defeat','aftermath'].includes(s.view))return true;const m=s.battle.modern;if(!m||m.mechanicsVersion!==2||!['people','equipment','setups','covers','usedPeople'].every(k=>Array.isArray(m[k])))return false;const validList=(key,mode,cap)=>m[key].length<=cap&&m[key].every(x=>x&&D.cards[x.id]?.mode===mode)&&new Set(m[key].map(x=>x.id)).size===m[key].length;
 if(!validList('people','person',3)||!validList('equipment','equipment',3)||!validList('setups','setup',2))return false;
 for(const k of ['refundNext','kitSpent','injury','drying','damage','discountTurn','bandageUntil','recordTurn','records'])if(!Number.isInteger(m[k])||m[k]<0||m[k]>100000)return false;
 if(m.kitSpent>2||m.refundNext>4)return false;
 if(m.patient!==(ctx(s).patient||''))return false;
 if(m.equipment.some(x=>!D.cards[x.id]?.catalogRule&&x.charges!==(x.id==='new22'?2-m.kitSpent:x.id==='new23'?(m.rubbingUsed?0:1):0)))return false;
 if([...m.people,...m.equipment,...m.setups,...(m.response?[m.response]:[])].some(x=>!D.cards[x.id]||!discovered(s,D.cards[x.id])||!viable(s,D.cards[x.id])))return false;
 if(m.injury>(ctx(s).injury||0)||m.damage>1||m.drying>3||typeof m.patient!=='string'||m.patient.length>100||typeof m.intentResolved!=='boolean')return false;
 if(m.covers.some(x=>!Object.keys(labels).includes(x))||m.usedPeople.some(x=>!['new01','new03'].includes(x))||new Set(m.usedPeople).size!==m.usedPeople.length)return false;
 if(!m.equipment.every(x=>Number.isInteger(x.charges)&&x.charges>=0&&x.charges<=4))return false;
 for(const k of ['personUsedTurn','equipmentUsedTurn'])if(!m[k]||typeof m[k]!=='object'||Array.isArray(m[k])||Object.entries(m[k]).some(([id,v])=>!D.cards[id]?.modern||!Number.isInteger(v)||v<0||v>s.battle.turn))return false;
 for(const k of ['barrierLeft','ropeSpent','auxRecords','deliveries','timeRanges','handoffQuestions','pawnChecks','windowChecks','helpersBusyTurn','protectorBusyTurn','attackBlockTurn','handoffChecks','reviewCount'])if(!Number.isInteger(m[k])||m[k]<0||m[k]>100000)return false;
 for(const k of ['routeCredit','voiceCredit','rubbingUsed','evacuated','attackBlockSpent'])if(typeof m[k]!=='boolean')return false;
 if(m.barrierLeft>(context[D.encounters[s.encounter].id]?.barrier||0)||m.ropeSpent>2||m.auxRecords!==(m.rubbingUsed?1:0)||m.deliveries>s.battle.turn||['helpersBusyTurn','protectorBusyTurn','attackBlockTurn'].some(k=>m[k]>s.battle.turn))return false;
 if(m.routeCredit&&!m.usedPeople.includes('new03')||m.usedPeople.includes('new03')&&!viable(s,D.cards.new03)||m.ropeSpent>0&&!viable(s,D.cards.new26)||m.rubbingUsed&&!viable(s,D.cards.new23)||m.deliveries>0&&!viable(s,D.cards.new04)||false)return false;
 if(m.voiceCredit&&!viable(s,D.cards.new12)||m.timeRanges>0&&!viable(s,D.cards.new07)||m.handoffQuestions>0&&!viable(s,D.cards.new11)||m.pawnChecks>0&&!viable(s,D.cards.new18)||m.windowChecks>0&&!viable(s,D.cards.new20)||m.handoffChecks>0&&!viable(s,D.cards.new28)||m.reviewCount>0&&!viable(s,D.cards.new31))return false;
 if(!Number.isInteger(m.reviewHoldPhase)||m.reviewHoldPhase< -1||m.reviewHoldPhase>2||m.reviewHoldPhase>=0&&m.reviewHoldPhase!==s.battle.phase)return false;
 if(m.attackBlockSpent&&!m.attackBlockTurn||m.routeCredit&&!viable(s,D.cards.new03))return false;
 if(m.response&&(!D.cards[m.response.id]||D.cards[m.response.id].mode!=='response'||m.response.cost!==D.cards[m.response.id].cost))return false;
 return true;}
function abilityLabel(id){if(D.cards[id]?.catalogRule)return R.abilityLabel(D.cards[id]);return {new01:'医疗 · 1费/本场一次',new03:'指明撤离 · 本场一次',new04:'递送回单 · 1费/回合一次',new21:'调整灯位 · 1费',new23:'辅助拓印 · 1费/本场一次'}[id]||'';}
function statusLines(s){const b=s.battle,m=b?.modern;if(!m)return [];const a=R.statusLines(s);if(m.patient&&m.injury)a.push(m.patient+'：轻伤受限 '+m.injury);if(ctx(s).tags.includes('wet'))a.push('纸件干燥 '+m.drying+'/'+(2+m.damage));if(m.response)a.push('预留应对：'+n(m.response.id));if(m.evacuated)a.push('伤员已转移到安全处');return a;}
R.bindSite(siteReason,ctx);
const api={catalog:R,upgrade,addedIds,statusLines,abilityLabel,blockEnemy,context,ctx,discovered,viable,init,phase,reason,put,use,useReason,task,withdraw,beforeEnd,extraGoal,inquire,actionCost,afterAction,preview,validate,recommended};root.BDMechanics=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
