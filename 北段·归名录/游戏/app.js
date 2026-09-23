(function(){'use strict';
const D=window.BDData,E=window.BDEngine,M=window.BDMechanics,$=id=>document.getElementById(id),esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let game,loadWarning='',selection=null,modal=null,draft=null,filter='',lastFX=0,timer,focusBefore=null;
try{const raw=localStorage.getItem(E.KEY);game=E.create(raw?JSON.parse(raw):null);}catch(e){game=E.create();loadWarning='旧存档未能读取。本次使用新进度；原始存档暂未覆盖。';}
let canSave=!loadWarning;
const mobileLayout=()=>matchMedia('(max-width:760px), (max-width:1024px) and (max-height:500px)').matches;
let renderedScreen='';
const modalPositions=new Map();
const modalKey=m=>typeof m==='string'?m:(m?.type||'')+':'+(m?.id||m?.key||'');
function rememberModalScroll(){const el=$('overlay').querySelector('.modal');if(modal&&el)modalPositions.set(modalKey(modal),el.scrollTop);}
function restoreModalScroll(){const el=$('overlay').querySelector('.modal');if(el)el.scrollTop=modalPositions.get(modalKey(modal))||0;}
function syncViewport(){const v=window.visualViewport;document.documentElement.style.setProperty('--visible-height',(v?.height||innerHeight)+'px');document.documentElement.style.setProperty('--visible-top',(v?.offsetTop||0)+'px');}
window.addEventListener('resize',syncViewport,{passive:true});
window.visualViewport?.addEventListener('resize',syncViewport,{passive:true});
window.visualViewport?.addEventListener('scroll',syncViewport,{passive:true});
syncViewport();
let previousBattle=null, feedback='';
const ST=window.BDStory;
D.Art?.remap?.();
let deckType='',deckSource='',deckPage=0,deckOnly=false,deckReveal=false,journalCase='',audioContext,mobilePanel='table';
let prefs={sound:false,seen:{}};try{Object.assign(prefs,JSON.parse(localStorage.getItem(E.KEY+'-ui')||'{}'));}catch(e){}prefs.seen=prefs.seen||{};
function savePrefs(){try{localStorage.setItem(E.KEY+'-ui',JSON.stringify(prefs));}catch(e){}}
function tone(kind='click'){if(!prefs.sound)return;try{audioContext=audioContext||new (window.AudioContext||window.webkitAudioContext)();audioContext.resume();const o=audioContext.createOscillator(),g=audioContext.createGain(),t=audioContext.currentTime;o.type='triangle';o.frequency.setValueAtTime(kind==='end'?196:kind==='play'?392:294,t);o.frequency.exponentialRampToValueAtTime(100,t+.22);g.gain.setValueAtTime(.035,t);g.gain.exponentialRampToValueAtTime(.0001,t+.28);o.connect(g).connect(audioContext.destination);o.start(t);o.stop(t+.3);}catch(e){}}
const story=()=>ST?.byId[ch().id];
const sceneArt=()=>D.Art?.scene?.(ch())||window.BDArt?.sceneKeys?.[ch().chapter]||'scene-case'+String(ch().chapter).padStart(2,'0');

function terms(value){return String(value??'').replace(/察觉/g,'调查').replace(/勇气/g,'交涉').replace(/门隙/g,'通路').replace(/通路准备|通路核对/g,'通路').replace(/询问准备/g,'交涉').replace(/调查准备|核验准备/g,'调查').replace(/通路 (\d+\/3)/g,'路线 $1');}
/** 显示层：把含糊「N费」展开为可读香火表述，不改 catalog 数据。 */
function expandFeeDisplay(value){
  return String(value??'')
    .replace(/每轮一次，(\d+)费：/g,'每轮一次，可花 $1 香火')
    .replace(/(\d+)费：/g,'花 $1 香火')
    .replace(/(\d+)费(?!用)/g,'花 $1 香火');
}
/** 氛围句 / 规则句：取 text 首句为氛围，其余为规则；无句号则整段作规则。 */
function cardRuleParts(c){
  const full=expandFeeDisplay(terms(c?.text||''));
  const i=full.indexOf('。');
  if(i<0)return{mood:'',rule:full,label:full};
  const mood=full.slice(0,i).trim();
  const rule=full.slice(i+1).replace(/^[。\s]+/,'').trim();
  if(!mood||!rule)return{mood:'',rule:full,label:full};
  return{mood,rule,label:mood+'。'+rule};
}
function cardRuleFaceHtml(c){
  const d=cardRuleParts(c);
  return(d.mood?`<span class="card-v2-mood">${esc(d.mood)}</span><br>`:'')+`<span class="card-v2-mech">${esc(d.rule)}</span>`;
}
function cardRuleDetailHtml(c){
  const d=cardRuleParts(c);
  const bits=[d.mood,...d.rule.split(/[；。]/).map(t=>t.trim()).filter(Boolean)].filter(Boolean);
  return bits.map(t=>'<p>'+esc(t)+'</p>').join('');
}
function numericReady(){return game.readyGoal?game.readyGoal():game.doneGoal();}
function investigationState(){return b()?.investigation||{};}
function submitInvestigation(id){
 const before=b()?.hp,result=game.investigate(id);
 feedback=result.msg||investigationState().feedback||'判断已记录。';
 if(!result.ok&&b()?.hp<before)feedback+=' 当前心神 '+b().hp+'。';
 save();
 if(s().view==='defeat'){modal=null;selection=null;render();return;}
 render();
 if(!result.ok&&!investigationState().feedback)notice(result.msg);
 revealInvestigationFeedback();
}
function basicStrike(){return E.BASIC_STRIKE??2;}
function basicStrikeBlocked(){return b()?.enemies.some(e=>e.hp>0&&e.trait==='hush');}
function nightRules(){const rows=(b()?.enemies||[]).filter(e=>e.hp>0&&D.horrorTraits?.[e.trait]);return rows.length?'<section class="night-rules" aria-label="本幕夜禁"><h3>本幕夜禁</h3>'+rows.map(e=>'<p><b>'+esc(D.horrorTraits[e.trait].name)+'</b> · '+esc(e.name)+'<span>'+esc(D.horrorTraits[e.trait].text)+'</span></p>').join('')+'</section>':'';}
function evidenceBody(){const p=ph(),q=p.investigation,inv=investigationState();if(!q)return '<p>本幕没有需要提交的材料判断。</p>';return `<div class="evidence-workbench"><p class="eyebrow">亲历材料 · 第 ${b().phase+1} 幕</p><h2>${esc(q.prompt)}</h2><div class="evidence-materials">${q.materials.map((m,i)=>`<article><span>材料 ${i+1}</span><h3>${esc(m.label)}</h3><p>${esc(m.text)}</p></article>`).join('')}</div><p class="evidence-rule">${inv.solved?'判断已经写入案卷。':numericReady()?'准备已齐全。哪一种解释符合眼前材料？':'准备未齐（'+goalStatus()+'）。可以先读材料；完成本幕准备前，判断选项暂不可提交。'}</p>${inv.feedback?`<div class="evidence-feedback ${inv.solved?'solved':''}" role="status" tabindex="-1">${esc(inv.feedback)}${!inv.solved?'<p class=judgment-cost>本次误判失去 2 心神；当前心神 '+b().hp+'。</p>':''}</div>`:''}${inv.solved?`<p class="evidence-selected">你的判断：${esc(q.options.find(o=>o.id===inv.answerId)?.label||'')}</p>${button('确认判断并继续结算 →','evidenceEnd','','primary')}`:`<div class="evidence-options">${q.options.map(o=>button(esc(o.label),'investigate',`data-id="${o.id}" ${!numericReady()?'disabled':''}`)).join('')}</div>`}<p class="caption">每次误判失去 2 心神；归零会失败，可从本场重试。先核对材料，再提交判断。</p></div>`;}
function revealInvestigationFeedback(){requestAnimationFrame(()=>{const el=document.querySelector('.evidence-feedback');el?.scrollIntoView({block:'center',behavior:'instant'});el?.focus({preventScroll:true});});}
function mobileBattleNav(){return `<nav class="mobile-battle-nav" aria-label="牌桌快捷操作"><span>心神 ${b().hp} · ${goalStatus()} · 香火 ${b().energy}</span><div>${button('牌桌','focusTable','',mobilePanel==='table'?'active':'')}${button('行动 / 结算','focusGoal','',mobilePanel==='goal'?'active':'')}${button('手牌 '+b().hand.length,'handAll')}${button(ph().investigation?'材料':'案卷',ph().investigation?'evidence':'journal')}</div></nav>`;}

function handBody(){return `<p class="eyebrow">当前手牌 · ${b().hand.length} / 9</p><h2>比较作用与使用条件</h2><p>每张牌均列出当前能否使用。香火还剩 ${b().energy}。</p><div class="hand-compare">${b().hand.map((id,i)=>{const c=D.cards[id],why=cardBlock(c),d=cardRuleParts(c);return `<article class="compare-card">${cardTile(id,i)}<div class="compare-copy"><h3>${esc(c.name)}</h3><small>${c.cost} 香火 · ${esc(c.type)}</small>${d.mood?`<p class="compare-mood">${esc(d.mood)}</p>`:''}<p>${esc(d.rule)}</p><p class="compare-condition">${esc(terms(c.conditions||'随时'))}</p><strong class="${why?'warning':'available'}">${esc(terms(why||'现在可以使用'))}</strong><div class=compare-actions>${button('查看完整作用','inspect',`data-id="${id}" data-hand-index="${i}"`)}${button('打出 · '+c.cost+' 香火','play',`data-index="${i}" ${why?'disabled':''}`,'primary')}</div></div></article>`;}).join('')}</div>`;}

function passageKind(){return s().view==='map'?'opening':s().view==='battle'?'phase'+b().phase:s().view==='aftermath'?'closing':null;}
function passageLines(kind){const t=story();if(!t)return [];if(kind==='opening')return t.opening;if(kind==='closing')return s().completed.length>s().encounter?t.closing:[];if(/^phase[0-2]$/.test(kind)){const i=Number(kind.slice(5));return b()&&i<=b().phase?t.phases[i]:[];}return [];}
function passageBeat(kind){if(kind==='opening')return '第一幕开始 · 进入现场';if(kind==='closing')return '本场已完成 · 线索已加入案卷';const i=Number(String(kind).slice(5));return i>0?'上一幕已理清 · 第 '+(i+1)+' 幕开始':'第一幕开始 · 进入现场';}
function showPassage(kind){if(!passageLines(kind).length)return;openModal({type:'passage',kind,at:0,key:ch().id+':'+kind});}
function maybePassage(){const kind=passageKind();if(!modal&&kind&&!prefs.seen[ch().id+':'+kind])showPassage(kind);}
function endPassage(){prefs.seen[modal.key]=true;savePrefs();modal=null;render();}
function passageBody(){const lines=passageLines(modal.kind),line=lines[modal.at]||lines[0];if(!line)return '';const beat=passageBeat(modal.kind);return `<div class="passage" style="--passage-art:url('assets/${sceneArt()}.webp')"><div class="passage-top"><span>${esc(ch().title)}</span><small>${modal.at+1} / ${lines.length}</small></div><div class="passage-line"><p class="passage-beat">${esc(beat)}</p><p class="speaker">${esc(line.speaker)}</p><p class="spoken">${esc(line.text)}</p></div><div class="passage-actions">${button('略过这段','passageSkip','','quiet')}${button(modal.at+1<lines.length?'继续听 →':modal.kind==='closing'?'整理调查结果 →':'回到现场 →','passageNext','','primary')}</div></div>`;}
function renderReview(chapter){const c=Number(chapter),r=ST?.caseReviews[c];if(!r||s().completed.length<c*18)return '<p>完成本案后，才能回看完整因果。</p>';return `<p class="eyebrow">已完成案件 · 因果复盘</p><h2>${esc(r.title)}</h2><p>${esc(r.summary)}</p><h3>当时怎样想，后来凭什么改变</h3>${r.reversals.map(x=>'<article class="review-pair"><p><small>最初判断</small>'+esc(x.belief)+'</p><p><small>改变判断的材料</small>'+esc(x.correction)+'</p></article>').join('')}<h3>查明的部分</h3>${r.established.map(x=>'<p class="journal-entry">'+esc(x)+'</p>').join('')}<h3>还不能下的结论</h3>${r.limits.map(x=>'<p>'+esc(x)+'</p>').join('')}<h3>人们后来怎样</h3>${r.people.map(x=>'<p><b>'+esc(x.name)+'</b>：'+esc(x.result)+'</p>').join('')}<div class="clue-found"><small>${esc(r.bridge.label)}</small><p>${esc(r.bridge.fact)}</p><p>${esc(r.bridge.next)}</p></div>`;}
function journalBody(){const chapters=D.chapters.filter(c=>s().completed.length>=(c.id-1)*18+1),clues=s().clues.filter(c=>!journalCase||c.startsWith(String(journalCase).padStart(2,'0')+'-'));const history=s().history.filter(x=>x.text&&(!journalCase||D.encounters.find(e=>e.id===x.encounter)?.chapter===Number(journalCase)));return `<h2>灯下案卷</h2><p>只记录亲历核验的材料与实际行动。目标准备不会替你作出判断。</p><div class="filter-tabs">${button('全部','journalCase','data-id=""',!journalCase?'active':'')}${chapters.map(c=>button(esc(c.title),'journalCase',`data-id="${c.id}"`,String(c.id)===journalCase?'active':'')).join('')}</div>${chapters.filter(c=>s().completed.length>=c.id*18).map(c=>button('复盘：'+esc(c.title),'caseReview',`data-id="${c.id}"`,'quiet')).join('')}${clues.length?clues.slice().reverse().map(c=>`<article class="journal-entry"><h3>${esc(c)}</h3><p>${esc(D.clueTexts[c])}</p></article>`).join(''):'<p>本页还没有完成的场景记录。</p>'}<h3>我的判断与同行记录</h3>${history.slice().reverse().map(x=>'<p class="journal-entry">'+(x.encounter?'<small>'+esc(D.encounters.find(e=>e.id===x.encounter)?.title||'')+'</small>':'')+esc(x.text)+'</p>').join('')||'<p>还没有提交判断或接受援助。</p>'}`;}
function libraryBody(){const editable=['home','map'].includes(s().view),counts={};draft.forEach(id=>counts[id]=(counts[id]||0)+1);let list=(D.playerCards||D.cardList).filter(c=>(deckReveal||M.discovered(s(),c))&&(!filter||(c.name+c.type+c.text+c.conditions).includes(filter))&&(!deckType||c.type===deckType)&&(!deckSource||String(c.sourceCase||c.caseId||0)===deckSource)&&(!deckOnly||M.viable(s(),c)));list.sort((a,b)=>Number(M.viable(s(),b))-Number(M.viable(s(),a))||a.cost-b.cost||a.id.localeCompare(b.id));const pages=Math.max(1,Math.ceil(list.length/24));deckPage=Math.min(deckPage,pages-1);const shown=list.slice(deckPage*24,(deckPage+1)*24),types=[...new Set(D.playerCards.map(c=>c.type))];return `<div class="deck-heading"><div><p class="eyebrow">${D.playerCards.filter(c=>M.discovered(s(),c)).length} / ${D.playerCards.length} 已收集</p><h2>随身牌组</h2></div><strong>${draft.length} <small>/ 30</small></strong></div><p>${editable?'人物同名最多1张，其余最多2张。可以混合构筑；场景条件不符的牌不能带入。':'当前可查阅。收好本场记录、进入下一场准备页后，可调整构筑。'}</p><div class="deck-toolbar"><label>找牌 <input id="deck-search" value="${esc(filter)}" placeholder="名称、作用或条件"></label>${editable?button('保存牌组','saveDeck',draft.length===30?'':'disabled','primary'):''}</div>${editable?'<div class="recipe-row"><span>一键构筑</span>'+[['balanced','均衡'],['guard','防护'],['insight','核验'],['tools','装备']].map(([id,name])=>button(name,'recipe',`data-id="${id}"`)).join('')+button('清空草稿','clearDraft','','quiet')+'</div>':''}<details class="deck-picked"><summary>已选 ${draft.length} 张 · 点击减去一张</summary><div>${Object.entries(counts).map(([id,n])=>button(esc(D.cards[id]?.name||id)+' ×'+n,'deckMinus',`data-id="${id}" ${editable?'':'disabled'}`,'picked-chip')).join('')||'<p>先选择一种构筑，或从下方逐张加入。</p>'}</div></details><div class="filter-tabs">${button(deckReveal?'返回已收集':'全卡图鉴 · '+D.playerCards.length,'cardReveal','',deckReveal?'active':'')}${button('全部类型','cardType','data-id=""',!deckType?'active':'')}${types.map(t=>button(t,'cardType',`data-id="${t}"`,deckType===t?'active':'')).join('')}${button(deckOnly?'✓ 只看本场可用':'只看本场可用','cardViable','',deckOnly?'active':'')}</div>${deckReveal?'<p class="spoiler-notice">全卡图鉴含后续人物与物件，可能提前透露故事内容。仅已收集的卡可以加入牌组。</p>':''}<div class="library">${shown.map(c=>`<div class="library-row">${button(art(c.art,'',c.name,c.artExt||'webp'),'inspect',`data-id="${c.id}" aria-label="查看${c.name}"`,'library-art')}<div><h3>${esc(c.name)}<small>${c.cost} 香火 · ${c.type}</small></h3><p>${esc(c.shortText||c.text)}</p>${!M.discovered(s(),c)?'<small class="warning">尚未收集 · 推进调查后获得</small>':!M.viable(s(),c)?'<small class="warning">本场条件不适用</small>':''}</div><div class="quantity">${button('−','deckMinus',`data-id="${c.id}" aria-label="减少${c.name}" ${!editable||!counts[c.id]?'disabled':''}`)}<b>${counts[c.id]||0}</b>${button('+','deckPlus',`data-id="${c.id}" aria-label="增加${c.name}" ${!editable||!M.discovered(s(),c)||!M.viable(s(),c)||(counts[c.id]||0)>=(c.mode==='person'?1:2)||draft.length>=30?'disabled':''}`)}</div></div>`).join('')||'<p>没有符合筛选的已收集卡。</p>'}</div><div class="pagination">${button('← 上页','cardPage',`data-page="${deckPage-1}" ${deckPage===0?'disabled':''}`)}<span>${deckPage+1} / ${pages} 页 · ${list.length} 张</span>${button('下页 →','cardPage',`data-page="${deckPage+1}" ${deckPage>=pages-1?'disabled':''}`)}</div>`;}
function deployedTile(x){const c=D.cards[x.id],label=M.abilityLabel(x.id),why=M.useReason(s(),x.id);return `<div class="deployed-piece mode-${esc(c.mode)}"><button class="deployed-portrait" data-action="inspectDeployed" data-id="${x.id}" aria-label="查看已部署${esc(c.name)}">${art(c.art,'',c.artSubject||c.name,c.artExt||'webp')}<span>${esc(c.name)}</span><small>${esc(modeLabel(c))}${Number.isFinite(x.charges)?' · '+x.charges+' 次':''}</small></button>${label?button(label,'deployUse',`data-id="${x.id}" title="${esc(why)}" ${why?'disabled':''}`,'deployed-use'):'<small class="passive-label">条件满足时协作</small>'}${button('撤下','withdraw',`data-id="${x.id}"`,'deployed-remove')}</div>`;}

function tableDeployments(){const m=b().modern,all=[...m.people,...m.equipment,...m.setups];return all.length?all.map(deployedTile).join(''):'<div class="empty-deploy"><span class="empty-seal">协</span><div><b>留一张牌，陪你走过这一场</b><span>人物、器物与布置会留桌协作 · 点击卡面查看持续作用</span></div></div>';}
function comboBar(){const c=b().catalog;if(!c)return '';const has=(c.focus||0)+(c.resolve||0)+(c.route||0);return `<div class="combo-bar" aria-label="连招筹码"><small>连招筹码</small><span>专注 ${c.focus||0}/5</span><span>信任 ${c.resolve||0}/5</span><span>脚步 ${c.route||0}/5</span>${has?`<i class="combo-hint">兑现时灯会暗一下</i>`:''}</div>`;}
function goalHint(){const p=ph();if(game.doneGoal())return '当前目标已达成。结算仍会处理干扰；保持达成才能进入下一幕。';if(numericReady()&&p.investigation)return '准备齐全，请对照材料提交判断。';return p.goal==='guard'?`挡住 ${p.guardTarget||3} 点压力，或打散全部阻力。`:['insight','courage','open'].includes(p.goal)?'目标行动每次 +1；卡牌可加快准备或抵挡压力。':terms(D.goals[p.goal].hint);}

const s=()=>game.s,b=()=>s().battle,ch=()=>D.encounters[s().encounter],ph=()=>ch().phases[b().phase];
function spriteStyle(tile){const q=tile.bounds||{x:tile.column/4,y:tile.row/4,width:.25,height:.25};return `--sprite-width:${100/q.width}%;--sprite-height:${100/q.height}%;--sprite-left:${-100*q.x/q.width}%;--sprite-top:${-100*q.y/q.height}%;--sprite-aspect:${tile.aspect||1.5};`;}
const art=(name,cls='',alt='',ext='webp')=>{const tile=D.Art?.sprites?.[name];return tile?`<span class="art-sprite ${cls}" style="${spriteStyle(tile)}"><img src="assets/${esc(tile.sheet)}.${ext}" alt="${esc(alt)}" draggable="false" style="position:absolute;width:var(--sprite-width);height:var(--sprite-height);max-width:none;object-fit:fill;object-position:center;left:var(--sprite-left);top:var(--sprite-top)"></span>`:`<img class="${cls}" src="assets/${esc(name)}.${ext}" alt="${esc(alt)}" draggable="false">`;};
function button(label,action,attrs='',cls=''){return `<button class="${cls}" data-action="${action}" ${attrs}>${label}</button>`;}
function save(){if(!canSave)return;try{localStorage.setItem(E.KEY,game.serialize());}catch(e){notice('浏览器未能保存进度，请保持当前页面；可在菜单导出存档。');}}
function notice(text){$('notice').textContent=text;$('notice').classList.add('show');clearTimeout(timer);timer=setTimeout(()=>$('notice').classList.remove('show'),3800);}
function changes(before,after){
 if(!before||!after)return '';
 if(before.phase!==after.phase)return '本幕已理清：'+ch().phases[before.phase].title+'。接下来进入「'+ph().title+'」，目标进度重新开始。';
 const labels={energy:'香火（出牌费用）',hp:'心神（你的生命）',shield:'护身（先扣的护盾）',insight:'调查',courage:'交涉',leverage:'通路',binds:'束缚',debt:'欠名'};
 const out=[];for(const [key,label] of Object.entries(labels))if(before[key]!==after[key])out.push(label+' '+before[key]+' → '+after[key]);
 for(const u of after.units){const old=[...before.units,...before.captives].find(x=>x.uid===u.uid);if(!old)out.push(D.cards[u.id].name+'上场：'+u.atk+'攻 / '+u.hp+'血'+(u.atk===0?'，专门挡伤，不能攻击':u.ready?'，可立即攻击':'，下回合可攻击'));else{if(old.hp!==u.hp)out.push(D.cards[u.id].name+'生命 '+old.hp+' → '+u.hp);if(before.captives.some(x=>x.uid===u.uid))out.push(D.cards[u.id].name+'已救回');if(!old.ready&&u.ready)out.push(D.cards[u.id].name+'现在可攻击');}}
 for(const u of before.units)if(!after.units.some(x=>x.uid===u.uid))out.push(D.cards[u.id].name+(after.captives.some(x=>x.uid===u.uid)?'被困住':'离场'));
 for(const e of after.enemies){const old=before.enemies.find(x=>x.uid===e.uid);if(old&&old.hp!==e.hp)out.push(e.name+'阻力 '+old.hp+' → '+e.hp);if(old&&!old.stunned&&e.stunned)out.push(e.name+'本回合不行动');if(old&&old.atk!==e.atk)out.push(e.name+'压力 '+old.atk+' → '+e.atk);}
 if(before.hand.length!==after.hand.length)out.push('手牌 '+before.hand.length+' → '+after.hand.length);
 const lines=after.log.filter(t=>!before.log.includes(t));if(lines.length)out.push(...lines.slice(0,2).reverse());return out.join('；')||'行动已记录。';
}
function run(result,usedCard){if(!result?.ok){if(s().view==='defeat'){modal=null;selection=null;save();render();}notice(result?.msg||'此刻不能这样做。');return false;}feedback=changes(previousBattle,b());if(usedCard){const drawn=Math.max(0,(b().catalog?.stats?.drawn||0)-(previousBattle.catalog?.stats?.drawn||0)),discarded=Math.max(0,(b().catalog?.stats?.discarded||0)-(previousBattle.catalog?.stats?.discarded||0));feedback='「'+usedCard.name+'」生效：'+feedback+(drawn?'；抽到 '+drawn+' 张牌':'')+(discarded?'；弃去 '+discarded+' 张牌':'');}selection=null;tone(usedCard?'play':'click');save();render();return true;}
const roleText={threshold:'挡伤',porter:'开路＋挡伤',seamstress:'回血＋挡伤',backward:'立即攻击',lampbearer:'查线索＋挡伤',umbrella:'专门挡伤',doorkeeper:'攻击＋挡伤',moth:'挡伤后补牌',cut:'解缚救人',bar:'护盾＋开路',oil:'查线索＋补牌',borrow:'借费用',send:'送别＋还债',stitch:'治疗',burn:'重击＋开路',hush:'阻止敌袭',call:'推进交涉',salt:'群体伤害',warm:'回复生命',name:'还债＋补牌',rescue:'全部解缚',cord:'立即攻击＋护盾',mirror:'高伤害',pass:'群体治疗＋鼓励'};
function cardUse(c){if(c.modern)return terms(c.text)+' 条件：'+terms(c.conditions);const x=b();if(s().view!=='battle'||!x)return c.text;const g=ph().goal;
 const related={open:['bar','porter','burn'],insight:['oil','lampbearer','hush'],courage:['call','pass'],rescue:['cut','rescue'],clear:['burn','salt','mirror','backward'],guard:['bar','threshold','umbrella','pass','cord']};
 let text=c.atk!==undefined?'上场后能替你承受敌袭。'+(c.atk===0?'攻击为 0，不能打敌人。':c.rush?'本回合就能点它攻击敌人。':'通常要等下回合，点它再点敌人攻击。'):c.text;
 if((related[g]||[]).includes(c.id))text='能直接帮助本幕「'+D.goals[g].name+'」。'+text;
 if(c.id==='oil')text=(g==='insight'?'调查 '+x.insight+' → '+(x.insight+2)+'：一次达到本幕要求；还抽 1 张牌。':'本幕不靠调查过关；现在主要是花 1 香火换抽 1 张牌。');
 if(c.id==='call')text=g==='courage'?'交涉 '+x.courage+' → '+(x.courage+2)+'：一次达到本幕要求。另回最多 1 心神。':'本幕不靠交涉过关；现在只会回复最多 1 心神。';
 if(c.id==='bar')text='护身 '+x.shield+' → '+(x.shield+5)+'，先替你挡伤。'+(g==='open'?'通路 '+x.leverage+' → '+(x.leverage+1)+'，到 2 就能开路。':'本幕不靠通路过关。');
 if(c.id==='warm')text='现在实际回复 '+Math.min(6,30-x.hp)+' 心神。'+(x.hp===30?'你目前满血。':'')+(x.captives.length?'有人被困，额外交涉 +1。':'');
 if(c.id==='cut'||c.id==='rescue')text=x.binds||x.captives.length?'当前 '+x.binds+' 道束缚、'+x.captives.length+' 人被困。'+c.text+(x.captives.length&&x.units.length>=3?'场上已满，先送别留位才能接人。':''):'现在没有束缚或被困者。'+(c.id==='rescue'?'此时只回复最多 2 心神。':'暂时留着更有用。');
 if(c.id==='name')text='欠名 '+x.debt+' → '+Math.max(0,x.debt-2)+'，再抽 1 张牌。';
 if(c.target)text+=' 打出后，再点'+(c.target==='ally'?'己方随行者':'危险或对手')+'选目标。';
 if(c.debt)text+=' 欠名达到 6 后，每回合末失去 2 心神。';
 return text;
}
function coach(){const x=b(),g=ph().goal;if(game.doneGoal())return '目标已达成。可继续布置防守，再点「结束回合」；活过敌袭就进入下一幕。';
 const text={open:'通路到 2，完成眼前的通路安排。抬梁纸夫或横木门闩都能 +1；右侧撑门也能 +1。',insight:'调查到 2，才能看清这里的异常。照旧痕一张 +2；右侧举灯每回合只能 +1。',courage:'交涉到 2，让当事人能继续说话或行动。听他说完一张 +2；右侧陪她说话每回合只能 +1。',rescue:'把束缚降到 0，并接回被困者。用断亲剪或灯下接人；右侧松线每回合解 1 道。',clear:'把敌人生命打到 0。先召随行者，下回合点它再点敌人；伤害牌可直接打敌人。',guard:'累计挡住 3 点敌袭，或消灭全部敌人。先出护盾或挡伤随行者，再结束回合。'};
 return text[g]+(g==='clear'?'':' 不必消灭所有敌人。');
}
function header(){const c=D.chapters[ch().chapter-1];return `<header class="top"><a class="brand" href="#" data-action="journey">北段<span>归名录</span></a><span class="edition">${s().view==='home'?'五案相连 · 灯下问名':esc(c.title)+' · 第 '+ch().scene+' 场'}</span><nav>${button('线索册 <i>'+s().clues.length+'</i>','journal')}${button('牌组 <i>30</i>','deck')}${button('怎么玩','help')}${button('菜单','menu')}</nav></header>`;}
function home(){return `<main class="home"><div class="home-art"></div><div class="home-copy"><p class="eyebrow">中式恐怖 · 实体卡牌叙事</p><div class="title-kicker">北 段</div><h1>归<span>名录</span></h1><p class="quote">“不要只看誊清的那份。”</p><p class="lede">父亲留下这句话，没有留下解释。<br>你是修书人沈砚，与相识半年的医生温既白，<br>受托走进顾家，为一位死者整理遗物。</p><div class="home-actions">${button('接下顾家的委托 <span>→</span>','start','','primary')}${button('先看怎么玩','help','','quiet')}</div><p class="caption">五案主线 · ${D.playerCards.length} 张可构筑卡 · 自动保存<br>每次出牌，改变眼前处境；每次判断，由你说出理由。</p>${loadWarning?'<p class="warning">'+esc(loadWarning)+'</p>':''}</div><div class="home-seal">旧<br>名<br>未<br>归</div></main>`;}
function map(){const c=D.chapters[ch().chapter-1],past=s().completed;return `<main class="journey"><section class="journey-feature" style="--scene:url('assets/${sceneArt()}.webp')"><div><p class="eyebrow">${esc(c.title)} · 第 ${ch().scene} / 18 场</p><h1>${ch().title}</h1><p class="story-copy">${esc(ch().intro)}</p><p class="scene-question">${esc(story()?.suspectQuestion||'')}</p>${button('回听现场对话','storyReplay','','quiet')}${s().encounter===0?'<div class="first-guide"><b>先读处境，再用牌行动</b><p>已配好包含本场新牌的起始牌组。先核对失物，再查后门，最后听证词。场景改变后，可用「试用本场新牌组」重新配牌。基础行动共用每回合一次；手牌另付费用。准备齐全后对照材料判断，再结束回合前进。</p></div>':''}<div class="map-action">${button('进入牌桌 <span>→</span>','begin','','primary')}${button('整理牌组','deck','','quiet')}${button('试用本场新牌组','recommend','','quiet')}${s().deckList.some(id=>!M.viable(s(),D.cards[id]))?button('替换本场不适用牌','adapt','','primary'):''}</div><p class="caption">每场恢复心神并洗牌；已查明的事实和选择保留。牌桌危险牌标出阻力和每轮后果；安静的现场可以专心调查。</p></div></section><aside class="route"><div class="route-title"><span>本案调查</span><b>${caseTurns(c.id)} <small>回合已完成</small></b></div><ol>${D.encounters.filter(x=>x.chapter===c.id).map(x=>{const n=D.encounters.indexOf(x),done=past[n];return `<li class="${done?'passed':n===s().encounter?'current':'future'}"><span>${done?'✓':String(x.scene).padStart(2,'0')}</span><div>${n<=s().encounter?x.title:'尚未调查'}<small>${done?done.turns+' 回合':n===s().encounter?'正在这里':'完成眼前的事再继续'}</small></div></li>`;}).join('')}</ol><p class="caption">已结案 ${Math.floor(past.length/18)} / ${past.length>=90?'6':'5'} · 全程 ${game.totalTurns()} 回合</p></aside></main>`;}
function caseTurns(id){return s().completed.reduce((n,x,i)=>n+(D.encounters[i].chapter===id?x.turns:0),0);}
function caseEnd(){const c=D.chapters[ch().chapter-1],hidden=c.id===5;return `<main class="story-screen"><div class="story-image">${art(c.art)}</div><section><p class="eyebrow">第 ${c.id} 案 · 已结案</p><h1>${c.title}</h1><p class="story-copy">${esc(ST?.caseReviews[c.id]?.summary||ch().outro)}</p><div class="end-facts"><span><b>${caseTurns(c.id)}</b>完整回合</span><span><b>18</b>调查场景</span><span><b>54</b>目标阶段</span></div>${hidden?'<div class="clue-found"><small>仍未解决的事</small><h2>被拒绝的会面</h2><p>旧案已经可以公开复查。温却仍想私下见韩。保存五案成果之后，你可以继续核对这件事。</p></div>':'<p>本案事实与原件保管已记录，下一条线索有了具体去处。</p>'}${button('回看本案因果','caseReview',`data-id="${ch().chapter}"`,'quiet')}${button(hidden?'查看未决事项，继续调查 →':'带着线索，进入下一案 →',hidden?'openHidden':'next','','primary')}${button('翻看已获得的证据','journal','','quiet')}${button('导出进度，稍后继续','export','','quiet')}</section></main>`;}
function cardBlock(c){if(c.modern)return M.reason(s(),c);if(s().view!=='battle'||!b())return '进入牌桌后才能使用。';if(b().energy<c.cost)return '香火不足，下一回合会恢复。';if(c.type==='随行'&&b().units.length>=3)return '随行位置已满，先送别留位。';if(c.target==='ally'&&!b().units.length)return '场上没有己方随行者，先召来一名再使用。';if(c.target==='enemy'&&!b().enemies.some(e=>e.hp>0))return '当前没有可选择的态势目标。';return '';}
function modeLabel(c){return ({person:'人物',skill:'技能',equipment:'器物',setup:'布置',response:'应对'})[c.mode]||c.type;}
function targetLabel(c){return c.target==='enemy'?'选择一个危险或对手':c.target==='ally'?'选择一位随行者':['person','equipment','setup'].includes(c.mode)?'留在桌上 · 持续协作':c.mode==='response'?'预留应对 · 条件触发':'作用于自身或当前目标';}
function cardTile(id,index,inLibrary=false){const c=D.cards[id],why=cardBlock(c),allowed=!why,selected=selection?.type==='card'&&selection.index===index;const called=!inLibrary&&s().view==='battle'&&b()&&b().calledName===id;const face=cardRuleParts(c);return `<article class="card physical-card card-v2 ${called?'called':''} ${selected?'selected':''} ${allowed?'playable':'unavailable'} mode-${esc(c.mode||'skill')}" data-action="inspect" tabindex="0" role="button" data-id="${id}" data-art="${esc(c.art||'')}" data-face="${esc(comboFace(c))}" ${inLibrary?'':`data-index="${index}" data-hand-index="${index}"`} aria-label="${esc(c.name)}，${c.cost}香火，${esc(face.label)}"><div class="card-v2-top"><span class="card-v2-cost"><b>${c.cost}</b><small>香火</small></span><span class="card-v2-kind">${esc(modeLabel(c))}</span><span class="card-v2-sigil" aria-hidden="true">${({person:'人',equipment:'器',setup:'阵',response:'应'})[c.mode]||'术'}</span></div><div class="card-illustration" style="--card-art-position:${esc(c.artPosition||(c.mode==='person'?'50% 25%':'50% 38%'))}">${art(c.art,'',c.artSubject||c.name,c.artExt||'webp')}</div><h3 class="card-v2-title">${esc(c.name)}</h3><div class="card-v2-rule">${cardRuleFaceHtml(c)}</div><div class="card-v2-target"><i aria-hidden="true">◎</i> ${esc(targetLabel(c))}</div><p class="card-v2-condition">${esc(terms(c.conditions||'随时可用'))}</p><footer class="card-v2-footer"><small>${esc(c.archetype||c.type)}</small>${inLibrary?'<span>查看完整作用 ↗</span>':button(allowed?'打出 →':'查看条件',allowed?'play':'inspect',`aria-label="${allowed?'打出':'查看'}${esc(c.name)}" data-id="${id}" data-index="${index}"`,'card-play-v2')}</footer></article>`;}

function goalStatus(){const x=b(),p=ph(),target=p.target||2;switch(p.goal){case'insight':return `调查 ${x.insight} / ${target}`;case'courage':return `交涉 ${x.courage} / ${target}`;case'open':return `通路 ${x.leverage} / ${target}`;case'rescue':return `束缚 ${x.binds} · 被困 ${x.captives.length}`;case'guard':return `已挡 ${x.blocked} / ${p.guardTarget||3} · 态势 ${x.enemies.filter(e=>e.hp>0).length}`;default:return `待化解 ${x.enemies.filter(e=>e.hp>0).length}`;}}
function selectionText(){if(!selection)return '① 看目标　② 出牌或现场行动　③ 结束回合';if(selection.type==='card'){const c=D.cards[b().hand[selection.index]];return `「${c.name}」：请选择${c.target==='ally'?'己方随行者':'危险或对手'}。`;}return selection.type==='dismiss'?'请选择要送别的随行者，给门后的人留出位置。':selection.type==='attack'?'请选择随行者要攻击的敌人。':'请选择要压制的危险或对手。';}
function enemyCard(e,i){const active=selection&&(selection.type==='attack'||selection.type==='scene'||selection.type==='card'&&D.cards[b().hand[selection.index]]?.target==='enemy'),kind=e.targetKind||'hazard',label={hazard:'危险',obstruction:'障碍',opponent:'对手'}[kind]||'危险',artName=D.Art?.enemy(e,ch().chapter,ch())||sceneArt();const intent=e.hp<=0?'已化解':e.stunned?'本回合已压住':e.kind==='capture'?'回合末：困住最强随行者':e.kind==='fear'?'回合末：额外失去 1 心神':'回合末：压力 '+e.atk;return `<button class="risk-card risk-${kind} ${e.hp<=0?'dead':''} ${active&&e.hp>0?'targetable':''}" data-action="enemy" data-uid="${e.uid}" aria-label="${esc(e.name)}，${label}，尚需化解 ${e.hp}，每轮压力 ${e.atk}" ${e.hp<=0?'disabled':''}><div class="risk-art">${art(artName,'',e.name)}</div><span class="risk-kind">${label}</span><h3>${esc(e.name)}</h3><div class="risk-values"><span><small>${kind==='opponent'?'抵抗':'阻力'}</small><b>${e.hp}</b></span><span><small>压力</small><b>${e.atk}</b></span></div><p>${esc(intent)}</p>${(()=>{const T=(D.horrorTraits||{})[e.trait];if(!T||e.hp<=0)return '';return `<span class="risk-rule"><b>${esc(T.name)}</b><i>${esc(T.text)}</i></span>`;})()}${e.named?'<span class="risk-named">来由已被说破</span>':''}${active&&e.hp>0?'<strong>选此目标</strong>':''}</button>`;}

function unitTile(u,captive=false){const c=D.cards[u.id],target=selection?.type==='dismiss'||selection?.type==='card'&&D.cards[b().hand[selection.index]]?.target==='ally';return `<button class="table-unit unit ${captive?'captive':''} ${target?'targetable':''} ${selection?.uid===u.uid?'selected':''} ${u.ready&&u.atk?'ready':''}" data-action="unit" data-uid="${u.uid}" aria-label="${c.name}，攻击 ${u.atk}，生命 ${u.hp}${captive?'，被困':u.ready&&u.atk?'，可攻击':'，待命'}" ${captive?'disabled':''}><span class="table-unit-art">${art(c.art)}</span><span class="table-unit-frame"></span><span class="table-unit-name">${c.name}</span><span class="table-unit-atk gem-atk">${u.atk}</span><span class="table-unit-hp gem-hp">${u.hp}</span><span class="table-unit-state">${captive?'门后被困':u.guard?'挡伤':u.ready&&u.atk?'可攻击':'待命'}</span></button>`;}
function modernBoard(){return `<section class="modern-board"><h3>桌上协作</h3>${M.statusLines(s()).map(t=>'<p class="mechanic-status">'+esc(terms(t))+'</p>').join('')||'<p>部署后，人物与工具会在牌桌上协助。</p>'}<small>目标：调查／交涉／通路。<br>连招筹码：专注／信任／脚步，各最多5。</small></section>`;}
function fieldActions(){const m=b().modern,x=M.ctx(s()),disabled=b().actionUsed||b().energy<1?'disabled':'';return `${basicStrikeBlocked()||x.intent&&!m.intentResolved?button(basicStrikeBlocked()?'先护现场 · 解除噤口 · 1香火':'先护现场 · 挡本幕干扰 · 1香火','fieldTask',`data-kind="secure" ${disabled}`):''}${m.injury&&x.tags.includes('medical')?button('处理暂时受限 · 1香火','fieldTask',`data-kind="care" ${disabled}`):''}${x.tags.includes('wet')&&m.drying<2+m.damage?button('干燥纸件 · 1香火','fieldTask',`data-kind="dry" ${disabled}`):''}`;}
function battleView(){
 const x=b(),p=ph(),met=game.doneGoal(),ready=numericReady(),manaMax=Math.max(x.energy,Math.min(6,3+Math.floor((x.turn-1)/2))),isNumeric=['insight','courage','open'].includes(p.goal);
 const gain={insight:'调查 +1',courage:'交涉 +1',open:'通路 +1',guard:'护身 +3',clear:'压制 '+basicStrike(),rescue:'解开 1 道束缚'}[p.goal];
 const actionDisabled=x.actionUsed||x.energy<M.actionCost(s(),'goal')||isNumeric&&ready||p.goal==='clear'&&basicStrikeBlocked();
 const inv=investigationState(),spread=prefs.handLayout==='spread';
 return `<main class="battle tabletop revised-table" style="--scene:url('assets/${sceneArt()}.webp')">
 <aside class="table-story"><p class="eyebrow">${esc(D.Art?.location?.(ch())||ch().place)} · ${ch().scene} / 18 场</p><h1>${esc(ch().title)}</h1><details class="scene-recap"><summary>眼前的事</summary><p>${esc(story()?.suspectQuestion||ch().intro)}</p></details><div class="story-phase"><span>第 ${x.phase+1} / ${ch().phases.length} 幕</span><h2>${esc(p.title)}</h2><p>${esc(story()?.phases?.[x.phase]?.[0]?.text||p.text)}</p>${button('回听本幕对话','storyReplay','','quiet')}</div>${p.investigation?button(inv.solved?'回看材料与判断':'查看现场材料','evidence','','evidence-link'):''}${modernBoard()}<details class="recent-actions"><summary>最近发生的事</summary>${x.log.slice(0,4).map(t=>'<p>'+esc(terms(t))+'</p>').join('')}</details>${button('展开全部经过','log','','quiet')}<p class="caption">已完成场景 ${game.totalTurns()} 回合<br>当前场景 ${x.turns} 回合 · 本幕 ${x.phase+1}/${ch().phases.length}</p></aside>
 <section class="table-arena"><div class="mobile-goal-summary"><span>第 ${x.turn} 回合 · 第 ${x.phase+1} 幕</span><b>${esc(p.title)}</b><p>${goalStatus()} · ${esc(goalHint())}</p></div><div class="desk-surface" aria-hidden="true"></div><div class="scene-window">${art(sceneArt(),'scene-window-image',ch().title)}<span>${esc(ch().title)} · ${esc(p.title)}</span></div><div class="enemy-rank">${x.enemies.length?x.enemies.map(enemyCard).join(''):'<div class="quiet-scene"><span>此刻，无人逼近。</span><small>把灯放稳，专心查眼前的事。</small></div>'}</div><div class="table-selection ${selection?'choosing':''}"><span>${selectionText()}</span>${button('基础行动 / 结算','focusGoal','','mobile-only')}${selection?button('取消','cancel'):''}</div><div class="ally-rank">${x.units.map(u=>unitTile(u)).join('')}${tableDeployments()}</div>${x.captives.length?`<div class="table-captives"><span>门后被困 ${x.captives.length}</span><div>${x.captives.map(u=>unitTile(u,true)).join('')}</div></div>`:''}${comboBar()}<div class="table-status">${M.statusLines(s()).filter(t=>!/^专注 \d/.test(t)).map(t=>'<span>'+esc(terms(t))+'</span>').join('')}</div><div class="player-strip"><div class="hero-medallion player"><img src="assets/v2-shenyan.webp" alt="沈砚，修书人"><span>沈砚</span><b class="hero-life gem-hp"><i>心神</i> ${x.hp}</b><small class="hero-shield">护身 ${x.shield}</small></div><div class="companion-medallion">${art(ch().chapter===6?'lantern':'card-new01','',ch().chapter===6?'独立守卫':'温既白')}<div><b>${ch().chapter===6?'自行守灯':'温既白'}</b>${ch().chapter===6?'<small>本案依靠自己的牌组</small>':button(x.helpUsed?'本场已援助':'援助 · 回5护3','aid',x.helpUsed?'disabled':'')+'<small>回复 5 · 护身 3 · 每场一次</small>'}</div></div><div class="table-resources"><div class="mana-crystals">${Array.from({length:manaMax},(_,i)=>`<i class="${i<x.energy?'on':'off'}"></i>`).join('')}</div><span>香火 <b>${x.energy}</b> / ${manaMax}</span><span class="${x.debt>=6?'danger':''}">欠名 <b>${x.debt}</b>${x.debt>=6?' · 回合末 −2 心神':''}</span></div></div></section>
 <aside class="table-rail"><div class="round-plaque"><b>第 ${x.turn} 回合</b><span>本场已结算 ${x.turns}</span></div><div class="objective-plaque"><p class="eyebrow">眼前目标</p><h2>${esc(p.title)}</h2><strong class="${ready?'met':''}">${goalStatus()}</strong>${Number.isFinite(p.pressureCap)?`<p class="pressure-goal ${x.enemies.filter(e=>e.hp>0).reduce((n,e)=>n+e.atk,0)<=p.pressureCap?'met':''}">仍在施压 ${x.enemies.filter(e=>e.hp>0).reduce((n,e)=>n+e.atk,0)} · 需降至 ≤ ${p.pressureCap}<small>化解阻力才会减少此数值</small></p>`:''}<p class="goal-coach">${esc(goalHint())}</p>${p.tactic?`<details class="tactic-hint"><summary>本幕策略提示</summary><p>${esc(p.tactic)}</p></details>`:''}${p.investigation?`<div class="evidence-status ${inv.solved?'solved':''}">${inv.solved?'✓ 判断已记录':ready?'准备齐全 · 等你判断':'准备后，由你核对材料'}</div>${button(inv.solved?'查看我的判断':'对照材料作判断','evidence','','evidence-link')}`:''}</div><div class="threat-preview"><b>回合末会发生</b><p>${esc(terms(M.preview(s())))}</p></div>${nightRules()}<div class="action-budget ${x.actionUsed?'spent':''}"><b>${x.actionUsed?'本回合基础行动已用':'基础行动 · 本回合选一个'}</b><span>${x.actionUsed?'基础行动已用完；剩余香火仍可出牌。':'下方基础行动共用一次；手牌另付香火，可组合使用。'}</span></div><div class="table-actions">${fieldActions()}${button(esc(p.action)+' · '+gain+' · '+M.actionCost(s(),'goal')+'香火','scene',`data-kind="goal" ${actionDisabled?'disabled':''}`)}${p.goal!=='guard'?button('撑身护住 · 护身 +3 · 1香火','scene',`data-kind="guard" ${x.actionUsed||x.energy<1?'disabled':''}`):''}${p.goal!=='clear'?button('压制危险 · 压制 '+basicStrike()+' · 1香火','scene',`data-kind="strike" ${basicStrikeBlocked()?'title="噤口：先护现场，或用手牌化解"':''} ${x.actionUsed||x.energy<1||basicStrikeBlocked()||!x.enemies.some(e=>e.hp>0)?'disabled':''}`):''}${x.captives.length&&x.units.length?button('送别留位 · 1香火','dismiss',x.actionUsed||x.energy<1?'disabled':''):''}</div>${feedback?`<div class="goal-receipt" role="status"><b>刚才发生了什么</b><p>${esc(terms(feedback))}</p></div>`:''}${button(ready&&p.investigation&&!inv.solved?'先判断<br>再结算':'结束<br>回合','end','aria-label="结束回合"','physical-end')}</aside>
 <section class="hand-section physical-hand ${spread?'spread-hand':'compact-hand'}">${feedback?`<div class="effect-receipt" role="status"><b>刚才发生了什么</b><span>${esc(terms(feedback))}</span></div>`:''}<div class="hand-header"><h2>手中之物 <span>${x.hand.length} / 9</span></h2><div class="hand-tools">${button('全部手牌与条件','handAll','','quiet')}${button(spread?'切换扇形':'平铺手牌','handLayout','', 'quiet')}<span>牌堆 ${x.deck.length} · 弃牌 ${x.discard.length}</span></div></div><div class="hand fan-hand" aria-label="手牌，横向滚动查看">${x.hand.map((id,i)=>`<div class="hand-slot" style="--angle:${(i-(x.hand.length-1)/2)*2}deg;--offset:${Math.abs(i-(x.hand.length-1)/2)*5}px;--order:${i}">${cardTile(id,i)}<p class="hand-availability ${cardBlock(D.cards[id])?'blocked':''}">${esc(terms(cardBlock(D.cards[id])||'现在可用 · '+D.cards[id].type))}</p></div>`).join('')}</div><p class="hand-tip">横向滚动查看全部手牌 · 点击卡面看详情 · “全部手牌与条件”可并排比较</p></section></main>${mobileBattleNav()}`;
}
function aftermath(){const choice=ch().choice,option=choice?.options.find(o=>o.id===s().lastChoice);return `<main class="story-screen"><div class="story-image">${art(sceneArt())}</div><section><p class="eyebrow">${D.chapters[ch().chapter-1].title} · 第 ${ch().scene} 场完成 · ${b().turns} 回合</p><h1>${ch().title}</h1><div class="closing-lines">${(story()?.closing||[{speaker:"现场",text:ch().outro}]).map(line=>`<p><b>${esc(line.speaker)}</b>${esc(line.text)}</p>`).join('')}</div><div class="clue-found"><small>已加入线索册 · 只记录查明的部分</small><b>${ch().clue}</b></div>${choice?`<div class="dialogue"><h2>${choice.kind==='deduction'?'把判断说清楚':'同行人的请求'}</h2><p>${choice.prompt}</p>${option?`<p class="reply">${option.text}</p>`:choice.options.map(o=>button(o.label+' <span>→</span>','choose',`data-id="${o.id}"`)).join('')}</div>`:''}${button(ch().scene===18?'整理本案结论 →':'收好记录，继续 →','next',choice&&!option?'disabled':'','primary')}${choice?.kind==='deduction'&&!option?button('回看已取得的线索','journal','','quiet'):''}<p class="caption">本案已完成 ${caseTurns(ch().chapter)} 回合 · 进度已保存</p></section></main>`;}
function endChoice(){return `<main class="story-screen"><div class="story-image">${art('lantern')}</div><section><p class="eyebrow">归名录 · 终卷</p><h1>把事实留给<br>后来查问的人。</h1><p class="story-copy">温已被独立人员控制，宋与伤员接受照护。旧案原件仍分处保存。你手里是认证副本，不是一张替所有人宽恕的纸。</p><div class="ending-options">${button('<b>交公开复查处</b><small>认证副本与具体来源一并归档。</small>','finish','data-owner="public"')}${button('<b>另存见证人处</b><small>公开复查继续，见证人保存另一份认证副本。</small>','finish','data-owner="witness"')}</div></section></main>`;}

function ending(){return `<main class="story-screen"><div class="story-image">${art('river')}</div><section><p class="eyebrow">北段 · 归名录 · 六案走完</p><h1>灯留给<br>回来的人。</h1><p class="story-copy">照宁用自己的名字付工钱，映棠继续协商还灯，素禾的书到了弟弟手里。旧案开始公开复查，尚未完成全部判决。<br><br>温救过人的事实没有被撤销，他伤人的事实也没有被抹去。你没有替他写悔过，也不替受害人决定宽恕。</p><div class="end-facts"><span><b>${game.totalTurns()}</b>完整回合</span><span><b>6</b>完整案件</span><span><b>${s().clues.length}</b>场景记录</span></div><p>${s().lampOwner==='public'?'认证副本交公开复查处。':'认证副本另存见证人处，复查同步继续。'}原件各处留存。</p><p>你实际接受过温 ${s().borrowedHelp} 次牌桌援助；保管选择都留在记录中。</p>${button('翻看六案证据','journal','','primary')}${button('导出这段旅途','export','','quiet')}${button('重新开始旅途','restart','','quiet')}</section></main>`;}
function defeat(){return `<main class="story-screen"><div class="story-image">${art('mother')}</div><section><p class="eyebrow">灯光暗了下来</p><h1>还可以<br>从这里重来。</h1><p class="story-copy">你没能走完「${ch().title}」。本战未计入的回合不会增加战役进度。此前 ${game.totalTurns()} 个已完成回合和故事选择仍保留。</p>${button('重整牌组，重试这一战','retry','','primary')}${button('看看刚才发生了什么','log','','quiet')}</section></main>`;}
function render(){const screen=[s().view,s().encounter,s().view==='battle'?b()?.phase:''].join(':');const changedScreen=screen!==renderedScreen;if(changedScreen){renderedScreen=screen;mobilePanel='table';selection=null;}previousBattle=b()?JSON.parse(JSON.stringify(b())):null;const views={home,map,caseEnd,battle:battleView,aftermath,endingChoice:endChoice,ending,defeat};$('app').innerHTML=header()+views[s().view]();document.body.dataset.view=s().view;document.body.dataset.mobilePanel=mobilePanel;document.body.dataset.targeting=selection?'true':'false';renderModal();if(changedScreen)window.scrollTo({top:0,left:0,behavior:'instant'});if(b()?.fx&&b().fx.id!==lastFX&&s().view==='battle'){lastFX=b().fx.id;
   try{const k=b().fx.kind;
     if(['claim','callname','misread'].includes(k)){
       const a=document.querySelector('.table-arena');
       if(a){a.classList.remove('dread');void a.offsetWidth;a.classList.add('dread');
         setTimeout(()=>a.classList.remove('dread'),1200);}
     }
     if(k==='misread')flashMisread();
     if(k==='named')glowLantern();
     if(k==='phase'&&(b().enemies||[]).some(e=>e.hp>0)){
       const img=document.querySelector('.scene-window img,.risk-art img');
       showLunge({src:img&&img.currentSrc},'soft');
     }
   }catch(e){}
const f=b().fx;const el=document.createElement('div');el.className='play-fx '+f.kind;el.setAttribute('aria-hidden','true');el.innerHTML=art(f.art,'','',f.artExt||'webp')+`<span>${esc(f.title)}</span>`;$('app').append(el);setTimeout(()=>el.remove(),1150);}queueMicrotask(maybePassage);}
function openModal(name){rememberModalScroll();focusBefore=document.activeElement;modal=name;if(name==='deck'){draft=[...s().deckList];filter='';deckType='';deckPage=0;deckOnly=false;}renderModal();$('overlay').querySelector('button,input')?.focus({preventScroll:true});if(name==='hand'||typeof name==='object')restoreModalScroll();}
function closeModal(){if(modal?.type==='passage'){endPassage();return;}if(modal?.back){modal=modal.back===true?'deck':modal.back;renderModal();$('overlay').querySelector('button')?.focus({preventScroll:true});restoreModalScroll();return;}modal=null;$('overlay').innerHTML='';document.body.classList.remove('modal-open');focusBefore?.isConnected&&focusBefore.focus({preventScroll:true});}
function modalBody(){
 if(modal?.type==='investigation')return evidenceBody();
 if(modal==='hand')return handBody();
 if(modal?.type==='passage')return passageBody();
 if(modal?.type==='caseReview')return renderReview(modal.chapter);
 if(modal?.type==='art'){const c=D.cards[modal.id];return `<div class=full-art>${art(c.art,'',c.name+'完整插画',c.artExt||'webp')}<div><h2>${esc(c.name)}</h2><p>${esc(c.text)}</p>${button('返回牌面','backCard',`data-id="${c.id}"`,'quiet')}</div></div>`;}
 if(modal?.type==='card'){const c=D.cards[modal.id];return `<div class="detail"><div class="detail-frame">${cardTile(c.id,0,true)}</div><div><p class="eyebrow">${esc(c.type)} · ${c.cost} 香火${c.archetype?' · '+esc(c.archetype):''}</p><h2>${esc(c.name)}</h2><div class="detail-rules">${cardRuleDetailHtml(c)}</div><p class="detail-target">◎ ${esc(targetLabel(c))}</p><p class="detail-condition">条件：${esc(terms(c.conditions||'随时'))}</p><div class="card-now"><b>现在能否使用</b>${c.modern?'':'<p>'+esc(cardUse(c))+'</p>'}${s().view==='battle'&&cardBlock(c)?'<p class="warning">'+cardBlock(c)+'</p>':''}</div>${s().view==='battle'&&modal.handIndex!==undefined?button('使用这张牌 · '+c.cost+' 香火','detailPlay',`data-index="${modal.handIndex}" ${cardBlock(c)?'disabled':''}`,'primary')+`<p class="caption">${b().energy<c.cost?'香火不足，等下一回合恢复。':c.type==='随行'&&b().units.length>=3?'场上已有三个随行者，需要先留出位置。':'当前香火 '+b().energy+' → 出牌后 '+(b().energy-c.cost)+(c.id==='borrow'?'（本牌随后补充 2 香火）':'')}</p>`:''}${c.artCompleted?button('查看完整插画','viewArt',`data-id="${c.id}"`,'quiet'):'<p class="caption">类型图标占位 · 专用插画待制作</p>'}<blockquote>${esc(c.omen||'')}</blockquote>${c.atk!==undefined?`<p>攻击 ${c.atk} · 生命 ${c.hp}</p>`:''}</div></div>`;}
 if(modal==='journal')return journalBody();
 if(modal==='log')return '<h2>这一段的经过</h2><ol class="logs">'+(b()?.log||[]).map(x=>'<li>'+esc(x)+'</li>').join('')+'</ol>';
 if(modal==='help')return `<p class="eyebrow">归名录 · 玩法</p><h2>这一夜，你有三件事要做</h2><div class="help-grid"><section><h3>一回合三步</h3><p>① 认清处境：这幕要查什么、什么正在威胁你。② 打牌：卡面上方是费用，下方是作用和条件。要选目标的牌，打出后再点桌上的危险。③ 基础行动每回合选一次；准备足够后对照材料判断，点「结束回合」承受剩余压力，再前进。每次误判失去2心神；归零后可以重试本场。</p><p>香火是出牌费用，每回合恢复。心神是你的承受能力，护身先替你挡压力。每场重新洗牌，30张构筑会循环使用。</p></section><section><h3>这些牌怎么选</h3><p>新卡随亲历场景收集；人物、物件还需满足当前场景条件。图鉴有类型筛选、搜索和本场可用筛选；均衡、防护、核验、装备四种一键构筑可直接使用，再按喜好调整。</p><p>人物同名最多1张，其余同名最多2张。进入新现场前可替换不适用牌。</p></section><section><h3>持续协作与连招</h3><p>人物、器物与布置留在桌上，跨幕继续协作。打出时先支付卡面费用；桌下的能力按钮是另一次主动操作，条件与费用另算。被动协作需要相应行动触发，不是每次点击都能反复获得。</p><p>专注、信任、脚步三种连招筹码各最多5。基础目标行动或卡牌可以产生；写着「若有专注 / 信任 / 脚步」的牌会追加效果，没有筹码时基础效果仍可用。筹码按牌面顺序先增加，再判断后面的筹码条件；已有护身、受伤等状态条件看这次效果开始前。攒够并兑现时，灯会暗一下——普通出牌不会突脸。</p></section><section><h3>应对与证据</h3><p>应对牌先预留费用，等预告的干扰发生时触发；未触发的费用转入下回合，场末则带到下一场。</p><p>必要调查、干燥与搬运都有基础行动。基础压制每次只化解 ${basicStrike()} 点阻力；压制技能、打断与持续协作能更快解除危险。遇到噤口，可先「先护现场」解除，或使用手牌。没有哪条关键证据必须抽中特定卡才能得到；完成三幕才取得实际调查记录。结案判断要凭已经取得的材料。</p></section></div><p>随时自动保存，菜单可导出备份。音效默认关闭，可在菜单开启。人物的帮助、隐瞒与越界均按实际发生的行为记入案卷。</p>`;
 if(modal==='menu')return `<h2>灯还在这里</h2><div class="menu-options">${button(prefs.sound?'音效：开启':'音效：关闭','sound')}${button('导出存档','export')}${button('导入备份','import')}${button('重新开始旅途','restart')}${button('回到游戏','close')}</div><p>导入和重开都会先让你确认。旧版存档可导入；已完成调查保留，进行中的牌局从本场重新开始。</p><input id="save-file" type="file" accept="application/json,.json" hidden>`;
 if(modal==='restart')return `<h2>重新走这一夜？</h2><p>会清除当前旅途的进度。你可以先导出存档保留这条路线。</p><div class="menu-options">${button('先导出备份','export')}${button('确定重新开始','confirmRestart','','danger-button')}${button('保留进度，继续游戏','close')}</div>`;
 if(modal?.type==='importConfirm')return `<h2>载入这份旅途？</h2><p>备份有 ${modal.data.completed.length} 场已完成遭遇，载入后会替换当前进度。${modal.migrated?'旧六案存档会保留已完成的场景；进行中的牌局从该场开头重试。':''}</p>${button('确认载入','confirmImport','','primary')}${button('取消','close')}`;
 if(modal==='deck')return libraryBody();
 return '';
}
function renderModal(){if(!modal){$('overlay').innerHTML='';document.body.classList.remove('modal-open');return;}document.body.classList.add('modal-open');const label=modal==='deck'?'整理牌组':modal==='hand'?'比较手牌':modal?.type==='investigation'?'核对现场材料':modal?.type==='passage'?(modal.kind==='opening'?'案件开场':modal.kind==='closing'?'本场结案剧情':'幕间剧情'):'灯下查看';$('overlay').innerHTML=`<div class="scrim"><section class="modal ${modal==='deck'||modal==='hand'?'wide':modal?.type==='passage'?'passage-modal':''}" role="dialog" aria-modal="true" aria-label="${label}">${button('关闭 ×','close','aria-label="关闭弹窗"','close')}${modalBody()}</section></div>`;}
let horrorFX={chapter:0,count:0,lastTurn:-2};
function reducedMotion(){return matchMedia('(prefers-reduced-motion:reduce)').matches;}
function captureCardShot(el){
 if(!el)return null;
 const r=el.getBoundingClientRect();
 const img=el.querySelector('.card-illustration img');
 return {x:r.x+r.width/2,y:r.y+r.height/2,src:img&&img.currentSrc,artKey:el.dataset.art,sprite:D.Art?.sprites?.[el.dataset.art],el};
}
function inkAt(shot){
 if(!shot||reducedMotion())return;
 try{
  if(shot.el)shot.el.classList.add('committing');
  const ink=document.createElement('div');ink.className='bd-ink';
  ink.style.left=shot.x+'px';ink.style.top=shot.y+'px';
  document.body.appendChild(ink);setTimeout(()=>ink.remove(),750);
 }catch(e){}
}
function lungeAllowed(){
 if(reducedMotion()||!b())return false;
 const chapter=ch().chapter,turn=b().turn;
 if(horrorFX.chapter!==chapter)horrorFX={chapter,count:0,lastTurn:-2};
 if(horrorFX.count>=10)return false;
 if(turn===horrorFX.lastTurn||turn===horrorFX.lastTurn+1)return false;
 return true;
}
function comboFace(c){
 const ops=[...(c?.catalogRule?.effects||[]),...(c?.catalogRule?.enter||[])];
 for(const o of ops){
  if(o.op!=='if')continue;
  if(/^focus/.test(o.condition))return 'lamp';
  if(/^resolve/.test(o.condition))return 'name';
  if(/^route/.test(o.condition))return 'record';
 }
 return '';
}
function showLunge(shot,kind){
 if(!shot||!shot.src||reducedMotion())return false;
 if(kind==='combo'&&!lungeAllowed())return false;
 try{
  const dark=document.createElement('div');dark.className='bd-blackout';
  const face=shot.face?(' bd-face-'+shot.face):'';
  const lunge=document.createElement('div');lunge.className='bd-lunge'+(kind==='soft'?' bd-lunge-soft':'')+face;
  const im=document.createElement('img');im.src=shot.src;im.alt='';lunge.appendChild(im);
  if(shot.sprite){lunge.dataset.sprite='true';lunge.style.cssText=spriteStyle(shot.sprite);}
  const faceKey=D.Art?.faces?.[shot.artKey];
  if(kind==='combo'&&faceKey){
   const faceSrc=new URL('assets/'+faceKey+'.webp',document.baseURI).href;
   const probe=new Image();
   probe.onload=()=>{setTimeout(()=>{if(im.parentNode){delete lunge.dataset.sprite;im.src=faceSrc;}},280);};
   probe.src=faceSrc;
  }
  document.body.appendChild(dark);document.body.appendChild(lunge);
  if(kind==='combo'){
   document.body.classList.remove('bd-jolt');void document.body.offsetWidth;
   document.body.classList.add('bd-jolt');
   horrorFX.count++;horrorFX.lastTurn=b().turn;
  }
  setTimeout(()=>{dark.remove();lunge.remove();document.body.classList.remove('bd-jolt');},kind==='soft'?480:640);
  return true;
 }catch(e){return false;}
}
function flashMisread(){
 if(reducedMotion())return;
 try{const el=document.createElement('div');el.className='bd-misread-flash';el.setAttribute('aria-hidden','true');document.body.appendChild(el);setTimeout(()=>el.remove(),320);}catch(e){}
}
function glowLantern(){
 if(reducedMotion())return;
 try{const el=document.createElement('div');el.className='bd-lantern-glow';el.setAttribute('aria-hidden','true');document.body.appendChild(el);setTimeout(()=>el.remove(),920);}catch(e){}
}
function playCard(index,target){
 const el=document.querySelector('.card.physical-card[data-hand-index="'+index+'"]')
      ||document.querySelectorAll('.hand .card.physical-card')[index];
 const shot=captureCardShot(el);
 const c=D.cards[b().hand[index]];
 const result=game.play(index,target);
 if(result?.ok){inkAt(shot);if(result.combo)showLunge(Object.assign(shot||{},{face:comboFace(c)}),'combo');}
 return run(result,c);
}
function useCard(index){const c=D.cards[b().hand[index]];if(!c)return;const why=cardBlock(c);if(why){renderModal();notice(terms(why));return;}if(c.target)selectTarget({type:'card',index});else playCard(index);}
function selectTarget(next){selection=next;if(mobileLayout())mobilePanel='table';render();if(mobileLayout())document.querySelector('.table-arena').scrollIntoView({block:'start',behavior:'instant'});}
function enemyClick(uid){if(!selection){notice('先选可攻击的随行者、目标卡牌，或压制危险行动。');return;}if(selection.type==='card')playCard(selection.index,uid);else if(selection.type==='attack')run(game.attack(selection.uid,uid));else run(game.action(selection.kind,uid));}
function exportSave(){const blob=new Blob([game.serialize()],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='北段_归名录_六案存档.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);notice('存档已导出。');}
document.addEventListener('click',event=>{const el=event.target.closest('[data-action]');if(!el||el.disabled)return;event.preventDefault();const a=el.dataset.action,id=el.dataset.id,uid=el.dataset.uid;
 if(a==='focusGoal'){mobilePanel='goal';document.body.dataset.mobilePanel=mobilePanel;document.querySelector('.table-rail').scrollIntoView({block:'start',behavior:'instant'});}else if(a==='focusTable'){mobilePanel='table';document.body.dataset.mobilePanel=mobilePanel;document.querySelector('.table-arena').scrollIntoView({block:'start',behavior:'instant'});}else if(a==='handAll'){openModal('hand');}else if(a==='handLayout'){prefs.handLayout=prefs.handLayout==='spread'?'fan':'spread';savePrefs();render();}else if(a==='evidence'){openModal({type:'investigation'});}else if(a==='investigate'){submitInvestigation(id);}else if(a==='evidenceEnd'){modal=null;run(game.end());}else if(a==='passageNext'){if(modal.at+1<passageLines(modal.kind).length){modal.at++;tone();renderModal();}else endPassage();}else if(a==='passageSkip'){endPassage();}else if(a==='storyReplay'){showPassage(passageKind());}else if(a==='caseReview'){openModal({type:'caseReview',chapter:Number(id)});}else if(a==='journalCase'){journalCase=id;renderModal();}else if(a==='cardReveal'){deckReveal=!deckReveal;deckPage=0;renderModal();}else if(a==='cardType'){deckType=id;deckPage=0;renderModal();}else if(a==='cardViable'){deckOnly=!deckOnly;deckPage=0;renderModal();}else if(a==='cardPage'){deckPage=Number(el.dataset.page);renderModal();}else if(a==='recipe'){draft=M.recommended(s(),id);renderModal();}else if(a==='clearDraft'){draft=[];renderModal();}else if(a==='sound'){prefs.sound=!prefs.sound;savePrefs();tone();renderModal();}else if(a==='inspectDeployed'){openModal({type:'card',id});}else if(a==='viewArt'){const parent=modal;openModal({type:'art',id,parent});}else if(a==='backCard'){const parent=modal.parent;openModal(parent);}else if(a==='recommend'){run(game.recommend());}else if(a==='adapt'){run(game.adaptDeck());}else if(a==='deployUse'){run(game.deployUse(id));}else if(a==='withdraw'){run(game.withdraw(id));}else if(a==='fieldTask'){run(game.fieldTask(el.dataset.kind));}else if(a==='start'){canSave=true;const result=game.next();if(result.ok)game.recommend();run(result);}else if(a==='openHidden')run(game.openHidden());else if(a==='begin')run(game.begin());else if(a==='next')run(game.next());else if(a==='end'){if(ph().investigation&&numericReady()&&!investigationState().solved)openModal({type:'investigation'});else run(game.end());}else if(a==='aid')run(game.help());else if(a==='choose')run(game.choose(id));else if(a==='finish')run(game.finish(el.dataset.owner));else if(a==='retry')run(game.retry());
 else if(a==='detailPlay'){rememberModalScroll();modal=null;useCard(Number(el.dataset.index));}else if(a==='play'){rememberModalScroll();modal=null;useCard(Number(el.dataset.index));}else if(a==='enemy')enemyClick(uid);else if(a==='unit'){if(selection?.type==='card')playCard(selection.index,uid);else if(selection?.type==='dismiss')run(game.action('dismiss',uid));else{const u=b().units.find(x=>x.uid===uid);if(!u?.ready||!u.atk){notice('这名随行者现在不能攻击。');return;}selectTarget({type:'attack',uid});}}
 else if(a==='dismiss'){selectTarget({type:'dismiss'});}else if(a==='scene'){const kind=el.dataset.kind;if(kind==='strike'||kind==='goal'&&ph().goal==='clear'){const alive=b().enemies.filter(e=>e.hp>0);if(alive.length===1)run(game.action(kind,alive[0].uid));else{selectTarget({type:'scene',kind});}}else run(game.action(kind));}
 else if(a==='cancel'){selection=null;render();}else if(['journal','deck','help','menu','log'].includes(a))openModal(a);else if(a==='close')closeModal();else if(a==='inspect'){const back=modal==='deck'||modal==='hand'?modal:modal?.back||null;const tile=el.closest('.physical-card');const handIndex=tile?.dataset.handIndex!==undefined?Number(tile.dataset.handIndex):el.dataset.handIndex!==undefined?Number(el.dataset.handIndex):modal?.handIndex;openModal({type:'card',id,back,handIndex});}else if(a==='journey')openModal('menu');
 else if(a==='preset'){draft=[...D.presets[id]];renderModal();}else if(a==='deckPlus'){if(draft.length<30&&draft.filter(x=>x===id).length<(D.cards[id].mode==='person'?1:2))draft.push(id);renderModal();}else if(a==='deckMinus'){const i=draft.indexOf(id);if(i>=0)draft.splice(i,1);renderModal();}else if(a==='saveDeck'){if(run(game.setDeck(draft))){closeModal();notice('牌组已保存。');}}
 else if(a==='restart')openModal('restart');else if(a==='confirmRestart'){game.reset();feedback='';previousBattle=null;prefs.seen={};savePrefs();canSave=true;loadWarning='';modal=null;selection=null;lastFX=0;save();render();}else if(a==='export')exportSave();else if(a==='import')$('save-file')?.click();else if(a==='confirmImport'){game=E.create(modal.data);feedback='';previousBattle=null;prefs.seen={};savePrefs();modal=null;selection=null;canSave=true;save();render();}
});
document.addEventListener('input',event=>{if(event.target.id==='deck-search'){const pos=event.target.selectionStart;filter=event.target.value;deckPage=0;renderModal();$('deck-search').focus();$('deck-search').setSelectionRange(pos,pos);}});
document.addEventListener('change',async event=>{if(event.target.id!=='save-file')return;const file=event.target.files[0];if(!file)return;try{if(file.size>1000000)throw Error('文件过大');let data=JSON.parse(await file.text());const migrated=[2,3,4].includes(data.version);if(migrated)data=E.migrate(data);if(!E.validate(data))throw Error('存档格式不兼容');openModal({type:'importConfirm',data,migrated});}catch(e){notice('无法导入：'+e.message+'。当前进度未改变。');}});
document.addEventListener('keydown',event=>{if((event.key==='Enter'||event.key===' ')&&event.target.matches('.card.physical-card[tabindex]')){event.preventDefault();event.target.click();return;}if(event.key==='Escape'){if(modal)closeModal();else if(selection){selection=null;render();}return;}if(event.key==='Tab'&&modal){const nodes=[...$('overlay').querySelectorAll('button:not(:disabled),input:not([hidden])')];if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}});
render();
window.BDCardFace={expandFeeDisplay,cardRuleParts,cardRuleFaceHtml,cardRuleDetailHtml};
})();
