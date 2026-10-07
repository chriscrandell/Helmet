/*
  Project Robin — build review (pre-purchase gap check)
  --------------------------------------------------------
  Added 2026-10-07. Items a turbo M104-into-W201 swap typically needs that
  were NOT yet in data/parts.js. Nothing here is in the parts database until
  you press "Accept" on build-review.html — accepted items are added to the
  parts list (in your browser's localStorage) with the id shown here, so the
  milestone checks in data/dependencies.js pick them up automatically.

  estCost values are rough planning guesses only (shown as "est."), same as
  the starter parts. Fitment claims marked "verify" are things to confirm on
  the actual donor/car, not settled facts.
*/

window.ROBIN_REVIEW_ITEMS = [
  // ---- Drivetrain ----
  { id: "rear-diff-lsd", name: "Rear differential upgrade + limited-slip", subsystem: "Drivetrain", estCost: 1200, recommendation: "Preferred",
    why: "The diff that came behind the 1.8 M102 is the weakest link once you're making ~3x the power. A larger-case W201/W124 diff is the usual path, and an LSD is the single biggest traction gain for autocross and hill climb. Ratio choice also sets how the small turbo's powerband lines up with corner exits." },
  { id: "driveshaft", name: "Driveshaft (length/flange match + new flex discs & center bearing)", subsystem: "Drivetrain", estCost: 500, recommendation: "Preferred",
    why: "Changing the transmission and/or diff usually changes length and flange type. Old flex discs and center bearings are cheap insurance at this point." },
  { id: "clutch-flywheel", name: "Clutch, flywheel & clutch hydraulics (if manual)", subsystem: "Drivetrain", estCost: 700, recommendation: "Acceptable",
    why: "Depends on the manual-vs-auto decision. A turbo-torque-rated clutch and fresh master/slave cylinders go in at the same time as the trans." },
  { id: "rear-axles-bushings", name: "Rear half-shafts + subframe & diff mount bushings", subsystem: "Drivetrain", estCost: 400, recommendation: "Acceptable",
    why: "Worn subframe/diff mounts give axle tramp and wheel hop under boost; half-shafts must match the diff you end up with." },

  // ---- Engine & turbo reliability ----
  { id: "m104-refresh-kit", name: "M104 refresh before install (head gasket, timing chain/guides, water pump, thermostat, seals)", subsystem: "Powertrain", estCost: 900, recommendation: "Preferred",
    why: "A used W210 donor is an unknown. The M104 head-gasket oil leak is a well-known weak point — far easier to fix on the stand than in the car. Fits your reliability-first priority." },
  { id: "head-studs-gasket", name: "Head studs + boost-rated head gasket", subsystem: "Powertrain", estCost: 400, recommendation: "Preferred",
    why: "The M104 was built as a high-compression naturally aspirated engine. Clamping load is cheap insurance under boost. Ties into the 'stock internals vs. built' decision below." },
  { id: "oil-pan-pickup", name: "Oil pan / pickup fitment + turbo oil-drain bung", subsystem: "Powertrain", estCost: 350, recommendation: "Preferred",
    why: "Verify: the W210 sump and pickup may not clear the W201 front crossmember/steering. The turbo return needs a drain point above the oil level. Sustained cornering on hill climbs also argues for baffling." },
  { id: "intake-bov", name: "Intake, air filter & bypass/blow-off valve", subsystem: "Turbo", estCost: 300, recommendation: "Acceptable",
    why: "Turbo inlet plumbing and a recirculating bypass valve aren't covered by the 'turbo kit' or 'intercooler piping' entries." },
  { id: "wideband-gauges", name: "Wideband O2 + boost / oil pressure / oil temp gauges", subsystem: "Electrical", estCost: 450, recommendation: "Preferred",
    why: "A wideband is required before any tuning. Oil pressure and temperature are the early warnings that protect the engine on a long hill-climb pull." },
  { id: "dyno-tune", name: "Professional dyno tune (service)", subsystem: "Electrical", estCost: 800, recommendation: "Preferred",
    why: "Budget line for tuner time on the standalone ECU. One of the jobs you'd likely outsource." },

  // ---- Retained comfort systems (AC / power steering / charging) ----
  { id: "ac-adaptation", name: "A/C compressor bracket & line adaptation", subsystem: "Cooling", estCost: 500, recommendation: "Preferred",
    why: "You're keeping A/C. The W210 accessory layout and turbo plumbing will fight the W201 A/C routing, so plan for custom lines/brackets and a recharge." },
  { id: "ps-adaptation", name: "Power steering pump & line adaptation", subsystem: "Steering", estCost: 250, recommendation: "Preferred",
    why: "You're keeping power steering. The pump position on the M104 and hose routing past the turbo manifold need sorting." },
  { id: "charging-grounds", name: "Charging system: alternator capacity, battery & grounds", subsystem: "Electrical", estCost: 300, recommendation: "Acceptable",
    why: "Electric fans, a fuel pump upgrade, the ECU and gauges add load. Fresh grounds prevent the hard-to-find gremlins an old chassis is prone to." },
  { id: "speedo-correction", name: "Speedometer correction", subsystem: "Electrical", estCost: 150, recommendation: "Acceptable",
    why: "Changing the diff ratio or transmission throws off the W201 speedo/odometer, which matters for a daily driver and for the maintenance-mileage tracking on this site." },

  // ---- Wheels, tires & brakes ----
  { id: "tires", name: "Tires for the Sparco Terras (street/autocross compound)", subsystem: "Wheels", estCost: 800, recommendation: "Preferred",
    why: "Not tracked anywhere yet. Size depends on the final Terra size and brake package." },
  { id: "lug-bolts-hubrings", name: "Lug bolts matched to wheel seat + hub-centric rings", subsystem: "Wheels", estCost: 80, recommendation: "Preferred",
    why: "Verify: factory Mercedes bolts are ball/radius seat and many aftermarket wheels are conical seat, so the wrong bolt is a wheel-off risk. Also confirm the Terra is available in 5x112 and its center bore (rings to 66.6 mm if needed)." },
  { id: "brake-lines-fluid", name: "Stainless brake lines + high-temp brake fluid", subsystem: "Brakes", estCost: 150, recommendation: "Preferred",
    why: "Cheap and a big fade-resistance gain for repeated hill-climb runs; ABS stays." },

  // ---- Chassis & suspension ----
  { id: "front-arms-bushings", name: "Control arms, bushings, tie rods & sway bars", subsystem: "Suspension", estCost: 800, recommendation: "Preferred",
    why: "B8s on 35-year-old bushings won't deliver. Do this alongside the shocks so the alignment is only done once." },
  { id: "alignment-corner-balance", name: "Alignment + corner balance (service)", subsystem: "Suspension", estCost: 250, recommendation: "Acceptable",
    why: "Needed after suspension work and again after ride-height changes. Doubles as the scale ticket for the weight calculator." },
  { id: "chassis-rust-prep", name: "Rust inspection/repair & chassis prep before paint", subsystem: "Body", estCost: 600, recommendation: "Preferred",
    why: "Highly variable — jack points, battery tray, and the rear wheel arches are worth inspecting before money goes into paint or a kit." },

  // ---- Track readiness ----
  { id: "safety-kit", name: "Autocross/hill-climb safety basics (extinguisher + mount, battery tie-down, helmet)", subsystem: "Safety", estCost: 350, recommendation: "Preferred",
    why: "Check your event organizer's tech rules. Hill-climb events usually ask for more than autocross does." }
];

/* Decisions to settle before buying parts that depend on them. The answer you type is saved in this browser. */
window.ROBIN_OPEN_DECISIONS = [
  { id: "trans-type", title: "Manual or automatic?", blocks: "transmission-match, clutch-flywheel, driveshaft, speedo-correction",
    detail: "Already listed as open in the parts database. Drives clutch, driveshaft, ECU/TCU wiring, and the diff ratio." },
  { id: "diff-choice", title: "Which diff case, ratio and LSD type?", blocks: "rear-diff-lsd, rear-axles-bushings, speedo-correction",
    detail: "Ratio should be chosen with the turbo's powerband and your tire diameter in mind." },
  { id: "internals", title: "Stock internals with conservative boost, or a built bottom end?", blocks: "head-studs-gasket, turbo-kit, m104-refresh-kit",
    detail: "Reliability-first points toward stock internals with a conservative tune at the low end of 300–350 hp. Worth settling with your tuner before buying the turbo." },
  { id: "ecu-platform", title: "Which standalone ECU platform?", blocks: "standalone-ecu, wiring-harness-adaptation, wideband-gauges, dyno-tune",
    detail: "Pick partly on which tuners near you support it, and whether it can retain or coexist with ABS and A/C control." },
  { id: "brake-vs-wheel", title: "Brake package size vs. Sparco Terra diameter", blocks: "brake-refresh, sparco-terra-wheels, tires",
    detail: "Bigger brakes may need a bigger wheel. Lock the wheel size and offset before buying either." },
  { id: "evo1-kit", title: "Evo 1 body kit — yes or no?", blocks: "evo1-body-kit, two-tone-paint, chassis-rust-prep",
    detail: "Affects paint scope and timing. Paint should come after any kit fitment." },
  { id: "seats-harness", title: "Seats/harness for track use vs. daily comfort?", blocks: "safety-kit",
    detail: "Fixed-back seats and harnesses conflict with the daily-driver goal; a good bolster seat with 3-point belts may be the middle ground." }
];
