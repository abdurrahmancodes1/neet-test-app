import React from 'react';
import { questions, TEST_DURATION_MINUTES } from '../data/questions.js';

export default function ChapterTestsPage({ onSelect, onLogout }) {
  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 font-black text-gold-300">N</div>
            <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">NEET Prep</p><p className="font-serif text-lg font-bold text-ink-900">Chapter Tests</p></div>
          </div>
          <button type="button" onClick={onLogout} className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100">Logout</button>
        </header>
        <div className="mb-6"><p className="text-sm font-semibold text-gold-600">Practice by chapter</p><h1 className="mt-1 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">Choose a test to begin</h1><p className="mt-2 text-ink-500">Build speed and accuracy with focused NEET-style practice.</p></div>
        <article className="max-w-lg rounded-xl2 border border-ink-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop sm:p-6">
          <div className="mb-5 flex items-start justify-between gap-4"><div><span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">Physics</span><h2 className="mt-3 font-serif text-2xl font-bold text-ink-900">Laws of Motion</h2><p className="mt-1 text-sm text-ink-500">A focused chapter practice sheet.</p></div><div className="rounded-xl bg-ink-100 px-3 py-2 text-right text-xs font-semibold text-ink-600"><p>{questions.length} Questions</p><p className="mt-1">Hard</p></div></div>
          <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600"><span className="rounded-full bg-ink-100 px-3 py-1.5">{TEST_DURATION_MINUTES} minutes</span><span className="rounded-full bg-ink-100 px-3 py-1.5">+4 / −1 marking</span></div>
          <button type="button" onClick={onSelect} className="w-full rounded-lg bg-ink-900 py-3 text-sm font-bold text-white transition hover:bg-ink-800">Start Test</button>
        </article>
      </div>
    </main>
  );
}
