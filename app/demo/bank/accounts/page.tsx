"use client";

import React, { useState } from "react";
import { useBankStore, BankAccount } from "../store/useBankStore";
import "../styles/bank.css";

export default function AccountsPage() {
  const { accounts, addAccount } = useBankStore();
  const [name, setName] = useState("");
  const [type, setType] = useState<"Checking" | "Savings" | "Credit">(
    "Checking",
  );
  const [balance, setBalance] = useState("");

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !balance) return;

    const newAccount: BankAccount = {
      id: `acc-${Date.now()}`,
      name,
      type,
      balance: parseFloat(balance),
      accountNumber: "**** " + Math.floor(1000 + Math.random() * 9000),
    };

    addAccount(newAccount);

    // Reset form
    setName("");
    setBalance("");
    setType("Checking");
  };

  return (
    <div data-testid="bank-accounts-page">
      <h1 className="bank-page-title" data-testid="accounts-title">
        My Accounts
      </h1>
      <p className="bank-page-subtitle">
        Manage your bank accounts and create new ones.
      </p>

      <div className="bank-action-row">
        <h2 className="bank-section-title">Open New Account</h2>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid #e5e7eb",
          marginBottom: "2.5rem",
          boxShadow: "0 1px 4px rgba(0,0,0,0.02)",
        }}
      >
        <form onSubmit={handleCreateAccount} data-testid="create-account-form">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
              marginBottom: "1.5rem",
            }}
          >
            <div className="bank-form-group" style={{ marginBottom: 0 }}>
              <label className="bank-form-label">Account Name</label>
              <input
                type="text"
                className="bank-form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vacation Fund"
                required
                data-testid="account-name-input"
              />
            </div>
            <div className="bank-form-group" style={{ marginBottom: 0 }}>
              <label className="bank-form-label">Account Type</label>
              <select
                className="bank-form-input"
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "Checking" | "Savings" | "Credit")
                }
                data-testid="account-type-select"
              >
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
                <option value="Credit">Credit</option>
              </select>
            </div>
            <div className="bank-form-group" style={{ marginBottom: 0 }}>
              <label className="bank-form-label">Initial Balance ($)</label>
              <input
                type="number"
                className="bank-form-input"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                placeholder="0.00"
                step="0.01"
                required
                data-testid="account-balance-input"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bank-login-btn"
            style={{
              width: "auto",
              padding: "0.75rem 2.5rem",
              marginBottom: 0,
            }}
            data-testid="create-account-btn"
          >
            Create Account
          </button>
        </form>
      </div>

      <div className="bank-action-row">
        <h2 className="bank-section-title">Existing Accounts</h2>
      </div>

      <div className="bank-table-wrapper" data-testid="accounts-table-wrapper">
        <table className="bank-table" data-testid="accounts-table">
          <thead>
            <tr>
              <th>Account Name</th>
              <th>Account Number</th>
              <th>Type</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            {(accounts || []).map((acc) => (
              <tr key={acc.id} data-testid={`account-row-${acc.id}`}>
                <td style={{ fontWeight: 600, color: "#1e1b4b" }}>
                  {acc.name}
                </td>
                <td style={{ fontFamily: "monospace", color: "#6b7280" }}>
                  {acc.accountNumber}
                </td>
                <td>
                  <span
                    className="bank-badge"
                    style={{
                      background:
                        acc.type === "Checking"
                          ? "#7C3AED"
                          : acc.type === "Savings"
                            ? "#059669"
                            : "#dc2626",
                    }}
                  >
                    {acc.type}
                  </span>
                </td>
                <td
                  className={
                    acc.balance >= 0
                      ? "bank-amount-positive"
                      : "bank-amount-negative"
                  }
                  style={{ fontSize: "1rem" }}
                >
                  ${acc.balance.toFixed(2)}
                </td>
              </tr>
            ))}
            {(!accounts || accounts.length === 0) && (
              <tr>
                <td colSpan={4} className="bank-table-empty">
                  No accounts found. Create one above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
