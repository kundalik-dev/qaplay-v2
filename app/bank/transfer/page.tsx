"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { formatCurrency, todayISO } from "../lib/utils";

export default function TransferPage() {
  const router = useRouter();
  const { currentUsername, transfer } = useBankAppStore();
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [fromId, setFromId] = useState("");
  const [toId, setToId] = useState("");
  const [amount, setAmount] = useState("");
  const [memo, setMemo] = useState("");
  const [dateType, setDateType] = useState<"today" | "scheduled">("today");
  const [scheduledDate, setScheduledDate] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const fromAccount = accounts.find((a) => a.id === fromId);
  const toAccount = accounts.find((a) => a.id === toId);
  const transferDate = dateType === "today" ? todayISO() : scheduledDate;

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fromId) {
      setError("Please select a From account.");
      return;
    }
    if (!toId) {
      setError("Please select a To account.");
      return;
    }
    if (fromId === toId) {
      setError("From and To accounts must be different.");
      return;
    }
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (dateType === "scheduled" && !scheduledDate) {
      setError("Please select a transfer date.");
      return;
    }
    if (dateType === "scheduled" && scheduledDate < todayISO()) {
      setError("Transfer date cannot be in the past.");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const err = transfer(
      currentUsername!,
      fromId,
      toId,
      parseFloat(amount),
      memo,
      transferDate,
    );
    if (err) {
      setError(err);
      setShowConfirm(false);
    } else {
      setShowConfirm(false);
      router.push("/bank/transfer/confirmation");
    }
  };

  // Accounts eligible as "From" — exclude overdrawn
  const fromOptions = accounts.filter((a) => !a.isOverdrawn);
  const toOptions = accounts.filter((a) => a.id !== fromId);

  return (
    <div data-testid="transfer-page" data-section="transfer">
      <Link
        href="/bank/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900"
        data-testid="back-to-dashboard-link"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        Dashboard
      </Link>

      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
          <ArrowLeftRight
            className="h-5 w-5 text-violet-600"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="transfer-page-title"
          >
            Transfer Money
          </h1>
          <p className="text-sm text-slate-500">
            Move funds between your accounts
          </p>
        </div>
      </div>

      {isFrozen && (
        <div
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="alert"
          data-testid="transfer-frozen-banner"
        >
          Transfers are disabled while your account is frozen.
        </div>
      )}

      <div className="max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              role="alert"
              data-testid="transfer-error-message"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleReview}
            data-testid="transfer-form"
            aria-label="Transfer money form"
            noValidate
          >
            {/* From Account — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="transfer-from-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                From Account
              </Label>
              <Select
                value={fromId}
                onValueChange={(v) => {
                  setFromId(v);
                  setToId("");
                }}
                disabled={isFrozen}
              >
                <SelectTrigger
                  id="transfer-from-trigger"
                  data-testid="transfer-from-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent data-testid="transfer-from-options">
                  {fromOptions.map((acc) => (
                    <SelectItem
                      key={acc.id}
                      value={acc.id}
                      data-testid="transfer-from-option"
                      data-account-id={acc.id}
                    >
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* To Account */}
            <div className="mb-4">
              <Label
                htmlFor="transfer-to-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                To Account
              </Label>
              <Select
                value={toId}
                onValueChange={setToId}
                disabled={isFrozen || !fromId}
              >
                <SelectTrigger
                  id="transfer-to-trigger"
                  data-testid="transfer-to-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent data-testid="transfer-to-options">
                  {toOptions.map((acc) => (
                    <SelectItem
                      key={acc.id}
                      value={acc.id}
                      data-testid="transfer-to-option"
                      data-account-id={acc.id}
                    >
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Amount — Beginner: getByLabel + getByTestId */}
            <div className="mb-4">
              <Label
                htmlFor="transfer-amount"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Amount
              </Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <Input
                  id="transfer-amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isFrozen}
                  data-testid="transfer-amount-input"
                  className="pl-7"
                />
              </div>
              {fromAccount && (
                <p className="mt-1 text-xs text-slate-500">
                  Available:{" "}
                  <span data-testid="transfer-available-balance">
                    {formatCurrency(fromAccount.balance)}
                  </span>
                </p>
              )}
            </div>

            {/* Memo — Hard: no for attr on span label */}
            <div className="mb-4">
              <div className="bank-field-row">
                {/*
                 * Hard locator: memo input — span label, no id/for pair
                 * XPath: //span[normalize-space()="Memo (optional)"]/following-sibling::div//input
                 *        //input[starts-with(@name,"transfer_memo_")]
                 */}
                <span className="mb-1.5 block text-sm font-medium text-slate-700">
                  Memo (optional)
                </span>
                <div>
                  <Input
                    name="transfer_memo_field"
                    type="text"
                    placeholder="e.g. Rent, vacation fund…"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    disabled={isFrozen}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Transfer date — Medium: radio group + conditional date picker */}
            <div className="mb-5">
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                Transfer Date
              </p>
              <div
                className="flex gap-4"
                role="radiogroup"
                aria-label="Transfer date type"
                data-testid="transfer-date-type"
              >
                {(["today", "scheduled"] as const).map((type) => (
                  <label
                    key={type}
                    className="flex cursor-pointer items-center gap-2 text-sm text-slate-600 dark:text-slate-400"
                    data-testid={`date-type-${type}`}
                  >
                    <input
                      type="radio"
                      name="dateType"
                      value={type}
                      checked={dateType === type}
                      onChange={() => setDateType(type)}
                      disabled={isFrozen}
                      className="accent-violet-600"
                    />
                    {type === "today" ? "Today" : "Schedule for later"}
                  </label>
                ))}
              </div>

              {dateType === "scheduled" && (
                /*
                 * Hard locator: only visible after radio interaction — dynamic visibility
                 * Practice: await page.locator('[data-testid="transfer-scheduled-date-input"]').waitFor()
                 */
                <div className="mt-3">
                  <Label
                    htmlFor="transfer-scheduled-date"
                    className="mb-1.5 block text-xs text-slate-600 dark:text-slate-400"
                  >
                    Select date
                  </Label>
                  <Input
                    id="transfer-scheduled-date"
                    type="date"
                    min={todayISO()}
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    data-testid="transfer-scheduled-date-input"
                    className="w-40"
                  />
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isFrozen}
                data-testid="review-transfer-btn"
                className="flex-1 bg-violet-600 hover:bg-violet-700"
              >
                Review Transfer
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                data-testid="cancel-transfer-btn"
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
          data-testid="transfer-confirm-dialog"
          aria-label="Confirm transfer"
        >
          <DialogHeader>
            <DialogTitle data-testid="transfer-confirm-title">
              Confirm Transfer
            </DialogTitle>
          </DialogHeader>

          <div
            className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-900"
            data-testid="transfer-confirm-summary"
          >
            {[
              { label: "From", value: fromAccount?.name },
              { label: "To", value: toAccount?.name },
              {
                label: "Amount",
                value: amount ? formatCurrency(parseFloat(amount)) : "",
              },
              { label: "Date", value: transferDate },
              ...(memo ? [{ label: "Memo", value: memo }] : []),
            ].map(({ label, value }) => (
              /*
               * Challenge locator: summary rows — span labels, no data-testid per row
               * Practice:
               *   page.getByTestId('transfer-confirm-summary').getByText('$500.00')
               *   //div[@data-testid="transfer-confirm-summary"]//span[normalize-space()="Amount"]/following-sibling::span
               */
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium text-slate-900 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              data-testid="cancel-confirm-transfer-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              data-testid="confirm-transfer-btn"
              className="bg-violet-600 hover:bg-violet-700"
            >
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
