import { chromeIconMap } from "../../_shared/chrome-page-helpers";

export function ApiKeyPreview() {
  const CheckCircleIcon = chromeIconMap["check-circle"];
  const SettingsIcon = chromeIconMap.settings;

  return (
    <div className="capture-card overflow-hidden p-0">
      {/* Header bar */}
      <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-5 py-3.5">
        <SettingsIcon className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm font-semibold text-foreground">
          Extension Settings
        </span>
      </div>

      <div className="space-y-5 p-5">
        {/* Name field */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            Your Name
          </label>
          <div className="rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 text-sm text-foreground">
            Jane QA Engineer
          </div>
        </div>

        {/* API key field */}
        <div>
          <label className="mb-1.5 block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
            API Key
          </label>
          <div className="rounded-xl border border-border bg-muted/50 px-3.5 py-2.5 font-mono text-sm tracking-wide text-muted-foreground">
            qapg_********************
          </div>
        </div>

        {/* Connected badge */}
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 dark:border-emerald-800 dark:bg-emerald-950/30">
          <CheckCircleIcon className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <div>
            <p className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              Connected
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">
              Signed in as Jane QA Engineer
            </p>
          </div>
        </div>

        {/* Test button */}
        <button
          type="button"
          className="capture-button-primary w-full justify-center"
        >
          Test Connection
        </button>
      </div>
    </div>
  );
}
