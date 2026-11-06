import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/content/site";
import { NAV } from "./nav-links";

export function Footer() {
  return (
    <footer className="night border-t border-rule">
      <Container width="wide" className="flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <p className="text-step--1 text-muted">
          {siteConfig.name}, senior Flutter engineer. Static site, no analytics, no cookies.
        </p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-step--1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                GitHub
              </a>
            </li>
            <li>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
