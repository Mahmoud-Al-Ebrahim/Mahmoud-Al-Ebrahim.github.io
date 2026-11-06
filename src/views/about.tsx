import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Education } from "@/components/sections/education";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Philosophy } from "@/components/sections/philosophy";
import { TradeOffs } from "@/components/sections/trade-offs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getAbout, getLanguages, getSite, getTeaching } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function aboutMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).aboutPage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/about"), locale });
}

/** Turns the last occurrence of `word` in a paragraph into a link. */
function linkWord(text: string, word: string, href: string): ReactNode {
  const i = text.lastIndexOf(word);
  if (i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <Link href={href} className="text-laurel underline">
        {word}
      </Link>
      {text.slice(i + word.length)}
    </>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).aboutPage;
  const teaching = getTeaching(locale);
  const about = getAbout(locale);
  const site = getSite(locale);
  const langs = getLanguages(locale)
    .map((l) => `${l.name} (${locale === "en" ? l.level.toLowerCase() : l.level})`)
    .join(locale === "ar" ? "، " : ", ");
  return (
    <main id="main">
      <Container className="py-12 md:py-20">
        <h1 className="text-step-5">{t.title}</h1>
        <p className="mt-4 max-w-[60ch] text-step-1 text-muted">{t.lede}</p>
      </Container>

      <Section id="background" title={t.background}>
        <div className="prose-journal text-step-1">
          {about.background.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      </Section>

      <ExperienceTimeline compact={false} locale={locale} />

      <Section id="philosophy" title={t.philosophy} lede={t.philosophyLede}>
        <Philosophy locale={locale} />
      </Section>

      <Section id="trade-offs" title={t.tradeOffs} lede={t.tradeOffsLede}>
        <TradeOffs locale={locale} />
      </Section>

      <Section id="teaching" title={t.teaching} lede={t.teachingLede}>
        <div className="grid gap-10 md:grid-cols-12">
          <dl className="space-y-5 md:col-span-4">
            {teaching.map((x) => (
              <div key={x.label} className="border-t border-rule pt-4">
                <dt className="text-step--1 text-muted">{x.label}</dt>
                <dd className="font-display text-step-3" dir="ltr">
                  {x.value}
                </dd>
                <dd className="text-muted">{x.detail}</dd>
              </div>
            ))}
          </dl>
          <div className="prose-journal md:col-span-7 md:col-start-6">
            {about.teaching.map((p, i) => (
              <p key={p.slice(0, 32)}>{i === about.teaching.length - 1 ? linkWord(p, t.articlesWord, localeHref(locale, "/writing")) : p}</p>
            ))}
          </div>
        </div>
      </Section>

      <Section id="education" title={t.education}>
        <Education locale={locale} />
        <p className="mt-8 text-muted">{t.languagesLine(langs, site.location)}</p>
      </Section>
    </main>
  );
}
