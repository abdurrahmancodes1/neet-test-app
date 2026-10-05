import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import { getCurrentUser, logoutUser, saveUserAttempt, API_BASE } from './utils/auth.js';
import { computeResult } from './utils/scoring.js';
import { NEET_WEP_TEST, NEET_WEP_QUESTIONS } from './data/neetWorkEnergyTest.js';
import { NEET_CALCULUS_TEST, NEET_CALCULUS_QUESTIONS } from './data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST, NEET_2026_CORE_QUESTIONS } from './data/neet2026CoreTopicsTest.js';
import { NEET_BIOLOGY_TEST, NEET_BIOLOGY_QUESTIONS } from './data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST, NEET_MECHANICS_BONDING_QUESTIONS } from './data/neetMechanicsBondingTest.js';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import ChapterTestsPage from './pages/ChapterTestsPage.jsx';
import TestInstructionsPage from './pages/TestInstructionsPage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const ACTIVE_TEST_KEY = 'neet_active_test_id';

const ALL_TESTS = {
  [NEET_MECHANICS_BONDING_TEST.id]: {
    ...NEET_MECHANICS_BONDING_TEST,
    questions: NEET_MECHANICS_BONDING_QUESTIONS,
  },
  [NEET_BIOLOGY_TEST.id]: {
    ...NEET_BIOLOGY_TEST,
    questions: NEET_BIOLOGY_QUESTIONS,
  },
  [NEET_2026_CORE_TEST.id]: {
    ...NEET_2026_CORE_TEST,
    questions: NEET_2026_CORE_QUESTIONS,
  },
  [NEET_CALCULUS_TEST.id]: {
    ...NEET_CALCULUS_TEST,
    questions: NEET_CALCULUS_QUESTIONS,
  },
  [NEET_WEP_TEST.id]: {
    ...NEET_WEP_TEST,
    questions: NEET_WEP_QUESTIONS,
  },
};

const getSavedTestId = () => {
  try {
    const saved = window.localStorage.getItem(ACTIVE_TEST_KEY);
    return saved && ALL_TESTS[saved] ? saved : NEET_WEP_TEST.id;
  } catch {
    return NEET_WEP_TEST.id;
  }
};

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => getCurrentUser());
  const [screen, setScreen] = useState(() => {
    const user = getCurrentUser();
    if (!user) return 'auth';
    if (user.role === 'admin') return 'admin';
    return 'dashboard';
  });
  const [testId, setTestId] = useState(getSavedTestId);
  const [session, setSession] = useState(() => loadSession(getSavedTestId()));
  const [reviewedAttempt, setReviewedAttempt] = useState(null);

  // Live role check on mount / user change (syncs if role was changed in MongoDB Compass)
  useEffect(() => {
    if (currentUser?.email) {
      fetch(`${API_BASE}/auth/user-role/${encodeURIComponent(currentUser.email)}`, {
        credentials: 'include',
      })
        .then((r) => r.json())
        .then((res) => {
          if (res?.data?.role) {
            const freshRole = res.data.role.toLowerCase();
            if (freshRole !== currentUser.role) {
              const updated = { ...currentUser, role: freshRole };
              setCurrentUser(updated);
              try {
                window.localStorage.setItem('neet_current_user_v1', JSON.stringify(updated));
              } catch {}
              if (freshRole === 'admin') {
                setScreen('admin');
              }
            }
          }
        })
        .catch(() => {});
    }
  }, [currentUser?.email]);

  // Dynamically resolve active test configuration
  const activeTest = useMemo(() => {
    return ALL_TESTS[testId] || ALL_TESTS[NEET_WEP_TEST.id];
  }, [testId]);

  const durationMs = useMemo(() => {
    if (session?.endTime && session?.startTime) {
      return Math.max(0, session.endTime - session.startTime);
    }
    return (activeTest.durationMinutes || 120) * 60 * 1000;
  }, [session?.endTime, session?.startTime, activeTest.durationMinutes]);

  // Auto-submission when timer expires
  useEffect(() => {
    if (session.state === 'IN_PROGRESS' && session.endTime && Date.now() >= session.endTime) {
      const submittedAt = session.endTime;
      const next = { ...session, state: 'SUBMITTED', submittedAt, autoSubmitted: true };
      saveSession(next, testId);
      setSession(next);

      // Save to user history
      if (currentUser?.email) {
        const computed = computeResult(next.answers || {}, activeTest.questions);
        const timeTakenMs = next.startTime ? Math.max(0, submittedAt - next.startTime) : durationMs;
        saveUserAttempt(currentUser.email, {
          testId: activeTest.id,
          testTitle: activeTest.title,
          score: computed.score,
          rawScore: computed.rawScore,
          maxScore: computed.maxScore,
          percentage: computed.percentage,
          accuracy: computed.accuracy,
          correct: computed.correct,
          wrong: computed.wrong,
          unattempted: computed.unattempted,
          totalQuestions: computed.totalQuestions,
          topicPerformance: computed.topicPerformance,
          weakestTopics: computed.weakestTopics,
          strongestTopics: computed.strongestTopics,
          perQuestion: computed.perQuestion,
          answers: next.answers || {},
          timeTakenMs,
          autoSubmitted: true,
        });
      }

      setReviewedAttempt(null);
      setScreen('result');
    }
  }, [session, testId, currentUser, activeTest, durationMs]);

  const updateSession = useCallback(
    (updater) =>
      setSession((previous) => {
        const next = typeof updater === 'function' ? updater(previous) : updater;
        saveSession(next, testId);
        return next;
      }),
    [testId]
  );

  const handleAuthSuccess = useCallback((user) => {
    setCurrentUser(user);
    if (user?.role === 'admin') {
      setScreen('admin');
    } else {
      setScreen('dashboard');
    }
  }, []);

  const handleLogout = useCallback(() => {
    logoutUser();
    setCurrentUser(null);
    setScreen('auth');
  }, []);

  const handleGoToDashboard = useCallback(() => {
    setReviewedAttempt(null);
    setScreen('dashboard');
  }, []);

  const handleGoToAdmin = useCallback(() => {
    setReviewedAttempt(null);
    setScreen('admin');
  }, []);

  const handleBrowseTests = useCallback(() => {
    setReviewedAttempt(null);
    setScreen('chapters');
  }, []);

  const handleSelectTest = useCallback((selectedId) => {
    setTestId(selectedId);
    setReviewedAttempt(null);
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

  const startTest = useCallback(
    async (customDurationMinutes) => {
      setReviewedAttempt(null);
      let effectiveMinutes = activeTest.durationMinutes || 120;
      if (customDurationMinutes && !isNaN(Number(customDurationMinutes))) {
        const maxCap = activeTest.maxCustomDurationMinutes || 180; // Maximum 3 hours (180 mins)
        const minCap = activeTest.minCustomDurationMinutes || 10;
        effectiveMinutes = Math.max(minCap, Math.min(maxCap, Number(customDurationMinutes)));
      }
      const effectiveDurationMs = effectiveMinutes * 60 * 1000;
      const next = freshSession(effectiveDurationMs, testId);
      next.durationMinutes = effectiveMinutes;
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
    },
    [activeTest, testId]
  );

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

      // Record snapshot to user attempt history
      if (currentUser?.email) {
        const computed = computeResult(updatedSession.answers || {}, activeTest.questions);
        const timeTakenMs = session.startTime ? Math.max(0, submittedAt - session.startTime) : 0;
        saveUserAttempt(currentUser.email, {
          testId: activeTest.id,
          testTitle: activeTest.title,
          score: computed.score,
          rawScore: computed.rawScore,
          maxScore: computed.maxScore,
          percentage: computed.percentage,
          accuracy: computed.accuracy,
          correct: computed.correct,
          wrong: computed.wrong,
          unattempted: computed.unattempted,
          totalQuestions: computed.totalQuestions,
          topicPerformance: computed.topicPerformance,
          weakestTopics: computed.weakestTopics,
          strongestTopics: computed.strongestTopics,
          perQuestion: computed.perQuestion,
          answers: updatedSession.answers || {},
          timeTakenMs,
          autoSubmitted: auto,
        });
      }

      setReviewedAttempt(null);
      setScreen('result');
    },
    [session, updateSession, currentUser, activeTest]
  );

  const retake = useCallback(() => {
    setReviewedAttempt(null);
    clearSession(testId);
    const s = loadSession(testId);
    setSession(s);
    setScreen('instructions');
  }, [testId]);

  const handleReviewAttempt = useCallback((attempt) => {
    setReviewedAttempt(attempt);
    setScreen('result');
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

  // If not logged in, render authentication page
  if (!currentUser || screen === 'auth') {
    return <AuthPage onAuthSuccess={handleAuthSuccess} />;
  }

  // Admin Portal Dashboard
  if (screen === 'admin') {
    return (
      <AdminDashboardPage
        user={currentUser}
        onGoToStudentDashboard={handleGoToDashboard}
        onLogout={handleLogout}
      />
    );
  }

  // Student Dashboard Page
      <DashboardPage
        user={currentUser}
        onStartTest={(id) => handleSelectTest(id || NEET_CALCULUS_TEST.id)}
        onBrowseTests={handleBrowseTests}
        onReviewAttempt={handleReviewAttempt}
        onGoToAdmin={currentUser.role === 'admin' ? handleGoToAdmin : null}
        onLogout={handleLogout}
      />

  // Chapters / All Standard Tests Portal
  if (screen === 'chapters') {
    return (
      <ChapterTestsPage
        onSelect={handleSelectTest}
        onLogout={handleLogout}
        user={currentUser}
        onGoToDashboard={handleGoToDashboard}
      />
    );
  }

  // Instructions Page
  if (screen === 'instructions') {
    return (
      <TestInstructionsPage
        test={activeTest}
        onBack={handleGoToDashboard}
        onStart={startTest}
      />
    );
  }

  // Test In-Progress Page
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

  // Result and Solution Review Page
  return (
    <ResultPage
      session={session}
      onRetake={retake}
      test={activeTest}
      backendResult={null}
      onBackToChapters={handleBrowseTests}
      onGoToDashboard={handleGoToDashboard}
      reviewedAttempt={reviewedAttempt}
    />
  );
}
