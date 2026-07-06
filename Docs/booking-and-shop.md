# Booking & Shop — mocks today, easy to swap

Both the booking flow and the shop are **front-end only** right now. There is no
payment/reservation backend, and — under the current Italian alcohol notice —
wine cannot be sold. Everything is architected so the real versions drop in with
minimal changes.

## Booking CTA

Every "Check Availability" / "Book" button links to `bookingHref`, defined in
`src/data/site.ts`:

```ts
// Real engine, stored for the swap:
export const contact = {
  // ...
  bookingEngine: "https://bookings.villadolcevita.eu/hotel/villa-dolce-vita",
};

// Current mock: opens WhatsApp pre-filled.
export const bookingHref = `${contact.whatsappHref}?text=${encodeURIComponent(
  "Hello Villa Dolce Vita, I'd like to check availability for a stay.",
)}`;
```

### To go live with the real booking engine

Change **one line** — point `bookingHref` at the engine:

```ts
export const bookingHref = contact.bookingEngine;
```

Every CTA across the site updates automatically because they all import
`bookingHref`. Optionally deep-link per suite by appending the engine's room
query params.

## Shop

`src/pages/shop.astro` renders a catalogue from `src/data/shop.ts`, grouped by
category. There is **no cart**. Each product has an **"Inquire"** button that
opens WhatsApp pre-filled with the product name:

```ts
const inquire = (name) =>
  contact.whatsappHref + "?text=" +
  encodeURIComponent(`Hello Villa Dolce Vita, I'd like to enquire about the "${name}".`);
```

- Priced items show a placeholder price.
- Wine / cellar items use `inquireOnly: true` → no price shown, only "Inquire"
  (respects the alcohol notice). The full notice is repeated at the bottom of
  the page.

### To go live with a real store

Options, cheapest first:

1. **Keep inquiry model** — replace WhatsApp links with a proper enquiry form /
   email, add real prices in `shop.ts`. No backend needed.
2. **Snipcart / similar** — add a snippet, turn each "Inquire" into "Add to
   cart" with `data-item-*` attributes. `shop.ts` already has `slug`, `name`,
   `price` per product.
3. **Full e-commerce (Shopify Buy Button, etc.)** — map each product's `slug`
   to a store product ID.

All three only touch `shop.ts` and the button in `shop.astro`.

## Reminder

- Prices in `shop.ts` and `packages.ts` are **placeholders / starting points** —
  confirm with ownership before launch (see `content-mapping.md`).
- No API keys or secrets are committed. When adding a real engine/store, put
  keys in Vercel **Environment Variables**, never in the repo.
