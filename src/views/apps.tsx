import type { Metadata } from "next";
import { AppCaseStudy } from "@/components/apps/app-case-study";
import { AppsCollection } from "@/components/apps/apps-collection";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { localName } from "@/components/ui/arabic-name";
import { siteConfig } from "@/content/site";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getAppEntry, getAppSlugs, getFamilies, getFamilyMembers, getProducts } from "@/lib/content";
import { absoluteUrl, buildMetadata } from "@/lib/seo";

const ORDER = ["labeeny", "captain-labeeny", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

export function appsMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).appsPage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/apps"), locale });
}

export function AppsView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).appsPage;
  const products = [...getProducts(locale)].sort((a, b) => {
    const ia = ORDER.indexOf(a.slug);
    const ib = ORDER.indexOf(b.slug);
    return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
  });
  const listings = products.reduce((n, p) => n + (p.stores.play ? 1 : 0) + (p.stores.appStore ? 1 : 0), 0);
  return (
    <Container as="main" id="main" width="wide" className="py-14 md:py-20">
      <h1 className="text-step-6 leading-[0.95]">{t.title}</h1>
      <p className="mt-6 max-w-[56ch] text-step-1 text-muted">{t.lede(products.length, listings)}</p>
      <div className="mt-12">
        <AppsCollection products={products} families={getFamilies(locale)} locale={locale} />
      </div>
    </Container>
  );
}

/* One app or family ---------------------------------------------------- */

export function appStaticParams() {
  return getAppSlugs().map((slug) => ({ slug }));
}

export function appMetadata(slug: string, locale: Locale): Metadata {
  const entry = getAppEntry(slug, locale);
  if (!entry) return {};
  return buildMetadata({ title: localName(entry, locale), description: entry.tagline, path: localeHref(locale, `/apps/${slug}`), locale });
}

function applicationJsonLd(slug: string, locale: Locale) {
  const entry = getAppEntry(slug, locale);
  if (!entry) return null;
  const products = entry.kind === "family" ? getFamilyMembers(entry, locale) : [entry];
  const os = Array.from(new Set(products.flatMap((p) => [p.stores.play && "Android", p.stores.appStore && "iOS"].filter(Boolean) as string[])));
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: entry.name,
    alternateName: entry.nameAr,
    description: entry.tagline,
    inLanguage: locale,
    applicationCategory: "MobileApplication",
    operatingSystem: os.join(", "),
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@type": "Organization", name: entry.publisher },
    url: absoluteUrl(localeHref(locale, `/apps/${slug}`)),
  };
}

export function AppView({ slug, locale }: { slug: string; locale: Locale }) {
  const ld = applicationJsonLd(slug, locale);
  return (
    <>
      {ld ? <JsonLd data={ld} /> : null}
      <AppCaseStudy slug={slug} locale={locale} />
    </>
  );
}
