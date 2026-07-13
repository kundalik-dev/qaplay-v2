"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark } from "lucide-react";
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
  useUserLoanApplications,
} from "../store/useBankAppStore";
import { formatCurrency } from "../lib/utils";
import type { LoanApplication, LoanType } from "../lib/types";
import {
  LoanHistoryFilterBar,
  type LoanTypeFilter,
} from "./_components/loan-history-filter-bar";
import {
  LoanHistoryTable,
  type SortField,
  type SortOrder,
} from "./_components/loan-history-table";

const LOAN_TYPES: LoanType[] = ["Personal", "Auto", "Home", "Student"];
const TERM_OPTIONS = [12, 24, 36, 48, 60];
const PAGE_SIZE = 5;

// Intentional QA-practice bug: the "error_user" seeded account (see
// app/bank/lib/seed-data.ts) always has its most-recently-added loan
// excluded from the displayed total, so the total is wrong and stays
// wrong even after applying for a new loan. Every other account sums
// correctly, including right after a new application is added.
const BUGGY_TOTAL_USERNAME = "error_user";

export default function ApplyLoanPage() {
  const router = useRouter();
  const { currentUsername, applyLoan } = useBankAppStore();
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const loanHistory = useUserLoanApplications(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [loanType, setLoanType] = useState<LoanType | "">("");
  const [amount, setAmount] = useState("");
  const [termMonths, setTermMonths] = useState<string>("36");
  const [accountId, setAccountId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showApplyForm, setShowApplyForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Loan history: filter, sort, paginate ────────────────────────────────
  const [historySearch, setHistorySearch] = useState("");
  const [loanTypeFilter, setLoanTypeFilter] = useState<LoanTypeFilter>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField | null>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [historyPage, setHistoryPage] = useState(1);

  const hasActiveHistoryFilters = !!(
    historySearch ||
    loanTypeFilter !== "all" ||
    dateFrom ||
    dateTo
  );

  const handleClearHistoryFilters = () => {
    setHistorySearch("");
    setLoanTypeFilter("all");
    setDateFrom("");
    setDateTo("");
    setHistoryPage(1);
  };

  const handleHistorySort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setHistoryPage(1);
  };

  // Search + type + date filtered, in original (newest-first) store order —
  // the buggy total below relies on this order, independent of the column
  // the table happens to be sorted by.
  const filteredHistory = useMemo<LoanApplication[]>(() => {
    let result = loanHistory;
    if (historySearch) {
      const q = historySearch.toLowerCase();
      result = result.filter(
        (l) =>
          l.refId.toLowerCase().includes(q) ||
          l.purpose.toLowerCase().includes(q),
      );
    }
    if (loanTypeFilter !== "all")
      result = result.filter((l) => l.loanType === loanTypeFilter);
    if (dateFrom) result = result.filter((l) => l.date >= dateFrom);
    if (dateTo) result = result.filter((l) => l.date <= dateTo);
    return result;
  }, [loanHistory, historySearch, loanTypeFilter, dateFrom, dateTo]);

  const sortedHistory = useMemo<LoanApplication[]>(() => {
    if (!sortField) return filteredHistory;
    return [...filteredHistory].sort((a, b) => {
      if (sortField === "date") {
        return sortOrder === "asc"
          ? a.date.localeCompare(b.date)
          : b.date.localeCompare(a.date);
      }
      return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
    });
  }, [filteredHistory, sortField, sortOrder]);

  const historyTotalPages = Math.max(
    1,
    Math.ceil(sortedHistory.length / PAGE_SIZE),
  );
  const paginatedHistory = sortedHistory.slice(
    (historyPage - 1) * PAGE_SIZE,
    historyPage * PAGE_SIZE,
  );

  const correctTotal = filteredHistory.reduce((sum, l) => sum + l.amount, 0);
  // Bug: for BUGGY_TOTAL_USERNAME, the most-recently-added loan within the
  // current filters is silently dropped from the total, so it never
  // matches the sum of the visible rows — and stays wrong right after a
  // new application is added, since the new loan becomes that excluded
  // "most recent" entry.
  const displayedTotal =
    currentUsername === BUGGY_TOTAL_USERNAME
      ? correctTotal - (filteredHistory[0]?.amount ?? 0)
      : correctTotal;

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

    setShowApplyForm(false);
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
      setShowApplyForm(true);
    } else {
      setShowConfirm(false);
      router.push("/bank/apply-loan/confirmation");
    }
  };

  const handleOpenApplyForm = () => {
    setError(null);
    setShowApplyForm(true);
  };

  return (
    <div data-testid="apply-loan-page" data-section="apply-loan">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
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

        {/* Apply trigger — Beginner: getByRole('button', { name: 'Apply for Loan' }) + getByTestId */}
        <Button
          type="button"
          onClick={handleOpenApplyForm}
          disabled={isFrozen}
          data-testid="open-apply-loan-btn"
          className="gap-1.5 bg-violet-600 hover:bg-violet-700"
        >
          <Landmark className="h-4 w-4" aria-hidden="true" />
          Apply for Loan
        </Button>
      </div>

      {isFrozen && (
        <div
          className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="alert"
          data-testid="apply-loan-frozen-banner"
        >
          Loan applications are disabled while your account is frozen.
        </div>
      )}

      {/* Apply form dialog */}
      <Dialog open={showApplyForm} onOpenChange={setShowApplyForm}>
        <DialogContent
          data-testid="apply-loan-dialog"
          aria-label="Loan application form"
          className="sm:max-w-lg"
        >
          <DialogHeader>
            <DialogTitle data-testid="apply-loan-dialog-title">
              Apply for a Loan
            </DialogTitle>
          </DialogHeader>

          {error && (
            <div
              className="mb-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
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
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
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
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
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
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
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
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
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
              <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
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
                onClick={() => setShowApplyForm(false)}
                data-testid="cancel-loan-btn"
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Applied loans history */}
      <div className="mt-10" data-testid="loan-history-section">
        <LoanHistoryFilterBar
          search={historySearch}
          onSearchChange={(v) => {
            setHistorySearch(v);
            setHistoryPage(1);
          }}
          loanTypeFilter={loanTypeFilter}
          onLoanTypeFilterChange={(v) => {
            setLoanTypeFilter(v);
            setHistoryPage(1);
          }}
          dateFrom={dateFrom}
          onDateFromChange={(v) => {
            setDateFrom(v);
            setHistoryPage(1);
          }}
          dateTo={dateTo}
          onDateToChange={(v) => {
            setDateTo(v);
            setHistoryPage(1);
          }}
          onClearFilters={handleClearHistoryFilters}
          hasActiveFilters={hasActiveHistoryFilters}
        />

        <LoanHistoryTable
          loans={paginatedHistory}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleHistorySort}
          totalAmount={displayedTotal}
        />

        {/* Pagination row */}
        <nav
          className="mt-4 flex flex-wrap items-center justify-between gap-2"
          data-testid="loan-history-pagination-controls"
          aria-label="Loan history pagination"
        >
          <p
            className="text-xs text-slate-500"
            data-testid="loan-history-pagination-info"
          >
            {sortedHistory.length === 0
              ? "No loan applications"
              : `Showing ${(historyPage - 1) * PAGE_SIZE + 1}–${Math.min(historyPage * PAGE_SIZE, sortedHistory.length)} of ${sortedHistory.length}`}
          </p>

          <div className="flex items-center gap-1">
            {/*
             * Challenge locator: pagination buttons — aria-label only on prev/next
             * Individual page number buttons: data-page attribute, no data-testid
             * Practice:
             *   page.getByRole('button', { name: 'Previous page' })
             *   page.locator('[data-page="2"]').click()
             *   XPath: //button[@aria-current="page"]
             */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setHistoryPage(Math.max(1, historyPage - 1))}
              disabled={historyPage === 1}
              aria-label="Previous page"
              data-testid="loan-history-pagination-prev"
              className="h-7 px-2 text-xs"
            >
              ‹
            </Button>

            {Array.from({ length: historyTotalPages }, (_, i) => i + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setHistoryPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={historyPage === page ? "page" : undefined}
                  data-page={page}
                  className={[
                    "h-7 min-w-[1.75rem] rounded-md px-1.5 text-xs font-medium transition-colors",
                    historyPage === page
                      ? "bg-violet-600 text-white"
                      : "border border-slate-200 text-slate-600 hover:bg-slate-50",
                  ].join(" ")}
                >
                  {page}
                </button>
              ),
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setHistoryPage(Math.min(historyTotalPages, historyPage + 1))
              }
              disabled={historyPage === historyTotalPages}
              aria-label="Next page"
              data-testid="loan-history-pagination-next"
              className="h-7 px-2 text-xs"
            >
              ›
            </Button>
          </div>
        </nav>
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
              onClick={() => {
                setShowConfirm(false);
                setShowApplyForm(true);
              }}
              data-testid="cancel-confirm-loan-btn"
            >
              Back
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
