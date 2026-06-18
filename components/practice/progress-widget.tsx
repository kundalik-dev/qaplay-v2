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
    <div className="practice-side-card p-4" data-testid="progress-widget">
      <div className="mb-2.5 flex items-center justify-between">
        <span className="practice-side-title text-[12.5px]">Your Progress</span>
        <span className="practice-side-kicker font-[family-name:var(--font-ibm-plex-mono)] text-[12px]">
          {done} / {total}
        </span>
      </div>

      <div className="practice-progress-track mb-2.5 h-[6px] overflow-hidden rounded-full">
        <div
          className="practice-progress-fill h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-label="Practice progress"
          aria-valuemin={0}
          aria-valuenow={done}
          aria-valuemax={total}
        />
      </div>

      <div className="flex flex-col gap-[5px]">
        {items.map((item) => (
          <div
            key={item.id}
            className="practice-side-muted flex items-center gap-2 text-[12px] font-medium"
          >
            <span
              className={cn(
                "flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border text-[9px]",
                item.done
                  ? "practice-progress-check"
                  : "practice-progress-empty",
              )}
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
