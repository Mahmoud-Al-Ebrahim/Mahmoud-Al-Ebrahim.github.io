/**
 * Generates Open Graph share images as real PNG files in public/og/, so any
 * static host serves them with the right content type.
 *
 * Runs automatically before `npm run build` (the `prebuild` script).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { ogImage } from "../src/lib/og";
import { getAppEntry, getAppSlugs, getProjects } from "../src/lib/content";

async function write(name: string, res: Response) {
  const out = join(process.cwd(), "public/og");
  mkdirSync(out, { recursive: true });
  writeFileSync(join(out, `${name}.png`), Buffer.from(await res.arrayBuffer()));
}

async function main() {
  await write(
    "home",
    await ogImage({
      eyebrow: "Senior Flutter engineer",
      title: "Mahmoud AlEbrahim",
      line: "I architect and ship mobile apps on the App Store and Google Play, and build the Node.js and GraphQL backends behind them.",
    }),
  );
  for (const slug of getAppSlugs()) {
    const e = getAppEntry(slug)!;
    await write(`apps-${slug}`, await ogImage({ eyebrow: "Shipped app", title: e.name, line: e.tagline, tint: e.brandColor }));
  }
  for (const p of getProjects()) {
    await write(`projects-${p.slug}`, await ogImage({ eyebrow: "Engineering case study", title: p.name, line: p.tagline }));
  }
  console.log("og images written to public/og");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
