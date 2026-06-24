"use client";

import { useState } from "react";
import { LayoutTemplate, Code2 } from "lucide-react";
import { GithubProfileSearch } from "./github-profile-search";
import { TestCasesTab } from "./test-cases-tab";

export function GithubSearchTabs() {
  const [activeTab, setActiveTab] = useState<"ui" | "tests">("ui");

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="border-b border-border sticky top-[60px] z-10 bg-background/80 backdrop-blur-md">
        <div className="max-w-[1100px] mx-auto px-4 sm:px-7">
          <nav className="flex gap-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab("ui")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "ui"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              data-testid="tab-ui"
            >
              <LayoutTemplate size={18} />
              Application UI
            </button>
            <button
              onClick={() => setActiveTab("tests")}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === "tests"
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
              data-testid="tab-tests"
            >
              <Code2 size={18} />
              Test Cases
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {activeTab === "ui" ? (
          <div className="animate-in fade-in duration-500">
            <GithubProfileSearch />
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            <TestCasesTab />
          </div>
        )}
      </div>
    </div>
  );
}
