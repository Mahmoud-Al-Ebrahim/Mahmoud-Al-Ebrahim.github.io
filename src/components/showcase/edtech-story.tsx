"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PhoneFrame } from "@/components/ui/phone-frame";
import { StoreBadges } from "@/components/ui/store-badges";
import { ArabicName } from "@/components/ui/arabic-name";
import { cn } from "@/lib/cn";

export type StoryChapter = {
  slug: string;
  name: string;
  nameAr?: string;
  icon: string;
  tagline: string;
  highlights: string[];
  roleText: string;
  screen: string;
  colors: { bg: string; fg: string; muted: string; dark: boolean };
  stores: { play?: { url: string }; appStore?: { url: string } };
};

/**
 * A scroll-driven story of one product family. The phone stays in place on
 * desktop while each app's chapter scrolls past; the screen and the band's
 * color follow the chapter in view. Nothing is hijacked: it is ordinary
 * scrolling, observed. On phones each chapter carries its own screen.
 */
export function EdTechStory({
  familyName,
  familyNameAr,
  familyTagline,
  familyHighlights,
  familyHref,
  chapters,
}: {
  familyName: string;
  familyNameAr?: string;
  familyTagline: string;
  familyHighlights: string[];
  familyHref: string;
  chapters: StoryChapter[];
}) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const c = chapters[active].colors;

  return (
    <article
      aria-labelledby="show-fahim-edtech"
      data-testid="composition-fahim-edtech"
      className="relative transition-colors duration-700"
      style={{ background: c.bg, color: c.fg, ["--muted" as string]: c.muted }}
    >
      <div className="mx-auto grid w-full max-w-(--wide) gap-8 px-gutter md:grid-cols-12">
        <div className="hidden md:col-span-5 md:block">
          <div className="sticky top-16 flex h-[calc(100svh-4rem)] items-center justify-center">
            <div className="relative w-[280px]" style={{ aspectRatio: "9 / 19.5" }}>
              {chapters.map((ch, i) => (
                <div
                  key={ch.slug}
                  aria-hidden={i !== active}
                  className="absolute inset-0 transition-[opacity,transform] duration-700"
                  style={{ opacity: i === active ? 1 : 0, transform: i === active ? "none" : "translateY(24px) scale(0.97)" }}
                >
                  <PhoneFrame src={ch.screen} alt={i === active ? `${ch.name} screen` : ""} width={280} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <header className="flex min-h-[60svh] flex-col justify-center py-20">
            <p className="text-step--1" style={{ color: c.muted }}>
              Four apps, one platform
            </p>
            <ArabicName as="h3" id="show-fahim-edtech" size="display" latin={familyName} arabic={familyNameAr} className="mt-3" />
            <p className="mt-4 max-w-[34ch] text-step-2 font-[400]">{familyTagline}</p>
            <ul className="mt-8 max-w-[48ch] space-y-3 border-t pt-5" style={{ borderColor: c.dark ? "rgba(255,255,255,0.25)" : "rgba(18,19,20,0.18)" }} aria-label="What I engineered">
              {familyHighlights.map((h) => (
                <li key={h} className="grid grid-cols-[1rem_1fr] gap-2">
                  <span aria-hidden className="mt-[0.7em] h-px w-3 bg-current" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <Link href={familyHref} className="mt-8 font-medium underline decoration-1 underline-offset-4 hover:decoration-2">
              Read the platform case study
            </Link>
          </header>

          <ol aria-label="Apps in this family">
            {chapters.map((ch, i) => (
              <li
                key={ch.slug}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[72svh] flex-col justify-center border-t py-16"
                style={{ borderColor: c.dark ? "rgba(255,255,255,0.25)" : "rgba(18,19,20,0.18)" }}
              >
                <div className="flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={ch.icon} alt="" width={52} height={52} className="h-[52px] w-[52px] rounded-[22%] ring-1 ring-black/10" loading="lazy" />
                  <p className="text-step--1 tabular-nums" style={{ color: c.muted }}>
                    {String(i + 1).padStart(2, "0")} of {String(chapters.length).padStart(2, "0")}
                  </p>
                </div>
                <h4 className="mt-5 text-step-4">
                  <ArabicName latin={ch.name} arabic={ch.nameAr} />
                </h4>
                <p className="mt-3 max-w-[36ch] text-step-1">{ch.tagline}</p>
                <p className="mt-3 text-step--1" style={{ color: c.muted }}>
                  {ch.roleText}
                </p>
                <ul className="mt-5 max-w-[46ch] space-y-2">
                  {ch.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1rem_1fr] gap-2">
                      <span aria-hidden className="mt-[0.7em] h-px w-3 bg-current" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 md:hidden">
                  <PhoneFrame src={ch.screen} alt={`${ch.name} screen`} width={220} className="w-[62%]" />
                </div>
                <div className={cn("mt-7 flex flex-wrap items-center gap-x-6 gap-y-4")}>
                  <StoreBadges name={ch.name} {...ch.stores} size="sm" inverse={c.dark} />
                  <Link href={`/apps/${ch.slug}`} className="underline decoration-1 underline-offset-4 hover:decoration-2">
                    {ch.name} details
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </article>
  );
}
