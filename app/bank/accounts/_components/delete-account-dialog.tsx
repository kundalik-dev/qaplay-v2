"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import type { Account } from "../../lib/types";

interface DeleteAccountDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  account: Account | null;
  onConfirm: () => void;
}

export function DeleteAccountDialog({
  open,
  onOpenChange,
  account,
  onConfirm,
}: DeleteAccountDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        data-testid="delete-account-dialog"
        aria-label="Delete account"
      >
        <DialogHeader>
          <DialogTitle
            className="flex items-center gap-2"
            data-testid="delete-account-dialog-title"
          >
            <AlertTriangle
              className="h-4 w-4 text-red-600"
              aria-hidden="true"
            />
            Delete Account
          </DialogTitle>
        </DialogHeader>

        <p className="text-sm text-slate-600 dark:text-slate-300">
          Are you sure you want to delete{" "}
          <span
            className="font-semibold text-slate-900 dark:text-white"
            data-testid="delete-account-name"
          >
            {account?.name}
          </span>
          ? This will also remove its transaction history. This action cannot be
          undone.
        </p>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            data-testid="cancel-delete-account-btn"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onConfirm}
            data-testid="confirm-delete-account-btn"
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
