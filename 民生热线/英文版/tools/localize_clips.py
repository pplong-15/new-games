#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Transcreate clips.js in place. Plot clips are hand copy; noise uses templates."""
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

from pypinyin import Style, lazy_pinyin

ROOT = Path(__file__).resolve().parents[1]
JS = ROOT / "js" / "clips.js"
ZH = ROOT / "js" / "clips.zh.js"

VILLAGES = {
    "河西": "Hexi",
    "窑上": "Yaoshang",
    "林场": "Linchang",
    "三棵树": "Sankeshu",
    "高坡": "Gaopo",
    "洼子": "Wazi",
    "屯里": "Tunli",
    "石桥": "Shiqiao",
    "龙沟": "Longgou",
    "西坡": "Xipo",
    "东岔": "Dongcha",
    "槐树": "Huaishu",
    "枣园": "Zaoyuan",
    "马场": "Machang",
    "清水": "Qingshui",
    "黄泥": "Huangni",
    "白庙": "Baimiao",
    "新集": "Xinji",
    "旧县": "Jiuxian",
    "南岗": "Nangang",
    "北岭": "Beiling",
    "沙坝": "Shaba",
    "柳巷": "Liuxiang",
    "梅湾": "Meiwan",
    "竹园": "Zhuyuan",
    "梨树": "Lishu",
    "杏花": "Xinghua",
    "杨庄": "Yangzhuang",
    "赵屯": "Zhaotun",
    "钱湾": "Qianwan",
    "南坝": "Nanba",
    "河东": "Hedong",
}

SPECIAL_NAME = {
    "吴婶": "Aunt Wu",
    "孙二": "Sun Er",
    "招弟": "Zhaodi",
    "刘所长": "Director Liu",
    "老崔": "Old Cui",
    "闵科": "Min Ke",
    "周石": "Zhou Shi",
    "周桂": "Zhou Gui",
    "房伯": "Uncle Fang",
    "裴晚": "Pei Wan",
}

SPECIAL_WHO = {
    "曹桂英": "Cao Guiying",
    "马全有": "Ma Quanyou",
    "刘所长": "Director Liu",
    "南坝村广播": "Nanba village PA",
    "出镜女": "Woman on camera",
    "摄像助理": "Camera assistant",
    "周石": "Zhou Shi",
    "周桂": "Zhou Gui",
    "房伯": "Uncle Fang",
    "台宣读员": "Station reader",
    "老崔": "Old Cui",
    "河东　招弟": "Hedong · Zhaodi",
    "闵科": "Min Ke",
    "派出所值班": "Police desk",
    "闵科留言录音": "Min Ke voicemail",
    "裴晚试音": "Pei Wan mic check",
    "高坡　孙二": "Gaopo · Sun Er",
    "窑上　丁有才": "Yaoshang · Ding Youcai",
    "林场　吴婶": "Linchang · Aunt Wu",
}

PLOT = {
    "C001": "I knocked. There was an Answer inside. Opened it, nobody. Manhole cover gone three days. City management said not their well. I told the neighborhood committee about the Answer. They took me for hard of hearing.",
    "C002": "Phone rang, I gave an Answer, other side hung up. Three nights straight. I asked if it was a sales call. Duty said they can't trace it. You came for drainage, drainage I already finished. This phone, I talked too much.",
    "C003": "Night terrors are common. Child asleep, hands ice-cold, you call once they give an Answer, they wake remembering nothing. Don't listen to folk remedies. Village talk about calling names is scare talk. Our clinic writes sleep disorder.",
    "C004": "Your station wants a debunking package, I'll cooperate. Night terrors are not ghosts. Answer is only a reflex. I haven't seen that Nanba house. Don't hang a clinic file on their hukou. Official line waits for the circular. I only cover as far as the clinic door.",
    "C005": "Answer? I did Answer. Zhaozhao. House always called me that. You ask what's on the register. Register doesn't write Zhaozhao. Register writes the other. Tonight I'll Answer whoever calls. Call Zhaozhao, I Answer.",
    "C006": "Milk name is my mother's. Zhaozhao. Village old folks said Zhaodi raises easier. My mother wrote Zhaozhao, two characters. Those three on the register she read once: Zhou Yindi. On camera I only take Zhaozhao. Didn't bring the hukou book.",
    "C007": "My mother Zhou Gui calls me through the wall. I take it. Dad doesn't call this one. Dad calls the other. Don't make me take both at once. I can't keep up. Light's too bright, can you kill it a little?",
    "C008": "Night terrors is Director Liu talking. I'm not a child. You insist on shooting night terrors, I'll sit here. Zhaozhao hasn't slept these two days. Not me not sleeping. Zhaozhao. I twisted that. Want a retake? Forget it. Leave it.",
    "C009": "Today is SeventhDay. You ask Answer, I Answer Zhou Yindi. Zhaozhao's line is empty. Not that I won't. I can't get it out. Register only has this line. Give last tape back to my mother.",
    "C010": "Zhou Yindi is the register name. Written the year they opened the genealogy. I didn't report it myself. SeventhDay you have to take this one. Take that milk name, they say the people aren't complete. I don't care what they say. I took Zhou Yindi. I heard Zhaozhao. I didn't take it.",
    "C011": "StandInAnswer isn't my word. Uncle Fang's. Substitute-answer, he said. Somebody empty on the register, somebody has to take it. I sit here, take me for whoever you want. SeventhDay done, I go home. Home won't let me in the kitchen now.",
    "C012": "StrikeOff isn't the police paper. Genealogy office drew it themselves. Strike-off. They blacked Zhaozhao's cell. Zhou Yindi's still there. Don't ask where the blacked-out person went. I don't know. I only know which characters I take today.",
    "C013": "I called Zhou Yindi. She took it. Zhaozhao is a milk name, can't go on the register. Your station keeps shooting, what's the milk name doing on air. I was there SeventhDay. The Answer was Zhou Yindi. Don't ask who I saw.",
    "C014": "SeventhDay has to be complete. Incomplete, that line on the register goes empty. Empty isn't my problem, it's Uncle Fang's. I just call. After I call I smoke. Don't follow me back to the village with that camera. People at the village mouth know a camera.",
    "C015": "I named her Zhaozhao. Two characters, sounds nice. Genealogy office won't take a milk name. That's their rule, not mine. March 2 she took Zhaozhao, I heard it clear. March 9 they wouldn't let me in the main room. I called from the yard. Nobody took me.",
    "C016": "Zhou Yindi, that name, they wrote it when they opened the genealogy. I didn't write it. SeventhDay they call the register name, I call the milk name. One house, two calls, you tell me who she takes. I don't dare call anyone at the stove now. Pot rattles I treat it like someone taking it.",
    "C017": "Only a name on the register counts. The StrikeOff cell, I painted that. Strike-off. Police didn't tell me to paint. Zhou Yindi's line is still there. Zhaozhao never went on the register, nothing to strike. Don't you reporters try carrying the genealogy book to the station. You can't lift it.",
    "C018": "StandInAnswer, that talk, east village has it, west village doesn't. Substitute-answer. SeventhDay if a line's empty, you find a living person to take a line. You take the characters, not the person. You ask after they take it is the person still there, I don't go into that. I keep the book.",
    "C019": "Now reading the county health bureau circular. So-called night-terror folk remedies have no scientific basis. Childhood sleep disorders: seek licensed medical institutions. Do not spread feudal superstition. This draft may be used directly as voice-over for a debunking package. End.",
    "C020": "Circular attachment: Director Liu clinic line. Night terrors, Answer, treat uniformly as sleep disorder. On-camera interviews in conflict with this circular, circular prevails. This station effective 2014-04-02.",
    "C021": "March 9 tape, I marked DoNotUse. SeventhDay material stays off screen. Min Ke wants a debunking package, use March 2, or use the circular. Intern, don't splice the two tapes. Splice won't pass review. I've cut this kind. Piece got pulled.",
    "C022": "DoNotUse is not a format error. Tape will play. I won't let it play. Backup's in the drawer. Director has a key. You can file a kill request. Won't kill the backup. I'm putting that here.",
    "C023": "I'm Zhaodi, Hedong. Don't mix me up with that Nanba house. I've never been on your camera. Plenty of milk names Zhaodi. Who does Answer is their business. I came because the dibao booklet went to the wrong name.",
    "C024": "From now, night terrors go circular only. Mask on-camera names. Intern drops a cut, I glance. Answer can go in search. Don't put it in a caption. August night shift, whoever's on closes it. I'll leave a note.",
    "C025": "A debunking package has to be airable. Airable beats true. I didn't watch those two Nanba tapes close. Old Cui likes marking DoNotUse, that's his mark. Editorial wants ninety seconds. Short, pad with a roads VO.",
    "C026": "Ask Answer one more time? Zhaozhao. I Answer Zhaozhao. That lamp's buzzing. I thought it was my mother calling. She didn't come today. You did.",
    "C027": "I didn't eat the SeventhDay meal. Zhou Yindi, those three characters, they stuffed in my mouth. I took them. After that my throat was dry. Take the water away. I'm not drinking that.",
    "C028": "Hukou StrikeOff goes through this station. Strike-off. That genealogy book is not our business. People ask about Nanba Zhou Yindi, we have a death registration, no milk-name field. Don't treat genealogy-office blacking as an official paper.",
    "C029": "We don't draft missing-person notices. Your own show expired, don't come asking me for addresses. Nanba Zhou Shi came once, asked if a name could be changed. Name change is not this window.",
    "C030": "Zhaozhao isn't what I call. I call that, it doesn't match the register. Doesn't match, I don't call it. You want me to say the milk name into the camera, I won't. That's all the throat I've got.",
    "C031": "Notice. Zhou Yindi funeral. Village to take note. No banquet. Paper tablet in the main room. SeventhDay separately arranged. Outsiders stay out. I read this from the village committee draft. Horn off when I'm done.",
    "C032": "SeventhDay, leave the road clear. Not for your cameras. Camera people take the ridge path. Horn again: SeventhDay, no guests. End.",
    "C033": "March 2 tape can air because she took Zhaozhao, mask it and you're fine. March 9 she took the register name. Even masked you can read the mouth. That's why DoNotUse. Watch the mouth.",
    "C034": "Mic check. Pei Wan. Intern. Current on the mic. Min Ke said night shift keeps me. Library password is on the side of the monitor, I'm not reading it on camera. Cut this sentence.",
    "C035": "They want me to StandInAnswer. Substitute-answer. Zhaozhao in the yard. Zhou Yindi in the main room. Where I am, look at the lens yourselves. I'm sitting behind this table. Table isn't ours.",
    "C036": "Night at the forestry farm somebody called the road. I threw a line back. Other side went quiet. Later I found out it was snare-setters. Nothing to do with night terrors. You keep leaning it on feudal stuff, I'm out of the interview.",
    "C037": "Kiln gatehouse is used to taking the door. Whoever calls, they take it. One time somebody took it, nobody behind the door. You came for the brick-kiln contract, I brought the contract. Don't put taking-the-door in the title.",
    "C038": "Slate. Talent called herself Zhaozhao. Question track missed again today. Monitor snow. Woman won't look at lens. Min Ke not on site. Old Cui asked for the number later. I only do tape numbers.",
    "C039": "Slate. SeventhDay. Talent switched to Zhou Yindi. Same talent card. Clothes changed. Still no question track. Old Cui borrowed a tape later, marked something, I didn't read it.",
    "C040": "Folk remedies I've seen: incense ash, calling names, leaving a child at a crossroads. I logged all of it as harmful information. A log is not a prescription. If your debunking package uses my name, get the log date right.",
    "C041": "Zhaozhao, two characters, can't go on the register. Not me blocking it. That's the genealogy rule. Somebody has to call it, call it at home, don't call it for the station. Station airs it, other villages start calling it, mess.",
    "C042": "Pei Wan, if you hear this, you got into the library. Word is still Answer. Five-hit cap, don't cry to me. Submit key's on the desktop. Once it's in, you can't change it. I went home.",
    "C043": "StrikeOff is Uncle Fang's word. Strike-off. Police don't recognize it. I recognize the milk name. They blacked the milk name, I still call it. Day nobody takes it, I'll think of something else. That day isn't today.",
    "C044": "Circular article three. No program may air an unmasked milk name. Violators forfeit that month's bonus. This draft is a lawful source for a debunking package. No on-camera talent required.",
    "C045": "DoNotUse tape I locked on the second layer. Key's on me. You want to use it, write a kill request. Request lands on Min Ke's desk. He's got a backup in the drawer. I'll say it again. There's a backup.",
    "C046": "SeventhDay Answer, I Answer Zhou Yindi. You bring Zhaozhao, I shake my head. Does a head-shake count as a clip? Counts, keep it. Doesn't, cut it. I'm tired.",
    "C047": "Before they released the reservoir, people talking on the far bank, that's work. You cut it like a ghost story, I don't sit for interviews after this. I can read the water-level numbers again.",
    "C048": "After that I only call Zhou Yindi. Call anything else, main room doesn't take it. You still come shooting, I shut the door. This is a pickup VO after I shut it, at the village office. Clock there's wrong.",
    "C049": "I still call Zhaozhao. Yard takes it sometimes, sometimes doesn't. Those times it takes it, I don't look who. Look and it's gone. You air this, mask it. I say it anyway.",
    "C050": "StandInAnswer doesn't last. Substitute-answer. Lasting means your own line is there. Line's there, whoever calls, they take it. Line's gone, you called, it's still a stand-in. Your station likes treating the stand-in as the real one. That's your broadcast accident, not a genealogy matter.",
}


def roman_name(han: str) -> str:
    if han in SPECIAL_NAME:
        return SPECIAL_NAME[han]
    py = [p.replace("ü", "u") for p in lazy_pinyin(han, style=Style.NORMAL)]
    py = ["lu" if p == "lv" else p for p in py]
    if not py:
        return han
    surname = py[0][:1].upper() + py[0][1:]
    if len(py) == 1:
        return surname
    given = "".join(py[1:])
    given = given[:1].upper() + given[1:]
    return surname + " " + given


def roman_who(who: str) -> str:
    if who in SPECIAL_WHO:
        return SPECIAL_WHO[who]
    if "　" in who:
        village, name = who.split("　", 1)
        v = VILLAGES.get(village)
        if not v:
            raise SystemExit(f"unknown village {village!r} in {who!r}")
        return f"{v} · {roman_name(name)}"
    return roman_name(who)


def extras_and_tail(text: str, village: str) -> str:
    bits = []
    m = re.search(r"我把编号记成(\d+)号口播", text)
    if m:
        bits.append(
            f"I numbered this VO {m.group(1)}. Not the station number. I counted it myself."
        )
    if "穿胶鞋" in text:
        bits.append(
            "There was a person in rubber shoes who wouldn't leave a name. Half a sentence and he left."
        )
    if "话可能说重了" in text:
        bits.append(
            "Lights too bright, my eyes go, I might talk heavy. Heavy I still won't take it back."
        )
    elif "邻家让我别来" in text:
        bits.append("Neighbor said don't come. I came anyway. Came, I won't go empty.")
    elif "你们上次把我剪成点头" in text:
        bits.append("Last time you cut me down to a nod. This time I finish the sentence.")
    elif "水我自己带了" in text:
        bits.append("I brought my own water. Not drinking yours.")
    elif "我只这一回" in text:
        bits.append("This is my one time. Next time find someone else. Someone else talks better.")
    elif "案号我记不住" in text:
        dm = re.search(r"就是(\d+)月(\d+)日前后", text)
        if not dm:
            raise SystemExit("missing case-date tail")
        bits.append(
            f"I don't keep case numbers. I keep dates. Around {dm.group(1)}/{dm.group(2)}."
        )
    elif "镜头不要摇到门口" in text:
        bits.append("Don't pan to the doorway. Someone there doesn't want the camera.")
    elif "我嗓子不好" in text:
        bits.append("Throat's bad. Slow down, make do.")
    elif "讲到钱" in text:
        bits.append("Money, go by the slip. I'll get the number wrong out loud.")
    elif "天要黑" in text:
        bits.append(f"Light's going. I still have to walk back to {village}. That's all I've got.")
    else:
        raise SystemExit(f"unrecognized tail: {text[-40:]}")
    return " ".join(bits)


def noise_body(text: str, village: str, name: str) -> str:
    if "东口那块井盖没了" in text:
        n = re.search(r"没了(\d+)天", text).group(1)
        return (
            f"{village} here, I'm {name}. East mouth, that manhole cover's been gone {n} days. "
            f"I rode into it once. Knee's still purple. City management says the well is water-supply's. "
            f"Water-supply says it's roads'. I marked the day I fell on the calendar. Calendar's sitting in the stove grease. "
            f"You want to shoot, shoot the knee. Don't shoot my kid."
        )
    if "渡口今年少开" in text:
        n = re.search(r"多走(\d+)里土路", text).group(1)
        return (
            f"I'm {name}. {village} ferry dropped a run this year. Boatman says diesel's dear. "
            f"How dear he won't say. I figured it: market day means {n} more li of dirt road. "
            f"Dirt road in the rain, axle snapped once, snapped in front of me."
        )
    if "养蜂" in text:
        return (
            f"I'm {name}, I keep bees in {village}. Boxes got sprayed once. Half the bees dead. "
            f"Sprayer said pest control. Not my pests. I put the dead bees in a glass jar. Jar's here. "
            f"Don't open it. Stink hits."
        )
    if "鱼塘翻了" in text:
        return (
            f"Upstream ran white. {village} fish pond flipped. I, {name}, scooped a few, buried them. "
            f"Environment people came, took photos, flash caught me. Never saw the photos after. "
            f"Pond's empty now. Empty still smells."
        )
    if "路灯在" in text and "西口坏了" in text:
        return (
            f"Streetlight at {village} west mouth's been dead a long time. Night tricycle flipped. "
            f"I, {name}, reported it. Person on the phone told me to wait for a project listing. "
            f"I asked what project listing means three times. Three times they said it's on the way. "
            f"Road has no light."
        )
    if text.startswith("电表跳档") or "电表跳档。" in text[:20]:
        money = re.search(r"交了(\d+)块差额", text).group(1)
        return (
            f"Meter jumped a band. {village}, {name}. Reader said new rule. Notice is in the village-office back room. "
            f"Back room's locked. I paid {money} yuan difference. Receipt number I can't read out. Slip's in the padded jacket. "
            f"I don't dare kill the light. Light off, meter still runs."
        )
    if "垃圾堆到" in text:
        return (
            f"Trash piled to the {village} ditch edge. Summer I, {name}, don't dare open the window. "
            f"Sanitation said outside the line. Boundary stone's under grass. I shoveled once. Next day it was back. "
            f"I saw the back of the dumper's head. Not the face."
        )
    if "农药瓶堆" in text:
        return (
            f"Pesticide bottles piled by the {village} canal. A kid picked one up. I, {name}, buried it under the mulberry. "
            f"Later somebody dug it up, said they needed evidence. Evidence didn't leave. Pit's still there. "
            f"I don't let kids go that side of the canal now."
        )
    if "小学厕所" in text:
        return (
            f"{village} primary toilet's sealed. Kid came home saying they don't dare drink water. "
            f"I, {name}, found the principal. Principal said wait for a special project. "
            f"Special project is harder to wait for than the toilet. I brought my own stool, said this at the school gate. "
            f"When I'm done I leave."
        )
    if "校车晚到" in text:
        bus = re.search(r"班次写的是(\d+)路", text).group(1)
        return (
            f"School bus ran late. {village} junction, kids stood forty minutes. Driver's my uncle, I, {name}, can't really shout. "
            f"Schedule says route {bus}. What came was an empty bus. Empty bus doesn't stop. "
            f"I flagged it once. Got told I was blocking the road."
        )
    if "卫生室没药" in text:
        km = re.search(r"车坏在(\d+)公里外", text).group(1)
        return (
            f"{village} clinic's out of medicine. Told us go to the county. Two coaches a day, second one often dies. "
            f"I, {name}, turned around halfway once. Station said the bus broke {km} km out. Still no medicine."
        )
    if "宽带收了钱没来" in text:
        money = re.search(r"金额(\d+)", text).group(1)
        n = re.search(r"过(\d+)天到", text).group(1)
        return (
            f"Paid for broadband, nobody came. {village}, I'm {name}. Invoice's in the drawer, amount {money}. "
            f"Installer said {n} days. Days came, nobody. No phone signal either. I had the next village call you for me."
        )
    if "低保本上的人不是我" in text:
        month = re.search(r"让我(\d+)月再来", text).group(1)
        money = re.search(r"借条写了(\d+)块", text).group(1)
        return (
            f"I'm {name}, {village}. Person in the dibao booklet isn't me. Window says the system doesn't match, come back in month {month}. "
            f"Rice I borrowed next door, IOU says {money} yuan. I don't know systems. I know what an empty rice jar sounds like when you knock it."
        )
    if "医保单子" in text:
        trip = re.search(r"跑了(\d+)趟", text).group(1)
        money = re.search(r"药费(\d+)", text).group(1)
        return (
            f"Insurance form I ran {trip} times. {village} clinic stamped it wrong, township sent it back. "
            f"I, {name}, spread the form. Stamp's backwards. Medicine {money}, I floated it. Floated it, they said the year is closed. "
            f"Who closed the year, window pointed at the ceiling."
        )
    if "粮站收谷压级" in text:
        n = re.search(r"学习了(\d+)天", text).group(1)
        return (
            f"Grain depot docked the grade. {village}, I'm {name}. Same grain, next village one grade higher. "
            f"I asked for a lab. Lab door shut. Shut slip says study session. Session's been {n} days. "
            f"Grain's going damp at home. Damp docks the grade more."
        )
    if "苗黄了" in text:
        bag = re.search(r"留了(\d+)个空袋子", text).group(1)
        return (
            f"{name}. {village} seedlings went yellow. Dealer named Qian, he ran. I kept {bag} empty bags, sewed the mouths shut. "
            f"Ag station wants a lab fee. I haven't got a lab fee. Seedlings still in the field. Wind and they snap."
        )
    if "种子袋上画的是圆叶子" in text:
        return (
            f"Seed bag drew round leaves. {village} field came up pointed. I, {name}, kept half a bag. Half a bag the rats got. "
            f"Ag station said take photos. Photos live on the village's one computer that can reach the net. Computer's usually off."
        )
    if "彩钢棚被风掀了" in text:
        page = re.search(r"第(\d+)页", text).group(1)
        return (
            f"Wind took the color-steel shed. {village}, I'm {name}. Insurance said not in the clause. Clauses packed tight. "
            f"I got to page {page} and my eyes went. Frame's still in the yard. Sheet metal rolled into the neighbor's greens. Neighbor wants greens money."
        )
    if "拆迁办在" in text:
        money = re.search(r"少了(\d+)", text).group(1)
        return (
            f"Demolition office in {village} said one thing out loud. I, {name}, didn't wear my reading glasses the day I thumbed the print. They read the number. "
            f"Paper came later, short {money}. I went to village office. Village office said the clerk got borrowed away. "
            f"I brought the photocopy of the thumbprint. I can't read all the characters."
        )
    if "自来水有味" in text:
        n = re.search(r"扣了(\d+)天", text).group(1)
        return (
            f"{village} tap water smells. I, {name}, boiled it and sniffed. Smell stayed. Waterworks left a cup, forgot the cup. "
            f"I turned the cup over on the stove. {n} days. Nobody came for it."
        )
    if "桥面裂了一指宽" in text:
        clock = re.search(r"站了(\d+)分钟", text).group(1)
        return (
            f"{village} bridge deck split a finger wide. I, {name}, cross it every market day. Township said they'd measure. "
            f"Measurer stood {clock} minutes, said it isn't a dangerous-bridge standard yet. What booklet the standard's in, they didn't show me."
        )
    if "跑摩的" in text:
        return (
            f"I, {name}, run a motorbike taxi in {village}. Night road has no reflector strip. I stuck some on. Somebody tore them off. "
            f"When they tore them I didn't see a person, only glue still on the pole. Pole's bare now."
        )
    if "院里漂鞋" in text:
        trip = re.search(r"台阶第(\d+)级", text).group(1)
        well = re.search(r"井(\d+)号", text).group(1)
        return (
            f"Rain in {village}, shoes floating in the yard. I, {name}, measured. Water to step {trip}. Pump crew looked at well {well}, "
            f"left saying the leaves are natural. Natural leaves don't pile on the threshold again the next day."
        )
    if "末班车提前走" in text:
        return (
            f"Last bus left early. {village} stop, old people waited until the lights died. Dispatch number I, {name}, called. Voice told me to queue. "
            f"Queued until the voice hung up on itself. I still have the ticket. Clock on the ticket doesn't match when the bus left."
        )
    if "暖壶炸了" in text:
        dm = re.search(r"炸的那天是(\d+)月(\d+)日早饭", text)
        return (
            f"Supply co-op won't take returns. {village}, I, {name}, bought a thermos that blew. Invoice exists. They say they can't find the stub. "
            f"Day it blew was breakfast {dm.group(1)}/{dm.group(2)}. Rice water all over the stove. I still have the spout."
        )
    if "一口老井" in text:
        money = re.search(r"集资(\d+)", text).group(1)
        return (
            f"{village} has an old well, well curb cracked. I, {name}, draw water, rope wears that crack. Village office said they'd change the ring. "
            f"Changing the ring wants a collection of {money}. Collection list wrote half a wall. Rain washed the wall."
        )
    if "养老金少了" in text:
        money = re.search(r"少(\d+)", text).group(1)
        return (
            f"Pension came short. {village} credit union, I, {name}, counted the passbook, short {money}. Clerk said the system is like that. "
            f"System you can't drink. I brought a passbook copy. Fold on page three is mine. Don't take it for an alteration."
        )
    if "户口本掉了一页" in text:
        return (
            f"Hukou book dropped a page. {village} police post said get a village certificate. Village office said show the hukou book. "
            f"I, {name}, stuck in the middle. Page that dropped is the household-head column. Head is my father. Father's been gone four years. "
            f"Four years I won't get wrong."
        )
    if "看林" in text:
        well = re.search(r"编号(\d+)那棵", text).group(1)
        return (
            f"I, {name}, watch the woods in {village}. Somebody stole a tree, the one numbered {well}. I'm the only ranger. "
            f"Report receipt's in my pocket. Receipt got sweat-wet. Stump's still there. Tree isn't."
        )
    if "坟地被推过一角" in text:
        return (
            f"I'm {name}. {village} grave ground got a corner pushed. They said they were putting in a farm track. Track stopped halfway. "
            f"Stop landed exactly on our corner. I went looking. Other side pulled out a map. Map hasn't got our characters."
        )
    raise SystemExit(f"unrecognized noise body: {text[:60]}")


HAN = re.compile(r"[\u4e00-\u9fff]")
# Clips that originally contained 应声, plus 替应 clips whose required
# token StandInAnswer / substitute-answer necessarily contains "answer".
ANSWER_IDS = {
    "C001", "C002", "C003", "C004", "C005", "C009", "C013", "C020",
    "C023", "C024", "C026", "C042", "C046",
    "C011", "C018", "C035", "C050",
}


def compact(s: str) -> str:
    return re.sub(r"\s+", "", s).lower()


def load_clips() -> list[dict]:
    src_path = ZH if ZH.exists() else JS
    raw = src_path.read_text(encoding="utf-8")
    if "应声" not in raw:
        raise SystemExit(f"{src_path} is not the Chinese source")
    if not ZH.exists():
        ZH.write_text(raw, encoding="utf-8")
    m = re.search(r"window\.CLIPS\s*=\s*(\[.*\]);\s*$", raw, re.S)
    if not m:
        raise SystemExit("cannot parse clips source")
    return json.loads(m.group(1))


def translate(c: dict) -> dict:
    who = roman_who(c["who"])
    if c["id"] in PLOT:
        text = PLOT[c["id"]]
    else:
        if "　" not in c["who"]:
            raise SystemExit(f"noise without village: {c['id']} {c['who']}")
        village_h, name_h = c["who"].split("　", 1)
        village = VILLAGES[village_h]
        name = roman_name(name_h)
        body = noise_body(c["text"], village, name)
        tail = extras_and_tail(c["text"], village)
        text = body + " " + tail
    out = {
        "id": c["id"],
        "date": c["date"],
        "code": c["code"],
        "who": who,
        "text": text,
        "img": c["img"],
        "tokens": c["tokens"],
    }
    return out


def _sorted_ids(hits: list[dict]) -> list[str]:
    hits = sorted(hits, key=lambda c: (c["date"], c["id"]))
    return [c["id"] for c in hits]


def search_ids(clips: list[dict], q: str) -> list[str]:
    q = re.sub(r"\s+", "", q)
    needle = q.lower()
    hits = []
    for c in clips:
        hay = compact(c["text"]) + compact(c["who"])
        if needle in hay:
            hits.append(c)
    return _sorted_ids(hits)


def visible_search_ids(clips: list[dict], q: str) -> list[str]:
    q = re.sub(r"\s+", "", q)
    needle = q.lower()
    hits = []
    for c in clips:
        hay = compact(c["text"]) + compact(c["who"])
        if needle in hay:
            hits.append(c)
    return _sorted_ids(hits)


def main() -> None:
    src = load_clips()
    if len(src) != 280:
        raise SystemExit(f"expected 280 clips, got {len(src)}")
    out = []
    for c in src:
        t = translate(c)
        vis = t["who"] + t["text"]
        if HAN.search(vis):
            raise SystemExit(f"Han left in {t['id']}: {HAN.findall(vis)}")
        # Answer must not leak into non-plot-answer clips via visible text
        if "answer" in compact(t["text"] + t["who"]):
            if t["id"] not in ANSWER_IDS:
                raise SystemExit(f"Answer leaked into {t['id']}")
        out.append(t)

    missing_answer = ANSWER_IDS - {c["id"] for c in out if "answer" in compact(c["text"])}
    if missing_answer:
        raise SystemExit(f"Answer missing from {sorted(missing_answer)}")

    JS.write_text("window.CLIPS = " + json.dumps(out, ensure_ascii=False) + ";\n", encoding="utf-8")

    checks = {
        "Answer": 17,
        "Zhaozhao": 17,
        "ZhouYindi": 14,
        "Zhou Yindi": 14,
        "SeventhDay": 13,
        "seventh": 13,
        "DoNotUse": 5,
        "StandInAnswer": 4,
        "substitute-answer": 4,
        "StrikeOff": 4,
        "strike-off": 4,
    }
    for q, n in checks.items():
        ids = search_ids(out, q)
        vis = visible_search_ids(out, q)
        print(f"search {q!r}: {len(ids)} (visible {len(vis)}) {ids[:8]}...")
        if len(ids) != n:
            raise SystemExit(f"{q} expected {n} got {len(ids)} {ids}")
        if q in (
            "Answer", "Zhaozhao", "ZhouYindi", "Zhou Yindi", "SeventhDay",
            "seventh", "DoNotUse", "StandInAnswer", "substitute-answer",
            "StrikeOff", "strike-off",
        ) and len(vis) != n:
            raise SystemExit(f"{q} visible {len(vis)} expected {n} {vis}")

    if visible_search_ids(out, "ZhouYindi") != visible_search_ids(out, "Zhou Yindi"):
        raise SystemExit("ZhouYindi / Zhou Yindi mismatch")
    if set(visible_search_ids(out, "seventh")) != set(visible_search_ids(out, "SeventhDay")):
        extra = set(visible_search_ids(out, "seventh")) - set(visible_search_ids(out, "SeventhDay"))
        raise SystemExit(f"seventh extra {extra}")
    first5 = visible_search_ids(out, "Answer")[:5]
    if first5 != ["C001", "C002", "C003", "C004", "C005"]:
        raise SystemExit(f"Answer first five {first5}")

    plot_n = sum(1 for c in out if c["tokens"])
    print("wrote", JS)
    print("clips", len(out))
    print("plot_token_clips", plot_n)
    print("noise", len(out) - plot_n)
    print("first_search_word Answer")
    print("save_key minsheng-v1-en")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("FAIL", e, file=sys.stderr)
        raise
