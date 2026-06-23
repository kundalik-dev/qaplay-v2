"use client";

import { useState } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { dragDropScenarios, frameworkMethods } from "@/data/practice-data/drag-drop/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./drag-drop.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ══════════════════════════════════════════════════════════════
   S01 · Basic drag to drop zone
   Beginner — stable data-testid on both item and zone
══════════════════════════════════════════════════════════════ */
function BasicDropScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [dropped, setDropped] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [over, setOver]       = useState(false);

  function reset() {
    setDropped(false);
    setDragging(false);
    setOver(false);
    onComplete("Item not dropped yet");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Drag the item into the drop zone.
      </p>
      <div className={styles.basicArea}>
        {/* Draggable source */}
        {!dropped && (
          <div
            data-testid="dd-item"
            draggable
            onDragStart={() => setDragging(true)}
            onDragEnd={() => setDragging(false)}
            className={`${styles.draggableItem} ${dragging ? styles.draggableItemDragging : ""}`}
            aria-label="Draggable item"
            role="img"
          >
            📦 Item
          </div>
        )}

        {/* Drop zone */}
        <div
          data-testid="dd-drop-zone"
          onDragOver={(e) => { e.preventDefault(); setOver(true); }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            setDragging(false);
            setDropped(true);
            onComplete("Item dropped into zone ✓");
          }}
          className={`${styles.dropZone} ${over ? styles.dropZoneOver : ""} ${dropped ? styles.dropZoneFilled : ""}`}
          aria-label="Drop zone"
          aria-dropeffect="move"
        >
          {dropped ? "📦 Item dropped ✓" : "Drop here"}
        </div>
      </div>

      {dropped && (
        <button type="button" onClick={reset} className={styles.resetBtn}>
          ↺ Reset
        </button>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S02 · Multiple labelled drop zones
   Medium — data-card-id / data-zone-id for scoped locators
══════════════════════════════════════════════════════════════ */
const ZONE_CARDS = [
  { cardId: "card-1", label: "Alpha",  color: "#6366f1", targetZone: "zone-a" },
  { cardId: "card-2", label: "Beta",   color: "#f59e0b", targetZone: "zone-b" },
  { cardId: "card-3", label: "Gamma",  color: "#10b981", targetZone: "zone-c" },
];
const ZONES = [
  { zoneId: "zone-a", label: "Zone A" },
  { zoneId: "zone-b", label: "Zone B" },
  { zoneId: "zone-c", label: "Zone C" },
];

function MultiZoneScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [zoneContents, setZoneContents] = useState<Record<string, string | null>>({
    "zone-a": null, "zone-b": null, "zone-c": null,
  });
  const [dragCardId, setDragCardId]     = useState<string | null>(null);
  const [overZoneId, setOverZoneId]     = useState<string | null>(null);

  const droppedCardIds = Object.values(zoneContents).filter(Boolean) as string[];

  function handleDrop(zoneId: string) {
    if (!dragCardId) return;
    const next = { ...zoneContents };
    // Remove card from any zone it's already in
    for (const k of Object.keys(next)) {
      if (next[k] === dragCardId) next[k] = null;
    }
    next[zoneId] = dragCardId;
    setZoneContents(next);
    setOverZoneId(null);
    setDragCardId(null);

    const matched = ZONES.filter(
      (z) => next[z.zoneId] === ZONE_CARDS.find((c) => c.targetZone === z.zoneId)?.cardId,
    );
    onComplete(
      matched.length === ZONES.length
        ? "All 3 cards matched ✓"
        : `${matched.length}/3 matched`,
    );
  }

  function reset() {
    setZoneContents({ "zone-a": null, "zone-b": null, "zone-c": null });
    setDragCardId(null);
    setOverZoneId(null);
    onComplete("No card dropped");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Drag each card to its matching zone. Cards show which zone they belong to.
      </p>

      <div className={styles.multiZoneArea}>
        {/* Card source row */}
        <div className={styles.cardRow}>
          {ZONE_CARDS.map((c) => {
            const isDropped = droppedCardIds.includes(c.cardId);
            return (
              <div
                key={c.cardId}
                data-testid="dd-card"
                data-card-id={c.cardId}
                draggable={!isDropped}
                onDragStart={() => setDragCardId(c.cardId)}
                onDragEnd={() => setDragCardId(null)}
                className={`${styles.zoneCard} ${dragCardId === c.cardId ? styles.zoneCardDragging : ""}`}
                style={{
                  borderColor: isDropped ? "var(--border)" : c.color,
                  background: isDropped
                    ? "var(--card)"
                    : `color-mix(in srgb, ${c.color} 12%, var(--card))`,
                  color: isDropped ? "var(--muted-foreground)" : c.color,
                  opacity: isDropped ? 0.35 : 1,
                  cursor: isDropped ? "default" : "grab",
                }}
                aria-label={`Card ${c.label} — drop into ${c.targetZone}`}
              >
                {c.label}
                <br />
                <span style={{ fontSize: 9, fontWeight: 400 }}>→ {c.targetZone}</span>
              </div>
            );
          })}
        </div>

        {/* Zone row */}
        <div className={styles.zoneRow}>
          {ZONES.map((z) => {
            const filled     = zoneContents[z.zoneId];
            const filledCard = ZONE_CARDS.find((c) => c.cardId === filled);
            return (
              <div
                key={z.zoneId}
                data-testid="dd-zone"
                data-zone-id={z.zoneId}
                onDragOver={(e) => { e.preventDefault(); setOverZoneId(z.zoneId); }}
                onDragLeave={() => setOverZoneId(null)}
                onDrop={() => handleDrop(z.zoneId)}
                className={`${styles.labelledZone} ${overZoneId === z.zoneId ? styles.labelledZoneOver : ""} ${filled ? styles.labelledZoneFilled : ""}`}
                aria-label={`Drop zone ${z.zoneId}`}
                aria-dropeffect="move"
              >
                <span className={styles.zoneLabel}>{z.label}</span>
                {filled && filledCard ? (
                  <span style={{ color: filledCard.color }}>{filledCard.label}</span>
                ) : (
                  "Drop here"
                )}
              </div>
            );
          })}
        </div>
      </div>

      <button type="button" onClick={reset} className={styles.resetBtn}>
        ↺ Reset
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S03 · Sortable list reorder
   Medium — data-testid="dd-sort-item" + data-item-id
══════════════════════════════════════════════════════════════ */
const INITIAL_SORT_ITEMS = [
  { id: "item-1", label: "Playwright" },
  { id: "item-2", label: "Cypress" },
  { id: "item-3", label: "Selenium" },
  { id: "item-4", label: "WebdriverIO" },
  { id: "item-5", label: "Puppeteer" },
];

function SortableListScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [items, setItems]         = useState(INITIAL_SORT_ITEMS);
  const [dragId, setDragId]       = useState<string | null>(null);
  const [overId, setOverId]       = useState<string | null>(null);

  function handleDrop(targetId: string) {
    if (!dragId || dragId === targetId) return;
    setItems((prev) => {
      const dragIdx   = prev.findIndex((i) => i.id === dragId);
      const targetIdx = prev.findIndex((i) => i.id === targetId);
      const next      = [...prev];
      const [moved]   = next.splice(dragIdx, 1);
      next.splice(targetIdx, 0, moved);
      onComplete("Order: " + next.map((i) => i.label).join(", "));
      return next;
    });
    setDragId(null);
    setOverId(null);
  }

  function reset() {
    setItems(INITIAL_SORT_ITEMS);
    setDragId(null);
    setOverId(null);
    onComplete("List not reordered");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Drag items to reorder the list. Each item has{" "}
        <code>data-item-id</code> — use it as the locator anchor.
      </p>

      <ul
        data-testid="dd-sort-list"
        className={styles.sortList}
        aria-label="Sortable framework list"
      >
        {items.map((item) => (
          <li
            key={item.id}
            data-testid="dd-sort-item"
            data-item-id={item.id}
            draggable
            onDragStart={() => setDragId(item.id)}
            onDragEnd={() => { setDragId(null); setOverId(null); }}
            onDragOver={(e) => { e.preventDefault(); setOverId(item.id); }}
            onDragLeave={() => setOverId(null)}
            onDrop={() => handleDrop(item.id)}
            className={`${styles.sortItem} ${dragId === item.id ? styles.sortItemDragging : ""} ${overId === item.id && dragId !== item.id ? styles.sortItemOver : ""}`}
            aria-label={`Sort item: ${item.label}`}
          >
            <span className={styles.sortHandle} aria-hidden="true">⠿</span>
            {item.label}
          </li>
        ))}
      </ul>

      <button type="button" onClick={reset} className={styles.resetBtn}>
        ↺ Reset order
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S04 · Kanban column transfer
   Hard — data-column-id on columns, NO data-testid on headings
         data-testid="dd-task" + data-task-id on tasks
══════════════════════════════════════════════════════════════ */
type KanbanColumn = "todo" | "done";

interface KanbanTask {
  id: string;
  label: string;
  column: KanbanColumn;
}

const INITIAL_KANBAN: KanbanTask[] = [
  { id: "task-1", label: "Write login tests",       column: "todo" },
  { id: "task-2", label: "Automate checkout flow",  column: "todo" },
  { id: "task-3", label: "Set up CI pipeline",      column: "todo" },
  { id: "task-4", label: "Refactor page objects",   column: "done" },
];

function KanbanScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [tasks, setTasks]         = useState<KanbanTask[]>(INITIAL_KANBAN);
  const [dragTaskId, setDragTaskId] = useState<string | null>(null);
  const [overCol, setOverCol]     = useState<KanbanColumn | null>(null);

  function moveTo(col: KanbanColumn) {
    if (!dragTaskId) return;
    setTasks((prev) => {
      const next = prev.map((t) => t.id === dragTaskId ? { ...t, column: col } : t);
      const movedLabel = prev.find((t) => t.id === dragTaskId)?.label ?? dragTaskId;
      onComplete(`"${movedLabel}" moved to ${col === "todo" ? "Todo" : "Done"} ✓`);
      return next;
    });
    setDragTaskId(null);
    setOverCol(null);
  }

  function reset() {
    setTasks(INITIAL_KANBAN);
    setDragTaskId(null);
    setOverCol(null);
    onComplete("No task moved");
  }

  const columns: { id: KanbanColumn; label: string }[] = [
    { id: "todo", label: "Todo" },
    { id: "done", label: "Done" },
  ];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Column headings have <strong>no</strong> <code>data-testid</code>.
        Scope via <code>data-column-id</code> then find <code>data-task-id</code>.
      </p>

      <div className={styles.kanbanBoard}>
        {columns.map((col) => {
          const colTasks = tasks.filter((t) => t.column === col.id);
          return (
            <div
              key={col.id}
              data-column-id={col.id}
              onDragOver={(e) => { e.preventDefault(); setOverCol(col.id as KanbanColumn); }}
              onDragLeave={() => setOverCol(null)}
              onDrop={() => moveTo(col.id)}
              className={`${styles.kanbanColumn} ${overCol === col.id ? styles.kanbanColumnOver : ""}`}
            >
              {/* No data-testid on h3 — intentional for XPath ancestor practice */}
              <h3 className={styles.kanbanHeader}>
                {col.label}
                <span className={styles.kanbanCount}>{colTasks.length}</span>
              </h3>
              <div className={styles.kanbanBody}>
                {colTasks.map((task) => (
                  <div
                    key={task.id}
                    data-testid="dd-task"
                    data-task-id={task.id}
                    draggable
                    onDragStart={() => setDragTaskId(task.id)}
                    onDragEnd={() => { setDragTaskId(null); setOverCol(null); }}
                    className={`${styles.kanbanTask} ${dragTaskId === task.id ? styles.kanbanTaskDragging : ""}`}
                    aria-label={`Task: ${task.label}`}
                  >
                    {task.label}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" onClick={reset} className={styles.resetBtn}>
        ↺ Reset board
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S05 · Type-restricted drop zones
   Hard — items have data-item-type, zones have data-accepts
         Rejection feedback has NO data-testid (role="status")
══════════════════════════════════════════════════════════════ */
type ShapeType = "shape-circle" | "shape-square" | "shape-triangle";

interface Shape {
  type: ShapeType;
  label: string;
}

const SHAPES: Shape[] = [
  { type: "shape-circle",   label: "Circle" },
  { type: "shape-square",   label: "Square" },
  { type: "shape-triangle", label: "Triangle" },
];

function TypedZoneScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [zoneContents, setZoneContents] = useState<Record<ShapeType, ShapeType | null>>({
    "shape-circle":   null,
    "shape-square":   null,
    "shape-triangle": null,
  });
  const [dragType, setDragType]   = useState<ShapeType | null>(null);
  const [overZone, setOverZone]   = useState<ShapeType | null>(null);
  const [errorMsg, setErrorMsg]   = useState<string | null>(null);

  function handleDrop(targetType: ShapeType) {
    if (!dragType) return;
    if (dragType === targetType) {
      setZoneContents((prev) => {
        const next = { ...prev };
        // Remove from old zone if present
        for (const k of Object.keys(next) as ShapeType[]) {
          if (next[k] === dragType) next[k] = null;
        }
        next[targetType] = dragType;
        const filled = (Object.values(next).filter(Boolean) as ShapeType[]).length;
        onComplete(filled === 3 ? "All shapes matched ✓" : `${filled}/3 shapes placed`);
        return next;
      });
      setErrorMsg(null);
    } else {
      setErrorMsg(`Wrong type — "${dragType}" cannot go in the ${targetType} zone`);
      onComplete("Wrong type dropped — rejection shown");
    }
    setDragType(null);
    setOverZone(null);
  }

  function reset() {
    setZoneContents({ "shape-circle": null, "shape-square": null, "shape-triangle": null });
    setDragType(null);
    setOverZone(null);
    setErrorMsg(null);
    onComplete("No drop attempted");
  }

  const droppedTypes = Object.values(zoneContents).filter(Boolean) as ShapeType[];

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Zones only accept their matching shape type. Rejection feedback has{" "}
        <strong>no</strong> <code>data-testid</code> — locate via{" "}
        <code>role="status"</code>.
      </p>

      <div className={styles.typedArea}>
        {/* Shape items */}
        <div className={styles.shapeRow}>
          {SHAPES.map((shape) => {
            const isDropped = droppedTypes.includes(shape.type);
            return (
              <div
                key={shape.type}
                data-testid="dd-shape"
                data-item-type={shape.type}
                draggable={!isDropped}
                onDragStart={() => { setDragType(shape.type); setErrorMsg(null); }}
                onDragEnd={() => setDragType(null)}
                className={`${styles.shapeItem} ${dragType === shape.type ? styles.shapeItemDragging : ""}`}
                style={{ opacity: isDropped ? 0.25 : 1, cursor: isDropped ? "default" : "grab" }}
                aria-label={`Draggable ${shape.label}`}
              >
                {shape.type === "shape-circle" && <div className={styles.shapeCircle}>●</div>}
                {shape.type === "shape-square" && <div className={styles.shapeSquare}>■</div>}
                {shape.type === "shape-triangle" && (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 54, height: 54 }}>
                    <div className={styles.shapeTriangle} />
                  </div>
                )}
                <span className={styles.shapeLabel}>{shape.label}</span>
              </div>
            );
          })}
        </div>

        {/* Type-restricted zones */}
        <div className={styles.typedZoneRow}>
          {SHAPES.map((shape) => {
            const content = zoneContents[shape.type];
            const isOver  = overZone === shape.type;
            return (
              <div
                key={shape.type}
                data-testid="dd-typed-zone"
                data-accepts={shape.type}
                onDragOver={(e) => { e.preventDefault(); setOverZone(shape.type); }}
                onDragLeave={() => setOverZone(null)}
                onDrop={() => handleDrop(shape.type)}
                className={`${styles.typedZone} ${isOver ? styles.typedZoneOver : ""} ${content ? styles.typedZoneFilled : ""}`}
                aria-label={`Zone for ${shape.label}`}
                aria-dropeffect="move"
              >
                <span className={styles.zoneLabel}>{shape.label} only</span>
                {content ? "✓ Placed" : "Drop here"}
              </div>
            );
          })}
        </div>

        {/* No data-testid on error — intentional: testers must use role/text */}
        {errorMsg && (
          <p role="status" aria-live="polite" className={styles.errorMsg}>
            ✗ {errorMsg}
          </p>
        )}
      </div>

      <button type="button" onClick={reset} className={styles.resetBtn}>
        ↺ Reset shapes
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   S06 · Multi-column board (Challenge)
   Three columns — Backlog / In Progress / Done
   Some cards: data-testid="dd-board-card" + data-card-id
   Others: aria-label only (no data-testid)
══════════════════════════════════════════════════════════════ */
type BoardCol = "backlog" | "in-progress" | "done";

interface BoardCard {
  id: string;
  label: string;
  column: BoardCol;
  /** When false, card has no data-testid — challenge locator */
  hasTestId: boolean;
}

const INITIAL_BOARD: BoardCard[] = [
  { id: "board-card-1", label: "Write API tests",    column: "backlog",     hasTestId: true  },
  { id: "board-card-2", label: "Fix login bug",      column: "backlog",     hasTestId: false }, // no testid — challenge
  { id: "board-card-3", label: "Refactor selectors", column: "in-progress", hasTestId: true  },
  { id: "board-card-4", label: "Review PR #42",      column: "in-progress", hasTestId: false }, // no testid
  { id: "board-card-5", label: "Deploy to staging",  column: "done",        hasTestId: true  },
];

const BOARD_COLS: { id: BoardCol; label: string }[] = [
  { id: "backlog",     label: "Backlog" },
  { id: "in-progress", label: "In Progress" },
  { id: "done",        label: "Done" },
];

function BoardScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [cards, setCards]         = useState<BoardCard[]>(INITIAL_BOARD);
  const [dragId, setDragId]       = useState<string | null>(null);
  const [overColId, setOverColId] = useState<BoardCol | null>(null);

  function moveCard(targetCol: BoardCol) {
    if (!dragId) return;
    setCards((prev) => {
      const next = prev.map((c) => c.id === dragId ? { ...c, column: targetCol } : c);
      const moved = prev.find((c) => c.id === dragId);
      const colLabel = BOARD_COLS.find((c) => c.id === targetCol)?.label ?? targetCol;
      onComplete(`"${moved?.label}" → ${colLabel} ✓`);
      return next;
    });
    setDragId(null);
    setOverColId(null);
  }

  function reset() {
    setCards(INITIAL_BOARD);
    setDragId(null);
    setOverColId(null);
    onComplete("Board untouched");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Some cards have no <code>data-testid</code>. Find them via{" "}
        <code>aria-label</code> or{" "}
        <code>getByRole(&apos;article&apos;,&#123; name: /Fix login/ &#125;)</code>.
      </p>

      <div className={styles.boardGrid}>
        {BOARD_COLS.map((col) => {
          const colCards = cards.filter((c) => c.column === col.id);
          return (
            <div
              key={col.id}
              data-column-id={col.id}
              onDragOver={(e) => { e.preventDefault(); setOverColId(col.id); }}
              onDragLeave={() => setOverColId(null)}
              onDrop={() => moveCard(col.id)}
              className={`${styles.boardColumn} ${overColId === col.id ? styles.boardColumnOver : ""}`}
            >
              <div className={styles.boardHeader}>{col.label}</div>
              <div className={styles.boardBody}>
                {colCards.map((card) => (
                  <article
                    key={card.id}
                    /* data-testid only on some cards — intentional */
                    {...(card.hasTestId ? { "data-testid": "dd-board-card" } : {})}
                    data-card-id={card.id}
                    draggable
                    onDragStart={() => setDragId(card.id)}
                    onDragEnd={() => { setDragId(null); setOverColId(null); }}
                    className={`${styles.boardCard} ${dragId === card.id ? styles.boardCardDragging : ""}`}
                    aria-label={`Board card: ${card.label}`}
                  >
                    {card.label}
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <button type="button" onClick={reset} className={styles.resetBtn}>
        ↺ Reset board
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main PracticeTab
══════════════════════════════════════════════════════════════ */
export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = dragDropScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>
          <div className="flex flex-col gap-[10px]" data-testid="scenarios-list">

            {/* ── S01: Basic drag to drop zone ─────────────────────── */}
            <ScenarioCard {...dragDropScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult }) => (
                <BasicDropScenario
                  onComplete={(msg) => { setResult(msg); if (msg.includes("✓")) markDone("s01"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Multiple labelled zones ──────────────────────── */}
            <ScenarioCard {...dragDropScenarios[1]} onComplete={() => markDone("s02")}>
              {({ setResult }) => (
                <MultiZoneScenario
                  onComplete={(msg) => { setResult(msg); if (msg.includes("All 3")) markDone("s02"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Sortable list reorder ────────────────────────── */}
            <ScenarioCard {...dragDropScenarios[2]} onComplete={() => markDone("s03")}>
              {({ setResult }) => (
                <SortableListScenario
                  onComplete={(msg) => { setResult(msg); if (msg.startsWith("Order:")) markDone("s03"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Kanban column transfer ───────────────────────── */}
            <ScenarioCard {...dragDropScenarios[3]} onComplete={() => markDone("s04")}>
              {({ setResult }) => (
                <KanbanScenario
                  onComplete={(msg) => { setResult(msg); if (msg.includes("✓")) markDone("s04"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Type-restricted zones ────────────────────────── */}
            <ScenarioCard {...dragDropScenarios[4]} onComplete={() => markDone("s05")}>
              {({ setResult }) => (
                <TypedZoneScenario
                  onComplete={(msg) => { setResult(msg); if (msg.includes("All shapes")) markDone("s05"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: Multi-column board challenge ─────────────────── */}
            <ScenarioCard {...dragDropScenarios[5]} onComplete={() => markDone("s06")}>
              {({ setResult }) => (
                <BoardScenario
                  onComplete={(msg) => { setResult(msg); if (msg.includes("✓")) markDone("s06"); }}
                />
              )}
            </ScenarioCard>

          </div>
        </section>

        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
