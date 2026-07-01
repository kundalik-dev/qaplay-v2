"use client";

import Link from "next/link";
import { formatCurrency } from "../lib/utils";
import { useBankAppStore, useUserAccounts } from "../store/useBankAppStore";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowRight, CreditCard } from "lucide-react";

const TYPE_STYLES: Record<string, string> = {
  Checking: "bg-violet-100 text-violet-700",
  Savings: "bg-emerald-100 text-emerald-700",
  Credit: "bg-rose-100 text-rose-700",
};

export default function AccountsPage() {
  const { currentUsername } = useBankAppStore();
  const accounts = useUserAccounts(currentUsername);

  return (
    <div data-testid="accounts-page" data-section="accounts">
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-slate-900 dark:text-white"
          data-testid="accounts-page-title"
        >
          My Accounts
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Manage your accounts and view transaction history.
        </p>
      </div>

      {accounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center"
          data-testid="no-accounts-state"
        >
          <CreditCard className="mb-3 h-10 w-10 text-slate-300" />
          <p className="text-sm text-slate-500">No accounts found.</p>
        </div>
      ) : (
        /*
         * Medium locator: repeated account cards
         * data-testid="account-card" + data-account-id + data-account-type
         * Practice:
         *   page.getByTestId('account-card').filter({ hasText: 'High-Yield Savings' })
         *   page.locator('[data-testid="account-card"][data-account-type="savings"]')
         *   XPath: //article[@data-account-type="checking"]//p[contains(@class,"text-2xl")]
         */
        <div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="accounts-grid"
        >
          {accounts.map((account) => (
            <article
              key={account.id}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
              data-testid="account-card"
              data-account-id={account.id}
              data-account-type={account.type.toLowerCase()}
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30">
                    <CreditCard
                      className="h-4 w-4 text-violet-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <h2
                      className="font-semibold text-slate-900 dark:text-white"
                      data-testid="account-name"
                    >
                      {account.name}
                    </h2>
                    {/*
                     * Hard locator: account number — no data-testid, font-mono class
                     * XPath: //article[@data-account-id="acc-checking-1"]//*[contains(@class,"font-mono")]
                     */}
                    <p className="font-mono text-xs text-slate-500">
                      {account.accountNumber}
                    </p>
                  </div>
                </div>
                <Badge
                  className={TYPE_STYLES[account.type] ?? ""}
                  data-testid="account-type-badge"
                >
                  {account.type}
                </Badge>
              </div>

              {/* Balance */}
              <div className="mb-2">
                <p className="text-xs text-slate-500">Current Balance</p>
                <p
                  className={[
                    "text-2xl font-bold tabular-nums",
                    account.isOverdrawn
                      ? "text-red-600 dark:text-red-400"
                      : "text-slate-900 dark:text-white",
                  ].join(" ")}
                  data-testid="account-balance"
                  data-balance={account.balance}
                >
                  {formatCurrency(account.balance)}
                </p>
              </div>

              {account.isOverdrawn && (
                <div
                  className="mb-3 flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1.5 text-xs font-medium text-red-700"
                  data-testid="overdrawn-indicator"
                >
                  <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                  This account is overdrawn
                </div>
              )}

              <div className="mt-auto pt-4">
                <Button
                  asChild
                  variant="outline"
                  className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden border-slate-200 bg-slate-50/50 text-slate-700 transition-all hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 hover:shadow-sm dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-300 dark:hover:border-violet-700 dark:hover:bg-violet-900/30 dark:hover:text-violet-300"
                  data-testid="view-account-transactions-btn"
                >
                  <Link href={`/bank/accounts/${account.id}`}>
                    <span className="font-medium">View Transactions</span>
                    <ArrowRight
                      className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
