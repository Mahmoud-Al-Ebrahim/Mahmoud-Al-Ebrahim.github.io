import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { PhoneFrame } from "@/components/ui/phone-frame";
import type { Product } from "@/content/schema";
import { Panel, PanelText, panelColors } from "./panel";

/** Two apps of one platform, side by side: customer and captain. */
export function LabeenyPanel({ product, captain }: { product: Product; captain?: Product }) {
  const c = panelColors(product.brandColor);
  return (
    <Panel brand={product.brandColor} labelledBy="show-labeeny" className="pt-16 md:pt-24">
      <div data-testid="composition-labeeny" className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="pb-4 md:col-span-5 md:col-start-8 md:row-start-1 md:self-center md:pb-24">
          <PanelText
            slug={product.slug}
            icon={product.icon}
            name={product.name}
            nameAr={product.nameAr}
            tagline={product.tagline}
            highlights={product.highlights}
            role={product.role}
            roleLabel={product.roleLabel}
            publisher={product.publisher}
            stores={product.stores}
            brand={product.brandColor}
            href={`/apps/${product.slug}`}
            headingId="show-labeeny"
            extra={
              captain ? (
                <p className="mt-5 text-step--1" style={{ color: c.muted }}>
                  The captain app ships separately:{" "}
                  <Link href={`/apps/${captain.slug}`} className="underline" style={{ color: c.fg }}>
                    {captain.name}
                  </Link>
                  .
                </p>
              ) : null
            }
          />
        </div>
        <Reveal className="md:col-span-7 md:row-start-1">
          <div className="flex items-end justify-center gap-[5%] md:justify-start">
            <PhoneFrame
              src={product.screenshots[1] ?? product.screenshots[0]}
              alt={`${product.name} customer app: choose pickup and drop-off`}
              flat={product.screenshotStyle === "flat"}
              width={330}
              className="drift w-[46%]"
              style={{ ["--drift" as string]: "28px", marginBottom: "-4%" }}
            />
            {captain ? (
              <PhoneFrame
                src={captain.screenshots[0]}
                alt={`${captain.name} captain app: profile and orders`}
                flat={captain.screenshotStyle === "flat"}
                width={330}
                className="drift w-[46%]"
                style={{ ["--drift" as string]: "60px", marginBottom: "-18%" }}
              />
            ) : null}
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}
