(function (w) {
  var KEY = "xinpugai-20260821-en";

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (e) {
      return {};
    }
  }

  function write(s) {
    localStorage.setItem(KEY, JSON.stringify(s));
  }

  function add(id) {
    var s = read();
    s.tokens = s.tokens || [];
    if (s.tokens.indexOf(id) < 0) s.tokens.push(id);
    write(s);
    return s;
  }

  function has(id) {
    var s = read();
    return (s.tokens || []).indexOf(id) >= 0;
  }

  function setFlag(k, v) {
    var s = read();
    s[k] = v;
    write(s);
  }

  function reset() {
    localStorage.removeItem(KEY);
  }

  function canSlip() {
    return has("cmp-erase") && (has("cmp-reason") || has("cmp-year"));
  }

  function pickEnding(form) {
    if (form.extra === "share" || form.extra === "stop") return "bounced";
    if (
      form.dirt === "paint" &&
      form.line === "move" &&
      form.proof === "hukou" &&
      form.extra === "lineonly"
    ) {
      return "hung";
    }
    return "painted";
  }

  function openedBits() {
    return {
      neu: has("v-new"),
      old: has("v-old"),
      hk: has("v-hk"),
      bbs: has("v-bbs"),
      draft: has("v-draft"),
      east: has("v-east"),
      factory: has("v-factory"),
      borrow: has("v-borrow"),
      erase: has("cmp-erase"),
      reason: has("cmp-reason"),
      year: has("cmp-year"),
      move: has("cmp-move"),
      slip: canSlip()
    };
  }

  w.XP = {
    add: add,
    has: has,
    read: read,
    setFlag: setFlag,
    reset: reset,
    canSlip: canSlip,
    pickEnding: pickEnding,
    openedBits: openedBits
  };
})(window);
