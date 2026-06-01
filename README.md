# UnBoring

UnBoring is a free, static UI inspiration tool for vibe coders and AI agents. The homepage helps users turn a natural-language design brief into visual tokens and a copyable prompt. The library pages collect motion patterns, components, interactions, visual styles, and effects that can be reused as design references.

Live site: https://unboring.openagent.bot

## What It Does

- Natural-language prompt builder on the homepage.
- Interactive canvas with 80 UI components and randomized visual systems.
- Library pages for motion, components, interactions, styles, and effects.
- Detail pages with previews, AI prompts, negative prompts, and tokens.
- Static deployment with Cloudflare Pages. No backend or account system.

## Local Development

```bash
npm install
npm run build
npm run dev
```

Open http://localhost:4173.

## Deploy

```bash
npm run build
npm run deploy
```

The deploy command publishes the repository root to Cloudflare Pages project `unboring`.

## Project Structure

```text
index.html              Homepage tool and canvas
assets/style.css        Homepage chrome and prompt builder styles
assets/components.css   Canvas component styles
assets/app.js           Homepage canvas, prompt builder, copy, FAQ, logo motion
assets/styles.css       Generated library/detail page styles
scripts/build-site.js   Static page generator and sitemap/redirect builder
data/                   Structured source data used by build scripts
motion/                 Generated motion pages
components/             Generated component pages
interactions/           Generated interaction pages
styles/                 Generated style recipe pages
effects/                Generated visual effect pages
agent/                  Generated agent-readiness page
docs/                   Handover notes and project documentation
```

Generated pages are committed so the site can be deployed as plain static files. When changing templates, metadata, redirects, or source entries, run `npm run build` before deploying.

## SEO And Redirects

- `scripts/build-site.js` generates `sitemap.xml`, `robots.txt`, and `_redirects`.
- Current canonical domain is `https://unboring.openagent.bot`.
- Legacy sections such as `/surfaces/`, `/text-effects/`, `/backgrounds/`, and `/canvas/` redirect to current pages.

## Open Source

The project uses the MIT License and is designed to welcome design-system, motion, prompt, and agent-workflow contributions.

Good first contributions include:

- New component, effect, motion, or interaction entries.
- Better prompt and negative-prompt wording for existing entries.
- More diverse visual systems for the homepage canvas.
- Accessibility, responsive layout, and SEO improvements.

Do not copy source assets, code, or proprietary visual identity from Awwwards, GSAP Showcase, or other inspiration sites. Extract reusable design principles instead.

See `AGENTS.md` for agent handoff notes and `CONTRIBUTING.md` for contribution rules.

## License

MIT
