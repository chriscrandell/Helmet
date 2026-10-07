/*
  Helmet hub — shared navigation bar + theme
  -------------------------------------------
  Include as the FIRST thing inside <body> on any page:
      <script src="../assets/site-nav.js"></script>
  (adjust ../ to reach the Helmet root). Options via data- attributes:
      data-theme="fixed"   page has its own fixed colour scheme (e.g. Project
                           Robin) — the bar still shows, the theme toggle doesn't.
      <body data-hub>      the hub itself — theme only, no bar.

  What it does:
    • remembers light/dark choice across every page (localStorage "helmetTheme")
    • adds a slim top bar: Helmet › Section › Page, a Sections menu built from
      assets/sections.js, and a light/dark button
  Self-contained: it injects its own styles, so it works on pages that use a
  different stylesheet.
*/
(function () {
  var script = document.currentScript;
  var src = script ? script.src : "";
  var root = src.replace(/assets\/site-nav\.js.*$/, "");
  var fixedTheme = script && script.getAttribute("data-theme") === "fixed";
  var THEME_KEY = "helmetTheme";

  function getTheme() {
    try { return localStorage.getItem(THEME_KEY) || "dark"; } catch (e) { return "dark"; }
  }
  function setTheme(t) {
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
    applyTheme();
  }
  function applyTheme() {
    if (!document.body) return;
    var light = !fixedTheme && getTheme() === "light";
    document.body.classList.add("toggle");
    document.body.classList.toggle("light", light);
    setTimeout(function () { document.body.classList.remove("toggle"); }, 20);
    var btn = document.getElementById("hx-theme");
    if (btn) btn.textContent = light ? "☾ Dark" : "☀ Light";
  }

  window.Helmet = {
    root: root,
    isLight: function () { return getTheme() === "light"; },
    toggleTheme: function () { setTheme(getTheme() === "light" ? "dark" : "light"); },
    setTheme: setTheme
  };

  applyTheme();

  function ensureSections(cb) {
    if (window.HELMET_SECTIONS) return cb();
    var s = document.createElement("script");
    s.src = root + "assets/sections.js";
    s.onload = cb;
    s.onerror = cb;
    document.head.appendChild(s);
  }

  var CSS =
    ".hx-bar{position:sticky;top:0;z-index:50;display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:9px 16px;" +
    "font:500 13.5px/1.4 Inter,'Segoe UI',Roboto,Arial,sans-serif;background:rgba(24,24,27,.86);color:#d4d4d8;" +
    "border-bottom:1px solid rgba(255,255,255,.1);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}" +
    ".hx-bar a{color:#d4d4d8;text-decoration:none}.hx-bar a:hover{color:#34d399;text-decoration:none}" +
    ".hx-brand{font-weight:700;color:#fff!important;letter-spacing:.02em}.hx-brand span{color:#10b981}" +
    ".hx-crumbs{display:flex;align-items:center;gap:8px;min-width:0;flex:1 1 auto;flex-wrap:wrap}" +
    ".hx-sep{opacity:.4}.hx-here{color:#a1a1aa;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:46vw}" +
    ".hx-right{display:flex;gap:8px;align-items:center;margin-left:auto}" +
    ".hx-menu{position:relative}.hx-menu summary{list-style:none;cursor:pointer;padding:5px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.14)}" +
    ".hx-menu summary::-webkit-details-marker{display:none}" +
    ".hx-menu[open] summary{border-color:rgba(52,211,153,.5);color:#34d399}" +
    ".hx-panel{position:absolute;right:0;top:calc(100% + 8px);min-width:250px;max-width:86vw;padding:8px;border-radius:14px;" +
    "background:#1f1f23;border:1px solid rgba(255,255,255,.12);box-shadow:0 18px 40px rgba(0,0,0,.4)}" +
    ".hx-group{font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:#71717a;padding:8px 10px 4px}" +
    ".hx-panel a{display:block;padding:7px 10px;border-radius:9px}.hx-panel a:hover{background:rgba(52,211,153,.1)}" +
    ".hx-panel a.hx-cur{color:#34d399}" +
    ".hx-btn{cursor:pointer;padding:5px 11px;border-radius:999px;border:1px solid rgba(255,255,255,.14);background:transparent;color:inherit;font:inherit}" +
    ".hx-btn:hover{border-color:rgba(52,211,153,.5);color:#34d399}" +
    "body.light .hx-bar{background:rgba(250,250,250,.88);color:#3f3f46;border-bottom-color:rgba(24,24,27,.1)}" +
    "body.light .hx-bar a{color:#3f3f46}body.light .hx-brand{color:#18181b!important}body.light .hx-here{color:#71717a}" +
    "body.light .hx-menu summary,body.light .hx-btn{border-color:rgba(24,24,27,.15)}" +
    "body.light .hx-panel{background:#fff;border-color:rgba(24,24,27,.12);box-shadow:0 18px 40px rgba(24,24,27,.12)}" +
    "@media (max-width:560px){.hx-here{display:none}.hx-sep.hx-last{display:none}}";

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function renderBar() {
    if (document.body.hasAttribute("data-hub")) return;
    var sections = window.HELMET_SECTIONS || [];
    var here = location.href.split(/[?#]/)[0];
    var current = null;
    sections.forEach(function (s) {
      if (here.indexOf(root + s.folder) === 0) current = s;
    });

    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var crumbs = '<a class="hx-brand" href="' + root + 'main.html"><span>◆</span> Helmet</a>';
    if (current) {
      crumbs += '<span class="hx-sep">›</span><a href="' + root + current.href + '">' + esc(current.title) + "</a>";
      var isSectionHome = here === root + current.href;
      var pageTitle = document.body.getAttribute("data-page-title") || document.title;
      if (!isSectionHome && pageTitle) {
        crumbs += '<span class="hx-sep hx-last">›</span><span class="hx-here">' + esc(pageTitle) + "</span>";
      }
    }

    var groups = [];
    var byGroup = {};
    sections.forEach(function (s) {
      if (!byGroup[s.group]) { byGroup[s.group] = []; groups.push(s.group); }
      byGroup[s.group].push(s);
    });
    var menu = groups.map(function (g) {
      return '<div class="hx-group">' + esc(g) + "</div>" + byGroup[g].map(function (s) {
        return '<a href="' + root + s.href + '"' + (current && current.id === s.id ? ' class="hx-cur"' : "") + ">" + esc(s.title) + "</a>";
      }).join("");
    }).join("");

    var bar = document.createElement("nav");
    bar.className = "hx-bar";
    bar.setAttribute("aria-label", "Site");
    bar.innerHTML =
      '<div class="hx-crumbs">' + crumbs + "</div>" +
      '<div class="hx-right">' +
      '<details class="hx-menu"><summary>Sections ▾</summary><div class="hx-panel">' +
      '<a href="' + root + 'main.html">⌂ Hub home</a>' + menu + "</div></details>" +
      (fixedTheme ? "" : '<button type="button" class="hx-btn" id="hx-theme"></button>') +
      "</div>";
    document.body.insertBefore(bar, document.body.firstChild);

    var btn = document.getElementById("hx-theme");
    if (btn) btn.addEventListener("click", window.Helmet.toggleTheme);
    applyTheme();

    document.addEventListener("click", function (e) {
      var d = bar.querySelector(".hx-menu");
      if (d && d.open && !d.contains(e.target)) d.open = false;
    });
  }

  function start() { ensureSections(renderBar); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
