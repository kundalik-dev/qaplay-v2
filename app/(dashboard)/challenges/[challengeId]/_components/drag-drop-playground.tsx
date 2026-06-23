"use client";

import { useState } from "react";
import styles from "./playground.module.css";

type Column = "todo" | "done";

interface Ticket {
  id: string;
  label: string;
  column: Column;
}

const INITIAL_TICKETS: Ticket[] = [
  { id: "ticket-1042", label: "Ticket #1042", column: "todo" },
];

export function DragDropPlayground() {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [dragging, setDragging] = useState<string | null>(null);
  const [overCol, setOverCol] = useState<Column | null>(null);

  const todoTickets = tickets.filter((t) => t.column === "todo");
  const doneTickets = tickets.filter((t) => t.column === "done");

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDragOver(e: React.DragEvent, col: Column) {
    e.preventDefault();
    setOverCol(col);
  }

  function handleDrop(col: Column) {
    if (!dragging) return;
    setTickets((prev) =>
      prev.map((t) => (t.id === dragging ? { ...t, column: col } : t)),
    );
    setDragging(null);
    setOverCol(null);
  }

  function handleDragEnd() {
    setDragging(null);
    setOverCol(null);
  }

  return (
    <div className={styles.playground} data-testid="drag-drop-playground">
      <div className={styles.kanbanBoard} data-testid="kanban-board">
        {/* To Do column */}
        <div
          className={`${styles.kanbanCol} ${overCol === "todo" ? styles.kanbanColOver : ""}`}
          onDragOver={(e) => handleDragOver(e, "todo")}
          onDrop={() => handleDrop("todo")}
          id="todo-column"
          data-testid="todo-column"
          data-column="todo"
          role="region"
          aria-label="To Do column"
        >
          <div className={styles.kanbanColHeader}>To Do</div>

          {todoTickets.map((t) => (
            <div
              key={t.id}
              className={`${styles.kanbanTicket} ${dragging === t.id ? styles.kanbanTicketDragging : ""}`}
              draggable
              onDragStart={() => handleDragStart(t.id)}
              onDragEnd={handleDragEnd}
              id={t.id}
              data-testid={`ticket-${t.id}`}
              data-ticket-id={t.id}
              aria-label={`${t.label} — drag to move`}
            >
              <svg
                className={styles.dragHandle}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="4" cy="3" r="1" fill="currentColor" />
                <circle cx="8" cy="3" r="1" fill="currentColor" />
                <circle cx="4" cy="6" r="1" fill="currentColor" />
                <circle cx="8" cy="6" r="1" fill="currentColor" />
                <circle cx="4" cy="9" r="1" fill="currentColor" />
                <circle cx="8" cy="9" r="1" fill="currentColor" />
              </svg>
              {t.label}
            </div>
          ))}

          {todoTickets.length === 0 && (
            <span className={styles.kanbanDropZoneHint}>Empty</span>
          )}
        </div>

        {/* Done column */}
        <div
          className={`${styles.kanbanCol} ${overCol === "done" ? styles.kanbanColOver : ""} ${doneTickets.length > 0 ? styles.kanbanColDone : ""}`}
          onDragOver={(e) => handleDragOver(e, "done")}
          onDrop={() => handleDrop("done")}
          id="done-column"
          data-testid="done-column"
          data-column="done"
          role="region"
          aria-label="Done column"
        >
          <div className={styles.kanbanColHeader}>Done</div>

          {doneTickets.map((t) => (
            <div
              key={t.id}
              className={`${styles.kanbanTicket} ${styles.kanbanTicketDone}`}
              id={`${t.id}-done`}
              data-testid={`ticket-${t.id}-done`}
              data-ticket-id={t.id}
              aria-label={`${t.label} — completed`}
            >
              ✅ {t.label}
            </div>
          ))}

          {doneTickets.length > 0 && (
            <span
              className={styles.kanbanSuccessHint}
              data-testid="done-success-hint"
            >
              Dropped successfully!
            </span>
          )}

          {doneTickets.length === 0 && (
            <span
              className={styles.kanbanDropZoneHint}
              data-testid="done-drop-hint"
            >
              Drop here
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
