import { AlsoShipped } from "@/components/showcase/also-shipped";
import { DuoPanels } from "@/components/showcase/duo-panels";
import { EdTechStory, type StoryChapter } from "@/components/showcase/edtech-story";
import { LabeenyPanel } from "@/components/showcase/labeeny-panel";
import { MinBaytyPanel } from "@/components/showcase/min-bayty-panel";
import { panelColors } from "@/components/showcase/panel";
import { Container } from "@/components/ui/container";
import type { Product } from "@/content/schema";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getFamily, getFamilyMembers, getProduct, getProducts } from "@/lib/content";
import { storeUrls } from "@/lib/stores";

const DUO = ["birdy-consults", "sayed"];

function must(slug: string, locale: Locale): Product {
  const p = getProduct(slug, locale);
  if (!p) throw new Error(`[shipped] missing product ${slug}`);
  return p;
}

/**
 * The published apps, each in its own color and composition. Order:
 * Labeeny (two apps), the EdTech family (scroll story), Min Bayty (fan),
 * Birdy Consults and Sayed (two-up), then the rest as a list.
 */
export function Shipped({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const labeeny = must("labeeny", locale);
  const captain = getProduct("captain-labeeny", locale);
  const minBayty = must("min-bayty", locale);
  const family = getFamily("fahim-edtech", locale);
  if (!family) throw new Error("[shipped] missing family");
  const members = getFamilyMembers(family, locale);
  const duo = DUO.map((slug) => must(slug, locale));
  const shown = new Set(["labeeny", "captain-labeeny", "min-bayty", ...DUO, ...family.members]);
  const rest = getProducts(locale).filter((p) => !shown.has(p.slug));

  const chapters: StoryChapter[] = members.map((m) => ({
    slug: m.slug,
    name: m.name,
    nameAr: m.nameAr,
    icon: m.icon,
    tagline: m.tagline,
    highlights: m.highlights,
    roleText: t.roleFor(m.roleLabel ?? t.roles[m.role], m.publisher),
    screen: m.screenshots[0],
    colors: panelColors(m.brandColor),
    stores: storeUrls(m.stores),
  }));

  return (
    <section id="apps" aria-labelledby="apps-title">
      <Container width="wide" className="pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <h2 id="apps-title" className="text-step-5 md:col-span-6">
            {t.shipped.title}
          </h2>
          <p className="max-w-[50ch] self-end text-step-1 text-muted md:col-span-5 md:col-start-8">
            {t.shipped.lede}
          </p>
        </div>
      </Container>
      <div data-testid="featured-apps">
        <LabeenyPanel product={labeeny} captain={captain} locale={locale} />
        <EdTechStory
          familyName={family.name}
          familyNameAr={family.nameAr}
          familyTagline={family.tagline}
          familyHighlights={family.highlights}
          familyHref={`/apps/${family.slug}`}
          chapters={chapters}
          locale={locale}
        />
        <MinBaytyPanel product={minBayty} locale={locale} />
        <DuoPanels products={duo} locale={locale} />
      </div>
      <AlsoShipped products={rest} locale={locale} />
    </section>
  );
}
