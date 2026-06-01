# Contributing

UnBoring welcomes design methods, motion ideas, interaction patterns, and implementation notes that help AI-generated interfaces feel less generic.

## Good Contributions

- A reusable design method, not a copied website.
- A clear use case: when to use it and when to avoid it.
- A prompt and negative prompt that an AI agent can copy.
- Tokens, CSS, or small HTML/CSS/JS snippets that can run statically.
- Accessibility and performance notes when relevant.
- Creative recipes that connect project type, visual principles, motion principles, prompts, Avoid guidance, and token hints.
- Motion preview cards for the homepage canvas when they are small samplers that link back to the canonical `/motion/` or related detail page.

## Content Rules

- Do not copy proprietary layouts, source code, or visual assets from Awwwards, GSAP Showcase, or other inspiration sites.
- Abstract the design method instead: rhythm, hierarchy, motion language, interaction model, and constraints.
- Keep examples framework-neutral unless a component explicitly maps to a known primitive.
- Keep homepage motion preview cards lightweight. The canvas should show the feeling of the motion; full usage notes belong in `/motion/`.

## Local Checks

```bash
npm run build
npm run dev
```

Before submitting a change, check:

- Homepage loads without console errors.
- Surprise me changes the active design direction, prompt, CSS tokens, Agent JSON, and Avoid guidance.
- `/components/`, `/effects/`, and at least one detail page load without console errors.
- No horizontal overflow on desktop or mobile.
- Generated `sitemap.xml` and `_redirects` still look correct.

## Suggested PR Shape

- Explain the design idea in plain language.
- Include screenshots or a short recording for visual changes.
- Mention which pages were checked.
- Keep unrelated refactors out of the PR.
