/* Pulitzer Blitz Fitness — illustrated exercise pose reference
   Original line-art diagrams (not photos) showing actual body position per move. */

function svgWrap(inner) {
  return `<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
    <line x1="8" y1="94" x2="92" y2="94" stroke="currentColor" stroke-width="3" opacity="0.15"/>
    ${inner}
  </svg>`;
}

function head(x, y) {
  return `<circle cx="${x}" cy="${y}" r="6.5" fill="currentColor" stroke="none"/>`;
}
function bone(x1, y1, x2, y2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`;
}
function limb(sx, sy, ex, ey, hx, hy) {
  return bone(sx, sy, ex, ey) + bone(ex, ey, hx, hy);
}
function weight(x, y, w = 16, h = 9) {
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="2" fill="var(--gold)" stroke="none"/>`;
}
function band(x1, y1, x2, y2) {
  const midx = (x1 + x2) / 2,
    midy = (y1 + y2) / 2;
  return `<path d="M${x1} ${y1} Q ${midx + 6} ${midy - 6} ${x2} ${y2}" stroke="var(--gold)" stroke-width="3" fill="none"/>`;
}
function upArrow(x, y, len = 18) {
  return `<path d="M${x} ${y} L${x} ${y - len} M${x - 5} ${y - len + 6} L${x} ${y - len} L${x + 5} ${y - len + 6}" stroke="var(--gold)" stroke-width="4" fill="none"/>`;
}
function sideArrow(x, y, dir = 1, len = 16) {
  const x2 = x + dir * len;
  return `<path d="M${x} ${y} L${x2} ${y} M${x2 - dir * 6} ${y - 5} L${x2} ${y} L${x2 - dir * 6} ${y + 5}" stroke="var(--gold)" stroke-width="4" fill="none"/>`;
}
function circArrow(cx, cy, r = 14) {
  return `<path d="M${cx - r} ${cy} A ${r} ${r} 0 1 1 ${cx + r * 0.5} ${cy - r * 0.87}" stroke="var(--gold)" stroke-width="4" fill="none"/>
    <path d="M${cx + r * 0.5 - 7} ${cy - r * 0.87 - 3} L${cx + r * 0.5} ${cy - r * 0.87} L${cx + r * 0.5 + 2} ${cy - r * 0.87 - 7}" stroke="var(--gold)" stroke-width="4" fill="none"/>`;
}

const POSES = {
  "standing-neutral": svgWrap(
    head(50, 14) + bone(50, 20, 50, 50) + limb(50, 22, 40, 35, 37, 50) + limb(50, 22, 60, 35, 63, 50) + limb(50, 50, 45, 72, 43, 92) + limb(50, 50, 55, 72, 57, 92)
  ),
  walking: svgWrap(
    head(48, 14) +
      bone(48, 20, 50, 50) +
      limb(50, 22, 36, 30, 28, 40) +
      limb(50, 22, 64, 34, 70, 44) +
      limb(50, 50, 36, 66, 26, 84) +
      limb(50, 50, 62, 70, 70, 92)
  ),
  "lying-breathe": svgWrap(
    // lying on back, knees bent, one hand resting on belly
    head(16, 50) +
      bone(22, 50, 46, 50) +
      limb(46, 50, 46, 34, 40, 20) +
      limb(46, 50, 60, 44, 60, 60) +
      limb(22, 50, 30, 34, 34, 44) +
      limb(22, 50, 18, 34, 14, 44) +
      `<circle cx="34" cy="46" r="3" fill="var(--gold)" stroke="none"/>`
  ),
  "lying-heel-slide": svgWrap(
    head(16, 50) +
      bone(22, 50, 46, 50) +
      limb(46, 50, 46, 34, 40, 20) +
      limb(46, 50, 70, 60, 92, 62) +
      limb(22, 50, 16, 30, 12, 20) +
      limb(22, 50, 10, 40, 4, 46) +
      sideArrow(80, 62, 1, 12)
  ),
  bridge: svgWrap(
    head(16, 62) +
      bone(22, 62, 44, 40) +
      limb(44, 40, 66, 46, 68, 62) +
      limb(44, 40, 22, 30, 20, 20) +
      limb(22, 62, 18, 42, 16, 32) +
      upArrow(44, 36, 12)
  ),
  "bridge-march": svgWrap(
    head(16, 62) +
      bone(22, 62, 44, 40) +
      limb(44, 40, 66, 46, 68, 62) +
      limb(44, 40, 30, 22, 40, 10) +
      limb(22, 62, 18, 42, 16, 32) +
      sideArrow(40, 12, 1, 10)
  ),
  "seated-neutral": svgWrap(
    head(50, 18) + bone(50, 24, 50, 52) + limb(50, 26, 38, 36, 34, 48) + limb(50, 26, 62, 36, 66, 48) + bone(50, 52, 34, 54) + bone(34, 54, 32, 74) + bone(50, 52, 66, 54) + bone(66, 54, 68, 74)
  ),
  "seated-march": svgWrap(
    head(50, 18) +
      bone(50, 24, 50, 52) +
      limb(50, 26, 38, 36, 34, 48) +
      limb(50, 26, 62, 36, 66, 48) +
      bone(50, 52, 34, 54) +
      bone(34, 54, 32, 74) +
      limb(50, 52, 62, 40, 76, 44) +
      sideArrow(80, 42, 1, 10)
  ),
  "seated-reach": svgWrap(
    head(46, 18) +
      bone(46, 24, 50, 52) +
      limb(48, 25, 62, 12, 74, 4) +
      limb(50, 26, 40, 38, 36, 48) +
      bone(50, 52, 36, 54) +
      bone(36, 54, 34, 74) +
      bone(50, 52, 64, 54) +
      bone(64, 54, 66, 74)
  ),
  "wall-sit": svgWrap(
    `<line x1="80" y1="6" x2="80" y2="94" opacity="0.3"/>` +
      head(70, 20) +
      bone(70, 26, 70, 52) +
      limb(70, 28, 58, 38, 54, 48) +
      limb(70, 28, 74, 40, 72, 50) +
      limb(70, 52, 48, 52, 46, 74) +
      limb(46, 74, 46, 94, 46, 94)
  ),
  "childs-pose": svgWrap(
    head(78, 66) +
      bone(72, 62, 46, 50) +
      limb(46, 50, 30, 42, 14, 36) +
      limb(46, 50, 30, 46, 14, 42) +
      bone(72, 62, 74, 80) +
      bone(74, 80, 60, 90) +
      bone(72, 62, 82, 78) +
      bone(82, 78, 92, 88)
  ),
  "neck-release": svgWrap(
    head(46, 20) + bone(50, 26, 50, 52) + limb(50, 27, 40, 22, 34, 16) + limb(50, 27, 62, 40, 66, 52) + limb(50, 52, 42, 72, 40, 92) + limb(50, 52, 58, 72, 60, 92)
  ),
  "lying-ankle-circle": svgWrap(
    head(14, 50) + bone(20, 50, 44, 50) + limb(44, 50, 44, 32, 48, 16) + limb(44, 50, 60, 32, 64, 16) + limb(20, 50, 16, 34, 12, 24) + circArrow(56, 14, 8)
  ),
  "side-lying-rest": svgWrap(
    head(20, 40) +
      bone(26, 42, 52, 52) +
      limb(52, 52, 42, 68, 34, 82) +
      limb(52, 52, 60, 68, 68, 78) +
      limb(30, 44, 24, 56, 20, 66) +
      `<circle cx="70" cy="30" r="2" fill="currentColor" opacity="0.4"/><circle cx="76" cy="24" r="2.5" fill="currentColor" opacity="0.4"/><circle cx="82" cy="17" r="3" fill="currentColor" opacity="0.4"/>`
  ),
  savasana: svgWrap(
    head(14, 50) + bone(20, 50, 60, 50) + limb(24, 50, 20, 40, 12, 36) + limb(24, 50, 20, 60, 12, 64) + limb(60, 50, 74, 58, 88, 60) + limb(60, 50, 74, 42, 88, 40)
  ),
  "cat-cow": svgWrap(
    `<path d="M20 40 Q 50 60 78 38" stroke="currentColor"/>` +
      head(84, 32) +
      bone(20, 40, 18, 60) +
      bone(20, 40, 24, 60) +
      bone(78, 38, 76, 58) +
      bone(78, 38, 82, 58) +
      `<path d="M46 26 L46 16 M42 22 L46 16 L50 22" stroke="var(--gold)" stroke-width="3" fill="none"/>` +
      `<path d="M46 66 L46 76 M42 70 L46 76 L50 70" stroke="var(--gold)" stroke-width="3" fill="none"/>`
  ),
  "low-lunge": svgWrap(
    head(56, 18) +
      bone(56, 24, 54, 48) +
      limb(56, 26, 66, 12, 68, 4) +
      limb(54, 26, 44, 14, 42, 6) +
      limb(54, 48, 40, 60, 30, 78) +
      limb(54, 48, 68, 58, 78, 70) +
      bone(78, 70, 88, 76)
  ),
  "seated-fold": svgWrap(
    head(64, 30) + bone(60, 36, 40, 52) + limb(40, 52, 26, 40, 14, 30) + limb(40, 52, 30, 46, 20, 42) + bone(40, 52, 66, 54) + bone(66, 54, 90, 56)
  ),
  "reclined-twist": svgWrap(
    head(14, 40) +
      bone(20, 40, 48, 46) +
      limb(20, 40, 16, 26, 10, 18) +
      limb(20, 40, 24, 26, 30, 18) +
      limb(48, 46, 60, 62, 58, 80) +
      limb(48, 46, 58, 68, 50, 84)
  ),
  "standing-leg-lift": svgWrap(
    `<line x1="16" y1="10" x2="16" y2="94" opacity="0.3"/>` +
      head(50, 14) +
      bone(50, 20, 52, 50) +
      limb(48, 22, 26, 30, 18, 34) +
      limb(52, 22, 62, 36, 66, 50) +
      limb(52, 50, 50, 72, 48, 92) +
      limb(52, 50, 68, 56, 82, 50) +
      sideArrow(84, 50, 1, 10)
  ),
  "bird-dog": svgWrap(
    head(84, 60) + bone(78, 58, 40, 46) + limb(40, 46, 26, 34, 12, 24) + bone(40, 46, 42, 66) + bone(78, 58, 80, 76) + limb(78, 58, 92, 46, 96, 34)
  ),
  "standing-press-out": svgWrap(
    head(50, 14) + bone(50, 20, 50, 50) + bone(50, 26, 22, 26) + bone(50, 26, 78, 26) + weight(50, 26) + limb(50, 50, 45, 72, 43, 92) + limb(50, 50, 55, 72, 57, 92)
  ),
  "standing-woodchop": svgWrap(
    head(50, 14) + bone(50, 20, 50, 50) + bone(50, 24, 76, 12) + bone(50, 24, 30, 42) + weight(76, 12) + limb(50, 50, 45, 72, 43, 92) + limb(50, 50, 55, 72, 57, 92) + circArrow(50, 30, 16)
  ),
  squat: svgWrap(
    head(50, 20) + bone(50, 26, 50, 52) + limb(50, 28, 38, 38, 34, 48) + limb(50, 28, 62, 38, 66, 48) + weight(50, 46) + limb(50, 52, 36, 64, 34, 90) + limb(50, 52, 64, 64, 66, 90)
  ),
  "squat-press": svgWrap(
    head(50, 20) +
      bone(50, 26, 50, 52) +
      limb(50, 28, 38, 38, 34, 48) +
      limb(50, 28, 62, 38, 66, 48) +
      weight(50, 46) +
      limb(50, 52, 36, 64, 34, 90) +
      limb(50, 52, 64, 64, 66, 90) +
      upArrow(50, 40, 14)
  ),
  pushup: svgWrap(
    head(84, 36) + bone(78, 40, 30, 56) + limb(70, 42, 60, 30, 54, 44) + bone(30, 56, 24, 78) + bone(30, 56, 40, 80)
  ),
  "bentover-row": svgWrap(
    head(78, 32) + bone(72, 36, 34, 52) + limb(34, 52, 40, 66, 46, 60) + limb(34, 52, 20, 60, 14, 50) + weight(14, 50, 12, 8) + bone(72, 36, 68, 60) + bone(72, 36, 78, 58)
  ),
  "overhead-press": svgWrap(
    head(50, 20) + bone(50, 26, 50, 52) + bone(50, 28, 40, 10) + bone(50, 28, 60, 10) + weight(50, 8) + limb(50, 52, 44, 72, 42, 92) + limb(50, 52, 56, 72, 58, 92)
  ),
  deadlift: svgWrap(
    head(74, 28) + bone(70, 32, 40, 48) + limb(40, 48, 32, 58, 28, 66) + weight(24, 66, 14, 8) + bone(70, 32, 66, 58) + bone(70, 32, 74, 58) + bone(66, 58, 62, 90) + bone(74, 58, 78, 90)
  ),
  halo: svgWrap(
    head(50, 20) + bone(50, 26, 50, 50) + bone(50, 28, 34, 30) + bone(50, 28, 66, 30) + weight(66, 14) + circArrow(50, 18, 14) + limb(50, 50, 44, 72, 42, 92) + limb(50, 50, 56, 72, 58, 92)
  ),
  "side-lying-clamshell": svgWrap(
    head(20, 40) +
      bone(26, 42, 52, 52) +
      limb(52, 52, 46, 66, 40, 72) +
      limb(52, 52, 62, 62, 74, 58) +
      limb(30, 44, 24, 56, 20, 66) +
      sideArrow(76, 56, 1, 10)
  ),
  "standing-march-reach": svgWrap(
    head(46, 14) + bone(46, 20, 50, 50) + limb(46, 22, 60, 40, 66, 54) + limb(50, 22, 34, 32, 30, 24) + limb(50, 50, 62, 40, 76, 42) + bone(50, 50, 46, 72) + bone(46, 72, 44, 92)
  ),
  "side-bend": svgWrap(
    head(60, 16) + bone(56, 22, 46, 50) + limb(58, 24, 72, 10, 78, 4) + limb(50, 24, 40, 36, 36, 46) + limb(46, 50, 40, 72, 38, 92) + limb(46, 50, 54, 72, 56, 92)
  ),
  "wall-plank": svgWrap(
    `<line x1="92" y1="6" x2="92" y2="94" opacity="0.3"/>` + head(20, 66) + bone(24, 62, 74, 30) + limb(70, 34, 82, 30, 92, 30) + bone(24, 62, 20, 84) + bone(24, 62, 32, 88)
  ),
  "dynamic-cardio": svgWrap(
    head(46, 14) + bone(46, 20, 50, 48) + limb(46, 22, 30, 14, 20, 8) + limb(50, 22, 66, 32, 74, 44) + limb(50, 48, 62, 40, 74, 30) + bone(50, 48, 44, 70) + bone(44, 70, 40, 92)
  ),
  "boxing-guard": svgWrap(
    head(46, 16) + bone(46, 22, 50, 50) + limb(46, 24, 36, 30, 32, 24) + limb(50, 24, 70, 34, 86, 34) + weight(86, 34, 10, 10) + limb(50, 50, 44, 72, 42, 92) + limb(50, 50, 56, 72, 58, 92)
  ),
  "lunge-walking": svgWrap(
    head(50, 16) + bone(50, 22, 52, 48) + limb(46, 24, 34, 32, 26, 40) + limb(54, 24, 66, 34, 74, 42) + limb(52, 48, 38, 64, 32, 88) + limb(52, 48, 72, 58, 86, 52)
  ),
  plank: svgWrap(
    head(84, 42) + bone(78, 44, 26, 58) + bone(26, 58, 20, 80) + bone(26, 58, 32, 82) + limb(70, 46, 62, 60, 58, 72)
  ),
  "side-plank": svgWrap(
    head(78, 30) + bone(72, 34, 30, 52) + bone(30, 52, 26, 76) + limb(66, 38, 76, 22, 82, 12) + limb(60, 40, 50, 56, 44, 74) + bone(30, 52, 34, 76)
  ),
  "dead-bug": svgWrap(
    head(16, 50) +
      bone(22, 50, 46, 50) +
      limb(46, 50, 46, 34, 40, 20) +
      limb(46, 50, 62, 44, 62, 60) +
      limb(22, 50, 14, 34, 8, 20) +
      limb(22, 50, 30, 44, 30, 60)
  ),
  "get-up": svgWrap(
    head(14, 50) + bone(20, 50, 48, 50) + bone(48, 50, 46, 32) + bone(46, 32, 44, 14) + weight(44, 12) + limb(20, 50, 16, 34, 12, 20) + limb(48, 50, 62, 58, 78, 60) + bone(78, 60, 90, 62)
  ),
  "chest-opener": svgWrap(
    head(50, 16) + bone(50, 22, 50, 50) + limb(48, 24, 36, 32, 44, 44) + limb(52, 24, 64, 32, 56, 44) + bone(44, 44, 56, 44) + limb(50, 50, 44, 72, 42, 92) + limb(50, 50, 56, 72, 58, 92)
  ),
};

function getPoseKey(name, detail) {
  const text = `${name} ${detail}`.toLowerCase();
  const rules = [
    [/get-?up/i, "get-up"],
    [/halo/i, "halo"],
    [/clamshell/i, "side-lying-clamshell"],
    [/side plank/i, "side-plank"],
    [/plank to down/i, "plank"],
    [/wall plank/i, "wall-plank"],
    [/forearm plank|^plank$|\bplank\b/i, "plank"],
    [/dead ?bug/i, "dead-bug"],
    [/bird ?dog/i, "bird-dog"],
    [/wall sit/i, "wall-sit"],
    [/wall or knee push|push[- ]?up/i, "pushup"],
    [/shadowbox|combo rounds|core finisher|jab|hook|punch/i, "boxing-guard"],
    [/woodchop/i, "standing-woodchop"],
    [/pallof|anti-rotation/i, "standing-press-out"],
    [/squat to press|goblet squat to press/i, "squat-press"],
    [/overhead press|bench.*press|floor press|\bpress\b/i, "overhead-press"],
    [/squat/i, "squat"],
    [/lunge stretch|hip flexor/i, "low-lunge"],
    [/walking lunge|lunge/i, "lunge-walking"],
    [/deadlift/i, "deadlift"],
    [/row/i, "bentover-row"],
    [/march(es)? with reach/i, "standing-march-reach"],
    [/seated march/i, "seated-march"],
    [/bridge.*march/i, "bridge-march"],
    [/march/i, "standing-march-reach"],
    [/bridge/i, "bridge"],
    [/clamshell/i, "side-lying-clamshell"],
    [/abduction|standing leg lift/i, "standing-leg-lift"],
    [/heel slide/i, "lying-heel-slide"],
    [/ankle circle/i, "lying-ankle-circle"],
    [/cat-?cow/i, "cat-cow"],
    [/child.?s pose/i, "childs-pose"],
    [/neck|shoulder release/i, "neck-release"],
    [/chest.*shoulder opener|opener/i, "chest-opener"],
    [/side bend/i, "side-bend"],
    [/forward fold|hamstring stretch|fold/i, "seated-fold"],
    [/reclined twist|spinal twist|twist/i, "reclined-twist"],
    [/savasana|flat on back|rest & notice|lie still|\bquiet\b/i, "savasana"],
    [/supported rest|side.?lying rest/i, "side-lying-rest"],
    [/seated (breathing|side reach)/i, "seated-reach"],
    [/side reach/i, "seated-reach"],
    [/seated/i, "seated-neutral"],
    [/kegel|pelvic floor|transverse ab|positioning|gentle lift check|note & release|breath/i, "lying-breathe"],
    [/cardio combo|low-impact combo|interval|warm-up groove/i, "dynamic-cardio"],
    [/carry|walk|stroll|pace/i, "walking"],
    [/cool.?down/i, "standing-neutral"],
  ];
  for (const [re, key] of rules) {
    if (re.test(text)) return key;
  }
  return "standing-neutral";
}

function getPoseSvg(key) {
  return POSES[key] || POSES["standing-neutral"];
}
