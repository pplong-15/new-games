(function(root){'use strict';
const D=typeof module!=='undefined'?require('./catalog.js'):root.BDData;
if(typeof module!=='undefined'){require('./story-content.js');require('./card-copy.js');require('./story-revisions.js');}
const Q=typeof module!=='undefined'?require('./encounter-rules.js'):root.BDEncounterRules;
const C=typeof module!=='undefined'?require('./card-rebalance.js'):root.BDCardRebalance;
Q.apply(D);C.apply(D);
const M=typeof module!=='undefined'?require('./mechanics.js'):root.BDMechanics;
const KEY='beiduan-guiming-full-v1',VERSION=5,MAX_HP=30,BASIC_STRIKE=2;
const clone=x=>JSON.parse(JSON.stringify(x));
function deckError(deck){if(!Array.isArray(deck)||deck.length!==30)return '牌组需要正好 30 张牌。';const count={};for(const id of deck){if(!D.cards[id])return '牌组包含未知卡牌。';count[id]=(count[id]||0)+1;if(count[id]>(D.cards[id].mode==='person'?1:2))return '命名人物最多1张，其他同名牌最多2张。';}return '';}
function fresh(seed=Date.now()){const s={version:VERSION,refundCredit:0,view:'home',seed:(seed>>>0)||1,deckList:[...D.presets['守门']],encounter:0,completed:[],flags:{},clues:[],history:[],borrowedHelp:0,debt:0,battle:null,result:null,lampOwner:null,lastChoice:null};s.deckList=M.recommended(s);return s;}
function phaseKey(s){return D.encounters[s.encounter]?.id+':'+s.battle?.phase;}
function investigationState(s){const key=phaseKey(s),p=D.encounters[s.encounter]?.phases[s.battle?.phase],past=(Array.isArray(s.history)?s.history:[]).find(h=>h?.kind==='investigation'&&h.phaseKey===key&&p?.investigation?.options.some(o=>o.id===h.answerId&&o.correct===true));return {phaseKey:key,answerId:past?.answerId||null,feedback:past?.text||'',solved:!!past};}
function upgrade(s){if(s?.version===5&&s.lastChoice&&!D.encounters[s.encounter]?.choice?.options.some(o=>o.id===s.lastChoice)){s=clone(s);s.lastChoice=null;}if(s?.version===4){s=clone(s);s.version=VERSION;if(s.lastChoice&&!D.encounters[s.encounter]?.choice?.options.some(o=>o.id===s.lastChoice))s.lastChoice=null;s.deckList=M.recommended(s);s.history.push({kind:'migration',text:'V1.1牌组已迁移到V2。已完成场景保留；进行中的场景从入口重新开始。'});if(['battle','defeat'].includes(s.view)){s.view='map';s.battle=null;s.lastChoice=null;}else if(s.battle){M.init(s);s.battle.hand=[];s.battle.deck=[...s.deckList];s.battle.discard=[];s.battle.units=[];s.battle.captives=[];}}s=M.upgrade(s);if(s?.version!==VERSION||!s.battle||s.battle.investigation!==undefined)return s;const copy=clone(s);copy.battle.investigation=investigationState(copy);return copy;}
function validInvestigation(s){const b=s.battle,x=b.investigation,p=D.encounters[s.encounter].phases[b.phase];if(!x||typeof x!=='object'||Array.isArray(x)||x.phaseKey!==phaseKey(s)||typeof x.solved!=='boolean'||typeof x.feedback!=='string'||x.feedback.length>2000)return false;
 if(!p.investigation)return x.answerId===null&&!x.solved;
 if(x.answerId!==null&&!p.investigation.options.some(o=>o.id===x.answerId))return false;
 const entries=s.history.filter(h=>h.kind==='investigation'&&h.phaseKey===x.phaseKey);
 if(entries.length>1)return false;
 return !x.solved||p.investigation.options.some(o=>o.id===x.answerId&&o.correct===true)&&entries.length===1&&entries[0].answerId===x.answerId;
}
function validate(s){
 s=upgrade(s);
 const integer=(x,min=0,max=100000)=>Number.isInteger(x)&&x>=min&&x<=max;
 const texts=x=>Array.isArray(x)&&x.length<=500&&x.every(v=>typeof v==='string'&&v.length<5000);
 if(!s||s.version!==VERSION||!['home','map','battle','aftermath','endingChoice','ending','defeat','caseEnd'].includes(s.view))return false;
 if(!integer(s.refundCredit,0,4))return false;
 if(deckError(s.deckList)||!Array.isArray(s.completed)||s.completed.length>D.encounters.length||!Array.isArray(s.clues)||!Array.isArray(s.history)||!s.flags)return false;
 if(!integer(s.encounter,0,D.encounters.length-1)||!integer(s.seed,0,4294967295)||!integer(s.debt,0,12)||!integer(s.borrowedHelp,0,108))return false;
 if(!texts(s.clues)||s.clues.some(c=>!D.clueTexts[c])||new Set(s.clues).size!==s.clues.length||typeof s.flags!=='object'||Array.isArray(s.flags)||Object.values(s.flags).some(v=>typeof v!=='boolean'))return false;
 if(s.history.length>1000||s.history.some(x=>!x||typeof x!=='object'||x.text!==undefined&&(typeof x.text!=='string'||x.text.length>2000)))return false;
 if(s.view==='ending'&&(s.result!=='recorded'||!['public','witness'].includes(s.lampOwner)))return false;
 if(s.completed.some((x,i)=>x.id!==D.encounters[i].id||!Number.isInteger(x.turns)||x.turns<D.encounters[i].phases.length))return false;
 const expected=(['aftermath','caseEnd'].includes(s.view)?s.encounter+1:s.view==='ending'||s.view==='endingChoice'?D.encounters.length:s.encounter);
 if(s.completed.length!==expected)return false;
 if(s.view==='caseEnd'&&(D.encounters[s.encounter].scene!==18||D.encounters[s.encounter].chapter===6))return false;
 const earned=s.completed.map(x=>D.encounters.find(e=>e.id===x.id).clue);
 if(s.clues.length!==earned.length||s.clues.some((x,i)=>x!==earned[i]))return false;
 if(s.encounter>=90&&!s.flags.hiddenOpened)return false;
 if(['endingChoice','ending'].includes(s.view)&&(s.encounter!==D.encounters.length-1||!s.flags.hiddenOpened))return false;
 if(s.lastChoice!==null&&(!D.encounters[s.encounter].choice||!D.encounters[s.encounter].choice.options.some(o=>o.id===s.lastChoice&&o.correct!==false)))return false;
 if(['battle','defeat','aftermath'].includes(s.view)){
   const b=s.battle;if(!b||!Number.isInteger(b.phase)||b.phase<0||b.phase>=D.encounters[s.encounter].phases.length||!Number.isInteger(b.turn)||b.turn<1||!Number.isFinite(b.hp)||!Number.isFinite(b.energy)||!Array.isArray(b.log))return false;
   for(const k of ['hand','deck','discard'])if(!Array.isArray(b[k])||b[k].some(id=>!D.cards[id]||!M.discovered(s,D.cards[id])||!M.viable(s,D.cards[id])))return false;
   for(const k of ['units','captives'])if(!Array.isArray(b[k])||b[k].some(u=>!u||!D.cards[u.id]?.hp||!integer(u.hp,1,D.cards[u.id].hp)||u.maxHP!==D.cards[u.id].hp||u.atk!==D.cards[u.id].atk||!/^u\d+$/.test(u.uid)||typeof u.ready!=='boolean'||typeof u.guard!=='boolean'))return false;
   if(b.units.length>3||b.captives.length>30||new Set([...b.units,...b.captives].map(u=>u.uid)).size!==b.units.length+b.captives.length)return false;
   if(!Array.isArray(b.enemies)||b.enemies.length>3||b.enemies.some(e=>!e||!integer(e.hp,0,99)||!integer(e.maxHP,1,99)||e.hp>e.maxHP||!integer(e.atk,0,20)||!/^e\d+$/.test(e.uid)||typeof e.name!=='string'||e.name.length>60||!['strike','fear','capture'].includes(e.kind)||typeof e.stunned!=='boolean'))return false;
   if(!texts(b.log)||!integer(b.hp,0,30)||!integer(b.energy,0,9)||!integer(b.debt,0,12)||!integer(b.helpCount,0,1)||typeof b.helpUsed!=='boolean'||typeof b.actionUsed!=='boolean'||b.hand.length>9)return false;
   const instanceIds=[...b.units,...b.captives,...b.enemies].map(x=>Number(x.uid.slice(1)));if(b.seq<Math.max(0,...instanceIds,b.fx?.id||0))return false;
   for(const k of ['insight','courage','leverage','blocked','binds','shield','turns','seq'])if(!integer(b[k]))return false;
   if(!validInvestigation(s))return false;
   const m=b.modern;if(!m||!['people','equipment','setups'].every(k=>Array.isArray(m[k])&&m[k].every(x=>x&&typeof x.id==='string')))return false;
   const inventory=[...b.hand,...b.deck,...b.discard,...b.units.map(x=>x.id),...b.captives.map(x=>x.id),...m.people.map(x=>x.id),...m.equipment.map(x=>x.id),...m.setups.map(x=>x.id),...(m.response?[m.response.id]:[])];
   if(inventory.length!==30||inventory.some(id=>!D.cards[id])||inventory.slice().sort().join('|')!==s.deckList.slice().sort().join('|'))return false;
 }
 if(s.deckList.some(id=>!M.discovered(s,D.cards[id])))return false;
 return M.validate(s);
}
function create(saved,seed){
 saved=upgrade(saved);
 if(saved&&!validate(saved))throw new Error('存档格式不兼容或内容已损坏。');
 let s=saved?clone(saved):fresh(seed);
 const ok=()=>({ok:true}),fail=msg=>({ok:false,msg}),battle=()=>s.view==='battle';
 const b=()=>s.battle,enc=()=>D.encounters[s.encounter],phase=()=>enc().phases[b().phase];
 function rng(){s.seed=(Math.imul(s.seed,1664525)+1013904223)>>>0;return s.seed/4294967296;}
 function shuffle(a){for(let i=a.length-1;i>0;i--){let j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
 function log(text){b().log.unshift(text);b().log=b().log.slice(0,70);}
 function fx(kind,title,art){b().fx={id:++b().seq,kind,title,art};}
 function draw(n){let drawn=0;for(let i=0;i<n;i++){if(b().hand.length>=9)break;if(!b().deck.length)b().deck=shuffle(b().discard.splice(0));if(!b().deck.length)break;b().hand.push(b().deck.shift());drawn++;}if(drawn&&b().catalog){b().catalog.stats.drawn+=drawn;M.catalog.emit(s,'draw');}}
 function heal(n){b().hp=Math.min(MAX_HP,b().hp+n);}
 function debt(n){b().debt=Math.max(0,Math.min(12,b().debt+n));}
 function removeUnit(u,killed=false){b().units=b().units.filter(x=>x.uid!==u.uid);b().discard.push(u.id);if(killed&&D.cards[u.id].deathDraw)draw(D.cards[u.id].deathDraw);}
 function release(all=true){let n=0;while(b().captives.length&&b().units.length<3&&(all||n===0)){const u=b().captives.shift();u.ready=false;b().units.push(u);n++;}if(n)log('灯下接回 '+n+' 名随行者。');return n;}
 function capture(){if(!b().units.length)return;const u=b().units.reduce((a,c)=>a.atk>=c.atk?a:c);b().units=b().units.filter(x=>x.uid!==u.uid);u.ready=false;b().captives.push(u);log('「'+D.cards[u.id].name+'」被护进门后，不能攻击或挡伤。');fx('capture','它被护得动不了了','mother');}
 function loadPhase(){
   const p=phase();Object.assign(b(),{insight:0,courage:0,leverage:0,blocked:0,binds:p.binds||0});
   b().enemies=p.enemies.map(x=>({...x,uid:'e'+(++b().seq),maxHP:x.hp,stunned:false}));
   b().investigation=investigationState(s);
   if(b().modern)M.phase(s);M.catalog.syncHorror(s);if(p.trapOnEnter)capture();log('【'+p.title+'】'+p.text);
 }
 function readyGoal(){if(!battle()||!M.extraGoal(s)||!Q.extraGoal(s,D))return false;const x=b(),p=phase(),target=p.target??2;switch(p.goal){case'clear':return x.enemies.every(e=>e.hp<=0);case'guard':return x.blocked>=(p.guardTarget??3)||x.enemies.every(e=>e.hp<=0);case'insight':return x.insight>=target;case'courage':return x.courage>=target;case'open':return x.leverage>=target;case'rescue':return x.binds===0&&x.captives.length===0;}return false;}
 function doneGoal(){return readyGoal()&&(!phase().investigation||b().investigation.solved);}
 function investigate(optionId){
   if(!battle())return fail('进入现场并完成准备后才能核验材料。');const p=phase(),spec=p.investigation;
   if(!spec)return fail('本幕没有待提交的材料判断。');
   if(!readyGoal())return fail('先达到本幕准备与现场要求，再根据材料作出判断。');
   const x=b().investigation;if(x.solved)return {ok:true,solved:true,already:true,msg:x.feedback};
   const option=spec.options.find(o=>o.id===optionId);if(!option)return fail('请选择本幕列出的判断。');
   x.answerId=option.id;x.feedback=option.feedback||'请回看材料。';
   if(option.correct!==true){b().hp-=2;b().misread=(b().misread||0)+1;fx('misread','它听见你说错了','mother');log('你把话说岔了。说错的话也算数：心神 −2。');if(checkDeath())return {ok:false,solved:false,msg:x.feedback};return {ok:false,solved:false,msg:x.feedback+'　——说错的话也算数：心神 −2。'};}
   x.solved=true;x.feedback=(spec.conclusion||option.feedback||'材料已核对。')+(spec.consequence?' 后续：'+spec.consequence:'');
   if(!s.history.some(h=>h.kind==='investigation'&&h.phaseKey===x.phaseKey))s.history.push({kind:'investigation',encounter:enc().id,phase:b().phase,phaseKey:x.phaseKey,investigationId:spec.id,answerId:option.id,text:x.feedback,consequence:spec.consequence||''});
   (function(){const alive=(b().enemies||[]).filter(e=>e.hp>0);if(alive.length){alive.forEach(e=>{const before=e.atk;e.atk=0;e.named=true;if(e.trait){e.silenced=e.trait;e.trait=null;}log('你当面说破了「'+e.name+'」的来由，它的压力从 '+before+' 落到 0'+(e.silenced?'，那套规矩也不灵了':'')+'。');});fx('named','说破了它的来由','lantern');}else log('你说破了这里的来由。');})();M.catalog.syncHorror(s);log('材料判断已记录：'+x.feedback+' 仍需结束回合并守住现场。');return {ok:true,solved:true,msg:x.feedback};
 }
 function checkDeath(){if(b().catalog)b().catalog.stats.minHP=Math.min(b().catalog.stats.minHP,Math.max(0,b().hp));if(b().hp<=0){b().hp=0;s.view='defeat';log('你没能撑过这一段。此战回合尚未计入战役，可从本战起点重来。');return true;}return false;}
 function begin(){
   if(s.view!=='map')return fail('先回到旅途，再进入遭遇。');
   const error=deckError(s.deckList);if(error)return fail(error);
   const replaced=s.deckList.filter(id=>!M.viable(s,D.cards[id])||D.cards[id].compatibilityOnly);if(replaced.length)adaptDeck();
   s.view='battle';s.lastChoice=null;
   s.battle={phase:0,turn:1,turns:0,hp:MAX_HP,energy:Math.min(9,3+s.refundCredit),debt:s.debt,shield:0,hand:[],deck:shuffle([...s.deckList]),discard:[],units:[],captives:[],enemies:[],seq:0,log:[],helpUsed:false,helpCount:0,actionUsed:false,fx:null};
   M.init(s);draw(6);loadPhase();M.catalog.syncHorror(s,true);if(replaced.length)log('已按本场条件替换 '+replaced.length+' 张不适用牌：'+[...new Set(replaced)].map(id=>D.cards[id].name).join('、')+'。');return ok();
 }
 function play(index,target){
   if(!battle())return fail('现在不能出牌。');
   if(!Number.isInteger(index))return fail('请选择手牌。');
   const id=b().hand[index],c=D.cards[id];if(!c)return fail('这张牌不在手里。');
   if(c.modern){const err=M.reason(s,c);if(err)return fail(err);if(c.target==='enemy'&&!b().enemies.some(e=>e.uid===target&&e.hp>0))return fail('请选择仍在场的目标。');b().hand.splice(index,1);M.put(s,c,target);checkDeath();return {ok:true,combo:!!b().catalog?.comboHit};}
   const silence=M.catalog.horrorReason(s,c);if(silence)return fail(silence);if(b().energy<c.cost)return fail('香火不足，下一回合会恢复。');
   if(c.type==='随行'&&b().units.length>=3)return fail('随行位置已满，先送别一名或使用镇物。');
   const ally=b().units.find(x=>x.uid===target),enemy=b().enemies.find(x=>x.uid===target&&x.hp>0);
   if(c.target==='ally'&&!ally)return fail('请选择一名场上的己方随行者。');if(c.target==='enemy'&&!enemy)return fail('请选择一名还在场的敌人。');
   M.catalog.recordPlay(s,c);b().hand.splice(index,1);b().energy-=c.cost;debt(c.debt||0);
   if(c.type==='随行')b().units.push({id,uid:'u'+(++b().seq),hp:c.hp,maxHP:c.hp,atk:c.atk,guard:!!(c.guard||(c.conditionalGuard&&b().units.length)),ready:!!c.rush});else b().discard.push(id);
   switch(c.effect){
    case'leverage':b().leverage+=c.value;break;case'heal':heal(c.value);break;case'insight':M.catalog.gain(s,'insight',c.value);break;case'shield':b().shield+=c.value;break;
    case'cut':b().binds=Math.max(0,b().binds-1);release();break;
    case'bar':b().shield+=5;b().leverage++;break;
    case'oil':M.catalog.gain(s,'insight',2);draw(1);break;
    case'borrow':b().energy=Math.min(9,b().energy+2);heal(2);break;
    case'send':removeUnit(ally);heal(4);debt(-2);break;
    case'stitch':ally.hp=Math.min(ally.maxHP,ally.hp+4);heal(2);break;
    case'burn':enemy.hp=Math.max(0,enemy.hp-5);b().leverage++;break;
    case'hush':enemy.stunned=true;M.catalog.gain(s,'insight',1);break;
    case'call':b().courage+=2;heal(1);break;
    case'salt':b().enemies.forEach(e=>e.hp=Math.max(0,e.hp-2));b().shield+=2;break;
    case'warm':heal(6);if(b().captives.length)b().courage++;break;
    case'name':debt(-2);draw(1);break;
    case'rescue':b().binds=0;release();heal(2);break;
    case'cord':b().units=b().units.filter(x=>x.uid!==ally.uid);b().units.unshift(ally);ally.ready=true;b().shield+=3;break;
    case'mirror':enemy.hp=Math.max(0,enemy.hp-7);b().hp-=2;break;
    case'pass':b().units.forEach(u=>u.hp=Math.min(u.maxHP,u.hp+2));b().courage++;b().shield+=3;break;
   }
   if(c.effect==='call')M.inquire(s);log('打出「'+c.name+'」。'+c.text);fx(c.debt?'borrow':'card',c.name,c.art);checkDeath();return ok();
 }
 function attack(uid,eid){
   if(!battle())return fail('现在不能攻击。');const u=b().units.find(x=>x.uid===uid),e=b().enemies.find(x=>x.uid===eid&&x.hp>0);
   if(!u||!u.ready||u.atk<=0)return fail('这名随行者本回合不能攻击。');if(!e)return fail('请选择存活的敌人。');
   u.ready=false;e.hp=Math.max(0,e.hp-u.atk);log(D.cards[u.id].name+'击中'+e.name+'，造成 '+u.atk+' 伤害。');fx('strike',e.name+' −'+u.atk,D.cards[u.id].art);return ok();
 }
 function action(kind,target){
   if(!battle())return fail('现在不能行动。');if(b().actionUsed)return fail('每回合只能执行一次场景行动。');const actionCost=M.actionCost(s,kind);if(b().energy<actionCost)return fail('本次场景行动费用不足。');
   if(!['goal','strike','guard','dismiss'].includes(kind))return fail('未知行动。');
   const leaving=b().units.find(u=>u.uid===target);
   if(kind==='dismiss'&&!leaving)return fail('请选择一名要送别的随行者。');
   const g=phase().goal;const hit=kind==='strike'||(kind==='goal'&&g==='clear');const e=b().enemies.find(x=>x.uid===target&&x.hp>0);
   if(hit&&!e)return fail('请选择要压制的危险或对手。');if(hit&&M.catalog.hasHush(s))return fail('噤口未解：先用「先护现场」解除，或用卡牌化解危险。');
   if(kind==='goal'&&g==='rescue'&&b().binds===0&&(!b().captives.length||b().units.length>=3))return fail('已无可松开的束缚；若有人被困，请先留出随行位置。');
   if(kind==='goal'&&['insight','courage','open'].includes(g)&&b()[D.goals[g].stat]>=(phase().target??2))return fail('数值准备已经足够；请处理剩余现场要求或核验材料。');
   b().energy-=actionCost;b().actionUsed=true;
   if(kind==='dismiss'){removeUnit(leaving);log('你送别了'+D.cards[leaving.id].name+'，给被困者留出一个位置。');}
   else if(hit){M.catalog.apply(s,[{op:'damage',n:BASIC_STRIKE}],null,e.uid);log('稳住手压下'+e.name+'，基础压制 '+BASIC_STRIKE+'。');}
   else if(kind==='guard'||g==='guard'){b().shield+=3;log('你撑住门板，护身 +3。');}
   else if(g==='rescue'){b().binds=Math.max(0,b().binds-1);release(false);log('你松开了一道牵扯。');}
   else {const stat=D.goals[g].stat;M.catalog.gain(s,stat,1);log(phase().action+'，进度 +1。');}
   M.afterAction(s,kind,e?.uid);return ok();
 }
 function help(){if(battle()&&enc().chapter===6)return fail('本案由独立守卫接手，温既白不再提供战斗援助。');if(!battle()||b().helpUsed)return fail('温既白这场已经帮过一次。');b().helpUsed=true;b().helpCount=1;b().shield+=3;heal(5);const text='温既白替你稳住现场，又递来药：回复5心神，护身+3。';if(!s.history.some(h=>h.kind==='help'&&h.encounter===enc().id))s.history.push({kind:'help',encounter:enc().id,phase:b().phase,turn:b().turn,text});log(text+'此事已记入案卷。');fx('help','“先站稳，我在这儿。”','card-new01');return ok();}
 function hitPlayer(amount,enemy){
   amount=M.catalog.modifyHit(s,amount);const original=amount;const shield=Math.min(b().shield,amount);b().shield-=shield;amount-=shield;b().blocked+=shield;
   if(amount<=0){M.catalog.onHit(s,enemy,shield,0);return;}
   const u=b().units.find(x=>x.guard)||b().units[0];
   if(u){u.hp-=amount;b().blocked+=amount;log(D.cards[u.id].name+'挡下 '+amount+' 伤害。');if(u.hp<=0)removeUnit(u,true);}
   else{b().hp-=amount;log('你受到 '+amount+' 点敌袭。');}M.catalog.onHit(s,enemy,shield,u?0:amount);
 }
 function end(){
   if(!battle())return fail('这场已经结束。');
   M.beforeEnd(s);if(checkDeath())return ok();
   for(const e of b().enemies){if(e.hp<=0)continue;if(e.stunned){e.stunned=false;b().blocked+=e.atk;log(e.name+'本回合的施压被阻止，保护进度 +'+e.atk+'。');continue;}if(M.blockEnemy(s,e))continue;hitPlayer(e.atk,e);if(checkDeath())return ok();if(e.kind==='capture')capture();if(e.kind==='fear'){b().hp--;log('旧话侵入心神：−1。');if(checkDeath())return ok();}}
   /* —— 夜禁脾气：它不打你，它按自己的规矩要东西 —— */
   for(const e of b().enemies){
     if(e.hp<=0||!e.trait)continue;
     const T=(D.horrorTraits||{})[e.trait];
     if(e.trait==='claim'){
       if(b().hand.length){
         const idx=b().hand.length-1,gone=b().hand[idx];
         b().hand.splice(idx,1);b().discard.push(gone);b().catalog.stats.discarded++;
         const nm=(D.cards[gone]&&D.cards[gone].name)||'一张牌';
         log('「'+e.name+'」伸过来拿走了「'+nm+'」。它自动取走了最右侧的牌。');
         fx('claim','它拿走了「'+nm+'」',e.art||'mother');
       }else{
         b().hp-=2;log('「'+e.name+'」伸过来时你手里空着，它取走 2 心神。');
         fx('claim','手里空着，它取了心神',e.art||'mother');
         if(checkDeath())return ok();
       }
     }
     if(e.trait==='watch'&&b().hand.length>=4){
       b().hp-=1;log('「'+e.name+'」数得清你手里还攥着 '+b().hand.length+' 张。被数着的人少 1 心神。');
       if(checkDeath())return ok();
     }
   }
   if(b().debt>=6){b().hp-=2;log('欠名达到 6，借来的气索走 2 心神。');if(checkDeath())return ok();}
   b().turns++;
   const ready=doneGoal();
   if(ready&&b().phase===enc().phases.length-1){
     s.completed.push({id:enc().id,turns:b().turns,hp:b().hp,help:b().helpCount,cardStats:clone(b().catalog.stats)});s.borrowedHelp+=b().helpCount;s.debt=b().debt;s.refundCredit=b().modern.refundNext;
     if(enc().clue&&!s.clues.includes(enc().clue))s.clues.push(enc().clue);
     s.history.push({encounter:enc().id,turns:b().turns});s.view='aftermath';log('遭遇完成，'+b().turns+' 回合已计入旅途。');return ok();
   }
   if(ready){b().phase++;loadPhase();fx('phase',phase().title,enc().art);}
   b().turn++;const prepared=M.catalog.nextTurn(s);b().energy=Math.max(1,Math.min(9,Math.min(6,3+Math.floor((b().turn-1)/2))+b().modern.refundNext+prepared));b().catalog.turnBudget=b().energy;b().modern.refundNext=0;b().actionUsed=false;b().units.forEach(u=>u.ready=true);draw(2);M.catalog.syncHorror(s,true);checkDeath();return ok();
 }
 function choose(id){
   if(s.view!=='aftermath'||!enc().choice||s.lastChoice)return fail('现在没有待选择的对话。');const o=enc().choice.options.find(x=>x.id===id);if(!o)return fail('未知选择。');if(o.correct===false)return fail(o.text);Object.assign(s.flags,o.flags);s.lastChoice=o.id;s.history.push({encounter:enc().id,choice:o.id,text:o.text});return ok();
 }
 function next(){
   if(s.view==='home'){s.view='map';return ok();}
   if(s.view==='caseEnd'){
     if(enc().chapter===5&&!s.flags.hiddenOpened)return fail('请先查看五案后的未决事项，再决定继续调查。');
     s.encounter++;s.view='map';s.battle=null;s.lastChoice=null;return ok();
   }
   if(s.view!=='aftermath')return fail('请先完成眼前遭遇。');
   if(enc().choice&&!s.lastChoice)return fail('先回应眼前的人。');
   if(s.encounter===D.encounters.length-1){s.view='endingChoice';return ok();}
   if(enc().scene===18){s.view='caseEnd';return ok();}
   s.encounter++;s.view='map';s.battle=null;s.lastChoice=null;return ok();
 }
 function retry(){if(s.view!=='defeat')return fail('只有失败后才能重试本战。');s.view='map';s.battle=null;return ok();}
 function setDeck(list){if(!['home','map'].includes(s.view))return fail('只能在遭遇之间调整牌组。');const error=deckError(list);if(error)return fail(error);if(list.some(id=>!M.discovered(s,D.cards[id])||!M.viable(s,D.cards[id])))return fail('含未解锁或本场不适用的牌。');s.deckList=[...list];return ok();}
 function finish(owner){if(s.view!=='endingChoice'||!['public','witness'].includes(owner))return fail('现在不能交付终卷。');s.lampOwner=owner;s.result='recorded';s.view='ending';s.history.push({text:owner==='public'?'认证副本交公开复查处，原件各处保管。':'认证副本另存见证人处，公开复查同步继续。'});return ok();}
 function openHidden(){if(s.view!=='caseEnd'||enc().chapter!==5)return fail('先完成五案，再核对未决事项。');s.flags.hiddenOpened=true;return next();}

 function adaptDeck(){if(!['home','map'].includes(s.view))return fail('请在场景间调整牌组。');const kept=s.deckList.filter(id=>M.viable(s,D.cards[id])&&!D.cards[id].compatibilityOnly);for(const id of M.recommended(s))if(kept.length<30&&kept.filter(x=>x===id).length<(D.cards[id].mode==='person'?1:2))kept.push(id);for(const c of D.playerCards.filter(c=>M.discovered(s,c)&&M.viable(s,c)))while(kept.length<30&&kept.filter(x=>x===c.id).length<(c.mode==='person'?1:2))kept.push(c.id);return setDeck(kept);}
 return {get s(){return s;},begin,play,attack,action,help,end,choose,next,retry,setDeck,adaptDeck,recommend:style=>setDeck(M.recommended(s,style)),deployUse:id=>M.use(s,id),withdraw:id=>M.withdraw(s,id),fieldTask:kind=>M.task(s,kind),finish,openHidden,readyGoal,doneGoal,investigate,serialize:()=>JSON.stringify(s),totalTurns:()=>s.completed.reduce((n,x)=>n+x.turns,0),reset(seed){s=fresh(seed);}};
}
function migrate(old){if(old?.version===4)return upgrade(old);if(!old||![2,3,4].includes(old.version))throw Error('仅支持六案V1或代表卡V2存档迁移。');const s=clone(old);s.version=VERSION;if(s.lastChoice&&!D.encounters[s.encounter]?.choice?.options.some(o=>o.id===s.lastChoice))s.lastChoice=null;s.refundCredit=s.refundCredit||0;if(['battle','defeat'].includes(s.view)){s.view='map';s.battle=null;s.lastChoice=null;}s.deckList=M.recommended(s);if(s.battle){M.init(s);s.battle.hand=[];s.battle.deck=[...s.deckList];s.battle.discard=[];s.battle.units=[];s.battle.captives=[];}if(!validate(s))throw Error('旧存档的进度或内容不一致。');return s;}
const api={create,fresh,validate,migrate,upgrade,deckError,KEY,VERSION,MAX_HP,BASIC_STRIKE};root.BDEngine=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
