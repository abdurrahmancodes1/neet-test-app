import React, { useCallback, useEffect, useState } from 'react';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import {
  useGetTestsQuery,
  useGetTestByIdQuery,
  useGetTestQuestionsQuery,
  useSubmitTestMutation,
} from './features/tests/testsApiSlice.js';
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
    return window.localStorage.getItem(ACTIVE_TEST_KEY) || 'laws-of-motion';
  } catch {
    return 'laws-of-motion';
  }
};

export default function App() {
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [screen, setScreen] = useState('chapters');
  const [testId, setTestId] = useState(getSavedTestId);
  const [session, setSession] = useState(() => loadSession(getSavedTestId()));
  const [backendResult, setBackendResult] = useState(null);

  // Fetch available tests list from server
  const { data: serverTests } = useGetTestsQuery();

  // Fetch active test details and questions dynamically from API
  const { data: serverTest } = useGetTestByIdQuery(testId, { skip: !testId });
  const { data: serverQuestions } = useGetTestQuestionsQuery(testId, { skip: !testId });
  const [submitTestApi] = useSubmitTestMutation();

  // Dynamically constructed active test object
  const activeTest = React.useMemo(() => {
    if (serverTest) {
      return {
        id: serverTest.slug || serverTest._id || testId,
        _id: serverTest._id,
        title: serverTest.title,
        subtitle: serverTest.subtitle || '',
        subject: Array.isArray(serverTest.subjects) ? serverTest.subjects.join(' & ') : serverTest.subjects || 'NEET',
        chapter: serverTest.chapters?.[0] || 'General',
        syllabus: serverTest.syllabus || serverTest.description || '',
        difficulty: serverTest.difficulty || 'Hard',
        durationMinutes: serverTest.durationMinutes || 60,
        totalQuestions: serverTest.totalQuestions || serverQuestions?.length || 45,
        totalMarks: serverTest.totalMarks || (serverTest.totalQuestions || 45) * 4,
        marksCorrect: serverTest.markingScheme?.correct || 4,
        marksWrong: serverTest.markingScheme?.wrong || -1,
        testCode: serverTest.testCode || 'NEET2025',
        allowedCodes: serverTest.allowedCodes || [serverTest.testCode || 'NEET2025'],
        questions: serverQuestions || [],
      };
    }
    // Default placeholder while loading from API
    return {
      id: testId,
      title: 'NEET Practice Test',
      subtitle: 'Loading test details...',
      subject: 'NEET',
      chapter: 'General',
      syllabus: '',
      difficulty: 'Hard',
      durationMinutes: 60,
      totalQuestions: 45,
      totalMarks: 180,
      marksCorrect: 4,
      marksWrong: -1,
      testCode: 'NEET2025',
      allowedCodes: ['NEET2025'],
      questions: serverQuestions || [],
    };
  }, [serverTest, serverQuestions, testId]);

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
    setBackendResult(null);
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
    setBackendResult(null);
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
    async (auto) => {
      const submittedAt = Math.min(Date.now(), session.endTime ?? Date.now());
      const updatedSession = {
        ...session,
        state: 'SUBMITTED',
        submittedAt,
        autoSubmitted: auto,
      };
      updateSession(updatedSession);

      // Submit to backend REST API
      try {
        const response = await submitTestApi({
          testId: activeTest._id || activeTest.id,
          answers: session.answers || {},
          markedForReview: session.markedForReview || [],
          autoSubmitted: auto,
          timeSpentSeconds: Math.round((submittedAt - (session.startTime || submittedAt)) / 1000),
          startTime: session.startTime,
        }).unwrap();
        if (response) {
          setBackendResult(response);
        }
      } catch (err) {
        console.warn('Backend submission error:', err);
      }

      setScreen('result');
    },
    [session, updateSession, submitTestApi, activeTest]
  );

  const retake = useCallback(() => {
    clearSession(testId);
    const s = loadSession(testId);
    setSession(s);
    setBackendResult(null);
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
      backendResult={backendResult}
      onBackToChapters={backToChapters}
    />
  );
}
