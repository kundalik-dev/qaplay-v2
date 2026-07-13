"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Send } from "lucide-react";
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
  useUserPayees,
} from "../store/useBankAppStore";
import { formatCurrency } from "../lib/utils";
import { PayeeSelect } from "./_components/payee-select";
import { AddPayeeDialog } from "./_components/add-payee-dialog";

export default function SendMoneyPage() {
  const router = useRouter();
  const { currentUsername, sendMoney, savePayee } = useBankAppStore();
  const savedPayees = useUserPayees(currentUsername);
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [fromId, setFromId] = useState("");
  const [selectedPayeeId, setSelectedPayeeId] = useState("");
  const [payeeName, setPayeeName] = useState("");
  const [payeeAccount, setPayeeAccount] = useState("");
  const [payeeRouting, setPayeeRouting] = useState("");
  const [payeeBank, setPayeeBank] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [addPayeeOpen, setAddPayeeOpen] = useState(false);

  const fromAccount = accounts.find((a) => a.id === fromId);

  const handleSelectPayee = (id: string) => {
    setSelectedPayeeId(id);
    const p = savedPayees.find((p) => p.id === id);
    if (p) {
      setPayeeName(p.name);
      setPayeeAccount(p.accountNumber);
      setPayeeRouting(p.routingNumber);
      setPayeeBank(p.bankName);
    }
  };

  const handleAddPayee = (values: {
    name: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  }) => {
    if (!currentUsername) return;
    const newId = savePayee(currentUsername, {
      name: values.name,
      bankName: values.bankName,
      routingNumber: values.routingNumber,
      accountNumber: values.accountNumber,
    });
    setSelectedPayeeId(newId);
    setPayeeName(values.name);
    setPayeeBank(values.bankName);
    setPayeeRouting(values.routingNumber);
    setPayeeAccount(values.accountNumber);
    setAddPayeeOpen(false);
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fromId) {
      setError("Please select an account.");
      return;
    }
    if (!selectedPayeeId) {
      setError("Please select a payee.");
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
      false,
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

            {/* Payee selection — searchable dropdown + add-new modal, same pattern as Bill Pay */}
            <div className="mb-4">
              <PayeeSelect
                payees={savedPayees}
                selectedPayeeId={selectedPayeeId}
                onSelectPayee={handleSelectPayee}
                onAddNew={() => setAddPayeeOpen(true)}
                disabled={isFrozen}
              />
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

      {/* Add payee dialog */}
      <AddPayeeDialog
        open={addPayeeOpen}
        onOpenChange={setAddPayeeOpen}
        onSubmit={handleAddPayee}
      />
    </div>
  );
}
