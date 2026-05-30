// ── UnBoring App ──
// Canvas interaction, prompt builder sidebar, surprise randomization, export

const canvas = document.getElementById('canvas');
const content = document.getElementById('canvas-content');
let panX = 0, panY = 0, currentScale = 1, isDragging = false, startX, startY, startPanX, startPanY;
const PADDING = 200;

// ── Canvas Pan/Zoom ──
function clampPan() {
  const cw = canvas.clientWidth, ch = canvas.clientHeight;
  const grid = document.querySelector('.grid');
  const gw = grid ? grid.scrollWidth : 3120;
  const gh = grid ? grid.scrollHeight : 2400;
  panX = Math.min(PADDING, Math.max(cw - (gw * currentScale + PADDING), panX));
  panY = Math.min(PADDING, Math.max(ch - (gh * currentScale + PADDING), panY));
}
function apply() { clampPan(); content.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + currentScale + ')'; updateMinimap(); }

canvas.addEventListener('mousedown', e => { if (e.button) return; if (e.target.closest('.cn-card')) return; isDragging = true; startX = e.clientX; startY = e.clientY; startPanX = panX; startPanY = panY; document.body.classList.add('dragging'); });
window.addEventListener('mousemove', e => { if (!isDragging) return; panX = startPanX + (e.clientX - startX) / currentScale; panY = startPanY + (e.clientY - startY) / currentScale; apply(); });
window.addEventListener('mouseup', () => { isDragging = false; document.body.classList.remove('dragging'); });
canvas.addEventListener('touchstart', e => { if (e.touches.length === 2) { e.preventDefault(); isDragging = true; startX = (e.touches[0].clientX + e.touches[1].clientX) / 2; startY = (e.touches[0].clientY + e.touches[1].clientY) / 2; startPanX = panX; startPanY = panY; document.body.classList.add('dragging'); } }, { passive: false });
canvas.addEventListener('touchmove', e => { if (isDragging && e.touches.length === 2) { e.preventDefault(); const cx = (e.touches[0].clientX + e.touches[1].clientX) / 2; const cy = (e.touches[0].clientY + e.touches[1].clientY) / 2; panX = startPanX + (cx - startX) / currentScale; panY = startPanY + (cy - startY) / currentScale; apply(); } }, { passive: false });
canvas.addEventListener('touchend', e => { if (e.touches.length < 2) { isDragging = false; document.body.classList.remove('dragging'); } });
canvas.addEventListener('wheel', e => { e.preventDefault(); panX -= e.deltaX / currentScale; panY -= e.deltaY / currentScale; apply(); }, { passive: false });
document.addEventListener('keydown', e => { if (e.key === 'f' || e.key === 'F') { e.preventDefault(); fitAll(); } });

function fitAll() {
  const grid = document.querySelector('.grid');
  if (!grid) return;
  const cw = canvas.clientWidth, ch = canvas.clientHeight;
  const gw = grid.offsetWidth, gh = grid.offsetHeight;
  const sx = cw / (gw + PADDING * 2), sy = ch / (gh + PADDING * 2);
  currentScale = Math.min(sx, sy, 1.5);
  panX = (cw - gw * currentScale) / 2;
  panY = (ch - gh * currentScale) / 2;
  apply();
}

// ── Fonts ──
const FONTS_SANS = ["Inter","DM Sans","Plus Jakarta Sans","Albert Sans","Lexend","Outfit","Space Grotesk","Sora","Manrope","Urbanist"];
const FONTS_SERIF = ["Playfair Display","Lora","DM Serif Display","Crimson Text","EB Garamond","Cormorant Garamond","Bitter","Merriweather","Noto Serif","PT Serif"];
const FONTS_DISPLAY = ["Bebas Neue","Oswald","Righteous","Fredoka","Permanent Marker","Cinzel","Rajdhani","Exo 2"];
const FONTS_HAND = ["Caveat","Dancing Script","Pacifico","Satisfy","Great Vibes","Nunito","Patrick Hand"];
const ALL_FONTS = [...FONTS_SANS, ...FONTS_SERIF, ...FONTS_DISPLAY, ...FONTS_HAND];
const pick = a => a[Math.floor(Math.random() * a.length)];

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
    const indices = THEME_GROUPS[group];
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

// ── Surprise Me! ──
function surprise() {
  const { theme: p, group } = getRandomTheme();
  window._lastThemeGroup = group;
  const r = document.documentElement.style;

  // Colors
  r.setProperty('--bg', p.bg); r.setProperty('--fg', p.fg);
  r.setProperty('--card', p.card); r.setProperty('--card-fg', p.cardFg);
  r.setProperty('--card-bg', 'var(--card)');
  r.setProperty('--muted', p.muted); r.setProperty('--muted-fg', p.mutedFg);
  r.setProperty('--primary', p.primary); r.setProperty('--primary-fg', p.primaryFg);
  r.setProperty('--secondary', p.secondary); r.setProperty('--secondary-fg', p.secondaryFg);
  r.setProperty('--border', p.border); r.setProperty('--input', p.input);
  r.setProperty('--ring', p.primary); r.setProperty('--destructive', p.destructive);

  // Shape — also randomize radius, border-width, shadow beyond palette
  var allRadii = ['0px','2px','4px','6px','8px','0.5rem','0.625rem','0.75rem','1rem','1.25rem','1.5rem','2rem'];
  var allBW = ['0px','0.5px','1px','1.5px','2px','3px'];
  var allShadows = ['none','0 1px 2px rgba(0,0,0,0.05)','0 2px 8px rgba(0,0,0,0.08)','0 4px 16px rgba(0,0,0,0.1)','0 8px 30px rgba(0,0,0,0.12)','0 0 0 1px rgba(0,0,0,0.05),0 4px 12px rgba(0,0,0,0.08)','0 0 20px rgba(0,0,0,0.15)','0 20px 60px rgba(0,0,0,0.2)'];
  r.setProperty('--radius', Math.random() < 0.5 ? p.radius : pick(allRadii));
  r.setProperty('--bw', Math.random() < 0.5 ? p.bw : pick(allBW));
  r.setProperty('--shadow', Math.random() < 0.5 ? p.shadow : pick(allShadows));
  r.setProperty('--btn-shadow', p.btnShadow || 'none');
  r.setProperty('--btn-shadow-active', p.btnShadowActive || 'none');
  r.setProperty('--btn-press-y', p.btnPressY || '0');

  // Typography — pick from ALL_FONTS for heading, avoid common pairings to maximize variety
  var headingFonts = [...FONTS_SERIF, ...FONTS_DISPLAY, ...FONTS_HAND, ...FONTS_SANS];
  var bodyFonts = [...FONTS_SANS, ...FONTS_SERIF];
  var hf = pick(headingFonts);
  var bf = pick(bodyFonts.filter(function(f) { return f !== hf || Math.random() < 0.2; }));
  if (!bf) bf = pick(FONTS_SANS);
  r.setProperty('--ls', Math.random() < 0.3 ? (Math.random() < 0.5 ? '-0.03em' : '0.05em') : (typeof p.ls === 'number' ? p.ls + 'em' : p.ls || '0'));
  r.setProperty('--fw', pick([400,450,500,550,600,650,700]));
  r.setProperty('--fs', pick(['0.75rem','0.8125rem','0.875rem','0.9375rem','1rem']));
  r.setProperty('--title-fs', pick(['1rem','1.15rem','1.3rem','1.5rem','1.75rem']));
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
    bg: p.bg, fg: p.fg, card: p.card, cardFg: p.cardFg,
    muted: p.muted, mutedFg: p.mutedFg,
    primary: p.primary, primaryFg: p.primaryFg,
    secondary: p.secondary, secondaryFg: p.secondaryFg,
    border: p.border, input: p.input, destructive: p.destructive,
    radius: p.radius, bw: p.bw, shadow: p.shadow,
    fontHeading: hf, fontBody: bf,
    fs: p.fs, titleFs: p.tfs,
    ls: typeof p.ls === 'number' ? p.ls + 'em' : p.ls,
    fw: p.fw, dark: p.dark, bgPattern: bg.img
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
  let css = ':root {\n';
  vars.forEach(v => { const val = root.getPropertyValue(v).trim(); if (val) css += '  ' + v + ': ' + val + ';\n'; });
  css += '}\n';
  navigator.clipboard.writeText(css).then(() => {
    const btn = document.getElementById('export-btn');
    btn.textContent = 'Copied!';
    setTimeout(() => btn.textContent = 'Export CSS', 2000);
  });
}

// ── Hamburger Menu ──
document.getElementById('menu-btn').addEventListener('click', () => {
  document.getElementById('menu').classList.toggle('open');
});
document.addEventListener('click', e => {
  const menu = document.getElementById('menu');
  const btn = document.getElementById('menu-btn');
  if (!menu.contains(e.target) && !btn.contains(e.target)) menu.classList.remove('open');
});

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

// ── Render sentence ──
function renderSentence(opts) {
  opts = opts || {};
  const sb = document.getElementById('sidebar');
  const animate = opts.animate !== false;

  let html = '<div class="pw-header"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v2M8 13v2M1 8h2m10 0h2"/><circle cx="8" cy="8" r="3"/></svg>Design Prompt</div>';
  html += '<div class="pw-sentence" id="pw-sentence">';
  html += '<div class="pw-sentence-text">';
  html += '<span class="pw-sentence-prefix">I want a UI with </span>';

  activeParams.forEach(function(pid, i) {
    const def = PARAM_DEFS[pid];
    if (!def) return;
    const d = getWidgetDisplay(pid);
    const animClass = animate ? ' pw-widget-changing' : '';
    let widgetContent = '';

    if (def.type === 'color') {
      widgetContent = '<span class="pw-widget-swatch" style="background:' + d.hex + '"></span>' +
                       '<span class="pw-widget-value">' + d.hex + '</span>';
    } else if (def.type === 'font') {
      widgetContent = '<span class="pw-widget-value" style="font-family:' + d.fontFamily + '">' + d.value + '</span>';
    } else {
      widgetContent = '<span class="pw-widget-value">' + d.value + '</span>';
    }

    html += '<span class="pw-widget' + animClass + '" data-param="' + pid + '" style="animation-delay:' + (i * 30) + 'ms">';
    html += '<span class="pw-widget-emoji">' + def.emoji + '</span>';
    html += widgetContent;
    html += '<span class="pw-widget-label">' + def.label + '</span>';
    html += '<button class="pw-widget-remove" data-remove="' + pid + '" title="Remove">✕</button>';
    html += '</span>';

    if (i < activeParams.length - 1) {
      if (i === activeParams.length - 2) {
        html += '<span class="pw-comma">, </span><span class="pw-and">and </span>';
      } else {
        html += '<span class="pw-comma">, </span>';
      }
    }
  });

  html += '<span class="pw-period">.</span>';
  html += '</div>';

  // Add parameter row
  html += '<div class="pw-add-row">';
  html += '<button class="pw-add-btn" id="pw-add-btn">+ Add parameter</button>';
  html += '<div class="pw-add-menu" id="pw-add-menu">';
  Object.keys(PARAM_DEFS).forEach(function(pid) {
    if (activeParams.indexOf(pid) !== -1) return;
    const def = PARAM_DEFS[pid];
    html += '<div class="pw-add-menu-item" data-add="' + pid + '">' + def.emoji + ' ' + def.label + '</div>';
  });
  html += '</div>';
  html += '</div>';

  html += '</div>';

  // Action buttons
  html += '<div class="pw-actions">';
  html += '<button class="pw-copy-btn" id="copy-prompt">📋 Copy Prompt</button>';
  html += '<button class="pw-surprise-btn" id="pw-surprise-btn">🎲 Surprise me</button>';
  html += '</div>';

  // Edit panel (hidden by default)
  html += '<div class="pw-edit-panel" id="pw-edit-panel">';
  html += '<div class="pw-ep-header">';
  html += '<button class="pw-ep-back" id="pw-ep-back">←</button>';
  html += '<span class="pw-ep-title" id="pw-ep-title">Edit</span>';
  html += '<span class="pw-ep-icon" id="pw-ep-icon"></span>';
  html += '</div>';
  html += '<div class="pw-ep-body" id="pw-ep-body"></div>';
  html += '</div>';

  html += '<div class="sidebar-footer">based on <a href="https://ui.shadcn.com/" target="_blank" rel="noopener">shadcn/ui</a> · <a href="https://tailwindcss.com/" target="_blank" rel="noopener">Tailwind CSS</a></div>';

  sb.innerHTML = html;

  // Bind events
  bindSentenceEvents();
}

// ── Bind sentence events ──
function bindSentenceEvents() {
  // Widget clicks → open edit panel
  document.querySelectorAll('.pw-widget').forEach(function(w) {
    w.addEventListener('click', function(e) {
      if (e.target.closest('.pw-widget-remove')) return;
      var pid = w.getAttribute('data-param');
      if (pid) showEditPanel(pid);
    });
  });

  // Remove buttons
  document.querySelectorAll('.pw-widget-remove').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      var pid = btn.getAttribute('data-remove');
      if (pid) removeParameter(pid);
    });
  });

  // Add button
  var addBtn = document.getElementById('pw-add-btn');
  var addMenu = document.getElementById('pw-add-menu');
  if (addBtn && addMenu) {
    addBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      addMenu.classList.toggle('open');
    });
    document.addEventListener('click', function() { addMenu.classList.remove('open'); });
  }

  // Add menu items
  document.querySelectorAll('.pw-add-menu-item').forEach(function(item) {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      var pid = item.getAttribute('data-add');
      if (pid) addParameter(pid);
      addMenu.classList.remove('open');
    });
  });

  // Copy button
  var copyBtn = document.getElementById('copy-prompt');
  if (copyBtn) {
    copyBtn.addEventListener('click', function() {
      var prompt = generatePrompt();
      navigator.clipboard.writeText(prompt).then(function() {
        copyBtn.textContent = 'Copied! 🎉';
        copyBtn.classList.add('copied');
        fireConfetti();
        setTimeout(function() { copyBtn.textContent = '📋 Copy Prompt'; copyBtn.classList.remove('copied'); }, 2000);
      });
    });
  }

  // Surprise button
  var surpriseBtn = document.getElementById('pw-surprise-btn');
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', function() { surprise(); });
  }

  // Edit panel back button
  var backBtn = document.getElementById('pw-ep-back');
  if (backBtn) {
    backBtn.addEventListener('click', function() { hideEditPanel(); });
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
  return 'Design a modern UI component library with these specifications:\n\n' +
    'Color Palette:\n' +
    '- Background: ' + (s.bg || '#ffffff') + '\n' +
    '- Foreground: ' + (s.fg || '#1a1a1a') + '\n' +
    '- Primary: ' + (s.primary || '#6366f1') + '\n' +
    '- Muted: ' + (s.muted || '#f5f5f5') + '\n' +
    '- Border: ' + (s.border || '#e5e5e5') + '\n\n' +
    'Typography:\n' +
    '- Heading font: ' + (s.fontHeading || 'Inter') + '\n' +
    '- Body font: ' + (s.fontBody || 'Inter') + '\n' +
    '- Body size: ' + (s.fs || '0.875rem') + '\n' +
    '- Title size: ' + (s.titleFs || '1rem') + '\n' +
    '- Letter spacing: ' + (s.ls || '0') + '\n' +
    '- Font weight: ' + (s.fw || 500) + '\n\n' +
    'Shape:\n' +
    '- Border radius: ' + (s.radius || '0.625rem') + '\n' +
    '- Border width: ' + (s.bw || '1px') + '\n' +
    '- Shadow: ' + (s.shadow || 'none') + '\n' +
    '- Theme: ' + (s.dark ? 'dark' : 'light') + '\n\n' +
    'Background pattern: ' + (s.bgPattern === 'none' ? 'none' : 'subtle pattern') + '\n\n' +
    'Generate a complete design system with these values as CSS custom properties. Components should include cards, buttons, inputs, badges, tables, and navigation elements.';
}

function updatePromptBlock() {
  // Now just updates widget displays
  updateAllWidgets();
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
  updateMinimap();
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
  updateMinimap();
});

// ── Layout Save/Load ──
function saveLayout() {
  const cards = document.querySelectorAll('.cn-card');
  const order = Array.from(cards).map(c => c.getAttribute('data-id'));
  const widths = {};
  cards.forEach(c => widths[c.getAttribute('data-id')] = parseInt(c.getAttribute('data-width') || '1'));
  try { localStorage.setItem('unboring-layout', JSON.stringify({ order, widths })); } catch(e) {}
}

function loadLayout() {
  try {
    const data = JSON.parse(localStorage.getItem('unboring-layout'));
    if (!data) { setTimeout(updateMinimap, 50); return; }
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
    setTimeout(updateMinimap, 50);
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

// ── Minimap ──
function buildMinimap() {
  var el = document.createElement('div');
  el.id = 'minimap';
  el.innerHTML = '<div id="minimap-content"></div>';
  document.body.appendChild(el);
  return el;
}
function updateMinimap() {
  var mm = document.getElementById('minimap');
  if (!mm) return;
  var grid = document.querySelector('.grid');
  if (!grid) return;
  var gridBounds = grid.getBoundingClientRect();
  var mmc = document.getElementById('minimap-content');
  var mmW = mmc.clientWidth, mmH = mmc.clientHeight;
  if (mmW === 0) return;
  var scaleX = mmW / gridBounds.width, scaleY = mmH / gridBounds.height;
  var s = Math.min(scaleX, scaleY) * 0.95;
  var ox = (mmW - gridBounds.width * s) / 2, oy = (mmH - gridBounds.height * s) / 2;
  var html = '';
  document.querySelectorAll('.cn-card').forEach(function(card) {
    var r = card.getBoundingClientRect();
    var x = (r.left - gridBounds.left) * s + ox;
    var y = (r.top - gridBounds.top) * s + oy;
    var w = r.width * s, h = r.height * s;
    html += '<div class="mm-card" style="left:' + x + 'px;top:' + y + 'px;width:' + Math.max(w,2) + 'px;height:' + Math.max(h,2) + 'px"></div>';
  });
  var cv = document.getElementById('canvas');
  var vpL = (cv.getBoundingClientRect().left - gridBounds.left) * s + ox;
  var vpT = (cv.getBoundingClientRect().top - gridBounds.top) * s + oy;
  var vpW = cv.clientWidth * s, vpH = cv.clientHeight * s;
  html += '<div class="mm-viewport" style="left:' + vpL + 'px;top:' + vpT + 'px;width:' + Math.max(vpW,3) + 'px;height:' + Math.max(vpH,3) + 'px"></div>';
  mmc.innerHTML = html;
}
function setupMinimap() {
  var mm = document.getElementById('minimap');
  var isDown = false;
  mm.addEventListener('mousedown', function(e) {
    isDown = true;
    var mmBounds = mm.getBoundingClientRect();
    var cv = document.getElementById('canvas');
    var grid = document.querySelector('.grid');
    var gridBounds = grid.getBoundingClientRect();
    var mmc = document.getElementById('minimap-content');
    var mmW = mmc.clientWidth, mmH = mmc.clientHeight;
    var scaleX = mmW / gridBounds.width, scaleY = mmH / gridBounds.height;
    var s = Math.min(scaleX, scaleY) * 0.95;
    var ox = (mmW - gridBounds.width * s) / 2, oy = (mmH - gridBounds.height * s) / 2;
    var gridX = ((e.clientX - mmBounds.left - 6 - ox) / s);
    var gridY = ((e.clientY - mmBounds.top - 6 - oy) / s);
    panX = -(gridX - cv.clientWidth / (2 * currentScale));
    panY = -(gridY - cv.clientHeight / (2 * currentScale));
    apply();
  });
  window.addEventListener('mousemove', function(e) {
    if (!isDown) return;
    var mmBounds = mm.getBoundingClientRect();
    var cv = document.getElementById('canvas');
    var grid = document.querySelector('.grid');
    if (!grid) return;
    var gridBounds = grid.getBoundingClientRect();
    var mmc = document.getElementById('minimap-content');
    var mmW = mmc.clientWidth, mmH = mmc.clientHeight;
    var scaleX = mmW / gridBounds.width, scaleY = mmH / gridBounds.height;
    var s = Math.min(scaleX, scaleY) * 0.95;
    var ox = (mmW - gridBounds.width * s) / 2, oy = (mmH - gridBounds.height * s) / 2;
    var gridX = ((e.clientX - mmBounds.left - 6 - ox) / s);
    var gridY = ((e.clientY - mmBounds.top - 6 - oy) / s);
    panX = -(gridX - cv.clientWidth / (2 * currentScale));
    panY = -(gridY - cv.clientHeight / (2 * currentScale));
    apply();
  });
  window.addEventListener('mouseup', function() { isDown = false; });
}

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
  setInterval(roll, 10000);
}

// ── Init ──
randomizeBrandFonts();
renderSentence();
buildMinimap();
setupMinimap();
currentScale = 1;
panX = 0;
panY = 0;
apply();

loadLayout();

// Header surprise button (kept for compatibility)
document.getElementById('surprise-btn').addEventListener('click', function() { surprise(); });
document.getElementById('export-btn').addEventListener('click', exportCSS);
