/* ==========================================================================
   convert-media.mjs
   --------------------------------------------------------------------------
   One-time (re-runnable) media pipeline. Raw assets live in /content and are
   NOT web-ready:
     - .mov videos don't play reliably in browsers  -> convert to .mp4 + .webm
       and extract a poster .jpg (first good frame).
     - .jpeg photos are 3-5K px                      -> Astro <Image> optimizes
       these at build from src/assets, so we just COPY the source photos there.

   Outputs:
     public/videos/<name>.mp4  + .webm  + <name>-poster.jpg   (web videos)
     src/assets/images/*.jpeg                                  (for <Image>)

   Usage:  npm run media
   Requires: ffmpeg on PATH.
   ========================================================================== */

import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, readdir, copyFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const run = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

/** Background loops are trimmed to this many seconds to keep the page light. */
const TRIM_SECONDS = 15;

const SRC_VIDEOS = path.join(ROOT, "content/videos");
const SRC_IMAGES = path.join(ROOT, "content/Images");
const OUT_VIDEOS = path.join(ROOT, "public/videos");
const OUT_IMAGES = path.join(ROOT, "src/assets/images");

const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  );

async function convertVideos() {
  await mkdir(OUT_VIDEOS, { recursive: true });
  const files = (await readdir(SRC_VIDEOS)).filter((f) =>
    /\.mov$/i.test(f),
  );
  console.log(`\n🎬 ${files.length} videos to process`);

  for (const file of files) {
    const base = path.parse(file).name;
    const input = path.join(SRC_VIDEOS, file);
    const mp4 = path.join(OUT_VIDEOS, `${base}.mp4`);
    const webm = path.join(OUT_VIDEOS, `${base}.webm`);
    const poster = path.join(OUT_VIDEOS, `${base}-poster.jpg`);

    if (await exists(mp4)) {
      console.log(`  ↷ skip ${base} (already converted)`);
      continue;
    }

    // Background loops: they are muted, scaled to max 1280 wide, and trimmed to
    // the first TRIM_SECONDS so the page stays light. A crossfade loop rarely
    // needs more than ~15s of footage. Higher CRF because motion + overlay
    // scrims hide compression well.
    const vf = "scale='min(1280,iw)':-2";
    console.log(`  → ${base}.mp4`);
    await run("ffmpeg", [
      "-i", input, "-t", String(TRIM_SECONDS), "-an", "-vf", vf,
      "-c:v", "libx264", "-profile:v", "high", "-crf", "28",
      "-preset", "slow", "-movflags", "+faststart", "-pix_fmt", "yuv420p",
      "-y", mp4,
    ]);

    console.log(`  → ${base}.webm`);
    await run("ffmpeg", [
      "-i", input, "-t", String(TRIM_SECONDS), "-an", "-vf", vf,
      "-c:v", "libvpx-vp9", "-crf", "40", "-b:v", "0", "-deadline", "good",
      "-row-mt", "1",
      "-y", webm,
    ]);

    console.log(`  → ${base}-poster.jpg`);
    await run("ffmpeg", [
      "-i", input, "-vf", `${vf},select=eq(n\\,15)`,
      "-frames:v", "1", "-q:v", "4", "-y", poster,
    ]);
  }
}

async function copyImages() {
  await mkdir(OUT_IMAGES, { recursive: true });
  const files = (await readdir(SRC_IMAGES)).filter((f) =>
    /\.(jpe?g|png)$/i.test(f),
  );
  console.log(`\n🖼  ${files.length} photos -> src/assets/images`);
  for (const file of files) {
    const dest = path.join(OUT_IMAGES, file);
    if (await exists(dest)) continue;
    await copyFile(path.join(SRC_IMAGES, file), dest);
    console.log(`  → ${file}`);
  }
}

async function copyMockups() {
  const src = path.join(SRC_IMAGES, "mockups");
  const out = path.join(OUT_IMAGES, "mockups");
  if (!(await exists(src))) return;
  await mkdir(out, { recursive: true });
  const files = (await readdir(src)).filter((f) => /\.(jpe?g|png)$/i.test(f));
  console.log(`\n🛍  ${files.length} product mockups -> src/assets/images/mockups`);
  for (const file of files) {
    const dest = path.join(out, file);
    if (await exists(dest)) continue;
    await copyFile(path.join(src, file), dest);
    console.log(`  → ${file}`);
  }
}

(async () => {
  try {
    await convertVideos();
    await copyImages();
    await copyMockups();
    console.log("\n✅ Media pipeline complete.\n");
  } catch (err) {
    console.error("\n❌ Media pipeline failed:", err.message);
    process.exit(1);
  }
})();
