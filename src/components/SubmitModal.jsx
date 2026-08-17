import React from 'react';
import { AlertCircle } from 'lucide-react';

export default function SubmitModal({ open, onCancel, onConfirm, answered, unanswered, marked, title }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button aria-label="Close" className="absolute inset-0 bg-ink-950/50 animate-fade-in" onClick={onCancel} />
      <div className="animate-rise-in relative w-full max-w-sm rounded-t-2xl bg-white p-6 shadow-pop sm:rounded-2xl">
        <div className="mb-4 flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <AlertCircle size={18} />
          </div>
          <h2 className="text-lg font-bold text-ink-900">{title || 'Submit Test?'}</h2>
        </div>

        <div className="mb-5 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-lg bg-good-100 py-2.5">
            <p className="text-xl font-bold text-good-700">{answered}</p>
            <p className="text-[11px] font-medium text-good-700/80">Answered</p>
          </div>
          <div className="rounded-lg bg-ink-100 py-2.5">
            <p className="text-xl font-bold text-ink-700">{unanswered}</p>
            <p className="text-[11px] font-medium text-ink-600">Unanswered</p>
          </div>
          <div className="rounded-lg bg-gold-100 py-2.5">
            <p className="text-xl font-bold text-gold-700">{marked}</p>
            <p className="text-[11px] font-medium text-gold-700/80">Marked</p>
          </div>
        </div>

        <p className="mb-5 text-sm text-ink-600">
          Once submitted, you won't be able to change your answers. Are you sure you want to submit?
        </p>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-lg border border-ink-200 py-2.5 text-sm font-semibold text-ink-700 transition hover:bg-ink-100"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 rounded-lg bg-ink-900 py-2.5 text-sm font-semibold text-white transition hover:bg-ink-800"
          >
            Submit Test
          </button>
        </div>
      </div>
    </div>
  );
}
