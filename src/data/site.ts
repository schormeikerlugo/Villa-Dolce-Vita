/* ==========================================================================
   site.ts — Global site metadata, navigation and contact details.
   Single source of truth for anything that appears in more than one place.
   ========================================================================== */

export const site = {
  name: "Villa Dolce Vita",
  tagline: "Under the Tuscan Stars",
  location: "Massa Marittima, Tuscany",
  description:
    "A private hilltop estate fifteen minutes from Massa Marittima, Tuscany — five suites, a working animal sanctuary, wellness, and views to Elba and Corsica.",
  url: "https://villadolcevita.eu",
} as const;

export const contact = {
  whatsapp: "+39 331 633 1248",
  whatsappHref: "https://wa.me/393316331248",
  email: "niccolo@villadolcevita.eu",
  address: "Podere Seccatoi, 56, 58024 Massa Marittima GR, Italy",
  instagram: "https://instagram.com/villadolcevita.eu",
  instagramHandle: "@villadolcevita.eu",
  // Real booking engine — swap the mock CTA to this when ready (see Docs).
  bookingEngine: "https://bookings.villadolcevita.eu/hotel/villa-dolce-vita",
} as const;

/** The "Check Availability" CTA target. Currently a WhatsApp mock. */
export const bookingHref = `${contact.whatsappHref}?text=${encodeURIComponent(
  "Hello Villa Dolce Vita, I'd like to check availability for a stay.",
)}`;

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Rooms", href: "/rooms" },
  { label: "Experiences", href: "/experiences" },
  { label: "Weddings & Events", href: "/weddings-events" },
  { label: "Dining", href: "/dining" },
  { label: "Packages & Rates", href: "/packages" },
  { label: "Journal", href: "/journal" },
  { label: "Shop", href: "/shop" },
  { label: "Contact Us", href: "/contact" },
];

/** Legal / recurring footer notices (identical wording to content.md). */
export const notices = {
  alcohol:
    "Due to current Italian law, the sale and consumption of alcohol is temporarily prohibited. We are complying fully with this regulation until further notice. Thank you for your understanding.",
  animals:
    "Our villa is also a sanctuary for rescued animals who roam freely across the property. They add to the charm and tranquility of the Tuscan countryside, and many guests find their presence a joyful part of the stay. If you choose to stay with us, we kindly ask that you're comfortable sharing the space with these gentle animals.",
} as const;
