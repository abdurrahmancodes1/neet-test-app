import React from 'react';
import { Target, Trophy, Sparkles, TrendingUp, Award, Compass, ShieldCheck, Zap, Info, Layers, CheckCircle2 } from 'lucide-react';
import { getNeetPrediction } from '../utils/scoring.js';

export default function NeetScorePredictorCard({
  testId,
  score,
  maxScore,
  accuracy = 0,
  correct = 0,
  wrong = 0,
  candidateName = null,
}) {
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

  const toneBg = {
    emerald: 'from-emerald-950/60 via-[#0A1A17] to-[#0B0F19] border-emerald-500/40 ring-emerald-500/20',
    teal: 'from-teal-950/60 via-[#08181A] to-[#0B0F19] border-teal-500/40 ring-teal-500/20',
    violet: 'from-violet-950/60 via-[#130B24] to-[#0B0F19] border-violet-500/40 ring-violet-500/20',
    blue: 'from-blue-950/60 via-[#0A1326] to-[#0B0F19] border-blue-500/40 ring-blue-500/20',
    amber: 'from-amber-950/50 via-[#1A1208] to-[#0B0F19] border-amber-500/40 ring-amber-500/20',
    rose: 'from-rose-950/50 via-[#1A0A0E] to-[#0B0F19] border-rose-500/40 ring-rose-500/20',
  }[tone] || 'from-blue-950/60 via-[#0A1326] to-[#0B0F19] border-blue-500/40';

  const badgeClass = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }[tone] || 'bg-blue-500/20 text-blue-300 border-blue-500/30';

  return (
    <div className={`rounded-3xl border bg-gradient-to-b p-5 sm:p-7 shadow-2xl relative overflow-hidden ring-1 ${toneBg} animate-fade-in`}>
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-white shadow-xs">
            <Trophy size={16} className="text-amber-400" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-sans text-sm sm:text-base font-black text-white">
                NEET 2027 Projected NTA Score &amp; AIR Rank
              </h3>
              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.5 text-[10px] font-bold text-blue-300">
                NTA 720 Equated Model
              </span>
              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                ⚡ Difficulty Weighted
              </span>
            </div>
            {candidateName && (
              <p className="text-[11px] text-slate-400 mt-0.5">
                Performance projection based on syllabus difficulty for <strong className="text-white">{candidateName}</strong>
              </p>
            )}
          </div>
        </div>

        <span className={`rounded-full border px-3 py-1 text-xs font-black uppercase tracking-wider ${badgeClass}`}>
          {statusBadge}
        </span>
      </div>

      {/* Main Score Prediction Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* 1. Tested Section Score (Scaled to 360) */}
        <div className="rounded-2xl border border-blue-500/30 bg-[#070A12]/90 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-blue-400 truncate">
            <Layers size={12} />
            <span>{testedSectionName.includes('Biology') ? 'Biology (Tested)' : 'Phy + Chem (Tested)'}</span>
          </div>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-blue-400">
            {scaledSectionScore}
            <span className="text-xs sm:text-sm font-normal text-slate-500"> / {sectionMax}</span>
          </p>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            ({Math.round((scaledSectionScore / sectionMax) * 100)}% Section Score)
          </span>
        </div>

        {/* 2. Auto-Assumed Section Score (out of 360) */}
        <div className="rounded-2xl border border-teal-500/30 bg-[#070A12]/90 p-3.5 backdrop-blur-xs">
          <div className="flex items-center justify-center gap-1 text-[10px] uppercase font-bold text-teal-400 truncate">
            <Sparkles size={12} />
            <span>{otherSectionName.includes('Biology') ? 'Biology (Assumed)' : 'Phy+Chem (Assumed)'}</span>
          </div>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-teal-300">
            {assumedOtherScore}
            <span className="text-xs sm:text-sm font-normal text-slate-500"> / {otherMax}</span>
          </p>
          <span className="text-[10px] text-teal-400/90 font-medium block mt-0.5">
            Auto-Scaled for 720 Total
          </span>
        </div>

        {/* 3. Total Estimated NEET Score (out of 720) */}
        <div className="rounded-2xl border border-emerald-500/40 bg-[#070A12]/90 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block truncate">
            Expected NEET Score
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-white">
            {totalEstimatedNeet}
            <span className="text-xs sm:text-sm font-normal text-slate-500"> / 720</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-bold block mt-0.5">
            Full 720 NTA Marks
          </span>
        </div>

        {/* 4. Expected AIR Band & Percentile */}
        <div className="rounded-2xl border border-amber-500/30 bg-[#070A12]/90 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] uppercase font-bold text-amber-400 block truncate">
            Expected All India Rank
          </span>
          <p className="mt-1 font-mono text-sm sm:text-base font-black text-amber-300 truncate">
            {airBand}
          </p>
          <span className="text-[10px] text-teal-300 font-bold block mt-0.5">
            {percentile.toFixed(2)}% National Percentile
          </span>
        </div>
      </div>

      {/* Auto-Assumption & Difficulty Explanation Banner */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A12]/90 p-3.5 text-xs text-slate-300 flex items-start gap-2.5">
        <Info size={15} className="text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-white text-[11px] block">
            Subject-Wise Scoring Model ({difficultyLevel}):
          </span>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            {assumedSectionNote}
          </p>
        </div>
      </div>

      {/* AI Diagnostic Recommendation Bar */}
      <div className="mt-3 rounded-2xl border border-white/10 bg-[#070A12]/90 p-3.5 text-xs leading-relaxed flex items-start gap-2.5">
        <Sparkles size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-0.5">
            Diagnostic Action Plan:
          </span>
          <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
