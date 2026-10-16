import React from 'react';
import { Target, Trophy, Sparkles, TrendingUp, Award, Compass, ShieldCheck, Zap, Info, Layers, CheckCircle2 } from 'lucide-react';
import { getNeetPrediction } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';

export default function NeetScorePredictorCard({
  testId,
  score,
  maxScore,
  accuracy = 0,
  correct = 0,
  wrong = 0,
  candidateName = null,
}) {
  const { isLight } = useTheme();
  const prediction = getNeetPrediction(testId, score, maxScore, accuracy, correct, wrong);

  if (!prediction) {
    return null;
  }

  const {
    testedSectionName,
    otherSectionName,
    scaledSectionScore,
    sectionMax,
    assumedOtherScore,
    otherMax,
    totalEstimatedNeet,
    projectedNeetScore,
    projectedNeetMax,
    percentile,
    airBand,
    statusBadge,
    tone,
    difficultyLevel,
    assumedSectionNote,
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
    emerald: isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    teal: isLight ? 'bg-teal-100 text-teal-800 border-teal-300' : 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    violet: isLight ? 'bg-violet-100 text-violet-800 border-violet-300' : 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    blue: isLight ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    amber: isLight ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rose: isLight ? 'bg-rose-100 text-rose-800 border-rose-300' : 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }[tone] || (isLight ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-blue-500/20 text-blue-300 border-blue-500/30');

  return (
    <div
      className={`rounded-lg border p-5 sm:p-6 relative overflow-hidden font-mono transition-colors ${
        isLight ? 'bg-white border-slate-300 shadow-xs text-slate-900' : 'bg-[#080D1A] border-blue-900/40 shadow-md text-slate-100'
      } animate-fade-in`}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header Badge */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-3 font-mono ${isLight ? 'border-slate-300' : 'border-blue-900/30'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded ${isLight ? 'bg-amber-100 text-amber-800' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}>
            <Trophy size={16} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-100">
                NEET 2027 PROJECTED NTA SCORE &amp; AIR RANK
              </h3>
              <span className={`rounded px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase ${
                isLight ? 'bg-blue-100 border border-blue-300 text-blue-800' : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              }`}>
                NTA 720 EQUATED
              </span>
              <span className={`rounded px-1.5 py-0.2 text-[10px] font-mono font-bold uppercase ${
                isLight ? 'bg-amber-100 border border-amber-300 text-amber-800' : 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
              }`}>
                ⚡ DIFFICULTY WEIGHTED
              </span>
            </div>
            {candidateName && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                Performance projection based on syllabus difficulty for <strong className="text-slate-200">{candidateName}</strong>
              </p>
            )}
          </div>
        </div>

        <span className={`rounded border px-2.5 py-1 text-xs font-mono font-bold uppercase tracking-wider ${badgeClass}`}>
          {statusBadge}
        </span>
      </div>

      {/* Main Score Prediction Grid */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center font-mono">
        {/* 1. Tested Section Score (Scaled to 360) */}
        <div className={`rounded border p-3 ${
          isLight ? 'border-slate-300 bg-slate-50' : 'border-blue-900/40 bg-[#060A14]'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-blue-400 tracking-wider">
            <Layers size={11} />
            <span>{testedSectionName.includes('Biology') ? 'BIO (TESTED)' : 'PHY+CHEM (TESTED)'}</span>
          </div>
          <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-blue-400">
            {scaledSectionScore}
            <span className="text-xs text-slate-500 font-normal"> / {sectionMax}</span>
          </p>
          <span className="text-[10px] text-slate-400 block mt-0.5 uppercase">
            ({Math.round((scaledSectionScore / sectionMax) * 100)}% SECTION)
          </span>
        </div>

        {/* 2. Auto-Assumed Section Score (out of 360) */}
        <div className={`rounded border p-3 ${
          isLight ? 'border-slate-300 bg-slate-50' : 'border-blue-900/40 bg-[#060A14]'
        }`}>
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-teal-400 tracking-wider">
            <Sparkles size={11} />
            <span>{otherSectionName.includes('Biology') ? 'BIO (ASSUMED)' : 'PHY+CHEM (ASSUMED)'}</span>
          </div>
          <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-teal-300">
            {assumedOtherScore}
            <span className="text-xs text-slate-500 font-normal"> / {otherMax}</span>
          </p>
          <span className="text-[10px] text-teal-400/80 block mt-0.5 uppercase">
            AUTO-SCALED
          </span>
        </div>

        {/* 3. Total Estimated NEET Score (out of 720) */}
        <div className={`rounded border p-3 ${
          isLight ? 'border-slate-300 bg-slate-50' : 'border-blue-900/40 bg-[#060A14]'
        }`}>
          <span className="text-[10px] uppercase font-bold block text-emerald-400 tracking-wider">
            EXPECTED NEET SCORE
          </span>
          <p className="mt-1 font-mono text-lg sm:text-xl font-bold text-slate-100">
            {totalEstimatedNeet}
            <span className="text-xs text-slate-500 font-normal"> / 720</span>
          </p>
          <span className="text-[10px] font-bold block mt-0.5 text-emerald-400 uppercase">
            FULL 720 NTA MARKS
          </span>
        </div>

        {/* 4. Expected AIR Band & Percentile */}
        <div className={`rounded border p-3 ${
          isLight ? 'border-slate-300 bg-slate-50' : 'border-blue-900/40 bg-[#060A14]'
        }`}>
          <span className="text-[10px] uppercase font-bold block text-amber-400 tracking-wider">
            ESTIMATED AIR
          </span>
          <p className="mt-1 font-mono text-xs sm:text-sm font-bold text-amber-300 truncate">
            {airBand}
          </p>
          <span className="text-[10px] font-bold block mt-0.5 text-teal-300">
            {percentile.toFixed(2)}%tile
          </span>
        </div>
      </div>

      {/* Auto-Assumption & Difficulty Explanation Banner */}
      <div className={`mt-3 rounded border p-2.5 text-xs flex items-start gap-2.5 font-mono ${
        isLight ? 'border-slate-300 bg-blue-50/50 text-slate-700' : 'border-blue-900/40 bg-[#060A14] text-slate-300'
      }`}>
        <Info size={14} className="shrink-0 mt-0.5 text-blue-400" />
        <div className="space-y-0.5">
          <span className="font-bold text-[11px] block uppercase tracking-wider text-slate-200">
            SUBJECT-WISE SCORING MODEL ({difficultyLevel}):
          </span>
          <p className="text-[11px] leading-relaxed text-slate-400 font-sans">
            {assumedSectionNote}
          </p>
        </div>
      </div>

      {/* AI Diagnostic Recommendation Bar */}
      <div className={`mt-3 rounded border p-2.5 text-xs leading-relaxed flex items-start gap-2.5 font-mono ${
        isLight ? 'border-amber-300 bg-amber-50/50 text-slate-700' : 'border-blue-900/40 bg-blue-950/20 text-slate-300'
      }`}>
        <Sparkles size={14} className="shrink-0 mt-0.5 text-amber-400" />
        <div>
          <span className="font-bold uppercase text-[10px] tracking-wider block mb-0.5 text-amber-300">
            DIAGNOSTIC ACTION PLAN //
          </span>
          <p className="text-xs leading-relaxed text-slate-300 font-sans">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
