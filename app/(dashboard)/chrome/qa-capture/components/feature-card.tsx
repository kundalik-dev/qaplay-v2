import type { ChromeFeature } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function FeatureCard({ icon, title, description, tone }: ChromeFeature) {
  const Icon = chromeIconMap[icon];
  const toneClasses = chromeToneClasses[tone];

  return (
    <article className="capture-card h-full p-8 transition-transform duration-200 hover:-translate-y-1">
      <div
        className={`${toneClasses.bg} ${toneClasses.border} ${toneClasses.text} mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border`}
      >
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-heading text-2xl font-semibold tracking-[-0.03em] text-foreground">
        {title}
      </h3>
      <p className="mt-4 text-base leading-7 text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
