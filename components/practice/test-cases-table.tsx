"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { TestCase } from "@/data/practice-data/types";

const typeStyles: Record<string, string> = {
  positive: "border-[var(--success)]/30 bg-[var(--success)]/10 text-[var(--success)]",
  negative: "border-[var(--danger)]/30  bg-[var(--danger)]/10  text-[var(--danger)]",
  edge:     "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
};

const priorityStyles: Record<string, string> = {
  high:   "border-[var(--danger)]/30  bg-[var(--danger)]/10  text-[var(--danger)]",
  medium: "border-[var(--warning)]/30 bg-[var(--warning)]/10 text-[var(--warning)]",
  low:    "border-border bg-muted text-muted-foreground",
};

interface TestCasesTableProps {
  testCases: TestCase[];
}

/**
 * Block 9 — TestCasesTable
 * Expandable test case table: expand toggle, Test ID, Scenario, Expected, Type, Priority.
 * Client component — manages expand/collapse state.
 */
export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="overflow-x-auto" data-testid="test-cases-table">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-muted border-b border-border">
            <th className="w-10 py-3 px-3" aria-label="Expand" />
            {["Test ID", "Scenario", "Expected Result", "Type", "Priority"].map((h) => (
              <th
                key={h}
                className="py-3 px-4 text-left font-mono text-[10px] uppercase tracking-widest
                           text-muted-foreground whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {testCases.map((tc) => {
            const isOpen = expanded.has(tc.id);
            return (
              <>
                <tr
                  key={tc.id}
                  data-testid={`tc-row-${tc.id.toLowerCase()}`}
                  className="border-b border-border hover:bg-card/50 transition-colors"
                >
                  {/* Expand toggle */}
                  <td className="py-3 px-3">
                    <button
                      onClick={() => toggle(tc.id)}
                      data-testid={`expand-${tc.id.toLowerCase()}`}
                      aria-expanded={isOpen}
                      aria-label={isOpen ? "Collapse steps" : "Expand steps"}
                      className={cn(
                        "w-6 h-6 rounded-sm font-mono text-[12px] flex items-center justify-center",
                        "border border-border text-muted-foreground hover:text-secondary",
                        "transition-colors select-none",
                        isOpen && "border-secondary/50 text-secondary bg-secondary/5",
                      )}
                    >
                      {isOpen ? "▾" : "▸"}
                    </button>
                  </td>

                  <td className="py-3 px-4 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                    {tc.id}
                  </td>
                  <td className="py-3 px-4 text-[13px] text-foreground font-medium">
                    {tc.scenario}
                  </td>
                  <td className="py-3 px-4 text-[12px] text-muted-foreground">
                    {tc.expected}
                  </td>

                  {/* Type tag */}
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded border",
                        "font-mono text-[9px] uppercase tracking-wider",
                        typeStyles[tc.type],
                      )}
                    >
                      {tc.type}
                    </span>
                  </td>

                  {/* Priority tag */}
                  <td className="py-3 px-4">
                    <span
                      className={cn(
                        "inline-flex items-center px-2 py-0.5 rounded border",
                        "font-mono text-[9px] uppercase tracking-wider",
                        priorityStyles[tc.priority],
                      )}
                    >
                      {tc.priority}
                    </span>
                  </td>
                </tr>

                {/* Expandable steps drawer */}
                {isOpen && (
                  <tr key={`steps-${tc.id}`}>
                    <td
                      colSpan={6}
                      className="px-6 py-4 border-b border-border bg-muted/50"
                    >
                      {tc.description && (
                        <p className="text-[12px] text-muted-foreground mb-3">
                          {tc.description}
                        </p>
                      )}
                      <ol className="flex flex-col gap-2">
                        {tc.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span
                              className="min-w-[22px] h-5 flex items-center justify-center
                                         rounded-sm bg-card border border-border
                                         font-mono text-[10px] text-muted-foreground
                                         flex-shrink-0"
                            >
                              {i + 1}
                            </span>
                            <span
                              className="text-[12px] text-muted-foreground leading-5"
                              // steps may contain inline <code> markup
                              dangerouslySetInnerHTML={{ __html: step }}
                            />
                          </li>
                        ))}
                      </ol>
                    </td>
                  </tr>
                )}
              </>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
