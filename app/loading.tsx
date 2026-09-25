/**
 * Route-level loading state. Mirrors the page rhythm so the transition does not
 * shift layout when the real content arrives.
 */
export default function Loading() {
  return (
    <div className="bg-charcoal pb-20 pt-32 sm:pt-40" role="status" aria-label="Loading page">
      <div className="container-page">
        <div className="h-3 w-40 animate-pulse rounded-sm bg-steel" />
        <div className="mt-8 h-12 w-3/4 max-w-2xl animate-pulse rounded-sm bg-steel [animation-delay:80ms]" />
        <div className="mt-4 h-12 w-1/2 max-w-xl animate-pulse rounded-sm bg-steel [animation-delay:160ms]" />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-sm bg-steel/70"
              style={{ animationDelay: `${i * 90}ms` }}
            />
          ))}
        </div>
      </div>
      <span className="sr-only">Loading</span>
    </div>
  );
}
