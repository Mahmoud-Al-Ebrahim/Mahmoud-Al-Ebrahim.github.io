import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";

export function ContactCta() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="night py-24 md:py-32">
      <Container width="wide">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-8">
            <h2 id="contact-title" className="text-step-5">
              Contact
            </h2>
            <p className="mt-6 max-w-[40ch] text-step-2 font-[400]">
              Building a Flutter product that has to ship, scale, and be maintained by a team? I would like to hear about it.
            </p>
            <p className="mt-4 text-muted">{siteConfig.availability}</p>
          </div>
          <div className="flex flex-col items-start gap-3 self-end md:col-span-4">
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 rounded-full bg-night-ink px-5 py-2.5 font-medium text-night transition-opacity hover:opacity-85">
              <IconMail /> {siteConfig.email}
            </a>
            <div className="flex flex-wrap gap-3">
              <Button href={siteConfig.linkedin} variant="secondary" external>
                <IconLinkedIn /> LinkedIn
              </Button>
              <Button href={siteConfig.github} variant="secondary" external>
                <IconGitHub /> GitHub
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
