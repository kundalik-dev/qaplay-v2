"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { isValidRoutingNumber, isValidAccountNumber } from "../../lib/utils";

interface AddPayeeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: {
    name: string;
    bankName: string;
    routingNumber: string;
    accountNumber: string;
  }) => void;
}

export function AddPayeeDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddPayeeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Keyed so the form remounts with fresh state each time the dialog opens */}
      <AddPayeeDialogFields
        key={open ? "open" : "closed"}
        onOpenChange={onOpenChange}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
}

function AddPayeeDialogFields({
  onOpenChange,
  onSubmit,
}: Omit<AddPayeeDialogProps, "open">) {
  const [name, setName] = useState("");
  const [bankName, setBankName] = useState("");
  const [routingNumber, setRoutingNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Please enter the payee name.");
      return;
    }
    if (!bankName.trim()) {
      setError("Please enter the bank name.");
      return;
    }
    if (!isValidRoutingNumber(routingNumber)) {
      setError("Routing number must be exactly 9 digits.");
      return;
    }
    if (!isValidAccountNumber(accountNumber)) {
      setError("Account number must be 8–17 digits.");
      return;
    }
    onSubmit({
      name: name.trim(),
      bankName: bankName.trim(),
      routingNumber,
      accountNumber,
    });
  };

  return (
    <DialogContent data-testid="add-payee-dialog" aria-label="Add new payee">
      <DialogHeader>
        <DialogTitle data-testid="add-payee-dialog-title">
          Add New Payee
        </DialogTitle>
      </DialogHeader>

      {error && (
        <div
          className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
          role="alert"
          data-testid="add-payee-error-message"
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        data-testid="add-payee-form"
        aria-label="Add payee form"
        noValidate
      >
        {/* Name — Beginner: getByLabel + getByTestId */}
        <div className="mb-4">
          <Label
            htmlFor="add-payee-name"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Payee Name
          </Label>
          <Input
            id="add-payee-name"
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            data-testid="add-payee-name-input"
          />
        </div>

        {/* Bank name — Beginner: getByLabel + getByTestId */}
        <div className="mb-4">
          <Label
            htmlFor="add-payee-bank"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Bank Name
          </Label>
          <Input
            id="add-payee-bank"
            type="text"
            placeholder="e.g. Chase Bank"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            data-testid="add-payee-bank-input"
          />
        </div>

        {/* Routing number — Hard: span label, no for/id pair */}
        <div className="mb-4">
          {/*
           * Hard locator: routing number input — span label, no for/id pair
           * XPath: //span[normalize-space()="Routing Number (9 digits)"]/following-sibling::input
           * CSS: [data-testid="add-payee-form"] input[name="routing_number_field"]
           */}
          <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Routing Number (9 digits)
          </span>
          <Input
            name="routing_number_field"
            type="text"
            inputMode="numeric"
            maxLength={9}
            placeholder="9-digit routing number"
            value={routingNumber}
            onChange={(e) =>
              setRoutingNumber(e.target.value.replace(/\D/g, ""))
            }
            data-testid="add-payee-routing-input"
          />
        </div>

        {/* Account number — Beginner: getByLabel + getByTestId */}
        <div className="mb-2">
          <Label
            htmlFor="add-payee-account"
            className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Account Number
          </Label>
          <Input
            id="add-payee-account"
            type="text"
            inputMode="numeric"
            placeholder="8–17 digits"
            value={accountNumber}
            onChange={(e) =>
              setAccountNumber(e.target.value.replace(/\D/g, ""))
            }
            data-testid="add-payee-account-input"
          />
        </div>
      </form>

      <DialogFooter className="gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
          data-testid="cancel-add-payee-btn"
        >
          Cancel
        </Button>
        <Button
          type="button"
          onClick={() => handleSubmit()}
          data-testid="save-add-payee-btn"
          className="bg-violet-600 hover:bg-violet-700"
        >
          Add Payee
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
