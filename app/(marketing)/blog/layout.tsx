import type React from "react";

import { ScrollToTopButton } from "@/components/scroll-to-top";

/**
 * Shared shell for the blog index and individual posts. Adds the top spacing
 * for the fixed nav; each page controls its own content max-width.
 */
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      data-testid="blog-layout"
      data-section="blog"
      className="min-h-screen w-ful