# Trends — clickable prototype

Static front-end prototype of a Pakistan COD dropshipping platform. Demo data only.

## Rename the brand

Edit **one file**: [`brand.config.js`](./brand.config.js)

Change:

- `name` — product name in copy
- `logoText` — header / mark text
- `tagline` / `shortTagline`
- `colors` — injected as CSS variables (`--color-primary`, `--color-accent`, and the rest)

Every page loads this script first. You should not need to hunt through HTML for the old name, except a few demo fixture names (people, stores) in `js/data.js`.

## Run locally

```bash
npx --yes serve -l 4173
# or: python3 -m http.server 4173
```

Open http://localhost:4173

OTP accepts any 6 digits. Buttons show toasts instead of calling a backend.

## Deploy

The included `Dockerfile` serves the site with nginx on Railway’s `$PORT`.

## New in this version

- `supplier/ai-listing.html` — **Create listing with AI** (simulated). One product or many (folder / CSV / WhatsApp catalog). Deep links: `#demo`, `#review`, `#bulk`, `#bulk-review`.
- `apply.html` — early-access application + waitlist (80 supplier / 120 store-owner founding spots). Applicants first pick **Supplier (Wholesaler) — I have stock** or **Store owner (Reseller) — I sell online** (or both). A 2-question helper and a supplier stock check stop people picking the wrong side. Configure `js/apply.config.js` → `FORM_ENDPOINT`. Setup guide: [`docs/google-sheet-setup.md`](./docs/google-sheet-setup.md). Preview the waitlist state with `apply.html?full=1`.
- Simpler supplier and reseller home screens: 4 big actions, get-started checklist, bottom tab bar on phones, small Urdu hints.
- Shared product categories in [`js/categories.js`](./js/categories.js), used on the apply form, home grid, catalog filters, AI listing builder and supplier listings. Applying is free until the platform goes live for business in the coming weeks.

