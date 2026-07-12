import Link from "next/link";
import type { Transaction } from "../../lib/types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface RecentTransactionsListProps {
  transactions: Transaction[];
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

export function RecentTransactionsList({
  transactions,
}: RecentTransactionsListProps) {
  const recent = transactions.slice(0, 5);

  return (
    <section
      data-testid="recent-transactions-section"
      aria-label="Recent transactions"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-300">
          Recent Transactions
        </h2>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-xs text-violet-600 hover:text-violet-700"
          data-testid="view-all-transactions-btn"
        >
          <Link href="/bank/accounts">View all</Link>
        </Button>
      </div>

      {recent.length === 0 ? (
        <p
          className="py-6 text-center text-sm text-slate-500"
          data-testid="no-recent-transactions"
        >
          No recent transactions.
        </p>
      ) : (
        <div
          className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
          data-testid="recent-transactions-table-wrapper"
        >
          <table
            className="w-full text-sm"
            data-testid="recent-transactions-table"
            aria-label="Recent transactions"
          >
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
                {/* Beginner: getByTestId on header cell */}
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400"
                  data-testid="recent-txn-header-date"
                >
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Description
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Category
                </th>
                {/*
                 * Hard locator: Amount header — no data-testid
                 * XPath: //table[@data-testid="recent-transactions-table"]//th[last()]
                 */}
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {recent.map((txn) => (
                /*
                 * Medium locator: shared data-testid + unique data-transaction-id + data-category
                 * Practice:
                 *   page.getByTestId('recent-txn-row').filter({ hasText: 'Direct Deposit' })
                 *   page.locator('[data-testid="recent-txn-row"][data-transaction-id="txn-acc-checking-1-001"]')
                 *   XPath: //tr[@data-transaction-id="txn-acc-checking-1-001"]
                 */
                <tr
                  key={txn.id}
                  className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  data-testid="recent-txn-row"
                  data-transaction-id={txn.id}
                  data-category={txn.category}
                  data-type={txn.type}
                >
                  {/* Beginner: getByTestId inside row */}
                  <td
                    className="px-4 py-3 text-xs whitespace-nowrap text-slate-500"
                    data-testid="recent-txn-date"
                  >
                    <time dateTime={txn.date}>{formatDate(txn.date)}</time>
                  </td>

                  <td
                    className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white"
                    data-testid="recent-txn-description"
                  >
                    {txn.description}
                  </td>

                  <td className="px-4 py-3">
                    <Badge
                      className={`text-xs ${CATEGORY_COLORS[txn.category] ?? "bg-slate-100 text-slate-600"}`}
                      data-category-label={txn.category}
                    >
                      {txn.category}
                    </Badge>
                  </td>

                  {/*
                   * Hard locator: amount cell — no data-testid, aria-label carries the
                   * sign/context; must be scoped from the row's data-transaction-id.
                   * Practice: page.locator('[data-transaction-id="txn-1001"]').getByLabel(/transaction amount/i)
                   */}
                  <td
                    className={[
                      "px-4 py-3 text-right text-sm font-semibold tabular-nums",
                      txn.amount > 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-slate-900 dark:text-white",
                    ].join(" ")}
                    aria-label={`Transaction amount ${formatCurrency(txn.amount)}`}
                  >
                    {txn.amount > 0 ? "+" : ""}
                    {formatCurrency(txn.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
