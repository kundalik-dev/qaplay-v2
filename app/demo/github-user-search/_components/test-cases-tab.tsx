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
    expected: "The correct bio text is successfully retrieved from the DOM.",
  },
  {
    id: "GH-004",
    title: "Extract Location without data-testid",
    type: "challenge" as const,
    steps: [
      "Search for 'kundalik-dev'",
      'Locate the Location detail text without using a direct test ID. Hint: Use the <code>aria-label="Location"</code> icon and find its sibling <code>span.detail-text</code>',
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
    className:
      "bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-800",
  },
  negative: {
    label: "Negative",
    className:
      "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950 dark:text-red-400 dark:border-red-800",
  },
  challenge: {
    label: "Challenge",
    className:
      "bg-violet-50 text-violet-700 border border-violet-200 dark:bg-violet-950 dark:text-violet-400 dark:border-violet-800",
  },
};

export function TestCasesTab() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-10 sm:px-7">
      {/* Section header */}
      <div className="mb-4 flex items-center gap-3 pt-2">
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
                <AccordionTrigger className="rounded-none px-5 py-4 transition-colors hover:bg-muted/40 hover:no-underline">
                  <div className="flex min-w-0 flex-1 items-center gap-3 pr-3">
                    {/* ID chip */}
                    <span className="shrink-0 rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
                      {tc.id}
                    </span>
                    {/* Title */}
                    <span className="truncate text-sm font-medium text-foreground">
                      {tc.title}
                    </span>
                    {/* Type badge */}
                    <span
                      className={`ml-auto shrink-0 rounded px-2 py-0.5 text-[10px] font-semibold uppercase ${typeBadge[tc.type].className}`}
                    >
                      {typeBadge[tc.type].label}
                    </span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="px-5 pt-1 pb-5">
                  <div className="space-y-4">
                    {/* Steps */}
                    <div>
                      <p className="mb-2 text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                        Steps
                      </p>
                      <ol className="list-none space-y-1.5">
                        {tc.steps.map((step, idx) => (
                          <li
                            key={idx}
                            className="flex gap-2.5 text-sm text-muted-foreground"
                          >
                            <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-[11px] font-semibold text-foreground">
                              {idx + 1}
                            </span>
                            <span
                              className="[&_code]:rounded [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[11px] [&_code]:text-primary"
                              dangerouslySetInnerHTML={{ __html: step }}
                            />
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Expected result */}
                    <div className="flex gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/40">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <div>
                        <p className="mb-1 text-[11px] font-semibold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
                          Expected Result
                        </p>
                        <p className="text-sm text-foreground/80">
                          {tc.expected}
                        </p>
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
