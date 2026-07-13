"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Landmark,
  FileText,
  Wallet,
  Percent,
  CalendarClock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBankAppStore } from "../../store/useBankAppStore";
import {
  formatCurrency,
  formatDate,
  calculateLoanPayment,
} from "../../lib/utils";

const LOAN_TYPE_COLORS: Record<string, string> = {
  Personal: "bg-violet-100 text-violet-700",
  Auto: "bg-cyan-100 text-cyan-700",
  Home: "bg-amber-100 text-amber-700",
  Student: "bg-emerald-100 text-emerald-700",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  closed: "bg-slate-200 text-slate-600",
  rejected: "bg-red-100 text-red-700",
};

export default function LoanDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const loanId = params.loanId as string;
  const { currentUsername, loanApplications } = useBankAppStore();

  const userLoans = currentUsername
    ? (loanApplications[currentUsername] ?? [])
    : [];
  const loan = userLoans.find((l) => l.id === loanId);

  if (!loan) {
    return (
      <div className="p-8 text-center">
        <h2 className="mb-4 text-xl font-semibold text-slate-800 dark:text-slate-200">
          Loan not found
        </h2>
        <Button onClick={() => router.push("/bank/apply-loan")}>
          Return to Loans
        </Button>
      </div>
    );
  }

  const { monthlyPayment, totalRepayment } = calculateLoanPayment(
    loan.amount,
    loan.interestRate,
    loan.termMonths,
  );

  const detailRows: Array<{ label: string; node: React.ReactNode }> = [
    {
      label: "Loan Type",
      node: (
        <Badge
          className={`text-xs ${LOAN_TYPE_COLORS[loan.loanType] ?? "bg-slate-100 text-slate-600"}`}
        >
          {loan.loanType}
        </Badge>
      ),
    },
    {
      label: "Term Length",
      node: (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {loan.termMonths} months
        </span>
      ),
    },
    {
      label: "Interest Rate (APR)",
      node: (
        <span className="font-semibold text-slate-800 dark:text-slate-200">
          {loan.interestRate}%
        </span>
      ),
    },
    {
      label: "Disbursement Account",
      node: (
        <span className="text-right">
          <span className="block font-medium text-slate-800 dark:text-slate-200">
            {loan.disbursementAccount.name}
          </span>
          <span className="block font-mono text-xs text-slate-500">
            {loan.disbursementAccount.accountNumber}
          </span>
        </span>
      ),
    },
    {
      label: "Created On",
      node: (
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {formatDate(loan.date)}
        </span>
      ),
    },
  ];

  if (loan.updatedAt) {
    detailRows.push({
      label: "Last Updated",
      node: (
        <span className="font-medium text-slate-800 dark:text-slate-200">
          {formatDate(loan.updatedAt)}
        </span>
      ),
    });
  }

  return (
    <div data-testid="loan-details-page" className="max-w-4xl">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="mr-2"
          data-testid="loan-details-back-btn"
        >
          <Link href="/bank/apply-loan">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
          <Landmark className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="loan-details-title"
          >
            Loan Details
          </h1>
          <p className="font-mono text-sm text-slate-500">{loan.refId}</p>
        </div>
        <div className="ml-auto">
          <Badge
            data-testid="loan-details-status-badge"
            className={`px-3 py-1 text-sm capitalize ${STATUS_COLORS[loan.status] ?? "bg-slate-100 text-slate-600"}`}
          >
            {loan.status}
          </Badge>
        </div>
      </div>

      {/* Hero card: amount + at-a-glance figures */}
      <section
        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
        data-testid="loan-amount-section"
        data-section="loan-amount"
      >
        <h3 className="text-sm font-medium text-slate-500">Loan Amount</h3>
        <p
          className="mt-1 text-4xl font-bold tracking-tight text-slate-900 tabular-nums dark:text-white"
          data-testid="loan-amount-value"
        >
          {formatCurrency(loan.amount)}
        </p>

        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5 border-t border-slate-100 pt-5 dark:border-slate-700">
          <div className="flex items-start gap-2.5">
            <Wallet
              className="mt-0.5 h-4 w-4 text-violet-500"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-slate-500">
                Est. Monthly Payment
              </p>
              <p
                className="text-lg font-semibold text-slate-900 tabular-nums dark:text-white"
                data-testid="loan-monthly-payment-value"
              >
                {formatCurrency(monthlyPayment)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <Percent
              className="mt-0.5 h-4 w-4 text-violet-500"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-slate-500">
                Est. Total Repayment
              </p>
              <p
                className="text-lg font-semibold text-slate-900 tabular-nums dark:text-white"
                data-testid="loan-total-repayment-value"
              >
                {formatCurrency(totalRepayment)}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CalendarClock
              className="mt-0.5 h-4 w-4 text-violet-500"
              aria-hidden="true"
            />
            <div>
              <p className="text-xs font-medium text-slate-500">Term</p>
              <p className="text-lg font-semibold text-slate-900 dark:text-white">
                {loan.termMonths} mo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details + Purpose cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
        <section
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          data-testid="loan-details-list"
          data-section="loan-details"
        >
          <h3 className="mb-1 text-sm font-medium text-slate-500">Details</h3>
          <dl className="divide-y divide-slate-100 dark:divide-slate-700">
            {detailRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-6 py-3"
                data-testid="loan-detail-row"
                data-label={row.label.toLowerCase().replace(/[^a-z]+/g, "-")}
              >
                <dt className="text-sm text-slate-500">{row.label}</dt>
                <dd className="text-sm">{row.node}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
          data-testid="loan-purpose-section"
          data-section="loan-purpose"
        >
          <h3 className="mb-2 flex items-center gap-1.5 text-sm font-medium text-slate-500">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            Purpose
          </h3>
          <blockquote
            className="border-l-2 border-violet-300 pl-4 text-sm leading-relaxed text-slate-700 italic dark:border-violet-800 dark:text-slate-300"
            data-testid="loan-purpose-text"
          >
            &ldquo;{loan.purpose}&rdquo;
          </blockquote>
        </section>
      </div>
    </div>
  );
}
