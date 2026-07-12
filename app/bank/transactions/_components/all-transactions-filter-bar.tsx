"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import type { Account } from "../../lib/types";

export type FilterType = "all" | "credit" | "debit";

interface AllTransactionsFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  filterType: FilterType;
  onFilterTypeChange: (v: FilterType) => void;
  accountId: string;
  onAccountIdChange: (v: string) => void;
  accounts: Account[];
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function AllTransactionsFilterBar({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  accountId,
  onAccountIdChange,
  accounts,
  onClearFilters,
  hasActiveFilters,
}: AllTransactionsFilterBarProps) {
  return (
    <div
      className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
      data-testid="all-transactions-filter-bar"
      aria-label="Transaction filters"
    >
      <div className="flex flex-wrap items-end gap-3">
        {/* Search — Beginner: getByLabel + getByTestId */}
        <div className="min-w-[180px] flex-1">
          <Label
            htmlFor="all-txn-search"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Search
          </Label>
          <div className="relative">
            <Search
              className="absolute top-1/2 left-2.5 h-3.5 w-3.5 -translate-y-1/2 text-slate-400"
              aria-hidden="true"
            />
            <Input
              id="all-txn-search"
              type="text"
              placeholder="Search description…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="all-txn-search-input"
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>

        {/* Account filter — Beginner: getByLabel */}
        <div className="min-w-[180px]">
          <Label
            htmlFor="all-txn-account-trigger"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Account
          </Label>
          <Select value={accountId} onValueChange={onAccountIdChange}>
            <SelectTrigger
              id="all-txn-account-trigger"
              data-testid="all-txn-account-select"
              className="h-8 w-full text-sm"
            >
              <SelectValue placeholder="All accounts" />
            </SelectTrigger>
            <SelectContent data-testid="all-txn-account-options">
              <SelectItem value="all" data-testid="all-txn-account-option">
                All accounts
              </SelectItem>
              {accounts.map((acc) => (
                <SelectItem
                  key={acc.id}
                  value={acc.id}
                  data-testid="all-txn-account-option"
                  data-account-id={acc.id}
                >
                  {acc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Type filter buttons — Medium: shared container testid, individual aria-pressed */}
        <div>
          <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            Type
          </p>
          {/*
           * Medium locator: filter buttons — shared container testid, individual aria-pressed
           * Practice:
           *   page.getByTestId('all-txn-type-filter').getByRole('button', { name: 'Credits' })
           *   //div[@data-testid="all-txn-type-filter"]//button[normalize-space()="Credits"]
           */}
          <div
            className="flex rounded-lg border border-slate-200 dark:border-slate-600"
            data-testid="all-txn-type-filter"
            role="group"
            aria-label="Filter by transaction type"
          >
            {(["all", "credit", "debit"] as FilterType[]).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => onFilterTypeChange(type)}
                aria-pressed={filterType === type}
                className={[
                  "h-8 px-3 text-xs font-medium capitalize transition-colors first:rounded-l-md last:rounded-r-md",
                  filterType === type
                    ? "bg-violet-600 text-white"
                    : "text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-700",
                ].join(" ")}
              >
                {type === "all"
                  ? "All"
                  : type === "credit"
                    ? "Credits"
                    : "Debits"}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            data-testid="clear-all-txn-filters-btn"
            className="h-8 text-xs text-slate-500"
          >
            <X className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
