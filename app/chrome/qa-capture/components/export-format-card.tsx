import type { ChromeFormatCard } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function ExportFormatCard({
  icon,
  label,
  tone,
  description,
  items,
}: ChromeFormatCard) {
  const Icon = chromeIconMap[icon];
  const CheckCircleIcon = chromeIconMap["check-circle"];
  const toneClasses = chromeToneClasses[tone];

  return (
    <article className="capture-card h-full p-6">
      <div
        className={`${toneClasses.bg} ${toneClasses.border} ${toneClasses.text} mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <span
        className={`inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.16em] uppercase ${toneClasses.badge} ${toneClasses.border}`}
      >
        {label}
      </span>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        {description}
      </p>
      <ul className="mt-5 space-y-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <CheckCircleIcon className="h-4 w-4 shrink-0 text-primary" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}
