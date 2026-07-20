/* ==========================================================================
   journal.ts — Journal articles. Full body copy from content.md so each post
   renders as a real page. `journalTeasers` powers the homepage + index cards.
   ========================================================================== */

import { photos } from "./media";
import type { ImageMetadata } from "astro";

export interface JournalArticle {
  slug: string;
  title: string;
  category: "Things To Do" | "Restaurant Spotlight" | "Estate Diary" | "Wine & Vineyards";
  excerpt: string;
  /** Body paragraphs, in order. */
  body: string[];
  image: ImageMetadata;
  imageAlt: string;
}

export const journal: JournalArticle[] = [
  {
    slug: "lago-dell-accesa",
    title: "10 Things to Do in Tuscany",
    category: "Things To Do",
    excerpt:
      "Ten minutes from the villa there's a lake called Lago dell'Accesa — turquoise, spring-fed, and cold enough to make you gasp the first time you get in.",
    image: photos.valdorciaMist,
    imageAlt: "Misty Tuscan hills at dawn near Lago dell'Accesa",
    body: [
      "Every guidebook wants to send you to the coast for a swim. Skip it. Ten minutes from the villa there's a lake called Lago dell'Accesa, turquoise, spring-fed, and cold enough to make you gasp the first time you get in, which is exactly the point.",
      "It used to be mined. Etruscans worked this ground for copper long before anyone thought to swim in it, and there's a small archaeological park at the edge of the water if you want the history along with your tan. Most people don't bother. Most people just walk out onto one of the wooden platforms, jump in, and lie there afterward not thinking about anything in particular.",
      "There's no beach club. No music. A gravel parking area a couple hundred meters back, some shade if you find the right tree, and water so clear you can watch your own feet disappear into it. Bring your own towel. Bring your own snacks. This is not a place that's going to sell you a fourteen-euro spritz, and that's precisely why it's worth the drive.",
      "Go before ten in the morning if you want the water to yourself. After that, you'll be sharing it with everyone else who eventually figures this place out.",
    ],
  },
  {
    slug: "la-tana-dei-brilli",
    title: "Best Restaurants in Follonica",
    category: "Restaurant Spotlight",
    excerpt:
      "La Tana dei Brilli seats maybe twelve people, total. It calls itself the smallest osteria in Italy. Nobody has seriously challenged the claim.",
    image: photos.romeStreetCafe,
    imageAlt: "A small osteria table in a narrow medieval alley",
    body: [
      "La Tana dei Brilli seats maybe twelve people, total, and that's being generous about the outdoor tables crammed into the alley next to it. It calls itself the smallest osteria in Italy. Nobody has seriously challenged the claim.",
      "The menu is short because the kitchen is smaller than the menu would need to be to justify a long one. Pappardelle with wild boar. Tortelli stuffed with whatever the region felt like producing that week. A wine list that leans hard into Maremma without apologizing for skipping the famous stuff. You will wait. You will probably wait outside, in the alley, next to whoever is already eating.",
      "None of this is a design choice meant to feel exclusive. It's just a small restaurant in a medieval town that was built before anyone anticipated crowds. The food is better than the wait deserves, which is really all you can ask of a place like this.",
      "Fifteen minutes from the villa. Book ahead if you're capable of that kind of planning. If not, show up anyway and take your chances in the alley.",
    ],
  },
  {
    slug: "capri-and-santo",
    title: "Our Favorite Cafe in Massa Marittima",
    category: "Estate Diary",
    excerpt:
      "Every villa has a mascot. Villa Dolce Vita has two, and neither of them signed up for the job.",
    image: photos.butteriFoal,
    imageAlt: "A rescued animal roaming the estate grounds",
    body: [
      "Every villa has a mascot. Villa Dolce Vita has two, and neither of them signed up for the job.",
      "Capri and Santo are the resident dogs, part of a small rescue operation that shares the property with paying guests, olive groves, and a fairly involved wine list. They did not choose to be Instagram-famous. It happened anyway. Ask anyone who has stayed here in the last two years what they remember most, and there's a real chance the answer is not the pool.",
      "Most of the animals came from somewhere harder than this. A stray population is not unusual in rural Tuscany, and not every farmhouse decides to do something about it. This one did, and the result is a property where cats sunbathe on the terrace stones and dogs consider every guest a personal responsibility.",
      "Nobody is forcing an interaction. The pool chairs work fine without a dog lying under them. But by the second day, most guests have stopped asking whether the animals are friendly and started asking whether they can bring one home.",
      "The answer to that, for the record, is no. Everyone asks. The answer stays no.",
    ],
  },
  {
    slug: "best-tuscan-vineyards",
    title: "5 Best Tuscan Vineyards",
    category: "Wine & Vineyards",
    excerpt:
      "From Montalcino's Brunello to the coastal Super Tuscans of Bolgheri, five estates within an easy drive of the villa that are worth the detour and the tasting.",
    image: photos.cypressRoad,
    imageAlt: "A cypress-lined road winding through Tuscan vineyard country",
    body: [
      "Tuscany doesn't have a shortage of vineyards. It has the opposite problem. Every hillside within an hour of the villa seems to grow something worth bottling, and deciding where to spend an afternoon is harder than it sounds. These are the five we send guests to first.",
      "Start with Montalcino if you only have one day. Brunello is the region's serious wine, aged long and priced accordingly, and the drive up to the town alone is worth the trip. Book a tasting at one of the smaller family estates rather than the big names — the pours are more generous and the conversation is better.",
      "Closer to the coast, Bolgheri makes the Super Tuscans that put the region on the international map. The cypress-lined avenue into town is the one from the postcards. The wines are bold, cabernet-driven, and nothing like the Sangiovese you'll taste inland.",
      "For something quieter, the small producers around Massa Marittima and the Maremma pour Vermentino and Ciliegiolo that rarely leave the region. No crowds, no tasting-room theatre, just a farmer, a few bottles, and a view. Ask us and we'll make the call for you.",
    ],
  },
];

/** Teasers for homepage + journal index (same objects, thinner surface). */
export const journalTeasers = journal.map(
  ({ slug, title, category, image, imageAlt, excerpt }) => ({
    slug,
    title,
    category,
    image,
    imageAlt,
    excerpt,
  }),
);

export const journalIntro =
  "A running local guide, not a press release: things to do nearby, restaurant spotlights, and life at the estate. Updated as often as there's something worth writing about.";
