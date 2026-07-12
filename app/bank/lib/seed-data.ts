import type {
  UserRecord,
  Account,
  Transaction,
  Payee,
  Biller,
  Notification,
  LoanApplication,
} from "./types";

// ─── Users ───────────────────────────────────────────────────────────────────

export const SEED_USERS: Record<string, UserRecord> = {
  standard_user: {
    username: "standard_user",
    password: "bank_sauce",
    role: "standard",
    status: "active",
    profile: {
      firstName: "Alex",
      lastName: "Morgan",
      email: "alex.morgan@example.com",
      phone: "(415) 555-0101",
      address: "123 Market Street, San Francisco, CA 94105",
    },
  },
  locked_user: {
    username: "locked_user",
    password: "bank_sauce",
    role: "standard",
    status: "locked",
    profile: {
      firstName: "Sam",
      lastName: "Taylor",
      email: "sam.taylor@example.com",
      phone: "(415) 555-0202",
      address: "456 Mission Street, San Francisco, CA 94103",
    },
  },
  frozen_user: {
    username: "frozen_user",
    password: "bank_sauce",
    role: "standard",
    status: "frozen",
    profile: {
      firstName: "Jordan",
      lastName: "Lee",
      email: "jordan.lee@example.com",
      phone: "(415) 555-0303",
      address: "789 Howard Street, San Francisco, CA 94103",
    },
  },
  overdraft_user: {
    username: "overdraft_user",
    password: "bank_sauce",
    role: "standard",
    status: "active",
    profile: {
      firstName: "Casey",
      lastName: "Rivera",
      email: "casey.rivera@example.com",
      phone: "(415) 555-0404",
      address: "321 Folsom Street, San Francisco, CA 94107",
    },
  },
  slow_user: {
    username: "slow_user",
    password: "bank_sauce",
    role: "standard",
    status: "active",
    loadDelay: 2500,
    profile: {
      firstName: "Morgan",
      lastName: "Chen",
      email: "morgan.chen@example.com",
      phone: "(415) 555-0505",
      address: "555 California Street, San Francisco, CA 94104",
    },
  },
  admin_user: {
    username: "admin_user",
    password: "admin_sauce",
    role: "admin",
    status: "active",
    profile: {
      firstName: "Admin",
      lastName: "User",
      email: "admin@securebank.example.com",
      phone: "(415) 555-0001",
      address: "1 SecureBank Plaza, San Francisco, CA 94111",
    },
  },
  // Intentional-bug practice user: the "Applied Loans" total on
  // app/bank/apply-loan miscalculates for this account only (see
  // createSeedLoanApplications' consumer in the apply-loan page, which
  // excludes the most recently added loan from the displayed total for
  // this username). Every other account computes the total correctly.
  error_user: {
    username: "error_user",
    password: "bank_sauce",
    role: "standard",
    status: "active",
    profile: {
      firstName: "Riley",
      lastName: "Nguyen",
      email: "riley.nguyen@example.com",
      phone: "(415) 555-0606",
      address: "88 Bryant Street, San Francisco, CA 94107",
    },
  },
};

// ─── Accounts ────────────────────────────────────────────────────────────────

export function createSeedAccounts(username: string): Account[] {
  if (username === "overdraft_user") {
    return [
      {
        id: "acc-checking-1",
        name: "Everyday Checking",
        type: "Checking",
        accountNumber: "****4321",
        balance: -342.18,
        isOverdrawn: true,
      },
      {
        id: "acc-savings-1",
        name: "Emergency Savings",
        type: "Savings",
        accountNumber: "****8765",
        balance: 1250.0,
      },
    ];
  }
  return [
    {
      id: "acc-checking-1",
      name: "Everyday Checking",
      type: "Checking",
      accountNumber: "****4321",
      balance: 4250.0,
    },
    {
      id: "acc-savings-1",
      name: "High-Yield Savings",
      type: "Savings",
      accountNumber: "****8765",
      balance: 12800.0,
    },
  ];
}

// ─── Transactions ─────────────────────────────────────────────────────────────

export function createSeedTransactions(
  username: string,
  accountId: string,
): Transaction[] {
  const isOverdraft = username === "overdraft_user";

  const checkingTxns: Omit<Transaction, "id" | "accountId">[] = [
    {
      date: "2026-06-22",
      description: "Direct Deposit — ACME Corp",
      category: "Income",
      amount: 3200.0,
      type: "credit",
    },
    {
      date: "2026-06-21",
      description: "Whole Foods Market",
      category: "Groceries",
      amount: -87.43,
      type: "debit",
    },
    {
      date: "2026-06-20",
      description: "City Electric Co.",
      category: "Utilities",
      amount: -124.5,
      type: "debit",
    },
    {
      date: "2026-06-19",
      description: "Amazon.com",
      category: "Shopping",
      amount: -56.99,
      type: "debit",
    },
    {
      date: "2026-06-18",
      description: "Uber",
      category: "Transport",
      amount: -18.75,
      type: "debit",
    },
    {
      date: "2026-06-17",
      description: "Blue Bottle Coffee",
      category: "Dining",
      amount: -12.5,
      type: "debit",
    },
    {
      date: "2026-06-16",
      description: "CVS Pharmacy",
      category: "Health",
      amount: -34.2,
      type: "debit",
    },
    {
      date: "2026-06-15",
      description: "Netflix Subscription",
      category: "Entertainment",
      amount: -15.99,
      type: "debit",
    },
    {
      date: "2026-06-14",
      description: "Transfer from Savings",
      category: "Transfer",
      amount: 500.0,
      type: "credit",
    },
    {
      date: "2026-06-13",
      description: "Safeway",
      category: "Groceries",
      amount: -63.11,
      type: "debit",
    },
    {
      date: "2026-06-12",
      description: "Metro Water Utility",
      category: "Utilities",
      amount: -48.0,
      type: "debit",
    },
    {
      date: "2026-06-10",
      description: "Freelance Payment — Design Work",
      category: "Income",
      amount: 850.0,
      type: "credit",
    },
  ];

  const savingsTxns: Omit<Transaction, "id" | "accountId">[] = [
    {
      date: "2026-06-20",
      description: "Interest Payment",
      category: "Income",
      amount: 42.67,
      type: "credit",
    },
    {
      date: "2026-06-14",
      description: "Transfer to Checking",
      category: "Transfer",
      amount: -500.0,
      type: "debit",
    },
    {
      date: "2026-06-01",
      description: "Monthly Savings Deposit",
      category: "Income",
      amount: 1000.0,
      type: "credit",
    },
    {
      date: "2026-05-20",
      description: "Interest Payment",
      category: "Income",
      amount: 40.12,
      type: "credit",
    },
    {
      date: "2026-05-01",
      description: "Monthly Savings Deposit",
      category: "Income",
      amount: 1000.0,
      type: "credit",
    },
    {
      date: "2026-04-20",
      description: "Interest Payment",
      category: "Income",
      amount: 38.5,
      type: "credit",
    },
  ];

  const overdraftTxns: Omit<Transaction, "id" | "accountId">[] = [
    {
      date: "2026-06-22",
      description: "Overdraft Fee",
      category: "Utilities",
      amount: -35.0,
      type: "debit",
    },
    {
      date: "2026-06-21",
      description: "Target",
      category: "Shopping",
      amount: -210.5,
      type: "debit",
    },
    {
      date: "2026-06-20",
      description: "ATM Withdrawal",
      category: "Shopping",
      amount: -200.0,
      type: "debit",
    },
    {
      date: "2026-06-18",
      description: "Paycheck — Part Time",
      category: "Income",
      amount: 780.0,
      type: "credit",
    },
    {
      date: "2026-06-16",
      description: "Rent Payment",
      category: "Utilities",
      amount: -1800.0,
      type: "debit",
    },
  ];

  const isChecking = accountId === "acc-checking-1";
  let rawTxns: Omit<Transaction, "id" | "accountId">[];

  if (isOverdraft) {
    rawTxns = isChecking ? overdraftTxns : savingsTxns.slice(0, 3);
  } else {
    rawTxns = isChecking ? checkingTxns : savingsTxns;
  }

  return rawTxns.map((t, i) => ({
    ...t,
    id: `txn-${accountId}-${String(i + 1).padStart(3, "0")}`,
    accountId,
  }));
}

// ─── Payees ───────────────────────────────────────────────────────────────────

export const SEED_PAYEES: Payee[] = [
  {
    id: "payee-001",
    name: "Rahul Sharma",
    accountNumber: "123456789",
    routingNumber: "021000021",
    bankName: "Chase Bank",
  },
  {
    id: "payee-002",
    name: "Priya Mehta",
    accountNumber: "987654321",
    routingNumber: "026009593",
    bankName: "Bank of America",
  },
];

// ─── Billers ──────────────────────────────────────────────────────────────────

export const SEED_BILLERS: Biller[] = [
  { id: "biller-001", name: "City Electric Co.", referenceNumber: "ACC-0042" },
  {
    id: "biller-002",
    name: "Metro Water Utility",
    referenceNumber: "ACC-7731",
  },
  { id: "biller-003", name: "FastNet Internet", referenceNumber: "ACC-2219" },
  {
    id: "biller-004",
    name: "Pacific Gas & Power",
    referenceNumber: "ACC-3345",
  },
  { id: "biller-005", name: "Skyline Cable TV", referenceNumber: "ACC-5567" },
  { id: "biller-006", name: "Verizon Wireless", referenceNumber: "ACC-8890" },
  {
    id: "biller-007",
    name: "SafeGuard Insurance",
    referenceNumber: "ACC-1123",
  },
  {
    id: "biller-008",
    name: "GreenWaste Disposal",
    referenceNumber: "ACC-4456",
  },
  { id: "biller-009", name: "StreamMax", referenceNumber: "ACC-9901" },
  { id: "biller-010", name: "AT&T Landline", referenceNumber: "ACC-1145" },
];

// ─── Notifications ────────────────────────────────────────────────────────────

export function createSeedNotifications(username: string): Notification[] {
  const now = new Date();
  const hoursAgo = (h: number) =>
    new Date(now.getTime() - h * 3600000).toISOString();

  const base: Notification[] = [
    {
      id: "notif-001",
      type: "success",
      title: "Transfer Completed",
      body: "Your transfer of $500.00 to Everyday Checking was successful.",
      timestamp: hoursAgo(2),
      isRead: false,
    },
    {
      id: "notif-002",
      type: "info",
      title: "New Login Detected",
      body: "A new login was detected from San Francisco, CA on Chrome / macOS.",
      timestamp: hoursAgo(5),
      isRead: false,
    },
    {
      id: "notif-003",
      type: "info",
      title: "Bill Payment Reminder",
      body: "Your City Electric Co. bill of $124.50 is due in 3 days.",
      timestamp: hoursAgo(24),
      isRead: true,
    },
    {
      id: "notif-004",
      type: "warning",
      title: "Low Balance Alert",
      body: "Your Everyday Checking balance has dropped below $500.",
      timestamp: hoursAgo(48),
      isRead: true,
    },
  ];

  if (username === "overdraft_user") {
    return [
      {
        id: "notif-001",
        type: "warning",
        title: "Account Overdrawn",
        body: "Your Everyday Checking account is overdrawn by $342.18. An overdraft fee of $35.00 has been applied.",
        timestamp: hoursAgo(1),
        isRead: false,
      },
      ...base.slice(1),
    ];
  }

  return base;
}

// ─── Loan Applications ────────────────────────────────────────────────────────

/**
 * Seed loan application history, newest first (matches the ordering the
 * store uses when a new application is prepended in `applyLoan`). Every
 * account gets the same 7 historical applications so the loan history
 * table on app/bank/apply-loan has enough rows to demo sorting, date
 * filtering, and 5-per-page pagination out of the box.
 */
export function createSeedLoanApplications(
  username: string,
  accounts: Account[],
): LoanApplication[] {
  const disbursementAccount =
    accounts.find((a) => a.type === "Checking") ?? accounts[0];
  if (!disbursementAccount) return [];

  const entries: Array<{
    date: string;
    loanType: LoanApplication["loanType"];
    amount: number;
    termMonths: number;
    purpose: string;
    status: LoanApplication["status"];
  }> = [
    {
      date: "2026-06-15",
      loanType: "Home",
      amount: 15000,
      termMonths: 36,
      purpose: "Roof repair",
      status: "pending",
    },
    {
      date: "2026-05-28",
      loanType: "Auto",
      amount: 9800,
      termMonths: 48,
      purpose: "Used car — down payment assist",
      status: "approved",
    },
    {
      date: "2026-05-07",
      loanType: "Personal",
      amount: 2500,
      termMonths: 12,
      purpose: "Medical expenses",
      status: "pending",
    },
    {
      date: "2026-04-19",
      loanType: "Student",
      amount: 12000,
      termMonths: 36,
      purpose: "Tuition — Spring semester",
      status: "approved",
    },
    {
      date: "2026-04-02",
      loanType: "Home",
      amount: 45000,
      termMonths: 60,
      purpose: "Kitchen renovation",
      status: "pending",
    },
    {
      date: "2026-03-11",
      loanType: "Personal",
      amount: 5000,
      termMonths: 24,
      purpose: "Debt consolidation",
      status: "approved",
    },
    {
      date: "2026-02-03",
      loanType: "Auto",
      amount: 18500,
      termMonths: 60,
      purpose: "Vehicle purchase — 2023 Honda Civic",
      status: "approved",
    },
  ];

  return entries.map((entry, i) => ({
    id: `loan-seed-${i + 1}`,
    refId: `LOAN-${entry.date.replace(/-/g, "")}-${1000 + i}`,
    loanType: entry.loanType,
    amount: entry.amount,
    termMonths: entry.termMonths,
    purpose: entry.purpose,
    disbursementAccount,
    status: entry.status,
    date: entry.date,
  }));
}
