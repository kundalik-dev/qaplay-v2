"use client";

import { useState } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { radioCheckboxScenarios, frameworkMethods } from "@/data/practice-data/radio-checkbox/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./radio-checkbox.module.css";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

const SKILLS = [
  { id: "skill-playwright", label: "Playwright" },
  { id: "skill-selenium",   label: "Selenium" },
  { id: "skill-cypress",    label: "Cypress" },
  { id: "skill-webdriverio",label: "WebdriverIO" },
];

const PLAN_CARDS = [
  { plan: "starter",    name: "Starter",    price: "Free" },
  { plan: "pro",        name: "Pro",        price: "$12 / mo" },
  { plan: "enterprise", name: "Enterprise", price: "$49 / mo" },
];

const PERMISSIONS = [
  { name: "perm_read_users",    label: "Read Users" },
  { name: "perm_write_users",   label: "Write Users" },
  { name: "perm_read_reports",  label: "Read Reports" },
  { name: "perm_write_reports", label: "Write Reports" },
  { name: "perm_read_billing",  label: "Read Billing" },
  { name: "perm_delete_all",    label: "Delete All" },
];

/* ── Sub-components ──────────────────────────────────────────── */

function CheckboxGroup({ onChange }: { onChange: (selected: string[]) => void }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      onChange(SKILLS.filter((s) => next.has(s.id)).map((s) => s.label));
      return next;
    });
  }

  return (
    <div data-testid="rc-skill-group" className="flex flex-col">
      {SKILLS.map((skill) => (
        <label key={skill.id} className={styles.controlRow} htmlFor={skill.id}>
          <input
            type="checkbox"
            id={skill.id}
            data-testid="chk-skill"
            data-skill={skill.id}
            name="skills"
            value={skill.id}
            checked={checked.has(skill.id)}
            onChange={() => toggle(skill.id)}
            className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
          />
          <span className={styles.controlLabel}>{skill.label}</span>
        </label>
      ))}
    </div>
  );
}

function PermissionList({ onChange }: { onChange: (label: string) => void }) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  function toggle(name: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      const readOnly = PERMISSIONS.filter((p) => next.has(p.name) && p.label.startsWith("Read"));
      onChange(readOnly.length ? `Read perms: ${readOnly.map((p) => p.label).join(", ")}` : "No read perms selected");
      return next;
    });
  }

  return (
    <div data-testid="rc-permissions-panel" className="flex flex-col">
      <p className="text-xs text-muted-foreground mb-2">
        No <code>data-testid</code> on inputs. Locate via <code>starts-with(@name, &quot;perm_&quot;)</code>.
      </p>
      {PERMISSIONS.map(({ name, label }) => (
        <div key={name} className={styles.permissionRow}>
          <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked.has(name)}
            onChange={() => toggle(name)}
            className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
            aria-label={label}
          />
          <span className={styles.permissionName}>{label}</span>
        </div>
      ))}
    </div>
  );
}

function PlanCards({ onChange }: { onChange: (plan: string) => void }) {
  const [selected, setSelected] = useState<string | null>(null);

  function select(plan: string) {
    setSelected(plan);
    onChange(plan);
  }

  return (
    <div
      className={styles.planCardsGrid}
      data-testid="plan-cards-list"
      role="radiogroup"
      aria-label="Select a plan"
    >
      {PLAN_CARDS.map(({ plan, name, price }) => (
        <article
          key={plan}
          data-testid="plan-card"
          data-plan={plan}
          className={`${styles.planCard} ${selected === plan ? styles.planCardSelected : ""}`}
          onClick={() => select(plan)}
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="plan-card-radio"
              value={plan}
              checked={selected === plan}
              onChange={() => select(plan)}
              className="h-4 w-4 accent-primary"
              aria-label={`Select ${name} plan`}
            />
            <span className={styles.planName}>{name}</span>
          </label>
          <span className={styles.planPrice}>{price}</span>
        </article>
      ))}
    </div>
  );
}

/* ── Main PracticeTab ────────────────────────────────────────── */

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = radioCheckboxScenarios.map((s) => ({
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
          <div className="flex flex-col gap-[10px]" data-testid="scenarios-list">

            {/* ── S01: Basic Checkbox ───────────────────────────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult }) => (
                <label className={styles.controlRow} htmlFor="chk-accept-terms">
                  <input
                    type="checkbox"
                    id="chk-accept-terms"
                    data-testid="chk-accept-terms"
                    name="accept_terms"
                    className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                    onChange={(e) => {
                      setResult(e.target.checked ? "Checked ✓" : "Unchecked");
                      if (e.target.checked) markDone("s01");
                    }}
                  />
                  <span className={styles.controlLabel}>I accept the terms and conditions</span>
                </label>
              )}
            </ScenarioCard>

            {/* ── S02: Radio Group ──────────────────────────────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[1]} onComplete={() => markDone("s02")}>
              {({ setResult }) => (
                <div
                  data-testid="radio-plan-group"
                  role="radiogroup"
                  aria-label="Subscription plan"
                  className="flex flex-col gap-1"
                >
                  {[
                    { value: "starter", label: "Starter" },
                    { value: "pro",     label: "Pro" },
                    { value: "business",label: "Business" },
                  ].map(({ value, label }) => (
                    <label key={value} className={styles.controlRow} htmlFor={`radio-plan-${value}`}>
                      <input
                        type="radio"
                        id={`radio-plan-${value}`}
                        name="plan"
                        value={value}
                        data-testid={`radio-plan-${value}`}
                        className="h-4 w-4 accent-primary cursor-pointer"
                        onChange={() => {
                          setResult(`Selected: ${label}`);
                          markDone("s02");
                        }}
                      />
                      <span className={styles.controlLabel}>{label}</span>
                    </label>
                  ))}
                </div>
              )}
            </ScenarioCard>

            {/* ── S03: Checkbox Group – Select All ─────────────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[2]} onComplete={() => markDone("s03")}>
              {({ setResult }) => (
                <CheckboxGroup
                  onChange={(selected) => {
                    setResult(selected.length ? selected.join(", ") : "None selected");
                    if (selected.length === SKILLS.length) markDone("s03");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S04: Pre-checked Newsletter – Assert State ────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[3]} onComplete={() => markDone("s04")}>
              {({ setResult }) => (
                <label className={styles.controlRow} htmlFor="chk-newsletter">
                  <input
                    type="checkbox"
                    id="chk-newsletter"
                    data-testid="chk-newsletter"
                    name="newsletter"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                    onChange={(e) => {
                      setResult(e.target.checked ? "Checked (re-subscribed)" : "Unchecked (unsubscribed)");
                      markDone("s04");
                    }}
                  />
                  <span className={styles.controlLabel}>Subscribe to newsletter <span className="text-xs text-muted-foreground">(pre-checked)</span></span>
                </label>
              )}
            </ScenarioCard>

            {/* ── S05: Disabled Controls ───────────────────────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[4]} onComplete={() => markDone("s05")}>
              {({ setResult }) => (
                <div className="flex flex-col gap-2">
                  <label className={styles.controlRow} htmlFor="chk-disabled">
                    <input
                      type="checkbox"
                      id="chk-disabled"
                      data-testid="chk-disabled"
                      name="disabled_pref"
                      disabled
                      className="h-4 w-4 rounded border-gray-300 accent-primary cursor-not-allowed opacity-50"
                    />
                    <span className="text-sm text-muted-foreground line-through">Disabled checkbox</span>
                  </label>
                  <label className={styles.controlRow} htmlFor="radio-disabled">
                    <input
                      type="radio"
                      id="radio-disabled"
                      data-testid="radio-disabled"
                      name="disabled_radio_group"
                      value="locked"
                      disabled
                      className="h-4 w-4 accent-primary cursor-not-allowed opacity-50"
                    />
                    <span className="text-sm text-muted-foreground line-through">Disabled radio</span>
                  </label>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center h-8 rounded-md border border-input bg-background px-3 text-xs font-medium hover:bg-accent transition-colors w-fit mt-1"
                    onClick={() => {
                      setResult("Both controls confirmed disabled");
                      markDone("s05");
                    }}
                  >
                    Assert disabled state
                  </button>
                </div>
              )}
            </ScenarioCard>

            {/* ── S06: Sibling-Located Controls (Hard — no testid on inputs) */}
            <ScenarioCard {...radioCheckboxScenarios[5]} onComplete={() => markDone("s06")}>
              {({ setResult }) => (
                <div data-testid="rc-notification-prefs" className="flex flex-col">
                  {/* No data-testid on inputs — practice XPath sibling/ancestor */}
                  {[
                    { name: "notif_email_marketing", label: "Marketing emails" },
                    { name: "notif_sms_alerts",      label: "SMS alerts" },
                    { name: "notif_push_weekly",      label: "Weekly digest" },
                  ].map(({ name, label }) => (
                    <div key={name} className={styles.fieldRow}>
                      <input
                        type="checkbox"
                        id={name}
                        name={name}
                        className="h-4 w-4 rounded border-gray-300 accent-primary cursor-pointer"
                        onChange={(e) => {
                          setResult(`${label}: ${e.target.checked ? "on" : "off"}`);
                          markDone("s06");
                        }}
                      />
                      {/* span beside input — practice preceding-sibling */}
                      <span className={styles.fieldSpan}>{label}</span>
                    </div>
                  ))}
                </div>
              )}
            </ScenarioCard>

            {/* ── S07: Plan Cards – Scoped Radio (Medium) ──────────────── */}
            <ScenarioCard {...radioCheckboxScenarios[6]} onComplete={() => markDone("s07")}>
              {({ setResult }) => (
                <PlanCards
                  onChange={(plan) => {
                    setResult(`Selected plan: ${plan}`);
                    markDone("s07");
                  }}
                />
              )}
            </ScenarioCard>

            {/* ── S08: Dynamic Permission List (Challenge — no testid) ─── */}
            <ScenarioCard {...radioCheckboxScenarios[7]} onComplete={() => markDone("s08")}>
              {({ setResult }) => (
                <PermissionList
                  onChange={(label) => {
                    setResult(label);
                    if (label !== "No read perms selected") markDone("s08");
                  }}
                />
              )}
            </ScenarioCard>

          </div>
        </section>

        <aside className={styles.practiceSidebar} data-testid="practice-sidebar">
          <ProgressWidget items={progressItems} />
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
