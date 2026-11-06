import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { localName, SecondaryName } from "@/components/ui/arabic-name";
import { StoreBadges } from "@/components/ui/store-badges";
import type { Domain, Product, ProductFamily } from "@/content/schema";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { storeUrls } from "@/lib/stores";
import { DomainFilter } from "./domain-filter";

/**
 * Every published app, rendered on the server so the full list is in the HTML.
 * The domain filter only hides rows in the browser.
 */
export function AppsCollection({ products, families, locale = "en" }: { products: Product[]; families: ProductFamily[]; locale?: Locale }) {
  const t = getDictionary(locale);
  const domains = Array.from(new Set(products.map((p) => p.domain))) as Domain[];
  const familyOf = (slug?: string) => families.find((f) => f.slug === slug);
  const labeeny = products.find((p) => p.slug === "labeeny");
  return (
    <div>
      <DomainFilter
        domains={domains.map((d) => ({ id: d, label: t.domains[d] }))}
        listId="apps-list"
        labels={{ aria: t.appsPage.filterAria, all: t.appsPage.all }}
      />
      <ul id="apps-list" data-testid="apps-list" className="mt-8 border-t border-rule">
        {products.map((p) => {
          const fam = familyOf(p.family);
          const partOf =
            p.slug === "captain-labeeny" && labeeny
              ? { href: localeHref(locale, "/apps/labeeny"), name: localName(labeeny, locale) }
              : fam
                ? { href: localeHref(locale, `/apps/${fam.slug}`), name: localName(fam, locale) }
                : undefined;
          return (
            <li key={p.slug} data-domain={p.domain} className="grid grid-cols-[64px_1fr] gap-x-5 gap-y-4 border-b border-rule py-7 lg:grid-cols-[64px_minmax(0,1.4fr)_minmax(0,1fr)_auto] lg:items-center lg:gap-8">
              <AppIcon slug={p.slug} src={p.icon} size={64} />
              <div className="min-w-0">
                <h2 className="text-step-2">
                  <Link href={localeHref(locale, `/apps/${p.slug}`)} className="hover:text-laurel">
                    {localName(p, locale)}
                  </Link>
                  <SecondaryName name={p.name} nameAr={p.nameAr} locale={locale} className="ms-3 text-step-1 font-[400] text-muted" />
                </h2>
                <p className="mt-1 max-w-[52ch]">{p.tagline}</p>
                <p className="mt-2 text-step--1 text-muted">
                  {t.domains[p.domain]}. {t.roleFor(p.roleLabel ?? t.roles[p.role], p.publisher)}.
                  {partOf ? (
                    <>
                      {" "}
                      {t.appsPage.partOf}{" "}
                      <Link href={partOf.href} className="link">
                        {partOf.name}
                      </Link>
                      .
                    </>
                  ) : null}
                </p>
              </div>
              <div aria-hidden className="col-span-2 hidden gap-2 lg:col-span-1 lg:flex">
                {p.screenshots.slice(0, 3).map((s) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={s} src={s} alt="" loading="lazy" width={64} height={139} className="h-[139px] w-[64px] rounded-[8px] object-cover object-top ring-1 ring-black/10" />
                ))}
              </div>
              <div className="col-span-2 lg:col-span-1">
                <StoreBadges name={localName(p, locale)} locale={locale} size="sm" {...storeUrls(p.stores)} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
