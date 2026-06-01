# UnBoring

UnBoring is a free, open-source UI design inspiration tool for vibe coders, engineers, product managers, and AI agents. It helps people who are not trained designers quickly find visual directions, UI ideas, motion patterns, templates, prompts, and CSS they can apply to their own products or websites.

Live site: https://unboring.openagent.bot

## Why It Exists

Vibe coders often spend a lot of tokens asking AI tools to explore UI directions, only to receive generic, template-like screens. The result is usually too close to default Tailwind, shadcn, or SaaS dashboard patterns: clean enough, but visually boring.

UnBoring exists to give AI and humans better design vocabulary. Instead of asking an agent to "make it beautiful" and hoping for taste, users can browse concrete styles, interactions, components, motion ideas, and visual systems, then copy a prompt, CSS tokens, or structured design notes into their own workflow.

## What It Does

- Helps users explore product and website UI design directions.
- Provides a natural-language prompt builder on the homepage.
- Offers an interactive canvas with 80 UI components and randomized visual systems.
- Collects motion patterns, components, interactions, styles, effects, and templates as reusable design references.
- Gives each idea a preview, AI prompt, negative prompt, and tokens.
- Plans to expose design ideas through MCP, JSON packs, or other agent-readable formats.
- Ships as a static site on Cloudflare Pages. No backend or account system.

## Who It Is For

- Vibe coders who want their AI-generated products to look less generic.
- Engineers and product managers who can build but want stronger visual direction.
- AI agents that need structured design references instead of vague aesthetic instructions.
- Designers who want to contribute reusable styles, motion ideas, templates, and promptable design systems.

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
about/                  Generated project thesis and open-source mission page
docs/                   Handover notes and project documentation
```

Generated pages are committed so the site can be deployed as plain static files. When changing templates, metadata, redirects, or source entries, run `npm run build` before deploying.

## SEO And Redirects

- `scripts/build-site.js` generates `sitemap.xml`, `robots.txt`, and `_redirects`.
- Current canonical domain is `https://unboring.openagent.bot`.
- Legacy sections such as `/surfaces/`, `/text-effects/`, `/backgrounds/`, and `/canvas/` redirect to current pages.

## Open Source

The project uses the MIT License and is designed to welcome designers, developers, and AI builders. The goal is to help more people generate beautiful, useful, less boring interfaces with AI.

Good first contributions include:

- New component, effect, motion, or interaction entries.
- Better prompt and negative-prompt wording for existing entries.
- More diverse visual systems for the homepage canvas.
- Templates or design directions for real project types such as SaaS, education, healthcare, games, portfolios, data reports, and creative tools.
- Accessibility, responsive layout, and SEO improvements.

Do not copy source assets, code, or proprietary visual identity from Awwwards, GSAP Showcase, or other inspiration sites. Extract reusable design principles instead.

See `docs/PROJECT_BRIEF.md` for the product thesis, `AGENTS.md` for agent handoff notes, and `CONTRIBUTING.md` for contribution rules.

## License

MIT
