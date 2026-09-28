import React, { useCallback, useEffect, useState } from 'react';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import { NEET_WEP_TEST, NEET_WEP_QUESTIONS } from './data/neetWorkEnergyTest.js';
import ChapterTestsPage from './pages/ChapterTestsPage.jsx';
import TestInstructionsPage from './pages/TestInstructionsPage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const ACTIVE_TEST_KEY = 'neet_active_test_id';

const getSavedTestId = () => {
  try {
    return window.localStorage.getItem(ACTIVE_TEST_KEY) || NEET_WEP_TEST.id;
  } catch {
    return NEET_WEP_TEST.id;
  }
};

export default function App() {
  const [screen, setScreen] = useState('chapters');
  const [testId, setTestId] = useState(getSavedTestId);
  const [session, setSession] = useState(() => loadSession(getSavedTestId()));

  // Self-contained test configuration (No external DB required)
  const activeTest = React.useMemo(() => {
    return {
      ...NEET_WEP_TEST,
      questions: NEET_WEP_QUESTIONS,
    };
  }, []);

  const durationMs = (activeTest.durationMinutes || 120) * 60 * 1000;

  // Auto-submission when timer hits 0
  useEffect(() => {
    if (session.state === 'IN_PROGRESS' && session.endTime && Date.now() >= session.endTime) {
      const next = { ...session, state: 'SUBMITTED', submittedAt: session.endTime, autoSubmitted: true };
      saveSession(next, testId);
      setSession(next);
      setScreen('result');
    }
  }, [session, testId]);

  const updateSession = useCallback(
    (updater) =>
      setSession((previous) => {
        const next = typeof updater === 'function' ? updater(previous) : updater;
        saveSession(next, testId);
        return next;
      }),
    [testId]
  );

  const handleSelectTest = useCallback((selectedId) => {
    setTestId(selectedId);
    try {
      window.localStorage.setItem(ACTIVE_TEST_KEY, selectedId);
    } catch {}

    const s = loadSession(selectedId);
    setSession(s);
    if (s.state === 'IN_PROGRESS') {
      setScreen('test');
    } else if (s.state === 'SUBMITTED') {
      setScreen('result');
    } else {
      setScreen('instructions');
    }
  }, []);

  const startTest = useCallback(async () => {
    const next = freshSession(durationMs, testId);
    saveSession(next, testId);
    setSession(next);
    setScreen('test');
    try {
      if (document.documentElement.requestFullscreen) {
        await document.documentElement.requestFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen request failed:', error);
    }
  }, [durationMs, testId]);

  const submitTest = useCallback(
    (auto = false) => {
      const submittedAt = Math.min(Date.now(), session.endTime ?? Date.now());
      const updatedSession = {
        ...session,
        state: 'SUBMITTED',
        submittedAt,
        autoSubmitted: auto,
      };
      updateSession(updatedSession);
      setScreen('result');
    },
    [session, updateSession]
  );

  const retake = useCallback(() => {
    clearSession(testId);
    const s = loadSession(testId);
    setSession(s);
    setScreen('instructions');
  }, [testId]);

  const backToChapters = useCallback(() => {
    setScreen('chapters');
  }, []);

  useEffect(() => {
    if (screen !== 'test') return undefined;
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === null) {
        // Exited fullscreen
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [screen]);

  if (screen === 'chapters') {
    return <ChapterTestsPage onSelect={handleSelectTest} />;
  }

  if (screen === 'instructions') {
    return (
      <TestInstructionsPage
        test={activeTest}
        onBack={backToChapters}
        onStart={startTest}
      />
    );
  }

  if (screen === 'test') {
    return (
      <TestPage
        session={session}
        updateSession={updateSession}
        onSubmit={submitTest}
        test={activeTest}
      />
    );
  }

  return (
    <ResultPage
      session={session}
      onRetake={retake}
      test={activeTest}
      backendResult={null}
      onBackToChapters={backToChapters}
    />
  );
}
