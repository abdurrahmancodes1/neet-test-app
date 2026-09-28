import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, Clock, Target, Award, Columns } from 'lucide-react';
import { formatDuration } from '../utils/scoring.js';

export default function AttemptComparisonModal({
  open,
  onClose,
  attempts = [],
  onSelectReview,
}) {
  if (!open || !attempts || attempts.length < 2) return null;

  const [attemptAId, setAttemptAId] = useState(attempts[0]?.id || '');
  const [attemptBId, setAttemptBId] = useState(attempts[1]?.id || '');

  const attemptA = attempts.find((a) => a.id === attemptAId) || attempts[0];
  const attemptB = attempts.find((a) => a.id === attemptBId) || attempts[1];

  const scoreDiff = (attemptA.score || 0) - (attemptB.score || 0);
  const accDiff = (attemptA.accuracy || 0) - (attemptB.accuracy || 0);
  const correctDiff = (attemptA.correct || 0) - (attemptB.correct || 0);
  const timeA = attemptA.timeTakenMs || 0;
  const timeB = attemptB.timeTakenMs || 0;
  const timeDiffSec = Math.round((timeA - timeB) / 1000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 text-slate-100">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
      />

      {/* Modal Box */}
      <div className="animate-rise-in relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-[#0B0F19] p-5 sm:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <span className="rounded-full bg-blue-500/15 border border-blue-500/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Comparative Analysis
            </span>
            <h2 className="mt-1 font-sans text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Columns size={20} className="text-blue-400" /> Attempt vs. Attempt Comparison
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Attempt Selectors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-blue-500/30 bg-[#070A12] p-4 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400">
              Primary Attempt (Current):
            </label>
            <select
              value={attemptAId}
              onChange={(e) => setAttemptAId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id} className="bg-[#0B0F19] text-white">
                  Attempt #{att.attemptNumber || 1} — {new Date(att.timestamp).toLocaleDateString()} ({att.score}/240)
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4 space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              Benchmark Attempt (Comparison):
            </label>
            <select
              value={attemptBId}
              onChange={(e) => setAttemptBId(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-3 py-2 text-xs font-bold text-white focus:outline-none focus:border-blue-500"
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id} className="bg-[#0B0F19] text-white">
                  Attempt #{att.attemptNumber || 1} — {new Date(att.timestamp).toLocaleDateString()} ({att.score}/240)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delta Summary Banner */}
        <div className="rounded-2xl border border-white/10 bg-[#070A12] p-4">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-[11px] font-medium text-slate-400">Score Delta</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-lg font-bold">
                {scoreDiff > 0 ? (
                  <span className="flex items-center text-emerald-400">
                    <TrendingUp size={15} /> +{scoreDiff}
                  </span>
                ) : scoreDiff < 0 ? (
                  <span className="flex items-center text-rose-400">
                    <TrendingDown size={15} /> {scoreDiff}
                  </span>
                ) : (
                  <span className="flex items-center text-slate-400">
                    <Minus size={15} /> 0
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-slate-400">Accuracy Change</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-lg font-bold">
                {accDiff > 0 ? (
                  <span className="text-emerald-400">+{accDiff.toFixed(1)}%</span>
                ) : accDiff < 0 ? (
                  <span className="text-rose-400">{accDiff.toFixed(1)}%</span>
                ) : (
                  <span className="text-slate-400">0%</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-slate-400">Correct Qs Diff</p>
              <div className="mt-1 font-mono text-lg font-bold">
                {correctDiff > 0 ? (
                  <span className="text-emerald-400">+{correctDiff} Qs</span>
                ) : correctDiff < 0 ? (
                  <span className="text-rose-400">{correctDiff} Qs</span>
                ) : (
                  <span className="text-slate-400">Same</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-slate-400">Speed / Time Diff</p>
              <div className="mt-1 font-mono text-lg font-bold">
                {timeDiffSec < 0 ? (
                  <span className="text-emerald-400">{Math.abs(timeDiffSec)}s faster</span>
                ) : timeDiffSec > 0 ? (
                  <span className="text-blue-300">{timeDiffSec}s longer</span>
                ) : (
                  <span className="text-slate-400">Equal</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Detailed Breakdown */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Card A */}
          <div className="rounded-2xl border border-blue-500/30 bg-[#070A12] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="rounded-full bg-blue-600/20 border border-blue-500/30 px-2.5 py-0.5 text-xs font-bold text-blue-300">
                  Attempt #{attemptA.attemptNumber || 1}
                </span>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(attemptA.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-black text-white">
                  {attemptA.score} <span className="text-xs text-slate-500">/ 240</span>
                </p>
                <p className="text-xs font-bold text-blue-400">{attemptA.percentage}%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptA.correct}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-rose-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <XCircle size={14} /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptA.wrong}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Minus size={14} /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptA.unattempted}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Target size={14} /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{attemptA.accuracy?.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock size={14} /> Time Spent
                </span>
                <span className="font-mono font-bold">{formatDuration(attemptA.timeTakenMs || 0)}</span>
              </div>
            </div>

            {onSelectReview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectReview(attemptA);
                }}
                className="w-full rounded-full bg-blue-600 hover:bg-blue-500 py-2.5 text-xs font-bold text-white shadow-sm transition"
              >
                Review Attempt #{attemptA.attemptNumber || 1} Solutions
              </button>
            )}
          </div>

          {/* Card B */}
          <div className="rounded-2xl border border-white/10 bg-[#070A12] p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-bold text-slate-300">
                  Attempt #{attemptB.attemptNumber || 1}
                </span>
                <p className="mt-1 text-xs text-slate-400">
                  {new Date(attemptB.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-black text-white">
                  {attemptB.score} <span className="text-xs text-slate-500">/ 240</span>
                </p>
                <p className="text-xs font-bold text-blue-400">{attemptB.percentage}%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-3 py-2 text-emerald-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptB.correct}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-rose-500/10 border border-rose-500/20 px-3 py-2 text-rose-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <XCircle size={14} /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptB.wrong}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Minus size={14} /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptB.unattempted}</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Target size={14} /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{attemptB.accuracy?.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 border border-white/10 px-3 py-2 text-slate-300">
                <span className="flex items-center gap-1.5 font-medium">
                  <Clock size={14} /> Time Spent
                </span>
                <span className="font-mono font-bold">{formatDuration(attemptB.timeTakenMs || 0)}</span>
              </div>
            </div>

            {onSelectReview && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectReview(attemptB);
                }}
                className="w-full rounded-full border border-white/10 bg-white/5 hover:bg-white/10 py-2.5 text-xs font-bold text-slate-200 transition"
              >
                Review Attempt #{attemptB.attemptNumber || 1} Solutions
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
