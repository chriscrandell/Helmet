/*
  Helmet hub — section registry
  ------------------------------
  The ONE place to register a top-level section. main.html builds its tiles
  from this list, and the navigation bar on every page (assets/site-nav.js)
  builds its "Sections" menu from it too.

  To add a new section later:
    1. Create a folder (e.g. Homelab/) with an index.html — copy
       assets/_section-template.html as a starting point.
    2. Add an entry below. `href` is relative to the Helmet root folder.
    3. Pick an `icon` key from HELMET_ICONS (or add a new SVG path there).
  That's it — the hub and every page's nav pick it up automatically.

  status: free text shown as a small badge (e.g. "Active", "Planning").
  group:  sections are grouped on the hub under these headings, in the
          order groups first appear in this list.
*/

window.HELMET_SECTIONS = [
  {
    id: "robin",
    group: "Projects",
    title: "Project Robin",
    href: "ProjectWebpages/projects.html",
    folder: "ProjectWebpages/",
    icon: "car",
    status: "Active",
    desc: "1990 Mercedes 190E — M104 3.2 turbo build. Parts, budget, dependencies, torque specs and build log."
  },
  {
    id: "robot",
    group: "Projects",
    title: "Humanoid Robot",
    href: "Robot/index.html",
    folder: "Robot/",
    icon: "robot",
    status: "Design & parts planning",
    desc: "~18-inch Java-programmed humanoid on a Raspberry Pi 4 + Arduino Mega. Servo plan, sensing, build log."
  },
  {
    id: "codehunter",
    group: "Projects",
    title: "Code Hunter",
    href: "CodeHunter/index.html",
    folder: "CodeHunter/",
    icon: "game",
    status: "Concept",
    desc: "Game project — design doc, milestones and dev log."
  },
  {
    id: "income",
    group: "Ventures",
    title: "Second Income",
    href: "SecondIncome/index.html",
    folder: "SecondIncome/",
    icon: "chart",
    status: "Exploring",
    desc: "Pipeline for second-income ideas: score them, track the next step, and keep the ethics/tax checks in view."
  },
  {
    id: "knowledge",
    group: "Knowledge",
    title: "Knowledge Wiki",
    href: "Knowledge/index.html",
    folder: "Knowledge/",
    icon: "book",
    status: "Growing",
    desc: "Self-improvement library: CCNA/CCNP, Python, Java, JavaScript, SATCOM and the expeditionary comms smart book."
  }
];

/* 24x24 stroke icons (path data only). */
window.HELMET_ICONS = {
  car: "M5 16h14M3 13l2-5.5A2 2 0 0 1 6.9 6h10.2a2 2 0 0 1 1.9 1.5L21 13v4a1 1 0 0 1-1 1h-1.5M3 13v4a1 1 0 0 0 1 1h1.5M3 13h18M7 18.5a1.5 1.5 0 1 0 0-.01M17 18.5a1.5 1.5 0 1 0 0-.01",
  robot: "M12 3v3M8 6h8a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2ZM9.5 10.5h.01M14.5 10.5h.01M10 13.5h4M9 16v3M15 16v3M4 10v3M20 10v3",
  game: "M6 9h12a3 3 0 0 1 3 3v2a3 3 0 0 1-5.4 1.8L14.5 14h-5l-1.1 1.8A3 3 0 0 1 3 14v-2a3 3 0 0 1 3-3ZM8 11v2M7 12h2M15.5 11.5h.01M17 13h.01",
  chart: "M4 20h16M6 16l4-4 3 3 5-6M14 9h4v4",
  book: "M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5M8 7h8M8 10.5h6",
  folder: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z"
};
