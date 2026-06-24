"use client";

import React, { useState, useMemo } from "react";
import { useBankStore, Transaction } from "../store/useBankStore";
import "../styles/bank.css";

/* ── Constants ──────────────────────────────────────────────────── */
const CATEGORIES = [
  "Income",
  "Groceries",
  "Utilities",
  "Shopping",
  "Transport",
  "Dining",
  "Health",
];
const FILTER_CATEGORIES = ["All", ...CATEGORIES];
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50];

function nextTrxId(transactions: Transaction[]): string {
  const nums = transactions
    .map((t) => parseInt(t.id.replace("trx-", ""), 10))
    .filter((n) => !isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : 1000;
  return `trx-${max + 1}`;
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function DashboardPage() {
  const {
    balance,
    transactions,
    deleteTransaction,
    updateTransaction,
    addTransaction,
    user,
    accounts,
  } = useBankStore();

  /* Filters + sort */
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [isComboOpen, setIsComboOpen] = useState(false);
  const [sortField, setSortField] = useState<"id" | "date" | "amount" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  /* Pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  /* Modal */
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingTrx, setEditingTrx] = useState<Transaction | null>(null);

  /* Form */
  const [formDate, setFormDate] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formAmount, setFormAmount] = useState("");
  const [formCategory, setFormCategory] = useState("Income");

  /* ── Derived stats ──────────────────────────────────────────── */
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((s, t) => s + t.amount, 0);

  /* ── Export helpers ─────────────────────────────────────────── */
  const handleExportExcel = () => {
    const csv =
      "data:text/csv;charset=utf-8," +
      "ID,Date,Description,Amount,Category\n" +
      transactions
        .map(
          (t) =>
            `${t.id},${t.date},${t.description},${t.amount},${t.category}`,
        )
        .join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = () => {
    alert("PDF Exported!");
  };

  /* ── Sort + filter ──────────────────────────────────────────── */
  const sortedAndFiltered = useMemo(() => {
    let result = [...transactions];
    if (categoryFilter !== "All")
      result = result.filter((t) => t.category === categoryFilter);
    if (sortField) {
      result.sort((a, b) => {
        if (sortField === "id") {
          const numA = parseInt(a.id.replace("trx-", ""), 10);
          const numB = parseInt(b.id.replace("trx-", ""), 10);
          return sortOrder === "asc" ? numA - numB : numB - numA;
        }
        if (sortField === "amount") {
          // P2 Bug: sorting amounts as strings (alphabetically) instead of numerically
          const valA = String(a.amount);
          const valB = String(b.amount);
          if (valA < valB) return sortOrder === "asc" ? -1 : 1;
          if (valA > valB) return sortOrder === "asc" ? 1 : -1;
          return 0;
        }
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }
    return result;
  }, [transactions, sortField, sortOrder, categoryFilter]);

  /* ── Pagination ─────────────────────────────────────────────── */
  const totalPages = Math.max(1, Math.ceil(sortedAndFiltered.length / pageSize));
  const paginatedTrx = sortedAndFiltered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handlePageChange = (page: number) =>
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));

  /* ── Delete (P1 bug preserved) ──────────────────────────────── */
  const handleDelete = (index: number, transaction: Transaction) => {
    if (transaction.category === "Utilities") {
      const wrongIndex = Math.max(0, index - 1);
      const wrongTrx = paginatedTrx[wrongIndex];
      deleteTransaction(wrongTrx.id);
    } else {
      deleteTransaction(transaction.id);
    }
  };

  const toggleSort = (field: "id" | "date" | "amount") => {
    if (sortField === field)
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortField(field);
      setSortOrder("desc");
    }
    setCurrentPage(1);
  };

  const resetSort = () => {
    setSortField(null);
    setSortOrder("desc");
    setCurrentPage(1);
  };

  /* ── Modal helpers ──────────────────────────────────────────── */
  const openAddModal = () => {
    setModalMode("add");
    setEditingTrx(null);
    setFormDate(new Date().toISOString().slice(0, 10));
    setFormDescription("");
    setFormAmount("");
    setFormCategory("Income");
    setModalOpen(true);
  };

  const openEditModal = (trx: Transaction) => {
    setModalMode("edit");
    setEditingTrx(trx);
    setFormDate(trx.date);
    setFormDescription(trx.description);
    setFormAmount(String(trx.amount));
    setFormCategory(trx.category);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingTrx(null);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = parseFloat(formAmount);
    if (isNaN(amountNum)) return;
    if (modalMode === "add") {
      addTransaction({
        id: nextTrxId(transactions),
        date: formDate,
        description: formDescription,
        amount: amountNum,
        category: formCategory,
      });
    } else if (editingTrx) {
      updateTransaction({
        ...editingTrx,
        date: formDate,
        description: formDescription,
        amount: amountNum,
        category: formCategory,
      });
    }
    closeModal();
    setCurrentPage(1);
  };

  /* ── Render ─────────────────────────────────────────────────── */
  return (
    <div data-testid="bank-dashboard">
      {/* Page heading */}
      <h1 className="bank-page-title" data-testid="dashboard-title">
        Dashboard
      </h1>
      <p className="bank-page-subtitle">
        Welcome back, <strong>{user?.username ?? "User"}</strong>. Here&apos;s
        your financial overview.
      </p>

      {/* ── 4 Summary cards (beginner: data-testid on each card) ─ */}
      <div
        className="bank-stats-row bank-stats-row--four"
        data-testid="stats-row"
      >
        {/* Balance card — top-accent */}
        <div
          className="bank-stat-card bank-stat-card--balance"
          data-testid="stat-balance"
          data-card="balance"
        >
          <div className="bank-stat-card-top">
            <p className="bank-stat-label">Total Balance</p>
            <span className="bank-stat-icon bank-stat-icon--balance" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
              </svg>
            </span>
          </div>
          <p
            className="bank-stat-value bank-stat-value--balance"
            data-testid="account-balance"
          >
            ${balance.toFixed(2)}
          </p>
          {(accounts || []).map((acc) => (
            <p key={acc.id} className="bank-balance-account-mini">
              {acc.name} · {acc.accountNumber}
            </p>
          ))}
        </div>

        <div
          className="bank-stat-card"
          data-testid="stat-income"
          data-card="income"
        >
          <div className="bank-stat-card-top">
            <p className="bank-stat-label">Total Income</p>
            <span className="bank-stat-icon bank-stat-icon--income" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
              </svg>
            </span>
          </div>
          <p
            className="bank-stat-value income"
            data-testid="stat-income-value"
          >
            +${totalIncome.toFixed(2)}
          </p>
        </div>

        <div
          className="bank-stat-card"
          data-testid="stat-expenses"
          data-card="expenses"
        >
          <div className="bank-stat-card-top">
            <p className="bank-stat-label">Total Expenses</p>
            <span className="bank-stat-icon bank-stat-icon--expense" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/>
              </svg>
            </span>
          </div>
          <p
            className="bank-stat-value expense"
            data-testid="stat-expense-value"
          >
            ${totalExpense.toFixed(2)}
          </p>
        </div>

        <div
          className="bank-stat-card"
          data-testid="stat-transactions"
          data-card="transactions"
        >
          <div className="bank-stat-card-top">
            <p className="bank-stat-label">Transactions</p>
            <span className="bank-stat-icon bank-stat-icon--count" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </span>
          </div>
          <p className="bank-stat-value" data-testid="stat-transaction-count">
            {transactions.length}
          </p>
        </div>
      </div>

      {/* ── Action row: title | filter + exports + add btn ─────── */}
      <div
        className="bank-action-row bank-action-row--extended"
        data-testid="action-row"
      >
        <div className="bank-action-row-left">
          <h2 className="bank-section-title">Recent Transactions</h2>
        </div>

        <div className="bank-action-row-right">
          <span className="bank-filter-label">Category:</span>

          {/* Challenge Locator: Custom Combobox — no native select */}
          <div
            className="bank-combobox-wrapper"
            data-testid="category-filter-combobox"
          >
            <button
              type="button"
              className="bank-combobox-trigger"
              onClick={() => setIsComboOpen(!isComboOpen)}
              aria-haspopup="listbox"
              aria-expanded={isComboOpen}
              data-testid="combobox-trigger"
            >
              {categoryFilter}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            {isComboOpen && (
              <ul
                className="bank-combobox-list"
                role="listbox"
                data-testid="combobox-list"
              >
                {FILTER_CATEGORIES.map((cat) => (
                  <li
                    key={cat}
                    role="option"
                    aria-selected={categoryFilter === cat}
                    className="bank-combobox-option"
                    onClick={() => {
                      setCategoryFilter(cat);
                      setIsComboOpen(false);
                      setCurrentPage(1);
                    }}
                    data-category-id={`cat-${cat.toLowerCase()}`}
                    data-testid={`combobox-option-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* P3 Bug: Typo in aria-label ("Excl" instead of "Excel") */}
          <button
            type="button"
            className="bank-export-btn-small"
            onClick={handleExportExcel}
            aria-label="Export to Excl"
            data-testid="export-excel-btn"
          >
            Export Excel
          </button>
          <button
            type="button"
            className="bank-export-btn-small"
            onClick={handleExportPdf}
            data-testid="export-pdf-btn"
            aria-label="Export to PDF"
          >
            Export PDF
          </button>

          {/* Divider before primary CTA */}
          <div className="bank-action-divider" aria-hidden="true" />

          {/* Beginner: clear role + data-testid */}
          <button
            type="button"
            className="bank-add-btn"
            onClick={openAddModal}
            data-testid="add-transaction-btn"
            aria-label="Add new transaction"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Add Transaction
          </button>
        </div>
      </div>

      {/* ── Transaction table ────────────────────────────────────── */}
      <div
        className="bank-table-wrapper"
        data-testid="transaction-table-wrapper"
      >
        <table className="bank-table" data-testid="transactions-table">
          <thead>
            <tr>
              <th
                className="sortable"
                onClick={() => toggleSort("id")}
                data-testid="sort-id-header"
                aria-sort={
                  sortField === "id"
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                ID{" "}
                {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th
                className="sortable"
                onClick={() => toggleSort("date")}
                data-testid="sort-date-header"
                aria-sort={
                  sortField === "date"
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Date{" "}
                {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>Description</th>
              <th>Category</th>
              <th
                className="sortable"
                onClick={() => toggleSort("amount")}
                data-testid="sort-amount-header"
                aria-sort={
                  sortField === "amount"
                    ? sortOrder === "asc"
                      ? "ascending"
                      : "descending"
                    : "none"
                }
              >
                Amount{" "}
                {sortField === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th>
                <span>Actions</span>
                {sortField && (
                  <button
                    type="button"
                    className="bank-reset-sort-btn"
                    onClick={resetSort}
                    data-testid="reset-sort-btn"
                    aria-label="Reset sorting"
                    title="Reset sorting"
                  >
                    ↺ Reset
                  </button>
                )}
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrx.map((trx, index) => (
              /*
               * Medium Locator: shared data-testid="transaction-row" + unique data-transaction-id
               * Practice:
               *   page.getByTestId('transaction-row').filter({ hasText: 'TechCorp Salary' })
               *   page.locator('[data-testid="transaction-row"][data-transaction-id="trx-1001"]')
               *   //tr[@data-transaction-id="trx-1001"]
               */
              <tr
                key={trx.id}
                data-testid="transaction-row"
                data-transaction-id={trx.id}
                data-category={trx.category}
              >
                <td>{trx.id}</td>
                <td>{trx.date}</td>
                <td>{trx.description}</td>
                <td>{trx.category}</td>
                <td
                  className={
                    trx.amount > 0
                      ? "bank-amount-positive"
                      : "bank-amount-negative"
                  }
                >
                  {trx.amount > 0 ? "+" : ""}
                  {trx.amount.toFixed(2)}
                </td>
                <td className="bank-actions-cell">
                  {/*
                   * Medium Locator: no data-testid — use aria-label or ancestor XPath
                   * Practice:
                   *   row.getByRole('button', { name: /Edit transaction/ })
                   *   //tr[@data-transaction-id="trx-1001"]//button[contains(@aria-label,"Edit")]
                   */}
                  <button
                    type="button"
                    className="bank-edit-btn"
                    onClick={() => openEditModal(trx)}
                    aria-label={`Edit transaction ${trx.id}`}
                  >
                    Edit
                  </button>
                  {/*
                   * Hard Locator: no data-testid, sibling of Edit
                   * Practice:
                   *   //tr[@data-transaction-id="trx-1001"]//button[contains(@aria-label,"Delete")]
                   *   //button[@aria-label="Edit transaction trx-1001"]/following-sibling::button
                   */}
                  <button
                    type="button"
                    className="bank-delete-btn"
                    onClick={() => handleDelete(index, trx)}
                    aria-label={`Delete transaction ${trx.id}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {paginatedTrx.length === 0 && (
              <tr>
                <td colSpan={6} className="bank-table-empty">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Pagination ───────────────────────────────────────────── */}
      <nav
        className="bank-pagination"
        data-testid="pagination-controls"
        aria-label="Transaction pagination"
      >
        {/* Left: page-size picker */}
        <div className="bank-pagination-left">
          <label
            htmlFor="page-size-select"
            className="bank-page-size-label"
          >
            Show
          </label>
          {/*
           * Medium Locator: native select with label + data-testid
           * Practice:
           *   page.getByLabel('Show').selectOption('10')
           *   page.getByTestId('page-size-select').selectOption({ value: '20' })
           */}
          <select
            id="page-size-select"
            className="bank-page-size-select"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            data-testid="page-size-select"
            aria-label="Transactions per page"
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
          <span className="bank-page-size-label">per page</span>
          <span
            className="bank-pagination-info"
            data-testid="pagination-info"
          >
            &mdash; Page <strong>{currentPage}</strong> of{" "}
            <strong>{totalPages}</strong> &middot;{" "}
            {sortedAndFiltered.length} transaction
            {sortedAndFiltered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Right: page buttons */}
        <div className="bank-pagination-buttons">
          <button
            type="button"
            className="bank-page-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            aria-label="Go to first page"
            data-testid="pagination-first"
          >
            «
          </button>
          <button
            type="button"
            className="bank-page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            data-testid="pagination-prev"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={[
                "bank-page-btn",
                currentPage === page ? "active" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              onClick={() => handlePageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              data-page={page}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            className="bank-page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            data-testid="pagination-next"
          >
            ›
          </button>
          <button
            type="button"
            className="bank-page-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-label="Go to last page"
            data-testid="pagination-last"
          >
            »
          </button>
        </div>
      </nav>

      {/* ── Add / Edit Modal ──────────────────────────────────────── */}
      {modalOpen && (
        <div
          className="bank-modal-overlay"
          data-testid="modal-overlay"
          onClick={closeModal}
        >
          {/*
           * Medium/Hard Locator: role="dialog" + aria-labelledby
           * Practice:
           *   page.getByRole('dialog', { name: 'Add Transaction' })
           *   //*[@role="dialog" and .//h2[normalize-space()="Add Transaction"]]
           */}
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="transaction-dialog-title"
            data-testid="transaction-dialog"
            className="bank-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bank-modal-header">
              <h2
                id="transaction-dialog-title"
                data-testid="modal-title"
              >
                {modalMode === "add" ? "Add Transaction" : "Edit Transaction"}
              </h2>
              {/* Challenge: no data-testid — use aria-label */}
              <button
                type="button"
                className="bank-modal-close"
                onClick={closeModal}
                aria-label="Close dialog"
              >
                ✕
              </button>
            </div>

            <form
              className="bank-modal-form"
              onSubmit={handleModalSubmit}
              data-testid="transaction-form"
              aria-labelledby="transaction-dialog-title"
            >
              {/* Beginner: label + id + data-testid */}
              <div className="bank-form-group">
                <label htmlFor="trx-date" className="bank-form-label">
                  Date
                </label>
                <input
                  id="trx-date"
                  type="date"
                  className="bank-form-input"
                  value={formDate}
                  onChange={(e) => setFormDate(e.target.value)}
                  required
                  data-testid="trx-date-input"
                />
              </div>

              {/* Beginner: label + id + data-testid */}
              <div className="bank-form-group">
                <label htmlFor="trx-description" className="bank-form-label">
                  Description
                </label>
                <input
                  id="trx-description"
                  type="text"
                  className="bank-form-input"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  required
                  placeholder="e.g. Grocery shopping"
                  data-testid="trx-description-input"
                />
              </div>

              {/*
               * Hard Locator: no id, no data-testid — span label + sibling/ancestor XPath
               * Practice:
               *   //span[normalize-space()="Amount"]/following-sibling::div//input
               *   //input[starts-with(@name,"trx_amount_")]
               */}
              <div className="bank-form-group">
                <div className="bank-field-row">
                  <span className="bank-field-label">Amount</span>
                  <div className="bank-field-control">
                    <input
                      name="trx_amount_field"
                      type="number"
                      step="0.01"
                      className="bank-form-input"
                      value={formAmount}
                      onChange={(e) => setFormAmount(e.target.value)}
                      required
                      placeholder="e.g. -45.50 or 1200.00"
                    />
                  </div>
                  <p className="bank-field-hint">
                    Use negative values for expenses
                  </p>
                </div>
              </div>

              {/* Medium: native select with label + data-testid */}
              <div className="bank-form-group">
                <label htmlFor="trx-category" className="bank-form-label">
                  Category
                </label>
                <select
                  id="trx-category"
                  className="bank-form-input"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  data-testid="trx-category-select"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bank-modal-footer">
                <button
                  type="button"
                  className="bank-modal-cancel-btn"
                  onClick={closeModal}
                  data-testid="modal-cancel-btn"
                >
                  Cancel
                </button>
                {/*
                 * Beginner: data-testid + aria-label with dynamic content
                 * Practice:
                 *   page.getByTestId('modal-submit-btn')
                 *   page.getByRole('button', { name: /Save changes to transaction/ })
                 */}
                <button
                  type="submit"
                  className="bank-modal-submit-btn"
                  data-testid="modal-submit-btn"
                  aria-label={
                    modalMode === "add"
                      ? "Save new transaction"
                      : `Save changes to transaction ${editingTrx?.id}`
                  }
                >
                  {modalMode === "add" ? "Add Transaction" : "Save Changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}
