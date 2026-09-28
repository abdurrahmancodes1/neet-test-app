import React, { useState } from 'react';
import {
  User,
  Zap,
  Award,
  Target,
  Clock,
  CheckCircle2,
  XCircle,
  Minus,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  HelpCircle,
  Eye,
  Columns,
  LogOut,
  ChevronRight,
} from 'lucide-react';
import { getUserAnalytics } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';
import { AttemptComparisonChart, AttemptAccuracyChart } from '../components/AttemptComparisonChart.jsx';
import AttemptComparisonModal from '../components/AttemptComparisonModal.jsx';

export default function DashboardPage({
  user,
  onStartTest,
  onBrowseTests,
  onReviewAttempt,
  onLogout,
}) {
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const analytics = getUserAnalytics(user?.email);

  const {
    totalAttempts,
    latestAttempt,
    previousAttempt,
    bestAttempt,
    averageScore,
    averageAccuracy,
    scoreTrend,
    allAttempts,
  } = analytics;

  const hasAttempts = totalAttempts > 0;

  // Calculate delta between latest and previous attempt
  const scoreDelta =
    latestAttempt && previousAttempt ? latestAttempt.score - previousAttempt.score : null;
  const accuracyDelta =
    latestAttempt && previousAttempt
      ? latestAttempt.accuracy - previousAttempt.accuracy
      : null;

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl space-y-8 animate-fade-in">
        {/* Navigation & Header Bar */}
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-900 font-bold text-gold-300 shadow-pop">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl font-bold text-ink-900">
                  {user?.name || 'Aspirant Dashboard'}
                </h1>
                <span className="rounded-full bg-gold-100 px-2.5 py-0.5 text-[11px] font-bold text-gold-800">
                  {user?.targetExam || 'NEET 2027'}
                </span>
              </div>
              <p className="text-xs text-ink-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={onBrowseTests}
              className="inline-flex items-center gap-1.5 rounded-xl border border-ink-200 bg-white px-4 py-2.5 text-xs font-bold text-ink-800 shadow-xs transition hover:bg-ink-100"
            >
              <Layers size={14} className="text-gold-600" />
              All Standard Tests
            </button>
            <button
              type="button"
              onClick={onStartTest}
              className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-4 py-2.5 text-xs font-bold text-white shadow-pop transition hover:bg-ink-800"
            >
              <Zap size={14} className="text-gold-400" />
              Start Practice Test
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className="inline-flex items-center justify-center rounded-xl border border-ink-200 bg-white p-2.5 text-ink-500 shadow-xs transition hover:bg-ink-100 hover:text-bad-600"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </header>

        {/* Top Key Metrics Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* 1. Latest Score */}
          <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
              <span>Latest Score</span>
              <Award size={16} className="text-gold-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-black text-ink-900 sm:text-3xl">
              {latestAttempt ? latestAttempt.score : '—'}
              <span className="text-xs font-semibold text-ink-400 sm:text-sm"> / 240</span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {scoreDelta !== null ? (
                scoreDelta > 0 ? (
                  <span className="flex items-center font-bold text-good-600">
                    <TrendingUp size={13} className="mr-0.5" /> +{scoreDelta} vs prev
                  </span>
                ) : scoreDelta < 0 ? (
                  <span className="flex items-center font-bold text-bad-600">
                    <TrendingDown size={13} className="mr-0.5" /> {scoreDelta} vs prev
                  </span>
                ) : (
                  <span className="font-medium text-ink-500">Equal to prev attempt</span>
                )
              ) : (
                <span className="text-ink-400">First attempt record</span>
              )}
            </div>
          </div>

          {/* 2. Best Score */}
          <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
              <span>Personal Best</span>
              <Sparkles size={16} className="text-gold-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-black text-ink-900 sm:text-3xl">
              {bestAttempt ? bestAttempt.score : '—'}
              <span className="text-xs font-semibold text-ink-400 sm:text-sm"> / 240</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-gold-700">
              {bestAttempt ? `${bestAttempt.percentage}% Peak Score` : 'No attempts yet'}
            </p>
          </div>

          {/* 3. Average Accuracy */}
          <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
              <span>Avg. Accuracy</span>
              <Target size={16} className="text-good-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-black text-ink-900 sm:text-3xl">
              {hasAttempts ? `${averageAccuracy}%` : '—'}
            </p>
            <p className="mt-1 text-xs font-medium text-ink-500">
              {hasAttempts ? 'Across all attempts' : 'Take test to calculate'}
            </p>
          </div>

          {/* 4. Total Completed Tests */}
          <div className="rounded-2xl border border-ink-200 bg-white p-4 shadow-xs sm:p-5">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-ink-500">
              <span>Tests Taken</span>
              <BarChart3 size={16} className="text-ink-600" />
            </div>
            <p className="mt-2 font-serif text-2xl font-black text-ink-900 sm:text-3xl">
              {totalAttempts}
            </p>
            <p className="mt-1 text-xs font-medium text-ink-500">
              {totalAttempts === 1 ? '1 Completed Exam' : `${totalAttempts} Completed Exams`}
            </p>
          </div>
        </section>

        {/* IF USER HAS ATTEMPTS: SHOW SPOTLIGHT & COMPARATIVE ANALYTICS */}
        {hasAttempts ? (
          <>
            {/* LATEST RESULT SPOTLIGHT CARD */}
            <section className="overflow-hidden rounded-3xl border-2 border-ink-900 bg-white p-6 shadow-pop sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ink-900 px-3 py-1 font-mono text-xs font-black text-gold-300">
                    Latest Attempt #{latestAttempt.attemptNumber || totalAttempts}
                  </span>
                  <span className="text-xs font-medium text-ink-500">
                    {new Date(latestAttempt.timestamp).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                {totalAttempts >= 2 && (
                  <button
                    type="button"
                    onClick={() => setComparisonModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-gold-300 bg-gold-50/80 px-3 py-1.5 text-xs font-bold text-ink-900 transition hover:bg-gold-100"
                  >
                    <Columns size={13} className="text-gold-700" />
                    Compare with Previous Attempts
                  </button>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
                {/* Score Big Display */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-gold-700">
                    Physics Drill Result
                  </span>
                  <h2 className="font-serif text-3xl font-black text-ink-900 sm:text-4xl">
                    {latestAttempt.score}{' '}
                    <span className="text-xl text-ink-400 sm:text-2xl">/ {latestAttempt.maxScore || 240}</span>
                  </h2>
                  <p className="text-sm font-bold text-ink-700">
                    {latestAttempt.percentage}% Final Score · {latestAttempt.accuracy?.toFixed(1)}% Accuracy
                  </p>
                  <p className="text-xs text-ink-500">
                    {latestAttempt.testTitle || 'NEET 2027: Work, Energy and Power'}
                  </p>
                </div>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-xl bg-good-50 p-3 text-good-800">
                    <p className="font-mono text-lg font-black">{latestAttempt.correct}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-good-700">Correct (+4)</p>
                  </div>
                  <div className="rounded-xl bg-bad-50 p-3 text-bad-800">
                    <p className="font-mono text-lg font-black">{latestAttempt.wrong}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-bad-700">Wrong (-1)</p>
                  </div>
                  <div className="rounded-xl bg-ink-100 p-3 text-ink-800">
                    <p className="font-mono text-lg font-black">{latestAttempt.unattempted}</p>
                    <p className="mt-0.5 text-[11px] font-semibold text-ink-600">Left (0)</p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onReviewAttempt(latestAttempt)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 py-3.5 text-xs font-bold text-white shadow-pop transition hover:bg-ink-800"
                  >
                    <Eye size={15} />
                    Review Solutions &amp; Step-by-Step
                  </button>
                  <button
                    type="button"
                    onClick={onStartTest}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-ink-200 bg-white py-3 text-xs font-bold text-ink-800 shadow-xs transition hover:bg-ink-100"
                  >
                    <RotateCcw size={14} /> Retake 2-Hour Test
                  </button>
                </div>
              </div>
            </section>

            {/* PROGRESS & COMPARISON CHARTS */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Score Trend Chart */}
              <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink-900">
                      Score &amp; Accuracy Progression
                    </h3>
                    <p className="text-xs text-ink-500">
                      Track score (/240) and accuracy (%) over sequential attempts.
                    </p>
                  </div>
                  <Award size={18} className="text-gold-600" />
                </div>
                <AttemptComparisonChart scoreTrend={scoreTrend} />
              </div>

              {/* Accuracy & Question Distribution */}
              <div className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card sm:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-ink-900">
                      Attempt Question Breakdown
                    </h3>
                    <p className="text-xs text-ink-500">
                      Correct, Wrong, and Unattempted question distribution.
                    </p>
                  </div>
                  <Target size={18} className="text-good-600" />
                </div>
                <AttemptAccuracyChart scoreTrend={scoreTrend} />
              </div>
            </section>

            {/* PREVIOUS ATTEMPTS & COMPARISON TABLE */}
            <section className="rounded-3xl border border-ink-200 bg-white p-5 shadow-card sm:p-8">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-ink-100 pb-4">
                <div>
                  <h3 className="font-serif text-xl font-bold text-ink-900">
                    All Previous Test Attempts &amp; Comparison
                  </h3>
                  <p className="text-xs text-ink-500">
                    Detailed record of your previous tests with instant solution reviews.
                  </p>
                </div>
                {totalAttempts >= 2 && (
                  <button
                    type="button"
                    onClick={() => setComparisonModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-ink-900 px-3.5 py-2 text-xs font-bold text-white shadow-xs transition hover:bg-ink-800"
                  >
                    <Columns size={14} className="text-gold-300" />
                    Side-by-Side Compare
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-ink-200 bg-ink-50/70 text-[11px] font-bold uppercase tracking-wider text-ink-600">
                      <th className="px-3 py-3">Attempt</th>
                      <th className="px-3 py-3">Date &amp; Time</th>
                      <th className="px-3 py-3">Score / 240</th>
                      <th className="px-3 py-3">Accuracy</th>
                      <th className="px-3 py-3">Breakdown</th>
                      <th className="px-3 py-3">Time Spent</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink-100">
                    {allAttempts.map((att, idx) => {
                      const isLatest = idx === 0;
                      return (
                        <tr key={att.id} className="hover:bg-ink-50/50 transition">
                          <td className="px-3 py-3.5 font-mono font-bold text-ink-900">
                            #{att.attemptNumber || totalAttempts - idx}
                            {isLatest && (
                              <span className="ml-2 rounded-full bg-gold-100 px-2 py-0.5 text-[10px] font-extrabold text-gold-800">
                                Latest
                              </span>
                            )}
                          </td>
                          <td className="px-3 py-3.5 text-ink-600">
                            {new Date(att.timestamp).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-3 py-3.5 font-bold text-ink-900">
                            <span className="text-sm font-black">{att.score}</span>
                            <span className="text-[11px] text-ink-400"> / 240</span>
                            <span className="ml-1.5 text-[11px] text-gold-700">({att.percentage}%)</span>
                          </td>
                          <td className="px-3 py-3.5 font-semibold text-good-700">
                            {att.accuracy ? `${att.accuracy.toFixed(1)}%` : '0%'}
                          </td>
                          <td className="px-3 py-3.5">
                            <div className="flex items-center gap-1.5 font-mono text-[11px]">
                              <span className="text-good-700 font-bold">+{att.correct}</span>
                              <span className="text-ink-300">/</span>
                              <span className="text-bad-600 font-bold">-{att.wrong}</span>
                              <span className="text-ink-300">/</span>
                              <span className="text-ink-500 font-medium">0({att.unattempted})</span>
                            </div>
                          </td>
                          <td className="px-3 py-3.5 text-ink-600 font-mono">
                            {formatDuration(att.timeTakenMs || 0)}
                          </td>
                          <td className="px-3 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => onReviewAttempt(att)}
                              className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-3 py-1.5 text-xs font-bold text-ink-800 shadow-xs transition hover:bg-ink-100 hover:text-ink-900"
                            >
                              Review <ArrowRight size={12} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        ) : (
          /* EMPTY STATE (NEW USER ONBOARDING) */
          <section className="rounded-3xl border-2 border-dashed border-ink-300 bg-white p-8 text-center sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              <Zap size={32} />
            </div>
            <h2 className="mt-4 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
              Welcome to Your NEET 2027 Dashboard, {user?.name || 'Aspirant'}!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-600 leading-relaxed">
              You haven't completed any practice tests yet. Start your first timed 2-hour examination to generate instant scoring, topic analysis, and attempt comparison.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-ink-200 bg-ink-50 p-6 text-left">
              <div className="flex items-center gap-2 font-bold text-ink-900">
                <Sparkles size={18} className="text-gold-600" />
                Featured Test: Work, Energy and Power
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-ink-700">
                <li>• <strong>60 High-Yield Questions:</strong> Curated NEET &amp; hard conceptual diagrams.</li>
                <li>• <strong>2 Hours Continuous Timer:</strong> Timed CBT environment.</li>
                <li>• <strong>Marking Scheme:</strong> +4 marks for correct, −1 mark for incorrect answers.</li>
                <li>• <strong>Personal Progression:</strong> Track your score improvements over time.</li>
              </ul>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={onStartTest}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-ink-900 px-8 py-4 text-sm font-bold text-white shadow-pop transition hover:bg-ink-800"
              >
                Begin 2-Hour Examination <ArrowRight size={16} />
              </button>
            </div>
          </section>
        )}

        {/* COMPARISON MODAL */}
        <AttemptComparisonModal
          open={comparisonModalOpen}
          onClose={() => setComparisonModalOpen(false)}
          attempts={allAttempts}
          onSelectReview={onReviewAttempt}
        />
      </div>
    </main>
  );
}
