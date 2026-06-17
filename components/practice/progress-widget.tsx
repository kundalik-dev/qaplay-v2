"use client";

import { cn } from "@/lib/utils";

export interface ProgressItem {
  id: string;
  label: string;
  done: boolean;
}

interface ProgressWidgetProps {
  items: ProgressItem[];
}

export function ProgressWidget({ items }: ProgressWidgetProps) {
  const total = items.length;
  const done = items.filter((item) => item.done).length;
  const pct = total > 0 ? (done / total) * 100 : 0;

  return (
    <div
      className="rounded-[10px] border border-border bg-card p-4"
      data-testid="progress-widget"
    >
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[12.5px] font-bold text-foreground">Your Progress</span>
        <span className="text-[12px] text-muted-foreground font-[family-name:var(--font-ibm-plex-mono)]">
          {done} / {total}
        </span>
      </div>

      <div className="mb-2.5 h-[6px] overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: "var(--success)" }}
          role="progressbar"
          aria-valuenow={done}
          aria-valuemax={total}
        />
      </div>

      <div className="flex flex-col gap-[5px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 text-[12px] text-muted-foreground"
          >
            <span
              className={cn(
                "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[9px]",
                item.done
                  ? "text-white"
                  : "border border-border text-transparent"
              )}
              style={item.done ? { background: "var(--success)", borderColor: "var(--success)" } : undefined}
              aria-hidden="true"
            >
              {"✓"}
            </span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
