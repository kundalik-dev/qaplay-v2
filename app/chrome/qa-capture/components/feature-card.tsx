import type { ChromeFeature } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function FeatureCard({
  icon,
  title,
  description,
  tone,
}: ChromeFeature) {
  const Icon = chromeIconMap[icon];
  const toneClasses = chromeToneClasses[tone];

  return (
    <article className="capture-card h-full p-6 transition-transform duration-200 hover:-translate-y-1">
      <div
        className={`${toneClasses.bg} ${toneClasses.border} ${toneClasses.text} mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-heading text-xl font-semibold tracking-[-0.03em] text-foreground">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
