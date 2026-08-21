import React from 'react';
import { questions as defaultQuestions, TEST_DURATION_MINUTES as defaultDuration } from '../data/questions.js';

export default function TestInstructionsPage({ test, onBack, onStart }) {
  const qCount = test ? test.questions.length : defaultQuestions.length;
  const duration = test ? test.durationMinutes : defaultDuration;
  const title = test ? test.title : 'Laws of Motion';
  const badge = test ? `${test.subject} · ${test.chapter}` : 'Physics · Laws of Motion';
  const difficulty = test ? test.difficulty : 'Hard';
  const subject = test ? test.subject : 'Physics';

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl animate-rise-in">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 text-sm font-semibold text-ink-600 transition hover:text-ink-900"
        >
          ← Back to Tests
        </button>
        <section className="rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">{badge}</p>
          <h1 className="mt-2 font-serif text-3xl font-bold text-ink-900">{title} — Instructions</h1>

          <div className="my-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Info value={qCount} label="Questions" />
            <Info value={subject} label="Subject" />
            <Info value={difficulty} label="Difficulty" />
            <Info value={`${duration} min`} label="Duration" />
          </div>

          <div className="space-y-4 rounded-xl bg-ink-50 p-4">
            <div>
              <h2 className="font-semibold text-ink-900">Marking Scheme</h2>
              <p className="mt-1 text-sm text-ink-600">
                • <strong className="text-good-600">+4 Marks</strong> for each correct response.
                <br />
                • <strong className="text-bad-600">−1 Mark</strong> for each incorrect response (Negative Marking).
                <br />
                • <strong className="text-ink-600">0 Marks</strong> for unattempted questions.
              </p>
            </div>
            <div>
              <h2 className="font-semibold text-ink-900">Exam Strategy &amp; Rules</h2>
              <ul className="mt-2 space-y-1.5 text-sm leading-relaxed text-ink-600">
                <li>• Read each question carefully before choosing your response.</li>
                <li>• You can mark questions for review and return to them anytime via the question palette.</li>
                <li>• The timer counts down continuously and the test will auto-submit when time expires.</li>
                <li>• Stay in fullscreen mode during the test.</li>
              </ul>
            </div>
          </div>

          <button
            type="button"
            onClick={onStart}
            className="mt-7 w-full rounded-lg bg-ink-900 py-3.5 text-sm font-bold text-white transition hover:bg-ink-800"
          >
            Start Test
          </button>
        </section>
      </div>
    </main>
  );
}

function Info({ value, label }) {
  return (
    <div className="rounded-xl bg-ink-100 p-3 text-center">
      <p className="font-bold text-ink-900">{value}</p>
      <p className="mt-1 text-[11px] font-semibold text-ink-500">{label}</p>
    </div>
  );
}
