import { notFound } from "next/navigation";
import { challenges } from "@/data/challenges-registry";
import ChallengeWorkspaceLayout from "../_components/ChallengeWorkspaceLayout";

// Dummy implementations for the target UIs

function GhostElementPlayground() {
  return (
    <div style={{ border: '1px dashed var(--border-strong)', padding: '32px', borderRadius: '8px', display: 'flex', justifyContent: 'center' }}>
      <div style={{ background: 'color-mix(in srgb, var(--accent2) 5%, transparent)', border: '1px solid color-mix(in srgb, var(--accent2) 20%, transparent)', padding: '24px', borderRadius: '4px', position: 'relative', width: '100%', textAlign: 'center' }}>
        <div style={{ position: 'absolute', top: '-10px', left: '12px', background: 'var(--accent2)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>#shadow-root (open)</div>
        <button className="btn btn-secondary" id="secret-btn">Reveal Secret</button>
      </div>
    </div>
  );
}

function ImpatientUserPlayground() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <button className="btn btn-primary" id="start-processing-btn">Start Processing</button>
      <div style={{ height: '40px' }}>
        {/* Toast will appear here dynamically via JS in a real app */}
        <span className="text-muted" style={{ fontSize: '12px' }}>Waiting for action...</span>
      </div>
    </div>
  );
}

function StubbornApiPlayground() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <div style={{ background: 'color-mix(in srgb, var(--danger) 10%, transparent)', border: '1px solid var(--danger)', padding: '16px', borderRadius: '8px', color: 'var(--danger)' }}>
        <strong>Error 500:</strong> Failed to load user stats from /api/user-stats
      </div>
      <button className="btn btn-secondary">Retry Fetch</button>
    </div>
  );
}

function DragDropPlayground() {
  return (
    <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
      <div style={{ width: '150px', background: 'var(--surface2)', padding: '16px', borderRadius: '8px', minHeight: '200px' }}>
        <h4 style={{ marginBottom: '16px', fontSize: '14px' }}>To Do</h4>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: '12px', borderRadius: '4px', cursor: 'grab' }} draggable id="ticket-1">
          Ticket #1042
        </div>
      </div>
      <div style={{ width: '150px', background: 'var(--surface2)', padding: '16px', borderRadius: '8px', minHeight: '200px' }} id="done-column">
        <h4 style={{ marginBottom: '16px', fontSize: '14px' }}>Done</h4>
      </div>
    </div>
  );
}

export default function ChallengeRoute({ params }: { params: { challengeId: string } }) {
  const challenge = challenges.find(c => c.id === params.challengeId);
  
  if (!challenge) {
    notFound();
  }

  return (
    <ChallengeWorkspaceLayout challenge={challenge}>
      {params.challengeId === "ghost-element" && <GhostElementPlayground />}
      {params.challengeId === "impatient-user" && <ImpatientUserPlayground />}
      {params.challengeId === "stubborn-api" && <StubbornApiPlayground />}
      {params.challengeId === "drag-drop-puzzle" && <DragDropPlayground />}
    </ChallengeWorkspaceLayout>
  );
}
