#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA = path.join(ROOT, 'data');

const components = JSON.parse(fs.readFileSync(path.join(DATA, 'components.json'), 'utf8'));
const themes = JSON.parse(fs.readFileSync(path.join(DATA, 'themes.json'), 'utf8'));
const patterns = JSON.parse(fs.readFileSync(path.join(DATA, 'patterns.json'), 'utf8'));

// Deduplicate
const seen = new Set();
const unique = components.filter(c => {
  if (seen.has(c.id)) return false;
  seen.add(c.id);
  return true;
});

console.log(`Components: ${unique.length} (removed ${components.length - unique.length} duplicates)`);
console.log(`Themes: ${themes.length}`);
console.log(`Patterns: ${patterns.light.length} light + ${patterns.dark.length} dark`);

// Build flat grid HTML (cards as direct children, no column wrappers)
let gridHTML = '<div class="grid">\n';
unique.forEach(comp => {
  const w = comp.width || 1;
  const toggleLabel = w === 2 ? '1x' : '2x';
  const name = (comp.name || '').replace(/"/g, '&quot;');
  const id = comp.id;

  gridHTML += `<div class="cn-card" data-id="${id}" data-width="${w}" draggable="true" data-name="${name}">\n`;
  gridHTML += `<div class="cn-card-tag">\n`;
  gridHTML += `  <span class="drag-handle">⠿</span>\n`;
  gridHTML += `  <span class="card-id-label">#${id} · ${name}</span>\n`;
  gridHTML += `  <button class="width-toggle">${toggleLabel}</button>\n`;
  gridHTML += `</div>\n`;
  // Strip old cn-card wrapper from html if present
  let inner = comp.html;
  inner = inner.replace(/^<div class="cn-card"[^>]*>/, '');
  inner = inner.replace(/<button class="width-toggle"[^>]*>.*?<\/button>/g, '');
  // Ensure closing </div> is correct
  if (!inner.endsWith('</div>')) inner = inner.replace(/<\/div>$/, '') + '</div>';
  gridHTML += inner + '\n';
  gridHTML += `</div>\n`;
});
gridHTML += '</div>';

const themesJSON = JSON.stringify(themes);
const patternsJSON = JSON.stringify(patterns);

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>UnBoring — UI Design Tool</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Sora:wght@400;500;600;700&family=Urbanist:wght@400;500;600;700&family=Lexend:wght@400;500;600;700&family=Albert+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Lora:wght@400;500;600;700&family=DM+Serif+Display&family=Crimson+Text:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=EB+Garamond:wght@400;500;600;700&family=Cormorant+Garamond:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Pacifico&family=Satisfy&family=Great+Vibes&family=Bebas+Neue&family=Oswald:wght@400;500;600;700&family=Righteous&family=Fredoka:wght@400;500;600;700&family=Permanent+Marker&family=Bitter:wght@400;500;600;700&family=Merriweather:wght@400;700&family=Noto+Serif:wght@400;700&family=PT+Serif:wght@400;700&family=Press+Start+2P&family=Orbitron:wght@400;500;600;700&family=VT323&family=Cinzel:wght@400;500;600;700&family=Rajdhani:wght@400;500;600;700&family=Exo+2:wght@400;500;600;700&family=Creepster&family=Special+Elite&family=Nunito:wght@400;500;600;700&family=Bangers&family=Patrick+Hand&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/style.css">
<link rel="stylesheet" href="/assets/components.css">
</head>
<body>
<div id="header">
  <div class="brand">UnBoring</div>
  <div class="actions">
    <button class="h-btn h-btn-primary" id="surprise-btn">Surprise me!</button>
    <button class="h-btn" id="export-btn">Export CSS</button>
    <button class="h-btn h-btn-icon" id="menu-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
    </button>
  </div>
</div>
<div id="menu">
  <a href="/motion/">Motion (24)</a>
  <a href="/components/">Components (51)</a>
  <a href="/interactions/">Interactions (85)</a>
  <a href="/styles/">Styles (27)</a>
  <a href="/effects/">Effects (63)</a>
  <a href="/agent/">MCP / CLI</a>
</div>
<div id="sidebar"></div>
<div id="canvas">
  <div id="canvas-content">
${gridHTML}
  </div>
</div>
<script>
const PALETTES = ${themesJSON};
const PATTERNS = ${patternsJSON};
</script>
<script src="/assets/app.js"></script>
</body>
</html>`;

fs.writeFileSync(path.join(ROOT, 'index.html'), html);
console.log(`\nGenerated index.html (${html.length} chars, ${unique.length} cards)`);
