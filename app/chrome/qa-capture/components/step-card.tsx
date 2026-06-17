import type { ChromeStep } from "@/data/chrome/types";

import { chromeToneClasses } from "../../_shared/chrome-page-helpers";

export function StepCard({ step, title, description, tone }: ChromeStep) {
  return (
    <article className="capture-card h-full p-6">
      <div className="flex items-start gap-4">
        <div
          className={`${chromeToneClasses[tone].bg} ${chromeToneClasses[tone].border} ${chromeToneClasses[tone].text} flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border font-mono text-xs font-bold tracking-[0.18em]`}
        >
          {step}
        </div>
        <div className="space-y-2">
          <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
            {title}
          </h3>
          <p className="text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
