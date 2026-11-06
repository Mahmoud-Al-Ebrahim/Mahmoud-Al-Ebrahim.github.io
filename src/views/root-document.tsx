import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { ProgressHairline } from "@/components/motion/progress-hairline";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { ThemeScript } from "@/components/theme/theme-provider";
import { siteConfig } from "@/content/site";
import { LOCALE_META, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { getSite } from "@/lib/content";
import { fontClassNames, fontClassNamesArabic } from "@/lib/fonts";

/** Root metadata for a locale's layout. Pages add canonical and hreflang. */
export function rootMetadata(locale: Locale): Metadata {
  const site = getSite(locale);
  return {
    metadataBase: new URL(siteConfig.url),
    title: { default: site.title, template: `%s · ${siteConfig.name}` },
    description: site.description,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
  };
}

export const rootViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F10" },
  ],
};

/**
 * The document shell shared by both root layouts (English at /, Arabic at
 * /ar). Only `lang`, `dir`, the preloaded font face and the interface
 * language differ.
 */
export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  const meta = LOCALE_META[locale];
  return (
    <html lang={meta.lang} dir={meta.dir} suppressHydrationWarning className={`${locale === "ar" ? fontClassNamesArabic : fontClassNames} h-full`}>
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <a href="#main" className="skip-link">
          {getDictionary(locale).skip}
        </a>
        <ProgressHairline />
        <Header locale={locale} />
        <div className="flex-1">{children}</div>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
