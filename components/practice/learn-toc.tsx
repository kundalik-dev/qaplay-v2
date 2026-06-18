"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { TocItem } from "@/data/practice-data/types";

interface LearnTocProps {
  items: TocItem[];
}

export function LearnToc({ items }: LearnTocProps) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const els = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <nav
      aria-label="Table of contents"
      className="order-first flex flex-col lg:sticky lg:top-[160px] lg:order-none"
    >
      <span className="mb-2 font-[family-name:var(--font-ibm-plex-mono)] text-[10.5px] font-bold tracking-[0.07em] text-muted-foreground uppercase">
        On This Page
      </span>
      {items.map((item) => (
        <span key={item.id}>
          {item.dividerBefore && <span className="my-2 block h-px bg-border" />}
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "mb-[2px] block rounded-[6px] border-l-2 px-[10px] py-[5px] text-[12.5px] transition-all",
              active === item.id
                ? "border-l-primary bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] font-semibold text-primary"
                : "border-l-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
