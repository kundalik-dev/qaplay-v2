"use client";

import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/data/practice-data/types";

interface LearnTocProps {
  items: TocItem[];
}

/**
 * Block 14 — LearnToc
 * Sticky right-side table of contents.
 * Highlights the currently visible section via IntersectionObserver.
 * Client component.
 */
export function LearnToc({ items }: LearnTocProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (typeof window === "undefined" || !items.length) return;

    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }

  return (
    <nav
      aria-label="Table of contents"
      className="sticky top-[var(--panel-top,160px)] flex flex-col"
      data-testid="learn-toc"
    >
      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
        On This Page
      </span>

      {items.map((item) => (
        <span key={item.id}>
          {item.dividerBefore && <Separator className="my-2 bg-border" />}
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "block text-[12px] py-1 transition-colors leading-snug",
              active === item.id
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-current={active === item.id ? "location" : undefined}
          >
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
