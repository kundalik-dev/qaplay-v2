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
            className="border border-border rounded-[10px] overflow-hidden"
            data-testid={item.testId ?? `faq-${i + 1}`}
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start justify-between gap-3 px-4 py-[14px] text-left bg-card hover:bg-muted/40 transition-colors"
              aria-expanded={isOpen}
            >
              <span className="text-[13.5px] font-semibold text-foreground">{item.question}</span>
              <span
                className={cn(
                  "flex-shrink-0 text-muted-foreground text-[16px] transition-transform mt-[1px]",
                  isOpen ? "rotate-18