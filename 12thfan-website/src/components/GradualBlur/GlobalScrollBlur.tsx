"use client";

import GradualBlur from "./GradualBlur";

/**
 * Viewport-wide gradual blur at the bottom edge (all pages), visible as soon as the page loads.
 */
export default function GlobalScrollBlur() {
  return (
    <GradualBlur
      target="page"
      position="bottom"
      height="8rem"
      strength={5}
      divCount={6}
      curve="bezier"
      exponential
      opacity={0.95}
      zIndex={40}
    />
  );
}
