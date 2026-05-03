"use client";

import { useEffect, useState } from "react";

import GradualBlur from "./GradualBlur";

/**
 * Viewport-wide gradual blur at the bottom edge (all pages).
 * Mounted after first paint (idle / short timeout) so stacked backdrop-filters
 * do not block the initial render and tab stays responsive.
 */
export default function GlobalScrollBlur() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const enable = () => setReady(true);
    if (typeof requestIdleCallback !== "undefined") {
      const id = requestIdleCallback(enable, { timeout: 2000 });
      return () => cancelIdleCallback(id);
    }
    const t = window.setTimeout(enable, 400);
    return () => window.clearTimeout(t);
  }, []);

  if (!ready) return null;

  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="6rem"
      strength={2.25}
      divCount={3}
      curve="bezier"
      exponential={false}
      opacity={0.88}
      zIndex={40}
    />
  );
}
