# UnBoring Design Patterns — Practical Code Reference

> Extracted from award-winning websites on Awwwards.com. Ready-to-use CSS/JS patterns.

---

## 1. CSS CUSTOM PROPERTIES ARCHITECTURE

### Easing Library (from tenity.com)
```css
:root {
  --expoIn: cubic-bezier(0.7, 0, 0.84, 0);
  --expoOut: cubic-bezier(0.16, 1, 0.3, 1);
  --expoInOut: cubic-bezier(0.87, 0, 0.13, 1);
  --p2In: cubic-bezier(0.11, 0, 0.5, 0);
  --p2Out: cubic-bezier(0.5, 1, 0.89, 1);
  --p2InOut: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-out-back: cubic-bezier(0.050, 0.760, 0.380, 1.015);
  --ease-in-out-back: cubic-bezier(0.075, 0.82, 0.165, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);
  --custom-snappy: cubic-bezier(.53, 0, 0, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Transparency Scale (from tenity.com)
```css
:root {
  --white-5: hsla(0, 0%, 100%, .051);
  --white-10: hsla(0, 0%, 100%, .1);
  --white-20: hsla(0, 0%, 100%, .2);
  --white-30: hsla(0, 0%, 100%, .302);
  --white-50: hsla(40, 39%, 95%, .502);
  --black-5: rgba(0, 0, 0, .051);
  --black-10: rgba(0, 0, 0, .1);
  --black-20: rgba(0, 0, 0, .2);
  --black-30: rgba(0, 0, 0, .302);
  --black-50: rgba(0, 0, 0, .502);
}
```

### Viewport-Responsive Spacing (from Strawberry Group)
```css
:root {
  --space-xs: clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem);
  --space-sm: clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem);
  --space-md: clamp(1rem, 0.8rem + 1vw, 1.5rem);
  --space-lg: clamp(2rem, 1.6rem + 2vw, 3rem);
  --space-xl: clamp(4rem, 3.2rem + 4vw, 6rem);
  --space-2xl: clamp(6rem, 4.8rem + 6vw, 10rem);
}
```

### Fluid Typography (from Strawberry Group)
```css
:root {
  --text-hero: clamp(3rem, 2rem + 5vw, 8rem);
  --text-h1: clamp(2.5rem, 1.8rem + 3.5vw, 5.75rem);
  --text-h2: clamp(2rem, 1.5rem + 2.5vw, 4rem);
  --text-h3: clamp(1.5rem, 1.2rem + 1.5vw, 2.375rem);
  --text-h4: clamp(1.25rem, 1.1rem + 0.75vw, 1.75rem);
  --text-body: clamp(0.9rem, 0.85rem + 0.25vw, 1.05rem);
  --text-small: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
}
```

---

## 2. GRID SYSTEMS

### 12-Column Grid (from obys.agency)
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--grid-gutter, 1rem);
  max-width: var(--grid-max-width, 1440px);
  margin: 0 auto;
  padding: 0 var(--grid-margin, 1rem);
}

.col-span-1 { grid-column: span 1; }
.col-span-2 { grid-column: span 2; }
.col-span-3 { grid-column: span 3; }
.col-span-4 { grid-column: span 4; }
.col-span-6 { grid-column: span 6; }
.col-span-8 { grid-column: span 8; }
.col-span-12 { grid-column: span 12; }
```

### 24-Column Grid (from Floema)
```css
.grid-24 {
  display: grid;
  grid-template-columns: repeat(24, 1fr);
  gap: clamp(14px, 9.71px + 100vw * .011, 28px);
  padding: 0 clamp(16px, 10.15px + 100vw * .015, 36px);
}
```

### Responsive Column System
```css
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr));
  gap: var(--space-6);
}
```

---

## 3. SMOOTH SCROLL (Lenis)

### Setup
```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);
```

### With GSAP ScrollTrigger
```javascript
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

---

## 4. SCROLL ANIMATIONS

### Fade In Up
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}

.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Staggered Reveal
```javascript
const staggerObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100); // 100ms stagger
    }
  });
}, { threshold: 0.1 });
```

### Parallax Scroll
```javascript
gsap.to('.parallax-element', {
  y: -100,
  scrollTrigger: {
    trigger: '.parallax-element',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  }
});
```

---

## 5. LOADING ANIMATIONS

### Block Reveal (from jiejoe)
```css
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  pointer-events: none;
}

.loader__block {
  flex: 1;
  background: var(--color-text);
  transform: scaleY(0);
  transform-origin: bottom;
}

.loader__block:nth-child(1) { animation: loader-reveal 0.6s var(--ease-out-expo) 0s forwards; }
.loader__block:nth-child(2) { animation: loader-reveal 0.6s var(--ease-out-expo) 0.1s forwards; }
.loader__block:nth-child(3) { animation: loader-reveal 0.6s var(--ease-out-expo) 0.2s forwards; }
.loader__block:nth-child(4) { animation: loader-reveal 0.6s var(--ease-out-expo) 0.3s forwards; }

@keyframes loader-reveal {
  0% { transform: scaleY(0); transform-origin: bottom; }
  50% { transform: scaleY(1); transform-origin: bottom; }
  50.1% { transform-origin: top; }
  100% { transform: scaleY(0); transform-origin: top; }
}
```

### CRT Power-On Effect (from KVS)
```css
.crt-on {
  animation: crt-on 0.5s ease-out forwards;
}

@keyframes crt-on {
  0% {
    transform: scaleY(0.01) scaleX(0);
    filter: brightness(10);
  }
  50% {
    transform: scaleY(0.01) scaleX(1);
    filter: brightness(10);
  }
  75% {
    transform: scaleY(1) scaleX(1);
    filter: brightness(2);
  }
  100% {
    transform: scaleY(1) scaleX(1);
    filter: brightness(1);
  }
}
```

---

## 6. HOVER EFFECTS

### Magnetic Button
```javascript
class MagneticButton {
  constructor(el) {
    this.el = el;
    this.boundingRect = null;
    this.setupListeners();
  }

  setupListeners() {
    this.el.addEventListener('mouseenter', () => {
      this.boundingRect = this.el.getBoundingClientRect();
    });
    
    this.el.addEventListener('mousemove', (e) => {
      const x = e.clientX - this.boundingRect.left - this.boundingRect.width / 2;
      const y = e.clientY - this.boundingRect.top - this.boundingRect.height / 2;
      
      gsap.to(this.el, {
        x: x * 0.3,
        y: y * 0.3,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    
    this.el.addEventListener('mouseleave', () => {
      gsap.to(this.el, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    });
  }
}
```

### Card Hover with Image Zoom
```css
.card {
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.card__image {
  transition: transform 0.6s var(--ease-out-expo);
}

.card:hover .card__image {
  transform: scale(1.05);
}

.card__overlay {
  opacity: 0;
  transition: opacity 0.4s var(--ease-out);
}

.card:hover .card__overlay {
  opacity: 1;
}
```

### Underline Reveal
```css
.link-underline {
  position: relative;
  text-decoration: none;
}

.link-underline::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s var(--ease-out-expo);
}

.link-underline:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
```

---

## 7. THEME SYSTEM

### Dark/Light Toggle (from makemepulse)
```css
.theme-dark {
  --text-primary: #fff;
  --text-secondary: #a0a0a0;
  --bg-primary: #000;
  --bg-secondary: #111;
  --border-color: #222;
}

.theme-light {
  --text-primary: #000;
  --text-secondary: #666;
  --bg-primary: #fff;
  --bg-secondary: #f5f5f5;
  --border-color: #e0e0e0;
}
```

```javascript
function toggleTheme() {
  const html = document.documentElement;
  const current = html.classList.contains('theme-dark') ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  
  html.classList.remove(`theme-${current}`);
  html.classList.add(`theme-${next}`);
  localStorage.setItem('theme', next);
}
```

---

## 8. NEON GLOW EFFECT

```css
.neon {
  --glow-color: #17f700;
  color: var(--glow-color);
  text-shadow: 
    0 0 7px var(--glow-color),
    0 0 10px var(--glow-color),
    0 0 21px var(--glow-color),
    0 0 42px var(--glow-color);
}

.neon-box {
  --glow-color: #17f700;
  box-shadow: 
    0 0 5px var(--glow-color),
    0 0 15px var(--glow-color),
    0 0 30px var(--glow-color),
    inset 0 0 15px var(--glow-color);
}
```

---

## 9. VIEWPORT HEIGHT FIX

```javascript
// Fix mobile viewport height (from makemepulse)
function setVH() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

window.addEventListener('resize', setVH);
setVH();
```

```css
.full-height {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
}
```

---

## 10. CURSOR EFFECTS

### Custom Cursor
```css
.cursor {
  position: fixed;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--color-accent);
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: transform 0.15s ease-out;
}

.cursor.hovering {
  transform: scale(3);
}
```

```javascript
const cursor = document.querySelector('.cursor');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  cursorX += (mouseX - cursorX) * 0.15;
  cursorY += (mouseY - cursorY) * 0.15;
  cursor.style.left = cursorX + 'px';
  cursor.style.top = cursorY + 'px';
  requestAnimationFrame(animate);
}
animate();
```

---

## 11. TEXT ANIMATIONS

### Split Text Reveal (GSAP)
```javascript
import { gsap } from 'gsap';
import SplitType from 'split-type';

const text = new SplitType('.reveal-text', { types: 'chars' });

gsap.from(text.chars, {
  opacity: 0,
  y: 20,
  rotateX: -90,
  stagger: 0.02,
  duration: 0.6,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.reveal-text',
    start: 'top 80%',
  },
});
```

### Marquee Animation (from KVS)
```css
.marquee {
  display: flex;
  overflow: hidden;
}

.marquee__inner {
  display: flex;
  animation: marquee-scroll 25s linear infinite;
}

@keyframes marquee-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 12. PAGE TRANSITIONS

### Fade Transition (Barba.js)
```javascript
import barba from '@barba/core';

barba.init({
  transitions: [{
    name: 'fade',
    leave(data) {
      return gsap.to(data.current.container, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    },
    enter(data) {
      return gsap.from(data.next.container, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.inOut',
      });
    },
  }],
});
```

---

*Patterns extracted from: obys.agency, makemepulse.com, tenity.com, jiejoe.com, Floema, KVS.Services, Enerblock, Synthesis Capital, Strawberry Group*
