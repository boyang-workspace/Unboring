# CSS Background Patterns Library

A comprehensive collection of 40+ distinct CSS background patterns for design systems.

---

## 1. SOLID COLORS

### Pattern 1: Clean White
```css
background: #ffffff;
```
- **Type:** Solid
- **Description:** Pure white background
- **Customization:** Change hex color

### Pattern 2: Off-White
```css
background: #f8f9fa;
```
- **Type:** Solid
- **Description:** Soft off-white, less harsh than pure white
- **Customization:** Adjust lightness

### Pattern 3: Dark Mode
```css
background: #1a1a2e;
```
- **Type:** Solid
- **Description:** Deep navy-dark background
- **Customization:** Change hex value

---

## 2. GRADIENTS

### Pattern 4: Linear Gradient (Vertical)
```css
background: linear-gradient(180deg, #667eea 0%, #764ba2 100%);
```
- **Type:** Gradient (linear)
- **Description:** Purple-blue vertical gradient
- **Customization:** Change angle, colors, stops

### Pattern 5: Linear Gradient (Diagonal)
```css
background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
```
- **Type:** Gradient (linear)
- **Description:** Soft diagonal gradient
- **Customization:** Adjust angle (0-360deg)

### Pattern 6: Radial Gradient
```css
background: radial-gradient(circle at 50% 50%, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
```
- **Type:** Gradient (radial)
- **Description:** Soft pink radial burst
- **Customization:** Change position, colors, shape

### Pattern 7: Conic Gradient
```css
background: conic-gradient(from 0deg at 50% 50%, #ff0000, #ff9900, #ffff00, #00ff00, #0099ff, #6633ff, #ff0000);
```
- **Type:** Gradient (conic)
- **Description:** Rainbow color wheel
- **Customization:** Change starting angle, colors

### Pattern 8: Mesh Gradient (CSS)
```css
background: 
  radial-gradient(at 40% 20%, #ff6b6b 0px, transparent 50%),
  radial-gradient(at 80% 0%, #4ecdc4 0px, transparent 50%),
  radial-gradient(at 0% 50%, #45b7d1 0px, transparent 50%),
  radial-gradient(at 80% 50%, #f7dc6f 0px, transparent 50%),
  radial-gradient(at 0% 100%, #bb8fce 0px, transparent 50%),
  #f8f9fa;
```
- **Type:** Gradient (mesh)
- **Description:** Colorful mesh gradient effect
- **Customization:** Adjust positions, colors, add/remove layers

---

## 3. DOTS / POLKA DOTS

### Pattern 9: Small Polka Dots
```css
background: 
  radial-gradient(circle, #000000 1px, transparent 1px),
  #ffffff;
background-size: 20px 20px;
```
- **Type:** Pattern (dots)
- **Description:** Classic small polka dots
- **Customization:** Change dot size (1-5px), spacing (10-50px), colors

### Pattern 10: Medium Polka Dots
```css
background: 
  radial-gradient(circle, #9b59b6 2px, transparent 2px),
  #f3e5f5;
background-size: 30px 30px;
```
- **Type:** Pattern (dots)
- **Description:** Medium purple dots on light purple
- **Customization:** Adjust dot radius and grid size

### Pattern 11: Large Polka Dots
```css
background: 
  radial-gradient(circle, #e74c3c 4px, transparent 4px),
  #ffffff;
background-size: 40px 40px;
```
- **Type:** Pattern (dots)
- **Description:** Bold red dots
- **Customization:** Scale dot size proportionally

### Pattern 12: Offset Dots (CSS Pattern)
```css
background:
  radial-gradient(#9d2053 99%,#0000 101%),
  radial-gradient(#9d2053 99%,#0000 101%) 50px 50px,
  #b5d8eb;
background-size: 100px 100px;
```
- **Type:** Pattern (dots)
- **Description:** Offset polka dot pattern
- **Customization:** Change colors, size via --s variable

---

## 4. LINES / STRIPES

### Pattern 13: Horizontal Stripes
```css
background: 
  repeating-linear-gradient(
    0deg,
    #000000 0px,
    #000000 2px,
    #ffffff 2px,
    #ffffff 4px
  );
```
- **Type:** Pattern (stripes)
- **Description:** Thin horizontal stripes
- **Customization:** Change stripe width, colors

### Pattern 14: Vertical Stripes
```css
background: 
  repeating-linear-gradient(
    90deg,
    #3498db 0px,
    #3498db 2px,
    #ecf0f1 2px,
    #ecf0f1 4px
  );
```
- **Type:** Pattern (stripes)
- **Description:** Blue vertical stripes
- **Customization:** Adjust angle for diagonal

### Pattern 15: Diagonal Stripes
```css
background: 
  repeating-linear-gradient(
    45deg,
    #000000 0px,
    #000000 1px,
    transparent 1px,
    transparent 5px
  );
```
- **Type:** Pattern (stripes)
- **Description:** 45-degree diagonal lines
- **Customization:** Change angle (0-180deg), spacing

### Pattern 16: Dashed Lines
```css
background: 
  repeating-linear-gradient(
    90deg,
    #000000 0px,
    #000000 10px,
    transparent 10px,
    transparent 20px
  );
background-size: 1px 100%;
```
- **Type:** Pattern (dashed)
- **Description:** Vertical dashed lines
- **Customization:** Adjust dash length and gap

### Pattern 17: Chevron Stripes (CSS Pattern)
```css
background:
  repeating-linear-gradient(#ecd078 0 5px, #0000 0 50%),
  conic-gradient(from -150deg at 5px 50%,#ecd078 120deg,#0000 0),
  linear-gradient(-120deg,#0000 calc(33% - .866*5px),#ecd078 calc(33.2% - .866*5px) 33%,#0000 34%),
  linear-gradient(-60deg,#0000 calc(33% - .866*5px),#ecd078 calc(33.2% - .866*5px) 33%,#0000 34%),
  #0b486b;
background-size: 65px calc(3.466*65px);
```
- **Type:** Pattern (chevrons)
- **Description:** Chevron stripe pattern
- **Customization:** Adjust --s and --g variables

---

## 5. GRID / GRAPH PAPER

### Pattern 18: Simple Grid
```css
background: 
  linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px),
  #ffffff;
background-size: 20px 20px;
```
- **Type:** Pattern (grid)
- **Description:** Light grid paper
- **Customization:** Change grid size, line color, opacity

### Pattern 19: Graph Paper (CSS Pattern)
```css
background: 
  conic-gradient(from 90deg at 2px 2px,#0000 90deg,#336666 0),
  conic-gradient(from 90deg at 1px 1px,#0000 90deg,#336666 0),
  #ffffff;
background-size: 100px 100px, 20px 20px;
```
- **Type:** Pattern (grid)
- **Description:** Graph paper with major/minor grid
- **Customization:** Adjust sizes for different grid densities

### Pattern 20: Blueprint Grid
```css
background: 
  linear-gradient(rgba(65, 105, 225, 0.3) 1px, transparent 1px),
  linear-gradient(90deg, rgba(65, 105, 225, 0.3) 1px, transparent 1px),
  #1e3a5f;
background-size: 30px 30px;
```
- **Type:** Pattern (grid)
- **Description:** Blueprint-style grid on dark blue
- **Customization:** Change grid color, background

---

## 6. CHECKERBOARD

### Pattern 21: Classic Checkerboard
```css
background: 
  conic-gradient(from 90deg at 2px 2px,#0000 90deg,#336666 0),
  conic-gradient(from 90deg at 1px 1px,#0000 90deg,#336666 0),
  #ffffff;
background-size: 100px 100px, 20px 20px;
```
- **Type:** Pattern (checkerboard)
- **Description:** Two-tone checkerboard
- **Customization:** Change square size, colors

### Pattern 22: Large Checkerboard
```css
background: 
  conic-gradient(#f2e9e1 90deg, #99b2b7 90deg 180deg, #f2e9e1 180deg 270deg, #99b2b7 270deg),
  #f2e9e1;
background-size: 100px 100px;
```
- **Type:** Pattern (checkerboard)
- **Description:** Soft colored checkerboard
- **Customization:** Adjust size, swap colors

---

## 7. ZIGZAG / CHEVRON

### Pattern 23: Zigzag
```css
background: 
  conic-gradient(from -45deg,#eceddc 90deg,#0000 90.5deg),
  conic-gradient(from 135deg,#eceddc 90deg,#0000 90.5deg) 50px 0,
  #29ab87;
background-size: 100px 100px;
```
- **Type:** Pattern (zigzag)
- **Description:** Classic zigzag pattern
- **Customization:** Adjust --s for scale

### Pattern 24: Chevron
```css
background:
  linear-gradient(45deg,#633d2e 20%,#0000 0 45%,#633d2e 0 70%,#0000 0),
  linear-gradient(-45deg,#633d2e 20%,#0000 0 35%,#f7af63 0 45%,#633d2e 0 70%,#0000 0),
  linear-gradient(45deg,#633d2e 20%,#0000 0 35%,#f7af63 0 45%,#633d2e 0);
background-size: 150px 150px;
```
- **Type:** Pattern (chevrons)
- **Description:** Layered chevron pattern
- **Customization:** Change --s for size

---

## 8. DIAMOND / HARLEQUIN

### Pattern 25: Diamond
```css
background: 
  linear-gradient(45deg,#e9e0d1 25%,transparent 25%),
  linear-gradient(-45deg,#e9e0d1 25%,transparent 25%),
  linear-gradient(45deg,transparent 75%,#e9e0d1 75%),
  linear-gradient(-45deg,transparent 75%,#e9e0d1 75%),
  #59a80f;
background-size: 80px 80px;
background-position: 0 0, 0 40px, 40px -40px, -40px 0px;
```
- **Type:** Pattern (diamonds)
- **Description:** Harlequin diamond pattern
- **Customization:** Adjust size, colors

### Pattern 26: 3D Diamond (CSS Pattern)
```css
background:
  conic-gradient(from -116.36deg at 25% 75%,#9cceb5 52.72deg,#0000 0),
  conic-gradient(from 63.43deg at 75% 75%,#9cceb5 52.72deg,#0000 0),
  conic-gradient(from -116.36deg at 25% 75%,#9cceb5 52.72deg,#0000 0) 195px 32.5px,
  conic-gradient(from 63.43deg at 75% 75%,#9cceb5 52.72deg,#0000 0) 195px 32.5px,
  conic-gradient(#4a99b4 63.43deg,#dadee1 0 116.36deg,#4a99b4 0 180deg,#dadee1 0 243.43deg,#4a99b4 0 296.15deg,#dadee1 0);
background-size: 130px 65px;
```
- **Type:** Pattern (diamonds)
- **Description:** 3D isometric diamond pattern
- **Customization:** Adjust --s, colors

---

## 9. HEXAGONAL / HONEYCOMB

### Pattern 27: Honeycomb
```css
background:
  conic-gradient(from 60deg at 56.25% 69.17%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg),
  conic-gradient(from 180deg at 43.75% 69.17%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg),
  conic-gradient(from -60deg at 50% 14.58%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg),
  conic-gradient(from 60deg at 56.25% 69.17%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg) 37px 64.08px,
  conic-gradient(from 180deg at 43.75% 69.17%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg) 37px 64.08px,
  conic-gradient(from -60deg at 50% 14.58%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg) 37px 0,
  conic-gradient(from -60deg at 50% 14.58%,#0000,#2fb8ac .5deg 119.5deg,#0000 120deg) 0 64.08px,
  #ecbe13;
background-size: 74px 128.17px;
```
- **Type:** Pattern (hexagonal)
- **Description:** Honeycomb hexagonal pattern
- **Customization:** Adjust --s for cell size

### Pattern 28: Two-Color Hexagons
```css
background:
  conic-gradient(from 30deg at 80%,#ff9f6a 60deg,#1f5e79 0 120deg,#0000 0),
  conic-gradient(from -30deg,#1f5e79 120deg,#ff9f6a 0 240deg,#1f5e79 0 300deg,#ff9f6a 0);
background-size: 114px 76px;
```
- **Type:** Pattern (hexagons)
- **Description:** Alternating two-color hexagons
- **Customization:** Change colors, adjust --s

---

## 10. CIRCLES / TARGET

### Pattern 29: Concentric Circles
```css
background: 
  radial-gradient(circle, #e74c3c 10%, transparent 10.5%, transparent 20%, #e74c3c 20.5%, #e74c3c 30%, transparent 30.5%),
  #3498db;
background-size: 100px 100px;
```
- **Type:** Pattern (circles)
- **Description:** Concentric ring pattern
- **Customization:** Adjust ring widths, colors

### Pattern 30: Retro Circles (CSS Pattern)
```css
background:
  radial-gradient(#655643 15%,#0000 17% 20%,#655643 22% 25%,#0000 27% 30%,#655643 32% 35%,#0000 37% 40%,#655643 42% 45%,#0000 47% 50%,#655643 52% 55%,#80bca3 57%) 50px 0/100px 100px,
  repeating-conic-gradient(#655643 0 25%,#80bca3 0 50%) 0 0/200px 200px;
```
- **Type:** Pattern (circles)
- **Description:** Retro concentric circle pattern
- **Customization:** Adjust --s for scale

### Pattern 31: Outline Circles (CSS Pattern)
```css
background:
  radial-gradient(#0000 60%,#774f38 61% 63%,#0000 64% 77%,#774f38 78% 80%,#0000 81%),
  radial-gradient(#0000 60%,#774f38 61% 63%,#0000 64% 77%,#774f38 78% 80%,#0000 81%) 110px 110px,
  conic-gradient(at 12% 20%,#0000 75%,#f1d4af 0) 96.8px 198px,
  conic-gradient(at 12% 20%,#0000 75%,#f1d4af 0) -13.2px 88px,
  conic-gradient(at 20% 12%,#0000 75%,#f1d4af 0) 198px 96.8px,
  conic-gradient(at 20% 12%,#0000 75%,#f1d4af 0) 88px -13.2px,
  #f1d4af;
background-size: 220px 220px;
```
- **Type:** Pattern (circles)
- **Description:** Outline circle pattern
- **Customization:** Adjust --s

---

## 11. WAVES

### Pattern 32: Waves (CSS Pattern)
```css
background:
  radial-gradient(37.5% 12.5% at 62.5% 100%,#0000 32%,#e5fcc2 34% 99%,#0000 101%),
  radial-gradient(37.5% 12.5% at 62.5% 0,#0000 32%,#e5fcc2 34% 99%,#0000 101%) 0 90px,
  radial-gradient(37.5% 12.5% at 62.5% 100%,#0000 32%,#45ada8 34% 99%,#0000 101%) 30px 90px,
  radial-gradient(37.5% 12.5% at 62.5% 0,#0000 32%,#45ada8 34% 99%,#0000 101%) 30px 180px,
  radial-gradient(37.5% 12.5% at 62.5% 100%,#0000 32%,#e5fcc2 34% 99%,#0000 101%) 60px 180px,
  radial-gradient(37.5% 12.5% at 62.5% 0,#0000 32%,#e5fcc2 34% 99%,#0000 101%) 60px 270px,
  radial-gradient(37.5% 12.5% at 62.5% 100%,#0000 32%,#45ada8 34% 99%,#0000 101%) 90px 270px,
  radial-gradient(37.5% 12.5% at 62.5% 0,#0000 32%,#45ada8 34% 99%,#0000 101%) 90px 0,
  repeating-linear-gradient(#e5fcc2 0 25%,#45ada8 0 50%);
background-size: 120px 360px;
```
- **Type:** Pattern (waves)
- **Description:** Sine wave pattern
- **Customization:** Adjust --s for wave size

### Pattern 33: Wavy Lines (CSS Pattern)
```css
background:
  radial-gradient(25%/3 25%/4 at 50% 100%,#0000 25%,#0008 47%,#ab3e5b 53% 147%,#ffbe40 153% 247%,#ab3e5b 253% 347%,#ffbe40 353% 447%,#ab3e5b 453% 547%,#0008 553%,#0000 575%),
  radial-gradient(25%/3 25%/4 at 50% 100%,#0000 25%,#0008 47%,#ab3e5b 53% 147%,#ffbe40 153% 247%,#ab3e5b 253% 347%,#ffbe40 353% 447%,#ab3e5b 453% 547%,#0008 553%,#0000 575%) 70px 105px,
  radial-gradient(25%/3 25%/4 at 50% 0,#0000 25%,#0008 47%,#ab3e5b 53% 147%,#ffbe40 153% 247%,#ab3e5b 253% 347%,#ffbe40 353% 447%,#ab3e5b 453% 547%,#0008 553%,#0000 575%) 70px 0,
  radial-gradient(25%/3 25%/4 at 50% 0,#0000 25%,#0008 47%,#ab3e5b 53% 147%,#ffbe40 153% 247%,#ab3e5b 253% 347%,#ffbe40 353% 447%,#ab3e5b 453% 547%,#0008 553%,#0000 575%) 0 105px,
  repeating-linear-gradient(90deg,#accec0 -4.17% 4.17%,#61a6ab 0 12.5%);
background-size: 140px 210px;
```
- **Type:** Pattern (waves)
- **Description:** Multi-colored wavy lines
- **Customization:** Adjust --s

---

## 12. NOISE / GRAIN

### Pattern 34: CSS Noise Texture
```css
background: 
  url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E"),
  #f0f0f0;
background-size: 256px 256px;
```
- **Type:** Texture (noise)
- **Description:** Subtle noise/grain texture
- **Customization:** Adjust baseFrequency (0.1-1.0), colors

### Pattern 35: Grain Overlay
```css
background: 
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.15'/%3E%3C/svg%3E"),
  linear-gradient(135deg, #667eea 0%, #764ba2 100%);
background-size: 200px 200px, 100% 100%;
```
- **Type:** Texture (noise + gradient)
- **Description:** Gradient with grain overlay
- **Customization:** Adjust opacity for more/less grain

---

## 13. CROSSHATCH

### Pattern 36: Crosshatch (CSS Pattern)
```css
background:
  conic-gradient(at 50% 25%,#0000 75%,#f86466 0),
  conic-gradient(at 50% 25%,#0000 75%,#f86466 0) 50px 50px,
  conic-gradient(at 50% 25%,#0000 75%,#f86466 0) 100px 100px,
  conic-gradient(at 50% 25%,#0000 75%,#f86466 0) 150px 150px,
  repeating-linear-gradient(135deg,#000000 0 12.5%,#ffffff 0 25%);
background-size: 200px 200px;
```
- **Type:** Pattern (crosshatch)
- **Description:** X-pattern crosshatch
- **Customization:** Adjust --s, colors

---

## 14. TRIANGLES

### Pattern 37: Tessellated Triangles
```css
background: 
  conic-gradient(#f6d86b atan(2),#f10c49 0 calc(180deg - atan(2)),#f6d86b 0 180deg,#f10c49 0 calc(180deg + atan(2)),#f6d86b 0 calc(360deg - atan(2)),#f10c49 0);
background-size: 152px 76px;
```
- **Type:** Pattern (triangles)
- **Description:** Alternating triangle tessellation
- **Customization:** Adjust --s

### Pattern 38: Right Triangles
```css
background: 
  linear-gradient(to bottom right, #3498db 50%, transparent 50%),
  linear-gradient(to top left, #3498db 50%, transparent 50%),
  #ecf0f1;
background-size: 40px 40px;
```
- **Type:** Pattern (triangles)
- **Description:** Right triangle pattern
- **Customization:** Change triangle color, size

---

## 15. STARS

### Pattern 39: Star Pattern (CSS Pattern)
```css
background:
  conic-gradient(from 162deg at 50px 34.2px,#fff220 36deg,#0000 0),
  conic-gradient(from 18deg at 19.1px 34.2px,#fff220 36deg,#0000 0),
  conic-gradient(from 306deg at 80.9px 34.2px,#fff220 36deg,#0000 0),
  #e181c2;
background-position: 0 31.5px;
background-size: 99px 99px;
```
- **Type:** Pattern (stars)
- **Description:** Five-pointed star pattern
- **Customization:** Adjust --s, --d for size and gap

### Pattern 40: Starfield
```css
background: 
  radial-gradient(1px 1px at 10px 10px, #ffffff, transparent),
  radial-gradient(1px 1px at 50px 30px, #ffffff, transparent),
  radial-gradient(1px 1px at 80px 60px, #ffffff, transparent),
  radial-gradient(2px 2px at 120px 80px, #ffffff, transparent),
  radial-gradient(1px 1px at 160px 40px, #ffffff, transparent),
  #0a0a2e;
background-size: 200px 100px;
```
- **Type:** Pattern (stars)
- **Description:** Night sky starfield
- **Customization:** Adjust star positions, sizes, background

---

## 16. ORGANIC / NATURAL

### Pattern 41: Marble Effect
```css
background: 
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.02' numOctaves='3'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E"),
  #e8e0d8;
background-size: 400px 400px;
```
- **Type:** Texture (marble)
- **Description:** Marble stone texture
- **Customization:** Adjust baseFrequency for vein density

### Pattern 42: Wood Grain
```css
background: 
  url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='w'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.01 0.2' numOctaves='5'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23w)' opacity='.6'/%3E%3C/svg%3E"),
  #8B4513;
background-size: 200px 200px;
```
- **Type:** Texture (wood)
- **Description:** Wood grain texture
- **Customization:** Adjust baseFrequency for grain

---

## 17. ADDITIONAL PATTERNS (HeroPatterns SVG)

### Pattern 43: Plus Signs (HeroPatterns)
```css
background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M12 0h18v6h6v6h6v18h-6v6h-6v6H12v-6H6v-6H0V12h6V6h6V0zm12 6h-6v6h-6v6H6v6h6v6h6v6h6v-6h6v-6h6v-6h-6v-6h-6V6zm-6 12h6v6h-6v-6zm24 24h6v6h-6v-6z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
```
- **Type:** Pattern (SVG)
- **Description:** Plus sign pattern
- **Customization:** Change fill color, opacity

### Pattern 44: Diagonal Lines (HeroPatterns)
```css
background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='199' viewBox='0 0 100 199'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M0 199V0h1v1.99L100 199h-1.12L1 4.22V199H0zM100 2h-.12l-1-2H100v2z'%3E%3C/path%3E%3C/g%3E%3C/svg%3E");
```
- **Type:** Pattern (SVG)
- **Description:** Diagonal line pattern
- **Customization:** Change fill color, opacity

### Pattern 45: Cross Dots (HeroPatterns)
```css
background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
```
- **Type:** Pattern (SVG)
- **Description:** Tiny cross/dot pattern
- **Customization:** Change fill color, opacity

### Pattern 46: Circuit Board (HeroPatterns)
```css
background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='52' height='52' viewBox='0 0 52 52'%3E%3Cpath fill='%23000000' fill-opacity='0.1' d='M0 17.83V0h17.83a3 3 0 0 1-5.66 2H5.9A5 5 0 0 1 2 5.9v6.27a3 3 0 0 1-2 5.66zm0 18.34a3 3 0 0 1 2 5.66v6.27A5 5 0 0 1 5.9 52h6.27a3 3 0 0 1 5.66 0H0V36.17zM36.17 52a3 3 0 0 1 5.66 0h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 0 1 0-5.66V52H36.17zM0 31.93v-9.78a5 5 0 0 1 3.8.72l4.43-4.43a3 3 0 1 1 1.42 1.41L5.2 24.28a5 5 0 0 1 0 5.52l4.44 4.43a3 3 0 1 1-1.42 1.42L3.8 31.2a5 5 0 0 1-3.8.72zm52-14.1a3 3 0 0 1 0-5.66V5.9A5 5 0 0 1 48.1 2h-6.27a3 3 0 0 1-5.66-2H52v17.83zm0 14.1a4.97 4.97 0 0 1-1.72-.72l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1 0-5.52l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43c.53-.35 1.12-.6 1.72-.72v9.78zM22.15 0h9.78a5 5 0 0 1-.72 3.8l4.44 4.43a3 3 0 1 1-1.42 1.42L29.8 5.2a5 5 0 0 1-5.52 0l-4.43 4.44a3 3 0 1 1-1.41-1.42l4.43-4.43a5 5 0 0 1-.72-3.8zm0 52c.13-.6.37-1.19.72-1.72l-4.43-4.43a3 3 0 1 1 1.41-1.41l4.43 4.43a5 5 0 0 1 5.52 0l4.43-4.43a3 3 0 1 1 1.42 1.41l-4.44 4.43c.36.53.6 1.12.72 1.72h-9.78zm9.75-24a5 5 0 0 1-3.9 3.9v6.27a3 3 0 1 1-2 0V31.9a5 5 0 0 1-3.9-3.9h-6.27a3 3 0 1 1 0-2h6.27a5 5 0 0 1 3.9-3.9v-6.27a3 3 0 1 1 2 0v6.27a5 5 0 0 1 3.9 3.9h6.27a3 3 0 1 1 0 2H31.9z'%3E%3C/path%3E%3C/svg%3E");
```
- **Type:** Pattern (SVG)
- **Description:** Circuit board style pattern
- **Customization:** Change fill color, opacity

---

## USAGE EXAMPLES

### As CSS Custom Properties
```css
:root {
  /* Dots */
  --pattern-dots: radial-gradient(circle, #000 1px, transparent 1px), #fff;
  --pattern-dots-size: 20px 20px;
  
  /* Grid */
  --pattern-grid: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px), #fff;
  --pattern-grid-size: 20px 20px;
  
  /* Stripes */
  --pattern-stripes: repeating-linear-gradient(45deg, #000 0px, #000 1px, transparent 1px, transparent 5px);
  
  /* Checkerboard */
  --pattern-checker: conic-gradient(#000 25%, #fff 0 50%, #000 0 75%, #fff 0), #fff;
  --pattern-checker-size: 40px 40px;
}

.element {
  background: var(--pattern-dots);
  background-size: var(--pattern-dots-size);
}
```

### Responsive Pattern Sizing
```css
.pattern-element {
  background: var(--pattern-grid);
  background-size: 
    clamp(10px, 2vw, 30px) 
    clamp(10px, 2vw, 30px);
}
```

### Pattern with Overlay
```css
.pattern-with-overlay {
  position: relative;
  background: var(--pattern-dots);
  background-size: 20px 20px;
}

.pattern-with-overlay::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,255,255,0));
}
```

---

## CUSTOMIZATION GUIDE

### Size Variables
Most patterns use `--s` for size control:
```css
.pattern {
  --s: 50px; /* Change this to scale the pattern */
}
```

### Color Variables
Patterns use `--c1`, `--c2`, `--c3` for colors:
```css
.pattern {
  --c1: #3498db; /* Primary color */
  --c2: #ecf0f1; /* Secondary color */
  --c3: #2c3e50; /* Accent color */
}
```

### Opacity Control
Add opacity to patterns:
```css
.pattern {
  opacity: 0.5; /* 50% opacity */
  /* OR */
  background-blend-mode: soft-light;
}
```

---

## SOURCE SITES

Patterns collected from:
- [css-pattern.com](https://css-pattern.com/) - Temani Afif's CSS pattern collection
- [heropatterns.com](https://heropatterns.com/) - SVG background patterns
- [pattern.monster](https://pattern.monster/) - Pattern generator
- [magicpattern.design](https://www.magicpattern.design/tools/css-backgrounds) - CSS background generator
- Custom patterns using CSS gradients and SVG data URIs

---

*Total: 46 distinct patterns across 17 categories*
