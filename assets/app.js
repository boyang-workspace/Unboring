// ── UnBoring App ──
// Canvas interaction, prompt builder sidebar, surprise randomization, export

const canvas = document.getElementById('canvas');
const content = document.getElementById('canvas-content');
const HAS_CANVAS_APP = !!(canvas && content);
let panX = 0, panY = 0, currentScale = 1, isDragging = false, startX, startY, startPanX, startPanY;
const PADDING = 200;

// ── Canvas scroll layout ──
function clampPan() {
  panX = 0;
  panY = 0;
  currentScale = 1;
}
function apply() { if (content) content.style.transform = ''; }

if (HAS_CANVAS_APP) {
  document.addEventListener('keydown', e => { if (e.key === 'f' || e.key === 'F') { e.preventDefault(); fitAll(); } });
}

function fitAll() {
  apply();
  if (content) content.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── Fonts ──
const FONTS_SANS = ["Inter","DM Sans","Plus Jakarta Sans","Albert Sans","Lexend","Outfit","Space Grotesk","Sora","Manrope","Urbanist"];
const FONTS_SERIF = ["Playfair Display","Lora","DM Serif Display","Crimson Text","EB Garamond","Cormorant Garamond","Bitter","Merriweather","Noto Serif","PT Serif"];
const FONTS_DISPLAY = ["Bebas Neue","Oswald","Righteous","Fredoka","Permanent Marker","Cinzel","Rajdhani","Exo 2"];
const FONTS_HAND = ["Caveat","Dancing Script","Pacifico","Satisfy","Great Vibes","Nunito","Patrick Hand"];
const ALL_FONTS = [...FONTS_SANS, ...FONTS_SERIF, ...FONTS_DISPLAY, ...FONTS_HAND];
const pick = a => a[Math.floor(Math.random() * a.length)];
const CREATIVE_RECIPES = window.UNBORING_RECIPES || [];

// ── Font Pairings ──
const FONT_PAIRINGS = [
  { heading: "Playfair Display", body: "Inter" },
  { heading: "DM Serif Display", body: "DM Sans" },
  { heading: "Cormorant Garamond", body: "Albert Sans" },
  { heading: "Bitter", body: "Space Grotesk" },
  { heading: "EB Garamond", body: "Plus Jakarta Sans" },
  { heading: "Merriweather", body: "Lexend" },
  { heading: "Outfit", body: "Outfit" },
  { heading: "Sora", body: "Sora" },
  { heading: "Space Grotesk", body: "Space Grotesk" },
  { heading: "Manrope", body: "Manrope" },
  { heading: "Urbanist", body: "Urbanist" },
  { heading: "Oswald", body: "Inter" },
  { heading: "Bebas Neue", body: "DM Sans" },
  { heading: "Fredoka", body: "Fredoka" },
  { heading: "Cinzel", body: "Crimson Text" },
  { heading: "Rajdhani", body: "Exo 2" },
  { heading: "Orbitron", body: "Inter" },
  { heading: "Caveat", body: "Inter" },
  { heading: "Dancing Script", body: "DM Sans" },
];

// ── Theme Groups ──
const THEME_GROUPS = {
  warm: [2, 8],       // Floema, Wabi-Sabi
  cool: [6, 7],       // Supabase, Obys
  dark: [1, 3, 5, 7, 9], // Linear, Art Deco, Synthwave, Obys, Gothic
  light: [0, 2, 4, 6, 8, 10], // Minimal, Floema, Bubblegum, Supabase, Wabi-Sabi, Mondrian
  bold: [3, 4, 5, 10],  // Art Deco, Bubblegum, Synthwave, Mondrian
  playful: [11, 12, 13, 14], // Storybook, Playground, Crayon, Bedtime
  cartoon: [15, 16, 17, 18, 19, 20, 21, 22, 23, 24], // Duo Green, Candy Pink, Sunny Yellow, Ocean Blue, Lava Orange, Berry Purple, Mint Fresh, Coral Reef, Gold Medal, Rainbow Magic
};

function getRandomTheme() {
  let theme, group;
  for (let attempt = 0; attempt < 5; attempt++) {
    const groups = Object.keys(THEME_GROUPS);
    group = groups[Math.floor(Math.random() * groups.length)];
    const indices = Math.random() < 0.58
      ? THEME_GROUPS[group]
      : PALETTES.map(function(_, i) { return i; });
    theme = PALETTES[indices[Math.floor(Math.random() * indices.length)]];
    if (theme.name !== window._lastThemeName) break;
  }
  window._lastThemeName = theme.name;
  return { theme, group };
}

// ── Current design state (for prompt generation) ──
const designState = {
  bg: '', fg: '', card: '', cardFg: '', muted: '', mutedFg: '',
  primary: '', primaryFg: '', secondary: '', secondaryFg: '',
  border: '', input: '', destructive: '',
  radius: '', bw: '', shadow: '',
  fontHeading: '', fontBody: '', fs: '', titleFs: '', ls: '', fw: 500,
  dark: false, bgPattern: ''
};

let currentRecipeState = CREATIVE_RECIPES[0] || null;

// ── Surprise Me! ──
function surprise() {
  const { theme: p, group } = getRandomTheme();
  window._lastThemeGroup = group;
  const r = document.documentElement.style;

  // Colors
  const surfaceMixes = [
    p.card,
    'color-mix(in oklab,' + p.card + ' 92%, ' + p.bg + ')',
    'color-mix(in oklab,' + p.card + ' 86%, ' + p.secondary + ')',
    'color-mix(in oklab,' + p.card + ' 88%, white)',
    'color-mix(in oklab,' + p.card + ' 90%, ' + p.primary + ' 10%)'
  ];
  const mutedMixes = [
    p.muted,
    'color-mix(in oklab,' + p.muted + ' 78%, ' + p.card + ')',
    'color-mix(in oklab,' + p.secondary + ' 36%, ' + p.card + ')'
  ];
  const selected = {
    bg: p.bg,
    fg: p.fg,
    card: p.card,
    cardFg: p.cardFg,
    cardBg: pick(surfaceMixes),
    muted: pick(mutedMixes),
    mutedFg: p.mutedFg,
    primary: p.primary,
    primaryFg: p.primaryFg,
    secondary: p.secondary,
    secondaryFg: p.secondaryFg,
    border: Math.random() < 0.6 ? p.border : 'color-mix(in oklab,' + p.fg + ' 18%, transparent)',
    input: Math.random() < 0.6 ? p.input : 'color-mix(in oklab,' + p.fg + ' 14%, transparent)',
    destructive: p.destructive
  };

  r.setProperty('--bg', selected.bg); r.setProperty('--fg', selected.fg);
  r.setProperty('--card', selected.card); r.setProperty('--card-fg', selected.cardFg);
  r.setProperty('--card-bg', selected.cardBg);
  r.setProperty('--muted', selected.muted); r.setProperty('--muted-fg', selected.mutedFg);
  r.setProperty('--primary', selected.primary); r.setProperty('--primary-fg', selected.primaryFg);
  r.setProperty('--secondary', selected.secondary); r.setProperty('--secondary-fg', selected.secondaryFg);
  r.setProperty('--border', selected.border); r.setProperty('--input', selected.input);
  r.setProperty('--ring', selected.primary); r.setProperty('--destructive', selected.destructive);

  // Shape — also randomize radius, border-width, shadow beyond palette
  var allRadii = ['0px','2px','4px','6px','8px','0.5rem','0.625rem','0.75rem','1rem','1.25rem','1.5rem','2rem'];
  var allBW = ['0px','0.5px','1px','1.5px','2px','3px'];
  var allShadows = ['none','0 1px 2px rgba(0,0,0,0.05)','0 2px 8px rgba(0,0,0,0.08)','0 4px 16px rgba(0,0,0,0.1)','0 8px 30px rgba(0,0,0,0.12)','0 0 0 1px rgba(0,0,0,0.05),0 4px 12px rgba(0,0,0,0.08)','0 0 20px rgba(0,0,0,0.15)','0 20px 60px rgba(0,0,0,0.2)'];
  const selectedRadius = Math.random() < 0.42 ? p.radius : pick(allRadii);
  const selectedBw = Math.random() < 0.42 ? p.bw : pick(allBW);
  const selectedShadow = Math.random() < 0.42 ? p.shadow : pick(allShadows);
  r.setProperty('--radius', selectedRadius);
  r.setProperty('--bw', selectedBw);
  r.setProperty('--shadow', selectedShadow);
  r.setProperty('--btn-shadow', Math.random() < 0.55 ? (p.btnShadow || 'none') : pick(allShadows));
  r.setProperty('--btn-shadow-active', p.btnShadowActive || 'none');
  r.setProperty('--btn-press-y', p.btnPressY || (selectedBw === '0px' ? '0' : '1px'));

  // Typography — pick from ALL_FONTS for heading, avoid common pairings to maximize variety
  var headingFonts = [...FONTS_SERIF, ...FONTS_DISPLAY, ...FONTS_HAND, ...FONTS_SANS];
  var bodyFonts = [...FONTS_SANS, ...FONTS_SERIF];
  var hf = pick(headingFonts);
  var bf = pick(bodyFonts.filter(function(f) { return f !== hf || Math.random() < 0.2; }));
  if (!bf) bf = pick(FONTS_SANS);
  const selectedLs = Math.random() < 0.36 ? pick(['-0.03em','-0.015em','0','0.025em','0.05em','0.08em']) : (typeof p.ls === 'number' ? p.ls + 'em' : p.ls || '0');
  const selectedFw = pick([400,450,500,550,600,650,700,760]);
  const selectedFs = pick(['0.75rem','0.8125rem','0.875rem','0.9375rem','1rem']);
  const selectedTitleFs = pick(['1rem','1.08rem','1.15rem','1.3rem','1.5rem','1.75rem']);
  r.setProperty('--ls', selectedLs);
  r.setProperty('--fw', selectedFw);
  r.setProperty('--fs', selectedFs);
  r.setProperty('--title-fs', selectedTitleFs);
  r.setProperty('--font', "'" + bf + "',system-ui,sans-serif");
  r.setProperty('--font-heading', "'" + hf + "',system-ui,sans-serif");
  r.setProperty('--text-shadow', p.textShadow || 'none');
  document.body.style.fontFamily = "'" + bf + "',system-ui,sans-serif";

  // Background pattern — pick from ALL patterns, not just current theme's
  var allPatterns = PATTERNS.light.concat(PATTERNS.dark);
  var bg = pick(allPatterns);
  r.setProperty('--bg-pattern', bg.img);
  r.setProperty('--bg-pattern-size', bg.size);
  r.setProperty('--card-bg-pattern', bg.card || bg.img);
  r.setProperty('--card-bg-pattern-size', bg.cardSize || bg.size);
  document.body.style.backgroundColor = p.bg;
  document.body.style.backgroundImage = bg.img;
  document.body.style.backgroundSize = bg.size;

  // Update design state
  Object.assign(designState, {
    bg: selected.bg, fg: selected.fg, card: selected.card, cardFg: selected.cardFg,
    muted: selected.muted, mutedFg: selected.mutedFg,
    primary: selected.primary, primaryFg: selected.primaryFg,
    secondary: selected.secondary, secondaryFg: selected.secondaryFg,
    border: selected.border, input: selected.input, destructive: selected.destructive,
    radius: selectedRadius, bw: selectedBw, shadow: selectedShadow,
    fontHeading: hf, fontBody: bf,
    fs: selectedFs, titleFs: selectedTitleFs,
    ls: selectedLs,
    fw: selectedFw, dark: p.dark, bgPattern: bg.img
  });

  // Update sidebar prompt — re-render sentence with animation
  if (typeof renderSentence === 'function') {
    renderSentence({ animate: true });
  } else {
    updatePromptBlock();
  }
}

// ── Export CSS ──
function exportCSS() {
  const root = getComputedStyle(document.documentElement);
  const vars = ['--bg','--fg','--card','--card-fg','--muted','--muted-fg','--primary','--primary-fg','--secondary','--secondary-fg','--border','--input','--destructive','--radius','--bw','--shadow','--ls','--fw','--fs','--title-fs','--font','--font-heading'];
  let css = '/* UnBoring: ' + ((currentRecipeState && currentRecipeState.title) || 'Custom Direction') + ' */\n:root {\n';
  vars.forEach(v => { const val = root.getPropertyValue(v).trim(); if (val) css += '  ' + v + ': ' + val + ';\n'; });
  css += '}\n';
  navigator.clipboard.writeText(css).then(() => {
    const btn = document.getElementById('export-btn');
    if (!btn) return;
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Export CSS', 2000);
  });
}

// ── Hamburger Menu ──
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
if (menuBtn && menu) {
  menuBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });
  document.addEventListener('click', e => {
    if (!menu.contains(e.target) && !menuBtn.contains(e.target)) menu.classList.remove('open');
  });
}

// ── Game化 Prompt Builder ──

// Parameter definitions
const PARAM_DEFS = {
  bg:        { emoji:'🎨', label:'background',   type:'color',  group:'color' },
  fg:        { emoji:'✏️', label:'text color',    type:'color',  group:'color' },
  primary:   { emoji:'🎯', label:'accent color',  type:'color',  group:'color' },
  fontHeading:{ emoji:'🔤', label:'heading font', type:'font',   group:'typography', fontRole:'heading' },
  fontBody:  { emoji:'📝', label:'body font',     type:'font',   group:'typography', fontRole:'body' },
  radius:    { emoji:'📐', label:'border radius',  type:'slider', group:'shape',
               min:0, max:2, step:0.125, unit:'rem',
               presets:['0px','4px','8px','0.5rem','1rem','1.5rem','2rem'] },
  bw:        { emoji:'📏', label:'border width',   type:'slider', group:'shape',
               min:0, max:4, step:0.5, unit:'px',
               presets:['0px','0.5px','1px','1.5px','2px','3px'] },
  shadow:    { emoji:'☁️', label:'shadow',         type:'choice', group:'shape',
               choices:['none','subtle','medium','hard','neon'] },
  ls:        { emoji:'↔️', label:'letter spacing', type:'slider', group:'typography',
               min:-0.05, max:0.1, step:0.01, unit:'em',
               presets:['-0.03em','-0.01em','0','0.02em','0.05em'] },
  fw:        { emoji:'🖨️', label:'font weight',    type:'stepper',group:'typography',
               min:300, max:900, step:50, unit:'',
               presets:['400','500','600','700'] },
  fs:        { emoji:'🔠', label:'body size',      type:'slider', group:'typography',
               min:0.7, max:1.2, step:0.0625, unit:'rem',
               presets:['0.75rem','0.8125rem','0.875rem','0.9375rem','1rem'] },
  titleFs:   { emoji:'🔠', label:'heading size',   type:'slider', group:'typography',
               min:0.8, max:2, step:0.1, unit:'rem',
               presets:['1rem','1.15rem','1.3rem','1.5rem','1.75rem'] },
};

// Active parameters (order in sentence)
let activeParams = ['bg','fg','primary','fontHeading','fontBody','radius','bw','shadow','ls','fw','fs','titleFs'];
let currentEditPanel = null;

const COLOR_PRESETS = [
  { label: 'red', value: '#ef4444' },
  { label: 'acid green', value: '#c8ff3d' },
  { label: 'electric blue', value: '#3662ff' },
  { label: 'warm orange', value: '#ff7a1a' },
  { label: 'soft pink', value: '#f472b6' },
  { label: 'deep violet', value: '#7c3aed' },
  { label: 'medical teal', value: '#14b8a6' },
  { label: 'school yellow', value: '#facc15' },
  { label: 'game purple', value: '#a855f7' },
  { label: 'graphite', value: '#171717' },
];

const BRIEF_CHOICES = {
  projectType: [
    'SaaS landing page',
    'AI agent product',
    'portfolio site',
    'game launch page',
    'kids learning app',
    'education platform',
    'medical product page',
    'data report',
    'creative studio site',
    'developer tool',
    'community homepage',
    'ecommerce product page',
  ],
  audience: [
    'solo founders and vibe coders',
    'product teams',
    'design-conscious engineers',
    'parents and kids',
    'teachers and students',
    'clinicians and patients',
    'game fans',
    'creative directors',
    'data analysts',
    'developers',
  ],
  mood: [
    'delicate',
    'playful',
    'editorial',
    'premium',
    'technical',
    'cartoonish',
    'calm',
    'cinematic',
    'warm',
    'weird but usable',
  ],
  detailStyle: [
    'fine lines and pale shadows',
    'soft glass panels and quiet depth',
    'chunky cartoon panels',
    'editorial whitespace and sharp type',
    'dense product UI with precise borders',
    '3D stage objects and spatial layers',
    'paper texture and hand-drawn accents',
    'neon edges with controlled darkness',
    'medical-clean cards and calm spacing',
    'sticker-like modules with playful offsets',
  ],
  motion: [
    'quiet scroll reveals',
    'kinetic headline flips',
    'cursor-responsive fields',
    'pinned product cutaway',
    'agent timeline pulses',
    'slow editorial fades',
    'playful hover squish',
    'data gradually appearing',
    '3D object drift',
    'minimal state transitions',
  ],
  layout: [
    'full landing page with hero, proof, features, and CTA',
    'single-page story with scroll chapters',
    'product demo stage with side annotations',
    'editorial page with oversized rhythm',
    'dashboard-like landing page with real UI panels',
    'gallery-led page with modular cards',
  ],
  avoid: [
    'default shadcn card stacks',
    'generic purple-blue gradients',
    'meaningless bento grids',
    'oversized SaaS slogans',
    'decorative blobs without purpose',
    'fake dashboard filler',
    'stock-like landing page sections',
    'over-animated portfolio tricks',
  ],
};

const briefState = {
  projectType: 'SaaS landing page',
  audience: 'solo founders and vibe coders',
  brandColorName: 'red',
  brandColor: '#ef4444',
  mood: 'delicate',
  detailStyle: 'fine lines and pale shadows',
  motion: 'quiet scroll reveals',
  layout: 'full landing page with hero, proof, features, and CTA',
  avoid: 'default shadcn card stacks',
};

const DETAIL_TOKEN_PRESETS = {
  'fine lines and pale shadows': { radius: '12px', bw: '0.5px', shadow: '0 12px 34px rgba(31,27,22,0.08)', ls: '0', fw: 470 },
  'soft glass panels and quiet depth': { radius: '18px', bw: '1px', shadow: '0 18px 50px rgba(60,72,88,0.14)', ls: '-0.01em', fw: 500 },
  'chunky cartoon panels': { radius: '18px', bw: '3px', shadow: '6px 6px 0 rgba(23,23,23,0.22)', ls: '0.01em', fw: 740 },
  'editorial whitespace and sharp type': { radius: '2px', bw: '1px', shadow: 'none', ls: '-0.03em', fw: 560 },
  'dense product UI with precise borders': { radius: '7px', bw: '1px', shadow: '0 6px 18px rgba(20,20,20,0.08)', ls: '0', fw: 520 },
  '3D stage objects and spatial layers': { radius: '24px', bw: '1px', shadow: '0 26px 70px rgba(31,27,22,0.18)', ls: '-0.02em', fw: 620 },
  'paper texture and hand-drawn accents': { radius: '6px', bw: '2px', shadow: '3px 3px 0 rgba(31,27,22,0.18)', ls: '0.02em', fw: 560 },
  'neon edges with controlled darkness': { radius: '8px', bw: '1px', shadow: '0 0 24px rgba(99,102,241,0.28)', ls: '0.06em', fw: 620 },
  'medical-clean cards and calm spacing': { radius: '14px', bw: '1px', shadow: '0 12px 34px rgba(30,92,86,0.10)', ls: '0', fw: 500 },
  'sticker-like modules with playful offsets': { radius: '20px', bw: '2px', shadow: '8px 8px 0 rgba(23,23,23,0.16)', ls: '0', fw: 680 },
};

const MOOD_FONT_PRESETS = {
  delicate: { heading: 'Cormorant Garamond', body: 'Inter' },
  playful: { heading: 'Fredoka', body: 'Nunito' },
  editorial: { heading: 'Playfair Display', body: 'DM Sans' },
  premium: { heading: 'DM Serif Display', body: 'Manrope' },
  technical: { heading: 'Space Grotesk', body: 'Inter' },
  cartoonish: { heading: 'Bangers', body: 'Fredoka' },
  calm: { heading: 'Sora', body: 'Inter' },
  cinematic: { heading: 'Bebas Neue', body: 'Sora' },
  warm: { heading: 'Lora', body: 'DM Sans' },
  'weird but usable': { heading: 'Righteous', body: 'Space Grotesk' },
};

// ── Get display value for a parameter ──
function getWidgetDisplay(paramId) {
  const s = designState;
  const def = PARAM_DEFS[paramId];
  switch(paramId) {
    case 'bg':        return { value: s.bg || '#ffffff', hex: tryHex(s.bg || '#ffffff') };
    case 'fg':        return { value: s.fg || '#1a1a1a', hex: tryHex(s.fg || '#1a1a1a') };
    case 'primary':   return { value: s.primary || '#6366f1', hex: tryHex(s.primary || '#6366f1') };
    case 'fontHeading':return { value: s.fontHeading || 'Inter', fontFamily: "'" + (s.fontHeading || 'Inter') + "',sans-serif" };
    case 'fontBody':  return { value: s.fontBody || 'Inter', fontFamily: "'" + (s.fontBody || 'Inter') + "',sans-serif" };
    case 'radius':    return { value: s.radius || '0.625rem' };
    case 'bw':        return { value: s.bw || '1px' };
    case 'shadow':    return { value: shadowLabel(s.shadow) };
    case 'ls':        return { value: s.ls || '0' };
    case 'fw':        return { value: String(s.fw || 500) };
    case 'fs':        return { value: s.fs || '0.875rem' };
    case 'titleFs':   return { value: s.titleFs || '1rem' };
    default:          return { value: '?' };
  }
}

function tryHex(color) {
  try { return oklchToHex(color); } catch(e) { return '#888888'; }
}

function shadowLabel(shadow) {
  if (!shadow || shadow === 'none') return 'none';
  if (shadow.includes('0 0 20px') || shadow.includes('0 0 30px')) return 'neon';
  if (shadow.includes('8px 8px') || shadow.includes('10px 10px')) return 'hard';
  if (shadow.includes('4px 16px') || shadow.includes('0 4px 12px') || shadow.includes('0 4px 16px')) return 'medium';
  return 'subtle';
}

function shadowValue(label) {
  const map = {
    'none': 'none',
    'subtle': '0 1px 2px rgba(0,0,0,0.05)',
    'medium': '0 4px 16px rgba(0,0,0,0.1)',
    'hard': '8px 8px 0 rgba(0,0,0,0.15)',
    'neon': '0 0 20px rgba(99,102,241,0.4)',
  };
  return map[label] || map['subtle'];
}

function escapeHtmlText(value) {
  return String(value).replace(/[&<>"']/g, function(ch) {
    return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch];
  });
}

function briefSelect(key) {
  var choices = BRIEF_CHOICES[key] || [];
  var current = briefState[key];
  var html = '<span class="nl-blank"><select data-brief="' + key + '" aria-label="' + key + '">';
  choices.forEach(function(choice) {
    html += '<option value="' + escapeHtmlText(choice) + '"' + (choice === current ? ' selected' : '') + '>' + escapeHtmlText(choice) + '</option>';
  });
  if (current && choices.indexOf(current) === -1) {
    html += '<option value="' + escapeHtmlText(current) + '" selected>' + escapeHtmlText(current) + '</option>';
  }
  html += '</select></span>';
  return html;
}

function briefColorControls() {
  var html = '<span class="nl-color-blank">';
  html += '<input type="color" data-brief="brandColor" value="' + escapeHtmlText(briefState.brandColor) + '" aria-label="brand color">';
  html += '<select data-brief="brandColorName" aria-label="brand color name">';
  COLOR_PRESETS.forEach(function(color) {
    html += '<option value="' + escapeHtmlText(color.label) + '"' + (color.label === briefState.brandColorName ? ' selected' : '') + '>' + escapeHtmlText(color.label) + '</option>';
  });
  if (!COLOR_PRESETS.some(function(color) { return color.label === briefState.brandColorName; })) {
    html += '<option value="' + escapeHtmlText(briefState.brandColorName) + '" selected>' + escapeHtmlText(briefState.brandColorName) + '</option>';
  }
  html += '</select></span>';
  return html;
}

function randomizeBrief() {
  function pickChoice(key) { return pick(BRIEF_CHOICES[key]); }
  var color = pick(COLOR_PRESETS);
  briefState.projectType = pickChoice('projectType');
  briefState.audience = pickChoice('audience');
  briefState.brandColorName = color.label;
  briefState.brandColor = color.value;
  briefState.mood = pickChoice('mood');
  briefState.detailStyle = pickChoice('detailStyle');
  briefState.motion = pickChoice('motion');
  briefState.layout = pickChoice('layout');
  briefState.avoid = pickChoice('avoid');
}

function readableTextOn(hex) {
  var clean = String(hex || '').replace('#', '');
  if (clean.length !== 6) return '#ffffff';
  var r = parseInt(clean.slice(0, 2), 16) / 255;
  var g = parseInt(clean.slice(2, 4), 16) / 255;
  var b = parseInt(clean.slice(4, 6), 16) / 255;
  var lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return lum > 0.62 ? '#171717' : '#ffffff';
}

function applyBriefToDesign() {
  var r = document.documentElement.style;
  var tokenPreset = DETAIL_TOKEN_PRESETS[briefState.detailStyle] || DETAIL_TOKEN_PRESETS['fine lines and pale shadows'];
  var fontPreset = MOOD_FONT_PRESETS[briefState.mood] || MOOD_FONT_PRESETS.delicate;
  var recipeTokens = currentRecipeState && currentRecipeState.tokenHints ? currentRecipeState.tokenHints : {};
  var primary = briefState.brandColor || recipeTokens.primary || '#ef4444';
  var bg = recipeTokens.bg;
  var fg = recipeTokens.fg;
  var surface = recipeTokens.surface;
  r.setProperty('--primary', primary);
  r.setProperty('--primary-fg', readableTextOn(primary));
  r.setProperty('--ring', primary);
  if (bg) {
    r.setProperty('--bg', bg);
    document.body.style.backgroundColor = bg;
    designState.bg = bg;
  }
  if (fg) {
    r.setProperty('--fg', fg);
    designState.fg = fg;
  }
  if (surface) {
    r.setProperty('--card', surface);
    r.setProperty('--card-bg', surface);
    if (fg) r.setProperty('--card-fg', fg);
    designState.card = surface;
    if (fg) designState.cardFg = fg;
  }
  r.setProperty('--radius', tokenPreset.radius);
  r.setProperty('--bw', tokenPreset.bw);
  r.setProperty('--shadow', tokenPreset.shadow);
  if (recipeTokens.radius) r.setProperty('--radius', recipeTokens.radius);
  if (recipeTokens.shadow) r.setProperty('--shadow', recipeTokens.shadow);
  r.setProperty('--ls', tokenPreset.ls);
  r.setProperty('--fw', tokenPreset.fw);
  r.setProperty('--font-heading', "'" + fontPreset.heading + "',system-ui,sans-serif");
  r.setProperty('--font', "'" + fontPreset.body + "',system-ui,sans-serif");
  Object.assign(designState, {
    primary: primary,
    primaryFg: readableTextOn(primary),
    radius: recipeTokens.radius || tokenPreset.radius,
    bw: tokenPreset.bw,
    shadow: recipeTokens.shadow || tokenPreset.shadow,
    ls: tokenPreset.ls,
    fw: tokenPreset.fw,
    fontHeading: fontPreset.heading,
    fontBody: fontPreset.body,
  });
}

function recipeMatchesBrief(recipe) {
  if (!recipe) return false;
  var projectMatch = (recipe.projectTypes || []).some(function(type) {
    return type === briefState.projectType;
  });
  var moodMatch = (recipe.mood || []).some(function(mood) {
    return mood === briefState.mood;
  });
  return projectMatch || moodMatch;
}

function pickRecipeForBrief() {
  if (!CREATIVE_RECIPES.length) return null;
  var matches = CREATIVE_RECIPES.filter(recipeMatchesBrief);
  var pool = matches.length ? matches : CREATIVE_RECIPES;
  var recipe = pick(pool);
  if (pool.length > 1) {
    var guard = 0;
    while (recipe && currentRecipeState && recipe.id === currentRecipeState.id && guard < 8) {
      recipe = pick(pool);
      guard += 1;
    }
  }
  return recipe;
}

function applyRecipeToBrief(recipe) {
  if (!recipe) return;
  currentRecipeState = recipe;
  if (recipe.projectTypes && recipe.projectTypes.length) briefState.projectType = pick(recipe.projectTypes);
  if (recipe.mood && recipe.mood.length) briefState.mood = pick(recipe.mood);
  if (recipe.motionPrinciples && recipe.motionPrinciples.length) briefState.motion = recipe.motionPrinciples[0];
  if (recipe.layoutDirection) briefState.layout = recipe.layoutDirection;
  if (recipe.avoid && recipe.avoid.length) briefState.avoid = recipe.avoid[0];
}

function runPromptSurprise() {
  surprise();
  randomizeBrief();
  applyRecipeToBrief(pickRecipeForBrief());
  applyBriefToDesign();
  renderSentence({ animate: true });
  renderOutputPanel();
  updateCanvasToolbar();
}

// ── Render sentence ──
function renderSentence(opts) {
  opts = opts || {};
  const sb = document.getElementById('sidebar');
  if (!sb) return;
  const animate = opts.animate !== false;

  let html = '<div class="nl-builder' + (animate ? ' nl-builder-fresh' : '') + '" id="prompt-builder">';
  html += '<div class="panel-title">Prompt Builder</div>';
  html += '<div class="nl-sentence">';
  html += '<p>I want to design a ' + briefSelect('projectType') + '</p>';
  html += '<p>For ' + briefSelect('audience') + '</p>';
  html += '<p>My brand color is ' + briefColorControls() + '</p>';
  html += '<p>I want it to feel ' + briefSelect('mood') + ', with ' + briefSelect('detailStyle') + '</p>';
  html += '<p>The page should use ' + briefSelect('motion') + ' and become a ' + briefSelect('layout') + '</p>';
  html += '<p>Avoid ' + briefSelect('avoid') + '</p>';
  html += '</div>';
  html += '<div class="pw-actions nl-actions">';
  html += '<button class="pw-surprise-btn" id="pw-surprise-btn">Surprise me</button>';
  html += '<button class="pw-copy-btn" id="copy-prompt">Copy Prompt</button>';
  html += '</div>';
  html += '<div class="sidebar-footer">Tune the brief here. Copy the full prompt, CSS, and Agent JSON from the result panel.</div>';
  html += '</div>';

  sb.innerHTML = html;

  // Bind events
  bindSentenceEvents();
}

// ── Bind sentence events ──
function bindSentenceEvents() {
  document.querySelectorAll('[data-brief]').forEach(function(control) {
    control.addEventListener('change', function() {
      var key = control.getAttribute('data-brief');
      if (!key) return;
      if (key === 'brandColorName') {
        var preset = COLOR_PRESETS.find(function(item) { return item.label === control.value; });
        if (preset) {
          briefState.brandColorName = preset.label;
          briefState.brandColor = preset.value;
        }
      } else if (key === 'brandColor') {
        briefState.brandColor = control.value;
        briefState.brandColorName = 'custom ' + control.value;
      } else {
        briefState[key] = control.value;
      }
      applyBriefToDesign();
      renderOutputPanel();
      updateCanvasToolbar();
      renderSentence({ animate: false });
    });
  });

  var copyBtn = document.getElementById('copy-prompt');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      var prompt = generatePrompt();
      navigator.clipboard.writeText(prompt).then(function() {
        copyBtn.textContent = 'Copied';
        copyBtn.classList.add('copied');
        fireConfetti();
        setTimeout(function() { copyBtn.textContent = 'Copy Prompt'; copyBtn.classList.remove('copied'); }, 1600);
      });
    });
  }

  var surpriseBtn = document.getElementById('pw-surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', runPromptSurprise);
  }
}

// ── Show edit panel ──
function showEditPanel(paramId) {
  var def = PARAM_DEFS[paramId];
  if (!def) return;
  currentEditPanel = paramId;

  var panel = document.getElementById('pw-edit-panel');
  var title = document.getElementById('pw-ep-title');
  var icon = document.getElementById('pw-ep-icon');
  var body = document.getElementById('pw-ep-body');

  title.textContent = 'Edit: ' + def.label;
  icon.textContent = def.emoji;

  // Mark active widget
  document.querySelectorAll('.pw-widget').forEach(function(w) {
    w.classList.toggle('active', w.getAttribute('data-param') === paramId);
  });

  // Build panel content based on type
  if (def.type === 'color') {
    body.innerHTML = buildColorPanel(paramId);
    bindColorPanelEvents(paramId);
  } else if (def.type === 'font') {
    body.innerHTML = buildFontPanel(paramId);
    bindFontPanelEvents(paramId);
  } else if (def.type === 'slider' || def.type === 'stepper') {
    body.innerHTML = buildSliderPanel(paramId);
    bindSliderPanelEvents(paramId);
  } else if (def.type === 'choice') {
    body.innerHTML = buildChoicePanel(paramId);
    bindChoicePanelEvents(paramId);
  }

  panel.classList.add('open');
}

function hideEditPanel() {
  var panel = document.getElementById('pw-edit-panel');
  if (panel) panel.classList.remove('open');
  document.querySelectorAll('.pw-widget').forEach(function(w) { w.classList.remove('active'); });
  currentEditPanel = null;
}

// ── Color panel ──
function buildColorPanel(paramId) {
  var d = getWidgetDisplay(paramId);
  var hex = d.hex;
  var presets = [
    '#ffffff','#f8f9fa','#e9ecef','#dee2e6','#ced4da','#adb5bd','#6c757d','#343a40','#212529','#000000',
    '#fff5f5','#ffe3e3','#ffc9c9','#ffa8a8','#ff8787','#ff6b6b','#fa5252','#f03e3e','#e03131','#c92a2a',
    '#fff0f6','#fcc2d7','#faa2c1','#f783ac','#e64980','#d6336c','#ae3ec9','#862e9c','#7048e8','#5f3dc4',
    '#f3f0ff','#d0bfff','#b197fc','#9775fa','#845ef7','#7950f2','#7048e8','#6741d9','#5f3dc4','#4c1d95',
    '#e7f5ff','#d0ebff','#a5d8ff','#74c0fc','#4dabf7','#339af0','#228be6','#1c7ed6','#1971c2','#1864ab',
    '#e6fcf5','#c3fae8','#96f2d7','#63e6be','#38d9a9','#20c997','#12b886','#0ca678','#099268','#087f5b',
    '#fcf4db','#f5d76e','#f7c948','#fab005','#f59f00','#f08c00','#e67700','#d9480f','#c92a2a','#a51d1d',
  ];
  var html = '<div class="pw-color-preview" id="pw-color-preview" style="background:' + hex + '">';
  html += '<div class="pw-color-preview-hex" id="pw-color-hex-label">' + hex + '</div>';
  html += '</div>';
  html += '<div class="pw-color-presets">';
  presets.forEach(function(c) {
    var active = c === hex ? ' active' : '';
    html += '<div class="pw-color-preset' + active + '" data-color="' + c + '" style="background:' + c + '"></div>';
  });
  html += '</div>';
  html += '<div class="pw-color-custom">';
  html += '<label>Custom</label>';
  html += '<input type="color" id="pw-color-picker" value="' + hex + '">';
  html += '<input type="text" class="pw-color-hex-input" id="pw-color-hex-input" value="' + hex + '" maxlength="7">';
  html += '</div>';
  return html;
}

function bindColorPanelEvents(paramId) {
  // Preset clicks
  document.querySelectorAll('.pw-color-preset').forEach(function(p) {
    p.addEventListener('click', function() {
      var c = p.getAttribute('data-color');
      applyColorValue(paramId, c);
      document.querySelectorAll('.pw-color-preset').forEach(function(x) { x.classList.remove('active'); });
      p.classList.add('active');
    });
  });

  // Color picker
  var picker = document.getElementById('pw-color-picker');
  if (picker) {
    picker.addEventListener('input', function() {
      applyColorValue(paramId, picker.value);
      var preview = document.getElementById('pw-color-preview');
      var label = document.getElementById('pw-color-hex-label');
      if (preview) preview.style.background = picker.value;
      if (label) label.textContent = picker.value;
      var hexInput = document.getElementById('pw-color-hex-input');
      if (hexInput) hexInput.value = picker.value;
    });
  }

  // Hex input
  var hexInput = document.getElementById('pw-color-hex-input');
  if (hexInput) {
    hexInput.addEventListener('change', function() {
      var v = hexInput.value.trim();
      if (/^#[0-9a-fA-F]{6}$/.test(v)) {
        applyColorValue(paramId, v);
        var preview = document.getElementById('pw-color-preview');
        var label = document.getElementById('pw-color-hex-label');
        if (preview) preview.style.background = v;
        if (label) label.textContent = v;
        if (picker) picker.value = v;
      }
    });
  }
}

function applyColorValue(paramId, color) {
  var cssVar = paramId === 'bg' ? '--bg' : paramId === 'fg' ? '--fg' : '--primary';
  document.documentElement.style.setProperty(cssVar, color);
  designState[paramId] = color;
  if (paramId === 'bg') document.body.style.backgroundColor = color;
  updateWidgetDisplay(paramId);
}

// ── Font panel ──
function buildFontPanel(paramId) {
  var def = PARAM_DEFS[paramId];
  var current = paramId === 'fontHeading' ? (designState.fontHeading || 'Inter') : (designState.fontBody || 'Inter');
  var fonts = def.fontRole === 'heading'
    ? [...FONTS_DISPLAY, ...FONTS_SERIF, ...FONTS_SANS]
    : [...FONTS_SANS, ...FONTS_SERIF];

  var html = '<div class="pw-font-list">';
  fonts.forEach(function(f) {
    var active = f === current ? ' active' : '';
    html += '<div class="pw-font-item' + active + '" data-font="' + f + '" style="font-family:\'' + f + '\',sans-serif">';
    html += f;
    html += '<span class="pw-font-item-check">✓</span>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function bindFontPanelEvents(paramId) {
  var varName = paramId === 'fontHeading' ? '--font-heading' : '--font';
  var stateKey = paramId === 'fontHeading' ? 'fontHeading' : 'fontBody';

  document.querySelectorAll('.pw-font-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var f = item.getAttribute('data-font');
      document.documentElement.style.setProperty(varName, "'" + f + "',system-ui,sans-serif");
      designState[stateKey] = f;
      document.querySelectorAll('.pw-font-item').forEach(function(x) { x.classList.remove('active'); });
      item.classList.add('active');
      updateWidgetDisplay(paramId);
    });
  });
}

// ── Slider panel ──
function buildSliderPanel(paramId) {
  var def = PARAM_DEFS[paramId];
  var current = getWidgetDisplay(paramId).value;
  var numVal = parseFloat(current) || 0;

  var html = '<div class="pw-slider-current" id="pw-slider-val">' + current + '</div>';
  html += '<input type="range" class="pw-slider-input" id="pw-slider-input" min="' + def.min + '" max="' + def.max + '" step="' + def.step + '" value="' + numVal + '">';
  html += '<div class="pw-slider-presets">';
  def.presets.forEach(function(p) {
    var active = p === current ? ' active' : '';
    html += '<button class="pw-slider-preset' + active + '" data-value="' + p + '">' + p + '</button>';
  });
  html += '</div>';
  return html;
}

function bindSliderPanelEvents(paramId) {
  var def = PARAM_DEFS[paramId];
  var stateKey = paramId === 'radius' ? 'radius' : paramId === 'bw' ? 'bw' :
                 paramId === 'ls' ? 'ls' : paramId === 'fw' ? 'fw' :
                 paramId === 'fs' ? 'fs' : paramId === 'titleFs' ? 'titleFs' : paramId;
  var cssVar = paramId === 'radius' ? '--radius' : paramId === 'bw' ? '--bw' :
               paramId === 'ls' ? '--ls' : paramId === 'fw' ? '--fw' :
               paramId === 'fs' ? '--fs' : paramId === 'titleFs' ? '--title-fs' : '--' + paramId;

  var slider = document.getElementById('pw-slider-input');
  var label = document.getElementById('pw-slider-val');

  if (slider) {
    slider.addEventListener('input', function() {
      var v = slider.value + def.unit;
      if (paramId === 'fw') v = parseInt(slider.value);
      label.textContent = v;
      document.documentElement.style.setProperty(cssVar, v);
      designState[stateKey] = v;
      updateWidgetDisplay(paramId);
    });
  }

  document.querySelectorAll('.pw-slider-preset').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var v = btn.getAttribute('data-value');
      var numV = parseFloat(v);
      if (slider) slider.value = numV;
      if (label) label.textContent = v;
      document.documentElement.style.setProperty(cssVar, v);
      designState[stateKey] = paramId === 'fw' ? parseInt(v) : v;
      document.querySelectorAll('.pw-slider-preset').forEach(function(x) { x.classList.remove('active'); });
      btn.classList.add('active');
      updateWidgetDisplay(paramId);
    });
  });
}

// ── Choice panel ──
function buildChoicePanel(paramId) {
  var def = PARAM_DEFS[paramId];
  var current = shadowLabel(designState.shadow);

  var html = '<div class="pw-choice-list">';
  def.choices.forEach(function(c) {
    var active = c === current ? ' active' : '';
    var swatchBg = c === 'none' ? 'rgba(255,255,255,0.05)' : c;
    // Visual preview for shadows
    var previewStyle = '';
    if (c === 'none') previewStyle = 'background:rgba(255,255,255,0.05)';
    else if (c === 'subtle') previewStyle = 'background:rgba(255,255,255,0.1);box-shadow:0 1px 2px rgba(0,0,0,0.05)';
    else if (c === 'medium') previewStyle = 'background:rgba(255,255,255,0.1);box-shadow:0 4px 16px rgba(0,0,0,0.1)';
    else if (c === 'hard') previewStyle = 'background:rgba(255,255,255,0.1);box-shadow:8px 8px 0 rgba(0,0,0,0.15)';
    else if (c === 'neon') previewStyle = 'background:rgba(99,102,241,0.15);box-shadow:0 0 20px rgba(99,102,241,0.4)';

    html += '<div class="pw-choice-item' + active + '" data-choice="' + c + '">';
    html += '<div class="pw-choice-preview" style="' + previewStyle + '"></div>';
    html += '<span class="pw-choice-label">' + c + '</span>';
    html += '<span class="pw-choice-check">✓</span>';
    html += '</div>';
  });
  html += '</div>';
  return html;
}

function bindChoicePanelEvents(paramId) {
  document.querySelectorAll('.pw-choice-item').forEach(function(item) {
    item.addEventListener('click', function() {
      var c = item.getAttribute('data-choice');
      var val = shadowValue(c);
      document.documentElement.style.setProperty('--shadow', val);
      designState.shadow = val;
      document.querySelectorAll('.pw-choice-item').forEach(function(x) { x.classList.remove('active'); });
      item.classList.add('active');
      updateWidgetDisplay(paramId);
    });
  });
}

// ── Update a single widget's display ──
function updateWidgetDisplay(paramId) {
  var w = document.querySelector('.pw-widget[data-param="' + paramId + '"]');
  if (!w) return;
  var def = PARAM_DEFS[paramId];
  var d = getWidgetDisplay(paramId);

  // Update value display
  var valueEl = w.querySelector('.pw-widget-value');
  if (valueEl) {
    if (def.type === 'color') {
      var swatch = w.querySelector('.pw-widget-swatch');
      if (swatch) swatch.style.background = d.hex;
      valueEl.textContent = d.hex;
    } else if (def.type === 'font') {
      valueEl.style.fontFamily = d.fontFamily;
      valueEl.textContent = d.value;
    } else {
      valueEl.textContent = d.value;
    }
  }

  // Flash animation
  w.classList.remove('pw-widget-flash');
  void w.offsetWidth; // force reflow
  w.classList.add('pw-widget-flash');
}

// ── Update all widgets (called by surprise) ──
function updateAllWidgets() {
  activeParams.forEach(function(pid) {
    updateWidgetDisplay(pid);
  });
}

// ── Add/Remove parameters ──
function addParameter(paramId) {
  if (activeParams.indexOf(paramId) !== -1) return;
  activeParams.push(paramId);
  renderSentence({ animate: true });
}

function removeParameter(paramId) {
  var idx = activeParams.indexOf(paramId);
  if (idx === -1) return;
  activeParams.splice(idx, 1);
  renderSentence({ animate: true });
}

// ── Apply theme (called by surprise) ──
function applyTheme(p) {
  var r = document.documentElement.style;
  r.setProperty('--bg', p.bg); r.setProperty('--fg', p.fg);
  r.setProperty('--card', p.card); r.setProperty('--card-fg', p.cardFg);
  r.setProperty('--muted', p.muted); r.setProperty('--muted-fg', p.mutedFg);
  r.setProperty('--primary', p.primary); r.setProperty('--primary-fg', p.primaryFg);
  r.setProperty('--secondary', p.secondary); r.setProperty('--secondary-fg', p.secondaryFg);
  r.setProperty('--border', p.border); r.setProperty('--input', p.input);
  r.setProperty('--destructive', p.destructive); r.setProperty('--ring', p.primary);
  r.setProperty('--radius', p.radius); r.setProperty('--bw', p.bw); r.setProperty('--shadow', p.shadow);
  r.setProperty('--card-bg', 'var(--card)');
  document.body.style.backgroundColor = p.bg;

  Object.assign(designState, {
    bg: p.bg, fg: p.fg, card: p.card, primary: p.primary,
    muted: p.muted, border: p.border, destructive: p.destructive,
    radius: p.radius, bw: p.bw, shadow: p.shadow, dark: p.dark
  });
}

function oklchToHex(oklch) {
  var div = document.createElement('div');
  div.style.color = oklch;
  document.body.appendChild(div);
  var computed = getComputedStyle(div).color;
  document.body.removeChild(div);
  var match = computed.match(/(\d+)/g);
  if (!match) return '#000000';
  return '#' + match.slice(0,3).map(function(n) { return parseInt(n).toString(16).padStart(2,'0'); }).join('');
}

function generatePrompt() {
  var s = designState;
  var recipe = currentRecipeState || {};
  return 'Design a ' + briefState.projectType + ' for a real product, not a generic template.\n\n' +
    'Natural language brief:\n' +
    '- Audience: ' + briefState.audience + '\n' +
    '- Brand color: ' + briefState.brandColorName + ' (' + briefState.brandColor + ')\n' +
    '- Desired feeling: ' + briefState.mood + '\n' +
    '- Visual detail: ' + briefState.detailStyle + '\n' +
    '- Motion language: ' + briefState.motion + '\n' +
    '- Page structure: ' + briefState.layout + '\n\n' +
    'UnBoring direction: ' + (recipe.title || 'Custom Direction') + '\n' +
    '- ' + (recipe.prompt || 'Build a complete first-screen-to-CTA landing page, not just a hero section.') + '\n' +
    '- Visual principles: ' + ((recipe.visualPrinciples || []).join(', ') || 'distinctive typography, meaningful spacing, tailored hierarchy') + '\n' +
    '- Motion principles: ' + ((recipe.motionPrinciples || []).join(', ') || briefState.motion) + '\n' +
    '- Layout direction: ' + (recipe.layoutDirection || briefState.layout) + '\n' +
    '- Recommended components: ' + ((recipe.recommendedComponents || []).join(', ') || 'hero, proof, features, visual demo, CTA') + '\n\n' +
    'Current system tokens:\n' +
    '- Background: ' + (s.bg || '#ffffff') + '\n' +
    '- Foreground: ' + (s.fg || '#1a1a1a') + '\n' +
    '- Primary: ' + (s.primary || briefState.brandColor) + '\n' +
    '- Heading font: ' + (s.fontHeading || 'Inter') + '\n' +
    '- Body font: ' + (s.fontBody || 'Inter') + '\n' +
    '- Border radius: ' + (s.radius || '0.625rem') + '\n' +
    '- Border width: ' + (s.bw || '1px') + '\n' +
    '- Shadow: ' + (s.shadow || 'none') + '\n\n' +
    'Avoid:\n' +
    '- ' + generateAvoidText();
}

function updatePromptBlock() {
  var preview = document.getElementById('prompt-preview');
  if (preview) preview.value = generatePrompt();
}

function generateAvoidText() {
  var recipe = currentRecipeState || {};
  var list = [];
  if (recipe.negativePrompt) list.push(recipe.negativePrompt);
  if (briefState.avoid) list.push(briefState.avoid);
  (recipe.avoid || []).forEach(function(item) { if (list.indexOf(item) === -1) list.push(item); });
  list.push('default shadcn card stacks');
  list.push('meaningless bento grids');
  list.push('generic purple-blue gradients');
  return list.filter(Boolean).join('; ');
}

function generateCssTokens() {
  var root = getComputedStyle(document.documentElement);
  var vars = ['--bg','--fg','--card','--card-fg','--primary','--primary-fg','--muted','--muted-fg','--border','--radius','--bw','--shadow','--font','--font-heading','--ls','--fw'];
  var css = '/* UnBoring: ' + ((currentRecipeState && currentRecipeState.title) || 'Custom Direction') + ' */\n:root {\n';
  vars.forEach(function(v) {
    var val = root.getPropertyValue(v).trim();
    if (val) css += '  ' + v + ': ' + val + ';\n';
  });
  return css + '}';
}

function generateAgentJson() {
  var recipe = currentRecipeState || {};
  return JSON.stringify({
    source: 'UnBoring',
    recipeId: recipe.id || 'custom',
    title: recipe.title || 'Custom Direction',
    projectType: briefState.projectType,
    audience: briefState.audience,
    brandColor: { name: briefState.brandColorName, value: briefState.brandColor },
    mood: briefState.mood,
    visualDetail: briefState.detailStyle,
    motionLanguage: briefState.motion,
    layoutDirection: recipe.layoutDirection || briefState.layout,
    visualPrinciples: recipe.visualPrinciples || [],
    motionPrinciples: recipe.motionPrinciples || [],
    recommendedComponents: recipe.recommendedComponents || [],
    recommendedMotionCards: recipe.recommendedMotionCards || [],
    tokens: {
      background: designState.bg || '',
      foreground: designState.fg || '',
      primary: designState.primary || briefState.brandColor,
      radius: designState.radius || '',
      borderWidth: designState.bw || '',
      shadow: designState.shadow || '',
      headingFont: designState.fontHeading || '',
      bodyFont: designState.fontBody || ''
    },
    prompt: generatePrompt(),
    negativePrompt: generateAvoidText()
  }, null, 2);
}

function copyTextFromButton(btn, text) {
  if (!btn || !navigator.clipboard) return;
  var original = btn.textContent;
  navigator.clipboard.writeText(text).then(function() {
    btn.textContent = 'Copied';
    btn.classList.add('copied');
    setTimeout(function() {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 1400);
  });
}

function renderOutputPanel() {
  var panel = document.getElementById('right-panel');
  if (!panel) return;
  var recipe = currentRecipeState || {};
  var title = recipe.title || 'Custom Direction';
  var visual = (recipe.visualPrinciples || []).join(', ') || briefState.detailStyle;
  var motion = (recipe.motionPrinciples || []).join(', ') || briefState.motion;
  var css = generateCssTokens();
  var agent = generateAgentJson();
  var avoid = generateAvoidText();
  panel.innerHTML =
    '<div class="right-card output-hero">' +
      '<div class="right-kicker">Design Direction</div>' +
      '<h2>' + escapeHtmlText(title) + '</h2>' +
      '<p>' + escapeHtmlText(recipe.layoutDirection || briefState.layout) + '</p>' +
      '<div class="output-pills"><span>' + escapeHtmlText(briefState.projectType) + '</span><span>' + escapeHtmlText(briefState.mood) + '</span></div>' +
    '</div>' +
    outputBlock('Direction', 'Copy direction', title + '\\n' + (recipe.layoutDirection || briefState.layout) + '\\nVisual: ' + visual + '\\nMotion: ' + motion,
      '<p><strong>Visual:</strong> ' + escapeHtmlText(visual) + '</p><p><strong>Motion:</strong> ' + escapeHtmlText(motion) + '</p><p><strong>Components:</strong> ' + escapeHtmlText((recipe.recommendedComponents || []).join(', ') || 'hero, proof, features, CTA') + '</p>') +
    outputBlock('Prompt', 'Copy prompt', generatePrompt(), '<pre>' + escapeHtmlText(generatePrompt()) + '</pre>') +
    outputBlock('CSS Tokens', 'Copy CSS', css, '<pre>' + escapeHtmlText(css) + '</pre>') +
    outputBlock('Agent JSON', 'Copy JSON', agent, '<pre>' + escapeHtmlText(agent) + '</pre>') +
    outputBlock('Avoid', 'Copy avoid', avoid, '<p>' + escapeHtmlText(avoid) + '</p>');

  panel.querySelectorAll('[data-copy-value]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      copyTextFromButton(btn, btn.getAttribute('data-copy-value') || '');
    });
  });
}

function outputBlock(kicker, copyLabel, value, body) {
  return '<div class="right-card output-block">' +
    '<div class="output-head"><div class="right-kicker">' + escapeHtmlText(kicker) + '</div><button type="button" data-copy-value="' + escapeHtmlText(value) + '">' + escapeHtmlText(copyLabel) + '</button></div>' +
    body +
    '</div>';
}

function updateCanvasToolbar() {
  var toolbar = document.getElementById('canvas-toolbar');
  if (!toolbar) return;
  var recipe = currentRecipeState || {};
  toolbar.innerHTML = '<span>Canvas Preview</span><span>' + escapeHtmlText(recipe.title || 'Custom Direction') + ' · ' + escapeHtmlText(briefState.projectType) + ' · ' + escapeHtmlText(briefState.motion) + '</span>';
}

function updateThemeStrip() {
  // No longer needed (theme strip removed in new design)
}

// ── Confetti ──
function fireConfetti() {
  var canvas = document.createElement('canvas');
  canvas.className = 'pw-confetti-canvas';
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  var colors = ['#ff6b6b','#fbbf24','#34d399','#60a5fa','#a78bfa','#f472b6','#fb923c'];
  var particles = [];
  for (var i = 0; i < 80; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: Math.random() * -14 - 4,
      w: Math.random() * 8 + 4,
      h: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      rot: Math.random() * 360,
      rotV: (Math.random() - 0.5) * 12,
      life: 1,
    });
  }

  var running = true;
  function frame() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var alive = false;
    particles.forEach(function(p) {
      p.x += p.vx;
      p.vy += 0.35;
      p.y += p.vy;
      p.rot += p.rotV;
      p.life -= 0.012;
      if (p.life <= 0) return;
      alive = true;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (alive) requestAnimationFrame(frame);
    else canvas.remove();
  }
  frame();
  setTimeout(function() { running = false; canvas.remove(); }, 3000);
}

// ── Drag & Drop (event delegation on .grid) ──
let draggedCard = null;
const grid = document.querySelector('.grid');

if (grid) {
  grid.addEventListener('dragstart', e => {
    const card = e.target.closest('.cn-card');
    if (!card) return;
    draggedCard = card;
    card.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
  });

  grid.addEventListener('dragend', e => {
    const card = e.target.closest('.cn-card');
    if (!card) return;
    card.classList.remove('dragging');
    document.querySelectorAll('.cn-card').forEach(c => c.classList.remove('drag-over'));
    draggedCard = null;
    saveLayout();
  });

  grid.addEventListener('dragover', e => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    document.querySelectorAll('.cn-card').forEach(c => c.classList.remove('drag-over'));
    const card = e.target.closest('.cn-card');
    if (card && card !== draggedCard) card.classList.add('drag-over');
  });

  grid.addEventListener('drop', e => {
    e.preventDefault();
    document.querySelectorAll('.cn-card').forEach(c => c.classList.remove('drag-over'));
    const target = e.target.closest('.cn-card');
    if (draggedCard && target && draggedCard !== target) {
      grid.insertBefore(draggedCard, target);
      saveLayout();
    }
  });

  // ── Width Toggle (event delegation) ──
  grid.addEventListener('click', e => {
    const btn = e.target.closest('.width-toggle');
    if (!btn) return;
    e.stopPropagation();
    const card = btn.closest('.cn-card');
    const w = parseInt(card.getAttribute('data-width') || '1');
    const newW = w === 1 ? 2 : 1;
    card.setAttribute('data-width', newW);
    btn.textContent = newW === 1 ? '2x' : '1x';
    saveLayout();
  });
}

// ── Layout Save/Load ──
function saveLayout() {
  const cards = document.querySelectorAll('.cn-card');
  const order = Array.from(cards).map(c => c.getAttribute('data-id'));
  const widths = {};
  cards.forEach(c => widths[c.getAttribute('data-id')] = parseInt(c.getAttribute('data-width') || '1'));
  try { localStorage.setItem('unboring-layout', JSON.stringify({ order, widths })); } catch(e) {}
}

function loadLayout() {
  if (!grid) return;
  try {
    const data = JSON.parse(localStorage.getItem('unboring-layout'));
    if (!data) return;
    const { order, widths } = data;
    order.forEach(id => {
      const card = grid.querySelector('[data-id="' + id + '"]');
      if (card) {
        const w = widths[id];
        if (w) {
          card.setAttribute('data-width', w);
          const toggle = card.querySelector('.width-toggle');
          if (toggle) toggle.textContent = w === 1 ? '2x' : '1x';
        }
        grid.appendChild(card);
      }
    });
  } catch(e) {}
}

// ── Tag hover bridge (card ↔ tag mouse transition) ──
document.querySelectorAll('.cn-card').forEach(card => {
  const tag = card.querySelector('.cn-card-tag');
  if (!tag) return;
  let t;
  const show = () => { clearTimeout(t); tag.classList.add('hover'); };
  const hide = () => { t = setTimeout(() => { if (!tag.matches(':hover') && !card.matches(':hover')) tag.classList.remove('hover'); }, 100); };
  card.addEventListener('mouseenter', show);
  tag.addEventListener('mouseenter', show);
  card.addEventListener('mouseleave', hide);
  tag.addEventListener('mouseleave', hide);
});

// ── Brand font mixing ──
var _brandPool = [];
function randomizeBrandFonts() {
  var brand = document.querySelector('.brand-text') || document.querySelector('.brand');
  if (!brand) return;
  var text = brand.textContent.trim();
  if (!text || brand.querySelector('span')) return;
  brand.textContent = '';
  brand.style.display = 'inline-flex';
  brand.style.gap = '3px';
  _brandPool = [...FONTS_DISPLAY, ...FONTS_SERIF, ...FONTS_HAND, ...FONTS_SANS];
  var letters = [];
  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (ch === ' ') { brand.appendChild(document.createTextNode(' ')); continue; }
    var span = document.createElement('span');
    span.className = 'bl';
    span.textContent = ch;
    span.style.fontFamily = "'" + pick(_brandPool) + "',system-ui,sans-serif";
    brand.appendChild(span);
    letters.push(span);
  }
  startBrandRoll(letters);
}
function startBrandRoll(letters) {
  function roll() {
    var next = letters.map(function() { return pick(_brandPool); });
    var pending = next.length;
    function check() { if (--pending > 0) return; go(); }
    next.forEach(function(font) {
      var tmp = document.createElement('span');
      tmp.style.fontFamily = "'" + font + "',system-ui,sans-serif";
      tmp.style.position = 'fixed'; tmp.style.top = '-999px'; tmp.style.opacity = '0';
      tmp.style.pointerEvents = 'none'; tmp.textContent = 'U';
      document.body.appendChild(tmp);
      if (document.fonts && document.fonts.load) {
        document.fonts.load('1em "' + font + '"', 'U').then(function() { tmp.remove(); check(); });
      } else { tmp.remove(); check(); }
    });
    function go() {
      letters.forEach(function(sp, i) {
        setTimeout(function() {
          sp.classList.add('bl-rolling');
          setTimeout(function() { sp.style.fontFamily = "'" + next[i] + "',system-ui,sans-serif"; }, 200);
          setTimeout(function() { sp.classList.remove('bl-rolling'); }, 500);
        }, i * 70);
      });
    }
  }
  roll();
  setInterval(roll, 15000);
}

// ── Init ──
randomizeBrandFonts();

if (HAS_CANVAS_APP) {
  applyBriefToDesign();
  renderSentence();
  renderOutputPanel();
  updateCanvasToolbar();
  currentScale = 1;
  panX = 0;
  panY = 0;
  apply();

  loadLayout();
}

// Surprise buttons can live in the header or the canvas toolbar depending on layout.
document.querySelectorAll('#surprise-btn, #canvas-surprise-btn').forEach(function(btn) {
  btn.addEventListener('click', function() { surprise(); });
});
const exportBtn = document.getElementById('export-btn');
if (exportBtn) exportBtn.addEventListener('click', exportCSS);

document.querySelectorAll('[data-copy]').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var id = btn.getAttribute('data-copy');
    var source = id ? document.getElementById(id) : null;
    if (!source) return;
    navigator.clipboard.writeText(source.textContent || '').then(function() {
      var original = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(function() { btn.textContent = original; }, 1400);
    });
  });
});

document.querySelectorAll('[data-accordion]').forEach(function(item) {
  var head = item.querySelector('.seo-accordion-head');
  if (!head) return;
  head.addEventListener('click', function() {
    var open = item.classList.toggle('open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
});
