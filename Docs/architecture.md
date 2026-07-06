# Architecture

## Stack

| Concern | Choice | Why |
| --- | --- | --- |
| Framework | **Astro 5** (static output) | Ships zero JS by default; perfect for a mostly-static marketing site with a few interactive islands. |
| Interactive islands | **React 19** via `@astrojs/react` | Only where interactivity is needed (e.g. the testimonial carousel). |
| Animation | **GSAP 3 + ScrollTrigger** | Cinematic, reschio-style scroll: reveals, parallax, pinned crossfades. |
| Smooth scroll | **Lenis** | The buttery inertial scroll feel, wired into GSAP's ticker. |
| Styling | **Plain CSS + custom properties** | No framework; design tokens in `tokens.css`, component styles scoped in `.astro` files. |
| Fonts | **@fontsource** (Playfair Display + Inter) | Self-hosted, no external requests. |
| Images | **Astro `<Image>` + Sharp** | 3–5K source photos → responsive WebP/AVIF at build. |
| Video | **ffmpeg** (build-time script) | `.mov` sources → web `.mp4` + `.webm` + poster. |
| Hosting | **Vercel** (static) | See `deployment.md`. |

## Folder layout

```
content/                  # SOURCE material (not shipped as-is)
  content.md              # the single source of all site copy
  Images/                 # raw photos, mockups/, icons/
  videos/                 # raw .mov files
  logotipo/logo.svg
  referencia/             # brand style guide + design references

scripts/
  convert-media.mjs       # media pipeline (npm run media)

public/                   # served verbatim
  logo.svg, favicon.svg
  videos/                 # web-ready mp4/webm/poster (generated)

src/
  assets/images/          # optimized-at-build photos + mockups/ (generated copy)
  components/             # reusable .astro + .tsx pieces
  data/                   # typed content modules (the "CMS")
  layouts/BaseLayout.astro
  lib/scroll.ts           # the global scroll engine
  pages/                  # one file per route
  styles/tokens.css, global.css
```

## The data layer (`src/data/`)

Content lives in typed TS modules so pages stay presentational and copy is never
duplicated. Each maps to content.md:

| File | Feeds |
| --- | --- |
| `site.ts` | Nav, contact details, `bookingHref`, legal notices. |
| `media.ts` | Central semantic map of every photo, mockup and video. |
| `suites.ts` | The four suites (Rooms + Home). |
| `experiences.ts` | Day trips, wellness, workshops, transfers, private tours, sanctuary. |
| `dining.ts` | Menu, dinner pricing, welcome baskets, wine list. |
| `packages.ts` | Nightly rates, experience packages, wedding tiers. |
| `journal.ts` | Journal articles + teasers. |
| `shop.ts` | Boutique catalogue (built from branded mockups). |
| `testimonials.ts` | Guest reviews for the carousel. |

**Rule:** to change wording or a price, edit the `data/*.ts` file, not the page.

## How a page is built

Every page follows the same skeleton:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PageHero from "../components/PageHero.astro";
// ...import data + components
---
<BaseLayout title="..." description="...">
  <PageHero .../>
  <section class="section bg-ivory">
    <div class="wrap"> ... </div>
  </section>
</BaseLayout>
```

`BaseLayout` renders `<head>` (title/description/OG), the `Nav`, a `<main>`
slot, the `Footer`, and boots the scroll engine once.

### Reusable components

- `PageHero` — full-bleed image hero for interior pages.
- `Hero` — the taller homepage hero (video background).
- `SplitSection` — the workhorse editorial two-column block (image + copy),
  supports `reverse`, `arch`, `theme`, and parallax.
- `SectionHeader` — eyebrow + heading + gold rule.
- `Reveal` — wraps content in a `[data-reveal]` element for scroll-in.
- `ArchImage` / `BackgroundVideo` / `SuiteCard` / `FeatureBar` / `Button`.
- `TestimonialCarousel.tsx` — the one React island.

## Full-width layout system

The design is intentionally **edge-to-edge**, not boxed:

- `body { overflow-x: clip }` prevents horizontal scroll from `100vw` elements.
- `.section` → `width: 100%`, vertical padding only.
- `.wrap` → `width: 100%` + slim fluid `padding-inline: var(--gutter)`
  (`clamp(1rem, 2.5vw, 2.25rem)`).
- `.wrap--narrow` → the only width-limiter, for dense text-only blocks.

## The scroll engine (`src/lib/scroll.ts`)

`initScroll()` runs once per page and wires up declarative, attribute-driven
behaviours so components ship no bespoke JS:

| Attribute | Effect |
| --- | --- |
| `[data-reveal]` | Fade + rise in on viewport entry. |
| `[data-parallax="0.15"]` | Gentle vertical parallax (0–1 strength). |
| `[data-pin-fade]` + `[data-pin-layer]` | Pinned section whose stacked layers crossfade on scroll (the homepage "Experience" block). |

**Reduced motion** (`prefers-reduced-motion: reduce`) is honoured throughout:

- Lenis smooth-scroll is skipped; native scrolling is used.
- Reveals show instantly (no fade/translate).
- Parallax and pin-fades are disabled; pinned layers stack vertically via CSS so
  they stay readable.
- Autoplaying background videos are paused and fall back to their poster image.

In-page anchor links (e.g. `/experiences#day-trips`) are smooth-scrolled with a
`-90px` offset so headings aren't hidden under the fixed nav.

## Design tokens (`src/styles/tokens.css`)

Brand colours, type scale, spacing, timing and z-index all live as CSS custom
properties (from reference image `03.png`):

- Colours: Forest `#0F2A24`, Charcoal `#1B1E1F`, Warm Ivory `#F7F4EE`,
  Moonlit Stone `#B7B2A7`, Muted Bronze `#A8845A`, Tuscan Gold `#D2B48C`.
- Type: Playfair Display (display) + Inter (body); H1 48/56 down to Small 12/20.

Change a token once and it cascades across the whole site.
