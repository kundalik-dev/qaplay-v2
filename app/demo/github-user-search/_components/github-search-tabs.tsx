"use client";

import { GithubProfileSearch } from "./github-profile-search";
import { TestCasesTab } from "./test-cases-tab";

export function GithubSearchTabs() {
  return (
    <div className="w-full">
      <GithubProfileSearch />
      <TestCasesTab />
    </div>
  );
}
