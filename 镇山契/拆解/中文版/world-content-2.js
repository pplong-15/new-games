/* inlined: game-core.js */
(function (root, factory) {
  const world = typeof module === "object" && module.exports
    ? require("./world-content.js")
    : root.ZHENSHAN_WORLD;
  const api = factory(world);
  if (typeof module === "object" && module.exports) module.exports = api;
  root.ZhenShanCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function (WORLD) {
  "use strict";

  if (!WORLD) throw new Error("ZHENSHAN_WORLD is required before game-core.js");

  const SCHEMA_VERSION = 2;
  const BEAT_IDS = WORLD.beats.map((beat) => beat.id);
  const BEAT_BY_ID = new Map(WORLD.beats.map((beat) => [beat.id, beat]));
  const FALSE_BY_ID = new Map(WORLD.falsePaths.map((path) => [path.id, path]));
  const RECORD_BY_ROUTE = new Map(WORLD.records.map((record) => [record.route, record]));
  const REACTION_BY_BEAT = new Map(WORLD.reactions.map((reaction) => [reaction.afterBeat, reaction]));
  const ALL_OUTPUT_IDS = new Set(WORLD.outcomeSlots.flat());
  const MAX_EVENT_LOG = 1200;
  const COMPACTABLE_EVENTS = new Set(["PANEL_INVALID", "FALSE_PATH_CONCLUSION_INVALID"]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function blankFalsePaths() {
    return Object.fromEntries(WORLD.falsePaths.map((path) => [path.id, {
      entered: false,
      stepsSeen: [],
      closed: false,
      methodLearned: false,
    }]));
  }

  function makeBlankState(sessionId) {
    return {
      schemaVersion: SCHEMA_VERSION,
      sessionStarted: false,
      sessionId: sessionId || "QC447-LOCAL",
      currentBeat: "B01",
      completedPanels: {},
      completedBeats: [],
      derivedEvidence: [],
      reactionReadyQueue: [],
      reactionsPosted: [],
      unreadReaction: null,
      hints: {},
      directHintConfirmations: {},
      falsePaths: blankFalsePaths(),
      optionalConclusions: [],
      viewedPublicRoutes: [],
      predictionIntegrity: null,
      conditionalMatchRecorded: false,
      recommendedBranch: null,
      authorizedBranch: null,
      executedBranch: null,
      executionComplete: false,
      ending: null,
      eventLog: [],
      lastError: null,
    };
  }

  function createInitialState(options) {
    const opts = options || {};
    const state = makeBlankState(opts.sessionId);
    return appendEvent(state, "STATE_CREATED", { schemaVersion: SCHEMA_VERSION }, opts.at);
  }

  function safeTimestamp(at) {
    if (typeof at === "string" && at) return at;
    return new Date().toISOString();
  }

  function appendEvent(state, type, detail, at) {
    const next = clone(state);
    if (next.eventLog.length >= MAX_EVENT_LOG) {
      // Invalid attempts do not change replayed story state. Compact only those
      // audit-noise entries, preserving genesis and every state-bearing event.
      next.eventLog = next.eventLog.filter((event) => !COMPACTABLE_EVENTS.has(event.type));
      if (next.eventLog.length >= MAX_EVENT_LOG && COMPACTABLE_EVENTS.has(type)) return next;
    }
    const seq = next.eventLog.length + 1;
    next.eventLog.push({ seq, type, at: safeTimestamp(at), detail: clone(detail || {}) });
    next.eventLog = next.eventLog.map((event, index) => ({ ...event, seq: index + 1 }));
    return next;
  }

  function own(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
  }

  function stableUnique(values, allowed) {
    const result = [];
    for (const value of Array.isArray(values) ? values : []) {
      if ((!allowed || allowed.has(value)) && !result.includes(value)) result.push(value);
    }
    return result;
  }

  function normalizeState(raw) {
    const reset = () => createInitialState({ sessionId: "QC447-RECOVERED", at: "1970-01-01T00:00:00.000Z" });
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) return reset();
    if (raw.schemaVersion !== SCHEMA_VERSION) return reset();
    if (!Array.isArray(raw.eventLog) || raw.eventLog.length === 0) return reset();

    const next = makeBlankState(typeof raw.sessionId === "string" ? raw.sessionId.slice(0, 80) : "QC447-RECOVERED");
    let invalidReason = null;
    let pendingValidPanel = null;

    function invalidate(reason) {
      if (!invalidReason) invalidReason = reason;
      return false;
    }

    function expectedBeat() {
      return WORLD.beats[next.completedBeats.length] || null;
    }

    function allB18PanelsSaved() {
      const beat = BEAT_BY_ID.get("B18");
      return (next.completedPanels.B18 || []).length === beat.panels.length;
    }

    function validBranchPrerequisites() {
      return next.completedBeats.length === 17
        && next.completedBeats.every((beatId, index) => beatId === BEAT_IDS[index])
        && allB18PanelsSaved();
    }

    function expectedPanelOutputs(beat, panelIndex) {
      return beat.panels[panelIndex].outputs.filter((output) => output !== "__ENDING__");
    }

    // API-created logs stay under this bound by compacting only replay-neutral
    // failures. Oversized foreign logs are rejected instead of partly replayed.
    if (raw.eventLog.length > MAX_EVENT_LOG) return reset();
    const sourceEvents = raw.eventLog;
    for (let index = 0; index < sourceEvents.length; index += 1) {
      const source = sourceEvents[index];
      if (!source || typeof source !== "object" || Array.isArray(source) || typeof source.type !== "string") {
        invalidate("MALFORMED_EVENT@" + index);
        break;
      }
      const type = source.type.slice(0, 80);
      const detail = source.detail && typeof source.detail === "object" && !Array.isArray(source.detail) ? clone(source.detail) : {};
      const event = { seq: next.eventLog.length + 1, type, at: typeof source.at === "string" ? source.at.slice(0, 40) : "", detail };
      let legal = true;

      if (pendingValidPanel && type !== "PANEL_SAVED") legal = false;

      if (!legal) {
        // A PANEL_VALID event is a one-event transaction prefix; nothing else may intervene.
      } else if (type === "STATE_CREATED") {
        legal = index === 0 && detail.schemaVersion === SCHEMA_VERSION;
      } else if (type === "SESSION_RESET") {
        legal = index === 1 && next.eventLog[0] && next.eventLog[0].type === "STATE_CREATED" && !next.sessionStarted;
      } else if (type === "SESSION_STARTED") {
        legal = !next.sessionStarted && detail.workOrder === WORLD.workOrder;
        if (legal) next.sessionStarted = true;
      } else if (type === "PANEL_VALID") {
        const beat = expectedBeat();
        const done = beat ? next.completedPanels[beat.id] || [] : [];
        legal = Boolean(!pendingValidPanel && next.sessionStarted && beat && detail.beatId === beat.id
          && detail.panelIndex === done.length && beat.panels[detail.panelIndex] && detail.code === "VALID");
        if (legal) pendingValidPanel = { beatId: detail.beatId, panelIndex: detail.panelIndex };
      } else if (type === "PANEL_INVALID") {
        const beat = expectedBeat();
        const done = beat ? next.completedPanels[beat.id] || [] : [];
        legal = Boolean(!pendingValidPanel && next.sessionStarted && beat && detail.beatId === beat.id
          && detail.panelIndex === done.length && beat.panels[detail.panelIndex] && detail.code !== "VALID");
      } else if (type === "PANEL_SAVED") {
        const beat = expectedBeat();
        const done = beat ? next.completedPanels[beat.id] || [] : [];
        const panelIndex = Number(detail.panelIndex);
        legal = Boolean(pendingValidPanel && pendingValidPanel.beatId === detail.beatId
          && pendingValidPanel.panelIndex === panelIndex && next.sessionStarted && beat
          && detail.beatId === beat.id && panelIndex === done.length && beat.panels[panelIndex]);
        if (legal) {
          const expectedOutputs = expectedPanelOutputs(beat, panelIndex);
          const eventOutputs = Array.isArray(detail.outputs) ? detail.outputs : [];
          legal = expectedOutputs.length === eventOutputs.length && expectedOutputs.every((output, outputIndex) => output === eventOutputs[outputIndex]);
          if (legal) {
            next.completedPanels[beat.id] = done.concat(panelIndex);
            for (const output of expectedOutputs) {
              if (!next.derivedEvidence.includes(output)) next.derivedEvidence.push(output);
            }
          }
        }
        if (legal) pendingValidPanel = null;
      } else if (type === "BEAT_COMPLETED") {
        const beat = expectedBeat();
        const panels = beat ? next.completedPanels[beat.id] || [] : [];
        legal = Boolean(beat && detail.beatId === beat.id && panels.length === beat.panels.length);
        if (legal && beat.id === "B17") legal = next.conditionalMatchRecorded === true;
        if (legal && beat.id === "B18") legal = Boolean(next.executionComplete && next.ending === "ENDING-" + next.executedBranch);
        if (legal) {
          next.completedBeats.push(beat.id);
          next.currentBeat = WORLD.beats[next.completedBeats.length] ? WORLD.beats[next.completedBeats.length].id : "B18";
        }
      } else if (type === "REACTION_READY") {
        const reaction = WORLD.reactions.find((item) => item.id === detail.reactionId && item.afterBeat === detail.afterBeat);
        legal = Boolean(reaction && next.completedBeats.includes(reaction.afterBeat)
          && !next.reactionReadyQueue.includes(reaction.id) && !next.reactionsPosted.includes(reaction.id));
        if (legal) next.reactionReadyQueue.push(reaction.id);
      } else if (type === "REACTION_POSTED") {
        legal = Boolean(!next.unreadReaction && next.reactionReadyQueue[0] && next.reactionReadyQueue[0] === detail.reactionId);
        if (legal) {
          next.reactionReadyQueue.shift();
          next.reactionsPosted.push(detail.reactionId);
          next.unreadReaction = detail.reactionId;
        }
      } else if (type === "REACTION_READ") {
        legal = next.unreadReaction === detail.reactionId;
        if (legal) next.unreadReaction = null;
      } else if (type === "HINT_REVEALED") {
        const beat = BEAT_BY_ID.get(detail.beatId);
        const panelIndex = Number(detail.panelIndex);
        const level = Number(detail.level);
        const key = detail.beatId + ":" + panelIndex;
        legal = Boolean(beat && beat.panels[panelIndex] && Number.isInteger(level) && level === Number(next.hints[key] || 0) + 1 && level <= 4);
        if (legal) {
          next.hints[key] = level;
          if (level === 4) next.directHintConfirmations[key] = true;
        }
      } else if (type === "PUBLIC_RECORD_VIEWED") {
        const record = RECORD_BY_ROUTE.get(detail.route);
        legal = Boolean(record && detail.recordId === record.id);
        if (legal && !next.viewedPublicRoutes.includes(detail.route)) next.viewedPublicRoutes.push(detail.route);
      } else if (type === "PREDICTION_INTEGRITY_RECORDED") {
        const b17Panels = next.completedPanels.B17 || [];
        const expectedIntegrity = next.viewedPublicRoutes.includes("#/geology/record/BP-1998-0719") ? "seen_result" : "blind";
        legal = b17Panels.length === 1 && b17Panels[0] === 0 && !next.predictionIntegrity
          && detail.timezone === WORLD.worldTimezone
          && detail.predictionIntegrity === expectedIntegrity;
        if (legal) next.predictionIntegrity = detail.predictionIntegrity;
      } else if (type === "CONDITIONAL_MATCH_RECORDED") {
        legal = !next.conditionalMatchRecorded && next.derivedEvidence.includes("DER-THIRD-NIGHT-CALCULATION")
          && detail.status === "conditional_match" && detail.timezone === WORLD.worldTimezone
          && detail.predictionIntegrity === next.predictionIntegrity
          && (next.predictionIntegrity === "blind" || next.predictionIntegrity === "seen_result");
        if (legal) next.conditionalMatchRecorded = true;
      } else if (type === "FALSE_PATH_ENTERED") {
        const path = FALSE_BY_ID.get(detail.falseId);
        legal = Boolean(next.sessionStarted && path && !next.falsePaths[path.id].entered);
        if (legal) next.falsePaths[path.id].entered = true;
      } else if (type === "FALSE_PATH_STEP") {
        const path = FALSE_BY_ID.get(detail.falseId);
        const branch = path ? next.falsePaths[path.id] : null;
        const expected = path && path.steps[branch.stepsSeen.length];
        legal = Boolean(next.sessionStarted && path && branch && expected && expected.id === detail.stepId && Number(detail.stepNumber) === branch.stepsSeen.length + 1);
        if (legal) {
          branch.entered = true;
          branch.stepsSeen.push(detail.stepId);
        }
      } else if (type === "FALSE_PATH_CLOSED") {
        const path = FALSE_BY_ID.get(detail.falseId);
        const branch = path ? next.falsePaths[path.id] : null;
        legal = Boolean(path && branch && branch.stepsSeen.length === path.steps.length && !branch.closed
          && detail.propositionId === path.propositionId && detail.status === "disproved" && detail.affectsMainProgress === false);
        if (legal) {
          branch.closed = true;
          branch.methodLearned = true;
          next.optionalConclusions.push({ id: path.propositionId, status: "disproved", via: path.id });
        }
      } else if (type === "FALSE_PATH_CONCLUSION_INVALID") {
        const path = FALSE_BY_ID.get(detail.falseId);
        const branch = path ? next.falsePaths[path.id] : null;
        legal = Boolean(path && branch && branch.stepsSeen.length === path.steps.length && !branch.closed);
      } else if (type === "BRANCH_RECOMMENDED") {
        const branch = detail.recommendedBranch;
        legal = Boolean(validBranchPrerequisites() && !next.recommendedBranch && (branch === "A" || branch === "B")
          && detail.actor === "QC-447" && detail.authority === "advice_only");
        if (legal) next.recommendedBranch = branch;
      } else if (type === "BRANCH_AUTHORIZED") {
        legal = Boolean(validBranchPrerequisites() && next.recommendedBranch && !next.authorizedBranch
          && detail.authorizedBranch === next.recommendedBranch && detail.actor === "FIXED_IN_WORLD_INSTITUTIONS");
        if (legal && detail.authorizedBranch === "A") legal = detail.prototypeAssumption === WORLD.qaFacts.branchA;
        if (legal) next.authorizedBranch = detail.authorizedBranch;
      } else if (type === "BRANCH_EXECUTED") {
        legal = Boolean(validBranchPrerequisites() && next.authorizedBranch && !next.executedBranch
          && detail.executedBranch === next.authorizedBranch && detail.actor === "FIXED_IN_WORLD_STAFF"
          && detail.playerHandledOriginals === false);
        if (legal) next.executedBranch = detail.executedBranch;
      } else if (type === "EXECUTION_COMPLETE") {
        legal = Boolean(next.executedBranch && !next.executionComplete && detail.executionComplete === true && detail.branch === next.executedBranch);
        if (legal) next.executionComplete = true;
      } else if (type === "ENDING_MINTED") {
        legal = Boolean(next.executionComplete && !next.ending && detail.ending === "ENDING-" + next.executedBranch && detail.afterExecutionComplete === true);
        if (legal) next.ending = detail.ending;
      } else {
        legal = false;
      }

      if (!legal) {
        invalidate("ILLEGAL_" + type + "@" + index);
        break;
      }
      next.eventLog.push(event);
    }

    if (!invalidReason && pendingValidPanel) {
      invalidReason = "DANGLING_PANEL_VALID@" + (next.eventLog.length - 1);
      next.eventLog.pop();
    }

    if (!next.eventLog.length || next.eventLog[0].type !== "STATE_CREATED") return reset();
    if (invalidReason) next.lastError = { code: "CORRUPT_EVENT_LOG_TRUNCATED", message: "存档事件在首个非法节点被截断。", detail: invalidReason };
    next.schemaVersion = SCHEMA_VERSION;
    return next;
  }

  function startSession(state, at) {
    const next = normalizeState(state);
    if (next.sessionStarted) return { ok: true, state: next, already: true };
    next.sessionStarted = true;
    const logged = appendEvent(next, "SESSION_STARTED", { workOrder: WORLD.workOrder }, at);
    return { ok: true, state: logged };
  }

  function getBeat(beatId) {
    return BEAT_BY_ID.get(beatId) || null;
  }

  function getCurrentBeat(state) {
    const normalized = normalizeState(state);
    return getBeat(normalized.currentBeat) || WORLD.beats[0];
  }

  function canAccessBeat(state, beatId) {
    const normalized = normalizeState(state);
    const index = BEAT_IDS.indexOf(beatId);
    if (index < 0 || !normalized.sessionStarted) return false;
    if (normalized.completedBeats.includes(beatId)) return true;
    return index === normalized.completedBeats.length;
  }

  function expectedFor(question, branch) {
    if (question.correct === "__branch__") return branch;
    return clone(question.correct);
  }

  function answerEqual(question, actual, expected) {
    if (question.type === "checkboxes") {
      if (!Array.isArray(actual) || !Array.isArray(expected)) return false;
      const uniqueActual = stableUnique(actual);
      if (uniqueActual.length !== actual.length) return false;
      const left = uniqueActual.sort();
      const right = stableUnique(expected).sort();
      return left.length === right.length && left.every((value, index) => value === right[index]);
    }
    if (question.type === "order") {
      return Array.isArray(actual) && Array.isArray(expected)
        && actual.length === expected.length
        && actual.every((value, index) => value === expected[index]);
    }
    return typeof actual === "string" && actual === expected;
  }

  function validatePanel(beatId, panelIndex, answers) {
    const beat = getBeat(beatId);
    const panel = beat && beat.panels[panelIndex];
    if (!panel) return { ok: false, code: "UNKNOWN_PANEL", message: "该复核面板不存在。", errors: [] };
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return { ok: false, code: "MALFORMED_INPUT", message: "提交格式无法读取，请重新选择。", errors: [] };
    }
    const known = new Set(panel.questions.map((question) => question.id));
    const extra = Object.keys(answers).filter((key) => !known.has(key));
    if (extra.length) return { ok: false, code: "EXTRA_FIELDS", message: "提交包含本面板没有的字段，请清除后重试。", errors: extra };

    const branch = answers.branch === "A" || answers.branch === "B" ? answers.branch : null;
    const errors = [];
    for (const question of panel.questions) {
      const actual = answers[question.id];
      const expected = expectedFor(question, branch);
      if (typeof actual === "undefined" || actual === "" || (Array.isArray(actual) && actual.length === 0)) {
        errors.push({ id: question.id, code: "MISSING" });
      } else if (!answerEqual(question, actual, expected)) {
        errors.push({ id: question.id, code: "MISMATCH" });
      }
    }
    if (errors.length) {
      const first = panel.questions.find((question) => question.id === errors[0].id);
      const message = errors.length === 1 && errors[0].code === "MISSING"
        ? "还有一项没有填写：" + (first ? first.prompt : "当前字段") + "。"
        : errors.every((error) => error.code === "MISSING")
          ? "还有字段没有填写。请先完成本面板的可见核对项。"
          : "当前组合仍有字段不相合。请回到可见材料，按本面板的方法逐项核对。";
      return {
        ok: false,
        code: errors[0].code,
        message,
        errors,
      };
    }
    return { ok: true, code: "VALID", message: "核对项相合。", errors: [] };
  }

  function canonicalAnswers(beatId, panelIndex, branch) {
    const beat = getBeat(beatId);
    const panel = beat && beat.panels[panelIndex];
    if (!panel) return null;
    const selectedBranch = branch === "B" ? "B" : "A";
    return Object.fromEntries(panel.questions.map((question) => [question.id, expectedFor(question, selectedBranch)]));
  }

  function invalidAnswers(beatId, panelIndex) {
    const beat = getBeat(beatId);
    const panel = beat && beat.panels[panelIndex];
    return panel ? clone(panel.invalid) : null;
  }

  function panelKey(beatId, panelIndex) {
    return beatId + ":" + panelIndex;
  }

  function revealHint(state, beatId, panelIndex, options) {
    const normalized = normalizeState(state);
    const beat = getBeat(beatId);
    const panel = beat && beat.panels[panelIndex];
    if (!panel) return { ok: false, state: normalized, code: "UNKNOWN_PANEL", message: "该提示不存在。" };
    const key = panelKey(beatId, panelIndex);
    const current = Number(normalized.hints[key] || 0);
    if (current >= 4) return { ok: true, state: normalized, level: 4, already: true };
    const nextLevel = current + 1;
    const opts = options || {};
    if (nextLevel === 4 && opts.confirmDirect !== true) {
      return { ok: false, state: normalized, code: "DIRECT_CONFIRM_REQUIRED", message: "第4级会直接显示完整可执行答案；请再次确认。", pendingLevel: 4 };
    }
    normalized.hints[key] = nextLevel;
    if (nextLevel === 4) normalized.directHintConfirmations[key] = true;
    const logged = appendEvent(normalized, "HINT_REVEALED", { beatId, panelIndex, level: nextLevel }, opts.at);
    return { ok: true, state: logged, level: nextLevel, hint: clone(panel.hints[nextLevel - 1]) };
  }

  function completeBeat(next, beat, at) {
    if (!next.completedBeats.includes(beat.id)) next.completedBeats.push(beat.id);
    const reaction = REACTION_BY_BEAT.get(beat.id);
    let logged = appendEvent(next, "BEAT_COMPLETED", { beatId: beat.id }, at);
    if (reaction && !logged.reactionsPosted.includes(reaction.id) && !logged.reactionReadyQueue.includes(reaction.id)) {
      logged.reactionReadyQueue.push(reaction.id);
      logged = appendEvent(logged, "REACTION_READY", { reactionId: reaction.id, afterBeat: beat.id }, at);
    }
    const index = BEAT_IDS.indexOf(beat.id);
    logged.currentBeat = WORLD.beats[index + 1] ? WORLD.beats[index + 1].id : beat.id;
    return logged;
  }

  function publishNextReaction(state, options) {
    const opts = options || {};
    let next = normalizeState(state);
    if (next.unreadReaction) {
      return { ok: false, state: next, code: "UNREAD_REACTION", message: "上一条项目回执尚未读完。", reactionId: next.unreadReaction };
    }
    const reactionId = next.reactionReadyQueue[0];
    if (!reactionId) return { ok: true, state: next, published: false, message: "当前没有待发布的项目回执。" };
    next.reactionReadyQueue.shift();
    next.reactionsPosted.push(reactionId);
    next.unreadReaction = reactionId;
    next = appendEvent(next, "REACTION_POSTED", { reactionId }, opts.at);
    return { ok: true, state: next, published: true, reactionId, message: "项目内新回执已发布。" };
  }

  function submitPanel(state, beatId, panelIndex, answers, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const beat = getBeat(beatId);
    if (!beat) return { ok: false, state: next, code: "UNKNOWN_BEAT", message: "该复核步骤不存在。" };
    if (!next.sessionStarted) return { ok: false, state: next, code: "SESSION_REQUIRED", message: "请先建立本机复核会话。" };
    if (next.unreadReaction) return { ok: false, state: next, code: "REACTION_UNREAD", message: "请先回工作台读完项目新回执；公开网页仍可浏览。" };
    if (next.reactionReadyQueue.length) return { ok: false, state: next, code: "REACTION_RETURN_REQUIRED", message: "请先返回工作台取回项目新回执；公开网页仍可浏览。" };
    if (!canAccessBeat(next, beatId)) return { ok: false, state: next, code: "PREREQUISITE", message: "上一项派生产物尚未保存。公开材料仍可浏览。" };
    if (!beat.panels[panelIndex]) return { ok: false, state: next, code: "UNKNOWN_PANEL", message: "该复核面板不存在。" };
    const done = next.completedPanels[beatId] || [];
    if (done.includes(panelIndex)) return { ok: true, state: next, already: true, message: "该面板已经保存。" };
    if (panelIndex !== done.length) return { ok: false, state: next, code: "PANEL_ORDER", message: "请先保存当前面板；你可返回查看此前面板。" };

    const validation = validatePanel(beatId, panelIndex, answers);
    next = appendEvent(next, validation.ok ? "PANEL_VALID" : "PANEL_INVALID", {
      beatId,
      panelIndex,
      code: validation.code,
    }, opts.at);
    if (!validation.ok) {
      next.lastError = { beatId, panelIndex, code: validation.code, message: validation.message };
      return { ...validation, state: next };
    }

    next.lastError = null;
    next.completedPanels[beatId] = done.concat(panelIndex);
    const currentPanel = beat.panels[panelIndex];
    for (const output of currentPanel.outputs) {
      if (output !== "__ENDING__" && ALL_OUTPUT_IDS.has(output) && !next.derivedEvidence.includes(output)) next.derivedEvidence.push(output);
    }
    next = appendEvent(next, "PANEL_SAVED", { beatId, panelIndex, outputs: currentPanel.outputs.filter((id) => id !== "__ENDING__") }, opts.at);

    if (beatId === "B17" && panelIndex === 0) {
      const seenGeology = next.viewedPublicRoutes.includes("#/geology/record/BP-1998-0719");
      next.predictionIntegrity = seenGeology ? "seen_result" : "blind";
      next = appendEvent(next, "PREDICTION_INTEGRITY_RECORDED", {
        timezone: WORLD.worldTimezone,
        predictionIntegrity: next.predictionIntegrity,
      }, opts.at);
    }

    if (beatId === "B17" && currentPanel.outputs.includes("DER-THIRD-NIGHT-CALCULATION")) {
      next.conditionalMatchRecorded = true;
      next = appendEvent(next, "CONDITIONAL_MATCH_RECORDED", {
        status: "conditional_match",
        timezone: WORLD.worldTimezone,
        predictionIntegrity: next.predictionIntegrity,
      }, opts.at);
    }

    const isLastPanel = panelIndex === beat.panels.length - 1;
    if (beatId === "B18" && isLastPanel) {
      const branch = answers.branch;
      if (next.recommendedBranch && next.recommendedBranch !== branch) {
        return { ok: false, state: normalizeState(state), code: "BRANCH_LOCKED", message: "已有另一项建议进入机构回执队列。" };
      }
      next.recommendedBranch = branch;
      next = appendEvent(next, "BRANCH_RECOMMENDED", { recommendedBranch: branch, actor: "QC-447", authority: "advice_only" }, opts.at);
      return { ok: true, state: next, pending: "authorization", branch, message: "处置建议已记录，等待固定机构授权事件。" };
    }

    if (isLastPanel) next = completeBeat(next, beat, opts.at);
    return {
      ok: true,
      state: next,
      nextPanel: isLastPanel ? null : panelIndex + 1,
      nextBeat: isLastPanel ? next.currentBeat : beatId,
      message: isLastPanel ? "本项核对回单已保存。" : "本面板已保存，可进入下一面板。",
    };
  }

  function authorizeRecommended(state, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const b18 = getBeat("B18");
    const prerequisitesMet = next.completedBeats.length === 17
      && next.completedBeats.every((beatId, index) => beatId === BEAT_IDS[index])
      && (next.completedPanels.B18 || []).length === b18.panels.length;
    if (!prerequisitesMet) return { ok: false, state: next, code: "BRANCH_PREREQUISITES", message: "B18来源核对与建议前置尚未完整保存。" };
    if (!next.recommendedBranch) return { ok: false, state: next, code: "NO_RECOMMENDATION", message: "尚无可供机构处理的建议。" };
    if (next.authorizedBranch) return { ok: true, state: next, already: true, branch: next.authorizedBranch };
    if (next.recommendedBranch === "A" && WORLD.qaFacts.branchA !== "PROTOTYPE_ASSUMED_NOT_EXTERNALLY_REVIEWED") {
      return { ok: false, state: next, code: "A_PROTOTYPE_FIXTURE_MISSING", message: "A原型假定夹具未声明，不能授权。" };
    }
    next.authorizedBranch = next.recommendedBranch;
    next = appendEvent(next, "BRANCH_AUTHORIZED", {
      authorizedBranch: next.authorizedBranch,
      actor: "FIXED_IN_WORLD_INSTITUTIONS",
      prototypeAssumption: next.authorizedBranch === "A" ? WORLD.qaFacts.branchA : null,
    }, opts.at);
    return { ok: true, state: next, branch: next.authorizedBranch, pending: "execution", message: "固定机构已形成独立授权回执。" };
  }

  function executeAuthorized(state, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const b18 = getBeat("B18");
    const prerequisitesMet = next.completedBeats.length === 17
      && next.completedBeats.every((beatId, index) => beatId === BEAT_IDS[index])
      && (next.completedPanels.B18 || []).length === b18.panels.length;
    if (!prerequisitesMet) return { ok: false, state: next, code: "BRANCH_PREREQUISITES", message: "B18来源核对与建议前置尚未完整保存。" };
    if (!next.authorizedBranch) return { ok: false, state: next, code: "NO_AUTHORIZATION", message: "机构授权事件尚未形成。" };
    if (next.executionComplete) return { ok: true, state: next, already: true, branch: next.executedBranch };
    if (next.executedBranch && next.executedBranch !== next.authorizedBranch) {
      return { ok: false, state: next, code: "MUTUAL_EXCLUSION", message: "另一分支已经执行，当前分支永久拒绝。" };
    }
    next.executedBranch = next.authorizedBranch;
    next = appendEvent(next, "BRANCH_EXECUTED", {
      executedBranch: next.executedBranch,
      actor: "FIXED_IN_WORLD_STAFF",
      playerHandledOriginals: false,
    }, opts.at);
    next.executionComplete = true;
    next = appendEvent(next, "EXECUTION_COMPLETE", { executionComplete: true, branch: next.executedBranch }, opts.at);
    next.ending = "ENDING-" + next.executedBranch;
    next = appendEvent(next, "ENDING_MINTED", { ending: next.ending, afterExecutionComplete: true }, opts.at);
    const beat = getBeat("B18");
    next = completeBeat(next, beat, opts.at);
    next.currentBeat = "B18";
    return { ok: true, state: next, branch: next.executedBranch, ending: next.ending, message: "固定人员执行完毕，终局回执已铸成。" };
  }

  function markReactionRead(state, reactionId, at) {
    let next = normalizeState(state);
    if (!next.reactionsPosted.includes(reactionId)) return { ok: false, state: next, code: "REACTION_NOT_POSTED" };
    if (next.unreadReaction !== reactionId) return { ok: true, state: next, already: true };
    next.unreadReaction = null;
    next = appendEvent(next, "REACTION_READ", { reactionId }, at);
    return { ok: true, state: next };
  }

  function enterFalsePath(state, falseId, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const path = FALSE_BY_ID.get(falseId);
    if (!path) return { ok: false, state: next, code: "UNKNOWN_FALSE_PATH", message: "没有这条公开记录链。" };
    if (!next.sessionStarted) return { ok: false, state: next, code: "SESSION_REQUIRED", message: "请先建立复核会话。" };
    if (!next.falsePaths[falseId].entered) {
      next.falsePaths[falseId].entered = true;
      next = appendEvent(next, "FALSE_PATH_ENTERED", { falseId }, opts.at);
    }
    return { ok: true, state: next, path: clone(path) };
  }

  function advanceFalsePath(state, falseId, stepId, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const path = FALSE_BY_ID.get(falseId);
    if (!path) return { ok: false, state: next, code: "UNKNOWN_FALSE_PATH", message: "没有这条公开记录链。" };
    if (!next.sessionStarted) return { ok: false, state: next, code: "SESSION_REQUIRED", message: "请先建立复核会话。" };
    let branch = next.falsePaths[falseId];
    if (!branch.entered) branch.entered = true;
    const expected = path.steps[branch.stepsSeen.length];
    if (!expected) {
      return {
        ok: true,
        state: next,
        already: true,
        closed: branch.closed,
        needsConclusion: !branch.closed,
      };
    }
    if (stepId !== expected.id) return { ok: false, state: next, code: "FALSE_PATH_ORDER", message: "这条记录没有从当前页直接指向所选页面。" };
    branch.stepsSeen.push(stepId);
    next = appendEvent(next, "FALSE_PATH_STEP", { falseId, stepId, stepNumber: branch.stepsSeen.length }, opts.at);
    branch = next.falsePaths[falseId];
    return {
      ok: true,
      state: next,
      closed: false,
      needsConclusion: branch.stepsSeen.length === path.steps.length,
      nextStep: path.steps[branch.stepsSeen.length] || null,
    };
  }

  function submitFalsePathConclusion(state, falseId, answer, options) {
    const opts = options || {};
    let next = normalizeState(state);
    const path = FALSE_BY_ID.get(falseId);
    if (!path) return { ok: false, state: next, code: "UNKNOWN_FALSE_PATH", message: "没有这条公开记录链。" };
    const branch = next.falsePaths[falseId];
    if (branch.closed) return { ok: true, state: next, already: true, closed: true };
    if (branch.stepsSeen.length !== path.steps.length) {
      return { ok: false, state: next, code: "FALSE_PATH_SOURCES", message: "还有来源页面没有摘录。" };
    }
    if (answer !== path.correctConclusion) {
      next = appendEvent(next, "FALSE_PATH_CONCLUSION_INVALID", { falseId }, opts.at);
      return { ok: false, state: next, code: "FALSE_PATH_BOUNDARY", message: "这个结论超过了来源能排除的范围；先只关掉对得上的那一条。" };
    }
    branch.closed = true;
    branch.methodLearned = true;
    next.optionalConclusions = next.optionalConclusions.filter((item) => item.via !== falseId);
    next.optionalConclusions.push({ id: path.propositionId, status: "disproved", via: falseId });
    next = appendEvent(next, "FALSE_PATH_CLOSED", {
      falseId,
      propositionId: path.propositionId,
      status: "disproved",
      affectsMainProgress: false,
    }, opts.at);
    return { ok: true, state: next, closed: true, propositionId: path.propositionId, message: "有限排除已保存；主线前置没有改变。" };
  }

  function resolveRoute(hash) {
    const route = typeof hash === "string" && hash ? hash : "#/";
    if (RECORD_BY_ROUTE.has(route)) return { type: "record", route, record: RECORD_BY_ROUTE.get(route) };
    for (const rule of WORLD.routeManifest) {
      const match = route.match(rule.pattern);
      if (match) return { type: rule.type, route, match: match.slice(1) };
    }
    return { type: "not-found", route };
  }

  function markPublicViewed(state, route, options) {
    const opts = options || {};
    let next = normalizeState(state);
    if (!RECORD_BY_ROUTE.has(route)) return { ok: false, state: next, code: "UNKNOWN_PUBLIC_ROUTE" };
    if (!next.viewedPublicRoutes.includes(route)) {
      next.viewedPublicRoutes.push(route);
      next = appendEvent(next, "PUBLIC_RECORD_VIEWED", { route, recordId: RECORD_BY_ROUTE.get(route).id }, opts.at);
    }
    return { ok: true, state: next, record: clone(RECORD_BY_ROUTE.get(route)) };
  }

  function normalizeQuery(value) {
    return String(value == null ? "" : value)
      .normalize("NFKC")
      .trim()
      .toLocaleLowerCase("zh-CN")
      .replace(/[\s\-—_/:：，。,.]+/g, " ")
      .replace(/^\s+|\s+$/g, "");
  }

  function classifyHanWord(value) {
    const raw = String(value == null ? "" : value).trim();
    if (!raw) {
      return { ok: false, kind: "empty", query: "", msg: "请输入一个汉字词。" };
    }
    if (/[\s\u3000]/.test(raw)) {
      return { ok: false, kind: "multi", query: raw, msg: "一次只搜一个词。" };
    }
    if (!/^[\u4e00-\u9fff]+$/.test(raw)) {
      return { ok: false, kind: "invalid", query: raw, msg: "请用已打开页上的汉字词。英文或符号检不到条目。" };
    }
    return { ok: true, kind: "ok", query: raw, msg: "" };
  }

  function searchRecords(siteId, query) {
    const site = WORLD.sites.find((item) => item.id === siteId && item.id !== "workbench");
    if (!site) return { ok: false, siteId, query: String(query || ""), kind: "invalid", count: 0, results: [], message: "没有这个站点。" };
    const checked = classifyHanWord(query);
    const ordinary = WORLD.records.filter((record) => record.siteId === siteId && record.kind === "ordinary");
    if (checked.kind === "empty") {
      return { ok: true, siteId, query: "", kind: "empty", count: ordinary.length, results: clone(ordinary), message: checked.msg };
    }
    if (!checked.ok) {
      return { ok: true, siteId, query: checked.query, kind: checked.kind, count: 0, results: [], message: checked.msg };
    }
    const q = checked.query;
    const ids = [];
    let forbidden = false;
    (WORLD.searchKeywords || []).forEach((row) => {
      if (!row.queries.includes(q)) return;
      if (row.siteId !== "*" && row.siteId !== siteId) return;
      if (row.forbidden) forbidden = true;
      (row.opens || []).forEach((id) => { if (!ids.includes(id)) ids.push(id); });
    });
    const results = WORLD.records.filter((record) => ids.includes(record.id));
    if (forbidden) {
      return { ok: true, siteId, query: q, kind: "forbidden", count: results.length, results: clone(results), message: "此文件已被禁止访问。" };
    }
    if (!results.length) {
      return { ok: true, siteId, query: q, kind: "miss", count: 0, results: [], message: "抱歉，没有找到与“" + q + "”相关的结果。换一个已读页上的词试试。" };
    }
    return { ok: true, siteId, query: q, kind: "hit", count: results.length, results: clone(results), message: "共有 " + results.length + " 项符合条件的结果。" };
  }

  function publicRecordText(route) {
    const record = RECORD_BY_ROUTE.get(route);
    if (!record) return null;
    return [record.id, record.siteId, record.route, record.date, record.title, record.meta, record.summary]
      .concat(record.body)
      .concat(Object.entries(record.fields).map(([key, value]) => key + "=" + value))
      .join("\n");
  }

  function resetState(state, options) {
    const opts = options || {};
    const old = normalizeState(state);
    let next = createInitialState({ sessionId: old.sessionId, at: opts.at });
    next = appendEvent(next, "SESSION_RESET", { removedEnding: old.ending, removedEvents: old.eventLog.length }, opts.at);
    return { ok: true, state: next };
  }

  function progressSummary(state) {
    const next = normalizeState(state);
    const panelCount = WORLD.beats.reduce((sum, beat) => sum + beat.panels.length, 0);
    const completedPanelCount = Object.values(next.completedPanels).reduce((sum, values) => sum + values.length, 0);
    return {
      beats: { completed: next.completedBeats.length, total: WORLD.beats.length },
      panels: { completed: completedPanelCount, total: panelCount },
      outputs: { completed: next.derivedEvidence.length, total: WORLD.outcomeSlots.filter((slot) => !slot.some((id) => id.startsWith("ENDING-"))).length },
      outcomeSlots: { completed: next.derivedEvidence.length + (next.ending ? 1 : 0), total: WORLD.outcomeSlots.length },
      falsePathsClosed: WORLD.falsePaths.filter((path) => next.falsePaths[path.id].closed).length,
      ending: next.ending,
      currentBeat: next.currentBeat,
    };
  }

  return Object.freeze({
    SCHEMA_VERSION,
    WORLD,
    createInitialState,
    normalizeState,
    startSession,
    appendEvent,
    getBeat,
    getCurrentBeat,
    canAccessBeat,
    validatePanel,
    canonicalAnswers,
    invalidAnswers,
    revealHint,
    submitPanel,
    publishNextReaction,
    authorizeRecommended,
    executeAuthorized,
    markReactionRead,
    enterFalsePath,
    advanceFalsePath,
    submitFalsePathConclusion,
    resolveRoute,
    markPublicViewed,
    normalizeQuery,
    classifyHanWord,
    searchRecords,
    publicRecordText,
    resetState,
    progressSummary,
  });
});