import Link from "next/link";
import { IconDownload } from "@/components/icons";
import { AppIcon } from "@/components/ui/app-icon";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PhoneFrame } from "@/components/ui/phone-frame";
import type { Product } from "@/content/schema";
import { siteConfig } from "@/content/site";

const HERO_SCREENS = [
  { src: "/apps/fahim-bac/shot-3.webp", alt: "Fahim BAC: the units of a baccalaureate subject", tilt: "-7deg", d: "0.35s" },
  { src: "/apps/sayed/shot-2.webp", alt: "Sayed: wallet balance and top-up shortcuts", tilt: "0deg", d: "0.2s" },
  { src: "/apps/min-bayty/shot-4.webp", alt: "Min Bayty: handmade products by category", tilt: "7deg", d: "0.5s" },
];

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty"];
const words = (n: number) => NUMBER_WORDS[n] ?? String(n);

/**
 * Who, what, and proof on one screen: the name, one sentence of positioning,
 * real screens from shipped apps, and a shelf of every app on the stores.
 */
export function Hero({ products, listingCount }: { products: Product[]; listingCount: number }) {
  return (
    <section id="hero" aria-label="Introduction" className="relative overflow-hidden">
      <Container width="wide" className="grid gap-12 pb-12 pt-12 md:grid-cols-12 md:gap-8 md:pb-16 md:pt-20">
        <div className="md:col-span-7 md:pt-6 lg:col-span-6">
          <p className="enter text-step-0 text-muted" style={{ ["--d" as string]: "0s" }}>
            Senior Flutter engineer in Aleppo. Currently at KwanX.
          </p>
          <h1 className="enter mt-4 text-step-6 leading-[0.92]" style={{ ["--d" as string]: "0.08s" }}>
            Mahmoud AlEbrahim
          </h1>
          <p className="enter mt-6 max-w-[34ch] text-step-2 font-[400] leading-snug" style={{ ["--d" as string]: "0.16s" }}>
            I architect and ship mobile products, and build the Node.js and GraphQL backends they run on.
          </p>
          <p className="enter mt-5 max-w-[50ch] text-muted" style={{ ["--d" as string]: "0.22s" }}>
            {words(products.length).replace(/^./, (c) => c.toUpperCase())} apps across {words(listingCount)} App Store and Google Play
            listings: delivery, exam prep, marketplaces, veterinary care and payments. I led teams on several of them and taught
            Flutter and algorithms to more than a thousand students along the way.
          </p>
          <div className="enter mt-8 flex flex-wrap gap-3" style={{ ["--d" as string]: "0.3s" }}>
            <Button href="#apps">See the shipped apps</Button>
            <Button href={siteConfig.resumePath} variant="secondary" download>
              <IconDownload /> Download CV
            </Button>
          </div>
        </div>

        <div aria-hidden className="relative -mx-gutter flex items-center justify-center overflow-hidden px-gutter pb-2 md:col-span-5 md:mx-0 md:overflow-visible md:px-0 md:pb-0 lg:col-span-6">
          <div className="flex w-full items-center justify-center">
            {HERO_SCREENS.map((s, i) => (
              <div
                key={s.src}
                className="enter-phone shrink-0"
                style={{ ["--tilt" as string]: s.tilt, ["--d" as string]: s.d, zIndex: i === 1 ? 2 : 1, width: i === 1 ? "36%" : "31%", margin: i === 1 ? "0 -4%" : undefined, maxWidth: i === 1 ? 270 : 230 }}
              >
                <PhoneFrame src={s.src} alt="" width={i === 1 ? 270 : 230} priority />
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container width="wide" className="pb-16 md:pb-20">
        <div className="enter-fade border-t border-rule pt-6" style={{ ["--d" as string]: "0.6s" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-step-0 font-medium">On the stores now</h2>
            <Link href="/apps" className="link text-step--1">
              All apps and store links
            </Link>
          </div>
          <ul className="-mx-gutter mt-5 flex snap-x gap-5 overflow-x-auto px-gutter pb-2 md:mx-0 md:grid md:grid-cols-6 md:gap-y-6 md:overflow-visible md:px-0 xl:grid-cols-11" aria-label="Published apps">
            {products.map((p) => (
              <li key={p.slug} className="w-[76px] shrink-0 snap-start md:w-auto">
                <Link href={`/apps/${p.slug}`} className="group flex flex-col items-start gap-2">
                  <AppIcon slug={p.slug} src={p.icon} size={60} className="transition-transform duration-300 group-hover:-translate-y-1" priority />
                  <span className="text-step--1 leading-tight group-hover:text-laurel">{p.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
