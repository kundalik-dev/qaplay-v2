import type { EmployeeStatus } from "@/data/ui-practice-data/tables-data";

interface StatusBadgeProps {
  status: EmployeeStatus;
}

/** Renders the `<span class="status-active|status-inactive">` badge used across every table section. */
export function StatusBadge({ status }: StatusBadgeProps) {
  const cls = status === "Active" ? "status-active" : "status-inactive";
  return (
    <span className={cls} data-testid={`status-${status.toLowerCase()}`}>
      {status}
    </span>
  );
}
