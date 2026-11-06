import { IconApple, IconPlay } from "@/components/icons";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { cn } from "@/lib/cn";

type Size = "sm" | "md";

function Badge({
  href,
  name,
  eyebrow,
  title,
  icon,
  size,
  inverse,
  forName,
}: {
  href: string;
  name: string;
  forName: (name: string) => string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  size: Size;
  inverse: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2.5 rounded-[10px] border transition-transform duration-200 hover:-translate-y-0.5",
        inverse ? "border-white/80 bg-white text-black" : "border-black bg-black text-white",
        size === "sm" ? "px-2.5 py-1.5" : "px-3.5 py-2",
      )}
    >
      <span className={cn("shrink-0", size === "sm" ? "[&>svg]:h-4 [&>svg]:w-4" : "[&>svg]:h-5 [&>svg]:w-5")}>{icon}</span>
      <span className="flex flex-col leading-none">
        <span className={cn("opacity-80", size === "sm" ? "text-[10px]" : "text-[11px]")}>{eyebrow} </span>
        <span className={cn("font-medium", size === "sm" ? "text-[13px]" : "text-[15px]")}>{title}</span>
      </span>
      <span className="sr-only">{forName(name)}</span>
    </a>
  );
}

/** Store links. The accessible name is the visible text plus the product name. */
export function StoreBadges({
  name,
  play,
  appStore,
  size = "md",
  inverse = false,
  className,
  locale = "en",
}: {
  name: string;
  locale?: Locale;
  play?: { url: string };
  appStore?: { url: string };
  size?: Size;
  /** White badges, for dark product panels. */
  inverse?: boolean;
  className?: string;
}) {
  const t = getDictionary(locale).stores;
  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {appStore ? (
        <Badge href={appStore.url} name={name} eyebrow={t.appStoreEyebrow} title="App Store" icon={<IconApple />} size={size} inverse={inverse} forName={t.forName} />
      ) : null}
      {play ? (
        <Badge href={play.url} name={name} eyebrow={t.playEyebrow} title="Google Play" icon={<IconPlay />} size={size} inverse={inverse} forName={t.forName} />
      ) : null}
    </div>
  );
}
