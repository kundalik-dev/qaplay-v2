import type { LoanApplication } from "../../lib/types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

interface LoanHistoryTableProps {
  loans: LoanApplication[];
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  /** Total row value — computed by the caller so the intentional per-user
   * total bug (see apply-loan/page.tsx) stays out of this presentational
   * component. */
  totalAmount: number;
}

const LOAN_TYPE_COLORS: Record<string, string> = {
  Personal: "bg-violet-100 text-violet-700",
  Auto: "bg-cyan-100 text-cyan-700",
  Home: "bg-amber-100 text-amber-700",
  Student: "bg-emerald-100 text-emerald-700",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
};

function SortIcon({
  field,
  sortField,
  sortOrder,
}: {
  field: SortField;
  sortField: SortField | null;
  sortOrder: SortOrder;
}) {
  if (sortField !== field)
    return <span className="ml-1 text-slate-300">↕</span>;
  return sortOrder === "asc" ? (
    <ArrowUp className="ml-1 inline h-3 w-3" aria-hidden="true" />
  ) : (
    <ArrowDown className="ml-1 inline h-3 w-3" aria-hidden="true" />
  );
}

export function LoanHistoryTable({
  loans,
  sortField,
  sortOrder,
  onSort,
  totalAmount,
}: LoanHistoryTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      data-testid="loan-history-table-wrapper"
    >
      <table
        className="w-full text-sm"
        data-testid="loan-history-table"
        aria-label="Applied loans history"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
            <th
              className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-600 select-none hover:text-slate-900 dark:text-slate-400"
              onClick={() => onSort("date")}
              data-testid="loan-sort-date-header"
              aria-sort={
                sortField === "date"
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Date{" "}
              <SortIcon
                field="date"
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </th>
            {/* Hard locator: Ref ID header — no data-testid */}
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Reference
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Type
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Term
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-right text-xs font-semibold text-slate-600 select-none hover:text-slate-900 dark:text-slate-400"
              onClick={() => onSort("amount")}
              data-testid="loan-sort-amount-header"
              aria-sort={
                sortField === "amount"
                  ? sortOrder === "asc"
                    ? "ascending"
                    : "descending"
                  : "none"
              }
            >
              Amount{" "}
              <SortIcon
                field="amount"
                sortField={sortField}
                sortOrder={sortOrder}
              />
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {loans.map((loan) => (
            /*
             * Medium locator: shared data-testid + unique data-loan-id
             * Practice:
             *   page.getByTestId('loan-history-row').filter({ hasText: 'LOAN-' })
             *   page.locator('[data-testid="loan-history-row"][data-loan-id="loan-seed-1"]')
             */
            <tr
              key={loan.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
              data-testid="loan-history-row"
              data-loan-id={loan.id}
              data-loan-type={loan.loanType.toLowerCase()}
              data-status={loan.status}
              data-amount={loan.amount}
            >
              <td
                className="px-4 py-3 text-xs whitespace-nowrap text-slate-600 dark:text-slate-400"
                data-testid="loan-history-date"
              >
                <time dateTime={loan.date}>{formatDate(loan.date)}</time>
              </td>

              {/*
               * Hard locator: reference id — no data-testid, must scope from row
               * XPath: //tr[@data-loan-id="loan-seed-1"]/td[2]
               */}
              <td className="px-4 py-3 font-mono text-xs text-slate-500">
                {loan.refId}
              </td>

              <td className="px-4 py-3">
                <Badge
                  className={`text-xs ${LOAN_TYPE_COLORS[loan.loanType] ?? "bg-slate-100 text-slate-600"}`}
                  data-testid="loan-history-type-badge"
                >
                  {loan.loanType}
                </Badge>
              </td>

              <td className="px-4 py-3 text-xs text-slate-500">
                {loan.termMonths} mo
              </td>

              <td
                className="px-4 py-3 text-right text-sm font-semibold tabular-nums text-slate-900 dark:text-white"
                data-testid="loan-history-amount"
              >
                {formatCurrency(loan.amount)}
              </td>

              <td className="px-4 py-3">
                <Badge
                  className={`text-xs capitalize ${STATUS_COLORS[loan.status] ?? "bg-slate-100 text-slate-600"}`}
                  data-testid="loan-history-status-badge"
                  data-status-value={loan.status}
                >
                  {loan.status}
                </Badge>
              </td>
            </tr>
          ))}

          {loans.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="py-10 text-center text-sm text-slate-400"
                data-testid="no-loan-history-message"
              >
                No loan applications match your filters.
              </td>
            </tr>
          )}
        </tbody>
        {loans.length > 0 && (
          <tfoot>
            <tr className="border-t border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
              <td
                colSpan={4}
                className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400"
              >
                Total
              </td>
              {/*
               * Beginner: getByTestId("loan-history-total-value")
               * This total is intentionally wrong for one seeded QA
               * practice account — see apply-loan/page.tsx.
               */}
              <td
                className="px-4 py-3 text-right text-sm font-bold tabular-nums text-slate-900 dark:text-white"
                data-testid="loan-history-total-value"
              >
                {formatCurrency(totalAmount)}
              </td>
              <td />
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
