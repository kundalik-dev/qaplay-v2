"use client";

interface ProgressWidgetProps {
  completed: number;
  total: number;
}

/**
 * Block 6 — ProgressWidget
 * "Scenarios done X / N" with an animated fill bar.
 * Client component — receives live completed count from parent.
 */
export function ProgressWidget({ completed, total }: ProgressWidgetProps) {
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div
      className="flex flex-col gap-2 p-3 bg-muted rounded-lg border border-border"
      data-testid="progress-widget"
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] text-muted-foreground">Scenarios done</span>
        <strong className="font-mono text-[11px] text-foreground">
          {completed} / {total}
        </strong>
      </div>

      <div className="h-1.5 rounded-full bg-background overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={completed}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${completed} of ${total} scenarios completed`}
        />
      </div>
    </div>
  );
}
