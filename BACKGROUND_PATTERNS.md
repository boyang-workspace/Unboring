# CSS Background Patterns for UnBoring

> 30+ background patterns organized by category. Each pattern is a single CSS `background` value.

## Format

Each pattern is stored as a CSS custom property:
```css
--bg-pattern: <css-background-value>;
```

Applied via: `background: var(--bg-pattern);`

---

## 1. SOLID / MINIMAL (3 patterns)

```css
/* 1. Pure white */
--bg-solid-white: #ffffff;

/* 2. Off-white warm */
--bg-solid-warm: #faf9f7;

/* 3. Pure black */
--bg-solid-black: #0a0a0a;
```

---

## 2. GRADIENTS (8 patterns)

```css
/* 4. Soft blue-purple (2-color) */
--bg-gradient-blue: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 5. Warm sunset (2-color) */
--bg-gradient-sunset: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);

/* 6. Ocean depth (2-color) */
--bg-gradient-ocean: linear-gradient(135deg, #667eea 0%, #00d2ff 100%);

/* 7. Forest (3-color) */
--bg-gradient-forest: linear-gradient(135deg, #0f9b0f 0%, #38ef7d 50%, #11998e 100%);

/* 8. Deep space (dark) */
--bg-gradient-space: linear-gradient(to bottom, #0f0c29 0%, #302b63 50%, #24243e 100%);

/* 9. Mesh purple (layered radial) */
--bg-mesh-purple:
  radial-gradient(at 20% 80%, rgba(168,85,247,0.6) 0%, transparent 50%),
  radial-gradient(at 80% 20%, rgba(99,102,241,0.6) 0%, transparent 50%),
  radial-gradient(at 50% 50%, rgba(236,72,153,0.4) 0%, transparent 60%),
  linear-gradient(135deg, #1e1b4b, #312e81);

/* 10. Mesh warm (layered radial) */
--bg-mesh-warm:
  radial-gradient(at 0% 0%, rgba(251,146,60,0.7) 0%, transparent 50%),
  radial-gradient(at 100% 0%, rgba(251,113,133,0.6) 0%, transparent 50%),
  radial-gradient(at 50% 100%, rgba(232,121,249,0.5) 0%, transparent 50%),
  linear-gradient(to bottom, #1c1917, #292524);

/* 11. Aurora */
--bg-aurora:
  radial-gradient(ellipse at 20% 50%, rgba(16,185,129,0.4) 0%, transparent 50%),
  radial-gradient(ellipse at 60% 30%, rgba(99,102,241,0.35) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 60%, rgba(168,85,247,0.3) 0%, transparent 50%),
  linear-gradient(to bottom, #020617, #0f172a);
```

---

## 3. DOTS / POLKA (4 patterns)

```css
/* 12. Small dots (light) */
--bg-dots-sm: radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px);
--bg-dots-sm-size: 20px 20px;

/* 13. Medium dots (light) */
--bg-dots-md: radial-gradient(circle, rgba(0,0,0,0.06) 1.5px, transparent 1.5px);
--bg-dots-md-size: 32px 32px;

/* 14. Large dots (light) */
--bg-dots-lg: radial-gradient(circle, rgba(0,0,0,0.05) 2px, transparent 2px);
--bg-dots-lg-size: 48px 48px;

/* 15. Colorful dots */
--bg-dots-color: radial-gradient(circle, rgba(99,102,241,0.15) 2px, transparent 2px);
--bg-dots-color-size: 24px 24px;
```

---

## 4. LINES / STRIPES (5 patterns)

```css
/* 16. Horizontal lines */
--bg-lines-h: repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(0,0,0,0.05) 19px, rgba(0,0,0,0.05) 20px);

/* 17. Vertical lines */
--bg-lines-v: repeating-linear-gradient(90deg, transparent, transparent 19px, rgba(0,0,0,0.05) 19px, rgba(0,0,0,0.05) 20px);

/* 18. Diagonal lines */
--bg-lines-diag: repeating-linear-gradient(45deg, transparent, transparent 9px, rgba(0,0,0,0.04) 9px, rgba(0,0,0,0.04) 10px);

/* 19. Dashed lines */
--bg-lines-dash: repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.06) 8px, rgba(0,0,0,0.06) 16px);

/* 20. Chevron */
--bg-chevron:
  linear-gradient(135deg, rgba(0,0,0,0.03) 25%, transparent 25%),
  linear-gradient(225deg, rgba(0,0,0,0.03) 25%, transparent 25%);
--bg-chevron-size: 20px 20px;
```

---

## 5. GRID / GRAPH PAPER (3 patterns)

```css
/* 21. Light grid */
--bg-grid-light:
  linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px);
--bg-grid-light-size: 40px 40px;

/* 22. Graph paper */
--bg-graph:
  linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px);
--bg-graph-size: 20px 20px;

/* 23. Blueprint (dark) */
--bg-blueprint:
  linear-gradient(rgba(99,102,241,0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(99,102,241,0.1) 1px, transparent 1px);
--bg-blueprint-size: 40px 40px;
```

---

## 6. CHECKERBOARD (2 patterns)

```css
/* 24. Classic checkerboard */
--bg-checker: conic-gradient(rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%);
--bg-checker-size: 20px 20px;

/* 25. Large checkerboard */
--bg-checker-lg: conic-gradient(rgba(0,0,0,0.02) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.02) 75%);
--bg-checker-lg-size: 40px 40px;
```

---

## 7. HEXAGONAL (1 pattern)

```css
/* 26. Hexagonal grid */
--bg-hex:
  linear-gradient(30deg, rgba(0,0,0,0.03) 12%, transparent 12.5%, transparent 87%, rgba(0,0,0,0.03) 87.5%),
  linear-gradient(150deg, rgba(0,0,0,0.03) 12%, transparent 12.5%, transparent 87%, rgba(0,0,0,0.03) 87.5%),
  linear-gradient(30deg, rgba(0,0,0,0.03) 12%, transparent 12.5%, transparent 87%, rgba(0,0,0,0.03) 87.5%),
  linear-gradient(150deg, rgba(0,0,0,0.03) 12%, transparent 12.5%, transparent 87%, rgba(0,0,0,0.03) 87.5%),
  linear-gradient(60deg, rgba(0,0,0,0.05) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.05) 75%),
  linear-gradient(60deg, rgba(0,0,0,0.05) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.05) 75%);
--bg-hex-size: 40px 70px;
```

---

## 8. CIRCLES / TARGET (2 patterns)

```css
/* 27. Concentric rings */
--bg-rings: radial-gradient(circle, transparent 30%, rgba(0,0,0,0.03) 30%, rgba(0,0,0,0.03) 31%, transparent 31%);
--bg-rings-size: 60px 60px;

/* 28. Target circles */
--bg-target: repeating-radial-gradient(circle, transparent, transparent 10px, rgba(0,0,0,0.02) 10px, rgba(0,0,0,0.02) 11px);
```

---

## 9. NOISE / GRAIN (2 patterns)

```css
/* 29. Subtle noise */
--bg-noise: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");

/* 30. Grain overlay (apply with background-blend-mode: overlay) */
--bg-grain: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.08'/%3E%3C/svg%3E");
```

---

## 10. CROSSHATCH (1 pattern)

```css
/* 31. Crosshatch */
--bg-cross:
  linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%),
  linear-gradient(45deg, rgba(0,0,0,0.03) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.03) 75%);
--bg-cross-size: 10px 10px;
--bg-cross-position: 0 0, 5px 5px;
```

---

## 11. TRIANGLES (1 pattern)

```css
/* 32. Triangle tessellation */
--bg-tri:
  linear-gradient(60deg, rgba(0,0,0,0.03) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.03) 75%),
  linear-gradient(60deg, rgba(0,0,0,0.03) 25%, transparent 25.5%, transparent 75%, rgba(0,0,0,0.03) 75%);
--bg-tri-size: 20px 35px;
--bg-tri-position: 0 0, 10px 18px;
```

---

## 12. STARS (1 pattern)

```css
/* 33. Starfield (dark) */
--bg-stars:
  radial-gradient(1px 1px at 10% 20%, rgba(255,255,255,0.6) 0%, transparent 100%),
  radial-gradient(1px 1px at 30% 40%, rgba(255,255,255,0.4) 0%, transparent 100%),
  radial-gradient(1px 1px at 50% 60%, rgba(255,255,255,0.5) 0%, transparent 100%),
  radial-gradient(1px 1px at 70% 80%, rgba(255,255,255,0.3) 0%, transparent 100%),
  radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.6) 0%, transparent 100%),
  radial-gradient(1px 1px at 15% 85%, rgba(255,255,255,0.4) 0%, transparent 100%),
  linear-gradient(to bottom, #0a0a0a, #1a1a2e);
```

---

## 13. ORGANIC / NATURAL (2 patterns)

```css
/* 34. Marble */
--bg-marble:
  radial-gradient(ellipse at 20% 50%, rgba(200,200,200,0.3) 0%, transparent 50%),
  radial-gradient(ellipse at 80% 20%, rgba(180,180,180,0.2) 0%, transparent 40%),
  radial-gradient(ellipse at 50% 80%, rgba(160,160,160,0.25) 0%, transparent 45%),
  linear-gradient(135deg, #f5f5f5, #e8e8e8);

/* 35. Paper texture */
--bg-paper:
  radial-gradient(ellipse at 30% 30%, rgba(200,190,170,0.15) 0%, transparent 50%),
  radial-gradient(ellipse at 70% 70%, rgba(180,170,150,0.1) 0%, transparent 50%),
  linear-gradient(to bottom, #faf9f7, #f5f3f0);
```

---

## 14. DARK PATTERNS (3 patterns)

```css
/* 36. Dark dots */
--bg-dark-dots: radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px);
--bg-dark-dots-size: 24px 24px;
--bg-dark-dots-base: #0a0a0a;

/* 37. Dark grid */
--bg-dark-grid:
  linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
--bg-dark-grid-size: 40px 40px;
--bg-dark-grid-base: #0a0a0a;

/* 38. Dark diagonal */
--bg-dark-diag: repeating-linear-gradient(45deg, transparent, transparent 9px, rgba(255,255,255,0.03) 9px, rgba(255,255,255,0.03) 10px);
--bg-dark-diag-base: #0a0a0a;
```

---

## 15. WAVES (2 patterns)

```css
/* 39. Sine waves */
--bg-waves:
  radial-gradient(circle at 100% 50%, transparent 20%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.03) 21%, transparent 21%),
  radial-gradient(circle at 0% 50%, transparent 20%, rgba(0,0,0,0.03) 20%, rgba(0,0,0,0.03) 21%, transparent 21%);
--bg-waves-size: 40px 20px;

/* 40. Wavy lines */
--bg-wavy:
  radial-gradient(circle at 50% 0%, transparent 48%, rgba(0,0,0,0.04) 48%, rgba(0,0,0,0.04) 50%, transparent 50%),
  radial-gradient(circle at 50% 100%, transparent 48%, rgba(0,0,0,0.04) 48%, rgba(0,0,0,0.04) 50%, transparent 50%);
--bg-wavy-size: 60px 30px;
```

---

## Usage in Design System

```css
/* Store as CSS custom property */
:root {
  --bg-pattern: var(--bg-dots-sm);
  --bg-pattern-size: var(--bg-dots-sm-size);
  --bg-pattern-base: #ffffff;
}

/* Apply to canvas background */
#canvas-content {
  background-color: var(--bg-pattern-base);
  background-image: var(--bg-pattern);
  background-size: var(--bg-pattern-size);
}

/* Apply to cards */
.cn-card {
  background-color: var(--card);
  background-image: var(--bg-pattern);
  background-size: var(--bg-pattern-size);
}
```

## Randomization Strategy

For "Surprise Me!", randomly select:
1. `--bg-pattern` from patterns 1-40
2. `--bg-pattern-size` from corresponding size
3. `--bg-pattern-base` from color palette
4. Optionally combine with gradient base color
