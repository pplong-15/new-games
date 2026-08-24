"use strict";
(function (root) {
  var D = root.TOUQI_DATA;
  var E = root.TOUQI_ENGINE;

  function $(id) { return document.getElementById(id); }

  function setImg(el, file) {
    if (el) el.setAttribute("src", "jpeg/" + file);
  }

  function unloadTitle() {
    var t = $("title-layer");
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }

  function namesOf(arr) {
    var out = [];
    var i;
    for (i = 0; i < arr.length; i++) out.push(E.personName(arr[i]));
    return out;
  }

  function howBody(st) {
    var a = namesOf(st.admitList);
    var d = namesOf(st.denyList);
    var bits = [];
    if (a.length) bits.push("放进了" + a.join("、"));
    if (d.length) bits.push("挡了" + d.join("、"));
    if (E.hasFlag("late")) bits.push("天亮前钥匙没交上");
    if (st.dims.mind <= 0) bits.push("神智格空了");
    if (st.dims.rep <= 0) bits.push("馆誉格空了");
    if (st.dims.slit <= 0) bits.push("门缝后来黑了");
    if (st.optionalLedger) bits.push("夹缝份子我收过一笔");
    if (E.hasFlag("hadRevisit")) bits.push("第六晚有人回来过");
    return bits.join("。") + (bits.length ? "。" : "名单还是空的。");
  }

  function endCopy(id) {
    var st = E.state;
    var how = howBody(st);
    if (id === "benqi") {
      return {
        img: "08-valid.jpg",
        t: "《本期》",
        w: "¥" + st.wage,
        p: how + "钥匙交了。柯班算有效班。"
      };
    }
    if (id === "deny-woman") {
      return {
        img: "08-valid.jpg",
        t: "《拒女》",
        w: "¥" + st.wage,
        p: how + "出嫁那一房被挡。欠的那一期写在她身上。"
      };
    }
    if (id === "idle") {
      return {
        img: "08-valid.jpg",
        t: "《放闲》",
        w: "¥" + st.wage,
        p: how + "帮忙或外人进了厅。灯还亮着，我后脑勺发紧。"
      };
    }
    if (id === "deny-all") {
      return {
        img: "08-valid.jpg",
        t: "《全拒》",
        w: "¥" + st.wage,
        p: how + "门一直关着。广播那一句我当成墙用了。"
      };
    }
    if (id === "admit-all") {
      return {
        img: "08-valid.jpg",
        t: "《全放》",
        w: "¥" + st.wage,
        p: how + "到的都进了。印发那行不接外人还压在抽屉里。"
      };
    }
    if (id === "late") {
      return {
        img: "09-late.jpg",
        t: "《来不及》",
        w: "¥0",
        p: how + "能源尽了。催条不是咒。交过再刷，从头进站。"
      };
    }
    if (id === "partial") {
      return {
        img: "08-valid.jpg",
        t: "名单未齐",
        w: "¥0",
        p: how + "钥匙已交。不是《本期》。不是有效班。"
      };
    }
    return {
      img: "08-valid.jpg",
      t: "名单未齐",
      w: "¥0",
      p: how + "钥匙已交。名单未齐。"
    };
  }

  function stillFor(state) {
    if (state.ending === "late") return "09-late.jpg";
    if (state.ending) return "08-valid.jpg";
    if (state.openDoc === "fang") return "07-fang.jpg";
    if (state.openDoc === "ledger") return "04-ledger.jpg";
    if (state.openDoc === "flow") return "01-flow.jpg";
    if (E.canDecide()) return "06-decide.jpg";
    if (state.checkedTonight.length) return "05-check.jpg";
    if (state.current) return "02-arrive.jpg";
    if (state.night >= 3 && state.omenRead) return "03-omen.jpg";
    return "00-open.jpg";
  }

  function render(state) {
    root.__TOUQI__.state = state;
    var lock = $("lock-line");
    if (lock) lock.textContent = D.LOCK;
    var who = $("who");
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · 二十六 · 柳埠殡仪馆";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var night = $("night-mark");
    if (night) night.textContent = "第" + state.night + "晚";
    var radio = $("radio");
    if (radio) {
      if (state.night <= 2) radio.textContent = "广播位空。本层未轮到征兆。";
      else radio.textContent = state.omenRead ? ("馆内广播：" + (D.OMEN[state.night] || "")) : "广播沙沙。点开对照今晚征兆。";
    }
    var energy = $("energy");
    if (energy) energy.textContent = String(state.energy);
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || "柯班：征兆今晚才算。成组了再裁。门外空了点下一晚。名单没齐就交钥匙，他不算你这一班。";
    var dw = $("dim-wage");
    if (dw) dw.textContent = String(state.dims.wage);
    var dm = $("dim-mind");
    if (dm) dm.textContent = String(state.dims.mind);
    var dr = $("dim-rep");
    if (dr) dr.textContent = String(state.dims.rep);
    var ds = $("dim-slit");
    if (ds) ds.textContent = String(state.dims.slit);
    var bag = $("pocket");
    if (bag) bag.textContent = state.pocket.length ? state.pocket.join(" · ") : "袋空";
    var sil = $("silhouette");
    if (sil) {
      sil.textContent = state.current ? ("门外：" + E.personName(state.current)) : "门外无人。点下一晚。";
    }
    var admit = $("admit-list");
    if (admit) {
      var names = namesOf(state.admitList);
      admit.textContent = names.length ? names.join("、") : "名单空";
    }
    var deny = $("deny-list");
    if (deny) {
      var dn = namesOf(state.denyList);
      deny.textContent = dn.length ? dn.join("、") : "拒之空";
    }
    var grouped = E.canDecide();
    var ba = $("btn-admit");
    var bd = $("btn-deny");
    if (ba) ba.disabled = !grouped;
    if (bd) bd.disabled = !grouped;
    var hint = $("group-hint");
    if (hint) {
      hint.textContent = grouped ? "成组。放进或拒之。" : "不成组不判。光听广播不够。";
    }
    var paperFang = $("paper-fang");
    if (paperFang) paperFang.style.display = state.night >= 4 ? "block" : "none";
    var paperPencil = $("paper-pencil");
    if (paperPencil) paperPencil.style.display = state.night >= 2 ? "block" : "none";
    var nxt = $("btn-next");
    if (nxt) {
      var canNext = !state.ending && !state.current && state.night < 7;
      nxt.disabled = !canNext;
      nxt.style.display = (!state.ending && state.night < 7) ? "inline-block" : "none";
    }
    var still = $("still");
    setImg(still, stillFor(state));
    var endEl = $("ending-layer");
    if (endEl) {
      if (state.ending) {
        var c = endCopy(state.ending);
        endEl.className = "ending show";
        endEl.innerHTML = "<img src=\"jpeg/" + c.img + "\" alt=\"交差\">" +
          "<p class=\"lock-line\">" + c.t + " " + c.w + "</p><p>" + c.p + "</p>";
      } else {
        endEl.className = "ending";
        endEl.textContent = "";
      }
    }
  }

  function boot() {
    if (!root.__TOUQI__) root.__TOUQI__ = {};
    var restored = false;
    if (E.loadPersist) restored = E.loadPersist();
    root.__TOUQI__.state = E.state;
    root.__TOUQI__.enter = function () {
      E.enter();
      unloadTitle();
      var desk = $("desk");
      if (desk) desk.className = "show";
    };
    root.__TOUQI__.clickFlow = function () { return E.clickFlow(); };
    root.__TOUQI__.readOmen = function () { return E.readOmen(); };
    root.__TOUQI__.checkDoc = function (id) { return E.checkDoc(id); };
    root.__TOUQI__.admit = function () { return E.admit(); };
    root.__TOUQI__.deny = function () { return E.deny(); };
    root.__TOUQI__.handKey = function () { return E.handKey(); };
    root.__TOUQI__.slit = function () { return E.slit(); };
    root.__TOUQI__.setNight = function (n) { return E.setNight(n); };
    root.__TOUQI__.setEnergy = function (n) { return E.setEnergy(n); };
    root.__TOUQI__.replay = function () { return E.replay(); };
    root.__TOUQI__.arrive = function (id) { return E.arrive(id); };
    root.__TOUQI__.nextNight = function () { return E.nextNight(); };
    E.setUi(render);
    if (restored) {
      unloadTitle();
      var desk0 = $("desk");
      if (desk0) desk0.className = "show";
    }
    render(E.state);

    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.onclick = function () { root.__TOUQI__.enter(); };
    var flow = $("btn-benqi");
    if (flow) flow.onclick = function () { E.clickFlow(); };
    var omen = $("btn-omen");
    if (omen) omen.onclick = function () { E.readOmen(); };
    function bindDoc(id, elId) {
      var el = $(elId);
      if (el) el.onclick = function () { E.checkDoc(id); };
    }
    bindDoc("flow", "btn-doc-flow");
    bindDoc("fang", "btn-doc-fang");
    bindDoc("ledger", "btn-doc-ledger");
    bindDoc("pencil", "btn-doc-pencil");
    var ba = $("btn-admit");
    if (ba) ba.onclick = function () { E.admit(); };
    var bd = $("btn-deny");
    if (bd) bd.onclick = function () { E.deny(); };
    var bn = $("btn-next");
    if (bn) bn.onclick = function () { E.nextNight(); };
    var bk = $("btn-key");
    if (bk) bk.onclick = function () { E.handKey(); };
    var bs = $("btn-slit");
    if (bs) bs.onclick = function () { E.slit(); };
    var crack = $("btn-crack");
    if (crack) crack.onclick = function () { E.pickCrack(); };
    var ro = $("refuse-obit");
    if (ro) ro.onclick = function () { E.refuseObit(); };
    var rw = $("refuse-wcs");
    if (rw) rw.onclick = function () { E.refusePrint("吴成山"); };
    var rg = $("refuse-wgx");
    if (rg) rg.onclick = function () { E.refusePrint("吴桂香"); };
  }

  if (root.document) {
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : global);
