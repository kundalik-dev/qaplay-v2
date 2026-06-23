"use client";

import { useState, useMemo } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { datePickerScenarios, frameworkMethods } from "@/data/practice-data/date-picker/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./date-picker.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/* ── Sub-components (extracted to satisfy rules-of-hooks) ───── */

function MonthNav({ onNavigate }: { onNavigate: (label: string) => void }) {
  const now = new Date();
  const [navYear, setNavYear]   = useState(now.getFullYear());
  const [navMonth, setNavMonth] = useState(now.getMonth());

  function goNext() {
    let ny = navYear, nm = navMonth;
    if (nm === 11) { nm = 0; ny++; } else nm++;
    setNavYear(ny); setNavMonth(nm);
    onNavigate(`Navigated to: ${MONTH_NAMES[nm]} ${ny}`);
  }
  function goPrev() {
    let ny = navYear, nm = navMonth;
    if (nm === 0) { nm = 11; ny--; } else nm--;
    setNavYear(ny); setNavMonth(nm);
    onNavigate(`Navigated to: ${MONTH_NAMES[nm]} ${ny}`);
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        data-testid="dp-nav-prev-month"
        aria-label="Previous month"
        onClick={goPrev}
        className="inline-flex items-center justify-center h-8 w-8 rounded border border-input bg-background text-sm hover:bg-accent"
      >
        ‹
      </button>
      <span
        id="dp-nav-month-display"
        data-testid="dp-nav-month-display"
        className="text-sm font-semibold min-w-[140px] text-center"
      >
        {MONTH_NAMES[navMonth]} {navYear}
      </span>
      <button
        type="button"
        data-testid="dp-nav-next-month"
        aria-label="Next month"
        onClick={goNext}
        className="inline-flex items-center justify-center h-8 w-8 rounded border border-input bg-background text-sm hover:bg-accent"
      >
        ›
      </button>
    </div>
  );
}

function RangePicker({ onRangeChange }: { onRangeChange: (label: string) => void }) {
  const [start, setStart] = useState("");
  const [end, setEnd]     = useState("");

  function update(s: string, e: string) {
    if (s && e) onRangeChange(`Range: ${s} → ${e}`);
    else if (s) onRangeChange(`Start: ${s} (end not set)`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="dp-range-start" className="text-xs text-muted-foreground">Start date</label>
        <input
          type="date"
          id="dp-range-start"
          data-testid="dp-range-start"
          value={start}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          onChange={(e) => { setStart(e.target.value); update(e.target.value, end); }}
        />
      </div>
      <span className="text-muted-foreground text-sm mt-4">→</span>
      <div className="flex flex-col gap-1">
        <label htmlFor="dp-range-end" className="text-xs text-muted-foreground">End date</label>
        <input
          type="date"
          id="dp-range-end"
          data-testid="dp-range-end"
          value={end}
          min={start || undefined}
          className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
          onChange={(e) => { setEnd(e.target.value); update(start, e.target.value); }}
        />
      </div>
    </div>
  );
}

const BOOKING_SLOTS = [
  { slot: "morning",   label: "Morning",   date: "2025-08-12", time: "09:00 – 10:00 AM" },
  { slot: "afternoon", label: "Afternoon", date: "2025-08-12", time: "01:00 – 02:00 PM" },
  { slot: "evening",   label: "Evening",   date: "2025-08-12", time: "05:00 – 06:00 PM" },
];

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // Calendar state
  const today = new Date();
  const [calOpen, setCalOpen]         = useState(false);
  const [calYear, setCalYear]         = useState(today.getFullYear());
  const [calMonth, setCalMonth]       = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = datePickerScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  // Build calendar day grid
  const calDays = useMemo(() => {
    const firstDay = new Date(calYear, calMonth, 1).getDay();
    const daysInMonth = new Date(calYear, calMonth + 1, 0).getDate();
    const cells: Array<number | null> = Array(firstDay).fill(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    return cells;
  }, [calYear, calMonth]);

  function goNextMonth() {
    if (calMonth === 11) { setCalMonth(0); setCalYear((y) => y + 1); }
    else setCalMonth((m) => m + 1);
  }

  function goPrevMonth() {
    if (calMonth === 0) { setCalMonth(11); setCalYear((y) => y - 1); }
    else setCalMonth((m) => m - 1);
  }

  function buildDateStr(day: number) {
    const mm = String(calMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${calYear}-${mm}-${dd}`;
  }

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

            {/* ── S01: Basic Date Input ──────────────────────────────────── */}
            <ScenarioCard {...datePickerScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="dp-basic-input"
                    className="text-xs font-medium text-foreground"
                  >
                    Select a date
                  </label>
                  <input
                    type="date"
                    id="dp-basic-input"
                    data-testid="dp-basic-input"
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm text-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-fit"
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val) { setResult(val); markDone("s01"); }
                      else setResult("No date selected");
                    }}
                  />
                </div>
              )}
            </ScenarioCard>

            {/* ── S02: Calendar Open & Select ───────────────────────────── */}
            <ScenarioCard {...datePickerScenarios[1]} onComplete={() => markDone("s02")}>
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    id="dp-calendar-trigger"
                    data-testid="dp-calendar-trigger"
                    aria-haspopup="dialog"
                    aria-expanded={calOpen}
                    onClick={() => setCalOpen((o) => !o)}
                    className="inline-flex items-center gap-2 h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm hover:bg-accent transition-colors w-fit"
                  >
                    <span>📅</span>
                    <span>{selectedDate ?? "Pick a date"}</span>
                  </button>

                  {calOpen && (
                    <div
                      role="dialog"
                      aria-label="Date picker calendar"
                      data-testid="dp-calendar-panel"
                      className={styles.calendarPanel}
                    >
                      <div className={styles.calendarHeader}>
                        <button
                          type="button"
                          id="dp-prev-month"
                          data-testid="dp-prev-month"
                          aria-label="Previous month"
                          className={styles.calendarNavBtn}
                          onClick={goPrevMonth}
                        >
                          ‹
                        </button>
                        <span
                          id="dp-calendar-month-heading"
                          data-testid="dp-calendar-month-heading"
                          className={styles.calendarMonthLabel}
                          aria-live="polite"
                        >
                          {MONTH_NAMES[calMonth]} {calYear}
                        </span>
                        <button
                          type="button"
                          id="dp-next-month"
                          data-testid="dp-next-month"
                          aria-label="Next month"
                          className={styles.calendarNavBtn}
                          onClick={goNextMonth}
                        >
                          ›
                        </button>
                      </div>

                      <div className={styles.calendarGrid} role="grid" aria-label="Calendar days">
                        {WEEKDAYS.map((wd) => (
                          <span key={wd} className={styles.calendarWeekday} role="columnheader">{wd}</span>
                        ))}
                        {calDays.map((day, i) => {
                          if (day === null) {
                            return <span key={`empty-${i}`} className={styles.calendarDayEmpty} aria-hidden="true" />;
                          }
                          const dateStr = buildDateStr(day);
                          const isSelected = dateStr === selectedDate;
                          return (
                            <button
                              key={dateStr}
                              type="button"
                              role="gridcell"
                              data-testid="dp-day-btn"
                              data-date={dateStr}
                              aria-label={dateStr}
                              aria-selected={isSelected}
                              className={`${styles.calendarDay} ${isSelected ? styles.calendarDaySelected : ""}`}
                              onClick={() => {
                                setSelectedDate(dateStr);
                                setCalOpen(false);
                                setResult(`Selected: ${dateStr}`);
                                markDone("s02");
                              }}
                            >
                              {day}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScenarioCard>

            {/* ── S03: Month Navigation ─────────────────────────────────── */}
            <ScenarioCard {...datePickerScenarios[2]} onComplete={() => markDone("s03")}>
              {({ setResult }) => (
                <MonthNav
                  onNavigate={(label) => { setResult(label); markDone("s03"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Date Range Picker ────────────────────────────────── */}
            <ScenarioCard {...datePickerScenarios[3]} onComplete={() => markDone("s04")}>
              {({ setResult }) => (
                <RangePicker
                  onRangeChange={(label) => { setResult(label); markDone("s04"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Constrained Date Input ──────────────────────────── */}
            <ScenarioCard {...datePickerScenarios[4]} onComplete={() => markDone("s05")}>
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <label htmlFor="dp-constrained-input" className="text-xs font-medium text-foreground">
                    Book appointment (Jun – Dec 2025 only)
                  </label>
                  <input
                    type="date"
                    id="dp-constrained-input"
                    data-testid="dp-constrained-input"
                    min="2025-06-01"
                    max="2025-12-31"
                    data-min="2025-06-01"
                    data-max="2025-12-31"
                    className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring w-fit"
                    onChange={(e) => {
                      const el = e.target as HTMLInputElement;
                      if (el.checkValidity()) {
                        setResult(`Valid date: ${el.value}`);
                        markDone("s05");
                      } else {
                        setResult(`Invalid: ${el.value} is out of range`);
                      }
                    }}
                  />
                  <p className="text-xs text-muted-foreground">
                    Min: <code>2025-06-01</code> · Max: <code>2025-12-31</code>
                  </p>
                </div>
              )}
            </ScenarioCard>

            {/* ── S06: Sibling-Located Date Fields (Hard — no testid on inputs) */}
            <ScenarioCard {...datePickerScenarios[5]} onComplete={() => markDone("s06")}>
              {({ setResult }) => (
                <div
                  data-testid="dp-sibling-form"
                  className="flex flex-col gap-1"
                >
                  {/* No data-testid on inputs intentionally — practice XPath siblings */}
                  <div className={styles.fieldRow}>
                    <span className={styles.fieldLabel}>Appointment Date</span>
                    <div className="flex flex-col gap-0.5">
                      <input
                        type="date"
                        name="appointment_date_2025"
                        aria-label="Appointment date"
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        onChange={(e) => {
                          if (e.target.value) {
                            setResult(`Appointment: ${e.target.value}`);
                            markDone("s06");
                          }
                        }}
                      />
                      <p className={styles.fieldHint}>For your next visit</p>
                    </div>
                  </div>
                  <div className={styles.fieldRow}>
                    <span className={styles.fieldLabel}>Return Date</span>
                    <div className="flex flex-col gap-0.5">
                      <input
                        type="date"
                        name="return_date_2025"
                        aria-label="Return date"
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring"
                        onChange={(e) => {
                          if (e.target.value) {
                            setResult(`Return: ${e.target.value}`);
                            markDone("s06");
                          }
                        }}
                      />
                      <p className={styles.fieldHint}>Expected return visit</p>
                    </div>
                  </div>
                </div>
              )}
            </ScenarioCard>

            {/* ── S07: Booking Cards — Scoped Locator (Medium) ─────────── */}
            <ScenarioCard {...datePickerScenarios[6]} onComplete={() => markDone("s07")}>
              {({ setResult }) => (
                <div className={styles.bookingCardsGrid} data-testid="booking-cards-list">
                  {BOOKING_SLOTS.map(({ slot, label, date, time }) => (
                    <article
                      key={slot}
                      data-testid="booking-card"
                      data-slot={slot}
                      data-booking-date={date}
                      className={styles.bookingCard}
                    >
                      <span className={styles.bookingSlotLabel}>{label}</span>
                      <span className={styles.bookingDate}>{date}</span>
                      <span className={styles.bookingTime}>{time}</span>
                      <button
                        type="button"
                        aria-label={`Book ${label} slot on ${date}`}
                        className="mt-1 inline-flex items-center justify-center rounded-md border border-input bg-background px-3 h-8 text-xs font-medium hover:bg-accent transition-colors"
                        onClick={() => {
                          setResult(`Booked: ${label} — ${date} ${time}`);
                          markDone("s07");
                        }}
                      >
                        Book
                      </button>
                    </article>
                  ))}
                </div>
              )}
            </ScenarioCard>

            {/* ── S08: Dynamic Date Display — Challenge (no testid) ─────── */}
            <ScenarioCard {...datePickerScenarios[7]} onComplete={() => markDone("s08")}>
              {({ setResult }) => {
                const todayStr = new Date().toLocaleDateString();
                return (
                  <div
                    data-testid="dp-dynamic-section"
                    className="flex flex-col gap-2"
                  >
                    <p className="text-xs text-muted-foreground">
                      The date below is rendered dynamically. Locate it without <code>data-testid</code>.
                    </p>
                    <div className="flex items-center gap-3 rounded-md border border-dashed border-border p-3">
                      <span className="text-xs text-muted-foreground">Today&apos;s date:</span>
                      {/* No data-testid intentionally — challenge element */}
                      <span
                        id="dynamic-date-display"
                        data-date-generated="true"
                        className="text-sm font-semibold text-foreground"
                      >
                        {todayStr}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setResult(`Asserted: ${todayStr}`);
                        markDone("s08");
                      }}
                      className="inline-flex items-center justify-center h-8 rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent transition-colors w-fit"
                    >
                      Assert today&apos;s date
                    </button>
                  </div>
                );
              }}
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
