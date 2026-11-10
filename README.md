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
