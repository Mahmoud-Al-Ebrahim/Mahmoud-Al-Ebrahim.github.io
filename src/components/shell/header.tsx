import Link from "next/link";
import { IconDownload } from "@/components/icons";
import { Container } from "@/components/ui/container";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/content/site";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";
import { NAV } from "./nav-links";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-rule bg-paper">
      <Container width="wide" className="flex h-16 items-center justify-between gap-4 md:gap-6">
        <Link href="/" className="shrink-0 whitespace-nowrap text-step-1 font-semibold tracking-tight text-ink" aria-label={`${siteConfig.name}, home`}>
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 lg:gap-8">
            {NAV.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden shrink-0 items-center gap-2 md:flex">
          <ThemeToggle />
          <a
            href={siteConfig.resumePath}
            download
            aria-label="Download CV"
            className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-step--1 font-medium text-paper transition-opacity hover:opacity-85 lg:px-4"
          >
            <IconDownload />
            <span className="hidden lg:inline">Download CV</span>
          </a>
        </div>

        <MobileMenu />
      </Container>
    </header>
  );
}
