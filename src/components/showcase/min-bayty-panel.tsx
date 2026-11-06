import { Reveal } from "@/components/motion/reveal";
import { PhoneFrame } from "@/components/ui/phone-frame";
import type { Product } from "@/content/schema";
import { Panel, PanelText } from "./panel";

/** A fan of three screens: home, catalog, search. Text sits beside on desktop. */
export function MinBaytyPanel({ product }: { product: Product }) {
  const shots = product.screenshots.slice(0, 3);
  const tilt = ["-8deg", "0deg", "8deg"];
  return (
    <Panel brand={product.brandColor} labelledBy="show-min-bayty" className="py-16 md:py-24">
      <div data-testid="composition-min-bayty" className="grid items-center gap-12 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
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
            headingId="show-min-bayty"
          />
        </div>
        <Reveal className="md:col-span-7">
          <div className="flex items-center justify-center py-6">
            {shots.map((src, i) => (
              <PhoneFrame
                key={src}
                src={src}
                alt={`${product.name} screen ${i + 1}`}
                width={i === 1 ? 280 : 240}
                className={i === 1 ? "z-10 w-[40%]" : "drift w-[34%]"}
                style={{
                  ["--tilt" as string]: tilt[i],
                  ["--drift" as string]: i === 0 ? "36px" : "-36px",
                  transform: `rotate(${tilt[i]})`,
                  margin: i === 1 ? "0 -6%" : undefined,
                }}
              />
            ))}
          </div>
        </Reveal>
      </div>
    </Panel>
  );
}
