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
} from 'lucide-react';
import { NEET_WEP_TEST } from '../data/neetWorkEnergyTest.js';

export default function ChapterTestsPage({ onSelect, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState('neet'); // 'neet' | 'class10' | 'class9' | 'class8'

  const categories = [
    { id: 'neet', label: 'NEET 2027', badge: 'Active Test Series', icon: Zap },
    { id: 'class10', label: 'Class 10', badge: 'Upcoming in future', icon: GraduationCap },
    { id: 'class9', label: 'Class 9', badge: 'Upcoming in future', icon: Layers },
    { id: 'class8', label: 'Class 8', badge: 'Upcoming in future', icon: BookOpen },
  ];

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Top Header */}
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-ink-200 pb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-ink-900 font-black text-gold-300 shadow-sm">
              <Zap size={22} className="text-gold-400" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
                Exam Preparation Portal
              </p>
              <h1 className="font-serif text-xl font-bold text-ink-900 sm:text-2xl">
                National Standard Practice &amp; Assessment
              </h1>
            </div>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="rounded-xl border border-ink-200 bg-white px-3.5 py-2 text-xs font-bold text-ink-700 shadow-sm transition hover:bg-ink-100"
            >
              Sign Out
            </button>
          )}
        </header>

        {/* Section / Category Tabs */}
        <div className="mb-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-500">
            Select Your Target Standard / Exam :
          </p>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex flex-col items-start justify-between rounded-2xl border p-4 text-left transition-all ${
                    isActive
                      ? 'border-ink-900 bg-ink-900 text-white shadow-pop ring-2 ring-ink-900/20'
                      : 'border-ink-200 bg-white text-ink-800 hover:border-ink-300 hover:bg-ink-100/50'
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-2">
                    <Icon
                      size={18}
                      className={isActive ? 'text-gold-300' : 'text-ink-600'}
                    />
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? cat.id === 'neet'
                            ? 'bg-good-500/30 text-good-200'
                            : 'bg-gold-400/20 text-gold-300'
                          : cat.id === 'neet'
                            ? 'bg-good-50 text-good-700 border border-good-200'
                            : 'bg-ink-100 text-ink-500'
                      }`}
                    >
                      {cat.badge}
                    </span>
                  </div>
                  <span className="mt-3 font-serif text-lg font-bold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* CONTENT FOR NEET SECTION */}
        {selectedCategory === 'neet' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
                  Physics · Class 11 Drill
                </span>
                <h2 className="mt-2 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                  NEET 2027: Work, Energy and Power
                </h2>
                <p className="mt-1 text-sm text-ink-600">
                  60 High-Yield Questions curated from authentic NEET and hard conceptual problem sets.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-good-200 bg-good-50 px-3.5 py-2 text-xs font-bold text-good-700">
                <CheckCircle2 size={16} className="text-good-600" /> Test Ready (2 Hours)
              </div>
            </div>

            {/* Test Card */}
            <article className="overflow-hidden rounded-2xl border-2 border-ink-900 bg-white p-6 shadow-pop sm:p-8">
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ink-900 px-3 py-1 text-xs font-black uppercase tracking-wider text-gold-300">
                      NEET Pattern
                    </span>
                    <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold text-gold-800">
                      Hard Level
                    </span>
                  </div>

                  <h3 className="mt-3 font-serif text-2xl font-black text-ink-900 sm:text-3xl">
                    {NEET_WEP_TEST.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-600">
                    Comprehensive full-chapter examination designed to test conceptual clarity, graphical analysis, spring systems, variable forces, and vertical circular motion up to NEET standard.
                  </p>

                  <div className="mt-5 rounded-xl border border-ink-100 bg-ink-50 p-4 text-xs leading-relaxed text-ink-700">
                    <span className="font-bold text-ink-900">Syllabus Covered: </span>
                    {NEET_WEP_TEST.syllabus}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs font-semibold text-ink-700">
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-xs">
                      <Clock size={14} className="text-gold-600" />
                      <strong>2 Hours</strong> (120 Minutes)
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-xs">
                      <BookOpen size={14} className="text-gold-600" />
                      <strong>60 Questions</strong>
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-ink-200 bg-white px-3 py-2 shadow-xs">
                      <Award size={14} className="text-gold-600" />
                      <strong>240 Marks</strong> (+4 / −1 Scheme)
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(NEET_WEP_TEST.id)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-ink-900 px-8 py-5 text-sm font-bold text-white shadow-pop transition hover:bg-ink-800 lg:w-auto"
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
            <div className="rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-card sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <GraduationCap size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
                Class 10 CBSE &amp; State Boards
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink-600">
                Full-length Board Exam Mock Tests, Chemistry timed question papers, and Chapter Drills for Class 10 will be available in future releases.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-gold-600">Module 1</span>
                  <h4 className="mt-1 font-bold text-ink-900">Physics &amp; Light</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-gold-600">Module 2</span>
                  <h4 className="mt-1 font-bold text-ink-900">Chemistry Drills</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-gold-600">Module 3</span>
                  <h4 className="mt-1 font-bold text-ink-900">Life Processes</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 9 SECTION */}
        {selectedCategory === 'class9' && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-card sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-700">
                <Layers size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-ink-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-700">
                Class 9 Foundation
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink-600">
                Class 9 Foundation Science and Mathematics assessment modules are scheduled for upcoming future updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Physics</span>
                  <h4 className="mt-1 font-bold text-ink-900">Motion &amp; Force</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Chemistry</span>
                  <h4 className="mt-1 font-bold text-ink-900">Matter &amp; Atoms</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Biology</span>
                  <h4 className="mt-1 font-bold text-ink-900">Cell &amp; Tissues</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTENT FOR CLASS 8 SECTION */}
        {selectedCategory === 'class8' && (
          <div className="animate-fade-in space-y-6">
            <div className="rounded-2xl border border-ink-200 bg-white p-8 text-center shadow-card sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-100 text-ink-700">
                <BookOpen size={32} />
              </div>
              <span className="mt-4 inline-block rounded-full bg-ink-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink-700">
                Class 8 Junior Foundation
              </span>
              <h2 className="mt-3 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
                Upcoming in Future
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-ink-600">
                Junior Olympiad and Foundation curriculum for Class 8 students will be launching in the upcoming updates.
              </p>

              <div className="mx-auto mt-8 grid max-w-2xl grid-cols-1 gap-4 text-left sm:grid-cols-3">
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Science</span>
                  <h4 className="mt-1 font-bold text-ink-900">Force &amp; Pressure</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Science</span>
                  <h4 className="mt-1 font-bold text-ink-900">Chemical Effects</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
                <div className="rounded-xl border border-ink-100 bg-ink-50 p-4">
                  <span className="text-xs font-bold uppercase text-ink-600">Math</span>
                  <h4 className="mt-1 font-bold text-ink-900">Linear Equations</h4>
                  <p className="mt-1 text-xs text-ink-500">Upcoming in future</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
