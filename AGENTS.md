# Agent Notes

This repo is a static site. Prefer small, explicit changes and run the generator before testing or deploying.

## Core Product Brief

UnBoring helps vibe coders, engineers, product managers, and AI agents find less boring UI design directions for products and websites. The project exists because AI-generated UI often burns tokens while still producing generic Tailwind/shadcn-style screens. UnBoring should provide concrete visual styles, motion patterns, templates, prompts, negative prompts, CSS tokens, and eventually MCP/JSON resources that agents can call directly.

Before making product, content, or IA changes, read `docs/PROJECT_BRIEF.md`.

## Commands

```bash
npm run build
npm run dev
npm run deploy
```

## Important Files

- `index.html`: hand-authored homepage and canvas markup.
- `assets/app.js`: homepage behavior, natural-language prompt builder, canvas controls, copy buttons, FAQ accordions, and logo font rolling.
- `assets/style.css`: homepage-specific CSS.
- `assets/components.css`: styles for cards inside the homepage canvas.
- `assets/styles.css`: shared CSS for generated library and detail pages.
- `scripts/build-site.js`: source of truth for generated pages, sitemap, robots, and redirects.
- `data/`: structured source data used by older scripts and research.
- `docs/PROJECT_BRIEF.md`: product thesis and handoff context for future agents.

## Workflow

1. Edit source files.
2. Run `npm run build`.
3. Test homepage plus representative generated pages:
   - `/`
   - `/components/`
   - `/effects/`
   - `/motion/calm-staggered-fade-up/`
4. Check console errors and horizontal overflow.
5. Deploy only when explicitly requested.

## Style Direction

The homepage defines the product chrome: warm paper background, 12px viewport margins, 56px floating header, green tilted logo icon, 8-12px radii, restrained shadows, and black/cream utility panels. Generated pages should feel like the same product, not a separate dark portfolio site.

## Do Not Commit

- `.wrangler/`
- `.gstack/`
- `.playwright-mcp/`
- temporary screenshots or one-off HTML experiments
