"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { LearnCodeSnippet } from "@/data/practice-data/types";
import styles from "./code-block.module.css";

type FwKey = "pw" | "sel" | "cy";

const FW_LABELS: Record<FwKey, string> = {
  pw: "Playwright",
  sel: "Selenium",
  cy: "Cypress",
};

interface LearnCodeBlockProps {
  snippets: LearnCodeSnippet;
}

export function LearnCodeBlock({ snippets }: LearnCodeBlockProps) {
  const [active, setActive] = useState<FwKey>("pw");
  const [copied, setCopied] = useState(false);

  const current = snippets[active];

  function handleCopy() {
    navigator.clipboard.writeText(current.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  }

  return (
    <div>
      {/* Framework tabs */}
      <div className="mb-0 flex max-w-full gap-1 overflow-x-auto">
        {(Object.keys(FW_LABELS) as FwKey[]).map((fw) => (
          <button
            key={fw}
            onClick={() => setActive(fw)}
            className={cn(
              "flex-shrink-0 rounded-t-[6px] border border-b-0 px-3 py-[5px] text-[12px] font-semibold transition-all",
              active === fw
                ? "practice-learn-tab-active"
                : "practice-learn-tab",
            )}
          >
            {FW_LABELS[fw]}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="practice-code-shell overflow-hidden rounded-[0_6px_6px_6px] border">
        {/* Code header bar */}
        <div className="practice-code-header flex items-center justify-between px-[14px] py-2">
          <span className="practice-code-label font-[family-name:var(--font-ibm-plex-mono)] text-[11px] font-semibold">
            {current.lang}
          </span>
          <button
            onClick={handleCopy}
            className="practice-copy-button rounded-[4px] border px-2 py-[3px] text-[11px] font-semibold transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Code content */}
        <pre
          className={cn(
            "m-0 overflow-x-auto bg-[#1a1f2e] px-4 py-4",
            styles.codeBody,
          )}
        >
          <code
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px] leading-[1.7] text-[#e2e8f0]"
            dangerouslySetInnerHTML={{ __html: current.code }}
          />
        </pre>
      </div>
    </div>
  );
}
