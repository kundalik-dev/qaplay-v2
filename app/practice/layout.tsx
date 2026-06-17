import React from "react";

const PracticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      data-testid="practice-layout"
      data-section="practice"
      className="min-h-screen w-full pt-24 pb-16 md:pt-28"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default PracticeLayout;
