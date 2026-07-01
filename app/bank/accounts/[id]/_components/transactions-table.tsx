import type { Transaction } from "../../../lib/types";
import { formatCurrency, formatDate } from "../../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

type SortField = "date" | "amount";
type SortOrder = "asc" | "desc";

interface TransactionsTableProps {
  transactions: Transaction[];
  sortField: SortField | null;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Income: "bg-emerald-100 text-emerald-700",
  Groceries: "bg-orange-100 text-orange-700",
  Utilities: "bg-blue-100 text-blue-700",
  Shopping: "bg-pink-100 text-pink-700",
  Transport: "bg-cyan-100 text-cyan-700",
  Dining: "bg-yellow-100 text-yellow-700",
  Health: "bg-red-100 text-red-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Transfer: "bg-slate-100 text-slate-700",
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

export function TransactionsTable({
  transactions,
  sortField,
  sortOrder,
  onSort,
}: TransactionsTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      data-testid="transactions-table-wrapper"
    >
      <table
        className="w-full text-sm"
        data-testid="transactions-table"
        aria-label="Account transactions"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
            <th
              className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-600 select-none hover:text-slate-900 dark:text-slate-400"
              onClick={() => onSort("date")}
              data-testid="sort-date-header"
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
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Description
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Category
            </th>
            <th
              className="cursor-pointer px-4 py-3 text-right text-xs font-semibold text-slate-600 select-none hover:text-slate-900 dark:text-slate-400"
              onClick={() => onSort("amount")}
              data-testid="sort-amount-header"
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
            {/* Hard locator: Running Balance header — no data-testid */}
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
              Running Balance
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {transactions.map((txn) => (
            /*
             * Medium locator: shared data-testid + unique data-transaction-id + data-category
             * Practice:
             *   page.getByTestId('transaction-row').filter({ hasText: 'Direct Deposit' })
             *   page.locator('[data-testid="transaction-row"][data-transaction-id="txn-acc-checking-1-001"]')
             *   XPath: //tr[@data-transaction-id="txn-acc-checking-1-001"]
             *          //tr[td[normalize-space()="Income"] and td[contains(text(),"3200")]]
             */
            <tr
              key={txn.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
              data-testid="transaction-row"
              data-transaction-id={txn.id}
              data-category={txn.category}
              data-type={txn.type}
            >
              {/* Beginner: getByTestId inside row */}
              <td
                className="px-4 py-3 text-xs whitespace-nowrap text-slate-600 dark:text-slate-400"
                data-testid="txn-date"
              >
                <time dateTime={txn.date}>{formatDate(txn.date)}</time>
              </td>

              <td
                className="px-4 py-3 text-sm text-slate-900 dark:text-white"
                data-testid="txn-description"
              >
                {txn.description}
              </td>

              <td className="px-4 py-3">
                <Badge
                  className={`text-xs ${CATEGORY_COLORS[txn.category] ?? "bg-slate-100 text-slate-600"}`}
                  data-testid="txn-category-badge"
                  data-category-value={txn.category.toLowerCase()}
                >
                  {txn.category}
                </Badge>
              </td>

              {/* Amount — Beginner: data-testid, check positive/negative */}
              <td
                className={[
                  "px-4 py-3 text-right text-sm font-semibold tabular-nums",
                  txn.amount > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                ].join(" ")}
                data-testid="txn-amount"
                data-amount={txn.amount}
              >
                {txn.amount > 0 ? "+" : ""}
                {formatCurrency(txn.amount)}
              </td>

              {/*
               * Hard locator: running balance — no data-testid, 5th td
               * Practice:
               *   //tr[@data-transaction-id="txn-acc-checking-1-001"]/td[5]
               *   //tr[@data-transaction-id="txn-acc-checking-1-001"]//td[last()]
               */}
              <td className="px-4 py-3 text-right text-sm text-slate-600 tabular-nums dark:text-slate-400">
                {txn.runningBalance !== undefined
                  ? formatCurrency(txn.runningBalance)
                  : "—"}
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-sm text-slate-400"
                data-testid="no-transactions-message"
              >
                No transactions match your filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
