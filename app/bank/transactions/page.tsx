"use client";

import { useMemo, useState } from "react";
import { Download, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  useBankAppStore,
  useUserAccounts,
  useUserTransactions,
} from "../store/useBankAppStore";
import {
  AllTransactionsFilterBar,
  type FilterType,
} from "./_components/all-transactions-filter-bar";
import {
  AllTransactionsTable,
  type SortField,
  type SortOrder,
  type TransactionWithAccount,
} from "./_components/all-transactions-table";

const PAGE_SIZE = 10;

export default function TransactionsPage() {
  const { currentUsername } = useBankAppStore();
  const accounts = useUserAccounts(currentUsername);
  const allTransactions = useUserTransactions(currentUsername);

  const accountNameById = useMemo(
    () => new Map(accounts.map((a) => [a.id, a.name])),
    [accounts],
  );

  // ── Filter state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [accountId, setAccountId] = useState("all");
  const [sortField, setSortField] = useState<SortField | null>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const hasActiveFilters = !!(search || filterType !== "all" || accountId !== "all");

  const handleClearFilters = () => {
    setSearch("");
    setFilterType("all");
    setAccountId("all");
    setCurrentPage(1);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  // ── Filter + sort ──────────────────────────────────────────────────────────
  const filteredAndSorted = useMemo<TransactionWithAccount[]>(() => {
    let result: TransactionWithAccount[] = allTransactions.map((t) => ({
      ...t,
      accountName: accountNameById.get(t.accountId) ?? "Unknown account",
    }));

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q));
    }
    if (accountId !== "all")
      result = result.filter((t) => t.accountId === accountId);
    if (filterType === "credit") result = result.filter((t) => t.amount > 0);
    if (filterType === "debit") result = result.filter((t) => t.amount < 0);

    if (sortField) {
      result = [...result].sort((a, b) => {
        if (sortField === "date") {
          return sortOrder === "asc"
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        }
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      });
    }

    return result;
  }, [allTransactions, accountNameById, search, accountId, filterType, sortField, sortOrder]);

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / PAGE_SIZE));
  const paginated = filteredAndSorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ── CSV download ───────────────────────────────────────────────────────────
  const handleDownload = () => {
    const header = "ID,Date,Account,Description,Category,Amount\n";
    const rows = filteredAndSorted
      .map(
        (t) =>
          `${t.id},${t.date},"${t.accountName}","${t.description}",${t.category},${t.amount}`,
      )
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div data-testid="transactions-page" data-section="transactions">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
          <History className="h-5 w-5 text-violet-600" aria-hidden="true" />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="transactions-page-title"
          >
            Transactions
          </h1>
          <p className="text-sm text-slate-500">
            All activity across your accounts
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <AllTransactionsFilterBar
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setCurrentPage(1);
        }}
        filterType={filterType}
        onFilterTypeChange={(v) => {
          setFilterType(v);
          setCurrentPage(1);
        }}
        accountId={accountId}
        onAccountIdChange={(v) => {
          setAccountId(v);
          setCurrentPage(1);
        }}
        accounts={accounts}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Table */}
      <AllTransactionsTable
        transactions={paginated}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {/* Pagination + download row */}
      <nav
        className="mt-4 flex flex-wrap items-center justify-between gap-2"
        data-testid="all-txn-pagination-controls"
        aria-label="Transaction pagination"
      >
        <p className="text-xs text-slate-500" data-testid="all-txn-pagination-info">
          {filteredAndSorted.length === 0
            ? "No transactions"
            : `Showing ${(currentPage - 1) * PAGE_SIZE + 1}–${Math.min(currentPage * PAGE_SIZE, filteredAndSorted.length)} of ${filteredAndSorted.length}`}
        </p>

        <div className="flex items-center gap-1">
          {/*
           * Challenge locator: pagination buttons — aria-label only on prev/next
           * Individual page number buttons: data-page attribute, no data-testid
           * Practice:
           *   page.getByRole('button', { name: 'Previous page' })
           *   page.locator('[data-page="2"]').click()
           *   XPath: //button[@aria-current="page"]
           */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
            data-testid="all-txn-pagination-prev"
            className="h-7 px-2 text-xs"
          >
            ‹
          </Button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              data-page={page}
              className={[
                "h-7 min-w-[1.75rem] rounded-md px-1.5 text-xs font-medium transition-colors",
                currentPage === page
                  ? "bg-violet-600 text-white"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50",
              ].join(" ")}
            >
              {page}
            </button>
          ))}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            data-testid="all-txn-pagination-next"
            className="h-7 px-2 text-xs"
          >
            ›
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          data-testid="download-all-transactions-btn"
          className="h-7 gap-1.5 text-xs"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download CSV
        </Button>
      </nav>
    </div>
  );
}
