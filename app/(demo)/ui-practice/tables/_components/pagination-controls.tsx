"use client";

/**
 * Drives every `data-testid` in this nav: "products-*" for the shopping
 * products table, "departments-*" for the departments table. Kept as a
 * union (rather than a bare `string`) so new prefixes stay intentional
 * and locator-friendly.
 */
export type PaginationTestIdPrefix = "products" | "departments";

interface PaginationControlsProps {
  page: number;
  totalPages: number;
  infoText: string;
  onPrev: () => void;
  onNext: () => void;
  onSelectPage: (page: number) => void;
  testIdPrefix: PaginationTestIdPrefix;
  /** Accessible name for the <nav>, e.g. "Departments pagination". */
  navAriaLabel: string;
}

/**
 * Shared pagination nav used by every paginated table section. Mirrors
 * the original `buildPageBtns` + Prev/Next button logic from the
 * vanilla JS prototype.
 */
export function PaginationControls({
  page,
  totalPages,
  infoText,
  onPrev,
  onNext,
  onSelectPage,
  testIdPrefix,
  navAriaLabel,
}: PaginationControlsProps) {
  const prevDisabled = page === 1;
  const nextDisabled = page === totalPages || totalPages === 0;

  return (
    <nav
      className="pag-row"
      data-testid={`${testIdPrefix}-controls`}
      aria-label={navAriaLabel}
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
