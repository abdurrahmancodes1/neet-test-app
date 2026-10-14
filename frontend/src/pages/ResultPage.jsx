import React, { useMemo, useState } from 'react';
import { RotateCcw, Zap, ArrowLeft, CheckCircle2, BarChart3, ChevronRight } from 'lucide-react';
import { formatDuration, computeResult } from '../utils/scoring.js';
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
}) {
  const { theme, isLight } = useTheme();

  const [tab, setTab] = useState('overview');
  const [confirmRetake, setConfirmRetake] = useState(false);

  const testTitle =
    reviewedAttempt?.testTitle ||
    backendResult?.test?.title ||
    test?.title ||
    'NEET Practice Test';
  const testSubtitle =
    backendResult?.test?.subtitle ||
    test?.subtitle ||
    'NEET 2027 Assessment';
  const activeTestId =
    reviewedAttempt?.testId ||
    backendResult?.test?.id ||
    test?.id ||
    '';

  // Authoritative result calculation
  const result = useMemo(() => {
    if (reviewedAttempt) {
      return {
        score: reviewedAttempt.score ?? 0,
        rawScore: reviewedAttempt.rawScore ?? reviewedAttempt.score ?? 0,
        maxScore: reviewedAttempt.maxScore ?? (test?.totalQuestions || 60) * 4,
        percentage: reviewedAttempt.percentage ?? 0,
        accuracy: reviewedAttempt.accuracy ?? 0,
        correct: reviewedAttempt.correct ?? 0,
        wrong: reviewedAttempt.wrong ?? 0,
        unattempted: reviewedAttempt.unattempted ?? 0,
        totalQuestions: reviewedAttempt.totalQuestions ?? 60,
        topicPerformance: reviewedAttempt.topicPerformance || [],
        weakestTopics: reviewedAttempt.weakestTopics || [],
        strongestTopics: reviewedAttempt.strongestTopics || [],
        perQuestion: reviewedAttempt.perQuestion || [],
      };
    }

    if (backendResult) {
      return {
        score: backendResult.score ?? 0,
        rawScore: backendResult.rawScore ?? 0,
        maxScore: backendResult.maxScore ?? (test?.totalQuestions || 60) * 4,
        percentage: backendResult.percentage ?? 0,
        accuracy: backendResult.accuracy ?? 0,
        correct: backendResult.correctCount ?? 0,
        wrong: backendResult.wrongCount ?? 0,
        unattempted: backendResult.unattemptedCount ?? 0,
        totalQuestions: backendResult.totalQuestions ?? 60,
        perQuestion: (backendResult.answers || []).map((a, idx) => ({
          id: a.order || idx + 1,
          questionNumber: a.order || idx + 1,
          order: a.order || idx + 1,
          subject: a.subject,
          chapter: a.chapter,
          topic: a.topic || 'General',
          question: a.question || `Question ${a.order || idx + 1}`,
          options: a.options || {},
          image: a.image || null,
          selected: a.selectedOption,
          selectedOption: a.selectedOption,
          correctAnswer: a.correctAnswer,
          explanation: a.explanation,
          isCorrect: a.isCorrect,
          marks: a.marksAwarded,
          status: a.status,
        })),
      };
    }

    // Pure client-side computation from bundled questions
    if (test?.questions && test.questions.length > 0) {
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
  }, [reviewedAttempt, backendResult, test, session?.answers]);

  const topics = reviewedAttempt?.topicPerformance || backendResult?.topicPerformance || result.topicPerformance || [];
  const weakest = reviewedAttempt?.weakestTopics || backendResult?.weakestTopics || result.weakestTopics || [];
  const strongest = reviewedAttempt?.strongestTopics || backendResult?.strongestTopics || result.strongestTopics || [];

  const timeTakenMs = reviewedAttempt
    ? reviewedAttempt.timeTakenMs || 0
    : (() => {
        const startT = backendResult?.startTime ? new Date(backendResult.startTime).getTime() : session?.startTime;
        const endT = backendResult?.submittedAt ? new Date(backendResult.submittedAt).getTime() : session?.submittedAt;
        return endT && startT ? Math.max(0, endT - startT) : 0;
      })();

  const timeTakenLabel = formatDuration(timeTakenMs);
  const attempted = result.correct + result.wrong;
  const avgMs = attempted > 0 ? timeTakenMs / attempted : 0;
  const avgTimeLabel = attempted > 0 ? `${Math.round(avgMs / 1000)}s` : '—';

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
            markedForReview={session?.markedForReview || []}
            questions={result.perQuestion}
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
