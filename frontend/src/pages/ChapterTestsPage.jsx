import React, { useState, useEffect, useMemo } from 'react';
import {
  Clock,
  BookOpen,
  Award,
  Zap,
  CheckCircle2,
  GraduationCap,
  Layers,
  Sparkles,
  Calendar,
  ArrowRight,
  Target,
  Filter,
  Circle,
  RotateCcw,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { getUserAttempts, fetchServerAttempts } from '../utils/auth.js';
import Navbar from '../components/Navbar.jsx';
import GlobalLeaderboardModal from '../components/GlobalLeaderboardModal.jsx';
import { NEET_CALCULUS_TEST } from '../data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST } from '../data/neet2026CoreTopicsTest.js';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST } from '../data/neetGrandMegaDrillTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST } from '../data/neetMechanicsBondingTest.js';
import { JEE_2027_PERIODIC_TEST } from '../data/jee2027PeriodicTableTest.js';
import { JEE_2027_CHEMICAL_BONDING_TEST } from '../data/jee2027ChemicalBondingTest.js';

const KNOWN_RELEASE_TIMESTAMPS = {
  'jee-2027-chemical-bonding-and-molecular-structure': new Date('2026-10-15T18:00:00Z').getTime(),
  'jee-2027-periodic-properties-mastery-drill': new Date('2026-10-10T12:00:00Z').getTime(),
  'neet-2027-grand-mega-cbt-drill': new Date('2026-10-08T10:00:00Z').getTime(),
  'neet-2027-mega-round-2-bonding-morphology': new Date('2026-10-05T10:00:00Z').getTime(),
  'neet-2027-mega-round-1-mechanics': new Date('2026-10-01T10:00:00Z').getTime(),
  'neet-2027-mechanics-bonding-combo-drill': new Date('2026-09-25T10:00:00Z').getTime(),
  'neet-2027-biology-core-drill': new Date('2026-09-20T10:00:00Z').getTime(),
  'neet-2026-core-topics-diagnostic': new Date('2026-09-15T10:00:00Z').getTime(),
  'neet-calculus-physics-foundations': new Date('2026-09-10T10:00:00Z').getTime(),
};

function getTestReleaseTimestamp(test) {
  if (test.releaseDate) {
    const ts = new Date(test.releaseDate).getTime();
    if (!isNaN(ts)) return ts;
  }
  if (test.createdAt) {
    const ts = new Date(test.createdAt).getTime();
    if (!isNaN(ts)) return ts;
  }
  if (test.date) {
    const ts = new Date(test.date).getTime();
    if (!isNaN(ts)) return ts;
  }
  const key = test.slug || test.id || test._id;
  if (key && KNOWN_RELEASE_TIMESTAMPS[key]) {
    return KNOWN_RELEASE_TIMESTAMPS[key];
  }
  return new Date('2026-09-01T00:00:00Z').getTime();
}

function formatReleaseDate(ts) {
  try {
    return new Date(ts).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  } catch {
    return 'Recent';
  }
}

function getAttemptStatsForTest(test, userAttempts = []) {
  const testKey = String(test.slug || test.id || test._id || '').toLowerCase();
  const testTitle = String(test.title || '').toLowerCase().trim();

  const matchingAttempts = userAttempts.filter((a) => {
    const aTestId = String(a.testId || a.testSlug || a.testKey || '').toLowerCase();
    const aTitle = String(a.testTitle || a.title || '').toLowerCase().trim();
    if (testKey && (aTestId === testKey || aTestId.includes(testKey) || testKey.includes(aTestId))) {
      return true;
    }
    if (testTitle && (aTitle === testTitle || aTitle.includes(testTitle) || testTitle.includes(aTitle))) {
      return true;
    }
    return false;
  });

  const hasAttempted = matchingAttempts.length > 0;
  if (!hasAttempted) {
    return {
      hasAttempted: false,
      attemptsCount: 0,
      bestScore: 0,
      bestPercentage: 0,
      latestDate: null,
    };
  }

  let bestScore = -Infinity;
  let bestPercentage = 0;
  const maxScore = test.totalMarks || 240;

  matchingAttempts.forEach((a) => {
    const sc = typeof a.score === 'number' ? a.score : 0;
    if (sc > bestScore) {
      bestScore = sc;
      bestPercentage = a.percentage ?? (maxScore > 0 ? Math.round((sc / maxScore) * 100) : 0);
    }
  });

  return {
    hasAttempted: true,
    attemptsCount: matchingAttempts.length,
    bestScore: bestScore === -Infinity ? 0 : bestScore,
    bestPercentage,
    latestDate: matchingAttempts[matchingAttempts.length - 1]?.submittedAt || null,
  };
}

function PlatformTestCard({
  test,
  isLight,
  onSelect,
  isJee = false,
  attemptStats = { hasAttempted: false, attemptsCount: 0, bestScore: 0, bestPercentage: 0 },
  releaseDateFormatted = 'Recent',
}) {
  const totalQ = test.totalQuestions || test.questions?.length || 60;
  const duration = test.durationMinutes || 60;
  const totalMarks = test.totalMarks || totalQ * (test.markingScheme?.correct || 4);
  const testKey = test.slug || test.id || test._id;
  const subjectsStr = Array.isArray(test.subjects)
    ? test.subjects.join(' & ')
    : test.subject || (isJee ? 'Chemistry' : 'Comprehensive');

  return (
    <article
      key={testKey}
      className={`overflow-hidden rounded-2xl border p-5 sm:p-7 relative transition font-mono ${
        isJee
          ? isLight
            ? 'bg-white border-amber-300 shadow-sm text-slate-900'
            : 'bg-[#080D1A] border-amber-500/40 shadow-md text-white'
          : isLight
          ? 'bg-white border-slate-300 shadow-sm text-slate-900'
          : 'bg-[#080D1A] border-blue-900/50 shadow-md text-white'
      }`}
    >
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center relative z-10">
        <div className="max-w-2xl space-y-3">
          {/* Top Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider ${
                isJee
                  ? isLight
                    ? 'bg-amber-100 border border-amber-300 text-amber-900'
                    : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : isLight
                  ? 'bg-blue-100 border border-blue-300 text-blue-900'
                  : 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
              }`}
            >
              {isJee ? '🎯 JEE MAIN 2027' : '⚡ NEET 2027'} · {subjectsStr.toUpperCase()}
            </span>

            {/* Release Date Badge */}
            <span
              className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] sm:text-xs font-mono font-semibold ${
                isLight ? 'bg-slate-100 border border-slate-300 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}
            >
              <Calendar size={11} className={isLight ? 'text-slate-600' : 'text-slate-400'} />
              <span>REL: {releaseDateFormatted}</span>
            </span>

            {/* Attempt Status Badge */}
            {attemptStats.hasAttempted ? (
              <span
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] sm:text-xs font-mono font-bold ${
                  isLight
                    ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                    : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                }`}
              >
                <CheckCircle2 size={11} className="text-emerald-500" />
                <span>ATTEMPTED ({attemptStats.attemptsCount}) · BEST: {attemptStats.bestScore}/{totalMarks} ({attemptStats.bestPercentage}%)</span>
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-1 rounded px-2 py-0.5 text-[10px] sm:text-xs font-mono font-semibold ${
                  isLight
                    ? 'bg-slate-100 border border-slate-300 text-slate-600'
                    : 'bg-white/5 border border-white/10 text-slate-400'
                }`}
              >
                <Circle size={10} className="text-slate-400" />
                <span>UNATTEMPTED</span>
              </span>
            )}
          </div>

          <div>
            <h3 className={`font-mono text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-slate-100'}`}>
              {test.title}
            </h3>
            <p className={`mt-1 font-mono text-xs sm:text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              {test.description || test.subtitle || 'Standardized CBT examination curated with verified equations and KaTeX step-by-step solutions.'}
            </p>
          </div>

          {test.syllabus && (
            <div
              className={`rounded-lg border p-3 font-mono text-xs leading-relaxed ${
                isJee
                  ? isLight
                    ? 'border-amber-200 bg-amber-50/60 text-slate-700'
                    : 'border-amber-500/20 bg-[#070A14] text-slate-300'
                  : isLight
                  ? 'border-slate-300 bg-slate-50 text-slate-700'
                  : 'border-blue-900/30 bg-[#070A14] text-slate-300'
              }`}
            >
              <span className={`font-bold uppercase tracking-wider text-[11px] block mb-0.5 ${isJee ? (isLight ? 'text-amber-800' : 'text-amber-400') : (isLight ? 'text-blue-900' : 'text-blue-400')}`}>
                [SYLLABUS COVERED]:
              </span>
              {test.syllabus}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 font-mono text-xs font-semibold">
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                isLight ? 'border-slate-300 bg-slate-50 text-slate-800' : 'border-blue-900/40 bg-[#070A14] text-slate-200'
              }`}
            >
              <Clock size={13} className={isJee ? 'text-amber-400' : 'text-blue-400'} />
              <strong>{duration} Mins</strong>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                isLight ? 'border-slate-300 bg-slate-50 text-slate-800' : 'border-blue-900/40 bg-[#070A14] text-slate-200'
              }`}
            >
              <BookOpen size={13} className={isJee ? 'text-amber-400' : 'text-blue-400'} />
              <strong>{totalQ} Questions</strong>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 ${
                isLight ? 'border-slate-300 bg-slate-50 text-slate-800' : 'border-blue-900/40 bg-[#070A14] text-slate-200'
              }`}
            >
              <Award size={13} className="text-emerald-400" />
              <strong>{totalMarks} Marks</strong> (+{test.markingScheme?.correct || 4} / {test.markingScheme?.wrong || -1})
            </span>
          </div>
        </div>

        <div className="shrink-0 flex flex-col items-stretch lg:items-end gap-2">
          <button
            type="button"
            onClick={() => onSelect(test.slug || test.id || test._id)}
            className={`flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-md transition active:scale-95 ${
              isJee
                ? 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
            }`}
          >
            {attemptStats.hasAttempted ? (
              <>
                <RotateCcw size={14} />
                <span>Retake Examination</span>
              </>
            ) : (
              <>
                <span>Start Examination</span>
                <ArrowRight size={14} />
              </>
            )}
          </button>
          {attemptStats.hasAttempted && (
            <span className="text-[10px] font-mono text-center lg:text-right text-slate-400">
              Last Attempt: {attemptStats.latestDate ? formatReleaseDate(attemptStats.latestDate) : 'Recorded'}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function ChapterTestsPage({
  onSelect,
  onLogout,
  user,
  onGoToDashboard,
  onGoToAdmin,
  onUserUpdated,
  platformTests = {},
  customTests = {},
}) {
  const { theme, isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('neet'); // 'neet' | 'jee' | 'class10' | 'class9' | 'class8'
  const [attemptFilter, setAttemptFilter] = useState('all'); // 'all' | 'attempted' | 'unattempted'
  const [leaderboardModalOpen, setLeaderboardModalOpen] = useState(false);
  const [userAttempts, setUserAttempts] = useState(() => getUserAttempts(user?.email || 'guest'));

  // Sync attempts from server on mount
  useEffect(() => {
    if (user?.email) {
      fetchServerAttempts(user.email).then((attempts) => {
        if (attempts && Array.isArray(attempts)) {
          setUserAttempts(attempts);
        }
      }).catch(() => {});
    }
  }, [user?.email]);

  const handleNav = (screen) => {
    if (screen === 'dashboard') {
      if (onGoToDashboard) onGoToDashboard();
    } else if (screen === 'admin') {
      if (onGoToAdmin) onGoToAdmin();
    }
  };

  // Combine platform tests from backend and customTests
  const allPlatformTests = Object.values({ ...platformTests, ...customTests });

  // Filter out any built-in duplicate test slugs to avoid double-rendering
  const builtInSlugs = new Set([
    NEET_ROUND_1_TEST.id,
    NEET_ROUND_2_TEST.id,
    NEET_GRAND_MEGA_TEST.id,
    NEET_MECHANICS_BONDING_TEST.id,
    NEET_BIOLOGY_TEST.id,
    NEET_2026_CORE_TEST.id,
    NEET_CALCULUS_TEST.id,
    JEE_2027_PERIODIC_TEST.id,
    JEE_2027_CHEMICAL_BONDING_TEST.id,
  ]);

  const uniquePlatformTests = allPlatformTests.filter(
    (t) => !builtInSlugs.has(t.slug) && !builtInSlugs.has(t.id)
  );

  // Group platform tests into exam categories
  const neetImportedTests = uniquePlatformTests.filter((t) => {
    const cat = (t.category || '').toLowerCase();
    const exam = (t.examType || '').toUpperCase();
    const sub = Array.isArray(t.subjects) ? t.subjects.join(' ').toLowerCase() : '';
    if (cat === 'jee' || exam.includes('JEE') || (sub.includes('math') && !sub.includes('bio'))) {
      return false;
    }
    if (cat.includes('class') || exam === 'FOUNDATION') {
      return false;
    }
    return true;
  });

  const jeeImportedTests = uniquePlatformTests.filter((t) => {
    const cat = (t.category || '').toLowerCase();
    const exam = (t.examType || '').toUpperCase();
    const sub = Array.isArray(t.subjects) ? t.subjects.join(' ').toLowerCase() : '';
    return cat === 'jee' || exam.includes('JEE') || sub.includes('math');
  });

  const class10ImportedTests = uniquePlatformTests.filter((t) => {
    const cat = (t.category || '').toLowerCase();
    return cat === 'class10' || cat.includes('10');
  });

  const class9ImportedTests = uniquePlatformTests.filter((t) => {
    const cat = (t.category || '').toLowerCase();
    return cat === 'class9' || cat.includes('9');
  });

  const class8ImportedTests = uniquePlatformTests.filter((t) => {
    const cat = (t.category || '').toLowerCase();
    return cat === 'class8' || cat.includes('8');
  });

  // Built-in sets
  const builtinNeet = [
    NEET_ROUND_1_TEST,
    NEET_ROUND_2_TEST,
    NEET_GRAND_MEGA_TEST,
    NEET_MECHANICS_BONDING_TEST,
    NEET_BIOLOGY_TEST,
    NEET_2026_CORE_TEST,
    NEET_CALCULUS_TEST,
  ];

  const builtinJee = [
    JEE_2027_CHEMICAL_BONDING_TEST,
    JEE_2027_PERIODIC_TEST,
  ];

  // Complete lists sorted by release date descending (newest first)
  const allNeetTests = useMemo(() => {
    return [...builtinNeet, ...neetImportedTests].sort(
      (a, b) => getTestReleaseTimestamp(b) - getTestReleaseTimestamp(a)
    );
  }, [neetImportedTests]);

  const allJeeTests = useMemo(() => {
    return [...builtinJee, ...jeeImportedTests].sort(
      (a, b) => getTestReleaseTimestamp(b) - getTestReleaseTimestamp(a)
    );
  }, [jeeImportedTests]);

  const totalNeet = allNeetTests.length;
  const totalJee = allJeeTests.length;
  const totalClass10 = class10ImportedTests.length;
  const totalClass9 = class9ImportedTests.length;
  const totalClass8 = class8ImportedTests.length;

  const categories = [
    {
      id: 'neet',
      label: 'NEET 2027',
      badge: `${totalNeet} Active Tests`,
      isActiveExam: true,
      icon: Zap,
    },
    {
      id: 'jee',
      label: 'JEE 2027',
      badge: `${totalJee} Active Test${totalJee > 1 ? 's' : ''}`,
      isActiveExam: true,
      icon: Target,
    },
    {
      id: 'class10',
      label: 'Class 10',
      badge: totalClass10 > 0 ? `${totalClass10} Active Tests` : 'Upcoming',
      isActiveExam: totalClass10 > 0,
      icon: GraduationCap,
    },
    {
      id: 'class9',
      label: 'Class 9',
      badge: totalClass9 > 0 ? `${totalClass9} Active Tests` : 'Upcoming',
      isActiveExam: totalClass9 > 0,
      icon: Layers,
    },
    {
      id: 'class8',
      label: 'Class 8',
      badge: totalClass8 > 0 ? `${totalClass8} Active Tests` : 'Upcoming',
      isActiveExam: totalClass8 > 0,
      icon: BookOpen,
    },
  ];

  // Compute tests for active category with attempt filtering
  const activeList = selectedCategory === 'neet' ? allNeetTests : selectedCategory === 'jee' ? allJeeTests : [];

  const filterStats = useMemo(() => {
    let attempted = 0;
    let unattempted = 0;
    activeList.forEach((t) => {
      const stats = getAttemptStatsForTest(t, userAttempts);
      if (stats.hasAttempted) attempted++;
      else unattempted++;
    });
    return { attempted, unattempted };
  }, [activeList, userAttempts]);

  const filteredTests = useMemo(() => {
    if (attemptFilter === 'all') return activeList;
    return activeList.filter((t) => {
      const stats = getAttemptStatsForTest(t, userAttempts);
      if (attemptFilter === 'attempted') return stats.hasAttempted;
      if (attemptFilter === 'unattempted') return !stats.hasAttempted;
      return true;
    });
  }, [activeList, attemptFilter, userAttempts]);

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

      <div className="mx-auto max-w-5xl space-y-6 relative z-10 animate-fade-in">
        {/* Unified Navigation Bar */}
        <Navbar
          currentScreen="tests"
          user={user}
          onNavigate={handleNav}
          onOpenLeaderboard={() => setLeaderboardModalOpen(true)}
          onLogout={onLogout}
          onUserUpdated={onUserUpdated}
        />

        {/* Streamlined Catalog Section Header */}
        <section
          className={`rounded-2xl border p-5 sm:p-6 shadow-md relative overflow-hidden transition font-mono ${
            isLight
              ? 'bg-white border-slate-300 text-slate-900'
              : 'bg-[#080D1A] border-blue-900/50 text-white'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
                  [STANDARDIZED EXAMINATION CATALOG]
                </span>
              </div>
              <h1 className={`font-mono text-2xl sm:text-3xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Target Exams &amp; Mock Tests
              </h1>
              <p className={`text-xs sm:text-sm font-mono ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select an exam standard below to launch full-length timed CBT drills with instant KaTeX step-by-step solutions.
              </p>
            </div>
            <div className="shrink-0">
              <span className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-mono font-bold border ${
                isLight ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-blue-500/15 border-blue-500/30 text-blue-300'
              }`}>
                <CheckCircle2 size={13} className={isLight ? 'text-blue-700' : 'text-blue-400'} />
                <span>{totalNeet + totalJee + totalClass10 + totalClass9 + totalClass8} Published Tests</span>
              </span>
            </div>
          </div>
        </section>

        {/* 5-Column Category Tabs */}
        <div>
          <p className={`mb-2.5 text-[11px] font-mono font-bold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Select Exam Standard:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 font-mono">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              const isAvailable = cat.isActiveExam;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setAttemptFilter('all');
                  }}
                  className={`flex flex-col items-start justify-between rounded-xl border p-3.5 text-left transition-all ${
                    isActive
                      ? isLight
                        ? 'border-blue-600 bg-blue-50/80 text-slate-900 shadow-sm ring-1 ring-blue-500'
                        : 'border-blue-500 bg-[#0C1427] text-white shadow-md ring-1 ring-blue-500/50'
                      : isAvailable
                      ? isLight
                        ? 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-50'
                        : 'border-blue-900/30 bg-[#080D1A] text-slate-300 hover:border-blue-800 hover:bg-[#0B1224]'
                      : isLight
                      ? 'border-slate-200 bg-slate-50 text-slate-400'
                      : 'border-white/5 bg-[#080D1A]/60 text-slate-600'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-1.5">
                    <div className={`p-1.5 rounded ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isAvailable
                        ? isLight ? 'bg-slate-100 text-slate-600' : 'bg-white/5 text-slate-400'
                        : isLight ? 'bg-slate-200/50 text-slate-400' : 'bg-white/5 text-slate-600'
                    }`}>
                      <Icon size={15} />
                    </div>
                    <span
                      className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                        isActive
                          ? isLight ? 'bg-blue-200 text-blue-900' : 'bg-blue-500/30 text-blue-200'
                          : isAvailable
                          ? isLight ? 'bg-slate-100 text-slate-700 border border-slate-200' : 'bg-white/5 text-slate-400 border border-white/10'
                          : isLight ? 'bg-slate-100 text-slate-400' : 'bg-white/5 text-slate-600'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <span className={`mt-2.5 font-mono text-xs sm:text-sm font-bold ${
                    isActive ? (isLight ? 'text-slate-900' : 'text-white') : isAvailable ? (isLight ? 'text-slate-800' : 'text-slate-200') : (isLight ? 'text-slate-400' : 'text-slate-500')
                  }`}>
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FILTER & SORTING TOOLBAR (NEET & JEE) */}
        {(selectedCategory === 'neet' || selectedCategory === 'jee') && (
          <div
            className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border p-3 font-mono transition ${
              isLight ? 'bg-white border-slate-300' : 'bg-[#080D1A] border-blue-900/40'
            }`}
          >
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`text-[11px] font-bold uppercase tracking-wider mr-1.5 flex items-center gap-1 ${
                isLight ? 'text-slate-600' : 'text-slate-400'
              }`}>
                <Filter size={12} />
                <span>Filter:</span>
              </span>

              <button
                type="button"
                onClick={() => setAttemptFilter('all')}
                className={`rounded px-2.5 py-1 text-xs font-mono font-bold transition ${
                  attemptFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                ALL ({activeList.length})
              </button>

              <button
                type="button"
                onClick={() => setAttemptFilter('attempted')}
                className={`rounded px-2.5 py-1 text-xs font-mono font-bold transition ${
                  attemptFilter === 'attempted'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                ATTEMPTED ({filterStats.attempted})
              </button>

              <button
                type="button"
                onClick={() => setAttemptFilter('unattempted')}
                className={`rounded px-2.5 py-1 text-xs font-mono font-bold transition ${
                  attemptFilter === 'unattempted'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300'
                }`}
              >
                NOT ATTEMPTED ({filterStats.unattempted})
              </button>
            </div>

            <div className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-mono font-semibold ${
              isLight ? 'text-slate-600' : 'text-blue-400'
            }`}>
              <Calendar size={12} />
              <span>ORDER: RELEASE DATE (NEWEST FIRST)</span>
            </div>
          </div>
        )}

        {/* CONTENT FOR NEET SECTION */}
        {selectedCategory === 'neet' && (
          <div className="animate-fade-in space-y-4">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <PlatformTestCard
                  key={test.slug || test.id || test._id}
                  test={test}
                  isLight={isLight}
                  onSelect={onSelect}
                  isJee={false}
                  attemptStats={getAttemptStatsForTest(test, userAttempts)}
                  releaseDateFormatted={formatReleaseDate(getTestReleaseTimestamp(test))}
                />
              ))
            ) : (
              <div className={`rounded-xl border p-8 text-center font-mono ${
                isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-[#080D1A] border-blue-900/40 text-slate-400'
              }`}>
                <p className="text-sm font-bold uppercase tracking-wider">No tests match the current filter.</p>
                <button
                  type="button"
                  onClick={() => setAttemptFilter('all')}
                  className="mt-3 rounded px-4 py-2 bg-blue-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  View All Tests
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTENT FOR JEE SECTION */}
        {selectedCategory === 'jee' && (
          <div className="animate-fade-in space-y-4">
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <PlatformTestCard
                  key={test.slug || test.id || test._id}
                  test={test}
                  isLight={isLight}
                  onSelect={onSelect}
                  isJee={true}
                  attemptStats={getAttemptStatsForTest(test, userAttempts)}
                  releaseDateFormatted={formatReleaseDate(getTestReleaseTimestamp(test))}
                />
              ))
            ) : (
              <div className={`rounded-xl border p-8 text-center font-mono ${
                isLight ? 'bg-white border-slate-300 text-slate-600' : 'bg-[#080D1A] border-amber-500/30 text-slate-400'
              }`}>
                <p className="text-sm font-bold uppercase tracking-wider">No tests match the current filter.</p>
                <button
                  type="button"
                  onClick={() => setAttemptFilter('all')}
                  className="mt-3 rounded px-4 py-2 bg-amber-600 text-white text-xs font-bold uppercase tracking-wider"
                >
                  View All Tests
                </button>
              </div>
            )}
          </div>
        )}

        {/* CONTENT FOR CLASS 10 SECTION */}
        {selectedCategory === 'class10' && (
          <div className="animate-fade-in space-y-6">
            {class10ImportedTests.length > 0 && (
              <div className="space-y-4">
                {class10ImportedTests.map((test) => (
                  <PlatformTestCard
                    key={test.slug || test.id || test._id}
                    test={test}
                    isLight={isLight}
                    onSelect={onSelect}
                    isJee={false}
                    attemptStats={getAttemptStatsForTest(test, userAttempts)}
                    releaseDateFormatted={formatReleaseDate(getTestReleaseTimestamp(test))}
                  />
                ))}
              </div>
            )}
            <div className={`rounded-2xl border p-8 text-center sm:p-12 font-mono ${
              isLight ? 'border-slate-300 bg-white text-slate-800 shadow-sm' : 'border-blue-900/40 bg-[#080D1A] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${
                isLight ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-blue-600/20 border border-blue-500/30 text-blue-400'
              }`}>
                <GraduationCap size={28} />
              </div>
              <span className={`mt-4 inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isLight ? 'bg-blue-100 border border-blue-300 text-blue-900' : 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
              }`}>
                Class 10 CBSE &amp; State Boards
              </span>
              <h2 className={`mt-3 font-mono font-bold text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Full-length Board Exam Mock Tests, Chemistry timed question papers, and Chapter Drills for Class 10 will be available in future releases.
              </p>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 9 SECTION */}
        {selectedCategory === 'class9' && (
          <div className="animate-fade-in space-y-6">
            <div className={`rounded-2xl border p-8 text-center sm:p-12 font-mono ${
              isLight ? 'border-slate-300 bg-white text-slate-800 shadow-sm' : 'border-blue-900/40 bg-[#080D1A] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                <Layers size={28} />
              </div>
              <span className={`mt-4 inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isLight ? 'bg-slate-100 border border-slate-300 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Class 9 Foundation
              </span>
              <h2 className={`mt-3 font-mono font-bold text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Class 9 Foundation Science and Mathematics assessment modules are scheduled for upcoming future updates.
              </p>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 8 SECTION */}
        {selectedCategory === 'class8' && (
          <div className="animate-fade-in space-y-6">
            <div className={`rounded-2xl border p-8 text-center sm:p-12 font-mono ${
              isLight ? 'border-slate-300 bg-white text-slate-800 shadow-sm' : 'border-blue-900/40 bg-[#080D1A] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-xl ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                <BookOpen size={28} />
              </div>
              <span className={`mt-4 inline-block rounded px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isLight ? 'bg-slate-100 border border-slate-300 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Class 8 Junior Foundation
              </span>
              <h2 className={`mt-3 font-mono font-bold text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-xs sm:text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Junior Olympiad and Foundation curriculum for Class 8 students will be launching in the upcoming updates.
              </p>
            </div>
          </div>
        )}

        {/* Global Leaderboard Modal */}
        <GlobalLeaderboardModal
          open={leaderboardModalOpen}
          onClose={() => setLeaderboardModalOpen(false)}
          currentUserEmail={user?.email}
          isAdmin={user?.role === 'admin'}
        />
      </div>
    </main>
  );
}
