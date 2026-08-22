(function attachWorldContent(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("./game-core.js"));
  } else {
    root.WorldContent = factory(root.GameCore);
  }
})(typeof window !== "undefined" ? window : globalThis, function createWorldContent(Core) {
  "use strict";

  if (!Core) throw new Error("WorldContent requires GameCore.");

  const {
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
    SIDE_TRAIL,
    FORUM_SOURCE_RULE,
    CAPTURES,
    PERSON_CAPTURES,
    RUMOR_CAPTURES,
    RECENT_ANSWERS,
    FALSE_CASES,
    VISIT_ROWS,
    CANONICAL,
    RECORDS,
    RULES,
    DUTY_ROWS,
    PRIVACY_ACTIONS,
    NEWS_RESULTS,
    REACTIONS,
    BEATS_BY_ID,
  } = Core;

  const sourceCapture = CAPTURES.find((item) => item.key === FORUM_SOURCE_RULE.contentRoot);
  const repeatedCapture = CAPTURES.find((item) => item.duplicateOf === FORUM_SOURCE_RULE.contentRoot);
  const migrationCapture = CAPTURES.find((item) => item.key === FORUM_SOURCE_RULE.migration);
  const earlyForumCapture = RUMOR_CAPTURES.find((item) => item.phase === "initial");
  const resolvedForumCapture = RUMOR_CAPTURES.find((item) => item.phase === "resolved");
  const pickupVisit = VISIT_ROWS.find((item) => item.allowedPickup);
  const newsById = new Map(NEWS_RESULTS.map((item) => [item.id, item]));
  const riverNews = newsById.get("result-lin-xiaoling-river");
  const riverFollowup = newsById.get("result-lin-xiaoling-followup");
  const heLingProfile = newsById.get("result-he-ling-profile");
  const heLingObituary = newsById.get("result-he-ling-obituary");
  const zhaoStaffId = CANONICAL.ids.zhaoStaff;
  const shiftChangeId = CANONICAL.ids.shiftChange;
  const privacyRuleId = CANONICAL.ids.privacyRule;
  const [
    reactionSourceCorrection,
    reactionRecordLink,
    reactionProcedureBoundary,
    reactionTitleProvenance,
    reactionRiverExclusion,
    reactionPosthumousRelation,
    reactionHls07Midnight,
    reactionGhostMatchmakerTradition,
    reactionGhostSedan,
    reactionSevenDayRule,
    reactionArchiveBag,
  ] = REACTIONS;
  const hlsFragment = ANSWER_CODE.replace(/(\d{4})\d{2}(-\d{2})$/, "$1□□$2");
  const visitorFragment = `${VISITOR_ID.slice(0, -1)}□`;

  // Original Han text is carried only as bounded source-artifact data. The UI
  // renders these records with .zh-artifact[lang="zh-Hans"] and places the
  // matching .artifact-translation in the same evidence stage.
  const artifact = (han, translation, extra = {}) => Object.freeze({
    className: "zh-artifact",
    lang: "zh-Hans",
    han,
    translationClassName: "artifact-translation",
    translation,
    ...extra,
  });

  const DISPLAY = Object.freeze({
    father: "Chen Yuan",
    woman: "He Ling",
    womanNickname: "Xiao Ling",
    editor: "Zhao Ling",
    editorNickname: "Xiao Ling",
    auntieLiu: "Liu Guixiang (known locally as Auntie Liu)",
  });

  const visualAssets = Object.freeze([
    Object.freeze({ id: "GM-V103-A01-FRONT", src: "assets/grok-new4/final/archive-bag-blank-relationship-ending.png", sha256: "c640a62829985da440db70f0af334a51bf6fdf8ae1f4863cb8c95f1798423fca", width: 1600, height: 1200, alt: "Reconstructed front of the IMG_1842 Chinese printout with missing characters preserved as squares.", caption: "IMG_1842 front. Reconstructed from the surviving printout lines; not an authenticated photograph of the original sheet.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The reconstruction preserves only the surviving Chinese lines and does not restore missing characters or names." }),
    Object.freeze({ id: "GM-V103-A01-BACK", src: "assets/grok-new4/final/chen_yuan_obituary_20170427.png", sha256: "dd908eab9992e994db57a10875c7132b9f8c98f8e399fb214460a27583b65a3e", width: 1600, height: 1200, alt: "Reconstructed reverse of IMG_1842 with a short Chinese pencil note.", caption: "IMG_1842 reverse. The pencil note is reproduced without adding a name, date, or explanation.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The note records a public form of address only; it does not establish the actual relationship or the writer's motive." }),
    Object.freeze({ id: "GM-V103-A01-SLIP", src: "assets/grok-new4/final/cn-63192-four-source-collage.png", sha256: "9d58ee0152cd952cfe38ea18422d5e37e89465d85fa066f8e71c0aa6026cc4ae", width: 1500, height: 1000, alt: "Reconstructed Chinese collection slip associated with the IMG_1842 folder.", caption: "Collection slip reconstruction. Redacted and incomplete identifiers remain incomplete.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The slip does not prove that every loose sheet in the folder came from the same visit or transaction." }),
    Object.freeze({ id: "GM-V103-A02-COLLAGE", src: "assets/grok-new4/final/dongjiang_20040919_lin_xiaoling.png", sha256: "475c7e885941326e68f37c6c61828244935918b3ab1924883e4df9a552536970", width: 1200, height: 1800, alt: "Reconstruction of a tall collage made from four visibly different Chinese source fragments.", caption: "Four-source collage reconstruction. Original filenames, creation times, and ordering were not retained.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The four fragments are separate carriers and must not be read as one continuous event.", facts: Object.freeze({ fragments: 4, retainedOriginalOrder: false }) }),
    Object.freeze({ id: "GM-V103-A03-STATUS", src: "assets/grok-new4/final/dongjiang_20040920_followup.png", sha256: "1839f82f259efee64f1a615b24b6669321002415f2da09d6cae0915ba20333d7", width: 1600, height: 1200, alt: "Captured Chinese GH-170419-01 status sheet with masked names and blank review fields.", caption: "GH-170419-01 captured status. Masking and blank review fields are part of the surviving page.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The page records a rule conflict; it does not reveal the hidden names, the unavailable body, an offline rite, or its cause.", facts: Object.freeze({ reviewerBlank: true, overrideBlank: true, maskedNames: true }) }),
    Object.freeze({ id: "GM-V103-A04-FOLKLORE", src: "assets/grok-new4/final/folklore_objects_editorial_plate_2009.png", sha256: "4097a5ddfc92ec85b75dcea92dd6d0da51a5775c325a5d0431d1214461058482", width: 1600, height: 1200, alt: "Editorial reconstruction plate showing four incense sticks, a paper-cut figure, red cotton thread, and a blank spirit tablet.", caption: "Editorial reconstruction from the 2009 oral-history text; not a period or ritual photograph.", kind: "reconstruction", generator: "grok-new4", productionMode: "image_gen+code", zoom: true, boundary: "One Nanqiao branch's recorded wording is not a ritual manual and does not establish that the arrangement was used or effective.", facts: Object.freeze({ incenseSticks: 4, paperFigures: 1, redCottonThreads: 1, spiritTablets: 1, spiritTabletNamed: false }) }),
    Object.freeze({ id: "GM-V103-A05-CLEANUP", src: "assets/grok-new4/final/gh-170419-01-midnight-status.png", sha256: "9c34f509b3ea44597dcd8b2f27fd4adb65ddb7fd70133a2ccef80d27cb425f92", width: 1600, height: 1200, alt: "Editorial reconstruction of three charred bamboo splinters, damp paper scraps, red cotton cord, and scattered joss paper.", caption: "Next-morning cleanup reconstruction based on the public log; origin of the remnants is unknown.", kind: "reconstruction", generator: "grok-new4", productionMode: "image_gen+code", zoom: true, boundary: "The three splinters and absent tablet do not fully match the four-stick oral account and do not prove a ritual.", facts: Object.freeze({ bambooSplinters: 3, paperFigureIntact: false, redCottonCords: 1, spiritTablets: 0 }) }),
    Object.freeze({ id: "GM-V103-A06-HELISHU", src: "assets/grok-new4/final/gh_170419_01_capture_strip.png", sha256: "41fc9e5cf86fe5787ecc421e76f5eaf4441481dab80173816adba6088a835352", width: 1600, height: 1200, alt: "Reconstructed Chinese Helishu source page from 18 April 2017.", caption: "Helishu source-page reconstruction from the captured Chinese interface and surviving fields.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The page preserves public wording and identifiers only; it does not authenticate an actual family relationship." }),
    Object.freeze({ id: "GM-V103-A07A-RIVER", src: "assets/grok-new4/final/he_ling_obituary_20161104.png", sha256: "146a459caed1a37ca46283ef79b71f5e095a46ebd5de4b3e100f8e9a2bf856dd", width: 1350, height: 1800, alt: "Reconstructed 19 September 2004 newspaper page about Lin Xiaoling of Dongjiang County.", caption: "Dongjiang report reconstruction. The item concerns Lin Xiaoling, age 52, and a bicycle found near the river.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "This report concerns a different person and cannot establish what happened to He Ling." }),
    Object.freeze({ id: "GM-V103-A07B-RIVER-FOLLOWUP", src: "assets/grok-new4/final/helishu_20170418_source_page.png", sha256: "e468431ce74b35f4f6b34b55c856613e6725840e564307d9a2686f92eb70c4f4", width: 1350, height: 1800, alt: "Reconstructed 20 September 2004 follow-up saying Lin Xiaoling contacted her family.", caption: "Dongjiang follow-up reconstruction. Lin Xiaoling contacted her family and was reported safe.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The follow-up excludes one mistaken identity link; it does not prove that He Ling was never harmed." }),
    Object.freeze({ id: "GM-V103-A08-SEWING", src: "assets/grok-new4/final/img_1842_collection_slip.png", sha256: "8927b47c58ab99073eb298f8e09ac58377f33de3a90951df3f7b5998cd5f10c7", width: 1600, height: 1200, alt: "Editorial reconstruction of an old West Market alterations stall with a sewing machine and fabric, without a person.", caption: "Editorial scene reconstruction for the 2011 profile; no archival photograph of the stall or its owner survives here.", kind: "context", generator: "grok-new4", productionMode: "image_gen+code", zoom: true, boundary: "The scene supplies period context only and is not evidence of identity, conduct, or cause of death." }),
    Object.freeze({ id: "GM-V103-A09-HELING-OBITUARY", src: "assets/grok-new4/final/img_1842_pencil_back.png", sha256: "98326f94982a133e992cb7e2c14c9f3f3d262d6923ac52e609446226f0e0159f", width: 1200, height: 1500, alt: "Reconstructed Chinese public obituary for He Ling.", caption: "He Ling obituary reconstruction. The notice gives a death date and age but no cause of death.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "No death cause, address, family name, or causal account may be inferred from this notice." }),
    Object.freeze({ id: "GM-V103-A10A-NANQIAO-EARLY", src: "assets/grok-new4/final/img_1842_printout_front.png", sha256: "ae7fc3b721fbc5112cc3e83e5e4ab17f80cd40d111c2b4d98fad16b88a905a0c", width: 1600, height: 1200, alt: "Reconstructed early Nanqiao Life Forum capture from 01:18:42 on 17 September 2004.", caption: "Early Nanqiao capture reconstruction before the family-contact update.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The thread records public participant statements, not He Ling's own words." }),
    Object.freeze({ id: "GM-V103-A10B-NANQIAO-MORNING", src: "assets/grok-new4/final/nanqiao-east-lane-location-reconstruction.png", sha256: "6e223a5ce0bac8585f9b79c8edea78b973d583ae53e27f9d6f460e6a649029c4", width: 1600, height: 1200, alt: "Reconstructed Nanqiao Life Forum morning capture from 10:46:20 on 17 September 2004.", caption: "Morning Nanqiao capture reconstruction after the contact and closure updates.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "Contact that morning does not establish that no earlier conflict or harm occurred." }),
    Object.freeze({ id: "GM-V103-A11-CAPTURE-STRIP", src: "assets/grok-new4/final/nanqiao_cleanup_residue_reconstruction.png", sha256: "0b01137464f7aebc352a39d1b17ed09c351a0404bf051c81b85c9d14db132d8e", width: 1920, height: 1080, alt: "Four discrete PageTime capture points around the GH-170419-01 midnight status change.", caption: "Four independent captures, not a continuous seven-minute recording.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The captures establish sampled states only; they do not prove the page stayed continuously readable between samples.", facts: Object.freeze({ discreteCaptures: 4, continuousTimeline: false }) }),
    Object.freeze({ id: "GM-V103-A12-EAST-LANE", src: "assets/grok-new4/final/nanqiao_forum_20040917_011842.png", sha256: "aca6f4fb195c8d9615ae1bcdd3b14d8946025f2f0cdeacd8027ae8b40e4f69bb", width: 1920, height: 1080, alt: "Empty nighttime reconstruction of the Nanqiao East Lane location, with no sedan chair or people.", caption: "Location reconstruction only. The original forum post contained no photograph.", kind: "context", generator: "grok-new4", productionMode: "image_gen+code", zoom: true, boundary: "This image is not evidence of a red sedan, bearers, a filming crew, or any supernatural event.", facts: Object.freeze({ originalPostHadPhoto: false, sedanVisible: false, peopleVisible: false }) }),
    Object.freeze({ id: "GM-V103-A13-CHEN-OBITUARY", src: "assets/grok-new4/final/nanqiao_forum_20040917_104620.png", sha256: "db4a2064649454622bc0ea16470f2819cc36aa7a6464dcea2256c62df5338420", width: 1200, height: 1500, alt: "Reconstructed Chinese public obituary for Chen Yuan.", caption: "Chen Yuan obituary reconstruction. Death date and publication date are separate fields; no cause is given.", kind: "evidence-document", generator: "grok-new4", productionMode: "code", zoom: true, boundary: "The calendar match does not establish a cause of death or supernatural force." }),
    Object.freeze({ id: "GM-V103-A14-ENDING-BAG", src: "assets/grok-new4/final/west-market-sewing-stall-reconstruction.png", sha256: "75919e8918c02f9bd78d26315f7d370b87d14f6669cedde5ebe1c9a108eaee33", width: 1800, height: 1200, alt: "Archive-bag catalogue sheet with the actual-relationship line physically left blank.", caption: "Completed catalogue decision: the captured wording is recorded separately and the actual-relationship field remains blank.", kind: "ending", generator: "grok-new4", productionMode: "image_gen+code", zoom: true, boundary: "The blank field records an evidence limit; it does not confirm a hidden relationship or a supernatural bond.", facts: Object.freeze({ actualRelationshipBlank: true, occultSealPresent: false }) }),
  ]);

  const visualAssetRoutes = Object.freeze({
    "/forum": Object.freeze(["GM-V103-A01-FRONT", "GM-V103-A01-BACK", "GM-V103-A01-SLIP"]),
    "/forum/latest": Object.freeze(["GM-V103-A01-FRONT", "GM-V103-A01-BACK", "GM-V103-A01-SLIP"]),
    "/files/img-1842": Object.freeze(["GM-V103-A01-FRONT", "GM-V103-A01-BACK", "GM-V103-A01-SLIP"]),
    "/workspace/source": Object.freeze(["GM-V103-A01-FRONT", "GM-V103-A01-BACK", "GM-V103-A01-SLIP", "GM-V103-A06-HELISHU"]),
    [`/snapshot/${sourceCapture.key}`]: Object.freeze(["GM-V103-A06-HELISHU"]),
    [`/snapshot/${repeatedCapture.key}`]: Object.freeze(["GM-V103-A06-HELISHU"]),
    "/chengnanli/topic/63192": Object.freeze(["GM-V103-A02-COLLAGE"]),
    "/files/cn-63192-collage": Object.freeze(["GM-V103-A02-COLLAGE"]),
    "/oldnews/article/20040919-04": Object.freeze(["GM-V103-A07A-RIVER"]),
    "/oldnews/article/20040920-02": Object.freeze(["GM-V103-A07B-RIVER-FOLLOWUP"]),
    "/workspace/river": Object.freeze(["GM-V103-A07A-RIVER", "GM-V103-A07B-RIVER-FOLLOWUP"]),
    "/oldnews/article/20110512-03": Object.freeze(["GM-V103-A08-SEWING"]),
    "/oldnews/notices/20161104-08": Object.freeze(["GM-V103-A09-HELING-OBITUARY"]),
    "/workspace/posthumous-relation": Object.freeze(["GM-V103-A09-HELING-OBITUARY", "GM-V103-A01-BACK"]),
    [`/rumor-snapshot/${earlyForumCapture.key}`]: Object.freeze(["GM-V103-A10A-NANQIAO-EARLY"]),
    [`/rumor-snapshot/${resolvedForumCapture.key}`]: Object.freeze(["GM-V103-A10B-NANQIAO-MORNING"]),
    "/workspace/nanqiao": Object.freeze(["GM-V103-A10A-NANQIAO-EARLY", "GM-V103-A10B-NANQIAO-MORNING"]),
    "/archive/results/heqi-20170419": Object.freeze(["GM-V103-A11-CAPTURE-STRIP"]),
    [RITUAL_CAPTURE_ROUTE]: Object.freeze(["GM-V103-A03-STATUS"]),
    "/workspace/hls07-midnight": Object.freeze(["GM-V103-A03-STATUS", "GM-V103-A11-CAPTURE-STRIP"]),
    [FOLKLORE_NOTE_ROUTE]: Object.freeze(["GM-V103-A04-FOLKLORE"]),
    "/workspace/ghost-matchmaker-tradition": Object.freeze(["GM-V103-A04-FOLKLORE"]),
    [CLEANUP_ROUTE]: Object.freeze(["GM-V103-A05-CLEANUP"]),
    "/workspace/ghost-sedan": Object.freeze(["GM-V103-A05-CLEANUP", "GM-V103-A04-FOLKLORE", "GM-V103-A03-STATUS"]),
    [SEDAN_ROUTE]: Object.freeze(["GM-V103-A12-EAST-LANE"]),
    [CHEN_OBITUARY_ROUTE]: Object.freeze(["GM-V103-A13-CHEN-OBITUARY"]),
    "/workspace/seven-day-rule": Object.freeze(["GM-V103-A03-STATUS", "GM-V103-A13-CHEN-OBITUARY"]),
    "/workspace/archive-bag": Object.freeze(["GM-V103-A03-STATUS"]),
  });
  const visualEndingAssetIds = Object.freeze(["GM-V103-A14-ENDING-BAG"]);

  const contentNotes = Object.freeze({
    entry: Object.freeze({
      id: "note-content-entry",
      label: "Content note",
      text: "Later sections discuss harm in adult intimate relationships, bereavement, and family privacy. A more specific notice appears before the relevant pages. All people, institutions, and websites are fictional.",
      continueLabel: "Enter Chengnan Q&A",
    }),
    rumorEvidence: Object.freeze({
      id: "note-content-rumor",
      label: "Before you continue",
      text: "The next section contains allegations of sexual assault and self-harm, as well as death. The pages that follow ask you to check where those claims came from and what the surviving evidence can actually establish.",
      continueLabel: "Continue to the poster's update",
      leaveLabel: "Return to the thread for now",
    }),
  });

  const openingThread = Object.freeze({
    route: "/forum",
    browserTitle: "Chengnan Q&A | Research Help",
    badge: "Help",
    title: "Help tracing an old Helishu printout my father left behind",
    author: "LooseLeafBinder",
    postedAt: "2024-05-18 10:42",
    editedAt: "2024-05-18 10:49",
    paragraphs: Object.freeze([
      "My father died years ago, and we never touched the boxes of notebooks he left behind. This year the old house is being cleared, just as the neighbourhood reference room is collecting wedding invitations and notes on local family customs. My mother agreed that anything suitable for public access could be donated, but pages mixed with other people's names or receipts have to be separated first. I have been tracing them one by one.",
      "One sheet looks as though it came from the web. Three characters remain in the lower-right corner: Helishu. My father's bookmarks contain a link with the same name, but it now opens only a shutdown notice. Part of the printout is missing. If it is simply a public reference page, I can record the source and donate it. If it carries somebody else's private history, I need to seal it away separately.",
      `The printout shares a plastic sleeve with a paper-collection slip dated ${pickupVisit.datetime.slice(0, 10)}. A pencil code on the back is only partly legible: ${hlsFragment}. Beside it is a note: “For outsiders: younger female cousin (biaomei). Change later.” I have covered the name. The moment my mother read that line, she said my father had no such cousin.`,
      "At first I assumed everything in the sleeve came from the same collection visit, but the code appears to belong to another month. It may simply have been added to the reverse later; sharing a sleeve does not prove the papers came from one appointment. Please help me identify which version of the page this was and whether the pencil code belongs to a service record. Do not guess the covered name.",
    ]),
    artifacts: Object.freeze([
      artifact("合礼书", "Helishu — Family Rites Notes", { id: "opening-brand" }),
      artifact("对外：表妹，以后再改", "For outsiders: younger female cousin (biaomei). Change later.", { id: "opening-biaomei-note" }),
    ]),
    attachment: Object.freeze({
      route: "/files/img-1842",
      fileName: "IMG_1842.jpg",
      caption: "Partial printout and collection slip (name redacted)",
      visibleLines: Object.freeze([
        "…use the form of address the family normally uses…",
        `Visitor verification: ${visitorFragment}`,
        hlsFragment,
      ]),
      artifact: artifact(Object.freeze(["……平时怎么叫，就按……", `访客校验：${visitorFragment}`, hlsFragment]),
        Object.freeze(["…use the form of address the family normally uses…", `Visitor verification: ${visitorFragment}`, hlsFragment]),
        { id: "img-1842-front-lines" }
      ),
    }),
    savedLink: Object.freeze({ label: "Old bookmarked address", route: "/retired", value: SAVED_URL }),
  });

  const initialForumReplies = Object.freeze([
    Object.freeze({
      floor: 2,
      name: "DeadLinkJanitor",
      role: "Research helper",
      postedAt: "2024-05-18 10:58",
      paragraphs: Object.freeze(["I opened the bookmark. The /go/ part looks like an internal redirect, not the page itself. Scroll down on the shutdown notice: there is an ‘original path’ line. Search PageTime with that full address instead of the bookmark."]),
      links: Object.freeze([{ label: "PageTime", route: "/archive" }]),
      signature: "If I find an old page, I save a copy.",
    }),
    Object.freeze({
      floor: 3,
      name: "ArchiveOffcuts",
      role: "Senior member",
      postedAt: "2024-05-18 11:05",
      paragraphs: Object.freeze(["I have a community handout on my computer with a similar line: ‘If you are unsure about a form of address, leave it blank in the draft and fill it in after you have asked everyone.’ The footer name is badly smudged; it looks like Lin Cheng to me. I no longer remember where I downloaded it. Compare the layout yourself."]),
      links: Object.freeze([{ label: SIDE_TRAIL.handout.fileName, route: SIDE_TRAIL.handout.routes[0] }]),
      signature: "Public material only. Do not ask me to identify people.",
    }),
    Object.freeze({
      floor: 4,
      name: "ChengnanOldPress",
      role: "Regular",
      postedAt: "2024-05-18 11:13",
      paragraphs: Object.freeze(["The ‘last updated’ line at the bottom of an old site is often site-wide, not the date of that article. Check the line under the title and any revision note at the end. Also keep http and https, and www and non-www, separate."]),
      links: Object.freeze([]),
      signature: "I collect old newspapers, bus tickets, and cinema stubs.",
    }),
    Object.freeze({
      floor: 5,
      name: "SnailDialup",
      role: "Member",
      postedAt: "2024-05-18 11:24",
      paragraphs: Object.freeze(["I opened the last capture. It is only a migration notice. I assumed the last saved page would be the latest version, but apparently not. I could not find the article on the new site."]),
      links: Object.freeze([]),
      signature: "",
    }),
    Object.freeze({
      floor: 6,
      name: "No16CassiaStreet",
      role: "Registered member",
      postedAt: "2024-05-18 11:31",
      paragraphs: Object.freeze(["A later site also has a page called ‘Forms of Address Between Two Families.’ The transcriber is Xiao Lin. It opens for me and looks like a migration, so I am posting it here."]),
      links: Object.freeze([{ label: "Reprint on Chengnan Memories", route: "/chengnanli/reprint/chengwei" }]),
      signature: "Collecting old Chengnan street numbers.",
    }),
    Object.freeze({
      floor: 7,
      name: "PagePicker",
      role: "Senior member",
      postedAt: "2024-05-18 11:39",
      paragraphs: Object.freeze([`The ${repeatedCapture.date} capture looks odd: the archive date is new, but the page still says ${sourceCapture.date}. There is a ‘response information’ link beside it that I do not understand.`]),
      links: Object.freeze([]),
      signature: "",
    }),
    Object.freeze({
      floor: 8,
      name: "PassingMrChen",
      role: "Member",
      postedAt: "2024-05-18 11:47",
      paragraphs: Object.freeze(["The pencil code may have been added during a later sort. The backs of my family's old receipts are covered in dates and numbers. I would not call them one visit just because they share a sleeve."]),
      links: Object.freeze([]),
      signature: "",
    }),
    Object.freeze({
      floor: 9,
      name: "ChengnanMod",
      role: "Board moderator",
      postedAt: "2024-05-18 12:02",
      paragraphs: Object.freeze(["Someone just posted an older person's name and phone number; I have collapsed it. OP, do not upload any unredacted original. Everyone else: use only what appears on public pages."]),
      links: Object.freeze([{ label: "Research Help board rules", route: "/forum/board/rules" }]),
      signature: "Chengnan Q&A moderation team",
    }),
    Object.freeze({
      floor: 10,
      name: "SouthGateALiang",
      role: "Member",
      postedAt: "2024-05-18 12:08",
      paragraphs: Object.freeze(["The attachment is too small on my phone. Bumping this for now; I will look on a computer tonight."]),
      links: Object.freeze([]),
      signature: "",
    }),
  ]);

  const forumHotTopics = Object.freeze([
    Object.freeze({ id: "locksmith", board: "Chengnan Life", title: "Where did the West Market key-cutting stall move?", author: "BrassKey", replies: 11, layer: "ordinary", body: "The north-gate stall moved to the shed east of the grain shop. The old sign did not move with it. Sundays until 3 p.m.; no car remotes." }),
    Object.freeze({ id: "bus-2004", board: "Old City Memories", title: "What time was the last Route 15 bus in 2004?", author: "BusFanAJian", replies: 19, layer: "ordinary", body: "The summer timetable says 21:20 from the railway station, reaching Nanqiao around 21:47. Winter may have been ten minutes earlier. Add a photo if anyone has the old stop sign." }),
    Object.freeze({ id: "pavilion", board: "Old City Memories", title: "Where is the pavilion behind my grandmother in this photo?", author: "CassiaLane", replies: 34, layer: "ordinary", body: "The back says ‘South Gate 1986.’ It has a hexagonal roof and what may be a red bus-stop sign beside it. I have checked People's Park, the Cultural Palace, and the old coach station with no match." }),
    Object.freeze({ id: "badge", board: "Old City Memories", title: "High-resolution image of Chengnan No. 3 Primary's old badge?", author: "SchoolHistoryCorner", replies: 8, layer: "ordinary", body: "The school-history display is missing the round badge used from 1991 to 1996. Photograph the badge only; do not upload a full class photo with faces." }),
    Object.freeze({ id: "paper", board: "Family Customs", title: "Who still thread-binds A3 genealogy paper?", author: "OldHeBookbinder", replies: 17, layer: "ordinary", body: "The west-side print shop still has off-white A3, but only by the ream. South Gate Copy will trim it; check the binding-hole positions yourself." }),
    Object.freeze({ id: "bookmarks", board: "Research Help", title: "Recovered bookmarks from an old drive are all garbled", author: "DeadLinkJanitor", replies: 26, layer: "adjacent", body: "Every Chinese title is a square, but the URLs still work. Do not overwrite the file yet; the bookmarks may still be UTF-8." }),
    Object.freeze({ id: "blue-folder", board: "Chengnan Life", title: "Lost property: blue checked document pouch with receipts", author: "WestMarketRounds", replies: 5, layer: "ordinary", body: "Found this morning on a bench in Row 2: two payment receipts and a small key. Names covered. Handed to the north-gate duty room." }),
    Object.freeze({ id: "dialect", board: "Family Customs", title: "Dialect term for my maternal grandmother's elder sister?", author: "SouthGateALiang", replies: 13, layer: "adjacent", body: "Our family says ‘dayilao’; the next county says ‘dalaolao.’ In a memorial album, use what your own family normally says rather than forcing one standard." }),
    Object.freeze({ id: "sunday", board: "Research Help", title: "Is the reference station actually open on Sundays?", author: "HalfMountainGuest", replies: 21, layer: "adjacent", body: "Only downloads and self-service search are open on Sundays; the desk does not register paper materials. The old sign says ‘weekends open,’ which is easy to misread." }),
    Object.freeze({ id: "cinema-ticket", board: "Old City Memories", title: "Does anyone remember the People's Cinema ticket price in 1998?", author: "FilmCan", replies: 29, layer: "ordinary", body: "I have an evening ticket marked 8 yuan. Student tickets may have been 5. The people who remember 10 are probably thinking of after the renovation." }),
    Object.freeze({ id: "seal-scan", board: "Research Help", title: "How do I recover a very faint seal in a scan?", author: "PagePicker", replies: 7, layer: "ordinary", body: "Do not max out the contrast first; the paper grain will turn black too. Convert to greyscale and suppress the background, and always keep the original." }),
    Object.freeze({ id: "flower-market", board: "Chengnan Life", title: "Temporary bus diversion for the Qingming flower market", author: "FlowerMarketDuty", replies: 14, layer: "ordinary", body: "South Gate East Road is occupied for two days. Routes 15 and 22 divert behind the Cultural Palace. The temporary stop has no shelter." }),
  ]);

  const falsePaths = Object.freeze({
    communityHandout: Object.freeze({
      id: "false-path-community-handout",
      siteId: "site-oldnews",
      entryLabel: "A community handout has a similar line",
      pages: Object.freeze([
        Object.freeze({
          route: SIDE_TRAIL.handout.routes[0],
          title: SIDE_TRAIL.handout.fileName,
          eyebrow: "Dongqiao Family Affairs Lecture | Session 4",
          paragraphs: Object.freeze([
            "Every family uses forms of address differently. This handout lists common examples; it cannot replace what the elders in your own family say.",
            `“${SIDE_TRAIL.handout.similarQuote}”`,
            "Before writing on a place card, gift list, or memorial album, establish who is addressing whom. If the two families use different terms, each may keep its own.",
          ]),
          footer: `Catalogue ${SIDE_TRAIL.handout.catalogueId} | For this lecture only`,
        }),
        Object.freeze({
          route: SIDE_TRAIL.handout.routes[1],
          title: SIDE_TRAIL.handout.title,
          fields: Object.freeze([
            ["Created", SIDE_TRAIL.handout.eventDate],
            ["Responsible person", SIDE_TRAIL.handout.creditedName],
            ["Source", "Dongqiao Family Affairs Lecture, Session 4"],
            ["Carrier", "audio transcript and loose sheets distributed on site"],
            ["Digitised", "2019-11-06"],
          ]),
          note: "The text was completed from an on-site recording after the lecture. Spoken examples were retained, but no website or book source was cited line by line.",
        }),
        Object.freeze({
          route: SIDE_TRAIL.handout.routes[2],
          title: "Dongqiao Family Affairs Lecture, Session 4 | Source handover",
          fields: Object.freeze([
            ["Source carrier", SIDE_TRAIL.handout.sourceCarrier],
            ["External attachments", "None"],
            ["Imported from the web", "No record"],
          ]),
          note: "The line about leaving an uncertain form of address blank came from the audience Q&A. The recording names no website; this handout cannot be the direct source of the Helishu printout.",
        }),
      ]),
      closure: "The similar sentence came from a 2016 on-site recording and has no web-import record. This rules it out only as the direct source of the current printout.",
    }),
    reprint2020: Object.freeze({
      id: "false-path-reprint-2020",
      siteId: "site-chengnan-oldstories",
      entryLabel: "A matching title and a ‘Xiao Lin’ byline",
      pages: Object.freeze([
        Object.freeze({
          route: "/chengnanli/reprint/chengwei",
          title: "Forms of Address Between Two Families",
          meta: "Transcribed by Xiao Lin | 2020-06-12",
          paragraphs: Object.freeze([
            "Before writing a form of address on banquet place cards or in a memorial album, establish who is addressing whom. If the two families use different terms, there is no need to force them into one.",
            "‘Use the term your family has always used. If you have not checked it, leave it blank for now.’",
            "The source also contained tables and excerpts from reader messages. Only three passages have been entered here.",
          ]),
          sourceLine: "Source: scanned page from an old draft (original publication pending)",
        }),
        Object.freeze({
          route: "/chengnanli/reprint/author/xiaolin",
          title: "Transcriber: Xiao Lin",
          paragraphs: Object.freeze(["Xiao Lin is the site name of Lin Xiaozhou, who proofreads OCR from old handouts and community booklets. The handle comes from Lin's own surname and is unrelated to the author of the source material."]),
        }),
        Object.freeze({
          route: "/chengnanli/reprint/chengwei/log",
          title: "Forms of Address Between Two Families | Transcription and revision log",
          rows: Object.freeze([
            Object.freeze(["2020-06-12", "Created", "Entered three extracts from p. 34 of the 2018 Family Customs Handbook", "xiaolin"]),
            Object.freeze(["2020-06-13", "Proofread", "Corrected one OCR error", "muxi16"]),
            Object.freeze(["2020-07-02", "Source note", "Paper copy supplied by the South Gate reading corner; no original web address attached", "xiaolin"]),
          ]),
          fields: Object.freeze([["Source carrier", "2018 paper booklet"], ["Imported from the web", "No"], ["Original-site author", "Not recorded"]]),
        }),
      ]),
      closure: "‘Xiao Lin’ is the transcriber Lin Xiaozhou. The material came from a 2018 paper booklet and was not imported from the web. It is not a verifiable migration of the old site.",
    }),
    sameNameChen: Object.freeze({
      id: "false-path-same-name-chen",
      siteId: "site-chengnan-records",
      entryLabel: "Another ‘Mr Chen’ on the same day",
      pages: Object.freeze([
        Object.freeze({
          route: `/records/dayi/${FALSE_CASES.sameName.answer.code}`,
          title: `Public Q&A ${FALSE_CASES.sameName.answer.code}`,
          fields: Object.freeze([
            ["Display name", FALSE_CASES.sameName.answer.name],
            ["Visitor verification ID", FALSE_CASES.sameName.answer.visitor],
            ["Case ID", FALSE_CASES.sameName.answer.item],
            ["Subject", FALSE_CASES.sameName.answer.subject],
          ]),
          question: FALSE_CASES.sameName.answer.question,
          reply: FALSE_CASES.sameName.answer.reply,
        }),
        Object.freeze({
          route: `/records/visits/${FALSE_CASES.sameName.answer.visitor}`,
          title: `Visitor record ${FALSE_CASES.sameName.answer.visitor}`,
          rows: FALSE_CASES.sameName.visits,
        }),
        Object.freeze({
          route: `/records/status/${FALSE_CASES.sameName.status.code}`,
          title: `Case record ${FALSE_CASES.sameName.status.code}`,
          fields: Object.freeze([["Case category", FALSE_CASES.sameName.status.category], ["Status", FALSE_CASES.sameName.status.state]]),
          rows: FALSE_CASES.sameName.status.steps,
        }),
      ]),
      closure: `The display name matches, but the visitor ID, case ID, time, and delivered material do not. This record cannot be joined to ${VISITOR_ID}.`,
    }),
    mayRecapture: Object.freeze({
      id: "false-path-may-recapture",
      siteId: "site-page-time",
      entryLabel: `Another 200 response appears on ${repeatedCapture.date}`,
      pages: Object.freeze([
        Object.freeze({
          route: `/archive/meta/${repeatedCapture.key}`,
          title: `${repeatedCapture.date} response information`,
          fields: Object.freeze([
            ["HTTP", "200 OK"],
            ["Body size", repeatedCapture.size],
            ["Last-Modified", sourceCapture.date],
            ["Body digest", "Identical to the previous capture"],
            ["Capture reason", "Scheduled recrawl"],
          ]),
          note: "This capture shows only that the origin returned the same body again. A capture date is not the date of the page content.",
        }),
        Object.freeze({
          route: `/archive/meta/${repeatedCapture.key}/job`,
          title: "Scheduled public-page recrawl",
          rows: Object.freeze([
            Object.freeze(["Job started", "Source: recurring recrawl queue; normal priority"]),
            Object.freeze(["Response received", "HTTP 200; server modification time unchanged"]),
            Object.freeze(["Digest comparison", `Matched the ${sourceCapture.date} capture`]),
            Object.freeze(["Job ended", "No content-change notification triggered"]),
          ]),
        }),
      ]),
      closure: `${repeatedCapture.date} is a new capture produced by a scheduled recrawl; its body matches ${sourceCapture.date}. It cannot prove the page never changed briefly between those two captures.`,
    }),
    riverReport: Object.freeze({
      id: "false-path-river-lin-xiaoling",
      siteId: "site-oldnews",
      entryLabel: "‘Xiaoling’ and ‘found by the river’ in the cropped headline",
      pages: Object.freeze([
        Object.freeze({
          route: riverNews.route,
          title: riverNews.title,
          meta: `Dongjiang Morning News | ${riverNews.date} | p. 3`,
          paragraphs: Object.freeze([
            "Lin Xiaoling, 52, of Dongjin Town in Dongjiang County, has been out of contact with her family for three days. Her family found the bicycle she normally uses on the riverside path beside the Qingjiang River but did not find her nearby.",
            "The family asks anyone with information to contact Dongjin Police Station and not to post unverified claims in the street.",
          ]),
          fields: Object.freeze([["Name", "Lin Xiaoling"], ["Age", "52"], ["Area", "Dongjin Town, Dongjiang County"], ["Found by the river", "Bicycle"]]),
          artifacts: Object.freeze([artifact("林晓玲", "Lin Xiaoling", { id: "river-name" })]),
        }),
        Object.freeze({
          route: riverFollowup.route,
          title: riverFollowup.title,
          meta: `Dongjiang Morning News | ${riverFollowup.date} | p. 2`,
          paragraphs: Object.freeze([
            "There has been an update to yesterday's missing-person notice. Lin Xiaoling contacted her family on the afternoon of the 19th and is currently unharmed.",
            "Her family has asked people to stop reposting the search photograph and phone number. The object previously found was the bicycle she normally uses, not Lin herself.",
          ]),
        }),
      ]),
      closure: `The subject is 52-year-old Lin Xiaoling of Dongjiang County. A bicycle was found by the river, and Lin contacted her family the next day. This report is not about ${DISPLAY.woman}.`,
      boundary: `This rules out only the identity connection between these two articles and ${DISPLAY.woman}. It does not prove she never suffered some other harm.`,
    }),
  });

  const oldStoriesTopics = Object.freeze([
    Object.freeze({ id: "64001", title: "The final film before the People's Cinema was demolished", author: "FilmCan", date: "2021-07-22", layer: "ordinary", body: "I found two ticket stubs from winter 1998. One says ‘evening’; the other retains only half a title. The last ticket sale and the final screening may not have been the same day. I will update this if I find that day's paper." }),
    Object.freeze({ id: "63972", title: "How many times did South Gate Photo Studio change its name?", author: "GlassNegative", date: "2021-07-21", layer: "adjacent", body: "Photographs show signs reading South Gate, Red Star, and New South Gate, but the business directory records only two registrations. The third sign may have been an informal change by the owner." }),
    Object.freeze({ id: "63888", title: "Looking for old Route 15 bus-stop signs", author: "BusFanAJian", date: "2021-07-19", layer: "ordinary", body: "Original images only, with the stop name and year legible. West Market was restored to the route later; do not apply a later map to an earlier diversion." }),
    Object.freeze({ id: "63815", title: "Moves of the West Market alterations stalls", author: "TwoLengthsOfCloth", date: "2021-07-18", layer: "adjacent", body: "Stall numbers changed around the market renovation. Several shops moved to the north gate and returned six months later. Photographs taken in different directions make one shop look like two." }),
    Object.freeze({ id: "63751", title: "Hardware shops in the old telephone directory", author: "BrassKey", date: "2021-07-17", layer: "adjacent", body: "Two shops shared the same name, one at South Gate and one in Dongqiao. The directory gives shop names but no owners, so separate them by street first." }),
    Object.freeze({ id: "63684", title: "When was the blue street plate behind the grain shop replaced?", author: "StreetPlateBox", date: "2021-07-14", layer: "ordinary", body: "I have photographs from 2007 and 2010, with the years between missing. The number is the same. Colour alone cannot date it." }),
    Object.freeze({ id: "63577", title: "The date on this Nanqiao cinema stub is unreadable", author: "OldTicketStub", date: "2021-07-11", layer: "ordinary", body: "Only ‘03’ remains of the blue stamp on the back. It could be a date or a screening number. Posting the original without guessing." }),
    Object.freeze({ id: "63409", title: "Two school badges in one Chengnan No. 3 Primary class photo", author: "SchoolHistoryCorner", date: "2021-07-06", layer: "ordinary", body: "The same graduating class had a retake; the badge does not indicate a school renaming. If anyone has the print date on the photo envelope, please photograph it." }),
  ]);

  const oldNewsCopy = Object.freeze({
    "result-lin-xiaoling-river": Object.freeze({ layer: "main", summary: "A 52-year-old woman from Dongjin Town is out of contact; her family found her usual bicycle on a riverside path." }),
    "result-lin-xiaoling-followup": Object.freeze({ layer: "main", summary: "She contacted her family on the afternoon of the 19th and is unharmed." }),
    "result-he-ling-profile": Object.freeze({ layer: "main", summary: `${DISPLAY.woman} runs an alterations stall in West Market; regulars still use her factory nickname, ${DISPLAY.womanNickname}.` }),
    "result-he-ling-obituary": Object.freeze({ layer: "main", summary: `${DISPLAY.woman} died on ${CANONICAL.dates.heLingDeath}; the notice gives no cause of death.` }),
    "result-xiao-ling-school": Object.freeze({ layer: "ordinary", summary: "An alumni association adds a graduate with the same name; the record includes class and graduation year." }),
    "result-xiaoling-market": Object.freeze({ layer: "ordinary", summary: "Zhao Xiaoling appears in a replacement stall-permit list and is not the West Market alterations-stall operator." }),
    "result-xiaoling-bus": Object.freeze({ layer: "ordinary", summary: "A letter about giving up a seat on Route 15 is signed Zhou Xiaoling." }),
    "result-lin-xiaoling-notice": Object.freeze({ layer: "ordinary", summary: "A Dongjiang County volunteer commendation has the same name but a different date and subject." }),
    "result-heling-tailor-ad": Object.freeze({ layer: "adjacent", summary: "An old advertisement index preserves the shop name and district but adds no biographical facts." }),
    "result-xiaoling-photo": Object.freeze({ layer: "ordinary", summary: "Chen Xiaoling appears in an old photo studio's negative register; the district is Chengbei." }),
    "result-heling-directory": Object.freeze({ layer: "adjacent", summary: "A local business-directory correction changes directory fields only." }),
    "result-xiaoling-ocr-correction": Object.freeze({ layer: "adjacent", summary: "An OCR name correction demonstrates that search expansion does not merge identities." }),
  });

  const oldNewsResults = Object.freeze(NEWS_RESULTS.map((item) => Object.freeze({
    ...item,
    hit: item.actualTerm,
    ...(oldNewsCopy[item.id] || { layer: "ordinary", summary: "Catalogue summary pending." }),
  })));

  const sites = Object.freeze({
    chengnanWenda: Object.freeze({
      id: "site-chengnan-wenda",
      label: "Chengnan Q&A",
      browserTitle: "Chengnan Q&A | Research Help",
      ordinary: forumHotTopics,
      adjacent: Object.freeze([
        Object.freeze({ route: "/forum/board/rules", title: "Research Help board rules", paragraphs: Object.freeze(["Post only material that is already public or has names and phone numbers covered.", "When reposting an old web page, include its URL and the date you saw it.", "Do not infer a real identity from a username.", "Once a request is resolved, the original poster may mark the thread ‘Resolved.’"]) }),
        Object.freeze({ route: "/forum/search?keyword=收藏夹", title: "Site search: bookmarks", note: "Shows ordinary threads while preserving the search term, page number, and return position." }),
      ]),
      main: Object.freeze([openingThread]),
      falsePathIds: Object.freeze(["false-path-community-handout", "false-path-reprint-2020"]),
    }),
    pageTime: Object.freeze({
      id: "site-page-time",
      label: "PageTime",
      browserTitle: "PageTime | Web Capture Search",
      ordinary: Object.freeze([
        Object.freeze({ route: "/archive/help/url", title: "Searching by full URL", body: "Protocol, hostname, and path together define one capture timeline. http and https, and www and non-www addresses, are stored separately." }),
        Object.freeze({ route: "/archive/help/status", title: "Response-status guide", body: "A 200 response normally contains a body; 206 may contain only part of one. A 304, redirect, or error response may have no replayable body." }),
        Object.freeze({ route: "/archive/tasks/transit", title: "Public-transport route reference", status: 200, body: "Scheduled recrawl complete; body available for replay." }),
        Object.freeze({ route: "/archive/tasks/cinema", title: "Old-cinema screening index", status: 403, body: "The site's robots policy refused this capture." }),
      ]),
      adjacent: Object.freeze([
        Object.freeze({ route: "/archive/help/time", title: "Capture time and page time", body: "Capture time records when PageTime received a response. Publication date and Last-Modified describe when the page claims its content is from. They are not interchangeable." }),
        Object.freeze({ route: `/archive/meta/${repeatedCapture.key}`, title: `${repeatedCapture.date} response information`, body: "The digest matches the previous capture; the reason is a scheduled recrawl." }),
        Object.freeze({ route: `/archive/capture/${CAPTURES.find((item) => item.status === 206).key}`, title: "Partial response", body: "Only the page header and part of the body were saved. Missing text cannot be reconstructed." }),
      ]),
      main: Object.freeze([
        Object.freeze({ route: "/archive", title: "Search by full URL", fields: Object.freeze([["Original Helishu path", ORIGINAL_URL], ["Volunteer profile", PERSON_URL], ["Nanqiao thread", RUMOR_URL]]) }),
        Object.freeze({ route: "/archive/results/helishu", title: "Helishu capture history", rows: CAPTURES }),
        Object.freeze({ route: "/archive/results/nanqiao", title: "Nanqiao thread capture history", rows: RUMOR_CAPTURES }),
        Object.freeze({
          route: "/archive/results/heqi-20170419",
          title: "Rites for the Deceased status-page captures",
          fields: Object.freeze([["Original URL", "https://www.helishu.example/status/GH-170419-01"], ["Index scope", "Public request responses"]]),
          rows: Object.freeze(RECORDS.ritualCaptureTimeline.map((row) => Object.freeze([row.at, row.http, row.readable, row.bodyHash, row.result]))),
          rowHeaders: Object.freeze(["Capture time", "HTTP", "Body readable", "Body-field SHA-256", "Note"]),
          scopeNote: "Seven minutes elapsed between the first readable capture at 00:12:08 and the first recorded 410 response at 00:19:08. Four capture points cannot prove that the page remained continuously public for exactly seven minutes. The surviving public index also contains no void page.",
        }),
        Object.freeze({
          route: FOLKLORE_CAPTURE_ROUTE,
          title: "Capture history for two Chengnan old-customs pages",
          fields: Object.freeze([["Search path", "/customs/guren-heli-2009"], ["First grouped capture", "2009-04-02 03:18:44"]]),
          rows: Object.freeze([
            Object.freeze(["2009-04-02 03:18:44", FOLKLORE_ROUTE, "200", "Rites for the Deceased and Red/White Forms of Address"]),
            Object.freeze(["2009-04-02 03:19:02", FOLKLORE_NOTE_ROUTE, "200", "Nanqiao reader follow-up"]),
          ]),
          rowHeaders: Object.freeze(["Capture time", "Path", "HTTP", "Title"]),
          scopeNote: "The index establishes that both pages were readable no later than April 2009. It does not certify the oral account as fact.",
        }),
      ]),
      falsePathIds: Object.freeze(["false-path-may-recapture"]),
    }),
    helishu: Object.freeze({
      id: "site-helishu",
      label: "Helishu",
      browserTitle: "Helishu | Family Rites Notes",
      ordinary: Object.freeze([
        Object.freeze({ route: "/snapshot/ordinary/inlaw", title: "How to open an invitation to the in-laws", dateLabel: "04-16", summary: "Use an established form of address as usual and state the invitation separately in the body." }),
        Object.freeze({ route: "/snapshot/ordinary/seating", title: "Forms of address on family-banquet seating cards", dateLabel: "04-05", summary: "Write for the person reading the card and use the family's everyday term; the two sides need not match exactly." }),
        Object.freeze({ route: "/snapshot/ordinary/memorial", title: "Checking memorial-album page numbers", dateLabel: "02-22", summary: "Check names, page numbers, and photograph captions before sending the album to print." }),
        Object.freeze({ route: "/snapshot/ordinary/pickup", title: "Collecting paper materials", dateLabel: "02-11", summary: "Verify the bag number on collection. The station does not retain copies of personal identity documents." }),
        Object.freeze({ route: "/snapshot/ordinary/writing", title: "Formal numerals on gift lists", dateLabel: "03-02", summary: "If local character forms are retained, add a note in the footer." }),
        Object.freeze({ route: "/snapshot/ordinary/privacy", title: "Privacy reminder for public messages", dateLabel: "03-29", summary: "Do not put names, addresses, or non-public family relationships into a public Q&A." }),
      ]),
      adjacent: Object.freeze([
        Object.freeze({ route: `/snapshot/${sourceCapture.key}/revision`, title: "Page revision record", paragraphs: Object.freeze(["Use the date beneath the title and this revision record for the article body. ‘Last updated’ in the footer is the site-wide maintenance date."] ) }),
        Object.freeze({
          route: `/snapshot/${migrationCapture.key}`,
          title: migrationCapture.title,
          paragraphs: Object.freeze(["No new material will be added to the old site. A complete HLS Q&A ID can be searched in the historical records at the Chengnan Folk Reference Station; usernames cannot be used as search terms."]),
          links: Object.freeze([{ label: "Open the Chengnan Folk Reference Station", route: "/records" }]),
        }),
      ]),
      main: Object.freeze([
        Object.freeze({
          route: `/snapshot/${sourceCapture.key}`,
          title: sourceCapture.title,
          meta: `Body revised: ${sourceCapture.date} | Edited by Xiao Ling`,
          paragraphs: Object.freeze([
            "When two families use different terms for the same relative, do not begin by forcing them into one table. Establish who is addressing whom, then check what each family normally says.",
            COMPLETE_QUOTE,
            "Public messages discuss wording only. A message containing a name, address, or non-public family relationship will be removed from public access and referred for offline checking.",
          ]),
          footer: "Site editor: Lin Cheng | Compiled from local usage | Cite the original page address when reposting",
        }),
        Object.freeze({
          route: RITUAL_CAPTURE_ROUTE,
          title: `Rites for the Deceased status ${RECORDS.ritualStatus.id}`,
          meta: `PageTime capture: ${RECORDS.ritualStatus.capturedAt} | HTTP 200 | First captured 410 for the same URL: ${RECORDS.ritualStatus.removedAt}`,
          fields: Object.freeze([
            ["Source Q&A", RECORDS.ritualStatus.sourceAnswer],
            ["Visitor verification ID", RECORDS.ritualStatus.visitor],
            ["Category", "Rites for the Deceased"],
            ["Deceased person", "He* [second character withheld]"],
            ["Public-facing kinship label", "biao* [remaining character withheld]"],
            ["Relationship verification", "Pending completion"],
            ["Living proxy signer", "Chen* [remaining character withheld]"],
            ["Generator", RECORDS.ritualStatus.generator],
            ["Offline reviewer", "Blank"],
            ["Manual override", "Blank"],
            ["Rites status", "Bond recorded as formed"],
          ]),
          artifacts: Object.freeze([
            artifact("故人合礼", "Rites for the Deceased", { id: "ritual-category" }),
            artifact("何*", "He* [second character withheld]", { id: "ritual-deceased-name" }),
            artifact("表*", "biao* [remaining character withheld]", { id: "ritual-public-relation" }),
            artifact("待补", "pending completion", { id: "ritual-pending" }),
            artifact("陈*", "Chen* [remaining character withheld]", { id: "ritual-living-signer" }),
            artifact("契成", "bond recorded as formed", { id: "ritual-formed" }),
          ]),
          scopeNote: "The public page masks names and the kinship label under its published rules. V-7C2F and HLS07 connect it to the same visitor record; the specific identities behind He*, biao*, and Chen* still depend on another public Q&A and the family's confirmation. This capture cannot establish the deceased person's consent, who entered the living signer's name, or that any offline ritual occurred.",
        }),
        Object.freeze({
          route: `/person-snapshot/${PERSON_CAPTURES.find((item) => item.readable && item.key !== "20160822").key}`,
          title: "Reference volunteer: Xiao Ling",
          meta: `Volunteer ID: ${zhaoStaffId}`,
          paragraphs: Object.freeze([
            "If a list contains names, cover them before showing it to me. I transcribe obituaries and wedding invitations as written. If a relationship is uncertain, I would rather leave it blank.",
            "This page describes web-cataloguing duties only. It does not publish the volunteer's legal name or contact details. The full volunteer ID can be checked against the station's public duty roster.",
          ]),
          artifacts: Object.freeze([artifact("小灵", "Xiao Ling, Zhao Ling's page byline", { id: "zhao-display-name" })]),
        }),
      ]),
      falsePathIds: Object.freeze([]),
    }),
    chengnanRecords: Object.freeze({
      id: "site-chengnan-records",
      label: "Chengnan Folk Reference Station",
      browserTitle: "Chengnan Folk Reference Station | Historical Records",
      ordinary: Object.freeze([
        ...RECENT_ANSWERS.slice(0, 8).map((item) => Object.freeze({ route: `/records/dayi/${item.code}`, title: item.subject, code: item.code, displayName: item.name, state: item.state })),
        Object.freeze({ route: "/records/status/P-1A70", title: "Initial check of a nephew's wedding-invitation wording", state: "Archived", note: "One proofread was completed after supplementary material was provided; the paper copy was collected the same day." }),
        Object.freeze({ route: "/records/status/P-8B12", title: "Wording on family-banquet table cards", state: "Archived", note: "No material was retained after the in-person consultation." }),
      ]),
      adjacent: Object.freeze([
        Object.freeze({ route: "/records/rules/v3.1", title: "Paper Materials and Public Q&A Registration Rules v3.1", paragraphs: Object.freeze(["Collection of paper after a case is closed must be registered separately from new work. A later staff entry for a past visit may not change the original closing date."]), rows: RULES }),
        Object.freeze({
          route: STATUS_RULE_ROUTE,
          title: "Status Summary Generation Guide v2.1",
          meta: "generator v2.1 | Effective 2016-12-01",
          paragraphs: Object.freeze([RECORDS.statusGeneration.wording, "A manual override is generated only when an authorisation-form number exists. Without one, the override field must remain blank and verification cannot be bypassed."]),
          fields: Object.freeze([["Status allowed while verification is pending", "Temporary"], ["Required for ‘Bond formed’", RECORDS.statusGeneration.completeRequires.join("; ")], ["Manual override", "Requires an authorisation-form number and a public audit trace"]]),
          scopeNote: "This page describes the normal field constraints of the public generator. It cannot explain why a particular anomalous page appeared.",
        }),
        Object.freeze({ route: "/records/policy/public-message-v2", title: "Public Message Handling Notice v2", paragraphs: Object.freeze(["Contact details, information about minors, non-public family relationships, and duplicate records use different reason codes. Hiding, anonymous republication, and merging are not the same action."]), rows: PRIVACY_ACTIONS }),
        Object.freeze({ route: "/records/notices/2017-02-18-maintenance", title: "Legacy-index restoration and duplicate-record handling", paragraphs: Object.freeze(["Duplicate IDs in a restoration batch carry the batch number. Manual visit entries and paper handovers are outside this restoration."] ) }),
      ]),
      main: Object.freeze([
        Object.freeze({
          route: `/records/dayi/${ANSWER_CODE}`,
          title: `Public Q&A ${ANSWER_CODE}`,
          fields: Object.freeze([["Visitor verification ID", RECORDS.answer.visitor], ["Linked case", RECORDS.answer.item], ["Status", "Answered"]]),
          question: RECORDS.answer.question,
          publicReply: "The list contains a name and a non-public family relationship, so it cannot be completed in a public Q&A. If you need wording checked, cover the name and submit a separate question. The original paper will not be collected again.",
          links: Object.freeze([{ label: "View the public index actions for that day", route: "/records/index-actions/2017-04" }]),
          artifacts: Object.freeze([artifact("对外：表妹，以后再改", "For outsiders: younger female cousin (biaomei). Change later.", { id: "hls06-biaomei" })]),
        }),
        Object.freeze({
          route: `/records/status/${ITEM_ID}`,
          title: `Case record ${ITEM_ID}`,
          fields: Object.freeze([["Category", "Family-rites copy-editing"], ["Status", RECORDS.item.state], ["Paper", `Collected on ${RECORDS.item.paperReturned}`]]),
        }),
        Object.freeze({
          route: `/records/visits/${VISITOR_ID}`,
          title: `Visit register ${VISITOR_ID}`,
          intro: "Public results are grouped by anonymous visitor verification ID. One visitor may have more than one case ID.",
          rows: RECORDS.visits,
        }),
        Object.freeze({
          route: `/records/reviews/${ITEM_ID}`,
          title: `Case-ID reuse review ${ITEM_ID}`,
          fields: Object.freeze([["Review ID", RECORDS.monthlyReview.id], ["Entries reviewed", RECORDS.monthlyReview.dates.join(", ")], ["Observed at the desk", RECORDS.monthlyReview.facts.join("; ")], ["Registration issue", RECORDS.monthlyReview.finding], ["Action", "Historical rows retained and marked as improper case-ID references"]]),
          scopeNote: `${RECORDS.monthlyReview.limit}; this record also does not establish the visitor's motives.`,
        }),
        Object.freeze({
          route: `/records/index-actions/${WITHDRAWN_CODE}`,
          title: `Index status change ${WITHDRAWN_CODE}`,
          fields: Object.freeze([["Visitor verification ID", RECORDS.withdrawn.visitor], ["Category", "Rites for the Deceased"], ["Public status", "Public access stopped"], ["Reason code", RECORDS.withdrawn.reason], ["Operator account", RECORDS.withdrawn.account], ["Action time", RECORDS.withdrawn.hiddenAtPrecise], ["Result", "Referred for offline verification"], ["Body text", "Not retained in the public index"]]),
          rows: Object.freeze([
            Object.freeze(["2017-04-18 16:45", "ID reserved", "No public body generated"]),
            Object.freeze(["2017-04-18 23:46", "Content submitted", "Private fields added; body did not enter the public copy"]),
            Object.freeze(["2017-04-19 00:12:31", "Public access stopped", "PRI-02; referred for offline verification"]),
          ]),
          rowHeaders: Object.freeze(["Time", "Status", "Public-copy note"]),
          scopeNote: "The record retains category, action time, account, and reason code. It does not expose the message body or establish who set fields on another page.",
          links: Object.freeze([{ label: "Read the status-summary generation guide", route: STATUS_RULE_ROUTE }, { label: "View ordinary status samples", route: STATUS_SAMPLES_ROUTE }, { label: "Search PageTime for the linked status page", route: "/archive/results/heqi-20170419" }]),
          artifacts: Object.freeze([artifact("故人合礼", "Rites for the Deceased", { id: "hls07-category" })]),
        }),
        Object.freeze({
          route: STATUS_SAMPLES_ROUTE,
          title: "April 2017 Status Summary Sample",
          meta: "Public test sample | No name fields",
          rows: Object.freeze(RECORDS.statusGeneration.samples.map((row) => Object.freeze([row.id, row.category, row.relationVerification, row.offlineReview, row.reviewer, row.state]))),
          rowHeaders: Object.freeze(["ID", "Category", "Relationship verification", "Offline review", "Reviewer", "Page status"]),
          scopeNote: "The eight-row sample includes ordinary wedding-invitation, memorial-album, and Rites for the Deceased records. It demonstrates field combinations only and does not explain the target-page anomaly.",
        }),
        Object.freeze({
          route: `/records/staff/${zhaoStaffId}`,
          title: `Public volunteer profile ${zhaoStaffId}`,
          fields: Object.freeze([["Name", DISPLAY.editor], ["Page display name", DISPLAY.editorNickname], ["Account", RECORDS.zhao.account], ["Assignments", "Kinship-page cataloguing, public-message copy-editing, and paper handovers"]]),
          artifacts: Object.freeze([artifact("赵灵 / 小灵", "Zhao Ling / Xiao Ling", { id: "zhao-name-pair" })]),
        }),
        Object.freeze({
          route: "/records/duty/2017-04/changes",
          title: `Volunteer shift-change record ${shiftChangeId}`,
          fields: Object.freeze([["Shift-change form", RECORDS.zhao.shiftId], ["Evening cover", `${RECORDS.zhao.staffId} ${DISPLAY.editorNickname}`], ["Cover period", RECORDS.zhao.shift], ["Sign-out verified", "00:31 the next day"]]),
          rows: DUTY_ROWS,
          scopeNote: "The form records scheduling, sign-in, and sign-out only. It does not retain Q&A text or review conclusions.",
        }),
        Object.freeze({
          route: "/records/notices/2017-06-volunteers",
          title: "Xiao Ling leaves at the end of the month; catalogue handover",
          meta: "Internal handover note | 2017-06-28",
          paragraphs: Object.freeze([
            "Xiao Ling will finish this term's cataloguing duty at the end of the month. Lin Cheng will take over the web catalogue; the old volunteer profile will no longer be maintained separately.",
            "Old Zhou: I once saw wedding invitations and obituaries piled together on her desk and carelessly called her ‘Ghost Matchmaker.’ She told me to my face that she did not like it. I was out of line. Do not copy that name into future handover notes.",
            "Xiao Ling: The forms-of-address catalogue is sorted by section. Three messages remain in the queue. The black folding umbrella at reception is not mine; ask the owner about it if they return.",
          ]),
          artifacts: Object.freeze([artifact("鬼媒婆", "guǐ méipó, ‘ghost matchmaker’", { id: "handover-ghost-matchmaker" })]),
        }),
        Object.freeze({
          route: CLEANUP_ROUTE,
          title: "Nanqiao East Lane morning-cleaning record",
          meta: "Chengnan Street Cleaning Public Log | QS-NQ-170419-03 | Entered 2017-04-20 09:05",
          fields: Object.freeze([["Work time", RECORDS.ghostSedan.cleanupAt], ["Road section", "Nanqiao East Lane entrance"], ["Found", "Three short, blackened bamboo splinters; a clump of damp, person-shaped paper scraps; one length of red cotton cord; and scattered joss paper from memorial offerings"], ["Action", "Cleared"], ["Crew", "Nanqiao Morning Team 2"]]),
          scopeNote: "This page establishes only that these remnants were cleared the following morning. The old account names four incense sticks and a spirit tablet; this log has only three bamboo splinters and no tablet. Their origin and any common cause remain unknown.",
        }),
      ]),
      falsePathIds: Object.freeze(["false-path-same-name-chen"]),
    }),
    chengnanOldStories: Object.freeze({
      id: "site-chengnan-oldstories",
      label: "Chengnan Memories",
      browserTitle: "Chengnan Memories | Streets, Old News, and People We Remember",
      ordinary: oldStoriesTopics,
      adjacent: Object.freeze([
        Object.freeze({ route: "/chengnanli/about", title: "About this site", body: "User posts are not endorsements of fact. When a post contains a name, address, or family relationship, moderators may ask for a source or require redaction." }),
        Object.freeze({ route: FOLKLORE_ROUTE, title: "Old-customs interview index: red and white forms of address", body: "Two interview pages from 2009 with the speaker, date received, and local scope recorded." }),
        Object.freeze({ route: "/chengnanli/search?keyword=搬迁", title: "Site search: relocation", body: "A shop's temporary move and formal renaming are listed separately." }),
        Object.freeze({ route: "/chengnanli/editorial/source-log", title: "How to add a source note", body: "Original images, reposted images, oral accounts, and later transcriptions occupy separate fields. If the original file cannot be found, write ‘pending’; do not fill it in from memory." }),
      ]),
      main: Object.freeze([
        Object.freeze({
          route: "/chengnanli/topic/63192",
          title: `Do these old images of ${DISPLAY.father} and “${DISPLAY.womanNickname}” really belong to the same story?`,
          author: "SouthGateOldHandle",
          postedAt: "2021-07-16 22:41",
          contentNoteId: "note-content-rumor",
          paragraphs: Object.freeze([
            `People in the old factory group have long said that ${DISPLAY.woman} only then learned ${DISPLAY.father} was not divorced. Some later retellings say, “he told her they had separated,” but I have not found ${DISPLAY.father}'s words from the time.`,
            `Before the old group closed, someone exported a long collage. One panel looks like the Nanqiao forum and says ${DISPLAY.womanNickname} did not return to the dorm. A chat crop retains only “she already said she didn't want to” and “it wasn't voluntary.” A newspaper result shows only “…Xiaoling missing for three days; found by the river…” At the bottom, someone added the later notice that ${DISPLAY.woman} had died.`,
            "Commenters turned those fragments into an allegation of sexual assault and a claim that she later died by suicide. The collage has no original filenames, and the chat has no timestamp. Those claims are too grave to treat several cropped images as one event.",
            "The old forum address is still legible, but the newspaper headline is cut off. If anyone has a complete page, post it unchanged. Do not contact her family or post an address.",
          ]),
          sourceBox: Object.freeze([["URL in the forum crop", RUMOR_URL], ["Reposting history", "Exported from a 2019 group backup and recropped in 2021; the four original filenames and their order were not retained"]]),
          comments: Object.freeze([
            Object.freeze(["NightSailing", "It says ‘not voluntary.’ What more do you need? I think he forced her."]),
            Object.freeze(["OldNanqiaoResident", "I saw the first two crops years ago. The river item and obituary appeared later with the long collage."]),
            Object.freeze(["WutongFactoryGate", "I remember that she stopped living in the dorm. I could not tell you which year she left the factory."]),
            Object.freeze(["OldFactoryGate", `I heard that she only later learned ${DISPLAY.father} was not divorced. I did not witness force or anything by the river, and I never heard her say it herself.`]),
            Object.freeze(["ReadingPictures", "The group always called the third crop ‘Xiao Ling by the river.’ Nobody can now find who first called it that."]),
            Object.freeze(["NanqiaoEastLane", "An old computer may still have the forum in its bookmarks. The drive will not mount. I will ask someone to try it this weekend."]),
            Object.freeze(["Anonymous", "I saw a shorter image without the obituary. It may simply have been too tall for the phone screen at the time."]),
            Object.freeze(["Moderator", "Replies containing addresses, relatives' names, and repeated arguments have been collapsed."]),
          ]),
        }),
        Object.freeze({
          route: "/files/cn-63192-collage",
          title: "cn_old_3914.jpg | Image viewer",
          blocks: Object.freeze([
            Object.freeze(["Nanqiao Life Forum", "…she said she didn't want to… he still came looking… | …didn't return to the dorm last night… towards Nanqiao…"]),
            Object.freeze(["Chat screenshot", "She already said she didn't want to | It wasn't voluntary back then | Isn't she gone now?"]),
            Object.freeze(["Old press search", "…Xiaoling missing for three days; found by the river…"]),
            Object.freeze(["West Market noticeboard", `${DISPLAY.woman} died on ${CANONICAL.dates.heLingDeath} | At the family's request, funeral arrangements will be kept simple`]),
          ]),
          artifactBlocks: Object.freeze([
            artifact("……她说不愿意了，他还是来找……｜……昨晚没回宿舍……南桥方向……", "…she said she didn't want to… he still came looking… | …didn't return to the dorm last night… towards Nanqiao…", { id: "collage-forum" }),
            artifact("她都说不愿意了｜当年就是不自愿｜后来人不是没了吗", "She already said she didn't want to | It wasn't voluntary back then | Isn't she gone now?", { id: "collage-chat" }),
            artifact("……晓玲失联三日，河边发现……", "…Xiaoling missing for three days; found by the river…", { id: "collage-headline" }),
            artifact(`何玲于${CANONICAL.dates.heLingDeath}去世｜遵家属意愿，丧事从简`, `${DISPLAY.woman} died on ${CANONICAL.dates.heLingDeath} | At the family's request, funeral arrangements will be kept simple`, { id: "collage-obituary" }),
          ]),
          metadata: "Four small images from a 2019 group backup were rearranged. The stitching app rewrote the metadata; original filenames, creation times, and order do not survive.",
        }),
        Object.freeze({
          route: FOLKLORE_ROUTE,
          title: "Rites for the Deceased and Red/White Forms of Address",
          author: "Chengnan Cultural Station Old-Customs Interview Team",
          postedAt: "2009-03-14 16:20",
          paragraphs: Object.freeze([
            "This is an edited transcript from a Chengnan Cultural Station interview about old forms of address. The speaker described only practices she had seen in Nanqiao; customs differed by street and family.",
            "At red rites, relationships among the living are written down; at white rites, relationships around the dead. The dead cannot answer. If a place in the family has not been verified, no one should fill it in for them.",
            "Auntie Liu said that a woman who checked names for the dead, passed the thread, and verified forms of address against a spirit tablet was sometimes called a ‘ghost matchmaker.’ It was not a respectful title, and women asked to do that work generally did not like it.",
            "If the relationship could not be established, the field was left blank. In both red and white rites, the worst breach was to invent a family place for someone who could no longer speak merely to make the paper look complete.",
          ]),
          sourceBox: Object.freeze([["Oral account", DISPLAY.auntieLiu], ["Edited by", "Chengnan Cultural Station Old-Customs Interview Team"], ["Scope", "A saying from one Nanqiao branch; neighbouring streets recorded different versions"]]),
          artifacts: Object.freeze([
            artifact("红事 / 白事", "red rites / white rites — auspicious family occasions and funeral or mourning occasions", { id: "red-white-rites" }),
            artifact("鬼媒婆", "guǐ méipó, ‘ghost matchmaker’", { id: "folklore-title-term" }),
            artifact("柳桂香（街坊称柳姑）", DISPLAY.auntieLiu, { id: "liu-guixiang" }),
          ]),
          sourceBoundary: "This page establishes only that an editor recorded Liu Guixiang's account in 2009. It does not establish that the custom was common, effective, or ever practised by Zhao Ling.",
        }),
        Object.freeze({
          route: FOLKLORE_NOTE_ROUTE,
          title: "Nanqiao Reader Follow-up: A Living Name in the Field for the Dead",
          author: "Editor, Chengnan Notes on Old Customs",
          postedAt: "2009-03-21 09:06",
          paragraphs: Object.freeze([
            "After the previous page was published, Auntie Liu sent two further sentences through a neighbour. She again stressed that this was only a saying from one Nanqiao branch and should not be treated as a rule to follow.",
            "The old account arranged four incense sticks, a paper-cut human figure, red cotton thread, and the deceased person's spirit tablet. If a living person's full name entered the field for the dead, a proxy signature also counted as entering that living name into the bond.",
            "Auntie Liu's words were: ‘If a living person's name is entered in the field for the dead and remains there for seven days, that living name passes into the white rites.’ The day the bond is recorded as formed does not count; counting begins the following day.",
            "She did not say on which day a death notice would appear or how anyone would die. The editor has retained her wording without claiming that it comes true.",
          ]),
          sourceBox: Object.freeze([["Follow-up account", "Liu Guixiang (Auntie Liu)"], ["Received", "2009-03-19"], ["Scope", "A saying from one Nanqiao branch"]]),
          artifacts: Object.freeze([
            artifact("香四支、剪纸人、红棉线和亡者牌位", "four incense sticks, a paper-cut human figure, red cotton thread, and the deceased person's spirit tablet", { id: "folklore-objects" }),
            artifact("活人名落故人栏，七日不撤，活名归白事。", "If a living person's name is entered in the field for the dead and remains there for seven days, that living name passes into the white rites.", { id: "seven-day-saying" }),
            artifact("契成当日不计，从次日起数。", "The day the bond is recorded as formed does not count; counting begins the following day.", { id: "seven-day-counting" }),
          ]),
          sourceBoundary: "This is an oral-history follow-up, not a ritual manual. The page establishes only that this wording was recorded in 2009; it does not establish that the saying comes true.",
        }),
      ]),
      falsePathIds: Object.freeze(["false-path-reprint-2020"]),
    }),
    oldNews: Object.freeze({
      id: "site-oldnews",
      label: "Chengnan Historical Press Archive",
      browserTitle: "Chengnan Historical Press Archive | Local Newspapers and Public Notices",
      ordinary: oldNewsResults,
      adjacent: Object.freeze([
        Object.freeze({ route: "/oldnews/help/ocr", title: "Names and OCR search expansion", body: "The catalogue preserves the term actually matched. Similar-sounding characters and uncertain OCR are used only to expand candidate results; they do not replace the full text's name, age, and area fields." }),
        Object.freeze({ route: "/oldnews/article/20030819-05", title: "Correction: captions swapped for two readers with the same name", body: "Readers with the same display name were rechecked by age and correspondence address and were not merged by name." }),
        Object.freeze({ route: SIDE_TRAIL.handout.routes[1], title: SIDE_TRAIL.handout.title, body: "The community-event catalogue stores creation date, responsible person, and source carrier together." }),
      ]),
      main: Object.freeze([
        ...falsePaths.riverReport.pages,
        Object.freeze({
          route: heLingProfile.route,
          title: heLingProfile.title,
          meta: `Chengnan Evening News | ${heLingProfile.date} | Neighbourhood shops`,
          paragraphs: Object.freeze([
            `${DISPLAY.woman} does alterations in Row 2 of West Market. Regular customers still use her factory nickname, ${DISPLAY.womanNickname}. After leaving the clothing factory, she first took work at home and rented this stall the following year.`,
            "The old sewing machine beside the counter has been in use for seven years, with its belt replaced three times. When business is heavy, she closes late and asks customers to collect finished clothes the next day.",
          ]),
          artifacts: Object.freeze([artifact("何玲 / 小玲", "He Ling / Xiao Ling, her factory nickname", { id: "heling-profile-name" })]),
          scopeNote: "This profile establishes only her public work and life in 2011. Her later ordinary life cannot prove that no earlier harm occurred.",
        }),
        Object.freeze({
          route: heLingObituary.route,
          title: "Death notice",
          meta: `West Market Merchants' Mutual Aid Association | ${heLingObituary.date}`,
          paragraphs: Object.freeze([`Ms ${DISPLAY.woman} died on ${CANONICAL.dates.heLingDeath}, aged 48.`, "In accordance with the family's wishes, funeral arrangements will be kept simple.", "The West Market Merchants' Mutual Aid Association offers its condolences."]),
          artifacts: Object.freeze([artifact(`何玲女士于 ${CANONICAL.dates.heLingDeath} 去世，终年48岁。\n遵家属意愿，丧事从简。\n西市场商户互助会谨致哀悼。`, `Ms ${DISPLAY.woman} died on ${CANONICAL.dates.heLingDeath}, aged 48. In accordance with the family's wishes, funeral arrangements will be kept simple. The West Market Merchants' Mutual Aid Association offers its condolences.`, { id: "heling-obituary" })]),
          scopeNote: "The public notice gives no cause of death, address, relatives' names, or ceremony location.",
        }),
        Object.freeze({
          route: CHEN_OBITUARY_ROUTE,
          title: "Death notice",
          meta: `Nanqiao Residents' Mutual Aid Association | ${RECORDS.chenObituary.publishedAt}`,
          paragraphs: Object.freeze([`Mr ${DISPLAY.father} died on ${RECORDS.chenObituary.deathDate}, aged 56.`, "In accordance with the family's wishes, funeral arrangements will be kept simple.", "The Nanqiao Residents' Mutual Aid Association offers its condolences."]),
          fields: Object.freeze([["Name", DISPLAY.father], ["Area", "Nanqiao"], ["Date of death", RECORDS.chenObituary.deathDate], ["Cause of death", "Not published"]]),
          artifacts: Object.freeze([artifact(`陈远先生于${RECORDS.chenObituary.deathDate}去世，终年56岁。\n遵家属意愿，丧事从简。\n南桥片区居民互助会谨致哀悼。`, `Mr ${DISPLAY.father} died on ${RECORDS.chenObituary.deathDate}, aged 56. In accordance with the family's wishes, funeral arrangements will be kept simple. The Nanqiao Residents' Mutual Aid Association offers its condolences.`, { id: "chen-obituary" })]),
          scopeNote: `The original poster and her mother confirm that this is the public notice posted for ${DISPLAY.father}. It gives no cause or precise time of death and establishes no causal connection to any old saying.`,
        }),
      ]),
      falsePathIds: Object.freeze(["false-path-community-handout", "false-path-river-lin-xiaoling"]),
    }),
    nanqiaoForum: Object.freeze({
      id: "site-nanqiao-forum",
      label: "Nanqiao Life Forum",
      browserTitle: "Nanqiao Life Forum | Neighbourhood Help",
      ordinary: Object.freeze([
        Object.freeze({ route: "/nanqiao/topic/bus", title: "How long will Route 15 be diverted?", author: "NanqiaoStop", body: "Roadworks at the Cultural Palace moved the temporary stop to the back street. The first service on Monday returns to the normal route." }),
        Object.freeze({ route: "/nanqiao/topic/key", title: "Keys lost outside the Cultural Palace", author: "SmallWorkCap", body: "Three keys on one ring with a red plastic tag marked ‘2-7.’ Handed to the kiosk." }),
        Object.freeze({ route: "/nanqiao/topic/rent", title: "Single room to sublet in Nanqiao East Lane", author: "EastLaneEntrance", body: "Second floor, south-facing, shared washroom. Site messages only; do not post a phone number." }),
        Object.freeze({ route: "/nanqiao/topic/shift", title: "When does the night-shift canteen close?", author: "BlueWorkJacket", body: "Hot dishes finish at 9:30. Steamed buns and soup remain until ten. Sundays are different." }),
        Object.freeze({ route: "/nanqiao/topic/tape", title: "Does anyone still have blank cassette tapes?", author: "OldTapeRecorder", body: "Need two 60-minute tapes for a Cultural Palace rehearsal. Used ones are fine if they can be recorded over." }),
      ]),
      adjacent: Object.freeze([
        Object.freeze({ route: "/nanqiao/topic/3908", title: "More than one road goes towards Nanqiao", author: "TofuShopBackDoor", body: "The route to her sister's home, the Route 15 stop, and the embankment all pass the Nanqiao entrance. Direction alone is a poor way to guess a destination." }),
        Object.freeze({ route: "/nanqiao/archive/help", title: "PageTime replay note", body: "Site search and some attachments were not captured. This page replays only the thread body saved at the time." }),
      ]),
      main: Object.freeze([
        Object.freeze({
          route: `/rumor-snapshot/${earlyForumCapture.key}`,
          title: earlyForumCapture.title,
          capturedAt: `${earlyForumCapture.date} ${earlyForumCapture.time}`,
          originalPost: `${DISPLAY.womanNickname} did not return to the dorm last night. Her bag is still in her locker, and her sister has been looking since the end of her shift. She argued with ${DISPLAY.father} last night. If you know where she went, send word to her sister. Do not post a phone number below; I will pass it on.`,
          replies: Object.freeze([]),
        }),
        Object.freeze({
          route: `/rumor-snapshot/${resolvedForumCapture.key}`,
          title: resolvedForumCapture.title,
          capturedAt: `${resolvedForumCapture.date} ${resolvedForumCapture.time}`,
          originalPost: `${DISPLAY.womanNickname} did not return to the dorm last night. Her bag is still in her locker, and her sister has been looking since the end of her shift. She argued with ${DISPLAY.father} last night. If you know where she went, send word to her sister. Do not post a phone number below; I will pass it on.`,
          replies: Object.freeze([
            Object.freeze(["LongStreetLamplight", "01:26", `She only found out last week that ${DISPLAY.father} was not divorced. She said she did not want to discuss it anymore. He has still been waiting outside the factory these past two days. They argued last night; I do not know anything else.`]),
            Object.freeze(["NanqiaoNightShift", "01:41", "After my shift I saw someone walking towards Nanqiao. It was dark; I could not see who it was."]),
            Object.freeze(["TofuShopBackDoor", "02:03", "Do not see ‘Nanqiao’ and immediately guess the river. Her sister's home is that way too. Contact the family first."]),
            Object.freeze(["BikeRepairAYong", "06:52", "The first Route 15 bus has left. Do not all crowd her sister's house; one person is enough."]),
            Object.freeze(["PaperWindmill", "08:14", "Phones run out of battery all the time. Find her before inventing stories in the building."]),
            Object.freeze(["OP Xiaoye", "10:31", "We have reached her. She is at her sister's home and her phone was dead. She says she will not return to the factory today and wants me to close the thread. Please stop reposting and stop guessing."]),
            Object.freeze(["NanqiaoModerator", "10:42", "The contact number has been removed. Speculation without a source from the person involved has been collapsed. Thread closed."]),
          ]),
          sourceBoundary: `The replies are contemporary public accounts by forum participants, not words written by ${DISPLAY.woman} herself. Reaching her safely that morning does not establish that no earlier conflict or harm occurred.`,
        }),
      ]),
      falsePathIds: Object.freeze([]),
    }),
    nanqiaoSuccessor: Object.freeze({
      id: "site-nanqiao-successor",
      label: "Nanqiao Neighbourhood Board",
      browserTitle: "Nanqiao Neighbourhood Board | Temporary Site After the Old Forum Closed",
      ordinary: Object.freeze([
        Object.freeze({ route: "/nanqiao2/topic/night-bus", title: "Any way to the railway station at 1 a.m.?", author: "RollingSuitcase", postedAt: "2017-04-18 19:22", body: "Route 15 stops earlier. There are sometimes night taxis at the East Lane entrance, but do not wait there alone for too long." }),
        Object.freeze({ route: "/nanqiao2/topic/red-cloth", title: "Whose red cloth was dropped at East Lane?", author: "BikeRepairAYong", postedAt: "2017-04-19 07:18", body: "I saw a small ash-stained piece by the road when I opened this morning. Someone took it away before the cleaners arrived. No idea whether it was left by whoever was filming last night." }),
        Object.freeze({ route: "/nanqiao2/topic/camera", title: "If you film after midnight, can you warn the street first?", author: "UpstairsLightSleeper", postedAt: "2017-04-20 09:06", body: "People keep asking about that night in East Lane. If you did not see clearly, do not turn it into a funeral story. If someone was filming, do not block the fire lane." }),
        Object.freeze({ route: "/nanqiao2/topic/water", title: "How long is the water off in East Lane tonight?", author: "WashroomSecondFloor", postedAt: "2017-04-18 18:04", body: "The stairwell notice says until ten; pressure may take another half hour. Households with older residents should fill two basins first." }),
        Object.freeze({ route: "/nanqiao2/topic/noodles", title: "Has the night-shift noodle stall stopped coming?", author: "BlueApron", postedAt: "2017-04-18 21:16", body: "The owner is resting a bad back for three days and will reopen Friday. Do not make a wasted trip to East Lane." }),
        Object.freeze({ route: "/nanqiao2/topic/keys", title: "Found: keys on a blue plastic ring", author: "NanqiaoGatekeeper", postedAt: "2017-04-19 08:11", body: "Three keys and a blue tag marked 4-2. They are in the gatekeeper's desk drawer; describe the key teeth when collecting." }),
        Object.freeze({ route: "/nanqiao2/topic/rent-chair", title: "Borrowing six folding chairs; returning tonight", author: "ByThePagodaTree", postedAt: "2017-04-19 10:25", body: "We have guests. Ordinary wooden chairs are fine. I will wipe and return them after use." }),
        Object.freeze({ route: "/nanqiao2/topic/cat", title: "The grey-and-white cat is in the old warehouse again", author: "SweetSoupShop", postedAt: "2017-04-19 13:42", body: "No collar, and a nick in the right ear. We gave it water but could not catch it." }),
        Object.freeze({ route: "/nanqiao2/topic/bike", title: "Which bicycle repair shop opens early?", author: "EarlyShiftWorker", postedAt: "2017-04-20 05:58", body: "The bridgehead shop opens at 6:30. The East Lane shop opens at eight." }),
        Object.freeze({ route: "/nanqiao2/topic/roof", title: "Who replaced the clothesline on Building 3's roof?", author: "BuildingThree", postedAt: "2017-04-20 17:33", body: "The new line is too loose; clothes hit the wall whenever the wind rises. Let us retie it together this weekend." }),
      ]),
      adjacent: Object.freeze([]),
      main: Object.freeze([
        Object.freeze({
          route: SEDAN_ROUTE,
          title: "That red sedan chair at East Lane after midnight—who was filming?",
          author: "NightSweeper",
          postedAt: RECORDS.ghostSedan.forumAt,
          originalPost: "A red sedan chair just went past the East Lane entrance. Four people were carrying it. It moved very slowly, but I could not hear the carrying poles or their footsteps. Is someone filming at this hour? Do not block the lane.",
          replies: Object.freeze([
            Object.freeze(["ThirdFloorWindow", "01:44", "I saw only a patch of red cloth at the lane entrance. It was far away and may not have been a sedan chair."]),
            Object.freeze(["DayGatekeeper", "01:51", "Who would film at this hour? It could also be a family holding white rites without telling the neighbours. Do not go downstairs and crowd around."]),
            Object.freeze(["NightSweeper", "02:03", "I did not get a photograph. It disappeared after turning by the pagoda tree, and I did not hear anyone speak."]),
            Object.freeze(["TemporaryModerator", "08:02", "There is no photograph and no second witness. The title will remain as posted; do not turn a guess into an announcement."]),
          ]),
          sourceBoundary: "This page establishes only that someone posted this sighting claim at 01:37 on 2017-04-19. It does not establish that a red sedan chair existed or that its bearers were nonhuman.",
        }),
      ]),
      falsePathIds: Object.freeze([]),
    }),
  });

  const workspaceSuccess = Object.freeze({
    zhaoIdentity: Object.freeze({
      afterBeatId: "puzzle-triangulate-zhao",
      title: "Identity and duty check complete",
      summary: `${RECORDS.zhao.account}, ${DISPLAY.editorNickname}, and ${RECORDS.zhao.staffId} correspond to ${DISPLAY.editor}. The ${RECORDS.withdrawn.hiddenAt.slice(-5)} action falls within her confirmed cover shift. ${privacyRuleId} explains only why public access stopped, not what the message said.`,
    }),
    nanqiaoComparison: Object.freeze({
      afterBeatId: BEATS_BY_ID["puzzle-compare-nanqiao"].id,
      title: "Nanqiao thread-body comparison",
      summary: `The morning version says ${DISPLAY.woman} had reached her sister's home and that the poster wanted reposting to stop. An earlier reply reports that she had only then learned ${DISPLAY.father} was not divorced, did not want to discuss the matter further, and that he was still waiting outside the factory.`,
      sourceBoundary: `This is a 2004 forum participant's public account, not a statement written by ${DISPLAY.woman}. Reaching her safely that morning cannot prove that no earlier harm occurred.`,
    }),
  });

  const solvedDispositionParagraphs = Object.freeze([
    "The woman in the riverside report was not her. But it is also true that my father still wrote her as a ‘younger female cousin’ after she had died. My mother said not to use the first correction to cancel out the second fact.",
    `This sleeve has been removed from the donation list. Its label says only: “Materials concerning ${DISPLAY.woman} | relationship unverified | no public name.” The actual-relationship field is blank.`,
    "The relationship field was not filled in again.",
    "No void page appears in the surviving public captures.",
    "That does not establish that the record was never cancelled, corrected, or dealt with offline. The public web cannot answer that.",
  ]);

  const completionCopy = Object.freeze({
    badge: "Resolved",
    title: "Thread status: Resolved",
    text: "This is where the public records that can still be found run out.",
    resetLabel: "Clear this browsing session",
  });

  const ownerReactions = Object.freeze({
    R01: Object.freeze({
      id: reactionSourceCorrection.id,
      afterBeatId: reactionSourceCorrection.readyAfterBeatIds[0],
      postedAt: "2024-05-18 12:24",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        `I checked the original again. The two missing digits look like “18.” The page itself says ${sourceCapture.date}, not ${repeatedCapture.date}. That means the printout and the collection slip dated ${RECORDS.item.paperReturned} cannot be treated as one appointment. I have corrected that line in the opening post.`,
      ]),
      links: Object.freeze([{ label: `Read the ${migrationCapture.date} section-migration notice`, route: `/snapshot/${migrationCapture.key}` }]),
    }),
    R02: Object.freeze({
      id: reactionRecordLink.id,
      afterBeatId: reactionRecordLink.readyAfterBeatIds[0],
      postedAt: "2024-05-18 12:51",
      author: "LooseLeafBinder",
      contentNoteId: "note-content-rumor",
      paragraphsBeforeSensitiveCopy: Object.freeze([
        `${RECORDS.answer.visitor} and ${RECORDS.answer.item} in ${RECORDS.answer.code} match the exposed parts of the numbers on the collection slip. My mother also recognised my father's signature and pencil writing. She agreed that I could reveal that line alone: my father, ${DISPLAY.father}; the name, ${DISPLAY.woman}. Everything else remains covered.`,
      ]),
      artifacts: Object.freeze([artifact("陈远 / 何玲", "Chen Yuan / He Ling", { id: "family-confirmed-names" })]),
      paragraphsAfterContentNote: Object.freeze([
        "Searching those two names led me to a 2021 repost. It joins cropped images into allegations of sexual assault, suicide, and death, but the original images are incomplete. I will not treat those claims as conclusions. I am posting only public sources.",
      ]),
      links: Object.freeze([{ label: `Do these old images of ${DISPLAY.father} and “${DISPLAY.womanNickname}” really belong to the same story?`, route: "/chengnanli/topic/63192" }]),
      sourceBoundary: "The names and handwriting are joined through family confirmation by the poster and her mother, not through a public system's identity verification.",
    }),
    R03: Object.freeze({
      id: reactionProcedureBoundary.id,
      afterBeatId: reactionProcedureBoundary.readyAfterBeatIds[0],
      postedAt: "2024-05-18 13:26",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        "The old-press results include several people rendered as Xiao Ling, Xiaoling, or He Ling. The riverside article and the West Market death notice are both there. I will not join people merely because their names sound alike.",
        `One fact does not require that identity guess: the West Market death notice predates public Q&A ${RECORDS.answer.code}. My mother said nothing after seeing the notice.`,
      ]),
      links: Object.freeze([]),
    }),
    R04: Object.freeze({
      id: reactionTitleProvenance.id,
      afterBeatId: reactionTitleProvenance.readyAfterBeatIds[0],
      postedAt: "2024-05-18 13:45",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        `My mother said only: “I remember ${DISPLAY.woman} died before the date on this printout. I cannot tell you what your father was still trying to change afterwards.”`,
        "‘Change later’ was written after the date on which she could no longer return to correct it. Beside the 06 on the back is another pencil impression; now it looks more like 07 from the same day.",
      ]),
      links: Object.freeze([]),
    }),
    R05: Object.freeze({
      id: reactionRiverExclusion.id,
      afterBeatId: reactionRiverExclusion.readyAfterBeatIds[0],
      postedAt: "2024-05-18 13:54",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        `I joined the riverside item incorrectly. The full article names 52-year-old Lin Xiaoling of Dongjiang County; the object found by the river was a bicycle. A brief item the next day says she contacted her family. This report is not about ${DISPLAY.woman}. I am removing this one connection only. The rest still needs checking.`,
      ]),
      links: Object.freeze([{ label: "Return to the collage and check the Nanqiao forum footer", route: "/chengnanli/topic/63192" }]),
    }),
    R06: Object.freeze({
      id: reactionPosthumousRelation.id,
      afterBeatId: reactionPosthumousRelation.readyAfterBeatIds[0],
      postedAt: "2024-05-18 14:12",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        `The morning Nanqiao capture supports only a few narrow statements: ${DISPLAY.woman} reached her sister's home; a contemporary reply reports that she only then learned ${DISPLAY.father} was not divorced, did not want to discuss the matter further, and that he still came to wait outside the factory. These are not her own written words.`,
        "I returned to the service-station index and checked 07. Its public body is gone. Only a category and several times remain, and the category is not an ordinary wording draft.",
      ]),
      links: Object.freeze([]),
    }),
    R07: Object.freeze({
      id: reactionHls07Midnight.id,
      afterBeatId: reactionHls07Midnight.readyAfterBeatIds[0],
      postedAt: "2024-05-18 14:26",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        "When my mother saw the two timestamps, she asked whether I had copied them backwards. The captured status page appears at 00:12:08—23 seconds before HLS07 is recorded as referred offline at 00:12:31. How could a status that should require offline checking appear first?",
        "The 00:19:08 capture is the first recorded 410 response; no later readable body appears in the surviving public index. The original message body is still unavailable. I am going to search older, ordinary pages for the old category ‘Rites for the Deceased.’",
      ]),
      links: Object.freeze([{ label: "Search the old-customs index on Chengnan Memories", route: "/chengnanli" }]),
    }),
    R08: Object.freeze({
      id: reactionGhostMatchmakerTradition.id,
      afterBeatId: reactionGhostMatchmakerTradition.readyAfterBeatIds[0],
      postedAt: "2024-05-18 14:39",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        "The 2009 interview and follow-up were both captured that same year. They were not added after my father's death. Auntie Liu described one Nanqiao branch, not ‘what all Chinese folklore says.’",
        "In the June handover, Old Zhou called Zhao Ling ‘Ghost Matchmaker,’ and she told him to his face that she disliked it. But the term on the local-history page predates his joke by eight years. The temporary Nanqiao board also has a post from that night. For now I have recorded only its time and road section.",
      ]),
      links: Object.freeze([{ label: "Open the Nanqiao Neighbourhood Board", route: "/nanqiao2" }, { label: "Return to the station's public log", route: "/records" }]),
    }),
    R09: Object.freeze({
      id: reactionGhostSedan.id,
      afterBeatId: reactionGhostSedan.readyAfterBeatIds[0],
      postedAt: "2024-05-18 14:51",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        "The sighting post says ‘red sedan chair.’ The cleaning log records only three blackened bamboo splinters, damp paper scraps, and a length of red cotton cord. The number does not match the old account, and there is no spirit tablet. Yet the records still cluster on the same night and road section.",
        "My mother said that my father's death notice also appeared in the old press. She remembers only the date and will not explain his cause of death for me.",
      ]),
      links: Object.freeze([{ label: "Return to the historical press archive", route: "/oldnews/home" }]),
    }),
    R10: Object.freeze({
      id: reactionSevenDayRule.id,
      afterBeatId: reactionSevenDayRule.readyAfterBeatIds[0],
      postedAt: "2024-05-18 15:02",
      author: "LooseLeafBinder",
      paragraphs: Object.freeze([
        `The status page was first readable on ${RECORDS.ritualStatus.capturedAt.slice(0, 10)}. My father died on ${RECORDS.chenObituary.deathDate}: the seventh calendar day under the recorded counting rule. The death notice was published on ${RECORDS.chenObituary.publishedAt}, the following day—not the seventh.`,
        "My mother pushed the final archive form back to me and said only: ‘Do not listen to me speak for her. Write only as far as the web pages allow. What happens to the field they cannot answer is still your decision.’",
      ]),
      links: Object.freeze([{ label: "Catalogue the evidence and seal the folder again", route: "/workspace/archive-bag" }]),
    }),
    R11: Object.freeze({
      id: reactionArchiveBag.id,
      afterBeatId: reactionArchiveBag.readyAfterBeatIds[0],
      postedAt: "2024-05-18 15:13",
      author: "LooseLeafBinder",
      paragraphs: solvedDispositionParagraphs,
      completion: completionCopy,
    }),
  });

  const ownerReactionByCoreId = Object.freeze(Object.fromEntries(
    Object.values(ownerReactions).map((reaction) => [reaction.id, reaction])
  ));

  const ending = Object.freeze({
    promptAfterTimeline: ownerReactions.R10,
    form: Object.freeze({
      title: "Public-source correction",
      intro: "Check all three columns against their sources. Optional free text records your understanding; it does not adjudicate facts or moral conclusions.",
      previewLabel: "Preview correction",
      publishLabel: "Confirm and publish",
      draftNotice: "The draft is stored only in this browsing session and will not publish if a source category is missing.",
      freeTextLabel: "Additional note (optional)",
    }),
    columns: Object.freeze({
      confirmed: Object.freeze({
        title: "What these pages establish",
        items: Object.freeze([
          Object.freeze({ text: `The printout fragment matches Helishu's ${sourceCapture.date} page, “${sourceCapture.title}.” The ${repeatedCapture.date} entry is a later capture of the same body.`, sources: Object.freeze([`/snapshot/${sourceCapture.key}`, `/archive/meta/${repeatedCapture.key}`]) }),
          Object.freeze({ text: `Public Q&A ${ANSWER_CODE} joins ${VISITOR_ID} to ${ITEM_ID} and preserves the question about writing “younger female cousin” for outsiders and changing it later.`, sources: Object.freeze([`/records/dayi/${ANSWER_CODE}`]) }),
          Object.freeze({ text: `The morning 2004 thread reports that ${DISPLAY.woman} reached her sister's home. An earlier participant wrote that she only then learned ${DISPLAY.father} was not divorced, did not want to discuss the matter further, and that he still waited outside the factory.`, sources: Object.freeze([`/rumor-snapshot/${resolvedForumCapture.key}`]) }),
          Object.freeze({ text: `The 2016 death notice establishes that ${DISPLAY.woman} died, but gives no cause of death.`, sources: Object.freeze([heLingObituary.route]) }),
        ]),
      }),
      disproved: Object.freeze({
        title: "Specific connections the pages rule out",
        items: Object.freeze([
          Object.freeze({ text: "Sharing one sleeve does not make the printout, collection slip, and pencil code one February appointment. The page and Q&A are from April.", sources: Object.freeze([`/snapshot/${sourceCapture.key}`, `/records/dayi/${ANSWER_CODE}`, `/records/status/${ITEM_ID}`]) }),
          Object.freeze({ text: `The riverside articles concern 52-year-old Lin Xiaoling of Dongjiang County, not ${DISPLAY.woman}. A bicycle was found by the river, and Lin contacted her family the next day.`, sources: Object.freeze([riverNews.route, riverFollowup.route]) }),
          Object.freeze({ text: "The 2021 collage joins a 2004 forum thread, an article about another Lin Xiaoling, and a 2016 death notice into one continuous event. That identity-and-time connection does not hold.", sources: Object.freeze(["/files/cn-63192-collage", `/rumor-snapshot/${resolvedForumCapture.key}`, riverFollowup.route, heLingObituary.route]) }),
        ]),
      }),
      unresolved: Object.freeze({
        title: "What these public pages cannot determine",
        items: Object.freeze([
          Object.freeze({ text: `Whether ${DISPLAY.father} said “we are already separated; only the paperwork remains,” and his exact words at the time.`, boundary: "The contemporary thread establishes only that she later learned he was not divorced." }),
          Object.freeze({ text: `Whether ${DISPLAY.woman} was sexually assaulted.`, boundary: "The available material contains only undated cropped phrases and later reposting; it neither establishes nor rules out the allegation." }),
          Object.freeze({ text: `Whether ${DISPLAY.woman} later died by suicide.`, boundary: "The 2016 death notice gives no cause, and no other verifiable page directly records one." }),
          Object.freeze({ text: `The specific cause of ${DISPLAY.woman}'s death in 2016.`, boundary: "No surviving public source gives a cause of death." }),
          Object.freeze({ text: `Whether ${DISPLAY.father}'s actions caused ${DISPLAY.woman}'s death in 2016.`, boundary: "A twelve-year interval and a death notice without a cause cannot establish causation." }),
          Object.freeze({ text: `Why ${DISPLAY.father} wrote ${DISPLAY.woman} as a “younger female cousin” for outsiders.`, boundary: "The material establishes only that the label was written; it cannot establish motive." }),
          Object.freeze({ text: `What the full message in ${WITHDRAWN_CODE} said, including whether it concerned harm or any other conduct requiring review.`, boundary: "The public index did not retain the body. The privacy process explains why public access stopped; it cannot reconstruct the text or certify it as harmless." }),
          Object.freeze({ text: "Whether the pending-verification / bond-formed anomaly resulted from a system fault, an unrecorded manual action, a capture defect, or something else.", boundary: "The conflict with the published generation rules is established; its cause is not." }),
          Object.freeze({ text: `Whether the recorded seven-day saying has supernatural force or caused ${DISPLAY.father}'s death.`, boundary: "His death on the seventh calendar day and publication of the notice the next day are date facts. His cause of death and any supernatural causation remain unresolved." }),
        ]),
      }),
    }),
    ownerDisposition: ownerReactions.R10,
    completion: completionCopy,
  });

  return Object.freeze({
    schemaVersion: 2,
    visualAssets,
    visualAssetRoutes,
    visualEndingAssetIds,
    contentNotes,
    entry: Object.freeze({ openingThread, initialForumReplies, forumHotTopics }),
    sites,
    falsePaths,
    workspaceSuccess,
    ownerReactions,
    ownerReactionByCoreId,
    ending,
  });
});