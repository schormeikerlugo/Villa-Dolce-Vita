# Deployment (GitHub → Vercel)

The site is a **static Astro build** (`output: static`). It deploys to Vercel
with zero server config. `vercel.json` is already in the repo.

## What's already configured

`vercel.json`:

```json
{
  "framework": "astro",
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "cleanUrls": true,
  "trailingSlash": false
}
```

- `cleanUrls` → `/about-us` instead of `/about-us.html`.
- `trailingSlash: false` → matches the internal links and nav.

## Step 1 — Push to GitHub

From the project root:

```bash
git init
git add .
git commit -m "Villa Dolce Vita website"
git branch -M main
git remote add origin https://github.com/<you>/villa-dolce-vita.git
git push -u origin main
```

> `.gitignore` already excludes `node_modules/`, `dist/`, and `.astro/`.
> The generated `public/videos/*` **are** committed (they're the shippable
> assets); the large raw `content/videos/*.mov` can stay out if you prefer —
> they're only needed to re-run `npm run media`.

## Step 2 — Connect Vercel

1. Go to vercel.com → **Add New… → Project**.
2. Import the GitHub repo.
3. Vercel auto-detects Astro. Confirm:
   - Build Command: `astro build`
   - Output Directory: `dist`
   - Install Command: `npm install`
4. **Deploy.** First build takes a couple of minutes (Sharp optimizes images).

Every push to `main` now redeploys automatically; pull requests get preview URLs.

## Step 3 — Custom domain

1. Vercel project → **Settings → Domains** → add `villadolcevita.eu`
   (and `www.villadolcevita.eu`).
2. Point DNS at Vercel (A record / CNAME as Vercel instructs at your registrar).
3. Update `site` in `astro.config.mjs` if the final domain differs (already set
   to `https://villadolcevita.eu`).

## Build locally before pushing (recommended)

```bash
npm run build && npm run preview
```

If `npm run build` passes locally, the Vercel build will too.

## Notes

- **Environment variables:** none required today. When adding a real booking
  engine or store, add keys under Vercel → Settings → Environment Variables.
- **Node version:** Vercel uses a recent LTS by default, which is fine. Pin it in
  Project Settings if you need to.
- **ffmpeg is not needed on Vercel** — videos are pre-generated and committed;
  the pipeline only runs locally via `npm run media`.
