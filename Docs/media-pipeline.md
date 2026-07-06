# Media pipeline

Raw assets in `content/` are **not** web-ready. `scripts/convert-media.mjs`
(run with `npm run media`) turns them into optimized, shippable files. It is
idempotent — it skips anything already generated.

## Requirements

- **ffmpeg** on your PATH (`ffmpeg -version` to check).
- Node 18+ (uses `node:` built-ins only, no extra deps).

## What it does

### Videos: `content/videos/*.mov` → `public/videos/`
For each source it produces three files:

- `<name>.mp4` — H.264, scaled to max **1280px** wide, muted, `+faststart`.
- `<name>.webm` — VP9, same scale, muted.
- `<name>-poster.jpg` — a still frame (used as the video poster / reduced-motion fallback).

Background loops are **trimmed to the first `TRIM_SECONDS` (15s)** and encoded
at a higher CRF (mp4 28 / webm 40). Motion plus the overlay scrims hide the
compression, and the trim keeps the page light.

> **Result:** the video folder dropped from **248 MB → ~51 MB** with no visible
> quality loss in-context.

### Photos: `content/Images/*.jpeg` → `src/assets/images/`
Simply **copied** here. Astro's `<Image>` + Sharp then generate responsive
WebP/AVIF at build time (5 MB source → ~70 KB delivered).

### Mockups: `content/Images/mockups/*.png` → `src/assets/images/mockups/`
Copied likewise for `<Image>` optimization.

## Re-running / forcing a rebuild

The script skips a video if its `.mp4` already exists. To regenerate videos
(e.g. after changing encoding settings), delete the outputs first:

```bash
rm -f public/videos/*.mp4 public/videos/*.webm public/videos/*-poster.jpg
npm run media
```

Photos/mockups are skipped if already present in `src/assets/images/`; delete
the copy to refresh it.

## Tuning knobs (top of `convert-media.mjs`)

- `TRIM_SECONDS` — length of each background loop.
- The `scale='min(1280,iw)':-2` filter — max output width.
- CRF values on the `libx264` / `libvpx-vp9` calls — quality vs size.

## Gotchas learned

- zsh throws `no matches found` on unquoted globs — the script uses `readdir`,
  not shell globbing, to avoid this.
- ffmpeg's `tile` filter is unreliable with mismatched frame sizes; we take a
  single poster frame instead.
