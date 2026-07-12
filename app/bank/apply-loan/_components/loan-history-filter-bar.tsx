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
import type { LoanType } from "../../lib/types";

export type LoanTypeFilter = LoanType | "all";

const LOAN_TYPE_FILTER_OPTIONS: LoanTypeFilter[] = [
  "all",
  "Personal",
  "Auto",
  "Home",
  "Student",
];

interface LoanHistoryFilterBarProps {
  search: string;
  onSearchChange: (v: string) => void;
  loanTypeFilter: LoanTypeFilter;
  onLoanTypeFilterChange: (v: LoanTypeFilter) => void;
  dateFrom: string;
  onDateFromChange: (v: string) => void;
  dateTo: string;
  onDateToChange: (v: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function LoanHistoryFilterBar({
  search,
  onSearchChange,
  loanTypeFilter,
  onLoanTypeFilterChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onClearFilters,
  hasActiveFilters,
}: LoanHistoryFilterBarProps) {
  return (
    <div
      className="mb-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800"
      data-testid="loan-history-filter-bar"
      aria-label="Loan history filters"
    >
      <div className="flex flex-wrap items-end gap-3">
        {/* Search — Beginner: getByLabel + getByTestId */}
        <div className="min-w-[180px] flex-1">
          <Label
            htmlFor="loan-search"
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
              id="loan-search"
              type="text"
              placeholder="Search reference or purpose…"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              data-testid="loan-search-input"
              className="h-8 pl-8 text-sm"
            />
          </div>
        </div>

        {/* Loan type — Beginner: getByLabel + getByTestId */}
        <div>
          <Label
            htmlFor="loan-type-filter-trigger"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            Loan Type
          </Label>
          <Select
            value={loanTypeFilter}
            onValueChange={(v) => onLoanTypeFilterChange(v as LoanTypeFilter)}
          >
            <SelectTrigger
              id="loan-type-filter-trigger"
              data-testid="loan-type-filter-select"
              className="h-8 w-[150px] text-sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent data-testid="loan-type-filter-options">
              {LOAN_TYPE_FILTER_OPTIONS.map((type) => (
                <SelectItem
                  key={type}
                  value={type}
                  data-testid="loan-type-filter-option"
                  data-loan-type={type.toLowerCase()}
                >
                  {type === "all" ? "All Types" : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date from — Beginner: getByLabel + getByTestId */}
        <div>
          <Label
            htmlFor="loan-date-from"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            From
          </Label>
          <Input
            id="loan-date-from"
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            data-testid="loan-date-from-input"
            className="h-8 text-sm"
          />
        </div>

        {/* Date to — Beginner: getByLabel + getByTestId */}
        <div>
          <Label
            htmlFor="loan-date-to"
            className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400"
          >
            To
          </Label>
          <Input
            id="loan-date-to"
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            data-testid="loan-date-to-input"
            className="h-8 text-sm"
          />
        </div>

        {hasActiveFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            data-testid="loan-clear-filters-btn"
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
