import Link from "next/link";
import { AppIcon } from "@/components/ui/app-icon";
import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/ui/store-badges";
import { localName, SecondaryName } from "@/components/ui/arabic-name";
import type { Product } from "@/content/schema";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { storeUrls } from "@/lib/stores";

/** The remaining products as one compact, scannable list. */
export function AlsoShipped({ products, locale = "en" }: { products: Product[]; locale?: Locale }) {
  if (products.length === 0) return null;
  const t = getDictionary(locale);
  return (
    <Container width="wide" className="py-16 md:py-20">
      <div className="grid gap-8 md:grid-cols-12">
        <h3 className="text-step-2 md:col-span-3">{t.shipped.alsoShipped}</h3>
        <ul data-testid="app-ledger" className="divide-y divide-rule border-y border-rule md:col-span-9">
          {products.map((p) => (
            <li key={p.slug} className="grid grid-cols-[52px_1fr] items-center gap-x-5 gap-y-3 py-5 md:grid-cols-[52px_minmax(0,1.2fr)_minmax(0,1.6fr)_auto]">
              <AppIcon slug={p.slug} src={p.icon} size={52} morph={false} />
              <div className="min-w-0">
                <Link href={localeHref(locale, `/apps/${p.slug}`)} className="text-step-1 font-medium hover:text-laurel">
                  {localName(p, locale)}
                </Link>
                <SecondaryName name={p.name} nameAr={p.nameAr} locale={locale} className="text-muted" />
                <p className="text-step--1 text-muted">
                  {t.domains[p.domain]}
                  {locale === "ar" ? "، " : ", "}
                  {t.roleFor(p.roleLabel ?? (locale === "ar" ? t.roles[p.role] : t.roles[p.role].toLowerCase()), p.publisher)}
                </p>
              </div>
              <p className="col-span-2 text-muted md:col-span-1">{p.tagline}</p>
              <div className="col-span-2 md:col-span-1">
                <StoreBadges name={localName(p, locale)} locale={locale} size="sm" {...storeUrls(p.stores)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
