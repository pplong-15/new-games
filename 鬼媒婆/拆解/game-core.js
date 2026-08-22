(function attachGameCore(root, factory) {
  const core = factory();
  if (typeof module === "object" && module.exports) module.exports = core;
  if (root) root.GameCore = core;
})(typeof window !== "undefined" ? window : globalThis, function createGameCore() {
  "use strict";

  const ORIGINAL_URL = "https://www.helishu.example/ziliao/chengwei.html";
  const SAVED_URL = "https://www.helishu.example/go/chengwei";
  const PERSON_URL = "https://www.helishu.example/ren/xiaoling.html";
  const RUMOR_URL = "http://bbs.nanqiao.example/thread/3914.html";
  const ANSWER_CODE = "HLS-170418-06";
  const VISITOR_ID = "V-7C2F";
  const ITEM_ID = "P-3D61";
  const WITHDRAWN_CODE = "HLS-170418-07";
  const COMPLETE_QUOTE = "Write each relationship the way your family normally refers to it. If you are not sure, leave it blank and fill it in once you have checked. Do not force an answer just to make the list look complete.";
  const FATHER_NAME = "Chen Yuan";
  const WOMAN_NAME = "He Ling";
  const WOMAN_NICKNAME = "Xiao Ling";
  const EDITOR_REAL_NAME = "Zhao Ling";
  const FOLKLORE_ROUTE = "/chengnanli/customs/guren-heli-2009";
  const FOLKLORE_NOTE_ROUTE = "/chengnanli/customs/guren-heli-2009/reader-note";
  const FOLKLORE_CAPTURE_ROUTE = "/archive/customs/guren-heli-2009";
  const STATUS_RULE_ROUTE = "/records/rules/status-generation-v2-1";
  const STATUS_SAMPLES_ROUTE = "/records/status-samples/2017-04";
  const SEDAN_ROUTE = "/nanqiao2/topic/4821";
  const CLEANUP_ROUTE = "/records/notices/2017-04-19-cleaning";
  const RITUAL_CAPTURE_ROUTE = "/snapshot/heqi-20170419";
  const CHEN_OBITUARY_ROUTE = "/oldnews/notices/20170427-03";
  const RITUAL_ID = "GH-170419-01";
  const RITUAL_BODY_CANONICAL = [
    RITUAL_ID,
    `来源答疑=${WITHDRAWN_CODE}`,
    `访客校验号=${VISITOR_ID}`,
    "分类=故人合礼",
    "故人姓名=何*",
    "对外称谓=表*",
    "关系核验=待补",
    "生者代签=陈*",
    "生成程序=generator v2.1",
    "线下复核员=",
    "人工越权=",
    "合礼状态=契成",
  ].join("\n");
  const RITUAL_BODY_SHA256 = "6cd102a3bb1cfb4bbc1e3ab9ceaef06bf9b79c4819f4a6bf86bace806b65a843";

  const QUOTE_CHOICES = [
    COMPLETE_QUOTE,
    "Use the form of address your family normally uses. If you are uncertain, leave it blank for now and add it after everyone has been asked.",
    "Leave uncertain entries blank and fill them in after checking; forms of address for both families should be standardised according to the rites guide wherever possible.",
  ];

  const SIDE_TRAIL = Object.freeze({
    handout: Object.freeze({
      routes: Object.freeze([
        "/files/community-handbook-2016",
        "/catalog/item/SQ-JY-2016-04",
        "/catalog/item/SQ-JY-2016-04/source",
      ]),
      title: "Community Rites Handout (Session Four)",
      fileName: "community_rites_handout_2016.pdf",
      catalogueId: "SQ-JY-2016-04",
      similarQuote: "If a form of address is uncertain, leave it blank in the draft and add it once everyone has been asked.",
      creditedName: "Lin Che",
      eventDate: "2016-04-09",
      sourceCarrier: "Live recording DT-20160409-02",
    }),
  });

  const FORUM_SOURCE_RULE = Object.freeze({
    contentRoot: "20170418",
    migration: "20170903",
  });

  const PERSON_CAPTURES = Object.freeze([
    { key: "20150302", date: "2015-03-02", time: "09:18:44", status: 404, size: "1.0 KB", title: "Page not found", readable: false, note: "The page had not yet been created" },
    { key: "20160822", date: "2016-08-22", time: "10:06:31", status: 200, size: "6.8 KB", title: "Archive volunteer: Xiao Ling", readable: true },
    { key: "20170111", date: "2017-01-11", time: "19:42:08", status: 200, size: "7.3 KB", title: "Archive volunteer: Xiao Ling", readable: true },
    { key: "20170703", date: "2017-07-03", time: "09:16:09", status: 410, size: "1.2 KB", title: "Page no longer available", readable: false, note: "Profile merged into the central volunteer directory; no replayable body retained" },
  ]);

  const RUMOR_CAPTURES = Object.freeze([
    { key: "20040916", date: "2004-09-16", time: "22:51:03", status: 404, size: "0.9 KB", title: "Thread not found", readable: false, note: "The thread had not yet been created" },
    { key: "20040917a", date: "2004-09-17", time: "01:18:42", status: 200, size: "9.4 KB", title: "Please help me find Xiao Ling; her sister is waiting for news", readable: true, phase: "initial" },
    { key: "20040917b", date: "2004-09-17", time: "10:46:20", status: 200, size: "10.1 KB", title: "Please help me find Xiao Ling; her sister is waiting for news (contact made)", readable: true, phase: "resolved" },
    { key: "20040918", date: "2004-09-18", time: "08:11:27", status: 304, size: "No body", title: "Not modified", readable: false, note: "Response headers only" },
    { key: "20050302", date: "2005-03-02", time: "13:22:51", status: 200, size: "10.1 KB", title: "Please help me find Xiao Ling; her sister is waiting for news (contact made)", readable: true, phase: "resolved", duplicateOf: "20040917b" },
    { key: "20060503", date: "2006-05-03", time: "15:07:54", status: 200, size: "10.1 KB", title: "Please help me find Xiao Ling; her sister is waiting for news (contact made)", readable: true, phase: "resolved", duplicateOf: "20040917b" },
    { key: "20080314", date: "2008-03-14", time: "04:39:18", status: 206, size: "4.7 KB", title: "Nanqiao Life Forum", readable: false, note: "Only the header and style sheet were retained; the thread body is missing" },
    { key: "20100627", date: "2010-06-27", time: "11:08:04", status: 302, size: "No body", title: "Moved to read-only area", readable: false, note: "Location: /archive/thread/3914" },
    { key: "20121119", date: "2012-11-19", time: "22:04:16", status: 403, size: "0.8 KB", title: "Access denied", readable: false, note: "Capture blocked by robots rules" },
    { key: "20140806", date: "2014-08-06", time: "07:51:29", status: 502, size: "0.6 KB", title: "Upstream connection failed", readable: false, note: "Gateway error page" },
    { key: "20160321", date: "2016-03-21", time: "16:44:32", status: 301, size: "No body", title: "Forum archive migration", readable: false, note: "Location: /read-only/thread/3914" },
    { key: "20180206", date: "2018-02-06", time: "09:32:48", status: 410, size: "1.3 KB", title: "Thread no longer available", readable: false, note: "The closed forum returned 410" },
  ]);

  const CAPTURES = Object.freeze([
    { key: "20151107", date: "2015-11-07", time: "14:02:19", status: 404, mime: "text/html", size: "1.1 KB", title: "Page not found", readable: false, note: "Origin returned 404" },
    { key: "20160821", date: "2016-08-21", time: "09:14:22", status: 200, mime: "text/html", size: "12.4 KB", title: "How to write forms of address for two families (trial notes)", readable: true },
    { key: "20160910", date: "2016-09-10", time: "08:42:07", status: 304, mime: "—", size: "No body", title: "Not modified", readable: false, note: "Response headers only" },
    { key: "20161130", date: "2016-11-30", time: "22:18:41", status: 502, mime: "text/html", size: "0.7 KB", title: "Upstream connection failed", readable: false, note: "Gateway error page" },
    { key: "20170112", date: "2017-01-12", time: "16:08:51", status: 200, mime: "text/html", size: "15.1 KB", title: "How to write forms of address for two families (winter revision)", readable: true },
    { key: "20170113", date: "2017-01-13", time: "09:05:33", status: 304, mime: "—", size: "No body", title: "Not modified", readable: false, note: "Same response as previous capture" },
    { key: "20170206", date: "2017-02-06", time: "12:31:09", status: 206, mime: "text/html", size: "9.8 KB", title: "How to write forms of address for two families", readable: false, note: "Incomplete body; style resources missing" },
    { key: "20170328", date: "2017-03-28", time: "18:44:02", status: 200, mime: "text/html", size: "16.9 KB", title: "How to write forms of address for two families (spring revision)", readable: true },
    { key: "20170418", date: "2017-04-18", time: "20:31:14", status: 200, mime: "text/html", size: "18.6 KB", title: "How to write forms of address for two families (spring addendum)", readable: true },
    { key: "20170419", date: "2017-04-19", time: "07:16:54", status: 503, mime: "text/html", size: "1.3 KB", title: "System maintenance", readable: false, note: "Origin maintenance page" },
    { key: "20170507", date: "2017-05-07", time: "11:05:27", status: 200, mime: "text/html", size: "18.6 KB", title: "How to write forms of address for two families (spring addendum)", readable: true, duplicateOf: "20170418" },
    { key: "20170602", date: "2017-06-02", time: "14:22:18", status: 403, mime: "text/html", size: "0.9 KB", title: "Access denied", readable: false, note: "Capture blocked by robots rules" },
    { key: "20170829", date: "2017-08-29", time: "23:58:46", status: 302, mime: "—", size: "No body", title: "Redirect to migration notice", readable: false, note: "Location: /notice/move.html" },
    { key: "20170903", date: "2017-09-03", time: "09:42:18", status: 200, mime: "text/html", size: "4.2 KB", title: "Migration notice for the forms-of-address section", readable: true },
    { key: "20170904", date: "2017-09-04", time: "10:12:03", status: 410, mime: "text/html", size: "1.9 KB", title: "Page no longer available", readable: false, note: "Origin returned 410" },
  ]);

  const RECENT_ANSWERS = Object.freeze([
    { code: "HLS-170421-03", name: "Mr Chen", visitor: "V-91AD", subject: "How to label an elder female cousin's husband in a group-photo caption", state: "Answered" },
    { code: "HLS-170421-01", name: "Evening Bound", visitor: "V-2C10", subject: "Order of names on a memorial-book flyleaf", state: "Answered" },
    { code: "HLS-170420-09", name: "Old House in South Lane", visitor: "V-44E8", subject: "Page order and senior relatives in a memorial booklet", state: "Answered" },
    { code: "HLS-170420-04", name: "Old Zhou", visitor: "V-02B7", subject: "Forms of address on the main family-banquet table", state: "Corrected" },
    { code: "HLS-170419-07", name: "A-Man", visitor: "V-630C", subject: "Ordering both families' grandparents on one page", state: "Answered" },
    { code: "HLS-170419-02", name: "Ms Lin", visitor: "V-A308", subject: "Two household terms for a maternal-side cousin", state: "Answered" },
    { code: "HLS-170418-12", name: "Kapok", visitor: "V-B018", subject: "Keeping old-form characters on a gift list", state: "Answered" },
    { code: "HLS-170418-10", name: "Ms Zhao", visitor: "V-0D71", subject: "Local differences in terms for in-laws", state: "Answered" },
    { code: "HLS-170418-09", name: "Mr Chen", visitor: "V-77C0", subject: "Forms of address on banquet place cards", state: "Answered" },
    { code: "HLS-170418-08", name: "Hillside Guest", visitor: "V-30F5", subject: "Signature order on wedding invitations", state: "Answered" },
  ]);

  const OLD_ANSWERS = Object.freeze([
    Object.freeze({ code: "HLS-170418-01", name: "Ms Lin", subject: "Term for a niece's husband", publicAt: "2017-04-18 08:12" }),
    Object.freeze({ code: "HLS-170418-02", name: "A-Man", subject: "Ordering both families' grandparents", publicAt: "2017-04-18 08:37" }),
    Object.freeze({ code: "HLS-170418-04", name: "Mr Shao", subject: "How to write a step-relative's title", publicAt: "2017-04-18 09:14" }),
    Object.freeze({ code: "HLS-170418-05", name: "A-Mu", subject: "Caption for maternal grandparents' group photo", publicAt: "2017-04-18 13:02" }),
    Object.freeze({ code: ANSWER_CODE, name: "Mr Chen", subject: "Forms-of-address draft from an earlier case", publicAt: "2017-04-18 20:31" }),
    Object.freeze({ code: "HLS-170418-08", name: "Hillside Guest", subject: "Signature order on wedding invitations", publicAt: "2017-04-18 17:13" }),
    Object.freeze({ code: "HLS-170418-09", name: "Mr Chen", subject: "Forms of address on banquet place cards", publicAt: "2017-04-18 16:56" }),
    Object.freeze({ code: "HLS-170418-10", name: "Ms Zhao", subject: "Local differences in terms for in-laws", publicAt: "2017-04-18 18:04" }),
    Object.freeze({ code: "HLS-170417-11", name: "Blue Tile", subject: "Footnotes in a memorial booklet", publicAt: "2017-04-17 19:21" }),
    Object.freeze({ code: "HLS-170417-14", name: "Mr Shen", subject: "Forms of address for in-laws", publicAt: "2017-04-17 22:56" }),
    Object.freeze({ code: "HLS-170416-03", name: "Kapok", subject: "Characters used on a gift list", publicAt: "2017-04-16 10:42" }),
    Object.freeze({ code: "HLS-170416-08", name: "Old House in South Lane", subject: "Ordering relatives by marriage in a group photo", publicAt: "2017-04-16 16:18" }),
  ]);

  const INDEX_TIMELINE = Object.freeze([
    Object.freeze({ code: "HLS-170418-04", created: "2017-04-18 08:57", publicAt: "2017-04-18 09:14", state: "Public", action: "Archived" }),
    Object.freeze({ code: "HLS-170418-05", created: "2017-04-18 12:41", publicAt: "2017-04-18 13:02", state: "Public", action: "Archived" }),
    Object.freeze({ code: ANSWER_CODE, created: "2017-04-18 16:38", publicAt: "2017-04-18 20:31", state: "Public", action: "Archived" }),
    Object.freeze({ code: WITHDRAWN_CODE, created: "2017-04-18 16:45", publicAt: "—", state: "Hidden", action: "Category: rites for the deceased; submitted at 23:46; moved offline at 00:12" }),
    Object.freeze({ code: "HLS-170418-08", created: "2017-04-18 16:53", publicAt: "2017-04-18 17:13", state: "Public", action: "Archived" }),
  ]);

  const FALSE_CASES = Object.freeze({
    sameName: Object.freeze({
      answer: Object.freeze({
        code: "HLS-170418-09",
        name: "Mr Chen",
        visitor: "V-77C0",
        item: "P-6B14",
        time: "2017-04-18 16:56",
        subject: "Forms of address on family-banquet place cards",
        question: "Relatives from both families will share a table. Should the place cards use the names my side uses, or the names my spouse's side uses?",
        reply: "Use the everyday form of address understood by the guests reading each card. It is fine for the two tables to use different terms; do not change a relationship merely to make every card match.",
        handler: "Zhou Lan",
      }),
      status: Object.freeze({
        code: "P-6B14",
        category: "Family-banquet place-card text review",
        registered: "2017-04-16",
        closed: "2017-04-18",
        state: "Archived",
        steps: Object.freeze([
          Object.freeze(["2017-04-16 09:18", "On-site registration", "Opened a place-card text case; no paper copy was collected", "Old Zhou"]),
          Object.freeze(["2017-04-17 16:30", "Layout confirmation", "Confirmed by phone that each table would use its customary forms of address", "Old Zhou"]),
          Object.freeze(["2017-04-18 16:56", "Public Q&A", "Kept the question anonymous at the visitor's request", "Zhou Lan"]),
          Object.freeze(["2017-04-18 16:59", "Case closed", "Digital layout delivered", "Zhou Lan"]),
        ]),
      }),
      visits: Object.freeze([
        Object.freeze({ datetime: "2017-04-16 09:18", purpose: "Place-card consultation", item: "P-6B14", source: "On-site ticket", result: "Accepted", handler: "Old Zhou" }),
        Object.freeze({ datetime: "2017-04-17 16:30", purpose: "Layout confirmation", item: "P-6B14", source: "Phone registration", result: "Answered", handler: "Old Zhou" }),
        Object.freeze({ datetime: "2017-04-18 16:59", purpose: "Digital layout delivery", item: "P-6B14", source: "Desk registration", result: "Completed", handler: "Zhou Lan" }),
      ]),
    }),
    separateItem: Object.freeze({
      status: Object.freeze({
        code: "P-8E20",
        category: "Family-banquet place-card forms of address",
        registered: "2017-03-14",
        closed: "2017-03-16",
        state: "Archived",
        steps: Object.freeze([
          Object.freeze(["2017-03-14 11:25", "On-site registration", "Registered place-card wording and arranged to review the layout the next day", "Zhou Lan"]),
          Object.freeze(["2017-03-15 14:20", "Layout confirmation", "Confirmed that main-table cards would use everyday forms of address", "Zhou Lan"]),
          Object.freeze(["2017-03-16 16:42", "Case closed", "Digital layout delivered; no paper copy retained", "Zhou Lan"]),
        ]),
      }),
    }),
    mergedIndex: Object.freeze({
      code: "HLS-170418-03",
      keptCode: "HLS-170417-14",
      name: "Mr Shen",
      visitor: "V-5E08",
      created: "2017-04-18 08:41",
      originalTime: "2017-04-17 22:48",
      subject: "Term for one's child's in-laws",
      question: "When sending an invitation to my child's in-laws, should I open with the form of address we normally use?",
      reply: "If your families already use a settled form of address, keep using it. State the invitation clearly in the body; there is no need to invent a different title.",
    }),
  });

  const VISIT_ROWS = Object.freeze([
    { datetime: "2016-11-18 15:10", purpose: "Initial consultation", item: "P-1A70", source: "Desk registration", result: "Attended", handler: "Lin Cheng", conflict: false },
    { datetime: "2016-12-03 10:05", purpose: "Additional materials", item: "P-1A70", source: "Web appointment", result: "Completed", handler: "Lin Cheng", conflict: false },
    { datetime: "2017-01-19 14:40", purpose: "New-case consultation", item: "P-8B12", source: "On-site ticket", result: "Attended", handler: "Zhou Lan", conflict: false },
    { datetime: "2017-02-02 14:16", purpose: "Case registration", item: ITEM_ID, source: "Web appointment", result: "Accepted", handler: "Xiao Ling", conflict: false },
    { datetime: "2017-02-06 16:30", purpose: "Draft review", item: ITEM_ID, source: "Web appointment", result: "Completed", handler: "Xiao Ling", conflict: false },
    { datetime: "2017-02-09 18:40", purpose: "Closure confirmation", item: ITEM_ID, source: "Staff back-entry", result: "Completed", handler: "Xiao Ling", conflict: false },
    { datetime: "2017-02-11 10:20", purpose: "Material pickup", item: ITEM_ID, source: "Web appointment", result: "Completed", handler: "Xiao Ling", conflict: false, allowedPickup: true },
    { datetime: "2017-02-23 17:35", purpose: "Forms-of-address draft note", item: ITEM_ID, source: "Staff back-entry", result: "Attended", handler: "Xiao Ling", conflict: true },
    { datetime: "2017-03-06 18:10", purpose: "Relationship-list review", item: ITEM_ID, source: "Staff back-entry", result: "Attended", handler: "Xiao Ling", conflict: true },
    { datetime: "2017-03-14 11:25", purpose: "New-case consultation", item: "P-8E20", source: "On-site ticket", result: "Attended", handler: "Zhou Lan", conflict: false },
    { datetime: "2017-03-20 18:25", purpose: "Old-draft recheck", item: ITEM_ID, source: "Staff back-entry", result: "Attended", handler: "Xiao Ling", conflict: true },
    { datetime: "2017-04-02 09:50", purpose: "General consultation", item: "—", source: "Phone registration", result: "Answered", handler: "Lin Cheng", conflict: false },
  ]);

  const PERSON_IDENTITIES = Object.freeze([
    Object.freeze({ key: "he-ling", latin: "He Ling", hanzi: "\u4f55\u73b2", distinguishingField: "Chengnan garment worker; later a West Market dressmaker", aliases: Object.freeze(["he ling", "he-ling", "xiao ling", "xiaoling", "\u5c0f\u73b2", "\u4f55\u73b2"]) }),
    Object.freeze({ key: "zhao-ling", latin: "Zhao Ling", hanzi: "\u8d75\u7075", distinguishingField: "Reference volunteer ZY-014; display name Xiao Ling", aliases: Object.freeze(["zhao ling", "zhao-ling", "xiao ling", "xiaoling", "\u5c0f\u7075", "\u8d75\u7075"]) }),
    Object.freeze({ key: "lin-xiaoling", latin: "Lin Xiaoling", hanzi: "\u6797\u6653\u73b2", distinguishingField: "Age 52; Dongjiang County river report", aliases: Object.freeze(["lin xiaoling", "lin-xiaoling", "linxiaoling", "xiao ling", "xiaoling", "\u6653\u73b2", "\u6797\u6653\u73b2"]) }),
  ]);

  const AUDIT_EXPECTED_DATES = Object.freeze(
    VISIT_ROWS.filter((row) => row.conflict).map((row) => row.datetime.slice(0, 10))
  );
  const AUDIT_EXPECTED_CLAUSES = Object.freeze(["12", "13", "16"]);

  const LEGACY_CLAIMS = Object.freeze({
    marriedDeception: Object.freeze({ status: "verified", sources: Object.freeze(["2004-forum-resolved", "2024-family-statement"]) }),
    contactAfterRefusal: Object.freeze({ status: "verified", sources: Object.freeze(["2004-forum-resolved", "2024-family-statement"]) }),
    sexualAssault: Object.freeze({ status: "unverified", sources: Object.freeze(["2021-forwarded-collage", "2021-comments"]) }),
    suicide: Object.freeze({ status: "unverified", sources: Object.freeze(["2021-forwarded-collage", "2021-comments"]) }),
    assaultCausedDeath: Object.freeze({ status: "unverified", sources: Object.freeze(["2021-comments"]) }),
    deathIn2016: Object.freeze({ status: "verified", sources: Object.freeze(["2016-obituary"]) }),
    deathCause: Object.freeze({ status: "unknown", sources: Object.freeze([]) }),
    cousinLabelMotive: Object.freeze({ status: "unknown", sources: Object.freeze([]) }),
  });

  function normalize(value) {
    return String(value || "").normalize("NFKC").replace(/[\u2018\u2019]/g, "'").replace(/[\u201c\u201d]/g, '"').replace(/\s+/g, "").trim();
  }

  function foldLatin(value) {
    return String(value || "")
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\u2018\u2019]/g, "'")
      .replace(/[\u201c\u201d]/g, '"')
      .toLowerCase()
      .replace(/[^a-z0-9\u3400-\u9fff]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function normalizeDateText(value) {
    return String(value || "")
      .replace(/2017\u5e740?4\u670818\u65e5/g, "2017-04-18")
      .replace(/2017[/.]0?4[/.]18/g, "2017-04-18")
      .replace(/(?:April|Apr)\s+18(?:th)?[,]?\s+2017/gi, "2017-04-18")
      .replace(/18(?:th)?\s+(?:April|Apr)[,]?\s+2017/gi, "2017-04-18");
  }

  function matchesCompleteQuote(value) {
    const folded = foldLatin(value);
    if (!folded) return false;
    if (folded.includes(foldLatin(COMPLETE_QUOTE))) return true;
    return [
      /(?:relationship|form(?:s)? of address|family (?:calls|refers))/,
      /(?:not sure|unsure|uncertain|cannot tell|can t tell)/,
      /(?:leave|keep)(?: it)? (?:blank|empty)/,
      /(?:check|ask|confirm|find out)/,
      /(?:(?:do not|don t|never).{0,32}(?:force|complete)|(?:not|without).{0,24}(?:just|merely).{0,24}complete)/,
    ].every((pattern) => pattern.test(folded));
  }

  function matchesEditor(value) {
    const folded = foldLatin(value);
    return /(?:^|\s)xiao\s*ling(?:\s|$)/.test(folded) || String(value || "").includes("\u5c0f\u7075");
  }

  function searchPersonIdentities(value) {
    const query = foldLatin(value).replace(/\s+/g, " ");
    if (!query) return [];
    const compact = query.replace(/\s+/g, "");
    return PERSON_IDENTITIES.filter((person) => person.aliases.some((alias) => {
      const foldedAlias = foldLatin(alias);
      return query === foldedAlias || compact === foldedAlias.replace(/\s+/g, "");
    }));
  }

  function validateForumReply(text) {
    const clean = normalizeDateText(text);
    const errors = [];
    if (!matchesCompleteQuote(clean)) errors.push("quote");
    if (!matchesEditor(clean)) errors.push("editor");
    if (!normalizeDateText(clean).includes("2017-04-18")) errors.push("date");
    return { ok: errors.length === 0, errors };
  }

  function validateForumEvidence(evidence = {}) {
    const errors = [];
    if (!matchesCompleteQuote(evidence.quote)) errors.push("quote");
    if (!matchesEditor(evidence.editor)) errors.push("editor");
    if (!normalizeDateText(evidence.date).includes("2017-04-18")) errors.push("date");
    return { ok: errors.length === 0, errors };
  }

  function hasForumSourceEvidence(viewedKeys) {
    const viewed = new Set(Array.isArray(viewedKeys) ? viewedKeys.map(String) : []);
    return CAPTURES.some((capture) =>
      capture.readable
      && viewed.has(capture.key)
      && (capture.key === FORUM_SOURCE_RULE.contentRoot || capture.duplicateOf === FORUM_SOURCE_RULE.contentRoot)
    );
  }

  function hasMigrationEvidence(viewedKeys) {
    const viewed = new Set(Array.isArray(viewedKeys) ? viewedKeys.map(String) : []);
    return viewed.has(FORUM_SOURCE_RULE.migration);
  }

  function validateArchiveURL(value) {
    const clean = String(value || "").trim();
    if (!clean) return { ok: false, reason: "empty" };
    if (clean === SAVED_URL || clean.includes("/go/chengwei")) return { ok: false, reason: "redirect" };
    if (clean === ORIGINAL_URL) return { ok: true, reason: "found", kind: "article" };
    if (clean === PERSON_URL) return { ok: true, reason: "found", kind: "person" };
    if (clean === RUMOR_URL) return { ok: true, reason: "found", kind: "rumor" };
    return { ok: false, reason: "not-found" };
  }

  function validateCode(value, expected) {
    return String(value || "").trim().toUpperCase() === expected;
  }

  function sameSet(values, expected) {
    const clean = [...new Set((Array.isArray(values) ? values : []).map(String))].sort();
    return clean.length === expected.length && clean.every((value, index) => value === [...expected].sort()[index]);
  }

  function validateAudit(payload) {
    const visitor = String(payload.visitor || "").trim().toUpperCase();
    const item = String(payload.item || "").trim().toUpperCase();
    const selectedDates = [...new Set(Array.isArray(payload.dates) ? payload.dates.map(String) : [])].sort();
    const selectedClauses = [...new Set(Array.isArray(payload.clauses) ? payload.clauses.map(String) : [])].sort();
    const errors = [];
    if (visitor !== VISITOR_ID) errors.push("visitor");
    if (item !== ITEM_ID) errors.push("item");
    if (selectedDates.includes("2017-02-11")) errors.push("allowed-pickup");
    if (selectedDates.some((date) => !AUDIT_EXPECTED_DATES.includes(date) && date !== "2017-02-11")) errors.push("allowed-visit");
    if (!sameSet(selectedDates, AUDIT_EXPECTED_DATES)) errors.push("dates");
    if (!["old-item-reused", "status-mismatch"].includes(String(payload.issue || ""))) errors.push("issue");
    if (!selectedClauses.includes("12") || !selectedClauses.includes("13")) errors.push("clauses");
    const note = String(payload.note || "").trim();
    if (note.length < 8) errors.push("note");
    const warnings = selectedClauses.some((clause) => !["12", "13", "14", "16"].includes(clause)) ? ["weak-clauses"] : [];
    return { ok: errors.length === 0, errors: [...new Set(errors)], warnings };
  }

  function validateAnswerReport(text) {
    const clean = String(text || "").trim();
    const errors = [];
    const groups = [/(?:\b06\b|HLS-?170418-?06|Q\s*&\s*A|answer(?:\s+record)?)/i, /(?:\bvisitor\b|V-?7C2F)/i, /(?:\bcase\b|\bitem\b|\brecord\b|P-?3D61)/i, /(?:biaomei|younger female cousin|relationship list|pickup (?:slip|receipt)|February|April)/i];
    if (clean.length < 24) errors.push("length");
    if (groups.filter((pattern) => pattern.test(clean)).length < 2) errors.push("relevance");
    return { ok: errors.length === 0, errors };
  }

  function validateRumorReport(text) {
    const clean = String(text || "").trim();
    const errors = [];
    const groups = [/(?:Chen Yuan|He Ling|Xiao Ling)/i, /(?:2021|collage|repost|forwarded|old thread|screenshot|cropped image)/i, /(?:coerc|sexual assault|nonconsensual|against her will|suicid|river|death|died|obituary)/i, /(?:source|original post|obituary|newspaper|forum|commenter|rumou?r|unverified|not confirmed)/i];
    if (clean.length < 32) errors.push("length");
    if (groups.filter((pattern) => pattern.test(clean)).length < 2) errors.push("relevance");
    return { ok: errors.length === 0, errors };
  }

  function validateFinalReply(text) {
    const clean = String(text || "").trim();
    const errors = [];
    if (clean.length < 24) errors.push("length");
    if (new Set(clean.replace(/\s/g, "")).size < 8) errors.push("repetition");
    return { ok: errors.length === 0, errors };
  }

  // v10 runtime contract. The browser-safe projection is embedded so file:// play never
  // needs fetch(). Public evidence remains identical in fresh and completed sessions.
  const SCHEMA_VERSION = 11;
  const STORAGE_KEY = "ghost-matchmaker-en-v10-1-midnight-seven-state";

  function deepFreeze(value, seen = new Set()) {
    if (!value || typeof value !== "object" || seen.has(value)) return value;
    seen.add(value);
    for (const key of Reflect.ownKeys(value)) deepFreeze(value[key], seen);
    return Object.freeze(value);
  }

  function isPlainObject(value) {
    if (!value || typeof value !== "object") return false;
    const prototype = Object.getPrototypeOf(value);
    return prototype === Object.prototype || prototype === null;
  }

  const CANONICAL = deepFreeze({
    urls: {
      helishuOriginal: ORIGINAL_URL,
      helishuSaved: SAVED_URL,
      zhaoProfile: PERSON_URL,
      nanqiaoThread: RUMOR_URL,
    },
    ids: {
      answer: ANSWER_CODE,
      visitor: VISITOR_ID,
      item: ITEM_ID,
      withdrawnAnswer: WITHDRAWN_CODE,
      zhaoStaff: "ZY-014",
      shiftChange: "DH-170418-02",
      privacyRule: "PRI-02",
      monthlyReview: "REV-170508-11",
      ritual: RITUAL_ID,
    },
    people: {
      chenYuan: FATHER_NAME,
      heLing: WOMAN_NAME,
      heLingNickname: WOMAN_NICKNAME,
      zhaoLing: EDITOR_REAL_NAME,
      zhaoDisplayName: "Xiao Ling",
      zhaoAccount: "xiaoling",
    },
    dates: {
      sourcePage: "2017-04-18",
      forumOpening: "2024-05-18",
      itemClosed: "2017-02-09",
      paperReturned: "2017-02-11",
      hls07Reserved: "2017-04-18 16:45",
      hls07Submitted: "2017-04-18 23:46",
      hls07Hidden: "2017-04-19 00:12",
      hls07HiddenPrecise: "2017-04-19 00:12:31",
      zhaoShift: "2017-04-18 18:00—2017-04-19 00:30",
      heLingDeath: "2016-10-28",
      relationshipRestated: "2017-04-18",
      ghostMatchmakerFolkPage: "2009-03-14",
      ghostMatchmakerReaderNote: "2009-03-21",
      ghostMatchmakerArchiveProof: "2009-04-02 03:18:44",
      ghostMatchmakerNickname: "2017-06-28",
      contractCaptured: "2017-04-19 00:12:08",
      hls07Transferred: "2017-04-19 00:12:31",
      contractUnavailable: "2017-04-19 00:19:08",
      chenDeath: "2017-04-26",
      ritualCaptured: "2017-04-19 00:12",
      chenYuanDeath: "2017-04-26",
    },
    rules: {
      breakContractWithinDays: 7,
      contractLeadSeconds: 23,
      firstReadableToFirst410Seconds: 420,
    },
    quote: COMPLETE_QUOTE,
  });

  const RULES = deepFreeze([
    { id: "1", title: "Scope", text: "These rules apply to paper review, copy-editing, public Q&A, and visitor registration in the reference room." },
    { id: "3", title: "Service hours", text: "Desk hours follow the current monthly notice. Telephone enquiries do not count as accepted cases." },
    { id: "5", title: "Appointments", text: "Visitors may book online or take a ticket on site. Unattended bookings remain marked cancelled and do not count as attended visits." },
    { id: "7", title: "Public fields", text: "Public searches show only anonymous IDs, dates, case status, and necessary handling fields." },
    { id: "8", title: "Visitor verification ID", text: "Public display names may repeat and are not proof of identity. A returning visitor must keep the same verification ID." },
    { id: "9", title: "Cancellations and rescheduling", text: "Cancelled or rescheduled entries do not prove attendance and do not change case or material-transfer status." },
    { id: "10", title: "Case IDs", text: "Each case ID corresponds to one registered matter. One visitor may register several separate matters." },
    { id: "12", title: "Pickup or correction after closure", text: "After a case closes, its paper copy may be collected or its wording corrected once. After that one action, the closed case accepts no further visits." },
    { id: "13", title: "Registering new work", text: "New work arising after closure must receive a new case ID. A closed ID must not be reused." },
    { id: "14", title: "Back-entry window", text: "Staff may back-enter an attendance event within thirty days. Back-entry must not alter the original closure date." },
    { id: "16", title: "Attendance back-entry", text: "An attendance back-entry confirms only the date, handler, and stated purpose. It neither reopens a closed case nor adds another correction allowance." },
    { id: "19", title: "Multiple cases for one visitor", text: "One visitor may hold several case IDs at once. Each case's status and material count are calculated separately." },
    { id: "21", title: "Monthly statistics", text: "Monthly statistics use each case's closure time. Back-entering an earlier visit does not change its closure month." },
    { id: "24", title: "Historical search", text: "Historical search results are for checking old material only and are not current service or identity credentials." },
  ]);

  const PRIVACY_ACTIONS = deepFreeze([
    ["HLS-170416-02", "2017-04-16 11:08", "PRI-01", "Message contained a phone number", "Republished anonymously"],
    ["HLS-170416-11", "2017-04-16 20:41", "DUP-03", "Duplicate submission", "Merged into original ID"],
    ["HLS-170417-05", "2017-04-17 09:26", "PRI-03", "Named a minor", "Body removed"],
    ["HLS-170417-09", "2017-04-17 16:52", "REQ-01", "Poster requested concealment", "Public access stopped"],
    ["HLS-170418-03", "2017-04-18 08:41", "DUP-03", "Duplicate night-queue ID", "Merged into 170417-14"],
    [WITHDRAWN_CODE, "2017-04-19 00:12", "PRI-02", "Name and undisclosed family relationship", "Moved to offline review"],
    ["HLS-170419-01", "2017-04-19 08:15", "PRI-01", "Message contained a home address", "Republished anonymously"],
  ]);

  const DUTY_ROWS = deepFreeze([
    ["2017-04-17 09:00—13:00", "ZY-006", "Sister Cao", "Back-entry of paper IDs"],
    ["2017-04-17 13:00—17:00", "ZY-021", "A-Man", "Downloaded-draft catalogue"],
    ["2017-04-18 09:00—13:00", "ZY-011", "Old Zhou", "Appointments and telephone replies"],
    ["2017-04-18 13:00—17:00", "ZY-027", "Zhou Lan", "Desk reception"],
    ["2017-04-18 18:00—next day 00:30", "ZY-014", "Xiao Ling", "Covering Old Zhou's night shift; copy-editing messages and closing the night queue (DH-170418-02)"],
    ["2017-04-19 09:00—13:00", "ZY-011", "Old Zhou", "Three paper handovers; one item moved offline"],
    ["2017-04-19 13:00—17:00", "ZY-008", "Lin Cheng", "Scan-catalogue verification"],
  ]);

  const RECORDS = deepFreeze({
    answer: {
      code: ANSWER_CODE,
      visitor: VISITOR_ID,
      item: ITEM_ID,
      publicAt: "2017-04-18 20:31",
      question: "The relationship list accidentally included with the February materials has already been returned. Can the line written as 'younger female cousin' for outsiders be changed back to the form of address actually used in the family?",
    },
    item: {
      code: ITEM_ID,
      registered: "2017-02-02",
      closed: "2017-02-09",
      paperReturned: "2017-02-11",
      state: "Closed",
    },
    visits: VISIT_ROWS,
    monthlyReview: {
      id: "REV-170508-11",
      dates: AUDIT_EXPECTED_DATES,
      facts: ["No new paper received", "No scan retained", "No revised version generated"],
      finding: "Improper reuse of a case ID",
      limit: "Does not show that the original draft was accepted again, changed, or destroyed",
    },
    withdrawn: {
      code: WITHDRAWN_CODE,
      reservedAt: "2017-04-18 16:45",
      submittedAt: "2017-04-18 23:46",
      hiddenAt: "2017-04-19 00:12",
      hiddenAtPrecise: "2017-04-19 00:12:31",
      account: "xiaoling",
      reason: "PRI-02",
      category: "Rites for the deceased",
      result: "Moved to offline review",
      visitor: VISITOR_ID,
      bodyAvailable: false,
    },
    statusGeneration: {
      ruleId: "ZT-GEN-v2.1",
      effectiveAt: "2016-12-01",
      route: STATUS_RULE_ROUTE,
      pendingState: "pending",
      completeState: "contract-formed",
      completeRequires: ["relation-verified", "offline-review-complete", "reviewer-present"],
      wording: "When relationship verification is pending, the record may only be saved as pending. The system may generate contract-formed status only after offline review is complete and the reviewer field is not blank.",
      samples: [
        { id: "ZT-170414-06", category: "Wedding-invitation form of address", relationVerification: "pending", offlineReview: "not-complete", reviewer: "—", state: "pending" },
        { id: "GH-170417-03", category: "Rites for the deceased", relationVerification: "verified", offlineReview: "2017-04-17 15:22", reviewer: "ZY-006", state: "contract-formed" },
        { id: "JC-170418-04", category: "Memorial-book inscription", relationVerification: "verified", offlineReview: "2017-04-18 10:06", reviewer: "ZY-011", state: "generated" },
        { id: "ZT-170412-02", category: "Invitation form of address", relationVerification: "pending", offlineReview: "not-complete", reviewer: "—", state: "pending" },
        { id: "GH-170413-05", category: "Rites for the deceased", relationVerification: "verified", offlineReview: "2017-04-13 16:44", reviewer: "ZY-008", state: "contract-formed" },
        { id: "JC-170415-01", category: "Memorial-book inscription", relationVerification: "pending", offlineReview: "not-complete", reviewer: "—", state: "pending" },
        { id: "GH-170416-08", category: "Rites for the deceased", relationVerification: "verified", offlineReview: "2017-04-16 11:31", reviewer: "ZY-021", state: "contract-formed" },
        { id: "ZT-170418-09", category: "Family-banquet place card", relationVerification: "verified", offlineReview: "2017-04-18 16:52", reviewer: "ZY-027", state: "generated" },
      ],
    },
    contract: {
      id: RITUAL_ID,
      sourceAnswer: WITHDRAWN_CODE,
      deceasedName: "He*",
      relation: "biaomei*",
      publicRelation: "biaomei*",
      relationVerification: "pending",
      livingSigner: "Chen*",
      visitor: VISITOR_ID,
      generator: "generator v2.1",
      reviewer: "",
      manualOverride: "",
      state: "contract-formed",
      capturedAt: "2017-04-19 00:12:08",
      removedAt: "2017-04-19 00:19:08",
      voidedAt: null,
      bodyCanonical: RITUAL_BODY_CANONICAL,
      bodySha256: RITUAL_BODY_SHA256,
      route: RITUAL_CAPTURE_ROUTE,
      sourceId: "source-ritual-status-capture",
    },
    ritualStatus: {
      id: RITUAL_ID,
      sourceAnswer: WITHDRAWN_CODE,
      deceasedName: "He*",
      publicRelation: "biaomei*",
      relationVerification: "pending",
      livingSigner: "Chen*",
      visitor: VISITOR_ID,
      generator: "generator v2.1",
      reviewer: "",
      manualOverride: "",
      status: "contract-formed",
      capturedAt: "2017-04-19 00:12:08",
      removedAt: "2017-04-19 00:19:08",
      voidedAt: null,
      bodyCanonical: RITUAL_BODY_CANONICAL,
      bodySha256: RITUAL_BODY_SHA256,
      route: RITUAL_CAPTURE_ROUTE,
      sourceId: "source-ritual-status-capture",
    },
    ritualCaptureTimeline: [
      { at: "2017-04-19 00:11:59", http: "404", result: "Page did not yet exist", readable: "no", bodyHash: "—" },
      { at: "2017-04-19 00:12:08", http: "200", result: "First readable capture", readable: "yes", bodyHash: RITUAL_BODY_SHA256 },
      { at: "2017-04-19 00:18:54", http: "200", result: "Body still readable", readable: "yes", bodyHash: RITUAL_BODY_SHA256 },
      { at: "2017-04-19 00:19:08", http: "410", result: "First unavailable response", readable: "no", bodyHash: "—" },
    ],
    folkRule: {
      pageDate: "2009-03-14",
      route: FOLKLORE_ROUTE,
      scope: "One Nanqiao branch of an old account, as told by Auntie Liu",
      wording: "A woman who brokers a match for the dead and checks the relationship between names and spirit tablets was once also called a 'Ghost Matchmaker'.",
      breakContractWithinDays: 7,
      sevenDayRule: "If a living person's name enters the column for the dead and is not removed within seven days, the living name belongs to the white rites.",
      dayCountRule: "Do not count the day the contract is formed. Count from the next day; the seventh day is the limit.",
      triggerField: "livingSigner",
      requiredObjects: ["four incense sticks", "paper-cut figure", "red cotton cord", "spirit tablet of the deceased"],
    },
    folklore: {
      pageDate: "2009-03-14",
      route: FOLKLORE_ROUTE,
      localScope: "One Nanqiao branch of an old account, as told by Auntie Liu",
      scope: "One Nanqiao branch of an old account, as told by Auntie Liu",
      titleTerm: "Ghost Matchmaker",
      wording: "A woman who brokers a match for the dead and checks the relationship between names and spirit tablets was once also called a 'Ghost Matchmaker'.",
      sevenDayRule: "If a living person's name enters the column for the dead and is not removed within seven days, the living name belongs to the white rites.",
      dayCountRule: "Do not count the day the contract is formed. Count from the next day; the seventh day is the limit.",
      triggerField: "When a living person's full name enters the proxy-signature field, the old account also calls it 'drawing the contract'.",
      requiredObjects: ["four incense sticks", "paper-cut figure", "red cotton cord", "spirit tablet of the deceased"],
    },
    ghostSedan: {
      forumAt: "2017-04-19 01:37",
      observedAt: "2017-04-19 01:37",
      cleanupAt: "2017-04-19 06:40",
      location: "mouth of East Lane, Nanqiao",
      forumRoute: SEDAN_ROUTE,
      cleanupRoute: CLEANUP_ROUTE,
      sourceIds: ["source-nanqiao-ghost-sedan", "source-cleanup-20170419", "source-folklore-guren-heli", "source-withdrawn-hls07"],
      provesSupernatural: false,
    },
    chenObituary: {
      deathDate: "2017-04-26",
      publishedAt: "2017-04-27",
      route: CHEN_OBITUARY_ROUTE,
      cause: "Not published",
      sourceId: "source-chen-obituary-2017",
    },
    zhao: {
      account: "xiaoling",
      displayName: "Xiao Ling",
      staffId: "ZY-014",
      realName: "Zhao Ling",
      shiftId: "DH-170418-02",
      shift: "2017-04-18 18:00—next day 00:30",
    },
    nicknameNotice: {
      speaker: "Old Zhou",
      referent: "Zhao Ling",
      wording: "Ghost Matchmaker",
      response: "She told me to my face that she hated the name. I was out of line.",
    },
    privacyActions: PRIVACY_ACTIONS,
    dutyRows: DUTY_ROWS,
  });

  const NEWS_RESULTS = deepFreeze([
    { id: "result-lin-xiaoling-river", date: "2004-09-19", actualTerm: "Xiaoling", fullName: "Lin Xiaoling", region: "Dongjiang County", route: "/oldnews/article/20040919-04", title: "Dongjiang woman Lin Xiaoling missing for three days; bicycle found by river" },
    { id: "result-lin-xiaoling-followup", date: "2004-09-20", actualTerm: "Xiaoling", fullName: "Lin Xiaoling", region: "Dongjiang County", route: "/oldnews/article/20040920-02", title: "Dongjiang County's Lin Xiaoling contacts her family" },
    { id: "result-he-ling-profile", date: "2011-05-12", actualTerm: "He Ling", fullName: "He Ling", region: "Chengnan", route: "/oldnews/article/20110512-03", title: "West Market alterations stall: one old sewing machine, seven years" },
    { id: "result-he-ling-obituary", date: "2016-11-04", actualTerm: "He Ling", fullName: "He Ling", region: "Chengnan", route: "/oldnews/notices/20161104-08", title: "Obituary from the West Market Merchants' Mutual-Aid Association" },
    { id: "result-xiao-ling-school", date: "2017-03-14", actualTerm: "Xiao Ling", fullName: "Wang Xiaoling", region: "Chengnan", route: "/oldnews/article/noise/result-xiao-ling-school", title: "Supplement to Chengnan No. 3 Primary School alumni register" },
    { id: "result-xiaoling-market", date: "2017-08-09", actualTerm: "Xiaoling", fullName: "Zhao Xiaoling", region: "West Market", route: "/oldnews/article/noise/result-xiaoling-market", title: "List of replacement stall permits at West Market" },
    { id: "result-xiaoling-bus", date: "2018-01-22", actualTerm: "Xiao Ling", fullName: "Zhou Xiaoling", region: "Nanqiao", route: "/oldnews/article/noise/result-xiaoling-bus", title: "Letter praising a courteous passenger on Route 15" },
    { id: "result-lin-xiaoling-notice", date: "2018-06-03", actualTerm: "Xiaoling", fullName: "Lin Xiaoling", region: "Dongjiang County", route: "/oldnews/article/noise/result-lin-xiaoling-notice", title: "Dongjiang County community-volunteer commendations" },
    { id: "result-heling-tailor-ad", date: "2019-02-11", actualTerm: "He Ling", fullName: "He Ling", region: "West Market", route: "/oldnews/article/noise/result-heling-tailor-ad", title: "Index of an old West Market alterations-stall advertisement" },
    { id: "result-xiaoling-photo", date: "2019-07-19", actualTerm: "Xiao Ling", fullName: "Chen Xiaoling", region: "Chengbei", route: "/oldnews/article/noise/result-xiaoling-photo", title: "Name ledger for negatives from an old photo studio" },
    { id: "result-heling-directory", date: "2020-01-08", actualTerm: "He Ling", fullName: "He Ling", region: "Chengnan", route: "/oldnews/article/noise/result-heling-directory", title: "Corrections to the local merchants' directory" },
    { id: "result-xiaoling-ocr-correction", date: "2020-04-21", actualTerm: "Xiaoling", fullName: "Wang Xiaoling", region: "Dongqiao", route: "/oldnews/article/noise/result-xiaoling-ocr-correction", title: "Correction log for an OCR name error" },
  ]);

  const CLAIM_AUDIT_META = deepFreeze({
    "claim-materials-one-february-event": { identity_key: "HLS-170418-06 + P-3D61 + originals in plastic sleeve", time_window: "2017-02-11—2017-05-07", ethical_note: "Mixed materials separate the dates; they do not reveal a relative's motive for assembling them." },
    "claim-source-page-is-20170418": { identity_key: "ORIGINAL_URL + capture-20170418 + capture-20170507", time_window: "2017-04-18—2017-05-07 +08:00", ethical_note: "A page match does not date the act of printing." },
    "claim-hls06-links-visitor-item": { identity_key: "HLS-170418-06 + V-7C2F + P-3D61", time_window: "2017-04-18 (public Q&A date)", ethical_note: "Linked IDs do not disclose the visitor's real-world name." },
    "claim-visits-reused-closed-item": { identity_key: "V-7C2F + P-3D61", time_window: "2017-02-23—2017-03-20 +08:00", ethical_note: "Reuse of an old ID does not prove secret intake or malicious conduct." },
    "claim-later-visits-added-new-material": { identity_key: "V-7C2F + P-3D61 + monthly review", time_window: "2017-02-23—2017-03-20 +08:00", ethical_note: "Absence in this system is bounded to this system, not all real-world events." },
    "claim-hls07-hide-destroyed-document": { identity_key: "HLS-170418-07 + PRI-02 + monthly review", time_window: "2017-04-18 23:46—2017-04-19 00:12:31 +08:00", ethical_note: "Ending public access is not destruction of evidence and does not prove the body harmless." },
    "claim-xiaoling-is-zhao-ling": { identity_key: "xiaoling + Xiao Ling + ZY-014 + Zhao Ling", time_window: "2017-01-11—2017-06-28 +08:00", ethical_note: "A public work identity must not be expanded into a private relationship." },
    "claim-zhao-on-duty-at-hide-time": { identity_key: "ZY-014 + DH-170418-02 + xiaoling", time_window: "2017-04-18 18:00—2017-04-19 00:30 +08:00", ethical_note: "A roster and account action do not prove knowledge, collusion, or ritual participation." },
    "claim-ghost-matchmaker-refers-zhao": { identity_key: "Old Zhou's message + Zhao Ling + ZY-014", time_window: "2017-06-28 +08:00", ethical_note: "An unwanted nickname is not a supernatural identity." },
    "claim-ghost-matchmaker-refers-heling": { identity_key: "Zhao Ling in handover message vs He Ling", time_window: "2017-06-28 +08:00", ethical_note: "This excludes only the referent of this public message, not every spoken use." },
    "claim-river-report-is-heling": { identity_key: "Lin Xiaoling (52/Dongjiang County) vs He Ling (Chengnan)", time_window: "2004-09-19—2004-09-20 +08:00", ethical_note: "Correcting a mistaken identity cannot erase other harm He Ling may have suffered." },
    "claim-collage-one-continuous-event": { identity_key: "2004 Nanqiao thread + Lin Xiaoling news + He Ling 2016 obituary + 2021 collage", time_window: "2004-09-17—2021-07-16 +08:00", ethical_note: "Breaking the collage's false links does not deny harm outside the collage." },
    "claim-heling-safe-at-sister-2004": { identity_key: "He Ling + morning capture of Nanqiao thread/3914", time_window: "2004-09-17 10:42—10:46:20 +08:00", ethical_note: "Being safe at one moment does not disprove an earlier conflict or harm." },
    "claim-heling-learned-chen-not-divorced": { identity_key: "He Ling + Chen Yuan + Nanqiao thread/3914", time_window: "2004-09-17 (forum report)", ethical_note: "A forum report must not be rewritten as a verified quotation from Chen Yuan." },
    "claim-heling-ended-discussion-and-chen-came-gate": { identity_key: "He Ling + Chen Yuan + Nanqiao thread/3914", time_window: "2004-09-17 (forum report)", ethical_note: "Keep the narrow wording: she would not discuss it and he waited at the factory gate." },
    "claim-chen-explicitly-said-separated": { identity_key: "Chen Yuan (reported speaker) ↔ He Ling (reported listener)", time_window: "No verifiable quotation date in current sources", ethical_note: "Later retelling is not a verified direct quotation." },
    "claim-heling-worked-2011": { identity_key: "He Ling + West Market alterations stall", time_window: "2011-05-12 +08:00", ethical_note: "Her later life does not disprove earlier harm." },
    "claim-heling-died-2016": { identity_key: "He Ling + West Market Merchants' Mutual-Aid Association obituary", time_window: "died 2016-10-28; published 2016-11-04 +08:00", ethical_note: "An obituary date must not be expanded into a cause of death." },
    "claim-relation-restated-after-heling-death": { identity_key: "He Ling + HLS-170418-06 + V-7C2F + GH-170419-01 + family confirmation", time_window: "2016-10-28—2017-04-19 +08:00", ethical_note: "A posthumous label does not prove the true relationship or Chen Yuan's motive." },
    "claim-hls07-public-index-retained-no-body": { identity_key: "HLS-170418-07 + PRI-02", time_window: "2017-04-18 23:46—2017-04-19 00:12:31 +08:00", ethical_note: "No body in the public index does not mean no offline original existed." },
    "claim-hls07-body-known": { identity_key: "HLS-170418-07", time_window: "2017-04-18 23:46—2017-04-19 00:12:31 +08:00", ethical_note: "Category, concealment reason, and status page cannot reconstruct the message body." },
    "claim-ghost-matchmaker-term-predates-nickname": { identity_key: "FOLKLORE_ROUTE + FOLKLORE_NOTE_ROUTE", time_window: "2009-03-14—2009-04-02 +08:00", ethical_note: "A local oral account is not a universal custom or a real person's identity." },
    "claim-ghost-sedan-was-supernatural": { identity_key: "East Lane eyewitness post + next-morning cleanup record", time_window: "2017-04-19 01:37—06:40 +08:00", ethical_note: "One sighting and matching objects do not establish a supernatural event." },
    "claim-contract-capture-seven-days-before-chen-death": { identity_key: "GH-170419-01 + Chen Yuan obituary 20170427-03", time_window: "2017-04-19—2017-04-27 +08:00", ethical_note: "A matching interval must not be described as a cause of death." },
    "claim-contract-has-no-public-void-record": { identity_key: "complete public capture index for GH-170419-01", time_window: "2017-04-19 00:11:59—00:19:08 +08:00", ethical_note: "No void page in the index does not prove nothing happened offline." },
    "claim-contract-caused-chen-death": { identity_key: "GH-170419-01 ↔ Chen Yuan obituary 20170427-03", time_window: "2017-04-19—2017-04-26 +08:00", ethical_note: "Date alignment, folklore, and a record anomaly cannot replace cause-of-death evidence." },
    "claim-chen-death-cause": { identity_key: "Chen Yuan + obituary 20170427-03", time_window: "died 2017-04-26; published 2017-04-27 +08:00", ethical_note: "Where the obituary gives no cause, do not supply a natural, violent, or supernatural cause." },
    "claim-hls07-midnight-metadata": { identity_key: "HLS-170418-07 + PRI-02", time_window: "2017-04-18 23:46—2017-04-19 00:12:31 +08:00", ethical_note: "Metadata cannot recover the body or identify the writer." },
    "claim-folklore-page-term-and-rule": { identity_key: "Liu Guixiang (speaker) + two 2009 pages + same-year capture", time_window: "2009-03-14—2009-04-02 +08:00", ethical_note: "One Nanqiao branch's account is neither universal Chinese folklore nor a real effective rule." },
    "claim-ghost-sedan-record-cluster": { identity_key: "HLS07 + East Lane sighting + cleanup record + 2009 reader note", time_window: "2009 source; 2017-04-19 00:12:08—06:40 +08:00", ethical_note: "Adjacent page fields do not prove a common cause or a true sighting." },
    "claim-status-generation-impossible-state": { identity_key: "HLS-170418-07 + GH-170419-01 + V-7C2F", time_window: "2017-04-19 00:12:08—00:12:31 +08:00", ethical_note: "A record anomaly must not become an accusation of collusion or supernatural causation." },
    "claim-midnight-seven-minute-window": { identity_key: "GH-170419-01 canonical URL", time_window: "2017-04-19 00:11:59—00:19:08 +08:00", ethical_note: "Capture spacing describes responses, not continuous publication or ritual duration." },
    "claim-ritual-status-captured": { identity_key: "GH-170419-01 + HLS-170418-07 + V-7C2F", time_window: "2017-04-19 00:12:08 +08:00", ethical_note: "Masked-person linkage is for source checking only, not publication of identity fields." },
    "claim-chen-died-2017": { identity_key: "Chen Yuan + obituary 20170427-03", time_window: "died 2017-04-26; published 2017-04-27 +08:00", ethical_note: "Confirm the date only; do not add a cause or connect it causally to the contract page." },
    "claim-contract-was-voided": { identity_key: "GH-170419-01", time_window: "no public void page after 2017-04-19 00:19:08", ethical_note: "Missing public records do not prove no offline cancellation, correction, or handling." },
    "claim-sexual-assault-occurred": { identity_key: "Chen Yuan (accused) ↔ He Ling (named subject)", time_window: "No verifiable occurrence time in current sources", ethical_note: "Undated fragments with no original file prove neither the allegation nor its exclusion." },
    "claim-heling-died-by-suicide": { identity_key: "He Ling + 2016 obituary", time_window: "died 2016-10-28; other event time unverifiable", ethical_note: "An obituary without cause proves neither suicide nor its exclusion." },
    "claim-heling-death-cause": { identity_key: "He Ling + 2016 obituary", time_window: "died 2016-10-28; published 2016-11-04 +08:00", ethical_note: "Do not supply a cause of death absent from public sources." },
    "claim-chen-caused-heling-death": { identity_key: "Chen Yuan ↔ He Ling", time_window: "2004 forum report—death on 2016-10-28", ethical_note: "Reported conduct, twelve years, and a cause-free obituary do not establish causation." },
    "claim-cousin-label-motive": { identity_key: "Chen Yuan + He Ling + HLS-170418-06", time_window: "label recorded 2017-04-18; original motive date unverifiable", ethical_note: "The label's existence does not reveal whom Chen Yuan meant to hide it from or why." },
    "claim-hidden-content-was-harmless": { identity_key: "HLS-170418-07 + PRI-02", time_window: "2017-04-18 23:46—2017-04-19 00:12:31 +08:00", ethical_note: "A privacy process does not certify the body as harmless, harmful, true, or false." },
    "claim-zhao-private-collusion": { identity_key: "Zhao Ling/ZY-014/xiaoling ↔ Chen Yuan", time_window: "2017-04-18 18:00—2017-04-19 00:30 +08:00; no verifiable private-contact time", ethical_note: "Normal shifts and privacy actions neither prove collusion nor exclude contact outside the website." },
  });

  const CLAIMS = deepFreeze([
    { id: "claim-materials-one-february-event", wording: "The printed page, February pickup slip, and pencilled Q&A number in the plastic sleeve all came from one February visit.", status: "disproved", source_ids: ["source-helishu-20170418", "source-record-hls06", "source-case-p3d61"], limits: "The sources date the materials to different records. They do not show when or by whom the items were put in one sleeve." },
    { id: "claim-source-page-is-20170418", wording: "The printed fragment matches the 18 April 2017 addendum to 'How to write forms of address for two families' on Helishu.", status: "confirmed", source_ids: ["source-helishu-20170418", "source-archive-meta-20170507"], limits: "The match does not prove Chen Yuan printed or wrote on it that day." },
    { id: "claim-hls06-links-visitor-item", wording: "Public record HLS-170418-06 links visitor V-7C2F to case P-3D61.", status: "confirmed", source_ids: ["source-record-hls06"], limits: "The linked IDs do not by themselves identify the visitor." },
    { id: "claim-visits-reused-closed-item", wording: "The visits on 23 February, 6 March, and 20 March 2017 reused the already closed case P-3D61.", status: "confirmed", source_ids: ["source-case-p3d61", "source-visits-v7c2f", "source-rules-v31"], limits: "Reuse of an old ID does not establish staff motive." },
    { id: "claim-later-visits-added-new-material", wording: "The three post-closure visits took in, scanned, or revised paper materials.", status: "disproved", source_ids: ["source-monthly-review"], limits: "The review covers only this site's intake, scan, and revision records; it does not explain the repeat visits." },
    { id: "claim-hls07-hide-destroyed-document", wording: "Hiding HLS-170418-07 at 00:12 meant a newly received paper or scan had been secretly destroyed.", status: "disproved", source_ids: ["source-withdrawn-hls07", "source-monthly-review", "source-privacy-log"], limits: "The system record excludes a new intake or destroyed revision; it does not prove the hidden message harmless." },
    { id: "claim-xiaoling-is-zhao-ling", wording: "The public account xiaoling and display name Xiao Ling belong to volunteer Zhao Ling.", status: "confirmed", source_ids: ["source-zhao-profile", "source-zhao-staff-record"], limits: "The identity match does not prove a private relationship with Chen Yuan or He Ling." },
    { id: "claim-zhao-on-duty-at-hide-time", wording: "Zhao Ling was still within her confirmed relief shift when the index was hidden at 00:12 on 19 April 2017.", status: "confirmed", source_ids: ["source-duty-roster", "source-shift-change", "source-withdrawn-hls07"], limits: "A shift and action log prove permission, time, and account only—not knowledge of the family beyond the message." },
    { id: "claim-ghost-matchmaker-refers-zhao", wording: "The nickname 'Ghost Matchmaker' in the June handover message refers to Zhao Ling, who explicitly disliked it.", status: "confirmed", source_ids: ["source-volunteer-notice", "source-zhao-profile"], limits: "The nickname grants no supernatural identity and does not show she knew He Ling." },
    { id: "claim-ghost-matchmaker-refers-heling", wording: "The 'Ghost Matchmaker' in the record refers to He Ling.", status: "disproved", source_ids: ["source-volunteer-notice", "source-zhao-profile"], limits: "This excludes only the referent in the available source, not every spoken use of the same words." },
    { id: "claim-river-report-is-heling", wording: "The old-news subject 'Xiaoling missing; item found by river' was He Ling.", status: "disproved", source_ids: ["source-river-report-20040919", "source-river-followup-20040920"], limits: "The two reports concern a different person. This does not prove He Ling suffered no other harm." },
    { id: "claim-collage-one-continuous-event", wording: "The 2004 thread, river report, and 2016 obituary in the 2021 collage record one continuous event involving He Ling.", status: "disproved", source_ids: ["source-rumor-collage", "source-river-report-20040919", "source-river-followup-20040920", "source-nanqiao-resolved", "source-heling-profile-2011", "source-heling-obituary-2016"], limits: "The identity and chronology links fail; this does not deny harm outside the collage." },
    { id: "claim-heling-safe-at-sister-2004", wording: "On the morning of 17 September 2004, the thread starter confirmed He Ling was at her sister's and asked people to stop reposting and speculating.", status: "confirmed", source_ids: ["source-nanqiao-resolved"], limits: "This confirms contact and safety at that moment, not the absence of every earlier conflict or harm." },
    { id: "claim-heling-learned-chen-not-divorced", wording: "The complete 2004 thread says He Ling had only then learned that Chen Yuan was not divorced.", status: "confirmed", source_ids: ["source-nanqiao-resolved"], limits: "The contemporaneous forum text neither records Chen Yuan's exact earlier words nor quotes He Ling directly." },
    { id: "claim-heling-ended-discussion-and-chen-came-gate", wording: "The complete 2004 thread says He Ling would not discuss it further while Chen Yuan still came to wait at the factory gate.", status: "confirmed", source_ids: ["source-nanqiao-resolved"], limits: "It supports only 'would not discuss it' and 'waited at the factory gate', not additional conduct." },
    { id: "claim-chen-explicitly-said-separated", wording: "Chen Yuan personally told He Ling that he was separated and only the paperwork remained.", status: "unresolved", source_ids: [], limits: "Current public pages contain only later reports, not a verifiable direct quotation." },
    { id: "claim-heling-worked-2011", wording: "A 2011 profile shows He Ling running an alterations stall in West Market.", status: "confirmed", source_ids: ["source-heling-profile-2011"], limits: "Her later life does not disprove earlier harm." },
    { id: "claim-heling-died-2016", wording: "He Ling died on 28 October 2016.", status: "confirmed", source_ids: ["source-heling-obituary-2016"], limits: "The obituary gives no cause of death." },
    { id: "claim-relation-restated-after-heling-death", wording: "After He Ling's death, the 2017 public Q&A still says 'for outsiders: younger female cousin'; the contract page for the same visitor masks it as 'biaomei*'.", status: "confirmed", source_ids: ["source-heling-obituary-2016", "source-record-hls06", "source-ritual-status-capture", "source-forum-family-confirmation"], limits: "The full label comes from HLS06; the contract page is linked through V-7C2F and family confirmation. Neither proves the real relationship or motive." },
    { id: "claim-hls07-public-index-retained-no-body", wording: "The public index for HLS-170418-07 retained no message body.", status: "confirmed", source_ids: ["source-withdrawn-hls07", "source-privacy-log"], limits: "This confirms only the public index's omission, not whether an offline original exists." },
    { id: "claim-hls07-body-known", wording: "What the message body of HLS-170418-07 said before it was moved offline.", status: "unresolved", source_ids: ["source-withdrawn-hls07", "source-privacy-log"], limits: "The public index retains only its ID, times, category, reason, and disposition. Those fields cannot reconstruct the body." },
    { id: "claim-ghost-matchmaker-term-predates-nickname", wording: "The term 'Ghost Matchmaker' appears on Auntie Liu's 2009 oral-history pages, independently captured by April 2009, before Old Zhou used it as a handover nickname in June 2017.", status: "confirmed", source_ids: ["source-folklore-guren-heli", "source-folklore-reader-note", "source-folklore-pre2017-capture", "source-volunteer-notice"], limits: "This establishes webpage wording and sequence only. It does not show Zhao Ling performed a ritual or held a supernatural identity." },
    { id: "claim-ghost-sedan-was-supernatural", wording: "The red sedan reported on the forum before dawn on 19 April 2017 was a supernatural ghost sedan.", status: "unresolved", source_ids: ["source-nanqiao-ghost-sedan", "source-cleanup-20170419", "source-folklore-guren-heli", "source-withdrawn-hls07"], limits: "The sighting is a single forum report; ash, red cord, and the same-night timing all permit ordinary explanations." },
    { id: "claim-contract-capture-seven-days-before-chen-death", wording: "The contract-formed page was captured on 19 April 2017, seven calendar days before Chen Yuan died on 26 April; his obituary appeared on 27 April.", status: "confirmed", source_ids: ["source-ritual-status-capture", "source-chen-obituary-2017", "source-folklore-reader-note"], limits: "The calculation confirms the interval and next-day publication only, not a cause of death." },
    { id: "claim-contract-has-no-public-void-record", wording: "No void page for GH-170419-01 appears in the available public captures.", status: "confirmed", source_ids: ["source-ritual-status-capture", "source-ritual-capture-timeline"], limits: "This is a bounded negative fact about the captures, not proof that no offline cancellation or correction occurred." },
    { id: "claim-contract-caused-chen-death", wording: "The rites-for-the-deceased contract or the alleged seven-day rule caused Chen Yuan's death.", status: "unresolved", source_ids: [], limits: "The pages establish only a date correspondence; they contain no cause of death, medical record, or verifiable causal evidence." },
    { id: "claim-chen-death-cause", wording: "The specific cause of Chen Yuan's death on 26 April 2017.", status: "unresolved", source_ids: ["source-chen-obituary-2017"], limits: "The independent obituary records only the death date, and no other public page states a cause." },
    { id: "claim-hls07-midnight-metadata", wording: "HLS-170418-07 was submitted at 23:46 and moved offline at 00:12 under 'rites for the deceased / name and undisclosed family relationship'.", status: "confirmed", source_ids: ["source-withdrawn-hls07", "source-privacy-log"], limits: "Metadata cannot restore the body or establish the writer, a particular ritual, or a supernatural event." },
    { id: "claim-folklore-page-term-and-rule", wording: "Two 2009 folklore pages use 'Ghost Matchmaker' and record Auntie Liu's Nanqiao-branch saying: if a living name remains in the dead's column for seven days, it belongs to the white rites.", status: "confirmed", source_ids: ["source-folklore-guren-heli", "source-folklore-reader-note", "source-folklore-pre2017-capture"], limits: "This proves only what the pages record, not that the saying was widespread, enacted, or effective." },
    { id: "claim-ghost-sedan-record-cluster", wording: "A same-night eyewitness post, next-morning cleanup record, folklore entry, and HLS07 time fields correspond in place, objects, and time.", status: "confirmed", source_ids: ["source-nanqiao-ghost-sedan", "source-cleanup-20170419", "source-folklore-guren-heli", "source-withdrawn-hls07"], limits: "The four pages can be compared; they do not establish the sighting as true or give the records a common cause." },
    { id: "claim-status-generation-impossible-state", wording: "Public generation rule v2.1 says a pending relationship can only remain pending. Yet GH-170419-01 shows pending / contract-formed at 00:12:08, 23 seconds before HLS07 moved offline at 00:12:31, with the manual-override field blank.", status: "confirmed", source_ids: ["source-status-generation-rule", "source-status-generation-samples", "source-ritual-status-capture", "source-withdrawn-hls07"], limits: "The page fields conflict with the public rule. They do not distinguish system error, unrecorded manual action, capture defect, or the folklore's claimed result." },
    { id: "claim-midnight-seven-minute-window", wording: "The same URL returned 404 at 00:11:59, was first readable at 00:12:08, retained the same body hash at 00:18:54, and first returned 410 at 00:19:08; the first readable capture and first 410 are seven minutes apart.", status: "confirmed", source_ids: ["source-ritual-status-capture", "source-ritual-capture-timeline"], limits: "Four capture points do not prove seven uninterrupted minutes of publication or recover the body after 410." },
    { id: "claim-ritual-status-captured", wording: "At 00:12:08 on 19 April 2017, PageTime saved a masked rites-for-the-deceased status page: He*, outsider label biaomei*, Chen* as proxy signer, visitor V-7C2F, relationship pending, status contract-formed.", status: "confirmed", source_ids: ["source-ritual-status-capture", "source-record-hls06", "source-forum-family-confirmation"], limits: "The public page does not show the full label. V-7C2F, HLS06, and family confirmation link the people; the capture proves no offline ritual, true relationship, or consent." },
    { id: "claim-chen-died-2017", wording: "An independent obituary records Chen Yuan's death on 26 April 2017.", status: "confirmed", source_ids: ["source-chen-obituary-2017"], limits: "The public obituary gives no cause of death." },
    { id: "claim-contract-was-voided", wording: "Whether GH-170419-01 was later cancelled, voided, or corrected offline.", status: "unresolved", source_ids: [], limits: "The capture timeline has no void page; missing public records do not prove there was no offline handling." },
    { id: "claim-sexual-assault-occurred", wording: "Chen Yuan sexually assaulted He Ling.", status: "unresolved", source_ids: [], limits: "The available pages contain only undated reposted fragments without an original file and commenter speculation; they neither establish nor exclude the allegation." },
    { id: "claim-heling-died-by-suicide", wording: "He Ling later died by suicide.", status: "unresolved", source_ids: [], limits: "The 2016 obituary gives no cause of death, and no other verifiable page states one." },
    { id: "claim-heling-death-cause", wording: "The specific cause of He Ling's death in 2016.", status: "unresolved", source_ids: [], limits: "No available public source gives a cause." },
    { id: "claim-chen-caused-heling-death", wording: "Chen Yuan's conduct caused He Ling's death in 2016.", status: "unresolved", source_ids: [], limits: "A twelve-year interval and an obituary without cause cannot establish causation." },
    { id: "claim-cousin-label-motive", wording: "Chen Yuan's specific motive for presenting He Ling to outsiders as a younger female cousin.", status: "unresolved", source_ids: [], limits: "The pages show that the label was written and queried again in 2017; they do not reveal whom he was hiding it from or why." },
    { id: "claim-hidden-content-was-harmless", wording: "Whether the hidden body of HLS-170418-07 involved harm, misconduct, or other material requiring audit.", status: "unresolved", source_ids: [], limits: "The privacy process explains why the public index hid it; it does not certify the body's moral or factual content." },
    { id: "claim-zhao-private-collusion", wording: "Zhao Ling privately colluded with Chen Yuan and helped him conceal material about He Ling.", status: "unresolved", source_ids: [], limits: "The roster, privacy log, and public profile explain normal work only; they prove neither the presence nor absence of an unrecorded private relationship." },
  ].map((claim) => ({ ...CLAIM_AUDIT_META[claim.id], ...claim })));

  const CLAIMS_BY_ID = deepFreeze(Object.fromEntries(CLAIMS.map((claim) => [claim.id, claim])));

  const PUZZLE_TOKENS = deepFreeze([
    { id: "token-original-url", kind: "url", origin_source_ids: ["source-retired-helishu"], produced_by_puzzle_id: null },
    { id: "token-helishu-capture-set", kind: "page-set", origin_source_ids: [], produced_by_puzzle_id: "puzzle-archive-helishu" },
    { id: "token-hls-paper-tail", kind: "record-fragment", origin_source_ids: ["source-attachment-front"], produced_by_puzzle_id: null },
    { id: "token-hls06-code", kind: "record-id", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-helishu-versions" },
    { id: "token-source-quote-date", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-helishu-versions" },
    { id: "token-visitor-v7c2f", kind: "record-id", origin_source_ids: [], produced_by_puzzle_id: "puzzle-lookup-hls06" },
    { id: "token-item-p3d61", kind: "record-id", origin_source_ids: [], produced_by_puzzle_id: "puzzle-lookup-hls06" },
    { id: "token-relation-question", kind: "claim-fragment", origin_source_ids: [], produced_by_puzzle_id: "puzzle-lookup-hls06" },
    { id: "token-procedure-classification", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-classify-procedure" },
    { id: "token-hls07", kind: "record-id", origin_source_ids: ["source-withdrawn-hls07"], produced_by_puzzle_id: null },
    { id: "token-zhao-identity", kind: "identity", origin_source_ids: [], produced_by_puzzle_id: "puzzle-triangulate-zhao" },
    { id: "token-privacy-process", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-triangulate-zhao" },
    { id: "token-ghost-title-referent", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-trace-ghost-name" },
    { id: "token-oldnews-name-term", kind: "search-term", origin_source_ids: ["source-rumor-collage"], produced_by_puzzle_id: null },
    { id: "token-oldnews-result-set", kind: "page-set", origin_source_ids: [], produced_by_puzzle_id: "puzzle-search-oldnews" },
    { id: "token-river-exclusion", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-classify-river" },
    { id: "token-nanqiao-url", kind: "url", origin_source_ids: ["source-rumor-collage"], produced_by_puzzle_id: null },
    { id: "token-nanqiao-capture-set", kind: "page-set", origin_source_ids: [], produced_by_puzzle_id: "puzzle-archive-nanqiao" },
    { id: "token-2004-continuation", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-nanqiao" },
    { id: "token-refusal-context", kind: "classification", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-nanqiao" },
    { id: "token-posthumous-relation", kind: "chronology", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-posthumous-relation" },
    { id: "token-status-generation-rule", kind: "system-rule", origin_source_ids: ["source-status-generation-rule", "source-status-generation-samples"], produced_by_puzzle_id: "puzzle-inspect-hls07-midnight" },
    { id: "token-hls07-midnight", kind: "rule-and-chronology-anomaly", origin_source_ids: [], produced_by_puzzle_id: "puzzle-inspect-hls07-midnight" },
    { id: "token-folklore-rule", kind: "source-provenance", origin_source_ids: [], produced_by_puzzle_id: "puzzle-trace-ghost-matchmaker-tradition" },
    { id: "token-ghost-matchmaker-tradition", kind: "source-provenance", origin_source_ids: [], produced_by_puzzle_id: "puzzle-trace-ghost-matchmaker-tradition" },
    { id: "token-ghost-sedan-cluster", kind: "cross-source-comparison", origin_source_ids: [], produced_by_puzzle_id: "puzzle-triangulate-ghost-sedan" },
    { id: "token-seven-day-rule-match", kind: "relative-date", origin_source_ids: [], produced_by_puzzle_id: "puzzle-compare-seven-day-rule" },
    { id: "token-archive-bag-submitted", kind: "world-state", origin_source_ids: [], produced_by_puzzle_id: "puzzle-submit-archive-bag" },
  ]);

  const PUZZLE_BEATS = deepFreeze([
    { id: "puzzle-archive-helishu", stage_id: "stage-source-restoration", kind: "search", input_channel: "archive-url-search", input_token_ids: ["token-original-url"], output_token_ids: ["token-helishu-capture-set"], success_destination: "/archive/results/helishu" },
    { id: "puzzle-compare-helishu-versions", stage_id: "stage-source-restoration", kind: "comparison", input_channel: "archive-version-comparison", input_token_ids: ["token-helishu-capture-set", "token-hls-paper-tail"], output_token_ids: ["token-hls06-code", "token-source-quote-date"], success_destination: "/forum/latest" },
    { id: "puzzle-lookup-hls06", stage_id: "stage-source-restoration", kind: "search", input_channel: "record-number-search", input_token_ids: ["token-hls06-code"], output_token_ids: ["token-visitor-v7c2f", "token-item-p3d61", "token-relation-question"], success_destination: "/records/dayi/HLS-170418-06" },
    { id: "puzzle-search-oldnews", stage_id: "stage-name-index", kind: "search", input_channel: "library-search", input_token_ids: [], output_token_ids: ["token-oldnews-result-set"], success_destination: "/oldnews/search?keyword=Xiaoling&page=1" },
    { id: "puzzle-compare-posthumous-relation", stage_id: "stage-posthumous-relation", kind: "comparison", input_channel: "two-date-card-ordering", input_token_ids: ["token-visitor-v7c2f", "token-oldnews-result-set"], output_token_ids: ["token-posthumous-relation"], success_destination: "/forum/latest" },
    { id: "puzzle-classify-river", stage_id: "stage-river-identity", kind: "field-match", input_channel: "source-field-comparison", input_token_ids: ["token-oldnews-result-set"], output_token_ids: ["token-river-exclusion"], success_destination: "/forum/latest" },
    { id: "puzzle-archive-nanqiao", stage_id: "stage-rumor-repair", kind: "search", input_channel: "archive-url-search", input_token_ids: [], output_token_ids: ["token-nanqiao-capture-set"], success_destination: "/archive/results/nanqiao" },
    { id: "puzzle-compare-nanqiao", stage_id: "stage-rumor-repair", kind: "comparison", input_channel: "archive-content-comparison", input_token_ids: ["token-nanqiao-capture-set"], output_token_ids: ["token-2004-continuation", "token-refusal-context"], success_destination: "/forum/latest" },
    { id: "puzzle-inspect-hls07-midnight", stage_id: "stage-midnight-impossible-state", kind: "rule-application", input_channel: "status-rule-and-chronology", input_token_ids: ["token-posthumous-relation", "token-river-exclusion", "token-2004-continuation"], output_token_ids: ["token-status-generation-rule", "token-hls07-midnight"], success_destination: "/forum/latest" },
    { id: "puzzle-trace-ghost-matchmaker-tradition", stage_id: "stage-folklore-provenance", kind: "provenance-comparison", input_channel: "two-pages-and-capture", input_token_ids: ["token-hls07-midnight"], output_token_ids: ["token-folklore-rule", "token-ghost-matchmaker-tradition", "token-ghost-title-referent"], success_destination: "/forum/latest" },
    { id: "puzzle-triangulate-ghost-sedan", stage_id: "stage-midnight-traces", kind: "source-pairing", input_channel: "page-and-field-selection", input_token_ids: ["token-folklore-rule", "token-hls07-midnight"], output_token_ids: ["token-ghost-sedan-cluster"], success_destination: "/forum/latest" },
    { id: "puzzle-compare-seven-day-rule", stage_id: "stage-seven-day-rule", kind: "relative-date", input_channel: "date-calculation", input_token_ids: ["token-ghost-sedan-cluster"], output_token_ids: ["token-seven-day-rule-match"], success_destination: "/forum/latest" },
    { id: "puzzle-submit-archive-bag", stage_id: "stage-archive-bag", kind: "choice", input_channel: "mirrored-archive-cataloguing", input_token_ids: ["token-helishu-capture-set", "token-hls06-code", "token-visitor-v7c2f", "token-oldnews-result-set", "token-posthumous-relation", "token-river-exclusion", "token-nanqiao-capture-set", "token-2004-continuation", "token-hls07-midnight", "token-folklore-rule", "token-ghost-sedan-cluster", "token-seven-day-rule-match"], output_token_ids: ["token-archive-bag-submitted"], success_destination: "/forum/latest" },
  ]);

  const BEATS_BY_ID = deepFreeze(Object.fromEntries(PUZZLE_BEATS.map((beat) => [beat.id, beat])));
  const TOKENS_BY_ID = deepFreeze(Object.fromEntries(PUZZLE_TOKENS.map((token) => [token.id, token])));

  function requiredProducedInputTokenIds(beatId) {
    const beat = BEATS_BY_ID[String(beatId || "")];
    if (!beat) return [];
    return beat.input_token_ids.filter((tokenId) => TOKENS_BY_ID[tokenId]?.produced_by_puzzle_id);
  }

  const HINT_TEXT = deepFreeze({
    "puzzle-archive-helishu": [
      "Look at the original path shown on the retired page; it is not the bookmark in your browser.",
      "Use the complete URL in the web-capture search. You do not need to guess a year.",
      "Check the protocol, hostname, and /ziliao/chengwei.html path.",
      "Enter https://www.helishu.example/ziliao/chengwei.html in PageTime.",
    ],
    "puzzle-compare-helishu-versions": [
      "Capture date and page-body date are different fields.",
      "Compare the body and response metadata; do not simply choose the latest capture.",
      "Place the 18 April body beside the 7 May response, then check the partial record number on the back of the first post's attachment.",
      "The body dates to 18 April; 7 May is a recapture of the same content. Combine that date with the pencilled HLS-1704□□-06 to get HLS-170418-06.",
    ],
    "puzzle-lookup-hls06": [
      "The pencilled suffix, body date, and public Q&A index can be combined.",
      "Use the complete HLS number in the migrated old-record search.",
      "The date comes from the body, not the February pickup slip or the May capture.",
      "Search for HLS-170418-06.",
    ],
    "puzzle-classify-procedure": [
      "Treat 'rule breach' and 'new intake' as two separate questions.",
      "Compare case status, the three visits, the rules, and the monthly review.",
      "Dates and clauses show reuse of a closed case ID; the intake, scan, and version fields show whether a draft was changed.",
      "Choose 23 February, 6 March, and 20 March and cite the relevant clauses. The old ID was reused, but there was no new intake or revision.",
    ],
    "puzzle-triangulate-zhao": [
      "An account name alone cannot establish a real name or who was on duty.",
      "Triangulate with a staff ID and time window.",
      "Connect xiaoling, ZY-014, Zhao Ling, the relief-shift form, and the 00:12 action; explain PRI-02 separately.",
      "xiaoling is Zhao Ling; the shift form places her on duty at 00:12; PRI-02 explains only the privacy concealment.",
    ],
    "puzzle-trace-ghost-name": [
      "The nickname's referent appears in an ordinary handover message.",
      "Check who said it, whom it addressed, and how she responded.",
      "Connect the June message to the ZY-014 profile; do not infer identity from the similar-sounding names Xiao Ling.",
      "'Ghost Matchmaker' was Old Zhou's nickname for Zhao Ling, and she explicitly disliked it.",
    ],
    "puzzle-search-oldnews": [
      "The cropped title leaves a name that may have an OCR or homophone variation.",
      "Use the old-news name search and open the results rather than relying on snippets.",
      "Try Xiao Ling, Xiaoling, or He Ling; the results show the matched term, date, and region.",
      "Search for Xiao Ling and inspect the full result set.",
    ],
    "puzzle-classify-river": [
      "A matching or similar-sounding name is not an identity link.",
      "Compare stable fields in the full article and its next-day follow-up.",
      "Check the full name, age, region, item found by the river, and next-day outcome.",
      "The subject is Lin Xiaoling, 52, from Dongjiang County; the item was a bicycle; she was safe the next day.",
    ],
    "puzzle-archive-nanqiao": [
      "The collage fragment's footer still contains the original forum URL.",
      "Give PageTime the complete URL; do not guess from the title.",
      "Check the full bbs.nanqiao.example/thread/3914.html path.",
      "Search for http://bbs.nanqiao.example/thread/3914.html.",
    ],
    "puzzle-compare-nanqiao": [
      "The same URL has different bodies in the early-morning and late-morning captures.",
      "Compare the page bodies; do not dismiss the later capture as a duplicate.",
      "Compare the 01:18 and 10:46 titles, replies, and the full sentence containing 'would not'.",
      "The late-morning version confirms she was at her sister's. The full sentence says she would not discuss it and that he had come to wait at the factory gate.",
    ],
    "puzzle-compare-posthumous-relation": [
      "Choose only two pages that directly provide a date and a relationship label.",
      "Order He Ling's obituary and HLS06 by their page dates.",
      "The obituary gives the death date; HLS06 preserves 'for outsiders: younger female cousin' and its publication time.",
      "Choose the 2016-10-28 obituary and the 2017-04-18 Q&A, then retain the original label younger-female-cousin.",
    ],
    "puzzle-inspect-hls07-midnight": [
      "First infer from ordinary samples what pending and contract-formed each require.",
      "Then order the HLS07 offline-transfer time and the capture time of the contract page that cites it.",
      "The ordinary rule permits pending only; the page shows pending / contract-formed at 00:12:08, while HLS07 moved offline at 00:12:31.",
      "Choose two ordinary samples. Order 23:46, 00:12:08, 00:12:31, 00:19:08: a 23-second lead, and seven minutes from first readable capture to first 410.",
    ],
    "puzzle-trace-ghost-matchmaker-tradition": [
      "One interview page explains the title; a reader note preserves one Nanqiao branch's day-counting rule.",
      "An independent capture catalogue establishes the latest date by which both pages existed.",
      "Check Liu Guixiang (Auntie Liu), the two 2009 pages, their same-year capture, and the 2017 handover message.",
      "Choose both folklore pages and the 2009-04-02 capture. The speaker is Auntie Liu; the local scope is the Nanqiao branch.",
    ],
    "puzzle-triangulate-ghost-sedan": [
      "Choose one page each from the sighting post, cleanup log, reader note, and midnight status page.",
      "Pair only times, locations, and remains that actually appear on the pages.",
      "The cleanup log records three charred bamboo splinters, not the folklore's four incense sticks; no spirit tablet appears.",
      "Choose all four pages and pair the same night, East Lane, a damp human-shaped paper scrap, and red cotton cord.",
    ],
    "puzzle-compare-seven-day-rule": [
      "Keep the contract capture date, Chen Yuan's death date, and obituary publication date separate.",
      "Calculate calendar days only from capture to death, then record the white notice's publication separately.",
      "2017-04-19 to 2017-04-26 is seven days; the obituary appeared on 2017-04-27.",
      "Enter contract page 19 April, death 26 April, interval 7 days, obituary 27 April.",
    ],
    "puzzle-submit-archive-bag": [
      "The final entry is not about completing the truth; it is about which fields have public sources.",
      "Handle the original wording, real relationship, two causes of death, and HLS07 body separately.",
      "Only 'younger female cousin (2017 outsider wording)' belongs in the original field. The real relationship and causes of death must not be supplied.",
      "Enter: original label younger-female-cousin; true relationship unresolved; HLS07 body unavailable; both causes of death unknown; leave the relationship field blank.",
    ],
  });

  const HINT_SCOPES = ["attention", "method", "bounded-cue", "direct-answer"];
  const HINT_LADDERS = deepFreeze(PUZZLE_BEATS.map((beat) => ({
    id: `hint-${beat.id}`,
    puzzle_id: beat.id,
    rungs: HINT_TEXT[beat.id].map((text, index) => ({
      level: index + 1,
      scope: HINT_SCOPES[index],
      text_intent: text,
    })),
  })));

  const REACTIONS = deepFreeze([
    { id: "reaction-source-correction", order: 1, readyAfterBeatIds: ["puzzle-compare-helishu-versions"] },
    { id: "reaction-record-link", order: 2, readyAfterBeatIds: ["puzzle-lookup-hls06"] },
    { id: "reaction-procedure-boundary", order: 3, readyAfterBeatIds: ["puzzle-search-oldnews"] },
    { id: "reaction-title-provenance", order: 4, readyAfterBeatIds: ["puzzle-compare-posthumous-relation"] },
    { id: "reaction-river-exclusion", order: 5, readyAfterBeatIds: ["puzzle-classify-river"] },
    { id: "reaction-posthumous-relation", order: 6, readyAfterBeatIds: ["puzzle-compare-nanqiao"] },
    { id: "reaction-hls07-midnight", order: 7, readyAfterBeatIds: ["puzzle-inspect-hls07-midnight"] },
    { id: "reaction-ghost-matchmaker-tradition", order: 8, readyAfterBeatIds: ["puzzle-trace-ghost-matchmaker-tradition"] },
    { id: "reaction-ghost-sedan", order: 9, readyAfterBeatIds: ["puzzle-triangulate-ghost-sedan"] },
    { id: "reaction-seven-day-rule", order: 10, readyAfterBeatIds: ["puzzle-compare-seven-day-rule"] },
    { id: "reaction-archive-bag", order: 11, readyAfterBeatIds: ["puzzle-submit-archive-bag"] },
  ]);

  const ENDING_EXCLUDED_SIDE_CLAIM_IDS = deepFreeze([
    "claim-visits-reused-closed-item",
    "claim-later-visits-added-new-material",
    "claim-hls07-hide-destroyed-document",
    "claim-xiaoling-is-zhao-ling",
    "claim-zhao-on-duty-at-hide-time",
    "claim-ghost-matchmaker-refers-zhao",
    "claim-ghost-matchmaker-refers-heling",
    "claim-heling-worked-2011",
    "claim-zhao-private-collusion",
  ]);

  const ENDING_BRANCH = deepFreeze({
    id: "ending-archive-bag-relation-left-blank",
    predicate_type: "archive-cataloguing-choice",
    confirmed_claim_ids: CLAIMS.filter((claim) => claim.status === "confirmed" && !ENDING_EXCLUDED_SIDE_CLAIM_IDS.includes(claim.id)).map((claim) => claim.id),
    disproved_claim_ids: CLAIMS.filter((claim) => claim.status === "disproved" && !ENDING_EXCLUDED_SIDE_CLAIM_IDS.includes(claim.id)).map((claim) => claim.id),
    unresolved_claim_ids: CLAIMS.filter((claim) => claim.status === "unresolved" && !ENDING_EXCLUDED_SIDE_CLAIM_IDS.includes(claim.id)).map((claim) => claim.id),
    explicit_completion_text: "Thread status: resolved. This is where the searchable public record ends. The relationship field was not filled in again. No void page appears in the available public captures.",
    character_choice: "The poster and their mother seal the materials separately. The archive bag's true-relationship field remains blank; the original's 'younger female cousin' does not replace the status that public sources cannot confirm for He Ling.",
  });

  const SOURCE_IDS = deepFreeze([
    "source-forum-opening", "source-attachment-front", "source-forum-family-confirmation", "source-retired-helishu",
    "source-archive-index-helishu", "source-archive-meta-20170507", "source-helishu-20170418", "source-helishu-migration-20170903",
    "source-record-hls06", "source-case-p3d61", "source-visits-v7c2f", "source-rules-v31", "source-monthly-review",
    "source-withdrawn-hls07", "source-privacy-log", "source-zhao-profile", "source-zhao-staff-record", "source-duty-roster",
    "source-shift-change", "source-volunteer-notice", "source-rumor-post-2021", "source-rumor-collage", "source-archive-index-nanqiao",
    "source-nanqiao-early", "source-nanqiao-resolved", "source-oldnews-search-xiaoling", "source-river-report-20040919",
    "source-river-followup-20040920", "source-heling-profile-2011", "source-heling-obituary-2016", "source-community-handout",
    "source-community-handout-provenance", "source-reprint-2020", "source-reprint-log", "source-same-name-chen", "source-same-name-chen-closure",
    "source-folklore-guren-heli", "source-folklore-reader-note", "source-folklore-pre2017-capture",
    "source-status-generation-rule", "source-status-generation-samples", "source-ritual-capture-timeline",
    "source-nanqiao-ghost-sedan", "source-cleanup-20170419", "source-ritual-status-capture", "source-chen-obituary-2017",
  ]);

  const SOURCES = deepFreeze([
    { id: "source-forum-opening", site_id: "site-chengnan-wenda", route: "/forum", source_type: "family-forum-opening", published_at: "2024-05-18T10:42:00+08:00", limits: "The opening post records the poster's family account at that time; it is not institutional verification." },
    { id: "source-attachment-front", site_id: "site-chengnan-wenda", route: "/files/img-1842", source_type: "family-attachment-transcript", published_at: "2024-05-18T10:42:00+08:00", limits: "The offline copy retains only a transcription and masked fields, not every detail of the original image." },
    { id: "source-forum-family-confirmation", site_id: "site-chengnan-wenda", route: "/forum", source_type: "family-identification-reply", published_at: "2024-05-18T12:51:00+08:00", limits: "The name and handwriting link comes from the poster and their mother, not a public identity system." },
    { id: "source-retired-helishu", site_id: "site-helishu", route: "/retired", source_type: "retired-page", limits: "The retired page gives only the original path and migration destination, not the old body." },
    { id: "source-archive-index-helishu", site_id: "site-page-time", route: "/archive/results/helishu", source_type: "capture-index", limits: "The index states what particular requests saved; uncaptured intervals cannot be filled in." },
    { id: "source-archive-meta-20170507", site_id: "site-page-time", route: "/archive/meta/20170507", source_type: "capture-metadata", published_at: "2017-04-18T20:31:00+08:00", captured_at: "2017-05-07T11:05:27+08:00", limits: "Response metadata supports a recapture of the same body, not proof that it never changed briefly in between." },
    { id: "source-helishu-20170418", site_id: "site-helishu", route: "/snapshot/20170418", source_type: "archived-guidance-page", published_at: "2017-04-18T20:31:00+08:00", captured_at: "2017-04-18T20:31:14+08:00", limits: "The page explains forms of address and public-message boundaries; it does not prove Chen Yuan printed or wrote on it that day." },
    { id: "source-helishu-migration-20170903", site_id: "site-helishu", route: "/snapshot/20170903", source_type: "migration-notice", published_at: "2017-09-03T09:42:00+08:00", captured_at: "2017-09-03T09:42:18+08:00", limits: "The notice gives a search destination, not the body of a Q&A or contract page." },
    { id: "source-record-hls06", site_id: "site-chengnan-records", route: "/records/dayi/HLS-170418-06", source_type: "public-answer-record", published_at: "2017-04-18T20:31:00+08:00", limits: "The record links a visitor ID and case ID but does not independently authenticate a real-world name." },
    { id: "source-case-p3d61", site_id: "site-chengnan-records", route: "/records/status/P-3D61", source_type: "case-status-record", limits: "The case page records registration, closure, and paper pickup, not motives for later enquiries." },
    { id: "source-visits-v7c2f", site_id: "site-chengnan-records", route: "/records/visits/V-7C2F", source_type: "visit-register", limits: "The register lists date, purpose, case ID, and handler fields, not complete conversations." },
    { id: "source-rules-v31", site_id: "site-chengnan-records", route: "/records/rules/v3.1", source_type: "service-rules", limits: "The rules classify process; they do not establish a family relationship, motive, or harm." },
    { id: "source-monthly-review", site_id: "site-chengnan-records", route: "/records/reviews/P-3D61", source_type: "monthly-audit-record", published_at: "2017-05-08T11:00:00+08:00", limits: "The review covers this site's intake, scan, and revision records only, not conduct outside the site." },
    { id: "source-withdrawn-hls07", site_id: "site-chengnan-records", route: "/records/index-actions/HLS-170418-07", source_type: "withdrawn-index-record", published_at: "2017-04-19T00:12:31+08:00", limits: "The public index keeps times, account, category, reason, and disposition; it does not retain the message body." },
    { id: "source-privacy-log", site_id: "site-chengnan-records", route: "/records/policy/public-message-v2", source_type: "privacy-action-log", limits: "A privacy-reason code explains public-index handling; it does not certify the hidden body as harmless." },
    { id: "source-zhao-profile", site_id: "site-helishu", route: "/person-snapshot/20170111", source_type: "archived-volunteer-profile", published_at: "2017-01-11T19:42:00+08:00", captured_at: "2017-01-11T19:42:08+08:00", limits: "The profile describes website duties and a display name, not private relationships or contact details." },
    { id: "source-zhao-staff-record", site_id: "site-chengnan-records", route: "/records/staff/ZY-014", source_type: "staff-directory", limits: "The directory links account, display name, volunteer ID, and public name; it does not prove private collusion." },
    { id: "source-duty-roster", site_id: "site-chengnan-records", route: "/records/duty/2017-04", source_type: "duty-roster", limits: "The roster gives public shifts and duties, not Q&A bodies or ritual content." },
    { id: "source-shift-change", site_id: "site-chengnan-records", route: "/records/duty/2017-04/changes", source_type: "shift-change-record", limits: "The change form places Zhao Ling on relief duty at 00:12; it says nothing about her knowledge of the family." },
    { id: "source-volunteer-notice", site_id: "site-chengnan-records", route: "/records/notices/2017-06-volunteers", source_type: "handover-notice", published_at: "2017-06-28T09:00:00+08:00", limits: "The handover message shows what Old Zhou called Zhao Ling and her response, not a supernatural identity." },
    { id: "source-rumor-post-2021", site_id: "site-chengnan-oldstories", route: "/chengnanli/topic/63192", source_type: "later-user-retelling", published_at: "2021-07-16T22:41:00+08:00", limits: "The 2021 user post is a later retelling with incomplete originals, dates, and ordering; it does not verify facts." },
    { id: "source-rumor-collage", site_id: "site-chengnan-oldstories", route: "/files/cn-63192-collage", source_type: "recomposed-collage", published_at: "2021-07-16T22:41:00+08:00", limits: "The long image rearranges smaller images and retains neither original filenames, creation times, nor ordering." },
    { id: "source-archive-index-nanqiao", site_id: "site-page-time", route: "/archive/results/nanqiao", source_type: "capture-index", limits: "The index lists captures for the exact URL; it cannot supply uncaptured attachments or site-search results." },
    { id: "source-nanqiao-early", site_id: "site-nanqiao-forum", route: "/rumor-snapshot/20040917a", source_type: "contemporary-forum-capture", published_at: "2004-09-17T01:10:00+08:00", captured_at: "2004-09-17T01:18:42+08:00", limits: "The early version records the missing-person request before the later family-contact update." },
    { id: "source-nanqiao-resolved", site_id: "site-nanqiao-forum", route: "/rumor-snapshot/20040917b", source_type: "contemporary-forum-capture", published_at: "2004-09-17T10:42:00+08:00", captured_at: "2004-09-17T10:46:20+08:00", limits: "The reply is a participant's public report, not He Ling's writing; contact and safety then do not disprove earlier harm." },
    { id: "source-oldnews-search-xiaoling", site_id: "site-oldnews", route: "/oldnews/search?keyword=Xiaoling&page=1", source_type: "fixed-search-result-set", limits: "Sound-alike and OCR expansion help find candidate pages; they do not replace checking full name, age, and region in the article." },
    { id: "source-river-report-20040919", site_id: "site-oldnews", route: "/oldnews/article/20040919-04", source_type: "contemporary-news-report", published_at: "2004-09-19T08:00:00+08:00", limits: "The subject is Lin Xiaoling, 52, from Dongjiang County; this source only excludes a mistaken link to He Ling." },
    { id: "source-river-followup-20040920", site_id: "site-oldnews", route: "/oldnews/article/20040920-02", source_type: "contemporary-news-followup", published_at: "2004-09-20T08:00:00+08:00", limits: "The follow-up says Lin Xiaoling contacted family and was unharmed; it does not prove He Ling was never harmed." },
    { id: "source-heling-profile-2011", site_id: "site-oldnews", route: "/oldnews/article/20110512-03", source_type: "later-profile-report", published_at: "2011-05-12T08:00:00+08:00", limits: "The profile describes He Ling's public work and life in 2011; it does not disprove earlier harm." },
    { id: "source-heling-obituary-2016", site_id: "site-oldnews", route: "/oldnews/notices/20161104-08", source_type: "independent-obituary", published_at: "2016-11-04T08:00:00+08:00", limits: "The obituary confirms He Ling's death date only; it gives no cause, address, or family names." },
    { id: "source-community-handout", site_id: "site-oldnews", route: "/files/community-handbook-2016", source_type: "community-handout", published_at: "2016-04-09T09:00:00+08:00", limits: "The handout has similar wording, but its credited author and source carrier differ from the main printed page." },
    { id: "source-community-handout-provenance", site_id: "site-oldnews", route: "/catalog/item/SQ-JY-2016-04/source", source_type: "catalog-provenance-record", limits: "The catalogue checks the handout's date, credited author, and carrier; it adds no family facts." },
    { id: "source-reprint-2020", site_id: "site-chengnan-oldstories", route: "/chengnanli/reprint/chengwei", source_type: "later-reprint", published_at: "2020-08-12T12:00:00+08:00", limits: "The later reprint retains similar text but cannot replace the source version, date, or editor credit." },
    { id: "source-reprint-log", site_id: "site-chengnan-oldstories", route: "/chengnanli/reprint/chengwei/log", source_type: "reprint-edit-log", limits: "The edit log shows how the reprint was rearranged and shortened, not what the source page itself contained." },
    { id: "source-same-name-chen", site_id: "site-chengnan-records", route: "/records/dayi/HLS-170418-09", source_type: "same-display-name-record", published_at: "2017-04-18T16:56:00+08:00", limits: "The display name 'Mr Chen' may repeat; this record's visitor and case IDs differ from the main case." },
    { id: "source-same-name-chen-closure", site_id: "site-chengnan-records", route: "/records/status/P-6B14", source_type: "false-path-closure-record", limits: "Stable IDs close the same-display-name false path; the record says nothing about Chen Yuan's other conduct." },
    { id: "source-folklore-guren-heli", site_id: "site-chengnan-oldstories", route: FOLKLORE_ROUTE, source_type: "local-oral-history-page", published_at: "2009-03-14T16:20:00+08:00", limits: "The page records Auntie Liu's title and red/white-rites relationship; it does not prove the account effective or widespread." },
    { id: "source-folklore-reader-note", site_id: "site-chengnan-oldstories", route: FOLKLORE_NOTE_ROUTE, source_type: "local-reader-followup", published_at: "2009-03-21T09:06:00+08:00", limits: "The page records one Nanqiao branch's saying and objects; it does not prove a ritual was performed." },
    { id: "source-folklore-pre2017-capture", site_id: "site-page-time", route: FOLKLORE_CAPTURE_ROUTE, source_type: "same-year-capture-index", captured_at: "2009-04-02T03:18:44+08:00", limits: "The independent index proves both pages were visible by April 2009, not that their oral account was factual." },
    { id: "source-status-generation-rule", site_id: "site-chengnan-records", route: STATUS_RULE_ROUTE, source_type: "status-generation-rule-v2.1", published_at: "2016-12-01T09:00:00+08:00", limits: "The public rule gives generator v2.1's normal conditions; it does not identify whether an anomaly came from failure, manual action, or another cause." },
    { id: "source-status-generation-samples", site_id: "site-chengnan-records", route: STATUS_SAMPLES_ROUTE, source_type: "ordinary-status-samples", published_at: "2017-04-18T18:05:00+08:00", limits: "The samples show ordinary field combinations, not the cause of the anomalous record." },
    { id: "source-ritual-capture-timeline", site_id: "site-page-time", route: "/archive/results/heqi-20170419", source_type: "capture-index", captured_at: "2017-04-19T00:19:08+08:00", limits: "Four capture points describe responses, not every intervening second. No public void page does not prove no offline handling." },
    { id: "source-nanqiao-ghost-sedan", site_id: "site-nanqiao-street-forum", route: SEDAN_ROUTE, source_type: "contemporary-eyewitness-post", published_at: "2017-04-19T01:37:00+08:00", limits: "A single post establishes only that someone publicly claimed to see a red sedan, not that the sighting was true or supernatural." },
    { id: "source-cleanup-20170419", site_id: "site-chengnan-records", route: CLEANUP_ROUTE, source_type: "municipal-cleanup-log", published_at: "2017-04-20T09:05:00+08:00", limits: "The next-day entry confirms cleanup on 19 April. The source of three charred bamboo splinters, a damp human-shaped paper scrap, and red cord is unknown and does not fully match the folklore." },
    { id: "source-ritual-status-capture", site_id: "site-helishu", route: RITUAL_CAPTURE_ROUTE, source_type: "archived-masked-contract-status", published_at: "2017-04-19T00:12:08+08:00", captured_at: "2017-04-19T00:12:08+08:00", limits: "The capture masks names and relationship label. It confirms an anonymous visitor, source Q&A, verification, and page status; HLS06 and family confirmation provide the fuller link, not proof of a true relationship or effective ritual." },
    { id: "source-chen-obituary-2017", site_id: "site-oldnews", route: CHEN_OBITUARY_ROUTE, source_type: "independent-obituary", published_at: "2017-04-27T08:00:00+08:00", limits: "The independent obituary confirms Chen Yuan's death date only; it gives no cause and establishes no causal link to the contract page." },
  ]);

  const CONTRACT = deepFreeze({
    project: { id: "ghost-matchmaker-webgame-v10-1-midnight-seven", title: "Ghost Matchmaker: Seven Minutes at Midnight", language: "en" },
    implementation: { public_routes_are_state_independent: true, story_state_controls_only_reactions_and_ui: true, storage_key: STORAGE_KEY, schema_version: SCHEMA_VERSION, reset_label: "Clear this browser session" },
    sources: SOURCES,
    claims: CLAIMS,
    puzzle_tokens: PUZZLE_TOKENS,
    puzzle_beats: PUZZLE_BEATS,
    hint_ladders: HINT_LADDERS,
    ending_branches: [ENDING_BRANCH],
  });

  function normalizeText(value) {
    return String(value ?? "").normalize("NFKC").trim().replace(/\s+/g, " ");
  }

  function normalizeCompact(value) {
    return normalizeText(value).replace(/\s+/g, "");
  }

  function normalizeKeyword(value) {
    return normalizeText(value);
  }

  function normalizeIdentifier(value) {
    return normalizeText(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
  }

  function normalizeURL(value) {
    const raw = normalizeText(value);
    if (!raw) return "";
    try {
      const parsed = new URL(raw);
      if (parsed.username || parsed.password || parsed.hash || parsed.search) return "";
      const port = parsed.port ? `:${parsed.port}` : "";
      const pathname = (parsed.pathname || "/").replace(/\/{2,}/g, "/").toLowerCase();
      return `${parsed.protocol.toLowerCase()}//${parsed.hostname.toLowerCase()}${port}${pathname}`;
    } catch (_error) {
      return "";
    }
  }

  function normalizeDate(value) {
    const text = normalizeText(value)
      .replace(/[\u5e74/.]/g, "-")
      .replace(/\u6708/g, "-")
      .replace(/\u65e5/g, "")
      .replace(/-+/g, "-");
    const match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
    if (!match) return text;
    return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
  }

  function calendarDayDifference(startValue, endValue) {
    const start = normalizeDate(startValue).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    const end = normalizeDate(endValue).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!start || !end) return Number.NaN;
    const startUTC = Date.UTC(Number(start[1]), Number(start[2]) - 1, Number(start[3]));
    const endUTC = Date.UTC(Number(end[1]), Number(end[2]) - 1, Number(end[3]));
    return (endUTC - startUTC) / 86400000;
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    })[character]);
  }

  function toArray(value) {
    if (Array.isArray(value)) return value;
    if (value === undefined || value === null || value === "") return [];
    return [value];
  }

  function uniqueStrings(value, normalizer = normalizeText) {
    return [...new Set(toArray(value).map(normalizer).filter(Boolean))];
  }

  function hasDuplicateStrings(value, normalizer = normalizeText) {
    const normalized = toArray(value).map(normalizer).filter(Boolean);
    return normalized.length !== new Set(normalized).size;
  }

  function sameStringSet(actual, expected, normalizer = normalizeText) {
    const left = uniqueStrings(actual, normalizer).sort();
    const right = uniqueStrings(expected, normalizer).sort();
    return left.length === right.length && left.every((value, index) => value === right[index]);
  }

  function containsAll(actual, expected, normalizer = normalizeText) {
    const values = new Set(uniqueStrings(actual, normalizer));
    return expected.map(normalizer).every((value) => values.has(value));
  }

  function makeValidation(errors, normalized, warnings = []) {
    return {
      ok: errors.length === 0,
      errors: [...new Set(errors)],
      warnings: [...new Set(warnings)],
      normalized: deepFreeze(normalized),
    };
  }

  function payloadObject(payload, field = "value") {
    return isPlainObject(payload) ? payload : { [field]: payload };
  }

  function validateArchiveHelishu(payload) {
    const input = payloadObject(payload, "url");
    const url = normalizeURL(input.url);
    const errors = [];
    if (!url) errors.push(normalizeText(input.url) ? "malformed-url" : "empty-url");
    else if (url === normalizeURL(SAVED_URL) || url.includes("/go/chengwei")) errors.push("redirect-url");
    else if (url !== normalizeURL(ORIGINAL_URL)) errors.push("wrong-url");
    return makeValidation(errors, { url });
  }

  function validateCompareHelishu(payload) {
    const input = payloadObject(payload);
    const captures = uniqueStrings(input.captures ?? input.comparePair ?? input.pair, (value) => normalizeCompact(value).toLowerCase());
    const findings = new Set(uniqueStrings(input.findings, (value) => normalizeCompact(value).toLowerCase()));
    const mode = normalizeCompact(input.mode ?? input.comparisonMode).toLowerCase();
    const pageDate = normalizeDate(input.pageDate ?? input.date);
    const editor = normalizeCompact(input.editor);
    const interpretation = normalizeCompact(input.interpretation ?? input.captureInterpretation).toLowerCase();
    const code = normalizeIdentifier(input.code ?? input.hlsCode);
    const quote = input.quoteId === "quote-complete" ? COMPLETE_QUOTE : input.quote;
    const errors = [];
    if (!sameStringSet(captures, ["20170418", "20170507"], (value) => normalizeCompact(value).toLowerCase())) errors.push("capture-pair");
    if (!["body-meta", "body-and-meta", "\u6b63\u6587\u4e0e\u54cd\u5e94\u4fe1\u606f", "\u6b63\u6587\u7ea7\u6bd4\u8f83"].includes(mode)) errors.push("comparison-mode");
    if (pageDate !== "2017-04-18" && !findings.has("page-date-20170418")) errors.push("page-date");
    if (!["xiaoling", "\u5c0f\u7075"].includes(foldLatin(editor).replace(/\s+/g, "")) && !findings.has("editor-xiaoling")) errors.push("editor");
    if (!["same-body-recapture", "duplicate-capture", "\u76f8\u540c\u6b63\u6587\u518d\u6355\u83b7"].includes(interpretation) && !findings.has("same-body-recapture")) errors.push("capture-meaning");
    if (!matchesCompleteQuote(quote) && !findings.has("complete-quote")) errors.push("complete-quote");
    if (code !== normalizeIdentifier(ANSWER_CODE)) errors.push("hls-code");
    return makeValidation(errors, { captures: captures.sort(), mode: "body-meta", pageDate: "2017-04-18", editor: "Xiao Ling", interpretation: "same-body-recapture", quote: COMPLETE_QUOTE, code: ANSWER_CODE });
  }

  function validateLookupHls06(payload) {
    const input = payloadObject(payload, "code");
    const code = normalizeIdentifier(input.code ?? input.value);
    const errors = [];
    if (!code) errors.push("empty-code");
    else if (code !== normalizeIdentifier(ANSWER_CODE)) errors.push("wrong-code");
    return makeValidation(errors, { code: ANSWER_CODE });
  }

  function validateProcedureClassification(payload) {
    const input = payloadObject(payload);
    const dates = uniqueStrings(input.dates, normalizeDate);
    const issue = normalizeCompact(input.issue).toLowerCase();
    const clauses = uniqueStrings(input.clauses, (value) => normalizeCompact(value).replace(/^\u7b2c/, "").replace(/\u6761$/, ""));
    const boundaries = uniqueStrings(input.boundaries ?? input.notProved, (value) => normalizeCompact(value).toLowerCase());
    const errors = [];
    const allowedClauses = new Set(["12", "13", "14", "16"]);
    if (dates.includes("2017-02-11")) errors.push("allowed-pickup");
    if (!sameStringSet(dates, ["2017-02-23", "2017-03-06", "2017-03-20"], normalizeDate)) errors.push("visit-dates");
    if (!["closed-item-reused", "old-item-reused", "\u5df2\u529e\u7ed3\u4e8b\u9879\u7f16\u53f7\u88ab\u7ee7\u7eed\u6cbf\u7528"].includes(issue)) errors.push("issue");
    if (!containsAll(clauses, ["12", "13"], normalizeCompact)) errors.push("required-clauses");
    if (clauses.some((clause) => !allowedClauses.has(clause))) errors.push("unrelated-clauses");
    if (!sameStringSet(boundaries, ["no-new-paper", "no-scan", "no-revision"], (value) => normalizeCompact(value).toLowerCase())) errors.push("proof-boundary");
    return makeValidation(errors, {
      dates: ["2017-02-23", "2017-03-06", "2017-03-20"],
      issue: "closed-item-reused",
      clauses: clauses.sort(),
      boundaries: ["no-new-paper", "no-scan", "no-revision"],
      note: normalizeText(input.note).slice(0, 500),
    });
  }

  function validateZhaoTriangulation(payload) {
    const input = payloadObject(payload);
    const matches = isPlainObject(input.matches) ? input.matches : {};
    const account = normalizeCompact(input.account ?? matches.account).toLowerCase();
    const displayName = normalizeCompact(input.displayName ?? matches.displayName);
    const staffId = normalizeIdentifier(input.staffId ?? matches.staffId);
    const realName = normalizeCompact(input.realName ?? matches.realName);
    const actionTime = normalizeText(input.actionTime ?? matches.actionTime);
    const shiftId = normalizeIdentifier(input.shiftId ?? matches.shiftId);
    const privacyCode = normalizeIdentifier(input.privacyCode ?? matches.privacyCode);
    const privacyMeaning = normalizeCompact(input.privacyMeaning ?? matches.privacyMeaning).toLowerCase();
    const privacyLimits = uniqueStrings(input.privacyLimits ?? matches.privacyLimits, (value) => normalizeCompact(value).toLowerCase());
    const errors = [];
    if (account !== "xiaoling") errors.push("account");
    if (!["xiaoling", "\u5c0f\u7075"].includes(foldLatin(displayName).replace(/\s+/g, ""))) errors.push("display-name");
    if (staffId !== "ZY014") errors.push("staff-id");
    if (!["zhaoling", "\u8d75\u7075"].includes(foldLatin(realName).replace(/\s+/g, ""))) errors.push("real-name");
    if (!["00:12", "2017-04-19 00:12", "2017-04-19 00:12:31"].includes(actionTime)) errors.push("action-time");
    if (shiftId !== "DH17041802") errors.push("shift");
    if (privacyCode !== "PRI02") errors.push("privacy-code");
    if (!["hide-and-offline", "\u505c\u6b62\u516c\u5f00\u5e76\u8f6c\u7ebf\u4e0b", "index-hide-only"].includes(privacyMeaning)) errors.push("privacy-meaning");
    if (!sameStringSet(privacyLimits, ["not-harmless-proof", "not-collusion-proof"], (value) => normalizeCompact(value).toLowerCase())) errors.push("privacy-limits");
    return makeValidation(errors, {
      account: "xiaoling", displayName: "Xiao Ling", staffId: "ZY-014", realName: "Zhao Ling",
      actionTime: "2017-04-19 00:12", shiftId: "DH-170418-02", privacyCode: "PRI-02",
      privacyMeaning: "hide-and-offline", privacyLimits: ["not-harmless-proof", "not-collusion-proof"],
    });
  }

  function validateGhostName(payload) {
    const input = payloadObject(payload);
    const speaker = normalizeCompact(input.speaker);
    const referent = normalizeCompact(input.referent);
    const response = normalizeCompact(input.response).toLowerCase();
    const classification = normalizeCompact(input.classification).toLowerCase();
    const errors = [];
    if (!["oldzhou", "\u8001\u5468"].includes(foldLatin(speaker).replace(/\s+/g, ""))) errors.push("speaker");
    if (!["zhaoling", "zy014", "\u8d75\u7075"].includes(foldLatin(referent).replace(/\s|-/g, ""))) errors.push("referent");
    if (!["not-liked", "disliked", "objected", "\u4e0d\u7231\u542c", "\u53cd\u611f", "\u660e\u786e\u4e0d\u559c\u6b22"].includes(response)) errors.push("response");
    if (!["unwanted-colleague-nickname", "colleague-nickname", "\u540c\u4e8b\u8d8a\u754c\u5916\u53f7", "\u540c\u4e8b\u5916\u53f7"].includes(classification)) errors.push("classification");
    return makeValidation(errors, { speaker: "Old Zhou", referent: "Zhao Ling", response: "not-liked", classification: "unwanted-colleague-nickname" });
  }

  function validateOldNewsSearch(payload) {
    const input = payloadObject(payload, "keyword");
    const keyword = normalizeKeyword(input.keyword ?? input.value);
    const matches = searchPersonIdentities(keyword);
    const errors = [];
    if (!keyword) errors.push("empty-keyword");
    else if (!matches.length) errors.push("no-matching-name-set");
    return makeValidation(errors, { keyword, matchedIdentityKeys: matches.map((person) => person.key), resultIds: NEWS_RESULTS.map((result) => result.id), total: 12, pages: 2, pageSize: 10 });
  }

  function validateRiverClassification(payload) {
    const input = payloadObject(payload);
    const findings = new Set(uniqueStrings(input.findings, (value) => normalizeCompact(value).toLowerCase()));
    const fullName = normalizeCompact(input.fullName);
    const age = normalizeCompact(input.age);
    const region = normalizeCompact(input.region);
    const foundObject = normalizeCompact(input.foundObject ?? input.found);
    const followup = normalizeCompact(input.followup).toLowerCase();
    const errors = [];
    if (!["linxiaoling", "\u6797\u6653\u73b2"].includes(foldLatin(fullName).replace(/\s+/g, "")) && !findings.has("name-lin-xiaoling")) errors.push("full-name");
    if (!["52", "52\u5c81", "age52"].includes(foldLatin(age).replace(/\s+/g, "")) && !findings.has("age-52")) errors.push("age");
    if (!["dongjiangcounty", "dongjiangcountydongjintown", "\u4e1c\u6c5f\u53bf", "\u4e1c\u6c5f\u53bf\u4e1c\u6d25\u9547"].includes(foldLatin(region).replace(/\s+/g, "")) && !findings.has("region-dongjiang")) errors.push("region");
    if (!["bicycle", "bike", "\u81ea\u884c\u8f66"].includes(foldLatin(foundObject).replace(/\s+/g, "")) && !findings.has("found-bicycle")) errors.push("found-object");
    if (!["safe", "person-safe", "\u672c\u4eba\u5b89\u5168", "\u8eab\u4f53\u65e0\u788d"].includes(followup) && !findings.has("followup-safe")) errors.push("followup");
    return makeValidation(errors, { fullName: "Lin Xiaoling", age: "52", region: "Dongjiang County", foundObject: "bicycle", followup: "person-safe" });
  }

  function validateArchiveNanqiao(payload) {
    const input = payloadObject(payload, "url");
    const url = normalizeURL(input.url);
    const errors = [];
    if (!url) errors.push(normalizeText(input.url) ? "malformed-url" : "empty-url");
    else if (url !== normalizeURL(RUMOR_URL)) errors.push("wrong-url");
    return makeValidation(errors, { url: normalizeURL(RUMOR_URL) });
  }

  function validateCompareNanqiao(payload) {
    const input = payloadObject(payload);
    const captures = uniqueStrings(input.captures ?? input.comparePair ?? input.pair, (value) => normalizeCompact(value).toLowerCase());
    const findings = uniqueStrings(input.findings, (value) => normalizeCompact(value).toLowerCase());
    const requiredFindings = ["at-sister", "close-thread", "not-divorced", "refused-discussion", "waited-at-factory-gate"];
    const errors = [];
    if (!sameStringSet(captures, ["20040917a", "20040917b"], (value) => normalizeCompact(value).toLowerCase())) errors.push("capture-pair");
    if (!sameStringSet(findings, requiredFindings, (value) => normalizeCompact(value).toLowerCase())) errors.push("continuation-fields");
    return makeValidation(errors, { captures: ["20040917a", "20040917b"], findings: requiredFindings });
  }

  const TIMELINE_EXPECTED = deepFreeze({
    "claim-river-report-is-heling": "disproved",
    "claim-heling-died-2016": "confirmed",
    "claim-relation-restated-after-heling-death": "confirmed",
    "claim-sexual-assault-occurred": "unresolved",
    "claim-heling-death-cause": "unresolved",
  });

  function validatePosthumousRelation(payload) {
    const input = payloadObject(payload);
    const sources = uniqueStrings(input.sources, (value) => normalizeCompact(value).toLowerCase());
    const firstDate = normalizeDate(input.firstDate);
    const secondDate = normalizeDate(input.secondDate);
    const relation = normalizeCompact(input.relation);
    const errors = [];
    if (hasDuplicateStrings(input.sources, (value) => normalizeCompact(value).toLowerCase())) errors.push("duplicate-selection");
    if (!sameStringSet(sources, ["heling-obituary", "hls06-answer"], (value) => normalizeCompact(value).toLowerCase())) errors.push("posthumous-sources");
    if (firstDate !== "2016-10-28") errors.push("posthumous-first-date");
    if (secondDate !== "2017-04-18") errors.push("posthumous-second-date");
    if (!["younger-female-cousin", "younger female cousin", "biaomei", "\u8868\u59b9"].includes(foldLatin(relation).replace(/\s+/g, " "))) errors.push("posthumous-relation");
    return makeValidation(errors, { sources: ["heling-obituary", "hls06-answer"], firstDate: "2016-10-28", secondDate: "2017-04-18", relation: "younger-female-cousin" });
  }

  function validateHls07Midnight(payload) {
    const input = payloadObject(payload);
    const samples = uniqueStrings(input.samples, (value) => normalizeCompact(value).toUpperCase());
    const order = toArray(input.order).map(normalizeText);
    const pendingState = normalizeCompact(input.pendingState);
    const completeRequirements = uniqueStrings(input.completeRequirements, normalizeCompact);
    const anomalousFields = uniqueStrings(input.anomalousFields, normalizeCompact);
    const leadSeconds = Number.parseInt(input.leadSeconds, 10);
    const windowMinutes = Number.parseInt(input.windowMinutes, 10);
    const bodyState = normalizeCompact(input.bodyState).toLowerCase();
    const errors = [];
    if (!sameStringSet(samples, ["ZT-170414-06", "GH-170417-03"], (value) => normalizeCompact(value).toUpperCase())) errors.push("midnight-samples");
    if (order.length !== 4 || order.some((value, index) => value !== ["2017-04-18 23:46", "2017-04-19 00:12:08", "2017-04-19 00:12:31", "2017-04-19 00:19:08"][index])) errors.push("midnight-order");
    if (!["pending", "\u6682\u5b58"].includes(foldLatin(pendingState))) errors.push("midnight-pending-state");
    const completeRequirementAliases = completeRequirements.map((value) => ({
      "\u5173\u7cfb\u6838\u9a8c：\u5df2\u6838": "relation-verified",
      "\u7ebf\u4e0b\u590d\u6838：\u5b8c\u6210": "offline-review-complete",
      "\u590d\u6838\u5458\u5b57\u6bb5：\u975e\u7a7a": "reviewer-present",
      "relationship-verified": "relation-verified",
      "reviewer-nonempty": "reviewer-present",
    }[value] || foldLatin(value).replace(/\s+/g, "-")));
    const anomalousFieldAliases = anomalousFields.map((value) => ({
      "\u5173\u7cfb\u6838\u9a8c：\u5f85\u8865": "relation-pending",
      "\u5408\u793c\u72b6\u6001：\u5951\u6210": "contract-formed",
      "relationship-pending": "relation-pending",
    }[value] || foldLatin(value).replace(/\s+/g, "-")));
    if (!sameStringSet(completeRequirementAliases, ["relation-verified", "offline-review-complete", "reviewer-present"], normalizeCompact)) errors.push("midnight-complete-requirements");
    if (!sameStringSet(anomalousFieldAliases, ["relation-pending", "contract-formed"], normalizeCompact)) errors.push("midnight-anomalous-fields");
    if (leadSeconds !== 23) errors.push("midnight-lead-seconds");
    if (windowMinutes !== 7) errors.push("midnight-window-minutes");
    if (bodyState !== "unavailable") errors.push("midnight-body");
    return makeValidation(errors, {
      samples: ["ZT-170414-06", "GH-170417-03"],
      order: ["2017-04-18 23:46", "2017-04-19 00:12:08", "2017-04-19 00:12:31", "2017-04-19 00:19:08"],
      pendingState: "pending",
      completeRequirements: ["relation-verified", "offline-review-complete", "reviewer-present"],
      anomalousFields: ["relation-pending", "contract-formed"],
      leadSeconds: 23,
      windowMinutes: 7,
      bodyState: "unavailable",
    });
  }

  function validateGhostMatchmakerTradition(payload) {
    const input = payloadObject(payload);
    const pages = uniqueStrings(input.pages, (value) => normalizeCompact(value).toLowerCase());
    const pageDate = normalizeDate(input.pageDate);
    const noteDate = normalizeDate(input.noteDate);
    const captureDate = normalizeDate(input.captureDate);
    const laterUse = normalizeDate(input.laterUse);
    const term = normalizeCompact(input.term);
    const oralSource = normalizeCompact(input.oralSource);
    const scope = normalizeCompact(input.scope);
    const rule = normalizeCompact(input.rule);
    const errors = [];
    if (!sameStringSet(pages, ["interview", "reader-note", "archive-proof"], (value) => normalizeCompact(value).toLowerCase())) errors.push("folklore-pages");
    if (pageDate !== "2009-03-14") errors.push("folklore-page-date");
    if (noteDate !== "2009-03-21") errors.push("folklore-note-date");
    if (captureDate !== "2009-04-02") errors.push("folklore-capture-date");
    if (laterUse !== "2017-06-28") errors.push("folklore-later-date");
    if (!["ghostmatchmaker", "\u9b3c\u5a92\u5a46"].includes(foldLatin(term).replace(/\s+/g, ""))) errors.push("folklore-term");
    if (!["liuguixiangauntieliu", "liuguixiangneighbourscallherauntieliu", "auntieliu", "\u67f3\u6842\u9999\uff08\u67f3\u59d1\uff09", "\u67f3\u6842\u9999\uff08\u8857\u574a\u79f0\u67f3\u59d1\uff09"].includes(foldLatin(oralSource).replace(/[^a-z0-9\u3400-\u9fff]/g, ""))) errors.push("folklore-oral-source");
    if (!["nanqiaobranch", "onenanqiaobranch", "\u5357\u6865\u4e00\u652f"].includes(foldLatin(scope).replace(/\s+/g, ""))) errors.push("folklore-scope");
    const englishRule = "If a living person's name enters the column for the dead and is not removed within seven days, the living name belongs to the white rites.";
    if (!["livingnamesevendayrule", foldLatin(englishRule).replace(/\s+/g, ""), foldLatin("\u6d3b\u4eba\u540d\u843d\u6545\u4eba\u680f\uff0c\u4e03\u65e5\u4e0d\u64a4\uff0c\u6d3b\u540d\u5f52\u767d\u4e8b\u3002").replace(/\s+/g, "")].includes(foldLatin(rule).replace(/\s+/g, ""))) errors.push("folklore-rule");
    return makeValidation(errors, { pages: ["interview", "reader-note", "archive-proof"], pageDate: "2009-03-14", noteDate: "2009-03-21", captureDate: "2009-04-02", laterUse: "2017-06-28", term: "Ghost Matchmaker", oralSource: "Liu Guixiang (Auntie Liu)", scope: "Nanqiao branch", rule: englishRule });
  }

  function validateGhostSedanTriangulation(payload) {
    const input = payloadObject(payload);
    const sources = uniqueStrings(input.sources, (value) => normalizeCompact(value).toLowerCase());
    const matches = uniqueStrings(input.matches, (value) => normalizeCompact(value).toLowerCase());
    const errors = [];
    if (hasDuplicateStrings(input.sources, (value) => normalizeCompact(value).toLowerCase())) errors.push("duplicate-selection");
    if (hasDuplicateStrings(input.matches, (value) => normalizeCompact(value).toLowerCase())) errors.push("duplicate-selection");
    if (!sameStringSet(sources, ["forum-sedan", "cleanup-log", "folklore-page", "hls07-midnight"], (value) => normalizeCompact(value).toLowerCase())) errors.push("sedan-sources");
    if (!sameStringSet(matches, ["same-night", "same-lane", "paper-figure", "red-cord"], (value) => normalizeCompact(value).toLowerCase())) errors.push("sedan-matches");
    return makeValidation(errors, { sources: ["forum-sedan", "cleanup-log", "folklore-page", "hls07-midnight"], matches: ["same-night", "same-lane", "paper-figure", "red-cord"] });
  }

  function validateSevenDayRule(payload) {
    const input = payloadObject(payload);
    const ritualDate = normalizeDate(input.ritualDate);
    const deathDate = normalizeDate(input.deathDate);
    const interval = Number.parseInt(input.interval, 10);
    const computedInterval = calendarDayDifference(ritualDate, deathDate);
    const noticeDate = normalizeDate(input.noticeDate);
    const errors = [];
    if (ritualDate !== "2017-04-19") errors.push("seven-day-start");
    if (deathDate !== "2017-04-26") errors.push("seven-day-end");
    if (interval !== 7 || computedInterval !== 7) errors.push("seven-day-interval");
    if (noticeDate !== "2017-04-27") errors.push("seven-day-notice-date");
    return makeValidation(errors, { ritualDate: "2017-04-19", deathDate: "2017-04-26", interval: computedInterval, noticeDate: "2017-04-27" });
  }

  const ENDING_REQUIRED_TOKENS = deepFreeze([
    "token-helishu-capture-set", "token-hls06-code", "token-visitor-v7c2f", "token-oldnews-result-set",
    "token-river-exclusion", "token-nanqiao-capture-set", "token-2004-continuation",
    "token-posthumous-relation", "token-hls07-midnight", "token-folklore-rule",
    "token-ghost-sedan-cluster", "token-seven-day-rule-match",
  ]);
  const ENDING_SOURCE_GROUPS = deepFreeze(["original", "public-web", "date-comparison", "unresolved"]);

  function validateArchiveBagSubmission(payload, context = {}) {
    const input = payloadObject(payload);
    const tokenValues = context.earnedTokenIds instanceof Set ? [...context.earnedTokenIds] : toArray(context.earnedTokenIds);
    const tokenSet = new Set(tokenValues.map(String));
    const errors = [];
    for (const tokenId of ENDING_REQUIRED_TOKENS) if (!tokenSet.has(tokenId)) errors.push(`missing-token:${tokenId}`);
    if (!["younger-female-cousin", "younger female cousin", "biaomei", "\u8868\u59b9"].includes(foldLatin(input.originalRelation).replace(/\s+/g, " "))) errors.push("archive-original-relation");
    if (normalizeCompact(input.realRelation).toLowerCase() !== "unverified") errors.push("archive-real-relation");
    if (normalizeCompact(input.hls07Body).toLowerCase() !== "unavailable") errors.push("archive-hls-body");
    if (normalizeCompact(input.heLingDeathCause).toLowerCase() !== "unconfirmed") errors.push("archive-heling-cause");
    if (normalizeCompact(input.chenDeathCause).toLowerCase() !== "unconfirmed") errors.push("archive-chen-cause");
    if (normalizeCompact(input.anomalyMeaning).toLowerCase() !== "documented-rule-conflict") errors.push("archive-anomaly-meaning");
    if (normalizeCompact(input.supernaturalCause).toLowerCase() !== "unresolved") errors.push("archive-supernatural-cause");
    if (normalizeCompact(input.relationAction).toLowerCase() !== "leave-blank") errors.push("archive-relationship-action");
    return makeValidation(errors, {
      originalRelation: "younger-female-cousin",
      realRelation: "unverified",
      hls07Body: "unavailable",
      heLingDeathCause: "unconfirmed",
      chenDeathCause: "unconfirmed",
      anomalyMeaning: "documented-rule-conflict",
      supernaturalCause: "unresolved",
      relationAction: "leave-blank",
    });
  }

  const BEAT_VALIDATORS = Object.freeze({
    "puzzle-archive-helishu": validateArchiveHelishu,
    "puzzle-compare-helishu-versions": validateCompareHelishu,
    "puzzle-lookup-hls06": validateLookupHls06,
    "puzzle-classify-procedure": validateProcedureClassification,
    "puzzle-triangulate-zhao": validateZhaoTriangulation,
    "puzzle-trace-ghost-name": validateGhostName,
    "puzzle-search-oldnews": validateOldNewsSearch,
    "puzzle-classify-river": validateRiverClassification,
    "puzzle-archive-nanqiao": validateArchiveNanqiao,
    "puzzle-compare-nanqiao": validateCompareNanqiao,
    "puzzle-compare-posthumous-relation": validatePosthumousRelation,
    "puzzle-inspect-hls07-midnight": validateHls07Midnight,
    "puzzle-trace-ghost-matchmaker-tradition": validateGhostMatchmakerTradition,
    "puzzle-triangulate-ghost-sedan": validateGhostSedanTriangulation,
    "puzzle-compare-seven-day-rule": validateSevenDayRule,
    "puzzle-submit-archive-bag": validateArchiveBagSubmission,
  });

  function validateBeat(beatId, payload, context = {}) {
    const validator = BEAT_VALIDATORS[String(beatId || "")];
    if (!validator) return makeValidation(["unknown-beat"], {}, []);
    const hasProgressContext = context && (
      context.earnedTokenIdSet instanceof Set
      || context.earnedTokenIds instanceof Set
      || Array.isArray(context.earnedTokenIds)
    );
    if (hasProgressContext) {
      const earned = context.earnedTokenIdSet instanceof Set
        ? context.earnedTokenIdSet
        : new Set(context.earnedTokenIds instanceof Set ? [...context.earnedTokenIds] : context.earnedTokenIds);
      const missing = requiredProducedInputTokenIds(beatId).filter((tokenId) => !earned.has(tokenId));
      if (missing.length) return makeValidation(missing.map((tokenId) => `missing-input-token:${tokenId}`), {}, []);
    }
    return validator(payload, context);
  }

  function createInitialState() {
    return {
      schemaVersion: SCHEMA_VERSION,
      eventLog: [],
      evidenceHistory: [],
      queryContexts: {},
      drafts: {},
      hints: {},
    };
  }

  function safeTimestamp(value) {
    const text = normalizeText(value);
    return text && !Number.isNaN(Date.parse(text)) ? text : new Date(0).toISOString();
  }

  function deriveFromValidatedEvents(events) {
    const completedBeatIds = [];
    const completed = new Set();
    const earned = new Set();
    const postedReactionIds = [];
    const posted = new Set();
    const read = new Set();
    let endingId = null;

    for (const event of events) {
      if (event.type === "beat.completed" && BEATS_BY_ID[event.beatId] && !completed.has(event.beatId)) {
        completed.add(event.beatId);
        completedBeatIds.push(event.beatId);
        for (const tokenId of BEATS_BY_ID[event.beatId].output_token_ids) earned.add(tokenId);
      } else if (event.type === "reaction.posted" && REACTIONS.some((reaction) => reaction.id === event.reactionId) && !posted.has(event.reactionId)) {
        posted.add(event.reactionId);
        postedReactionIds.push(event.reactionId);
      } else if (event.type === "reaction.read" && posted.has(event.reactionId)) {
        read.add(event.reactionId);
      } else if (event.type === "ending.completed" && event.endingId === ENDING_BRANCH.id) {
        endingId = ENDING_BRANCH.id;
      }
    }

    const unreadReaction = [...postedReactionIds].reverse().find((reactionId) => !read.has(reactionId)) || null;
    const firstUnposted = REACTIONS.find((reaction) => !posted.has(reaction.id)) || null;
    const readyReactionId = !unreadReaction && firstUnposted && firstUnposted.readyAfterBeatIds.every((beatId) => completed.has(beatId))
      ? firstUnposted.id
      : null;
    const stageIds = [...new Set(PUZZLE_BEATS.map((beat) => beat.stage_id))];
    const completedStageIds = stageIds.filter((stageId) => (
      PUZZLE_BEATS.filter((beat) => beat.stage_id === stageId).every((beat) => completed.has(beat.id))
    ));

    return {
      completedBeatIds,
      completedBeatIdSet: completed,
      earnedTokenIds: [...earned],
      earnedTokenIdSet: earned,
      postedReactionIds,
      unreadReactionId: unreadReaction,
      readyReactionId,
      completedStageIds,
      endingId,
      storyComplete: endingId === ENDING_BRANCH.id,
    };
  }

  function nextPostableReaction(events) {
    const progress = deriveFromValidatedEvents(events);
    if (progress.unreadReactionId) return null;
    const next = REACTIONS.find((reaction) => !progress.postedReactionIds.includes(reaction.id));
    if (!next) return null;
    return next.readyAfterBeatIds.every((beatId) => progress.completedBeatIdSet.has(beatId)) ? next : null;
  }

  function sanitizeEventLog(value) {
    const input = Array.isArray(value) ? value.slice(0, 200) : [];
    const clean = [];
    for (const candidate of input) {
      if (!isPlainObject(candidate)) continue;
      if (candidate.type === "beat.completed") {
        const beatId = String(candidate.beatId || "");
        if (!BEATS_BY_ID[beatId]) continue;
        const progress = deriveFromValidatedEvents(clean);
        if (progress.completedBeatIdSet.has(beatId)) continue;
        const result = validateBeat(beatId, candidate.normalizedAnswer ?? candidate.answer ?? {}, progress);
        if (!result.ok) continue;
        clean.push({
          seq: clean.length + 1,
          type: "beat.completed",
          beatId,
          normalizedAnswer: result.normalized,
          at: safeTimestamp(candidate.at),
        });
      } else if (candidate.type === "reaction.posted") {
        const next = nextPostableReaction(clean);
        if (!next || candidate.reactionId !== next.id) continue;
        clean.push({ seq: clean.length + 1, type: "reaction.posted", reactionId: next.id, at: safeTimestamp(candidate.at) });
      } else if (candidate.type === "reaction.read") {
        const progress = deriveFromValidatedEvents(clean);
        if (!progress.unreadReactionId || candidate.reactionId !== progress.unreadReactionId) continue;
        clean.push({ seq: clean.length + 1, type: "reaction.read", reactionId: candidate.reactionId, at: safeTimestamp(candidate.at) });
      } else if (candidate.type === "ending.completed") {
        const progress = deriveFromValidatedEvents(clean);
        if (progress.endingId || !progress.completedBeatIdSet.has("puzzle-submit-archive-bag") || !progress.postedReactionIds.includes("reaction-archive-bag")) continue;
        clean.push({ seq: clean.length + 1, type: "ending.completed", endingId: ENDING_BRANCH.id, at: safeTimestamp(candidate.at) });
      }
    }
    return clean;
  }

  function sanitizeSimpleDraft(value, depth = 0) {
    if (depth > 2) return undefined;
    if (typeof value === "string") return value.slice(0, 2000);
    if (typeof value === "boolean" || (typeof value === "number" && Number.isFinite(value))) return value;
    if (Array.isArray(value)) return value.slice(0, 40).map((item) => sanitizeSimpleDraft(item, depth + 1)).filter((item) => item !== undefined);
    if (!isPlainObject(value)) return undefined;
    const clean = {};
    for (const [key, item] of Object.entries(value).slice(0, 40)) {
      if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key)) continue;
      const next = sanitizeSimpleDraft(item, depth + 1);
      if (next !== undefined) clean[key] = next;
    }
    return clean;
  }

  function sanitizeState(raw) {
    if (!isPlainObject(raw) || raw.schemaVersion !== SCHEMA_VERSION) return createInitialState();
    const sourceIdSet = new Set(SOURCE_IDS);
    const evidenceHistory = [];
    for (const entry of Array.isArray(raw.evidenceHistory) ? raw.evidenceHistory.slice(-200) : []) {
      if (typeof entry === "string" && (sourceIdSet.has(entry) || isPublicRoute(entry))) evidenceHistory.push(entry);
      else if (isPlainObject(entry)) {
        const sourceId = sourceIdSet.has(entry.sourceId) ? entry.sourceId : "";
        const route = isPublicRoute(entry.route) ? normalizeRoute(entry.route) : "";
        if (sourceId || route) evidenceHistory.push({ sourceId, route, at: safeTimestamp(entry.at) });
      }
    }

    const queryContexts = {};
    if (isPlainObject(raw.queryContexts)) {
      const allowed = new Set(["search-page-time", "search-chengnan-records", "search-oldnews"]);
      for (const [key, context] of Object.entries(raw.queryContexts)) {
        if (!allowed.has(key) || !isPlainObject(context)) continue;
        queryContexts[key] = {
          term: normalizeText(context.term).slice(0, 400),
          page: Math.max(1, Math.min(99, Number.parseInt(context.page, 10) || 1)),
          focusId: normalizeText(context.focusId).slice(0, 100),
        };
      }
    }

    const drafts = {};
    if (isPlainObject(raw.drafts)) {
      for (const [key, value] of Object.entries(raw.drafts).slice(0, 20)) {
        if (!/^[a-zA-Z0-9_-]{1,64}$/.test(key)) continue;
        const clean = sanitizeSimpleDraft(value);
        if (clean !== undefined) drafts[key] = clean;
      }
    }

    const hints = {};
    if (isPlainObject(raw.hints)) {
      for (const beat of PUZZLE_BEATS) {
        const hint = raw.hints[beat.id];
        if (!isPlainObject(hint)) continue;
        hints[beat.id] = {
          rung: Math.max(0, Math.min(4, Number.parseInt(hint.rung, 10) || 0)),
          attempts: Math.max(0, Math.min(99, Number.parseInt(hint.attempts, 10) || 0)),
          returns: Math.max(0, Math.min(99, Number.parseInt(hint.returns, 10) || 0)),
          answerShown: hint.answerShown === true,
        };
      }
    }

    return {
      schemaVersion: SCHEMA_VERSION,
      eventLog: sanitizeEventLog(raw.eventLog),
      evidenceHistory,
      queryContexts,
      drafts,
      hints,
    };
  }

  function deriveProgress(state) {
    const eventLog = sanitizeEventLog(isPlainObject(state) ? state.eventLog : []);
    return deriveFromValidatedEvents(eventLog);
  }

  function completeBeat(state, beatId, payload) {
    const cleanState = sanitizeState(state);
    const before = deriveFromValidatedEvents(cleanState.eventLog);
    const beat = BEATS_BY_ID[String(beatId || "")];
    if (!beat) return { ok: false, state: cleanState, errors: ["unknown-beat"], warnings: [], earnedTokenIds: before.earnedTokenIds };
    if (before.completedBeatIdSet.has(beat.id)) {
      const repeated = validateBeat(beat.id, payload, before);
      return { ok: repeated.ok, state: cleanState, errors: repeated.errors, warnings: repeated.ok ? ["already-completed"] : repeated.warnings, earnedTokenIds: before.earnedTokenIds };
    }
    const result = validateBeat(beat.id, payload, before);
    if (!result.ok) return { ok: false, state: cleanState, errors: result.errors, warnings: result.warnings, earnedTokenIds: before.earnedTokenIds };
    const event = {
      seq: cleanState.eventLog.length + 1,
      type: "beat.completed",
      beatId: beat.id,
      normalizedAnswer: result.normalized,
      at: new Date().toISOString(),
    };
    const nextState = { ...cleanState, eventLog: [...cleanState.eventLog, event] };
    const after = deriveFromValidatedEvents(nextState.eventLog);
    return { ok: true, state: nextState, errors: [], warnings: result.warnings, earnedTokenIds: after.earnedTokenIds };
  }

  function appendBeatEvent(state, beatId, payload) {
    return completeBeat(state, beatId, payload);
  }

  function postNextReaction(state) {
    const cleanState = sanitizeState(state);
    const before = deriveFromValidatedEvents(cleanState.eventLog);
    if (before.unreadReactionId) return { ok: false, state: cleanState, reactionId: null, reason: "unread-reaction" };
    const reaction = nextPostableReaction(cleanState.eventLog);
    if (!reaction) return { ok: false, state: cleanState, reactionId: null, reason: "not-ready" };
    const event = { seq: cleanState.eventLog.length + 1, type: "reaction.posted", reactionId: reaction.id, at: new Date().toISOString() };
    return { ok: true, state: { ...cleanState, eventLog: [...cleanState.eventLog, event] }, reactionId: reaction.id, reason: "posted" };
  }

  function markReactionRead(state, reactionId) {
    const cleanState = sanitizeState(state);
    const before = deriveFromValidatedEvents(cleanState.eventLog);
    if (before.unreadReactionId !== reactionId) {
      const alreadyRead = before.postedReactionIds.includes(reactionId) && !before.unreadReactionId;
      return { ok: alreadyRead, state: cleanState, reactionId, reason: alreadyRead ? "already-read" : "not-unread" };
    }
    const event = { seq: cleanState.eventLog.length + 1, type: "reaction.read", reactionId, at: new Date().toISOString() };
    return { ok: true, state: { ...cleanState, eventLog: [...cleanState.eventLog, event] }, reactionId, reason: "read" };
  }

  function completeEnding(state) {
    const cleanState = sanitizeState(state);
    const progress = deriveFromValidatedEvents(cleanState.eventLog);
    if (progress.endingId) return { ok: true, state: cleanState, endingId: progress.endingId, reason: "already-completed" };
    if (!progress.completedBeatIdSet.has("puzzle-submit-archive-bag") || !progress.postedReactionIds.includes("reaction-archive-bag")) {
      return { ok: false, state: cleanState, endingId: null, reason: "ending-not-ready" };
    }
    const event = { seq: cleanState.eventLog.length + 1, type: "ending.completed", endingId: ENDING_BRANCH.id, at: new Date().toISOString() };
    return { ok: true, state: { ...cleanState, eventLog: [...cleanState.eventLog, event] }, endingId: ENDING_BRANCH.id, reason: "completed" };
  }

  function buildEndingPreview(stateOrProgress) {
    const progress = stateOrProgress && Array.isArray(stateOrProgress.earnedTokenIds)
      ? stateOrProgress
      : deriveProgress(stateOrProgress);
    const earned = new Set(progress.earnedTokenIds || []);
    const missingTokenIds = ENDING_REQUIRED_TOKENS.filter((tokenId) => !earned.has(tokenId));
    const mapClaims = (ids) => ids.map((id) => CLAIMS_BY_ID[id]);
    return deepFreeze({
      branchId: ENDING_BRANCH.id,
      ready: missingTokenIds.length === 0,
      missingTokenIds,
      confirmed: mapClaims(ENDING_BRANCH.confirmed_claim_ids),
      disproved: mapClaims(ENDING_BRANCH.disproved_claim_ids),
      unresolved: mapClaims(ENDING_BRANCH.unresolved_claim_ids),
      sourceGroups: ENDING_SOURCE_GROUPS,
      completionText: ENDING_BRANCH.explicit_completion_text,
      characterChoice: ENDING_BRANCH.character_choice,
    });
  }

  const HELISHU_CAPTURE_PATTERN = CAPTURES.map((capture) => capture.key).join("|");
  const PERSON_CAPTURE_PATTERN = PERSON_CAPTURES.map((capture) => capture.key).join("|");
  const NANQIAO_CAPTURE_PATTERN = RUMOR_CAPTURES.map((capture) => capture.key).join("|");
  const PUBLIC_ROUTE_MANIFEST = deepFreeze([
    { id: "helishu-retired", policy: "public-direct", pattern: "^/retired$" },
    { id: "archive-home", policy: "public-direct", pattern: "^/archive$" },
    { id: "archive-results", policy: "public-direct", pattern: "^/archive/results/(helishu|nanqiao)$" },
    { id: "ritual-capture-index", policy: "public-direct", pattern: "^/archive/results/heqi-20170419$" },
    { id: "folklore-capture-index", policy: "public-direct", pattern: "^/archive/customs/guren-heli-2009$" },
    { id: "helishu-snapshot", policy: "public-direct", pattern: `^/snapshot/(${HELISHU_CAPTURE_PATTERN})$` },
    { id: "ritual-status-snapshot", policy: "public-direct", pattern: "^/snapshot/heqi-20170419$" },
    { id: "helishu-capture", policy: "public-direct", pattern: `^/capture/(${HELISHU_CAPTURE_PATTERN})$` },
    { id: "person-snapshot", policy: "public-direct", pattern: `^/person-snapshot/(${PERSON_CAPTURE_PATTERN})$` },
    { id: "person-capture", policy: "public-direct", pattern: `^/person-capture/(${PERSON_CAPTURE_PATTERN})$` },
    { id: "nanqiao-snapshot", policy: "public-direct", pattern: `^/rumor-snapshot/(${NANQIAO_CAPTURE_PATTERN})$` },
    { id: "nanqiao-capture", policy: "public-direct", pattern: `^/rumor-capture/(${NANQIAO_CAPTURE_PATTERN})$` },
    { id: "archive-meta", policy: "public-direct", pattern: "^/archive/meta/20170507(/job)?$" },
    { id: "records-answer", policy: "public-direct", pattern: "^/records/dayi/HLS-[0-9]{6}-[0-9]{2}$" },
    { id: "records-status", policy: "public-direct", pattern: "^/records/status/P-[A-Z0-9]{4}$" },
    { id: "records-visits", policy: "public-direct", pattern: "^/records/visits/V-[A-Z0-9]{4}$" },
    { id: "records-rules", policy: "public-direct", pattern: "^/records/rules/(v3\\.1|status-generation-v2-1)$" },
    { id: "records-status-samples", policy: "public-direct", pattern: "^/records/status-samples/2017-04$" },
    { id: "records-review", policy: "public-direct", pattern: "^/records/reviews/P-3D61$" },
    { id: "records-index-actions", policy: "public-direct", pattern: "^/records/index-actions/(2017-04|HLS-170418-07)$" },
    { id: "records-policy", policy: "public-direct", pattern: "^/records/policy/public-message-v2$" },
    { id: "records-staff", policy: "public-direct", pattern: "^/records/staff/ZY-014$" },
    { id: "records-duty", policy: "public-direct", pattern: "^/records/duty/2017-04(/changes)?$" },
    { id: "records-notices", policy: "public-direct", pattern: "^/records/notices/(2017-06-volunteers|2017-04-19-cleaning)$" },
    { id: "rumor-post", policy: "public-direct", pattern: "^/chengnanli/topic/63192$" },
    { id: "folklore-page", policy: "public-direct", pattern: "^/chengnanli/customs/guren-heli-2009(/reader-note)?$" },
    { id: "nanqiao-successor-index", policy: "public-direct", pattern: "^/nanqiao2$" },
    { id: "nanqiao-successor-post", policy: "public-direct", pattern: "^/nanqiao2/topic/(4821|night-bus|red-cloth|camera|water|noodles|keys|rent-chair|cat|bike|roof)$" },
    { id: "rumor-collage", policy: "public-direct", pattern: "^/files/cn-63192-collage$" },
    { id: "oldnews-home", policy: "public-direct", pattern: "^/oldnews/home$" },
    { id: "oldnews-search", policy: "public-direct", pattern: "^/oldnews/search$" },
    { id: "oldnews-main-articles", policy: "public-direct", pattern: "^/oldnews/(article/(20040919-04|20040920-02|20110512-03)|notices/(20161104-08|20170427-03))$" },
    { id: "oldnews-noise", policy: "public-direct", pattern: "^/oldnews/article/noise/[a-z0-9-]+$" },
    { id: "handout-file", policy: "public-direct", pattern: "^/files/community-handbook-2016$" },
    { id: "handout-catalog", policy: "public-direct", pattern: "^/catalog/item/SQ-JY-2016-04(/source)?$" },
    { id: "reprint-trail", policy: "public-direct", pattern: "^/chengnanli/reprint/(chengwei|author/xiaolin|chengwei/log)$" },
  ]);

  function canonicalizeRoutePath(path) {
    const identifierRoutes = [
      /^\/records\/dayi\/(HLS-[0-9]{6}-[0-9]{2})$/i,
      /^\/records\/status\/(P-[A-Z0-9]{4})$/i,
      /^\/records\/visits\/(V-[A-Z0-9]{4})$/i,
      /^\/records\/reviews\/(P-[A-Z0-9]{4})$/i,
      /^\/records\/index-actions\/(HLS-[0-9]{6}-[0-9]{2})$/i,
      /^\/records\/staff\/(ZY-[0-9]{3})$/i,
      /^\/catalog\/item\/(SQ-JY-[0-9]{4}-[0-9]{2})(\/source)?$/i,
    ];
    for (const pattern of identifierRoutes) {
      const match = path.match(pattern);
      if (!match) continue;
      const prefix = path.slice(0, path.length - match[0].length);
      const canonical = match[0].replace(match[1], match[1].toUpperCase());
      return `${prefix}${canonical}`;
    }
    return path;
  }

  function normalizeRoute(value) {
    let route = String(value ?? "").trim();
    if (route.startsWith("#")) route = route.slice(1);
    if (!route.startsWith("/")) return "";
    const queryIndex = route.indexOf("?");
    const path = queryIndex >= 0 ? route.slice(0, queryIndex) : route;
    const query = queryIndex >= 0 ? route.slice(queryIndex) : "";
    try {
      if (query) decodeURIComponent(query);
      return `${canonicalizeRoutePath(decodeURIComponent(path))}${query}`;
    } catch (_error) {
      return "";
    }
  }

  function matchPublicRoute(value) {
    const route = normalizeRoute(value);
    if (!route) return null;
    const path = route.split("?", 1)[0];
    const match = PUBLIC_ROUTE_MANIFEST.find((entry) => new RegExp(entry.pattern).test(path));
    return match ? { ...match, route } : null;
  }

  function isPublicRoute(value) {
    return Boolean(matchPublicRoute(value));
  }

  const QA_VALID_BEAT_PAYLOADS = deepFreeze({
    "puzzle-archive-helishu": {
      url: ORIGINAL_URL,
    },
    "puzzle-compare-helishu-versions": {
      captures: ["20170418", "20170507"],
      mode: "body-meta",
      pageDate: "2017-04-18",
      editor: "Xiao Ling",
      interpretation: "same-body-recapture",
      quote: COMPLETE_QUOTE,
      code: ANSWER_CODE,
    },
    "puzzle-lookup-hls06": {
      code: ANSWER_CODE,
    },
    "puzzle-classify-procedure": {
      dates: ["2017-02-23", "2017-03-06", "2017-03-20"],
      issue: "closed-item-reused",
      clauses: ["12", "13"],
      boundaries: ["no-new-paper", "no-scan", "no-revision"],
      note: "",
    },
    "puzzle-triangulate-zhao": {
      account: "xiaoling",
      displayName: "Xiao Ling",
      staffId: "ZY-014",
      realName: "Zhao Ling",
      actionTime: "2017-04-19 00:12",
      shiftId: "DH-170418-02",
      privacyCode: "PRI-02",
      privacyMeaning: "hide-and-offline",
      privacyLimits: ["not-harmless-proof", "not-collusion-proof"],
    },
    "puzzle-trace-ghost-name": {
      speaker: "Old Zhou",
      referent: "Zhao Ling",
      response: "not-liked",
      classification: "unwanted-colleague-nickname",
    },
    "puzzle-search-oldnews": {
      keyword: "Xiaoling",
    },
    "puzzle-classify-river": {
      fullName: "Lin Xiaoling",
      age: "52",
      region: "Dongjiang County",
      foundObject: "bicycle",
      followup: "person-safe",
    },
    "puzzle-archive-nanqiao": {
      url: RUMOR_URL,
    },
    "puzzle-compare-nanqiao": {
      captures: ["20040917a", "20040917b"],
      findings: ["at-sister", "close-thread", "not-divorced", "refused-discussion", "waited-at-factory-gate"],
    },
    "puzzle-compare-posthumous-relation": {
      sources: ["heling-obituary", "hls06-answer"],
      firstDate: "2016-10-28",
      secondDate: "2017-04-18",
      relation: "younger-female-cousin",
    },
    "puzzle-inspect-hls07-midnight": {
      samples: ["ZT-170414-06", "GH-170417-03"],
      order: ["2017-04-18 23:46", "2017-04-19 00:12:08", "2017-04-19 00:12:31", "2017-04-19 00:19:08"],
      pendingState: "pending",
      completeRequirements: ["relation-verified", "offline-review-complete", "reviewer-present"],
      anomalousFields: ["relation-pending", "contract-formed"],
      leadSeconds: 23,
      windowMinutes: 7,
      bodyState: "unavailable",
    },
    "puzzle-trace-ghost-matchmaker-tradition": {
      pages: ["interview", "reader-note", "archive-proof"],
      pageDate: "2009-03-14",
      noteDate: "2009-03-21",
      captureDate: "2009-04-02",
      laterUse: "2017-06-28",
      term: "Ghost Matchmaker",
      oralSource: "Liu Guixiang (Auntie Liu)",
      scope: "Nanqiao branch",
      rule: "living-name-seven-day-rule",
    },
    "puzzle-triangulate-ghost-sedan": {
      sources: ["forum-sedan", "cleanup-log", "folklore-page", "hls07-midnight"],
      matches: ["same-night", "same-lane", "paper-figure", "red-cord"],
    },
    "puzzle-compare-seven-day-rule": {
      ritualDate: "2017-04-19",
      deathDate: "2017-04-26",
      interval: 7,
      noticeDate: "2017-04-27",
    },
    "puzzle-submit-archive-bag": {
      originalRelation: "younger-female-cousin",
      realRelation: "unverified",
      hls07Body: "unavailable",
      heLingDeathCause: "unconfirmed",
      chenDeathCause: "unconfirmed",
      anomalyMeaning: "documented-rule-conflict",
      supernaturalCause: "unresolved",
      relationAction: "leave-blank",
    },
  });

  const QA_INVALID_BEAT_PAYLOADS = deepFreeze({
    "puzzle-archive-helishu": [
      { kind: "missing", name: "empty URL", payload: {} },
      { kind: "unrelated", name: "unrelated URL", payload: { url: "https://example.invalid/not-the-page" } },
    ],
    "puzzle-compare-helishu-versions": [
      { kind: "missing", name: "missing comparison fields", payload: {} },
      { kind: "extra", name: "extra capture", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-helishu-versions"], captures: ["20170418", "20170507", "20170903"] } },
    ],
    "puzzle-lookup-hls06": [
      { kind: "missing", name: "missing answer code", payload: {} },
      { kind: "unrelated", name: "different answer code", payload: { code: "HLS-170418-09" } },
    ],
    "puzzle-classify-procedure": [
      { kind: "missing", name: "missing classification", payload: {} },
      { kind: "extra", name: "includes allowed pickup as anomaly", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-classify-procedure"], dates: ["2017-02-11", "2017-02-23", "2017-03-06", "2017-03-20"] } },
    ],
    "puzzle-triangulate-zhao": [
      { kind: "missing", name: "missing identity fields", payload: {} },
      { kind: "unrelated", name: "wrong staff identity", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-zhao"], staffId: "ZY-011", realName: "Old Zhou" } },
    ],
    "puzzle-trace-ghost-name": [
      { kind: "missing", name: "missing nickname provenance", payload: {} },
      { kind: "unrelated", name: "claims supernatural identity", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-trace-ghost-name"], referent: "He Ling", classification: "supernatural-role" } },
    ],
    "puzzle-search-oldnews": [
      { kind: "missing", name: "empty name search", payload: {} },
      { kind: "unrelated", name: "unrelated search term", payload: { keyword: "bicycle" } },
    ],
    "puzzle-classify-river": [
      { kind: "missing", name: "missing stable fields", payload: {} },
      { kind: "unrelated", name: "merges the two women", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-classify-river"], fullName: "He Ling", region: "Chengnan" } },
    ],
    "puzzle-archive-nanqiao": [
      { kind: "missing", name: "missing forum URL", payload: {} },
      { kind: "unrelated", name: "wrong forum thread", payload: { url: "http://bbs.nanqiao.example/thread/3915.html" } },
    ],
    "puzzle-compare-nanqiao": [
      { kind: "missing", name: "missing capture comparison", payload: {} },
      { kind: "extra", name: "includes duplicate-era capture", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-nanqiao"], captures: ["20040917a", "20040917b", "20050302"] } },
    ],
    "puzzle-compare-posthumous-relation": [
      { kind: "missing", name: "missing posthumous dates", payload: {} },
      { kind: "extra", name: "adds an unrelated page", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-posthumous-relation"], sources: ["heling-obituary", "hls06-answer", "river-report"] } },
      { kind: "duplicate", name: "duplicates one source", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-posthumous-relation"], sources: ["heling-obituary", "hls06-answer", "hls06-answer"] } },
      { kind: "unrelated", name: "reverses chronology", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-posthumous-relation"], firstDate: "2017-04-18", secondDate: "2016-10-28" } },
    ],
    "puzzle-inspect-hls07-midnight": [
      { kind: "missing", name: "missing midnight metadata", payload: {} },
      { kind: "extra", name: "adds unrelated sample", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-inspect-hls07-midnight"], samples: ["ZT-170414-06", "GH-170417-03", "JC-170418-04"] } },
      { kind: "duplicate", name: "duplicates one event", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-inspect-hls07-midnight"], order: ["2017-04-18 23:46", "2017-04-19 00:12:08", "2017-04-19 00:12:08", "2017-04-19 00:19:08"] } },
      { kind: "unrelated", name: "uses ordinary compatible fields", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-inspect-hls07-midnight"], anomalousFields: ["relation-verified", "contract-formed"] } },
    ],
    "puzzle-trace-ghost-matchmaker-tradition": [
      { kind: "missing", name: "missing folklore provenance", payload: {} },
      { kind: "extra", name: "adds an unrelated page", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-trace-ghost-matchmaker-tradition"], pages: ["interview", "reader-note", "archive-proof", "reprint"] } },
      { kind: "duplicate", name: "duplicates one page", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-trace-ghost-matchmaker-tradition"], pages: ["interview", "reader-note", "reader-note"] } },
      { kind: "unrelated", name: "claims a universal custom", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-trace-ghost-matchmaker-tradition"], scope: "universal Chinese custom" } },
    ],
    "puzzle-triangulate-ghost-sedan": [
      { kind: "missing", name: "missing source cluster", payload: {} },
      { kind: "extra", name: "adds the unrelated river report", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-ghost-sedan"], sources: ["forum-sedan", "cleanup-log", "folklore-page", "hls07-midnight", "river-report"] } },
      { kind: "duplicate", name: "duplicates one source", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-ghost-sedan"], sources: ["forum-sedan", "cleanup-log", "folklore-page", "hls07-midnight", "hls07-midnight"] } },
      { kind: "unrelated", name: "turns a guess into a field", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-ghost-sedan"], matches: ["same-night", "same-lane", "paper-figure", "proves-ghost"] } },
    ],
    "puzzle-compare-seven-day-rule": [
      { kind: "missing", name: "missing date comparison", payload: {} },
      { kind: "extra", name: "uses an eighth day", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-seven-day-rule"], interval: 8 } },
      { kind: "duplicate", name: "duplicates the start date", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-seven-day-rule"], ritualDate: "2017-04-19 / 2017-04-19" } },
      { kind: "unrelated", name: "confuses death and publication date", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-seven-day-rule"], noticeDate: "2017-04-26" } },
    ],
    "puzzle-submit-archive-bag": [
      { kind: "missing", name: "missing archive fields", payload: {} },
      { kind: "extra", name: "combines two original relations", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-submit-archive-bag"], originalRelation: "younger-female-cousin / spouses" } },
      { kind: "duplicate", name: "duplicates the original relation", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-submit-archive-bag"], originalRelation: "younger-female-cousin younger-female-cousin" } },
      { kind: "unrelated", name: "fills death cause and relationship", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-submit-archive-bag"], chenDeathCause: "ritual", relationAction: "complete-marriage" } },
      { kind: "unrelated", name: "upgrades anomaly to supernatural cause", payload: { ...QA_VALID_BEAT_PAYLOADS["puzzle-submit-archive-bag"], anomalyMeaning: "ritual-proved", supernaturalCause: "confirmed" } },
    ],
  });

  const QA_VALID_PERMUTATIONS = deepFreeze({
    "puzzle-compare-posthumous-relation": [
      QA_VALID_BEAT_PAYLOADS["puzzle-compare-posthumous-relation"],
      { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-posthumous-relation"], firstDate: "2016-10-28", secondDate: "2017-04-18", sources: ["hls06-answer", "heling-obituary"] },
    ],
    "puzzle-triangulate-ghost-sedan": [
      QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-ghost-sedan"],
      { ...QA_VALID_BEAT_PAYLOADS["puzzle-triangulate-ghost-sedan"], sources: ["hls07-midnight", "folklore-page", "cleanup-log", "forum-sedan"], matches: ["red-cord", "paper-figure", "same-lane", "same-night"] },
    ],
    "puzzle-compare-seven-day-rule": [
      QA_VALID_BEAT_PAYLOADS["puzzle-compare-seven-day-rule"],
      { ...QA_VALID_BEAT_PAYLOADS["puzzle-compare-seven-day-rule"], ritualDate: "2017-04-19", deathDate: "2017-04-26", interval: "7" },
    ],
  });

  const QA_VALIDATION_CONTEXTS = deepFreeze({
    "puzzle-submit-archive-bag": { earnedTokenIds: [...ENDING_REQUIRED_TOKENS] },
  });

  function buildQAState(stopAfterBeatId = "", finishEnding = false) {
    let qaState = createInitialState();
    for (const beat of PUZZLE_BEATS) {
      const completed = completeBeat(qaState, beat.id, QA_VALID_BEAT_PAYLOADS[beat.id]);
      if (!completed.ok) return qaState;
      qaState = completed.state;
      while (true) {
        const posted = postNextReaction(qaState);
        if (!posted.ok) break;
        qaState = posted.state;
        const read = markReactionRead(qaState, posted.reactionId);
        if (!read.ok) return qaState;
        qaState = read.state;
      }
      if (stopAfterBeatId && beat.id === stopAfterBeatId) break;
    }
    if (finishEnding) {
      const ended = completeEnding(qaState);
      if (ended.ok) qaState = ended.state;
    }
    return qaState;
  }

  const QA_CRITICAL_PUBLIC_ROUTES = deepFreeze([
    "/records/index-actions/HLS-170418-07",
    STATUS_RULE_ROUTE,
    STATUS_SAMPLES_ROUTE,
    "/archive/results/heqi-20170419",
    FOLKLORE_ROUTE,
    FOLKLORE_NOTE_ROUTE,
    FOLKLORE_CAPTURE_ROUTE,
    SEDAN_ROUTE,
    CLEANUP_ROUTE,
    RITUAL_CAPTURE_ROUTE,
    CHEN_OBITUARY_ROUTE,
  ]);

  const QA_PUBLIC_ROUTE_CASES = deepFreeze([
    { manifestId: "helishu-retired", route: "/retired" },
    { manifestId: "archive-home", route: "/archive" },
    { manifestId: "archive-results", route: "/archive/results/helishu" },
    { manifestId: "ritual-capture-index", route: "/archive/results/heqi-20170419" },
    { manifestId: "folklore-capture-index", route: FOLKLORE_CAPTURE_ROUTE },
    { manifestId: "helishu-snapshot", route: "/snapshot/20170418" },
    { manifestId: "ritual-status-snapshot", route: RITUAL_CAPTURE_ROUTE },
    { manifestId: "helishu-capture", route: "/capture/20170418" },
    { manifestId: "person-snapshot", route: "/person-snapshot/20160822" },
    { manifestId: "person-capture", route: "/person-capture/20160822" },
    { manifestId: "nanqiao-snapshot", route: "/rumor-snapshot/20040917b" },
    { manifestId: "nanqiao-capture", route: "/rumor-capture/20040917b" },
    { manifestId: "archive-meta", route: "/archive/meta/20170507" },
    { manifestId: "records-answer", route: `/records/dayi/${ANSWER_CODE}` },
    { manifestId: "records-status", route: `/records/status/${ITEM_ID}` },
    { manifestId: "records-visits", route: `/records/visits/${VISITOR_ID}` },
    { manifestId: "records-rules", route: "/records/rules/v3.1" },
    { manifestId: "records-rules", route: STATUS_RULE_ROUTE },
    { manifestId: "records-status-samples", route: STATUS_SAMPLES_ROUTE },
    { manifestId: "records-review", route: `/records/reviews/${ITEM_ID}` },
    { manifestId: "records-index-actions", route: `/records/index-actions/${WITHDRAWN_CODE}` },
    { manifestId: "records-policy", route: "/records/policy/public-message-v2" },
    { manifestId: "records-staff", route: "/records/staff/ZY-014" },
    { manifestId: "records-duty", route: "/records/duty/2017-04/changes" },
    { manifestId: "records-notices", route: CLEANUP_ROUTE },
    { manifestId: "rumor-post", route: "/chengnanli/topic/63192" },
    { manifestId: "folklore-page", route: FOLKLORE_ROUTE },
    { manifestId: "folklore-page", route: FOLKLORE_NOTE_ROUTE },
    { manifestId: "nanqiao-successor-index", route: "/nanqiao2" },
    { manifestId: "nanqiao-successor-post", route: SEDAN_ROUTE },
    { manifestId: "rumor-collage", route: "/files/cn-63192-collage" },
    { manifestId: "oldnews-home", route: "/oldnews/home" },
    { manifestId: "oldnews-search", route: "/oldnews/search?keyword=Xiaoling&page=1" },
    { manifestId: "oldnews-main-articles", route: CHEN_OBITUARY_ROUTE },
    { manifestId: "oldnews-noise", route: "/oldnews/article/noise/result-xiao-ling-school" },
    { manifestId: "handout-file", route: "/files/community-handbook-2016" },
    { manifestId: "handout-catalog", route: "/catalog/item/SQ-JY-2016-04" },
    { manifestId: "reprint-trail", route: "/chengnanli/reprint/chengwei" },
  ]);

  const QA_FIXTURES = deepFreeze({
    validBeatPayloads: QA_VALID_BEAT_PAYLOADS,
    invalidBeatPayloads: QA_INVALID_BEAT_PAYLOADS,
    validPermutations: QA_VALID_PERMUTATIONS,
    validationContexts: QA_VALIDATION_CONTEXTS,
    criticalPublicRoutes: QA_CRITICAL_PUBLIC_ROUTES,
    publicRouteCases: QA_PUBLIC_ROUTE_CASES,
    states: {
      early30: buildQAState("puzzle-search-oldnews"),
      formReady: buildQAState("puzzle-compare-nanqiao"),
      mid: buildQAState("puzzle-inspect-hls07-midnight"),
      completed: buildQAState("", true),
    },
    runtime: {
      invalidFormRoute: "/workspace/posthumous-relation",
    },
  });

  return Object.freeze({
    ORIGINAL_URL,
    SAVED_URL,
    PERSON_URL,
    RUMOR_URL,
    ANSWER_CODE,
    VISITOR_ID,
    ITEM_ID,
    WITHDRAWN_CODE,
    COMPLETE_QUOTE,
    FATHER_NAME,
    WOMAN_NAME,
    WOMAN_NICKNAME,
    EDITOR_REAL_NAME,
    FOLKLORE_ROUTE,
    FOLKLORE_NOTE_ROUTE,
    FOLKLORE_CAPTURE_ROUTE,
    STATUS_RULE_ROUTE,
    STATUS_SAMPLES_ROUTE,
    SEDAN_ROUTE,
    CLEANUP_ROUTE,
    RITUAL_CAPTURE_ROUTE,
    CHEN_OBITUARY_ROUTE,
    RITUAL_ID,
    RITUAL_BODY_CANONICAL,
    RITUAL_BODY_SHA256,
    QUOTE_CHOICES,
    SIDE_TRAIL,
    FORUM_SOURCE_RULE,
    CAPTURES,
    PERSON_CAPTURES,
    RUMOR_CAPTURES,
    RECENT_ANSWERS,
    OLD_ANSWERS,
    INDEX_TIMELINE,
    FALSE_CASES,
    VISIT_ROWS,
    PERSON_IDENTITIES,
    AUDIT_EXPECTED_DATES,
    AUDIT_EXPECTED_CLAUSES,
    SCHEMA_VERSION,
    STORAGE_KEY,
    CONTRACT,
    CANONICAL,
    RECORDS,
    RULES,
    DUTY_ROWS,
    PRIVACY_ACTIONS,
    NEWS_RESULTS,
    NEWS_SEARCH_RESULTS: NEWS_RESULTS,
    CLAIMS,
    CLAIMS_BY_ID,
    LEGACY_CLAIMS,
    SOURCE_IDS,
    SOURCES,
    PUZZLE_TOKENS,
    TOKENS_BY_ID,
    PUZZLE_BEATS,
    BEATS_BY_ID,
    requiredProducedInputTokenIds,
    HINT_LADDERS,
    HINT_TEXT,
    REACTIONS,
    ENDING_BRANCH,
    ENDING_REQUIRED_TOKENS,
    ENDING_SOURCE_GROUPS,
    TIMELINE_EXPECTED,
    PUBLIC_ROUTE_MANIFEST,
    QA_FIXTURES,
    normalize,
    foldLatin,
    searchPersonIdentities,
    normalizeText,
    normalizeCompact,
    normalizeKeyword,
    normalizeIdentifier,
    normalizeURL,
    normalizeDate,
    calendarDayDifference,
    escapeHTML,
    normalizers: Object.freeze({ normalizeText, normalizeCompact, normalizeKeyword, normalizeIdentifier, normalizeURL, normalizeDate }),
    validateForumReply,
    validateForumEvidence,
    hasForumSourceEvidence,
    hasMigrationEvidence,
    validateArchiveURL,
    validateCode,
    validateAudit,
    validateAnswerReport,
    validateRumorReport,
    validateFinalReply,
    validateArchiveHelishu,
    validateCompareHelishu,
    validateLookupHls06,
    validateProcedureClassification,
    validateZhaoTriangulation,
    validateGhostName,
    validateOldNewsSearch,
    validateRiverClassification,
    validateArchiveNanqiao,
    validateCompareNanqiao,
    validatePosthumousRelation,
    validateHls07Midnight,
    validateGhostMatchmakerTradition,
    validateGhostSedanTriangulation,
    validateSevenDayRule,
    validateArchiveBagSubmission,
    BEAT_VALIDATORS,
    validateBeat,
    createInitialState,
    sanitizeState,
    deriveProgress,
    appendBeatEvent,
    completeBeat,
    postNextReaction,
    markReactionRead,
    buildEndingPreview,
    completeEnding,
    normalizeRoute,
    matchPublicRoute,
    isPublicRoute,
  });
});