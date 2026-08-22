(function () {
  var P = "gys_en_";
  function set(k, v) {
    try { localStorage.setItem(P + k, v); } catch (e) {}
  }
  function get(k) {
    try { return localStorage.getItem(P + k); } catch (e) { return null; }
  }
  window.gys = {
    set: set,
    get: get,
    mark: function (k) { set(k, "1"); },
    seen: function (k) { return get(k) === "1"; }
  };
})();
