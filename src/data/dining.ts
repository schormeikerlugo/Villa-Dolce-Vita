/* ==========================================================================
   dining.ts — Dining page: menu, dinner pricing, welcome baskets, wine list.
   All from content.md (Dining page). The wine list is grouped by type/origin.
   ========================================================================== */

export const diningIntro =
  "Enjoy your stay with wonderful, considered meals, including our 38-month aged parmigiano reggiano, where spaghetti is tossed inside a flaming wheel of cheese. Available Sundays, Tuesdays, and Thursdays.";

export const dinner = {
  note: "Private dinners are available upon request and must be pre-booked, with a minimum of 4 people. Contact us for details.",
  mains: ["Sausages or steak on the BBQ"],
  pasta: [
    "Choice of spaghetti, pici, or pappardelle, with meat sauce, wild boar sauce, or red tomato sauce",
    "Mixed salad",
  ],
  dessert: "Tiramisu, limoncello, and coffee (included).",
  prices: [
    { label: "Children under 12", price: "€50 per person" },
    { label: "Adults", price: "€80 per person" },
  ],
  wineNote:
    "Wine is priced separately and can be ordered ahead or on the night. Guests may dine outside.",
};

export interface Basket {
  name: string;
  subtitle: string;
  price: string;
  items: string[];
  featured?: boolean;
}

export const baskets: Basket[] = [
  {
    name: 'Cesta "Classic"',
    subtitle: "Tuscan Flavors",
    price: "€50",
    items: [
      '1 bottle of red Bolgheri wine, "Borgeri 2023," Giorgio Meletti Cavallari',
      "1 bottle of selected white wine",
      "1 artisan salami",
      "1 slice of Pecorino cheese with honey",
      "1 jar of Tuscan olives",
      "1 loaf of Tuscan bread",
      "Italian cookies",
    ],
  },
  {
    name: 'Cesta "Luxury"',
    subtitle: "Italian Excellence",
    price: "€350",
    featured: true,
    items: [
      '2 bottles of Amarone Classico "Masi Riserva Costera" 2018',
      "1 artisan salami",
      "A slice of Pecorino cheese with honey",
      "1 loaf of Tuscan bread",
      "1 jar of Tuscan olives",
      "1 jar of fig jam",
      "Italian cookies",
    ],
  },
];

export const wineIntro =
  "A curated collection of wines from the world's most renowned vineyards, from the velvety depths of an aged Barolo to the crisp elegance of a Chardonnay. At Villa Dolce Vita, every bottle is more than a drink. Uncork, explore, and enjoy.";

/** Wine list grouped by category, then origin. Condensed highlights from
 *  content.md's full cellar list (kept representative, not exhaustive UI-wise,
 *  but the full data is preserved here for completeness). */
export interface WineGroup {
  category: string;
  origins: { origin: string; wines: string[] }[];
}

export const wineList: WineGroup[] = [
  {
    category: "Red Wine",
    origins: [
      {
        origin: "Italy",
        wines: [
          "Barolo Barbaresco (1967)",
          "Masi Riserva Costasera Amarone Classico (2016)",
          "Barolo Riserva (1958)",
          "Isole e Olena Chianti Classico (2002)",
          "Barbaresco (1979)",
          "Stravecchio Melini Chianti Classico (1961)",
          "Nozzole Chianti Classico (1979)",
          "Verrazzano Chianti Classico (1973)",
          "Valpolicella Ripasso Superiore Valdimezzo (2021)",
          "Aglianico del Vulture (1966)",
        ],
      },
      {
        origin: "France",
        wines: [
          "Veuve Clicquot Marc de Champagne",
          "Château Peller (1972)",
          "Château Lyonnat (1970)",
        ],
      },
      { origin: "Spain", wines: ["Tio Pepe Very Dry Sherry (non-vintage)"] },
    ],
  },
  {
    category: "White Wine",
    origins: [
      {
        origin: "Italy",
        wines: [
          "Vino Bianco Vigna Nuova (1973)",
          "Est! Est!! Est!!! di Montefiascone (1988)",
          "Soave Classico Riserva Clivus (1967)",
        ],
      },
    ],
  },
  {
    category: "Sparkling",
    origins: [
      {
        origin: "Italy",
        wines: [
          "Ferrari Demi-Sec (non-vintage)",
          "Franciacorta Brut",
          "Martini Asti Edizione Millennio (non-vintage)",
          "Terra Serena Valdobbiadene Prosecco Superiore Magnum",
        ],
      },
    ],
  },
  {
    category: "Brandy & Spirits",
    origins: [
      {
        origin: "Italy",
        wines: [
          "Grappa Alto Adige Vecchia Grappa",
          "Vecchia Romagna Etichetta Oro",
          "La Grappa di Casa Attems",
        ],
      },
      {
        origin: "France",
        wines: [
          "Bénédictine D.O.M.",
          "Courvoisier Trois Étoiles Luxe Cognac (1960s–1970s)",
          "Cointreau Liqueur Extra Dry",
        ],
      },
    ],
  },
];
