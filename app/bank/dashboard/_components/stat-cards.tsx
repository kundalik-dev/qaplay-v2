import { formatCurrency } from "../../lib/utils";
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from "lucide-react";

interface StatCardsProps {
  netWorth: number;
  accountCount: number;
  monthlyIncome: number;
  monthlyExpense: number;
}

/**
 * Top-of-dashboard stat cards.
 *
 * Locator practice — each card uses a different strategy on purpose:
 *  - net-worth: getByTestId on both label and value (beginner)
 *  - accounts: shared data-testid + data-metric discriminator (medium)
 *  - income: aria-label on the value, no testid on the value itself (medium/hard)
 *  - expense: value has no testid or aria-label — must be located via
 *    sibling traversal from the labelled parent card (hard/XPath practice)
 *    XPath: //div[@data-testid="stat-card" and @data-metric="expense"]//p[contains(@class,"text-xl")]
 */
export function StatCards({
  netWorth,
  accountCount,
  monthlyIncome,
  monthlyExpense,
}: StatCardsProps) {
  const netChange = monthlyIncome - monthlyExpense;

  return (
    <div
      className="mb-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4"
      data-testid="dashboard-stat-cards"
      data-section="dashboard-stats"
    >
      {/* Net worth — beginner locator: getByTestId */}
      <div
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        data-testid="stat-card"
        data-metric="net-worth"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
            <Wallet
              className="h-4 w-4 text-violet-600 dark:text-violet-400"
              aria-hidden="true"
            />
          </div>
          <p
            className="text-xs font-medium text-slate-500"
            data-testid="stat-card-net-worth-label"
          >
            Total Net Worth
          </p>
        </div>
        <p
          className="text-xl font-bold tabular-nums text-slate-900 dark:text-white"
          data-testid="stat-card-net-worth-value"
        >
          {formatCurrency(netWorth)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">
          Across {accountCount} account{accountCount !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Net change — medium locator: shared testid + data-metric filter */}
      <div
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        data-testid="stat-card"
        data-metric="net-change"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 dark:bg-amber-900/30">
            <PiggyBank
              className="h-4 w-4 text-amber-600 dark:text-amber-400"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs font-medium text-slate-500">Net Change</p>
        </div>
        {/*
         * Medium locator: value distinguished only by data-metric on parent
         * Practice: page.locator('[data-testid="stat-card"][data-metric="net-change"] [data-testid="stat-card-value"]')
         */}
        <p
          className={[
            "text-xl font-bold tabular-nums",
            netChange >= 0
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-red-600 dark:text-red-400",
          ].join(" ")}
          data-testid="stat-card-value"
        >
          {netChange >= 0 ? "+" : ""}
          {formatCurrency(netChange)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">This month</p>
      </div>

      {/* Income — hard-ish locator: value has aria-label, no testid */}
      <div
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        data-testid="stat-card"
        data-metric="income"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
            <TrendingUp
              className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs font-medium text-slate-500">Income</p>
        </div>
        {/*
         * Hard locator: no data-testid on the value — locate via aria-label
         * Practice: page.getByLabel('Monthly income amount')
         *   XPath: //div[@data-testid="stat-card" and @data-metric="income"]//p[@aria-label]
         */}
        <p
          className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400"
          aria-label="Monthly income amount"
        >
          +{formatCurrency(monthlyIncome)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">This month</p>
      </div>

      {/* Expense — hardest locator: no testid, no aria-label on value */}
      <div
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        data-testid="stat-card"
        data-metric="expense"
      >
        <div className="mb-2 flex items-center gap-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-900/30">
            <TrendingDown
              className="h-4 w-4 text-rose-600 dark:text-rose-400"
              aria-hidden="true"
            />
          </div>
          <p className="text-xs font-medium text-slate-500">Expenses</p>
        </div>
        {/*
         * Challenge locator: no testid, no aria-label — must scope from
         * the card's data-metric attribute and match by class/position.
         * XPath: //div[@data-testid="stat-card" and @data-metric="expense"]//p[contains(@class,"text-xl")]
         */}
        <p className="text-xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
          -{formatCurrency(monthlyExpense)}
        </p>
        <p className="mt-0.5 text-xs text-slate-500">This month</p>
      </div>
    </div>
  );
}
