"use client";

import { useEffect, useState } from "react";
import {
  useBankAppStore,
  useCurrentUser,
  useUserAccounts,
  useUserTransactions,
} from "../store/useBankAppStore";
import { QuickActions } from "./_components/quick-actions";
import { RecentTransactionsList } from "./_components/recent-transactions-list";
import { StatCards } from "./_components/stat-cards";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export default function DashboardPage() {
  const { currentUsername } = useBankAppStore();
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const transactions = useUserTransactions(currentUsername);

  // slow_user artificial delay
  const [isVisible, setIsVisible] = useState(!currentUser?.loadDelay);

  useEffect(() => {
    if (currentUser?.loadDelay) {
      const t = setTimeout(() => setIsVisible(true), currentUser.loadDelay);
      return () => clearTimeout(t);
    }
  }, [currentUser?.loadDelay]);

  const totalBalance = accounts.reduce((sum, a) => sum + a.balance, 0);
  const isFrozen = currentUser?.status === "frozen";
  const firstName = currentUser?.profile.firstName ?? currentUsername ?? "User";

  const now = new Date();
  const currentMonthTxns = transactions.filter((txn) => {
    const d = new Date(txn.date + "T12:00:00Z");
    return (
      d.getUTCFullYear() === now.getUTCFullYear() &&
      d.getUTCMonth() === now.getUTCMonth()
    );
  });
  const monthlyIncome = currentMonthTxns
    .filter((txn) => txn.amount > 0)
    .reduce((sum, txn) => sum + txn.amount, 0);
  const monthlyExpense = currentMonthTxns
    .filter((txn) => txn.amount < 0)
    .reduce((sum, txn) => sum + Math.abs(txn.amount), 0);

  if (!isVisible) {
    return (
      <div
        data-testid="dashboard-loading"
        aria-busy="true"
        aria-label="Loading dashboard"
      >
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

      {/* ── Top stat cards ───────────────────────────────────────── */}
      <StatCards
        netWorth={totalBalance}
        accountCount={accounts.length}
        monthlyIncome={monthlyIncome}
        monthlyExpense={monthlyExpense}
      />

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
