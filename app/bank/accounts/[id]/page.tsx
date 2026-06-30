"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useBankAppStore, useUserAccounts, useUserTransactions } from "../../store/useBankAppStore";
import { formatCurrency, computeRunningBalances } from "../../lib/utils";
import { TransactionFilterBar, type FilterType } from "./_components/transaction-filter-bar";
import { TransactionsTable } from "./_components/transactions-table";
import type { Transaction } from "../../lib/types";

const PAGE_SIZE = 10;

type SortField = "date" | "amount";
type SortOrder = "asc" | "desc";

const TYPE_STYLES: Record<string, string> = {
  Checking: "bg-violet-100 text-violet-700",
  Savings: "bg-emerald-100 text-emerald-700",
  Credit: "bg-rose-100 text-rose-700",
};

export default function AccountDetailPage() {
  const params = useParams();
  const accountId = params?.id as string;
  const { currentUsername } = useBankAppStore();
  const accounts = useUserAccounts(currentUsername);
  const allTransactions = useUserTransactions(currentUsername);

  const account = accounts.find((a) => a.id === accountId);
  const accountTransactions = allTransactions.filter((t) => t.accountId === accountId);

  // ── Filter state ──────────────────────────────────────────────────────────
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sortField, setSortField] = useState<SortField | null>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [currentPage, setCurrentPage] = useState(1);

  const hasActiveFilters = !!(search || filterType !== "all" || dateFrom || dateTo);

  const handleClearFilters = () => {
    setSearch("");
    setFilterType("all");
    setDateFrom("");
    setDateTo("");
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
  const filteredAndSorted = useMemo<Transaction[]>(() => {
    let result = [...accountTransactions];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((t) => t.description.toLowerCase().includes(q));
    }
    if (filterType === "credit") result = result.filter((t) => t.amount > 0);
    if (filterType === "debit") result = result.filter((t) => t.amount < 0);
    if (dateFrom) result = result.filter((t) => t.date >= dateFrom);
    if (dateTo) result = result.filter((t) => t.date <= dateTo);

    if (sortField) {
      result.sort((a, b) => {
        if (sortField === "date") {
          return sortOrder === "asc"
            ? a.date.localeCompare(b.date)
            : b.date.localeCompare(a.date);
        }
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      });
    }

    return result;
  }, [accountTransactions, search, filterType, dateFrom, dateTo, sortField, sortOrder]);

  // Add running balances
  const withRunning = useMemo(
    () => computeRunningBalances(filteredAndSorted, account?.balance ?? 0),
    [filteredAndSorted, account?.balance],
  ) as Transaction[];

  // ── Pagination ─────────────────────────────────────────────────────────────
  const totalPages = Math.max(1, Math.ceil(withRunning.length / PAGE_SIZE));
  const paginated = withRunning.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  // ── CSV download ───────────────────────────────────────────────────────────
  const handleDownload = () => {
    const header = "ID,Date,Description,Category,Amount\n";
    const rows = filteredAndSorted
      .map((t) => `${t.id},${t.date},"${t.description}",${t.category},${t.amount}`)
      .join("\n");
    const blob = new Blob([header + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${accountId}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ── Not found ──────────────────────────────────────────────────────────────
  if (!account) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        data-testid="account-not-found"
      >
        <AlertTriangle className="mb-3 h-10 w-10 text-amber-400" />
        <h1 className="text-xl font-bold text-slate-900 dark:text-white">
          Account not found
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The account <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">{accountId}</code> doesn&apos;t exist.
        </p>
        <Button asChild variant="outline" size="sm" className="mt-4" data-testid="back-to-accounts-btn">
          <Link href="/bank/accounts">Back to Accounts</Link>
        </Button>
      </div>
    );
  }

  return (
    <div data-testid="account-detail-page" data-section="account-detail" data-account-id={accountId}>
      {/* Back nav */}
      <Link
        href="/bank/accounts"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white"
        data-testid="back-to-accounts-link"
      >
        <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
        All Accounts
      </Link>

      {/* Account header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1
              className="text-2xl font-bold text-slate-900 dark:text-white"
              data-testid="account-detail-name"
            >
              {account.name}
            </h1>
            <Badge className={TYPE_STYLES[account.type] ?? ""} data-testid="account-detail-type-badge">
              {account.type}
            </Badge>
          </div>
          {/*
           * Hard locator: account number row — no data-testid, font-mono
           * XPath: //div[@data-testid="account-detail-page"]//p[contains(@class,"font-mono")]
           */}
          <p className="mt-1 font-mono text-sm text-slate-500">
            {account.accountNumber}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-slate-500">Current Balance</p>
          <p
            className={[
              "text-2xl font-bold tabular-nums",
              account.isOverdrawn ? "text-red-600" : "text-slate-900 dark:text-white",
            ].join(" ")}
            data-testid="account-detail-balance"
          >
            {formatCurrency(account.balance)}
          </p>
          {account.isOverdrawn && (
            <div
              className="mt-1 flex items-center justify-end gap-1 text-xs font-medium text-red-600"
              data-testid="account-overdrawn-banner"
            >
              <AlertTriangle className="h-3 w-3" />
              Overdrawn — transfers out disabled
            </div>
          )}
        </div>
      </div>

      {/* Filter bar */}
      <TransactionFilterBar
        search={search}
        onSearchChange={(v) => { setSearch(v); setCurrentPage(1); }}
        filterType={filterType}
        onFilterTypeChange={(v) => { setFilterType(v); setCurrentPage(1); }}
        dateFrom={dateFrom}
        onDateFromChange={(v) => { setDateFrom(v); setCurrentPage(1); }}
        dateTo={dateTo}
        onDateToChange={(v) => { setDateTo(v); setCurrentPage(1); }}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      {/* Table */}
      <TransactionsTable
        transactions={paginated}
        sortField={sortField}
        sortOrder={sortOrder}
        onSort={handleSort}
      />

      {/* Pagination + download row */}
      <nav
        className="mt-4 flex flex-wrap items-center justify-between gap-2"
        data-testid="pagination-controls"
        aria-label="Transaction pagination"
      >
        <p
          className="text-xs text-slate-500"
          data-testid="pagination-info"
        >
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
            data-testid="pagination-prev"
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
            data-testid="pagination-next"
            className="h-7 px-2 text-xs"
          >
            ›
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleDownload}
          data-testid="download-statement-btn"
          className="h-7 gap-1.5 text-xs"
        >
          <Download className="h-3.5 w-3.5" aria-hidden="true" />
          Download CSV
        </Button>
      </nav>
    </div>
  );
}
