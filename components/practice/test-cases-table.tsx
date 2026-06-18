"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  TestCase,
  TestCaseType,
  TestCasePriority,
} from "@/data/practice-data/types";

const TYPE_STYLES: Record<TestCaseType, string> = {
  positive:
    "bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success-readable)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]",
  negative:
    "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)] text-[var(--destructive-readable)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]",
  edge: "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning-readable)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]",
};

const PRIORITY_STYLES: Record<TestCasePriority, string> = {
  high: "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)] text-[var(--destructive-readable)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]",
  medium:
    "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning-readable)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]",
  low: "bg-muted text-muted-foreground border-border",
};

type FilterType = "all" | TestCaseType;

interface TestCasesTableProps {
  testCases: TestCase[];
}

export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [filter, setFilter] = useState<FilterType>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered =
    filter === "all" ? testCases : testCases.filter((tc) => tc.type === filter);

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function setFilterActive(f: FilterType) {
    setFilter(f);
    setExpanded(new Set()); // collapse all when switching filter
  }

  const filters: Array<{ id: FilterType; label: string }> = [
    { id: "all", label: `All ${testCases.length}` },
    { id: "positive", label: "✅ Positive" },
    { id: "negative", label: "❌ Negative" },
    { id: "edge", label: "⚠️ Edge" },
  ];

  return (
    <div data-testid="test-cases-table">
      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="flex max-w-full gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterActive(f.id)}
              className={cn(
                "flex-shrink-0 rounded-[20px] border px-3 py-[5px] text-[12px] font-medium transition-all",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="hidden flex-1 sm:block" />
        <span className="text-[12px] text-muted-foreground sm:text-right">
          Showing {filtered.length} test case{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Card list */}
      <div className="flex flex-col gap-2">
        {filtered.map((tc) => {
          const isOpen = expanded.has(tc.id);
          return (
            <div
              key={tc.id}
              className="overflow-hidden rounded-[10px] border border-border bg-card"
              data-testid={`tc-row-${tc.id.toLowerCase()}`}
              data-type={tc.type}
              data-priority={tc.priority}
            >
              {/* Header (clickable) */}
              <button
                className="flex w-full flex-col gap-3 px-4 py-[14px] text-left transition-colors hover:bg-muted/40 sm:flex-row sm:items-start"
                onClick={() => toggleExpand(tc.id)}
                data-testid={`expand-${tc.id.toLowerCase()}`}
                aria-expanded={isOpen}
              >
                <span className="mt-[1px] flex-shrink-0 rounded-[4px] border border-border bg-muted px-[7px] py-[2px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold text-muted-foreground">
                  {tc.id}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 text-[13.5px] font-semibold text-foreground">
                    {tc.scenario}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    Expected: {tc.expected}
                  </div>
                </div>
                <div className="flex flex-shrink-0 flex-wrap items-center gap-[6px]">
                  <span
                    className={cn(
                      "rounded-[4px] border px-2 py-[2px] text-[10.5px] font-semibold capitalize",
                      TYPE_STYLES[tc.type],
                    )}
                  >
                    {tc.type}
                  </span>
                  <span
                    className={cn(
                      "rounded-[4px] border px-2 py-[2px] text-[10.5px] font-semibold capitalize",
                      PRIORITY_STYLES[tc.priority],
                    )}
                  >
                    {tc.priority}
                  </span>
                </div>
              </button>

              {/* Expanded body */}
              {isOpen && (
                <div className="px-4 pb-[14px]">
                  {tc.note && (
                    <div className="mb-[10px] rounded-[6px] border border-[color-mix(in_srgb,var(--info)_25%,transparent)] bg-[color-mix(in_srgb,var(--info)_8%,transparent)] px-[10px] py-2 text-[12px] text-foreground/80">
                      ℹ️ {tc.note}
                    </div>
                  )}
                  <div className="mb-2 pt-1 text-[10px] font-bold tracking-[0.07em] text-muted-foreground uppercase">
                    Steps
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    {tc.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-[12.5px] leading-[1.5] text-muted-foreground"
                      >
                        <span className="mt-[1px] flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-[10px] font-bold text-primary">
                          {idx + 1}
                        </span>
                        <span dangerouslySetInnerHTML={{ __html: step }} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
