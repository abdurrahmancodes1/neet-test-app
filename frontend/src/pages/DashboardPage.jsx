import React, { useState, useEffect } from 'react';
import {
  Zap,
  Award,
  Target,
  Clock,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  RotateCcw,
  Sparkles,
  BarChart3,
  Calendar,
  Layers,
  Eye,
  Columns,
  Trophy,
  BookOpen,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { getUserAnalytics, getGlobalPlatformStats, fetchServerAttempts, syncOrphanedLocalAttempts } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';
import GithubContributionHeatmap from '../components/GithubContributionHeatmap.jsx';
import AttemptComparisonModal from '../components/AttemptComparisonModal.jsx';
import GlobalLeaderboardModal from '../components/GlobalLeaderboardModal.jsx';
import Navbar from '../components/Navbar.jsx';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { JEE_2027_PERIODIC_TEST } from '../data/jee2027PeriodicTableTest.js';
import NeetScorePredictorCard from '../components/NeetScorePredictorCard.jsx';
import JeeScorePredictorCard from '../components/JeeScorePredictorCard.jsx';

export default function DashboardPage({
  user,
  onStartTest,
  onBrowseTests,
  onReviewAttempt,
  onGoToAdmin,
  onLogout,
  onUserUpdated,
  platformTests = {},
}) {
  const { isLight } = useTheme();
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [globalStats, setGlobalStats] = useState(null);
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Sync latest user attempts and recover any unsynced local sessions on mount
  useEffect(() => {
    if (user?.email) {
      syncOrphanedLocalAttempts(user)
        .then(() => fetchServerAttempts(user.email))
        .then((attempts) => {
          if (attempts && attempts.length > 0) {
            setRefreshCounter((prev) => prev + 1);
          }
        })
        .catch(() => {});
    }
  }, [user?.email]);

  const analytics = getUserAnalytics(user?.email);

  const {
    totalAttempts,
    latestAttempt,
    previousAttempt,
    bestAttempt,
    averageAccuracy,
    scoreTrend,
    allAttempts,
  } = analytics;

  const hasAttempts = totalAttempts > 0;

  // Load platform-wide global stats
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
  }, [totalAttempts, refreshCounter]);

  // Calculate delta between latest and previous attempt
  const scoreDelta =
    latestAttempt && previousAttempt ? latestAttempt.score - previousAttempt.score : null;

  const formatAttemptDate = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  const formatAcc = (val) => {
    const num = Number(val);
    return isNaN(num) ? '0' : num.toFixed(1);
  };

  const handleNav = (screen) => {
    if (screen === 'tests' || screen === 'chapters') {
      if (onBrowseTests) onBrowseTests();
    } else if (screen === 'admin') {
      if (onGoToAdmin) onGoToAdmin();
    }
  };

  const totalPlatformTestCount = 9 + Object.keys(platformTests || {}).length;

  return (
    <main
      className={`min-h-screen px-4 py-4 sm:py-6 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[420px] blur-3xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent'
        }`}
      />

      <div className="mx-auto max-w-6xl space-y-6 relative z-10 animate-fade-in font-mono">
        {/* Unified Navigation Bar */}
        <Navbar
          currentScreen="dashboard"
          user={user}
          onNavigate={handleNav}
          onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          onLogout={onLogout}
          onUserUpdated={onUserUpdated}
        />

        {/* Technical Welcome Banner */}
        <section
          className={`rounded-2xl border p-5 sm:p-7 shadow-md relative overflow-hidden transition font-mono ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900'
              : 'bg-[#080D1A] border-blue-900/50 text-white'
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="max-w-2xl space-y-2">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                  [NEET &amp; JEE 2027 CANDIDATE PORTAL]
                </span>
              </div>
              <h1 className={`font-mono text-2xl sm:text-3xl font-black tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Welcome back, {user?.name || 'Aspirant'}!
              </h1>
              <p className={`text-xs sm:text-sm font-mono leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Track your mock test trajectory, diagnose weakness areas across Physics, Chemistry, and Biology, and attempt standardized CBT drills with instant KaTeX step-by-step solutions.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={onBrowseTests}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs sm:text-sm px-5 py-2.5 shadow-md shadow-blue-600/20 transition active:scale-95 flex items-center gap-2"
              >
                <span>Browse Test Catalog</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => setLeaderboardModalOpen(true)}
                className={`rounded-lg border px-4 py-2.5 font-mono font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                  isLight
                    ? 'border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-900'
                    : 'border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300'
                }`}
              >
                <Trophy size={14} className="text-amber-500" />
                <span>Leaderboard</span>
              </button>
            </div>
          </div>
        </section>

        {/* Top Key Metrics Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 font-mono">
          {/* 1. Latest Score */}
          <div
            className={`rounded-xl border p-4 sm:p-5 shadow-sm transition group ${
              isLight
                ? 'border-slate-300 bg-white text-slate-900 hover:border-blue-400'
                : 'border-blue-900/40 bg-[#080D1A] text-white hover:border-blue-600'
            }`}
          >
            <div className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>[LATEST SCORE]</span>
              <Award size={15} className="text-blue-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {latestAttempt ? latestAttempt.score : '—'}
              <span className="text-xs font-semibold text-slate-500 sm:text-sm"> / {latestAttempt?.maxScore || 240}</span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-[11px]">
              {scoreDelta !== null ? (
                scoreDelta > 0 ? (
                  <span className="flex items-center font-bold text-emerald-500">
                    <TrendingUp size={12} className="mr-0.5" /> +{scoreDelta} vs prev
                  </span>
                ) : scoreDelta < 0 ? (
                  <span className="flex items-center font-bold text-rose-500">
                    <TrendingDown size={12} className="mr-0.5" /> {scoreDelta} vs prev
                  </span>
                ) : (
                  <span className="font-medium text-slate-400">Equal to prev</span>
                )
              ) : (
                <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                  {hasAttempts ? 'First test record' : 'Take a test to begin'}
                </span>
              )}
            </div>
          </div>

          {/* 2. Personal Best */}
          <div
            className={`rounded-xl border p-4 sm:p-5 shadow-sm transition group ${
              isLight
                ? 'border-slate-300 bg-white text-slate-900 hover:border-amber-400'
                : 'border-blue-900/40 bg-[#080D1A] text-white hover:border-amber-500/40'
            }`}
          >
            <div className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>[PERSONAL BEST]</span>
              <Sparkles size={15} className="text-amber-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {bestAttempt ? bestAttempt.score : '—'}
              <span className="text-xs font-semibold text-slate-500 sm:text-sm"> / {bestAttempt?.maxScore || 240}</span>
            </p>
            <p className="mt-1 text-[11px] font-bold text-amber-500">
              {bestAttempt ? `${bestAttempt.percentage}% Peak Score` : 'No attempts yet'}
            </p>
          </div>

          {/* 3. Average Accuracy */}
          <div
            className={`rounded-xl border p-4 sm:p-5 shadow-sm transition group ${
              isLight
                ? 'border-slate-300 bg-white text-slate-900 hover:border-emerald-400'
                : 'border-blue-900/40 bg-[#080D1A] text-white hover:border-emerald-500/40'
            }`}
          >
            <div className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>[AVG ACCURACY]</span>
              <Target size={15} className="text-emerald-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {hasAttempts ? `${averageAccuracy}%` : '—'}
            </p>
            <p className={`mt-1 text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {hasAttempts ? 'Across all tests' : 'Pending first test'}
            </p>
          </div>

          {/* 4. Total Completed Tests */}
          <div
            className={`rounded-xl border p-4 sm:p-5 shadow-sm transition group ${
              isLight
                ? 'border-slate-300 bg-white text-slate-900 hover:border-indigo-400'
                : 'border-blue-900/40 bg-[#080D1A] text-white hover:border-indigo-500/40'
            }`}
          >
            <div className={`flex items-center justify-between text-[11px] font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>[TESTS TAKEN]</span>
              <BarChart3 size={15} className="text-indigo-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalAttempts}
            </p>
            <p className={`mt-1 text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {totalAttempts === 1 ? '1 Completed Exam' : `${totalAttempts} Completed Exams`}
            </p>
          </div>
        </section>

        {/* Curated Recommended Tests Showcase */}
        <section className="space-y-3 font-mono">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className={`font-mono text-base sm:text-lg font-bold tracking-tight uppercase ${isLight ? 'text-slate-900' : 'text-white'}`}>
                [RECOMMENDED CBT DRILLS]
              </h2>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Featured examinations curated for syllabus mastery.
              </p>
            </div>
            <button
              type="button"
              onClick={onBrowseTests}
              className={`inline-flex items-center gap-1 text-xs font-bold transition ${
                isLight ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
              }`}
            >
              <span>View catalog ({totalPlatformTestCount})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            {/* 1. NEET Round 1: Mechanics */}
            <div
              className={`rounded-xl border p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-sm transition hover:shadow-md ${
                isLight
                  ? 'bg-white border-blue-200 text-slate-900 hover:border-blue-400'
                  : 'bg-[#080D1A] border-blue-900/40 text-white hover:border-blue-600'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                    isLight ? 'bg-blue-100 text-blue-800' : 'bg-blue-500/20 text-blue-300'
                  }`}>
                    ⚡ NEET 2027 · PHYSICS
                  </span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    120 Mins
                  </span>
                </div>
                <h3 className="font-mono font-bold text-sm leading-snug">
                  {NEET_ROUND_1_TEST.title}
                </h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Work-Energy Theorem, Center of Mass, and Rotational Dynamics.
                </p>
                <div className={`flex items-center gap-3 text-[11px] font-mono pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>120 Questions</span> · <span>480 Marks</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartTest(NEET_ROUND_1_TEST.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 py-2 text-xs font-bold text-white transition active:scale-98 shadow-sm"
              >
                <span>Start Drill</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* 2. JEE Main: Periodic Table */}
            <div
              className={`rounded-xl border p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-sm transition hover:shadow-md ${
                isLight
                  ? 'bg-white border-amber-200 text-slate-900 hover:border-amber-400'
                  : 'bg-[#080D1A] border-amber-500/30 text-white hover:border-amber-500/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                    isLight ? 'bg-amber-100 text-amber-900' : 'bg-amber-500/20 text-amber-300'
                  }`}>
                    🎯 JEE MAIN 2027 · CHEMISTRY
                  </span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    90 Mins
                  </span>
                </div>
                <h3 className="font-mono font-bold text-sm leading-snug">
                  {JEE_2027_PERIODIC_TEST.title}
                </h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Periodic trends, ionization enthalpy, and official percentile matrix.
                </p>
                <div className={`flex items-center gap-3 text-[11px] font-mono pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>60 Questions</span> · <span>240 Marks</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartTest(JEE_2027_PERIODIC_TEST.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 py-2 text-xs font-bold text-white transition active:scale-98 shadow-sm"
              >
                <span>Start Drill</span>
                <ArrowRight size={12} />
              </button>
            </div>

            {/* 3. NEET Biology Core */}
            <div
              className={`rounded-xl border p-4 sm:p-5 flex flex-col justify-between space-y-3.5 shadow-sm transition hover:shadow-md ${
                isLight
                  ? 'bg-white border-emerald-200 text-slate-900 hover:border-emerald-400'
                  : 'bg-[#080D1A] border-emerald-500/30 text-white hover:border-emerald-500/60'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`rounded px-2 py-0.5 text-[9px] font-bold ${
                    isLight ? 'bg-emerald-100 text-emerald-900' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    🌿 NEET 2027 · BIOLOGY
                  </span>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    50 Mins
                  </span>
                </div>
                <h3 className="font-mono font-bold text-sm leading-snug">
                  {NEET_BIOLOGY_TEST.title}
                </h3>
                <p className={`text-[11px] line-clamp-2 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Plant Morphology, Cell Biology, and Human Physiology PYQ assessment.
                </p>
                <div className={`flex items-center gap-3 text-[11px] font-mono pt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  <span>50 Questions</span> · <span>200 Marks</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => onStartTest(NEET_BIOLOGY_TEST.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 py-2 text-xs font-bold text-white transition active:scale-98 shadow-sm"
              >
                <span>Start Drill</span>
                <ArrowRight size={12} />
              </button>
            </div>
          </div>
        </section>

        {/* RECENT ATTEMPT PERFORMANCE SUMMARY */}
        {hasAttempts ? (
          <div className="space-y-6">
            <section
              className={`rounded-2xl border p-5 sm:p-6 shadow-md transition font-mono ${
                isLight ? 'border-slate-300 bg-white text-slate-900' : 'border-blue-900/40 bg-[#080D1A] text-white'
              }`}
            >
              <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${
                isLight ? 'border-slate-200' : 'border-blue-900/30'
              }`}>
                <div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                    [RECENT EXAMINATION REVIEW]
                  </span>
                  <h3 className={`mt-1 font-mono text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Latest Completed Mock Assessment
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`rounded px-2.5 py-1 text-xs font-mono font-bold ${
                    isLight ? 'bg-slate-100 border border-slate-300 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
                  }`}>
                    {formatAttemptDate(latestAttempt?.timestamp)}
                  </span>
                  {totalAttempts >= 2 && (
                    <button
                      type="button"
                      onClick={() => setComparisonModalOpen(true)}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-semibold transition ${
                        isLight
                          ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700'
                          : 'border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-300'
                      }`}
                    >
                      <Columns size={12} />
                      <span>Compare Attempts</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-center">
                {/* Score Big Display */}
                <div className="space-y-1">
                  <span className={`text-[11px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>
                    {latestAttempt?.testTitle || 'Exam Result'}
                  </span>
                  <h2 className={`font-mono text-3xl sm:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {latestAttempt?.score ?? 0}{' '}
                    <span className="text-base text-slate-500 font-normal">
                      / {latestAttempt?.maxScore || 240}
                    </span>
                  </h2>
                  <p className={`text-xs font-mono font-bold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    {latestAttempt?.percentage ?? 0}% Final Score · {formatAcc(latestAttempt?.accuracy)}% Accuracy
                  </p>
                </div>

                {/* Score Stats Grid */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
                  <div className={`rounded-lg border p-2.5 ${
                    isLight ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300'
                  }`}>
                    <p className={`font-mono text-base font-black ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>{latestAttempt.correct}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase">Correct (+4)</p>
                  </div>
                  <div className={`rounded-lg border p-2.5 ${
                    isLight ? 'border-rose-200 bg-rose-50 text-rose-800' : 'border-rose-500/20 bg-rose-500/10 text-rose-300'
                  }`}>
                    <p className={`font-mono text-base font-black ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>{latestAttempt.wrong}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase">Wrong (-1)</p>
                  </div>
                  <div className={`rounded-lg border p-2.5 ${
                    isLight ? 'border-slate-300 bg-slate-50 text-slate-700' : 'border-blue-900/40 bg-white/5 text-slate-300'
                  }`}>
                    <p className={`font-mono text-base font-black ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>{latestAttempt.unattempted}</p>
                    <p className="mt-0.5 text-[10px] font-bold uppercase">Left (0)</p>
                  </div>
                </div>

                {/* Action CTA */}
                <div className="flex flex-col gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => onReviewAttempt(latestAttempt)}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white shadow-md shadow-blue-600/20 transition active:scale-95"
                  >
                    <Eye size={14} />
                    <span>Review Step-by-Step Solutions</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onStartTest(latestAttempt.testId || NEET_ROUND_1_TEST.id, true)}
                    className={`flex w-full items-center justify-center gap-2 rounded-lg border py-2.5 text-xs font-semibold transition ${
                      isLight
                        ? 'border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700'
                        : 'border-blue-900/40 bg-white/5 hover:bg-white/10 text-slate-300'
                    }`}
                  >
                    <RotateCcw size={13} />
                    <span>Retake Examination</span>
                  </button>
                </div>
              </div>

              {/* Score & AIR Predictor */}
              <div className={`mt-5 border-t pt-5 ${isLight ? 'border-slate-200' : 'border-blue-900/30'}`}>
                {Boolean(
                  (latestAttempt.testId && String(latestAttempt.testId).toLowerCase().includes('jee')) ||
                  (latestAttempt.testTitle && String(latestAttempt.testTitle).toLowerCase().includes('jee')) ||
                  (latestAttempt.testId && String(latestAttempt.testId).toLowerCase().includes('periodic'))
                ) ? (
                  <JeeScorePredictorCard
                    testId={latestAttempt.testId}
                    score={latestAttempt.score}
                    maxScore={latestAttempt.maxScore}
                    accuracy={latestAttempt.accuracy}
                    correct={latestAttempt.correct}
                    wrong={latestAttempt.wrong}
                    candidateName={user?.name}
                  />
                ) : (
                  <NeetScorePredictorCard
                    testId={latestAttempt.testId}
                    score={latestAttempt.score}
                    maxScore={latestAttempt.maxScore}
                    accuracy={latestAttempt.accuracy}
                    correct={latestAttempt.correct}
                    wrong={latestAttempt.wrong}
                  />
                )}
              </div>
            </section>

            {/* GITHUB-STYLE CONTRIBUTION HEATMAP */}
            <GithubContributionHeatmap attempts={allAttempts} />

            {/* PREVIOUS ATTEMPTS TABLE */}
            <section
              className={`rounded-2xl border p-5 sm:p-6 shadow-md font-mono ${
                isLight ? 'border-slate-300 bg-white text-slate-900' : 'border-blue-900/40 bg-[#080D1A] text-white'
              }`}
            >
              <div className={`mb-4 flex flex-wrap items-center justify-between gap-3 border-b pb-3 ${
                isLight ? 'border-slate-200' : 'border-blue-900/30'
              }`}>
                <div>
                  <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                    [AUDIT RECORD]
                  </span>
                  <h3 className={`font-mono text-lg sm:text-xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    Test Attempt History
                  </h3>
                </div>
                {totalAttempts >= 2 && (
                  <button
                    type="button"
                    onClick={() => setComparisonModalOpen(true)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition ${
                      isLight
                        ? 'border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700'
                        : 'border-blue-500/30 bg-blue-600/15 hover:bg-blue-600/25 text-blue-300'
                    }`}
                  >
                    <Columns size={12} />
                    <span>Side-by-Side Compare</span>
                  </button>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className={`border-b text-[10px] font-bold uppercase tracking-wider ${
                      isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-blue-900/30 bg-[#060A14] text-slate-400'
                    }`}>
                      <th className="px-3 py-2.5 rounded-l">Attempt</th>
                      <th className="px-3 py-2.5">Test Title</th>
                      <th className="px-3 py-2.5">Date</th>
                      <th className="px-3 py-2.5">Score</th>
                      <th className="px-3 py-2.5">Accuracy</th>
                      <th className="px-3 py-2.5">Breakdown</th>
                      <th className="px-3 py-2.5">Time</th>
                      <th className="px-3 py-2.5 text-right rounded-r">Action</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isLight ? 'divide-slate-100' : 'divide-blue-900/20'}`}>
                    {allAttempts.map((att, idx) => {
                      const isLatest = idx === 0;
                      const maxScore = att.maxScore || 240;
                      const sameTestAttempts = allAttempts.filter(
                        (a) => (a.testId || '').toLowerCase() === (att.testId || '').toLowerCase()
                      );
                      const testAttemptIndex = sameTestAttempts.indexOf(att);
                      const testAttemptNum = testAttemptIndex >= 0 ? sameTestAttempts.length - testAttemptIndex : 1;

                      return (
                        <tr key={att.id} className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-blue-950/20'}`}>
                          <td className={`px-3 py-3 font-mono font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            #{att.testAttemptNumber || att.attemptNumber || totalAttempts - idx}
                            {isLatest && (
                              <span className={`ml-2 rounded px-1.5 py-0.2 text-[9px] font-bold ${
                                isLight ? 'bg-blue-100 text-blue-900' : 'bg-blue-500/20 text-blue-300'
                              }`}>
                                LATEST
                              </span>
                            )}
                          </td>
                          <td className={`px-3 py-3 font-medium ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                            <div className="flex items-center gap-2">
                              <span>{att.testTitle || 'Standard Mock'}</span>
                              {sameTestAttempts.length > 1 && (
                                <span className={`rounded px-1.5 py-0.2 text-[9px] font-bold border ${
                                  isLight ? 'bg-indigo-50 border-indigo-200 text-indigo-700' : 'bg-indigo-950/50 border-indigo-500/30 text-indigo-300'
                                }`}>
                                  Attempt {testAttemptNum}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className={`px-3 py-3 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                            {formatAttemptDate(att.timestamp)}
                          </td>
                          <td className={`px-3 py-3 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                            <span className="text-sm font-black">{att.score ?? 0}</span>
                            <span className="text-[10px] text-slate-500"> / {maxScore}</span>
                            <span className={`ml-1 text-[10px] ${isLight ? 'text-blue-600 font-semibold' : 'text-blue-400'}`}>({att.percentage ?? 0}%)</span>
                          </td>
                          <td className="px-3 py-3 font-semibold text-emerald-500">
                            {formatAcc(att.accuracy)}%
                          </td>
                          <td className="px-3 py-3">
                            <div className="flex items-center gap-1 font-mono text-[10px]">
                              <span className="text-emerald-500 font-bold">+{att.correct}</span>
                              <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>/</span>
                              <span className="text-rose-500 font-bold">-{att.wrong}</span>
                              <span className={isLight ? 'text-slate-300' : 'text-slate-600'}>/</span>
                              <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>0({att.unattempted})</span>
                            </div>
                          </td>
                          <td className={`px-3 py-3 font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                            {formatDuration(att.timeTakenMs || 0)}
                          </td>
                          <td className="px-3 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => onReviewAttempt(att)}
                              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold transition ${
                                isLight
                                  ? 'border border-slate-300 bg-slate-100 hover:bg-blue-600 hover:text-white'
                                  : 'border border-blue-900/50 bg-white/5 hover:bg-blue-600 text-slate-300 hover:text-white'
                              }`}
                            >
                              <span>Review</span>
                              <ArrowRight size={11} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        ) : (
          /* ONBOARDING STATE FOR NEW STUDENTS */
          <section
            className={`rounded-2xl border p-8 sm:p-12 text-center shadow-md font-mono transition ${
              isLight
                ? 'bg-white border-slate-300 text-slate-800'
                : 'bg-[#080D1A] border-blue-900/50 text-white'
            }`}
          >
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-500">
              <Zap size={28} />
            </div>
            <h2 className={`mt-4 font-mono font-black text-xl sm:text-2xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
              Ready to Launch Your First Test, {user?.name || 'Aspirant'}?
            </h2>
            <p className={`mx-auto mt-2 max-w-lg text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Our CBT engine features authentic NTA marking schemes (+4 / -1), question palettes, live timer countdowns, and KaTeX LaTeX rendering with verified step-by-step solutions.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onBrowseTests}
                className="rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-mono font-bold text-xs px-5 py-2.5 shadow-md shadow-blue-600/20 transition active:scale-95 flex items-center gap-2"
              >
                <span>Browse Full Test Catalog</span>
                <ArrowRight size={14} />
              </button>

              <button
                type="button"
                onClick={() => setLeaderboardModalOpen(true)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-4 py-2.5 text-xs font-mono font-semibold transition ${
                  isLight
                    ? 'border-slate-300 bg-white hover:bg-slate-50 text-slate-700'
                    : 'border-blue-900/40 bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                <Trophy size={14} className="text-amber-500" />
                <span>View Candidate Rankings</span>
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

        {/* GLOBAL LEADERBOARD MODAL */}
        <GlobalLeaderboardModal
          open={leaderboardModalOpen}
          onClose={() => setLeaderboardModalOpen(false)}
          stats={globalStats}
          currentUserEmail={user?.email}
          isAdmin={user?.role === 'admin'}
        />
      </div>
    </main>
  );
}
