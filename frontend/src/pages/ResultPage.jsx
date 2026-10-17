import React, { useMemo, useState } from 'react';
import { RotateCcw, Zap, ArrowLeft, CheckCircle2, BarChart3, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { formatDuration, computeResult } from '../utils/scoring.js';
import { getUserAttempts, getCurrentUser } from '../utils/auth.js';
import ResultSummary from '../components/ResultSummary.jsx';
import TopicAnalysis from '../components/TopicAnalysis.jsx';
import QuestionReview from '../components/QuestionReview.jsx';
import NeetScorePredictorCard from '../components/NeetScorePredictorCard.jsx';
import JeeScorePredictorCard from '../components/JeeScorePredictorCard.jsx';
import { useTheme } from '../utils/themeContext.jsx';

const TABS = [
  { key: 'overview', label: 'Overview' },
  { key: 'analysis', label: 'Topic Analysis' },
  { key: 'review', label: 'Question Review' },
];

export default function ResultPage({
  session,
  onRetake,
  test,
  backendResult,
  onBackToChapters,
  onGoToDashboard,
  reviewedAttempt = null,
  isSubmitting = false,
  user = null,
}) {
  const { theme, isLight } = useTheme();

  const [tab, setTab] = useState('overview');
  const [confirmRetake, setConfirmRetake] = useState(false);

  const activeTestId =
    reviewedAttempt?.testId ||
    backendResult?.test?.id ||
    test?.id ||
    '';

  // Fallback: check if the student has a saved attempt in localStorage or cache
  const resolvedAttempt = useMemo(() => {
    if (reviewedAttempt) return reviewedAttempt;
    if (backendResult) return null;
    const email = user?.email || getCurrentUser()?.email;
    if (email) {
      try {
        const attempts = getUserAttempts(email);
        if (session?.attemptId) {
          const match = attempts.find(
            (a) => (a.attemptId || a.id) === session.attemptId
          );
          if (match) return match;
        }
        const testAttempts = attempts.filter(
          (a) => (a.testId || a.test?.id) === activeTestId
        );
        if (testAttempts.length > 0) {
          return testAttempts[testAttempts.length - 1];
        }
      } catch (e) {
        console.warn('Could not retrieve cached user attempt:', e);
      }
    }
    return null;
  }, [reviewedAttempt, backendResult, user?.email, session?.attemptId, activeTestId]);

  const targetAttempt = reviewedAttempt || resolvedAttempt;

  const testTitle =
    targetAttempt?.testTitle ||
    backendResult?.test?.title ||
    test?.title ||
    'NEET Practice Test';
  const testSubtitle =
    backendResult?.test?.subtitle ||
    test?.subtitle ||
    'NEET 2027 Assessment';

  // Authoritative result calculation
  const result = useMemo(() => {
    if (targetAttempt) {
      let perQ = [];
      if (Array.isArray(targetAttempt.perQuestion) && targetAttempt.perQuestion.length > 0) {
        perQ = targetAttempt.perQuestion;
      } else if (Array.isArray(targetAttempt.answers) && targetAttempt.answers.length > 0) {
        perQ = targetAttempt.answers;
      } else if (targetAttempt.answers && typeof targetAttempt.answers === 'object') {
        const vals = Object.values(targetAttempt.answers);
        if (vals.length > 0 && (vals[0]?.question || vals[0]?.text || vals[0]?.questionId)) {
          perQ = vals;
        }
      }

      if (perQ.length === 0 && test?.questions && test.questions.length > 0) {
        const computed = computeResult(
          targetAttempt.answers || {},
          test.questions,
          test.marksCorrect || 4,
          test.marksWrong || -1
        );
        perQ = computed.perQuestion;
      }

      const normalizedPerQ = perQ.map((q, idx) => {
        const id = q.order ?? q.id ?? q.questionNumber ?? idx + 1;
        const matchingQ =
          (test?.questions || []).find((tq) => (tq.order ?? tq.id ?? tq.number) === id) || {};

        const selected = q.selectedOption ?? q.selected ?? null;
        const correctAnswer = q.correctAnswer || matchingQ.correctAnswer || null;
        let isCorrect = q.isCorrect;
        if (isCorrect === undefined || isCorrect === null) {
          if (correctAnswer && selected) {
            const isNumerical =
              q.type === 'numerical' ||
              matchingQ.type === 'numerical' ||
              (!q.options || Object.keys(q.options).length === 0);
            const selTrim = String(selected).trim().toUpperCase();
            const corTrim = String(correctAnswer).trim().toUpperCase();
            if (selTrim === corTrim) {
              isCorrect = true;
            } else if (isNumerical) {
              const numSel = parseFloat(selTrim);
              const numCor = parseFloat(corTrim);
              isCorrect = !isNaN(numSel) && !isNaN(numCor) && Math.abs(numSel - numCor) < 0.001;
            } else {
              isCorrect = false;
            }
          } else {
            isCorrect = null;
          }
        }
        let status = q.status;
        if (!status) {
          if (!selected) status = 'unattempted';
          else if (isCorrect) status = 'correct';
          else status = 'wrong';
        }

        return {
          ...matchingQ,
          ...q,
          id,
          questionNumber: id,
          order: id,
          subject: q.subject || matchingQ.subject || 'General',
          chapter: q.chapter || matchingQ.chapter || 'General',
          topic: q.topic || matchingQ.topic || 'General',
          question: q.question || q.text || matchingQ.question || matchingQ.text || `Question ${id}`,
          options: (q.options && Object.keys(q.options).length > 0) ? q.options : (matchingQ.options || {}),
          image: q.image || matchingQ.image || null,
          questionImage: q.questionImage || matchingQ.questionImage || null,
          explanationImage: q.explanationImage || matchingQ.explanationImage || null,
          selected,
          selectedOption: selected,
          correctAnswer,
          explanation: q.explanation || q.solution || q.explanationText || matchingQ.explanation || matchingQ.solution || matchingQ.explanationText || null,
          isCorrect,
          marks: q.marksAwarded ?? q.marks ?? (status === 'correct' ? 4 : status === 'wrong' ? -1 : 0),
          status,
        };
      });

      return {
        score: targetAttempt.score ?? 0,
        rawScore: targetAttempt.rawScore ?? targetAttempt.score ?? 0,
        maxScore: targetAttempt.maxScore ?? (test?.totalQuestions || normalizedPerQ.length || 60) * 4,
        percentage: targetAttempt.percentage ?? 0,
        accuracy: targetAttempt.accuracy ?? 0,
        correct: targetAttempt.correct ?? targetAttempt.correctCount ?? 0,
        wrong: targetAttempt.wrong ?? targetAttempt.wrongCount ?? 0,
        unattempted: targetAttempt.unattempted ?? targetAttempt.unattemptedCount ?? 0,
        totalQuestions: targetAttempt.totalQuestions ?? normalizedPerQ.length ?? 60,
        topicPerformance: targetAttempt.topicPerformance || [],
        weakestTopics: targetAttempt.weakestTopics || [],
        strongestTopics: targetAttempt.strongestTopics || [],
        perQuestion: normalizedPerQ,
      };
    }

    if (backendResult) {
      let answersArray = [];
      if (Array.isArray(backendResult.perQuestion) && backendResult.perQuestion.length > 0) {
        answersArray = backendResult.perQuestion;
      } else if (Array.isArray(backendResult.answers) && backendResult.answers.length > 0) {
        answersArray = backendResult.answers;
      } else if (backendResult.answers && typeof backendResult.answers === 'object') {
        const vals = Object.values(backendResult.answers);
        if (vals.length > 0 && (vals[0]?.question || vals[0]?.text || vals[0]?.questionId)) {
          answersArray = vals;
        }
      }

      if (answersArray.length === 0 && test?.questions && test.questions.length > 0) {
        const computed = computeResult(
          backendResult.answers || session?.answers || {},
          test.questions,
          test.marksCorrect || 4,
          test.marksWrong || -1
        );
        answersArray = computed.perQuestion;
      }

      const normalizedPerQ = answersArray.map((a, idx) => {
        const id = a.order || a.id || a.questionNumber || idx + 1;
        const matchingQ =
          (test?.questions || []).find((tq) => (tq.order ?? tq.id ?? tq.number) === id) || {};

        const selected = a.selectedOption ?? a.selected ?? null;
        const correctAnswer = a.correctAnswer || matchingQ.correctAnswer || null;
        let isCorrect = a.isCorrect;
        if (isCorrect === undefined || isCorrect === null) {
          if (correctAnswer && selected) {
            const isNumerical =
              a.type === 'numerical' ||
              matchingQ.type === 'numerical' ||
              (!a.options || Object.keys(a.options).length === 0);
            const selTrim = String(selected).trim().toUpperCase();
            const corTrim = String(correctAnswer).trim().toUpperCase();
            if (selTrim === corTrim) {
              isCorrect = true;
            } else if (isNumerical) {
              const numSel = parseFloat(selTrim);
              const numCor = parseFloat(corTrim);
              isCorrect = !isNaN(numSel) && !isNaN(numCor) && Math.abs(numSel - numCor) < 0.001;
            } else {
              isCorrect = false;
            }
          } else {
            isCorrect = null;
          }
        }
        let status = a.status;
        if (!status) {
          if (!selected) status = 'unattempted';
          else if (isCorrect) status = 'correct';
          else status = 'wrong';
        }

        return {
          ...matchingQ,
          ...a,
          id,
          questionNumber: id,
          order: id,
          subject: a.subject || matchingQ.subject || 'General',
          chapter: a.chapter || matchingQ.chapter || 'General',
          topic: a.topic || matchingQ.topic || 'General',
          question: a.question || a.text || matchingQ.question || matchingQ.text || `Question ${id}`,
          options: (a.options && Object.keys(a.options).length > 0) ? a.options : (matchingQ.options || {}),
          image: a.image || matchingQ.image || null,
          questionImage: a.questionImage || matchingQ.questionImage || null,
          explanationImage: a.explanationImage || matchingQ.explanationImage || null,
          selected,
          selectedOption: selected,
          correctAnswer,
          explanation: a.explanation || a.solution || a.explanationText || matchingQ.explanation || matchingQ.solution || matchingQ.explanationText || null,
          isCorrect,
          marks: a.marksAwarded ?? a.marks ?? (status === 'correct' ? 4 : status === 'wrong' ? -1 : 0),
          status,
        };
      });

      return {
        score: backendResult.score ?? 0,
        rawScore: backendResult.rawScore ?? backendResult.score ?? 0,
        maxScore: backendResult.maxScore ?? (test?.totalQuestions || normalizedPerQ.length || 60) * 4,
        percentage: backendResult.percentage ?? 0,
        accuracy: backendResult.accuracy ?? 0,
        correct: backendResult.correctCount ?? backendResult.correct ?? 0,
        wrong: backendResult.wrongCount ?? backendResult.wrong ?? 0,
        unattempted: backendResult.unattemptedCount ?? backendResult.unattempted ?? 0,
        totalQuestions: backendResult.totalQuestions ?? normalizedPerQ.length ?? 60,
        topicPerformance: backendResult.topicPerformance || [],
        weakestTopics: backendResult.weakestTopics || [],
        strongestTopics: backendResult.strongestTopics || [],
        perQuestion: normalizedPerQ,
      };
    }

    // Pure client-side computation from bundled questions
    if (test?.questions && test.questions.length > 0 && test.questions[0]?.correctAnswer) {
      return computeResult(
        session?.answers || {},
        test.questions,
        test.marksCorrect || 4,
        test.marksWrong || -1
      );
    }

    const totalQ = test?.totalQuestions || 60;
    return {
      score: 0,
      rawScore: 0,
      maxScore: totalQ * 4,
      percentage: 0,
      accuracy: 0,
      correct: 0,
      wrong: 0,
      unattempted: totalQ,
      totalQuestions: totalQ,
      perQuestion: [],
    };
  }, [targetAttempt, backendResult, test, session?.answers]);

  const topics = targetAttempt?.topicPerformance || backendResult?.topicPerformance || result.topicPerformance || [];
  const weakest = targetAttempt?.weakestTopics || backendResult?.weakestTopics || result.weakestTopics || [];
  const strongest = targetAttempt?.strongestTopics || backendResult?.strongestTopics || result.strongestTopics || [];

  const timeTakenMs = targetAttempt
    ? targetAttempt.timeTakenMs || 0
    : (() => {
        const startT = backendResult?.startTime ? new Date(backendResult.startTime).getTime() : session?.startTime;
        const endT = backendResult?.submittedAt ? new Date(backendResult.submittedAt).getTime() : session?.submittedAt;
        return endT && startT ? Math.max(0, endT - startT) : 0;
      })();

  const timeTakenLabel = formatDuration(timeTakenMs);
  const attempted = result.correct + result.wrong;
  const avgMs = attempted > 0 ? timeTakenMs / attempted : 0;
  const avgTimeLabel = attempted > 0 ? `${Math.round(avgMs / 1000)}s` : '—';
  const isEvaluating = isSubmitting;

  if (isEvaluating) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors ${
          isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/40 text-blue-400 mb-6 shadow-glow animate-pulse">
          <Loader2 size={32} className="animate-spin text-blue-400" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
          Evaluating &amp; Grading Submission...
        </h2>
        <p className={`text-xs sm:text-sm max-w-md leading-relaxed mb-4 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Applying official marking scheme (+4 / -1), calculating percentile rank, and retrieving full verified solutions.
        </p>
        <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 animate-[pulse_1.5s_infinite]" />
        </div>
      </div>
    );
  }

  // Fallback: If no attempt was submitted or reviewed yet, render a helpful empty state
  if (!isSubmitting && !targetAttempt && !backendResult && (!session?.answers || Object.keys(session.answers).length === 0)) {
    return (
      <div
        className={`min-h-screen flex flex-col items-center justify-center p-6 text-center transition-colors ${
          isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
        }`}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/10 border border-blue-500/30 text-blue-500 mb-6">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl sm:text-2xl font-black tracking-tight mb-2">
          No Attempt Data Recorded
        </h2>
        <p className={`text-xs sm:text-sm max-w-md leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          There is no completed attempt or pending evaluation for this assessment. You can begin a new attempt now or return to your dashboard.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onGoToDashboard}
            className={`rounded-xl px-5 py-2.5 text-xs font-bold transition border ${
              isLight ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-800' : 'border-white/10 bg-white/5 hover:bg-white/10 text-white'
            }`}
          >
            Go to Dashboard
          </button>
          <button
            type="button"
            onClick={onRetake}
            className="rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            Take Test Instructions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen pb-16 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Background Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 blur-2xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent'
        }`}
      />

      {/* Floating Navigation Header */}
      <header
        className={`sticky top-0 z-30 border-b backdrop-blur-md transition-colors ${
          isLight ? 'border-slate-200 bg-white/95 text-slate-900 shadow-sm' : 'border-white/10 bg-[#0D121F]/90 text-white'
        }`}
      >
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3.5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-bold text-xs shadow-glow">
              <Zap size={14} className="fill-white text-white" />
            </div>
            <p className={`text-xs sm:text-sm font-bold tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {testTitle} — Performance Report
            </p>
          </div>

          <div className="flex items-center gap-2">

            {onGoToDashboard && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-3.5 sm:px-4 py-1.5 text-xs font-bold shadow-lg shadow-blue-600/25 transition flex items-center gap-1"
              >
                <span>My Dashboard</span>
                <ChevronRight size={13} />
              </button>
            )}
            {onBackToChapters && (
              <button
                type="button"
                onClick={onBackToChapters}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition flex items-center gap-1 ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <ArrowLeft size={13} />
                <span>All Tests</span>
              </button>
            )}
            {session?.autoSubmitted && (
              <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
                Auto-submitted
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 pt-6 space-y-6 relative z-10">
        {/* Tab Pills */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                tab === t.key
                  ? 'border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : isLight
                    ? 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 shadow-xs'
                    : 'border-white/10 bg-[#0B0F19] text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            <ResultSummary
              result={result}
              timeTakenLabel={timeTakenLabel}
              avgTimeLabel={avgTimeLabel}
              testTitle={testTitle}
              testSubtitle={testSubtitle}
            />

            {/* NEET / JEE Score & AIR Rank Projector */}
            {String(activeTestId).toLowerCase().includes('jee') ||
            String(testTitle).toLowerCase().includes('jee') ||
            String(activeTestId).toLowerCase().includes('periodic') ? (
              <JeeScorePredictorCard
                testId={activeTestId}
                score={result.score}
                maxScore={result.maxScore}
                accuracy={result.accuracy}
                correct={result.correct}
                wrong={result.wrong}
              />
            ) : (
              <NeetScorePredictorCard
                testId={activeTestId}
                score={result.score}
                maxScore={result.maxScore}
                accuracy={result.accuracy}
                correct={result.correct}
                wrong={result.wrong}
              />
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => setTab('review')}
                className={`flex-1 rounded-full border py-3 text-xs font-semibold transition ${
                  isLight
                    ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
                    : 'border-white/10 bg-[#0B0F19] hover:bg-[#131926] text-slate-200'
                }`}
              >
                Review Answers &amp; Solutions
              </button>
              <button
                type="button"
                onClick={() => setTab('analysis')}
                className={`flex-1 rounded-full border py-3 text-xs font-semibold transition ${
                  isLight
                    ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-800 shadow-xs'
                    : 'border-white/10 bg-[#0B0F19] hover:bg-[#131926] text-slate-200'
                }`}
              >
                View Topic Analysis
              </button>
              {onGoToDashboard && (
                <button
                  type="button"
                  onClick={onGoToDashboard}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-full border py-3 text-xs font-bold transition ${
                    isLight
                      ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 shadow-xs'
                      : 'border-blue-500/30 bg-blue-600/15 hover:bg-blue-600/25 text-blue-300'
                  }`}
                >
                  Attempt Comparison
                </button>
              )}
              <button
                type="button"
                onClick={() => setConfirmRetake(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
              >
                <RotateCcw size={14} />
                Retake Test
              </button>
            </div>
          </div>
        )}

        {tab === 'analysis' && <TopicAnalysis topics={topics} weakest={weakest} strongest={strongest} />}

        {tab === 'review' && (
          <QuestionReview
            perQuestion={result.perQuestion}
            markedForReview={session?.markedForReview || targetAttempt?.markedForReview || []}
            questions={test?.questions && test.questions.length > 0 ? test.questions : result.perQuestion}
          />
        )}
      </div>

      {confirmRetake && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            aria-label="Close"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
            onClick={() => setConfirmRetake(false)}
          />
          <div
            className={`animate-rise-in relative w-full max-w-sm rounded-3xl border p-6 sm:p-8 shadow-2xl transition-colors ${
              isLight
                ? 'border-slate-200 bg-white text-slate-900'
                : 'border-white/10 bg-[#0B0F19] text-slate-100'
            }`}
          >
            <h2 className={`mb-2 text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Retake this test?</h2>
            <p className={`mb-6 text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              This clears your current answers, timer, and result, and starts a fresh attempt from Q1.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmRetake(false)}
                className={`flex-1 rounded-full border py-2.5 text-xs font-semibold transition ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                    : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmRetake(false);
                  onRetake();
                }}
                className="flex-1 rounded-full bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition"
              >
                Yes, Retake
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
