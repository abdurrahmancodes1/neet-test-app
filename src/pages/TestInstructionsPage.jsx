import React from 'react';
import { questions, TEST_DURATION_MINUTES } from '../data/questions.js';

export default function TestInstructionsPage({ onBack, onStart }) {
  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10"><div className="mx-auto max-w-2xl animate-rise-in">
      <button type="button" onClick={onBack} className="mb-6 text-sm font-semibold text-ink-600 transition hover:text-ink-900">← Back to Chapter Tests</button>
      <section className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Physics · Laws of Motion</p><h1 className="mt-2 font-serif text-3xl font-bold text-ink-900">Test Instructions</h1><div className="my-7 grid grid-cols-2 gap-3 sm:grid-cols-4"><Info value={questions.length} label="Questions"/><Info value="Physics" label="Subject"/><Info value="Hard" label="Difficulty"/><Info value={`${TEST_DURATION_MINUTES} min`} label="Duration"/></div><div className="rounded-xl bg-ink-50 p-4"><h2 className="font-semibold text-ink-900">Before you begin</h2><ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-600"><li>• Read each question carefully.</li><li>• Select one answer from the four options.</li><li>• You can navigate between questions and mark them for review.</li><li>• Submit the test when you have finished.</li></ul></div><button type="button" onClick={onStart} className="mt-7 w-full rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white transition hover:bg-ink-800">Start Test</button></section>
    </div></main>
  );
}
function Info({ value, label }) { return <div className="rounded-xl bg-ink-100 p-3 text-center"><p className="font-bold text-ink-900">{value}</p><p className="mt-1 text-[11px] font-semibold text-ink-500">{label}</p></div>; }
