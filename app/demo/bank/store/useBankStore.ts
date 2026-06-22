import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Transaction = {
  id: string; // e.g. "trx-1001"
  date: string;
  description: string;
  amount: number;
  category: string;
};

interface BankState {
  balance: number;
  transactions: Transaction[];
  version: string | null;
  isLoggedIn: boolean;
  user: { name: string; username: string; role: string } | null;

  // Actions
  login: (username: string, role: string) => void;
  logout: () => void;
  setVersionAndData: (version: string, balance: number, transactions: Transaction[]) => void;
  deleteTransaction: (id: string) => void; // P1 intentional bug will be inside the component calling this, or here. Let's put it in the component to easily see it.
  addTransaction: (trx: Transaction) => void;
}

export const useBankStore = create<BankState>()(
  persist(
    (set, get) => ({
      balance: 0,
      transactions: [],
      version: null,
      isLoggedIn: false,
      user: null,

      login: (username, role) => set({
        isLoggedIn: true,
        user: { name: username === 'admin' ? 'Admin User' : 'Viewer', username, role },
      }),

      logout: () => set({ isLoggedIn: false, user: null }),

      setVersionAndData: (version, balance, transactions) => set({
        version,
        balance,
        transactions
      }),

      // Bug P1 logic: The component will pass the wrong ID to this function. 
      // But we just need a standard delete here.
      deleteTransaction: (id) => set((state) => {
        const newTransactions = state.transactions.filter(t => t.id !== id);
        // Recalculate balance for realism
        const newBalance = newTransactions.reduce((acc, t) => acc + t.amount, 0);
        return { transactions: newTransactions, balance: newBalance };
      }),

      addTransaction: (trx) => set((state) => ({
        transactions: [trx, ...state.transactions],
        balance: state.balance + trx.amount
      }))
    }),
    {
      name: 'qaplay-bank-storage', // unique name for localStorage key
    }
  )
);
