/**
 * build-gallery-manifest.mjs
 *
 * WHAT THIS DOES
 * ----------------------------------------------------------------
 * 1. Reads gallery-events.json — the file WHERE YOU ONLY TYPE
 *    each event's title + date, per year, per month.
 * 2. For every event, looks inside:
 *        public/images/gallery/<year>/<event-slug>/
 *    and picks up every image file that's actually sitting there.
 * 3. Writes gallery-manifest.json — the real, final data file the
 *    website reads. Image lists and photo counts are 100% accurate
 *    because they come from the filesystem, not from typing or guessing.
 *
 * YOUR WORKFLOW
 * ----------------------------------------------------------------
 * 1. Open gallery-events.json. For each year/month, list the events
 *    that happened, e.g.:
 *      "January": [
 *        { "title": "Republic Day Parade", "date": "26 Jan" }
 *      ]
 *    That's it — titles and dates only. Nothing about photos.
 *
 * 2. Create a folder for each event and drop its photos in:
 *      public/images/gallery/2024-25/republic-day-parade/
 *    (the folder name is auto-derived from the title — see the
 *    log output below, it tells you the exact folder name expected)
 *    Name the files anything — 1.jpg, IMG_0234.jpg, whatever your
 *    camera produced. Order is: numeric names first (1,2,3...),
 *    then everything else alphabetically.
 *
 * 3. Run:
 *      node scripts/build-gallery-manifest.mjs
 *
 *    It regenerates gallery-manifest.json and prints a summary,
 *    including which events still have NO photos yet, so you always
 *    know what's left to do. Run it again any time you add photos.
 *
 * Add "photos" as a folder tree gradually — nothing breaks if an
 * event's folder doesn't exist yet, it'll just show 0 photos until
 * you add it and re-run this script.
 * ----------------------------------------------------------------
 */

import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, ".."); // project root (adjust if you move this script)

const EVENTS_FILE = path.join(ROOT, "gallery-events.json");
const MANIFEST_FILE = path.join(ROOT, "gallery-manifest.json");
const PHOTOS_ROOT = path.join(ROOT, "public", "images", "gallery");
const WEB_PREFIX = "/images/gallery";

const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

const MONTHS_ORDER = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

// "1.jpg" < "2.jpg" < ... < "10.jpg", then non-numeric names alphabetically
function naturalSort(files) {
  const numeric = [];
  const rest = [];
  for (const f of files) {
    const base = path.parse(f).name;
    if (/^\d+$/.test(base)) numeric.push(f);
    else rest.push(f);
  }
  numeric.sort((a, b) => parseInt(path.parse(a).name, 10) - parseInt(path.parse(b).name, 10));
  rest.sort((a, b) => a.localeCompare(b));
  return [...numeric, ...rest];
}

async function listImages(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && IMAGE_EXTENSIONS.has(path.extname(e.name).toLowerCase()))
      .map((e) => e.name);
    return naturalSort(files);
  } catch {
    return null; // folder doesn't exist yet
  }
}

async function main() {
  const raw = await fs.readFile(EVENTS_FILE, "utf-8");
  const eventsData = JSON.parse(raw);

  const manifest = {};
  let totalEvents = 0;
  let eventsWithNoFolder = [];
  let eventsWithNoPhotos = [];

  for (const year of Object.keys(eventsData)) {
    manifest[year] = {};
    const yearMonths = eventsData[year] || {};

    for (const month of MONTHS_ORDER) {
      const events = yearMonths[month] || [];
      if (events.length === 0) continue;

      manifest[year][month] = [];

      for (const ev of events) {
        totalEvents++;
        const slug = slugify(ev.title);
        const dir = path.join(PHOTOS_ROOT, year, slug);
        const images = await listImages(dir);

        const webPaths =
          images === null
            ? []
            : images.map((f) => `${WEB_PREFIX}/${year}/${slug}/${f}`);

        if (images === null) {
          eventsWithNoFolder.push(`${year} / ${month} / ${ev.title}  ->  public/images/gallery/${year}/${slug}/`);
        } else if (images.length === 0) {
          eventsWithNoPhotos.push(`${year} / ${month} / ${ev.title}  ->  public/images/gallery/${year}/${slug}/ (folder exists, empty)`);
        }

        manifest[year][month].push({
          id: `${slug}-${year}`,
          title: ev.title,
          date: ev.date,
          month,
          images: webPaths,
        });
      }
    }
  }

  await fs.writeFile(MANIFEST_FILE, JSON.stringify(manifest, null, 2));

  console.log(`\nGallery manifest built: ${MANIFEST_FILE}`);
  console.log(`Total events: ${totalEvents}`);

  const missing = [...eventsWithNoFolder, ...eventsWithNoPhotos];
  if (missing.length > 0) {
    console.log(`\nEvents still needing photos (${missing.length}):`);
    missing.forEach((m) => console.log("  - " + m));
  } else {
    console.log("\nEvery event has at least one photo. ✅");
  }
}

main().catch((err) => {
  console.error("Failed to build manifest:", err);
  process.exit(1);
});
