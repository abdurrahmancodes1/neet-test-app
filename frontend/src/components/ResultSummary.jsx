import React from 'react';
import { CheckCircle2, XCircle, MinusCircle, Target, Timer as TimerIcon, Award } from 'lucide-react';
import { ScoreDonut } from './Charts.jsx';
import { useTheme } from '../utils/themeContext.jsx';

function StatCard({ icon, label, value, tone, isLight }) {
  const toneClasses = {
    good: isLight
      ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
      : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
    bad: isLight
      ? 'border-rose-200 bg-rose-50 text-rose-800'
      : 'border-rose-500/20 bg-rose-500/10 text-rose-300',
    neutral: isLight
      ? 'border-slate-300 bg-slate-50 text-slate-800'
      : 'border-blue-900/40 bg-[#060A14] text-slate-300',
  }[tone];

  return (
    <div className={`flex flex-col items-center justify-center gap-0.5 rounded-lg border py-2 px-2.5 font-mono ${toneClasses}`}>
      <div className="flex items-center gap-1">
        {icon}
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider opacity-90">{label}</span>
      </div>
      <p className="font-mono text-lg sm:text-xl font-black">{value}</p>
    </div>
  );
}

export default function ResultSummary({
  result,
  timeTakenLabel,
  avgTimeLabel,
  testTitle = 'Standard Assessment',
  testSubtitle = 'Standardized CBT drill',
}) {
  const { isLight } = useTheme();

  return (
    <div
      className={`rounded-xl border p-4 sm:p-5 relative overflow-hidden transition-colors font-mono h-full flex flex-col justify-between ${
        isLight
          ? 'border-slate-300 bg-white shadow-xs text-slate-900'
          : 'border-blue-900/40 bg-[#080D1A] shadow-md text-slate-100'
      }`}
    >
      {/* Background Glow */}
      <div
        className={`pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full blur-3xl ${
          isLight ? 'bg-blue-500/5' : 'bg-blue-600/10'
        }`}
      />

      {/* Header Bar */}
      <div className="border-b pb-3 mb-3 border-inherit flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span
            className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
              isLight
                ? 'bg-blue-100 border border-blue-300 text-blue-900'
                : 'bg-blue-500/15 border border-blue-500/30 text-blue-300'
            }`}
          >
            [EXAMINATION SUMMARY]
          </span>
          <span className={`text-[11px] font-mono font-semibold truncate max-w-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {testTitle}
          </span>
        </div>
        <span
          className={`rounded px-2 py-0.5 text-[10px] font-mono font-bold ${
            isLight ? 'bg-emerald-100 text-emerald-800' : 'bg-emerald-500/20 text-emerald-300'
          }`}
        >
          {result.percentage.toFixed(1)}% Marks
        </span>
      </div>

      {/* Big Score Section */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 my-1">
        <div>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Raw Score Awarded</span>
          <h1 className={`font-mono text-3xl sm:text-4xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {result.score} <span className="text-base sm:text-lg text-slate-500 font-normal">/ {result.maxScore}</span>
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className={`rounded border px-2 py-0.5 text-[11px] font-mono font-bold ${
            isLight ? 'border-slate-300 bg-slate-50 text-slate-800' : 'border-blue-900/40 bg-white/5 text-slate-200'
          }`}>
            Accuracy: <strong className="text-emerald-500">{result.accuracy.toFixed(1)}%</strong>
          </span>
          <span className={`rounded border px-2 py-0.5 text-[11px] font-mono font-bold ${
            isLight ? 'border-slate-300 bg-slate-50 text-slate-800' : 'border-blue-900/40 bg-white/5 text-slate-200'
          }`}>
            Total Qs: <strong>{(result.correct || 0) + (result.wrong || 0) + (result.unattempted || 0)}</strong>
          </span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="my-2.5 grid grid-cols-3 gap-2">
        <StatCard
          icon={<CheckCircle2 size={14} className="text-emerald-500" />}
          label="Correct"
          value={`+${result.correct}`}
          tone="good"
          isLight={isLight}
        />
        <StatCard
          icon={<XCircle size={14} className="text-rose-500" />}
          label="Wrong"
          value={`-${result.wrong}`}
          tone="bad"
          isLight={isLight}
        />
        <StatCard
          icon={<MinusCircle size={14} className="text-slate-400" />}
          label="Left"
          value={result.unattempted}
          tone="neutral"
          isLight={isLight}
        />
      </div>

      {/* Donut Chart & Timing Metrics */}
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center pt-2 border-t border-inherit">
        <div className="flex items-center justify-center">
          <ScoreDonut
            correct={result.correct}
            wrong={result.wrong}
            unattempted={result.unattempted}
            heightClass="h-28 sm:h-32"
          />
        </div>
        <div className="flex flex-col gap-1.5 text-xs font-mono">
          <div
            className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${
              isLight ? 'border-slate-300 bg-slate-50 text-slate-700' : 'border-blue-900/40 bg-[#060A14] text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5 text-[11px]">
              <Target size={13} className="text-emerald-500" /> Accuracy
            </span>
            <span className="font-mono text-xs font-bold text-emerald-500">
              {result.accuracy.toFixed(1)}%
            </span>
          </div>
          <div
            className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${
              isLight ? 'border-slate-300 bg-slate-50 text-slate-700' : 'border-blue-900/40 bg-[#060A14] text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5 text-[11px]">
              <TimerIcon size={13} className="text-blue-400" /> Time Taken
            </span>
            <span className={`font-mono text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {timeTakenLabel}
            </span>
          </div>
          <div
            className={`flex items-center justify-between rounded-lg border px-3 py-1.5 ${
              isLight ? 'border-slate-300 bg-slate-50 text-slate-700' : 'border-blue-900/40 bg-[#060A14] text-slate-300'
            }`}
          >
            <span className="flex items-center gap-1.5 text-[11px]">
              <TimerIcon size={13} className="text-blue-400" /> Avg / Q
            </span>
            <span className={`font-mono text-xs font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {avgTimeLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
