import type { Metadata, Viewport } from "next";
import { ProgressHairline } from "@/components/motion/progress-hairline";
import { Footer } from "@/components/shell/footer";
import { Header } from "@/components/shell/header";
import { ThemeScript } from "@/components/theme/theme-provider";
import { siteConfig } from "@/content/site";
import { fontClassNames } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.title, template: `%s · ${siteConfig.name}` },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0F10" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontClassNames} h-full`}>
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <ProgressHairline />
        <Header />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
