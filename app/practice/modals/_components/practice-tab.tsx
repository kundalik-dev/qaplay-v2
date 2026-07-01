"use client";

import { useState } from "react";
import {
  ScenarioCard,
  ProgressWidget,
  FrameworkMethodsPanel,
  UpNextCard,
} from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import {
  modalScenarios,
  frameworkMethods,
} from "@/data/practice-data/modals/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./modals.module.css";
import { X } from "lucide-react";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  // State for modals
  const [simpleModalOpen, setSimpleModalOpen] = useState(false);
  const [cardModalOpen, setCardModalOpen] = useState(false);
  const [dynamicModalOpen, setDynamicModalOpen] = useState(false);
  const [challengeModalOpen, setChallengeModalOpen] = useState(false);

  // Dynamic IDs generated when the modal opens (stable across re-renders so
  // partial-match locator practice stays consistent while the modal is open).
  const [dynamicModalSuffix, setDynamicModalSuffix] = useState(0);

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = modalScenarios.map((s) => ({
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
            {/* S01: Simple Modal */}
            <ScenarioCard
              {...modalScenarios[0]}
              onComplete={() => markDone("s01")}
            >
              {({ setResult, complete }) => (
                <div className="flex flex-col items-start gap-4">
                  <button
                    className="flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                    data-testid="btn-open-simple-modal"
                    onClick={() => {
                      setSimpleModalOpen(true);
                      setResult("Opened");
                    }}
                  >
                    Open Simple Modal
                  </button>

                  {simpleModalOpen && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setSimpleModalOpen(false)}
                    >
                      <div
                        className={styles.modalContent}
                        role="dialog"
                        data-testid="modal-simple"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="text-lg font-semibold">
                            Simple Modal
                          </h3>
                          <button
                            data-testid="btn-close-simple-modal"
                            onClick={() => {
                              setSimpleModalOpen(false);
                              setResult("Closed");
                              complete();
                            }}
                            className="rounded p-1 hover:bg-gray-100"
                            aria-label="Close modal"
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <p className="mb-6 text-sm text-gray-600">
                          This is a beginner-friendly modal with stable
                          locators.
                        </p>
                        <div className="flex justify-end">
                          <button
                            data-testid="btn-confirm-simple-modal"
                            onClick={() => {
                              setSimpleModalOpen(false);
                              setResult("Closed");
                              complete();
                            }}
                            className="h-9 rounded bg-blue-600 px-4 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScenarioCard>

            {/* S02: Modal from Repeated Card */}
            <ScenarioCard
              {...modalScenarios[1]}
              onComplete={() => markDone("s02")}
            >
              {({ setResult, complete }) => (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-4">
                    <article className={styles.card} data-testid="card-course">
                      <h4 className="text-sm font-semibold">
                        Playwright Basics
                      </h4>
                      <p className="mb-3 text-xs text-gray-500">
                        Beginner course
                      </p>
                      <button
                        className={styles.cardBtn}
                        data-testid="btn-open-course"
                        onClick={() => setResult("Wrong card clicked")}
                      >
                        Details
                      </button>
                    </article>
                    <article className={styles.card} data-testid="card-course">
                      <h4 className="text-sm font-semibold">
                        Advanced Locators
                      </h4>
                      <p className="mb-3 text-xs text-gray-500">Hard course</p>
                      <button
                        className={styles.cardBtn}
                        data-testid="btn-open-course"
                        onClick={() => {
                          setCardModalOpen(true);
                          setResult("Opened Advanced Course");
                        }}
                      >
                        Details
                      </button>
                    </article>
                  </div>

                  {cardModalOpen && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setCardModalOpen(false)}
                    >
                      <div
                        className={styles.modalContent}
                        role="dialog"
                        data-testid="modal-card"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="mb-2 text-lg font-semibold">
                          Advanced Locators
                        </h3>
                        <p className="mb-6 text-sm text-gray-600">
                          Course details go here...
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            data-testid="btn-close-course"
                            onClick={() => {
                              setCardModalOpen(false);
                              setResult("Closed Advanced Course");
                              complete();
                            }}
                            className="h-9 rounded bg-gray-200 px-4 text-sm font-medium text-gray-900 hover:bg-gray-300"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScenarioCard>

            {/* S03: Dynamic ID Modal */}
            <ScenarioCard
              {...modalScenarios[2]}
              onComplete={() => markDone("s03")}
            >
              {({ setResult, complete }) => (
                <div className="flex flex-col items-start gap-4">
                  <button
                    className="flex h-9 items-center justify-center rounded-md bg-purple-600 px-4 text-sm font-medium text-white hover:bg-purple-700"
                    data-testid="btn-open-dynamic-modal"
                    onClick={() => {
                      setDynamicModalSuffix(Math.floor(Math.random() * 10000));
                      setDynamicModalOpen(true);
                      setResult("Opened");
                    }}
                  >
                    Open Dynamic Modal
                  </button>

                  {dynamicModalOpen && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setDynamicModalOpen(false)}
                    >
                      <div
                        className={styles.modalContent}
                        role="dialog"
                        data-testid="modal-dynamic"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3 className="mb-4 text-lg font-semibold">
                          Confirm Action
                        </h3>
                        <p className="mb-6 text-sm text-gray-600">
                          The button below has a dynamic ID. Find it using a
                          partial match!
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            id={`cancel-modal-${dynamicModalSuffix}`}
                            onClick={() => setDynamicModalOpen(false)}
                            className="h-9 rounded bg-gray-200 px-4 text-sm font-medium text-gray-900 hover:bg-gray-300"
                          >
                            Cancel
                          </button>
                          <button
                            id={`confirm-modal-${dynamicModalSuffix}`}
                            onClick={() => {
                              setDynamicModalOpen(false);
                              setResult("Confirmed");
                              complete();
                            }}
                            className="h-9 rounded bg-purple-600 px-4 text-sm font-medium text-white hover:bg-purple-700"
                          >
                            Confirm Action
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </ScenarioCard>

            {/* S04: Challenge Modal (Missing Locators) */}
            <ScenarioCard
              {...modalScenarios[3]}
              onComplete={() => markDone("s04")}
            >
              {({ setResult, complete }) => (
                <div className="flex flex-col items-start gap-4">
                  <button
                    className="flex h-9 items-center justify-center rounded-md border border-gray-300 bg-white px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                    data-testid="btn-open-challenge-modal"
                    onClick={() => {
                      setChallengeModalOpen(true);
                      setResult("Opened");
                    }}
                  >
                    Open Challenge Modal
                  </button>

                  {challengeModalOpen && (
                    <div
                      className={styles.modalOverlay}
                      onClick={() => setChallengeModalOpen(false)}
                    >
                      <div
                        className={styles.modalContent}
                        role="dialog"
                        aria-labelledby="challenge-modal-title"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <h3
                          id="challenge-modal-title"
                          className="mb-4 text-lg font-semibold"
                        >
                          Terms of Service
                        </h3>
                        <p className="mb-6 text-sm text-gray-600">
                          Please accept the terms. The buttons lack test ids!
                          Use ARIA or text content.
                        </p>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setChallengeModalOpen(false)}
                            aria-label="Decline terms"
                            className="h-9 rounded bg-gray-200 px-4 text-sm font-medium text-gray-900 hover:bg-gray-300"
                          >
                            Decline
                          </button>
                          <button
                            onClick={() => {
                              setChallengeModalOpen(false);
                              setResult("Accepted");
                              complete();
                            }}
                            aria-label="Accept terms"
                            className="h-9 rounded bg-black px-4 text-sm font-medium text-white hover:bg-gray-800"
                          >
                            Accept
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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
