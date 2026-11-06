import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { ContactCta } from "@/components/sections/contact-cta";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Growth } from "@/components/sections/growth";
import { Hero } from "@/components/sections/hero";
import { Shipped } from "@/components/sections/shipped";
import { Systems } from "@/components/sections/systems";
import { localeHref, type Locale } from "@/i18n/config";
import { getProducts, getSite } from "@/lib/content";
import { buildMetadata, personJsonLd } from "@/lib/seo";

/** Shelf order: the featured products first, then the rest by year. */
const SHELF_ORDER = ["labeeny", "captain-labeeny", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

export function homeMetadata(locale: Locale): Metadata {
  const site = getSite(locale);
  return buildMetadata({ title: site.title, description: site.description, path: localeHref(locale, "/"), absoluteTitle: true, locale });
}

export function HomeView({ locale }: { locale: Locale }) {
  const products = getProducts(locale);
  const listingCount = products.reduce((n, p) => n + (p.stores.play ? 1 : 0) + (p.stores.appStore ? 1 : 0), 0);
  const shelf = [...products].sort((a, b) => {
    const ia = SHELF_ORDER.indexOf(a.slug);
    const ib = SHELF_ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  return (
    <main id="main">
      <JsonLd data={personJsonLd(locale)} />
      <Hero products={shelf} listingCount={listingCount} locale={locale} />
      <Shipped locale={locale} />
      <Systems locale={locale} />
      <ExperienceTimeline locale={locale} />
      <Growth locale={locale} />
      <ContactCta locale={locale} />
    </main>
  );
}
