import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useTheme } from '../utils/themeContext.jsx';

export default function SubmitModal({
  open,
  onCancel,
  onConfirm,
  answered,
  unanswered,
  marked,
  title,
}) {
  const { isLight } = useTheme();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      <div
        className={`animate-rise-in relative w-full max-w-sm rounded-3xl border p-6 sm:p-8 shadow-2xl transition-colors ${
          isLight
            ? 'border-slate-200 bg-white text-slate-900'
            : 'border-white/10 bg-[#0B0F19] text-slate-100'
        }`}
      >
        <div className="mb-4 flex items-center gap-3">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
              isLight
                ? 'bg-amber-50 border-amber-200 text-amber-600'
                : 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
            }`}
          >
            <AlertCircle size={20} />
          </div>
          <div>
            <h2 className={`text-base font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
              {title || 'Submit Examination?'}
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Final answer confirmation
            </p>
          </div>
        </div>

        <div className="my-5 grid grid-cols-3 gap-2 text-center">
          <div
            className={`rounded-2xl border py-3 ${
              isLight
                ? 'border-emerald-200 bg-emerald-50 text-emerald-800'
                : 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
            }`}
          >
            <p className="text-xl font-bold font-mono">{answered}</p>
            <p className="text-[10px] font-semibold uppercase opacity-80">Answered</p>
          </div>
          <div
            className={`rounded-2xl border py-3 ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-900'
                : 'border-white/10 bg-[#070A12] text-slate-300'
            }`}
          >
            <p className="text-xl font-bold font-mono">{unanswered}</p>
            <p className={`text-[10px] font-semibold uppercase ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
              Left
            </p>
          </div>
          <div
            className={`rounded-2xl border py-3 ${
              isLight
                ? 'border-amber-200 bg-amber-50 text-amber-900'
                : 'border-amber-500/20 bg-amber-500/10 text-amber-400'
            }`}
          >
            <p className="text-xl font-bold font-mono">{marked}</p>
            <p className="text-[10px] font-semibold uppercase opacity-80">Marked</p>
          </div>
        </div>

        <p className={`mb-6 text-xs leading-relaxed ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
          Once submitted, your answers will be evaluated instantly with score, accuracy metrics, and
          step-by-step solutions.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className={`flex-1 rounded-full border py-3 text-xs font-semibold transition ${
              isLight
                ? 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                : 'border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-full bg-blue-600 hover:bg-blue-500 py-3 text-xs font-bold text-white shadow-lg shadow-blue-600/25 transition active:scale-95"
          >
            Confirm &amp; Submit
          </button>
        </div>
      </div>
    </div>
  );
}
