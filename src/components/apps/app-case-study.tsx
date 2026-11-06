import Link from "next/link";
import { Challenges } from "@/components/case-study/challenges";
import { CaseStudyBody, Crumb, StudySection } from "@/components/case-study/case-study-layout";
import { ScreenshotGallery } from "@/components/case-study/screenshot-gallery";
import { CleanArchitectureDiagram } from "@/components/diagrams/clean-architecture";
import { panelColors } from "@/components/showcase/panel";
import { AppIcon } from "@/components/ui/app-icon";
import { ArabicName } from "@/components/ui/arabic-name";
import { Container } from "@/components/ui/container";
import { Paragraphs } from "@/components/ui/paragraphs";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { StoreBadges } from "@/components/ui/store-badges";
import { Tag } from "@/components/ui/tag";
import { DOMAIN_LABELS, ROLE_LABELS, type Product, type ProductFamily } from "@/content/schema";
import { getAppEntry, getFamilyMembers, getProducts } from "@/lib/content";
import { storeUrls } from "@/lib/stores";

/** Products in collection order; the case-study prev/next walks this list. */
const ORDER = ["labeeny", "captain-labeeny", "fahim-edtech", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

function neighbors(slug: string) {
  const i = ORDER.indexOf(slug);
  const at = (j: number) => {
    const e = j >= 0 && j < ORDER.length ? getAppEntry(ORDER[j]) : undefined;
    return e ? { href: `/apps/${e.slug}`, label: e.name } : undefined;
  };
  return { prev: at(i - 1), next: at(i + 1) };
}

function Highlights({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((h) => (
        <li key={h} className="grid grid-cols-[1.25rem_1fr] gap-2 border-t border-rule pt-3 text-step-1">
          <span aria-hidden className="mt-[0.75em] h-px w-3 bg-laurel" />
          <span>{h}</span>
        </li>
      ))}
    </ul>
  );
}

function Hero({
  slug,
  icon,
  name,
  nameAr,
  tagline,
  domain,
  roleText,
  brand,
  screens,
  flat,
  badges,
  titleSize = "hero",
}: {
  slug: string;
  icon: string;
  name: string;
  nameAr?: string;
  tagline: string;
  domain: string;
  roleText: string;
  brand: string;
  screens: string[];
  flat: boolean;
  badges: React.ReactNode;
  titleSize?: "hero" | "display";
}) {
  const c = panelColors(brand);
  return (
    <header className="relative overflow-hidden" style={{ background: c.bg, color: c.fg, ["--muted" as string]: c.muted }}>
      <Container width="wide" className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
        <div className="pb-14 md:col-span-7 md:pb-20">
          <Crumb href="/apps" label="Shipped apps" current={domain} />
          <div className="mt-10">
            <AppIcon slug={slug} src={icon} size={84} priority />
          </div>
          <ArabicName as="h1" size={titleSize} latin={name} arabic={nameAr} className="mt-6 leading-[0.95]" />
          <p className="mt-5 max-w-[32ch] text-step-2 font-[400]">{tagline}</p>
          <p className="mt-4 text-step--1" style={{ color: c.muted }}>
            {roleText}
          </p>
          <div data-testid="store-links" className="mt-8">
            {badges}
          </div>
        </div>
        <div aria-hidden className="relative hidden items-end justify-center gap-[6%] md:col-span-5 md:flex">
          {screens.slice(0, 2).map((s, i) => (
            <PhoneFrame
              key={s}
              src={s}
              alt=""
              flat={flat}
              width={250}
              priority={i === 0}
              className="enter-phone"
              style={{ ["--d" as string]: `${0.1 + i * 0.15}s`, marginBottom: i === 0 ? "-14%" : "-30%" }}
            />
          ))}
        </div>
      </Container>
    </header>
  );
}

export function AppCaseStudy({ slug }: { slug: string }) {
  const entry = getAppEntry(slug);
  if (!entry) throw new Error(`[apps] unknown slug ${slug}`);
  return entry.kind === "family" ? <FamilyStudy family={entry} /> : <ProductStudy product={entry} />;
}

function ProductStudy({ product }: { product: Product }) {
  const family = product.family ? getAppEntry(product.family) : undefined;
  const nav = neighbors(product.slug);
  const c = panelColors(product.brandColor);
  const roleText = `${product.roleLabel ?? ROLE_LABELS[product.role]} for ${product.publisher}, ${product.year}`;
  const platforms = [product.stores.appStore && "iOS", product.stores.play && "Android"].filter(Boolean).join(" and ");
  const sibling = product.slug === "labeeny" ? getProducts().find((p) => p.slug === "captain-labeeny") : undefined;

  return (
    <main id="main">
      <Hero
        slug={product.slug}
        icon={product.icon}
        name={product.name}
        nameAr={product.nameAr}
        tagline={product.tagline}
        domain={DOMAIN_LABELS[product.domain]}
        roleText={roleText}
        brand={product.brandColor}
        screens={sibling ? [product.screenshots[1] ?? product.screenshots[0], sibling.screenshots[0]] : product.screenshots}
        flat={product.screenshotStyle === "flat"}
        badges={<StoreBadges name={product.name} {...storeUrls(product.stores)} inverse={c.dark} />}
      />
      <CaseStudyBody
        prev={nav.prev}
        next={nav.next}
        margin={[
          { label: "Role", value: product.roleLabel ?? ROLE_LABELS[product.role] },
          { label: "Publisher", value: product.publisher },
          { label: "Platforms", value: platforms },
          { label: "Year", value: String(product.year) },
          ...(family
            ? [{ label: "Part of", value: <Link href={`/apps/${family.slug}`} className="link">{family.name}</Link> }]
            : []),
          {
            label: "Stack",
            value: (
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {product.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
        after={
          <ScreenshotGallery
            items={product.screenshots.map((s, i) => ({ src: s, alt: `${product.name} screen ${i + 1}` }))}
            tint={product.brandColor}
            flat={product.screenshotStyle === "flat"}
          />
        }
      >
        <StudySection title="Overview">
          <p className="max-w-[62ch] text-step-1">{product.summary}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-step--1 text-muted">The problem</dt>
              <dd className="mt-1">{product.problem}</dd>
            </div>
            <div>
              <dt className="text-step--1 text-muted">Who it serves</dt>
              <dd className="mt-1">{product.audience}</dd>
            </div>
          </dl>
        </StudySection>

        <StudySection title="My contribution">
          <p className="max-w-[62ch]">{product.contribution}</p>
        </StudySection>

        <StudySection title="What I engineered">
          <Highlights items={product.highlights} />
        </StudySection>

        <StudySection title="Architecture">
          {product.architecture ? (
            <Paragraphs text={product.architecture} />
          ) : family ? (
            <p className="max-w-[62ch]">
              This app shares its architecture with the rest of its family; the{" "}
              <Link href={`/apps/${family.slug}`} className="link">
                {family.name} case study
              </Link>{" "}
              describes it in full.
            </p>
          ) : (
            <p className="max-w-[62ch] text-muted">Built with {product.stack.join(", ")}.</p>
          )}
        </StudySection>

        <StudySection title="Features">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="border-t border-rule pt-2">
                {f}
              </li>
            ))}
          </ul>
        </StudySection>

        {product.challenges.length > 0 ? (
          <StudySection title="Challenges and solutions">
            <Challenges challenges={product.challenges} solutions={product.solutions} />
          </StudySection>
        ) : null}

        <StudySection title="Results">
          <ul className="space-y-2">
            {product.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </StudySection>

        {product.related?.length ? (
          <StudySection title="Related">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {product.related.map((r) => {
                const e = getAppEntry(r);
                return e ? (
                  <li key={r}>
                    <Link href={`/apps/${e.slug}`} className="link">
                      {e.name}
                    </Link>
                  </li>
                ) : null;
              })}
            </ul>
          </StudySection>
        ) : null}
      </CaseStudyBody>
    </main>
  );
}

function FamilyStudy({ family }: { family: ProductFamily }) {
  const members = getFamilyMembers(family);
  const nav = neighbors(family.slug);
  const platforms = new Set<string>();
  for (const m of members) {
    if (m.stores.appStore) platforms.add("iOS");
    if (m.stores.play) platforms.add("Android");
  }
  const c = panelColors(family.brandColor);
  return (
    <main id="main">
      <Hero
        slug={family.slug}
        icon={members[0].icon}
        name={family.name}
        nameAr={family.nameAr}
        tagline={family.tagline}
        domain={DOMAIN_LABELS.education}
        roleText={`${ROLE_LABELS[family.role]} for ${family.publisher}, ${family.year} to ${Math.max(...members.map((m) => m.year))}`}
        brand={family.brandColor}
        screens={[members[0].screenshots[0], members[3]?.screenshots[0] ?? members[1].screenshots[0]]}
        flat={false}
        titleSize="display"
        badges={
          <ul data-testid="family-members" className="grid gap-4 sm:grid-cols-2">
            {members.map((m) => (
              <li key={m.slug} className="flex items-center gap-3">
                <AppIcon slug={m.slug} src={m.icon} size={44} />
                <div className="min-w-0">
                  <Link href={`/apps/${m.slug}`} className="font-medium underline decoration-1 underline-offset-4">
                    {m.name}
                  </Link>
                  <StoreBadges name={m.name} size="sm" {...storeUrls(m.stores)} inverse={c.dark} className="mt-1.5" />
                </div>
              </li>
            ))}
          </ul>
        }
      />
      <CaseStudyBody
        prev={nav.prev}
        next={nav.next}
        margin={[
          { label: "Role", value: ROLE_LABELS[family.role] },
          { label: "Publisher", value: family.publisher },
          { label: "Apps", value: String(members.length) },
          { label: "Platforms", value: Array.from(platforms).join(" and ") },
          {
            label: "Stack",
            value: (
              <ul className="mt-1 flex flex-wrap gap-1.5">
                {family.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            ),
          },
        ]}
        after={<ScreenshotGallery items={members.map((m) => ({ src: m.screenshots[0], alt: `${m.name} screen` }))} tint={family.brandColor} />}
      >
        <StudySection title="Overview">
          <p className="max-w-[62ch] text-step-1">{family.summary}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-step--1 text-muted">The problem</dt>
              <dd className="mt-1">{family.problem}</dd>
            </div>
            <div>
              <dt className="text-step--1 text-muted">Who it serves</dt>
              <dd className="mt-1">{family.audience}</dd>
            </div>
          </dl>
        </StudySection>

        <StudySection title="My contribution">
          <p className="max-w-[62ch]">{family.contribution}</p>
        </StudySection>

        <StudySection title="What I engineered">
          <Highlights items={family.highlights} />
        </StudySection>

        <StudySection title="Architecture">
          {family.architecture ? <Paragraphs text={family.architecture} /> : null}
          <div className="mt-8">
            <CleanArchitectureDiagram compact />
          </div>
        </StudySection>

        <StudySection title="Features">
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {family.features.map((f) => (
              <li key={f} className="border-t border-rule pt-2">
                {f}
              </li>
            ))}
          </ul>
        </StudySection>

        <StudySection title="Challenges and solutions">
          <Challenges challenges={family.challenges} solutions={family.solutions} />
        </StudySection>

        <StudySection title="Results">
          <ul className="space-y-2">
            {family.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </StudySection>
      </CaseStudyBody>
    </main>
  );
}
