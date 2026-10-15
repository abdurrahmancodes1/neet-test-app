import React, { useState } from 'react';
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
  Compass,
  ArrowRight,
  ChevronRight,
  LogOut,
  BarChart3,
  Target,
  Scale,
  Flame,
  ShieldAlert,
  FileCode,
} from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';
import { NEET_CALCULUS_TEST } from '../data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST } from '../data/neet2026CoreTopicsTest.js';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST } from '../data/neetGrandMegaDrillTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST } from '../data/neetMechanicsBondingTest.js';
import { JEE_2027_PERIODIC_TEST } from '../data/jee2027PeriodicTableTest.js';

function PlatformTestCard({ test, isLight, onSelect, isJee = false }) {
  const totalQ = test.totalQuestions || test.questions?.length || 60;
  const duration = test.durationMinutes || 60;
  const totalMarks = test.totalMarks || totalQ * (test.markingScheme?.correct || 4);
  const testKey = test.slug || test.id || test._id;
  const subjectsStr = Array.isArray(test.subjects)
    ? test.subjects.join(' & ')
    : test.subject || 'Comprehensive';

  return (
    <article
      key={testKey}
      className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
        isJee
          ? isLight
            ? 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-amber-300 shadow-amber-900/5 ring-1 ring-amber-200 text-slate-900'
            : 'bg-gradient-to-b from-[#1F160A] via-[#140E06] to-[#0B0F19] border-amber-500/60 ring-1 ring-amber-500/30 text-white'
          : isLight
          ? 'bg-white border-blue-200 shadow-blue-900/5 ring-1 ring-blue-100 text-slate-900'
          : 'bg-gradient-to-b from-[#0A192F] via-[#071324] to-[#0B0F19] border-blue-500/60 shadow-2xl ring-1 ring-blue-500/30 text-white'
      }`}
    >
      <div
        className={`pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl ${
          isJee ? 'bg-amber-600/15' : 'bg-blue-600/10'
        }`}
      />

      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                isJee
                  ? isLight
                    ? 'bg-amber-100 border border-amber-300 text-amber-900'
                    : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                  : isLight
                  ? 'bg-blue-50 border border-blue-200 text-blue-700'
                  : 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
              }`}
            >
              {isJee ? '🎯 JEE MAIN 2027' : '⚡ NEET 2027'} · {subjectsStr.toUpperCase()}
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                isJee
                  ? isLight
                    ? 'bg-amber-200/80 border border-amber-300 text-amber-950'
                    : 'bg-amber-600/20 border border-amber-500/30 text-amber-300'
                  : isLight
                  ? 'bg-blue-100 border border-blue-200 text-blue-800'
                  : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
              }`}
            >
              {totalQ} Questions · {duration} Minutes
            </span>
            <span
              className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                isLight
                  ? 'bg-emerald-100 border border-emerald-300 text-emerald-900'
                  : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
              }`}
            >
              {totalMarks} Marks (+{test.markingScheme?.correct || 4} / {test.markingScheme?.wrong || -1})
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                isLight
                  ? 'bg-purple-100 border border-purple-200 text-purple-900'
                  : 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
              }`}
            >
              Platform Test
            </span>
          </div>

          <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {test.title}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            {test.description || test.subtitle || 'High-yield examination curated with verified equations and SVG vector diagrams.'}
          </p>

          {test.syllabus && (
            <div
              className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                isJee
                  ? isLight
                    ? 'border-amber-200 bg-amber-50/60 text-slate-700'
                    : 'border-white/10 bg-[#070A12] text-slate-300'
                  : isLight
                  ? 'border-slate-200 bg-blue-50/40 text-slate-700'
                  : 'border-white/10 bg-[#070A12] text-slate-300'
              }`}
            >
              <span className={`font-bold ${isJee ? (isLight ? 'text-amber-800' : 'text-amber-400') : (isLight ? 'text-blue-900' : 'text-white')}`}>
                Syllabus Covered:{' '}
              </span>
              {test.syllabus}
            </div>
          )}

          <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                isJee
                  ? isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                  : isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
              }`}
            >
              <Clock size={14} className={isJee ? (isLight ? 'text-amber-700' : 'text-amber-400') : (isLight ? 'text-amber-600' : 'text-amber-400')} />
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>{duration} Minutes</strong>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                isJee
                  ? isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                  : isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
              }`}
            >
              <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>{totalQ} Questions</strong>
            </span>
            <span
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                isJee
                  ? isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                  : isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
              }`}
            >
              <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
              <strong className={isLight ? 'text-slate-900' : 'text-white'}>{totalMarks} Marks</strong> (+{test.markingScheme?.correct || 4} / {test.markingScheme?.wrong || -1} Marking Scheme)
            </span>
          </div>
        </div>

        <div className="shrink-0">
          <button
            type="button"
            onClick={() => onSelect(test.slug || test.id || test._id)}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-bold text-white shadow-xl transition active:scale-95 lg:w-auto ${
              isJee
                ? 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 shadow-amber-600/30'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/30'
            }`}
          >
            Start Examination <ArrowRight size={16} />
          </button>
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
  platformTests = {},
  customTests = {},
}) {
  const { theme, isLight } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('neet'); // 'neet' | 'jee' | 'class10' | 'class9' | 'class8'

  // Combine platform tests from backend and backwards-compatible customTests
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
  ]);

  const uniquePlatformTests = allPlatformTests.filter(
    (t) => !builtInSlugs.has(t.slug) && !builtInSlugs.has(t.id)
  );

  // Group platform tests into their natural exam categories
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

  const totalNeet = 7 + neetImportedTests.length;
  const totalJee = 1 + jeeImportedTests.length;

  const categories = [
    {
      id: 'neet',
      label: 'NEET 2027',
      badge: `${totalNeet} Active Tests`,
      icon: Zap,
    },
    {
      id: 'jee',
      label: 'JEE 2027',
      badge: `${totalJee} Active Test${totalJee > 1 ? 's' : ''}`,
      icon: Target,
    },
    {
      id: 'class10',
      label: 'Class 10',
      badge: class10ImportedTests.length > 0 ? `${class10ImportedTests.length} Active Tests` : 'Upcoming in future',
      icon: GraduationCap,
    },
    {
      id: 'class9',
      label: 'Class 9',
      badge: class9ImportedTests.length > 0 ? `${class9ImportedTests.length} Active Tests` : 'Upcoming in future',
      icon: Layers,
    },
    {
      id: 'class8',
      label: 'Class 8',
      badge: class8ImportedTests.length > 0 ? `${class8ImportedTests.length} Active Tests` : 'Upcoming in future',
      icon: BookOpen,
    },
  ];

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

      <div className="mx-auto max-w-5xl space-y-10 relative z-10 animate-fade-in">
        {/* Floating Pill Navigation Bar */}
        <header
          className={`rounded-full border backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between gap-3 transition-colors ${
            isLight
              ? 'bg-white/95 border-slate-200 text-slate-900 shadow-sm'
              : 'bg-[#0D121F]/90 border-white/10 text-white'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
              <Zap size={15} className="fill-white text-white" />
            </div>
            <span
              className={`truncate font-sans text-sm sm:text-base font-bold tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              NEET<span className="text-blue-500">2027</span>
            </span>
          </div>

          <nav
            className={`hidden md:flex items-center gap-6 text-xs font-semibold ${
              isLight ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {onGoToDashboard && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className={`transition flex items-center gap-1.5 ${
                  isLight ? 'text-slate-600 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                }`}
              >
                <BarChart3 size={14} /> Dashboard
              </button>
            )}
            <span className={`flex items-center gap-1.5 cursor-pointer font-bold ${isLight ? 'text-blue-600' : 'text-white'}`}>
              <Layers size={14} className="text-blue-500" /> Standard Tests
            </span>
            <span className={`text-[11px] font-medium border rounded-full px-2.5 py-0.5 ${
              isLight ? 'border-slate-200 bg-slate-50 text-slate-600' : 'border-white/10 text-slate-400'
            }`}>
              Curriculum Drills
            </span>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">

            {onGoToDashboard && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="rounded-full bg-blue-600 hover:bg-blue-500 text-white px-4 sm:px-5 py-2 text-xs font-semibold shadow-lg shadow-blue-600/30 transition active:scale-95 flex items-center gap-1.5"
              >
                <span>My Dashboard</span>
                <ChevronRight size={14} />
              </button>
            )}
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

        {/* Hero Section */}
        <section className="text-center pt-2 sm:pt-4 max-w-3xl mx-auto space-y-3">
          <p className={`font-serif italic text-2xl sm:text-3xl font-normal ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
            National Standard Practice &amp; Assessment
          </p>
          <h1 className={`font-sans text-3xl sm:text-4xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Target Exam &amp; Standard Catalog
          </h1>
          <p className={`text-sm max-w-xl mx-auto leading-relaxed font-normal ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            Select your target standard below to access dedicated full-length chapter examinations and timed assessments.
          </p>
        </section>

        {/* Section / Category Tabs */}
        <div>
          <p className={`mb-3 text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
            Select Your Target Standard / Exam :
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-start justify-between rounded-2xl border p-4 sm:p-5 text-left transition-all ${
                    isActive
                      ? isLight
                        ? 'border-blue-500 bg-blue-50/70 text-slate-900 shadow-md ring-2 ring-blue-500/20'
                        : 'border-blue-500 bg-gradient-to-b from-[#0D1528] to-[#0B0F19] text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                      : isLight
                        ? 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-xs'
                        : 'border-white/10 bg-[#0B0F19] text-slate-300 hover:border-white/20 hover:bg-[#0D121F]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className={`p-2 rounded-xl ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isLight
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-white/5 text-slate-400'
                    }`}>
                      <Icon size={18} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? cat.id === 'neet'
                            ? isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                            : isLight ? 'bg-blue-100 border border-blue-200 text-blue-800' : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                          : cat.id === 'neet'
                            ? isLight ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : isLight ? 'bg-slate-100 text-slate-600 border border-slate-200' : 'bg-white/5 text-slate-500 border border-white/5'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <span className={`mt-4 font-sans text-base sm:text-lg font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT FOR NEET SECTION */}
        {selectedCategory === 'neet' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isLight ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
                }`}>
                  NEET 2027 · Standard Chapter Examination Series
                </span>
                <h2 className={`mt-2 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  Available High-Yield Mock Examinations
                </h2>
                <p className={`mt-1 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Select a timed examination below to begin your CBT assessment with authentic PYQs and instant solutions.
                </p>
              </div>
              <div className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold ${
                isLight ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              }`}>
                <CheckCircle2 size={16} className={isLight ? 'text-amber-600' : 'text-amber-400'} /> {totalNeet} Tests Available
              </div>
            </div>

            {/* Test Card 0: NEET Round 1 - Mechanics Drill (120 Questions - 2.0 Hours) */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-blue-200 shadow-blue-900/5 ring-1 ring-blue-100'
                : 'bg-gradient-to-b from-[#0A192F] via-[#071324] to-[#0B0F19] border-blue-500/60 shadow-2xl ring-1 ring-blue-500/30'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                    }`}>
                      ⚡ ROUND 1 · PHYSICS MECHANICS
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-blue-100 border border-blue-200 text-blue-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                    }`}>
                      120 Questions · 2 Hours Fixed
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      480 Marks
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_ROUND_1_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {NEET_ROUND_1_TEST.description}
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-blue-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-blue-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_ROUND_1_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Minutes</strong> (Fixed 2 Hours Continuous CBT)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Questions</strong> (45 WEP + 45 COM + 30 Rotational)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>480 Marks</strong> (+4 / −1 Marking Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_ROUND_1_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start Round 1 (120 Mins) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Test Card 0B: NEET Round 2 - Chemistry Bonding & Botany Morphology (120 Questions - 2.0 Hours) */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-emerald-200 shadow-emerald-900/5 ring-1 ring-emerald-100'
                : 'bg-gradient-to-b from-[#0A261D] via-[#071C15] to-[#0B0F19] border-emerald-500/60 shadow-2xl ring-1 ring-emerald-500/30'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                    }`}>
                      🌿 ROUND 2 · CHEMISTRY, BOTANY &amp; DYNAMICS
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-teal-100 border border-teal-200 text-teal-800' : 'bg-teal-600/20 border border-teal-500/30 text-teal-300'
                    }`}>
                      120 Questions · 2 Hours Fixed
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      480 Marks
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_ROUND_2_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    {NEET_ROUND_2_TEST.description}
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-emerald-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-emerald-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_ROUND_2_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Minutes</strong> (Fixed 2 Hours Continuous CBT)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Questions</strong> (45 Chem + 60 Bio + 15 Phys)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>480 Marks</strong> (+4 / −1 Marking Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_ROUND_2_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start Round 2 (120 Mins) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Test Card 1: NEET & JEE Mechanics + Chemical Bonding Drill */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-violet-200 shadow-violet-900/5 ring-1 ring-violet-100'
                : 'bg-gradient-to-b from-[#160E2E] via-[#100A22] to-[#0B0F19] border-violet-500/50 shadow-2xl ring-1 ring-violet-500/30'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-violet-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-violet-50 border border-violet-200 text-violet-800' : 'bg-violet-500/20 border border-violet-500/40 text-violet-300'
                    }`}>
                      ⭐ 120 QUESTIONS MEGA DRILL
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-blue-50 border border-blue-200 text-blue-700' : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                    }`}>
                      NEET &amp; JEE Advanced
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' : 'bg-indigo-500/20 border border-indigo-500/30 text-indigo-300'
                    }`}>
                      Mechanics &amp; Chemical Bonding
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_MECHANICS_BONDING_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    120 curated challenging questions: 60 Physics (Work Energy &amp; Power, Centre of Mass, System of Particles &amp; Rotational Dynamics excluding pure rolling) + 60 Chemistry (Complete Chemical Bonding &amp; Molecular Structure with MOT, VSEPR, Resonating Forms, and Dipole Moments).
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-violet-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-violet-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_MECHANICS_BONDING_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Minutes</strong> (2 Hours Continuous CBT)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>120 Questions</strong> (60 Phys + 60 Chem)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>480 Marks</strong> (+4 / −1 Marking Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_MECHANICS_BONDING_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start 120-Min Examination <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Test Card 2: NEET 2026 & Re-NEET Biology Foundation Drill */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-teal-200 shadow-teal-900/5 ring-1 ring-teal-100'
                : 'bg-gradient-to-b from-[#0B1E1E] via-[#081717] to-[#0B0F19] border-teal-500/40 shadow-2xl ring-1 ring-teal-500/25'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-teal-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      NEW BIOLOGY EXAM
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-teal-100 border border-teal-200 text-teal-800' : 'bg-teal-600/20 border border-teal-500/30 text-teal-300'
                    }`}>
                      NEET 2026 + Re-NEET
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      Botany &amp; Human Physiology
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_BIOLOGY_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    50 curated high-yield questions from official NEET 2026 and Re-NEET 2026 papers. Covers Living World, Biological Classification, Plant Morphology &amp; Anatomy, Cell Structure &amp; Division, Biomolecules, and Core Human Physiology.
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-teal-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-teal-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_BIOLOGY_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-teal-600' : 'text-teal-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>50 Minutes</strong> (1 min/Q NEET Standard)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-teal-600' : 'text-teal-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>50 Questions</strong> (Botany &amp; Zoology)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-teal-600' : 'text-teal-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>200 Marks</strong> (+4 / −1 Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_BIOLOGY_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-teal-600 hover:bg-teal-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-teal-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start 50-Min Examination <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Test Card 2: NEET 2026 & Re-NEET Core Topics Drill */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-emerald-200 shadow-emerald-900/5 ring-1 ring-emerald-100'
                : 'bg-gradient-to-b from-[#0D1E22] via-[#09151A] to-[#0B0F19] border-emerald-500/40 shadow-2xl ring-1 ring-emerald-500/25'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-emerald-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      NEW EXAM
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-blue-100 border border-blue-200 text-blue-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                    }`}>
                      NEET 2026 + Re-NEET
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-purple-100 border border-purple-200 text-purple-800' : 'bg-purple-500/20 border border-purple-500/30 text-purple-300'
                    }`}>
                      Physics &amp; Chemistry Core
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_2026_CORE_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    55 curated high-yield questions from official NEET 2026 and Re-NEET 2026 question papers. Strict NEET timing standard of 1 min/question with complete KaTeX formula rendering.
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-emerald-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-emerald-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_2026_CORE_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>55 Minutes</strong> (1 min/Q NEET Standard)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>55 Questions</strong> (28 Physics + 27 Chem)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>220 Marks</strong> (+4 / −1 Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_2026_CORE_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start 55-Min Examination <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Test Card 2: Calculus Mastery Drill (Definite & Indefinite Integration) */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-xl relative transition ${
              isLight
                ? 'bg-white border-blue-200 shadow-blue-900/5 ring-1 ring-blue-100'
                : 'bg-gradient-to-b from-[#0F172A] via-[#0D1322] to-[#0B0F19] border-blue-500/30 shadow-2xl ring-1 ring-blue-500/20'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      NEW TEST
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-blue-100 border border-blue-200 text-blue-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                    }`}>
                      Calculus Drill
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-rose-100 border border-rose-200 text-rose-800' : 'bg-rose-500/20 border border-rose-500/30 text-rose-300'
                    }`}>
                      Hardest JEE Level
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {NEET_CALCULUS_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    60 of the most challenging Definite &amp; Indefinite Integration questions curated from authentic PYQs. Timed according to JEE standard (2.4 min/question for 60 questions = 144 minutes).
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-slate-200 bg-blue-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-blue-900' : 'text-white'}`}>Syllabus Covered: </span>
                    {NEET_CALCULUS_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>144 Minutes</strong> (2h 24m · 2.4 min/Q)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>60 Questions</strong> (32 Def + 28 Indef)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>240 Marks</strong> (+4 / −1 Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_CALCULUS_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start 144-Min Examination <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Platform-wide Imported NEET Examinations */}
            {neetImportedTests.map((test) => (
              <PlatformTestCard
                key={test.slug || test.id || test._id}
                test={test}
                isLight={isLight}
                onSelect={onSelect}
                isJee={false}
              />
            ))}
          </div>
        )}

        {/* CONTENT FOR JEE SECTION */}
        {selectedCategory === 'jee' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                  isLight ? 'bg-amber-100 border border-amber-300 text-amber-900' : 'bg-amber-500/15 border border-amber-500/30 text-amber-300'
                }`}>
                  JEE Main 2027 · Single Subject Chapter Mastery Series
                </span>
                <h2 className={`mt-2 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  JEE Main Periodic Table &amp; Periodicity CBT Mock
                </h2>
                <p className={`mt-1 text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  Curated directly from 2021-2025 JEE Main Official PYQs and Advanced Top-Rankers Drills with zero duplicate questions.
                </p>
              </div>
              <div className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold ${
                isLight ? 'border-amber-300 bg-amber-50 text-amber-900' : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
              }`}>
                <CheckCircle2 size={16} /> {totalJee} Test{totalJee > 1 ? 's' : ''} Available
              </div>
            </div>

            {/* Test Card: JEE Main 2027 Periodic Properties */}
            <article className={`overflow-hidden rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
              isLight
                ? 'bg-gradient-to-b from-amber-50/70 via-white to-amber-50/40 border-amber-300 shadow-amber-900/5 ring-1 ring-amber-200 text-slate-900'
                : 'bg-gradient-to-b from-[#1F160A] via-[#140E06] to-[#0B0F19] border-amber-500/60 ring-1 ring-amber-500/30'
            }`}>
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-amber-600/20 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-amber-100 border border-amber-300 text-amber-900' : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    }`}>
                      🎯 JEE MAIN 2027 · CHEMISTRY
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-amber-200/80 border border-amber-300 text-amber-950' : 'bg-amber-600/20 border border-amber-500/30 text-amber-300'
                    }`}>
                      60 Questions · 90 Mins (Adjustable)
                    </span>
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                      isLight ? 'bg-emerald-100 border border-emerald-300 text-emerald-900' : 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                    }`}>
                      240 Marks (+4 / -1)
                    </span>
                  </div>

                  <h3 className={`mt-3 font-sans text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    {JEE_2027_PERIODIC_TEST.title}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                    {JEE_2027_PERIODIC_TEST.subtitle}
                  </p>

                  <div className={`mt-5 rounded-2xl border p-4 text-xs leading-relaxed ${
                    isLight ? 'border-amber-200 bg-amber-50/60 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-300'
                  }`}>
                    <span className={`font-bold ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>High-Yield Topics Covered: </span>
                    {JEE_2027_PERIODIC_TEST.syllabus}
                  </div>

                  <div className={`mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                    }`}>
                      <Clock size={14} className={isLight ? 'text-amber-700' : 'text-amber-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>90 Minutes</strong> (Self-Adjustable up to 1 Hr 30 Mins)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                    }`}>
                      <BookOpen size={14} className={isLight ? 'text-blue-600' : 'text-blue-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>60 Questions</strong> (Zero Duplicates · Most Frequent &amp; Expected 2027)
                    </span>
                    <span className={`inline-flex items-center gap-1.5 rounded-xl border px-3.5 py-2 ${
                      isLight ? 'border-amber-200 bg-white' : 'border-white/10 bg-white/5'
                    }`}>
                      <Award size={14} className={isLight ? 'text-emerald-600' : 'text-emerald-400'} />
                      <strong className={isLight ? 'text-slate-900' : 'text-white'}>240 Marks</strong> (+4 / −1 Marking Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(JEE_2027_PERIODIC_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-amber-600/30 transition active:scale-95 lg:w-auto"
                  >
                    Start JEE Exam (90 Mins) <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>

            {/* Platform-wide Imported JEE Examinations */}
            {jeeImportedTests.map((test) => (
              <PlatformTestCard
                key={test.slug || test.id || test._id}
                test={test}
                isLight={isLight}
                onSelect={onSelect}
                isJee={true}
              />
            ))}

            {/* Strict JEE Rules & Paper Hardness Matrix */}
            <div className={`rounded-3xl border p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6 ${
              isLight
                ? 'bg-white border-amber-200/90 shadow-amber-900/5 text-slate-800'
                : 'bg-gradient-to-b from-[#161007] via-[#0E0C07] to-[#0B0F19] border-amber-500/30 text-white'
            }`}>
              <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-5 ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-black flex items-center gap-1.5 ${
                      isLight ? 'bg-amber-100 border border-amber-300 text-amber-900' : 'bg-amber-500/20 border border-amber-500/40 text-amber-300'
                    }`}>
                      <Scale size={13} /> Strict NTA Examination Rules
                    </span>
                    <span className={`rounded-full px-3 py-1 text-xs font-black flex items-center gap-1.5 ${
                      isLight ? 'bg-orange-100 border border-orange-300 text-orange-900' : 'bg-orange-500/20 border border-orange-500/40 text-orange-300'
                    }`}>
                      <Flame size={13} /> Paper Hardness: Tough Shift
                    </span>
                  </div>
                  <h3 className={`font-sans text-xl sm:text-2xl font-black tracking-tight ${isLight ? 'text-slate-900' : 'text-white'}`}>
                    JEE Main 2027 Normalization &amp; Expected Percentile Architecture
                  </h3>
                  <p className={`text-xs leading-relaxed max-w-2xl ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Official NTA evaluation guidelines, negative marking penalty (-1 mark), tie-breaker rules, and calibrated marks-versus-percentile matrix according to paper difficulty.
                  </p>
                </div>
                <div className={`rounded-2xl border px-4 py-3 text-center shrink-0 ${
                  isLight ? 'border-amber-200 bg-amber-50 text-amber-900' : 'border-amber-500/30 bg-amber-500/10'
                }`}>
                  <span className={`text-[10px] uppercase font-bold block ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>General Cutoff</span>
                  <strong className={`font-mono text-base font-black block ${isLight ? 'text-slate-900' : 'text-white'}`}>~93.2%tile</strong>
                  <span className={`text-[9px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>JEE Advanced Qualifier</span>
                </div>
              </div>

              {/* Grid of Strict Rules */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                <div className={`rounded-2xl border p-4 space-y-1.5 ${isLight ? 'border-amber-200/70 bg-amber-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-400'}`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    <ShieldAlert size={14} /> 1. Strict Marking (+4 / −1)
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    +4 marks awarded for each correct option; −1 mark deducted for every incorrect attempt. Zero marks for unattempted questions. Random guessing drastically hurts NTA percentile.
                  </p>
                </div>

                <div className={`rounded-2xl border p-4 space-y-1.5 ${isLight ? 'border-amber-200/70 bg-amber-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-400'}`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    <Scale size={14} /> 2. Shift Normalization
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    Percentile is not a raw percentage. Formula: 100 × (Candidates with raw score ≤ Your raw score) ÷ (Total candidates in shift). Reported to 7 decimal places.
                  </p>
                </div>

                <div className={`rounded-2xl border p-4 space-y-1.5 ${isLight ? 'border-amber-200/70 bg-amber-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-400'}`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    <Target size={14} /> 3. Official Tie-Breaking
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    When scores tie: Chemistry NTA Score → Physics NTA Score → Mathematics NTA Score → Lower ratio of negative to positive attempts → Older candidate.
                  </p>
                </div>

                <div className={`rounded-2xl border p-4 space-y-1.5 ${isLight ? 'border-amber-200/70 bg-amber-50/40 text-slate-700' : 'border-white/10 bg-[#070A12] text-slate-400'}`}>
                  <div className={`flex items-center gap-1.5 text-xs font-black ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
                    <Flame size={14} /> 4. Tough Paper Advantage
                  </div>
                  <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                    In this Hard Shift (Advanced Drills + Official PYQs), 99.0%tile begins at just 72–78/120 marks (~165/300 full paper), rewarding conceptual accuracy.
                  </p>
                </div>
              </div>

              {/* Table */}
              <div className={`overflow-x-auto rounded-2xl border ${
                isLight ? 'border-slate-200 bg-white shadow-xs' : 'border-white/10 bg-[#070A12]'
              }`}>
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b text-[11px] font-bold ${
                      isLight ? 'border-slate-200 bg-slate-100 text-slate-700' : 'border-white/10 bg-white/5 text-slate-300'
                    }`}>
                      <th className="p-3">Expected Percentile</th>
                      <th className={`p-3 ${isLight ? 'text-amber-700' : 'text-amber-400'}`}>Tough Shift (This Test / 120)</th>
                      <th className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Moderate Shift (120)</th>
                      <th className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Easy Shift (120)</th>
                      <th className="p-3">Estimated AIR &amp; Target Colleges</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y font-mono text-[11px] ${isLight ? 'divide-slate-100' : 'divide-white/5'}`}>
                    <tr className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                      <td className={`p-3 font-black ${isLight ? 'text-emerald-600' : 'text-emerald-400'}`}>99.9+ %tile</td>
                      <td className={`p-3 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>95–104 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>105–112 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>114–120 Marks</td>
                      <td className={`p-3 font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <strong>AIR 1 – 650</strong> · NIT Trichy / Surathkal / Warangal CSE · IIIT Hyderabad
                      </td>
                    </tr>
                    <tr className={`transition ${isLight ? 'bg-amber-50/60 hover:bg-amber-100/50' : 'bg-amber-500/5 hover:bg-white/5'}`}>
                      <td className={`p-3 font-black ${isLight ? 'text-amber-600' : 'text-amber-400'}`}>99.0+ %tile</td>
                      <td className={`p-3 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>72–78 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>82–88 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>92–98 Marks</td>
                      <td className={`p-3 font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <strong>AIR ~14,000</strong> · Top NITs Computer Science &amp; ECE Cutoff
                      </td>
                    </tr>
                    <tr className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                      <td className={`p-3 font-black ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>98.0+ %tile</td>
                      <td className={`p-3 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>62–71 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>72–81 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>82–91 Marks</td>
                      <td className={`p-3 font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <strong>AIR ~28,000</strong> · Top NITs Core Branches (Mechanical, EEE)
                      </td>
                    </tr>
                    <tr className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                      <td className={`p-3 font-black ${isLight ? 'text-indigo-600' : 'text-indigo-400'}`}>95.0+ %tile</td>
                      <td className={`p-3 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>48–60 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>58–70 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>68–80 Marks</td>
                      <td className={`p-3 font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <strong>AIR ~70,000</strong> · State Engineering Merit &amp; Top IIITs
                      </td>
                    </tr>
                    <tr className={`transition ${isLight ? 'hover:bg-slate-50' : 'hover:bg-white/5'}`}>
                      <td className={`p-3 font-black ${isLight ? 'text-rose-600' : 'text-rose-400'}`}>93.2+ %tile</td>
                      <td className={`p-3 font-bold ${isLight ? 'text-amber-800' : 'text-amber-300'}`}>42–46 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>50–55 Marks</td>
                      <td className={`p-3 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>60–65 Marks</td>
                      <td className={`p-3 font-sans ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                        <strong>AIR ~96,000</strong> · ⚡ Official JEE Advanced Eligibility Cutoff
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 10 SECTION */}
        {selectedCategory === 'class10' && (
          <div className="animate-fade-in space-y-6">
            {class10ImportedTests.length > 0 && (
              <div className="space-y-6">
                {class10ImportedTests.map((test) => (
                  <PlatformTestCard
                    key={test.slug || test.id || test._id}
                    test={test}
                    isLight={isLight}
                    onSelect={onSelect}
                    isJee={false}
                  />
                ))}
              </div>
            )}
            <div className={`rounded-3xl border p-8 text-center sm:p-12 ${
              isLight ? 'border-slate-200 bg-white text-slate-800 shadow-sm' : 'border-white/10 bg-[#0B0F19] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                isLight ? 'bg-blue-50 border border-blue-200 text-blue-600' : 'bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-glow'
              }`}>
                <GraduationCap size={32} />
              </div>
              <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'bg-blue-50 border border-blue-200 text-blue-800' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Class 10 CBSE &amp; State Boards
              </span>
              <h2 className={`mt-3 font-serif italic text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Full-length Board Exam Mock Tests, Chemistry timed question papers, and Chapter Drills for Class 10 will be available in future releases.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Module 1</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Physics &amp; Light</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Module 2</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Chemistry Drills</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>Module 3</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Life Processes</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 9 SECTION */}
        {selectedCategory === 'class9' && (
          <div className="animate-fade-in space-y-6">
            <div className={`rounded-3xl border p-8 text-center sm:p-12 ${
              isLight ? 'border-slate-200 bg-white text-slate-800 shadow-sm' : 'border-white/10 bg-[#0B0F19] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                <Layers size={32} />
              </div>
              <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Class 9 Foundation
              </span>
              <h2 className={`mt-3 font-serif italic text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Class 9 Foundation Science and Mathematics assessment modules are scheduled for upcoming future updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Physics</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Motion &amp; Force</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Chemistry</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Matter &amp; Atoms</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Biology</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Cell &amp; Tissues</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 8 SECTION */}
        {selectedCategory === 'class8' && (
          <div className="animate-fade-in space-y-6">
            <div className={`rounded-3xl border p-8 text-center sm:p-12 ${
              isLight ? 'border-slate-200 bg-white text-slate-800 shadow-sm' : 'border-white/10 bg-[#0B0F19] text-white shadow-xl'
            }`}>
              <div className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                <BookOpen size={32} />
              </div>
              <span className={`mt-4 inline-block rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
              }`}>
                Class 8 Junior Foundation
              </span>
              <h2 className={`mt-3 font-serif italic text-2xl sm:text-3xl ${isLight ? 'text-slate-900' : 'text-white'}`}>
                Upcoming in Future
              </h2>
              <p className={`mx-auto mt-2 max-w-lg text-sm ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Junior Olympiad and Foundation curriculum for Class 8 students will be launching in the upcoming updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Science</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Force &amp; Pressure</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Science</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Chemical Effects</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
                <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
                  <span className={`text-xs font-bold uppercase ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Math</span>
                  <h4 className={`mt-1 font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>Linear Equations</h4>
                  <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
