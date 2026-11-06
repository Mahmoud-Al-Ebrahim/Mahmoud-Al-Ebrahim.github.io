import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { Education } from "@/components/sections/education";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { Philosophy } from "@/components/sections/philosophy";
import { TradeOffs } from "@/components/sections/trade-offs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/content/site";
import { getTeaching } from "@/lib/content";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Background, engineering philosophy, worked trade-offs, teaching and education of Mahmoud AlEbrahim, senior Flutter engineer in Aleppo.",
  path: "/about",
});

export default function AboutPage() {
  const teaching = getTeaching();
  return (
    <main id="main">
      <Container className="py-12 md:py-20">
        <h1 className="text-step-5">About</h1>
        <p className="mt-4 max-w-[60ch] text-step-1 text-muted">
          Where the work comes from, how I think about it, and what I have learned teaching it.
        </p>
      </Container>

      <Section id="background" title="Background">
        <div className="prose-journal text-step-1">
          <p>
            I am a software engineer from Aleppo. I studied software engineering at Aleppo University, graduated twelfth in my class in
            2022, and am completing a master&apos;s degree there while working. Competitive programming came first: top ten in the college
            programming competition and two strong years at the Syrian Collegiate Programming Contest taught me to reason about
            algorithms before writing them.
          </p>
          <p>
            I started with Flutter in 2021 as a trainee at 404 Developers, where the emphasis on responsive UI, Clean Architecture and
            test-driven development set the habits I still use. Food-delivery work at Ulu followed, then two years leading a Flutter
            team at Ramaaz in Turkey on eCommerce and delivery products for both stores. At Prootech I led the EdTech family and built
            the Min Bayty marketplace and the Birdy Consults platform. Since January 2026 I have been a senior Flutter developer at KwanX,
            where the Labeeny delivery platform runs on GraphQL and Hasura.
          </p>
          <p>
            Most of the products I build are Arabic-first and run on mid-range Android phones over unreliable networks. That shapes the
            engineering: offline is the default state, every tap must feel instant and then reconcile honestly, and monetization often
            means prepaid codes rather than card payments.
          </p>
        </div>
      </Section>

      <ExperienceTimeline compact={false} />

      <Section
        id="philosophy"
        title="Engineering philosophy"
        lede="Six principles, each with a place in the code where it is visible."
      >
        <Philosophy />
      </Section>

      <Section
        id="trade-offs"
        title="How I solve problems"
        lede="Three decisions written out the way they were made: the situation, the options, the choice and what it cost."
      >
        <TradeOffs />
      </Section>

      <Section
        id="teaching"
        title="Learning and teaching"
        lede="Since 2018 I have taught Flutter, web development, algorithms and data structures to more than a thousand students and mentored the developers I ship with."
      >
        <div className="grid gap-10 md:grid-cols-12">
          <dl className="space-y-5 md:col-span-4">
            {teaching.map((t) => (
              <div key={t.label} className="border-t border-rule pt-4">
                <dt className="text-step--1 text-muted">{t.label}</dt>
                <dd className="font-display text-step-3">{t.value}</dd>
                <dd className="text-muted">{t.detail}</dd>
              </div>
            ))}
          </dl>
          <div className="prose-journal md:col-span-7 md:col-start-6">
            <p>
              Teaching is how I check my own understanding. A pattern I cannot explain to a first-year student in ten minutes is a pattern I
              do not fully understand yet. The generic repository wrapper, the per-item optimistic state maps and the architecture-guard
              tests all started as explanations to someone else.
            </p>
            <p>
              Mentoring on real products is different from a classroom. With the twenty-odd junior developers I have worked with, the
              method is the same each time: pair on the first feature, review every pull request with reasons rather than rules, and hand
              over ownership of a module as soon as they can explain its boundaries. Five graduation projects at Aleppo University went
              through the same loop, from scoping to defense.
            </p>
            <p>
              Learning runs the other way too. Riverpod and fpdart in Revo, GraphQL subscriptions at KwanX, and the CLIP tokenizer in
              Gallery AI were each picked up on a live project, and the <Link href="/writing" className="text-laurel underline">articles</Link>{" "}
              are the notes I would have wanted at the start.
            </p>
          </div>
        </div>
      </Section>

      <Section id="education" title="Education and awards">
        <Education />
        <p className="mt-8 text-muted">
          Languages: Arabic (native), English (professional working proficiency). Based in {siteConfig.location}.
        </p>
      </Section>
    </main>
  );
}
