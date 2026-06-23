import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { challenges } from "@/data/challenges-registry";
import ChallengeWorkspaceLayout from "../_components/ChallengeWorkspaceLayout";
import { GhostElementPlayground } from "./_components/ghost-element-playground";
import { ImpatientUserPlayground } from "./_components/impatient-user-playground";
import { StubbornApiPlayground } from "./_components/stubborn-api-playground";
import { DragDropPlayground } from "./_components/drag-drop-playground";

interface Props {
  params: Promise<{ challengeId: string }>;
}

// ── Playground component map ─────────────────────────────────
const PLAYGROUNDS: Record<string, ReactNode> = {
  "ghost-element": <GhostElementPlayground />,
  "impatient-user": <ImpatientUserPlayground />,
  "stubborn-api": <StubbornApiPlayground />,
  "drag-drop-puzzle": <DragDropPlayground />,
};

// ── Metadata ─────────────────────────────────────────────────
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { challengeId } = await params;
  const challenge = challenges.find((c) => c.id === challengeId);

  if (!challenge) {
    return { title: "Challenge Not Found | QA Playground" };
  }

  return {
    title: `${challenge.title} | QA Playground`,
    description: challenge.description,
    openGraph: {
      title: `${challenge.title} | QA Playground`,
      description: challenge.description,
      url: `https://qaplayground.com/challenges/${challengeId}`,
      siteName: "QA Playground",
      type: "website",
    },
  };
}

// ── Page ─────────────────────────────────────────────────────
export default async function ChallengeRoute({ params }: Props) {
  const { challengeId } = await params;
  const challenge = challenges.find((c) => c.id === challengeId);

  if (!challenge) notFound();

  const playground = PLAYGROUNDS[challengeId] ?? null;

  return (
    <ChallengeWorkspaceLayout challenge={challenge}>
      {playground}
    </ChallengeWorkspaceLayout>
  );
}
