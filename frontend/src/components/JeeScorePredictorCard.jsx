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
      className={`rounded-lg border p-5 sm:p-6 relative overflow-hidden font-mono transition-colors ${
        isLight ? 'bg-white border-slate-300 shadow-xs text-slate-900' : 'bg-[#080D1A] border-blue-900/40 shadow-md text-slate-100'
      } animate-fade-in`}
    >
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-3 border-slate-200 dark:border-blue-900/30 relative z-10 font-mono">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-xs">
            <Target size={16} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                JEE MAIN 2027 PROJECTED NTA PERCENTILE &amp; AIR
              </h3>
              <span className="rounded bg-amber-500/20 border border-amber-500/40 px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase text-amber-300 flex items-center gap-1">
                <Flame size={11} /> {paperHardness}
              </span>
              <span className="rounded bg-blue-500/20 border border-blue-500/30 px-1.5 py-0.2 text-[10px] font-mono font-bold text-blue-300 uppercase">
                NTA NORMALIZED
              </span>
            </div>
            {candidateName && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                Evaluation under strict CBT conditions for <strong className="text-slate-200">{candidateName}</strong>
              </p>
            )}
          </div>
        </div>

        <span className={`rounded border px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider ${badgeClass}`}>
          {qualifyingStatus}
        </span>
      </div>

      {/* Score & Percentile Prediction Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center relative z-10 font-mono">
        {/* 1. Raw Chemistry Score */}
        <div
          className={`rounded border p-3 ${
            isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-blue-400 tracking-wider">
            <Layers size={11} />
            <span>CHEM (TESTED)</span>
          </div>
          <div className="mt-1 font-mono text-lg sm:text-xl font-bold">
            <span className="text-blue-400">{rawScore}</span>
            <span className="text-xs text-slate-500"> / {maxScore}</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">
            Scaled: <strong>{scaledChemistry100} / 100</strong>
          </span>
        </div>

        {/* 2. Projected Full Paper Score */}
        <div
          className={`rounded border p-3 ${
            isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-indigo-400 tracking-wider">
            <Zap size={11} />
            <span>PROJ TOTAL</span>
          </div>
          <div className="mt-1 font-mono text-lg sm:text-xl font-bold">
            <span className="text-indigo-400">{projectedJeeTotal300}</span>
            <span className="text-xs text-slate-500"> / 300</span>
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5">
            PHY ~{assumedPhysics100} · MTH ~{assumedMath100}
          </span>
        </div>

        {/* 3. Expected NTA Percentile */}
        <div
          className={`rounded border p-3 ${
            isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
            <Sparkles size={11} />
            <span>EXP PERCENTILE</span>
          </div>
          <div className="mt-1 font-mono text-lg sm:text-xl font-bold text-amber-300">
            {expectedPercentile.toFixed(4)}%
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">
            Hard Shift Equated
          </span>
        </div>

        {/* 4. Estimated AIR Rank */}
        <div
          className={`rounded border p-3 ${
            isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
          }`}
        >
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
            <Trophy size={11} />
            <span>ESTIMATED AIR</span>
          </div>
          <div className="mt-1 font-mono text-xs sm:text-sm font-bold text-emerald-300 truncate">
            {estimatedAir}
          </div>
          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">
            / ~14.2L CANDIDATES
          </span>
        </div>
      </div>

      {/* College Admission Qualification Banner */}
      <div
        className={`mt-3 rounded border p-2.5 flex flex-wrap items-center justify-between gap-2 text-xs relative z-10 font-mono ${
          isLight ? 'bg-slate-50 border-slate-300' : 'bg-[#060A14] border-blue-900/40'
        }`}
      >
        <div className="flex items-center gap-2">
          <Award size={14} className="text-amber-400 shrink-0" />
          <span className="text-slate-300 text-xs">
            TARGET TIER: <span className="text-blue-400 font-bold">{topColleges}</span>
          </span>
        </div>
        <span className="font-mono text-[11px] font-bold text-slate-400 uppercase">
          ACCURACY: <strong className="text-emerald-400">{accuracy}%</strong>
        </span>
      </div>

      {/* Strict JEE Rules Section Toggle */}
      <div className="mt-4 border-t pt-3 border-slate-200 dark:border-blue-900/30 relative z-10 font-mono">
        <button
          type="button"
          onClick={() => setShowRules((prev) => !prev)}
          className={`w-full flex items-center justify-between py-1.5 px-2.5 rounded text-xs font-mono font-bold uppercase tracking-wider transition ${
            isLight
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              : 'bg-[#0A1020] hover:bg-blue-900/20 text-slate-300 border border-blue-900/40'
          }`}
        >
          <span className="flex items-center gap-2">
            <Scale size={13} className="text-amber-400" />
            <span>JEE Main Examination Protocol &amp; Normalization (NTA Guidelines)</span>
          </span>
          {showRules ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showRules && (
          <div className="mt-2.5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 animate-fade-in font-mono">
            {strictRules.map((rule, idx) => (
              <div
                key={idx}
                className={`rounded border p-2.5 text-xs space-y-1 ${
                  isLight ? 'bg-white border-slate-300 shadow-2xs' : 'bg-[#060A14] border-blue-900/40'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-bold text-slate-200 uppercase tracking-wider text-[11px]">{rule.title}</span>
                  <span className="rounded bg-amber-500/15 border border-amber-500/30 px-1 py-0.2 text-[9px] font-mono font-bold text-amber-300 uppercase shrink-0">
                    {rule.tag}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actionable Recommendation */}
      <div
        className={`mt-3 rounded border p-2.5 text-xs leading-relaxed relative z-10 font-mono ${
          isLight ? 'bg-blue-50/60 border-blue-300 text-slate-700' : 'bg-blue-950/20 border-blue-900/40 text-slate-300'
        }`}
      >
        <span className="font-bold text-blue-400 uppercase tracking-wider">STRATEGIC TAKEAWAY // </span>
        <span className="font-sans text-slate-300">{recommendation}</span>
      </div>
    </div>
  );
}
