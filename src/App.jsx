import React, { useCallback, useEffect, useState } from 'react';
import { getTest, DEFAULT_TEST_ID } from './data/tests.js';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import LoginPage from './pages/LoginPage.jsx';
import ChapterTestsPage from './pages/ChapterTestsPage.jsx';
import TestInstructionsPage from './pages/TestInstructionsPage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const LOGIN_KEY = 'neet_logged_in';
const ACTIVE_TEST_KEY = 'neet_active_test_id';

const isLoggedIn = () => {
  try {
    return window.localStorage.getItem(LOGIN_KEY) === 'true';
  } catch {
    return false;
  }
};

const getSavedTestId = () => {
  try {
    return window.localStorage.getItem(ACTIVE_TEST_KEY) || DEFAULT_TEST_ID;
  } catch {
    return DEFAULT_TEST_ID;
  }
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [screen, setScreen] = useState('chapters');
  const [testId, setTestId] = useState(getSavedTestId);
  const [session, setSession] = useState(() => loadSession(getSavedTestId()));

  const activeTest = getTest(testId);
  const durationMs = (activeTest.durationMinutes || 60) * 60 * 1000;

  useEffect(() => {
    if (session.state === 'IN_PROGRESS' && session.endTime && Date.now() >= session.endTime) {
      const next = { ...session, state: 'SUBMITTED', submittedAt: session.endTime, autoSubmitted: true };
      saveSession(next, testId);
      setSession(next);
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

  const login = useCallback(() => {
    try {
      window.localStorage.setItem(LOGIN_KEY, 'true');
    } catch {}
    setLoggedIn(true);
    setScreen('chapters');
  }, []);

  const logout = useCallback(() => {
    try {
      window.localStorage.removeItem(LOGIN_KEY);
    } catch {}
    setLoggedIn(false);
    setScreen('chapters');
  }, []);

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
    (auto) => {
      updateSession((previous) =>
        previous.state === 'SUBMITTED'
          ? previous
          : {
              ...previous,
              state: 'SUBMITTED',
              submittedAt: Math.min(Date.now(), previous.endTime ?? Date.now()),
              autoSubmitted: auto,
            }
      );
      setScreen('result');
    },
    [updateSession]
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
        submitTest(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, [screen, submitTest]);

  if (!loggedIn) return <LoginPage onLogin={login} />;

  if (screen === 'chapters') {
    return <ChapterTestsPage onSelect={handleSelectTest} onLogout={logout} />;
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
      onBackToChapters={backToChapters}
    />
  );
}
