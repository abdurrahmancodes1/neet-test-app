import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SubmitModal({ open, onCancel, onConfirm, answered, unanswered, marked, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button aria-label="Close" className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-fade-in" onClick={onCancel} />
      <div className="animate-rise-in relative w-full max-w-sm rounded-3xl border border-white/10 bg-[#0B0F19] p-6 sm:p-8 shadow-2xl text-slate-100">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400">
            <AlertCircle size={20} />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">{title || 'Submit Examination?'}</h2>
            <p className="text-xs text-slate-400">Final answer confirmation</p>
          </div>
        </div>

        <div className="my-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 py-3">
            <p className="text-xl font-bold text-emerald-400 font-mono">{answered}</p>
            <p className="text-[10px] font-semibold text-emerald-300/80 uppercase">Answered</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#070A12] py-3">
            <p className="text-xl font-bold text-slate-300 font-mono">{unanswered}</p>
            <p className="text-[10px] font-semibold text-slate-400 uppercase">Left</p>
          </div>
          <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 py-3">
            <p className="text-xl font-bold text-amber-400 font-mono">{marked}</p>
            <p className="text-[10px] font-semibold text-amber-300/80 uppercase">Marked</p>
          </div>
        </div>

        <p className="mb-6 text-xs text-slate-400 leading-relaxed">
          Once submitted, your answers will be evaluated instantly with score, accuracy metrics, and step-by-step solutions.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-full border border-white/10 bg-white/5 py-3 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
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
