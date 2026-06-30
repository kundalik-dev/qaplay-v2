"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBankAppStore } from "../../store/useBankAppStore";
import { formatCurrency, formatDate } from "../../lib/utils";

export default function SendMoneyConfirmationPage() {
  const router = useRouter();
  const { lastSendResult, clearLastResults } = useBankAppStore();

  useEffect(() => {
    if (!lastSendResult) router.replace("/bank/send-money");
  }, [lastSendResult, router]);

  if (!lastSendResult) return null;

  const { refId, fromAccount, payee, amount, note, date } = lastSendResult;

  return (
    <div className="flex max-w-lg flex-col items-center py-8" data-testid="send-money-confirmation-page" data-section="send-confirmation">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100" aria-hidden="true">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />
      </div>
      <h1 className="mb-1 text-2xl font-bold text-slate-900 dark:text-white" data-testid="send-success-heading">Money Sent Successfully</h1>
      <p className="mb-6 text-sm text-slate-500">Your payment has been processed.</p>

      <div className="mb-6 text-center">
        <p className="text-xs text-slate-400">Reference Number</p>
        <p className="font-mono text-lg font-bold text-slate-900 dark:text-white" data-testid="send-ref-id">{refId}</p>
      </div>

      <div className="mb-6 w-full rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-800" data-testid="send-confirmation-summary">
        <h2 className="mb-3 text-sm font-semibold text-slate-700">Payment Details</h2>
        <div className="space-y-2 text-sm">
          {[
            { label: "From", value: fromAccount.name, testid: "confirm-from-account" },
            { label: "To", value: payee.name, testid: "confirm-to-payee" },
            { label: "Amount", value: formatCurrency(amount), testid: "confirm-amount" },
            { label: "Date", value: formatDate(date), testid: "confirm-date" },
            ...(note ? [{ label: "Note", value: note, testid: "confirm-note" }] : []),
          ].map(({ label, value, testid }) => (
            <div key={label} className="flex justify-between">
              <span className="text-slate-500">{label}</span>
              <span className="font-medium text-slate-900 dark:text-white" data-testid={testid}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full gap-3">
        <Button asChild variant="outline" className="flex-1" data-testid="back-to-dashboard-btn" onClick={clearLastResults}>
          <Link href="/bank/dashboard">Back to Dashboard</Link>
        </Button>
        <Button asChild className="flex-1 bg-violet-600 hover:bg-violet-700" data-testid="send-again-btn" onClick={clearLastResults}>
          <Link href="/bank/send-money">
            <Send className="mr-1.5 h-4 w-4" />Send Again
          </Link>
        </Button>
      </div>
    </div>
  );
}
