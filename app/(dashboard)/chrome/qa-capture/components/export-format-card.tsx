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
    <article className="capture-card group flex h-full flex-col overflow-hidden p-0 transition-shadow duration-200 hover:shadow-md">
      {/* Card header with colored top accent */}
      <div className={`h-1 w-full ${toneClasses.solid}`} aria-hidden="true" />

      <div className="flex flex-1 flex-col p-8">
        {/* Icon + label row */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div
            className={`${toneClasses.bg} ${toneClasses.border} ${toneClasses.text} flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <span
            className={`mt-1 inline-flex rounded-full border px-3 py-1 text-[10px] font-bold tracking-[0.18em] uppercase ${toneClasses.badge} ${toneClasses.border}`}
          >
            {label}
          </span>
        </div>

        {/* Description */}
        <p className="text-base leading-7 text-muted-foreground">{description}</p>

        {/* Spacer pushes use-cases to bottom */}
        <div className="flex-1" />

        {/* Use-cases footer */}
        <ul
          className={`mt-6 space-y-2 rounded-xl border p-4 ${toneClasses.bg} ${toneClasses.border}`}
        >
          {items.map((item) => (
            <li
              key={item}
              className={`flex items-center gap-2.5 text-sm font-medium ${toneClasses.text}`}
            >
              <CheckCircleIcon className="h-4 w-4 shrink-0 opacity-80" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
