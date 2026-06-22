"use client";

import React, { useState, useMemo } from 'react';
import { useBankStore, Transaction } from '../store/useBankStore';
import styles from '../styles/Bank.module.css';

export default function DashboardPage() {
  const { balance, transactions, deleteTransaction } = useBankStore();
  const [sortField, setSortField] = useState<'date' | 'amount' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [isComboOpen, setIsComboOpen] = useState(false);

  const categories = ['All', 'Income', 'Groceries', 'Utilities', 'Shopping', 'Transport', 'Dining', 'Health'];

  // Dummy Export Functions
  const handleExportExcel = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "ID,Date,Description,Amount,Category\n"
      + transactions.map(t => `${t.id},${t.date},${t.description},${t.amount},${t.category}`).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPdf = () => {
    // Just a dummy action for automation clicking practice
    alert("PDF Exported!");
  };

  const handleDelete = (index: number, transaction: Transaction) => {
    // P1 Bug: If category is Utilities, delete the wrong transaction (index - 1)
    if (transaction.category === 'Utilities') {
      const wrongIndex = Math.max(0, index - 1);
      const wrongTrx = sortedAndFilteredTransactions[wrongIndex];
      deleteTransaction(wrongTrx.id);
    } else {
      deleteTransaction(transaction.id);
    }
  };

  const sortedAndFilteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (categoryFilter !== 'All') {
      result = result.filter(t => t.category === categoryFilter);
    }

    if (sortField) {
      result.sort((a, b) => {
        if (sortField === 'amount') {
          // P2 Bug: Sorting amounts alphabetically instead of numerically
          const valA = String(a.amount);
          const valB = String(b.amount);
          if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
          if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        } else {
          // Date sort works correctly
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
      });
    }
    return result;
  }, [transactions, sortField, sortOrder, categoryFilter]);

  const toggleSort = (field: 'date' | 'amount') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div>
      <div className={styles.balanceCard} data-testid="balance-card">
        <div>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--muted-foreground)' }}>Total Balance</h2>
          <div className={styles.balanceAmount} data-testid="account-balance">
            ${balance.toFixed(2)}
          </div>
        </div>
        <div className={styles.exportGroup}>
          {/* P3 Bug: Typo in the tooltip/aria-label */}
          <button 
            className={styles.exportBtn} 
            onClick={handleExportExcel}
            aria-label="Export to Excl" 
            data-testid="export-excel-btn"
          >
            Excel
          </button>
          <button 
            className={styles.exportBtn} 
            onClick={handleExportPdf}
            data-testid="export-pdf-btn"
          >
            PDF
          </button>
        </div>
      </div>

      <div className={styles.actionRow}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600 }}>Recent Transactions</h3>
        
        <div className={styles.filterGroup}>
          <span style={{ fontSize: '0.875rem' }}>Category:</span>
          {/* Challenge Locator: Custom Combobox instead of native select */}
          <div className={styles.comboboxWrapper} data-testid="category-filter-combobox">
            <button 
              className={styles.comboboxTrigger} 
              onClick={() => setIsComboOpen(!isComboOpen)}
              aria-haspopup="listbox" 
              aria-expanded={isComboOpen}
            >
              {categoryFilter}
            </button>
            {isComboOpen && (
              <ul className={styles.comboboxList} role="listbox">
                {categories.map(cat => (
                  <li 
                    key={cat}
                    role="option"
                    aria-selected={categoryFilter === cat}
                    className={styles.comboboxOption}
                    onClick={() => { setCategoryFilter(cat); setIsComboOpen(false); }}
                    data-category-id={`cat-${cat.toLowerCase()}`}
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div className={styles.transactionTableWrapper}>
        <table className={styles.transactionTable} data-testid="transactions-table">
          <thead>
            <tr>
              <th>ID</th>
              <th 
                style={{ cursor: 'pointer' }} 
                onClick={() => toggleSort('date')}
                data-testid="sort-date-header"
              >
                Date {sortField === 'date' && (sortOrder === 'asc' ? '↑' : '↓')}
              </th>
              <th>Description</th>
              <th>Category</th>
              <th 
                style={{ cursor: 'pointer' }} 
                onClick={() => toggleSort('amount')}
                data-testid="sort-amount-header"
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
                className={styles.transactionRow}
                data-transaction-id={trx.id} 
                data-category={trx.category}
              >
                <td>{trx.id}</td>
                <td>{trx.date}</td>
                <td>{trx.description}</td>
                <td>{trx.category}</td>
                <td style={{ color: trx.amount < 0 ? 'inherit' : 'green' }}>
                  {trx.amount > 0 ? '+' : ''}{trx.amount.toFixed(2)}
                </td>
                <td>
                  {/* Medium/Hard Locator: Intentionally omitting data-testid on some buttons to force ancestor/sibling XPath usage */}
                  <button 
                    className={styles.deleteBtn}
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
                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>No transactions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
