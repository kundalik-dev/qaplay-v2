"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Receipt } from "lucide-react";
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
  useUserBillers,
} from "../store/useBankAppStore";
import { formatCurrency, todayISO } from "../lib/utils";
import { BillerCombobox } from "./_components/biller-combobox";
import { AddBillerDialog } from "./_components/add-biller-dialog";

export default function BillPayPage() {
  const router = useRouter();
  const { currentUsername, payBill, saveBiller } = useBankAppStore();
  const savedBillers = useUserBillers(currentUsername);
  const currentUser = useCurrentUser();
  const accounts = useUserAccounts(currentUsername);
  const isFrozen = currentUser?.status === "frozen";

  const [fromId, setFromId] = useState("");
  const [selectedBillerId, setSelectedBillerId] = useState("");
  const [billerName, setBillerName] = useState("");
  const [billerRef, setBillerRef] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(todayISO());
  const [memo, setMemo] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [addBillerOpen, setAddBillerOpen] = useState(false);

  const fromAccount = accounts.find((a) => a.id === fromId);

  const handleSelectBiller = (id: string) => {
    setSelectedBillerId(id);
    const b = savedBillers.find((b) => b.id === id);
    if (b) {
      setBillerName(b.name);
      setBillerRef(b.referenceNumber);
    }
  };

  const handleAddBiller = (values: {
    name: string;
    referenceNumber: string;
  }) => {
    if (!currentUsername) return;
    const newId = saveBiller(currentUsername, values);
    setSelectedBillerId(newId);
    setBillerName(values.name);
    setBillerRef(values.referenceNumber);
    setAddBillerOpen(false);
  };

  const handleReview = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!fromId) {
      setError("Please select an account.");
      return;
    }
    if (!billerName.trim() || !billerRef.trim()) {
      setError("Please select a biller.");
      return;
    }
    const amt = parseFloat(amount);
    if (!amount || isNaN(amt) || amt <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (paymentDate < todayISO()) {
      setError("Payment date cannot be in the past.");
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = () => {
    const err = payBill(
      currentUsername!,
      fromId,
      { name: billerName, referenceNumber: billerRef },
      parseFloat(amount),
      paymentDate,
      memo,
      false,
    );
    if (err) {
      setError(err);
      setShowConfirm(false);
    } else {
      setShowConfirm(false);
      router.push("/bank/bill-pay/confirmation");
    }
  };

  return (
    <div data-testid="bill-pay-page" data-section="bill-pay">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100">
          <Receipt className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="bill-pay-page-title"
          >
            Pay a Bill
          </h1>
          <p className="text-sm text-slate-500">Pay utilities and services</p>
        </div>
      </div>

      {isFrozen && (
        <div
          className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          role="alert"
          data-testid="bill-pay-frozen-banner"
        >
          Bill payments are disabled while your account is frozen.
        </div>
      )}

      <div className="max-w-lg">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          {error && (
            <div
              className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
              role="alert"
              data-testid="bill-pay-error"
            >
              {error}
            </div>
          )}

          <form onSubmit={handleReview} data-testid="bill-pay-form" noValidate>
            {/* From account */}
            <div className="mb-4">
              <Label
                htmlFor="bill-pay-from-trigger"
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
                  id="bill-pay-from-trigger"
                  data-testid="bill-pay-from-select"
                  className="w-full"
                >
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {accounts.map((acc) => (
                    <SelectItem
                      key={acc.id}
                      value={acc.id}
                      data-testid="bill-pay-from-option"
                      data-account-id={acc.id}
                    >
                      {acc.name} — {formatCurrency(acc.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Biller selection — searchable dropdown */}
            <div className="mb-4">
              <BillerCombobox
                billers={savedBillers}
                selectedBillerId={selectedBillerId}
                onSelectBiller={handleSelectBiller}
                onAddNew={() => setAddBillerOpen(true)}
                disabled={isFrozen}
              />
            </div>

            {/* Amount */}
            <div className="mb-4">
              <Label
                htmlFor="bill-amount"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Amount
              </Label>
              <div className="relative">
                <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                  $
                </span>
                <Input
                  id="bill-amount"
                  name="amount"
                  type="number"
                  min="0.01"
                  step="0.01"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={isFrozen}
                  data-testid="bill-amount-input"
                  className="pl-7"
                />
              </div>
            </div>

            {/* Payment date — Hard: date input, validation for past dates */}
            <div className="mb-4">
              <Label
                htmlFor="bill-payment-date"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Payment Date
              </Label>
              <Input
                id="bill-payment-date"
                type="date"
                min={todayISO()}
                value={paymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                disabled={isFrozen}
                data-testid="bill-payment-date-input"
                className="w-40"
              />
              <p className="mt-1 text-xs text-slate-500">
                Scheduling a future date will queue the payment.
              </p>
            </div>

            {/* Memo */}
            <div className="mb-5">
              <Label
                htmlFor="bill-memo"
                className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
              >
                Memo (optional)
              </Label>
              <Input
                id="bill-memo"
                type="text"
                placeholder="e.g. June invoice"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                disabled={isFrozen}
                data-testid="bill-memo-input"
              />
            </div>

            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={isFrozen}
                data-testid="review-bill-btn"
                className="flex-1 bg-violet-600 hover:bg-violet-700"
              >
                Review Payment
              </Button>
              <Button
                type="button"
                variant="outline"
                asChild
                data-testid="cancel-bill-btn"
              >
                <Link href="/bank/dashboard">Cancel</Link>
              </Button>
            </div>
          </form>
        </div>
      </div>

      <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
        <DialogContent data-testid="bill-pay-confirm-dialog">
          <DialogHeader>
            <DialogTitle>Confirm Bill Payment</DialogTitle>
          </DialogHeader>
          <div
            className="space-y-2 rounded-lg bg-slate-50 p-4 text-sm dark:bg-slate-900"
            data-testid="bill-confirm-summary"
          >
            {[
              { label: "From", value: fromAccount?.name },
              { label: "Biller", value: billerName },
              { label: "Reference", value: billerRef },
              {
                label: "Amount",
                value: amount ? formatCurrency(parseFloat(amount)) : "",
              },
              { label: "Payment Date", value: paymentDate },
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
              data-testid="cancel-confirm-bill-btn"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              data-testid="confirm-bill-btn"
              className="bg-violet-600 hover:bg-violet-700"
            >
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add biller dialog */}
      <AddBillerDialog
        open={addBillerOpen}
        onOpenChange={setAddBillerOpen}
        onSubmit={handleAddBiller}
      />
    </div>
  );
}
