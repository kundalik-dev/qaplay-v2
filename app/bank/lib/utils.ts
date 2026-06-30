/**
 * Format a number as USD currency string.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

/**
 * Generate a transfer / send / bill-pay reference ID.
 * e.g. "TXN-20260624-0042"
 */
export function generateRefId(prefix = "TXN"): string {
  const today = new Date();
  const date = today.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = String(Math.floor(Math.random() * 9000) + 1000);
  return `${prefix}-${date}-${rand}`;
}

/**
 * Generate a unique transaction ID based on existing transaction count.
 */
export function generateTxnId(existingCount: number): string {
  return `txn-${1000 + existingCount + 1}`;
}

/**
 * Get today's date as ISO string "YYYY-MM-DD".
 */
export function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Format an ISO date string to a readable format.
 * e.g. "2026-06-24" → "Jun 24, 2026"
 */
export function formatDate(iso: string): string {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Format an ISO timestamp to relative time.
 * e.g. "2 hours ago"
 */
export function formatRelativeTime(isoTimestamp: string): string {
  const diff = Date.now() - new Date(isoTimestamp).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/**
 * Mask an account number showing only last 4 digits.
 */
export function maskAccountNumber(num: string): string {
  return `****${num.slice(-4)}`;
}

/**
 * Compute running balances for a sorted transaction list (newest first).
 * Returns transactions with `runningBalance` field populated.
 */
export function computeRunningBalances<T extends { amount: number }>(
  transactions: T[],
  currentBalance: number,
): Array<T & { runningBalance: number }> {
  let balance = currentBalance;
  return transactions.map((txn) => {
    const rb = balance;
    balance = balance - txn.amount;
    return { ...txn, runningBalance: rb };
  });
}

/**
 * Validate routing number: exactly 9 digits.
 */
export function isValidRoutingNumber(value: string): boolean {
  return /^\d{9}$/.test(value.trim());
}

/**
 * Validate external account number: 8–17 digits.
 */
export function isValidAccountNumber(value: string): boolean {
  return /^\d{8,17}$/.test(value.trim());
}

/**
 * Validate email format.
 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/**
 * Validate phone: accepts (XXX) XXX-XXXX or +1XXXXXXXXXX or XXX-XXX-XXXX.
 */
export function isValidPhone(value: string): boolean {
  return /^(\+1\d{10}|\(\d{3}\)\s?\d{3}-\d{4}|\d{3}-\d{3}-\d{4})$/.test(
    value.trim(),
  );
}
