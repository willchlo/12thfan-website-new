/**
 * Shown while route segments load (Next.js App Router `loading.tsx`).
 * Spinner CSS: Uiverse.io / krlozCJ — see `.page-route-loader` in globals.css.
 */
export default function Loading() {
  return (
    <div className="flex min-h-[min(72vh,640px)] w-full flex-1 flex-col items-center justify-center py-16 sm:py-24">
      <div className="page-route-loader" role="status" aria-live="polite" aria-label="Loading">
        <span className="sr-only">Loading…</span>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="orbe" style={{ "--index": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
