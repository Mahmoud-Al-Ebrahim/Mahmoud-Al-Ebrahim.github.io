import { AlsoShipped } from "@/components/showcase/also-shipped";
import { DuoPanels } from "@/components/showcase/duo-panels";
import { EdTechStory, type StoryChapter } from "@/components/showcase/edtech-story";
import { LabeenyPanel } from "@/components/showcase/labeeny-panel";
import { MinBaytyPanel } from "@/components/showcase/min-bayty-panel";
import { panelColors } from "@/components/showcase/panel";
import { Container } from "@/components/ui/container";
import { ROLE_LABELS, type Product } from "@/content/schema";
import { getFamily, getFamilyMembers, getProduct, getProducts } from "@/lib/content";
import { storeUrls } from "@/lib/stores";

const DUO = ["birdy-consults", "sayed"];

function must(slug: string): Product {
  const p = getProduct(slug);
  if (!p) throw new Error(`[shipped] missing product ${slug}`);
  return p;
}

/**
 * The published apps, each in its own color and composition. Order:
 * Labeeny (two apps), the EdTech family (scroll story), Min Bayty (fan),
 * Birdy Consults and Sayed (two-up), then the rest as a list.
 */
export function Shipped() {
  const labeeny = must("labeeny");
  const captain = getProduct("captain-labeeny");
  const minBayty = must("min-bayty");
  const family = getFamily("fahim-edtech");
  if (!family) throw new Error("[shipped] missing family");
  const members = getFamilyMembers(family);
  const duo = DUO.map(must);
  const shown = new Set(["labeeny", "captain-labeeny", "min-bayty", ...DUO, ...family.members]);
  const rest = getProducts().filter((p) => !shown.has(p.slug));

  const chapters: StoryChapter[] = members.map((m) => ({
    slug: m.slug,
    name: m.name,
    nameAr: m.nameAr,
    icon: m.icon,
    tagline: m.tagline,
    highlights: m.highlights,
    roleText: `${m.roleLabel ?? ROLE_LABELS[m.role]} for ${m.publisher}`,
    screen: m.screenshots[0],
    colors: panelColors(m.brandColor),
    stores: storeUrls(m.stores),
  }));

  return (
    <section id="apps" aria-labelledby="apps-title">
      <Container width="wide" className="pb-12 pt-20 md:pb-16 md:pt-28">
        <div className="grid gap-6 md:grid-cols-12 md:gap-8">
          <h2 id="apps-title" className="text-step-5 md:col-span-6">
            Shipped to the stores
          </h2>
          <p className="max-w-[50ch] self-end text-step-1 text-muted md:col-span-5 md:col-start-8">
            Real products with real users, built for publishers in Syria. Each one below says what I engineered, not just what
            the app does, and links to its case study and store pages.
          </p>
        </div>
      </Container>
      <div data-testid="featured-apps">
        <LabeenyPanel product={labeeny} captain={captain} />
        <EdTechStory
          familyName={family.name}
          familyNameAr={family.nameAr}
          familyTagline={family.tagline}
          familyHighlights={family.highlights}
          familyHref={`/apps/${family.slug}`}
          chapters={chapters}
        />
        <MinBaytyPanel product={minBayty} />
        <DuoPanels products={duo} />
      </div>
      <AlsoShipped products={rest} />
    </section>
  );
}
