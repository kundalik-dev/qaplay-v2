/**
 * Loading skeleton for /practice/[element] pages.
 * Shown by Next.js automatically while page data is loading.
 */
export default function ElementLoading() {
  return (
    <div className="pt-[60px] animate-pulse" aria-label="Loading practice page">
      {/* Header skeleton */}
      <div className="w-full border-b border-border bg-surface">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex gap-2 mb-4">
            <div className="h-4 w-12 bg-surface2 rounded" />
            <div className="h-4 w-3 bg-surface2 rounded" />
            <div className="h-4 w-16 bg-surface2 rounded" />
            <div className="h-4 w-3 bg-surface2 rounded" />
            <div className="h-4 w-20 bg-surface2 rounded" />
          </div>
          {/* H1 */}
          <div className="h-9 w-80 bg-surface2 rounded mb-3" />
          {/* Description */}
          <div className="h-4 w-full max-w-lg bg-surface2 rounded mb-2" />
          <div className="h-4 w-2/3 max-w-sm bg-surface2 rounded mb-5" />
          {/* Pills */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-surface2 rounded" />
            <div className="h-6 w-16 bg-surface2 rounded" />
            <div className="h-6 w-24 bg-surface2 rounded" />
          </div>
        </div>
      </div>

      {/* Tab bar skeleton */}
      <div className="w-full border-b border-border bg-surface2">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 py-2">
            <div className="h-8 w-28 bg-surface rounded" />
            <div className="h-8 w-28 bg-surface rounded" />
            <div className="h-8 w-20 bg-surface rounded" />
          </div>
        </div>
      </div>

      {/* Practice grid skeleton */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-[1fr_320px] border-x border-border">
        <div className="p-6 flex flex-col gap-3 border-r border-border">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-surface2 rounded-lg" />
          ))}
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div className="h-12 bg-surface2 rounded-lg" />
          <div className="h-40 bg-surface2 rounded-lg" />
          <div className="h-24 bg-surface2 rounded-lg" />
        </div>
      </div>
    </div>
  );
}
