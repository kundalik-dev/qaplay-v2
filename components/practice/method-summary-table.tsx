import type { MethodRow } from "@/data/practice-data/types";

const HEADERS = [
  "Action",
  "Selenium (Java)",
  "Playwright (JS)",
  "Playwright (Python)",
  "Cypress",
] as const;

interface MethodSummaryTableProps {
  rows: MethodRow[];
}

/**
 * Block 12 — MethodSummaryTable
 * Five-column comparison table: Action | Selenium | PW JS | PW Python | Cypress.
 * Server component.
 */
export function MethodSummaryTable({ rows }: MethodSummaryTableProps) {
  return (
    <div className="overflow-x-auto" data-testid="method-summary-table">
      <table className="w-full border-collapse text-sm border border-border rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-muted">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="py-2.5 px-4 text-left font-mono text-[10px] uppercase
                           tracking-widest text-muted-foreground border-b border-border
                           whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-border last:border-0 even:bg-muted/30
                         hover:bg-muted/50 transition-colors"
            >
              <td className="py-2.5 px-4 font-medium text-foreground text-[13px] whitespace-nowrap">
                {row.action}
              </td>
              {[row.selenium, row.playwrightJs, row.playwrightPy, row.cypress].map(
                (cell, ci) => (
                  <td key={ci} className="py-2.5 px-4">
                    <code className="font-mono text-[12px] text-primary bg-primary/[8%]
                                     px-1.5 py-0.5 rounded-sm whitespace-nowrap">
                      {cell}
                    </code>
                  </td>
                ),
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
