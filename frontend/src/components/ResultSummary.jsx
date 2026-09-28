import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, Target, Timer as TimerIcon, Award } from 'lucide-react';
import { ScoreDonut } from './Charts.jsx';

function StatCard({ icon, label, value, tone }) {
  const toneClasses = {
    good: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    bad: 'border-rose-500/20 bg-rose-500/10 text-rose-300',
    neutral: 'border-white/10 bg-[#070A12] text-slate-300',
    gold: 'border-amber-500/20 bg-amber-500/10 text-amber-300',
  }[tone];

  return (
    <div className={`flex flex-col items-center gap-1 rounded-2xl border py-4 sm:py-5 ${toneClasses}`}>
      {icon}
      <p className="font-mono text-2xl sm:text-3xl font-bold">{value}</p>
      <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider opacity-80">{label}</p>
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
    <div className="animate-rise-in rounded-3xl border border-white/10 bg-[#0B0F19] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      <div className="pointer-events-none absolute -top-12 -right-12 h-48 w-48 rounded-full bg-blue-600/10 blur-3xl" />

      <div className="text-center">
        <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
          Examination Summary
        </span>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-black text-white">
          {result.score} <span className="text-xl sm:text-2xl text-slate-500 font-normal">/ {result.maxScore}</span>
        </h1>
        <p className="mt-1 text-base sm:text-lg font-bold text-blue-400">{result.percentage.toFixed(1)}% Marks</p>
        <p className="mt-1 text-xs text-slate-400">{testTitle} — {testSubtitle}</p>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <StatCard icon={<CheckCircle2 size={20} className="text-emerald-400" />} label="Correct" value={result.correct} tone="good" />
        <StatCard icon={<XCircle size={20} className="text-rose-400" />} label="Wrong" value={result.wrong} tone="bad" />
        <StatCard icon={<MinusCircle size={20} className="text-slate-400" />} label="Unattempted" value={result.unattempted} tone="neutral" />
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-center">
        <ScoreDonut correct={result.correct} wrong={result.wrong} unattempted={result.unattempted} />
        <div className="flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#070A12] px-4 py-3">
            <span className="flex items-center gap-2 font-medium text-slate-400">
              <Target size={16} className="text-emerald-400" /> Overall Accuracy
            </span>
            <span className="font-mono text-sm font-bold text-white">{result.accuracy.toFixed(1)}%</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#070A12] px-4 py-3">
            <span className="flex items-center gap-2 font-medium text-slate-400">
              <TimerIcon size={16} className="text-blue-400" /> Total Time Taken
            </span>
            <span className="font-mono text-sm font-bold text-white">{timeTakenLabel}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#070A12] px-4 py-3">
            <span className="flex items-center gap-2 font-medium text-slate-400">
              <TimerIcon size={16} className="text-blue-400" /> Avg. Time / Question
            </span>
            <span className="font-mono text-sm font-bold text-white">{avgTimeLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
