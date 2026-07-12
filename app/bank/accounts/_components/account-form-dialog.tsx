"use client";

import { useEffect, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Account, AccountType } from "../../lib/types";

const ACCOUNT_TYPES: AccountType[] = ["Checking", "Savings", "Credit"];

interface AccountFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "add" | "edit";
  account?: Account | null;
  onSubmit: (values: {
    name: string;
    type: AccountType;
    balance: number;
  }) => void;
}

export function AccountFormDialog({
  open,
  onOpenChange,
  mode,
  account,
  onSubmit,
}: AccountFormDialogProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType | "">("");
  const [balance, setBalance] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Reset / prefill form whenever the dialog opens
  useEffect(() => {
    if (open) {
      setName(account?.name ?? "");
      setType(account?.type ?? "");
      setBalance(account ? String(account.balance) : "");
      setError(null);
    }
  }, [open, account]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Please enter an account name.");
      return;
    }
    if (!type) {
      setError("Please select an account type.");
      return;
    }
    const bal = parseFloat(balance);
    if (balance === "" || isNaN(bal)) {
      setError("Please enter a valid starting balance.");
      return;
    }

    onSubmit({ name: name.trim(), type, balance: bal });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid={
          mode === "add" ? "add-account-dialog" : "edit-account-dialog"
        }
        aria-label={mode === "add" ? "Add new account" : "Edit account"}
      >
        <DialogHeader>
          <DialogTitle data-testid="account-form-dialog-title">
            {mode === "add" ? "Add New Account" : "Edit Account"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            role="alert"
            data-testid="account-form-error-message"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          data-testid="account-form"
          aria-label="Account form"
          noValidate
        >
          {/* Name — Beginner: getByLabel + getByTestId */}
          <div className="mb-4">
            <Label
              htmlFor="account-form-name"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Account Name
            </Label>
            <Input
              id="account-form-name"
              name="name"
              type="text"
              placeholder="e.g. Everyday Checking"
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="account-form-name-input"
            />
          </div>

          {/* Type — Beginner: getByLabel + getByTestId */}
          <div className="mb-4">
            <Label
              htmlFor="account-form-type-trigger"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Account Type
            </Label>
            <Select
              value={type}
              onValueChange={(v) => setType(v as AccountType)}
            >
              <SelectTrigger
                id="account-form-type-trigger"
                data-testid="account-form-type-select"
                className="w-full"
              >
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent data-testid="account-form-type-options">
                {ACCOUNT_TYPES.map((t) => (
                  <SelectItem
                    key={t}
                    value={t}
                    data-testid="account-form-type-option"
                    data-account-type={t.toLowerCase()}
                  >
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Balance — Hard: span label, no for/id pair */}
          <div className="mb-2">
            {/*
             * Hard locator: balance input — span label, no for/id pair
             * XPath: //span[normalize-space()="Starting Balance"]/following-sibling::div//input
             *        //input[starts-with(@name,"account_balance_")]
             */}
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              {mode === "add" ? "Starting Balance" : "Balance"}
            </span>
            <div className="relative">
              <span className="absolute top-1/2 left-3 -translate-y-1/2 text-sm text-slate-400">
                $
              </span>
              <Input
                name="account_balance_field"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="pl-7"
              />
            </div>
          </div>
        </form>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="cancel-account-form-btn"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => handleSubmit()}
            data-testid="save-account-form-btn"
            className="bg-violet-600 hover:bg-violet-700"
          >
            {mode === "add" ? "Add Account" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
