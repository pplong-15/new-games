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
    if (a.length) bits.push("Let in " + a.join(", "));
    if (d.length) bits.push("Stopped " + d.join(", "));
    if (E.hasFlag("late")) bits.push("keys not handed before dawn");
    if (st.dims.mind <= 0) bits.push("mind cell empty");
    if (st.dims.rep <= 0) bits.push("hall-name cell empty");
    if (st.dims.slit <= 0) bits.push("slit went dark later");
    if (st.optionalLedger) bits.push("I took a seam-money line");
    if (E.hasFlag("hadRevisit")) bits.push("someone came back on night 6");
    return bits.join(". ") + (bits.length ? "." : "Name list is still empty.");
  }

  function endCopy(id) {
    var st = E.state;
    var how = howBody(st);
    if (id === "benqi") {
      return {
        img: "08-valid.jpg",
        t: "This Period",
        w: "¥" + st.wage,
        p: how + " Keys handed. Foreman Ke counts a valid shift."
      };
    }
    if (id === "deny-woman") {
      return {
        img: "08-valid.jpg",
        t: "Woman refused",
        w: "¥" + st.wage,
        p: how + " The married-out household was stopped. The period owed is written on her."
      };
    }
    if (id === "idle") {
      return {
        img: "08-valid.jpg",
        t: "Idle let in",
        w: "¥" + st.wage,
        p: how + " Helper or outsider went into the hall. Lights still on. Back of my head is tight."
      };
    }
    if (id === "deny-all") {
      return {
        img: "08-valid.jpg",
        t: "All refused",
        w: "¥" + st.wage,
        p: how + " Door stayed shut. I used that broadcast line as a wall."
      };
    }
    if (id === "admit-all") {
      return {
        img: "08-valid.jpg",
        t: "All let in",
        w: "¥" + st.wage,
        p: how + " Everyone who came went in. Print line no outsiders still in the drawer."
      };
    }
    if (id === "late") {
      return {
        img: "09-late.jpg",
        t: "Too late",
        w: "¥0",
        p: how + " Energy spent. Hurry slip. Hand keys, then refresh, clock in from the start."
      };
    }
    if (id === "partial") {
      return {
        img: "08-valid.jpg",
        t: "List incomplete",
        w: "¥0",
        p: how + " Keys handed. Not This Period. Not a valid shift."
      };
    }
    return {
      img: "08-valid.jpg",
      t: "List incomplete",
      w: "¥0",
      p: how + " Keys handed. List incomplete."
    };
  }

  function stillBridge(file) {
    if (file === "09-late.jpg") return "Dawn. Keys still on the hook.";
    if (file === "08-valid.jpg") return "Keys handed.";
    if (file === "07-fang.jpg") return "Household-share sheet open.";
    if (file === "04-ledger.jpg") return "Gift ledger open.";
    if (file === "01-flow.jpg") return "Hall process page open.";
    if (file === "06-decide.jpg") return "Grouped. Let in or refuse.";
    if (file === "05-check.jpg") return "Paper checked tonight.";
    if (file === "02-arrive.jpg") return "Someone at the glass.";
    if (file === "03-omen.jpg") return "Broadcast on.";
    if (file === "10-slit.jpg") return "Door slit. Corridor.";
    return "Door desk. Key hook. Hand in before dawn. Broadcast slot empty.";
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
    if (who) who.textContent = D.PLAYER + " · " + D.STAFF + " · twenty-six · Liubu funeral hall";
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var night = $("night-mark");
    if (night) night.textContent = "Night " + state.night;
    var radio = $("radio");
    if (radio) {
      if (state.night <= 2) radio.textContent = "Broadcast slot empty. No omen on this layer.";
      else radio.textContent = state.omenRead ? ("Hall broadcast: " + (D.OMEN[state.night] || "")) : "Broadcast hiss. Open tonight's omen.";
    }
    var energy = $("energy");
    if (energy) energy.textContent = String(state.energy);
    var msg = $("msg");
    if (msg) msg.textContent = state.lastMessage || "Foreman Ke: omen counts tonight only. Group first, then rule. Door empty, hit next night. Hand the keys with an incomplete list, he will not count this shift.";
    var dw = $("dim-wage");
    if (dw) dw.textContent = String(state.dims.wage);
    var dm = $("dim-mind");
    if (dm) dm.textContent = String(state.dims.mind);
    var dr = $("dim-rep");
    if (dr) dr.textContent = String(state.dims.rep);
    var ds = $("dim-slit");
    if (ds) ds.textContent = String(state.dims.slit);
    var bag = $("pocket");
    if (bag) bag.textContent = state.pocket.length ? state.pocket.join(" · ") : "empty";
    var sil = $("silhouette");
    if (sil) {
      sil.textContent = state.current ? ("At the door: " + E.personName(state.current)) : "No one at the door. Hit next night.";
    }
    var admit = $("admit-list");
    if (admit) {
      var names = namesOf(state.admitList);
      admit.textContent = names.length ? names.join(", ") : "list empty";
    }
    var deny = $("deny-list");
    if (deny) {
      var dn = namesOf(state.denyList);
      deny.textContent = dn.length ? dn.join(", ") : "refuse empty";
    }
    var grouped = E.canDecide();
    var ba = $("btn-admit");
    var bd = $("btn-deny");
    if (ba) ba.disabled = !grouped;
    if (bd) bd.disabled = !grouped;
    var hint = $("group-hint");
    if (hint) {
      hint.textContent = grouped ? "Grouped. Let in or refuse." : "No group, no ruling. Broadcast alone is not enough.";
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
    var stillFile = stillFor(state);
    setImg(still, stillFile);
    var stillCap = $("still-bridge");
    if (stillCap) stillCap.textContent = stillBridge(stillFile);
    var endEl = $("ending-layer");
    if (endEl) {
      if (state.ending) {
        var c = endCopy(state.ending);
        endEl.className = "ending show";
        endEl.innerHTML = "<img src=\"jpeg/" + c.img + "\" alt=\"Hand-in\">" +
          "<p class=\"artifact-translation\">" + stillBridge(c.img) + "</p>" +
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
    if (rw) rw.onclick = function () { E.refusePrint("Wu Chengshan"); };
    var rg = $("refuse-wgx");
    if (rg) rg.onclick = function () { E.refusePrint("Wu Guixiang"); };
  }

  if (root.document) {
    if (root.document.readyState === "loading") {
      root.document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : global);
