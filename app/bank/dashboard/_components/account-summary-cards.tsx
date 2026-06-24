import type { Account } from "../../lib/types";
import { formatCurrency } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";

interface AccountSummaryCardsProps {
  accounts: Account[];
}

const TYPE_STYLES: Record<string, string> = {
  Checking: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  Savings: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  Credit: "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
};

export function AccountSummaryCards({ accounts }: AccountSummaryCardsProps) {
  if (accounts.length === 0) {
    return (
      <p className="text-sm text-slate-500" data-testid="no-accounts-message">
        No accounts found.
      </p>
    );
  }

  return (
    /*
     * Medium locator: repeated cards — shared data-testid="account-card" + unique data-account-id
     * Practice:
     *   page.getByTestId('account-card').filter({ hasText: 'Everyday Checking' })
     *   page.locator('[data-testid="account-card"][data-account-id="acc-checking-1"]')
     *   //article[@data-testid="account-card" and .//h3[normalize-space()="Everyday Checking"]]
     */
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      data-testid="account-summary-grid"
    >
      {accounts.map((account) => (
        <article
          key={account.id}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
          data-testid="account-card"
          data-account-id={account.id}
          data-account-type={account.type.toLowerCase()}
        >
          <div className="mb-3 flex items-start justify-between">
            <div>
              {/* Beginner: getByTestId inside account card */}
              <h3
                className="font-semibold text-slate-900 dark:text-white"
                data-testid="account-card-name"
              >
                {account.name}
              </h3>
              {/*
               * Hard locator: account number — no data-testid
               * XPath: //article[@data-account-id="acc-checking-1"]//p[contains(@class,"font-mono")]
               */}
              <p className="mt-0.5 font-mono text-xs text-slate-500">
                {account.accountNumber}
              </p>
            </div>
            <Badge
              className={TYPE_STYLES[account.type] ?? ""}
              data-testid="account-type-badge"
              data-account-type={account.type.toLowerCase()}
            >
              {account.type}
            </Badge>
          </div>

          {/* Balance */}
          <div className="mb-4">
            <p className="text-xs text-slate-500">Available balance</p>
            <p
              className={[
                "text-2xl font-bold tabular-nums",
                account.isOverdrawn
                  ? "text-red-600 dark:text-red-400"
                  : "text-slate-900 dark:text-white",
              ].join(" ")}
              data-testid="account-card-balance"
              data-balance={account.balance}
            >
              {formatCurrency(account.balance)}
            </p>
            {account.isOverdrawn && (
              <div
                className="mt-1 flex items-center gap-1 text-xs font-medium text-red-600"
                data-testid="overdrawn-badge"
              >
                <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                Overdrawn
              </div>
            )}
          </div>

          {/* Trend indicator — Challenge: no data-testid, aria-label based */}
          <div className="mb-4 flex items-center gap-1.5 text-xs text-slate-500">
            {account.balance > 0 ? (
              <TrendingUp
                className="h-3.5 w-3.5 text-emerald-500"
                aria-label="Balance is positive"
              />
            ) : (
              <TrendingDown
                className="h-3.5 w-3.5 text-red-500"
                aria-label="Balance is negative"
              />
            )}
            <span>
              {account.type === "Savings" ? "High-yield savings" : `${account.type} account`}
            </span>
          </div>

          {/* View transactions — Beginner: role + testid */}
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full"
            data-testid="view-transactions-btn"
          >
            <Link href={`/bank/accounts/${account.id}`}>
              View Transactions
            </Link>
          </Button>
        </article>
      ))}
    </div>
  );
}
