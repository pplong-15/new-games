(function (global) {
  function normalizeQuery(raw) {
    var q = String(raw == null ? "" : raw).trim();
    if (!q) return { ok: false, kind: "empty" };
    if (/\s/.test(q)) return { ok: false, kind: "invalid" };
    if (!/^[A-Za-z][A-Za-z'-]*$/.test(q)) return { ok: false, kind: "invalid" };
    return { ok: true, q: q };
  }

  function lookup(table, q) {
    var list = table || [];
    for (var i = 0; i < list.length; i++) {
      var row = list[i];
      var queries = row.queries || (row.query ? [row.query] : []);
      if (queries.indexOf(q) !== -1) return row;
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
    var footerNo = document.querySelector("[data-page-no]");
    if (footerNo) footerNo.textContent = "-";

    if (!checked.ok) {
      setForbiddenChrome(false);
      box.innerHTML =
        "<h2>Search results</h2><p class=\"miss\">Sorry, no matching results. Search one word at a time.</p>";
      return;
    }

    var hit = lookup(table || global.KEYWORD_TABLE, checked.q);
    if (hit && hit.forbidden) {
      setForbiddenChrome(true);
      if (footerNo) footerNo.textContent = "ex/" + (footerNo.getAttribute("data-total") || "36");
      box.innerHTML =
        "<h2>This file is forbidden</h2><p><span class=\"hidden-ink\">" +
        escapeHtml(hit.hidden || "") +
        "</span></p>";
      return;
    }

    setForbiddenChrome(false);
    if (!hit) {
      box.innerHTML =
        "<h2>Search results</h2><p class=\"miss\">Sorry, no results for \"" +
        escapeHtml(checked.q) +
        "\".</p>";
      return;
    }

    var hrefs = hit.hrefs || (hit.href ? [hit.href] : []);
    var titles = hit.titles || [];
    var links = "";
    for (var j = 0; j < hrefs.length; j++) {
      links +=
        "<a href=\"" +
        escapeHtml(hrefs[j]) +
        "\">" +
        escapeHtml(titles[j] || hrefs[j]) +
        "</a>";
    }
    box.innerHTML =
      "<h2>Search results</h2><p>" +
      hrefs.length +
      " matching result(s):</p>" +
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
          var dest = e.currentTarget.getAttribute("action") || "search-results.html";
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
