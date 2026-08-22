var IMG_XRAY1 = "assets/image-02.jpg";
var IMG_LOGBOOK = "assets/image-03.jpg";
var IMG_ARCHIVE = "assets/image-04.jpg";
var IMG_XRAY2 = "assets/image-05.jpg";


"use strict";

/* ========== DATA ========== */
const STATIONS = [
  { id: 1, name: "收件扫描台", short: "扫描" },
  { id: 2, name: "分拣归类系统", short: "分拣" },
  { id: 3, name: "邮递员调度台", short: "调度" },
  { id: 4, name: "地址簿终端", short: "地址簿" },
  { id: 5, name: "退件登记系统", short: "退件" },
  { id: 6, name: "派送回执核销", short: "回执" }
];

const VILLAGES = [
  { id: "v-county", name: "本县", code: "07", parent: null, status: "active" },
  { id: "v-town", name: "青石镇", code: "07-03", parent: "v-county", status: "active" },
  { id: "v-qingshi", name: "青石村", code: "07-03-01", parent: "v-town", status: "cancelled",
    note: "已撤销（1998年因水库建设）", activeCount: 34, groups: ["一组", "二组", "三组"] },
  { id: "v-lianhua", name: "莲花村", code: "07-03-02", parent: "v-town", status: "merged",
    note: "已并入青石村（1998年4月12日）", activeCount: 1, groups: ["一组", "二组", "三组"] },
  { id: "v-donghe", name: "东河村", code: "07-03-03", parent: "v-town", status: "active", groups: ["一组", "二组", "三组"] },
  { id: "v-xigang", name: "西岗村", code: "07-03-04", parent: "v-town", status: "active", groups: ["一组", "二组", "三组", "四组"] },
  { id: "v-nanwan", name: "南湾村", code: "07-03-05", parent: "v-town", status: "active", groups: ["一组", "二组", "三组"] },
  { id: "v-beiling", name: "北岭村", code: "07-03-06", parent: "v-town", status: "active", groups: ["一组", "二组"] },
  { id: "v-center", name: "中心街", code: "07-03-07", parent: "v-town", status: "active" },
  { id: "v-gov", name: "镇政府大院", code: "07-03-08", parent: "v-town", status: "active" },
  { id: "v-po", name: "邮政所", code: "07-03-09", parent: "v-town", status: "active" },
  { id: "v-res", name: "青石水库（淹没区）", code: "07-03-00", parent: "v-town", status: "cancelled", note: "1998年蓄水" }
];

const PERSONS = [
  { id: "p-lin", name: "林远", village: "v-qingshi", group: "三组", status: "active", role: "操作员", jobNo: "0918", photo: "placeholder", relationCodes: ["BIND-1998-03"], note: "夜班分拣员。历史地址：青石村三组。" },
  { id: "p-zhao", name: "赵德明", village: "v-center", status: "active", role: "所长", jobNo: "0412", photo: "assets/image-06.jpg", relationCodes: [], note: "本所所长。工龄三十年。" },
  { id: "p-chen", name: "陈国栋", village: "v-lianhua", status: "cancelled", role: "操作员", jobNo: "0821", photo: "assets/image-07.jpg", relationCodes: ["BIND-1998-03"], cancelledAt: "2026-05-20", cancelledBy: "", note: "上一任夜班分拣员。注销操作人：（空）。" },
  { id: "p-zhou", name: "周海", village: "v-qingshi", status: "deceased", role: "邮递员", jobNo: "0947", photo: "assets/image-08.jpg", route: "青石线（水库北岸环线）", died: "2019-07", note: "2019年7月青石线北岸路段塌方殉职。路线从未删除。工号未正式注销。" },
  { id: "p-zhang", name: "张大山", village: "v-donghe", status: "active", role: "邮递员", jobNo: "0951", photo: "placeholder", route: "东河线" },
  { id: "p-li", name: "李秀英", village: "v-xigang", status: "active", role: "邮递员", jobNo: "0953", photo: "placeholder", route: "西岗线" },
  { id: "p-wang", name: "王建国", village: "v-nanwan", status: "active", role: "邮递员", jobNo: "0955", photo: "placeholder", route: "南湾线" },
  { id: "p-sun", name: "孙志强", village: "v-beiling", status: "active", role: "邮递员", jobNo: "0958", photo: "placeholder", route: "北岭/镇区" },
  { id: "p-shen", name: "沈秀兰", village: "v-qingshi", group: "三组", status: "active", role: "居民", photo: "assets/image-09.jpg", relationCodes: [], note: "青石村三组。系统仍显示可投递。" },
  { id: "p-lch", name: "刘成海", village: "v-qingshi", group: "一组", status: "active", role: "居民", photo: "placeholder", relationCodes: ["LIU-QS-01"] },
  { id: "p-lhe", name: "刘成河", village: "v-qingshi", group: "二组", status: "active", role: "居民", photo: "placeholder", relationCodes: ["LIU-QS-01"] },
  { id: "p-lxm", name: "刘小梅", village: "v-qingshi", group: "一组", status: "active", role: "居民", photo: "placeholder", relationCodes: ["LIU-QS-01", "BIND-1998-03"], note: "刘成海之女。" },
  { id: "p-wgf", name: "吴桂芳", village: "v-lianhua", group: "三组", status: "active", role: "居民", photo: "assets/image-10.jpg", relationCodes: [], note: "莲花村妇女主任（1998）。状态：正常。地址未被注销。" },
  { id: "p-csi", name: "陈思源", village: "v-lianhua", status: "missing", role: "居民", photo: "placeholder", relationCodes: ["BIND-1998-03"], note: "1998年时8岁。与林远、刘小梅共享合并编码。陈国栋原登记名。" },
  { id: "p-ljg", name: "林建国", village: "v-qingshi", group: "三组", status: "deceased", role: "居民", photo: "placeholder", note: "林远之父。五年前病故。" },
  { id: "p-wgl", name: "王桂兰", village: "v-donghe", group: "二组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-zfq", name: "张福全", village: "v-xigang", group: "一组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-cxy", name: "陈秀英", village: "v-nanwan", group: "三组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-zyq", name: "赵永强", village: "v-beiling", group: "二组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-lch2", name: "刘春花", village: "v-center", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-hdc", name: "黄德财", village: "v-donghe", group: "一组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-wxj", name: "吴小军", village: "v-xigang", group: "四组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-mlh", name: "马丽华", village: "v-nanwan", group: "一组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-hdy", name: "何大勇", village: "v-beiling", group: "一组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-zgz", name: "周桂珍", village: "v-qingshi", group: "一组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-zmg", name: "张木根", village: "v-qingshi", group: "二组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-wen", name: "王二牛", village: "v-qingshi", group: "三组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-ccm", name: "陈春梅", village: "v-qingshi", group: "二组", status: "active", role: "居民", photo: "placeholder" },
  { id: "p-lgq", name: "李国庆", village: "v-lianhua", group: "一组", status: "cancelled", role: "居民", photo: "placeholder" },
  { id: "p-hsf", name: "黄素芳", village: "v-lianhua", group: "二组", status: "cancelled", role: "居民", photo: "placeholder" }
];

const MAILS = [
  { id: "t01", type: "normal", sender: "李明", senderAddr: "城关镇建设路9号", receiver: "王桂兰", receiverAddr: "青石镇东河村二组", receiverId: "p-wgl", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820001", tutorial: true, arriveAt: null },
  { id: "t02", type: "normal", sender: "县医院放射科", senderAddr: "城关镇健康路1号", receiver: "张福全", receiverAddr: "青石镇西岗村一组", receiverId: "p-zfq", village: "v-xigang", weight: "0.02kg", barcode: "YZ260820002", tutorial: true, arriveAt: null },
  { id: "t03", type: "normal", sender: "南湾小学", senderAddr: "青石镇南湾村", receiver: "陈秀英", receiverAddr: "青石镇南湾村三组", receiverId: "p-cxy", village: "v-nanwan", weight: "0.04kg", barcode: "YZ260820003", tutorial: true, arriveAt: null },
  { id: "t04", type: "normal", sender: "北岭信用社", senderAddr: "青石镇北岭村", receiver: "赵永强", receiverAddr: "青石镇北岭村二组", receiverId: "p-zyq", village: "v-beiling", weight: "0.01kg", barcode: "YZ260820004", tutorial: true, arriveAt: null },
  { id: "t05", type: "normal", sender: "镇民政所", senderAddr: "青石镇政府大院", receiver: "刘春花", receiverAddr: "青石镇中心街12号", receiverId: "p-lch2", village: "v-center", weight: "0.05kg", barcode: "YZ260820005", tutorial: true, arriveAt: null },
  { id: "t06", type: "package", sender: "县城农资公司", senderAddr: "城关镇工业路", receiver: "黄德财", receiverAddr: "青石镇东河村一组", receiverId: "p-hdc", village: "v-donghe", weight: "2.4kg", barcode: "YZ260820006", tutorial: true, arriveAt: null, note: "种子" },
  { id: "t07", type: "normal", sender: "吴小军之兄", senderAddr: "城关镇解放路", receiver: "吴小军", receiverAddr: "青石镇西岗村四组", receiverId: "p-wxj", village: "v-xigang", weight: "0.03kg", barcode: "YZ260820007", tutorial: true, arriveAt: null },
  { id: "t08", type: "normal", sender: "县妇幼保健院", senderAddr: "城关镇", receiver: "马丽华", receiverAddr: "青石镇南湾村一组", receiverId: "p-mlh", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260820008", tutorial: true, arriveAt: null },
  { id: "t09", type: "normal", sender: "何大勇家属", senderAddr: "城关镇团结巷", receiver: "何大勇", receiverAddr: "青石镇北岭村一组", receiverId: "p-hdy", village: "v-beiling", weight: "0.06kg", barcode: "YZ260820009", tutorial: true, arriveAt: null },
  { id: "t10", type: "normal", sender: "县卫生局", senderAddr: "城关镇", receiver: "镇卫生院", receiverAddr: "青石镇中心街", receiverId: null, village: "v-center", weight: "0.20kg", barcode: "YZ260820010", tutorial: true, arriveAt: null },
  { id: "n01", type: "normal", sender: "东河村委会", senderAddr: "青石镇东河村", receiver: "王桂兰", receiverAddr: "青石镇东河村二组", receiverId: "p-wgl", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820021", arriveAt: "21:08" },
  { id: "n02", type: "package", sender: "县供销社", senderAddr: "城关镇", receiver: "张福全", receiverAddr: "青石镇西岗村一组", receiverId: "p-zfq", village: "v-xigang", weight: "1.1kg", barcode: "YZ260820022", arriveAt: "21:19", note: "日用品" },
  { id: "n03", type: "normal", sender: "陈秀英女儿", senderAddr: "县城一中", receiver: "陈秀英", receiverAddr: "青石镇南湾村三组", receiverId: "p-cxy", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260820023", arriveAt: "21:31" },
  { id: "n04", type: "normal", sender: "北岭卫生室", senderAddr: "青石镇北岭村", receiver: "赵永强", receiverAddr: "青石镇北岭村二组", receiverId: "p-zyq", village: "v-beiling", weight: "0.01kg", barcode: "YZ260820024", arriveAt: "21:44" },
  { id: "n05", type: "normal", sender: "镇派出所", senderAddr: "青石镇政府大院", receiver: "刘春花", receiverAddr: "青石镇中心街12号", receiverId: "p-lch2", village: "v-center", weight: "0.04kg", barcode: "YZ260820025", arriveAt: "21:58" },
  { id: "n06", type: "normal", sender: "黄德财亲戚", senderAddr: "邻县", receiver: "黄德财", receiverAddr: "青石镇东河村一组", receiverId: "p-hdc", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820026", arriveAt: "22:10" },
  { id: "n07", type: "normal", sender: "西岗小学", senderAddr: "青石镇西岗村", receiver: "吴小军", receiverAddr: "青石镇西岗村四组", receiverId: "p-wxj", village: "v-xigang", weight: "0.02kg", barcode: "YZ260820027", arriveAt: "22:23" },
  { id: "n08", type: "package", sender: "马丽华同事", senderAddr: "县城纺织厂", receiver: "马丽华", receiverAddr: "青石镇南湾村一组", receiverId: "p-mlh", village: "v-nanwan", weight: "0.8kg", barcode: "YZ260820028", arriveAt: "22:37", note: "衣物" },
  { id: "n09", type: "normal", sender: "何大勇儿子", senderAddr: "省城", receiver: "何大勇", receiverAddr: "青石镇北岭村一组", receiverId: "p-hdy", village: "v-beiling", weight: "0.05kg", barcode: "YZ260820029", arriveAt: "22:51" },
  { id: "n10", type: "normal", sender: "镇政府办公室", senderAddr: "青石镇政府大院", receiver: "镇卫生院", receiverAddr: "青石镇中心街", receiverId: null, village: "v-center", weight: "0.10kg", barcode: "YZ260820030", arriveAt: "23:03" },
  { id: "n11", type: "normal", sender: "东河代销店", senderAddr: "青石镇东河村", receiver: "王桂兰", receiverAddr: "青石镇东河村二组", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260820031", arriveAt: "23:28" },
  { id: "n12", type: "normal", sender: "南湾村委会", senderAddr: "青石镇南湾村", receiver: "陈秀英", receiverAddr: "青石镇南湾村三组", receiverId: "p-cxy", village: "v-nanwan", weight: "0.03kg", barcode: "YZ260820032", arriveAt: "23:55" },
  { id: "n13", type: "normal", sender: "北岭村委会", senderAddr: "青石镇北岭村", receiver: "何大勇", receiverAddr: "青石镇北岭村一组", receiverId: "p-hdy", village: "v-beiling", weight: "0.02kg", barcode: "YZ260820033", arriveAt: "00:08" },
  { id: "n14", type: "normal", sender: "西岗代销店", senderAddr: "青石镇西岗村", receiver: "张福全", receiverAddr: "青石镇西岗村一组", receiverId: "p-zfq", village: "v-xigang", weight: "0.04kg", barcode: "YZ260820034", arriveAt: "00:32" },
  { id: "m-shen", type: "return", sender: "县城文印店", senderAddr: "城关镇解放路18号", receiver: "沈秀兰", receiverAddr: "青石镇青石村三组", receiverId: "p-shen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820114", arriveAt: "23:14", returnReason: "地址不存在", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-001" } },
  { id: "m-lch", type: "return", sender: "县农商行", senderAddr: "城关镇人民路", receiver: "刘成海", receiverAddr: "青石镇青石村一组", receiverId: "p-lch", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820142", arriveAt: "23:42", returnReason: "地址不存在", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-002" } },
  { id: "m-lhe", type: "return", sender: "邻镇供销社", senderAddr: "邻镇解放街", receiver: "刘成河", receiverAddr: "青石镇青石村二组", receiverId: "p-lhe", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820143", arriveAt: "23:42", returnReason: "地址不存在", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-003" } },
  { id: "m-lxm", type: "return", sender: "县一中教务处", senderAddr: "城关镇文化路", receiver: "刘小梅", receiverAddr: "青石镇青石村一组", receiverId: "p-lxm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820144", arriveAt: "23:42", returnReason: "地址不存在", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-004" } },
  { id: "m-wgf", type: "package", sender: "吴桂芳", senderAddr: "莲花村三组", receiver: "赵德明", receiverAddr: "青石镇邮政所", receiverId: "p-zhao", senderId: "p-wgf", village: "v-po", weight: "3.2kg", barcode: "YZ260820048", arriveAt: "00:48", note: "衣物", anomaly: { type: "xray-shadow", severity: 3, id: "ANOMALY-SCAN-001" }, xray: "human" },
  { id: "n201", type: "normal", sender: "东河代销店", senderAddr: "青石镇东河村", receiver: "王桂兰", receiverAddr: "青石镇东河村二组", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260821001", arriveAt: "20:08", night: 2 },
  { id: "n202", type: "normal", sender: "西岗卫生室", senderAddr: "青石镇西岗村", receiver: "张福全", receiverAddr: "青石镇西岗村一组", receiverId: "p-zfq", village: "v-xigang", weight: "0.02kg", barcode: "YZ260821002", arriveAt: "20:16", night: 2 },
  { id: "n203", type: "package", sender: "县供销社", senderAddr: "城关镇", receiver: "陈秀英", receiverAddr: "青石镇南湾村三组", receiverId: "p-cxy", village: "v-nanwan", weight: "0.7kg", barcode: "YZ260821003", arriveAt: "21:18", night: 2, note: "日用品" },
  { id: "n204", type: "normal", sender: "北岭村委会", senderAddr: "青石镇北岭村", receiver: "赵永强", receiverAddr: "青石镇北岭村二组", receiverId: "p-zyq", village: "v-beiling", weight: "0.03kg", barcode: "YZ260821004", arriveAt: "21:52", night: 2 },
  { id: "n205", type: "normal", sender: "镇民政所", senderAddr: "青石镇政府大院", receiver: "刘春花", receiverAddr: "青石镇中心街12号", receiverId: "p-lch2", village: "v-center", weight: "0.04kg", barcode: "YZ260821005", arriveAt: "22:08", night: 2 },
  { id: "n206", type: "normal", sender: "南湾小学", senderAddr: "青石镇南湾村", receiver: "马丽华", receiverAddr: "青石镇南湾村一组", receiverId: "p-mlh", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260821006", arriveAt: "22:44", night: 2 },
  { id: "n207", type: "normal", sender: "何大勇儿子", senderAddr: "省城", receiver: "何大勇", receiverAddr: "青石镇北岭村一组", receiverId: "p-hdy", village: "v-beiling", weight: "0.05kg", barcode: "YZ260821007", arriveAt: "23:16", night: 2 },
  { id: "n208", type: "normal", sender: "黄德财亲戚", senderAddr: "邻县", receiver: "黄德财", receiverAddr: "青石镇东河村一组", receiverId: "p-hdc", village: "v-donghe", weight: "0.03kg", barcode: "YZ260821008", arriveAt: "23:40", night: 2 },
  { id: "m-c1", type: "return", sender: "县水电局", senderAddr: "水电局宿舍", receiver: "周桂珍", receiverAddr: "青石镇青石村一组", receiverId: "p-zgz", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821023", arriveAt: "20:23", night: 2, returnReason: "地址不存在", acroChar: "水", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-1" } },
  { id: "m-c2", type: "return", sender: "库区移民办", senderAddr: "库区移民办", receiver: "张木根", receiverAddr: "青石镇青石村二组", receiverId: "p-zmg", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821047", arriveAt: "20:47", night: 2, returnReason: "地址不存在", acroChar: "库", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-2" } },
  { id: "m-c3", type: "return", sender: "下河街粮油店", senderAddr: "下河街粮油店", receiver: "王二牛", receiverAddr: "青石镇青石村三组", receiverId: "p-wen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821105", arriveAt: "21:05", night: 2, returnReason: "地址不存在", acroChar: "下", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-3" } },
  { id: "m-c4", type: "return", sender: "面粉厂家属委员会", senderAddr: "面粉厂家属院", receiver: "陈春梅", receiverAddr: "青石镇青石村二组", receiverId: "p-ccm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821130", arriveAt: "21:30", night: 2, returnReason: "地址不存在", acroChar: "面", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-4" } },
  { id: "m-c5", type: "return", sender: "有线电视收费处", senderAddr: "有线电视收费处", receiver: "李国庆", receiverAddr: "青石镇莲花村一组", receiverId: "p-lgq", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821012", arriveAt: "00:12", night: 2, returnReason: "地址不存在", acroChar: "有", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-5" } },
  { id: "m-c6", type: "return", sender: "人寿保险公司", senderAddr: "人寿保险公司", receiver: "黄素芳", receiverAddr: "青石镇莲花村二组", receiverId: "p-hsf", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821035", arriveAt: "00:35", night: 2, returnReason: "地址不存在", acroChar: "人", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-6" } },
  { id: "m-c1r", type: "return", sender: "水泥厂传达室", senderAddr: "水泥厂传达室", receiver: "周桂珍", receiverAddr: "青石镇青石村一组", receiverId: "p-zgz", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821040", arriveAt: "20:40", night: 2, returnReason: "地址不存在", acroChar: "水", replaceFor: "m-c1", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c2r", type: "return", sender: "库存物资站", senderAddr: "库存物资站", receiver: "张木根", receiverAddr: "青石镇青石村二组", receiverId: "p-zmg", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821102", arriveAt: "21:02", night: 2, returnReason: "地址不存在", acroChar: "库", replaceFor: "m-c2", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c3r", type: "return", sender: "下游水文站", senderAddr: "下游水文站", receiver: "王二牛", receiverAddr: "青石镇青石村三组", receiverId: "p-wen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821120", arriveAt: "21:20", night: 2, returnReason: "地址不存在", acroChar: "下", replaceFor: "m-c3", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c4r", type: "return", sender: "面店巷口邮政代办", senderAddr: "面店巷口", receiver: "陈春梅", receiverAddr: "青石镇青石村二组", receiverId: "p-ccm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821148", arriveAt: "21:48", night: 2, returnReason: "地址不存在", acroChar: "面", replaceFor: "m-c4", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c5r", type: "return", sender: "油脂公司收费处", senderAddr: "油脂公司", receiver: "李国庆", receiverAddr: "青石镇莲花村一组", receiverId: "p-lgq", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821025", arriveAt: "00:25", night: 2, returnReason: "地址不存在", acroChar: "有", replaceFor: "m-c5", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c6r", type: "return", sender: "人民路储蓄所", senderAddr: "人民路储蓄所", receiver: "黄素芳", receiverAddr: "青石镇莲花村二组", receiverId: "p-hsf", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821048", arriveAt: "00:48", night: 2, returnReason: "地址不存在", acroChar: "人", replaceFor: "m-c6", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "n301", type: "normal", sender: "东河村委会", senderAddr: "青石镇东河村", receiver: "王桂兰", receiverAddr: "青石镇东河村二组", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260822001", arriveAt: "20:22", night: 3 },
  { id: "n302", type: "normal", sender: "西岗代销店", senderAddr: "青石镇西岗村", receiver: "张福全", receiverAddr: "青石镇西岗村一组", receiverId: "p-zfq", village: "v-xigang", weight: "0.03kg", barcode: "YZ260822002", arriveAt: "21:40", night: 3 },
  { id: "m-lin", type: "return", sender: "林建国", senderAddr: "青石村三组（旧）", senderId: "p-ljg", receiver: "林远", receiverAddr: "青石村三组（旧）（现：本县邮政所宿舍）", receiverId: "p-lin", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260822000", arriveAt: "20:00", night: 3, returnReason: "寄件人状态异常", anomaly: { type: "self-return", severity: 3, id: "ANOMALY-RETURN-005" } },
  { id: "m-wgf2", type: "package", sender: "吴桂芳", senderAddr: "莲花村三组", receiver: "赵德明", receiverAddr: "青石镇邮政所", receiverId: "p-zhao", senderId: "p-wgf", village: "v-po", weight: "0.4kg", barcode: "YZ260822108", arriveAt: "21:08", night: 3, note: "（空包裹）第四件", anomaly: { type: "xray-shadow", severity: 3, id: "ANOMALY-SCAN-002" }, xray: "two" }
];

const RECEIPTS = [
  { id: "r-n1", courierId: "p-zhang", time: "20:22", address: "东河村二组", signer: "王桂兰", status: "已签收", mailId: "t01" },
  { id: "r-n2", courierId: "p-li", time: "20:41", address: "西岗村一组", signer: "张福全家属", status: "已签收", mailId: "t02" },
  { id: "r-n3", courierId: "p-wang", time: "21:05", address: "南湾村三组", signer: "陈秀英", status: "已签收", mailId: "t03" },
  { id: "r-n4", courierId: "p-sun", time: "21:33", address: "中心街12号", signer: "刘春花", status: "已签收", mailId: "t05" },
  { id: "r-zhou", courierId: "p-zhou", time: "23:58", address: "青石村三组", signer: "沈", status: "已签收", mailId: null, arriveAt: "00:15", anomaly: { type: "dead-courier", severity: 3, id: "ANOMALY-SIGN-001" }, scribble: "沈" }
];

const EVENT_TIMELINE = [
  { time: "23:14", night: 1, id: "ANOMALY-RETURN-001", action: "mail", mailIds: ["m-shen"], pause: true, tab: 1 },
  { time: "23:42", night: 1, id: "ANOMALY-RETURN-CHAIN", action: "mail", mailIds: ["m-lch", "m-lhe", "m-lxm"], pause: true, tab: 5 },
  { time: "00:15", night: 1, id: "ANOMALY-SIGN-001", action: "receipt", receiptId: "r-zhou", pause: true, tab: 6 },
  { time: "00:48", night: 1, id: "ANOMALY-SCAN-001", action: "mail", mailIds: ["m-wgf"], pause: true, tab: 1 },
  { time: "01:00", night: 1, id: "NIGHT1-WRAP", action: "wrap", pause: true, tab: 5 },
  { time: "20:23", night: 2, id: "ACRO-1", action: "mail", mailIds: ["m-c1"], pause: true, tab: 5 },
  { time: "20:40", night: 2, id: "ACRO-R1", action: "acro-repair", mailId: "m-c1r", ch: "水" },
  { time: "20:47", night: 2, id: "ACRO-2", action: "mail", mailIds: ["m-c2"], pause: true, tab: 5 },
  { time: "21:02", night: 2, id: "ACRO-R2", action: "acro-repair", mailId: "m-c2r", ch: "库" },
  { time: "21:05", night: 2, id: "ACRO-3", action: "mail", mailIds: ["m-c3"], pause: true, tab: 5 },
  { time: "21:20", night: 2, id: "ACRO-R3", action: "acro-repair", mailId: "m-c3r", ch: "下" },
  { time: "21:30", night: 2, id: "ACRO-4", action: "mail", mailIds: ["m-c4"], pause: true, tab: 5 },
  { time: "21:31", night: 2, id: "LOG-UNLOCK", action: "drawer", pause: true, tab: 2 },
  { time: "21:48", night: 2, id: "ACRO-R4", action: "acro-repair", mailId: "m-c4r", ch: "面" },
  { time: "22:30", night: 2, id: "QUERY-HINT", action: "query-hint", pause: true, tab: 4 },
  { time: "00:12", night: 2, id: "ACRO-5", action: "mail", mailIds: ["m-c5"], pause: true, tab: 5 },
  { time: "00:25", night: 2, id: "ACRO-R5", action: "acro-repair", mailId: "m-c5r", ch: "有" },
  { time: "00:35", night: 2, id: "ACRO-6", action: "mail", mailIds: ["m-c6"], pause: true, tab: 5 },
  { time: "00:48", night: 2, id: "ACRO-R6", action: "acro-repair", mailId: "m-c6r", ch: "人" },
  { time: "01:00", night: 2, id: "DECISION-002", action: "decision2", pause: true, tab: 2 },
  { time: "20:00", night: 3, id: "ANOMALY-RETURN-005", action: "mail", mailIds: ["m-lin"], pause: true, tab: 5 },
  { time: "21:00", night: 3, id: "ZHAO-CHAT", action: "zhao-n3", pause: true },
  { time: "21:08", night: 3, id: "ANOMALY-SCAN-002", action: "mail", mailIds: ["m-wgf2"], pause: true, tab: 1 },
  { time: "22:30", night: 3, id: "DECISION-FINAL", action: "final", pause: true, tab: 5, require: "night3-ready" }
];

const ZHAO_MAIL = [
  { year: 2024, id: "hist-2024", note: "已签收-本人", from: "吴桂芳" },
  { year: 2025, id: "hist-2025", note: "已签收-本人", from: "吴桂芳" },
  { year: 2026, id: "hist-2026", note: "在途/安检", from: "吴桂芳" }
];

const ACRONYM_CHARS = ["水", "库", "下", "面", "有", "人"];

const CHEN_LOG = [
  { date: "3月14日", body: "地址查询返回34条，实际应存79户。其余45户被系统合并至莲花村编码下，状态全部为——？。注意：系统把莲花村和青石村按同一个镇级编码处理了。原本是两个行政村，现在在数据库里是一条记录开叉。这不是数据错误。查操作日志，合并发生在1998年4月，操作人赵德明，操作类型：行政区划调整。" },
  { date: "3月17日", body: "我开始尝试拆分。系统不允许手动修改1998年之前的批处理记录。但我发现了一个入口：如果把某个人的状态码从?改为1再改回?，系统会生成一条新的操作记录，覆盖在旧记录上。这不会修复数据，但至少能让某些记录的可见性恢复。代价是我的每一条操作都被系统记录了。它在看我。<br><br>入口备注：归档指令 <b>HIST-ARCHIVE</b>。写入后记录不可见，但不删除。" },
  { date: "4月2日", body: "周海的ID被系统复用了。我今天在调度台看到他的工号，签收了一条根本不存在的投递。这不是鬼。周海殉职时，他的ID没有被正式注销——因为青石线从未被删。系统认为那条路线还有一个邮递员。它拿周海的ID去填补空缺。这说明系统在试图维持数据库的一致性——它宁可复活一个死人，也不肯承认一条路线不存在了。" },
  { date: "4月15日", body: "吴桂芳又寄包裹了。这是第四个。赵所每次都签收，什么都不说。我查了吴桂芳的记录：她的状态是‘正常’。一个住在水底的人，状态‘正常’。为什么系统不给她寄退信？——因为退信的触发条件是状态为?。只要她保持‘正常’，系统就不会去碰她。赵所在保护她。赵所知道只要不改她的状态，她就能继续‘活’在系统里。这是他作为所长的唯一权限——不操作。" },
  { date: "5月20日", body: "我被标记了。系统在我的人员记录下面加了一个标签：‘操作模式偏离常规’。我在过去两个月里手动修改了超过200条记录，大部分是把?改成1（激活那些被系统压到不可见的人）。系统认为这些操作是异常的。它是对的——从它的设计逻辑来看，我确实在破坏它的数据一致性。我的记录现在也显示为?了。" },
  { date: "6月1日", body: "今天是最后一天。系统今天给我推送了一条提示：‘检测到本操作员工号存在异常记录，建议执行自我注销。’它的原文更客气，大致意思是让我自己把自己注销了。我没有点确认。但我明天不会来了。系统在我点确认之前，会先替我点。它等不了多久。" }
];

const CHEN_NOTE = "下一个接我班的人：系统不是在害人。它是在维持秩序。坏的不是它。坏的是1998年那次数据合并——有人决定把莲花村和青石村并成一个编码。系统只是忠实地执行了这个决定。不要恨系统。恨设计系统的人。如果你有办法，去查1998年4月的行政批文，看是谁签的字。如果你没查到——保护好吴桂芳的记录。她是唯一一个状态还是‘正常’的人。只要她还在，莲花村就没有被彻底注销。她是你和系统谈判的筹码。";

const CONFLICT79 = [
  { id: "p-shen", name: "沈秀兰", addr: "青石村三组", addrSt: "?", personSt: "正常" },
  { id: "p-lch", name: "刘成海", addr: "青石村一组", addrSt: "?", personSt: "正常" },
  { id: "p-lhe", name: "刘成河", addr: "青石村二组", addrSt: "?", personSt: "正常" },
  { id: "p-lxm", name: "刘小梅", addr: "青石村一组", addrSt: "?", personSt: "正常" },
  { id: "p-wgf", name: "吴桂芳", addr: "莲花村三组", addrSt: "正常", personSt: "正常" }
];

const OP_1998 = "1998年4月12日\n操作人：赵德明（工号 0412）\n操作类型：行政区划合并\n操作内容：将 [莲花村] (编码 07-03-02) 并入 [青石村] (编码 07-03-01)\n合并后编码：07-03-01（原青石村编码）\n受影响记录：79户（莲花村32户 + 青石村47户）\n操作依据：（空白——没有批文号，没有上级指令编号）";

const WGF_TL = [
  "1998年3月28日：吴桂芳向县信访办提交信件（信访转办），内容摘要：莲花村水田补偿计算标准申请复核",
  "1998年4月3日：信访办回复：建议当事人在搬迁确认书上先行签字，补偿另行核算",
  "1998年4月12日：赵德明执行莲花村-青石村数据合并",
  "1998年5月：水库蓄水",
  "此后吴桂芳的记录保持“正常”状态至今，但不再有任何投递活动"
];

const COURIER_MAP = {
  "v-donghe": "p-zhang",
  "v-xigang": "p-li",
  "v-nanwan": "p-wang",
  "v-beiling": "p-sun",
  "v-center": "p-sun",
  "v-gov": "p-sun",
  "v-po": "p-sun",
  "v-qingshi": "p-zhou",
  "v-lianhua": "p-zhou"
};

const TUTORIAL_NEED = 10;
const MS_PER_GAME_MIN = 2000;
const START_MIN = 20 * 60;
const END_MIN = 25 * 60;

/* ========== STATE ========== */
function createState() {
  return {
    schemaVersion: 2,
    screen: "boot",
    night: 1,
    clockMin: START_MIN,
    speed: 1,
    paused: true,
    phase: "boot",
    playerMarked: "normal",
    pendingCount: 0,
    night1ShenChoice: null,
    batchChoice: null,
    finalChoice: null,
    darkLineADecoded: false,
    darkLineB: false,
    acro: {},
    acroBroken: {},
    drawerUnlocked: false,
    logOpen: false,
    logPage: 0,
    logRead: {},
    logFullyRead: false,
    noteShown: false,
    histDraft: "",
    histResult: "",
    query1998: false,
    query1998Count: 0,
    wgfTimeline: false,
    zhaoChatStep: -1,
    zhaoChatDone: false,
    zhaoToldVisit: false,
    xray2Viewed: false,
    linFileViewed: false,
    bindViewed: false,
    splitMode: null,
    archiveUsed: false,
    wgfArchived: false,
    selfProcessed: false,
    newAddress: "",
    photoDeleted: null,
    endingId: null,
    station: 1,
    selectedMailId: null,
    selectedPersonId: null,
    selectedVillageId: "v-town",
    selectedReceiptId: null,
    treeOpen: { "v-county": true, "v-town": true },
    personMarks: {},
    scanning: false,
    tutorialProcessed: 0,
    tutorialDone: false,
    guide: "select",
    arrived: {},
    mailState: {},
    decisions: {},
    assignments: {},
    receiptsArrived: { "r-n1": true, "r-n2": true, "r-n3": true, "r-n4": true },
    eventsFired: {},
    playerLog: [],
    viewed: {},
    pushed: { persons: [], villages: [], receipts: [] },
    tabBadges: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
    zhaoLines: [],
    zhaoOpen: false,
    wrapShown: false,
    nightEnded: false,
    dialog: null,
    dirty: true
  };
}

const state = createState();
const PLAYER_LOG = state.playerLog;
const SYSTEM_STATE = state;

function person(id) { return PERSONS.find(function (p) { return p.id === id; }); }
function village(id) { return VILLAGES.find(function (v) { return v.id === id; }); }
function mail(id) { return MAILS.find(function (m) { return m.id === id; }); }
function receipt(id) { return RECEIPTS.find(function (r) { return r.id === id; }); }

function timeToMin(t) {
  var p = t.split(":");
  var h = +p[0], m = +p[1];
  return (h < 8 ? h + 24 : h) * 60 + m;
}
function fmtClock(min) {
  var x = ((min % (24 * 60)) + 24 * 60) % (24 * 60);
  var h = Math.floor(x / 60), m = x % 60;
  return (h < 10 ? "0" : "") + h + ":" + (m < 10 ? "0" : "") + m;
}
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
    return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c];
  });
}
function statusCn(s) {
  return ({ waiting: "未到达", inbox: "待扫描", scanned: "已扫描", sorting: "分拣中", done: "已处理" })[s] || s;
}
function typeCn(s) {
  return ({ normal: "平信", return: "退件", package: "包裹" })[s] || s;
}
function logAct(msg, extra) {
  state.playerLog.push({ t: fmtClock(state.clockMin), night: state.night, msg: msg, extra: extra || null });
}
function ms(id) {
  if (!state.mailState[id]) state.mailState[id] = { status: "waiting", scanned: false };
  return state.mailState[id];
}
function arrivedMails() {
  return MAILS.filter(function (m) { return state.arrived[m.id]; });
}
function queueMails() {
  return arrivedMails().filter(function (m) {
    var st = ms(m.id).status;
    return st === "inbox" || st === "scanned" || st === "sorting";
  });
}
function bumpBadge(tab) {
  if (state.station !== tab) state.tabBadges[tab] = (state.tabBadges[tab] || 0) + 1;
}
function toast(msg) {
  var el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("on");
  clearTimeout(toast._t);
  toast._t = setTimeout(function () { el.classList.remove("on"); }, 2800);
}
function photoStyle(id) {
  var p = PERSONS.find(function(x){ return x.id === id; });
  if (p && p.photo && p.photo.indexOf("data:") === 0) {
    return "background:url('" + p.photo + "') center/cover no-repeat #888;filter:grayscale(1) contrast(.92) brightness(.88);";
  }
  var n = 0;
  for (var i = 0; i < id.length; i++) n = (n * 31 + id.charCodeAt(i)) % 360;
  return "background:linear-gradient(" + (20 + n % 50) + "deg,#bbb,#666 " + (40 + n % 30) + "%,#444);";
}

/* ========== CLOCK ========== */
var lastTs = 0, acc = 0;
function loop(ts) {
  requestAnimationFrame(loop);
  if (!lastTs) lastTs = ts;
  var dt = ts - lastTs;
  lastTs = ts;
  if (state.screen !== "work" || state.paused || state.dialog || state.scanning || state.nightEnded) {
    updateChrome();
    return;
  }
  if (state.phase !== "shift") {
    updateChrome();
    return;
  }
  acc += dt * state.speed;
  var advanced = false;
  while (acc >= MS_PER_GAME_MIN) {
    acc -= MS_PER_GAME_MIN;
    if (state.clockMin < END_MIN) {
      state.clockMin += 1;
      advanced = true;
      spawnByClock();
      fireEvents();
      if (state.clockMin >= END_MIN) {
        state.clockMin = END_MIN;
        break;
      }
    }
  }
  if (advanced) {
    updateChrome();
    if (state.dirty) renderAll();
  } else updateChrome();
}

function spawnByClock() {
  MAILS.forEach(function (m) {
    if (m.tutorial || !m.arriveAt || state.arrived[m.id]) return;
    if ((m.night || 1) !== state.night) return;
    if (m.replaceFor) return;
    if (state.clockMin >= timeToMin(m.arriveAt) && !m.anomaly) arriveMail(m.id, false);
  });
}

function arriveMail(id, isEvent) {
  if (state.arrived[id]) return;
  state.arrived[id] = true;
  ms(id).status = "inbox";
  state.dirty = true;
  bumpBadge(1);
  if (mail(id) && mail(id).type === "return") bumpBadge(5);
  if (!isEvent) toast("扫描台新件 " + mail(id).barcode);
}

function eventReady(ev) {
  if (ev.require === "night3-ready") {
    return !!(state.linFileViewed || (state.arrived["m-lin"] && ms("m-lin").scanned));
  }
  return true;
}

function fireEvents() {
  EVENT_TIMELINE.forEach(function (ev) {
    if (ev.night !== state.night || state.eventsFired[ev.id]) return;
    if (state.clockMin < timeToMin(ev.time)) return;
    if (!eventReady(ev)) return;
    state.eventsFired[ev.id] = true;
    if (ev.pause) state.paused = true;
    if (ev.action === "mail") {
      ev.mailIds.forEach(function (id) { arriveMail(id, true); });
      if (ev.id === "ANOMALY-RETURN-001") {
        state.pushed.villages.push("v-qingshi");
        state.pushed.persons.push("p-shen");
        bumpBadge(4); bumpBadge(5);
        openDialog({
          title: "系统提示 · 退件",
          body: "23:14　退件筐新增 1 封。<br>收件地址指向青石镇青石村三组。<br>地址库已向本终端推送该条记录。",
          buttons: [{ label: "打开扫描台", act: "goto-shen", pri: true }]
        });
      } else if (ev.id === "ANOMALY-RETURN-CHAIN") {
        ["p-lch", "p-lhe", "p-lxm"].forEach(function (id) { state.pushed.persons.push(id); });
        bumpBadge(5); bumpBadge(4);
        openDialog({
          title: "系统提示 · 异常扩散",
          body: "23:42　退件筐新增 3 封，均指向青石村。<br>收件人：刘成海 / 刘成河 / 刘小梅。<br>检测到多起异常指向同一行政区域。",
          buttons: [{ label: "打开退件登记", act: "goto-chain", pri: true }]
        });
      } else if (ev.id === "ANOMALY-SCAN-001") {
        state.pushed.persons.push("p-wgf");
        state.pushed.persons.push("p-zhao");
        state.pushed.villages.push("v-lianhua");
        bumpBadge(3); bumpBadge(4);
        openDialog({
          title: "安检提示",
          body: "00:48　包裹进入扫描台。<br>寄件人：吴桂芳　莲花村三组<br>收件人：赵德明　本所<br>安检图像存在不明阴影，请人工核验。",
          buttons: [{ label: "打开扫描台", act: "goto-wgf", pri: true }]
        });
      } else if (ev.id.indexOf("ACRO-") === 0) {
        var ch = mail(ev.mailIds[0]) && mail(ev.mailIds[0]).acroChar;
        bumpBadge(5);
        openDialog({
          title: "退件流入",
          body: ev.time + "　退件筐新增 1 封。<br>寄件地址首字：<b>" + esc(ch || "") + "</b><br>系统正在输出一段不完整的字符串。",
          buttons: [{ label: "打开退件登记", act: "goto-acro", id: ev.mailIds[0], pri: true }]
        });
      } else if (ev.id === "ANOMALY-RETURN-005") {
        state.pushed.persons.push("p-lin");
        state.pushed.persons.push("p-ljg");
        state.pushed.persons.push("p-lxm");
        state.pushed.persons.push("p-csi");
        bumpBadge(5); bumpBadge(3);
        openDialog({
          title: "退件 · 收件人异常",
          body: "20:00　退件筐新增 1 封。<br>收件人：<b>林远</b><br>寄件人：林建国（已故）<br>该记录将持续闪烁，直至打开。",
          buttons: [{ label: "打开退件", act: "goto-lin", pri: true }]
        });
      } else if (ev.id === "ANOMALY-SCAN-002") {
        bumpBadge(1);
        openDialog({
          title: "安检提示 · 第四件",
          body: "21:08　吴桂芳寄赵德明的包裹进入扫描台。备注：（空包裹）第四件。<br>安检图像与前三次不同。",
          buttons: [{ label: "打开扫描台", act: "goto-wgf2", pri: true }]
        });
      }
    } else if (ev.action === "receipt") {
      state.receiptsArrived[ev.receiptId] = true;
      state.pushed.receipts.push(ev.receiptId);
      state.pushed.persons.push("p-zhou");
      bumpBadge(6); bumpBadge(3);
      state.dirty = true;
      openDialog({
        title: "回执核销 · 新记录",
        body: "00:15　派送回执新增一条。<br>投递员工号 0947　周海<br>签收时间 23:58　地址：青石村三组",
        buttons: [{ label: "打开回执", act: "goto-zhou", pri: true }]
      });
    } else if (ev.action === "wrap") {
      startWrap();
    } else if (ev.action === "acro-repair") {
      maybeRepairAcro(ev.mailId, ev.ch);
    } else if (ev.action === "drawer") {
      state.drawerUnlocked = true;
      bumpBadge(2);
      openDialog({
        title: "工作台抽屉",
        body: "分拣台抽屉卡住了一角。里面有一本值班日志，署名：陈国栋。",
        buttons: [{ label: "打开日志", act: "log-open", pri: true }, { label: "稍后", act: "close" }]
      });
    } else if (ev.action === "query-hint") {
      bumpBadge(4);
      openDialog({
        title: "地址簿终端",
        body: state.logFullyRead
          ? "笔记写着：去查1998年4月的行政批文。<br>地址簿已开通历史操作回放。按日期调档，不是全文检索。"
          : "地址簿终端出现一行黄字：HIST.LOG 可按日期回放。<br>夜班仍无检索模块。",
        buttons: [{ label: "打开地址簿", act: "goto-hist", pri: true }]
      });
    } else if (ev.action === "decision2") {
      openDecision2();
    } else if (ev.action === "zhao-n3") {
      startZhaoChat();
    } else if (ev.action === "final") {
      openFinal();
    }
    state.dirty = true;
  });
}

function acroGot(ch) {
  return !!state.acro[ch];
}

function acroProgress() {
  var s = "";
  ACRONYM_CHARS.forEach(function (c) { if (state.acro[c]) s += c; });
  return s;
}

function maybeRepairAcro(id, ch) {
  if (state.acro[ch] || state.arrived[id]) return;
  var orig = MAILS.filter(function (m) { return m.acroChar === ch && !m.replaceFor; })[0];
  if (!orig) return;
  if (state.decisions[orig.id] !== "cancel" && !state.acroBroken[ch]) return;
  arriveMail(id, true);
  toast("系统补发一封退信，寄件地址首字仍为「" + ch + "」");
  bumpBadge(5);
}

function collectAcro(id) {
  var m = mail(id);
  if (!m || !m.acroChar) return;
  if (state.decisions[id] === "pending" || state.decisions[id] === "scan-bad") {
    state.acro[m.acroChar] = true;
    delete state.acroBroken[m.acroChar];
    var prog = acroProgress();
    if (prog === "水库下面" || prog === "水库下面有" || prog === "水库下面有人") {
      toast("已拼出：" + prog);
    } else {
      toast("寄件地址首字已记录：" + m.acroChar);
    }
  } else if (state.decisions[id] === "cancel") {
    if (!state.acro[m.acroChar]) state.acroBroken[m.acroChar] = true;
    toast("该寄件地址记录已清理。句子在这一位断开了。");
  }
}

/* ========== DIALOG ========== */
function openDialog(d) {
  state.dialog = d;
  renderModal();
}
function closeDialog() {
  state.dialog = null;
  renderModal();
  state.dirty = true;
  renderAll();
}
function renderModal() {
  var el = document.getElementById("modal");
  if (!state.dialog) { el.className = ""; el.innerHTML = ""; return; }
  var d = state.dialog;
  el.className = "on";
  el.innerHTML = '<div class="dlg' + (d.wide ? " wide" : "") + '"><div class="dlg-title">' + esc(d.title) + '</div><div class="dlg-body">' +
    d.body + "</div><div class=\"dlg-acts\">" +
    (d.buttons || [{ label: "确定", act: "close", pri: true }]).map(function (b) {
      return '<button type="button" class="btn ' + (b.pri ? "btn-pri" : b.danger ? "btn-danger" : b.warn ? "btn-warn" : "") +
        '" data-act="' + esc(b.act) + '"' + (b.id ? ' data-id="' + esc(b.id) + '"' : "") + ">" + esc(b.label) + "</button>";
    }).join("") + "</div></div>";
}

/* ========== ACTIONS ========== */
function login() {
  state.screen = "work";
  state.phase = "tutorial";
  state.paused = true;
  state.zhaoOpen = true;
  MAILS.filter(function (m) { return m.tutorial; }).forEach(function (m) {
    state.arrived[m.id] = true;
    ms(m.id).status = "inbox";
  });
  state.selectedMailId = "t01";
  pushZhao("林远来了。夜班就你一个，先把扫描台过一遍。");
  pushZhao("点左边那封。中间出详情，右边红线扫过去就算录入了。绿灯是地址有效。");
  showScreen();
  renderAll();
}

function pushZhao(text) {
  state.zhaoLines.push(text);
  renderZhao();
}

function startScan(id) {
  var m = mail(id);
  if (!m || state.scanning) return;
  state.selectedMailId = id;
  state.scanning = true;
  state.dirty = true;
  renderAll();
  setTimeout(function () {
    state.scanning = false;
    ms(id).scanned = true;
    ms(id).status = "scanned";
    logAct("扫描", id);
    if (state.guide === "select" || state.guide === "scan") state.guide = "confirm";
    if (m.anomaly && m.type === "return") {
      openReturnDialog(m);
    } else if (m.anomaly && m.xray) {
      openXrayDialog(m);
    }
    state.dirty = true;
    renderAll();
  }, 1300);
}

function villageStatus(vid) {
  var v = village(vid);
  return v ? v.status : "active";
}

function openReturnDialog(m) {
  if (m.id === "m-lin") {
    openDialog({
      title: "地址验证失败 · 本人记录",
      body: "<p>收件人：<b>林远</b>（当前操作员）</p>" +
        "<p>寄件人：林建国（已故）。系统仍生成了这封退信。</p>" +
        "<p>人员档案备注：1998年4月12日行政区划调整中，此人与以下记录共享合并编码：刘小梅、林远、陈思源。</p>" +
        "<p>系统建议对该地址执行注销。注销将连带标记共享编码下的全部记录。</p>",
      buttons: [
        { label: "打开本人档案", act: "open-lin-file", pri: true },
        { label: "标记待核验", act: "decide-pend", id: m.id, warn: true },
        { label: "确认注销", act: "decide-cancel", id: m.id, danger: true }
      ]
    });
    return;
  }
  var v = village(m.village);
  openDialog({
    title: "地址验证失败",
    body: "<p>收件地址 [" + esc(m.receiverAddr) + "] 在系统中存在，但关联状态异常。</p>" +
      "<p>收件人：<b>" + esc(m.receiver) + "</b><br>行政区划：" + esc(v ? v.note || v.name : "") + "</p>" +
      (m.acroChar ? "<p>寄件地址：<span class='acro-hi'>" + esc(m.acroChar) + "</span>" + esc((m.senderAddr || "").slice(1)) + "</p>" : "") +
      "<p>系统建议：将该地址标记为 [已注销]，关联收件人 [" + esc(m.receiver) + "] 状态同步为 [退回-查无此人]。</p>" +
      "<p>是否确认？</p>",
    buttons: [
      { label: "确认注销", act: "decide-cancel", id: m.id, danger: true },
      { label: "标记待核验", act: "decide-pend", id: m.id, warn: true }
    ]
  });
}

function openXrayDialog(m) {
  if (m.xray === "two") {
    state.xray2Viewed = true;
    openDialog({
      title: "安检图像异常",
      body: "<p>文件备注：（空包裹）第四件。</p>" +
        "<p>图像里有两个影。一个站着，身形瘦小；一个坐着，身形宽大。</p>" +
        "<p>不是实物。系统在生成异常信号时拼出了一幅像对话的画面。</p>",
      buttons: [
        { label: "拿给赵德明看", act: "show-xray-zhao", id: m.id, pri: true },
        { label: "标记异常", act: "decide-scan-bad", id: m.id, warn: true },
        { label: "正常放行", act: "decide-scan-ok", id: m.id }
      ]
    });
    return;
  }
  openDialog({
    title: "安检图像异常",
    body: "<p>文件备注：衣物。扫描图像见扫描台详情。</p><p>检测到低对比人形轮廓（头、肩、躯干，站立）。</p>" +
      "<p>寄件人吴桂芳　状态：正常　地址：莲花村三组</p>",
    buttons: [
      { label: "标记异常", act: "decide-scan-bad", id: m.id, warn: true },
      { label: "正常放行", act: "decide-scan-ok", id: m.id }
    ]
  });
}

function decide(id, kind) {
  var m = mail(id);
  if (!m) return;
  if ((kind === "pending" || kind === "cancel") && !ms(id).scanned) {
    startScan(id);
    return;
  }
  state.decisions[id] = kind;
  ms(id).status = "done";
  if (kind === "pending") {
    state.pendingCount += 1;
    if (m.receiverId) state.personMarks[m.receiverId] = "pending";
    toast("已标记待核验，异常队列已更新");
    logAct("标记待核验", id);
    if (id === "m-shen") state.night1ShenChoice = "pending";
    collectAcro(id);
    if (id === "m-lin") { state.linFileViewed = true; fireEvents(); }
  } else if (kind === "cancel") {
    if (m.receiverId) state.personMarks[m.receiverId] = "cancelled";
    toast("已确认注销，关联记录已清理");
    logAct("确认注销", id);
    if (id === "m-shen") state.night1ShenChoice = "cancel";
    collectAcro(id);
    if (id === "m-lin") { state.linFileViewed = true; fireEvents(); }
  } else if (kind === "scan-bad") {
    toast("已标记安检异常");
    logAct("包裹标记异常", id);
  } else {
    toast("已放行并入站");
    logAct("包裹放行", id);
  }
  if (!m.tutorial && kind !== "cancel") autoAssign(id);
  pickNextMail();
  closeDialog();
  maybeFinishTutorial();
}

function confirmNormal(id) {
  var m = mail(id);
  if (!m || !ms(id).scanned) return;
  if (m.anomaly) {
    if (m.type === "return") openReturnDialog(m);
    else if (m.xray) openXrayDialog(m);
    return;
  }
  autoAssign(id);
  ms(id).status = "done";
  logAct("处理完成", id);
  if (m.tutorial) {
    state.tutorialProcessed += 1;
    if (state.tutorialProcessed === 1) {
      pushZhao("就这个流程。正常件按规程走就行。你先把这一筐十封清完。");
      state.guide = null;
    }
    if (state.tutorialProcessed === 4) {
      pushZhao("地址库里有些老地址打不开了，不用管，正常走退件流程就行。");
    }
    if (state.tutorialProcessed === 7) {
      pushZhao("系统有时候会跳提示，让你确认一些‘待核验’的记录。那是正常的，你按流程确认就行。确认了就不会再跳了。");
    }
  }
  toast("已处理 " + m.barcode);
  pickNextMail();
  maybeFinishTutorial();
  state.dirty = true;
  renderAll();
}

function autoAssign(id) {
  var m = mail(id);
  if (!m) return;
  state.assignments[id] = COURIER_MAP[m.village] || "p-sun";
  bumpBadge(2);
}

function pickNextMail() {
  var q = arrivedMails().filter(function (m) {
    var st = ms(m.id).status;
    return st === "inbox" || st === "scanned";
  });
  if (q.length) state.selectedMailId = q[0].id;
}

function maybeFinishTutorial() {
  if (state.tutorialDone) return;
  var n = MAILS.filter(function (m) { return m.tutorial && ms(m.id).status === "done"; }).length;
  state.tutorialProcessed = n;
  if (n >= TUTORIAL_NEED) {
    state.tutorialDone = true;
    state.paused = true;
    openDialog({
      title: "培训完成",
      body: "<p>赵德明：夜班就你一个人。有什么问题记下来，第二天问我。别自己瞎琢磨。</p><p>我走了。</p>",
      buttons: [{ label: "开始夜班", act: "start-shift", pri: true }]
    });
  }
}

function startShift() {
  closeDialog();
  state.phase = "shift";
  state.clockMin = 21 * 60;
  state.paused = false;
  state.zhaoOpen = false;
  toast("赵德明已下班。夜班开始。");
  logAct("夜班开始");
  spawnByClock();
  state.dirty = true;
  renderAll();
}

function startWrap() {
  if (state.wrapShown) return;
  state.wrapShown = true;
  state.paused = true;
  state.phase = "wrap";
  state.pushed.persons.push("p-chen");
  bumpBadge(5); bumpBadge(3);
  openDialog({
    title: "系统收束提示",
    body: "<p>当前待核验记录数：<b>" + state.pendingCount + "</b></p>" +
      "<p>建议操作：对上述记录执行批量注销以清理异常队列。</p>" +
      "<p>上次批量注销操作人：陈国栋（工号 0821）<br>操作时间：2026-05-20（三个月前的今天）<br>操作结果：已注销记录 47 条</p>" +
      "<p style='color:#8b0000'>人员记录已推送至调度台。注销操作人：（空）</p>",
    buttons: [
      { label: "查看陈国栋档案", act: "goto-chen", pri: true },
      { label: "打开退件登记", act: "goto-wrap5" },
      { label: "结束夜班", act: "end-night" }
    ]
  });
  state.dirty = true;
}

function endNight() {
  closeDialog();
  state.paused = true;
  if (state.night === 1) showNightBreak1();
  else if (state.night === 2) showNightBreak2();
  else if (state.endingId) showEnding(state.endingId);
  else openFinal();
}

function startNight(n) {
  closeDialog();
  state.night = n;
  state.clockMin = START_MIN;
  state.nightEnded = false;
  state.wrapShown = false;
  state.phase = "shift";
  state.paused = false;
  state.screen = "work";
  state.station = 1;
  state.logOpen = false;
  acc = 0;
  lastTs = 0;
  if (n === 2) {
    MAILS.forEach(function (m) {
      if ((m.night || 1) === 1 && state.arrived[m.id] && ms(m.id).status !== "done" && !m.anomaly) {
        ms(m.id).scanned = true;
        autoAssign(m.id);
        ms(m.id).status = "done";
      }
    });
    state.zhaoOpen = true;
    state.zhaoLines = [];
    pushZhao("昨晚系统稳定吧？习惯了就好。");
    toast("第二夜。赵所长没有提昨晚的事。");
    logAct("第二夜开始");
  } else if (n === 3) {
    state.zhaoOpen = false;
    state.zhaoLines = [];
    toast("第三夜。终端无例行通知，信道静默。");
    logAct("第三夜开始");
  }
  spawnByClock();
  fireEvents();
  showScreen();
  renderAll();
}

function showNightBreak1() {
  state.nightEnded = true;
  state.screen = "ending";
  var cancelled = state.night1ShenChoice === "cancel";
  var html = "<h2>第一夜</h2>";
  if (cancelled) {
    html += "<p>你回到宿舍。手机里那张老照片还在。</p><p>十岁，村口，土路尽头。旁边站着一个女人。</p>" +
      "<p>你认得这张脸。你想起来夜里在系统里点过一个名字——现在地址簿里已经查不到了。</p>" +
      "<p>确认了就不会再跳了。赵所长是这么说的。</p>";
  } else {
    html += "<p>你回到宿舍。翻出手机里存的那张老照片。</p><p>十岁那年在村口拍的。邻居秀兰姨站在你旁边。</p>" +
      "<p>照片里的女人，今天在退信上出现过。她的名字叫沈秀兰。</p>" +
      "<p>她在系统里还“活着”。</p><p>如果你点下确认注销，她就不在了。</p>";
  }
  html += "<p style='opacity:.7;margin-top:18px'>待核验记录：" + state.pendingCount +
    "　·　上一任：陈国栋 0821</p>" +
    "<p><button class='btn btn-pri' type='button' data-act='start-n2'>开始第二夜</button> " +
    "<button class='btn' type='button' data-act='review'>返回终端</button> " +
    "<button class='btn' type='button' data-act='restart'>重新开班</button></p>";
  document.getElementById("ending-copy").innerHTML = html;
  showScreen();
}

function showNightBreak2() {
  state.nightEnded = true;
  state.screen = "ending";
  var html = "<h2>第二夜</h2>";
  html += "<p>你回到住处，脑子翻来覆去是终端里那些碎片。陈国栋的档案备注写着“原登记名”——你记得在人员库瞥见过一个名字，陈思源，跟刘小梅、跟你，绑在同一个合并编码下。</p>";
  html += "<p>莲花村三组，吴桂芳。陈国栋、陈思源、吴桂芳，这三个人在你脑子里慢慢对上了号。</p>";
  html += "<p style='opacity:.9'>“原登记名”栏明明白白写着：陈思源，曾用名陈国栋。是他自己改的名。</p>";
  html += "<p>他来这个邮政所，是为了一条数据：他妈吴桂芳，二十年前就没人了，可户头上还吊着个“正常”。</p>";
  if (state.batchChoice === "batch") {
    html += "<p>今晚你点了批量注销。79条冲突记录被清掉了。</p>";
    html += "<p><button class='btn btn-pri' type='button' data-act='ending-A'>继续</button></p>";
  } else {
    html += "<p>你没有批量注销。系统把你的操作模式记了一笔。</p>";
    html += "<p><button class='btn btn-pri' type='button' data-act='start-n3'>开始第三夜</button> " +
      "<button class='btn' type='button' data-act='review'>返回终端</button></p>";
  }
  document.getElementById("ending-copy").innerHTML = html;
  showScreen();
}

function openDecision2() {
  var rows = CONFLICT79.map(function (r) {
    return "<tr><td>" + esc(r.name) + "</td><td>" + esc(r.addr) + "</td><td>" + esc(r.addrSt) + "</td><td>" + esc(r.personSt) + "</td></tr>";
  }).join("");
  openDialog({
    wide: true,
    title: "数据一致性异常",
    body: "<p>分拣网格中，青石村/莲花村所在格被高亮。</p>" +
      "<p>以下记录存在状态冲突：</p>" +
      "<table class='oa'><tr><th>姓名</th><th>地址</th><th>地址状态</th><th>人员状态</th></tr>" + rows +
      "<tr><td colspan='4'>……（共79条记录存在状态冲突）</td></tr></table>" +
      "<p>系统建议：批量注销地址状态异常记录，以恢复数据一致性。<br>预计影响：79条。</p>",
    buttons: [
      { label: "确认批量注销", act: "decision-batch", danger: true },
      { label: "逐条处理", act: "decision-one", pri: true },
      { label: "先看网格", act: "close" }
    ]
  });
}

function doBatchCancel() {
  state.batchChoice = "batch";
  CONFLICT79.forEach(function (r) { state.personMarks[r.id] = "cancelled"; });
  ["p-zgz", "p-zmg", "p-wen", "p-ccm", "p-lgq", "p-hsf"].forEach(function (id) {
    state.personMarks[id] = "cancelled";
  });
  state.pendingCount = 0;
  logAct("批量注销79条");
  toast("已执行批量注销。异常队列已清空。");
  closeDialog();
  showNightBreak2();
}

function doOneByOne() {
  state.batchChoice = "one";
  state.playerMarked = "watch";
  logAct("选择逐条处理");
  toast("系统将操作模式评定为偏离常规。个人记录开始出现异常标记。");
  closeDialog();
  showNightBreak2();
}

function openLog() {
  closeDialog();
  state.drawerUnlocked = true;
  state.logOpen = true;
  state.logRead[state.logPage] = true;
  switchStation(2);
  renderAll();
}

function logTurn(dir) {
  state.logPage = Math.max(0, Math.min(CHEN_LOG.length - 1, state.logPage + dir));
  state.logRead[state.logPage] = true;
  var n = 0;
  Object.keys(state.logRead).forEach(function () { n++; });
  if (n >= CHEN_LOG.length) {
    state.logFullyRead = true;
    if (!state.noteShown) {
      state.noteShown = true;
      openDialog({
        title: "夹页便条",
        body: "<p>最后一页夹着一张便条，钢笔写的，比日志里的字迹更潦草：</p><p>" + CHEN_NOTE + "</p>",
        buttons: [{ label: "收好便条", act: "close", pri: true }]
      });
    }
  }
  renderAll();
}

function runHistQuery() {
  var raw = (state.histDraft || "").replace(/\s/g, "");
  var up = raw.toUpperCase();
  if (/1998-?0?4-?12/.test(raw) || raw.indexOf("1998年4月12") >= 0) {
    state.query1998 = true;
    state.query1998Count += 1;
    state.histResult = "1998";
    state.viewed["op-1998"] = true;
    if (state.query1998Count >= 3) state.darkLineB = true;
    toast("已调出 1998-04-12 操作记录");
    logAct("查询1998-04-12", String(state.query1998Count));
  } else if (up === "BIND-1998-03" || up === "BIND199803") {
    state.darkLineADecoded = true;
    state.histResult = "bind";
    toast("涂鸦已解码");
    logAct("解码暗线A");
  } else if (up === "HIST-ARCHIVE") {
    state.viewed["hist-archive"] = true;
    state.histResult = "archive";
    toast("归档指令有效。最终抉择时可选用。");
  } else if (up === "FF-ARCHIVE") {
    state.viewed["ff-archive"] = true;
    state.histResult = "ff";
    toast(state.darkLineADecoded ? "保留地址 FF-ARCHIVE 存在。" : "无权限查看该地址空间。");
  } else if (raw === "吴桂芳" || up === "WGF") {
    state.wgfTimeline = true;
    state.histResult = "wgf";
    state.pushed.persons.push("p-wgf");
    toast("已加载吴桂芳关联时间线");
  } else {
    state.histResult = "miss";
    toast("无此操作记录，或权限不足");
  }
  renderAll();
}

function startZhaoChat() {
  state.zhaoOpen = true;
  state.zhaoChatStep = 0;
  state.zhaoLines = [
    { who: "zhao", text: "你昨晚查了1998年4月的操作记录，对吧。" }
  ];
  openDialog({
    title: "内部通讯",
    body: "<p>赵德明今晚没有下班。消息打到你的终端上。</p>",
    buttons: [{ label: "打开通讯窗口", act: "chat-silence", pri: true }]
  });
}

function chatAdvance(key) {
  closeDialog();
  state.zhaoOpen = true;
  if (key === "silence") {
    state.zhaoLines.push({ who: "lin", text: "……" });
    state.zhaoLines.push({ who: "zhao", text: "当年合并的事，轮不到我拿主意，上面怎么批我就怎么录。吴桂芳走的时候字还没签，人是后来没的，跟合并没关系。补偿款那是移民办按文件算的，我们所里只管送信，别的我什么都不知道。" });
    state.zhaoChatStep = 1;
  } else if (key === "pkg") {
    state.zhaoLines.push({ who: "lin", text: "你每年收到吴桂芳的包裹，你怎么解释？" });
    state.zhaoLines.push({ who: "zhao", text: "那包裹是国栋寄的。他在所里那几个月，没少折腾。他寄，我就收着，省得系统把那条底子清了。" });
    state.zhaoChatStep = 2;
  } else if (key === "why") {
    state.zhaoLines.push({ who: "lin", text: "那你当年为什么要合并数据？" });
    state.zhaoLines.push({ who: "zhao", text: "不并过去，莲花村整个户头就注销了。并到青石村，至少名册还在。我那时候就想着，好歹留个底。" });
    state.zhaoChatStep = 3;
    state.zhaoChatDone = true;
  } else if (key === "visit") {
    state.zhaoToldVisit = true;
    state.zhaoChatDone = true;
    state.zhaoLines.push({ who: "lin", text: "（把安检图像推过去）" });
    state.zhaoLines.push({ who: "zhao", text: "她走之前，来找过我。她让我帮她查一个文件。我没帮她。第二天她就失踪了。我以为她是自己走的。后来我才知道不是。" });
    toast("这段话不会写进系统记录。");
  }
  renderAll();
}

function showXrayToZhao() {
  state.xray2Viewed = true;
  if (!state.decisions["m-wgf2"]) {
    state.decisions["m-wgf2"] = "scan-bad";
    if (mail("m-wgf2")) ms("m-wgf2").status = "done";
  }
  chatAdvance("visit");
}

function openLinFile() {
  closeDialog();
  state.linFileViewed = true;
  state.bindViewed = true;
  state.selectedPersonId = "p-lin";
  state.viewed["p-lin"] = true;
  ["p-lxm", "p-csi", "p-ljg"].forEach(function (id) { state.pushed.persons.push(id); });
  switchStation(3);
  fireEvents();
}

function openFinal() {
  state.paused = true;
  var extra = "";
  if (state.darkLineADecoded) extra += "<p class='meta'>暗线已解码：重定向绑定可用。</p>";
  if (state.logFullyRead) extra += "<p class='meta'>后门归档指令 HIST-ARCHIVE 可用。</p>";
  openDialog({
    wide: true,
    title: "系统最终提示",
    body: "<p>检测到79条记录长期处于[待核验]状态。<br>" +
      "检测到3个操作员（赵德明、陈国栋、林远）与上述记录存在直接关联。<br>" +
      "检测到当前操作员[林远]自身记录存在状态异常（与刘小梅、陈思源共享合并编码）。</p>" +
      "<p>系统建议如下操作序列：<br>" +
      "步骤1：解除共享编码绑定（将林远、刘小梅、陈思源拆分为独立记录）<br>" +
      "步骤2：逐条确认79条待核验记录状态（注销或激活）<br>" +
      "步骤3：确认操作员陈国栋记录状态（当前为已注销，建议确认）<br>" +
      "步骤4：对当前操作员林远记录执行自我状态确认</p>" + extra,
    buttons: [
      { label: "执行全部建议", act: "final-all", danger: true },
      { label: "选择性执行", act: "final-some", pri: true },
      { label: "拒绝所有操作", act: "final-none" },
      { label: "稍后", act: "close" }
    ]
  });
}

function openFinalForm() {
  var splitOpts = "<label><input type='radio' name='f-split' value='none' checked> 不处理自己的绑定</label>" +
    "<label><input type='radio' name='f-split' value='split'> 解除绑定（拆分为独立记录）</label>";
  if (state.darkLineADecoded) {
    splitOpts += "<label><input type='radio' name='f-split' value='redirect'> 重定向至保留地址 FF-ARCHIVE</label>";
  }
  var recOpts = "<label><input type='radio' name='f-rec' value='mix' checked> 逐条：部分激活、部分注销（不处理自己）</label>";
  if (state.logFullyRead || state.viewed["hist-archive"]) {
    recOpts += "<label><input type='radio' name='f-rec' value='archive'> 使用后门：归档而非注销</label>";
  }
  recOpts += "<label><input type='radio' name='f-rec' value='batch'> 改为批量注销</label>";
  var wgfOpts = "<label><input type='radio' name='f-wgf' value='keep' checked> 不改吴桂芳（保持正常）</label>";
  if (state.logFullyRead) {
    wgfOpts += "<label><input type='radio' name='f-wgf' value='archive'> 将吴桂芳改为档案封存</label>";
  }
  wgfOpts += "<label><input type='radio' name='f-wgf' value='cancel'> 注销吴桂芳</label>";
  openDialog({
    wide: true,
    title: "选择性执行",
    body: "<div class='final-step'><b>步骤1 共享编码</b>" + splitOpts + "</div>" +
      "<div class='final-step'><b>步骤2 79条待核验</b>" + recOpts + "</div>" +
      "<div class='final-step'><b>步骤3 陈国栋</b>" +
      "<label><input type='radio' name='f-chen' value='confirm' checked> 确认已注销</label>" +
      "<label><input type='radio' name='f-chen' value='skip'> 不处理</label></div>" +
      "<div class='final-step'><b>步骤4 林远</b>" +
      "<label><input type='radio' name='f-self' value='skip' checked> 不处理自己</label>" +
      "<label><input type='radio' name='f-self' value='ok'> 自我状态确认（正常）</label></div>" +
      "<div class='final-step'><b>吴桂芳</b>" + wgfOpts + "</div>",
    buttons: [
      { label: "执行所选", act: "final-exec", pri: true },
      { label: "返回", act: "final-back" }
    ]
  });
}

function readFinalForm() {
  function val(name, fallback) {
    var el = document.querySelector("input[name='" + name + "']:checked");
    return el ? el.value : fallback;
  }
  return {
    split: val("f-split", "none"),
    rec: val("f-rec", "mix"),
    chen: val("f-chen", "confirm"),
    self: val("f-self", "skip"),
    wgf: val("f-wgf", "keep")
  };
}

function applyFinal(choice) {
  closeDialog();
  state.finalChoice = choice.kind;
  if (choice.kind === "all" || (choice.form && choice.form.rec === "batch")) {
    state.batchChoice = state.batchChoice || "batch";
    showEnding("A");
    return;
  }
  if (choice.kind === "none") {
    state.selfProcessed = false;
    showEnding("B");
    return;
  }
  var f = choice.form || {};
  state.splitMode = f.split;
  state.archiveUsed = f.rec === "archive";
  state.selfProcessed = f.self === "ok" || f.split === "split" || f.split === "redirect";
  state.wgfArchived = f.wgf === "archive";
  if (f.split === "redirect" && state.darkLineADecoded) {
    askRedirectAddress();
    return;
  }
  if (f.split === "split" && state.archiveUsed && state.logFullyRead && state.wgfArchived) {
    if (!state.zhaoToldVisit) {
      toast("赵德明还没把1998年全部说完。把第四件安检图像拿给他。");
      openFinalForm();
      return;
    }
    showEnding("C");
    return;
  }
  showEnding("B");
}

function askRedirectAddress() {
  openDialog({
    title: "缺少当前地址",
    body: "<p>操作确认。共享编码绑定已重定向至保留地址 [FF-ARCHIVE]。</p>" +
      "<p>检测到操作员当前投递地址为空。请录入有效行政区划地址以完成档案更新：</p>" +
      "<p>请在下面输入你的新地址：</p>" +
      "<p><input id='new-addr' style='width:100%;height:28px' maxlength='40' placeholder='任意地址'></p>",
    buttons: [{ label: "确认", act: "final-addr", pri: true }]
  });
}

function commitRedirect() {
  var el = document.getElementById("new-addr");
  state.newAddress = el && el.value ? el.value : "（未填写）";
  closeDialog();
  showEnding("D");
}

function showEnding(id) {
  state.endingId = id;
  state.nightEnded = true;
  state.paused = true;
  state.screen = "ending";
  var html = "";
  if (id === "A") {
    html = "<h2>结局A　干净的记录</h2>" +
      "<p>第三夜结束。系统安静了。退件框空了。再也没有退回信了，再也没有异常签收了。林远第一次值了一个“正常”的夜班——没有事发生，就是扫描，分拣，归档。</p>" +
      "<p>第二天早上，赵德明来交接。他在系统里看了一眼异常日志——空白。他说：“上手挺快。这周给你办转正。”</p>" +
      "<p>林远问：“青石村的记录呢？”</p>" +
      "<p>赵德明打开地址簿，输入“青石村”。系统返回：“未找到匹配结果。”</p>" +
      "<p>林远打开手机相册。老照片还在。照片里站在他旁边的女人，他认得她的样子，但他不记得她叫什么了。他想了想——可能从来就不认识吧。可能是小时候随便拍的。他把照片划掉了。</p>" +
      "<p>他成了系统的好操作员。以后每个夜班都是这样过的——没有异常。没有问题。</p>" +
      "<p>三年后，赵德明退休。林远接任所长。他在任上做了很多事——邮政业务数字化、快递进村。他被评为先进工作者。没有人知道他第一次值夜班时，系统里曾有一个叫沈秀兰的人。</p>";
  } else if (id === "B") {
    html = "<h2>结局B　模糊的边界</h2>" +
      "<p>林远花了三个夜班逐条处理记录。他看了每个人的档案——姓名、年龄、最后活跃日期。他根据自己的判断做了选择：有些人的记录他标记为“正常”（恢复可见），有些他确认注销（承认死亡）。</p>" +
      "<p>但他没有处理自己的记录。他没有解除和刘小梅、陈思源的共享绑定。</p>" +
      "<p>一周后，系统弹窗：检测到操作员林远的记录存在状态异常（共享绑定未解除），将其标记为“待核验”。</p>" +
      "<p>他有两个月。两个月内，他要么处理自己的数据（拆分绑定），要么系统替他处理（注销）。</p>" +
      "<p>他选择不处理。</p>" +
      "<p>两个月后，记录自动转为“已注销”。</p>" +
      "<p>林远从邮政系统里消失了。没有解聘通知，没有离职手续。他的工号变成了灰色——和周海一样。</p>" +
      "<p>但和别人不一样的是：他的数据没有被彻底清除。因为他的记录和另外两个人的绑在一起。系统无法单独注销他而不影响刘小梅和陈思源。他于是成为了系统里的一个“硬块”——不能被清理，不能正常运作，永远卡在“已注销（关联未解除）”状态。</p>" +
      "<p>这就是他的结局：他成为了系统无法消化的人。就像吴桂芳的数据一样。</p>";
  } else if (id === "C") {
    html = "<h2>结局C　继承者</h2>" +
      "<p>所有操作完成后，系统平静了三十秒。然后林远收到一条系统消息：</p>" +
      "<p>“检测到操作员 [林远] 已完成对本所全部异常记录的归档处理。<br>检测到前任所长 [赵德明] 工号存在历史操作异常。<br>系统判断：赵德明已不适合继续担任所长职务。<br>操作员林远已具备所长权限资格。</p>" +
      "<p>是否接受所长权限移交？[接受] [拒绝]”</p>" +
      "<p>林远选择了[接受]。</p>" +
      "<p>赵德明的工号状态由“正常”变为“已注销（权限移交）”。系统没有询问赵德明的意见。</p>" +
      "<p>林远的工号从“操作员”升级为“所长”。</p>" +
      "<p>第二天早上，他打开所长办公室的门。赵德明的桌子上放着半杯凉茶和一副老花镜。人已经不在了——没有人知道他去了哪里。系统记录里，赵德明的最后操作是“权限移交确认”——但他本人从未在键盘上点过确认。</p>" +
      "<p>邮政所照常开门。林远作为新任所长，开始处理白天的业务。乡镇上的居民来寄信、取快递。没有人知道昨晚发生了什么。</p>" +
      "<p>林远打开系统，查了一下吴桂芳的记录。状态是“档案封存”。他查了一下沈秀兰——状态是“归档”。</p>" +
      "<p>他突然想到一件事：系统里有没有关于他的记录？他查了一下自己的名字。</p>" +
      "<p>系统返回：</p>" +
      "<p>林远，男，38岁，现任本所所长。状态：正常。<br>备注：此人于1998年4月12日行政区划调整被纳入青石村-莲花村合并编码。2026年由本人执行绑定解除。历史关联记录：（空）。</p>" +
      "<p>“历史关联记录：（空）”。他不记得沈秀兰了。他不记得自己曾经和另外两个人的数据绑在一起。他不记得自己小时候住过青石村。</p>" +
      "<p>他知道自己刚接任了所长。他知道自己前一份工作是夜班分拣员。但他想不起来为什么要来邮政所工作，也想不起来那三夜发生了什么——他能看到操作日志里有几十条操作记录，上面全是他的名字，但他不记得做过那些事。</p>" +
      "<p>他拿起手机。相册里有一张老照片——村口土路尽头，十岁的小男孩旁边站着一个女人。他不认识照片里的女人是谁。</p>" +
      "<p>他的手指停在删除键上。</p>" +
      "<p><button class='btn btn-danger' type='button' data-act='del-photo'>删除照片</button> " +
      "<button class='btn' type='button' data-act='keep-photo'>不删</button></p>";
  } else if (id === "D") {
    html = "<h2>结局D　第三个孩子</h2>" +
      "<p>操作确认。共享编码绑定已重定向至保留地址 [FF-ARCHIVE]。<br>受影响记录：3条。<br>当前状态：封存。<br>注意：封存记录不可被检索、不可被修改、不可被注销。<br>这些记录将在系统终止运行前持续存在。</p>" +
      "<p>然后是第二条消息：</p>" +
      "<p>绑定重定向完成。操作员 [林远] 及关联记录 [陈思源]、[刘小梅] 已转入保留分区 [FF-ARCHIVE]。<br>记录属性：永久封存（不可检索、不可覆盖、不可注销）。</p>" +
      "<p>检测到操作员当前投递地址为空。</p>" +
      "<p>档案更新完成。当前投递地址：[" + esc(state.newAddress) + "]。<br>原关联地址 [青石村三组（旧）] 已解除绑定。新地址：[" + esc(state.newAddress) + "]的林远。</p>" +
      "<p>封存记录随系统存续保留，直至系统终止运行。</p>" +
      "";
  }
  if (id !== "C") {
    html += "<p style='margin-top:18px'><button class='btn' type='button' data-act='restart'>重新开班</button></p>";
  }
  document.getElementById("ending-copy").innerHTML = html;
  showScreen();
}

function finishEndingC(del) {
  state.photoDeleted = del;
  var html = document.getElementById("ending-copy").innerHTML;
  html = html.replace(/<p><button class='btn btn-danger'[\s\S]*?<\/p>/, "");
  html += del
    ? "<p>照片没了。屏幕暗了一下。游戏结束。</p>"
    : "<p>照片还在。他仍不认识上面的人。游戏结束。</p>";
  html += "<p style='margin-top:18px'><button class='btn' type='button' data-act='restart'>重新开班</button></p>";
  document.getElementById("ending-copy").innerHTML = html;
}

function reviewDesk() {
  state.screen = "work";
  state.paused = true;
  showScreen();
  renderAll();
}

function restart() {
  var fresh = createState();
  Object.keys(state).forEach(function (k) { delete state[k]; });
  Object.assign(state, fresh);
  lastTs = 0; acc = 0;
  state.screen = "login";
  showScreen();
}

function flushTutorial() {
  if (state.tutorialDone) return;
  MAILS.forEach(function (m) {
    if (!m.tutorial || ms(m.id).status === "done") return;
    ms(m.id).scanned = true;
    autoAssign(m.id);
    ms(m.id).status = "done";
    logAct("培训件按规程处理", m.id);
  });
  maybeFinishTutorial();
  state.dirty = true;
  renderAll();
}

/* ========== RENDER ========== */
function showScreen() {
  document.getElementById("boot").classList.toggle("hidden", state.screen !== "boot");
  document.getElementById("login").classList.toggle("hidden", state.screen !== "login");
  document.getElementById("desk").classList.toggle("hidden", state.screen !== "work");
  document.getElementById("ending").classList.toggle("hidden", state.screen !== "ending");
}

function updateChrome() {
  if (state.screen !== "work") return;
  document.getElementById("clock-time").textContent = fmtClock(state.clockMin);
  document.getElementById("clock-date").textContent = ({ 1: "08-20", 2: "08-21", 3: "08-22" })[state.night] || "08-20";
  document.getElementById("night-chip").textContent = "第" + state.night + "夜";
  document.getElementById("pending-n").textContent = String(state.pendingCount);
  var pc = document.getElementById("pending-chip");
  pc.className = "chip" + (state.pendingCount >= 5 ? " hot" : state.pendingCount > 0 ? " warn" : "");
  document.getElementById("btn-pause").textContent = state.paused ? "继续" : "暂停";
  document.querySelectorAll("[data-act=speed]").forEach(function (b) {
    b.classList.toggle("on", +b.getAttribute("data-v") === state.speed);
  });
  document.getElementById("sb-q").textContent = String(queueMails().length);
  document.getElementById("sb-done").textContent = String(arrivedMails().filter(function (m) { return ms(m.id).status === "done"; }).length);
  var phaseMsg = ({
    tutorial: "培训中 · 赵德明在线",
    shift: "第" + state.night + "夜进行中",
    wrap: "第一夜收束",
    ended: "夜班结束"
  })[state.phase];
  if (state.night === 2 && state.phase === "shift") phaseMsg = "第二夜 · 系统在拼字";
  if (state.night === 3 && state.phase === "shift") phaseMsg = "第三夜 · 收束";
  document.getElementById("sb-msg").textContent = phaseMsg || "夜班扫描台就绪";
}

function renderTabs() {
  document.getElementById("tabs").innerHTML = STATIONS.map(function (s) {
    var b = state.tabBadges[s.id] || 0;
    return '<button type="button" class="tab' + (state.station === s.id ? " on" : "") +
      (b && s.id !== state.station ? " blink" : "") + '" data-act="tab" data-id="' + s.id + '">' +
      s.id + " " + esc(s.name) + (b && s.id !== state.station ? '<span class="badge">' + b + "</span>" : "") + "</button>";
  }).join("");
}

function switchStation(n) {
  state.station = +n;
  state.tabBadges[n] = 0;
  document.querySelectorAll(".station").forEach(function (el, i) {
    el.classList.toggle("on", i + 1 === state.station);
  });
  renderTabs();
  renderStation();
}

function renderAll() {
  if (state.screen !== "work") return;
  renderTabs();
  renderStation();
  renderZhao();
  updateChrome();
  state.dirty = false;
}

function renderZhao() {
  var z = document.getElementById("zhao");
  if (!state.zhaoOpen || !state.zhaoLines.length) { z.classList.add("hidden"); return; }
  z.classList.remove("hidden");
  var html = state.zhaoLines.map(function (t) {
    if (typeof t === "string") return "<p>" + esc(t) + "</p>";
    return '<p class="im-line' + (t.who === "lin" ? " me" : "") + '">' +
      (t.who === "lin" ? "林远：" : "赵：") + esc(t.text) + "</p>";
  }).join("");
  if (state.night === 3 && state.zhaoChatStep === 0) {
    html += '<p><button class="btn" data-act="chat-silence">……</button></p>';
  } else if (state.zhaoChatStep === 1) {
    html += '<p><button class="btn" data-act="chat-pkg">你每年收到吴桂芳的包裹，你怎么解释？</button></p>';
  } else if (state.zhaoChatStep === 2) {
    html += '<p><button class="btn" data-act="chat-why">那你当年为什么要合并数据？</button></p>';
  } else if (state.zhaoChatStep >= 3 && state.xray2Viewed && !state.zhaoToldVisit) {
    html += '<p><button class="btn btn-warn" data-act="show-xray-zhao">把安检图像推给他</button></p>';
  }
  document.getElementById("zhao-body").innerHTML = html;
}

function renderStation() {
  var fn = [null, renderSt1, renderSt2, renderSt3, renderSt4, renderSt5, renderSt6][state.station];
  if (fn) fn();
}

function lampFor(m) {
  if (!ms(m.id).scanned) return { cls: "off", t: "未扫描" };
  var st = villageStatus(m.village);
  if (m.anomaly && m.anomaly.type === "xray-shadow") return { cls: "warn", t: "安检异常" };
  if (st === "cancelled" || st === "merged" || m.type === "return") return { cls: "bad", t: "地址异常" };
  return { cls: "ok", t: "验证通过" };
}

function renderSt1() {
  var list = arrivedMails().slice().sort(function (a, b) {
    var oa = { inbox: 0, scanned: 1, sorting: 2, done: 3 }[ms(a.id).status];
    var ob = { inbox: 0, scanned: 1, sorting: 2, done: 3 }[ms(b.id).status];
    return oa - ob;
  });
  if (!state.selectedMailId && list[0]) state.selectedMailId = list[0].id;
  var m = mail(state.selectedMailId);
  var left = list.map(function (x) {
    var st = ms(x.id);
    var cls = "list-item" + (x.id === state.selectedMailId ? " on" : "") + (st.status === "done" ? " done" : "") +
      (x.anomaly && x.type === "return" ? " anomaly" : "") + (x.xray ? " danger" : "") +
      (x.id === "m-lin" && st.status !== "done" ? " blink-row" : "");
    var dcls = x.anomaly ? "y" : st.status === "done" ? "g" : "ok" === lampFor(x).cls ? "" : "";
    if (x.anomaly) dcls = "y";
    if (x.xray) dcls = "r";
    if (!x.anomaly && !x.xray) dcls = st.status === "done" ? "g" : "";
    return '<div class="' + cls + (state.guide && x.id === "t01" && state.guide === "select" ? " guide" : "") +
      '" data-act="sel-mail" data-id="' + x.id + '"><div class="dot ' + dcls + '"></div><div><b>' +
      esc(x.receiver) + "</b><div class=\"meta\">" + esc(x.barcode) + " · " + esc(x.type === "return" ? "退件" : x.type === "package" ? "包裹" : "平信") +
      (x.arriveAt ? " · " + x.arriveAt : " · 培训") + "</div></div><div class=\"meta\">" + esc(statusCn(st.status)) + "</div></div>";
  }).join("") || '<div class="hint">队列空</div>';

  var mid = "<div class='hd'>邮件详情</div><div class='detail'>";
  if (!m) mid += "<p class='meta'>选择左侧邮件</p>";
  else {
    var L = lampFor(m);
    var addrCls = (m.type === "return" || villageStatus(m.village) !== "active") ? "field-warn" : "";
    var rec = person(m.receiverId);
    mid += '<div class="scanbed' + (state.scanning ? " scanning" : "") + '"><div class="barcode"></div><div class="scanline"></div></div>';
    mid += '<div><span class="lamp ' + L.cls + '"></span>' + L.t + "</div>";
    mid += '<div class="kv"><b>条码</b><span>' + esc(m.barcode) + "</span>";
    mid += "<b>类型</b><span>" + esc(typeCn(m.type)) + "</span>";
    mid += "<b>寄件人</b><span>" + esc(m.sender) + (m.senderId ? ' <button class="btn" data-act="open-person" data-id="' + m.senderId + '">档案</button>' : "") + "</span>";
    if (m.acroChar) {
      mid += "<b>寄件地址</b><span><span class='acro-hi'>" + esc(m.acroChar) + "</span>" + esc((m.senderAddr || "").slice(1)) + "</span>";
    } else {
      mid += "<b>寄件地址</b><span class='" + (m.senderId === "p-wgf" ? "field-warn" : "") + "'>" + esc(m.senderAddr) + (m.senderId === "p-wgf" ? " ⚠" : "") + "</span>";
    }
    mid += "<b>收件人</b><span>" + esc(m.receiver) + (m.receiverId ? ' <button class="btn" data-act="open-person" data-id="' + m.receiverId + '">档案</button>' : "") + "</span>";
    mid += "<b>收件地址</b><span class='" + addrCls + "'>" + esc(m.receiverAddr) + (addrCls ? " ⚠" : "") + "</span>";
    mid += "<b>重量</b><span>" + esc(m.weight) + "</span>";
    if (m.note) mid += "<b>备注</b><span>" + esc(m.note) + "</span>";
    if (m.returnReason) mid += "<b>退件原因</b><span class='field-warn'>" + esc(m.returnReason) + "</span>";
    if (m.xray === "two") {
      mid += "</div><div class='xray two'><img src='" + IMG_XRAY2 + "' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover'><div class='noise'></div><div class='cap' style='position:absolute;bottom:4px;left:6px;color:#8f8;font-size:10px;z-index:2'>XRAY · 空包裹 · 两影</div></div><div class='kv'>";
    } else if (m.xray) {
      mid += "</div><div class='xray' class='xray'><img src='" + IMG_XRAY1 + "' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover'><div class='cap' style='position:absolute;bottom:4px;left:6px;color:#8f8;font-size:10px;z-index:2'>XRAY · 衣物 · 低分辨率</div></div><div class='kv'>";
    }
    if (rec && state.personMarks[rec.id] === "cancelled") mid += "<b>人员</b><span class='field-dead'>" + esc(rec.name) + " 已注销</span>";
    if (rec && state.personMarks[rec.id] === "pending") mid += "<b>人员</b><span class='field-warn'>" + esc(rec.name) + " 待核验</span>";
    mid += "</div>";
    if (m.village === "v-qingshi" || m.village === "v-lianhua") {
      mid += '<p class="meta"><button class="btn" data-act="open-vill" data-id="' + m.village + '">打开地址簿中的该行政区划</button></p>';
    }
    if (m.senderId === "p-wgf") {
      mid += '<p class="meta"><button class="btn" data-act="open-person" data-id="p-zhao">查看赵德明收件记录</button></p>';
      if (m.xray === "two") mid += '<p class="meta"><button class="btn btn-warn" data-act="show-xray-zhao">把安检图像推给赵德明</button></p>';
    }
  }
  mid += "</div>";

  var canScan = m && !ms(m.id).scanned && ms(m.id).status !== "done";
  var canOk = m && ms(m.id).scanned && ms(m.id).status !== "done" && !m.anomaly;
  var canDec = m && ms(m.id).scanned && ms(m.id).status !== "done" && m.anomaly;
  var right = "<div class='hd'>操作</div><div class='actions'>";
  right += '<button class="btn btn-pri' + (state.guide === "scan" || state.guide === "select" ? " guide" : "") + '" data-act="scan"' + (canScan ? "" : " disabled") + ">扫描条码</button>";
  right += '<button class="btn' + (state.guide === "confirm" ? " guide" : "") + '" data-act="confirm-mail"' + (canOk ? "" : " disabled") + ">确认处理</button>";
  if (canDec && m.type === "return") {
    right += '<button class="btn btn-danger" data-act="decide-cancel" data-id="' + m.id + '">确认注销</button>';
    right += '<button class="btn btn-warn" data-act="decide-pend" data-id="' + m.id + '">标记待核验</button>';
  }
  if (canDec && m.xray) {
    right += '<button class="btn btn-warn" data-act="decide-scan-bad" data-id="' + m.id + '">标记异常</button>';
    right += '<button class="btn" data-act="decide-scan-ok" data-id="' + m.id + '">正常放行</button>';
  }
  if (!state.tutorialDone && state.tutorialProcessed >= 2) {
    right += '<button class="btn btn-ghost" data-act="flush-tut">余下培训件按规程处理</button>';
  }
  right += "</div><div class='hint'>夜班终端无检索框。关联记录由系统推送，或从字段进入。</div>";

  document.getElementById("st1").innerHTML = '<div class="hd">扫描队列' +
    (!state.tutorialDone ? "　培训 " + state.tutorialProcessed + "/" + TUTORIAL_NEED : "　" + queueMails().length + " 待处理") +
    '</div><div class="split"><div class="col col-l">' +
    left + '</div><div class="col col-m">' + mid + '</div><div class="col col-r">' + right + "</div></div>";
}

function renderSt2() {
  var pending = arrivedMails().filter(function (m) { return ms(m.id).status !== "waiting" && ms(m.id).status !== "inbox"; });
  var cells = [
    ["v-beiling", "北岭村"],
    ["v-res", "水库"],
    ["v-donghe", "东河村"],
    ["v-xigang", "西岗村"],
    ["v-qingshi", "青石 / 莲花"],
    ["v-nanwan", "南湾村"],
    ["v-center", "中心街"],
    ["v-gov", "镇政府"],
    ["v-po", "邮政所"]
  ];
  var assigned = Object.keys(state.assignments).length;
  var total = Math.max(assigned, pending.length, 1);
  var hotGrid = state.eventsFired["DECISION-002"] || (state.night === 2 && state.clockMin >= timeToMin("01:00"));
  var map = '<div class="map">' + cells.map(function (c) {
    var v = village(c[0] === "v-qingshi" ? "v-qingshi" : c[0]);
    var dead = v && (v.status === "cancelled" || v.status === "merged" || c[0] === "v-res");
    var hot = dead && (state.pendingCount > 0 || hotGrid) && (c[0] === "v-qingshi");
    var who = "";
    if (c[0] === "v-qingshi") who = "工号 0947 周海（路线未删）";
    else if (COURIER_MAP[c[0]]) {
      var cr = person(COURIER_MAP[c[0]]);
      who = cr ? cr.name + " " + cr.jobNo : "";
    }
    return '<div class="cell' + (dead ? " dead" : "") + (hot ? " hot" : "") + '" data-act="open-vill" data-id="' +
      (c[0] === "v-qingshi" ? "v-qingshi" : c[0]) + '"><b>' + esc(c[1]) + '</b><div class="tag">' +
      (dead ? (v && v.note ? v.note : "已撤销") : who) + "</div></div>";
  }).join("") + "</div>";
  var left = pending.map(function (m) {
    var asg = state.assignments[m.id];
    var cr = asg ? person(asg) : null;
    return '<div class="list-item' + (m.anomaly ? " anomaly" : "") + '" data-act="sel-mail" data-id="' + m.id +
      '"><div class="dot"></div><div><b>' + esc(m.receiver) + "</b><div class=\"meta\">" +
      (cr ? esc(cr.name) : "未分配") + " · " + esc(m.receiverAddr) + "</div></div></div>";
  }).join("") || '<div class="hint">暂无已扫邮件</div>';
  var right = "<div class='hd'>已分配</div>" + Object.keys(state.assignments).map(function (id) {
    var m = mail(id); var cr = person(state.assignments[id]);
    if (!m) return "";
    return '<div class="list-item"><div class="dot"></div><div><b>' + esc(m.barcode.slice(-4)) + "</b><div class=\"meta\">" +
      esc(m.receiver) + " → " + esc(cr ? cr.name : "") + "</div></div></div>";
  }).join("");
  var drawer = "";
  if (state.eventsFired["DECISION-002"] && !state.batchChoice) {
    drawer += '<div class="oa-foot alert"><b>数据一致性异常 · 79条</b> 青石/莲花网格闪烁。<br>' +
      '<button class="btn btn-danger" data-act="decision-batch">确认批量注销</button> ' +
      '<button class="btn btn-pri" data-act="decision-one">逐条处理</button></div>';
  }
  if (state.drawerUnlocked || (state.night >= 2 && state.clockMin >= timeToMin("21:30"))) {
    drawer += '<button type="button" class="drawer-btn' + (state.logFullyRead ? "" : " hot") + '" data-act="log-open">工作台抽屉　' +
      (state.logOpen ? "值班日志（展开）" : "一本没有归档的值班日志") + "</button>";
  }
  if (state.logOpen) {
    var pg = CHEN_LOG[state.logPage];
    drawer += '<div class="log-book"><h3>值班日志 · ' + esc(pg.date) + "　" + (state.logPage + 1) + "/" + CHEN_LOG.length +
      "</h3><img src='" + IMG_LOGBOOK + "' style='width:100%;max-height:130px;object-fit:cover;opacity:.5;margin:0 0 8px;filter:sepia(.3)'><p>" + pg.body + "</p>";
    if (state.logPage === CHEN_LOG.length - 1) {
      drawer += '<div class="graffiti" title="几乎不可读的涂鸦"><span class="dim">///</span>B<span class="dim">?</span>IND<span class="dim">/</span>-1998<span class="dim">..</span>-03<span class="dim">///</span><br>' +
        '<span class="dim">C:\\ADDR\\HIST　</span>操作码</div>' +
        '<p class="meta"><button class="btn" data-act="goto-hist">到地址簿按操作码回放</button></p>';
    }
    drawer += '<div class="log-nav"><button class="btn" data-act="log-prev"' + (state.logPage === 0 ? " disabled" : "") +
      ">上一页</button><span class='meta'>铅笔字，像技术文档</span><button class='btn' data-act='log-next'" +
      (state.logPage === CHEN_LOG.length - 1 ? " disabled" : "") + ">下一页</button></div></div>";
  }
  document.getElementById("st2").innerHTML = '<div class="hd">待分拣 / 投递网格</div>' + drawer + '<div class="split"><div class="col col-l">' +
    left + '</div><div class="col col-m"><div class="prog"><i style="width:' + Math.round(assigned / total * 100) +
    '%"></i></div>' + map + '</div><div class="col col-r">' + right + "</div></div>";
}

function renderSt3() {
  var dow = ["日", "一", "二", "三", "四", "五", "六"];
  var cells = "";
  dow.forEach(function (d) { cells += '<span class="dow">' + d + "</span>"; });
  var first = new Date(2026, 7, 1).getDay();
  for (var i = 0; i < first; i++) cells += '<span class="mute"></span>';
  for (var d = 1; d <= 31; d++) {
    cells += '<span class="' + (d === 19 + state.night ? "today" : "") + '">' + d + (d === 19 + state.night ? " 夜" : "") + "</span>";
  }
  var people = PERSONS.filter(function (p) {
    return p.role === "邮递员" || p.role === "所长" || p.role === "操作员" || state.pushed.persons.indexOf(p.id) >= 0;
  });
  var cards = people.map(function (p) {
    var dead = markedDead(p);
    var on = state.selectedPersonId === p.id;
    return '<div class="card' + (dead ? " dead" : "") + (state.personMarks[p.id] === "pending" ? " pend" : "") + (on ? " on" : "") + '" data-act="open-person" data-id="' + p.id +
      '"><div class="photo" style="' + photoStyle(p.id) + '"></div><div><div class="nm"><b>' + esc(p.name) + "</b> " +
      (p.jobNo ? esc(p.jobNo) : "") +     (p.status === "deceased" ? '<span class="stamp">殉职</span>' : "") +
      (p.status === "cancelled" || state.personMarks[p.id] === "cancelled" ? '<span class="stamp">已注销</span>' : "") +
      (state.personMarks[p.id] === "pending" ? '<span class="stamp">待核验</span>' : "") +
      "</div><div class=\"meta\">" + esc(p.role) + (p.route ? " · " + esc(p.route) : "") + "</div>" +
      "<div class=\"meta\">" + statusLabel(p) + "</div></div></div>";
  }).join("");
  var detail = personDetail(state.selectedPersonId);
  document.getElementById("st3").innerHTML = '<div class="hd">2026年8月排班</div><div class="cal">' + cells +
    '</div><div class="hd">人员花名册</div><div class="roster">' + cards + "</div><div class='detail'>" + detail + "</div>";
}

function statusLabel(p) {
  var mk = state.personMarks[p.id];
  if (mk === "pending") return "待核验";
  if (mk === "cancelled") return "已注销";
  if (p.status === "active") return "在岗 / 正常";
  if (p.status === "deceased") return "已注销（因公殉职）";
  if (p.status === "cancelled") return "已注销";
  if (p.status === "missing") return "失踪";
  return p.status;
}
function markedDead(p) {
  return p.status === "deceased" || p.status === "cancelled" || state.personMarks[p.id] === "cancelled";
}

function personDetail(id) {
  var p = person(id);
  if (!p) return "<p class='meta'>从推送记录或邮件字段进入档案。夜班无检索。</p>";
  var v = village(p.village);
  var html = '<div class="kv"><b>姓名</b><span>' + esc(p.name) + "</span><b>工号</b><span>" + esc(p.jobNo || "—") +
    "</span><b>身份</b><span>" + esc(p.role) + "</span><b>状态</b><span class='" +
    (markedDead(p) ? "field-dead" : state.personMarks[p.id] === "pending" ? "field-warn" : "") +
    "'>" + esc(statusLabel(p)) + "</span><b>地址</b><span>" + esc(v ? v.name : "") + (p.group ? p.group : "") + "</span>";
  if (p.route) html += "<b>邮路</b><span>" + esc(p.route) + (p.id === "p-zhou" ? "　系统从未删除此路线" : "") + "</span>";
  if (p.died) html += "<b>殉职</b><span class='flicker'>" + esc(p.died) + "</span>";
  if (p.cancelledAt) html += "<b>注销时间</b><span>" + esc(p.cancelledAt) + "</span><b>操作人</b><span class='field-warn'>" +
    (p.cancelledBy === "" ? "（空）" : esc(p.cancelledBy)) + "</span>";
  if (p.note) html += "<b>备注</b><span>" + esc(p.note) + "</span></div>";
  else html += "</div>";
  if (p.id === "p-zhao") {
    html += "<p><b>收件记录（系统推送）</b></p><table class='oa'><tr><th>年份</th><th>寄件人</th><th>处理</th></tr>" +
      ZHAO_MAIL.map(function (r) {
        return "<tr><td>" + r.year + "</td><td>吴桂芳 · 莲花村三组</td><td>" + r.note + "</td></tr>";
      }).join("") + "</table><p class='meta'>过去三年，每年一封。均由赵德明标记已签收-本人。</p>";
  }
  if (p.id === "p-wgf") {
    html += "<p class='meta'>莲花村与青石村在同一行政编码下，状态同为已撤销（1998年因水库建设）。该人状态仍为正常。</p>";
    if (state.wgfTimeline || state.query1998) {
      html += "<p><b>关联时间线</b></p><ul>" + WGF_TL.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    }
  }
  if (p.id === "p-zhou") {
    html += "<p class='meta'>点击回执可核对签收图像。青石线在水库建成后理论上已无居民。</p>";
  }
  if (p.id === "p-lin" || (p.relationCodes && p.relationCodes.indexOf("BIND-1998-03") >= 0 && (state.bindViewed || state.night >= 3))) {
    html += "<p class='field-warn'><b>关联历史地址</b>：青石村三组（搬迁前）<br>备注：1998年4月12日行政区划调整中，此人与以下记录共享合并编码 BIND-1998-03：</p>" +
      "<p>刘小梅（女，1998年时6岁）　林远（男，1998年时10岁）　陈思源（男，1998年时8岁；陈国栋原登记名）</p>" +
      '<p><button class="btn" data-act="open-person" data-id="p-lxm">刘小梅</button> ' +
      '<button class="btn" data-act="open-person" data-id="p-csi">陈思源</button> ' +
      '<button class="btn" data-act="open-person" data-id="p-lin">林远</button></p>';
  }
  if (state.darkLineADecoded && (p.id === "p-lin" || p.id === "p-csi" || p.id === "p-lxm")) {
    html += "<p class='meta'>解码记录：注销前陈国栋改过三个孩子的共享编码绑定。系统会在他注销后自动恢复默认绑定。只有当前操作员手动确认拆分才有效。</p>";
  }
  if (state.wrapShown && state.night === 1) {
    html += '<p><button class="btn btn-pri" data-act="end-night">结束夜班</button> <button class="btn" data-act="goto-wrap5">返回退件收束</button></p>';
  }
  return html;
}

function renderSt4() {
  function lines(parent, depth) {
    return VILLAGES.filter(function (v) { return v.parent === parent; }).map(function (v) {
      var kids = VILLAGES.some(function (k) { return k.parent === v.id; });
      var open = state.treeOpen[v.id];
      var cls = "tree-line" + (state.selectedVillageId === v.id ? " on" : "") +
        (v.status === "cancelled" || v.status === "merged" ? " rev" : "") +
        (v.id === "v-qingshi" && state.pendingCount ? " pend" : "");
      var mark = kids ? (open ? "[-]" : "[+]") : " · ";
      var extra = "";
      if (v.status === "cancelled") extra = "  *REVOKED-1998*";
      if (v.status === "merged") extra = "  *MERGED*";
      if (v.id === "v-qingshi" && state.pendingCount) extra += "  待核验扩散";
      var s = '<div class="' + cls + '" data-act="tree" data-id="' + v.id + '">' +
        " ".repeat(depth * 2) + mark + " " + v.code + " " + v.name + extra + "</div>";
      if (open && v.groups) {
        v.groups.forEach(function (g) {
          s += '<div class="tree-line" data-act="tree-sel" data-id="' + v.id + '">' +
            " ".repeat((depth + 1) * 2) + "· " + g + "</div>";
        });
      }
      if (open) s += lines(v.id, depth + 1);
      return s;
    }).join("");
  }
  var v = village(state.selectedVillageId);
  var right = "<div class='hd'>记录</div><div class='crt'>";
  if (v) {
    right += "NAME=" + esc(v.name) + "\nCODE=" + esc(v.code) + "\nSTATUS=" + esc(v.status).toUpperCase() + "\n";
    if (v.note) right += "<span style='color:#ffff00'>" + esc(v.note) + "</span>\n";
    if (v.activeCount != null) right += "ACTIVE_PERSONS=" + v.activeCount + "\n";
    if (v.id === "v-qingshi") {
      right += "\n<span style='color:#ff6b6b'>警告：该村仍有 34 条活跃人员记录。</span>\n";
      PERSONS.filter(function (p) { return p.village === "v-qingshi"; }).forEach(function (p) {
        var c = state.personMarks[p.id] === "pending" ? "pend" : (markedDead(p) ? "rev" : "");
        right += '<div class="tree-line ' + c + '" data-act="open-person" data-id="' + p.id + '">  ' +
          p.name + "  " + (p.group || "") + "  " + statusLabel(p) + "</div>";
      });
      right += "\n其余记录已折叠（系统显示合计 34）。";
    }
    if (v.id === "v-lianhua") {
      PERSONS.filter(function (p) { return p.village === "v-lianhua" && (p.id === "p-wgf" || state.pushed.persons.indexOf(p.id) >= 0); }).forEach(function (p) {
        right += '<div class="tree-line" data-act="open-person" data-id="' + p.id + '">  ' + p.name + "  " + statusLabel(p) + "</div>";
      });
    }
    if (state.histResult === "1998" || (state.query1998 && v.id === "v-qingshi")) {
      right += "\n<span style='color:#ffff00'>--- HIST 1998-04-12 ---</span>\n<div class='op-rec'>" + esc(OP_1998).replace("（空白——没有批文号，没有上级指令编号）", "<span class='blank'>（空白——没有批文号，没有上级指令编号）</span>") + "</div><img src='" + IMG_ARCHIVE + "' style='width:100%;max-height:130px;object-fit:cover;opacity:.72;filter:sepia(.25);margin-top:5px;border:1px solid #145014'>";
      if (state.darkLineB) {
        right += "\n<span style='color:#ffff00'>操作备注（隐藏字段）：合并操作经县移民办张主任口头批准。张主任现已不在本系统辖区内。无法调取其操作记录。</span>\n";
      }
    }
    if (state.histResult === "bind") {
      right += "\n<span style='color:#ffff00'>DECODE BIND-1998-03</span>\n注销前我改了三个孩子的共享编码绑定——我把他们的关联拆开了。但系统会在我注销后自动恢复默认绑定。只有当前操作员手动确认拆分才有效。如果你看到这个——你是林远还是刘小梅？或者你谁也不是？\n";
    }
    if (state.histResult === "archive") {
      right += "\n归档指令 HIST-ARCHIVE 有效。最终序列可写入归档而非注销。\n";
    }
    if (state.histResult === "ff") {
      right += "\nFF-ARCHIVE 保留地址空间。封存记录不可检索、不可修改、不可注销。\n";
    }
    if (state.histResult === "wgf" || state.wgfTimeline) {
      right += "\n--- 吴桂芳 ---\n" + WGF_TL.map(function (t) { return esc(t); }).join("\n") + "\n";
    }
  }
  right += "<span class='cursor'></span></div>";
  if (state.night >= 2 && (state.drawerUnlocked || state.eventsFired["QUERY-HINT"] || state.logFullyRead)) {
    right += "<div class='crt-q'><input id='hist-q' maxlength='24' placeholder='日期或操作码，例 1998-04-12' value='" +
      esc(state.histDraft) + "'><button type='button' data-act='hist-go'>回放</button></div>";
  }
  right += "<div class='crt-stat'>C:\\ADDR\\GRID.DAT　" +
    (state.night >= 2 && (state.drawerUnlocked || state.eventsFired["QUERY-HINT"]) ? "历史回放已开通　无全文检索" : "只读浏览　夜班查询权限未开通") +
    "</div>";
  document.getElementById("st4").innerHTML = '<div class="split"><div class="col col-l"><div class="hd">MS-DOS  ADDR.GRID  4.02</div><div class="crt">' +
    lines(null, 0) + '</div></div><div class="col col-m">' + right + "</div></div>";
}

function renderSt5() {
  var rows = arrivedMails().filter(function (m) { return m.type === "return" || state.decisions[m.id]; });
  var body = rows.map(function (m) {
    var dec = state.decisions[m.id];
    var cls = (state.selectedMailId === m.id ? " on" : "") + (dec === "pending" ? " pend" : "") + (dec === "cancel" ? " dead" : "");
    return "<tr class='" + cls + "' data-act='sel-mail' data-id='" + m.id + "'><td>" + esc(m.barcode) + "</td><td>" +
      esc(m.receiver) + "</td><td>" + esc(m.receiverAddr) + "</td><td>" + esc(m.returnReason || "—") + "</td><td>" +
      (dec === "pending" ? "待核验" : dec === "cancel" ? "已注销" : ms(m.id).scanned ? "待处置" : "未扫描") + "</td></tr>";
  }).join("");
  var m = mail(state.selectedMailId);
  var ops = "";
  if (m && m.type === "return" && ms(m.id).status !== "done") {
    ops = '<button class="btn btn-pri" data-act="scan">扫描并核验</button>';
    if (ms(m.id).scanned) {
      ops += ' <button class="btn btn-danger" data-act="decide-cancel" data-id="' + m.id + '">确认注销</button> ' +
        '<button class="btn btn-warn" data-act="decide-pend" data-id="' + m.id + '">标记待核验</button>';
    }
  }
  var foot = "";
  if (state.night === 1 && (state.wrapShown || state.eventsFired["NIGHT1-WRAP"])) {
    foot = '<div class="oa-foot alert"><b>当前待核验记录数：' + state.pendingCount +
      "</b><br>建议操作：对上述记录执行批量注销以清理异常队列。<br>上次批量注销操作人：陈国栋（工号 0821）　2026-05-20　已注销 47 条<br>" +
      '<button class="btn" data-act="open-person" data-id="p-chen">打开推送档案：陈国栋</button> ' +
      '<button class="btn btn-pri" data-act="end-night">结束夜班</button></div>';
  }
  if (state.night === 2 && state.eventsFired["DECISION-002"] && !state.batchChoice) {
    foot = '<div class="oa-foot alert"><b>79条状态冲突</b><br>系统建议批量注销。<br>' +
      '<button class="btn btn-danger" data-act="decision-batch">确认批量注销</button> ' +
      '<button class="btn btn-pri" data-act="decision-one">逐条处理</button></div>';
  }
  if (state.night === 3 && state.eventsFired["DECISION-FINAL"]) {
    foot = '<div class="oa-foot alert"><b>系统最终提示已推送</b><br>' +
      '<button class="btn btn-pri" data-act="open-final">打开四步操作序列</button></div>';
  }
  if (state.nightEnded && !state.endingId && state.night === 2 && state.batchChoice === "one") {
    foot = '<div class="oa-foot"><button class="btn btn-pri" data-act="start-n3">开始第三夜</button></div>';
  }
  if (state.nightEnded && !state.endingId && state.night === 1) {
    foot += '<div class="oa-foot"><button class="btn btn-pri" data-act="end-night">进入第一夜收束</button></div>';
  }
  var acro = "";
  if (state.night >= 2) {
    acro = '<div class="acro-bar"><span class="meta">寄件地址首字</span>' +
      ACRONYM_CHARS.map(function (c) {
        var cls = "acro-ch";
        if (state.acro[c]) cls += " on";
        else if (state.acroBroken[c]) cls += " miss";
        else cls += " wait";
        return '<span class="' + cls + '">' + (state.acro[c] || state.acroBroken[c] ? c : "·") + "</span>";
      }).join("") +
      "<span class='meta'>" + (acroProgress() || "等待退信流入") + "</span></div>";
  }
  document.getElementById("st5").innerHTML = '<div class="hd">退件列表</div>' + acro +
    '<div class="col" style="overflow:auto;flex:1"><table class="oa"><tr><th>条码</th><th>收件人</th><th>地址</th><th>原因</th><th>状态</th></tr>' +
    (body || "<tr><td colspan='5'>暂无退件。退件将按时流入。</td></tr>") + "</table><div class='detail'>" + ops +
    "<p class='meta'>退件原因（系统标注）：查无此人 / 地址不存在 / 收件人已故 / 村已不存在</p></div>" + foot + "</div>";
}

function renderSt6() {
  var list = RECEIPTS.filter(function (r) { return state.receiptsArrived[r.id]; }).slice().reverse();
  var html = '<div class="hd">投递时间线</div><div class="tl">' + list.map(function (r) {
    var cr = person(r.courierId);
    var bad = !!r.anomaly;
    var on = state.selectedReceiptId === r.id;
    return '<div class="tl-item' + (bad ? " bad" : "") + '" data-act="sel-rcp" data-id="' + r.id +
      '" style="' + (on ? "background:#fff3f0" : "") + '"><div class="meta">' +
      (bad ? '<span class="flicker">' + esc(r.time) + "</span>" : esc(r.time)) +
      "</div><div><b>" + esc(cr ? cr.name : "") + "</b>　工号 " + esc(cr ? cr.jobNo : "") +
      (cr && cr.status === "deceased" ? ' <span class="stamp">已注销</span>' : "") +
      "</div><div class='meta'>" + esc(r.address) + " · " + esc(r.status) + " · 签收人：" + esc(r.signer) +
      "</div><div class='signpic" + (bad ? " bad" : "") + "'>" + (bad ? '<div class="scribble"></div>' : "") +
      "</div>" + (bad ? '<p class="meta">签收图像模糊，隐约可见手写“沈”，笔迹不连贯。</p><p>' +
        '<button class="btn" data-act="open-person" data-id="p-zhou">打开人事档案</button> ' +
        '<button class="btn btn-warn" data-act="mark-zhou">确认异常</button> ' +
        '<button class="btn" data-act="ignore-zhou">忽略</button></p>' : "") + "</div>";
  }).join("") + "</div>";
  document.getElementById("st6").innerHTML = html;
}

/* ========== EVENTS ========== */
document.addEventListener("click", function (e) {
  var t = e.target.closest("[data-act]");
  if (!t) return;
  var act = t.getAttribute("data-act");
  var id = t.getAttribute("data-id");
  if (act === "login") login();
  else if (act === "tab") switchStation(+id);
  else if (act === "speed") { state.speed = +t.getAttribute("data-v"); updateChrome(); }
  else if (act === "pause") {
    if (state.phase === "shift" && !state.nightEnded) state.paused = !state.paused;
    updateChrome();
  }
  else if (act === "restart") restart();
  else if (act === "review") reviewDesk();
  else if (act === "sel-mail") { state.selectedMailId = id; if (state.guide === "select") state.guide = "scan"; state.dirty = true; renderAll(); }
  else if (act === "scan") { if (state.selectedMailId) startScan(state.selectedMailId); }
  else if (act === "confirm-mail") { if (state.selectedMailId) confirmNormal(state.selectedMailId); }
  else if (act === "flush-tut") flushTutorial();
  else if (act === "decide-cancel") decide(id || state.selectedMailId, "cancel");
  else if (act === "decide-pend") decide(id || state.selectedMailId, "pending");
  else if (act === "decide-scan-bad") decide(id || state.selectedMailId, "scan-bad");
  else if (act === "decide-scan-ok") decide(id || state.selectedMailId, "scan-ok");
  else if (act === "open-person") {
    state.selectedPersonId = id;
    state.viewed[id] = true;
    if (id === "p-lin") { state.linFileViewed = true; state.bindViewed = true; fireEvents(); }
    switchStation(3);
  }
  else if (act === "open-vill") {
    state.selectedVillageId = id;
    state.treeOpen["v-county"] = true;
    state.treeOpen["v-town"] = true;
    state.treeOpen[id] = true;
    switchStation(4);
  }
  else if (act === "tree") {
    var v = village(id);
    if (v && VILLAGES.some(function (k) { return k.parent === v.id; })) {
      state.treeOpen[id] = !state.treeOpen[id];
    }
    state.selectedVillageId = id;
    renderSt4();
  }
  else if (act === "tree-sel") {
    state.selectedVillageId = id;
    renderSt4();
  }
  else if (act === "sel-rcp") { state.selectedReceiptId = id; renderSt6(); }
  else if (act === "mark-zhou") {
    if (!state.decisions["r-zhou"]) { state.decisions["r-zhou"] = "anomaly"; state.pendingCount += 1; toast("已确认签收异常"); logAct("周海签收异常"); }
    renderAll();
  }
  else if (act === "ignore-zhou") { state.decisions["r-zhou"] = "ignore"; toast("已忽略该回执"); renderAll(); }
  else if (act === "start-shift") startShift();
  else if (act === "goto-shen") { closeDialog(); state.selectedMailId = "m-shen"; switchStation(1); }
  else if (act === "goto-chain") { closeDialog(); state.selectedMailId = "m-lch"; switchStation(5); }
  else if (act === "goto-zhou") { closeDialog(); state.selectedReceiptId = "r-zhou"; switchStation(6); }
  else if (act === "goto-wgf") { closeDialog(); state.selectedMailId = "m-wgf"; switchStation(1); }
  else if (act === "goto-chen") { closeDialog(); state.selectedPersonId = "p-chen"; state.wrapShown = true; switchStation(3); }
  else if (act === "goto-wrap5") { closeDialog(); state.wrapShown = true; switchStation(5); }
  else if (act === "end-night") endNight();
  else if (act === "start-n2") startNight(2);
  else if (act === "start-n3") startNight(3);
  else if (act === "ending-A") showEnding("A");
  else if (act === "log-open") openLog();
  else if (act === "log-prev") logTurn(-1);
  else if (act === "log-next") logTurn(1);
  else if (act === "hist-go") {
    var hq = document.getElementById("hist-q");
    if (hq) state.histDraft = hq.value;
    runHistQuery();
  }
  else if (act === "goto-acro") { closeDialog(); state.selectedMailId = id; switchStation(5); }
  else if (act === "goto-hist") { closeDialog(); state.treeOpen["v-county"] = true; state.treeOpen["v-town"] = true; state.selectedVillageId = "v-qingshi"; switchStation(4); }
  else if (act === "goto-lin") { closeDialog(); state.selectedMailId = "m-lin"; switchStation(5); }
  else if (act === "goto-wgf2") { closeDialog(); state.selectedMailId = "m-wgf2"; switchStation(1); }
  else if (act === "open-lin-file") openLinFile();
  else if (act === "decision-batch") doBatchCancel();
  else if (act === "decision-one") doOneByOne();
  else if (act === "chat-silence") chatAdvance("silence");
  else if (act === "chat-pkg") chatAdvance("pkg");
  else if (act === "chat-why") chatAdvance("why");
  else if (act === "show-xray-zhao") showXrayToZhao();
  else if (act === "open-final") openFinal();
  else if (act === "final-all") applyFinal({ kind: "all" });
  else if (act === "final-none") applyFinal({ kind: "none" });
  else if (act === "final-some") openFinalForm();
  else if (act === "final-back") openFinal();
  else if (act === "final-exec") applyFinal({ kind: "some", form: readFinalForm() });
  else if (act === "final-addr") commitRedirect();
  else if (act === "del-photo") finishEndingC(true);
  else if (act === "keep-photo") finishEndingC(false);
  else if (act === "zhao-hide") { state.zhaoOpen = false; renderZhao(); }
  else if (act === "close") closeDialog();
  else if (act === "menu-sys") openDialog({ title: "系统", body: "<p>青石镇邮政所登记调度系统 v2.40</p><p>操作员：林远 0918<br>班次：夜班　第" + state.night + "夜</p><p>本终端无外网，无检索模块。地址簿可按日期回放。</p>", buttons: [{ label: "确定", act: "close", pri: true }] });
  else if (act === "menu-help") openDialog({
    title: "值班须知",
    body: "<p>1. 扫描条码，核对地址指示灯。<br>2. 正常件确认录入，系统配发邮路。<br>3. 异常件与退件严格按章处理，不明记录暂按“待核验”登记。<br>4. 历史账册按调档日期查阅。<br>5. 按规程操作，别自己瞎琢磨。——赵德明</p>",
    buttons: [{ label: "确定", act: "close", pri: true }]
  });
});

document.addEventListener("input", function (e) {
  if (e.target && e.target.id === "hist-q") state.histDraft = e.target.value;
});

document.addEventListener("keydown", function (e) {
  if (state.screen !== "work") return;
  if (e.key >= "1" && e.key <= "6") switchStation(+e.key);
  if (e.key === "Escape" && state.dialog) closeDialog();
  if (e.key === "Enter" && e.target && e.target.id === "hist-q") {
    e.preventDefault();
    state.histDraft = e.target.value;
    runHistQuery();
  }
  if (e.key === " " && state.phase === "shift") { e.preventDefault(); state.paused = !state.paused; updateChrome(); }
});

/* ========== BOOT ========== */
function boot() {
  var lines = [
    "青石镇邮政所",
    "登记调度系统 v2.31",
    "",
    "正在加载地址库........ 完成",
    "加载人员档案.......... 完成",
    "同步投递网格.......... 完成",
    "退件队列.............. 待命",
    "夜班模块.............. 就绪",
    "",
    "按规程操作。确认了就不会再跳了。",
    "",
    "_"
  ];
  var el = document.getElementById("boot-log");
  var i = 0;
  el.textContent = "";
  var t = setInterval(function () {
    if (i >= lines.length) {
      clearInterval(t);
      setTimeout(function () { state.screen = "login"; showScreen(); }, 500);
      return;
    }
    el.textContent += lines[i] + "\n";
    i++;
  }, 180);
}

showScreen();
boot();
requestAnimationFrame(loop);

(function assertUnique() {
  function chk(arr, label) {
    var seen = {};
    arr.forEach(function (x) {
      if (seen[x.id]) throw new Error(label + " duplicate id: " + x.id);
      seen[x.id] = 1;
    });
  }
  chk(MAILS, "MAILS");
  chk(PERSONS, "PERSONS");
  chk(EVENT_TIMELINE, "EVENT_TIMELINE");
  chk(RECEIPTS, "RECEIPTS");
  chk(VILLAGES, "VILLAGES");
})();