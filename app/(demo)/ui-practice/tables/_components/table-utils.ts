import type { Employee } from "@/data/ui-practice-data/tables-data";

export type SortDirection = "asc" | "desc";
export type SortableEmployeeColumn = "name" | "dept" | "salary" | "joined";

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

/** Resolves the `aria-sort` value for a column header given current sort state. */
export function ariaSortFor(
  col: SortableEmployeeColumn,
  activeCol: SortableEmployeeColumn | null,
  dir: SortDirection | null,
): "ascending" | "descending" | "none" {
  if (col !== activeCol || !dir) return "none";
  return dir === "asc" ? "ascending" : "descending";
}
