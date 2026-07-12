"use client";

import { useState, useEffect } from "react";
import { ListChecks } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

export default function TestCasesPage() {
  const [completedCases, setCompletedCases] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("bank-test-cases-done");
    if (saved) {
      try {
        setCompletedCases(JSON.parse(saved));
      } catch (e) {}
    }
    setMounted(true);
  }, []);

  const toggleTestCase = (id: string, checked: boolean) => {
    const next = { ...completedCases, [id]: checked };
    setCompletedCases(next);
    localStorage.setItem("bank-test-cases-done", JSON.stringify(next));
  };

  if (!mounted) return null;

  return (
    <div className="max-w-5xl" data-testid="test-cases-page">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 dark:bg-violet-900/30">
          <ListChecks className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Automation Test Cases
          </h1>
          <p className="text-sm text-slate-500">
            Track and verify test scenarios across the bank app.
          </p>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4 flex w-full justify-start overflow-x-auto overflow-y-hidden rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
          {TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="flex-1 whitespace-nowrap rounded-lg text-sm font-medium data-[state=active]:bg-violet-100 data-[state=active]:text-violet-700 dark:data-[state=active]:bg-violet-900/50 dark:data-[state=active]:text-violet-100"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id} className="focus:outline-none">
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                    <tr>
                      <th className="px-4 py-3 font-medium w-12">Done</th>
                      <th className="px-4 py-3 font-medium">ID & Name</th>
                      <th className="px-4 py-3 font-medium">Expected Result</th>
                      <th className="px-4 py-3 font-medium w-24">Severity</th>
                      <th className="px-4 py-3 font-medium w-24">Priority</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    {tab.data.map((tc: TestCase) => {
                      const isChecked = !!completedCases[tc.id];
                      return (
                        <tr key={tc.id} className={isChecked ? "bg-slate-50/50 dark:bg-slate-800/20" : ""}>
                          <td className="px-4 py-4 align-top">
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={(checked) => toggleTestCase(tc.id, !!checked)}
                              aria-label={`Mark ${tc.id} as done`}
                            />
                          </td>
                          <td className="px-4 py-4 align-top">
                            <div className="font-semibold text-slate-900 dark:text-white mb-1">
                              {tc.id}
                            </div>
                            <div className="text-slate-700 dark:text-slate-300 font-medium mb-3">
                              {tc.name}
                            </div>
                            <Accordion type="single" collapsible className="w-full">
                              <AccordionItem value="steps" className="border-none">
                                <AccordionTrigger className="py-1 text-xs text-violet-600 hover:text-violet-700 hover:no-underline dark:text-violet-400">
                                  Show Steps
                                </AccordionTrigger>
                                <AccordionContent className="pt-2 pb-1">
                                  <div className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/50">
                                    {tc.steps.map((step, idx) => (
                                      <div key={idx} className="flex gap-2 text-slate-700 dark:text-slate-300">
                                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-200 text-[10px] font-bold text-violet-800 dark:bg-violet-900/50 dark:text-violet-300">
                                          {idx + 1}
                                        </span>
                                        <span>{step}</span>
                                      </div>
                                    ))}
                                  </div>
                                </AccordionContent>
                              </AccordionItem>
                            </Accordion>
                          </td>
                          <td className="px-4 py-4 align-top text-slate-600 dark:text-slate-400">
                            {tc.expected}
                          </td>
                          <td className="px-4 py-4 align-top">
                            <Badge variant={tc.severity === "High" ? "destructive" : tc.severity === "Medium" ? "default" : "secondary"}>
                              {tc.severity}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 align-top">
                            <Badge variant="outline">{tc.priority}</Badge>
                          </td>
                        </tr>
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
