"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  BankAppState,
  Account,
  Transaction,
  Payee,
  Biller,
  Notification,
  TransferResult,
  SendResult,
  BillPayResult,
  UserProfile,
} from "../lib/types";
import {
  SEED_USERS,
  SEED_PAYEES,
  SEED_BILLERS,
  createSeedAccounts,
  createSeedTransactions,
  createSeedNotifications,
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

  /** Save a new payee for a user. */
  savePayee: (username: string, payee: Omit<Payee, "id">) => void;

  /** Save a new biller for a user. */
  saveBiller: (username: string, biller: Omit<Biller, "id">) => void;

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
      lastTransferResult: null,
      lastSendResult: null,
      lastBillPayResult: null,

      // ── seedIfNeeded ─────────────────────────────────────────────────
      seedIfNeeded: () => {
        if (get().isSeeded) return;

        const accounts: Record<string, Account[]> = {};
        const transactions: Record<string, Transaction[]> = {};
        const payees: Record<string, Payee[]> = {};
        const billers: Record<string, Biller[]> = {};
        const notifications: Record<string, Notification[]> = {};

        for (const username of Object.keys(SEED_USERS)) {
          const userAccounts = createSeedAccounts(username);
          accounts[username] = userAccounts;

          const userTxns: Transaction[] = [];
          for (const acc of userAccounts) {
            userTxns.push(...createSeedTransactions(username, acc.id));
          }
          transactions[username] = userTxns;

          payees[username] = username === "standard_user" ? [...SEED_PAYEES] : [];
          billers[username] = [...SEED_BILLERS];
          notifications[username] = createSeedNotifications(username);
        }

        set({
          isSeeded: true,
          users: { ...SEED_USERS },
          accounts,
          transactions,
          payees,
          billers,
          notifications,
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
          payees: {
            ...state.payees,
            [username]: username === "standard_user" ? [...SEED_PAYEES] : [],
          },
          billers: { ...state.billers, [username]: [...SEED_BILLERS] },
          notifications: {
            ...state.notifications,
            [username]: createSeedNotifications(username),
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
        if (newPw !== confirmPw)
          return "New passwords do not match.";

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
            return { ...a, balance: a.balance - amount, isOverdrawn: a.balance - amount < 0 };
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
      sendMoney: (username, fromAccountId, payee, amount, note, savePayeeFlag) => {
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
            ? { ...a, balance: a.balance - amount, isOverdrawn: a.balance - amount < 0 }
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
      payBill: (username, fromAccountId, biller, amount, paymentDate, memo, saveBillerFlag) => {
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
                ? { ...a, balance: a.balance - amount, isOverdrawn: a.balance - amount < 0 }
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
        });
      },
    }),
    {
      name: "bank-app-v1", // localStorage key — different from demo/bank's "qaplay-bank-storage"
    },
  ),
);

// ─── Convenience selectors ────────────────────────────────────────────────────

export function useCurrentUser() {
  return useBankAppStore((s) => {
    if (!s.currentUsername) return null;
    return s.users[s.currentUsername] ?? null;
  });
}

export function useUserAccounts(username: string | null) {
  return useBankAppStore((s) =>
    username ? (s.accounts[username] ?? []) : [],
  );
}

export function useUserTransactions(username: string | null) {
  return useBankAppStore((s) =>
    username ? (s.transactions[username] ?? []) : [],
  );
}

export function useUnreadNotificationCount(username: string | null) {
  return useBankAppStore((s) =>
    username
      ? (s.notifications[username] ?? []).filter((n) => !n.isRead).length
      : 0,
  );
}
