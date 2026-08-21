import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, Target, Timer as TimerIcon } from 'lucide-react';
import { ScoreDonut } from './Charts.jsx';

function StatCard({ icon, label, value, tone }) {
  const toneClasses = {
    good: 'bg-good-100 text-good-700',
    bad: 'bg-bad-100 text-bad-700',
    neutral: 'bg-ink-100 text-ink-700',
    gold: 'bg-gold-100 text-gold-700',
  }[tone];

  return (
    <div className={`flex flex-col items-center gap-1 rounded-xl2 py-4 ${toneClasses}`}>
      {icon}
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-xs font-medium opacity-80">{label}</p>
    </div>
  );
}

export default function ResultSummary({
  result,
  timeTakenLabel,
  avgTimeLabel,
  testTitle = 'Laws of Motion',
  testSubtitle = 'A focused NEET practice test',
}) {
  return (
    <div className="animate-rise-in rounded-xl2 border border-ink-200 bg-white p-6 shadow-card sm:p-8">
      <div className="text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">Test Complete</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-ink-900 sm:text-5xl">
          {result.score} <span className="text-2xl text-ink-400 sm:text-3xl">/ {result.maxScore}</span>
        </h1>
        <p className="mt-1 text-lg font-semibold text-ink-600">{result.percentage.toFixed(1)}%</p>
        <p className="mt-1 text-sm text-ink-500">{testTitle} — {testSubtitle}</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard icon={<CheckCircle2 size={20} />} label="Correct" value={result.correct} tone="good" />
        <StatCard icon={<XCircle size={20} />} label="Wrong" value={result.wrong} tone="bad" />
        <StatCard icon={<MinusCircle size={20} />} label="Unattempted" value={result.unattempted} tone="neutral" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-center">
        <ScoreDonut correct={result.correct} wrong={result.wrong} unattempted={result.unattempted} />
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between rounded-lg bg-ink-100 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-ink-600">
              <Target size={16} /> Accuracy
            </span>
            <span className="font-mono text-sm font-bold text-ink-900">{result.accuracy.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-ink-100 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-ink-600">
              <TimerIcon size={16} /> Time taken
            </span>
            <span className="font-mono text-sm font-bold text-ink-900">{timeTakenLabel}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-ink-100 px-4 py-3">
            <span className="flex items-center gap-2 text-sm font-medium text-ink-600">
              <TimerIcon size={16} /> Avg. time / question
            </span>
            <span className="font-mono text-sm font-bold text-ink-900">{avgTimeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
