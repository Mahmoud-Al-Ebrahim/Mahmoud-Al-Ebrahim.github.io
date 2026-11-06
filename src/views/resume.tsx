import type { Metadata } from "next";
import { IconDownload } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { formatMonth, localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getAwards, getEducation, getExperience, getLanguages, getSite, getSkills } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function resumeMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).resumePage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/resume"), locale });
}

export function ResumeView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).resumePage;
  const site = getSite(locale);
  const experience = getExperience(locale);
  const education = getEducation(locale);
  const comma = locale === "ar" ? "، " : ", ";
  const fmt = (ym: string) => formatMonth(ym, locale, t.present);
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="text-step-5">{t.title}</h1>
          <p className="mt-3 max-w-[60ch] text-step-1 text-muted">{t.intro(siteConfig.name, site.location)}</p>
        </div>
        <div className="flex flex-col items-start gap-2">
          <Button href={siteConfig.resumePath} download>
            <IconDownload /> {t.download}
          </Button>
          {t.pdfNote ? <p className="text-step--1 text-muted">{t.pdfNote}</p> : null}
        </div>
      </div>

      <section aria-labelledby="r-exp" className="mt-14">
        <h2 id="r-exp" className="text-step-3">
          {t.experience}
        </h2>
        <ol className="mt-6 divide-y divide-rule border-y border-rule">
          {experience.map((e) => (
            <li key={`${e.company}-${e.start}`} className="grid gap-2 py-6 md:grid-cols-12 md:gap-8">
              <p className="font-mono text-step--1 text-muted md:col-span-3">
                {fmt(e.start)} – {fmt(e.end)}
              </p>
              <div className="md:col-span-9">
                <h3 className="text-step-1">
                  {e.role} <span className="text-muted">· <bdi>{e.company}</bdi></span>
                </h3>
                <p className="text-step--1 text-muted">{e.location}</p>
                <ul className="mt-3 list-disc space-y-1.5 ps-5 text-muted">
                  {e.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="r-skills" className="mt-14">
        <h2 id="r-skills" className="text-step-3">
          {t.skills}
        </h2>
        <dl className="mt-6 grid gap-x-10 gap-y-5 md:grid-cols-2">
          {getSkills(locale).map((s) => (
            <div key={s.group} className="border-t border-rule pt-3">
              <dt className="text-step--1 text-muted">{s.group}</dt>
              <dd className="mt-1">{s.items.join(comma)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <section aria-labelledby="r-edu">
          <h2 id="r-edu" className="text-step-3">
            {t.education}
          </h2>
          <ul className="mt-6 space-y-4">
            {education.map((e) => (
              <li key={e.degree}>
                <p className="text-step-1">{e.degree}</p>
                <p className="text-muted">
                  {e.institution}
                  {comma}
                  {e.start}–{e.end}
                  {e.note ? ` · ${e.note}` : ""}
                </p>
              </li>
            ))}
          </ul>
          <h3 className="mt-8 text-step-1">{t.awards}</h3>
          <ul className="mt-2 space-y-1 text-muted">
            {getAwards(locale).map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
        <section aria-labelledby="r-lang">
          <h2 id="r-lang" className="text-step-3">
            {t.languages}
          </h2>
          <dl className="mt-6 space-y-3">
            {getLanguages(locale).map((l) => (
              <div key={l.name}>
                <dt className="text-step-1">{l.name}</dt>
                <dd className="text-muted">{l.level}</dd>
              </div>
            ))}
          </dl>
          <h3 className="mt-8 text-step-1">{t.contact}</h3>
          <p className="mt-2 text-muted">
            <a href={`mailto:${siteConfig.email}`} className="text-laurel underline">
              {siteConfig.email}
            </a>
            <br />
            <span dir="ltr">{siteConfig.phone}</span>
          </p>
        </section>
      </div>
    </Container>
  );
}
