'use strict';
/**
 * 战役回归：按 index.html 脚本顺序 vm 加载（共享 globalThis），
 * 再用旧 cards-campaign 策略跑 recommend(style) 108 场。
 * 只读游戏源码；不改规则/卡牌/界面。
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const GAME = path.resolve(__dirname, '..');
const OUT = path.resolve(__dirname, '../../验证/campaign-r9.json');
const SEED = 77;
const MAX_ENCOUNTER = 108;

const SCRIPT_ORDER = [
  'data.js',
  'catalog.js',
  'catalog-case56.js',
  'catalog-rules.js',
  'story-content.js',
  'card-copy.js',
  'art-overrides.js',
  'art-map.js',
  'story-revisions.js',
  'encounter-rules.js',
  'card-rebalance.js',
  'card-names.js',
  'card-copy-horror.js',
  'card-copy-terms.js',
  'mechanics.js',
  'engine.js',
  'horror-rules.js',
];

const BASELINE = {
  balanced: { total: 482, cases: [85, 75, 70, 75, 90, 87] },
  guard: { total: 474, cases: [83, 76, 71, 74, 86, 84] },
  insight: { total: 434, cases: [77, 75, 63, 67, 74, 78] },
  tools: { total: 463, cases: [77, 78, 67, 70, 85, 86] },
};

const STYLE_LABEL = {
  balanced: '均衡',
  guard: '防护',
  insight: '核验',
  tools: '装备',
};

function loadGame() {
  const sandbox = {
    console,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Array,
    Object,
    Map,
    Set,
    WeakMap,
    WeakSet,
    Promise,
    JSON,
    Math,
    Date,
    Number,
    String,
    Boolean,
    RegExp,
    Error,
    TypeError,
    RangeError,
    parseInt,
    parseFloat,
    isNaN,
    isFinite,
    Infinity,
    NaN,
    undefined,
    Uint8Array,
    Int32Array,
    Float64Array,
    Buffer,
  };
  sandbox.globalThis = sandbox;
  sandbox.window = sandbox;
  sandbox.self = sandbox;
  // 故意不提供 module / require / exports，迫使各 IIFE 走 root.BD* 浏览器分支
  const context = vm.createContext(sandbox);

  for (const name of SCRIPT_ORDER) {
    const file = path.join(GAME, name);
    const code = fs.readFileSync(file, 'utf8');
    vm.runInContext(code, context, { filename: file, displayErrors: true });
  }

  const E = sandbox.BDEngine;
  const D = sandbox.BDData || sandbox.BDCatalog;
  const M = sandbox.BDMechanics;
  if (!E || !D || !M) {
    throw new Error('加载失败：缺少 BDEngine / BDData / BDMechanics');
  }
  if (!D.encounters || D.encounters.length < MAX_ENCOUNTER) {
    throw new Error('遭遇数不足：' + (D.encounters && D.encounters.length));
  }
  return {
    E,
    D,
    M,
    meta: {
      scripts: SCRIPT_ORDER.slice(),
      encounterCount: D.encounters.length,
      playerCardCount: (D.playerCards || []).length,
      catalogCounts: D.catalogCounts || null,
      horrorTraits: sandbox.BDHorror ? sandbox.BDHorror.count : 0,
      case56Present: !!(D.cards && (D.cards.card511 || D.cards['card511'])),
    },
  };
}

function makeStrategy(E, D, M) {
  function score(s) {
    if (s.view === 'defeat') return -10000;
    const b = s.battle;
    const p = D.encounters[s.encounter].phases[b.phase];
    const r = b.catalog;
    let n =
      b.hp * 0.75 +
      b.energy * 0.45 +
      b.hand.length * 0.22 +
      r.focus * 0.18 +
      r.route * 0.18 +
      r.resolve * 0.18 +
      r.nextEnergy * 0.35 -
      r.fatigue * 0.8 -
      r.strain * 0.85 -
      r.vulnerable * 0.2 +
      r.nextProgress * 0.3;
    const pressure = b.enemies
      .filter((e) => e.hp > 0 && !e.stunned)
      .reduce((acc, e) => acc + e.atk + (e.kind === 'fear' ? 1 : 0), 0);
    n -= pressure * 2.5;
    n += Math.min(b.shield, pressure) * 0.85 + r.freeBlocks * Math.min(pressure, 4) * 0.8 + r.counter * 0.25;
    for (const e of b.enemies) {
      n -=
        e.hp *
        (p.goal === 'clear' || p.goal === 'guard' || p.clearBeforeRead
          ? 1.6
          : p.pressureCap !== undefined
            ? 0.6
            : 0.25);
    }
    const stat = { insight: 'insight', courage: 'courage', open: 'leverage' }[p.goal];
    if (stat) n += Math.min(b[stat], p.target ?? 2) * 4.2;
    if (p.goal === 'rescue') n -= b.binds * 4 + b.captives.length * 5;
    if (p.goal === 'guard') n += Math.min(b.blocked, p.guardTarget ?? 3) * 2;
    n -= b.modern.injury * 2;
    n +=
      Math.min(b.modern.drying, 2 + b.modern.damage) *
      (M.ctx(s).dryPhases?.includes(b.phase) ? 4 : 0.2);
    for (const z of [...b.modern.people, ...b.modern.equipment, ...b.modern.setups]) {
      const c = D.cards[z.id];
      n +=
        Math.min(z.charges, 3) *
        (c.catalogRule.trigger === 'activate' ? 0.25 : 0.55) *
        (3 - b.phase);
    }
    if (b.modern.response) {
      const c = D.cards[b.modern.response.id];
      const match =
        c.catalogRule.intent === M.ctx(s).intent ||
        (c.catalogRule.intent === 'attack' && pressure > 0);
      n += match ? 2.5 : 0.1;
    }
    const ready = (!stat || b[stat] >= (p.target ?? 2)) && b.binds === 0 && M.extraGoal(s);
    if (ready) n += 1;
    return n;
  }

  function moves(g) {
    const s = g.s;
    const b = s.battle;
    const p = D.encounters[s.encounter].phases[b.phase];
    const out = [];
    for (let i = 0; i < b.hand.length; i++) {
      const c = D.cards[b.hand[i]];
      if (M.reason(s, c)) continue;
      if (c.target === 'enemy') {
        for (const e of b.enemies.filter((e) => e.hp > 0)) out.push(['play', i, e.uid]);
      } else out.push(['play', i]);
    }
    for (const z of [...b.modern.people, ...b.modern.equipment]) {
      if (!M.useReason(s, z.id)) out.push(['deployUse', z.id]);
    }
    for (const z of [...b.modern.people, ...b.modern.equipment, ...b.modern.setups]) {
      if (!z.charges) out.push(['withdraw', z.id]);
    }
    if (!b.actionUsed) {
      if (p.goal === 'clear') {
        for (const e of b.enemies.filter((e) => e.hp > 0)) out.push(['action', 'goal', e.uid]);
      } else out.push(['action', 'goal']);
      for (const e of b.enemies.filter((e) => e.hp > 0)) out.push(['action', 'strike', e.uid]);
      out.push(['action', 'guard']);
      if (!b.modern.intentResolved && M.ctx(s).intent !== 'none') out.push(['fieldTask', 'secure']);
      if (b.modern.injury) out.push(['fieldTask', 'care']);
      if (M.ctx(s).tags.includes('wet') && b.modern.drying < 2 + b.modern.damage) {
        out.push(['fieldTask', 'dry']);
      }
    }
    return out;
  }

  function run(style, seed = SEED, maxEncounter = MAX_ENCOUNTER, options = {}) {
    let g = E.create(null, seed);
    g.next();
    const fails = [];
    let turns = 0;
    let played = 0;
    while (g.s.encounter < maxEncounter && g.s.view !== 'ending') {
      const s = g.s;
      if (s.view === 'map') {
        g.recommend(style);
        if (options.onMap) options.onMap(g);
        g.begin();
      } else if (s.view === 'battle') {
        const b = g.s.battle;
        if (b.turn > 35) {
          fails.push({
            encounter: s.encounter,
            phase: b.phase,
            turn: b.turn,
            reason: 'over35',
          });
          break;
        }
        let changed = 0;
        while (changed++ < 25) {
          const base = score(g.s);
          let best = null;
          let bestValue = base + 0.06;
          for (const move of moves(g)) {
            if (options.noCards && move[0] !== 'action' && move[0] !== 'fieldTask') continue;
            const sim = E.create(JSON.parse(g.serialize()));
            const r = sim[move[0]](...move.slice(1));
            if (!r.ok) continue;
            if (!E.validate(sim.s)) {
              throw Error(
                'invalid after ' +
                  JSON.stringify(move) +
                  ' enc ' +
                  s.encounter +
                  ' turn ' +
                  b.turn
              );
            }
            let value = score(sim.s);
            if (move[0] === 'withdraw') value += 0.5;
            if (value > bestValue) {
              bestValue = value;
              best = move;
            }
          }
          if (!best) break;
          const result = g[best[0]](...best.slice(1));
          if (!result.ok) throw Error(result.msg);
          if (best[0] === 'play') played++;
          if (g.s.view !== 'battle') break;
        }
        if (g.s.view !== 'battle') continue;
        const p = D.encounters[g.s.encounter].phases[g.s.battle.phase];
        if (p.investigation && g.readyGoal() && !g.s.battle.investigation.solved) {
          const a = p.investigation.options.find((o) => o.correct);
          const result = g.investigate(a.id);
          if (!result.ok) throw Error(result.msg);
        }
        g.end();
        turns++;
        if (!E.validate(g.s)) {
          throw Error('invalid after end enc ' + s.encounter + ' turn ' + b.turn);
        }
      } else if (s.view === 'aftermath') {
        const e = D.encounters[s.encounter];
        if (e.choice && !s.lastChoice) {
          g.choose(e.choice.options.find((o) => o.correct !== false).id);
        }
        g.next();
      } else if (s.view === 'caseEnd') {
        if (D.encounters[s.encounter].chapter === 5) g.openHidden();
        else g.next();
      } else if (s.view === 'endingChoice') {
        g.finish('public');
      } else if (s.view === 'defeat') {
        fails.push({
          encounter: s.encounter,
          turn: s.battle?.turn,
          phase: s.battle?.phase,
          reason: 'defeat',
        });
        break;
      } else {
        throw Error(s.view);
      }
    }

    const cases = Array.from({ length: 6 }, (_, i) => ({
      chapter: i + 1,
      scenes: 0,
      turns: 0,
      plays: 0,
      triggers: 0,
      minHP: 30,
      cardUse: {},
    }));
    for (const c of g.s.completed) {
      const enc = D.encounters.find((e) => e.id === c.id);
      const x = cases[enc.chapter - 1];
      x.scenes++;
      x.turns += c.turns;
      x.minHP = Math.min(x.minHP, c.cardStats?.minHP ?? c.hp);
      for (const [id, n] of Object.entries(c.cardStats?.plays || {})) {
        const name = D.cards[id].name;
        x.cardUse[name] = (x.cardUse[name] || 0) + n;
        x.plays += n;
      }
      x.triggers += Object.values(c.cardStats?.triggers || {}).reduce((a, b) => a + b, 0);
    }

    return {
      style,
      seed,
      completed: g.s.completed.length,
      view: g.s.view,
      turns,
      played,
      cases,
      fails,
      cleared: g.s.view === 'ending' && fails.length === 0 && g.s.completed.length === maxEncounter,
    };
  }

  return { score, moves, run };
}

function summarizeStyle(raw) {
  const caseTurns = raw.cases.map((c) => c.turns);
  const baseline = BASELINE[raw.style];
  const caseDiff = caseTurns.map((t, i) => t - baseline.cases[i]);
  const totalDiff = raw.turns - baseline.total;
  const totalPct = baseline.total ? (totalDiff / baseline.total) * 100 : null;
  return {
    style: raw.style,
    label: STYLE_LABEL[raw.style] || raw.style,
    seed: raw.seed,
    cleared: !!raw.cleared,
    view: raw.view,
    completed: raw.completed,
    totalTurns: raw.turns,
    caseTurns,
    baselineTotal: baseline.total,
    baselineCases: baseline.cases.slice(),
    totalDiff,
    totalPct: totalPct === null ? null : Math.round(totalPct * 100) / 100,
    caseDiff,
    played: raw.played,
    uniqueCards: raw.cases.reduce((n, c) => n + Object.keys(c.cardUse).length, 0),
    fails: (raw.fails || []).map((f) => ({
      encounter: f.encounter,
      phase: f.phase,
      turn: f.turn,
      reason: f.reason,
    })),
    cases: raw.cases.map(({ cardUse, ...x }) => ({
      ...x,
      uniqueCards: Object.keys(cardUse).length,
    })),
  };
}

function buildConclusion(styles) {
  const lines = [];
  let anyFail = false;
  let anyBig = false;
  for (const s of styles) {
    if (!s.cleared || (s.fails && s.fails.length)) {
      anyFail = true;
      const fail = (s.fails && s.fails[0]) || { reason: '未通关 view=' + s.view };
      lines.push(
        `${s.label}（${s.style}）未按旧策略通关：encounter=${fail.encounter ?? '?'} phase=${fail.phase ?? '?'} reason=${fail.reason}；总回合 ${s.totalTurns}（基线 ${s.baselineTotal}，差 ${s.totalDiff}）。`
      );
    } else if (Math.abs(s.totalPct) > 15) {
      anyBig = true;
      lines.push(
        `${s.label}通关，总回合 ${s.totalTurns} vs 基线 ${s.baselineTotal}（${s.totalDiff >= 0 ? '+' : ''}${s.totalDiff}，${s.totalPct}%）。偏差超过约 15%，在脚本已跑通的前提下，更可能来自抽牌池/覆盖层相对旧基线变大或构筑分布变化，而非本回归脚本没跑完。`
      );
    } else {
      lines.push(
        `${s.label}通关，总回合 ${s.totalTurns} vs 基线 ${s.baselineTotal}（${s.totalDiff >= 0 ? '+' : ''}${s.totalDiff}，${s.totalPct}%）；六案差 [${s.caseDiff.join(', ')}]。`
      );
    }
  }
  if (!anyFail && !anyBig) {
    lines.push('四套均通关且总回合相对旧基线偏差未超过约 15%，策略脚本与规则链路一致可用。');
  } else if (!anyFail && anyBig) {
    lines.push('脚本四套均跑通；超阈值偏差应归因于相对旧基线的牌池/构筑变化，而非加载顺序或策略未执行完。');
  }
  return lines.join(' ');
}

function writeResult(payload) {
  fs.mkdirSync(path.dirname(OUT), { recursive: true });
  fs.writeFileSync(OUT, JSON.stringify(payload, null, 2));
}

function readExisting() {
  try {
    return JSON.parse(fs.readFileSync(OUT, 'utf8'));
  } catch {
    return null;
  }
}

function main() {
  const arg = (process.argv[2] || 'all').toLowerCase();
  const styles =
    arg === 'all' ? ['balanced', 'guard', 'insight', 'tools'] : [arg];
  for (const s of styles) {
    if (!BASELINE[s]) {
      console.error('未知风格：' + s + '（balanced|guard|insight|tools|all）');
      process.exit(2);
    }
  }

  console.error('[campaign-sim] 按 index.html 顺序 vm 加载…');
  const t0 = Date.now();
  const { E, D, M, meta } = loadGame();
  console.error(
    `[campaign-sim] 加载完成 ${Date.now() - t0}ms；encounters=${meta.encounterCount} playerCards=${meta.playerCardCount} horrorTraits=${meta.horrorTraits}`
  );

  const { run } = makeStrategy(E, D, M);
  const existing = readExisting();
  const byStyle = Object.assign({}, existing && existing.byStyle ? existing.byStyle : {});

  for (const style of styles) {
    const started = Date.now();
    console.error(`[campaign-sim] 开始 ${style} seed=${SEED} max=${MAX_ENCOUNTER}`);
    let raw;
    try {
      raw = run(style, SEED, MAX_ENCOUNTER);
    } catch (err) {
      console.error(`[campaign-sim] ${style} 抛错：`, err && err.stack ? err.stack : err);
      raw = {
        style,
        seed: SEED,
        completed: 0,
        view: 'error',
        turns: 0,
        played: 0,
        cases: Array.from({ length: 6 }, (_, i) => ({
          chapter: i + 1,
          scenes: 0,
          turns: 0,
          plays: 0,
          triggers: 0,
          minHP: 30,
          cardUse: {},
        })),
        fails: [{ encounter: null, phase: null, turn: null, reason: String(err && err.message ? err.message : err) }],
        cleared: false,
      };
    }
    const summary = summarizeStyle(raw);
    summary.elapsedMs = Date.now() - started;
    byStyle[style] = summary;
    console.error(
      `[campaign-sim] ${style} 完成：cleared=${summary.cleared} turns=${summary.totalTurns} diff=${summary.totalDiff} (${summary.elapsedMs}ms) fails=${summary.fails.length}`
    );

    const ordered = ['balanced', 'guard', 'insight', 'tools']
      .filter((k) => byStyle[k])
      .map((k) => byStyle[k]);
    const payload = {
      generatedAt: new Date().toISOString(),
      seed: SEED,
      maxEncounter: MAX_ENCOUNTER,
      loadMode: 'vm-index-html-order',
      loadMeta: meta,
      baseline: BASELINE,
      note: '材料判断读取正确选项（规则通关证据，非盲测）。策略同旧 cards-campaign.js。',
      byStyle,
      styles: ordered,
      conclusion: buildConclusion(ordered),
    };
    writeResult(payload);
  }

  const final = JSON.parse(fs.readFileSync(OUT, 'utf8'));
  console.log(
    JSON.stringify(
      {
        out: OUT,
        conclusion: final.conclusion,
        styles: final.styles.map((s) => ({
          style: s.style,
          cleared: s.cleared,
          totalTurns: s.totalTurns,
          totalDiff: s.totalDiff,
          totalPct: s.totalPct,
          caseTurns: s.caseTurns,
          fails: s.fails,
        })),
      },
      null,
      2
    )
  );
  process.exitCode = final.styles.some((s) => !s.cleared || (s.fails && s.fails.length)) ? 1 : 0;
}

if (require.main === module) main();

module.exports = { loadGame, makeStrategy, BASELINE, SCRIPT_ORDER, OUT };
