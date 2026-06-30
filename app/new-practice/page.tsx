import { newPracticeCards } from "@/data/new-practice/new-practice-cards-data";

import { NewPracticeGrid, PracticeShell } from "./_components";

const NewPractice = () => {
  return (
    <PracticeShell
      eyebrow="Playground"
      title="Practice Playground"
      description="A calm, distraction-free workspace for building and testing UI automation scenarios. Pick a playground to get started."
      testId="new-practice"
    >
      <NewPracticeGrid cards={newPracticeCards} />
    </PracticeShell>
  );
};

export default NewPractice;
