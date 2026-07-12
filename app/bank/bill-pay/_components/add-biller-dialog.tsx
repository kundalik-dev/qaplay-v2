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

interface AddBillerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: { name: string; referenceNumber: string }) => void;
}

export function AddBillerDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddBillerDialogProps) {
  const [name, setName] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setName("");
      setReferenceNumber("");
      setError(null);
    }
  }, [open]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!name.trim()) {
      setError("Please enter a biller name.");
      return;
    }
    if (!referenceNumber.trim()) {
      setError("Please enter an account/reference number.");
      return;
    }
    onSubmit({ name: name.trim(), referenceNumber: referenceNumber.trim() });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="add-biller-dialog"
        aria-label="Add new biller"
      >
        <DialogHeader>
          <DialogTitle data-testid="add-biller-dialog-title">
            Add New Biller
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div
            className="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-700"
            role="alert"
            data-testid="add-biller-error-message"
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          data-testid="add-biller-form"
          aria-label="Add biller form"
          noValidate
        >
          {/* Name — Beginner: getByLabel + getByTestId */}
          <div className="mb-4">
            <Label
              htmlFor="add-biller-name"
              className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Biller Name
            </Label>
            <Input
              id="add-biller-name"
              type="text"
              placeholder="e.g. City Electric Co."
              value={name}
              onChange={(e) => setName(e.target.value)}
              data-testid="add-biller-name-input"
            />
          </div>

          {/* Reference number — Hard: span label, no for/id pair */}
          <div className="mb-2">
            {/*
             * Hard locator: reference number input — span label, no for/id pair
             * XPath: //span[normalize-space()="Account / Reference Number"]/following-sibling::input
             *        //input[starts-with(@name,"biller_ref_")]
             */}
            <span className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
              Account / Reference Number
            </span>
            <Input
              name="biller_ref_field"
              type="text"
              placeholder="e.g. ACC-0042"
              value={referenceNumber}
              onChange={(e) => setReferenceNumber(e.target.value)}
            />
          </div>
        </form>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="cancel-add-biller-btn"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={() => handleSubmit()}
            data-testid="save-add-biller-btn"
            className="bg-violet-600 hover:bg-violet-700"
          >
            Add Biller
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
