"use client";

import { FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import { frameworkMethods } from "@/data/practice-data/forms/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import { LoginForm } from "./login-form";
import { PersonalDetailsForm } from "./personal-form";
import { AddressForm } from "./address-form";
import { InterestsForm } from "./interests-form";
import { AccountSetupForm } from "./account-form";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  return (
    <div
      className="mx-auto w-full max-w-[1280px] px-4 sm:px-7"
      data-testid="practice-tab"
      data-section="practice"
    >
      <div className="grid grid-cols-1 gap-6 pt-6 pb-16 lg:grid-cols-[minmax(0,1fr)_280px]">
        {/* ── Left: forms ──────────────────────────────────────────────── */}
        <section aria-label="Form Practice Scenarios">
          <p className="mb-3 text-[10.5px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            Interactive Forms
          </p>

          <div className="flex flex-col gap-[10px]" data-testid="forms-list">
            <LoginForm />
            <PersonalDetailsForm />
            <AddressForm />
            <InterestsForm />
            <AccountSetupForm />
          </div>
        </section>

        {/* ── Right: sticky sidebar ────────────────────────────────────── */}
        <aside
          className="flex flex-col gap-4 self-start lg:sticky lg:top-[120px]"
          data-testid="practice-sidebar"
        >
          <FrameworkMethodsPanel methods={frameworkMethods} />
          <UpNextCard {...upNext} />
        </aside>
      </div>
    </div>
  );
}
