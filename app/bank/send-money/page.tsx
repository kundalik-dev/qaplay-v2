"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Send, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
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
  useUserPayees,
} from "../store/useBankAppStore";
import {
  formatCurrency,
  isValidRoutingNumber,
  isValidAccountNumber,
} from "../lib/utils";

export default function SendMoneyPage() {
  const router = useRouter();
  const { currentUsername, sendMoney } = useBankAppStore();
  const savedPayees = useUserPayees(currentUsername);
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [fromId, setFromId] = useState("");
  const [selectedPayeeId, setSelectedPayeeId] = useState<string>("new");
  const [payeeName, setPayeeName] = useState("");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [payeeRouting, setPayeeRouting] = useState("");
  const [payeeBank, setPayeeBank] = useState("");
  const [savePayee, setSavePayee] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showNewPayeeForm, setShowNewPayeeForm] = useState(
    savedPayees.length === 0,
  );

  const fromAccount = accounts.find((a) => a.id === fromId);

  const handleSelectPayee = (id: string) => {
    setSelectedPayeeId(id);
    if (id !== "new") {
      const p = savedPayees.find((p) => p.id === id);
      if (p) {
        setPayeeName(p.name);
        setPayeeAccount(p.accountNumber);
        setPayeeRouting(p.routingNumber);
        setPayeeBank(p.bankName);
      }
      setShowNewPayeeForm(false);
    } else {
      setPayeeName("");
      setPayeeAccount("");
      setPayeeRouting("");
      setPayeeBank("");
      setShowNewPayeeForm(true);
    }
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fromId) {
      setError("Please select an account.");
      return;
    }
    if (!payeeName.trim()) {
      setError("Please enter the payee name.");
      return;
    }
    if (!isValidRoutingNumber(payeeRouting)) {
      setError("Routing number must be exactly 9 digits.");
      return;
    }
    if (!isValidAccountNumber(payeeAccount)) {
      setError("Account number must be 8–17 digits.");
      return;
    }
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const err = sendMoney(
      currentUsername!,
      fromId,
      {
        name: payeeName,
        accountNumber: payeeAccount,
        routingNumber: payeeRouting,
        bankName: payeeBank,
      },
      parseFloat(amount),
      note,
      savePayee && selectedPayeeId === "new",
    );
    if (err) {
      setError(err);
      setShowConfirm(false);
    } else {
      setShowConfirm(false);
      router.push("/bank/send-money/confirmation");
    }
  };

  return (
    <div data-testid="send-money-page" data-section="send-money">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <Send className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="send-money-page-title"
          >
            Send Money
          </h1>
          <p className="text-sm text-slate-500">Pay someone externally</p>
        </div>
      </div>

      {isFrozen && (
        <div
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="alert"
          data-testid="send-money-frozen-banner"
        >
          Sending money is disabled while your account is frozen.
        </div>
      )}

      <div className="max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              role="alert"
              data-testid="send-money-error"
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleReview}
            data-testid="send-money-form"
            noValidate
          >
            {/* From account */}
            <div className="mb-4">
              <Label
                htmlFor="send-from-trigger"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                From Account
              </Label>
              <Select
                value={fromId}
                onValueChange={setFromId}
                disabled={isFrozen}
              >
                <SelectTrigger
                  id="send-from-trigger"
                  data-testid="send-from-account-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem
                      key={acc.id}
                      value={acc.id}
                      data-testid="send-from-option"
                      data-account-id={acc.id}
                    >
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Payee section */}
            <div className="mb-4">
              <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Payee</p>

              {savedPayees.length > 0 && (
                /*
                 * Medium locator: repeated payee cards — data-testid="payee-card" + data-payee-id
                 * Practice:
                 *   page.getByTestId('payee-card').filter({ hasText: 'Rahul Sharma' })
                 *   page.locator('[data-testid="payee-card"][data-payee-id="payee-001"]')
                 */
                <div className="mb-3 space-y-2" data-testid="saved-payees-list">
                  {savedPayees.map((p) => (
                    <label
                      key={p.id}
                      className={[
                        "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                        selectedPayeeId === p.id
                          ? "border-violet-400 bg-violet-50"
                          : "border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      data-testid="payee-card"
                      data-payee-id={p.id}
                    >
                      <input
                        type="radio"
                        name="payeeSelection"
                        value={p.id}
                        checked={selectedPayeeId === p.id}
                        onChange={() => handleSelectPayee(p.id)}
                        className="accent-violet-600"
                      />
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {p.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {p.bankName} · ****{p.accountNumber.slice(-4)}
                        </p>
                      </div>
                    </label>
                  ))}

                  {/* "Add new payee" option */}
                  <label
                    className={[
                      "flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors",
                      selectedPayeeId === "new"
                        ? "border-violet-400 bg-violet-50"
                        : "border-dashed border-slate-300 hover:border-slate-400",
                    ].join(" ")}
                    data-testid="new-payee-option"
                  >
                    <input
                      type="radio"
                      name="payeeSelection"
                      value="new"
                      checked={selectedPayeeId === "new"}
                      onChange={() => handleSelectPayee("new")}
                      className="accent-violet-600"
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Add a new payee
                    </span>
                    {selectedPayeeId === "new" ? (
                      <ChevronUp className="ml-auto h-4 w-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="ml-auto h-4 w-4 text-slate-400" />
                    )}
                  </label>
                </div>
              )}

              {/* New payee form — visible when "new" selected */}
              {(showNewPayeeForm || savedPayees.length === 0) && (
                <div
                  className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-600 dark:bg-slate-900"
                  data-testid="new-payee-form"
                >
                  {/* Beginner: label + id + data-testid */}
                  <div>
                    <Label
                      htmlFor="new-payee-name"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Payee Name
                    </Label>
                    <Input
                      id="new-payee-name"
                      type="text"
                      placeholder="Full name"
                      value={payeeName}
                      onChange={(e) => setPayeeName(e.target.value)}
                      disabled={isFrozen}
                      data-testid="new-payee-name-input"
                    />
                  </div>
                  <div>
                    <Label
                      htmlFor="new-payee-bank"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Bank Name
                    </Label>
                    <Input
                      id="new-payee-bank"
                      type="text"
                      placeholder="e.g. Chase Bank"
                      value={payeeBank}
                      onChange={(e) => setPayeeBank(e.target.value)}
                      disabled={isFrozen}
                      data-testid="new-payee-bank-input"
                    />
                  </div>
                  <div>
                    {/*
                     * Hard locator: routing number — label exists but uses non-standard span
                     * XPath: //span[normalize-space()="Routing Number (9 digits)"]/following-sibling::div//input
                     * CSS: [data-testid="new-payee-form"] input[name="routing_number_field"]
                     */}
                    <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
                      Routing Number (9 digits)
                    </span>
                    <div>
                      <Input
                        name="routing_number_field"
                        type="text"
                        inputMode="numeric"
                        maxLength={9}
                        placeholder="9-digit routing number"
                        value={payeeRouting}
                        onChange={(e) =>
                          setPayeeRouting(e.target.value.replace(/\D/g, ""))
                        }
                        disabled={isFrozen}
                        data-testid="new-payee-routing-input"
                      />
                    </div>
                  </div>
                  <div>
                    <Label
                      htmlFor="new-payee-account"
                      className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
                    >
                      Account Number
                    </Label>
                    <Input
                      id="new-payee-account"
                      type="text"
                      inputMode="numeric"
                      placeholder="8–17 digits"
                      value={payeeAccount}
                      onChange={(e) =>
                        setPayeeAccount(e.target.value.replace(/\D/g, ""))
                      }
                      disabled={isFrozen}
                      data-testid="new-payee-account-input"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="save-payee"
                      checked={savePayee}
                      onCheckedChange={(v) => setSavePayee(!!v)}
                      disabled={isFrozen}
                      data-testid="save-payee-checkbox"
                    />
                    <Label
                      htmlFor="save-payee"
                      className="cursor-pointer text-xs text-slate-600 dark:text-slate-400"
                    >
                      Save this payee for future transfers
                    </Label>
                  </div>
                </div>
              )}
            </div>

            {/* Amount */}
            <div className="mb-4">
              <Label
                htmlFor="send-amount"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Amount
              </Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <Input
                  id="send-amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isFrozen}
                  data-testid="send-amount-input"
                  className="pl-7"
                />
              </div>
            </div>

            {/* Note */}
            <div className="mb-5">
              <Label
                htmlFor="send-note"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Note (optional)
              </Label>
              <Input
                id="send-note"
                type="text"
                placeholder="e.g. Dinner last night"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                disabled={isFrozen}
                data-testid="send-note-input"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isFrozen}
                data-testid="review-send-btn"
                className="flex-1 bg-violet-600 hover:bg-violet-700"
              >
                Review & Send
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                data-testid="cancel-send-btn"
              >
                <Link href="/bank/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirm dialog */}
      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent data-testid="send-money-confirm-dialog">
          <DialogHeader>
            <DialogTitle>Confirm Send Money</DialogTitle>
          </DialogHeader>
          <div
            className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-900"
            data-testid="send-confirm-summary"
          >
            {[
              { label: "From", value: fromAccount?.name },
              { label: "To", value: payeeName },
              {
                label: "Amount",
                value: amount ? formatCurrency(parseFloat(amount)) : "",
              },
              ...(note ? [{ label: "Note", value: note }] : []),
            ].map(({ label, value }) => (
              <div key={label} className="flex justify-between">
                <span className="text-slate-500">{label}</span>
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirm(false)}
              data-testid="cancel-confirm-send-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              data-testid="confirm-send-btn"
              className="bg-violet-600 hover:bg-violet-700"
            >
              Confirm & Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
