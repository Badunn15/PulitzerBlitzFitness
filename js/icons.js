/* Pulitzer Blitz Fitness — pictogram icon set (inline SVG, no external assets) */

const ICONS = {
  breathe: `<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="6" fill="currentColor" opacity=".9"/><circle cx="24" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="2" opacity=".5"/><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" stroke-width="2" opacity=".25"/></svg>`,
  bloom: `<svg viewBox="0 0 48 48"><g fill="currentColor"><ellipse cx="24" cy="14" rx="6" ry="9"/><ellipse cx="34" cy="24" rx="9" ry="6"/><ellipse cx="24" cy="34" rx="6" ry="9"/><ellipse cx="14" cy="24" rx="9" ry="6"/></g><circle cx="24" cy="24" r="5" fill="#FFD166"/></svg>`,
  squat: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="9" r="4" fill="currentColor" stroke="none"/><path d="M24 13v10"/><path d="M24 23l-9 6"/><path d="M24 23l9 6"/><path d="M15 29v10"/><path d="M33 29v10"/></svg>`,
  lunge: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="9" r="4" fill="currentColor" stroke="none"/><path d="M20 13v9"/><path d="M20 22l-8 4v10"/><path d="M20 22l12 6v8"/><path d="M20 22l6-4"/></svg>`,
  bridge: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 32c4-14 28-14 32 0" /><circle cx="24" cy="18" r="3.5" fill="currentColor" stroke="none"/></svg>`,
  plank: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M8 30h28"/><path d="M12 30v8"/><path d="M32 30v8"/><circle cx="38" cy="27" r="3.5" fill="currentColor" stroke="none"/></svg>`,
  strength: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M14 24h20"/><rect x="6" y="18" width="6" height="12" rx="2"/><rect x="36" y="18" width="6" height="12" rx="2"/></svg>`,
  punch: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="14" cy="24" r="6" fill="currentColor" stroke="none"/><path d="M20 24h9"/><path d="M29 18l6 6-6 6"/></svg>`,
  twist: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 16a14 14 0 0 1 22-4"/><path d="M36 32a14 14 0 0 1-22 4"/><path d="M30 8l6 4-6 4"/><path d="M18 40l-6-4 6-4"/></svg>`,
  march: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="9" r="4" fill="currentColor" stroke="none"/><path d="M20 13v10"/><path d="M20 23l-8-4"/><path d="M20 23l6 12"/><path d="M20 23l10 2v10"/></svg>`,
  walk: `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M17 6a3 3 0 110 6 3 3 0 010-6z"/><path d="M14 14l-3 10 4 2 2 8h4l-1-11 3-4 4 5 5 3 2-4-6-4-3-7c-1-2-3-2-5-1z"/><path d="M31 30a3 3 0 110 6 3 3 0 010-6z"/><path d="M29 22l-2 6 3 10 4-1-2-9 3-4z"/></svg>`,
  stretch: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="9" r="4" fill="currentColor" stroke="none"/><path d="M24 13v8"/><path d="M24 21l-10-6"/><path d="M24 21l10-6"/><path d="M24 21v9l-6 9"/><path d="M24 30l6 9"/></svg>`,
  rest: `<svg viewBox="0 0 48 48" fill="currentColor"><path d="M30 8a16 16 0 100 32 13 13 0 01-9-24.5A13 13 0 0130 8z"/><circle cx="38" cy="12" r="1.6"/><circle cx="42" cy="17" r="1.2"/><circle cx="34" cy="8" r="1"/></svg>`,
  row: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M10 24h20"/><path d="M24 24l6-5"/><path d="M24 24l6 5"/><rect x="34" y="18" width="6" height="12" rx="2" fill="currentColor" stroke="none"/></svg>`,
  press: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 36V12"/><path d="M17 19l7-7 7 7"/><rect x="14" y="36" width="20" height="4" rx="2" fill="currentColor" stroke="none"/></svg>`,
  clock: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="24" cy="24" r="17"/><path d="M24 14v10l7 5" stroke-linecap="round"/></svg>`,
  seated: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="10" r="4" fill="currentColor" stroke="none"/><path d="M24 14v10"/><path d="M24 24h10"/><path d="M24 24l-8 5"/><path d="M16 29v9"/><path d="M34 24v9"/></svg>`,
  crawl: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="18" r="3.5" fill="currentColor" stroke="none"/><path d="M12 22v8"/><path d="M12 30l10 2"/><path d="M22 32l10-4"/><path d="M12 22l12 2"/><path d="M24 24l10-8"/></svg>`,
  default: `<svg viewBox="0 0 48 48"><g fill="currentColor"><ellipse cx="24" cy="14" rx="5" ry="8"/><ellipse cx="34" cy="24" rx="8" ry="5"/><ellipse cx="24" cy="34" rx="5" ry="8"/><ellipse cx="14" cy="24" rx="8" ry="5"/></g><circle cx="24" cy="24" r="4" fill="#FFD166"/></svg>`,
};

function inferIconKey(name, detail) {
  const text = `${name} ${detail}`.toLowerCase();
  const rules = [
    [/breath/i, "breathe"],
    [/kegel|pelvic floor/i, "bloom"],
    [/squat/i, "squat"],
    [/lunge/i, "lunge"],
    [/bridge/i, "bridge"],
    [/plank/i, "plank"],
    [/push[- ]?up/i, "strength"],
    [/dumbbell|deadlift|weight|goblet|renegade/i, "strength"],
    [/row/i, "row"],
    [/press/i, "press"],
    [/punch|boxing|jab|hook|shadowbox/i, "punch"],
    [/twist|rotation|woodchop|pallof/i, "twist"],
    [/march|knee lift|knee raise|dead bug|bird ?dog/i, "crawl"],
    [/leg lift|leg raise|abduction|clamshell/i, "march"],
    [/carry|walk|stroll|pace/i, "walk"],
    [/stretch|fold|lunge stretch|opener|hip flexor|calf|child.?s pose|cat-cow|cat cow/i, "stretch"],
    [/savasana|rest|cool.?down|quiet|still/i, "rest"],
    [/\bseated\b|wall sit/i, "seated"],
    [/circle|halo|mobility|ankle/i, "twist"],
  ];
  for (const [re, key] of rules) {
    if (re.test(text)) return key;
  }
  return "default";
}

function getIconSvg(key) {
  return ICONS[key] || ICONS.default;
}

/* Parse a step's detail text into a lightweight visual metric: reps/sets or a timer. */
function parseStepMetric(detail) {
  const repMatch =
    detail.match(/(\d+)\s*(?:reps?|times)\b/i) ||
    detail.match(/(\d+)\s*(?:steps?)?\s*(?:each side|each leg|each arm|each direction|each)\b/i);
  const setMatch = detail.match(/(\d+)\s*(?:rounds?|sets?)\b/i);

  if (repMatch) {
    return {
      type: "reps",
      reps: parseInt(repMatch[1], 10),
      sets: setMatch ? parseInt(setMatch[1], 10) : 1,
    };
  }

  const secMatch = detail.match(/(\d+)\s*(?:sec|seconds)\b/i);
  const minMatch = detail.match(/(\d+)\s*min(?:ute)?s?\b/i);
  if (secMatch || minMatch) {
    const seconds = secMatch ? parseInt(secMatch[1], 10) : parseInt(minMatch[1], 10) * 60;
    return {
      type: "timer",
      seconds,
      rounds: setMatch ? parseInt(setMatch[1], 10) : 1,
    };
  }

  return { type: "none" };
}
