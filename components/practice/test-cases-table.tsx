"use client";

import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TestCase } from "@/data/practice-data/types";
import styles from "./test-cases-table.module.css";

type Difficulty = "Beginner" | "Intermediate" | "Advanced";
type SortKey = "id" | "scenario" | "type" | "difficulty";
type SortDirection = "asc" | "desc";

interface DerivedTestCase {
  raw: TestCase;
  kindLabel: string;
  difficulty: Difficulty;
}

interface TestCasesTableProps {
  testCases: TestCase[];
}

const PAGE_SIZE = 6;

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function deriveDifficulty(priority: TestCase["priority"]): Difficulty {
  if (priority === "high") return "Advanced";
  if (priority === "medium") return "Intermediate";
  return "Beginner";
}

function difficultyRank(value: Difficulty) {
  if (value === "Beginner") return 1;
  if (value === "Intermediate") return 2;
  return 3;
}

function getDifficultyDot(value: Difficulty) {
  if (value === "Beginner") return "var(--success)";
  if (value === "Intermediate") return "var(--warning)";
  return "var(--danger)";
}

export function TestCasesTable({ testCases }: TestCasesTableProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all");
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ key: SortKey; direction: SortDirection }>({
    key: "scenario",
    direction: "asc",
  });

  const derivedCases = useMemo<DerivedTestCase[]>(
    () =>
      testCases.map((testCase) => ({
        raw: testCase,
        kindLabel: titleCase(testCase.type),
        difficulty: deriveDifficulty(testCase.priority),
      })),
    [testCases],
  );

  const filteredCases = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = derivedCases.filter((item) => {
      const matchesFilter = filter === "all" || item.difficulty === filter;
      const haystack = [
        item.raw.id,
        item.raw.scenario,
        item.kindLabel,
        item.difficulty,
      ]
        .join(" ")
        .toLowerCase();

      return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
    });

    return [...filtered].sort((a, b) => {
      let left: string | number;
      let right: string | number;

      switch (sort.key) {
        case "scenario":
          left = a.raw.scenario;
          right = b.raw.scenario;
          break;
        case "id":
          left = a.raw.id;
          right = b.raw.id;
          break;
        case "type":
          left = a.kindLabel;
          right = b.kindLabel;
          break;
        case "difficulty":
          left = difficultyRank(a.difficulty);
          right = difficultyRank(b.difficulty);
          break;
      }

      if (left < right) return sort.direction === "asc" ? -1 : 1;
      if (left > right) return sort.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [derivedCases, filter, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredCases.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pagedCases = filteredCases.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleSort(key: SortKey) {
    setSort((prev) =>
      prev.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" },
    );
  }

  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  const startIndex = filteredCases.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const endIndex = Math.min(currentPage * PAGE_SIZE, filteredCases.length);

  return (
    <section className={styles.root} data-testid="test-cases-table">
      <div className={styles.toolbar}>
        <label className={styles.searchShell}>
          <Search size={16} className={styles.searchIcon} />
          <input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            className={styles.searchInput}
            placeholder="Search scenarios..."
            aria-label="Search test cases"
          />
        </label>

        <div className={styles.filterRow} role="tablist" aria-label="Difficulty filters">
          {(["all", "Beginner", "Intermediate", "Advanced"] as const).map((option) => {
            const isActive = filter === option;
            return (
              <button
                key={option}
                type="button"
                className={cn(styles.filterBtn, isActive && styles.filterBtnActive)}
                onClick={() => {
                  setFilter(option);
                  setPage(1);
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <div className={styles.tableScroller}>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {(
                  [
                    ["expand", ""],
                    ["id", "ID"],
                    ["scenario", "Scenario"],
                    ["type", "Type"],
                    ["difficulty", "Difficulty"],
                  ] as const
                ).map(([key, label]) => {
                  if (key === "expand") {
                    return <th key={key} className={styles.expandHeadCell} aria-label="Expand row" />;
                  }

                  const isSorted = sort.key === key;
                  const isAsc = isSorted && sort.direction === "asc";
                  const isDesc = isSorted && sort.direction === "desc";

                  return (
                    <th key={key} className={isSorted ? styles.thSorted : undefined}>
                      <span className={styles.thInner} onClick={() => handleSort(key)}>
                        {label}
                        <span className={styles.sortIcon} aria-hidden="true">
                          <span className={cn(styles.sortUp, isAsc && styles.sortActive)} />
                          <span className={cn(styles.sortDown, isDesc && styles.sortActive)} />
                        </span>
                      </span>
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {pagedCases.map((item) => {
                const { raw } = item;
                const isExpanded = expanded.has(raw.id);

                return (
                  <Fragment key={raw.id}>
                    <tr
                      className={cn(styles.tbodyRow, isExpanded && styles.tbodyRowExpanded)}
                      data-testid={`tc-row-${raw.id.toLowerCase()}`}
                      onClick={() => toggleExpanded(raw.id)}
                    >
                      <td className={styles.expandCell}>
                        <span
                          className={cn(
                            styles.expandIcon,
                            isExpanded && styles.expandIconOpen,
                          )}
                          aria-hidden="true"
                        >
                          <ChevronDown size={16} />
                        </span>
                      </td>

                      <td className={styles.idCell}>{raw.id}</td>

                      <td className={styles.scenarioCell}>
                        <div className={styles.cellMeta}>
                          <span>
                            <span className={styles.cellTitle}>{raw.scenario}</span>
                            <span className={styles.cellSub}>Test case</span>
                          </span>
                        </div>
                      </td>

                      <td className={styles.mutedCell}>{item.kindLabel}</td>

                      <td>
                        <span className={styles.diff}>
                          <span
                            className={styles.diffDot}
                            style={{ background: getDifficultyDot(item.difficulty) }}
                          />
                          {item.difficulty}
                        </span>
                      </td>
                    </tr>

                    {isExpanded && (
                      <tr className={styles.detailsRow}>
                        <td colSpan={5}>
                          <div className={styles.detailsWrap}>
                            <div className={styles.detailsCard}>
                              {raw.description ? (
                                <p className={styles.detailsText}>{raw.description}</p>
                              ) : null}
                              <ol className={styles.steps}>
                                {raw.steps.map((step, index) => (
                                  <li key={index} className={styles.step}>
                                    <span className={styles.stepNum}>{index + 1}</span>
                                    <span
                                      className={styles.stepBody}
                                      dangerouslySetInnerHTML={{ __html: step }}
                                    />
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className={styles.tableFooter}>
          <span className={styles.tableInfo}>
            Showing {startIndex}-{endIndex} of {filteredCases.length} results
          </span>

          <div className={styles.pagination}>
            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((value) => Math.max(1, value - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
              <button
                key={pageNumber}
                type="button"
                className={cn(
                  styles.pageBtn,
                  currentPage === pageNumber && styles.pageBtnCurrent,
                )}
                onClick={() => setPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              type="button"
              className={styles.pageBtn}
              onClick={() => setPage((value) => Math.min(totalPages, value + 1))}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
