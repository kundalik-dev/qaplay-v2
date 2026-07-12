"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Landmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useBankAppStore,
  useCurrentUser,
  useUserAccounts,
} from "../store/useBankAppStore";
import { formatCurrency } from "../lib/utils";
import type { LoanType } from "../lib/types";

const LOAN_TYPES: LoanType[] = ["Personal", "Auto", "Home", "Student"];
const TERM_OPTIONS = [12, 24, 36, 48, 60];

export default function ApplyLoanPage() {
  const router = useRouter();
  const { currentUsername, applyLoan } = useBankAppStore();
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [loanType, setLoanType] = useState<LoanType | "">("");
  const [amount, setAmount] = useState("");
  const [termMonths, setTermMonths] = useState<string>("36");
  const [accountId, setAccountId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const disbursementAccount = accounts.find((a) => a.id === accountId);

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!loanType) {
      setError("Please select a loan type.");
      return;
    }
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError("Please enter a valid loan amount.");
      return;
    }
    if (amt > 250000) {
      setError("Loan amount cannot exceed $250,000.");
      return;
    }
    if (!accountId) {
      setError("Please select a disbursement account.");
      return;
    }
    if (!purpose.trim()) {
      setError("Please describe the purpose of the loan.");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const err = applyLoan(
      currentUsername!,
      loanType as LoanType,
      parseFloat(amount),
      parseInt(termMonths, 10),
      purpose,
      accountId,
    );
    if (err) {
      setError(err);
      setShowConfirm(false);
    } else {
      setShowConfirm(false);
      router.push("/bank/apply-loan/confirmation");
    }
  };

  return (
    <div data-testid="apply-loan-page" data-section="apply-loan">
      <Link
        href="/bank/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
        data-testid="back-to-dashboard-link"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Dashboard
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-900/30">
          <Landmark className="h-5 w-5 text-amber-600" aria-hidden="true" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="apply-loan-page-title"
          >
            Apply for a Loan
          </h1>
          <p className="text-sm text-slate-500">
            Personal, auto, home, and student loans
          </p>
        </div>
      </div>

      {isFrozen && (
        <div
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="alert"
          data-testid="apply-loan-frozen-banner"
        >
          Loan applications are disabled while your account is frozen.
        </div>
      )}

      <div className="max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              role="alert"
              data-testid="apply-loan-error-message"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleReview}
            data-testid="apply-loan-form"
            aria-label="Loan application form"
            noValidate
          >
            {/* Loan type — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="loan-type-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Loan Type
              </Label>
              <Select
                value={loanType}
                onValueChange={(v) => setLoanType(v as LoanType)}
                disabled={isFrozen}
              >
                <SelectTrigger
                  id="loan-type-trigger"
                  data-testid="loan-type-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select loan type" />
                </SelectTrigger>
                <SelectContent data-testid="loan-type-options">
                  {LOAN_TYPES.map((type) => (
                    <SelectItem
                      key={type}
                      value={type}
                      data-testid="loan-type-option"
                      data-loan-type={type.toLowerCase()}
                    >
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="loan-amount"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Loan Amount
              </Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <Input
                  id="loan-amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isFrozen}
                  data-testid="loan-amount-input"
                  className="pl-7"
                />
              </div>
            </div>

            {/* Term — Medium: shared testid, disambiguate by data-term-months */}
            <div className="mb-4">
              <Label
                htmlFor="loan-term-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Term Length
              </Label>
              <Select
                value={termMonths}
                onValueChange={setTermMonths}
                disabled={isFrozen}
              >
                <SelectTrigger
                  id="loan-term-trigger"
                  data-testid="loan-term-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent data-testid="loan-term-options">
                  {TERM_OPTIONS.map((months) => (
                    /*
                     * Medium locator: shared data-testid + unique data-term-months
                     * Practice: page.locator('[data-testid="loan-term-option"][data-term-months="36"]')
                     */
                    <SelectItem
                      key={months}
                      value={String(months)}
                      data-testid="loan-term-option"
                      data-term-months={months}
                    >
                      {months} months
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Disbursement account — Beginner */}
            <div className="mb-4">
              <Label
                htmlFor="loan-account-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Disbursement Account
              </Label>
              <Select
                value={accountId}
                onValueChange={setAccountId}
                disabled={isFrozen}
              >
                <SelectTrigger
                  id="loan-account-trigger"
                  data-testid="loan-account-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent data-testid="loan-account-options">
                  {accounts.map((acc) => (
                    <SelectItem
                      key={acc.id}
                      value={acc.id}
                      data-testid="loan-account-option"
                      data-account-id={acc.id}
                    >
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Purpose — Hard: span label, no for/id pairing */}
            <div className="mb-5">
              {/*
               * Hard locator: purpose textarea — span label, no for/id pair
               * XPath: //span[normalize-space()="Purpose"]/following-sibling::div//textarea
               *        //textarea[starts-with(@name,"loan_purpose_")]
               */}
              <span className="mb-1.5 block text-sm font-medium text-slate-700">
                Purpose
              </span>
              <Textarea
                name="loan_purpose_field"
                placeholder="What will this loan be used for?"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                disabled={isFrozen}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isFrozen}
                data-testid="review-loan-btn"
                className="flex-1 bg-violet-600 hover:bg-violet-700"
              >
                Review Application
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                data-testid="cancel-loan-btn"
              >
                <Link href="/bank/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent
          data-testid="loan-confirm-dialog"
          aria-label="Confirm loan application"
        >
          <DialogHeader>
            <DialogTitle data-testid="loan-confirm-title">
              Confirm Loan Application
            </DialogTitle>
          </DialogHeader>

          <div
            className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-900"
            data-testid="loan-confirm-summary"
          >
            {[
              { label: "Loan Type", value: loanType },
              {
                label: "Amount",
                value: amount ? formatCurrency(parseFloat(amount)) : "",
              },
              { label: "Term", value: `${termMonths} months` },
              { label: "Deposit To", value: disbursementAccount?.name },
              { label: "Purpose", value: purpose },
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between gap-4">
                <span className="text-slate-500">{label}</span>
                <span className="text-right font-medium text-slate-900 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              data-testid="cancel-confirm-loan-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              data-testid="confirm-loan-btn"
              className="bg-violet-600 hover:bg-violet-700"
            >
              Submit Application
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
