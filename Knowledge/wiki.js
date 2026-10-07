/*
  Knowledge wiki — page chrome
  -----------------------------
  On a wiki page (body[data-wiki]) this builds the sidebar (search +
  category tree), an "On this page" contents box from the <h2>s, a status
  badge, prev/next links within the category, and a "My notes" box saved in
  this browser per page. Page content itself is plain HTML in each file.
*/
(function () {
  var W = window.WIKI || { categories: [] };
  var file = decodeURIComponent(location.pathname.split("/").pop() || "index.html");
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  var STATUS = { solid: ["Solid", ""], draft: ["Draft", "warn"], planned: ["Planned", "muted"] };

  var all = [];
  W.categories.forEach(function (c) { c.pages.forEach(function (p) { all.push({ cat: c, page: p }); }); });
  var me = all.filter(function (x) { return x.page.file === file; })[0];

  function sidebarHtml() {
    return '<input type="search" id="wiki-search" placeholder="Search the wiki…" aria-label="Search the wiki">' +
      '<div id="wiki-results"></div>' +
      '<nav class="wiki-tree"><a class="wiki-home" href="index.html">⌂ Wiki main page</a>' +
      W.categories.map(function (c) {
        return '<div class="wiki-cat"><div class="wiki-cat-title">' + esc(c.title) + "</div>" +
          c.pages.map(function (p) {
            if (p.status === "planned") return '<span class="wiki-link planned">' + esc(p.title) + "</span>";
            return '<a class="wiki-link' + (p.file === file ? " current" : "") + '" href="' + p.file + '">' + esc(p.title) + "</a>";
          }).join("") + "</div>";
      }).join("") + "</nav>";
  }

  function wireSearch(root) {
    var input = root.querySelector("#wiki-search");
    var out = root.querySelector("#wiki-results");
    if (!input) return;
    input.addEventListener("input", function () {
      var q = input.value.trim().toLowerCase();
      if (!q) { out.innerHTML = ""; return; }
      var hits = all.filter(function (x) {
        return (x.page.title + " " + x.page.summary + " " + x.cat.title).toLowerCase().indexOf(q) !== -1;
      });
      out.innerHTML = hits.length ? hits.map(function (x) {
        return x.page.status === "planned"
          ? '<span class="wiki-hit planned">' + esc(x.page.title) + " <em>(planned)</em></span>"
          : '<a class="wiki-hit" href="' + x.page.file + '">' + esc(x.page.title) + "<small>" + esc(x.page.summary) + "</small></a>";
      }).join("") : '<span class="wiki-hit planned">No matches</span>';
    });
  }
  window.WikiSearch = wireSearch;

  function buildPage() {
    var article = document.querySelector(".wiki-article");
    if (!article) return;
    var side = document.getElementById("wiki-side");
    side.innerHTML = '<details class="wiki-side-toggle" open><summary>Wiki contents</summary>' + sidebarHtml() + "</details>";
    if (window.matchMedia("(max-width: 860px)").matches) side.querySelector("details").open = false;
    wireSearch(side);

    // header meta
    var h1 = article.querySelector("h1");
    if (me && h1) {
      var st = STATUS[me.page.status] || STATUS.draft;
      h1.insertAdjacentHTML("beforebegin", '<div class="eyebrow">' + esc(me.cat.title) + "</div>");
      h1.insertAdjacentHTML("beforeend", ' <span class="badge ' + st[1] + '">' + st[0] + "</span>");
    }

    // TOC
    var heads = article.querySelectorAll("h2");
    if (heads.length > 2) {
      var toc = '<nav class="wiki-toc"><strong>On this page</strong><ol>';
      heads.forEach(function (h, i) {
        if (!h.id) h.id = "s" + (i + 1) + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        toc += '<li><a href="#' + h.id + '">' + esc(h.textContent) + "</a></li>";
      });
      toc += "</ol></nav>";
      var lead = article.querySelector(".lead") || h1;
      lead.insertAdjacentHTML("afterend", toc);
    }

    // My notes
    var key = "wikiNotes:" + file;
    var saved = "";
    try { saved = localStorage.getItem(key) || ""; } catch (e) {}
    article.insertAdjacentHTML("beforeend",
      '<section class="wiki-notes"><h2 id="my-notes">My notes</h2>' +
      '<p class="small muted">Saved in this browser as you type. Anything worth keeping long-term belongs in the page itself: edit <code>Knowledge/' + esc(file) + "</code>.</p>" +
      '<textarea id="wiki-notes" rows="6" placeholder="Notes, gotchas, links, things to look up…"></textarea>' +
      '<p class="small muted" id="wiki-notes-state"></p></section>');
    var ta = document.getElementById("wiki-notes");
    ta.value = saved;
    var t;
    ta.addEventListener("input", function () {
      clearTimeout(t);
      t = setTimeout(function () {
        try { localStorage.setItem(key, ta.value); document.getElementById("wiki-notes-state").textContent = "Saved."; } catch (e) {}
      }, 300);
    });

    // prev / next
    if (me) {
      var list = me.cat.pages.filter(function (p) { return p.status !== "planned"; });
      var i = list.map(function (p) { return p.file; }).indexOf(file);
      var prev = list[i - 1], next = list[i + 1];
      article.insertAdjacentHTML("beforeend", '<nav class="wiki-pager">' +
        (prev ? '<a href="' + prev.file + '">← ' + esc(prev.title) + "</a>" : "<span></span>") +
        (next ? '<a href="' + next.file + '">' + esc(next.title) + " →</a>" : "<span></span>") + "</nav>");
    }
  }

  if (document.body.hasAttribute("data-wiki")) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", buildPage);
    else buildPage();
  }
})();
