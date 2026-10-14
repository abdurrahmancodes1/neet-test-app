import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, Clock, Target, Award, Columns } from 'lucide-react';
import { formatDuration } from '../utils/scoring.js';
import { useTheme } from '../utils/themeContext.jsx';

export default function AttemptComparisonModal({
  open,
  onClose,
  attempts = [],
  onSelectReview,
}) {
  const { isLight } = useTheme();

  if (!open || !attempts || attempts.length < 2) return null;

  const [attemptAId, setAttemptAId] = useState(attempts[0]?.id || '');
  const [attemptBId, setAttemptBId] = useState(attempts[1]?.id || '');

  const attemptA = attempts.find((a) => a.id === attemptAId) || attempts[0];
  const attemptB = attempts.find((a) => a.id === attemptBId) || attempts[1];

  const formatDateSafe = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  const formatDateTimeSafe = (ts) => {
    if (!ts) return 'Recent';
    try {
      const d = new Date(ts);
      return isNaN(d.getTime()) ? 'Recent' : d.toLocaleString();
    } catch {
      return 'Recent';
    }
  };

  const formatAcc = (val) => {
    const num = Number(val);
    return isNaN(num) ? '0' : num.toFixed(1);
  };

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
      <div
        className={`animate-rise-in relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border p-5 sm:p-8 shadow-2xl space-y-6 transition-colors ${
          isLight
            ? 'border-slate-200 bg-white text-slate-900'
            : 'border-white/10 bg-[#0B0F19] text-slate-100'
        }`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div>
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wider ${
                isLight ? 'bg-blue-50 border-blue-200 text-blue-700' : 'bg-blue-500/15 border-blue-500/30 text-blue-300'
              }`}
            >
              Comparative Analysis
            </span>
            <h2 className={`mt-1 font-sans text-xl sm:text-2xl font-bold flex items-center gap-2 ${isLight ? 'text-slate-900' : 'text-white'}`}>
              <Columns size={20} className={isLight ? 'text-blue-600' : 'text-blue-400'} /> Attempt vs. Attempt Comparison
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className={`rounded-full p-2 transition ${
              isLight ? 'text-slate-400 hover:bg-slate-100 hover:text-slate-800' : 'text-slate-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <X size={20} />
          </button>
        </div>

        {/* Attempt Selectors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className={`rounded-2xl border p-4 space-y-2 ${
            isLight ? 'border-blue-200 bg-blue-50/50' : 'border-blue-500/30 bg-[#070A12]'
          }`}>
            <label className={`block text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-blue-800' : 'text-blue-400'}`}>
              Primary Attempt (Current):
            </label>
            <select
              value={attemptAId}
              onChange={(e) => setAttemptAId(e.target.value)}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 transition ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-900'
                  : 'border-white/10 bg-[#0B0F19] text-white'
              }`}
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id} className={isLight ? 'bg-white text-slate-900' : 'bg-[#0B0F19] text-white'}>
                  Attempt #{att.attemptNumber || 1} — {formatDateSafe(att.timestamp)} ({att.score ?? 0}/{att.maxScore || 240})
                </option>
              ))}
            </select>
          </div>

          <div className={`rounded-2xl border p-4 space-y-2 ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'
          }`}>
            <label className={`block text-xs font-semibold uppercase tracking-wider ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
              Benchmark Attempt (Comparison):
            </label>
            <select
              value={attemptBId}
              onChange={(e) => setAttemptBId(e.target.value)}
              className={`w-full rounded-xl border px-3 py-2 text-xs font-bold focus:outline-none focus:border-blue-500 transition ${
                isLight
                  ? 'border-slate-300 bg-white text-slate-900'
                  : 'border-white/10 bg-[#0B0F19] text-white'
              }`}
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id} className={isLight ? 'bg-white text-slate-900' : 'bg-[#0B0F19] text-white'}>
                  Attempt #{att.attemptNumber || 1} — {formatDateSafe(att.timestamp)} ({att.score ?? 0}/{att.maxScore || 240})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delta Summary Banner */}
        <div className={`rounded-2xl border p-4 ${isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-[#070A12]'}`}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Score Delta</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-lg font-bold">
                {scoreDiff > 0 ? (
                  <span className={`flex items-center ${isLight ? 'text-emerald-700' : 'text-emerald-400'}`}>
                    <TrendingUp size={15} /> +{scoreDiff}
                  </span>
                ) : scoreDiff < 0 ? (
                  <span className={`flex items-center ${isLight ? 'text-rose-700' : 'text-rose-400'}`}>
                    <TrendingDown size={15} /> {scoreDiff}
                  </span>
                ) : (
                  <span className={`flex items-center ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    <Minus size={15} /> 0
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Accuracy Change</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-lg font-bold">
                {accDiff > 0 ? (
                  <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>+{formatAcc(accDiff)}%</span>
                ) : accDiff < 0 ? (
                  <span className={isLight ? 'text-rose-700' : 'text-rose-400'}>{formatAcc(accDiff)}%</span>
                ) : (
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>0%</span>
                )}
              </div>
            </div>

            <div>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Correct Qs Diff</p>
              <div className="mt-1 font-mono text-lg font-bold">
                {correctDiff > 0 ? (
                  <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>+{correctDiff} Qs</span>
                ) : correctDiff < 0 ? (
                  <span className={isLight ? 'text-rose-700' : 'text-rose-400'}>{correctDiff} Qs</span>
                ) : (
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Same</span>
                )}
              </div>
            </div>

            <div>
              <p className={`text-[11px] font-medium ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Speed / Time Diff</p>
              <div className="mt-1 font-mono text-lg font-bold">
                {timeDiffSec < 0 ? (
                  <span className={isLight ? 'text-emerald-700' : 'text-emerald-400'}>{Math.abs(timeDiffSec)}s faster</span>
                ) : timeDiffSec > 0 ? (
                  <span className={isLight ? 'text-blue-700' : 'text-blue-300'}>{timeDiffSec}s longer</span>
                ) : (
                  <span className={isLight ? 'text-slate-500' : 'text-slate-400'}>Equal</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Detailed Breakdown */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Card A */}
          <div className={`rounded-2xl border p-5 space-y-3 ${
            isLight ? 'border-blue-200 bg-white text-slate-900 shadow-sm' : 'border-blue-500/30 bg-[#070A12] text-slate-100'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
              <div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isLight ? 'bg-blue-100 border border-blue-200 text-blue-800' : 'bg-blue-600/20 border border-blue-500/30 text-blue-300'
                }`}>
                  Attempt #{attemptA.attemptNumber || 1}
                </span>
                <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {formatDateTimeSafe(attemptA.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-serif text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {attemptA.score ?? 0} <span className="text-xs text-slate-500">/ {attemptA.maxScore || 240}</span>
                </p>
                <p className={`text-xs font-bold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{attemptA.percentage ?? 0}%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptA.correct ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-rose-50 border border-rose-200 text-rose-800' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <XCircle size={14} /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptA.wrong ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <Minus size={14} /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptA.unattempted ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <Target size={14} /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{formatAcc(attemptA.accuracy)}%</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
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
          <div className={`rounded-2xl border p-5 space-y-3 ${
            isLight ? 'border-slate-200 bg-white text-slate-900 shadow-sm' : 'border-white/10 bg-[#070A12] text-slate-100'
          }`}>
            <div className={`flex items-center justify-between border-b pb-3 ${isLight ? 'border-slate-100' : 'border-white/10'}`}>
              <div>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                  isLight ? 'bg-slate-100 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 text-slate-300'
                }`}>
                  Attempt #{attemptB.attemptNumber || 1}
                </span>
                <p className={`mt-1 text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                  {formatDateTimeSafe(attemptB.timestamp)}
                </p>
              </div>
              <div className="text-right">
                <p className={`font-serif text-2xl font-black ${isLight ? 'text-slate-900' : 'text-white'}`}>
                  {attemptB.score ?? 0} <span className="text-xs text-slate-500">/ {attemptB.maxScore || 240}</span>
                </p>
                <p className={`text-xs font-bold ${isLight ? 'text-blue-600' : 'text-blue-400'}`}>{attemptB.percentage ?? 0}%</p>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-emerald-50 border border-emerald-200 text-emerald-800' : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <CheckCircle2 size={14} /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptB.correct ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-rose-50 border border-rose-200 text-rose-800' : 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <XCircle size={14} /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptB.wrong ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <Minus size={14} /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptB.unattempted ?? 0}</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
                <span className="flex items-center gap-1.5 font-medium">
                  <Target size={14} /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{formatAcc(attemptB.accuracy)}%</span>
              </div>
              <div className={`flex items-center justify-between rounded-xl px-3 py-2 ${
                isLight ? 'bg-slate-50 border border-slate-200 text-slate-700' : 'bg-white/5 border border-white/10 px-3 py-2 text-slate-300'
              }`}>
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
                className={`w-full rounded-full border py-2.5 text-xs font-bold transition ${
                  isLight
                    ? 'border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-800'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
                }`}
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
