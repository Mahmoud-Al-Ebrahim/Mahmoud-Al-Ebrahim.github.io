import Link from "next/link";
import { IconDownload } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/content/site";
import { localeHref, type Locale } from "@/i18n/config";
import { getSite } from "@/lib/content";
import { getDictionary } from "@/i18n/dictionary";
import { LanguageSwitch } from "./language-switch";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { navItems } from "./nav-links";

export function Header({ locale = "en" }: { locale?: Locale }) {
  const t = getDictionary(locale);
  const nav = navItems(locale);
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4 md:gap-6">
        <Link href={localeHref(locale, "/")} className="shrink-0 whitespace-nowrap text-step-1 font-semibold tracking-tight text-ink" aria-label={t.homeAria(siteConfig.name)}>
          {siteConfig.name}
        </Link>

        <nav aria-label={t.navAria.primary} className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <LanguageSwitch locale={locale} />
          <ThemeToggle labels={t.theme} />
          <a
            href={siteConfig.resumePath}
            download
            aria-label={t.downloadCv}
            className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-step--1 font-medium text-paper transition-opacity hover:opacity-85 lg:px-4"
          >
            <IconDownload />
            <span className="hidden lg:inline">{t.downloadCv}</span>
          </a>
        </div>

        <MobileMenu
          locale={locale}
          items={nav}
          labels={{ ...t.menu, downloadCv: t.downloadCv, primary: t.navAria.primary, theme: t.theme }}
          location={getSite(locale).location}
        />
      </Container>
    </header>
  );
}
