"use client";

import { useState } from "react";
import type { ChangeEvent } from "react";

import { employees as allEmployees, type Employee } from "@/data/ui-practice-data/tables-data";
import { StatusBadge } from "./status-badge";
import { formatSalary } from "./table-utils";

interface Draft {
  name: string;
  dept: string;
  salary: string;
}

const INITIAL_ROWS = allEmployees.slice(0, 8).map((e) => ({ ...e }));

/**
 * Section 5 — row actions: Edit / Delete (Intermediate -> Advanced).
 * Edit swaps the row into inline inputs; Save commits, Cancel reverts;
 * Delete removes the row entirely — mirrors the original prototype's
 * `showInlineEdit` / save / cancel / delete handlers.
 */
export function RowActionsTableSection() {
  const [rows, setRows] = useState<Employee[]>(INITIAL_ROWS);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<Draft>({ name: "", dept: "", salary: "" });

  function startEdit(emp: Employee) {
    setEditingId(emp.id);
    setDraft({ name: emp.name, dept: emp.dept, salary: String(emp.salary) });
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
    <section className="section" id="sec-actions">
      <h2>
        5. Table with row actions (Edit / Delete){" "}
        <span className="badge badge-orange">Intermediate → Advanced</span>
      </h2>
      <p className="hint">
        Each row has Edit and Delete buttons. Edit replaces cells with inline inputs; Save commits
        the change; Cancel reverts. Delete removes the row from the DOM. Practice: scoping buttons
        by row (
        <code>
          getByTestId(&apos;actions-row-2&apos;).getByRole(&apos;button&apos;, &#123; name:
          &apos;Edit&apos; &#125;)
        </code>
        ), asserting DOM removal, inline input interactions.
      </p>
      <div className="result-info" data-testid="actions-row-count">
        {`${rows.length} employee${rows.length !== 1 ? "s" : ""} in table`}
      </div>
      <table data-testid="actions-table" aria-label="Employee table with row actions">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Department</th>
            <th scope="col">Salary</th>
            <th scope="col">Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody data-testid="actions-tbody">
          {rows.length === 0 ? (
            <tr className="empty-msg">
              <td colSpan={5}>All employees deleted.</td>
            </tr>
          ) : (
            rows.map((e) =>
              editingId === e.id ? (
                <tr key={e.id} data-testid={`actions-row-${e.id}`} data-id={e.id}>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`edit-name-${e.id}`}
                      value={draft.name}
                      onChange={updateDraft("name")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`edit-dept-${e.id}`}
                      value={draft.dept}
                      onChange={updateDraft("dept")}
                    />
                  </td>
                  <td>
                    <input
                      className="inline-input"
                      data-testid={`edit-salary-${e.id}`}
                      type="number"
                      value={draft.salary}
                      onChange={updateDraft("salary")}
                    />
                  </td>
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`save-btn-${e.id}`}
                      onClick={() => saveEdit(e.id)}
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      data-testid={`cancel-btn-${e.id}`}
                      onClick={cancelEdit}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={e.id} data-testid={`actions-row-${e.id}`} data-id={e.id}>
                  <td data-testid={`actions-name-${e.id}`}>{e.name}</td>
                  <td data-testid={`actions-dept-${e.id}`}>{e.dept}</td>
                  <td data-testid={`actions-salary-${e.id}`}>{formatSalary(e.salary)}</td>
                  <td>
                    <StatusBadge status={e.status} />
                  </td>
                  <td className="actions-cell">
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      data-testid={`edit-btn-${e.id}`}
                      onClick={() => startEdit(e)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-testid={`delete-btn-${e.id}`}
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
    </section>
  );
}
