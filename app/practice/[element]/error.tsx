"use client";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Error boundary for /practice/[element] pages.
 * Must be a client component.
 */
export default function ElementError({ error, reset }: ErrorProps) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 px-4"
      data-testid="practice-error"
    >
      <div className="text-center">
        <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">
          Error
        </p>
        <h2 className="font-display font-bold text-xl text-foreground mb-2">
          Something went wrong
        </h2>
        <p className="text-muted-foreground text-sm max-w-sm">
          {error.message || "This practice element failed to load. Try again or go back to the practice grid."}
        </p>
      </div>

      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-4 py-2 rounded-md border border-border bg-surface text-sm
                     font-medium text-foreground hover:border-primary/40 transition-colors"
        >
          Try again
        </button>
        <a
          href="/practice"
          className="px-4 py-2 rounded-md bg-primary/10 border border-primary/30
                     text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          Back to Practice
        </a>
      </div>
    </div>
  );
}
