"use strict";
(function (root) {
  var D = root.TIDU_DATA;
  var E = root.TIDU_ENGINE;

  function $(id) {
    return document.getElementById(id);
  }

  function optionHtml(list, empty) {
    var h = '<option value="">' + empty + "</option>";
    var i;
    for (i = 0; i < list.length; i++) {
      h += '<option value="' + list[i].id + '">' + list[i].label + "</option>";
    }
    return h;
  }

  function bindSelects() {
    var slots = D.SLOTS;
    var i, nSel, fSel;
    for (i = 0; i < slots.length; i++) {
      nSel = document.querySelector('select.slot-name[data-slot="' + slots[i].id + '"]');
      fSel = document.querySelector('select.slot-fate[data-slot="' + slots[i].id + '"]');
      if (nSel) {
        nSel.innerHTML = optionHtml(D.NAMES, "Name-status");
        nSel.onchange = (function (slot) {
          return function () {
            E.selectSlot(slot, true);
            E.fillName(this.value);
          };
        })(slots[i].id);
      }
      if (fSel) {
        fSel.innerHTML = optionHtml(D.FATES, "How gone");
        fSel.onchange = (function (slot) {
          return function () {
            E.selectSlot(slot, true);
            E.fillFate(this.value);
          };
        })(slots[i].id);
      }
    }
  }

  function setImg(el, file) {
    if (el) el.setAttribute("src", "jpeg/" + file);
  }

  function rejectText(code) {
    if (code === "cannot-name-abbot") return "The abbot does not enter a name-status slot.";
    if (code === "cannot-name-faname") return "A dharma name does not enter a household register.";
    if (code === "court-not-in-group") return "Literature. Not an operating guide. Not in this group.";
    if (code === "no-slot") return "Hit a place on the still first, then fill this row.";
    if (code === "hold-cancelled") return "You let go. Not filed.";
    if (code === "group-white") return "The sheet is still blank. No row is marked.";
    if (code === "gossip") return "Someone says the paper-effigy walks. Do not write it on the sheet.";
    if (code === "illegal-name" || code === "illegal-fate") return "This cell will not take it.";
    return "";
  }

  function renderDoc(state) {
    var prev = $("doc-preview");
    if (!prev) return;
    var doc = D.DOCS[state.lastDoc];
    if (!doc) {
      prev.innerHTML = "";
      return;
    }
    var h = '<article class="doc-sheet">';
    h += "<h3>" + doc.title + "</h3>";
    var i;
    for (i = 0; i < doc.lines.length; i++) {
      h += "<p>" + doc.lines[i] + "</p>";
    }
    if (doc.extra) h += '<p class="doc-extra">' + doc.extra + "</p>";
    if (doc.limits) h += '<p class="doc-limits">' + doc.limits + "</p>";
    h += "</article>";
    if (doc.img) {
      h += '<img src="jpeg/' + doc.img + '" alt="">';
      if (D.DOC_CAPTIONS && D.DOC_CAPTIONS[doc.img]) {
        h += '<p class="artifact-translation">' + D.DOC_CAPTIONS[doc.img] + "</p>";
      }
    }
    prev.innerHTML = h;
  }

  function render(state) {
    root.__TIDU__.state = state;
    var wage = $("wage");
    if (wage) wage.textContent = "¥" + state.wage;
    var sms = $("sms");
    if (sms) sms.textContent = state.sms;
    var reject = $("reject");
    if (reject) reject.textContent = rejectText(state.lastReject);
    var formImg = $("form-img");
    if (formImg) {
      if (state.locked) {
        setImg(formImg, "08-form-locked.jpg");
        formImg.classList.add("show-locked");
        formImg.removeAttribute("hidden");
      } else {
        formImg.classList.remove("show-locked");
        formImg.setAttribute("hidden", "hidden");
        formImg.removeAttribute("src");
      }
    }
    var still = $("still-img");
    if (still && state.entered) setImg(still, "01-still.jpg");
    var btn = $("btn-submit");
    if (btn) {
      if (state.locked) {
        btn.textContent = "Locked";
        btn.setAttribute("disabled", "disabled");
        btn.classList.remove("holding");
      } else if (state.endingId === "B") {
        btn.textContent = "File the spot-check · locked group";
        btn.classList.remove("holding");
        btn.setAttribute("disabled", "disabled");
      } else if (state.holding) {
        btn.textContent = "Hold…";
        btn.classList.add("holding");
        btn.removeAttribute("disabled");
      } else {
        btn.textContent = "File the spot-check · locked group";
        btn.classList.remove("holding");
        btn.removeAttribute("disabled");
      }
    }
    var table = $("lock-table");
    if (table) {
      if (state.locked) table.className = "lock-table frost";
      else table.className = "lock-table white";
    }
    var i, slot, row, nSel, fSel;
    for (i = 0; i < D.SLOTS.length; i++) {
      slot = D.SLOTS[i].id;
      row = document.querySelector('tr[data-slot="' + slot + '"]');
      if (row) {
        row.className = "";
        if (state.currentSlot === slot && !state.locked) row.className = "current";
        if (state.locked) row.className += (row.className ? " " : "") + "frost-row";
      }
      nSel = document.querySelector('select.slot-name[data-slot="' + slot + '"]');
      fSel = document.querySelector('select.slot-fate[data-slot="' + slot + '"]');
      if (nSel && nSel !== document.activeElement && nSel.value !== (state.rows[slot].nameId || "")) {
        nSel.value = state.rows[slot].nameId || "";
      }
      if (fSel && fSel !== document.activeElement && fSel.value !== (state.rows[slot].fateId || "")) {
        fSel.value = state.rows[slot].fateId || "";
      }
      if (nSel) nSel.disabled = !!state.locked || state.endingId === "B";
      if (fSel) fSel.disabled = !!state.locked || state.endingId === "B";
    }
    var end = $("ending");
    if (end) {
      if (state.endingId === "A" || state.endingId === "B") {
        var paras = E.endingCopy(state);
        var img = state.endingId === "A" ? "10-ending-a.jpg" : "";
        var title = state.endingId === "A" ? "A · Locked" : "B · Unlocked";
        var pay = state.endingId === "A" ? "Tonight's pay ¥36" : "Today's pay ¥0";
        var body = "";
        for (i = 0; i < paras.length; i++) body += "<p>" + paras[i] + "</p>";
        end.className = "ending show";
        end.innerHTML = (img ? '<img src="jpeg/' + img + '" alt=""><p class="artifact-translation">' + ((D.DOC_CAPTIONS && D.DOC_CAPTIONS[img]) || "") + "</p>" : "") +
          '<div class="end-copy"><h2>' + title + "</h2>" +
          body + "<p>" + pay + "</p>" +
          '<button type="button" id="btn-replay">Record this night again</button></div>';
        var rp = $("btn-replay");
        if (rp) rp.onclick = function () { replay(); };
      } else {
        end.className = "ending";
        end.innerHTML = "";
      }
    }
    var desk = $("desk");
    if (desk) {
      if (state.entered) {
        desk.classList.add("show");
        desk.style.display = "block";
      } else {
        desk.classList.remove("show");
        desk.style.display = "none";
      }
    }
    var clock = $("clock");
    if (clock) {
      var sec = Math.max(0, state.clock | 0);
      var mm = Math.floor(sec / 60);
      var ss = sec % 60;
      clock.textContent = "Until cutoff " + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;
    }
    renderDoc(state);
  }

  var TITLE_HTML = "";
  var clockTimer = null;

  function cacheTitle() {
    var t = $("title-layer");
    if (t) TITLE_HTML = t.outerHTML;
  }

  function unloadTitle() {
    var t = $("title-layer");
    if (t && t.parentNode) t.parentNode.removeChild(t);
  }

  function showDesk() {
    var desk = $("desk");
    if (!desk) return;
    desk.classList.add("show");
    desk.style.display = "block";
  }

  function hideDesk() {
    var desk = $("desk");
    if (!desk) return;
    desk.classList.remove("show");
    desk.style.display = "none";
  }

  function stopClock() {
    if (clockTimer) {
      clearInterval(clockTimer);
      clockTimer = null;
    }
  }

  function startClock() {
    stopClock();
    clockTimer = setInterval(function () {
      var st = E.getState();
      if (!st.entered || st.locked || st.endingId) {
        stopClock();
        return;
      }
      E.tickClock(1);
    }, 1000);
  }

  function restoreTitle() {
    stopClock();
    hideDesk();
    var end = $("ending");
    if (end) {
      end.className = "ending";
      end.innerHTML = "";
    }
    if ($("title-layer")) return;
    if (!TITLE_HTML) {
      TITLE_HTML = '<div id="title-layer"><img src="jpeg/00-open.jpg" alt="Inspection-room desk"><p class="lock-line">The three copies cannot still be the same person. Lock only if right. Wrong does not tell you which.</p><p class="who">Qiu Xiaoting. File a locked group tonight.</p><button type="button" id="btn-enter">Clock in</button></div>';
    }
    document.body.insertAdjacentHTML("afterbegin", TITLE_HTML);
    cacheTitle();
    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.onclick = function () { enter(); };
  }

  function enter() {
    E.enter();
    cacheTitle();
    unloadTitle();
    showDesk();
    startClock();
    return true;
  }

  function replay() {
    stopClock();
    E.replay();
    restoreTitle();
    return true;
  }

  function bindHits() {
    var map = {
      "hit-before": "slot-before-shu",
      "hit-absent": "slot-absent",
      "hit-shu": "slot-shu"
    };
    Object.keys(map).forEach(function (hid) {
      var el = $(hid);
      if (!el) return;
      el.onclick = function () {
        E.selectSlot(map[hid]);
      };
    });
  }

  function bindDocs() {
    function go(id) {
      return function () { E.openDoc(id); };
    }
    if ($("doc-hukou")) $("doc-hukou").onclick = go("doc-hukou");
    if ($("doc-dudie")) $("doc-dudie").onclick = go("doc-dudie");
    if ($("doc-dudie-fuye")) $("doc-dudie-fuye").onclick = go("doc-dudie-fuye");
    if ($("doc-shu")) $("doc-shu").onclick = go("doc-shu");
    if ($("doc-register")) $("doc-register").onclick = go("doc-register");
    if ($("doc-note")) $("doc-note").onclick = go("doc-note");
    if ($("doc-pay")) $("doc-pay").onclick = go("doc-pay");
  }

  function bindHold() {
    var btn = $("btn-submit");
    if (!btn) return;
    btn.oncontextmenu = function (ev) { ev.preventDefault(); };
    btn.onpointerdown = function (ev) {
      if (ev.button !== 0) return;
      ev.preventDefault();
      if (typeof btn.setPointerCapture === "function") {
        try { btn.setPointerCapture(ev.pointerId); } catch (e) {}
      }
      E.holdSubmit();
    };
    btn.onpointerup = function () { E.cancelHold(); };
    btn.onpointercancel = function () { E.cancelHold(); };
    btn.onlostpointercapture = function () {
      if (E.getState().holding) E.cancelHold();
    };
    btn.onmousedown = function (ev) {
      if (ev.button !== 0) return;
      if (ev.pointerType) return;
      E.holdSubmit();
    };
    btn.onmouseup = function (ev) {
      if (ev && ev.pointerType) return;
      E.cancelHold();
    };
    btn.ontouchstart = function (ev) {
      ev.preventDefault();
      E.holdSubmit();
    };
    btn.ontouchend = function () { E.cancelHold(); };
  }

  function bindKeys() {
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape") E.cancelHold();
      if (ev.code === "Space" && ev.target && ev.target.id === "btn-submit") {
        ev.preventDefault();
        E.holdSubmit();
      }
    });
    document.addEventListener("keyup", function (ev) {
      if (ev.code === "Space") E.cancelHold();
    });
  }

  function resumeIfSaved() {
    if (!E.loadSaved()) return false;
    var st = E.getState();
    if (!st.entered) return false;
    cacheTitle();
    unloadTitle();
    showDesk();
    if (!st.locked && !st.endingId) startClock();
    return true;
  }

  function boot() {
    bindSelects();
    bindHits();
    bindDocs();
    bindHold();
    bindKeys();
    cacheTitle();
    var enterBtn = $("btn-enter");
    if (enterBtn) enterBtn.onclick = function () { enter(); };
    var gossip = $("gossip");
    if (gossip) {
      gossip.onclick = function () {
        E.hearGossip();
        gossip.textContent = "Someone says the paper-effigy walks. Do not write it on the sheet.";
      };
    }
    E.setUi(render);
    resumeIfSaved();
    render(E.getState());
  }

  root.__TIDU__ = {
    enter: enter,
    selectSlot: E.selectSlot,
    fillName: E.fillName,
    fillFate: E.fillFate,
    openDoc: E.openDoc,
    holdComplete: E.holdComplete,
    cancelHold: E.cancelHold,
    jumpClock: E.jumpClock,
    holdSubmit: E.holdSubmit,
    replay: replay,
    tickClock: E.tickClock,
    hearGossip: E.hearGossip,
    endingCopy: E.endingCopy,
    state: E.getState()
  };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", boot);
    } else {
      boot();
    }
  }
})(typeof window !== "undefined" ? window : global);
