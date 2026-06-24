"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const testCases = [
  {
    id: "GH-001",
    title: "Search for valid user",
    type: "positive" as const,
    steps: [
      "Enter 'kundalik-dev' in the search input using <code>getByLabel('GitHub Username')</code>",
      "Click the Search button using <code>getByRole('button', { name: 'Search' })</code>",
      "Verify that the user's name is displayed",
      "Verify that the 'Repositories' stat value is greater than 0 by locating <code>[data-stat-type=\"repos\"]</code>",
    ],
    expected:
      "The profile card renders correctly with accurate repository stats.",
  },
  {
    id: "GH-002",
    title: "Search for invalid user",
    type: "negative" as const,
    steps: [
      "Enter 'invalid-user-xyz-123' in the search input",
      "Click the Search button",
      "Wait for the error message using <code>getByTestId('error-message')</code>",
    ],
    expected:
      "An error message 'User not found' should be displayed and the profile card should not render.",
  },
  {
    id: "GH-003",
    title: "Locate User Biography",
    type: "challenge" as const,
    steps: [
      "Search for a valid user",
      "Locate the biography text by finding the paragraph that is a sibling of the hidden <code>Biography</code> span. Use XPath: <code>//span[text()='Biography']/following-sibling::p</code>",
    ],
    expected:
      "The correct bio text is successfully retrieved from the DOM.",
  },
  {
    id: "GH-004",
    title: "Extract Location without data-testid",
    type: "challenge" as const,
    steps: [
      "Search for 'kundalik-dev'",
      "Locate the Location detail text without using a direct test ID. Hint: Use the <code>aria-label=\"Location\"</code> icon and find its sibling <code>span.detail-text</code>",
    ],
    expected:
      "The correct location text or 'Not specified' is successfully retrieved.",
  },
];

const typeBadge: Record<
  "positive" | "negative" | "challenge",
  { label: string; className: string }
> = {
  positive: {
    label: "Positive",
    className: "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
  },
  negative: {
    label: "Negative",
    className: "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
  challenge: {
    label: "Challenge",
    className: "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
  },
};

export function TestCasesTab() {
  return (
    <div className="w-full max-w-[1100px] mx-auto px-4 sm:px-7 pb-10">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-4 pt-2">
        <h2 className="text-base font-semibold text-foreground">
          Automation Test Cases
        </h2>
        <Badge variant="secondary" className="text-xs">
          {testCases.length} Scenarios
        </Badge>
      </div>

      {/* Accordion card */}
      <Card>
        <CardContent className="p-0">
          <Accordion className="divide-y divide-border">
            {testCases.map((tc) => (
              <AccordionItem key={tc.id} value={tc.id} className="border-none">
                <AccordionTrigger className="px-5 py-4 hover:no-underline hover:bg-muted/40 rounded-none transition-colors">
                  <div className="flex items-center gap-3 flex-1 min-w-0 pr-3">
                    {/* ID chip */}
                    <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                      {tc.id}
                    </span>
                    {/* Title */}
                    <span className="text-sm font-medium text-foreground truncate">
                      {tc.title}
                    </span>
                    {/* Type badge */}
                    <span
                      className={`ml-auto text-[10px] font-semibold uppercase px-2 py-0.5 rounded shrink-0 ${typeBadge[tc.type].className}`}
                    >
                      {typeBadge[tc.type].label}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pb-5 pt-1">
                  <div className="space-y-4">
                    {/* Steps */}
                    <div>
                      <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                        Steps
                      </p>
                      <ol className="space-y-1.5 list-none">
                        {tc.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="shrink-0 size-5 rounded-full bg-muted flex items-center justify-center text-[11px] font-semibold text-foreground mt-0.5">
                              {idx + 1}
                            </span>
                            <span
                              className="[&_code]:bg-muted [&_code]:text-primary [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-[11px] [&_code]:font-mono"
                              dangerouslySetInnerHTML={{ __html: step }}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expected result */}
                    <div className="flex gap-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-lg px-4 py-3">
                      <CheckCircle2 className="text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5 size-4" />
                      <div>
                        <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                          Expected Result
                        </p>
                        <p className="text-sm text-foreground/80">{tc.expected}</p>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
