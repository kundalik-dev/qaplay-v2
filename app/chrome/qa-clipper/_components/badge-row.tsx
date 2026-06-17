import type { ChromeBadge } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function BadgeRow({ badges }: { badges: ChromeBadge[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {badges.map(({ icon, label, tone }) => {
        const Icon = chromeIconMap[icon];
        const toneClasses = chromeToneClasses[tone];

        return (
          <span
            key={label}
            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase ${toneClasses.bg} ${toneClasses.text} ${toneClasses.border}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </span>
        );
      })}
    </div>
  );
}
