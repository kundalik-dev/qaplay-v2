"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FrameworkMethods } from "@/data/practice-data/types";

type FwKey = "selenium" | "playwright" | "cypress";

const DOT_COLORS: Record<string, string> = {
  purple: "bg-[#a855f7]",
  blue:   "bg-[#3b82f6]",
  orange: "bg-[#f97316]",
  green:  "bg-[#22c55e]",
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
    <div className="bg-card border border-border rounded-[10px] overflow-hidden">
      {/* Panel header */}
      <div className="flex items-center justify-between px-4 py-[14px] border-b border-border/50">
        <span className="text-[13px] font-bold text-foreground">What You'll Learn</span>
        <span>🎓</span>
      </div>

      <div className="p-4">
        {/* Framework tab switcher */}
        <div className="flex border border-border rounded-[6px] overflow-hidden mb-[14px]">
          {FW_TABS.map((fw) => (
            <button
              key={fw.id}
              onClick={() => setActive(fw.id)}
              data-fw={fw.id}
              className={cn(
                "flex-1 px-2 py-[11px] text-[11.5px] font-semibold text-center transition-all",
                "border-r border-border last:border-r-0",
                active === fw.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {fw.short}
            </button>
          ))}
        </div>

        {/* Method list */}
        <div className="mb-[10px]">
          <div className="text-[9.5px] font-bold uppercase tracking-[0.08em] text-muted-foreground mb-2">
            {current.label}
          </div>
          <ul className="flex flex-col gap-[5px] list-none">
            {current.methods.map((m, i) => (
              <li key={i} className="flex items-center gap-[7px] text-[12.5px] text-muted-foreground">
                <span
                  className={cn("w-[7px] h-[7px] rounded-full flex-shrink-0", DOT_COLORS[m.color] ?? "bg-muted")}
                />
                <code className="font-[family-name:var(--font-ibm-plex-mono)] text-[11.5px]">
                  {m.label}
                </code>
              </li>
            ))}
          </ul>
        </div>

        {/* Video placeholder */}
        <div className="flex items-center gap-[7px] text-[12px] text-muted-foreground px-3 py-2.5 bg-muted rounded-[6px] border border-dashed border-border mt-[14px]">
          🎬 Tutorial video coming soon
        </div>
      </div>
    </div>
  );
}
