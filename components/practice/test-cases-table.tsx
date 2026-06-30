"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type {
  TestCase,
  TestCaseType,
  TestCasePriority,
} from "@/data/practice-data/types";

// ─── Badge style maps ─────────────────────────────────────────────────────────

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

const TYPE_ICONS: Record<TestCaseType, string> = {
  positive: "✅",
  negative: "❌",
  edge: "⚠️",
};

type FilterType = "all" | TestCaseType;

interface TestCasesTableProps {
  testCases: TestCase[];
}

// ─── Chevron icon ─────────────────────────────────────────────────────────────

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("transition-transform duration-200", open && "rotate-180")}
      aria-hidden="true"
    >
      <path
        d="M3 5L7 9L11 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [filter, setFilter] = useState<FilterType>("all");
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
    setExpanded(new Set());
  }

  const filters: Array<{ id: FilterType; label: string }> = [
    { id: "all", label: `All ${testCases.length}` },
    { id: "positive", label: "✅ Positive" },
    { id: "negative", label: "❌ Negative" },
    { id: "edge", label: "⚠️ Edge" },
  ];

  return (
    <div data-testid="test-cases-table">
      {/* ── Toolbar ── */}
      <div className="mb-4 flex flex-col gap-2.5 sm:flex-row sm:items-center">
        <div className="flex max-w-full gap-1 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterActive(f.id)}
              data-testid={`filter-${f.id}`}
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

      {/* ── Table ── */}
      <div className="overflow-hidden rounded-[12px] border border-border">
        <table className="w-full border-collapse text-left" role="table">
          {/* Head */}
          <thead>
            <tr className="border-b border-border bg-muted/60">
              <th className="px-4 py-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.07em] text-muted-foreground uppercase">
                ID
              </th>
              <th className="px-3 py-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.07em] text-muted-foreground uppercase">
                Scenario
              </th>
              <th className="hidden px-3 py-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.07em] text-muted-foreground uppercase sm:table-cell">
                Type
              </th>
              <th className="hidden px-3 py-[10px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold tracking-[0.07em] text-muted-foreground uppercase sm:table-cell">
                Priority
              </th>
              <th className="w-10 px-3 py-[10px]" aria-label="Expand" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {filtered.map((tc, index) => {
              const isOpen = expanded.has(tc.id);
              const isLast = index === filtered.length - 1;

              return (
                <>
                  {/* ── Data row ── */}
                  <tr
                    key={tc.id}
                    data-testid={`tc-row-${tc.id.toLowerCase()}`}
                    data-type={tc.type}
                    data-priority={tc.priority}
                    className={cn(
                      "group cursor-pointer transition-colors hover:bg-muted/40",
                      isOpen ? "bg-muted/30" : "bg-card",
                      !isLast || isOpen ? "border-b border-border" : "",
                    )}
                    onClick={() => toggleExpand(tc.id)}
                    aria-expanded={isOpen}
                  >
                    {/* ID */}
                    <td className="px-4 py-[13px] align-top">
                      <span className="inline-block rounded-[4px] border border-border bg-muted px-[7px] py-[2px] font-[family-name:var(--font-ibm-plex-mono)] text-[10px] font-bold whitespace-nowrap text-muted-foreground">
                        {tc.id}
                      </span>
                    </td>

                    {/* Scenario + expected */}
                    <td className="px-3 py-[13px] align-top">
                      <div className="mb-[3px] text-[13px] font-semibold text-foreground">
                        {tc.scenario}
                      </div>
                      <div className="text-[11.5px] leading-[1.5] text-muted-foreground">
                        Expected: {tc.expected}
                      </div>
                      {/* badges visible only on mobile */}
                      <div className="mt-2 flex flex-wrap gap-1.5 sm:hidden">
                        <span
                          className={cn(
                            "rounded-[4px] border px-[7px] py-[2px] text-[10px] font-semibold capitalize",
                            TYPE_STYLES[tc.type],
                          )}
                        >
                          {TYPE_ICONS[tc.type]} {tc.type}
                        </span>
                        <span
                          className={cn(
                            "rounded-[4px] border px-[7px] py-[2px] text-[10px] font-semibold capitalize",
                            PRIORITY_STYLES[tc.priority],
                          )}
                        >
                          {tc.priority}
                        </span>
                      </div>
                    </td>

                    {/* Type badge */}
                    <td className="hidden px-3 py-[13px] align-top sm:table-cell">
                      <span
                        className={cn(
                          "inline-block rounded-[4px] border px-[8px] py-[3px] text-[10.5px] font-semibold capitalize",
                          TYPE_STYLES[tc.type],
                        )}
                      >
                        {tc.type}
                      </span>
                    </td>

                    {/* Priority badge */}
                    <td className="hidden px-3 py-[13px] align-top sm:table-cell">
                      <span
                        className={cn(
                          "inline-block rounded-[4px] border px-[8px] py-[3px] text-[10.5px] font-semibold capitalize",
                          PRIORITY_STYLES[tc.priority],
                        )}
                      >
                        {tc.priority}
                      </span>
                    </td>

                    {/* Expand chevron */}
                    <td className="w-10 px-3 py-[13px] align-top">
                      <button
                        className="flex h-6 w-6 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpand(tc.id);
                        }}
                        data-testid={`expand-${tc.id.toLowerCase()}`}
                        aria-label={isOpen ? "Collapse steps" : "Expand steps"}
                        tabIndex={-1}
                      >
                        <ChevronIcon open={isOpen} />
                      </button>
                    </td>
                  </tr>

                  {/* ── Detail row (steps) ── */}
                  {isOpen && (
                    <tr
                      key={`${tc.id}-detail`}
                      data-testid={`tc-steps-${tc.id.toLowerCase()}`}
                      className={cn(
                        "bg-[color-mix(in_srgb,var(--primary)_3%,var(--card))]",
                        !isLast ? "border-b border-border" : "",
                      )}
                    >
                      <td />
                      <td colSpan={4} className="px-3 py-4 pr-5">
                        {tc.note && (
                          <div className="mb-3 flex items-start gap-2 rounded-[6px] border border-[color-mix(in_srgb,var(--info)_25%,transparent)] bg-[color-mix(in_srgb,var(--info)_8%,transparent)] px-3 py-2 text-[12px] text-foreground/80">
                            <span className="mt-[1px] flex-shrink-0">ℹ️</span>
                            <span>{tc.note}</span>
                          </div>
                        )}

                        <div className="mb-2 text-[10px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
                          Steps
                        </div>

                        <ol className="flex flex-col gap-[7px]" role="list">
                          {tc.steps.map((step, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 text-[12.5px] leading-[1.55] text-muted-foreground"
                            >
                              <span className="mt-[1px] flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-[9px] font-bold text-primary">
                                {idx + 1}
                              </span>
                              <span dangerouslySetInnerHTML={{ __html: step }} />
                            </li>
                          ))}
                        </ol>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}

            {/* Empty state */}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-10 text-center text-[13px] text-muted-foreground"
                >
                  No test cases match this filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
