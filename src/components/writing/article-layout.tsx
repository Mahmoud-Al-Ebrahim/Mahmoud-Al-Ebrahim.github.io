import type { ReactNode } from "react";
import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { getArticle } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export function ArticleLayout({ slug, children }: { slug: string; children: ReactNode }) {
  const article = getArticle(slug);
  if (!article) throw new Error(`[writing] no article indexed for slug "${slug}"`);
  const ld = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.summary,
    datePublished: article.date,
    author: { "@type": "Person", name: siteConfig.name, url: siteConfig.url },
    url: absoluteUrl(`/writing/${slug}`),
  };
  return (
    <Container as="main" id="main" className="py-16 md:py-24">
      <JsonLd data={ld} />
      <article className="grid gap-10 md:grid-cols-12">
        <header className="md:col-span-3">
          <p className="eyebrow">Writing</p>
          <h1 className="mt-3 text-step-4 md:text-step-3">{article.title}</h1>
          <dl className="mt-6 space-y-2 text-step--1 text-muted">
            <div>
              <dt className="sr-only">Published</dt>
              <dd>{formatDate(article.date)}</dd>
            </div>
            <div>
              <dt className="sr-only">Reading time</dt>
              <dd>{article.readingMinutes} minute read</dd>
            </div>
            <div>
              <dt className="inline">Source: </dt>
              <dd className="inline">{article.source}</dd>
            </div>
          </dl>
        </header>
        <div className="prose-journal md:col-span-8 md:col-start-5">{children}</div>
      </article>
    </Container>
  );
}
