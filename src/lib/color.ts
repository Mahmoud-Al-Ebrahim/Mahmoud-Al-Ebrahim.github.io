/** WCAG relative luminance of a #RRGGBB color. */
export function luminance(hex: string): number {
  const c = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const v = parseInt(c.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
}

export const ON_DARK = "#FFFFFF";
export const ON_LIGHT = "#121314";

/** Black or white text, whichever has the higher contrast on the given background. */
export function textOn(bg: string): string {
  return contrast(bg, ON_LIGHT) >= contrast(bg, ON_DARK) ? ON_LIGHT : ON_DARK;
}

function toHex(rgb: number[]): string {
  return `#${rgb.map((v) => Math.round(v).toString(16).padStart(2, "0")).join("")}`.toUpperCase();
}

/**
 * The product color used as a panel background, nudged darker (for white text)
 * or lighter (for dark text) only as far as needed for both primary and
 * secondary text to reach 4.5:1.
 */
export function panelBg(hex: string): string {
  let current = hex.toUpperCase();
  const text = textOn(current);
  const target = text === ON_DARK ? [0, 0, 0] : [255, 255, 255];
  const base = [0, 2, 4].map((i) => parseInt(hex.replace("#", "").slice(i, i + 2), 16));
  const ok = (bg: string) => contrast(bg, text) >= 4.5 && contrast(bg, mutedSolid(bg)) >= 4.5;
  for (let step = 1; step <= 25 && !ok(current); step++) {
    const t = step * 0.03;
    current = toHex(base.map((v, i) => v + (target[i] - v) * t));
  }
  return current;
}

/** Secondary text on a product color: the primary text color at reduced opacity. */
export const MUTED_ALPHA = 0.88;

export function mutedOn(bg: string): string {
  return textOn(bg) === ON_LIGHT ? `rgba(18,19,20,${MUTED_ALPHA})` : `rgba(255,255,255,${MUTED_ALPHA})`;
}

/** The solid color that `mutedOn(bg)` composites to, for contrast checks. */
export function mutedSolid(bg: string): string {
  const fg = textOn(bg) === ON_LIGHT ? [18, 19, 20] : [255, 255, 255];
  const b = [0, 2, 4].map((i) => parseInt(bg.replace("#", "").slice(i, i + 2), 16));
  return toHex(b.map((v, i) => v + (fg[i] - v) * MUTED_ALPHA));
}
