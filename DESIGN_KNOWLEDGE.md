# UnBoring Design Knowledge Base

> Compiled from extensive research of Awwwards.com, award-winning websites, and design blog posts.
> Last updated: May 28, 2026

---

## 1. DESIGN PHILOSOPHY

### Core Principles from Award-Winning Studios

#### Subtractive Design (BL/S®)
- Remove elements rather than add — fewer components force higher precision
- When there's less to process, there's more room to feel
- Interface should feel like an environment you enter, not something you operate
- **"Removing elements is often more demanding than adding them"**

#### Narrative-Driven Design (Immersive Garden)
- Time as a core narrative device
- Non-linear exploration with scroll-based journey
- Restraint in interaction — nothing demands attention or forces progression
- Every design decision: "Does this element add meaning, or does it introduce noise?"

#### Digital Craft Philosophy (San Rita)
- Reject standardization — "The web is becoming perfectly clean, perfectly white, and perfectly boring"
- Use code as a tool for storytelling
- **"The most powerful digital experiences aren't the ones with the most features, but the ones with the most cohesive atmosphere"**

#### Emotional Brand Architecture (Frederik Hansen)
- Use Jungian archetypes (Jester, Explorer, Sage, Outlaw, Creator) for brand characters
- "Zig when others zag" — competitors use clean black-and-white; make everything pop
- Motion becomes messaging — characters physically push/pull UI elements

---

## 2. COLOR SYSTEMS

### Award-Winning Palette Examples

```
Goliath Entertainment: #0054dbcb #fffb91 #f44b37 #bfe6d4
MyLinkIsYourLink:      #c1f20f #ff00a1 #252626 #0b30fb
POLA:                  #1d1d1d #0053e1 #fef335 #ff4617
Bennett Tea:           #f9c5d1 #f46e6f #148c8a #2e3359
Wild Souls:            #ed7b49 #f6bde8 #b8afff #8cc1a7
Enid:                  #607262 #e5b9b0 #f4e3d1 #faf9f4
LM Chabot:             #aea2f0 #fed040 #1bb476 #0b43dc #fc3f21 #000000
```

### Real Site Color Systems

**Floema (Artistic)**
```css
--bg: #f2efea;          /* warm cream */
--text: #241f21;         /* dark brown */
--accent-orange: #f76c46;
--accent-gold: #c6af88;
--accent-blue: #85a1c5;
--accent-green: #bacfa3;
```

**Synthesis Capital (Investment)**
```css
--recombinant: #120a59;        /* deep blue */
--recombinant-light: #8884ac;
--recombinant-highlight: #a5d7ff;
--plant: #005725;
--plant-highlight: #d2ff51;    /* lime */
--cultivated: #e90055;         /* pink */
--cultivated-highlight: #ffc9fd;
--single-cell-highlight: #ffec44; /* yellow */
```

**Strawberry Group (Nordic)**
```css
--dark: #010101;
--light: #d9d9d9;
--brand: #d79e64;       /* gold */
--brand-light: #e7b889;
--brand-dark: #f38422;
--brown: #392e28;
--light-brown: #654839;
```

**Enerblock (Energy)**
```css
--black: rgb(12, 11, 17);
--white: rgb(255, 255, 255);
--orange: rgb(255, 89, 73);
--grey-50: rgb(240, 239, 235);
--grey-100: rgb(190, 189, 191);
--grey-900: rgb(19, 17, 20);
```

**KVS Studio (Minimal)**
```css
--bg-dark: #000000;
--text-light: #ffffff;
--text-gray: #c5c4c2;
--accent-orange: #ff5500;
--bg-light: #f0f0f0;
```

### Color Trends (2026)
- **Dark mode dominant** — deep blacks, navy
- **Warm neutrals** — cream (#f2efea), warm gray (#d9d9d9)
- **Rich blacks** — #171717, #010101, rgb(12,11,17)
- **Bold accents** — Orange (#ff5500, #f76c46), Lime (#d2ff51), Pink (#e90055)
- **Brand golds** — #d79e64, #c6af88
- **Monochromatic schemes** with single accent color
- **High contrast** for accessibility (WCAG AA minimum)
- **Gradient accents** — subtle, 2-color max

### Semantic Color Tokens (Recommended)
```css
:root {
  /* Core */
  --color-primary: #0053e1;
  --color-accent: #fef335;
  --color-surface: #faf9f4;
  --color-text: #1d1d1d;
  
  /* States */
  --color-success: #3bdd8f;
  --color-error: #ff3e60;
  --color-warning: #fec32d;
  --color-info: #0054db;
  
  /* Transparency scale */
  --white-5: hsla(0, 0%, 100%, .051);
  --white-20: hsla(0, 0%, 100%, .2);
  --white-30: hsla(0, 0%, 100%, .302);
  --white-50: hsla(40, 39%, 95%, .502);
  --black-5: rgba(0, 0, 0, .051);
  --black-20: rgba(0, 0, 0, .2);
  --black-30: rgba(0, 0, 0, .302);
  --black-50: rgba(0, 0, 0, .502);
}
```

---

## 3. TYPOGRAPHY

### Trending Fonts (Awwwards Recommended)

**Display/Headline**
- Geist (Vercel) — modern, clean, tech-forward
- PP Mori (Pangram Pangram) — contemporary grotesk
- Bigilla — display serif, editorial feel
- Humane — bold, condensed display
- Aalto Display Font — elegant, architectural

**Body/Text**
- NOHEMI Typeface — variable, 9 styles
- Unique Typeface — variable condensed, 7 styles
- Round 8 (atipo) — rounded, friendly
- Absans — clean geometric sans
- Vercetti Regular — versatile sans-serif

**Variable Fonts (Trending)**
- Mango Grotesque Variable
- Melody Variable Font
- NOHEMI (variable)
- Unique Typeface (variable)

**Fonts Used by Award-Winning Sites**
- obys.agency: Custom "Obys" serif
- makemepulse: "Biotif" sans-serif
- tenity.com: "Diagramm" + "IBM Plex Sans"
- jiejoe: "Times" serif
- Floema: "Zimula" (serif)
- Enerblock: "Neue Corp" (sans) + "Times" (serif)
- Synthesis Capital: "syntheSans" (custom)
- Strawberry Group: "Nhaasgrotesktxpro 65 Md"

### Typography Scale (Modular, 1.25 ratio)
```css
:root {
  --text-xs: 0.8rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
  --text-hero: clamp(3rem, 8vw, 8rem);
}
```

### Responsive Typography (clamp)
```css
/* From Strawberry Group */
--h1: clamp(5.75rem, 4.556rem + 5.966vw, 11rem);
--h2: clamp(4rem, 3.318rem + 3.409vw, 7rem);
--h3: clamp(2.375rem, 2.119rem + 1.278vw, 3.5rem);
--body: 1.05rem;
```

### Typography Trends
- **Hero fonts and bold typefaces** overtaking images as main design element
- **Serifs are back** — bold + serif combination is defining trend
- **Variable fonts** for fluid weight/width transitions on scroll/interaction
- **Mixing serif and sans-serif in same sentence** (Brutalism/Maximalism)
- **Negative letter-spacing** on headings: -0.015em to -2.13px
- **Line heights**: 1.05-1.5 (tighter for headings)

---

## 4. SPACING & LAYOUT

### Spacing Scale (8px base)
```css
:root {
  --space-1: 0.25rem;  /* 4px */
  --space-2: 0.5rem;   /* 8px */
  --space-3: 0.75rem;  /* 12px */
  --space-4: 1rem;     /* 16px */
  --space-6: 1.5rem;   /* 24px */
  --space-8: 2rem;     /* 32px */
  --space-12: 3rem;    /* 48px */
  --space-16: 4rem;    /* 64px */
  --space-24: 6rem;    /* 96px */
}
```

### Responsive Spacing (clamp)
```css
/* From Strawberry Group */
--size-0-25rem: .25rem;
--size-0-5rem: .5rem;
--size-1rem: 1rem;
--size-1-5rem: 1.5rem;
--size-2rem: clamp(1.75rem, ..., 2rem);
--size-3rem: clamp(2.25rem, ..., 3rem);
--size-4rem: clamp(2.5rem, ..., 4rem);
--size-5rem: clamp(3rem, ..., 5rem);
--size-7rem: clamp(4rem, ..., 7rem);
--size-10rem: clamp(5.5rem, ..., 10rem);
```

### Grid Systems

**obys.agency (12-column)**
```css
:root {
  --g: 1rem;                    /* gutter */
  --c: calc((100vw - (1rem*2 + 1rem*11))/12);  /* column width */
  --m-y: 1rem;                  /* margin-y */
  --m-x: 1rem;                  /* margin-x */
}
```

**Floema (24-column)**
```css
:root {
  --grid-columns: 24;
  --grid-gap: clamp(14px, 9.71px + 100vw * .011, 28px);
  --grid-margin: clamp(16px, 10.15px + 100vw * .015, 36px);
  --grid-width: calc(100vw - var(--grid-margin)*2);
}
```

**Enerblock (12-column)**
```css
:root {
  --grid-gutter: 1.25rem;
  --grid-margin: 1.25rem;
  --grid-columns: 12;
  --context: 1440;
}
```

**Strawberry Group (12-column)**
```css
:root {
  --site--width: 12rem;
  --site--column-count: 12;
  --site--gutter: 1rem;
  --site--margin: clamp(1rem, 0.886rem + 0.568vw, 1.5rem);
}
```

### Layout Patterns
| Pattern | Best For |
|---------|----------|
| Zig-Zag Layout | Eye-scanning, CTA placement |
| F-Layout | Content-heavy sites |
| Magazine Layout | Multi-column editorial |
| Grid Layout | Portfolio/product display |
| Card Layout | Feed-style content |
| Split Screen | Two-option comparison |
| Single Page | Storytelling |
| Infinite Canvas | WebGL/experimental |

---

## 5. ANIMATION & INTERACTION

### Easing Functions
```css
:root {
  /* From tenity.com */
  --expoIn: cubic-bezier(0.7, 0, 0.84, 0);
  --expoOut: cubic-bezier(0.16, 1, 0.3, 1);
  --expoInOut: cubic-bezier(0.87, 0, 0.13, 1);
  --p2In: cubic-bezier(0.11, 0, 0.5, 0);
  --p2Out: cubic-bezier(0.5, 1, 0.89, 1);
  --p2InOut: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-out: cubic-bezier(0.050, 0.760, 0.380, 1.015);
  
  /* From Floema */
  --ease-in-out-back: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  
  /* From Enerblock */
  --custom-snappy: cubic-bezier(.53, 0, 0, 1);
  
  /* Standard */
  --ease-in-out: cubic-bezier(.4, 0, .2, 1);  /* Tailwind */
}
```

### Animation Tokens
```css
:root {
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --duration-dramatic: 800ms;
}
```

### Animation Libraries (Tiered)
| Library | Best For | Size |
|---------|----------|------|
| **GSAP (GreenSock)** | Production-grade complex animations | Medium |
| **Anime.js** | SVG + DOM + CSS properties | Light |
| **Popmotion/Framer Motion** | React-based spring/inertia | <5kb |
| **ScrollReveal JS** | Scroll-triggered animations | Light |
| **Mo.js** | Motion graphics, retina-ready | Medium |
| **Velocity.js** | jQuery-compatible, fast | Light |
| **Hover.css** | Button/UI hover effects | CSS-only |
| **CSShake** | Shake attention animations | CSS-only |
| **Bounce.js** | CSS3 keyframe generation | Light |

### Libraries Used by Award-Winning Sites
- **GSAP** + ScrollTrigger, Flip, SplitText (most popular)
- **Lenis** (smooth scrolling — tenity, jiejoe, Strawberry Group)
- **Swiper** (carousels — tenity, Strawberry Group)
- **Barba.js** (page transitions — Strawberry Group)
- **Lottie** (vector animations — makemepulse)
- **Three.js / WebGL** (3D — Bruno Simon, San Rita, makemepulse)

### Scroll Techniques
- **Locomotive Scroll** — smooth scrolling library
- **GSAP ScrollTrigger** — scroll-linked animations
- **Parallax layers** — depth effect on scroll
- **Horizontal scroll sections** — breaking vertical monotony
- **Infinite scroll** — for galleries/portfolios
- **Scroll-snap** — CSS snap points for sections

### Interaction Patterns
- **Cursor-following elements** — custom cursors, magnetic buttons
- **Drag interactions** — for galleries, carousels
- **Hover state transformations** — morphing, color shifts
- **Gesture-based navigation** — swipe, pinch on mobile
- **Real-time feedback** — form validation, progress indicators
- **Context-aware UI** — adapts based on user behavior

---

## 6. BORDER RADIUS

### Radius Scale
```css
:root {
  /* From various sites */
  --radius-xs: 2px;
  --radius-sm: 5px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-3xl: 30px;
  --radius-pill: 100px;
  --radius-round: 50%;
  
  /* From Strawberry Group */
  --radius-main: 2rem;
  --radius-small: .45rem;
  --radius-round: 100vw;
  
  /* From Synthesis Capital */
  --radius: 5px;
  --radius-lg: 16px;
  --radius-pill: 100px;
}
```

---

## 7. SHADOW & ELEVATION

### Shadow Scale
```css
:root {
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
  --shadow-xl: 0 20px 50px rgba(0,0,0,0.2);
  
  /* Neon glow pattern (from jiejoe) */
  --glow-sm: 0 0 7px var(--glow-color);
  --glow-md: 0 0 10px var(--glow-color), 0 0 21px var(--glow-color);
  --glow-lg: 0 0 20px var(--glow-color), 0 0 60px var(--glow-color);
}
```

---

## 8. COMPONENT PATTERNS

### Navigation
- Fixed/sticky headers with minimal branding
- Hamburger menus with fullscreen overlays
- Scroll-triggered reveals (appear/disappear based on scroll direction)
- Mega menus for complex site structures
- Anchor-based smooth scrolling for single-page designs

### Hero Sections
- Full-viewport height with bold typography
- Video backgrounds (looping, muted)
- 3D/WebGL experiences as focal points
- Layered parallax with depth effects
- Minimal copy — 1-2 lines max with clear CTA

### Card/Grid Layouts
- CSS Grid with auto-fit/minmax for responsive layouts
- Masonry layouts for portfolio/gallery sites
- Hover states with scale transforms and overlay reveals
- Aspect-ratio constraints (16:9, 4:3, 1:1)
- Gap-based spacing (typically 16-32px)

### Form Designs
- Floating labels that animate on focus
- Minimal input styling — bottom borders only
- Custom select dropdowns with animated reveals
- Multi-step forms with progress indicators
- Inline validation with micro-animations

### CTA Buttons
- Pill-shaped with generous padding
- Hover animations — scale, color shift, underline reveals
- Ghost buttons for secondary actions
- Icon integration (arrows, chevrons)
- Consistent sizing — 48-56px height

### Footer Designs
- Multi-column layouts with organized link groups
- Newsletter signup prominently placed
- Social media icons with hover effects
- Back-to-top button integrated into footer
- Legal links in a compact bottom bar

---

## 9. DESIGN SYSTEM TOKENS

### Recommended Token Structure
```css
:root {
  /* Colors */
  --color-primary: ...;
  --color-accent: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --color-border: ...;
  --color-success: ...;
  --color-error: ...;
  --color-warning: ...;
  
  /* Typography */
  --font-primary: ...;
  --font-secondary: ...;
  --font-mono: ...;
  --text-xs: 0.8rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
  --text-hero: clamp(3rem, 8vw, 8rem);
  
  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-24: 6rem;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-2xl: 24px;
  --radius-pill: 100px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 25px rgba(0,0,0,0.15);
  
  /* Animation */
  --duration-fast: 150ms;
  --duration-normal: 300ms;
  --duration-slow: 500ms;
  --ease-out: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.87, 0, 0.13, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Layout */
  --grid-columns: 12;
  --grid-gutter: 1rem;
  --grid-max-width: 1440px;
  --section-padding: 80px;
}
```

---

## 10. KEY TAKEAWAYS FOR UNBORING

### Design Principles
1. **Subtract, don't add** — Fewer elements force better design decisions
2. **Narrative over navigation** — Guide users through stories, not menus
3. **Motion is meaning** — Animation should carry experience, not decorate it
4. **Restraint is strength** — The hardest design decisions are what to remove
5. **Tactile over digital** — Reference physical materials and textures
6. **Performance is design** — Speed and fluidity shape emotional response
7. **Trust your audience** — Not everything needs to be explained
8. **Atmosphere over features** — Cohesive feeling beats feature count
9. **Break rules intentionally** — Typography and layout rules exist to be questioned
10. **AI as tool, not replacement** — Use AI to accelerate, but craft makes it believable

### For UnBoring's "Surprise Me" Feature
- **Color palettes**: Use 6-8 color semantic token system with warm neutrals and bold accents
- **Typography**: Pair serif display fonts with sans-serif body (variable fonts preferred)
- **Spacing**: 8px base unit with clamp() for responsive scaling
- **Border radius**: Scale from sharp (0px) to pill (100px) with meaningful steps
- **Shadows**: Layer 5 shadows for depth, add colored glows for emphasis
- **Animation**: GSAP for complex, CSS transitions for micro-interactions
- **Layout**: 12-column CSS Grid with named template areas
- **Dark mode**: CSS class toggle with semantic color tokens

### Must-Have Techniques
- GSAP + ScrollTrigger for scroll animations
- CSS custom properties for theming
- Variable fonts for performance
- `prefers-reduced-motion` for accessibility
- Container queries for responsive components

### Avoid
- Over-animation (serves no purpose)
- Heavy JS frameworks when vanilla works
- Ignoring mobile performance
- Sacrificing accessibility for aesthetics

---

## 11. RECOMMENDED TOOLS & RESOURCES

### Color Palette Generators
- Coolors — fast generator, exports SVG/PDF/SCSS
- Khroma — AI tool that learns your preferences
- Happy Hues — shows palettes applied to real website layouts
- Adobe Color — color wheel + community schemes
- Paletton — educational for understanding color theory
- Scale — playful palette generator with fine-tuning
- Colorable — text/background contrast checker (WCAG compliance)

### Animation Prototyping
- LottieFiles — export from After Effects
- Origami (by Facebook) — free, drag-and-drop
- Flinto — lightweight, smooth mobile+desktop preview

### Design Inspiration
- Awwwards.com — curated award-winning sites
- Dribbble — design community
- Behance — portfolio platform
- SiteInspire — web design gallery
- Httpster — curated web design

---

## 12. SaaS PRODUCT DESIGN PATTERNS

> From saaslandingpage.com (930+ examples) and real SaaS products

### Color Systems from Real SaaS Products

**Linear.app** — Deep dark, indigo accent
```css
--color-bg-primary: #08090a;
--color-bg-level-1: #0f1011;
--color-bg-level-2: #141516;
--color-bg-level-3: #191a1b;
--color-fg-primary: #f7f8f8;
--color-fg-secondary: #d0d6e0;
--color-accent: #7170ff;
--color-brand-bg: #5e6ad2;
```

**Vercel.com** — Pure black/white, blue accent
```css
--geist-background: #fff;
--geist-foreground: #000;
--geist-success: #0070f3;
--geist-error: #e00;
--geist-cyan: #50e3c2;
--geist-violet: #7928ca;
--geist-highlight-purple: #f81ce5;
```

**Supabase.com** — Green accent, clean light
```css
--brand-default: 152.9deg 60% 52.9%;
--background-default: 0deg 0% 98.8%;
--foreground-default: 0deg 0% 9%;
--border-default: 0deg 0% 87.5%;
```

**PlanetScale.com** — Purple scale, clean dark
```css
--purple-500: #8467f3;
--purple-600: #5e49af;
--bg-primary: #fafafa;
--text-primary: #414141;
```

**Trigger.dev** — Charcoal dark, lime accent
```css
--charcoal-800: #1A1B1F;
--charcoal-850: #15171A;
--primary: #A8FF53;
--secondary: #7655fd;
```

**Raycast.com** — Deep dark, multi-color accents
```css
--background: #07080a;
--color-bg-100: rgb(16,17,17);
--color-blue: hsl(202,100%,67%);
--color-green: hsl(151,59%,59%);
--color-red: hsl(0,100%,69%);
```

**Resend.com** — Pure black, white accent
```css
--background: #000;
--color-gray-1: #141517;
--color-gray-12: #f0f0f0;
--shadow-button: 0px 0px 4px #ffffff0f, 0px 1px 14px #ffffff1f;
```

### SaaS Design Trends (2026)
- **Dark mode dominant** — Pure black (#000) or near-black (#08090a)
- **Multi-level background hierarchy** — 3-4 levels of dark (level-0, level-1, level-2, level-3)
- **12-step gray scale** — From hsl(0,0%,99%) to hsl(0,0%,9%)
- **Single accent color** — Usually one vibrant color (purple, green, blue, lime, orange)
- **Monospace for labels** — IBM Plex Mono, JetBrains Mono, Fragment Mono
- **Custom display fonts** — Tiempos Headline, Aeonik, ABC Favorit
- **Layered shadows** — Multiple shadow layers for depth
- **Glass morphism** — backdrop-filter: blur() with semi-transparent backgrounds
- **Pill-shaped CTAs** — 9999px border-radius for action buttons
- **Active scale** — active:scale-[0.985] micro-interaction

### SaaS Hero Section Patterns
1. **Dark background** with bright accent CTA
2. **Large typography** with character-by-character animation
3. **Gradient overlays** on dark backgrounds
4. **Glass morphism** with backdrop-filter
5. **Video backgrounds** (looping, muted)
6. **3D/WebGL** focal points

---

## 13. GAME UI DESIGN PATTERNS

> From gameuidatabase.com, interfaceingame.com, and real game analysis

### Game Style Categories

| Style | Colors | Radius | Border | Shadow | Font |
|-------|--------|--------|--------|--------|------|
| **Pixel Art** | Navy/green 8-bit | 0px | 4px solid | 4px 4px 0 hard | Press Start 2P |
| **Arcade CRT** | Black/phosphor green | 0px | 2px solid | none (glow text) | VT323 |
| **Neon Arcade** | Purple/pink/cyan | 0px | 2px solid | Triple neon glow | Orbitron/Rajdhani |
| **Fighting** | Red/gold/white | 0px | 3px solid | Heavy dramatic | Bebas Neue/Oswald |
| **RPG Fantasy** | Gold/cream/dark | 4px | 3px solid | Warm atmospheric | Cinzel/EB Garamond |
| **Sci-Fi HUD** | Cyan/orange holographic | 0px | 1px solid | Neon glow | Rajdhani/Exo 2 |
| **Horror** | Blood red/dark grey | 2px | 1px solid | Oppressive deep | Creepster |
| **Casual** | Pink/blue pastel | 1rem | 3px solid | Soft playful | Nunito/Fredoka |
| **Card Game** | Gold/parchment/wood | 8px | 3px solid | Card depth | Cinzel/serif |
| **Indie** | Coral/teal/dark | 4px | 2px solid | Atmospheric | Bangers/Patrick Hand |
| **Big Shadow** | High contrast | 0px | 4px solid | 12px 12px 0 hard | Bebas Neue |
| **Glitch** | Cyan/pink distortion | 0px | 2px solid | Chromatic aberration | Orbitron |
| **Hades** | Gold/hellfire/dark | 4px | 2px solid | Fiery glow | Cinzel/serif |

### Key Game UI Techniques
- **Pixel-perfect rendering**: `image-rendering: pixelated`, no anti-aliasing
- **CRT scanlines**: `repeating-linear-gradient(0deg, rgba(0,0,0,0.3) 0px, rgba(0,0,0,0.3) 1px, transparent 1px, transparent 2px)`
- **Neon glow**: Multi-layer `box-shadow` and `text-shadow` with decreasing opacity
- **Hard shadows**: No blur, pure offset `box-shadow: Npx Npx 0 color`
- **Chromatic aberration**: Split red/cyan shadows `2px 0 0 red, -2px 0 0 cyan`
- **Glitch effects**: Random offset transforms with color split
- **Step animations**: `animation-timing-function: steps(N)` for pixel art

---

*This document is a living reference. Update as new design patterns and techniques emerge.*
