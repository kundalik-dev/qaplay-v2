"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBankAppStore } from "../../store/useBankAppStore";
import { formatCurrency, formatDate } from "../../lib/utils";

export default function ApplyLoanConfirmationPage() {
  const router = useRouter();
  const { lastLoanResult, clearLastResults } = useBankAppStore();

  // Guard: if no result, redirect back
  useEffect(() => {
    if (!lastLoanResult) {
      router.replace("/bank/apply-loan");
    }
  }, [lastLoanResult, router]);

  if (!lastLoanResult) return null;

  const {
    refId,
    loanType,
    amount,
    termMonths,
    purpose,
    disbursementAccount,
    date,
  } = lastLoanResult;

  return (
    <div
      className="flex max-w-lg flex-col items-center py-8"
      data-testid="apply-loan-confirmation-page"
      data-section="apply-loan-confirmation"
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
        data-testid="loan-success-heading"
      >
        Application Submitted
      </h1>
      <p className="mb-6 text-sm text-slate-500">
        We&apos;ll review your loan application and follow up shortly.
      </p>

      {/* Ref ID — Beginner: getByTestId */}
      <div className="mb-6 text-center">
        <p className="text-xs text-slate-400">Reference Number</p>
        <p
          className="font-mono text-lg font-bold text-slate-900 dark:text-white"
          data-testid="loan-ref-id"
        >
          {refId}
        </p>
      </div>

      {/* Summary card */}
      <div
        className="mb-6 w-full rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800"
        data-testid="loan-confirmation-summary"
      >
        <h2 className="mb-3 text-sm font-semibold text-slate-700 dark:text-slate-300">
          Application Details
        </h2>
        <div className="space-y-2 text-sm">
          {[
            { label: "Loan Type", value: loanType, testid: "confirm-loan-type" },
            {
              label: "Amount",
              value: formatCurrency(amount),
              testid: "confirm-loan-amount",
            },
            {
              label: "Term",
              value: `${termMonths} months`,
              testid: "confirm-loan-term",
            },
            {
              label: "Deposit To",
              value: disbursementAccount.name,
              testid: "confirm-loan-account",
            },
            { label: "Purpose", value: purpose, testid: "confirm-loan-purpose" },
            {
              label: "Submitted",
              value: formatDate(date),
              testid: "confirm-loan-date",
            },
          ].map(({ label, value, testid }) => (
            <div key={label} className="flex justify-between gap-4">
              <span className="text-slate-500">{label}</span>
              <span
                className="text-right font-medium text-slate-900 dark:text-white"
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
          data-testid="another-loan-btn"
          onClick={clearLastResults}
        >
          <Link href="/bank/apply-loan">
            <Landmark className="mr-1.5 h-4 w-4" aria-hidden="true" />
            Apply for Another Loan
          </Link>
        </Button>
      </div>
    </div>
  );
}
