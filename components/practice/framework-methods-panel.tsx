"use client";

import { useState } from "react";
import { Clapperboard, GraduationCap } from "lucide-react";

import { cn } from "@/lib/utils";
import type { FrameworkMethods } from "@/data/practice-data/types";

type FwKey = "selenium" | "playwright" | "cypress";

const DOT_COLORS: Record<string, string> = {
  purple: "bg-[#a855f7]",
  blue: "bg-[#3b82f6]",
  orange: "bg-[#f97316]",
  green: "bg-[#22c55e]",
  yellow: "bg-[#eab308]",
};

const FW_TABS: Array<{ id: FwKey; short: string }> = [
  { id: "selenium", short: "Selenium" },
  { id: "playwright", short: "Playwright" },
  { id: "cypress", short: "Cypress" },
];

interface FrameworkMethodsPanelProps {
  methods: Record<FwKey, FrameworkMethods>;
}

export function FrameworkMethodsPanel({ methods }: FrameworkMethodsPanelProps) {
  const [active, setActive] = useState<FwKey>("selenium");
  const current = methods[active];

  return (
    <div className="practice-side-card overflow-hidden">
      {/* Panel header */}
      <div className="practice-side-card-header flex items-center justify-between px-4 py-[14px]">
        <span className="practice-side-title text-[13px]">
          What You&apos;ll Learn
        </span>
        <GraduationCap
          aria-hidden="true"
          className="h-4 w-4 text-[var(--secondary)]"
        />
      </div>

      <div className="p-4">
        {/* Framework tab switcher */}
        <div className="mb-[14px] flex overflow-hidden rounded-[6px] border border-border">
          {FW_TABS.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setActive(fw.id)}
              data-fw={fw.id}
              className={cn(
                "flex-1 px-2 py-[11px] text-center text-[11.5px] font-semibold transition-all",
                "border-r border-border last:border-r-0",
                active === fw.id
                  ? "practice-framework-tab-active"
                  : "practice-framework-tab bg-transparent",
              )}
            >
              {fw.short}
            </button>
          ))}
        </div>

        {/* Method list */}
        <div className="mb-[10px]">
          <div className="practice-side-kicker mb-2 text-[9.5px] tracking-[0.08em] uppercase">
            {current.label}
          </div>
          <ul className="flex list-none flex-col gap-[5px]">
            {current.methods.map((m, i) => (
              <li
                key={i}
                className="practice-side-muted flex items-center gap-[7px] text-[12.5px]"
              >
                <span
                  className={cn(
                    "h-[7px] w-[7px] flex-shrink-0 rounded-full",
                    DOT_COLORS[m.color] ?? "bg-muted",
                  )}
                />
                <code className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px]">
                  {m.label}
                </code>
              </li>
            ))}
          </ul>
        </div>

        {/* Video placeholder */}
        <div className="practice-side-notice mt-[14px] flex items-center gap-[7px] rounded-[6px] border border-dashed px-3 py-2.5 text-[12px] font-medium">
          <Clapperboard aria-hidden="true" className="h-3.5 w-3.5" />
          Tutorial video coming soon
        </div>
      </div>
    </div>
  );
}
