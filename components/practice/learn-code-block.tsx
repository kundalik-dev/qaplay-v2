"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { LearnCodeSnippet } from "@/data/practice-data/types";
import styles from "./code-block.module.css";

type FwKey = "pw" | "sel" | "cy";

const FW_LABELS: Record<FwKey, string> = {
  pw:  "Playwright",
  sel: "Selenium",
  cy:  "Cypress",
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
      <div className="flex gap-1 mb-0">
        {(Object.keys(FW_LABELS) as FwKey[]).map((fw) => (
          <button
            key={fw}
            onClick={() => setActive(fw)}
            className={cn(
              "px-3 py-[5px] rounded-t-[6px] text-[12px] font-semibold border border-b-0 transition-all",
              active === fw
                ? "bg-card text-foreground border-border"
                : "bg-muted text-muted-foreground border-transparent"
            )}
          >
            {FW_LABELS[fw]}
          </button>
        ))}
      </div>

      {/* Code block */}
      <div className="border border-border rounded-[0_6px_6px_6px] overflow-hidden">
        {/* Code header bar */}
        <div className="flex items-center justify-between px-[14px] py-2 bg-[#1a1f2e]">
          <span className="text-[11px] text-[#64748b] font-[family-name:var(--font-ibm-plex-mono)]">
            {current.lang}
          </span>
          <button
            onClick={handleCopy}
            className="text-[11px] px-2 py-[3px] rounded-[4px] border border-[#334155] bg-transparent text-[#64748b] hover:bg-[#334155] hover:text-[#e2e8f0] transition-all"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        {/* Code content */}
        <pre className={cn("px-4 py-4 bg-[#1a1f2e] overflow-x-auto m-0", styles.codeBody)}>
          <code
            className="font-[family-name:var(--font-ibm-plex-mono)] text-[12.5px] leading-[1.7] text-[#e2e8f0]"
            dangerouslySetInnerHTML={{ __html: current.code }}
          />
        </pre>
      </div>
    </div>
  );
}
