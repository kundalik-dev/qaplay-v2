import Link from "next/link";
import { ArrowRight } from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { uiPracticeNavItems } from "@/data/ui-practice-nav-data";

/**
 * Overview card grid for the /ui-practice setup page.
 * Reads from the same nav data that drives the sidebar, so adding a new
 * section only requires one edit in data/ui-practice-nav-data.ts.
 */
export function UiPracticeOverview() {
  return (
    <section
      data-testid="ui-practice-overview"
      data-section="ui-practice-overview"
    >
      <div className="mb-8">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          UI Practice
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          A standalone set of UI elements for practicing Playwright, Selenium,
          and Cypress locators. Pick a section from the sidebar to get started.
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
        data-testid="ui-practice-card-grid"
      >
        {uiPracticeNavItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`ui-practice-card-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              data-card={item.label.toLowerCase().replace(/\s+/g, "-")}
              className="group/link block"
            >
              <Card className="h-full transition-shadow group-hover/link:shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon
                      className="h-4 w-4 text-muted-foreground"
                      aria-hidden="true"
                    />
                    {item.label}
                  </CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    Open section
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
