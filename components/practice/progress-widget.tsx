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
  const done  = items.filter((i) => i.done).length;
  const pct   = total > 0 ? (done / total) * 100 : 0;

  return (
    <div
      className="bg-card border border-border rounded-[10px] p-4"
      data-testid="progress-widget"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[12.5px] font-bold text-foreground">Your Progress</span>
        <span className="text-[12px] text-muted-foreground font-[family-name:var(--font-ibm-plex-mono)]">
          {done} / {total}
        </span>
      </div>

      {/* Bar */}
      <div className="h-[6px] bg-muted rounded-[10px] overflow-hidden mb-2.5">
        <div
          className="h-full rounded-[10px] bg-[var(--success)] transition-all duration-500"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={done}
          aria-valuemax={total}
        />
      </div>

      {/* Per-scenario checklist */}
      <