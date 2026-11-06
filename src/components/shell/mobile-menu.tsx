"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { IconClose, IconDownload, IconMenu } from "@/components/icons";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { siteConfig } from "@/content/site";
import type { Locale } from "@/i18n/config";
import { LanguageSwitch } from "./language-switch";
import type { NavItem } from "./nav-links";
import { NavLink } from "./nav-link";

type Labels = {
  open: string;
  close: string;
  dialog: string;
  downloadCv: string;
  primary: string;
  theme: { toLight: string; toDark: string };
};

/**
 * Full-screen menu for small screens. The close button lives inside the panel
 * so it is always on top and reachable by touch; focus is trapped while open
 * and returns to the trigger on close.
 */
export function MobileMenu({ locale, items, labels, location }: { locale: Locale; items: NavItem[]; labels: Labels; location: string }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("nav a")?.focus();

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = Array.from(panelRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  return (
    <div className="md:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={labels.open}
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink hover:border-ink"
      >
        <IconMenu />
      </button>

      {open ? (
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={labels.dialog}
          className="fixed inset-0 z-50 flex flex-col bg-paper px-gutter pb-8"
        >
          <div className="flex h-16 items-center justify-between border-b border-rule">
            <span className="text-step-1 font-semibold tracking-tight">{siteConfig.name}</span>
            <button
              type="button"
              onClick={close}
              aria-label={labels.close}
              aria-expanded="true"
              aria-controls="mobile-menu"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-rule text-ink hover:border-ink"
            >
              <IconClose />
            </button>
          </div>
          <nav aria-label={labels.primary} className="mt-6">
            <ul className="flex flex-col">
              {items.map((item) => (
                <li key={item.href} className="border-b border-rule">
                  <NavLink href={item.href} label={item.label} onClick={() => setOpen(false)} className="block py-4 text-step-4 font-semibold tracking-tight after:hidden" />
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-8 flex items-center gap-3">
            <a href={siteConfig.resumePath} download className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-ink px-5 py-2.5 font-medium text-paper">
              <IconDownload /> {labels.downloadCv}
            </a>
            <ThemeToggle labels={labels.theme} />
            <LanguageSwitch locale={locale} onNavigate={() => setOpen(false)} />
          </div>
          <p className="mt-auto text-step--1 text-muted">{location}</p>
        </div>
      ) : null}
    </div>
  );
}
