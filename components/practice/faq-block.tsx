"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { FaqItem } from "@/data/practice-data/types";

interface FaqBlockProps {
  items: FaqItem[];
}

export function FaqBlock({ items }: FaqBlockProps) {
  const [openIds, setOpenIds] = useState<Set<number>>(new Set());

  function toggle(i: number) {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => {
        const isOpen = openIds.has(i);
        return (
          <div
            key={i}
            className="overflow-hidden rounded-[10px] border border-border"
            data-testid={item.testId ?? `faq-${i + 1}`}
          >
            <button
              type="button"
              onClick={() => toggle(i)}
              className="flex w-full items-start justify-between gap-3 bg-card px-4 py-[14px] text-left transition-colors hover:bg-muted/40"
              aria-expanded={isOpen}
            >
              <span className="text-[13.5px] font-semibold text-foreground">
                {item.question}
              </span>
              <span
                className={cn(
                  "mt-[1px] flex-shrink-0 text-[16px] text-muted-foreground transition-transform duration-200",
                  isOpen ? "rotate-90" : ""
                )}
              >
                {">"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-border/50 bg-card px-4 pb-4 pt-3">
                <p
                  className="text-[13px] leading-[1.65] text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: item.answer }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
