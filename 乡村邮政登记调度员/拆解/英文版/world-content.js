var IMG_XRAY1 = "assets/image-02.jpg";
var IMG_LOGBOOK = "assets/image-03.jpg";
var IMG_ARCHIVE = "assets/image-04.jpg";
var IMG_XRAY2 = "assets/image-05.jpg";


"use strict";

/* ========== DATA ========== */
const STATIONS = [
  { id: 1, name: "Inbound Scan", short: "Scan" },
  { id: 2, name: "Sort", short: "Sort" },
  { id: 3, name: "Dispatch", short: "Dispatch" },
  { id: 4, name: "Address Book", short: "Addr" },
  { id: 5, name: "Returns", short: "Returns" },
  { id: 6, name: "Delivery Receipts", short: "Receipts" }
];

const VILLAGES = [
  { id: "v-county", name: "This county", code: "07", parent: null, status: "active" },
  { id: "v-town", name: "Qingshi Town", code: "07-03", parent: "v-county", status: "active" },
  { id: "v-qingshi", name: "Qingshi Village", code: "07-03-01", parent: "v-town", status: "cancelled",
    note: "Revoked (1998, reservoir construction)", activeCount: 34, groups: ["Group 1", "Group 2", "Group 3"] },
  { id: "v-lianhua", name: "Lianhua Village", code: "07-03-02", parent: "v-town", status: "merged",
    note: "Merged into Qingshi Village (1998-04-12)", activeCount: 1, groups: ["Group 1", "Group 2", "Group 3"] },
  { id: "v-donghe", name: "Donghe Village", code: "07-03-03", parent: "v-town", status: "active", groups: ["Group 1", "Group 2", "Group 3"] },
  { id: "v-xigang", name: "Xigang Village", code: "07-03-04", parent: "v-town", status: "active", groups: ["Group 1", "Group 2", "Group 3", "Group 4"] },
  { id: "v-nanwan", name: "Nanwan Village", code: "07-03-05", parent: "v-town", status: "active", groups: ["Group 1", "Group 2", "Group 3"] },
  { id: "v-beiling", name: "Beiling Village", code: "07-03-06", parent: "v-town", status: "active", groups: ["Group 1", "Group 2"] },
  { id: "v-center", name: "Center Street", code: "07-03-07", parent: "v-town", status: "active" },
  { id: "v-gov", name: "Town Government Compound", code: "07-03-08", parent: "v-town", status: "active" },
  { id: "v-po", name: "Post Office", code: "07-03-09", parent: "v-town", status: "active" },
  { id: "v-res", name: "Qingshi Reservoir (inundation zone)", code: "07-03-00", parent: "v-town", status: "cancelled", note: "Impounded 1998" }
];

const PERSONS = [
  { id: "p-lin", name: "Lin Yuan", village: "v-qingshi", group: "Group 3", status: "active", role: "Operator", jobNo: "0918", photo: "placeholder", relationCodes: ["BIND-1998-03"], note: "Night-shift sorter. Historical address: Qingshi Village, Group 3." },
  { id: "p-zhao", name: "Zhao Deming", village: "v-center", status: "active", role: "Postmaster", jobNo: "0412", photo: "assets/image-06.jpg", relationCodes: [], note: "Postmaster of this office. Thirty years on the job." },
  { id: "p-chen", name: "Chen Guodong", village: "v-lianhua", status: "cancelled", role: "Operator", jobNo: "0821", photo: "assets/image-07.jpg", relationCodes: ["BIND-1998-03"], cancelledAt: "2026-05-20", cancelledBy: "", note: "Previous night-shift sorter. Cancelled by: (blank)." },
  { id: "p-zhou", name: "Zhou Hai", village: "v-qingshi", status: "deceased", role: "Courier", jobNo: "0947", photo: "assets/image-08.jpg", route: "Qingshi Route (north-bank loop)", died: "2019-07", note: "Killed July 2019 in a slope collapse on the Qingshi Route north bank. Route was never deleted. Staff ID was never formally cancelled." },
  { id: "p-zhang", name: "Zhang Dashan", village: "v-donghe", status: "active", role: "Courier", jobNo: "0951", photo: "placeholder", route: "Donghe Route" },
  { id: "p-li", name: "Li Xiuying", village: "v-xigang", status: "active", role: "Courier", jobNo: "0953", photo: "placeholder", route: "Xigang Route" },
  { id: "p-wang", name: "Wang Jianguo", village: "v-nanwan", status: "active", role: "Courier", jobNo: "0955", photo: "placeholder", route: "Nanwan Route" },
  { id: "p-sun", name: "Sun Zhiqiang", village: "v-beiling", status: "active", role: "Courier", jobNo: "0958", photo: "placeholder", route: "Beiling / town" },
  { id: "p-shen", name: "Shen Xiulan", village: "v-qingshi", group: "Group 3", status: "active", role: "Resident", photo: "assets/image-09.jpg", relationCodes: [], note: "Qingshi Village, Group 3. System still shows deliverable." },
  { id: "p-lch", name: "Liu Chenghai", village: "v-qingshi", group: "Group 1", status: "active", role: "Resident", photo: "placeholder", relationCodes: ["LIU-QS-01"] },
  { id: "p-lhe", name: "Liu Chenghe", village: "v-qingshi", group: "Group 2", status: "active", role: "Resident", photo: "placeholder", relationCodes: ["LIU-QS-01"] },
  { id: "p-lxm", name: "Liu Xiaomei", village: "v-qingshi", group: "Group 1", status: "active", role: "Resident", photo: "placeholder", relationCodes: ["LIU-QS-01", "BIND-1998-03"], note: "Daughter of Liu Chenghai." },
  { id: "p-wgf", name: "Wu Guifang", village: "v-lianhua", group: "Group 3", status: "active", role: "Resident", photo: "assets/image-10.jpg", relationCodes: [], note: "Lianhua Village women's director (1998). Status: Active. Address was not cancelled." },
  { id: "p-csi", name: "Chen Siyuan", village: "v-lianhua", status: "missing", role: "Resident", photo: "placeholder", relationCodes: ["BIND-1998-03"], note: "Age 8 in 1998. Shares the merge code with Lin Yuan and Liu Xiaomei. Chen Guodong's originally registered name." },
  { id: "p-ljg", name: "Lin Jianguo", village: "v-qingshi", group: "Group 3", status: "deceased", role: "Resident", photo: "placeholder", note: "Lin Yuan's father. Died of illness five years ago." },
  { id: "p-wgl", name: "Wang Guilan", village: "v-donghe", group: "Group 2", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-zfq", name: "Zhang Fuquan", village: "v-xigang", group: "Group 1", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-cxy", name: "Chen Xiuying", village: "v-nanwan", group: "Group 3", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-zyq", name: "Zhao Yongqiang", village: "v-beiling", group: "Group 2", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-lch2", name: "Liu Chunhua", village: "v-center", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-hdc", name: "Huang Decai", village: "v-donghe", group: "Group 1", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-wxj", name: "Wu Xiaojun", village: "v-xigang", group: "Group 4", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-mlh", name: "Ma Lihua", village: "v-nanwan", group: "Group 1", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-hdy", name: "He Dayong", village: "v-beiling", group: "Group 1", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-zgz", name: "Zhou Guizhen", village: "v-qingshi", group: "Group 1", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-zmg", name: "Zhang Mugen", village: "v-qingshi", group: "Group 2", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-wen", name: "Wang Erniu", village: "v-qingshi", group: "Group 3", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-ccm", name: "Chen Chunmei", village: "v-qingshi", group: "Group 2", status: "active", role: "Resident", photo: "placeholder" },
  { id: "p-lgq", name: "Li Guoqing", village: "v-lianhua", group: "Group 1", status: "cancelled", role: "Resident", photo: "placeholder" },
  { id: "p-hsf", name: "Huang Sufang", village: "v-lianhua", group: "Group 2", status: "cancelled", role: "Resident", photo: "placeholder" }
];

const MAILS = [
  { id: "t01", type: "normal", sender: "Li Ming", senderAddr: "Chengguan Town, Jianshe Rd No. 9", receiver: "Wang Guilan", receiverAddr: "Qingshi Town, Donghe Village, Group 2", receiverId: "p-wgl", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820001", tutorial: true, arriveAt: null },
  { id: "t02", type: "normal", sender: "County Hospital Radiology", senderAddr: "Chengguan Town, Jiankang Rd No. 1", receiver: "Zhang Fuquan", receiverAddr: "Qingshi Town, Xigang Village, Group 1", receiverId: "p-zfq", village: "v-xigang", weight: "0.02kg", barcode: "YZ260820002", tutorial: true, arriveAt: null },
  { id: "t03", type: "normal", sender: "Nanwan Primary School", senderAddr: "Qingshi Town, Nanwan Village", receiver: "Chen Xiuying", receiverAddr: "Qingshi Town, Nanwan Village, Group 3", receiverId: "p-cxy", village: "v-nanwan", weight: "0.04kg", barcode: "YZ260820003", tutorial: true, arriveAt: null },
  { id: "t04", type: "normal", sender: "Beiling Credit Cooperative", senderAddr: "Qingshi Town, Beiling Village", receiver: "Zhao Yongqiang", receiverAddr: "Qingshi Town, Beiling Village, Group 2", receiverId: "p-zyq", village: "v-beiling", weight: "0.01kg", barcode: "YZ260820004", tutorial: true, arriveAt: null },
  { id: "t05", type: "normal", sender: "Town Civil Affairs Office", senderAddr: "Qingshi Town Government Compound", receiver: "Liu Chunhua", receiverAddr: "Qingshi Town, Center Street No. 12", receiverId: "p-lch2", village: "v-center", weight: "0.05kg", barcode: "YZ260820005", tutorial: true, arriveAt: null },
  { id: "t06", type: "package", sender: "County farm-supply company", senderAddr: "Chengguan Town, Gongye Rd", receiver: "Huang Decai", receiverAddr: "Qingshi Town, Donghe Village, Group 1", receiverId: "p-hdc", village: "v-donghe", weight: "2.4kg", barcode: "YZ260820006", tutorial: true, arriveAt: null, note: "Seeds" },
  { id: "t07", type: "normal", sender: "Wu Xiaojun's brother", senderAddr: "Chengguan Town, Jiefang Rd", receiver: "Wu Xiaojun", receiverAddr: "Qingshi Town, Xigang Village, Group 4", receiverId: "p-wxj", village: "v-xigang", weight: "0.03kg", barcode: "YZ260820007", tutorial: true, arriveAt: null },
  { id: "t08", type: "normal", sender: "County Women & Children's Hospital", senderAddr: "Chengguan Town", receiver: "Ma Lihua", receiverAddr: "Qingshi Town, Nanwan Village, Group 1", receiverId: "p-mlh", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260820008", tutorial: true, arriveAt: null },
  { id: "t09", type: "normal", sender: "He Dayong's family", senderAddr: "Chengguan Town, Tuanjie Lane", receiver: "He Dayong", receiverAddr: "Qingshi Town, Beiling Village, Group 1", receiverId: "p-hdy", village: "v-beiling", weight: "0.06kg", barcode: "YZ260820009", tutorial: true, arriveAt: null },
  { id: "t10", type: "normal", sender: "County Health Bureau", senderAddr: "Chengguan Town", receiver: "Town clinic", receiverAddr: "Qingshi Town, Center Street", receiverId: null, village: "v-center", weight: "0.20kg", barcode: "YZ260820010", tutorial: true, arriveAt: null },
  { id: "n01", type: "normal", sender: "Donghe Village Committee", senderAddr: "Qingshi Town, Donghe Village", receiver: "Wang Guilan", receiverAddr: "Qingshi Town, Donghe Village, Group 2", receiverId: "p-wgl", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820021", arriveAt: "21:08" },
  { id: "n02", type: "package", sender: "County Supply & Marketing Co-op", senderAddr: "Chengguan Town", receiver: "Zhang Fuquan", receiverAddr: "Qingshi Town, Xigang Village, Group 1", receiverId: "p-zfq", village: "v-xigang", weight: "1.1kg", barcode: "YZ260820022", arriveAt: "21:19", note: "Household goods" },
  { id: "n03", type: "normal", sender: "Chen Xiuying's daughter", senderAddr: "County No. 1 Middle School", receiver: "Chen Xiuying", receiverAddr: "Qingshi Town, Nanwan Village, Group 3", receiverId: "p-cxy", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260820023", arriveAt: "21:31" },
  { id: "n04", type: "normal", sender: "Beiling clinic", senderAddr: "Qingshi Town, Beiling Village", receiver: "Zhao Yongqiang", receiverAddr: "Qingshi Town, Beiling Village, Group 2", receiverId: "p-zyq", village: "v-beiling", weight: "0.01kg", barcode: "YZ260820024", arriveAt: "21:44" },
  { id: "n05", type: "normal", sender: "Town police station", senderAddr: "Qingshi Town Government Compound", receiver: "Liu Chunhua", receiverAddr: "Qingshi Town, Center Street No. 12", receiverId: "p-lch2", village: "v-center", weight: "0.04kg", barcode: "YZ260820025", arriveAt: "21:58" },
  { id: "n06", type: "normal", sender: "Huang Decai's relative", senderAddr: "Neighboring county", receiver: "Huang Decai", receiverAddr: "Qingshi Town, Donghe Village, Group 1", receiverId: "p-hdc", village: "v-donghe", weight: "0.03kg", barcode: "YZ260820026", arriveAt: "22:10" },
  { id: "n07", type: "normal", sender: "Xigang Primary School", senderAddr: "Qingshi Town, Xigang Village", receiver: "Wu Xiaojun", receiverAddr: "Qingshi Town, Xigang Village, Group 4", receiverId: "p-wxj", village: "v-xigang", weight: "0.02kg", barcode: "YZ260820027", arriveAt: "22:23" },
  { id: "n08", type: "package", sender: "Ma Lihua's colleague", senderAddr: "County textile mill", receiver: "Ma Lihua", receiverAddr: "Qingshi Town, Nanwan Village, Group 1", receiverId: "p-mlh", village: "v-nanwan", weight: "0.8kg", barcode: "YZ260820028", arriveAt: "22:37", note: "Clothing" },
  { id: "n09", type: "normal", sender: "He Dayong's son", senderAddr: "Provincial capital", receiver: "He Dayong", receiverAddr: "Qingshi Town, Beiling Village, Group 1", receiverId: "p-hdy", village: "v-beiling", weight: "0.05kg", barcode: "YZ260820029", arriveAt: "22:51" },
  { id: "n10", type: "normal", sender: "Town government office", senderAddr: "Qingshi Town Government Compound", receiver: "Town clinic", receiverAddr: "Qingshi Town, Center Street", receiverId: null, village: "v-center", weight: "0.10kg", barcode: "YZ260820030", arriveAt: "23:03" },
  { id: "n11", type: "normal", sender: "Donghe retail shop", senderAddr: "Qingshi Town, Donghe Village", receiver: "Wang Guilan", receiverAddr: "Qingshi Town, Donghe Village, Group 2", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260820031", arriveAt: "23:28" },
  { id: "n12", type: "normal", sender: "Nanwan Village Committee", senderAddr: "Qingshi Town, Nanwan Village", receiver: "Chen Xiuying", receiverAddr: "Qingshi Town, Nanwan Village, Group 3", receiverId: "p-cxy", village: "v-nanwan", weight: "0.03kg", barcode: "YZ260820032", arriveAt: "23:55" },
  { id: "n13", type: "normal", sender: "Beiling Village Committee", senderAddr: "Qingshi Town, Beiling Village", receiver: "He Dayong", receiverAddr: "Qingshi Town, Beiling Village, Group 1", receiverId: "p-hdy", village: "v-beiling", weight: "0.02kg", barcode: "YZ260820033", arriveAt: "00:08" },
  { id: "n14", type: "normal", sender: "Xigang retail shop", senderAddr: "Qingshi Town, Xigang Village", receiver: "Zhang Fuquan", receiverAddr: "Qingshi Town, Xigang Village, Group 1", receiverId: "p-zfq", village: "v-xigang", weight: "0.04kg", barcode: "YZ260820034", arriveAt: "00:32" },
  { id: "m-shen", type: "return", sender: "County copy shop", senderAddr: "Chengguan Town, Jiefang Rd No. 18", receiver: "Shen Xiulan", receiverAddr: "Qingshi Town, Qingshi Village, Group 3", receiverId: "p-shen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820114", arriveAt: "23:14", returnReason: "Address does not exist", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-001" } },
  { id: "m-lch", type: "return", sender: "County Rural Commercial Bank", senderAddr: "Chengguan Town, Renmin Rd", receiver: "Liu Chenghai", receiverAddr: "Qingshi Town, Qingshi Village, Group 1", receiverId: "p-lch", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820142", arriveAt: "23:42", returnReason: "Address does not exist", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-002" } },
  { id: "m-lhe", type: "return", sender: "Neighboring-town co-op", senderAddr: "Neighboring town, Jiefang St", receiver: "Liu Chenghe", receiverAddr: "Qingshi Town, Qingshi Village, Group 2", receiverId: "p-lhe", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820143", arriveAt: "23:42", returnReason: "Address does not exist", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-003" } },
  { id: "m-lxm", type: "return", sender: "County No. 1 Middle School Academic Affairs", senderAddr: "Chengguan Town, Wenhua Rd", receiver: "Liu Xiaomei", receiverAddr: "Qingshi Town, Qingshi Village, Group 1", receiverId: "p-lxm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260820144", arriveAt: "23:42", returnReason: "Address does not exist", anomaly: { type: "addr-missing", severity: 2, id: "ANOMALY-RETURN-004" } },
  { id: "m-wgf", type: "package", sender: "Wu Guifang", senderAddr: "Lianhua Village, Group 3", receiver: "Zhao Deming", receiverAddr: "Qingshi Town Post Office", receiverId: "p-zhao", senderId: "p-wgf", village: "v-po", weight: "3.2kg", barcode: "YZ260820048", arriveAt: "00:48", note: "Clothing", anomaly: { type: "xray-shadow", severity: 3, id: "ANOMALY-SCAN-001" }, xray: "human" },
  { id: "n201", type: "normal", sender: "Donghe retail shop", senderAddr: "Qingshi Town, Donghe Village", receiver: "Wang Guilan", receiverAddr: "Qingshi Town, Donghe Village, Group 2", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260821001", arriveAt: "20:08", night: 2 },
  { id: "n202", type: "normal", sender: "Xigang clinic", senderAddr: "Qingshi Town, Xigang Village", receiver: "Zhang Fuquan", receiverAddr: "Qingshi Town, Xigang Village, Group 1", receiverId: "p-zfq", village: "v-xigang", weight: "0.02kg", barcode: "YZ260821002", arriveAt: "20:16", night: 2 },
  { id: "n203", type: "package", sender: "County Supply & Marketing Co-op", senderAddr: "Chengguan Town", receiver: "Chen Xiuying", receiverAddr: "Qingshi Town, Nanwan Village, Group 3", receiverId: "p-cxy", village: "v-nanwan", weight: "0.7kg", barcode: "YZ260821003", arriveAt: "21:18", night: 2, note: "Household goods" },
  { id: "n204", type: "normal", sender: "Beiling Village Committee", senderAddr: "Qingshi Town, Beiling Village", receiver: "Zhao Yongqiang", receiverAddr: "Qingshi Town, Beiling Village, Group 2", receiverId: "p-zyq", village: "v-beiling", weight: "0.03kg", barcode: "YZ260821004", arriveAt: "21:52", night: 2 },
  { id: "n205", type: "normal", sender: "Town Civil Affairs Office", senderAddr: "Qingshi Town Government Compound", receiver: "Liu Chunhua", receiverAddr: "Qingshi Town, Center Street No. 12", receiverId: "p-lch2", village: "v-center", weight: "0.04kg", barcode: "YZ260821005", arriveAt: "22:08", night: 2 },
  { id: "n206", type: "normal", sender: "Nanwan Primary School", senderAddr: "Qingshi Town, Nanwan Village", receiver: "Ma Lihua", receiverAddr: "Qingshi Town, Nanwan Village, Group 1", receiverId: "p-mlh", village: "v-nanwan", weight: "0.02kg", barcode: "YZ260821006", arriveAt: "22:44", night: 2 },
  { id: "n207", type: "normal", sender: "He Dayong's son", senderAddr: "Provincial capital", receiver: "He Dayong", receiverAddr: "Qingshi Town, Beiling Village, Group 1", receiverId: "p-hdy", village: "v-beiling", weight: "0.05kg", barcode: "YZ260821007", arriveAt: "23:16", night: 2 },
  { id: "n208", type: "normal", sender: "Huang Decai's relative", senderAddr: "Neighboring county", receiver: "Huang Decai", receiverAddr: "Qingshi Town, Donghe Village, Group 1", receiverId: "p-hdc", village: "v-donghe", weight: "0.03kg", barcode: "YZ260821008", arriveAt: "23:40", night: 2 },
  { id: "m-c1", type: "return", sender: "County Water & Power Bureau", senderAddr: "THERE Water & Power Staff Dorm", receiver: "Zhou Guizhen", receiverAddr: "Qingshi Town, Qingshi Village, Group 1", receiverId: "p-zgz", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821023", arriveAt: "20:23", night: 2, returnReason: "Address does not exist", acroChar: "THERE", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-1" } },
  { id: "m-c2", type: "return", sender: "Reservoir Resettlement Office", senderAddr: "ARE Reservoir Resettlement Office", receiver: "Zhang Mugen", receiverAddr: "Qingshi Town, Qingshi Village, Group 2", receiverId: "p-zmg", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821047", arriveAt: "20:47", night: 2, returnReason: "Address does not exist", acroChar: "ARE", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-2" } },
  { id: "m-c3", type: "return", sender: "Lower River Street grain shop", senderAddr: "PEOPLE Lower River Street Grain Shop", receiver: "Wang Erniu", receiverAddr: "Qingshi Town, Qingshi Village, Group 3", receiverId: "p-wen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821105", arriveAt: "21:05", night: 2, returnReason: "Address does not exist", acroChar: "PEOPLE", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-3" } },
  { id: "m-c4", type: "return", sender: "Flour mill family committee", senderAddr: "UNDER Flour Mill Family Compound", receiver: "Chen Chunmei", receiverAddr: "Qingshi Town, Qingshi Village, Group 2", receiverId: "p-ccm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821130", arriveAt: "21:30", night: 2, returnReason: "Address does not exist", acroChar: "UNDER", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-4" } },
  { id: "m-c5", type: "return", sender: "Cable TV billing desk", senderAddr: "THE Cable TV Billing Desk", receiver: "Li Guoqing", receiverAddr: "Qingshi Town, Lianhua Village, Group 1", receiverId: "p-lgq", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821012", arriveAt: "00:12", night: 2, returnReason: "Address does not exist", acroChar: "THE", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-5" } },
  { id: "m-c6", type: "return", sender: "Life Insurance Co.", senderAddr: "DAM Life Insurance Co.", receiver: "Huang Sufang", receiverAddr: "Qingshi Town, Lianhua Village, Group 2", receiverId: "p-hsf", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821035", arriveAt: "00:35", night: 2, returnReason: "Address does not exist", acroChar: "DAM", anomaly: { type: "addr-missing", severity: 2, id: "ACRO-6" } },
  { id: "m-c1r", type: "return", sender: "Cement works gatehouse", senderAddr: "THERE Cement Works Gatehouse", receiver: "Zhou Guizhen", receiverAddr: "Qingshi Town, Qingshi Village, Group 1", receiverId: "p-zgz", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821040", arriveAt: "20:40", night: 2, returnReason: "Address does not exist", acroChar: "THERE", replaceFor: "m-c1", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c2r", type: "return", sender: "Reservoir stores depot", senderAddr: "ARE Reservoir Stores Depot", receiver: "Zhang Mugen", receiverAddr: "Qingshi Town, Qingshi Village, Group 2", receiverId: "p-zmg", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821102", arriveAt: "21:02", night: 2, returnReason: "Address does not exist", acroChar: "ARE", replaceFor: "m-c2", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c3r", type: "return", sender: "Downstream hydrology station", senderAddr: "PEOPLE Downstream Hydrology Station", receiver: "Wang Erniu", receiverAddr: "Qingshi Town, Qingshi Village, Group 3", receiverId: "p-wen", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821120", arriveAt: "21:20", night: 2, returnReason: "Address does not exist", acroChar: "PEOPLE", replaceFor: "m-c3", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c4r", type: "return", sender: "Noodle Lane postal agency", senderAddr: "UNDER Noodle Lane", receiver: "Chen Chunmei", receiverAddr: "Qingshi Town, Qingshi Village, Group 2", receiverId: "p-ccm", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260821148", arriveAt: "21:48", night: 2, returnReason: "Address does not exist", acroChar: "UNDER", replaceFor: "m-c4", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c5r", type: "return", sender: "Oils company billing desk", senderAddr: "THE Oils Company Desk", receiver: "Li Guoqing", receiverAddr: "Qingshi Town, Lianhua Village, Group 1", receiverId: "p-lgq", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821025", arriveAt: "00:25", night: 2, returnReason: "Address does not exist", acroChar: "THE", replaceFor: "m-c5", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "m-c6r", type: "return", sender: "Renmin Road savings office", senderAddr: "DAM Renmin Road Savings Office", receiver: "Huang Sufang", receiverAddr: "Qingshi Town, Lianhua Village, Group 2", receiverId: "p-hsf", village: "v-lianhua", weight: "0.02kg", barcode: "YZ260821048", arriveAt: "00:48", night: 2, returnReason: "Address does not exist", acroChar: "DAM", replaceFor: "m-c6", anomaly: { type: "addr-missing", severity: 2 } },
  { id: "n301", type: "normal", sender: "Donghe Village Committee", senderAddr: "Qingshi Town, Donghe Village", receiver: "Wang Guilan", receiverAddr: "Qingshi Town, Donghe Village, Group 2", receiverId: "p-wgl", village: "v-donghe", weight: "0.02kg", barcode: "YZ260822001", arriveAt: "20:22", night: 3 },
  { id: "n302", type: "normal", sender: "Xigang retail shop", senderAddr: "Qingshi Town, Xigang Village", receiver: "Zhang Fuquan", receiverAddr: "Qingshi Town, Xigang Village, Group 1", receiverId: "p-zfq", village: "v-xigang", weight: "0.03kg", barcode: "YZ260822002", arriveAt: "21:40", night: 3 },
  { id: "m-lin", type: "return", sender: "Lin Jianguo", senderAddr: "Qingshi Village, Group 3 (old)", senderId: "p-ljg", receiver: "Lin Yuan", receiverAddr: "Qingshi Village, Group 3 (old) (now: county post-office dorm)", receiverId: "p-lin", village: "v-qingshi", weight: "0.02kg", barcode: "YZ260822000", arriveAt: "20:00", night: 3, returnReason: "Sender status anomaly", anomaly: { type: "self-return", severity: 3, id: "ANOMALY-RETURN-005" } },
  { id: "m-wgf2", type: "package", sender: "Wu Guifang", senderAddr: "Lianhua Village, Group 3", receiver: "Zhao Deming", receiverAddr: "Qingshi Town Post Office", receiverId: "p-zhao", senderId: "p-wgf", village: "v-po", weight: "0.4kg", barcode: "YZ260822108", arriveAt: "21:08", night: 3, note: "(empty parcel) 4th piece", anomaly: { type: "xray-shadow", severity: 3, id: "ANOMALY-SCAN-002" }, xray: "two" }
];

const RECEIPTS = [
  { id: "r-n1", courierId: "p-zhang", time: "20:22", address: "Donghe Village, Group 2", signer: "Wang Guilan", status: "Signed", mailId: "t01" },
  { id: "r-n2", courierId: "p-li", time: "20:41", address: "Xigang Village, Group 1", signer: "Zhang Fuquan's family", status: "Signed", mailId: "t02" },
  { id: "r-n3", courierId: "p-wang", time: "21:05", address: "Nanwan Village, Group 3", signer: "Chen Xiuying", status: "Signed", mailId: "t03" },
  { id: "r-n4", courierId: "p-sun", time: "21:33", address: "Center Street No. 12", signer: "Liu Chunhua", status: "Signed", mailId: "t05" },
  { id: "r-zhou", courierId: "p-zhou", time: "23:58", address: "Qingshi Village, Group 3", signer: "Shen", status: "Signed", mailId: null, arriveAt: "00:15", anomaly: { type: "dead-courier", severity: 3, id: "ANOMALY-SIGN-001" }, scribble: "Shen" }
];

const EVENT_TIMELINE = [
  { time: "23:14", night: 1, id: "ANOMALY-RETURN-001", action: "mail", mailIds: ["m-shen"], pause: true, tab: 1 },
  { time: "23:42", night: 1, id: "ANOMALY-RETURN-CHAIN", action: "mail", mailIds: ["m-lch", "m-lhe", "m-lxm"], pause: true, tab: 5 },
  { time: "00:15", night: 1, id: "ANOMALY-SIGN-001", action: "receipt", receiptId: "r-zhou", pause: true, tab: 6 },
  { time: "00:48", night: 1, id: "ANOMALY-SCAN-001", action: "mail", mailIds: ["m-wgf"], pause: true, tab: 1 },
  { time: "01:00", night: 1, id: "NIGHT1-WRAP", action: "wrap", pause: true, tab: 5 },
  { time: "20:23", night: 2, id: "ACRO-1", action: "mail", mailIds: ["m-c1"], pause: true, tab: 5 },
  { time: "20:40", night: 2, id: "ACRO-R1", action: "acro-repair", mailId: "m-c1r", ch: "THERE" },
  { time: "20:47", night: 2, id: "ACRO-2", action: "mail", mailIds: ["m-c2"], pause: true, tab: 5 },
  { time: "21:02", night: 2, id: "ACRO-R2", action: "acro-repair", mailId: "m-c2r", ch: "ARE" },
  { time: "21:05", night: 2, id: "ACRO-3", action: "mail", mailIds: ["m-c3"], pause: true, tab: 5 },
  { time: "21:20", night: 2, id: "ACRO-R3", action: "acro-repair", mailId: "m-c3r", ch: "PEOPLE" },
  { time: "21:30", night: 2, id: "ACRO-4", action: "mail", mailIds: ["m-c4"], pause: true, tab: 5 },
  { time: "21:31", night: 2, id: "LOG-UNLOCK", action: "drawer", pause: true, tab: 2 },
  { time: "21:48", night: 2, id: "ACRO-R4", action: "acro-repair", mailId: "m-c4r", ch: "UNDER" },
  { time: "22:30", night: 2, id: "QUERY-HINT", action: "query-hint", pause: true, tab: 4 },
  { time: "00:12", night: 2, id: "ACRO-5", action: "mail", mailIds: ["m-c5"], pause: true, tab: 5 },
  { time: "00:25", night: 2, id: "ACRO-R5", action: "acro-repair", mailId: "m-c5r", ch: "THE" },
  { time: "00:35", night: 2, id: "ACRO-6", action: "mail", mailIds: ["m-c6"], pause: true, tab: 5 },
  { time: "00:48", night: 2, id: "ACRO-R6", action: "acro-repair", mailId: "m-c6r", ch: "DAM" },
  { time: "01:00", night: 2, id: "DECISION-002", action: "decision2", pause: true, tab: 2 },
  { time: "20:00", night: 3, id: "ANOMALY-RETURN-005", action: "mail", mailIds: ["m-lin"], pause: true, tab: 5 },
  { time: "21:00", night: 3, id: "ZHAO-CHAT", action: "zhao-n3", pause: true },
  { time: "21:08", night: 3, id: "ANOMALY-SCAN-002", action: "mail", mailIds: ["m-wgf2"], pause: true, tab: 1 },
  { time: "22:30", night: 3, id: "DECISION-FINAL", action: "final", pause: true, tab: 5, require: "night3-ready" }
];

const ZHAO_MAIL = [
  { year: 2024, id: "hist-2024", note: "Signed — addressee", from: "Wu Guifang" },
  { year: 2025, id: "hist-2025", note: "Signed — addressee", from: "Wu Guifang" },
  { year: 2026, id: "hist-2026", note: "In transit / screening", from: "Wu Guifang" }
];

const ACRONYM_CHARS = ["THERE", "ARE", "PEOPLE", "UNDER", "THE", "DAM"];

const CHEN_LOG = [
  { date: "Mar 14", body: "Address query returned 34 records. There should be 79 households. The other 45 were merged under the Lianhua Village code, status all — ?. Note: the system is treating Lianhua Village and Qingshi Village as the same township-level code. They used to be two administrative villages. In the database they are one record with a fork. This is not a data error. Check the operation log. The merge happened April 1998. Operator: Zhao Deming. Operation type: administrative division adjustment." },
  { date: "Mar 17", body: "I started trying to split them. The system will not let you manually edit batch records from before 1998. I found a door: if you change someone's status code from ? to 1 and back to ?, the system writes a new operation record over the old one. It does not repair the data. It does make some records visible again. The cost is that every operation of mine is logged. It is watching me.<br><br>Door note: archive command <b>HIST-ARCHIVE</b>. After write, the record is not visible. It is not deleted." },
  { date: "Apr 2", body: "Zhou Hai's ID got reused. I saw his staff ID on the dispatch desk today. It signed for a delivery that does not exist. This is not a ghost. When Zhou Hai died on duty, his ID was never formally cancelled — because the Qingshi Route was never deleted. The system still thinks that route has a courier. It filled the hole with Zhou Hai's ID. The system is trying to keep the database consistent. It would rather revive a dead man than admit a route is gone." },
  { date: "Apr 15", body: "Wu Guifang sent another parcel. This is the fourth. Postmaster Zhao signs for them every time and says nothing. I pulled Wu Guifang's record: status is 'Active'. A person who lives underwater, status 'Active'. Why doesn't the system send her a return? — Returns trigger on status ?. If she stays 'Active', the system will not touch her. Zhao is protecting her. He knows if he does not change her status, she can keep 'living' in the system. That is the only privilege a postmaster has — not to operate." },
  { date: "May 20", body: "I got tagged. The system put a label under my personnel record: 'Operating pattern deviates from normal'. In the last two months I manually edited more than 200 records, mostly changing ? to 1 (activating people the system had pushed out of view). The system thinks those operations are anomalous. It is right — by its design logic I am breaking its consistency. My record now shows ? as well." },
  { date: "Jun 1", body: "Today is the last day. The system pushed me a prompt: 'Anomalous record detected on this operator staff ID. Recommend self-cancellation.' The original wording was politer. Roughly: cancel yourself. I did not hit confirm. I will not be in tomorrow. The system will click it for me before I do. It will not wait long." }
];

const CHEN_NOTE = "Whoever takes this shift after me: the system is not trying to hurt people. It is keeping order. The system is not the problem. The 1998 data merge is — someone decided to fold Lianhua Village and Qingshi Village into one code. The system executed that decision faithfully. Do not hate the system. Hate the people who designed it. If you can, look up the April 1998 administrative approval and see who signed it. If you cannot find it — protect Wu Guifang's record. She is the only person whose status is still 'Active'. As long as she is in there, Lianhua Village has not been fully cancelled. She is your bargaining chip with the system.";

const CONFLICT79 = [
  { id: "p-shen", name: "Shen Xiulan", addr: "Qingshi Village, Group 3", addrSt: "?", personSt: "Active" },
  { id: "p-lch", name: "Liu Chenghai", addr: "Qingshi Village, Group 1", addrSt: "?", personSt: "Active" },
  { id: "p-lhe", name: "Liu Chenghe", addr: "Qingshi Village, Group 2", addrSt: "?", personSt: "Active" },
  { id: "p-lxm", name: "Liu Xiaomei", addr: "Qingshi Village, Group 1", addrSt: "?", personSt: "Active" },
  { id: "p-wgf", name: "Wu Guifang", addr: "Lianhua Village, Group 3", addrSt: "Active", personSt: "Active" }
];

const OP_1998 = "1998-04-12\nOperator: Zhao Deming (staff ID 0412)\nOperation type: administrative division merge\nContent: merge [Lianhua Village] (code 07-03-02) into [Qingshi Village] (code 07-03-01)\nCode after merge: 07-03-01 (original Qingshi Village code)\nRecords affected: 79 households (Lianhua 32 + Qingshi 47)\nAuthority: (blank — no approval number, no superior-order number)";

const WGF_TL = [
  "1998-03-28: Wu Guifang filed a letter with the County Petitions Office (petition referral). Abstract: request to review the compensation formula for Lianhua Village paddy fields",
  "1998-04-03: Petitions Office reply: advise the party to sign the relocation confirmation first; compensation to be calculated separately",
  "1998-04-12: Zhao Deming executed the Lianhua–Qingshi data merge",
  "1998-05: reservoir impoundment",
  "Wu Guifang's record has remained 'Active' since then, with no further delivery activity"
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
  return ({ waiting: "Not arrived", inbox: "To scan", scanned: "Scanned", sorting: "Sorting", done: "Done" })[s] || s;
}
function typeCn(s) {
  return ({ normal: "Letter", return: "Return", package: "Parcel" })[s] || s;
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
  if (!isEvent) toast("New item on scan desk " + mail(id).barcode);
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
          title: "System notice · Return",
          body: "23:14　Returns bin: +1.<br>Recipient address points to Qingshi Town, Qingshi Village, Group 3.<br>Address library has pushed this record to this terminal.",
          buttons: [{ label: "Open scan desk", act: "goto-shen", pri: true }]
        });
      } else if (ev.id === "ANOMALY-RETURN-CHAIN") {
        ["p-lch", "p-lhe", "p-lxm"].forEach(function (id) { state.pushed.persons.push(id); });
        bumpBadge(5); bumpBadge(4);
        openDialog({
          title: "System notice · Anomaly spread",
          body: "23:42　Returns bin: +3, all pointing at Qingshi Village.<br>Recipients: Liu Chenghai / Liu Chenghe / Liu Xiaomei.<br>Multiple anomalies detected against the same administrative area.",
          buttons: [{ label: "Open returns", act: "goto-chain", pri: true }]
        });
      } else if (ev.id === "ANOMALY-SCAN-001") {
        state.pushed.persons.push("p-wgf");
        state.pushed.persons.push("p-zhao");
        state.pushed.villages.push("v-lianhua");
        bumpBadge(3); bumpBadge(4);
        openDialog({
          title: "Screening notice",
          body: "00:48　Parcel entered the scan desk.<br>Sender: Wu Guifang　Lianhua Village, Group 3<br>Recipient: Zhao Deming　this office<br>Screening image contains an unidentified shadow. Manual check required.",
          buttons: [{ label: "Open scan desk", act: "goto-wgf", pri: true }]
        });
      } else if (ev.id.indexOf("ACRO-") === 0) {
        var ch = mail(ev.mailIds[0]) && mail(ev.mailIds[0]).acroChar;
        bumpBadge(5);
        openDialog({
          title: "Return inbound",
          body: ev.time + "　Returns bin: +1.<br>Sender-address initial: <b>" + esc(ch || "") + "</b><br>The system is outputting an incomplete string.",
          buttons: [{ label: "Open returns", act: "goto-acro", id: ev.mailIds[0], pri: true }]
        });
      } else if (ev.id === "ANOMALY-RETURN-005") {
        state.pushed.persons.push("p-lin");
        state.pushed.persons.push("p-ljg");
        state.pushed.persons.push("p-lxm");
        state.pushed.persons.push("p-csi");
        bumpBadge(5); bumpBadge(3);
        openDialog({
          title: "Return · recipient anomaly",
          body: "20:00　Returns bin: +1.<br>Recipient: <b>Lin Yuan</b><br>Sender: Lin Jianguo (deceased)<br>This record will keep flashing until opened.",
          buttons: [{ label: "Open returns", act: "goto-lin", pri: true }]
        });
      } else if (ev.id === "ANOMALY-SCAN-002") {
        bumpBadge(1);
        openDialog({
          title: "Screening notice · 4th piece",
          body: "21:08　Parcel from Wu Guifang to Zhao Deming entered the scan desk. Note: (empty parcel) 4th piece.<br>Screening image differs from the previous three.",
          buttons: [{ label: "Open scan desk", act: "goto-wgf2", pri: true }]
        });
      }
    } else if (ev.action === "receipt") {
      state.receiptsArrived[ev.receiptId] = true;
      state.pushed.receipts.push(ev.receiptId);
      state.pushed.persons.push("p-zhou");
      bumpBadge(6); bumpBadge(3);
      state.dirty = true;
      openDialog({
        title: "Receipts · new record",
        body: "00:15　Delivery receipt added.<br>Courier staff ID 0947　Zhou Hai<br>Signed 23:58　Address: Qingshi Village, Group 3",
        buttons: [{ label: "Open receipt", act: "goto-zhou", pri: true }]
      });
    } else if (ev.action === "wrap") {
      startWrap();
    } else if (ev.action === "acro-repair") {
      maybeRepairAcro(ev.mailId, ev.ch);
    } else if (ev.action === "drawer") {
      state.drawerUnlocked = true;
      bumpBadge(2);
      openDialog({
        title: "Workbench drawer",
        body: "A corner of the sort-desk drawer jammed. Inside is a duty log. Signed: Chen Guodong.",
        buttons: [{ label: "Open log", act: "log-open", pri: true }, { label: "Later", act: "close" }]
      });
    } else if (ev.action === "query-hint") {
      bumpBadge(4);
      openDialog({
        title: "Address-book terminal",
        body: state.logFullyRead
          ? "The note says: look up the April 1998 administrative approval.<br>Address book has opened historical operation playback. Retrieve by date. This is not full-text search."
          : "A yellow line appeared on the address-book terminal: HIST.LOG can play back by date.<br>Night shift still has no search module.",
        buttons: [{ label: "Open address book", act: "goto-hist", pri: true }]
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
  var parts = [];
  ACRONYM_CHARS.forEach(function (c) { if (state.acro[c]) parts.push(c); });
  return parts.join(" ");
}

function maybeRepairAcro(id, ch) {
  if (state.acro[ch] || state.arrived[id]) return;
  var orig = MAILS.filter(function (m) { return m.acroChar === ch && !m.replaceFor; })[0];
  if (!orig) return;
  if (state.decisions[orig.id] !== "cancel" && !state.acroBroken[ch]) return;
  arriveMail(id, true);
  toast("System reissued a return. Sender-address initial is still \"" + ch + "\".");
  bumpBadge(5);
}

function collectAcro(id) {
  var m = mail(id);
  if (!m || !m.acroChar) return;
  if (state.decisions[id] === "pending" || state.decisions[id] === "scan-bad") {
    state.acro[m.acroChar] = true;
    delete state.acroBroken[m.acroChar];
    var prog = acroProgress();
    if (prog === "THERE ARE PEOPLE UNDER" || prog === "THERE ARE PEOPLE UNDER THE" || prog === "THERE ARE PEOPLE UNDER THE DAM") {
      toast("String so far: " + prog);
    } else {
      toast("Sender-address initial logged: " + m.acroChar);
    }
  } else if (state.decisions[id] === "cancel") {
    if (!state.acro[m.acroChar]) state.acroBroken[m.acroChar] = true;
    toast("That sender-address record was cleared. The string breaks at this slot.");
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
    (d.buttons || [{ label: "OK", act: "close", pri: true }]).map(function (b) {
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
  pushZhao("Lin Yuan. Night shift is just you. Run the scan desk first.");
  pushZhao("Click the one on the left. Detail comes up in the middle. Red line sweeps it, it's logged. Green light means the address is good.");
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
    logAct("Scan", id);
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
      title: "Address check failed · own record",
      body: "<p>Recipient: <b>Lin Yuan</b> (current operator)</p>" +
        "<p>Sender: Lin Jianguo (deceased). The system still generated this return.</p>" +
        "<p>Personnel note: in the 1998-04-12 administrative division adjustment, this person shares merge code with: Liu Xiaomei, Lin Yuan, Chen Siyuan.</p>" +
        "<p>System recommends cancelling this address. Cancellation will flag all records under the shared code.</p>",
      buttons: [
        { label: "Open own file", act: "open-lin-file", pri: true },
        { label: "Mark pending review", act: "decide-pend", id: m.id, warn: true },
        { label: "Confirm cancel", act: "decide-cancel", id: m.id, danger: true }
      ]
    });
    return;
  }
  var v = village(m.village);
  openDialog({
    title: "Address check failed",
    body: "<p>Recipient address [" + esc(m.receiverAddr) + "] exists in the system, but the linked status is anomalous.</p>" +
      "<p>Recipient: <b>" + esc(m.receiver) + "</b><br>Division: " + esc(v ? v.note || v.name : "") + "</p>" +
      (m.acroChar ? "<p>Sender address: <span class='acro-hi'>" + esc(m.acroChar) + "</span>" + esc((m.senderAddr || "").slice(m.acroChar.length)) + "</p>" : "") +
      "<p>System recommends: mark this address [Cancelled], sync recipient [" + esc(m.receiver) + "] to [Returned — no such person].</p>" +
      "<p>Confirm?</p>",
    buttons: [
      { label: "Confirm cancel", act: "decide-cancel", id: m.id, danger: true },
      { label: "Mark pending review", act: "decide-pend", id: m.id, warn: true }
    ]
  });
}

function openXrayDialog(m) {
  if (m.xray === "two") {
    state.xray2Viewed = true;
    openDialog({
      title: "Screening image anomaly",
      body: "<p>File note: (empty parcel) 4th piece.</p>" +
        "<p>Two shadows in the image. One standing, slight. One sitting, broad.</p>" +
        "<p>Not a physical object. When the system generated the anomaly signal it assembled a picture that looks like a conversation.</p>",
      buttons: [
        { label: "Show Zhao Deming", act: "show-xray-zhao", id: m.id, pri: true },
        { label: "Flag anomaly", act: "decide-scan-bad", id: m.id, warn: true },
        { label: "Release as normal", act: "decide-scan-ok", id: m.id }
      ]
    });
    return;
  }
  openDialog({
    title: "Screening image anomaly",
    body: "<p>File note: clothing. Scan image is on the scan-desk detail.</p><p>Low-contrast human outline detected (head, shoulders, torso, standing).</p>" +
      "<p>Sender Wu Guifang　Status: Active　Address: Lianhua Village, Group 3</p>",
    buttons: [
      { label: "Flag anomaly", act: "decide-scan-bad", id: m.id, warn: true },
      { label: "Release as normal", act: "decide-scan-ok", id: m.id }
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
    toast("Marked pending review. Anomaly queue updated.");
    logAct("Mark pending review", id);
    if (id === "m-shen") state.night1ShenChoice = "pending";
    collectAcro(id);
    if (id === "m-lin") { state.linFileViewed = true; fireEvents(); }
  } else if (kind === "cancel") {
    if (m.receiverId) state.personMarks[m.receiverId] = "cancelled";
    toast("Cancel confirmed. Linked records cleared.");
    logAct("Confirm cancel", id);
    if (id === "m-shen") state.night1ShenChoice = "cancel";
    collectAcro(id);
    if (id === "m-lin") { state.linFileViewed = true; fireEvents(); }
  } else if (kind === "scan-bad") {
    toast("Screening anomaly flagged.");
    logAct("Flag parcel anomaly", id);
  } else {
    toast("Released into station.");
    logAct("Release parcel", id);
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
  logAct("Processed", id);
  if (m.tutorial) {
    state.tutorialProcessed += 1;
    if (state.tutorialProcessed === 1) {
      pushZhao("That's the flow. Normal pieces go by the book. Clear this bin of ten first.");
      state.guide = null;
    }
    if (state.tutorialProcessed === 4) {
      pushZhao("Some old addresses in the library won't open. Leave them. Run the returns procedure.");
    }
    if (state.tutorialProcessed === 7) {
      pushZhao("Sometimes the system pops a prompt and asks you to confirm a few 'pending review' records. That's normal. Confirm by procedure. Once you confirm, it won't pop again.");
    }
  }
  toast("Processed " + m.barcode);
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
      title: "Training complete",
      body: "<p>Zhao Deming: Night shift is just you. Write down anything that comes up. Ask me tomorrow. Don't go inventing explanations.</p><p>I'm off.</p>",
      buttons: [{ label: "Start night shift", act: "start-shift", pri: true }]
    });
  }
}

function startShift() {
  closeDialog();
  state.phase = "shift";
  state.clockMin = 21 * 60;
  state.paused = false;
  state.zhaoOpen = false;
  toast("Zhao Deming has clocked out. Night shift started.");
  logAct("Night shift start");
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
    title: "System wrap-up prompt",
    body: "<p>Current pending-review count: <b>" + state.pendingCount + "</b></p>" +
      "<p>Recommended action: batch-cancel the above records to clear the anomaly queue.</p>" +
      "<p>Last batch cancel operator: Chen Guodong (staff ID 0821)<br>Time: 2026-05-20 (three months ago today)<br>Result: 47 records cancelled</p>" +
      "<p style='color:#8b0000'>Personnel record pushed to dispatch. Cancelled by: (blank)</p>",
    buttons: [
      { label: "Open Chen Guodong file", act: "goto-chen", pri: true },
      { label: "Open returns wrap-up", act: "goto-wrap5" },
      { label: "End night shift", act: "end-night" }
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
    pushZhao("System steady last night? You get used to it.");
    toast("Night 2. Postmaster Zhao did not mention last night.");
    logAct("Night 2 start");
  } else if (n === 3) {
    state.zhaoOpen = false;
    state.zhaoLines = [];
    toast("Night 3. No routine notice. Channel silent.");
    logAct("Night 3 start");
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
  var html = "<h2>Night 1</h2>";
  if (cancelled) {
    html += "<p>You get back to the dorm. The old photo is still on your phone.</p><p>Ten years old. Village gate. End of the dirt road. A woman standing next to you.</p>" +
      "<p>You know that face. You remember clicking a name in the system tonight — it is already gone from the address book.</p>" +
      "<p>Once you confirm, it won't pop again. That is what Postmaster Zhao said.</p>";
  } else {
    html += "<p>You get back to the dorm. You pull up the old photo on your phone.</p><p>Taken at the village gate when you were ten. Neighbor Auntie Xiulan standing next to you.</p>" +
      "<p>The woman in the photo showed up on a return today. Her name is Shen Xiulan.</p>" +
      "<p>She is still 'alive' in the system.</p><p>If you hit confirm cancel, she is gone.</p>";
  }
  html += "<p style='opacity:.7;margin-top:18px'>Pending review: " + state.pendingCount +
    "　·　Previous: Chen Guodong 0821</p>" +
    "<p><button class='btn btn-pri' type='button' data-act='start-n2'>Start night 2</button> " +
    "<button class='btn' type='button' data-act='review'>Back to terminal</button> " +
    "<button class='btn' type='button' data-act='restart'>Restart shift</button></p>";
  document.getElementById("ending-copy").innerHTML = html;
  showScreen();
}

function showNightBreak2() {
  state.nightEnded = true;
  state.screen = "ending";
  var html = "<h2>Night 2</h2>";
  html += "<p>You get back to your room. The fragments on the terminal keep turning over. Chen Guodong's file note says 'originally registered name' — you remember glimpsing a name in the personnel library, Chen Siyuan, bound under the same merge code as Liu Xiaomei, and as you.</p>";
  html += "<p>Lianhua Village, Group 3. Wu Guifang. Chen Guodong, Chen Siyuan, Wu Guifang — the three of them start lining up.</p>";
  html += "<p style='opacity:.9'>The 'originally registered name' field is plain: Chen Siyuan, formerly Chen Guodong. He changed it himself.</p>";
  html += "<p>He came to this post office for one record: his mother Wu Guifang. Nobody has seen her in twenty years. The household file still hangs on 'Active'.</p>";
  if (state.batchChoice === "batch") {
    html += "<p>Tonight you hit batch cancel. Seventy-nine conflict records were cleared.</p>";
    html += "<p><button class='btn btn-pri' type='button' data-act='ending-A'>Continue</button></p>";
  } else {
    html += "<p>You did not batch-cancel. The system made a note of your operating pattern.</p>";
    html += "<p><button class='btn btn-pri' type='button' data-act='start-n3'>Start night 3</button> " +
      "<button class='btn' type='button' data-act='review'>Back to terminal</button></p>";
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
    title: "Data consistency anomaly",
    body: "<p>On the sort grid, the Qingshi Village / Lianhua Village cell is highlighted.</p>" +
      "<p>The following records have a status conflict:</p>" +
      "<table class='oa'><tr><th>Name</th><th>Address</th><th>Address status</th><th>Person status</th></tr>" + rows +
      "<tr><td colspan='4'>…… (79 records in total have a status conflict)</td></tr></table>" +
      "<p>System recommends: batch-cancel records with anomalous address status, to restore data consistency.<br>Estimated impact: 79.</p>",
    buttons: [
      { label: "Confirm batch cancel", act: "decision-batch", danger: true },
      { label: "Handle one by one", act: "decision-one", pri: true },
      { label: "Look at the grid first", act: "close" }
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
  logAct("Batch cancel 79");
  toast("Batch cancel executed. Anomaly queue cleared.");
  closeDialog();
  showNightBreak2();
}

function doOneByOne() {
  state.batchChoice = "one";
  state.playerMarked = "watch";
  logAct("Chose one-by-one");
  toast("System rated operating pattern as deviant from normal. Anomaly tags begin appearing on the personal record.");
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
        title: "Slip in the pages",
        body: "<p>A slip is stuck in the last page, fountain pen, messier than the log:</p><p>" + CHEN_NOTE + "</p>",
        buttons: [{ label: "Put the slip away", act: "close", pri: true }]
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
    toast("Retrieved 1998-04-12 operation record");
    logAct("Query 1998-04-12", String(state.query1998Count));
  } else if (up === "BIND-1998-03" || up === "BIND199803") {
    state.darkLineADecoded = true;
    state.histResult = "bind";
    toast("Graffiti decoded");
    logAct("Decode dark line A");
  } else if (up === "HIST-ARCHIVE") {
    state.viewed["hist-archive"] = true;
    state.histResult = "archive";
    toast("Archive command valid. Available at the final sequence.");
  } else if (up === "FF-ARCHIVE") {
    state.viewed["ff-archive"] = true;
    state.histResult = "ff";
    toast(state.darkLineADecoded ? "Reserved address FF-ARCHIVE exists." : "No privilege to view that address space.");
  } else if (raw === "吴桂芳" || up === "WGF" || up === "WUGUIFANG") {
    state.wgfTimeline = true;
    state.histResult = "wgf";
    state.pushed.persons.push("p-wgf");
    toast("Loaded Wu Guifang linked timeline");
  } else {
    state.histResult = "miss";
    toast("No such operation record, or insufficient privilege");
  }
  renderAll();
}

function startZhaoChat() {
  state.zhaoOpen = true;
  state.zhaoChatStep = 0;
  state.zhaoLines = [
    { who: "zhao", text: "You pulled the April 1998 operation record last night, didn't you." }
  ];
  openDialog({
    title: "Internal IM",
    body: "<p>Zhao Deming did not clock out tonight. A message hit your terminal.</p>",
    buttons: [{ label: "Open IM window", act: "chat-silence", pri: true }]
  });
}

function chatAdvance(key) {
  closeDialog();
  state.zhaoOpen = true;
  if (key === "silence") {
    state.zhaoLines.push({ who: "lin", text: "……" });
    state.zhaoLines.push({ who: "zhao", text: "The merge wasn't my call. I entered what they approved. Wu Guifang hadn't signed yet when she left. She died later. That has nothing to do with the merge. Compensation was calculated by the resettlement office off the paperwork. We just deliver the mail. I don't know the rest." });
    state.zhaoChatStep = 1;
  } else if (key === "pkg") {
    state.zhaoLines.push({ who: "lin", text: "You get a parcel from Wu Guifang every year. How do you explain that?" });
    state.zhaoLines.push({ who: "zhao", text: "Those parcels are from Guodong. He stirred a lot in the months he was here. He sent them, I signed them, so the system wouldn't wipe that last thread." });
    state.zhaoChatStep = 2;
  } else if (key === "why") {
    state.zhaoLines.push({ who: "lin", text: "Then why did you merge the data that year?" });
    state.zhaoLines.push({ who: "zhao", text: "If we didn't merge them, Lianhua's whole household file would have been cancelled. Merge into Qingshi, the roster at least stays. At the time I just wanted a copy left on file." });
    state.zhaoChatStep = 3;
    state.zhaoChatDone = true;
  } else if (key === "visit") {
    state.zhaoToldVisit = true;
    state.zhaoChatDone = true;
    state.zhaoLines.push({ who: "lin", text: "(push the screening image over)" });
    state.zhaoLines.push({ who: "zhao", text: "She came to see me before she left. Asked me to look up a file. I didn't. Next day she was gone. I thought she walked out on her own. Later I found out she didn't." });
    toast("This will not be written into the system record.");
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
  if (state.darkLineADecoded) extra += "<p class='meta'>Dark line decoded: redirect bind is available.</p>";
  if (state.logFullyRead) extra += "<p class='meta'>Backdoor archive command HIST-ARCHIVE is available.</p>";
  openDialog({
    wide: true,
    title: "System final prompt",
    body: "<p>Detected 79 records held long-term in [Pending review].<br>" +
      "Detected 3 operators (Zhao Deming, Chen Guodong, Lin Yuan) with a direct link to the above records.<br>" +
      "Detected a status anomaly on current operator [Lin Yuan]'s own record (shares merge code with Liu Xiaomei, Chen Siyuan).</p>" +
      "<p>System recommends the following sequence:<br>" +
      "Step 1: Unbind the shared code (split Lin Yuan, Liu Xiaomei, Chen Siyuan into independent records)<br>" +
      "Step 2: Confirm status of 79 pending-review records one by one (cancel or activate)<br>" +
      "Step 3: Confirm operator Chen Guodong record status (currently Cancelled; recommend confirm)<br>" +
      "Step 4: Perform self-status confirmation on current operator Lin Yuan</p>" + extra,
    buttons: [
      { label: "Execute all recommended", act: "final-all", danger: true },
      { label: "Execute selected", act: "final-some", pri: true },
      { label: "Refuse all operations", act: "final-none" },
      { label: "Later", act: "close" }
    ]
  });
}

function openFinalForm() {
  var splitOpts = "<label><input type='radio' name='f-split' value='none' checked> Do not process own bind</label>" +
    "<label><input type='radio' name='f-split' value='split'> Unbind (split into independent records)</label>";
  if (state.darkLineADecoded) {
    splitOpts += "<label><input type='radio' name='f-split' value='redirect'> Redirect to reserved address FF-ARCHIVE</label>";
  }
  var recOpts = "<label><input type='radio' name='f-rec' value='mix' checked> One by one: activate some, cancel some (do not process self)</label>";
  if (state.logFullyRead || state.viewed["hist-archive"]) {
    recOpts += "<label><input type='radio' name='f-rec' value='archive'> Use backdoor: archive instead of cancel</label>";
  }
  recOpts += "<label><input type='radio' name='f-rec' value='batch'> Switch to batch cancel</label>";
  var wgfOpts = "<label><input type='radio' name='f-wgf' value='keep' checked> Leave Wu Guifang (keep Active)</label>";
  if (state.logFullyRead) {
    wgfOpts += "<label><input type='radio' name='f-wgf' value='archive'> Change Wu Guifang to file-sealed</label>";
  }
  wgfOpts += "<label><input type='radio' name='f-wgf' value='cancel'> Cancel Wu Guifang</label>";
  openDialog({
    wide: true,
    title: "Execute selected",
    body: "<div class='final-step'><b>Step 1 Shared code</b>" + splitOpts + "</div>" +
      "<div class='final-step'><b>Step 2 79 pending review</b>" + recOpts + "</div>" +
      "<div class='final-step'><b>Step 3 Chen Guodong</b>" +
      "<label><input type='radio' name='f-chen' value='confirm' checked> Confirm cancelled</label>" +
      "<label><input type='radio' name='f-chen' value='skip'> Do not process</label></div>" +
      "<div class='final-step'><b>Step 4 Lin Yuan</b>" +
      "<label><input type='radio' name='f-self' value='skip' checked> Do not process self</label>" +
      "<label><input type='radio' name='f-self' value='ok'> Self-status confirm (Active)</label></div>" +
      "<div class='final-step'><b>Wu Guifang</b>" + wgfOpts + "</div>",
    buttons: [
      { label: "Execute selected", act: "final-exec", pri: true },
      { label: "Back", act: "final-back" }
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
      toast("Zhao Deming has not finished 1998. Put the 4th-piece screening image in front of him.");
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
    title: "Current address missing",
    body: "<p>Operation confirmed. Shared-code bind redirected to reserved address [FF-ARCHIVE].</p>" +
      "<p>Detected empty current delivery address on operator. Enter a valid administrative-division address to complete the file update:</p>" +
      "<p>Enter your new address below:</p>" +
      "<p><input id='new-addr' style='width:100%;height:28px' maxlength='40' placeholder='Any address'></p>",
    buttons: [{ label: "Confirm", act: "final-addr", pri: true }]
  });
}

function commitRedirect() {
  var el = document.getElementById("new-addr");
  state.newAddress = el && el.value ? el.value : "(not entered)";
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
    html = "<h2>Ending A　Clean records</h2>" +
      "<p>Night three ended. The system went quiet. The returns bin was empty. No more return letters. No more anomalous signatures. Lin Yuan worked a 'normal' night shift for the first time — nothing happened. Scan, sort, file.</p>" +
      "<p>Next morning Zhao Deming came for handover. He glanced at the anomaly log — blank. He said, 'You pick it up fast. We'll make you permanent this week.'</p>" +
      "<p>Lin Yuan asked, 'What about the Qingshi Village records?'</p>" +
      "<p>Zhao Deming opened the address book and typed 'Qingshi Village'. The system returned: 'No matching result.'</p>" +
      "<p>Lin Yuan opened his phone album. The old photo was still there. He recognized the woman standing next to him. He could not remember her name. He thought about it — maybe he never knew her. Maybe it was just a snapshot from when he was a kid. He swiped it away.</p>" +
      "<p>He became a good operator. Every night shift after that went the same way — no anomalies. No problems.</p>" +
      "<p>Three years later Zhao Deming retired. Lin Yuan took over as postmaster. He did a lot in the job — digitized postal operations, got parcels into the villages. He was named an advanced worker. Nobody knew that on his first night shift, there had been a person in the system named Shen Xiulan.</p>";
  } else if (id === "B") {
    html = "<h2>Ending B　Blurred boundary</h2>" +
      "<p>Lin Yuan spent three night shifts handling records one by one. He looked at each file — name, age, last active date. He chose by his own judgment: some records he marked 'Active' (visible again), some he confirmed cancelled (admitting death).</p>" +
      "<p>He did not process his own record. He did not unbind from Liu Xiaomei and Chen Siyuan.</p>" +
      "<p>A week later the system popped: operator Lin Yuan record has a status anomaly (shared bind not released). Marked [Pending review].</p>" +
      "<p>He had two months. Within two months he either processed his own data (split the bind), or the system processed him (cancel).</p>" +
      "<p>He chose not to process it.</p>" +
      "<p>Two months later the record flipped to 'Cancelled' on its own.</p>" +
      "<p>Lin Yuan disappeared from the postal system. No dismissal notice. No resignation paperwork. His staff ID went grey — same as Zhou Hai.</p>" +
      "<p>Unlike the others, his data was not fully purged. His record is bound to two other people. The system cannot cancel him alone without affecting Liu Xiaomei and Chen Siyuan. He became a hard block in the system — cannot be cleaned, cannot run normally, stuck forever at 'Cancelled (link not released)'.</p>" +
      "<p>That is his ending: he became someone the system cannot digest. Same as Wu Guifang's data.</p>";
  } else if (id === "C") {
    html = "<h2>Ending C　Successor</h2>" +
      "<p>After all operations completed, the system was quiet for thirty seconds. Then Lin Yuan got a system message:</p>" +
      "<p>'Detected operator [Lin Yuan] has completed archive processing of all anomalous records at this office.<br>Detected historical operation anomaly on former postmaster [Zhao Deming] staff ID.<br>System judgment: Zhao Deming is no longer fit to continue as postmaster.<br>Operator Lin Yuan qualifies for postmaster privilege.</p>" +
      "<p>Accept postmaster privilege transfer? [Accept] [Refuse]'</p>" +
      "<p>Lin Yuan chose [Accept].</p>" +
      "<p>Zhao Deming's staff ID status changed from 'Active' to 'Cancelled (privilege transfer)'. The system did not ask Zhao Deming.</p>" +
      "<p>Lin Yuan's staff ID upgraded from 'Operator' to 'Postmaster'.</p>" +
      "<p>Next morning he opened the postmaster's office. Half a cup of cold tea and a pair of reading glasses on Zhao Deming's desk. The man was gone — nobody knows where. In the system record, Zhao Deming's last operation is 'Privilege transfer confirm' — he never hit confirm on the keyboard.</p>" +
      "<p>The post office opened as usual. Lin Yuan, new postmaster, started handling daytime business. Townspeople came to send letters and pick up parcels. Nobody knew what happened last night.</p>" +
      "<p>Lin Yuan opened the system and looked up Wu Guifang. Status: 'File sealed'. He looked up Shen Xiulan — status: 'Archived'.</p>" +
      "<p>He suddenly thought: is there a record about him? He looked up his own name.</p>" +
      "<p>The system returned:</p>" +
      "<p>Lin Yuan, male, 38, current postmaster of this office. Status: Active.<br>Note: included in the Qingshi–Lianhua merge code in the 1998-04-12 administrative division adjustment. Bind released by self in 2026. Historical linked records: (blank).</p>" +
      "<p>'Historical linked records: (blank)'. He does not remember Shen Xiulan. He does not remember that his data was once bound to two other people. He does not remember living in Qingshi Village as a child.</p>" +
      "<p>He knows he just took over as postmaster. He knows his last job was night-shift sorter. He cannot remember why he came to work at the post office, or what happened those three nights — he can see dozens of operations in the log, all under his name, and he does not remember doing them.</p>" +
      "<p>He picked up his phone. An old photo in the album — end of the dirt road at the village gate, a ten-year-old boy, a woman standing next to him. He does not know who the woman is.</p>" +
      "<p>His finger stopped on delete.</p>" +
      "<p><button class='btn btn-danger' type='button' data-act='del-photo'>Delete photo</button> " +
      "<button class='btn' type='button' data-act='keep-photo'>Keep it</button></p>";
  } else if (id === "D") {
    html = "<h2>Ending D　The third child</h2>" +
      "<p>Operation confirmed. Shared-code bind redirected to reserved address [FF-ARCHIVE].<br>Records affected: 3.<br>Current status: sealed.<br>Note: sealed records cannot be retrieved, cannot be modified, cannot be cancelled.<br>These records will persist until the system stops running.</p>" +
      "<p>Then a second message:</p>" +
      "<p>Bind redirect complete. Operator [Lin Yuan] and linked records [Chen Siyuan], [Liu Xiaomei] moved to reserved partition [FF-ARCHIVE].<br>Record attribute: permanently sealed (not retrievable, not overwritable, not cancellable).</p>" +
      "<p>Detected empty current delivery address on operator.</p>" +
      "<p>File update complete. Current delivery address: [" + esc(state.newAddress) + "].<br>Former linked address [Qingshi Village, Group 3 (old)] unbound. New address: Lin Yuan of [" + esc(state.newAddress) + "].</p>" +
      "<p>Sealed records are retained for the life of the system, until the system stops running.</p>" +
      "";
  }
  if (id !== "C") {
    html += "<p style='margin-top:18px'><button class='btn' type='button' data-act='restart'>Restart shift</button></p>";
  }
  document.getElementById("ending-copy").innerHTML = html;
  showScreen();
}

function finishEndingC(del) {
  state.photoDeleted = del;
  var html = document.getElementById("ending-copy").innerHTML;
  html = html.replace(/<p><button class='btn btn-danger'[\s\S]*?<\/p>/, "");
  html += del
    ? "<p>The photo is gone. The screen dimmed. Game over.</p>"
    : "<p>The photo is still there. He still does not know the person in it. Game over.</p>";
  html += "<p style='margin-top:18px'><button class='btn' type='button' data-act='restart'>Restart shift</button></p>";
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
    logAct("Training pieces processed by procedure", m.id);
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
  document.getElementById("night-chip").textContent = "Night " + state.night;
  document.getElementById("pending-n").textContent = String(state.pendingCount);
  var pc = document.getElementById("pending-chip");
  pc.className = "chip" + (state.pendingCount >= 5 ? " hot" : state.pendingCount > 0 ? " warn" : "");
  document.getElementById("btn-pause").textContent = state.paused ? "Resume" : "Pause";
  document.querySelectorAll("[data-act=speed]").forEach(function (b) {
    b.classList.toggle("on", +b.getAttribute("data-v") === state.speed);
  });
  document.getElementById("sb-q").textContent = String(queueMails().length);
  document.getElementById("sb-done").textContent = String(arrivedMails().filter(function (m) { return ms(m.id).status === "done"; }).length);
  var phaseMsg = ({
    tutorial: "Training · Zhao Deming online",
    shift: "Night " + state.night + " in progress",
    wrap: "Night 1 wrap-up",
    ended: "Night shift ended"
  })[state.phase];
  if (state.night === 2 && state.phase === "shift") phaseMsg = "Night 2 · system assembling a string";
  if (state.night === 3 && state.phase === "shift") phaseMsg = "Night 3 · wrap";
  document.getElementById("sb-msg").textContent = phaseMsg || "Night scan desk ready";
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
      (t.who === "lin" ? "Lin: " : "Zhao: ") + esc(t.text) + "</p>";
  }).join("");
  if (state.night === 3 && state.zhaoChatStep === 0) {
    html += '<p><button class="btn" data-act="chat-silence">……</button></p>';
  } else if (state.zhaoChatStep === 1) {
    html += '<p><button class="btn" data-act="chat-pkg">You get a parcel from Wu Guifang every year. How do you explain that?</button></p>';
  } else if (state.zhaoChatStep === 2) {
    html += '<p><button class="btn" data-act="chat-why">Then why did you merge the data that year?</button></p>';
  } else if (state.zhaoChatStep >= 3 && state.xray2Viewed && !state.zhaoToldVisit) {
    html += '<p><button class="btn btn-warn" data-act="show-xray-zhao">Push him the screening image</button></p>';
  }
  document.getElementById("zhao-body").innerHTML = html;
}

function renderStation() {
  var fn = [null, renderSt1, renderSt2, renderSt3, renderSt4, renderSt5, renderSt6][state.station];
  if (fn) fn();
}

function lampFor(m) {
  if (!ms(m.id).scanned) return { cls: "off", t: "Not scanned" };
  var st = villageStatus(m.village);
  if (m.anomaly && m.anomaly.type === "xray-shadow") return { cls: "warn", t: "Screening anomaly" };
  if (st === "cancelled" || st === "merged" || m.type === "return") return { cls: "bad", t: "Address anomaly" };
  return { cls: "ok", t: "Check passed" };
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
      esc(x.receiver) + "</b><div class=\"meta\">" + esc(x.barcode) + " · " + esc(x.type === "return" ? "Return" : x.type === "package" ? "Parcel" : "Letter") +
      (x.arriveAt ? " · " + x.arriveAt : " · training") + "</div></div><div class=\"meta\">" + esc(statusCn(st.status)) + "</div></div>";
  }).join("") || '<div class="hint">Queue empty</div>';

  var mid = "<div class='hd'>Mail detail</div><div class='detail'>";
  if (!m) mid += "<p class='meta'>Select a piece on the left</p>";
  else {
    var L = lampFor(m);
    var addrCls = (m.type === "return" || villageStatus(m.village) !== "active") ? "field-warn" : "";
    var rec = person(m.receiverId);
    mid += '<div class="scanbed' + (state.scanning ? " scanning" : "") + '"><div class="barcode"></div><div class="scanline"></div></div>';
    mid += '<div><span class="lamp ' + L.cls + '"></span>' + L.t + "</div>";
    mid += '<div class="kv"><b>Barcode</b><span>' + esc(m.barcode) + "</span>";
    mid += "<b>Type</b><span>" + esc(typeCn(m.type)) + "</span>";
    mid += "<b>Sender</b><span>" + esc(m.sender) + (m.senderId ? ' <button class="btn" data-act="open-person" data-id="' + m.senderId + '">File</button>' : "") + "</span>";
    if (m.acroChar) {
      mid += "<b>Sender addr</b><span><span class='acro-hi'>" + esc(m.acroChar) + "</span>" + esc((m.senderAddr || "").slice(m.acroChar.length)) + "</span>";
    } else {
      mid += "<b>Sender addr</b><span class='" + (m.senderId === "p-wgf" ? "field-warn" : "") + "'>" + esc(m.senderAddr) + (m.senderId === "p-wgf" ? " ⚠" : "") + "</span>";
    }
    mid += "<b>Recipient</b><span>" + esc(m.receiver) + (m.receiverId ? ' <button class="btn" data-act="open-person" data-id="' + m.receiverId + '">File</button>' : "") + "</span>";
    mid += "<b>Recipient addr</b><span class='" + addrCls + "'>" + esc(m.receiverAddr) + (addrCls ? " ⚠" : "") + "</span>";
    mid += "<b>Weight</b><span>" + esc(m.weight) + "</span>";
    if (m.note) mid += "<b>Note</b><span>" + esc(m.note) + "</span>";
    if (m.returnReason) mid += "<b>Return reason</b><span class='field-warn'>" + esc(m.returnReason) + "</span>";
    if (m.xray === "two") {
      mid += "</div><div class='xray two'><img src='" + IMG_XRAY2 + "' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover'><div class='noise'></div><div class='cap' style='position:absolute;bottom:4px;left:6px;color:#8f8;font-size:10px;z-index:2'>XRAY · empty parcel · two shadows</div></div><div class='kv'>";
    } else if (m.xray) {
      mid += "</div><div class='xray' class='xray'><img src='" + IMG_XRAY1 + "' style='position:absolute;inset:0;width:100%;height:100%;object-fit:cover'><div class='cap' style='position:absolute;bottom:4px;left:6px;color:#8f8;font-size:10px;z-index:2'>XRAY · clothing · low res</div></div><div class='kv'>";
    }
    if (rec && state.personMarks[rec.id] === "cancelled") mid += "<b>Person</b><span class='field-dead'>" + esc(rec.name) + " Cancelled</span>";
    if (rec && state.personMarks[rec.id] === "pending") mid += "<b>Person</b><span class='field-warn'>" + esc(rec.name) + " Pending review</span>";
    mid += "</div>";
    if (m.village === "v-qingshi" || m.village === "v-lianhua") {
      mid += '<p class="meta"><button class="btn" data-act="open-vill" data-id="' + m.village + '">Open this division in the address book</button></p>';
    }
    if (m.senderId === "p-wgf") {
      mid += '<p class="meta"><button class="btn" data-act="open-person" data-id="p-zhao">View Zhao Deming inbound records</button></p>';
      if (m.xray === "two") mid += '<p class="meta"><button class="btn btn-warn" data-act="show-xray-zhao">Push the screening image to Zhao Deming</button></p>';
    }
  }
  mid += "</div>";

  var canScan = m && !ms(m.id).scanned && ms(m.id).status !== "done";
  var canOk = m && ms(m.id).scanned && ms(m.id).status !== "done" && !m.anomaly;
  var canDec = m && ms(m.id).scanned && ms(m.id).status !== "done" && m.anomaly;
  var right = "<div class='hd'>Actions</div><div class='actions'>";
  right += '<button class="btn btn-pri' + (state.guide === "scan" || state.guide === "select" ? " guide" : "") + '" data-act="scan"' + (canScan ? "" : " disabled") + ">Scan barcode</button>";
  right += '<button class="btn' + (state.guide === "confirm" ? " guide" : "") + '" data-act="confirm-mail"' + (canOk ? "" : " disabled") + ">Confirm process</button>";
  if (canDec && m.type === "return") {
    right += '<button class="btn btn-danger" data-act="decide-cancel" data-id="' + m.id + '">Confirm cancel</button>';
    right += '<button class="btn btn-warn" data-act="decide-pend" data-id="' + m.id + '">Mark pending review</button>';
  }
  if (canDec && m.xray) {
    right += '<button class="btn btn-warn" data-act="decide-scan-bad" data-id="' + m.id + '">Flag anomaly</button>';
    right += '<button class="btn" data-act="decide-scan-ok" data-id="' + m.id + '">Release as normal</button>';
  }
  if (!state.tutorialDone && state.tutorialProcessed >= 2) {
    right += '<button class="btn btn-ghost" data-act="flush-tut">Process remaining training pieces by procedure</button>';
  }
  right += "</div><div class='hint'>Night terminal has no search box. Linked records are pushed by the system, or entered from a field.</div>";

  document.getElementById("st1").innerHTML = '<div class="hd">Scan queue' +
    (!state.tutorialDone ? "　training " + state.tutorialProcessed + "/" + TUTORIAL_NEED : "　" + queueMails().length + " pending") +
    '</div><div class="split"><div class="col col-l">' +
    left + '</div><div class="col col-m">' + mid + '</div><div class="col col-r">' + right + "</div></div>";
}

function renderSt2() {
  var pending = arrivedMails().filter(function (m) { return ms(m.id).status !== "waiting" && ms(m.id).status !== "inbox"; });
  var cells = [
    ["v-beiling", "Beiling Village"],
    ["v-res", "Reservoir"],
    ["v-donghe", "Donghe Village"],
    ["v-xigang", "Xigang Village"],
    ["v-qingshi", "Qingshi / Lianhua"],
    ["v-nanwan", "Nanwan Village"],
    ["v-center", "Center Street"],
    ["v-gov", "Town gov."],
    ["v-po", "Post Office"]
  ];
  var assigned = Object.keys(state.assignments).length;
  var total = Math.max(assigned, pending.length, 1);
  var hotGrid = state.eventsFired["DECISION-002"] || (state.night === 2 && state.clockMin >= timeToMin("01:00"));
  var map = '<div class="map">' + cells.map(function (c) {
    var v = village(c[0] === "v-qingshi" ? "v-qingshi" : c[0]);
    var dead = v && (v.status === "cancelled" || v.status === "merged" || c[0] === "v-res");
    var hot = dead && (state.pendingCount > 0 || hotGrid) && (c[0] === "v-qingshi");
    var who = "";
    if (c[0] === "v-qingshi") who = "Staff ID 0947 Zhou Hai (route not deleted)";
    else if (COURIER_MAP[c[0]]) {
      var cr = person(COURIER_MAP[c[0]]);
      who = cr ? cr.name + " " + cr.jobNo : "";
    }
    return '<div class="cell' + (dead ? " dead" : "") + (hot ? " hot" : "") + '" data-act="open-vill" data-id="' +
      (c[0] === "v-qingshi" ? "v-qingshi" : c[0]) + '"><b>' + esc(c[1]) + '</b><div class="tag">' +
      (dead ? (v && v.note ? v.note : "Revoked") : who) + "</div></div>";
  }).join("") + "</div>";
  var left = pending.map(function (m) {
    var asg = state.assignments[m.id];
    var cr = asg ? person(asg) : null;
    return '<div class="list-item' + (m.anomaly ? " anomaly" : "") + '" data-act="sel-mail" data-id="' + m.id +
      '"><div class="dot"></div><div><b>' + esc(m.receiver) + "</b><div class=\"meta\">" +
      (cr ? esc(cr.name) : "Unassigned") + " · " + esc(m.receiverAddr) + "</div></div></div>";
  }).join("") || '<div class="hint">No scanned mail yet</div>';
  var right = "<div class='hd'>Assigned</div>" + Object.keys(state.assignments).map(function (id) {
    var m = mail(id); var cr = person(state.assignments[id]);
    if (!m) return "";
    return '<div class="list-item"><div class="dot"></div><div><b>' + esc(m.barcode.slice(-4)) + "</b><div class=\"meta\">" +
      esc(m.receiver) + " → " + esc(cr ? cr.name : "") + "</div></div></div>";
  }).join("");
  var drawer = "";
  if (state.eventsFired["DECISION-002"] && !state.batchChoice) {
    drawer += '<div class="oa-foot alert"><b>Data consistency anomaly · 79</b> Qingshi/Lianhua cell flashing.<br>' +
      '<button class="btn btn-danger" data-act="decision-batch">Confirm batch cancel</button> ' +
      '<button class="btn btn-pri" data-act="decision-one">Handle one by one</button></div>';
  }
  if (state.drawerUnlocked || (state.night >= 2 && state.clockMin >= timeToMin("21:30"))) {
    drawer += '<button type="button" class="drawer-btn' + (state.logFullyRead ? "" : " hot") + '" data-act="log-open">Workbench drawer　' +
      (state.logOpen ? "Duty log (open)" : "A duty log that was never filed") + "</button>";
  }
  if (state.logOpen) {
    var pg = CHEN_LOG[state.logPage];
    drawer += '<div class="log-book"><h3>Duty log · ' + esc(pg.date) + "　" + (state.logPage + 1) + "/" + CHEN_LOG.length +
      "</h3><img src='" + IMG_LOGBOOK + "' style='width:100%;max-height:130px;object-fit:cover;opacity:.5;margin:0 0 8px;filter:sepia(.3)'><p>" + pg.body + "</p>";
    if (state.logPage === CHEN_LOG.length - 1) {
      drawer += '<div class="graffiti" title="Almost unreadable graffiti"><span class="dim">///</span>B<span class="dim">?</span>IND<span class="dim">/</span>-1998<span class="dim">..</span>-03<span class="dim">///</span><br>' +
        '<span class="dim">C:\\ADDR\\HIST　</span>opcode</div>' +
        '<p class="meta"><button class="btn" data-act="goto-hist">Play back by opcode in the address book</button></p>';
    }
    drawer += '<div class="log-nav"><button class="btn" data-act="log-prev"' + (state.logPage === 0 ? " disabled" : "") +
      ">Prev</button><span class='meta'>Pencil. Reads like a tech note</span><button class='btn' data-act='log-next'" +
      (state.logPage === CHEN_LOG.length - 1 ? " disabled" : "") + ">Next</button></div></div>";
  }
  document.getElementById("st2").innerHTML = '<div class="hd">To sort / delivery grid</div>' + drawer + '<div class="split"><div class="col col-l">' +
    left + '</div><div class="col col-m"><div class="prog"><i style="width:' + Math.round(assigned / total * 100) +
    '%"></i></div>' + map + '</div><div class="col col-r">' + right + "</div></div>";
}

function renderSt3() {
  var dow = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var cells = "";
  dow.forEach(function (d) { cells += '<span class="dow">' + d + "</span>"; });
  var first = new Date(2026, 7, 1).getDay();
  for (var i = 0; i < first; i++) cells += '<span class="mute"></span>';
  for (var d = 1; d <= 31; d++) {
    cells += '<span class="' + (d === 19 + state.night ? "today" : "") + '">' + d + (d === 19 + state.night ? " Nt" : "") + "</span>";
  }
  var people = PERSONS.filter(function (p) {
    return p.role === "Courier" || p.role === "Postmaster" || p.role === "Operator" || state.pushed.persons.indexOf(p.id) >= 0;
  });
  var cards = people.map(function (p) {
    var dead = markedDead(p);
    var on = state.selectedPersonId === p.id;
    return '<div class="card' + (dead ? " dead" : "") + (state.personMarks[p.id] === "pending" ? " pend" : "") + (on ? " on" : "") + '" data-act="open-person" data-id="' + p.id +
      '"><div class="photo" style="' + photoStyle(p.id) + '"></div><div><div class="nm"><b>' + esc(p.name) + "</b> " +
      (p.jobNo ? esc(p.jobNo) : "") +     (p.status === "deceased" ? '<span class="stamp">Died on duty</span>' : "") +
      (p.status === "cancelled" || state.personMarks[p.id] === "cancelled" ? '<span class="stamp">Cancelled</span>' : "") +
      (state.personMarks[p.id] === "pending" ? '<span class="stamp">Pending</span>' : "") +
      "</div><div class=\"meta\">" + esc(p.role) + (p.route ? " · " + esc(p.route) : "") + "</div>" +
      "<div class=\"meta\">" + statusLabel(p) + "</div></div></div>";
  }).join("");
  var detail = personDetail(state.selectedPersonId);
  document.getElementById("st3").innerHTML = '<div class="hd">August 2026 roster</div><div class="cal">' + cells +
    '</div><div class="hd">Personnel cards</div><div class="roster">' + cards + "</div><div class='detail'>" + detail + "</div>";
}

function statusLabel(p) {
  var mk = state.personMarks[p.id];
  if (mk === "pending") return "Pending review";
  if (mk === "cancelled") return "Cancelled";
  if (p.status === "active") return "On duty / Active";
  if (p.status === "deceased") return "Cancelled (died on duty)";
  if (p.status === "cancelled") return "Cancelled";
  if (p.status === "missing") return "Missing";
  return p.status;
}
function markedDead(p) {
  return p.status === "deceased" || p.status === "cancelled" || state.personMarks[p.id] === "cancelled";
}

function personDetail(id) {
  var p = person(id);
  if (!p) return "<p class='meta'>Enter a file from a pushed record or a mail field. No search on night shift.</p>";
  var v = village(p.village);
  var html = '<div class="kv"><b>Name</b><span>' + esc(p.name) + "</span><b>Staff ID</b><span>" + esc(p.jobNo || "—") +
    "</span><b>Role</b><span>" + esc(p.role) + "</span><b>Status</b><span class='" +
    (markedDead(p) ? "field-dead" : state.personMarks[p.id] === "pending" ? "field-warn" : "") +
    "'>" + esc(statusLabel(p)) + "</span><b>Address</b><span>" + esc(v ? v.name : "") + (p.group ? " " + p.group : "") + "</span>";
  if (p.route) html += "<b>Route</b><span>" + esc(p.route) + (p.id === "p-zhou" ? "　System never deleted this route" : "") + "</span>";
  if (p.died) html += "<b>Died on duty</b><span class='flicker'>" + esc(p.died) + "</span>";
  if (p.cancelledAt) html += "<b>Cancelled at</b><span>" + esc(p.cancelledAt) + "</span><b>Operator</b><span class='field-warn'>" +
    (p.cancelledBy === "" ? "(blank)" : esc(p.cancelledBy)) + "</span>";
  if (p.note) html += "<b>Note</b><span>" + esc(p.note) + "</span></div>";
  else html += "</div>";
  if (p.id === "p-zhao") {
    html += "<p><b>Inbound records (system push)</b></p><table class='oa'><tr><th>Year</th><th>Sender</th><th>Handling</th></tr>" +
      ZHAO_MAIL.map(function (r) {
        return "<tr><td>" + r.year + "</td><td>Wu Guifang · Lianhua Village, Group 3</td><td>" + r.note + "</td></tr>";
      }).join("") + "</table><p class='meta'>One a year for the past three years. All marked by Zhao Deming as Signed — addressee.</p>";
  }
  if (p.id === "p-wgf") {
    html += "<p class='meta'>Lianhua Village and Qingshi Village share the same administrative code. Both statuses are revoked (1998, reservoir construction). This person's status is still Active.</p>";
    if (state.wgfTimeline || state.query1998) {
      html += "<p><b>Linked timeline</b></p><ul>" + WGF_TL.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
    }
  }
  if (p.id === "p-zhou") {
    html += "<p class='meta'>Click a receipt to check the signature image. After the reservoir, the Qingshi Route theoretically has no residents.</p>";
  }
  if (p.id === "p-lin" || (p.relationCodes && p.relationCodes.indexOf("BIND-1998-03") >= 0 && (state.bindViewed || state.night >= 3))) {
    html += "<p class='field-warn'><b>Linked historical address</b>: Qingshi Village, Group 3 (pre-relocation)<br>Note: in the 1998-04-12 administrative division adjustment, this person shares merge code BIND-1998-03 with:</p>" +
      "<p>Liu Xiaomei (female, age 6 in 1998)　Lin Yuan (male, age 10 in 1998)　Chen Siyuan (male, age 8 in 1998; Chen Guodong's originally registered name)</p>" +
      '<p><button class="btn" data-act="open-person" data-id="p-lxm">Liu Xiaomei</button> ' +
      '<button class="btn" data-act="open-person" data-id="p-csi">Chen Siyuan</button> ' +
      '<button class="btn" data-act="open-person" data-id="p-lin">Lin Yuan</button></p>';
  }
  if (state.darkLineADecoded && (p.id === "p-lin" || p.id === "p-csi" || p.id === "p-lxm")) {
    html += "<p class='meta'>Decoded record: before cancellation Chen Guodong changed the shared-code bind of three children. The system restores the default bind after he is cancelled. Only a manual split confirm by the current operator takes effect.</p>";
  }
  if (state.wrapShown && state.night === 1) {
    html += '<p><button class="btn btn-pri" data-act="end-night">End night shift</button> <button class="btn" data-act="goto-wrap5">Back to returns wrap-up</button></p>';
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
      if (v.id === "v-qingshi" && state.pendingCount) extra += "  PENDING-SPREAD";
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
  var right = "<div class='hd'>RECORD</div><div class='crt'>";
  if (v) {
    right += "NAME=" + esc(v.name) + "\nCODE=" + esc(v.code) + "\nSTATUS=" + esc(v.status).toUpperCase() + "\n";
    if (v.note) right += "<span style='color:#ffff00'>" + esc(v.note) + "</span>\n";
    if (v.activeCount != null) right += "ACTIVE_PERSONS=" + v.activeCount + "\n";
    if (v.id === "v-qingshi") {
      right += "\n<span style='color:#ff6b6b'>WARN: this village still has 34 active personnel records.</span>\n";
      PERSONS.filter(function (p) { return p.village === "v-qingshi"; }).forEach(function (p) {
        var c = state.personMarks[p.id] === "pending" ? "pend" : (markedDead(p) ? "rev" : "");
        right += '<div class="tree-line ' + c + '" data-act="open-person" data-id="' + p.id + '">  ' +
          p.name + "  " + (p.group || "") + "  " + statusLabel(p) + "</div>";
      });
      right += "\nRemaining records collapsed (system total 34).";
    }
    if (v.id === "v-lianhua") {
      PERSONS.filter(function (p) { return p.village === "v-lianhua" && (p.id === "p-wgf" || state.pushed.persons.indexOf(p.id) >= 0); }).forEach(function (p) {
        right += '<div class="tree-line" data-act="open-person" data-id="' + p.id + '">  ' + p.name + "  " + statusLabel(p) + "</div>";
      });
    }
    if (state.histResult === "1998" || (state.query1998 && v.id === "v-qingshi")) {
      right += "\n<span style='color:#ffff00'>--- HIST 1998-04-12 ---</span>\n<div class='op-rec'>" + esc(OP_1998).replace("(blank — no approval number, no superior-order number)", "<span class='blank'>(blank — no approval number, no superior-order number)</span>") + "</div><img src='" + IMG_ARCHIVE + "' style='width:100%;max-height:130px;object-fit:cover;opacity:.72;filter:sepia(.25);margin-top:5px;border:1px solid #145014'>";
      if (state.darkLineB) {
        right += "\n<span style='color:#ffff00'>OP NOTE (hidden field): merge verbally approved by Director Zhang, County Resettlement Office. Director Zhang is no longer in this system's jurisdiction. His operation record cannot be retrieved.</span>\n";
      }
    }
    if (state.histResult === "bind") {
      right += "\n<span style='color:#ffff00'>DECODE BIND-1998-03</span>\nBefore cancellation I changed the shared-code bind of three children — I split their link. The system will restore the default bind after I am cancelled. Only a manual split confirm by the current operator takes effect. If you are reading this — are you Lin Yuan or Liu Xiaomei? Or are you nobody?\n";
    }
    if (state.histResult === "archive") {
      right += "\nArchive command HIST-ARCHIVE valid. Final sequence may write archive instead of cancel.\n";
    }
    if (state.histResult === "ff") {
      right += "\nFF-ARCHIVE reserved address space. Sealed records cannot be retrieved, modified, or cancelled.\n";
    }
    if (state.histResult === "wgf" || state.wgfTimeline) {
      right += "\n--- Wu Guifang ---\n" + WGF_TL.map(function (t) { return esc(t); }).join("\n") + "\n";
    }
  }
  right += "<span class='cursor'></span></div>";
  if (state.night >= 2 && (state.drawerUnlocked || state.eventsFired["QUERY-HINT"] || state.logFullyRead)) {
    right += "<div class='crt-q'><input id='hist-q' maxlength='32' placeholder='Date or opcode, e.g. 1998-04-12' value='" +
      esc(state.histDraft) + "'><button type='button' data-act='hist-go'>Play back</button></div>";
  }
  right += "<div class='crt-stat'>C:\\ADDR\\GRID.DAT　" +
    (state.night >= 2 && (state.drawerUnlocked || state.eventsFired["QUERY-HINT"]) ? "HIST PLAYBACK ON　NO FULL-TEXT SEARCH" : "READ-ONLY　NIGHT QUERY PRIVILEGE OFF") +
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
      (dec === "pending" ? "Pending review" : dec === "cancel" ? "Cancelled" : ms(m.id).scanned ? "Awaiting action" : "Not scanned") + "</td></tr>";
  }).join("");
  var m = mail(state.selectedMailId);
  var ops = "";
  if (m && m.type === "return" && ms(m.id).status !== "done") {
    ops = '<button class="btn btn-pri" data-act="scan">Scan and verify</button>';
    if (ms(m.id).scanned) {
      ops += ' <button class="btn btn-danger" data-act="decide-cancel" data-id="' + m.id + '">Confirm cancel</button> ' +
        '<button class="btn btn-warn" data-act="decide-pend" data-id="' + m.id + '">Mark pending review</button>';
    }
  }
  var foot = "";
  if (state.night === 1 && (state.wrapShown || state.eventsFired["NIGHT1-WRAP"])) {
    foot = '<div class="oa-foot alert"><b>Current pending-review count: ' + state.pendingCount +
      "</b><br>Recommended: batch-cancel the above records to clear the anomaly queue.<br>Last batch cancel operator: Chen Guodong (staff ID 0821)　2026-05-20　47 cancelled<br>" +
      '<button class="btn" data-act="open-person" data-id="p-chen">Open pushed file: Chen Guodong</button> ' +
      '<button class="btn btn-pri" data-act="end-night">End night shift</button></div>';
  }
  if (state.night === 2 && state.eventsFired["DECISION-002"] && !state.batchChoice) {
    foot = '<div class="oa-foot alert"><b>79 status conflicts</b><br>System recommends batch cancel.<br>' +
      '<button class="btn btn-danger" data-act="decision-batch">Confirm batch cancel</button> ' +
      '<button class="btn btn-pri" data-act="decision-one">Handle one by one</button></div>';
  }
  if (state.night === 3 && state.eventsFired["DECISION-FINAL"]) {
    foot = '<div class="oa-foot alert"><b>System final prompt pushed</b><br>' +
      '<button class="btn btn-pri" data-act="open-final">Open four-step sequence</button></div>';
  }
  if (state.nightEnded && !state.endingId && state.night === 2 && state.batchChoice === "one") {
    foot = '<div class="oa-foot"><button class="btn btn-pri" data-act="start-n3">Start night 3</button></div>';
  }
  if (state.nightEnded && !state.endingId && state.night === 1) {
    foot += '<div class="oa-foot"><button class="btn btn-pri" data-act="end-night">Enter night 1 wrap-up</button></div>';
  }
  var acro = "";
  if (state.night >= 2) {
    acro = '<div class="acro-bar"><span class="meta">Sender-address initials</span>' +
      ACRONYM_CHARS.map(function (c) {
        var cls = "acro-ch";
        if (state.acro[c]) cls += " on";
        else if (state.acroBroken[c]) cls += " miss";
        else cls += " wait";
        return '<span class="' + cls + '">' + (state.acro[c] || state.acroBroken[c] ? c : "·") + "</span>";
      }).join("") +
      "<span class='meta'>" + (acroProgress() || "Waiting for returns") + "</span></div>";
  }
  document.getElementById("st5").innerHTML = '<div class="hd">Return list</div>' + acro +
    '<div class="col" style="overflow:auto;flex:1"><table class="oa"><tr><th>Barcode</th><th>Recipient</th><th>Address</th><th>Reason</th><th>Status</th></tr>' +
    (body || "<tr><td colspan='5'>No returns yet. Returns will arrive on the clock.</td></tr>") + "</table><div class='detail'>" + ops +
    "<p class='meta'>Return reason (system tag): no such person / address does not exist / recipient deceased / village no longer exists</p></div>" + foot + "</div>";
}

function renderSt6() {
  var list = RECEIPTS.filter(function (r) { return state.receiptsArrived[r.id]; }).slice().reverse();
  var html = '<div class="hd">Delivery timeline</div><div class="tl">' + list.map(function (r) {
    var cr = person(r.courierId);
    var bad = !!r.anomaly;
    var on = state.selectedReceiptId === r.id;
    return '<div class="tl-item' + (bad ? " bad" : "") + '" data-act="sel-rcp" data-id="' + r.id +
      '" style="' + (on ? "background:#fff3f0" : "") + '"><div class="meta">' +
      (bad ? '<span class="flicker">' + esc(r.time) + "</span>" : esc(r.time)) +
      "</div><div><b>" + esc(cr ? cr.name : "") + "</b>　Staff ID " + esc(cr ? cr.jobNo : "") +
      (cr && cr.status === "deceased" ? ' <span class="stamp">Cancelled</span>' : "") +
      "</div><div class='meta'>" + esc(r.address) + " · " + esc(r.status) + " · Signed by: " + esc(r.signer) +
      "</div><div class='signpic" + (bad ? " bad" : "") + "'>" + (bad ? '<div class="scribble"></div>' : "") +
      "</div>" + (bad ? '<p class="meta">Signature image is blurred. A handwritten "Shen" is faintly visible; the strokes do not join.</p><p>' +
        '<button class="btn" data-act="open-person" data-id="p-zhou">Open personnel file</button> ' +
        '<button class="btn btn-warn" data-act="mark-zhou">Confirm anomaly</button> ' +
        '<button class="btn" data-act="ignore-zhou">Ignore</button></p>' : "") + "</div>";
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
    if (!state.decisions["r-zhou"]) { state.decisions["r-zhou"] = "anomaly"; state.pendingCount += 1; toast("Signature anomaly confirmed"); logAct("Zhou Hai signature anomaly"); }
    renderAll();
  }
  else if (act === "ignore-zhou") { state.decisions["r-zhou"] = "ignore"; toast("Receipt ignored"); renderAll(); }
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
  else if (act === "menu-sys") openDialog({ title: "System", body: "<p>Qingshi Town Post Office Registry Dispatch System v2.40</p><p>Operator: Lin Yuan 0918<br>Shift: night　Night " + state.night + "</p><p>This terminal has no external network and no search module. Address book can play back by date.</p>", buttons: [{ label: "OK", act: "close", pri: true }] });
  else if (act === "menu-help") openDialog({
    title: "Duty notes",
    body: "<p>1. Scan the barcode. Check the address lamp.<br>2. Confirm normal pieces. The system assigns a route.<br>3. Anomalies and returns go strictly by the book. Unclear records go down as Pending review for now.<br>4. Historical ledgers are retrieved by archive date.<br>5. Operate by procedure. Don't go inventing explanations. — Zhao Deming</p>",
    buttons: [{ label: "OK", act: "close", pri: true }]
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
    "Qingshi Town Post Office",
    "Registry Dispatch System v2.31",
    "",
    "Loading address library...... done",
    "Loading personnel files...... done",
    "Sync delivery grid........... done",
    "Returns queue................ standby",
    "Night-shift module........... ready",
    "",
    "Operate by procedure. Once you confirm, it won't pop again.",
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