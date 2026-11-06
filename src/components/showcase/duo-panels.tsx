import { Reveal } from "@/components/motion/reveal";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { localName } from "@/components/ui/arabic-name";
import type { Product } from "@/content/schema";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { panelColors, PanelText } from "./panel";

/** Two products side by side, each in its own color, split across the full width. */
export function DuoPanels({ products, locale = "en" }: { products: Product[]; locale?: Locale }) {
  const t = getDictionary(locale);
  return (
    <div className="grid md:grid-cols-2">
      {products.map((p) => {
        const c = panelColors(p.brandColor);
        return (
          <article
            key={p.slug}
            aria-labelledby={`show-${p.slug}`}
            data-testid={`composition-${p.slug}`}
            className="relative overflow-hidden px-gutter pt-14 md:px-12 md:pt-20 xl:px-16"
            style={{ background: c.bg, color: c.fg, ["--muted" as string]: c.muted }}
          >
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_200px]">
              <div className="pb-14 md:pb-20">
                <PanelText
                  compact
                  slug={p.slug}
                  icon={p.icon}
                  name={p.name}
                  nameAr={p.nameAr}
                  tagline={p.tagline}
                  highlights={p.highlights.slice(0, 3)}
                  role={p.role}
                  roleLabel={p.roleLabel}
                  publisher={p.publisher}
                  stores={p.stores}
                  brand={p.brandColor}
                  href={localeHref(locale, `/apps/${p.slug}`)}
                  headingId={`show-${p.slug}`}
                  locale={locale}
                />
              </div>
              <Reveal className="hidden self-end lg:block">
                <PhoneFrame src={p.screenshots[0]} alt={t.screen(localName(p, locale))} width={200} style={{ marginBottom: "-18%" }} />
              </Reveal>
            </div>
          </article>
        );
      })}
    </div>
  );
}
