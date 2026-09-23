/* V2: 600 individually authored cards. Source: design/cards-author.js. */
(function(root){'use strict';const D=typeof module!=='undefined'?require('./data.js'):root.BDData;const records=[
  {
    "id": "new01",
    "name": "温既白",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "wen",
    "artExt": "webp",
    "designArtKey": "person-new01",
    "text": "入场：回复2心神。每轮首次回复心神后：护身+2；若心神未满，抽1牌。",
    "shortText": "入场：回复2心神。每轮首次回复心神后：护身+2；若心神未满，抽1牌。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+2；若心神未满，抽1牌",
    "designId": "BDV2-001",
    "designEffect": "入场：回复2心神。每轮首次回复心神后：护身+2；若心神未满，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "if",
          "condition": "wounded",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "护身+2；若心神未满，抽1牌。",
      "intent": null
    },
    "signature": "e5b5a3e2729ad76444b0e0ca58b3d4e738b5433ed8bc0e3753f6dd7236d93b26"
  },
  {
    "id": "new02",
    "name": "宋绮",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 随身调查 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-new02",
    "text": "入场：交涉+1。每轮首次交涉行动后：抽1牌；挡住插话。",
    "shortText": "入场：交涉+1。每轮首次交涉行动后：抽1牌；挡住插话。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "抽1牌；挡住插话",
    "designId": "BDV2-002",
    "designEffect": "入场：交涉+1。每轮首次交涉行动后：抽1牌；挡住插话。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "courage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "抽1牌；挡住插话。",
      "intent": null
    },
    "signature": "fa303efbc598cce349496bada2c773350d0595018f26fa8db66589cc523c4218"
  },
  {
    "id": "new03",
    "name": "江蘅",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-new03",
    "text": "入场：脚步+1。每轮首次通路行动后：护身+2；脚步+1。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：护身+2；脚步+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+2；脚步+1",
    "designId": "BDV2-003",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：护身+2；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "护身+2；脚步+1。",
      "intent": null
    },
    "signature": "a88f3eaa04ef005d369b708672ea3a2cc314907fbca2dff2c3495cb40672446b"
  },
  {
    "id": "new04",
    "name": "阿豆",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 94,
    "sourceCase": 6,
    "source": "北段V2 · 随身调查 · 完成94场后习得",
    "sourceScene": "c6s04",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-new04",
    "text": "入场：抽1牌。每轮首次应对成功后：下轮费用+1；脚步+1。",
    "shortText": "入场：抽1牌。每轮首次应对成功后：下轮费用+1；脚步+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "下轮费用+1；脚步+1",
    "designId": "BDV2-004",
    "designEffect": "入场：抽1牌。每轮首次应对成功后：下轮费用+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "下轮费用+1；脚步+1。",
      "intent": null
    },
    "signature": "24debf7ef0c47c44cc09f8a14da74306fb7ffa863b645fbc76d6ae1f93e1d4fb"
  },
  {
    "id": "new05",
    "name": "并置异本",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；专注+1。",
    "shortText": "调查+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；专注+1",
    "designId": "BDV2-005",
    "designEffect": "调查+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；专注+1。",
      "intent": null
    },
    "signature": "fd0a3c5b08403d6fb59971cbe5edb625ebf578e9c0afa48c6d632a707df77a80"
  },
  {
    "id": "new06",
    "name": "视线复走",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；若有脚步，调查+1。",
    "shortText": "通路+1；若有脚步，调查+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+1；若有脚步，调查+1",
    "designId": "BDV2-006",
    "designEffect": "通路+1；若有脚步，调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "route1",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；若有脚步，调查+1。",
      "intent": null
    },
    "signature": "2c0768264700c4860a6fcc17c66c9a8ea03d338c932b8ed4195d4a8c45d014d5"
  },
  {
    "id": "new07",
    "name": "限定案发区间",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；专注+1；若专注至少2，抽1牌。",
    "shortText": "调查+2；专注+1；若专注至少2，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+2；专注+1；若专注至少2，抽1牌",
    "designId": "BDV2-007",
    "designEffect": "调查+2；专注+1；若专注至少2，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；专注+1；若专注至少2，抽1牌。",
      "intent": null
    },
    "signature": "e89403cf551a30ac7a3cdb0547032e9a4d487500bc2e4ba3f988b63e5bd66389"
  },
  {
    "id": "new08",
    "name": "核对先后",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；挡住插话。",
    "shortText": "调查+1；挡住插话。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；挡住插话",
    "designId": "BDV2-008",
    "designEffect": "调查+1；挡住插话。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；挡住插话。",
      "intent": null
    },
    "signature": "4ca3f737d9f119a4a8297ba5cf97d667341684f81e62b9916ca149d25e06b2fa"
  },
  {
    "id": "new09",
    "name": "分别询问",
    "cost": 2,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+2；信任+1。",
    "shortText": "交涉+2；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+2；信任+1",
    "designId": "BDV2-009",
    "designEffect": "交涉+2；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；信任+1。",
      "intent": null
    },
    "signature": "5e81dc480470fcc5f0cf9e53a74719548815f29a6e5c865f7f955c220ea1434c"
  },
  {
    "id": "new10",
    "name": "留出沉默",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。挡住催逼；下轮费用+1。",
    "shortText": "迅手（每轮同名限1）。挡住催逼；下轮费用+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "挡住催逼；下轮费用+1",
    "designId": "BDV2-010",
    "designEffect": "迅手（每轮同名限1）。挡住催逼；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "urge"
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住催逼；下轮费用+1。",
      "intent": null
    },
    "signature": "1bb0356685baeebb51339d461ee7a142da177f43a51c39a9586803669e3f9b45"
  },
  {
    "id": "new11",
    "name": "追问交接",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "交涉+1；若有脚步，抽1牌。",
    "shortText": "交涉+1；若有脚步，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+1；若有脚步，抽1牌",
    "designId": "BDV2-011",
    "designEffect": "交涉+1；若有脚步，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "route1",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；若有脚步，抽1牌。",
      "intent": null
    },
    "signature": "f6c732c7a987e200ae71ffe1d26531c1e2e17cbe7064cc00dff7f857bf949b51"
  },
  {
    "id": "new12",
    "name": "不替她回答",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "应对插话：交涉+2；信任+1。",
    "shortText": "应对插话：交涉+2；信任+1。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+2；信任+1",
    "designId": "BDV2-012",
    "designEffect": "应对插话：交涉+2；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；信任+1。",
      "intent": "interrupt"
    },
    "signature": "f8b51c0a1652e531de0e1af7a1f443823094e8bd249e5ad0e195e342fa89f12f"
  },
  {
    "id": "new13",
    "name": "转移灯位",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "挡住反光；调查+1。",
    "shortText": "挡住反光；调查+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "挡住反光；调查+1",
    "designId": "BDV2-013",
    "designEffect": "挡住反光；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住反光；调查+1。",
      "intent": null
    },
    "signature": "1c2e0ac4dd3d258e46fb5444545d7c0e4dab010f68eca107c40aeb01b0ae077d"
  },
  {
    "id": "new14",
    "name": "隔犬护送",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+4；脚步+1。",
    "shortText": "护身+4；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+4；脚步+1",
    "designId": "BDV2-014",
    "designEffect": "护身+4；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；脚步+1。",
      "intent": null
    },
    "signature": "edf70fae773952c8e5f9b2b1f19ed5e2358019212c9edec6588fe96d2a3f25d5"
  },
  {
    "id": "new15",
    "name": "护住湿纸",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "应对水险：干燥准备+1；抽1牌。",
    "shortText": "应对水险：干燥准备+1；抽1牌。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "干燥准备+1；抽1牌",
    "designId": "BDV2-015",
    "designEffect": "应对水险：干燥准备+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "干燥准备+1；抽1牌。",
      "intent": "water"
    },
    "signature": "430fa97ffdac7e0ce348e4ce8c8ded799540b6e588bab23f46ea55a9babf7cca"
  },
  {
    "id": "new16",
    "name": "先抬伤员",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "护身+5；护送伤员离险。",
    "shortText": "护身+5；护送伤员离险。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+5；护送伤员离险",
    "designId": "BDV2-016",
    "designEffect": "护身+5；护送伤员离险。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 5
        },
        {
          "op": "evacuate",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+5；护送伤员离险。",
      "intent": null
    },
    "signature": "809f680e882c1e711269c9debb48216b5e51471b9d34b1d90d6a8ad16a713884"
  },
  {
    "id": "new17",
    "name": "追查衣物流转",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "调查+1；若有专注，通路+1。",
    "shortText": "调查+1；若有专注，通路+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；若有专注，通路+1",
    "designId": "BDV2-017",
    "designEffect": "调查+1；若有专注，通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus1",
          "effects": [
            {
              "op": "leverage",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若有专注，通路+1。",
      "intent": null
    },
    "signature": "ae926f1ac7336d99084b62518733b571945e4aaef2b364e30503872f83a7ca1b"
  },
  {
    "id": "new18",
    "name": "追索抵押去向",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；抽取1张装备。",
    "shortText": "调查+2；抽取1张装备。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+2；抽取1张装备",
    "designId": "BDV2-018",
    "designEffect": "调查+2；抽取1张装备。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；抽取1张装备。",
      "intent": null
    },
    "signature": "e88e0435e02eafad9a6389a5eb48bd05d7b581734ad75ef0c2bcd01bb6c2d754"
  },
  {
    "id": "new19",
    "name": "对照车行路线",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；脚步+1。",
    "shortText": "通路+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+1；脚步+1",
    "designId": "BDV2-019",
    "designEffect": "通路+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；脚步+1。",
      "intent": null
    },
    "signature": "cf8102a1c60b209c31d286fc501d4fd3d560589f8ac7c907ed0dc2912fa8a370"
  },
  {
    "id": "new20",
    "name": "反查逃窗痕迹",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "调查+1；通路+1；专注+1。",
    "shortText": "调查+1；通路+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；通路+1；专注+1",
    "designId": "BDV2-020",
    "designEffect": "调查+1；通路+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；通路+1；专注+1。",
      "intent": null
    },
    "signature": "15242727229512dea19f781144c7370d8e405a5a9f785dbc05195c51441f5f07"
  },
  {
    "id": "new21",
    "name": "遮光提灯",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住反光。每轮首次调查行动后：调查+1；挡住反光。共4次。",
    "shortText": "入场：挡住反光。每轮首次调查行动后：调查+1；挡住反光。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；挡住反光",
    "designId": "BDV2-021",
    "designEffect": "入场：挡住反光。每轮首次调查行动后：调查+1；挡住反光。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；挡住反光。",
      "intent": null
    },
    "signature": "d54a6fe3a070a1bf4e9a91186f85a515259be3eabea95fd2bfc752d7ecaa8c87"
  },
  {
    "id": "new22",
    "name": "随身药箱",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "入场：回复2心神。每轮一次，1费：回复3心神；处理1级轻伤。共4次。",
    "shortText": "入场：回复2心神。每轮一次，1费：回复3心神；处理1级轻伤。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "回复3心神；处理1级轻伤",
    "designId": "BDV2-022",
    "designEffect": "入场：回复2心神。每轮一次，1费：回复3心神；处理1级轻伤。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 3
        },
        {
          "op": "care",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "回复3心神；处理1级轻伤。",
      "intent": null
    },
    "signature": "220314d7e523697338213d9716d4541255831631a89ffd2b2b35a4b082fff180"
  },
  {
    "id": "new23",
    "name": "拓印软垫",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：专注+1。每轮首次调查行动后：专注+1；若专注至少2，抽1牌。共4次。",
    "shortText": "入场：专注+1。每轮首次调查行动后：专注+1；若专注至少2，抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "专注+1；若专注至少2，抽1牌",
    "designId": "BDV2-023",
    "designEffect": "入场：专注+1。每轮首次调查行动后：专注+1；若专注至少2，抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；若专注至少2，抽1牌。",
      "intent": null
    },
    "signature": "99c9e3e8692e42a9b31682c89985228004c9eef78928f9c6de87224d89a22dc9"
  },
  {
    "id": "new24",
    "name": "标距绳尺",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：通路+1。每轮首次通路行动后：调查+1；脚步+1。共4次。",
    "shortText": "入场：通路+1。每轮首次通路行动后：调查+1；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；脚步+1",
    "designId": "BDV2-024",
    "designEffect": "入场：通路+1。每轮首次通路行动后：调查+1；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；脚步+1。",
      "intent": null
    },
    "signature": "625d14876b395f0a3bcb0593c10e3494f0b8a8952116685b9d22871fb1cb7fea"
  },
  {
    "id": "new25",
    "name": "分开等候区",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次交涉行动后：交涉+1；挡住插话。共3次。",
    "shortText": "每轮首次交涉行动后：交涉+1；挡住插话。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+1；挡住插话",
    "designId": "BDV2-025",
    "designEffect": "每轮首次交涉行动后：交涉+1；挡住插话。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "交涉+1；挡住插话。",
      "intent": null
    },
    "signature": "40fdc84186e5810180dc8fd6274dfd5d0c1632df58de76bdf993e518ffc6b33f"
  },
  {
    "id": "new26",
    "name": "撤离引导绳",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "每轮首次通路行动后：脚步+1；护身+2。共3次。",
    "shortText": "每轮首次通路行动后：脚步+1；护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "脚步+1；护身+2",
    "designId": "BDV2-026",
    "designEffect": "每轮首次通路行动后：脚步+1；护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+1；护身+2。",
      "intent": null
    },
    "signature": "f278d0d550caf795c3128b9b874e97e794c4a5f3a9fe6c2d8dc67551bd1149ac"
  },
  {
    "id": "new27",
    "name": "临时干燥台",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次回合末：干燥准备+1；挡住水险。共3次。",
    "shortText": "每轮首次回合末：干燥准备+1；挡住水险。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "干燥准备+1；挡住水险",
    "designId": "BDV2-027",
    "designEffect": "每轮首次回合末：干燥准备+1；挡住水险。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "干燥准备+1；挡住水险。",
      "intent": null
    },
    "signature": "050560098fa0d78d7e3a5104b6ccf349549ab68ece2c0dd1546255ad0403889e"
  },
  {
    "id": "new28",
    "name": "双人交接点",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "每轮首次应对成功后：调查+1；抽1牌。共3次。",
    "shortText": "每轮首次应对成功后：调查+1；抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+1；抽1牌",
    "designId": "BDV2-028",
    "designEffect": "每轮首次应对成功后：调查+1；抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1；抽1牌。",
      "intent": null
    },
    "signature": "9f2d2a87f66dc23bcf1c3deb09189e0a07bb491930fd61c916f574e03058e9b8"
  },
  {
    "id": "new29",
    "name": "接住落页",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。应对散页：抽1牌；专注+1。",
    "shortText": "迅手（每轮同名限1）。应对散页：抽1牌；专注+1。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "抽1牌；专注+1",
    "designId": "BDV2-029",
    "designEffect": "迅手（每轮同名限1）。应对散页：抽1牌；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽1牌；专注+1。",
      "intent": "scatter"
    },
    "signature": "84dc5aa0c20417d45f3427cddfafd6baab26bbfdd3ffebaf049ada46af099eac"
  },
  {
    "id": "new30",
    "name": "阻止抢夺",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对抢夺：护身+3；压制目标2。",
    "shortText": "应对抢夺：护身+3；压制目标2。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+3；压制目标2",
    "designId": "BDV2-030",
    "designEffect": "应对抢夺：护身+3；压制目标2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "damage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；压制目标2。",
      "intent": "grab"
    },
    "signature": "a09ef6d71100424efdbea759b0ddc2356bfe290ed070b761ca911d8dc7ea18cb"
  },
  {
    "id": "new31",
    "name": "要求当场复核",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 随身调查 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对仓促处置：调查+2；抽1牌。",
    "shortText": "应对仓促处置：调查+2；抽1牌。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+2；抽1牌",
    "designId": "BDV2-031",
    "designEffect": "应对仓促处置：调查+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；抽1牌。",
      "intent": "disposition"
    },
    "signature": "b11282f40f7ebb17c1248e24c70e4cab6237b120b617c1fc2ab38722352e1209"
  },
  {
    "id": "new32",
    "name": "截住转移",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对转移：通路+2；脚步+1。",
    "shortText": "应对转移：通路+2；脚步+1。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+2；脚步+1",
    "designId": "BDV2-032",
    "designEffect": "应对转移：通路+2；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；脚步+1。",
      "intent": "transfer"
    },
    "signature": "32afcd5b553cc78c26d64d2a338565213c4d6bf35f0a0772fef314ada9a5a770"
  },
  {
    "id": "card001",
    "name": "仔细观察",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2。",
    "shortText": "调查+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "调查+2",
    "designId": "BDV2-033",
    "designEffect": "调查+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2。",
      "intent": null
    },
    "signature": "afc37c96b85eebe337a61d14eb143b369e05d888dc26ce9af9e5be3f98f0315c"
  },
  {
    "id": "card002",
    "name": "听完再问",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+2。",
    "shortText": "交涉+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+2",
    "designId": "BDV2-034",
    "designEffect": "交涉+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2。",
      "intent": null
    },
    "signature": "736d59551629fc1ea780c62de0d4851f64a8942444ef5484a0a150c4d6e4e457"
  },
  {
    "id": "card003",
    "name": "探好退路",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2。",
    "shortText": "通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+2",
    "designId": "BDV2-035",
    "designEffect": "通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2。",
      "intent": null
    },
    "signature": "bb9f912aa3777e0979efdc37fc24b85f527ad81fff65c42cf02b29a920a8983c"
  },
  {
    "id": "card004",
    "name": "横刀架挡",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+5。",
    "shortText": "护身+5。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+5",
    "designId": "BDV2-036",
    "designEffect": "护身+5。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 5
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+5。",
      "intent": null
    },
    "signature": "d969cd5c67cc191aeb24763463cb99b4cf0f8f1808484e2a444df1379d48c49f"
  },
  {
    "id": "card005",
    "name": "调匀呼吸",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "回复4心神；消除1疲劳。",
    "shortText": "回复4心神；消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "回复4心神；消除1疲劳",
    "designId": "BDV2-037",
    "designEffect": "回复4心神；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 4
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复4心神；消除1疲劳。",
      "intent": null
    },
    "signature": "5255217afe58096521bdad72d60a382f174414088161c3b48dee395389d50267"
  },
  {
    "id": "card006",
    "name": "迎面逼退",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标4。",
    "shortText": "压制目标4。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "压制目标4",
    "designId": "BDV2-038",
    "designEffect": "压制目标4。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 4
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标4。",
      "intent": null
    },
    "signature": "a7d2a8988479a430f8a2e4489c0d8a80b5e300aecd3eed6fe344e3e4b407b31f"
  },
  {
    "id": "card007",
    "name": "打断冲势",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "打断目标本轮攻击。",
    "shortText": "打断目标本轮攻击。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "打断目标本轮攻击",
    "designId": "BDV2-039",
    "designEffect": "打断目标本轮攻击。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击。",
      "intent": null
    },
    "signature": "337adebe2c0731818c950b9e5c17f89d64100a9a0cda75025acba4f6d686679f"
  },
  {
    "id": "card008",
    "name": "理清头绪",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。专注+1；抽1牌。",
    "shortText": "迅手（每轮同名限1）。专注+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "专注+1；抽1牌",
    "designId": "BDV2-040",
    "designEffect": "迅手（每轮同名限1）。专注+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；抽1牌。",
      "intent": null
    },
    "signature": "63a13b1039b9ec91d38a092f8e3b43f5e19a5e6f6162b063b55c17bf0dacce1a"
  },
  {
    "id": "card009",
    "name": "跨过障碍",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；解1道束缚。",
    "shortText": "通路+1；解1道束缚。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+1；解1道束缚",
    "designId": "BDV2-041",
    "designEffect": "通路+1；解1道束缚。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；解1道束缚。",
      "intent": null
    },
    "signature": "e685daf7d843660c3a3fc478094e8771ae41c5a847ea8281494f762efdac6b80"
  },
  {
    "id": "card010",
    "name": "稳住阵脚",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；信任+1。",
    "shortText": "护身+3；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+3；信任+1",
    "designId": "BDV2-042",
    "designEffect": "护身+3；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；信任+1。",
      "intent": null
    },
    "signature": "87201414305a2a8ca943a68576b0f9da4c1fc04b56b78fa71b376082ccbf3179"
  },
  {
    "id": "card011",
    "name": "翻找行囊",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。抽2牌；弃最右1牌。",
    "shortText": "迅手（每轮同名限1）。抽2牌；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "抽2牌；弃最右1牌",
    "designId": "BDV2-043",
    "designEffect": "迅手（每轮同名限1）。抽2牌；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "draw",
          "n": 2
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽2牌；弃最右1牌。",
      "intent": null
    },
    "signature": "5f2b430aa6b29214405646403266dd7aaa97e0a56c62d6d13df0699e3823d37e"
  },
  {
    "id": "card012",
    "name": "逐个击破",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；若打散目标，抽1牌。",
    "shortText": "压制目标3；若打散目标，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "压制目标3；若打散目标，抽1牌",
    "designId": "BDV2-044",
    "designEffect": "压制目标3；若打散目标，抽1牌。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "if",
          "condition": "killed",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；若打散目标，抽1牌。",
      "intent": null
    },
    "signature": "4f421179bf419e2cb4169758a61add518e83ed756e8173d6dfa96684da7263bd"
  },
  {
    "id": "card013",
    "name": "挥棍扫开",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制所有威胁2。",
    "shortText": "压制所有威胁2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "压制所有威胁2",
    "designId": "BDV2-045",
    "designEffect": "压制所有威胁2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "sweep",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制所有威胁2。",
      "intent": null
    },
    "signature": "7c777208e2aafb711c59c66e0e259a2603b8583ff3b474bc87f006d5b70ab630"
  },
  {
    "id": "card014",
    "name": "挺身挡前",
    "cost": 2,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+7；破防+1。",
    "shortText": "护身+7；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+7；破防+1",
    "designId": "BDV2-046",
    "designEffect": "护身+7；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 7
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+7；破防+1。",
      "intent": null
    },
    "signature": "85bebf690f55d1a86e3f7526c804697d95179d32d8a02b22e19cd99bc7979dda"
  },
  {
    "id": "card015",
    "name": "坐下歇息",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "回复6心神；疲劳+1。",
    "shortText": "回复6心神；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "回复6心神；疲劳+1",
    "designId": "BDV2-047",
    "designEffect": "回复6心神；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 6
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复6心神；疲劳+1。",
      "intent": null
    },
    "signature": "ce1d3ee6a1210cbabe4fc8b139584f379c2d3167a4875a333e1957ff5676faa5"
  },
  {
    "id": "person05",
    "name": "顾承安",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 随身调查 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person05",
    "text": "入场：抽取1张装备。每轮首次部署装备后：护身+3。",
    "shortText": "入场：抽取1张装备。每轮首次部署装备后：护身+3。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "护身+3",
    "designId": "BDV2-048",
    "designEffect": "入场：抽取1张装备。每轮首次部署装备后：护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "护身+3。",
      "intent": null
    },
    "signature": "91ddd259cb2e6849af33f78cb84d9c3aa2236cb5d7fc6b4a26f83188ae3b80df"
  },
  {
    "id": "person06",
    "name": "梁福",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 5,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成5场后习得",
    "sourceScene": "c1s05",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person06",
    "text": "入场：护身+2。每轮首次通路行动后：通路+1；挡住催逼。",
    "shortText": "入场：护身+2。每轮首次通路行动后：通路+1；挡住催逼。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+1；挡住催逼",
    "designId": "BDV2-049",
    "designEffect": "入场：护身+2。每轮首次通路行动后：通路+1；挡住催逼。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "通路+1；挡住催逼。",
      "intent": null
    },
    "signature": "c278351e071cbffce6270f02ed846faeaa3a9c501a3afddba4c280ec1d3f3faa"
  },
  {
    "id": "person07",
    "name": "宋嫂",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 5,
    "sourceCase": 1,
    "source": "北段V2 · 随身调查 · 完成5场后习得",
    "sourceScene": "c1s05",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person07",
    "text": "入场：信任+1。每轮首次交涉行动后：回复2心神；信任+1。",
    "shortText": "入场：信任+1。每轮首次交涉行动后：回复2心神；信任+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "回复2心神；信任+1",
    "designId": "BDV2-050",
    "designEffect": "入场：信任+1。每轮首次交涉行动后：回复2心神；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "回复2心神；信任+1。",
      "intent": null
    },
    "signature": "124454a4160f65e04afedcb85ccfa9340c664d20697ab0b5bf3d2bec5ea791b9"
  },
  {
    "id": "person08",
    "name": "钱映棠",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 随身调查 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person08",
    "text": "入场：调查+1。每轮首次获得专注后：交涉+1。",
    "shortText": "入场：调查+1。每轮首次获得专注后：交涉+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+1",
    "designId": "BDV2-051",
    "designEffect": "入场：调查+1。每轮首次获得专注后：交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "focus_gain",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "交涉+1。",
      "intent": null
    },
    "signature": "46f7bbd84afe2320aa27036bfdf5decb2f1d709f73f64ec6c0db98dc45bbe949"
  },
  {
    "id": "person09",
    "name": "许照宁",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 45,
    "sourceCase": 3,
    "source": "北段V2 · 随身调查 · 完成45场后习得",
    "sourceScene": "c3s09",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person09",
    "text": "入场：挡住催逼。每轮首次交涉行动后：信任+1；下轮费用+1。",
    "shortText": "入场：挡住催逼。每轮首次交涉行动后：信任+1；下轮费用+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "信任+1；下轮费用+1",
    "designId": "BDV2-052",
    "designEffect": "入场：挡住催逼。每轮首次交涉行动后：信任+1；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "信任+1；下轮费用+1。",
      "intent": null
    },
    "signature": "ca2edfa655983293e204336a2f6eb6076205504fe3734b2abe55b2de667194f7"
  },
  {
    "id": "person10",
    "name": "孟秋岚",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 随身调查 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person10",
    "text": "入场：护身+3。每轮首次受伤后：回复2心神；挡住催逼。",
    "shortText": "入场：护身+3。每轮首次受伤后：回复2心神；挡住催逼。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "回复2心神；挡住催逼",
    "designId": "BDV2-053",
    "designEffect": "入场：护身+3。每轮首次受伤后：回复2心神；挡住催逼。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "回复2心神；挡住催逼。",
      "intent": null
    },
    "signature": "de9dd358d54b3bda2c09ae27ad6a133bcf9b30ee7c7f7bf4128acb39f61bed76"
  },
  {
    "id": "person11",
    "name": "素秋姨母",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 随身调查 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person11",
    "text": "入场：回复2心神。每轮首次回合末：若已有护身，回复2心神。",
    "shortText": "入场：回复2心神。每轮首次回合末：若已有护身，回复2心神。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "若已有护身，回复2心神",
    "designId": "BDV2-054",
    "designEffect": "入场：回复2心神。每轮首次回合末：若已有护身，回复2心神。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "heal",
              "n": 2
            }
          ]
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "若已有护身，回复2心神。",
      "intent": null
    },
    "signature": "d7df2d677a0239d426c6214aef7cc46c8c045a917ef2d34d9c4f51e3111fe531"
  },
  {
    "id": "person12",
    "name": "邵云岚",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 随身调查 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person12",
    "text": "入场：专注+1。每轮首次调查行动后：若有信任，调查+1；抽1牌。",
    "shortText": "入场：专注+1。每轮首次调查行动后：若有信任，调查+1；抽1牌。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "若有信任，调查+1；抽1牌",
    "designId": "BDV2-055",
    "designEffect": "入场：专注+1。每轮首次调查行动后：若有信任，调查+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "resolve1",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "若有信任，调查+1；抽1牌。",
      "intent": null
    },
    "signature": "d469c89bdfcdab08eaaa2fc6ddba4325d2a16cf69ae24344d47fc9ff2a95f0ab"
  },
  {
    "id": "person13",
    "name": "邵云筝",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 随身调查 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person13",
    "text": "入场：信任+1。每轮首次应对成功后：交涉+1；护身+2。",
    "shortText": "入场：信任+1。每轮首次应对成功后：交涉+1；护身+2。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "交涉+1；护身+2",
    "designId": "BDV2-056",
    "designEffect": "入场：信任+1。每轮首次应对成功后：交涉+1；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "交涉+1；护身+2。",
      "intent": null
    },
    "signature": "f00680f913aa19875b8e9275c9a3ab0f3a3ac233b7d182d34677b7cd4cae1bb7"
  },
  {
    "id": "person14",
    "name": "严鹤生",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 80,
    "sourceCase": 5,
    "source": "北段V2 · 随身调查 · 完成80场后习得",
    "sourceScene": "c5s08",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person14",
    "text": "入场：专注+1。每轮首次调查行动后：若有装备，调查+1；信任+1。",
    "shortText": "入场：专注+1。每轮首次调查行动后：若有装备，调查+1；信任+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "若有装备，调查+1；信任+1",
    "designId": "BDV2-057",
    "designEffect": "入场：专注+1。每轮首次调查行动后：若有装备，调查+1；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "若有装备，调查+1；信任+1。",
      "intent": null
    },
    "signature": "3199eba3974e9e9aa9ad02b8e57c6d7e58dff577e12142e40fc08f0909ff053d"
  },
  {
    "id": "person15",
    "name": "余雪梅",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 75,
    "sourceCase": 5,
    "source": "北段V2 · 随身调查 · 完成75场后习得",
    "sourceScene": "c5s03",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person15",
    "text": "入场：挡住水险。每轮首次调查行动后：干燥准备+1；专注+1。",
    "shortText": "入场：挡住水险。每轮首次调查行动后：干燥准备+1；专注+1。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "干燥准备+1；专注+1",
    "designId": "BDV2-058",
    "designEffect": "入场：挡住水险。每轮首次调查行动后：干燥准备+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "干燥准备+1；专注+1。",
      "intent": null
    },
    "signature": "35232ddead02968f7d92c10e8a13ed074e6c7049957f77a699c942a193f178b7"
  },
  {
    "id": "person16",
    "name": "柏正",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 75,
    "sourceCase": 5,
    "source": "北段V2 · 随身调查 · 完成75场后习得",
    "sourceScene": "c5s03",
    "art": "type-person",
    "artExt": "svg",
    "designArtKey": "person-person16",
    "text": "入场：脚步+1。每轮首次通路行动后：通路+1；抽1牌。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：通路+1；抽1牌。",
    "conditions": "最多3名协作者",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "随身调查",
    "buildRole": "通路+1；抽1牌",
    "designId": "BDV2-059",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：通路+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "通路+1；抽1牌。",
      "intent": null
    },
    "signature": "03c8500c0a1cdcf04f195fda37781e664f9413ad69c3463fb4d6ce6715f508cb"
  },
  {
    "id": "card016",
    "name": "何巡",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "person-he",
    "text": "入场：护身+3。每轮首次压制后：压制目标1；护身+1。",
    "shortText": "入场：护身+3。每轮首次压制后：压制目标1；护身+1。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标1；护身+1",
    "designId": "BDV2-060",
    "designEffect": "入场：护身+3。每轮首次压制后：压制目标1；护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "压制目标1；护身+1。",
      "intent": null
    },
    "signature": "9ff6d137d1feade9a5ee0d26e1cd22f7e09c9845661aa813fd67d0a13385dfcd"
  },
  {
    "id": "card017",
    "name": "值班女医",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "person-doctor",
    "text": "入场：回复3心神。每轮首次进入下一幕：回复3心神；消除1疲劳。",
    "shortText": "入场：回复3心神。每轮首次进入下一幕：回复3心神；消除1疲劳。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "回复3心神；消除1疲劳",
    "designId": "BDV2-061",
    "designEffect": "入场：回复3心神。每轮首次进入下一幕：回复3心神；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 3
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "回复3心神；消除1疲劳。",
      "intent": null
    },
    "signature": "99ccae581b12ee0b5a580c16c98320f438143a3f5a1a6cd173846749db2b4f60"
  },
  {
    "id": "card018",
    "name": "巡夜更夫",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "person-patrol",
    "text": "入场：信任+1。每轮首次回合开始：若没有其他协作者，护身+2。",
    "shortText": "入场：信任+1。每轮首次回合开始：若没有其他协作者，护身+2。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "若没有其他协作者，护身+2",
    "designId": "BDV2-062",
    "designEffect": "入场：信任+1。每轮首次回合开始：若没有其他协作者，护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "otherAlone",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "若没有其他协作者，护身+2。",
      "intent": null
    },
    "signature": "ec892d79d49342c063e036129307aeddab0b5f345c73679bca1ab0feab71c054"
  },
  {
    "id": "card019",
    "name": "客栈伙计",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "person-innkeeper",
    "text": "入场：抽1牌。每轮首次部署装备后：下轮费用+1；抽1牌。",
    "shortText": "入场：抽1牌。每轮首次部署装备后：下轮费用+1；抽1牌。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "下轮费用+1；抽1牌",
    "designId": "BDV2-063",
    "designEffect": "入场：抽1牌。每轮首次部署装备后：下轮费用+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "下轮费用+1；抽1牌。",
      "intent": null
    },
    "signature": "40e52de72764121d672aaced37b0851875f43ae421480f93e801fe2b58e99cba"
  },
  {
    "id": "card020",
    "name": "摆渡船工",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "person-ferryman",
    "text": "入场：解1道束缚。每轮首次通路行动后：护身+2；抽1牌。",
    "shortText": "入场：解1道束缚。每轮首次通路行动后：护身+2；抽1牌。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+2；抽1牌",
    "designId": "BDV2-064",
    "designEffect": "入场：解1道束缚。每轮首次通路行动后：护身+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "护身+2；抽1牌。",
      "intent": null
    },
    "signature": "fa266d4e5a00d3e656bc44db80c1d5d8cf1aa3ae3459c1ad852b487798deee43"
  },
  {
    "id": "card021",
    "name": "临时工役",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "person-carpenter",
    "text": "入场：抽取1张布置。每轮首次获得护身后：若有装备，脚步+1。",
    "shortText": "入场：抽取1张布置。每轮首次获得护身后：若有装备，脚步+1。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "若有装备，脚步+1",
    "designId": "BDV2-065",
    "designEffect": "入场：抽取1张布置。每轮首次获得护身后：若有装备，脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "shield_gain",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "drawMode",
          "value": "setup"
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "route",
              "n": 1
            }
          ]
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "若有装备，脚步+1。",
      "intent": null
    },
    "signature": "ba0fbdfa3d3eac5419364f9ffc9d4a3e70cb1794091f73c3a541c09073f54b32"
  },
  {
    "id": "card022",
    "name": "档房抄手",
    "cost": 2,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "person-clerk",
    "text": "入场：抽1牌。每轮首次调查行动后：专注+1；挡住散页。",
    "shortText": "入场：抽1牌。每轮首次调查行动后：专注+1；挡住散页。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "专注+1；挡住散页",
    "designId": "BDV2-066",
    "designEffect": "入场：抽1牌。每轮首次调查行动后：专注+1；挡住散页。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "专注+1；挡住散页。",
      "intent": null
    },
    "signature": "5e53ec2a6dcafa4d3c8a1f66377216f830576193f3c990370d79e495e3de1da7"
  },
  {
    "id": "card023",
    "name": "抬担架的协作者",
    "cost": 1,
    "type": "人物",
    "mode": "person",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "person-porter",
    "text": "入场：脚步+1。每轮首次布置后：护身+3；通路+1。",
    "shortText": "入场：脚步+1。每轮首次布置后：护身+3；通路+1。",
    "conditions": "最多3名协作者",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；通路+1",
    "designId": "BDV2-067",
    "designEffect": "入场：脚步+1。每轮首次布置后：护身+3；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "person",
      "trigger": "deploy_setup",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 99,
      "activateCost": 0,
      "effectText": "护身+3；通路+1。",
      "intent": null
    },
    "signature": "9a0fdb45a84113397926f2548f4da859e54ee48152e0d153ba7130bc9c2a3d8b"
  },
  {
    "id": "card024",
    "name": "拔刀示警",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；目标压力−1。",
    "shortText": "压制目标2；目标压力−1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标2；目标压力−1",
    "designId": "BDV2-068",
    "designEffect": "压制目标2；目标压力−1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；目标压力−1。",
      "intent": null
    },
    "signature": "a70b6c4011d901251852270c907e9fd200db207050a67600a39dece1c4881bd3"
  },
  {
    "id": "card025",
    "name": "横棍封路",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "压制目标2；护身+3。",
    "shortText": "压制目标2；护身+3。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标2；护身+3",
    "designId": "BDV2-069",
    "designEffect": "压制目标2；护身+3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；护身+3。",
      "intent": null
    },
    "signature": "a0d5c15131e734970eaddd3430b60ea4c920fe4d5efeb52494fc19f2de15cbe5"
  },
  {
    "id": "card026",
    "name": "贴身短打",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "迅手（每轮同名限1）。压制目标2；破防+1。",
    "shortText": "迅手（每轮同名限1）。压制目标2；破防+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标2；破防+1",
    "designId": "BDV2-070",
    "designEffect": "迅手（每轮同名限1）。压制目标2；破防+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；破防+1。",
      "intent": null
    },
    "signature": "8845ec6868ca743a338a7c5b5c2b838eb926d2841e9210e44daecbcf689c6558"
  },
  {
    "id": "card027",
    "name": "挑开刀锋",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标1；打断目标本轮攻击。",
    "shortText": "压制目标1；打断目标本轮攻击。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标1；打断目标本轮攻击",
    "designId": "BDV2-071",
    "designEffect": "压制目标1；打断目标本轮攻击。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "stun",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标1；打断目标本轮攻击。",
      "intent": null
    },
    "signature": "72d5a5e9d54f4619017ab12acd60df88f4949af392164e96242ffa33a1c512c8"
  },
  {
    "id": "card028",
    "name": "抢占先手",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；若这是本轮首张牌，目标压力−1。",
    "shortText": "压制目标3；若这是本轮首张牌，目标压力−1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；若这是本轮首张牌，目标压力−1",
    "designId": "BDV2-072",
    "designEffect": "压制目标3；若这是本轮首张牌，目标压力−1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "if",
          "condition": "first",
          "effects": [
            {
              "op": "weaken",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；若这是本轮首张牌，目标压力−1。",
      "intent": null
    },
    "signature": "ec996d7494f232e6874a1e810947b1ab7797021ef267ceb31e3ef6ec2af430ef"
  },
  {
    "id": "card029",
    "name": "压住手腕",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "目标压力−2；护身+1。",
    "shortText": "目标压力−2；护身+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标压力−2；护身+1",
    "designId": "BDV2-073",
    "designEffect": "目标压力−2；护身+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−2；护身+1。",
      "intent": null
    },
    "signature": "8e35d24fd7eacd272ea51a9c2af52bda3acbb20d563eae0c2d09c9c30fe3e86d"
  },
  {
    "id": "card030",
    "name": "蹬墙借力",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；脚步+1。",
    "shortText": "压制目标3；脚步+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；脚步+1",
    "designId": "BDV2-074",
    "designEffect": "压制目标3；脚步+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；脚步+1。",
      "intent": null
    },
    "signature": "001c246fbeba98088b7ce5df1d24278a36928a8ad75c8a56baff950cf0dead49"
  },
  {
    "id": "card031",
    "name": "借门反推",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；若已有护身，压制目标2。",
    "shortText": "护身+3；若已有护身，压制目标2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；若已有护身，压制目标2",
    "designId": "BDV2-075",
    "designEffect": "护身+3；若已有护身，压制目标2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；若已有护身，压制目标2。",
      "intent": null
    },
    "signature": "a8c80562ee762eee998ea6d8db399573d391bb9ef79ee6cb42e65b5fe7b16d82"
  },
  {
    "id": "card032",
    "name": "闪身让刀",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。挡住下次敌袭；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。挡住下次敌袭；疲劳+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "挡住下次敌袭；疲劳+1",
    "designId": "BDV2-076",
    "designEffect": "迅手（每轮同名限1）。挡住下次敌袭；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "blockNext",
          "n": 1
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住下次敌袭；疲劳+1。",
      "intent": null
    },
    "signature": "e82d800e9f22a76f51e4f106c663cdc5e301d733aaea98cd19cebd1f7dbe700b"
  },
  {
    "id": "card033",
    "name": "以伤换隙",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "迅手（每轮同名限1）。失去2心神；压制目标5。",
    "shortText": "迅手（每轮同名限1）。失去2心神；压制目标5。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "失去2心神；压制目标5",
    "designId": "BDV2-077",
    "designEffect": "迅手（每轮同名限1）。失去2心神；压制目标5。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "hurt",
          "n": 2
        },
        {
          "op": "damage",
          "n": 5
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "失去2心神；压制目标5。",
      "intent": null
    },
    "signature": "eaa1bb32dd2a2d1bf9cd6fbdf5b54b28d5a831d957d1c83df8d5972861f5a6be"
  },
  {
    "id": "card034",
    "name": "夺下凶器",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "目标压力−2；压制目标2。",
    "shortText": "目标压力−2；压制目标2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标压力−2；压制目标2",
    "designId": "BDV2-078",
    "designEffect": "目标压力−2；压制目标2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "damage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−2；压制目标2。",
      "intent": null
    },
    "signature": "9d497475b289898d0682d9794b1f45f9af77454f49c9f74f7328182caa54e6ee"
  },
  {
    "id": "card035",
    "name": "趁隙追击",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；若目标已被打断，压制目标4。",
    "shortText": "压制目标2；若目标已被打断，压制目标4。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标2；若目标已被打断，压制目标4",
    "designId": "BDV2-079",
    "designEffect": "压制目标2；若目标已被打断，压制目标4。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "stunned",
          "effects": [
            {
              "op": "damage",
              "n": 4
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；若目标已被打断，压制目标4。",
      "intent": null
    },
    "signature": "f7b003014227bf2673967f7beb30c95cf671170fdef58770e5834bb9ecaea0d1"
  },
  {
    "id": "card036",
    "name": "夹击退敌",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；若有两名协作者，压制目标3。",
    "shortText": "压制目标3；若有两名协作者，压制目标3。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；若有两名协作者，压制目标3",
    "designId": "BDV2-080",
    "designEffect": "压制目标3；若有两名协作者，压制目标3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "damage",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；若有两名协作者，压制目标3。",
      "intent": null
    },
    "signature": "2672cb967c3cc6083771a1f76411e561b020374e70907d1173e8fb2bfda05b16"
  },
  {
    "id": "card037",
    "name": "护住身后",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；若有协作者，护身+3。",
    "shortText": "护身+3；若有协作者，护身+3。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；若有协作者，护身+3",
    "designId": "BDV2-081",
    "designEffect": "护身+3；若有协作者，护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "shield",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；若有协作者，护身+3。",
      "intent": null
    },
    "signature": "9e5713ce37a29cd2634d0be65594d77ffb960423dff4a9e4ccd3b0e0f113f1f9"
  },
  {
    "id": "card038",
    "name": "佯退半步",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。脚步+1；下轮费用+1；破防+1。",
    "shortText": "迅手（每轮同名限1）。脚步+1；下轮费用+1；破防+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "脚步+1；下轮费用+1；破防+1",
    "designId": "BDV2-082",
    "designEffect": "迅手（每轮同名限1）。脚步+1；下轮费用+1；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；下轮费用+1；破防+1。",
      "intent": null
    },
    "signature": "cd9c0dd1ba9ff1a2950b5c03cff9a98a0d20c2684afa52aec4f5dbda49920b3c"
  },
  {
    "id": "card039",
    "name": "回身一击",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "压制目标3；若有脚步，护身+2。",
    "shortText": "压制目标3；若有脚步，护身+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；若有脚步，护身+2",
    "designId": "BDV2-083",
    "designEffect": "压制目标3；若有脚步，护身+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "if",
          "condition": "route1",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；若有脚步，护身+2。",
      "intent": null
    },
    "signature": "54020713e2df8f09d18e63617c36be603bf0322f57d3acc0bcab247f8bc62c86"
  },
  {
    "id": "card040",
    "name": "劈开木栏",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标5；通路+1。",
    "shortText": "压制目标5；通路+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标5；通路+1",
    "designId": "BDV2-084",
    "designEffect": "压制目标5；通路+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 5
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标5；通路+1。",
      "intent": null
    },
    "signature": "982ce59d92b9b04e060e272f351d8aa88114c434e121b6e64f0406d40137d5b5"
  },
  {
    "id": "card041",
    "name": "手肘开路",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；若目标已受削弱，通路+2。",
    "shortText": "压制目标2；若目标已受削弱，通路+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标2；若目标已受削弱，通路+2",
    "designId": "BDV2-085",
    "designEffect": "压制目标2；若目标已受削弱，通路+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；若目标已受削弱，通路+2。",
      "intent": null
    },
    "signature": "f423e75dceda1c6766cf5825ef5c7d34f972b6ac80eb05a41b6346b5f15a1bdc"
  },
  {
    "id": "card042",
    "name": "石子掷眼",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "打断目标本轮攻击；目标破绽+1。",
    "shortText": "打断目标本轮攻击；目标破绽+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "打断目标本轮攻击；目标破绽+1",
    "designId": "BDV2-086",
    "designEffect": "打断目标本轮攻击；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；目标破绽+1。",
      "intent": null
    },
    "signature": "59a448849f9a3c182971f5d819b502f82c78ad9a76a30f6a0b3f9c9307451c3a"
  },
  {
    "id": "card043",
    "name": "绊住脚踝",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标1；目标压力−1；若有脚步，打断目标本轮攻击。",
    "shortText": "压制目标1；目标压力−1；若有脚步，打断目标本轮攻击。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标1；目标压力−1；若有脚步，打断目标本轮攻击",
    "designId": "BDV2-087",
    "designEffect": "压制目标1；目标压力−1；若有脚步，打断目标本轮攻击。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "if",
          "condition": "route1",
          "effects": [
            {
              "op": "stun",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标1；目标压力−1；若有脚步，打断目标本轮攻击。",
      "intent": null
    },
    "signature": "96dc5e43c42c411f7ceda9849796e23222e5794bac8c08f09b0de87c1e9238f5"
  },
  {
    "id": "card044",
    "name": "拦腰撞开",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标4；打断目标本轮攻击；疲劳+1。",
    "shortText": "压制目标4；打断目标本轮攻击；疲劳+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标4；打断目标本轮攻击；疲劳+1",
    "designId": "BDV2-088",
    "designEffect": "压制目标4；打断目标本轮攻击；疲劳+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 4
        },
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标4；打断目标本轮攻击；疲劳+1。",
      "intent": null
    },
    "signature": "a57574530e31ca968c54e2d4116762d8b5a5fc24fb8617e5dd9c3956b6d8f9cc"
  },
  {
    "id": "card045",
    "name": "袖中沙土",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。目标压力−1；目标破绽+1。",
    "shortText": "迅手（每轮同名限1）。目标压力−1；目标破绽+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标压力−1；目标破绽+1",
    "designId": "BDV2-089",
    "designEffect": "迅手（每轮同名限1）。目标压力−1；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；目标破绽+1。",
      "intent": null
    },
    "signature": "edbbf4857b97b8db53f181a8a6936f6e39a0d7ac66f01cd951d07ea6fb8fbc94"
  },
  {
    "id": "card046",
    "name": "挑断绳扣",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "解1道束缚；压制目标2。",
    "shortText": "解1道束缚；压制目标2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "解1道束缚；压制目标2",
    "designId": "BDV2-090",
    "designEffect": "解1道束缚；压制目标2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "damage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；压制目标2。",
      "intent": null
    },
    "signature": "3d79905a64c63b1c0895356fb574fb94446bfddab35c0d2944986c05b011a4da"
  },
  {
    "id": "card047",
    "name": "卸去重心",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "目标压力−1；若目标已受削弱，打断目标本轮攻击。",
    "shortText": "目标压力−1；若目标已受削弱，打断目标本轮攻击。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标压力−1；若目标已受削弱，打断目标本轮攻击",
    "designId": "BDV2-091",
    "designEffect": "目标压力−1；若目标已受削弱，打断目标本轮攻击。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "stun",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；若目标已受削弱，打断目标本轮攻击。",
      "intent": null
    },
    "signature": "c10e318ae3e96a8d79dac51ddc0faee385bee3ec3d886fdb6c2886f1c6423af3"
  },
  {
    "id": "card048",
    "name": "定住门户",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+6；反击+2。",
    "shortText": "护身+6；反击+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+6；反击+2",
    "designId": "BDV2-092",
    "designEffect": "护身+6；反击+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 6
        },
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+6；反击+2。",
      "intent": null
    },
    "signature": "81ea8823089efe500b4821bb13a370ebae500b73e48c1885aa29e7e89388be89"
  },
  {
    "id": "card049",
    "name": "借势反打",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "反击+3；若有脚步，护身+2。",
    "shortText": "反击+3；若有脚步，护身+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "反击+3；若有脚步，护身+2",
    "designId": "BDV2-093",
    "designEffect": "反击+3；若有脚步，护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "counter",
          "n": 3
        },
        {
          "op": "if",
          "condition": "route1",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "反击+3；若有脚步，护身+2。",
      "intent": null
    },
    "signature": "7c09ead5f91894c1048951fb29481cee3dfe8b52f338fec2fbfe33ed92414e76"
  },
  {
    "id": "card050",
    "name": "留力守身",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。护身+2；下轮费用+1。",
    "shortText": "迅手（每轮同名限1）。护身+2；下轮费用+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+2；下轮费用+1",
    "designId": "BDV2-094",
    "designEffect": "迅手（每轮同名限1）。护身+2；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；下轮费用+1。",
      "intent": null
    },
    "signature": "4d6cdc75d55a358de7cf5cc3a8de86dc91b31f2b0fdb891a2be0da452810f92e"
  },
  {
    "id": "card051",
    "name": "穿巷疾走",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2；疲劳+1；抽1牌。",
    "shortText": "通路+2；疲劳+1；抽1牌。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "通路+2；疲劳+1；抽1牌",
    "designId": "BDV2-095",
    "designEffect": "通路+2；疲劳+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；疲劳+1；抽1牌。",
      "intent": null
    },
    "signature": "504e19277213f949bee066c7ce2caac37388ae91415254d07340fc4c4058055f"
  },
  {
    "id": "card052",
    "name": "翻过矮墙",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "解1道束缚；脚步+2。",
    "shortText": "解1道束缚；脚步+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "解1道束缚；脚步+2",
    "designId": "BDV2-096",
    "designEffect": "解1道束缚；脚步+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "route",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；脚步+2。",
      "intent": null
    },
    "signature": "9c1822c35910c04131f69e5d580a57ec620ecb1bf0d06fd869f6c81a32e1329e"
  },
  {
    "id": "card053",
    "name": "绕到侧后",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "目标破绽+2；脚步+1。",
    "shortText": "目标破绽+2；脚步+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标破绽+2；脚步+1",
    "designId": "BDV2-097",
    "designEffect": "目标破绽+2；脚步+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标破绽+2；脚步+1。",
      "intent": null
    },
    "signature": "17f483a8488a285d5d9ae496b6bae84d1994df340488f7b6672c5ef8cf80b3c0"
  },
  {
    "id": "card054",
    "name": "压低身形",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。护身+2；挡住反光。",
    "shortText": "迅手（每轮同名限1）。护身+2；挡住反光。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+2；挡住反光",
    "designId": "BDV2-098",
    "designEffect": "迅手（每轮同名限1）。护身+2；挡住反光。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；挡住反光。",
      "intent": null
    },
    "signature": "73f889ad7ecbcae1003f71db2e074576c8f7efd910d6373fb23376a128194ecc"
  },
  {
    "id": "card055",
    "name": "趁乱脱身",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；若有至少两处威胁，通路+2。",
    "shortText": "通路+1；若有至少两处威胁，通路+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "通路+1；若有至少两处威胁，通路+2",
    "designId": "BDV2-099",
    "designEffect": "通路+1；若有至少两处威胁，通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "enemies2",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；若有至少两处威胁，通路+2。",
      "intent": null
    },
    "signature": "0df2288bab35d6b05c62bed88982afa3efe83aa0d79eac4f3332971f98079d30"
  },
  {
    "id": "card056",
    "name": "斩断纠缠",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "解2道束缚；压制所有威胁1。",
    "shortText": "解2道束缚；压制所有威胁1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "解2道束缚；压制所有威胁1",
    "designId": "BDV2-100",
    "designEffect": "解2道束缚；压制所有威胁1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 2
        },
        {
          "op": "sweep",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解2道束缚；压制所有威胁1。",
      "intent": null
    },
    "signature": "7626156abf2f14ba35da6744a837ab458485662fc4877ea17acb755e3f92409c"
  },
  {
    "id": "card057",
    "name": "破门突入",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标4；通路+2；破防+1。",
    "shortText": "压制目标4；通路+2；破防+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标4；通路+2；破防+1",
    "designId": "BDV2-101",
    "designEffect": "压制目标4；通路+2；破防+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 4
        },
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标4；通路+2；破防+1。",
      "intent": null
    },
    "signature": "bcf6e321a827f65c8de8f44a3395edf4473c59b245c581856f5f5c0304ab11e7"
  },
  {
    "id": "card058",
    "name": "铁尺格刃",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+4；若有装备，反击+2。",
    "shortText": "护身+4；若有装备，反击+2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+4；若有装备，反击+2",
    "designId": "BDV2-102",
    "designEffect": "护身+4；若有装备，反击+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "counter",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；若有装备，反击+2。",
      "intent": null
    },
    "signature": "92df997346d249ce65aeea8a1b3932679bd19a8afc16b93f8fa1e96e73f48d3c"
  },
  {
    "id": "card059",
    "name": "前后照应",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；若有两名协作者，抽1牌。",
    "shortText": "护身+3；若有两名协作者，抽1牌。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；若有两名协作者，抽1牌",
    "designId": "BDV2-103",
    "designEffect": "护身+3；若有两名协作者，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；若有两名协作者，抽1牌。",
      "intent": null
    },
    "signature": "147d8d54482c728db5d99dcbab659e0edc73f55c9cda1e23cbd152468688eba1"
  },
  {
    "id": "card060",
    "name": "断喝制止",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "目标压力−1；交涉+1。",
    "shortText": "目标压力−1；交涉+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "目标压力−1；交涉+1",
    "designId": "BDV2-104",
    "designEffect": "目标压力−1；交涉+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；交涉+1。",
      "intent": null
    },
    "signature": "c6602cea02cda481eff2690e0d0ca87726228768daae7f3a7b8a42639d4c6878"
  },
  {
    "id": "card061",
    "name": "护着退开",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；通路+1；脚步+1。",
    "shortText": "护身+2；通路+1；脚步+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+2；通路+1；脚步+1",
    "designId": "BDV2-105",
    "designEffect": "护身+2；通路+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；通路+1；脚步+1。",
      "intent": null
    },
    "signature": "683f0f9842930490156d0b0a5e9ed89af5b451f3ba1794e5a9d5173d57cd531c"
  },
  {
    "id": "card062",
    "name": "趁势缴械",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；若目标已受削弱，目标压力−2。",
    "shortText": "压制目标3；若目标已受削弱，目标压力−2。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；若目标已受削弱，目标压力−2",
    "designId": "BDV2-106",
    "designEffect": "压制目标3；若目标已受削弱，目标压力−2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "weaken",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；若目标已受削弱，目标压力−2。",
      "intent": null
    },
    "signature": "fa80e78a56d75e13bbc5ada84af9d99f740a3503067e4af76653ab91555c8d6f"
  },
  {
    "id": "card063",
    "name": "击落灯架",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制所有威胁3；挡住反光。",
    "shortText": "压制所有威胁3；挡住反光。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制所有威胁3；挡住反光",
    "designId": "BDV2-107",
    "designEffect": "压制所有威胁3；挡住反光。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "sweep",
          "n": 3
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制所有威胁3；挡住反光。",
      "intent": null
    },
    "signature": "b4d380bc56d92e07b4ff33aaba3dac4a6d3b3fb8dd7a1c923f6a26dbd4e1e818"
  },
  {
    "id": "card064",
    "name": "立棍横扫",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制所有威胁2；所有威胁压力−1。",
    "shortText": "压制所有威胁2；所有威胁压力−1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制所有威胁2；所有威胁压力−1",
    "designId": "BDV2-108",
    "designEffect": "压制所有威胁2；所有威胁压力−1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "sweep",
          "n": 2
        },
        {
          "op": "weakenAll",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制所有威胁2；所有威胁压力−1。",
      "intent": null
    },
    "signature": "740763a6cda21ea3960c22caebb9532623e5512e55e5db7d0064851a1e5de2a6"
  },
  {
    "id": "card065",
    "name": "架起长凳",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+4；通路+1。",
    "shortText": "护身+4；通路+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+4；通路+1",
    "designId": "BDV2-109",
    "designEffect": "护身+4；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；通路+1。",
      "intent": null
    },
    "signature": "b238064a560906c311573f288ee7b57232cb75bfebd0e6177f9d3e0f7ee8a6b3"
  },
  {
    "id": "card066",
    "name": "踢开倒架",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；脚步+1；目标破绽+1。",
    "shortText": "压制目标3；脚步+1；目标破绽+1。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "压制目标3；脚步+1；目标破绽+1",
    "designId": "BDV2-110",
    "designEffect": "压制目标3；脚步+1；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；脚步+1；目标破绽+1。",
      "intent": null
    },
    "signature": "0fd3f5bbb170c16c01de18bed2e3b7056054fcec29e864af1d98fc91723413cd"
  },
  {
    "id": "card067",
    "name": "浸布裹手",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；解1道束缚；失去1心神。",
    "shortText": "护身+3；解1道束缚；失去1心神。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；解1道束缚；失去1心神",
    "designId": "BDV2-111",
    "designEffect": "护身+3；解1道束缚；失去1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "hurt",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；解1道束缚；失去1心神。",
      "intent": null
    },
    "signature": "0fcf065556474a9bbb73f4010cd9b72d74f8649dc14f5a24abf5094e87bedf1b"
  },
  {
    "id": "card068",
    "name": "扯开门帘",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。挡住反光；抽1牌。",
    "shortText": "迅手（每轮同名限1）。挡住反光；抽1牌。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "挡住反光；抽1牌",
    "designId": "BDV2-112",
    "designEffect": "迅手（每轮同名限1）。挡住反光；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住反光；抽1牌。",
      "intent": null
    },
    "signature": "03c83741e88a009e664d031a6972fee6103dfc15361adb3e6278e28e4ea39fc0"
  },
  {
    "id": "card069",
    "name": "稳扎马步",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 守夜攻防 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；保留护身+3。",
    "shortText": "护身+3；保留护身+3。",
    "conditions": "",
    "omen": "站在谁身前，便要承受谁身后的风。",
    "archetype": "守夜攻防",
    "buildRole": "护身+3；保留护身+3",
    "designId": "BDV2-113",
    "designEffect": "护身+3；保留护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "retain",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；保留护身+3。",
      "intent": null
    },
    "signature": "4df907e9b2a3f6f64ea827f66c8388059e13b2b4d3446deeba07bb4398f959f5"
  },
  {
    "id": "card070",
    "name": "短木棍",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 兵器与随行工具 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "每轮首次压制后：压制目标1。共4次。",
    "shortText": "每轮首次压制后：压制目标1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "压制目标1",
    "designId": "BDV2-114",
    "designEffect": "每轮首次压制后：压制目标1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "压制目标1。",
      "intent": null
    },
    "signature": "a9524908c4ad15b31f5a94d1c56f83c2b1ae6cd534d4d7ed6cc69458f353e7c4"
  },
  {
    "id": "card071",
    "name": "巡夜腰刀",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 兵器与随行工具 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：压制目标2。每轮首次压制后：若目标已受削弱，压制目标2。共4次。",
    "shortText": "入场：压制目标2。每轮首次压制后：若目标已受削弱，压制目标2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若目标已受削弱，压制目标2",
    "designId": "BDV2-115",
    "designEffect": "入场：压制目标2。每轮首次压制后：若目标已受削弱，压制目标2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "damage",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若目标已受削弱，压制目标2。",
      "intent": null
    },
    "signature": "085c77f07d327af71dff83de7f81b4dd527f8a6aba7b718e4acabd32e64ba7fa"
  },
  {
    "id": "card072",
    "name": "护手铁尺",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 兵器与随行工具 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：护身+2。每轮首次挡住压力后：反击+2。共4次。",
    "shortText": "入场：护身+2。每轮首次挡住压力后：反击+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "反击+2",
    "designId": "BDV2-116",
    "designEffect": "入场：护身+2。每轮首次挡住压力后：反击+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "反击+2。",
      "intent": null
    },
    "signature": "43c29e5f608fab1a8a23db53b03a87821f744fa052eb613cbe73814e1384e686"
  },
  {
    "id": "card073",
    "name": "旧藤牌",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 兵器与随行工具 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+2。每轮首次回合开始：护身+2。共4次。",
    "shortText": "入场：护身+2。每轮首次回合开始：护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2",
    "designId": "BDV2-117",
    "designEffect": "入场：护身+2。每轮首次回合开始：护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2。",
      "intent": null
    },
    "signature": "7592bbac5d0547e64acbd2fee6fa445d16eaf2f719132e794c27b5d1efb9add6"
  },
  {
    "id": "card074",
    "name": "折叠长凳",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+1。每轮首次防护行动后：护身+2；通路+1。共4次。",
    "shortText": "入场：护身+1。每轮首次防护行动后：护身+2；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2；通路+1",
    "designId": "BDV2-118",
    "designEffect": "入场：护身+1。每轮首次防护行动后：护身+2；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_guard",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；通路+1。",
      "intent": null
    },
    "signature": "b9e152b65a6a1132f5c6e21c33e2a2fb2a84ca4df235d18454e22adecf82a231"
  },
  {
    "id": "card075",
    "name": "麻绳套索",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮一次，1费：目标压力−1；解1道束缚。共4次。",
    "shortText": "入场：脚步+1。每轮一次，1费：目标压力−1；解1道束缚。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "目标压力−1；解1道束缚",
    "designId": "BDV2-119",
    "designEffect": "入场：脚步+1。每轮一次，1费：目标压力−1；解1道束缚。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "目标压力−1；解1道束缚。",
      "intent": null
    },
    "signature": "54285b08e470d476769e12d0b97d7b3c200c42fd8612b7eb108a96f8a344adf8"
  },
  {
    "id": "card076",
    "name": "牛皮护腕",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+2。每轮首次受伤后：护身+3。共4次。",
    "shortText": "入场：护身+2。每轮首次受伤后：护身+3。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+3",
    "designId": "BDV2-120",
    "designEffect": "入场：护身+2。每轮首次受伤后：护身+3。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+3。",
      "intent": null
    },
    "signature": "5bc052f4b2f0585cca172dbaa50413b6fbeca512737aca22851db054e5b2c999"
  },
  {
    "id": "card077",
    "name": "厚底布鞋",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次通路行动后：脚步+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "脚步+1",
    "designId": "BDV2-121",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "脚步+1。",
      "intent": null
    },
    "signature": "8e42e48fb07d3a6055897fd443889489573f3603dea0da2c063566aee4655b14"
  },
  {
    "id": "card078",
    "name": "软底夜行鞋",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次打出技能后：若这是本轮首张牌，通路+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次打出技能后：若这是本轮首张牌，通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若这是本轮首张牌，通路+1",
    "designId": "BDV2-122",
    "designEffect": "入场：脚步+1。每轮首次打出技能后：若这是本轮首张牌，通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "skill",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "first",
          "effects": [
            {
              "op": "leverage",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若这是本轮首张牌，通路+1。",
      "intent": null
    },
    "signature": "b3adf33f94313c9b96ed9d8ee29df00b53f6957427606f56795d87851ad1e7c0"
  },
  {
    "id": "card079",
    "name": "长柄夹钳",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：解1道束缚。每轮首次压制后：若目标已被打断，压制目标2。共4次。",
    "shortText": "入场：解1道束缚。每轮首次压制后：若目标已被打断，压制目标2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若目标已被打断，压制目标2",
    "designId": "BDV2-123",
    "designEffect": "入场：解1道束缚。每轮首次压制后：若目标已被打断，压制目标2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "stunned",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若目标已被打断，压制目标2。",
      "intent": null
    },
    "signature": "6ab911246d49573d62075093ff471b267837c64f98d0ef23758cd9fd11f9826a"
  },
  {
    "id": "card080",
    "name": "撬门铁杆",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：通路+1。每轮首次通路行动后：压制目标2。共4次。",
    "shortText": "入场：通路+1。每轮首次通路行动后：压制目标2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "压制目标2",
    "designId": "BDV2-124",
    "designEffect": "入场：通路+1。每轮首次通路行动后：压制目标2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "压制目标2。",
      "intent": null
    },
    "signature": "ace37fbd9d85cd13f6d0907d2835c151b78e16762bed45a726ee871c1c0be558"
  },
  {
    "id": "card081",
    "name": "工匠木楔",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：通路+1。每轮首次获得护身后：保留护身+1。共4次。",
    "shortText": "入场：通路+1。每轮首次获得护身后：保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "保留护身+1",
    "designId": "BDV2-125",
    "designEffect": "入场：通路+1。每轮首次获得护身后：保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "shield_gain",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+1。",
      "intent": null
    },
    "signature": "3df08c2e3c6d28efdf4149db5ef7194c2ddd6bcae64fd023ec7a76abb875447e"
  },
  {
    "id": "card082",
    "name": "折叠小刀",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "每轮一次，1费：解1道束缚；压制目标1。共4次。",
    "shortText": "每轮一次，1费：解1道束缚；压制目标1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "解1道束缚；压制目标1",
    "designId": "BDV2-126",
    "designEffect": "每轮一次，1费：解1道束缚；压制目标1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "damage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "解1道束缚；压制目标1。",
      "intent": null
    },
    "signature": "b05fa3332c075b32908261bdb052892a5b0acdc5206f9822274e82b6f5d9cc06"
  },
  {
    "id": "card083",
    "name": "缠柄手斧",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：压制目标1。每轮首次压制后：若本次压制前目标有破绽，压制目标2。共4次。",
    "shortText": "入场：压制目标1。每轮首次压制后：若本次压制前目标有破绽，压制目标2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若本次压制前目标有破绽，压制目标2",
    "designId": "BDV2-127",
    "designEffect": "入场：压制目标1。每轮首次压制后：若本次压制前目标有破绽，压制目标2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "damage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "exposedBeforeHit",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若本次压制前目标有破绽，压制目标2。",
      "intent": null
    },
    "signature": "b9d112d69ca3be0b0d97da63d6d0b71d57646b4d2f3379620bb9002d5b35ee61"
  },
  {
    "id": "card084",
    "name": "拴索钩爪",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次通路行动后：解1道束缚；通路+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：解1道束缚；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "解1道束缚；通路+1",
    "designId": "BDV2-128",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：解1道束缚；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "解1道束缚；通路+1。",
      "intent": null
    },
    "signature": "cf2677f48d6a0c8b7dc0df73f69094c50f3c516f425067a96da0ff25aa3cb949"
  },
  {
    "id": "card085",
    "name": "竹制背架",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-bag",
    "text": "入场：抽取1张装备。每轮首次部署装备后：护身+2；抽1牌。共4次。",
    "shortText": "入场：抽取1张装备。每轮首次部署装备后：护身+2；抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2；抽1牌",
    "designId": "BDV2-129",
    "designEffect": "入场：抽取1张装备。每轮首次部署装备后：护身+2；抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；抽1牌。",
      "intent": null
    },
    "signature": "e96035d9028152b85dba98c58637fa0097da19c18ddcdc7ee2d91a7709873ea8"
  },
  {
    "id": "card086",
    "name": "防滑草绳",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：通路+1。每轮首次进入下一幕：脚步+1；挡住转移。共4次。",
    "shortText": "入场：通路+1。每轮首次进入下一幕：脚步+1；挡住转移。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "脚步+1；挡住转移",
    "designId": "BDV2-130",
    "designEffect": "入场：通路+1。每轮首次进入下一幕：脚步+1；挡住转移。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "cover",
          "value": "transfer"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "脚步+1；挡住转移。",
      "intent": null
    },
    "signature": "043cecb2f18b543c217dcd3565ff9b3cd255a285cc5020260a8e7cea5f398591"
  },
  {
    "id": "card087",
    "name": "轻便斗笠",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 5,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成5场后习得",
    "sourceScene": "c1s05",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住水险。每轮首次应对成功后：护身+2。共4次。",
    "shortText": "入场：挡住水险。每轮首次应对成功后：护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2",
    "designId": "BDV2-131",
    "designEffect": "入场：挡住水险。每轮首次应对成功后：护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2。",
      "intent": null
    },
    "signature": "78614831749e00f50f2be954d01d0680ea403b2f4fa9fb2f23ff36b6f26b78c4"
  },
  {
    "id": "card088",
    "name": "油布披肩",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 5,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成5场后习得",
    "sourceScene": "c1s05",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住水险。每轮首次回合开始：若已有护身，护身+1；挡住水险。共4次。",
    "shortText": "入场：挡住水险。每轮首次回合开始：若已有护身，护身+1；挡住水险。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若已有护身，护身+1；挡住水险",
    "designId": "BDV2-132",
    "designEffect": "入场：挡住水险。每轮首次回合开始：若已有护身，护身+1；挡住水险。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "shield",
              "n": 1
            }
          ]
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若已有护身，护身+1；挡住水险。",
      "intent": null
    },
    "signature": "f1b68f508176355dcba2cc90cf51b007b45f0ada0bde8b4238ceffe18adbfc7e"
  },
  {
    "id": "card089",
    "name": "沉铁镇纸",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 5,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成5场后习得",
    "sourceScene": "c1s05",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：挡住散页。每轮首次调查行动后：护身+1；挡住散页。共4次。",
    "shortText": "入场：挡住散页。每轮首次调查行动后：护身+1；挡住散页。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+1；挡住散页",
    "designId": "BDV2-133",
    "designEffect": "入场：挡住散页。每轮首次调查行动后：护身+1；挡住散页。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+1；挡住散页。",
      "intent": null
    },
    "signature": "f6ffef08745f67d818c905b56e7e9635b418b5e60f6c65bd2e634e2585bf47e1"
  },
  {
    "id": "card090",
    "name": "执录钢笔",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：专注+1。每轮首次交涉行动后：专注+1。共4次。",
    "shortText": "入场：专注+1。每轮首次交涉行动后：专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "专注+1",
    "designId": "BDV2-134",
    "designEffect": "入场：专注+1。每轮首次交涉行动后：专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1。",
      "intent": null
    },
    "signature": "5e0a5f86ea043801ad7a0fa4238587178bbf653029845824df6136f8518a5527"
  },
  {
    "id": "card091",
    "name": "硬壳记事簿",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：抽1牌。每轮首次调查行动后：若专注至少2，抽1牌。共4次。",
    "shortText": "入场：抽1牌。每轮首次调查行动后：若专注至少2，抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若专注至少2，抽1牌",
    "designId": "BDV2-135",
    "designEffect": "入场：抽1牌。每轮首次调查行动后：若专注至少2，抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若专注至少2，抽1牌。",
      "intent": null
    },
    "signature": "ec80eea5a81540838bebd5e4a0c8eb2969a0a12b95ce2b120b868e2841738456"
  },
  {
    "id": "card092",
    "name": "口袋放大镜",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：专注+1。每轮一次，1费：调查+1；专注+1。共4次。",
    "shortText": "入场：专注+1。每轮一次，1费：调查+1；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "调查+1；专注+1",
    "designId": "BDV2-136",
    "designEffect": "入场：专注+1。每轮一次，1费：调查+1；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "调查+1；专注+1。",
      "intent": null
    },
    "signature": "79f202859c37df69ec408c700a43c9ed57c1fa8dff8d2212a951e86cd0505be1"
  },
  {
    "id": "card093",
    "name": "小口哨",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 7,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成7场后习得",
    "sourceScene": "c1s07",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-whistle",
    "text": "入场：信任+1。每轮首次应对成功后：交涉+1。共4次。",
    "shortText": "入场：信任+1。每轮首次应对成功后：交涉+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "交涉+1",
    "designId": "BDV2-137",
    "designEffect": "入场：信任+1。每轮首次应对成功后：交涉+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "交涉+1。",
      "intent": null
    },
    "signature": "d688961df2236346f11e09d9959684fcb7fd97d3014dcc0f6f2f4d64d47df813"
  },
  {
    "id": "card094",
    "name": "双头铜哨",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 7,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成7场后习得",
    "sourceScene": "c1s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-whistle",
    "text": "入场：挡住催逼。每轮首次协作者入场后：护身+2；信任+1。共4次。",
    "shortText": "入场：挡住催逼。每轮首次协作者入场后：护身+2；信任+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2；信任+1",
    "designId": "BDV2-138",
    "designEffect": "入场：挡住催逼。每轮首次协作者入场后：护身+2；信任+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_person",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；信任+1。",
      "intent": null
    },
    "signature": "f5abee84cf2924785dd8ef0f570c7ac804ce0acebad6239b491aad7a69846d69"
  },
  {
    "id": "card095",
    "name": "便携药水",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 7,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成7场后习得",
    "sourceScene": "c1s07",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "每轮一次，1费：回复3心神；耗尽此装备。共4次。",
    "shortText": "每轮一次，1费：回复3心神；耗尽此装备。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "回复3心神；耗尽此装备",
    "designId": "BDV2-139",
    "designEffect": "每轮一次，1费：回复3心神；耗尽此装备。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 3
        },
        {
          "op": "exhaustSelf",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "回复3心神；耗尽此装备。",
      "intent": null
    },
    "signature": "453b47a2ba4fd5b280161e5434e2d0635db715b04a7d1160239c90d427f28f9b"
  },
  {
    "id": "card096",
    "name": "干净绷带",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 7,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成7场后习得",
    "sourceScene": "c1s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：回复1心神。每轮首次回复心神后：消除1疲劳；护身+1。共4次。",
    "shortText": "入场：回复1心神。每轮首次回复心神后：消除1疲劳；护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "消除1疲劳；护身+1",
    "designId": "BDV2-140",
    "designEffect": "入场：回复1心神。每轮首次回复心神后：消除1疲劳；护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "消除1疲劳；护身+1。",
      "intent": null
    },
    "signature": "fcd4513ce69923efb249423316a2f3f629e44ef39c158d7bc6af0364be6f5c73"
  },
  {
    "id": "card097",
    "name": "护心棉衣",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+3。每轮首次受伤后：回复1心神；护身+1。共4次。",
    "shortText": "入场：护身+3。每轮首次受伤后：回复1心神；护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "回复1心神；护身+1",
    "designId": "BDV2-141",
    "designEffect": "入场：护身+3。每轮首次受伤后：回复1心神；护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "回复1心神；护身+1。",
      "intent": null
    },
    "signature": "1b3596b6f3a9c09f673faaef7304a3359785ec76d2aa8ee299b526b6c9d9a268"
  },
  {
    "id": "card098",
    "name": "细线针包",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "每轮一次，1费：回复2心神；保留护身+1。共4次。",
    "shortText": "每轮一次，1费：回复2心神；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "回复2心神；保留护身+1",
    "designId": "BDV2-142",
    "designEffect": "每轮一次，1费：回复2心神；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "回复2心神；保留护身+1。",
      "intent": null
    },
    "signature": "890733145b4c9b0ac38e76ecc40264c66b9c6c7923fb9641f554e039d7c976bd"
  },
  {
    "id": "card099",
    "name": "温水竹筒",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：回复2心神。每轮首次进入下一幕：消除1疲劳；回复1心神。共4次。",
    "shortText": "入场：回复2心神。每轮首次进入下一幕：消除1疲劳；回复1心神。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "消除1疲劳；回复1心神",
    "designId": "BDV2-143",
    "designEffect": "入场：回复2心神。每轮首次进入下一幕：消除1疲劳；回复1心神。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "消除1疲劳；回复1心神。",
      "intent": null
    },
    "signature": "da8936d2cbc1c3323d919e8e5d5a72c70ce6e97fc658cf002169a81858a6f335"
  },
  {
    "id": "card100",
    "name": "急救剪刀",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "每轮一次，1费：解1道束缚；回复1心神。共4次。",
    "shortText": "每轮一次，1费：解1道束缚；回复1心神。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "解1道束缚；回复1心神",
    "designId": "BDV2-144",
    "designEffect": "每轮一次，1费：解1道束缚；回复1心神。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "解1道束缚；回复1心神。",
      "intent": null
    },
    "signature": "a09b03535b8bdf3cb58eea46ae102bc231f200ff3bf2b2a9ca4a74344c6e101e"
  },
  {
    "id": "card101",
    "name": "清凉油",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "入场：消除1疲劳。每轮首次调查行动后：消除1疲劳；专注+1。共4次。",
    "shortText": "入场：消除1疲劳。每轮首次调查行动后：消除1疲劳；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "消除1疲劳；专注+1",
    "designId": "BDV2-145",
    "designEffect": "入场：消除1疲劳。每轮首次调查行动后：消除1疲劳；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "calm",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "消除1疲劳；专注+1。",
      "intent": null
    },
    "signature": "342eddbfb02756168c65728c0afaf9dde73d9342644e4288b6c0b66985b94fcd"
  },
  {
    "id": "card102",
    "name": "备用灯芯",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住反光。每轮首次部署装备后：专注+1；下轮费用+1。共4次。",
    "shortText": "入场：挡住反光。每轮首次部署装备后：专注+1；下轮费用+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "专注+1；下轮费用+1",
    "designId": "BDV2-146",
    "designEffect": "入场：挡住反光。每轮首次部署装备后：专注+1；下轮费用+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；下轮费用+1。",
      "intent": null
    },
    "signature": "2194e2e22ba7e17605dcda4f9903cf347065fe4ef4183fc4638c3488e87f2730"
  },
  {
    "id": "card103",
    "name": "三折挡风板",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+2。每轮首次应对成功后：保留护身+2。共4次。",
    "shortText": "入场：护身+2。每轮首次应对成功后：保留护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "保留护身+2",
    "designId": "BDV2-147",
    "designEffect": "入场：护身+2。每轮首次应对成功后：保留护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+2。",
      "intent": null
    },
    "signature": "88b921b9f77826d0d29bfbed0c55439eceeeeaac3514ededfc271c83c53d484d"
  },
  {
    "id": "card104",
    "name": "肩挎皮袋",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-bag",
    "text": "入场：抽1牌。每轮首次抽牌后：若手牌不超过2张，抽1牌。共4次。",
    "shortText": "入场：抽1牌。每轮首次抽牌后：若手牌不超过2张，抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若手牌不超过2张，抽1牌",
    "designId": "BDV2-148",
    "designEffect": "入场：抽1牌。每轮首次抽牌后：若手牌不超过2张，抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "draw",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "hand2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若手牌不超过2张，抽1牌。",
      "intent": null
    },
    "signature": "64ae18598be5749577e6f30d4d66e412968aa8ca0808a29a6deb145e44222dcd"
  },
  {
    "id": "card105",
    "name": "双层衣袋",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-bag",
    "text": "入场：抽1牌。每轮首次打出技能后：若手牌不超过2张，下轮费用+1。共4次。",
    "shortText": "入场：抽1牌。每轮首次打出技能后：若手牌不超过2张，下轮费用+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若手牌不超过2张，下轮费用+1",
    "designId": "BDV2-149",
    "designEffect": "入场：抽1牌。每轮首次打出技能后：若手牌不超过2张，下轮费用+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "skill",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "hand2",
          "effects": [
            {
              "op": "nextEnergy",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若手牌不超过2张，下轮费用+1。",
      "intent": null
    },
    "signature": "3ef0f07e4e1ed6ce54e1155ef51703b6433a5fed77a99ce4496722833678060e"
  },
  {
    "id": "card106",
    "name": "防水证物袋",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-bag",
    "text": "入场：挡住水险。每轮首次调查行动后：挡住水险；挡住散页。共4次。",
    "shortText": "入场：挡住水险。每轮首次调查行动后：挡住水险；挡住散页。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "挡住水险；挡住散页",
    "designId": "BDV2-150",
    "designEffect": "入场：挡住水险。每轮首次调查行动后：挡住水险；挡住散页。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "water"
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "挡住水险；挡住散页。",
      "intent": null
    },
    "signature": "0ba9ae70a444964c8d2940d06e39ed6be69bddae868b98cd413a361c53333b6d"
  },
  {
    "id": "card107",
    "name": "便携砂盘",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：调查+1。每轮首次通路行动后：调查+1；若脚步至少2，专注+1。共4次。",
    "shortText": "入场：调查+1。每轮首次通路行动后：调查+1；若脚步至少2，专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "调查+1；若脚步至少2，专注+1",
    "designId": "BDV2-151",
    "designEffect": "入场：调查+1。每轮首次通路行动后：调查+1；若脚步至少2，专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "route2",
          "effects": [
            {
              "op": "focus",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；若脚步至少2，专注+1。",
      "intent": null
    },
    "signature": "4922974fe48ba5ddedd217ea80fa4e1926b8932df0b5cbf50553aac466d553c0"
  },
  {
    "id": "card108",
    "name": "钢头登山杖",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+2。每轮首次通路行动后：压制目标1；护身+2。共4次。",
    "shortText": "入场：护身+2。每轮首次通路行动后：压制目标1；护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "压制目标1；护身+2",
    "designId": "BDV2-152",
    "designEffect": "入场：护身+2。每轮首次通路行动后：压制目标1；护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "压制目标1；护身+2。",
      "intent": null
    },
    "signature": "fbc5156d14ad9e17d310cc1a1ee5714375ed38c6c37d82be22fcb7453420de40"
  },
  {
    "id": "card109",
    "name": "窄刃解绳刀",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：解1道束缚。每轮首次解救行动后：解1道束缚；抽1牌。共4次。",
    "shortText": "入场：解1道束缚。每轮首次解救行动后：解1道束缚；抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "解1道束缚；抽1牌",
    "designId": "BDV2-153",
    "designEffect": "入场：解1道束缚。每轮首次解救行动后：解1道束缚；抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "解1道束缚；抽1牌。",
      "intent": null
    },
    "signature": "76361678eece2e32c26a2eb928e907c153001b11e82becfa00a32516b03b4e2e"
  },
  {
    "id": "card110",
    "name": "双扣肩带",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+1。每轮首次布置后：脚步+1；抽1牌。共4次。",
    "shortText": "入场：护身+1。每轮首次布置后：脚步+1；抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "脚步+1；抽1牌",
    "designId": "BDV2-154",
    "designEffect": "入场：护身+1。每轮首次布置后：脚步+1；抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_setup",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "脚步+1；抽1牌。",
      "intent": null
    },
    "signature": "2fad55e8786c695c1704fcf7eb705dcc89ab55645180de5c1137ddc9939e05eb"
  },
  {
    "id": "card111",
    "name": "耐磨皮手套",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+1。每轮首次应对成功后：护身+1；保留护身+1。共4次。",
    "shortText": "入场：护身+1。每轮首次应对成功后：护身+1；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+1；保留护身+1",
    "designId": "BDV2-155",
    "designEffect": "入场：护身+1。每轮首次应对成功后：护身+1；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+1；保留护身+1。",
      "intent": null
    },
    "signature": "c6469951830356a577b0b04b6760f4b599a840fcac9e79cd87b9ebf8eef1e81b"
  },
  {
    "id": "card112",
    "name": "折扇遮灯",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住反光。每轮首次交涉行动后：交涉+1；挡住反光。共4次。",
    "shortText": "入场：挡住反光。每轮首次交涉行动后：交涉+1；挡住反光。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "交涉+1；挡住反光",
    "designId": "BDV2-156",
    "designEffect": "入场：挡住反光。每轮首次交涉行动后：交涉+1；挡住反光。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "交涉+1；挡住反光。",
      "intent": null
    },
    "signature": "debaeedd92120abd32f874c4da2c009db9f15ce6ebe34735d2c5bbe7f4332086"
  },
  {
    "id": "card113",
    "name": "铜镜探角",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：脚步+1。每轮一次，1费：目标破绽+1；专注+1。共4次。",
    "shortText": "入场：脚步+1。每轮一次，1费：目标破绽+1；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "目标破绽+1；专注+1",
    "designId": "BDV2-157",
    "designEffect": "入场：脚步+1。每轮一次，1费：目标破绽+1；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "expose",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "目标破绽+1；专注+1。",
      "intent": null
    },
    "signature": "44f643542ed3069c3c6a594202ed256a9364a59fee6739d5c897fe05c8880f16"
  },
  {
    "id": "card114",
    "name": "蜡封小匣",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住散页。每轮首次进入下一幕：调查+1；挡住散页。共4次。",
    "shortText": "入场：挡住散页。每轮首次进入下一幕：调查+1；挡住散页。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "调查+1；挡住散页",
    "designId": "BDV2-158",
    "designEffect": "入场：挡住散页。每轮首次进入下一幕：调查+1；挡住散页。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；挡住散页。",
      "intent": null
    },
    "signature": "8e077808d44e634ab620aea829a74ae043b18a28969780dddc129120d34771ad"
  },
  {
    "id": "card115",
    "name": "刻度怀表",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-measuring",
    "text": "入场：专注+1。每轮首次调查行动后：若已行动，下轮费用+1。共4次。",
    "shortText": "入场：专注+1。每轮首次调查行动后：若已行动，下轮费用+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "若已行动，下轮费用+1",
    "designId": "BDV2-159",
    "designEffect": "入场：专注+1。每轮首次调查行动后：若已行动，下轮费用+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "afterAction",
          "effects": [
            {
              "op": "nextEnergy",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若已行动，下轮费用+1。",
      "intent": null
    },
    "signature": "412ac60e92d82a9c7a885f5da91e6bf129b3a09676ee901b58c84a0c4fa48857"
  },
  {
    "id": "card116",
    "name": "小号滑轮",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：通路+1。每轮首次解救行动后：解1道束缚；脚步+1。共4次。",
    "shortText": "入场：通路+1。每轮首次解救行动后：解1道束缚；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "解1道束缚；脚步+1",
    "designId": "BDV2-160",
    "designEffect": "入场：通路+1。每轮首次解救行动后：解1道束缚；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "解1道束缚；脚步+1。",
      "intent": null
    },
    "signature": "db27b68e6911c5a4dfc72de95d00ef27409d63f4b04980671c098e632c8a98f8"
  },
  {
    "id": "card117",
    "name": "夹纸木板",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：护身+1。每轮首次调查行动后：保留护身+1；挡住散页。共4次。",
    "shortText": "入场：护身+1。每轮首次调查行动后：保留护身+1；挡住散页。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "保留护身+1；挡住散页",
    "designId": "BDV2-161",
    "designEffect": "入场：护身+1。每轮首次调查行动后：保留护身+1；挡住散页。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+1；挡住散页。",
      "intent": null
    },
    "signature": "41d5b3c1e2744f96b59f4f55ce923005e00590b7b755d12e9383893db706c997"
  },
  {
    "id": "card118",
    "name": "折叠担架",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护送伤员离险。每轮首次防护行动后：护身+2；回复1心神。共4次。",
    "shortText": "入场：护送伤员离险。每轮首次防护行动后：护身+2；回复1心神。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2；回复1心神",
    "designId": "BDV2-162",
    "designEffect": "入场：护送伤员离险。每轮首次防护行动后：护身+2；回复1心神。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_guard",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "evacuate",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；回复1心神。",
      "intent": null
    },
    "signature": "3ac9d5ee81f404c984c633fcca33f69aa96377ef998036ba5503d708442f1f5a"
  },
  {
    "id": "card119",
    "name": "加固门闩",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 兵器与随行工具 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+3。每轮首次挡住压力后：护身+2；通路+1。共4次。",
    "shortText": "入场：护身+3。每轮首次挡住压力后：护身+2；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "兵器与随行工具",
    "buildRole": "护身+2；通路+1",
    "designId": "BDV2-163",
    "designEffect": "入场：护身+3。每轮首次挡住压力后：护身+2；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；通路+1。",
      "intent": null
    },
    "signature": "84495ae7871b7d814866d7937c7b6ea2ab08e8f9b000d4962665ac5ec29ec759"
  },
  {
    "id": "card120",
    "name": "从头检查",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；抽1牌。",
    "shortText": "调查+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；抽1牌",
    "designId": "BDV2-164",
    "designEffect": "调查+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；抽1牌。",
      "intent": null
    },
    "signature": "a8b9947984173e9c8fc1731e7e3c0e9621593194d1f2c484d65031a15789b94d"
  },
  {
    "id": "card121",
    "name": "先圈疑点",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。专注+2。",
    "shortText": "迅手（每轮同名限1）。专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+2",
    "designId": "BDV2-165",
    "designEffect": "迅手（每轮同名限1）。专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+2。",
      "intent": null
    },
    "signature": "e60c553efbf2cac49c64506278994bf7a827fded638d08b85caeadaa03be1164"
  },
  {
    "id": "card122",
    "name": "测定间距",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "调查+1；脚步+1。",
    "shortText": "调查+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；脚步+1",
    "designId": "BDV2-166",
    "designEffect": "调查+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；脚步+1。",
      "intent": null
    },
    "signature": "39e1353c235ab55cb61d75eec9c53effc34b4a1e586c5c35780e6d31566135d7"
  },
  {
    "id": "card123",
    "name": "沿墙摸索",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；挡住反光；专注+1。",
    "shortText": "通路+1；挡住反光；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "通路+1；挡住反光；专注+1",
    "designId": "BDV2-167",
    "designEffect": "通路+1；挡住反光；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；挡住反光；专注+1。",
      "intent": null
    },
    "signature": "afc6edc6a56893bbde656bf2c7b2a01cc7d15f692f78aabd770072972239b735"
  },
  {
    "id": "card124",
    "name": "斜照划痕",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；目标破绽+1。",
    "shortText": "调查+1；目标破绽+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；目标破绽+1",
    "designId": "BDV2-168",
    "designEffect": "调查+1；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；目标破绽+1。",
      "intent": null
    },
    "signature": "bcd5a94fa526f85173284cd4e08b627bd23b211f005014c067036a9298a49bbb"
  },
  {
    "id": "card125",
    "name": "拿近了看",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；破防+1；专注+1。",
    "shortText": "调查+2；破防+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；破防+1；专注+1",
    "designId": "BDV2-169",
    "designEffect": "调查+2；破防+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；破防+1；专注+1。",
      "intent": null
    },
    "signature": "d9ec9ad573eebd7c537c171da9048ae3c6123a625de5f77f042c52da2ab95ef3"
  },
  {
    "id": "card126",
    "name": "俯身验泥",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 9,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成9场后习得",
    "sourceScene": "c1s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "调查+1；护身+1。",
    "shortText": "调查+1；护身+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；护身+1",
    "designId": "BDV2-170",
    "designEffect": "调查+1；护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；护身+1。",
      "intent": null
    },
    "signature": "be404ced2d1b4c690275856962b55655a9ff55729625f01e4fa808a178a64e6e"
  },
  {
    "id": "card127",
    "name": "对着光看",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；挡住反光。",
    "shortText": "调查+2；挡住反光。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；挡住反光",
    "designId": "BDV2-171",
    "designEffect": "调查+2；挡住反光。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；挡住反光。",
      "intent": null
    },
    "signature": "37178e6a86e04b7bb512aa5b112d85462b23504a8a4ee9a5343cf0c94509b101"
  },
  {
    "id": "card128",
    "name": "排除重影",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "耗1专注；调查+3。",
    "shortText": "耗1专注；调查+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "耗1专注；调查+3",
    "designId": "BDV2-172",
    "designEffect": "耗1专注；调查+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "insight",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；调查+3。",
      "intent": null
    },
    "signature": "c89e3e1e30bb91f4136036b32ecf62a199ffdc487ecff120deba61f14118cc06"
  },
  {
    "id": "card129",
    "name": "按原位放回",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。专注+1；挡住散页。",
    "shortText": "迅手（每轮同名限1）。专注+1；挡住散页。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+1；挡住散页",
    "designId": "BDV2-173",
    "designEffect": "迅手（每轮同名限1）。专注+1；挡住散页。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；挡住散页。",
      "intent": null
    },
    "signature": "6dfc2a7afe704e4f6e8b0f44d53b56ffa7b0c09c9cd6f00ce7baafb374b9298d"
  },
  {
    "id": "card130",
    "name": "再量一遍",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；若专注至少2，调查+2。",
    "shortText": "调查+1；若专注至少2，调查+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；若专注至少2，调查+2",
    "designId": "BDV2-174",
    "designEffect": "调查+1；若专注至少2，调查+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "insight",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若专注至少2，调查+2。",
      "intent": null
    },
    "signature": "a203d169879d06bc9ad60808207457ab6a23ff0786aced11adfc2b009810883f"
  },
  {
    "id": "card131",
    "name": "核查磨损",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；若有装备，专注+2。",
    "shortText": "调查+1；若有装备，专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；若有装备，专注+2",
    "designId": "BDV2-175",
    "designEffect": "调查+1；若有装备，专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若有装备，专注+2。",
      "intent": null
    },
    "signature": "c5bff236e75755fec1d25cdf90aebfe6f4dc03652b5450ba3c446450cc1f1005"
  },
  {
    "id": "card132",
    "name": "比较两侧",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 11,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成11场后习得",
    "sourceScene": "c1s11",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "调查+1；通路+1。",
    "shortText": "调查+1；通路+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；通路+1",
    "designId": "BDV2-176",
    "designEffect": "调查+1；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；通路+1。",
      "intent": null
    },
    "signature": "0e70e2105f46eb299466da0fdd2b44c953f14949514c5ae455eb353e167665e2"
  },
  {
    "id": "card133",
    "name": "检视背面",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；抽取1张技能。",
    "shortText": "调查+1；抽取1张技能。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；抽取1张技能",
    "designId": "BDV2-177",
    "designEffect": "调查+1；抽取1张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；抽取1张技能。",
      "intent": null
    },
    "signature": "b22c7a1cddc0a0e96d0ca4e3cf2f710f70ecbf2cc60da32172e15cd6038c94f4"
  },
  {
    "id": "card134",
    "name": "把散页排齐",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。挡住散页；专注+2。",
    "shortText": "迅手（每轮同名限1）。挡住散页；专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "挡住散页；专注+2",
    "designId": "BDV2-178",
    "designEffect": "迅手（每轮同名限1）。挡住散页；专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "scatter"
        },
        {
          "op": "focus",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住散页；专注+2。",
      "intent": null
    },
    "signature": "015b02f116535b5c0c0c476548052a888c0bf7afb43b3eb57b5df4f0c1c53df7"
  },
  {
    "id": "card135",
    "name": "留下疑问",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。下轮费用+1；专注+1。",
    "shortText": "迅手（每轮同名限1）。下轮费用+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "下轮费用+1；专注+1",
    "designId": "BDV2-179",
    "designEffect": "迅手（每轮同名限1）。下轮费用+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "下轮费用+1；专注+1。",
      "intent": null
    },
    "signature": "4981ba3330fc4283b97bc6af7c0887037e8741073e768a3e9e57de7344504fff"
  },
  {
    "id": "card136",
    "name": "图上连线",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "耗1专注；通路+2；抽1牌。",
    "shortText": "耗1专注；通路+2；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "耗1专注；通路+2；抽1牌",
    "designId": "BDV2-180",
    "designEffect": "耗1专注；通路+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；通路+2；抽1牌。",
      "intent": null
    },
    "signature": "67a00b44f7f2414c17e6b11490c70f42f06e436c04c5de4ec0484399be5f10c9"
  },
  {
    "id": "card137",
    "name": "闭目复盘",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "专注+2；消除1疲劳。",
    "shortText": "专注+2；消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+2；消除1疲劳",
    "designId": "BDV2-181",
    "designEffect": "专注+2；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 2
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+2；消除1疲劳。",
      "intent": null
    },
    "signature": "3601f53038dcd14cdcd394973595b495c4f89d4b6edfcbf520ebbc7ad9d44870"
  },
  {
    "id": "card138",
    "name": "拆分假说",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 13,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成13场后习得",
    "sourceScene": "c1s13",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；抽2牌；弃最右1牌。",
    "shortText": "调查+2；抽2牌；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；抽2牌；弃最右1牌",
    "designId": "BDV2-182",
    "designEffect": "调查+2；抽2牌；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "draw",
          "n": 2
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；抽2牌；弃最右1牌。",
      "intent": null
    },
    "signature": "1e628ab03a2ef47da73396aa0a219f9686e2749feac647be9b1ffeb935d45eb6"
  },
  {
    "id": "card139",
    "name": "重新走位",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "脚步+1；若已行动，调查+2。",
    "shortText": "脚步+1；若已行动，调查+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "脚步+1；若已行动，调查+2",
    "designId": "BDV2-183",
    "designEffect": "脚步+1；若已行动，调查+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "if",
          "condition": "afterAction",
          "effects": [
            {
              "op": "insight",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；若已行动，调查+2。",
      "intent": null
    },
    "signature": "745ef1e862be770978623a396edcdca181664d777ecadddbb18f814c9d7c2e2a"
  },
  {
    "id": "card140",
    "name": "圈出盲区",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "目标破绽+1；调查+1；脚步+1。",
    "shortText": "目标破绽+1；调查+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "目标破绽+1；调查+1；脚步+1",
    "designId": "BDV2-184",
    "designEffect": "目标破绽+1；调查+1；脚步+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标破绽+1；调查+1；脚步+1。",
      "intent": null
    },
    "signature": "9844a37387967168d84e73d77bf3958d913c87da508693dc2b43abceab301959"
  },
  {
    "id": "card141",
    "name": "顺光找纹",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；若有装备，抽1牌。",
    "shortText": "调查+1；若有装备，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；若有装备，抽1牌",
    "designId": "BDV2-185",
    "designEffect": "调查+1；若有装备，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若有装备，抽1牌。",
      "intent": null
    },
    "signature": "c872727883bfc1dc0a435bf8fb4411aff5d6455352b689aad3ca3b736e1dc634"
  },
  {
    "id": "card142",
    "name": "清开浮土",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；调查+1。",
    "shortText": "压制目标2；调查+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "压制目标2；调查+1",
    "designId": "BDV2-186",
    "designEffect": "压制目标2；调查+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；调查+1。",
      "intent": null
    },
    "signature": "8a65b6fc347969b3a2029b1a6558249c59283dd1cd4d499e0097880db321422c"
  },
  {
    "id": "card143",
    "name": "拨开草叶",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "迅手（每轮同名限1）。压制目标1；专注+1。",
    "shortText": "迅手（每轮同名限1）。压制目标1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "压制目标1；专注+1",
    "designId": "BDV2-187",
    "designEffect": "迅手（每轮同名限1）。压制目标1；专注+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标1；专注+1。",
      "intent": null
    },
    "signature": "a1354c2f7c8c8b071e9780459e8843afa686bbe790a71eadf440c7c32b0bd461"
  },
  {
    "id": "card144",
    "name": "先听回声",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。专注+1；脚步+1。",
    "shortText": "迅手（每轮同名限1）。专注+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+1；脚步+1",
    "designId": "BDV2-188",
    "designEffect": "迅手（每轮同名限1）。专注+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；脚步+1。",
      "intent": null
    },
    "signature": "59a9df9ecc964e3ec77ce2c373497302ab71916cd0b1c17510a4b5ea31ff838a"
  },
  {
    "id": "card145",
    "name": "避开踩痕",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；调查+1。",
    "shortText": "护身+2；调查+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "护身+2；调查+1",
    "designId": "BDV2-189",
    "designEffect": "护身+2；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；调查+1。",
      "intent": null
    },
    "signature": "b40eefde438984c7bdf43d86892210f7d85a87580c66f9bf9b4dbae666424f4d"
  },
  {
    "id": "card146",
    "name": "验一验锁扣",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；解1道束缚。",
    "shortText": "调查+1；解1道束缚。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；解1道束缚",
    "designId": "BDV2-190",
    "designEffect": "调查+1；解1道束缚。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；解1道束缚。",
      "intent": null
    },
    "signature": "5b2839bfebd9ab327066d6b30016e95de71d09a6738f443a24a49c70e34a41e8"
  },
  {
    "id": "card147",
    "name": "标下钟差",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；下轮费用+1。",
    "shortText": "调查+1；下轮费用+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；下轮费用+1",
    "designId": "BDV2-191",
    "designEffect": "调查+1；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；下轮费用+1。",
      "intent": null
    },
    "signature": "a6c2f0973cf3acb39e798045caac72415049815885d239d7955853d2e9774570"
  },
  {
    "id": "card148",
    "name": "抽丝剥茧",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 17,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成17场后习得",
    "sourceScene": "c1s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "耗2专注；调查+3；抽2牌。",
    "shortText": "耗2专注；调查+3；抽2牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "耗2专注；调查+3；抽2牌",
    "designId": "BDV2-192",
    "designEffect": "耗2专注；调查+3；抽2牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 2
        },
        {
          "op": "insight",
          "n": 3
        },
        {
          "op": "draw",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗2专注；调查+3；抽2牌。",
      "intent": null
    },
    "signature": "e28cf46b38e5de3f03101d1631101f01dc124c1a6017314c6da12b28c01ae5c8"
  },
  {
    "id": "card149",
    "name": "找到反证",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 17,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成17场后习得",
    "sourceScene": "c1s17",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "调查+2；目标压力−2。",
    "shortText": "调查+2；目标压力−2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；目标压力−2",
    "designId": "BDV2-193",
    "designEffect": "调查+2；目标压力−2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "weaken",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；目标压力−2。",
      "intent": null
    },
    "signature": "20a4b9626d5c9475ee3e761f8cbc86f754fe5f76403dc1e88faa27208536440c"
  },
  {
    "id": "card150",
    "name": "追到接缝",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 17,
    "sourceCase": 1,
    "source": "北段V2 · 勘察与推演 · 完成17场后习得",
    "sourceScene": "c1s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "调查+1；若目标有破绽，通路+2。",
    "shortText": "调查+1；若目标有破绽，通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；若目标有破绽，通路+2",
    "designId": "BDV2-194",
    "designEffect": "调查+1；若目标有破绽，通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "exposed",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若目标有破绽，通路+2。",
      "intent": null
    },
    "signature": "5e5ad392d2f17b0e0205c0e1fece1a0dff6c3b805fb2bdfb4d31d31e611a28f2"
  },
  {
    "id": "card151",
    "name": "暂存结论",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。专注+1；下幕准备+1。",
    "shortText": "迅手（每轮同名限1）。专注+1；下幕准备+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+1；下幕准备+1",
    "designId": "BDV2-195",
    "designEffect": "迅手（每轮同名限1）。专注+1；下幕准备+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；下幕准备+1。",
      "intent": null
    },
    "signature": "077bdd10d52a54a070783bf44afe4f06cf677bbb36487c23796f68a5dd0a83b7"
  },
  {
    "id": "card152",
    "name": "把问题写下",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "抽1牌；下幕准备+1。",
    "shortText": "抽1牌；下幕准备+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "抽1牌；下幕准备+1",
    "designId": "BDV2-196",
    "designEffect": "抽1牌；下幕准备+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽1牌；下幕准备+1。",
      "intent": null
    },
    "signature": "2cd97c2e1480275c3be685081baff027fef4230fed0893f96ed8522847ebe204"
  },
  {
    "id": "card153",
    "name": "改换角度",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；抽1牌；若已行动，专注+2。",
    "shortText": "调查+1；抽1牌；若已行动，专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；抽1牌；若已行动，专注+2",
    "designId": "BDV2-197",
    "designEffect": "调查+1；抽1牌；若已行动，专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "if",
          "condition": "afterAction",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；抽1牌；若已行动，专注+2。",
      "intent": null
    },
    "signature": "5c333c3970910ee0a2f2f8614933d7eb3b90e23102ba79f953a8a5ac7e18c0b4"
  },
  {
    "id": "card154",
    "name": "对照编号",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；挡住散页；专注+1。",
    "shortText": "调查+1；挡住散页；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；挡住散页；专注+1",
    "designId": "BDV2-198",
    "designEffect": "调查+1；挡住散页；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；挡住散页；专注+1。",
      "intent": null
    },
    "signature": "708d27ff42bc33b151fc134dd08e35b671dd43fa996fd002fbe56e2e264d2aff"
  },
  {
    "id": "card155",
    "name": "循着刮痕",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "通路+1；若专注至少2，压制目标3。",
    "shortText": "通路+1；若专注至少2，压制目标3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "通路+1；若专注至少2，压制目标3",
    "designId": "BDV2-199",
    "designEffect": "通路+1；若专注至少2，压制目标3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "damage",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；若专注至少2，压制目标3。",
      "intent": null
    },
    "signature": "b63aa374b43c3f0ab4ea72d23725f1812206c88c0db722b0effd3d6f2d3f7f35"
  },
  {
    "id": "card156",
    "name": "门缝透光",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；目标破绽+1。",
    "shortText": "通路+1；目标破绽+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "通路+1；目标破绽+1",
    "designId": "BDV2-200",
    "designEffect": "通路+1；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；目标破绽+1。",
      "intent": null
    },
    "signature": "763172bd50818814f0c5927e025b9d56ede5ec83a8179a5300a2060d9817a124"
  },
  {
    "id": "card157",
    "name": "留意旧漆",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "调查+1；若目标已受削弱，专注+2。",
    "shortText": "调查+1；若目标已受削弱，专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；若目标已受削弱，专注+2",
    "designId": "BDV2-201",
    "designEffect": "调查+1；若目标已受削弱，专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；若目标已受削弱，专注+2。",
      "intent": null
    },
    "signature": "95976007ff2f81ef1981abc7669182274d2c3497ee8df68d9fcbf3b04a2fa628"
  },
  {
    "id": "card158",
    "name": "听到木裂",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。挡住坠落；脚步+1。",
    "shortText": "迅手（每轮同名限1）。挡住坠落；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "挡住坠落；脚步+1",
    "designId": "BDV2-202",
    "designEffect": "迅手（每轮同名限1）。挡住坠落；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "fall"
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住坠落；脚步+1。",
      "intent": null
    },
    "signature": "5f223d2bc8d5d54d54dd7ecce875814ff725cc1007c374cd958f918f3e04acda"
  },
  {
    "id": "card159",
    "name": "遮雨处比泥",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；挡住水险；专注+1。",
    "shortText": "调查+2；挡住水险；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；挡住水险；专注+1",
    "designId": "BDV2-203",
    "designEffect": "调查+2；挡住水险；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "cover",
          "value": "water"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；挡住水险；专注+1。",
      "intent": null
    },
    "signature": "4197ed8763bc6ecbcda2be3814bfbfa975502b2318fb9aaf354b35701108b0fc"
  },
  {
    "id": "card160",
    "name": "试一试高度",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；调查+1；破防+1。",
    "shortText": "通路+1；调查+1；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "通路+1；调查+1；破防+1",
    "designId": "BDV2-204",
    "designEffect": "通路+1；调查+1；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；调查+1；破防+1。",
      "intent": null
    },
    "signature": "f92505587fe3f9d657f3903197ab0fe71cfccf9299abfa971546ae34a4fc2e8f"
  },
  {
    "id": "card161",
    "name": "不急着指认",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。信任+1；专注+1。",
    "shortText": "迅手（每轮同名限1）。信任+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "信任+1；专注+1",
    "designId": "BDV2-205",
    "designEffect": "迅手（每轮同名限1）。信任+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；专注+1。",
      "intent": null
    },
    "signature": "da2b6a4058c2face2ad016829d4e9e8884ecf9a041c3739a1c3300d086df1586"
  },
  {
    "id": "card162",
    "name": "收窄范围",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "耗1专注；调查+2；抽取1张技能。",
    "shortText": "耗1专注；调查+2；抽取1张技能。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "耗1专注；调查+2；抽取1张技能",
    "designId": "BDV2-206",
    "designEffect": "耗1专注；调查+2；抽取1张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "drawMode",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；调查+2；抽取1张技能。",
      "intent": null
    },
    "signature": "ba657073660af7f48aed99b2421d069d00895cde2117970502ba4033a49fefb5"
  },
  {
    "id": "card163",
    "name": "倒着查一遍",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+2；取回弃牌顶首张技能。",
    "shortText": "调查+2；取回弃牌顶首张技能。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+2；取回弃牌顶首张技能",
    "designId": "BDV2-207",
    "designEffect": "调查+2；取回弃牌顶首张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 2
        },
        {
          "op": "recycle",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+2；取回弃牌顶首张技能。",
      "intent": null
    },
    "signature": "0c258691d3580eb2b3c4296519c3e452c488b701c27cb046a52b2197e00728d8"
  },
  {
    "id": "card164",
    "name": "重画平面图",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2；调查+1；弃最右1牌。",
    "shortText": "通路+2；调查+1；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "通路+2；调查+1；弃最右1牌",
    "designId": "BDV2-208",
    "designEffect": "通路+2；调查+1；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；调查+1；弃最右1牌。",
      "intent": null
    },
    "signature": "8a41f1eb847ff27a081000ab693cb9a000d76952ce2b889b1d48e67b608a5405"
  },
  {
    "id": "card165",
    "name": "把误差留下",
    "cost": 0,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。专注+1；下轮费用+1；弃最右1牌。",
    "shortText": "迅手（每轮同名限1）。专注+1；下轮费用+1；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "专注+1；下轮费用+1；弃最右1牌",
    "designId": "BDV2-209",
    "designEffect": "迅手（每轮同名限1）。专注+1；下轮费用+1；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；下轮费用+1；弃最右1牌。",
      "intent": null
    },
    "signature": "1ef820be6e0c66f0344daa5528c1cb92968892cefaec48748cf669525cbbc697"
  },
  {
    "id": "card166",
    "name": "查清边界",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "调查+1；护身+2；若专注至少2，保留护身+2。",
    "shortText": "调查+1；护身+2；若专注至少2，保留护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；护身+2；若专注至少2，保留护身+2",
    "designId": "BDV2-210",
    "designEffect": "调查+1；护身+2；若专注至少2，保留护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "retain",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；护身+2；若专注至少2，保留护身+2。",
      "intent": null
    },
    "signature": "1eaaf4a078721e64b5c872c03c00c08de28cad81097ed8978ecbea5b486d052a"
  },
  {
    "id": "card167",
    "name": "还原摆放",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "调查+1；取回弃牌顶首张装备。",
    "shortText": "调查+1；取回弃牌顶首张装备。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；取回弃牌顶首张装备",
    "designId": "BDV2-211",
    "designEffect": "调查+1；取回弃牌顶首张装备。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；取回弃牌顶首张装备。",
      "intent": null
    },
    "signature": "73df0b6d64168db72c1e23703c1e867b3cfb409a993bccc937ab2a651c4782c2"
  },
  {
    "id": "card168",
    "name": "按层拆解",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "调查+1；压制目标2；专注+2。",
    "shortText": "调查+1；压制目标2；专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "调查+1；压制目标2；专注+2",
    "designId": "BDV2-212",
    "designEffect": "调查+1；压制目标2；专注+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "focus",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；压制目标2；专注+2。",
      "intent": null
    },
    "signature": "415347b2f75c55fec788462d9bcb4cedc7cf23a0d6acae33bc1052588916ba58"
  },
  {
    "id": "card169",
    "name": "沿着原路返回",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 24,
    "sourceCase": 2,
    "source": "北段V2 · 勘察与推演 · 完成24场后习得",
    "sourceScene": "c2s06",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "脚步+1；取回弃牌顶首张技能。",
    "shortText": "脚步+1；取回弃牌顶首张技能。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "勘察与推演",
    "buildRole": "脚步+1；取回弃牌顶首张技能",
    "designId": "BDV2-213",
    "designEffect": "脚步+1；取回弃牌顶首张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；取回弃牌顶首张技能。",
      "intent": null
    },
    "signature": "467b70b4e57b5114a136374dfdab73ba0a2da24016e3511054dc5ba06841c084"
  },
  {
    "id": "card170",
    "name": "请他坐下",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "交涉+1；回复2心神。",
    "shortText": "交涉+1；回复2心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；回复2心神",
    "designId": "BDV2-214",
    "designEffect": "交涉+1；回复2心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "heal",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；回复2心神。",
      "intent": null
    },
    "signature": "40c5e7299d8c3808820f5da9af186bfc9567f38e85db4d2bad16b3d8eade8347"
  },
  {
    "id": "card171",
    "name": "递上热茶",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "回复2心神；信任+1。",
    "shortText": "回复2心神；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "回复2心神；信任+1",
    "designId": "BDV2-215",
    "designEffect": "回复2心神；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复2心神；信任+1。",
      "intent": null
    },
    "signature": "951680766e19beab9d5a21ea939f69f9513c93a3ec43868760e08a29b405dad5"
  },
  {
    "id": "card172",
    "name": "说清来意",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 14,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成14场后习得",
    "sourceScene": "c1s14",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。交涉+1；破防+1。",
    "shortText": "迅手（每轮同名限1）。交涉+1；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；破防+1",
    "designId": "BDV2-216",
    "designEffect": "迅手（每轮同名限1）。交涉+1；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；破防+1。",
      "intent": null
    },
    "signature": "558e3c4e8fa3e4caf75716c4059ae3b1283cbce9b4c5b6044462972f84adb34b"
  },
  {
    "id": "card173",
    "name": "等她抬头",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "迅手（每轮同名限1）。信任+1；下幕准备+1。",
    "shortText": "迅手（每轮同名限1）。信任+1；下幕准备+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；下幕准备+1",
    "designId": "BDV2-217",
    "designEffect": "迅手（每轮同名限1）。信任+1；下幕准备+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；下幕准备+1。",
      "intent": null
    },
    "signature": "143643afe0f1c6bb4781ff1b4097025ab6119ce946f8ed31d626062ab697b10e"
  },
  {
    "id": "card174",
    "name": "先问小事",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 15,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成15场后习得",
    "sourceScene": "c1s15",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；抽1牌。",
    "shortText": "交涉+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；抽1牌",
    "designId": "BDV2-218",
    "designEffect": "交涉+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；抽1牌。",
      "intent": null
    },
    "signature": "56f4d8f091c0305fa875ef17fa05fd712ef3d45c818d41d6a0f4661c91562e37"
  },
  {
    "id": "card175",
    "name": "听出迟疑",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；专注+1。",
    "shortText": "交涉+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；专注+1",
    "designId": "BDV2-219",
    "designEffect": "交涉+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；专注+1。",
      "intent": null
    },
    "signature": "d2b6e722b56640549c54ea541adceb882759c083528367c44ad23c224c8bce0a"
  },
  {
    "id": "card176",
    "name": "问得再具体些",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；若有信任，专注+2。",
    "shortText": "交涉+1；若有信任，专注+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；若有信任，专注+2",
    "designId": "BDV2-220",
    "designEffect": "交涉+1；若有信任，专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "resolve1",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；若有信任，专注+2。",
      "intent": null
    },
    "signature": "3a90db53be9ddc036626f689353f5815327fd7b85a9b7b66e96fad05a8aac2e3"
  },
  {
    "id": "card177",
    "name": "重复原话",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 16,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成16场后习得",
    "sourceScene": "c1s16",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；若有信任，交涉+1。",
    "shortText": "交涉+1；若有信任，交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；若有信任，交涉+1",
    "designId": "BDV2-221",
    "designEffect": "交涉+1；若有信任，交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "resolve1",
          "effects": [
            {
              "op": "courage",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；若有信任，交涉+1。",
      "intent": null
    },
    "signature": "7702107ffc61a5323ffc327bcffc84930d74837be27015615f7adfa6dff3b51d"
  },
  {
    "id": "card178",
    "name": "递过纸笔",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 17,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成17场后习得",
    "sourceScene": "c1s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；抽取1张装备。",
    "shortText": "交涉+1；抽取1张装备。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；抽取1张装备",
    "designId": "BDV2-222",
    "designEffect": "交涉+1；抽取1张装备。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；抽取1张装备。",
      "intent": null
    },
    "signature": "e8d5b25093f6141b05b301049fac57c2cb9b6ca24ffa91b78c734e8992beff0b"
  },
  {
    "id": "card179",
    "name": "让旁人退开",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 17,
    "sourceCase": 1,
    "source": "北段V2 · 询问与互信 · 完成17场后习得",
    "sourceScene": "c1s17",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "挡住插话；信任+2。",
    "shortText": "挡住插话；信任+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "挡住插话；信任+2",
    "designId": "BDV2-223",
    "designEffect": "挡住插话；信任+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "interrupt"
        },
        {
          "op": "resolve",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住插话；信任+2。",
      "intent": null
    },
    "signature": "c860e9fb2a3ddae0b4734931d209d783ebc07b0a82cd0042b210e8d69cf7408b"
  },
  {
    "id": "card180",
    "name": "压住追问",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "目标压力−1；信任+1。",
    "shortText": "目标压力−1；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "目标压力−1；信任+1",
    "designId": "BDV2-224",
    "designEffect": "目标压力−1；信任+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；信任+1。",
      "intent": null
    },
    "signature": "fb3ebd6fd464afb317f506d08062111546d1bf59733e278193c902aa9ae4bc10"
  },
  {
    "id": "card181",
    "name": "承认不知道",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。信任+2；弃最右1牌。",
    "shortText": "迅手（每轮同名限1）。信任+2；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+2；弃最右1牌",
    "designId": "BDV2-225",
    "designEffect": "迅手（每轮同名限1）。信任+2；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 2
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+2；弃最右1牌。",
      "intent": null
    },
    "signature": "9fb347bdeed0d84622f314b151a6291947b47f78b9baaa734b6324323253daa6"
  },
  {
    "id": "card182",
    "name": "请她亲自说",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 18,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成18场后习得",
    "sourceScene": "c1s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+2；挡住插话。",
    "shortText": "交涉+2；挡住插话。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+2；挡住插话",
    "designId": "BDV2-226",
    "designEffect": "交涉+2；挡住插话。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；挡住插话。",
      "intent": null
    },
    "signature": "d09c8c0621d4d66497f1650d6fe38a46682039efedaaea08bc386a69d60c24c4"
  },
  {
    "id": "card183",
    "name": "同桌核对",
    "cost": 2,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；调查+1；抽1牌。",
    "shortText": "交涉+1；调查+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；调查+1；抽1牌",
    "designId": "BDV2-227",
    "designEffect": "交涉+1；调查+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；调查+1；抽1牌。",
      "intent": null
    },
    "signature": "67f130161e01e804d0727e285148227a7b91b811d8708692ae63b5dad9336edc"
  },
  {
    "id": "card184",
    "name": "不催她回答",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。挡住催逼；信任+1。",
    "shortText": "迅手（每轮同名限1）。挡住催逼；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "挡住催逼；信任+1",
    "designId": "BDV2-228",
    "designEffect": "迅手（每轮同名限1）。挡住催逼；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "urge"
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住催逼；信任+1。",
      "intent": null
    },
    "signature": "8c1621ceb83e0892a227b7d9b749f949d1ed131862b659280321b1ed3830959d"
  },
  {
    "id": "card185",
    "name": "开诚布公",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "耗1信任；交涉+3。",
    "shortText": "耗1信任；交涉+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "耗1信任；交涉+3",
    "designId": "BDV2-229",
    "designEffect": "耗1信任；交涉+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "courage",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；交涉+3。",
      "intent": null
    },
    "signature": "4a26ea75c0ce00d8f6cdd204a08cc17279c6e4ca058ea6a1225e638463440257"
  },
  {
    "id": "card186",
    "name": "留一盏灯",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "交涉+1；护身+2。",
    "shortText": "交涉+1；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；护身+2",
    "designId": "BDV2-230",
    "designEffect": "交涉+1；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；护身+2。",
      "intent": null
    },
    "signature": "3e64d3778f7a92ed77e29b211a5c7cf8d96f330da683f3d12805fe03ff75be97"
  },
  {
    "id": "card187",
    "name": "把话接住",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；取回弃牌顶首张应对。",
    "shortText": "交涉+1；取回弃牌顶首张应对。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；取回弃牌顶首张应对",
    "designId": "BDV2-231",
    "designEffect": "交涉+1；取回弃牌顶首张应对。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "response"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；取回弃牌顶首张应对。",
      "intent": null
    },
    "signature": "2c343b8fd3287d276d9255745f6a16308267dc1e2717684c2d58ad3b5259722f"
  },
  {
    "id": "card188",
    "name": "把声量放轻",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。目标压力−1；消除1疲劳。",
    "shortText": "迅手（每轮同名限1）。目标压力−1；消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "目标压力−1；消除1疲劳",
    "designId": "BDV2-232",
    "designEffect": "迅手（每轮同名限1）。目标压力−1；消除1疲劳。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；消除1疲劳。",
      "intent": null
    },
    "signature": "2b28b57e0884647dbcf7b7deb05af021bdf5b3f02c0861615524671ca6177c6f"
  },
  {
    "id": "card189",
    "name": "拆开传闻",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；调查+1。",
    "shortText": "交涉+1；调查+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；调查+1",
    "designId": "BDV2-233",
    "designEffect": "交涉+1；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；调查+1。",
      "intent": null
    },
    "signature": "efb71869bcd355bc215f5c2bb6032c7558b8802c1cf7f309b4716fd0209f2b91"
  },
  {
    "id": "card190",
    "name": "顺着话头",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；若已行动，抽1牌。",
    "shortText": "交涉+1；若已行动，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；若已行动，抽1牌",
    "designId": "BDV2-234",
    "designEffect": "交涉+1；若已行动，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "afterAction",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；若已行动，抽1牌。",
      "intent": null
    },
    "signature": "50a8a0ec8936d7d9d6bf1d601c0c5667d94f4b7cfedd3e0fed418d9e3ece300b"
  },
  {
    "id": "card191",
    "name": "请他纠正",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；专注+1；弃最右1牌；抽1牌。",
    "shortText": "交涉+1；专注+1；弃最右1牌；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；专注+1；弃最右1牌；抽1牌",
    "designId": "BDV2-235",
    "designEffect": "交涉+1；专注+1；弃最右1牌；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；专注+1；弃最右1牌；抽1牌。",
      "intent": null
    },
    "signature": "70280d6a439f04c88fef597e6f7813e173523111b20e78807f7f13254073f948"
  },
  {
    "id": "card192",
    "name": "直面指责",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "交涉+2；护身+2；破防+1。",
    "shortText": "交涉+2；护身+2；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+2；护身+2；破防+1",
    "designId": "BDV2-236",
    "designEffect": "交涉+2；护身+2；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；护身+2；破防+1。",
      "intent": null
    },
    "signature": "40b6280b03303c156d2551ac352e27e56dda10cb3b1c3221cb67a6a24ae567f9"
  },
  {
    "id": "card193",
    "name": "护住说话的人",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；交涉+1。",
    "shortText": "护身+3；交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "护身+3；交涉+1",
    "designId": "BDV2-237",
    "designEffect": "护身+3；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；交涉+1。",
      "intent": null
    },
    "signature": "39ff3abf7c9262676c3858cde8221b9862dcc285e2e4674234d7559e5cc25431"
  },
  {
    "id": "card194",
    "name": "给她留退路",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "信任+1；通路+1。",
    "shortText": "信任+1；通路+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；通路+1",
    "designId": "BDV2-238",
    "designEffect": "信任+1；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；通路+1。",
      "intent": null
    },
    "signature": "3a31053b946c2a32c8eaeccb5e643603f720c69fa9c3f9e559504904623c1530"
  },
  {
    "id": "card195",
    "name": "问明谁在场",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 24,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成24场后习得",
    "sourceScene": "c2s06",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；抽取1张人物。",
    "shortText": "交涉+1；抽取1张人物。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；抽取1张人物",
    "designId": "BDV2-239",
    "designEffect": "交涉+1；抽取1张人物。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "person"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；抽取1张人物。",
      "intent": null
    },
    "signature": "cfd9d57c5131f56d5e8aa57a4e589648f8a90acc181d20acbe572af877b3c375"
  },
  {
    "id": "card196",
    "name": "从旁陪着",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 24,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成24场后习得",
    "sourceScene": "c2s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。信任+1；若有协作者，消除1疲劳。",
    "shortText": "迅手（每轮同名限1）。信任+1；若有协作者，消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；若有协作者，消除1疲劳",
    "designId": "BDV2-240",
    "designEffect": "迅手（每轮同名限1）。信任+1；若有协作者，消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "calm",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；若有协作者，消除1疲劳。",
      "intent": null
    },
    "signature": "34a19b1874a4dba524f5ebff968716a364b0d98f7a6dfd3a20504f58bd8d512f"
  },
  {
    "id": "card197",
    "name": "耐心等候",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 25,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成25场后习得",
    "sourceScene": "c2s07",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "回复1心神；下轮费用+2。",
    "shortText": "回复1心神；下轮费用+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "回复1心神；下轮费用+2",
    "designId": "BDV2-241",
    "designEffect": "回复1心神；下轮费用+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复1心神；下轮费用+2。",
      "intent": null
    },
    "signature": "684fb6b886fd0e5119d677b89ed3466a04736b55c1ce50b792f7e9e865430006"
  },
  {
    "id": "card198",
    "name": "讲明自己的错",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 25,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成25场后习得",
    "sourceScene": "c2s07",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "失去1心神；信任+2；交涉+2。",
    "shortText": "失去1心神；信任+2；交涉+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "失去1心神；信任+2；交涉+2",
    "designId": "BDV2-242",
    "designEffect": "失去1心神；信任+2；交涉+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "hurt",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 2
        },
        {
          "op": "courage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "失去1心神；信任+2；交涉+2。",
      "intent": null
    },
    "signature": "0d8c3ce1a752b6119397e8f2c01518b3f22a5937b8af3f21e81a3440b986256f"
  },
  {
    "id": "card199",
    "name": "不许代答",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 25,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成25场后习得",
    "sourceScene": "c2s07",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "挡住插话；目标压力−1；交涉+1。",
    "shortText": "挡住插话；目标压力−1；交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "挡住插话；目标压力−1；交涉+1",
    "designId": "BDV2-243",
    "designEffect": "挡住插话；目标压力−1；交涉+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "interrupt"
        },
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住插话；目标压力−1；交涉+1。",
      "intent": null
    },
    "signature": "78a0dc8feb376efaadbe095a69c24f2f5c14764e811ea6d68aecd75a63fd8392"
  },
  {
    "id": "card200",
    "name": "给孩子挡住脸",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 询问与互信 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；挡住反光；信任+1。",
    "shortText": "护身+2；挡住反光；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "护身+2；挡住反光；信任+1",
    "designId": "BDV2-244",
    "designEffect": "护身+2；挡住反光；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；挡住反光；信任+1。",
      "intent": null
    },
    "signature": "7f26c5bb119ca09166ed3f709b83054a1a03c592de03ed92de200fcb35cbbe4a"
  },
  {
    "id": "card201",
    "name": "陪他走一段",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 26,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成26场后习得",
    "sourceScene": "c2s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；交涉+1。",
    "shortText": "通路+1；交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "通路+1；交涉+1",
    "designId": "BDV2-245",
    "designEffect": "通路+1；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；交涉+1。",
      "intent": null
    },
    "signature": "b5ccb234d8c0c7b5e184ff02773b3f025746dea28e6d5316b3f5aa0c4b8d84fe"
  },
  {
    "id": "card202",
    "name": "把争执分开",
    "cost": 2,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 27,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成27场后习得",
    "sourceScene": "c2s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "所有威胁压力−1；交涉+1。",
    "shortText": "所有威胁压力−1；交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "所有威胁压力−1；交涉+1",
    "designId": "BDV2-246",
    "designEffect": "所有威胁压力−1；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weakenAll",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "所有威胁压力−1；交涉+1。",
      "intent": null
    },
    "signature": "cd3727a6c2919854863de6b2b66adc1e8e0467ec6913184fc5393893e00d4402"
  },
  {
    "id": "card203",
    "name": "轮流说话",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 27,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成27场后习得",
    "sourceScene": "c2s09",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；若有两名协作者，交涉+2。",
    "shortText": "交涉+1；若有两名协作者，交涉+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；若有两名协作者，交涉+2",
    "designId": "BDV2-247",
    "designEffect": "交涉+1；若有两名协作者，交涉+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "courage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；若有两名协作者，交涉+2。",
      "intent": null
    },
    "signature": "142b654355dc276a73e1d244ce0f8e059f4836a4352a700e9daf69521249b5d1"
  },
  {
    "id": "card204",
    "name": "请他讲经过",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 27,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成27场后习得",
    "sourceScene": "c2s09",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；下幕准备+1。",
    "shortText": "交涉+1；下幕准备+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；下幕准备+1",
    "designId": "BDV2-248",
    "designEffect": "交涉+1；下幕准备+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；下幕准备+1。",
      "intent": null
    },
    "signature": "5578efafd501007e3f7eb4717993968d1b754f1d76bf751ca1c53952308ea2b9"
  },
  {
    "id": "card205",
    "name": "先确认称呼",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。信任+1；抽1牌。",
    "shortText": "迅手（每轮同名限1）。信任+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；抽1牌",
    "designId": "BDV2-249",
    "designEffect": "迅手（每轮同名限1）。信任+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；抽1牌。",
      "intent": null
    },
    "signature": "68113cba9685f5ee9bb3cbbebe1349f36f3ca971051bf241d4f253647a0d6460"
  },
  {
    "id": "card206",
    "name": "说到这里就好",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。回复2心神；挡住催逼。",
    "shortText": "迅手（每轮同名限1）。回复2心神；挡住催逼。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "回复2心神；挡住催逼",
    "designId": "BDV2-250",
    "designEffect": "迅手（每轮同名限1）。回复2心神；挡住催逼。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复2心神；挡住催逼。",
      "intent": null
    },
    "signature": "9aed40ec13476aa3a18f7f75168826ebd195a5caf5621243f7ab465e9f42859a"
  },
  {
    "id": "card207",
    "name": "留下联络方式",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "信任+1；下轮费用+1；抽取1张人物。",
    "shortText": "信任+1；下轮费用+1；抽取1张人物。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；下轮费用+1；抽取1张人物",
    "designId": "BDV2-251",
    "designEffect": "信任+1；下轮费用+1；抽取1张人物。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "person"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；下轮费用+1；抽取1张人物。",
      "intent": null
    },
    "signature": "1af7c49fc5db404e0987959595a208181e617918ae1ce67af4762ccb4e977b0b"
  },
  {
    "id": "card208",
    "name": "拦住羞辱",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；目标压力−1；信任+1。",
    "shortText": "护身+2；目标压力−1；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "护身+2；目标压力−1；信任+1",
    "designId": "BDV2-252",
    "designEffect": "护身+2；目标压力−1；信任+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；目标压力−1；信任+1。",
      "intent": null
    },
    "signature": "8f61a10b10f3b968da6314469c79e785bc39338bef2d27e0f523c97647473b73"
  },
  {
    "id": "card209",
    "name": "当面问一句",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+2；目标破绽+1。",
    "shortText": "交涉+2；目标破绽+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+2；目标破绽+1",
    "designId": "BDV2-253",
    "designEffect": "交涉+2；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；目标破绽+1。",
      "intent": null
    },
    "signature": "c8067e02039423d4dd0c764433c61b3a37a04e571732ac3d46871a819ceb22f8"
  },
  {
    "id": "card210",
    "name": "逐句分开记",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；挡住散页；专注+1。",
    "shortText": "交涉+1；挡住散页；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；挡住散页；专注+1",
    "designId": "BDV2-254",
    "designEffect": "交涉+1；挡住散页；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；挡住散页；专注+1。",
      "intent": null
    },
    "signature": "77444f4a87bcf96ecb400ba04ad7265c89bb4f517731afbae8db620da9c1b23d"
  },
  {
    "id": "card211",
    "name": "听他讲完童年",
    "cost": 2,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "交涉+3；回复2心神；疲劳+1。",
    "shortText": "交涉+3；回复2心神；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+3；回复2心神；疲劳+1",
    "designId": "BDV2-255",
    "designEffect": "交涉+3；回复2心神；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 3
        },
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+3；回复2心神；疲劳+1。",
      "intent": null
    },
    "signature": "8cf9f420845636853b970edd8680b6d73993679fbaa2546dc613a5e34010dee1"
  },
  {
    "id": "card212",
    "name": "把椅子拉近",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "信任+1；若有协作者，抽1牌。",
    "shortText": "信任+1；若有协作者，抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；若有协作者，抽1牌",
    "designId": "BDV2-256",
    "designEffect": "信任+1；若有协作者，抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；若有协作者，抽1牌。",
      "intent": null
    },
    "signature": "9fc07107928d336a66a65a1e44e1f74f873a82b8515d0c7cd137812a6bf5a97a"
  },
  {
    "id": "card213",
    "name": "不为对手辩白",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。信任+1；反击+1。",
    "shortText": "迅手（每轮同名限1）。信任+1；反击+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "信任+1；反击+1",
    "designId": "BDV2-257",
    "designEffect": "迅手（每轮同名限1）。信任+1；反击+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "counter",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；反击+1。",
      "intent": null
    },
    "signature": "a2773811e842717eb1092118adcd6d463c9567ef41e5a1433de5136fbc1ead90"
  },
  {
    "id": "card214",
    "name": "找到共同顾虑",
    "cost": 2,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "耗1信任；交涉+2；护身+3。",
    "shortText": "耗1信任；交涉+2；护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "耗1信任；交涉+2；护身+3",
    "designId": "BDV2-258",
    "designEffect": "耗1信任；交涉+2；护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；交涉+2；护身+3。",
      "intent": null
    },
    "signature": "b6e906bf9a31e1aa2f9753a9b7aedfa9dab126bbdd59381d0552e92083d0008f"
  },
  {
    "id": "card215",
    "name": "请第三人见证",
    "cost": 2,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+2；若有两名协作者，抽2牌。",
    "shortText": "交涉+2；若有两名协作者，抽2牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+2；若有两名协作者，抽2牌",
    "designId": "BDV2-259",
    "designEffect": "交涉+2；若有两名协作者，抽2牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "draw",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；若有两名协作者，抽2牌。",
      "intent": null
    },
    "signature": "e6c83e6f5e21c7d9471154aa07bafd164c9068462ddd929e253a75e6f6678718"
  },
  {
    "id": "card216",
    "name": "当场复述",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "交涉+1；取回弃牌顶首张技能。",
    "shortText": "交涉+1；取回弃牌顶首张技能。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "交涉+1；取回弃牌顶首张技能",
    "designId": "BDV2-260",
    "designEffect": "交涉+1；取回弃牌顶首张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；取回弃牌顶首张技能。",
      "intent": null
    },
    "signature": "3b53d366c5ed6c75d494762a0e4f6dfba748b182ff8c24a4bc9f747fe923d22f"
  },
  {
    "id": "card217",
    "name": "护送到门口",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 33,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成33场后习得",
    "sourceScene": "c2s15",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "通路+1；护身+2；信任+1。",
    "shortText": "通路+1；护身+2；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "通路+1；护身+2；信任+1",
    "designId": "BDV2-261",
    "designEffect": "通路+1；护身+2；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；护身+2；信任+1。",
      "intent": null
    },
    "signature": "caaf8e60965855f8cb328fb78436700835b7198d265a66e6cb94ec9369b45197"
  },
  {
    "id": "card218",
    "name": "把门轻轻关上",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 33,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成33场后习得",
    "sourceScene": "c2s15",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "挡住插话；护身+2。",
    "shortText": "挡住插话；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "挡住插话；护身+2",
    "designId": "BDV2-262",
    "designEffect": "挡住插话；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "interrupt"
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住插话；护身+2。",
      "intent": null
    },
    "signature": "1494b86b45bf48e6e0511825fc710e206a84743c8e0370c161739fb0ad759ad6"
  },
  {
    "id": "card219",
    "name": "约好下次再谈",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 34,
    "sourceCase": 2,
    "source": "北段V2 · 询问与互信 · 完成34场后习得",
    "sourceScene": "c2s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。下轮费用+1；信任+1；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。下轮费用+1；信任+1；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "询问与互信",
    "buildRole": "下轮费用+1；信任+1；疲劳+1",
    "designId": "BDV2-263",
    "designEffect": "迅手（每轮同名限1）。下轮费用+1；信任+1；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "nextEnergy",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "下轮费用+1；信任+1；疲劳+1。",
      "intent": null
    },
    "signature": "012b00d6f0beeb465192acf32b352f0901ef04d498d027f8c92c9e961c0f949f"
  },
  {
    "id": "card220",
    "name": "踏稳石阶",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "通路+1；护身+3。",
    "shortText": "通路+1；护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；护身+3",
    "designId": "BDV2-264",
    "designEffect": "通路+1；护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；护身+3。",
      "intent": null
    },
    "signature": "bdcf49236fd5425930330e6938ea818feea95e54a004b44bd6cb0dc7920ce718"
  },
  {
    "id": "card221",
    "name": "探进侧巷",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；抽1牌。",
    "shortText": "通路+1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；抽1牌",
    "designId": "BDV2-265",
    "designEffect": "通路+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；抽1牌。",
      "intent": null
    },
    "signature": "23dcd9941d937e8a1cd20b7e6599ba8840d87b5e2fed7cc68eaecd98a4591dd0"
  },
  {
    "id": "card222",
    "name": "翻窗探路",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2；破防+1；脚步+1。",
    "shortText": "通路+2；破防+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+2；破防+1；脚步+1",
    "designId": "BDV2-266",
    "designEffect": "通路+2；破防+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；破防+1；脚步+1。",
      "intent": null
    },
    "signature": "b51938fc40637554b120bd4601406068f0b3ed09e17ba52e58e72a184c81e8a4"
  },
  {
    "id": "card223",
    "name": "绕过人群",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 21,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成21场后习得",
    "sourceScene": "c2s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；挡住插话。",
    "shortText": "通路+1；挡住插话。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；挡住插话",
    "designId": "BDV2-267",
    "designEffect": "通路+1；挡住插话。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；挡住插话。",
      "intent": null
    },
    "signature": "ba3d233a4f71819259a5f1768eea8681d15f2eca3747281e4e03b777c6d1036f"
  },
  {
    "id": "card224",
    "name": "抢先占位",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。脚步+2；破防+1。",
    "shortText": "迅手（每轮同名限1）。脚步+2；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+2；破防+1",
    "designId": "BDV2-268",
    "designEffect": "迅手（每轮同名限1）。脚步+2；破防+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 2
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+2；破防+1。",
      "intent": null
    },
    "signature": "824845eceba9ddf20fd81891d1e55b53113c48368a496766177b633bbc26be81"
  },
  {
    "id": "card225",
    "name": "攀绳上梁",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 22,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成22场后习得",
    "sourceScene": "c2s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "耗1脚步；通路+3。",
    "shortText": "耗1脚步；通路+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "耗1脚步；通路+3",
    "designId": "BDV2-269",
    "designEffect": "耗1脚步；通路+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "route",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1脚步；通路+3。",
      "intent": null
    },
    "signature": "9cebcc0d3d543bb6eb66e92fb0c8d1c1dc47c1f3a00f33c78e65a7112d93702b"
  },
  {
    "id": "card226",
    "name": "系牢绳头",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。脚步+1；保留护身+1。",
    "shortText": "迅手（每轮同名限1）。脚步+1；保留护身+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+1；保留护身+1",
    "designId": "BDV2-270",
    "designEffect": "迅手（每轮同名限1）。脚步+1；保留护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；保留护身+1。",
      "intent": null
    },
    "signature": "34e11db120b3ecb865c69149be8878cada5ff0b2b057b4f42b82f4b592388365"
  },
  {
    "id": "card227",
    "name": "拉同伴一把",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 23,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成23场后习得",
    "sourceScene": "c2s05",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "解1道束缚；若有协作者，护身+3。",
    "shortText": "解1道束缚；若有协作者，护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；若有协作者，护身+3",
    "designId": "BDV2-271",
    "designEffect": "解1道束缚；若有协作者，护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "shield",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；若有协作者，护身+3。",
      "intent": null
    },
    "signature": "da6e2f7d72f435ec704f7bc68afc803460d10de7e1761b4599a007342b8eb976"
  },
  {
    "id": "card228",
    "name": "拨开门锁",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 24,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成24场后习得",
    "sourceScene": "c2s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "解1道束缚；通路+1。",
    "shortText": "解1道束缚；通路+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；通路+1",
    "designId": "BDV2-272",
    "designEffect": "解1道束缚；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；通路+1。",
      "intent": null
    },
    "signature": "bd39dad6c5bfec13d2ccd1dd14975c9c35f25a760af161dbbe7d4199e7b13cbe"
  },
  {
    "id": "card229",
    "name": "紧追脚步",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 24,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成24场后习得",
    "sourceScene": "c2s06",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2；疲劳+1；专注+1。",
    "shortText": "通路+2；疲劳+1；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+2；疲劳+1；专注+1",
    "designId": "BDV2-273",
    "designEffect": "通路+2；疲劳+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；疲劳+1；专注+1。",
      "intent": null
    },
    "signature": "ad8b7e3bd214062d350a6d03b3b4a0269f719cded75d0bd772908a89e073f04c"
  },
  {
    "id": "card230",
    "name": "沿河找路",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 25,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成25场后习得",
    "sourceScene": "c2s07",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "脚步+1；挡住水险；通路+1。",
    "shortText": "脚步+1；挡住水险；通路+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+1；挡住水险；通路+1",
    "designId": "BDV2-274",
    "designEffect": "脚步+1；挡住水险；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；挡住水险；通路+1。",
      "intent": null
    },
    "signature": "7312ac215e25388a72ff18f80b520c5339e67794985146a50fcad8abdcb56f7d"
  },
  {
    "id": "card231",
    "name": "趟过浅水",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 25,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成25场后习得",
    "sourceScene": "c2s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+2；失去1心神；抽1牌。",
    "shortText": "通路+2；失去1心神；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+2；失去1心神；抽1牌",
    "designId": "BDV2-275",
    "designEffect": "通路+2；失去1心神；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "hurt",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；失去1心神；抽1牌。",
      "intent": null
    },
    "signature": "2c0a3d54a938c5a730d83704a743af852baa3688660d752a45f512cd7e80d8ce"
  },
  {
    "id": "card232",
    "name": "压住船舷",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 26,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成26场后习得",
    "sourceScene": "c2s08",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；挡住水险；脚步+1。",
    "shortText": "护身+3；挡住水险；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护身+3；挡住水险；脚步+1",
    "designId": "BDV2-276",
    "designEffect": "护身+3；挡住水险；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "cover",
          "value": "water"
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；挡住水险；脚步+1。",
      "intent": null
    },
    "signature": "a05997fe4870cb09cd812ffab85d9d533a367f52b6a90b1a3cb5f31fb2fc212e"
  },
  {
    "id": "card233",
    "name": "抛出救生绳",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 26,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成26场后习得",
    "sourceScene": "c2s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "解2道束缚；护身+3。",
    "shortText": "解2道束缚；护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解2道束缚；护身+3",
    "designId": "BDV2-277",
    "designEffect": "解2道束缚；护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 2
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解2道束缚；护身+3。",
      "intent": null
    },
    "signature": "d27aa04afff24f212611dcc52f85686b826e472e9900b376132c529149607b41"
  },
  {
    "id": "card234",
    "name": "拖到岸边",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 27,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成27场后习得",
    "sourceScene": "c2s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "解1道束缚；通路+2；回复1心神。",
    "shortText": "解1道束缚；通路+2；回复1心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；通路+2；回复1心神",
    "designId": "BDV2-278",
    "designEffect": "解1道束缚；通路+2；回复1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；通路+2；回复1心神。",
      "intent": null
    },
    "signature": "978ac9231247568950ffad2e78a79e9b4f52faa8106ed47f809986a9300a038f"
  },
  {
    "id": "card235",
    "name": "架上渡板",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 27,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成27场后习得",
    "sourceScene": "c2s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；保留护身+2。",
    "shortText": "通路+1；保留护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；保留护身+2",
    "designId": "BDV2-279",
    "designEffect": "通路+1；保留护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；保留护身+2。",
      "intent": null
    },
    "signature": "97e20c4bfcd73fe349116229ba3b3b867a36bf3159cc80e7c9a0881d2512dc5b"
  },
  {
    "id": "card236",
    "name": "先送轻伤者",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "护送伤员离险；通路+1；回复1心神。",
    "shortText": "护送伤员离险；通路+1；回复1心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护送伤员离险；通路+1；回复1心神",
    "designId": "BDV2-280",
    "designEffect": "护送伤员离险；通路+1；回复1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "evacuate",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护送伤员离险；通路+1；回复1心神。",
      "intent": null
    },
    "signature": "f868a14aa7adc410b8caaaa89f9024d687e81a94d7cd5b7dff21d149acf397cc"
  },
  {
    "id": "card237",
    "name": "清出一条路",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制所有威胁1；通路+2。",
    "shortText": "压制所有威胁1；通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "压制所有威胁1；通路+2",
    "designId": "BDV2-281",
    "designEffect": "压制所有威胁1；通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "sweep",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制所有威胁1；通路+2。",
      "intent": null
    },
    "signature": "7d4d50fa44a2ac8a9ca2bb2b0b1f20eb34196be5ccb5fec1c2726dfa9e35edfa"
  },
  {
    "id": "card238",
    "name": "冲过狭口",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "通路+2；若有至少两处威胁，护身+2。",
    "shortText": "通路+2；若有至少两处威胁，护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+2；若有至少两处威胁，护身+2",
    "designId": "BDV2-282",
    "designEffect": "通路+2；若有至少两处威胁，护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "enemies2",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；若有至少两处威胁，护身+2。",
      "intent": null
    },
    "signature": "0d609894b1341d3439a8a9deb3877b8de192378a26de349b9900e82b30240e32"
  },
  {
    "id": "card239",
    "name": "伏低穿行",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "通路+1；目标压力−1。",
    "shortText": "通路+1；目标压力−1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；目标压力−1",
    "designId": "BDV2-283",
    "designEffect": "通路+1；目标压力−1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；目标压力−1。",
      "intent": null
    },
    "signature": "a33b770588c85a36f943608d0cc47ce0ee8e198f1477dc2fe88572536b85df51"
  },
  {
    "id": "card240",
    "name": "贴墙转身",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "脚步+1；护身+2；目标破绽+1。",
    "shortText": "脚步+1；护身+2；目标破绽+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+1；护身+2；目标破绽+1",
    "designId": "BDV2-284",
    "designEffect": "脚步+1；护身+2；目标破绽+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；护身+2；目标破绽+1。",
      "intent": null
    },
    "signature": "881b076fc3c2bcc090fb308fdc46cb499661621c1ef8ac7b7518e1c8ef1bb107"
  },
  {
    "id": "card241",
    "name": "走后门",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；若脚步至少2，抽2牌。",
    "shortText": "通路+1；若脚步至少2，抽2牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；若脚步至少2，抽2牌",
    "designId": "BDV2-285",
    "designEffect": "通路+1；若脚步至少2，抽2牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "route2",
          "effects": [
            {
              "op": "draw",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；若脚步至少2，抽2牌。",
      "intent": null
    },
    "signature": "f7ad61db08a8aa669149f740f26bc059a5fbc7e1a2871922fac2a34e6dda71d1"
  },
  {
    "id": "card242",
    "name": "换条小道",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "通路+1；抽1牌；消除1疲劳。",
    "shortText": "通路+1；抽1牌；消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；抽1牌；消除1疲劳",
    "designId": "BDV2-286",
    "designEffect": "通路+1；抽1牌；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；抽1牌；消除1疲劳。",
      "intent": null
    },
    "signature": "4ea51d79e176fb432ba6a0ffd718aee2a2a9ff9af31d82dedd79674c2b6db073"
  },
  {
    "id": "card243",
    "name": "记住岔路",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。脚步+1；下幕准备+1。",
    "shortText": "迅手（每轮同名限1）。脚步+1；下幕准备+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+1；下幕准备+1",
    "designId": "BDV2-287",
    "designEffect": "迅手（每轮同名限1）。脚步+1；下幕准备+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；下幕准备+1。",
      "intent": null
    },
    "signature": "9a4e2b6e05f63e771386d892fec66935337321677f14f8697dd7e5da90fedc34"
  },
  {
    "id": "card244",
    "name": "踩过空地",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。通路+1；破防+2。",
    "shortText": "迅手（每轮同名限1）。通路+1；破防+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；破防+2",
    "designId": "BDV2-288",
    "designEffect": "迅手（每轮同名限1）。通路+1；破防+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "vulnerable",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；破防+2。",
      "intent": null
    },
    "signature": "fbf496f7b9c8c63532b2cf243f54f053f397506fde6601417e72d2a4a407f69d"
  },
  {
    "id": "card245",
    "name": "钻出篱笆",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "解1道束缚；通路+1；失去1心神；抽1牌。",
    "shortText": "解1道束缚；通路+1；失去1心神；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；通路+1；失去1心神；抽1牌",
    "designId": "BDV2-289",
    "designEffect": "解1道束缚；通路+1；失去1心神；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "hurt",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；通路+1；失去1心神；抽1牌。",
      "intent": null
    },
    "signature": "c17e70b500d201ef2ea3d5df055eefd0aa0e43890d00dfd8e378c0cc93967050"
  },
  {
    "id": "card246",
    "name": "解开脚索",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 33,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成33场后习得",
    "sourceScene": "c2s15",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "迅手（每轮同名限1）。解1道束缚；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。解1道束缚；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；疲劳+1",
    "designId": "BDV2-290",
    "designEffect": "迅手（每轮同名限1）。解1道束缚；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；疲劳+1。",
      "intent": null
    },
    "signature": "626591a87e6b734f38de5cec3361cce0eaaf0a39dd86698360a1a3c53f18ccb2"
  },
  {
    "id": "card247",
    "name": "拽住衣角",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 33,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成33场后习得",
    "sourceScene": "c2s15",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "解1道束缚；信任+1。",
    "shortText": "解1道束缚；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；信任+1",
    "designId": "BDV2-291",
    "designEffect": "解1道束缚；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；信任+1。",
      "intent": null
    },
    "signature": "d4cb92dac673fd5139bf1dc3eda29baa8e2e1a40c87b06b6f6befeacc596ec3d"
  },
  {
    "id": "card248",
    "name": "拉倒挡路架",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 34,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成34场后习得",
    "sourceScene": "c2s16",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "压制目标4；通路+1；护身+1。",
    "shortText": "压制目标4；通路+1；护身+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "压制目标4；通路+1；护身+1",
    "designId": "BDV2-292",
    "designEffect": "压制目标4；通路+1；护身+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 4
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标4；通路+1；护身+1。",
      "intent": null
    },
    "signature": "3d309ca237f4bf97e9389add6bb6e1c3f8e3f5d615dc3c665b3ed60e966adcd3"
  },
  {
    "id": "card249",
    "name": "推车挡追兵",
    "cost": 2,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 34,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成34场后习得",
    "sourceScene": "c2s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+4；所有威胁压力−1。",
    "shortText": "护身+4；所有威胁压力−1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护身+4；所有威胁压力−1",
    "designId": "BDV2-293",
    "designEffect": "护身+4；所有威胁压力−1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "weakenAll",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；所有威胁压力−1。",
      "intent": null
    },
    "signature": "f4bcb66783e5e0de896bb32e5a30cdc1b412e0c5df6b74f51127b007c3558646"
  },
  {
    "id": "card250",
    "name": "破开围堵",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 35,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成35场后习得",
    "sourceScene": "c2s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制所有威胁1；若有至少两处威胁，通路+2。",
    "shortText": "压制所有威胁1；若有至少两处威胁，通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "压制所有威胁1；若有至少两处威胁，通路+2",
    "designId": "BDV2-294",
    "designEffect": "压制所有威胁1；若有至少两处威胁，通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "sweep",
          "n": 1
        },
        {
          "op": "if",
          "condition": "enemies2",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制所有威胁1；若有至少两处威胁，通路+2。",
      "intent": null
    },
    "signature": "ff19f3df15fdec7efe673506d22e0d93dfff20212577ad395f0d4c615bfe5952"
  },
  {
    "id": "card251",
    "name": "甩脱尾随",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 35,
    "sourceCase": 2,
    "source": "北段V2 · 追踪与脱险 · 完成35场后习得",
    "sourceScene": "c2s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "目标压力−2；脚步+1。",
    "shortText": "目标压力−2；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "目标压力−2；脚步+1",
    "designId": "BDV2-295",
    "designEffect": "目标压力−2；脚步+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−2；脚步+1。",
      "intent": null
    },
    "signature": "917ef8bcbb93d977b9c692b5f1c320c5ea10ee70efd3f2368e143b17e172b653"
  },
  {
    "id": "card252",
    "name": "躲进暗处",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "挡住下次敌袭；专注+1。",
    "shortText": "挡住下次敌袭；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "挡住下次敌袭；专注+1",
    "designId": "BDV2-296",
    "designEffect": "挡住下次敌袭；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "blockNext",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住下次敌袭；专注+1。",
      "intent": null
    },
    "signature": "5965aa8039f8bf80e423f64aa89c0c47073dda93099ba062b3d0305865778345"
  },
  {
    "id": "card253",
    "name": "用哨声联络",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。脚步+1；信任+1。",
    "shortText": "迅手（每轮同名限1）。脚步+1；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "脚步+1；信任+1",
    "designId": "BDV2-297",
    "designEffect": "迅手（每轮同名限1）。脚步+1；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；信任+1。",
      "intent": null
    },
    "signature": "8314849437a6fa30692d8821e624d1c3c0243ade9833f744338d1e382484b23b"
  },
  {
    "id": "card254",
    "name": "引开追赶者",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "打断目标本轮攻击；通路+1；破防+1。",
    "shortText": "打断目标本轮攻击；通路+1；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "打断目标本轮攻击；通路+1；破防+1",
    "designId": "BDV2-298",
    "designEffect": "打断目标本轮攻击；通路+1；破防+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；通路+1；破防+1。",
      "intent": null
    },
    "signature": "c7759cd07c69b773abc6daaf18ac51145327fe3969c442e1cb949574bc0da505"
  },
  {
    "id": "card255",
    "name": "翻过车辕",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "通路+1；护身+1；脚步+1。",
    "shortText": "通路+1；护身+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；护身+1；脚步+1",
    "designId": "BDV2-299",
    "designEffect": "通路+1；护身+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；护身+1；脚步+1。",
      "intent": null
    },
    "signature": "c5f755007b4c8a717b0064db429d07a87df92874a19aa945a46e2e28b243845d"
  },
  {
    "id": "card256",
    "name": "稳住缆绳",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；解1道束缚；保留护身+1。",
    "shortText": "护身+2；解1道束缚；保留护身+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护身+2；解1道束缚；保留护身+1",
    "designId": "BDV2-300",
    "designEffect": "护身+2；解1道束缚；保留护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；解1道束缚；保留护身+1。",
      "intent": null
    },
    "signature": "5aeaecec5860738244c6a7793119414fcfd17a3a35e157b6fc7c69fa18a96eb0"
  },
  {
    "id": "card257",
    "name": "护着担架走",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+4；通路+1；护送伤员离险。",
    "shortText": "护身+4；通路+1；护送伤员离险。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护身+4；通路+1；护送伤员离险",
    "designId": "BDV2-301",
    "designEffect": "护身+4；通路+1；护送伤员离险。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "evacuate",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；通路+1；护送伤员离险。",
      "intent": null
    },
    "signature": "61fbbeb224e68164eb031974d43f269a78599b8e1ecef47d605654877af8da66"
  },
  {
    "id": "card258",
    "name": "肩扛伤者",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 39,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成39场后习得",
    "sourceScene": "c3s03",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护送伤员离险；解1道束缚；疲劳+1；护身+4。",
    "shortText": "护送伤员离险；解1道束缚；疲劳+1；护身+4。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护送伤员离险；解1道束缚；疲劳+1；护身+4",
    "designId": "BDV2-302",
    "designEffect": "护送伤员离险；解1道束缚；疲劳+1；护身+4。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "evacuate",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "fatigue",
          "n": 1
        },
        {
          "op": "shield",
          "n": 4
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护送伤员离险；解1道束缚；疲劳+1；护身+4。",
      "intent": null
    },
    "signature": "20175b79f664459c730a6b9c221fd01fd5c49602a82fa2fc05d9284f7d9e1b9a"
  },
  {
    "id": "card259",
    "name": "压低火把",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 追踪与脱险 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。挡住反光；脚步+1。",
    "shortText": "迅手（每轮同名限1）。挡住反光；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "挡住反光；脚步+1",
    "designId": "BDV2-303",
    "designEffect": "迅手（每轮同名限1）。挡住反光；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住反光；脚步+1。",
      "intent": null
    },
    "signature": "d27420d4ed095e460dca78d2e627f8070b1820f7e2c11499f97ca7e9c341bf95"
  },
  {
    "id": "card260",
    "name": "摸到楼梯口",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 追踪与脱险 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；专注+1；挡住反光。",
    "shortText": "通路+1；专注+1；挡住反光。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；专注+1；挡住反光",
    "designId": "BDV2-304",
    "designEffect": "通路+1；专注+1；挡住反光。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；专注+1；挡住反光。",
      "intent": null
    },
    "signature": "c9cb9f49cf038cb43955fb6b0c19fe7f62dcc8bc0a97f9e344209730058b21f8"
  },
  {
    "id": "card261",
    "name": "追上最后一班船",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 40,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成40场后习得",
    "sourceScene": "c3s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "耗2脚步；通路+4；疲劳+1。",
    "shortText": "耗2脚步；通路+4；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "耗2脚步；通路+4；疲劳+1",
    "designId": "BDV2-305",
    "designEffect": "耗2脚步；通路+4；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "route",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 4
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗2脚步；通路+4；疲劳+1。",
      "intent": null
    },
    "signature": "aab97cef14e437e08487168fb8d28803a473fcbbcdf603522879963b8ae9d693"
  },
  {
    "id": "card262",
    "name": "把绳子传回来",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "解1道束缚；取回弃牌顶首张装备。",
    "shortText": "解1道束缚；取回弃牌顶首张装备。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；取回弃牌顶首张装备",
    "designId": "BDV2-306",
    "designEffect": "解1道束缚；取回弃牌顶首张装备。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；取回弃牌顶首张装备。",
      "intent": null
    },
    "signature": "55804c753bfcdf40a93a3c4c745f1d4b263199d2c9919ab4a9387fd59bcf07f8"
  },
  {
    "id": "card263",
    "name": "截住车轮",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；打断目标本轮攻击；脚步+1。",
    "shortText": "压制目标3；打断目标本轮攻击；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "压制目标3；打断目标本轮攻击；脚步+1",
    "designId": "BDV2-307",
    "designEffect": "压制目标3；打断目标本轮攻击；脚步+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；打断目标本轮攻击；脚步+1。",
      "intent": null
    },
    "signature": "839a34dc0ce91bf84fd729082b11ee942007e664ecc8f5fd090195d7700de09d"
  },
  {
    "id": "card264",
    "name": "拦下马车",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "目标压力−2；通路+2。",
    "shortText": "目标压力−2；通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "目标压力−2；通路+2",
    "designId": "BDV2-308",
    "designEffect": "目标压力−2；通路+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−2；通路+2。",
      "intent": null
    },
    "signature": "2e5acd8d44847a6cd6401b19ac5584bd7b8521edd81da8988fd828ad71d7ac10"
  },
  {
    "id": "card265",
    "name": "沿着屋檐走",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "通路+1；若已有护身，专注+1；脚步+1。",
    "shortText": "通路+1；若已有护身，专注+1；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "通路+1；若已有护身，专注+1；脚步+1",
    "designId": "BDV2-309",
    "designEffect": "通路+1；若已有护身，专注+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "focus",
              "n": 1
            }
          ]
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；若已有护身，专注+1；脚步+1。",
      "intent": null
    },
    "signature": "ed289432b1b41adc8829617e56a9cf1016a02b72dcea71524211c37cce9b630a"
  },
  {
    "id": "card266",
    "name": "架起跌倒的人",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "护送伤员离险；解1道束缚；脚步+1。",
    "shortText": "护送伤员离险；解1道束缚；脚步+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "护送伤员离险；解1道束缚；脚步+1",
    "designId": "BDV2-310",
    "designEffect": "护送伤员离险；解1道束缚；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "evacuate",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护送伤员离险；解1道束缚；脚步+1。",
      "intent": null
    },
    "signature": "c68fb8ca6c445db2300f7e22cbec5e765e451d0b4e0bf05d72db616e862a0df3"
  },
  {
    "id": "card267",
    "name": "换肩接力",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "消除1疲劳；脚步+1；若有两名协作者，通路+2。",
    "shortText": "消除1疲劳；脚步+1；若有两名协作者，通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "消除1疲劳；脚步+1；若有两名协作者，通路+2",
    "designId": "BDV2-311",
    "designEffect": "消除1疲劳；脚步+1；若有两名协作者，通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "消除1疲劳；脚步+1；若有两名协作者，通路+2。",
      "intent": null
    },
    "signature": "f1f85ab47c687c7861c924be63a6b0dac0056673bc278f33182b65d53149c732"
  },
  {
    "id": "card268",
    "name": "回去接同伴",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 追踪与脱险 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "解1道束缚；抽取1张人物。",
    "shortText": "解1道束缚；抽取1张人物。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "解1道束缚；抽取1张人物",
    "designId": "BDV2-312",
    "designEffect": "解1道束缚；抽取1张人物。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "person"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；抽取1张人物。",
      "intent": null
    },
    "signature": "3a08d0a64b0f503bd12466a8712c2ab78685914785d52a7437a5f25afbeceb1b"
  },
  {
    "id": "card269",
    "name": "退到亮处",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 追踪与脱险 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "挡住反光；通路+1；回复1心神。",
    "shortText": "挡住反光；通路+1；回复1心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "追踪与脱险",
    "buildRole": "挡住反光；通路+1；回复1心神",
    "designId": "BDV2-313",
    "designEffect": "挡住反光；通路+1；回复1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住反光；通路+1；回复1心神。",
      "intent": null
    },
    "signature": "27f61f0f1afeaed4e25cbcd77fcf6d2b7f667ced8300f68851553162e56cf623"
  },
  {
    "id": "card270",
    "name": "门后伏位",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次压制后：若已有护身，压制目标2。共3次。",
    "shortText": "每轮首次压制后：若已有护身，压制目标2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若已有护身，压制目标2",
    "designId": "BDV2-314",
    "designEffect": "每轮首次压制后：若已有护身，压制目标2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若已有护身，压制目标2。",
      "intent": null
    },
    "signature": "c410977f2ea1a2b50683be09e21409069a845c0e78e818c68ef53f8710105b2d"
  },
  {
    "id": "card271",
    "name": "拒马横栏",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次回合末：护身+3；目标压力−1。共3次。",
    "shortText": "入场：护身+2。每轮首次回合末：护身+3；目标压力−1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+3；目标压力−1",
    "designId": "BDV2-315",
    "designEffect": "入场：护身+2。每轮首次回合末：护身+3；目标压力−1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+3；目标压力−1。",
      "intent": null
    },
    "signature": "5aa6a2b0e0b9cbf06b542d59bb8af3d1c1c600ba26f87b3280a9607f3afc05d3"
  },
  {
    "id": "card272",
    "name": "灯下急救处",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 28,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成28场后习得",
    "sourceScene": "c2s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：回复2心神。每轮首次回复心神后：护身+2；消除1疲劳。共3次。",
    "shortText": "入场：回复2心神。每轮首次回复心神后：护身+2；消除1疲劳。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+2；消除1疲劳",
    "designId": "BDV2-316",
    "designEffect": "入场：回复2心神。每轮首次回复心神后：护身+2；消除1疲劳。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+2；消除1疲劳。",
      "intent": null
    },
    "signature": "ba17974c0da12ec0805d3368980e531fff4d69cdf4758d506a380fd2255b9b5f"
  },
  {
    "id": "card273",
    "name": "临时护送队",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次通路行动后：若有协作者，通路+1；护身+2。共3次。",
    "shortText": "入场：护身+2。每轮首次通路行动后：若有协作者，通路+1；护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若有协作者，通路+1；护身+2",
    "designId": "BDV2-317",
    "designEffect": "入场：护身+2。每轮首次通路行动后：若有协作者，通路+1；护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "leverage",
              "n": 1
            }
          ]
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有协作者，通路+1；护身+2。",
      "intent": null
    },
    "signature": "d6eff2d307fe334a9db57e14fe4c3e34e3f089b107c02b82925beec6c5870feb"
  },
  {
    "id": "card274",
    "name": "交叉警戒",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 29,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成29场后习得",
    "sourceScene": "c2s11",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：专注+1。每轮首次应对成功后：压制目标2；护身+2。共3次。",
    "shortText": "入场：专注+1。每轮首次应对成功后：压制目标2；护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "压制目标2；护身+2",
    "designId": "BDV2-318",
    "designEffect": "入场：专注+1。每轮首次应对成功后：压制目标2；护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "压制目标2；护身+2。",
      "intent": null
    },
    "signature": "b42476c7a65f9b4aa22377c2bdc86cef6f349069bc69e2edccaabf82d1ce6305"
  },
  {
    "id": "card275",
    "name": "狭口防线",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次挡住压力后：反击+3。共3次。",
    "shortText": "每轮首次挡住压力后：反击+3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "反击+3",
    "designId": "BDV2-319",
    "designEffect": "每轮首次挡住压力后：反击+3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "counter",
          "n": 3
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "反击+3。",
      "intent": null
    },
    "signature": "d1c370ddc94690890a3f6ed2faded37d19eba97d16b5ec59a6eecedac1ce4001"
  },
  {
    "id": "card276",
    "name": "椅背掩体",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 30,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成30场后习得",
    "sourceScene": "c2s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次回合末：保留护身+2。共3次。",
    "shortText": "入场：护身+2。每轮首次回合末：保留护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "保留护身+2",
    "designId": "BDV2-320",
    "designEffect": "入场：护身+2。每轮首次回合末：保留护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "保留护身+2。",
      "intent": null
    },
    "signature": "1adc7988ce4592f59de0f4ed032e33ff66cc1d1fe8c269b05f27dc85d3e40563"
  },
  {
    "id": "card277",
    "name": "落物隔离带",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住坠落。每轮首次回合末：护身+2；挡住坠落。共3次。",
    "shortText": "入场：挡住坠落。每轮首次回合末：护身+2；挡住坠落。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+2；挡住坠落",
    "designId": "BDV2-321",
    "designEffect": "入场：挡住坠落。每轮首次回合末：护身+2；挡住坠落。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "fall"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cover",
          "value": "fall"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+2；挡住坠落。",
      "intent": null
    },
    "signature": "41ab228da8662178b5b0e83321fed15b482f22da81ac61a2495bbc51f447a8d6"
  },
  {
    "id": "card278",
    "name": "背靠实墙",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 31,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成31场后习得",
    "sourceScene": "c2s13",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次回合开始：若没有协作者，护身+3。共3次。",
    "shortText": "每轮首次回合开始：若没有协作者，护身+3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若没有协作者，护身+3",
    "designId": "BDV2-322",
    "designEffect": "每轮首次回合开始：若没有协作者，护身+3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "if",
          "condition": "alone",
          "effects": [
            {
              "op": "shield",
              "n": 3
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若没有协作者，护身+3。",
      "intent": null
    },
    "signature": "d49b86e539eada442545274857fc0e186a7bf62aed54122a8c22e664b81f91c4"
  },
  {
    "id": "card279",
    "name": "错身通道",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次打断威胁后：通路+1；护身+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次打断威胁后：通路+1；护身+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "通路+1；护身+1",
    "designId": "BDV2-323",
    "designEffect": "入场：脚步+1。每轮首次打断威胁后：通路+1；护身+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "stun",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "通路+1；护身+1。",
      "intent": null
    },
    "signature": "bd3abf120cbe6d6f2e80b60b9f6a930542f77cb8b0a116bb31ac8c11b630dbef"
  },
  {
    "id": "card280",
    "name": "绳索围栏",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 32,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成32场后习得",
    "sourceScene": "c2s14",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "每轮首次解救行动后：解1道束缚；护身+2。共3次。",
    "shortText": "每轮首次解救行动后：解1道束缚；护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "解1道束缚；护身+2",
    "designId": "BDV2-324",
    "designEffect": "每轮首次解救行动后：解1道束缚；护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；护身+2。",
      "intent": null
    },
    "signature": "2d3aec75fb7e0ad81fc0a6ffff1acc3e233b3a76a8482c7a7149dc38f8df3dc4"
  },
  {
    "id": "card281",
    "name": "案头照明",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 现场阵地 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住反光。每轮首次调查行动后：专注+1；挡住反光。共3次。",
    "shortText": "入场：挡住反光。每轮首次调查行动后：专注+1；挡住反光。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "专注+1；挡住反光",
    "designId": "BDV2-325",
    "designEffect": "入场：挡住反光。每轮首次调查行动后：专注+1；挡住反光。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "专注+1；挡住反光。",
      "intent": null
    },
    "signature": "542a8139531994daad8030fd4188ad6ba01f27f7c15683e3f98aeef539525f82"
  },
  {
    "id": "card282",
    "name": "封存书桌",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 33,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成33场后习得",
    "sourceScene": "c2s15",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：挡住散页。每轮首次进入下一幕：抽1牌；挡住散页。共3次。",
    "shortText": "入场：挡住散页。每轮首次进入下一幕：抽1牌；挡住散页。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "抽1牌；挡住散页",
    "designId": "BDV2-326",
    "designEffect": "入场：挡住散页。每轮首次进入下一幕：抽1牌；挡住散页。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽1牌；挡住散页。",
      "intent": null
    },
    "signature": "6b00830a39a9c52c67efdde10f6fe45e23f8ccdd0eceb38d88daa62ad01768fd"
  },
  {
    "id": "card283",
    "name": "平心茶席",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 34,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成34场后习得",
    "sourceScene": "c2s16",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：信任+1。每轮首次交涉行动后：回复2心神；交涉+1。共3次。",
    "shortText": "入场：信任+1。每轮首次交涉行动后：回复2心神；交涉+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "回复2心神；交涉+1",
    "designId": "BDV2-327",
    "designEffect": "入场：信任+1。每轮首次交涉行动后：回复2心神；交涉+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复2心神；交涉+1。",
      "intent": null
    },
    "signature": "7691091e70f5854eb640c56517482b513e5315586492c06fdbad2cb9e9f38675"
  },
  {
    "id": "card284",
    "name": "回廊等候位",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 34,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成34场后习得",
    "sourceScene": "c2s16",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住催逼。每轮首次应对成功后：下轮费用+1。共3次。",
    "shortText": "入场：挡住催逼。每轮首次应对成功后：下轮费用+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "下轮费用+1",
    "designId": "BDV2-328",
    "designEffect": "入场：挡住催逼。每轮首次应对成功后：下轮费用+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "effects": [
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "下轮费用+1。",
      "intent": null
    },
    "signature": "bbc573797736f3d5bb5f5927814f373fcc150a88770682a1b697deec9039ca59"
  },
  {
    "id": "card285",
    "name": "双人核对席",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 35,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成35场后习得",
    "sourceScene": "c2s17",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次调查行动后：若有两名协作者，调查+2。共3次。",
    "shortText": "每轮首次调查行动后：若有两名协作者，调查+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若有两名协作者，调查+2",
    "designId": "BDV2-329",
    "designEffect": "每轮首次调查行动后：若有两名协作者，调查+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "insight",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有两名协作者，调查+2。",
      "intent": null
    },
    "signature": "9f42f5739254b1a1dc73e9d3a78b0ba560220f16c269f3f9c79ceed85706b451"
  },
  {
    "id": "card286",
    "name": "分段警戒绳",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 35,
    "sourceCase": 2,
    "source": "北段V2 · 现场阵地 · 完成35场后习得",
    "sourceScene": "c2s17",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：脚步+1。每轮首次通路行动后：挡住转移；通路+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：挡住转移；通路+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "挡住转移；通路+1",
    "designId": "BDV2-330",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：挡住转移；通路+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "transfer"
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "挡住转移；通路+1。",
      "intent": null
    },
    "signature": "422125d9a7647005e55a9c852f44e83715fe084e2722ec41673ac78f650b4a8f"
  },
  {
    "id": "card287",
    "name": "低灯休息处",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "每轮首次回合末：若手牌不超过2张，回复3心神。共3次。",
    "shortText": "每轮首次回合末：若手牌不超过2张，回复3心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若手牌不超过2张，回复3心神",
    "designId": "BDV2-331",
    "designEffect": "每轮首次回合末：若手牌不超过2张，回复3心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "if",
          "condition": "hand2",
          "effects": [
            {
              "op": "heal",
              "n": 3
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若手牌不超过2张，回复3心神。",
      "intent": null
    },
    "signature": "a36bbfe9a1d6f61de31e0415fb8e7e1dc7a189e08ca0b754f471700c5376dea4"
  },
  {
    "id": "card288",
    "name": "屋檐干燥处",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：干燥准备+1。每轮首次进入下一幕：干燥准备+1；挡住水险。共3次。",
    "shortText": "入场：干燥准备+1。每轮首次进入下一幕：干燥准备+1；挡住水险。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "干燥准备+1；挡住水险",
    "designId": "BDV2-332",
    "designEffect": "入场：干燥准备+1。每轮首次进入下一幕：干燥准备+1；挡住水险。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "dry",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "干燥准备+1；挡住水险。",
      "intent": null
    },
    "signature": "211015fe956fa95588875d2620781f5b1d2a0306f0352b25bcd48af3b6c28512"
  },
  {
    "id": "card289",
    "name": "半掩门观察位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：专注+1。每轮首次回合开始：目标破绽+1。共3次。",
    "shortText": "入场：专注+1。每轮首次回合开始：目标破绽+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "目标破绽+1",
    "designId": "BDV2-333",
    "designEffect": "入场：专注+1。每轮首次回合开始：目标破绽+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "目标破绽+1。",
      "intent": null
    },
    "signature": "e60bfe61fa1511167ca24d0f0663f129735486e529b72198d456b61b82d3cfb8"
  },
  {
    "id": "card290",
    "name": "雨棚接应处",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：挡住水险。每轮首次应对成功后：通路+1；回复1心神。共3次。",
    "shortText": "入场：挡住水险。每轮首次应对成功后：通路+1；回复1心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "通路+1；回复1心神",
    "designId": "BDV2-334",
    "designEffect": "入场：挡住水险。每轮首次应对成功后：通路+1；回复1心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "通路+1；回复1心神。",
      "intent": null
    },
    "signature": "b8c939c8e9c88bae0210105769082aa5c12d342b9cfb762b14dae3d08e9e0b70"
  },
  {
    "id": "card291",
    "name": "看守交班点",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次进入下一幕：护身+3；抽取1张人物。共3次。",
    "shortText": "入场：护身+2。每轮首次进入下一幕：护身+3；抽取1张人物。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+3；抽取1张人物",
    "designId": "BDV2-335",
    "designEffect": "入场：护身+2。每轮首次进入下一幕：护身+3；抽取1张人物。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "drawMode",
          "value": "person"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+3；抽取1张人物。",
      "intent": null
    },
    "signature": "2eb3bca7813d4060e32fc2803fb071e8cd0b47b1a98801e916c899cb04c9f0c0"
  },
  {
    "id": "card292",
    "name": "床边陪护席",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：信任+1。每轮首次受伤后：回复2心神；信任+1。共3次。",
    "shortText": "入场：信任+1。每轮首次受伤后：回复2心神；信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "回复2心神；信任+1",
    "designId": "BDV2-336",
    "designEffect": "入场：信任+1。每轮首次受伤后：回复2心神；信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复2心神；信任+1。",
      "intent": null
    },
    "signature": "202b74c7dc805feb2e76abc31aa242ea69448d28bb409f59990661aae453a8f7"
  },
  {
    "id": "card293",
    "name": "临时照护站",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 现场阵地 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：处理1级轻伤。每轮首次回合末：回复2心神；处理1级轻伤。共3次。",
    "shortText": "入场：处理1级轻伤。每轮首次回合末：回复2心神；处理1级轻伤。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "回复2心神；处理1级轻伤",
    "designId": "BDV2-337",
    "designEffect": "入场：处理1级轻伤。每轮首次回合末：回复2心神；处理1级轻伤。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "care",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "care",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复2心神；处理1级轻伤。",
      "intent": null
    },
    "signature": "1051430aae9bbaa4d5fbe86f38dc112b96e6c9f60de09376a48b19fa94960ed2"
  },
  {
    "id": "card294",
    "name": "后院撤离口",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 39,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成39场后习得",
    "sourceScene": "c3s03",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：通路+1。每轮首次打断威胁后：脚步+1；抽1牌。共3次。",
    "shortText": "入场：通路+1。每轮首次打断威胁后：脚步+1；抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "脚步+1；抽1牌",
    "designId": "BDV2-338",
    "designEffect": "入场：通路+1。每轮首次打断威胁后：脚步+1；抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "stun",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+1；抽1牌。",
      "intent": null
    },
    "signature": "1be40186684b0b450146c887da63cb9ecc59c584fc00787a986ad8184e59d660"
  },
  {
    "id": "card295",
    "name": "背光问话桌",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 现场阵地 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "每轮首次交涉行动后：挡住反光；信任+1。共3次。",
    "shortText": "每轮首次交涉行动后：挡住反光；信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "挡住反光；信任+1",
    "designId": "BDV2-339",
    "designEffect": "每轮首次交涉行动后：挡住反光；信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "挡住反光；信任+1。",
      "intent": null
    },
    "signature": "f1e1ceb70839b7f870fa1e1db533d871b1e099f4cb6ace6417bf50bb831ced90"
  },
  {
    "id": "card296",
    "name": "拆分材料台",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 40,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成40场后习得",
    "sourceScene": "c3s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：抽1牌。每轮首次调查行动后：调查+1；弃最右1牌；抽1牌。共3次。",
    "shortText": "入场：抽1牌。每轮首次调查行动后：调查+1；弃最右1牌；抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "调查+1；弃最右1牌；抽1牌",
    "designId": "BDV2-340",
    "designEffect": "入场：抽1牌。每轮首次调查行动后：调查+1；弃最右1牌；抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1；弃最右1牌；抽1牌。",
      "intent": null
    },
    "signature": "97148d61818fdb06802d496ac8189cff1cb1ba6145940e408727324f9d3c7edc"
  },
  {
    "id": "card297",
    "name": "防潮垫板",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住水险。每轮首次回合末：干燥准备+1；保留护身+1。共3次。",
    "shortText": "入场：挡住水险。每轮首次回合末：干燥准备+1；保留护身+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "干燥准备+1；保留护身+1",
    "designId": "BDV2-341",
    "designEffect": "入场：挡住水险。每轮首次回合末：干燥准备+1；保留护身+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "干燥准备+1；保留护身+1。",
      "intent": null
    },
    "signature": "042d6434afa258c7c88053d17d865d1232fb49c2966999c4475e63ee5df0314f"
  },
  {
    "id": "card298",
    "name": "两侧包抄位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：目标破绽+1。每轮首次压制后：若有两名协作者，压制目标2。共3次。",
    "shortText": "入场：目标破绽+1。每轮首次压制后：若有两名协作者，压制目标2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若有两名协作者，压制目标2",
    "designId": "BDV2-342",
    "designEffect": "入场：目标破绽+1。每轮首次压制后：若有两名协作者，压制目标2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "damage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有两名协作者，压制目标2。",
      "intent": null
    },
    "signature": "dcc76639419798f7f4e2a1a97fb27999081ad5d71cd64e30a0984c904f78a89b"
  },
  {
    "id": "card299",
    "name": "楼梯上沿",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次压制后：目标压力−1。共3次。",
    "shortText": "入场：护身+2。每轮首次压制后：目标压力−1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "目标压力−1",
    "designId": "BDV2-343",
    "designEffect": "入场：护身+2。每轮首次压制后：目标压力−1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "目标压力−1。",
      "intent": null
    },
    "signature": "3511650e3f4cab6d2cf4c872498611c760c2a893d275a542542419625ee147ac"
  },
  {
    "id": "card300",
    "name": "门槛止步线",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：通路+1。每轮首次应对成功后：反击+2。共3次。",
    "shortText": "入场：通路+1。每轮首次应对成功后：反击+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "反击+2",
    "designId": "BDV2-344",
    "designEffect": "入场：通路+1。每轮首次应对成功后：反击+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "反击+2。",
      "intent": null
    },
    "signature": "159b17ac9a89435d765b8f2d1a32f95958106c32079f247ea03dffbb688d4a55"
  },
  {
    "id": "card301",
    "name": "退路标灯",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 现场阵地 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：脚步+1。每轮首次进入下一幕：通路+1；挡住反光。共3次。",
    "shortText": "入场：脚步+1。每轮首次进入下一幕：通路+1；挡住反光。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "通路+1；挡住反光",
    "designId": "BDV2-345",
    "designEffect": "入场：脚步+1。每轮首次进入下一幕：通路+1；挡住反光。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "通路+1；挡住反光。",
      "intent": null
    },
    "signature": "81b4d523e2fc2959cfe3959154034db41caaa2a509d4cd3927c4aa6b3ecab123"
  },
  {
    "id": "card302",
    "name": "井边救援架",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：护身+2。每轮首次解救行动后：解1道束缚；回复2心神。共3次。",
    "shortText": "入场：护身+2。每轮首次解救行动后：解1道束缚；回复2心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "解1道束缚；回复2心神",
    "designId": "BDV2-346",
    "designEffect": "入场：护身+2。每轮首次解救行动后：解1道束缚；回复2心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "heal",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；回复2心神。",
      "intent": null
    },
    "signature": "b8429ea4acd30bc9bd20221417394ce88e7fdc023b60c1799e92fbd75fc8d9b4"
  },
  {
    "id": "card303",
    "name": "碎石隔离区",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "每轮首次挡住压力后：护身+1；通路+1。共3次。",
    "shortText": "每轮首次挡住压力后：护身+1；通路+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+1；通路+1",
    "designId": "BDV2-347",
    "designEffect": "每轮首次挡住压力后：护身+1；通路+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+1；通路+1。",
      "intent": null
    },
    "signature": "97549671aac681f4aa3b0b1cbc19a0d5cd2e071c61e3f57ad6a0abde3fcdb765"
  },
  {
    "id": "card304",
    "name": "诊看帘后",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住插话。每轮首次回复心神后：信任+1；挡住插话。共3次。",
    "shortText": "入场：挡住插话。每轮首次回复心神后：信任+1；挡住插话。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "信任+1；挡住插话",
    "designId": "BDV2-348",
    "designEffect": "入场：挡住插话。每轮首次回复心神后：信任+1；挡住插话。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "信任+1；挡住插话。",
      "intent": null
    },
    "signature": "82c9a6e29204d7c8cccca684ddf4cdab17c4966f11163a92c26e1d3b5658f36d"
  },
  {
    "id": "card305",
    "name": "分流人群",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 45,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成45场后习得",
    "sourceScene": "c3s09",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：所有威胁压力−1。每轮首次回合末：交涉+1。共3次。",
    "shortText": "入场：所有威胁压力−1。每轮首次回合末：交涉+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "交涉+1",
    "designId": "BDV2-349",
    "designEffect": "入场：所有威胁压力−1。每轮首次回合末：交涉+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "weakenAll",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "交涉+1。",
      "intent": null
    },
    "signature": "dff7ce4de7da33e50b34e10002419cd03a6b72e7d3f7a928926e94008942b142"
  },
  {
    "id": "card306",
    "name": "装卸空地",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 45,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成45场后习得",
    "sourceScene": "c3s09",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：通路+1。每轮首次部署装备后：脚步+1；下轮费用+1。共3次。",
    "shortText": "入场：通路+1。每轮首次部署装备后：脚步+1；下轮费用+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "脚步+1；下轮费用+1",
    "designId": "BDV2-350",
    "designEffect": "入场：通路+1。每轮首次部署装备后：脚步+1；下轮费用+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+1；下轮费用+1。",
      "intent": null
    },
    "signature": "69bcf39193cdf2c0706392cd4b9b9a27d8458ed3e213cb3c88eda79e5ff1900d"
  },
  {
    "id": "card307",
    "name": "备用器械架",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：抽取1张装备。每轮首次部署装备后：护身+1；抽取1张技能。共3次。",
    "shortText": "入场：抽取1张装备。每轮首次部署装备后：护身+1；抽取1张技能。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "护身+1；抽取1张技能",
    "designId": "BDV2-351",
    "designEffect": "入场：抽取1张装备。每轮首次部署装备后：护身+1；抽取1张技能。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "drawMode",
          "value": "skill"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+1；抽取1张技能。",
      "intent": null
    },
    "signature": "5a362dfcac65063a191bde9e3e0923c61bcb27669c7ebc986cde3048df04f8b3"
  },
  {
    "id": "card308",
    "name": "手势联络位",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：脚步+1。每轮首次协作者入场后：信任+1；脚步+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次协作者入场后：信任+1；脚步+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "信任+1；脚步+1",
    "designId": "BDV2-352",
    "designEffect": "入场：脚步+1。每轮首次协作者入场后：信任+1；脚步+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_person",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "信任+1；脚步+1。",
      "intent": null
    },
    "signature": "cf23daf5a399eb2237062f257f2968c2ff75a86a55723bd645b14aed1ed4d8ba"
  },
  {
    "id": "card309",
    "name": "临窗比色台",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 47,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成47场后习得",
    "sourceScene": "c3s11",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：专注+1。每轮首次调查行动后：调查+1；挡住水险。共3次。",
    "shortText": "入场：专注+1。每轮首次调查行动后：调查+1；挡住水险。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "调查+1；挡住水险",
    "designId": "BDV2-353",
    "designEffect": "入场：专注+1。每轮首次调查行动后：调查+1；挡住水险。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1；挡住水险。",
      "intent": null
    },
    "signature": "e7c831d70b1f1e4d25017d0bafbe02b72adfc6a671681898b3f90e1339cfd3dc"
  },
  {
    "id": "card310",
    "name": "院门拦截位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 47,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成47场后习得",
    "sourceScene": "c3s11",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：目标压力−1。每轮首次应对成功后：压制目标3。共3次。",
    "shortText": "入场：目标压力−1。每轮首次应对成功后：压制目标3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "压制目标3",
    "designId": "BDV2-354",
    "designEffect": "入场：目标压力−1。每轮首次应对成功后：压制目标3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 3
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "压制目标3。",
      "intent": null
    },
    "signature": "5aa9515fbfbff470626d2e29e81efce7d53597e219effaba7803535635e42e57"
  },
  {
    "id": "card311",
    "name": "巷尾阻车带",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：通路+1。每轮首次回合末：目标压力−1；脚步+1。共3次。",
    "shortText": "入场：通路+1。每轮首次回合末：目标压力−1；脚步+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "目标压力−1；脚步+1",
    "designId": "BDV2-355",
    "designEffect": "入场：通路+1。每轮首次回合末：目标压力−1；脚步+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "目标压力−1；脚步+1。",
      "intent": null
    },
    "signature": "6b56f3344f2bfd60c7c1746123e16c30aa8f5e459cdef37e43f550fb39cb6b56"
  },
  {
    "id": "card312",
    "name": "横梁悬绳",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；保留护身+1。共3次。",
    "shortText": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；保留护身+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "解1道束缚；保留护身+1",
    "designId": "BDV2-356",
    "designEffect": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；保留护身+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；保留护身+1。",
      "intent": null
    },
    "signature": "d4b9bcd6bab7908d73e31e79890a94260aacd265126d96a9d0304d024ad2066f"
  },
  {
    "id": "card313",
    "name": "避风缓息角",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：护身+1。每轮首次回合末：回复1心神；消除1疲劳。共3次。",
    "shortText": "入场：护身+1。每轮首次回合末：回复1心神；消除1疲劳。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "回复1心神；消除1疲劳",
    "designId": "BDV2-357",
    "designEffect": "入场：护身+1。每轮首次回合末：回复1心神；消除1疲劳。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 1
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复1心神；消除1疲劳。",
      "intent": null
    },
    "signature": "a30e4cc07cf8eed68d4f5ecb3e70e12ae482570b272786e4f83e0ded4b282d82"
  },
  {
    "id": "card314",
    "name": "急流投绳位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：解1道束缚。每轮首次应对成功后：解1道束缚；护身+3。共3次。",
    "shortText": "入场：解1道束缚。每轮首次应对成功后：解1道束缚；护身+3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "解1道束缚；护身+3",
    "designId": "BDV2-358",
    "designEffect": "入场：解1道束缚。每轮首次应对成功后：解1道束缚；护身+3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；护身+3。",
      "intent": null
    },
    "signature": "53b6fb8971b9261698af0510cb0d17ac1e194c9f051d5245cddda0eb3236e10c"
  },
  {
    "id": "card315",
    "name": "低墙跳落点",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 50,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成50场后习得",
    "sourceScene": "c3s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+1。每轮首次通路行动后：脚步+1；下轮费用+1。共3次。",
    "shortText": "入场：护身+1。每轮首次通路行动后：脚步+1；下轮费用+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "脚步+1；下轮费用+1",
    "designId": "BDV2-359",
    "designEffect": "入场：护身+1。每轮首次通路行动后：脚步+1；下轮费用+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+1；下轮费用+1。",
      "intent": null
    },
    "signature": "65c448d35ea630e4d772e17cfe884d7f41655444ba24a2d8d156ab60d4adc923"
  },
  {
    "id": "card316",
    "name": "原件保护圈",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 50,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成50场后习得",
    "sourceScene": "c3s14",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住散页。每轮首次调查行动后：保留护身+2；专注+1。共3次。",
    "shortText": "入场：挡住散页。每轮首次调查行动后：保留护身+2；专注+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "保留护身+2；专注+1",
    "designId": "BDV2-360",
    "designEffect": "入场：挡住散页。每轮首次调查行动后：保留护身+2；专注+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "保留护身+2；专注+1。",
      "intent": null
    },
    "signature": "51ba78396d4c313d11f953d5fd70b03cb8e72986195ab6a278aa40fe2e196e4f"
  },
  {
    "id": "card317",
    "name": "卧榻缓息处",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：回复2心神。每轮首次回合开始：若心神未满，回复2心神；疲劳+1。共3次。",
    "shortText": "入场：回复2心神。每轮首次回合开始：若心神未满，回复2心神；疲劳+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "若心神未满，回复2心神；疲劳+1",
    "designId": "BDV2-361",
    "designEffect": "入场：回复2心神。每轮首次回合开始：若心神未满，回复2心神；疲劳+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "wounded",
          "effects": [
            {
              "op": "heal",
              "n": 2
            }
          ]
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若心神未满，回复2心神；疲劳+1。",
      "intent": null
    },
    "signature": "8742d469fdc3c96edfde5617602686309d0bafe2b0e069467f5040d8dab25296"
  },
  {
    "id": "card318",
    "name": "屋角阻击位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：目标破绽+1。每轮首次压制后：反击+1；压制目标1。共3次。",
    "shortText": "入场：目标破绽+1。每轮首次压制后：反击+1；压制目标1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "反击+1；压制目标1",
    "designId": "BDV2-362",
    "designEffect": "入场：目标破绽+1。每轮首次压制后：反击+1；压制目标1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "counter",
          "n": 1
        },
        {
          "op": "damage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "反击+1；压制目标1。",
      "intent": null
    },
    "signature": "133446f2a82318e42fe540464f6964dd9f1e5589f593784ef95fc9cedbc0fccc"
  },
  {
    "id": "card319",
    "name": "落闸掩护线",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 52,
    "sourceCase": 3,
    "source": "北段V2 · 现场阵地 · 完成52场后习得",
    "sourceScene": "c3s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+3。每轮首次进入下一幕：所有威胁压力−1；通路+1。共3次。",
    "shortText": "入场：护身+3。每轮首次进入下一幕：所有威胁压力−1；通路+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "现场阵地",
    "buildRole": "所有威胁压力−1；通路+1",
    "designId": "BDV2-363",
    "designEffect": "入场：护身+3。每轮首次进入下一幕：所有威胁压力−1；通路+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "weakenAll",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "所有威胁压力−1；通路+1。",
      "intent": null
    },
    "signature": "966aff69f35762a1a24e4a721848e671cc7a12c2ba383886b0a2dd4ef692ef42"
  },
  {
    "id": "card320",
    "name": "架住劈砍",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+4；反击+2。",
    "shortText": "应对敌袭：护身+4；反击+2。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+4；反击+2",
    "designId": "BDV2-364",
    "designEffect": "应对敌袭：护身+4；反击+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；反击+2。",
      "intent": "attack"
    },
    "signature": "b89c1a6f4097cc10e2e3e0e8218440de5ff436b92c21f2288724105c7f13cd79"
  },
  {
    "id": "card321",
    "name": "抢挡暗棍",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：挡住下次敌袭；抽1牌。",
    "shortText": "应对敌袭：挡住下次敌袭；抽1牌。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "挡住下次敌袭；抽1牌",
    "designId": "BDV2-365",
    "designEffect": "应对敌袭：挡住下次敌袭；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "blockNext",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "挡住下次敌袭；抽1牌。",
      "intent": "attack"
    },
    "signature": "cd3a4f56ff044919bf1ebc6f2f061200e471351e0e134cd0bfd477a0f720caea"
  },
  {
    "id": "card322",
    "name": "挡箭护人",
    "cost": 2,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+6；若有协作者，信任+1。",
    "shortText": "应对敌袭：护身+6；若有协作者，信任+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+6；若有协作者，信任+1",
    "designId": "BDV2-366",
    "designEffect": "应对敌袭：护身+6；若有协作者，信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 6
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "resolve",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+6；若有协作者，信任+1。",
      "intent": "attack"
    },
    "signature": "50b7e15292020b856400aefdfb7470d9641b5a08f0b2c8c535b2c121acbf38a0"
  },
  {
    "id": "card323",
    "name": "听风侧身",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。应对敌袭：目标压力−1；脚步+1。",
    "shortText": "迅手（每轮同名限1）。应对敌袭：目标压力−1；脚步+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "目标压力−1；脚步+1",
    "designId": "BDV2-367",
    "designEffect": "迅手（每轮同名限1）。应对敌袭：目标压力−1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；脚步+1。",
      "intent": "attack"
    },
    "signature": "fc19b715afd5ec747e26f703b1d723e3a309a1455c026b39c1230e8acaf1eeed"
  },
  {
    "id": "card324",
    "name": "挡后还手",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+2；压制目标3。",
    "shortText": "应对敌袭：护身+2；压制目标3。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；压制目标3",
    "designId": "BDV2-368",
    "designEffect": "应对敌袭：护身+2；压制目标3。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "damage",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；压制目标3。",
      "intent": "attack"
    },
    "signature": "677ed7909f6b6a09ccc1f1d6046798ae9587285d0249d4a2dd195a37b0fc826d"
  },
  {
    "id": "card325",
    "name": "顺势卸刃",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对敌袭：目标压力−2；抽1牌。",
    "shortText": "应对敌袭：目标压力−2；抽1牌。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "目标压力−2；抽1牌",
    "designId": "BDV2-369",
    "designEffect": "应对敌袭：目标压力−2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−2；抽1牌。",
      "intent": "attack"
    },
    "signature": "f7adb20c42735522dd519c2fe00a2c25d61a5042c68798858e59718aec32d3e5"
  },
  {
    "id": "card326",
    "name": "蹲身躲刀",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。应对敌袭：护身+3；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。应对敌袭：护身+3；疲劳+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+3；疲劳+1",
    "designId": "BDV2-370",
    "designEffect": "迅手（每轮同名限1）。应对敌袭：护身+3；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；疲劳+1。",
      "intent": "attack"
    },
    "signature": "c859dc794fee85a03fbec0e6b3af17ca84ba5ce8bf4b5c40b2b0df3dd3158091"
  },
  {
    "id": "card327",
    "name": "搭肩拉回",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "应对敌袭：护身+3；解1道束缚。",
    "shortText": "应对敌袭：护身+3；解1道束缚。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+3；解1道束缚",
    "designId": "BDV2-371",
    "designEffect": "应对敌袭：护身+3；解1道束缚。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；解1道束缚。",
      "intent": "attack"
    },
    "signature": "73ad8c0f3fab0c35689887d1da6eb42373ba4b3f42fcb52b400f06781c1621e3"
  },
  {
    "id": "card328",
    "name": "护住头颈",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "应对敌袭：护身+5；消除1疲劳。",
    "shortText": "应对敌袭：护身+5；消除1疲劳。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+5；消除1疲劳",
    "designId": "BDV2-372",
    "designEffect": "应对敌袭：护身+5；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 5
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+5；消除1疲劳。",
      "intent": "attack"
    },
    "signature": "33aaac9c499070591c928af9a2e09e6ef07c44e823ee42a15e8dcf72be768dce"
  },
  {
    "id": "card329",
    "name": "抓住破绽",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "应对敌袭：目标破绽+2；压制目标2。",
    "shortText": "应对敌袭：目标破绽+2；压制目标2。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "目标破绽+2；压制目标2",
    "designId": "BDV2-373",
    "designEffect": "应对敌袭：目标破绽+2；压制目标2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 2
        },
        {
          "op": "damage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标破绽+2；压制目标2。",
      "intent": "attack"
    },
    "signature": "961ab227e1426442aab00581e240f8f6605c12dc90e942fa682d91bb7a917ea3"
  },
  {
    "id": "card330",
    "name": "攥住刀背",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。应对敌袭：失去2心神；打断目标本轮攻击。",
    "shortText": "迅手（每轮同名限1）。应对敌袭：失去2心神；打断目标本轮攻击。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "失去2心神；打断目标本轮攻击",
    "designId": "BDV2-374",
    "designEffect": "迅手（每轮同名限1）。应对敌袭：失去2心神；打断目标本轮攻击。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "hurt",
          "n": 2
        },
        {
          "op": "stun",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "失去2心神；打断目标本轮攻击。",
      "intent": "attack"
    },
    "signature": "548c68cbe65c5cc44eeca467883057cdb2f4e9e737e4a9b1fec75c35332440dc"
  },
  {
    "id": "card331",
    "name": "迎头截棍",
    "cost": 2,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "应对敌袭：压制目标3；打断目标本轮攻击。",
    "shortText": "应对敌袭：压制目标3；打断目标本轮攻击。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "压制目标3；打断目标本轮攻击",
    "designId": "BDV2-375",
    "designEffect": "应对敌袭：压制目标3；打断目标本轮攻击。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "stun",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；打断目标本轮攻击。",
      "intent": "attack"
    },
    "signature": "579fc84907c936538a0b4d1d07970e7334e44c8ed7e5064ab649776c376fec71"
  },
  {
    "id": "card332",
    "name": "侧撞救人",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "应对敌袭：护身+3；通路+1。",
    "shortText": "应对敌袭：护身+3；通路+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+3；通路+1",
    "designId": "BDV2-376",
    "designEffect": "应对敌袭：护身+3；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；通路+1。",
      "intent": "attack"
    },
    "signature": "7ff52193618c1be32ba8c5c2afaf8e50cbb2c7fd5f0d9688bfec6d2969f01f04"
  },
  {
    "id": "card333",
    "name": "背身护同伴",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+4；若有两名协作者，反击+2。",
    "shortText": "应对敌袭：护身+4；若有两名协作者，反击+2。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+4；若有两名协作者，反击+2",
    "designId": "BDV2-377",
    "designEffect": "应对敌袭：护身+4；若有两名协作者，反击+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "counter",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；若有两名协作者，反击+2。",
      "intent": "attack"
    },
    "signature": "8c8dff532a435a9d7c7c8a44a28f47c1b446b35a6897c8783e46aaa4ef207685"
  },
  {
    "id": "card334",
    "name": "踢翻追兵",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "应对敌袭：压制目标2；脚步+1。",
    "shortText": "应对敌袭：压制目标2；脚步+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "压制目标2；脚步+1",
    "designId": "BDV2-378",
    "designEffect": "应对敌袭：压制目标2；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；脚步+1。",
      "intent": "attack"
    },
    "signature": "d6bd285432a405d791d93fcdee305acccd1d529df3a9b5fbfd5c027c8ba936be"
  },
  {
    "id": "card335",
    "name": "扶稳失足者",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对坠落：护身+3；通路+1。",
    "shortText": "应对坠落：护身+3；通路+1。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+3；通路+1",
    "designId": "BDV2-379",
    "designEffect": "应对坠落：护身+3；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；通路+1。",
      "intent": "fall"
    },
    "signature": "3096fbad4e7c21204e8d352d0e1987402dd6ed94d4bbf3768a794904eaa97516"
  },
  {
    "id": "card336",
    "name": "扣住栏杆",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。应对坠落：护身+2；脚步+1。",
    "shortText": "迅手（每轮同名限1）。应对坠落：护身+2；脚步+1。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；脚步+1",
    "designId": "BDV2-380",
    "designEffect": "迅手（每轮同名限1）。应对坠落：护身+2；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；脚步+1。",
      "intent": "fall"
    },
    "signature": "e7a73bd58d37d33a6089c372a858cac65a5cd783b2e73e966507d1da34ef6a45"
  },
  {
    "id": "card337",
    "name": "接住坠物",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对坠落：护身+4；失去1心神；抽1牌。",
    "shortText": "应对坠落：护身+4；失去1心神；抽1牌。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+4；失去1心神；抽1牌",
    "designId": "BDV2-381",
    "designEffect": "应对坠落：护身+4；失去1心神；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "hurt",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；失去1心神；抽1牌。",
      "intent": "fall"
    },
    "signature": "5310551734f73f764153c10e269c05d0154f2f418046806a7a441f58de3dbc04"
  },
  {
    "id": "card338",
    "name": "拉回绳端",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "应对坠落：解1道束缚；脚步+2。",
    "shortText": "应对坠落：解1道束缚；脚步+2。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "解1道束缚；脚步+2",
    "designId": "BDV2-382",
    "designEffect": "应对坠落：解1道束缚；脚步+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "route",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；脚步+2。",
      "intent": "fall"
    },
    "signature": "36c58be6c51c6d4aaeff3defdfb98773ff11b3f9823e48ede319071adcc5cc1d"
  },
  {
    "id": "card339",
    "name": "垫住滚石",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对坠落：护身+4；保留护身+2。",
    "shortText": "应对坠落：护身+4；保留护身+2。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+4；保留护身+2",
    "designId": "BDV2-383",
    "designEffect": "应对坠落：护身+4；保留护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；保留护身+2。",
      "intent": "fall"
    },
    "signature": "2a5d93d11d723534535f3b474a971efd93640ebcf1497cd02cd531a16594c704"
  },
  {
    "id": "card340",
    "name": "咬住布巾",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。护身+2；消除1疲劳；失去1心神。",
    "shortText": "迅手（每轮同名限1）。护身+2；消除1疲劳；失去1心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；消除1疲劳；失去1心神",
    "designId": "BDV2-384",
    "designEffect": "迅手（每轮同名限1）。护身+2；消除1疲劳；失去1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "hurt",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；消除1疲劳；失去1心神。",
      "intent": null
    },
    "signature": "89354047a6a7ee03d37a048d97472d839495adeac867d0091c52747788cbf3ff"
  },
  {
    "id": "card341",
    "name": "卷毡垫脚",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 19,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成19场后习得",
    "sourceScene": "c2s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；通路+1；保留护身+1。",
    "shortText": "护身+2；通路+1；保留护身+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；通路+1；保留护身+1",
    "designId": "BDV2-385",
    "designEffect": "护身+2；通路+1；保留护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；通路+1；保留护身+1。",
      "intent": null
    },
    "signature": "effd69220e995c7c6619b2a8428935d78a892a807887a15efd15b5e7f6fc115c"
  },
  {
    "id": "card342",
    "name": "按倒横杆",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "压制目标3；护身+1；解1道束缚。",
    "shortText": "压制目标3；护身+1；解1道束缚。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "压制目标3；护身+1；解1道束缚",
    "designId": "BDV2-386",
    "designEffect": "压制目标3；护身+1；解1道束缚。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；护身+1；解1道束缚。",
      "intent": null
    },
    "signature": "bb33b458cc6aac87f1f93011b9bf9844e5110d7d403aea753c41ff6f2b700997"
  },
  {
    "id": "card343",
    "name": "拂去脸上灰土",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。消除1疲劳；抽1牌；挡住反光。",
    "shortText": "迅手（每轮同名限1）。消除1疲劳；抽1牌；挡住反光。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "消除1疲劳；抽1牌；挡住反光",
    "designId": "BDV2-387",
    "designEffect": "迅手（每轮同名限1）。消除1疲劳；抽1牌；挡住反光。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "消除1疲劳；抽1牌；挡住反光。",
      "intent": null
    },
    "signature": "e71fcd49f61fb5f646be13a376becc11d2900aca964d5a8212ca78cd7e247017"
  },
  {
    "id": "card344",
    "name": "撬开堵塞的窗",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；通路+1；解1道束缚。",
    "shortText": "压制目标2；通路+1；解1道束缚。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "压制目标2；通路+1；解1道束缚",
    "designId": "BDV2-388",
    "designEffect": "压制目标2；通路+1；解1道束缚。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；通路+1；解1道束缚。",
      "intent": null
    },
    "signature": "180a8188d90c6862a7f0593418778bc10f18291ceb57fbe7bbd2a7f292600c23"
  },
  {
    "id": "card345",
    "name": "捞住落水者",
    "cost": 2,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "应对水险：解1道束缚；护身+4；回复1心神。",
    "shortText": "应对水险：解1道束缚；护身+4；回复1心神。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "解1道束缚；护身+4；回复1心神",
    "designId": "BDV2-389",
    "designEffect": "应对水险：解1道束缚；护身+4；回复1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解1道束缚；护身+4；回复1心神。",
      "intent": "water"
    },
    "signature": "56bd52a1f5c760e223168233694173439d172f7488c71fc93c82ec3a0d87aaae"
  },
  {
    "id": "card346",
    "name": "抓牢船沿",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对水险：护身+3；脚步+1。",
    "shortText": "应对水险：护身+3；脚步+1。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+3；脚步+1",
    "designId": "BDV2-390",
    "designEffect": "应对水险：护身+3；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；脚步+1。",
      "intent": "water"
    },
    "signature": "f457f3a24904f85245c0ec3a9635280f79f1c8533efdf90aed189fbe2e3c9739"
  },
  {
    "id": "card347",
    "name": "提起湿书袋",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对水险：干燥准备+1；专注+1。",
    "shortText": "应对水险：干燥准备+1；专注+1。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "干燥准备+1；专注+1",
    "designId": "BDV2-391",
    "designEffect": "应对水险：干燥准备+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "dry",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "干燥准备+1；专注+1。",
      "intent": "water"
    },
    "signature": "5366a2a1acbf2321eee6739dc715f673d3393273501c52edd777c8722d93534f"
  },
  {
    "id": "card348",
    "name": "掀起油布",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。应对水险：保留护身+2；抽1牌。",
    "shortText": "迅手（每轮同名限1）。应对水险：保留护身+2；抽1牌。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "保留护身+2；抽1牌",
    "designId": "BDV2-392",
    "designEffect": "迅手（每轮同名限1）。应对水险：保留护身+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "保留护身+2；抽1牌。",
      "intent": "water"
    },
    "signature": "e9fd3befac6fd70ade23fd01ae3d085552d976cbbb19e291a2f0e24d31dc809a"
  },
  {
    "id": "card349",
    "name": "撑开渡船",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对水险：护身+2；通路+2。",
    "shortText": "应对水险：护身+2；通路+2。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；通路+2",
    "designId": "BDV2-393",
    "designEffect": "应对水险：护身+2；通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；通路+2。",
      "intent": "water"
    },
    "signature": "9901b40d0f95ea4b87b02b361ad05b90932a22bdcb322d8c3c120bb6ad430441"
  },
  {
    "id": "card350",
    "name": "按住飞页",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "迅手（每轮同名限1）。应对散页：专注+2。",
    "shortText": "迅手（每轮同名限1）。应对散页：专注+2。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "专注+2",
    "designId": "BDV2-394",
    "designEffect": "迅手（每轮同名限1）。应对散页：专注+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+2。",
      "intent": "scatter"
    },
    "signature": "2fbc8ef644a717cbf9f040bcd9fcc595c181f8162765f263f61f15016d725194"
  },
  {
    "id": "card351",
    "name": "接牢册匣",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对散页：调查+1；护身+2。",
    "shortText": "应对散页：调查+1；护身+2。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "调查+1；护身+2",
    "designId": "BDV2-395",
    "designEffect": "应对散页：调查+1；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；护身+2。",
      "intent": "scatter"
    },
    "signature": "b3531b2d6053c2426405265718b508e6476f2d02acb6be13628f8832ed8a823c"
  },
  {
    "id": "card352",
    "name": "把散页夹回",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对散页：取回弃牌顶首张技能；专注+1。",
    "shortText": "应对散页：取回弃牌顶首张技能；专注+1。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "取回弃牌顶首张技能；专注+1",
    "designId": "BDV2-396",
    "designEffect": "应对散页：取回弃牌顶首张技能；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "recycle",
          "value": "skill"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "取回弃牌顶首张技能；专注+1。",
      "intent": "scatter"
    },
    "signature": "49cf1c6504879788e91a15a7214d5dd8aa167716e8b1faac22b47b0ecfb3a84a"
  },
  {
    "id": "card353",
    "name": "掩上箱盖",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对散页：保留护身+2；调查+1。",
    "shortText": "应对散页：保留护身+2；调查+1。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "保留护身+2；调查+1",
    "designId": "BDV2-397",
    "designEffect": "应对散页：保留护身+2；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "保留护身+2；调查+1。",
      "intent": "scatter"
    },
    "signature": "7cfa91e30da8b4fae6dac5bd155c9f49417693e475ce0b4327b965cc9700c763"
  },
  {
    "id": "card354",
    "name": "护着原件走",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 临危应对 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对散页：通路+1；调查+1。",
    "shortText": "应对散页：通路+1；调查+1。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "通路+1；调查+1",
    "designId": "BDV2-398",
    "designEffect": "应对散页：通路+1；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+1；调查+1。",
      "intent": "scatter"
    },
    "signature": "eab7301f00555beba7a09e808ee67ce4f7257ac2f0cfb3cc6586db9db95e8e2e"
  },
  {
    "id": "card355",
    "name": "遮住强光",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。应对反光：专注+1；护身+1。",
    "shortText": "迅手（每轮同名限1）。应对反光：专注+1；护身+1。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "专注+1；护身+1",
    "designId": "BDV2-399",
    "designEffect": "迅手（每轮同名限1）。应对反光：专注+1；护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；护身+1。",
      "intent": "glare"
    },
    "signature": "bf6a2a0642038e2bab15b0c3521df5d4f133b735cfa866da6b6fab8ab0c3e9cf"
  },
  {
    "id": "card356",
    "name": "吹灭晃灯",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。应对反光：目标压力−1；抽1牌。",
    "shortText": "迅手（每轮同名限1）。应对反光：目标压力−1；抽1牌。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "目标压力−1；抽1牌",
    "designId": "BDV2-400",
    "designEffect": "迅手（每轮同名限1）。应对反光：目标压力−1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；抽1牌。",
      "intent": "glare"
    },
    "signature": "f8976a74966e654238e7cc132a771b320efb87f5f6d1d017cd93205fed3f147c"
  },
  {
    "id": "card357",
    "name": "把灯接稳",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对反光：调查+1；脚步+1。",
    "shortText": "应对反光：调查+1；脚步+1。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "调查+1；脚步+1",
    "designId": "BDV2-401",
    "designEffect": "应对反光：调查+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；脚步+1。",
      "intent": "glare"
    },
    "signature": "541ba15ad144eca673ddb8d322279ea9c1417d5db4b791026fd6f0eef0bf41af"
  },
  {
    "id": "card358",
    "name": "移开镜片",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对反光：目标破绽+1；调查+1。",
    "shortText": "应对反光：目标破绽+1；调查+1。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "目标破绽+1；调查+1",
    "designId": "BDV2-402",
    "designEffect": "应对反光：目标破绽+1；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 1
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标破绽+1；调查+1。",
      "intent": "glare"
    },
    "signature": "3535a5e604738cfc854d026e7fce761fdacd41e02c8bea71981d220ebbcd2723"
  },
  {
    "id": "card359",
    "name": "转身避光",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。应对反光：脚步+1；下轮费用+1。",
    "shortText": "迅手（每轮同名限1）。应对反光：脚步+1；下轮费用+1。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "脚步+1；下轮费用+1",
    "designId": "BDV2-403",
    "designEffect": "迅手（每轮同名限1）。应对反光：脚步+1；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；下轮费用+1。",
      "intent": "glare"
    },
    "signature": "9018d497a093cf863425a6941121ff8c5d1133fe0359167524c503cbb21fc4bb"
  },
  {
    "id": "card360",
    "name": "等一下再说",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。应对插话：信任+1；抽1牌。",
    "shortText": "迅手（每轮同名限1）。应对插话：信任+1；抽1牌。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "信任+1；抽1牌",
    "designId": "BDV2-404",
    "designEffect": "迅手（每轮同名限1）。应对插话：信任+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；抽1牌。",
      "intent": "interrupt"
    },
    "signature": "f743ba87626cbb407fbba8783258db09314ab940679b76a8b960e69bc802915c"
  },
  {
    "id": "card361",
    "name": "叫停代答",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对插话：交涉+2；目标压力−1。",
    "shortText": "应对插话：交涉+2；目标压力−1。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "交涉+2；目标压力−1",
    "designId": "BDV2-405",
    "designEffect": "应对插话：交涉+2；目标压力−1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 2
        },
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+2；目标压力−1。",
      "intent": "interrupt"
    },
    "signature": "c8549bffec475dfa75852d3cce13dbbbe34c78b1b8591bfc85204079f74ee1aa"
  },
  {
    "id": "card362",
    "name": "隔开吵闹者",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对插话：护身+2；交涉+1。",
    "shortText": "应对插话：护身+2；交涉+1。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+2；交涉+1",
    "designId": "BDV2-406",
    "designEffect": "应对插话：护身+2；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；交涉+1。",
      "intent": "interrupt"
    },
    "signature": "72d4563eebcf5b9f9aa9d7a63be21da0f5851e0910dcf227e879a2d2e4587815"
  },
  {
    "id": "card363",
    "name": "请他逐句说",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "应对插话：专注+1；交涉+1。",
    "shortText": "应对插话：专注+1；交涉+1。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "专注+1；交涉+1",
    "designId": "BDV2-407",
    "designEffect": "应对插话：专注+1；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+1；交涉+1。",
      "intent": "interrupt"
    },
    "signature": "c664c3e51d7dad43c3946888fd2f6e9fc11420dfb8489882e31d5c20c2f4f14d"
  },
  {
    "id": "card364",
    "name": "接回话题",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 临危应对 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。应对插话：交涉+1；下轮费用+1。",
    "shortText": "迅手（每轮同名限1）。应对插话：交涉+1；下轮费用+1。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "交涉+1；下轮费用+1",
    "designId": "BDV2-408",
    "designEffect": "迅手（每轮同名限1）。应对插话：交涉+1；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；下轮费用+1。",
      "intent": "interrupt"
    },
    "signature": "319a59a7c80aef810cabf42f09448003f70ea2f940f86cd9d29ed3499563e9b7"
  },
  {
    "id": "card365",
    "name": "不用现在决定",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。应对催逼：消除1疲劳；抽1牌。",
    "shortText": "迅手（每轮同名限1）。应对催逼：消除1疲劳；抽1牌。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "消除1疲劳；抽1牌",
    "designId": "BDV2-409",
    "designEffect": "迅手（每轮同名限1）。应对催逼：消除1疲劳；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "消除1疲劳；抽1牌。",
      "intent": "urge"
    },
    "signature": "d16c9d08db54ea651fc43ddcbdb2e9d63ec2a9fd0ebd1608441bba6b17d8c41e"
  },
  {
    "id": "card366",
    "name": "先给口水",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。应对催逼：回复2心神；信任+1。",
    "shortText": "迅手（每轮同名限1）。应对催逼：回复2心神；信任+1。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "回复2心神；信任+1",
    "designId": "BDV2-410",
    "designEffect": "迅手（每轮同名限1）。应对催逼：回复2心神；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复2心神；信任+1。",
      "intent": "urge"
    },
    "signature": "295513cb299f54f95dd6848ac350818b8043dc438c0bc848cb6bbba71438cab4"
  },
  {
    "id": "card367",
    "name": "制止围逼",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对催逼：所有威胁压力−1；信任+1。",
    "shortText": "应对催逼：所有威胁压力−1；信任+1。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "所有威胁压力−1；信任+1",
    "designId": "BDV2-411",
    "designEffect": "应对催逼：所有威胁压力−1；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weakenAll",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "所有威胁压力−1；信任+1。",
      "intent": "urge"
    },
    "signature": "a13a31b5ca6624a704fe42cb324138b254bd1cf3e37079bc205bc23e1134afac"
  },
  {
    "id": "card368",
    "name": "把门关住",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对催逼：护身+4；交涉+1。",
    "shortText": "应对催逼：护身+4；交涉+1。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "护身+4；交涉+1",
    "designId": "BDV2-412",
    "designEffect": "应对催逼：护身+4；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；交涉+1。",
      "intent": "urge"
    },
    "signature": "cea85035698dfc393dd35d17ebe453d57473079b28463ec0d41e8ffe30244815"
  },
  {
    "id": "card369",
    "name": "留出喘息",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 临危应对 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "应对催逼：回复3心神；下轮费用+1。",
    "shortText": "应对催逼：回复3心神；下轮费用+1。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "临危应对",
    "buildRole": "回复3心神；下轮费用+1",
    "designId": "BDV2-413",
    "designEffect": "应对催逼：回复3心神；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 3
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复3心神；下轮费用+1。",
      "intent": "urge"
    },
    "signature": "2b612fb6a618f60893412ad4850537ffc7726fd658fbffd244a72482f41a602c"
  },
  {
    "id": "card370",
    "name": "捕索双环",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "每轮一次，1费：打断目标本轮攻击；脚步+1。共4次。",
    "shortText": "每轮一次，1费：打断目标本轮攻击；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "打断目标本轮攻击；脚步+1",
    "designId": "BDV2-414",
    "designEffect": "每轮一次，1费：打断目标本轮攻击；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "打断目标本轮攻击；脚步+1。",
      "intent": null
    },
    "signature": "c3a2f031dfdf0f0108954e7459d0c1624b6d8cc3b4c9a9721af72ee19f2af99e"
  },
  {
    "id": "card371",
    "name": "弧形木盾",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：护身+2。每轮首次挡住压力后：压制目标1；保留护身+1。共4次。",
    "shortText": "入场：护身+2。每轮首次挡住压力后：压制目标1；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "压制目标1；保留护身+1",
    "designId": "BDV2-415",
    "designEffect": "入场：护身+2。每轮首次挡住压力后：压制目标1；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "压制目标1；保留护身+1。",
      "intent": null
    },
    "signature": "fb8a49181388d9f7c02d5e6f3027e0ec731d979059d2f9668970402e0c251bc1"
  },
  {
    "id": "card372",
    "name": "长柄雨伞",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-water",
    "text": "入场：挡住水险。每轮首次应对成功后：压制目标1；护身+1。共4次。",
    "shortText": "入场：挡住水险。每轮首次应对成功后：压制目标1；护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "压制目标1；护身+1",
    "designId": "BDV2-416",
    "designEffect": "入场：挡住水险。每轮首次应对成功后：压制目标1；护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "压制目标1；护身+1。",
      "intent": null
    },
    "signature": "737bdd5002ad391d78b8316892191743da995be4cfca6bd960dfb0dc5d4738fa"
  },
  {
    "id": "card373",
    "name": "皮面书夹",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 37,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成37场后习得",
    "sourceScene": "c3s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：挡住散页。每轮首次调查行动后：抽取1张技能。共4次。",
    "shortText": "入场：挡住散页。每轮首次调查行动后：抽取1张技能。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "抽取1张技能",
    "designId": "BDV2-417",
    "designEffect": "入场：挡住散页。每轮首次调查行动后：抽取1张技能。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "drawMode",
          "value": "skill"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "抽取1张技能。",
      "intent": null
    },
    "signature": "75ba146b2b4c81f9c9f6bae2b5e5dc334d546a16c134cae03a2c38449044eaad"
  },
  {
    "id": "card374",
    "name": "酒精棉包",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 巧器与消耗品 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "入场：处理1级轻伤。每轮一次，1费：回复2心神；消除1疲劳。共4次。",
    "shortText": "入场：处理1级轻伤。每轮一次，1费：回复2心神；消除1疲劳。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "回复2心神；消除1疲劳",
    "designId": "BDV2-418",
    "designEffect": "入场：处理1级轻伤。每轮一次，1费：回复2心神；消除1疲劳。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "care",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "回复2心神；消除1疲劳。",
      "intent": null
    },
    "signature": "4aff7baae6840e50ca59ab64273938bc8f78986c53f96437152a9e38d8bebd35"
  },
  {
    "id": "card375",
    "name": "加厚救援毯",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "入场：护身+2。每轮首次应对成功后：护身+3。共4次。",
    "shortText": "入场：护身+2。每轮首次应对成功后：护身+3。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "护身+3",
    "designId": "BDV2-419",
    "designEffect": "入场：护身+2。每轮首次应对成功后：护身+3。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+3。",
      "intent": null
    },
    "signature": "2ceba16419a03d99c2e56b966eff0d0288f7a9ece9455a8a7e8855750074f005"
  },
  {
    "id": "card376",
    "name": "备用麻布",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+1。每轮首次回复心神后：保留护身+2。共4次。",
    "shortText": "入场：护身+1。每轮首次回复心神后：保留护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "保留护身+2",
    "designId": "BDV2-420",
    "designEffect": "入场：护身+1。每轮首次回复心神后：保留护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+2。",
      "intent": null
    },
    "signature": "9d699dd3d963d098752ed4baba985bf6e1209241f0e640f640d2cf1ed9d34063"
  },
  {
    "id": "card377",
    "name": "细口油壶",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 39,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成39场后习得",
    "sourceScene": "c3s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次通路行动后：通路+1；挡住催逼。共4次。",
    "shortText": "入场：脚步+1。每轮首次通路行动后：通路+1；挡住催逼。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "通路+1；挡住催逼",
    "designId": "BDV2-421",
    "designEffect": "入场：脚步+1。每轮首次通路行动后：通路+1；挡住催逼。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "通路+1；挡住催逼。",
      "intent": null
    },
    "signature": "b7193d386c999c1b549bb78de490ee455de6b263fb0c3bc53fce62e8dfb3d460"
  },
  {
    "id": "card378",
    "name": "粗齿铁锉",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 39,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成39场后习得",
    "sourceScene": "c3s03",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：通路+1。每轮一次，1费：压制目标2；解1道束缚。共4次。",
    "shortText": "入场：通路+1。每轮一次，1费：压制目标2；解1道束缚。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "压制目标2；解1道束缚",
    "designId": "BDV2-422",
    "designEffect": "入场：通路+1。每轮一次，1费：压制目标2；解1道束缚。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "压制目标2；解1道束缚。",
      "intent": null
    },
    "signature": "dd6a01cc2966180a14dfe5830c9efc4c940a452dde58ee22c194dd6be62367ec"
  },
  {
    "id": "card379",
    "name": "平口螺刀",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 40,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成40场后习得",
    "sourceScene": "c3s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：专注+1。每轮首次解救行动后：解1道束缚。共4次。",
    "shortText": "入场：专注+1。每轮首次解救行动后：解1道束缚。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "解1道束缚",
    "designId": "BDV2-423",
    "designEffect": "入场：专注+1。每轮首次解救行动后：解1道束缚。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "解1道束缚。",
      "intent": null
    },
    "signature": "7e7f2fa8d1eb7e22e7837f3cccab3d0b27ffb1687ba31b31d06b102ae23393a9"
  },
  {
    "id": "card380",
    "name": "折叠踏脚",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 40,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成40场后习得",
    "sourceScene": "c3s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+1。每轮首次通路行动后：通路+1；保留护身+1。共4次。",
    "shortText": "入场：护身+1。每轮首次通路行动后：通路+1；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "通路+1；保留护身+1",
    "designId": "BDV2-424",
    "designEffect": "入场：护身+1。每轮首次通路行动后：通路+1；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "通路+1；保留护身+1。",
      "intent": null
    },
    "signature": "9d76227e894a55d873461946ddb1eeb0c0481f533c04d43c28b3c6f81bd95b96"
  },
  {
    "id": "card381",
    "name": "带扣救援带",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：解1道束缚。每轮首次解救行动后：护身+2；脚步+1。共4次。",
    "shortText": "入场：解1道束缚。每轮首次解救行动后：护身+2；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "护身+2；脚步+1",
    "designId": "BDV2-425",
    "designEffect": "入场：解1道束缚。每轮首次解救行动后：护身+2；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+2；脚步+1。",
      "intent": null
    },
    "signature": "76bff14dd7d9ba0bc732e28f27a5be8c80d734a357a63394b3b9c7f8729940a0"
  },
  {
    "id": "card382",
    "name": "结实扁担",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 41,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成41场后习得",
    "sourceScene": "c3s05",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+2。每轮首次协作者入场后：通路+1；护身+2。共4次。",
    "shortText": "入场：护身+2。每轮首次协作者入场后：通路+1；护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "通路+1；护身+2",
    "designId": "BDV2-426",
    "designEffect": "入场：护身+2。每轮首次协作者入场后：通路+1；护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_person",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "通路+1；护身+2。",
      "intent": null
    },
    "signature": "bb82e665c5ff6c7fefd92d8e01d57853616e453bdfba3b7c3dc0e2ac88f326cd"
  },
  {
    "id": "card383",
    "name": "木轮运物车",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次部署装备后：通路+2。共4次。",
    "shortText": "入场：脚步+1。每轮首次部署装备后：通路+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "通路+2",
    "designId": "BDV2-427",
    "designEffect": "入场：脚步+1。每轮首次部署装备后：通路+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "通路+2。",
      "intent": null
    },
    "signature": "b6f89d1e3590f89086222d3334fd432774225bff9ed306e34cca7831d5d6b094"
  },
  {
    "id": "card384",
    "name": "绑腿布",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次回合开始：消除1疲劳。共4次。",
    "shortText": "入场：脚步+1。每轮首次回合开始：消除1疲劳。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "消除1疲劳",
    "designId": "BDV2-428",
    "designEffect": "入场：脚步+1。每轮首次回合开始：消除1疲劳。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "消除1疲劳。",
      "intent": null
    },
    "signature": "11e8c0791702b6d817ba8cb21d058a43390bc551ba43f9837978167d74b815cd"
  },
  {
    "id": "card385",
    "name": "厚掌搬运手套",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+2。每轮首次防护行动后：保留护身+2。共4次。",
    "shortText": "入场：护身+2。每轮首次防护行动后：保留护身+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "保留护身+2",
    "designId": "BDV2-429",
    "designEffect": "入场：护身+2。每轮首次防护行动后：保留护身+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_guard",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+2。",
      "intent": null
    },
    "signature": "15968a8592e913af201edbfbefbb1b9d207947d6c24f7ed441c4563f086ab9d1"
  },
  {
    "id": "card386",
    "name": "铜质指北针",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-medicine",
    "text": "入场：脚步+1。每轮首次进入下一幕：脚步+1；专注+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次进入下一幕：脚步+1；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "脚步+1；专注+1",
    "designId": "BDV2-430",
    "designEffect": "入场：脚步+1。每轮首次进入下一幕：脚步+1；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "脚步+1；专注+1。",
      "intent": null
    },
    "signature": "d373aab84c7330abe0c5638a5cb83d23ecba52fea77870fe0053a1620237147c"
  },
  {
    "id": "card387",
    "name": "卷边旧地图",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-map",
    "text": "入场：抽1牌。每轮首次通路行动后：若有专注，通路+1。共4次。",
    "shortText": "入场：抽1牌。每轮首次通路行动后：若有专注，通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "若有专注，通路+1",
    "designId": "BDV2-431",
    "designEffect": "入场：抽1牌。每轮首次通路行动后：若有专注，通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "focus1",
          "effects": [
            {
              "op": "leverage",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若有专注，通路+1。",
      "intent": null
    },
    "signature": "a8ce73911eacd7452d2fdbe7f06bd344b8b5ed2f86857a71ef47b49fb7d3c1c2"
  },
  {
    "id": "card388",
    "name": "双面路线牌",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：下幕准备+1。每轮首次通路行动后：若有协作者，脚步+2。共4次。",
    "shortText": "入场：下幕准备+1。每轮首次通路行动后：若有协作者，脚步+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "若有协作者，脚步+2",
    "designId": "BDV2-432",
    "designEffect": "入场：下幕准备+1。每轮首次通路行动后：若有协作者，脚步+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "route",
              "n": 2
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若有协作者，脚步+2。",
      "intent": null
    },
    "signature": "cd3b5e16344797d71e0ea5ef081eaddd8a2916f83a72b344257aebc8b7333812"
  },
  {
    "id": "card389",
    "name": "窄口探灯",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 巧器与消耗品 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住反光。每轮首次调查行动后：目标破绽+1。共4次。",
    "shortText": "入场：挡住反光。每轮首次调查行动后：目标破绽+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "目标破绽+1",
    "designId": "BDV2-433",
    "designEffect": "入场：挡住反光。每轮首次调查行动后：目标破绽+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "目标破绽+1。",
      "intent": null
    },
    "signature": "48996f02e94eebebf25b8753d6ef9415a56b4f8dae3fb283f14010a45a70ae15"
  },
  {
    "id": "card390",
    "name": "强光手电",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 巧器与消耗品 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住反光。每轮一次，1费：打断目标本轮攻击；专注+1。共4次。",
    "shortText": "入场：挡住反光。每轮一次，1费：打断目标本轮攻击；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "打断目标本轮攻击；专注+1",
    "designId": "BDV2-434",
    "designEffect": "入场：挡住反光。每轮一次，1费：打断目标本轮攻击；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "打断目标本轮攻击；专注+1。",
      "intent": null
    },
    "signature": "683f082a27d9b554e97a55f600caf78343f918e2dceb3cd574170fa20fc8a5ed"
  },
  {
    "id": "card391",
    "name": "红罩信号灯",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：脚步+1。每轮首次应对成功后：信任+1；下轮费用+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次应对成功后：信任+1；下轮费用+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "信任+1；下轮费用+1",
    "designId": "BDV2-435",
    "designEffect": "入场：脚步+1。每轮首次应对成功后：信任+1；下轮费用+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "信任+1；下轮费用+1。",
      "intent": null
    },
    "signature": "f902048a340c03cb0a479b7977dbd29088b39caa7d65b25ce073a2c3f3998ac0"
  },
  {
    "id": "card392",
    "name": "可折反光片",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "每轮一次，1费：目标破绽+2。共4次。",
    "shortText": "每轮一次，1费：目标破绽+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "目标破绽+2",
    "designId": "BDV2-436",
    "designEffect": "每轮一次，1费：目标破绽+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 2
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "目标破绽+2。",
      "intent": null
    },
    "signature": "11428c3fa780c1a3ca269e7a1696326a33cbb152b32c9f391a00127e19681d7f"
  },
  {
    "id": "card393",
    "name": "灯芯剪",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 巧器与消耗品 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：挡住反光。每轮首次部署装备后：解1道束缚；专注+1。共4次。",
    "shortText": "入场：挡住反光。每轮首次部署装备后：解1道束缚；专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "解1道束缚；专注+1",
    "designId": "BDV2-437",
    "designEffect": "入场：挡住反光。每轮首次部署装备后：解1道束缚；专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "解1道束缚；专注+1。",
      "intent": null
    },
    "signature": "966a5b96c0587d1f9b519f4558278b6361331ade105a9fdc162689fdebd5e5ed"
  },
  {
    "id": "card394",
    "name": "夜行磷石",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 巧器与消耗品 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：脚步+1。每轮首次进入下一幕：挡住反光；通路+1。共4次。",
    "shortText": "入场：脚步+1。每轮首次进入下一幕：挡住反光；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "挡住反光；通路+1",
    "designId": "BDV2-438",
    "designEffect": "入场：脚步+1。每轮首次进入下一幕：挡住反光；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "glare"
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "挡住反光；通路+1。",
      "intent": null
    },
    "signature": "77060cc9006b92671b7945f8dc7cf2d4940bb35862f5585d43bf656a3a3ff14c"
  },
  {
    "id": "card395",
    "name": "便携听音筒",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：专注+1。每轮首次交涉行动后：专注+1；若专注至少2，调查+1。共4次。",
    "shortText": "入场：专注+1。每轮首次交涉行动后：专注+1；若专注至少2，调查+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "专注+1；若专注至少2，调查+1",
    "designId": "BDV2-439",
    "designEffect": "入场：专注+1。每轮首次交涉行动后：专注+1；若专注至少2，调查+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "if",
          "condition": "focus2",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；若专注至少2，调查+1。",
      "intent": null
    },
    "signature": "e68f992badceaf9f4d2bc3ff5fd198459884d6d2de46120a8e60fd988cc49745"
  },
  {
    "id": "card396",
    "name": "软毛清灰刷",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住散页。每轮首次调查行动后：调查+1；弃最右1牌。共4次。",
    "shortText": "入场：挡住散页。每轮首次调查行动后：调查+1；弃最右1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "调查+1；弃最右1牌",
    "designId": "BDV2-440",
    "designEffect": "入场：挡住散页。每轮首次调查行动后：调查+1；弃最右1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；弃最右1牌。",
      "intent": null
    },
    "signature": "64659534cd7d51cb6b28118430d1413a8bb8b76968a3ee14ede6344d8e9ec04e"
  },
  {
    "id": "card397",
    "name": "细齿镊子",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：调查+1。每轮首次调查行动后：专注+1；保留护身+1。共4次。",
    "shortText": "入场：调查+1。每轮首次调查行动后：专注+1；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "专注+1；保留护身+1",
    "designId": "BDV2-441",
    "designEffect": "入场：调查+1。每轮首次调查行动后：专注+1；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；保留护身+1。",
      "intent": null
    },
    "signature": "2638652795b5aa2ed4eacc28d37734bad2826e7f30d3ccff918bdc2ceacceba5"
  },
  {
    "id": "card398",
    "name": "刻度取样瓶",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-measuring",
    "text": "入场：挡住水险。每轮首次调查行动后：专注+1；挡住水险。共4次。",
    "shortText": "入场：挡住水险。每轮首次调查行动后：专注+1；挡住水险。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "专注+1；挡住水险",
    "designId": "BDV2-442",
    "designEffect": "入场：挡住水险。每轮首次调查行动后：专注+1；挡住水险。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；挡住水险。",
      "intent": null
    },
    "signature": "68476a21b78f2fd0eebfe580a0ee6b09c60450b2a3a4834dbd91ed68d7dc2de1"
  },
  {
    "id": "card399",
    "name": "黑绒比色板",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 50,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成50场后习得",
    "sourceScene": "c3s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：专注+1。每轮首次调查行动后：若另有一件装备，调查+1。共4次。",
    "shortText": "入场：专注+1。每轮首次调查行动后：若另有一件装备，调查+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "若另有一件装备，调查+1",
    "designId": "BDV2-443",
    "designEffect": "入场：专注+1。每轮首次调查行动后：若另有一件装备，调查+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "otherEquipped",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若另有一件装备，调查+1。",
      "intent": null
    },
    "signature": "5794a96a08ec4bf2c9ae5f7315805d78cd81f584d42c88420f3fd6948cb6734d"
  },
  {
    "id": "card400",
    "name": "白瓷检视盘",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 50,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成50场后习得",
    "sourceScene": "c3s14",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-magnifier",
    "text": "入场：抽1牌。每轮首次调查行动后：挡住散页；下幕准备+1。共4次。",
    "shortText": "入场：抽1牌。每轮首次调查行动后：挡住散页；下幕准备+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "挡住散页；下幕准备+1",
    "designId": "BDV2-444",
    "designEffect": "入场：抽1牌。每轮首次调查行动后：挡住散页；下幕准备+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "scatter"
        },
        {
          "op": "nextProgress",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "挡住散页；下幕准备+1。",
      "intent": null
    },
    "signature": "fdf73ed56420d31434362b5e13d9646c0c490b3438c071d6064420fa9907121f"
  },
  {
    "id": "card401",
    "name": "活页索引夹",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：专注+1。每轮首次抽牌后：若手牌不超过2张，专注+2。共4次。",
    "shortText": "入场：专注+1。每轮首次抽牌后：若手牌不超过2张，专注+2。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "若手牌不超过2张，专注+2",
    "designId": "BDV2-445",
    "designEffect": "入场：专注+1。每轮首次抽牌后：若手牌不超过2张，专注+2。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "draw",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "hand2",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若手牌不超过2张，专注+2。",
      "intent": null
    },
    "signature": "a0a93a000c840fda0ca1182fb1f800565192a0caaff4076e4c65af8bcfb79525"
  },
  {
    "id": "card402",
    "name": "号码木签",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：专注+1。每轮首次布置后：调查+1；挡住散页。共4次。",
    "shortText": "入场：专注+1。每轮首次布置后：调查+1；挡住散页。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "调查+1；挡住散页",
    "designId": "BDV2-446",
    "designEffect": "入场：专注+1。每轮首次布置后：调查+1；挡住散页。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_setup",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；挡住散页。",
      "intent": null
    },
    "signature": "30cb7287d23c8c639bfe945ff1a243af4900b6dc1d706da1af60ce29c84c63d8"
  },
  {
    "id": "card403",
    "name": "软蜡封条",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 52,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成52场后习得",
    "sourceScene": "c3s16",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-lantern",
    "text": "入场：保留护身+1。每轮首次进入下一幕：挡住散页；保留护身+1。共4次。",
    "shortText": "入场：保留护身+1。每轮首次进入下一幕：挡住散页；保留护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "挡住散页；保留护身+1",
    "designId": "BDV2-447",
    "designEffect": "入场：保留护身+1。每轮首次进入下一幕：挡住散页；保留护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "retain",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "scatter"
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "挡住散页；保留护身+1。",
      "intent": null
    },
    "signature": "9c35bc4eb831728c43653241336e15240b76425888c86702fe99241a153a820a"
  },
  {
    "id": "card404",
    "name": "细格摹图纸",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 52,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成52场后习得",
    "sourceScene": "c3s16",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-notebook",
    "text": "入场：专注+1。每轮首次通路行动后：调查+1；抽1牌；弃最右1牌。共4次。",
    "shortText": "入场：专注+1。每轮首次通路行动后：调查+1；抽1牌；弃最右1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "调查+1；抽1牌；弃最右1牌",
    "designId": "BDV2-448",
    "designEffect": "入场：专注+1。每轮首次通路行动后：调查+1；抽1牌；弃最右1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1；抽1牌；弃最右1牌。",
      "intent": null
    },
    "signature": "1a889ca3b20c8d3de8cbc744a165ea61fc123a3a5502086db45bef65baa46704"
  },
  {
    "id": "card405",
    "name": "铜扣账夹",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 53,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成53场后习得",
    "sourceScene": "c3s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住散页。每轮首次交涉行动后：调查+1。共4次。",
    "shortText": "入场：挡住散页。每轮首次交涉行动后：调查+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "调查+1",
    "designId": "BDV2-449",
    "designEffect": "入场：挡住散页。每轮首次交涉行动后：调查+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1。",
      "intent": null
    },
    "signature": "38270dac88b7158bd6d225fdaf5d6df7b170e4f8841e57d765057a18861c41eb"
  },
  {
    "id": "card406",
    "name": "折角检索卡",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 53,
    "sourceCase": 3,
    "source": "北段V2 · 巧器与消耗品 · 完成53场后习得",
    "sourceScene": "c3s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：专注+1。每轮首次打出技能后：若手牌不超过2张，专注+1。共4次。",
    "shortText": "入场：专注+1。每轮首次打出技能后：若手牌不超过2张，专注+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "若手牌不超过2张，专注+1",
    "designId": "BDV2-450",
    "designEffect": "入场：专注+1。每轮首次打出技能后：若手牌不超过2张，专注+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "skill",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "hand2",
          "effects": [
            {
              "op": "focus",
              "n": 1
            }
          ]
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "若手牌不超过2张，专注+1。",
      "intent": null
    },
    "signature": "1a250e20450a5a08e20aa9d10b9d22cf247852ab0fa5d77b21f1c19f547a7941"
  },
  {
    "id": "card407",
    "name": "白棉帘布",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住插话。每轮首次交涉行动后：护身+1；交涉+1。共4次。",
    "shortText": "入场：挡住插话。每轮首次交涉行动后：护身+1；交涉+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "护身+1；交涉+1",
    "designId": "BDV2-451",
    "designEffect": "入场：挡住插话。每轮首次交涉行动后：护身+1；交涉+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "护身+1；交涉+1。",
      "intent": null
    },
    "signature": "5af247831bccec3975bb13f99a1a8c6bd4f973bf3ea1fb83f6fcb06c7a3e9acd"
  },
  {
    "id": "card408",
    "name": "空白信笺",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：信任+1。每轮首次交涉行动后：抽1牌；弃最右1牌。共4次。",
    "shortText": "入场：信任+1。每轮首次交涉行动后：抽1牌；弃最右1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "抽1牌；弃最右1牌",
    "designId": "BDV2-452",
    "designEffect": "入场：信任+1。每轮首次交涉行动后：抽1牌；弃最右1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "抽1牌；弃最右1牌。",
      "intent": null
    },
    "signature": "ecdb6dea8c7d0af26c1d2e1078214221bf52601b4a91b401d7d1eccc31f54a1d"
  },
  {
    "id": "card409",
    "name": "软木止门器",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：通路+1。每轮首次应对成功后：保留护身+2；脚步+1。共4次。",
    "shortText": "入场：通路+1。每轮首次应对成功后：保留护身+2；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "保留护身+2；脚步+1",
    "designId": "BDV2-453",
    "designEffect": "入场：通路+1。每轮首次应对成功后：保留护身+2；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+2；脚步+1。",
      "intent": null
    },
    "signature": "aef808f071ea510d4a5cb8b17fa6df95026e285ef663e59694a31e4ca673ea61"
  },
  {
    "id": "card410",
    "name": "双面告示牌",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-shield",
    "text": "入场：交涉+1。每轮首次防护行动后：目标压力−1。共4次。",
    "shortText": "入场：交涉+1。每轮首次防护行动后：目标压力−1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "目标压力−1",
    "designId": "BDV2-454",
    "designEffect": "入场：交涉+1。每轮首次防护行动后：目标压力−1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_guard",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "courage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "目标压力−1。",
      "intent": null
    },
    "signature": "66e3140750bd7a991b9a1ad4916ac5ed6a516968263a82596caa26f26e9862db"
  },
  {
    "id": "card411",
    "name": "铜壳证物盒",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住抢夺。每轮首次应对成功后：保留护身+3。共4次。",
    "shortText": "入场：挡住抢夺。每轮首次应对成功后：保留护身+3。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "保留护身+3",
    "designId": "BDV2-455",
    "designEffect": "入场：挡住抢夺。每轮首次应对成功后：保留护身+3。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "grab"
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 3
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "保留护身+3。",
      "intent": null
    },
    "signature": "d345d5ac474ad8daba57eaf2f3096d5fdadfb4555beef2111214b81e43a50fdb"
  },
  {
    "id": "card412",
    "name": "便携小铜铃",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "tool-whistle",
    "text": "入场：信任+1。每轮首次协作者入场后：抽1牌。共4次。",
    "shortText": "入场：信任+1。每轮首次协作者入场后：抽1牌。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "抽1牌",
    "designId": "BDV2-456",
    "designEffect": "入场：信任+1。每轮首次协作者入场后：抽1牌。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "deploy_person",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "抽1牌。",
      "intent": null
    },
    "signature": "cd8b04c0bb496debb8b3f29e5713c7242cacbfcaa935600c7677082605911908"
  },
  {
    "id": "card413",
    "name": "带锁文书袋",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：挡住抢夺。每轮首次进入下一幕：抽取1张应对。共4次。",
    "shortText": "入场：挡住抢夺。每轮首次进入下一幕：抽取1张应对。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "抽取1张应对",
    "designId": "BDV2-457",
    "designEffect": "入场：挡住抢夺。每轮首次进入下一幕：抽取1张应对。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "grab"
        }
      ],
      "effects": [
        {
          "op": "drawMode",
          "value": "response"
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "抽取1张应对。",
      "intent": null
    },
    "signature": "964da47b51f7674be8b2a17eff556870b03287f757cd3c602829d0a982643526"
  },
  {
    "id": "card414",
    "name": "木柄橡皮锤",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：目标压力−1。每轮首次压制后：目标破绽+1。共4次。",
    "shortText": "入场：目标压力−1。每轮首次压制后：目标破绽+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "目标破绽+1",
    "designId": "BDV2-458",
    "designEffect": "入场：目标压力−1。每轮首次压制后：目标破绽+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "目标破绽+1。",
      "intent": null
    },
    "signature": "8ebfc6ecacef73557d21cd0871f7878b9db56521cc11b7622186cf4b2e3eb20c"
  },
  {
    "id": "card415",
    "name": "弹性皮索",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：护身+1。每轮一次，1费：压制目标2；脚步+1。共4次。",
    "shortText": "入场：护身+1。每轮一次，1费：压制目标2；脚步+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "压制目标2；脚步+1",
    "designId": "BDV2-459",
    "designEffect": "入场：护身+1。每轮一次，1费：压制目标2；脚步+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "压制目标2；脚步+1。",
      "intent": null
    },
    "signature": "c8f4c7d217222021128d9e088dfb555c9e1685ef33474fc5b5cae031968e6d22"
  },
  {
    "id": "card416",
    "name": "圆边撬片",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：解1道束缚。每轮首次通路行动后：专注+1；通路+1。共4次。",
    "shortText": "入场：解1道束缚。每轮首次通路行动后：专注+1；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "专注+1；通路+1",
    "designId": "BDV2-460",
    "designEffect": "入场：解1道束缚。每轮首次通路行动后：专注+1；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "专注+1；通路+1。",
      "intent": null
    },
    "signature": "0f1983d0085489d437d02f0df5127ea496b8d178184b5aea85be217cd54f9944"
  },
  {
    "id": "card417",
    "name": "短柄铲",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 59,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成59场后习得",
    "sourceScene": "c4s05",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "tool-blade",
    "text": "入场：通路+1。每轮首次压制后：调查+1。共4次。",
    "shortText": "入场：通路+1。每轮首次压制后：调查+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "调查+1",
    "designId": "BDV2-461",
    "designEffect": "入场：通路+1。每轮首次压制后：调查+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "调查+1。",
      "intent": null
    },
    "signature": "92840b617ec679d265f056b5e561bdc3c0d6c5c78f104601bd5c415bab58216e"
  },
  {
    "id": "card418",
    "name": "包布铁钩",
    "cost": 2,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 59,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成59场后习得",
    "sourceScene": "c4s05",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "tool-bag",
    "text": "入场：解1道束缚。每轮一次，1费：压制目标1；通路+1。共4次。",
    "shortText": "入场：解1道束缚。每轮一次，1费：压制目标1；通路+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "压制目标1；通路+1",
    "designId": "BDV2-462",
    "designEffect": "入场：解1道束缚。每轮一次，1费：压制目标1；通路+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "activate",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 1,
      "effectText": "压制目标1；通路+1。",
      "intent": null
    },
    "signature": "44adaa0af8120291b239b3601903c38edf28d8323b6878c3f583e3e82429ee8d"
  },
  {
    "id": "card419",
    "name": "加固背带扣",
    "cost": 1,
    "type": "装备工具",
    "mode": "equipment",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 60,
    "sourceCase": 4,
    "source": "北段V2 · 巧器与消耗品 · 完成60场后习得",
    "sourceScene": "c4s06",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "tool-rope",
    "text": "入场：保留护身+1。每轮首次受伤后：脚步+1；护身+1。共4次。",
    "shortText": "入场：保留护身+1。每轮首次受伤后：脚步+1；护身+1。共4次。",
    "conditions": "最多3件装备",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "巧器与消耗品",
    "buildRole": "脚步+1；护身+1",
    "designId": "BDV2-463",
    "designEffect": "入场：保留护身+1。每轮首次受伤后：脚步+1；护身+1。共4次。",
    "catalogRule": {
      "version": 2,
      "mode": "equipment",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "retain",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 4,
      "activateCost": 0,
      "effectText": "脚步+1；护身+1。",
      "intent": null
    },
    "signature": "dd5ed2506a8b91d77f34f16436d0e413d8ce00bedcf74a28aec626c8a3d7c670"
  },
  {
    "id": "card420",
    "name": "二人合抬",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-rescue",
    "text": "护身+2；若有两名协作者，通路+2、护送伤员离险。",
    "shortText": "护身+2；若有两名协作者，通路+2、护送伤员离险。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "护身+2；若有两名协作者，通路+2、护送伤员离险",
    "designId": "BDV2-464",
    "designEffect": "护身+2；若有两名协作者，通路+2、护送伤员离险。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            },
            {
              "op": "evacuate",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；若有两名协作者，通路+2、护送伤员离险。",
      "intent": null
    },
    "signature": "79e233cc67286eeb056b9f986459ae9f3fed98f56ec33dfe29737bf2421fbe6a"
  },
  {
    "id": "card421",
    "name": "前哨回报",
    "cost": 1,
    "type": "调查技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 42,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成42场后习得",
    "sourceScene": "c3s06",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "抽取1张人物；专注+1。",
    "shortText": "抽取1张人物；专注+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张人物；专注+1",
    "designId": "BDV2-465",
    "designEffect": "抽取1张人物；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "person"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张人物；专注+1。",
      "intent": null
    },
    "signature": "4a60a751c7e0ad7d8bdbfc45b63f590b1b4aa94d1d815906aeb85597de40b49a"
  },
  {
    "id": "card422",
    "name": "递上趁手家伙",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。抽取1张装备；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。抽取1张装备；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张装备；疲劳+1",
    "designId": "BDV2-466",
    "designEffect": "迅手（每轮同名限1）。抽取1张装备；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "equipment"
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张装备；疲劳+1。",
      "intent": null
    },
    "signature": "4893c7ab40b51d5fe87d3daf3e9bcc4d5ec1adb01c898912dc51a2445dece243"
  },
  {
    "id": "card423",
    "name": "按计划行事",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 43,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成43场后习得",
    "sourceScene": "c3s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "下幕准备+1；护身+2。",
    "shortText": "下幕准备+1；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "下幕准备+1；护身+2",
    "designId": "BDV2-467",
    "designEffect": "下幕准备+1；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "nextProgress",
          "n": 1
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "下幕准备+1；护身+2。",
      "intent": null
    },
    "signature": "cd930f15e16cf4a74eb7b856f8ca50aac78622c39204ce49de4a265885c7660f"
  },
  {
    "id": "card424",
    "name": "临时接替",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "重置最近使用的协作者；疲劳+1。",
    "shortText": "重置最近使用的协作者；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "重置最近使用的协作者；疲劳+1",
    "designId": "BDV2-468",
    "designEffect": "重置最近使用的协作者；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "refresh",
          "value": "person"
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "重置最近使用的协作者；疲劳+1。",
      "intent": null
    },
    "signature": "6c51fa4e0b263a47aa14882e354f8b589d68068aa78311455ce7af2c086f8386"
  },
  {
    "id": "card425",
    "name": "换手再来",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 44,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成44场后习得",
    "sourceScene": "c3s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "重置最近使用的装备；弃最右1牌。",
    "shortText": "重置最近使用的装备；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "重置最近使用的装备；弃最右1牌",
    "designId": "BDV2-469",
    "designEffect": "重置最近使用的装备；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "refresh",
          "value": "equipment"
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "重置最近使用的装备；弃最右1牌。",
      "intent": null
    },
    "signature": "68a1a26eb9e84bea25f04e6b818162b7e3f6c4422519dfa89e94d12c16277cf2"
  },
  {
    "id": "card426",
    "name": "一鼓作气",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 45,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成45场后习得",
    "sourceScene": "c3s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。费用+2；疲劳+2。",
    "shortText": "迅手（每轮同名限1）。费用+2；疲劳+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "费用+2；疲劳+2",
    "designId": "BDV2-470",
    "designEffect": "迅手（每轮同名限1）。费用+2；疲劳+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "energy",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "费用+2；疲劳+2。",
      "intent": null
    },
    "signature": "3e9492c6b925a6affdb55004afbfa498b8ba1b51f56a07b83b68d9559bf1e4d1"
  },
  {
    "id": "card427",
    "name": "咬牙坚持",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 45,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成45场后习得",
    "sourceScene": "c3s09",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。费用+1；失去2心神。",
    "shortText": "迅手（每轮同名限1）。费用+1；失去2心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "费用+1；失去2心神",
    "designId": "BDV2-471",
    "designEffect": "迅手（每轮同名限1）。费用+1；失去2心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "energy",
          "n": 1
        },
        {
          "op": "hurt",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "费用+1；失去2心神。",
      "intent": null
    },
    "signature": "7d0483738fab39bdda527d96b159d89b2adfd9539204aa0234c82b86d6973947"
  },
  {
    "id": "card428",
    "name": "破釜沉舟",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标6；弃最右2牌。",
    "shortText": "压制目标6；弃最右2牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标6；弃最右2牌",
    "designId": "BDV2-472",
    "designEffect": "压制目标6；弃最右2牌。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 6
        },
        {
          "op": "discardRight",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标6；弃最右2牌。",
      "intent": null
    },
    "signature": "556dafb2b62f8cbd418dc9d0dac693f5473dfa2195eb979c2033b3cd6ff79cbf"
  },
  {
    "id": "card429",
    "name": "孤身断后",
    "cost": 2,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 46,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成46场后习得",
    "sourceScene": "c3s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+5；若没有协作者，反击+4。",
    "shortText": "护身+5；若没有协作者，反击+4。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "护身+5；若没有协作者，反击+4",
    "designId": "BDV2-473",
    "designEffect": "护身+5；若没有协作者，反击+4。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 5
        },
        {
          "op": "if",
          "condition": "alone",
          "effects": [
            {
              "op": "counter",
              "n": 4
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+5；若没有协作者，反击+4。",
      "intent": null
    },
    "signature": "12fb74725a83e8ce27898f070de133a8f2a072ab2eed37ec2cf085fd5123ee7f"
  },
  {
    "id": "card430",
    "name": "掩护同伴突入",
    "cost": 2,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 47,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成47场后习得",
    "sourceScene": "c3s11",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+3；若有两名协作者，压制目标4。",
    "shortText": "护身+3；若有两名协作者，压制目标4。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "护身+3；若有两名协作者，压制目标4",
    "designId": "BDV2-474",
    "designEffect": "护身+3；若有两名协作者，压制目标4。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "damage",
              "n": 4
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；若有两名协作者，压制目标4。",
      "intent": null
    },
    "signature": "b0ea7fd9a9f1b28dd1fee2b07a624e2dca5d7fcb830566a8abfab45d4c4b3424"
  },
  {
    "id": "card431",
    "name": "让熟手接手",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 47,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成47场后习得",
    "sourceScene": "c3s11",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "重置最近使用的协作者；信任+1。",
    "shortText": "重置最近使用的协作者；信任+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "重置最近使用的协作者；信任+1",
    "designId": "BDV2-475",
    "designEffect": "重置最近使用的协作者；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "refresh",
          "value": "person"
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "重置最近使用的协作者；信任+1。",
      "intent": null
    },
    "signature": "2f240c273a13e62ab3e951e8aa146a4de223268430bc62156cf7ec8e415fc6c7"
  },
  {
    "id": "card432",
    "name": "全力一推",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标5；疲劳+1。",
    "shortText": "压制目标5；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标5；疲劳+1",
    "designId": "BDV2-476",
    "designEffect": "压制目标5；疲劳+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 5
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标5；疲劳+1。",
      "intent": null
    },
    "signature": "58abaf96c27c2b28e86fe94bdf39ae845d2a34a75bbfdd3f4667cd59e3cf9523"
  },
  {
    "id": "card433",
    "name": "屏息出手",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 48,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成48场后习得",
    "sourceScene": "c3s12",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "耗1专注；压制目标5。",
    "shortText": "耗1专注；压制目标5。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1专注；压制目标5",
    "designId": "BDV2-477",
    "designEffect": "耗1专注；压制目标5。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "damage",
          "n": 5
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；压制目标5。",
      "intent": null
    },
    "signature": "09b075065e69681f90c611fa807b5f7ea782f5aaa47cfcd87c8206fb5010d041"
  },
  {
    "id": "card434",
    "name": "借着怒气",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "耗1信任；压制目标4；护身+2。",
    "shortText": "耗1信任；压制目标4；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1信任；压制目标4；护身+2",
    "designId": "BDV2-478",
    "designEffect": "耗1信任；压制目标4；护身+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "damage",
          "n": 4
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；压制目标4；护身+2。",
      "intent": null
    },
    "signature": "e16d346185b737da400f7e42ac18fbd04888404fa4ad1276d1b1f2de03a49a51"
  },
  {
    "id": "card435",
    "name": "疾步突刺",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 49,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成49场后习得",
    "sourceScene": "c3s13",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "耗1脚步；压制目标5；破防+1。",
    "shortText": "耗1脚步；压制目标5；破防+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1脚步；压制目标5；破防+1",
    "designId": "BDV2-479",
    "designEffect": "耗1脚步；压制目标5；破防+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "route",
          "n": 1
        },
        {
          "op": "damage",
          "n": 5
        },
        {
          "op": "vulnerable",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1脚步；压制目标5；破防+1。",
      "intent": null
    },
    "signature": "6c53539ee3c27fc9329da9f8f1a83d6ded1cb4f54f1aa2b15aaa327117e31b4e"
  },
  {
    "id": "card436",
    "name": "看准再动",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 50,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成50场后习得",
    "sourceScene": "c3s14",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "耗1专注；打断目标本轮攻击；目标破绽+2。",
    "shortText": "耗1专注；打断目标本轮攻击；目标破绽+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1专注；打断目标本轮攻击；目标破绽+2",
    "designId": "BDV2-480",
    "designEffect": "耗1专注；打断目标本轮攻击；目标破绽+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "expose",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；打断目标本轮攻击；目标破绽+2。",
      "intent": null
    },
    "signature": "51cc6a5097dc6e1d998c619eeafd832d8010b132be21300fdac8b25c74769de9"
  },
  {
    "id": "card437",
    "name": "借力卸劲",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "耗1脚步；目标压力−2；护身+3。",
    "shortText": "耗1脚步；目标压力−2；护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1脚步；目标压力−2；护身+3",
    "designId": "BDV2-481",
    "designEffect": "耗1脚步；目标压力−2；护身+3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "route",
          "n": 1
        },
        {
          "op": "weaken",
          "n": 2
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1脚步；目标压力−2；护身+3。",
      "intent": null
    },
    "signature": "8610330ff35fcfea82e48e11e98bcafdbe405e295d25ac55b91cedaa0fafcdd4"
  },
  {
    "id": "card438",
    "name": "不再后退",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 51,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成51场后习得",
    "sourceScene": "c3s15",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "耗1信任；护身+8；反击+2。",
    "shortText": "耗1信任；护身+8；反击+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1信任；护身+8；反击+2",
    "designId": "BDV2-482",
    "designEffect": "耗1信任；护身+8；反击+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "shield",
          "n": 8
        },
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；护身+8；反击+2。",
      "intent": null
    },
    "signature": "253e79d34e14d97d59a72cd887fee55864f36aa2bbe5c0f6a3b97583da1fea8d"
  },
  {
    "id": "card439",
    "name": "拽紧同伴",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 52,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成52场后习得",
    "sourceScene": "c3s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。信任+1；若有协作者，护身+2。",
    "shortText": "迅手（每轮同名限1）。信任+1；若有协作者，护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "信任+1；若有协作者，护身+2",
    "designId": "BDV2-483",
    "designEffect": "迅手（每轮同名限1）。信任+1；若有协作者，护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；若有协作者，护身+2。",
      "intent": null
    },
    "signature": "007527c6dc1dbadc9653fcac3f8fc387403b1c618fa6e693ff3c214ad93ce7bc"
  },
  {
    "id": "card440",
    "name": "默契换位",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 52,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成52场后习得",
    "sourceScene": "c3s16",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "脚步+1；重置最近使用的协作者。",
    "shortText": "脚步+1；重置最近使用的协作者。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "脚步+1；重置最近使用的协作者",
    "designId": "BDV2-484",
    "designEffect": "脚步+1；重置最近使用的协作者。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "refresh",
          "value": "person"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；重置最近使用的协作者。",
      "intent": null
    },
    "signature": "825e14eef07d60fdf3e622edf40083eea071891da73550430244d6d91d1a99ea"
  },
  {
    "id": "card441",
    "name": "声东击西",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 53,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成53场后习得",
    "sourceScene": "c3s17",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "目标破绽+2；抽1牌。",
    "shortText": "目标破绽+2；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "目标破绽+2；抽1牌",
    "designId": "BDV2-485",
    "designEffect": "目标破绽+2；抽1牌。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "expose",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标破绽+2；抽1牌。",
      "intent": null
    },
    "signature": "21ba24900a4704b4f9978cffb9963da71c08fa5ba4754d03151eb7078f0c12e8"
  },
  {
    "id": "card442",
    "name": "搅乱阵脚",
    "cost": 2,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 53,
    "sourceCase": 3,
    "source": "北段V2 · 协作与险招 · 完成53场后习得",
    "sourceScene": "c3s17",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "所有威胁压力−1；抽1牌。",
    "shortText": "所有威胁压力−1；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "所有威胁压力−1；抽1牌",
    "designId": "BDV2-486",
    "designEffect": "所有威胁压力−1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weakenAll",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "所有威胁压力−1；抽1牌。",
      "intent": null
    },
    "signature": "71f5f84667560602d5c143aab237a10f21fe290eb83c9db97687f62f30267937"
  },
  {
    "id": "card443",
    "name": "步步紧逼",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；目标破绽+2。",
    "shortText": "压制目标3；目标破绽+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标3；目标破绽+2",
    "designId": "BDV2-487",
    "designEffect": "压制目标3；目标破绽+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "expose",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；目标破绽+2。",
      "intent": null
    },
    "signature": "a8919a9802a6d81e0a19e4361c250abc612038a3cdb44880d561b4bff841c67f"
  },
  {
    "id": "card444",
    "name": "乘胜追上",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；若打散目标，费用+1。",
    "shortText": "压制目标2；若打散目标，费用+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标2；若打散目标，费用+1",
    "designId": "BDV2-488",
    "designEffect": "压制目标2；若打散目标，费用+1。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "killed",
          "effects": [
            {
              "op": "energy",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；若打散目标，费用+1。",
      "intent": null
    },
    "signature": "a04b8502eeb83bc685d8d3527a54ef9e1776acab657df8bb741ef54467a8e55f"
  },
  {
    "id": "card445",
    "name": "收手蓄力",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。下次压制+2；下轮费用+1。",
    "shortText": "迅手（每轮同名限1）。下次压制+2；下轮费用+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "下次压制+2；下轮费用+1",
    "designId": "BDV2-489",
    "designEffect": "迅手（每轮同名限1）。下次压制+2；下轮费用+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "attackBonus",
          "n": 2
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "下次压制+2；下轮费用+1。",
      "intent": null
    },
    "signature": "e14a24ef61a8bba9e069013e20c6293e346e49998ee51316440c7ea1539fb992"
  },
  {
    "id": "card446",
    "name": "抵住最后一击",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。护身+4；下轮失神+2。",
    "shortText": "迅手（每轮同名限1）。护身+4；下轮失神+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "护身+4；下轮失神+2",
    "designId": "BDV2-490",
    "designEffect": "迅手（每轮同名限1）。护身+4；下轮失神+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "strain",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；下轮失神+2。",
      "intent": null
    },
    "signature": "cc26fd461a3c2b3e1e1d8d32c27a16835784d328bdde00914b9916dec0e08683"
  },
  {
    "id": "card447",
    "name": "不计后果冲刺",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。通路+3；疲劳+2。",
    "shortText": "迅手（每轮同名限1）。通路+3；疲劳+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "通路+3；疲劳+2",
    "designId": "BDV2-491",
    "designEffect": "迅手（每轮同名限1）。通路+3；疲劳+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 3
        },
        {
          "op": "fatigue",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+3；疲劳+2。",
      "intent": null
    },
    "signature": "6ec87279a480c4f3a026638209c378d97ad16ccd09e9304bab97f3f1e51d319f"
  },
  {
    "id": "card448",
    "name": "用身体压住",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "迅手（每轮同名限1）。打断目标本轮攻击；下轮失神+2。",
    "shortText": "迅手（每轮同名限1）。打断目标本轮攻击；下轮失神+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "打断目标本轮攻击；下轮失神+2",
    "designId": "BDV2-492",
    "designEffect": "迅手（每轮同名限1）。打断目标本轮攻击；下轮失神+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "strain",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；下轮失神+2。",
      "intent": null
    },
    "signature": "41e1a4270b0e9b481180882bc4619eaaa4d2ed64f7b87d339e2c501c0de941a7"
  },
  {
    "id": "card449",
    "name": "带伤还击",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标2；若心神未满，压制目标3。",
    "shortText": "压制目标2；若心神未满，压制目标3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标2；若心神未满，压制目标3",
    "designId": "BDV2-493",
    "designEffect": "压制目标2；若心神未满，压制目标3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "wounded",
          "effects": [
            {
              "op": "damage",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；若心神未满，压制目标3。",
      "intent": null
    },
    "signature": "f3512dd0b5c95a3cb310f726e738252b736b326cacb198fac9a22c6683978106"
  },
  {
    "id": "card450",
    "name": "最后一口气",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "若心神不高于10，回复8心神；护身+2。",
    "shortText": "若心神不高于10，回复8心神；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "若心神不高于10，回复8心神；护身+2",
    "designId": "BDV2-494",
    "designEffect": "若心神不高于10，回复8心神；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "if",
          "condition": "lowHP",
          "effects": [
            {
              "op": "heal",
              "n": 8
            }
          ]
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "若心神不高于10，回复8心神；护身+2。",
      "intent": null
    },
    "signature": "ee29b842d8f86338334e236dad0cb98bf53c539f1b876f92a3b4b25c95748830"
  },
  {
    "id": "card451",
    "name": "临危不乱",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "消除2疲劳；护身+2；抽1牌。",
    "shortText": "消除2疲劳；护身+2；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "消除2疲劳；护身+2；抽1牌",
    "designId": "BDV2-495",
    "designEffect": "消除2疲劳；护身+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "calm",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "消除2疲劳；护身+2；抽1牌。",
      "intent": null
    },
    "signature": "96a35642171a4f7389a0a3646f26f69f67394e15cb52c2236805eda83f7046fb"
  },
  {
    "id": "card452",
    "name": "扶墙站起",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。回复2心神；护身+2；疲劳+1。",
    "shortText": "迅手（每轮同名限1）。回复2心神；护身+2；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "回复2心神；护身+2；疲劳+1",
    "designId": "BDV2-496",
    "designEffect": "迅手（每轮同名限1）。回复2心神；护身+2；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复2心神；护身+2；疲劳+1。",
      "intent": null
    },
    "signature": "4751a4fafedcaa05ba2879074f42eb810f3b0878e56188a4d1ba670365f68a3e"
  },
  {
    "id": "card453",
    "name": "余力护身",
    "cost": 0,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 59,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成59场后习得",
    "sourceScene": "c4s05",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。耗1脚步；护身+4。",
    "shortText": "迅手（每轮同名限1）。耗1脚步；护身+4。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1脚步；护身+4",
    "designId": "BDV2-497",
    "designEffect": "迅手（每轮同名限1）。耗1脚步；护身+4。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "route",
          "n": 1
        },
        {
          "op": "shield",
          "n": 4
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1脚步；护身+4。",
      "intent": null
    },
    "signature": "d5589f345e25f69f2a9bf9bc97d880f69d3047355fa95235e93caac5b3a52726"
  },
  {
    "id": "card454",
    "name": "掏出备用绳",
    "cost": 0,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 60,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成60场后习得",
    "sourceScene": "c4s06",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "迅手（每轮同名限1）。抽取1张装备；脚步+1；弃最右1牌。",
    "shortText": "迅手（每轮同名限1）。抽取1张装备；脚步+1；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张装备；脚步+1；弃最右1牌",
    "designId": "BDV2-498",
    "designEffect": "迅手（每轮同名限1）。抽取1张装备；脚步+1；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "equipment"
        },
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张装备；脚步+1；弃最右1牌。",
      "intent": null
    },
    "signature": "8cd7024003223cf322ebfb877948466bb3239df5c2b73c2dd07cd26251280767"
  },
  {
    "id": "card455",
    "name": "临时修补",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 60,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成60场后习得",
    "sourceScene": "c4s06",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "取回弃牌顶首张装备；护身+2。",
    "shortText": "取回弃牌顶首张装备；护身+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "取回弃牌顶首张装备；护身+2",
    "designId": "BDV2-499",
    "designEffect": "取回弃牌顶首张装备；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "recycle",
          "value": "equipment"
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "取回弃牌顶首张装备；护身+2。",
      "intent": null
    },
    "signature": "340e5f27a858e67c4cf68fb6199e68373c72be1cd5ae61ca3a26aac3e45a0807"
  },
  {
    "id": "card456",
    "name": "清理背包",
    "cost": 0,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 61,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成61场后习得",
    "sourceScene": "c4s07",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "迅手（每轮同名限1）。抽取1张装备；弃最右1牌；抽1牌。",
    "shortText": "迅手（每轮同名限1）。抽取1张装备；弃最右1牌；抽1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张装备；弃最右1牌；抽1牌",
    "designId": "BDV2-500",
    "designEffect": "迅手（每轮同名限1）。抽取1张装备；弃最右1牌；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "equipment"
        },
        {
          "op": "discardRight",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张装备；弃最右1牌；抽1牌。",
      "intent": null
    },
    "signature": "e0f73f2be20d9ccd8b5efce1a45872e68b7054cc8786ff432cedb5688d4b8a0b"
  },
  {
    "id": "card457",
    "name": "分头准备",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 61,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成61场后习得",
    "sourceScene": "c4s07",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "抽取1张布置；抽取1张装备。",
    "shortText": "抽取1张布置；抽取1张装备。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张布置；抽取1张装备",
    "designId": "BDV2-501",
    "designEffect": "抽取1张布置；抽取1张装备。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "setup"
        },
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张布置；抽取1张装备。",
      "intent": null
    },
    "signature": "e4792fede1c3930ac4f8dc95a0c4acd0a0294bd9c5b13fdf4692f7d062af23c1"
  },
  {
    "id": "card458",
    "name": "合力守住",
    "cost": 1,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 62,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成62场后习得",
    "sourceScene": "c4s08",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；反击+协作者数。",
    "shortText": "护身+2；反击+协作者数。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "护身+2；反击+协作者数",
    "designId": "BDV2-502",
    "designEffect": "护身+2；反击+协作者数。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "counter",
          "n": "people"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；反击+协作者数。",
      "intent": null
    },
    "signature": "cce90b148fb9cb6dd16adfacfd724b3445530f63aae687f61ec946bd941471e3"
  },
  {
    "id": "card459",
    "name": "听见同伴呼声",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 62,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成62场后习得",
    "sourceScene": "c4s08",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。信任+1；消除1疲劳。",
    "shortText": "迅手（每轮同名限1）。信任+1；消除1疲劳。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "信任+1；消除1疲劳",
    "designId": "BDV2-503",
    "designEffect": "迅手（每轮同名限1）。信任+1；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "信任+1；消除1疲劳。",
      "intent": null
    },
    "signature": "4e933e2a2e03e3fd2a2f5bb326f1bd51040582b6074dbbfb4839bea70737dfb3"
  },
  {
    "id": "card460",
    "name": "认准一条路",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 63,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成63场后习得",
    "sourceScene": "c4s09",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "耗1专注；脚步+3。",
    "shortText": "耗1专注；脚步+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1专注；脚步+3",
    "designId": "BDV2-504",
    "designEffect": "耗1专注；脚步+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "focus",
          "n": 1
        },
        {
          "op": "route",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1专注；脚步+3。",
      "intent": null
    },
    "signature": "9d65fcd81e76c20f76902f07573b5cc0dde0e88412c9da654ec575479fba8ee7"
  },
  {
    "id": "card461",
    "name": "把犹豫放下",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 63,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成63场后习得",
    "sourceScene": "c4s09",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "耗1信任；费用+2。",
    "shortText": "耗1信任；费用+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1信任；费用+2",
    "designId": "BDV2-505",
    "designEffect": "耗1信任；费用+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "energy",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；费用+2。",
      "intent": null
    },
    "signature": "0ea627bae1e3556b2eb09d48f6749c8a9ac8c3019706a09f35147c56545af3ac"
  },
  {
    "id": "card462",
    "name": "用尽最后力气",
    "cost": 0,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 64,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成64场后习得",
    "sourceScene": "c4s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "迅手（每轮同名限1）。压制目标4；下轮失神+3。",
    "shortText": "迅手（每轮同名限1）。压制目标4；下轮失神+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标4；下轮失神+3",
    "designId": "BDV2-506",
    "designEffect": "迅手（每轮同名限1）。压制目标4；下轮失神+3。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 4
        },
        {
          "op": "strain",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标4；下轮失神+3。",
      "intent": null
    },
    "signature": "328a2b882702af6e48ec3d693e8504844f6abf9f170f6ec91e74d776031a7b23"
  },
  {
    "id": "card463",
    "name": "拦住失控同伴",
    "cost": 1,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 64,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成64场后习得",
    "sourceScene": "c4s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "消除2疲劳；交涉+1。",
    "shortText": "消除2疲劳；交涉+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "消除2疲劳；交涉+1",
    "designId": "BDV2-507",
    "designEffect": "消除2疲劳；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "calm",
          "n": 2
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "消除2疲劳；交涉+1。",
      "intent": null
    },
    "signature": "eada304ab435c8c13c6b468b2b5a85ad2256868cc3604276370725fd21eaa78d"
  },
  {
    "id": "card464",
    "name": "趁空包扎",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 65,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成65场后习得",
    "sourceScene": "c4s11",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "回复3心神；若目标已被打断，护身+3。",
    "shortText": "回复3心神；若目标已被打断，护身+3。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "回复3心神；若目标已被打断，护身+3",
    "designId": "BDV2-508",
    "designEffect": "回复3心神；若目标已被打断，护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 3
        },
        {
          "op": "if",
          "condition": "stunned",
          "effects": [
            {
              "op": "shield",
              "n": 3
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复3心神；若目标已被打断，护身+3。",
      "intent": null
    },
    "signature": "c3b1e7c1f9a7ad9a5a437887ba2b3fc5463ede1763292a300d0a0c58514653d5"
  },
  {
    "id": "card465",
    "name": "边退边战",
    "cost": 2,
    "type": "压制技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 65,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成65场后习得",
    "sourceScene": "c4s11",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "压制目标3；脚步+1；反击+2。",
    "shortText": "压制目标3；脚步+1；反击+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "压制目标3；脚步+1；反击+2",
    "designId": "BDV2-509",
    "designEffect": "压制目标3；脚步+1；反击+2。",
    "target": "enemy",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "counter",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；脚步+1；反击+2。",
      "intent": null
    },
    "signature": "982bd93cb1f9bfff491d7255bc2a7c6ec456505e9642eb5301371e331fac65ef"
  },
  {
    "id": "card466",
    "name": "把后背交给他",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 66,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成66场后习得",
    "sourceScene": "c4s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "耗1信任；护身+3；重置最近使用的协作者。",
    "shortText": "耗1信任；护身+3；重置最近使用的协作者。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "耗1信任；护身+3；重置最近使用的协作者",
    "designId": "BDV2-510",
    "designEffect": "耗1信任；护身+3；重置最近使用的协作者。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "pay",
          "resource": "resolve",
          "n": 1
        },
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "refresh",
          "value": "person"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "耗1信任；护身+3；重置最近使用的协作者。",
      "intent": null
    },
    "signature": "9d4c308346fd4da291461fc3961c289b26c97a5da33cdc59c4f0dd53aac71493"
  },
  {
    "id": "card467",
    "name": "一声招呼",
    "cost": 0,
    "type": "交涉技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 66,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成66场后习得",
    "sourceScene": "c4s12",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "迅手（每轮同名限1）。抽取1张人物；信任+1；弃最右1牌。",
    "shortText": "迅手（每轮同名限1）。抽取1张人物；信任+1；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张人物；信任+1；弃最右1牌",
    "designId": "BDV2-511",
    "designEffect": "迅手（每轮同名限1）。抽取1张人物；信任+1；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "person"
        },
        {
          "op": "resolve",
          "n": 1
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张人物；信任+1；弃最右1牌。",
      "intent": null
    },
    "signature": "f141c72ca129af2d2aeee196541ac3fa3cd6853c34965903feb07848ba92bd00"
  },
  {
    "id": "card468",
    "name": "抓紧这一刻",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 67,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成67场后习得",
    "sourceScene": "c4s13",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "费用+1；抽2牌；疲劳+1。",
    "shortText": "费用+1；抽2牌；疲劳+1。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "费用+1；抽2牌；疲劳+1",
    "designId": "BDV2-512",
    "designEffect": "费用+1；抽2牌；疲劳+1。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "energy",
          "n": 1
        },
        {
          "op": "draw",
          "n": 2
        },
        {
          "op": "fatigue",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "费用+1；抽2牌；疲劳+1。",
      "intent": null
    },
    "signature": "e53409b2ffaade23eee4561aa160093a78772de2ad643e9e2a29c8a40d4c8725"
  },
  {
    "id": "card469",
    "name": "定下分工",
    "cost": 1,
    "type": "调度技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 68,
    "sourceCase": 4,
    "source": "北段V2 · 协作与险招 · 完成68场后习得",
    "sourceScene": "c4s14",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "抽取1张人物；抽取1张布置；弃最右1牌。",
    "shortText": "抽取1张人物；抽取1张布置；弃最右1牌。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "协作与险招",
    "buildRole": "抽取1张人物；抽取1张布置；弃最右1牌",
    "designId": "BDV2-513",
    "designEffect": "抽取1张人物；抽取1张布置；弃最右1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "drawMode",
          "value": "person"
        },
        {
          "op": "drawMode",
          "value": "setup"
        },
        {
          "op": "discardRight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "抽取1张人物；抽取1张布置；弃最右1牌。",
      "intent": null
    },
    "signature": "7a0ebe4f1440443984fdbe45e94be78c9d73cd10273eb2c53c5547ac0977a2b3"
  },
  {
    "id": "card470",
    "name": "并肩持灯",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：信任+1。每轮首次调查行动后：若有两名协作者，专注+2。共3次。",
    "shortText": "入场：信任+1。每轮首次调查行动后：若有两名协作者，专注+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有两名协作者，专注+2",
    "designId": "BDV2-514",
    "designEffect": "入场：信任+1。每轮首次调查行动后：若有两名协作者，专注+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有两名协作者，专注+2。",
      "intent": null
    },
    "signature": "d9816558cb22ee3df8f3f1f293c427d585e2854b009b474d01e869dca92fd930"
  },
  {
    "id": "card471",
    "name": "药箱放手边",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：抽取1张装备。每轮首次回复心神后：抽1牌。共3次。",
    "shortText": "入场：抽取1张装备。每轮首次回复心神后：抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "抽1牌",
    "designId": "BDV2-515",
    "designEffect": "入场：抽取1张装备。每轮首次回复心神后：抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽1牌。",
      "intent": null
    },
    "signature": "94e364ab83fdb6e768fc5cb8512f86cc816d382f360d678ba8d286971830cb4d"
  },
  {
    "id": "card472",
    "name": "留守后门",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 54,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成54场后习得",
    "sourceScene": "c3s18",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次应对成功后：护身+2；脚步+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次应对成功后：护身+2；脚步+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+2；脚步+1",
    "designId": "BDV2-516",
    "designEffect": "入场：脚步+1。每轮首次应对成功后：护身+2；脚步+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+2；脚步+1。",
      "intent": null
    },
    "signature": "4ef2fd8c5434c72715a72012321f3f837a26151a63626f65b6fcf1adeef7594a"
  },
  {
    "id": "card473",
    "name": "装沙阻轮桶",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：通路+1。每轮首次挡住压力后：护身+2；挡住转移。共3次。",
    "shortText": "入场：通路+1。每轮首次挡住压力后：护身+2；挡住转移。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+2；挡住转移",
    "designId": "BDV2-517",
    "designEffect": "入场：通路+1。每轮首次挡住压力后：护身+2；挡住转移。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cover",
          "value": "transfer"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+2；挡住转移。",
      "intent": null
    },
    "signature": "7a235b86c7a02937165097f5420c34815eb8705e336eb6a55dfd16baacc68d33"
  },
  {
    "id": "card474",
    "name": "前院绊马绳",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 55,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成55场后习得",
    "sourceScene": "c4s01",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：目标破绽+1。每轮首次回合末：压制目标1；目标压力−1。共3次。",
    "shortText": "入场：目标破绽+1。每轮首次回合末：压制目标1；目标压力−1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "压制目标1；目标压力−1",
    "designId": "BDV2-518",
    "designEffect": "入场：目标破绽+1。每轮首次回合末：压制目标1；目标压力−1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 1
        },
        {
          "op": "weaken",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "压制目标1；目标压力−1。",
      "intent": null
    },
    "signature": "5409311854c4c4e9091887ef6a72aabc2a47d15824efbe1a1882e47c0b784c58"
  },
  {
    "id": "card475",
    "name": "碎瓷示警线",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：专注+1。每轮首次回合开始：若有至少两处威胁，护身+2。共3次。",
    "shortText": "入场：专注+1。每轮首次回合开始：若有至少两处威胁，护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有至少两处威胁，护身+2",
    "designId": "BDV2-519",
    "designEffect": "入场：专注+1。每轮首次回合开始：若有至少两处威胁，护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "enemies2",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有至少两处威胁，护身+2。",
      "intent": null
    },
    "signature": "46f3ec6192e33bc7713535dfdc4fc487cc2b9c8fd1bd88d2c436960131cffd5d"
  },
  {
    "id": "card476",
    "name": "后窗接应绳",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 56,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成56场后习得",
    "sourceScene": "c4s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；抽1牌。共3次。",
    "shortText": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "解1道束缚；抽1牌",
    "designId": "BDV2-520",
    "designEffect": "入场：解1道束缚。每轮首次通路行动后：解1道束缚；抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；抽1牌。",
      "intent": null
    },
    "signature": "c773b2fc1109eb5ea4dfe8484493ff3c89b5d0f44b42d318a81950539c3884bc"
  },
  {
    "id": "card477",
    "name": "书柜隔断",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：护身+2。每轮首次挡住压力后：保留护身+2；挡住散页。共3次。",
    "shortText": "入场：护身+2。每轮首次挡住压力后：保留护身+2；挡住散页。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "保留护身+2；挡住散页",
    "designId": "BDV2-521",
    "designEffect": "入场：护身+2。每轮首次挡住压力后：保留护身+2；挡住散页。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "保留护身+2；挡住散页。",
      "intent": null
    },
    "signature": "6b18bf68844988d48f08e22b22fd263389e0eba1f60358c44d8d74cfcf3f430c"
  },
  {
    "id": "card478",
    "name": "炉边热水",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 57,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成57场后习得",
    "sourceScene": "c4s03",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：回复1心神。每轮首次进入下一幕：回复1心神；信任+1。共3次。",
    "shortText": "入场：回复1心神。每轮首次进入下一幕：回复1心神；信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "回复1心神；信任+1",
    "designId": "BDV2-522",
    "designEffect": "入场：回复1心神。每轮首次进入下一幕：回复1心神；信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复1心神；信任+1。",
      "intent": null
    },
    "signature": "f18effd9e1e9a53ce6c8a47b680fe3509c5d59d3e443d0b4c7fca59237a5daf6"
  },
  {
    "id": "card479",
    "name": "伤员安置角",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：护送伤员离险。每轮首次回复心神后：保留护身+2；回复1心神。共3次。",
    "shortText": "入场：护送伤员离险。每轮首次回复心神后：保留护身+2；回复1心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "保留护身+2；回复1心神",
    "designId": "BDV2-523",
    "designEffect": "入场：护送伤员离险。每轮首次回复心神后：保留护身+2；回复1心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "evacuate",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "保留护身+2；回复1心神。",
      "intent": null
    },
    "signature": "80e31a3778277744eef659f607ad2d55b6a1e11538a5dabc5ae0e24a562250a1"
  },
  {
    "id": "card480",
    "name": "换班哨位",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：信任+1。每轮首次回合开始：若有协作者，下轮费用+1。共3次。",
    "shortText": "入场：信任+1。每轮首次回合开始：若有协作者，下轮费用+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有协作者，下轮费用+1",
    "designId": "BDV2-524",
    "designEffect": "入场：信任+1。每轮首次回合开始：若有协作者，下轮费用+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people1",
          "effects": [
            {
              "op": "nextEnergy",
              "n": 1
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有协作者，下轮费用+1。",
      "intent": null
    },
    "signature": "d17e9c8f12955f983939e0558b6b4ef92b605e35a040ce03e22c99af6fd8962a"
  },
  {
    "id": "card481",
    "name": "布袋落石机关",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 58,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成58场后习得",
    "sourceScene": "c4s04",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：压制目标1。每轮首次应对成功后：压制目标3；目标破绽+1。共3次。",
    "shortText": "入场：压制目标1。每轮首次应对成功后：压制目标3；目标破绽+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "压制目标3；目标破绽+1",
    "designId": "BDV2-525",
    "designEffect": "入场：压制目标1。每轮首次应对成功后：压制目标3；目标破绽+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "damage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "压制目标3；目标破绽+1。",
      "intent": null
    },
    "signature": "045a0bcbed132f6c4c40708e28883b35ebce5ac66ae495b4795d5185653573b1"
  },
  {
    "id": "card482",
    "name": "架空储物台",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 59,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成59场后习得",
    "sourceScene": "c4s05",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住水险。每轮首次部署装备后：抽1牌；挡住水险。共3次。",
    "shortText": "入场：挡住水险。每轮首次部署装备后：抽1牌；挡住水险。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "抽1牌；挡住水险",
    "designId": "BDV2-526",
    "designEffect": "入场：挡住水险。每轮首次部署装备后：抽1牌；挡住水险。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "draw",
          "n": 1
        },
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽1牌；挡住水险。",
      "intent": null
    },
    "signature": "380fcdf28f89c5d7d2f5e40fe165e7e3ff9098b377c8f4223ec4a2adc59fe0c4"
  },
  {
    "id": "card483",
    "name": "门框承重绳",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 59,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成59场后习得",
    "sourceScene": "c4s05",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：护身+2。每轮首次防护行动后：护身+1；解1道束缚。共3次。",
    "shortText": "入场：护身+2。每轮首次防护行动后：护身+1；解1道束缚。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+1；解1道束缚",
    "designId": "BDV2-527",
    "designEffect": "入场：护身+2。每轮首次防护行动后：护身+1；解1道束缚。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_guard",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+1；解1道束缚。",
      "intent": null
    },
    "signature": "6e9194a343abd176caefe49d6223eb2578099c7ec59372ff27ee62b158b655df"
  },
  {
    "id": "card484",
    "name": "低处接落毯",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 60,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成60场后习得",
    "sourceScene": "c4s06",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：护身+1。每轮首次应对成功后：护身+4；回复1心神。共3次。",
    "shortText": "入场：护身+1。每轮首次应对成功后：护身+4；回复1心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+4；回复1心神",
    "designId": "BDV2-528",
    "designEffect": "入场：护身+1。每轮首次应对成功后：护身+4；回复1心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "heal",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+4；回复1心神。",
      "intent": null
    },
    "signature": "36450bbf517b6a24a100d2c0001069ac8406bae32c7be044d323ea54830e25df"
  },
  {
    "id": "card485",
    "name": "拐角藏身处",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 60,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成60场后习得",
    "sourceScene": "c4s06",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次打断威胁后：专注+1；护身+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次打断威胁后：专注+1；护身+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "专注+1；护身+1",
    "designId": "BDV2-529",
    "designEffect": "入场：脚步+1。每轮首次打断威胁后：专注+1；护身+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "stun",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "专注+1；护身+1。",
      "intent": null
    },
    "signature": "9031d5a8fbffc71d63d97024b0438c6b710fff6f882c8b2cc095914c26427340"
  },
  {
    "id": "card486",
    "name": "双层落物隔离",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 61,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成61场后习得",
    "sourceScene": "c4s07",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住坠落。每轮首次回合末：护身+1；保留护身+2。共3次。",
    "shortText": "入场：挡住坠落。每轮首次回合末：护身+1；保留护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+1；保留护身+2",
    "designId": "BDV2-530",
    "designEffect": "入场：挡住坠落。每轮首次回合末：护身+1；保留护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "fall"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 1
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+1；保留护身+2。",
      "intent": null
    },
    "signature": "fdac576a9572609121e8910090b17a8dff11c8b283cc4d62e8a9f7d87aee5af7"
  },
  {
    "id": "card487",
    "name": "有人看着的药桌",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 6,
    "sourceCase": 1,
    "source": "北段V2 · 夜行布置 · 完成6场后习得",
    "sourceScene": "c1s06",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：处理1级轻伤。每轮首次交涉行动后：回复2心神；挡住催逼。共3次。",
    "shortText": "入场：处理1级轻伤。每轮首次交涉行动后：回复2心神；挡住催逼。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "回复2心神；挡住催逼",
    "designId": "BDV2-531",
    "designEffect": "入场：处理1级轻伤。每轮首次交涉行动后：回复2心神；挡住催逼。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "care",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "回复2心神；挡住催逼。",
      "intent": null
    },
    "signature": "5215e11ed155e4000eff7056b5895bfa09c89c040b59a4736302a37d8e24b8dc"
  },
  {
    "id": "card488",
    "name": "覆布物证台",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 62,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成62场后习得",
    "sourceScene": "c4s08",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住抢夺。每轮首次应对成功后：专注+1；保留护身+2。共3次。",
    "shortText": "入场：挡住抢夺。每轮首次应对成功后：专注+1；保留护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "专注+1；保留护身+2",
    "designId": "BDV2-532",
    "designEffect": "入场：挡住抢夺。每轮首次应对成功后：专注+1；保留护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "grab"
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "专注+1；保留护身+2。",
      "intent": null
    },
    "signature": "e64d86c57ca88f5015bb962caeae7573d11c7ce3d8e9b0d5d362f3bcb9c8b50e"
  },
  {
    "id": "card489",
    "name": "空院练步",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 62,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成62场后习得",
    "sourceScene": "c4s08",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次进入下一幕：消除1疲劳；脚步+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次进入下一幕：消除1疲劳；脚步+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "消除1疲劳；脚步+1",
    "designId": "BDV2-533",
    "designEffect": "入场：脚步+1。每轮首次进入下一幕：消除1疲劳；脚步+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "calm",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "消除1疲劳；脚步+1。",
      "intent": null
    },
    "signature": "cc0aa6951ef17b52fb5c1c092c8803499df0d1a3087dcdf1db9ed1dfa6a0130b"
  },
  {
    "id": "card490",
    "name": "稳固拴船点",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 62,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成62场后习得",
    "sourceScene": "c4s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住水险。每轮首次通路行动后：护身+3。共3次。",
    "shortText": "入场：挡住水险。每轮首次通路行动后：护身+3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+3",
    "designId": "BDV2-534",
    "designEffect": "入场：挡住水险。每轮首次通路行动后：护身+3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+3。",
      "intent": null
    },
    "signature": "f88ffa2f9e4cf7dc331cc9fb6ffc699144fe4242446e67390bea30c89e62e0d4"
  },
  {
    "id": "card491",
    "name": "审慎问话顺序",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 63,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成63场后习得",
    "sourceScene": "c4s09",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：专注+1。每轮首次交涉行动后：若有专注，交涉+1；信任+1。共3次。",
    "shortText": "入场：专注+1。每轮首次交涉行动后：若有专注，交涉+1；信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有专注，交涉+1；信任+1",
    "designId": "BDV2-535",
    "designEffect": "入场：专注+1。每轮首次交涉行动后：若有专注，交涉+1；信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "focus1",
          "effects": [
            {
              "op": "courage",
              "n": 1
            }
          ]
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有专注，交涉+1；信任+1。",
      "intent": null
    },
    "signature": "3415209ea3fd17771e2e3da85d61a4be46c235f7434902487b4a542f9042e687"
  },
  {
    "id": "card492",
    "name": "备用小路",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 63,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成63场后习得",
    "sourceScene": "c4s09",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：通路+1。每轮首次受伤后：脚步+1；通路+1。共3次。",
    "shortText": "入场：通路+1。每轮首次受伤后：脚步+1；通路+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "脚步+1；通路+1",
    "designId": "BDV2-536",
    "designEffect": "入场：通路+1。每轮首次受伤后：脚步+1；通路+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+1；通路+1。",
      "intent": null
    },
    "signature": "e57d5bae5f3b8eca8089f1e11861f3b7b48c3a11a736eb9f0ad066a56ba53b1e"
  },
  {
    "id": "card493",
    "name": "前后双灯",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 夜行布置 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：挡住反光。每轮首次调查行动后：若有装备，专注+2。共3次。",
    "shortText": "入场：挡住反光。每轮首次调查行动后：若有装备，专注+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有装备，专注+2",
    "designId": "BDV2-537",
    "designEffect": "入场：挡住反光。每轮首次调查行动后：若有装备，专注+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "focus",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有装备，专注+2。",
      "intent": null
    },
    "signature": "051e1dc73701e4c1eccfbc51ecaf6fefebb9cd3634dc07464eb7a8fc244a94df"
  },
  {
    "id": "card494",
    "name": "手边器械清单",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 64,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成64场后习得",
    "sourceScene": "c4s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：专注+1。每轮首次部署装备后：抽取1张装备。共3次。",
    "shortText": "入场：专注+1。每轮首次部署装备后：抽取1张装备。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "抽取1张装备",
    "designId": "BDV2-538",
    "designEffect": "入场：专注+1。每轮首次部署装备后：抽取1张装备。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_equipment",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽取1张装备。",
      "intent": null
    },
    "signature": "76b36a20947866fd220f861c899e6fdf8844964be5438f6bf71a9db47ce2d32d"
  },
  {
    "id": "card495",
    "name": "分组材料架",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 65,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成65场后习得",
    "sourceScene": "c4s11",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：挡住散页。每轮首次调查行动后：取回弃牌顶首张技能。共3次。",
    "shortText": "入场：挡住散页。每轮首次调查行动后：取回弃牌顶首张技能。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "取回弃牌顶首张技能",
    "designId": "BDV2-539",
    "designEffect": "入场：挡住散页。每轮首次调查行动后：取回弃牌顶首张技能。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "effects": [
        {
          "op": "recycle",
          "value": "skill"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "取回弃牌顶首张技能。",
      "intent": null
    },
    "signature": "5a449a3c7332d84669576ed73c98b165aaef4c1a0648bf127687923427e695b0"
  },
  {
    "id": "card496",
    "name": "带哨的撤离线",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 65,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成65场后习得",
    "sourceScene": "c4s11",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：解1道束缚。每轮首次应对成功后：脚步+2。共3次。",
    "shortText": "入场：解1道束缚。每轮首次应对成功后：脚步+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "脚步+2",
    "designId": "BDV2-540",
    "designEffect": "入场：解1道束缚。每轮首次应对成功后：脚步+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cut",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "route",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "脚步+2。",
      "intent": null
    },
    "signature": "9ea3b3cd016d88b7623f3a51866866df431a49c56f7e8eecc2dc58cf0bfbfc19"
  },
  {
    "id": "card497",
    "name": "可拆木栅",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 66,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成66场后习得",
    "sourceScene": "c4s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：通路+1。每轮首次挡住压力后：抽取1张装备。共3次。",
    "shortText": "入场：通路+1。每轮首次挡住压力后：抽取1张装备。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "抽取1张装备",
    "designId": "BDV2-541",
    "designEffect": "入场：通路+1。每轮首次挡住压力后：抽取1张装备。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "drawMode",
          "value": "equipment"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽取1张装备。",
      "intent": null
    },
    "signature": "73f9b2c3420ed94af4a7b3702cc5b58e5e2c14ed6c076bccd0c30ed07361e016"
  },
  {
    "id": "card498",
    "name": "码头浮木屏障",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 66,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成66场后习得",
    "sourceScene": "c4s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住水险。每轮首次回合末：护身+2；通路+1。共3次。",
    "shortText": "入场：挡住水险。每轮首次回合末：护身+2；通路+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "护身+2；通路+1",
    "designId": "BDV2-542",
    "designEffect": "入场：挡住水险。每轮首次回合末：护身+2；通路+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "护身+2；通路+1。",
      "intent": null
    },
    "signature": "8e261d020804b666f54eeb968e28502ca76540e3d5a37bb586de3d1613854ac9"
  },
  {
    "id": "card499",
    "name": "隔桌作证",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 67,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成67场后习得",
    "sourceScene": "c4s13",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：护身+1。每轮首次交涉行动后：挡住插话；专注+1。共3次。",
    "shortText": "入场：护身+1。每轮首次交涉行动后：挡住插话；专注+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "挡住插话；专注+1",
    "designId": "BDV2-543",
    "designEffect": "入场：护身+1。每轮首次交涉行动后：挡住插话；专注+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cover",
          "value": "interrupt"
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "挡住插话；专注+1。",
      "intent": null
    },
    "signature": "04c1f535b29bf413e4071c19e43182f052ad76ea7d8c3f84088480fdefd4ec49"
  },
  {
    "id": "card500",
    "name": "交班记录墙",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 67,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成67场后习得",
    "sourceScene": "c4s13",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：专注+1。每轮首次进入下一幕：调查+1；信任+1。共3次。",
    "shortText": "入场：专注+1。每轮首次进入下一幕：调查+1；信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "调查+1；信任+1",
    "designId": "BDV2-544",
    "designEffect": "入场：专注+1。每轮首次进入下一幕：调查+1；信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1；信任+1。",
      "intent": null
    },
    "signature": "3f820caa4d3613143549eecae45428c00ff24444c99cef4fd49174cf6308634b"
  },
  {
    "id": "card501",
    "name": "先药后问",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 67,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成67场后习得",
    "sourceScene": "c4s13",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：信任+1。每轮首次回复心神后：交涉+1；抽1牌。共3次。",
    "shortText": "入场：信任+1。每轮首次回复心神后：交涉+1；抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "交涉+1；抽1牌",
    "designId": "BDV2-545",
    "designEffect": "入场：信任+1。每轮首次回复心神后：交涉+1；抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "heal",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "交涉+1；抽1牌。",
      "intent": null
    },
    "signature": "98f15aca7dc9edd6a9223fde21e774861e32c58b135a082c096017d9952e837b"
  },
  {
    "id": "card502",
    "name": "先看后动",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 68,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成68场后习得",
    "sourceScene": "c4s14",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次调查行动后：下次压制+2。共3次。",
    "shortText": "入场：脚步+1。每轮首次调查行动后：下次压制+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "下次压制+2",
    "designId": "BDV2-546",
    "designEffect": "入场：脚步+1。每轮首次调查行动后：下次压制+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "attackBonus",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "下次压制+2。",
      "intent": null
    },
    "signature": "34bdd88dcd59238681821bef25d31adef857784d7ef5c68870698a4f803f0a04"
  },
  {
    "id": "card503",
    "name": "先稳后查",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 68,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成68场后习得",
    "sourceScene": "c4s14",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：专注+1。每轮首次挡住压力后：调查+1。共3次。",
    "shortText": "入场：专注+1。每轮首次挡住压力后：调查+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "调查+1",
    "designId": "BDV2-547",
    "designEffect": "入场：专注+1。每轮首次挡住压力后：调查+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "focus",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1。",
      "intent": null
    },
    "signature": "6a0ee9ec41c607858a59251b9357993a6887a1865ada46c8e62a1b2c31607642"
  },
  {
    "id": "card504",
    "name": "先挡后退",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 69,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成69场后习得",
    "sourceScene": "c4s15",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：脚步+1。每轮首次挡住压力后：通路+1；脚步+1。共3次。",
    "shortText": "入场：脚步+1。每轮首次挡住压力后：通路+1；脚步+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "通路+1；脚步+1",
    "designId": "BDV2-548",
    "designEffect": "入场：脚步+1。每轮首次挡住压力后：通路+1；脚步+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "block",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "通路+1；脚步+1。",
      "intent": null
    },
    "signature": "b961de10f0b5053a0b5154d24dd7158dbb08aa924bc17086d88bd931ce4d333e"
  },
  {
    "id": "card505",
    "name": "支撑柱掩护",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 69,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成69场后习得",
    "sourceScene": "c4s15",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+3。每轮首次回合末：若已有护身，反击+2。共3次。",
    "shortText": "入场：护身+3。每轮首次回合末：若已有护身，反击+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若已有护身，反击+2",
    "designId": "BDV2-549",
    "designEffect": "入场：护身+3。每轮首次回合末：若已有护身，反击+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "end",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 3
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "counter",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若已有护身，反击+2。",
      "intent": null
    },
    "signature": "2d779c6d13da827ec68de31789190a0c976316a3fadd34f60f23576851718844"
  },
  {
    "id": "card506",
    "name": "无人代答席",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 70,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成70场后习得",
    "sourceScene": "c4s16",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住插话。每轮首次交涉行动后：若信任至少2，抽1牌。共3次。",
    "shortText": "入场：挡住插话。每轮首次交涉行动后：若信任至少2，抽1牌。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若信任至少2，抽1牌",
    "designId": "BDV2-550",
    "designEffect": "入场：挡住插话。每轮首次交涉行动后：若信任至少2，抽1牌。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_courage",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "interrupt"
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "resolve2",
          "effects": [
            {
              "op": "draw",
              "n": 1
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若信任至少2，抽1牌。",
      "intent": null
    },
    "signature": "c27d2194840c875ae6a88352f8989348d2cd0c883716edacacef778e62c2be35"
  },
  {
    "id": "card507",
    "name": "临时消息站",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 70,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成70场后习得",
    "sourceScene": "c4s16",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：抽1牌。每轮首次协作者入场后：专注+1；下轮费用+1。共3次。",
    "shortText": "入场：抽1牌。每轮首次协作者入场后：专注+1；下轮费用+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "专注+1；下轮费用+1",
    "designId": "BDV2-551",
    "designEffect": "入场：抽1牌。每轮首次协作者入场后：专注+1；下轮费用+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "deploy_person",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "nextEnergy",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "专注+1；下轮费用+1。",
      "intent": null
    },
    "signature": "a869d2c2a9a4bc7b7da4055ee6d7ad3c707204f35a1deb0b47d670d358d89d7b"
  },
  {
    "id": "card508",
    "name": "包扎接力点",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 71,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成71场后习得",
    "sourceScene": "c4s17",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：回复2心神。每轮首次进入下一幕：若有两名协作者，回复3心神。共3次。",
    "shortText": "入场：回复2心神。每轮首次进入下一幕：若有两名协作者，回复3心神。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有两名协作者，回复3心神",
    "designId": "BDV2-552",
    "designEffect": "入场：回复2心神。每轮首次进入下一幕：若有两名协作者，回复3心神。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "phase",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "heal",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "heal",
              "n": 3
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有两名协作者，回复3心神。",
      "intent": null
    },
    "signature": "463d9c8a2a4293ba05510a440667575f3e4fd8a84c5d64beae6a186c1606e4b7"
  },
  {
    "id": "card509",
    "name": "长凳封锁线",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 71,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成71场后习得",
    "sourceScene": "c4s17",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：护身+2。每轮首次应对成功后：打断目标本轮攻击。共3次。",
    "shortText": "入场：护身+2。每轮首次应对成功后：打断目标本轮攻击。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "打断目标本轮攻击",
    "designId": "BDV2-553",
    "designEffect": "入场：护身+2。每轮首次应对成功后：打断目标本轮攻击。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "stun",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击。",
      "intent": null
    },
    "signature": "a03b426df3e49ac15d163a6844d2336c45f97fe16a86a110c1aa17044e6a26ac"
  },
  {
    "id": "card510",
    "name": "草绳减速带",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 71,
    "sourceCase": 4,
    "source": "北段V2 · 夜行布置 · 完成71场后习得",
    "sourceScene": "c4s17",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：脚步+1。每轮首次压制后：若目标已受削弱，护身+2。共3次。",
    "shortText": "入场：脚步+1。每轮首次压制后：若目标已受削弱，护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若目标已受削弱，护身+2",
    "designId": "BDV2-554",
    "designEffect": "入场：脚步+1。每轮首次压制后：若目标已受削弱，护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "route",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "weakened",
          "effects": [
            {
              "op": "shield",
              "n": 2
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若目标已受削弱，护身+2。",
      "intent": null
    },
    "signature": "7a0e2a852d713d81f949425f23b6ac20417bb23e8a43305d4ffca86aeda9bd53"
  },
  {
    "id": "card511",
    "name": "并排检视台",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 72,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成72场后习得",
    "sourceScene": "c4s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：抽1牌。每轮首次调查行动后：若有装备，调查+1；挡住散页。共3次。",
    "shortText": "入场：抽1牌。每轮首次调查行动后：若有装备，调查+1；挡住散页。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有装备，调查+1；挡住散页",
    "designId": "BDV2-555",
    "designEffect": "入场：抽1牌。每轮首次调查行动后：若有装备，调查+1；挡住散页。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "draw",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "equipped",
          "effects": [
            {
              "op": "insight",
              "n": 1
            }
          ]
        },
        {
          "op": "cover",
          "value": "scatter"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有装备，调查+1；挡住散页。",
      "intent": null
    },
    "signature": "4ea705863499093efa3c953d340c5509a5971ef457dcd100e3cf5794e66da198"
  },
  {
    "id": "card512",
    "name": "逐人护送队列",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 72,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成72场后习得",
    "sourceScene": "c4s18",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：信任+1。每轮首次解救行动后：解1道束缚；交涉+1。共3次。",
    "shortText": "入场：信任+1。每轮首次解救行动后：解1道束缚；交涉+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "解1道束缚；交涉+1",
    "designId": "BDV2-556",
    "designEffect": "入场：信任+1。每轮首次解救行动后：解1道束缚；交涉+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；交涉+1。",
      "intent": null
    },
    "signature": "d2bd47c6a700a2d5e93fce87285f9bbab8fb89b73f1e5e9dced2ab95a6a2ab76"
  },
  {
    "id": "card513",
    "name": "小巷连环转角",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 73,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成73场后习得",
    "sourceScene": "c5s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：目标破绽+1。每轮首次通路行动后：若脚步至少2，目标压力−1。共3次。",
    "shortText": "入场：目标破绽+1。每轮首次通路行动后：若脚步至少2，目标压力−1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若脚步至少2，目标压力−1",
    "designId": "BDV2-557",
    "designEffect": "入场：目标破绽+1。每轮首次通路行动后：若脚步至少2，目标压力−1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "expose",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "route2",
          "effects": [
            {
              "op": "weaken",
              "n": 1
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若脚步至少2，目标压力−1。",
      "intent": null
    },
    "signature": "6e37c9034cab9bfbb95385c684c69458889e06ad9a277ec86d758ea2ef5fe46e"
  },
  {
    "id": "card514",
    "name": "密闭防潮匣",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 73,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成73场后习得",
    "sourceScene": "c5s01",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住水险。每轮首次应对成功后：调查+1；保留护身+2。共3次。",
    "shortText": "入场：挡住水险。每轮首次应对成功后：调查+1；保留护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "调查+1；保留护身+2",
    "designId": "BDV2-558",
    "designEffect": "入场：挡住水险。每轮首次应对成功后：调查+1；保留护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "response",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "调查+1；保留护身+2。",
      "intent": null
    },
    "signature": "533c9edfdd54574d598766ed872cf52954e5c6f715f9cf2a3263831c992f887d"
  },
  {
    "id": "card515",
    "name": "宽板接力桥",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 74,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成74场后习得",
    "sourceScene": "c5s02",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "setup-escape",
    "text": "入场：护身+2。每轮首次通路行动后：若有两名协作者，护身+3。共3次。",
    "shortText": "入场：护身+2。每轮首次通路行动后：若有两名协作者，护身+3。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若有两名协作者，护身+3",
    "designId": "BDV2-559",
    "designEffect": "入场：护身+2。每轮首次通路行动后：若有两名协作者，护身+3。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_open",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "shield",
          "n": 2
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "shield",
              "n": 3
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若有两名协作者，护身+3。",
      "intent": null
    },
    "signature": "d9c93b3d567a614ac37b3199ffa81f47bff00d787757576c967f4b605c90be89"
  },
  {
    "id": "card516",
    "name": "水下牵引绳",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 74,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成74场后习得",
    "sourceScene": "c5s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "setup-medical",
    "text": "入场：挡住水险。每轮首次解救行动后：解1道束缚；保留护身+2。共3次。",
    "shortText": "入场：挡住水险。每轮首次解救行动后：解1道束缚；保留护身+2。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "解1道束缚；保留护身+2",
    "designId": "BDV2-560",
    "designEffect": "入场：挡住水险。每轮首次解救行动后：解1道束缚；保留护身+2。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_rescue",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "water"
        }
      ],
      "effects": [
        {
          "op": "cut",
          "n": 1
        },
        {
          "op": "retain",
          "n": 2
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "解1道束缚；保留护身+2。",
      "intent": null
    },
    "signature": "e1edfb9f85d0526603fe445c561ebba48f176525fff09d57cf3d753d469bb2dd"
  },
  {
    "id": "card517",
    "name": "临街求助灯",
    "cost": 1,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 夜行布置 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "setup-watch",
    "text": "入场：挡住反光。每轮首次受伤后：抽取1张人物。共3次。",
    "shortText": "入场：挡住反光。每轮首次受伤后：抽取1张人物。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "抽取1张人物",
    "designId": "BDV2-561",
    "designEffect": "入场：挡住反光。每轮首次受伤后：抽取1张人物。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "hurt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "glare"
        }
      ],
      "effects": [
        {
          "op": "drawMode",
          "value": "person"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "抽取1张人物。",
      "intent": null
    },
    "signature": "acbd245d0f2c8b0d5d543ca92fb7dc4404b0c354436894d9e58069335422019b"
  },
  {
    "id": "card518",
    "name": "安静的侧室",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 夜行布置 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "setup-barricade",
    "text": "入场：挡住催逼。每轮首次回合开始：若已有护身，信任+1。共3次。",
    "shortText": "入场：挡住催逼。每轮首次回合开始：若已有护身，信任+1。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "若已有护身，信任+1",
    "designId": "BDV2-562",
    "designEffect": "入场：挡住催逼。每轮首次回合开始：若已有护身，信任+1。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "turn",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "cover",
          "value": "urge"
        }
      ],
      "effects": [
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "resolve",
              "n": 1
            }
          ]
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "若已有护身，信任+1。",
      "intent": null
    },
    "signature": "cbde00145e79d1104ced97178f9c931a29e66b38464226e32fecd3f4b734f0c3"
  },
  {
    "id": "card519",
    "name": "查验后的归位架",
    "cost": 2,
    "type": "现场布置",
    "mode": "setup",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 76,
    "sourceCase": 5,
    "source": "北段V2 · 夜行布置 · 完成76场后习得",
    "sourceScene": "c5s04",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "setup-archive",
    "text": "入场：保留护身+1。每轮首次调查行动后：取回弃牌顶首张装备。共3次。",
    "shortText": "入场：保留护身+1。每轮首次调查行动后：取回弃牌顶首张装备。共3次。",
    "conditions": "最多2处布置",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "夜行布置",
    "buildRole": "取回弃牌顶首张装备",
    "designId": "BDV2-563",
    "designEffect": "入场：保留护身+1。每轮首次调查行动后：取回弃牌顶首张装备。共3次。",
    "catalogRule": {
      "version": 2,
      "mode": "setup",
      "trigger": "goal_insight",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [
        {
          "op": "retain",
          "n": 1
        }
      ],
      "effects": [
        {
          "op": "recycle",
          "value": "equipment"
        }
      ],
      "charges": 3,
      "activateCost": 0,
      "effectText": "取回弃牌顶首张装备。",
      "intent": null
    },
    "signature": "9fdd383303a0cd9e7b30d71d33538280129a590c606d234f559deac55aed442f"
  },
  {
    "id": "card520",
    "name": "咬住牵引绳",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。应对犬冲：护身+3；失去1心神。",
    "shortText": "迅手（每轮同名限1）。应对犬冲：护身+3；失去1心神。",
    "conditions": "本轮出现犬冲时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；失去1心神",
    "designId": "BDV2-564",
    "designEffect": "迅手（每轮同名限1）。应对犬冲：护身+3；失去1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "dog",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "hurt",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；失去1心神。",
      "intent": "dog"
    },
    "signature": "3df1d1f875ea40964cba7dfcc14056662110a8f7103166c56271bb1c88525cff"
  },
  {
    "id": "card521",
    "name": "用棍隔犬",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对犬冲：压制目标2；护身+3。",
    "shortText": "应对犬冲：压制目标2；护身+3。",
    "conditions": "本轮出现犬冲时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "压制目标2；护身+3",
    "designId": "BDV2-565",
    "designEffect": "应对犬冲：压制目标2；护身+3。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "dog",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 3
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标2；护身+3。",
      "intent": "dog"
    },
    "signature": "97dd49256d44e30727f8f7882938baa655356d3b55ea00abd966f4a5d44e01c1"
  },
  {
    "id": "card522",
    "name": "抛出诱饵",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对犬冲：打断目标本轮攻击；脚步+1。",
    "shortText": "应对犬冲：打断目标本轮攻击；脚步+1。",
    "conditions": "本轮出现犬冲时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "打断目标本轮攻击；脚步+1",
    "designId": "BDV2-566",
    "designEffect": "应对犬冲：打断目标本轮攻击；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "dog",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；脚步+1。",
      "intent": "dog"
    },
    "signature": "f9123eeb79b30e521e6cfb0da77e674b84b62a6cbde870175b41bb91a506ddf5"
  },
  {
    "id": "card523",
    "name": "护犬人先退",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对犬冲：通路+2；护身+2。",
    "shortText": "应对犬冲：通路+2；护身+2。",
    "conditions": "本轮出现犬冲时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "通路+2；护身+2",
    "designId": "BDV2-567",
    "designEffect": "应对犬冲：通路+2；护身+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "dog",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；护身+2。",
      "intent": "dog"
    },
    "signature": "24b36b6a4805f7ced17b1588c26ef88537edaa150407c4b0107335830289aa2e"
  },
  {
    "id": "card524",
    "name": "压牢隔栏",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 12,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成12场后习得",
    "sourceScene": "c1s12",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对犬冲：护身+4；保留护身+1。",
    "shortText": "应对犬冲：护身+4；保留护身+1。",
    "conditions": "本轮出现犬冲时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+4；保留护身+1",
    "designId": "BDV2-568",
    "designEffect": "应对犬冲：护身+4；保留护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "dog",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；保留护身+1。",
      "intent": "dog"
    },
    "signature": "3816b947792f6ec4e6d562b71614df9ee872d8274deff4a4658cb3f6fad1ca6e"
  },
  {
    "id": "card525",
    "name": "抓牢物件",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "迅手（每轮同名限1）。应对抢夺：护身+2；专注+1。",
    "shortText": "迅手（每轮同名限1）。应对抢夺：护身+2；专注+1。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+2；专注+1",
    "designId": "BDV2-569",
    "designEffect": "迅手（每轮同名限1）。应对抢夺：护身+2；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；专注+1。",
      "intent": "grab"
    },
    "signature": "fa1b33f15a69bec1830cd26df635a1ae4888bf3b2f9074b964c978cf2f17655e"
  },
  {
    "id": "card526",
    "name": "锁上匣扣",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "应对抢夺：保留护身+3；抽1牌。",
    "shortText": "应对抢夺：保留护身+3；抽1牌。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "保留护身+3；抽1牌",
    "designId": "BDV2-570",
    "designEffect": "应对抢夺：保留护身+3；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "retain",
          "n": 3
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "保留护身+3；抽1牌。",
      "intent": "grab"
    },
    "signature": "561d6d1a058dfaae2a2fd1e6e337fa317e3e27e7c86548b84997c9b2e2707cea"
  },
  {
    "id": "card527",
    "name": "挡回伸手",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-strike",
    "text": "应对抢夺：压制目标3；信任+1。",
    "shortText": "应对抢夺：压制目标3；信任+1。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "压制目标3；信任+1",
    "designId": "BDV2-571",
    "designEffect": "应对抢夺：压制目标3；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "damage",
          "n": 3
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "压制目标3；信任+1。",
      "intent": "grab"
    },
    "signature": "a90425529e55a61068394bd757804b972f36b7524ae9705d2684c92fb0648ff1"
  },
  {
    "id": "card528",
    "name": "追到门边",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对抢夺：通路+2；目标破绽+1。",
    "shortText": "应对抢夺：通路+2；目标破绽+1。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "通路+2；目标破绽+1",
    "designId": "BDV2-572",
    "designEffect": "应对抢夺：通路+2；目标破绽+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "leverage",
          "n": 2
        },
        {
          "op": "expose",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "通路+2；目标破绽+1。",
      "intent": "grab"
    },
    "signature": "f2ba1ec08756fc2e053e956cd571baeaa785c7c651d58877e23717b6b9e1e248"
  },
  {
    "id": "card529",
    "name": "抱住册箱",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 3,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成3场后习得",
    "sourceScene": "c1s03",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对抢夺：护身+3；调查+1。",
    "shortText": "应对抢夺：护身+3；调查+1。",
    "conditions": "本轮出现抢夺时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；调查+1",
    "designId": "BDV2-573",
    "designEffect": "应对抢夺：护身+3；调查+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "grab",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "insight",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；调查+1。",
      "intent": "grab"
    },
    "signature": "2db923206c67e7ffdf084bdc11ff96b2c38e81ee18cc049d3c9d835382ebb54c"
  },
  {
    "id": "card530",
    "name": "扣住转运车",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对转移：打断目标本轮攻击；通路+1。",
    "shortText": "应对转移：打断目标本轮攻击；通路+1。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "打断目标本轮攻击；通路+1",
    "designId": "BDV2-574",
    "designEffect": "应对转移：打断目标本轮攻击；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；通路+1。",
      "intent": "transfer"
    },
    "signature": "710bc4e12e0bbfe30f916ae1b3611be7e083a885d9a4c07f7e4836610603b5e6"
  },
  {
    "id": "card531",
    "name": "封住侧门",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对转移：护身+3；通路+1。",
    "shortText": "应对转移：护身+3；通路+1。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；通路+1",
    "designId": "BDV2-575",
    "designEffect": "应对转移：护身+3；通路+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "leverage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；通路+1。",
      "intent": "transfer"
    },
    "signature": "7e087a3459a85dd3ceb60fd4ac99f236e0b0439f4badb29afb88c6052390e882"
  },
  {
    "id": "card532",
    "name": "记下交接人",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对转移：专注+2；抽1牌。",
    "shortText": "应对转移：专注+2；抽1牌。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "专注+2；抽1牌",
    "designId": "BDV2-576",
    "designEffect": "应对转移：专注+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "focus",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "专注+2；抽1牌。",
      "intent": "transfer"
    },
    "signature": "c7085e42548c96af595e68b9bd87cd30da0f4b267816fac41d4a394852f43640"
  },
  {
    "id": "card533",
    "name": "两边同时拦",
    "cost": 2,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对转移：所有威胁压力−1；通路+2。",
    "shortText": "应对转移：所有威胁压力−1；通路+2。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "所有威胁压力−1；通路+2",
    "designId": "BDV2-577",
    "designEffect": "应对转移：所有威胁压力−1；通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weakenAll",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "所有威胁压力−1；通路+2。",
      "intent": "transfer"
    },
    "signature": "a98bed29427362b3fd952962f9e9007252b6a59121ce2caa38d21737a2c73240"
  },
  {
    "id": "card534",
    "name": "跟上押运者",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 8,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成8场后习得",
    "sourceScene": "c1s08",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对转移：脚步+2；抽1牌。",
    "shortText": "应对转移：脚步+2；抽1牌。",
    "conditions": "本轮出现转移时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "脚步+2；抽1牌",
    "designId": "BDV2-578",
    "designEffect": "应对转移：脚步+2；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "transfer",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 2
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+2；抽1牌。",
      "intent": "transfer"
    },
    "signature": "e9bd7e83858a02e01667dc9ba73c576d8e638ed08618a8cb230923983894e16b"
  },
  {
    "id": "card535",
    "name": "收回未核凭条",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-search",
    "text": "应对仓促处置：调查+1；取回弃牌顶首张应对。",
    "shortText": "应对仓促处置：调查+1；取回弃牌顶首张应对。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "调查+1；取回弃牌顶首张应对",
    "designId": "BDV2-579",
    "designEffect": "应对仓促处置：调查+1；取回弃牌顶首张应对。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "response"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；取回弃牌顶首张应对。",
      "intent": "disposition"
    },
    "signature": "8db47aedee0bd55b51f1fb2d8505f7613e07627ea07a1421b17a14c8c1918eb1"
  },
  {
    "id": "card536",
    "name": "请值守留步",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对仓促处置：交涉+1；脚步+1。",
    "shortText": "应对仓促处置：交涉+1；脚步+1。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "交涉+1；脚步+1",
    "designId": "BDV2-580",
    "designEffect": "应对仓促处置：交涉+1；脚步+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "route",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；脚步+1。",
      "intent": "disposition"
    },
    "signature": "9d4715d96a951827b631f99547c189d8d89ea4fa78d489db08f4ef53d1cddc1c"
  },
  {
    "id": "card537",
    "name": "拦住仓促交付",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对仓促处置：护身+3；专注+1。",
    "shortText": "应对仓促处置：护身+3；专注+1。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；专注+1",
    "designId": "BDV2-581",
    "designEffect": "应对仓促处置：护身+3；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；专注+1。",
      "intent": "disposition"
    },
    "signature": "89909f30f26c98f48784022bfef10aa9412a833ac42b0d469ff43039bbc5cdef"
  },
  {
    "id": "card538",
    "name": "当面点清",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "应对仓促处置：调查+1；交涉+1；专注+1。",
    "shortText": "应对仓促处置：调查+1；交涉+1；专注+1。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "调查+1；交涉+1；专注+1",
    "designId": "BDV2-582",
    "designEffect": "应对仓促处置：调查+1；交涉+1；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "insight",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "调查+1；交涉+1；专注+1。",
      "intent": "disposition"
    },
    "signature": "4fe169970c0c2677bf77620597517056b57bce64704b753bb312da4c3f673990"
  },
  {
    "id": "card539",
    "name": "留下核验副联",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 36,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成36场后习得",
    "sourceScene": "c2s18",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-plan",
    "text": "应对仓促处置：下幕准备+1；抽1牌。",
    "shortText": "应对仓促处置：下幕准备+1；抽1牌。",
    "conditions": "本轮出现仓促处置时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "下幕准备+1；抽1牌",
    "designId": "BDV2-583",
    "designEffect": "应对仓促处置：下幕准备+1；抽1牌。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "disposition",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "nextProgress",
          "n": 1
        },
        {
          "op": "draw",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "下幕准备+1；抽1牌。",
      "intent": "disposition"
    },
    "signature": "b012d41ed71c485ff547c431f0489f96abfd0b1dcfacff92aed64116bcdb6bcf"
  },
  {
    "id": "card540",
    "name": "握住扶手",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。应对坠落：保留护身+2；消除1疲劳。",
    "shortText": "迅手（每轮同名限1）。应对坠落：保留护身+2；消除1疲劳。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "保留护身+2；消除1疲劳",
    "designId": "BDV2-584",
    "designEffect": "迅手（每轮同名限1）。应对坠落：保留护身+2；消除1疲劳。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "calm",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "保留护身+2；消除1疲劳。",
      "intent": "fall"
    },
    "signature": "fe250401ceda794d838cdcc13e40af4c2033d08f3e9c136868b84746760e82c2"
  },
  {
    "id": "card541",
    "name": "掩护向下跳",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对坠落：护身+2；解1道束缚。",
    "shortText": "应对坠落：护身+2；解1道束缚。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+2；解1道束缚",
    "designId": "BDV2-585",
    "designEffect": "应对坠落：护身+2；解1道束缚。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cut",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；解1道束缚。",
      "intent": "fall"
    },
    "signature": "b6b65c4149e3c1d30e84e50d231b8694870e31eb967e22ccf3d6f4371e523219"
  },
  {
    "id": "card542",
    "name": "顺坡翻滚",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对坠落：目标压力−1；通路+2。",
    "shortText": "应对坠落：目标压力−1；通路+2。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "目标压力−1；通路+2",
    "designId": "BDV2-586",
    "designEffect": "应对坠落：目标压力−1；通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "weaken",
          "n": 1
        },
        {
          "op": "leverage",
          "n": 2
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "目标压力−1；通路+2。",
      "intent": "fall"
    },
    "signature": "7c8a89896172a0c0c1729b703172278f005a5198387262d99a20f559988b680f"
  },
  {
    "id": "card543",
    "name": "绳上换手",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 2,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成2场后习得",
    "sourceScene": "c1s02",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "应对坠落：脚步+1；重置最近使用的装备。",
    "shortText": "应对坠落：脚步+1；重置最近使用的装备。",
    "conditions": "本轮出现坠落时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "脚步+1；重置最近使用的装备",
    "designId": "BDV2-587",
    "designEffect": "应对坠落：脚步+1；重置最近使用的装备。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "fall",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 1
        },
        {
          "op": "refresh",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+1；重置最近使用的装备。",
      "intent": "fall"
    },
    "signature": "2682fcf1c8b175dcc4dec5a18d8974764f753cdd9c0012bdbe3f5b46513f45ed"
  },
  {
    "id": "card544",
    "name": "捂住伤口",
    "cost": 0,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-recover",
    "text": "迅手（每轮同名限1）。应对敌袭：回复2心神；护身+1。",
    "shortText": "迅手（每轮同名限1）。应对敌袭：回复2心神；护身+1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "回复2心神；护身+1",
    "designId": "BDV2-588",
    "designEffect": "迅手（每轮同名限1）。应对敌袭：回复2心神；护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "heal",
          "n": 2
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "回复2心神；护身+1。",
      "intent": "attack"
    },
    "signature": "8b706d65111dc408dcf473543abc0cb8a2e7231bf1791424766fe37a9799009d"
  },
  {
    "id": "card545",
    "name": "翻盆护住物件",
    "cost": 1,
    "type": "防护技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 38,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成38场后习得",
    "sourceScene": "c3s02",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "保留护身+2；护身+2；挡住抢夺。",
    "shortText": "保留护身+2；护身+2；挡住抢夺。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "保留护身+2；护身+2；挡住抢夺",
    "designId": "BDV2-589",
    "designEffect": "保留护身+2；护身+2；挡住抢夺。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "retain",
          "n": 2
        },
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "cover",
          "value": "grab"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "保留护身+2；护身+2；挡住抢夺。",
      "intent": null
    },
    "signature": "65222561bf540b4959d4b9059f5ff11aa06780a75e16508f9f4a4cac16777a48"
  },
  {
    "id": "card546",
    "name": "扯开缠腿的布",
    "cost": 1,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 39,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成39场后习得",
    "sourceScene": "c3s03",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-chase",
    "text": "解2道束缚；通路+1；失去1心神。",
    "shortText": "解2道束缚；通路+1；失去1心神。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "解2道束缚；通路+1；失去1心神",
    "designId": "BDV2-590",
    "designEffect": "解2道束缚；通路+1；失去1心神。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "cut",
          "n": 2
        },
        {
          "op": "leverage",
          "n": 1
        },
        {
          "op": "hurt",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "解2道束缚；通路+1；失去1心神。",
      "intent": null
    },
    "signature": "2b24ba18c1df9ca49cd197e874581d72534ea236994988d06e998ee2a5f0a5cd"
  },
  {
    "id": "card547",
    "name": "双人架扶撤离",
    "cost": 2,
    "type": "通路技能",
    "mode": "skill",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 40,
    "sourceCase": 3,
    "source": "北段V2 · 封锁与反制 · 完成40场后习得",
    "sourceScene": "c3s04",
    "art": "type-track",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "护身+2；护送伤员离险；若有两名协作者，通路+2。",
    "shortText": "护身+2；护送伤员离险；若有两名协作者，通路+2。",
    "conditions": "",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+2；护送伤员离险；若有两名协作者，通路+2",
    "designId": "BDV2-591",
    "designEffect": "护身+2；护送伤员离险；若有两名协作者，通路+2。",
    "catalogRule": {
      "version": 2,
      "mode": "skill",
      "trigger": null,
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "evacuate",
          "n": 1
        },
        {
          "op": "if",
          "condition": "people2",
          "effects": [
            {
              "op": "leverage",
              "n": 2
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；护送伤员离险；若有两名协作者，通路+2。",
      "intent": null
    },
    "signature": "80f5c252e157ab90951f237d71e19b0613adb2c00e4997674f56f9f5ddd54aee"
  },
  {
    "id": "card548",
    "name": "赶在浪头前",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对水险：脚步+2；护身+1。",
    "shortText": "应对水险：脚步+2；护身+1。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "脚步+2；护身+1",
    "designId": "BDV2-592",
    "designEffect": "应对水险：脚步+2；护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "route",
          "n": 2
        },
        {
          "op": "shield",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "脚步+2；护身+1。",
      "intent": "water"
    },
    "signature": "79d4b8d5b7cf0e82f6933ec1e62ded207ed2f2f45d562fab49fb83ad9f610de9"
  },
  {
    "id": "card549",
    "name": "堵住破舱口",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 4,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成4场后习得",
    "sourceScene": "c1s04",
    "art": "type-equipment",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对水险：护身+4；保留护身+1。",
    "shortText": "应对水险：护身+4；保留护身+1。",
    "conditions": "本轮出现水险时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+4；保留护身+1",
    "designId": "BDV2-593",
    "designEffect": "应对水险：护身+4；保留护身+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "water",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 4
        },
        {
          "op": "retain",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+4；保留护身+1。",
      "intent": "water"
    },
    "signature": "30a2c5f04abe622dab7a0233ac20aff80b9921f77daab9f6d9c55e47f6d2d0ae"
  },
  {
    "id": "card550",
    "name": "拿木棍顶住",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-protect",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+3；重置最近使用的装备。",
    "shortText": "应对敌袭：护身+3；重置最近使用的装备。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；重置最近使用的装备",
    "designId": "BDV2-594",
    "designEffect": "应对敌袭：护身+3；重置最近使用的装备。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "refresh",
          "value": "equipment"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；重置最近使用的装备。",
      "intent": "attack"
    },
    "signature": "4f80d84723490e03da68fd654c310b96e7c5242368ce5a471794732dc044708d"
  },
  {
    "id": "card551",
    "name": "拦住第二人",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-setup",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+3；若有至少两处威胁，所有威胁压力−1。",
    "shortText": "应对敌袭：护身+3；若有至少两处威胁，所有威胁压力−1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；若有至少两处威胁，所有威胁压力−1",
    "designId": "BDV2-595",
    "designEffect": "应对敌袭：护身+3；若有至少两处威胁，所有威胁压力−1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "if",
          "condition": "enemies2",
          "effects": [
            {
              "op": "weakenAll",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；若有至少两处威胁，所有威胁压力−1。",
      "intent": "attack"
    },
    "signature": "2475d87856e449ed62f632d835aa56d415b382b4cd00207b54e696acd12d663f"
  },
  {
    "id": "card552",
    "name": "借盾撞回",
    "cost": 2,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 10,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成10场后习得",
    "sourceScene": "c1s10",
    "art": "type-investigate",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对敌袭：护身+3；压制目标2；若已有护身，目标压力−1。",
    "shortText": "应对敌袭：护身+3；压制目标2；若已有护身，目标压力−1。",
    "conditions": "本轮出现敌袭时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；压制目标2；若已有护身，目标压力−1",
    "designId": "BDV2-596",
    "designEffect": "应对敌袭：护身+3；压制目标2；若已有护身，目标压力−1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "attack",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "damage",
          "n": 2
        },
        {
          "op": "if",
          "condition": "guarded",
          "effects": [
            {
              "op": "weaken",
              "n": 1
            }
          ]
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；压制目标2；若已有护身，目标压力−1。",
      "intent": "attack"
    },
    "signature": "ebad75e8c51111b157781383e8da7432a074064f687079e4bb20e58b8f6e7e6f"
  },
  {
    "id": "card553",
    "name": "把灯护在怀里",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 封锁与反制 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-response",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对反光：护身+2；专注+1；信任+1。",
    "shortText": "应对反光：护身+2；专注+1；信任+1。",
    "conditions": "本轮出现反光时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+2；专注+1；信任+1",
    "designId": "BDV2-597",
    "designEffect": "应对反光：护身+2；专注+1；信任+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "glare",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 2
        },
        {
          "op": "focus",
          "n": 1
        },
        {
          "op": "resolve",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+2；专注+1；信任+1。",
      "intent": "glare"
    },
    "signature": "6e7da6766c832462b38d33a711eb67e1a82f4ecf1e35f013fb553e6375eae769"
  },
  {
    "id": "card554",
    "name": "拦下追问的人",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 20,
    "sourceCase": 2,
    "source": "北段V2 · 封锁与反制 · 完成20场后习得",
    "sourceScene": "c2s02",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-counter",
    "text": "应对催逼：打断目标本轮攻击；交涉+1。",
    "shortText": "应对催逼：打断目标本轮攻击；交涉+1。",
    "conditions": "本轮出现催逼时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "打断目标本轮攻击；交涉+1",
    "designId": "BDV2-598",
    "designEffect": "应对催逼：打断目标本轮攻击；交涉+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "urge",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "stun",
          "n": 1
        },
        {
          "op": "courage",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "打断目标本轮攻击；交涉+1。",
      "intent": "urge"
    },
    "signature": "3ee490d4006308cdcb673f2162a6db117ebe90fdf93a0b4b2dc2bf494954612a"
  },
  {
    "id": "card555",
    "name": "等原话说完",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 0,
    "sourceCase": 0,
    "source": "北段V2 · 封锁与反制 · 随身牌册",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-interview",
    "text": "应对插话：交涉+1；取回弃牌顶首张技能。",
    "shortText": "应对插话：交涉+1；取回弃牌顶首张技能。",
    "conditions": "本轮出现插话时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "交涉+1；取回弃牌顶首张技能",
    "designId": "BDV2-599",
    "designEffect": "应对插话：交涉+1；取回弃牌顶首张技能。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "interrupt",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "courage",
          "n": 1
        },
        {
          "op": "recycle",
          "value": "skill"
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "交涉+1；取回弃牌顶首张技能。",
      "intent": "interrupt"
    },
    "signature": "b428a8a92ee15d67c988a169e62b2b63b86506bc8c41b47ec777ceb06bb59831"
  },
  {
    "id": "card556",
    "name": "两手护住档案",
    "cost": 1,
    "type": "应对反制",
    "mode": "response",
    "modern": true,
    "legacy": false,
    "collectible": true,
    "unlock": 1,
    "sourceCase": 1,
    "source": "北段V2 · 封锁与反制 · 完成1场后习得",
    "sourceScene": "c1s01",
    "art": "type-talk",
    "artExt": "svg",
    "designArtKey": "action-guard",
    "text": "应对散页：护身+3；专注+1。",
    "shortText": "应对散页：护身+3；专注+1。",
    "conditions": "本轮出现散页时触发，未触发返还费用",
    "omen": "灯照见动作，材料留下事实。",
    "archetype": "封锁与反制",
    "buildRole": "护身+3；专注+1",
    "designId": "BDV2-600",
    "designEffect": "应对散页：护身+3；专注+1。",
    "catalogRule": {
      "version": 2,
      "mode": "response",
      "trigger": "scatter",
      "condition": "any",
      "goals": [],
      "case": 0,
      "enter": [],
      "effects": [
        {
          "op": "shield",
          "n": 3
        },
        {
          "op": "focus",
          "n": 1
        }
      ],
      "charges": 0,
      "activateCost": 0,
      "effectText": "护身+3；专注+1。",
      "intent": "scatter"
    },
    "signature": "54598c853df82e3f883ee9577b1ba482c4c7e5d0e96af2a036b2bb15f85a7699"
  }
];for(const card of records){if(D.cards[card.id])Object.assign(D.cards[card.id],card);else{D.cards[card.id]=card;D.cardList.push(card);}for(const k of ['hp','atk','rebalanceV11'])delete D.cards[card.id][k];if(!card.target)delete D.cards[card.id].target;}for(const c of D.cardList)if(!records.some(x=>x.id===c.id)){c.legacy=true;c.compatibilityOnly=true;c.collectible=false;}D.canonicalCardText=Object.fromEntries(records.map(c=>[c.id,Object.freeze(Object.fromEntries(['name','cost','type','mode','text','shortText','conditions','designEffect','archetype','buildRole'].map(k=>[k,c[k]])))]));D.playerCards=records.map(c=>D.cards[c.id]);D.modernCards=D.playerCards;D.catalogVersion=2;D.catalogCounts={collectible:600,person:24};root.BDData=D;root.BDCatalog=D;if(typeof module!=='undefined')module.exports=D;})(typeof window==='undefined'?globalThis:window);
