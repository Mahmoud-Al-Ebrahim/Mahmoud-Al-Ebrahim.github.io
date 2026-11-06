import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Growth } from "@/components/sections/growth";
import { Hero } from "@/components/sections/hero";
import { Shipped } from "@/components/sections/shipped";
import { Systems } from "@/components/sections/systems";
import { siteConfig } from "@/content/site";
import { getProducts } from "@/lib/content";
import { buildMetadata, personJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: "/",
  absoluteTitle: true,
});

/** Shelf order: the featured products first, then the rest by year. */
const SHELF_ORDER = ["labeeny", "captain-labeeny", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

export default function Home() {
  const products = getProducts();
  const listingCount = products.reduce((n, p) => n + (p.stores.play ? 1 : 0) + (p.stores.appStore ? 1 : 0), 0);
  const shelf = [...products].sort((a, b) => {
    const ia = SHELF_ORDER.indexOf(a.slug);
    const ib = SHELF_ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  return (
    <main id="main">
      <JsonLd data={personJsonLd()} />
      <Hero products={shelf} listingCount={listingCount} />
      <Shipped />
      <Systems />
      <ExperienceTimeline />
      <Growth />
      <ContactCta />
    </main>
  );
}
