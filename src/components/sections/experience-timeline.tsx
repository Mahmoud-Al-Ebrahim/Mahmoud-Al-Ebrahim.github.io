import Link from "next/link";
import { Section } from "@/components/ui/section";
import { formatMonth, localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getExperience } from "@/lib/content";

export function ExperienceTimeline({ compact = true, locale = "en" }: { compact?: boolean; locale?: Locale }) {
  const entries = getExperience(locale);
  const t = getDictionary(locale).experience;
  const fmt = (ym: string) => formatMonth(ym, locale, t.now);
  return (
    <Section
      id="experience"
      title={t.title}
      layout="split"
      lede={t.lede}
      aside={
        compact ? (
          <Link href={localeHref(locale, "/resume")} className="link">
            {t.fullResume}
          </Link>
        ) : null
      }
    >
      <ol className="divide-y divide-rule border-y border-rule">
        {entries.map((e) => (
          <li key={`${e.company}-${e.start}`} className="grid gap-2 py-6 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
            <p className="text-step--1 tabular-nums text-muted sm:pt-1">
              <time dateTime={e.start}>{fmt(e.start)}</time> {t.to} {e.end === "present" ? t.now : <time dateTime={e.end}>{fmt(e.end)}</time>}
            </p>
            <div>
              <h3 className="text-step-1">
                {e.role}
                {locale === "ar" ? "، " : ", "}
                <bdi className="font-[400]">{e.company}</bdi>
              </h3>
              <p className="text-step--1 text-muted">{e.location}</p>
              <ul className="mt-3 max-w-[64ch] space-y-1.5 text-muted">
                {(compact ? e.bullets.slice(0, 1) : e.bullets).map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
