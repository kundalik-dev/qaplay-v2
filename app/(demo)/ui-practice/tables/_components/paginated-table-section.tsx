"use client";

import { useState } from "react";

import { employees } from "@/data/ui-practice-data/tables-data";
import { PaginationControls } from "./pagination-controls";
import { StatusBadge } from "./status-badge";
import { formatSalary } from "./table-utils";

const PER_PAGE = 5;

/**
 * Section 4 — paginated table (Intermediate -> Advanced).
 * 15 employees, 5 per page, matching the original `render()` slicing logic.
 */
export function PaginatedTableSection() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(employees.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const rows = employees.slice(start, start + PER_PAGE);
  const infoText = `Showing ${start + 1}–${Math.min(start + PER_PAGE, employees.length)} of ${employees.length}`;

  return (
    <section className="section" id="sec-pagination">
      <h2>
        4. Paginated table{" "}
        <span className="badge badge-orange">Intermediate → Advanced</span>
      </h2>
      <p className="hint">
        15 employees, 5 per page. Assert: row count per page,{" "}
        <code>aria-current=&quot;page&quot;</code> on active button, Prev
        disabled on page 1, Next disabled on last page, &quot;Showing X–Y of
        15&quot; updates after navigation.
      </p>
      <table data-testid="pag-table" aria-label="Paginated employee table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody data-testid="pag-tbody">
          {rows.map((e, i) => (
            <tr key={e.id} data-testid={`pag-row-${e.id}`}>
              <td>{start + i + 1}</td>
              <td data-testid={`pag-name-${e.id}`}>{e.name}</td>
              <td>{e.dept}</td>
              <td>{formatSalary(e.salary)}</td>
              <td>
                <StatusBadge status={e.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        infoText={infoText}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
        onSelectPage={setPage}
        testIdPrefix="pag"
        navAriaLabel="Table pagination"
      />
    </section>
  );
}
