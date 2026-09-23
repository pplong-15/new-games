/* V2 physical encounter rules. Facts and judgments live in story-revisions.js.
 * Hazards are literal scene conditions; a name, document or doubt never attacks.
 * Quiet work has no enemy damage. Each phase still requires an actual action. */
(function(root){'use strict';
const foe=(name,hp,atk,targetKind='hazard')=>({name,hp,atk,kind:'strike',targetKind});
const h=(intent,enemies,tactic,extra={})=>({intent,enemies,tactic,...extra});
const profiles={
 c1s01:[h('glare',[foe('伸向鞋盒的手',2,1,'obstruction')],'先请伙计停手，让两次失物保持原位；也可安排护物者后完成记录。',{target:2,pressureCap:1}),h('fall',[foe('门边晃动的水桶',1,2),foe('挡住通道的木箱',3,0,'obstruction')],'水桶是主要危险，木箱虽厚却不伤人；移开高压目标或护住同行者。',{target:2}),h('interrupt',[],'让小栓自己讲完；准备足够后结束，不需要打倒一个说法。',{target:3})],
 c1s02:[h('fall',[foe('摇动的渡板',2,2),foe('挤向板边的行李',1,1)],'用保护稳住乘客，或先移开行李。护住累计4点即可撤回岸边。',{goal:'guard',guardTarget:4}),h('fall',[foe('歪向侧门的木架',1,2),foe('柜前待交物',3,0,'obstruction')],'通路准备代表沿柜侧留出一人往返的取册小路，柜前箱子可保持待交原位；稳住木架能免除坠落压力。',{target:3}),h('none',[],'柜前已安全。对齐开渡鼓，不必为完成核验制造袭击。',{target:2})],
 c1s03:[h('scatter',[],'契约与遗物清单已在管理人手边。先作整理，再核契约明确写了什么。',{target:3}),h('interrupt',[],'为顾承安留出独立回答的时间。',{target:2}),h('none',[],'先留出柜前站位和开门通路；管理人在场开柜后，再按清单登记。',{target:2})],
 c1s04:[h('fall',[foe('坡上滚落的碎石',1,2),foe('松动的坡沿',3,1)],'碎石脆但伤害高，坡沿难排除；阻止高压或累计护住4点。',{goal:'guard',guardTarget:4}),h('none',[foe('盖住压痕的浮土',1,0,'obstruction'),foe('遮住落足处的草束',1,0,'obstruction')],'这里没有攻击。分开清理两处遮挡，再比较原位压痕。',{target:2,clearBeforeRead:true}),h('fall',[foe('回路边缘的松石',1,1)],'沿已标路线撤回，护住余下危险即可，不重查雨毁区域。',{target:2})],
 c1s05:[h('interrupt',[],'以询问和保护方法留出她自己的回答，沉默不是可攻击目标。',{target:3}),h('grab',[foe('堵住关门位置的人群',2,1,'obstruction')],'让围观者退后，把决定关门的空间交还江蘅。',{goal:'guard',guardTarget:3}),h('none',[],'分列原话和解释，材料准备不代替本人确认。',{target:2})],
 c1s07:[h('water',[foe('回路边缘的软泥',3,2)],'固定已知回路，省费用的路线工具可留给下一段护送。',{target:3}),h('water',[foe('向盐沟滑落的泥沿',2,2),foe('阻住退路的倒枝',1,0,'obstruction')],'先留住会合点；保护能扛住泥沿，移开倒枝能避免退路受阻。',{goal:'guard',guardTarget:4}),h('none',[],'回到灯下再问梁福，不用声音给人定位。')],
 c1s08:[h('fall',[foe('压腿杂物上方的松板',1,3)],'先撑稳松板再抬，不把受伤者猛拉出来。',{goal:'guard',guardTarget:3}),h('fall',[foe('压住腿的杂物',3,1,'obstruction')],'解除实际阻碍，保护牌与协作抬动可以配合。',{goal:'rescue',binds:2}),h('none',[],'梁福安稳后再问；取账时段已经错过，不能靠牌改回。')],
 c1s09:[h('interrupt',[],'先分两次联络，给本人说完的机会。'),h('none',[],'只核柳主动提交的寄送行，不打开其他客人私信。'),h('grab',[foe('伸向未清点信件的手',2,1,'obstruction')],'护住当前交接，材料原位比追求清场重要。',{goal:'guard',guardTarget:3})],
 c1s11:[h('grab',[foe('门外拦住去路的来人',3,2,'obstruction')],'先拉开人与门的距离，保护撤离不等于逼供。',{goal:'guard',guardTarget:3}),h('transfer',[foe('挤在出门处的行李',2,0,'obstruction')],'保护接手人与安全路线都要确认，路线工具可省撤离费用。',{target:3}),h('none',[],'本人到安全位置再谈喂食；未知去处不从牌中产生。')],
 c1s12:[h('interrupt',[foe('挤进辨认区的围观者',2,1,'obstruction')],'先留出辨认位置，再让亲人决定何时继续。',{goal:'guard',guardTarget:3}),h('none',[],'衣物的每段转交分别问，不需清场。'),h('none',[],'留足本人辨认时间，不用压力迫使亲人点头。')],
 c1s15:[h('dog',[foe('冲向隔栏的犬',7,4,'opponent'),foe('摇脱的隔栏插销',2,2)],'犬的冲势和隔栏耐久一起处理；隔犬保护与固定设施各有价值。',{goal:'guard',guardTarget:6}),h('dog',[foe('扑向撤离口的犬',6,3,'opponent'),foe('横在退路的倒栏',3,1,'obstruction')],'一边护送一边保持撤离口，强攻犬不能自动让路出现。',{target:3}),h('dog',[foe('仍未合拢的犬舍闸',5,2,'obstruction'),foe('后门未封的通路',3,1,'obstruction')],'把闸与后门封好，何巡的人完成隔离；清场表示危险受控，不是杀死犬。',{goal:'clear'})],
 c2s02:[h('scatter',[],'分别登记物样与接触位置。'),h('interrupt',[],'分开记录返还诉求，不把三人合成一个人。'),h('fall',[foe('雨水浸滑的门槛',2,1),foe('争执者挤住的出口',2,1,'obstruction')],'让来客依次通过再登记离开；保护可以同时承受两处挤碰。',{goal:'guard',guardTarget:3})],
 c2s04:[h('grab',[foe('同时伸进衣箱的手',2,2,'obstruction')],'先停止无序翻找，让持有人在场清点。',{goal:'guard',guardTarget:3}),h('glare',[],'并置漆痕时留原位置，调整灯位不等于新增证词。'),h('interrupt',[],'交洗与藏衣的次序让本人说明。')],
 c2s06:[h('scatter',[],'先读已取得页，空账不自己攻击人。'),h('urge',[],'记交账期限，催促不能变成偷盗证据。'),h('transfer',[foe('拦在雇佣交接处的管事',3,1,'obstruction')],'先保障小梅工作与陈述机会，不让未经确认的辞退当场执行。',{goal:'guard',guardTarget:3})],
 c2s07:[h('fall',[foe('担架通路上的杂物',2,2,'obstruction'),foe('湿滑的渡板',6,3)],'先清出可走路段，稳担架比追求全清更快。',{target:3}),h('fall',[foe('人群挤向担架的一侧',5,4,'obstruction')],'集中保护担架，让抬人者有稳当站位。',{goal:'guard',guardTarget:4}),h('water',[foe('缠住包角的绳',2,1,'obstruction')],'解实际缠绳；人先送医，物件登记随后完成。',{goal:'rescue',binds:2})],
 c2s08:[h('interrupt',[],'醒后的亲口说明优先于替她解释的信。'),h('none',[],'按三项真实动作整理。'),h('interrupt',[],'后续问话安排为多次，保护准备完成后让她休息。',{goal:'courage',target:2})],
 c2s13:[h('interrupt',[foe('挤在经办人门口的来客',2,1,'obstruction')],'留出说明空间，避免材料和经办人同时被围住。',{goal:'guard',guardTarget:3}),h('none',[],'两个机构分别提供原单；慢在核验，不是打架。',{target:3}),h('transfer',[foe('护送通道上的堆货',2,1,'obstruction')],'人有护送，物有接管，两项缺一都不要离开。',{target:3})],
 c2s14:[h('grab',[foe('吴七伸向暂存物的手',2,2,'opponent'),foe('灯市挤来的行人',2,1,'obstruction')],'挡住这次争抢，再给双方站稳的位置；保护动作不否定返还诉求。',{goal:'guard',guardTarget:4}),h('grab',[foe('堵在暂存处出口的人群',3,1,'obstruction')],'先开路让双方退回，再向他们交代保管去处。',{target:3}),h('none',[],'双方共同核清暂存接收人，不靠空口保证。')],
 c3s01:[h('grab',[foe('院役伸向女人的手',2,2,'opponent')],'停止强拉，独立接诊和本人意愿不能跳过。',{goal:'guard',guardTarget:3}),h('interrupt',[],'只记她认得的封皮，不逼她补号码。'),h('none',[],'公开接诊和留诊分别确认。')],
 c3s05:[h('disposition',[foe('催着合上的棺盖',2,1,'obstruction')],'先暂停下葬，保全遗体；文书核验前不让处置先成为事实。',{goal:'guard',guardTarget:3}),h('none',[],'送货人的亲历不越过车行后续路线。'),h('none',[],'把三个时间来源摆在一起，逐项排顺序。',{target:3})],
 c3s09:[h('disposition',[],'对照同床同押金，核出具体查找目标。',{target:3}),h('transfer',[foe('占住病院通道的推车',2,1,'obstruction')],'路线核查与停止再次转院同步，清开实际通道。',{target:3}),h('transfer',[foe('准备将床推离的院工',3,1,'obstruction')],'由负责人暂停已知床位移动，不为取账延迟寻人。',{goal:'guard',guardTarget:3})],
 c3s10:[h('grab',[foe('堵在送洗篮前的院役',5,4,'obstruction')],'保护递条者，先让她脱离单独受询的位置。',{goal:'guard',guardTarget:3}),h('transfer',[foe('挡在床前的推车',4,3,'obstruction')],'解除能当场处理的离床阻碍，伤情仍由女医决定。',{goal:'rescue',binds:2}),h('none',[],'多份既有来源共同核认，暗号只是一环。',{target:3})],
 c3s11:[h('none',[],'本人分别授权财产与陈述。'),h('none',[],'确认接手人与住处，恢复需要时间。'),h('transfer',[foe('丈夫派车的接人者',3,2,'opponent')],'她已拒绝返家，先阻止强行接回。保护和移开阻拦都可用。',{goal:'guard',guardTarget:4})],
 c3s14:[h('none',[],'家属的更正与补偿意愿分别记录。'),h('none',[],'更正姓名不替代追究冒领。'),h('interrupt',[foe('堵在告别路口的来客',2,1,'obstruction')],'给家属留一条安静的路，不让催签妨碍告别。',{goal:'guard',guardTarget:3})],
 c4s01:[h('none',[],'旧委托不授予新现场的无限进入权。',{goal:'courage',target:2}),h('none',[],'先核来到之前的行程。'),h('urge',[],'失踪独立发询，不能等命案结论。')],
 c4s03:[h('interrupt',[],'私事只读与案发有关部分。'),h('interrupt',[],'让云筝休息，围问不能充当伤害。',{goal:'courage',target:2}),h('none',[],'门房记录与姐妹两份陈述并列。')],
 c4s06:[h('grab',[foe('反复翻动衣箱的来客',2,1,'obstruction')],'保护箱中现状，未证实短少不能补成事前清单。',{goal:'guard',guardTarget:3}),h('none',[],'寄书收条有自己的出处。'),h('none',[],'发出有姓名有去处的实际寻人请求。')],
 c4s07:[h('transfer',[],'曹婶转移由独立人员接手，地址不公开。',{goal:'courage',target:2}),h('none',[],'车夫所见与值房否认分别核。'),h('none',[],'按家属能承受的节奏询问，保留寄书物件。')],
 c4s10:[h('grab',[foe('秦伸向封库门的手',6,4,'opponent')],'保管人已拒绝入库，守住现有权限；不能故意让他进来再追。',{goal:'guard',guardTarget:3}),h('none',[],'查获物由新保管人见证取验，比对原文来源。'),h('none',[],'云岚是否回应由她决定，拒绝不影响留证。')],
 c4s13:[h('interrupt',[],'本人拒绝会面已经明确，书面说明可以继续。'),h('transfer',[foe('拦着云岚要求传话的来客',2,1,'obstruction')],'保护她拒绝的空间，不能为取得供词逼迫私见。',{goal:'guard',guardTarget:3}),h('none',[],'按独立材料汇总，不把供认设成过关条件。')],
 c5s01:[h('disposition',[foe('抬向棺前的封盖',2,1,'obstruction')],'先止住未经核验的入殓，把家属和待查区域分开。',{goal:'guard',guardTarget:3}),h('none',[],'先问谁真的看见逃窗。'),h('none',[],'回函与死亡发现分开记。')],
 c5s03:[h('none',[],'比较檐下与露天，雨损处留空。',{target:3}),h('fall',[foe('窗下湿滑的落脚沿',2,2)],'测量从安全位置进行，用绳尺与保护配合，不跳窗。',{target:3}),h('none',[],'只在可比较范围排除路径。')],
 c5s05:[h('fall',[foe('差役脚下松动的池沿',2,4),foe('挤在岸边的器材',4,2,'obstruction')],'先拉回差役；易排除高压点和持续保护是两种解法。',{goal:'guard',guardTarget:4}),h('water',[foe('拖拽包裹的紧绳',4,2,'obstruction'),foe('反复涌过岸沿的水',3,2)],'先稳住人和绳，湿物保护留给上岸清点。',{target:3}),h('water',[],'包裹已上岸，实际水损可以防护；无人攻击纸张。',{target:3})],
 c5s06:[h('water',[],'湿纸先防继续水损，再读仍在的字。'),h('none',[],'不把票上的名字直接写成遗体身份。'),h('water',[],'建立干燥与封存，水损暂停不等于恢复字。',{goal:'insight',target:3})],
 c5s07:[h('interrupt',[foe('挤住库房门口的人',2,1,'obstruction')],'活人开门时先留安全空间，外锁和内钮各自说明。',{goal:'guard',guardTarget:3}),h('none',[],'核实实际门钮与值守，没有新生密道。'),h('none',[],'连续身份核验不依靠单个戒指。')],
 c5s14:[h('none',[],'家属分别同意，真名不代替安全安排。'),h('transfer',[],'分段护送确认接手，真实路线不公开。',{target:3}),h('none',[],'物证分处、家属分段，保护准备必须实际办理。',{goal:'courage',target:2})],
 c5s15:[h('grab',[foe('拥在候船通路的搬物者',2,1,'obstruction')],'先让无关人带自己的物件离开，不用证人试探埋伏。',{goal:'guard',guardTarget:3}),h('none',[],'候船眼神不是身份；寄存和属下联系要核记录。'),h('transfer',[foe('阻住传讯通路的货架',2,1,'obstruction')],'通知守卫并留通道；真实证人已改路，不回头当诱饵。',{target:3})],
 c6s03:[h('fall',[foe('倒在伤员旁的洗手架',3,3),foe('挤进门的围观者',2,2,'obstruction')],'先清施救位置；急救与独立记录可由不同人同时做。',{goal:'guard',guardTarget:4}),h('fall',[foe('压住救援通路的架脚',3,1,'obstruction')],'移开架脚、伤员交独立照护，记录不能延误救人。',{goal:'rescue',binds:2}),h('none',[],'救援已接手，将原纸和门边物件各自保管，等伤者安稳后再查。')],
 c6s07:[h('none',[],'用事前结构复核栅与窗，不以破坏制造出口。'),h('interrupt',[],'错误假说可被更正，不因一句错话定罪。'),h('none',[],'保留最初原话和已有求救先后。')],
 c6s08:[h('none',[],'按事前物件清单查缺，五案原件仍分处。'),h('scatter',[],'包好纸角，等待实际找回的物件比对。',{goal:'insight',target:2}),h('transfer',[],'取消路线要通知实际接收处，不只在笔记写作废。',{target:3})],
 c6s09:[h('transfer',[],'先实际回收凭条，降低再次接触机会。',{goal:'courage',target:3}),h('none',[],'外窗投递和内区进入是不同权限。'),h('none',[],'落实各处接手，不用放任访问试探。')],
 c6s11:[h('disposition',[],'双人比号码与作废通知，拦件但不交人。',{target:3}),h('grab',[foe('窗口边未固定的交件盘',2,1)],'先固定交件位置，两名当班人各记递交；实际纸件不能丢。',{goal:'guard',guardTarget:3}),h('transfer',[],'把旧件递交情况通知内区，新的警示必须送到。',{target:3})],
 c6s12:[h('none',[],'原件与封角比对，第一击仍不由纸纤维认人。'),h('transfer',[foe('小院通道被堆起的行李',2,1,'obstruction')],'留出守卫抵达路线，不把搬物猜成真实转移。',{target:3}),h('none',[],'接收员到安全位置，物件有专人接手。',{goal:'courage',target:2})],
 c6s13:[h('fall',[foe('伤员身旁倾倒的物资箱',1,3)],'先把伤员留在可照护位置，不逼他起身指路。',{goal:'guard',guardTarget:3}),h('transfer',[foe('被拖住的内门',3,1,'obstruction')],'独立守卫接管，停用可越区钥匙，核实际人数。',{target:3}),h('none',[],'先把当前亲见控制单独记录，别借旧案补动作。')],
 c6s14:[h('transfer',[foe('温拦在搬运通路前',7,4,'opponent'),foe('伤员旁倾倒的椅子',2,2)],'护送者专事抬人，其余人守路；解除阻挡不是杀死同行人。',{goal:'guard',guardTarget:6}),h('transfer',[foe('缚住韩的绳',3,1,'obstruction')],'先解除实际束缚，让韩按守卫指示离开。',{goal:'rescue',binds:3}),h('transfer',[foe('温仍握住的转移牵绳',5,3,'opponent'),foe('妨碍接管的桌椅',3,1,'obstruction')],'独立守卫接管，解除继续强行转移的两处阻碍。控制结束即可，不要求击杀。',{goal:'clear'})]
};
const intentNames={none:'无',glare:'反光',scatter:'纸页散落',urge:'时限催促',interrupt:'插话打断',water:'继续水损',dog:'犬只冲撞',grab:'抢夺',transfer:'未经核验的转移',disposition:'仓促处置',fall:'坠落或挤碰',fire:'明火'};
const kindTargets={timeline:3,flow:3,crosscase:3,custody:2,hypothesis:3,testimony:2,decision:2};
const kindNames={timeline:'排定先后',flow:'接续流转',crosscase:'跨案核验',custody:'确认保管',hypothesis:'比较解释',testimony:'限定证词',decision:'落实决定'};
function apply(D){if(!D?.encounters)return 0;let count=0;for(const e of D.encounters){e.roundContract=3;for(let i=0;i<e.phases.length;i++){
 const p=e.phases[i],q=p.investigation;delete p.pressureCap;delete p.clearBeforeRead;delete p.trapOnEnter;
 p.enemies=[];p.intent='none';p.target=q?(kindTargets[q.kind]||2):2;
 if(p.goal==='guard')p.goal=(/册|账|副本|封存|材料|记录|清单|线索/.test(p.title||''))?'insight':'courage';
 if(p.goal==='clear')p.goal='open';
 p.tactic=q?'现场安全时先整理已有材料，再'+(kindNames[q.kind]||'提交判断')+'。保护和协作会省时间，答案由材料决定。':'这一幕办理的是眼前的实际行动。选择合适协作和工具完成准备，再结算去下一步。';
 const patch=profiles[e.id]?.[i];if(patch)Object.assign(p,JSON.parse(JSON.stringify(patch)));
 p.enemies.forEach(x=>{if(!x.targetKind)throw Error('Missing targetKind');});
 if(q&&p.goal==='clear')throw Error('An investigation must not be solved by combat alone');
 const total=p.enemies.reduce((n,x)=>n+x.atk,0);
 p.omen=total?'回合末：未解除的现场危险合计造成 '+total+' 点压力；护身、保护者或对应应对可承担。':p.intent==='none'?'回合末：现场安静，无敌袭。完成行动与材料判断后推进。':'回合末：无敌袭；留意'+(intentNames[p.intent]||p.intent)+'，可用工具或应对保护本轮工作。';
 p.encounterProfile={version:2,intent:p.intent,task:q?.kind||p.goal,targetKinds:[...new Set(p.enemies.map(x=>x.targetKind))],quiet:!p.enemies.length};
 const labels={insight:'查验准备',courage:'交涉准备',open:'通路准备'};
 let hint=labels[p.goal]?labels[p.goal]+'达到'+p.target+'点。':p.goal==='guard'?'累计挡住'+(p.guardTarget||3)+'点压力，或解除本幕全部危险。':p.goal==='clear'?'解除本幕全部'+p.enemies.length+'处危险或阻拦。':p.goal==='rescue'?'解除'+(p.binds||0)+'处束缚，并接回被牵制的协作者。':'';
 if(p.clearBeforeRead)hint+=' 先清开全部遮挡，才能确认现场比较。';
 if(p.pressureCap!==undefined)hint+=' 剩余危险总压力须不超过'+p.pressureCap+'点。';
 if(q)hint+=' 准备完成后，比较'+q.materials.length+'份材料并提交判断。';
 hint+=' 本幕目标完成后，结束回合前进。';p.hint=hint;
 const scene=root.BDStory?.byId?.[e.id];if(scene){scene.objectives[i]=p.title;scene.hints[i]=hint;}
 p.encounterRuleVersion=2;count++;
 }}D.encounterRuleVersion=2;D.minTurns=D.encounters.reduce((n,e)=>n+e.phases.length,0);return count;}
function pressure(s,D){return (s.battle?.enemies||[]).filter(e=>e.hp>0).reduce((n,e)=>n+e.atk,0);}
function extraGoal(s,D){const p=D.encounters[s.encounter]?.phases[s.battle?.phase];if(!p)return true;return (p.pressureCap===undefined||pressure(s,D)<=p.pressureCap)&&(!p.clearBeforeRead||s.battle.enemies.every(e=>e.hp<=0));}
const api={version:2,patches:profiles,apply,pressure,extraGoal};api.applied=apply(root.BDData);root.BDEncounterRules=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window==='undefined'?globalThis:window);
