# Villa Dolce Vita — Documentation

The website for Villa Dolce Vita, a private hilltop estate near Massa Marittima,
Tuscany. Built with **Astro 5 + React islands**, cinematic scroll (GSAP +
ScrollTrigger + Lenis), and a full-width, edge-to-edge editorial layout.

## Docs index

| File | What's inside |
| --- | --- |
| [`architecture.md`](./architecture.md) | Tech stack, folder layout, how a page is built, the scroll engine, design tokens. |
| [`content-mapping.md`](./content-mapping.md) | Where every page's copy comes from, the photo/video/mockup map, and things to confirm with ownership. |
| [`media-pipeline.md`](./media-pipeline.md) | How photos and videos are optimized (`npm run media`), and how to re-run it. |
| [`booking-and-shop.md`](./booking-and-shop.md) | The booking CTA (currently a WhatsApp mock) and the Shop (no live cart). How to swap in the real ones later. |
| [`deployment.md`](./deployment.md) | Step-by-step: push to GitHub, connect Vercel, custom domain. |

## Quick start

```bash
npm install          # install dependencies
npm run media        # one-time: optimize videos + copy photos (needs ffmpeg)
npm run dev          # local dev at http://localhost:4321
npm run build        # production build into dist/
npm run preview      # preview the production build locally
```

## The 10 pages (13 routes)

`/` · `/about-us` · `/rooms` · `/experiences` · `/weddings-events` · `/dining` ·
`/packages` · `/journal` (+ 3 articles at `/journal/[slug]`) · `/shop` · `/contact`

## Key conventions

- **Site copy is English** (from `content/content.md`). All UI text lives either
  in a page or in a `src/data/*.ts` file — never hard-coded twice.
- **Full-width layout.** `.section` spans `100%`; only `.wrap` adds slim fluid
  gutters. See `architecture.md`.
- **Reduced motion is respected** everywhere (see the scroll engine section).
- **No secrets in the repo.** The booking + shop are front-end mocks today.
