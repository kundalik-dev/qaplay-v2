"use client";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  infoText: string;
  onPrev: () => void;
  onNext: () => void;
  onSelectPage: (page: number) => void;
  /** Drives data-testid prefixes: "pag-*" for section 4, "grid-*" for section 6. */
  testIdPrefix: "pag" | "grid";
}

/**
 * Shared pagination nav used by the paginated table (section 4) and the
 * combined data grid (section 6). Mirrors the original `buildPageBtns` +
 * Prev/Next button logic from the vanilla JS prototype.
 */
export function PaginationControls({
  page,
  totalPages,
  infoText,
  onPrev,
  onNext,
  onSelectPage,
  testIdPrefix,
}: PaginationControlsProps) {
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages || totalPages === 0;

  return (
    <nav
      className="pag-row"
      data-testid={`${testIdPrefix}-controls`}
      aria-label={testIdPrefix === "pag" ? "Table pagination" : "Grid pagination"}
    >
      <span className="pag-info" data-testid={`${testIdPrefix}-info`}>
        {infoText}
      </span>
      <button
        type="button"
        className="pag-btn"
        data-testid={`${testIdPrefix}-prev`}
        aria-label="Previous page"
        disabled={prevDisabled}
        onClick={onPrev}
      >
        &#8249; Prev
      </button>
      <div className="page-btns" data-testid={`${testIdPrefix}-pages`}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            type="button"
            key={p}
            className={`pag-btn${p === page ? " active" : ""}`}
            data-testid={`${testIdPrefix}-btn-${p}`}
            aria-current={p === page ? "page" : undefined}
            onClick={() => onSelectPage(p)}
          >
            {p}
          </button>
        ))}
      </div>
      <button
        type="button"
        className="pag-btn"
        data-testid={`${testIdPrefix}-next`}
        aria-label="Next page"
        disabled={nextDisabled}
        onClick={onNext}
      >
        Next &#8250;
      </button>
    </nav>
  );
}
