import React, { useState } from 'react';
import { X, ArrowRight, TrendingUp, TrendingDown, Minus, CheckCircle2, XCircle, Clock, Target, Award } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-ink-950/60 backdrop-blur-xs animate-fade-in"
      />

      {/* Modal Box */}
      <div className="animate-rise-in relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-ink-200 bg-white p-5 sm:p-8 shadow-pop">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-100 pb-4">
          <div>
            <span className="rounded-full bg-gold-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
              Comparative Analysis
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-ink-900">
              Attempt vs. Attempt Comparison
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-ink-400 hover:bg-ink-100 hover:text-ink-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Attempt Selectors */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border-2 border-ink-900 bg-ink-50/50 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5">
              Primary Attempt (Current):
            </label>
            <select
              value={attemptAId}
              onChange={(e) => setAttemptAId(e.target.value)}
              className="w-full rounded-xl border border-ink-300 bg-white px-3 py-2 text-sm font-bold text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900"
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id}>
                  Attempt #{att.attemptNumber || 1} — {new Date(att.timestamp).toLocaleDateString()} ({att.score}/240)
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-2xl border-2 border-ink-300 bg-ink-50/50 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink-600 mb-1.5">
              Benchmark Attempt (Comparison):
            </label>
            <select
              value={attemptBId}
              onChange={(e) => setAttemptBId(e.target.value)}
              className="w-full rounded-xl border border-ink-300 bg-white px-3 py-2 text-sm font-bold text-ink-900 focus:outline-none focus:ring-2 focus:ring-ink-900"
            >
              {attempts.map((att) => (
                <option key={att.id} value={att.id}>
                  Attempt #{att.attemptNumber || 1} — {new Date(att.timestamp).toLocaleDateString()} ({att.score}/240)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Delta Summary Banner */}
        <div className="mt-6 rounded-2xl border border-ink-200 bg-ink-900 p-4 text-white">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-center">
            <div>
              <p className="text-[11px] font-medium text-ink-300">Score Delta</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-xl font-bold">
                {scoreDiff > 0 ? (
                  <span className="flex items-center text-good-400">
                    <TrendingUp size={16} /> +{scoreDiff}
                  </span>
                ) : scoreDiff < 0 ? (
                  <span className="flex items-center text-bad-400">
                    <TrendingDown size={16} /> {scoreDiff}
                  </span>
                ) : (
                  <span className="flex items-center text-ink-300">
                    <Minus size={16} /> 0
                  </span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-ink-300">Accuracy Change</p>
              <div className="mt-1 flex items-center justify-center gap-1 font-mono text-xl font-bold">
                {accDiff > 0 ? (
                  <span className="text-good-400">+{accDiff.toFixed(1)}%</span>
                ) : accDiff < 0 ? (
                  <span className="text-bad-400">{accDiff.toFixed(1)}%</span>
                ) : (
                  <span className="text-ink-300">0%</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-ink-300">Correct Qs Difference</p>
              <div className="mt-1 font-mono text-xl font-bold">
                {correctDiff > 0 ? (
                  <span className="text-good-400">+{correctDiff} Qs</span>
                ) : correctDiff < 0 ? (
                  <span className="text-bad-400">{correctDiff} Qs</span>
                ) : (
                  <span className="text-ink-300">Same</span>
                )}
              </div>
            </div>

            <div>
              <p className="text-[11px] font-medium text-ink-300">Speed / Time Difference</p>
              <div className="mt-1 font-mono text-xl font-bold">
                {timeDiffSec < 0 ? (
                  <span className="text-good-400">{Math.abs(timeDiffSec)}s faster</span>
                ) : timeDiffSec > 0 ? (
                  <span className="text-gold-300">{timeDiffSec}s longer</span>
                ) : (
                  <span className="text-ink-300">Equal</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Side-by-Side Detailed Breakdown */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Card A */}
          <div className="rounded-2xl border-2 border-ink-900 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <div>
                <span className="rounded-md bg-ink-900 px-2 py-0.5 text-xs font-bold text-gold-300">
                  Attempt #{attemptA.attemptNumber || 1}
                </span>
                <p className="mt-1 text-xs text-ink-500">
                  {new Date(attemptA.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-black text-ink-900">
                  {attemptA.score} <span className="text-sm text-ink-400">/ 240</span>
                </p>
                <p className="text-xs font-bold text-gold-700">{attemptA.percentage}%</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-good-50 px-3 py-2 text-good-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={14} className="text-good-600" /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptA.correct}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-bad-50 px-3 py-2 text-bad-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <XCircle size={14} className="text-bad-600" /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptA.wrong}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Minus size={14} className="text-ink-600" /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptA.unattempted}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Target size={14} className="text-ink-600" /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{attemptA.accuracy?.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock size={14} className="text-ink-600" /> Time Spent
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
                className="mt-4 w-full rounded-xl bg-ink-900 py-2.5 text-xs font-bold text-white transition hover:bg-ink-800"
              >
                Review Attempt #{attemptA.attemptNumber || 1} Solutions
              </button>
            )}
          </div>

          {/* Card B */}
          <div className="rounded-2xl border border-ink-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-ink-100 pb-3">
              <div>
                <span className="rounded-md bg-ink-100 px-2 py-0.5 text-xs font-bold text-ink-700">
                  Attempt #{attemptB.attemptNumber || 1}
                </span>
                <p className="mt-1 text-xs text-ink-500">
                  {new Date(attemptB.timestamp).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-serif text-2xl font-black text-ink-900">
                  {attemptB.score} <span className="text-sm text-ink-400">/ 240</span>
                </p>
                <p className="text-xs font-bold text-gold-700">{attemptB.percentage}%</p>
              </div>
            </div>

            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between rounded-lg bg-good-50 px-3 py-2 text-good-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <CheckCircle2 size={14} className="text-good-600" /> Correct Answers
                </span>
                <span className="font-mono font-bold">{attemptB.correct}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-bad-50 px-3 py-2 text-bad-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <XCircle size={14} className="text-bad-600" /> Wrong Answers
                </span>
                <span className="font-mono font-bold">{attemptB.wrong}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Minus size={14} className="text-ink-600" /> Unattempted
                </span>
                <span className="font-mono font-bold">{attemptB.unattempted}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Target size={14} className="text-ink-600" /> Overall Accuracy
                </span>
                <span className="font-mono font-bold">{attemptB.accuracy?.toFixed(1)}%</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-ink-100 px-3 py-2 text-ink-800">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock size={14} className="text-ink-600" /> Time Spent
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
                className="mt-4 w-full rounded-xl border border-ink-300 bg-white py-2.5 text-xs font-bold text-ink-800 transition hover:bg-ink-100"
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
