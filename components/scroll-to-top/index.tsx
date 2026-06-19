"use client";

import { ArrowUp } from "lucide-react";
import { useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import { cn } from "@/lib/utils";

import styles from "./scroll-to-top.module.css";

type ScrollToTopButtonProps = {
  className?: string;
  label?: string;
  visibilityOffset?: number;
};

export function ScrollToTopButton({
  className,
  label = "Scroll to top",
  visibilityOffset = 360,
}: ScrollToTopButtonProps) {
  // Render nothing until mounted on the client (portal needs document.body).
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const isVisible = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("scroll", onStoreChange, { passive: true });

      return () => {
        window.removeEventListener("scroll", onStoreChange);
      };
    },
    () => window.scrollY > visibilityOffset,
    () => false,
  );

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  if (!mounted) return null;

  return createPortal(
    <button
      type="button"
      onClick={scrollToTop}
      className={cn(styles.button, isVisible && styles.visible, className)}
      aria-label={label}
      title={label}
      tabIndex={isVisible ? 0 : -1}
    >
      <ArrowUp className={styles.icon} aria-hidden="true" />
    </button>,
    document.body,
  );
}
