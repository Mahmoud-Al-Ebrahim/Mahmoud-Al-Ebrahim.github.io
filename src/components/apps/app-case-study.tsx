import Link from "next/link";
import { Challenges } from "@/components/case-study/challenges";
import { CaseStudyBody, Crumb, StudySection } from "@/components/case-study/case-study-layout";
import { ScreenshotGallery } from "@/components/case-study/screenshot-gallery";
import { CleanArchitectureDiagram } from "@/components/diagrams/clean-architecture";
import { panelColors } from "@/components/showcase/panel";
import { AppIcon } from "@/components/ui/app-icon";
import { ArabicName, localName } from "@/components/ui/arabic-name";
import { Container } from "@/components/ui/container";
import { Paragraphs } from "@/components/ui/paragraphs";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { StoreBadges } from "@/components/ui/store-badges";
import { Tag } from "@/components/ui/tag";
import type { Product, ProductFamily } from "@/content/schema";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getAppEntry, getFamilyMembers, getProducts } from "@/lib/content";
import { storeUrls } from "@/lib/stores";

/** Products in collection order; the case-study prev/next walks this list. */
const ORDER = ["labeeny", "captain-labeeny", "fahim-edtech", "fahim-bac", "fahim-uni", "atmtha", "coursaty", "min-bayty", "birdy-consults", "sayed", "assas", "zaman-alwasel"];

function neighbors(slug: string, locale: Locale) {
  const i = ORDER.indexOf(slug);
  const at = (j: number) => {
    const e = j >= 0 && j < ORDER.length ? getAppEntry(ORDER[j], locale) : undefined;
    return e ? { href: localeHref(locale, `/apps/${e.slug}`), label: localName(e, locale) } : undefined;
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

function StackTags({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-1 flex flex-wrap gap-1.5">
      {stack.map((s) => (
        <li key={s}>
          <Tag>{s}</Tag>
        </li>
      ))}
    </ul>
  );
}

function joinList(items: string[], locale: Locale): string {
  const and = getDictionary(locale).and;
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(locale === "ar" ? "، " : ", ")}${and}${items[items.length - 1]}`;
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
  locale,
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
  locale: Locale;
}) {
  const c = panelColors(brand);
  const t = getDictionary(locale);
  return (
    <header className="relative overflow-hidden" style={{ background: c.bg, color: c.fg, ["--muted" as string]: c.muted }}>
      <Container width="wide" className="grid gap-10 pt-10 md:grid-cols-12 md:gap-8 md:pt-14">
        <div className="pb-14 md:col-span-7 md:pb-20">
          <Crumb href={localeHref(locale, "/apps")} label={t.app.crumb} current={domain} locale={locale} />
          <div className="mt-10">
            <AppIcon slug={slug} src={icon} size={84} priority />
          </div>
          <ArabicName as="h1" size={titleSize} latin={name} arabic={nameAr} locale={locale} className="mt-6 leading-[0.95]" />
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

export function AppCaseStudy({ slug, locale = "en" }: { slug: string; locale?: Locale }) {
  const entry = getAppEntry(slug, locale);
  if (!entry) throw new Error(`[apps] unknown slug ${slug}`);
  return entry.kind === "family" ? <FamilyStudy family={entry} locale={locale} /> : <ProductStudy product={entry} locale={locale} />;
}

function ProductStudy({ product, locale }: { product: Product; locale: Locale }) {
  const t = getDictionary(locale);
  const family = product.family ? getAppEntry(product.family, locale) : undefined;
  const nav = neighbors(product.slug, locale);
  const c = panelColors(product.brandColor);
  const role = product.roleLabel ?? t.roles[product.role];
  const roleText = t.app.roleLine(role, product.publisher, product.year);
  const platforms = joinList([product.stores.appStore && "iOS", product.stores.play && "Android"].filter(Boolean) as string[], locale);
  const sibling = product.slug === "labeeny" ? getProducts(locale).find((p) => p.slug === "captain-labeeny") : undefined;
  const shown = localName(product, locale);

  return (
    <main id="main">
      <Hero
        slug={product.slug}
        icon={product.icon}
        name={product.name}
        nameAr={product.nameAr}
        tagline={product.tagline}
        domain={t.domains[product.domain]}
        roleText={roleText}
        brand={product.brandColor}
        screens={sibling ? [product.screenshots[1] ?? product.screenshots[0], sibling.screenshots[0]] : product.screenshots}
        flat={product.screenshotStyle === "flat"}
        badges={<StoreBadges name={shown} locale={locale} {...storeUrls(product.stores)} inverse={c.dark} />}
        locale={locale}
      />
      <CaseStudyBody
        locale={locale}
        prev={nav.prev}
        next={nav.next}
        margin={[
          { label: t.app.role, value: role },
          { label: t.app.publisher, value: product.publisher },
          { label: t.app.platforms, value: platforms },
          { label: t.app.year, value: String(product.year) },
          ...(family
            ? [
                {
                  label: t.app.partOf,
                  value: (
                    <Link href={localeHref(locale, `/apps/${family.slug}`)} className="link">
                      {localName(family, locale)}
                    </Link>
                  ),
                },
              ]
            : []),
          { label: t.app.stack, value: <StackTags stack={product.stack} /> },
        ]}
        after={
          <ScreenshotGallery
            label={t.caseStudy.screens}
            items={product.screenshots.map((s, i) => ({ src: s, alt: t.screenN(shown, i + 1) }))}
            tint={product.brandColor}
            flat={product.screenshotStyle === "flat"}
          />
        }
      >
        <StudySection title={t.app.overview}>
          <p className="max-w-[62ch] text-step-1">{product.summary}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-step--1 text-muted">{t.app.problem}</dt>
              <dd className="mt-1">{product.problem}</dd>
            </div>
            <div>
              <dt className="text-step--1 text-muted">{t.app.audience}</dt>
              <dd className="mt-1">{product.audience}</dd>
            </div>
          </dl>
        </StudySection>

        <StudySection title={t.app.contribution}>
          <p className="max-w-[62ch]">{product.contribution}</p>
        </StudySection>

        <StudySection title={t.whatIEngineered}>
          <Highlights items={product.highlights} />
        </StudySection>

        <StudySection title={t.app.architecture}>
          {product.architecture ? (
            <Paragraphs text={product.architecture} />
          ) : family ? (
            <p className="max-w-[62ch]">
              {t.app.sharedArchitecture[0]}
              <Link href={localeHref(locale, `/apps/${family.slug}`)} className="link">
                {t.app.familyCaseStudy(localName(family, locale))}
              </Link>
              {t.app.sharedArchitecture[1]}
            </p>
          ) : (
            <p className="max-w-[62ch] text-muted">{t.app.builtWith(product.stack.join(", "))}</p>
          )}
        </StudySection>

        <StudySection title={t.app.features}>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="border-t border-rule pt-2">
                {f}
              </li>
            ))}
          </ul>
        </StudySection>

        {product.challenges.length > 0 ? (
          <StudySection title={t.app.challenges}>
            <Challenges challenges={product.challenges} solutions={product.solutions} locale={locale} />
          </StudySection>
        ) : null}

        <StudySection title={t.app.results}>
          <ul className="space-y-2">
            {product.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </StudySection>

        {product.related?.length ? (
          <StudySection title={t.app.related}>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {product.related.map((r) => {
                const e = getAppEntry(r, locale);
                return e ? (
                  <li key={r}>
                    <Link href={localeHref(locale, `/apps/${e.slug}`)} className="link">
                      {localName(e, locale)}
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

function FamilyStudy({ family, locale }: { family: ProductFamily; locale: Locale }) {
  const t = getDictionary(locale);
  const members = getFamilyMembers(family, locale);
  const nav = neighbors(family.slug, locale);
  const platforms = new Set<string>();
  for (const m of members) {
    if (m.stores.appStore) platforms.add("iOS");
    if (m.stores.play) platforms.add("Android");
  }
  const c = panelColors(family.brandColor);
  const role = t.roles[family.role];
  return (
    <main id="main">
      <Hero
        slug={family.slug}
        icon={members[0].icon}
        name={family.name}
        nameAr={family.nameAr}
        tagline={family.tagline}
        domain={t.domains.education}
        roleText={t.app.roleRange(role, family.publisher, family.year, Math.max(...members.map((m) => m.year)))}
        brand={family.brandColor}
        screens={[members[0].screenshots[0], members[3]?.screenshots[0] ?? members[1].screenshots[0]]}
        flat={false}
        titleSize="display"
        locale={locale}
        badges={
          <ul data-testid="family-members" className="grid gap-4 sm:grid-cols-2">
            {members.map((m) => (
              <li key={m.slug} className="flex items-center gap-3">
                <AppIcon slug={m.slug} src={m.icon} size={44} />
                <div className="min-w-0">
                  <Link href={localeHref(locale, `/apps/${m.slug}`)} className="font-medium underline decoration-1 underline-offset-4">
                    {localName(m, locale)}
                  </Link>
                  <StoreBadges name={localName(m, locale)} locale={locale} size="sm" {...storeUrls(m.stores)} inverse={c.dark} className="mt-1.5" />
                </div>
              </li>
            ))}
          </ul>
        }
      />
      <CaseStudyBody
        locale={locale}
        prev={nav.prev}
        next={nav.next}
        margin={[
          { label: t.app.role, value: role },
          { label: t.app.publisher, value: family.publisher },
          { label: t.app.apps, value: String(members.length) },
          { label: t.app.platforms, value: joinList(Array.from(platforms), locale) },
          { label: t.app.stack, value: <StackTags stack={family.stack} /> },
        ]}
        after={
          <ScreenshotGallery
            label={t.caseStudy.screens}
            items={members.map((m) => ({ src: m.screenshots[0], alt: t.screen(localName(m, locale)) }))}
            tint={family.brandColor}
          />
        }
      >
        <StudySection title={t.app.overview}>
          <p className="max-w-[62ch] text-step-1">{family.summary}</p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-step--1 text-muted">{t.app.problem}</dt>
              <dd className="mt-1">{family.problem}</dd>
            </div>
            <div>
              <dt className="text-step--1 text-muted">{t.app.audience}</dt>
              <dd className="mt-1">{family.audience}</dd>
            </div>
          </dl>
        </StudySection>

        <StudySection title={t.app.contribution}>
          <p className="max-w-[62ch]">{family.contribution}</p>
        </StudySection>

        <StudySection title={t.whatIEngineered}>
          <Highlights items={family.highlights} />
        </StudySection>

        <StudySection title={t.app.architecture}>
          {family.architecture ? <Paragraphs text={family.architecture} /> : null}
          <div className="mt-8">
            <CleanArchitectureDiagram compact locale={locale} />
          </div>
        </StudySection>

        <StudySection title={t.app.features}>
          <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {family.features.map((f) => (
              <li key={f} className="border-t border-rule pt-2">
                {f}
              </li>
            ))}
          </ul>
        </StudySection>

        <StudySection title={t.app.challenges}>
          <Challenges challenges={family.challenges} solutions={family.solutions} locale={locale} />
        </StudySection>

        <StudySection title={t.app.results}>
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
