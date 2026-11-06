import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { StoreBadges } from "@/components/ui/store-badges";
import { ArabicName, localName } from "@/components/ui/arabic-name";
import { AppIcon } from "@/components/ui/app-icon";
import type { Role, StoreLinks } from "@/content/schema";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { mutedOn, ON_DARK, panelBg, textOn } from "@/lib/color";
import { storeUrls } from "@/lib/stores";
import { cn } from "@/lib/cn";

export function panelColors(brand: string) {
  const bg = panelBg(brand);
  const fg = textOn(bg);
  return { bg, fg, muted: mutedOn(bg), dark: fg === ON_DARK };
}

/** A full-bleed band in a product's own color. */
export function Panel({
  brand,
  children,
  className,
  id,
  labelledBy,
  style,
}: {
  brand: string;
  children: ReactNode;
  className?: string;
  id?: string;
  labelledBy?: string;
  style?: CSSProperties;
}) {
  const c = panelColors(brand);
  return (
    <article
      id={id}
      aria-labelledby={labelledBy}
      className={cn("relative overflow-hidden", className)}
      style={{ background: c.bg, color: c.fg, ["--muted" as string]: c.muted, ["--laurel" as string]: c.fg, ...style }}
    >
      <Container width="wide">{children}</Container>
    </article>
  );
}

/** The text block of a showcase: identity, purpose, engineering, proof, links. */
export function PanelText({
  slug,
  icon,
  name,
  nameAr,
  tagline,
  highlights,
  role,
  roleLabel,
  publisher,
  stores,
  brand,
  href,
  headingId,
  extra,
  compact = false,
  locale = "en",
}: {
  locale?: Locale;
  slug: string;
  icon: string;
  name: string;
  nameAr?: string;
  tagline: string;
  highlights: string[];
  role: Role;
  roleLabel?: string;
  publisher: string;
  stores?: StoreLinks;
  brand: string;
  href: string;
  headingId: string;
  extra?: ReactNode;
  compact?: boolean;
}) {
  const c = panelColors(brand);
  const t = getDictionary(locale);
  const shown = localName({ name, nameAr }, locale);
  return (
    <div>
      <AppIcon slug={slug} src={icon} size={compact ? 52 : 64} morph={false} />
      <ArabicName as="h3" id={headingId} size={compact ? "title" : "display"} latin={name} arabic={nameAr} locale={locale} className="mt-5" />
      <p className={cn("mt-3 max-w-[30ch] font-[400]", compact ? "text-step-1" : "text-step-2")} style={{ color: c.fg }}>
        {tagline}
      </p>
      <p className="mt-4 text-step--1" style={{ color: c.muted }}>
        {t.roleFor(roleLabel ?? t.roles[role], publisher)}
      </p>
      <ul className={cn("mt-6 max-w-[46ch] space-y-3 border-t pt-5", compact && "mt-5")} style={{ borderColor: c.dark ? "rgba(255,255,255,0.25)" : "rgba(18,19,20,0.18)" }} aria-label={t.whatIEngineered}>
        {highlights.map((h) => (
          <li key={h} className="grid grid-cols-[1rem_1fr] gap-2">
            <span aria-hidden className="mt-[0.7em] h-px w-3" style={{ background: c.fg }} />
            <span>{h}</span>
          </li>
        ))}
      </ul>
      {extra}
      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-4">
        {stores ? <StoreBadges name={shown} locale={locale} {...storeUrls(stores)} inverse={c.dark} size={compact ? "sm" : "md"} /> : null}
        <Link href={href} className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2" style={{ color: c.fg }}>
          {t.readCaseStudy(shown)}
        </Link>
      </div>
    </div>
  );
}
