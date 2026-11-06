import Link from "next/link";
import { localName } from "@/components/ui/arabic-name";
import { localeHref, LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getFeaturedApps, getFeaturedProjects } from "@/lib/content";

/** The 404 message and the most useful links, in one language. */
export function NotFoundBlock({ locale, headingLevel = 1 }: { locale: Locale; headingLevel?: 1 | 2 }) {
  const t = getDictionary(locale).notFound;
  const apps = getFeaturedApps(locale);
  const projects = getFeaturedProjects(locale);
  const Title = headingLevel === 1 ? "h1" : "h2";
  const Sub = headingLevel === 1 ? "h2" : "h3";
  const meta = LOCALE_META[locale];
  return (
    <section lang={meta.lang} dir={meta.dir} aria-labelledby={`nf-${locale}`}>
      <p className="eyebrow">{t.eyebrow}</p>
      <Title id={`nf-${locale}`} className="mt-3 text-step-5">
        {t.title}
      </Title>
      <p className="mt-4 max-w-[56ch] text-step-1 text-muted">{t.lede}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          <Sub className="text-step-2">
            <Link href={localeHref(locale, "/apps")} className="hover:text-laurel">
              {t.apps}
            </Link>
          </Sub>
          <ul className="mt-3 space-y-1">
            {apps.map((a) => (
              <li key={a.slug}>
                <Link href={localeHref(locale, `/apps/${a.slug}`)} className="text-laurel underline">
                  {localName(a, locale)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <Sub className="text-step-2">
            <Link href={localeHref(locale, "/projects")} className="hover:text-laurel">
              {t.projects}
            </Link>
          </Sub>
          <ul className="mt-3 space-y-1">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link href={localeHref(locale, `/projects/${p.slug}`)} className="text-laurel underline">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-10">
        <Link href={localeHref(locale, "/")} className="text-laurel underline">
          {t.home}
        </Link>
      </p>
    </section>
  );
}
