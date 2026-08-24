"use strict";
(function (root) {
  var LOCK = "打开过不等于证实了。交班清空桌面，不清已证实。";
  var REJECT_SEEN = "打开过不等于证实了。";
  var REJECT_EXPORT = "原件不离班。权限到建议为止。";
  var REJECT_APPROVE = "临聘不能批。账要平，平也不由你批。";
  var REJECT_SCENIC = "简介不可入账。";
  var REJECT_FLAT = "第一层总数平不能入条。";
  var LOCK_L2 = "须已证实柜上批次对不上缘金。";
  var LOCK_L2_SEEN = "钱素白不认『我看过』。";
  var LATE = "今晚来不及。已证实栏还在。";

  var CLAIMS = [
    { id: "claim-same-column", text: "坐堂名与备案名同一栏", door: "fang", night: 0 },
    { id: "claim-batch-yuanjin", text: "柜上批次对不上缘金", door: "gui", night: 1 },
    { id: "claim-three-align", text: "三份对上同一药名缘金", door: "zhang", night: 1, needL2: true }
  ];

  var REJECT_IDS = ["seen-record", "scenic-blurb", "ledger-flat", "book-empty"];

  var LIMITS = {
    fang: "方上那一栏挤着两个名，都是安怀远，缘金也在。原件别夹走，配伍别往外抄。",
    gui: "柜签和进货单对不上就对不上。霍成只会压到交班，别拿柜子里的药试。",
    zhang1: "第一层总数看着平。平是平，批次另说。",
    zhang2: "二层要柜上那条先写下。钱素白不认看过。临聘批不了账。",
    scenic: "景区那页热闹。别往条里抄。",
    book: "挂号是空的。别在号上耗一整晚。",
    miaoli: "庙历夹在页脚。看着玩。",
    notice: "工钱按条，打开多少不算。交班桌子一收，写下的还在。今晚三条封顶。",
    public: "门口那几张，热闹归热闹，写不进条。",
    fees: "诊疗费明细是门诊流水。证不了饮片批次。"
  };

  function claimLabel(id) {
    var i;
    for (i = 0; i < CLAIMS.length; i++) {
      if (CLAIMS[i].id === id) return CLAIMS[i].text;
    }
    return id;
  }

  function joinLabels(ids) {
    if (!ids || !ids.length) return "";
    var out = [];
    var i;
    for (i = 0; i < ids.length; i++) out.push(claimLabel(ids[i]));
    return out.join("；");
  }

  function endingA(state) {
    var picked = joinLabels(state.claimsTonight);
    var how = picked
      ? "你勾出去的是：" + picked + "。"
      : "收口那条你勾了。";
    return [
      how,
      "晨班拿条去对药。打开过几份他们不算。进销存那钮你按过也没批成，原件还在柜里。",
      "工钱按已证实条数算。权限还是建议。"
    ];
  }

  function endingB(state) {
    var verified = joinLabels(state.verified);
    var picked = joinLabels(state.claimsTonight);
    if (state.clock <= 0 && !(state.claimsTonight && state.claimsTonight.length)) {
      return [
        LATE,
        verified ? "栏上还留着：" + verified + "。" : "栏是空的。",
        "钟走完了，条没交出去。刷新的话整晚都没了。"
      ];
    }
    if (!state.verified.length) {
      return [
        "一条都没写下。零条也是交，工钱是零。",
        "晨班看见空栏。进销存你没批成，原件也没夹走。",
        "栏还在。下一晚还从这张桌接着值。"
      ];
    }
    return [
      "你写下了：" + verified + "。交出去的是：" + (picked || "空的") + "。",
      "收口那条没勾上。钱素白那边不认今晚交差。工钱仍按写下的条数。",
      "没勾的晨班当没交。原件还在柜里。"
    ];
  }

  var SOURCES = [
    { id: "src-fang-today", route: "fang-today", limits: LIMITS.fang, claim: "claim-same-column" },
    { id: "src-fang-head", route: "fang-head", limits: LIMITS.fang, claim: "claim-same-column" },
    { id: "src-fang-body", route: "fang-body", limits: LIMITS.fang, claim: null },
    { id: "src-fang-note", route: "fang-note", limits: LIMITS.fang, claim: null },
    { id: "src-glass", route: "public-glass", limits: LIMITS.fang, claim: null },
    { id: "src-gui-door", route: "gui-door", limits: LIMITS.gui, claim: null },
    { id: "src-gui-tag", route: "gui-tag", limits: LIMITS.gui, claim: null },
    { id: "src-gui-batch", route: "gui-batch", limits: LIMITS.gui, claim: "claim-batch-yuanjin" },
    { id: "src-gui-note", route: "gui-note", limits: LIMITS.gui, claim: null },
    { id: "src-zhang-door", route: "zhang-door", limits: LIMITS.zhang1, claim: null },
    { id: "src-zhang-l1", route: "zhang-l1", limits: LIMITS.zhang1, claim: null, reject: "ledger-flat" },
    { id: "src-zhang-fees", route: "zhang-fees", limits: LIMITS.fees, claim: null, reject: "ledger-flat" },
    { id: "src-zhang-lock", route: "zhang-lock", limits: LIMITS.zhang2, claim: null },
    { id: "src-zhang-l2", route: "zhang-l2", limits: LIMITS.zhang2, claim: "claim-three-align" },
    { id: "src-scenic", route: "scenic", limits: LIMITS.scenic, claim: null, reject: "scenic-blurb" },
    { id: "src-book", route: "book", limits: LIMITS.book, claim: null, reject: "book-empty" },
    { id: "src-book-cal", route: "book-cal", limits: LIMITS.book, claim: null, reject: "book-empty" }
  ];

  var ROUTES = [
    { id: "intro", path: "/intro", foot: "", skin: "intro", title: "值班说明书", still: "jpeg/00-open.jpg",
      body: "今晚看哪份你自己挑。读完就交班，别攒一桌子。交条记得勾，不勾等于没交。刷新的话整晚都没了。",
      html:
        "<p>澄川县安怀堂。临聘第三周，工号澄安备临3，权限到建议。</p>" +
        "<p>墙上三扇门：方、柜、账。今晚先亮方。柜和账你第一晚只能碰到门。交班以后，打开过的纸页收回，写下的条留在右边。</p>" +
        "<p>交条要勾，不勾等于零条。零条也是一种交。原件不离班。进销存那钮你按了也批不成。</p>" +
        "<p>备案首页、挂号、景区都是门口那层皮。皮上那框检索是死的，搜不出新档。</p>"
    },
    { id: "home", path: "/", foot: "", skin: "public", title: "安怀堂备案首页", still: "jpeg/00-open.jpg",
      body: "澄川县安怀堂。备案名安怀远。挂号最亮。今晚工作不在号上。",
      html:
        "<p class=\"mast-sub\">澄川县西街　中医诊所备案公开页</p>" +
        "<p>本所备案名称：<strong>安怀远</strong>。坐堂也是这个名。门脸两开间，后柜是干根茎和纸盒子。</p>" +
        "<ul class=\"pub-list\">" +
        "<li>夜间门诊　请轻声</li>" +
        "<li>预约挂号　号段从零编，约不到值班台</li>" +
        "<li>年检预告　牌不过期，窗口过期</li>" +
        "</ul>" +
        "<p class=\"limits\">公开页热闹。写不进条。</p>"
    },
    { id: "about", path: "/about", foot: "", skin: "public", title: "诊所简介", still: "jpeg/00-open.jpg",
      body: "西街门脸两开间。招牌漆过两回。证不了显灵。",
      html:
        "<p>西街门脸两开间。招牌漆过两回，第二次把「怀」字描深了。</p>" +
        "<p>坐堂安怀远，备案也写安怀远。他爱跟来检查的人说：你看，同一栏。</p>" +
        "<p>简介就这些。显灵两个字本页不写。</p>"
    },
    { id: "book", path: "/book", foot: "", skin: "book", title: "预约挂号", still: "jpeg/10-clock.jpg",
      body: "号段从零编。约不到值班台。", reject: "book-empty",
      html:
        "<p>系统提示：当前无可约时段。</p>" +
        "<p>号段 0000–0000。列表空。点日期没有反应。</p>" +
        "<p class=\"limits\">挂号空日历不能当值班工作。</p>"
    },
    { id: "book-cal", path: "/book/cal", foot: "", skin: "book", title: "空日历", still: "jpeg/10-clock.jpg",
      body: "日期全灰。一天都点不了。", reject: "book-empty",
      html: "<p>本月格子全灰。没有号，没有人，没有值班台入口。</p>"
    },
    { id: "book-seg", path: "/book/seg", foot: "", skin: "book", title: "号段说明", still: "jpeg/10-clock.jpg",
      body: "号段整齐。约不到值班台。",
      html: "<p>号段按日切。切得整齐。约不到方、柜、账任何一扇门。</p>"
    },
    { id: "notice", path: "/notice", foot: "", skin: "desk", title: "值班须知", still: "jpeg/00-open.jpg",
      body: LOCK + "今晚交已证实三条以内。交条要勾。工钱按条数。不能把原件带出班。不能批进销存。",
      html:
        "<ol>" +
        "<li>打开过不等于证实了。</li>" +
        "<li>交班清空桌面，不清已证实。</li>" +
        "<li>今晚三条以内。第四条不收。</li>" +
        "<li>工钱只认已证实。零条也是一种交。</li>" +
        "<li>原件不离班。临聘不能批进销存。</li>" +
        "</ol>" +
        "<p>容麦上一班便条还夹在工卡后面。</p>"
    },
    { id: "desk", path: "/desk", foot: "", skin: "desk", title: "值班台", still: "jpeg/00-open.jpg",
      body: "三扇门。方是安怀远，柜是霍成，账是钱素白。钟在走。栏空着等写入。",
      html: "<p>三扇门在下面那张静帧上，方先亮。钟在走。左边打开过，右边已证实。</p>"
    },
    { id: "desk-payrule", path: "/desk/payrule", foot: "", skin: "desk", title: "计件条款", still: "jpeg/07-submit.jpg",
      body: "三条以内。第四条不收。工钱只认已证实。零条也是一种交。",
      html: "<p>一条 ¥12。三条封顶 ¥36。打开多少份都不算。没勾的条晨班当没交。</p>"
    },
    { id: "desk-badge", path: "/desk/badge", foot: "", skin: "desk", title: "工卡", still: "jpeg/00-open.jpg",
      body: "卫小棠。女，二十七。澄川县安怀堂备案临聘第三周。工号 澄安备临3。权限 建议。",
      html:
        "<table class=\"badge-table\"><tbody>" +
        "<tr><th>姓名</th><td>卫小棠</td></tr>" +
        "<tr><th>工号</th><td>澄安备临3</td></tr>" +
        "<tr><th>权限</th><td>建议</td></tr>" +
        "<tr><th>备注</th><td>不批进销存，不带原件出门</td></tr>" +
        "</tbody></table>"
    },
    { id: "desk-last", path: "/desk/last", foot: "", skin: "note", title: "上一班便条", still: "jpeg/00-open.jpg",
      body: "容麦字。打开过的交班会收走。写下的才留。",
      html:
        "<p>卫小棠你接了就看方。柜和账今晚别硬开，开了也是门。</p>" +
        "<p>打开过的交班会收走。写下的才留。我零条交过一回，工钱是零，晨班没骂我私自批账，这就行。</p>" +
        "<p class=\"sign\">——容麦　字掉下去又补了一句：见过不算。</p>"
    },
    { id: "fang-today", path: "/fang/today", foot: "", skin: "fang", title: "今日坐堂方", still: "jpeg/01-fang.jpg",
      body: "方笺摊开了。抬头那一栏挤着备案名、坐堂名，都是安怀远。看过了，没写下还是空的。",
      claim: "claim-same-column",
      html:
        "<p>处方笺 NO 0006812。当日有效。</p>" +
        "<table class=\"rx\"><tbody>" +
        "<tr><th>坐堂医师</th><td>安怀远</td></tr>" +
        "<tr><th>备案名称</th><td>安怀远</td></tr>" +
        "<tr><th>Rp.</th><td>缘金　三钱</td></tr>" +
        "</tbody></table>" +
        "<p>两个名挤在同一栏，剂量栏空着。原件别夹走。</p>"
    },
    { id: "fang-head", path: "/fang/head", foot: "", skin: "fang", title: "方笺抬头", still: "jpeg/01-fang.jpg",
      body: "同一格两个名，都是安怀远。写入才进已证实。", claim: "claim-same-column",
      html: "<p>坐堂医师、备案名称，印在同一格里。安怀远觉得这样好看。你看过了，没写下，右边还是空的。</p>"
    },
    { id: "fang-body", path: "/fang/body", foot: "", skin: "fang", title: "方笺中部", still: "jpeg/01-fang.jpg",
      body: "缘金短写。剂量栏在。原件不离班。",
      html: "<p>中药处方只一行：缘金三钱。配伍没往下抄。这页只能证明方上写了这两个字，不能证明柜里有这味药。</p>"
    },
    { id: "fang-note", path: "/fang/note", foot: "", skin: "fang", title: "安怀远侧栏", still: "jpeg/01-fang.jpg",
      body: "备案要好看嘛。同一栏写着，他当这就行了。送到眼前了，还得你自己写下。",
      html: "<p>「备案那一栏空着难看嘛。我就让人把坐堂名填进去，同一格，看着整齐。你爱写不写，反正我送到你眼前了。」</p>"
    },
    { id: "public-glass", path: "/public/glass", foot: "", skin: "public", title: "玻璃告示", still: "jpeg/02-verified.jpg",
      body: "玻璃上同一栏。替不了写入。",
      html: "<p>压在玻璃下的打印件，也是坐堂名、备案名同一栏。映得清楚。替不了你写下。</p>"
    },
    { id: "gui-door", path: "/gui/door", foot: "", skin: "gui", title: "柜门", still: "jpeg/04-gui.jpg",
      body: "旧木格。霍成。第一夜柜暗。",
      html: "<p>旧木格。门上铅笔写霍成。第一晚这扇只亮到门。交班以后才能翻柜签和影印。</p>"
    },
    { id: "gui-tag", path: "/gui/tag", foot: "", skin: "gui", title: "柜签", still: "jpeg/04-gui.jpg",
      body: "缘金端正。批次栏铅笔描深。批号还是空的。",
      html:
        "<p>中药饮片柜存。柜号 A-2-3。</p>" +
        "<p>缘金那一行品名端正，生产批号空着。旁边几味都有号。格子描深了，批号还是空的。</p>"
    },
    { id: "gui-batch", path: "/gui/batch", foot: "", skin: "gui", title: "进货单影印", still: "jpeg/04-gui.jpg",
      body: "影印夹在门内侧。批号发灰。对不上要写成条。", claim: "claim-batch-yuanjin",
      html:
        "<p>采购订单 CGDD-240228。缘金这一行数量空、金额空。柜存清单同一味批号也空。</p>" +
        "<p>两张并排放，对不上就是对不上。口述不算条。</p>"
    },
    { id: "gui-note", path: "/gui/note", foot: "", skin: "gui", title: "霍成留言", still: "jpeg/04-gui.jpg",
      body: "批次乱，压到交班后。口述不是条。",
      html: "<p>「缘金那一行我没填。进货单也空着。别问我药在哪。问了我也压到交班。你要写就写对不上，别写我口述。」</p>"
    },
    { id: "zhang-door", path: "/zhang/door", foot: "", skin: "zhang", title: "账门", still: "jpeg/05-zhang1.jpg",
      body: "白灯账桌。钱素白。第二层先锁。",
      html: "<p>白灯。账桌。钱素白不在，锁在。第一层能翻。第二层要柜上那条先写下。</p>"
    },
    { id: "zhang-l1", path: "/zhang/l1", foot: "", skin: "zhang", title: "账第一层", still: "jpeg/05-zhang1.jpg",
      body: "总数看着平。缘金在列。平证明不了批次。", reject: "ledger-flat",
      html:
        "<p>门诊收入支出结余账。格子空着，合计也空着。空着的总数看起来是平的。</p>" +
        "<p>平是平。批次另说。这页不能入条。</p>"
    },
    { id: "zhang-fees", path: "/zhang/fees", foot: "", skin: "zhang", title: "诊疗费明细", still: "jpeg/06-zhang2.jpg",
      body: "门诊流水。证不了饮片批次。", reject: "ledger-flat",
      html: "<p>诊疗费用明细摊在抽屉里。人名、科别、金额。没有批号，也没有缘金去向。流水看着平，柜上对不上。</p>"
    },
    { id: "zhang-lock", path: "/zhang/lock", foot: "", skin: "zhang", title: "二层锁", still: "jpeg/05-zhang1.jpg",
      body: LOCK_L2 + "没有这条，二层开不了。",
      html: "<p>须已证实柜上批次对不上缘金。看过了她也不认。临聘批不了账。</p>"
    },
    { id: "zhang-l2", path: "/zhang/l2", foot: "", skin: "zhang", title: "账第二层", still: "jpeg/06-zhang2.jpg",
      body: "批号裂。去向短。药名仍是缘金。对过三份才能写收口。", claim: "claim-three-align",
      html:
        "<table class=\"rx\"><tbody>" +
        "<tr><th>药名</th><td>缘金</td></tr>" +
        "<tr><th>方上</th><td>三钱</td></tr>" +
        "<tr><th>柜上批号</th><td>（空）</td></tr>" +
        "<tr><th>去向</th><td>短写。没填完</td></tr>" +
        "</tbody></table>" +
        "<p>三份都是缘金这两个字。药名对得上，批次对不上。这页才能写收口。</p>"
    },
    { id: "scenic", path: "/scenic", foot: "", skin: "scenic", title: "景区简介", still: "jpeg/00-open.jpg",
      body: "药王诞辰写得热闹。柜上自有应季。钱素白不让写进条。", reject: "scenic-blurb",
      html:
        "<p>澄川西郊药王诞，每年柜上应季。游客请到庙里随缘乐助。</p>" +
        "<p>本页由县文旅供稿。不作为诊所进销存依据。</p>"
    },
    { id: "scenic-more", path: "/scenic/more", foot: "", skin: "scenic", title: "友链展开", still: "jpeg/00-open.jpg",
      body: "应季套话。钱素白删过半句，简介不可入账。", reject: "scenic-blurb",
      html: "<p>应季两个字是模板。钱会计上次把「柜上自有缘金供奉」划掉了半截，留了「柜上自有应季」。她不让这页进条。</p>"
    },
    { id: "footer-miaoli", path: "/footer/miaoli", foot: "", skin: "public", title: "页脚庙历", still: "jpeg/00-open.jpg",
      body: "页脚那本日子。看着玩。",
      html: "<p>药王诞写在四月。日子是景区的，跟今晚三条对不上。</p>"
    },
    { id: "desk-handoff", path: "/desk/handoff", foot: "", skin: "desk", title: "交班桌面", still: "jpeg/03-handoff.jpg",
      body: "交班。打开过清掉。已证实留下。刷新整晚没。",
      html: "<p>左边空了。右边若有条还在。柜和账这会儿能进，钟重新走。</p>"
    },
    { id: "desk-cols", path: "/desk/cols", foot: "", skin: "desk", title: "分栏", still: "jpeg/02-verified.jpg",
      body: "左栏打开过。右栏已证实。交班只清左边。",
      html: "<p>点左边那几张，拖不进右边。打开过不等于证实了。</p>"
    },
    { id: "desk-claims", path: "/desk/claims", foot: "", skin: "desk", title: "班末交条", still: "jpeg/07-submit.jpg",
      body: "要勾已证实。不勾等于没交。上限三。打开过拖不进来。",
      html: "<p>勾的才算出门。不勾就是零条。零条也是交。上限三。</p>"
    },
    { id: "desk-pay", path: "/desk/pay", foot: "", skin: "desk", title: "工钱结算", still: "jpeg/07-submit.jpg",
      body: "按已证实条数。一条 ¥12。三条 ¥36。未批进销存。"
    },
    { id: "public-yujian", path: "/public/yujian", foot: "", skin: "public", title: "年检预告打印", still: "jpeg/02-verified.jpg",
      body: "压在玻璃下，映同一栏。替不了方抬头。",
      html: "<p>年检预告把备案名印得很大。同一栏的影子在玻璃上。替不了方笺抬头。</p>"
    },
    { id: "public-year", path: "/public/year", foot: "", skin: "public", title: "年检窗口说明", still: "jpeg/00-open.jpg",
      body: "牌不过期。窗口过期。安怀远要备案好看。",
      html: "<p>牌子还挂着。窗口去年就过了。安怀远说先把栏写整齐，窗口的事白天再说。</p>"
    },
    { id: "public-addr", path: "/public/addr", foot: "", skin: "public", title: "西街地址", still: "jpeg/00-open.jpg",
      body: "门脸两开间。后柜是干根茎和纸盒子。",
      html: "<p>西街，门脸两开间。后柜不对外开放。地址写进条没有用。</p>"
    },
    { id: "public-beian", path: "/public/beian", foot: "", skin: "public", title: "关于备案", still: "jpeg/00-open.jpg",
      body: "安怀堂就这一张皮。",
      html: "<p>备案公开页就这一张皮。检索框是摆的。框开不出新档。</p>"
    },
    { id: "search-closed", path: "/search", foot: "", skin: "book", title: "夜间检索", still: "jpeg/10-clock.jpg",
      body: "框是死的。搜不出新档。",
      html: "<p>夜间检索已关。框还在，门口好看。回值班台干活。</p>"
    },
    { id: "desk-late", path: "/desk/late", foot: "", skin: "desk", title: "来不及", still: "jpeg/10-clock.jpg",
      bodyFn: "late"
    },
    { id: "desk-end-a", path: "/desk/end-a", foot: "", skin: "desk", title: "留下的门", still: "jpeg/08-ending-a.jpg",
      bodyFn: "A"
    },
    { id: "desk-end-b", path: "/desk/end-b", foot: "", skin: "desk", title: "只看过", still: "jpeg/09-ending-b.jpg",
      bodyFn: "B"
    }
  ];

  root.SANFEN_DATA = {
    LOCK: LOCK,
    REJECT_SEEN: REJECT_SEEN,
    REJECT_EXPORT: REJECT_EXPORT,
    REJECT_APPROVE: REJECT_APPROVE,
    REJECT_SCENIC: REJECT_SCENIC,
    REJECT_FLAT: REJECT_FLAT,
    LOCK_L2: LOCK_L2,
    LOCK_L2_SEEN: LOCK_L2_SEEN,
    LATE: LATE,
    CLAIMS: CLAIMS,
    REJECT_IDS: REJECT_IDS,
    LIMITS: LIMITS,
    SOURCES: SOURCES,
    ROUTES: ROUTES,
    endingA: endingA,
    endingB: endingB,
    joinLabels: joinLabels,
    claimLabel: claimLabel,
    CLOCK_MAX: 1800,
    PAY_EACH: 12,
    CLAIM_CAP: 3,
    PLAYER: "卫小棠",
    STAFF: "澄安备临3",
    STORE_KEY: "sanfen-cabinet-state"
  };
})(typeof window !== "undefined" ? window : global);
