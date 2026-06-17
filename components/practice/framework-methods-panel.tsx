"use client";

import { useState } from "react";
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
    <div className="overflow-hidden rounded-[10px] border border-border bg-card">
      {/* Panel header */}
      <div className="flex items-center justify-between border-b border-border/50 px-4 py-[14px]">
        <span className="text-[13px] font-bold text-foreground">
          What You'll Learn
        </span>
        <span>🎓</span>
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
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {fw.short}
            </button>
          ))}
        </div>

        {/* Method list */}
        <div className="mb-[10px]">
          <div className="mb-2 text-[9.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            {current.label}
          </div>
          <ul className="flex list-none flex-col gap-[5px]">
            {current.methods.map((m, i) => (
              <li
                key={i}
                className="flex items-center gap-[7px] text-[12.5px] text-muted-foreground"
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
        <div className="mt-[14px] flex items-center gap-[7px] rounded-[6px] border border-dashed border-border bg-muted px-3 py-2.5 text-[12px] text-muted-foreground">
          🎬 Tutorial video coming soon
        </div>
      </div>
    </div>
  );
}
