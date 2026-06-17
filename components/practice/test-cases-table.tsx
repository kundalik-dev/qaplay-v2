"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TestCase, TestCaseType, TestCasePriority } from "@/data/practice-data/types";

const TYPE_STYLES: Record<TestCaseType, string> = {
  positive: "bg-[color-mix(in_srgb,var(--success)_10%,transparent)] text-[var(--success)] border-[color-mix(in_srgb,var(--success)_30%,transparent)]",
  negative: "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)] text-[var(--destructive)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]",
  edge:     "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]",
};

const PRIORITY_STYLES: Record<TestCasePriority, string> = {
  high:   "bg-[color-mix(in_srgb,var(--destructive)_10%,transparent)] text-[var(--destructive)] border-[color-mix(in_srgb,var(--destructive)_30%,transparent)]",
  medium: "bg-[color-mix(in_srgb,var(--warning)_10%,transparent)] text-[var(--warning)] border-[color-mix(in_srgb,var(--warning)_30%,transparent)]",
  low:    "bg-muted text-muted-foreground border-border",
};

type FilterType = "all" | TestCaseType;

interface TestCasesTableProps {
  testCases: TestCase[];
}

export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [filter, setFilter]     = useState<FilterType>("all");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const filtered =
    filter === "all" ? testCases : testCases.filter((tc) => tc.type === filter);

  function toggleExpand(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function setFilterActive(f: FilterType) {
    setFilter(f);
    setExpanded(new Set()); // collapse all when switching filter
  }

  const filters: Array<{ id: FilterType; label: string }> = [
    { id: "all",      label: `All ${testCases.length}` },
    { id: "positive", label: "✅ Positive" },
    { id: "negative", label: "❌ Negative" },
    { id: "edge",     label: "⚠️ Edge" },
  ];

  return (
    <div data-testid="test-cases-table">
      {/* Toolbar */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="flex gap-1">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterActive(f.id)}
              className={cn(
                "px-3 py-[5px] rounded-[20px] text-[12px] font-medium border transition-all",
                filter === f.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-primary"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="flex-1" />
        <span className="text-[12px] text-muted-foreground">
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
              className="bg-card border border-border rounded-[10px] overflow-hidden"
              data-testid={`tc-row-${tc.id.toLowerCase()}`}
              data-type={tc.type}
              data-priority={tc.priority}
            >
              {/* Header (clickable) */}
              <button
                className="w-full flex items-start gap-3 px-4 py-[14px] text-left hover:bg-muted/40 transition-colors"
                onClick={() => toggleExpand(tc.id)}
                data-testid={`expand-${tc.id.toLowerCase()}`}
                aria-expanded={isOpen}
              >
                <span
                  className="font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold bg-muted border border-border px-[7px] py-[2px] rounded-[4px] text-muted-foreground flex-shrink-0 mt-[1px]"
                >
                  {tc.id}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="text-[13.5px] font-semibold text-foreground mb-1">
                    {tc.scenario}
                  </div>
                  <div className="text-[12px] text-muted-foreground">
                    Expected: {tc.expected}
                  </div>
                </div>
                <div className="flex items-center gap-[6px] flex-shrink-0">
                  <span
                    className={cn(
                      "text-[10.5px] font-semibold px-2 py-[2px] rounded-[4px] border capitalize",
                      TYPE_STYLES[tc.type]
                    )}
                  >
                    {tc.type}
                  </span>
                  <span
                    className={cn(
                      "text-[10.5px] font-semibold px-2 py-[2px] rounded-[4px] border capitalize",
                      PRIORITY_STYLES[tc.priority]
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
                    <div className="mb-[10px] px-[10px] py-2 rounded-[6px] text-[12px] bg-[color-mix(in_srgb,var(--info)_8%,transparent)] border border-[color-mix(in_srgb,var(--info)_25%,transparent)] text-foreground/80">
                      ℹ️ {tc.note}
                    </div>
                  )}
                  <div className="text-[10px] font-bold uppercase tracking-[0.07em] text-muted-foreground mb-2 pt-1">
                    Steps
                  </div>
                  <div className="flex flex-col gap-[6px]">
                    {tc.steps.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-[12.5px] text-muted-foreground leading-[1.5]">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-primary text-[10px] font-bold flex items-center justify-center mt-[1px]">
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
