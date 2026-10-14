import React, { useState } from 'react';
import {
  Target,
  Trophy,
  Sparkles,
  TrendingUp,
  Award,
  ShieldCheck,
  Zap,
  Info,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Scale,
  FileText,
  Flame,
} from 'lucide-react';
import { getJeePrediction } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';

export default function JeeScorePredictorCard({
  testId,
  score,
  maxScore,
  accuracy = 0,
  correct = 0,
  wrong = 0,
  candidateName = null,
  isLight: propIsLight,
}) {
  const { isLight: contextIsLight } = useTheme();
  const isLight = propIsLight !== undefined ? propIsLight : contextIsLight;
  const [showRules, setShowRules] = useState(true);

  const prediction = getJeePrediction(testId, score, maxScore, accuracy, correct, wrong);

  if (!prediction) {
    return null;
  }

  const {
    testedSubject,
    paperHardness,
    rawScore,
    scaledChemistry100,
    assumedPhysics100,
    assumedMath100,
    projectedJeeTotal300,
    expectedPercentile,
    estimatedAir,
    qualifyingStatus,
    topColleges,
    tone,
    strictRules,
    recommendation,
  } = prediction;

  const toneBg = isLight
    ? {
        emerald: 'bg-emerald-50/70 border-emerald-300 ring-emerald-500/10',
        teal: 'bg-teal-50/70 border-teal-300 ring-teal-500/10',
        violet: 'bg-violet-50/70 border-violet-300 ring-violet-500/10',
        blue: 'bg-blue-50/70 border-blue-300 ring-blue-500/10',
        amber: 'bg-amber-50/70 border-amber-300 ring-amber-500/10',
        rose: 'bg-rose-50/70 border-rose-300 ring-rose-500/10',
      }[tone] || 'bg-blue-50/70 border-blue-300'
    : {
        emerald: 'from-emerald-950/60 via-[#0A1A17] to-[#0B0F19] border-emerald-500/40 ring-emerald-500/20',
        teal: 'from-teal-950/60 via-[#08181A] to-[#0B0F19] border-teal-500/40 ring-teal-500/20',
        violet: 'from-violet-950/60 via-[#130B24] to-[#0B0F19] border-violet-500/40 ring-violet-500/20',
        blue: 'from-blue-950/60 via-[#0A1326] to-[#0B0F19] border-blue-500/40 ring-blue-500/20',
        amber: 'from-amber-950/50 via-[#1A1208] to-[#0B0F19] border-amber-500/40 ring-amber-500/20',
        rose: 'from-rose-950/50 via-[#1A0A0E] to-[#0B0F19] border-rose-500/40 ring-rose-500/20',
      }[tone] || 'from-blue-950/60 via-[#0A1326] to-[#0B0F19] border-blue-500/40';

  const badgeClass = {
    emerald: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40',
    teal: 'bg-teal-500/20 text-teal-600 dark:text-teal-300 border-teal-500/40',
    violet: 'bg-violet-500/20 text-violet-600 dark:text-violet-300 border-violet-500/40',
    blue: 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40',
    amber: 'bg-amber-500/20 text-amber-600 dark:text-amber-300 border-amber-500/40',
    rose: 'bg-rose-500/20 text-rose-600 dark:text-rose-300 border-rose-500/40',
  }[tone] || 'bg-blue-500/20 text-blue-600 dark:text-blue-300 border-blue-500/40';

  return (
    <div
      className={`rounded-3xl border p-5 sm:p-7 shadow-2xl relative overflow-hidden ring-1 transition-colors ${
        isLight ? `${toneBg} bg-white` : `bg-gradient-to-b ${toneBg}`
      } animate-fade-in`}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4 border-slate-200 dark:border-white/10 relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-500 border border-amber-500/30 shadow-xs">
            <Target size={18} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-sans text-sm sm:text-base font-black tracking-tight">
                JEE Main 2027 Projected NTA Percentile &amp; AIR Rank
              </h3>
              <span className="rounded-full bg-amber-500/20 border border-amber-500/40 px-2 py-0.5 text-[10px] font-black text-amber-600 dark:text-amber-300 flex items-center gap-1">
                <Flame size={11} /> {paperHardness}
              </span>
              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                NTA Normalization Matrix
              </span>
            </div>
            {candidateName && (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Evaluation under strict JEE Main CBT conditions for <strong className="text-slate-800 dark:text-white">{candidateName}</strong>
              </p>
            )}
          </div>
        </div>

        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${badgeClass}`}>
          {qualifyingStatus}
        </span>
      </div>

      {/* Score & Percentile Prediction Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center relative z-10">
        {/* 1. Raw Chemistry Score */}
        <div
          className={`rounded-2xl border p-3.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#070A12]/90 border-blue-500/30'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
            <Layers size={12} />
            <span>Chemistry (Tested)</span>
          </div>
          <div className="mt-1 font-mono text-xl sm:text-2xl font-black">
            <span className="text-blue-600 dark:text-blue-400">{rawScore}</span>
            <span className="text-xs text-slate-400"> / {maxScore}</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Scaled: <strong>{scaledChemistry100} / 100</strong>
          </span>
        </div>

        {/* 2. Projected Full Paper Score */}
        <div
          className={`rounded-2xl border p-3.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#070A12]/90 border-purple-500/30'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-purple-600 dark:text-purple-400">
            <Zap size={12} />
            <span>Projected 300 Marks</span>
          </div>
          <div className="mt-1 font-mono text-xl sm:text-2xl font-black">
            <span className="text-purple-600 dark:text-purple-400">{projectedJeeTotal300}</span>
            <span className="text-xs text-slate-400"> / 300</span>
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Phy ~{assumedPhysics100} · Math ~{assumedMath100}
          </span>
        </div>

        {/* 3. Expected NTA Percentile */}
        <div
          className={`rounded-2xl border p-3.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#070A12]/90 border-amber-500/30'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400">
            <Sparkles size={12} />
            <span>Expected Percentile</span>
          </div>
          <div className="mt-1 font-mono text-xl sm:text-2xl font-black text-amber-500 dark:text-amber-300">
            {expectedPercentile.toFixed(4)}%tile
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Hard Shift Equated
          </span>
        </div>

        {/* 4. Estimated AIR Rank */}
        <div
          className={`rounded-2xl border p-3.5 ${
            isLight ? 'bg-white border-slate-200' : 'bg-[#070A12]/90 border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">
            <Trophy size={12} />
            <span>Estimated AIR</span>
          </div>
          <div className="mt-1 font-mono text-xs sm:text-sm font-black text-emerald-600 dark:text-emerald-300 truncate">
            {estimatedAir}
          </div>
          <span className="text-[10px] text-slate-500 block mt-0.5">
            Out of ~14.2 Lakh Candidates
          </span>
        </div>
      </div>

      {/* College Admission Qualification Banner */}
      <div
        className={`mt-4 rounded-2xl border p-3.5 flex flex-wrap items-center justify-between gap-2 text-xs relative z-10 ${
          isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#070A12]/80 border-white/10'
        }`}
      >
        <div className="flex items-center gap-2">
          <Award size={15} className="text-amber-500 shrink-0" />
          <span className="text-slate-600 dark:text-slate-300">
            <strong>Target College &amp; Branch Tier:</strong>{' '}
            <span className="text-blue-600 dark:text-blue-400 font-bold">{topColleges}</span>
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-slate-500">
          Accuracy: <strong className="text-emerald-600 dark:text-emerald-400">{accuracy}%</strong>
        </span>
      </div>

      {/* Strict JEE Rules Section Toggle */}
      <div className="mt-5 border-t pt-4 border-slate-200 dark:border-white/10 relative z-10">
        <button
          type="button"
          onClick={() => setShowRules((prev) => !prev)}
          className={`w-full flex items-center justify-between py-2 px-3 rounded-xl text-xs font-bold transition ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              : 'bg-white/5 hover:bg-white/10 text-white'
          }`}
        >
          <span className="flex items-center gap-2">
            <Scale size={14} className="text-amber-500" />
            <span>Strict JEE Examination Protocol &amp; Paper Hardness Rules (NTA Guidelines)</span>
          </span>
          {showRules ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </button>

        {showRules && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 animate-fade-in">
            {strictRules.map((rule, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-3 text-xs space-y-1 ${
                  isLight ? 'bg-white border-slate-200 shadow-2xs' : 'bg-[#070A12] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{rule.title}</span>
                  <span className="rounded-md bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.2 text-[9px] font-black text-amber-600 dark:text-amber-400 uppercase shrink-0">
                    {rule.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actionable Recommendation */}
      <div
        className={`mt-4 rounded-xl border p-3 text-xs leading-relaxed relative z-10 ${
          isLight ? 'bg-blue-50/60 border-blue-200 text-slate-700' : 'bg-blue-950/20 border-blue-500/30 text-slate-300'
        }`}
      >
        <span className="font-bold text-blue-600 dark:text-blue-400">💡 Strategic Takeaway: </span>
        {recommendation}
      </div>
    </div>
  );
}
