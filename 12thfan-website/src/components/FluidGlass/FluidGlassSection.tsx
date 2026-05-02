"use client";

import FluidGlass from "./FluidGlass";

export default function FluidGlassSection() {
  return (
    <section
      aria-label="Fluid glass showcase"
      className="relative isolate w-full overflow-hidden border-y border-zinc-200 bg-black dark:border-zinc-800"
    >
      <FluidGlass
        mode="lens"
        lensProps={{
          scale: 0.25,
          ior: 1.15,
          thickness: 5,
          chromaticAberration: 0.1,
          anisotropy: 0.01,
        }}
        titleText="12TH FAN"
        className="h-[min(640px,85vh)] min-h-[480px] w-full"
      />
    </section>
  );
}
