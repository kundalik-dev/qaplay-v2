"use client";

import { useState, useRef, useEffect } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { multiSelectScenarios, frameworkMethods } from "@/data/practice-data/multi-select/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./multi-select.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ── S01 + S02: Native multi-select ─────────────────────────── */
function NativeSelectScenario({
  multi,
  onComplete,
}: {
  multi: boolean;
  onComplete: (msg: string) => void;
}) {
  const selectRef = useRef<HTMLSelectElement>(null);

  function handleChange() {
    const el = selectRef.current;
    if (!el) return;
    const chosen = [...el.selectedOptions].map((o) => o.text);
    if (chosen.length > 0) onComplete(chosen.join(", ") + " selected");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        {multi
          ? "Hold Ctrl / Cmd to select multiple options."
          : "Click to select a single option."}
      </p>
      <select
        id="ms-native-select"
        data-testid="ms-native-select"
        ref={selectRef}
        multiple={multi}
        size={4}
        className={styles.nativeSelect}
        onChange={handleChange}
      >
        <option value="playwright">Playwright</option>
        <option value="cypress">Cypress</option>
        <option value="selenium">Selenium</option>
        <option value="webdriverio">WebdriverIO</option>
      </select>
    </div>
  );
}

/* ── S03: Deselect scenario ──────────────────────────────────── */
function DeselectScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [armed, setArmed] = useState(false);

  function selectAll() {
    const el = selectRef.current;
    if (!el) return;
    for (const opt of el.options) opt.selected = true;
    setArmed(true);
  }

  function handleChange() {
    const el = selectRef.current;
    if (!el) return;
    const chosen = [...el.selectedOptions].map((o) => o.text);
    onComplete(`Remaining selected: ${chosen.join(", ") || "none"}`);
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        data-testid="ms-deselect-trigger"
        onClick={selectAll}
        disabled={armed}
        className="inline-flex items-center h-8 w-fit rounded-md px-3 text-xs font-medium border border-input bg-background shadow-sm hover:bg-accent transition-colors disabled:opacity-50"
      >
        {armed ? "✓ All pre-selected" : "▶ Pre-select All"}
      </button>
      {armed && (
        <p className="text-[11px] text-muted-foreground">
          Now Ctrl+click "Selenium" to deselect it, or use <code>selectOption</code> with remaining values.
        </p>
      )}
      <select
        data-testid="ms-native-select"
        ref={selectRef}
        multiple
        size={4}
        className={styles.nativeSelect}
        onChange={handleChange}
      >
        <option value="playwright">Playwright</option>
        <option value="cypress">Cypress</option>
        <option value="selenium">Selenium</option>
        <option value="webdriverio">WebdriverIO</option>
      </select>
    </div>
  );
}

/* ── S04 + S05: Custom checkbox dropdown ─────────────────────── */
const CUSTOM_OPTIONS = [
  { value: "react",   label: "React" },
  { value: "vue",     label: "Vue.js" },
  { value: "angular", label: "Angular" },
  { value: "svelte",  label: "Svelte" },
];

function CustomDropdownScenario({
  showBulk,
  onComplete,
}: {
  showBulk: boolean;
  onComplete: (msg: string) => void;
}) {
  const [open, setOpen]         = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  function toggle(value: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value); else next.add(value);
      const labels = CUSTOM_OPTIONS.filter((o) => next.has(o.value)).map((o) => o.label);
      onComplete(labels.length ? labels.join(", ") + " selected" : "Nothing selected");
      return next;
    });
  }

  function selectAll() {
    const all = new Set(CUSTOM_OPTIONS.map((o) => o.value));
    setSelected(all);
    onComplete("All selected");
  }

  function clearAll() {
    setSelected(new Set());
    onComplete("Cleared — nothing selected");
  }

  const count = selected.size;

  return (
    <div className="flex flex-col gap-3">
      <div className="relative" ref={ref}>
        <button
          type="button"
          data-testid="ms-custom-trigger"
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className={`${styles.customTrigger} ${open ? styles.customTriggerOpen : ""}`}
        >
          {count > 0 ? `${count} selected` : "Select frameworks"}
          {count > 0 && <span className={styles.selectionBadge}>{count}</span>}
          <span className={`${styles.caret} ${open ? styles.caretOpen : ""}`}>▾</span>
        </button>

        {open && (
          <div
            role="listbox"
            aria-multiselectable="true"
            aria-label="Framework options"
            data-testid="ms-custom-panel"
          >
            <div className={styles.customPanel}>
              {showBulk && (
                <>
                  <div
                    className={styles.bulkActions}
                    data-testid="ms-bulk-panel"
                  >
                    <button
                      type="button"
                      data-testid="ms-select-all-btn"
                      className={styles.bulkBtn}
                      onClick={selectAll}
                    >
                      Select All
                    </button>
                    <button
                      type="button"
                      data-testid="ms-clear-all-btn"
                      className={styles.bulkBtn}
                      onClick={clearAll}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className={styles.panelDivider} />
                </>
              )}
              {CUSTOM_OPTIONS.map((opt) => {
                const isSelected = selected.has(opt.value);
                return (
                  <div
                    key={opt.value}
                    role="option"
                    aria-selected={isSelected}
                    data-testid="ms-custom-option"
                    data-value={opt.value}
                    onClick={() => toggle(opt.value)}
                    className={`${styles.customOption} ${isSelected ? styles.customOptionSelected : ""}`}
                  >
                    <span className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ""}`}>
                      {isSelected && "✓"}
                    </span>
                    {opt.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      {count > 0 && (
        <p className="text-[11px] text-muted-foreground">
          Selected: <strong>{CUSTOM_OPTIONS.filter((o) => selected.has(o.value)).map((o) => o.label).join(", ")}</strong>
        </p>
      )}
    </div>
  );
}

/* ── S06: Tag / pill removal ─────────────────────────────────── */
const INITIAL_TAGS = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python",     label: "Python" },
  { value: "java",       label: "Java" },
];

function TagRemovalScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [tags, setTags] = useState(INITIAL_TAGS);

  function remove(value: string) {
    setTags((prev) => {
      const next = prev.filter((t) => t.value !== value);
      const removed = INITIAL_TAGS.find((t) => t.value === value)?.label ?? value;
      onComplete(`"${removed}" tag removed — ${next.length} remaining`);
      return next;
    });
  }

  function reset() {
    setTags(INITIAL_TAGS);
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Remove button has <strong>no</strong> <code>data-testid</code>. Target via parent{" "}
        <code>[data-tag-value]</code> → child button.
      </p>
      <ul className={styles.tagList} data-testid="ms-tag-list" aria-label="Selected tags">
        {tags.map((tag) => (
          <li
            key={tag.value}
            data-testid="ms-tag"
            data-tag-value={tag.value}
            className={styles.tag}
          >
            {tag.label}
            {/* Intentionally no data-testid on this button */}
            <button
              type="button"
              aria-label={`Remove ${tag.label}`}
              onClick={() => remove(tag.value)}
              className={styles.tagRemove}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {tags.length === 0 && (
        <p className="text-[11px] text-muted-foreground italic">All tags removed.</p>
      )}
      <button
        type="button"
        onClick={reset}
        className="inline-flex items-center h-7 w-fit rounded px-3 text-xs font-medium border border-input bg-background hover:bg-accent transition-colors"
      >
        ↺ Reset Tags
      </button>
    </div>
  );
}

/* ── S07: Searchable multi-select ───────────────────────────── */
const SEARCH_OPTIONS = [
  { id: "opt-react",      label: "React" },
  { id: "opt-vue",        label: "Vue.js" },
  { id: "opt-angular",    label: "Angular" },
  { id: "opt-svelte",     label: "Svelte" },
  { id: "opt-next",       label: "Next.js" },
  { id: "opt-nuxt",       label: "Nuxt" },
];

function SearchableScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  const [query, setQuery]     = useState("");
  const [chosen, setChosen]   = useState<string[]>([]);
  const [open, setOpen]       = useState(false);

  const filtered = SEARCH_OPTIONS.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase()),
  );

  function selectOption(id: string) {
    const opt = SEARCH_OPTIONS.find((o) => o.id === id);
    if (!opt) return;
    setChosen((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      const labels = next.map((i) => SEARCH_OPTIONS.find((o) => o.id === i)?.label ?? i);
      onComplete(labels.length ? labels.join(", ") + " chosen" : "Nothing chosen");
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className={styles.searchWrapper}>
        <input
          id="ms-search-input"
          data-testid="ms-search-input"
          role="combobox"
          aria-expanded={open}
          aria-controls="ms-search-results"
          aria-label="Search frameworks"
          placeholder="Type to search…"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          className={styles.searchInput}
          autoComplete="off"
        />
        {open && (
          <div
            id="ms-search-results"
            data-testid="ms-search-results"
            role="listbox"
            aria-multiselectable="true"
            aria-label="Search results"
            className={styles.searchResults}
          >
            {filtered.length === 0 ? (
              <div className="px-3 py-2 text-xs text-muted-foreground">No results</div>
            ) : (
              filtered.map((opt) => {
                const isSelected = chosen.includes(opt.id);
                return (
                  <div
                    key={opt.id}
                    role="option"
                    aria-selected={isSelected}
                    data-option-id={opt.id}
                    onMouseDown={(e) => { e.preventDefault(); selectOption(opt.id); }}
                    className={`${styles.searchOption} ${isSelected ? styles.searchOptionSelected : ""}`}
                  >
                    <span style={{ fontSize: 11 }}>{isSelected ? "✓" : "○"}</span>
                    {opt.label}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {chosen.length > 0 && (
        <div>
          <p className="text-[11px] text-muted-foreground mb-1">Chosen:</p>
          <ul
            data-testid="ms-search-chosen"
            className={styles.chosenList}
            aria-label="Chosen frameworks"
          >
            {chosen.map((id) => {
              const opt = SEARCH_OPTIONS.find((o) => o.id === id);
              return (
                <li key={id} className={styles.chosenChip}>
                  {opt?.label ?? id}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ── S08: Grouped optgroup select ────────────────────────────── */
function GroupedSelectScenario({ onComplete }: { onComplete: (msg: string) => void }) {
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const chosen = [...e.target.selectedOptions].map((o) => o.text);
    if (chosen.length > 0) onComplete(chosen.join(", ") + " selected");
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] text-muted-foreground">
        Options are grouped with <code>&lt;optgroup&gt;</code>. No <code>data-testid</code> on
        the groups — target via XPath:{" "}
        <code>//optgroup[@label=&apos;Backend&apos;]//option[@value=&apos;node&apos;]</code>.
      </p>
      {/* No data-testid on optgroups intentionally */}
      <select
        id="ms-grouped-select"
        data-testid="ms-grouped-select"
        multiple
        size={8}
        className={styles.groupedSelect}
        onChange={handleChange}
      >
        <optgroup label="Frontend">
          <option value="react">React</option>
          <option value="vue">Vue.js</option>
          <option value="angular">Angular</option>
        </optgroup>
        <optgroup label="Backend">
          <option value="node">Node.js</option>
          <option value="django">Django</option>
          <option value="spring">Spring Boot</option>
        </optgroup>
        <optgroup label="Testing">
          <option value="playwright">Playwright</option>
          <option value="cypress">Cypress</option>
        </optgroup>
      </select>
    </div>
  );
}

/* ── Main PracticeTab ────────────────────────────────────────── */
export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = multiSelectScenarios.map((s) => ({
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

            {/* ── S01: Select single option (native) ───────────────── */}
            <ScenarioCard {...multiSelectScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult }) => (
                <NativeSelectScenario
                  multi={false}
                  onComplete={(msg) => { setResult(msg); markDone("s01"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Select multiple options (native) ────────────── */}
            <ScenarioCard {...multiSelectScenarios[1]} onComplete={() => markDone("s02")}>
              {({ setResult }) => (
                <NativeSelectScenario
                  multi={true}
                  onComplete={(msg) => { setResult(msg); markDone("s02"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Deselect ────────────────────────────────────── */}
            <ScenarioCard {...multiSelectScenarios[2]} onComplete={() => markDone("s03")}>
              {({ setResult }) => (
                <DeselectScenario
                  onComplete={(msg) => { setResult(msg); markDone("s03"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Custom checkbox dropdown ────────────────────── */}
            <ScenarioCard {...multiSelectScenarios[3]} onComplete={() => markDone("s04")}>
              {({ setResult }) => (
                <CustomDropdownScenario
                  showBulk={false}
                  onComplete={(msg) => { setResult(msg); markDone("s04"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Select All / Clear All ──────────────────────── */}
            <ScenarioCard {...multiSelectScenarios[4]} onComplete={() => markDone("s05")}>
              {({ setResult }) => (
                <CustomDropdownScenario
                  showBulk={true}
                  onComplete={(msg) => { setResult(msg); markDone("s05"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: Tag / pill removal (Hard) ───────────────────── */}
            <ScenarioCard {...multiSelectScenarios[5]} onComplete={() => markDone("s06")}>
              {({ setResult }) => (
                <TagRemovalScenario
                  onComplete={(msg) => { setResult(msg); markDone("s06"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S07: Searchable multi-select (Hard) ──────────────── */}
            <ScenarioCard {...multiSelectScenarios[6]} onComplete={() => markDone("s07")}>
              {({ setResult }) => (
                <SearchableScenario
                  onComplete={(msg) => { setResult(msg); markDone("s07"); }}
                />
              )}
            </ScenarioCard>

            {/* ── S08: Grouped optgroup (Challenge) ────────────────── */}
            <ScenarioCard {...multiSelectScenarios[7]} onComplete={() => markDone("s08")}>
              {({ setResult }) => (
                <GroupedSelectScenario
                  onComplete={(msg) => { setResult(msg); markDone("s08"); }}
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
