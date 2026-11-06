import { PhoneFrame } from "@/components/ui/phone-frame";
import { panelBg } from "@/lib/color";

/**
 * Screens on a band of the product's color: a scroll-snap strip on phones,
 * a row on desktop.
 */
export function ScreenshotGallery({
  items,
  tint,
  flat = false,
  label = "Screens",
}: {
  items: { src: string; alt: string }[];
  tint?: string;
  flat?: boolean;
  label?: string;
}) {
  if (items.length === 0) return null;
  return (
    <div className="-mx-gutter mt-16 overflow-hidden md:mx-0 md:rounded-[8px]" style={{ background: tint ? panelBg(tint) : "var(--surface)" }}>
      <ul
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-gutter py-10 md:justify-center md:gap-8 md:px-10 md:py-14"
        aria-label={label}
        tabIndex={0}
      >
        {items.map((item) => (
          <li key={item.src} className="w-[58vw] max-w-[240px] shrink-0 snap-center md:w-[22%]">
            <PhoneFrame src={item.src} alt={item.alt} width={240} flat={flat} />
          </li>
        ))}
      </ul>
    </div>
  );
}
