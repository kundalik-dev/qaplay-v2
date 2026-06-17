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
      { rootMargin: "-30% 0px -60% 0px" }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <nav aria-label="Table of contents" className="sticky top-[160px] flex flex-col">
      <span className="font-[family-name:var(--font-ibm-plex-mono)] text-[10.5px] font-bold uppercase tracking-[0.07em] text-muted-foreground mb-2">
        On This Page
      </span>
      {items.map((item) => (
        <span key={item.id}>
          {item.dividerBefore && (
            <span className="block h-px bg-border my-2" />
          )}
          <a
            href={`#${item.id}`}
            onClick={(e) => handleClick(e, item.id)}
            className={cn(
              "block text-[12.5px] py-[5px] px-[10px] rounded-[6px] mb-[2px] transition-all border-l-2",
              active === item.id
                ? "text-primary bg-[color-mix(in_srgb,var(--primary)_8%,transparent)] border-l-primary font-semibold"
                : "text-muted-foreground border-l-transparent hover:bg-muted hover:text-foreground"
            )}
          >
            {item.label}
          </a>
        </span>
      ))}
    </nav>
  );
}
