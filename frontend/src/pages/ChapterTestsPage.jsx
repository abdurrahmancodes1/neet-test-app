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
} from 'lucide-react';
import { NEET_WEP_TEST } from '../data/neetWorkEnergyTest.js';
import { NEET_CALCULUS_TEST } from '../data/neetCalculusTest.js';
import { NEET_2026_CORE_TEST } from '../data/neet2026CoreTopicsTest.js';

export default function ChapterTestsPage({ onSelect, onLogout, user, onGoToDashboard }) {
  const [selectedCategory, setSelectedCategory] = useState('neet'); // 'neet' | 'class10' | 'class9' | 'class8'

  const categories = [
    { id: 'neet', label: 'NEET 2027', badge: 'Active Test Series', icon: Zap },
    { id: 'class10', label: 'Class 10', badge: 'Upcoming in future', icon: GraduationCap },
    { id: 'class9', label: 'Class 9', badge: 'Upcoming in future', icon: Layers },
    { id: 'class8', label: 'Class 8', badge: 'Upcoming in future', icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-[#05070B] text-slate-100 px-4 py-4 sm:py-8 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[480px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-blue-900/5 to-transparent blur-2xl" />

      <div className="mx-auto max-w-5xl space-y-10 relative z-10 animate-fade-in">
        {/* Floating Dark Pill Navigation Bar */}
        <header className="rounded-full border border-white/10 bg-[#0D121F]/90 backdrop-blur-md px-4 sm:px-6 py-2.5 shadow-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white font-black text-xs shadow-glow">
              <Zap size={15} className="fill-white text-white" />
            </div>
            <span className="truncate font-sans text-sm sm:text-base font-bold tracking-tight text-white">
              NEET<span className="text-blue-500">2027</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-300">
            {onGoToDashboard && (
              <button
                type="button"
                onClick={onGoToDashboard}
                className="text-slate-400 hover:text-white transition flex items-center gap-1.5"
              >
                <BarChart3 size={14} /> Dashboard
              </button>
            )}
            <span className="text-white flex items-center gap-1.5 cursor-pointer">
              <Layers size={14} className="text-blue-400" /> Standard Tests
            </span>
            <span className="text-slate-500 text-[11px] font-medium border border-white/10 rounded-full px-2.5 py-0.5">
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
                className="rounded-full border border-white/10 bg-white/5 p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
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
              <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-bold text-emerald-300">
                <CheckCircle2 size={16} /> 3 Tests Available
              </div>
            </div>

            {/* Test Card 1: NEET 2026 & Re-NEET Core Topics Drill */}
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

            {/* Test Card 2: Work, Energy and Power */}
            <article className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative">
              <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center relative z-10">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-3 py-0.5 text-xs font-bold text-blue-300">
                      Physics Drill
                    </span>
                    <span className="rounded-full bg-rose-500/20 border border-rose-500/30 px-3 py-0.5 text-xs font-bold text-rose-300">
                      Hard Level
                    </span>
                  </div>

                  <h3 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
                    {NEET_WEP_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">
                    Comprehensive full-chapter examination designed to test conceptual clarity, graphical analysis, spring systems, variable forces, and vertical circular motion up to NEET standard.
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-[#070A12] p-4 text-xs leading-relaxed text-slate-300">
                    <span className="font-bold text-white">Syllabus Covered: </span>
                    {NEET_WEP_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-300">
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <Clock size={14} className="text-blue-400" />
                      <strong className="text-white">2 Hours</strong> (120 Minutes)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3.5 py-2">
                      <BookOpen size={14} className="text-blue-400" />
                      <strong className="text-white">60 Questions</strong>
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
                    onClick={() => onSelect(NEET_WEP_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 hover:bg-white/15 px-8 py-4 text-sm font-bold text-white border border-white/10 transition active:scale-95 lg:w-auto"
                  >
                    Start 2-Hour Examination <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
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
