import Link from "next/link";
import { Section } from "@/components/ui/section";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getArtefacts, getArticles, getLearningLog, getTeaching } from "@/lib/content";

function SmartLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  const external = href.startsWith("http");
  return external ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Learning, teaching and explaining, each backed by something you can open. */
export function Growth({ showArticles = true, locale = "en" }: { showArticles?: boolean; locale?: Locale }) {
  const t = getDictionary(locale).growth;
  const teaching = getTeaching(locale);
  const articles = getArticles(locale);
  const learningLog = getLearningLog(locale);
  const artefacts = getArtefacts(locale);
  return (
    <Section id="learning" title={t.title} lede={t.lede}>
      <div className="grid gap-16 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <h3 className="text-step-2">{t.learned}</h3>
          <ol className="mt-6 border-s border-rule">
            {learningLog.map((step) => (
              <li key={step.skill} className="relative grid gap-1 pb-7 ps-6 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-4">
                <span aria-hidden className="absolute -start-[4.5px] top-[0.55em] h-2 w-2 rounded-full bg-laurel" />
                <p className="text-step--1 tabular-nums text-muted sm:pt-0.5">{step.year}</p>
                <div>
                  <p className="font-medium">{step.skill}</p>
                  <p className="mt-1 text-muted">{step.how}</p>
                  <SmartLink href={step.evidence.href} className="link mt-1 inline-block text-step--1">
                    {step.evidence.label}
                  </SmartLink>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="space-y-14 lg:col-span-5">
          <div>
            <h3 className="text-step-2">{t.teaching}</h3>
            <dl className="mt-6 space-y-5">
              {teaching.map((x) => (
                <div key={x.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-t border-rule pt-4">
                  <dt className="text-step-3 font-semibold tracking-tight" dir="ltr">
                    {x.value}
                  </dt>
                  <dd>
                    <span className="font-medium">{x.label}.</span> <span className="text-muted">{x.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-step-2">{t.docs}</h3>
            <ul className="mt-6 space-y-5">
              {artefacts.map((a) => (
                <li key={a.title} className="border-t border-rule pt-4">
                  <p className="font-medium">
                    {a.href ? (
                      <Link href={a.href} className="hover:text-laurel">
                        {a.title}
                      </Link>
                    ) : (
                      a.title
                    )}
                  </p>
                  <p className="mt-1 text-muted">{a.detail}</p>
                  <p className="mt-1 text-step--1 text-muted">{a.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showArticles ? (
        <div id="writing" className="mt-20">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h3 className="text-step-3">{t.writing}</h3>
            <Link href={localeHref(locale, "/writing")} className="link">
              {t.allArticles}
            </Link>
          </div>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule md:grid-cols-2">
            {articles.map((a) => (
              <li key={a.slug} className="bg-paper p-6 md:p-8">
                <p className="text-step--1 text-muted">{t.from(a.source, a.readingMinutes)}</p>
                <h4 className="mt-2 text-step-2">
                  <Link href={localeHref(locale, `/writing/${a.slug}`)} className="hover:text-laurel">
                    {a.title}
                  </Link>
                </h4>
                <p className="mt-2 text-muted">{a.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
