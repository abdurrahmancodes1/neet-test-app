import React, { useState, useEffect, useRef } from 'react';
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
  GraduationCap,
  BookOpen,
  Calculator,
  Check,
  ArrowDown,
  ExternalLink,
  Atom,
  Dna,
  Scale,
  Flame,
  ShieldCheck,
  ShieldAlert,
  Sun,
  Moon,
} from 'lucide-react';
import { getUserAnalytics, getGlobalPlatformStats, fetchServerAttempts } from '../utils/auth.js';
import { formatDuration } from '../utils/scoring.js';
import { AttemptComparisonChart, AttemptAccuracyChart } from '../components/AttemptComparisonChart.jsx';
import AttemptComparisonModal from '../components/AttemptComparisonModal.jsx';
import GlobalLeaderboardModal from '../components/GlobalLeaderboardModal.jsx';
import { NEET_CALCULUS_TEST } from '../data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST } from '../data/neet2026CoreTopicsTest.js';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST } from '../data/neetGrandMegaDrillTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST } from '../data/neetMechanicsBondingTest.js';
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
}) {
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [globalStats, setGlobalStats] = useState(null);
  const [selectedStandard, setSelectedStandard] = useState('neet'); // 'neet' | 'jee' | 'class10' | 'class9' | 'class8'
  const [refreshCounter, setRefreshCounter] = useState(0);
  const testsSectionRef = useRef(null);

  // Theme state: 'dark' (default) or 'light'
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('neet_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });
  const isLight = theme === 'light';

  const toggleTheme = () => {
    const next = isLight ? 'dark' : 'light';
    setTheme(next);
    try {
      localStorage.setItem('neet_theme', next);
    } catch {}
  };

  const standards = [
    { id: 'neet', label: 'NEET 2027', badge: '5 Active Tests', active: true, icon: Zap },
    { id: 'jee', label: 'JEE Main 2027', badge: '1 Active Test', active: true, icon: Target },
    { id: 'class10', label: 'Class 10', badge: 'Upcoming in future', active: false, icon: GraduationCap },
    { id: 'class9', label: 'Class 9', badge: 'Upcoming in future', active: false, icon: Layers },
    { id: 'class8', label: 'Class 8', badge: 'Upcoming in future', active: false, icon: BookOpen },
  ];

  const scrollToTests = () => {
    if (testsSectionRef.current) {
      testsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Sync latest user attempts directly from server on mount
  useEffect(() => {
    if (user?.email) {
      fetchServerAttempts(user.email).then((attempts) => {
        if (attempts && attempts.length > 0) {
          setRefreshCounter((prev) => prev + 1);
        }
      });
    }
  }, [user?.email]);

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
  }, [totalAttempts, refreshCounter]);

  // Calculate delta between latest and previous attempt
  const scoreDelta =
    latestAttempt && previousAttempt ? latestAttempt.score - previousAttempt.score : null;
  const accuracyDelta =
    latestAttempt && previousAttempt
      ? latestAttempt.accuracy - previousAttempt.accuracy
      : null;

  const formatAttemptDate = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return 'Recent';
    }
  };

  const formatAttemptDateTime = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
    } catch {
      return 'Recent';
    }
  };

  const formatAcc = (val) => {
    const num = Number(val);
    return isNaN(num) ? '0' : num.toFixed(1);
  };


  return (
    <main
      className={`min-h-screen px-4 py-4 sm:py-8 relative overflow-hidden selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
        isLight ? 'bg-[#F8FAFC] text-slate-900' : 'bg-[#05070B] text-slate-100'
      }`}
    >
      {/* Background Ambient Radial Glow */}
      <div
        className={`pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] blur-2xl ${
          isLight
            ? 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-indigo-500/5 to-transparent'
            : 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent'
        }`}
      />

      <div className="mx-auto max-w-6xl space-y-10 relative z-10 animate-fade-in">
        {/* Floating Pill Navigation Bar */}
        <header
          className={`rounded-full border backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between gap-3 transition-colors ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
              : 'bg-[#0D121F]/90 border-white/10 text-white'
          }`}
        >
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
              onClick={scrollToTests}
              className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
            >
              <Layers size={14} /> Available Tests
            </button>
            <button
              type="button"
              onClick={onBrowseTests}
              className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
            >
              <GraduationCap size={14} /> Curriculum Portal
            </button>
            <button
              type="button"
              onClick={() => setLeaderboardModalOpen(true)}
              className="text-slate-400 hover:text-blue-300 transition flex items-center gap-1.5"
            >
              <Trophy size={14} className="text-amber-400" /> Global Leaderboard
            </button>
            {user?.role === 'admin' && onGoToAdmin && (
              <button
                type="button"
                onClick={onGoToAdmin}
                className="rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 hover:bg-amber-500/30 px-3 py-1 font-bold text-xs transition flex items-center gap-1.5"
              >
                🛡️ Admin Portal
              </button>
            )}
            <span className="text-slate-500 text-[11px] font-medium border border-white/10 rounded-full px-2.5 py-0.5 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {globalStats?.totalUsers ? `${globalStats.totalUsers} Candidates` : 'Cloud Active'}
            </span>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Theme Switcher (Dark / Light Mode) */}
            <button
              type="button"
              onClick={toggleTheme}
              title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
              className={`rounded-full px-3 sm:px-4 py-1.5 text-xs font-bold transition flex items-center gap-1.5 border shadow-md active:scale-95 ${
                isLight
                  ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 hover:bg-amber-500/25'
                  : 'bg-blue-600/25 border-blue-500/40 text-blue-200 hover:bg-blue-600/35'
              }`}
            >
              {isLight ? (
                <>
                  <Sun size={15} className="text-amber-600 shrink-0" />
                  <span className="font-extrabold text-[11px] sm:text-xs">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="text-blue-400 shrink-0" />
                  <span className="font-extrabold text-[11px] sm:text-xs">Dark Mode</span>
                </>
              )}
            </button>

            {user?.role === 'admin' && onGoToAdmin && (
              <button
                type="button"
                onClick={onGoToAdmin}
                className="sm:hidden inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/20 text-amber-300 px-3 py-1 text-xs font-bold"
              >
                🛡️ Admin
              </button>
            )}
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
              onClick={scrollToTests}
              className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-5 py-2 text-xs font-semibold shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center gap-1.5"
            >
              <span>Explore Tests</span>
              <ArrowDown size={14} />
            </button>

            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Sign Out"
                className={`rounded-full border p-2 transition ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 hover:bg-rose-50 text-slate-500 hover:text-rose-600'
                    : 'border-white/10 bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10'
                }`}
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        </header>

        {/* Global Live Platform Stats Ticker Bar */}
        <section
          className={`rounded-2xl border p-3 sm:px-6 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs transition-colors ${
            isLight
              ? 'border-blue-100 bg-gradient-to-r from-blue-50/90 via-white to-blue-50/90 text-slate-800 shadow-sm'
              : 'border-white/10 bg-gradient-to-r from-[#0D1322] via-[#090D17] to-[#0D1322] text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-500">
              <Globe size={15} />
            </div>
            <div>
              <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Live Platform Status:</span>{' '}
              <span className={isLight ? 'text-slate-600' : 'text-slate-300'}>
                <strong className="text-blue-600 dark:text-blue-400 font-bold">{globalStats?.totalUsers || 1}</strong> Registered Candidate{(globalStats?.totalUsers || 1) > 1 ? 's' : ''} ·{' '}
                <strong className="text-indigo-600 dark:text-indigo-400 font-bold">{globalStats?.totalAttempts || totalAttempts}</strong> Tests Submitted ·{' '}
                Top Score: <strong className="text-amber-600 dark:text-amber-400 font-bold">{globalStats?.highestScore ?? (bestAttempt?.score || 0)}/240</strong>
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLeaderboardModalOpen(true)}
            className="inline-flex items-center gap-1 rounded-full bg-blue-600/15 border border-blue-500/30 hover:bg-blue-600/25 px-3 py-1 text-[11px] font-bold text-blue-600 dark:text-blue-300 transition"
          >
            <Trophy size={12} className="text-amber-500" />
            View Leaderboard &amp; Student Scores &rarr;
          </button>
        </section>

        {/* Hero Header Section */}
        <section className="text-center pt-2 sm:pt-4 max-w-3xl mx-auto space-y-4">
          <p className={`font-serif italic text-2xl sm:text-3xl font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            Everything you need
          </p>
          <h1 className={`font-sans text-3xl sm:text-5xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            for NEET 2027 Preparation
          </h1>
          <p className={`text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            The national standard assessment platform with KaTeX LaTeX typesetting, timed CBT mock drills, verified solutions, and live candidate analytics.
          </p>

          {/* Hero CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={scrollToTests}
              className="rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm px-6 py-3 shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center gap-2"
            >
              <Zap size={16} />
              <span>Explore Available Tests</span>
              <ArrowDown size={14} />
            </button>
            <button
              type="button"
              onClick={() => setLeaderboardModalOpen(true)}
              className="rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 text-blue-600 dark:text-blue-300 font-semibold text-xs sm:text-sm px-6 py-3 transition flex items-center gap-1.5"
            >
              <Trophy size={16} className="text-amber-500" />
              <span>Global Rankings ({globalStats?.totalUsers || 1} Users)</span>
            </button>
            <button
              type="button"
              onClick={onBrowseTests}
              className={`rounded-full border px-6 py-3 font-semibold text-xs sm:text-sm transition flex items-center gap-1.5 ${
                isLight
                  ? 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-xs'
                  : 'border-white/10 bg-[#0D121F] hover:bg-[#131926] text-slate-300 hover:text-white'
              }`}
            >
              <GraduationCap size={15} />
              <span>Standard Curriculum Portal</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </section>

        {/* Top Key Metrics Cards */}
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {/* 1. Latest Score */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition group ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-400'
              : 'border-white/10 bg-[#0B0F19] text-white hover:border-blue-500/40 hover:shadow-blue-500/5'
          }`}>
            <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>Latest Score</span>
              <Award size={16} className="text-blue-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-serif text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {latestAttempt ? latestAttempt.score : '—'}
              <span className={`text-xs font-semibold sm:text-sm ${isLight ? 'text-slate-500' : 'text-slate-500'}`}> / {latestAttempt?.maxScore || 240}</span>
            </p>
            <div className="mt-1 flex items-center gap-1 text-xs">
              {scoreDelta !== null ? (
                scoreDelta > 0 ? (
                  <span className="flex items-center font-bold text-emerald-500">
                    <TrendingUp size={13} className="mr-0.5" /> +{scoreDelta} vs prev
                  </span>
                ) : scoreDelta < 0 ? (
                  <span className="flex items-center font-bold text-rose-500">
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
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition group ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-400'
              : 'border-white/10 bg-[#0B0F19] text-white hover:border-blue-500/40 hover:shadow-blue-500/5'
          }`}>
            <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>Personal Best</span>
              <Sparkles size={16} className="text-amber-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-serif text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {bestAttempt ? bestAttempt.score : '—'}
              <span className="text-xs font-semibold text-slate-500 sm:text-sm"> / {bestAttempt?.maxScore || 240}</span>
            </p>
            <p className="mt-1 text-xs font-semibold text-amber-500">
              {bestAttempt ? `${bestAttempt.percentage}% Peak Score` : 'No attempts yet'}
            </p>
          </div>

          {/* 3. Average Accuracy */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition group ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-400'
              : 'border-white/10 bg-[#0B0F19] text-white hover:border-blue-500/40 hover:shadow-blue-500/5'
          }`}>
            <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>Avg. Accuracy</span>
              <Target size={16} className="text-emerald-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-serif text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {hasAttempts ? `${averageAccuracy}%` : '—'}
            </p>
            <p className={`mt-1 text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {hasAttempts ? 'Across all attempts' : 'Take test to calculate'}
            </p>
          </div>

          {/* 4. Total Completed Tests */}
          <div className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition group ${
            isLight
              ? 'border-slate-200 bg-white text-slate-900 shadow-sm hover:border-blue-400'
              : 'border-white/10 bg-[#0B0F19] text-white hover:border-blue-500/40 hover:shadow-blue-500/5'
          }`}>
            <div className={`flex items-center justify-between text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>Tests Taken</span>
              <BarChart3 size={16} className="text-blue-500 group-hover:scale-110 transition" />
            </div>
            <p className={`mt-2 font-serif text-2xl sm:text-3xl font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {totalAttempts}
            </p>
            <p className={`mt-1 text-xs font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              {totalAttempts === 1 ? '1 Completed Exam' : `${totalAttempts} Completed Exams`}
            </p>
          </div>
        </section>

        {/* EMBEDDED STANDARD & CURRICULUM DRILLS DIRECT TEST SELECTION */}
        <section ref={testsSectionRef} className="space-y-6 pt-4">
          <div className={`flex flex-wrap items-center justify-between gap-4 border-b pb-4 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <h2 className={`font-sans text-xl sm:text-2xl font-black tracking-tight ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}>
                  Standard &amp; Curriculum Practice Drills
                </h2>
              </div>
              <p className={`text-xs sm:text-sm mt-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                Select your target examination to begin a dedicated timed CBT mock drill with instant KaTeX solutions.
              </p>
            </div>

            {/* Standard Filter Tabs */}
            <div className={`flex flex-wrap items-center gap-1.5 rounded-2xl border p-1.5 ${
              isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#0B0F19]'
            }`}>
              {standards.map((std) => {
                const isSelected = selectedStandard === std.id;
                const Icon = std.icon;
                return (
                  <button
                    key={std.id}
                    type="button"
                    onClick={() => setSelectedStandard(std.id)}
                    className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                        : isLight
                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={14} className={isSelected ? 'text-white' : isLight ? 'text-slate-500' : 'text-slate-400'} />
                    <span>{std.label}</span>
                    {std.id === 'neet' && (
                      <span className="ml-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 px-1.5 py-0.2 text-[9px] text-emerald-600 dark:text-emerald-300 font-bold">
                        5 Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TAB CONTENT: NEET 2027 */}
          {selectedStandard === 'neet' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span className="font-semibold text-slate-300">
                  Showing 5 Full CBT Mock Tests strictly inside NEET Section
                </span>
                <span className="text-[11px] text-blue-400 font-mono">
                  All tests synced with Cloud Leaderboard &amp; KaTeX Typography
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. ROUND 1: MECHANICS DRILL (120 Qs - FIXED 2.0 HRS) */}
                <div className="rounded-3xl border border-blue-500/60 bg-gradient-to-b from-[#0A192F] via-[#071324] to-[#0B0F19] p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between hover:border-blue-500/90 transition group ring-1 ring-blue-500/30">
                  <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-3xl" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-1 text-xs font-black text-blue-300 flex items-center gap-1.5">
                        <Zap size={14} className="text-blue-400" /> ROUND 1 · PHYSICS MECHANICS
                      </span>
                      <span className="rounded-full bg-blue-500/30 border border-blue-400/50 px-2.5 py-0.5 text-xs font-extrabold text-blue-100 uppercase tracking-wider">
                        ⚡ 120 Qs · 2 Hours
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-blue-200 transition tracking-tight">
                        {NEET_ROUND_1_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {NEET_ROUND_1_TEST.description}
                      </p>
                    </div>

                    {/* Chips */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">120 Qs</strong>
                        <span className="text-[9px] text-slate-500 block">45 WEP + 45 COM + 30 Rot</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">120 Mins</strong>
                        <span className="text-[9px] text-amber-400/80 block font-bold">2.0 Hours Fixed</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">480 Marks</strong>
                        <span className="text-[9px] text-emerald-400/80 block">+4 / -1 Scheme</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#070A12] p-3 text-xs text-slate-300">
                      <span className="font-bold text-blue-400 text-xs block mb-1">⚡ Topics Included:</span>
                      <span className="text-[11px] text-slate-300 leading-relaxed">
                        Work Done, Work-Energy Theorem, Conservative Forces, Discrete/Continuous Centre of Mass, 2D Inelastic Collisions, Moment of Inertia, and Torque Dynamics.
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 relative z-10">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_ROUND_1_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 py-3.5 text-xs sm:text-sm font-black text-white shadow-xl shadow-blue-600/30 transition active:scale-98"
                    >
                      <span>Start Round 1: Mechanics Drill (2.0 Hours)</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* 2. ROUND 2: BONDING, MORPHOLOGY & ROTATIONAL DYNAMICS (120 Qs - FIXED 2.0 HRS) */}
                <div className="rounded-3xl border border-emerald-500/60 bg-gradient-to-b from-[#0A261D] via-[#071C15] to-[#0B0F19] p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between hover:border-emerald-500/90 transition group ring-1 ring-emerald-500/30">
                  <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-emerald-600/15 rounded-full blur-3xl" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-1 text-xs font-black text-emerald-300 flex items-center gap-1.5">
                        <Award size={14} className="text-emerald-400" /> ROUND 2 · CHEMISTRY, BOTANY &amp; DYNAMICS
                      </span>
                      <span className="rounded-full bg-emerald-500/30 border border-emerald-400/50 px-2.5 py-0.5 text-xs font-extrabold text-emerald-100 uppercase tracking-wider">
                        🌿 120 Qs · 2 Hours
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-emerald-200 transition tracking-tight">
                        {NEET_ROUND_2_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {NEET_ROUND_2_TEST.description}
                      </p>
                    </div>

                    {/* Chips */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">120 Qs</strong>
                        <span className="text-[9px] text-slate-500 block">45 Chem + 60 Bio + 15 Phys</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">120 Mins</strong>
                        <span className="text-[9px] text-amber-400/80 block font-bold">2.0 Hours Fixed</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">480 Marks</strong>
                        <span className="text-[9px] text-emerald-400/80 block">+4 / -1 Scheme</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#070A12] p-3 text-xs text-slate-300">
                      <span className="font-bold text-emerald-400 text-xs block mb-1">🧪 Topics Included:</span>
                      <span className="text-[11px] text-slate-300 leading-relaxed">
                        Chemical Bonding (VSEPR, Hybridization, MOT, Dipoles), Plant Morphology &amp; Floral Formulas, and Advanced Rigid Body Angular Dynamics.
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 relative z-10">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_ROUND_2_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 py-3.5 text-xs sm:text-sm font-black text-white shadow-xl shadow-emerald-600/30 transition active:scale-98"
                    >
                      <span>Start Round 2: Bonding &amp; Botany Drill (2.0 Hours)</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* 1. NEW NEET & JEE MECHANICS + CHEMICAL BONDING DRILL */}
                <div className="rounded-3xl border border-violet-500/50 bg-gradient-to-b from-[#160E2E] via-[#100A22] to-[#0B0F19] p-6 shadow-2xl relative flex flex-col justify-between hover:border-violet-500/80 transition group ring-1 ring-violet-500/30 md:col-span-2">
                  <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-violet-600/15 rounded-full blur-3xl" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-violet-600/20 border border-violet-500/40 px-3 py-1 text-[11px] font-bold text-violet-300 flex items-center gap-1.5">
                        <Zap size={12} className="text-violet-400" /> NEET &amp; JEE Advanced Section · Physics &amp; Chemistry
                      </span>
                      <span className="rounded-full bg-violet-500/25 border border-violet-500/40 px-2.5 py-0.5 text-[10px] font-bold text-violet-200 uppercase tracking-wider">
                        ⭐ 120 Questions Mega Drill
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-violet-200 transition">
                        {NEET_MECHANICS_BONDING_TEST.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
                        {NEET_MECHANICS_BONDING_TEST.subtitle}
                      </p>
                    </div>

                    {/* Highlights & Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Total Questions</span>
                        <strong className="font-mono text-sm text-white font-black">120 Qs</strong>
                        <span className="text-[10px] text-slate-500 block">60 Phys + 60 Chem</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">120 Mins</strong>
                        <span className="text-[10px] text-amber-500/80 block">2 Hours CBT</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">480 Marks</strong>
                        <span className="text-[10px] text-emerald-500/80 block">+4 / -1 Scheme</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Visual Assets</span>
                        <strong className="font-mono text-sm text-violet-400 font-black">Vector Diagrams</strong>
                        <span className="text-[10px] text-violet-500/80 block">KaTeX Formulas</span>
                      </div>
                    </div>

                    {/* Syllabus summary */}
                    <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-xs text-slate-300 space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-violet-400 text-[11px]">⚡ Physics (60 Qs):</span>
                        <span className="text-[11px] text-slate-300">Work, Energy &amp; Power, Centre of Mass, Discrete &amp; Continuous Systems, 2D Inelastic Collisions, Rotational Mechanics (Strictly excluding pure rolling).</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-violet-400 text-[11px]">🧪 Chemistry (60 Qs):</span>
                        <span className="text-[11px] text-slate-300">Complete Chemical Bonding (VSEPR, Hybridization, Molecular Orbital Theory, Dipole Moments, H-Bonding, Backbonding, Lattice Energies).</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_MECHANICS_BONDING_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 py-4 text-xs sm:text-sm font-black text-white shadow-xl shadow-violet-600/30 transition active:scale-98"
                    >
                      <span>Start Mechanics &amp; Chemical Bonding Mega Examination (120m)</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>

                {/* 2. NEET 2026 & RE-NEET BIOLOGY FOUNDATION DRILL */}
                <div className="rounded-3xl border border-teal-500/40 bg-gradient-to-b from-[#0B1E1E] via-[#081717] to-[#0B0F19] p-6 shadow-2xl relative flex flex-col justify-between hover:border-teal-500/70 transition group ring-1 ring-teal-500/20">
                  <div className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-teal-600/10 rounded-full blur-2xl" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-teal-600/20 border border-teal-500/30 px-3 py-1 text-[11px] font-bold text-teal-300 flex items-center gap-1.5">
                        <Dna size={12} className="text-teal-400" /> NEET 2026 &amp; Re-NEET Biology
                      </span>
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                        NEW BIOLOGY TEST
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-black text-white group-hover:text-teal-200 transition">
                        {NEET_BIOLOGY_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {NEET_BIOLOGY_TEST.subtitle}
                      </p>
                    </div>

                    {/* Highlights & Chips */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">50 Qs</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">50 Mins</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">200 Mks</strong>
                      </div>
                    </div>

                    {/* Syllabus summary */}
                    <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-teal-400 text-[11px]">🧬 Covered High-Yield Biology Topics:</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Living World, Biological Classification, Plant Morphology &amp; Anatomy, Cell Structure &amp; Division, Biomolecules, Respiration, Circulation, Excretion &amp; Locomotion.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_BIOLOGY_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-teal-600 hover:bg-teal-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-teal-600/30 transition active:scale-98"
                    >
                      <span>Start Biology Examination (50m)</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* 2. NEET 2026 & RE-NEET CORE TOPICS DRILL */}
                <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0D1E22] via-[#09151A] to-[#0B0F19] p-6 shadow-2xl relative flex flex-col justify-between hover:border-emerald-500/70 transition group ring-1 ring-emerald-500/20">
                  <div className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-emerald-600/10 rounded-full blur-2xl" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-emerald-600/20 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-300 flex items-center gap-1.5">
                        <Sparkles size={12} className="text-emerald-400" /> NEET 2026 &amp; Re-NEET Core
                      </span>
                      <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                        Active Exam
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-black text-white group-hover:text-emerald-200 transition">
                        {NEET_2026_CORE_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {NEET_2026_CORE_TEST.subtitle}
                      </p>
                    </div>

                    {/* Highlights & Chips */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">55 Qs</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">55 Mins</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">220 Mks</strong>
                      </div>
                    </div>

                    {/* Syllabus summary */}
                    <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-emerald-400 text-[11px]">🧪 Physics &amp; Chemistry Core:</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Vectors, Units &amp; Measurements, Kinematics, Circular &amp; Rotational Motion, Work &amp; Power, Mole Concept, Atomic Orbitals, Periodic Trends, Chemical Bonding, Thermodynamics.
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_2026_CORE_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 hover:bg-emerald-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition active:scale-98"
                    >
                      <span>Start Core Examination (55m)</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>

                {/* 3. CALCULUS TEST CARD */}
                <div className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0D1527] to-[#0B0F19] p-6 shadow-2xl relative flex flex-col justify-between hover:border-blue-500/60 transition group">
                  <div className="pointer-events-none absolute top-0 right-0 w-36 h-36 bg-blue-600/10 rounded-full blur-2xl" />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-1 text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                        <Zap size={12} className="text-blue-400" /> NEET Section · JEE Standard
                      </span>
                      <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2.5 py-0.5 text-[10px] font-bold text-blue-300 uppercase">
                        Active Exam
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl font-black text-white group-hover:text-blue-200 transition">
                        {NEET_CALCULUS_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {NEET_CALCULUS_TEST.subtitle}
                      </p>
                    </div>

                    {/* Highlights & Chips */}
                    <div className="grid grid-cols-3 gap-1.5 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">60 Qs</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">144 Mins</strong>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2.5">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">240 Mks</strong>
                      </div>
                    </div>

                    {/* Syllabus summary */}
                    <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-xs text-slate-300 space-y-1">
                      <p className="font-bold text-blue-400 text-[11px]">📐 Calculus Integration:</p>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        Definite Integrals (King's Rule, Leibniz Formula, Fractional Part <code className="text-blue-300">{`{x}`}</code>), Indefinite Integrals (Partial Fractions, Radical Inversions).
                      </p>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="button"
                      onClick={() => onStartTest(NEET_CALCULUS_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-600 hover:bg-blue-500 py-3.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-98"
                    >
                      <span>Start Calculus Exam (144m)</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: JEE 2027 */}
          {selectedStandard === 'jee' && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 px-1 gap-2">
                <span className="font-semibold text-slate-300">
                  Showing 1 Dedicated CBT Mock Test for JEE Main 2027
                </span>
                <span className="text-[11px] text-amber-400 font-mono">
                  Curated from 2021-2025 Official JEE Main PYQs + Advanced Conceptual Drills · 90 Mins (Adjustable)
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* 1. JEE PERIODIC TABLE MASTERY DRILL (60 Qs - 90 MINS) */}
                <div className="rounded-3xl border border-amber-500/60 bg-gradient-to-b from-[#1F160A] via-[#140E06] to-[#0B0F19] p-6 sm:p-7 shadow-2xl relative flex flex-col justify-between hover:border-amber-500/90 transition group ring-1 ring-amber-500/30">
                  <div className="pointer-events-none absolute top-0 right-0 w-48 h-48 bg-amber-600/15 rounded-full blur-3xl" />

                  <div className="space-y-4 relative z-10">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-black text-amber-300 flex items-center gap-1.5">
                        <Target size={14} className="text-amber-400" /> JEE MAIN 2027 · CHEMISTRY
                      </span>
                      <span className="rounded-full bg-amber-500/30 border border-amber-400/50 px-2.5 py-0.5 text-xs font-extrabold text-amber-100 uppercase tracking-wider">
                        ⚡ 60 Qs · 90 Mins (Adjustable)
                      </span>
                    </div>

                    <div>
                      <h3 className="font-sans text-xl sm:text-2xl font-black text-white group-hover:text-amber-200 transition tracking-tight">
                        {JEE_2027_PERIODIC_TEST.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                        {JEE_2027_PERIODIC_TEST.subtitle}
                      </p>
                    </div>

                    {/* Chips */}
                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Questions</span>
                        <strong className="font-mono text-sm text-white font-black">60 Qs</strong>
                        <span className="text-[9px] text-slate-500 block">Single-Subject Drill</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Duration</span>
                        <strong className="font-mono text-sm text-amber-400 font-black">90 Mins</strong>
                        <span className="text-[9px] text-amber-400/80 block font-bold">Adjustable 30m-90m</span>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-[#070A12] p-2">
                        <span className="block text-slate-400 text-[10px] uppercase font-semibold">Max Score</span>
                        <strong className="font-mono text-sm text-emerald-400 font-black">240 Marks</strong>
                        <span className="text-[9px] text-emerald-400/80 block">+4 / -1 Scheme</span>
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-[#070A12] p-3 text-xs text-slate-300">
                      <span className="font-bold text-amber-400 text-xs block mb-1">⚡ Topics Included:</span>
                      <span className="text-[11px] text-slate-300 leading-relaxed">
                        Isoelectronic Radii, Successive IE Jumps, Period 2 &amp; 3 Anomalies (Be-B, N-O, Mg-Al, P-S), Group 13 Contractions, Electron Gain Enthalpies, Slater's Rules (Z_eff), and Oxide Classification.
                      </span>
                    </div>
                  </div>

                  <div className="pt-5 relative z-10">
                    <button
                      type="button"
                      onClick={() => onStartTest(JEE_2027_PERIODIC_TEST.id)}
                      className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 py-3.5 text-xs sm:text-sm font-black text-white shadow-xl shadow-amber-600/30 transition active:scale-98"
                    >
                      <span>Start JEE 2027 Periodic Table Exam (90 Mins)</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Dedicated Section: Strict JEE Rules, Paper Hardness & Expected Percentile Curve */}
              <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#161007] via-[#0E0C07] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
                <div className="pointer-events-none absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-600/10 blur-3xl" />

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-1 text-xs font-black text-amber-300 flex items-center gap-1.5">
                        <Scale size={13} /> Strict NTA Examination Rules
                      </span>
                      <span className="rounded-full bg-orange-500/20 border border-orange-500/40 px-3 py-1 text-xs font-black text-orange-300 flex items-center gap-1.5">
                        <Flame size={13} /> Paper Hardness: Tough Shift
                      </span>
                    </div>
                    <h3 className="font-sans text-xl sm:text-2xl font-black text-white tracking-tight">
                      JEE Main 2027 Normalization &amp; Expected Percentile Architecture
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                      Official NTA evaluation guidelines, negative marking penalty (-1 mark), tie-breaker rules, and calibrated marks-versus-percentile matrix according to paper difficulty.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-center shrink-0">
                    <span className="text-[10px] uppercase font-bold text-amber-400 block">General Cutoff</span>
                    <strong className="font-mono text-base font-black text-white block">~93.2%tile</strong>
                    <span className="text-[9px] text-slate-400">JEE Advanced Qualifier</span>
                  </div>
                </div>

                {/* Grid of 4 Strict Rules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                      <ShieldAlert size={14} /> 1. Strict Marking (+4 / −1)
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      +4 marks awarded for each correct option; −1 mark deducted for every incorrect attempt. Zero marks for unattempted questions. Random guessing drastically hurts NTA percentile.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                      <Scale size={14} /> 2. Shift Normalization
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Percentile is not a raw percentage. Formula: 100 × (Candidates with raw score ≤ Your raw score) ÷ (Total candidates in shift). Reported to 7 decimal places.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                      <Target size={14} /> 3. Official Tie-Breaking
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      When scores tie: Chemistry NTA Score → Physics NTA Score → Mathematics NTA Score → Lower ratio of negative to positive attempts → Older candidate.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-black text-amber-400">
                      <Flame size={14} /> 4. Tough Paper Advantage
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      In this Hard Shift (Advanced Drills + Official PYQs), 99.0%tile begins at just 72–78/120 marks (~165/300 full paper), rewarding conceptual accuracy.
                    </p>
                  </div>
                </div>

                {/* Expected Percentile Matrix Table as per Paper Hardness */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <BarChart3 size={14} className="text-amber-400" />
                      Paper Hardness vs. Expected NTA Percentile &amp; Admission Band
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      Out of ~14,20,000 National Candidates
                    </span>
                  </div>

                  <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#070A12]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/5 text-[11px] font-bold text-slate-300">
                          <th className="p-3">Expected Percentile</th>
                          <th className="p-3 text-amber-400">Tough Shift (This Test / 120)</th>
                          <th className="p-3 text-slate-400">Moderate Shift (120)</th>
                          <th className="p-3 text-slate-500">Easy Shift (120)</th>
                          <th className="p-3">Estimated AIR &amp; Target Colleges</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                        <tr className="hover:bg-white/5 transition">
                          <td className="p-3 font-black text-emerald-400">99.9+ %tile</td>
                          <td className="p-3 font-bold text-amber-300">95–104 Marks</td>
                          <td className="p-3 text-slate-400">105–112 Marks</td>
                          <td className="p-3 text-slate-500">114–120 Marks</td>
                          <td className="p-3 font-sans text-slate-300">
                            <strong>AIR 1 – 650</strong> · NIT Trichy / Surathkal / Warangal CSE · IIIT Hyderabad
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition bg-amber-500/5">
                          <td className="p-3 font-black text-amber-400">99.0+ %tile</td>
                          <td className="p-3 font-bold text-amber-300">72–78 Marks</td>
                          <td className="p-3 text-slate-400">82–88 Marks</td>
                          <td className="p-3 text-slate-500">92–98 Marks</td>
                          <td className="p-3 font-sans text-slate-300">
                            <strong>AIR ~14,000</strong> · Top NITs Computer Science &amp; ECE Cutoff
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition">
                          <td className="p-3 font-black text-blue-400">98.0+ %tile</td>
                          <td className="p-3 font-bold text-amber-300">62–71 Marks</td>
                          <td className="p-3 text-slate-400">72–81 Marks</td>
                          <td className="p-3 text-slate-500">82–91 Marks</td>
                          <td className="p-3 font-sans text-slate-300">
                            <strong>AIR ~28,000</strong> · Top NITs Core Branches (Mechanical, EEE)
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition">
                          <td className="p-3 font-black text-indigo-400">95.0+ %tile</td>
                          <td className="p-3 font-bold text-amber-300">48–60 Marks</td>
                          <td className="p-3 text-slate-400">58–70 Marks</td>
                          <td className="p-3 text-slate-500">68–80 Marks</td>
                          <td className="p-3 font-sans text-slate-300">
                            <strong>AIR ~70,000</strong> · State Engineering Merit &amp; Top IIITs
                          </td>
                        </tr>
                        <tr className="hover:bg-white/5 transition">
                          <td className="p-3 font-black text-rose-400">93.2+ %tile</td>
                          <td className="p-3 font-bold text-amber-300">42–46 Marks</td>
                          <td className="p-3 text-slate-400">50–55 Marks</td>
                          <td className="p-3 text-slate-500">60–65 Marks</td>
                          <td className="p-3 font-sans text-slate-300">
                            <strong>AIR ~96,000</strong> · ⚡ Official JEE Advanced Eligibility Cutoff
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CLASS 10 */}
          {selectedStandard === 'class10' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-[11px] font-bold text-purple-300">
                      Class 10 CBSE / Foundation
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 10: Science Comprehensive Mock 01</h3>
                  <p className="text-xs text-slate-400">
                    Electricity, Magnetic Effects of Electric Current, Light Reflection &amp; Refraction, Carbon and its Compounds.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>50 Questions</span> · <span>90 Mins</span> · <span>200 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-1 text-[11px] font-bold text-purple-300">
                      Class 10 Mathematics Standard
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 10: Mathematics Foundation Drill</h3>
                  <p className="text-xs text-slate-400">
                    Trigonometry, Quadratic Equations, Arithmetic Progressions, Coordinate Geometry.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>40 Questions</span> · <span>75 Mins</span> · <span>160 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CLASS 9 */}
          {selectedStandard === 'class9' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-300">
                      Class 9 Science Foundation
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 9: Physics &amp; Chemistry Drill</h3>
                  <p className="text-xs text-slate-400">
                    Motion, Force and Laws of Motion, Gravitation, Matter in our Surroundings.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>45 Questions</span> · <span>80 Mins</span> · <span>180 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 text-[11px] font-bold text-emerald-300">
                      Class 9 Mathematics Core
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 9: Mathematics Foundation Drill</h3>
                  <p className="text-xs text-slate-400">
                    Number Systems, Polynomials, Lines and Angles, Triangles, Quadrilaterals.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>40 Questions</span> · <span>75 Mins</span> · <span>160 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT: CLASS 8 */}
          {selectedStandard === 'class8' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in">
              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-300">
                      Class 8 Science Junior Foundation
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 8: Science Core Mock</h3>
                  <p className="text-xs text-slate-400">
                    Force and Pressure, Friction, Sound, Chemical Effects of Electric Current, Light.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>40 Questions</span> · <span>60 Mins</span> · <span>160 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-6 shadow-xl flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-1 text-[11px] font-bold text-amber-300">
                      Class 8 Mathematics Junior
                    </span>
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold text-amber-300">
                      Upcoming in future
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">Class 8: Mathematics Drill</h3>
                  <p className="text-xs text-slate-400">
                    Rational Numbers, Linear Equations in One Variable, Understanding Quadrilaterals, Mensuration.
                  </p>
                  <div className="flex items-center gap-3 text-xs text-slate-300 font-mono">
                    <span>35 Questions</span> · <span>60 Mins</span> · <span>140 Marks</span>
                  </div>
                </div>
                <div className="pt-5">
                  <button
                    type="button"
                    onClick={onBrowseTests}
                    className="w-full rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    View in Standard Tests Catalog &rarr;
                  </button>
                </div>
              </div>
            </div>
          )}
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
                    Latest Attempt #{latestAttempt?.attemptNumber || totalAttempts}
                  </span>
                  <span className="text-xs text-slate-400">
                    {formatAttemptDateTime(latestAttempt?.timestamp)}
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
                    {latestAttempt?.testTitle || 'Exam Result'}
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl font-black text-white">
                    {latestAttempt?.score ?? 0}{' '}
                    <span className="text-lg text-slate-500 sm:text-xl font-normal">
                      / {latestAttempt?.maxScore || 240}
                    </span>
                  </h2>
                  <p className="text-sm font-semibold text-slate-300">
                    {latestAttempt?.percentage ?? 0}% Final Score · {formatAcc(latestAttempt?.accuracy)}% Accuracy
                  </p>
                  <p className="text-xs text-slate-500">
                    {latestAttempt?.testTitle || 'NEET 2027 Assessment'}
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
                    onClick={() => onStartTest(latestAttempt.testId || NEET_BIOLOGY_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 text-xs font-semibold text-slate-300 transition"
                  >
                    <RotateCcw size={14} /> Retake This Examination
                  </button>
                </div>
              </div>

              {/* NEET / JEE Score & AIR Projector if latest attempt is eligible */}
              <div className="mt-6 border-t border-white/10 pt-6">
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
                      Track score and accuracy (%) over sequential attempts.
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
                      <th className="px-3.5 py-3">Test Title</th>
                      <th className="px-3.5 py-3">Date &amp; Time</th>
                      <th className="px-3.5 py-3">Score</th>
                      <th className="px-3.5 py-3">Accuracy</th>
                      <th className="px-3.5 py-3">Breakdown</th>
                      <th className="px-3.5 py-3">Time Spent</th>
                      <th className="px-3.5 py-3 text-right rounded-r-xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {allAttempts.map((att, idx) => {
                      const isLatest = idx === 0;
                      const maxScore = att.maxScore || 240;
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
                          <td className="px-3.5 py-3.5 text-slate-300 font-medium">
                            {att.testTitle || 'NEET Standard Mock'}
                          </td>
                          <td className="px-3.5 py-3.5 text-slate-400">
                            {formatAttemptDate(att.timestamp)}
                          </td>
                          <td className="px-3.5 py-3.5 font-bold text-white">
                            <span className="text-sm font-black">{att.score ?? 0}</span>
                            <span className="text-[11px] text-slate-500"> / {maxScore}</span>
                            <span className="ml-1.5 text-[11px] text-blue-400">({att.percentage ?? 0}%)</span>
                          </td>
                          <td className="px-3.5 py-3.5 font-semibold text-emerald-400">
                            {formatAcc(att.accuracy)}%
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
              You haven't completed any practice tests yet. Select any of our authentic full-length mock examinations below to start:
            </p>

            {/* Quick Test Launchers in Empty State */}
            <div className="mx-auto mt-8 max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
              <div className="rounded-2xl border border-teal-500/40 bg-[#070A12] p-5 flex flex-col justify-between space-y-3 hover:border-teal-500/70 transition">
                <div>
                  <span className="rounded-full bg-teal-600/20 border border-teal-500/30 px-2 py-0.5 text-[10px] font-bold text-teal-300">
                    50 Mins · 50 Qs · NEW
                  </span>
                  <h4 className="text-white font-bold text-sm mt-2">NEET Biology Core</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Botany &amp; Human Physiology from 2026 PYQs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_BIOLOGY_TEST.id)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-teal-600 hover:bg-teal-500 py-2.5 text-xs font-bold text-white transition shadow-sm"
                >
                  <span>Launch Biology Exam</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="rounded-2xl border border-emerald-500/40 bg-[#070A12] p-5 flex flex-col justify-between space-y-3 hover:border-emerald-500/70 transition">
                <div>
                  <span className="rounded-full bg-emerald-600/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-300">
                    55 Mins · 55 Questions
                  </span>
                  <h4 className="text-white font-bold text-sm mt-2">NEET 2026 Core Drill</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Physics &amp; Chemistry core mechanics &amp; physical chem.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_2026_CORE_TEST.id)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 py-2.5 text-xs font-bold text-white transition shadow-sm"
                >
                  <span>Launch Core Exam</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              <div className="rounded-2xl border border-blue-500/30 bg-[#070A12] p-5 flex flex-col justify-between space-y-3 hover:border-blue-500/60 transition">
                <div>
                  <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                    144 Mins · 60 Questions
                  </span>
                  <h4 className="text-white font-bold text-sm mt-2">Calculus Mastery Drill</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Definite &amp; Indefinite Integration with KaTeX formulas.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onStartTest(NEET_CALCULUS_TEST.id)}
                  className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white transition shadow-sm"
                >
                  <span>Launch Calculus Exam</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => setLeaderboardModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-blue-500/30 bg-blue-600/10 hover:bg-blue-600/20 px-6 py-3.5 text-xs sm:text-sm font-semibold text-blue-300 transition"
              >
                <Trophy size={15} className="text-amber-400" />
                View Leaderboard &amp; All Candidates ({globalStats?.totalUsers || 1})
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
