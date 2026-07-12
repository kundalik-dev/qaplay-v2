"use client";

import { Fragment, useState, useEffect } from "react";
import { ChevronDown, ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

import dashboardData from "../data/bank-demo-test-cases/dashboard.json";
import accountData from "../data/bank-demo-test-cases/account.json";
import transferData from "../data/bank-demo-test-cases/transfer.json";
import sendMoneyData from "../data/bank-demo-test-cases/send-money.json";
import billPayData from "../data/bank-demo-test-cases/bill-pay.json";
import transactionData from "../data/bank-demo-test-cases/transaction.json";
import applyLoanData from "../data/bank-demo-test-cases/apply-loan.json";

interface TestCase {
  id: string;
  name: string;
  expected: string;
  severity: string;
  priority: string;
  steps: string[];
}

const TABS = [
  { id: "dashboard", label: "Dashboard", data: dashboardData },
  { id: "account", label: "Account", data: accountData },
  { id: "transfer", label: "Transfer", data: transferData },
  { id: "send-money", label: "Send Money", data: sendMoneyData },
  { id: "bill-pay", label: "Bill Pay", data: billPayData },
  { id: "transaction", label: "Transaction", data: transactionData },
  { id: "apply-loan", label: "Apply Loan", data: applyLoanData },
];

const SEVERITY_STYLES: Record<string, string> = {
  High: "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300",
  Medium:
    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
  Low: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
};

const PRIORITY_STYLES: Record<string, string> = {
  P1: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-300",
  P2: "border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
  P3: "border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400",
};

export default function TestCasesPage() {
  const [completedCases, setCompletedCases] = useState<
    Record<string, boolean>
  >({});
  const [expandedCases, setExpandedCases] = useState<Record<string, boolean>>(
    {},
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bank-test-cases-done");
    if (saved) {
      try {
        setCompletedCases(JSON.parse(saved));
      } catch {
        // Ignore malformed localStorage data
      }
    }
    setMounted(true);
  }, []);

  const toggleTestCase = (id: string, checked: boolean) => {
    const next = { ...completedCases, [id]: checked };
    setCompletedCases(next);
    localStorage.setItem("bank-test-cases-done", JSON.stringify(next));
  };

  const toggleSteps = (id: string) => {
    setExpandedCases((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  if (!mounted) return null;

  return (
    <div data-testid="test-cases-page" data-section="test-cases">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
          <ListChecks
            className="h-5 w-5 text-violet-600"
            aria-hidden="true"
          />
        </div>
        <div>
          <h1
            className="text-xl font-bold text-slate-900 dark:text-white"
            data-testid="test-cases-page-title"
          >
            Automation Test Cases
          </h1>
          <p className="text-sm text-slate-500">
            Track and verify test scenarios across the bank app
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList
          className="mb-4 flex w-full justify-start gap-1 overflow-x-auto overflow-y-hidden rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900"
          data-testid="test-cases-tab-list"
        >
          {TABS.map((tab) => {
            const doneCount = tab.data.filter(
              (tc: TestCase) => completedCases[tc.id],
            ).length;
            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                data-testid={`test-cases-tab-${tab.id}`}
                className="flex-1 items-center gap-1.5 rounded-lg text-sm font-medium whitespace-nowrap data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-900/50 dark:data-[state=active]:text-violet-100"
              >
                {tab.label}
                <span
                  className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                  data-testid={`test-cases-tab-${tab.id}-count`}
                >
                  {doneCount}/{tab.data.length}
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent
            key={tab.id}
            value={tab.id}
            className="focus:outline-none"
          >
            <div
              className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
              data-testid="test-cases-table-wrapper"
            >
              <div className="overflow-x-auto">
                <table
                  className="w-full text-left text-sm"
                  data-testid="test-cases-table"
                  aria-label={`${tab.label} test cases`}
                >
                  <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                    <tr>
                      <th className="w-12 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Done
                      </th>
                      <th className="w-28 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        ID
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Name
                      </th>
                      <th className="w-20 px-4 py-3 text-center text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Steps
                      </th>
                      <th className="px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Expected Result
                      </th>
                      <th className="w-28 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Severity
                      </th>
                      <th className="w-20 px-4 py-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                        Priority
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tab.data.map((tc: TestCase) => {
                      const isChecked = !!completedCases[tc.id];
                      const isExpanded = !!expandedCases[tc.id];
                      return (
                        <Fragment key={tc.id}>
                          {/*
                           * Medium locator: shared data-testid + unique data-case-id
                           * Practice:
                           *   page.getByTestId('test-case-row').filter({ hasText: 'TC-LOAN-004' })
                           *   page.locator('[data-testid="test-case-row"][data-case-id="TC-LOAN-004"]')
                           */}
                          <tr
                            className={[
                              "transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40",
                              isChecked
                                ? "bg-emerald-50/40 dark:bg-emerald-900/10"
                                : "",
                            ].join(" ")}
                            data-testid="test-case-row"
                            data-case-id={tc.id}
                            data-done={isChecked}
                            data-severity={tc.severity.toLowerCase()}
                            data-priority={tc.priority.toLowerCase()}
                          >
                            <td className="px-4 py-4 align-top">
                              <Checkbox
                                checked={isChecked}
                                onCheckedChange={(checked) =>
                                  toggleTestCase(tc.id, !!checked)
                                }
                                aria-label={`Mark ${tc.id} as done`}
                                data-testid="test-case-done-checkbox"
                              />
                            </td>
                            <td
                              className="px-4 py-4 align-top font-mono text-xs font-semibold text-slate-500 dark:text-slate-400"
                              data-testid="test-case-id"
                            >
                              {tc.id}
                            </td>
                            <td
                              className="px-4 py-4 align-top font-medium text-slate-900 dark:text-white"
                              data-testid="test-case-name"
                            >
                              {tc.name}
                            </td>
                            <td className="px-4 py-4 text-center align-top">
                              {/* Beginner: getByTestId("test-case-steps-toggle") */}
                              <button
                                type="button"
                                onClick={() => toggleSteps(tc.id)}
                                aria-expanded={isExpanded}
                                aria-label={`${isExpanded ? "Hide" : "Show"} steps for ${tc.id}`}
                                data-testid="test-case-steps-toggle"
                                className={[
                                  "inline-flex h-7 w-7 items-center justify-center rounded-md border transition-colors",
                                  isExpanded
                                    ? "border-violet-200 bg-violet-100 text-violet-700 dark:border-violet-800 dark:bg-violet-900/40 dark:text-violet-300"
                                    : "border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800",
                                ].join(" ")}
                              >
                                <ChevronDown
                                  className={[
                                    "h-4 w-4 transition-transform",
                                    isExpanded ? "rotate-180" : "",
                                  ].join(" ")}
                                  aria-hidden="true"
                                />
                              </button>
                            </td>
                            <td
                              className="px-4 py-4 align-top text-slate-600 dark:text-slate-400"
                              data-testid="test-case-expected"
                            >
                              {tc.expected}
                            </td>
                            <td className="px-4 py-4 align-top">
                              <Badge
                                className={
                                  SEVERITY_STYLES[tc.severity] ??
                                  "bg-slate-100 text-slate-600"
                                }
                                data-testid="test-case-severity-badge"
                              >
                                {tc.severity}
                              </Badge>
                            </td>
                            <td className="px-4 py-4 align-top">
                              <Badge
                                variant="outline"
                                className={
                                  PRIORITY_STYLES[tc.priority] ??
                                  "border-slate-200 text-slate-600"
                                }
                                data-testid="test-case-priority-badge"
                              >
                                {tc.priority}
                              </Badge>
                            </td>
                          </tr>

                          {isExpanded && (
                            <tr
                              data-testid="test-case-steps-row"
                              data-case-id={tc.id}
                              className="bg-slate-50/60 dark:bg-slate-800/20"
                            >
                              <td />
                              <td colSpan={6} className="px-4 pt-0 pb-4">
                                <ol
                                  className="flex flex-col gap-1.5 border-l-2 border-violet-200 py-1 pl-4 text-left dark:border-violet-800"
                                  data-testid="test-case-steps"
                                >
                                  {tc.steps.map((step, idx) => (
                                    <li
                                      key={idx}
                                      className="flex gap-2 text-left text-sm text-slate-600 dark:text-slate-300"
                                    >
                                      <span
                                        className="w-4 shrink-0 text-right text-xs font-semibold text-violet-500 dark:text-violet-400"
                                        aria-hidden="true"
                                      >
                                        {idx + 1}.
                                      </span>
                                      <span className="text-left">{step}</span>
                                    </li>
                                  ))}
                                </ol>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
