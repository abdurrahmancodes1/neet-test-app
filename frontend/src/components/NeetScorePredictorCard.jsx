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
      className={`rounded-3xl border p-5 sm:p-7 relative overflow-hidden ring-1 transition-colors ${
        isLight ? `${toneBg} bg-white shadow-xl text-slate-900` : `bg-gradient-to-b ${toneBg} shadow-2xl text-slate-100`
      } animate-fade-in`}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute -top-10 -right-10 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Header Badge */}
      <div className={`flex flex-wrap items-center justify-between gap-3 border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
        <div className="flex items-center gap-2.5">
          <div className={`flex h-8 w-8 items-center justify-center rounded-xl ${isLight ? 'bg-amber-100 text-amber-800' : 'bg-white/10 text-white'}`}>
            <Trophy size={16} className={isLight ? 'text-amber-600' : 'text-amber-400'} />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className={`font-sans text-sm sm:text-base font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                NEET 2027 Projected NTA Score &amp; AIR Rank
              </h3>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isLight ? 'bg-blue-100 border border-blue-300 text-blue-800' : 'bg-blue-500/20 border border-blue-500/30 text-blue-300'
              }`}>
                NTA 720 Equated Model
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                isLight ? 'bg-amber-100 border border-amber-300 text-amber-800' : 'bg-amber-500/20 border border-amber-500/30 text-amber-300'
              }`}>
                ⚡ Difficulty Weighted
              </span>
            </div>
            {candidateName && (
              <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Performance projection based on syllabus difficulty for <strong className={isLight ? 'text-slate-900' : 'text-white'}>{candidateName}</strong>
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
        <div className={`rounded-2xl border p-3.5 backdrop-blur-xs ${
          isLight ? 'border-blue-200 bg-white/90 shadow-xs' : 'border-blue-500/30 bg-[#070A12]/90'
        }`}>
          <div className={`flex items-center justify-center gap-1 text-[10px] uppercase font-bold truncate ${
            isLight ? 'text-blue-700' : 'text-blue-400'
          }`}>
            <Layers size={12} />
            <span>{testedSectionName.includes('Biology') ? 'Biology (Tested)' : 'Phy + Chem (Tested)'}</span>
          </div>
          <p className={`mt-1 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-blue-700' : 'text-blue-400'}`}>
            {scaledSectionScore}
            <span className={`text-xs sm:text-sm font-normal ${isLight ? 'text-slate-500' : 'text-slate-500'}`}> / {sectionMax}</span>
          </p>
          <span className={`text-[10px] font-medium block mt-0.5 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            ({Math.round((scaledSectionScore / sectionMax) * 100)}% Section Score)
          </span>
        </div>

        {/* 2. Auto-Assumed Section Score (out of 360) */}
        <div className={`rounded-2xl border p-3.5 backdrop-blur-xs ${
          isLight ? 'border-teal-200 bg-white/90 shadow-xs' : 'border-teal-500/30 bg-[#070A12]/90'
        }`}>
          <div className={`flex items-center justify-center gap-1 text-[10px] uppercase font-bold truncate ${
            isLight ? 'text-teal-700' : 'text-teal-400'
          }`}>
            <Sparkles size={12} />
            <span>{otherSectionName.includes('Biology') ? 'Biology (Assumed)' : 'Phy+Chem (Assumed)'}</span>
          </div>
          <p className={`mt-1 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
            {assumedOtherScore}
            <span className={`text-xs sm:text-sm font-normal ${isLight ? 'text-slate-500' : 'text-slate-500'}`}> / {otherMax}</span>
          </p>
          <span className={`text-[10px] font-medium block mt-0.5 ${isLight ? 'text-teal-700' : 'text-teal-400/90'}`}>
            Auto-Scaled for 720 Total
          </span>
        </div>

        {/* 3. Total Estimated NEET Score (out of 720) */}
        <div className={`rounded-2xl border p-3.5 backdrop-blur-xs ${
          isLight ? 'border-emerald-200 bg-white/90 shadow-xs' : 'border-emerald-500/40 bg-[#070A12]/90'
        }`}>
          <span className={`text-[10px] uppercase font-bold block truncate ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Expected NEET Score
          </span>
          <p className={`mt-1 font-mono text-2xl sm:text-3xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
            {totalEstimatedNeet}
            <span className={`text-xs sm:text-sm font-normal ${isLight ? 'text-slate-500' : 'text-slate-500'}`}> / 720</span>
          </p>
          <span className={`text-[10px] font-bold block mt-0.5 ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
            Full 720 NTA Marks
          </span>
        </div>

        {/* 4. Expected AIR Band & Percentile */}
        <div className={`rounded-2xl border p-3.5 backdrop-blur-xs ${
          isLight ? 'border-amber-200 bg-white/90 shadow-xs' : 'border-amber-500/30 bg-[#070A12]/90'
        }`}>
          <span className={`text-[10px] uppercase font-bold block truncate ${isLight ? 'text-amber-800' : 'text-amber-400'}`}>
            Expected All India Rank
          </span>
          <p className={`mt-1 font-mono text-sm sm:text-base font-black truncate ${isLight ? 'text-amber-900' : 'text-amber-300'}`}>
            {airBand}
          </p>
          <span className={`text-[10px] font-bold block mt-0.5 ${isLight ? 'text-teal-700' : 'text-teal-300'}`}>
            {percentile.toFixed(2)}% National Percentile
          </span>
        </div>
      </div>

      {/* Auto-Assumption & Difficulty Explanation Banner */}
      <div className={`mt-4 rounded-2xl border p-3.5 text-xs flex items-start gap-2.5 ${
        isLight ? 'border-slate-200 bg-blue-50/50 text-slate-700' : 'border-white/10 bg-[#070A12]/90 text-slate-300'
      }`}>
        <Info size={15} className={`shrink-0 mt-0.5 ${isLight ? 'text-blue-600' : 'text-blue-400'}`} />
        <div className="space-y-0.5">
          <span className={`font-bold text-[11px] block ${isLight ? 'text-slate-900' : 'text-white'}`}>
            Subject-Wise Scoring Model ({difficultyLevel}):
          </span>
          <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
            {assumedSectionNote}
          </p>
        </div>
      </div>

      {/* AI Diagnostic Recommendation Bar */}
      <div className={`mt-3 rounded-2xl border p-3.5 text-xs leading-relaxed flex items-start gap-2.5 ${
        isLight ? 'border-amber-200 bg-amber-50/50 text-slate-700' : 'border-white/10 bg-[#070A12]/90 text-slate-300'
      }`}>
        <Sparkles size={15} className={`shrink-0 mt-0.5 ${isLight ? 'text-amber-600' : 'text-amber-400'}`} />
        <div>
          <span className={`font-bold uppercase text-[10px] tracking-wider block mb-0.5 ${isLight ? 'text-amber-900' : 'text-white'}`}>
            Diagnostic Action Plan:
          </span>
          <p className={`text-xs sm:text-sm font-normal leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}
