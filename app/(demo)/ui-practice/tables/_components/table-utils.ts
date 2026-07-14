import type { Employee, Product } from "@/data/ui-practice-data/tables-data";

export type SortDirection = "asc" | "desc";
export type SortableEmployeeColumn = "name" | "dept" | "salary" | "joined";
export type SortableProductColumn = "product" | "category" | "price" | "rating";

/** "$85,000" style formatting, matching the original `fmtSalary`. */
export function formatSalary(amount: number): string {
  return `$${amount.toLocaleString()}`;
}

/**
 * Sorts a copy of `data` by the given employee column and direction.
 * Mirrors the original `sortData` — string/date columns compare
 * lexicographically, `salary` compares numerically.
 */
export function sortEmployees<T extends Employee>(
  data: T[],
  col: SortableEmployeeColumn,
  dir: SortDirection,
): T[] {
  return [...data].sort((a, b) => {
    const va = col === "salary" ? Number(a[col]) : a[col];
    const vb = col === "salary" ? Number(b[col]) : b[col];
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Strips everything but digits/dot/minus so formatted strings like
 * "$1,299" or "4.8" can be compared numerically.
 */
function parseNumeric(value: string): number {
  return Number(value.replace(/[^0-9.-]/g, "")) || 0;
}

/**
 * Sorts a copy of `data` by the given product column and direction.
 * `price` and `rating` are stored as formatted strings ("$1,299", "4.8"),
 * so they're parsed to numbers before comparing; `product`/`category`
 * compare lexicographically. Mirrors `sortEmployees` above.
 */
export function sortProducts<T extends Product>(
  data: T[],
  col: SortableProductColumn,
  dir: SortDirection,
): T[] {
  const numeric = col === "price" || col === "rating";
  return [...data].sort((a, b) => {
    const va = numeric ? parseNumeric(a[col]) : a[col];
    const vb = numeric ? parseNumeric(b[col]) : b[col];
    if (va < vb) return dir === "asc" ? -1 : 1;
    if (va > vb) return dir === "asc" ? 1 : -1;
    return 0;
  });
}

/**
 * Resolves the `aria-sort` value for a column header given current sort
 * state. Generic over the column-name union so it works for both the
 * employee and product sortable columns.
 */
export function ariaSortFor<T extends string>(
  col: T,
  activeCol: T | null,
  dir: SortDirection | null,
): "ascending" | "descending" | "none" {
  if (col !== activeCol || !dir) return "none";
  return dir === "asc" ? "ascending" : "descending";
}
