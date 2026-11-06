import type { Metadata } from "next";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { localeHref, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getSite } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export function contactMetadata(locale: Locale): Metadata {
  const t = getDictionary(locale).contactPage;
  return buildMetadata({ title: t.title, description: t.description, path: localeHref(locale, "/contact"), locale });
}

export function ContactView({ locale }: { locale: Locale }) {
  const t = getDictionary(locale).contactPage;
  const site = getSite(locale);
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">{t.title}</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">{site.availability}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="prose-journal">{t.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${siteConfig.email}`}>
              <IconMail /> <span dir="ltr">{siteConfig.email}</span>
            </Button>
            <Button href={siteConfig.linkedin} variant="secondary" external>
              <IconLinkedIn /> LinkedIn
            </Button>
            <Button href={siteConfig.github} variant="secondary" external>
              <IconGitHub /> GitHub
            </Button>
          </div>
        </div>
        <dl className="space-y-4 md:col-span-4 md:col-start-9">
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">{t.basedIn}</dt>
            <dd>{site.location}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">{t.currently}</dt>
            <dd>{site.currentRole}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">{t.phone}</dt>
            <dd>
              <span dir="ltr">{siteConfig.phone}</span>
            </dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">{t.resume}</dt>
            <dd>
              <a href={siteConfig.resumePath} download className="text-laurel underline">
                {t.download}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
