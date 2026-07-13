"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBankAppStore } from "../../store/useBankAppStore";
import { formatCurrency, formatDate } from "../../lib/utils";

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
  
  const userLoans = currentUsername ? loanApplications[currentUsername] ?? [] : [];
  const loan = userLoans.find((l) => l.id === loanId);

  if (!loan) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-semibold mb-4 text-slate-800 dark:text-slate-200">Loan not found</h2>
        <Button onClick={() => router.push("/bank/apply-loan")}>Return to Loans</Button>
      </div>
    );
  }

  return (
    <div data-testid="loan-details-page">
      <div className="mb-6 flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild className="mr-2">
          <Link href="/bank/apply-loan">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
          <Landmark className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white" data-testid="loan-details-title">
            Loan Details
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            {loan.refId}
          </p>
        </div>
        <div className="ml-auto">
          <Badge className={`text-sm capitalize px-3 py-1 ${STATUS_COLORS[loan.status] ?? "bg-slate-100 text-slate-600"}`}>
            {loan.status}
          </Badge>
        </div>
      </div>

      <div className="max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-1">Loan Amount</h3>
              <p className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                {formatCurrency(loan.amount)}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Loan Type</h3>
                <Badge className={`text-xs ${LOAN_TYPE_COLORS[loan.loanType] ?? "bg-slate-100 text-slate-600"}`}>
                  {loan.loanType}
                </Badge>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Term length</h3>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">{loan.termMonths} Months</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Interest Rate</h3>
                <p className="text-base font-semibold text-slate-800 dark:text-slate-200">{loan.interestRate}%</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-500 mb-1">Disbursement Account</h3>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {loan.disbursementAccount.name} <br />
                  <span className="text-slate-500 font-mono text-xs">{loan.disbursementAccount.accountNumber}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-medium text-slate-500 mb-2">Purpose</h3>
              <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg text-sm text-slate-700 dark:text-slate-300 min-h-[100px]">
                {loan.purpose}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg">
              <div>
                <h3 className="text-xs font-medium text-slate-500 mb-1">Created On</h3>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                  {formatDate(loan.date)}
                </p>
              </div>
              {loan.updatedAt && (
                <div>
                  <h3 className="text-xs font-medium text-slate-500 mb-1">Last Updated</h3>
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
                    {formatDate(loan.updatedAt)}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
