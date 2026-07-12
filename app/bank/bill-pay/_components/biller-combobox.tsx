"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, CheckCircle2, Plus } from "lucide-react";
import type { Biller } from "../../lib/types";

interface BillerComboboxProps {
  billers: Biller[];
  selectedBillerId: string;
  onSelectBiller: (id: string) => void;
  onAddNew: () => void;
  disabled?: boolean;
}

export function BillerCombobox({
  billers,
  selectedBillerId,
  onSelectBiller,
  onAddNew,
  disabled,
}: BillerComboboxProps) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const selectedBiller = billers.find((b) => b.id === selectedBillerId);

  const filteredBillers = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return billers;
    return billers.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.referenceNumber.toLowerCase().includes(q),
    );
  }, [billers, query]);

  const handleSelect = (id: string) => {
    onSelectBiller(id);
    setQuery("");
    setOpen(false);
  };

  return (
    <div className="relative">
      <div className="mb-1.5 flex items-center justify-between">
        <Label
          htmlFor="biller-search-input"
          className="block text-sm font-medium text-slate-700"
        >
          Biller
        </Label>

        {/* Beginner: getByTestId add-biller button */}
        <button
          type="button"
          onClick={onAddNew}
          disabled={disabled}
          data-testid="add-biller-btn"
          className="flex items-center gap-1 text-xs font-medium text-violet-600 transition-colors hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          Add
        </button>
      </div>

      {/* Beginner: getByLabel + getByTestId on the searchable input */}
      <div className="relative">
        <Search
          className="absolute top-1/2 left-3 -translate-y-1/2 h-3.5 w-3.5 text-slate-400"
          aria-hidden="true"
        />
        <Input
          id="biller-search-input"
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls="biller-search-results"
          autoComplete="off"
          placeholder={selectedBiller ? selectedBiller.name : "Search billers…"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            // Delay so a click on a dropdown option registers first
            setTimeout(() => setOpen(false), 120);
          }}
          disabled={disabled}
          data-testid="biller-search-input"
          className="pl-8"
        />
      </div>

      {/*
       * Hard locator: selected biller summary — no data-testid, plain text
       * XPath: //div[@data-testid="biller-selected-summary"]//span[contains(@class,"font-medium")]
       */}
      {selectedBiller && !open && (
        <div
          className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-500"
          data-testid="biller-selected-summary"
        >
          <CheckCircle2
            className="h-3 w-3 text-emerald-500"
            aria-hidden="true"
          />
          <span className="font-medium text-slate-700 dark:text-slate-300">
            {selectedBiller.name}
          </span>
          <span>— Ref: {selectedBiller.referenceNumber}</span>
        </div>
      )}

      {open && (
        <div
          id="biller-search-results"
          role="listbox"
          className="absolute z-20 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800"
          data-testid="biller-search-results"
        >
          {filteredBillers.length === 0 ? (
            <p
              className="px-3 py-2.5 text-xs text-slate-400"
              data-testid="biller-search-no-results"
            >
              {query
                ? `No billers match "${query}".`
                : "No saved billers yet — click Add to create one."}
            </p>
          ) : (
            /*
             * Medium locator: shared data-testid + unique data-biller-id
             * Practice:
             *   page.getByTestId('biller-option').filter({ hasText: 'City Electric' })
             *   page.locator('[data-testid="biller-option"][data-biller-id="biller-001"]')
             */
            filteredBillers.map((b) => (
              <button
                key={b.id}
                type="button"
                role="option"
                aria-selected={selectedBillerId === b.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(b.id)}
                data-testid="biller-option"
                data-biller-id={b.id}
                className={[
                  "flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left text-sm transition-colors hover:bg-violet-50 dark:hover:bg-violet-900/20",
                  selectedBillerId === b.id
                    ? "bg-violet-50 dark:bg-violet-900/20"
                    : "",
                ].join(" ")}
              >
                <span className="font-medium text-slate-900 dark:text-white">
                  {b.name}
                </span>
                <span className="text-xs text-slate-500">
                  Ref: {b.referenceNumber}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
