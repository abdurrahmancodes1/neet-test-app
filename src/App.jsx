import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FlaskConical, Clock, ListChecks, ShieldCheck, Play } from 'lucide-react';
import { questions, TEST_DURATION_MINUTES, TOTAL_QUESTIONS } from './data/questions.js';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const DURATION_MS = TEST_DURATION_MINUTES * 60 * 1000;

function StartScreen({ onStart, resumable, onResume }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4 py-10">
      <div className="w-full max-w-xl animate-rise-in">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 text-gold-300 shadow-card">
            <FlaskConical size={22} strokeWidth={2.25} />
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold-600">NEET Chemistry · Mock Test</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">
            Chemical Bonding &amp; Molecular Structure
          </h1>
          <p className="mt-2 text-sm text-ink-500">63 questions · full NEET marking scheme · one sitting</p>
        </div>

        <div className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Stat icon={<ListChecks size={18} />} label="Questions" value={TOTAL_QUESTIONS} />
            <Stat icon={<Clock size={18} />} label="Duration" value={`${TEST_DURATION_MINUTES} min`} />
            <Stat icon={<ShieldCheck size={18} />} label="Marking" value="+4 / −1" />
            <Stat icon={<FlaskConical size={18} />} label="Max score" value={TOTAL_QUESTIONS * 4} />
          </div>

          <div className="my-6 h-px bg-ink-100" />

          <ul className="mb-6 space-y-2 text-sm text-ink-600">
            <li>• Each correct answer earns +4 marks; each wrong answer costs −1 mark.</li>
            <li>• The timer starts the moment you begin and submits automatically at 00:00.</li>
            <li>• You can mark questions for review and jump between them freely.</li>
            <li>• Your progress is saved locally, so a refresh won't lose your answers.</li>
          </ul>

          {resumable ? (
            <div className="space-y-2">
              <button
                type="button"
                onClick={onResume}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-ink-800"
              >
                <Play size={16} />
                Resume my in-progress attempt
              </button>
              <button
                type="button"
                onClick={onStart}
                className="w-full rounded-lg border border-ink-200 py-3 text-sm font-semibold text-ink-600 transition hover:bg-ink-100"
              >
                Start a fresh attempt instead
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onStart}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-ink-800"
            >
              <Play size={16} />
              Start Test
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-xl bg-ink-100 py-4 text-ink-800">
      {icon}
      <p className="text-lg font-bold">{value}</p>
      <p className="text-[11px] font-medium text-ink-500">{label}</p>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(() => loadSession());
  const [ready, setReady] = useState(false);

  // On mount: if a session was in progress but the timer already expired
  // while the tab was closed, submit it automatically.
  useEffect(() => {
    setSession((prev) => {
      if (prev.state === 'IN_PROGRESS' && prev.endTime && Date.now() >= prev.endTime) {
        const next = { ...prev, state: 'SUBMITTED', submittedAt: prev.endTime, autoSubmitted: true };
        saveSession(next);
        return next;
      }
      return prev;
    });
    setReady(true);
  }, []);

  const updateSession = useCallback((updater) => {
    setSession((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater;
      saveSession(next);
      return next;
    });
  }, []);

  const startNewTest = useCallback(() => {
    const next = freshSession(DURATION_MS);
    saveSession(next);
    setSession(next);
  }, []);

  const resumeTest = useCallback(() => {
    setSession(loadSession());
  }, []);

  const handleSubmit = useCallback(
    (auto) => {
      updateSession((prev) => {
        if (prev.state === 'SUBMITTED') return prev; // prevent duplicate scoring
        return {
          ...prev,
          state: 'SUBMITTED',
          submittedAt: Math.min(Date.now(), prev.endTime ?? Date.now()),
          autoSubmitted: auto,
        };
      });
    },
    [updateSession]
  );

  const handleRetake = useCallback(() => {
    clearSession();
    startNewTest();
  }, [startNewTest]);

  const resumable = useMemo(
    () => session.state === 'IN_PROGRESS' && session.endTime && Date.now() < session.endTime,
    [session.state, session.endTime]
  );

  if (!ready) return null;

  if (session.state === 'NOT_STARTED') {
    return <StartScreen onStart={startNewTest} resumable={false} onResume={resumeTest} />;
  }

  if (session.state === 'IN_PROGRESS') {
    return <TestPage session={session} updateSession={updateSession} onSubmit={handleSubmit} />;
  }

  return <ResultPage session={session} onRetake={handleRetake} />;
}

// Sanity check kept for developers: ensures the bundled question bank matches spec.
if (questions.length !== TOTAL_QUESTIONS) {
  console.warn(`Expected ${TOTAL_QUESTIONS} questions, found ${questions.length}.`);
}
