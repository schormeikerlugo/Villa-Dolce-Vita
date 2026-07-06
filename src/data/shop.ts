/* ==========================================================================
   shop.ts — The estate boutique.
   --------------------------------------------------------------------------
   content.md keeps the Shop deliberately light ("a small selection of wines,
   art and sculpture, and gift baskets … available to take home or ship") and
   flags it for a dedicated product/photography pass. We have real, verified
   Villa Dolce Vita branded mockups, so we build a tasteful catalogue around
   them: honest placeholder prices, and an "Inquire" CTA rather than a live
   cart (there is no payment backend, and — per the alcohol notice — wine
   cannot currently be sold). Swapping to a real store later only touches this
   file plus the Shop page CTA. See Docs/booking-and-shop.md.
   ========================================================================== */

import { mockups } from "./media";
import type { ImageMetadata } from "astro";

/** Intro copy — lifted verbatim from content.md (Shop page). */
export const shopIntro =
  "A small selection of wines, art and sculpture, and gift baskets from the estate, available to take home or ship.";

/** Shown near the CTAs so expectations are clear while there is no cart. */
export const shopNote =
  "Every piece is made in small batches on the estate. Tell us what you love and we'll arrange purchase, gift wrapping, and shipping personally.";

export type ShopCategory =
  | "Cellar & Gifts"
  | "Table"
  | "Home & Bath"
  | "Bath Amenities"
  | "Apparel & Accessories"
  | "Poolside";

export interface Product {
  slug: string;
  name: string;
  category: ShopCategory;
  /** One-line description for the card. */
  blurb: string;
  /** Placeholder price. Wine uses `inquireOnly` instead of a shown price. */
  price?: string;
  /** When true, hide the price and only offer "Inquire" (e.g. wine). */
  inquireOnly?: boolean;
  badge?: string;
  image: ImageMetadata;
  imageAlt: string;
}

export const categories: ShopCategory[] = [
  "Cellar & Gifts",
  "Table",
  "Home & Bath",
  "Bath Amenities",
  "Apparel & Accessories",
  "Poolside",
];

export const products: Product[] = [
  /* ---- Cellar & Gifts ---- */
  {
    slug: "under-the-tuscan-stars-gift-basket",
    name: "Under the Tuscan Stars Gift Basket",
    category: "Cellar & Gifts",
    blurb:
      "Our signature hamper — estate red, hand-wrapped treats, tasting notes, corkscrew and coaster in a keepsake box.",
    inquireOnly: true,
    badge: "Signature",
    image: mockups.wineGift,
    imageAlt:
      "Villa Dolce Vita gift basket with a bottle of estate wine, tasting-notes card and corkscrew",
  },
  {
    slug: "estate-red-under-the-tuscan-stars",
    name: "Estate Red — \u201CUnder the Tuscan Stars\u201D",
    category: "Cellar & Gifts",
    blurb:
      "Ripe red berries, black cherry, warm spice and a velvety finish. Grown, pressed and bottled on the hill.",
    inquireOnly: true,
    image: mockups.wineGift,
    imageAlt: "Bottle of Villa Dolce Vita estate red wine with olive branch",
  },

  /* ---- Table (gourmet + tableware) ---- */
  {
    slug: "extra-virgin-olive-oil",
    name: "Extra Virgin Olive Oil — 500 ml",
    category: "Table",
    blurb:
      "First cold-press from our own groves, in a wax-sealed bottle with hand-tied tag.",
    price: "\u20AC24",
    badge: "Estate Grown",
    image: mockups.gourmet,
    imageAlt: "Villa Dolce Vita extra virgin olive oil bottle beside honey jar",
  },
  {
    slug: "wildflower-honey",
    name: "Wildflower Honey",
    category: "Table",
    blurb: "Raw honey from the estate's own hives, gathered across the meadows.",
    price: "\u20AC16",
    image: mockups.gourmet,
    imageAlt: "Jar of Villa Dolce Vita wildflower honey with olive branch",
  },
  {
    slug: "tuscan-table-set",
    name: "Tuscan Table Set",
    category: "Table",
    blurb:
      "Olive-green stone coasters, linen napkins and napkin rings — the estate table, at yours.",
    price: "\u20AC58",
    image: mockups.tableSetting,
    imageAlt:
      "Villa Dolce Vita branded coaster, napkin ring and place setting on a linen table",
  },
  {
    slug: "stoneware-mug",
    name: "Speckled Stoneware Mug",
    category: "Table",
    blurb: "Hand-thrown, monogrammed stoneware for slow Tuscan mornings.",
    price: "\u20AC22",
    image: mockups.gourmet,
    imageAlt: "Speckled Villa Dolce Vita stoneware mug on a stone ledge",
  },

  /* ---- Home & Bath ---- */
  {
    slug: "cotton-bathrobe",
    name: "Estate Cotton Bathrobe",
    category: "Home & Bath",
    blurb:
      "The same plush, monogrammed robe you'll reach for in the suites, in its own drawstring bag.",
    price: "\u20AC120",
    image: mockups.bathLinens,
    imageAlt: "Cream Villa Dolce Vita bathrobe on a hanger with towels and slippers",
  },
  {
    slug: "towel-set",
    name: "Olive-Embroidered Towel Set",
    category: "Home & Bath",
    blurb: "Two bath sheets in soft ivory, embroidered with the olive-branch mark.",
    price: "\u20AC74",
    image: mockups.poolBathCream,
    imageAlt: "Stack of ivory Villa Dolce Vita towels beside a drawstring bag by the pool",
  },
  {
    slug: "spa-slippers",
    name: "Terry Spa Slippers",
    category: "Home & Bath",
    blurb: "Monogrammed, cushioned slippers for padding across cool stone floors.",
    price: "\u20AC28",
    image: mockups.bathLinens,
    imageAlt: "Pair of Villa Dolce Vita monogrammed terry slippers",
  },

  /* ---- Bath Amenities ---- */
  {
    slug: "bath-collection",
    name: "Bath Collection",
    category: "Bath Amenities",
    blurb:
      "Shampoo, conditioner and body lotion in olive-scented 300 ml bottles.",
    price: "\u20AC48",
    image: mockups.amenitiesFull,
    imageAlt:
      "Villa Dolce Vita shampoo, conditioner and body lotion bottles on a stone ledge",
  },
  {
    slug: "scented-candle",
    name: "Scented Candle",
    category: "Bath Amenities",
    blurb: "Cypress, olive leaf and warm fig — the estate at dusk, boxed.",
    price: "\u20AC38",
    image: mockups.amenitiesFull,
    imageAlt: "Villa Dolce Vita scented candle in a boxed set",
  },
  {
    slug: "olive-soap-bath-salts",
    name: "Olive Soap & Bath Salts",
    category: "Bath Amenities",
    blurb: "Triple-milled olive-oil soap paired with mineral bath salts.",
    price: "\u20AC26",
    image: mockups.amenitiesOlive,
    imageAlt: "Villa Dolce Vita olive soap bar and dish of bath salts",
  },

  /* ---- Apparel & Accessories ---- */
  {
    slug: "canvas-tote",
    name: "Canvas Market Tote",
    category: "Apparel & Accessories",
    blurb: "Sturdy natural canvas with the estate crest — built for the market.",
    price: "\u20AC34",
    image: mockups.apparelOlive,
    imageAlt: "Natural canvas Villa Dolce Vita tote bag with cap and polo",
  },
  {
    slug: "olive-cap",
    name: "Olive Twill Cap",
    category: "Apparel & Accessories",
    blurb: "Washed olive-green cap with the embroidered VDV monogram.",
    price: "\u20AC26",
    image: mockups.apparelOlive,
    imageAlt: "Olive-green Villa Dolce Vita embroidered cap",
  },
  {
    slug: "cotton-polo",
    name: "Cotton Piqué Polo",
    category: "Apparel & Accessories",
    blurb: "Soft cotton polo in olive or navy, monogrammed at the chest.",
    price: "\u20AC58",
    image: mockups.apparelNavy,
    imageAlt: "Navy Villa Dolce Vita polo shirt with cap and tote",
  },
  {
    slug: "wool-foulard",
    name: "Fringed Wool Foulard",
    category: "Apparel & Accessories",
    blurb: "A featherweight ivory scarf with hand-knotted fringe.",
    price: "\u20AC46",
    image: mockups.apparelOlive,
    imageAlt: "Ivory fringed Villa Dolce Vita foulard scarf",
  },

  /* ---- Poolside ---- */
  {
    slug: "pool-lounge-set",
    name: "Pool & Lounge Set",
    category: "Poolside",
    blurb:
      "Pool towel, velvet cushion, sun cap and a marble serving tray for long afternoons.",
    price: "\u20AC96",
    badge: "Summer",
    image: mockups.poolLounge,
    imageAlt:
      "Villa Dolce Vita pool towel, cushion, cap and marble tray by the pool",
  },
  {
    slug: "striped-beach-towel",
    name: "Striped Beach Towel",
    category: "Poolside",
    blurb: "Fringed cotton in navy stripe, sized for the loungers.",
    price: "\u20AC42",
    image: mockups.apparelNavy,
    imageAlt: "Navy-striped fringed Villa Dolce Vita beach towel",
  },
];

/** Group products by category for the page's section-by-section layout. */
export function productsByCategory() {
  return categories.map((category) => ({
    category,
    items: products.filter((p) => p.category === category),
  }));
}
