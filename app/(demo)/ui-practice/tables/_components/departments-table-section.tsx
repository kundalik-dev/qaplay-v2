"use client";

import { useMemo, useState } from "react";
import type { ChangeEvent } from "react";

import {
  employees as allEmployees,
  type Department,
  type Employee,
} from "@/data/ui-practice-data/tables-data";
import { PaginationControls } from "./pagination-controls";
import { StatusBadge } from "./status-badge";
import {
  ariaSortFor,
  formatSalary,
  sortEmployees,
  type SortDirection,
  type SortableEmployeeColumn,
} from "./table-utils";

const PER_PAGE = 5;
const DEPARTMENTS: Department[] = ["Engineering", "Marketing", "HR", "Sales"];

const COLUMNS: {
  col: SortableEmployeeColumn;
  label: string;
  testId: string;
}[] = [
  { col: "name", label: "Name", testId: "departments-th-name" },
  { col: "dept", label: "Department", testId: "departments-th-dept" },
  { col: "salary", label: "Salary", testId: "departments-th-salary" },
  { col: "joined", label: "Date Joined", testId: "departments-th-joined" },
];

interface Draft {
  name: string;
  dept: string;
  salary: string;
}

const INITIAL_ROWS = allEmployees.map((e) => ({ ...e }));

/**
 * All-in-one departments table — merges everything sections 2–6
 * demonstrate for the employee/department data set into a single table:
 * sortable headers, name search + department filter, pagination, and
 * inline Edit/Delete row actions. Rendered at the top of
 * /ui-practice/tables ahead of the individual single-feature sections
 * below (which stay in place until removal is approved).
 */
export function DepartmentsTableSection() {
  const [rows, setRows] = useState<Employee[]>(INITIAL_ROWS);
  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("");
  const [sortCol, setSortCol] = useState<SortableEmployeeColumn | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection | null>(null);
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: "", dept: "", salary: "" });

  const filteredSorted = useMemo(() => {
    const q = query.toLowerCase().trim();
    let result = rows.filter(
      (e) =>
        (!q || e.name.toLowerCase().includes(q)) && (!dept || e.dept === dept),
    );
    if (sortCol && sortDir) result = sortEmployees(result, sortCol, sortDir);
    return result;
  }, [rows, query, dept, sortCol, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredSorted.length / PER_PAGE));
  const currentPage = page > totalPages ? 1 : page;
  const start = (currentPage - 1) * PER_PAGE;
  const pageRows = filteredSorted.slice(start, start + PER_PAGE);

  const infoText = filteredSorted.length
    ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, filteredSorted.length)} of ${filteredSorted.length}`
    : "No results";

  function handleSort(col: SortableEmployeeColumn) {
    if (sortCol === col) {
      if (sortDir === "asc") {
        setSortDir("desc");
      } else {
        setSortCol(null);
        setSortDir(null);
      }
    } else {
      setSortCol(col);
      setSortDir("asc");
    }
    setPage(1);
  }

  function handleClearAll() {
    setQuery("");
    setDept("");
    setSortCol(null);
    setSortDir(null);
    setPage(1);
  }

  function startEdit(e: Employee) {
    setEditingId(e.id);
    setDraft({ name: e.name, dept: e.dept, salary: String(e.salary) });
  }

  function cancelEdit() {
    setEditingId(null);
  }

  function saveEdit(id: number) {
    setRows((prev) =>
      prev.map((e) =>
        e.id === id
          ? {
              ...e,
              name: draft.name,
              dept: draft.dept as Employee["dept"],
              salary: Number(draft.salary),
            }
          : e,
      ),
    );
    setEditingId(null);
  }

  function deleteRow(id: number) {
    setRows((prev) => prev.filter((e) => e.id !== id));
    if (editingId === id) setEditingId(null);
  }

  function updateDraft(field: keyof Draft) {
    return (e: ChangeEvent<HTMLInputElement>) =>
      setDraft((prev) => ({ ...prev, [field]: e.target.value }));
  }

  return (
    <section
      className="section"
      id="sec-departments"
      data-testid="section-departments"
      data-section="departments-table"
    >
      <h2>
        Departments <span className="badge badge-red">All-in-one</span>
      </h2>

      <div className="controls">
        <div className="ctrl-field">
          <label htmlFor="departments-search">Search by name</label>
          <input
            type="search"
            id="departments-search"
            data-testid="departments-search"
            aria-label="Search employees by name"
            placeholder="e.g. Priya"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="ctrl-field">
          <label htmlFor="departments-filter">Department</label>
          <select
            id="departments-filter"
            data-testid="departments-filter"
            aria-label="Filter by department"
            value={dept}
            onChange={(e) => {
              setDept(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm clear-btn-align"
          id="departments-clear-btn"
          data-testid="departments-clear-btn"
          onClick={handleClearAll}
        >
          Clear All
        </button>
      </div>
      <div className="result-info" data-testid="departments-row-count">
        {`${rows.length} employee${rows.length !== 1 ? "s" : ""} in table`}
      </div>
      <div className="result-info" data-testid="departments-result-count">
        {`Showing ${filteredSorted.length} of ${rows.length} employees`}
      </div>
      <table
        data-testid="departments-table"
        aria-label="Departments — all-in-one"
      >
        <thead>
          <tr>
            {COLUMNS.map((c) => (
              <th
                key={c.col}
                className="sortable"
                data-col={c.col}
                aria-sort={ariaSortFor(c.col, sortCol, sortDir)}
                data-testid={c.testId}
                scope="col"
                onClick={() => handleSort(c.col)}
              >
                {c.label} <span className="sort-icon" aria-hidden="true" />
              </th>
            ))}
            <th scope="col" data-testid="departments-th-status">
              Status
            </th>
            <th scope="col" data-testid="departments-th-actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody data-testid="departments-tbody">
          {pageRows.length === 0 ? (
            <tr className="empty-msg">
              <td colSpan={6}>No employees match your filters.</td>
            </tr>
          ) : (
            pageRows.map((e) =>
              editingId === e.id ? (
                <tr
                  key={e.id}
                  data-testid={`departments-row-${e.id}`}
                  data-id={e.id}
                >
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`departments-edit-name-${e.id}`}
                      value={draft.name}
                      onChange={updateDraft("name")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`departments-edit-dept-${e.id}`}
                      value={draft.dept}
                      onChange={updateDraft("dept")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`departments-edit-salary-${e.id}`}
                      type="number"
                      value={draft.salary}
                      onChange={updateDraft("salary")}
                    />
                  </td>
                  <td data-testid={`departments-joined-${e.id}`}>{e.joined}</td>
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`departments-save-btn-${e.id}`}
                      onClick={() => saveEdit(e.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-testid={`departments-cancel-btn-${e.id}`}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr
                  key={e.id}
                  data-testid={`departments-row-${e.id}`}
                  data-id={e.id}
                >
                  <td data-testid={`departments-name-${e.id}`}>{e.name}</td>
                  <td data-testid={`departments-dept-${e.id}`}>{e.dept}</td>
                  <td data-testid={`departments-salary-${e.id}`}>
                    {formatSalary(e.salary)}
                  </td>
                  <td data-testid={`departments-joined-${e.id}`}>{e.joined}</td>
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`departments-edit-btn-${e.id}`}
                      onClick={() => startEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-testid={`departments-delete-btn-${e.id}`}
                      onClick={() => deleteRow(e.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ),
            )
          )}
        </tbody>
      </table>
      <PaginationControls
        page={currentPage}
        totalPages={totalPages}
        infoText={infoText}
        onPrev={() => setPage((p) => p - 1)}
        onNext={() => setPage((p) => p + 1)}
        onSelectPage={setPage}
        testIdPrefix="departments"
        navAriaLabel="Departments pagination"
      />
    </section>
  );
}
