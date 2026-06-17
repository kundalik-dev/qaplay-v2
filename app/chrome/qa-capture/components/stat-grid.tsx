import type { ChromeStat } from "@/data/chrome/types";

export function StatGrid({ stats }: { stats: ChromeStat[] }) {
  return (
    <div className="grid max-w-3xl grid-cols-3 gap-3 sm:gap-4">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="capture-card flex flex-col items-center justify-center px-3 py-4 text-center sm:min-h-[112px] sm:items-start sm:justify-between sm:px-5 sm:text-left"
        >
          <p className="font-heading text-2xl leading-none font-bold tracking-[-0.05em] text-foreground sm:text-[clamp(1.8rem,3vw,2.4rem)]">
            {value}
          </p>
          <p className="mt-1.5 text-[10px] font-medium tracking-[0.08em] text-muted-foreground uppercase sm:mt-2 sm:text-xs">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
