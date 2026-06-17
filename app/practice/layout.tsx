import React from "react";

/**
 * Shared layout for all /practice routes.
 *
 * NOTE: The inner max-width wrapper was intentionally removed here.
 * - /practice (the grid page) adds its own max-width via the PracticeGrid component.
 * - /practice/[element] pages need full-bleed sections and manage their own widths
 *   through PracticeShell (max-w-[1200px]) and full-width headers/panels.
 */
const PracticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      data-testid="practice-layout"
      data-section="practice"
      className="min-h-screen w-full"
    >
      {children}
    </div>
  );
};

export default PracticeLayout;
