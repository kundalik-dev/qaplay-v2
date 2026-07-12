"use client";

import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Payee } from "../../lib/types";

interface PayeeSelectProps {
  payees: Payee[];
  selectedPayeeId: string;
  onSelectPayee: (id: string) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

export function PayeeSelect({
  payees,
  selectedPayeeId,
  onSelectPayee,
  onAddNew,
  disabled,
}: PayeeSelectProps) {
  const selectedPayee = payees.find((p) => p.id === selectedPayeeId);

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <Label
          htmlFor="payee-select-trigger"
          className="block text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Payee
        </Label>

        {/* Beginner: getByTestId add-payee button */}
        <button
          type="button"
          onClick={onAddNew}
          disabled={disabled}
          data-testid="add-payee-btn"
          className="flex items-center gap-1 text-xs font-medium text-violet-600 transition-colors hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add
        </button>
      </div>

      <Select
        value={selectedPayeeId}
        onValueChange={onSelectPayee}
        disabled={disabled}
      >
        <SelectTrigger
          id="payee-select-trigger"
          data-testid="payee-select"
          className="w-full"
        >
          <SelectValue placeholder="Select a payee" />
        </SelectTrigger>
        <SelectContent data-testid="payee-select-options">
          {payees.length === 0 ? (
            <p
              className="px-3 py-2.5 text-xs text-slate-400"
              data-testid="payee-select-no-options"
            >
              No saved payees yet — click Add to create one.
            </p>
          ) : (
            payees.map((p) => (
              /*
               * Medium locator: shared data-testid + unique data-payee-id
               * Practice:
               *   page.getByTestId('payee-select-option').filter({ hasText: 'Rahul Sharma' })
               *   page.locator('[data-testid="payee-select-option"][data-payee-id="payee-001"]')
               */
              <SelectItem
                key={p.id}
                value={p.id}
                data-testid="payee-select-option"
                data-payee-id={p.id}
              >
                {p.name} — {p.bankName}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>

      {/*
       * Hard locator: selected payee summary — no data-testid, plain text
       * XPath: //div[@data-testid="payee-selected-summary"]//span[contains(@class,"font-medium")]
       */}
      {selectedPayee && (
        <div
          className="mt-1.5 text-xs text-slate-500"
          data-testid="payee-selected-summary"
        >
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {selectedPayee.bankName}
          </span>{" "}
          · ****{selectedPayee.accountNumber.slice(-4)}
        </div>
      )}
    </div>
  );
}
