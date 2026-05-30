# UnBoring

A design tool for generating UI component styles. Click **Surprise me!** to randomize colors, fonts, spacing, shadows, and border styles across 80 shadcn-inspired components. Export the result as CSS custom properties.

## What it does

- 80 UI components on an infinite canvas (cards, forms, tables, charts, heroes, etc.)
- **Surprise me!** randomizes the entire design system in one click
- **Export CSS** copies the current theme as CSS custom properties
- Sidebar controls for fine-tuning colors, fonts, spacing, radius, shadows
- 10 font families (sans-serif, serif, display, handwritten)
- 11 color palettes + background patterns
- Pan/zoom canvas with mouse drag and scroll wheel

## Design inspiration

Component layouts are inspired by [shadcn/ui](https://ui.shadcn.com/create). Design patterns are researched from [Awwwards](https://www.awwwards.com/) award-winning sites and [SaaS Landing Page](https://saaslandingpage.com/) gallery.

## Run locally

```bash
# Serve with any static file server
python3 -m http.server 4173
# or
npx serve .
```

Then open http://localhost:4173

## Deploy

```bash
# Cloudflare Pages
npm run deploy

# Or any static hosting (Vercel, Netlify, GitHub Pages)
# Just upload the root directory
```

## Project structure

```
/
├── index.html          # Designer tool (main page)
├── canvas/             # Canvas page (same as index)
├── motion/             # Animation demos
├── components/         # Component patterns
├── interactions/       # Interaction patterns
├── styles/             # Visual themes
├── effects/            # Visual effects
├── surfaces/           # UI surface patterns
├── agent/              # MCP/CLI documentation
├── assets/             # Shared styles
├── scripts/            # Build scripts
├── LICENSE             # MIT
└── README.md
```

## License

MIT
