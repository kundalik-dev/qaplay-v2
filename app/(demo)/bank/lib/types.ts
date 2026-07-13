// ─── Core Entity Types ──────────────────────────────────────────────────────

export type AccountType = "Checking" | "Savings" | "Credit";

export interface Account {
  id: string; // e.g. "acc-checking-1"
  name: string; // e.g. "Everyday Checking"
  type: AccountType;
  accountNumber: string; // masked, e.g. "****4321"
  balance: number;
  isOverdrawn?: boolean;
}

export type TransactionType = "credit" | "debit";

export interface Transaction {
  id: string; // e.g. "txn-1001"
  accountId: string;
  date: string; // ISO date string "YYYY-MM-DD"
  description: string;
  category: string;
  amount: number; // positive = credit, negative = debit
  type: TransactionType;
  runningBalance?: number;
}

export interface Payee {
  id: string; // e.g. "payee-001"
  name: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

export interface Biller {
  id: string; // e.g. "biller-001"
  name: string;
  referenceNumber: string;
}

export interface Notification {
  id: string; // e.g. "notif-001"
  type: "info" | "success" | "warning";
  title: string;
  body: string;
  timestamp: string; // ISO string
  isRead: boolean;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
}

export interface UserRecord {
  username: string;
  password: string;
  role: "standard" | "admin";
  status: "active" | "locked" | "frozen";
  profile: UserProfile;
  /** artificial delay in ms for "slow_user" */
  loadDelay?: number;
}

// ─── Result Types (for confirmation pages) ──────────────────────────────────

export interface TransferResult {
  refId: string;
  fromAccount: Account;
  toAccount: Account;
  amount: number;
  memo: string;
  date: string;
}

export interface SendResult {
  refId: string;
  fromAccount: Account;
  payee:
    | Payee
    | {
        name: string;
        accountNumber: string;
        routingNumber: string;
        bankName: string;
      };
  amount: number;
  note: string;
  date: string;
}

export interface BillPayResult {
  refId: string;
  fromAccount: Account;
  biller: Biller | { name: string; referenceNumber: string };
  amount: number;
  paymentDate: string;
  memo: string;
}

// ─── Loan Application ────────────────────────────────────────────────────────

export type LoanType = "Personal" | "Auto" | "Home" | "Student";

export interface LoanApplication {
  id: string; // e.g. "loan-1"
  refId: string; // e.g. "LOAN-20260712-0042"
  loanType: LoanType;
  amount: number;
  termMonths: number;
  interestRate: number;
  purpose: string;
  disbursementAccount: Account;
  status: "pending" | "approved" | "closed" | "rejected";
  date: string; // ISO date string
  updatedAt?: string; // ISO date string
}

// ─── Store Shape ─────────────────────────────────────────────────────────────

export interface BankAppState {
  isSeeded: boolean;
  currentUsername: string | null;

  users: Record<string, UserRecord>;
  accounts: Record<string, Account[]>;
  transactions: Record<string, Transaction[]>;
  payees: Record<string, Payee[]>;
  billers: Record<string, Biller[]>;
  notifications: Record<string, Notification[]>;
  loanApplications: Record<string, LoanApplication[]>;

  lastTransferResult: TransferResult | null;
  lastSendResult: SendResult | null;
  lastBillPayResult: BillPayResult | null;
  lastLoanResult: LoanApplication | null;
}

export type TransactionCategory =
  | "Income"
  | "Groceries"
  | "Utilities"
  | "Shopping"
  | "Transport"
  | "Dining"
  | "Health"
  | "Entertainment"
  | "Transfer";
