import React from 'react';
import { TEST_LIST } from '../data/tests.js';

export default function ChapterTestsPage({ onSelect, onLogout }) {
  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-900 font-black text-gold-300">
              N
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-gold-600">NEET Prep</p>
              <p className="font-serif text-lg font-bold text-ink-900">Practice Tests</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="rounded-lg border border-ink-200 bg-white px-3 py-2 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
          >
            Logout
          </button>
        </header>

        <div className="mb-8">
          <p className="text-sm font-semibold text-gold-600">NEET Mock & Chapter Tests</p>
          <h1 className="mt-1 font-serif text-3xl font-bold text-ink-900 sm:text-4xl">Choose a test to begin</h1>
          <p className="mt-2 text-ink-500">Build speed and accuracy with focused NEET-style practice and realistic timers.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {TEST_LIST.map((test) => (
            <article
              key={test.id}
              className="flex flex-col justify-between rounded-xl2 border border-ink-200 bg-white p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-pop sm:p-6"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-bold text-gold-700">
                      {test.badgeText}
                    </span>
                    <h2 className="mt-2.5 font-serif text-2xl font-bold text-ink-900">{test.title}</h2>
                    <p className="mt-1 text-sm text-ink-500">{test.subtitle}</p>
                  </div>
                  <div className="shrink-0 rounded-xl bg-ink-100 px-3 py-2 text-right text-xs font-semibold text-ink-600">
                    <p>{test.questions.length} Questions</p>
                    <p className="mt-1">{test.difficulty}</p>
                  </div>
                </div>

                <div className="mb-5 rounded-lg bg-ink-50 p-3 text-xs leading-relaxed text-ink-600">
                  <span className="font-semibold text-ink-800">Syllabus: </span>
                  {test.syllabus}
                </div>
              </div>

              <div>
                <div className="mb-5 flex flex-wrap gap-2 text-xs font-semibold text-ink-600">
                  <span className="rounded-full bg-ink-100 px-3 py-1.5">{test.durationMinutes} minutes</span>
                  <span className="rounded-full bg-ink-100 px-3 py-1.5">+4 / −1 marking</span>
                  <span className="rounded-full bg-ink-100 px-3 py-1.5">{test.questions.length * 4} marks</span>
                </div>
                <button
                  type="button"
                  onClick={() => onSelect(test.id)}
                  className="w-full rounded-lg bg-ink-900 py-3 text-sm font-bold text-white transition hover:bg-ink-800"
                >
                  Start Test
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
