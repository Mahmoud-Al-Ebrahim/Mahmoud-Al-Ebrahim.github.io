"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

export function NavLink({ href, label, className, onClick }: { href: string; label: string; className?: string; onClick?: () => void }) {
  const pathname = usePathname();
  const active = pathname === href || (pathname?.startsWith(`${href}/`) ?? false);
  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative whitespace-nowrap py-1 text-ink transition-colors hover:text-laurel",
        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left rtl:after:origin-right after:scale-x-0 after:bg-laurel after:transition-transform after:duration-300",
        active && "after:scale-x-100",
        className,
      )}
    >
      {label}
    </Link>
  );
}
