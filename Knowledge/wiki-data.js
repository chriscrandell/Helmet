/*
  Knowledge wiki — page registry
  -------------------------------
  The wiki main page (index.html) and every page's sidebar, search and
  prev/next links are built from this list.

  To add a page:
    1. Copy _template.html to a new file in this folder (e.g. ospf-deep-dive.html).
    2. Add an entry under the right category below with file, title, summary.
    3. Optional: status "planned" lists a page before it exists (shown greyed
       out and not clickable). Switch it to "draft" or "solid" once written.

  status: "solid" (reviewed, reliable) | "draft" (started, still growing) | "planned"
*/
window.WIKI = {
  categories: [
    {
      id: "networking",
      title: "Networking — Cisco track",
      blurb: "CCNA → CCNP Enterprise, plus the quick references used on the job.",
      pages: [
        { file: "ccna.html", title: "CCNA (200-301)", status: "draft", summary: "Exam blueprints (v1.1 and v2.0), study checklist and core IOS commands." },
        { file: "ccnp-enterprise.html", title: "CCNP Enterprise", status: "draft", summary: "ENCOR core + concentration exams, domains and a study path." },
        { file: "subnetting.html", title: "Subnetting & IPv4/IPv6", status: "solid", summary: "Prefix table, the block-size method, special ranges, IPv6 basics and a calculator." },
        { file: "routing-protocols.html", title: "Routing protocols", status: "solid", summary: "Administrative distance, OSPF, EIGRP and BGP quick reference." },
        { file: "switching.html", title: "Switching & switch-port checks", status: "solid", summary: "VLANs, trunks, STP, EtherChannel and the port-check command sequence." }
      ]
    },
    {
      id: "programming",
      title: "Programming",
      blurb: "Language references and learning paths, tied to real uses: automation, tools, web.",
      pages: [
        { file: "python.html", title: "Python", status: "draft", summary: "Syntax cheat sheet, idioms, Flask, and network automation with ipaddress/Netmiko." },
        { file: "java.html", title: "Java", status: "draft", summary: "Core syntax, collections & streams, Spring Boot REST + JPA, testing." },
        { file: "javascript.html", title: "JavaScript", status: "draft", summary: "Modern syntax, async/await, the DOM, Node and the road to TypeScript/Angular." }
      ]
    },
    {
      id: "satcom",
      title: "Satellite communications",
      blurb: "Orbits, bands, link budgets and getting a terminal on the bird.",
      pages: [
        { file: "satcom-fundamentals.html", title: "SATCOM fundamentals", status: "solid", summary: "Orbits, frequency bands, polarization, latency and impairments." },
        { file: "link-budget.html", title: "Link budget", status: "solid", summary: "EIRP, path loss, G/T, C/N₀, Eb/N₀ and margin, with a calculator." },
        { file: "terminal-ops.html", title: "Terminal setup & look angles", status: "draft", summary: "Site survey → pointing → peaking → commissioning, with a GEO look-angle calculator." },
        { file: "military-satcom-systems.html", title: "Military SATCOM systems overview", status: "planned", summary: "WGS, MUOS, AEHF and commercial augmentation, from public sources." }
      ]
    },
    {
      id: "excomm",
      title: "Expeditionary comms smart book",
      blurb: "The 100/200/300-level pipeline material and pocket-reference content.",
      pages: [
        { file: "smartbook-overview.html", title: "Smart book overview", status: "draft", summary: "How the 100/200/300 levels are organized and where each topic lives." },
        { file: "rf-fundamentals.html", title: "RF fundamentals", status: "solid", summary: "Spectrum, dB math, antennas, VSWR, LOS, Fresnel zones." },
        { file: "hf-comms.html", title: "HF communications", status: "solid", summary: "Ionosphere, MUF/LUF/FOT, NVIS, antennas and ALE." },
        { file: "power-planning.html", title: "Power planning", status: "solid", summary: "Equipment draw vs generator capacity, with a load calculator." },
        { file: "troubleshooting.html", title: "Troubleshooting methodology", status: "solid", summary: "A repeatable process and layer-by-layer checks with commands." },
        { file: "antenna-selection.html", title: "Antenna selection & emissions", status: "planned", summary: "Omni vs directional against a near-peer threat, from the white paper." },
        { file: "prc-163.html", title: "PRC-163 (300-level model)", status: "planned", summary: "Built from approved TMs and the course material." },
        { file: "cabling.html", title: "Cabling & connectors", status: "planned", summary: "Copper, fiber, termination and testing." },
        { file: "virtualization.html", title: "Virtualization (VMware / Proxmox)", status: "planned", summary: "Hypervisors, vSwitches, storage, snapshots." },
        { file: "linux-rhel.html", title: "Linux / RHEL", status: "planned", summary: "Admin essentials, services, firewall, SELinux." },
        { file: "active-directory.html", title: "Active Directory & client support", status: "planned", summary: "Users, groups, GPO, DNS/DHCP, file & print." },
        { file: "comsec-basics.html", title: "Encryption & COMSEC basics", status: "planned", summary: "Unclassified concepts only; procedures per unit COMSEC manager." },
        { file: "spectrum-analysis.html", title: "Spectrum analysis", status: "planned", summary: "Reading a spectrum analyzer, interference hunting." },
        { file: "packet-inspection.html", title: "Packet inspection", status: "planned", summary: "Wireshark/tcpdump workflows and filters." }
      ]
    },
    {
      id: "growth",
      title: "Personal development",
      blurb: "Education, certifications and the habits that move them forward.",
      pages: [
        { file: "study-plan.html", title: "Study plan & cert roadmap", status: "draft", summary: "Degree and certification goals, with a study log." }
      ]
    }
  ]
};
