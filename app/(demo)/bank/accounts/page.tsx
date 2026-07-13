"use client";

import { useState } from "react";
import { Plus, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBankAppStore, useUserAccounts } from "../store/useBankAppStore";
import { AccountsTable } from "./_components/accounts-table";
import { AccountFormDialog } from "./_components/account-form-dialog";
import { DeleteAccountDialog } from "./_components/delete-account-dialog";
import type { Account, AccountType } from "../lib/types";

export default function AccountsPage() {
  const { currentUsername, addAccount, updateAccount, deleteAccount } =
    useBankAppStore();
  const accounts = useUserAccounts(currentUsername);

  const [addOpen, setAddOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [deletingAccount, setDeletingAccount] = useState<Account | null>(null);

  const handleAdd = (values: {
    name: string;
    type: AccountType;
    balance: number;
  }) => {
    if (!currentUsername) return;
    addAccount(currentUsername, values);
  };

  const handleEditSubmit = (values: {
    name: string;
    type: AccountType;
    balance: number;
  }) => {
    if (!currentUsername || !editingAccount) return;
    updateAccount(currentUsername, editingAccount.id, values);
    setEditingAccount(null);
  };

  const handleConfirmDelete = () => {
    if (!currentUsername || !deletingAccount) return;
    deleteAccount(currentUsername, deletingAccount.id);
    setDeletingAccount(null);
  };

  return (
    <div data-testid="accounts-page" data-section="accounts">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1
            className="text-2xl font-bold text-slate-900 dark:text-white"
            data-testid="accounts-page-title"
          >
            My Accounts
          </h1>
          <p className="mt-0.5 text-sm text-slate-500">
            Manage your accounts and view transaction history.
          </p>
        </div>

        {/* Beginner: getByTestId add-account button */}
        <Button
          type="button"
          onClick={() => setAddOpen(true)}
          data-testid="add-account-btn"
          className="gap-1.5 bg-violet-600 hover:bg-violet-700"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Account
        </Button>
      </div>

      {accounts.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 py-16 text-center"
          data-testid="no-accounts-state"
        >
          <CreditCard className="mb-3 h-10 w-10 text-slate-300" />
          <p className="mb-4 text-sm text-slate-500">No accounts found.</p>
          <Button
            type="button"
            onClick={() => setAddOpen(true)}
            data-testid="no-accounts-add-btn"
            className="gap-1.5 bg-violet-600 hover:bg-violet-700"
          >
            <Plus className="h-4 w-4" aria-hidden="true" />
            Add Your First Account
          </Button>
        </div>
      ) : (
        <AccountsTable
          accounts={accounts}
          onEdit={setEditingAccount}
          onDelete={setDeletingAccount}
        />
      )}

      {/* Add account dialog */}
      <AccountFormDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        mode="add"
        onSubmit={handleAdd}
      />

      {/* Edit account dialog */}
      <AccountFormDialog
        open={!!editingAccount}
        onOpenChange={(open) => !open && setEditingAccount(null)}
        mode="edit"
        account={editingAccount}
        onSubmit={handleEditSubmit}
      />

      {/* Delete confirm dialog */}
      <DeleteAccountDialog
        open={!!deletingAccount}
        onOpenChange={(open) => !open && setDeletingAccount(null)}
        account={deletingAccount}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}
