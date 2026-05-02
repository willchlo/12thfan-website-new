"use client";

import { Children } from "react";

import { cn } from "@/lib/utils";

export function AvatarGroup({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      {Children.map(children, (child, index) => (
        <div key={index} className={cn("relative", index > 0 && "-ml-3")} style={{ zIndex: index }}>
          {child}
        </div>
      ))}
    </div>
  );
}

export function AvatarGroupTooltip({ children }: React.PropsWithChildren) {
  return (
    <span
      className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900"
      role="tooltip"
    >
      {children}
    </span>
  );
}
