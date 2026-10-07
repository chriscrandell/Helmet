<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Helmet — Hub</title>
<link rel="stylesheet" href="tiles.css">
<style>
  /* Hub layout on top of the original tile styles in tiles.css */
  body { display: block; overflow-x: hidden; overflow-y: auto; }
  body:before { position: fixed; pointer-events: none; }
  .hub { position: relative; z-index: 1; max-width: 1040px; margin: 0 auto; padding: 72px 16px 64px; }
  .hub-head h1 { margin: 0; font: 700 2rem/1.2 Inter, Arial, sans-serif; color: var(--card-label-color); letter-spacing: .01em; }
  .hub-head h1 span { color: #10B981; }
  .hub-head p { margin: 8px 0 0; color: var(--text-color); font: 15px/1.6 Inter, Arial, sans-serif; max-width: 60ch; }
  .hub-group { margin-top: 40px; }
  .hub-group h2 { margin: 0 0 16px; font: 600 12px/1 Inter, Arial, sans-serif; letter-spacing: .12em; text-transform: uppercase; color: var(--text-color); opacity: .8; }
  .hub .grid { grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 24px; }
  .hub .card { display: block; text-decoration: none; color: inherit; min-height: 210px; }
  .hub .card .status {
    position: absolute; top: 18px; right: 16px; z-index: 2;
    font: 600 11px/1 Inter, Arial, sans-serif; padding: 5px 9px; border-radius: 999px;
    color: var(--card-hover-icon-color); background: var(--card-hover-icon-background-color); border: 1px solid var(--card-hover-icon-border-color);
  }
  .hub-foot { margin-top: 48px; color: var(--text-color); font: 13px/1.6 Inter, Arial, sans-serif; opacity: .75; }
  .hub-foot code { font-family: Consolas, monospace; }
  .day-night { position: fixed; z-index: 5; }
  @media (max-width: 560px) { .hub { padding-top: 56px; } .hub-head h1 { font-size: 1.6rem; } }
</style>
</head>
<body data-hub>
<script src="assets/site-nav.js"></script>

  <label class="day-night" title="Light / dark">
    <input type="checkbox" checked />
    <div></div>
  </label>

  <main class="hub">
    <header class="hub-head">
      <h1><span>◆</span> Helmet</h1>
      <p>Projects, ventures and the knowledge library in one place. Every page has the same bar at the top, so you can get back here from anywhere.</p>
    </header>

    <div id="hub-groups"></div>

    <p class="hub-foot">To add a new section, make a folder with an <code>index.html</code> (copy <code>assets/_section-template.html</code>) and add one entry to <code>assets/sections.js</code>. It shows up here and in every page's Sections menu.</p>
  </main>

<script src="assets/sections.js"></script>
<script>
  (function () {
    var sections = window.HELMET_SECTIONS || [];
    var icons = window.HELMET_ICONS || {};
    var groups = [], byGroup = {};
    sections.forEach(function (s) {
      if (!byGroup[s.group]) { byGroup[s.group] = []; groups.push(s.group); }
      byGroup[s.group].push(s);
    });
    var tiles = "";
    for (var i = 1; i <= 10; i++) tiles += '<div class="tile tile-' + i + '"></div>';
    function card(s) {
      return '<a class="card" href="' + s.href + '">' +
        (s.status ? '<span class="status">' + s.status + "</span>" : "") +
        '<span class="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="' + (icons[s.icon] || icons.folder) + '"/></svg></span>' +
        "<h4>" + s.title + "</h4><p>" + s.desc + "</p>" +
        '<div class="shine"></div><div class="background"><div class="tiles">' + tiles + "</div>" +
        '<div class="line line-1"></div><div class="line line-2"></div><div class="line line-3"></div></div></a>';
    }
    document.getElementById("hub-groups").innerHTML = groups.map(function (g) {
      return '<section class="hub-group"><h2>' + g + '</h2><div class="grid">' + byGroup[g].map(card).join("") + "</div></section>";
    }).join("");

    var box = document.querySelector(".day-night input");
    box.checked = !window.Helmet.isLight();
    box.addEventListener("change", function () { window.Helmet.setTheme(box.checked ? "dark" : "light"); });
  })();
</script>
</body>
</html>
