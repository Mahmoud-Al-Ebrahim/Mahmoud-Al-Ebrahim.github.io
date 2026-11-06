import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { formatDate, localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getArticles } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function writingMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).writingPage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/writing"), locale });
}

export function WritingView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).writingPage;
  const articles = getArticles(locale);
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">{t.title}</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">{t.lede}</p>
      <ul className="mt-10 divide-y divide-rule border-y border-rule">
        {articles.map((a) => (
          <li key={a.slug} className="grid gap-3 py-8 md:grid-cols-12 md:gap-8">
            <div className="text-step--1 text-muted md:col-span-3">
              <p>{formatDate(a.date, locale)}</p>
              <p>
                <bdi>{a.source}</bdi> · {t.minutes(a.readingMinutes)}
              </p>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-step-2">
                <Link href={localeHref(locale, `/writing/${a.slug}`)} className="hover:text-laurel">
                  {a.title}
                </Link>
              </h2>
              <p className="mt-2 max-w-[62ch] text-muted">{a.summary}</p>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
