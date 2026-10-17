import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import {
  loadSession,
  saveSession,
  clearSession,
  freshSession,
  syncLiveSessionToBackend,
  fetchLiveSessionFromBackend,
  clearLiveSessionFromBackend,
} from './utils/storage.js';
import { getCurrentUser, logoutUser, saveUserAttempt, API_BASE } from './utils/auth.js';
import { computeResult } from './utils/scoring.js';
import { NEET_CALCULUS_TEST, NEET_CALCULUS_QUESTIONS } from './data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST, NEET_2026_CORE_QUESTIONS } from './data/neet2026CoreTopicsTest.js';
import { NEET_BIOLOGY_TEST, NEET_BIOLOGY_QUESTIONS } from './data/neetBiologyCoreTest.js';
import { NEET_ROUND_1_TEST, NEET_ROUND_1_QUESTIONS } from './data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST, NEET_ROUND_2_QUESTIONS } from './data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST, NEET_GRAND_MEGA_QUESTIONS } from './data/neetGrandMegaDrillTest.js';
import { NEET_MECHANICS_BONDING_TEST, NEET_MECHANICS_BONDING_QUESTIONS } from './data/neetMechanicsBondingTest.js';
import { JEE_2027_PERIODIC_TEST, JEE_2027_PERIODIC_QUESTIONS } from './data/jee2027PeriodicTableTest.js';
import AuthPage from './pages/AuthPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import AdminDashboardPage from './pages/AdminDashboardPage.jsx';
import AdminDiagnosisPage from './pages/AdminDiagnosisPage.jsx';
import ChapterTestsPage from './pages/ChapterTestsPage.jsx';
import CurriculumPage from './pages/CurriculumPage.jsx';
import TestInstructionsPage from './pages/TestInstructionsPage.jsx';
import TestPage from './pages/TestPage.jsx';
import ResultPage from './pages/ResultPage.jsx';

const ACTIVE_TEST_KEY = 'neet_active_test_id';

const ALL_TESTS = {
  [JEE_2027_PERIODIC_TEST.id]: {
    ...JEE_2027_PERIODIC_TEST,
    questions: JEE_2027_PERIODIC_QUESTIONS,
  },
  [NEET_ROUND_1_TEST.id]: {
    ...NEET_ROUND_1_TEST,
    questions: NEET_ROUND_1_QUESTIONS,
  },
  [NEET_ROUND_2_TEST.id]: {
    ...NEET_ROUND_2_TEST,
    questions: NEET_ROUND_2_QUESTIONS,
  },
  [NEET_GRAND_MEGA_TEST.id]: {
    ...NEET_GRAND_MEGA_TEST,
    questions: NEET_GRAND_MEGA_QUESTIONS,
  },
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
};

const getSavedTestId = () => {
  try {
    const saved = window.localStorage.getItem(ACTIVE_TEST_KEY);
    return saved && ALL_TESTS[saved] ? saved : JEE_2027_PERIODIC_TEST.id;
  } catch {
    return JEE_2027_PERIODIC_TEST.id;
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
  const [lastServerResult, setLastServerResult] = useState(null);
  const [isSubmittingTest, setIsSubmittingTest] = useState(false);
  const [adminDiagnosisAttempt, setAdminDiagnosisAttempt] = useState(null);
  const [adminDiagnosisStudent, setAdminDiagnosisStudent] = useState(null);
  const submittingRef = useRef(false);

  // Platform-wide published tests fetched from backend MongoDB API
  const [platformTests, setPlatformTests] = useState({});

  const fetchPlatformTests = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/tests?limit=100`, {
        credentials: 'include',
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.data && Array.isArray(json.data)) {
          const map = {};
          json.data.forEach((t) => {
            const key = t.slug || t._id;
            map[key] = {
              ...t,
              id: key,
              examType: t.examType || (t.category === 'jee' ? 'JEE_MAIN' : 'NEET'),
              category: t.category || (t.examType?.includes('JEE') ? 'jee' : 'neet'),
            };
          });
          setPlatformTests((prev) => {
            const merged = { ...prev };
            Object.keys(map).forEach((k) => {
              merged[k] = {
                ...map[k],
                questions: prev[k]?.questions || map[k].questions || [],
              };
            });
            return merged;
          });
          return map;
        }
      }
    } catch (err) {
      console.warn('Failed to fetch platform tests from server:', err);
    }
    return {};
  }, []);

  // Fetch platform tests on mount and whenever user changes
  useEffect(() => {
    fetchPlatformTests();
  }, [fetchPlatformTests, currentUser?.email]);

  const handleCustomTestCreated = useCallback(
    (testPayload) => {
      if (!testPayload) return;
      const key = testPayload.slug || testPayload.id;
      setPlatformTests((prev) => ({
        ...prev,
        [key]: {
          ...testPayload,
          id: key,
          examType: testPayload.examType || (testPayload.category === 'jee' ? 'JEE_MAIN' : 'NEET'),
          category: testPayload.category || (testPayload.examType?.includes('JEE') ? 'jee' : 'neet'),
        },
      }));
      // Immediately refresh all platform tests from server
      fetchPlatformTests();
    },
    [fetchPlatformTests]
  );

  // Live role check on mount / user change (syncs if role was changed in MongoDB)
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
    return platformTests[testId] || ALL_TESTS[testId] || ALL_TESTS[JEE_2027_PERIODIC_TEST.id];
  }, [testId, platformTests]);

  const durationMs = useMemo(() => {
    if (session?.endTime && session?.startTime) {
      return Math.max(0, session.endTime - session.startTime);
    }
    return (activeTest.durationMinutes || 120) * 60 * 1000;
  }, [session?.endTime, session?.startTime, activeTest.durationMinutes]);



  // Persistent live session auto-sync during test taking
  const updateSession = useCallback(
    (updater) =>
      setSession((previous) => {
        const next = typeof updater === 'function' ? updater(previous) : updater;
        saveSession(next, testId);
        if (next.state === 'IN_PROGRESS' && currentUser?.email) {
          syncLiveSessionToBackend(next, testId, currentUser, activeTest.questions);
        }
        return next;
      }),
    [testId, currentUser, activeTest.questions]
  );

  // Tab close & background flush for live test session persistence
  useEffect(() => {
    if (session.state !== 'IN_PROGRESS' || !currentUser?.email) return;

    const handleBeforeUnload = () => {
      syncLiveSessionToBackend(session, testId, currentUser, activeTest.questions, true);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        syncLiveSessionToBackend(session, testId, currentUser, activeTest.questions, true);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [session, testId, currentUser, activeTest.questions]);

  const handleAuthSuccess = useCallback((user) => {
    setCurrentUser(user);
    if (user?.role === 'admin') {
      setScreen('admin');
    } else {
      setScreen('dashboard');
    }
  }, []);

  const handleUserUpdated = useCallback((updatedUser) => {
    setCurrentUser(updatedUser);
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

  const handleGoToCurriculum = useCallback(() => {
    setReviewedAttempt(null);
    setScreen('curriculum');
  }, []);

  const handleSelectTest = useCallback(
    async (selectedId, forceFresh = false) => {
      submittingRef.current = false;
      setTestId(selectedId);
      setReviewedAttempt(null);
      setLastServerResult(null);
      try {
        window.localStorage.setItem(ACTIVE_TEST_KEY, selectedId);
      } catch {}

      // If test questions are not yet loaded in memory, dynamically fetch from MongoDB API
      const existing = platformTests[selectedId] || ALL_TESTS[selectedId];
      if (!existing?.questions || existing.questions.length === 0) {
        try {
          const [tRes, qRes] = await Promise.all([
            fetch(`${API_BASE}/tests/${selectedId}`).then((r) => r.json()),
            fetch(`${API_BASE}/tests/${selectedId}/questions`).then((r) => r.json()),
          ]);
          if (tRes?.data) {
            const rawQuestions = qRes?.data || [];
            const questions = rawQuestions.map((q, idx) => ({
              ...q,
              id: q.order || q._id || idx + 1,
              order: q.order || idx + 1,
              number: q.order || idx + 1,
            }));
            const fullTest = {
              ...tRes.data,
              id: tRes.data.slug || tRes.data._id,
              questions,
            };
            setPlatformTests((prev) => ({
              ...prev,
              [selectedId]: fullTest,
              [fullTest.id]: fullTest,
            }));
          }
        } catch (e) {
          console.warn('Could not fetch test from backend:', e);
        }
      }

      let s = loadSession(selectedId);

      if (forceFresh) {
        clearSession(selectedId);
        if (currentUser?.email) {
          clearLiveSessionFromBackend(selectedId, currentUser.email, currentUser.token);
        }
        const effectiveMin = existing?.durationMinutes || 120;
        s = freshSession(effectiveMin * 60 * 1000, selectedId);
        saveSession(s, selectedId);
      } else if (currentUser?.email && s.state !== 'IN_PROGRESS') {
        const remoteLive = await fetchLiveSessionFromBackend(selectedId, currentUser.email, currentUser.token);
        if (remoteLive && remoteLive.state === 'IN_PROGRESS') {
          s = remoteLive;
          saveSession(s, selectedId);
        }
      }

      setSession(s);
      if (s.state === 'IN_PROGRESS') {
        setScreen('test');
      } else if (s.state === 'SUBMITTED' && !forceFresh) {
        setScreen('result');
      } else {
        setScreen('instructions');
      }
    },
    [currentUser, platformTests]
  );

  const startTest = useCallback(
    async (customDurationMinutes) => {
      submittingRef.current = false;
      setReviewedAttempt(null);
      setLastServerResult(null);
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

      // Immediately register active live session with backend
      if (currentUser?.email) {
        syncLiveSessionToBackend(next, testId, currentUser, activeTest.questions, true);
      }

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
    [activeTest, testId, currentUser]
  );

  const submitTest = useCallback(
    async (auto = false) => {
      if (submittingRef.current) return;
      submittingRef.current = true;
      setIsSubmittingTest(true);

      try {
        const submittedAt = Math.min(Date.now(), session.endTime ?? Date.now());
        const attemptId = session.attemptId || `attempt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const updatedSession = {
          ...session,
          attemptId,
          state: 'SUBMITTED',
          submittedAt,
          autoSubmitted: auto,
        };
        updateSession(updatedSession);

        // Record snapshot to user attempt history and backend
        if (currentUser?.email) {
          const timeTakenMs = session.startTime ? Math.max(0, submittedAt - session.startTime) : 0;
          const timeSpentSeconds = Math.round(timeTakenMs / 1000);
          const computed = computeResult(updatedSession.answers || {}, activeTest.questions);

          const submitPayload = {
            attemptId,
            testId: activeTest.id,
            testTitle: activeTest.title || 'NEET Practice Test',
            userId: currentUser._id || currentUser.id || null,
            studentEmail: (currentUser.email || '').toLowerCase().trim(),
            studentName: currentUser.name || 'Anonymous Student',
            studentRollNumber: currentUser.rollNumber || null,
            answers: updatedSession.answers || {},
            markedForReview: updatedSession.markedForReview || [],
            timeSpentSeconds,
            timeTakenMs,
            startTime: session.startTime ? new Date(session.startTime).toISOString() : null,
            autoSubmitted: auto,
            score: computed.score,
            rawScore: computed.rawScore,
            maxScore: computed.maxScore,
            percentage: computed.percentage,
            accuracy: computed.accuracy,
            correct: computed.correct,
            wrong: computed.wrong,
            unattempted: computed.unattempted,
            totalQuestions: computed.totalQuestions,
            topicPerformance: computed.topicPerformance || [],
            weakestTopics: computed.weakestTopics || [],
            strongestTopics: computed.strongestTopics || [],
            perQuestion: computed.perQuestion || [],
          };

          let serverResult = null;

          // 1. Try server-side grading / submission endpoint
          try {
            const res = await fetch(`${API_BASE}/tests/${testId}/submit`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                ...(currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}),
              },
              credentials: 'include',
              body: JSON.stringify(submitPayload),
            });
            if (res.ok) {
              const data = await res.json();
              if (data?.data) {
                serverResult = data.data;
              }
            } else {
              // 2. Fallback to direct results sync endpoint
              const syncRes = await fetch(`${API_BASE}/results/sync`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}),
                },
                credentials: 'include',
                body: JSON.stringify(submitPayload),
              });
              if (syncRes.ok) {
                const syncData = await syncRes.json();
                if (syncData?.data) {
                  serverResult = syncData.data;
                }
              }
            }
          } catch (submitErr) {
            console.warn('Submission network error, attempting sync fallback:', submitErr);
            try {
              const syncRes = await fetch(`${API_BASE}/results/sync`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  ...(currentUser?.token ? { Authorization: `Bearer ${currentUser.token}` } : {}),
                },
                credentials: 'include',
                body: JSON.stringify(submitPayload),
              });
              if (syncRes.ok) {
                const syncData = await syncRes.json();
                if (syncData?.data) {
                  serverResult = syncData.data;
                }
              }
            } catch {}
          }

          // If server submission failed, create a fallback result object
          const effectiveResult = serverResult || {
            ...submitPayload,
            test: {
              id: activeTest.id,
              title: activeTest.title,
            },
          };

          setLastServerResult(effectiveResult);

          // Save to local cache with confirmed server result or computed values
          saveUserAttempt(currentUser.email, {
            ...submitPayload,
            ...(serverResult || {}),
            id: serverResult?.attemptId || attemptId,
            score: serverResult?.score ?? computed.score,
            rawScore: serverResult?.rawScore ?? computed.rawScore,
            maxScore: serverResult?.maxScore ?? computed.maxScore,
            percentage: serverResult?.percentage ?? computed.percentage,
            accuracy: serverResult?.accuracy ?? computed.accuracy,
            correct: serverResult?.correctCount ?? serverResult?.correct ?? computed.correct,
            wrong: serverResult?.wrongCount ?? serverResult?.wrong ?? computed.wrong,
            unattempted: serverResult?.unattemptedCount ?? serverResult?.unattempted ?? computed.unattempted,
            totalQuestions: serverResult?.totalQuestions ?? computed.totalQuestions,
            topicPerformance: serverResult?.topicPerformance ?? computed.topicPerformance,
            weakestTopics: serverResult?.weakestTopics ?? computed.weakestTopics,
            strongestTopics: serverResult?.strongestTopics ?? computed.strongestTopics,
            perQuestion: serverResult?.perQuestion ?? serverResult?.answers ?? computed.perQuestion,
            answers: updatedSession.answers || {},
            timeTakenMs,
            autoSubmitted: auto,
          });
        }

        setReviewedAttempt(null);
        setScreen('result');
      } finally {
        setIsSubmittingTest(false);
        submittingRef.current = false;
      }
    },
    [session, updateSession, currentUser, activeTest, testId]
  );

  // Fallback auto-submission when timer expires (e.g. background tab or timer unmount)
  useEffect(() => {
    if (session.state === 'IN_PROGRESS' && session.endTime && Date.now() >= session.endTime) {
      if (!submittingRef.current) {
        submitTest(true);
      }
    }
  }, [session.state, session.endTime, submitTest]);

  const retake = useCallback(() => {
    submittingRef.current = false;
    setReviewedAttempt(null);
    setLastServerResult(null);
    clearSession(testId);
    if (currentUser?.email) {
      clearLiveSessionFromBackend(testId, currentUser.email, currentUser.token);
    }
    const next = freshSession(durationMs, testId);
    saveSession(next, testId);
    setSession(next);
    setScreen('instructions');
  }, [testId, currentUser, durationMs]);

  const handleReviewAttempt = useCallback(
    async (attempt) => {
      setReviewedAttempt(attempt);
      const targetTestId = attempt?.testId;
      if (targetTestId) {
        setTestId(targetTestId);
        const existing = platformTests[targetTestId] || ALL_TESTS[targetTestId];
        if (!existing?.questions || existing.questions.length === 0) {
          try {
            const [tRes, qRes] = await Promise.all([
              fetch(`${API_BASE}/tests/${targetTestId}`).then((r) => r.json()),
              fetch(`${API_BASE}/tests/${targetTestId}/questions`).then((r) => r.json()),
            ]);
            if (tRes?.data) {
              const rawQuestions = qRes?.data || [];
              const questions = rawQuestions.map((q, idx) => ({
                ...q,
                id: q.order || q._id || idx + 1,
                order: q.order || idx + 1,
                number: q.order || idx + 1,
              }));
              const fullTest = {
                ...tRes.data,
                id: tRes.data.slug || tRes.data._id,
                questions,
              };
              setPlatformTests((prev) => ({
                ...prev,
                [targetTestId]: fullTest,
                [fullTest.id]: fullTest,
              }));
            }
          } catch (e) {
            console.warn('Could not fetch test from backend for review:', e);
          }
        }
      }
      setScreen('result');
    },
    [platformTests]
  );

  const handleDiagnoseAttempt = useCallback((attempt, student) => {
    setAdminDiagnosisAttempt(attempt);
    setAdminDiagnosisStudent(student);
    setScreen('admin-diagnosis');
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

  // Admin Diagnosis Full Page
  if (screen === 'admin-diagnosis') {
    return (
      <AdminDiagnosisPage
        attempt={adminDiagnosisAttempt}
        student={adminDiagnosisStudent}
        onBack={() => setScreen('admin')}
        onLogout={handleLogout}
      />
    );
  }

  // Admin Portal Dashboard
  if (screen === 'admin') {
    return (
      <AdminDashboardPage
        user={currentUser}
        onGoToStudentDashboard={handleGoToDashboard}
        onLogout={handleLogout}
        onDiagnoseAttempt={handleDiagnoseAttempt}
        onTestCreated={handleCustomTestCreated}
        onStartTest={handleSelectTest}
      />
    );
  }

  // Student Dashboard Page
  if (screen === 'dashboard') {
    return (
      <DashboardPage
        user={currentUser}
        onStartTest={(id, forceFresh) => handleSelectTest(id || NEET_CALCULUS_TEST.id, forceFresh)}
        onBrowseTests={handleBrowseTests}
        onReviewAttempt={handleReviewAttempt}
        onGoToCurriculum={handleGoToCurriculum}
        onGoToAdmin={currentUser.role === 'admin' ? handleGoToAdmin : null}
        onLogout={handleLogout}
        onUserUpdated={handleUserUpdated}
        platformTests={platformTests}
      />
    );
  }

  // Tests Catalog Page
  if (screen === 'chapters' || screen === 'tests') {
    return (
      <ChapterTestsPage
        onSelect={handleSelectTest}
        onLogout={handleLogout}
        user={currentUser}
        onGoToDashboard={handleGoToDashboard}
        onGoToCurriculum={handleGoToCurriculum}
        onGoToAdmin={currentUser.role === 'admin' ? handleGoToAdmin : null}
        onUserUpdated={handleUserUpdated}
        platformTests={platformTests}
        customTests={platformTests}
      />
    );
  }

  // Curriculum Portal Page
  if (screen === 'curriculum') {
    return (
      <CurriculumPage
        user={currentUser}
        onStartTest={(id, forceFresh) => handleSelectTest(id || NEET_ROUND_1_TEST.id, forceFresh)}
        onBrowseTests={handleBrowseTests}
        onGoToDashboard={handleGoToDashboard}
        onGoToAdmin={currentUser.role === 'admin' ? handleGoToAdmin : null}
        onLogout={handleLogout}
        onUserUpdated={handleUserUpdated}
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
      <>
        {isSubmittingTest && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md px-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-6 shadow-glow animate-pulse">
              <Loader2 size={32} className="animate-spin text-blue-400" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
              Evaluating &amp; Submitting Test...
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-4">
              Applying official marking scheme (+4 / -1), computing percentile projections, and saving your verified attempt to the cloud.
            </p>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-[pulse_1.5s_infinite]" />
            </div>
          </div>
        )}
        <TestPage
          session={session}
          updateSession={updateSession}
          onSubmit={submitTest}
          test={activeTest}
        />
      </>
    );
  }

  // Result and Solution Review Page
  return (
    <>
      {isSubmittingTest && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/85 backdrop-blur-md px-4 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-6 shadow-glow animate-pulse">
            <Loader2 size={32} className="animate-spin text-blue-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-2">
            Evaluating &amp; Submitting Test...
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-4">
            Applying official marking scheme (+4 / -1), computing percentile projections, and saving your verified attempt to the cloud.
          </p>
          <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-[pulse_1.5s_infinite]" />
          </div>
        </div>
      )}
      <ResultPage
        session={session}
        onRetake={retake}
        test={activeTest}
        backendResult={lastServerResult}
        onBackToChapters={handleBrowseTests}
        onGoToDashboard={handleGoToDashboard}
        reviewedAttempt={reviewedAttempt}
      />
    </>
  );
}
