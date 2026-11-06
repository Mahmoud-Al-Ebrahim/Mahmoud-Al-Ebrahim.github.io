import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { panelBg, textOn } from "@/lib/color";
import { siteConfig } from "@/content/site";

export const OG_SIZE = { width: 1200, height: 630 };

async function fonts() {
  const dir = join(process.cwd(), "src/assets/fonts");
  const [semibold, regular] = await Promise.all([readFile(join(dir, "readex-600.woff")), readFile(join(dir, "readex-400.woff"))]);
  return [
    { name: "Readex", data: semibold, style: "normal" as const, weight: 600 as const },
    { name: "Readex", data: regular, style: "normal" as const, weight: 400 as const },
  ];
}

/**
 * A share card. With a product color the card takes that color, like the
 * product's showcase panel; otherwise it uses the site's neutral paper.
 * Arabic is deliberately omitted: the image renderer cannot shape it.
 */
export async function ogImage({ eyebrow, title, line, tint }: { eyebrow: string; title: string; line: string; tint?: string }) {
  const bg = tint ? panelBg(tint) : "#FAFAF8";
  const fg = tint ? textOn(bg) : "#121314";
  const titleSize = title.length > 26 ? 76 : 104;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: bg,
          color: fg,
          fontFamily: "Readex",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 400, opacity: 0.75 }}>{eyebrow}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: titleSize, fontWeight: 600, lineHeight: 1, letterSpacing: -3 }}>{title}</div>
          <div style={{ fontSize: 32, fontWeight: 400, lineHeight: 1.3, maxWidth: 1000, opacity: 0.85 }}>{line}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 400, opacity: 0.8 }}>
          <span style={{ fontWeight: 600 }}>{siteConfig.name}</span>
          <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: await fonts() },
  );
}
