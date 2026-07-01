"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

export type FilterType = "all" | "credit" | "debit";

interface TransactionFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  filterType: FilterType;
  onFilterTypeChange: (v: FilterType) => void;
  dateFrom: string;
  onDateFromChange: (v: string) => void;
  dateTo: string;
  onDateToChange: (v: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function TransactionFilterBar({
  search,
  onSearchChange,
  filterType,
  onFilterTypeChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearFilters,
  hasActiveFilters,
}: TransactionFilterBarProps) {
  return (
    <div
      className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
      data-testid="transaction-filter-bar"
      aria-label="Transaction filters"
    >
      <div className="flex flex-wrap items-end gap-3">
        {/* Search — Beginner: getByLabel + getByTestId */}
        <div className="min-w-[180px] flex-1">
          <Label
            htmlFor="txn-search"
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
              id="txn-search"
              type="text"
              placeholder="Search description…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="txn-search-input"
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>

        {/* Date from — Beginner: getByLabel */}
        <div>
          <Label
            htmlFor="txn-date-from"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            From
          </Label>
          <Input
            id="txn-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            data-testid="txn-date-from-input"
            className="h-8 text-sm"
          />
        </div>

        {/* Date to — Beginner: getByLabel */}
        <div>
          <Label
            htmlFor="txn-date-to"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            To
          </Label>
          <Input
            id="txn-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            data-testid="txn-date-to-input"
            className="h-8 text-sm"
          />
        </div>

        {/* Type filter buttons — Medium: no data-testid on each button, aria-pressed */}
        <div>
          <p className="mb-1 text-xs font-medium text-slate-600 dark:text-slate-400">
            Type
          </p>
          {/*
           * Medium locator: filter buttons — shared container testid, individual aria-pressed
           * Practice:
           *   page.getByTestId('txn-type-filter').getByRole('button', { name: 'Credits' })
           *   //div[@data-testid="txn-type-filter"]//button[normalize-space()="Credits"]
           */}
          <div
            className="flex rounded-lg border border-slate-200 dark:border-slate-600"
            data-testid="txn-type-filter"
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
            data-testid="clear-filters-btn"
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
