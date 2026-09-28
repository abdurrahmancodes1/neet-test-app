import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { loadSession, saveSession, clearSession, freshSession } from './utils/storage.js';
import { getCurrentUser, logoutUser, saveUserAttempt } from './utils/auth.js';
import { computeResult } from './utils/scoring.js';
import { NEET_WEP_TEST, NEET_WEP_QUESTIONS } from './data/neetWorkEnergyTest.js';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
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

  // Self-contained active test configuration
  const activeTest = useMemo(() => {
    return {
      ...NEET_WEP_TEST,
      questions: NEET_WEP_QUESTIONS,
    };
  }, []);

  const durationMs = (activeTest.durationMinutes || 120) * 60 * 1000;

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

  const startTest = useCallback(async () => {
    setReviewedAttempt(null);
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
  if (screen === 'dashboard') {
    return (
      <DashboardPage
        user={currentUser}
        onStartTest={() => handleSelectTest(NEET_WEP_TEST.id)}
        onBrowseTests={handleBrowseTests}
        onReviewAttempt={handleReviewAttempt}
        onGoToAdmin={currentUser.role === 'admin' ? handleGoToAdmin : null}
        onLogout={handleLogout}
      />
    );
  }

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
