"use client";

import { useState } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  tabsWindowsScenarios,
  frameworkMethods,
} from "@/data/practice-data/tabs-windows/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./tabs-windows.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

const PRACTICE_URL = "/practice/tabs-windows";

const MULTI_TABS = [
  { id: "tw-tab-a", label: "Open Tab A", url: "/" },
  { id: "tw-tab-b", label: "Open Tab B", url: "/practice" },
  { id: "tw-tab-c", label: "Open Tab C", url: "/practice/links" },
];

const REGISTRY_TABS = [
  { tabId: "tab-a", name: "Tab A", url: "/", status: "Open" },
  { tabId: "tab-b", name: "Tab B", url: "/practice", status: "Open" },
  { tabId: "tab-c", name: "Tab C", url: "/practice/links", status: "Open" },
];

/* ── Reusable small button ───────────────────────────────────── */
function ActionBtn({
  children,
  onClick,
  variant = "default",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "default" | "outline" | "ghost";
}) {
  const base =
    "inline-flex items-center justify-center gap-1.5 h-8 rounded-md px-3 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer";
  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline:
      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [openedTabs, setOpenedTabs] = useState<Set<string>>(new Set());
  const [focusedTab, setFocusedTab] = useState<string | null>(null);

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  function openTab(url: string, id: string) {
    window.open(url, "_blank", "noopener,noreferrer");
    setOpenedTabs((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = tabsWindowsScenarios.map((s) => ({
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
          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            {/* ── S01: Open Link in New Tab ─────────────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    id="tw-open-new-tab"
                    data-testid="tw-open-new-tab"
                    href={PRACTICE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
                    onClick={() => {
                      setResult(
                        "New tab opened → assert context.pages().length === 2",
                      );
                      markDone("s01");
                    }}
                  >
                    🔗 Open in New Tab
                  </a>
                  <span className="text-xs text-muted-foreground">
                    target=<code>&quot;_blank&quot;</code>
                  </span>
                </div>
              )}
            </ScenarioCard>

            {/* ── S02: Open Multiple Tabs ───────────────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <div
                  data-testid="tw-multi-tab-panel"
                  className={styles.multiTabPanel}
                >
                  {MULTI_TABS.map(({ id, label, url }) => (
                    <button
                      key={id}
                      type="button"
                      id={id}
                      data-testid={id}
                      data-tab-url={url}
                      className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs font-medium transition-colors ${
                        openedTabs.has(id)
                          ? "border-primary/40 bg-primary/5 text-primary"
                          : "border-input bg-background hover:bg-accent"
                      }`}
                      onClick={() => {
                        openTab(url, id);
                        const opened = new Set([...openedTabs, id]);
                        setResult(
                          `${opened.size} tab${opened.size > 1 ? "s" : ""} opened`,
                        );
                        if (opened.size === MULTI_TABS.length) markDone("s02");
                      }}
                    >
                      {openedTabs.has(id) ? "✓" : "↗"} {label}
                    </button>
                  ))}
                </div>
              )}
            </ScenarioCard>

            {/* ── S03: Switch Back to Original Tab ─────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <div className="flex flex-wrap gap-2">
                  <a
                    id="tw-open-and-return"
                    data-testid="tw-open-and-return"
                    href={PRACTICE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
                    onClick={() =>
                      setResult("New tab opened — now switch back to this tab")
                    }
                  >
                    ↗ Open New Tab
                  </a>
                  <ActionBtn
                    variant="outline"
                    onClick={() => {
                      setResult("Switched back to original tab ✓");
                      markDone("s03");
                    }}
                  >
                    ← Mark as Returned
                  </ActionBtn>
                </div>
              )}
            </ScenarioCard>

            {/* ── S04: Assert New Tab URL and Title ────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <a
                    id="tw-assert-tab-btn"
                    data-testid="tw-assert-tab-btn"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-expected-url-contains="qaplayground"
                    data-expected-title-contains="QA"
                    className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
                    onClick={() => {
                      setResult(
                        "Tab opened → assert newPage.url() and newPage.title()",
                      );
                      markDone("s04");
                    }}
                  >
                    ↗ Open & Assert URL + Title
                  </a>
                  <p className="text-xs text-muted-foreground">
                    Hint attributes: <code>data-expected-url-contains</code>,{" "}
                    <code>data-expected-title-contains</code>
                  </p>
                </div>
              )}
            </ScenarioCard>

            {/* ── S05: Close a Tab ─────────────────────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <div className="flex flex-wrap gap-2">
                  <a
                    id="tw-close-tab-btn"
                    data-testid="tw-close-tab-btn"
                    href={PRACTICE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
                    onClick={() =>
                      setResult("New tab opened → call newPage.close()")
                    }
                  >
                    ↗ Open Tab
                  </a>
                  <ActionBtn
                    variant="outline"
                    onClick={() => {
                      setResult("Tab closed → context.pages().length === 1 ✓");
                      markDone("s05");
                    }}
                  >
                    ✕ Mark as Closed
                  </ActionBtn>
                </div>
              )}
            </ScenarioCard>

            {/* ── S06: Window Popup ────────────────────────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    id="tw-popup-btn"
                    data-testid="tw-popup-btn"
                    data-popup-url={PRACTICE_URL}
                    className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium shadow-sm transition-colors hover:bg-accent"
                    onClick={() => {
                      window.open(
                        PRACTICE_URL,
                        "qa-popup",
                        "width=800,height=600,noopener,noreferrer",
                      );
                      setResult(
                        "Popup opened via window.open() → capture with waitForEvent('popup')",
                      );
                      markDone("s06");
                    }}
                  >
                    🪟 Open Popup Window
                  </button>
                  <p className="text-xs text-muted-foreground">
                    Uses <code>window.open()</code> with explicit size —
                    Playwright captures via{" "}
                    <code>page.waitForEvent(&apos;popup&apos;)</code>
                  </p>
                </div>
              )}
            </ScenarioCard>

            {/* ── S07: Sibling Tab Buttons — Medium (no testid on btns) ── */}
            <ScenarioCard
              {...tabsWindowsScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult }) => (
                <div
                  data-testid="tw-sibling-panel"
                  className={styles.siblingPanel}
                >
                  <p className={styles.siblingPanelLabel}>Tab Launcher Panel</p>
                  {/* No data-testid on buttons intentionally */}
                  {["Open Tab A", "Open Tab B", "Open Tab C"].map(
                    (label, i) => (
                      <button
                        key={label}
                        type="button"
                        aria-label={label}
                        className="inline-flex h-8 w-fit items-center gap-1.5 rounded-md border border-input bg-background px-3 text-xs font-medium transition-colors hover:bg-accent"
                        onClick={() => {
                          window.open(
                            MULTI_TABS[i].url,
                            "_blank",
                            "noopener,noreferrer",
                          );
                          setResult(`${label} opened via sibling locator`);
                          markDone("s07");
                        }}
                      >
                        ↗ {label}
                      </button>
                    ),
                  )}
                </div>
              )}
            </ScenarioCard>

            {/* ── S08: Dynamic Tab Registry — Challenge ────────────────── */}
            <ScenarioCard
              {...tabsWindowsScenarios[7]}
              onComplete={() => markDone("s08")}
            >
              {({ setResult }) => (
                <div
                  data-testid="tw-registry-panel"
                  className="overflow-x-auto"
                >
                  <p className="mb-2 text-xs text-muted-foreground">
                    No <code>data-testid</code> on rows or buttons. Use XPath by
                    cell text or <code>data-tab-id</code>.
                  </p>
                  <table
                    className={styles.registryTable}
                    aria-label="Open tab registry"
                  >
                    <thead>
                      <tr>
                        <th>Tab Name</th>
                        <th>URL</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REGISTRY_TABS.map(({ tabId, name, url, status }) => (
                        <tr key={tabId} data-tab-id={tabId}>
                          <td>{name}</td>
                          <td>
                            <code className="text-[11px]">{url}</code>
                          </td>
                          <td>
                            <span
                              className={`${styles.tabBadge} ${focusedTab === tabId ? styles.tabBadgeOpen : ""}`}
                            >
                              {focusedTab === tabId ? "Active" : status}
                            </span>
                          </td>
                          <td>
                            {/* No data-testid on Focus button — challenge */}
                            <button
                              type="button"
                              aria-label={`Focus ${name}`}
                              className="inline-flex h-7 items-center rounded border border-input bg-background px-2 text-[11px] font-medium transition-colors hover:bg-accent"
                              onClick={() => {
                                setFocusedTab(tabId);
                                setResult(`Focused: ${name} (${url})`);
                                markDone("s08");
                              }}
                            >
                              Focus
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </ScenarioCard>
          </div>
        </section>

        <aside
          className={styles.practiceSidebar}
          data-testid="practice-sidebar"
        >
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
