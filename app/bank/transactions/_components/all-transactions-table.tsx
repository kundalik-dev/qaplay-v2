import type { Transaction } from "../../lib/types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, ArrowDown } from "lucide-react";

export type SortField = "date" | "amount";
export type SortOrder = "asc" | "desc";

export interface TransactionWithAccount extends Transaction {
  accountName: string;
}

interface AllTransactionsTableProps {
  transactions: TransactionWithAccount[];
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

export function AllTransactionsTable({
  transactions,
  sortField,
  sortOrder,
  onSort,
}: AllTransactionsTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      data-testid="all-transactions-table-wrapper"
    >
      <table
        className="w-full text-sm"
        data-testid="all-transactions-table"
        aria-label="All account transactions"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
            <th
              className="cursor-pointer px-4 py-3 text-left text-xs font-semibold text-slate-600 select-none hover:text-slate-900 dark:text-slate-400"
              onClick={() => onSort("date")}
              data-testid="all-txn-sort-date-header"
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
            {/* Hard locator: Account header — no data-testid */}
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Account
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
              data-testid="all-txn-sort-amount-header"
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
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {transactions.map((txn) => (
            /*
             * Medium locator: shared data-testid + unique data-transaction-id + data-account-id
             * Practice:
             *   page.getByTestId('all-txn-row').filter({ hasText: 'Direct Deposit' })
             *   page.locator('[data-testid="all-txn-row"][data-transaction-id="txn-1001"]')
             *   XPath: //tr[@data-transaction-id="txn-1001"]
             */
            <tr
              key={txn.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
              data-testid="all-txn-row"
              data-transaction-id={txn.id}
              data-account-id={txn.accountId}
              data-category={txn.category}
              data-type={txn.type}
            >
              <td
                className="px-4 py-3 text-xs whitespace-nowrap text-slate-600 dark:text-slate-400"
                data-testid="all-txn-date"
              >
                <time dateTime={txn.date}>{formatDate(txn.date)}</time>
              </td>

              {/*
               * Hard locator: account name — no data-testid, must scope from row
               * XPath: //tr[@data-transaction-id="txn-1001"]/td[2]
               */}
              <td className="px-4 py-3 text-xs text-slate-500">
                {txn.accountName}
              </td>

              <td
                className="px-4 py-3 text-sm text-slate-900 dark:text-white"
                data-testid="all-txn-description"
              >
                {txn.description}
              </td>

              <td className="px-4 py-3">
                <Badge
                  className={`text-xs ${CATEGORY_COLORS[txn.category] ?? "bg-slate-100 text-slate-600"}`}
                  data-testid="all-txn-category-badge"
                  data-category-value={txn.category.toLowerCase()}
                >
                  {txn.category}
                </Badge>
              </td>

              <td
                className={[
                  "px-4 py-3 text-right text-sm font-semibold tabular-nums",
                  txn.amount > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-red-600 dark:text-red-400",
                ].join(" ")}
                data-testid="all-txn-amount"
                data-amount={txn.amount}
              >
                {txn.amount > 0 ? "+" : ""}
                {formatCurrency(txn.amount)}
              </td>
            </tr>
          ))}

          {transactions.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-sm text-slate-400"
                data-testid="no-all-transactions-message"
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
