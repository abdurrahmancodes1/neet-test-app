import React, { useState, useEffect } from 'react';
import {
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
  User,
  Globe,
  Users,
  Trophy,
} from 'lucide-react';
import { getUserAnalytics, getGlobalPlatformStats } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';
import { AttemptComparisonChart, AttemptAccuracyChart } from '../components/AttemptComparisonChart.jsx';
import AttemptComparisonModal from '../components/AttemptComparisonModal.jsx';
import GlobalLeaderboardModal from '../components/GlobalLeaderboardModal.jsx';

export default function DashboardPage({
  user,
  onStartTest,
  onBrowseTests,
  onReviewAttempt,
  onLogout,
}) {
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [globalStats, setGlobalStats] = useState(null);

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

  // Load platform-wide global stats (total users, all candidate scores, leaderboard)
  useEffect(() => {
    let mounted = true;
    getGlobalPlatformStats().then((data) => {
      if (mounted && data) {
        setGlobalStats(data);
      }
    });
    return () => {
      mounted = false;
    };
  }, [totalAttempts]);

  // Calculate delta between latest and previous attempt
  const scoreDelta =
    latestAttempt && previousAttempt ? latestAttempt.score - previousAttempt.score : null;
  const accuracyDelta =
    latestAttempt && previousAttempt
      ? latestAttempt.accuracy - previousAttempt.accuracy
      : null;

  return (
    <main className="min-h-screen bg-[#05070B] text-slate-100 px-4 py-4 sm:py-8 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent blur-2xl" />

      <div className="mx-auto max-w-5xl space-y-10 relative z-10 animate-fade-in">
        {/* Floating Dark Pill Navigation Bar */}
        <header className="rounded-full border border-white/10 bg-[#0D121F]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between gap-3">
          {/* Brand on Left */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
              <Zap size={15} className="fill-white text-white" />
            </div>
            <span className="truncate font-sans text-sm sm:text-base font-bold tracking-tight text-white">
              NEET<span className="text-blue-500">2027</span>
            </span>
          </div>

          {/* Navigation Links in Center */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-slate-300">
            <span className="text-white flex items-center gap-1.5 cursor-pointer">
              <BarChart3 size={14} className="text-blue-400" /> Dashboard
            </span>
            <button
              type="button"
              onClick={onBrowseTests}
              className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
            >
              <Layers size={14} /> Standard Tests
            </button>
            <button
              type="button"
              onClick={() => setLeaderboardModalOpen(true)}
              className="text-slate-400 hover:text-blue-300 transition flex items-center gap-1.5"
            >
              <Trophy size={14} className="text-amber-400" /> Global Leaderboard
            </button>
            <span className="text-slate-500 text-[11px] font-medium border border-white/10 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {globalStats?.totalUsers ? `${globalStats.totalUsers} Candidates` : 'Cloud Active'}
            </span>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => setLeaderboardModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 px-3.5 py-1.5 text-xs font-semibold transition"
            >
              <Users size={13} />
              <span>All Users &amp; Scores</span>
            </button>

            <button
              type="button"
              onClick={onStartTest}
              className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-5 py-2 text-xs font-semibold shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Get Started</span>
              <ChevronRight size={14} />
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Global Live Platform Stats Ticker Bar */}
        <section className="rounded-2xl border border-white/10 bg-gradient-to-r from-[#0D1322] via-[#090D17] to-[#0D1322] p-3 sm:px-6 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400">
              <Globe size={15} />
            </div>
            <div>
              <span className="font-bold text-white">Live Platform Status:</span>{' '}
              <span className="text-slate-300">
                <strong className="text-blue-400 font-bold">{globalStats?.totalUsers || 1}</strong> Registered Candidate{(globalStats?.totalUsers || 1) > 1 ? 's' : ''} ·{' '}
                <strong className="text-indigo-400 font-bold">{globalStats?.totalAttempts || totalAttempts}</strong> Tests Submitted ·{' '}
                Top Score: <strong className="text-amber-400 font-bold">{globalStats?.highestScore ?? (bestAttempt?.score || 0)}/240</strong>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLeaderboardModalOpen(true)}
            className="inline-flex items-center gap-1 rounded-full bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 px-3 py-1 text-[11px] font-bold text-blue-300 transition"
          >
            <Trophy size={12} className="text-amber-400" />
            View Leaderboard &amp; Student Scores &rarr;
          </button>
        </section>

        {/* Hero Header Section */}
        <section className="text-center pt-2 sm:pt-4 max-w-3xl mx-auto space-y-4">
          <p className="font-serif italic text-2xl sm:text-3xl text-slate-300 font-normal">
            Everything you need
          </p>
          <h1 className="font-sans text-3xl sm:text-5xl font-black tracking-tight text-white">
            for NEET 2027 Preparation
          </h1>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
            The complete national standard assessment platform with timed question drills, step-by-step verified solutions, and synchronized candidate analytics.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={onStartTest}
              className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-3 shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center gap-2"
            >
              <Zap size={16} />
              <span>Start Practice Test</span>
              <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() => setLeaderboardModalOpen(true)}
              className="rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300 font-semibold text-xs sm:text-sm px-6 py-3 transition flex items-center gap-1.5"
            >
              <Trophy size={16} className="text-amber-400" />
              <span>Global Rankings ({globalStats?.totalUsers || 1} Users)</span>
            </button>
            <button
              type="button"
              onClick={onBrowseTests}
              className="rounded-full border border-white/10 bg-[#0D121F] hover:bg-[#131926] text-slate-300 hover:text-white font-semibold text-xs sm:text-sm px-6 py-3 transition flex items-center gap-1.5"
            >
              <span>All Standard Tests</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* Top Key Metrics Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* 1. Latest Score */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl hover:border-blue-500/40 hover:shadow-blue-500/5 transition group">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Latest Score</span>
              <Award size={16} className="text-blue-400 group-hover:scale-110 transition" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {latestAttempt ? latestAttempt.score : '—'}
              <span className="text-xs font-semibold text-slate-500 sm:text-sm"> / 240</span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {scoreDelta !== null ? (
                scoreDelta > 0 ? (
                  <span className="flex items-center font-bold text-emerald-400">
                    <TrendingUp size={13} className="mr-0.5" /> +{scoreDelta} vs prev
                  </span>
                ) : scoreDelta < 0 ? (
                  <span className="flex items-center font-bold text-rose-400">
                    <TrendingDown size={13} className="mr-0.5" /> {scoreDelta} vs prev
                  </span>
                ) : (
                  <span className="font-medium text-slate-400">Equal to prev attempt</span>
                )
              ) : (
                <span className="text-slate-500">First attempt record</span>
              )}
            </div>
          </div>

          {/* 2. Personal Best */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl hover:border-blue-500/40 hover:shadow-blue-500/5 transition group">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Personal Best</span>
              <Sparkles size={16} className="text-amber-400 group-hover:scale-110 transition" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {bestAttempt ? bestAttempt.score : '—'}
              <span className="text-xs font-semibold text-slate-500 sm:text-sm"> / 240</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-amber-400">
              {bestAttempt ? `${bestAttempt.percentage}% Peak Score` : 'No attempts yet'}
            </p>
          </div>

          {/* 3. Average Accuracy */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl hover:border-blue-500/40 hover:shadow-blue-500/5 transition group">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Avg. Accuracy</span>
              <Target size={16} className="text-emerald-400 group-hover:scale-110 transition" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {hasAttempts ? `${averageAccuracy}%` : '—'}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {hasAttempts ? 'Across all attempts' : 'Take test to calculate'}
            </p>
          </div>

          {/* 4. Total Completed Tests */}
          <div className="rounded-2xl border border-white/10 bg-[#0B0F19] p-4 sm:p-5 shadow-xl hover:border-blue-500/40 hover:shadow-blue-500/5 transition group">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span>Tests Taken</span>
              <BarChart3 size={16} className="text-blue-400 group-hover:scale-110 transition" />
            </div>
            <p className="mt-2 font-serif text-2xl sm:text-3xl font-bold text-white">
              {totalAttempts}
            </p>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {totalAttempts === 1 ? '1 Completed Exam' : `${totalAttempts} Completed Exams`}
            </p>
          </div>
        </section>

        {/* IF USER HAS ATTEMPTS: SHOW SPOTLIGHT & COMPARATIVE ANALYTICS */}
        {hasAttempts ? (
          <>
            {/* LATEST RESULT SPOTLIGHT CARD */}
            <section className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative">
              <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-1 font-mono text-xs font-bold text-blue-300">
                    Latest Attempt #{latestAttempt.attemptNumber || totalAttempts}
                  </span>
                  <span className="text-xs text-slate-400">
                    {new Date(latestAttempt.timestamp).toLocaleString(undefined, {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLeaderboardModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition"
                  >
                    <Trophy size={13} />
                    View Global Ranks
                  </button>
                  {totalAttempts >= 2 && (
                    <button
                      type="button"
                      onClick={() => setComparisonModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 px-3.5 py-1.5 text-xs font-semibold text-blue-300 transition"
                    >
                      <Columns size={13} />
                      Compare Attempts
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-center">
                {/* Score Big Display */}
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400">
                    Physics Drill Result
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
                    {latestAttempt.score}{' '}
                    <span className="text-lg text-slate-500 sm:text-xl font-normal">
                      / {latestAttempt.maxScore || 240}
                    </span>
                  </h2>
                  <p className="text-sm font-semibold text-slate-300">
                    {latestAttempt.percentage}% Final Score · {latestAttempt.accuracy?.toFixed(1)}% Accuracy
                  </p>
                  <p className="text-xs text-slate-500">
                    {latestAttempt.testTitle || 'NEET 2027: Work, Energy and Power'}
                  </p>
                </div>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-300">
                    <p className="font-mono text-lg font-black text-emerald-400">{latestAttempt.correct}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-emerald-300/80">Correct (+4)</p>
                  </div>
                  <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-3 text-rose-300">
                    <p className="font-mono text-lg font-black text-rose-400">{latestAttempt.wrong}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-rose-300/80">Wrong (-1)</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-slate-300">
                    <p className="font-mono text-lg font-black text-slate-200">{latestAttempt.unattempted}</p>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-400">Left (0)</p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => onReviewAttempt(latestAttempt)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
                  >
                    <Eye size={15} />
                    Review Solutions &amp; Step-by-Step
                  </button>
                  <button
                    type="button"
                    onClick={onStartTest}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    <RotateCcw size={14} /> Retake 2-Hour Test
                  </button>
                </div>
              </div>
            </section>

            {/* PROGRESS & COMPARISON CHARTS */}
            <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Score Trend Chart */}
              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                      Score &amp; Accuracy Progression
                    </h3>
                    <p className="text-xs text-slate-400">
                      Track score (/240) and accuracy (%) over sequential attempts.
                    </p>
                  </div>
                  <Award size={18} className="text-blue-400" />
                </div>
                <AttemptComparisonChart scoreTrend={scoreTrend} />
              </div>

              {/* Accuracy & Question Distribution */}
              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-6 shadow-xl">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-sans text-base sm:text-lg font-bold text-white">
                      Attempt Question Breakdown
                    </h3>
                    <p className="text-xs text-slate-400">
                      Correct, Wrong, and Unattempted question distribution.
                    </p>
                  </div>
                  <Target size={18} className="text-emerald-400" />
                </div>
                <AttemptAccuracyChart scoreTrend={scoreTrend} />
              </div>
            </section>

            {/* PREVIOUS ATTEMPTS & COMPARISON TABLE */}
            <section className="rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-8 shadow-xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white">
                    All Previous Test Attempts &amp; Comparison
                  </h3>
                  <p className="text-xs text-slate-400">
                    Detailed record of your previous tests with instant solution reviews.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setLeaderboardModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 px-3.5 py-1.5 text-xs font-semibold text-amber-300 transition"
                  >
                    <Trophy size={13} />
                    All Candidates Ranks
                  </button>
                  {totalAttempts >= 2 && (
                    <button
                      type="button"
                      onClick={() => setComparisonModalOpen(true)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-600/15 hover:bg-blue-600/25 px-3.5 py-1.5 text-xs font-semibold text-blue-300 transition"
                    >
                      <Columns size={13} />
                      Side-by-Side Compare
                    </button>
                  )}
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 bg-[#070A12] text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                      <th className="px-3.5 py-3 rounded-l-xl">Attempt</th>
                      <th className="px-3.5 py-3">Date &amp; Time</th>
                      <th className="px-3.5 py-3">Score / 240</th>
                      <th className="px-3.5 py-3">Accuracy</th>
                      <th className="px-3.5 py-3">Breakdown</th>
                      <th className="px-3.5 py-3">Time Spent</th>
                      <th className="px-3.5 py-3 text-right rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allAttempts.map((att, idx) => {
                      const isLatest = idx === 0;
                      return (
                        <tr key={att.id} className="hover:bg-white/[0.02] transition">
                          <td className="px-3.5 py-3.5 font-mono font-bold text-white">
                            #{att.attemptNumber || totalAttempts - idx}
                            {isLatest && (
                              <span className="ml-2 rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                                Latest
                              </span>
                            )}
                          </td>
                          <td className="px-3.5 py-3.5 text-slate-400">
                            {new Date(att.timestamp).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </td>
                          <td className="px-3.5 py-3.5 font-bold text-white">
                            <span className="text-sm font-black">{att.score}</span>
                            <span className="text-[11px] text-slate-500"> / 240</span>
                            <span className="ml-1.5 text-[11px] text-blue-400">({att.percentage}%)</span>
                          </td>
                          <td className="px-3.5 py-3.5 font-semibold text-emerald-400">
                            {att.accuracy ? `${att.accuracy.toFixed(1)}%` : '0%'}
                          </td>
                          <td className="px-3.5 py-3.5">
                            <div className="flex items-center gap-1.5 font-mono text-[11px]">
                              <span className="text-emerald-400 font-bold">+{att.correct}</span>
                              <span className="text-slate-600">/</span>
                              <span className="text-rose-400 font-bold">-{att.wrong}</span>
                              <span className="text-slate-600">/</span>
                              <span className="text-slate-400 font-medium">0({att.unattempted})</span>
                            </div>
                          </td>
                          <td className="px-3.5 py-3.5 text-slate-400 font-mono">
                            {formatDuration(att.timeTakenMs || 0)}
                          </td>
                          <td className="px-3.5 py-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => onReviewAttempt(att)}
                              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 hover:bg-blue-600 hover:border-blue-500 px-3 py-1 text-xs font-semibold text-slate-300 hover:text-white transition"
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
          <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] p-8 sm:p-12 text-center shadow-2xl relative overflow-hidden">
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-glow">
              <Zap size={32} />
            </div>
            <h2 className="mt-4 font-serif italic text-2xl sm:text-3xl text-slate-100">
              Welcome to Your NEET 2027 Dashboard, <span className="font-sans not-italic font-black text-white">{user?.name || 'Aspirant'}</span>!
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-slate-400 leading-relaxed font-normal">
              You haven't completed any practice tests yet. Start your first timed 2-hour examination to generate instant scoring, topic analysis, and national ranking.
            </p>

            <div className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/10 bg-[#070A12] p-6 text-left">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Sparkles size={18} className="text-blue-400" />
                Featured Test: Work, Energy and Power
              </div>
              <ul className="mt-3 space-y-1.5 text-xs text-slate-300">
                <li>• <strong className="text-white">60 High-Yield Questions:</strong> Curated NEET &amp; hard conceptual diagrams.</li>
                <li>• <strong className="text-white">2 Hours Continuous Timer:</strong> Timed CBT environment.</li>
                <li>• <strong className="text-white">Marking Scheme:</strong> +4 marks for correct, −1 mark for incorrect answers.</li>
                <li>• <strong className="text-white">Global Leaderboard:</strong> Live cross-candidate comparison &amp; ranks.</li>
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onStartTest}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
              >
                Begin 2-Hour Examination <ArrowRight size={16} />
              </button>
              <button
                type="button"
                onClick={() => setLeaderboardModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 px-6 py-4 text-sm font-semibold text-blue-300 transition"
              >
                <Trophy size={16} className="text-amber-400" />
                View All Users ({globalStats?.totalUsers || 1})
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

        {/* GLOBAL LEADERBOARD & CANDIDATES MODAL */}
        <GlobalLeaderboardModal
          open={leaderboardModalOpen}
          onClose={() => setLeaderboardModalOpen(false)}
          stats={globalStats}
          currentUserEmail={user?.email}
        />
      </div>
    </main>
  );
}
