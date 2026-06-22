"use client";

import React, { useState, useMemo } from 'react';
import { useBankStore, Transaction } from '../store/useBankStore';
import '../styles/bank.css';

export default function DashboardPage() {
  const { balance, transactions, deleteTransaction, user } = useBankStore();
  const [sortField, setSortField]       = useState<'date' | 'amount' | null>(null);
  const [sortOrder, setSortOrder]       = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isComboOpen, setIsComboOpen]   = useState(false);

  const categories = ['All', 'Income', 'Groceries', 'Utilities', 'Shopping', 'Transport', 'Dining', 'Health'];

  /* ── Derived stats ──────────────────────────────────────────── */
  const totalIncome  = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalExpense = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + t.amount, 0);

  /* ── Export helpers ─────────────────────────────────────────── */
  const handleExportExcel = () => {
    const csv =
      'data:text/csv;charset=utf-8,' +
      'ID,Date,Description,Amount,Category\n' +
      transactions.map((t) => `${t.id},${t.date},${t.description},${t.amount},${t.category}`).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csv));
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = () => {
    alert('PDF Exported!');
  };

  /* ── Sort + filter ──────────────────────────────────────────── */
  const sortedAndFilteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (categoryFilter !== 'All') {
      result = result.filter((t) => t.category === categoryFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        if (sortField === 'amount') {
          // P2 Bug: sorting amounts as strings (alphabetically) instead of numerically
          const valA = String(a.amount);
          const valB = String(b.amount);
          if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
          if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        }
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
      });
    }
    return result;
  }, [transactions, sortField, sortOrder, categoryFilter]);

  /* ── Delete (P1 bug preserved) ──────────────────────────────── */
  const handleDelete = (index: number, transaction: Transaction) => {
    if (transaction.category === 'Utilities') {
      const wrongIndex = Math.max(0, index - 1);
      const wrongTrx   = sortedAndFilteredTransactions[wrongIndex];
      deleteTransaction(wrongTrx.id);
    } else {
      deleteTransaction(transaction.id);
    }
  };

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div data-testid="bank-dashboard">

      {/* Page heading */}
      <h1 className="bank-page-title" data-testid="dashboard-title">Dashboard</h1>
      <p className="bank-page-subtitle">
        Welcome back, <strong>{user?.username ?? 'User'}</strong>. Here&apos;s your financial overview.
      </p>

      {/* Balance card */}
      <div className="bank-balance-card" data-testid="balance-card">
        <div>
          <p className="bank-balance-label">Total Balance</p>
          <div className="bank-balance-amount" data-testid="account-balance">
            ${balance.toFixed(2)}
          </div>
          <p className="bank-balance-account">Primary Checking · **** 4821</p>
        </div>
        <div className="bank-export-group">
          {/* P3 Bug: Typo in aria-label */}
          <button
            type="button"
            className="bank-export-btn"
            onClick={handleExportExcel}
            aria-label="Export to Excl"
            data-testid="export-excel-btn"
          >
            Export Excel
          </button>
          <button
            type="button"
            className="bank-export-btn"
            onClick={handleExportPdf}
            data-testid="export-pdf-btn"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="bank-stats-row" data-testid="stats-row">
        <div className="bank-stat-card" data-testid="stat-income">
          <p className="bank-stat-label">Total Income</p>
          <p className="bank-stat-value income" data-testid="stat-income-value">
            +${totalIncome.toFixed(2)}
          </p>
        </div>
        <div className="bank-stat-card" data-testid="stat-expenses">
          <p className="bank-stat-label">Total Expenses</p>
          <p className="bank-stat-value expense" data-testid="stat-expense-value">
            ${totalExpense.toFixed(2)}
          </p>
        </div>
        <div className="bank-stat-card" data-testid="stat-transactions">
          <p className="bank-stat-label">Transactions</p>
          <p className="bank-stat-value" data-testid="stat-transaction-count">
            {transactions.length}
          </p>
        </div>
      </div>

      {/* Action row */}
      <div className="bank-action-row">
        <h2 className="bank-section-title">Recent Transactions</h2>

        <div className="bank-filter-group">
          <span className="bank-filter-label">Category:</span>
          {/* Challenge Locator: Custom Combobox */}
          <div className="bank-combobox-wrapper" data-testid="category-filter-combobox">
            <button
              type="button"
              className="bank-combobox-trigger"
              onClick={() => setIsComboOpen(!isComboOpen)}
              aria-haspopup="listbox"
              aria-expanded={isComboOpen}
              data-testid="combobox-trigger"
            >
              {categoryFilter}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
            </button>
            {isComboOpen && (
              <ul className="bank-combobox-list" role="listbox" data-testid="combobox-list">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    role="option"
                    aria-selected={categoryFilter === cat}
                    className="bank-combobox-option"
                    onClick={() => { setCategoryFilter(cat); setIsComboOpen(false); }}
                    data-category-id={`cat-${cat.toLowerCase()}`}
                    data-testid={`combobox-option-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Transaction table */}
      <div className="bank-table-wrapper" data-testid="transaction-table-wrapper">
        <table className="bank-table" data-testid="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th
                className="sortable"
                onClick={() => toggleSort('date')}
                data-testid="sort-date-header"
                aria-sort={sortField === 'date' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Description</th>
              <th>Category</th>
              <th
                className="sortable"
                onClick={() => toggleSort('amount')}
                data-testid="sort-amount-header"
                aria-sort={sortField === 'amount' ? (sortOrder === 'asc' ? 'ascending' : 'descending') : 'none'}
              >
                Amount {sortField === 'amount' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedAndFilteredTransactions.map((trx, index) => (
              <tr
                key={trx.id}
                data-transaction-id={trx.id}
                data-category={trx.category}
                data-testid={`transaction-row-${trx.id}`}
              >
                <td>{trx.id}</td>
                <td>{trx.date}</td>
                <td>{trx.description}</td>
                <td>{trx.category}</td>
                <td className={trx.amount > 0 ? 'bank-amount-positive' : 'bank-amount-negative'}>
                  {trx.amount > 0 ? '+' : ''}{trx.amount.toFixed(2)}
                </td>
                <td>
                  {/* Medium/Hard Locator: no data-testid — use aria-label or ancestor XPath */}
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
            {sortedAndFilteredTransactions.length === 0 && (
              <tr>
                <td colSpan={6} className="bank-table-empty">No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
