/* ==========================================================================
   suites.ts — The four suites. Copy lifted from content.md (Rooms page).
   ========================================================================== */

import { photos } from "./media";
import type { ImageMetadata } from "astro";

export interface Suite {
  slug: string;
  name: string;
  tagline: string;
  sleeps: number;
  badge?: string;
  intro: string;
  features: string[];
  image: ImageMetadata;
  imageAlt: string;
  /** Peak nightly rate for the "from" label (see packages.ts for full table). */
  fromNight: number;
}

export const suites: Suite[] = [
  {
    slug: "napoli",
    name: "Napoli Suite",
    tagline: "Panoramic Views & Timeless Comfort",
    sleeps: 6,
    intro:
      "A beautifully renovated two-bedroom retreat combining classic elegance with modern amenities, ideal for families, couples, or small groups.",
    features: [
      "A serene primary bedroom with a king-size bed (190×203 cm)",
      "A cozy second bedroom with a queen-size bed (180×200 cm)",
      "A full bathroom with marble-look tiling and heated flooring",
      "A living room with a large TV and a comfortable pull-out sofa",
      "A private outdoor patio with panoramic Tuscan countryside views",
    ],
    image: photos.terraceTableView,
    imageAlt: "Private terrace table overlooking the Tuscan valley",
    fromNight: 320,
  },
  {
    slug: "roma",
    name: "Roma Suite",
    tagline: "Honeymoon Hideaway",
    sleeps: 4,
    badge: "Honeymoon Suite",
    intro:
      "A romantic one-bedroom escape for couples seeking a honeymoon, an anniversary, or simply a peaceful getaway for two.",
    features: [
      "A king-size bed (190×203 cm) with a Juliet balcony opening onto the Tuscan trees",
      "A cozy living area with a TV and pull-out sofa",
      "A full bathroom with marble-inspired finishes and heated flooring",
      "A private patio steps from a mini plunge pool overlooking the hills",
    ],
    image: photos.terraceTableTall,
    imageAlt: "Romantic terrace with flowers and hillside view",
    fromNight: 360,
  },
  {
    slug: "capri",
    name: "Capri Suite",
    tagline: "Private Apartment with Wraparound Views",
    sleeps: 4,
    intro:
      "A private one-bedroom apartment with its own entrance, ideal for couples, solo travelers, or small families.",
    features: [
      "A king-size bed (190×203 cm)",
      "A living area with a pull-out sofa",
      "A modern bathroom with heated flooring",
      "A wraparound balcony and patio over the rolling hills",
    ],
    image: photos.hillTownValley,
    imageAlt: "Hilltown apartment with wraparound views of the valley",
    fromNight: 260,
  },
  {
    slug: "positano",
    name: "Positano Suite",
    tagline: "Cozy Tuscan Escape",
    sleeps: 4,
    intro:
      "An intimate one-bedroom hideaway for couples or small groups, simple and no less charming for it.",
    features: [
      "A queen-size bed with hillside views",
      "A pull-out couch, comfortably sleeping up to 4",
      "A full bathroom with marble-style finishes and heated flooring",
      "A cozy living space with a TV",
    ],
    image: photos.montepulciano,
    imageAlt: "Cozy Tuscan hillside town view",
    fromNight: 220,
  },
];

/** Intro paragraph for the Rooms page (from content.md). */
export const roomsIntro =
  "Discover sophisticated comfort and genuine charm, where every element has been curated for real rest. New bedding, king- and queen-size beds with adjustable pillows, and considerate extras like honey, olives, and citrus straight from the farm. A WhatsApp concierge is on hand throughout your stay, and an optional butler service is available for an added cost.";
