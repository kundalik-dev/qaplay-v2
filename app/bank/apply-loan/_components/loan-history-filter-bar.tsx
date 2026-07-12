"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface LoanHistoryFilterBarProps {
  dateFrom: string;
  onDateFromChange: (v: string) => void;
  dateTo: string;
  onDateToChange: (v: string) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

export function LoanHistoryFilterBar({
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
