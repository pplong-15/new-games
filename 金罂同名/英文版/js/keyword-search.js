(function (global) {
  function normalizeQuery(raw) {
    var q = String(raw == null ? "" : raw).trim();
    if (!q) return { ok: false, kind: "empty" };
    if (/\s/.test(q)) return { ok: false, kind: "invalid" };
    if (/^[A-Za-z][A-Za-z0-9]*$/.test(q)) return { ok: true, q: q };
    if (/^\d{4}$/.test(q)) return { ok: true, q: q };
    if (/^[\u4e00-\u9fff]+$/.test(q)) return { ok: true, q: q };
    return { ok: false, kind: "invalid" };
  }

  function queryMatches(token, q) {
    if (token === q) return true;
    if (/^[A-Za-z0-9]+$/.test(token) && token.toLowerCase() === String(q).toLowerCase()) {
      return true;
    }
    return false;
  }

  function lookup(table, q) {
    var list = table || [];
    for (var i = 0; i < list.length; i++) {
      var row = list[i];
      var queries = row.queries || (row.query ? [row.query] : []);
      for (var k = 0; k < queries.length; k++) {
        if (queryMatches(queries[k], q)) return row;
      }
    }
    return null;
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function setForbiddenChrome(on) {
    var root = document.documentElement;
    if (on) {
      root.classList.remove("skin-search-results");
      root.classList.add("skin-forbidden");
    } else {
      root.classList.remove("skin-forbidden");
      root.classList.add("skin-search-results");
    }
  }

  function renderResults(mount, table) {
    var box = mount || document.querySelector(".box");
    if (!box) return;
    var params = new URLSearchParams(location.search);
    var checked = normalizeQuery(params.get("q"));

    if (!checked.ok) {
      setForbiddenChrome(false);
      box.innerHTML =
        "<h2>Lookup slip</h2><p class=\"miss\">The box takes one continuous token. Spaces, punctuation, and mixed junk return nothing.</p>";
      return;
    }

    var hit = lookup(table || global.KEYWORD_TABLE, checked.q);
    if (hit && hit.forbidden) {
      setForbiddenChrome(true);
      box.innerHTML =
        "<h2>This file is not open to night shift</h2><p>" +
        escapeHtml(hit.hidden || "Procedure notes stay off the duty machine.") +
        "</p>";
      return;
    }

    setForbiddenChrome(false);
    if (!hit) {
      box.innerHTML =
        "<h2>Lookup slip</h2><p class=\"miss\">No file matches \u00ab" +
        escapeHtml(checked.q) +
        "\u00bb. Try a name, a place, or a four-digit year as printed.</p>";
      return;
    }

    var hrefs = hit.hrefs || (hit.href ? [hit.href] : []);
    var titles = hit.titles || [];
    var blurbs = hit.blurbs || [];
    var links = "";
    for (var j = 0; j < hrefs.length; j++) {
      links +=
        "<div class=\"hit\"><a href=\"" +
        escapeHtml(hrefs[j]) +
        "\">" +
        escapeHtml(titles[j] || hrefs[j]) +
        "</a><p>" +
        escapeHtml(blurbs[j] || "") +
        "</p></div>";
    }
    box.innerHTML =
      "<h2>Lookup slip</h2><p>Machine found " +
      hrefs.length +
      " titles with this field:</p>" +
      links;
  }

  function bindSearchForms(root) {
    var scope = root || document;
    var forms = scope.querySelectorAll("#search-form");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", function (e) {
        var input = e.currentTarget.querySelector("#search-input, input[name='q']");
        var checked = normalizeQuery(input && input.value);
        if (!checked.ok) {
          e.preventDefault();
          var dest = e.currentTarget.getAttribute("action") || "../search-results.html";
          location.href = dest + (dest.indexOf("?") >= 0 ? "&" : "?") + "q=";
        }
      });
    }
  }

  global.WebSkinSearch = {
    normalizeQuery: normalizeQuery,
    lookup: lookup,
    renderResults: renderResults,
    bindSearchForms: bindSearchForms
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }

  function boot() {
    bindSearchForms(document);
    if (document.querySelector(".box") && global.KEYWORD_TABLE) {
      renderResults(document.querySelector(".box"), global.KEYWORD_TABLE);
    }
  }
})(window);
