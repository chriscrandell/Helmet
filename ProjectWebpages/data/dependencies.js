/*
  Project Robin — dependency/readiness rules
  ---------------------------------------------
  Each rule lists the part ids (from data/parts.js) that must be at or past
  a given status before a milestone is safe to attempt. These are checked
  live against the current parts data (seed + your localStorage edits), so
  the checklist here and on dependency-tracking.html always reflects real
  status, not a hardcoded snapshot.

  readyStatuses: which statuses count as "this requirement is satisfied".
*/

window.ROBIN_DEPENDENCIES = [
  {
    id: "turbo-install",
    title: "Turbo install readiness",
    description: "Everything the turbo needs in place before it goes on the engine.",
    readyStatuses: ["installed", "purchased"],
    requirements: [
      { partId: "turbo-oil-feed-return", label: "Oil feed & return lines" },
      { partId: "wastegate-boost-control", label: "Wastegate & boost control hardware" },
      { partId: "standalone-ecu", label: "ECU mapping & harness validation" },
      { partId: "exhaust-system", label: "Downpipe / exhaust path" },
      { partId: "oil-pan-pickup", label: "Turbo oil-drain point / pan fitment" },
      { partId: "intercooler-piping", label: "Intercooler & charge piping" },
      { partId: "intake-bov", label: "Intake & bypass valve" }
    ]
  },
  {
    id: "engine-swap-start",
    title: "Engine swap — ready to fire",
    description: "Core dependencies before the M104 is started for the first time in the car.",
    readyStatuses: ["installed", "purchased"],
    requirements: [
      { partId: "m104-long-block", label: "M104 long block" },
      { partId: "engine-mounts-swap", label: "Mounts / cradle adaptation" },
      { partId: "wiring-harness-adaptation", label: "Wiring harness adaptation" },
      { partId: "standalone-ecu", label: "ECU mapping & harness validation" },
      { partId: "cooling-system-upgrade", label: "Cooling system" },
      { partId: "fuel-system-upgrade", label: "Fuel system" },
      { partId: "m104-refresh-kit", label: "M104 refresh done on the stand" },
      { partId: "oil-pan-pickup", label: "Oil pan / pickup clears the crossmember" },
      { partId: "ac-adaptation", label: "A/C brackets & lines" },
      { partId: "ps-adaptation", label: "Power steering pump & lines" }
    ]
  },
  {
    id: "ride-height-adjustable",
    title: "Adjustable ride height ready",
    description: "Suspension pieces needed before the air-cup ride height adjustment can be used.",
    readyStatuses: ["installed"],
    requirements: [
      { partId: "bilstein-b8-air-cups", label: "Bilstein B8 struts/shocks + air cups" }
    ]
  },
  // ---- Added 2026-10-07 from the build review ----
  {
    id: "drivetrain-ready",
    title: "Drivetrain ready for M104 turbo power",
    description: "Everything behind the engine sized for ~300–350 hp before the car sees boost.",
    readyStatuses: ["installed", "purchased"],
    requirements: [
      { partId: "transmission-match", label: "Transmission" },
      { partId: "clutch-flywheel", label: "Clutch / flywheel / hydraulics (manual only)" },
      { partId: "driveshaft", label: "Driveshaft" },
      { partId: "rear-diff-lsd", label: "Rear diff + LSD" },
      { partId: "rear-axles-bushings", label: "Half-shafts & subframe/diff mounts" }
    ]
  },
  {
    id: "first-tune",
    title: "Ready for first tune",
    description: "What has to be on the car before tuner/dyno time is booked.",
    readyStatuses: ["installed"],
    requirements: [
      { partId: "standalone-ecu", label: "Standalone ECU" },
      { partId: "wideband-gauges", label: "Wideband O2 + oil/boost gauges" },
      { partId: "fuel-system-upgrade", label: "Fuel system" },
      { partId: "intake-bov", label: "Intake & bypass valve" },
      { partId: "exhaust-system", label: "Exhaust" },
      { partId: "charging-grounds", label: "Charging system & grounds" }
    ]
  },
  {
    id: "wheel-brake-fitment",
    title: "Wheel / tire / brake fitment locked",
    description: "Buy these as a matched set. Brake size, wheel diameter/offset and lug seat all have to agree.",
    readyStatuses: ["installed", "purchased", "ordered"],
    requirements: [
      { partId: "brake-refresh", label: "Brake package" },
      { partId: "sparco-terra-wheels", label: "Sparco Terra wheels" },
      { partId: "lug-bolts-hubrings", label: "Correct-seat lug bolts + hub rings" },
      { partId: "tires", label: "Tires" }
    ]
  },
  {
    id: "event-ready",
    title: "Autocross / hill-climb event ready",
    description: "Track-ready-in-minutes baseline for the first event.",
    readyStatuses: ["installed"],
    requirements: [
      { partId: "safety-kit", label: "Safety basics" },
      { partId: "brake-lines-fluid", label: "Brake lines & high-temp fluid" },
      { partId: "front-arms-bushings", label: "Arms, bushings & sway bars" },
      { partId: "bilstein-b8-air-cups", label: "Bilstein B8 + air cups" },
      { partId: "alignment-corner-balance", label: "Alignment + corner balance" },
      { partId: "tires", label: "Tires" }
    ]
  }
];
