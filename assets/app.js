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
function apply() { clampPan(); content.style.transform = 'translate(' + panX + 'px,' + panY + 'px) scale(' + currentScale + ')'; }

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
  const lastGroup = window._lastThemeGroup;
  if (lastGroup && Math.random() < 0.7) {
    const group = THEME_GROUPS[lastGroup];
    return { theme: PALETTES[group[Math.floor(Math.random() * group.length)]], group: lastGroup };
  }
  const groups = Object.keys(THEME_GROUPS);
  const group = groups[Math.floor(Math.random() * groups.length)];
  const idx = THEME_GROUPS[group][Math.floor(Math.random() * THEME_GROUPS[group].length)];
  return { theme: PALETTES[idx], group };
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

  // Shape
  r.setProperty('--radius', p.radius); r.setProperty('--bw', p.bw); r.setProperty('--shadow', p.shadow);
  r.setProperty('--btn-shadow', p.btnShadow || 'none');
  r.setProperty('--btn-shadow-active', p.btnShadowActive || 'none');
  r.setProperty('--btn-press-y', p.btnPressY || '0');

  // Typography
  const pair = pick(FONT_PAIRINGS);
  r.setProperty('--ls', typeof p.ls === 'number' ? p.ls + 'em' : p.ls);
  r.setProperty('--fw', p.fw); r.setProperty('--fs', p.fs); r.setProperty('--title-fs', p.tfs);
  r.setProperty('--font', "'" + pair.body + "',system-ui,sans-serif");
  r.setProperty('--font-heading', "'" + pair.heading + "',system-ui,sans-serif");
  r.setProperty('--text-shadow', p.textShadow || 'none');
  document.body.style.fontFamily = "'" + pair.body + "',system-ui,sans-serif";

  // Background pattern
  const patterns = p.dark ? PATTERNS.dark : PATTERNS.light;
  const bg = pick(patterns);
  r.setProperty('--bg-pattern', bg.img);
  r.setProperty('--bg-pattern-size', bg.size);
  r.setProperty('--card-bg-pattern', bg.card);
  r.setProperty('--card-bg-pattern-size', bg.cardSize);
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
    fontHeading: pair.heading, fontBody: pair.body,
    fs: p.fs, titleFs: p.tfs,
    ls: typeof p.ls === 'number' ? p.ls + 'em' : p.ls,
    fw: p.fw, dark: p.dark, bgPattern: bg.img
  });

  // Update sidebar prompt
  updatePromptBlock();
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

// ── Prompt Builder Sidebar ──
function buildPromptSidebar() {
  const sb = document.getElementById('sidebar');
  
  sb.innerHTML = `
    <div class="theme-strip">
      <span class="theme-strip-label">Theme</span>
      <div class="theme-strip-swatches" id="theme-swatches">
        <div class="ts-swatch" style="background:var(--bg)"></div>
        <div class="ts-swatch" style="background:var(--fg)"></div>
        <div class="ts-swatch" style="background:var(--primary)"></div>
        <div class="ts-swatch" style="background:var(--muted)"></div>
        <div class="ts-swatch" style="background:var(--card)"></div>
      </div>
    </div>
    <div class="panel-title"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 1v2M8 13v2M1 8h2m10 0h2"/><circle cx="8" cy="8" r="3"/></svg>Design Prompt</div>
    <div class="prompt-block" id="prompt-block">
      <div class="prompt-line">
        <div class="prompt-label">Background</div>
        <div class="prompt-value">
          <span class="pe-swatch" id="sw-bg"><input type="color" id="color-bg" value="#ffffff"></span>
          <span class="pe-value" id="val-bg">#ffffff</span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Foreground</div>
        <div class="prompt-value">
          <span class="pe-swatch" id="sw-fg"><input type="color" id="color-fg" value="#1a1a1a"></span>
          <span class="pe-value" id="val-fg">#1a1a1a</span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Primary</div>
        <div class="prompt-value">
          <span class="pe-swatch" id="sw-primary"><input type="color" id="color-primary" value="#6366f1"></span>
          <span class="pe-value" id="val-primary">#6366f1</span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Heading Font</div>
        <div class="prompt-value">
          <span class="pe" id="pe-font-heading" style="font-family:var(--font-heading)"><span class="pe-font" id="val-font-heading">Inter</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Body Font</div>
        <div class="prompt-value">
          <span class="pe" id="pe-font-body" style="font-family:var(--font)"><span class="pe-font" id="val-font-body">Inter</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Border Radius</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-radius">0.625rem</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Border Width</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-bw">1px</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Shadow</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-shadow">subtle</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Body Size</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-fs">0.875rem</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Title Size</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-tfs">1rem</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Letter Spacing</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-ls">0</span></span>
        </div>
      </div>
      <div class="prompt-line">
        <div class="prompt-label">Weight</div>
        <div class="prompt-value">
          <span class="pe"><span class="pe-value" id="val-fw">500</span></span>
        </div>
      </div>
    </div>
    <button class="copy-btn" id="copy-prompt">Copy prompt</button>
    <div style="margin-top:12px">
      <div class="panel-title"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 8h8"/><path d="M10 4l4 4-4 4"/></svg>Quick Actions</div>
      <div style="display:flex;flex-direction:column;gap:6px">
        <button class="h-btn" style="width:100%;text-align:left" id="btn-random-bg">Random background</button>
        <button class="h-btn" style="width:100%;text-align:left" id="btn-random-font">Random font pair</button>
        <button class="h-btn" style="width:100%;text-align:left" id="btn-random-radius">Random radius</button>
      </div>
    </div>
  `;

  // Color swatch inputs
  ['bg','fg','primary'].forEach(key => {
    const input = document.getElementById('color-' + key);
    input.addEventListener('input', e => {
      designState[key] = e.target.value;
      document.documentElement.style.setProperty('--' + key, e.target.value);
      if (key === 'bg') document.body.style.backgroundColor = e.target.value;
      document.getElementById('val-' + key).textContent = e.target.value;
      updatePromptBlock();
    });
  });

  // Font selectors
  ['heading', 'body'].forEach(role => {
    const el = document.getElementById('pe-font-' + role);
    el.addEventListener('click', () => {
      // Close other selects
      document.querySelectorAll('.pe-select.open').forEach(s => s.classList.remove('open'));
      
      // Create dropdown if not exists
      let dropdown = el.querySelector('.pe-select');
      if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'pe-select';
        const fonts = role === 'heading' ? [...FONTS_SERIF, ...FONTS_DISPLAY, ...FONTS_SANS] : [...FONTS_SANS, ...FONTS_SERIF];
        fonts.forEach(f => {
          const opt = document.createElement('div');
          opt.className = 'pe-option';
          opt.textContent = f;
          opt.style.fontFamily = f + ', sans-serif';
          opt.addEventListener('click', e => {
            e.stopPropagation();
            const varName = role === 'heading' ? '--font-heading' : '--font';
            document.documentElement.style.setProperty(varName, "'" + f + "',system-ui,sans-serif");
            designState[role === 'heading' ? 'fontHeading' : 'fontBody'] = f;
            document.getElementById('val-font-' + role).textContent = f;
            el.style.fontFamily = "'" + f + "', sans-serif";
            dropdown.classList.remove('open');
            updatePromptBlock();
          });
          dropdown.appendChild(opt);
        });
        el.appendChild(dropdown);
      }
      dropdown.classList.toggle('open');
    });
  });

  // Copy button
  document.getElementById('copy-prompt').addEventListener('click', () => {
    const prompt = generatePrompt();
    navigator.clipboard.writeText(prompt).then(() => {
      const btn = document.getElementById('copy-prompt');
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.textContent = 'Copy prompt'; btn.classList.remove('copied'); }, 2000);
    });
  });

  // Quick action buttons
  document.getElementById('btn-random-bg').addEventListener('click', () => {
    const p = pick(PALETTES);
    applyTheme(p);
  });
  document.getElementById('btn-random-font').addEventListener('click', () => {
    const pair = pick(FONT_PAIRINGS);
    document.documentElement.style.setProperty('--font', "'" + pair.body + "',system-ui,sans-serif");
    document.documentElement.style.setProperty('--font-heading', "'" + pair.heading + "',system-ui,sans-serif");
    designState.fontBody = pair.body;
    designState.fontHeading = pair.heading;
    document.getElementById('val-font-heading').textContent = pair.heading;
    document.getElementById('val-font-body').textContent = pair.body;
    document.getElementById('pe-font-heading').style.fontFamily = "'" + pair.heading + "', sans-serif";
    document.getElementById('pe-font-body').style.fontFamily = "'" + pair.body + "', sans-serif";
    updatePromptBlock();
  });
  document.getElementById('btn-random-radius').addEventListener('click', () => {
    const radii = ['0px','2px','4px','6px','8px','0.5rem','0.625rem','0.75rem','1rem','1.5rem','2rem'];
    const r = pick(radii);
    document.documentElement.style.setProperty('--radius', r);
    designState.radius = r;
    document.getElementById('val-radius').textContent = r;
    updatePromptBlock();
  });

  // Initial prompt
  updatePromptBlock();
}

function applyTheme(p) {
  const r = document.documentElement.style;
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
  
  // Update swatches
  try { document.getElementById('color-bg').value = oklchToHex(p.bg); } catch(e) {}
  try { document.getElementById('color-fg').value = oklchToHex(p.fg); } catch(e) {}
  try { document.getElementById('color-primary').value = oklchToHex(p.primary); } catch(e) {}
  document.getElementById('val-bg').textContent = p.bg;
  document.getElementById('val-fg').textContent = p.fg;
  document.getElementById('val-primary').textContent = p.primary;
  document.getElementById('val-radius').textContent = p.radius;
  document.getElementById('val-bw').textContent = p.bw;
  document.getElementById('val-shadow').textContent = p.shadow === 'none' ? 'none' : 'custom';
  updatePromptBlock();
}

function oklchToHex(oklch) {
  const div = document.createElement('div');
  div.style.color = oklch;
  document.body.appendChild(div);
  const computed = getComputedStyle(div).color;
  document.body.removeChild(div);
  const match = computed.match(/(\d+)/g);
  if (!match) return '#000000';
  return '#' + match.slice(0,3).map(n => parseInt(n).toString(16).padStart(2,'0')).join('');
}

function generatePrompt() {
  const s = designState;
  return `Design a modern UI component library with these specifications:

Color Palette:
- Background: ${s.bg || '#ffffff'}
- Foreground: ${s.fg || '#1a1a1a'}
- Primary: ${s.primary || '#6366f1'}
- Muted: ${s.muted || '#f5f5f5'}
- Border: ${s.border || '#e5e5e5'}

Typography:
- Heading font: ${s.fontHeading || 'Inter'}
- Body font: ${s.fontBody || 'Inter'}
- Body size: ${s.fs || '0.875rem'}
- Title size: ${s.titleFs || '1rem'}
- Letter spacing: ${s.ls || '0'}
- Font weight: ${s.fw || 500}

Shape:
- Border radius: ${s.radius || '0.625rem'}
- Border width: ${s.bw || '1px'}
- Shadow: ${s.shadow || 'none'}
- Theme: ${s.dark ? 'dark' : 'light'}

Background pattern: ${s.bgPattern === 'none' ? 'none' : 'subtle pattern'}

Generate a complete design system with these values as CSS custom properties. Components should include cards, buttons, inputs, badges, tables, and navigation elements.`;
}

function updatePromptBlock() {
  const s = designState;
  
  // Update displayed values
  document.getElementById('val-bg').textContent = s.bg || '#ffffff';
  document.getElementById('val-fg').textContent = s.fg || '#1a1a1a';
  document.getElementById('val-primary').textContent = s.primary || '#6366f1';
  document.getElementById('val-radius').textContent = s.radius || '0.625rem';
  document.getElementById('val-bw').textContent = s.bw || '1px';
  document.getElementById('val-shadow').textContent = s.shadow === 'none' ? 'none' : (s.shadow?.includes('8px 8px') ? 'hard' : s.shadow?.includes('0 0 20px') ? 'neon' : 'subtle');
  document.getElementById('val-fs').textContent = s.fs || '0.875rem';
  document.getElementById('val-tfs').textContent = s.titleFs || '1rem';
  document.getElementById('val-ls').textContent = s.ls || '0';
  document.getElementById('val-fw').textContent = String(s.fw || 500);
  document.getElementById('val-font-heading').textContent = s.fontHeading || 'Inter';
  document.getElementById('val-font-body').textContent = s.fontBody || 'Inter';
  
  // Update swatch colors
  try { document.getElementById('color-bg').value = oklchToHex(s.bg || '#ffffff'); } catch(e) {}
  try { document.getElementById('color-fg').value = oklchToHex(s.fg || '#1a1a1a'); } catch(e) {}
  try { document.getElementById('color-primary').value = oklchToHex(s.primary || '#6366f1'); } catch(e) {}
  updateThemeStrip();
}

function updateThemeStrip() {
  const swatches = document.getElementById('theme-swatches');
  if (!swatches) return;
  const r = getComputedStyle(document.documentElement);
  const colors = ['bg','fg','primary','muted','card'];
  const items = swatches.children;
  colors.forEach((key, i) => {
    if (items[i]) items[i].style.background = r.getPropertyValue('--' + key).trim() || 'transparent';
  });
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

// ── Init ──
buildPromptSidebar();
currentScale = 1;
panX = 0;
panY = 0;
apply();

loadLayout();

document.getElementById('surprise-btn').addEventListener('click', () => {
  surprise();
});
document.getElementById('export-btn').addEventListener('click', exportCSS);
