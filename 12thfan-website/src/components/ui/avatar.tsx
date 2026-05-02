"use client";

import Image from "next/image";
import { createContext, useContext, useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type AvatarCtx = {
  imageFailed: boolean;
  setImageFailed: (v: boolean) => void;
};

const AvatarContext = createContext<AvatarCtx | null>(null);

export function Avatar({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  const [imageFailed, setImageFailed] = useState(false);
  const value = useMemo(() => ({ imageFailed, setImageFailed }), [imageFailed]);

  return (
    <AvatarContext.Provider value={value}>
      <div className={cn("group relative inline-flex min-h-0 min-w-0 shrink-0 rounded-full", className)}>
        {children}
      </div>
    </AvatarContext.Provider>
  );
}

export function AvatarImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt?: string;
  className?: string;
}) {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("AvatarImage must be used inside Avatar");

  if (ctx.imageFailed) return null;

  return (
    <Image
      src={src}
      alt={alt ?? ""}
      fill
      sizes="48px"
      className={cn("object-cover", className)}
      onError={() => ctx.setImageFailed(true)}
    />
  );
}

export function AvatarFallback({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error("AvatarFallback must be used inside Avatar");

  if (!ctx.imageFailed) return null;

  return (
    <span
      className={cn(
        "flex size-full items-center justify-center text-[0.65rem] font-semibold tracking-tight text-zinc-600 dark:text-zinc-300",
        className,
      )}
    >
      {children}
    </span>
  );
}
