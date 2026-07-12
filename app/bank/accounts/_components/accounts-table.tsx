import Link from "next/link";
import type { Account } from "../../lib/types";
import { formatCurrency } from "../../lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Pencil, Trash2, ArrowRight } from "lucide-react";

interface AccountsTableProps {
  accounts: Account[];
  onEdit: (account: Account) => void;
  onDelete: (account: Account) => void;
}

const TYPE_STYLES: Record<string, string> = {
  Checking: "bg-violet-100 text-violet-700",
  Savings: "bg-emerald-100 text-emerald-700",
  Credit: "bg-rose-100 text-rose-700",
};

export function AccountsTable({
  accounts,
  onEdit,
  onDelete,
}: AccountsTableProps) {
  return (
    <div
      className="overflow-x-auto rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800"
      data-testid="accounts-table-wrapper"
    >
      <table
        className="w-full text-sm"
        data-testid="accounts-table"
        aria-label="Accounts"
      >
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/50">
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Account
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Type
            </th>
            {/* Hard locator: Balance header — no data-testid */}
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
              Balance
            </th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 dark:text-slate-400">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
          {accounts.map((account) => (
            /*
             * Medium locator: shared data-testid + unique data-account-id + data-account-type
             * Practice:
             *   page.getByTestId('account-row').filter({ hasText: 'Everyday Checking' })
             *   page.locator('[data-testid="account-row"][data-account-id="acc-checking-1"]')
             *   XPath: //tr[@data-account-id="acc-checking-1"]
             */
            <tr
              key={account.id}
              className="transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/30"
              data-testid="account-row"
              data-account-id={account.id}
              data-account-type={account.type.toLowerCase()}
            >
              <td className="px-4 py-3">
                <p
                  className="font-medium text-slate-900 dark:text-white"
                  data-testid="account-row-name"
                >
                  {account.name}
                </p>
                {/*
                 * Hard locator: account number — no data-testid, font-mono class
                 * XPath: //tr[@data-account-id="acc-checking-1"]//*[contains(@class,"font-mono")]
                 */}
                <p className="font-mono text-xs text-slate-500">
                  {account.accountNumber}
                </p>
              </td>

              <td className="px-4 py-3">
                <Badge
                  className={TYPE_STYLES[account.type] ?? ""}
                  data-testid="account-row-type-badge"
                >
                  {account.type}
                </Badge>
              </td>

              <td
                className={[
                  "px-4 py-3 text-right text-sm font-semibold tabular-nums",
                  account.isOverdrawn
                    ? "text-red-600 dark:text-red-400"
                    : "text-slate-900 dark:text-white",
                ].join(" ")}
                data-testid="account-row-balance"
                data-balance={account.balance}
              >
                {formatCurrency(account.balance)}
              </td>

              <td className="px-4 py-3">
                {account.isOverdrawn ? (
                  <span
                    className="inline-flex items-center gap-1 text-xs font-medium text-red-600"
                    data-testid="account-row-overdrawn"
                  >
                    <AlertTriangle className="h-3 w-3" aria-hidden="true" />
                    Overdrawn
                  </span>
                ) : (
                  <span className="text-xs text-slate-500">Active</span>
                )}
              </td>

              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="h-7 px-2 text-xs text-slate-600 hover:text-violet-700"
                    data-testid="view-account-btn"
                  >
                    <Link href={`/bank/accounts/${account.id}`}>
                      View
                      <ArrowRight className="ml-1 h-3 w-3" aria-hidden="true" />
                    </Link>
                  </Button>

                  {/* Beginner: getByTestId edit button */}
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-500 hover:text-violet-700"
                    onClick={() => onEdit(account)}
                    aria-label={`Edit ${account.name}`}
                    data-testid="edit-account-btn"
                  >
                    <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                  </Button>

                  {/*
                   * Challenge locator: delete button — no data-testid, aria-label only
                   * Practice: page.locator('[data-account-id="acc-checking-1"]').getByLabel(/Delete/)
                   */}
                  <button
                    type="button"
                    className="flex h-7 w-7 items-center justify-center rounded-md p-0 text-slate-500 transition-colors hover:bg-red-50 hover:text-red-600"
                    onClick={() => onDelete(account)}
                    aria-label={`Delete ${account.name}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {accounts.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="py-10 text-center text-sm text-slate-400"
                data-testid="no-accounts-row"
              >
                No accounts yet. Add your first account to get started.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
