import type { MethodRow } from "@/data/practice-data/types";

interface MethodSummaryTableProps {
  rows: MethodRow[];
}

export function MethodSummaryTable({ rows }: MethodSummaryTableProps) {
  const headers = [
    "Action",
    "Selenium",
    "Playwright JS",
    "Playwright PY",
    "Cypress",
  ] as const;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12.5px]">
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="border-b border-border bg-muted px-3 py-[9px] text-left text-[11px] font-bold tracking-[0.06em] text-muted-foreground uppercase"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.action}
              className="transition-colors hover:bg-muted/50"
            >
              <td className="border-b border-border/50 px-3 py-[9px] text-foreground">
                {row.action}
              </td>
              {[
                row.selenium,
                row.playwrightJs,
                row.playwrightPy,
                row.cypress,
              ].map((cell) => (
                <td
                  key={`${row.action}-${cell}`}
                  className="border-b border-border/50 px-3 py-[9px]"
                >
                  <code className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px] text-primary">
                    {cell}
                  </code>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
