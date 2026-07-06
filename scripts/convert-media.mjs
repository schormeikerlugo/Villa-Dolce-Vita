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

/** slugify a file/folder name into a web-safe, import-friendly token. */
const slug = (s) =>
  s
    .normalize("NFKD")
    .replace(/[^\w.\- ]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .toLowerCase();

/**
 * Per-suite room photos live in content/Images/Suites/<Suite Name>/*.
 * Copy each into src/assets/images/suites/<suite-slug>/<n>.<ext> with
 * normalized, stable, import-friendly names (no spaces) so media.ts can
 * statically import them for Astro <Image>.
 */
async function copySuites() {
  const src = path.join(SRC_IMAGES, "Suites");
  const out = path.join(OUT_IMAGES, "suites");
  if (!(await exists(src))) return;
  await mkdir(out, { recursive: true });

  const dirents = await readdir(src, { withFileTypes: true });
  const suiteDirs = dirents.filter((d) => d.isDirectory());
  console.log(`\n🛏  ${suiteDirs.length} suites -> src/assets/images/suites`);

  for (const dir of suiteDirs) {
    // "Napoli Suite" -> "napoli"
    const suiteSlug = slug(dir.name.replace(/\s*suite\s*$/i, ""));
    const suiteSrc = path.join(src, dir.name);
    const suiteOut = path.join(out, suiteSlug);
    await mkdir(suiteOut, { recursive: true });

    const files = (await readdir(suiteSrc))
      .filter((f) => /\.(jpe?g|png)$/i.test(f))
      .sort((a, b) =>
        a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }),
      );

    let i = 1;
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      const dest = path.join(suiteOut, `${suiteSlug}-${i}${ext}`);
      if (!(await exists(dest))) {
        await copyFile(path.join(suiteSrc, file), dest);
        console.log(`  → suites/${suiteSlug}/${suiteSlug}-${i}${ext}`);
      }
      i++;
    }
  }
}

(async () => {
  try {
    await convertVideos();
    await copyImages();
    await copyMockups();
    await copySuites();
    console.log("\n✅ Media pipeline complete.\n");
  } catch (err) {
    console.error("\n❌ Media pipeline failed:", err.message);
    process.exit(1);
  }
})();
