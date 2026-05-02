"use client";

import { useEffect } from "react";

/** Legacy URL; homepage Social lives under Events (#events-social). */
export default function EventsSocialRedirectPage() {
  useEffect(() => {
    window.location.replace("/#events-social");
  }, []);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center bg-zinc-50 px-4 text-zinc-600 dark:bg-zinc-950 dark:text-zinc-400">
      <p className="text-sm font-medium">Opening Social on the homepage…</p>
    </main>
  );
}
