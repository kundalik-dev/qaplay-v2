import Link from "next/link";
import type { Transaction } from "../../lib/types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ArrowDownLeft } from "lucide-react";

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
          className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white dark:divide-slate-700 dark:border-slate-700 dark:bg-slate-800"
          data-testid="recent-transactions-list"
        >
          {recent.map((txn) => (
            /*
             * Medium locator: repeated rows — shared testid + unique data-transaction-id
             * Practice:
             *   page.getByTestId('recent-txn-row').filter({ hasText: 'Direct Deposit' })
             *   page.locator('[data-testid="recent-txn-row"][data-transaction-id="txn-acc-checking-1-001"]')
             *   XPath: //div[@data-transaction-id="txn-acc-checking-1-001"]
             */
            <div
              key={txn.id}
              className="flex items-center gap-3 px-4 py-3"
              data-testid="recent-txn-row"
              data-transaction-id={txn.id}
              data-category={txn.category}
            >
              {/* Icon — Challenge: no data-testid, aria-label based */}
              <div
                className={[
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  txn.amount > 0
                    ? "bg-emerald-100 dark:bg-emerald-900/30"
                    : "bg-red-100 dark:bg-red-900/30",
                ].join(" ")}
                aria-label={
                  txn.amount > 0 ? "Credit transaction" : "Debit transaction"
                }
              >
                {txn.amount > 0 ? (
                  <ArrowDownLeft
                    className="h-3.5 w-3.5 text-emerald-600"
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowUpRight
                    className="h-3.5 w-3.5 text-red-600"
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p
                  className="truncate text-sm font-medium text-slate-900 dark:text-white"
                  data-testid="recent-txn-description"
                >
                  {txn.description}
                </p>
                {/*
                 * Hard locator: date — no data-testid, must scope using parent row
                 * XPath: //div[@data-transaction-id="txn-acc-checking-1-001"]//time
                 */}
                <time dateTime={txn.date} className="text-xs text-slate-500">
                  {formatDate(txn.date)}
                </time>
              </div>

              <Badge
                className={`shrink-0 text-xs ${CATEGORY_COLORS[txn.category] ?? "bg-slate-100 text-slate-600"}`}
                data-category-label={txn.category}
              >
                {txn.category}
              </Badge>

              <p
                className={[
                  "shrink-0 text-sm font-semibold tabular-nums",
                  txn.amount > 0
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-900 dark:text-white",
                ].join(" ")}
                data-testid="recent-txn-amount"
              >
                {txn.amount > 0 ? "+" : ""}
                {formatCurrency(txn.amount)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
