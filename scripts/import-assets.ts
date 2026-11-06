/**
 * Imports store icons and screenshots into public/apps/<slug>/ as WebP.
 *
 * Usage: npm run assets -- --from <dir>
 *
 * The source directory holds PNGs named by the store export script:
 *   icon_<playPackage>.png, shot_<playPackage>_<n>.png,
 *   icon_ios_<bundle>.png,  shot_ios_<bundle>_<n>.png
 * Product slugs are mapped from package/bundle ids below. iOS screenshots are
 * preferred when present because they are larger; Play ones fill the rest.
 */
import { mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";

const SLUG_BY_PACKAGE: Record<string, string> = {
  "com.kwanx.deliverex.user": "labeeny",
  "com.kwanx.deliverex.driver": "captain-labeeny",
  "com.YamanKartal.coursaty_app": "coursaty",
  "com.YamanKartal.coursatyApp": "coursaty",
  "com.prootech.min_bayty": "min-bayty",
  "com.minbayty.app": "min-bayty",
  "com.zakarianaser.skdbirdy": "birdy-consults",
  "com.company.fhymUniversity": "fahim-uni",
  "com.company.fhym": "fahim-uni",
  "com.company.fhymBacaloria": "fahim-bac",
  "com.company.fhym.fhymBacaloria": "fahim-bac",
  "com.prootech.assas": "assas",
  "com.zaman.zaman_alwasel": "zaman-alwasel",
  "com.zamanalwasel.app": "zaman-alwasel",
  "com.atmtha.app": "atmtha",
  "com.sayed.digital_store.sayed_app": "sayed",
};

/** Screenshots to skip because they are marketing composites, not app screens. Keyed by source file name. */
const SKIP = new Set<string>(["shot_ios_com.kwanx.deliverex.user_0.png"]);

const MAX_SHOTS = 4;

function arg(name: string): string | undefined {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

async function main() {
  const from = arg("--from");
  if (!from) throw new Error("usage: import-assets --from <dir>");
  const src = resolve(from);
  const outRoot = resolve(process.cwd(), "public/apps");
  const files = readdirSync(src).filter((f) => f.endsWith(".png"));

  const icons = new Map<string, string>();
  const shots = new Map<string, string[]>();

  // iOS first so it wins ties for icons and leads the screenshot list.
  const ordered = [...files.filter((f) => f.includes("_ios_")), ...files.filter((f) => !f.includes("_ios_"))];
  for (const f of ordered) {
    if (SKIP.has(f)) continue;
    const m = f.match(/^(icon|shot)_(?:ios_)?([A-Za-z0-9_.]+?)(?:_(\d+))?\.png$/);
    if (!m) continue;
    const [, kind, pkg] = m;
    const slug = SLUG_BY_PACKAGE[pkg];
    if (!slug) {
      console.warn(`skip unknown package ${pkg}`);
      continue;
    }
    if (kind === "icon") {
      if (!icons.has(slug)) icons.set(slug, join(src, f));
    } else {
      const list = shots.get(slug) ?? [];
      list.push(join(src, f));
      shots.set(slug, list);
    }
  }

  for (const [slug, iconPath] of icons) {
    const dir = join(outRoot, slug);
    mkdirSync(dir, { recursive: true });
    await sharp(iconPath).resize(512, 512, { fit: "cover" }).webp({ quality: 85 }).toFile(join(dir, "icon.webp"));
    const list = (shots.get(slug) ?? []).slice(0, MAX_SHOTS);
    let n = 1;
    for (const shot of list) {
      await sharp(shot).resize({ width: 720, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(dir, `shot-${n}.webp`));
      await sharp(shot).resize({ width: 1080, withoutEnlargement: true }).webp({ quality: 80 }).toFile(join(dir, `shot-${n}@2x.webp`));
      n++;
    }
    console.log(`${slug}: icon + ${list.length} screenshots`);
  }

  for (const slug of Object.values(SLUG_BY_PACKAGE)) {
    if (!existsSync(join(outRoot, slug, "icon.webp"))) console.warn(`no icon for ${slug}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
