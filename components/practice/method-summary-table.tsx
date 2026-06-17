import type { MethodRow } from "@/data/practice-data/types";

interface MethodSummaryTableProps {
  rows: MethodRow[];
}

export function MethodSummaryTable({ rows }: MethodSummaryTableProps) {
  const headers = [
    "Action",
    { label: "Selenium", pill: "fw-selenium" },
    { label: "Playwright JS", pill: "fw-playwright" },
    { label: "Playwright PY", pill: "fw-playwright" },
    { label: "Cypress", pill: "fw-cypress" },
  ] as const;

  return (
    <div className="overflow-x-auto" style={{ padding: 0 }}>
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr>
            <th className="text-left px-3 py-[9px] bg-muted font-bold text-[11px] uppercase tracking-[0.06em] text-muted-foreground border-b border-border">
              Action
            </th>
            {(["Selenium", "Playwright JS", "Playwright PY", "Cypress"] as const).map((h) => (
              <th key={h} className="text-left px-3 py-[9px] bg-muted border-b border-border">
                <span
                  className={`text-[10px] font-bold px-[6px] py-[1px] rounded-[3px] border ${
                    h === "Selenium"
                      ? "bg-[#fef9c3] text-[#854d0e] border-[#fde68a]"
                      : h === "Cypress"
                      ? "bg-[#fce7f3] text-[#9d174d] border-[#fbcfe8]"
                      : "bg-[#e0f2fe] text-[#0369a1] border-[#bae6fd]"
                  }`}
                >
                  {h}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="hover:bg-muted/50 transition-colors">
              <td className="px-3 py-[9px] border-b border-border/50 text-foreground">
                {row.action}
              </td>
              {[row.selenium, row.playwrightJs, row.playwrightPy, row.cypress].map((cell, ci) => (
                <td key={ci} className="px-3 py-[9px] border-b border-border/50">
                  <code className=