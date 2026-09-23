#!/usr/bin/env node
'use strict';
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const game = path.dirname(dir);
const ALLOWED_OPS = new Set([
  'if','pay','insight','courage','leverage','shield','heal','hurt','focus','resolve','route',
  'damage','sweep','stun','weaken','weakenAll','expose','cover','draw','drawMode','discardRight',
  'recycle','energy','nextEnergy','nextProgress','fatigue','vulnerable','strain','calm',
  'attackBonus','counter','retain','blockNext','cut','care','dry','evacuate','exhaustSelf','refresh'
]);
const ALLOWED_COND = new Set([
  'killed','exposedBeforeHit','stunned','weakened','exposed','wounded','lowHP','guarded','alone',
  'otherAlone','otherEquipped','people1','people2','equipped','first','afterAction','hand2','enemies2',
  'focus1','focus2','resolve1','resolve2','route1','route2','any'
]);
const PERSON_NAMES = new Set([
  '温既白','宋绮','江蘅','阿豆','顾承安','梁福','宋嫂','钱映棠','许照宁','孟秋岚','素秋姨母',
  '邵云岚','邵云筝','严鹤生','余雪梅','柏正','何巡','值班女医','巡夜更夫','客栈伙计','摆渡船工',
  '临时工役','档房抄手','抬担架的协作者'
]);

function load(name) {
  const p = path.join(dir, name);
  if (!fs.existsSync(p)) throw new Error('missing ' + p);
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

function walkOps(ops, bad) {
  if (!Array.isArray(ops)) return;
  for (const o of ops) {
    if (!o || !ALLOWED_OPS.has(o.op)) bad.push('op ' + (o && o.op));
    if (o.op === 'if' && o.condition && !ALLOWED_COND.has(o.condition)) bad.push('cond ' + o.condition);
    if (o.effects) walkOps(o.effects, bad);
  }
}

function normalize(c, fallbackArt) {
  const rule = c.catalogRule || {};
  if (c.target !== undefined && !['enemy', 'ally'].includes(c.target)) {
    throw new Error('invalid target ' + c.id + ': ' + c.target);
  }
  return {
    id: c.id,
    name: c.name,
    cost: c.cost,
    type: c.type,
    mode: c.mode,
    ...(c.target !== undefined ? { target: c.target } : {}),
    modern: true,
    legacy: false,
    collectible: true,
    unlock: c.unlock,
    sourceCase: c.sourceCase,
    source: c.source,
    sourceScene: c.sourceScene,
    art: c.art || fallbackArt,
    artExt: 'webp',
    designArtKey: c.designArtKey || c.art,
    text: c.text,
    shortText: c.shortText || c.text,
    conditions: c.conditions || '',
    omen: c.omen || '名字写在哪里，人就在哪里。',
    archetype: c.archetype || '归名录',
    buildRole: c.buildRole || (rule.effectText || ''),
    designId: c.designId || c.id,
    designEffect: c.designEffect || c.text,
    catalogRule: {
      version: 2,
      mode: c.mode,
      trigger: rule.trigger || (c.mode === 'skill' ? 'skill' : c.mode === 'response' ? (rule.intent || 'attack') : 'phase'),
      condition: rule.condition || 'any',
      goals: [],
      case: 0,
      enter: rule.enter || [],
      effects: rule.effects || [],
      charges: Number.isFinite(rule.charges) ? rule.charges : (c.mode === 'equipment' ? 4 : c.mode === 'setup' ? 3 : c.mode === 'person' ? 99 : 0),
      activateCost: rule.activateCost || 0,
      effectText: rule.effectText || c.shortText || c.text,
      intent: c.mode === 'response' ? (rule.intent || null) : (rule.intent || null)
    }
  };
}

function validate(cards, tag) {
  const names = new Set();
  const ids = new Set();
  const errors = [];
  for (const c of cards) {
    if (!c.id || ids.has(c.id)) errors.push(tag + ' bad id ' + c.id);
    ids.add(c.id);
    if (!c.name || names.has(c.name)) errors.push(tag + ' bad name ' + c.name);
    names.add(c.name);
    if (PERSON_NAMES.has(c.name) && c.mode !== 'person') errors.push(tag + ' stole person name ' + c.name);
    if (c.mode === 'person') errors.push(tag + ' unexpected person ' + c.id);
    if (![0, 1, 2].includes(c.cost)) errors.push(tag + ' cost ' + c.id);
    const bad = [];
    walkOps(c.catalogRule && c.catalogRule.enter, bad);
    walkOps(c.catalogRule && c.catalogRule.effects, bad);
    if (bad.length) errors.push(tag + ' ' + c.id + ' ' + bad.join(','));
  }
  return { names, ids, errors };
}

function main() {
  const case5 = load('case5-cards.json').map(c => normalize(c, 'tool-notebook'));
  const case6 = load('case6-cards.json').map(c => normalize(c, 'lantern'));
  const ritual = load('ritual-cards.json').map(c => normalize(c, 'tool-pageclip'));
  const reclass = load('case5-reclass.json');
  const v5 = validate(case5, 'c5');
  const v6 = validate(case6, 'c6');
  const vr = validate(ritual, 'ritual');
  const allNames = [...v5.names];
  for (const n of v6.names) {
    if (allNames.includes(n)) vr.errors.push('name clash ' + n);
    allNames.push(n);
  }
  for (const n of vr.names) {
    if (allNames.includes(n)) vr.errors.push('ritual clash ' + n);
  }
  const errors = [...v5.errors, ...v6.errors, ...vr.errors];
  if (case5.length < 70) errors.push('case5 too few ' + case5.length);
  if (case6.length < 70) errors.push('case6 too few ' + case6.length);
  if (errors.length) {
    console.error(errors.slice(0, 40).join('\n'));
    throw new Error('validation failed ' + errors.length);
  }
  const payload = { case5, case6, ritual, reclass };
  fs.writeFileSync(path.join(dir, 'inject-payload.json'), JSON.stringify(payload));
  const js = `/* 第五/六案专属卡 + 法事链。不改 catalog.js。回滚：删 index.html 里本文件。 */\n(function(root){'use strict';\nconst D=root.BDData;if(!D||!D.playerCards)return;\nconst PAYLOAD=${JSON.stringify(payload)};\nfunction inject(card){\n  if(D.cards[card.id])return;\n  D.cards[card.id]=card;\n  D.cardList.push(card);\n  D.playerCards.push(card);\n  D.modernCards=D.playerCards;\n  const keys=['name','cost','type','mode','text','shortText','conditions','designEffect','archetype','buildRole'];\n  D.canonicalCardText=D.canonicalCardText||{};\n  D.canonicalCardText[card.id]=Object.freeze(Object.fromEntries(keys.map(k=>[k,card[k]])));\n}\nfor(const c of PAYLOAD.case5)inject(c);\nfor(const c of PAYLOAD.case6)inject(c);\nfor(const c of PAYLOAD.ritual)inject(c);\nconst RE=PAYLOAD.reclass||{};\nconst ids=Array.isArray(RE)?RE.map(x=>x.id||x):Object.keys(RE);\nconst byId=Array.isArray(RE)?Object.fromEntries(RE.filter(x=>x&&x.id).map(x=>[x.id,x])):RE;\nfor(const id of ['card511','card512','card513','card514','card515','card516','card519']){\n  const c=D.cards[id];if(!c)continue;\n  c.sourceCase=0;\n  const row=byId[id];\n  if(row&&row.name){c.name=row.name;c.text=row.text||c.text;c.shortText=row.shortText||row.short||c.shortText;c.omen=row.omen||c.omen;}\n  if(D.canonicalCardText[id]){\n    D.canonicalCardText[id]=Object.freeze(Object.assign({},D.canonicalCardText[id],{name:c.name,text:c.text,shortText:c.shortText}));\n  }\n}\nD.catalogCounts={collectible:D.playerCards.length,person:D.playerCards.filter(c=>c.mode==='person').length};\nD.case56Version=1;\nroot.BDData=D;\n})(typeof window==='undefined'?globalThis:window);\n`;
  fs.writeFileSync(path.join(game, 'catalog-case56.js'), js);
  console.log('wrote catalog-case56.js', { case5: case5.length, case6: case6.length, ritual: ritual.length });
}

main();
