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
  Sun,
  Moon,
} from 'lucide-react';
import { NEET_CALCULUS_TEST } from '../data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST } from '../data/neet2026CoreTopicsTest.js';
import { NEET_ROUND_1_TEST } from '../data/neetMegaRound1MechanicsTest.js';
import { NEET_ROUND_2_TEST } from '../data/neetMegaRound2BondingMorphologyTest.js';
import { NEET_GRAND_MEGA_TEST } from '../data/neetGrandMegaDrillTest.js';
import { NEET_BIOLOGY_TEST } from '../data/neetBiologyCoreTest.js';
import { NEET_MECHANICS_BONDING_TEST } from '../data/neetMechanicsBondingTest.js';
import { JEE_2027_PERIODIC_TEST } from '../data/jee2027PeriodicTableTest.js';

export default function ChapterTestsPage({ onSelect, onLogout, user, onGoToDashboard }) {
  const [selectedCategory, setSelectedCategory] = useState('neet'); // 'neet' | 'jee' | 'class10' | 'class9' | 'class8'

  // Unified Theme state: 'dark' (default) or 'light'
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

  const categories = [
    { id: 'neet', label: 'NEET 2027', badge: 'Active Test Series', icon: Zap },
    { id: 'jee', label: 'JEE 2027', badge: 'Active Test Series', icon: Target },
    { id: 'class10', label: 'Class 10', badge: 'Upcoming in future', icon: GraduationCap },
    { id: 'class9', label: 'Class 9', badge: 'Upcoming in future', icon: Layers },
    { id: 'class8', label: 'Class 8', badge: 'Upcoming in future', icon: BookOpen },
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
                className="hover:text-blue-600 dark:hover:text-white transition flex items-center gap-1.5"
              >
                <BarChart3 size={14} /> Dashboard
              </button>
            )}
            <span className="text-blue-600 dark:text-white flex items-center gap-1.5 cursor-pointer">
              <Layers size={14} className="text-blue-500" /> Standard Tests
            </span>
            <span className="text-slate-400 text-[11px] font-medium border border-slate-300 dark:border-white/10 rounded-full px-2.5 py-0.5">
              Curriculum Drills
            </span>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Theme Switcher */}
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
          <p className="font-serif italic text-2xl sm:text-3xl text-slate-300 font-normal">
            National Standard Practice &amp; Assessment
          </p>
          <h1 className="font-sans text-3xl sm:text-4xl font-black tracking-tight text-white">
            Target Exam &amp; Standard Catalog
          </h1>
          <p className="text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-normal">
            Select your target standard below to access dedicated full-length chapter examinations and timed assessments.
          </p>
        </section>

        {/* Section / Category Tabs */}
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
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
                      ? 'border-blue-500 bg-gradient-to-b from-[#0D1528] to-[#0B0F19] text-white shadow-lg shadow-blue-500/10 ring-1 ring-blue-500'
                      : 'border-white/10 bg-[#0B0F19] text-slate-300 hover:border-white/20 hover:bg-[#0D121F]'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className={`p-2 rounded-xl ${isActive ? 'bg-blue-600/20 text-blue-400' : 'bg-white/5 text-slate-400'}`}>
                      <Icon size={18} />
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? cat.id === 'neet'
                            ? 'bg-emerald-500/20 border border-emerald-500/30 text-emerald-300'
                            : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
                          : cat.id === 'neet'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-white/5 text-slate-500 border border-white/5'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <span className="mt-4 font-sans text-base sm:text-lg font-bold">{cat.label}</span>
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
                <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  NEET 2027 · Standard Chapter Examination Series
                </span>
                <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-black text-white">
                  Available High-Yield Mock Examinations
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Select a timed examination below to begin your CBT assessment with authentic PYQs and instant solutions.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <CheckCircle2 size={16} /> 6 Tests Available
              </div>
            </div>

            {/* Test Card 0: NEET Round 1 - Mechanics Drill (120 Questions - 2.0 Hours) */}
            <article className="overflow-hidden rounded-3xl border border-blue-500/60 bg-gradient-to-b from-[#0A192F] via-[#071324] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-blue-500/30">
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-500/20 border border-blue-500/40 px-3 py-0.5 text-xs font-bold text-blue-300">
                      ⚡ ROUND 1 · PHYSICS MECHANICS
                    </span>
                    <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
                      120 Questions · 2 Hours Fixed
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      480 Marks
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_ROUND_1_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {NEET_ROUND_1_TEST.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_ROUND_1_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-amber-400" />
                      <strong className="text-white">120 Minutes</strong> (Fixed 2 Hours Continuous CBT)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">120 Questions</strong> (45 WEP + 45 COM + 30 Rotational)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-emerald-400" />
                      <strong className="text-white">480 Marks</strong> (+4 / −1 Marking Scheme)
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
            <article className="overflow-hidden rounded-3xl border border-emerald-500/60 bg-gradient-to-b from-[#0A261D] via-[#071C15] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-emerald-500/30">
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-emerald-600/20 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/40 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      🌿 ROUND 2 · CHEMISTRY, BOTANY &amp; DYNAMICS
                    </span>
                    <span className="rounded-full bg-teal-600/20 border border-teal-500/30 px-3 py-0.5 text-xs font-bold text-teal-300">
                      120 Questions · 2 Hours Fixed
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      480 Marks
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_ROUND_2_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    {NEET_ROUND_2_TEST.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_ROUND_2_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-amber-400" />
                      <strong className="text-white">120 Minutes</strong> (Fixed 2 Hours Continuous CBT)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">120 Questions</strong> (45 Chem + 60 Bio + 15 Phys)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-emerald-400" />
                      <strong className="text-white">480 Marks</strong> (+4 / −1 Marking Scheme)
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
            <article className="overflow-hidden rounded-3xl border border-violet-500/50 bg-gradient-to-b from-[#160E2E] via-[#100A22] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-violet-500/30">
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-violet-500/20 border border-violet-500/40 px-3 py-0.5 text-xs font-bold text-violet-300">
                      ⭐ 120 QUESTIONS MEGA DRILL
                    </span>
                    <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
                      NEET &amp; JEE Advanced
                    </span>
                    <span className="rounded-full bg-indigo-500/20 border border-indigo-500/30 px-3 py-0.5 text-xs font-bold text-indigo-300">
                      Mechanics &amp; Chemical Bonding
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_MECHANICS_BONDING_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    120 curated challenging questions: 60 Physics (Work Energy &amp; Power, Centre of Mass, System of Particles &amp; Rotational Dynamics excluding pure rolling) + 60 Chemistry (Complete Chemical Bonding &amp; Molecular Structure with MOT, VSEPR, Resonating Forms, and Dipole Moments).
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_MECHANICS_BONDING_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-amber-400" />
                      <strong className="text-white">120 Minutes</strong> (2 Hours Continuous CBT)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">120 Questions</strong> (60 Phys + 60 Chem)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-emerald-400" />
                      <strong className="text-white">480 Marks</strong> (+4 / −1 Marking Scheme)
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
            <article className="overflow-hidden rounded-3xl border border-teal-500/40 bg-gradient-to-b from-[#0B1E1E] via-[#081717] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-teal-500/25">
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-teal-600/15 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      NEW BIOLOGY EXAM
                    </span>
                    <span className="rounded-full bg-teal-600/20 border border-teal-500/30 px-3 py-0.5 text-xs font-bold text-teal-300">
                      NEET 2026 + Re-NEET
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      Botany &amp; Human Physiology
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_BIOLOGY_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    50 curated high-yield questions from official NEET 2026 and Re-NEET 2026 papers. Covers Living World, Biological Classification, Plant Morphology &amp; Anatomy, Cell Structure &amp; Division, Biomolecules, and Core Human Physiology.
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_BIOLOGY_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-teal-400" />
                      <strong className="text-white">50 Minutes</strong> (1 min/Q NEET Standard)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-teal-400" />
                      <strong className="text-white">50 Questions</strong> (Botany &amp; Zoology)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-teal-400" />
                      <strong className="text-white">200 Marks</strong> (+4 / −1 Scheme)
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
            <article className="overflow-hidden rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-[#0D1E22] via-[#09151A] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-emerald-500/25">
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-emerald-600/15 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      NEW EXAM
                    </span>
                    <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
                      NEET 2026 + Re-NEET
                    </span>
                    <span className="rounded-full bg-purple-500/20 border border-purple-500/30 px-3 py-0.5 text-xs font-bold text-purple-300">
                      Physics &amp; Chemistry Core
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_2026_CORE_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    55 curated high-yield questions from official NEET 2026 and Re-NEET 2026 question papers. Strict NEET timing standard of 1 min/question with complete KaTeX formula rendering.
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_2026_CORE_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-emerald-400" />
                      <strong className="text-white">55 Minutes</strong> (1 min/Q NEET Standard)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-emerald-400" />
                      <strong className="text-white">55 Questions</strong> (28 Physics + 27 Chem)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-emerald-400" />
                      <strong className="text-white">220 Marks</strong> (+4 / −1 Scheme)
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
            <article className="overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-b from-[#0F172A] via-[#0D1322] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-blue-500/20">
              <div className="pointer-events-none absolute -top-12 -right-12 h-56 w-56 rounded-full bg-indigo-600/15 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      NEW TEST
                    </span>
                    <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
                      Calculus Drill
                    </span>
                    <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-0.5 text-xs font-bold text-rose-300">
                      Hardest JEE Level
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_CALCULUS_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    60 of the most challenging Definite &amp; Indefinite Integration questions curated from authentic PYQs. Timed according to JEE standard (2.4 min/question for 60 questions = 144 minutes).
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_CALCULUS_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-blue-400" />
                      <strong className="text-white">144 Minutes</strong> (2h 24m · 2.4 min/Q)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">60 Questions</strong> (32 Def + 28 Indef)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-blue-400" />
                      <strong className="text-white">240 Marks</strong> (+4 / −1 Scheme)
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
          </div>
        )}

        {/* CONTENT FOR JEE SECTION */}
        {selectedCategory === 'jee' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-300">
                  JEE Main 2027 · Single Subject Chapter Mastery Series
                </span>
                <h2 className="mt-2 font-sans text-2xl sm:text-3xl font-black text-white">
                  JEE Main Periodic Table &amp; Periodicity CBT Mock
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Curated directly from 2021-2025 JEE Main Official PYQs and Advanced Top-Rankers Drills with zero duplicate questions.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-bold text-amber-300">
                <CheckCircle2 size={16} /> 1 Test Available (90 Mins · Adjustable)
              </div>
            </div>

            {/* Test Card: JEE Main 2027 Periodic Properties */}
            <article className="overflow-hidden rounded-3xl border border-amber-500/60 bg-gradient-to-b from-[#1F160A] via-[#140E06] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative ring-1 ring-amber-500/30">
              <div className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full bg-amber-600/20 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-3 py-0.5 text-xs font-bold text-amber-300">
                      🎯 JEE MAIN 2027 · CHEMISTRY
                    </span>
                    <span className="rounded-full bg-amber-600/20 border border-amber-500/30 px-3 py-0.5 text-xs font-bold text-amber-300">
                      60 Questions · 90 Mins (Adjustable)
                    </span>
                    <span className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-0.5 text-xs font-bold text-emerald-300">
                      240 Marks (+4 / -1)
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {JEE_2027_PERIODIC_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-300">
                    {JEE_2027_PERIODIC_TEST.subtitle}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-amber-400">High-Yield Topics Covered: </span>
                    {JEE_2027_PERIODIC_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-amber-400" />
                      <strong className="text-white">90 Minutes</strong> (Self-Adjustable up to 1 Hr 30 Mins)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">60 Questions</strong> (Zero Duplicates · Most Frequent &amp; Expected 2027)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Award size={14} className="text-emerald-400" />
                      <strong className="text-white">240 Marks</strong> (+4 / −1 Marking Scheme)
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

            {/* Strict JEE Rules & Paper Hardness Matrix */}
            <div className="rounded-3xl border border-amber-500/30 bg-gradient-to-b from-[#161007] via-[#0E0C07] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative overflow-hidden space-y-6">
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

              {/* Grid of Strict Rules */}
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

              {/* Table */}
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
        )}

        {/* CONTENT FOR CLASS 10 SECTION */}
        {selectedCategory === 'class10' && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-8 text-center shadow-xl sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 shadow-glow">
                <GraduationCap size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Class 10 CBSE &amp; State Boards
              </span>
              <h2 className="mt-3 font-serif italic text-2xl sm:text-3xl text-white">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
                Full-length Board Exam Mock Tests, Chemistry timed question papers, and Chapter Drills for Class 10 will be available in future releases.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-blue-400">Module 1</span>
                  <h4 className="mt-1 font-bold text-white">Physics &amp; Light</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-blue-400">Module 2</span>
                  <h4 className="mt-1 font-bold text-white">Chemistry Drills</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-blue-400">Module 3</span>
                  <h4 className="mt-1 font-bold text-white">Life Processes</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 9 SECTION */}
        {selectedCategory === 'class9' && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-8 text-center shadow-xl sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                <Layers size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Class 9 Foundation
              </span>
              <h2 className="mt-3 font-serif italic text-2xl sm:text-3xl text-white">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
                Class 9 Foundation Science and Mathematics assessment modules are scheduled for upcoming future updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Physics</span>
                  <h4 className="mt-1 font-bold text-white">Motion &amp; Force</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Chemistry</span>
                  <h4 className="mt-1 font-bold text-white">Matter &amp; Atoms</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Biology</span>
                  <h4 className="mt-1 font-bold text-white">Cell &amp; Tissues</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 8 SECTION */}
        {selectedCategory === 'class8' && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-3xl border border-white/10 bg-[#0B0F19] p-8 text-center shadow-xl sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-slate-300">
                <BookOpen size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-300">
                Class 8 Junior Foundation
              </span>
              <h2 className="mt-3 font-serif italic text-2xl sm:text-3xl text-white">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-slate-400">
                Junior Olympiad and Foundation curriculum for Class 8 students will be launching in the upcoming updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Science</span>
                  <h4 className="mt-1 font-bold text-white">Force &amp; Pressure</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Science</span>
                  <h4 className="mt-1 font-bold text-white">Chemical Effects</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
                  <span className="text-xs font-bold uppercase text-slate-400">Math</span>
                  <h4 className="mt-1 font-bold text-white">Linear Equations</h4>
                  <p className="mt-1 text-xs text-slate-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
