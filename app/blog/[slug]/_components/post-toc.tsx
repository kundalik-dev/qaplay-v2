"use client";

import { useEffect, useState } from "react";

import type { TocHeading } from "@/lib/blog/types";

import styles from "./post-toc.module.css";

type PostTocProps = {
  /** Ordered h2/h3 headings extracted from the post body. */
  items: TocHeading[];
};

/**
 * Sticky table of contents for a blog post.
 *
 * - Highlights the section currently in view via an IntersectionObserver.
 * - Smooth-scrolls to a heading on click (headings carry `scroll-margin-top`).
 * - Renders as a sticky sidebar on desktop and a collapsible card on mobile
 *   (see `post-toc.module.css`).
 */
export function PostToc({ items }: PostTocProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the topmost heading currently intersecting the viewport band.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  function handleClick(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
    // Reflect the anchor in the URL without a jump.
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <aside className={styles.toc} data-testid="blog-post-toc">
      <details className={styles.details} open>
        <summary className={styles.summary} data-testid="blog-toc-toggle">
          On this page
        </summary>

        <nav aria-label="Table of contents">
          <ul className={styles.list}>
            {items.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li
                  key={item.id}
                  className={styles.item}
                  data-level={item.level}
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(event) => handleClick(event, item.id)}
                    className={styles.link}
                    data-active={isActive}
                    data-testid={`blog-toc-link-${item.id}`}
                    aria-current={isActive ? "location" : undefined}
                  >
                    {item.text}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </details>
    </aside>
  );
}
