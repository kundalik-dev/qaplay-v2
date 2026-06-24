"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "../lib/utils";
import {
  useBankAppStore,
  useCurrentUser,
  useUserAccounts,
  useUserTransactions,
} from "../store/useBankAppStore";
import { AccountSummaryCards } from "./_components/account-summary-cards";
import { QuickActions } from "./_components/quick-actions";
import { RecentTransactionsList } from "./_components/recent-transactions-list";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const { currentUsername } = useBankAppStore();
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const transactions = useUserTransactions(currentUsername);

  // slow_user artificial delay
  const [isVisible, setIsVisible] = useState(
    !currentUser?.loadDelay,
  );

  useEffect(() => {
    if (currentUser?.loadDelay) {
      const t = setTimeout(() => setIsVisible(true), currentUser.loadDelay);
      return () => clearTimeout(t);
    }
  }, [currentUser?.loadDelay]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const isFrozen = currentUser?.status === "frozen";
  const firstName = currentUser?.profile.firstName ?? currentUsername ?? "User";

  if (!isVisible) {
    return (
      <div data-testid="dashboard-loading" aria-busy="true" aria-label="Loading dashboard">
        <Skeleton className="mb-1 h-7 w-48" />
        <Skeleton className="mb-6 h-4 w-64" />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-24 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="bank-dashboard-page" data-section="dashboard">
      {/* Page header */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold text-slate-900 dark:text-white"
          data-testid="dashboard-welcome-message"
        >
          Welcome back, {firstName}
        </h1>
        <p className="mt-0.5 text-sm text-slate-500">
          Here&apos;s your financial overview.
        </p>
      </div>

      {/* ── Total balance stat ───────────────────────────────────── */}
      <div
        className="mb-6 max-w-md rounded-xl border border-blue-200 bg-gradient-to-r from-blue-600 to-blue-800 p-5 text-white"
        data-testid="total-balance-card"
      >
        <p className="text-sm text-blue-200">Total Net Worth</p>
        {/*
         * Hard locator: total balance value — no data-testid, sibling of label paragraph
         * XPath: //div[@data-testid="total-balance-card"]//p[2]
         *        //div[@data-testid="total-balance-card"]/p[contains(@class,"text-3xl")]
         */}
        <p
          className="mt-1 text-3xl font-bold tabular-nums"
          data-testid="dashboard-total-balance"
        >
          {formatCurrency(totalBalance)}
        </p>
        <p className="mt-1 text-xs text-blue-300">
          Across {accounts.length} account{accounts.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* ── Account summary cards ─────────────────────────────────── */}
      <section className="mb-6" aria-label="Account summaries">
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Your Accounts
        </h2>
        <AccountSummaryCards accounts={accounts} />
      </section>

      <Separator className="my-6" />

      {/* ── Quick actions ─────────────────────────────────────────── */}
      <div className="mb-6">
        <QuickActions isFrozen={isFrozen} />
      </div>

      <Separator className="my-6" />

      {/* ── Recent transactions ───────────────────────────────────── */}
      <RecentTransactionsList transactions={transactions} />
    </div>
  );
}
