"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BankAppState,
  Account,
  AccountType,
  Transaction,
  Payee,
  Biller,
  Notification,
  TransferResult,
  SendResult,
  BillPayResult,
  LoanApplication,
  LoanType,
  UserProfile,
} from "../lib/types";
import {
  SEED_USERS,
  SEED_PAYEES,
  SEED_BILLERS,
  createSeedAccounts,
  createSeedTransactions,
  createSeedNotifications,
  createSeedLoanApplications,
} from "../lib/seed-data";
import { generateRefId, generateTxnId, todayISO } from "../lib/utils";

// ─── Actions interface ────────────────────────────────────────────────────────

interface BankAppActions {
  /** Seed all users and their data on first app load. Idempotent. */
  seedIfNeeded: () => void;

  /** Attempt login. Returns error string or null on success. */
  login: (username: string, password: string) => string | null;

  /** Clear current session. */
  logout: () => void;

  /** Reset a user's data back to seed defaults. */
  resetUserData: (username: string) => void;

  /** Update user profile fields. */
  updateProfile: (username: string, patch: Partial<UserProfile>) => void;

  /** Change password. Returns error string or null on success. */
  changePassword: (
    username: string,
    currentPw: string,
    newPw: string,
    confirmPw: string,
  ) => string | null;

  /** Transfer between own accounts. Returns error string or null on success. */
  transfer: (
    username: string,
    fromAccountId: string,
    toAccountId: string,
    amount: number,
    memo: string,
    date: string,
  ) => string | null;

  /** Send money to external payee. Returns error string or null. */
  sendMoney: (
    username: string,
    fromAccountId: string,
    payee: Omit<Payee, "id">,
    amount: number,
    note: string,
    savePayee: boolean,
  ) => string | null;

  /** Pay a bill. Returns error string or null. */
  payBill: (
    username: string,
    fromAccountId: string,
    biller: Omit<Biller, "id">,
    amount: number,
    paymentDate: string,
    memo: string,
    saveBiller: boolean,
  ) => string | null;

  /** Apply for a loan. Returns error string or null on success. */
  applyLoan: (
    username: string,
    loanType: LoanType,
    amount: number,
    termMonths: number,
    purpose: string,
    disbursementAccountId: string,
  ) => string | null;

  /** Add a new account for a user. Returns the new account's id. */
  addAccount: (
    username: string,
    account: { name: string; type: AccountType; balance: number },
  ) => string;

  /** Update an existing account's fields. */
  updateAccount: (
    username: string,
    accountId: string,
    patch: Partial<Pick<Account, "name" | "type" | "balance">>,
  ) => void;

  /** Delete an account and its transactions. */
  deleteAccount: (username: string, accountId: string) => void;

  /** Save a new payee for a user. Returns the new payee's id. */
  savePayee: (username: string, payee: Omit<Payee, "id">) => string;

  /** Save a new biller for a user. Returns the new biller's id. */
  saveBiller: (username: string, biller: Omit<Biller, "id">) => string;

  /** Mark one notification as read. */
  markNotificationRead: (username: string, notifId: string) => void;

  /** Mark all notifications as read. */
  markAllNotificationsRead: (username: string) => void;

  /** Clear last action results (called when navigating away from confirmation). */
  clearLastResults: () => void;
}

// ─── Full store type ──────────────────────────────────────────────────────────

type BankStore = BankAppState & BankAppActions;

// ─── Store implementation ─────────────────────────────────────────────────────

export const useBankAppStore = create<BankStore>()(
  persist(
    (set, get) => ({
      // ── Initial state ────────────────────────────────────────────────
      isSeeded: false,
      currentUsername: null,
      users: {},
      accounts: {},
      transactions: {},
      payees: {},
      billers: {},
      notifications: {},
      loanApplications: {},
      lastTransferResult: null,
      lastSendResult: null,
      lastBillPayResult: null,
      lastLoanResult: null,

      // ── seedIfNeeded ─────────────────────────────────────────────────
      seedIfNeeded: () => {
        if (get().isSeeded) return;

        const accounts: Record<string, Account[]> = {};
        const transactions: Record<string, Transaction[]> = {};
        const payees: Record<string, Payee[]> = {};
        const billers: Record<string, Biller[]> = {};
        const notifications: Record<string, Notification[]> = {};
        const loanApplications: Record<string, LoanApplication[]> = {};

        for (const username of Object.keys(SEED_USERS)) {
          const userAccounts = createSeedAccounts(username);
          accounts[username] = userAccounts;

          const userTxns: Transaction[] = [];
          for (const acc of userAccounts) {
            userTxns.push(...createSeedTransactions(username, acc.id));
          }
          transactions[username] = userTxns;

          payees[username] = [...SEED_PAYEES];
          billers[username] = [...SEED_BILLERS];
          notifications[username] = createSeedNotifications(username);
          loanApplications[username] = createSeedLoanApplications(
            username,
            userAccounts,
          );
        }

        set({
          isSeeded: true,
          users: { ...SEED_USERS },
          accounts,
          transactions,
          payees,
          billers,
          notifications,
          loanApplications,
        });
      },

      // ── login ────────────────────────────────────────────────────────
      login: (username, password) => {
        const state = get();
        const user = state.users[username];

        if (!user) {
          return "The username or password you entered is incorrect.";
        }
        if (user.password !== password) {
          return "The username or password you entered is incorrect.";
        }
        if (user.status === "locked") {
          return "Your account has been suspended. Please contact support.";
        }

        set({ currentUsername: username });
        return null;
      },

      // ── logout ───────────────────────────────────────────────────────
      logout: () => {
        set({
          currentUsername: null,
          lastTransferResult: null,
          lastSendResult: null,
          lastBillPayResult: null,
        });
      },

      // ── resetUserData ────────────────────────────────────────────────
      resetUserData: (username) => {
        const userAccounts = createSeedAccounts(username);
        const userTxns: Transaction[] = [];
        for (const acc of userAccounts) {
          userTxns.push(...createSeedTransactions(username, acc.id));
        }

        set((state) => ({
          accounts: { ...state.accounts, [username]: userAccounts },
          transactions: { ...state.transactions, [username]: userTxns },
          payees: { ...state.payees, [username]: [...SEED_PAYEES] },
          billers: { ...state.billers, [username]: [...SEED_BILLERS] },
          notifications: {
            ...state.notifications,
            [username]: createSeedNotifications(username),
          },
          loanApplications: {
            ...state.loanApplications,
            [username]: createSeedLoanApplications(username, userAccounts),
          },
        }));
      },

      // ── updateProfile ────────────────────────────────────────────────
      updateProfile: (username, patch) => {
        set((state) => ({
          users: {
            ...state.users,
            [username]: {
              ...state.users[username],
              profile: { ...state.users[username].profile, ...patch },
            },
          },
        }));
      },

      // ── changePassword ───────────────────────────────────────────────
      changePassword: (username, currentPw, newPw, confirmPw) => {
        const state = get();
        const user = state.users[username];
        if (!user) return "User not found.";
        if (user.password !== currentPw)
          return "Current password is incorrect.";
        if (newPw.length < 8)
          return "New password must be at least 8 characters.";
        if (newPw !== confirmPw) return "New passwords do not match.";

        set((s) => ({
          users: {
            ...s.users,
            [username]: { ...s.users[username], password: newPw },
          },
        }));
        return null;
      },

      // ── transfer ─────────────────────────────────────────────────────
      transfer: (username, fromAccountId, toAccountId, amount, memo, date) => {
        const state = get();
        const userAccounts = state.accounts[username] ?? [];
        const fromAcc = userAccounts.find((a) => a.id === fromAccountId);
        const toAcc = userAccounts.find((a) => a.id === toAccountId);

        if (!fromAcc || !toAcc) return "Account not found.";
        if (fromAccountId === toAccountId)
          return "From and To accounts must be different.";
        if (amount <= 0) return "Please enter a valid amount.";
        if (fromAcc.balance < amount)
          return `Insufficient funds. Available balance: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(fromAcc.balance)}.`;

        const refId = generateRefId("TXN");
        const userTxns = state.transactions[username] ?? [];
        const debitTxn: Transaction = {
          id: generateTxnId(userTxns.length),
          accountId: fromAccountId,
          date,
          description: `Transfer to ${toAcc.name}${memo ? ` — ${memo}` : ""}`,
          category: "Transfer",
          amount: -amount,
          type: "debit",
        };
        const creditTxn: Transaction = {
          id: generateTxnId(userTxns.length + 1),
          accountId: toAccountId,
          date,
          description: `Transfer from ${fromAcc.name}${memo ? ` — ${memo}` : ""}`,
          category: "Transfer",
          amount,
          type: "credit",
        };

        const updatedAccounts = userAccounts.map((a) => {
          if (a.id === fromAccountId)
            return {
              ...a,
              balance: a.balance - amount,
              isOverdrawn: a.balance - amount < 0,
            };
          if (a.id === toAccountId)
            return { ...a, balance: a.balance + amount };
          return a;
        });

        const result: TransferResult = {
          refId,
          fromAccount: fromAcc,
          toAccount: toAcc,
          amount,
          memo,
          date,
        };

        set((s) => ({
          accounts: { ...s.accounts, [username]: updatedAccounts },
          transactions: {
            ...s.transactions,
            [username]: [debitTxn, creditTxn, ...userTxns],
          },
          lastTransferResult: result,
        }));
        return null;
      },

      // ── sendMoney ─────────────────────────────────────────────────────
      sendMoney: (
        username,
        fromAccountId,
        payee,
        amount,
        note,
        savePayeeFlag,
      ) => {
        const state = get();
        const userAccounts = state.accounts[username] ?? [];
        const fromAcc = userAccounts.find((a) => a.id === fromAccountId);

        if (!fromAcc) return "Account not found.";
        if (amount <= 0) return "Please enter a valid amount.";
        if (fromAcc.balance < amount)
          return `Insufficient funds. Available balance: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(fromAcc.balance)}.`;

        const refId = generateRefId("SND");
        const userTxns = state.transactions[username] ?? [];
        const debitTxn: Transaction = {
          id: generateTxnId(userTxns.length),
          accountId: fromAccountId,
          date: todayISO(),
          description: `Send Money — ${payee.name}${note ? ` (${note})` : ""}`,
          category: "Transfer",
          amount: -amount,
          type: "debit",
        };

        const updatedAccounts = userAccounts.map((a) =>
          a.id === fromAccountId
            ? {
                ...a,
                balance: a.balance - amount,
                isOverdrawn: a.balance - amount < 0,
              }
            : a,
        );

        const newPayee: Payee = { ...payee, id: `payee-${Date.now()}` };
        const existingPayees = state.payees[username] ?? [];
        const updatedPayees = savePayeeFlag
          ? [...existingPayees, newPayee]
          : existingPayees;

        const result: SendResult = {
          refId,
          fromAccount: fromAcc,
          payee,
          amount,
          note,
          date: todayISO(),
        };

        set((s) => ({
          accounts: { ...s.accounts, [username]: updatedAccounts },
          transactions: {
            ...s.transactions,
            [username]: [debitTxn, ...userTxns],
          },
          payees: { ...s.payees, [username]: updatedPayees },
          lastSendResult: result,
        }));
        return null;
      },

      // ── payBill ───────────────────────────────────────────────────────
      payBill: (
        username,
        fromAccountId,
        biller,
        amount,
        paymentDate,
        memo,
        saveBillerFlag,
      ) => {
        const state = get();
        const userAccounts = state.accounts[username] ?? [];
        const fromAcc = userAccounts.find((a) => a.id === fromAccountId);

        if (!fromAcc) return "Account not found.";
        if (amount <= 0) return "Please enter a valid amount.";
        if (fromAcc.balance < amount)
          return `Insufficient funds. Available balance: ${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(fromAcc.balance)}.`;
        if (paymentDate < todayISO())
          return "Payment date cannot be in the past.";

        const refId = generateRefId("BILL");
        const userTxns = state.transactions[username] ?? [];
        const isToday = paymentDate === todayISO();
        const debitTxn: Transaction = {
          id: generateTxnId(userTxns.length),
          accountId: fromAccountId,
          date: paymentDate,
          description: `Bill Pay — ${biller.name}${memo ? ` (${memo})` : ""}`,
          category: "Utilities",
          amount: -amount,
          type: "debit",
        };

        const updatedAccounts = isToday
          ? userAccounts.map((a) =>
              a.id === fromAccountId
                ? {
                    ...a,
                    balance: a.balance - amount,
                    isOverdrawn: a.balance - amount < 0,
                  }
                : a,
            )
          : userAccounts;

        const newBiller: Biller = { ...biller, id: `biller-${Date.now()}` };
        const existingBillers = state.billers[username] ?? [];
        const updatedBillers = saveBillerFlag
          ? [...existingBillers, newBiller]
          : existingBillers;

        const result: BillPayResult = {
          refId,
          fromAccount: fromAcc,
          biller,
          amount,
          paymentDate,
          memo,
        };

        set((s) => ({
          accounts: { ...s.accounts, [username]: updatedAccounts },
          transactions: {
            ...s.transactions,
            [username]: isToday ? [debitTxn, ...userTxns] : userTxns,
          },
          billers: { ...s.billers, [username]: updatedBillers },
          lastBillPayResult: result,
        }));
        return null;
      },

      // ── applyLoan ────────────────────────────────────────────────────
      applyLoan: (
        username,
        loanType,
        amount,
        termMonths,
        purpose,
        disbursementAccountId,
      ) => {
        const state = get();
        const userAccounts = state.accounts[username] ?? [];
        const disbursementAccount = userAccounts.find(
          (a) => a.id === disbursementAccountId,
        );

        if (!disbursementAccount) return "Please select a valid account.";
        if (amount <= 0) return "Please enter a valid loan amount.";
        if (amount > 250000) return "Loan amount cannot exceed $250,000.";
        if (!purpose.trim()) return "Please describe the purpose of the loan.";

        const refId = generateRefId("LOAN");
        const existing = state.loanApplications[username] ?? [];
        const application: LoanApplication = {
          id: `loan-${existing.length + 1}`,
          refId,
          loanType,
          amount,
          termMonths,
          purpose,
          disbursementAccount,
          status: "pending",
          date: todayISO(),
        };

        set((s) => ({
          loanApplications: {
            ...s.loanApplications,
            [username]: [application, ...existing],
          },
          lastLoanResult: application,
        }));
        return null;
      },

      // ── addAccount ───────────────────────────────────────────────────
      addAccount: (username, account) => {
        const state = get();
        const existing = state.accounts[username] ?? [];
        const id = `acc-${account.type.toLowerCase()}-${Date.now()}`;
        const last4 = String(Math.floor(1000 + Math.random() * 9000));
        const newAccount: Account = {
          id,
          name: account.name,
          type: account.type,
          accountNumber: `****${last4}`,
          balance: account.balance,
          isOverdrawn: account.balance < 0,
        };

        set((s) => ({
          accounts: { ...s.accounts, [username]: [...existing, newAccount] },
        }));
        return id;
      },

      // ── updateAccount ────────────────────────────────────────────────
      updateAccount: (username, accountId, patch) => {
        set((s) => ({
          accounts: {
            ...s.accounts,
            [username]: (s.accounts[username] ?? []).map((a) =>
              a.id === accountId
                ? {
                    ...a,
                    ...patch,
                    isOverdrawn:
                      patch.balance !== undefined
                        ? patch.balance < 0
                        : a.isOverdrawn,
                  }
                : a,
            ),
          },
        }));
      },

      // ── deleteAccount ────────────────────────────────────────────────
      deleteAccount: (username, accountId) => {
        set((s) => ({
          accounts: {
            ...s.accounts,
            [username]: (s.accounts[username] ?? []).filter(
              (a) => a.id !== accountId,
            ),
          },
          transactions: {
            ...s.transactions,
            [username]: (s.transactions[username] ?? []).filter(
              (t) => t.accountId !== accountId,
            ),
          },
        }));
      },

      // ── savePayee ─────────────────────────────────────────────────────
      savePayee: (username, payee) => {
        const newPayee: Payee = { ...payee, id: `payee-${Date.now()}` };
        set((s) => ({
          payees: {
            ...s.payees,
            [username]: [...(s.payees[username] ?? []), newPayee],
          },
        }));
      },

      // ── saveBiller ────────────────────────────────────────────────────
      saveBiller: (username, biller) => {
        const newBiller: Biller = { ...biller, id: `biller-${Date.now()}` };
        set((s) => ({
          billers: {
            ...s.billers,
            [username]: [...(s.billers[username] ?? []), newBiller],
          },
        }));
        return newBiller.id;
      },

      // ── markNotificationRead ──────────────────────────────────────────
      markNotificationRead: (username, notifId) => {
        set((s) => ({
          notifications: {
            ...s.notifications,
            [username]: (s.notifications[username] ?? []).map((n) =>
              n.id === notifId ? { ...n, isRead: true } : n,
            ),
          },
        }));
      },

      // ── markAllNotificationsRead ──────────────────────────────────────
      markAllNotificationsRead: (username) => {
        set((s) => ({
          notifications: {
            ...s.notifications,
            [username]: (s.notifications[username] ?? []).map((n) => ({
              ...n,
              isRead: true,
            })),
          },
        }));
      },

      // ── clearLastResults ──────────────────────────────────────────────
      clearLastResults: () => {
        set({
          lastTransferResult: null,
          lastSendResult: null,
          lastBillPayResult: null,
          lastLoanResult: null,
        });
      },
    }),
    {
      // localStorage key — bumped whenever seed data / store shape changes so
      // existing sessions pick up new seed data instead of using stale state.
      name: "bank-app-v3",
    },
  ),
);

// ─── Convenience selectors ────────────────────────────────────────────────────

// Shared stable reference so selectors that fall back to "no data yet" don't
// return a brand-new array identity on every call — a fresh `[] ?? []`
// literal on each render trips React's "getSnapshot should be cached" check
// and can cascade into a "Maximum update depth exceeded" crash.
const EMPTY_ARRAY: readonly unknown[] = [];
function emptyArray<T>(): T[] {
  return EMPTY_ARRAY as T[];
}

export function useCurrentUser() {
  return useBankAppStore((s) => {
    if (!s.currentUsername) return null;
    return s.users[s.currentUsername] ?? null;
  });
}

export function useUserAccounts(username: string | null) {
  return useBankAppStore((s) =>
    username ? (s.accounts[username] ?? emptyArray<Account>()) : emptyArray<Account>(),
  );
}

export function useUserTransactions(username: string | null) {
  return useBankAppStore((s) =>
    username
      ? (s.transactions[username] ?? emptyArray<Transaction>())
      : emptyArray<Transaction>(),
  );
}

export function useUserLoanApplications(username: string | null) {
  return useBankAppStore((s) =>
    username
      ? (s.loanApplications[username] ?? emptyArray<LoanApplication>())
      : emptyArray<LoanApplication>(),
  );
}

export function useUserBillers(username: string | null) {
  return useBankAppStore((s) =>
    username ? (s.billers[username] ?? emptyArray<Biller>()) : emptyArray<Biller>(),
  );
}

export function useUserPayees(username: string | null) {
  return useBankAppStore((s) =>
    username ? (s.payees[username] ?? emptyArray<Payee>()) : emptyArray<Payee>(),
  );
}

export function useUserNotifications(username: string | null) {
  return useBankAppStore((s) =>
    username
      ? (s.notifications[username] ?? emptyArray<Notification>())
      : emptyArray<Notification>(),
  );
}

export function useUnreadNotificationCount(username: string | null) {
  return useBankAppStore((s) =>
    username
      ? (s.notifications[username] ?? emptyArray<Notification>()).filter(
          (n) => !n.isRead,
        ).length
      : 0,
  );
}
