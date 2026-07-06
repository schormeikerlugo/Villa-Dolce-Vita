/* ==========================================================================
   packages.ts — Nightly rates, experience packages and wedding tiers.
   From content.md (Packages & Rates). NOTE: rates are starting points to be
   confirmed with ownership (see Docs/content-mapping).
   ========================================================================== */

export const packagesIntro =
  "Villa Dolce Vita experiences, bundled, with a clear price attached instead of a menu of add-ons to assemble yourself.";

export interface RateRow {
  suite: string;
  low: string;
  shoulder: string;
  peak: string;
}

export const rateColumns = {
  low: "Low season (Nov–Mar)",
  shoulder: "Shoulder (Apr–May, Oct)",
  peak: "Peak (Jun–Sep)",
};

export const rates: RateRow[] = [
  { suite: "Positano Suite (sleeps 4)", low: "€220", shoulder: "€290", peak: "€360" },
  { suite: "Milano Suite (sleeps 2)", low: "€240", shoulder: "€310", peak: "€390" },
  { suite: "Capri Suite (sleeps 4)", low: "€260", shoulder: "€340", peak: "€420" },
  { suite: "Napoli Suite (sleeps 6)", low: "€320", shoulder: "€410", peak: "€510" },
  {
    suite: "Roma Suite — honeymoon, private plunge pool (sleeps 4)",
    low: "€360",
    shoulder: "€460",
    peak: "€580",
  },
];

export interface Package {
  name: string;
  italian: string;
  nights: string;
  includes: string[];
  price: string;
}

export const packages: Package[] = [
  {
    name: "Rest & Reset",
    italian: "Dolce Far Niente",
    nights: "3 nights",
    includes: [
      "3 nights in the Positano or Capri Suite",
      "Classic welcome basket",
      "Unlimited wellness area access",
      "One private sunset dinner for two",
    ],
    price: "From €1,050 per couple (low) to €1,450 (peak)",
  },
  {
    name: "Wine & Vineyard",
    italian: "La Vendemmia",
    nights: "4 nights",
    includes: [
      "4 nights in the Napoli or Capri Suite",
      "Private tastings at two estate wineries",
      "Wine-pairing dinner at the villa",
      "Luxury gift basket on arrival",
    ],
    price: "From €1,950 per couple (low) to €2,600 (peak)",
  },
  {
    name: "Horseback & Active",
    italian: "In Sella",
    nights: "3 nights",
    includes: [
      "3 nights in any suite",
      "Half-day horseback ride through olive groves and vineyards",
      "Guided mountain-bike day on the Massa Marittima trail network",
      "One private dinner",
    ],
    price: "From €1,150 per couple",
  },
  {
    name: "Honeymoon",
    italian: "Luna di Miele",
    nights: "5 nights",
    includes: [
      "5 nights in the Roma Suite",
      "Prosecco welcome and luxury gift basket",
      "Private dinner with a view on the secluded marble terrace",
      "One full-day private tour",
    ],
    price: "From €4,200 per couple",
  },
  {
    name: "Cooking Retreat",
    italian: "Cucina Toscana",
    nights: "3 nights, per person",
    includes: [
      "3 nights' accommodation",
      "Daily hands-on cooking class",
      "Wine pairing with each class",
      "One market or winery visit",
    ],
    price: "From €1,800 per person",
  },
];

export interface WeddingTier {
  tier: string;
  guests: string;
  includes: string;
}

export const weddingTiers: WeddingTier[] = [
  {
    tier: "Essenziale",
    guests: "Up to 50",
    includes:
      "Hilltop ceremony, reception under string lights, house wine, estate-cooked menu",
  },
  {
    tier: "Signature",
    guests: "Up to 75",
    includes:
      "Essenziale plus welcome cocktail hour timed to sunset, upgraded wine list, live music",
  },
  {
    tier: "Grand",
    guests: "Up to 100",
    includes:
      "Signature plus multi-course dinner, premium wine pairing, extended reception hours",
  },
];

export const weddingTiersNote =
  "Wedding tiers are shown without fixed per-guest totals since catering and beverage choices vary widely. Request a quote for pricing tailored to your celebration.";
