import type { ChromeUseCase } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function UseCaseCard({
  icon,
  title,
  description,
  tone,
}: ChromeUseCase) {
  const Icon = chromeIconMap[icon];

  return (
    <article className="capture-card h-full p-6">
      <div className="flex items-start gap-4">
        <div
          className={`${chromeToneClasses[tone].bg} ${chromeToneClasses[tone].border} ${chromeToneClasses[tone].text} flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border`}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-heading text-lg font-semibold tracking-[-0.03em] text-foreground">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
