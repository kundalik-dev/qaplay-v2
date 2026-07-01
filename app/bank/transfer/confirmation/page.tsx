"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBankAppStore } from "../../store/useBankAppStore";
import { formatCurrency, formatDate } from "../../lib/utils";

export default function TransferConfirmationPage() {
  const router = useRouter();
  const { lastTransferResult, clearLastResults } = useBankAppStore();

  // Guard: if no result, redirect back
  useEffect(() => {
    if (!lastTransferResult) {
      router.replace("/bank/transfer");
    }
  }, [lastTransferResult, router]);

  if (!lastTransferResult) return null;

  const { refId, fromAccount, toAccount, amount, memo, date } =
    lastTransferResult;

  return (
    <div
      className="flex max-w-lg flex-col items-center py-8"
      data-testid="transfer-confirmation-page"
      data-section="transfer-confirmation"
    >
      {/* Success icon */}
      <div
        className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30"
        aria-hidden="true"
      >
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
      </div>

      <h1
        className="mb-1 text-2xl font-bold text-slate-900 dark:text-white"
        data-testid="transfer-success-heading"
      >
        Transfer Successful
      </h1>
      <p className="mb-6 text-sm text-slate-500">Your funds have been moved.</p>

      {/* Ref ID — Beginner: getByTestId */}
      <div className="mb-6 text-center">
        <p className="text-xs text-slate-400">Reference Number</p>
        <p
          className="font-mono text-lg font-bold text-slate-900 dark:text-white"
          data-testid="transfer-ref-id"
        >
          {refId}
        </p>
      </div>

      {/* Summary card */}
      <div
        className="mb-6 w-full rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        data-testid="transfer-confirmation-summary"
      >
        <h2 className="mb-3 text-sm font-semibold text-slate-700">
          Transfer Details
        </h2>
        <div className="space-y-2 text-sm">
          {[
            {
              label: "From",
              value: fromAccount.name,
              testid: "confirm-from-account",
            },
            {
              label: "To",
              value: toAccount.name,
              testid: "confirm-to-account",
            },
            {
              label: "Amount",
              value: formatCurrency(amount),
              testid: "confirm-amount",
            },
            { label: "Date", value: formatDate(date), testid: "confirm-date" },
            ...(memo
              ? [{ label: "Memo", value: memo, testid: "confirm-memo" }]
              : []),
          ].map(({ label, value, testid }) => (
            <div key={label} className="flex justify-between">
              <span className="text-slate-500">{label}</span>
              <span
                className="font-medium text-slate-900 dark:text-white"
                data-testid={testid}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex w-full gap-3">
        <Button
          asChild
          variant="outline"
          className="flex-1"
          data-testid="back-to-dashboard-btn"
          onClick={clearLastResults}
        >
          <Link href="/bank/dashboard">Back to Dashboard</Link>
        </Button>
        <Button
          asChild
          className="flex-1 bg-violet-600 hover:bg-violet-700"
          data-testid="another-transfer-btn"
          onClick={clearLastResults}
        >
          <Link href="/bank/transfer">
            <ArrowLeftRight className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Make Another Transfer
          </Link>
        </Button>
      </div>
    </div>
  );
}
