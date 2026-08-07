"use client";

import { useEffect } from "react";

/** Legacy URL — social section removed from the homepage. */
export default function EventsSocialRedirectPage() {
  useEffect(() => {
    window.location.replace("/");
  }, []);

  return (
    <main className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-zinc-600">
      <p className="text-sm font-medium">Redirecting to home…</p>
    </main>
  );
}
