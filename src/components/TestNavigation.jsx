import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';

export default function TestNavigation({ onPrev, onNext, onSubmit, isFirst, isLast }) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-ink-200 bg-ink-50/95 backdrop-blur supports-[backdrop-filter]:bg-ink-50/80">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-2 px-4 py-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className="inline-flex items-center gap-1 rounded-lg border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-700 shadow-sm transition hover:bg-ink-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft size={16} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-1.5 rounded-lg bg-bad-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-bad-700"
        >
          <Send size={14} />
          Submit
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onSubmit}
            className="inline-flex items-center gap-1 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-800"
          >
            Finish
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-1 rounded-lg bg-ink-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ink-800"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
