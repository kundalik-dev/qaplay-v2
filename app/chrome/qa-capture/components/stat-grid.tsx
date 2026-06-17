import type { ChromeStat } from "@/data/chrome/types";

export function StatGrid({ stats }: { stats: ChromeStat[] }) {
  return (
    <div className="grid max-w-3xl gap-4 sm:grid-cols-3">
      {stats.map(({ value, label }) => (
        <div
          key={label}
          className="capture-card flex min-h-[112px] flex-col justify-between px-5 py-4"
        >
          <p className="font-heading text-[clamp(1.8rem,3vw,2.4rem)] leading-none font-bold tracking-[-0.05em] text-foreground">
            {value}
          </p>
          <p className="mt-2 text-xs font-medium tracking-[0.08em] text-muted-foreground uppercase">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
