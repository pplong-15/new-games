/* Night rules attach only to existing hazards. They never add evidence or story actors. */
(function(root){'use strict';
const D=root.BDData;if(!D?.encounters)return;
const TRAITS={
 claim:{name:'索取',text:'每回合末自动弃掉最右侧1张手牌；空手时失去2心神。先打出想保留其效果的牌，或化解它。'},
 callname:{name:'应名',text:'每轮开始叫出手里一个名字，本轮同名牌不能用。化解它、说破来由或离开本幕后解除。'},
 tangle:{name:'越理越乱',text:'每增加1点调查，它的压力+1（最多20）。卡牌、协作与基础调查都算。'},
 watch:{name:'背后有人',text:'回合末手里还剩至少4张牌时，失去1心神。'},
 hush:{name:'噤口',text:'不能使用基础压制。先用一次「先护现场」或说破来由解除；卡牌仍可化解危险。'}
};
// Quiet scenes stay quiet. Early cases teach one rule at a time; later cases reuse them.
const PLAN={
 c1s01:{0:'claim'},c1s02:{0:'watch',1:'tangle'},c1s04:{1:'tangle'},c1s07:{0:'callname'},c1s11:{0:'hush'},
 c2s04:{0:'claim'},c2s07:{1:'hush'},c2s14:{0:'callname'},
 c3s01:{0:'claim'},c3s09:{1:'callname'},c3s11:{2:'watch'},
 c4s06:{0:'callname'},c4s10:{0:'hush'},c4s13:{1:'watch'},
 c5s01:{0:'claim'},c5s03:{1:'callname'},c5s07:{0:'hush'},c5s15:{2:'watch'},
 c6s03:{0:'watch'},c6s11:{1:'claim'},c6s12:{1:'callname'},c6s14:{0:'hush'}
};
let count=0;
for(const enc of D.encounters)for(let pi=0;pi<enc.phases.length;pi++){
 const trait=PLAN[enc.id]?.[pi],enemy=enc.phases[pi].enemies[0];
 if(trait&&enemy){enemy.trait=trait;count++;}
}
D.horrorTraits=TRAITS;
root.BDHorror={TRAITS,PLAN,count,version:3};
})(typeof window==='undefined'?globalThis:window);
