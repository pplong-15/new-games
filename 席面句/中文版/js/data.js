"use strict";
(function (root) {
  var WORDS = [
    { id: "w-hcz", surface: "韩承志", kind: "name", canFill: ["who", "whom"], source: "att-xian", locked: true },
    { id: "w-lqt", surface: "林秋棠", kind: "name", canFill: ["who", "whom"], source: "att-xian", locked: true },
    { id: "w-hss", surface: "韩守山", kind: "name", canFill: ["who", "whom"], source: "att-hetong", locked: true },
    { id: "w-zps", surface: "赵浦生", kind: "name", canFill: ["who", "whom"], source: "att-hetong", locked: true },
    { id: "w-anqi", surface: "按期", kind: "phrase", canFill: ["did"], source: "att-hetong", locked: false },
    { id: "w-yuandang", surface: "按原档开席", kind: "phrase", canFill: ["did"], source: "att-hetong", locked: false },
    { id: "w-fuqin", surface: "父亲", kind: "duty", canFill: ["whom"], source: "att-weiji", locked: false },
    { id: "w-yuanman", surface: "圆满", kind: "phrase", canFill: ["did"], source: "cases-01", locked: false },
    { id: "w-ruqi", surface: "喜宴如期", kind: "phrase", canFill: ["did"], source: "cases-02", locked: false },
    { id: "w-dengji", surface: "已登记", kind: "phrase", canFill: ["did"], source: "att-dengji", locked: false },
    { id: "w-jiri", surface: "吉日必发", kind: "herring", canFill: ["did"], source: "join", locked: false },
    { id: "w-yijiaqu", surface: "宜嫁娶", kind: "optional", canFill: ["did"], source: "att-lishu", locked: false },
    { id: "w-xiao", surface: "见一面就是孝", kind: "phrase", canFill: ["did"], source: "att-qun", locked: false },
    { id: "w-zhengchang", surface: "正常婚礼", kind: "phrase", canFill: ["did"], source: "att-qun", locked: false },
    { id: "w-hunjia", surface: "婚假", kind: "phrase", canFill: ["did"], source: "att-jia", locked: false },
    { id: "w-zhuhun", surface: "主婚人", kind: "duty", canFill: [], source: "att-hetong", locked: false },
    { id: "w-banxi", surface: "办喜", kind: "phrase", canFill: ["did"], source: "cases-01", locked: false }
  ];

  function w(id) {
    return '<button type="button" class="word" data-word="' + id + '">' + WORDS.filter(function (x) { return x.id === id; })[0].surface + "</button>";
  }

  var PAGES = [
    { id: "intro", foot: null, skin: "intro", title: "著录须知", html:
      '<div class="card"><p>桐晚禾，桐喜档临08。今晚厅已经锁了，十八点前要把一句交回台账。</p>' +
      '<p>页上有字才进袋。谁、对谁、做什么三格齐了才整句回传，缺一格不判，格子也不给你换颜色。</p>' +
      '<p>句子进建议栏。工号进不了签字栏。批准开席那钮，点了也批不了。</p>' +
      '<p>先看席面。横幅上的名字能点。</p></div>' },
    { id: "home", foot: "01", skin: "site", title: "桐江喜事", html:
      '<h1>桐江喜事</h1><p>桐江县婚庆。喜宴、横幅、司仪一条龙。今晚这厅已锁档，过十八点按合同退定。</p>' +
      '<p>值班：桐晚禾 · 桐喜档临08 · 权限建议。工钱认回传，不认口头。</p>' +
      '<p><button type="button" class="go" data-go="menu">冷碟酒水</button> ' +
      '<button type="button" class="go" data-go="calendar">菜谱档期</button> ' +
      '<button type="button" class="go" data-go="about">关于我们</button> ' +
      '<button type="button" class="go" data-go="news">公司新闻</button></p>' },
    { id: "menu", foot: "02", skin: "site", title: "菜谱一", html:
      '<h2>冷碟</h2><p>卤口条、糖藕、桂花莲子。席面已经铺上，不改菜单。</p>' +
      '<p>厨房说口条要先泡。跟句卡无关。</p>' +
      '<p><button type="button" class="go" data-go="menu2">酒水</button></p>' },
    { id: "menu2", foot: "03", skin: "site", title: "菜谱二", html:
      '<h2>酒水</h2><p>黄酒按坛，啤酒按箱。主家没改过单。</p>' +
      '<p>赵经理只催钟点，不问喝什么。</p>' +
      '<p><button type="button" class="go" data-go="menu3">档期说明</button></p>' },
    { id: "menu3", foot: "04", skin: "site", title: "档期说明", html:
      '<p>厅已锁。横幅已挂。改期要另签，另签要过经理。今晚来不及另签。</p>' +
      '<p>原档写的是廿二。台账也这么印。</p>' +
      '<p><button type="button" class="go" data-go="calendar">打开月历</button></p>' },
    { id: "calendar", foot: "05", skin: "site", title: "档期月历", html:
      '<p>八月廿二已圈。红圈旁边夹着合同。</p>' +
      '<p><button type="button" class="go" data-go="att-hetong">打开合同夹</button> ' +
      '<button type="button" class="go" data-go="calendar-aug">八月细表</button></p>' },
    { id: "calendar-aug", foot: "06", skin: "site", title: "八月细表", html:
      '<p>宴席日 2026年08月22日。后到的通知跟这格走，不另开格。</p>' +
      '<p>同日还有一份登记预约，民政那张夹在细表后面。</p>' +
      '<p><button type="button" class="go" data-go="att-dengji">登记预约</button></p>' },
    { id: "cases", foot: "07", skin: "site", title: "案例目录", html:
      '<p>旧案爱写如期、圆满。那是对外的喜帖腔，不能直接填进今晚的句卡。</p>' +
      '<p><button type="button" class="go" data-go="cases-01">案例一</button> ' +
      '<button type="button" class="go" data-go="cases-02">案例二</button> ' +
      '<button type="button" class="go" data-go="cases-03">案例三</button> ' +
      '<button type="button" class="go" data-go="cases-04">案例四</button> ' +
      '<button type="button" class="go" data-go="cases-05">案例五</button></p>' },
    { id: "cases-01", foot: "08", skin: "site", title: "案例一", html:
      '<p>前年王家。主家满意，席面写' + w("w-yuanman") + '。司仪有人把热闹写成' + w("w-banxi") + '。</p>' +
      '<p>那单没有病危夹页。套话前年能交差，今晚台账不收。</p>' },
    { id: "cases-02", foot: "09", skin: "site", title: "案例二", html:
      '<p>旧档写' + w("w-ruqi") + '。栏对不上酒店函，后来改过一次钟点。</p>' +
      '<p>今晚合同写的是按期，不是这四个字。</p>' },
    { id: "cases-03", foot: "10", skin: "site", title: "案例三", html:
      '<p>登记归民政。有人爱在句卡里写「故无冲突」四个字，台账不收。</p>' +
      '<p>预约单另夹。自愿归自愿，厅锁不锁看酒店那张。</p>' +
      '<p><button type="button" class="go" data-go="att-dengji">登记预约</button></p>' },
    { id: "cases-04", foot: "11", skin: "site", title: "案例四", html:
      '<p>无叠格。红金套话写满一页，名字对得上，日期也对。</p>' +
      '<p>没有纸角，没有病危。当反例看就行。</p>' },
    { id: "cases-05", foot: "12", skin: "site", title: "案例五", html:
      '<p>杯口朝下。那晚主家改过席次，句卡里没出新名。</p>' +
      '<p>跟今晚韩家不是一档。</p>' },
    { id: "join", foot: "13", skin: "site", title: "招商加盟", html:
      '<p>对外口号：' + w("w-jiri") + '。拉代理的，别写进台账。</p>' +
      '<p><button type="button" class="go" data-go="join-jiri">展开口号</button></p>' },
    { id: "join-jiri", foot: "14", skin: "site", title: "吉日必发", html:
      '<p>海报就这一句。代理费另谈，跟今晚韩家的厅无关。</p>' },
    { id: "about", foot: "15", skin: "site", title: "关于我们", html:
      '<p>桐江喜事，县城东关。白天接客，夜里锁厅。客服电话贴在前台，晚上转值班。</p>' +
      '<p>档期助理没有签字权。经理赵浦生管定金钟点。</p>' },
    { id: "desk", foot: "16", skin: "desk", title: "著录台", html:
      '<p>袋、句卡、十八点。词要从已经打开的页上采。专名进了格，先拖回袋再换，盖不上去。</p>' +
      '<p><button type="button" class="go" data-go="desk-card">句卡</button> ' +
      '<button type="button" class="go" data-go="desk-bag">词袋</button> ' +
      '<button type="button" class="go" data-go="ledger">台账</button> ' +
      '<button type="button" class="go" data-go="staff">培训薄册</button> ' +
      '<button type="button" class="go" data-go="desk-lock">锁句页</button></p>' },
    { id: "desk-card", foot: "17", skin: "desk", title: "句卡", html:
      '<p>谁／对谁／做什么。缺一格回传钮是灰的。齐了再交，交错了也不单独标哪一格。</p>' +
      '<img src="jpeg/05-card.jpg" alt="句卡未满">' },
    { id: "desk-bag", foot: "18", skin: "desk", title: "词袋", html:
      '<p>采过的词在袋里。韩承志、林秋棠、韩守山、赵浦生进了格，要先拖回来才能换人。</p>' +
      '<p>口号和旧案里的词也能采，不一定能用。</p>' },
    { id: "desk-reject", foot: "19", skin: "desk", title: "打回", html:
      '<p>整句对不上，可改再交。工钱仍是零。不标哪一格。</p>' +
      '<img src="jpeg/07-reject.jpg" alt="打回">' +
      '<p><button type="button" class="go" data-go="desk">回著录台</button></p>' },
    { id: "desk-receipt", foot: "20", skin: "desk", title: "回传", html:
      '<p>建议栏亮了。你的工号还是进不了签字栏，开席也批不了。</p>' +
      '<img src="jpeg/08-receipt.jpg" alt="回传">' +
      '<p><button type="button" class="go" data-go="desk-pay">看工钱</button></p>' },
    { id: "desk-pay", foot: "21", skin: "desk", title: "工钱", html:
      '<p>工钱 ¥36，短信已经记上了。没有确认钮，批准栏也没有。</p>' +
      '<img src="jpeg/09-pay.jpg" alt="工钱">' },
    { id: "desk-empty", foot: "22", skin: "desk", title: "空卡到点", html:
      '<p>十八点。卡空。定金退。工钱 ¥0。</p>' +
      '<img src="jpeg/10-empty.jpg" alt="空卡">' },
    { id: "att-xian", foot: "23", skin: "scan", title: "席面静帧", html:
      '<div class="still-wrap"><img id="still-img" src="jpeg/01-xian.jpg" alt="席面">' +
      '<div class="hits">' + w("w-hcz") + w("w-lqt") + '</div></div>' +
      '<p>横幅：韩承志林秋棠新婚志喜。主家是一对新人。杯口朝下。主桌纸角底下压着东西。</p>' +
      '<p>横幅两个人都能点。交差填谁，合同和纸角还得对着看，别只盯喜字。</p>' +
      '<p><button type="button" class="go" data-go="att-xian2">远景</button> ' +
      '<button type="button" class="go" data-go="att-weiji">纸角</button></p>' },
    { id: "att-hetong", foot: "24", skin: "scan", title: "合同一", html:
      '<img src="jpeg/03-hetong.jpg" alt="合同">' +
      '<p>' + w("w-zhuhun") + '栏：' + w("w-hss") + '。场地确认栏盖过章，经理是' + w("w-zps") + '，他不坐主婚席。</p>' +
      '<p>中段：' + w("w-anqi") + '履行宴席安排。原档不可改期。台账印的是' + w("w-yuandang") + '。</p>' +
      '<p>这份只能对上户名、主婚人和钟点，不能证明人今晚坐没坐主桌。</p>' +
      '<p><button type="button" class="go" data-go="att-hetong2">次页</button> ' +
      '<button type="button" class="go" data-go="att-lishu">夹缝</button> ' +
      '<button type="button" class="go" data-go="ledger">台账</button> ' +
      '<button type="button" class="go" data-go="att-han">酒店函</button></p>' },
    { id: "att-hetong2", foot: "25", skin: "scan", title: "合同二", html:
      '<p>十八点前确认或解除。过点退定金。解除要经理签，档期助理签了也不算。</p>' +
      '<p>夹页里还有一张假条，不是合同正文。</p>' +
      '<p><button type="button" class="go" data-go="att-han">酒店函</button> ' +
      '<button type="button" class="go" data-go="att-jia">假条</button></p>' },
    { id: "att-jia", foot: "26", skin: "scan", title: "假条", html:
      '<p>单位按喜批' + w("w-hunjia") + '。不是护理假。假期从廿二起，没写病床。</p>' +
      '<p>假条只能证明承志请了喜假，不能证明病房里的人点过头。</p>' +
      '<p><button type="button" class="go" data-go="att-qun">家属群</button></p>' },
    { id: "att-dengji", foot: "27", skin: "scan", title: "登记预约", html:
      '<p>民政只管二人自愿。预约条可采' + w("w-dengji") + '。</p>' +
      '<p>登记不是开席。厅锁不锁看酒店合同。</p>' },
    { id: "att-weiji", foot: "28", skin: "scan", title: "病危扫描", html:
      '<img src="jpeg/04-weiji.jpg" alt="病危">' +
      '<p>称谓栏写' + w("w-fuqin") + '。病危 2026年08月22日，跟宴席同一天。</p>' +
      '<p>患者姓名空着。栏里没有本人点头。这张纸只能证明称谓和日期叠了，不能证明人已经走。</p>' +
      '<p><button type="button" class="go" data-go="att-qun">家属群</button></p>' },
    { id: "att-qun", foot: "29", skin: "scan", title: "家属群", html:
      '<p>承志：证有了，酒店按期，父亲' + w("w-xiao") + '。</p>' +
      '<p>秋棠：我要' + w("w-zhengchang") + '。过了两分钟又改：行，我知道了。</p>' +
      '<p>群里还在谈今晚的席。这些话替不了主婚人签字。</p>' +
      '<p><button type="button" class="go" data-go="att-jia">假条</button></p>' },
    { id: "att-lishu", foot: "30", skin: "scan", title: "历书", html:
      '<p>合同夹缝半页。黄历印' + w("w-yijiaqu") + '。宜忌是俗信，不是酒店条款。</p>' +
      '<p>廿二宜嫁娶，跟病危通知不是同一本。</p>' },
    { id: "att-han", foot: "31", skin: "scan", title: "酒店函", html:
      '<p>浦生催履约或解除。钟点过了就退定，病房他不问，主婚席他也不坐。</p>' +
      '<p>函上就经理名。主婚人还是合同那一栏。</p>' },
    { id: "ledger", foot: "32", skin: "desk", title: "台账", html:
      '<p>原档不可改期。印着' + w("w-yuandang") + '。</p>' +
      '<p>建议栏空着。今晚要填的就是这一句。台账不认批准。</p>' },
    { id: "staff", foot: "33", skin: "desk", title: "培训薄册", html:
      '<p>核档期，核名。今晚就交这一句。建议栏能进，签字栏进不去。</p>' +
      '<p>主婚人不是经理。横幅上两个名字，交差那句要对着主家决定开席的人，别对着喜字随便填。</p>' +
      '<p>不成组不判。别在格子上找对错色。</p>' },
    { id: "news", foot: "34", skin: "site", title: "公司新闻", html:
      '<p>东厅换了帘。八月没有新档期公告。</p>' +
      '<p>去年有一单改期，吵到退定。今年合同把「不可改期」印死了。</p>' },
    { id: "desk-lock", foot: "35", skin: "desk", title: "锁句页", html:
      '<p>今晚交这一句。建议能回传，批准栏没有你的工号。</p>' +
      '<p>十八点一过，空卡按解除走，定金退，工钱零。</p>' },
    { id: "att-xian2", foot: "36", skin: "scan", title: "席面远景", html:
      '<p>主桌。杯口朝下。纸角进病危页。远景里看不见主婚人的座位牌。</p>' +
      '<p>这一帧只能说明席铺好了，不能说明病房里的人来没来。</p>' +
      '<p><button type="button" class="go" data-go="att-weiji">纸角</button></p>' }
  ];

  root.XIMIAN_DATA = {
    STAFF_ID: "桐喜档临08",
    PLAYER: "桐晚禾",
    LOCK: "今晚交这一句。句子是建议，不是批准。",
    CLOCK_MAX: 600,
    AUTHORITY: "recommend",
    WORDS: WORDS,
    PAGES: PAGES,
    CORRECT: { who: ["w-hcz"], whom: ["w-hss", "w-fuqin"], did: ["w-yuandang", "w-anqi"] }
  };
})(typeof window !== "undefined" ? window : global);
