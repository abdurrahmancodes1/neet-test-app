import React from 'react';
import { Clock, BookOpen, Award, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export default function TestInstructionsPage({ test, onBack, onStart }) {
  const qCount = test?.totalQuestions || test?.questions?.length || 60;
  const duration = test?.durationMinutes || 120;
  const title = test?.title || 'NEET 2027: Work, Energy and Power';
  const badge = test?.subject ? `${test.subject}` : 'Physics · NEET 2027';
  const difficulty = test?.difficulty || 'Hard';

  return (
    <main className="min-h-screen bg-ink-50 px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-2xl animate-rise-in">
        <button
          type="button"
          onClick={onBack}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-semibold text-ink-600 transition hover:text-ink-900"
        >
          <ArrowLeft size={16} /> Back to Portal
        </button>

        <section className="rounded-2xl border border-ink-200 bg-white p-6 shadow-card sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              {badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-good-50 px-3 py-1 text-xs font-semibold text-good-700 border border-good-200">
              <CheckCircle2 size={13} className="text-good-600" /> CBT Mode Active
            </span>
          </div>

          <h1 className="mt-3 font-serif text-2xl font-bold text-ink-900 sm:text-3xl">
            {title}
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Official 2-Hour Examination Guidelines &amp; Strategy
          </p>

          <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-center">
              <p className="font-mono text-xl font-black text-ink-900">{qCount}</p>
              <p className="mt-1 text-[11px] font-bold text-ink-500">Questions</p>
            </div>
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-center">
              <p className="font-mono text-xl font-black text-ink-900">{duration}m</p>
              <p className="mt-1 text-[11px] font-bold text-ink-500">Duration (2h)</p>
            </div>
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-center">
              <p className="font-mono text-xl font-black text-ink-900">{qCount * 4}</p>
              <p className="mt-1 text-[11px] font-bold text-ink-500">Total Marks</p>
            </div>
            <div className="rounded-xl border border-ink-100 bg-ink-50 p-3 text-center">
              <p className="font-mono text-lg font-black text-ink-900">+4 / −1</p>
              <p className="mt-1 text-[11px] font-bold text-ink-500">Marking</p>
            </div>
          </div>

          <div className="space-y-4 rounded-xl border border-ink-100 bg-ink-50 p-5 text-xs text-ink-700 leading-relaxed">
            <div>
              <h2 className="font-bold uppercase tracking-wider text-ink-900">
                Marking Scheme &amp; Scoring System :
              </h2>
              <p className="mt-1.5 text-sm text-ink-700">
                • <strong className="text-good-600">+4 Marks</strong> for each correct answer.
                <br />
                • <strong className="text-bad-600">−1 Mark</strong> for each incorrect answer (Negative Marking).
                <br />
                • <strong className="text-ink-600">0 Marks</strong> for unattempted questions.
              </p>
            </div>

            <div className="border-t border-ink-200/60 pt-3">
              <h2 className="font-bold uppercase tracking-wider text-ink-900">
                Examination Rules &amp; CBT Navigation :
              </h2>
              <ul className="mt-1.5 space-y-1 text-sm text-ink-700">
                <li>• <strong>2 Hours Continuous Timer:</strong> The countdown timer will run continuously. Refreshing the browser will restore your active attempt.</li>
                <li>• <strong>Question Palette:</strong> Use the sidebar palette to quickly navigate, review marked questions, and track unanswered questions.</li>
                <li>• <strong>Auto-Submission:</strong> The examination will automatically submit when the 2 hours expire.</li>
                <li>• <strong>Instant Result &amp; Solutions:</strong> Full score report, accuracy analysis, and question-by-question explanations will be displayed immediately upon submission.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-ink-900 py-4 text-center text-sm font-bold text-white shadow-pop transition hover:bg-ink-800"
            >
              Begin 2-Hour Examination <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-xl border border-ink-200 bg-white px-6 py-4 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
