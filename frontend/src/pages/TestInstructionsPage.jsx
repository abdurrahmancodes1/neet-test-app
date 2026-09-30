import React from 'react';
import { Clock, BookOpen, Award, CheckCircle2, ArrowLeft, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function TestInstructionsPage({ test, onBack, onStart }) {
  const qCount = test?.totalQuestions || test?.questions?.length || 60;
  const duration = test?.durationMinutes || 120;
  const title = test?.title || 'NEET 2027: Work, Energy and Power';
  const badge = test?.subject ? `${test.subject}` : 'Physics · NEET 2027';
  const difficulty = test?.difficulty || 'Hard';

  return (
    <main className="min-h-screen bg-[#05070B] text-slate-100 px-4 py-6 sm:py-10 relative overflow-hidden selection:bg-blue-600 selection:text-white">
      {/* Background Ambient Radial Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent blur-2xl" />

      <div className="mx-auto max-w-2xl animate-rise-in relative z-10 space-y-6">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition rounded-full border border-white/10 bg-white/5 px-4 py-2"
        >
          <ArrowLeft size={14} /> Back to Dashboard
        </button>

        <section className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0D1322] to-[#0B0F19] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              {badge}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-300">
              <CheckCircle2 size={13} /> CBT Mode Active
            </span>
          </div>

          <h1 className="mt-3 font-sans text-2xl sm:text-3xl font-black text-white">
            {title}
          </h1>
          <p className="mt-1 text-sm text-slate-400 font-normal">
            Official 2-Hour Examination Guidelines &amp; Strategy
          </p>

          <div className="my-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-center">
              <p className="font-mono text-xl sm:text-2xl font-black text-white">{qCount}</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">Questions</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-center">
              <p className="font-mono text-xl sm:text-2xl font-black text-white">{duration}m</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">
                Duration ({Math.floor(duration / 60)}h{duration % 60 ? ` ${duration % 60}m` : ''})
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-center">
              <p className="font-mono text-xl sm:text-2xl font-black text-white">{qCount * 4}</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">Total Marks</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-[#070A12] p-3.5 text-center">
              <p className="font-mono text-lg sm:text-xl font-black text-emerald-400">+4 / −1</p>
              <p className="mt-1 text-[11px] font-semibold text-slate-400">Marking</p>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-[#070A12] p-5 text-xs text-slate-300 leading-relaxed">
            <div>
              <h2 className="font-bold uppercase tracking-wider text-white text-xs">
                Marking Scheme &amp; Scoring System :
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                • <strong className="text-emerald-400 font-bold">+4 Marks</strong> for each correct answer.
                <br />
                • <strong className="text-rose-400 font-bold">−1 Mark</strong> for each incorrect answer (Negative Marking).
                <br />
                • <strong className="text-slate-400 font-medium">0 Marks</strong> for unattempted questions.
              </p>
            </div>

            <div className="border-t border-white/10 pt-3">
              <h2 className="font-bold uppercase tracking-wider text-white text-xs">
                Examination Rules &amp; CBT Navigation :
              </h2>
              <ul className="mt-2 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <li>• <strong className="text-white">Continuous Timer ({duration} Mins):</strong> The countdown timer will run continuously. Refreshing the browser will restore your active attempt.</li>
                <li>• <strong className="text-white">Question Palette:</strong> Use the sidebar palette to quickly navigate, review marked questions, and track unanswered questions.</li>
                <li>• <strong className="text-white">Auto-Submission:</strong> The examination will automatically submit when the timer expires.</li>
                <li>• <strong className="text-white">Instant Result &amp; Solutions:</strong> Full score report, accuracy analysis, and question-by-question explanations will be displayed immediately upon submission.</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onStart}
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 hover:bg-blue-500 py-4 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/30 transition active:scale-95"
            >
              Begin Timed Examination ({duration}m) <ArrowRight size={16} />
            </button>
            <button
              type="button"
              onClick={onBack}
              className="rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-4 text-sm font-semibold text-slate-300 transition"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
