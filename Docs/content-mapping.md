# Content mapping

All site copy is English and comes from **`content/content.md`** (the client's
final copy deck, 10-page structure). This file records where each page's content
lives and what still needs confirming.

## Page → source

| Route | Copy source | Data module |
| --- | --- | --- |
| `/` | content.md → Home | `suites`, `testimonials`, `experiences`, `journal` |
| `/about-us` | content.md → About Us (verbatim story, vision, mission) | — |
| `/rooms` | content.md → Rooms | `suites.ts` |
| `/experiences` | content.md → Experiences (5 anchored sections) | `experiences.ts` |
| `/weddings-events` | content.md → Weddings & Events (verbatim) | inline |
| `/dining` | content.md → Dining | `dining.ts` |
| `/packages` | content.md → Packages & Rates | `packages.ts` |
| `/journal` + articles | content.md → Journal | `journal.ts` |
| `/shop` | content.md intro + branded mockups | `shop.ts` |
| `/contact` | content.md → Contact Us | `site.ts` (contact + notices) |

## Legal / recurring notices

Two notices from content.md are kept in `site.ts` and shown in the Footer, on
Contact, and (alcohol) on Shop:

- **Alcohol disclaimer** — sale/consumption of alcohol temporarily prohibited
  under current Italian law. This is why wine/cellar shop items are "Inquire"
  only, with no price and no cart.
- **Animal note** — the estate is a sanctuary; animals roam freely and guests
  should be comfortable sharing the space.

## Media map (`src/data/media.ts`)

Source assets are imported once under semantic names.

### Photos (16, `src/assets/images/*.jpeg`)
Landscape scenery used for heroes, split sections and cards — e.g.
`valdorciaGolden`, `hillsPinkDawn`, `terraceTableView/Tall`, `wineCellar`,
`butteriRider/Foal`, `monteriggioni`, `montepulciano`, `romeStreetCafe`.

### Branded mockups (19, `src/assets/images/mockups/*.png`)
Verified against each source PNG and split into two groups:

**Shop products**

| Key | Source | Used for |
| --- | --- | --- |
| `wineGift` | image 8 | Gift basket, estate wine, welcome baskets (Dining) |
| `gourmet` | image 10 | Olive oil, honey, mug |
| `tableSetting` | image 2 | Table set (coasters, napkin rings) |
| `bathLinens` | image 4 | Bathrobe, spa slippers |
| `poolBathCream` | image 13 | Towel set |
| `amenitiesFull` | image 18 | Bath collection, candle |
| `amenitiesOlive` | image 9 | Soap & bath salts |
| `apparelOlive` | image 5 | Tote, cap, foulard |
| `apparelNavy` | image 14 | Polo, striped beach towel |
| `poolLounge` | image 20 | Pool & lounge set |
| `menuReserved` | image 12 | Dining menu detail |

**Branding / signage (not shop products)**

`welcomeLetter` (image 6 → About/Rooms), `stationery` (7), and `branding11/15/16/17/19`.

### Videos (14, `public/videos/`)
Referenced by URL via `videoSources(key)`. Currently used:
`cypressRoadDrive` (home hero), `nightSky` (pinned Experience),
`aerialTownGolden` (final CTA). The rest are available for future sections.
See `media-pipeline.md`.

## ⚠️ To confirm with ownership before launch

These figures are starting points from content.md, flagged in the deck itself:

- **Nightly rates** and **experience package prices** (`packages.ts`).
- **Wedding maximum capacities** (ceremony vs reception) — content.md notes to
  confirm separately.
- **Shop prices** — placeholders. Wine is intentionally "Inquire" (see alcohol
  notice).
- **Transfer / private-tour prices** (`experiences.ts`) — from content.md.
- Real guest reviews reused from the live site are attributed in
  `testimonials.ts`.
