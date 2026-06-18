"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { HighlightedLearnCodeSnippet } from "@/data/practice-data/types";
import styles from "./code-block.module.css";

type FwKey = "pw" | "sel" | "cy";

const FW_LABELS: Record<FwKey, string> = {
  pw: "Playwright",
  sel: "Selenium",
  cy: "Cypress",
};

interface LearnCodeBlockProps {
  snippets: HighlightedLearnCodeSnippet;
}

export function LearnCodeBlock({ snippets }: LearnCodeBlockProps) {
  const [active, setActive] = useState<FwKey>("pw");
  const [copied, setCopied] = useState(false);

  const current = snippets[active];

  function handleCopy() {
    // Copy the original plain-text code, not the HTML
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
        {/* Header bar */}
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

        {/* Shiki-highlighted code — the transformer already stripped the
            inline background so bg-[#1a1f2e] from the outer shell applies. */}
        <div
          className={cn(
            "overflow-x-auto bg-[#1a1f2e]",
            "[&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:px-4 [&_pre]:py-4",
            "[&_code]:font-[family-name:var(--font-ibm-plex-mono)] [&_code]:text-[12.5px] [&_code]:leading-[1.7]",
            styles.codeBody,
          )}
          dangerouslySetInnerHTML={{ __html: current.html }}
        />
      </div>
    </div>
  );
}
