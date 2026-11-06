import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Mahmoud AlEbrahim about senior Flutter and mobile-architecture roles.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container as="main" id="main" className="py-12 md:py-20">
      <h1 className="text-step-5">Contact</h1>
      <p className="mt-4 max-w-[60ch] text-step-1 text-muted">{siteConfig.availability}</p>
      <div className="mt-10 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="prose-journal">
            Email is the fastest way to reach me. Tell me what you are building, the platforms you ship to, and what a good outcome looks
            like in three months; I reply within two working days. For a quick look at the work first, the apps collection has store
            links and the projects have case studies.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${siteConfig.email}`}>
              <IconMail /> {siteConfig.email}
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
            <dt className="text-step--1 text-muted">Based in</dt>
            <dd>{siteConfig.location}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">Currently</dt>
            <dd>{siteConfig.currentRole}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">Phone</dt>
            <dd>{siteConfig.phone}</dd>
          </div>
          <div className="border-t border-rule pt-3">
            <dt className="text-step--1 text-muted">Résumé</dt>
            <dd>
              <a href={siteConfig.resumePath} download className="text-laurel underline">
                Download the PDF
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </Container>
  );
}
