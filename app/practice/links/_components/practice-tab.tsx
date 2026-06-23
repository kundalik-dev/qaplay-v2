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
  linksScenarios,
  frameworkMethods,
} from "@/data/practice-data/links/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./links.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = linksScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  const handleApiClick = async (
    setResult: (res: string) => void,
    status: number,
    label: string,
  ) => {
    setResult(`Status Code: ${status} (${label})`);
    markDone("s07");
  };

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
            {/* Scenario 1: Internal Following Links */}
            <ScenarioCard
              {...linksScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-1.5">
                  <a
                    id="link-internal-home"
                    data-testid="link-internal-home"
                    className="w-fit text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    href="/"
                    onClick={() => {
                      setResult("Navigating to Home...");
                      markDone("s01");
                    }}
                  >
                    Home
                  </a>
                  <a
                    id="link-internal-about"
                    data-testid="link-internal-about"
                    className="w-fit text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    href="/about-us"
                    onClick={() => {
                      setResult("Navigating to About Us...");
                      markDone("s01");
                    }}
                  >
                    About Us
                  </a>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 2: External Links (New Tab) */}
            <ScenarioCard
              {...linksScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-1.5">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-external-selenium"
                    data-testid="link-external-selenium"
                    className="w-fit text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    href="https://www.javatpoint.com/selenium-tutorial"
                    onClick={() => {
                      setResult("Opened Selenium Tutorial in new tab");
                      markDone("s02");
                    }}
                  >
                    Selenium Automation Notes
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-external-course"
                    data-testid="link-external-course"
                    className="w-fit text-sm text-blue-600 underline hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                    href="https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/"
                    onClick={() => {
                      setResult("Opened Course in new tab");
                      markDone("s02");
                    }}
                  >
                    Selenium Complete Course
                  </a>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 3: Broken Links */}
            <ScenarioCard
              {...linksScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-1.5">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-broken-newtab"
                    data-testid="link-broken-newtab"
                    className="w-fit text-sm text-red-600 underline hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    href="https://the-internet.herokuapp.com/status_codes/500"
                    onClick={() => {
                      setResult("Clicked broken link (new tab)");
                      markDone("s03");
                    }}
                  >
                    Broken Link — Opens in New Tab
                  </a>
                  <a
                    id="link-broken-same"
                    data-testid="link-broken-same"
                    className="w-fit text-sm text-red-600 underline hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    href="https://the-internet.herokuapp.com/status_codes/500"
                    onClick={() => {
                      setResult("Clicked broken link (same tab)");
                      markDone("s03");
                    }}
                  >
                    Broken Link — Same Tab
                  </a>
                  <a
                    id="link-broken-empty"
                    data-testid="link-broken-empty"
                    className="w-fit text-sm text-red-600 underline hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setResult("Clicked empty href");
                      markDone("s03");
                    }}
                  >
                    Broken Link — Empty href
                  </a>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 4: Image Links */}
            <ScenarioCard
              {...linksScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    id="link-image-broken"
                    data-testid="link-image-broken"
                    aria-label="Broken image link"
                    onClick={(e) => {
                      e.preventDefault();
                      setResult("Clicked broken image link");
                      markDone("s04");
                    }}
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded border border-dashed border-gray-300 bg-gray-50 text-center text-[10px] text-muted-foreground dark:border-gray-600 dark:bg-gray-800">
                      Broken Image
                    </div>
                  </a>
                  <a
                    href="https://ashisheditz.com/?s=iron+man"
                    target="_blank"
                    rel="noopener noreferrer"
                    id="link-image-ironman"
                    data-testid="link-image-ironman"
                    aria-label="Iron Man image link"
                    onClick={() => {
                      setResult("Clicked Iron Man image link");
                      markDone("s04");
                    }}
                  >
                    {/* Using a standard img tag because next/image requires configured domains */}
                    <img
                      src="https://ashisheditz.com/wp-content/uploads/2023/10/4k-iron-man-wallpaper.jpg"
                      className="h-14 w-20 rounded object-cover shadow"
                      alt="Iron Man"
                      width="80"
                    />
                  </a>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 5: Button Links */}
            <ScenarioCard
              {...linksScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <div className="flex flex-wrap gap-2">
                  <a
                    id="link-btn-broken"
                    data-testid="link-btn-broken"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setResult("Clicked Broken Button");
                      markDone("s05");
                    }}
                  >
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium whitespace-nowrap text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Broken Button
                    </button>
                  </a>
                  <a
                    id="link-btn-broken-2"
                    data-testid="link-btn-broken-2"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setResult("Clicked Broken Link Button");
                      markDone("s05");
                    }}
                  >
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-medium whitespace-nowrap text-destructive-foreground shadow-sm transition-colors hover:bg-destructive/90 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Broken Link Button
                    </button>
                  </a>
                  <a
                    id="link-btn-home"
                    data-testid="link-btn-home"
                    href="/"
                    onClick={() => {
                      setResult("Navigating Home via Button");
                      markDone("s05");
                    }}
                  >
                    <button className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50">
                      Home Button
                    </button>
                  </a>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 6: Text Links & Anchor */}
            <ScenarioCard
              {...linksScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <div className="flex flex-col gap-1.5">
                  <a
                    id="link-text-garbled-1"
                    data-testid="link-text-garbled-1"
                    className="w-fit text-sm text-blue-700 underline dark:text-blue-400"
                    href="/"
                    onClick={() => {
                      setResult("Clicked Garbled Link 1");
                      markDone("s06");
                    }}
                  >
                    Homdf56e
                  </a>
                  <a
                    id="link-text-garbled-2"
                    data-testid="link-text-garbled-2"
                    className="w-fit text-sm text-blue-700 underline dark:text-blue-400"
                    href="/about-us"
                    onClick={() => {
                      setResult("Clicked Garbled Link 2");
                      markDone("s06");
                    }}
                  >
                    About 32 yhs
                  </a>
                  <a
                    id="link-text-long"
                    data-testid="link-text-long"
                    className="w-fit text-sm text-blue-700 underline dark:text-blue-400"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setResult("Clicked Long Text Link");
                      markDone("s06");
                    }}
                  >
                    Test Links Page using Selenium Webdriver with Java and C#
                  </a>
                  <a
                    id="link-text-anchor"
                    data-testid="link-text-anchor"
                    className="w-fit text-sm text-blue-700 underline dark:text-blue-400"
                    href="#anchor-target"
                    onClick={() => {
                      setResult("Navigated to #anchor-target");
                      markDone("s06");
                    }}
                  >
                    Links Anchor Text — Test Cases TC09
                  </a>
                  <div
                    id="anchor-target"
                    data-testid="anchor-target"
                    className="mt-2 scroll-mt-24 rounded bg-muted p-2 text-xs text-muted-foreground"
                  >
                    ↑ Anchor target reached
                  </div>
                </div>
              )}
            </ScenarioCard>

            {/* Scenario 7: API Status Code Links */}
            <ScenarioCard
              {...linksScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult }) => (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() =>
                      handleApiClick(setResult, 201, "Create User")
                    }
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Create User (201)
                  </button>
                  <button
                    onClick={() => handleApiClick(setResult, 204, "No Content")}
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    No Content (204)
                  </button>
                  <button
                    onClick={() => handleApiClick(setResult, 301, "Moved")}
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Moved (301)
                  </button>
                  <button
                    onClick={() =>
                      handleApiClick(setResult, 400, "Bad Request")
                    }
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Bad Request (400)
                  </button>
                  <button
                    onClick={() =>
                      handleApiClick(setResult, 401, "Unauthorized")
                    }
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Unauthorized (401)
                  </button>
                  <button
                    onClick={() => handleApiClick(setResult, 403, "Forbidden")}
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Forbidden (403)
                  </button>
                  <button
                    onClick={() => handleApiClick(setResult, 404, "Not Found")}
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-xs font-medium whitespace-nowrap shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    Not Found (404)
                  </button>
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
