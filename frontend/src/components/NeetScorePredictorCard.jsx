import React from 'react';
import { Target, Trophy, Sparkles, TrendingUp, Award, Compass, ShieldCheck, Zap } from 'lucide-react';
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
    return null; // Not applicable for other tests
  }

  const {
    sectionName,
    projectedSectionScore,
    projectedSectionMax,
    projectedNeetScore,
    projectedNeetMax,
    percentile,
    airBand,
    statusBadge,
    tone,
    recommendation,
  } = prediction;

  const toneBg = {
    emerald: 'from-emerald-950/50 via-[#0A1A17] to-[#0B0F19] border-emerald-500/40 ring-emerald-500/20',
    teal: 'from-teal-950/50 via-[#08181A] to-[#0B0F19] border-teal-500/40 ring-teal-500/20',
    violet: 'from-violet-950/50 via-[#130B24] to-[#0B0F19] border-violet-500/40 ring-violet-500/20',
    blue: 'from-blue-950/50 via-[#0A1326] to-[#0B0F19] border-blue-500/40 ring-blue-500/20',
    amber: 'from-amber-950/40 via-[#1A1208] to-[#0B0F19] border-amber-500/40 ring-amber-500/20',
    rose: 'from-rose-950/40 via-[#1A0A0E] to-[#0B0F19] border-rose-500/40 ring-rose-500/20',
  }[tone] || 'from-blue-950/50 via-[#0A1326] to-[#0B0F19] border-blue-500/40';

  const badgeClass = {
    emerald: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    teal: 'bg-teal-500/20 text-teal-300 border-teal-500/30',
    violet: 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    blue: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    amber: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    rose: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  }[tone] || 'bg-blue-500/20 text-blue-300 border-blue-500/30';

  const textScoreColor = {
    emerald: 'text-emerald-400',
    teal: 'text-teal-400',
    violet: 'text-violet-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
  }[tone] || 'text-blue-400';

  return (
    <div className={`rounded-3xl border bg-gradient-to-b p-5 sm:p-7 shadow-2xl relative overflow-hidden ring-1 ${toneBg} animate-fade-in`}>
      {/* Subtle top-right ambient glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-48 w-48 rounded-full bg-white/5 blur-3xl" />

      {/* Header Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 text-white shadow-xs">
            <Trophy size={15} className="text-amber-400" />
          </div>
          <div>
            <h3 className="font-sans text-sm sm:text-base font-bold text-white flex items-center gap-1.5">
              NEET 2027 Score &amp; AIR Rank Projector
              <span className="rounded-full bg-blue-500/20 border border-blue-500/30 px-2 py-0.2 text-[10px] font-bold text-blue-300">
                Official NTA Scaling
              </span>
            </h3>
            {candidateName && (
              <p className="text-[11px] text-slate-400">
                Assessment diagnostic projection for <strong className="text-white">{candidateName}</strong>
              </p>
            )}
          </div>
        </div>

        <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${badgeClass}`}>
          {statusBadge}
        </span>
      </div>

      {/* Main Score Prediction Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        {/* Projected Section Score */}
        <div className="rounded-2xl border border-white/10 bg-[#070A12]/80 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 block truncate">
            Projected {prediction.testType === 'biology' ? 'Biology' : 'Phy + Chem'}
          </span>
          <p className={`mt-1 font-mono text-2xl sm:text-3xl font-black ${textScoreColor}`}>
            {projectedSectionScore}
            <span className="text-xs sm:text-sm font-normal text-slate-500"> / {projectedSectionMax}</span>
          </p>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            ({Math.round((projectedSectionScore / projectedSectionMax) * 100)}% section yield)
          </span>
        </div>

        {/* Estimated Total NEET 720 */}
        <div className="rounded-2xl border border-white/10 bg-[#070A12]/80 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 block truncate">
            Estimated Total NEET
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-white">
            {projectedNeetScore}
            <span className="text-xs sm:text-sm font-normal text-slate-500"> / {projectedNeetMax}</span>
          </p>
          <span className="text-[10px] text-emerald-400 font-medium block mt-0.5">
            Full 720 Equivalent
          </span>
        </div>

        {/* Expected AIR Band */}
        <div className="rounded-2xl border border-white/10 bg-[#070A12]/80 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 block truncate">
            Expected All India Rank
          </span>
          <p className="mt-1 font-mono text-sm sm:text-base font-black text-amber-300 truncate">
            {airBand}
          </p>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            National Rank Band
          </span>
        </div>

        {/* Estimated Percentile */}
        <div className="rounded-2xl border border-white/10 bg-[#070A12]/80 p-3.5 backdrop-blur-xs">
          <span className="text-[10px] sm:text-[11px] uppercase font-bold text-slate-400 block truncate">
            National Percentile
          </span>
          <p className="mt-1 font-mono text-2xl sm:text-3xl font-black text-teal-300">
            {percentile.toFixed(1)}%
          </p>
          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
            Estimated NTA Percentile
          </span>
        </div>
      </div>

      {/* AI Diagnostic Recommendation Bar */}
      <div className="mt-4 rounded-2xl border border-white/10 bg-[#070A12]/90 p-4 text-xs leading-relaxed flex items-start gap-3">
        <Sparkles size={16} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white uppercase text-[10px] tracking-wider block mb-0.5">
            Diagnostic Feedback &amp; AI Action Plan:
          </span>
          <p className="text-slate-300 text-xs sm:text-sm font-normal leading-relaxed">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
