import type { Metadata } from "next";
import { ThemeScript } from "@/components/theme/theme-provider";
import { Container } from "@/components/ui/container";
import { fontClassNamesArabic } from "@/lib/fonts";
import { NotFoundBlock } from "@/views/not-found";
import "./globals.css";

export const metadata: Metadata = {
  title: "Page not found · الصفحة غير موجودة",
  robots: { index: false },
};

/**
 * The site has two root layouts (English and Arabic), so an unknown URL is
 * answered here, outside both, in both languages.
 */
export default function GlobalNotFound() {
  return (
    <html lang="en" suppressHydrationWarning className={`${fontClassNamesArabic} h-full`}>
      <body className="flex min-h-full flex-col">
        <ThemeScript />
        <Container as="main" id="main" className="space-y-20 py-16 md:py-24">
          <NotFoundBlock locale="en" />
          <div className="border-t border-rule pt-16">
            <NotFoundBlock locale="ar" headingLevel={2} />
          </div>
        </Container>
      </body>
    </html>
  );
}
