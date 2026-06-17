import type { ChromeSessionPreviewItem } from "@/data/chrome/types";

import {
  chromeIconMap,
  chromeToneClasses,
} from "../../_shared/chrome-page-helpers";

export function SessionPreviewCard({
  sessions,
}: {
  sessions: ChromeSessionPreviewItem[];
}) {
  const CameraIcon = chromeIconMap.camera;
  const HistoryIcon = chromeIconMap.history;

  return (
    <div className="capture-card-strong overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-5 py-4">
        <HistoryIcon className="h-4 w-4 text-primary" />
        <p className="font-heading text-base font-semibold text-foreground">
          Session History
        </p>
        <span className="ml-auto text-xs tracking-[0.08em] text-muted-foreground uppercase">
          {sessions.length} saved flows
        </span>
      </div>
      <div className="divide-y divide-border/80">
        {sessions.map(({ name, date, count, label, tone }) => (
          <div key={name} className="flex items-center gap-4 px-5 py-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/60">
              <CameraIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-foreground">
                {name}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {date} · {count} screenshots
              </p>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.14em] uppercase ${chromeToneClasses[tone].badge}`}
            >
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
