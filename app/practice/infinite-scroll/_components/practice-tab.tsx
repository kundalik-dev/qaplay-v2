"use client";

import { useState } from "react";
import { ScenarioCard, ProgressWidget, FrameworkMethodsPanel, UpNextCard } from "@/components/practice";
import type { ProgressItem } from "@/components/practice";
import { infiniteScrollScenarios, frameworkMethods } from "@/data/practice-data/infinite-scroll/scenarios";
import type { PracticePageMeta } from "@/data/practice-data/types";
import styles from "./infinite-scroll.module.css";
import { Loader2 } from "lucide-react";

interface PracticeTabProps {
  upNext: PracticePageMeta["upNext"];
}

export function PracticeTab({ upNext }: PracticeTabProps) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());

  function markDone(id: string) {
    setCompletedIds((prev) => new Set([...prev, id]));
  }

  const progressItems: ProgressItem[] = infiniteScrollScenarios.map((s) => ({
    id: s.id.toLowerCase(),
    label: s.title,
    done: completedIds.has(s.id.toLowerCase()),
  }));

  // S01: Simple Scroll State
  const [simpleItems, setSimpleItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [simpleLoading, setSimpleLoading] = useState(false);
  const [simpleEnd, setSimpleEnd] = useState(false);

  const handleSimpleScroll = (e: React.UIEvent<HTMLDivElement>, setResult: (val: string) => void, complete: () => void) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5 && !simpleLoading && !simpleEnd) {
      setSimpleLoading(true);
      setTimeout(() => {
        if (simpleItems.length >= 15) {
          setSimpleEnd(true);
          setResult("Reached End of List");
          complete();
        } else {
          setSimpleItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3, prev.length + 4, prev.length + 5]);
        }
        setSimpleLoading(false);
      }, 600);
    }
  };

  // S02: Dynamic Scroll State
  const [dynamicItems, setDynamicItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [dynamicLoading, setDynamicLoading] = useState(false);

  const handleDynamicScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5 && !dynamicLoading) {
      setDynamicLoading(true);
      setTimeout(() => {
        if (dynamicItems.length < 50) {
          setDynamicItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3, prev.length + 4, prev.length + 5]);
        }
        setDynamicLoading(false);
      }, 500);
    }
  };

  // S03: Virtualized Scroll State
  const [virtualStart, setVirtualStart] = useState(0);
  const virtualTotal = 100;
  const itemHeight = 40;
  const containerHeight = 200;
  
  const handleVirtualScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop } = e.currentTarget;
    const startIndex = Math.floor(scrollTop / itemHeight);
    setVirtualStart(startIndex);
  };
  
  const visibleItems: number[] = [];
  const startNode = Math.max(0, virtualStart - 2);
  const endNode = Math.min(virtualTotal, virtualStart + Math.ceil(containerHeight / itemHeight) + 2);
  
  for (let i = startNode; i < endNode; i++) {
    visibleItems.push(i + 1);
  }

  // S04: Challenge Manual Load More State
  const [challengeItems, setChallengeItems] = useState<number[]>([1, 2, 3, 4, 5]);
  const [challengeLoads, setChallengeLoads] = useState(0);
  const [challengeLoading, setChallengeLoading] = useState(false);

  const handleChallengeScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 5 && !challengeLoading && challengeLoads < 2) {
      setChallengeLoading(true);
      setTimeout(() => {
        setChallengeItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3, prev.length + 4, prev.length + 5]);
        setChallengeLoads((prev) => prev + 1);
        setChallengeLoading(false);
      }, 500);
    }
  };

  const manualLoadMore = () => {
    setChallengeLoading(true);
    setTimeout(() => {
      setChallengeItems((prev) => [...prev, prev.length + 1, prev.length + 2, prev.length + 3, prev.length + 4, prev.length + 5]);
      setChallengeLoads((prev) => prev + 1);
      setChallengeLoading(false);
    }, 800);
  };

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

            {/* S01: Simple Scroll Appends */}
            <ScenarioCard {...infiniteScrollScenarios[0]} onComplete={() => markDone("s01")}>
              {({ setResult, complete }) => (
                <div className="flex flex-col gap-2">
                  <div 
                    className={styles.scrollContainer}
                    data-testid="scroll-container-simple"
                    onScroll={(e) => handleSimpleScroll(e, setResult, complete)}
                  >
                    {simpleItems.map((item) => (
                      <div key={item} className={styles.listItem} data-testid={`item-${item}`}>
                        List Item {item}
                      </div>
                    ))}
                    {simpleLoading && (
                      <div className="flex justify-center p-2 text-blue-600">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    )}
                    {simpleEnd && (
                      <div className="text-center p-3 text-sm text-gray-500 font-medium" data-testid="end-of-list-simple">
                        End of List
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ScenarioCard>

            {/* S02: Dynamic ID Target */}
            <ScenarioCard {...infiniteScrollScenarios[1]} onComplete={() => markDone("s02")}>
              {({ setResult, complete }) => (
                <div className="flex flex-col gap-2">
                  <div 
                    className={styles.scrollContainer}
                    data-testid="scroll-container-dynamic"
                    onScroll={handleDynamicScroll}
                  >
                    {dynamicItems.map((item) => {
                      const invId = `INV-${item.toString().padStart(3, '0')}`;
                      return (
                        <div key={item} className={`${styles.listItem} flex justify-between`} data-invoice-id={invId}>
                          <span>Invoice {invId}</span>
                          {item === 42 && (
                            <button 
                              className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700"
                              onClick={() => {
                                setResult(`Clicked Invoice ${invId}`);
                                complete();
                              }}
                            >
                              Action
                            </button>
                          )}
                        </div>
                      );
                    })}
                    {dynamicLoading && (
                      <div className="flex justify-center p-2 text-purple-600">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </ScenarioCard>

            {/* S03: Virtualized DOM */}
            <ScenarioCard {...infiniteScrollScenarios[2]} onComplete={() => markDone("s03")}>
              {({ setResult, complete }) => (
                <div className="flex flex-col gap-2">
                  <div 
                    className={styles.scrollContainer}
                    data-testid="scroll-container-virtual"
                    onScroll={handleVirtualScroll}
                  >
                    <div style={{ height: virtualTotal * itemHeight, position: 'relative' }}>
                      {visibleItems.map((item) => (
                        <div 
                          key={item}
                          className={`${styles.listItem} flex justify-between`}
                          style={{
                            position: 'absolute',
                            top: (item - 1) * itemHeight,
                            width: '100%',
                            height: itemHeight - 8,
                            margin: 0
                          }}
                          data-testid={`virtual-item-${item}`}
                        >
                          <span>Virtualized Row {item}</span>
                          {item === 50 && (
                            <button 
                              className="text-xs bg-black text-white px-2 py-1 rounded"
                              onClick={() => {
                                setResult("Clicked Row 50");
                                complete();
                              }}
                            >
                              Select
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </ScenarioCard>

            {/* S04: Challenge Manual Load More */}
            <ScenarioCard {...infiniteScrollScenarios[3]} onComplete={() => markDone("s04")}>
              {({ setResult, complete }) => (
                <div className="flex flex-col gap-2">
                  <div 
                    className={styles.scrollContainer}
                    data-testid="scroll-container-challenge"
                    onScroll={handleChallengeScroll}
                  >
                    {challengeItems.map((item) => (
                      <div key={item} className={`${styles.listItem} flex justify-between`}>
                        <span>Secret Item {item}</span>
                        {item === 20 && (
                          <button 
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded"
                            aria-label="Confirm secret item"
                            onClick={() => {
                              setResult("Found Secret Item");
                              complete();
                            }}
                          >
                            Confirm
                          </button>
                        )}
                      </div>
                    ))}
                    
                    {challengeLoading && (
                      <div className="flex justify-center p-2 text-gray-500">
                        <Loader2 className="animate-spin" size={20} />
                      </div>
                    )}
                    
                    {challengeLoads === 2 && challengeItems.length < 20 && !challengeLoading && (
                      <div className="flex justify-center p-2">
                        <button 
                          className="text-sm bg-gray-200 text-gray-800 px-4 py-2 rounded font-medium hover:bg-gray-300"
                          onClick={manualLoadMore}
                        >
                          Load More
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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
