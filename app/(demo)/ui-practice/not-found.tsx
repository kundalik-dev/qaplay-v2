import Link from "next/link";
import { Compass } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Scoped 404 for /ui-practice/*.
 *
 * Because this file lives inside app/(demo)/ui-practice/, Next.js renders
 * it inside ui-practice/layout.tsx (sidebar stays visible) whenever
 * notFound() is triggered from the [...rest] catch-all route below —
 * instead of falling back to the site-wide app/not-found.jsx.
 */
export default function UiPracticeNotFound() {
  return (
    <div
      className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center"
      data-testid="ui-practice-not-found"
    >
      <Compass
        className="mb-4 h-10 w-10 text-muted-foreground"
        aria-hidden="true"
      />
      <h1 className="font-heading mb-2 text-2xl font-semibold">
        Section not built yet
      </h1>
      <p className="mb-8 max-w-md text-sm text-muted-foreground">
        This UI Practice section doesn&apos;t exist yet. Pick another section
        from the sidebar, or head back to the overview.
      </p>
      <Link href="/ui-practice">
        <Button data-testid="ui-practice-not-found-back-link">
          Back to UI Practice
        </Button>
      </Link>
    </div>
  );
}
