import localFont from "next/font/local";

/**
 * Readex Pro (SIL OFL) is one family designed for Latin and Arabic, so
 * bilingual product names share one voice. Latin and Arabic are separate
 * faces in the stack; the Arabic file is only downloaded when a page shows
 * Arabic text. Geist Mono is used for code only.
 */
export const fontLatin = localFont({
  src: "../assets/fonts/readex-latin.woff2",
  variable: "--font-latin",
  display: "swap",
  weight: "160 700",
  preload: true,
});

export const fontArabic = localFont({
  src: "../assets/fonts/readex-arabic.woff2",
  variable: "--font-arabic-face",
  display: "swap",
  weight: "160 700",
  preload: false,
});

export const fontMono = localFont({
  src: "../assets/fonts/geist-mono-variable.woff2",
  variable: "--font-mono-face",
  display: "swap",
  weight: "100 900",
  preload: false,
});

export const fontClassNames = [fontLatin.variable, fontArabic.variable, fontMono.variable].join(" ");
