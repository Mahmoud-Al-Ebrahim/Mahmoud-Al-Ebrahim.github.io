import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { formatDate, localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getArticle } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

export function ArticleLayout({ slug, children, locale = "en" }: { slug: string; children: ReactNode; locale?: Locale }) {
  const article = getArticle(slug, locale);
  const t = getDictionary(locale).article;
  if (!article) throw new Error(`[writing] no article indexed for slug "${slug}"`);
  const ld = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    inLanguage: locale,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: absoluteUrl(localeHref(locale, `/writing/${slug}`)),
  };
  return (
    <Container as="main" id="main" className="py-16 md:py-24">
      <JsonLd data={ld} />
      <article className="grid gap-10 md:grid-cols-12">
        <header className="md:col-span-3">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1 className="mt-3 text-step-4 md:text-step-3">{article.title}</h1>
          <dl className="mt-6 space-y-2 text-step--1 text-muted">
            <div>
              <dt className="sr-only">{t.published}</dt>
              <dd>{formatDate(article.date, locale)}</dd>
            </div>
            <div>
              <dt className="sr-only">{t.readingTime}</dt>
              <dd>{t.minuteRead(article.readingMinutes)}</dd>
            </div>
            <div>
              <dt className="inline">{t.source}</dt>
              <dd className="inline">{article.source}</dd>
            </div>
          </dl>
          {t.note ? <p className="mt-6 text-step--1 text-muted">{t.note}</p> : null}
        </header>
        <div className="prose-journal md:col-span-8 md:col-start-5">{children}</div>
      </article>
    </Container>
  );
}
