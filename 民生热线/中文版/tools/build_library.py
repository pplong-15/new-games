#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build 280 clips + 280 unique stills. Volume must exceed Her Story (271 clips, ~11300 words)."""
from __future__ import annotations

import json
import os
import random
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[1]
_REF_BASE = Path("/Users/jianglong/Desktop/游戏美化/_视觉美化工作/ref/民生热线-base") / ROOT.name / "assets" / "base"
BASE = _REF_BASE if _REF_BASE.exists() else (ROOT / "assets" / "base")
STILL = ROOT / "assets" / "stills"
JS = ROOT / "js" / "clips.js"

CORE = [
    {
        "id": "C001",
        "date": "2013-11-08",
        "code": "MS-131108-02",
        "who": "曹桂英",
        "base": "tape-shelf.jpg",
        "tokens": ["yingsheng"],
        "text": "我敲门。里头应声了。开开一看没人。井盖丢了三天，城管说不归他们。应声这件事我跟居委会说了，他们当我耳背。",
    },
    {
        "id": "C002",
        "date": "2013-12-14",
        "code": "MS-131214-11",
        "who": "马全有",
        "base": "empty-studio.jpg",
        "tokens": ["yingsheng"],
        "text": "电话响，我应声，对方挂了。连着三夜。我问是不是推销。值班的说查不了。排水的事你们不是要拍么，排水我讲完了，这电话我多嘴。",
    },
    {
        "id": "C003",
        "date": "2014-01-09",
        "code": "MS-140109-04",
        "who": "刘所长",
        "base": "village-doctor.jpg",
        "tokens": ["yingsheng", "liusuochang"],
        "text": "夜惊常见。小孩睡着手冰，喊一声会应声，醒了什么也不记得。别听偏方。村头有人说叫名，那是吓唬人。我们门诊写的是睡眠障碍。",
    },
    {
        "id": "C004",
        "date": "2014-02-18",
        "code": "MS-140218-01",
        "who": "刘所长",
        "base": "clinic-bench.jpg",
        "tokens": ["liusuochang", "yingsheng"],
        "text": "你们台要辟谣，我配合。夜惊不是鬼。应声只是条件反射。南坝那家我没看过，别把门诊挂到人家户口上。正式口径等通稿。我只管到卫生室门口。",
    },
    {
        "id": "C005",
        "date": "2014-03-02",
        "code": "MS-140302-07",
        "who": "出镜女",
        "base": "woman-blue.jpg",
        "tokens": ["yingsheng", "zhaozhao"],
        "text": "应声？我应了啊。招招。家里一直这么叫。你问谱上的字，谱上不写招招。谱上写别的。今晚谁喊我都应，喊招招我应。",
    },
    {
        "id": "C006",
        "date": "2014-03-02",
        "code": "MS-140302-08",
        "who": "出镜女",
        "base": "woman-coat.jpg",
        "tokens": ["zhaozhao", "zhouyindi"],
        "text": "乳名是我娘起的。招招。村里老人说招弟才好养活，我娘偏写招招，两个字。谱上那三个字我娘念过，周引娣。当着镜头我只应招招。户口本我没带来。",
    },
    {
        "id": "C007",
        "date": "2014-03-02",
        "code": "MS-140302-09",
        "who": "出镜女",
        "base": "woman-phone.jpg",
        "tokens": ["zhaozhao", "zhougui"],
        "text": "我娘周桂喊我，隔着墙。我应。我爹不喊这个。我爹喊另外那个。你们别让我两个一起应，我应不过来。灯太亮了，能关一点吗。",
    },
    {
        "id": "C008",
        "date": "2014-03-02",
        "code": "MS-140302-10",
        "who": "出镜女",
        "base": "tv-desk.jpg",
        "tokens": ["zhaozhao"],
        "text": "夜惊是刘所长说的。我不是小孩。你们非要拍夜惊，我就坐这儿。招招这两天睡不好，不是我睡不好，是招招。我把话说岔了。重来一句吧，算了，就这样。",
    },
    {
        "id": "C009",
        "date": "2014-03-09",
        "code": "MS-140309-03",
        "who": "出镜女",
        "base": "woman-blue.jpg",
        "tokens": ["zhouyindi", "touqi", "yingsheng"],
        "text": "今天头七。你问应声，我应周引娣。招招那行空了。不是我不想应，是应不上。谱上就这一行。你们把上次那盘带还给我娘。",
    },
    {
        "id": "C010",
        "date": "2014-03-09",
        "code": "MS-140309-04",
        "who": "出镜女",
        "base": "woman-coat.jpg",
        "tokens": ["zhouyindi", "touqi", "zhaozhao"],
        "text": "周引娣是谱名。圆谱那年写上的。不是我自己报的。头七要应这个。应那个乳名，他们说人不齐。我不管他们怎么说。我应了周引娣。招招我听见了，我没应。",
    },
    {
        "id": "C011",
        "date": "2014-03-09",
        "code": "MS-140309-05",
        "who": "出镜女",
        "base": "village-room.jpg",
        "tokens": ["touqi", "tiying"],
        "text": "替应这个词不是我说的。房伯说的。他说谱上有人空着，得有人应。我坐在这儿，你们当我是谁都行。头七过了我就回家。家现在不让我进厨房。",
    },
    {
        "id": "C012",
        "date": "2014-03-09",
        "code": "MS-140309-06",
        "who": "出镜女",
        "base": "niche-blur.jpg",
        "tokens": ["zhouyindi", "chuji"],
        "text": "除籍不是派出所那张纸。谱局自己画的。招招那一格涂黑了。周引娣还在。你们别问涂黑的人去哪。我不知道。我只知道今天应哪个字。",
    },
    {
        "id": "C013",
        "date": "2014-03-16",
        "code": "MS-140316-01",
        "who": "周石",
        "base": "man-father.jpg",
        "tokens": ["zhoushi", "zhouyindi", "yingsheng"],
        "text": "我喊周引娣。她应了。招招是小名，不能上谱。你们台拍来拍去，把小名播出去干什么。头七那天我在场。应声的是周引娣。别问我看见谁。",
    },
    {
        "id": "C014",
        "date": "2014-03-16",
        "code": "MS-140316-02",
        "who": "周石",
        "base": "gov-cubicle.jpg",
        "tokens": ["zhoushi", "touqi"],
        "text": "头七要齐。不齐，谱上那行会空。空了不是我的事，是房伯的事。我只负责喊。喊完我抽烟。你们镜头别跟我回村。村口有人认摄像机。",
    },
    {
        "id": "C015",
        "date": "2014-03-16",
        "code": "MS-140316-08",
        "who": "周桂",
        "base": "woman-phone.jpg",
        "tokens": ["zhougui", "zhaozhao"],
        "text": "招招是我起的。两个字，好听。谱局不收乳名，那是他们的规矩，不是我的。三月二日她应招招，我听得清。三月九日他们不让我进堂屋。我在院子里喊，没人应我。",
    },
    {
        "id": "C016",
        "date": "2014-03-16",
        "code": "MS-140316-09",
        "who": "周桂",
        "base": "village-room.jpg",
        "tokens": ["zhougui", "touqi", "zhouyindi"],
        "text": "周引娣那个名是圆谱写的。写的不是我。头七他们叫谱名，我叫乳名。一家子两个喊法，你说她应谁。我现在不敢在灶上喊人。锅响我都当有人应。",
    },
    {
        "id": "C017",
        "date": "2014-03-21",
        "code": "MS-140321-12",
        "who": "房伯",
        "base": "niche-blur.jpg",
        "tokens": ["fangbo", "chuji", "zhouyindi"],
        "text": "谱上有名才算。除籍的格子我涂过。不是派出所让我涂。周引娣那行还在。招招本来就没上过谱，谈不上除。你们记者别把谱抬到台里来，抬不动。",
    },
    {
        "id": "C018",
        "date": "2014-03-21",
        "code": "MS-140321-13",
        "who": "房伯",
        "base": "tape-shelf.jpg",
        "tokens": ["fangbo", "tiying", "touqi"],
        "text": "替应这个说法，村东有，村西没有。头七若空着，就找活人应一行。应的是字，不是人。你非要问应完人还在不在，我不答。我管本子。",
    },
    {
        "id": "C019",
        "date": "2014-04-02",
        "code": "MS-140402-01",
        "who": "台宣读员",
        "base": "empty-studio.jpg",
        "tokens": ["piyao"],
        "text": "现宣读县卫生局通稿。所谓夜惊偏方并无科学依据。儿童睡眠障碍请到正规医疗机构就诊。禁止传播封建迷信。本稿可直接作辟谣成片配音。完。",
    },
    {
        "id": "C020",
        "date": "2014-04-02",
        "code": "MS-140402-02",
        "who": "台宣读员",
        "base": "control-room.jpg",
        "tokens": ["piyao", "liusuochang"],
        "text": "通稿附件：刘所长门诊口径。夜惊、应声，一律按睡眠障碍处理。出镜采访如与通稿冲突，以通稿为准。本台四月二日起执行。",
    },
    {
        "id": "C021",
        "date": "2014-04-08",
        "code": "MS-140408-06",
        "who": "老崔",
        "base": "editor-pc.jpg",
        "tokens": ["laocui", "wuyong", "touqi"],
        "text": "三月九日那盘，我标了勿用。头七的东西不要上屏。闵科要辟谣，用三月二日，或者用通稿。你实习生别把两盘并切，并切审查过不了。我切过类似的，扣过片。",
    },
    {
        "id": "C022",
        "date": "2014-04-08",
        "code": "MS-140408-07",
        "who": "老崔",
        "base": "crt-snow.jpg",
        "tokens": ["laocui", "wuyong"],
        "text": "勿用不是格式损坏。带子能播。是我不让播。抽屉里有备份，主任有钥匙。你申请停播也行，停不掉备份。我把话放这儿。",
    },
    {
        "id": "C023",
        "date": "2014-04-15",
        "code": "MS-140415-03",
        "who": "河东　招弟",
        "base": "clinic-bench.jpg",
        "tokens": ["zhaodi"],
        "text": "我叫招弟，河东的。你们别把我跟南坝那家搅一起。我没上过你们镜头。乳名招弟的多了。谁应声谁的事。我来是说低保本发错了。",
    },
    {
        "id": "C024",
        "date": "2014-05-11",
        "code": "MS-140511-02",
        "who": "闵科",
        "base": "gov-cubicle.jpg",
        "tokens": ["minke"],
        "text": "以后夜惊只走通稿。出镜人名字打码。实习生交片我看一眼。应声这个词能上检索，别写进字幕。八月夜班谁值谁收尾。我字条会留。",
    },
    {
        "id": "C025",
        "date": "2014-05-11",
        "code": "MS-140511-03",
        "who": "闵科",
        "base": "editor-pc.jpg",
        "tokens": ["minke", "piyao"],
        "text": "辟谣要能播。能播比真重要。南坝那两盘我没细看。老崔爱标勿用，他标他的。总编室要的是九十秒。缺秒数就补路政口播。",
    },
    {
        "id": "C026",
        "date": "2014-03-02",
        "code": "MS-140302-11",
        "who": "出镜女",
        "base": "woman-blue.jpg",
        "tokens": ["yingsheng", "zhaozhao"],
        "text": "你再问一遍应声？招招。我应招招。旁边那盏灯嗡嗡的。我以为是我娘在喊。我娘今天没来。来的是你们。",
    },
    {
        "id": "C027",
        "date": "2014-03-09",
        "code": "MS-140309-07",
        "who": "出镜女",
        "base": "woman-coat.jpg",
        "tokens": ["zhouyindi", "touqi"],
        "text": "头七的饭我没吃。周引娣这三个字是他们塞进我嘴里的。我应了。应完嗓子干。你们把水拿开，我不要喝这个。",
    },
    {
        "id": "C028",
        "date": "2014-06-03",
        "code": "MS-140603-04",
        "who": "派出所值班",
        "base": "gov-cubicle.jpg",
        "tokens": ["chuji"],
        "text": "户口除籍走派出所。族谱那本我们不管。有人来问南坝周引娣，我们只有死亡登记，没有乳名栏。记者别把谱局的涂改当公文。",
    },
    {
        "id": "C029",
        "date": "2014-06-03",
        "code": "MS-140603-05",
        "who": "派出所值班",
        "base": "tv-corridor.jpg",
        "tokens": [],
        "text": "寻人启事我们不代写。你们台自己的栏目过期了别来找我要地址。南坝周石来过一次，问能不能改名，改名不是这个窗口。",
    },
    {
        "id": "C030",
        "date": "2014-03-16",
        "code": "MS-140316-03",
        "who": "周石",
        "base": "man-father.jpg",
        "tokens": ["zhoushi", "zhaozhao"],
        "text": "招招不是我喊的。我喊了这个，谱上对不上。对不上我就不喊。你们非要我对着镜头喊小名，我不干。我嗓子就那么多。",
    },
    {
        "id": "C031",
        "date": "2014-02-26",
        "code": "MS-140226-09",
        "who": "南坝村广播",
        "base": "village-room.jpg",
        "tokens": ["zhouyindi", "touqi"],
        "text": "通知。周引娣丧事，本村知晓。不办酒席。纸位在堂屋。头七另有安排。外人别进。这条我按村委会稿念的。念完喇叭就关。",
    },
    {
        "id": "C032",
        "date": "2014-02-26",
        "code": "MS-140226-10",
        "who": "南坝村广播",
        "base": "niche-blur.jpg",
        "tokens": ["touqi"],
        "text": "头七那天路要让。不是给你们拍。拍的人走田埂。喇叭再念一遍：头七不待客。完。",
    },
    {
        "id": "C033",
        "date": "2014-04-08",
        "code": "MS-140408-08",
        "who": "老崔",
        "base": "control-room.jpg",
        "tokens": ["laocui", "zhaozhao"],
        "text": "三月二日那盘能播，因为她应的是招招，打码就行。三月九日她应谱名，谱名打码也有人听得出来口型。所以勿用。你听口型。",
    },
    {
        "id": "C034",
        "date": "2014-07-19",
        "code": "MS-140719-01",
        "who": "裴晚试音",
        "base": "tv-desk.jpg",
        "tokens": [],
        "text": "试音。裴晚。实习。话筒有电流。闵科说夜班留我。片库密码写在显示器边上，我不当着镜头念。这句话你们切掉。",
    },
    {
        "id": "C035",
        "date": "2014-03-09",
        "code": "MS-140309-08",
        "who": "出镜女",
        "base": "woman-phone.jpg",
        "tokens": ["tiying", "zhaozhao", "zhouyindi"],
        "text": "他们要我替应。招招在院子里。周引娣在堂屋。我人在哪，你们自己看镜头。我坐在这张桌子后面。桌子不是我家的。",
    },
    {
        "id": "C036",
        "date": "2013-10-02",
        "code": "MS-131002-05",
        "who": "林场　吴婶",
        "base": "tape-shelf.jpg",
        "tokens": ["yingsheng"],
        "tokens": [],
        "text": "林场夜里有人喊路。我回了一句，对面不说话。后来才知道是放套的。跟夜惊无关。你们硬要往封建上靠，我退出采访。",
    },
    {
        "id": "C037",
        "date": "2013-09-18",
        "code": "MS-130918-14",
        "who": "窑上　丁有才",
        "base": "empty-studio.jpg",
        "tokens": ["yingsheng"],
        "tokens": [],
        "text": "窑上门房应门惯了。谁叫门谁应。有一回应了，门后没人。砖窑的合同你们不是要拍么，合同我带来了。别把应门写进标题。",
    },
    {
        "id": "C038",
        "date": "2014-03-02",
        "code": "MS-140302-12",
        "who": "摄像助理",
        "base": "control-room.jpg",
        "tokens": ["zhaozhao"],
        "text": "场记。出镜自称招招。问话轨今天又没录上。监视器有雪花。女人不看镜头。闵科不在现场。老崔后来问过编号。我只管带子编号。",
    },
    {
        "id": "C039",
        "date": "2014-03-09",
        "code": "MS-140309-09",
        "who": "摄像助理",
        "base": "crt-snow.jpg",
        "tokens": ["zhouyindi", "touqi"],
        "text": "场记。头七。出镜改口称周引娣。同一张出镜卡。衣服换了。问话轨仍然没有。老崔后来借走一盘，标了字，我没看清。",
    },
    {
        "id": "C040",
        "date": "2014-01-22",
        "code": "MS-140122-06",
        "who": "刘所长",
        "base": "village-doctor.jpg",
        "tokens": ["liusuochang"],
        "text": "偏方我见过香灰，见过喊名字，见过把小孩放到路口。这些我都写进过不良信息登记。登记不是处方。你们辟谣用我的名，把登记表日期写对。",
    },
    {
        "id": "C041",
        "date": "2014-03-21",
        "code": "MS-140321-14",
        "who": "房伯",
        "base": "niche-blur.jpg",
        "tokens": ["fangbo", "zhaozhao"],
        "text": "招招两个字上不了谱。不是我不让。谱例如此。有人非要喊，喊给家里听，别喊给台里听。台里一播，外村也跟着喊，乱。",
    },
    {
        "id": "C042",
        "date": "2014-08-21",
        "code": "MS-140821-00",
        "who": "闵科留言录音",
        "base": "editor-pc.jpg",
        "tokens": ["minke", "yingsheng"],
        "text": "裴晚，你若听到这段，说明你进片库了。词还是应声。五条上限别跟我哭。交片键在桌面。交了不能改。我回家了。",
    },
    {
        "id": "C043",
        "date": "2014-03-16",
        "code": "MS-140316-10",
        "who": "周桂",
        "base": "woman-coat.jpg",
        "tokens": ["zhougui", "chuji"],
        "text": "除籍这个词是房伯说的。派出所不认。我认乳名。乳名被他们涂了，我还是喊。喊到没有应的那天，我再想别的。今天还没有到。",
    },
    {
        "id": "C044",
        "date": "2014-04-02",
        "code": "MS-140402-03",
        "who": "台宣读员",
        "base": "empty-studio.jpg",
        "tokens": ["piyao"],
        "text": "通稿第三条。各栏目不得使用未打码乳名。违者扣当月奖金。本稿作为辟谣成片合法来源。无需出镜。",
    },
    {
        "id": "C045",
        "date": "2014-07-02",
        "code": "MS-140702-11",
        "who": "老崔",
        "base": "tape-shelf.jpg",
        "tokens": ["laocui", "wuyong"],
        "text": "勿用带我锁第二层。钥匙在我身上。你要采用，写停播申请。申请会到闵科桌上。他抽屉里有备份。我重复一遍，有备份。",
    },
    {
        "id": "C046",
        "date": "2014-03-09",
        "code": "MS-140309-10",
        "who": "出镜女",
        "base": "woman-blue.jpg",
        "tokens": ["touqi", "yingsheng", "zhouyindi"],
        "text": "头七应声，应周引娣。你把招招拿来问，我摇头。摇头也算一条吗。算就留着。不算你切掉。我累了。",
    },
    {
        "id": "C047",
        "date": "2013-08-30",
        "code": "MS-130830-02",
        "who": "高坡　孙二",
        "base": "tv-corridor.jpg",
        "tokens": ["yingsheng"],
        "tokens": [],
        "text": "水库放水前对岸有人说话，那是干活。你们非要剪成怪事，我以后不接受采访。水位数字我可以再念一遍。",
    },
    {
        "id": "C048",
        "date": "2014-05-28",
        "code": "MS-140528-07",
        "who": "周石",
        "base": "man-father.jpg",
        "tokens": ["zhoushi", "zhouyindi"],
        "text": "后来我只喊周引娣。喊别的，堂屋不应。你们还来拍，我把门关了。这是关了门之后补的口播，在村部。村部的钟不准。",
    },
    {
        "id": "C049",
        "date": "2014-05-28",
        "code": "MS-140528-08",
        "who": "周桂",
        "base": "village-room.jpg",
        "tokens": ["zhougui", "zhaozhao"],
        "text": "我还在喊招招。院子里有时应，有时不应。应的那几次，我不看是谁。看了就没有了。这句话你们要播就打码，不打码我也说。",
    },
    {
        "id": "C050",
        "date": "2014-06-20",
        "code": "MS-140620-09",
        "who": "房伯",
        "base": "niche-blur.jpg",
        "tokens": ["fangbo", "tiying"],
        "text": "替应不是长久的。长久要自己那一行在。一行在，谁喊谁应。一行不在，喊了也是替。你们台爱把替当成真，那是你们的播出事故，不是谱上的事。",
    },
]

NAMES = [
    "赵庆山", "钱秀兰", "孙大嘴", "李春芳", "吴广生", "郑小禾", "王二饼", "冯秋桂",
    "陈木林", "褚玉珍", "卫国栋", "蒋细妹", "沈长水", "韩翠花", "杨保国", "朱小满",
    "秦有德", "尤桂香", "许大年", "何冬梅", "吕石匠", "施素珍", "张耙子", "孔令英",
    "曹满仓", "严桂枝", "华老三", "金秀英", "魏得财", "陶春兰", "姜黑子", "戚桂英",
    "谢有才", "邹小兰", "喻长根", "柏翠莲", "水德发", "窦桂芳", "章石头", "云秀梅",
    "苏二牛", "潘桂珍", "葛有福", "奚春花", "范长海", "彭秀云", "郎得水", "鲁桂兰",
    "韦大嫂", "昌有粮", "马春生", "苗桂花", "凤得山", "花小菊", "方老四", "俞秀珍",
    "任得法", "袁桂香", "柳长青", "鲍秀兰", "史得宝", "唐桂英", "费小龙", "廉秀梅",
    "岑有田", "薛桂芳", "雷大锤", "贺秀珍", "倪长福", "汤桂兰", "滕得水", "殷秀英",
    "罗二嫂", "毕桂花", "郝有才", "邬秀兰", "安得宝", "常桂英", "乐小满", "于秀梅",
    "时得山", "傅桂香", "皮长根", "卞秀珍", "齐有德", "康桂芳", "伍得财", "余秀兰",
    "元桂英", "卜有粮", "孟秀云", "平得水", "黄桂花", "穆有才", "萧秀梅", "尹桂兰",
    "姚得宝", "邵秀英", "湛桂香", "汪有田", "祁秀珍", "毛桂芳", "禹得山", "狄秀兰",
    "米桂英", "贝有福", "明秀梅", "臧桂花", "计得水", "伏秀云", "成桂香", "戴有才",
    "谈秀兰", "宋桂英", "茅秀珍", "庞得宝", "熊桂芳", "纪秀梅", "舒桂兰", "屈有田",
    "项秀英", "祝桂香", "梁得山", "杜秀兰", "阮桂英", "蓝秀珍", "季得水", "麻桂花",
    "强秀云", "贾有才", "路秀梅", "娄桂兰", "危得宝", "江秀英", "童桂香", "颜有田",
    "郭秀珍", "梅桂芳", "盛得山", "刁秀兰", "钟桂英", "徐秀梅", "邱得水", "骆桂花",
    "高有才", "夏秀云", "蔡桂兰", "田得宝", "樊秀英", "胡桂香", "凌有田", "霍秀珍",
    "虞桂芳", "万得山", "支秀兰", "柯桂英", "管秀梅", "卢得水", "莫桂花", "经秀云",
    "裘有才", "缪秀兰", "干桂英", "解得宝", "宗秀珍", "丁桂芳", "宣得山", "贲秀梅",
    "邓桂兰", "郁有田", "单秀英", "杭桂香", "洪得水", "包秀珍", "诸桂芳", "左得山",
    "石秀兰", "崔桂英", "吉秀梅", "钮得宝", "龚桂花", "程有才", "嵇秀云", "邢桂兰",
    "滑得水", "裴秀英", "陆桂香", "荣有田", "翁秀珍", "荀桂芳", "羊得山", "於秀兰",
    "惠桂英", "甄秀梅", "曲得水", "芮桂花", "羿有才", "储秀云", "靳桂兰", "汲得宝",
    "邴秀英", "糜桂香", "松有田", "井秀珍", "段桂芳", "富得山", "巫秀兰", "乌桂英",
    "焦秀梅", "巴得水", "弓桂花", "牧有才", "隗秀云", "山谷兰", "车得宝", "侯秀英",
    "宓桂香", "蓬有田", "郗秀珍", "班桂芳", "仰得山", "秋秀兰", "仲桂英", "伊秀梅",
]

VILLAGES = [
    "河西", "窑上", "林场", "三棵树", "高坡", "洼子", "屯里", "石桥", "龙沟", "西坡",
    "东岔", "槐树", "枣园", "马场", "清水", "黄泥", "白庙", "新集", "旧县", "南岗",
    "北岭", "沙坝", "柳巷", "梅湾", "竹园", "梨树", "杏花", "杨庄", "赵屯", "钱湾",
]

def noise_text(i: int, name: str, village: str, month: int, day: int) -> str:
    n = 3 + (i % 17)
    bus = 2 + (i % 88)
    money = 18 + (i * 7) % 420
    well = 11 + (i % 40)
    bag = 4 + (i % 9)
    trip = 2 + (i % 5)
    clock = 5 + (i % 14)
    bodies = [
        f"{village}这边，我是{name}。东口那块井盖没了{n}天。我骑车陷进去一次，膝盖还青。城管说井归供水，供水说井归路政。我把摔的那天记在日历上，日历在灶上油星子里。你们要拍就拍膝盖，别拍我家小孩。",
        f"我叫{name}，{village}的。低保本上的人不是我。窗口说系统对不上，让我{month}月再来。米是找邻家借的，借条写了{money}块。我不懂系统，我懂米缸空了能敲出什么声。",
        f"{name}。{village}地里苗黄了。经销商姓钱，人跑了。我留了{bag}个空袋子，袋口我缝死了。农技站说要化验费，化验费我没有。苗还在地里，风一吹就断。",
        f"拆迁办在{village}口头一套。我{name}按手印那天没戴花镜，数字是他们念的。后来纸上来了，少了{money}。我找村部，村部说经办人借调走了。我把按印那张复印件带来了，字我认不全。",
        f"下雨在{village}，院里漂鞋。我{name}量过，水深到台阶第{trip}级。泵站来人看了井{well}号，走的时候说叶子是自然的。自然的叶子不会隔天又堆到门槛。",
        f"电表跳档。{village}，{name}。抄表的说新规。告示贴在村部里屋，里屋上锁。我交了{money}块差额，收据编号我念不清，条在夹袄里。灯我不敢关，关了表还走。",
        f"校车晚到。{village}路口，孩子站了四十分钟。司机是我表舅，我{name}不好骂。班次写的是{bus}路，实际来的是空车。空车不停车。我后来拦过一次，被说挡道。",
        f"医保单子我跑了{trip}趟。{village}卫生室盖错章，乡镇又退回。我{name}把单子摊开，章是反的。药费{money}，我垫了。垫了他们说年度封了。年度谁封的，窗口指天花板。",
        f"种子袋上画的是圆叶子。{village}地里长出来尖的。我{name}留了半袋，半袋被老鼠咬。农技站让拍照，照片在村里唯一能上网的那台电脑上，电脑常关。",
        f"{village}自来水有味。我{name}烧开了闻，味还在。供水所给过一只杯子，杯子他们忘了拿走。我把杯子扣在灶上，扣了{n}天。没人来取。",
        f"路灯在{village}西口坏了很久。夜间三轮翻过。我{name}报过，接电话的人让我等立项。立项两个字我问过三回，三回都说在路上。路上没有灯。",
        f"养老金少了。{village}信用社，我{name}数存折，少{money}。柜员说系统如此。系统不能喝。我把存折复印件带来，第三页折痕是我自己折的，别当我改过。",
        f"垃圾堆到{village}沟沿。夏天我{name}不敢开窗。环卫说界外。界碑让草盖了。我用铁锹铲过一回，第二天又倒回来，倒的人我看见后脑勺，没看见脸。",
        f"{village}卫生室没药。让去县城。班车一天两趟，第二趟常停。我{name}有一次走到半路返了，返是因为站里说车坏在{bus}公里外。药还是没买到。",
        f"彩钢棚被风掀了。{village}，我{name}。保险说不在条款。条款密密麻麻，我看到第{trip}页眼睛花。棚架还在院子里，铁皮卷到邻家菜地，邻家要我赔菜。",
        f"上游一股白的。{village}鱼塘翻了。我{name}捞过几条，埋了。环保来拍过照，闪光灯把我晃了一下。后来照片没见着。塘现在空着，空着也有味。",
        f"末班车提前走。{village}站，老人等到灯灭。调度电话我{name}打过，语音让我排队。排队排到语音自己挂。车票我还留着，票上钟点跟车走的钟点对不上。",
        f"户口本掉了一页。{village}派出所让开村证明，村部让看户口本。我{name}夹在中间。掉的那页是户主栏。户主是我爹，我爹走了四年。四年这个数字我不会说错。",
        f"农药瓶堆在{village}渠边。小孩捡过一个。我{name}埋了，埋在桑树下。后来有人挖开，说要取证。证没取走，坑还在。我现在不让小孩往渠那边去。",
        f"宽带收了钱没来。{village}，我{name}。发票在抽屉，金额{money}。装的人说过{n}天到。到了没人。手机信号也没有，我是托邻村打电话约的你们。",
        f"我{name}在{village}养蜂。蜂箱被洒过一次药，蜂死了一半。洒药的人说防虫，防的不是我的虫。我把死蜂装进玻璃瓶，瓶我带来了，别开盖，味冲。",
        f"{village}桥面裂了一指宽。我{name}每天赶集过这座桥。乡里说来测，测的人站了{clock}分钟，说还没到危桥标准。标准在哪本册子里，他们没给我看。",
        f"供销社退货不退。{village}，我{name}买的暖壶炸了。发票有，底单他们说找不到。炸的那天是{month}月{day}日早饭，米汤洒了一灶。我还留着壶嘴。",
        f"我{name}在{village}看林。有人偷树，偷的是编号{well}那棵。护林员就我一个。报案回执在口袋里，回执被汗湿了。树墩还在，树不在。",
        f"{village}小学厕所封了。孩子回家说不敢喝水。我{name}找校长，校长说等专项。专项两个字比厕所还难等。我自带马扎蹲在校门口讲这些，讲完我就走。",
        f"我{name}。{village}的渡口今年少开一班。渡工说柴油贵。贵多少他不说。我算过，赶集要多走{bus}里土路。土路下雨，车轴断过一回，断在我眼前。",
        f"粮站收谷压级。{village}，我{name}。同样的谷，邻村高一档。我问化验，化验室关门。关门条写着学习。学习了{n}天。谷在家里发潮，潮了更压级。",
        f"我{name}在{village}跑摩的。夜路没有反光条。我自己贴过，贴的被人撕了。撕的时候我没看见人，只看见胶还粘在杆上。杆上现在什么都没有。",
        f"{village}有一口老井，井栏裂了。我{name}打水，绳子磨那道裂。村部说来换井圈，换井圈要集资{money}。集资名单写了半墙，墙被雨涮了。",
        f"我{name}。{village}的坟地被推过一角。推的人说修机耕路。路修到一半停了。停的地方正好是我家那一角。我找过，对方拿出一张图，图上没有我家的字。",
    ]
    tail = [
        f"灯太亮，我眼睛花，话可能说重了，重了也不改。",
        f"邻家让我别来，我还是来了，来了就不想白来。",
        f"你们上次把我剪成点头，我这次把话说完。",
        f"水我自己带了，不喝你们的。",
        f"我只这一回。下回找别人，别人比我会说。",
        f"案号我记不住，日子我记得，就是{month}月{day}日前后。",
        f"镜头不要摇到门口，门口有人不愿出镜。",
        f"我嗓子不好，慢一点你们将就听。",
        f"讲到钱，数目以条据为准，我口头会记差。",
        f"天要黑，我还要走回{village}，话到此为止。",
    ]
    body = bodies[i % len(bodies)]
    # 收尾句 + 暗线点缀。编号句/穿胶鞋句不再每条都出现，只做稀疏伏笔，避免模板机械重复一眼穿帮。
    tail_sentence = tail[i % len(tail)]
    parts = [body]
    if i % 9 == 0:
        parts.append(f"我把编号记成{i}号口播，不是台里的号，是我自己数的。")
    if i % 23 == 5:
        parts.append("当场还有一个穿胶鞋的人不肯留名，他说过半句就走。")
    parts.append(tail_sentence)
    return "".join(parts)

NOISE_BASES = [
    "tv-desk.jpg", "control-room.jpg", "tape-shelf.jpg", "village-room.jpg",
    "clinic-bench.jpg", "gov-cubicle.jpg", "tv-corridor.jpg", "empty-studio.jpg",
    "crt-snow.jpg", "editor-pc.jpg",
]


def hanzi_count(s: str) -> int:
    return sum(1 for ch in s if "\u4e00" <= ch <= "\u9fff")


def noise_clip(i: int) -> dict:
    name = NAMES[(i * 13) % len(NAMES)]
    village = VILLAGES[(i * 7) % len(VILLAGES)]
    year = 2013 if i % 5 == 0 else 2014
    month = 1 + (i % 12)
    day = 1 + ((i * 3) % 27)
    date = f"{year:04d}-{month:02d}-{day:02d}"
    code = f"MS-{date[2:4]}{date[5:7]}{date[8:10]}-N{i:03d}"
    return {
        "id": f"C{i:03d}",
        "date": date,
        "code": code,
        "who": f"{village}　{name}",
        "base": NOISE_BASES[i % len(NOISE_BASES)],
        "tokens": [],
        "text": noise_text(i, name, village, month, day),
    }


def make_still(src: Path, dest: Path, seed: int, ticker_crop: bool) -> None:
    rng = random.Random(seed)
    im = Image.open(src).convert("RGB")
    w, h = im.size
    top = int(h * (0.16 if ticker_crop else 0.04))
    left = int(w * rng.uniform(0.0, 0.12))
    right = int(w * rng.uniform(0.88, 1.0))
    bottom = int(h * rng.uniform(0.86, 1.0))
    if right - left < 40 or bottom - top < 40:
        box = (0, top, w, h)
    else:
        box = (left, top, right, bottom)
    im = im.crop(box)
    im = im.resize((480, 360), Image.Resampling.BICUBIC)
    if rng.random() < 0.35:
        im = ImageOps.mirror(im)
    im = ImageEnhance.Color(im).enhance(rng.uniform(0.55, 1.15))
    im = ImageEnhance.Contrast(im).enhance(rng.uniform(0.85, 1.25))
    im = ImageEnhance.Brightness(im).enhance(rng.uniform(0.75, 1.12))
    if rng.random() < 0.5:
        im = im.filter(ImageFilter.GaussianBlur(radius=rng.uniform(0.2, 0.9)))
    px = im.load()
    tw, th = im.size
    for y in range(0, th, 2 + rng.randint(0, 2)):
        for x in range(tw):
            r, g, b = px[x, y]
            d = rng.randint(-18, 18)
            px[x, y] = (
                max(0, min(255, r + d)),
                max(0, min(255, g + d - 4)),
                max(0, min(255, b + d - 8)),
            )
    # unique analog grain field
    for _ in range(900):
        x = rng.randint(0, tw - 1)
        y = rng.randint(0, th - 1)
        r, g, b = px[x, y]
        n = rng.randint(-40, 40)
        px[x, y] = (
            max(0, min(255, r + n)),
            max(0, min(255, g + n)),
            max(0, min(255, b + n)),
        )
    dest.parent.mkdir(parents=True, exist_ok=True)
    im.save(dest, "JPEG", quality=48, optimize=True, progressive=True)


TICKER = {"woman-coat.jpg", "man-father.jpg", "village-doctor.jpg", "woman-phone.jpg", "editor-pc.jpg", "tv-corridor.jpg"}


def main() -> None:
    clips = []
    used_ids = set()
    for c in CORE:
        used_ids.add(c["id"])
        clips.append(c)
    n = 51
    while len(clips) < 280:
        cid = f"C{n:03d}"
        while cid in used_ids:
            n += 1
            cid = f"C{n:03d}"
        item = noise_clip(n)
        item["id"] = cid
        used_ids.add(cid)
        clips.append(item)
        n += 1
    clips.sort(key=lambda x: (x["date"], x["id"]))

    STILL.mkdir(parents=True, exist_ok=True)
    out = []
    total_h = 0
    for i, c in enumerate(clips):
        img_name = f"{c['id']}.jpg"
        dest = STILL / img_name
        src = BASE / c["base"]
        if not src.exists():
            src = next(BASE.glob("*.jpg"))
        if not dest.exists():
            make_still(src, dest, seed=7000 + i, ticker_crop=c["base"] in TICKER)
        total_h += hanzi_count(c["text"]) + hanzi_count(c["who"])
        out.append({
            "id": c["id"],
            "date": c["date"],
            "code": c["code"],
            "who": c["who"],
            "text": c["text"],
            "img": f"assets/stills/{img_name}",
            "tokens": c.get("tokens") or [],
        })

    JS.write_text("window.CLIPS = " + json.dumps(out, ensure_ascii=False) + ";\n", encoding="utf-8")
    stills = list(STILL.glob("*.jpg"))
    ying = sum(1 for c in out if "应声" in c["text"])
    print("clips", len(out))
    print("stills", len(stills))
    print("hanzi_in_clips", total_h)
    print("yingsheng_hits", ying)
    assert len(out) >= 280
    assert len(stills) >= 280
    assert total_h > 11300
    assert ying > 5


if __name__ == "__main__":
    main()
