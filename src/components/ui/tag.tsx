import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-full border border-current/20 px-2.5 py-0.5 text-[0.8rem] leading-5 opacity-90", className)}>
      {children}
    </span>
  );
}
