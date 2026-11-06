import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * A phone drawn in CSS with a fixed 9:19.5 aspect ratio, so screenshots of any
 * size never shift layout. The device is always black, like the hardware.
 * `flat` shows a store composite (which already contains its own device art)
 * in the same box without a second frame.
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  width = 280,
  className,
  style,
  flat = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  width?: number;
  className?: string;
  style?: CSSProperties;
  flat?: boolean;
}) {
  const sizes = `(max-width: 768px) 60vw, ${width}px`;
  return (
    <div className={cn("relative shrink-0", /(^|\s)w-/.test(className ?? "") ? null : "w-full", className)} style={{ aspectRatio: "9 / 19.5", maxWidth: width, ...style }}>
      {flat ? (
        <div className="absolute inset-0 overflow-hidden rounded-[7%/3.2%] shadow-[0_40px_80px_-40px_rgba(0,0,0,0.55)]">
          <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
        </div>
      ) : (
        <div className="absolute inset-0 rounded-[13%/6%] bg-[#0B0B0C] p-[3%] shadow-[0_40px_80px_-36px_rgba(0,0,0,0.6)] ring-1 ring-black/40">
          <div className="relative h-full w-full overflow-hidden rounded-[10.5%/4.8%] bg-[#1a1a1a]">
            <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover object-top" />
          </div>
          <span aria-hidden className="absolute left-1/2 top-[2.4%] h-[1.7%] w-[24%] -translate-x-1/2 rounded-full bg-[#0B0B0C]" />
        </div>
      )}
    </div>
  );
}
