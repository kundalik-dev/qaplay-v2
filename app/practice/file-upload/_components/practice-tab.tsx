"use client";

import { useState, useRef } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  fileUploadScenarios,
  frameworkMethods,
} from "@/data/practice-data/file-upload/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./file-upload.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

/* ── Helpers ─────────────────────────────────────────────────── */
function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileIcon() {
  return <span className={styles.fileListIcon}>📄</span>;
}

/* ── S01: Single file input ──────────────────────────────────── */
function SingleFileScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files ? [...e.target.files] : [];
    setFiles(selected);
    if (selected.length)
      onComplete(
        `"${selected[0].name}" selected (${formatBytes(selected[0].size)})`,
      );
  }

  return (
    <div className={styles.fileInputWrapper}>
      <input
        id="fu-single-input"
        data-testid="fu-single-input"
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
      />
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((f) => (
            <li key={f.name} className={styles.fileListItem}>
              <FileIcon /> {f.name}{" "}
              <span className="ml-auto text-[11px] text-muted-foreground">
                {formatBytes(f.size)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── S02: Multiple files ─────────────────────────────────────── */
function MultiFileScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [files, setFiles] = useState<File[]>([]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files ? [...e.target.files] : [];
    setFiles(selected);
    if (selected.length)
      onComplete(
        `${selected.length} file(s) selected: ${selected.map((f) => f.name).join(", ")}`,
      );
  }

  return (
    <div className={styles.fileInputWrapper}>
      <input
        id="fu-multi-input"
        data-testid="fu-multi-input"
        type="file"
        multiple
        className={styles.fileInput}
        onChange={handleChange}
      />
      {files.length > 0 && (
        <ul className={styles.fileList}>
          {files.map((f) => (
            <li key={f.name} className={styles.fileListItem}>
              <FileIcon /> {f.name}{" "}
              <span className="ml-auto text-[11px] text-muted-foreground">
                {formatBytes(f.size)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/* ── S03: Filename display (no testid on inner span) ─────────── */
function FilenameDisplayScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [name, setName] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setName(file?.name ?? null);
    if (file) onComplete(`Filename displayed: "${file.name}"`);
  }

  return (
    <div className={styles.fileInputWrapper}>
      <input
        id="fu-filename-input"
        data-testid="fu-filename-input"
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
      />
      {/* Inner span has no data-testid — practice scoped locator */}
      <div data-testid="fu-filename-display" className={styles.filenameDisplay}>
        <span className={styles.filenameIcon}>{name ? "📄" : "🗂️"}</span>
        {name ? (
          <span role="status">{name}</span>
        ) : (
          <span className="text-[12px] text-muted-foreground">
            No file chosen
          </span>
        )}
      </div>
      <p className="text-[11px] text-muted-foreground">
        Inner <code>&lt;span&gt;</code> has no <code>data-testid</code>. Target
        via{" "}
        <code>
          [data-testid=&quot;fu-filename-display&quot;]
          span[role=&quot;status&quot;]
        </code>
        .
      </p>
    </div>
  );
}

/* ── S04: Drag & drop zone ───────────────────────────────────── */
function DragDropScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const [droppedFile, setDroppedFile] = useState<string | null>(null);

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave() {
    setDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setDroppedFile(file.name);
      onComplete(`Dropped: "${file.name}"`);
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setDroppedFile(file.name);
      onComplete(`Selected via input: "${file.name}"`);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div
        data-testid="fu-drop-zone"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`${styles.dropZone} ${dragging ? styles.dropZoneActive : ""}`}
      >
        {/* Hidden input inside the drop zone — practice target */}
        <input
          data-testid="fu-drop-input"
          type="file"
          className={styles.dropZoneHidden}
          onChange={handleInputChange}
          tabIndex={-1}
        />
        <span className={styles.dropIcon}>{droppedFile ? "✅" : "📂"}</span>
        <span className={styles.dropLabel}>
          {droppedFile ? droppedFile : "Drag & drop a file here"}
        </span>
        <span className={styles.dropSub}>
          {droppedFile
            ? "File received"
            : "or click to browse · hidden input inside zone"}
        </span>
      </div>
      <p className="text-[11px] text-muted-foreground">
        Automation tip: target{" "}
        <code>[data-testid=&quot;fu-drop-input&quot;]</code> inside the zone and
        use <code>setInputFiles()</code>.
      </p>
    </div>
  );
}

/* ── S05: Type restriction ───────────────────────────────────── */
function TypeRestrictionScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError(
        `"${file.name}" is not an image file. Only image/* is accepted.`,
      );
      setSuccess(null);
      onComplete(`Type error: "${file.name}" rejected`);
    } else {
      setSuccess(`✅ "${file.name}" accepted (${file.type})`);
      setError(null);
      onComplete(`"${file.name}" accepted`);
    }
  }

  return (
    <div className={styles.fileInputWrapper}>
      <p className="text-[11px] text-muted-foreground">
        Input has <code>accept=&quot;image/*&quot;</code>. Upload a non-image
        file to trigger the error.
      </p>
      <input
        id="fu-type-input"
        data-testid="fu-type-input"
        type="file"
        accept="image/*"
        className={styles.fileInput}
        onChange={handleChange}
      />
      {error && (
        <div
          data-testid="fu-type-error"
          role="alert"
          className={styles.errorMsg}
        >
          ⚠ {error}
        </div>
      )}
      {success && <div className={styles.successMsg}>{success}</div>}
    </div>
  );
}

/* ── S06: Size validation (error has no testid) ──────────────── */
const MAX_SIZE_MB = 2;

function SizeValidationScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_SIZE_MB) {
      setError(
        `File is too large (${sizeMB.toFixed(1)} MB). Maximum allowed is ${MAX_SIZE_MB} MB.`,
      );
      setSuccess(null);
      onComplete(
        `Size error: ${sizeMB.toFixed(1)} MB exceeds ${MAX_SIZE_MB} MB`,
      );
    } else {
      setSuccess(`✅ "${file.name}" accepted (${formatBytes(file.size)})`);
      setError(null);
      onComplete(`"${file.name}" within size limit`);
    }
  }

  return (
    /* parent panel has data-testid; error paragraph intentionally has no testid */
    <div data-testid="fu-size-panel" className={styles.validationPanel}>
      <p className="text-[11px] text-muted-foreground">
        Max size: <strong>2 MB</strong>. Error paragraph has <strong>no</strong>{" "}
        <code>data-testid</code> — locate via <code>.error-msg</code> class
        inside the panel.
      </p>
      <input
        id="fu-size-input"
        data-testid="fu-size-input"
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
      />
      {error && (
        /* Intentionally no data-testid — practice scoped locator */
        <p className={`error-msg ${styles.errorMsg}`} role="alert">
          ⚠ {error}
        </p>
      )}
      {success && <p className={styles.successMsg}>{success}</p>}
    </div>
  );
}

/* ── S07: Hidden file input triggered by custom button ───────── */
function HiddenInputScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const hiddenRef = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setSelected(file.name);
      onComplete(`Hidden input received: "${file.name}"`);
    }
  }

  return (
    /* outer zone has testid; hidden input has NO testid */
    <div data-testid="fu-hidden-zone" className={styles.hiddenZone}>
      <p className="text-[11px] text-muted-foreground">
        The styled button triggers a visually hidden{" "}
        <code>input[type=&quot;file&quot;]</code>. The input has{" "}
        <strong>no</strong> <code>data-testid</code>. Target via:{" "}
        <code>
          [data-testid=&quot;fu-hidden-zone&quot;] input[type=&quot;file&quot;]
        </code>
        .
      </p>
      {/* Hidden input — no data-testid intentionally */}
      <input
        ref={hiddenRef}
        type="file"
        style={{ display: "none" }}
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />
      <button
        type="button"
        data-testid="fu-custom-btn"
        onClick={() => hiddenRef.current?.click()}
        className={styles.customUploadBtn}
      >
        📎 Choose File
      </button>
      {selected && (
        <div className={styles.filenameDisplay}>
          <FileIcon />
          <span>{selected}</span>
        </div>
      )}
    </div>
  );
}

/* ── S08: Upload progress ────────────────────────────────────── */
function ProgressScenario({
  onComplete,
}: {
  onComplete: (msg: string) => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [done, setDone] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setProgress(0);
    setDone(false);
  }

  function startUpload() {
    if (!file || uploading) return;
    setUploading(true);
    setProgress(0);
    setDone(false);

    let pct = 0;
    const interval = setInterval(() => {
      pct = Math.min(pct + Math.floor(Math.random() * 15) + 8, 100);
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(interval);
        setUploading(false);
        setDone(true);
        onComplete(`Upload complete — "${file.name}"`);
      }
    }, 200);
  }

  return (
    /* parent has testid; progressbar and success message have no testid — practice ARIA */
    <div data-testid="fu-progress-panel" className={styles.progressPanel}>
      <input
        id="fu-progress-file"
        data-testid="fu-progress-file"
        type="file"
        className={styles.fileInput}
        onChange={handleChange}
      />
      <button
        type="button"
        data-testid="fu-upload-btn"
        disabled={!file || uploading}
        onClick={startUpload}
        className={styles.triggerBtn}
      >
        {uploading ? `Uploading… ${progress}%` : "▶ Upload"}
      </button>

      {(uploading || done) && (
        <>
          {/* Progress bar — no data-testid; locate by role="progressbar" */}
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Upload progress"
            className={styles.progressTrack}
          >
            <div
              className={styles.progressFill}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className={styles.progressLabel}>{progress}%</p>
        </>
      )}

      {done && (
        /* No data-testid on success message — locate via parent panel */
        <p className={`${styles.successMsg} success-msg`}>
          ✅ &quot;{file?.name}&quot; uploaded successfully
        </p>
      )}

      {!file && (
        <p className="text-[11px] text-muted-foreground">
          Progress bar has <strong>no</strong> <code>data-testid</code>. Use{" "}
          <code>getByRole(&apos;progressbar&apos;)</code> to locate it.
        </p>
      )}
    </div>
  );
}

/* ── Main PracticeTab ────────────────────────────────────────── */
export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = fileUploadScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className={styles.practiceLayout}>
        <section aria-label="Interactive Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Scenarios
          </p>
          <div
            className="flex flex-col gap-[10px]"
            data-testid="scenarios-list"
          >
            {/* ── S01: Single file ─────────────────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult }) => (
                <SingleFileScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s01");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S02: Multiple files ───────────────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult }) => (
                <MultiFileScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s02");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S03: Filename display ─────────────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult }) => (
                <FilenameDisplayScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s03");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Drag & drop ──────────────────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult }) => (
                <DragDropScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s04");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S05: Type restriction ─────────────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[4]}
              onComplete={() => markDone("s05")}
            >
              {({ setResult }) => (
                <TypeRestrictionScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s05");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S06: Size validation (Hard) ───────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[5]}
              onComplete={() => markDone("s06")}
            >
              {({ setResult }) => (
                <SizeValidationScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s06");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S07: Hidden input (Challenge) ─────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[6]}
              onComplete={() => markDone("s07")}
            >
              {({ setResult }) => (
                <HiddenInputScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s07");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S08: Progress bar (Challenge) ─────────────────── */}
            <ScenarioCard
              {...fileUploadScenarios[7]}
              onComplete={() => markDone("s08")}
            >
              {({ setResult }) => (
                <ProgressScenario
                  onComplete={(msg) => {
                    setResult(msg);
                    markDone("s08");
                  }}
                />
              )}
            </ScenarioCard>
          </div>
        </section>

        <aside
          className={styles.practiceSidebar}
          data-testid="practice-sidebar"
        >
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
